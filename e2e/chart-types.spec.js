const { test, expect } = require('@playwright/test');

// New chart families: the part-of-whole Layout selector (pie, donut, rose,
// treemap, sunburst, word cloud), grouped bars, the histogram density curve,
// ridgelines, and the strip-plot preset.

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

async function sig(page, name) {
  return page.evaluate(function(n) { return window._views.smartplot_id.signal(n); }, name);
}

test('the Layout selector walks bars → pie → donut → rose → sunburst → cloud and back', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'stacked');
  expect(await sig(page, 'show_stacked_graphs')).toBe(true);
  let fp = await fingerprint(page);

  await setControl(page, 'Cat_Layout', 'pie');
  expect(await sig(page, 'show_parts_graph')).toBe(true);
  expect(await sig(page, 'show_stacked_graphs')).toBe(false);
  let next = await fingerprint(page);
  expect(next, 'pie replaces the bars').not.toBe(fp);
  fp = next;
  expect(await display(page, 'Donut_Ratio')).toBe('none');

  await setControl(page, 'Cat_Layout', 'donut');
  next = await fingerprint(page);
  expect(next, 'donut differs from pie').not.toBe(fp);
  fp = next;
  expect(await display(page, 'Donut_Ratio')).toBe('block');
  await setControl(page, 'Donut_Ratio', 0.8);
  next = await fingerprint(page);
  expect(next, 'donut hole size applies').not.toBe(fp);
  fp = next;

  await setControl(page, 'Cat_Layout', 'rose');
  next = await fingerprint(page);
  expect(next, 'nightingale rose differs').not.toBe(fp);
  fp = next;

  await setControl(page, 'Cat_Layout', 'sunburst');
  next = await fingerprint(page);
  expect(next, 'sunburst renders (two rings with a color mapping)').not.toBe(fp);
  fp = next;

  await setControl(page, 'Cat_Layout', 'cloud');
  next = await fingerprint(page);
  expect(next, 'word cloud renders').not.toBe(fp);
  expect(await display(page, 'Cloud_Options')).toBe('block');
  await setControl(page, 'Cloud_Max_Font', 100);
  expect(await fingerprint(page), 'cloud font range applies').not.toBe(next);

  await setControl(page, 'Cat_Layout', 'bars');
  expect(await sig(page, 'show_stacked_graphs')).toBe(true);
  expect(await sig(page, 'show_parts_graph')).toBe(false);
  expect(await display(page, 'Cloud_Options')).toBe('none');
  expect(errors).toEqual([]);
});

test('treemap lays out the category × color hierarchy', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'treemap');
  expect(await sig(page, 'show_parts_graph')).toBe(true);
  expect(await sig(page, 'Cat_Layout')).toBe('treemap');
  const withColor = await fingerprint(page);
  await setControl(page, 'Color_By', 'None');
  expect(await fingerprint(page), 'single-level treemap differs from two-level').not.toBe(withColor);
  expect(errors).toEqual([]);
});

test('grouped bars replace stacking when toggled', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'stacked');
  expect(await display(page, 'Stack_Grouped_')).toBe('block');
  const stacked = await fingerprint(page);
  await setControl(page, 'Stack_Grouped_', true);
  expect(await fingerprint(page), 'bars sit side by side instead of stacked').not.toBe(stacked);
  await setControl(page, 'Color_By', 'None');
  expect(await display(page, 'Stack_Grouped_'), 'grouping needs a color split').toBe('none');
  expect(errors).toEqual([]);
});

test('the density curve smooths a histogram and takes a bandwidth', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'histogram');
  expect(await display(page, 'Density_')).toBe('block');
  expect(await display(page, 'Density_Bandwidth')).toBe('none');
  const plain = await fingerprint(page);
  await setControl(page, 'Density_', true);
  const withCurve = await fingerprint(page);
  expect(withCurve, 'density curve draws over the bars').not.toBe(plain);
  expect(await display(page, 'Density_Bandwidth')).toBe('block');
  await setControl(page, 'Density_Bandwidth', '400');
  expect(await fingerprint(page), 'bandwidth reshapes the curve').not.toBe(withCurve);
  expect(errors).toEqual([]);
});

