"""Copy new stratagem SVGs and prepare a PR description. Never edit game data."""
import argparse
from pathlib import Path
import re
import unicodedata
from urllib.parse import quote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def icon_key(path):
    """Ignore punctuation/quotes while keeping the source folder significant."""
    parts = [
        ''.join(c for c in unicodedata.normalize('NFKC', part).casefold() if c.isalnum())
        for part in (path.parent.name, path.stem)
    ]
    # The source uses Gas Mine.svg; the Trainer already calls it Gas Mines.svg.
    if parts[1] == 'gasmine':
        parts[1] = 'gasmines'
    return tuple(parts)


def validate_svg(data):
    """Accept drawing-only SVGs; reject active content and external references."""
    if len(data) > 1_000_000 or re.search(br'<!DOCTYPE|<!ENTITY|<\?', data, re.I):
        raise ValueError('Unsupported SVG declaration or file larger than 1 MB')
    root = ET.fromstring(data)
    if root.tag != '{http://www.w3.org/2000/svg}svg':
        raise ValueError('Expected an SVG root and namespace')
    allowed = {'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline',
               'line', 'defs', 'clipPath', 'title', 'desc'}
    for element in root.iter():
        if element.tag.split('}')[-1] not in allowed:
            raise ValueError('Unsupported SVG element')
        for key, value in element.attrib.items():
            key = key.split('}')[-1].lower()
            if key.startswith('on') or key in {'href', 'src'}:
                raise ValueError('Active SVG attribute')
            if key == 'style' and not re.fullmatch(
                    r'(?:(?:fill|stroke|fill-rule|clip-rule|opacity|stroke-width):[\w#., %+-]+;?\s*)+', value):
                raise ValueError('Unsupported inline SVG style')
            if re.search(r'url\s*\(', value, re.I) and not re.fullmatch(r'url\(#[\w-]+\)', value):
                raise ValueError('External SVG reference')


def copy_new_icons(source, destination):
    source, destination = source.resolve(), destination.resolve()
    existing = {icon_key(path) for path in destination.glob('*/*.svg')}
    icons = sorted(source.glob('*/*.svg'))
    if not icons:
        raise ValueError('No source SVGs found')
    added = []
    for path in icons:
        if path.parent.name.startswith('.') or 'experimental' in path.parent.name.casefold():
            continue
        if path.is_symlink() or not path.resolve().is_relative_to(source):
            raise ValueError(f'Unsafe source path: {path}')
        key = icon_key(path)
        if key in existing:
            continue
        relative = path.relative_to(source)
        target = destination / relative
        if not target.resolve().is_relative_to(destination) or target.is_symlink():
            raise ValueError(f'Unsafe destination: {target}')
        data = path.read_bytes()
        validate_svg(data)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        existing.add(key)
        added.append(relative)
    return added


def report(icons, branch):
    lines = ['## New stratagem icons', '',
             'Icons only. The existing game catalogue has not been changed.', '']
    for icon in icons:
        url = ('https://raw.githubusercontent.com/nvigneux/Stratagem-Hero-Trainer/'
               + branch + '/public/icons/stratagems/' + quote(icon.as_posix(), safe='/'))
        lines += [f'### {icon.stem} — {icon.parent.name}', '', f'![{icon.stem}]({url})', '']
    lines += ['## Complete with Codex', '',
              'Ask Codex to complete this PR using this prompt:', '',
              '> Add the stratagems above directly to `app/lib/placeholder-data-helldivers.js`,',
              '> following its existing conventions. Reuse existing category UUIDs; add a category',
              '> only for a new department or Warbond. Find directional codes from verifiable',
              '> sources and include the source URLs and arrow sequences in this PR description.',
              '> Do not invent missing codes or add uncertain/experimental entries to gameplay.',
              '> Match icon filenames to the Trainer names. Update `public/sw.js` assets and',
              '> cache version. Run the build and relevant tests. Leave the PR for manual review.', '']
    return '\n'.join(lines)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    parser.add_argument('--report', required=True, type=Path)
    parser.add_argument('--branch', required=True)
    args = parser.parse_args()
    icons = copy_new_icons(args.source, ROOT / 'public/icons/stratagems')
    args.report.write_text(report(icons, args.branch))
    print(f'Copied {len(icons)} new SVG(s). Game data unchanged.')
