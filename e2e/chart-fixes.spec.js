const { test, expect } = require('@playwright/test');

// Regressions for the horizontal-box audit (histogram leak, violin fills,
// box opacity), the new distribution controls, Y histogram, per-row scatter
// domains, chart-title editing, tab consolidation, clear-settings redraw,
// and overlay buttons after the interactive-mode rebuild.

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

async function settle(page) {
  await page.evaluate(async function() {
    await window._views.smartplot_id.runAsync();
    await new Promise(function(resolve) {
      requestAnimationFrame(function() { requestAnimationFrame(resolve); });
    });
  });
  await page.waitForTimeout(300);
}

async function setControl(page, signal, value) {
  const selector = '#' + signal + 'smartplot_id input, #' + signal + 'smartplot_id select';
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

async function fingerprint(page) {
  return page.evaluate(function() {
    const canvas = document.querySelector('#view_crossexsmartplot_id canvas');
    if (!canvas) return null;
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let hash = 2166136261;
    for (let i = 0; i < pixels.length; i += 4) {
      hash ^= pixels[i]; hash = Math.imul(hash, 16777619);
      hash ^= pixels[i + 2]; hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  });
}

async function display(page, signal) {
  return page.evaluate(function(id) {
    const node = document.getElementById(id);
    return node ? node.style.display : 'missing';
  }, signal + 'smartplot_id');
}

async function contourPaths(page) {
  return page.evaluate(function() {
    let paths = 0;
    (function walk(mark) {
      if (!mark || !mark.items) return;
      mark.items.forEach(function(item) {
        if (mark.marktype === 'path') paths++;
        if (mark.marktype === 'group' && item.items) item.items.forEach(walk);
      });
    })(window._views.smartplot_id.scenegraph().root);
    return paths;
  });
}

test('horizontal box charts: no histogram leak, violin renders, opacity and thickness apply', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'box');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'sex');
  await setControl(page, 'Color_By', 'species');

  const state = await page.evaluate(function() {
    const view = window._views.smartplot_id;
    return { hz: view.signal('show_hzbox_graphs'), hist: view.signal('show_hist_graph') };
  });
  expect(state.hz).toBe(true);
  // the histogram pane leaking over this chart caused stray count axes and
  // duplicated labels/titles
  expect(state.hist).toBe(false);

  let fp = await fingerprint(page);
  await setControl(page, 'Violin_', true);
  let next = await fingerprint(page);
  expect(next, 'violin renders on a colored horizontal box chart').not.toBe(fp);
  fp = next;

  await setControl(page, 'Boxplot_Opacity', 0.1);
  next = await fingerprint(page);
  expect(next, 'box opacity applies to horizontal boxes').not.toBe(fp);
  fp = next;

  await setControl(page, 'Median_Thickness', 8);
  next = await fingerprint(page);
  expect(next, 'median bar thickness changes').not.toBe(fp);
  fp = next;

  await setControl(page, 'Violin_Bandwidth', '3');
  next = await fingerprint(page);
  expect(next, 'violin bandwidth reshapes the density').not.toBe(fp);
  expect(errors).toEqual([]);
});

test('outline by colors box value points and shows its width control', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'box');
  await setControl(page, 'Y_Axis', 'bill_length_mm');
  await setControl(page, 'Box_Points_', true);
  const before = await fingerprint(page);
  expect(await display(page, 'Stroke_Width')).toBe('none');

  await setControl(page, 'Stroke_By', 'sex');
  expect(await display(page, 'Stroke_Width')).toBe('block');
  const outlined = await fingerprint(page);
  expect(outlined, 'outline mapping restrokes the value points').not.toBe(before);

  await setControl(page, 'Stroke_Width', 4);
  expect(await fingerprint(page), 'outline width applies to the points').not.toBe(outlined);
  expect(errors).toEqual([]);
});

test('scatter offers marginal histograms on both axes', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  expect(await display(page, 'Histogram_Y_')).toBe('block');
  const base = await fingerprint(page);
  await setControl(page, 'Histogram_Y_', true);
  expect(await fingerprint(page), 'Y histogram draws along the right edge').not.toBe(base);
  expect(errors).toEqual([]);
});

test('row-faceted scatters can use per-row or uniform Y domains', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');
  expect(await display(page, 'Uniform_YLim')).toBe('none');

  await setControl(page, 'Facet_Rows_By', 'species');
  await settle(page);
  expect(await display(page, 'Uniform_YLim')).toBe('block');
  const perRow = await fingerprint(page);
  await setControl(page, 'Uniform_YLim', true);
  expect(await fingerprint(page), 'uniform vs per-row Y domains differ').not.toBe(perRow);
  expect(errors).toEqual([]);
});

