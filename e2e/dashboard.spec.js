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

test('tile headers no longer clip the chart, and the whole chart fits', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  const fit = await page.evaluate(function() {
    const tile = document.querySelector('.dash_tile');
    const body = tile.querySelector('.dash_body').getBoundingClientRect();
    const canvas = tile.querySelector('canvas').getBoundingClientRect();
    const head = tile.querySelector('.dash_head').getBoundingClientRect();
    return {
      overflowBottom: Math.round(canvas.bottom - body.bottom),
      headerBelowChart: Math.round(head.bottom - canvas.top),
      titleHeight: window._views[Object.keys(window._views).find(function(k) { return k.indexOf('dash_chart_') === 0; })].signal('Title_Height')
    };
  });
  // the chart sits fully inside the tile, starts below the header, and no
  // longer draws its own title behind that header
  expect(fit.overflowBottom).toBeLessThanOrEqual(0);
  expect(fit.headerBelowChart).toBeLessThanOrEqual(0);
  expect(fit.titleHeight).toBe(0);
  expect(errors).toEqual([]);
});

test('text panels add, edit, style, and persist', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.locator('#dash_add_text').click();
  await expect(page.locator('.dash_textbody')).toHaveCount(1);

  await page.evaluate(function() {
    const box = document.querySelector('.dash_textbody');
    box.textContent = 'Quarterly review';
    box.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('.dash_tile_text .dash_style').click();
  await page.evaluate(function() {
    const inputs = document.querySelectorAll('#dash_modal_bg input');
    inputs[0].value = '28';                                        // font size
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    inputs[1].value = '#b3005e';                                   // text color
    inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('.dash_modal_x').click();
  await page.waitForTimeout(700);

  const styled = await page.evaluate(function() {
    const box = document.querySelector('.dash_textbody');
    const saved = JSON.parse(localStorage.getItem('crossexDashboard_v1'));
    const textTile = saved.tiles.find(function(t) { return t.kind === 'text'; });
    return {
      rendered: box.style.fontSize,
      savedText: textTile.text,
      savedSize: textTile.style.size,
      savedColor: textTile.style.color
    };
  });
  expect(styled).toEqual({ rendered: '28px', savedText: 'Quarterly review', savedSize: 28, savedColor: '#b3005e' });
  expect(errors).toEqual([]);
});

test('dashboard style controls restyle headers and persist', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.locator('#dash_theme').click();
  await page.evaluate(function() {
    const inputs = document.querySelectorAll('#dash_modal_bg input');
    inputs[0].value = '#0f5c4a';                                   // header background
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    inputs[2].value = '15';                                        // header text size
    inputs[2].dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('.dash_modal_x').click();
  await page.waitForTimeout(700);

  const themed = await page.evaluate(function() {
    const head = document.querySelector('.dash_head');
    const saved = JSON.parse(localStorage.getItem('crossexDashboard_v1'));
    return {
      bg: getComputedStyle(head).backgroundColor,
      size: getComputedStyle(head).fontSize,
      savedBg: saved.theme.headBg
    };
  });
  expect(themed).toEqual({ bg: 'rgb(15, 92, 74)', size: '15px', savedBg: '#0f5c4a' });
  expect(errors).toEqual([]);
});

test('publishing locks the board, and the passcode restores editing', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);

  await page.locator('#dash_mode_btn').click();
  await page.locator('#dash_modal_bg input[type=password]').fill('letmein');
  await page.locator('#dash_modal_bg').getByRole('button', { name: 'Publish', exact: true }).click();
  await page.waitForTimeout(800);

  const view = await page.evaluate(function() {
    return {
      viewing: document.getElementById('cc_dashboard').classList.contains('dash_viewing'),
      tools: getComputedStyle(document.querySelector('.dash_tools')).display,
      tileTitleEditable: document.querySelector('.dash_title').getAttribute('contenteditable'),
      boardTitleEditable: document.getElementById('dash_dtitle').getAttribute('contenteditable'),
      button: document.getElementById('dash_mode_btn').textContent
    };
  });
  expect(view).toEqual({ viewing: true, tools: 'none', tileTitleEditable: 'false',
    boardTitleEditable: 'false', button: 'Edit' });

  // dragging a published tile must not move it
  const before = await page.evaluate(function() { return document.querySelector('.dash_tile').style.left; });
  await page.locator('.dash_head').first().hover();
  await page.mouse.down();
  await page.mouse.move(400, 500, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  expect(await page.evaluate(function() { return document.querySelector('.dash_tile').style.left; })).toBe(before);

  // right-click → wrong passcode keeps it locked
  // right-click on desktop; long-press is the touch equivalent (both wired)
  await page.locator('.dash_canvas').click({ button: 'right', position: { x: 40, y: 40 } });
  await page.locator('.dash_ctx_item').click();
  await page.locator('.dash_ctx_pass input').fill('nope');
  await page.locator('.dash_ctx_pass button').click();
  await page.waitForTimeout(300);
  expect(await page.evaluate(function() {
    return document.getElementById('cc_dashboard').classList.contains('dash_viewing');
  })).toBe(true);

  // …the right one unlocks it
  await page.locator('.dash_ctx_pass input').fill('letmein');
  await page.locator('.dash_ctx_pass button').click();
  await page.waitForTimeout(700);
  expect(await page.evaluate(function() {
    return document.getElementById('cc_dashboard').classList.contains('dash_viewing');
  })).toBe(false);
  expect(await page.evaluate(function() {
    return document.querySelector('.dash_title').getAttribute('contenteditable');
  })).toBe('true');
  expect(errors).toEqual([]);
});

test('a published dashboard shares as a read-only link', async function({ page, context }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.locator('#dash_add_text').click();
  await page.evaluate(function() {
    const box = document.querySelector('.dash_textbody');
    box.textContent = 'Read-only board';
    box.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.locator('#dash_mode_btn').click();
  await page.locator('#dash_modal_bg').getByRole('button', { name: 'Publish', exact: true }).click();
  await page.waitForTimeout(800);
  await page.locator('#dash_share').click();
  await page.waitForTimeout(400);
  const url = await page.evaluate(function() { return location.href; });

  const fresh = await context.newPage();
  await fresh.goto(url);
  await fresh.waitForFunction(function() { return document.querySelector('.dash_body canvas'); }, null, { timeout: 25000 });
  await fresh.waitForTimeout(500);
  const shared = await fresh.evaluate(function() {
    return {
      viewing: document.getElementById('cc_dashboard').classList.contains('dash_viewing'),
      text: document.querySelector('.dash_textbody').textContent,
      editable: document.querySelector('.dash_title').getAttribute('contenteditable')
    };
  });
  expect(shared).toEqual({ viewing: true, text: 'Read-only board', editable: 'false' });
  await fresh.close();
  expect(errors).toEqual([]);
});

test('a published board can be reopened by long-press where there is no right-click', async function({ page }) {
  const errors = installErrorCapture(page);
  await openScatterExample(page);
  await enterDashboard(page);
  await page.locator('#dash_mode_btn').click();
  await page.locator('#dash_modal_bg').getByRole('button', { name: 'Publish', exact: true }).click();
  await page.waitForTimeout(700);
  expect(await page.evaluate(function() {
    return document.getElementById('cc_dashboard').classList.contains('dash_viewing');
  })).toBe(true);

  // synthesize the touch gesture: press, hold past the threshold, release
  await page.evaluate(function() {
    const canvas = document.getElementById('dash_canvas');
    const box = canvas.getBoundingClientRect();
    const touch = { clientX: box.left + 30, clientY: box.top + 30 };
    canvas.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true, touches: [new Touch({ identifier: 1, target: canvas, ...touch })]
    }));
  });
  await page.waitForTimeout(900);
  await expect(page.locator('#dash_ctx')).toBeVisible();
  // no passcode was set, so the menu unlocks straight away
  await page.locator('.dash_ctx_item').click();
  await page.waitForTimeout(500);
  expect(await page.evaluate(function() {
    return document.getElementById('cc_dashboard').classList.contains('dash_viewing');
  })).toBe(false);
  expect(errors).toEqual([]);
});
