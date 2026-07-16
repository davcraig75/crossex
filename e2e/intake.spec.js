const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('landing page exposes a keyboard-ready intake workflow', async function({ page }) {
  await page.goto('/');

  await expect(page).toHaveTitle('Crossex | Private, no-code data explorer');
  await expect(page.getByRole('heading', { name: /Turn any table into an analysis workspace/ })).toBeVisible();
  await expect(page.getByLabel('Preview of the Crossex data explorer')).toBeVisible();
  await expect(page.getByRole('heading', { name: /From raw rows to a defensible answer/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Graph Data' })).toBeVisible();
  await expect(page.getByLabel('Paste CSV, TSV, or JSON data')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Scatter example' })).toHaveAttribute('tabindex', '0');
});

test('landing page communicates the workflow without horizontal overflow', async function({ page }) {
  await page.goto('/');
  await expect(page.getByText('Automatic chart selection')).toBeVisible();
  await expect(page.getByText('Undoable analysis history')).toBeVisible();
  await expect(page.getByText('Keep the analysis, not just the screenshot.')).toBeVisible();
  const dimensions = await page.evaluate(function() {
    return { viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth };
  });
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);

  const previewButton = page.getByRole('button', { name: /Open this view/ });
  if (await previewButton.isVisible()) await previewButton.click();
  else await page.getByRole('button', { name: /Explore the penguins demo/ }).click();
  await expect(page.locator('#cc_hero')).toBeHidden();
  await expect(page.locator('#cc_start_intro')).toBeHidden();
  await expect(page.locator('#cc_data_notice')).toContainText('Loaded 344 rows × 8 columns');
});

test('parse failures remain visible and actionable', async function({ page }) {
  await page.goto('/');
  await page.getByLabel('Paste CSV, TSV, or JSON data').fill('[{"value": 1}');
  await page.getByRole('button', { name: 'Graph Data' }).click();

  const notice = page.locator('#cc_data_notice');
  await expect(notice).toBeVisible();
  await expect(notice).toHaveAttribute('role', 'alert');
  await expect(notice).toContainText('Could not parse data: Invalid JSON');
  await page.getByRole('button', { name: 'Dismiss message' }).click();
  await expect(notice).toBeHidden();
});

test('loaded data produces a quality report and supports type overrides', async function({ page }) {
  await page.goto('/');
  await page.getByLabel('Paste CSV, TSV, or JSON data').fill(
    'id,amount,group,missing\nrow-1,"1,200",same,\nrow-2,bad,same,\nrow-3,3,same,present'
  );
  await page.getByRole('button', { name: 'Graph Data' }).click();

  await expect(page.locator('#cc_data_notice')).toContainText('Loaded 3 rows × 4 columns');
  const qualityButton = page.locator('#data_quality');
  await expect(qualityButton).toBeEnabled();
  await qualityButton.click();

  await expect(page.getByRole('heading', { name: 'Data quality and column types' })).toBeVisible();
  await expect(page.locator('#cc_quality_columns tr')).toHaveCount(4);
  await expect(page.locator('#cc_quality_issues')).toContainText('constant value');

  await page.getByLabel('Use amount as').selectOption('numeric');
  await page.getByRole('button', { name: 'Apply type changes and regraph' }).click();
  await expect(page.locator('#cc_toast')).toContainText('Applied 1 column type change');
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('applied 1 column type override');
});

test('gallery cards can launch a demo from the keyboard', async function({ page }) {
  await page.goto('/');
  const scatter = page.getByRole('button', { name: 'Open Scatter example' });
  await scatter.focus();
  await page.keyboard.press('Enter');

  await expect(page.locator('#data_quality')).toBeEnabled();
  await expect(page.locator('#cc_hero')).toBeHidden();
});

test('landing and quality workflows have no serious automated accessibility violations', async function({ page }) {
  await page.goto('/');
  let results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(function(v) { return v.impact === 'critical' || v.impact === 'serious'; })).toEqual([]);

  // the data-source pulldown open state should also be accessible
  await page.locator('#cc_source_toggle').click();
  await expect(page.locator('#cc_source_menu')).toHaveClass(/open/);
  results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(function(v) { return v.impact === 'critical' || v.impact === 'serious'; })).toEqual([]);
  await page.keyboard.press('Escape');

  await page.getByLabel('Paste CSV, TSV, or JSON data').fill('name,value\na,1\nb,2');
  await page.getByRole('button', { name: 'Graph Data' }).click();
  await page.locator('#data_quality').click();
  results = await new AxeBuilder({ page }).include('#cc_quality').analyze();
  expect(results.violations.filter(function(v) { return v.impact === 'critical' || v.impact === 'serious'; })).toEqual([]);
});