test('chart title takes overrides, offsets, and its own editor', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  const base = await fingerprint(page);
  await page.evaluate(function() {
    const view = window._views.smartplot_id;
    view.signal('CC_Title', 'My Custom Title');
    view.signal('CC_Subtitle', 'and a custom subtitle');
  });
  await settle(page);
  const titled = await fingerprint(page);
  expect(titled, 'title/subtitle overrides render').not.toBe(base);

  await page.evaluate(function() { window._views.smartplot_id.signal('CC_TI_DX', 120); });
  await settle(page);
  expect(await fingerprint(page), 'title offset moves the title block').not.toBe(titled);

  // the title's editor opens from a double-click on the rendered title
  const point = await page.evaluate(function() {
    const view = window._views.smartplot_id;
    let found = null;
    (function collect(mark, ox, oy) {
      if (found || !mark || !mark.items) return;
      mark.items.forEach(function(item) {
        if (found) return;
        if (mark.role === 'title-text' && item.bounds) {
          found = { x: ox + (item.bounds.x1 + item.bounds.x2) / 2, y: oy + (item.bounds.y1 + item.bounds.y2) / 2 };
          return;
        }
        if (mark.marktype === 'group' && item.items) {
          item.items.forEach(function(child) { collect(child, ox + (item.x || 0), oy + (item.y || 0)); });
        }
      });
    })(view.scenegraph().root, 0, 0);
    if (!found) return null;
    const canvas = document.querySelector('#view_crossexsmartplot_id canvas');
    const rect = canvas.getBoundingClientRect();
    const origin = view._origin || [0, 0];
    return { x: rect.left + origin[0] + found.x, y: rect.top + origin[1] + found.y };
  });
  expect(point).not.toBeNull();
  // dispatch on the canvas: on narrow viewports the title can sit under the
  // page header, which would swallow a real pointer gesture
  await page.locator('#view_crossexsmartplot_id canvas')
    .dispatchEvent('dblclick', { clientX: point.x, clientY: point.y, bubbles: true });
  const pop = page.locator('#cc_editpopsmartplot_id');
  await expect(pop).toBeVisible();
  await expect(pop.locator('.cc_ep_head b')).toHaveText('Chart Title');
  expect(errors).toEqual([]);
});

test('density contours draw when enabled on an already-faceted scatter', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'Facet_Cols_By', 'island');
  await settle(page);
  await setControl(page, 'Contours_', true);
  await settle(page);
  expect(await contourPaths(page), 'contour paths exist in faceted cells').toBeGreaterThan(0);

  // and the continuous (colorless) pipeline works while faceted too
  await setControl(page, 'Color_By', 'None');
  await settle(page);
  expect(await contourPaths(page), 'colorless contours draw while faceted').toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('merged tabs host fonts, coloring, and search controls', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  const layout = await page.evaluate(function() {
    function inside(panel, control) {
      const p = document.getElementById(panel + 'smartplot_id');
      const c = document.getElementById(control + 'smartplot_id');
      return Boolean(p && c && p.contains(c));
    }
    return {
      fontsInAxis: inside('Axis', 'Title_Font'),
      paletteInMarks: inside('Marks', 'Palette'),
      searchInFiltering: inside('Filtering', 'Search_By'),
      oldTabsGone: !document.getElementById('Fonts_tablinkssmartplot_id') &&
        !document.getElementById('Coloring_tablinkssmartplot_id') &&
        !document.getElementById('Search_tablinkssmartplot_id')
    };
  });
  expect(layout).toEqual({ fontsInAxis: true, paletteInMarks: true, searchInFiltering: true, oldTabsGone: true });
  expect(errors).toEqual([]);
});

test('clear settings redraws the chart with defaults', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  expect(await page.evaluate(function() { return window._views.smartplot_id.signal('X_Axis'); })).toBe('bill_length_mm');

  await page.locator('#clear_cookies').click();
  await waitForExplorer(page);
  await settle(page);
  // defaults = the widget's own option defaults (first column), not the
  // gallery preset that had been seeded into the now-cleared saved state
  expect(await page.evaluate(function() { return window._views.smartplot_id.signal('X_Axis'); }))
    .toBe('species');
  expect(errors).toEqual([]);
});

test('overlay buttons still work after the interactive-mode rebuild', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await page.locator('#Interact_tablinkssmartplot_id').click();
  await page.locator('#Interactive_smartplot_id input').click();
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return loader && loader.style.display === 'none' &&
      window._views.smartplot_id && window._views.smartplot_id.signal('Interactive_') === true;
  }, null, { timeout: 20000 });
  await settle(page);

  // duplicated listeners used to open+close the overlay in a single click
  await page.locator('#ThreeD_btnsmartplot_id').click();
  await expect(page.locator('#cc_3dsmartplot_id')).toBeVisible();
  await page.locator('#cc_3d_closesmartplot_id').click();
  await expect(page.locator('#cc_3dsmartplot_id')).toBeHidden();

  await page.locator('#Table_btnsmartplot_id').click();
  await expect(page.locator('#cc_tablesmartplot_id')).toBeVisible();
  expect(errors).toEqual([]);
});
