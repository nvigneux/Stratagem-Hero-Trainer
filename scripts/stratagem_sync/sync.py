"""Idempotent icon synchronization. Run from the Trainer checkout; never deletes icons."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import uuid
import xml.etree.ElementTree as ET

from sources import Lookup, code, normalize

ROOT = Path(__file__).resolve().parents[2]
CATALOG = Path('app/lib/sync/catalog.json')
STATE = Path('app/lib/sync/state.json')
DEPARTMENTS = {'Bridge', 'Engineering Bay', 'Hangar', 'Orbital Cannons',
               'Patriotic Administration Center', 'Robotics Workshop'}
NS = uuid.UUID('d1aaf48e-9230-4cfb-aeed-4f987d590634')


def git(root, *args):
    return subprocess.check_output(['git', '-C', str(root), *args]).decode().strip()


def read_json(path, fallback):
    return json.loads(path.read_text()) if path.exists() else fallback


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')


def legacy(root):
    script = 'console.log(JSON.stringify(require(process.argv[1])))'
    return json.loads(subprocess.check_output(['node', '-e', script,
                      str(root / 'app/lib/placeholder-data-helldivers.js')]))


def validate_svg(data):
    if len(data) > 1_000_000 or re.search(br'<!DOCTYPE|<!ENTITY|<\?', data, re.I):
        raise ValueError('SVG contains prohibited declarations or exceeds 1 MB')
    root = ET.fromstring(data)
    allowed = {'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline',
               'line', 'defs', 'clipPath', 'title', 'desc'}
    if root.tag != '{http://www.w3.org/2000/svg}svg':
        raise ValueError('Expected SVG namespace and root')
    for element in root.iter():
        if element.tag.split('}')[-1] not in allowed:
            raise ValueError('Unsupported or active SVG element')
        for key, value in element.attrib.items():
            key = key.split('}')[-1].lower()
            if key.startswith('on') or key in {'href', 'src'}:
                raise ValueError('Active SVG attribute')
            if key == 'style' and not re.fullmatch(
                    r'(?:(?:fill|stroke|fill-rule|clip-rule|opacity|stroke-width):[\w#., %+-]+;?\s*)+', value):
                raise ValueError('Unsupported inline SVG style')
            if re.search(r'url\s*\(', value, re.I) and not re.fullmatch(r'url\(#[\w-]+\)', value):
                raise ValueError('External SVG reference')


def safe_file(root, relative):
    path = root / relative
    if path.is_symlink() or not path.resolve().is_relative_to(root.resolve()):
        raise ValueError(f'Unsafe path: {relative}')
    return path


def cache_assets(root):
    sw = root / 'public/sw.js'
    text = sw.read_text()
    # Include every real public asset (no stale manually maintained filenames).
    assets = ['/', '/loadout'] + ['/' + p.relative_to(root / 'public').as_posix()
        for p in sorted((root / 'public').rglob('*')) if p.is_file()
        and p.name != 'sw.js' and not p.name.startswith('.')]
    digest = hashlib.sha256()
    worker_logic = re.sub(r'const CACHE_NAME = .*?const ASSETS_TO_CACHE = \[.*?\];', '', text, count=1, flags=re.S)
    digest.update(worker_logic.encode())
    for path in sorted(list((root / 'app').rglob('*')) + list((root / 'public').rglob('*'))):
        if path.is_file() and path != sw and path.name != 'state.json' and not path.name.startswith('.'):
            digest.update(path.relative_to(root).as_posix().encode())
            digest.update(path.read_bytes())
    for relative in ['package-lock.json', 'next.config.js']:
        if (root / relative).exists():
            digest.update((root / relative).read_bytes())
    prefix = "const CACHE_NAME = 'stratagem-hero-cache-" + digest.hexdigest()[:16] + "';\n\n"
    prefix += 'const ASSETS_TO_CACHE = ' + '[\n' + ''.join('  ' + repr(asset) + ',\n' for asset in assets) + ']' + ';'
    text = re.sub(r'const CACHE_NAME = .*?const ASSETS_TO_CACHE = \[.*?\];',
                  lambda _: prefix, text, count=1, flags=re.S)
    sw.write_text(text)


def validate_catalog(root):
    base = legacy(root)
    rows = read_json(root / CATALOG, [])
    ids, names = set(), {normalize(row['name']) for row in base['STRATAGEMS']}
    groups = {row['id']: row['name'] for row in base['CATEGORIES']}
    for row in rows:
        if row['id'] in ids or normalize(row['name']) in names:
            raise ValueError('Duplicate stratagem identity or name')
        ids.add(row['id'])
        names.add(normalize(row['name']))
        if row['verification'] not in {'unverified', 'verified'}:
            raise ValueError('Invalid verification status')
        if type(row['enabled']) is not bool or type(row['experimental']) is not bool:
            raise ValueError('Expected explicit enable and experimental flags')
        if row['kind'] not in {'department', 'warbond', 'general', 'experimental'}:
            raise ValueError('Invalid category kind')
        if row['category_id'] in groups and groups[row['category_id']] != row['group']:
            raise ValueError('Category UUID collision')
        groups[row['category_id']] = row['group']
        if row['code']:
            if code(row['code']) != row['code']:
                raise ValueError('Codes must use canonical direction words')
        if row['verification'] == 'verified' and not row['code']:
            raise ValueError('Verified code cannot be empty')
        if row['enabled'] and (row['verification'] != 'verified' or row['experimental']):
            raise ValueError('Cannot enable unverified or experimental stratagem')
        icon = safe_file(root, 'public/icons/stratagems/' + row['group'] + '/' + row['name'] + '.svg')
        validate_svg(icon.read_bytes())
    for path in (root / 'public/icons/stratagems').rglob('*.svg'):
        try:
            validate_svg(safe_file(root, path.relative_to(root)).read_bytes())
        except ValueError as exc:
            raise ValueError(f'{path}: {exc}') from exc


def synchronize(source, root=ROOT, online=True):
    source, root = source.resolve(), root.resolve()
    base = legacy(root)
    rows = read_json(root / CATALOG, [])
    state = read_json(root / STATE, {'entries': {}, 'revision': None})
    previous_revision = state['revision']
    entries = state['entries']
    paths = git(source, 'ls-files', '-z', '*.svg').split('\0')
    paths = sorted(p for p in paths if p and len(Path(p).parts) == 2 and not p.startswith('.'))
    if not paths:
        raise ValueError('Source contains no SVG icons; refusing an empty snapshot')
    # Git rename detection preserves identity even if both path and bytes change.
    renames = {}
    if previous_revision:
        exists = subprocess.run(['git', '-C', str(source), 'cat-file', '-e', previous_revision],
                                capture_output=True).returncode == 0
        if exists:
            changes = git(source, 'diff', '--name-status', '-z', '-M', previous_revision, 'HEAD').split('\0')
            i = 0
            while i < len(changes) and changes[i]:
                status = changes[i]; i += 1
                if status.startswith(('R', 'C')):
                    old, new = changes[i:i+2]; i += 2
                    if status.startswith('R'):
                        renames[new] = old
                else:
                    i += 1
    lookup = None
    report = []
    # If upstream contains aliases such as Gas Mine.svg and Gas Mines.svg, prefer the
    # canonical legacy filename; never create two game rows for a known alias.
    by_name = {}
    for relative in paths:
        by_name.setdefault(normalize(Path(relative).stem), []).append(relative)
    for key, variants in by_name.items():
        if len(variants) <= 1:
            continue
        canonical = [p for p in variants if any(Path(p).stem == row['name']
                     for row in base['STRATAGEMS'])]
        if len(canonical) != 1:
            raise ValueError(f'Ambiguous source identities: {variants}')
        for variant in variants:
            if variant != canonical[0]:
                paths.remove(variant)
                report.append(f'- alias: `{variant}` uses canonical `{canonical[0]}`')
    for relative in paths:
        data = safe_file(source, relative).read_bytes()
        validate_svg(data)
        digest = hashlib.sha256(data).hexdigest()
        group, filename = Path(relative).parts
        name = filename[:-4]
        old_path = relative if relative in entries else renames.get(relative)
        if not old_path:
            candidates = [p for p, item in entries.items() if p not in paths
                and (item['sha256'] == digest or normalize(Path(p).stem) == normalize(name))]
            if len(candidates) == 1:
                old_path = candidates[0]
        entry = entries.get(old_path)
        if not entry:
            matches = [row for row in base['STRATAGEMS'] if normalize(row['name']) == normalize(name)]
            if len(matches) > 1:
                raise ValueError(f'Ambiguous legacy name: {name}')
            if matches:
                existing = matches[0]
                category = next(c for c in base['CATEGORIES'] if c['id'] == existing['category_id'])
                target = f"public/icons/stratagems/{category['name']}/{existing['name']}.svg"
                identity = str(uuid.uuid5(NS, 'legacy:' + existing['name']))
            else:
                matching = [row for row in rows if normalize(row['name']) == normalize(name)]
                if matching:
                    raise ValueError(f'Possible duplicate: {name}; map its rename explicitly in state.json')
                identity = str(uuid.uuid5(NS, relative))
                kind = ('experimental' if 'experimental' in group.casefold() else
                        'department' if group in DEPARTMENTS else
                        'general' if group == 'General Stratagems' else 'warbond')
                category = next((c for c in base['CATEGORIES'] if c['name'] == group), None)
                if lookup is None:
                    lookup = Lookup(base['STRATAGEMS'], online=online)
                found = lookup.find(name)
                rows.append({'id': identity, 'name': name, 'group': group, 'kind': kind,
                    'category_id': category['id'] if category else str(uuid.uuid5(NS, 'category:' + group)),
                    'source_path': relative, 'verification': 'unverified', 'enabled': False,
                    'experimental': kind == 'experimental', 'proposed_code': found['code'], **found})
                target = f'public/icons/stratagems/{group}/{name}.svg'
            entry = {'id': identity, 'target': target, 'sha256': None}
        action = 'renamed' if old_path and old_path != relative else 'added' if entry['sha256'] is None else 'modified' if entry['sha256'] != digest else None
        target = safe_file(root, entry['target'])
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        entry.update(sha256=digest, missing=False)
        if old_path and old_path != relative:
            del entries[old_path]
        entries[relative] = entry
        for row in rows:
            if row['id'] == entry['id']:
                # The human-owned name, code, category and verification are never overwritten.
                row['source_path'] = relative
                # A reviewer may change display name/category; keep UI's path convention working.
                display = safe_file(root, f"public/icons/stratagems/{row['group']}/{row['name']}.svg")
                display.parent.mkdir(parents=True, exist_ok=True)
                display.write_bytes(data)
                entry['target'] = display.relative_to(root).as_posix()
        if action:
            report.append(f'- {action}: `{relative}` → `{entry["target"]}`')
    # Refresh evidence for pending proposals. Preserve a human-edited code by comparing
    # it with the previous machine proposal; verified rows are never researched again.
    if online:
        for row in rows:
            if row['verification'] != 'unverified':
                continue
            if lookup is None:
                lookup = Lookup(base['STRATAGEMS'], online=True)
            found = lookup.find(row['name'])
            if row['code'] == row.get('proposed_code'):
                row['code'] = found['code']
            row.update(proposed_code=found['code'], lookup_status=found['lookup_status'],
                       sources=found['sources'])
    for relative, entry in entries.items():
        if relative not in paths:
            entry['missing'] = True
            report.append(f'- missing upstream (retained): `{relative}`')
    state['revision'] = git(source, 'rev-parse', 'HEAD')
    write_json(root / CATALOG, rows)
    write_json(root / STATE, state)
    validate_catalog(root)
    cache_assets(root)
    # Keep the review report outside tracked state so no-change runs stay no-ops.
    lines = ['# Stratagem synchronization', '', 'No automatic merge. New codes are unverified and disabled.',
             'Edit `app/lib/sync/catalog.json` to correct a proposal. See `docs/stratagem-sync.md`.', '',
             '## Source changes', '', *(report or ['No icon changes.']), '', '## Review catalogue', '']
    arrows = {'up': '↑', 'down': '↓', 'left': '←', 'right': '→'}
    for row in rows:
        entry = next(item for item in entries.values() if item['id'] == row['id'])
        url = 'https://raw.githubusercontent.com/nvigneux/Stratagem-Hero-Trainer/codex/stratagem-sync/'
        from urllib.parse import quote
        lines += [f"### {row['name']} — {row['group']} ({row['kind']})", '',
                  f"![Icon]({url + quote(entry['target'], safe='/')})", '',
                  'Proposed code: ' + (' '.join(arrows[d] for d in row['code']) or '**MISSING**'),
                  f"Verification: **{row['verification']}**; lookup: **{row['lookup_status']}**; enabled: {row['enabled']}", '']
        for item in row['sources']:
            sequence = ' '.join(arrows[d] for d in item.get('code') or [])
            lines.append(f"- [{item.get('name', 'Source')}]({item['url']}): {item['status']} {sequence}")
        if not row['sources']:
            lines.append('- No online sources consulted (offline run).')
        lines.append('')
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path)
    parser.add_argument('--offline', action='store_true')
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--report', type=Path, default=Path('/tmp/stratagem-sync-report.md'))
    args = parser.parse_args()
    if args.check:
        validate_catalog(ROOT)
        before = (ROOT / 'public/sw.js').read_bytes()
        cache_assets(ROOT)
        after = (ROOT / 'public/sw.js').read_bytes()
        (ROOT / 'public/sw.js').write_bytes(before)
        if before != after:
            raise ValueError('Service worker stale: run python3 scripts/stratagem_sync/cache.py')
    elif args.source:
        args.report.write_text(synchronize(args.source, online=not args.offline))
    else:
        parser.error('--source or --check is required')


if __name__ == '__main__':
    main()
