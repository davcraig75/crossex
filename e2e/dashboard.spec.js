const { test, expect } = require('@playwright/test');

// Dashboard: tile autofit, captions and titles, width control, the
// full-panel editor, share links (with inline data), and the auto-opening
// data loader.

async function openScatterExample(page) {
  await page.goto('/');
  await page.locator('[data-gallery="scatter"]').click();
  await page.waitForFunction(function() {
    const loader = document.getElementById('cc_loadersmartplot_id');
    return window._views && window._views.smartplot_id && loader && loader.style.display === 'none';
  }, null, { timeout: 20000 });
}

async function enterDashboard(page) {
  await page.evaluate(function() { localStorage.removeItem('crossexDashboard_v1'); });
  await page.locator('#build_dashboard').click();
  await page.waitForFunction(function() {
    return document.querySelector('.dash_body canvas');
  }, null, { timeout: 20000 });
  await page.waitForTimeout(800);
}

function installErrorCapture(page) {
  const errors = [];
  page.on('pageerror', function(error) { errors.push('pageerror: ' + error.message); });
  page.on('console', function(message) {
    if (message.type() === 'error') errors.push('console: ' + message.text());
  });
  return errors;
}

test('dashboard tiles render their whole chart, legend included', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  const fit = await page.evaluate(function() {
    const body = document.querySelector('.dash_body');
    const canvas = body.querySelector('canvas');
    const b = body.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    return { fitsH: c.height <= b.height + 2, fitsW: c.width <= b.width + 2 };
  });
  expect(fit).toEqual({ fitsH: true, fitsW: true });
  expect(errors).toEqual([]);
});

test('tile titles and captions edit inline and persist', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);

  await page.evaluate(function() {
    const title = document.querySelector('.dash_title');
    title.textContent = 'Penguin Overview';
    title.dispatchEvent(new Event('input', { bubbles: true }));
    const cap = document.querySelector('.dash_caption');
    cap.textContent = 'Figure 1: bills against mass.';
    cap.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(700); // debounced persist
  const saved = await page.evaluate(function() {
    const p = JSON.parse(localStorage.getItem('crossexDashboard_v1'));
    return { title: p.tiles[0].title, caption: p.tiles[0].caption };
  });
  expect(saved).toEqual({ title: 'Penguin Overview', caption: 'Figure 1: bills against mass.' });
  expect(errors).toEqual([]);
});

test('dashboard width control narrows the canvas', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.selectOption('#dash_width', '1000');
  await page.waitForTimeout(1200);
  const sizes = await page.evaluate(function() {
    return {
      canvas: document.getElementById('dash_canvas').getBoundingClientRect().width,
      window: window.innerWidth
    };
  });
  // capped at 1000px; a narrower window (mobile profile) stays window-bound
  expect(sizes.canvas).toBeLessThanOrEqual(Math.min(1000, sizes.window));
  expect(sizes.canvas).toBeGreaterThan(250);
  expect(errors).toEqual([]);
});

test('the full-panel editor edits a tile and applies on close', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);

  await page.locator('.dash_edit').first().click();
  await page.waitForFunction(function() {
    return document.querySelector('#dash_editor_host canvas') &&
      document.querySelector('#dash_editor_host .cc_tab');
  }, null, { timeout: 20000 });

  // change the color mapping through the real control panel
  await page.evaluate(function() {
    const select = document.querySelector('#Color_Bydash_editor_host select');
    select.value = 'island';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(1200);
  await page.locator('.dash_modal_x').click();
  await page.waitForTimeout(1500);

  const state = await page.evaluate(function() {
    const p = JSON.parse(localStorage.getItem('crossexDashboard_v1'));
    return { override: p.tiles[0].overrides.Color_By, cfg: p.tiles[0].cfg.color };
  });
  expect(state).toEqual({ override: 'island', cfg: 'island' });
  expect(errors).toEqual([]);
});

test('share link reopens the dashboard, data included, in a clean session', async function({ page, context }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.evaluate(function() {
    const cap = document.querySelector('.dash_caption');
    cap.textContent = 'shared caption';
    cap.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(700);
  await page.locator('#dash_share').click();
  await page.waitForTimeout(400);
  const url = await page.evaluate(function() { return location.href; });
  expect(url).toContain('#dash=');

  const fresh = await context.newPage();
  await fresh.goto(url);
  await fresh.waitForFunction(function() {
    return document.querySelector('.dash_body canvas');
  }, null, { timeout: 25000 });
  const restored = await fresh.evaluate(function() {
    return {
      dashboardShown: document.getElementById('cc_dashboard').style.display === 'block',
      tiles: document.querySelectorAll('.dash_tile').length,
      caption: document.querySelector('.dash_caption').textContent
    };
  });
  expect(restored).toEqual({ dashboardShown: true, tiles: 1, caption: 'shared caption' });
  await fresh.close();
  expect(errors).toEqual([]);
});

test('an empty dashboard opens the data loader by itself', async function({ page }) {
  const errors = installErrorCapture(page);
  await page.goto('/');
  await page.evaluate(function() { localStorage.removeItem('crossexDashboard_v1'); });
  await page.locator('#build_dashboard').click();
  await page.waitForTimeout(700);
  expect(await page.evaluate(function() { return !!document.getElementById('dash_modal_bg'); })).toBe(true);
  expect(errors).toEqual([]);
});
