// ============================================================================
// Crossex Dashboard
// ----------------------------------------------------------------------------
// A grid of independent crossex charts built over one or more datasets. Each
// tile is a full crossex() widget rendered with {hide_panel:true}, so the whole
// existing chart engine (every chart type, sampling, export) is reused per tile.
//
// Tiles snap to a column grid; drag the header to reposition, drag the corner
// to resize (which re-fits the chart). A per-tile config popover exposes a
// Chart tab (type, X/Y, color, size, facets, palette) and a Data tab for
// viewing and replacing the data behind that chart — from a paste, an uploaded
// file, or a URL to CSV/TSV/JSON.
//
// This module is site-only: it lives in the wrapper bundle (crossex_site.js),
// never in the embeddable crossex.js. It relies on globals already defined by
// crossex_base.js / crossex_ext.js: crossex, saveSignalState, ccDarkMode,
// ccToast, parseInputData, ccFetchData, optimize_axis, convertDates,
// _lastStruct, itgz.
// ============================================================================
(function () {
	'use strict';

	var STORE_KEY = 'crossexDashboard_v1';

	// ---- Central state -------------------------------------------------------
	var DASH = {
		built: false,
		active: false,
		title: 'My Dashboard',
		cols: 12,          // grid columns
		width: 0,          // px max width of the canvas; 0 = full window
		cellH: 40,         // px per grid row
		gap: 12,           // px gutter between tiles
		datasets: {},      // key -> {name, rows(with .columns), source, _pending}
		dsOrder: [],       // dataset keys, insertion order
		tiles: [],         // {id,title,titleManual,caption,dsKey,cfg,overrides,gx,gy,gw,gh}
		seq: 0,            // tile id counter
		dsSeq: 0           // dataset key counter
	};

	// Vertical chrome inside a tile's chart: canvas title + x axis + legend.
	// tileSignalState seeds these compact values so a tile's full chart —
	// including its legend — fits the tile body instead of clipping.
	var TILE_TITLE_H = 22, TILE_AXIS_H = 42, TILE_LEGEND_H = 44;

	// The chart type a tile can be. Each maps to a combination of X/Y column
	// types plus Vega toggle signals — crossex has no single "chart type" signal.
	var CHART_TYPES = [
		{ key: 'scatter',    label: 'Scatter' },
		{ key: 'regression', label: 'Scatter + regression' },
		{ key: 'line',       label: 'Line / time series' },
		{ key: 'histogram',  label: 'Histogram' },
		{ key: 'box',        label: 'Box plot' },
		{ key: 'violin',     label: 'Violin plot' },
		{ key: 'bar',        label: 'Bar (count / sum)' },
		{ key: 'heatmap',    label: 'Heatmap / grid' }
	];

	var PALETTES = ['tableau10', 'tableau20', 'category10', 'category20', 'accent',
		'dark2', 'paired', 'set1', 'set2', 'viridis', 'magma', 'plasma', 'turbo',
		'blues', 'reds', 'greens', 'oranges', 'spectral', 'blueorange', 'redblue'];

	// ---- Tiny DOM helper -----------------------------------------------------
	function el(tag, cls, html) {
		var n = document.createElement(tag);
		if (cls) { n.className = cls; }
		if (html != null) { n.innerHTML = html; }
		return n;
	}
	function byId(id) { return document.getElementById(id); }
	function canvasEl() { return byId('dash_canvas'); }

	// ---- Column typing (light — just enough for smart defaults) --------------
	// Scans a prefix of the rows to guess numeric-vs-categorical and an
	// (approximate, capped) distinct count per column, which the default-chart
	// picker uses to avoid mapping a high-cardinality column to color.
	function colTypes(rows, cols) {
		cols = cols || rows.columns || (rows[0] ? Object.keys(rows[0]) : []);
		var numeric = {}, distinct = {};
		var scan = Math.min(rows.length, 2000);
		cols.forEach(function (c) {
			var seen = 0, num = 0, set = new Set();
			for (var i = 0; i < scan; i++) {
				var v = rows[i][c];
				if (v === null || v === '' || v === undefined) { continue; }
				seen++;
				if (typeof v === 'number' && isFinite(v)) { num++; }
				else if (typeof v === 'string' && v.trim() !== '' && !isNaN(+v)) { num++; }
				if (set.size < 200) { set.add(v); }
			}
			numeric[c] = seen > 0 && num / seen >= 0.8;
			distinct[c] = set.size;
		});
		return { columns: cols, numeric: numeric, distinct: distinct };
	}

	function datasetOf(tile) { return DASH.datasets[tile.dsKey]; }
	function tileHasRows(tile) {
		var d = datasetOf(tile);
		return d && d.rows && d.rows.length;
	}

	// A sensible starting chart for a dataset, from its column types.
	function defaultCfg(dsKey) {
		var rows = DASH.datasets[dsKey].rows;
		var cols = dsCols(dsKey);
		var t = colTypes(rows, cols);
		var cats = cols.filter(function (c) { return !t.numeric[c]; });
		// Prefer continuous numerics for scatter axes: a near-discrete column
		// (e.g. cylinders: 4/6/8) makes a poor axis and a degenerate density
		// grid. Keep original order as the tiebreak so it stays predictable.
		var nums = cols.filter(function (c) { return t.numeric[c]; })
			.sort(function (a, b) { return t.distinct[b] - t.distinct[a]; });
		// Categoricals that make a readable legend/axis (2–12 groups), smallest
		// first — a 300-value column mapped to color is a useless rainbow.
		var goodCats = cats.filter(function (c) { return t.distinct[c] >= 2 && t.distinct[c] <= 12; })
			.sort(function (a, b) { return t.distinct[a] - t.distinct[b]; });
		var color = goodCats.length ? goodCats[0] : 'None';
		var cfg = { type: 'scatter', x: 'None', y: 'None', color: 'None', size: 'None',
			facetCol: 'None', facetRow: 'None', palette: 'tableau10', stats: false };
		if (nums.length >= 2) {
			cfg.type = 'scatter'; cfg.x = nums[0]; cfg.y = nums[1]; cfg.color = color;
		} else if (goodCats.length >= 1 && nums.length >= 1) {
			cfg.type = 'box'; cfg.x = goodCats[0]; cfg.y = nums[0]; cfg.color = goodCats[0];
		} else if (cats.length >= 1 && nums.length >= 1) {
			cfg.type = 'box'; cfg.x = cats[0]; cfg.y = nums[0];
		} else if (nums.length === 1) {
			cfg.type = 'histogram'; cfg.x = nums[0]; cfg.y = 'None'; cfg.color = color;
		} else if (goodCats.length >= 2) {
			cfg.type = 'heatmap'; cfg.x = goodCats[0]; cfg.y = goodCats[1];
		} else if (cats.length >= 2) {
			cfg.type = 'heatmap'; cfg.x = cats[0]; cfg.y = cats[1];
		} else if (cats.length === 1) {
			cfg.type = 'bar'; cfg.x = cats[0]; cfg.y = 'Count';
		}
		return cfg;
	}

	function chartTitle(cfg) {
		var t = cfg.type;
		if (t === 'histogram') { return 'Distribution of ' + cfg.x; }
		if (t === 'bar') { return (cfg.y === 'Count' ? 'Count' : cfg.y) + ' by ' + cfg.x; }
		if (t === 'heatmap') { return cfg.x + ' × ' + cfg.y; }
		if (cfg.y && cfg.y !== 'None') { return cfg.y + ' vs ' + cfg.x; }
		return cfg.x || 'Chart';
	}

	// ---- Signal state for a tile (seeded to localStorage, authoritative) -----
	function tileSignalState(tile) {
		var c = tile.cfg;
		var s = {
			X_Axis: c.x || 'None', Y_Axis: c.y || 'None', Search_By: c.x || 'None',
			Color_By: c.color || 'None', Size_By: c.size || 'None',
			Facet_Cols_By: c.facetCol || 'None', Facet_Rows_By: c.facetRow || 'None',
			Sum_By: 'None', SortX_By: 'None', Opacity_By: 'None', Stroke_By: 'None',
			Filter_Out_From: 'None', Filter_Additional: 'None', Filter_By_Value: 'None',
			Include_Only: ' ', Term: '-',
			Palette: c.palette || 'tableau10', Reverse_Color: false,
			Line_: false, Boxplot_: false, Violin_: false, Barplot_: false,
			Outliers_: false, Histogram_: false, Contours_: false, Regression_: false,
			Jitter_: false, ECDF_: false, QQNorm_: false, Points_: true,
			Stats_: !!c.stats, Show_Covariance: false,
			Title_Height: TILE_TITLE_H, X_Axis_Height: TILE_AXIS_H, Legend_Height: TILE_LEGEND_H,
			Max_Plot_Height: tile._plotH || 240
		};
		switch (c.type) {
			case 'scatter': break;
			case 'regression': s.Regression_ = true; break;
			case 'line': s.Line_ = true; break;
			case 'histogram': s.Y_Axis = 'None'; s.Histogram_ = true; break;
			case 'box': s.Boxplot_ = true; break;
			case 'violin': s.Violin_ = true; s.Points_ = false; break;
			case 'bar':
				if (c.y && c.y !== 'None' && c.y !== 'Count') { s.Barplot_ = true; s.Points_ = false; }
				else { s.Y_Axis = 'Count'; }
				break;
			case 'heatmap': break;
		}
		return s;
	}

	function bindOpt(name, value, options) {
		return { name: name, value: value, bind: { options: options } };
	}
	// The options array passed to crossex(): panel flags plus the column lists
	// for each dropdown so the seeded signal values validate against them.
	function tileOptions(tile) {
		var headers = dsCols(tile.dsKey);
		var st = tileSignalState(tile);
		return [
			{ hide_panel: true }, { exportable: true },
			bindOpt('X_Axis', st.X_Axis, headers),
			bindOpt('Y_Axis', st.Y_Axis, headers),
			bindOpt('Search_By', st.Search_By, headers),
			bindOpt('Color_By', st.Color_By, headers),
			bindOpt('Size_By', st.Size_By, headers),
			bindOpt('Facet_Cols_By', st.Facet_Cols_By, headers),
			bindOpt('Facet_Rows_By', st.Facet_Rows_By, headers),
			bindOpt('Sum_By', 'None', headers),
			bindOpt('SortX_By', 'None', headers),
			bindOpt('Opacity_By', 'None', headers),
			bindOpt('Stroke_By', 'None', headers),
			bindOpt('Filter_By_Value', 'None', headers),
			bindOpt('Filter_Additional', 'None', headers),
			bindOpt('Filter_Out_From', 'None', headers),
			{ name: 'Palette', value: st.Palette }
		];
	}

	// A tile's private copy of its dataset's rows — rebuilt only when the tile is
	// bound to a different dataset. Each tile owns clean row objects so its Vega
	// view never fights another tile's over the shared derived fields.
	function tileRows(tile) {
		var ds = datasetOf(tile);
		if (tile._rowsKey !== tile.dsKey || !tile._rows) {
			tile._rows = cloneRows(ds.rows, ds.columns);
			tile._rowsKey = tile.dsKey;
		}
		return tile._rows;
	}

	// ---- Render one tile's chart --------------------------------------------
	function renderTile(tile) {
		// During the initial enter, tiles are built and laid out first, then
		// rendered once from renderAllCharts() — rendering here too would tear
		// down and rebuild each view (a churn that flickers "invalid size").
		if (DASH._deferRender) { return; }
		var chartId = 'dash_chart_' + tile.id;
		if (!tileHasRows(tile)) { showTilePending(tile); return; }
		var body = byId('dash_body_' + tile.id);
		if (!body) { return; }
		// Vega throws "invalid size" if rendered into a zero-size box — which is
		// exactly the state right after the dashboard is first shown but before
		// layout flushes (the inherited-data seed path). Wait for a real size.
		if (body.clientWidth < 20 || body.clientHeight < 20) {
			tile._renderTries = (tile._renderTries || 0) + 1;
			if (tile._renderTries < 60 && !tile._renderRAF) {
				tile._renderRAF = requestAnimationFrame(function () {
					tile._renderRAF = 0; renderTile(tile);
				});
			}
			return;
		}
		tile._renderTries = 0;
		// leave room for the in-canvas title, x axis, and legend so the whole
		// chart — legend included — is visible inside the tile
		tile._plotH = Math.max(100, body.clientHeight - TILE_TITLE_H - TILE_AXIS_H - TILE_LEGEND_H - 16);
		// full-editor tweaks (tile.overrides) sit on top of the quick config;
		// the computed plot height always wins so the chart keeps fitting
		var state = Object.assign({}, tileSignalState(tile), tile.overrides || {});
		state.Max_Plot_Height = tile._plotH;
		saveSignalState('vegaSignals_' + chartId, state);
		try {
			crossex(chartId, tileRows(tile), tileOptions(tile), 'dash_body_' + tile.id);
		} catch (e) {
			byId(chartId).innerHTML = '<div class="dash_msg">Could not render this chart.</div>';
		}
	}
	function showTilePending(tile) {
		var c = byId('dash_chart_' + tile.id);
		if (!c) { return; }
		var d = datasetOf(tile);
		c.innerHTML = '<div class="dash_msg">' +
			(d && d._pending ? 'Loading data…'
				: 'This dataset wasn’t saved with the layout.<br>Open ⚙ ▸ Data to reload it, or use Import.') +
			'</div>';
	}
	function renderAllCharts() { DASH.tiles.forEach(renderTile); }

	// ---- Grid geometry -------------------------------------------------------
	function unitW() { return canvasEl().clientWidth / DASH.cols; }
	function tilePx(t) {
		var uw = unitW(), g = DASH.gap;
		return {
			left: t.gx * uw + g / 2, top: t.gy * DASH.cellH + g / 2,
			width: t.gw * uw - g, height: t.gh * DASH.cellH - g
		};
	}
	function layoutTile(t) {
		var node = byId('dash_tile_' + t.id);
		if (!node) { return; }
		var p = tilePx(t);
		node.style.left = p.left + 'px';
		node.style.top = p.top + 'px';
		node.style.width = p.width + 'px';
		node.style.height = p.height + 'px';
	}
	function updateCanvasHeight() {
		var maxRow = 4;
		DASH.tiles.forEach(function (t) { maxRow = Math.max(maxRow, t.gy + t.gh); });
		canvasEl().style.height = (maxRow * DASH.cellH + DASH.gap) + 'px';
	}
	function relayoutAll() { DASH.tiles.forEach(layoutTile); updateCanvasHeight(); }

	function overlaps(gx, gy, gw, gh, ignore) {
		return DASH.tiles.some(function (t) {
			if (t === ignore) { return false; }
			return gx < t.gx + t.gw && gx + gw > t.gx && gy < t.gy + t.gh && gy + gh > t.gy;
		});
	}
	// First free slot scanning top-to-bottom, left-to-right.
	function firstFit(gw, gh) {
		for (var gy = 0; gy < 2000; gy++) {
			for (var gx = 0; gx <= DASH.cols - gw; gx++) {
				if (!overlaps(gx, gy, gw, gh, null)) { return { gx: gx, gy: gy }; }
			}
		}
		return { gx: 0, gy: 0 };
	}
	// Repack every tile in reading order with no overlaps.
	function tidy() {
		var order = DASH.tiles.slice().sort(function (a, b) {
			return (a.gy - b.gy) || (a.gx - b.gx);
		});
		var placed = [];
		function fits(gx, gy, gw, gh) {
			return !placed.some(function (p) {
				return gx < p.gx + p.gw && gx + gw > p.gx && gy < p.gy + p.gh && gy + gh > p.gy;
			});
		}
		order.forEach(function (t) {
			var gw = Math.min(t.gw, DASH.cols), gh = t.gh, done = false;
			for (var gy = 0; gy < 4000 && !done; gy++) {
				for (var gx = 0; gx <= DASH.cols - gw && !done; gx++) {
					if (fits(gx, gy, gw, gh)) {
						t.gx = gx; t.gy = gy; t.gw = gw;
						placed.push({ gx: gx, gy: gy, gw: gw, gh: gh });
						done = true;
					}
				}
			}
		});
		relayoutAll();
		persist();
	}

	// ---- Drag placeholder ----------------------------------------------------
	function showPlaceholder(gx, gy, gw, gh) {
		var ph = byId('dash_placeholder');
		if (!ph) {
			ph = el('div', 'dash_placeholder');
			ph.id = 'dash_placeholder';
			canvasEl().appendChild(ph);
		}
		var uw = unitW(), g = DASH.gap;
		ph.style.display = 'block';
		ph.style.left = (gx * uw + g / 2) + 'px';
		ph.style.top = (gy * DASH.cellH + g / 2) + 'px';
		ph.style.width = (gw * uw - g) + 'px';
		ph.style.height = (gh * DASH.cellH - g) + 'px';
	}
	function hidePlaceholder() {
		var ph = byId('dash_placeholder');
		if (ph) { ph.style.display = 'none'; }
	}

	// ---- Drag to reposition --------------------------------------------------
	function attachDrag(tile) {
		var head = byId('dash_head_' + tile.id);
		var node = byId('dash_tile_' + tile.id);
		head.addEventListener('pointerdown', function (e) {
			if (e.target.closest('.dash_tbtn') || e.target.isContentEditable || e.button !== 0) { return; }
			e.preventDefault();
			var startX = e.clientX, startY = e.clientY;
			var p = tilePx(tile), left0 = p.left, top0 = p.top;
			var tgx = tile.gx, tgy = tile.gy;
			node.classList.add('dash_dragging');
			node.style.zIndex = 1000;
			head.setPointerCapture(e.pointerId);
			function move(ev) {
				var nl = left0 + (ev.clientX - startX), nt = top0 + (ev.clientY - startY);
				node.style.left = nl + 'px';
				node.style.top = nt + 'px';
				var uw = unitW(), g = DASH.gap;
				tgx = Math.max(0, Math.min(DASH.cols - tile.gw, Math.round((nl - g / 2) / uw)));
				tgy = Math.max(0, Math.round((nt - g / 2) / DASH.cellH));
				showPlaceholder(tgx, tgy, tile.gw, tile.gh);
			}
			function up() {
				head.removeEventListener('pointermove', move);
				head.removeEventListener('pointerup', up);
				node.classList.remove('dash_dragging');
				node.style.zIndex = '';
				hidePlaceholder();
				tile.gx = tgx; tile.gy = tgy;
				layoutTile(tile); updateCanvasHeight(); persist();
			}
			head.addEventListener('pointermove', move);
			head.addEventListener('pointerup', up);
		});
	}

	// ---- Drag corner to resize (re-fits the chart on release) ---------------
	function attachResize(tile) {
		var handle = byId('dash_resize_' + tile.id);
		var node = byId('dash_tile_' + tile.id);
		handle.addEventListener('pointerdown', function (e) {
			if (e.button !== 0) { return; }
			e.preventDefault(); e.stopPropagation();
			var startX = e.clientX, startY = e.clientY;
			var p = tilePx(tile), w0 = p.width, h0 = p.height;
			var tgw = tile.gw, tgh = tile.gh;
			node.classList.add('dash_resizing');
			node.style.zIndex = 1000;
			handle.setPointerCapture(e.pointerId);
			function move(ev) {
				var nw = Math.max(80, w0 + (ev.clientX - startX));
				var nh = Math.max(80, h0 + (ev.clientY - startY));
				node.style.width = nw + 'px';
				node.style.height = nh + 'px';
				var uw = unitW(), g = DASH.gap;
				tgw = Math.max(2, Math.min(DASH.cols - tile.gx, Math.round((nw + g) / uw)));
				tgh = Math.max(2, Math.round((nh + g) / DASH.cellH));
				showPlaceholder(tile.gx, tile.gy, tgw, tgh);
			}
			function up() {
				handle.removeEventListener('pointermove', move);
				handle.removeEventListener('pointerup', up);
				node.classList.remove('dash_resizing');
				node.style.zIndex = '';
				hidePlaceholder();
				tile.gw = tgw; tile.gh = tgh;
				layoutTile(tile); updateCanvasHeight(); persist();
				renderTile(tile);
			}
			handle.addEventListener('pointermove', move);
			handle.addEventListener('pointerup', up);
		});
	}

	// ---- Tile DOM ------------------------------------------------------------
	function buildTileDom(tile) {
		var node = el('div', 'dash_tile');
		node.id = 'dash_tile_' + tile.id;
		node.innerHTML =
			'<div class="dash_head" id="dash_head_' + tile.id + '">' +
				'<span class="dash_grip"></span>' +
				'<span class="dash_title" id="dash_title_' + tile.id + '" contenteditable="true" spellcheck="false" title="Click to rename"></span>' +
				'<span class="dash_tools">' +
					'<button class="dash_tbtn dash_edit" title="Open with the full control panel">🛠</button>' +
					'<button class="dash_tbtn dash_cfg" title="Quick chart &amp; data setup">⚙</button>' +
					'<button class="dash_tbtn dash_dup" title="Duplicate">⧉</button>' +
					'<button class="dash_tbtn dash_del" title="Remove">✕</button>' +
				'</span>' +
			'</div>' +
			'<div class="dash_body" id="dash_body_' + tile.id + '">' +
				'<div class="dash_chart" id="dash_chart_' + tile.id + '"></div>' +
			'</div>' +
			'<div class="dash_caption" id="dash_caption_' + tile.id + '" contenteditable="true" spellcheck="false" data-placeholder="Add a caption…"></div>' +
			'<div class="dash_resize" id="dash_resize_' + tile.id + '" title="Drag to resize"></div>';
		canvasEl().appendChild(node);
		byId('dash_title_' + tile.id).textContent = tile.title;
		byId('dash_head_' + tile.id).querySelector('.dash_grip').textContent = '⠿';
		var titleEl = byId('dash_title_' + tile.id);
		titleEl.addEventListener('input', function () {
			tile.title = titleEl.textContent.trim() || tile.title;
			tile.titleManual = true;
			persist();
		});
		titleEl.addEventListener('keydown', function (e) {
			if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); }
		});
		var cap = byId('dash_caption_' + tile.id);
		cap.textContent = tile.caption || '';
		cap.addEventListener('input', function () {
			tile.caption = cap.textContent.trim();
			persist();
		});
		node.querySelector('.dash_edit').onclick = function () { openFullEditor(tile); };
		node.querySelector('.dash_cfg').onclick = function () { openConfig(tile); };
		node.querySelector('.dash_dup').onclick = function () { duplicateTile(tile); };
		node.querySelector('.dash_del').onclick = function () { removeTile(tile); };
		attachDrag(tile);
		attachResize(tile);
	}

	function setTileTitle(tile, title, manual) {
		tile.title = title;
		if (manual) { tile.titleManual = true; }
		var t = byId('dash_title_' + tile.id);
		if (t) { t.textContent = title; }
	}

	function addTile(dsKey, cfg) {
		dsKey = dsKey || DASH.dsOrder[0];
		if (!dsKey) { ccToast('Add a dataset first'); return null; }
		var id = ++DASH.seq;
		cfg = cfg || defaultCfg(dsKey);
		var gw = Math.min(6, DASH.cols), gh = 8;
		var pos = firstFit(gw, gh);
		var tile = { id: id, title: chartTitle(cfg), titleManual: false, caption: '', dsKey: dsKey,
			cfg: cfg, overrides: null, gx: pos.gx, gy: pos.gy, gw: gw, gh: gh };
		DASH.tiles.push(tile);
		buildTileDom(tile);
		layoutTile(tile);
		updateCanvasHeight();
		renderTile(tile);
		refreshEmpty();
		persist();
		return tile;
	}

	function removeTile(tile) {
		var i = DASH.tiles.indexOf(tile);
		if (i >= 0) { DASH.tiles.splice(i, 1); }
		var node = byId('dash_tile_' + tile.id);
		if (node) { node.remove(); }
		updateCanvasHeight();
		refreshEmpty();
		persist();
	}

	function duplicateTile(tile) {
		var copy = JSON.parse(JSON.stringify(tile.cfg));
		var t = addTile(tile.dsKey, copy);
		if (!t) { return; }
		if (tile.titleManual) { setTileTitle(t, tile.title + ' (copy)', true); }
		t.caption = tile.caption || '';
		t.overrides = tile.overrides ? JSON.parse(JSON.stringify(tile.overrides)) : null;
		var cap = byId('dash_caption_' + t.id);
		if (cap) { cap.textContent = t.caption; }
		renderTile(t);
		persist();
	}

	// Reapply a tile's config after an edit: refresh title (unless renamed),
	// re-render its chart, and persist.
	function applyTile(tile) {
		if (tile.overrides) {
			// quick-config choices must beat stale full-editor state for the
			// fields both understand, or ⚙ edits would appear to do nothing
			var st = tileSignalState(tile);
			['X_Axis', 'Y_Axis', 'Color_By', 'Size_By', 'Facet_Cols_By', 'Facet_Rows_By',
				'Palette', 'Stats_', 'Line_', 'Boxplot_', 'Violin_', 'Barplot_',
				'Histogram_', 'Regression_', 'Points_'].forEach(function (k) {
				if (k in tile.overrides) { tile.overrides[k] = st[k]; }
			});
		}
		if (!tile.titleManual) { setTileTitle(tile, chartTitle(tile.cfg), false); }
		renderTile(tile);
		persist();
	}

	// ---- Datasets ------------------------------------------------------------
	function emptyRows(cols) { var a = []; a.columns = cols || []; return a; }

	// Copy just the real columns of each row into a fresh object. Vega mutates
	// the row objects it renders (adding X_Value, Color_Value, …), so every tile
	// gets its own clean copy and we never hand a shared array to two views.
	function pickRow(r, cols) {
		var o = {};
		for (var j = 0; j < cols.length; j++) { o[cols[j]] = r[cols[j]]; }
		return o;
	}
	function cloneRows(rows, cols) {
		var out = new Array(rows.length);
		for (var i = 0; i < rows.length; i++) { out[i] = pickRow(rows[i], cols); }
		out.columns = cols.slice();
		return out;
	}

	// Stable, load-time column list for a dataset (never recomputed post-render).
	function dsCols(dsKey) { return DASH.datasets[dsKey].columns || []; }

	function addDataset(name, rows, source, cols) {
		var quality = null;
		try { quality = CrossexData.profile(rows); } catch (e) { /* loader already validates rows */ }
		convertDates(rows); // decimal-year dates, same as the single-chart path
		var columns = (cols && cols.length ? cols : (rows.columns || (rows[0] ? Object.keys(rows[0]) : []))).slice();
		if (!rows.columns) { rows.columns = columns; }
		var key = 'ds' + (++DASH.dsSeq);
		DASH.datasets[key] = {
			name: name || ('Dataset ' + (DASH.dsOrder.length + 1)),
			rows: rows, columns: columns, source: source || { type: 'paste' }, quality: quality
		};
		DASH.dsOrder.push(key);
		renderDsBar();
		persist();
		return key;
	}

	function renderDsBar() {
		var bar = byId('dash_ds_bar');
		if (!bar) { return; }
		bar.innerHTML = '';
		if (!DASH.dsOrder.length) {
			bar.style.display = 'none';
			return;
		}
		bar.style.display = 'flex';
		bar.appendChild(el('span', 'dash_ds_label', 'Data sources:'));
		DASH.dsOrder.forEach(function (k) {
			var d = DASH.datasets[k];
			var chip = el('span', 'dash_ds_chip');
			var n = (d.rows && d.rows.length) ? d.rows.length.toLocaleString() : '—';
			var ncol = (d.columns || []).length;
			var issueCount = d.quality ? d.quality.issues.length : 0;
			chip.innerHTML = '<b>' + escapeHtml(d.name) + '</b> <span>' + n + ' × ' + ncol + '</span>' +
				(issueCount ? '<span class="dash_ds_quality" title="Data-quality flags">' + issueCount + ' flags</span>' : '');
			chip.title = 'Add a chart from ' + d.name + (issueCount ? ' · ' + issueCount + ' data-quality flags' : '');
			chip.onclick = function () { addTile(k); };
			bar.appendChild(chip);
		});
	}

	function escapeHtml(s) {
		return String(s).replace(/[&<>"]/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
		});
	}

	// ---- Modal shell ---------------------------------------------------------
	var _modalReturnFocus = null;
	var _modalOnClose = null;
	function openModal(title, bodyNode, wide, onClose) {
		closeModal();
		_modalOnClose = onClose || null;
		_modalReturnFocus = document.activeElement;
		var bg = el('div', 'dash_modal_bg');
		bg.id = 'dash_modal_bg';
		var box = el('div', 'dash_modal' + (wide ? ' dash_modal_wide' : ''));
		box.setAttribute('role', 'dialog');
		box.setAttribute('aria-modal', 'true');
		box.setAttribute('aria-label', title);
		var head = el('div', 'dash_modal_head');
		head.appendChild(el('b', null, escapeHtml(title)));
		var x = el('button', 'dash_modal_x', '✕');
		x.type = 'button';
		x.setAttribute('aria-label', 'Close dialog');
		x.onclick = closeModal;
		head.appendChild(x);
		box.appendChild(head);
		box.appendChild(bodyNode);
		bg.appendChild(box);
		bg.addEventListener('pointerdown', function (e) { if (e.target === bg) { closeModal(); } });
		bg.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); } });
		document.body.appendChild(bg);
		x.focus();
		return bg;
	}
	function closeModal() {
		var bg = byId('dash_modal_bg');
		if (bg) { bg.remove(); }
		if (_modalReturnFocus && document.contains(_modalReturnFocus)) { _modalReturnFocus.focus(); }
		_modalReturnFocus = null;
		if (_modalOnClose) {
			var cb = _modalOnClose;
			_modalOnClose = null;
			cb();
		}
	}

	// ---- Reusable data-loader controls (paste / URL / file / current) --------
	// onLoaded(rows, name, source) is called once a dataset is parsed.
	function buildLoaderControls(onLoaded) {
		var wrap = el('div', 'dash_loader');
		wrap.innerHTML =
			'<label class="dash_fld"><span>Paste CSV, TSV, or JSON</span>' +
				'<textarea class="dash_paste" placeholder="col1,col2\\n1,2\\n3,4"></textarea></label>' +
			'<div class="dash_row">' +
				'<input class="dash_name" type="text" placeholder="Name this dataset (optional)">' +
				'<button type="button" class="cc_button active dash_use_paste">Use pasted data</button>' +
			'</div>' +
			'<div class="dash_row dash_url_row">' +
				'<input class="dash_url" type="url" inputmode="url" autocomplete="url" aria-label="CSV, TSV, or JSON URL" placeholder="https://example.com/data.csv — CSV, TSV, or JSON">' +
				'<button type="button" class="cc_button dash_use_url">Fetch URL</button>' +
			'</div>' +
			'<div class="dash_row">' +
				'<button type="button" class="cc_button dash_use_file">Upload file…</button>' +
				'<button type="button" class="cc_button dash_use_demo">Load penguins demo</button>' +
				'<button type="button" class="cc_button dash_use_current" style="display:none">Use data loaded in app</button>' +
				'<input type="file" class="dash_file" accept=".csv,.tsv,.txt,.tab,.json" style="display:none">' +
			'</div>' +
			'<div class="dash_loader_msg" role="status" aria-live="polite"></div>';

		var paste = wrap.querySelector('.dash_paste');
		var nameIn = wrap.querySelector('.dash_name');
		var urlIn = wrap.querySelector('.dash_url');
		var fileIn = wrap.querySelector('.dash_file');
		var msg = wrap.querySelector('.dash_loader_msg');
		function say(text, err) { msg.textContent = text; msg.className = 'dash_loader_msg' + (err ? ' err' : ''); }
		function done(rows, name, source) {
			if (!rows || !rows.length) { say('No rows parsed.', true); return; }
			onLoaded(rows, name || nameIn.value.trim() || null, source);
		}

		wrap.querySelector('.dash_use_paste').onclick = function () {
			var text = paste.value.trim();
			if (!text) { say('Paste some data first.', true); return; }
			try { done(parseInputData(text), null, { type: 'paste' }); }
			catch (e) { say('Could not parse: ' + e.message, true); }
		};
		var urlButton = wrap.querySelector('.dash_use_url');
		urlButton.onclick = function () {
			var url = urlIn.value.trim();
			if (!url) { say('Enter a URL first.', true); return; }
			urlButton.disabled = true;
			say('Fetching…');
			ccFetchData(url).then(function (rows) {
				urlButton.disabled = false;
				done(rows, null, { type: 'url', url: url });
			}).catch(function (e) { urlButton.disabled = false; say('Could not load URL: ' + e.message, true); });
		};
		wrap.querySelector('.dash_use_file').onclick = function () { fileIn.click(); };
		fileIn.addEventListener('change', function (e) {
			if (!e.target.files.length) { return; }
			var f = e.target.files[0];
			if (typeof MAX_FILE_BYTES !== 'undefined' && f.size > MAX_FILE_BYTES) {
				say('That file is larger than the 512 MB safety limit.', true);
				e.target.value = '';
				return;
			}
			var reader = new FileReader();
			reader.onload = function (ev) {
				try { done(parseInputData(ev.target.result), f.name.replace(/\.[^.]+$/, ''), { type: 'file' }); }
				catch (err) { say('Could not parse file: ' + err.message, true); }
			};
			reader.readAsText(f);
			e.target.value = '';
		});
		wrap.querySelector('.dash_use_demo').onclick = function () {
			var seed = byId('default_data');
			if (seed) { seed.click(); }
			var text = byId('myccinput') ? byId('myccinput').value : '';
			try { done(parseInputData(text), 'penguins', { type: 'demo' }); }
			catch (e) { say('Demo unavailable.', true); }
		};
		var cur = wrap.querySelector('.dash_use_current');
		if (typeof _lastStruct !== 'undefined' && _lastStruct && _lastStruct.length) {
			cur.style.display = '';
			cur.onclick = function () { done(_lastStruct, 'Loaded data', { type: 'inherited' }); };
		}
		return wrap;
	}

	// ---- "Add data" from the toolbar ----------------------------------------
	function openAddData() {
		var body = el('div', 'dash_modal_body');
		body.appendChild(el('p', 'dash_hint', 'Load a dataset into the dashboard. You can add several and point different charts at each.'));
		body.appendChild(buildLoaderControls(function (rows, name, source) {
			var key = addDataset(name, rows, source);
			closeModal();
			ccToast('Added "' + DASH.datasets[key].name + '" (' + rows.length.toLocaleString() + ' rows)');
			if (DASH.tiles.length === 0) { addTile(key); }
		}));
		openModal('Add data', body);
	}

	// ---- Full-panel editor ---------------------------------------------------
	// Opens the tile's chart as a complete crossex widget — every tab of the
	// control panel, plus on-chart direct editing. The editor works on a
	// scratch signal store seeded from the tile; closing the modal captures
	// that state back onto the tile as overrides and re-renders it.
	var EDITOR_ID = 'dash_editor_host';
	function openFullEditor(tile) {
		if (!tileHasRows(tile)) { ccToast('Load data for this chart first (⚙ ▸ Data)'); return; }
		var body = el('div', 'dash_modal_body dash_editor_body');
		var host = el('div');
		host.id = EDITOR_ID;
		body.appendChild(el('p', 'dash_hint',
			'Full control panel for this chart — changes apply to the tile when you close this window. You can also drag titles and the legend, and double-click axes, the legend, or empty space to edit them in place.'));
		body.appendChild(host);
		openModal('Edit chart — ' + tile.title, body, true, function () {
			var edited = loadSignalsFromCookie('vegaSignals_' + EDITOR_ID);
			try { if (_views[EDITOR_ID]) { _views[EDITOR_ID].finalize(); delete _views[EDITOR_ID]; } } catch (e) {}
			if (!edited) { return; }
			tile.overrides = edited;
			// reflect the mapped fields back into the quick config
			var c = tile.cfg;
			c.x = edited.X_Axis || c.x;
			c.y = edited.Y_Axis || c.y;
			c.color = edited.Color_By || c.color;
			c.size = edited.Size_By || c.size;
			c.facetCol = edited.Facet_Cols_By || c.facetCol;
			c.facetRow = edited.Facet_Rows_By || c.facetRow;
			c.palette = edited.Palette || c.palette;
			c.stats = !!edited.Stats_;
			if (!tile.titleManual) { setTileTitle(tile, chartTitle(c), false); }
			renderTile(tile);
			persist();
		});
		byId('dash_modal_bg').classList.add('dash_modal_full');
		// seed the editor with the tile's effective state, minus the tile-fit
		// height so the editor uses its own, larger plot area
		var seed = Object.assign({}, tileSignalState(tile), tile.overrides || {});
		delete seed.Max_Plot_Height;
		seed.Title_Height = 34;
		seed.Legend_Height = 60;
		saveSignalState('vegaSignals_' + EDITOR_ID, seed);
		var opts = tileOptions(tile).filter(function (o) {
			return !(o && Object.prototype.hasOwnProperty.call(o, 'hide_panel'));
		});
		opts.push({ editable: 1 });
		// render on the next frame: the modal needs a layout pass first or the
		// widget measures a zero-width host ("invalid size")
		requestAnimationFrame(function () {
			if (!document.contains(host)) { return; }
			try {
				crossex(EDITOR_ID, tileRows(tile), opts, EDITOR_ID);
			} catch (e) {
				host.innerHTML = '<div class="dash_msg">Could not open the editor for this chart.</div>';
			}
		});
	}

	// ---- Per-tile config: Chart + Data tabs ----------------------------------
	function openConfig(tile) {
		var body = el('div', 'dash_modal_body');
		var tabs = el('div', 'dash_tabs');
		var bChart = el('button', 'dash_tab active', 'Chart');
		var bData = el('button', 'dash_tab', 'Data');
		tabs.appendChild(bChart); tabs.appendChild(bData);
		body.appendChild(tabs);
		var paneChart = el('div', 'dash_pane');
		var paneData = el('div', 'dash_pane', '');
		paneData.style.display = 'none';
		body.appendChild(paneChart);
		body.appendChild(paneData);
		bChart.onclick = function () {
			bChart.classList.add('active'); bData.classList.remove('active');
			paneChart.style.display = ''; paneData.style.display = 'none';
		};
		bData.onclick = function () {
			bData.classList.add('active'); bChart.classList.remove('active');
			paneData.style.display = ''; paneChart.style.display = 'none';
			buildDataPane(tile, paneData);
		};
		buildChartPane(tile, paneChart);
		openModal('Configure chart', body, true);
	}

	function selectField(label, value, options, onChange) {
		var f = el('label', 'dash_fld');
		f.appendChild(el('span', null, label));
		var sel = el('select');
		options.forEach(function (o) {
			var opt = el('option');
			opt.value = (typeof o === 'object') ? o.key : o;
			opt.textContent = (typeof o === 'object') ? o.label : o;
			if (opt.value === value) { opt.selected = true; }
			sel.appendChild(opt);
		});
		sel.onchange = function () { onChange(sel.value); };
		f.appendChild(sel);
		return f;
	}

	function buildChartPane(tile, pane) {
		pane.innerHTML = '';
		var cols = dsCols(tile.dsKey);
		var withNone = ['None'].concat(cols);
		var yOpts = ['None'].concat(cols).concat(['Count']);
		var cfg = tile.cfg;

		var titleF = el('label', 'dash_fld');
		titleF.appendChild(el('span', null, 'Title'));
		var titleIn = el('input');
		titleIn.type = 'text'; titleIn.value = tile.title;
		titleIn.oninput = function () { setTileTitle(tile, titleIn.value, true); persist(); };
		titleF.appendChild(titleIn);
		pane.appendChild(titleF);

		var capF = el('label', 'dash_fld');
		capF.appendChild(el('span', null, 'Caption'));
		var capIn = el('input');
		capIn.type = 'text'; capIn.value = tile.caption || '';
		capIn.placeholder = 'Shown under the chart';
		capIn.oninput = function () {
			tile.caption = capIn.value.trim();
			var cap = byId('dash_caption_' + tile.id);
			if (cap) { cap.textContent = tile.caption; }
			persist();
		};
		capF.appendChild(capIn);
		pane.appendChild(capF);

		var grid = el('div', 'dash_cfg_grid');
		grid.appendChild(selectField('Chart type', cfg.type, CHART_TYPES, function (v) {
			cfg.type = v;
			if (v === 'histogram') { cfg.y = 'None'; }
			if (v === 'bar' && (cfg.y === 'None')) { cfg.y = 'Count'; }
			applyTile(tile); buildChartPane(tile, pane);
		}));
		grid.appendChild(selectField('X axis', cfg.x, withNone, function (v) { cfg.x = v; applyTile(tile); }));
		grid.appendChild(selectField('Y axis', cfg.y, yOpts, function (v) { cfg.y = v; applyTile(tile); }));
		grid.appendChild(selectField('Color by', cfg.color, withNone, function (v) { cfg.color = v; applyTile(tile); }));
		grid.appendChild(selectField('Size by', cfg.size, withNone, function (v) { cfg.size = v; applyTile(tile); }));
		grid.appendChild(selectField('Facet columns', cfg.facetCol, withNone, function (v) { cfg.facetCol = v; applyTile(tile); }));
		grid.appendChild(selectField('Facet rows', cfg.facetRow, withNone, function (v) { cfg.facetRow = v; applyTile(tile); }));
		grid.appendChild(selectField('Palette', cfg.palette, PALETTES, function (v) { cfg.palette = v; applyTile(tile); }));
		pane.appendChild(grid);

		var statsF = el('label', 'dash_check');
		var cb = el('input'); cb.type = 'checkbox'; cb.checked = !!cfg.stats;
		cb.onchange = function () { cfg.stats = cb.checked; applyTile(tile); };
		statsF.appendChild(cb);
		statsF.appendChild(el('span', null, 'Overlay stats (r²/slope, group means & tests)'));
		pane.appendChild(statsF);

		pane.appendChild(el('p', 'dash_hint',
			'The chart type follows your column choices — pick two numeric columns for a scatter, a category + number for box/violin, one column for a histogram.'));
	}

	function buildDataPane(tile, pane) {
		pane.innerHTML = '';
		var d = datasetOf(tile);

		// dataset picker
		if (DASH.dsOrder.length > 1) {
			pane.appendChild(selectField('This chart uses', tile.dsKey,
				DASH.dsOrder.map(function (k) { return { key: k, label: DASH.datasets[k].name }; }),
				function (v) { rebindTile(tile, v); buildDataPane(tile, pane); }));
		}

		var info = el('p', 'dash_hint',
			'<b>' + escapeHtml(d.name) + '</b> — ' + (d.rows ? d.rows.length.toLocaleString() : 0) +
			' rows × ' + (d.columns || []).length + ' columns' +
			(d.source && d.source.type === 'url' ? '<br><span class="dash_src">from ' + escapeHtml(d.source.url) + '</span>' : ''));
		pane.appendChild(info);
		pane.appendChild(buildPreviewTable(d.rows, d.columns));

		pane.appendChild(el('div', 'dash_sep'));
		pane.appendChild(el('p', 'dash_hint', '<b>Replace the data behind this chart</b> — paste, upload, or fetch a new table. Column choices are re-derived for the new columns.'));
		pane.appendChild(buildLoaderControls(function (rows, name, source) {
			var key = addDataset(name, rows, source);
			rebindTile(tile, key);
			buildDataPane(tile, pane);
			ccToast('Replaced data for "' + tile.title + '"');
		}));
	}

	// Point a tile at a different dataset and re-derive valid axes.
	function rebindTile(tile, dsKey) {
		tile.dsKey = dsKey;
		tile._rows = null; // force a fresh private copy for the new dataset
		var cols = dsCols(dsKey);
		var valid = function (v) { return v === 'None' || v === 'Count' || v === 'Sum' || cols.indexOf(v) >= 0; };
		if (!valid(tile.cfg.x) || !valid(tile.cfg.y)) {
			var keepType = tile.cfg.type;
			tile.cfg = defaultCfg(dsKey);
			tile.cfg.type = keepType;
		} else {
			['color', 'size', 'facetCol', 'facetRow'].forEach(function (k) {
				if (!valid(tile.cfg[k])) { tile.cfg[k] = 'None'; }
			});
		}
		applyTile(tile);
	}

	function buildPreviewTable(rows, allCols) {
		var wrap = el('div', 'dash_preview');
		if (!rows || !rows.length) { wrap.textContent = 'No rows.'; return wrap; }
		allCols = allCols || rows.columns || Object.keys(rows[0]);
		var cols = allCols.slice(0, 10);
		var html = '<table><thead><tr>';
		cols.forEach(function (c) { html += '<th>' + escapeHtml(c) + '</th>'; });
		html += '</tr></thead><tbody>';
		for (var i = 0; i < Math.min(6, rows.length); i++) {
			html += '<tr>';
			cols.forEach(function (c) {
				var v = rows[i][c];
				html += '<td>' + escapeHtml(v == null ? '' : v) + '</td>';
			});
			html += '</tr>';
		}
		html += '</tbody></table>';
		if (allCols.length > 10) { html += '<div class="dash_hint">…and ' + (allCols.length - 10) + ' more columns</div>'; }
		wrap.innerHTML = html;
		return wrap;
	}

	// ---- Empty state ---------------------------------------------------------
	function refreshEmpty() {
		var empty = byId('dash_empty');
		if (!empty) { return; }
		empty.style.display = DASH.tiles.length ? 'none' : 'flex';
	}

	// ---- Persistence ---------------------------------------------------------
	// JSON.stringify drops an array's extra .columns property, so column lists
	// are stored separately and reattached on load.
	function serializable(includeAllRows) {
		return {
			v: 1, title: DASH.title, cols: DASH.cols, width: DASH.width || 0,
			seq: DASH.seq, dsSeq: DASH.dsSeq,
			datasets: DASH.dsOrder.map(function (k) {
				var d = DASH.datasets[k];
				var cols = d.columns || [];
				// url datasets refetch on load; others are stored only when small
				// enough for localStorage (Export always includes every row).
				var keepRows = includeAllRows ||
					(!(d.source && d.source.type === 'url') && d.rows && d.rows.length <= 50000);
				return {
					key: k, name: d.name, source: d.source, columns: cols,
					rows: keepRows && d.rows ? d.rows.map(function (r) { return pickRow(r, cols); }) : null
				};
			}),
			tiles: DASH.tiles.map(function (t) {
				return { id: t.id, title: t.title, titleManual: t.titleManual, caption: t.caption || '',
					dsKey: t.dsKey, cfg: t.cfg, overrides: t.overrides || null,
					gx: t.gx, gy: t.gy, gw: t.gw, gh: t.gh };
			})
		};
	}

	// Debounced: drag/resize/config fire persist() rapidly, and serializing row
	// data on every mouse-up would stutter. Coalesce to one save when idle.
	var _persistTimer = null;
	function persist() {
		if (!DASH.active) { return; }
		clearTimeout(_persistTimer);
		_persistTimer = setTimeout(persistNow, 500);
	}
	function persistNow() {
		try {
			var payload = serializable(false);
			var str = JSON.stringify(payload);
			if (str.length > 2500000) {
				// too large for localStorage: keep only url-refetchable datasets' rows
				payload.datasets.forEach(function (d) {
					if (!(d.source && d.source.type === 'url')) { d.rows = null; }
				});
				str = JSON.stringify(payload);
			}
			window.localStorage.setItem(STORE_KEY, str);
		} catch (e) { /* quota exceeded — auto-save skipped, Export still works */ }
	}

	function loadState(p) {
		if (!p || p.v !== 1 || !p.tiles) { return false; }
		// clear any existing tiles/DOM
		DASH.tiles.forEach(function (t) { var n = byId('dash_tile_' + t.id); if (n) { n.remove(); } });
		DASH.datasets = {}; DASH.dsOrder = []; DASH.tiles = [];
		DASH.title = p.title || 'My Dashboard';
		DASH.cols = p.cols || 12;
		DASH.width = p.width || 0;
		DASH.seq = p.seq || 0;
		DASH.dsSeq = p.dsSeq || 0;
		(p.datasets || []).forEach(function (d) {
			var cols = (d.columns || []).slice();
			var rows = d.rows || emptyRows(cols);
			if (!rows.columns) { rows.columns = cols; }
			var quality = null;
			if (rows.length) { try { quality = CrossexData.profile(rows); } catch (e) {} }
			DASH.datasets[d.key] = {
				name: d.name, rows: rows, columns: cols, source: d.source || { type: 'paste' },
				_pending: !d.rows && d.source && d.source.type === 'url', quality: quality
			};
			DASH.dsOrder.push(d.key);
		});
		(p.tiles || []).forEach(function (t) {
			DASH.tiles.push({ id: t.id, title: t.title, titleManual: t.titleManual,
				caption: t.caption || '', dsKey: t.dsKey, cfg: t.cfg,
				overrides: t.overrides || null, gx: t.gx, gy: t.gy, gw: t.gw, gh: t.gh });
		});
		// reflect grid columns and width in the toolbar controls
		var colsSel = byId('dash_cols');
		if (colsSel) { colsSel.value = String(DASH.cols); }
		var widthSel = byId('dash_width');
		if (widthSel) { widthSel.value = String(DASH.width || 0); }
		applyDashWidth();
		var titleEl = byId('dash_dtitle');
		if (titleEl) { titleEl.textContent = DASH.title; }
		renderDsBar();
		DASH.tiles.forEach(function (t) { buildTileDom(t); layoutTile(t); });
		updateCanvasHeight();
		DASH.tiles.forEach(renderTile);
		// refetch url-backed datasets whose rows weren't stored
		DASH.dsOrder.forEach(function (k) {
			var d = DASH.datasets[k];
			if (d._pending && d.source && d.source.url) {
				ccFetchData(d.source.url).then(function (rows) {
					try { d.quality = CrossexData.profile(rows); } catch (e) { d.quality = null; }
					convertDates(rows);
					var cols = (rows.columns || (rows[0] ? Object.keys(rows[0]) : [])).slice();
					if (!rows.columns) { rows.columns = cols; }
					d.rows = rows; d.columns = cols; d._pending = false;
					renderDsBar();
					DASH.tiles.forEach(function (t) {
						if (t.dsKey === k) { t._rows = null; renderTile(t); }
					});
				}).catch(function () { /* source gone — tile shows a message */ });
			}
		});
		refreshEmpty();
		return DASH.tiles.length > 0 || DASH.dsOrder.length > 0;
	}

	function restore() {
		var str;
		try { str = window.localStorage.getItem(STORE_KEY); } catch (e) { return false; }
		if (!str) { return false; }
		var p;
		try { p = JSON.parse(str); } catch (e) { return false; }
		return loadState(p);
	}

	// ---- Export / import -----------------------------------------------------
	function exportJson() {
		var str = JSON.stringify(serializable(true), null, 0);
		var blob = new Blob([str], { type: 'application/json' });
		var a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = (DASH.title || 'dashboard').replace(/[^\w.-]+/g, '_') + '.dashboard.json';
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
		ccToast('Dashboard exported');
	}
	function importJson(file) {
		var reader = new FileReader();
		reader.onload = function (e) {
			var p;
			try { p = JSON.parse(e.target.result); } catch (err) { ccToast('Not a valid dashboard file'); return; }
			if (loadState(p)) { persist(); ccToast('Dashboard imported'); }
			else { ccToast('Nothing to import'); }
		};
		reader.readAsText(file);
	}

	// ---- Publish: the whole dashboard in a link ------------------------------
	// The layout, every tile's config/overrides, and — when they compress small
	// enough — the datasets themselves ride the URL fragment. URL-sourced
	// datasets always travel as their URL and are refetched on open, so those
	// links stay tiny regardless of data size. Nothing is sent to any server.
	var DASH_HASH_MAX = 60000;
	function shareLink() {
		if (!DASH.tiles.length && !DASH.dsOrder.length) { ccToast('Build a dashboard first, then share'); return; }
		function encode(p) { return '#dash=' + itgz.compressToEncodedURIComponent(JSON.stringify(p)); }
		var note = '';
		var payload = serializable(true);
		var hash = encode(payload);
		if (hash.length > DASH_HASH_MAX) {
			// keep inline rows only for datasets that can't be refetched
			payload.datasets.forEach(function (d) {
				if (d.source && d.source.type === 'url') { d.rows = null; }
			});
			hash = encode(payload);
		}
		if (hash.length > DASH_HASH_MAX) {
			payload.datasets.forEach(function (d) { d.rows = null; });
			note = ' (layout only — the data is too large for a link; load it from a URL or use Export)';
			hash = encode(payload);
		}
		try { history.replaceState(null, '', hash); } catch (e) {}
		var url = location.href.split('#')[0] + hash;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url).then(function () {
				ccToast('Dashboard link copied' + note);
			}, function () {
				ccToast('Link is in the address bar — copy it from there' + note);
			});
		} else {
			ccToast('Link is in the address bar — copy it from there' + note);
		}
	}

	function restoreFromHash() {
		var m = location.hash.match(/^#dash=(.+)$/);
		if (!m) { return false; }
		var p = null;
		try { p = JSON.parse(itgz.decompressFromEncodedURIComponent(m[1])); } catch (e) {}
		if (!p || p.v !== 1 || !p.tiles) { return false; }
		if (!DASH.built) { buildShell(); DASH.built = true; }
		DASH.seeded = true;
		DASH.active = true;
		showSingleUi(false);
		byId('cc_dashboard').style.display = 'block';
		DASH._deferRender = true;
		loadState(p);
		DASH._deferRender = false;
		refreshEmpty();
		requestAnimationFrame(function () { relayoutAll(); renderAllCharts(); });
		persist();
		ccToast('Opened shared dashboard');
		return true;
	}

	function applyDashWidth() {
		var c = canvasEl();
		var bar = byId('dash_ds_bar');
		if (!c) { return; }
		c.style.maxWidth = DASH.width ? DASH.width + 'px' : '';
		c.style.marginLeft = DASH.width ? 'auto' : '';
		c.style.marginRight = DASH.width ? 'auto' : '';
		if (bar) {
			bar.style.maxWidth = DASH.width ? DASH.width + 'px' : '';
			bar.style.marginLeft = DASH.width ? 'auto' : '';
			bar.style.marginRight = DASH.width ? 'auto' : '';
		}
	}

	// ---- Toolbar / shell -----------------------------------------------------
	function buildShell() {
		var root = byId('cc_dashboard');
		root.innerHTML =
			'<div class="dash_toolbar">' +
				'<div class="dash_brand">📊 <span class="dash_dtitle" id="dash_dtitle" contenteditable="true" spellcheck="false">My Dashboard</span></div>' +
				'<div class="dash_tb_actions">' +
					'<button class="cc_button active" id="dash_add_chart">+ Add chart</button>' +
					'<button class="cc_button" id="dash_add_data">+ Add data</button>' +
					'<button class="cc_button" id="dash_tidy">Tidy</button>' +
					'<label class="dash_tb_lbl">Grid ' +
						'<select id="dash_cols"><option>6</option><option>8</option><option selected>12</option><option>16</option></select>' +
					'</label>' +
					'<label class="dash_tb_lbl">Width ' +
						'<select id="dash_width">' +
							'<option value="0" selected>Full</option>' +
							'<option value="1500">1500px</option>' +
							'<option value="1200">1200px</option>' +
							'<option value="1000">1000px</option>' +
							'<option value="800">800px</option>' +
						'</select>' +
					'</label>' +
					'<button class="cc_button" id="dash_share">Share link</button>' +
					'<button class="cc_button" id="dash_export">Export</button>' +
					'<button class="cc_button" id="dash_import">Import</button>' +
					'<input type="file" id="dash_import_file" accept=".json" style="display:none">' +
					'<button class="cc_button" id="dash_exit">Exit ✕</button>' +
				'</div>' +
			'</div>' +
			'<div class="dash_ds_bar" id="dash_ds_bar" style="display:none"></div>' +
			'<div class="dash_canvas" id="dash_canvas"></div>' +
			'<div class="dash_empty" id="dash_empty">' +
				'<div class="dash_empty_inner">' +
					'<div class="dash_empty_icon">📈</div>' +
					'<h2>Build a dashboard</h2>' +
					'<p>Add one or more datasets, then drop in charts. Drag a chart’s header to move it and its corner to resize it.</p>' +
					'<div class="dash_empty_cta">' +
						'<button class="cc_button active" id="dash_empty_data">+ Add data</button>' +
						'<button class="cc_button" id="dash_empty_chart">+ Add chart</button>' +
					'</div>' +
				'</div>' +
			'</div>';

		byId('dash_add_chart').onclick = function () { addTile(); };
		byId('dash_add_data').onclick = openAddData;
		byId('dash_empty_data').onclick = openAddData;
		byId('dash_empty_chart').onclick = function () { addTile(); };
		byId('dash_tidy').onclick = tidy;
		byId('dash_share').onclick = shareLink;
		byId('dash_width').onchange = function () {
			DASH.width = parseInt(this.value, 10) || 0;
			applyDashWidth();
			relayoutAll();
			renderAllCharts();
			persist();
		};
		byId('dash_export').onclick = exportJson;
		byId('dash_import').onclick = function () { byId('dash_import_file').click(); };
		byId('dash_import_file').addEventListener('change', function (e) {
			if (e.target.files.length) { importJson(e.target.files[0]); e.target.value = ''; }
		});
		byId('dash_exit').onclick = exitDashboard;
		byId('dash_cols').onchange = function () {
			DASH.cols = parseInt(this.value, 10) || 12;
			DASH.tiles.forEach(function (t) {
				if (t.gx + t.gw > DASH.cols) { t.gx = Math.max(0, DASH.cols - t.gw); }
				if (t.gw > DASH.cols) { t.gw = DASH.cols; t.gx = 0; }
			});
			relayoutAll();
			renderAllCharts();
			persist();
		};
		var titleEl = byId('dash_dtitle');
		titleEl.addEventListener('input', function () { DASH.title = titleEl.textContent.trim() || 'My Dashboard'; });
		titleEl.addEventListener('blur', persist);
	}

	// Show/hide the single-chart UI vs. the dashboard.
	function showSingleUi(show) {
		['cc_topnav', 'cc_hero', 'cc_gallery', 'cc_start_section', 'About'].forEach(function (id) {
			var n = byId(id); if (n) { n.style.display = show ? '' : 'none'; }
		});
		var form = document.querySelector('#crossex form');
		if (form) { form.style.display = show ? '' : 'none'; }
		var h1 = document.querySelector('#crossex .cc_app_title');
		if (h1) { h1.style.display = show ? '' : 'none'; }
	}

	function enterDashboard() {
		if (!DASH.built) { buildShell(); DASH.built = true; }
		DASH.active = true;
		showSingleUi(false);
		byId('cc_dashboard').style.display = 'block';
		// first entry this session: restore a saved dashboard, else seed from the
		// data already loaded in the single-chart view
		if (!DASH.seeded) {
			DASH.seeded = true;
			// build tiles/DOM without rendering yet; the rAF below renders once
			// each, after layout, so views aren't built then immediately rebuilt
			DASH._deferRender = true;
			var restored = restore();
			if (!restored && typeof _lastStruct !== 'undefined' && _lastStruct && _lastStruct.length) {
				var cleanCols = (typeof _lastColumns !== 'undefined' && _lastColumns) ? _lastColumns : null;
				var key = addDataset('Dataset 1', _lastStruct, { type: 'inherited' }, cleanCols);
				addTile(key);
			}
			DASH._deferRender = false;
		}
		applyDashWidth();
		refreshEmpty();
		// canvas width is known now that it is visible
		requestAnimationFrame(function () { relayoutAll(); renderAllCharts(); });
		// nothing to work with yet: open the data loader instead of making the
		// user hunt for the button
		if (!DASH.dsOrder.length && !DASH.tiles.length) {
			setTimeout(openAddData, 50);
		}
	}

	function exitDashboard() {
		DASH.active = false;
		byId('cc_dashboard').style.display = 'none';
		closeModal();
		showSingleUi(true);
	}

	// Re-fit every chart after the window (and thus the grid unit width) changes.
	var _rzTimer = null;
	window.addEventListener('resize', function () {
		if (!DASH.active) { return; }
		clearTimeout(_rzTimer);
		_rzTimer = setTimeout(function () { relayoutAll(); renderAllCharts(); }, 350);
	});

	// ---- Public entry --------------------------------------------------------
	function wireEntry() {
		var btn = byId('build_dashboard');
		if (btn) { btn.onclick = enterDashboard; }
		// a #dash= link opens straight into the shared dashboard
		setTimeout(restoreFromHash, 0);
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', wireEntry);
	} else {
		wireEntry();
	}
	window.crossexDash = { enter: enterDashboard, exit: exitDashboard, share: shareLink };
})();
