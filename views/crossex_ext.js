
function toggle(id) {
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "block";
		document.getElementById("graph_button").innerHTML = "View Graph";
	} else {
		x.style.display = "none";
		document.getElementById("graph_button").innerHTML = "View Data";
	}
}

function optimize_axis(headers, struct) {
	var min_cat = 8;
	var max_cat = 200;
	var my_low_cat = -1;
	var my_high_cat = max_cat;
	var alt_cat = 8;
	var min_num = 8;
	var max_num = 8;
	var min_cat_name = "None";
	var alt_cat_name = "None";
	var max_cat_name = "None";
	var min_num_name = "None";
	var alt_num_name = "None";
	var alt2_num_name = "None";
	var max_num_name = "None";
	var color_by_name = "None";
	var x_axis_name = "None";
	var y_axis_name = "None";
	var split_to_panels1_by_name = "None";
	var split_to_panels2_by_name = "None";
	// Distinct counting stops at 1001 (every threshold below compares against
	// at most 200, so ID-like columns exit after ~1k rows) and scans at most
	// 50k rows — this only picks default axes, where a prefix estimate of
	// cardinality makes the same choices as an exact count.
	var OPTIMIZE_DISTINCT_CAP = 1001;
	var scanRows = Math.min(struct.length, 50000);
	headers.forEach(function(element) {
		var distinct = new Set();
		for (var r = 0; r < scanRows && distinct.size < OPTIMIZE_DISTINCT_CAP; ++r) {
			distinct.add(struct[r][element]);
		}
		var ln = distinct.size;
		if (typeof(struct[0][element]) === 'string') {
			if (ln < max_cat && ln > my_low_cat ) {
				my_low_cat = ln;
				max_cat_name = element;

			}
			if (ln < max_cat && ln < my_high_cat ) {
				my_low_cat = ln;
				min_cat_name = element;
			}
			if (ln >= 1 && ln <= min_cat && alt_cat_name == "None" && min_cat_name != "None") {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 && ln <= min_cat) {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 && ln <= alt_cat) {
				alt_cat = ln;
				alt_cat_name = element;
			}
		} else {
			if (ln < min_num) {
				min_num = ln;
				min_num_name = element;
			}
			if (ln >= max_num) {
				max_num = ln;
				alt2_num_name = alt_num_name;
				alt_num_name = max_num_name;
				max_num_name = element;
			}
		}
	});
	color_by_name = alt2_num_name;
	split_to_panels2_by_name = alt_cat_name;
	split_to_panels1_by_name = max_cat_name;
	y_axis_name = max_num_name;
	x_axis_name = max_cat_name;
	if (alt2_num_name != "None") {
		color_by_name = alt2_num_name;
		split_to_panels2_by_name = alt_cat_name;
		split_to_panels1_by_name = max_cat_name;
		y_axis_name = max_num_name;
	} else if (alt_cat_name != "None") {
		color_by_name = max_cat_name;
		split_to_panels1_by_name = min_cat_name;
		y_axis_name = max_num_name;
	} else if (min_cat_name != "None") {
		color_by_name = max_cat_name;
	}
	return [x_axis_name, y_axis_name, split_to_panels1_by_name, split_to_panels2_by_name, color_by_name];
}
// Accepts CSV, TSV, or a JSON array of row objects; returns rows with a
// .columns property (same shape d3.csvParse produces)
function parseInputData(string) {
	return CrossexData.parseInput(string, d3);
}

// Large delimited text parses in ~8MB slices with a frame between each, so
// the tab stays responsive and progress can be shown. RFC-4180 quoted fields
// may contain newlines, so anything containing a quote falls back to one
// monolithic parse; JSON always parses in one shot.
var CHUNK_PARSE_BYTES = 8 * 1024 * 1024;
function parseInputDataAsync(string, onProgress, callback, onError) {
	var trimmed = string.trim();
	if (trimmed[0] == '[' || trimmed[0] == '{' ||
		string.length < CHUNK_PARSE_BYTES || string.indexOf('"') !== -1) {
		try { callback(parseInputData(string)); }
		catch (error) { if (onError) { onError(error); } }
		return;
	}
	var parseFn = string.search(/\t/) > 0 ? d3.tsvParse : d3.csvParse;
	var headerEnd = string.indexOf('\n');
	var header = string.slice(0, headerEnd);
	var rows = null;
	var pos = headerEnd + 1;
	var totalLen = string.length;
	function parseChunk() {
		try {
			var end = Math.min(pos + CHUNK_PARSE_BYTES, totalLen);
			if (end < totalLen) {
				end = string.indexOf('\n', end);
				if (end === -1) { end = totalLen; }
			}
			var part = parseFn(header + '\n' + string.slice(pos, end), d3.autoType);
			if (rows === null) {
				rows = part; // keeps .columns from the first chunk
			} else {
				for (var i = 0; i < part.length; i++) { rows.push(part[i]); }
			}
			pos = end + 1;
			if (pos < totalLen) {
				if (onProgress) { onProgress(Math.round(100 * pos / totalLen)); }
				requestAnimationFrame(parseChunk);
			} else {
				callback(CrossexData.validateRows(rows));
			}
		} catch (error) {
			if (onError) { onError(error); }
		}
	}
	parseChunk();
}

