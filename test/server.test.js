const { after, before, describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { startServer } = require('../app');

describe('production server', function() {
  let server;
  let origin;

  before(async function() {
    server = startServer(0);
    await new Promise(function(resolve, reject) {
      server.once('listening', resolve);
      server.once('error', reject);
    });
    origin = 'http://127.0.0.1:' + server.address().port;
  });

  after(async function() {
    if (!server) { return; }
    await new Promise(function(resolve, reject) {
      server.close(function(error) { error ? reject(error) : resolve(); });
    });
  });

  it('renders the explorer with production metadata', async function() {
    const response = await fetch(origin + '/');
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.equal(response.headers.get('x-powered-by'), null);
    assert.match(response.headers.get('cache-control'), /no-cache/);
    assert.match(html, /<title>Crossex \| Private, no-code data explorer<\/title>/);
    assert.match(html, /id="crossex_app"/);
  });

  it('reports a machine-readable health check', async function() {
    const response = await fetch(origin + '/healthz');
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(payload.status, 'ok');
    assert.match(payload.version, /^\d+\.\d+$/);
  });

  it('serves browser assets and returns a clean 404', async function() {
    const asset = await fetch(origin + '/src/d3-dsv.v1.min.js');
    const missing = await fetch(origin + '/definitely-not-a-route');

    assert.equal(asset.status, 200);
    assert.match(asset.headers.get('cache-control'), /max-age=3600/);
    assert.equal(missing.status, 404);
    assert.doesNotMatch(await missing.text(), /Error:|at \/|node_modules/);
  });
});
