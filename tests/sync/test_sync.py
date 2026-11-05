import copy
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / 'scripts/stratagem_sync'))
from sources import Lookup, code, normalize, wiki_code
from sync import CATALOG, STATE, ROOT, cache_assets, synchronize, validate_catalog, validate_svg
from approval import check

SVG = b'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>'


class SourcesTest(unittest.TestCase):
    def test_normalization(self):
        for name in ['AX/AR-23 “Guard Dog”', 'Guard Dog', '  guard  dog ']:
            self.assertEqual(normalize(name), 'guard dog')
        self.assertEqual(normalize('Anti-Tank Mines'), normalize('MD-17 Anti-Tank Mines'))
        self.assertEqual(normalize('Anti-Materiel Rifle'), normalize('APW-1 Anti-Materiel Rifle'))
        self.assertNotEqual(normalize('GL-28'), normalize('CQC-20'))
        self.assertEqual(code(['W', 'S', 'A', 'D']), ['up', 'down', 'left', 'right'])
        self.assertEqual(code('↑↓←→'), ['up', 'down', 'left', 'right'])
        for value in [[], ['sideways'], 'unknown']:
            with self.assertRaises(ValueError): code(value)

    def test_wiki(self):
        self.assertEqual(wiki_code('| stratagem_code = {{Stratagem_code|up|down|right}}'),
                         ['up', 'down', 'right'])
        self.assertIsNone(wiki_code('{{Stratagem code|down|left}}'))

    def test_conflicts_never_select_winner(self):
        lookup = Lookup([{'name': 'Machine Gun', 'code': ['down']}], online=False)
        lookup.generator = {'MG-43 Machine Gun': ['W']}
        result = lookup.find('Machine Gun')
        self.assertEqual(result['lookup_status'], 'conflict')
        self.assertEqual(result['code'], [])
        self.assertEqual(len(result['sources']), 2)
        self.assertEqual(lookup.find('Unknown')['lookup_status'], 'missing')

    def test_active_svg_rejected(self):
        validate_svg(SVG)
        for fragment in [b'<script/>', b'<foreignObject/>', b'<path onload="x"/>',
                         b'<path fill="url(https://evil.example/x)"/>']:
            with self.assertRaises(ValueError):
                validate_svg(SVG.replace(b'<path d="M0 0"/>', fragment))
        with self.assertRaises(ValueError): validate_svg(b'<!DOCTYPE svg>' + SVG)
        with self.assertRaises(Exception): validate_svg(b'<svg')

    def test_approval_binds_corrections(self):
        row = {'id': '1', 'name': 'Test', 'verification': 'verified', 'code': ['up']}
        with self.assertRaises(ValueError): check([], [row], False)
        check([], [row], True)
        check([row], [row], False)
        changed = dict(row, code=['down'])
        with self.assertRaises(ValueError): check([row], [changed], False)


class SyncTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name) / 'trainer'
        self.source = Path(self.temp.name) / 'source'
        self.source.mkdir()
        for relative in ['app/lib/placeholder-data-helldivers.js', 'public/sw.js']:
            target = self.root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(ROOT / relative, target)
        self.git('init', '-q')
        self.git('config', 'user.name', 'Test')
        self.git('config', 'user.email', 'test@example.com')
        self.put('Bridge/HMG Emplacement.svg', SVG)
        self.put('New Warbond/New Thing.svg', SVG.replace(b'M0 0', b'M1 1'))
        self.commit()

    def tearDown(self): self.temp.cleanup()

    def git(self, *args):
        return subprocess.check_output(['git', '-C', str(self.source), *args])

    def put(self, relative, content):
        target = self.source / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)

    def commit(self):
        self.git('add', '.')
        self.git('commit', '-qm', 'fixture')

    def run_sync(self): return synchronize(self.source, self.root, online=False)

    def snapshot(self):
        return {p.relative_to(self.root).as_posix(): p.read_bytes()
                for p in self.root.rglob('*') if p.is_file()}

    def test_idempotence_and_manual_edit_preservation(self):
        self.run_sync()
        first = self.snapshot()
        self.run_sync()
        self.assertEqual(first, self.snapshot())
        rows = json.loads((self.root / CATALOG).read_text())
        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]['verification'], 'unverified')
        self.assertFalse(rows[0]['enabled'])
        rows[0].update(code=['left', 'up'], verification='verified', enabled=True)
        (self.root / CATALOG).write_text(json.dumps(rows))
        self.put('New Warbond/New Thing.svg', SVG.replace(b'M0 0', b'M2 2'))
        self.commit()
        self.run_sync()
        self.assertEqual(json.loads((self.root / CATALOG).read_text()), rows)
        self.assertEqual(self.snapshot()['app/lib/placeholder-data-helldivers.js'],
                         first['app/lib/placeholder-data-helldivers.js'])

    def test_evidence_refresh_preserves_manual_pending_code(self):
        self.run_sync()
        rows = json.loads((self.root / CATALOG).read_text())
        rows[0]['code'] = ['left']
        (self.root / CATALOG).write_text(json.dumps(rows))
        evidence = {'code': ['up'], 'lookup_status': 'found',
                    'sources': [{'url': 'https://helldivers.wiki.gg/wiki/Test',
                                 'status': 'found', 'code': ['up']}]}
        with patch('sync.Lookup') as lookup:
            lookup.return_value.find.return_value = evidence
            synchronize(self.source, self.root, online=True)
        after = json.loads((self.root / CATALOG).read_text())[0]
        self.assertEqual(after['code'], ['left'])
        self.assertEqual(after['proposed_code'], ['up'])
        self.assertEqual(after['verification'], 'unverified')
        self.assertFalse(after['enabled'])

    def test_rename_removal_and_stable_identity(self):
        self.run_sync()
        before = json.loads((self.root / CATALOG).read_text())[0]
        self.git('mv', 'New Warbond/New Thing.svg', 'New Warbond/Renamed Thing.svg')
        self.commit()
        self.assertIn('renamed', self.run_sync())
        after = json.loads((self.root / CATALOG).read_text())[0]
        self.assertEqual(before['id'], after['id'])
        self.assertEqual(before['name'], after['name'])
        self.git('rm', 'New Warbond/Renamed Thing.svg')
        self.commit()
        self.assertIn('retained', self.run_sync())
        self.assertTrue((self.root / 'public/icons/stratagems/New Warbond/New Thing.svg').exists())
        self.assertEqual(len(json.loads((self.root / CATALOG).read_text())), 1)

    def test_experimental_and_cache_version(self):
        self.run_sync()
        before = (self.root / 'public/sw.js').read_text()
        self.put('_Experimental Stratagems/Test.svg', SVG)
        self.commit()
        self.run_sync()
        rows = json.loads((self.root / CATALOG).read_text())
        self.assertTrue(rows[-1]['experimental'])
        self.assertFalse(rows[-1]['enabled'])
        self.assertNotEqual(before, (self.root / 'public/sw.js').read_text())
        rows[-1].update(enabled=True, verification='verified', code=['up'])
        (self.root / CATALOG).write_text(json.dumps(rows))
        with self.assertRaises(ValueError): validate_catalog(self.root)

    def test_symlink_and_duplicate_fail_closed(self):
        (self.source / 'New Warbond/New Thing.svg').unlink()
        (self.source / 'New Warbond/New Thing.svg').symlink_to('/etc/passwd')
        self.commit()
        with self.assertRaises(ValueError): self.run_sync()


if __name__ == '__main__': unittest.main()