// Files above this size skip the textarea (a preview is shown instead):
// a 50MB string in a DOM textarea costs seconds of layout time and doubles
// the memory held. Editing the textarea discards the loaded file.
var LARGE_FILE_BYTES = 4 * 1024 * 1024;
var MAX_FILE_BYTES = 512 * 1024 * 1024;
var _loadedFile = null;

function loadFileIntoInput(file) {
	if (file.size > MAX_FILE_BYTES) {
		showDataNotice('That file is larger than the 512 MB safety limit.', true);
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e) {
		var input = document.getElementById("myccinput");
		var text = e.target.result;
		if (file.size > LARGE_FILE_BYTES) {
			_loadedFile = { name: file.name, text: text };
			var preview = text.slice(0, 4000).split('\n').slice(0, 25).join('\n');
			input.value = preview + '\n…\n[Large file "' + file.name + '" (' +
				(file.size / 1048576).toFixed(1) + ' MB) loaded — preview only, the full file will be graphed. Editing this box discards it.]';
		} else {
			_loadedFile = null;
			input.value = text;
		}
		// normalize toggle state so the graph click always hides the input
		input.style.display = "block";
		document.getElementById("graph_button").innerHTML = "Graph Data";
		document.getElementById("graph_button").click();
	};
	reader.readAsText(file);
}

document.getElementById("myccinput").addEventListener('input', function() {
	_loadedFile = null;
});

document.getElementById("load_file").onclick = function fun() {
	document.getElementById("ccfileinput").click();
};

document.getElementById("ccfileinput").addEventListener('change', function(e) {
	if (e.target.files.length) {
		loadFileIntoInput(e.target.files[0]);
		e.target.value = "";
	}
});

var _dropTarget = document.getElementById("myccinput");
['dragenter', 'dragover'].forEach(function(evt) {
	_dropTarget.addEventListener(evt, function(e) {
		e.preventDefault();
		_dropTarget.classList.add('cc_dragover');
	});
});
_dropTarget.addEventListener('dragleave', function(e) {
	_dropTarget.classList.remove('cc_dragover');
});
_dropTarget.addEventListener('drop', function(e) {
	e.preventDefault();
	_dropTarget.classList.remove('cc_dragover');
	if (e.dataTransfer.files.length) {
		loadFileIntoInput(e.dataTransfer.files[0]);
	}
});

document.getElementById("default_data").onclick = function fun() {
	document.getElementById("myccinput").value = itg_decomp("<%=demo%>");
};

// ---- Load data from a URL (CSV / TSV / JSON) --------------------------------
// Fetches a remote table and resolves to parsed rows (with a .columns array).
// The delimiter/format is detected from the response body by parseInputData(),
// so the URL's file extension doesn't matter. Cross-origin URLs must return
// permissive CORS headers (raw file hosts and most open-data portals do); when
// they don't the browser blocks the read and the caller shows a clear message.
function ccFetchData(url) {
	var parsedUrl;
	try { parsedUrl = new URL(url, window.location.href); }
	catch (e) { return Promise.reject(new Error('enter a valid URL')); }
	if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
		return Promise.reject(new Error('only http:// and https:// URLs are supported'));
	}
	var maxBytes = 256 * 1024 * 1024;
	var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
	var timeout = controller ? setTimeout(function() { controller.abort(); }, 30000) : null;
	return fetch(parsedUrl.href, { redirect: 'follow', signal: controller ? controller.signal : undefined }).then(function(res) {
		if (!res.ok) { throw new Error('HTTP ' + res.status + ' ' + res.statusText); }
		var declared = Number(res.headers.get('content-length'));
		if (declared && declared > maxBytes) { throw new Error('response exceeds the 256 MB safety limit'); }
		return res.text();
	}).then(function(text) {
		if (text.length > maxBytes) { throw new Error('response exceeds the 256 MB safety limit'); }
		var struct = parseInputData(text);
		if (!struct || !struct.length) { throw new Error('no rows parsed from the response'); }
		return struct;
	}).catch(function(error) {
		if (error && error.name === 'AbortError') { throw new Error('request timed out after 30 seconds'); }
		throw error;
	}).finally(function() {
		if (timeout) { clearTimeout(timeout); }
	});
}

