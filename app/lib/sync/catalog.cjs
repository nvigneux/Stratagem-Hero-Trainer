const additions = require('./catalog.json');

const validCode = (code) => Array.isArray(code) && code.length > 0 && code.length <= 16
  && code.every((direction) => ['up', 'down', 'left', 'right'].includes(direction));

// Legacy rows retain their established behavior. New rows fail closed.
function extendCatalog(stratagems, categories, rows = additions) {
  const result = [...stratagems];
  const groups = [...categories];
  const names = new Set(result.map((row) => row.name.toLowerCase()));
  rows.forEach((row) => {
    if (row.verification !== 'verified' || row.enabled !== true || row.experimental !== false
      || !validCode(row.code) || names.has(row.name.toLowerCase())) return;
    const category = groups.find((group) => group.id === row.category_id);
    if (!category) groups.push({ id: row.category_id, name: row.group });
    result.push({ name: row.name, code: row.code, category_id: row.category_id });
    names.add(row.name.toLowerCase());
  });
  return { stratagems: result, categories: groups };
}

module.exports = { extendCatalog, validCode };
