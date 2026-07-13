const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const d3 = require('../src/d3-dsv.v1.min.js');
const data = require('../views/data_utils.js');

describe('data intake utilities', function() {
  it('parses CSV, TSV, and sparse JSON with stable columns', function() {
    const csv = data.parseInput('name,value\na,1\nb,2', d3);
    const tsv = data.parseInput('name\tvalue\na\t1', d3);
    const json = data.parseInput('[{"a":1},{"b":2}]', d3);

    assert.deepEqual(csv.columns, ['name', 'value']);
    assert.equal(csv[0].value, 1);
    assert.deepEqual(tsv.columns, ['name', 'value']);
    assert.equal(tsv[0].value, 1);
    assert.deepEqual(json.columns, ['a', 'b']);
  });

  it('rejects malformed and structurally invalid input', function() {
    assert.throws(function() { data.parseInput('', d3); }, /No data/);
    assert.throws(function() { data.parseInput('[{"a":1}', d3); }, /Invalid JSON/);
    assert.throws(function() { data.parseInput('[1,2,3]', d3); }, /Row 1 must be an object/);
    assert.throws(function() { data.validateRows([]); }, /contains no rows/);
  });

  it('profiles common data-quality risks', function() {
    const rows = [];
    for (let i = 0; i < 25; i++) {
      rows.push({
        id: 'person-' + i,
        constant: 'same',
        mostly_missing: i < 18 ? null : i,
        mixed: i % 2 ? i : 'value-' + i
      });
    }
    rows.push({ ...rows[0] });
    rows.columns = ['id', 'constant', 'mostly_missing', 'mixed'];

    const report = data.profile(rows);
    const codes = report.issues.map(function(issue) { return issue.code; });

    assert.equal(report.rowCount, 26);
    assert.equal(report.columnCount, 4);
    assert.equal(report.duplicateRows, 1);
    assert.ok(codes.includes('duplicates'));
    assert.ok(codes.includes('constant'));
    assert.ok(codes.includes('missing'));
    assert.ok(codes.includes('mixed'));
    assert.ok(codes.includes('identifier'));
  });

  it('caps profiling work and marks partial reports', function() {
    const rows = Array.from({ length: 20 }, function(_, i) { return { value: i }; });
    rows.columns = ['value'];
    const report = data.profile(rows, { scanLimit: 5 });

    assert.equal(report.scannedRows, 5);
    assert.equal(report.partial, true);
  });

  it('applies explicit type overrides without throwing on invalid cells', function() {
    const rows = [{ amount: '1,200', when: '2025-01-02' }, { amount: 'bad', when: 'bad' }];
    rows.columns = ['amount', 'when'];

    data.convertColumn(rows, 'amount', 'numeric');
    data.convertColumn(rows, 'when', 'date');

    assert.equal(rows[0].amount, 1200);
    assert.equal(rows[1].amount, null);
    assert.ok(rows[0].when instanceof Date);
    assert.equal(rows[1].when, null);
    data.convertColumn(rows, 'amount', 'text');
    assert.equal(rows[0].amount, '1200');
  });

  it('exports quoted, BOM-prefixed, spreadsheet-safe CSV', function() {
    const rows = [{ name: '=2+2', note: 'a "quote"', amount: -3 }];
    const csv = data.toCsv(rows, ['name', 'note', 'amount']);

    assert.ok(csv.startsWith('\uFEFF'));
    assert.match(csv, /"'=2\+2"/);
    assert.match(csv, /"a ""quote"""/);
    assert.match(csv, /"-3"/);
  });

  it('sorts stably and deduplicates by selected keys', function() {
    const rows = [{ id: 'a', value: 2 }, { id: 'b', value: 1 }, { id: 'c', value: 1 }, { id: 'a', value: 2 }];
    rows.columns = ['id', 'value'];

    const sorted = data.sortRows(rows, 'value', 'asc');
    const unique = data.deduplicateRows(rows, ['id', 'value']);

    assert.deepEqual(sorted.map(function(row) { return row.id; }), ['b', 'c', 'a', 'a']);
    assert.deepEqual(unique.map(function(row) { return row.id; }), ['a', 'b', 'c']);
    assert.deepEqual(unique.columns, ['id', 'value']);
  });

  it('groups rows with count and numeric aggregations', function() {
    const rows = [{ group: 'a', value: 2 }, { group: 'a', value: 4 }, { group: 'b', value: 10 }];
    rows.columns = ['group', 'value'];
    const grouped = data.groupRows(rows, ['group'], [
      { operation: 'count', column: null, as: 'n' },
      { operation: 'mean', column: 'value', as: 'average' },
      { operation: 'sum', column: 'value', as: 'total' }
    ]);

    assert.deepEqual(grouped.columns, ['group', 'n', 'average', 'total']);
    assert.deepEqual(grouped[0], { group: 'a', n: 2, average: 3, total: 6 });
    assert.deepEqual(grouped[1], { group: 'b', n: 1, average: 10, total: 10 });
  });

  it('appends unioned schemas and performs left, inner, and full joins', function() {
    const left = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }];
    left.columns = ['id', 'name'];
    const right = [{ id: 2, name: 'second', score: 20 }, { id: 3, name: 'third', score: 30 }];
    right.columns = ['id', 'name', 'score'];

    const appended = data.appendRows(left, right);
    const inner = data.joinRows(left, right, { leftKey: 'id', type: 'inner' });
    const full = data.joinRows(left, right, { leftKey: 'id', type: 'full' });

    assert.deepEqual(appended.columns, ['id', 'name', 'score']);
    assert.equal(appended.length, 4);
    assert.deepEqual(inner.columns, ['id', 'name', 'name_right', 'score']);
    assert.deepEqual(inner[0], { id: 2, name: 'two', name_right: 'second', score: 20 });
    assert.equal(full.length, 3);
    assert.equal(full[2].id, 3);
  });

  it('round-trips a versioned portable project without derived fields', function() {
    const rows = [{ id: 1, value: 2, X_Value: 99 }];
    rows.columns = ['id', 'value', 'X_Value'];
    const project = data.createProject({
      name: 'Example', data: rows, columns: ['id', 'value'], options: [{ editable: true }], signals: { X_Axis: 'id' },
      transforms: [{ name: 'double', formula: 'value * 2' }], operations: [{ type: 'sort' }]
    });
    const restored = data.parseProject(JSON.stringify(project));

    assert.equal(restored.version, 1);
    assert.deepEqual(restored.data.columns, ['id', 'value']);
    assert.equal(restored.data[0].X_Value, undefined);
    assert.deepEqual(restored.signals, { X_Axis: 'id' });
    assert.equal(restored.operations.length, 1);
    assert.throws(function() { data.parseProject('{"kind":"other"}'); }, /Not a Crossex project/);
  });
});
