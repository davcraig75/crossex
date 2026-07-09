const { chromium } = require('playwright-core');
const fs = require('fs');
const DIR = '/private/tmp/claude-501/-Users-davidcraig-Documents-GitHub-crossex/373de736-7ea8-4d6b-85e1-9447e4d5d4c5/scratchpad/video';

// narration segment durations (measured from the aiff files)
const AUDIO = {
  seg01: 13.81, seg02: 14.40, seg03: 10.21, seg04: 9.31, seg05: 9.36,
  seg06: 7.24, seg07: 8.60, seg08: 7.68, seg09: 16.58, seg10: 7.24,
  seg11: 10.87, seg12: 10.08, seg13: 9.60, seg14: 13.17
};
// scene order: seg13 (dark/share) runs BEFORE seg12 (5M rows) so the big
// parse can finish behind the closing lines
const SCENES = [
  { seg: 'seg01', gap: 3.0 },  // landing scroll
  { seg: 'seg02', gap: 1.0 },  // load demo, graph at end
  { seg: 'seg03', gap: 2.0 },  // auto chart
  { seg: 'seg04', gap: 2.0 },  // scatter + colour
  { seg: 'seg05', gap: 2.0 },  // box -> violin
  { seg: 'seg06', gap: 2.0 },  // histogram
  { seg: 'seg07', gap: 2.0 },  // faceting
  { seg: 'seg08', gap: 2.0 },  // data table + overview
  { seg: 'seg09', gap: 2.0 },  // summary/filters/formula
  { seg: 'seg10', gap: 2.5 },  // 3D
  { seg: 'seg11', gap: 2.5 },  // pivot
  { seg: 'seg13', gap: 2.0 },  // dark mode + share link
  { seg: 'seg12', gap: 2.5 },  // 5M rows
  { seg: 'seg14', gap: 3.0 }   // close
];

