const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

const AUDIT_SCREENSHOTS = '/tmp/crossex-option-audit';
fs.mkdirSync(AUDIT_SCREENSHOTS, { recursive: true });

const CONTROL_IDS = {
  Grids_: 'Gridssmartplot_id',
  Barplot_: 'Barplotsmartplot_id',
  Show_Covariance: 'Show_Covariancesmartplot_id',
  resolve: 'Resolvesmartplot_id'
};

async function waitForExplorer(page) {
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return window._views && window._views.smartplot_id && loader && loader.style.display === 'none';
  }, null, { timeout: 20000 });
}

async function openExample(page, name) {
  await page.goto('/');
  await page.locator('[data-gallery="' + name + '"]').click();
  await waitForExplorer(page);
}

function installErrorCapture(page) {
  const errors = [];
  page.on('pageerror', function(error) { errors.push('pageerror: ' + error.message); });
  page.on('console', function(message) {
    if (message.type() === 'error') errors.push('console: ' + message.text());
  });
  return errors;
}

function controlId(signal) {
  return CONTROL_IDS[signal] || signal + 'smartplot_id';
}

async function settle(page) {
  await page.evaluate(async function() {
    await window._views.smartplot_id.runAsync();
    await new Promise(function(resolve) {
      requestAnimationFrame(function() { requestAnimationFrame(resolve); });
    });
  });
  // Vega force layouts (categorical jitter) finish after the main dataflow
  // promise resolves. Wait for their static iterations to paint.
  await page.waitForTimeout(300);
}

async function setControl(page, signal, value) {
  const selector = '#' + controlId(signal) + ' input, #' + controlId(signal) + ' select';
  const control = page.locator(selector).first();
  await expect(control, signal + ' has a bound control').toHaveCount(1);
  await control.evaluate(function(element, nextValue) {
    if (element.type === 'checkbox') element.checked = Boolean(nextValue);
    else element.value = String(nextValue);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
  await page.waitForFunction(function(args) {
    return window._views.smartplot_id.signal(args.signal) === args.value;
  }, { signal: signal, value: value });
  await settle(page);
}

async function chartState(page) {
  return page.evaluate(function() {
    const view = window._views.smartplot_id;
    const canvas = document.querySelector('#view_crossexsmartplot_id canvas');
    if (!canvas) return { exists: false };
    const context = canvas.getContext('2d');
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = 1;
    let nonWhite = 0;
    let chromatic = 0;
    let hash = 2166136261;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2], a = pixels[index + 3];
        if (a > 20 && (r < 245 || g < 245 || b < 245)) nonWhite++;
        if (a > 20 && Math.max(r, g, b) - Math.min(r, g, b) > 18) chromatic++;
        hash ^= r; hash = Math.imul(hash, 16777619);
        hash ^= g; hash = Math.imul(hash, 16777619);
        hash ^= b; hash = Math.imul(hash, 16777619);
        hash ^= a; hash = Math.imul(hash, 16777619);
      }
    }
    const signal = function(name) {
      try { return view.signal(name); } catch (_) { return undefined; }
    };
    return {
      exists: true,
      width: canvas.width,
      height: canvas.height,
      cssWidth: canvas.getBoundingClientRect().width,
      cssHeight: canvas.getBoundingClientRect().height,
      nonWhite: nonWhite,
      chromatic: chromatic,
      fingerprint: (hash >>> 0).toString(16),
      modes: {
        scatter: signal('show_scatter_graph'),
        histogram: signal('show_hist_graph'),
        box: signal('show_box_graphs'),
        horizontalBox: signal('show_hzbox_graphs'),
        stacked: signal('show_stacked_graphs'),
        grid: signal('show_grid_graphs'),
        covariance: signal('Show_Covariance'),
        qq: signal('QQNorm_'),
        line: signal('Line_'),
        points: signal('Points_')
      },
      rows: signal('rows_count'),
      columns: signal('cols_count')
    };
  });
}

