const { test, expect } = require('@playwright/test');

// On-chart direct editing: draggable titles/legend/labels, double-click
// dialogs for axes, legend colors, and free-text labels, plus the Box_Points_
// strip toggle — all persisted as overrides through rebuilds.

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

async function setSignals(page, map) {
  await page.evaluate(function(values) {
    const view = window._views.smartplot_id;
    Object.keys(values).forEach(function(name) { view.signal(name, values[name]); });
  }, map);
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

// absolute canvas-space center of the first scenegraph item matching pred
async function itemCenter(page, predSource) {
  return page.evaluate(function(src) {
    const view = window._views.smartplot_id;
    const pred = new Function('mark', 'item', 'return (' + src + ')(mark, item);');
    let found = null;
    (function collect(mark, ox, oy) {
      if (found || !mark || !mark.items) return;
      mark.items.forEach(function(item) {
        if (found) return;
        if (pred(mark, item) && item.bounds) {
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
    return { clientX: rect.left + origin[0] + found.x, clientY: rect.top + origin[1] + found.y };
  }, predSource);
}

test('box charts draw un-jittered value points that honor point shape', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'box');
  await setControl(page, 'Y_Axis', 'bill_length_mm');
  const base = await fingerprint(page);

  await setControl(page, 'Box_Points_', true);
  const withPoints = await fingerprint(page);
  expect(withPoints, 'Points toggle draws value points without jitter').not.toBe(base);
  expect(await page.evaluate(function() { return window._views.smartplot_id.signal('Jitter_'); })).toBe(false);

  // Shape only applies while points (or jitter) are on — and must repaint them
  expect(await page.evaluate(function() {
    return document.getElementById('Shapesmartplot_id').style.display;
  })).toBe('block');
  await setControl(page, 'Shape', 'diamond');
  const diamonds = await fingerprint(page);
  expect(diamonds, 'point shape restyles box value points').not.toBe(withPoints);

  // horizontal orientation gets the same strip
  await setControl(page, 'X_Axis', 'body_mass_g');
  await setControl(page, 'Y_Axis', 'species');
  const horizontal = await fingerprint(page);
  await setControl(page, 'Box_Points_', false);
  expect(await fingerprint(page), 'horizontal strip points clear with the toggle').not.toBe(horizontal);
  expect(errors).toEqual([]);
});

test('outline by sits on the charts tab; width sliders got wider ranges', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'box');
  const layout = await page.evaluate(function() {
    return {
      strokeInCharts: document.getElementById('Chartssmartplot_id').contains(document.getElementById('Stroke_Bysmartplot_id')),
      violinMax: document.querySelector('#Violin_Widthsmartplot_id input').max,
      strokeMax: document.querySelector('#Stroke_Widthsmartplot_id input').max
    };
  });
  expect(layout.strokeInCharts, 'Outline By lives beside Color By on the Charts tab').toBe(true);
  expect(layout.violinMax).toBe('3');
  expect(layout.strokeMax).toBe('16');

  const base = await fingerprint(page);
  await setControl(page, 'Violin_Width', 2);
  expect(await fingerprint(page), 'distribution width above 1 widens the marks').not.toBe(base);
  expect(errors).toEqual([]);
});

test('axis titles take text overrides and drag offsets', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');
  const base = await fingerprint(page);

  await setSignals(page, { CC_Y_Title: 'Custom Depth (mm)' });
  const retitled = await fingerprint(page);
  expect(retitled, 'Y title override redraws').not.toBe(base);

  await setSignals(page, { CC_XT_DX: 40, CC_XT_DY: 8 });
  const nudged = await fingerprint(page);
  expect(nudged, 'X title offset moves the title').not.toBe(retitled);

  await setSignals(page, { CC_Y_Title: '', CC_XT_DX: 0, CC_XT_DY: 0 });
  expect(errors).toEqual([]);
});

test('double-clicking an axis title opens the axis editor and applies it', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');

  const point = await itemCenter(page,
    "function(mark, item) { return mark.role === 'axis-title' && item.text === 'bill_length_mm'; }");
  expect(point, 'found the X axis title in the scenegraph').not.toBeNull();

  await page.mouse.dblclick(point.clientX, point.clientY);
  const pop = page.locator('#cc_editpopsmartplot_id');
  await expect(pop).toBeVisible();
  await expect(pop.locator('.cc_ep_head b')).toHaveText('X Axis');

  await pop.locator('#cc_ep_titlesmartplot_id').fill('Bill Length (mm)');
  await pop.locator('#cc_ep_maxsmartplot_id').fill('70');
  await pop.locator('#cc_ep_minsmartplot_id').fill('30');
  const before = await fingerprint(page);
  await pop.locator('[data-cc-apply]').click();
  await settle(page);
  await expect(pop).toBeHidden();
  const state = await page.evaluate(function() {
    const view = window._views.smartplot_id;
    return { title: view.signal('CC_X_Title'), max: view.signal('X_Upper_Lim'), min: view.signal('X_Lower_Lim') };
  });
  expect(state).toEqual({ title: 'Bill Length (mm)', max: '70', min: '30' });
  expect(await fingerprint(page), 'axis edits redraw the chart').not.toBe(before);
  expect(errors).toEqual([]);
});

