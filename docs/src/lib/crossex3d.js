/*
 * crossex3d — self-contained WebGL unit visualization (SandDance-style).
 * Every data row is one mark. Layouts: 3D scatter and stacked unit columns,
 * with animated transitions between them. Orbit/zoom camera, projected axis
 * ticks, categorical/continuous color. No dependencies; WebGL1.
 */
(function() {
	'use strict';

	var CAT_PALETTE = ['#4c78a8', '#f58518', '#54a24b', '#e45756', '#72b7b2', '#b279a2',
		'#eeca3b', '#ff9da6', '#9d755d', '#bab0ac', '#638ccc', '#d67195'];
	var VIRIDIS = [[68, 1, 84], [59, 82, 139], [33, 145, 140], [94, 201, 98], [253, 231, 37]];
	var NA_SET = { 'na': 1, 'NA': 1, 'null': 1, 'NULL': 1, 'Null': 1, 'unknown': 1, 'Unknown': 1, 'N/A': 1, 'n/a': 1, '#N/A': 1, '': 1 };

	// ---- small matrix helpers (column-major, GL convention) -----------------
	function matMul(a, b) {
		var o = new Float32Array(16);
		for (var c = 0; c < 4; c++) {
			for (var r = 0; r < 4; r++) {
				o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
			}
		}
		return o;
	}
	function matPerspective(fovy, aspect, near, far) {
		var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
		return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
	}
	function matLookAt(eye, target, up) {
		var zx = eye[0] - target[0], zy = eye[1] - target[1], zz = eye[2] - target[2];
		var zl = Math.hypot(zx, zy, zz); zx /= zl; zy /= zl; zz /= zl;
		var xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
		var xl = Math.hypot(xx, xy, xz) || 1; xx /= xl; xy /= xl; xz /= xl;
		var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
		return new Float32Array([
			xx, yx, zx, 0,
			xy, yy, zy, 0,
			xz, yz, zz, 0,
			-(xx * eye[0] + xy * eye[1] + xz * eye[2]),
			-(yx * eye[0] + yy * eye[1] + yz * eye[2]),
			-(zx * eye[0] + zy * eye[1] + zz * eye[2]), 1]);
	}

	function hexToRgb(h) {
		return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
	}
	function viridis(t) {
		t = Math.max(0, Math.min(1, t));
		var seg = Math.min(VIRIDIS.length - 2, Math.floor(t * (VIRIDIS.length - 1)));
		var f = t * (VIRIDIS.length - 1) - seg;
		var a = VIRIDIS[seg], b = VIRIDIS[seg + 1];
		return [(a[0] + (b[0] - a[0]) * f) / 255, (a[1] + (b[1] - a[1]) * f) / 255, (a[2] + (b[2] - a[2]) * f) / 255];
	}
	function fmtTick(v) {
		if (typeof v !== 'number') { return String(v); }
		if (Number.isInteger(v) && Math.abs(v) < 1e6) { return String(v); }
		var a = Math.abs(v);
		if (a >= 1e5 || (a > 0 && a < 0.001)) { return v.toExponential(1); }
		return String(parseFloat(v.toPrecision(3)));
	}
	function easeCubic(t) {
		return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
	}
	function isNum(v) { return !isNaN(parseFloat(v)) && isFinite(v); }

	// Column reader: numeric columns normalize by min/max; categorical columns
	// map to ordinal slots (top-N by frequency, remainder lumped into "Other").
	function readColumn(rows, col, maxCats) {
		var n = rows.length;
		var numeric = true, seen = 0;
		for (var i = 0; i < n && seen < 100; i++) {
			var v = rows[i][col];
			if (v == null || NA_SET[v] === 1) { continue; }
			seen++;
			if (typeof v !== 'number' && !isNum(v)) { numeric = false; break; }
		}
		if (numeric && seen > 0) {
			var vals = new Float32Array(n);
			var min = Infinity, max = -Infinity;
			for (var j = 0; j < n; j++) {
				var w = rows[j][col];
				var x = (w == null || NA_SET[w] === 1) ? NaN : Number(w);
				vals[j] = x;
				if (x === x) { if (x < min) { min = x; } if (x > max) { max = x; } }
			}
			if (min > max) { min = 0; max = 1; }
			return { type: 'num', values: vals, min: min, max: max,
				norm: function(v2) { return max > min ? (v2 - min) / (max - min) : 0.5; },
				tick: function(t) { return fmtTick(min + t * (max - min)); } };
		}
		var counts = Object.create(null);
		for (var k = 0; k < n; k++) {
			var c = rows[k][col];
			if (c == null || NA_SET[c] === 1) { continue; }
			counts[c] = (counts[c] || 0) + 1;
		}
		var cats = Object.keys(counts).sort(function(a, b) { return counts[b] - counts[a]; });
		var lumped = cats.length > maxCats;
		if (lumped) { cats = cats.slice(0, maxCats - 1); }
		cats.sort();
		if (lumped) { cats.push('Other'); }
		var slot = Object.create(null);
		for (var s = 0; s < cats.length; s++) { slot[cats[s]] = s; }
		var ords = new Float32Array(n);
		for (var m = 0; m < n; m++) {
			var cv = rows[m][col];
			ords[m] = (cv == null || NA_SET[cv] === 1) ? NaN : (slot[cv] !== undefined ? slot[cv] : cats.length - 1);
		}
		return { type: 'cat', values: ords, cats: cats,
			norm: function(o) { return cats.length > 1 ? o / (cats.length - 1) : 0.5; },
			tick: null };
	}

	var VS = [
		'attribute vec3 aPosA; attribute vec3 aPosB; attribute vec3 aColor;',
		'uniform mat4 uMVP; uniform float uT; uniform float uPointScale;',
		'varying vec3 vColor;',
		'void main() {',
		'  vec3 p = mix(aPosA, aPosB, uT);',
		'  gl_Position = uMVP * vec4(p, 1.0);',
		'  gl_PointSize = clamp(uPointScale / gl_Position.w, 1.5, 42.0);',
		'  vColor = aColor;',
		'}'].join('\n');
	var FS = [
		'precision mediump float; varying vec3 vColor;',
		'void main() {',
		'  vec2 d = gl_PointCoord - vec2(0.5);',
		'  float r2 = dot(d, d);',
		'  if (r2 > 0.25) discard;',
		'  gl_FragColor = vec4(vColor * (1.0 - smoothstep(0.12, 0.25, r2) * 0.45), 1.0);',
		'}'].join('\n');
	var VS_LINE = 'attribute vec3 aPos; uniform mat4 uMVP; void main() { gl_Position = uMVP * vec4(aPos, 1.0); }';
	var FS_LINE = 'precision mediump float; uniform vec4 uColor; void main() { gl_FragColor = uColor; }';

	function compile(gl, vsSrc, fsSrc) {
		function sh(type, src) {
			var s = gl.createShader(type);
			gl.shaderSource(s, src);
			gl.compileShader(s);
			if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(s)); }
			return s;
		}
		var p = gl.createProgram();
		gl.attachShader(p, sh(gl.VERTEX_SHADER, vsSrc));
		gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fsSrc));
		gl.linkProgram(p);
		if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { throw new Error(gl.getProgramInfoLog(p)); }
		return p;
	}

	function create(container, onPick) {
		var canvas = document.createElement('canvas');
		canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
		var overlay = document.createElement('canvas');
		overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
		container.style.position = 'relative';
		container.appendChild(canvas);
		container.appendChild(overlay);
		var gl = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true }) || canvas.getContext('experimental-webgl');
		if (!gl) {
			container.textContent = 'WebGL is not available in this browser.';
			return null;
		}
		var prog = compile(gl, VS, FS);
		var progLine = compile(gl, VS_LINE, FS_LINE);
		var loc = {
			aPosA: gl.getAttribLocation(prog, 'aPosA'),
			aPosB: gl.getAttribLocation(prog, 'aPosB'),
			aColor: gl.getAttribLocation(prog, 'aColor'),
			uMVP: gl.getUniformLocation(prog, 'uMVP'),
			uT: gl.getUniformLocation(prog, 'uT'),
			uPointScale: gl.getUniformLocation(prog, 'uPointScale')
		};
		var locLine = {
			aPos: gl.getAttribLocation(progLine, 'aPos'),
			uMVP: gl.getUniformLocation(progLine, 'uMVP'),
			uColor: gl.getUniformLocation(progLine, 'uColor')
		};
		var bufA = gl.createBuffer(), bufB = gl.createBuffer(), bufC = gl.createBuffer(), bufLines = gl.createBuffer();
		gl.enable(gl.DEPTH_TEST);
		gl.clearColor(1, 1, 1, 1);

		// axis box: 12 edges of the unit cube [-0.5, 0.5]^3
		var E = 0.5, edges = [];
		var corners = [[-E,-E,-E],[E,-E,-E],[E,-E,E],[-E,-E,E],[-E,E,-E],[E,E,-E],[E,E,E],[-E,E,E]];
		var pairs = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
		pairs.forEach(function(pr) { edges.push.apply(edges, corners[pr[0]]); edges.push.apply(edges, corners[pr[1]]); });
		gl.bindBuffer(gl.ARRAY_BUFFER, bufLines);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(edges), gl.STATIC_DRAW);

		var inst = {
			n: 0, rows: null, cols: {}, layout: 'scatter',
			posA: null, posB: null, colors: null,
			t: 1, animStart: 0, animating: false,
			cam: { theta: 0.65, phi: 0.42, dist: 2.4 },
			labels: { x: '', y: '', z: '' },
			ticks: { x: [], y: [], z: [] },
			pointScale: 220,
			destroyed: false
		};

		function resize() {
			var dpr = window.devicePixelRatio || 1;
			var w = container.clientWidth, h = container.clientHeight;
			if (!w || !h) { return; }
			canvas.width = w * dpr; canvas.height = h * dpr;
			overlay.width = w * dpr; overlay.height = h * dpr;
			overlay.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
			gl.viewport(0, 0, canvas.width, canvas.height);
		}

		function mvp() {
			var c = inst.cam;
			var eye = [c.dist * Math.cos(c.phi) * Math.sin(c.theta), c.dist * Math.sin(c.phi), c.dist * Math.cos(c.phi) * Math.cos(c.theta)];
			var view = matLookAt(eye, [0, 0, 0], [0, 1, 0]);
			var proj = matPerspective(0.8, canvas.width / Math.max(1, canvas.height), 0.05, 50);
			return matMul(proj, view);
		}

		function project(m, p) {
			var x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12];
			var y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13];
			var w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
			if (w <= 0) { return null; }
			var cw = canvas.width / (window.devicePixelRatio || 1), ch = canvas.height / (window.devicePixelRatio || 1);
			return [(x / w * 0.5 + 0.5) * cw, (1 - (y / w * 0.5 + 0.5)) * ch];
		}

		function drawLabels(m) {
			var ctx = overlay.getContext('2d');
			var cw = canvas.width / (window.devicePixelRatio || 1), ch = canvas.height / (window.devicePixelRatio || 1);
			ctx.clearRect(0, 0, cw, ch);
			ctx.fillStyle = '#555';
			ctx.font = '10px Helvetica, Arial, sans-serif';
			ctx.textAlign = 'center';
			function tickRow(ticks, posFn, title, titlePos) {
				ticks.forEach(function(tk) {
					var s = project(m, posFn(tk.t));
					if (s) { ctx.fillText(tk.label, s[0], s[1]); }
				});
				var ts = project(m, titlePos);
				if (ts) {
					ctx.font = 'bold 11px Helvetica, Arial, sans-serif';
					ctx.fillStyle = '#333';
					ctx.fillText(title, ts[0], ts[1]);
					ctx.font = '10px Helvetica, Arial, sans-serif';
					ctx.fillStyle = '#555';
				}
			}
			// data X: gl x axis along front-bottom edge
			tickRow(inst.ticks.x, function(t) { return [t - 0.5, -0.56, 0.56]; }, inst.labels.x, [0, -0.68, 0.62]);
			// data Y: gl z axis along right-bottom edge
			tickRow(inst.ticks.y, function(t) { return [0.56, -0.56, 0.5 - t]; }, inst.labels.y, [0.66, -0.68, 0]);
			// data Z (up): vertical left-front edge
			ctx.textAlign = 'right';
			tickRow(inst.ticks.z, function(t) { return [-0.54, t - 0.5, 0.54]; }, inst.labels.z, [-0.56, 0.58, 0.56]);
			ctx.textAlign = 'center';
		}

		function render() {
			if (inst.destroyed) { return; }
			var m = mvp();
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			// axis box
			gl.useProgram(progLine);
			gl.uniformMatrix4fv(locLine.uMVP, false, m);
			gl.uniform4f(locLine.uColor, 0.72, 0.72, 0.72, 1);
			gl.bindBuffer(gl.ARRAY_BUFFER, bufLines);
			gl.enableVertexAttribArray(locLine.aPos);
			gl.vertexAttribPointer(locLine.aPos, 3, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.LINES, 0, 24);
			gl.disableVertexAttribArray(locLine.aPos);
			// points
			if (inst.n > 0) {
				gl.useProgram(prog);
				gl.uniformMatrix4fv(loc.uMVP, false, m);
				gl.uniform1f(loc.uT, easeCubic(inst.t));
				gl.uniform1f(loc.uPointScale, inst.pointScale * (window.devicePixelRatio || 1) / Math.sqrt(Math.max(1000, inst.n)));
				gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
				gl.enableVertexAttribArray(loc.aPosA);
				gl.vertexAttribPointer(loc.aPosA, 3, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, bufB);
				gl.enableVertexAttribArray(loc.aPosB);
				gl.vertexAttribPointer(loc.aPosB, 3, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, bufC);
				gl.enableVertexAttribArray(loc.aColor);
				gl.vertexAttribPointer(loc.aColor, 3, gl.FLOAT, false, 0, 0);
				gl.drawArrays(gl.POINTS, 0, inst.n);
			}
			drawLabels(m);
		}

		var rafPending = false;
		function frame() {
			rafPending = false;
			if (inst.destroyed) { return; }
			if (inst.animating) {
				var e = (performance.now() - inst.animStart) / 700;
				if (e >= 1) { inst.t = 1; inst.animating = false; }
				else { inst.t = e; requestFrame(); }
			}
			render();
		}
		function requestFrame() {
			if (!rafPending && !inst.destroyed) {
				rafPending = true;
				requestAnimationFrame(frame);
			}
		}

		// ---- layouts ---------------------------------------------------------
		function scatterPositions(cx, cy, cz) {
			var n = inst.n, out = new Float32Array(n * 3);
			for (var i = 0; i < n; i++) {
				var nx = cx.values[i] === cx.values[i] ? cx.norm(cx.values[i]) : 0.5;
				var ny = cy.values[i] === cy.values[i] ? cy.norm(cy.values[i]) : 0.5;
				var nz = cz.values[i] === cz.values[i] ? cz.norm(cz.values[i]) : 0.5;
				out[i * 3] = nx - 0.5;          // data X -> gl X (right)
				out[i * 3 + 1] = nz - 0.5;      // data Z -> gl Y (up)
				out[i * 3 + 2] = 0.5 - ny;      // data Y -> gl Z (depth)
			}
			return out;
		}
		// Stacked unit columns over an X x Y floor grid; rows within a cell are
		// ordered by color so the stacks show SandDance-style color bands.
		function stackPositions(cx, cy, colorVals) {
			var n = inst.n, out = new Float32Array(n * 3);
			var bx = cx.type === 'cat' ? cx.cats.length : 12;
			var by = cy.type === 'cat' ? cy.cats.length : 12;
			var cells = Object.create(null);
			var cellOf = new Int32Array(n);
			for (var i = 0; i < n; i++) {
				var vx = cx.values[i], vy = cy.values[i];
				var ix = vx === vx ? Math.min(bx - 1, Math.floor(cx.norm(vx) * bx)) : 0;
				var iy = vy === vy ? Math.min(by - 1, Math.floor(cy.norm(vy) * by)) : 0;
				var key = ix * by + iy;
				cellOf[i] = key;
				(cells[key] = cells[key] || []).push(i);
			}
			var maxN = 1;
			for (var k in cells) { if (cells[k].length > maxN) { maxN = cells[k].length; } }
			var Hmax = Math.max(3, Math.ceil(Math.pow(maxN, 2 / 3)));
			var u = 0.92 / Hmax;
			var cw = 1 / bx, cd = 1 / by;
			for (var k2 in cells) {
				var idxs = cells[k2];
				if (colorVals) {
					idxs.sort(function(a, b) { return (colorVals[a] || 0) - (colorVals[b] || 0); });
				}
				var s = Math.max(1, Math.ceil(Math.sqrt(idxs.length / Hmax)));
				var ix2 = Math.floor(k2 / by), iy2 = k2 % by;
				var x0 = -0.5 + ix2 * cw, z0 = 0.5 - iy2 * cd;
				for (var j = 0; j < idxs.length; j++) {
					var px = j % s, pz = Math.floor(j / s) % s, py = Math.floor(j / (s * s));
					var o = idxs[j] * 3;
					out[o] = x0 + cw * (0.08 + 0.84 * (px + 0.5) / s);
					out[o + 1] = -0.5 + (py + 0.5) * u;
					out[o + 2] = z0 - cd * (0.08 + 0.84 * (pz + 0.5) / s);
				}
			}
			return { positions: out, maxN: maxN, Hmax: Hmax };
		}

		function buildTicks(colInfo, axis) {
			var ticks = [];
			if (!colInfo) { return ticks; }
			if (colInfo.type === 'num') {
				for (var i = 0; i <= 4; i++) { ticks.push({ t: i / 4, label: colInfo.tick(i / 4) }); }
			} else {
				var step = Math.max(1, Math.ceil(colInfo.cats.length / 8));
				for (var c = 0; c < colInfo.cats.length; c += step) {
					var lab = String(colInfo.cats[c]);
					if (lab.length > 9) { lab = lab.slice(0, 8) + '…'; }
					ticks.push({ t: colInfo.cats.length > 1 ? c / (colInfo.cats.length - 1) : 0.5, label: lab });
				}
			}
			return ticks;
		}

		function buildColors(rows, colorCol) {
			var n = inst.n, out = new Float32Array(n * 3);
			if (!colorCol || colorCol === 'None') {
				var sb = hexToRgb('#4c78a8');
				for (var i = 0; i < n; i++) { out[i * 3] = sb[0]; out[i * 3 + 1] = sb[1]; out[i * 3 + 2] = sb[2]; }
				return { colors: out, ords: null, legend: null };
			}
			var info = readColumn(rows, colorCol, 12);
			if (info.type === 'cat') {
				var rgbs = info.cats.map(function(c, i2) { return hexToRgb(CAT_PALETTE[i2 % CAT_PALETTE.length]); });
				for (var j = 0; j < n; j++) {
					var o = info.values[j];
					var rgb = o === o ? rgbs[o] : [0.8, 0.8, 0.8];
					out[j * 3] = rgb[0]; out[j * 3 + 1] = rgb[1]; out[j * 3 + 2] = rgb[2];
				}
				return { colors: out, ords: info.values,
					legend: info.cats.map(function(c, i3) { return { label: String(c), color: CAT_PALETTE[i3 % CAT_PALETTE.length] }; }) };
			}
			for (var k = 0; k < n; k++) {
				var v = info.values[k];
				var rgb2 = v === v ? viridis(info.norm(v)) : [0.85, 0.85, 0.85];
				out[k * 3] = rgb2[0]; out[k * 3 + 1] = rgb2[1]; out[k * 3 + 2] = rgb2[2];
			}
			return { colors: out, ords: info.values, legend: [
				{ label: fmtTick(info.min), color: '#440154' },
				{ label: fmtTick(info.max), color: '#fde725' }] };
		}

		inst.setData = function(rows, cfg) {
			inst.rows = rows;
			inst.n = rows.length;
			inst.applyConfig(cfg, true);
		};

		inst.applyConfig = function(cfg, snap) {
			var rows = inst.rows;
			var cx = readColumn(rows, cfg.x, 24);
			var cy = readColumn(rows, cfg.y, 24);
			var cz = readColumn(rows, cfg.z, 24);
			var colorInfo = buildColors(rows, cfg.color);
			var target;
			if (cfg.layout === 'stacks') {
				var st = stackPositions(cx, cy, colorInfo.ords);
				target = st.positions;
				inst.ticks = { x: buildTicks(cx, 'x'), y: buildTicks(cy, 'y'),
					z: [{ t: 0, label: '0' }, { t: 1, label: String(st.Hmax * Math.ceil(st.maxN / st.Hmax) >= st.maxN ? st.maxN : st.maxN) + ' rows' }] };
				inst.labels = { x: cfg.x, y: cfg.y, z: 'stack' };
			} else {
				target = scatterPositions(cx, cy, cz);
				inst.ticks = { x: buildTicks(cx, 'x'), y: buildTicks(cy, 'y'), z: buildTicks(cz, 'z') };
				inst.labels = { x: cfg.x, y: cfg.y, z: cfg.z };
			}
			inst.layout = cfg.layout;
			// current interpolated positions become the transition start
			var n3 = inst.n * 3;
			var start;
			if (snap || !inst.posB) {
				start = target;
			} else {
				start = new Float32Array(n3);
				var te = easeCubic(inst.t);
				for (var i = 0; i < n3; i++) { start[i] = inst.posA[i] + (inst.posB[i] - inst.posA[i]) * te; }
			}
			inst.posA = start;
			inst.posB = target;
			inst.colors = colorInfo.colors;
			inst.legend = colorInfo.legend;
			gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
			gl.bufferData(gl.ARRAY_BUFFER, inst.posA, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, bufB);
			gl.bufferData(gl.ARRAY_BUFFER, inst.posB, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, bufC);
			gl.bufferData(gl.ARRAY_BUFFER, inst.colors, gl.DYNAMIC_DRAW);
			inst.t = snap ? 1 : 0;
			inst.animating = !snap;
			inst.animStart = performance.now();
			requestFrame();
		};

		inst.resetCamera = function() {
			inst.cam = { theta: 0.65, phi: 0.42, dist: 2.4 };
			requestFrame();
		};

		// ---- interaction -------------------------------------------------------
		var dragging = false, lastX = 0, lastY = 0, moved = 0;
		canvas.addEventListener('pointerdown', function(e) {
			dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
			canvas.setPointerCapture(e.pointerId);
		});
		canvas.addEventListener('pointermove', function(e) {
			if (!dragging) { return; }
			var dx = e.clientX - lastX, dy = e.clientY - lastY;
			moved += Math.abs(dx) + Math.abs(dy);
			lastX = e.clientX; lastY = e.clientY;
			inst.cam.theta -= dx * 0.008;
			inst.cam.phi = Math.max(-0.1, Math.min(1.45, inst.cam.phi + dy * 0.008));
			requestFrame();
		});
		canvas.addEventListener('pointerup', function(e) {
			dragging = false;
			if (moved < 6 && onPick && inst.n) {
				// nearest projected point within 12px of the click
				var rect = canvas.getBoundingClientRect();
				var mxp = e.clientX - rect.left, myp = e.clientY - rect.top;
				var m = mvp(), best = -1, bestD = 144;
				var te = easeCubic(inst.t);
				for (var i = 0; i < inst.n; i++) {
					var o = i * 3;
					var p = project(m, [
						inst.posA[o] + (inst.posB[o] - inst.posA[o]) * te,
						inst.posA[o + 1] + (inst.posB[o + 1] - inst.posA[o + 1]) * te,
						inst.posA[o + 2] + (inst.posB[o + 2] - inst.posA[o + 2]) * te]);
					if (!p) { continue; }
					var d = (p[0] - mxp) * (p[0] - mxp) + (p[1] - myp) * (p[1] - myp);
					if (d < bestD) { bestD = d; best = i; }
				}
				onPick(best >= 0 ? inst.rows[best] : null, e.clientX, e.clientY);
			}
		});
		canvas.addEventListener('wheel', function(e) {
			e.preventDefault();
			inst.cam.dist = Math.max(0.9, Math.min(9, inst.cam.dist * Math.exp(e.deltaY * 0.0012)));
			requestFrame();
		}, { passive: false });
		canvas.addEventListener('dblclick', function() { inst.resetCamera(); });

		var ro = window.ResizeObserver ? new ResizeObserver(function() { resize(); requestFrame(); }) : null;
		if (ro) { ro.observe(container); }

		inst.destroy = function() {
			inst.destroyed = true;
			if (ro) { ro.disconnect(); }
			container.removeChild(canvas);
			container.removeChild(overlay);
		};

		resize();
		requestFrame();
		return inst;
	}

	window.crossex3d = { create: create, readColumn: readColumn };
})();