async function checkpoint(page, testInfo, label, previousFingerprint) {
  const state = await chartState(page);
  expect(state.exists, label + ' has a chart canvas').toBe(true);
  expect(state.width, label + ' canvas width').toBeGreaterThan(250);
  expect(state.height, label + ' canvas height').toBeGreaterThan(150);
  expect(state.cssWidth, label + ' visible width').toBeGreaterThan(250);
  expect(state.cssHeight, label + ' visible height').toBeGreaterThan(150);
  expect(state.nonWhite, label + ' has visible marks and axes').toBeGreaterThan(100);
  expect(state.chromatic, label + ' has colored chart marks').toBeGreaterThan(20);
  if (previousFingerprint) {
    expect(state.fingerprint, label + ' changes the rendered chart').not.toBe(previousFingerprint);
  }
  const filename = testInfo.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-' + label + '.png';
  await page.screenshot({ path: AUDIT_SCREENSHOTS + '/' + filename, fullPage: false });
  return state;
}

test('faceting transitions: columns, rows, both, and back to unfaceted', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');
  const base = await checkpoint(page, testInfo, 'unfaceted');
  expect(base.rows).toBe(1);
  expect(base.columns).toBe(1);

  await setControl(page, 'Facet_Cols_By', 'island');
  const columns = await checkpoint(page, testInfo, 'column-facets', base.fingerprint);
  expect(columns.columns).toBe(3);
  expect(columns.rows).toBe(1);

  await setControl(page, 'Facet_Cols_By', 'None');
  await setControl(page, 'Facet_Rows_By', 'species');
  const rows = await checkpoint(page, testInfo, 'row-facets', columns.fingerprint);
  expect(rows.columns).toBe(1);
  expect(rows.rows).toBe(3);

  await setControl(page, 'Facet_Cols_By', 'island');
  const both = await checkpoint(page, testInfo, 'row-and-column-facets', rows.fingerprint);
  expect(both.columns).toBe(3);
  expect(both.rows).toBe(3);

  await setControl(page, 'Facet_Cols_By', 'None');
  await setControl(page, 'Facet_Rows_By', 'None');
  const restored = await checkpoint(page, testInfo, 'restored-unfaceted', both.fingerprint);
  expect(restored.rows).toBe(1);
  expect(restored.columns).toBe(1);
  expect(errors).toEqual([]);
});

test('scatter options and visual encodings all alter a valid plot', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');
  let state = await checkpoint(page, testInfo, 'base-scatter');
  expect(state.modes.scatter).toBe(true);

  for (const option of [
    ['Regression_', true, 'regression'],
    ['Contours_', true, 'contours'],
    ['resolve', 'shared', 'shared-contour-resolution'],
    ['Histogram_', true, 'marginal-histogram'],
    ['Size_By', 'flipper_length_mm', 'size-encoding'],
    ['Opacity_By', 'body_mass_g', 'opacity-encoding'],
    ['Stroke_By', 'sex', 'stroke-encoding'],
    ['Palette', 'Viridis', 'palette']
  ]) {
    await setControl(page, option[0], option[1]);
    state = await checkpoint(page, testInfo, option[2], state.fingerprint);
  }
  expect(state.modes.scatter).toBe(true);
  expect(state.modes.histogram).toBe(true);
  expect(errors).toEqual([]);
});

test('plot changes show a blocking rendering state until Vega settles', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await page.locator('#Charts_tablinkssmartplot_id').click();
  const points = page.locator('#Points_smartplot_id input');
  const before = await page.evaluate(function() { return window._views.smartplot_id.signal('Points_'); });

  await points.click();
  const busy = await page.evaluate(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    const graph = document.getElementById('cc_graphsmartplot_id');
    const panel = document.getElementById('cc_tabscontentsmartplot_id');
    const chart = document.getElementById('cc_graph_containersmartplot_id');
    return {
      loaderVisible: getComputedStyle(loader).display !== 'none',
      status: loader.getAttribute('role'),
      label: loader.getAttribute('aria-label'),
      ariaBusy: graph.getAttribute('aria-busy'),
      panelInert: panel.inert,
      chartInert: chart.inert
    };
  });
  expect(busy).toEqual({
    loaderVisible: true,
    status: 'status',
    label: 'Rendering plot',
    ariaBusy: 'true',
    panelInert: true,
    chartInert: true
  });

  await page.waitForFunction(function() {
    return document.getElementById('cc_loadersmartplot_id').style.display === 'none';
  });
  expect(await page.evaluate(function() { return window._views.smartplot_id.signal('Points_'); })).toBe(!before);
  expect(await page.locator('#cc_graphsmartplot_id').getAttribute('aria-busy')).toBe('false');
  expect(await page.locator('#cc_tabscontentsmartplot_id').evaluate(function(node) { return node.inert; })).toBe(false);
  expect(errors).toEqual([]);
});