test('ridgeline mode reshapes horizontal violins with adjustable height', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'ridgeline');
  expect(await sig(page, 'show_hzbox_graphs')).toBe(true);
  expect(await sig(page, 'Ridgeline_')).toBe(true);
  expect(await display(page, 'Ridge_Overlap')).toBe('block');
  const ridge = await fingerprint(page);
  await setControl(page, 'Ridge_Overlap', 3);
  const taller = await fingerprint(page);
  expect(taller, 'ridge height applies').not.toBe(ridge);
  await setControl(page, 'Ridgeline_', false);
  expect(await fingerprint(page), 'plain violins return when ridgeline is off').not.toBe(taller);
  expect(errors).toEqual([]);
});

test('the strip plot preset shows raw value points without boxes', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'strip');
  expect(await sig(page, 'show_box_graphs')).toBe(true);
  expect(await sig(page, 'Box_Points_')).toBe(true);
  expect(await sig(page, 'Boxplot_')).toBe(false);
  const strip = await fingerprint(page);
  await setControl(page, 'Jitter_', true);
  expect(await fingerprint(page), 'jitter spreads the strip').not.toBe(strip);
  expect(errors).toEqual([]);
});

test('both marginal histograms share one visual style, with an optional count axis', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'Color_By', 'species');

  await setControl(page, 'Histogram_', true);
  const xOnly = await fingerprint(page);
  await setControl(page, 'Histogram_Y_', true);
  const both = await fingerprint(page);
  expect(both, 'the Y marginal draws').not.toBe(xOnly);

  // the Y marginal is stacked and colored by the same categorical scale as the
  // X one (yhist_stack is group-scoped, so read the rendered marks instead)
  const encoding = await page.evaluate(function() {
    const fills = { x: new Set(), y: new Set() };
    (function walk(mark) {
      if (!mark) return;
      if (mark.name === 'yhist_mark') {
        mark.items.forEach(function(i) { if (i.fillOpacity !== 0) fills.y.add(i.fill); });
      }
      if (mark.role === 'mark' && mark.marktype === 'rect' && mark.group &&
          mark.group.mark && mark.group.mark.name === 'hist_plot_clip') {
        mark.items.forEach(function(i) { fills.x.add(i.fill); });
      }
      (mark.items || []).forEach(function(item) {
        if (mark.marktype === 'group' && item.items) item.items.forEach(walk);
      });
    })(window._views.smartplot_id.scenegraph().root);
    return { y: [...fills.y].sort(), bars: fills.y.size };
  });
  const catColors = await page.evaluate(function() {
    return window._views.smartplot_id.scale('color_scale_cat').range().slice(0, 3).sort();
  });
  expect(encoding.bars, 'Y marginal is split by color, not one flat grey').toBeGreaterThan(1);
  expect(encoding.y, 'Y marginal uses the categorical palette').toEqual(catColors);

  // the count axis is offered for the drawn histogram and changes the render
  expect(await display(page, 'Count_Axis_')).toBe('block');
  await setControl(page, 'Count_Axis_', true);
  expect(await fingerprint(page), 'count axis appears').not.toBe(both);
  expect(errors).toEqual([]);
});

test('a pure histogram can show its count axis', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'histogram');
  expect(await display(page, 'Count_Axis_')).toBe('block');
  const plain = await fingerprint(page);
  await setControl(page, 'Count_Axis_', true);
  expect(await fingerprint(page), 'count scale is drawn').not.toBe(plain);

  // toggling the axis on adds vertical (left-hand) count labels that were not
  // on the chart before
  const verticalLabels = await page.evaluate(function() {
    const found = [];
    (function walk(mark) {
      if (!mark) return;
      if (mark.role === 'axis-label') {
        mark.items.forEach(function(i) {
          const text = String(i.text || '').trim();
          if (text !== '' && i.angle !== 90 && i.align === 'right') { found.push(text); }
        });
      }
      (mark.items || []).forEach(function(item) {
        if (mark.marktype === 'group' && item.items) item.items.forEach(walk);
      });
    })(window._views.smartplot_id.scenegraph().root);
    return found;
  });
  expect(verticalLabels.length, 'count labels render beside the bars').toBeGreaterThan(1);
  expect(verticalLabels.every(function(t) { return /^[\d,]+$/.test(t); }),
    'they are counts: ' + verticalLabels.join(',')).toBe(true);
  expect(errors).toEqual([]);
});
