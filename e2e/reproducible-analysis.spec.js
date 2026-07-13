const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

async function loadAnalysisData(page) {
  await page.goto('/');
  await page.getByLabel('Paste CSV, TSV, or JSON data').fill(
    'id,group,value\na,x,3\nb,x,1\nc,y,2\na,x,3'
  );
  await page.getByRole('button', { name: 'Graph Data' }).click();
  await expect(page.locator('#cc_data_notice')).toContainText('Loaded 4 rows × 3 columns');
  await page.locator('#Transforms_tablinkssmartplot_id').click();
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('Loaded dataset');
}

test('data operations create undoable and redoable provenance states', async function({ page }) {
  await loadAnalysisData(page);

  await page.locator('#cc_lab_dedupe_colssmartplot_id').selectOption(['id', 'group', 'value']);
  await page.locator('#cc_lab_dedupe_applysmartplot_id').click();
  await expect(page.locator('#cc_data_notice')).toContainText('removed 1 duplicate rows: 3 rows');
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('removed 1 duplicate rows');
  await expect(page.locator('#cc_lab_undosmartplot_id')).toBeEnabled();

  await page.locator('#cc_lab_undosmartplot_id').click();
  await expect(page.locator('#cc_data_notice')).toContainText('Loaded dataset: 4 rows');
  await expect(page.locator('#cc_lab_redosmartplot_id')).toBeEnabled();

  await page.locator('#cc_lab_redosmartplot_id').click();
  await expect(page.locator('#cc_data_notice')).toContainText('removed 1 duplicate rows: 3 rows');
  await expect(page.locator('#cc_lab_historysmartplot_id .current')).toContainText('removed 1 duplicate rows');

  await page.locator('#cc_lab_sort_colsmartplot_id').selectOption('value');
  await page.locator('#cc_lab_sort_dirsmartplot_id').selectOption('desc');
  await page.locator('#cc_lab_sort_applysmartplot_id').click();
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('sorted by value (desc)');
});

test('formula columns participate in immutable undo and redo history', async function({ page }) {
  await loadAnalysisData(page);

  await page.locator('#cc_tr_namesmartplot_id').fill('double_value');
  await page.locator('#cc_tr_formulasmartplot_id').fill('value * 2');
  await page.locator('#cc_tr_applysmartplot_id').click();
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('created formula column double_value');
  await expect(page.locator('#cc_lab_sort_colsmartplot_id option')).toContainText(['id', 'group', 'value', 'double_value']);

  await page.locator('#cc_lab_undosmartplot_id').click();
  await expect(page.locator('#cc_lab_historysmartplot_id .current')).toContainText('Loaded dataset');
  await expect(page.locator('#cc_lab_sort_colsmartplot_id option')).toHaveCount(3);

  await page.locator('#cc_lab_redosmartplot_id').click();
  await expect(page.locator('#cc_lab_historysmartplot_id .current')).toContainText('created formula column double_value');
  await expect(page.locator('#cc_lab_sort_colsmartplot_id option')).toHaveCount(4);
});

test('grouping, joins, and portable project restore work end to end', async function({ page }) {
  await loadAnalysisData(page);

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#cc_lab_exportsmartplot_id').click();
  const download = await downloadPromise;
  const projectPath = await download.path();
  expect(download.suggestedFilename()).toMatch(/\.crossex\.json$/);

  await page.locator('#cc_lab_group_colsmartplot_id').selectOption('group');
  await page.locator('#cc_lab_agg_opsmartplot_id').selectOption('mean');
  await page.locator('#cc_lab_agg_colsmartplot_id').selectOption('value');
  await page.locator('#cc_lab_agg_namesmartplot_id').fill('average_value');
  await page.locator('#cc_lab_group_applysmartplot_id').click();
  await expect(page.locator('#cc_data_notice')).toContainText('grouped by group and calculated mean: 2 rows');

  await page.locator('#cc_lab_import_filesmartplot_id').setInputFiles(projectPath);
  await expect(page.locator('#cc_data_notice')).toContainText('Imported crossex-project');
  await expect(page.locator('#cc_data_notice')).toContainText('4 rows × 3 columns');
  await expect(page.locator('#cc_lab_historysmartplot_id .current')).toContainText('Imported crossex-project');

  await page.locator('#cc_lab_second_filesmartplot_id').setInputFiles({
    name: 'lookup.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from('id,label\na,Alpha\nb,Beta\nd,Delta')
  });
  await expect(page.locator('#cc_lab_second_notesmartplot_id')).toContainText('lookup.csv: 3 rows × 2 columns');
  await page.locator('#cc_lab_join_leftsmartplot_id').selectOption('id');
  await page.locator('#cc_lab_join_rightsmartplot_id').selectOption('id');
  await page.locator('#cc_lab_join_typesmartplot_id').selectOption('left');
  await page.locator('#cc_lab_join_applysmartplot_id').click();
  await expect(page.locator('#cc_data_notice')).toContainText('left joined lookup.csv: 4 rows × 4 columns');
  await expect(page.locator('#cc_lab_historysmartplot_id')).toContainText('left joined lookup.csv');
});

test('Data Lab has no serious automated accessibility violations', async function({ page }) {
  await loadAnalysisData(page);
  const results = await new AxeBuilder({ page })
    .include('.cc_lab_history_toolbar')
    .include('.cc_lab_history')
    .include('.cc_lab_ops')
    .analyze();
  expect(results.violations.filter(function(v) {
    return v.impact === 'critical' || v.impact === 'serious';
  })).toEqual([]);
});