test('axis controls redraw and restore a scatter plot', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'flipper_length_mm');
  await setControl(page, 'Y_Axis', 'body_mass_g');
  let state = await checkpoint(page, testInfo, 'base-axes');

  for (const option of [
    ['LogX_', true, 'log-x'],
    ['LogY_', true, 'log-y'],
    ['Reverse_X', true, 'reverse-x'],
    ['Reverse_Y', true, 'reverse-y'],
    ['Grids_', true, 'grid-lines']
  ]) {
    await setControl(page, option[0], option[1]);
    state = await checkpoint(page, testInfo, option[2], state.fingerprint);
  }
  expect(state.modes.scatter).toBe(true);
  expect(errors).toEqual([]);
});

test('histogram, ECDF, QQ, and bin controls transition cleanly', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'histogram');
  let state = await checkpoint(page, testInfo, 'histogram');
  expect(state.modes.histogram).toBe(true);

  await setControl(page, 'Histogram_Bins_Size', '10');
  state = await checkpoint(page, testInfo, 'ten-bins', state.fingerprint);

  await setControl(page, 'ECDF_', true);
  state = await checkpoint(page, testInfo, 'ecdf-overlay', state.fingerprint);
  await setControl(page, 'ECDF_', false);

  await setControl(page, 'QQNorm_', true);
  state = await checkpoint(page, testInfo, 'normal-qq', state.fingerprint);
  expect(state.modes.qq).toBe(true);
  expect(await page.locator('#Facet_Rows_Bysmartplot_id select').isDisabled()).toBe(true);
  expect(await page.locator('#Facet_Cols_Bysmartplot_id select').isDisabled()).toBe(true);
  expect(await page.evaluate(function() { return window._views.smartplot_id.data('qq_data').length; })).toBeGreaterThan(100);

  await setControl(page, 'QQNorm_', false);
  const restored = await checkpoint(page, testInfo, 'histogram-restored', state.fingerprint);
  expect(restored.modes.qq).toBe(false);
  expect(await page.locator('#Facet_Rows_Bysmartplot_id select').isDisabled()).toBe(false);
  expect(await page.locator('#Facet_Cols_Bysmartplot_id select').isDisabled()).toBe(false);
  expect(errors).toEqual([]);
});

test('box, violin, outlier, dash, and horizontal box modes work', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'box');
  await setControl(page, 'Y_Axis', 'bill_length_mm');
  let state = await checkpoint(page, testInfo, 'box');
  expect(state.modes.box).toBe(true);

  await setControl(page, 'Barplot_', true);
  state = await checkpoint(page, testInfo, 'bar-overlay', state.fingerprint);
  await setControl(page, 'Barplot_', false);
  await setControl(page, 'Stats_', true);
  state = await checkpoint(page, testInfo, 'summary-stat-labels', state.fingerprint);
  await setControl(page, 'Stats_', false);

  await setControl(page, 'Violin_', true);
  state = await checkpoint(page, testInfo, 'box-and-violin', state.fingerprint);
  await setControl(page, 'Boxplot_', false);
  state = await checkpoint(page, testInfo, 'violin-only', state.fingerprint);
  await setControl(page, 'Outliers_', true);
  state = await checkpoint(page, testInfo, 'violin-outliers', state.fingerprint);
  await setControl(page, 'Dashes_', true);
  state = await checkpoint(page, testInfo, 'violin-dashes', state.fingerprint);

  await setControl(page, 'X_Axis', 'body_mass_g');
  await setControl(page, 'Y_Axis', 'species');
  state = await checkpoint(page, testInfo, 'horizontal-distribution', state.fingerprint);
  expect(state.modes.horizontalBox).toBe(true);
  expect(errors).toEqual([]);
});

