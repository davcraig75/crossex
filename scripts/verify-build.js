const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const pkg = require(path.join(root, 'package.json'));

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath));
}

function digest(relativePath) {
  return crypto.createHash('sha256').update(read(relativePath)).digest('hex');
}

const specPath = 'views/crossex.' + pkg.version + '.vg.json';
assert.ok(fs.existsSync(path.join(root, specPath)), 'versioned Vega spec is missing: ' + specPath);
JSON.parse(read(specPath).toString('utf8'));

[
  ['crossex.js', 'public/crossex.js'],
  ['crossex.js', 'electron/crossex.js'],
  ['crossex.js', 'r/crossex/inst/htmlwidgets/lib/crossex/crossex.js'],
  ['crossex_site.js', 'public/crossex_site.js']
].forEach(function(pair) {
  assert.equal(digest(pair[0]), digest(pair[1]), pair[1] + ' is stale; run npm run build:all');
});

['crossex.js', 'crossex_site.js'].forEach(function(relativePath) {
  new vm.Script(read(relativePath).toString('utf8'), { filename: relativePath });
});

assert.match(read('crossex.js').toString('utf8'), /CrossexData/,
  'the shared data utility module is missing from the embeddable build');
assert.match(read('crossex_site.js').toString('utf8'), /renderDataQuality/,
  'the data-quality workflow is missing from the standalone build');
assert.match(read('crossex.js').toString('utf8'), /wireDataLab/,
  'the reproducible Data Lab is missing from the embeddable build');
assert.match(read('crossex.js').toString('utf8'), /createProject/,
  'portable project support is missing from the embeddable build');

const page = read('docs/index.html').toString('utf8');
assert.match(page, /<meta[^>]+name="description"/);
assert.match(page, /id="crossex_app"/);
assert.ok(fs.existsSync(path.join(root, 'docs/.nojekyll')), 'docs/.nojekyll is missing');

console.log('Build artifacts, versioned spec, and distributable copies are in sync.');