const BASE = {
  X_Axis: 'flipper_length_mm', Y_Axis: 'body_mass_g', Color_By: 'None',
  Size_By: 'None', Stroke_By: 'None', Opacity_By: 'None', SortX_By: 'None',
  Facet_Rows_By: 'None', Facet_Cols_By: 'None', Sum_By: 'None',
  Filter_Out_From: 'None', Filter_Additional: 'None', Filter_By_Value: 'None',
  Include_Only: ' ', Term: '-',
  Line_: false, Boxplot_: true, Violin_: false, Outliers_: false,
  Histogram_: false, Contours_: false, Regression_: false, Jitter_: false,
  ECDF_: false, QQNorm_: false, Show_Covariance: false
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: DIR, size: { width: 1280, height: 720 } }
  });
  const page = await ctx.newPage();
  page.on('dialog', d => d.dismiss().catch(() => {}));
  const tContext = Date.now();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const t0 = Date.now();
  const lead = (t0 - tContext) / 1000;
  const sceneLog = [];
  let cursor = 0; // scheduled start of current scene, seconds from t0

  const now = () => (Date.now() - t0) / 1000;
  const waitUntil = async t => { const ms = (t - now()) * 1000; if (ms > 0) await page.waitForTimeout(ms); };

  const applySignals = async (overrides) => {
    await page.evaluate(([base, ov]) => {
      saveSignalState('vegaSignals_smartplot_id', Object.assign({}, base, ov));
      document.getElementById('graph_button').click();
    }, [BASE, overrides]);
  };
  const waitRender = async (timeout) => {
    await page.waitForFunction(() => {
      const l = document.getElementById('cc_loadersmartplot_id');
      return l && getComputedStyle(l).display === 'none' && document.querySelector('#smartplot_id canvas');
    }, { timeout }).catch(() => {});
  };

  for (let i = 0; i < SCENES.length; i++) {
    const sc = SCENES[i];
    const dur = AUDIO[sc.seg] + sc.gap;
    await waitUntil(cursor);
    sceneLog.push({ seg: sc.seg, scheduled: cursor, actual: now() });
    const end = cursor + dur;

    try {
      switch (sc.seg) {
        case 'seg01': { // landing tour
          await waitUntil(cursor + 4.5);
          await page.evaluate(() => window.scrollTo({ top: 330, behavior: 'smooth' }));
          await waitUntil(cursor + 9.0);
          await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'smooth' }));
          break;
        }
        case 'seg02': { // load demo data, graph near the end
          await page.evaluate(() => { const el = document.getElementById('myccinput'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
          await waitUntil(cursor + 2.5);
          await page.click('#default_data');
          await waitUntil(cursor + 12.0);
          await page.click('#graph_button');
          break;
        }
        case 'seg03': { // first auto chart: overview shows while narration says
          // "reads each column"; closing it reveals the chart on "draws a
          // sensible chart straight away"
          await waitRender(9000);
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
          await waitUntil(cursor + 5.2);
          await page.click('#Overview_btnsmartplot_id');
          break;
        }
        case 'seg04': { // scatter + colour
          await applySignals({ X_Axis: 'bill_length_mm', Color_By: 'species', Boxplot_: false });
          await waitRender(8000);
          break;
        }
        case 'seg05': { // box, then violin
          await applySignals({ X_Axis: 'species', Color_By: 'species' });
          await waitRender(6000);
          await waitUntil(cursor + 5.5);
          await applySignals({ X_Axis: 'species', Color_By: 'species', Violin_: true, Boxplot_: false });
          break;
        }
        case 'seg06': { // histogram
          await applySignals({ X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species' });
          break;
        }
        case 'seg07': { // faceting: by island, then also by sex
          await applySignals({ X_Axis: 'bill_length_mm', Y_Axis: 'bill_depth_mm', Color_By: 'species', Facet_Cols_By: 'island' });
          await waitRender(6000);
          await waitUntil(cursor + 4.8);
          await applySignals({ X_Axis: 'bill_length_mm', Y_Axis: 'bill_depth_mm', Color_By: 'species', Facet_Cols_By: 'island', Facet_Rows_By: 'sex' });
          break;
        }
        case 'seg08': { // data table then overview
          await waitRender(6000);
          await page.click('#Table_btnsmartplot_id');
          await waitUntil(cursor + 4.2);
          await page.click('#Overview_btnsmartplot_id');
          break;
        }
        case 'seg09': { // summary stats, filters, formula panel
          await page.click('#Overview_btnsmartplot_id'); // toggle overview off
          await page.waitForTimeout(200);
          await page.click('#Summary_tablinkssmartplot_id');
          await waitUntil(cursor + 6.5);
          await page.click('#Filtering_tablinkssmartplot_id');
          await waitUntil(cursor + 11.5);
          await page.click('#Transforms_tablinkssmartplot_id');
          break;
        }
        case 'seg10': { // 3D
          await page.click('#ThreeD_btnsmartplot_id');
          break;
        }
        case 'seg11': { // pivot; switch aggregator midway
          await page.click('#Pivot_btnsmartplot_id');
          await waitUntil(cursor + 5.5);
          try {
            await page.selectOption('#cc_pivotsmartplot_id .pvtAggregator', 'Average');
            await page.waitForTimeout(600);
            const extra = await page.$('#cc_pivotsmartplot_id .pvtVals select.pvtAttrDropdown');
            if (extra) await extra.selectOption('body_mass_g');
          } catch (e) { console.log('pivot aggregator switch skipped:', e.message); }
          break;
        }
        case 'seg13': { // dark mode + share link
          await page.click('#dark_toggle');
          await waitRender(7000);
          await waitUntil(cursor + 6.0);
          await page.click('#share_link');
          break;
        }
        case 'seg12': { // 5M rows
          await page.click('#large_demo');
          await waitUntil(cursor + 2.0);
          await page.evaluate(() => document.getElementById('graph_button').click());
          break;
        }
        case 'seg14': { // hold on final frame while parse/render completes
          await waitRender((AUDIO.seg14 + 2) * 1000);
          break;
        }
      }
    } catch (e) {
      console.log('scene', sc.seg, 'error:', e.message);
    }
    await waitUntil(end);
    cursor = end;
  }

  fs.writeFileSync(DIR + '/schedule_out.json', JSON.stringify({ lead, sceneLog, total: cursor }, null, 2));
  await ctx.close();
  const video = await page.video().path();
  fs.writeFileSync(DIR + '/videopath.txt', video);
  await browser.close();
  console.log('VIDEO:', video, 'lead:', lead.toFixed(2), 'total:', cursor.toFixed(1));
})().catch(e => { console.error(e); process.exit(1); });