// Load URL button on the main input: reveals an inline URL field, then fetches
// and graphs it through the normal single-chart path.
(function wireLoadUrl() {
	var btn = document.getElementById('load_url');
	var bar = document.getElementById('cc_url_bar');
	var field = document.getElementById('cc_url_field');
	var go = document.getElementById('cc_url_go');
	var cancel = document.getElementById('cc_url_cancel');
	if (!btn || !bar) { return; }
	btn.onclick = function() {
		var show = bar.style.display === 'none';
		bar.style.display = show ? 'flex' : 'none';
		btn.setAttribute('aria-expanded', show ? 'true' : 'false');
		if (show) { field.focus(); }
	};
	cancel.onclick = function() { bar.style.display = 'none'; btn.setAttribute('aria-expanded', 'false'); btn.focus(); };
	function run() {
		var url = field.value.trim();
		if (!url) { return; }
		var label = go.innerHTML;
		go.innerHTML = 'Fetching…';
		go.disabled = true;
		bar.setAttribute('aria-busy', 'true');
		ccFetchData(url).then(function(struct) {
			go.innerHTML = label;
			go.disabled = false;
			bar.removeAttribute('aria-busy');
			bar.style.display = 'none';
			btn.setAttribute('aria-expanded', 'false');
			_loadedFile = null;
			_lastRawText = null; // remote data isn't embedded in share links
			var input = document.getElementById('myccinput');
			input.value = '[Loaded from URL: ' + url + ' — ' + struct.length.toLocaleString() + ' rows. Editing this box discards it.]';
			input.style.display = 'block';
			graphStruct(struct);
			ccToast('Loaded ' + struct.length.toLocaleString() + ' rows from URL');
		}).catch(function(err) {
			go.innerHTML = label;
			go.disabled = false;
			bar.removeAttribute('aria-busy');
			showDataNotice('Could not load URL: ' + err.message, true);
		});
	}
	go.onclick = run;
	field.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') { e.preventDefault(); run(); }
	});
})();

