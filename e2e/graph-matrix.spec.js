const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

const AUDIT_SCREENSHOTS = '/tmp/crossex-graph-audit';
fs.mkdirSync(AUDIT_SCREENSHOTS, { recursive: true });

const GALLERY_CASES = {
  scatter:   { signals: { X_Axis: 'flipper_length_mm', Y_Axis: 'body_mass_g', Color_By: 'species' } },
  line:      { signals: { X_Axis: 'year', Y_Axis: 'body_mass_g', Color_By: 'species', Line_: true } },
  histogram: { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None' } },
  ecdf:      { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', ECDF_: true } },
  qqnorm:    { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', QQNorm_: true } },
  box:       { signals: { X_Axis: 'species', Y_Axis: 'body_mass_g', Boxplot_: true } },
  violin:    { signals: { X_Axis: 'species', Y_Axis: 'body_mass_g', Violin_: true, Boxplot_: false } },
  stacked:   { signals: { X_Axis: 'island', Y_Axis: 'Count', Color_By: 'species' } },
  heatmap:   { signals: { X_Axis: 'island', Y_Axis: 'species' } },
  facet:     { signals: { Facet_Cols_By: 'island', Color_By: 'species' } },
  corr:      { signals: { Show_Covariance: true } },
  threed:    { overlay: '#cc_3dsmartplot_id', signals: { Color_By: 'species' } },
  overview:  { overlay: '#cc_overviewsmartplot_id' }
};

async function waitForExplorer(page) {
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return window._views && window._views.smartplot_id && loader && loader.style.display === 'none';
  }, null, { timeout: 20000 });
}

async function canvasDiagnostics(page) {
  return page.evaluate(function() {
    const canvas = document.querySelector('#view_crossexsmartplot_id canvas');
    if (!canvas) return { exists: false };
    const context = canvas.getContext('2d');
    if (!context) return { exists: true, width: canvas.width, height: canvas.height, nonWhite: -1, chromatic: -1 };
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = Math.max(1, Math.floor(Math.sqrt((canvas.width * canvas.height) / 100000)));
    let nonWhite = 0;
    let chromatic = 0;
    let sampled = 0;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2], a = pixels[index + 3];
        sampled++;
        if (a > 20 && (r < 245 || g < 245 || b < 245)) nonWhite++;
        if (a > 20 && Math.max(r, g, b) - Math.min(r, g, b) > 18) chromatic++;
      }
    }
    return {
      exists: true,
      width: canvas.width,
      height: canvas.height,
      cssWidth: canvas.getBoundingClientRect().width,
      cssHeight: canvas.getBoundingClientRect().height,
      nonWhite: nonWhite,
      chromatic: chromatic,
      sampled: sampled,
      pngLength: canvas.toDataURL('image/png').length
    };
  });
}

async function assertRendered(page, label) {
  const diagnostics = await canvasDiagnostics(page);
  expect(diagnostics.exists, label + ' has a canvas').toBe(true);
  expect(diagnostics.width, label + ' canvas width').toBeGreaterThan(250);
  expect(diagnostics.height, label + ' canvas height').toBeGreaterThan(150);
  expect(diagnostics.cssWidth, label + ' visible width').toBeGreaterThan(250);
  expect(diagnostics.cssHeight, label + ' visible height').toBeGreaterThan(150);
  expect(diagnostics.nonWhite, label + ' contains rendered pixels').toBeGreaterThan(100);
  expect(diagnostics.chromatic, label + ' contains colored chart marks').toBeGreaterThan(20);
  expect(diagnostics.pngLength, label + ' PNG is non-trivial').toBeGreaterThan(5000);
  return diagnostics;
}

for (const [name, config] of Object.entries(GALLERY_CASES)) {
  test('gallery graph renders: ' + name, async function({ page }, testInfo) {
    const errors = [];
    page.on('pageerror', function(error) { errors.push('pageerror: ' + error.message); });
    page.on('console', function(message) {
      if (message.type() === 'error') errors.push('console: ' + message.text());
    });

    await page.goto('/');
    await page.locator('[data-gallery="' + name + '"]').click();
    await waitForExplorer(page);

    for (const [signal, value] of Object.entries(config.signals || {})) {
      if (name === 'corr' && signal === 'Show_Covariance') {
        await page.waitForFunction(function() {
          const loader = document.getElementById('cc_loadersmartplot_id');
          return window._views.smartplot_id.signal('Show_Covariance') === true &&
            window._views.smartplot_id.data('covariance').length > 0 && loader.style.display === 'none';
        }, null, { timeout: 20000 });
      }
      const actual = await page.evaluate(function(signalName) {
        return window._views.smartplot_id.signal(signalName);
      }, signal);
      expect(actual, name + ' signal ' + signal).toEqual(value);
    }

    if (config.overlay) {
      await expect(page.locator(config.overlay)).toBeVisible({ timeout: 20000 });
      if (name === 'overview') await expect(page.locator('#cc_overviewsmartplot_id .cc_ovcard')).toHaveCount(8);
      if (name === 'threed') {
        await expect(page.locator('#cc_3d_stagesmartplot_id canvas').first()).toBeVisible();
        expect(await page.locator('#cc_3d_stagesmartplot_id canvas').count()).toBeGreaterThanOrEqual(1);
        await expect(page.locator('#cc_3d_notesmartplot_id')).not.toContainText(/unavailable|error/i);
      }
    }

    const diagnostics = await assertRendered(page, name);
    await page.screenshot({ path: AUDIT_SCREENSHOTS + '/' + name + '.png', fullPage: false });
    await testInfo.attach(name + '-diagnostics', { body: JSON.stringify(diagnostics, null, 2), contentType: 'application/json' });
    await testInfo.attach(name + '-screenshot', { body: await page.screenshot({ fullPage: false }), contentType: 'image/png' });
    expect(errors, name + ' emitted no browser errors').toEqual([]);
  });
}
