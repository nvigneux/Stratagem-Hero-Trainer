const { test } = require('node:test');
const assert = require('node:assert/strict');
const { extendCatalog, validCode } = require('../../app/lib/sync/catalog.cjs');
const { STRATAGEMS, CATEGORIES } = require('../../app/lib/placeholder-data-helldivers');

test('Legacy catalogue remains unchanged', () => {
  assert.deepEqual(extendCatalog(STRATAGEMS, CATEGORIES, []), {
    stratagems: STRATAGEMS, categories: CATEGORIES,
  });
  STRATAGEMS.forEach((row) => {
    assert.ok(validCode(row.code), row.name);
    assert.ok(CATEGORIES.some((group) => group.id === row.category_id));
  });
});

test('New rows require verification, enablement, code, and nonexperimental status', () => {
  const row = {
    name: 'Test', category_id: 'new-category', group: 'New Warbond',
    code: ['up'], verification: 'verified', enabled: true, experimental: false,
  };
  const result = extendCatalog(STRATAGEMS, CATEGORIES, [row]);
  assert.equal(result.stratagems.length, STRATAGEMS.length + 1);
  assert.deepEqual(result.categories.at(-1), { id: 'new-category', name: 'New Warbond' });
  [
    { verification: 'unverified' }, { enabled: false }, { experimental: true },
    { code: [] }, { code: ['W'] }, { name: STRATAGEMS[0].name },
  ].forEach((override) => {
    assert.deepEqual(extendCatalog(STRATAGEMS, CATEGORIES, [{ ...row, ...override }])
      .stratagems, STRATAGEMS);
  });
});