// Synthesizes a 5,000,000-row mixed-type dataset in the browser (no download,
// no CSV parse) and graphs it directly — a stress-test/demo for the
// large-data path. Generation is chunked so the UI stays responsive.
document.getElementById("large_demo").onclick = function fun() {
	var btn = document.getElementById("large_demo");
	if (btn.getAttribute('data-busy')) { return; }
	btn.setAttribute('data-busy', '1');
	var N = 5000000;
	var CHUNK = 250000;
	var c3 = ['low', 'medium', 'high'];
	var c8 = [], c40 = [], c500 = [];
	for (var i = 0; i < 500; i++) {
		if (i < 8) { c8.push('grp' + i); }
		if (i < 40) { c40.push('panel' + i); }
		c500.push('clinic' + i);
	}
	// mulberry32 — deterministic so repeat runs are comparable
	var seed = 1234567;
	function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
	function normal() { var u = 0, v = 0; while (!u) { u = rnd(); } while (!v) { v = rnd(); } return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
	var struct = [];
	struct.columns = ['uid', 'group', 'cohort', 'panel', 'clinic', 'expr_a', 'expr_b', 'logval', 'score', 'na_val'];
	function gen() {
		var stop = Math.min(struct.length + CHUNK, N);
		for (var r = struct.length; r < stop; r++) {
			var base = normal();
			struct.push({
				uid: 1000000 + r,
				group: c3[(rnd() * 3) | 0],
				cohort: c8[(rnd() * 8) | 0],
				panel: c40[(rnd() * 40) | 0],
				clinic: c500[(rnd() * 500) | 0],
				expr_a: +(base * 2 + 10).toFixed(3),
				expr_b: +(base * 1.5 + normal() + 8).toFixed(3),
				logval: +Math.exp(normal()).toFixed(4),
				score: +(rnd() * 100).toFixed(1),
				na_val: rnd() < 0.08 ? null : +(normal() * 5 + 50).toFixed(2)
			});
		}
		if (struct.length < N) {
			btn.innerHTML = 'Generating… ' + Math.round(100 * struct.length / N) + '%';
			requestAnimationFrame(gen);
		} else {
			btn.innerHTML = 'Load 5M Demo';
			btn.removeAttribute('data-busy');
			_loadedFile = { name: 'demo_5m', text: null, struct: struct };
			var input = document.getElementById('myccinput');
			input.value = '[Generated demo dataset: 5,000,000 rows × ' + struct.columns.length + ' columns. Editing this box discards it.]';
			input.style.display = 'block';
			document.getElementById('graph_button').innerHTML = 'Graph Data';
			document.getElementById('graph_button').click();
		}
	}
	btn.innerHTML = 'Generating… 0%';
	requestAnimationFrame(gen);
};

document.getElementById("clear_cookies").onclick = function fun() {
	clearAllCookies();
	// Redraw every live widget with pristine defaults. Seeding an empty
	// signal state keeps the reset from re-triggering the first-visit
	// overview overlay — the user asked for the default chart, so show it.
	Object.keys(_crossexOpts).forEach(function(el) {
		if (!_fullData[el]) { return; }
		saveSignalState('vegaSignals_' + el, {});
		var opts = _crossexOpts[el];
		crossexloader(el, true);
		delay(30).then(function() { crossex(el, _fullData[el], opts.options, opts.widthid); });
	});
	ccToast('Saved settings cleared — chart reset to defaults');
};

// ---- Small toast for button feedback ----------------------------------------
function ccToast(text) {
	var t = document.getElementById('cc_toast');
	if (!t) { return; }
	t.textContent = text;
	t.className = 'show';
	clearTimeout(t._t);
	t._t = setTimeout(function() { t.className = ''; }, 2600);
}

// Persistent data status and quality report. Errors remain visible until the
// user dismisses them; transient toasts are reserved for completed actions.
var _lastDataNotice = '';
var _sampleNotice = '';
function showDataNotice(text, isError) {
	var notice = document.getElementById('cc_data_notice');
	var message = document.getElementById('cc_data_notice_text');
	if (!notice || !message) { return; }
	_lastDataNotice = text;
	if (isError) { _sampleNotice = ''; }
	message.textContent = _sampleNotice ? text + ' ' + _sampleNotice : text;
	notice.classList.toggle('is-error', !!isError);
	notice.setAttribute('role', isError ? 'alert' : 'status');
	notice.hidden = false;
}

// The render-sample line belongs with the "Loaded N rows" banner above the
// chart, not on a second strip inside the widget. crossex_base calls this
// whenever it decides how many rows to draw.
window.ccSampleNotice = function(text) {
	_sampleNotice = text || '';
	var message = document.getElementById('cc_data_notice_text');
	var notice = document.getElementById('cc_data_notice');
	if (!message || !notice) { return; }
	if (!_lastDataNotice && !_sampleNotice) { return; }
	message.textContent = _sampleNotice ? (_lastDataNotice + ' ' + _sampleNotice).trim() : _lastDataNotice;
	if (_sampleNotice) { notice.hidden = false; }
};

var dataNoticeClose = document.getElementById('cc_data_notice_close');
if (dataNoticeClose) {
	dataNoticeClose.onclick = function() { document.getElementById('cc_data_notice').hidden = true; };
}

var _lastProfile = null;
var qualityPanel = document.getElementById('cc_quality');
var qualityButton = document.getElementById('data_quality');
var qualityClose = document.getElementById('cc_quality_close');
if (qualityButton) {
	qualityButton.onclick = function() {
		if (!_lastProfile || !qualityPanel) { return; }
		qualityPanel.hidden = !qualityPanel.hidden;
		qualityButton.setAttribute('aria-expanded', qualityPanel.hidden ? 'false' : 'true');
		if (!qualityPanel.hidden) { document.getElementById('cc_quality_title').focus && document.getElementById('cc_quality_title').focus(); }
	};
}
if (qualityClose) {
	qualityClose.onclick = function() {
		qualityPanel.hidden = true;
		qualityButton.setAttribute('aria-expanded', 'false');
		qualityButton.focus();
	};
}

function formatQualityNumber(value) {
	if (value === null || value === undefined || value !== value) { return '—'; }
	return Number(value).toLocaleString(undefined, { maximumFractionDigits: 3 });
}

function renderDataQuality(struct, profile) {
	_lastProfile = profile;
	if (!qualityButton || !qualityPanel) { return; }
	qualityButton.disabled = false;
	qualityButton.setAttribute('aria-expanded', qualityPanel.hidden ? 'false' : 'true');
	qualityButton.textContent = profile.issues.length ? 'Data Quality (' + profile.issues.length + ')' : 'Data Quality';
	var summary = document.getElementById('cc_quality_summary');
	summary.textContent = profile.rowCount.toLocaleString() + ' rows × ' + profile.columnCount.toLocaleString() +
		' columns · scanned ' + profile.scannedRows.toLocaleString() + (profile.partial ? ' rows for this report' : ' rows');

	var issues = document.getElementById('cc_quality_issues');
	issues.innerHTML = '';
	if (!profile.issues.length) {
		var ok = document.createElement('span');
		ok.className = 'cc_quality_ok';
		ok.textContent = 'No obvious structural issues found.';
		issues.appendChild(ok);
	} else {
		profile.issues.slice(0, 16).forEach(function(issue) {
			var chip = document.createElement('span');
			chip.className = 'cc_quality_issue ' + issue.severity;
			chip.textContent = issue.message;
			issues.appendChild(chip);
		});
		if (profile.issues.length > 16) {
			var more = document.createElement('span');
			more.className = 'cc_quality_issue';
			more.textContent = '+ ' + (profile.issues.length - 16) + ' more';
			issues.appendChild(more);
		}
	}

	var tbody = document.getElementById('cc_quality_columns');
	tbody.innerHTML = '';
	profile.columns.forEach(function(column, index) {
		var tr = document.createElement('tr');
		[column.name, column.type, Math.round(column.missingRate * 100) + '%',
			(column.distinctCapped ? '≥' : '') + column.distinct.toLocaleString()].forEach(function(value) {
			var td = document.createElement('td');
			td.textContent = value;
			tr.appendChild(td);
		});
		var sampleTd = document.createElement('td');
		sampleTd.className = 'cc_quality_samples';
		sampleTd.textContent = column.samples.join(' · ') || '—';
		if (column.type === 'numeric' && column.min !== null) {
			sampleTd.title = 'Range ' + formatQualityNumber(column.min) + ' to ' + formatQualityNumber(column.max) +
				'; mean ' + formatQualityNumber(column.mean);
		}
		tr.appendChild(sampleTd);
		var typeTd = document.createElement('td');
		var select = document.createElement('select');
		select.setAttribute('data-quality-column', String(index));
		select.setAttribute('aria-label', 'Use ' + column.name + ' as');
		[['automatic', 'Automatic'], ['numeric', 'Number'], ['text', 'Text'], ['date', 'Date']].forEach(function(option) {
			var node = document.createElement('option');
			node.value = option[0]; node.textContent = option[1];
			select.appendChild(node);
		});
		typeTd.appendChild(select);
		tr.appendChild(typeTd);
		tbody.appendChild(tr);
	});
}

var qualityApply = document.getElementById('cc_quality_apply');
if (qualityApply) {
	qualityApply.onclick = function() {
		if (!_lastStruct || !_lastProfile) { return; }
		var changes = [];
		document.querySelectorAll('#cc_quality_columns [data-quality-column]').forEach(function(select) {
			if (select.value === 'automatic') { return; }
			var column = _lastProfile.columns[Number(select.getAttribute('data-quality-column'))];
			if (column) { changes.push({ column: column.name, type: select.value }); }
		});
		var changed = changes.length;
		if (!changed) { showDataNotice('Choose a type override before applying changes.', true); return; }
		qualityApply.disabled = true;
		qualityApply.textContent = 'Copying data…';
		cloneRowsForAnalysis(_lastStruct, function(pct) {
			qualityApply.textContent = 'Copying… ' + pct + '%';
		}, function(output) {
			changes.forEach(function(change) { CrossexData.convertColumn(output, change.column, change.type); });
			var profile = CrossexData.profile(output);
			renderDataQuality(output, profile);
			convertDates(output);
			_lastStruct = output;
			_lastColumns = output.columns.slice();
			_lastRawText = null;
			qualityPanel.hidden = true;
			qualityApply.disabled = false;
			qualityApply.textContent = 'Apply type changes and regraph';
			replaceDataset('smartplot_id', output, null,
				'applied ' + changed + ' column type ' + (changed === 1 ? 'override' : 'overrides'),
				'Transforms_tablinks', true, { type: 'type-override', changes: changes });
			ccToast('Applied ' + changed + ' column type ' + (changed === 1 ? 'change' : 'changes'));
		});
	};
}

// ---- Data-source dropdown menu ----------------------------------------------
// Groups the less-frequent sources (demo, 5M demo, URL, share, clear) under one
// pulldown so the input toolbar stays uncluttered. Each item keeps its own id
// and handler; this only manages open/close.
(function wireSourceMenu() {
	var menu = document.getElementById('cc_source_menu');
	var toggle = document.getElementById('cc_source_toggle');
	if (!menu || !toggle) { return; }
	function close() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
	toggle.onclick = function(e) {
		e.stopPropagation();
		var open = !menu.classList.contains('open');
		menu.classList.toggle('open', open);
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	};
	// each menuitem runs its own click handler first; collapse the menu after
	menu.querySelectorAll('[role="menuitem"]').forEach(function(item) {
		item.addEventListener('click', close);
	});
	document.addEventListener('click', function(e) { if (!menu.contains(e.target)) { close(); } });
	document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { close(); } });
})();