test('line plots support point toggles and faceting without stale state', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'line');
  let state = await checkpoint(page, testInfo, 'line-with-points');
  expect(state.modes.line).toBe(true);
  expect(state.modes.points).toBe(true);

  await setControl(page, 'Points_', false);
  state = await checkpoint(page, testInfo, 'line-only', state.fingerprint);
  expect(state.modes.line).toBe(true);
  expect(state.modes.points).toBe(false);

  await setControl(page, 'Facet_Cols_By', 'island');
  state = await checkpoint(page, testInfo, 'faceted-line', state.fingerprint);
  expect(state.columns).toBe(3);
  await setControl(page, 'Facet_Cols_By', 'None');
  state = await checkpoint(page, testInfo, 'unfaceted-line-restored', state.fingerprint);
  expect(state.columns).toBe(1);
  expect(errors).toEqual([]);
});

test('histogram, box, stacked, and heatmap modes facet and unfacet cleanly', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  const cases = [
    { gallery: 'histogram', facet: 'island', mode: 'histogram' },
    { gallery: 'box', facet: 'island', mode: 'box' },
    { gallery: 'stacked', facet: 'sex', mode: 'stacked' },
    { gallery: 'heatmap', facet: 'sex', mode: 'grid' }
  ];
  for (const config of cases) {
    await openExample(page, config.gallery);
    let state = await checkpoint(page, testInfo, config.gallery + '-unfaceted');
    expect(state.modes[config.mode], config.gallery + ' starts in the expected graph mode').toBe(true);
    expect(state.columns).toBe(1);

    await setControl(page, 'Facet_Cols_By', config.facet);
    state = await checkpoint(page, testInfo, config.gallery + '-faceted', state.fingerprint);
    expect(state.modes[config.mode], config.gallery + ' stays in the expected graph mode').toBe(true);
    expect(state.columns).toBeGreaterThan(1);

    await setControl(page, 'Facet_Cols_By', 'None');
    state = await checkpoint(page, testInfo, config.gallery + '-unfaceted-restored', state.fingerprint);
    expect(state.modes[config.mode], config.gallery + ' restores the expected graph mode').toBe(true);
    expect(state.columns).toBe(1);
  }
  expect(errors).toEqual([]);
});

test('stacked count, sum, and categorical heatmap transitions work', async function({ page }, testInfo) {
  const errors = installErrorCapture(page);
  await openExample(page, 'stacked');
  let state = await checkpoint(page, testInfo, 'stacked-count');
  expect(state.modes.stacked).toBe(true);

  await setControl(page, 'Color_By', 'None');
  state = await checkpoint(page, testInfo, 'unstacked-count', state.fingerprint);
  await setControl(page, 'Y_Axis', 'Sum');
  await setControl(page, 'Sum_By', 'body_mass_g');
  state = await checkpoint(page, testInfo, 'category-sum', state.fingerprint);
  expect(state.modes.stacked).toBe(true);

  await setControl(page, 'X_Axis', 'island');
  await setControl(page, 'Y_Axis', 'species');
  await setControl(page, 'Color_By', 'None');
  state = await checkpoint(page, testInfo, 'count-heatmap', state.fingerprint);
  expect(state.modes.grid).toBe(true);
  await setControl(page, 'Color_By', 'sex');
  state = await checkpoint(page, testInfo, 'encoded-categorical-grid', state.fingerprint);
  await setControl(page, 'Jitter_', true);
  state = await checkpoint(page, testInfo, 'jittered-categorical-grid', state.fingerprint);
  expect(state.modes.grid).toBe(true);
  expect(errors).toEqual([]);
});
