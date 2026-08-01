const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

// The example library claims that each dataset + column mapping produces a
// particular chart. This walks every claim in examples/manifest.json and holds
// the app to it, so the manifest is verified rather than asserted — it doubles
// as documentation and as a regression net over every chart family.

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'examples', 'manifest.json'), 'utf8')
);

async function loadDataset(page, file) {
  await page.goto('/');
  await page.evaluate(function() { localStorage.clear(); });
  await page.goto('/');
  await page.evaluate(async function(url) {
    const text = await (await fetch(url)).text();
    const input = document.getElementById('myccinput');
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const button = document.getElementById('graph_button');
    button.innerHTML = 'Graph Data';
    button.click();
  }, '/examples/' + file);
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return window._views && window._views.smartplot_id && loader && loader.style.display === 'none';
  }, null, { timeout: 30000 });
  // the first-visit column overview sits over the chart
  await page.evaluate(function() {
    const ov = document.getElementById('cc_overviewsmartplot_id');
    if (ov) { ov.style.display = 'none'; }
  });
}

async function applyMapping(page, mapping) {
  for (const [signal, value] of Object.entries(mapping)) {
    await page.evaluate(function(args) {
      const el = document.querySelector('#' + args.signal + 'smartplot_id input, #' +
                                        args.signal + 'smartplot_id select');
      if (!el) { throw new Error('no control for ' + args.signal); }
      if (el.type === 'checkbox') { el.checked = Boolean(args.value); }
      else { el.value = String(args.value); }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, { signal, value });
    await page.waitForTimeout(450);
  }
  await page.evaluate(async function() { await window._views.smartplot_id.runAsync(); });
  await page.waitForTimeout(500);
}

async function chartState(page) {
  return page.evaluate(function() {
    const view = window._views.smartplot_id;
    const sig = function(n) { try { return view.signal(n); } catch (e) { return undefined; } };
    const canvas = document.querySelector('#view_crossexsmartplot_id canvas');
    let ink = 0;
    if (canvas) {
      const px = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 0; i < px.length; i += 4) {
        if (px[i + 3] > 20 && (px[i] < 245 || px[i + 1] < 245 || px[i + 2] < 245)) ink++;
      }
    }
    return {
      ink: ink,
      modes: {
        show_scatter_graph: sig('show_scatter_graph'),
        show_hist_graph: sig('show_hist_graph'),
        show_box_graphs: sig('show_box_graphs'),
        show_hzbox_graphs: sig('show_hzbox_graphs'),
        show_stacked_graphs: sig('show_stacked_graphs'),
        show_grid_graphs: sig('show_grid_graphs'),
        show_parts_graph: sig('show_parts_graph'),
        show_gantt: sig('show_gantt')
      }
    };
  });
}

test.describe('example library', function() {
  test('every dataset is present and its metadata is complete', async function() {
    for (const dataset of manifest.datasets) {
      const file = path.join(__dirname, '..', 'examples', dataset.file);
      expect(fs.existsSync(file), dataset.file + ' exists').toBe(true);
      expect(dataset.license, dataset.id + ' names a license').toBeTruthy();
      expect(dataset.source, dataset.id + ' names a source').toBeTruthy();
      expect(dataset.demonstrates.length, dataset.id + ' demonstrates a chart').toBeGreaterThan(0);
      // anything invented rather than observed has to say so
      if (dataset.synthetic) {
        expect(dataset.description).toMatch(/SYNTHETIC/);
      }
    }
  });

  for (const dataset of manifest.datasets) {
    test(dataset.id + ': every claimed chart actually renders', async function({ page }) {
      const errors = [];
      page.on('pageerror', function(e) { errors.push('pageerror: ' + e.message); });
      page.on('console', function(m) {
        if (m.type() === 'error') errors.push('console: ' + m.text());
      });

      const seen = new Set();
      for (const claim of dataset.demonstrates) {
        // reload before each claim: a mapping has to reproduce its chart from
        // a fresh load, the way a reader following the manifest would
        await loadDataset(page, dataset.file);
        await applyMapping(page, claim.mapping);
        const state = await chartState(page);

        // the chart the manifest names is the one the app actually chose
        expect(state.modes[claim.expect],
          dataset.id + ' → ' + claim.chart + ' (expected ' + claim.expect + ' true, got ' +
          JSON.stringify(state.modes) + ')').toBe(true);
        // and it drew something
        expect(state.ink, dataset.id + ' → ' + claim.chart + ' draws marks').toBeGreaterThan(400);
        seen.add(claim.chart);
      }
      expect(seen.size).toBe(dataset.demonstrates.length);
      expect(errors, dataset.id + ' renders without console errors').toEqual([]);
    });
  }
});