// ---- Shareable state via URL hash --------------------------------------------
// The link carries the full signal state, transform definitions, and (when it
// fits) the raw input data, lz-compressed into the fragment. Opening such a
// link rebuilds the exact view; nothing is sent to any server.
var _lastRawText = null;
var SHARE_TEXT_MAX = 250000;   // raw chars; compressed links stay well under browser limits
var SHARE_HASH_MAX = 60000;

function waitLoaderIdle(cb, tries) {
	tries = tries || 0;
	if (tries > 300) { return; }
	var l = document.getElementById('cc_loadersmartplot_id');
	if (l && l.style.display === 'none') { cb(); }
	else { setTimeout(function() { waitLoaderIdle(cb, tries + 1); }, 150); }
}

document.getElementById('share_link').onclick = function() {
	if (!_lastStruct) { ccToast('Graph some data first, then share'); return; }
	var payload = {
		v: 1,
		s: loadSignalsFromCookie('vegaSignals_smartplot_id') || {},
		t: (typeof _transforms !== 'undefined' && _transforms.smartplot_id) ? _transforms.smartplot_id : []
	};
	var note = '';
	if (_lastRawText) {
		payload.d = _lastRawText;
	} else {
		note = ' (settings only — dataset too large for a link)';
	}
	var hash = '#cc=' + itgz.compressToEncodedURIComponent(JSON.stringify(payload));
	if (hash.length > SHARE_HASH_MAX && payload.d) {
		delete payload.d;
		note = ' (settings only — dataset too large for a link)';
		hash = '#cc=' + itgz.compressToEncodedURIComponent(JSON.stringify(payload));
	}
	try { history.replaceState(null, '', hash); } catch (e) {}
	var url = location.href.split('#')[0] + hash;
	// no prompt() fallback: it blocks the main thread, and the link is already
	// in the address bar thanks to replaceState
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(url).then(function() {
			ccToast('Link copied to clipboard' + note);
		}, function() {
			ccToast('Link is in the address bar — copy it from there' + note);
		});
	} else {
		ccToast('Link is in the address bar — copy it from there' + note);
	}
};