test('legend block moves with drag offsets and edits categorical colors', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'Color_By', 'species');
  const base = await fingerprint(page);

  await setSignals(page, { CC_LEG_DX: 60, CC_LEG_DY: -12 });
  const moved = await fingerprint(page);
  expect(moved, 'legend offsets move the legend block').not.toBe(base);

  // color editor applies a per-category override through a full re-init
  await page.evaluate(function() {
    window._ccDirectEdit.smartplot_id.applyCatColors({ Adelie: '#ff0000', Chinstrap: '#00a000', Gentoo: '#0000ff' });
  });
  await waitForExplorer(page);
  await settle(page);
  const adelie = await page.evaluate(function() {
    return window._views.smartplot_id.scale('color_scale_cat')('Adelie');
  });
  expect(adelie).toBe('#ff0000');
  expect(await fingerprint(page), 'category color overrides recolor the chart').not.toBe(moved);

  // reset restores the palette-driven scheme
  await page.evaluate(function() { window._ccDirectEdit.smartplot_id.applyCatColors({}); });
  await waitForExplorer(page);
  await settle(page);
  const restored = await page.evaluate(function() {
    return window._views.smartplot_id.scale('color_scale_cat')('Adelie');
  });
  expect(restored).not.toBe('#ff0000');
  expect(errors).toEqual([]);
});

test('continuous color legends accept a custom two-color gradient', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'Color_By', 'body_mass_g');
  const base = await fingerprint(page);

  await page.evaluate(function() {
    window._ccDirectEdit.smartplot_id.applyContRange(['#000000', '#ff0000']);
  });
  await waitForExplorer(page);
  await settle(page);
  const range = await page.evaluate(function() {
    return window._views.smartplot_id.scale('color_scale_cont').range();
  });
  expect(range[0]).toBe('#000000');
  expect(range[range.length - 1]).toBe('#ff0000');
  expect(await fingerprint(page), 'gradient override recolors the chart').not.toBe(base);

  await page.evaluate(function() { window._ccDirectEdit.smartplot_id.applyContRange([]); });
  await waitForExplorer(page);
  await settle(page);
  const schemeRange = await page.evaluate(function() {
    return window._views.smartplot_id.scale('color_scale_cont').range();
  });
  expect(schemeRange[0]).not.toBe('#000000');
  expect(errors).toEqual([]);
});

test('free-text labels create, drag, edit, and delete', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  const base = await fingerprint(page);

  // create through the dialog the empty-space double-click opens
  const rect = await page.evaluate(function() {
    const r = document.querySelector('#view_crossexsmartplot_id canvas').getBoundingClientRect();
    return { left: r.left, top: r.top };
  });
  await page.evaluate(function(at) {
    window._ccDirectEdit.smartplot_id.openNoteDialog({ clientX: at.left + 200, clientY: at.top + 120 }, null);
  }, rect);
  const pop = page.locator('#cc_editpopsmartplot_id');
  await expect(pop).toBeVisible();
  await expect(pop.locator('.cc_ep_head b')).toHaveText('New Label');
  await pop.locator('#cc_ep_ntextsmartplot_id').fill('outlier cluster');
  await pop.locator('[data-cc-apply]').click();
  await settle(page);

  const notes = await page.evaluate(function() { return window._views.smartplot_id.signal('CC_Notes'); });
  expect(notes.length).toBe(1);
  expect(notes[0].text).toBe('outlier cluster');
  const withNote = await fingerprint(page);
  expect(withNote, 'new label renders on the chart').not.toBe(base);

  // drag = position change on the stored note
  await page.evaluate(function() {
    const de = window._ccDirectEdit.smartplot_id;
    const view = window._views.smartplot_id;
    const moved = view.signal('CC_Notes').map(function(n) { return Object.assign({}, n, { x: n.x + 80, y: n.y + 40 }); });
    de.syncNotes(moved);
  });
  await settle(page);
  expect(await fingerprint(page), 'moving a label redraws it elsewhere').not.toBe(withNote);

  // double-click the label mark itself opens the edit dialog; delete it
  const notePoint = await itemCenter(page,
    "function(mark, item) { return mark.name === 'cc_note_mark'; }");
  expect(notePoint, 'label found in the scenegraph').not.toBeNull();
  await page.mouse.dblclick(notePoint.clientX, notePoint.clientY);
  await expect(pop).toBeVisible();
  await expect(pop.locator('.cc_ep_head b')).toHaveText('Edit Label');
  await pop.locator('[data-cc-del]').click();
  await settle(page);
  expect(await page.evaluate(function() { return window._views.smartplot_id.signal('CC_Notes').length; })).toBe(0);
  expect(errors).toEqual([]);
});

test('edits persist as overrides across the interactive-mode rebuild', async function({ page }) {
  const errors = installErrorCapture(page);
  await openExample(page, 'scatter');
  await setControl(page, 'X_Axis', 'bill_length_mm');
  await setControl(page, 'Y_Axis', 'bill_depth_mm');

  await setSignals(page, { CC_Y_Title: 'Depth Override', CC_LEG_DX: 25 });
  await page.evaluate(function() {
    window._ccDirectEdit.smartplot_id.syncNotes([{ id: 'k1', x: 150, y: 90, text: 'kept', fontSize: 14, color: '#333333', angle: 0 }]);
  });
  await settle(page);

  // toggling pan & zoom tears the view down and rebuilds it from the spec
  await page.locator('#Interact_tablinkssmartplot_id').click();
  await page.locator('#Interactive_smartplot_id input').click();
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return loader && loader.style.display === 'none' &&
      window._views.smartplot_id && window._views.smartplot_id.signal('Interactive_') === true;
  }, null, { timeout: 20000 });
  await settle(page);

  const kept = await page.evaluate(function() {
    const view = window._views.smartplot_id;
    return {
      title: view.signal('CC_Y_Title'),
      legendDx: view.signal('CC_LEG_DX'),
      notes: view.signal('CC_Notes').length,
      drawnNotes: view.data('cc_notes_data').length
    };
  });
  expect(kept).toEqual({ title: 'Depth Override', legendDx: 25, notes: 1, drawnNotes: 1 });
  expect(errors).toEqual([]);
});
