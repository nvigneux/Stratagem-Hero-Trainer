"""Small, conservative adapters for public stratagem code sources (stdlib only)."""
from functools import lru_cache
import json
import re
import unicodedata
from urllib.parse import quote
from urllib.request import Request, urlopen

GENERATOR = 'https://raw.githubusercontent.com/k33bs/Helldivers-2-Stratagem-JSON-Generator/main/sequences.json'
DIRECTIONS = {'w': 'up', 'a': 'left', 's': 'down', 'd': 'right',
              '↑': 'up', '←': 'left', '↓': 'down', '→': 'right',
              'up': 'up', 'left': 'left', 'down': 'down', 'right': 'right'}
ALIASES = {'gas mine': 'gas mines', 'hellbomb portable': 'portable hellbomb', 'orbital illumination flare': 'illumination flare',
           'guard dog breath': 'guard dog dog breath'}


def normalize(name):
    name = unicodedata.normalize('NFKC', name).casefold().strip()
    # Strip a model only when followed by a descriptive name; GL-28 alone stays distinct.
    model = re.match(r'^([a-z0-9]+(?:/[a-z]+)?-[a-z0-9.]+)\s+(?=\S)', name)
    if model and (any(char.isdigit() for char in model[1]) or model[1] == 'b-md'):
        name = name[model.end():]
    name = re.sub(r'[^\w]+', ' ', name).strip()
    return ALIASES.get(name, name)


def code(value):
    if isinstance(value, str):
        value = value.split() if ' ' in value.strip() else list(value.strip())
    if not isinstance(value, list) or not 1 <= len(value) <= 16:
        raise ValueError('A code must contain 1–16 directions')
    try:
        return [DIRECTIONS[d.casefold()] for d in value]
    except (KeyError, AttributeError):
        raise ValueError('Invalid direction') from None


def download(url):
    with urlopen(Request(url, headers={'User-Agent': 'Stratagem-Hero-Sync/1.0'}), timeout=12) as response:
        data = response.read(2_000_001)
        if len(data) > 2_000_000:
            raise ValueError('Source response too large')
        return data.decode('utf-8')


def wiki_code(text):
    # Only a code in the stratagem infobox is authoritative; ignore examples elsewhere.
    match = re.search(r'\|\s*stratagem_code\s*=\s*\{\{Stratagem[ _]code\|([^{}]+)\}\}', text, re.I)
    return code([x.strip().lower() for x in match[1].split('|')]) if match else None


class Lookup:
    def __init__(self, legacy, online=True):
        self.legacy = legacy
        self.online = online
        self.generator = {}
        self.error = None
        if online:
            try:
                self.generator = json.loads(download(GENERATOR))
                if not isinstance(self.generator, dict):
                    raise ValueError('Expected name-to-sequence mapping')
            except Exception as exc:
                self.generator = {}
                self.error = f'Generator unavailable: {type(exc).__name__}'

    @lru_cache(maxsize=512)
    def find(self, name):
        evidence = []
        for row in self.legacy:
            if normalize(row['name']) == normalize(name):
                evidence.append({'url': 'https://github.com/nvigneux/Stratagem-Hero-Trainer/blob/master/app/lib/placeholder-data-helldivers.js',
                                 'name': row['name'], 'code': code(row['code']), 'status': 'found'})
        matches = [(key, value) for key, value in self.generator.items()
                   if normalize(key) == normalize(name) or key.casefold() == name.casefold()
                   or key.casefold().startswith(name.casefold() + ' ')]
        for key, value in matches:
            try:
                evidence.append({'url': GENERATOR, 'name': key, 'code': code(value), 'status': 'found'})
            except ValueError:
                evidence.append({'url': GENERATOR, 'name': key, 'status': 'invalid-code'})
        if not matches and self.online and not self.error:
            evidence.append({'url': GENERATOR, 'status': 'missing-code'})
        if self.error:
            evidence.append({'url': GENERATOR, 'status': self.error})
        # Try the exact SVG name and matched in-game names; never fuzzy-select a page.
        if self.online:
            titles = list(dict.fromkeys([name] + [key for key, _ in matches]))
            for title in titles[:3]:
                url = 'https://helldivers.wiki.gg/wiki/' + quote(title.replace(' ', '_'), safe='')
                try:
                    result = wiki_code(download(url + '?action=raw'))
                    evidence.append({'url': url, 'name': title, 'code': result,
                                     'status': 'found' if result else 'missing-code'})
                except Exception as exc:
                    evidence.append({'url': url, 'status': f'unavailable: {type(exc).__name__}'})
        distinct = {tuple(item['code']) for item in evidence if item.get('code')}
        return {'code': list(next(iter(distinct))) if len(distinct) == 1 else [],
                'lookup_status': 'conflict' if len(distinct) > 1 else 'found' if distinct else 'missing',
                'sources': evidence}