function applySharedTransforms(list, idx) {
	idx = idx || 0;
	if (idx >= list.length) { return; }
	waitLoaderIdle(function() {
		var nameIn = document.getElementById('cc_tr_namesmartplot_id');
		var formulaIn = document.getElementById('cc_tr_formulasmartplot_id');
		var apply = document.getElementById('cc_tr_applysmartplot_id');
		if (!nameIn || !formulaIn || !apply) { return; }
		nameIn.value = list[idx].name;
		formulaIn.value = list[idx].formula;
		apply.click();
		setTimeout(function() { applySharedTransforms(list, idx + 1); }, 500);
	});
}

// Deferred one tick: this section sits above the graph-button handler in the
// bundle, and clicking it during evaluation would hit an unattached handler.
setTimeout(function restoreFromHash() {
	var m = location.hash.match(/^#cc=(.+)$/);
	if (!m) { return; }
	var payload = null;
	try { payload = JSON.parse(itgz.decompressFromEncodedURIComponent(m[1])); } catch (e) {}
	if (!payload || payload.v !== 1) { return; }
	if (payload.s) {
		var store = loadSignalsFromCookie('vegaSignals_smartplot_id') || {};
		Object.assign(store, payload.s);
		saveSignalState('vegaSignals_smartplot_id', store);
	}
	if (payload.d) {
		var input = document.getElementById('myccinput');
		input.value = payload.d;
		input.style.display = 'block';
		var btn = document.getElementById('graph_button');
		btn.innerHTML = 'Graph Data';
		btn.click();
		if (payload.t && payload.t.length) { applySharedTransforms(payload.t); }
		ccToast('Restored shared view');
	}
}, 0);

document.getElementById("graph_button").onclick = function clicks() {
	var btn = document.getElementById("graph_button");
	// rows already parsed (large file re-graph, or generated demo) — reuse them
	if (_loadedFile && _loadedFile.struct) {
		_lastRawText = null;
		graphStruct(_loadedFile.struct);
		return;
	}
	var string = _loadedFile ? _loadedFile.text : document.getElementById("myccinput").value;
	// keep small raw inputs so Share Link can embed the data in the URL
	_lastRawText = (!_loadedFile && string && string.length <= SHARE_TEXT_MAX) ? string : null;
	if (!string || !string.trim()) {
		showDataNotice('Paste data or choose a file, URL, or demo before graphing.', true);
		return;
	}
	var prevLabel = btn.innerHTML;
	btn.innerHTML = "Working…";
	// let the label paint before parsing starts
	setTimeout(function() {
	parseInputDataAsync(string, function(pct) {
			btn.innerHTML = "Parsing… " + pct + "%";
		}, function(struct) {
			if (!struct || !struct.length) {
				btn.innerHTML = prevLabel;
				ccToast('No data rows were found');
				return;
			}
			if (_loadedFile) {
				// keep the parsed rows for re-graphs and let the raw text
				// (hundreds of MB for big files) be garbage collected
				_loadedFile.struct = struct;
				_loadedFile.text = null;
			}
			graphStruct(struct);
		}, function(error) {
			btn.innerHTML = prevLabel;
			showDataNotice('Could not parse data: ' + error.message, true);
		});
	}, 30);
};

// d3.autoType parses ISO-like strings into Date objects, but the chart engine
// is numeric/categorical. Date columns become decimal years (e.g. 2023.4521):
// quantitative, sortable, and readable on a linear axis — enable the Line
// option under Scatter for a time-series view.
function convertDates(struct) {
	if (!struct.length) { return; }
	var headers = struct.columns || Object.keys(struct[0]);
	headers.forEach(function(col) {
		var isDate = false;
		var seen = 0;
		for (var i = 0; i < struct.length && seen < 50; i++) {
			var v = struct[i][col];
			if (v == null || v === '') { continue; }
			seen++;
			if (v instanceof Date) { isDate = true; break; }
		}
		if (!isDate) { return; }
		for (var r = 0; r < struct.length; r++) {
			var d = struct[r][col];
			if (d instanceof Date) {
				if (isNaN(+d)) { struct[r][col] = null; continue; }
				var y0 = +new Date(d.getFullYear(), 0, 1);
				var y1 = +new Date(d.getFullYear() + 1, 0, 1);
				struct[r][col] = Math.round((d.getFullYear() + (+d - y0) / (y1 - y0)) * 10000) / 10000;
			}
		}
	});
}

var _lastStruct = null;
// The clean column list captured before crossex/Vega renders: Vega injects
// derived fields (X_Value, Color_Value, …) onto the shared row objects, so
// Object.keys(row) is unreliable afterwards. The dashboard reads this.
var _lastColumns = null;

window.ccAnalysisDatasetChanged = function(element, data, label) {
	if (element !== 'smartplot_id' || !data) { return; }
	_lastStruct = data;
	_lastColumns = (data.columns || (data[0] ? Object.keys(data[0]) : [])).slice();
	try {
		var profile = CrossexData.profile(data);
		renderDataQuality(data, profile);
		showDataNotice((label || 'Updated dataset') + ': ' + data.length.toLocaleString() + ' rows × ' +
			_lastColumns.length.toLocaleString() + ' columns.', false);
	} catch (e) {}
};

function graphStruct(struct) {
	var profile;
	try { profile = CrossexData.profile(struct); }
	catch (error) { showDataNotice('Could not inspect data: ' + error.message, true); return; }
	renderDataQuality(struct, profile);
	convertDates(struct);
	_lastStruct = struct;
	_lastColumns = (struct.columns || (struct[0] ? Object.keys(struct[0]) : [])).slice();
	// the gallery start page and the marketing hero only belong to the empty state
	var gal = document.getElementById('cc_gallery');
	if (gal) { gal.style.display = 'none'; }
	var startIntro = document.getElementById('cc_start_intro');
	if (startIntro) { startIntro.style.display = 'none'; }
	toggle("myccinput");
	var headers = struct.columns;
	showDataNotice('Loaded ' + struct.length.toLocaleString() + ' rows × ' + headers.length.toLocaleString() +
		' columns' + (profile.issues.length ? '; review ' + profile.issues.length + ' data-quality flag' + (profile.issues.length === 1 ? '' : 's') + '.' : '.'), false);
	var axis = optimize_axis(headers, struct);
	var init_val=headers[1];
	if (headers.length<4) {init_val="None"}
	//console.log(JSON.stringify(struct));
	crossex("smartplot_id", struct, [
		{"editable":true},
		{"exportable":true},
		{"link":true},		
		{"corrmatrix":true},
		{
			"name": "Search_By",
			"value": axis[0],
			"bind": {
				"options": headers
			}
		},
		{
			"name": "X_Axis",
			"value": axis[0],
			"bind": {
				"options": headers
			}
		}, {
			"name": "Y_Axis",
			"value": axis[1],
			"bind": {
				"options": headers
			}
		}, {
			"name": "Facet_Rows_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Facet_Cols_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Color_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Sum_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "SortX_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Size_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Opacity_By",
			"value": 'None',
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_By_Value",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_Additional",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_Out_From",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Stroke_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}
	],"About");
}

// ---- Gallery: start-page example launcher -----------------------------------
// Each card seeds the saved signal state for the demo dataset (penguins) and
// then graphs it, so the example opens exactly as pictured. The widget
// restores signals from localStorage after render, which is why seeding
// works; overlays (3D, overview) and the correlation matrix need a real
// click after the chart is up, handled by galleryAfterRender.
var GALLERY_BASE_SIGNALS = {
	X_Axis: 'flipper_length_mm', Y_Axis: 'body_mass_g', Color_By: 'None',
	Size_By: 'None', Stroke_By: 'None', Opacity_By: 'None', SortX_By: 'None',
	Facet_Rows_By: 'None', Facet_Cols_By: 'None', Sum_By: 'None',
	Filter_Out_From: 'None', Filter_Additional: 'None', Filter_By_Value: 'None',
	Include_Only: ' ', Term: '-',
	Line_: false, Boxplot_: true, Violin_: false, Outliers_: false,
	Histogram_: false, Contours_: false, Regression_: false, Jitter_: false,
	ECDF_: false, QQNorm_: false, Show_Covariance: false,
	Cat_Layout: 'bars', Stack_Grouped_: false, Density_: false,
	Ridgeline_: false, Box_Points_: false, Histogram_Y_: false
};

var GALLERY_PRESETS = {
	scatter:   { signals: { Color_By: 'species' } },
	line:      { signals: { X_Axis: 'year', Color_By: 'species', Line_: true } },
	histogram: { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species' } },
	ecdf:      { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species', ECDF_: true } },
	qqnorm:    { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species', QQNorm_: true } },
	box:       { signals: { X_Axis: 'species', Color_By: 'species' } },
	violin:    { signals: { X_Axis: 'species', Color_By: 'species', Violin_: true, Boxplot_: false } },
	stacked:   { signals: { X_Axis: 'island', Y_Axis: 'Count', Color_By: 'species' } },
	grouped:   { signals: { X_Axis: 'island', Y_Axis: 'Count', Color_By: 'species', Stack_Grouped_: true } },
	pie:       { signals: { X_Axis: 'species', Y_Axis: 'Count', Cat_Layout: 'donut' } },
	treemap:   { signals: { X_Axis: 'island', Y_Axis: 'Count', Color_By: 'species', Cat_Layout: 'treemap' } },
	density:   { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'None', Density_: true } },
	ridgeline: { signals: { X_Axis: 'body_mass_g', Y_Axis: 'species', Color_By: 'species', Violin_: true, Ridgeline_: true, Boxplot_: false } },
	strip:     { signals: { X_Axis: 'species', Y_Axis: 'bill_length_mm', Color_By: 'species', Boxplot_: false, Box_Points_: true } },
	heatmap:   { signals: { X_Axis: 'island', Y_Axis: 'species' } },
	facet:     { signals: { X_Axis: 'bill_length_mm', Y_Axis: 'bill_depth_mm', Color_By: 'species', Facet_Cols_By: 'island' } },
	corr:      { click: 'covariance' },
	threed:    { signals: { Color_By: 'species' }, click: 'ThreeD_btn' },
	overview:  { click: 'Overview_btn' }
};

function galleryAfterRender(action) {
	var tries = 0;
	(function poll() {
		tries++;
		if (tries > 120) { return; }
		var loader = document.getElementById('cc_loadersmartplot_id');
		if (!loader || loader.style.display !== 'none') { setTimeout(poll, 120); return; }
		if (action === 'covariance') {
			var cb = document.querySelector('#Show_Covariancesmartplot_id input[type=checkbox]');
			if (cb && !cb.checked) { cb.click(); }
		} else {
			var btn = document.getElementById(action + 'smartplot_id');
			if (btn) { btn.click(); }
		}
	})();
}

function launchGalleryExample(key) {
	var preset = GALLERY_PRESETS[key];
	if (!preset) { return; }
	var store = loadSignalsFromCookie('vegaSignals_smartplot_id') || {};
	Object.assign(store, GALLERY_BASE_SIGNALS, preset.signals || {});
	saveSignalState('vegaSignals_smartplot_id', store);
	document.getElementById('default_data').click();
	// normalize the show/hide toggle so the graph click always graphs
	document.getElementById('myccinput').style.display = 'block';
	var btn = document.getElementById('graph_button');
	btn.innerHTML = 'Graph Data';
	btn.click();
	if (preset.click) { setTimeout(function() { galleryAfterRender(preset.click); }, 250); }
}

document.querySelectorAll('#cc_gallery [data-gallery]').forEach(function(card) {
	card.setAttribute('role', 'button');
	card.setAttribute('tabindex', '0');
	var name = card.querySelector('.cc_gname');
	if (name) { card.setAttribute('aria-label', 'Open ' + name.textContent + ' example'); }
	card.addEventListener('click', function() {
		launchGalleryExample(card.getAttribute('data-gallery'));
	});
	card.addEventListener('keydown', function(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			launchGalleryExample(card.getAttribute('data-gallery'));
		}
	});
});

