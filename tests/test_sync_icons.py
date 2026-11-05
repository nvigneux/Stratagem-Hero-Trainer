import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('sync_icons', Path(__file__).resolve().parents[1] / 'scripts/sync-icons.py')
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)
SVG = b'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>'


class IconSyncTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.source = Path(self.temp.name) / 'source'
        self.destination = Path(self.temp.name) / 'trainer/icons'
        self.source.mkdir()
        self.destination.mkdir(parents=True)

    def put(self, root, path, data=SVG):
        target = root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        return target

    def test_copies_new_warbonds_once_and_preserves_existing_icons(self):
        existing = self.put(self.destination, 'Bridge/Tesla Tower.svg')
        self.put(self.source, 'Bridge/Tesla Tower.svg', SVG.replace(b'M0 0', b'M9 9'))
        self.put(self.source, 'New Warbond/New Tool.svg')
        self.put(self.source, '_Experimental Stratagems/Prototype.svg')
        added = sync.copy_new_icons(self.source, self.destination)
        self.assertEqual(added, [Path('New Warbond/New Tool.svg')])
        self.assertEqual(existing.read_bytes(), SVG)
        self.assertEqual(sync.copy_new_icons(self.source, self.destination), [])
        # Missing upstream icons are retained, too.
        (self.source / 'Bridge/Tesla Tower.svg').unlink()
        sync.copy_new_icons(self.source, self.destination)
        self.assertTrue(existing.exists())

    def test_quote_and_known_alias_differences_do_not_create_duplicates(self):
        self.put(self.destination, 'Robotics Workshop/“Guard Dog”.svg')
        self.put(self.source, 'Robotics Workshop/Guard Dog.svg')
        self.put(self.destination, 'Engineering Bay/Gas Mines.svg')
        self.put(self.source, 'Engineering Bay/Gas Mine.svg')
        self.assertEqual(sync.copy_new_icons(self.source, self.destination), [])

    def test_rejects_unsafe_svg_and_symlink(self):
        icon = self.put(self.source, 'Warbond/Test.svg', b'<svg')
        with self.assertRaises(Exception): sync.copy_new_icons(self.source, self.destination)
        for content in [b'<script/>', b'<path onload="alert(1)"/>',
                        b'<path style="fill:url(https://example.com/x)"/>']:
            icon.write_bytes(SVG.replace(b'<path d="M0 0"/>', content))
            with self.assertRaises(ValueError): sync.copy_new_icons(self.source, self.destination)
        icon.unlink()
        outside = self.put(Path(self.temp.name), 'outside.svg')
        icon.symlink_to(outside)
        with self.assertRaises(ValueError): sync.copy_new_icons(self.source, self.destination)
        self.assertEqual(list(self.destination.rglob('*.svg')), [])

    def test_report_lists_icons_and_explicit_codex_handoff(self):
        body = sync.report([Path('New Warbond/New Tool.svg')], 'automation/stratagem-icons-1')
        self.assertIn('New Tool — New Warbond', body)
        self.assertIn('New%20Warbond/New%20Tool.svg', body)
        self.assertIn('app/lib/placeholder-data-helldivers.js', body)
        self.assertIn('Do not invent missing codes', body)
        self.assertIn('public/sw.js', body)


if __name__ == '__main__':
    unittest.main()
