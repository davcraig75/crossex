// Copyright David W Craig 2021
// https://d3js.org v7.1.1 Copyright 2010-2021 Mike Bostock
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";function n(t,n){return null==t||null==n?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function e(t){let e=t,r=t,i=t;function o(t,n,e=0,o=t.length){if(e<o){if(0!==r(n,n))return o;do{const r=e+o>>>1;i(t[r],n)<0?e=r+1:o=r}while(e<o)}return e}return 2!==t.length&&(e=(n,e)=>t(n)-e,r=n,i=(e,r)=>n(t(e),r)),{left:o,center:function(t,n,r=0,i=t.length){const a=o(t,n,r,i-1);return a>r&&e(t[a-1],n)>-e(t[a],n)?a-1:a},right:function(t,n,e=0,o=t.length){if(e<o){if(0!==r(n,n))return o;do{const r=e+o>>>1;i(t[r],n)<=0?e=r+1:o=r}while(e<o)}return e}}}function r(t){return null===t?NaN:+t}const i=e(n),o=i.right,a=i.left,u=e(r).center;var c=o;function f(t,n){let e=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&++e;else{let r=-1;for(let i of t)null!=(i=n(i,++r,t))&&(i=+i)>=i&&++e}return e}function s(t){return 0|t.length}function l(t){return!(t>0)}function h(t){return"object"!=typeof t||"length"in t?t:Array.from(t)}function d(t,n){let e,r=0,i=0,o=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(e=n-i,i+=e/++r,o+=e*(n-i));else{let a=-1;for(let u of t)null!=(u=n(u,++a,t))&&(u=+u)>=u&&(e=u-i,i+=e/++r,o+=e*(u-i))}if(r>1)return o/(r-1)}function p(t,n){const e=d(t,n);return e?Math.sqrt(e):e}function g(t,n){let e,r;if(void 0===n)for(const n of t)null!=n&&(void 0===e?n>=n&&(e=r=n):(e>n&&(e=n),r<n&&(r=n)));else{let i=-1;for(let o of t)null!=(o=n(o,++i,t))&&(void 0===e?o>=o&&(e=r=o):(e>o&&(e=o),r<o&&(r=o)))}return[e,r]}class y{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const n=this._partials;let e=0;for(let r=0;r<this._n&&r<32;r++){const i=n[r],o=t+i,a=Math.abs(t)<Math.abs(i)?t-(o-i):i-(o-t);a&&(n[e++]=a),t=o}return n[e]=t,this._n=e+1,this}valueOf(){const t=this._partials;let n,e,r,i=this._n,o=0;if(i>0){for(o=t[--i];i>0&&(n=o,e=t[--i],o=n+e,r=e-(o-n),!r););i>0&&(r<0&&t[i-1]<0||r>0&&t[i-1]>0)&&(e=2*r,n=o+e,e==n-o&&(o=n))}return o}}class InternMap extends Map{constructor(t,n=m){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),null!=t)for(const[n,e]of t)this.set(n,e)}get(t){return super.get(v(this,t))}has(t){return super.has(v(this,t))}set(t,n){return super.set(_(this,t),n)}delete(t){return super.delete(b(this,t))}}class InternSet extends Set{constructor(t,n=m){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),null!=t)for(const n of t)this.add(n)}has(t){return super.has(v(this,t))}add(t){return super.add(_(this,t))}delete(t){return super.delete(b(this,t))}}function v({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):e}function _({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):(t.set(r,e),e)}function b({_intern:t,_key:n},e){const r=n(e);return t.has(r)&&(e=t.get(r),t.delete(r)),e}function m(t){return null!==t&&"object"==typeof t?t.valueOf():t}function x(t){return t}function w(t,...n){return k(t,x,x,n)}function M(t,...n){return k(t,Array.from,x,n)}function A(t,n){for(let e=1,r=n.length;e<r;++e)t=t.flatMap((t=>t.pop().map((([n,e])=>[...t,n,e]))));return t}function T(t,n,...e){return k(t,x,n,e)}function S(t,n,...e){return k(t,Array.from,n,e)}function E(t){if(1!==t.length)throw new Error("duplicate key");return t[0]}function k(t,n,e,r){return function t(i,o){if(o>=r.length)return e(i);const a=new InternMap,u=r[o++];let c=-1;for(const t of i){const n=u(t,++c,i),e=a.get(n);e?e.push(t):a.set(n,[t])}for(const[n,e]of a)a.set(n,t(e,o));return n(a)}(t,0)}function N(t,n){return Array.from(n,(n=>t[n]))}function C(t,...n){if("function"!=typeof t[Symbol.iterator])throw new TypeError("values is not iterable");t=Array.from(t);let[e]=n;if(e&&2!==e.length||n.length>1){const r=Uint32Array.from(t,((t,n)=>n));return n.length>1?(n=n.map((n=>t.map(n))),r.sort(((t,e)=>{for(const r of n){const n=z(r[t],r[e]);if(n)return n}}))):(e=t.map(e),r.sort(((t,n)=>z(e[t],e[n])))),N(t,r)}return t.sort(P(e))}function P(t=n){if(t===n)return z;if("function"!=typeof t)throw new TypeError("compare is not a function");return(n,e)=>{const r=t(n,e);return r||0===r?r:(0===t(e,e))-(0===t(n,n))}}function z(t,n){return(null==t||!(t>=t))-(null==n||!(n>=n))||(t<n?-1:t>n?1:0)}var D=Array.prototype.slice;function q(t){return()=>t}var R=Math.sqrt(50),F=Math.sqrt(10),O=Math.sqrt(2);function U(t,n,e){var r,i,o,a,u=-1;if(e=+e,(t=+t)===(n=+n)&&e>0)return[t];if((r=n<t)&&(i=t,t=n,n=i),0===(a=I(t,n,e))||!isFinite(a))return[];if(a>0){let e=Math.round(t/a),r=Math.round(n/a);for(e*a<t&&++e,r*a>n&&--r,o=new Array(i=r-e+1);++u<i;)o[u]=(e+u)*a}else{a=-a;let e=Math.round(t*a),r=Math.round(n*a);for(e/a<t&&++e,r/a>n&&--r,o=new Array(i=r-e+1);++u<i;)o[u]=(e+u)/a}return r&&o.reverse(),o}function I(t,n,e){var r=(n-t)/Math.max(0,e),i=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,i);return i>=0?(o>=R?10:o>=F?5:o>=O?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=R?10:o>=F?5:o>=O?2:1)}function B(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=R?i*=10:o>=F?i*=5:o>=O&&(i*=2),n<t?-i:i}function Y(t,n,e){let r;for(;;){const i=I(t,n,e);if(i===r||0===i||!isFinite(i))return[t,n];i>0?(t=Math.floor(t/i)*i,n=Math.ceil(n/i)*i):i<0&&(t=Math.ceil(t*i)/i,n=Math.floor(n*i)/i),r=i}}function L(t){return Math.ceil(Math.log(f(t))/Math.LN2)+1}function j(){var t=x,n=g,e=L;function r(r){Array.isArray(r)||(r=Array.from(r));var i,o,a=r.length,u=new Array(a);for(i=0;i<a;++i)u[i]=t(r[i],i,r);var f=n(u),s=f[0],l=f[1],h=e(u,s,l);if(!Array.isArray(h)){const t=l,e=+h;if(n===g&&([s,l]=Y(s,l,e)),(h=U(s,l,e))[h.length-1]>=l)if(t>=l&&n===g){const t=I(s,l,e);isFinite(t)&&(t>0?l=(Math.floor(l/t)+1)*t:t<0&&(l=(Math.ceil(l*-t)+1)/-t))}else h.pop()}for(var d=h.length;h[0]<=s;)h.shift(),--d;for(;h[d-1]>l;)h.pop(),--d;var p,y=new Array(d+1);for(i=0;i<=d;++i)(p=y[i]=[]).x0=i>0?h[i-1]:s,p.x1=i<d?h[i]:l;for(i=0;i<a;++i)null!=(o=u[i])&&s<=o&&o<=l&&y[c(h,o,0,d)].push(r[i]);return y}return r.value=function(n){return arguments.length?(t="function"==typeof n?n:q(n),r):t},r.domain=function(t){return arguments.length?(n="function"==typeof t?t:q([t[0],t[1]]),r):n},r.thresholds=function(t){return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?q(D.call(t)):q(t),r):e},r}function H(t,n){let e;if(void 0===n)for(const n of t)null!=n&&(e<n||void 0===e&&n>=n)&&(e=n);else{let r=-1;for(let i of t)null!=(i=n(i,++r,t))&&(e<i||void 0===e&&i>=i)&&(e=i)}return e}function X(t,n){let e;if(void 0===n)for(const n of t)null!=n&&(e>n||void 0===e&&n>=n)&&(e=n);else{let r=-1;for(let i of t)null!=(i=n(i,++r,t))&&(e>i||void 0===e&&i>=i)&&(e=i)}return e}function G(t,n,e=0,r=t.length-1,i){for(i=void 0===i?z:P(i);r>e;){if(r-e>600){const o=r-e+1,a=n-e+1,u=Math.log(o),c=.5*Math.exp(2*u/3),f=.5*Math.sqrt(u*c*(o-c)/o)*(a-o/2<0?-1:1);G(t,n,Math.max(e,Math.floor(n-a*c/o+f)),Math.min(r,Math.floor(n+(o-a)*c/o+f)),i)}const o=t[n];let a=e,u=r;for(V(t,e,n),i(t[r],o)>0&&V(t,e,r);a<u;){for(V(t,a,u),++a,--u;i(t[a],o)<0;)++a;for(;i(t[u],o)>0;)--u}0===i(t[e],o)?V(t,e,u):(++u,V(t,u,r)),u<=n&&(e=u+1),n<=u&&(r=u-1)}return t}function V(t,n,e){const r=t[n];t[n]=t[e],t[e]=r}function $(t,n,e){if(t=Float64Array.from(function*(t,n){if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(yield n);else{let e=-1;for(let r of t)null!=(r=n(r,++e,t))&&(r=+r)>=r&&(yield r)}}(t,e)),r=t.length){if((n=+n)<=0||r<2)return X(t);if(n>=1)return H(t);var r,i=(r-1)*n,o=Math.floor(i),a=H(G(t,o).subarray(0,o+1));return a+(X(t.subarray(o+1))-a)*(i-o)}}function W(t,n,e=r){if(i=t.length){if((n=+n)<=0||i<2)return+e(t[0],0,t);if(n>=1)return+e(t[i-1],i-1,t);var i,o=(i-1)*n,a=Math.floor(o),u=+e(t[a],a,t);return u+(+e(t[a+1],a+1,t)-u)*(o-a)}}function Z(t,n){let e,r=-1,i=-1;if(void 0===n)for(const n of t)++i,null!=n&&(e<n||void 0===e&&n>=n)&&(e=n,r=i);else for(let o of t)null!=(o=n(o,++i,t))&&(e<o||void 0===e&&o>=o)&&(e=o,r=i);return r}function K(t){return Array.from(function*(t){for(const n of t)yield*n}(t))}function Q(t,n){let e,r=-1,i=-1;if(void 0===n)for(const n of t)++i,null!=n&&(e>n||void 0===e&&n>=n)&&(e=n,r=i);else for(let o of t)null!=(o=n(o,++i,t))&&(e>o||void 0===e&&o>=o)&&(e=o,r=i);return r}function J(t,n){return[t,n]}function tt(t,n,e){t=+t,n=+n,e=(i=arguments.length)<2?(n=t,t=0,1):i<3?1:+e;for(var r=-1,i=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(i);++r<i;)o[r]=t+r*e;return o}function nt(t,e=n){if(1===e.length)return Q(t,e);let r,i=-1,o=-1;for(const n of t)++o,(i<0?0===e(n,n):e(n,r)<0)&&(r=n,i=o);return i}var et=rt(Math.random);function rt(t){return function(n,e=0,r=n.length){let i=r-(e=+e);for(;i;){const r=t()*i--|0,o=n[i+e];n[i+e]=n[r+e],n[r+e]=o}return n}}function it(t){if(!(i=t.length))return[];for(var n=-1,e=X(t,ot),r=new Array(e);++n<e;)for(var i,o=-1,a=r[n]=new Array(i);++o<i;)a[o]=t[o][n];return r}function ot(t){return t.length}function at(t){return t instanceof InternSet?t:new InternSet(t)}function ut(t,n){const e=t[Symbol.iterator](),r=new Set;for(const t of n){const n=ct(t);if(r.has(n))continue;let i,o;for(;({value:i,done:o}=e.next());){if(o)return!1;const t=ct(i);if(r.add(t),Object.is(n,t))break}}return!0}function ct(t){return null!==t&&"object"==typeof t?t.valueOf():t}function ft(t){return t}var st=1e-6;function lt(t){return"translate("+t+",0)"}function ht(t){return"translate(0,"+t+")"}function dt(t){return n=>+t(n)}function pt(t,n){return n=Math.max(0,t.bandwidth()-2*n)/2,t.round()&&(n=Math.round(n)),e=>+t(e)+n}function gt(){return!this.__axis}function yt(t,n){var e=[],r=null,i=null,o=6,a=6,u=3,c="undefined"!=typeof window&&window.devicePixelRatio>1?0:.5,f=1===t||4===t?-1:1,s=4===t||2===t?"x":"y",l=1===t||3===t?lt:ht;function h(h){var d=null==r?n.ticks?n.ticks.apply(n,e):n.domain():r,p=null==i?n.tickFormat?n.tickFormat.apply(n,e):ft:i,g=Math.max(o,0)+u,y=n.range(),v=+y[0]+c,_=+y[y.length-1]+c,b=(n.bandwidth?pt:dt)(n.copy(),c),m=h.selection?h.selection():h,x=m.selectAll(".domain").data([null]),w=m.selectAll(".tick").data(d,n).order(),M=w.exit(),A=w.enter().append("g").attr("class","tick"),T=w.select("line"),S=w.select("text");x=x.merge(x.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),w=w.merge(A),T=T.merge(A.append("line").attr("stroke","currentColor").attr(s+"2",f*o)),S=S.merge(A.append("text").attr("fill","currentColor").attr(s,f*g).attr("dy",1===t?"0em":3===t?"0.71em":"0.32em")),h!==m&&(x=x.transition(h),w=w.transition(h),T=T.transition(h),S=S.transition(h),M=M.transition(h).attr("opacity",st).attr("transform",(function(t){return isFinite(t=b(t))?l(t+c):this.getAttribute("transform")})),A.attr("opacity",st).attr("transform",(function(t){var n=this.parentNode.__axis;return l((n&&isFinite(n=n(t))?n:b(t))+c)}))),M.remove(),x.attr("d",4===t||2===t?a?"M"+f*a+","+v+"H"+c+"V"+_+"H"+f*a:"M"+c+","+v+"V"+_:a?"M"+v+","+f*a+"V"+c+"H"+_+"V"+f*a:"M"+v+","+c+"H"+_),w.attr("opacity",1).attr("transform",(function(t){return l(b(t)+c)})),T.attr(s+"2",f*o),S.attr(s,f*g).text(p),m.filter(gt).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",2===t?"start":4===t?"end":"middle"),m.each((function(){this.__axis=b}))}return h.scale=function(t){return arguments.length?(n=t,h):n},h.ticks=function(){return e=Array.from(arguments),h},h.tickArguments=function(t){return arguments.length?(e=null==t?[]:Array.from(t),h):e.slice()},h.tickValues=function(t){return arguments.length?(r=null==t?null:Array.from(t),h):r&&r.slice()},h.tickFormat=function(t){return arguments.length?(i=t,h):i},h.tickSize=function(t){return arguments.length?(o=a=+t,h):o},h.tickSizeInner=function(t){return arguments.length?(o=+t,h):o},h.tickSizeOuter=function(t){return arguments.length?(a=+t,h):a},h.tickPadding=function(t){return arguments.length?(u=+t,h):u},h.offset=function(t){return arguments.length?(c=+t,h):c},h}var vt={value:()=>{}};function _t(){for(var t,n=0,e=arguments.length,r={};n<e;++n){if(!(t=arguments[n]+"")||t in r||/[\s.]/.test(t))throw new Error("illegal type: "+t);r[t]=[]}return new bt(r)}function bt(t){this._=t}function mt(t,n){return t.trim().split(/^|\s+/).map((function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}}))}function xt(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function wt(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=vt,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}bt.prototype=_t.prototype={constructor:bt,on:function(t,n){var e,r=this._,i=mt(t+"",r),o=-1,a=i.length;if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++o<a;)if(e=(t=i[o]).type)r[e]=wt(r[e],t.name,n);else if(null==n)for(e in r)r[e]=wt(r[e],t.name,null);return this}for(;++o<a;)if((e=(t=i[o]).type)&&(e=xt(r[e],t.name)))return e},copy:function(){var t={},n=this._;for(var e in n)t[e]=n[e].slice();return new bt(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,e=(r=this._[t]).length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}};var Mt="http://www.w3.org/1999/xhtml",At={svg:"http://www.w3.org/2000/svg",xhtml:Mt,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Tt(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),At.hasOwnProperty(n)?{space:At[n],local:t}:t}function St(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===Mt&&n.documentElement.namespaceURI===Mt?n.createElement(t):n.createElementNS(e,t)}}function Et(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function kt(t){var n=Tt(t);return(n.local?Et:St)(n)}function Nt(){}function Ct(t){return null==t?Nt:function(){return this.querySelector(t)}}function Pt(t){return null==t?[]:Array.isArray(t)?t:Array.from(t)}function zt(){return[]}function Dt(t){return null==t?zt:function(){return this.querySelectorAll(t)}}function qt(t){return function(){return this.matches(t)}}function Rt(t){return function(n){return n.matches(t)}}var Ft=Array.prototype.find;function Ot(){return this.firstElementChild}var Ut=Array.prototype.filter;function It(){return Array.from(this.children)}function Bt(t){return new Array(t.length)}function Yt(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function Lt(t){return function(){return t}}function jt(t,n,e,r,i,o){for(var a,u=0,c=n.length,f=o.length;u<f;++u)(a=n[u])?(a.__data__=o[u],r[u]=a):e[u]=new Yt(t,o[u]);for(;u<c;++u)(a=n[u])&&(i[u]=a)}function Ht(t,n,e,r,i,o,a){var u,c,f,s=new Map,l=n.length,h=o.length,d=new Array(l);for(u=0;u<l;++u)(c=n[u])&&(d[u]=f=a.call(c,c.__data__,u,n)+"",s.has(f)?i[u]=c:s.set(f,c));for(u=0;u<h;++u)f=a.call(t,o[u],u,o)+"",(c=s.get(f))?(r[u]=c,c.__data__=o[u],s.delete(f)):e[u]=new Yt(t,o[u]);for(u=0;u<l;++u)(c=n[u])&&s.get(d[u])===c&&(i[u]=c)}function Xt(t){return t.__data__}function Gt(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function Vt(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function $t(t){return function(){this.removeAttribute(t)}}function Wt(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Zt(t,n){return function(){this.setAttribute(t,n)}}function Kt(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function Qt(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function Jt(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function tn(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function nn(t){return function(){this.style.removeProperty(t)}}function en(t,n,e){return function(){this.style.setProperty(t,n,e)}}function rn(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function on(t,n){return t.style.getPropertyValue(n)||tn(t).getComputedStyle(t,null).getPropertyValue(n)}function an(t){return function(){delete this[t]}}function un(t,n){return function(){this[t]=n}}function cn(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function fn(t){return t.trim().split(/^|\s+/)}function sn(t){return t.classList||new ln(t)}function ln(t){this._node=t,this._names=fn(t.getAttribute("class")||"")}function hn(t,n){for(var e=sn(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function dn(t,n){for(var e=sn(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function pn(t){return function(){hn(this,t)}}function gn(t){return function(){dn(this,t)}}function yn(t,n){return function(){(n.apply(this,arguments)?hn:dn)(this,t)}}function vn(){this.textContent=""}function _n(t){return function(){this.textContent=t}}function bn(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function mn(){this.innerHTML=""}function xn(t){return function(){this.innerHTML=t}}function wn(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function Mn(){this.nextSibling&&this.parentNode.appendChild(this)}function An(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Tn(){return null}function Sn(){var t=this.parentNode;t&&t.removeChild(this)}function En(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function kn(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function Nn(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}function Cn(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.options);++i?n.length=i:delete this.__on}}}function Pn(t,n,e){return function(){var r,i=this.__on,o=function(t){return function(n){t.call(this,n,this.__data__)}}(n);if(i)for(var a=0,u=i.length;a<u;++a)if((r=i[a]).type===t.type&&r.name===t.name)return this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=e),void(r.value=n);this.addEventListener(t.type,o,e),r={type:t.type,name:t.name,value:n,listener:o,options:e},i?i.push(r):this.__on=[r]}}function zn(t,n,e){var r=tn(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Dn(t,n){return function(){return zn(this,t,n)}}function qn(t,n){return function(){return zn(this,t,n.apply(this,arguments))}}Yt.prototype={constructor:Yt,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},ln.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Rn=[null];function Fn(t,n){this._groups=t,this._parents=n}function On(){return new Fn([[document.documentElement]],Rn)}function Un(t){return"string"==typeof t?new Fn([[document.querySelector(t)]],[document.documentElement]):new Fn([[t]],Rn)}Fn.prototype=On.prototype={constructor:Fn,select:function(t){"function"!=typeof t&&(t=Ct(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a,u=n[i],c=u.length,f=r[i]=new Array(c),s=0;s<c;++s)(o=u[s])&&(a=t.call(o,o.__data__,s,u))&&("__data__"in o&&(a.__data__=o.__data__),f[s]=a);return new Fn(r,this._parents)},selectAll:function(t){t="function"==typeof t?function(t){return function(){return Pt(t.apply(this,arguments))}}(t):Dt(t);for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var a,u=n[o],c=u.length,f=0;f<c;++f)(a=u[f])&&(r.push(t.call(a,a.__data__,f,u)),i.push(a));return new Fn(r,i)},selectChild:function(t){return this.select(null==t?Ot:function(t){return function(){return Ft.call(this.children,t)}}("function"==typeof t?t:Rt(t)))},selectChildren:function(t){return this.selectAll(null==t?It:function(t){return function(){return Ut.call(this.children,t)}}("function"==typeof t?t:Rt(t)))},filter:function(t){"function"!=typeof t&&(t=qt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,c=r[i]=[],f=0;f<u;++f)(o=a[f])&&t.call(o,o.__data__,f,a)&&c.push(o);return new Fn(r,this._parents)},data:function(t,n){if(!arguments.length)return Array.from(this,Xt);var e=n?Ht:jt,r=this._parents,i=this._groups;"function"!=typeof t&&(t=Lt(t));for(var o=i.length,a=new Array(o),u=new Array(o),c=new Array(o),f=0;f<o;++f){var s=r[f],l=i[f],h=l.length,d=Gt(t.call(s,s&&s.__data__,f,r)),p=d.length,g=u[f]=new Array(p),y=a[f]=new Array(p),v=c[f]=new Array(h);e(s,l,g,y,v,d,n);for(var _,b,m=0,x=0;m<p;++m)if(_=g[m]){for(m>=x&&(x=m+1);!(b=y[x])&&++x<p;);_._next=b||null}}return(a=new Fn(a,r))._enter=u,a._exit=c,a},enter:function(){return new Fn(this._enter||this._groups.map(Bt),this._parents)},exit:function(){return new Fn(this._exit||this._groups.map(Bt),this._parents)},join:function(t,n,e){var r=this.enter(),i=this,o=this.exit();return"function"==typeof t?(r=t(r))&&(r=r.selection()):r=r.append(t+""),null!=n&&(i=n(i))&&(i=i.selection()),null==e?o.remove():e(o),r&&i?r.merge(i).order():i},merge:function(t){for(var n=t.selection?t.selection():t,e=this._groups,r=n._groups,i=e.length,o=r.length,a=Math.min(i,o),u=new Array(i),c=0;c<a;++c)for(var f,s=e[c],l=r[c],h=s.length,d=u[c]=new Array(h),p=0;p<h;++p)(f=s[p]||l[p])&&(d[p]=f);for(;c<i;++c)u[c]=e[c];return new Fn(u,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,a=i[o];--o>=0;)(r=i[o])&&(a&&4^r.compareDocumentPosition(a)&&a.parentNode.insertBefore(r,a),a=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=Vt);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var a,u=e[o],c=u.length,f=i[o]=new Array(c),s=0;s<c;++s)(a=u[s])&&(f[s]=a);f.sort(n)}return new Fn(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var a=r[i];if(a)return a}return null},size:function(){let t=0;for(const n of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],a=0,u=o.length;a<u;++a)(i=o[a])&&t.call(i,i.__data__,a,o);return this},attr:function(t,n){var e=Tt(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?Wt:$t:"function"==typeof n?e.local?Jt:Qt:e.local?Kt:Zt)(e,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?nn:"function"==typeof n?rn:en)(t,n,null==e?"":e)):on(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?an:"function"==typeof n?cn:un)(t,n)):this.node()[t]},classed:function(t,n){var e=fn(t+"");if(arguments.length<2){for(var r=sn(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?yn:n?pn:gn)(e,n))},text:function(t){return arguments.length?this.each(null==t?vn:("function"==typeof t?bn:_n)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?mn:("function"==typeof t?wn:xn)(t)):this.node().innerHTML},raise:function(){return this.each(Mn)},lower:function(){return this.each(An)},append:function(t){var n="function"==typeof t?t:kt(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:kt(t),r=null==n?Tn:"function"==typeof n?n:Ct(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(Sn)},clone:function(t){return this.select(t?kn:En)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var r,i,o=Nn(t+""),a=o.length;if(!(arguments.length<2)){for(u=n?Pn:Cn,r=0;r<a;++r)this.each(u(o[r],n,e));return this}var u=this.node().__on;if(u)for(var c,f=0,s=u.length;f<s;++f)for(r=0,c=u[f];r<a;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value},dispatch:function(t,n){return this.each(("function"==typeof n?qn:Dn)(t,n))},[Symbol.iterator]:function*(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r,i=t[n],o=0,a=i.length;o<a;++o)(r=i[o])&&(yield r)}};var In=0;function Bn(){return new Yn}function Yn(){this._="@"+(++In).toString(36)}function Ln(t){let n;for(;n=t.sourceEvent;)t=n;return t}function jn(t,n){if(t=Ln(t),void 0===n&&(n=t.currentTarget),n){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,[(r=r.matrixTransform(n.getScreenCTM().inverse())).x,r.y]}if(n.getBoundingClientRect){var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}}return[t.pageX,t.pageY]}Yn.prototype=Bn.prototype={constructor:Yn,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};const Hn={passive:!1},Xn={capture:!0,passive:!1};function Gn(t){t.stopImmediatePropagation()}function Vn(t){t.preventDefault(),t.stopImmediatePropagation()}function $n(t){var n=t.document.documentElement,e=Un(t).on("dragstart.drag",Vn,Xn);"onselectstart"in n?e.on("selectstart.drag",Vn,Xn):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}function Wn(t,n){var e=t.document.documentElement,r=Un(t).on("dragstart.drag",null);n&&(r.on("click.drag",Vn,Xn),setTimeout((function(){r.on("click.drag",null)}),0)),"onselectstart"in e?r.on("selectstart.drag",null):(e.style.MozUserSelect=e.__noselect,delete e.__noselect)}var Zn=t=>()=>t;function Kn(t,{sourceEvent:n,subject:e,target:r,identifier:i,active:o,x:a,y:u,dx:c,dy:f,dispatch:s}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},subject:{value:e,enumerable:!0,configurable:!0},target:{value:r,enumerable:!0,configurable:!0},identifier:{value:i,enumerable:!0,configurable:!0},active:{value:o,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:u,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:f,enumerable:!0,configurable:!0},_:{value:s}})}function Qn(t){return!t.ctrlKey&&!t.button}function Jn(){return this.parentNode}function te(t,n){return null==n?{x:t.x,y:t.y}:n}function ne(){return navigator.maxTouchPoints||"ontouchstart"in this}function ee(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function re(t,n){var e=Object.create(t.prototype);for(var r in n)e[r]=n[r];return e}function ie(){}Kn.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};var oe=.7,ae=1/oe,ue="\\s*([+-]?\\d+)\\s*",ce="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",fe="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",se=/^#([0-9a-f]{3,8})$/,le=new RegExp("^rgb\\("+[ue,ue,ue]+"\\)$"),he=new RegExp("^rgb\\("+[fe,fe,fe]+"\\)$"),de=new RegExp("^rgba\\("+[ue,ue,ue,ce]+"\\)$"),pe=new RegExp("^rgba\\("+[fe,fe,fe,ce]+"\\)$"),ge=new RegExp("^hsl\\("+[ce,fe,fe]+"\\)$"),ye=new RegExp("^hsla\\("+[ce,fe,fe,ce]+"\\)$"),ve={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function _e(){return this.rgb().formatHex()}function be(){return this.rgb().formatRgb()}function me(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=se.exec(t))?(e=n[1].length,n=parseInt(n[1],16),6===e?xe(n):3===e?new Te(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?we(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?we(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=le.exec(t))?new Te(n[1],n[2],n[3],1):(n=he.exec(t))?new Te(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=de.exec(t))?we(n[1],n[2],n[3],n[4]):(n=pe.exec(t))?we(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=ge.exec(t))?Ne(n[1],n[2]/100,n[3]/100,1):(n=ye.exec(t))?Ne(n[1],n[2]/100,n[3]/100,n[4]):ve.hasOwnProperty(t)?xe(ve[t]):"transparent"===t?new Te(NaN,NaN,NaN,0):null}function xe(t){return new Te(t>>16&255,t>>8&255,255&t,1)}function we(t,n,e,r){return r<=0&&(t=n=e=NaN),new Te(t,n,e,r)}function Me(t){return t instanceof ie||(t=me(t)),t?new Te((t=t.rgb()).r,t.g,t.b,t.opacity):new Te}function Ae(t,n,e,r){return 1===arguments.length?Me(t):new Te(t,n,e,null==r?1:r)}function Te(t,n,e,r){this.r=+t,this.g=+n,this.b=+e,this.opacity=+r}function Se(){return"#"+ke(this.r)+ke(this.g)+ke(this.b)}function Ee(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function ke(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function Ne(t,n,e,r){return r<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new ze(t,n,e,r)}function Ce(t){if(t instanceof ze)return new ze(t.h,t.s,t.l,t.opacity);if(t instanceof ie||(t=me(t)),!t)return new ze;if(t instanceof ze)return t;var n=(t=t.rgb()).r/255,e=t.g/255,r=t.b/255,i=Math.min(n,e,r),o=Math.max(n,e,r),a=NaN,u=o-i,c=(o+i)/2;return u?(a=n===o?(e-r)/u+6*(e<r):e===o?(r-n)/u+2:(n-e)/u+4,u/=c<.5?o+i:2-o-i,a*=60):u=c>0&&c<1?0:a,new ze(a,u,c,t.opacity)}function Pe(t,n,e,r){return 1===arguments.length?Ce(t):new ze(t,n,e,null==r?1:r)}function ze(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function De(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}ee(ie,me,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:_e,formatHex:_e,formatHsl:function(){return Ce(this).formatHsl()},formatRgb:be,toString:be}),ee(Te,Ae,re(ie,{brighter:function(t){return t=null==t?ae:Math.pow(ae,t),new Te(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?oe:Math.pow(oe,t),new Te(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Se,formatHex:Se,formatRgb:Ee,toString:Ee})),ee(ze,Pe,re(ie,{brighter:function(t){return t=null==t?ae:Math.pow(ae,t),new ze(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?oe:Math.pow(oe,t),new ze(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,r=e+(e<.5?e:1-e)*n,i=2*e-r;return new Te(De(t>=240?t-240:t+120,i,r),De(t,i,r),De(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}));const qe=Math.PI/180,Re=180/Math.PI,Fe=.96422,Oe=.82521,Ue=4/29,Ie=6/29,Be=3*Ie*Ie;function Ye(t){if(t instanceof je)return new je(t.l,t.a,t.b,t.opacity);if(t instanceof Ze)return Ke(t);t instanceof Te||(t=Me(t));var n,e,r=Ve(t.r),i=Ve(t.g),o=Ve(t.b),a=He((.2225045*r+.7168786*i+.0606169*o)/1);return r===i&&i===o?n=e=a:(n=He((.4360747*r+.3850649*i+.1430804*o)/Fe),e=He((.0139322*r+.0971045*i+.7141733*o)/Oe)),new je(116*a-16,500*(n-a),200*(a-e),t.opacity)}function Le(t,n,e,r){return 1===arguments.length?Ye(t):new je(t,n,e,null==r?1:r)}function je(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function He(t){return t>.008856451679035631?Math.pow(t,1/3):t/Be+Ue}function Xe(t){return t>Ie?t*t*t:Be*(t-Ue)}function Ge(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Ve(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function $e(t){if(t instanceof Ze)return new Ze(t.h,t.c,t.l,t.opacity);if(t instanceof je||(t=Ye(t)),0===t.a&&0===t.b)return new Ze(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var n=Math.atan2(t.b,t.a)*Re;return new Ze(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function We(t,n,e,r){return 1===arguments.length?$e(t):new Ze(t,n,e,null==r?1:r)}function Ze(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function Ke(t){if(isNaN(t.h))return new je(t.l,0,0,t.opacity);var n=t.h*qe;return new je(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}ee(je,Le,re(ie,{brighter:function(t){return new je(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new je(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return new Te(Ge(3.1338561*(n=Fe*Xe(n))-1.6168667*(t=1*Xe(t))-.4906146*(e=Oe*Xe(e))),Ge(-.9787684*n+1.9161415*t+.033454*e),Ge(.0719453*n-.2289914*t+1.4052427*e),this.opacity)}})),ee(Ze,We,re(ie,{brighter:function(t){return new Ze(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new Ze(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return Ke(this).rgb()}}));var Qe=-.14861,Je=1.78277,tr=-.29227,nr=-.90649,er=1.97294,rr=er*nr,ir=er*Je,or=Je*tr-nr*Qe;function ar(t){if(t instanceof cr)return new cr(t.h,t.s,t.l,t.opacity);t instanceof Te||(t=Me(t));var n=t.r/255,e=t.g/255,r=t.b/255,i=(or*r+rr*n-ir*e)/(or+rr-ir),o=r-i,a=(er*(e-i)-tr*o)/nr,u=Math.sqrt(a*a+o*o)/(er*i*(1-i)),c=u?Math.atan2(a,o)*Re-120:NaN;return new cr(c<0?c+360:c,u,i,t.opacity)}function ur(t,n,e,r){return 1===arguments.length?ar(t):new cr(t,n,e,null==r?1:r)}function cr(t,n,e,r){this.h=+t,this.s=+n,this.l=+e,this.opacity=+r}function fr(t,n,e,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*n+(4-6*o+3*a)*e+(1+3*t+3*o-3*a)*r+a*i)/6}function sr(t){var n=t.length-1;return function(e){var r=e<=0?e=0:e>=1?(e=1,n-1):Math.floor(e*n),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,u=r<n-1?t[r+2]:2*o-i;return fr((e-r/n)*n,a,i,o,u)}}function lr(t){var n=t.length;return function(e){var r=Math.floor(((e%=1)<0?++e:e)*n),i=t[(r+n-1)%n],o=t[r%n],a=t[(r+1)%n],u=t[(r+2)%n];return fr((e-r/n)*n,i,o,a,u)}}ee(cr,ur,re(ie,{brighter:function(t){return t=null==t?ae:Math.pow(ae,t),new cr(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?oe:Math.pow(oe,t),new cr(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*qe,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new Te(255*(n+e*(Qe*r+Je*i)),255*(n+e*(tr*r+nr*i)),255*(n+e*(er*r)),this.opacity)}}));var hr=t=>()=>t;function dr(t,n){return function(e){return t+e*n}}function pr(t,n){var e=n-t;return e?dr(t,e>180||e<-180?e-360*Math.round(e/360):e):hr(isNaN(t)?n:t)}function gr(t){return 1==(t=+t)?yr:function(n,e){return e-n?function(t,n,e){return t=Math.pow(t,e),n=Math.pow(n,e)-t,e=1/e,function(r){return Math.pow(t+r*n,e)}}(n,e,t):hr(isNaN(n)?e:n)}}function yr(t,n){var e=n-t;return e?dr(t,e):hr(isNaN(t)?n:t)}var vr=function t(n){var e=gr(n);function r(t,n){var r=e((t=Ae(t)).r,(n=Ae(n)).r),i=e(t.g,n.g),o=e(t.b,n.b),a=yr(t.opacity,n.opacity);return function(n){return t.r=r(n),t.g=i(n),t.b=o(n),t.opacity=a(n),t+""}}return r.gamma=t,r}(1);function _r(t){return function(n){var e,r,i=n.length,o=new Array(i),a=new Array(i),u=new Array(i);for(e=0;e<i;++e)r=Ae(n[e]),o[e]=r.r||0,a[e]=r.g||0,u[e]=r.b||0;return o=t(o),a=t(a),u=t(u),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=u(t),r+""}}}var br=_r(sr),mr=_r(lr);function xr(t,n){n||(n=[]);var e,r=t?Math.min(n.length,t.length):0,i=n.slice();return function(o){for(e=0;e<r;++e)i[e]=t[e]*(1-o)+n[e]*o;return i}}function wr(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Mr(t,n){var e,r=n?n.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(e=0;e<i;++e)o[e]=Cr(t[e],n[e]);for(;e<r;++e)a[e]=n[e];return function(t){for(e=0;e<i;++e)a[e]=o[e](t);return a}}function Ar(t,n){var e=new Date;return t=+t,n=+n,function(r){return e.setTime(t*(1-r)+n*r),e}}function Tr(t,n){return t=+t,n=+n,function(e){return t*(1-e)+n*e}}function Sr(t,n){var e,r={},i={};for(e in null!==t&&"object"==typeof t||(t={}),null!==n&&"object"==typeof n||(n={}),n)e in t?r[e]=Cr(t[e],n[e]):i[e]=n[e];return function(t){for(e in r)i[e]=r[e](t);return i}}var Er=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,kr=new RegExp(Er.source,"g");function Nr(t,n){var e,r,i,o=Er.lastIndex=kr.lastIndex=0,a=-1,u=[],c=[];for(t+="",n+="";(e=Er.exec(t))&&(r=kr.exec(n));)(i=r.index)>o&&(i=n.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(e=e[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,c.push({i:a,x:Tr(e,r)})),o=kr.lastIndex;return o<n.length&&(i=n.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?c[0]?function(t){return function(n){return t(n)+""}}(c[0].x):function(t){return function(){return t}}(n):(n=c.length,function(t){for(var e,r=0;r<n;++r)u[(e=c[r]).i]=e.x(t);return u.join("")})}function Cr(t,n){var e,r=typeof n;return null==n||"boolean"===r?hr(n):("number"===r?Tr:"string"===r?(e=me(n))?(n=e,vr):Nr:n instanceof me?vr:n instanceof Date?Ar:wr(n)?xr:Array.isArray(n)?Mr:"function"!=typeof n.valueOf&&"function"!=typeof n.toString||isNaN(n)?Sr:Tr)(t,n)}function Pr(t,n){return t=+t,n=+n,function(e){return Math.round(t*(1-e)+n*e)}}var zr,Dr=180/Math.PI,qr={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Rr(t,n,e,r,i,o){var a,u,c;return(a=Math.sqrt(t*t+n*n))&&(t/=a,n/=a),(c=t*e+n*r)&&(e-=t*c,r-=n*c),(u=Math.sqrt(e*e+r*r))&&(e/=u,r/=u,c/=u),t*r<n*e&&(t=-t,n=-n,c=-c,a=-a),{translateX:i,translateY:o,rotate:Math.atan2(n,t)*Dr,skewX:Math.atan(c)*Dr,scaleX:a,scaleY:u}}function Fr(t,n,e,r){function i(t){return t.length?t.pop()+" ":""}return function(o,a){var u=[],c=[];return o=t(o),a=t(a),function(t,r,i,o,a,u){if(t!==i||r!==o){var c=a.push("translate(",null,n,null,e);u.push({i:c-4,x:Tr(t,i)},{i:c-2,x:Tr(r,o)})}else(i||o)&&a.push("translate("+i+n+o+e)}(o.translateX,o.translateY,a.translateX,a.translateY,u,c),function(t,n,e,o){t!==n?(t-n>180?n+=360:n-t>180&&(t+=360),o.push({i:e.push(i(e)+"rotate(",null,r)-2,x:Tr(t,n)})):n&&e.push(i(e)+"rotate("+n+r)}(o.rotate,a.rotate,u,c),function(t,n,e,o){t!==n?o.push({i:e.push(i(e)+"skewX(",null,r)-2,x:Tr(t,n)}):n&&e.push(i(e)+"skewX("+n+r)}(o.skewX,a.skewX,u,c),function(t,n,e,r,o,a){if(t!==e||n!==r){var u=o.push(i(o)+"scale(",null,",",null,")");a.push({i:u-4,x:Tr(t,e)},{i:u-2,x:Tr(n,r)})}else 1===e&&1===r||o.push(i(o)+"scale("+e+","+r+")")}(o.scaleX,o.scaleY,a.scaleX,a.scaleY,u,c),o=a=null,function(t){for(var n,e=-1,r=c.length;++e<r;)u[(n=c[e]).i]=n.x(t);return u.join("")}}}var Or=Fr((function(t){const n=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(t+"");return n.isIdentity?qr:Rr(n.a,n.b,n.c,n.d,n.e,n.f)}),"px, ","px)","deg)"),Ur=Fr((function(t){return null==t?qr:(zr||(zr=document.createElementNS("http://www.w3.org/2000/svg","g")),zr.setAttribute("transform",t),(t=zr.transform.baseVal.consolidate())?Rr((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):qr)}),", ",")",")");function Ir(t){return((t=Math.exp(t))+1/t)/2}var Br=function t(n,e,r){function i(t,i){var o,a,u=t[0],c=t[1],f=t[2],s=i[0],l=i[1],h=i[2],d=s-u,p=l-c,g=d*d+p*p;if(g<1e-12)a=Math.log(h/f)/n,o=function(t){return[u+t*d,c+t*p,f*Math.exp(n*t*a)]};else{var y=Math.sqrt(g),v=(h*h-f*f+r*g)/(2*f*e*y),_=(h*h-f*f-r*g)/(2*h*e*y),b=Math.log(Math.sqrt(v*v+1)-v),m=Math.log(Math.sqrt(_*_+1)-_);a=(m-b)/n,o=function(t){var r=t*a,i=Ir(b),o=f/(e*y)*(i*function(t){return((t=Math.exp(2*t))-1)/(t+1)}(n*r+b)-function(t){return((t=Math.exp(t))-1/t)/2}(b));return[u+o*d,c+o*p,f*i/Ir(n*r+b)]}}return o.duration=1e3*a*n/Math.SQRT2,o}return i.rho=function(n){var e=Math.max(.001,+n),r=e*e;return t(e,r,r*r)},i}(Math.SQRT2,2,4);function Yr(t){return function(n,e){var r=t((n=Pe(n)).h,(e=Pe(e)).h),i=yr(n.s,e.s),o=yr(n.l,e.l),a=yr(n.opacity,e.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(t),n.opacity=a(t),n+""}}}var Lr=Yr(pr),jr=Yr(yr);function Hr(t){return function(n,e){var r=t((n=We(n)).h,(e=We(e)).h),i=yr(n.c,e.c),o=yr(n.l,e.l),a=yr(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=a(t),n+""}}}var Xr=Hr(pr),Gr=Hr(yr);function Vr(t){return function n(e){function r(n,r){var i=t((n=ur(n)).h,(r=ur(r)).h),o=yr(n.s,r.s),a=yr(n.l,r.l),u=yr(n.opacity,r.opacity);return function(t){return n.h=i(t),n.s=o(t),n.l=a(Math.pow(t,e)),n.opacity=u(t),n+""}}return e=+e,r.gamma=n,r}(1)}var $r=Vr(pr),Wr=Vr(yr);function Zr(t,n){void 0===n&&(n=t,t=Cr);for(var e=0,r=n.length-1,i=n[0],o=new Array(r<0?0:r);e<r;)o[e]=t(i,i=n[++e]);return function(t){var n=Math.max(0,Math.min(r-1,Math.floor(t*=r)));return o[n](t-n)}}var Kr,Qr,Jr=0,ti=0,ni=0,ei=0,ri=0,ii=0,oi="object"==typeof performance&&performance.now?performance:Date,ai="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function ui(){return ri||(ai(ci),ri=oi.now()+ii)}function ci(){ri=0}function fi(){this._call=this._time=this._next=null}function si(t,n,e){var r=new fi;return r.restart(t,n,e),r}function li(){ui(),++Jr;for(var t,n=Kr;n;)(t=ri-n._time)>=0&&n._call.call(void 0,t),n=n._next;--Jr}function hi(){ri=(ei=oi.now())+ii,Jr=ti=0;try{li()}finally{Jr=0,function(){var t,n,e=Kr,r=1/0;for(;e;)e._call?(r>e._time&&(r=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:Kr=n);Qr=t,pi(r)}(),ri=0}}function di(){var t=oi.now(),n=t-ei;n>1e3&&(ii-=n,ei=t)}function pi(t){Jr||(ti&&(ti=clearTimeout(ti)),t-ri>24?(t<1/0&&(ti=setTimeout(hi,t-oi.now()-ii)),ni&&(ni=clearInterval(ni))):(ni||(ei=oi.now(),ni=setInterval(di,1e3)),Jr=1,ai(hi)))}function gi(t,n,e){var r=new fi;return n=null==n?0:+n,r.restart((e=>{r.stop(),t(e+n)}),n,e),r}fi.prototype=si.prototype={constructor:fi,restart:function(t,n,e){if("function"!=typeof t)throw new TypeError("callback is not a function");e=(null==e?ui():+e)+(null==n?0:+n),this._next||Qr===this||(Qr?Qr._next=this:Kr=this,Qr=this),this._call=t,this._time=e,pi()},stop:function(){this._call&&(this._call=null,this._time=1/0,pi())}};var yi=_t("start","end","cancel","interrupt"),vi=[];function _i(t,n,e,r,i,o){var a=t.__transition;if(a){if(e in a)return}else t.__transition={};!function(t,n,e){var r,i=t.__transition;function o(t){e.state=1,e.timer.restart(a,e.delay,e.time),e.delay<=t&&a(t-e.delay)}function a(o){var f,s,l,h;if(1!==e.state)return c();for(f in i)if((h=i[f]).name===e.name){if(3===h.state)return gi(a);4===h.state?(h.state=6,h.timer.stop(),h.on.call("interrupt",t,t.__data__,h.index,h.group),delete i[f]):+f<n&&(h.state=6,h.timer.stop(),h.on.call("cancel",t,t.__data__,h.index,h.group),delete i[f])}if(gi((function(){3===e.state&&(e.state=4,e.timer.restart(u,e.delay,e.time),u(o))})),e.state=2,e.on.call("start",t,t.__data__,e.index,e.group),2===e.state){for(e.state=3,r=new Array(l=e.tween.length),f=0,s=-1;f<l;++f)(h=e.tween[f].value.call(t,t.__data__,e.index,e.group))&&(r[++s]=h);r.length=s+1}}function u(n){for(var i=n<e.duration?e.ease.call(null,n/e.duration):(e.timer.restart(c),e.state=5,1),o=-1,a=r.length;++o<a;)r[o].call(t,i);5===e.state&&(e.on.call("end",t,t.__data__,e.index,e.group),c())}function c(){for(var r in e.state=6,e.timer.stop(),delete i[n],i)return;delete t.__transition}i[n]=e,e.timer=si(o,0,e.time)}(t,e,{name:n,index:r,group:i,on:yi,tween:vi,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:0})}function bi(t,n){var e=xi(t,n);if(e.state>0)throw new Error("too late; already scheduled");return e}function mi(t,n){var e=xi(t,n);if(e.state>3)throw new Error("too late; already running");return e}function xi(t,n){var e=t.__transition;if(!e||!(e=e[n]))throw new Error("transition not found");return e}function wi(t,n){var e,r,i,o=t.__transition,a=!0;if(o){for(i in n=null==n?null:n+"",o)(e=o[i]).name===n?(r=e.state>2&&e.state<5,e.state=6,e.timer.stop(),e.on.call(r?"interrupt":"cancel",t,t.__data__,e.index,e.group),delete o[i]):a=!1;a&&delete t.__transition}}function Mi(t,n){var e,r;return function(){var i=mi(this,t),o=i.tween;if(o!==e)for(var a=0,u=(r=e=o).length;a<u;++a)if(r[a].name===n){(r=r.slice()).splice(a,1);break}i.tween=r}}function Ai(t,n,e){var r,i;if("function"!=typeof e)throw new Error;return function(){var o=mi(this,t),a=o.tween;if(a!==r){i=(r=a).slice();for(var u={name:n,value:e},c=0,f=i.length;c<f;++c)if(i[c].name===n){i[c]=u;break}c===f&&i.push(u)}o.tween=i}}function Ti(t,n,e){var r=t._id;return t.each((function(){var t=mi(this,r);(t.value||(t.value={}))[n]=e.apply(this,arguments)})),function(t){return xi(t,r).value[n]}}function Si(t,n){var e;return("number"==typeof n?Tr:n instanceof me?vr:(e=me(n))?(n=e,vr):Nr)(t,n)}function Ei(t){return function(){this.removeAttribute(t)}}function ki(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Ni(t,n,e){var r,i,o=e+"";return function(){var a=this.getAttribute(t);return a===o?null:a===r?i:i=n(r=a,e)}}function Ci(t,n,e){var r,i,o=e+"";return function(){var a=this.getAttributeNS(t.space,t.local);return a===o?null:a===r?i:i=n(r=a,e)}}function Pi(t,n,e){var r,i,o;return function(){var a,u,c=e(this);if(null!=c)return(a=this.getAttribute(t))===(u=c+"")?null:a===r&&u===i?o:(i=u,o=n(r=a,c));this.removeAttribute(t)}}function zi(t,n,e){var r,i,o;return function(){var a,u,c=e(this);if(null!=c)return(a=this.getAttributeNS(t.space,t.local))===(u=c+"")?null:a===r&&u===i?o:(i=u,o=n(r=a,c));this.removeAttributeNS(t.space,t.local)}}function Di(t,n){return function(e){this.setAttribute(t,n.call(this,e))}}function qi(t,n){return function(e){this.setAttributeNS(t.space,t.local,n.call(this,e))}}function Ri(t,n){var e,r;function i(){var i=n.apply(this,arguments);return i!==r&&(e=(r=i)&&qi(t,i)),e}return i._value=n,i}function Fi(t,n){var e,r;function i(){var i=n.apply(this,arguments);return i!==r&&(e=(r=i)&&Di(t,i)),e}return i._value=n,i}function Oi(t,n){return function(){bi(this,t).delay=+n.apply(this,arguments)}}function Ui(t,n){return n=+n,function(){bi(this,t).delay=n}}function Ii(t,n){return function(){mi(this,t).duration=+n.apply(this,arguments)}}function Bi(t,n){return n=+n,function(){mi(this,t).duration=n}}function Yi(t,n){if("function"!=typeof n)throw new Error;return function(){mi(this,t).ease=n}}function Li(t,n,e){var r,i,o=function(t){return(t+"").trim().split(/^|\s+/).every((function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||"start"===t}))}(n)?bi:mi;return function(){var a=o(this,t),u=a.on;u!==r&&(i=(r=u).copy()).on(n,e),a.on=i}}var ji=On.prototype.constructor;function Hi(t){return function(){this.style.removeProperty(t)}}function Xi(t,n,e){return function(r){this.style.setProperty(t,n.call(this,r),e)}}function Gi(t,n,e){var r,i;function o(){var o=n.apply(this,arguments);return o!==i&&(r=(i=o)&&Xi(t,o,e)),r}return o._value=n,o}function Vi(t){return function(n){this.textContent=t.call(this,n)}}function $i(t){var n,e;function r(){var r=t.apply(this,arguments);return r!==e&&(n=(e=r)&&Vi(r)),n}return r._value=t,r}var Wi=0;function Zi(t,n,e,r){this._groups=t,this._parents=n,this._name=e,this._id=r}function Ki(t){return On().transition(t)}function Qi(){return++Wi}var Ji=On.prototype;Zi.prototype=Ki.prototype={constructor:Zi,select:function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Ct(t));for(var r=this._groups,i=r.length,o=new Array(i),a=0;a<i;++a)for(var u,c,f=r[a],s=f.length,l=o[a]=new Array(s),h=0;h<s;++h)(u=f[h])&&(c=t.call(u,u.__data__,h,f))&&("__data__"in u&&(c.__data__=u.__data__),l[h]=c,_i(l[h],n,e,h,l,xi(u,e)));return new Zi(o,this._parents,n,e)},selectAll:function(t){var n=this._name,e=this._id;"function"!=typeof t&&(t=Dt(t));for(var r=this._groups,i=r.length,o=[],a=[],u=0;u<i;++u)for(var c,f=r[u],s=f.length,l=0;l<s;++l)if(c=f[l]){for(var h,d=t.call(c,c.__data__,l,f),p=xi(c,e),g=0,y=d.length;g<y;++g)(h=d[g])&&_i(h,n,e,g,d,p);o.push(d),a.push(c)}return new Zi(o,a,n,e)},selectChild:Ji.selectChild,selectChildren:Ji.selectChildren,filter:function(t){"function"!=typeof t&&(t=qt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a=n[i],u=a.length,c=r[i]=[],f=0;f<u;++f)(o=a[f])&&t.call(o,o.__data__,f,a)&&c.push(o);return new Zi(r,this._parents,this._name,this._id)},merge:function(t){if(t._id!==this._id)throw new Error;for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),a=new Array(r),u=0;u<o;++u)for(var c,f=n[u],s=e[u],l=f.length,h=a[u]=new Array(l),d=0;d<l;++d)(c=f[d]||s[d])&&(h[d]=c);for(;u<r;++u)a[u]=n[u];return new Zi(a,this._parents,this._name,this._id)},selection:function(){return new ji(this._groups,this._parents)},transition:function(){for(var t=this._name,n=this._id,e=Qi(),r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,f=0;f<c;++f)if(a=u[f]){var s=xi(a,n);_i(a,t,e,f,u,{time:s.time+s.delay+s.duration,delay:0,duration:s.duration,ease:s.ease})}return new Zi(r,this._parents,t,e)},call:Ji.call,nodes:Ji.nodes,node:Ji.node,size:Ji.size,empty:Ji.empty,each:Ji.each,on:function(t,n){var e=this._id;return arguments.length<2?xi(this.node(),e).on.on(t):this.each(Li(e,t,n))},attr:function(t,n){var e=Tt(t),r="transform"===e?Ur:Si;return this.attrTween(t,"function"==typeof n?(e.local?zi:Pi)(e,r,Ti(this,"attr."+t,n)):null==n?(e.local?ki:Ei)(e):(e.local?Ci:Ni)(e,r,n))},attrTween:function(t,n){var e="attr."+t;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(null==n)return this.tween(e,null);if("function"!=typeof n)throw new Error;var r=Tt(t);return this.tween(e,(r.local?Ri:Fi)(r,n))},style:function(t,n,e){var r="transform"==(t+="")?Or:Si;return null==n?this.styleTween(t,function(t,n){var e,r,i;return function(){var o=on(this,t),a=(this.style.removeProperty(t),on(this,t));return o===a?null:o===e&&a===r?i:i=n(e=o,r=a)}}(t,r)).on("end.style."+t,Hi(t)):"function"==typeof n?this.styleTween(t,function(t,n,e){var r,i,o;return function(){var a=on(this,t),u=e(this),c=u+"";return null==u&&(this.style.removeProperty(t),c=u=on(this,t)),a===c?null:a===r&&c===i?o:(i=c,o=n(r=a,u))}}(t,r,Ti(this,"style."+t,n))).each(function(t,n){var e,r,i,o,a="style."+n,u="end."+a;return function(){var c=mi(this,t),f=c.on,s=null==c.value[a]?o||(o=Hi(n)):void 0;f===e&&i===s||(r=(e=f).copy()).on(u,i=s),c.on=r}}(this._id,t)):this.styleTween(t,function(t,n,e){var r,i,o=e+"";return function(){var a=on(this,t);return a===o?null:a===r?i:i=n(r=a,e)}}(t,r,n),e).on("end.style."+t,null)},styleTween:function(t,n,e){var r="style."+(t+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(null==n)return this.tween(r,null);if("function"!=typeof n)throw new Error;return this.tween(r,Gi(t,n,null==e?"":e))},text:function(t){return this.tween("text","function"==typeof t?function(t){return function(){var n=t(this);this.textContent=null==n?"":n}}(Ti(this,"text",t)):function(t){return function(){this.textContent=t}}(null==t?"":t+""))},textTween:function(t){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(null==t)return this.tween(n,null);if("function"!=typeof t)throw new Error;return this.tween(n,$i(t))},remove:function(){return this.on("end.remove",function(t){return function(){var n=this.parentNode;for(var e in this.__transition)if(+e!==t)return;n&&n.removeChild(this)}}(this._id))},tween:function(t,n){var e=this._id;if(t+="",arguments.length<2){for(var r,i=xi(this.node(),e).tween,o=0,a=i.length;o<a;++o)if((r=i[o]).name===t)return r.value;return null}return this.each((null==n?Mi:Ai)(e,t,n))},delay:function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?Oi:Ui)(n,t)):xi(this.node(),n).delay},duration:function(t){var n=this._id;return arguments.length?this.each(("function"==typeof t?Ii:Bi)(n,t)):xi(this.node(),n).duration},ease:function(t){var n=this._id;return arguments.length?this.each(Yi(n,t)):xi(this.node(),n).ease},easeVarying:function(t){if("function"!=typeof t)throw new Error;return this.each(function(t,n){return function(){var e=n.apply(this,arguments);if("function"!=typeof e)throw new Error;mi(this,t).ease=e}}(this._id,t))},end:function(){var t,n,e=this,r=e._id,i=e.size();return new Promise((function(o,a){var u={value:a},c={value:function(){0==--i&&o()}};e.each((function(){var e=mi(this,r),i=e.on;i!==t&&((n=(t=i).copy())._.cancel.push(u),n._.interrupt.push(u),n._.end.push(c)),e.on=n})),0===i&&o()}))},[Symbol.iterator]:Ji[Symbol.iterator]};function to(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}function no(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var eo=function t(n){function e(t){return Math.pow(t,n)}return n=+n,e.exponent=t,e}(3),ro=function t(n){function e(t){return 1-Math.pow(1-t,n)}return n=+n,e.exponent=t,e}(3),io=function t(n){function e(t){return((t*=2)<=1?Math.pow(t,n):2-Math.pow(2-t,n))/2}return n=+n,e.exponent=t,e}(3),oo=Math.PI,ao=oo/2;function uo(t){return(1-Math.cos(oo*t))/2}function co(t){return 1.0009775171065494*(Math.pow(2,-10*t)-.0009765625)}function fo(t){return((t*=2)<=1?co(1-t):2-co(t-1))/2}function so(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}var lo=4/11,ho=7.5625;function po(t){return(t=+t)<lo?ho*t*t:t<.7272727272727273?ho*(t-=.5454545454545454)*t+.75:t<.9090909090909091?ho*(t-=.8181818181818182)*t+.9375:ho*(t-=.9545454545454546)*t+.984375}var go=1.70158,yo=function t(n){function e(t){return(t=+t)*t*(n*(t-1)+t)}return n=+n,e.overshoot=t,e}(go),vo=function t(n){function e(t){return--t*t*((t+1)*n+t)+1}return n=+n,e.overshoot=t,e}(go),_o=function t(n){function e(t){return((t*=2)<1?t*t*((n+1)*t-n):(t-=2)*t*((n+1)*t+n)+2)/2}return n=+n,e.overshoot=t,e}(go),bo=2*Math.PI,mo=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=bo);function i(t){return n*co(- --t)*Math.sin((r-t)/e)}return i.amplitude=function(n){return t(n,e*bo)},i.period=function(e){return t(n,e)},i}(1,.3),xo=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=bo);function i(t){return 1-n*co(t=+t)*Math.sin((t+r)/e)}return i.amplitude=function(n){return t(n,e*bo)},i.period=function(e){return t(n,e)},i}(1,.3),wo=function t(n,e){var r=Math.asin(1/(n=Math.max(1,n)))*(e/=bo);function i(t){return((t=2*t-1)<0?n*co(-t)*Math.sin((r-t)/e):2-n*co(t)*Math.sin((r+t)/e))/2}return i.amplitude=function(n){return t(n,e*bo)},i.period=function(e){return t(n,e)},i}(1,.3),Mo={time:null,delay:0,duration:250,ease:no};function Ao(t,n){for(var e;!(e=t.__transition)||!(e=e[n]);)if(!(t=t.parentNode))throw new Error(`transition ${n} not found`);return e}On.prototype.interrupt=function(t){return this.each((function(){wi(this,t)}))},On.prototype.transition=function(t){var n,e;t instanceof Zi?(n=t._id,t=t._name):(n=Qi(),(e=Mo).time=ui(),t=null==t?null:t+"");for(var r=this._groups,i=r.length,o=0;o<i;++o)for(var a,u=r[o],c=u.length,f=0;f<c;++f)(a=u[f])&&_i(a,t,n,f,u,e||Ao(a,n));return new Zi(r,this._parents,t,n)};var To=[null];var So=t=>()=>t;function Eo(t,{sourceEvent:n,target:e,selection:r,mode:i,dispatch:o}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},selection:{value:r,enumerable:!0,configurable:!0},mode:{value:i,enumerable:!0,configurable:!0},_:{value:o}})}function ko(t){t.stopImmediatePropagation()}function No(t){t.preventDefault(),t.stopImmediatePropagation()}var Co={name:"drag"},Po={name:"space"},zo={name:"handle"},Do={name:"center"};const{abs:qo,max:Ro,min:Fo}=Math;function Oo(t){return[+t[0],+t[1]]}function Uo(t){return[Oo(t[0]),Oo(t[1])]}var Io={name:"x",handles:["w","e"].map(Vo),input:function(t,n){return null==t?null:[[+t[0],n[0][1]],[+t[1],n[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},Bo={name:"y",handles:["n","s"].map(Vo),input:function(t,n){return null==t?null:[[n[0][0],+t[0]],[n[1][0],+t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},Yo={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(Vo),input:function(t){return null==t?null:Uo(t)},output:function(t){return t}},Lo={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},jo={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},Ho={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},Xo={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},Go={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};function Vo(t){return{type:t}}function $o(t){return!t.ctrlKey&&!t.button}function Wo(){var t=this.ownerSVGElement||this;return t.hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function Zo(){return navigator.maxTouchPoints||"ontouchstart"in this}function Ko(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function Qo(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function Jo(t){var n,e=Wo,r=$o,i=Zo,o=!0,a=_t("start","brush","end"),u=6;function c(n){var e=n.property("__brush",g).selectAll(".overlay").data([Vo("overlay")]);e.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",Lo.overlay).merge(e).each((function(){var t=Ko(this).extent;Un(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])})),n.selectAll(".selection").data([Vo("selection")]).enter().append("rect").attr("class","selection").attr("cursor",Lo.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var r=n.selectAll(".handle").data(t.handles,(function(t){return t.type}));r.exit().remove(),r.enter().append("rect").attr("class",(function(t){return"handle handle--"+t.type})).attr("cursor",(function(t){return Lo[t.type]})),n.each(f).attr("fill","none").attr("pointer-events","all").on("mousedown.brush",h).filter(i).on("touchstart.brush",h).on("touchmove.brush",d).on("touchend.brush touchcancel.brush",p).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function f(){var t=Un(this),n=Ko(this).selection;n?(t.selectAll(".selection").style("display",null).attr("x",n[0][0]).attr("y",n[0][1]).attr("width",n[1][0]-n[0][0]).attr("height",n[1][1]-n[0][1]),t.selectAll(".handle").style("display",null).attr("x",(function(t){return"e"===t.type[t.type.length-1]?n[1][0]-u/2:n[0][0]-u/2})).attr("y",(function(t){return"s"===t.type[0]?n[1][1]-u/2:n[0][1]-u/2})).attr("width",(function(t){return"n"===t.type||"s"===t.type?n[1][0]-n[0][0]+u:u})).attr("height",(function(t){return"e"===t.type||"w"===t.type?n[1][1]-n[0][1]+u:u}))):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function s(t,n,e){var r=t.__brush.emitter;return!r||e&&r.clean?new l(t,n,e):r}function l(t,n,e){this.that=t,this.args=n,this.state=t.__brush,this.active=0,this.clean=e}function h(e){if((!n||e.touches)&&r.apply(this,arguments)){var i,a,u,c,l,h,d,p,g,y,v,_=this,b=e.target.__data__.type,m="selection"===(o&&e.metaKey?b="overlay":b)?Co:o&&e.altKey?Do:zo,x=t===Bo?null:Xo[b],w=t===Io?null:Go[b],M=Ko(_),A=M.extent,T=M.selection,S=A[0][0],E=A[0][1],k=A[1][0],N=A[1][1],C=0,P=0,z=x&&w&&o&&e.shiftKey,D=Array.from(e.touches||[e],(t=>{const n=t.identifier;return(t=jn(t,_)).point0=t.slice(),t.identifier=n,t}));wi(_);var q=s(_,arguments,!0).beforestart();if("overlay"===b){T&&(g=!0);const n=[D[0],D[1]||D[0]];M.selection=T=[[i=t===Bo?S:Fo(n[0][0],n[1][0]),u=t===Io?E:Fo(n[0][1],n[1][1])],[l=t===Bo?k:Ro(n[0][0],n[1][0]),d=t===Io?N:Ro(n[0][1],n[1][1])]],D.length>1&&I(e)}else i=T[0][0],u=T[0][1],l=T[1][0],d=T[1][1];a=i,c=u,h=l,p=d;var R=Un(_).attr("pointer-events","none"),F=R.selectAll(".overlay").attr("cursor",Lo[b]);if(e.touches)q.moved=U,q.ended=B;else{var O=Un(e.view).on("mousemove.brush",U,!0).on("mouseup.brush",B,!0);o&&O.on("keydown.brush",Y,!0).on("keyup.brush",L,!0),$n(e.view)}f.call(_),q.start(e,m.name)}function U(t){for(const n of t.changedTouches||[t])for(const t of D)t.identifier===n.identifier&&(t.cur=jn(n,_));if(z&&!y&&!v&&1===D.length){const t=D[0];qo(t.cur[0]-t[0])>qo(t.cur[1]-t[1])?v=!0:y=!0}for(const t of D)t.cur&&(t[0]=t.cur[0],t[1]=t.cur[1]);g=!0,No(t),I(t)}function I(t){const n=D[0],e=n.point0;var r;switch(C=n[0]-e[0],P=n[1]-e[1],m){case Po:case Co:x&&(C=Ro(S-i,Fo(k-l,C)),a=i+C,h=l+C),w&&(P=Ro(E-u,Fo(N-d,P)),c=u+P,p=d+P);break;case zo:D[1]?(x&&(a=Ro(S,Fo(k,D[0][0])),h=Ro(S,Fo(k,D[1][0])),x=1),w&&(c=Ro(E,Fo(N,D[0][1])),p=Ro(E,Fo(N,D[1][1])),w=1)):(x<0?(C=Ro(S-i,Fo(k-i,C)),a=i+C,h=l):x>0&&(C=Ro(S-l,Fo(k-l,C)),a=i,h=l+C),w<0?(P=Ro(E-u,Fo(N-u,P)),c=u+P,p=d):w>0&&(P=Ro(E-d,Fo(N-d,P)),c=u,p=d+P));break;case Do:x&&(a=Ro(S,Fo(k,i-C*x)),h=Ro(S,Fo(k,l+C*x))),w&&(c=Ro(E,Fo(N,u-P*w)),p=Ro(E,Fo(N,d+P*w)))}h<a&&(x*=-1,r=i,i=l,l=r,r=a,a=h,h=r,b in jo&&F.attr("cursor",Lo[b=jo[b]])),p<c&&(w*=-1,r=u,u=d,d=r,r=c,c=p,p=r,b in Ho&&F.attr("cursor",Lo[b=Ho[b]])),M.selection&&(T=M.selection),y&&(a=T[0][0],h=T[1][0]),v&&(c=T[0][1],p=T[1][1]),T[0][0]===a&&T[0][1]===c&&T[1][0]===h&&T[1][1]===p||(M.selection=[[a,c],[h,p]],f.call(_),q.brush(t,m.name))}function B(t){if(ko(t),t.touches){if(t.touches.length)return;n&&clearTimeout(n),n=setTimeout((function(){n=null}),500)}else Wn(t.view,g),O.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);R.attr("pointer-events","all"),F.attr("cursor",Lo.overlay),M.selection&&(T=M.selection),Qo(T)&&(M.selection=null,f.call(_)),q.end(t,m.name)}function Y(t){switch(t.keyCode){case 16:z=x&&w;break;case 18:m===zo&&(x&&(l=h-C*x,i=a+C*x),w&&(d=p-P*w,u=c+P*w),m=Do,I(t));break;case 32:m!==zo&&m!==Do||(x<0?l=h-C:x>0&&(i=a-C),w<0?d=p-P:w>0&&(u=c-P),m=Po,F.attr("cursor",Lo.selection),I(t));break;default:return}No(t)}function L(t){switch(t.keyCode){case 16:z&&(y=v=z=!1,I(t));break;case 18:m===Do&&(x<0?l=h:x>0&&(i=a),w<0?d=p:w>0&&(u=c),m=zo,I(t));break;case 32:m===Po&&(t.altKey?(x&&(l=h-C*x,i=a+C*x),w&&(d=p-P*w,u=c+P*w),m=Do):(x<0?l=h:x>0&&(i=a),w<0?d=p:w>0&&(u=c),m=zo),F.attr("cursor",Lo[b]),I(t));break;default:return}No(t)}}function d(t){s(this,arguments).moved(t)}function p(t){s(this,arguments).ended(t)}function g(){var n=this.__brush||{selection:null};return n.extent=Uo(e.apply(this,arguments)),n.dim=t,n}return c.move=function(n,e,r){n.tween?n.on("start.brush",(function(t){s(this,arguments).beforestart().start(t)})).on("interrupt.brush end.brush",(function(t){s(this,arguments).end(t)})).tween("brush",(function(){var n=this,r=n.__brush,i=s(n,arguments),o=r.selection,a=t.input("function"==typeof e?e.apply(this,arguments):e,r.extent),u=Cr(o,a);function c(t){r.selection=1===t&&null===a?null:u(t),f.call(n),i.brush()}return null!==o&&null!==a?c:c(1)})):n.each((function(){var n=this,i=arguments,o=n.__brush,a=t.input("function"==typeof e?e.apply(n,i):e,o.extent),u=s(n,i).beforestart();wi(n),o.selection=null===a?null:a,f.call(n),u.start(r).brush(r).end(r)}))},c.clear=function(t,n){c.move(t,null,n)},l.prototype={beforestart:function(){return 1==++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(t,n){return this.starting?(this.starting=!1,this.emit("start",t,n)):this.emit("brush",t),this},brush:function(t,n){return this.emit("brush",t,n),this},end:function(t,n){return 0==--this.active&&(delete this.state.emitter,this.emit("end",t,n)),this},emit:function(n,e,r){var i=Un(this.that).datum();a.call(n,this.that,new Eo(n,{sourceEvent:e,target:c,selection:t.output(this.state.selection),mode:r,dispatch:a}),i)}},c.extent=function(t){return arguments.length?(e="function"==typeof t?t:So(Uo(t)),c):e},c.filter=function(t){return arguments.length?(r="function"==typeof t?t:So(!!t),c):r},c.touchable=function(t){return arguments.length?(i="function"==typeof t?t:So(!!t),c):i},c.handleSize=function(t){return arguments.length?(u=+t,c):u},c.keyModifiers=function(t){return arguments.length?(o=!!t,c):o},c.on=function(){var t=a.on.apply(a,arguments);return t===a?c:t},c}var ta=Math.abs,na=Math.cos,ea=Math.sin,ra=Math.PI,ia=ra/2,oa=2*ra,aa=Math.max,ua=1e-12;function ca(t,n){return Array.from({length:n-t},((n,e)=>t+e))}function fa(t){return function(n,e){return t(n.source.value+n.target.value,e.source.value+e.target.value)}}function sa(t,n){var e=0,r=null,i=null,o=null;function a(a){var u,c=a.length,f=new Array(c),s=ca(0,c),l=new Array(c*c),h=new Array(c),d=0;a=Float64Array.from({length:c*c},n?(t,n)=>a[n%c][n/c|0]:(t,n)=>a[n/c|0][n%c]);for(let n=0;n<c;++n){let e=0;for(let r=0;r<c;++r)e+=a[n*c+r]+t*a[r*c+n];d+=f[n]=e}u=(d=aa(0,oa-e*c)/d)?e:oa/c;{let n=0;r&&s.sort(((t,n)=>r(f[t],f[n])));for(const e of s){const r=n;if(t){const t=ca(1+~c,c).filter((t=>t<0?a[~t*c+e]:a[e*c+t]));i&&t.sort(((t,n)=>i(t<0?-a[~t*c+e]:a[e*c+t],n<0?-a[~n*c+e]:a[e*c+n])));for(const r of t)if(r<0){(l[~r*c+e]||(l[~r*c+e]={source:null,target:null})).target={index:e,startAngle:n,endAngle:n+=a[~r*c+e]*d,value:a[~r*c+e]}}else{(l[e*c+r]||(l[e*c+r]={source:null,target:null})).source={index:e,startAngle:n,endAngle:n+=a[e*c+r]*d,value:a[e*c+r]}}h[e]={index:e,startAngle:r,endAngle:n,value:f[e]}}else{const t=ca(0,c).filter((t=>a[e*c+t]||a[t*c+e]));i&&t.sort(((t,n)=>i(a[e*c+t],a[e*c+n])));for(const r of t){let t;if(e<r?(t=l[e*c+r]||(l[e*c+r]={source:null,target:null}),t.source={index:e,startAngle:n,endAngle:n+=a[e*c+r]*d,value:a[e*c+r]}):(t=l[r*c+e]||(l[r*c+e]={source:null,target:null}),t.target={index:e,startAngle:n,endAngle:n+=a[e*c+r]*d,value:a[e*c+r]},e===r&&(t.source=t.target)),t.source&&t.target&&t.source.value<t.target.value){const n=t.source;t.source=t.target,t.target=n}}h[e]={index:e,startAngle:r,endAngle:n,value:f[e]}}n+=u}}return(l=Object.values(l)).groups=h,o?l.sort(o):l}return a.padAngle=function(t){return arguments.length?(e=aa(0,t),a):e},a.sortGroups=function(t){return arguments.length?(r=t,a):r},a.sortSubgroups=function(t){return arguments.length?(i=t,a):i},a.sortChords=function(t){return arguments.length?(null==t?o=null:(o=fa(t))._=t,a):o&&o._},a}const la=Math.PI,ha=2*la,da=1e-6,pa=ha-da;function ga(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function ya(){return new ga}ga.prototype=ya.prototype={constructor:ga,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,r){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+r)},bezierCurveTo:function(t,n,e,r,i,o){this._+="C"+ +t+","+ +n+","+ +e+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,n,e,r,i){t=+t,n=+n,e=+e,r=+r,i=+i;var o=this._x1,a=this._y1,u=e-t,c=r-n,f=o-t,s=a-n,l=f*f+s*s;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(l>da)if(Math.abs(s*u-c*f)>da&&i){var h=e-o,d=r-a,p=u*u+c*c,g=h*h+d*d,y=Math.sqrt(p),v=Math.sqrt(l),_=i*Math.tan((la-Math.acos((p+l-g)/(2*y*v)))/2),b=_/v,m=_/y;Math.abs(b-1)>da&&(this._+="L"+(t+b*f)+","+(n+b*s)),this._+="A"+i+","+i+",0,0,"+ +(s*h>f*d)+","+(this._x1=t+m*u)+","+(this._y1=n+m*c)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,r,i,o){t=+t,n=+n,o=!!o;var a=(e=+e)*Math.cos(r),u=e*Math.sin(r),c=t+a,f=n+u,s=1^o,l=o?r-i:i-r;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+c+","+f:(Math.abs(this._x1-c)>da||Math.abs(this._y1-f)>da)&&(this._+="L"+c+","+f),e&&(l<0&&(l=l%ha+ha),l>pa?this._+="A"+e+","+e+",0,1,"+s+","+(t-a)+","+(n-u)+"A"+e+","+e+",0,1,"+s+","+(this._x1=c)+","+(this._y1=f):l>da&&(this._+="A"+e+","+e+",0,"+ +(l>=la)+","+s+","+(this._x1=t+e*Math.cos(i))+","+(this._y1=n+e*Math.sin(i))))},rect:function(t,n,e,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +r+"h"+-e+"Z"},toString:function(){return this._}};var va=Array.prototype.slice;function _a(t){return function(){return t}}function ba(t){return t.source}function ma(t){return t.target}function xa(t){return t.radius}function wa(t){return t.startAngle}function Ma(t){return t.endAngle}function Aa(){return 0}function Ta(){return 10}function Sa(t){var n=ba,e=ma,r=xa,i=xa,o=wa,a=Ma,u=Aa,c=null;function f(){var f,s=n.apply(this,arguments),l=e.apply(this,arguments),h=u.apply(this,arguments)/2,d=va.call(arguments),p=+r.apply(this,(d[0]=s,d)),g=o.apply(this,d)-ia,y=a.apply(this,d)-ia,v=+i.apply(this,(d[0]=l,d)),_=o.apply(this,d)-ia,b=a.apply(this,d)-ia;if(c||(c=f=ya()),h>ua&&(ta(y-g)>2*h+ua?y>g?(g+=h,y-=h):(g-=h,y+=h):g=y=(g+y)/2,ta(b-_)>2*h+ua?b>_?(_+=h,b-=h):(_-=h,b+=h):_=b=(_+b)/2),c.moveTo(p*na(g),p*ea(g)),c.arc(0,0,p,g,y),g!==_||y!==b)if(t){var m=+t.apply(this,arguments),x=v-m,w=(_+b)/2;c.quadraticCurveTo(0,0,x*na(_),x*ea(_)),c.lineTo(v*na(w),v*ea(w)),c.lineTo(x*na(b),x*ea(b))}else c.quadraticCurveTo(0,0,v*na(_),v*ea(_)),c.arc(0,0,v,_,b);if(c.quadraticCurveTo(0,0,p*na(g),p*ea(g)),c.closePath(),f)return c=null,f+""||null}return t&&(f.headRadius=function(n){return arguments.length?(t="function"==typeof n?n:_a(+n),f):t}),f.radius=function(t){return arguments.length?(r=i="function"==typeof t?t:_a(+t),f):r},f.sourceRadius=function(t){return arguments.length?(r="function"==typeof t?t:_a(+t),f):r},f.targetRadius=function(t){return arguments.length?(i="function"==typeof t?t:_a(+t),f):i},f.startAngle=function(t){return arguments.length?(o="function"==typeof t?t:_a(+t),f):o},f.endAngle=function(t){return arguments.length?(a="function"==typeof t?t:_a(+t),f):a},f.padAngle=function(t){return arguments.length?(u="function"==typeof t?t:_a(+t),f):u},f.source=function(t){return arguments.length?(n=t,f):n},f.target=function(t){return arguments.length?(e=t,f):e},f.context=function(t){return arguments.length?(c=null==t?null:t,f):c},f}var Ea=Array.prototype.slice;function ka(t,n){return t-n}var Na=t=>()=>t;function Ca(t,n){for(var e,r=-1,i=n.length;++r<i;)if(e=Pa(t,n[r]))return e;return 0}function Pa(t,n){for(var e=n[0],r=n[1],i=-1,o=0,a=t.length,u=a-1;o<a;u=o++){var c=t[o],f=c[0],s=c[1],l=t[u],h=l[0],d=l[1];if(za(c,l,n))return 0;s>r!=d>r&&e<(h-f)*(r-s)/(d-s)+f&&(i=-i)}return i}function za(t,n,e){var r,i,o,a;return function(t,n,e){return(n[0]-t[0])*(e[1]-t[1])==(e[0]-t[0])*(n[1]-t[1])}(t,n,e)&&(i=t[r=+(t[0]===n[0])],o=e[r],a=n[r],i<=o&&o<=a||a<=o&&o<=i)}function Da(){}var qa=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function Ra(){var t=1,n=1,e=L,r=u;function i(t){var n=e(t);if(Array.isArray(n))n=n.slice().sort(ka);else{const e=g(t),r=B(e[0],e[1],n);n=U(Math.floor(e[0]/r)*r,Math.floor(e[1]/r-1)*r,n)}return n.map((n=>o(t,n)))}function o(e,i){var o=[],u=[];return function(e,r,i){var o,u,c,f,s,l,h=new Array,d=new Array;o=u=-1,f=e[0]>=r,qa[f<<1].forEach(p);for(;++o<t-1;)c=f,f=e[o+1]>=r,qa[c|f<<1].forEach(p);qa[f<<0].forEach(p);for(;++u<n-1;){for(o=-1,f=e[u*t+t]>=r,s=e[u*t]>=r,qa[f<<1|s<<2].forEach(p);++o<t-1;)c=f,f=e[u*t+t+o+1]>=r,l=s,s=e[u*t+o+1]>=r,qa[c|f<<1|s<<2|l<<3].forEach(p);qa[f|s<<3].forEach(p)}o=-1,s=e[u*t]>=r,qa[s<<2].forEach(p);for(;++o<t-1;)l=s,s=e[u*t+o+1]>=r,qa[s<<2|l<<3].forEach(p);function p(t){var n,e,r=[t[0][0]+o,t[0][1]+u],c=[t[1][0]+o,t[1][1]+u],f=a(r),s=a(c);(n=d[f])?(e=h[s])?(delete d[n.end],delete h[e.start],n===e?(n.ring.push(c),i(n.ring)):h[n.start]=d[e.end]={start:n.start,end:e.end,ring:n.ring.concat(e.ring)}):(delete d[n.end],n.ring.push(c),d[n.end=s]=n):(n=h[s])?(e=d[f])?(delete h[n.start],delete d[e.end],n===e?(n.ring.push(c),i(n.ring)):h[e.start]=d[n.end]={start:e.start,end:n.end,ring:e.ring.concat(n.ring)}):(delete h[n.start],n.ring.unshift(r),h[n.start=f]=n):h[f]=d[s]={start:f,end:s,ring:[r,c]}}qa[s<<3].forEach(p)}(e,i,(function(t){r(t,e,i),function(t){for(var n=0,e=t.length,r=t[e-1][1]*t[0][0]-t[e-1][0]*t[0][1];++n<e;)r+=t[n-1][1]*t[n][0]-t[n-1][0]*t[n][1];return r}(t)>0?o.push([t]):u.push(t)})),u.forEach((function(t){for(var n,e=0,r=o.length;e<r;++e)if(-1!==Ca((n=o[e])[0],t))return void n.push(t)})),{type:"MultiPolygon",value:i,coordinates:o}}function a(n){return 2*n[0]+n[1]*(t+1)*4}function u(e,r,i){e.forEach((function(e){var o,a=e[0],u=e[1],c=0|a,f=0|u,s=r[f*t+c];a>0&&a<t&&c===a&&(o=r[f*t+c-1],e[0]=a+(i-o)/(s-o)-.5),u>0&&u<n&&f===u&&(o=r[(f-1)*t+c],e[1]=u+(i-o)/(s-o)-.5)}))}return i.contour=o,i.size=function(e){if(!arguments.length)return[t,n];var r=Math.floor(e[0]),o=Math.floor(e[1]);if(!(r>=0&&o>=0))throw new Error("invalid size");return t=r,n=o,i},i.thresholds=function(t){return arguments.length?(e="function"==typeof t?t:Array.isArray(t)?Na(Ea.call(t)):Na(t),i):e},i.smooth=function(t){return arguments.length?(r=t?u:Da,i):r===u},i}function Fa(t,n,e){for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<i;++a)for(var u=0,c=0;u<r+e;++u)u<r&&(c+=t.data[u+a*r]),u>=e&&(u>=o&&(c-=t.data[u-o+a*r]),n.data[u-e+a*r]=c/Math.min(u+1,r-1+o-u,o))}function Oa(t,n,e){for(var r=t.width,i=t.height,o=1+(e<<1),a=0;a<r;++a)for(var u=0,c=0;u<i+e;++u)u<i&&(c+=t.data[a+u*r]),u>=e&&(u>=o&&(c-=t.data[a+(u-o)*r]),n.data[a+(u-e)*r]=c/Math.min(u+1,i-1+o-u,o))}function Ua(t){return t[0]}function Ia(t){return t[1]}function Ba(){return 1}const Ya=134217729;function La(t,n,e,r,i){let o,a,u,c,f=n[0],s=r[0],l=0,h=0;s>f==s>-f?(o=f,f=n[++l]):(o=s,s=r[++h]);let d=0;if(l<t&&h<e)for(s>f==s>-f?(a=f+o,u=o-(a-f),f=n[++l]):(a=s+o,u=o-(a-s),s=r[++h]),o=a,0!==u&&(i[d++]=u);l<t&&h<e;)s>f==s>-f?(a=o+f,c=a-o,u=o-(a-c)+(f-c),f=n[++l]):(a=o+s,c=a-o,u=o-(a-c)+(s-c),s=r[++h]),o=a,0!==u&&(i[d++]=u);for(;l<t;)a=o+f,c=a-o,u=o-(a-c)+(f-c),f=n[++l],o=a,0!==u&&(i[d++]=u);for(;h<e;)a=o+s,c=a-o,u=o-(a-c)+(s-c),s=r[++h],o=a,0!==u&&(i[d++]=u);return 0===o&&0!==d||(i[d++]=o),d}function ja(t){return new Float64Array(t)}const Ha=ja(4),Xa=ja(8),Ga=ja(12),Va=ja(16),$a=ja(4);function Wa(t,n,e,r,i,o){const a=(n-o)*(e-i),u=(t-i)*(r-o),c=a-u;if(0===a||0===u||a>0!=u>0)return c;const f=Math.abs(a+u);return Math.abs(c)>=33306690738754716e-32*f?c:-function(t,n,e,r,i,o,a){let u,c,f,s,l,h,d,p,g,y,v,_,b,m,x,w,M,A;const T=t-i,S=e-i,E=n-o,k=r-o;m=T*k,h=Ya*T,d=h-(h-T),p=T-d,h=Ya*k,g=h-(h-k),y=k-g,x=p*y-(m-d*g-p*g-d*y),w=E*S,h=Ya*E,d=h-(h-E),p=E-d,h=Ya*S,g=h-(h-S),y=S-g,M=p*y-(w-d*g-p*g-d*y),v=x-M,l=x-v,Ha[0]=x-(v+l)+(l-M),_=m+v,l=_-m,b=m-(_-l)+(v-l),v=b-w,l=b-v,Ha[1]=b-(v+l)+(l-w),A=_+v,l=A-_,Ha[2]=_-(A-l)+(v-l),Ha[3]=A;let N=function(t,n){let e=n[0];for(let r=1;r<t;r++)e+=n[r];return e}(4,Ha),C=22204460492503146e-32*a;if(N>=C||-N>=C)return N;if(l=t-T,u=t-(T+l)+(l-i),l=e-S,f=e-(S+l)+(l-i),l=n-E,c=n-(E+l)+(l-o),l=r-k,s=r-(k+l)+(l-o),0===u&&0===c&&0===f&&0===s)return N;if(C=11093356479670487e-47*a+33306690738754706e-32*Math.abs(N),N+=T*s+k*u-(E*f+S*c),N>=C||-N>=C)return N;m=u*k,h=Ya*u,d=h-(h-u),p=u-d,h=Ya*k,g=h-(h-k),y=k-g,x=p*y-(m-d*g-p*g-d*y),w=c*S,h=Ya*c,d=h-(h-c),p=c-d,h=Ya*S,g=h-(h-S),y=S-g,M=p*y-(w-d*g-p*g-d*y),v=x-M,l=x-v,$a[0]=x-(v+l)+(l-M),_=m+v,l=_-m,b=m-(_-l)+(v-l),v=b-w,l=b-v,$a[1]=b-(v+l)+(l-w),A=_+v,l=A-_,$a[2]=_-(A-l)+(v-l),$a[3]=A;const P=La(4,Ha,4,$a,Xa);m=T*s,h=Ya*T,d=h-(h-T),p=T-d,h=Ya*s,g=h-(h-s),y=s-g,x=p*y-(m-d*g-p*g-d*y),w=E*f,h=Ya*E,d=h-(h-E),p=E-d,h=Ya*f,g=h-(h-f),y=f-g,M=p*y-(w-d*g-p*g-d*y),v=x-M,l=x-v,$a[0]=x-(v+l)+(l-M),_=m+v,l=_-m,b=m-(_-l)+(v-l),v=b-w,l=b-v,$a[1]=b-(v+l)+(l-w),A=_+v,l=A-_,$a[2]=_-(A-l)+(v-l),$a[3]=A;const z=La(P,Xa,4,$a,Ga);m=u*s,h=Ya*u,d=h-(h-u),p=u-d,h=Ya*s,g=h-(h-s),y=s-g,x=p*y-(m-d*g-p*g-d*y),w=c*f,h=Ya*c,d=h-(h-c),p=c-d,h=Ya*f,g=h-(h-f),y=f-g,M=p*y-(w-d*g-p*g-d*y),v=x-M,l=x-v,$a[0]=x-(v+l)+(l-M),_=m+v,l=_-m,b=m-(_-l)+(v-l),v=b-w,l=b-v,$a[1]=b-(v+l)+(l-w),A=_+v,l=A-_,$a[2]=_-(A-l)+(v-l),$a[3]=A;const D=La(z,Ga,4,$a,Va);return Va[D-1]}(t,n,e,r,i,o,f)}const Za=Math.pow(2,-52),Ka=new Uint32Array(512);class Qa{static from(t,n=iu,e=ou){const r=t.length,i=new Float64Array(2*r);for(let o=0;o<r;o++){const r=t[o];i[2*o]=n(r),i[2*o+1]=e(r)}return new Qa(i)}constructor(t){const n=t.length>>1;if(n>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;const e=Math.max(2*n-5,0);this._triangles=new Uint32Array(3*e),this._halfedges=new Int32Array(3*e),this._hashSize=Math.ceil(Math.sqrt(n)),this._hullPrev=new Uint32Array(n),this._hullNext=new Uint32Array(n),this._hullTri=new Uint32Array(n),this._hullHash=new Int32Array(this._hashSize).fill(-1),this._ids=new Uint32Array(n),this._dists=new Float64Array(n),this.update()}update(){const{coords:t,_hullPrev:n,_hullNext:e,_hullTri:r,_hullHash:i}=this,o=t.length>>1;let a=1/0,u=1/0,c=-1/0,f=-1/0;for(let n=0;n<o;n++){const e=t[2*n],r=t[2*n+1];e<a&&(a=e),r<u&&(u=r),e>c&&(c=e),r>f&&(f=r),this._ids[n]=n}const s=(a+c)/2,l=(u+f)/2;let h,d,p,g=1/0;for(let n=0;n<o;n++){const e=Ja(s,l,t[2*n],t[2*n+1]);e<g&&(h=n,g=e)}const y=t[2*h],v=t[2*h+1];g=1/0;for(let n=0;n<o;n++){if(n===h)continue;const e=Ja(y,v,t[2*n],t[2*n+1]);e<g&&e>0&&(d=n,g=e)}let _=t[2*d],b=t[2*d+1],m=1/0;for(let n=0;n<o;n++){if(n===h||n===d)continue;const e=nu(y,v,_,b,t[2*n],t[2*n+1]);e<m&&(p=n,m=e)}let x=t[2*p],w=t[2*p+1];if(m===1/0){for(let n=0;n<o;n++)this._dists[n]=t[2*n]-t[0]||t[2*n+1]-t[1];eu(this._ids,this._dists,0,o-1);const n=new Uint32Array(o);let e=0;for(let t=0,r=-1/0;t<o;t++){const i=this._ids[t];this._dists[i]>r&&(n[e++]=i,r=this._dists[i])}return this.hull=n.subarray(0,e),this.triangles=new Uint32Array(0),void(this.halfedges=new Uint32Array(0))}if(Wa(y,v,_,b,x,w)<0){const t=d,n=_,e=b;d=p,_=x,b=w,p=t,x=n,w=e}const M=function(t,n,e,r,i,o){const a=e-t,u=r-n,c=i-t,f=o-n,s=a*a+u*u,l=c*c+f*f,h=.5/(a*f-u*c);return{x:t+(f*s-u*l)*h,y:n+(a*l-c*s)*h}}(y,v,_,b,x,w);this._cx=M.x,this._cy=M.y;for(let n=0;n<o;n++)this._dists[n]=Ja(t[2*n],t[2*n+1],M.x,M.y);eu(this._ids,this._dists,0,o-1),this._hullStart=h;let A=3;e[h]=n[p]=d,e[d]=n[h]=p,e[p]=n[d]=h,r[h]=0,r[d]=1,r[p]=2,i.fill(-1),i[this._hashKey(y,v)]=h,i[this._hashKey(_,b)]=d,i[this._hashKey(x,w)]=p,this.trianglesLen=0,this._addTriangle(h,d,p,-1,-1,-1);for(let o,a,u=0;u<this._ids.length;u++){const c=this._ids[u],f=t[2*c],s=t[2*c+1];if(u>0&&Math.abs(f-o)<=Za&&Math.abs(s-a)<=Za)continue;if(o=f,a=s,c===h||c===d||c===p)continue;let l=0;for(let t=0,n=this._hashKey(f,s);t<this._hashSize&&(l=i[(n+t)%this._hashSize],-1===l||l===e[l]);t++);l=n[l];let g,y=l;for(;g=e[y],Wa(f,s,t[2*y],t[2*y+1],t[2*g],t[2*g+1])>=0;)if(y=g,y===l){y=-1;break}if(-1===y)continue;let v=this._addTriangle(y,c,e[y],-1,-1,r[y]);r[c]=this._legalize(v+2),r[y]=v,A++;let _=e[y];for(;g=e[_],Wa(f,s,t[2*_],t[2*_+1],t[2*g],t[2*g+1])<0;)v=this._addTriangle(_,c,g,r[c],-1,r[_]),r[c]=this._legalize(v+2),e[_]=_,A--,_=g;if(y===l)for(;g=n[y],Wa(f,s,t[2*g],t[2*g+1],t[2*y],t[2*y+1])<0;)v=this._addTriangle(g,c,y,-1,r[y],r[g]),this._legalize(v+2),r[g]=v,e[y]=y,A--,y=g;this._hullStart=n[c]=y,e[y]=n[_]=c,e[c]=_,i[this._hashKey(f,s)]=c,i[this._hashKey(t[2*y],t[2*y+1])]=y}this.hull=new Uint32Array(A);for(let t=0,n=this._hullStart;t<A;t++)this.hull[t]=n,n=e[n];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,n){return Math.floor(function(t,n){const e=t/(Math.abs(t)+Math.abs(n));return(n>0?3-e:1+e)/4}(t-this._cx,n-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:n,_halfedges:e,coords:r}=this;let i=0,o=0;for(;;){const a=e[t],u=t-t%3;if(o=u+(t+2)%3,-1===a){if(0===i)break;t=Ka[--i];continue}const c=a-a%3,f=u+(t+1)%3,s=c+(a+2)%3,l=n[o],h=n[t],d=n[f],p=n[s];if(tu(r[2*l],r[2*l+1],r[2*h],r[2*h+1],r[2*d],r[2*d+1],r[2*p],r[2*p+1])){n[t]=p,n[a]=l;const r=e[s];if(-1===r){let n=this._hullStart;do{if(this._hullTri[n]===s){this._hullTri[n]=t;break}n=this._hullPrev[n]}while(n!==this._hullStart)}this._link(t,r),this._link(a,e[o]),this._link(o,s);const u=c+(a+1)%3;i<Ka.length&&(Ka[i++]=u)}else{if(0===i)break;t=Ka[--i]}}return o}_link(t,n){this._halfedges[t]=n,-1!==n&&(this._halfedges[n]=t)}_addTriangle(t,n,e,r,i,o){const a=this.trianglesLen;return this._triangles[a]=t,this._triangles[a+1]=n,this._triangles[a+2]=e,this._link(a,r),this._link(a+1,i),this._link(a+2,o),this.trianglesLen+=3,a}}function Ja(t,n,e,r){const i=t-e,o=n-r;return i*i+o*o}function tu(t,n,e,r,i,o,a,u){const c=t-a,f=n-u,s=e-a,l=r-u,h=i-a,d=o-u,p=s*s+l*l,g=h*h+d*d;return c*(l*g-p*d)-f*(s*g-p*h)+(c*c+f*f)*(s*d-l*h)<0}function nu(t,n,e,r,i,o){const a=e-t,u=r-n,c=i-t,f=o-n,s=a*a+u*u,l=c*c+f*f,h=.5/(a*f-u*c),d=(f*s-u*l)*h,p=(a*l-c*s)*h;return d*d+p*p}function eu(t,n,e,r){if(r-e<=20)for(let i=e+1;i<=r;i++){const r=t[i],o=n[r];let a=i-1;for(;a>=e&&n[t[a]]>o;)t[a+1]=t[a--];t[a+1]=r}else{let i=e+1,o=r;ru(t,e+r>>1,i),n[t[e]]>n[t[r]]&&ru(t,e,r),n[t[i]]>n[t[r]]&&ru(t,i,r),n[t[e]]>n[t[i]]&&ru(t,e,i);const a=t[i],u=n[a];for(;;){do{i++}while(n[t[i]]<u);do{o--}while(n[t[o]]>u);if(o<i)break;ru(t,i,o)}t[e+1]=t[o],t[o]=a,r-i+1>=o-e?(eu(t,n,i,r),eu(t,n,e,o-1)):(eu(t,n,e,o-1),eu(t,n,i,r))}}function ru(t,n,e){const r=t[n];t[n]=t[e],t[e]=r}function iu(t){return t[0]}function ou(t){return t[1]}const au=1e-6;class uu{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,n){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,n){this._+=`L${this._x1=+t},${this._y1=+n}`}arc(t,n,e){const r=(t=+t)+(e=+e),i=n=+n;if(e<0)throw new Error("negative radius");null===this._x1?this._+=`M${r},${i}`:(Math.abs(this._x1-r)>au||Math.abs(this._y1-i)>au)&&(this._+="L"+r+","+i),e&&(this._+=`A${e},${e},0,1,1,${t-e},${n}A${e},${e},0,1,1,${this._x1=r},${this._y1=i}`)}rect(t,n,e,r){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${+e}v${+r}h${-e}Z`}value(){return this._||null}}class cu{constructor(){this._=[]}moveTo(t,n){this._.push([t,n])}closePath(){this._.push(this._[0].slice())}lineTo(t,n){this._.push([t,n])}value(){return this._.length?this._:null}}class fu{constructor(t,[n,e,r,i]=[0,0,960,500]){if(!((r=+r)>=(n=+n)&&(i=+i)>=(e=+e)))throw new Error("invalid bounds");this.delaunay=t,this._circumcenters=new Float64Array(2*t.points.length),this.vectors=new Float64Array(2*t.points.length),this.xmax=r,this.xmin=n,this.ymax=i,this.ymin=e,this._init()}update(){return this.delaunay.update(),this._init(),this}_init(){const{delaunay:{points:t,hull:n,triangles:e},vectors:r}=this,i=this.circumcenters=this._circumcenters.subarray(0,e.length/3*2);for(let n,r,o=0,a=0,u=e.length;o<u;o+=3,a+=2){const u=2*e[o],c=2*e[o+1],f=2*e[o+2],s=t[u],l=t[u+1],h=t[c],d=t[c+1],p=t[f],g=t[f+1],y=h-s,v=d-l,_=p-s,b=g-l,m=2*(y*b-v*_);if(Math.abs(m)<1e-9){let i=1e9;const o=2*e[0];i*=Math.sign((t[o]-s)*b-(t[o+1]-l)*_),n=(s+p)/2-i*b,r=(l+g)/2+i*_}else{const t=1/m,e=y*y+v*v,i=_*_+b*b;n=s+(b*e-v*i)*t,r=l+(y*i-_*e)*t}i[a]=n,i[a+1]=r}let o,a,u,c=n[n.length-1],f=4*c,s=t[2*c],l=t[2*c+1];r.fill(0);for(let e=0;e<n.length;++e)c=n[e],o=f,a=s,u=l,f=4*c,s=t[2*c],l=t[2*c+1],r[o+2]=r[f]=u-l,r[o+3]=r[f+1]=s-a}render(t){const n=null==t?t=new uu:void 0,{delaunay:{halfedges:e,inedges:r,hull:i},circumcenters:o,vectors:a}=this;if(i.length<=1)return null;for(let n=0,r=e.length;n<r;++n){const r=e[n];if(r<n)continue;const i=2*Math.floor(n/3),a=2*Math.floor(r/3),u=o[i],c=o[i+1],f=o[a],s=o[a+1];this._renderSegment(u,c,f,s,t)}let u,c=i[i.length-1];for(let n=0;n<i.length;++n){u=c,c=i[n];const e=2*Math.floor(r[c]/3),f=o[e],s=o[e+1],l=4*u,h=this._project(f,s,a[l+2],a[l+3]);h&&this._renderSegment(f,s,h[0],h[1],t)}return n&&n.value()}renderBounds(t){const n=null==t?t=new uu:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),n&&n.value()}renderCell(t,n){const e=null==n?n=new uu:void 0,r=this._clip(t);if(null===r||!r.length)return;n.moveTo(r[0],r[1]);let i=r.length;for(;r[0]===r[i-2]&&r[1]===r[i-1]&&i>1;)i-=2;for(let t=2;t<i;t+=2)r[t]===r[t-2]&&r[t+1]===r[t-1]||n.lineTo(r[t],r[t+1]);return n.closePath(),e&&e.value()}*cellPolygons(){const{delaunay:{points:t}}=this;for(let n=0,e=t.length/2;n<e;++n){const t=this.cellPolygon(n);t&&(t.index=n,yield t)}}cellPolygon(t){const n=new cu;return this.renderCell(t,n),n.value()}_renderSegment(t,n,e,r,i){let o;const a=this._regioncode(t,n),u=this._regioncode(e,r);0===a&&0===u?(i.moveTo(t,n),i.lineTo(e,r)):(o=this._clipSegment(t,n,e,r,a,u))&&(i.moveTo(o[0],o[1]),i.lineTo(o[2],o[3]))}contains(t,n,e){return(n=+n)==n&&(e=+e)==e&&this.delaunay._step(t,n,e)===t}*neighbors(t){const n=this._clip(t);if(n)for(const e of this.delaunay.neighbors(t)){const t=this._clip(e);if(t)t:for(let r=0,i=n.length;r<i;r+=2)for(let o=0,a=t.length;o<a;o+=2)if(n[r]==t[o]&&n[r+1]==t[o+1]&&n[(r+2)%i]==t[(o+a-2)%a]&&n[(r+3)%i]==t[(o+a-1)%a]){yield e;break t}}}_cell(t){const{circumcenters:n,delaunay:{inedges:e,halfedges:r,triangles:i}}=this,o=e[t];if(-1===o)return null;const a=[];let u=o;do{const e=Math.floor(u/3);if(a.push(n[2*e],n[2*e+1]),u=u%3==2?u-2:u+1,i[u]!==t)break;u=r[u]}while(u!==o&&-1!==u);return a}_clip(t){if(0===t&&1===this.delaunay.hull.length)return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];const n=this._cell(t);if(null===n)return null;const{vectors:e}=this,r=4*t;return e[r]||e[r+1]?this._clipInfinite(t,n,e[r],e[r+1],e[r+2],e[r+3]):this._clipFinite(t,n)}_clipFinite(t,n){const e=n.length;let r,i,o,a,u=null,c=n[e-2],f=n[e-1],s=this._regioncode(c,f),l=0;for(let h=0;h<e;h+=2)if(r=c,i=f,c=n[h],f=n[h+1],o=s,s=this._regioncode(c,f),0===o&&0===s)a=l,l=0,u?u.push(c,f):u=[c,f];else{let n,e,h,d,p;if(0===o){if(null===(n=this._clipSegment(r,i,c,f,o,s)))continue;[e,h,d,p]=n}else{if(null===(n=this._clipSegment(c,f,r,i,s,o)))continue;[d,p,e,h]=n,a=l,l=this._edgecode(e,h),a&&l&&this._edge(t,a,l,u,u.length),u?u.push(e,h):u=[e,h]}a=l,l=this._edgecode(d,p),a&&l&&this._edge(t,a,l,u,u.length),u?u.push(d,p):u=[d,p]}if(u)a=l,l=this._edgecode(u[0],u[1]),a&&l&&this._edge(t,a,l,u,u.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return u}_clipSegment(t,n,e,r,i,o){for(;;){if(0===i&&0===o)return[t,n,e,r];if(i&o)return null;let a,u,c=i||o;8&c?(a=t+(e-t)*(this.ymax-n)/(r-n),u=this.ymax):4&c?(a=t+(e-t)*(this.ymin-n)/(r-n),u=this.ymin):2&c?(u=n+(r-n)*(this.xmax-t)/(e-t),a=this.xmax):(u=n+(r-n)*(this.xmin-t)/(e-t),a=this.xmin),i?(t=a,n=u,i=this._regioncode(t,n)):(e=a,r=u,o=this._regioncode(e,r))}}_clipInfinite(t,n,e,r,i,o){let a,u=Array.from(n);if((a=this._project(u[0],u[1],e,r))&&u.unshift(a[0],a[1]),(a=this._project(u[u.length-2],u[u.length-1],i,o))&&u.push(a[0],a[1]),u=this._clipFinite(t,u))for(let n,e=0,r=u.length,i=this._edgecode(u[r-2],u[r-1]);e<r;e+=2)n=i,i=this._edgecode(u[e],u[e+1]),n&&i&&(e=this._edge(t,n,i,u,e),r=u.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(u=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return u}_edge(t,n,e,r,i){for(;n!==e;){let e,o;switch(n){case 5:n=4;continue;case 4:n=6,e=this.xmax,o=this.ymin;break;case 6:n=2;continue;case 2:n=10,e=this.xmax,o=this.ymax;break;case 10:n=8;continue;case 8:n=9,e=this.xmin,o=this.ymax;break;case 9:n=1;continue;case 1:n=5,e=this.xmin,o=this.ymin}r[i]===e&&r[i+1]===o||!this.contains(t,e,o)||(r.splice(i,0,e,o),i+=2)}if(r.length>4)for(let t=0;t<r.length;t+=2){const n=(t+2)%r.length,e=(t+4)%r.length;(r[t]===r[n]&&r[n]===r[e]||r[t+1]===r[n+1]&&r[n+1]===r[e+1])&&(r.splice(n,2),t-=2)}return i}_project(t,n,e,r){let i,o,a,u=1/0;if(r<0){if(n<=this.ymin)return null;(i=(this.ymin-n)/r)<u&&(a=this.ymin,o=t+(u=i)*e)}else if(r>0){if(n>=this.ymax)return null;(i=(this.ymax-n)/r)<u&&(a=this.ymax,o=t+(u=i)*e)}if(e>0){if(t>=this.xmax)return null;(i=(this.xmax-t)/e)<u&&(o=this.xmax,a=n+(u=i)*r)}else if(e<0){if(t<=this.xmin)return null;(i=(this.xmin-t)/e)<u&&(o=this.xmin,a=n+(u=i)*r)}return[o,a]}_edgecode(t,n){return(t===this.xmin?1:t===this.xmax?2:0)|(n===this.ymin?4:n===this.ymax?8:0)}_regioncode(t,n){return(t<this.xmin?1:t>this.xmax?2:0)|(n<this.ymin?4:n>this.ymax?8:0)}}const su=2*Math.PI,lu=Math.pow;function hu(t){return t[0]}function du(t){return t[1]}function pu(t,n,e){return[t+Math.sin(t+n)*e,n+Math.cos(t-n)*e]}class gu{static from(t,n=hu,e=du,r){return new gu("length"in t?function(t,n,e,r){const i=t.length,o=new Float64Array(2*i);for(let a=0;a<i;++a){const i=t[a];o[2*a]=n.call(r,i,a,t),o[2*a+1]=e.call(r,i,a,t)}return o}(t,n,e,r):Float64Array.from(function*(t,n,e,r){let i=0;for(const o of t)yield n.call(r,o,i,t),yield e.call(r,o,i,t),++i}(t,n,e,r)))}constructor(t){this._delaunator=new Qa(t),this.inedges=new Int32Array(t.length/2),this._hullIndex=new Int32Array(t.length/2),this.points=this._delaunator.coords,this._init()}update(){return this._delaunator.update(),this._init(),this}_init(){const t=this._delaunator,n=this.points;if(t.hull&&t.hull.length>2&&function(t){const{triangles:n,coords:e}=t;for(let t=0;t<n.length;t+=3){const r=2*n[t],i=2*n[t+1],o=2*n[t+2];if((e[o]-e[r])*(e[i+1]-e[r+1])-(e[i]-e[r])*(e[o+1]-e[r+1])>1e-10)return!1}return!0}(t)){this.collinear=Int32Array.from({length:n.length/2},((t,n)=>n)).sort(((t,e)=>n[2*t]-n[2*e]||n[2*t+1]-n[2*e+1]));const t=this.collinear[0],e=this.collinear[this.collinear.length-1],r=[n[2*t],n[2*t+1],n[2*e],n[2*e+1]],i=1e-8*Math.hypot(r[3]-r[1],r[2]-r[0]);for(let t=0,e=n.length/2;t<e;++t){const e=pu(n[2*t],n[2*t+1],i);n[2*t]=e[0],n[2*t+1]=e[1]}this._delaunator=new Qa(n)}else delete this.collinear;const e=this.halfedges=this._delaunator.halfedges,r=this.hull=this._delaunator.hull,i=this.triangles=this._delaunator.triangles,o=this.inedges.fill(-1),a=this._hullIndex.fill(-1);for(let t=0,n=e.length;t<n;++t){const n=i[t%3==2?t-2:t+1];-1!==e[t]&&-1!==o[n]||(o[n]=t)}for(let t=0,n=r.length;t<n;++t)a[r[t]]=t;r.length<=2&&r.length>0&&(this.triangles=new Int32Array(3).fill(-1),this.halfedges=new Int32Array(3).fill(-1),this.triangles[0]=r[0],o[r[0]]=1,2===r.length&&(o[r[1]]=0,this.triangles[1]=r[1],this.triangles[2]=r[1]))}voronoi(t){return new fu(this,t)}*neighbors(t){const{inedges:n,hull:e,_hullIndex:r,halfedges:i,triangles:o,collinear:a}=this;if(a){const n=a.indexOf(t);return n>0&&(yield a[n-1]),void(n<a.length-1&&(yield a[n+1]))}const u=n[t];if(-1===u)return;let c=u,f=-1;do{if(yield f=o[c],c=c%3==2?c-2:c+1,o[c]!==t)return;if(c=i[c],-1===c){const n=e[(r[t]+1)%e.length];return void(n!==f&&(yield n))}}while(c!==u)}find(t,n,e=0){if((t=+t)!=t||(n=+n)!=n)return-1;const r=e;let i;for(;(i=this._step(e,t,n))>=0&&i!==e&&i!==r;)e=i;return i}_step(t,n,e){const{inedges:r,hull:i,_hullIndex:o,halfedges:a,triangles:u,points:c}=this;if(-1===r[t]||!c.length)return(t+1)%(c.length>>1);let f=t,s=lu(n-c[2*t],2)+lu(e-c[2*t+1],2);const l=r[t];let h=l;do{let r=u[h];const l=lu(n-c[2*r],2)+lu(e-c[2*r+1],2);if(l<s&&(s=l,f=r),h=h%3==2?h-2:h+1,u[h]!==t)break;if(h=a[h],-1===h){if(h=i[(o[t]+1)%i.length],h!==r&&lu(n-c[2*h],2)+lu(e-c[2*h+1],2)<s)return h;break}}while(h!==l);return f}render(t){const n=null==t?t=new uu:void 0,{points:e,halfedges:r,triangles:i}=this;for(let n=0,o=r.length;n<o;++n){const o=r[n];if(o<n)continue;const a=2*i[n],u=2*i[o];t.moveTo(e[a],e[a+1]),t.lineTo(e[u],e[u+1])}return this.renderHull(t),n&&n.value()}renderPoints(t,n){void 0!==n||t&&"function"==typeof t.moveTo||(n=t,t=null),n=null==n?2:+n;const e=null==t?t=new uu:void 0,{points:r}=this;for(let e=0,i=r.length;e<i;e+=2){const i=r[e],o=r[e+1];t.moveTo(i+n,o),t.arc(i,o,n,0,su)}return e&&e.value()}renderHull(t){const n=null==t?t=new uu:void 0,{hull:e,points:r}=this,i=2*e[0],o=e.length;t.moveTo(r[i],r[i+1]);for(let n=1;n<o;++n){const i=2*e[n];t.lineTo(r[i],r[i+1])}return t.closePath(),n&&n.value()}hullPolygon(){const t=new cu;return this.renderHull(t),t.value()}renderTriangle(t,n){const e=null==n?n=new uu:void 0,{points:r,triangles:i}=this,o=2*i[t*=3],a=2*i[t+1],u=2*i[t+2];return n.moveTo(r[o],r[o+1]),n.lineTo(r[a],r[a+1]),n.lineTo(r[u],r[u+1]),n.closePath(),e&&e.value()}*trianglePolygons(){const{triangles:t}=this;for(let n=0,e=t.length/3;n<e;++n)yield this.trianglePolygon(n)}trianglePolygon(t){const n=new cu;return this.renderTriangle(t,n),n.value()}}var yu={},vu={};function _u(t){return new Function("d","return {"+t.map((function(t,n){return JSON.stringify(t)+": d["+n+'] || ""'})).join(",")+"}")}function bu(t){var n=Object.create(null),e=[];return t.forEach((function(t){for(var r in t)r in n||e.push(n[r]=r)})),e}function mu(t,n){var e=t+"",r=e.length;return r<n?new Array(n-r+1).join(0)+e:e}function xu(t){var n=t.getUTCHours(),e=t.getUTCMinutes(),r=t.getUTCSeconds(),i=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":function(t){return t<0?"-"+mu(-t,6):t>9999?"+"+mu(t,6):mu(t,4)}(t.getUTCFullYear())+"-"+mu(t.getUTCMonth()+1,2)+"-"+mu(t.getUTCDate(),2)+(i?"T"+mu(n,2)+":"+mu(e,2)+":"+mu(r,2)+"."+mu(i,3)+"Z":r?"T"+mu(n,2)+":"+mu(e,2)+":"+mu(r,2)+"Z":e||n?"T"+mu(n,2)+":"+mu(e,2)+"Z":"")}function wu(t){var n=new RegExp('["'+t+"\n\r]"),e=t.charCodeAt(0);function r(t,n){var r,i=[],o=t.length,a=0,u=0,c=o<=0,f=!1;function s(){if(c)return vu;if(f)return f=!1,yu;var n,r,i=a;if(34===t.charCodeAt(i)){for(;a++<o&&34!==t.charCodeAt(a)||34===t.charCodeAt(++a););return(n=a)>=o?c=!0:10===(r=t.charCodeAt(a++))?f=!0:13===r&&(f=!0,10===t.charCodeAt(a)&&++a),t.slice(i+1,n-1).replace(/""/g,'"')}for(;a<o;){if(10===(r=t.charCodeAt(n=a++)))f=!0;else if(13===r)f=!0,10===t.charCodeAt(a)&&++a;else if(r!==e)continue;return t.slice(i,n)}return c=!0,t.slice(i,o)}for(10===t.charCodeAt(o-1)&&--o,13===t.charCodeAt(o-1)&&--o;(r=s())!==vu;){for(var l=[];r!==yu&&r!==vu;)l.push(r),r=s();n&&null==(l=n(l,u++))||i.push(l)}return i}function i(n,e){return n.map((function(n){return e.map((function(t){return a(n[t])})).join(t)}))}function o(n){return n.map(a).join(t)}function a(t){return null==t?"":t instanceof Date?xu(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,n){var e,i,o=r(t,(function(t,r){if(e)return e(t,r-1);i=t,e=n?function(t,n){var e=_u(t);return function(r,i){return n(e(r),i,t)}}(t,n):_u(t)}));return o.columns=i||[],o},parseRows:r,format:function(n,e){return null==e&&(e=bu(n)),[e.map(a).join(t)].concat(i(n,e)).join("\n")},formatBody:function(t,n){return null==n&&(n=bu(t)),i(t,n).join("\n")},formatRows:function(t){return t.map(o).join("\n")},formatRow:o,formatValue:a}}var Mu=wu(","),Au=Mu.parse,Tu=Mu.parseRows,Su=Mu.format,Eu=Mu.formatBody,ku=Mu.formatRows,Nu=Mu.formatRow,Cu=Mu.formatValue,Pu=wu("\t"),zu=Pu.parse,Du=Pu.parseRows,qu=Pu.format,Ru=Pu.formatBody,Fu=Pu.formatRows,Ou=Pu.formatRow,Uu=Pu.formatValue;const Iu=new Date("2019-01-01T00:00").getHours()||new Date("2019-07-01T00:00").getHours();function Bu(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.blob()}function Yu(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.arrayBuffer()}function Lu(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.text()}function ju(t,n){return fetch(t,n).then(Lu)}function Hu(t){return function(n,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=void 0),ju(n,e).then((function(n){return t(n,r)}))}}var Xu=Hu(Au),Gu=Hu(zu);function Vu(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);if(204!==t.status&&205!==t.status)return t.json()}function $u(t){return(n,e)=>ju(n,e).then((n=>(new DOMParser).parseFromString(n,t)))}var Wu=$u("application/xml"),Zu=$u("text/html"),Ku=$u("image/svg+xml");function Qu(t,n,e,r){if(isNaN(n)||isNaN(e))return t;var i,o,a,u,c,f,s,l,h,d=t._root,p={data:r},g=t._x0,y=t._y0,v=t._x1,_=t._y1;if(!d)return t._root=p,t;for(;d.length;)if((f=n>=(o=(g+v)/2))?g=o:v=o,(s=e>=(a=(y+_)/2))?y=a:_=a,i=d,!(d=d[l=s<<1|f]))return i[l]=p,t;if(u=+t._x.call(null,d.data),c=+t._y.call(null,d.data),n===u&&e===c)return p.next=d,i?i[l]=p:t._root=p,t;do{i=i?i[l]=new Array(4):t._root=new Array(4),(f=n>=(o=(g+v)/2))?g=o:v=o,(s=e>=(a=(y+_)/2))?y=a:_=a}while((l=s<<1|f)==(h=(c>=a)<<1|u>=o));return i[h]=d,i[l]=p,t}function Ju(t,n,e,r,i){this.node=t,this.x0=n,this.y0=e,this.x1=r,this.y1=i}function tc(t){return t[0]}function nc(t){return t[1]}function ec(t,n,e){var r=new rc(null==n?tc:n,null==e?nc:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function rc(t,n,e,r,i,o){this._x=t,this._y=n,this._x0=e,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function ic(t){for(var n={data:t.data},e=n;t=t.next;)e=e.next={data:t.data};return n}var oc=ec.prototype=rc.prototype;function ac(t){return function(){return t}}function uc(t){return 1e-6*(t()-.5)}function cc(t){return t.x+t.vx}function fc(t){return t.y+t.vy}function sc(t){return t.index}function lc(t,n){var e=t.get(n);if(!e)throw new Error("node not found: "+n);return e}oc.copy=function(){var t,n,e=new rc(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=ic(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(n=r.source[i])&&(n.length?t.push({source:n,target:r.target[i]=new Array(4)}):r.target[i]=ic(n));return e},oc.add=function(t){const n=+this._x.call(null,t),e=+this._y.call(null,t);return Qu(this.cover(n,e),n,e,t)},oc.addAll=function(t){var n,e,r,i,o=t.length,a=new Array(o),u=new Array(o),c=1/0,f=1/0,s=-1/0,l=-1/0;for(e=0;e<o;++e)isNaN(r=+this._x.call(null,n=t[e]))||isNaN(i=+this._y.call(null,n))||(a[e]=r,u[e]=i,r<c&&(c=r),r>s&&(s=r),i<f&&(f=i),i>l&&(l=i));if(c>s||f>l)return this;for(this.cover(c,f).cover(s,l),e=0;e<o;++e)Qu(this,a[e],u[e],t[e]);return this},oc.cover=function(t,n){if(isNaN(t=+t)||isNaN(n=+n))return this;var e=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(e))i=(e=Math.floor(t))+1,o=(r=Math.floor(n))+1;else{for(var a,u,c=i-e||1,f=this._root;e>t||t>=i||r>n||n>=o;)switch(u=(n<r)<<1|t<e,(a=new Array(4))[u]=f,f=a,c*=2,u){case 0:i=e+c,o=r+c;break;case 1:e=i-c,o=r+c;break;case 2:i=e+c,r=o-c;break;case 3:e=i-c,r=o-c}this._root&&this._root.length&&(this._root=f)}return this._x0=e,this._y0=r,this._x1=i,this._y1=o,this},oc.data=function(){var t=[];return this.visit((function(n){if(!n.length)do{t.push(n.data)}while(n=n.next)})),t},oc.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},oc.find=function(t,n,e){var r,i,o,a,u,c,f,s=this._x0,l=this._y0,h=this._x1,d=this._y1,p=[],g=this._root;for(g&&p.push(new Ju(g,s,l,h,d)),null==e?e=1/0:(s=t-e,l=n-e,h=t+e,d=n+e,e*=e);c=p.pop();)if(!(!(g=c.node)||(i=c.x0)>h||(o=c.y0)>d||(a=c.x1)<s||(u=c.y1)<l))if(g.length){var y=(i+a)/2,v=(o+u)/2;p.push(new Ju(g[3],y,v,a,u),new Ju(g[2],i,v,y,u),new Ju(g[1],y,o,a,v),new Ju(g[0],i,o,y,v)),(f=(n>=v)<<1|t>=y)&&(c=p[p.length-1],p[p.length-1]=p[p.length-1-f],p[p.length-1-f]=c)}else{var _=t-+this._x.call(null,g.data),b=n-+this._y.call(null,g.data),m=_*_+b*b;if(m<e){var x=Math.sqrt(e=m);s=t-x,l=n-x,h=t+x,d=n+x,r=g.data}}return r},oc.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var n,e,r,i,o,a,u,c,f,s,l,h,d=this._root,p=this._x0,g=this._y0,y=this._x1,v=this._y1;if(!d)return this;if(d.length)for(;;){if((f=o>=(u=(p+y)/2))?p=u:y=u,(s=a>=(c=(g+v)/2))?g=c:v=c,n=d,!(d=d[l=s<<1|f]))return this;if(!d.length)break;(n[l+1&3]||n[l+2&3]||n[l+3&3])&&(e=n,h=l)}for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,r?(i?r.next=i:delete r.next,this):n?(i?n[l]=i:delete n[l],(d=n[0]||n[1]||n[2]||n[3])&&d===(n[3]||n[2]||n[1]||n[0])&&!d.length&&(e?e[h]=d:this._root=d),this):(this._root=i,this)},oc.removeAll=function(t){for(var n=0,e=t.length;n<e;++n)this.remove(t[n]);return this},oc.root=function(){return this._root},oc.size=function(){var t=0;return this.visit((function(n){if(!n.length)do{++t}while(n=n.next)})),t},oc.visit=function(t){var n,e,r,i,o,a,u=[],c=this._root;for(c&&u.push(new Ju(c,this._x0,this._y0,this._x1,this._y1));n=u.pop();)if(!t(c=n.node,r=n.x0,i=n.y0,o=n.x1,a=n.y1)&&c.length){var f=(r+o)/2,s=(i+a)/2;(e=c[3])&&u.push(new Ju(e,f,s,o,a)),(e=c[2])&&u.push(new Ju(e,r,s,f,a)),(e=c[1])&&u.push(new Ju(e,f,i,o,s)),(e=c[0])&&u.push(new Ju(e,r,i,f,s))}return this},oc.visitAfter=function(t){var n,e=[],r=[];for(this._root&&e.push(new Ju(this._root,this._x0,this._y0,this._x1,this._y1));n=e.pop();){var i=n.node;if(i.length){var o,a=n.x0,u=n.y0,c=n.x1,f=n.y1,s=(a+c)/2,l=(u+f)/2;(o=i[0])&&e.push(new Ju(o,a,u,s,l)),(o=i[1])&&e.push(new Ju(o,s,u,c,l)),(o=i[2])&&e.push(new Ju(o,a,l,s,f)),(o=i[3])&&e.push(new Ju(o,s,l,c,f))}r.push(n)}for(;n=r.pop();)t(n.node,n.x0,n.y0,n.x1,n.y1);return this},oc.x=function(t){return arguments.length?(this._x=t,this):this._x},oc.y=function(t){return arguments.length?(this._y=t,this):this._y};const hc=4294967296;function dc(t){return t.x}function pc(t){return t.y}var gc=Math.PI*(3-Math.sqrt(5));function yc(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}function vc(t){return(t=yc(Math.abs(t)))?t[1]:NaN}var _c,bc=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function mc(t){if(!(n=bc.exec(t)))throw new Error("invalid format: "+t);var n;return new xc({fill:n[1],align:n[2],sign:n[3],symbol:n[4],zero:n[5],width:n[6],comma:n[7],precision:n[8]&&n[8].slice(1),trim:n[9],type:n[10]})}function xc(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function wc(t,n){var e=yc(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}mc.prototype=xc.prototype,xc.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var Mc={"%":(t,n)=>(100*t).toFixed(n),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,n)=>t.toExponential(n),f:(t,n)=>t.toFixed(n),g:(t,n)=>t.toPrecision(n),o:t=>Math.round(t).toString(8),p:(t,n)=>wc(100*t,n),r:wc,s:function(t,n){var e=yc(t,n);if(!e)return t+"";var r=e[0],i=e[1],o=i-(_c=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+yc(t,Math.max(0,n+o-1))[0]},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Ac(t){return t}var Tc,Sc=Array.prototype.map,Ec=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function kc(t){var n,e,r=void 0===t.grouping||void 0===t.thousands?Ac:(n=Sc.call(t.grouping,Number),e=t.thousands+"",function(t,r){for(var i=t.length,o=[],a=0,u=n[0],c=0;i>0&&u>0&&(c+u+1>r&&(u=Math.max(1,r-c)),o.push(t.substring(i-=u,i+u)),!((c+=u+1)>r));)u=n[a=(a+1)%n.length];return o.reverse().join(e)}),i=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",a=void 0===t.decimal?".":t.decimal+"",u=void 0===t.numerals?Ac:function(t){return function(n){return n.replace(/[0-9]/g,(function(n){return t[+n]}))}}(Sc.call(t.numerals,String)),c=void 0===t.percent?"%":t.percent+"",f=void 0===t.minus?"−":t.minus+"",s=void 0===t.nan?"NaN":t.nan+"";function l(t){var n=(t=mc(t)).fill,e=t.align,l=t.sign,h=t.symbol,d=t.zero,p=t.width,g=t.comma,y=t.precision,v=t.trim,_=t.type;"n"===_?(g=!0,_="g"):Mc[_]||(void 0===y&&(y=12),v=!0,_="g"),(d||"0"===n&&"="===e)&&(d=!0,n="0",e="=");var b="$"===h?i:"#"===h&&/[boxX]/.test(_)?"0"+_.toLowerCase():"",m="$"===h?o:/[%p]/.test(_)?c:"",x=Mc[_],w=/[defgprs%]/.test(_);function M(t){var i,o,c,h=b,M=m;if("c"===_)M=x(t)+M,t="";else{var A=(t=+t)<0||1/t<0;if(t=isNaN(t)?s:x(Math.abs(t),y),v&&(t=function(t){t:for(var n,e=t.length,r=1,i=-1;r<e;++r)switch(t[r]){case".":i=n=r;break;case"0":0===i&&(i=r),n=r;break;default:if(!+t[r])break t;i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(n+1):t}(t)),A&&0==+t&&"+"!==l&&(A=!1),h=(A?"("===l?l:f:"-"===l||"("===l?"":l)+h,M=("s"===_?Ec[8+_c/3]:"")+M+(A&&"("===l?")":""),w)for(i=-1,o=t.length;++i<o;)if(48>(c=t.charCodeAt(i))||c>57){M=(46===c?a+t.slice(i+1):t.slice(i))+M,t=t.slice(0,i);break}}g&&!d&&(t=r(t,1/0));var T=h.length+t.length+M.length,S=T<p?new Array(p-T+1).join(n):"";switch(g&&d&&(t=r(S+t,S.length?p-M.length:1/0),S=""),e){case"<":t=h+t+M+S;break;case"=":t=h+S+t+M;break;case"^":t=S.slice(0,T=S.length>>1)+h+t+M+S.slice(T);break;default:t=S+h+t+M}return u(t)}return y=void 0===y?6:/[gprs]/.test(_)?Math.max(1,Math.min(21,y)):Math.max(0,Math.min(20,y)),M.toString=function(){return t+""},M}return{format:l,formatPrefix:function(t,n){var e=l(((t=mc(t)).type="f",t)),r=3*Math.max(-8,Math.min(8,Math.floor(vc(n)/3))),i=Math.pow(10,-r),o=Ec[8+r/3];return function(t){return e(i*t)+o}}}}function Nc(n){return Tc=kc(n),t.format=Tc.format,t.formatPrefix=Tc.formatPrefix,Tc}function Cc(t){return Math.max(0,-vc(Math.abs(t)))}function Pc(t,n){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(vc(n)/3)))-vc(Math.abs(t)))}function zc(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,vc(n)-vc(t))+1}t.format=void 0,t.formatPrefix=void 0,Nc({thousands:",",grouping:[3],currency:["$",""]});var Dc=1e-6,qc=1e-12,Rc=Math.PI,Fc=Rc/2,Oc=Rc/4,Uc=2*Rc,Ic=180/Rc,Bc=Rc/180,Yc=Math.abs,Lc=Math.atan,jc=Math.atan2,Hc=Math.cos,Xc=Math.ceil,Gc=Math.exp,Vc=Math.hypot,$c=Math.log,Wc=Math.pow,Zc=Math.sin,Kc=Math.sign||function(t){return t>0?1:t<0?-1:0},Qc=Math.sqrt,Jc=Math.tan;function tf(t){return t>1?0:t<-1?Rc:Math.acos(t)}function nf(t){return t>1?Fc:t<-1?-Fc:Math.asin(t)}function ef(t){return(t=Zc(t/2))*t}function rf(){}function of(t,n){t&&uf.hasOwnProperty(t.type)&&uf[t.type](t,n)}var af={Feature:function(t,n){of(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)of(e[r].geometry,n)}},uf={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)t=e[r],n.point(t[0],t[1],t[2])},LineString:function(t,n){cf(t.coordinates,n,0)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)cf(e[r],n,0)},Polygon:function(t,n){ff(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)ff(e[r],n)},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)of(e[r],n)}};function cf(t,n,e){var r,i=-1,o=t.length-e;for(n.lineStart();++i<o;)r=t[i],n.point(r[0],r[1],r[2]);n.lineEnd()}function ff(t,n){var e=-1,r=t.length;for(n.polygonStart();++e<r;)cf(t[e],n,1);n.polygonEnd()}function sf(t,n){t&&af.hasOwnProperty(t.type)?af[t.type](t,n):of(t,n)}var lf,hf,df,pf,gf,yf,vf,_f,bf,mf,xf,wf,Mf,Af,Tf,Sf,Ef=new y,kf=new y,Nf={point:rf,lineStart:rf,lineEnd:rf,polygonStart:function(){Ef=new y,Nf.lineStart=Cf,Nf.lineEnd=Pf},polygonEnd:function(){var t=+Ef;kf.add(t<0?Uc+t:t),this.lineStart=this.lineEnd=this.point=rf},sphere:function(){kf.add(Uc)}};function Cf(){Nf.point=zf}function Pf(){Df(lf,hf)}function zf(t,n){Nf.point=Df,lf=t,hf=n,df=t*=Bc,pf=Hc(n=(n*=Bc)/2+Oc),gf=Zc(n)}function Df(t,n){var e=(t*=Bc)-df,r=e>=0?1:-1,i=r*e,o=Hc(n=(n*=Bc)/2+Oc),a=Zc(n),u=gf*a,c=pf*o+u*Hc(i),f=u*r*Zc(i);Ef.add(jc(f,c)),df=t,pf=o,gf=a}function qf(t){return[jc(t[1],t[0]),nf(t[2])]}function Rf(t){var n=t[0],e=t[1],r=Hc(e);return[r*Hc(n),r*Zc(n),Zc(e)]}function Ff(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Of(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function Uf(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function If(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function Bf(t){var n=Qc(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}var Yf,Lf,jf,Hf,Xf,Gf,Vf,$f,Wf,Zf,Kf,Qf,Jf,ts,ns,es,rs={point:is,lineStart:as,lineEnd:us,polygonStart:function(){rs.point=cs,rs.lineStart=fs,rs.lineEnd=ss,Af=new y,Nf.polygonStart()},polygonEnd:function(){Nf.polygonEnd(),rs.point=is,rs.lineStart=as,rs.lineEnd=us,Ef<0?(yf=-(_f=180),vf=-(bf=90)):Af>Dc?bf=90:Af<-1e-6&&(vf=-90),Sf[0]=yf,Sf[1]=_f},sphere:function(){yf=-(_f=180),vf=-(bf=90)}};function is(t,n){Tf.push(Sf=[yf=t,_f=t]),n<vf&&(vf=n),n>bf&&(bf=n)}function os(t,n){var e=Rf([t*Bc,n*Bc]);if(Mf){var r=Of(Mf,e),i=Of([r[1],-r[0],0],r);Bf(i),i=qf(i);var o,a=t-mf,u=a>0?1:-1,c=i[0]*Ic*u,f=Yc(a)>180;f^(u*mf<c&&c<u*t)?(o=i[1]*Ic)>bf&&(bf=o):f^(u*mf<(c=(c+360)%360-180)&&c<u*t)?(o=-i[1]*Ic)<vf&&(vf=o):(n<vf&&(vf=n),n>bf&&(bf=n)),f?t<mf?ls(yf,t)>ls(yf,_f)&&(_f=t):ls(t,_f)>ls(yf,_f)&&(yf=t):_f>=yf?(t<yf&&(yf=t),t>_f&&(_f=t)):t>mf?ls(yf,t)>ls(yf,_f)&&(_f=t):ls(t,_f)>ls(yf,_f)&&(yf=t)}else Tf.push(Sf=[yf=t,_f=t]);n<vf&&(vf=n),n>bf&&(bf=n),Mf=e,mf=t}function as(){rs.point=os}function us(){Sf[0]=yf,Sf[1]=_f,rs.point=is,Mf=null}function cs(t,n){if(Mf){var e=t-mf;Af.add(Yc(e)>180?e+(e>0?360:-360):e)}else xf=t,wf=n;Nf.point(t,n),os(t,n)}function fs(){Nf.lineStart()}function ss(){cs(xf,wf),Nf.lineEnd(),Yc(Af)>Dc&&(yf=-(_f=180)),Sf[0]=yf,Sf[1]=_f,Mf=null}function ls(t,n){return(n-=t)<0?n+360:n}function hs(t,n){return t[0]-n[0]}function ds(t,n){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var ps={sphere:rf,point:gs,lineStart:vs,lineEnd:ms,polygonStart:function(){ps.lineStart=xs,ps.lineEnd=ws},polygonEnd:function(){ps.lineStart=vs,ps.lineEnd=ms}};function gs(t,n){t*=Bc;var e=Hc(n*=Bc);ys(e*Hc(t),e*Zc(t),Zc(n))}function ys(t,n,e){++Yf,jf+=(t-jf)/Yf,Hf+=(n-Hf)/Yf,Xf+=(e-Xf)/Yf}function vs(){ps.point=_s}function _s(t,n){t*=Bc;var e=Hc(n*=Bc);ts=e*Hc(t),ns=e*Zc(t),es=Zc(n),ps.point=bs,ys(ts,ns,es)}function bs(t,n){t*=Bc;var e=Hc(n*=Bc),r=e*Hc(t),i=e*Zc(t),o=Zc(n),a=jc(Qc((a=ns*o-es*i)*a+(a=es*r-ts*o)*a+(a=ts*i-ns*r)*a),ts*r+ns*i+es*o);Lf+=a,Gf+=a*(ts+(ts=r)),Vf+=a*(ns+(ns=i)),$f+=a*(es+(es=o)),ys(ts,ns,es)}function ms(){ps.point=gs}function xs(){ps.point=Ms}function ws(){As(Qf,Jf),ps.point=gs}function Ms(t,n){Qf=t,Jf=n,t*=Bc,n*=Bc,ps.point=As;var e=Hc(n);ts=e*Hc(t),ns=e*Zc(t),es=Zc(n),ys(ts,ns,es)}function As(t,n){t*=Bc;var e=Hc(n*=Bc),r=e*Hc(t),i=e*Zc(t),o=Zc(n),a=ns*o-es*i,u=es*r-ts*o,c=ts*i-ns*r,f=Vc(a,u,c),s=nf(f),l=f&&-s/f;Wf.add(l*a),Zf.add(l*u),Kf.add(l*c),Lf+=s,Gf+=s*(ts+(ts=r)),Vf+=s*(ns+(ns=i)),$f+=s*(es+(es=o)),ys(ts,ns,es)}function Ts(t){return function(){return t}}function Ss(t,n){function e(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(e.invert=function(e,r){return(e=n.invert(e,r))&&t.invert(e[0],e[1])}),e}function Es(t,n){return[Yc(t)>Rc?t+Math.round(-t/Uc)*Uc:t,n]}function ks(t,n,e){return(t%=Uc)?n||e?Ss(Cs(t),Ps(n,e)):Cs(t):n||e?Ps(n,e):Es}function Ns(t){return function(n,e){return[(n+=t)>Rc?n-Uc:n<-Rc?n+Uc:n,e]}}function Cs(t){var n=Ns(t);return n.invert=Ns(-t),n}function Ps(t,n){var e=Hc(t),r=Zc(t),i=Hc(n),o=Zc(n);function a(t,n){var a=Hc(n),u=Hc(t)*a,c=Zc(t)*a,f=Zc(n),s=f*e+u*r;return[jc(c*i-s*o,u*e-f*r),nf(s*i+c*o)]}return a.invert=function(t,n){var a=Hc(n),u=Hc(t)*a,c=Zc(t)*a,f=Zc(n),s=f*i-c*o;return[jc(c*i+f*o,u*e+s*r),nf(s*e-u*r)]},a}function zs(t){function n(n){return(n=t(n[0]*Bc,n[1]*Bc))[0]*=Ic,n[1]*=Ic,n}return t=ks(t[0]*Bc,t[1]*Bc,t.length>2?t[2]*Bc:0),n.invert=function(n){return(n=t.invert(n[0]*Bc,n[1]*Bc))[0]*=Ic,n[1]*=Ic,n},n}function Ds(t,n,e,r,i,o){if(e){var a=Hc(n),u=Zc(n),c=r*e;null==i?(i=n+r*Uc,o=n-c/2):(i=qs(a,i),o=qs(a,o),(r>0?i<o:i>o)&&(i+=r*Uc));for(var f,s=i;r>0?s>o:s<o;s-=c)f=qf([a,-u*Hc(s),-u*Zc(s)]),t.point(f[0],f[1])}}function qs(t,n){(n=Rf(n))[0]-=t,Bf(n);var e=tf(-n[1]);return((-n[2]<0?-e:e)+Uc-Dc)%Uc}function Rs(){var t,n=[];return{point:function(n,e,r){t.push([n,e,r])},lineStart:function(){n.push(t=[])},lineEnd:rf,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function Fs(t,n){return Yc(t[0]-n[0])<Dc&&Yc(t[1]-n[1])<Dc}function Os(t,n,e,r){this.x=t,this.z=n,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Us(t,n,e,r,i){var o,a,u=[],c=[];if(t.forEach((function(t){if(!((n=t.length-1)<=0)){var n,e,r=t[0],a=t[n];if(Fs(r,a)){if(!r[2]&&!a[2]){for(i.lineStart(),o=0;o<n;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a[0]+=2e-6}u.push(e=new Os(r,t,null,!0)),c.push(e.o=new Os(r,null,e,!1)),u.push(e=new Os(a,t,null,!1)),c.push(e.o=new Os(a,null,e,!0))}})),u.length){for(c.sort(n),Is(u),Is(c),o=0,a=c.length;o<a;++o)c[o].e=e=!e;for(var f,s,l=u[0];;){for(var h=l,d=!0;h.v;)if((h=h.n)===l)return;f=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(d)for(o=0,a=f.length;o<a;++o)i.point((s=f[o])[0],s[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(d)for(f=h.p.z,o=f.length-1;o>=0;--o)i.point((s=f[o])[0],s[1]);else r(h.x,h.p.x,-1,i);h=h.p}f=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function Is(t){if(n=t.length){for(var n,e,r=0,i=t[0];++r<n;)i.n=e=t[r],e.p=i,i=e;i.n=e=t[0],e.p=i}}function Bs(t){return Yc(t[0])<=Rc?t[0]:Kc(t[0])*((Yc(t[0])+Rc)%Uc-Rc)}function Ys(t,n){var e=Bs(n),r=n[1],i=Zc(r),o=[Zc(e),-Hc(e),0],a=0,u=0,c=new y;1===i?r=Fc+Dc:-1===i&&(r=-Fc-Dc);for(var f=0,s=t.length;f<s;++f)if(h=(l=t[f]).length)for(var l,h,d=l[h-1],p=Bs(d),g=d[1]/2+Oc,v=Zc(g),_=Hc(g),b=0;b<h;++b,p=x,v=M,_=A,d=m){var m=l[b],x=Bs(m),w=m[1]/2+Oc,M=Zc(w),A=Hc(w),T=x-p,S=T>=0?1:-1,E=S*T,k=E>Rc,N=v*M;if(c.add(jc(N*S*Zc(E),_*A+N*Hc(E))),a+=k?T+S*Uc:T,k^p>=e^x>=e){var C=Of(Rf(d),Rf(m));Bf(C);var P=Of(o,C);Bf(P);var z=(k^T>=0?-1:1)*nf(P[2]);(r>z||r===z&&(C[0]||C[1]))&&(u+=k^T>=0?1:-1)}}return(a<-1e-6||a<Dc&&c<-1e-12)^1&u}function Ls(t,n,e,r){return function(i){var o,a,u,c=n(i),f=Rs(),s=n(f),l=!1,h={point:d,lineStart:g,lineEnd:y,polygonStart:function(){h.point=v,h.lineStart=_,h.lineEnd=b,a=[],o=[]},polygonEnd:function(){h.point=d,h.lineStart=g,h.lineEnd=y,a=K(a);var t=Ys(o,r);a.length?(l||(i.polygonStart(),l=!0),Us(a,Hs,t,e,i)):t&&(l||(i.polygonStart(),l=!0),i.lineStart(),e(null,null,1,i),i.lineEnd()),l&&(i.polygonEnd(),l=!1),a=o=null},sphere:function(){i.polygonStart(),i.lineStart(),e(null,null,1,i),i.lineEnd(),i.polygonEnd()}};function d(n,e){t(n,e)&&i.point(n,e)}function p(t,n){c.point(t,n)}function g(){h.point=p,c.lineStart()}function y(){h.point=d,c.lineEnd()}function v(t,n){u.push([t,n]),s.point(t,n)}function _(){s.lineStart(),u=[]}function b(){v(u[0][0],u[0][1]),s.lineEnd();var t,n,e,r,c=s.clean(),h=f.result(),d=h.length;if(u.pop(),o.push(u),u=null,d)if(1&c){if((n=(e=h[0]).length-1)>0){for(l||(i.polygonStart(),l=!0),i.lineStart(),t=0;t<n;++t)i.point((r=e[t])[0],r[1]);i.lineEnd()}}else d>1&&2&c&&h.push(h.pop().concat(h.shift())),a.push(h.filter(js))}return h}}function js(t){return t.length>1}function Hs(t,n){return((t=t.x)[0]<0?t[1]-Fc-Dc:Fc-t[1])-((n=n.x)[0]<0?n[1]-Fc-Dc:Fc-n[1])}Es.invert=Es;var Xs=Ls((function(){return!0}),(function(t){var n,e=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),n=1},point:function(o,a){var u=o>0?Rc:-Rc,c=Yc(o-e);Yc(c-Rc)<Dc?(t.point(e,r=(r+a)/2>0?Fc:-Fc),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(o,r),n=0):i!==u&&c>=Rc&&(Yc(e-i)<Dc&&(e-=i*Dc),Yc(o-u)<Dc&&(o-=u*Dc),r=function(t,n,e,r){var i,o,a=Zc(t-e);return Yc(a)>Dc?Lc((Zc(n)*(o=Hc(r))*Zc(e)-Zc(r)*(i=Hc(n))*Zc(t))/(i*o*a)):(n+r)/2}(e,r,o,a),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),n=0),t.point(e=o,r=a),i=u},lineEnd:function(){t.lineEnd(),e=r=NaN},clean:function(){return 2-n}}}),(function(t,n,e,r){var i;if(null==t)i=e*Fc,r.point(-Rc,i),r.point(0,i),r.point(Rc,i),r.point(Rc,0),r.point(Rc,-i),r.point(0,-i),r.point(-Rc,-i),r.point(-Rc,0),r.point(-Rc,i);else if(Yc(t[0]-n[0])>Dc){var o=t[0]<n[0]?Rc:-Rc;i=e*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(n[0],n[1])}),[-Rc,-Fc]);function Gs(t){var n=Hc(t),e=6*Bc,r=n>0,i=Yc(n)>Dc;function o(t,e){return Hc(t)*Hc(e)>n}function a(t,e,r){var i=[1,0,0],o=Of(Rf(t),Rf(e)),a=Ff(o,o),u=o[0],c=a-u*u;if(!c)return!r&&t;var f=n*a/c,s=-n*u/c,l=Of(i,o),h=If(i,f);Uf(h,If(o,s));var d=l,p=Ff(h,d),g=Ff(d,d),y=p*p-g*(Ff(h,h)-1);if(!(y<0)){var v=Qc(y),_=If(d,(-p-v)/g);if(Uf(_,h),_=qf(_),!r)return _;var b,m=t[0],x=e[0],w=t[1],M=e[1];x<m&&(b=m,m=x,x=b);var A=x-m,T=Yc(A-Rc)<Dc;if(!T&&M<w&&(b=w,w=M,M=b),T||A<Dc?T?w+M>0^_[1]<(Yc(_[0]-m)<Dc?w:M):w<=_[1]&&_[1]<=M:A>Rc^(m<=_[0]&&_[0]<=x)){var S=If(d,(-p+v)/g);return Uf(S,h),[_,qf(S)]}}}function u(n,e){var i=r?t:Rc-t,o=0;return n<-i?o|=1:n>i&&(o|=2),e<-i?o|=4:e>i&&(o|=8),o}return Ls(o,(function(t){var n,e,c,f,s;return{lineStart:function(){f=c=!1,s=1},point:function(l,h){var d,p=[l,h],g=o(l,h),y=r?g?0:u(l,h):g?u(l+(l<0?Rc:-Rc),h):0;if(!n&&(f=c=g)&&t.lineStart(),g!==c&&(!(d=a(n,p))||Fs(n,d)||Fs(p,d))&&(p[2]=1),g!==c)s=0,g?(t.lineStart(),d=a(p,n),t.point(d[0],d[1])):(d=a(n,p),t.point(d[0],d[1],2),t.lineEnd()),n=d;else if(i&&n&&r^g){var v;y&e||!(v=a(p,n,!0))||(s=0,r?(t.lineStart(),t.point(v[0][0],v[0][1]),t.point(v[1][0],v[1][1]),t.lineEnd()):(t.point(v[1][0],v[1][1]),t.lineEnd(),t.lineStart(),t.point(v[0][0],v[0][1],3)))}!g||n&&Fs(n,p)||t.point(p[0],p[1]),n=p,c=g,e=y},lineEnd:function(){c&&t.lineEnd(),n=null},clean:function(){return s|(f&&c)<<1}}}),(function(n,r,i,o){Ds(o,t,e,i,n,r)}),r?[0,-t]:[-Rc,t-Rc])}var Vs,$s,Ws,Zs,Ks=1e9,Qs=-Ks;function Js(t,n,e,r){function i(i,o){return t<=i&&i<=e&&n<=o&&o<=r}function o(i,o,u,f){var s=0,l=0;if(null==i||(s=a(i,u))!==(l=a(o,u))||c(i,o)<0^u>0)do{f.point(0===s||3===s?t:e,s>1?r:n)}while((s=(s+u+4)%4)!==l);else f.point(o[0],o[1])}function a(r,i){return Yc(r[0]-t)<Dc?i>0?0:3:Yc(r[0]-e)<Dc?i>0?2:1:Yc(r[1]-n)<Dc?i>0?1:0:i>0?3:2}function u(t,n){return c(t.x,n.x)}function c(t,n){var e=a(t,1),r=a(n,1);return e!==r?e-r:0===e?n[1]-t[1]:1===e?t[0]-n[0]:2===e?t[1]-n[1]:n[0]-t[0]}return function(a){var c,f,s,l,h,d,p,g,y,v,_,b=a,m=Rs(),x={point:w,lineStart:function(){x.point=M,f&&f.push(s=[]);v=!0,y=!1,p=g=NaN},lineEnd:function(){c&&(M(l,h),d&&y&&m.rejoin(),c.push(m.result()));x.point=w,y&&b.lineEnd()},polygonStart:function(){b=m,c=[],f=[],_=!0},polygonEnd:function(){var n=function(){for(var n=0,e=0,i=f.length;e<i;++e)for(var o,a,u=f[e],c=1,s=u.length,l=u[0],h=l[0],d=l[1];c<s;++c)o=h,a=d,h=(l=u[c])[0],d=l[1],a<=r?d>r&&(h-o)*(r-a)>(d-a)*(t-o)&&++n:d<=r&&(h-o)*(r-a)<(d-a)*(t-o)&&--n;return n}(),e=_&&n,i=(c=K(c)).length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),o(null,null,1,a),a.lineEnd()),i&&Us(c,u,n,o,a),a.polygonEnd());b=a,c=f=s=null}};function w(t,n){i(t,n)&&b.point(t,n)}function M(o,a){var u=i(o,a);if(f&&s.push([o,a]),v)l=o,h=a,d=u,v=!1,u&&(b.lineStart(),b.point(o,a));else if(u&&y)b.point(o,a);else{var c=[p=Math.max(Qs,Math.min(Ks,p)),g=Math.max(Qs,Math.min(Ks,g))],m=[o=Math.max(Qs,Math.min(Ks,o)),a=Math.max(Qs,Math.min(Ks,a))];!function(t,n,e,r,i,o){var a,u=t[0],c=t[1],f=0,s=1,l=n[0]-u,h=n[1]-c;if(a=e-u,l||!(a>0)){if(a/=l,l<0){if(a<f)return;a<s&&(s=a)}else if(l>0){if(a>s)return;a>f&&(f=a)}if(a=i-u,l||!(a<0)){if(a/=l,l<0){if(a>s)return;a>f&&(f=a)}else if(l>0){if(a<f)return;a<s&&(s=a)}if(a=r-c,h||!(a>0)){if(a/=h,h<0){if(a<f)return;a<s&&(s=a)}else if(h>0){if(a>s)return;a>f&&(f=a)}if(a=o-c,h||!(a<0)){if(a/=h,h<0){if(a>s)return;a>f&&(f=a)}else if(h>0){if(a<f)return;a<s&&(s=a)}return f>0&&(t[0]=u+f*l,t[1]=c+f*h),s<1&&(n[0]=u+s*l,n[1]=c+s*h),!0}}}}}(c,m,t,n,e,r)?u&&(b.lineStart(),b.point(o,a),_=!1):(y||(b.lineStart(),b.point(c[0],c[1])),b.point(m[0],m[1]),u||b.lineEnd(),_=!1)}p=o,g=a,y=u}return x}}var tl={sphere:rf,point:rf,lineStart:function(){tl.point=el,tl.lineEnd=nl},lineEnd:rf,polygonStart:rf,polygonEnd:rf};function nl(){tl.point=tl.lineEnd=rf}function el(t,n){$s=t*=Bc,Ws=Zc(n*=Bc),Zs=Hc(n),tl.point=rl}function rl(t,n){t*=Bc;var e=Zc(n*=Bc),r=Hc(n),i=Yc(t-$s),o=Hc(i),a=r*Zc(i),u=Zs*e-Ws*r*o,c=Ws*e+Zs*r*o;Vs.add(jc(Qc(a*a+u*u),c)),$s=t,Ws=e,Zs=r}function il(t){return Vs=new y,sf(t,tl),+Vs}var ol=[null,null],al={type:"LineString",coordinates:ol};function ul(t,n){return ol[0]=t,ol[1]=n,il(al)}var cl={Feature:function(t,n){return sl(t.geometry,n)},FeatureCollection:function(t,n){for(var e=t.features,r=-1,i=e.length;++r<i;)if(sl(e[r].geometry,n))return!0;return!1}},fl={Sphere:function(){return!0},Point:function(t,n){return ll(t.coordinates,n)},MultiPoint:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(ll(e[r],n))return!0;return!1},LineString:function(t,n){return hl(t.coordinates,n)},MultiLineString:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(hl(e[r],n))return!0;return!1},Polygon:function(t,n){return dl(t.coordinates,n)},MultiPolygon:function(t,n){for(var e=t.coordinates,r=-1,i=e.length;++r<i;)if(dl(e[r],n))return!0;return!1},GeometryCollection:function(t,n){for(var e=t.geometries,r=-1,i=e.length;++r<i;)if(sl(e[r],n))return!0;return!1}};function sl(t,n){return!(!t||!fl.hasOwnProperty(t.type))&&fl[t.type](t,n)}function ll(t,n){return 0===ul(t,n)}function hl(t,n){for(var e,r,i,o=0,a=t.length;o<a;o++){if(0===(r=ul(t[o],n)))return!0;if(o>0&&(i=ul(t[o],t[o-1]))>0&&e<=i&&r<=i&&(e+r-i)*(1-Math.pow((e-r)/i,2))<qc*i)return!0;e=r}return!1}function dl(t,n){return!!Ys(t.map(pl),gl(n))}function pl(t){return(t=t.map(gl)).pop(),t}function gl(t){return[t[0]*Bc,t[1]*Bc]}function yl(t,n,e){var r=tt(t,n-Dc,e).concat(n);return function(t){return r.map((function(n){return[t,n]}))}}function vl(t,n,e){var r=tt(t,n-Dc,e).concat(n);return function(t){return r.map((function(n){return[n,t]}))}}function _l(){var t,n,e,r,i,o,a,u,c,f,s,l,h=10,d=h,p=90,g=360,y=2.5;function v(){return{type:"MultiLineString",coordinates:_()}}function _(){return tt(Xc(r/p)*p,e,p).map(s).concat(tt(Xc(u/g)*g,a,g).map(l)).concat(tt(Xc(n/h)*h,t,h).filter((function(t){return Yc(t%p)>Dc})).map(c)).concat(tt(Xc(o/d)*d,i,d).filter((function(t){return Yc(t%g)>Dc})).map(f))}return v.lines=function(){return _().map((function(t){return{type:"LineString",coordinates:t}}))},v.outline=function(){return{type:"Polygon",coordinates:[s(r).concat(l(a).slice(1),s(e).reverse().slice(1),l(u).reverse().slice(1))]}},v.extent=function(t){return arguments.length?v.extentMajor(t).extentMinor(t):v.extentMinor()},v.extentMajor=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],u=+t[0][1],a=+t[1][1],r>e&&(t=r,r=e,e=t),u>a&&(t=u,u=a,a=t),v.precision(y)):[[r,u],[e,a]]},v.extentMinor=function(e){return arguments.length?(n=+e[0][0],t=+e[1][0],o=+e[0][1],i=+e[1][1],n>t&&(e=n,n=t,t=e),o>i&&(e=o,o=i,i=e),v.precision(y)):[[n,o],[t,i]]},v.step=function(t){return arguments.length?v.stepMajor(t).stepMinor(t):v.stepMinor()},v.stepMajor=function(t){return arguments.length?(p=+t[0],g=+t[1],v):[p,g]},v.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],v):[h,d]},v.precision=function(h){return arguments.length?(y=+h,c=yl(o,i,90),f=vl(n,t,y),s=yl(u,a,90),l=vl(r,e,y),v):y},v.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])}var bl,ml,xl,wl,Ml=t=>t,Al=new y,Tl=new y,Sl={point:rf,lineStart:rf,lineEnd:rf,polygonStart:function(){Sl.lineStart=El,Sl.lineEnd=Cl},polygonEnd:function(){Sl.lineStart=Sl.lineEnd=Sl.point=rf,Al.add(Yc(Tl)),Tl=new y},result:function(){var t=Al/2;return Al=new y,t}};function El(){Sl.point=kl}function kl(t,n){Sl.point=Nl,bl=xl=t,ml=wl=n}function Nl(t,n){Tl.add(wl*t-xl*n),xl=t,wl=n}function Cl(){Nl(bl,ml)}var Pl=Sl,zl=1/0,Dl=zl,ql=-zl,Rl=ql,Fl={point:function(t,n){t<zl&&(zl=t);t>ql&&(ql=t);n<Dl&&(Dl=n);n>Rl&&(Rl=n)},lineStart:rf,lineEnd:rf,polygonStart:rf,polygonEnd:rf,result:function(){var t=[[zl,Dl],[ql,Rl]];return ql=Rl=-(Dl=zl=1/0),t}};var Ol,Ul,Il,Bl,Yl=Fl,Ll=0,jl=0,Hl=0,Xl=0,Gl=0,Vl=0,$l=0,Wl=0,Zl=0,Kl={point:Ql,lineStart:Jl,lineEnd:eh,polygonStart:function(){Kl.lineStart=rh,Kl.lineEnd=ih},polygonEnd:function(){Kl.point=Ql,Kl.lineStart=Jl,Kl.lineEnd=eh},result:function(){var t=Zl?[$l/Zl,Wl/Zl]:Vl?[Xl/Vl,Gl/Vl]:Hl?[Ll/Hl,jl/Hl]:[NaN,NaN];return Ll=jl=Hl=Xl=Gl=Vl=$l=Wl=Zl=0,t}};function Ql(t,n){Ll+=t,jl+=n,++Hl}function Jl(){Kl.point=th}function th(t,n){Kl.point=nh,Ql(Il=t,Bl=n)}function nh(t,n){var e=t-Il,r=n-Bl,i=Qc(e*e+r*r);Xl+=i*(Il+t)/2,Gl+=i*(Bl+n)/2,Vl+=i,Ql(Il=t,Bl=n)}function eh(){Kl.point=Ql}function rh(){Kl.point=oh}function ih(){ah(Ol,Ul)}function oh(t,n){Kl.point=ah,Ql(Ol=Il=t,Ul=Bl=n)}function ah(t,n){var e=t-Il,r=n-Bl,i=Qc(e*e+r*r);Xl+=i*(Il+t)/2,Gl+=i*(Bl+n)/2,Vl+=i,$l+=(i=Bl*t-Il*n)*(Il+t),Wl+=i*(Bl+n),Zl+=3*i,Ql(Il=t,Bl=n)}var uh=Kl;function ch(t){this._context=t}ch.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._context.moveTo(t,n),this._point=1;break;case 1:this._context.lineTo(t,n);break;default:this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,Uc)}},result:rf};var fh,sh,lh,hh,dh,ph=new y,gh={point:rf,lineStart:function(){gh.point=yh},lineEnd:function(){fh&&vh(sh,lh),gh.point=rf},polygonStart:function(){fh=!0},polygonEnd:function(){fh=null},result:function(){var t=+ph;return ph=new y,t}};function yh(t,n){gh.point=vh,sh=hh=t,lh=dh=n}function vh(t,n){hh-=t,dh-=n,ph.add(Qc(hh*hh+dh*dh)),hh=t,dh=n}var _h=gh;function bh(){this._string=[]}function mh(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function xh(t){return function(n){var e=new wh;for(var r in t)e[r]=t[r];return e.stream=n,e}}function wh(){}function Mh(t,n,e){var r=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),null!=r&&t.clipExtent(null),sf(e,t.stream(Yl)),n(Yl.result()),null!=r&&t.clipExtent(r),t}function Ah(t,n,e){return Mh(t,(function(e){var r=n[1][0]-n[0][0],i=n[1][1]-n[0][1],o=Math.min(r/(e[1][0]-e[0][0]),i/(e[1][1]-e[0][1])),a=+n[0][0]+(r-o*(e[1][0]+e[0][0]))/2,u=+n[0][1]+(i-o*(e[1][1]+e[0][1]))/2;t.scale(150*o).translate([a,u])}),e)}function Th(t,n,e){return Ah(t,[[0,0],n],e)}function Sh(t,n,e){return Mh(t,(function(e){var r=+n,i=r/(e[1][0]-e[0][0]),o=(r-i*(e[1][0]+e[0][0]))/2,a=-i*e[0][1];t.scale(150*i).translate([o,a])}),e)}function Eh(t,n,e){return Mh(t,(function(e){var r=+n,i=r/(e[1][1]-e[0][1]),o=-i*e[0][0],a=(r-i*(e[1][1]+e[0][1]))/2;t.scale(150*i).translate([o,a])}),e)}bh.prototype={_radius:4.5,_circle:mh(4.5),pointRadius:function(t){return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,n){switch(this._point){case 0:this._string.push("M",t,",",n),this._point=1;break;case 1:this._string.push("L",t,",",n);break;default:null==this._circle&&(this._circle=mh(this._radius)),this._string.push("M",t,",",n,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}return null}},wh.prototype={constructor:wh,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var kh=Hc(30*Bc);function Nh(t,n){return+n?function(t,n){function e(r,i,o,a,u,c,f,s,l,h,d,p,g,y){var v=f-r,_=s-i,b=v*v+_*_;if(b>4*n&&g--){var m=a+h,x=u+d,w=c+p,M=Qc(m*m+x*x+w*w),A=nf(w/=M),T=Yc(Yc(w)-1)<Dc||Yc(o-l)<Dc?(o+l)/2:jc(x,m),S=t(T,A),E=S[0],k=S[1],N=E-r,C=k-i,P=_*N-v*C;(P*P/b>n||Yc((v*N+_*C)/b-.5)>.3||a*h+u*d+c*p<kh)&&(e(r,i,o,a,u,c,E,k,T,m/=M,x/=M,w,g,y),y.point(E,k),e(E,k,T,m,x,w,f,s,l,h,d,p,g,y))}}return function(n){var r,i,o,a,u,c,f,s,l,h,d,p,g={point:y,lineStart:v,lineEnd:b,polygonStart:function(){n.polygonStart(),g.lineStart=m},polygonEnd:function(){n.polygonEnd(),g.lineStart=v}};function y(e,r){e=t(e,r),n.point(e[0],e[1])}function v(){s=NaN,g.point=_,n.lineStart()}function _(r,i){var o=Rf([r,i]),a=t(r,i);e(s,l,f,h,d,p,s=a[0],l=a[1],f=r,h=o[0],d=o[1],p=o[2],16,n),n.point(s,l)}function b(){g.point=y,n.lineEnd()}function m(){v(),g.point=x,g.lineEnd=w}function x(t,n){_(r=t,n),i=s,o=l,a=h,u=d,c=p,g.point=_}function w(){e(s,l,f,h,d,p,i,o,r,a,u,c,16,n),g.lineEnd=b,b()}return g}}(t,n):function(t){return xh({point:function(n,e){n=t(n,e),this.stream.point(n[0],n[1])}})}(t)}var Ch=xh({point:function(t,n){this.stream.point(t*Bc,n*Bc)}});function Ph(t,n,e,r,i,o){if(!o)return function(t,n,e,r,i){function o(o,a){return[n+t*(o*=r),e-t*(a*=i)]}return o.invert=function(o,a){return[(o-n)/t*r,(e-a)/t*i]},o}(t,n,e,r,i);var a=Hc(o),u=Zc(o),c=a*t,f=u*t,s=a/t,l=u/t,h=(u*e-a*n)/t,d=(u*n+a*e)/t;function p(t,o){return[c*(t*=r)-f*(o*=i)+n,e-f*t-c*o]}return p.invert=function(t,n){return[r*(s*t-l*n+h),i*(d-l*t-s*n)]},p}function zh(t){return Dh((function(){return t}))()}function Dh(t){var n,e,r,i,o,a,u,c,f,s,l=150,h=480,d=250,p=0,g=0,y=0,v=0,_=0,b=0,m=1,x=1,w=null,M=Xs,A=null,T=Ml,S=.5;function E(t){return c(t[0]*Bc,t[1]*Bc)}function k(t){return(t=c.invert(t[0],t[1]))&&[t[0]*Ic,t[1]*Ic]}function N(){var t=Ph(l,0,0,m,x,b).apply(null,n(p,g)),r=Ph(l,h-t[0],d-t[1],m,x,b);return e=ks(y,v,_),u=Ss(n,r),c=Ss(e,u),a=Nh(u,S),C()}function C(){return f=s=null,E}return E.stream=function(t){return f&&s===t?f:f=Ch(function(t){return xh({point:function(n,e){var r=t(n,e);return this.stream.point(r[0],r[1])}})}(e)(M(a(T(s=t)))))},E.preclip=function(t){return arguments.length?(M=t,w=void 0,C()):M},E.postclip=function(t){return arguments.length?(T=t,A=r=i=o=null,C()):T},E.clipAngle=function(t){return arguments.length?(M=+t?Gs(w=t*Bc):(w=null,Xs),C()):w*Ic},E.clipExtent=function(t){return arguments.length?(T=null==t?(A=r=i=o=null,Ml):Js(A=+t[0][0],r=+t[0][1],i=+t[1][0],o=+t[1][1]),C()):null==A?null:[[A,r],[i,o]]},E.scale=function(t){return arguments.length?(l=+t,N()):l},E.translate=function(t){return arguments.length?(h=+t[0],d=+t[1],N()):[h,d]},E.center=function(t){return arguments.length?(p=t[0]%360*Bc,g=t[1]%360*Bc,N()):[p*Ic,g*Ic]},E.rotate=function(t){return arguments.length?(y=t[0]%360*Bc,v=t[1]%360*Bc,_=t.length>2?t[2]%360*Bc:0,N()):[y*Ic,v*Ic,_*Ic]},E.angle=function(t){return arguments.length?(b=t%360*Bc,N()):b*Ic},E.reflectX=function(t){return arguments.length?(m=t?-1:1,N()):m<0},E.reflectY=function(t){return arguments.length?(x=t?-1:1,N()):x<0},E.precision=function(t){return arguments.length?(a=Nh(u,S=t*t),C()):Qc(S)},E.fitExtent=function(t,n){return Ah(E,t,n)},E.fitSize=function(t,n){return Th(E,t,n)},E.fitWidth=function(t,n){return Sh(E,t,n)},E.fitHeight=function(t,n){return Eh(E,t,n)},function(){return n=t.apply(this,arguments),E.invert=n.invert&&k,N()}}function qh(t){var n=0,e=Rc/3,r=Dh(t),i=r(n,e);return i.parallels=function(t){return arguments.length?r(n=t[0]*Bc,e=t[1]*Bc):[n*Ic,e*Ic]},i}function Rh(t,n){var e=Zc(t),r=(e+Zc(n))/2;if(Yc(r)<Dc)return function(t){var n=Hc(t);function e(t,e){return[t*n,Zc(e)/n]}return e.invert=function(t,e){return[t/n,nf(e*n)]},e}(t);var i=1+e*(2*r-e),o=Qc(i)/r;function a(t,n){var e=Qc(i-2*r*Zc(n))/r;return[e*Zc(t*=r),o-e*Hc(t)]}return a.invert=function(t,n){var e=o-n,a=jc(t,Yc(e))*Kc(e);return e*r<0&&(a-=Rc*Kc(t)*Kc(e)),[a/r,nf((i-(t*t+e*e)*r*r)/(2*r))]},a}function Fh(){return qh(Rh).scale(155.424).center([0,33.6442])}function Oh(){return Fh().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function Uh(t){return function(n,e){var r=Hc(n),i=Hc(e),o=t(r*i);return o===1/0?[2,0]:[o*i*Zc(n),o*Zc(e)]}}function Ih(t){return function(n,e){var r=Qc(n*n+e*e),i=t(r),o=Zc(i),a=Hc(i);return[jc(n*o,r*a),nf(r&&e*o/r)]}}var Bh=Uh((function(t){return Qc(2/(1+t))}));Bh.invert=Ih((function(t){return 2*nf(t/2)}));var Yh=Uh((function(t){return(t=tf(t))&&t/Zc(t)}));function Lh(t,n){return[t,$c(Jc((Fc+n)/2))]}function jh(t){var n,e,r,i=zh(t),o=i.center,a=i.scale,u=i.translate,c=i.clipExtent,f=null;function s(){var o=Rc*a(),u=i(zs(i.rotate()).invert([0,0]));return c(null==f?[[u[0]-o,u[1]-o],[u[0]+o,u[1]+o]]:t===Lh?[[Math.max(u[0]-o,f),n],[Math.min(u[0]+o,e),r]]:[[f,Math.max(u[1]-o,n)],[e,Math.min(u[1]+o,r)]])}return i.scale=function(t){return arguments.length?(a(t),s()):a()},i.translate=function(t){return arguments.length?(u(t),s()):u()},i.center=function(t){return arguments.length?(o(t),s()):o()},i.clipExtent=function(t){return arguments.length?(null==t?f=n=e=r=null:(f=+t[0][0],n=+t[0][1],e=+t[1][0],r=+t[1][1]),s()):null==f?null:[[f,n],[e,r]]},s()}function Hh(t){return Jc((Fc+t)/2)}function Xh(t,n){var e=Hc(t),r=t===n?Zc(t):$c(e/Hc(n))/$c(Hh(n)/Hh(t)),i=e*Wc(Hh(t),r)/r;if(!r)return Lh;function o(t,n){i>0?n<-Fc+Dc&&(n=-Fc+Dc):n>Fc-Dc&&(n=Fc-Dc);var e=i/Wc(Hh(n),r);return[e*Zc(r*t),i-e*Hc(r*t)]}return o.invert=function(t,n){var e=i-n,o=Kc(r)*Qc(t*t+e*e),a=jc(t,Yc(e))*Kc(e);return e*r<0&&(a-=Rc*Kc(t)*Kc(e)),[a/r,2*Lc(Wc(i/o,1/r))-Fc]},o}function Gh(t,n){return[t,n]}function Vh(t,n){var e=Hc(t),r=t===n?Zc(t):(e-Hc(n))/(n-t),i=e/r+t;if(Yc(r)<Dc)return Gh;function o(t,n){var e=i-n,o=r*t;return[e*Zc(o),i-e*Hc(o)]}return o.invert=function(t,n){var e=i-n,o=jc(t,Yc(e))*Kc(e);return e*r<0&&(o-=Rc*Kc(t)*Kc(e)),[o/r,i-Kc(r)*Qc(t*t+e*e)]},o}Yh.invert=Ih((function(t){return t})),Lh.invert=function(t,n){return[t,2*Lc(Gc(n))-Fc]},Gh.invert=Gh;var $h=1.340264,Wh=-.081106,Zh=893e-6,Kh=.003796,Qh=Qc(3)/2;function Jh(t,n){var e=nf(Qh*Zc(n)),r=e*e,i=r*r*r;return[t*Hc(e)/(Qh*($h+3*Wh*r+i*(7*Zh+9*Kh*r))),e*($h+Wh*r+i*(Zh+Kh*r))]}function td(t,n){var e=Hc(n),r=Hc(t)*e;return[e*Zc(t)/r,Zc(n)/r]}function nd(t,n){var e=n*n,r=e*e;return[t*(.8707-.131979*e+r*(r*(.003971*e-.001529*r)-.013791)),n*(1.007226+e*(.015085+r*(.028874*e-.044475-.005916*r)))]}function ed(t,n){return[Hc(n)*Zc(t),Zc(n)]}function rd(t,n){var e=Hc(n),r=1+Hc(t)*e;return[e*Zc(t)/r,Zc(n)/r]}function id(t,n){return[$c(Jc((Fc+n)/2)),-t]}function od(t,n){return t.parent===n.parent?1:2}function ad(t,n){return t+n.x}function ud(t,n){return Math.max(t,n.y)}function cd(t){var n=0,e=t.children,r=e&&e.length;if(r)for(;--r>=0;)n+=e[r].value;else n=1;t.value=n}function fd(t,n){t instanceof Map?(t=[void 0,t],void 0===n&&(n=ld)):void 0===n&&(n=sd);for(var e,r,i,o,a,u=new pd(t),c=[u];e=c.pop();)if((i=n(e.data))&&(a=(i=Array.from(i)).length))for(e.children=i,o=a-1;o>=0;--o)c.push(r=i[o]=new pd(i[o])),r.parent=e,r.depth=e.depth+1;return u.eachBefore(dd)}function sd(t){return t.children}function ld(t){return Array.isArray(t)?t[1]:null}function hd(t){void 0!==t.data.value&&(t.value=t.data.value),t.data=t.data.data}function dd(t){var n=0;do{t.height=n}while((t=t.parent)&&t.height<++n)}function pd(t){this.data=t,this.depth=this.height=0,this.parent=null}function gd(t){for(var n,e,r=0,i=(t=function(t){for(var n,e,r=t.length;r;)e=Math.random()*r--|0,n=t[r],t[r]=t[e],t[e]=n;return t}(Array.from(t))).length,o=[];r<i;)n=t[r],e&&_d(e,n)?++r:(e=md(o=yd(o,n)),r=0);return e}function yd(t,n){var e,r;if(bd(n,t))return[n];for(e=0;e<t.length;++e)if(vd(n,t[e])&&bd(xd(t[e],n),t))return[t[e],n];for(e=0;e<t.length-1;++e)for(r=e+1;r<t.length;++r)if(vd(xd(t[e],t[r]),n)&&vd(xd(t[e],n),t[r])&&vd(xd(t[r],n),t[e])&&bd(wd(t[e],t[r],n),t))return[t[e],t[r],n];throw new Error}function vd(t,n){var e=t.r-n.r,r=n.x-t.x,i=n.y-t.y;return e<0||e*e<r*r+i*i}function _d(t,n){var e=t.r-n.r+1e-9*Math.max(t.r,n.r,1),r=n.x-t.x,i=n.y-t.y;return e>0&&e*e>r*r+i*i}function bd(t,n){for(var e=0;e<n.length;++e)if(!_d(t,n[e]))return!1;return!0}function md(t){switch(t.length){case 1:return function(t){return{x:t.x,y:t.y,r:t.r}}(t[0]);case 2:return xd(t[0],t[1]);case 3:return wd(t[0],t[1],t[2])}}function xd(t,n){var e=t.x,r=t.y,i=t.r,o=n.x,a=n.y,u=n.r,c=o-e,f=a-r,s=u-i,l=Math.sqrt(c*c+f*f);return{x:(e+o+c/l*s)/2,y:(r+a+f/l*s)/2,r:(l+i+u)/2}}function wd(t,n,e){var r=t.x,i=t.y,o=t.r,a=n.x,u=n.y,c=n.r,f=e.x,s=e.y,l=e.r,h=r-a,d=r-f,p=i-u,g=i-s,y=c-o,v=l-o,_=r*r+i*i-o*o,b=_-a*a-u*u+c*c,m=_-f*f-s*s+l*l,x=d*p-h*g,w=(p*m-g*b)/(2*x)-r,M=(g*y-p*v)/x,A=(d*b-h*m)/(2*x)-i,T=(h*v-d*y)/x,S=M*M+T*T-1,E=2*(o+w*M+A*T),k=w*w+A*A-o*o,N=-(S?(E+Math.sqrt(E*E-4*S*k))/(2*S):k/E);return{x:r+w+M*N,y:i+A+T*N,r:N}}function Md(t,n,e){var r,i,o,a,u=t.x-n.x,c=t.y-n.y,f=u*u+c*c;f?(i=n.r+e.r,i*=i,a=t.r+e.r,i>(a*=a)?(r=(f+a-i)/(2*f),o=Math.sqrt(Math.max(0,a/f-r*r)),e.x=t.x-r*u-o*c,e.y=t.y-r*c+o*u):(r=(f+i-a)/(2*f),o=Math.sqrt(Math.max(0,i/f-r*r)),e.x=n.x+r*u-o*c,e.y=n.y+r*c+o*u)):(e.x=n.x+e.r,e.y=n.y)}function Ad(t,n){var e=t.r+n.r-1e-6,r=n.x-t.x,i=n.y-t.y;return e>0&&e*e>r*r+i*i}function Td(t){var n=t._,e=t.next._,r=n.r+e.r,i=(n.x*e.r+e.x*n.r)/r,o=(n.y*e.r+e.y*n.r)/r;return i*i+o*o}function Sd(t){this._=t,this.next=null,this.previous=null}function Ed(t){if(!(i=(t=function(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}(t)).length))return 0;var n,e,r,i,o,a,u,c,f,s,l;if((n=t[0]).x=0,n.y=0,!(i>1))return n.r;if(e=t[1],n.x=-e.r,e.x=n.r,e.y=0,!(i>2))return n.r+e.r;Md(e,n,r=t[2]),n=new Sd(n),e=new Sd(e),r=new Sd(r),n.next=r.previous=e,e.next=n.previous=r,r.next=e.previous=n;t:for(u=3;u<i;++u){Md(n._,e._,r=t[u]),r=new Sd(r),c=e.next,f=n.previous,s=e._.r,l=n._.r;do{if(s<=l){if(Ad(c._,r._)){e=c,n.next=e,e.previous=n,--u;continue t}s+=c._.r,c=c.next}else{if(Ad(f._,r._)){(n=f).next=e,e.previous=n,--u;continue t}l+=f._.r,f=f.previous}}while(c!==f.next);for(r.previous=n,r.next=e,n.next=e.previous=e=r,o=Td(n);(r=r.next)!==e;)(a=Td(r))<o&&(n=r,o=a);e=n.next}for(n=[e._],r=e;(r=r.next)!==e;)n.push(r._);for(r=gd(n),u=0;u<i;++u)(n=t[u]).x-=r.x,n.y-=r.y;return r.r}function kd(t){return null==t?null:Nd(t)}function Nd(t){if("function"!=typeof t)throw new Error;return t}function Cd(){return 0}function Pd(t){return function(){return t}}function zd(t){return Math.sqrt(t.value)}function Dd(t){return function(n){n.children||(n.r=Math.max(0,+t(n)||0))}}function qd(t,n){return function(e){if(r=e.children){var r,i,o,a=r.length,u=t(e)*n||0;if(u)for(i=0;i<a;++i)r[i].r+=u;if(o=Ed(r),u)for(i=0;i<a;++i)r[i].r-=u;e.r=o+u}}}function Rd(t){return function(n){var e=n.parent;n.r*=t,e&&(n.x=e.x+t*n.x,n.y=e.y+t*n.y)}}function Fd(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function Od(t,n,e,r,i){for(var o,a=t.children,u=-1,c=a.length,f=t.value&&(r-n)/t.value;++u<c;)(o=a[u]).y0=e,o.y1=i,o.x0=n,o.x1=n+=o.value*f}Jh.invert=function(t,n){for(var e,r=n,i=r*r,o=i*i*i,a=0;a<12&&(o=(i=(r-=e=(r*($h+Wh*i+o*(Zh+Kh*i))-n)/($h+3*Wh*i+o*(7*Zh+9*Kh*i)))*r)*i*i,!(Yc(e)<qc));++a);return[Qh*t*($h+3*Wh*i+o*(7*Zh+9*Kh*i))/Hc(r),nf(Zc(r)/Qh)]},td.invert=Ih(Lc),nd.invert=function(t,n){var e,r=n,i=25;do{var o=r*r,a=o*o;r-=e=(r*(1.007226+o*(.015085+a*(.028874*o-.044475-.005916*a)))-n)/(1.007226+o*(.045255+a*(.259866*o-.311325-.005916*11*a)))}while(Yc(e)>Dc&&--i>0);return[t/(.8707+(o=r*r)*(o*(o*o*o*(.003971-.001529*o)-.013791)-.131979)),r]},ed.invert=Ih(nf),rd.invert=Ih((function(t){return 2*Lc(t)})),id.invert=function(t,n){return[-n,2*Lc(Gc(t))-Fc]},pd.prototype=fd.prototype={constructor:pd,count:function(){return this.eachAfter(cd)},each:function(t,n){let e=-1;for(const r of this)t.call(n,r,++e,this);return this},eachAfter:function(t,n){for(var e,r,i,o=this,a=[o],u=[],c=-1;o=a.pop();)if(u.push(o),e=o.children)for(r=0,i=e.length;r<i;++r)a.push(e[r]);for(;o=u.pop();)t.call(n,o,++c,this);return this},eachBefore:function(t,n){for(var e,r,i=this,o=[i],a=-1;i=o.pop();)if(t.call(n,i,++a,this),e=i.children)for(r=e.length-1;r>=0;--r)o.push(e[r]);return this},find:function(t,n){let e=-1;for(const r of this)if(t.call(n,r,++e,this))return r},sum:function(t){return this.eachAfter((function(n){for(var e=+t(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)e+=r[i].value;n.value=e}))},sort:function(t){return this.eachBefore((function(n){n.children&&n.children.sort(t)}))},path:function(t){for(var n=this,e=function(t,n){if(t===n)return t;var e=t.ancestors(),r=n.ancestors(),i=null;t=e.pop(),n=r.pop();for(;t===n;)i=t,t=e.pop(),n=r.pop();return i}(n,t),r=[n];n!==e;)n=n.parent,r.push(n);for(var i=r.length;t!==e;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,n=[t];t=t.parent;)n.push(t);return n},descendants:function(){return Array.from(this)},leaves:function(){var t=[];return this.eachBefore((function(n){n.children||t.push(n)})),t},links:function(){var t=this,n=[];return t.each((function(e){e!==t&&n.push({source:e.parent,target:e})})),n},copy:function(){return fd(this).eachBefore(hd)},[Symbol.iterator]:function*(){var t,n,e,r,i=this,o=[i];do{for(t=o.reverse(),o=[];i=t.pop();)if(yield i,n=i.children)for(e=0,r=n.length;e<r;++e)o.push(n[e])}while(o.length)}};var Ud={depth:-1},Id={};function Bd(t){return t.id}function Yd(t){return t.parentId}function Ld(t,n){return t.parent===n.parent?1:2}function jd(t){var n=t.children;return n?n[0]:t.t}function Hd(t){var n=t.children;return n?n[n.length-1]:t.t}function Xd(t,n,e){var r=e/(n.i-t.i);n.c-=r,n.s+=e,t.c+=r,n.z+=e,n.m+=e}function Gd(t,n,e){return t.a.parent===n.parent?t.a:e}function Vd(t,n){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}function $d(t,n,e,r,i){for(var o,a=t.children,u=-1,c=a.length,f=t.value&&(i-e)/t.value;++u<c;)(o=a[u]).x0=n,o.x1=r,o.y0=e,o.y1=e+=o.value*f}Vd.prototype=Object.create(pd.prototype);var Wd=(1+Math.sqrt(5))/2;function Zd(t,n,e,r,i,o){for(var a,u,c,f,s,l,h,d,p,g,y,v=[],_=n.children,b=0,m=0,x=_.length,w=n.value;b<x;){c=i-e,f=o-r;do{s=_[m++].value}while(!s&&m<x);for(l=h=s,y=s*s*(g=Math.max(f/c,c/f)/(w*t)),p=Math.max(h/y,y/l);m<x;++m){if(s+=u=_[m].value,u<l&&(l=u),u>h&&(h=u),y=s*s*g,(d=Math.max(h/y,y/l))>p){s-=u;break}p=d}v.push(a={value:s,dice:c<f,children:_.slice(b,m)}),a.dice?Od(a,e,r,i,w?r+=f*s/w:o):$d(a,e,r,w?e+=c*s/w:i,o),w-=s,b=m}return v}var Kd=function t(n){function e(t,e,r,i,o){Zd(n,t,e,r,i,o)}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Wd);var Qd=function t(n){function e(t,e,r,i,o){if((a=t._squarify)&&a.ratio===n)for(var a,u,c,f,s,l=-1,h=a.length,d=t.value;++l<h;){for(c=(u=a[l]).children,f=u.value=0,s=c.length;f<s;++f)u.value+=c[f].value;u.dice?Od(u,e,r,i,d?r+=(o-r)*u.value/d:o):$d(u,e,r,d?e+=(i-e)*u.value/d:i,o),d-=u.value}else t._squarify=a=Zd(n,t,e,r,i,o),a.ratio=n}return e.ratio=function(n){return t((n=+n)>1?n:1)},e}(Wd);function Jd(t,n,e){return(n[0]-t[0])*(e[1]-t[1])-(n[1]-t[1])*(e[0]-t[0])}function tp(t,n){return t[0]-n[0]||t[1]-n[1]}function np(t){const n=t.length,e=[0,1];let r,i=2;for(r=2;r<n;++r){for(;i>1&&Jd(t[e[i-2]],t[e[i-1]],t[r])<=0;)--i;e[i++]=r}return e.slice(0,i)}var ep=Math.random,rp=function t(n){function e(t,e){return t=null==t?0:+t,e=null==e?1:+e,1===arguments.length?(e=t,t=0):e-=t,function(){return n()*e+t}}return e.source=t,e}(ep),ip=function t(n){function e(t,e){return arguments.length<2&&(e=t,t=0),t=Math.floor(t),e=Math.floor(e)-t,function(){return Math.floor(n()*e+t)}}return e.source=t,e}(ep),op=function t(n){function e(t,e){var r,i;return t=null==t?0:+t,e=null==e?1:+e,function(){var o;if(null!=r)o=r,r=null;else do{r=2*n()-1,o=2*n()-1,i=r*r+o*o}while(!i||i>1);return t+e*o*Math.sqrt(-2*Math.log(i)/i)}}return e.source=t,e}(ep),ap=function t(n){var e=op.source(n);function r(){var t=e.apply(this,arguments);return function(){return Math.exp(t())}}return r.source=t,r}(ep),up=function t(n){function e(t){return(t=+t)<=0?()=>0:function(){for(var e=0,r=t;r>1;--r)e+=n();return e+r*n()}}return e.source=t,e}(ep),cp=function t(n){var e=up.source(n);function r(t){if(0==(t=+t))return n;var r=e(t);return function(){return r()/t}}return r.source=t,r}(ep),fp=function t(n){function e(t){return function(){return-Math.log1p(-n())/t}}return e.source=t,e}(ep),sp=function t(n){function e(t){if((t=+t)<0)throw new RangeError("invalid alpha");return t=1/-t,function(){return Math.pow(1-n(),t)}}return e.source=t,e}(ep),lp=function t(n){function e(t){if((t=+t)<0||t>1)throw new RangeError("invalid p");return function(){return Math.floor(n()+t)}}return e.source=t,e}(ep),hp=function t(n){function e(t){if((t=+t)<0||t>1)throw new RangeError("invalid p");return 0===t?()=>1/0:1===t?()=>1:(t=Math.log1p(-t),function(){return 1+Math.floor(Math.log1p(-n())/t)})}return e.source=t,e}(ep),dp=function t(n){var e=op.source(n)();function r(t,r){if((t=+t)<0)throw new RangeError("invalid k");if(0===t)return()=>0;if(r=null==r?1:+r,1===t)return()=>-Math.log1p(-n())*r;var i=(t<1?t+1:t)-1/3,o=1/(3*Math.sqrt(i)),a=t<1?()=>Math.pow(n(),1/t):()=>1;return function(){do{do{var t=e(),u=1+o*t}while(u<=0);u*=u*u;var c=1-n()}while(c>=1-.0331*t*t*t*t&&Math.log(c)>=.5*t*t+i*(1-u+Math.log(u)));return i*u*a()*r}}return r.source=t,r}(ep),pp=function t(n){var e=dp.source(n);function r(t,n){var r=e(t),i=e(n);return function(){var t=r();return 0===t?0:t/(t+i())}}return r.source=t,r}(ep),gp=function t(n){var e=hp.source(n),r=pp.source(n);function i(t,n){return t=+t,(n=+n)>=1?()=>t:n<=0?()=>0:function(){for(var i=0,o=t,a=n;o*a>16&&o*(1-a)>16;){var u=Math.floor((o+1)*a),c=r(u,o-u+1)();c<=a?(i+=u,o-=u,a=(a-c)/(1-c)):(o=u-1,a/=c)}for(var f=a<.5,s=e(f?a:1-a),l=s(),h=0;l<=o;++h)l+=s();return i+(f?h:o-h)}}return i.source=t,i}(ep),yp=function t(n){function e(t,e,r){var i;return 0==(t=+t)?i=t=>-Math.log(t):(t=1/t,i=n=>Math.pow(n,t)),e=null==e?0:+e,r=null==r?1:+r,function(){return e+r*i(-Math.log1p(-n()))}}return e.source=t,e}(ep),vp=function t(n){function e(t,e){return t=null==t?0:+t,e=null==e?1:+e,function(){return t+e*Math.tan(Math.PI*n())}}return e.source=t,e}(ep),_p=function t(n){function e(t,e){return t=null==t?0:+t,e=null==e?1:+e,function(){var r=n();return t+e*Math.log(r/(1-r))}}return e.source=t,e}(ep),bp=function t(n){var e=dp.source(n),r=gp.source(n);function i(t){return function(){for(var i=0,o=t;o>16;){var a=Math.floor(.875*o),u=e(a)();if(u>o)return i+r(a-1,o/u)();i+=a,o-=u}for(var c=-Math.log1p(-n()),f=0;c<=o;++f)c-=Math.log1p(-n());return i+f}}return i.source=t,i}(ep);const mp=1/4294967296;function xp(t,n){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(n).domain(t)}return this}function wp(t,n){switch(arguments.length){case 0:break;case 1:"function"==typeof t?this.interpolator(t):this.range(t);break;default:this.domain(t),"function"==typeof n?this.interpolator(n):this.range(n)}return this}const Mp=Symbol("implicit");function Ap(){var t=new InternMap,n=[],e=[],r=Mp;function i(i){let o=t.get(i);if(void 0===o){if(r!==Mp)return r;t.set(i,o=n.push(i)-1)}return e[o%e.length]}return i.domain=function(e){if(!arguments.length)return n.slice();n=[],t=new InternMap;for(const r of e)t.has(r)||t.set(r,n.push(r)-1);return i},i.range=function(t){return arguments.length?(e=Array.from(t),i):e.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return Ap(n,e).unknown(r)},xp.apply(i,arguments),i}function Tp(){var t,n,e=Ap().unknown(void 0),r=e.domain,i=e.range,o=0,a=1,u=!1,c=0,f=0,s=.5;function l(){var e=r().length,l=a<o,h=l?a:o,d=l?o:a;t=(d-h)/Math.max(1,e-c+2*f),u&&(t=Math.floor(t)),h+=(d-h-t*(e-c))*s,n=t*(1-c),u&&(h=Math.round(h),n=Math.round(n));var p=tt(e).map((function(n){return h+t*n}));return i(l?p.reverse():p)}return delete e.unknown,e.domain=function(t){return arguments.length?(r(t),l()):r()},e.range=function(t){return arguments.length?([o,a]=t,o=+o,a=+a,l()):[o,a]},e.rangeRound=function(t){return[o,a]=t,o=+o,a=+a,u=!0,l()},e.bandwidth=function(){return n},e.step=function(){return t},e.round=function(t){return arguments.length?(u=!!t,l()):u},e.padding=function(t){return arguments.length?(c=Math.min(1,f=+t),l()):c},e.paddingInner=function(t){return arguments.length?(c=Math.min(1,t),l()):c},e.paddingOuter=function(t){return arguments.length?(f=+t,l()):f},e.align=function(t){return arguments.length?(s=Math.max(0,Math.min(1,t)),l()):s},e.copy=function(){return Tp(r(),[o,a]).round(u).paddingInner(c).paddingOuter(f).align(s)},xp.apply(l(),arguments)}function Sp(t){var n=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,delete t.paddingOuter,t.copy=function(){return Sp(n())},t}function Ep(t){return+t}var kp=[0,1];function Np(t){return t}function Cp(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:function(t){return function(){return t}}(isNaN(n)?NaN:.5)}function Pp(t,n,e){var r=t[0],i=t[1],o=n[0],a=n[1];return i<r?(r=Cp(i,r),o=e(a,o)):(r=Cp(r,i),o=e(o,a)),function(t){return o(r(t))}}function zp(t,n,e){var r=Math.min(t.length,n.length)-1,i=new Array(r),o=new Array(r),a=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<r;)i[a]=Cp(t[a],t[a+1]),o[a]=e(n[a],n[a+1]);return function(n){var e=c(t,n,1,r)-1;return o[e](i[e](n))}}function Dp(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function qp(){var t,n,e,r,i,o,a=kp,u=kp,c=Cr,f=Np;function s(){var t=Math.min(a.length,u.length);return f!==Np&&(f=function(t,n){var e;return t>n&&(e=t,t=n,n=e),function(e){return Math.max(t,Math.min(n,e))}}(a[0],a[t-1])),r=t>2?zp:Pp,i=o=null,l}function l(n){return null==n||isNaN(n=+n)?e:(i||(i=r(a.map(t),u,c)))(t(f(n)))}return l.invert=function(e){return f(n((o||(o=r(u,a.map(t),Tr)))(e)))},l.domain=function(t){return arguments.length?(a=Array.from(t,Ep),s()):a.slice()},l.range=function(t){return arguments.length?(u=Array.from(t),s()):u.slice()},l.rangeRound=function(t){return u=Array.from(t),c=Pr,s()},l.clamp=function(t){return arguments.length?(f=!!t||Np,s()):f!==Np},l.interpolate=function(t){return arguments.length?(c=t,s()):c},l.unknown=function(t){return arguments.length?(e=t,l):e},function(e,r){return t=e,n=r,s()}}function Rp(){return qp()(Np,Np)}function Fp(n,e,r,i){var o,a=B(n,e,r);switch((i=mc(null==i?",f":i)).type){case"s":var u=Math.max(Math.abs(n),Math.abs(e));return null!=i.precision||isNaN(o=Pc(a,u))||(i.precision=o),t.formatPrefix(i,u);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(o=zc(a,Math.max(Math.abs(n),Math.abs(e))))||(i.precision=o-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(o=Cc(a))||(i.precision=o-2*("%"===i.type))}return t.format(i)}function Op(t){var n=t.domain;return t.ticks=function(t){var e=n();return U(e[0],e[e.length-1],null==t?10:t)},t.tickFormat=function(t,e){var r=n();return Fp(r[0],r[r.length-1],null==t?10:t,e)},t.nice=function(e){null==e&&(e=10);var r,i,o=n(),a=0,u=o.length-1,c=o[a],f=o[u],s=10;for(f<c&&(i=c,c=f,f=i,i=a,a=u,u=i);s-- >0;){if((i=I(c,f,e))===r)return o[a]=c,o[u]=f,n(o);if(i>0)c=Math.floor(c/i)*i,f=Math.ceil(f/i)*i;else{if(!(i<0))break;c=Math.ceil(c*i)/i,f=Math.floor(f*i)/i}r=i}return t},t}function Up(t,n){var e,r=0,i=(t=t.slice()).length-1,o=t[r],a=t[i];return a<o&&(e=r,r=i,i=e,e=o,o=a,a=e),t[r]=n.floor(o),t[i]=n.ceil(a),t}function Ip(t){return Math.log(t)}function Bp(t){return Math.exp(t)}function Yp(t){return-Math.log(-t)}function Lp(t){return-Math.exp(-t)}function jp(t){return isFinite(t)?+("1e"+t):t<0?0:t}function Hp(t){return(n,e)=>-t(-n,e)}function Xp(n){const e=n(Ip,Bp),r=e.domain;let i,o,a=10;function u(){return i=function(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),n=>Math.log(n)/t)}(a),o=function(t){return 10===t?jp:t===Math.E?Math.exp:n=>Math.pow(t,n)}(a),r()[0]<0?(i=Hp(i),o=Hp(o),n(Yp,Lp)):n(Ip,Bp),e}return e.base=function(t){return arguments.length?(a=+t,u()):a},e.domain=function(t){return arguments.length?(r(t),u()):r()},e.ticks=t=>{const n=r();let e=n[0],u=n[n.length-1];const c=u<e;c&&([e,u]=[u,e]);let f,s,l=i(e),h=i(u);const d=null==t?10:+t;let p=[];if(!(a%1)&&h-l<d){if(l=Math.floor(l),h=Math.ceil(h),e>0){for(;l<=h;++l)for(f=1;f<a;++f)if(s=l<0?f/o(-l):f*o(l),!(s<e)){if(s>u)break;p.push(s)}}else for(;l<=h;++l)for(f=a-1;f>=1;--f)if(s=l>0?f/o(-l):f*o(l),!(s<e)){if(s>u)break;p.push(s)}2*p.length<d&&(p=U(e,u,d))}else p=U(l,h,Math.min(h-l,d)).map(o);return c?p.reverse():p},e.tickFormat=(n,r)=>{if(null==n&&(n=10),null==r&&(r=10===a?"s":","),"function"!=typeof r&&(a%1||null!=(r=mc(r)).precision||(r.trim=!0),r=t.format(r)),n===1/0)return r;const u=Math.max(1,a*n/e.ticks().length);return t=>{let n=t/o(Math.round(i(t)));return n*a<a-.5&&(n*=a),n<=u?r(t):""}},e.nice=()=>r(Up(r(),{floor:t=>o(Math.floor(i(t))),ceil:t=>o(Math.ceil(i(t)))})),e}function Gp(t){return function(n){return Math.sign(n)*Math.log1p(Math.abs(n/t))}}function Vp(t){return function(n){return Math.sign(n)*Math.expm1(Math.abs(n))*t}}function $p(t){var n=1,e=t(Gp(n),Vp(n));return e.constant=function(e){return arguments.length?t(Gp(n=+e),Vp(n)):n},Op(e)}function Wp(t){return function(n){return n<0?-Math.pow(-n,t):Math.pow(n,t)}}function Zp(t){return t<0?-Math.sqrt(-t):Math.sqrt(t)}function Kp(t){return t<0?-t*t:t*t}function Qp(t){var n=t(Np,Np),e=1;function r(){return 1===e?t(Np,Np):.5===e?t(Zp,Kp):t(Wp(e),Wp(1/e))}return n.exponent=function(t){return arguments.length?(e=+t,r()):e},Op(n)}function Jp(){var t=Qp(qp());return t.copy=function(){return Dp(t,Jp()).exponent(t.exponent())},xp.apply(t,arguments),t}function tg(t){return Math.sign(t)*t*t}function ng(t){return Math.sign(t)*Math.sqrt(Math.abs(t))}var eg=new Date,rg=new Date;function ig(t,n,e,r){function i(n){return t(n=0===arguments.length?new Date:new Date(+n)),n}return i.floor=function(n){return t(n=new Date(+n)),n},i.ceil=function(e){return t(e=new Date(e-1)),n(e,1),t(e),e},i.round=function(t){var n=i(t),e=i.ceil(t);return t-n<e-t?n:e},i.offset=function(t,e){return n(t=new Date(+t),null==e?1:Math.floor(e)),t},i.range=function(e,r,o){var a,u=[];if(e=i.ceil(e),o=null==o?1:Math.floor(o),!(e<r&&o>0))return u;do{u.push(a=new Date(+e)),n(e,o),t(e)}while(a<e&&e<r);return u},i.filter=function(e){return ig((function(n){if(n>=n)for(;t(n),!e(n);)n.setTime(n-1)}),(function(t,r){if(t>=t)if(r<0)for(;++r<=0;)for(;n(t,-1),!e(t););else for(;--r>=0;)for(;n(t,1),!e(t););}))},e&&(i.count=function(n,r){return eg.setTime(+n),rg.setTime(+r),t(eg),t(rg),Math.floor(e(eg,rg))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(n){return r(n)%t==0}:function(n){return i.count(0,n)%t==0}):i:null}),i}var og=ig((function(){}),(function(t,n){t.setTime(+t+n)}),(function(t,n){return n-t}));og.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?ig((function(n){n.setTime(Math.floor(n/t)*t)}),(function(n,e){n.setTime(+n+e*t)}),(function(n,e){return(e-n)/t})):og:null};var ag=og,ug=og.range;const cg=1e3,fg=6e4,sg=36e5,lg=864e5,hg=6048e5,dg=2592e6,pg=31536e6;var gg=ig((function(t){t.setTime(t-t.getMilliseconds())}),(function(t,n){t.setTime(+t+n*cg)}),(function(t,n){return(n-t)/cg}),(function(t){return t.getUTCSeconds()})),yg=gg,vg=gg.range,_g=ig((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*cg)}),(function(t,n){t.setTime(+t+n*fg)}),(function(t,n){return(n-t)/fg}),(function(t){return t.getMinutes()})),bg=_g,mg=_g.range,xg=ig((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*cg-t.getMinutes()*fg)}),(function(t,n){t.setTime(+t+n*sg)}),(function(t,n){return(n-t)/sg}),(function(t){return t.getHours()})),wg=xg,Mg=xg.range,Ag=ig((t=>t.setHours(0,0,0,0)),((t,n)=>t.setDate(t.getDate()+n)),((t,n)=>(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*fg)/lg),(t=>t.getDate()-1)),Tg=Ag,Sg=Ag.range;function Eg(t){return ig((function(n){n.setDate(n.getDate()-(n.getDay()+7-t)%7),n.setHours(0,0,0,0)}),(function(t,n){t.setDate(t.getDate()+7*n)}),(function(t,n){return(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*fg)/hg}))}var kg=Eg(0),Ng=Eg(1),Cg=Eg(2),Pg=Eg(3),zg=Eg(4),Dg=Eg(5),qg=Eg(6),Rg=kg.range,Fg=Ng.range,Og=Cg.range,Ug=Pg.range,Ig=zg.range,Bg=Dg.range,Yg=qg.range,Lg=ig((function(t){t.setDate(1),t.setHours(0,0,0,0)}),(function(t,n){t.setMonth(t.getMonth()+n)}),(function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())}),(function(t){return t.getMonth()})),jg=Lg,Hg=Lg.range,Xg=ig((function(t){t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,n){t.setFullYear(t.getFullYear()+n)}),(function(t,n){return n.getFullYear()-t.getFullYear()}),(function(t){return t.getFullYear()}));Xg.every=function(t){return isFinite(t=Math.floor(t))&&t>0?ig((function(n){n.setFullYear(Math.floor(n.getFullYear()/t)*t),n.setMonth(0,1),n.setHours(0,0,0,0)}),(function(n,e){n.setFullYear(n.getFullYear()+e*t)})):null};var Gg=Xg,Vg=Xg.range,$g=ig((function(t){t.setUTCSeconds(0,0)}),(function(t,n){t.setTime(+t+n*fg)}),(function(t,n){return(n-t)/fg}),(function(t){return t.getUTCMinutes()})),Wg=$g,Zg=$g.range,Kg=ig((function(t){t.setUTCMinutes(0,0,0)}),(function(t,n){t.setTime(+t+n*sg)}),(function(t,n){return(n-t)/sg}),(function(t){return t.getUTCHours()})),Qg=Kg,Jg=Kg.range,ty=ig((function(t){t.setUTCHours(0,0,0,0)}),(function(t,n){t.setUTCDate(t.getUTCDate()+n)}),(function(t,n){return(n-t)/lg}),(function(t){return t.getUTCDate()-1})),ny=ty,ey=ty.range;function ry(t){return ig((function(n){n.setUTCDate(n.getUTCDate()-(n.getUTCDay()+7-t)%7),n.setUTCHours(0,0,0,0)}),(function(t,n){t.setUTCDate(t.getUTCDate()+7*n)}),(function(t,n){return(n-t)/hg}))}var iy=ry(0),oy=ry(1),ay=ry(2),uy=ry(3),cy=ry(4),fy=ry(5),sy=ry(6),ly=iy.range,hy=oy.range,dy=ay.range,py=uy.range,gy=cy.range,yy=fy.range,vy=sy.range,_y=ig((function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)}),(function(t,n){t.setUTCMonth(t.getUTCMonth()+n)}),(function(t,n){return n.getUTCMonth()-t.getUTCMonth()+12*(n.getUTCFullYear()-t.getUTCFullYear())}),(function(t){return t.getUTCMonth()})),by=_y,my=_y.range,xy=ig((function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n)}),(function(t,n){return n.getUTCFullYear()-t.getUTCFullYear()}),(function(t){return t.getUTCFullYear()}));xy.every=function(t){return isFinite(t=Math.floor(t))&&t>0?ig((function(n){n.setUTCFullYear(Math.floor(n.getUTCFullYear()/t)*t),n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)}),(function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e*t)})):null};var wy=xy,My=xy.range;function Ay(t,n,r,i,o,a){const u=[[yg,1,cg],[yg,5,5e3],[yg,15,15e3],[yg,30,3e4],[a,1,fg],[a,5,3e5],[a,15,9e5],[a,30,18e5],[o,1,sg],[o,3,108e5],[o,6,216e5],[o,12,432e5],[i,1,lg],[i,2,1728e5],[r,1,hg],[n,1,dg],[n,3,7776e6],[t,1,pg]];function c(n,r,i){const o=Math.abs(r-n)/i,a=e((([,,t])=>t)).right(u,o);if(a===u.length)return t.every(B(n/pg,r/pg,i));if(0===a)return ag.every(Math.max(B(n,r,i),1));const[c,f]=u[o/u[a-1][2]<u[a][2]/o?a-1:a];return c.every(f)}return[function(t,n,e){const r=n<t;r&&([t,n]=[n,t]);const i=e&&"function"==typeof e.range?e:c(t,n,e),o=i?i.range(t,+n+1):[];return r?o.reverse():o},c]}const[Ty,Sy]=Ay(wy,by,iy,ny,Qg,Wg),[Ey,ky]=Ay(Gg,jg,kg,Tg,wg,bg);function Ny(t){if(0<=t.y&&t.y<100){var n=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return n.setFullYear(t.y),n}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Cy(t){if(0<=t.y&&t.y<100){var n=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return n.setUTCFullYear(t.y),n}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Py(t,n,e){return{y:t,m:n,d:e,H:0,M:0,S:0,L:0}}function zy(t){var n=t.dateTime,e=t.date,r=t.time,i=t.periods,o=t.days,a=t.shortDays,u=t.months,c=t.shortMonths,f=By(i),s=Yy(i),l=By(o),h=Yy(o),d=By(a),p=Yy(a),g=By(u),y=Yy(u),v=By(c),_=Yy(c),b={a:function(t){return a[t.getDay()]},A:function(t){return o[t.getDay()]},b:function(t){return c[t.getMonth()]},B:function(t){return u[t.getMonth()]},c:null,d:cv,e:cv,f:dv,g:Av,G:Sv,H:fv,I:sv,j:lv,L:hv,m:pv,M:gv,p:function(t){return i[+(t.getHours()>=12)]},q:function(t){return 1+~~(t.getMonth()/3)},Q:Wv,s:Zv,S:yv,u:vv,U:_v,V:mv,w:xv,W:wv,x:null,X:null,y:Mv,Y:Tv,Z:Ev,"%":$v},m={a:function(t){return a[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},b:function(t){return c[t.getUTCMonth()]},B:function(t){return u[t.getUTCMonth()]},c:null,d:kv,e:kv,f:Dv,g:Hv,G:Gv,H:Nv,I:Cv,j:Pv,L:zv,m:qv,M:Rv,p:function(t){return i[+(t.getUTCHours()>=12)]},q:function(t){return 1+~~(t.getUTCMonth()/3)},Q:Wv,s:Zv,S:Fv,u:Ov,U:Uv,V:Bv,w:Yv,W:Lv,x:null,X:null,y:jv,Y:Xv,Z:Vv,"%":$v},x={a:function(t,n,e){var r=d.exec(n.slice(e));return r?(t.w=p.get(r[0].toLowerCase()),e+r[0].length):-1},A:function(t,n,e){var r=l.exec(n.slice(e));return r?(t.w=h.get(r[0].toLowerCase()),e+r[0].length):-1},b:function(t,n,e){var r=v.exec(n.slice(e));return r?(t.m=_.get(r[0].toLowerCase()),e+r[0].length):-1},B:function(t,n,e){var r=g.exec(n.slice(e));return r?(t.m=y.get(r[0].toLowerCase()),e+r[0].length):-1},c:function(t,e,r){return A(t,n,e,r)},d:Qy,e:Qy,f:iv,g:$y,G:Vy,H:tv,I:tv,j:Jy,L:rv,m:Ky,M:nv,p:function(t,n,e){var r=f.exec(n.slice(e));return r?(t.p=s.get(r[0].toLowerCase()),e+r[0].length):-1},q:Zy,Q:av,s:uv,S:ev,u:jy,U:Hy,V:Xy,w:Ly,W:Gy,x:function(t,n,r){return A(t,e,n,r)},X:function(t,n,e){return A(t,r,n,e)},y:$y,Y:Vy,Z:Wy,"%":ov};function w(t,n){return function(e){var r,i,o,a=[],u=-1,c=0,f=t.length;for(e instanceof Date||(e=new Date(+e));++u<f;)37===t.charCodeAt(u)&&(a.push(t.slice(c,u)),null!=(i=qy[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",(o=n[r])&&(r=o(e,i)),a.push(r),c=u+1);return a.push(t.slice(c,u)),a.join("")}}function M(t,n){return function(e){var r,i,o=Py(1900,void 0,1);if(A(o,t,e+="",0)!=e.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(n&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(i=(r=Cy(Py(o.y,0,1))).getUTCDay(),r=i>4||0===i?oy.ceil(r):oy(r),r=ny.offset(r,7*(o.V-1)),o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(i=(r=Ny(Py(o.y,0,1))).getDay(),r=i>4||0===i?Ng.ceil(r):Ng(r),r=Tg.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),o.d=r.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),i="Z"in o?Cy(Py(o.y,0,1)).getUTCDay():Ny(Py(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,Cy(o)):Ny(o)}}function A(t,n,e,r){for(var i,o,a=0,u=n.length,c=e.length;a<u;){if(r>=c)return-1;if(37===(i=n.charCodeAt(a++))){if(i=n.charAt(a++),!(o=x[i in qy?n.charAt(a++):i])||(r=o(t,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}return b.x=w(e,b),b.X=w(r,b),b.c=w(n,b),m.x=w(e,m),m.X=w(r,m),m.c=w(n,m),{format:function(t){var n=w(t+="",b);return n.toString=function(){return t},n},parse:function(t){var n=M(t+="",!1);return n.toString=function(){return t},n},utcFormat:function(t){var n=w(t+="",m);return n.toString=function(){return t},n},utcParse:function(t){var n=M(t+="",!0);return n.toString=function(){return t},n}}}var Dy,qy={"-":"",_:" ",0:"0"},Ry=/^\s*\d+/,Fy=/^%/,Oy=/[\\^$*+?|[\]().{}]/g;function Uy(t,n,e){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<e?new Array(e-o+1).join(n)+i:i)}function Iy(t){return t.replace(Oy,"\\$&")}function By(t){return new RegExp("^(?:"+t.map(Iy).join("|")+")","i")}function Yy(t){return new Map(t.map(((t,n)=>[t.toLowerCase(),n])))}function Ly(t,n,e){var r=Ry.exec(n.slice(e,e+1));return r?(t.w=+r[0],e+r[0].length):-1}function jy(t,n,e){var r=Ry.exec(n.slice(e,e+1));return r?(t.u=+r[0],e+r[0].length):-1}function Hy(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.U=+r[0],e+r[0].length):-1}function Xy(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.V=+r[0],e+r[0].length):-1}function Gy(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.W=+r[0],e+r[0].length):-1}function Vy(t,n,e){var r=Ry.exec(n.slice(e,e+4));return r?(t.y=+r[0],e+r[0].length):-1}function $y(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),e+r[0].length):-1}function Wy(t,n,e){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e,e+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),e+r[0].length):-1}function Zy(t,n,e){var r=Ry.exec(n.slice(e,e+1));return r?(t.q=3*r[0]-3,e+r[0].length):-1}function Ky(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.m=r[0]-1,e+r[0].length):-1}function Qy(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.d=+r[0],e+r[0].length):-1}function Jy(t,n,e){var r=Ry.exec(n.slice(e,e+3));return r?(t.m=0,t.d=+r[0],e+r[0].length):-1}function tv(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.H=+r[0],e+r[0].length):-1}function nv(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.M=+r[0],e+r[0].length):-1}function ev(t,n,e){var r=Ry.exec(n.slice(e,e+2));return r?(t.S=+r[0],e+r[0].length):-1}function rv(t,n,e){var r=Ry.exec(n.slice(e,e+3));return r?(t.L=+r[0],e+r[0].length):-1}function iv(t,n,e){var r=Ry.exec(n.slice(e,e+6));return r?(t.L=Math.floor(r[0]/1e3),e+r[0].length):-1}function ov(t,n,e){var r=Fy.exec(n.slice(e,e+1));return r?e+r[0].length:-1}function av(t,n,e){var r=Ry.exec(n.slice(e));return r?(t.Q=+r[0],e+r[0].length):-1}function uv(t,n,e){var r=Ry.exec(n.slice(e));return r?(t.s=+r[0],e+r[0].length):-1}function cv(t,n){return Uy(t.getDate(),n,2)}function fv(t,n){return Uy(t.getHours(),n,2)}function sv(t,n){return Uy(t.getHours()%12||12,n,2)}function lv(t,n){return Uy(1+Tg.count(Gg(t),t),n,3)}function hv(t,n){return Uy(t.getMilliseconds(),n,3)}function dv(t,n){return hv(t,n)+"000"}function pv(t,n){return Uy(t.getMonth()+1,n,2)}function gv(t,n){return Uy(t.getMinutes(),n,2)}function yv(t,n){return Uy(t.getSeconds(),n,2)}function vv(t){var n=t.getDay();return 0===n?7:n}function _v(t,n){return Uy(kg.count(Gg(t)-1,t),n,2)}function bv(t){var n=t.getDay();return n>=4||0===n?zg(t):zg.ceil(t)}function mv(t,n){return t=bv(t),Uy(zg.count(Gg(t),t)+(4===Gg(t).getDay()),n,2)}function xv(t){return t.getDay()}function wv(t,n){return Uy(Ng.count(Gg(t)-1,t),n,2)}function Mv(t,n){return Uy(t.getFullYear()%100,n,2)}function Av(t,n){return Uy((t=bv(t)).getFullYear()%100,n,2)}function Tv(t,n){return Uy(t.getFullYear()%1e4,n,4)}function Sv(t,n){var e=t.getDay();return Uy((t=e>=4||0===e?zg(t):zg.ceil(t)).getFullYear()%1e4,n,4)}function Ev(t){var n=t.getTimezoneOffset();return(n>0?"-":(n*=-1,"+"))+Uy(n/60|0,"0",2)+Uy(n%60,"0",2)}function kv(t,n){return Uy(t.getUTCDate(),n,2)}function Nv(t,n){return Uy(t.getUTCHours(),n,2)}function Cv(t,n){return Uy(t.getUTCHours()%12||12,n,2)}function Pv(t,n){return Uy(1+ny.count(wy(t),t),n,3)}function zv(t,n){return Uy(t.getUTCMilliseconds(),n,3)}function Dv(t,n){return zv(t,n)+"000"}function qv(t,n){return Uy(t.getUTCMonth()+1,n,2)}function Rv(t,n){return Uy(t.getUTCMinutes(),n,2)}function Fv(t,n){return Uy(t.getUTCSeconds(),n,2)}function Ov(t){var n=t.getUTCDay();return 0===n?7:n}function Uv(t,n){return Uy(iy.count(wy(t)-1,t),n,2)}function Iv(t){var n=t.getUTCDay();return n>=4||0===n?cy(t):cy.ceil(t)}function Bv(t,n){return t=Iv(t),Uy(cy.count(wy(t),t)+(4===wy(t).getUTCDay()),n,2)}function Yv(t){return t.getUTCDay()}function Lv(t,n){return Uy(oy.count(wy(t)-1,t),n,2)}function jv(t,n){return Uy(t.getUTCFullYear()%100,n,2)}function Hv(t,n){return Uy((t=Iv(t)).getUTCFullYear()%100,n,2)}function Xv(t,n){return Uy(t.getUTCFullYear()%1e4,n,4)}function Gv(t,n){var e=t.getUTCDay();return Uy((t=e>=4||0===e?cy(t):cy.ceil(t)).getUTCFullYear()%1e4,n,4)}function Vv(){return"+0000"}function $v(){return"%"}function Wv(t){return+t}function Zv(t){return Math.floor(+t/1e3)}function Kv(n){return Dy=zy(n),t.timeFormat=Dy.format,t.timeParse=Dy.parse,t.utcFormat=Dy.utcFormat,t.utcParse=Dy.utcParse,Dy}t.timeFormat=void 0,t.timeParse=void 0,t.utcFormat=void 0,t.utcParse=void 0,Kv({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Qv="%Y-%m-%dT%H:%M:%S.%LZ";var Jv=Date.prototype.toISOString?function(t){return t.toISOString()}:t.utcFormat(Qv),t_=Jv;var n_=+new Date("2000-01-01T00:00:00.000Z")?function(t){var n=new Date(t);return isNaN(n)?null:n}:t.utcParse(Qv),e_=n_;function r_(t){return new Date(t)}function i_(t){return t instanceof Date?+t:+new Date(+t)}function o_(t,n,e,r,i,o,a,u,c,f){var s=Rp(),l=s.invert,h=s.domain,d=f(".%L"),p=f(":%S"),g=f("%I:%M"),y=f("%I %p"),v=f("%a %d"),_=f("%b %d"),b=f("%B"),m=f("%Y");function x(t){return(c(t)<t?d:u(t)<t?p:a(t)<t?g:o(t)<t?y:r(t)<t?i(t)<t?v:_:e(t)<t?b:m)(t)}return s.invert=function(t){return new Date(l(t))},s.domain=function(t){return arguments.length?h(Array.from(t,i_)):h().map(r_)},s.ticks=function(n){var e=h();return t(e[0],e[e.length-1],null==n?10:n)},s.tickFormat=function(t,n){return null==n?x:f(n)},s.nice=function(t){var e=h();return t&&"function"==typeof t.range||(t=n(e[0],e[e.length-1],null==t?10:t)),t?h(Up(e,t)):s},s.copy=function(){return Dp(s,o_(t,n,e,r,i,o,a,u,c,f))},s}function a_(){var t,n,e,r,i,o=0,a=1,u=Np,c=!1;function f(n){return null==n||isNaN(n=+n)?i:u(0===e?.5:(n=(r(n)-t)*e,c?Math.max(0,Math.min(1,n)):n))}function s(t){return function(n){var e,r;return arguments.length?([e,r]=n,u=t(e,r),f):[u(0),u(1)]}}return f.domain=function(i){return arguments.length?([o,a]=i,t=r(o=+o),n=r(a=+a),e=t===n?0:1/(n-t),f):[o,a]},f.clamp=function(t){return arguments.length?(c=!!t,f):c},f.interpolator=function(t){return arguments.length?(u=t,f):u},f.range=s(Cr),f.rangeRound=s(Pr),f.unknown=function(t){return arguments.length?(i=t,f):i},function(i){return r=i,t=i(o),n=i(a),e=t===n?0:1/(n-t),f}}function u_(t,n){return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())}function c_(){var t=Qp(a_());return t.copy=function(){return u_(t,c_()).exponent(t.exponent())},wp.apply(t,arguments)}function f_(){var t,n,e,r,i,o,a,u=0,c=.5,f=1,s=1,l=Np,h=!1;function d(t){return isNaN(t=+t)?a:(t=.5+((t=+o(t))-n)*(s*t<s*n?r:i),l(h?Math.max(0,Math.min(1,t)):t))}function p(t){return function(n){var e,r,i;return arguments.length?([e,r,i]=n,l=Zr(t,[e,r,i]),d):[l(0),l(.5),l(1)]}}return d.domain=function(a){return arguments.length?([u,c,f]=a,t=o(u=+u),n=o(c=+c),e=o(f=+f),r=t===n?0:.5/(n-t),i=n===e?0:.5/(e-n),s=n<t?-1:1,d):[u,c,f]},d.clamp=function(t){return arguments.length?(h=!!t,d):h},d.interpolator=function(t){return arguments.length?(l=t,d):l},d.range=p(Cr),d.rangeRound=p(Pr),d.unknown=function(t){return arguments.length?(a=t,d):a},function(a){return o=a,t=a(u),n=a(c),e=a(f),r=t===n?0:.5/(n-t),i=n===e?0:.5/(e-n),s=n<t?-1:1,d}}function s_(){var t=Qp(f_());return t.copy=function(){return u_(t,s_()).exponent(t.exponent())},wp.apply(t,arguments)}function l_(t){for(var n=t.length/6|0,e=new Array(n),r=0;r<n;)e[r]="#"+t.slice(6*r,6*++r);return e}var h_=l_("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),d_=l_("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),p_=l_("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),g_=l_("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),y_=l_("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),v_=l_("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),__=l_("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),b_=l_("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),m_=l_("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"),x_=l_("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"),w_=t=>br(t[t.length-1]),M_=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(l_),A_=w_(M_),T_=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(l_),S_=w_(T_),E_=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(l_),k_=w_(E_),N_=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(l_),C_=w_(N_),P_=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(l_),z_=w_(P_),D_=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(l_),q_=w_(D_),R_=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(l_),F_=w_(R_),O_=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(l_),U_=w_(O_),I_=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(l_),B_=w_(I_),Y_=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(l_),L_=w_(Y_),j_=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(l_),H_=w_(j_),X_=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(l_),G_=w_(X_),V_=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(l_),$_=w_(V_),W_=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(l_),Z_=w_(W_),K_=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(l_),Q_=w_(K_),J_=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(l_),tb=w_(J_),nb=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(l_),eb=w_(nb),rb=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(l_),ib=w_(rb),ob=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(l_),ab=w_(ob),ub=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(l_),cb=w_(ub),fb=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(l_),sb=w_(fb),lb=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(l_),hb=w_(lb),db=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(l_),pb=w_(db),gb=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(l_),yb=w_(gb),vb=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(l_),_b=w_(vb),bb=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(l_),mb=w_(bb),xb=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(l_),wb=w_(xb);var Mb=Wr(ur(300,.5,0),ur(-240,.5,1)),Ab=Wr(ur(-100,.75,.35),ur(80,1.5,.8)),Tb=Wr(ur(260,.75,.35),ur(80,1.5,.8)),Sb=ur();var Eb=Ae(),kb=Math.PI/3,Nb=2*Math.PI/3;function Cb(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}}var Pb=Cb(l_("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),zb=Cb(l_("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),Db=Cb(l_("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),qb=Cb(l_("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));function Rb(t){return function(){return t}}var Fb=Math.abs,Ob=Math.atan2,Ub=Math.cos,Ib=Math.max,Bb=Math.min,Yb=Math.sin,Lb=Math.sqrt,jb=1e-12,Hb=Math.PI,Xb=Hb/2,Gb=2*Hb;function Vb(t){return t>1?0:t<-1?Hb:Math.acos(t)}function $b(t){return t>=1?Xb:t<=-1?-Xb:Math.asin(t)}function Wb(t){return t.innerRadius}function Zb(t){return t.outerRadius}function Kb(t){return t.startAngle}function Qb(t){return t.endAngle}function Jb(t){return t&&t.padAngle}function tm(t,n,e,r,i,o,a,u){var c=e-t,f=r-n,s=a-i,l=u-o,h=l*c-s*f;if(!(h*h<jb))return[t+(h=(s*(n-o)-l*(t-i))/h)*c,n+h*f]}function nm(t,n,e,r,i,o,a){var u=t-e,c=n-r,f=(a?o:-o)/Lb(u*u+c*c),s=f*c,l=-f*u,h=t+s,d=n+l,p=e+s,g=r+l,y=(h+p)/2,v=(d+g)/2,_=p-h,b=g-d,m=_*_+b*b,x=i-o,w=h*g-p*d,M=(b<0?-1:1)*Lb(Ib(0,x*x*m-w*w)),A=(w*b-_*M)/m,T=(-w*_-b*M)/m,S=(w*b+_*M)/m,E=(-w*_+b*M)/m,k=A-y,N=T-v,C=S-y,P=E-v;return k*k+N*N>C*C+P*P&&(A=S,T=E),{cx:A,cy:T,x01:-s,y01:-l,x11:A*(i/x-1),y11:T*(i/x-1)}}var em=Array.prototype.slice;function rm(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function im(t){this._context=t}function om(t){return new im(t)}function am(t){return t[0]}function um(t){return t[1]}function cm(t,n){var e=Rb(!0),r=null,i=om,o=null;function a(a){var u,c,f,s=(a=rm(a)).length,l=!1;for(null==r&&(o=i(f=ya())),u=0;u<=s;++u)!(u<s&&e(c=a[u],u,a))===l&&((l=!l)?o.lineStart():o.lineEnd()),l&&o.point(+t(c,u,a),+n(c,u,a));if(f)return o=null,f+""||null}return t="function"==typeof t?t:void 0===t?am:Rb(t),n="function"==typeof n?n:void 0===n?um:Rb(n),a.x=function(n){return arguments.length?(t="function"==typeof n?n:Rb(+n),a):t},a.y=function(t){return arguments.length?(n="function"==typeof t?t:Rb(+t),a):n},a.defined=function(t){return arguments.length?(e="function"==typeof t?t:Rb(!!t),a):e},a.curve=function(t){return arguments.length?(i=t,null!=r&&(o=i(r)),a):i},a.context=function(t){return arguments.length?(null==t?r=o=null:o=i(r=t),a):r},a}function fm(t,n,e){var r=null,i=Rb(!0),o=null,a=om,u=null;function c(c){var f,s,l,h,d,p=(c=rm(c)).length,g=!1,y=new Array(p),v=new Array(p);for(null==o&&(u=a(d=ya())),f=0;f<=p;++f){if(!(f<p&&i(h=c[f],f,c))===g)if(g=!g)s=f,u.areaStart(),u.lineStart();else{for(u.lineEnd(),u.lineStart(),l=f-1;l>=s;--l)u.point(y[l],v[l]);u.lineEnd(),u.areaEnd()}g&&(y[f]=+t(h,f,c),v[f]=+n(h,f,c),u.point(r?+r(h,f,c):y[f],e?+e(h,f,c):v[f]))}if(d)return u=null,d+""||null}function f(){return cm().defined(i).curve(a).context(o)}return t="function"==typeof t?t:void 0===t?am:Rb(+t),n="function"==typeof n?n:Rb(void 0===n?0:+n),e="function"==typeof e?e:void 0===e?um:Rb(+e),c.x=function(n){return arguments.length?(t="function"==typeof n?n:Rb(+n),r=null,c):t},c.x0=function(n){return arguments.length?(t="function"==typeof n?n:Rb(+n),c):t},c.x1=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:Rb(+t),c):r},c.y=function(t){return arguments.length?(n="function"==typeof t?t:Rb(+t),e=null,c):n},c.y0=function(t){return arguments.length?(n="function"==typeof t?t:Rb(+t),c):n},c.y1=function(t){return arguments.length?(e=null==t?null:"function"==typeof t?t:Rb(+t),c):e},c.lineX0=c.lineY0=function(){return f().x(t).y(n)},c.lineY1=function(){return f().x(t).y(e)},c.lineX1=function(){return f().x(r).y(n)},c.defined=function(t){return arguments.length?(i="function"==typeof t?t:Rb(!!t),c):i},c.curve=function(t){return arguments.length?(a=t,null!=o&&(u=a(o)),c):a},c.context=function(t){return arguments.length?(null==t?o=u=null:u=a(o=t),c):o},c}function sm(t,n){return n<t?-1:n>t?1:n>=t?0:NaN}function lm(t){return t}im.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var hm=pm(om);function dm(t){this._curve=t}function pm(t){function n(n){return new dm(t(n))}return n._curve=t,n}function gm(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(pm(t)):n()._curve},t}function ym(){return gm(cm().curve(hm))}function vm(){var t=fm().curve(hm),n=t.curve,e=t.lineX0,r=t.lineX1,i=t.lineY0,o=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return gm(e())},delete t.lineX0,t.lineEndAngle=function(){return gm(r())},delete t.lineX1,t.lineInnerRadius=function(){return gm(i())},delete t.lineY0,t.lineOuterRadius=function(){return gm(o())},delete t.lineY1,t.curve=function(t){return arguments.length?n(pm(t)):n()._curve},t}function _m(t,n){return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]}function bm(t){return t.source}function mm(t){return t.target}function xm(t){var n=bm,e=mm,r=am,i=um,o=null;function a(){var a,u=em.call(arguments),c=n.apply(this,u),f=e.apply(this,u);if(o||(o=a=ya()),t(o,+r.apply(this,(u[0]=c,u)),+i.apply(this,u),+r.apply(this,(u[0]=f,u)),+i.apply(this,u)),a)return o=null,a+""||null}return a.source=function(t){return arguments.length?(n=t,a):n},a.target=function(t){return arguments.length?(e=t,a):e},a.x=function(t){return arguments.length?(r="function"==typeof t?t:Rb(+t),a):r},a.y=function(t){return arguments.length?(i="function"==typeof t?t:Rb(+t),a):i},a.context=function(t){return arguments.length?(o=null==t?null:t,a):o},a}function wm(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n=(n+r)/2,e,n,i,r,i)}function Mm(t,n,e,r,i){t.moveTo(n,e),t.bezierCurveTo(n,e=(e+i)/2,r,e,r,i)}function Am(t,n,e,r,i){var o=_m(n,e),a=_m(n,e=(e+i)/2),u=_m(r,e),c=_m(r,i);t.moveTo(o[0],o[1]),t.bezierCurveTo(a[0],a[1],u[0],u[1],c[0],c[1])}dm.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var Tm={draw:function(t,n){var e=Math.sqrt(n/Hb);t.moveTo(e,0),t.arc(0,0,e,0,Gb)}},Sm={draw:function(t,n){var e=Math.sqrt(n/5)/2;t.moveTo(-3*e,-e),t.lineTo(-e,-e),t.lineTo(-e,-3*e),t.lineTo(e,-3*e),t.lineTo(e,-e),t.lineTo(3*e,-e),t.lineTo(3*e,e),t.lineTo(e,e),t.lineTo(e,3*e),t.lineTo(-e,3*e),t.lineTo(-e,e),t.lineTo(-3*e,e),t.closePath()}},Em=Math.sqrt(1/3),km=2*Em,Nm={draw:function(t,n){var e=Math.sqrt(n/km),r=e*Em;t.moveTo(0,-e),t.lineTo(r,0),t.lineTo(0,e),t.lineTo(-r,0),t.closePath()}},Cm=Math.sin(Hb/10)/Math.sin(7*Hb/10),Pm=Math.sin(Gb/10)*Cm,zm=-Math.cos(Gb/10)*Cm,Dm={draw:function(t,n){var e=Math.sqrt(.8908130915292852*n),r=Pm*e,i=zm*e;t.moveTo(0,-e),t.lineTo(r,i);for(var o=1;o<5;++o){var a=Gb*o/5,u=Math.cos(a),c=Math.sin(a);t.lineTo(c*e,-u*e),t.lineTo(u*r-c*i,c*r+u*i)}t.closePath()}},qm={draw:function(t,n){var e=Math.sqrt(n),r=-e/2;t.rect(r,r,e,e)}},Rm=Math.sqrt(3),Fm={draw:function(t,n){var e=-Math.sqrt(n/(3*Rm));t.moveTo(0,2*e),t.lineTo(-Rm*e,-e),t.lineTo(Rm*e,-e),t.closePath()}},Om=-.5,Um=Math.sqrt(3)/2,Im=1/Math.sqrt(12),Bm=3*(Im/2+1),Ym={draw:function(t,n){var e=Math.sqrt(n/Bm),r=e/2,i=e*Im,o=r,a=e*Im+e,u=-o,c=a;t.moveTo(r,i),t.lineTo(o,a),t.lineTo(u,c),t.lineTo(Om*r-Um*i,Um*r+Om*i),t.lineTo(Om*o-Um*a,Um*o+Om*a),t.lineTo(Om*u-Um*c,Um*u+Om*c),t.lineTo(Om*r+Um*i,Om*i-Um*r),t.lineTo(Om*o+Um*a,Om*a-Um*o),t.lineTo(Om*u+Um*c,Om*c-Um*u),t.closePath()}},Lm=[Tm,Sm,Nm,qm,Dm,Fm,Ym];function jm(){}function Hm(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function Xm(t){this._context=t}function Gm(t){this._context=t}function Vm(t){this._context=t}Xm.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:Hm(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:Hm(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},Gm.prototype={areaStart:jm,areaEnd:jm,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:Hm(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},Vm.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(e,r):this._context.moveTo(e,r);break;case 3:this._point=4;default:Hm(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};class $m{constructor(t,n){this._context=t,this._x=n}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line}point(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,n,t,n):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+n)/2,t,this._y0,t,n)}this._x0=t,this._y0=n}}function Wm(t,n){this._basis=new Xm(t),this._beta=n}Wm.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,e=t.length-1;if(e>0)for(var r,i=t[0],o=n[0],a=t[e]-i,u=n[e]-o,c=-1;++c<=e;)r=c/e,this._basis.point(this._beta*t[c]+(1-this._beta)*(i+r*a),this._beta*n[c]+(1-this._beta)*(o+r*u));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var Zm=function t(n){function e(t){return 1===n?new Xm(t):new Wm(t,n)}return e.beta=function(n){return t(+n)},e}(.85);function Km(t,n,e){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-e),t._x2,t._y2)}function Qm(t,n){this._context=t,this._k=(1-n)/6}Qm.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Km(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:Km(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Jm=function t(n){function e(t){return new Qm(t,n)}return e.tension=function(n){return t(+n)},e}(0);function tx(t,n){this._context=t,this._k=(1-n)/6}tx.prototype={areaStart:jm,areaEnd:jm,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:Km(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var nx=function t(n){function e(t){return new tx(t,n)}return e.tension=function(n){return t(+n)},e}(0);function ex(t,n){this._context=t,this._k=(1-n)/6}ex.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Km(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var rx=function t(n){function e(t){return new ex(t,n)}return e.tension=function(n){return t(+n)},e}(0);function ix(t,n,e){var r=t._x1,i=t._y1,o=t._x2,a=t._y2;if(t._l01_a>jb){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,c=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/c,i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/c}if(t._l23_a>jb){var f=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,s=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*f+t._x1*t._l23_2a-n*t._l12_2a)/s,a=(a*f+t._y1*t._l23_2a-e*t._l12_2a)/s}t._context.bezierCurveTo(r,i,o,a,t._x2,t._y2)}function ox(t,n){this._context=t,this._alpha=n}ox.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:ix(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var ax=function t(n){function e(t){return n?new ox(t,n):new Qm(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function ux(t,n){this._context=t,this._alpha=n}ux.prototype={areaStart:jm,areaEnd:jm,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:ix(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var cx=function t(n){function e(t){return n?new ux(t,n):new tx(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function fx(t,n){this._context=t,this._alpha=n}fx.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var e=this._x2-t,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:ix(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var sx=function t(n){function e(t){return n?new fx(t,n):new ex(t,0)}return e.alpha=function(n){return t(+n)},e}(.5);function lx(t){this._context=t}function hx(t){return t<0?-1:1}function dx(t,n,e){var r=t._x1-t._x0,i=n-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),a=(e-t._y1)/(i||r<0&&-0),u=(o*i+a*r)/(r+i);return(hx(o)+hx(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(u))||0}function px(t,n){var e=t._x1-t._x0;return e?(3*(t._y1-t._y0)/e-n)/2:n}function gx(t,n,e){var r=t._x0,i=t._y0,o=t._x1,a=t._y1,u=(o-r)/3;t._context.bezierCurveTo(r+u,i+u*n,o-u,a-u*e,o,a)}function yx(t){this._context=t}function vx(t){this._context=new _x(t)}function _x(t){this._context=t}function bx(t){this._context=t}function mx(t){var n,e,r=t.length-1,i=new Array(r),o=new Array(r),a=new Array(r);for(i[0]=0,o[0]=2,a[0]=t[0]+2*t[1],n=1;n<r-1;++n)i[n]=1,o[n]=4,a[n]=4*t[n]+2*t[n+1];for(i[r-1]=2,o[r-1]=7,a[r-1]=8*t[r-1]+t[r],n=1;n<r;++n)e=i[n]/o[n-1],o[n]-=e,a[n]-=e*a[n-1];for(i[r-1]=a[r-1]/o[r-1],n=r-2;n>=0;--n)i[n]=(a[n]-i[n+1])/o[n];for(o[r-1]=(t[r]+i[r-1])/2,n=0;n<r-1;++n)o[n]=2*t[n+1]-i[n+1];return[i,o]}function xx(t,n){this._context=t,this._t=n}function wx(t,n){if((i=t.length)>1)for(var e,r,i,o=1,a=t[n[0]],u=a.length;o<i;++o)for(r=a,a=t[n[o]],e=0;e<u;++e)a[e][1]+=a[e][0]=isNaN(r[e][1])?r[e][0]:r[e][1]}function Mx(t){for(var n=t.length,e=new Array(n);--n>=0;)e[n]=n;return e}function Ax(t,n){return t[n]}function Tx(t){const n=[];return n.key=t,n}function Sx(t){var n=t.map(Ex);return Mx(t).sort((function(t,e){return n[t]-n[e]}))}function Ex(t){for(var n,e=-1,r=0,i=t.length,o=-1/0;++e<i;)(n=+t[e][1])>o&&(o=n,r=e);return r}function kx(t){var n=t.map(Nx);return Mx(t).sort((function(t,e){return n[t]-n[e]}))}function Nx(t){for(var n,e=0,r=-1,i=t.length;++r<i;)(n=+t[r][1])&&(e+=n);return e}lx.prototype={areaStart:jm,areaEnd:jm,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}},yx.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:gx(this,this._t0,px(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var e=NaN;if(n=+n,(t=+t)!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,gx(this,px(this,e=dx(this,t,n)),e);break;default:gx(this,this._t0,e=dx(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=e}}},(vx.prototype=Object.create(yx.prototype)).point=function(t,n){yx.prototype.point.call(this,n,t)},_x.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,e,r,i,o){this._context.bezierCurveTo(n,t,r,e,o,i)}},bx.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,e=t.length;if(e)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===e)this._context.lineTo(t[1],n[1]);else for(var r=mx(t),i=mx(n),o=0,a=1;a<e;++o,++a)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[a],n[a]);(this._line||0!==this._line&&1===e)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}},xx.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var e=this._x*(1-this._t)+t*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,n)}}this._x=t,this._y=n}};var Cx=t=>()=>t;function Px(t,{sourceEvent:n,target:e,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:e,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function zx(t,n,e){this.k=t,this.x=n,this.y=e}zx.prototype={constructor:zx,scale:function(t){return 1===t?this:new zx(this.k*t,this.x,this.y)},translate:function(t,n){return 0===t&0===n?this:new zx(this.k,this.x+this.k*t,this.y+this.k*n)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Dx=new zx(1,0,0);function qx(t){for(;!t.__zoom;)if(!(t=t.parentNode))return Dx;return t.__zoom}function Rx(t){t.stopImmediatePropagation()}function Fx(t){t.preventDefault(),t.stopImmediatePropagation()}function Ox(t){return!(t.ctrlKey&&"wheel"!==t.type||t.button)}function Ux(){var t=this;return t instanceof SVGElement?(t=t.ownerSVGElement||t).hasAttribute("viewBox")?[[(t=t.viewBox.baseVal).x,t.y],[t.x+t.width,t.y+t.height]]:[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]:[[0,0],[t.clientWidth,t.clientHeight]]}function Ix(){return this.__zoom||Dx}function Bx(t){return-t.deltaY*(1===t.deltaMode?.05:t.deltaMode?1:.002)*(t.ctrlKey?10:1)}function Yx(){return navigator.maxTouchPoints||"ontouchstart"in this}function Lx(t,n,e){var r=t.invertX(n[0][0])-e[0][0],i=t.invertX(n[1][0])-e[1][0],o=t.invertY(n[0][1])-e[0][1],a=t.invertY(n[1][1])-e[1][1];return t.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),a>o?(o+a)/2:Math.min(0,o)||Math.max(0,a))}qx.prototype=zx.prototype,t.Adder=y,t.Delaunay=gu,t.FormatSpecifier=xc,t.InternMap=InternMap,t.InternSet=InternSet,t.Node=pd,t.Voronoi=fu,t.ZoomTransform=zx,t.active=function(t,n){var e,r,i=t.__transition;if(i)for(r in n=null==n?null:n+"",i)if((e=i[r]).state>1&&e.name===n)return new Zi([[t]],To,n,+r);return null},t.arc=function(){var t=Wb,n=Zb,e=Rb(0),r=null,i=Kb,o=Qb,a=Jb,u=null;function c(){var c,f,s=+t.apply(this,arguments),l=+n.apply(this,arguments),h=i.apply(this,arguments)-Xb,d=o.apply(this,arguments)-Xb,p=Fb(d-h),g=d>h;if(u||(u=c=ya()),l<s&&(f=l,l=s,s=f),l>jb)if(p>Gb-jb)u.moveTo(l*Ub(h),l*Yb(h)),u.arc(0,0,l,h,d,!g),s>jb&&(u.moveTo(s*Ub(d),s*Yb(d)),u.arc(0,0,s,d,h,g));else{var y,v,_=h,b=d,m=h,x=d,w=p,M=p,A=a.apply(this,arguments)/2,T=A>jb&&(r?+r.apply(this,arguments):Lb(s*s+l*l)),S=Bb(Fb(l-s)/2,+e.apply(this,arguments)),E=S,k=S;if(T>jb){var N=$b(T/s*Yb(A)),C=$b(T/l*Yb(A));(w-=2*N)>jb?(m+=N*=g?1:-1,x-=N):(w=0,m=x=(h+d)/2),(M-=2*C)>jb?(_+=C*=g?1:-1,b-=C):(M=0,_=b=(h+d)/2)}var P=l*Ub(_),z=l*Yb(_),D=s*Ub(x),q=s*Yb(x);if(S>jb){var R,F=l*Ub(b),O=l*Yb(b),U=s*Ub(m),I=s*Yb(m);if(p<Hb&&(R=tm(P,z,U,I,F,O,D,q))){var B=P-R[0],Y=z-R[1],L=F-R[0],j=O-R[1],H=1/Yb(Vb((B*L+Y*j)/(Lb(B*B+Y*Y)*Lb(L*L+j*j)))/2),X=Lb(R[0]*R[0]+R[1]*R[1]);E=Bb(S,(s-X)/(H-1)),k=Bb(S,(l-X)/(H+1))}}M>jb?k>jb?(y=nm(U,I,P,z,l,k,g),v=nm(F,O,D,q,l,k,g),u.moveTo(y.cx+y.x01,y.cy+y.y01),k<S?u.arc(y.cx,y.cy,k,Ob(y.y01,y.x01),Ob(v.y01,v.x01),!g):(u.arc(y.cx,y.cy,k,Ob(y.y01,y.x01),Ob(y.y11,y.x11),!g),u.arc(0,0,l,Ob(y.cy+y.y11,y.cx+y.x11),Ob(v.cy+v.y11,v.cx+v.x11),!g),u.arc(v.cx,v.cy,k,Ob(v.y11,v.x11),Ob(v.y01,v.x01),!g))):(u.moveTo(P,z),u.arc(0,0,l,_,b,!g)):u.moveTo(P,z),s>jb&&w>jb?E>jb?(y=nm(D,q,F,O,s,-E,g),v=nm(P,z,U,I,s,-E,g),u.lineTo(y.cx+y.x01,y.cy+y.y01),E<S?u.arc(y.cx,y.cy,E,Ob(y.y01,y.x01),Ob(v.y01,v.x01),!g):(u.arc(y.cx,y.cy,E,Ob(y.y01,y.x01),Ob(y.y11,y.x11),!g),u.arc(0,0,s,Ob(y.cy+y.y11,y.cx+y.x11),Ob(v.cy+v.y11,v.cx+v.x11),g),u.arc(v.cx,v.cy,E,Ob(v.y11,v.x11),Ob(v.y01,v.x01),!g))):u.arc(0,0,s,x,m,g):u.lineTo(D,q)}else u.moveTo(0,0);if(u.closePath(),c)return u=null,c+""||null}return c.centroid=function(){var e=(+t.apply(this,arguments)+ +n.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-Hb/2;return[Ub(r)*e,Yb(r)*e]},c.innerRadius=function(n){return arguments.length?(t="function"==typeof n?n:Rb(+n),c):t},c.outerRadius=function(t){return arguments.length?(n="function"==typeof t?t:Rb(+t),c):n},c.cornerRadius=function(t){return arguments.length?(e="function"==typeof t?t:Rb(+t),c):e},c.padRadius=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:Rb(+t),c):r},c.startAngle=function(t){return arguments.length?(i="function"==typeof t?t:Rb(+t),c):i},c.endAngle=function(t){return arguments.length?(o="function"==typeof t?t:Rb(+t),c):o},c.padAngle=function(t){return arguments.length?(a="function"==typeof t?t:Rb(+t),c):a},c.context=function(t){return arguments.length?(u=null==t?null:t,c):u},c},t.area=fm,t.areaRadial=vm,t.ascending=n,t.autoType=function(t){for(var n in t){var e,r,i=t[n].trim();if(i)if("true"===i)i=!0;else if("false"===i)i=!1;else if("NaN"===i)i=NaN;else if(isNaN(e=+i)){if(!(r=i.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)))continue;Iu&&r[4]&&!r[7]&&(i=i.replace(/-/g,"/").replace(/T/," ")),i=new Date(i)}else i=e;else i=null;t[n]=i}return t},t.axisBottom=function(t){return yt(3,t)},t.axisLeft=function(t){return yt(4,t)},t.axisRight=function(t){return yt(2,t)},t.axisTop=function(t){return yt(1,t)},t.bin=j,t.bisect=c,t.bisectCenter=u,t.bisectLeft=a,t.bisectRight=o,t.bisector=e,t.blob=function(t,n){return fetch(t,n).then(Bu)},t.brush=function(){return Jo(Yo)},t.brushSelection=function(t){var n=t.__brush;return n?n.dim.output(n.selection):null},t.brushX=function(){return Jo(Io)},t.brushY=function(){return Jo(Bo)},t.buffer=function(t,n){return fetch(t,n).then(Yu)},t.chord=function(){return sa(!1,!1)},t.chordDirected=function(){return sa(!0,!1)},t.chordTranspose=function(){return sa(!1,!0)},t.cluster=function(){var t=od,n=1,e=1,r=!1;function i(i){var o,a=0;i.eachAfter((function(n){var e=n.children;e?(n.x=function(t){return t.reduce(ad,0)/t.length}(e),n.y=function(t){return 1+t.reduce(ud,0)}(e)):(n.x=o?a+=t(n,o):0,n.y=0,o=n)}));var u=function(t){for(var n;n=t.children;)t=n[0];return t}(i),c=function(t){for(var n;n=t.children;)t=n[n.length-1];return t}(i),f=u.x-t(u,c)/2,s=c.x+t(c,u)/2;return i.eachAfter(r?function(t){t.x=(t.x-i.x)*n,t.y=(i.y-t.y)*e}:function(t){t.x=(t.x-f)/(s-f)*n,t.y=(1-(i.y?t.y/i.y:1))*e})}return i.separation=function(n){return arguments.length?(t=n,i):t},i.size=function(t){return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]},i.nodeSize=function(t){return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i},t.color=me,t.contourDensity=function(){var t=Ua,n=Ia,e=Ba,r=960,i=500,o=20,a=2,u=3*o,c=r+2*u>>a,f=i+2*u>>a,s=Na(20);function l(r){var i=new Float32Array(c*f),l=new Float32Array(c*f),d=Math.pow(2,-a);r.forEach((function(r,o,a){var s=(t(r,o,a)+u)*d,l=(n(r,o,a)+u)*d,h=+e(r,o,a);if(s>=0&&s<c&&l>=0&&l<f){var p=Math.floor(s),g=Math.floor(l),y=s-p-.5,v=l-g-.5;i[p+g*c]+=(1-y)*(1-v)*h,i[p+1+g*c]+=y*(1-v)*h,i[p+1+(g+1)*c]+=y*v*h,i[p+(g+1)*c]+=(1-y)*v*h}})),Fa({width:c,height:f,data:i},{width:c,height:f,data:l},o>>a),Oa({width:c,height:f,data:l},{width:c,height:f,data:i},o>>a),Fa({width:c,height:f,data:i},{width:c,height:f,data:l},o>>a),Oa({width:c,height:f,data:l},{width:c,height:f,data:i},o>>a),Fa({width:c,height:f,data:i},{width:c,height:f,data:l},o>>a),Oa({width:c,height:f,data:l},{width:c,height:f,data:i},o>>a);var p=s(i);if(!Array.isArray(p)){var g=H(i);p=B(0,g,p),(p=tt(0,Math.floor(g/p)*p,p)).shift()}return Ra().thresholds(p).size([c,f])(i).map(h)}function h(t){return t.value*=Math.pow(2,-2*a),t.coordinates.forEach(d),t}function d(t){t.forEach(p)}function p(t){t.forEach(g)}function g(t){t[0]=t[0]*Math.pow(2,a)-u,t[1]=t[1]*Math.pow(2,a)-u}function y(){return c=r+2*(u=3*o)>>a,f=i+2*u>>a,l}return l.x=function(n){return arguments.length?(t="function"==typeof n?n:Na(+n),l):t},l.y=function(t){return arguments.length?(n="function"==typeof t?t:Na(+t),l):n},l.weight=function(t){return arguments.length?(e="function"==typeof t?t:Na(+t),l):e},l.size=function(t){if(!arguments.length)return[r,i];var n=+t[0],e=+t[1];if(!(n>=0&&e>=0))throw new Error("invalid size");return r=n,i=e,y()},l.cellSize=function(t){if(!arguments.length)return 1<<a;if(!((t=+t)>=1))throw new Error("invalid cell size");return a=Math.floor(Math.log(t)/Math.LN2),y()},l.thresholds=function(t){return arguments.length?(s="function"==typeof t?t:Array.isArray(t)?Na(Ea.call(t)):Na(t),l):s},l.bandwidth=function(t){if(!arguments.length)return Math.sqrt(o*(o+1));if(!((t=+t)>=0))throw new Error("invalid bandwidth");return o=Math.round((Math.sqrt(4*t*t+1)-1)/2),y()},l},t.contours=Ra,t.count=f,t.create=function(t){return Un(kt(t).call(document.documentElement))},t.creator=kt,t.cross=function(...t){const n="function"==typeof t[t.length-1]&&function(t){return n=>t(...n)}(t.pop()),e=(t=t.map(h)).map(s),r=t.length-1,i=new Array(r+1).fill(0),o=[];if(r<0||e.some(l))return o;for(;;){o.push(i.map(((n,e)=>t[e][n])));let a=r;for(;++i[a]===e[a];){if(0===a)return n?o.map(n):o;i[a--]=0}}},t.csv=Xu,t.csvFormat=Su,t.csvFormatBody=Eu,t.csvFormatRow=Nu,t.csvFormatRows=ku,t.csvFormatValue=Cu,t.csvParse=Au,t.csvParseRows=Tu,t.cubehelix=ur,t.cumsum=function(t,n){var e=0,r=0;return Float64Array.from(t,void 0===n?t=>e+=+t||0:i=>e+=+n(i,r++,t)||0)},t.curveBasis=function(t){return new Xm(t)},t.curveBasisClosed=function(t){return new Gm(t)},t.curveBasisOpen=function(t){return new Vm(t)},t.curveBumpX=function(t){return new $m(t,!0)},t.curveBumpY=function(t){return new $m(t,!1)},t.curveBundle=Zm,t.curveCardinal=Jm,t.curveCardinalClosed=nx,t.curveCardinalOpen=rx,t.curveCatmullRom=ax,t.curveCatmullRomClosed=cx,t.curveCatmullRomOpen=sx,t.curveLinear=om,t.curveLinearClosed=function(t){return new lx(t)},t.curveMonotoneX=function(t){return new yx(t)},t.curveMonotoneY=function(t){return new vx(t)},t.curveNatural=function(t){return new bx(t)},t.curveStep=function(t){return new xx(t,.5)},t.curveStepAfter=function(t){return new xx(t,1)},t.curveStepBefore=function(t){return new xx(t,0)},t.descending=function(t,n){return null==t||null==n?NaN:n<t?-1:n>t?1:n>=t?0:NaN},t.deviation=p,t.difference=function(t,...n){t=new InternSet(t);for(const e of n)for(const n of e)t.delete(n);return t},t.disjoint=function(t,n){const e=n[Symbol.iterator](),r=new InternSet;for(const n of t){if(r.has(n))return!1;let t,i;for(;({value:t,done:i}=e.next())&&!i;){if(Object.is(n,t))return!1;r.add(t)}}return!0},t.dispatch=_t,t.drag=function(){var t,n,e,r,i=Qn,o=Jn,a=te,u=ne,c={},f=_t("start","drag","end"),s=0,l=0;function h(t){t.on("mousedown.drag",d).filter(u).on("touchstart.drag",y).on("touchmove.drag",v,Hn).on("touchend.drag touchcancel.drag",_).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function d(a,u){if(!r&&i.call(this,a,u)){var c=b(this,o.call(this,a,u),a,u,"mouse");c&&(Un(a.view).on("mousemove.drag",p,Xn).on("mouseup.drag",g,Xn),$n(a.view),Gn(a),e=!1,t=a.clientX,n=a.clientY,c("start",a))}}function p(r){if(Vn(r),!e){var i=r.clientX-t,o=r.clientY-n;e=i*i+o*o>l}c.mouse("drag",r)}function g(t){Un(t.view).on("mousemove.drag mouseup.drag",null),Wn(t.view,e),Vn(t),c.mouse("end",t)}function y(t,n){if(i.call(this,t,n)){var e,r,a=t.changedTouches,u=o.call(this,t,n),c=a.length;for(e=0;e<c;++e)(r=b(this,u,t,n,a[e].identifier,a[e]))&&(Gn(t),r("start",t,a[e]))}}function v(t){var n,e,r=t.changedTouches,i=r.length;for(n=0;n<i;++n)(e=c[r[n].identifier])&&(Vn(t),e("drag",t,r[n]))}function _(t){var n,e,i=t.changedTouches,o=i.length;for(r&&clearTimeout(r),r=setTimeout((function(){r=null}),500),n=0;n<o;++n)(e=c[i[n].identifier])&&(Gn(t),e("end",t,i[n]))}function b(t,n,e,r,i,o){var u,l,d,p=f.copy(),g=jn(o||e,n);if(null!=(d=a.call(t,new Kn("beforestart",{sourceEvent:e,target:h,identifier:i,active:s,x:g[0],y:g[1],dx:0,dy:0,dispatch:p}),r)))return u=d.x-g[0]||0,l=d.y-g[1]||0,function e(o,a,f){var y,v=g;switch(o){case"start":c[i]=e,y=s++;break;case"end":delete c[i],--s;case"drag":g=jn(f||a,n),y=s}p.call(o,t,new Kn(o,{sourceEvent:a,subject:d,target:h,identifier:i,active:y,x:g[0]+u,y:g[1]+l,dx:g[0]-v[0],dy:g[1]-v[1],dispatch:p}),r)}}return h.filter=function(t){return arguments.length?(i="function"==typeof t?t:Zn(!!t),h):i},h.container=function(t){return arguments.length?(o="function"==typeof t?t:Zn(t),h):o},h.subject=function(t){return arguments.length?(a="function"==typeof t?t:Zn(t),h):a},h.touchable=function(t){return arguments.length?(u="function"==typeof t?t:Zn(!!t),h):u},h.on=function(){var t=f.on.apply(f,arguments);return t===f?h:t},h.clickDistance=function(t){return arguments.length?(l=(t=+t)*t,h):Math.sqrt(l)},h},t.dragDisable=$n,t.dragEnable=Wn,t.dsv=function(t,n,e,r){3===arguments.length&&"function"==typeof e&&(r=e,e=void 0);var i=wu(t);return ju(n,e).then((function(t){return i.parse(t,r)}))},t.dsvFormat=wu,t.easeBack=_o,t.easeBackIn=yo,t.easeBackInOut=_o,t.easeBackOut=vo,t.easeBounce=po,t.easeBounceIn=function(t){return 1-po(1-t)},t.easeBounceInOut=function(t){return((t*=2)<=1?1-po(1-t):po(t-1)+1)/2},t.easeBounceOut=po,t.easeCircle=so,t.easeCircleIn=function(t){return 1-Math.sqrt(1-t*t)},t.easeCircleInOut=so,t.easeCircleOut=function(t){return Math.sqrt(1- --t*t)},t.easeCubic=no,t.easeCubicIn=function(t){return t*t*t},t.easeCubicInOut=no,t.easeCubicOut=function(t){return--t*t*t+1},t.easeElastic=xo,t.easeElasticIn=mo,t.easeElasticInOut=wo,t.easeElasticOut=xo,t.easeExp=fo,t.easeExpIn=function(t){return co(1-+t)},t.easeExpInOut=fo,t.easeExpOut=function(t){return 1-co(t)},t.easeLinear=t=>+t,t.easePoly=io,t.easePolyIn=eo,t.easePolyInOut=io,t.easePolyOut=ro,t.easeQuad=to,t.easeQuadIn=function(t){return t*t},t.easeQuadInOut=to,t.easeQuadOut=function(t){return t*(2-t)},t.easeSin=uo,t.easeSinIn=function(t){return 1==+t?1:1-Math.cos(t*ao)},t.easeSinInOut=uo,t.easeSinOut=function(t){return Math.sin(t*ao)},t.every=function(t,n){if("function"!=typeof n)throw new TypeError("test is not a function");let e=-1;for(const r of t)if(!n(r,++e,t))return!1;return!0},t.extent=g,t.fcumsum=function(t,n){const e=new y;let r=-1;return Float64Array.from(t,void 0===n?t=>e.add(+t||0):i=>e.add(+n(i,++r,t)||0))},t.filter=function(t,n){if("function"!=typeof n)throw new TypeError("test is not a function");const e=[];let r=-1;for(const i of t)n(i,++r,t)&&e.push(i);return e},t.flatGroup=function(t,...n){return A(M(t,...n),n)},t.flatRollup=function(t,n,...e){return A(S(t,n,...e),e)},t.forceCenter=function(t,n){var e,r=1;function i(){var i,o,a=e.length,u=0,c=0;for(i=0;i<a;++i)u+=(o=e[i]).x,c+=o.y;for(u=(u/a-t)*r,c=(c/a-n)*r,i=0;i<a;++i)(o=e[i]).x-=u,o.y-=c}return null==t&&(t=0),null==n&&(n=0),i.initialize=function(t){e=t},i.x=function(n){return arguments.length?(t=+n,i):t},i.y=function(t){return arguments.length?(n=+t,i):n},i.strength=function(t){return arguments.length?(r=+t,i):r},i},t.forceCollide=function(t){var n,e,r,i=1,o=1;function a(){for(var t,a,c,f,s,l,h,d=n.length,p=0;p<o;++p)for(a=ec(n,cc,fc).visitAfter(u),t=0;t<d;++t)c=n[t],l=e[c.index],h=l*l,f=c.x+c.vx,s=c.y+c.vy,a.visit(g);function g(t,n,e,o,a){var u=t.data,d=t.r,p=l+d;if(!u)return n>f+p||o<f-p||e>s+p||a<s-p;if(u.index>c.index){var g=f-u.x-u.vx,y=s-u.y-u.vy,v=g*g+y*y;v<p*p&&(0===g&&(v+=(g=uc(r))*g),0===y&&(v+=(y=uc(r))*y),v=(p-(v=Math.sqrt(v)))/v*i,c.vx+=(g*=v)*(p=(d*=d)/(h+d)),c.vy+=(y*=v)*p,u.vx-=g*(p=1-p),u.vy-=y*p)}}}function u(t){if(t.data)return t.r=e[t.data.index];for(var n=t.r=0;n<4;++n)t[n]&&t[n].r>t.r&&(t.r=t[n].r)}function c(){if(n){var r,i,o=n.length;for(e=new Array(o),r=0;r<o;++r)i=n[r],e[i.index]=+t(i,r,n)}}return"function"!=typeof t&&(t=ac(null==t?1:+t)),a.initialize=function(t,e){n=t,r=e,c()},a.iterations=function(t){return arguments.length?(o=+t,a):o},a.strength=function(t){return arguments.length?(i=+t,a):i},a.radius=function(n){return arguments.length?(t="function"==typeof n?n:ac(+n),c(),a):t},a},t.forceLink=function(t){var n,e,r,i,o,a,u=sc,c=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},f=ac(30),s=1;function l(r){for(var i=0,u=t.length;i<s;++i)for(var c,f,l,h,d,p,g,y=0;y<u;++y)f=(c=t[y]).source,h=(l=c.target).x+l.vx-f.x-f.vx||uc(a),d=l.y+l.vy-f.y-f.vy||uc(a),h*=p=((p=Math.sqrt(h*h+d*d))-e[y])/p*r*n[y],d*=p,l.vx-=h*(g=o[y]),l.vy-=d*g,f.vx+=h*(g=1-g),f.vy+=d*g}function h(){if(r){var a,c,f=r.length,s=t.length,l=new Map(r.map(((t,n)=>[u(t,n,r),t])));for(a=0,i=new Array(f);a<s;++a)(c=t[a]).index=a,"object"!=typeof c.source&&(c.source=lc(l,c.source)),"object"!=typeof c.target&&(c.target=lc(l,c.target)),i[c.source.index]=(i[c.source.index]||0)+1,i[c.target.index]=(i[c.target.index]||0)+1;for(a=0,o=new Array(s);a<s;++a)c=t[a],o[a]=i[c.source.index]/(i[c.source.index]+i[c.target.index]);n=new Array(s),d(),e=new Array(s),p()}}function d(){if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+c(t[e],e,t)}function p(){if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+f(t[n],n,t)}return null==t&&(t=[]),l.initialize=function(t,n){r=t,a=n,h()},l.links=function(n){return arguments.length?(t=n,h(),l):t},l.id=function(t){return arguments.length?(u=t,l):u},l.iterations=function(t){return arguments.length?(s=+t,l):s},l.strength=function(t){return arguments.length?(c="function"==typeof t?t:ac(+t),d(),l):c},l.distance=function(t){return arguments.length?(f="function"==typeof t?t:ac(+t),p(),l):f},l},t.forceManyBody=function(){var t,n,e,r,i,o=ac(-30),a=1,u=1/0,c=.81;function f(e){var i,o=t.length,a=ec(t,dc,pc).visitAfter(l);for(r=e,i=0;i<o;++i)n=t[i],a.visit(h)}function s(){if(t){var n,e,r=t.length;for(i=new Array(r),n=0;n<r;++n)e=t[n],i[e.index]=+o(e,n,t)}}function l(t){var n,e,r,o,a,u=0,c=0;if(t.length){for(r=o=a=0;a<4;++a)(n=t[a])&&(e=Math.abs(n.value))&&(u+=n.value,c+=e,r+=e*n.x,o+=e*n.y);t.x=r/c,t.y=o/c}else{(n=t).x=n.data.x,n.y=n.data.y;do{u+=i[n.data.index]}while(n=n.next)}t.value=u}function h(t,o,f,s){if(!t.value)return!0;var l=t.x-n.x,h=t.y-n.y,d=s-o,p=l*l+h*h;if(d*d/c<p)return p<u&&(0===l&&(p+=(l=uc(e))*l),0===h&&(p+=(h=uc(e))*h),p<a&&(p=Math.sqrt(a*p)),n.vx+=l*t.value*r/p,n.vy+=h*t.value*r/p),!0;if(!(t.length||p>=u)){(t.data!==n||t.next)&&(0===l&&(p+=(l=uc(e))*l),0===h&&(p+=(h=uc(e))*h),p<a&&(p=Math.sqrt(a*p)));do{t.data!==n&&(d=i[t.data.index]*r/p,n.vx+=l*d,n.vy+=h*d)}while(t=t.next)}}return f.initialize=function(n,r){t=n,e=r,s()},f.strength=function(t){return arguments.length?(o="function"==typeof t?t:ac(+t),s(),f):o},f.distanceMin=function(t){return arguments.length?(a=t*t,f):Math.sqrt(a)},f.distanceMax=function(t){return arguments.length?(u=t*t,f):Math.sqrt(u)},f.theta=function(t){return arguments.length?(c=t*t,f):Math.sqrt(c)},f},t.forceRadial=function(t,n,e){var r,i,o,a=ac(.1);function u(t){for(var a=0,u=r.length;a<u;++a){var c=r[a],f=c.x-n||1e-6,s=c.y-e||1e-6,l=Math.sqrt(f*f+s*s),h=(o[a]-l)*i[a]*t/l;c.vx+=f*h,c.vy+=s*h}}function c(){if(r){var n,e=r.length;for(i=new Array(e),o=new Array(e),n=0;n<e;++n)o[n]=+t(r[n],n,r),i[n]=isNaN(o[n])?0:+a(r[n],n,r)}}return"function"!=typeof t&&(t=ac(+t)),null==n&&(n=0),null==e&&(e=0),u.initialize=function(t){r=t,c()},u.strength=function(t){return arguments.length?(a="function"==typeof t?t:ac(+t),c(),u):a},u.radius=function(n){return arguments.length?(t="function"==typeof n?n:ac(+n),c(),u):t},u.x=function(t){return arguments.length?(n=+t,u):n},u.y=function(t){return arguments.length?(e=+t,u):e},u},t.forceSimulation=function(t){var n,e=1,r=.001,i=1-Math.pow(r,1/300),o=0,a=.6,u=new Map,c=si(l),f=_t("tick","end"),s=function(){let t=1;return()=>(t=(1664525*t+1013904223)%hc)/hc}();function l(){h(),f.call("tick",n),e<r&&(c.stop(),f.call("end",n))}function h(r){var c,f,s=t.length;void 0===r&&(r=1);for(var l=0;l<r;++l)for(e+=(o-e)*i,u.forEach((function(t){t(e)})),c=0;c<s;++c)null==(f=t[c]).fx?f.x+=f.vx*=a:(f.x=f.fx,f.vx=0),null==f.fy?f.y+=f.vy*=a:(f.y=f.fy,f.vy=0);return n}function d(){for(var n,e=0,r=t.length;e<r;++e){if((n=t[e]).index=e,null!=n.fx&&(n.x=n.fx),null!=n.fy&&(n.y=n.fy),isNaN(n.x)||isNaN(n.y)){var i=10*Math.sqrt(.5+e),o=e*gc;n.x=i*Math.cos(o),n.y=i*Math.sin(o)}(isNaN(n.vx)||isNaN(n.vy))&&(n.vx=n.vy=0)}}function p(n){return n.initialize&&n.initialize(t,s),n}return null==t&&(t=[]),d(),n={tick:h,restart:function(){return c.restart(l),n},stop:function(){return c.stop(),n},nodes:function(e){return arguments.length?(t=e,d(),u.forEach(p),n):t},alpha:function(t){return arguments.length?(e=+t,n):e},alphaMin:function(t){return arguments.length?(r=+t,n):r},alphaDecay:function(t){return arguments.length?(i=+t,n):+i},alphaTarget:function(t){return arguments.length?(o=+t,n):o},velocityDecay:function(t){return arguments.length?(a=1-t,n):1-a},randomSource:function(t){return arguments.length?(s=t,u.forEach(p),n):s},force:function(t,e){return arguments.length>1?(null==e?u.delete(t):u.set(t,p(e)),n):u.get(t)},find:function(n,e,r){var i,o,a,u,c,f=0,s=t.length;for(null==r?r=1/0:r*=r,f=0;f<s;++f)(a=(i=n-(u=t[f]).x)*i+(o=e-u.y)*o)<r&&(c=u,r=a);return c},on:function(t,e){return arguments.length>1?(f.on(t,e),n):f.on(t)}}},t.forceX=function(t){var n,e,r,i=ac(.1);function o(t){for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vx+=(r[o]-i.x)*e[o]*t}function a(){if(n){var o,a=n.length;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)}}return"function"!=typeof t&&(t=ac(null==t?0:+t)),o.initialize=function(t){n=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:ac(+t),a(),o):i},o.x=function(n){return arguments.length?(t="function"==typeof n?n:ac(+n),a(),o):t},o},t.forceY=function(t){var n,e,r,i=ac(.1);function o(t){for(var i,o=0,a=n.length;o<a;++o)(i=n[o]).vy+=(r[o]-i.y)*e[o]*t}function a(){if(n){var o,a=n.length;for(e=new Array(a),r=new Array(a),o=0;o<a;++o)e[o]=isNaN(r[o]=+t(n[o],o,n))?0:+i(n[o],o,n)}}return"function"!=typeof t&&(t=ac(null==t?0:+t)),o.initialize=function(t){n=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:ac(+t),a(),o):i},o.y=function(n){return arguments.length?(t="function"==typeof n?n:ac(+n),a(),o):t},o},t.formatDefaultLocale=Nc,t.formatLocale=kc,t.formatSpecifier=mc,t.fsum=function(t,n){const e=new y;if(void 0===n)for(let n of t)(n=+n)&&e.add(n);else{let r=-1;for(let i of t)(i=+n(i,++r,t))&&e.add(i)}return+e},t.geoAlbers=Oh,t.geoAlbersUsa=function(){var t,n,e,r,i,o,a=Oh(),u=Fh().rotate([154,0]).center([-2,58.5]).parallels([55,65]),c=Fh().rotate([157,0]).center([-3,19.9]).parallels([8,18]),f={point:function(t,n){o=[t,n]}};function s(t){var n=t[0],a=t[1];return o=null,e.point(n,a),o||(r.point(n,a),o)||(i.point(n,a),o)}function l(){return t=n=null,s}return s.invert=function(t){var n=a.scale(),e=a.translate(),r=(t[0]-e[0])/n,i=(t[1]-e[1])/n;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?u:i>=.166&&i<.234&&r>=-.214&&r<-.115?c:a).invert(t)},s.stream=function(e){return t&&n===e?t:(r=[a.stream(n=e),u.stream(e),c.stream(e)],i=r.length,t={point:function(t,n){for(var e=-1;++e<i;)r[e].point(t,n)},sphere:function(){for(var t=-1;++t<i;)r[t].sphere()},lineStart:function(){for(var t=-1;++t<i;)r[t].lineStart()},lineEnd:function(){for(var t=-1;++t<i;)r[t].lineEnd()},polygonStart:function(){for(var t=-1;++t<i;)r[t].polygonStart()},polygonEnd:function(){for(var t=-1;++t<i;)r[t].polygonEnd()}});var r,i},s.precision=function(t){return arguments.length?(a.precision(t),u.precision(t),c.precision(t),l()):a.precision()},s.scale=function(t){return arguments.length?(a.scale(t),u.scale(.35*t),c.scale(t),s.translate(a.translate())):a.scale()},s.translate=function(t){if(!arguments.length)return a.translate();var n=a.scale(),o=+t[0],s=+t[1];return e=a.translate(t).clipExtent([[o-.455*n,s-.238*n],[o+.455*n,s+.238*n]]).stream(f),r=u.translate([o-.307*n,s+.201*n]).clipExtent([[o-.425*n+Dc,s+.12*n+Dc],[o-.214*n-Dc,s+.234*n-Dc]]).stream(f),i=c.translate([o-.205*n,s+.212*n]).clipExtent([[o-.214*n+Dc,s+.166*n+Dc],[o-.115*n-Dc,s+.234*n-Dc]]).stream(f),l()},s.fitExtent=function(t,n){return Ah(s,t,n)},s.fitSize=function(t,n){return Th(s,t,n)},s.fitWidth=function(t,n){return Sh(s,t,n)},s.fitHeight=function(t,n){return Eh(s,t,n)},s.scale(1070)},t.geoArea=function(t){return kf=new y,sf(t,Nf),2*kf},t.geoAzimuthalEqualArea=function(){return zh(Bh).scale(124.75).clipAngle(179.999)},t.geoAzimuthalEqualAreaRaw=Bh,t.geoAzimuthalEquidistant=function(){return zh(Yh).scale(79.4188).clipAngle(179.999)},t.geoAzimuthalEquidistantRaw=Yh,t.geoBounds=function(t){var n,e,r,i,o,a,u;if(bf=_f=-(yf=vf=1/0),Tf=[],sf(t,rs),e=Tf.length){for(Tf.sort(hs),n=1,o=[r=Tf[0]];n<e;++n)ds(r,(i=Tf[n])[0])||ds(r,i[1])?(ls(r[0],i[1])>ls(r[0],r[1])&&(r[1]=i[1]),ls(i[0],r[1])>ls(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(a=-1/0,n=0,r=o[e=o.length-1];n<=e;r=i,++n)i=o[n],(u=ls(r[1],i[0]))>a&&(a=u,yf=i[0],_f=r[1])}return Tf=Sf=null,yf===1/0||vf===1/0?[[NaN,NaN],[NaN,NaN]]:[[yf,vf],[_f,bf]]},t.geoCentroid=function(t){Yf=Lf=jf=Hf=Xf=Gf=Vf=$f=0,Wf=new y,Zf=new y,Kf=new y,sf(t,ps);var n=+Wf,e=+Zf,r=+Kf,i=Vc(n,e,r);return i<qc&&(n=Gf,e=Vf,r=$f,Lf<Dc&&(n=jf,e=Hf,r=Xf),(i=Vc(n,e,r))<qc)?[NaN,NaN]:[jc(e,n)*Ic,nf(r/i)*Ic]},t.geoCircle=function(){var t,n,e=Ts([0,0]),r=Ts(90),i=Ts(6),o={point:function(e,r){t.push(e=n(e,r)),e[0]*=Ic,e[1]*=Ic}};function a(){var a=e.apply(this,arguments),u=r.apply(this,arguments)*Bc,c=i.apply(this,arguments)*Bc;return t=[],n=ks(-a[0]*Bc,-a[1]*Bc,0).invert,Ds(o,u,c,1),a={type:"Polygon",coordinates:[t]},t=n=null,a}return a.center=function(t){return arguments.length?(e="function"==typeof t?t:Ts([+t[0],+t[1]]),a):e},a.radius=function(t){return arguments.length?(r="function"==typeof t?t:Ts(+t),a):r},a.precision=function(t){return arguments.length?(i="function"==typeof t?t:Ts(+t),a):i},a},t.geoClipAntimeridian=Xs,t.geoClipCircle=Gs,t.geoClipExtent=function(){var t,n,e,r=0,i=0,o=960,a=500;return e={stream:function(e){return t&&n===e?t:t=Js(r,i,o,a)(n=e)},extent:function(u){return arguments.length?(r=+u[0][0],i=+u[0][1],o=+u[1][0],a=+u[1][1],t=n=null,e):[[r,i],[o,a]]}}},t.geoClipRectangle=Js,t.geoConicConformal=function(){return qh(Xh).scale(109.5).parallels([30,30])},t.geoConicConformalRaw=Xh,t.geoConicEqualArea=Fh,t.geoConicEqualAreaRaw=Rh,t.geoConicEquidistant=function(){return qh(Vh).scale(131.154).center([0,13.9389])},t.geoConicEquidistantRaw=Vh,t.geoContains=function(t,n){return(t&&cl.hasOwnProperty(t.type)?cl[t.type]:sl)(t,n)},t.geoDistance=ul,t.geoEqualEarth=function(){return zh(Jh).scale(177.158)},t.geoEqualEarthRaw=Jh,t.geoEquirectangular=function(){return zh(Gh).scale(152.63)},t.geoEquirectangularRaw=Gh,t.geoGnomonic=function(){return zh(td).scale(144.049).clipAngle(60)},t.geoGnomonicRaw=td,t.geoGraticule=_l,t.geoGraticule10=function(){return _l()()},t.geoIdentity=function(){var t,n,e,r,i,o,a,u=1,c=0,f=0,s=1,l=1,h=0,d=null,p=1,g=1,y=xh({point:function(t,n){var e=b([t,n]);this.stream.point(e[0],e[1])}}),v=Ml;function _(){return p=u*s,g=u*l,o=a=null,b}function b(e){var r=e[0]*p,i=e[1]*g;if(h){var o=i*t-r*n;r=r*t+i*n,i=o}return[r+c,i+f]}return b.invert=function(e){var r=e[0]-c,i=e[1]-f;if(h){var o=i*t+r*n;r=r*t-i*n,i=o}return[r/p,i/g]},b.stream=function(t){return o&&a===t?o:o=y(v(a=t))},b.postclip=function(t){return arguments.length?(v=t,d=e=r=i=null,_()):v},b.clipExtent=function(t){return arguments.length?(v=null==t?(d=e=r=i=null,Ml):Js(d=+t[0][0],e=+t[0][1],r=+t[1][0],i=+t[1][1]),_()):null==d?null:[[d,e],[r,i]]},b.scale=function(t){return arguments.length?(u=+t,_()):u},b.translate=function(t){return arguments.length?(c=+t[0],f=+t[1],_()):[c,f]},b.angle=function(e){return arguments.length?(n=Zc(h=e%360*Bc),t=Hc(h),_()):h*Ic},b.reflectX=function(t){return arguments.length?(s=t?-1:1,_()):s<0},b.reflectY=function(t){return arguments.length?(l=t?-1:1,_()):l<0},b.fitExtent=function(t,n){return Ah(b,t,n)},b.fitSize=function(t,n){return Th(b,t,n)},b.fitWidth=function(t,n){return Sh(b,t,n)},b.fitHeight=function(t,n){return Eh(b,t,n)},b},t.geoInterpolate=function(t,n){var e=t[0]*Bc,r=t[1]*Bc,i=n[0]*Bc,o=n[1]*Bc,a=Hc(r),u=Zc(r),c=Hc(o),f=Zc(o),s=a*Hc(e),l=a*Zc(e),h=c*Hc(i),d=c*Zc(i),p=2*nf(Qc(ef(o-r)+a*c*ef(i-e))),g=Zc(p),y=p?function(t){var n=Zc(t*=p)/g,e=Zc(p-t)/g,r=e*s+n*h,i=e*l+n*d,o=e*u+n*f;return[jc(i,r)*Ic,jc(o,Qc(r*r+i*i))*Ic]}:function(){return[e*Ic,r*Ic]};return y.distance=p,y},t.geoLength=il,t.geoMercator=function(){return jh(Lh).scale(961/Uc)},t.geoMercatorRaw=Lh,t.geoNaturalEarth1=function(){return zh(nd).scale(175.295)},t.geoNaturalEarth1Raw=nd,t.geoOrthographic=function(){return zh(ed).scale(249.5).clipAngle(90.000001)},t.geoOrthographicRaw=ed,t.geoPath=function(t,n){var e,r,i=4.5;function o(t){return t&&("function"==typeof i&&r.pointRadius(+i.apply(this,arguments)),sf(t,e(r))),r.result()}return o.area=function(t){return sf(t,e(Pl)),Pl.result()},o.measure=function(t){return sf(t,e(_h)),_h.result()},o.bounds=function(t){return sf(t,e(Yl)),Yl.result()},o.centroid=function(t){return sf(t,e(uh)),uh.result()},o.projection=function(n){return arguments.length?(e=null==n?(t=null,Ml):(t=n).stream,o):t},o.context=function(t){return arguments.length?(r=null==t?(n=null,new bh):new ch(n=t),"function"!=typeof i&&r.pointRadius(i),o):n},o.pointRadius=function(t){return arguments.length?(i="function"==typeof t?t:(r.pointRadius(+t),+t),o):i},o.projection(t).context(n)},t.geoProjection=zh,t.geoProjectionMutator=Dh,t.geoRotation=zs,t.geoStereographic=function(){return zh(rd).scale(250).clipAngle(142)},t.geoStereographicRaw=rd,t.geoStream=sf,t.geoTransform=function(t){return{stream:xh(t)}},t.geoTransverseMercator=function(){var t=jh(id),n=t.center,e=t.rotate;return t.center=function(t){return arguments.length?n([-t[1],t[0]]):[(t=n())[1],-t[0]]},t.rotate=function(t){return arguments.length?e([t[0],t[1],t.length>2?t[2]+90:90]):[(t=e())[0],t[1],t[2]-90]},e([0,0,90]).scale(159.155)},t.geoTransverseMercatorRaw=id,t.gray=function(t,n){return new je(t,0,0,null==n?1:n)},t.greatest=function(t,e=n){let r,i=!1;if(1===e.length){let o;for(const a of t){const t=e(a);(i?n(t,o)>0:0===n(t,t))&&(r=a,o=t,i=!0)}}else for(const n of t)(i?e(n,r)>0:0===e(n,n))&&(r=n,i=!0);return r},t.greatestIndex=function(t,e=n){if(1===e.length)return Z(t,e);let r,i=-1,o=-1;for(const n of t)++o,(i<0?0===e(n,n):e(n,r)>0)&&(r=n,i=o);return i},t.group=w,t.groupSort=function(t,e,r){return(2!==e.length?C(T(t,e,r),(([t,e],[r,i])=>n(e,i)||n(t,r))):C(w(t,r),(([t,r],[i,o])=>e(r,o)||n(t,i)))).map((([t])=>t))},t.groups=M,t.hcl=We,t.hierarchy=fd,t.histogram=j,t.hsl=Pe,t.html=Zu,t.image=function(t,n){return new Promise((function(e,r){var i=new Image;for(var o in n)i[o]=n[o];i.onerror=r,i.onload=function(){e(i)},i.src=t}))},t.index=function(t,...n){return k(t,x,E,n)},t.indexes=function(t,...n){return k(t,Array.from,E,n)},t.interpolate=Cr,t.interpolateArray=function(t,n){return(wr(n)?xr:Mr)(t,n)},t.interpolateBasis=sr,t.interpolateBasisClosed=lr,t.interpolateBlues=hb,t.interpolateBrBG=A_,t.interpolateBuGn=L_,t.interpolateBuPu=H_,t.interpolateCividis=function(t){return t=Math.max(0,Math.min(1,t)),"rgb("+Math.max(0,Math.min(255,Math.round(-4.54-t*(35.34-t*(2381.73-t*(6402.7-t*(7024.72-2710.57*t)))))))+", "+Math.max(0,Math.min(255,Math.round(32.49+t*(170.73+t*(52.82-t*(131.46-t*(176.58-67.37*t)))))))+", "+Math.max(0,Math.min(255,Math.round(81.24+t*(442.36-t*(2482.43-t*(6167.24-t*(6614.94-2475.67*t)))))))+")"},t.interpolateCool=Tb,t.interpolateCubehelix=$r,t.interpolateCubehelixDefault=Mb,t.interpolateCubehelixLong=Wr,t.interpolateDate=Ar,t.interpolateDiscrete=function(t){var n=t.length;return function(e){return t[Math.max(0,Math.min(n-1,Math.floor(e*n)))]}},t.interpolateGnBu=G_,t.interpolateGreens=pb,t.interpolateGreys=yb,t.interpolateHcl=Xr,t.interpolateHclLong=Gr,t.interpolateHsl=Lr,t.interpolateHslLong=jr,t.interpolateHue=function(t,n){var e=pr(+t,+n);return function(t){var n=e(t);return n-360*Math.floor(n/360)}},t.interpolateInferno=Db,t.interpolateLab=function(t,n){var e=yr((t=Le(t)).l,(n=Le(n)).l),r=yr(t.a,n.a),i=yr(t.b,n.b),o=yr(t.opacity,n.opacity);return function(n){return t.l=e(n),t.a=r(n),t.b=i(n),t.opacity=o(n),t+""}},t.interpolateMagma=zb,t.interpolateNumber=Tr,t.interpolateNumberArray=xr,t.interpolateObject=Sr,t.interpolateOrRd=$_,t.interpolateOranges=wb,t.interpolatePRGn=S_,t.interpolatePiYG=k_,t.interpolatePlasma=qb,t.interpolatePuBu=Q_,t.interpolatePuBuGn=Z_,t.interpolatePuOr=C_,t.interpolatePuRd=tb,t.interpolatePurples=_b,t.interpolateRainbow=function(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return Sb.h=360*t-100,Sb.s=1.5-1.5*n,Sb.l=.8-.9*n,Sb+""},t.interpolateRdBu=z_,t.interpolateRdGy=q_,t.interpolateRdPu=eb,t.interpolateRdYlBu=F_,t.interpolateRdYlGn=U_,t.interpolateReds=mb,t.interpolateRgb=vr,t.interpolateRgbBasis=br,t.interpolateRgbBasisClosed=mr,t.interpolateRound=Pr,t.interpolateSinebow=function(t){var n;return t=(.5-t)*Math.PI,Eb.r=255*(n=Math.sin(t))*n,Eb.g=255*(n=Math.sin(t+kb))*n,Eb.b=255*(n=Math.sin(t+Nb))*n,Eb+""},t.interpolateSpectral=B_,t.interpolateString=Nr,t.interpolateTransformCss=Or,t.interpolateTransformSvg=Ur,t.interpolateTurbo=function(t){return t=Math.max(0,Math.min(1,t)),"rgb("+Math.max(0,Math.min(255,Math.round(34.61+t*(1172.33-t*(10793.56-t*(33300.12-t*(38394.49-14825.05*t)))))))+", "+Math.max(0,Math.min(255,Math.round(23.31+t*(557.33+t*(1225.33-t*(3574.96-t*(1073.77+707.56*t)))))))+", "+Math.max(0,Math.min(255,Math.round(27.2+t*(3211.1-t*(15327.97-t*(27814-t*(22569.18-6838.66*t)))))))+")"},t.interpolateViridis=Pb,t.interpolateWarm=Ab,t.interpolateYlGn=ab,t.interpolateYlGnBu=ib,t.interpolateYlOrBr=cb,t.interpolateYlOrRd=sb,t.interpolateZoom=Br,t.interrupt=wi,t.intersection=function(t,...n){t=new InternSet(t),n=n.map(at);t:for(const e of t)for(const r of n)if(!r.has(e)){t.delete(e);continue t}return t},t.interval=function(t,n,e){var r=new fi,i=n;return null==n?(r.restart(t,n,e),r):(r._restart=r.restart,r.restart=function(t,n,e){n=+n,e=null==e?ui():+e,r._restart((function o(a){a+=i,r._restart(o,i+=n,e),t(a)}),n,e)},r.restart(t,n,e),r)},t.isoFormat=t_,t.isoParse=e_,t.json=function(t,n){return fetch(t,n).then(Vu)},t.lab=Le,t.lch=function(t,n,e,r){return 1===arguments.length?$e(t):new Ze(e,n,t,null==r?1:r)},t.least=function(t,e=n){let r,i=!1;if(1===e.length){let o;for(const a of t){const t=e(a);(i?n(t,o)<0:0===n(t,t))&&(r=a,o=t,i=!0)}}else for(const n of t)(i?e(n,r)<0:0===e(n,n))&&(r=n,i=!0);return r},t.leastIndex=nt,t.line=cm,t.lineRadial=ym,t.linkHorizontal=function(){return xm(wm)},t.linkRadial=function(){var t=xm(Am);return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t},t.linkVertical=function(){return xm(Mm)},t.local=Bn,t.map=function(t,n){if("function"!=typeof t[Symbol.iterator])throw new TypeError("values is not iterable");if("function"!=typeof n)throw new TypeError("mapper is not a function");return Array.from(t,((e,r)=>n(e,r,t)))},t.matcher=qt,t.max=H,t.maxIndex=Z,t.mean=function(t,n){let e=0,r=0;if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(++e,r+=n);else{let i=-1;for(let o of t)null!=(o=n(o,++i,t))&&(o=+o)>=o&&(++e,r+=o)}if(e)return r/e},t.median=function(t,n){return $(t,.5,n)},t.merge=K,t.min=X,t.minIndex=Q,t.mode=function(t,n){const e=new InternMap;if(void 0===n)for(let n of t)null!=n&&n>=n&&e.set(n,(e.get(n)||0)+1);else{let r=-1;for(let i of t)null!=(i=n(i,++r,t))&&i>=i&&e.set(i,(e.get(i)||0)+1)}let r,i=0;for(const[t,n]of e)n>i&&(i=n,r=t);return r},t.namespace=Tt,t.namespaces=At,t.nice=Y,t.now=ui,t.pack=function(){var t=null,n=1,e=1,r=Cd;function i(i){return i.x=n/2,i.y=e/2,t?i.eachBefore(Dd(t)).eachAfter(qd(r,.5)).eachBefore(Rd(1)):i.eachBefore(Dd(zd)).eachAfter(qd(Cd,1)).eachAfter(qd(r,i.r/Math.min(n,e))).eachBefore(Rd(Math.min(n,e)/(2*i.r))),i}return i.radius=function(n){return arguments.length?(t=kd(n),i):t},i.size=function(t){return arguments.length?(n=+t[0],e=+t[1],i):[n,e]},i.padding=function(t){return arguments.length?(r="function"==typeof t?t:Pd(+t),i):r},i},t.packEnclose=gd,t.packSiblings=function(t){return Ed(t),t},t.pairs=function(t,n=J){const e=[];let r,i=!1;for(const o of t)i&&e.push(n(r,o)),r=o,i=!0;return e},t.partition=function(){var t=1,n=1,e=0,r=!1;function i(i){var o=i.height+1;return i.x0=i.y0=e,i.x1=t,i.y1=n/o,i.eachBefore(function(t,n){return function(r){r.children&&Od(r,r.x0,t*(r.depth+1)/n,r.x1,t*(r.depth+2)/n);var i=r.x0,o=r.y0,a=r.x1-e,u=r.y1-e;a<i&&(i=a=(i+a)/2),u<o&&(o=u=(o+u)/2),r.x0=i,r.y0=o,r.x1=a,r.y1=u}}(n,o)),r&&i.eachBefore(Fd),i}return i.round=function(t){return arguments.length?(r=!!t,i):r},i.size=function(e){return arguments.length?(t=+e[0],n=+e[1],i):[t,n]},i.padding=function(t){return arguments.length?(e=+t,i):e},i},t.path=ya,t.permute=N,t.pie=function(){var t=lm,n=sm,e=null,r=Rb(0),i=Rb(Gb),o=Rb(0);function a(a){var u,c,f,s,l,h=(a=rm(a)).length,d=0,p=new Array(h),g=new Array(h),y=+r.apply(this,arguments),v=Math.min(Gb,Math.max(-Gb,i.apply(this,arguments)-y)),_=Math.min(Math.abs(v)/h,o.apply(this,arguments)),b=_*(v<0?-1:1);for(u=0;u<h;++u)(l=g[p[u]=u]=+t(a[u],u,a))>0&&(d+=l);for(null!=n?p.sort((function(t,e){return n(g[t],g[e])})):null!=e&&p.sort((function(t,n){return e(a[t],a[n])})),u=0,f=d?(v-h*b)/d:0;u<h;++u,y=s)c=p[u],s=y+((l=g[c])>0?l*f:0)+b,g[c]={data:a[c],index:u,value:l,startAngle:y,endAngle:s,padAngle:_};return g}return a.value=function(n){return arguments.length?(t="function"==typeof n?n:Rb(+n),a):t},a.sortValues=function(t){return arguments.length?(n=t,e=null,a):n},a.sort=function(t){return arguments.length?(e=t,n=null,a):e},a.startAngle=function(t){return arguments.length?(r="function"==typeof t?t:Rb(+t),a):r},a.endAngle=function(t){return arguments.length?(i="function"==typeof t?t:Rb(+t),a):i},a.padAngle=function(t){return arguments.length?(o="function"==typeof t?t:Rb(+t),a):o},a},t.piecewise=Zr,t.pointRadial=_m,t.pointer=jn,t.pointers=function(t,n){return t.target&&(t=Ln(t),void 0===n&&(n=t.currentTarget),t=t.touches||[t]),Array.from(t,(t=>jn(t,n)))},t.polygonArea=function(t){for(var n,e=-1,r=t.length,i=t[r-1],o=0;++e<r;)n=i,i=t[e],o+=n[1]*i[0]-n[0]*i[1];return o/2},t.polygonCentroid=function(t){for(var n,e,r=-1,i=t.length,o=0,a=0,u=t[i-1],c=0;++r<i;)n=u,u=t[r],c+=e=n[0]*u[1]-u[0]*n[1],o+=(n[0]+u[0])*e,a+=(n[1]+u[1])*e;return[o/(c*=3),a/c]},t.polygonContains=function(t,n){for(var e,r,i=t.length,o=t[i-1],a=n[0],u=n[1],c=o[0],f=o[1],s=!1,l=0;l<i;++l)e=(o=t[l])[0],(r=o[1])>u!=f>u&&a<(c-e)*(u-r)/(f-r)+e&&(s=!s),c=e,f=r;return s},t.polygonHull=function(t){if((e=t.length)<3)return null;var n,e,r=new Array(e),i=new Array(e);for(n=0;n<e;++n)r[n]=[+t[n][0],+t[n][1],n];for(r.sort(tp),n=0;n<e;++n)i[n]=[r[n][0],-r[n][1]];var o=np(r),a=np(i),u=a[0]===o[0],c=a[a.length-1]===o[o.length-1],f=[];for(n=o.length-1;n>=0;--n)f.push(t[r[o[n]][2]]);for(n=+u;n<a.length-c;++n)f.push(t[r[a[n]][2]]);return f},t.polygonLength=function(t){for(var n,e,r=-1,i=t.length,o=t[i-1],a=o[0],u=o[1],c=0;++r<i;)n=a,e=u,n-=a=(o=t[r])[0],e-=u=o[1],c+=Math.hypot(n,e);return c},t.precisionFixed=Cc,t.precisionPrefix=Pc,t.precisionRound=zc,t.quadtree=ec,t.quantile=$,t.quantileSorted=W,t.quantize=function(t,n){for(var e=new Array(n),r=0;r<n;++r)e[r]=t(r/(n-1));return e},t.quickselect=G,t.radialArea=vm,t.radialLine=ym,t.randomBates=cp,t.randomBernoulli=lp,t.randomBeta=pp,t.randomBinomial=gp,t.randomCauchy=vp,t.randomExponential=fp,t.randomGamma=dp,t.randomGeometric=hp,t.randomInt=ip,t.randomIrwinHall=up,t.randomLcg=function(t=Math.random()){let n=0|(0<=t&&t<1?t/mp:Math.abs(t));return()=>(n=1664525*n+1013904223|0,mp*(n>>>0))},t.randomLogNormal=ap,t.randomLogistic=_p,t.randomNormal=op,t.randomPareto=sp,t.randomPoisson=bp,t.randomUniform=rp,t.randomWeibull=yp,t.range=tt,t.rank=function(t,e=n){if("function"!=typeof t[Symbol.iterator])throw new TypeError("values is not iterable");let r=Array.from(t);const i=new Float64Array(r.length);2!==e.length&&(r=r.map(e),e=n);const o=(t,n)=>e(r[t],r[n]);let a,u;return Uint32Array.from(r,((t,n)=>n)).sort(e===n?(t,n)=>z(r[t],r[n]):P(o)).forEach(((t,n)=>{const e=o(t,void 0===a?t:a);e>=0?((void 0===a||e>0)&&(a=t,u=n),i[t]=u):i[t]=NaN})),i},t.reduce=function(t,n,e){if("function"!=typeof n)throw new TypeError("reducer is not a function");const r=t[Symbol.iterator]();let i,o,a=-1;if(arguments.length<3){if(({done:i,value:e}=r.next()),i)return;++a}for(;({done:i,value:o}=r.next()),!i;)e=n(e,o,++a,t);return e},t.reverse=function(t){if("function"!=typeof t[Symbol.iterator])throw new TypeError("values is not iterable");return Array.from(t).reverse()},t.rgb=Ae,t.ribbon=function(){return Sa()},t.ribbonArrow=function(){return Sa(Ta)},t.rollup=T,t.rollups=S,t.scaleBand=Tp,t.scaleDiverging=function t(){var n=Op(f_()(Np));return n.copy=function(){return u_(n,t())},wp.apply(n,arguments)},t.scaleDivergingLog=function t(){var n=Xp(f_()).domain([.1,1,10]);return n.copy=function(){return u_(n,t()).base(n.base())},wp.apply(n,arguments)},t.scaleDivergingPow=s_,t.scaleDivergingSqrt=function(){return s_.apply(null,arguments).exponent(.5)},t.scaleDivergingSymlog=function t(){var n=$p(f_());return n.copy=function(){return u_(n,t()).constant(n.constant())},wp.apply(n,arguments)},t.scaleIdentity=function t(n){var e;function r(t){return null==t||isNaN(t=+t)?e:t}return r.invert=r,r.domain=r.range=function(t){return arguments.length?(n=Array.from(t,Ep),r):n.slice()},r.unknown=function(t){return arguments.length?(e=t,r):e},r.copy=function(){return t(n).unknown(e)},n=arguments.length?Array.from(n,Ep):[0,1],Op(r)},t.scaleImplicit=Mp,t.scaleLinear=function t(){var n=Rp();return n.copy=function(){return Dp(n,t())},xp.apply(n,arguments),Op(n)},t.scaleLog=function t(){const n=Xp(qp()).domain([1,10]);return n.copy=()=>Dp(n,t()).base(n.base()),xp.apply(n,arguments),n},t.scaleOrdinal=Ap,t.scalePoint=function(){return Sp(Tp.apply(null,arguments).paddingInner(1))},t.scalePow=Jp,t.scaleQuantile=function t(){var e,r=[],i=[],o=[];function a(){var t=0,n=Math.max(1,i.length);for(o=new Array(n-1);++t<n;)o[t-1]=W(r,t/n);return u}function u(t){return null==t||isNaN(t=+t)?e:i[c(o,t)]}return u.invertExtent=function(t){var n=i.indexOf(t);return n<0?[NaN,NaN]:[n>0?o[n-1]:r[0],n<o.length?o[n]:r[r.length-1]]},u.domain=function(t){if(!arguments.length)return r.slice();r=[];for(let n of t)null==n||isNaN(n=+n)||r.push(n);return r.sort(n),a()},u.range=function(t){return arguments.length?(i=Array.from(t),a()):i.slice()},u.unknown=function(t){return arguments.length?(e=t,u):e},u.quantiles=function(){return o.slice()},u.copy=function(){return t().domain(r).range(i).unknown(e)},xp.apply(u,arguments)},t.scaleQuantize=function t(){var n,e=0,r=1,i=1,o=[.5],a=[0,1];function u(t){return null!=t&&t<=t?a[c(o,t,0,i)]:n}function f(){var t=-1;for(o=new Array(i);++t<i;)o[t]=((t+1)*r-(t-i)*e)/(i+1);return u}return u.domain=function(t){return arguments.length?([e,r]=t,e=+e,r=+r,f()):[e,r]},u.range=function(t){return arguments.length?(i=(a=Array.from(t)).length-1,f()):a.slice()},u.invertExtent=function(t){var n=a.indexOf(t);return n<0?[NaN,NaN]:n<1?[e,o[0]]:n>=i?[o[i-1],r]:[o[n-1],o[n]]},u.unknown=function(t){return arguments.length?(n=t,u):u},u.thresholds=function(){return o.slice()},u.copy=function(){return t().domain([e,r]).range(a).unknown(n)},xp.apply(Op(u),arguments)},t.scaleRadial=function t(){var n,e=Rp(),r=[0,1],i=!1;function o(t){var r=ng(e(t));return isNaN(r)?n:i?Math.round(r):r}return o.invert=function(t){return e.invert(tg(t))},o.domain=function(t){return arguments.length?(e.domain(t),o):e.domain()},o.range=function(t){return arguments.length?(e.range((r=Array.from(t,Ep)).map(tg)),o):r.slice()},o.rangeRound=function(t){return o.range(t).round(!0)},o.round=function(t){return arguments.length?(i=!!t,o):i},o.clamp=function(t){return arguments.length?(e.clamp(t),o):e.clamp()},o.unknown=function(t){return arguments.length?(n=t,o):n},o.copy=function(){return t(e.domain(),r).round(i).clamp(e.clamp()).unknown(n)},xp.apply(o,arguments),Op(o)},t.scaleSequential=function t(){var n=Op(a_()(Np));return n.copy=function(){return u_(n,t())},wp.apply(n,arguments)},t.scaleSequentialLog=function t(){var n=Xp(a_()).domain([1,10]);return n.copy=function(){return u_(n,t()).base(n.base())},wp.apply(n,arguments)},t.scaleSequentialPow=c_,t.scaleSequentialQuantile=function t(){var e=[],r=Np;function i(t){if(null!=t&&!isNaN(t=+t))return r((c(e,t,1)-1)/(e.length-1))}return i.domain=function(t){if(!arguments.length)return e.slice();e=[];for(let n of t)null==n||isNaN(n=+n)||e.push(n);return e.sort(n),i},i.interpolator=function(t){return arguments.length?(r=t,i):r},i.range=function(){return e.map(((t,n)=>r(n/(e.length-1))))},i.quantiles=function(t){return Array.from({length:t+1},((n,r)=>$(e,r/t)))},i.copy=function(){return t(r).domain(e)},wp.apply(i,arguments)},t.scaleSequentialSqrt=function(){return c_.apply(null,arguments).exponent(.5)},t.scaleSequentialSymlog=function t(){var n=$p(a_());return n.copy=function(){return u_(n,t()).constant(n.constant())},wp.apply(n,arguments)},t.scaleSqrt=function(){return Jp.apply(null,arguments).exponent(.5)},t.scaleSymlog=function t(){var n=$p(qp());return n.copy=function(){return Dp(n,t()).constant(n.constant())},xp.apply(n,arguments)},t.scaleThreshold=function t(){var n,e=[.5],r=[0,1],i=1;function o(t){return null!=t&&t<=t?r[c(e,t,0,i)]:n}return o.domain=function(t){return arguments.length?(e=Array.from(t),i=Math.min(e.length,r.length-1),o):e.slice()},o.range=function(t){return arguments.length?(r=Array.from(t),i=Math.min(e.length,r.length-1),o):r.slice()},o.invertExtent=function(t){var n=r.indexOf(t);return[e[n-1],e[n]]},o.unknown=function(t){return arguments.length?(n=t,o):n},o.copy=function(){return t().domain(e).range(r).unknown(n)},xp.apply(o,arguments)},t.scaleTime=function(){return xp.apply(o_(Ey,ky,Gg,jg,kg,Tg,wg,bg,yg,t.timeFormat).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)},t.scaleUtc=function(){return xp.apply(o_(Ty,Sy,wy,by,iy,ny,Qg,Wg,yg,t.utcFormat).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)},t.scan=function(t,n){const e=nt(t,n);return e<0?void 0:e},t.schemeAccent=d_,t.schemeBlues=lb,t.schemeBrBG=M_,t.schemeBuGn=Y_,t.schemeBuPu=j_,t.schemeCategory10=h_,t.schemeDark2=p_,t.schemeGnBu=X_,t.schemeGreens=db,t.schemeGreys=gb,t.schemeOrRd=V_,t.schemeOranges=xb,t.schemePRGn=T_,t.schemePaired=g_,t.schemePastel1=y_,t.schemePastel2=v_,t.schemePiYG=E_,t.schemePuBu=K_,t.schemePuBuGn=W_,t.schemePuOr=N_,t.schemePuRd=J_,t.schemePurples=vb,t.schemeRdBu=P_,t.schemeRdGy=D_,t.schemeRdPu=nb,t.schemeRdYlBu=R_,t.schemeRdYlGn=O_,t.schemeReds=bb,t.schemeSet1=__,t.schemeSet2=b_,t.schemeSet3=m_,t.schemeSpectral=I_,t.schemeTableau10=x_,t.schemeYlGn=ob,t.schemeYlGnBu=rb,t.schemeYlOrBr=ub,t.schemeYlOrRd=fb,t.select=Un,t.selectAll=function(t){return"string"==typeof t?new Fn([document.querySelectorAll(t)],[document.documentElement]):new Fn([Pt(t)],Rn)},t.selection=On,t.selector=Ct,t.selectorAll=Dt,t.shuffle=et,t.shuffler=rt,t.some=function(t,n){if("function"!=typeof n)throw new TypeError("test is not a function");let e=-1;for(const r of t)if(n(r,++e,t))return!0;return!1},t.sort=C,t.stack=function(){var t=Rb([]),n=Mx,e=wx,r=Ax;function i(i){var o,a,u=Array.from(t.apply(this,arguments),Tx),c=u.length,f=-1;for(const t of i)for(o=0,++f;o<c;++o)(u[o][f]=[0,+r(t,u[o].key,f,i)]).data=t;for(o=0,a=rm(n(u));o<c;++o)u[a[o]].index=o;return e(u,a),u}return i.keys=function(n){return arguments.length?(t="function"==typeof n?n:Rb(Array.from(n)),i):t},i.value=function(t){return arguments.length?(r="function"==typeof t?t:Rb(+t),i):r},i.order=function(t){return arguments.length?(n=null==t?Mx:"function"==typeof t?t:Rb(Array.from(t)),i):n},i.offset=function(t){return arguments.length?(e=null==t?wx:t,i):e},i},t.stackOffsetDiverging=function(t,n){if((u=t.length)>0)for(var e,r,i,o,a,u,c=0,f=t[n[0]].length;c<f;++c)for(o=a=0,e=0;e<u;++e)(i=(r=t[n[e]][c])[1]-r[0])>0?(r[0]=o,r[1]=o+=i):i<0?(r[1]=a,r[0]=a+=i):(r[0]=0,r[1]=i)},t.stackOffsetExpand=function(t,n){if((r=t.length)>0){for(var e,r,i,o=0,a=t[0].length;o<a;++o){for(i=e=0;e<r;++e)i+=t[e][o][1]||0;if(i)for(e=0;e<r;++e)t[e][o][1]/=i}wx(t,n)}},t.stackOffsetNone=wx,t.stackOffsetSilhouette=function(t,n){if((e=t.length)>0){for(var e,r=0,i=t[n[0]],o=i.length;r<o;++r){for(var a=0,u=0;a<e;++a)u+=t[a][r][1]||0;i[r][1]+=i[r][0]=-u/2}wx(t,n)}},t.stackOffsetWiggle=function(t,n){if((i=t.length)>0&&(r=(e=t[n[0]]).length)>0){for(var e,r,i,o=0,a=1;a<r;++a){for(var u=0,c=0,f=0;u<i;++u){for(var s=t[n[u]],l=s[a][1]||0,h=(l-(s[a-1][1]||0))/2,d=0;d<u;++d){var p=t[n[d]];h+=(p[a][1]||0)-(p[a-1][1]||0)}c+=l,f+=h*l}e[a-1][1]+=e[a-1][0]=o,c&&(o-=f/c)}e[a-1][1]+=e[a-1][0]=o,wx(t,n)}},t.stackOrderAppearance=Sx,t.stackOrderAscending=kx,t.stackOrderDescending=function(t){return kx(t).reverse()},t.stackOrderInsideOut=function(t){var n,e,r=t.length,i=t.map(Nx),o=Sx(t),a=0,u=0,c=[],f=[];for(n=0;n<r;++n)e=o[n],a<u?(a+=i[e],c.push(e)):(u+=i[e],f.push(e));return f.reverse().concat(c)},t.stackOrderNone=Mx,t.stackOrderReverse=function(t){return Mx(t).reverse()},t.stratify=function(){var t=Bd,n=Yd;function e(e){var r,i,o,a,u,c,f,s=Array.from(e),l=s.length,h=new Map;for(i=0;i<l;++i)r=s[i],u=s[i]=new pd(r),null!=(c=t(r,i,e))&&(c+="")&&(f=u.id=c,h.set(f,h.has(f)?Id:u)),null!=(c=n(r,i,e))&&(c+="")&&(u.parent=c);for(i=0;i<l;++i)if(c=(u=s[i]).parent){if(!(a=h.get(c)))throw new Error("missing: "+c);if(a===Id)throw new Error("ambiguous: "+c);a.children?a.children.push(u):a.children=[u],u.parent=a}else{if(o)throw new Error("multiple roots");o=u}if(!o)throw new Error("no root");if(o.parent=Ud,o.eachBefore((function(t){t.depth=t.parent.depth+1,--l})).eachBefore(dd),o.parent=null,l>0)throw new Error("cycle");return o}return e.id=function(n){return arguments.length?(t=Nd(n),e):t},e.parentId=function(t){return arguments.length?(n=Nd(t),e):n},e},t.style=on,t.subset=function(t,n){return ut(n,t)},t.sum=function(t,n){let e=0;if(void 0===n)for(let n of t)(n=+n)&&(e+=n);else{let r=-1;for(let i of t)(i=+n(i,++r,t))&&(e+=i)}return e},t.superset=ut,t.svg=Ku,t.symbol=function(t,n){var e=null;function r(){var r;if(e||(e=r=ya()),t.apply(this,arguments).draw(e,+n.apply(this,arguments)),r)return e=null,r+""||null}return t="function"==typeof t?t:Rb(t||Tm),n="function"==typeof n?n:Rb(void 0===n?64:+n),r.type=function(n){return arguments.length?(t="function"==typeof n?n:Rb(n),r):t},r.size=function(t){return arguments.length?(n="function"==typeof t?t:Rb(+t),r):n},r.context=function(t){return arguments.length?(e=null==t?null:t,r):e},r},t.symbolCircle=Tm,t.symbolCross=Sm,t.symbolDiamond=Nm,t.symbolSquare=qm,t.symbolStar=Dm,t.symbolTriangle=Fm,t.symbolWye=Ym,t.symbols=Lm,t.text=ju,t.thresholdFreedmanDiaconis=function(t,n,e){return Math.ceil((e-n)/(2*($(t,.75)-$(t,.25))*Math.pow(f(t),-1/3)))},t.thresholdScott=function(t,n,e){return Math.ceil((e-n)/(3.5*p(t)*Math.pow(f(t),-1/3)))},t.thresholdSturges=L,t.tickFormat=Fp,t.tickIncrement=I,t.tickStep=B,t.ticks=U,t.timeDay=Tg,t.timeDays=Sg,t.timeFormatDefaultLocale=Kv,t.timeFormatLocale=zy,t.timeFriday=Dg,t.timeFridays=Bg,t.timeHour=wg,t.timeHours=Mg,t.timeInterval=ig,t.timeMillisecond=ag,t.timeMilliseconds=ug,t.timeMinute=bg,t.timeMinutes=mg,t.timeMonday=Ng,t.timeMondays=Fg,t.timeMonth=jg,t.timeMonths=Hg,t.timeSaturday=qg,t.timeSaturdays=Yg,t.timeSecond=yg,t.timeSeconds=vg,t.timeSunday=kg,t.timeSundays=Rg,t.timeThursday=zg,t.timeThursdays=Ig,t.timeTickInterval=ky,t.timeTicks=Ey,t.timeTuesday=Cg,t.timeTuesdays=Og,t.timeWednesday=Pg,t.timeWednesdays=Ug,t.timeWeek=kg,t.timeWeeks=Rg,t.timeYear=Gg,t.timeYears=Vg,t.timeout=gi,t.timer=si,t.timerFlush=li,t.transition=Ki,t.transpose=it,t.tree=function(){var t=Ld,n=1,e=1,r=null;function i(i){var c=function(t){for(var n,e,r,i,o,a=new Vd(t,0),u=[a];n=u.pop();)if(r=n._.children)for(n.children=new Array(o=r.length),i=o-1;i>=0;--i)u.push(e=n.children[i]=new Vd(r[i],i)),e.parent=n;return(a.parent=new Vd(null,0)).children=[a],a}(i);if(c.eachAfter(o),c.parent.m=-c.z,c.eachBefore(a),r)i.eachBefore(u);else{var f=i,s=i,l=i;i.eachBefore((function(t){t.x<f.x&&(f=t),t.x>s.x&&(s=t),t.depth>l.depth&&(l=t)}));var h=f===s?1:t(f,s)/2,d=h-f.x,p=n/(s.x+h+d),g=e/(l.depth||1);i.eachBefore((function(t){t.x=(t.x+d)*p,t.y=t.depth*g}))}return i}function o(n){var e=n.children,r=n.parent.children,i=n.i?r[n.i-1]:null;if(e){!function(t){for(var n,e=0,r=0,i=t.children,o=i.length;--o>=0;)(n=i[o]).z+=e,n.m+=e,e+=n.s+(r+=n.c)}(n);var o=(e[0].z+e[e.length-1].z)/2;i?(n.z=i.z+t(n._,i._),n.m=n.z-o):n.z=o}else i&&(n.z=i.z+t(n._,i._));n.parent.A=function(n,e,r){if(e){for(var i,o=n,a=n,u=e,c=o.parent.children[0],f=o.m,s=a.m,l=u.m,h=c.m;u=Hd(u),o=jd(o),u&&o;)c=jd(c),(a=Hd(a)).a=n,(i=u.z+l-o.z-f+t(u._,o._))>0&&(Xd(Gd(u,n,r),n,i),f+=i,s+=i),l+=u.m,f+=o.m,h+=c.m,s+=a.m;u&&!Hd(a)&&(a.t=u,a.m+=l-s),o&&!jd(c)&&(c.t=o,c.m+=f-h,r=n)}return r}(n,i,n.parent.A||r[0])}function a(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function u(t){t.x*=n,t.y=t.depth*e}return i.separation=function(n){return arguments.length?(t=n,i):t},i.size=function(t){return arguments.length?(r=!1,n=+t[0],e=+t[1],i):r?null:[n,e]},i.nodeSize=function(t){return arguments.length?(r=!0,n=+t[0],e=+t[1],i):r?[n,e]:null},i},t.treemap=function(){var t=Kd,n=!1,e=1,r=1,i=[0],o=Cd,a=Cd,u=Cd,c=Cd,f=Cd;function s(t){return t.x0=t.y0=0,t.x1=e,t.y1=r,t.eachBefore(l),i=[0],n&&t.eachBefore(Fd),t}function l(n){var e=i[n.depth],r=n.x0+e,s=n.y0+e,l=n.x1-e,h=n.y1-e;l<r&&(r=l=(r+l)/2),h<s&&(s=h=(s+h)/2),n.x0=r,n.y0=s,n.x1=l,n.y1=h,n.children&&(e=i[n.depth+1]=o(n)/2,r+=f(n)-e,s+=a(n)-e,(l-=u(n)-e)<r&&(r=l=(r+l)/2),(h-=c(n)-e)<s&&(s=h=(s+h)/2),t(n,r,s,l,h))}return s.round=function(t){return arguments.length?(n=!!t,s):n},s.size=function(t){return arguments.length?(e=+t[0],r=+t[1],s):[e,r]},s.tile=function(n){return arguments.length?(t=Nd(n),s):t},s.padding=function(t){return arguments.length?s.paddingInner(t).paddingOuter(t):s.paddingInner()},s.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:Pd(+t),s):o},s.paddingOuter=function(t){return arguments.length?s.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):s.paddingTop()},s.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:Pd(+t),s):a},s.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:Pd(+t),s):u},s.paddingBottom=function(t){return arguments.length?(c="function"==typeof t?t:Pd(+t),s):c},s.paddingLeft=function(t){return arguments.length?(f="function"==typeof t?t:Pd(+t),s):f},s},t.treemapBinary=function(t,n,e,r,i){var o,a,u=t.children,c=u.length,f=new Array(c+1);for(f[0]=a=o=0;o<c;++o)f[o+1]=a+=u[o].value;!function t(n,e,r,i,o,a,c){if(n>=e-1){var s=u[n];return s.x0=i,s.y0=o,s.x1=a,void(s.y1=c)}var l=f[n],h=r/2+l,d=n+1,p=e-1;for(;d<p;){var g=d+p>>>1;f[g]<h?d=g+1:p=g}h-f[d-1]<f[d]-h&&n+1<d&&--d;var y=f[d]-l,v=r-y;if(a-i>c-o){var _=r?(i*v+a*y)/r:a;t(n,d,y,i,o,_,c),t(d,e,v,_,o,a,c)}else{var b=r?(o*v+c*y)/r:c;t(n,d,y,i,o,a,b),t(d,e,v,i,b,a,c)}}(0,c,t.value,n,e,r,i)},t.treemapDice=Od,t.treemapResquarify=Qd,t.treemapSlice=$d,t.treemapSliceDice=function(t,n,e,r,i){(1&t.depth?$d:Od)(t,n,e,r,i)},t.treemapSquarify=Kd,t.tsv=Gu,t.tsvFormat=qu,t.tsvFormatBody=Ru,t.tsvFormatRow=Ou,t.tsvFormatRows=Fu,t.tsvFormatValue=Uu,t.tsvParse=zu,t.tsvParseRows=Du,t.union=function(...t){const n=new InternSet;for(const e of t)for(const t of e)n.add(t);return n},t.utcDay=ny,t.utcDays=ey,t.utcFriday=fy,t.utcFridays=yy,t.utcHour=Qg,t.utcHours=Jg,t.utcMillisecond=ag,t.utcMilliseconds=ug,t.utcMinute=Wg,t.utcMinutes=Zg,t.utcMonday=oy,t.utcMondays=hy,t.utcMonth=by,t.utcMonths=my,t.utcSaturday=sy,t.utcSaturdays=vy,t.utcSecond=yg,t.utcSeconds=vg,t.utcSunday=iy,t.utcSundays=ly,t.utcThursday=cy,t.utcThursdays=gy,t.utcTickInterval=Sy,t.utcTicks=Ty,t.utcTuesday=ay,t.utcTuesdays=dy,t.utcWednesday=uy,t.utcWednesdays=py,t.utcWeek=iy,t.utcWeeks=ly,t.utcYear=wy,t.utcYears=My,t.variance=d,t.version="7.1.1",t.window=tn,t.xml=Wu,t.zip=function(){return it(arguments)},t.zoom=function(){var t,n,e,r=Ox,i=Ux,o=Lx,a=Bx,u=Yx,c=[0,1/0],f=[[-1/0,-1/0],[1/0,1/0]],s=250,l=Br,h=_t("start","zoom","end"),d=500,p=0,g=10;function y(t){t.property("__zoom",Ix).on("wheel.zoom",M,{passive:!1}).on("mousedown.zoom",A).on("dblclick.zoom",T).filter(u).on("touchstart.zoom",S).on("touchmove.zoom",E).on("touchend.zoom touchcancel.zoom",k).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function v(t,n){return(n=Math.max(c[0],Math.min(c[1],n)))===t.k?t:new zx(n,t.x,t.y)}function _(t,n,e){var r=n[0]-e[0]*t.k,i=n[1]-e[1]*t.k;return r===t.x&&i===t.y?t:new zx(t.k,r,i)}function b(t){return[(+t[0][0]+ +t[1][0])/2,(+t[0][1]+ +t[1][1])/2]}function m(t,n,e,r){t.on("start.zoom",(function(){x(this,arguments).event(r).start()})).on("interrupt.zoom end.zoom",(function(){x(this,arguments).event(r).end()})).tween("zoom",(function(){var t=this,o=arguments,a=x(t,o).event(r),u=i.apply(t,o),c=null==e?b(u):"function"==typeof e?e.apply(t,o):e,f=Math.max(u[1][0]-u[0][0],u[1][1]-u[0][1]),s=t.__zoom,h="function"==typeof n?n.apply(t,o):n,d=l(s.invert(c).concat(f/s.k),h.invert(c).concat(f/h.k));return function(t){if(1===t)t=h;else{var n=d(t),e=f/n[2];t=new zx(e,c[0]-n[0]*e,c[1]-n[1]*e)}a.zoom(null,t)}}))}function x(t,n,e){return!e&&t.__zooming||new w(t,n)}function w(t,n){this.that=t,this.args=n,this.active=0,this.sourceEvent=null,this.extent=i.apply(t,n),this.taps=0}function M(t,...n){if(r.apply(this,arguments)){var e=x(this,n).event(t),i=this.__zoom,u=Math.max(c[0],Math.min(c[1],i.k*Math.pow(2,a.apply(this,arguments)))),s=jn(t);if(e.wheel)e.mouse[0][0]===s[0]&&e.mouse[0][1]===s[1]||(e.mouse[1]=i.invert(e.mouse[0]=s)),clearTimeout(e.wheel);else{if(i.k===u)return;e.mouse=[s,i.invert(s)],wi(this),e.start()}Fx(t),e.wheel=setTimeout(l,150),e.zoom("mouse",o(_(v(i,u),e.mouse[0],e.mouse[1]),e.extent,f))}function l(){e.wheel=null,e.end()}}function A(t,...n){if(!e&&r.apply(this,arguments)){var i=t.currentTarget,a=x(this,n,!0).event(t),u=Un(t.view).on("mousemove.zoom",h,!0).on("mouseup.zoom",d,!0),c=jn(t,i),s=t.clientX,l=t.clientY;$n(t.view),Rx(t),a.mouse=[c,this.__zoom.invert(c)],wi(this),a.start()}function h(t){if(Fx(t),!a.moved){var n=t.clientX-s,e=t.clientY-l;a.moved=n*n+e*e>p}a.event(t).zoom("mouse",o(_(a.that.__zoom,a.mouse[0]=jn(t,i),a.mouse[1]),a.extent,f))}function d(t){u.on("mousemove.zoom mouseup.zoom",null),Wn(t.view,a.moved),Fx(t),a.event(t).end()}}function T(t,...n){if(r.apply(this,arguments)){var e=this.__zoom,a=jn(t.changedTouches?t.changedTouches[0]:t,this),u=e.invert(a),c=e.k*(t.shiftKey?.5:2),l=o(_(v(e,c),a,u),i.apply(this,n),f);Fx(t),s>0?Un(this).transition().duration(s).call(m,l,a,t):Un(this).call(y.transform,l,a,t)}}function S(e,...i){if(r.apply(this,arguments)){var o,a,u,c,f=e.touches,s=f.length,l=x(this,i,e.changedTouches.length===s).event(e);for(Rx(e),a=0;a<s;++a)c=[c=jn(u=f[a],this),this.__zoom.invert(c),u.identifier],l.touch0?l.touch1||l.touch0[2]===c[2]||(l.touch1=c,l.taps=0):(l.touch0=c,o=!0,l.taps=1+!!t);t&&(t=clearTimeout(t)),o&&(l.taps<2&&(n=c[0],t=setTimeout((function(){t=null}),d)),wi(this),l.start())}}function E(t,...n){if(this.__zooming){var e,r,i,a,u=x(this,n).event(t),c=t.changedTouches,s=c.length;for(Fx(t),e=0;e<s;++e)i=jn(r=c[e],this),u.touch0&&u.touch0[2]===r.identifier?u.touch0[0]=i:u.touch1&&u.touch1[2]===r.identifier&&(u.touch1[0]=i);if(r=u.that.__zoom,u.touch1){var l=u.touch0[0],h=u.touch0[1],d=u.touch1[0],p=u.touch1[1],g=(g=d[0]-l[0])*g+(g=d[1]-l[1])*g,y=(y=p[0]-h[0])*y+(y=p[1]-h[1])*y;r=v(r,Math.sqrt(g/y)),i=[(l[0]+d[0])/2,(l[1]+d[1])/2],a=[(h[0]+p[0])/2,(h[1]+p[1])/2]}else{if(!u.touch0)return;i=u.touch0[0],a=u.touch0[1]}u.zoom("touch",o(_(r,i,a),u.extent,f))}}function k(t,...r){if(this.__zooming){var i,o,a=x(this,r).event(t),u=t.changedTouches,c=u.length;for(Rx(t),e&&clearTimeout(e),e=setTimeout((function(){e=null}),d),i=0;i<c;++i)o=u[i],a.touch0&&a.touch0[2]===o.identifier?delete a.touch0:a.touch1&&a.touch1[2]===o.identifier&&delete a.touch1;if(a.touch1&&!a.touch0&&(a.touch0=a.touch1,delete a.touch1),a.touch0)a.touch0[1]=this.__zoom.invert(a.touch0[0]);else if(a.end(),2===a.taps&&(o=jn(o,this),Math.hypot(n[0]-o[0],n[1]-o[1])<g)){var f=Un(this).on("dblclick.zoom");f&&f.apply(this,arguments)}}}return y.transform=function(t,n,e,r){var i=t.selection?t.selection():t;i.property("__zoom",Ix),t!==i?m(t,n,e,r):i.interrupt().each((function(){x(this,arguments).event(r).start().zoom(null,"function"==typeof n?n.apply(this,arguments):n).end()}))},y.scaleBy=function(t,n,e,r){y.scaleTo(t,(function(){var t=this.__zoom.k,e="function"==typeof n?n.apply(this,arguments):n;return t*e}),e,r)},y.scaleTo=function(t,n,e,r){y.transform(t,(function(){var t=i.apply(this,arguments),r=this.__zoom,a=null==e?b(t):"function"==typeof e?e.apply(this,arguments):e,u=r.invert(a),c="function"==typeof n?n.apply(this,arguments):n;return o(_(v(r,c),a,u),t,f)}),e,r)},y.translateBy=function(t,n,e,r){y.transform(t,(function(){return o(this.__zoom.translate("function"==typeof n?n.apply(this,arguments):n,"function"==typeof e?e.apply(this,arguments):e),i.apply(this,arguments),f)}),null,r)},y.translateTo=function(t,n,e,r,a){y.transform(t,(function(){var t=i.apply(this,arguments),a=this.__zoom,u=null==r?b(t):"function"==typeof r?r.apply(this,arguments):r;return o(Dx.translate(u[0],u[1]).scale(a.k).translate("function"==typeof n?-n.apply(this,arguments):-n,"function"==typeof e?-e.apply(this,arguments):-e),t,f)}),r,a)},w.prototype={event:function(t){return t&&(this.sourceEvent=t),this},start:function(){return 1==++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(t,n){return this.mouse&&"mouse"!==t&&(this.mouse[1]=n.invert(this.mouse[0])),this.touch0&&"touch"!==t&&(this.touch0[1]=n.invert(this.touch0[0])),this.touch1&&"touch"!==t&&(this.touch1[1]=n.invert(this.touch1[0])),this.that.__zoom=n,this.emit("zoom"),this},end:function(){return 0==--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(t){var n=Un(this.that).datum();h.call(t,this.that,new Px(t,{sourceEvent:this.sourceEvent,target:y,type:t,transform:this.that.__zoom,dispatch:h}),n)}},y.wheelDelta=function(t){return arguments.length?(a="function"==typeof t?t:Cx(+t),y):a},y.filter=function(t){return arguments.length?(r="function"==typeof t?t:Cx(!!t),y):r},y.touchable=function(t){return arguments.length?(u="function"==typeof t?t:Cx(!!t),y):u},y.extent=function(t){return arguments.length?(i="function"==typeof t?t:Cx([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),y):i},y.scaleExtent=function(t){return arguments.length?(c[0]=+t[0],c[1]=+t[1],y):[c[0],c[1]]},y.translateExtent=function(t){return arguments.length?(f[0][0]=+t[0][0],f[1][0]=+t[1][0],f[0][1]=+t[0][1],f[1][1]=+t[1][1],y):[[f[0][0],f[0][1]],[f[1][0],f[1][1]]]},y.constrain=function(t){return arguments.length?(o=t,y):o},y.duration=function(t){return arguments.length?(s=+t,y):s},y.interpolate=function(t){return arguments.length?(l=t,y):l},y.on=function(){var t=h.on.apply(h,arguments);return t===h?y:t},y.clickDistance=function(t){return arguments.length?(p=(t=+t)*t,y):Math.sqrt(p)},y.tapDistance=function(t){return arguments.length?(g=+t,y):g},y},t.zoomIdentity=Dx,t.zoomTransform=qx,Object.defineProperty(t,"__esModule",{value:!0})}));

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-dsv"),require("topojson-client"),require("d3-array"),require("d3-format"),require("d3-time"),require("d3-time-format"),require("d3-shape"),require("d3-path"),require("d3-scale"),require("d3-interpolate"),require("d3-geo"),require("d3-color"),require("d3-force"),require("d3-hierarchy"),require("d3-delaunay"),require("d3-timer")):"function"==typeof define&&define.amd?define(["exports","d3-dsv","topojson-client","d3-array","d3-format","d3-time","d3-time-format","d3-shape","d3-path","d3-scale","d3-interpolate","d3-geo","d3-color","d3-force","d3-hierarchy","d3-delaunay","d3-timer"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).vega={},e.d3,e.topojson,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3,e.d3)}(this,(function(e,t,n,r,i,a,o,s,u,l,c,d,f,h,p,m,g){"use strict";function y(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var v=y(l),b=y(c),x="5.21.0";function _(e,t,n){return e.fields=t||[],e.fname=n,e}function k(e){return null==e?null:e.fname}function A(e){return null==e?null:e.fields}function w(e){return 1===e.length?D(e[0]):E(e)}const D=e=>function(t){return t[e]},E=e=>{const t=e.length;return function(n){for(let r=0;r<t;++r)n=n[e[r]];return n}};function C(e){throw Error(e)}function F(e){const t=[],n=e.length;let r,i,a,o=null,s=0,u="";function l(){t.push(u+e.substring(r,i)),u="",r=i+1}for(e+="",r=i=0;i<n;++i)if(a=e[i],"\\"===a)u+=e.substring(r,i),u+=e.substring(++i,++i),r=i;else if(a===o)l(),o=null,s=-1;else{if(o)continue;r===s&&'"'===a||r===s&&"'"===a?(r=i+1,o=a):"."!==a||s?"["===a?(i>r&&l(),s=r=i+1):"]"===a&&(s||C("Access path missing open bracket: "+e),s>0&&l(),s=0,r=i+1):i>r?l():r=i+1}return s&&C("Access path missing closing bracket: "+e),o&&C("Access path missing closing quote: "+e),i>r&&(i++,l()),t}function M(e,t,n){const r=F(e);return e=1===r.length?r[0]:e,_((n&&n.get||w)(r),[e],t||e)}const S=M("id"),B=_((e=>e),[],"identity"),O=_((()=>0),[],"zero"),R=_((()=>1),[],"one"),z=_((()=>!0),[],"true"),$=_((()=>!1),[],"false");function q(e,t,n){const r=[t].concat([].slice.call(n));console[e].apply(console,r)}function L(e,t,n=q){let r=e||0;return{level(e){return arguments.length?(r=+e,this):r},error(){return r>=1&&n(t||"error","ERROR",arguments),this},warn(){return r>=2&&n(t||"warn","WARN",arguments),this},info(){return r>=3&&n(t||"log","INFO",arguments),this},debug(){return r>=4&&n(t||"log","DEBUG",arguments),this}}}var T=Array.isArray;function N(e){return e===Object(e)}const P=e=>"__proto__"!==e;function U(...e){return e.reduce(((e,t)=>{for(const n in t)if("signals"===n)e.signals=I(e.signals,t.signals);else{const r="legend"===n?{layout:1}:"style"===n||null;j(e,n,t[n],r)}return e}),{})}function j(e,t,n,r){if(!P(t))return;let i,a;if(N(n)&&!T(n))for(i in a=N(e[t])?e[t]:e[t]={},n)r&&(!0===r||r[i])?j(a,i,n[i]):P(i)&&(a[i]=n[i]);else e[t]=n}function I(e,t){if(null==e)return t;const n={},r=[];function i(e){n[e.name]||(n[e.name]=1,r.push(e))}return t.forEach(i),e.forEach(i),r}function W(e){return e[e.length-1]}function H(e){return null==e||""===e?null:+e}const G=e=>t=>e*Math.exp(t),V=e=>t=>Math.log(e*t),Y=e=>t=>Math.sign(t)*Math.log1p(Math.abs(t/e)),X=e=>t=>Math.sign(t)*Math.expm1(Math.abs(t))*e,J=e=>t=>t<0?-Math.pow(-t,e):Math.pow(t,e);function Q(e,t,n,r){const i=n(e[0]),a=n(W(e)),o=(a-i)*t;return[r(i-o),r(a-o)]}function K(e,t){return Q(e,t,H,B)}function Z(e,t){var n=Math.sign(e[0]);return Q(e,t,V(n),G(n))}function ee(e,t,n){return Q(e,t,J(n),J(1/n))}function te(e,t,n){return Q(e,t,Y(n),X(n))}function ne(e,t,n,r,i){const a=r(e[0]),o=r(W(e)),s=null!=t?r(t):(a+o)/2;return[i(s+(a-s)*n),i(s+(o-s)*n)]}function re(e,t,n){return ne(e,t,n,H,B)}function ie(e,t,n){const r=Math.sign(e[0]);return ne(e,t,n,V(r),G(r))}function ae(e,t,n,r){return ne(e,t,n,J(r),J(1/r))}function oe(e,t,n,r){return ne(e,t,n,Y(r),X(r))}function se(e){return 1+~~(new Date(e).getMonth()/3)}function ue(e){return 1+~~(new Date(e).getUTCMonth()/3)}function le(e){return null!=e?T(e)?e:[e]:[]}function ce(e,t,n){let r,i=e[0],a=e[1];return a<i&&(r=a,a=i,i=r),r=a-i,r>=n-t?[t,n]:[i=Math.min(Math.max(i,t),n-r),i+r]}function de(e){return"function"==typeof e}function fe(e,t,n){n=n||{},t=le(t)||[];const r=[],i=[],a={},o=n.comparator||pe;return le(e).forEach(((e,o)=>{null!=e&&(r.push("descending"===t[o]?-1:1),i.push(e=de(e)?e:M(e,null,n)),(A(e)||[]).forEach((e=>a[e]=1)))})),0===i.length?null:_(o(i,r),Object.keys(a))}const he=(e,t)=>(e<t||null==e)&&null!=t?-1:(e>t||null==t)&&null!=e?1:(t=t instanceof Date?+t:t,(e=e instanceof Date?+e:e)!==e&&t==t?-1:t!=t&&e==e?1:0),pe=(e,t)=>1===e.length?me(e[0],t[0]):ge(e,t,e.length),me=(e,t)=>function(n,r){return he(e(n),e(r))*t},ge=(e,t,n)=>(t.push(0),function(r,i){let a,o=0,s=-1;for(;0===o&&++s<n;)a=e[s],o=he(a(r),a(i));return o*t[s]});function ye(e){return de(e)?e:()=>e}function ve(e,t){let n;return r=>{n&&clearTimeout(n),n=setTimeout((()=>(t(r),n=null)),e)}}function be(e){for(let t,n,r=1,i=arguments.length;r<i;++r)for(n in t=arguments[r],t)e[n]=t[n];return e}function xe(e,t){let n,r,i,a,o=0;if(e&&(n=e.length))if(null==t){for(r=e[o];o<n&&(null==r||r!=r);r=e[++o]);for(i=a=r;o<n;++o)r=e[o],null!=r&&(r<i&&(i=r),r>a&&(a=r))}else{for(r=t(e[o]);o<n&&(null==r||r!=r);r=t(e[++o]));for(i=a=r;o<n;++o)r=t(e[o]),null!=r&&(r<i&&(i=r),r>a&&(a=r))}return[i,a]}function _e(e,t){const n=e.length;let r,i,a,o,s,u=-1;if(null==t){for(;++u<n;)if(i=e[u],null!=i&&i>=i){r=a=i;break}if(u===n)return[-1,-1];for(o=s=u;++u<n;)i=e[u],null!=i&&(r>i&&(r=i,o=u),a<i&&(a=i,s=u))}else{for(;++u<n;)if(i=t(e[u],u,e),null!=i&&i>=i){r=a=i;break}if(u===n)return[-1,-1];for(o=s=u;++u<n;)i=t(e[u],u,e),null!=i&&(r>i&&(r=i,o=u),a<i&&(a=i,s=u))}return[o,s]}const ke=Object.prototype.hasOwnProperty;function Ae(e,t){return ke.call(e,t)}const we={};function De(e){let t,n={};function r(e){return Ae(n,e)&&n[e]!==we}const i={size:0,empty:0,object:n,has:r,get:e=>r(e)?n[e]:void 0,set(e,t){return r(e)||(++i.size,n[e]===we&&--i.empty),n[e]=t,this},delete(e){return r(e)&&(--i.size,++i.empty,n[e]=we),this},clear(){i.size=i.empty=0,i.object=n={}},test(e){return arguments.length?(t=e,i):t},clean(){const e={};let r=0;for(const i in n){const a=n[i];a===we||t&&t(a)||(e[i]=a,++r)}i.size=r,i.empty=0,i.object=n=e}};return e&&Object.keys(e).forEach((t=>{i.set(t,e[t])})),i}function Ee(e,t,n,r,i,a){if(!n&&0!==n)return a;const o=+n;let s,u=e[0],l=W(e);l<u&&(s=u,u=l,l=s),s=Math.abs(t-u);const c=Math.abs(l-t);return s<c&&s<=o?r:c<=o?i:a}function Ce(e,t,n){const r=e.prototype=Object.create(t.prototype);return Object.defineProperty(r,"constructor",{value:e,writable:!0,enumerable:!0,configurable:!0}),be(r,n)}function Fe(e,t,n,r){let i,a=t[0],o=t[t.length-1];return a>o&&(i=a,a=o,o=i),r=void 0===r||r,((n=void 0===n||n)?a<=e:a<e)&&(r?e<=o:e<o)}function Me(e){return"boolean"==typeof e}function Se(e){return"[object Date]"===Object.prototype.toString.call(e)}function Be(e){return e&&de(e[Symbol.iterator])}function Oe(e){return"number"==typeof e}function Re(e){return"[object RegExp]"===Object.prototype.toString.call(e)}function ze(e){return"string"==typeof e}function $e(e,t,n){e&&(e=t?le(e).map((e=>e.replace(/\\(.)/g,"$1"))):le(e));const r=e&&e.length,i=n&&n.get||w,a=e=>i(t?[e]:F(e));let o;if(r)if(1===r){const t=a(e[0]);o=function(e){return""+t(e)}}else{const t=e.map(a);o=function(e){let n=""+t[0](e),i=0;for(;++i<r;)n+="|"+t[i](e);return n}}else o=function(){return""};return _(o,e,"key")}function qe(e,t){const n=e[0],r=W(e),i=+t;return i?1===i?r:n+i*(r-n):n}function Le(e){let t,n,r;e=+e||1e4;const i=()=>{t={},n={},r=0},a=(i,a)=>(++r>e&&(n=t,t={},r=1),t[i]=a);return i(),{clear:i,has:e=>Ae(t,e)||Ae(n,e),get:e=>Ae(t,e)?t[e]:Ae(n,e)?a(e,n[e]):void 0,set:(e,n)=>Ae(t,e)?t[e]=n:a(e,n)}}function Te(e,t,n,r){const i=t.length,a=n.length;if(!a)return t;if(!i)return n;const o=r||new t.constructor(i+a);let s=0,u=0,l=0;for(;s<i&&u<a;++l)o[l]=e(t[s],n[u])>0?n[u++]:t[s++];for(;s<i;++s,++l)o[l]=t[s];for(;u<a;++u,++l)o[l]=n[u];return o}function Ne(e,t){let n="";for(;--t>=0;)n+=e;return n}function Pe(e,t,n,r){const i=n||" ",a=e+"",o=t-a.length;return o<=0?a:"left"===r?Ne(i,o)+a:"center"===r?Ne(i,~~(o/2))+a+Ne(i,Math.ceil(o/2)):a+Ne(i,o)}function Ue(e){return e&&W(e)-e[0]||0}function je(e){return T(e)?"["+e.map(je)+"]":N(e)||ze(e)?JSON.stringify(e).replace("\u2028","\\u2028").replace("\u2029","\\u2029"):e}function Ie(e){return null==e||""===e?null:!(!e||"false"===e||"0"===e)&&!!e}const We=e=>Oe(e)||Se(e)?e:Date.parse(e);function He(e,t){return t=t||We,null==e||""===e?null:t(e)}function Ge(e){return null==e||""===e?null:e+""}function Ve(e){const t={},n=e.length;for(let r=0;r<n;++r)t[e[r]]=!0;return t}function Ye(e,t,n,r){const i=null!=r?r:"…",a=e+"",o=a.length,s=Math.max(0,t-i.length);return o<=t?a:"left"===n?i+a.slice(o-s):"center"===n?a.slice(0,Math.ceil(s/2))+i+a.slice(o-~~(s/2)):a.slice(0,s)+i}function Xe(e,t,n){if(e)if(t){const r=e.length;for(let i=0;i<r;++i){const r=t(e[i]);r&&n(r,i,e)}}else e.forEach(n)}const Je="year",Qe="quarter",Ke="month",Ze="week",et="date",tt="day",nt="dayofyear",rt="hours",it="minutes",at="seconds",ot="milliseconds",st=[Je,Qe,Ke,Ze,et,tt,nt,rt,it,at,ot],ut=st.reduce(((e,t,n)=>(e[t]=1+n,e)),{});function lt(e){const t=le(e).slice(),n={};t.length||C("Missing time unit."),t.forEach((e=>{Ae(ut,e)?n[e]=1:C(`Invalid time unit: ${e}.`)}));return(n.week||n.day?1:0)+(n.quarter||n.month||n.date?1:0)+(n.dayofyear?1:0)>1&&C(`Incompatible time units: ${e}`),t.sort(((e,t)=>ut[e]-ut[t])),t}const ct={[Je]:"%Y ",[Qe]:"Q%q ",[Ke]:"%b ",[et]:"%d ",[Ze]:"W%U ",[tt]:"%a ",[nt]:"%j ",[rt]:"%H:00",[it]:"00:%M",[at]:":%S",[ot]:".%L","year-month":"%Y-%m ","year-month-date":"%Y-%m-%d ","hours-minutes":"%H:%M"};function dt(e,t){const n=be({},ct,t),r=lt(e),i=r.length;let a,o,s="",u=0;for(u=0;u<i;)for(a=r.length;a>u;--a)if(o=r.slice(u,a).join("-"),null!=n[o]){s+=n[o],u=a;break}return s.trim()}const ft=new Date;function ht(e){return ft.setFullYear(e),ft.setMonth(0),ft.setDate(1),ft.setHours(0,0,0,0),ft}function pt(e){return gt(new Date(e))}function mt(e){return yt(new Date(e))}function gt(e){return a.timeDay.count(ht(e.getFullYear())-1,e)}function yt(e){return a.timeWeek.count(ht(e.getFullYear())-1,e)}function vt(e){return ht(e).getDay()}function bt(e,t,n,r,i,a,o){if(0<=e&&e<100){const s=new Date(-1,t,n,r,i,a,o);return s.setFullYear(e),s}return new Date(e,t,n,r,i,a,o)}function xt(e){return kt(new Date(e))}function _t(e){return At(new Date(e))}function kt(e){const t=Date.UTC(e.getUTCFullYear(),0,1);return a.utcDay.count(t-1,e)}function At(e){const t=Date.UTC(e.getUTCFullYear(),0,1);return a.utcWeek.count(t-1,e)}function wt(e){return ft.setTime(Date.UTC(e,0,1)),ft.getUTCDay()}function Dt(e,t,n,r,i,a,o){if(0<=e&&e<100){const e=new Date(Date.UTC(-1,t,n,r,i,a,o));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(e,t,n,r,i,a,o))}function Et(e,t,n,r,i){const a=t||1,o=W(e),s=(e,t,i)=>function(e,t,n,r){const i=n<=1?e:r?(t,i)=>r+n*Math.floor((e(t,i)-r)/n):(t,r)=>n*Math.floor(e(t,r)/n);return t?(e,n)=>t(i(e,n),n):i}(n[i=i||e],r[i],e===o&&a,t),u=new Date,l=Ve(e),c=l.year?s(Je):ye(2012),d=l.month?s(Ke):l.quarter?s(Qe):O,f=l.week&&l.day?s(tt,1,Ze+tt):l.week?s(Ze,1):l.day?s(tt,1):l.date?s(et,1):l.dayofyear?s(nt,1):R,h=l.hours?s(rt):O,p=l.minutes?s(it):O,m=l.seconds?s(at):O,g=l.milliseconds?s(ot):O;return function(e){u.setTime(+e);const t=c(u);return i(t,d(u),f(u,t),h(u),p(u),m(u),g(u))}}function Ct(e,t,n){return t+7*e-(n+6)%7}const Ft={[Je]:e=>e.getFullYear(),[Qe]:e=>Math.floor(e.getMonth()/3),[Ke]:e=>e.getMonth(),[et]:e=>e.getDate(),[rt]:e=>e.getHours(),[it]:e=>e.getMinutes(),[at]:e=>e.getSeconds(),[ot]:e=>e.getMilliseconds(),[nt]:e=>gt(e),[Ze]:e=>yt(e),[Ze+tt]:(e,t)=>Ct(yt(e),e.getDay(),vt(t)),[tt]:(e,t)=>Ct(1,e.getDay(),vt(t))},Mt={[Qe]:e=>3*e,[Ze]:(e,t)=>Ct(e,0,vt(t))};function St(e,t){return Et(e,t||1,Ft,Mt,bt)}const Bt={[Je]:e=>e.getUTCFullYear(),[Qe]:e=>Math.floor(e.getUTCMonth()/3),[Ke]:e=>e.getUTCMonth(),[et]:e=>e.getUTCDate(),[rt]:e=>e.getUTCHours(),[it]:e=>e.getUTCMinutes(),[at]:e=>e.getUTCSeconds(),[ot]:e=>e.getUTCMilliseconds(),[nt]:e=>kt(e),[Ze]:e=>At(e),[tt]:(e,t)=>Ct(1,e.getUTCDay(),wt(t)),[Ze+tt]:(e,t)=>Ct(At(e),e.getUTCDay(),wt(t))},Ot={[Qe]:e=>3*e,[Ze]:(e,t)=>Ct(e,0,wt(t))};function Rt(e,t){return Et(e,t||1,Bt,Ot,Dt)}const zt={[Je]:a.timeYear,[Qe]:a.timeMonth.every(3),[Ke]:a.timeMonth,[Ze]:a.timeWeek,[et]:a.timeDay,[tt]:a.timeDay,[nt]:a.timeDay,[rt]:a.timeHour,[it]:a.timeMinute,[at]:a.timeSecond,[ot]:a.timeMillisecond},$t={[Je]:a.utcYear,[Qe]:a.utcMonth.every(3),[Ke]:a.utcMonth,[Ze]:a.utcWeek,[et]:a.utcDay,[tt]:a.utcDay,[nt]:a.utcDay,[rt]:a.utcHour,[it]:a.utcMinute,[at]:a.utcSecond,[ot]:a.utcMillisecond};function qt(e){return zt[e]}function Lt(e){return $t[e]}function Tt(e,t,n){return e?e.offset(t,n):void 0}function Nt(e,t,n){return Tt(qt(e),t,n)}function Pt(e,t,n){return Tt(Lt(e),t,n)}function Ut(e,t,n,r){return e?e.range(t,n,r):void 0}function jt(e,t,n,r){return Ut(qt(e),t,n,r)}function It(e,t,n,r){return Ut(Lt(e),t,n,r)}const Wt=1e3,Ht=6e4,Gt=36e5,Vt=864e5,Yt=2592e6,Xt=31536e6,Jt=[Je,Ke,et,rt,it,at,ot],Qt=Jt.slice(0,-1),Kt=Qt.slice(0,-1),Zt=Kt.slice(0,-1),en=Zt.slice(0,-1),tn=[Je,Ke],nn=[Je],rn=[[Qt,1,Wt],[Qt,5,5e3],[Qt,15,15e3],[Qt,30,3e4],[Kt,1,Ht],[Kt,5,3e5],[Kt,15,9e5],[Kt,30,18e5],[Zt,1,Gt],[Zt,3,108e5],[Zt,6,216e5],[Zt,12,432e5],[en,1,Vt],[[Je,Ze],1,6048e5],[tn,1,Yt],[tn,3,7776e6],[nn,1,Xt]];function an(e){const t=e.extent,n=e.maxbins||40,i=Math.abs(Ue(t))/n;let a,o,s=r.bisector((e=>e[2])).right(rn,i);return s===rn.length?(a=nn,o=r.tickStep(t[0]/Xt,t[1]/Xt,n)):s?(s=rn[i/rn[s-1][2]<rn[s][2]/i?s-1:s],a=s[0],o=s[1]):(a=Jt,o=Math.max(r.tickStep(t[0],t[1],n),1)),{units:a,step:o}}function on(e){const t={};return n=>t[n]||(t[n]=e(n))}function sn(e){const t=on(e.format),n=e.formatPrefix;return{format:t,formatPrefix:n,formatFloat(e){const n=i.formatSpecifier(e||",");if(null==n.precision){switch(n.precision=12,n.type){case"%":n.precision-=2;break;case"e":n.precision-=1}return r=t(n),a=t(".1f")(1)[1],e=>{const t=r(e),n=t.indexOf(a);if(n<0)return t;let i=function(e,t){let n,r=e.lastIndexOf("e");if(r>0)return r;for(r=e.length;--r>t;)if(n=e.charCodeAt(r),n>=48&&n<=57)return r+1}(t,n);const o=i<t.length?t.slice(i):"";for(;--i>n;)if("0"!==t[i]){++i;break}return t.slice(0,i)+o}}return t(n);var r,a},formatSpan(e,a,o,s){s=i.formatSpecifier(null==s?",f":s);const u=r.tickStep(e,a,o),l=Math.max(Math.abs(e),Math.abs(a));let c;if(null==s.precision)switch(s.type){case"s":return isNaN(c=i.precisionPrefix(u,l))||(s.precision=c),n(s,l);case"":case"e":case"g":case"p":case"r":isNaN(c=i.precisionRound(u,l))||(s.precision=c-("e"===s.type));break;case"f":case"%":isNaN(c=i.precisionFixed(u))||(s.precision=c-2*("%"===s.type))}return t(s)}}}let un,ln;function cn(){return un=sn({format:i.format,formatPrefix:i.formatPrefix})}function dn(e){return sn(i.formatLocale(e))}function fn(e){return arguments.length?un=dn(e):un}function hn(e,t,n){N(n=n||{})||C(`Invalid time multi-format specifier: ${n}`);const r=t(at),i=t(it),a=t(rt),o=t(et),s=t(Ze),u=t(Ke),l=t(Qe),c=t(Je),d=e(n.milliseconds||".%L"),f=e(n.seconds||":%S"),h=e(n.minutes||"%I:%M"),p=e(n.hours||"%I %p"),m=e(n.date||n.day||"%a %d"),g=e(n.week||"%b %d"),y=e(n.month||"%B"),v=e(n.quarter||"%B"),b=e(n.year||"%Y");return e=>(r(e)<e?d:i(e)<e?f:a(e)<e?h:o(e)<e?p:u(e)<e?s(e)<e?m:g:c(e)<e?l(e)<e?y:v:b)(e)}function pn(e){const t=on(e.format),n=on(e.utcFormat);return{timeFormat:e=>ze(e)?t(e):hn(t,qt,e),utcFormat:e=>ze(e)?n(e):hn(n,Lt,e),timeParse:on(e.parse),utcParse:on(e.utcParse)}}function mn(){return ln=pn({format:o.timeFormat,parse:o.timeParse,utcFormat:o.utcFormat,utcParse:o.utcParse})}function gn(e){return pn(o.timeFormatLocale(e))}function yn(e){return arguments.length?ln=gn(e):ln}cn(),mn();const vn=(e,t)=>be({},e,t);function bn(e,t){const n=e?dn(e):fn(),r=t?gn(t):yn();return vn(n,r)}function xn(e,t){const n=arguments.length;return n&&2!==n&&C("defaultLocale expects either zero or two arguments."),n?vn(fn(e),yn(t)):vn(fn(),yn())}const _n=/^(data:|([A-Za-z]+:)?\/\/)/,kn=/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|file|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,An=/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,wn="file://";async function Dn(e,t){const n=await this.sanitize(e,t),r=n.href;return n.localFile?this.file(r):this.http(r,t)}async function En(e,t){t=be({},this.options,t);const n=this.fileAccess,r={href:null};let i,a,o;const s=kn.test(e.replace(An,""));null!=e&&"string"==typeof e&&s||C("Sanitize failure, invalid URI: "+je(e));const u=_n.test(e);return(o=t.baseURL)&&!u&&(e.startsWith("/")||o.endsWith("/")||(e="/"+e),e=o+e),a=(i=e.startsWith(wn))||"file"===t.mode||"http"!==t.mode&&!u&&n,i?e=e.slice(wn.length):e.startsWith("//")&&("file"===t.defaultProtocol?(e=e.slice(2),a=!0):e=(t.defaultProtocol||"http")+":"+e),Object.defineProperty(r,"localFile",{value:!!a}),r.href=e,t.target&&(r.target=t.target+""),t.rel&&(r.rel=t.rel+""),"image"===t.context&&t.crossOrigin&&(r.crossOrigin=t.crossOrigin+""),r}function Cn(e){return e?t=>new Promise(((n,r)=>{e.readFile(t,((e,t)=>{e?r(e):n(t)}))})):Fn}async function Fn(){C("No file system access.")}function Mn(e){return e?async function(t,n){const r=be({},this.options.http,n),i=n&&n.response,a=await e(t,r);return a.ok?de(a[i])?a[i]():a.text():C(a.status+""+a.statusText)}:Sn}async function Sn(){C("No HTTP fetch method available.")}const Bn=e=>!(Number.isNaN(+e)||e instanceof Date),On={boolean:Ie,integer:H,number:H,date:He,string:Ge,unknown:B},Rn=[e=>"true"===e||"false"===e||!0===e||!1===e,e=>Bn(e)&&Number.isInteger(+e),Bn,e=>!Number.isNaN(Date.parse(e))],zn=["boolean","integer","number","date"];function $n(e,t){if(!e||!e.length)return"unknown";const n=e.length,r=Rn.length,i=Rn.map(((e,t)=>t+1));for(let o,s,u=0,l=0;u<n;++u)for(s=t?e[u][t]:e[u],o=0;o<r;++o)if(i[o]&&(null!=(a=s)&&a==a)&&!Rn[o](s)&&(i[o]=0,++l,l===Rn.length))return"string";var a;return zn[i.reduce(((e,t)=>0===e?t:e),0)-1]}function qn(e,t){return t.reduce(((t,n)=>(t[n]=$n(e,n),t)),{})}function Ln(e){const t=function(t,n){const r={delimiter:e};return Tn(t,n?be(n,r):r)};return t.responseType="text",t}function Tn(e,n){return n.header&&(e=n.header.map(je).join(n.delimiter)+"\n"+e),t.dsvFormat(n.delimiter).parse(e+"")}function Nn(e,t){const n=t&&t.property?M(t.property):B;return!N(e)||(r=e,"function"==typeof Buffer&&de(Buffer.isBuffer)&&Buffer.isBuffer(r))?n(JSON.parse(e)):function(e,t){!T(e)&&Be(e)&&(e=[...e]);return t&&t.copy?JSON.parse(JSON.stringify(e)):e}(n(e),t);var r}Tn.responseType="text",Nn.responseType="json";const Pn={interior:(e,t)=>e!==t,exterior:(e,t)=>e===t};function Un(e,t){let r,i,a,o;return e=Nn(e,t),t&&t.feature?(r=n.feature,a=t.feature):t&&t.mesh?(r=n.mesh,a=t.mesh,o=Pn[t.filter]):C("Missing TopoJSON feature or mesh parameter."),i=(i=e.objects[a])?r(e,i,o):C("Invalid TopoJSON object: "+a),i&&i.features||[i]}Un.responseType="json";const jn={dsv:Tn,csv:Ln(","),tsv:Ln("\t"),json:Nn,topojson:Un};function In(e,t){return arguments.length>1?(jn[e]=t,this):Ae(jn,e)?jn[e]:null}function Wn(e){const t=In(e);return t&&t.responseType||"text"}function Hn(e,t,n,r){const i=In((t=t||{}).type||"json");return i||C("Unknown data format type: "+t.type),e=i(e,t),t.parse&&function(e,t,n,r){if(!e.length)return;const i=yn();n=n||i.timeParse,r=r||i.utcParse;let a,o,s,u,l,c,d=e.columns||Object.keys(e[0]);"auto"===t&&(t=qn(e,d));d=Object.keys(t);const f=d.map((e=>{const i=t[e];let a,o;if(i&&(i.startsWith("date:")||i.startsWith("utc:"))){a=i.split(/:(.+)?/,2),o=a[1],("'"===o[0]&&"'"===o[o.length-1]||'"'===o[0]&&'"'===o[o.length-1])&&(o=o.slice(1,-1));return("utc"===a[0]?r:n)(o)}if(!On[i])throw Error("Illegal format pattern: "+e+":"+i);return On[i]}));for(s=0,l=e.length,c=d.length;s<l;++s)for(a=e[s],u=0;u<c;++u)o=d[u],a[o]=f[u](a[o])}(e,t.parse,n,r),Ae(e,"columns")&&delete e.columns,e}const Gn=function(e,t){return n=>({options:n||{},sanitize:En,load:Dn,fileAccess:!!t,file:Cn(t),http:Mn(e)})}("undefined"!=typeof fetch&&fetch,null);function Vn(e){const t=e||B,n=[],r={};return n.add=e=>{const i=t(e);return r[i]||(r[i]=1,n.push(e)),n},n.remove=e=>{const i=t(e);if(r[i]){r[i]=0;const t=n.indexOf(e);t>=0&&n.splice(t,1)}return n},n}async function Yn(e,t){try{await t(e)}catch(t){e.error(t)}}const Xn=Symbol("vega_id");let Jn=1;function Qn(e){return!(!e||!Kn(e))}function Kn(e){return e[Xn]}function Zn(e,t){return e[Xn]=t,e}function er(e){const t=e===Object(e)?e:{data:e};return Kn(t)?t:Zn(t,Jn++)}function tr(e){return nr(e,er({}))}function nr(e,t){for(const n in e)t[n]=e[n];return t}function rr(e,t){return Zn(t,Kn(e))}function ir(e,t){return e?t?(n,r)=>e(n,r)||Kn(t(n))-Kn(t(r)):(t,n)=>e(t,n)||Kn(t)-Kn(n):null}function ar(e){return e&&e.constructor===or}function or(){const e=[],t=[],n=[],r=[],i=[];let a=null,o=!1;return{constructor:or,insert(t){const n=le(t),r=n.length;for(let t=0;t<r;++t)e.push(n[t]);return this},remove(e){const n=de(e)?r:t,i=le(e),a=i.length;for(let e=0;e<a;++e)n.push(i[e]);return this},modify(e,t,r){const a={field:t,value:ye(r)};return de(e)?(a.filter=e,i.push(a)):(a.tuple=e,n.push(a)),this},encode(e,t){return de(e)?i.push({filter:e,field:t}):n.push({tuple:e,field:t}),this},clean(e){return a=e,this},reflow(){return o=!0,this},pulse(s,u){const l={},c={};let d,f,h,p,m,g;for(d=0,f=u.length;d<f;++d)l[Kn(u[d])]=1;for(d=0,f=t.length;d<f;++d)m=t[d],l[Kn(m)]=-1;for(d=0,f=r.length;d<f;++d)p=r[d],u.forEach((e=>{p(e)&&(l[Kn(e)]=-1)}));for(d=0,f=e.length;d<f;++d)m=e[d],g=Kn(m),l[g]?l[g]=1:s.add.push(er(e[d]));for(d=0,f=u.length;d<f;++d)m=u[d],l[Kn(m)]<0&&s.rem.push(m);function y(e,t,n){n?e[t]=n(e):s.encode=t,o||(c[Kn(e)]=e)}for(d=0,f=n.length;d<f;++d)h=n[d],m=h.tuple,p=h.field,g=l[Kn(m)],g>0&&(y(m,p,h.value),s.modifies(p));for(d=0,f=i.length;d<f;++d)h=i[d],p=h.filter,u.forEach((e=>{p(e)&&l[Kn(e)]>0&&y(e,h.field,h.value)})),s.modifies(h.field);if(o)s.mod=t.length||r.length?u.filter((e=>l[Kn(e)]>0)):u.slice();else for(g in c)s.mod.push(c[g]);return(a||null==a&&(t.length||r.length))&&s.clean(!0),s}}}const sr="_:mod:_";function ur(){Object.defineProperty(this,sr,{writable:!0,value:{}})}ur.prototype={set(e,t,n,r){const i=this,a=i[e],o=i[sr];return null!=t&&t>=0?(a[t]!==n||r)&&(a[t]=n,o[t+":"+e]=-1,o[e]=-1):(a!==n||r)&&(i[e]=n,o[e]=T(n)?1+n.length:-1),i},modified(e,t){const n=this[sr];if(!arguments.length){for(const e in n)if(n[e])return!0;return!1}if(T(e)){for(let t=0;t<e.length;++t)if(n[e[t]])return!0;return!1}return null!=t&&t>=0?t+1<n[e]||!!n[t+":"+e]:!!n[e]},clear(){return this[sr]={},this}};let lr=0;const cr=new ur;function dr(e,t,n,r){this.id=++lr,this.value=e,this.stamp=-1,this.rank=-1,this.qrank=-1,this.flags=0,t&&(this._update=t),n&&this.parameters(n,r)}function fr(e){return function(t){const n=this.flags;return 0===arguments.length?!!(n&e):(this.flags=t?n|e:n&~e,this)}}dr.prototype={targets(){return this._targets||(this._targets=Vn(S))},set(e){return this.value!==e?(this.value=e,1):0},skip:fr(1),modified:fr(2),parameters(e,t,n){t=!1!==t;const r=this._argval=this._argval||new ur,i=this._argops=this._argops||[],a=[];let o,s,u,l;const c=(e,n,o)=>{o instanceof dr?(o!==this&&(t&&o.targets().add(this),a.push(o)),i.push({op:o,name:e,index:n})):r.set(e,n,o)};for(o in e)if(s=e[o],"pulse"===o)le(s).forEach((e=>{e instanceof dr?e!==this&&(e.targets().add(this),a.push(e)):C("Pulse parameters must be operator instances.")})),this.source=s;else if(T(s))for(r.set(o,-1,Array(u=s.length)),l=0;l<u;++l)c(o,l,s[l]);else c(o,-1,s);return this.marshall().clear(),n&&(i.initonly=!0),a},marshall(e){const t=this._argval||cr,n=this._argops;let r,i,a,o;if(n){const s=n.length;for(i=0;i<s;++i)r=n[i],a=r.op,o=a.modified()&&a.stamp===e,t.set(r.name,r.index,a.value,o);if(n.initonly){for(i=0;i<s;++i)r=n[i],r.op.targets().remove(this);this._argops=null,this._update=null}}return t},detach(){const e=this._argops;let t,n,r,i;if(e)for(t=0,n=e.length;t<n;++t)r=e[t],i=r.op,i._targets&&i._targets.remove(this);this.pulse=null,this.source=null},evaluate(e){const t=this._update;if(t){const n=this.marshall(e.stamp),r=t.call(this,n,e);if(n.clear(),r!==this.value)this.value=r;else if(!this.modified())return e.StopPropagation}},run(e){if(e.stamp<this.stamp)return e.StopPropagation;let t;return this.skip()?(this.skip(!1),t=0):t=this.evaluate(e),this.pulse=t||e}};let hr=0;function pr(e,t,n){this.id=++hr,this.value=null,n&&(this.receive=n),e&&(this._filter=e),t&&(this._apply=t)}function mr(e,t,n){return new pr(e,t,n)}pr.prototype={_filter:z,_apply:B,targets(){return this._targets||(this._targets=Vn(S))},consume(e){return arguments.length?(this._consume=!!e,this):!!this._consume},receive(e){if(this._filter(e)){const t=this.value=this._apply(e),n=this._targets,r=n?n.length:0;for(let e=0;e<r;++e)n[e].receive(t);this._consume&&(e.preventDefault(),e.stopPropagation())}},filter(e){const t=mr(e);return this.targets().add(t),t},apply(e){const t=mr(null,e);return this.targets().add(t),t},merge(){const e=mr();this.targets().add(e);for(let t=0,n=arguments.length;t<n;++t)arguments[t].targets().add(e);return e},throttle(e){let t=-1;return this.filter((()=>{const n=Date.now();return n-t>e?(t=n,1):0}))},debounce(e){const t=mr();return this.targets().add(mr(null,null,ve(e,(e=>{const n=e.dataflow;t.receive(e),n&&n.run&&n.run()})))),t},between(e,t){let n=!1;return e.targets().add(mr(null,null,(()=>n=!0))),t.targets().add(mr(null,null,(()=>n=!1))),this.filter((()=>n))},detach(){this._filter=z,this._targets=null}};const gr={skip:!0};function yr(e,t,n,r,i,a){const o=be({},a,gr);let s,u;de(n)||(n=ye(n)),void 0===r?s=t=>e.touch(n(t)):de(r)?(u=new dr(null,r,i,!1),s=t=>{u.evaluate(t);const r=n(t),i=u.value;ar(i)?e.pulse(r,i,a):e.update(r,i,o)}):s=t=>e.update(n(t),r,o),t.apply(s)}function vr(e,t,n,r,i,a){if(void 0===r)t.targets().add(n);else{const o=a||{},s=new dr(null,function(e,t){return t=de(t)?t:ye(t),e?function(n,r){const i=t(n,r);return e.skip()||(e.skip(i!==this.value).value=i),i}:t}(n,r),i,!1);s.modified(o.force),s.rank=t.rank,t.targets().add(s),n&&(s.skip(!0),s.value=n.value,s.targets().add(n),e.connect(n,[s]))}}const br={};function xr(e,t,n){this.dataflow=e,this.stamp=null==t?-1:t,this.add=[],this.rem=[],this.mod=[],this.fields=null,this.encode=n||null}function _r(e,t){const n=[];return Xe(e,t,(e=>n.push(e))),n}function kr(e,t){const n={};return e.visit(t,(e=>{n[Kn(e)]=1})),e=>n[Kn(e)]?null:e}function Ar(e,t){return e?(n,r)=>e(n,r)&&t(n,r):t}function wr(e,t,n,r){const i=this;let a=0;this.dataflow=e,this.stamp=t,this.fields=null,this.encode=r||null,this.pulses=n;for(const e of n)if(e.stamp===t){if(e.fields){const t=i.fields||(i.fields={});for(const n in e.fields)t[n]=1}e.changed(i.ADD)&&(a|=i.ADD),e.changed(i.REM)&&(a|=i.REM),e.changed(i.MOD)&&(a|=i.MOD)}this.changes=a}function Dr(e){return e.error("Dataflow already running. Use runAsync() to chain invocations."),e}xr.prototype={StopPropagation:br,ADD:1,REM:2,MOD:4,ADD_REM:3,ADD_MOD:5,ALL:7,REFLOW:8,SOURCE:16,NO_SOURCE:32,NO_FIELDS:64,fork(e){return new xr(this.dataflow).init(this,e)},clone(){const e=this.fork(7);return e.add=e.add.slice(),e.rem=e.rem.slice(),e.mod=e.mod.slice(),e.source&&(e.source=e.source.slice()),e.materialize(23)},addAll(){let e=this;return!e.source||e.add===e.rem||!e.rem.length&&e.source.length===e.add.length||(e=new xr(this.dataflow).init(this),e.add=e.source,e.rem=[]),e},init(e,t){const n=this;return n.stamp=e.stamp,n.encode=e.encode,!e.fields||64&t||(n.fields=e.fields),1&t?(n.addF=e.addF,n.add=e.add):(n.addF=null,n.add=[]),2&t?(n.remF=e.remF,n.rem=e.rem):(n.remF=null,n.rem=[]),4&t?(n.modF=e.modF,n.mod=e.mod):(n.modF=null,n.mod=[]),32&t?(n.srcF=null,n.source=null):(n.srcF=e.srcF,n.source=e.source,e.cleans&&(n.cleans=e.cleans)),n},runAfter(e){this.dataflow.runAfter(e)},changed(e){const t=e||7;return 1&t&&this.add.length||2&t&&this.rem.length||4&t&&this.mod.length},reflow(e){if(e)return this.fork(7).reflow();const t=this.add.length,n=this.source&&this.source.length;return n&&n!==t&&(this.mod=this.source,t&&this.filter(4,kr(this,1))),this},clean(e){return arguments.length?(this.cleans=!!e,this):this.cleans},modifies(e){const t=this.fields||(this.fields={});return T(e)?e.forEach((e=>t[e]=!0)):t[e]=!0,this},modified(e,t){const n=this.fields;return!(!t&&!this.mod.length||!n)&&(arguments.length?T(e)?e.some((e=>n[e])):n[e]:!!n)},filter(e,t){const n=this;return 1&e&&(n.addF=Ar(n.addF,t)),2&e&&(n.remF=Ar(n.remF,t)),4&e&&(n.modF=Ar(n.modF,t)),16&e&&(n.srcF=Ar(n.srcF,t)),n},materialize(e){const t=this;return 1&(e=e||7)&&t.addF&&(t.add=_r(t.add,t.addF),t.addF=null),2&e&&t.remF&&(t.rem=_r(t.rem,t.remF),t.remF=null),4&e&&t.modF&&(t.mod=_r(t.mod,t.modF),t.modF=null),16&e&&t.srcF&&(t.source=t.source.filter(t.srcF),t.srcF=null),t},visit(e,t){const n=this,r=t;if(16&e)return Xe(n.source,n.srcF,r),n;1&e&&Xe(n.add,n.addF,r),2&e&&Xe(n.rem,n.remF,r),4&e&&Xe(n.mod,n.modF,r);const i=n.source;if(8&e&&i){const e=n.add.length+n.mod.length;e===i.length||Xe(i,e?kr(n,5):n.srcF,r)}return n}},Ce(wr,xr,{fork(e){const t=new xr(this.dataflow).init(this,e&this.NO_FIELDS);return void 0!==e&&(e&t.ADD&&this.visit(t.ADD,(e=>t.add.push(e))),e&t.REM&&this.visit(t.REM,(e=>t.rem.push(e))),e&t.MOD&&this.visit(t.MOD,(e=>t.mod.push(e)))),t},changed(e){return this.changes&e},modified(e){const t=this,n=t.fields;return n&&t.changes&t.MOD?T(e)?e.some((e=>n[e])):n[e]:0},filter(){C("MultiPulse does not support filtering.")},materialize(){C("MultiPulse does not support materialization.")},visit(e,t){const n=this,r=n.pulses,i=r.length;let a=0;if(e&n.SOURCE)for(;a<i;++a)r[a].visit(e,t);else for(;a<i;++a)r[a].stamp===n.stamp&&r[a].visit(e,t);return n}});const Er={skip:!1,force:!1};function Cr(e){let t=[];return{clear:()=>t=[],size:()=>t.length,peek:()=>t[0],push:n=>(t.push(n),Fr(t,0,t.length-1,e)),pop:()=>{const n=t.pop();let r;return t.length?(r=t[0],t[0]=n,function(e,t,n){const r=t,i=e.length,a=e[t];let o,s=1+(t<<1);for(;s<i;)o=s+1,o<i&&n(e[s],e[o])>=0&&(s=o),e[t]=e[s],s=1+((t=s)<<1);e[t]=a,Fr(e,r,t,n)}(t,0,e)):r=n,r}}}function Fr(e,t,n,r){let i,a;const o=e[n];for(;n>t&&(a=n-1>>1,i=e[a],r(o,i)<0);)e[n]=i,n=a;return e[n]=o}function Mr(){this.logger(L()),this.logLevel(1),this._clock=0,this._rank=0,this._locale=xn();try{this._loader=Gn()}catch(e){}this._touched=Vn(S),this._input={},this._pulse=null,this._heap=Cr(((e,t)=>e.qrank-t.qrank)),this._postrun=[]}function Sr(e){return function(){return this._log[e].apply(this,arguments)}}function Br(e,t){dr.call(this,e,null,t)}Mr.prototype={stamp(){return this._clock},loader(e){return arguments.length?(this._loader=e,this):this._loader},locale(e){return arguments.length?(this._locale=e,this):this._locale},logger(e){return arguments.length?(this._log=e,this):this._log},error:Sr("error"),warn:Sr("warn"),info:Sr("info"),debug:Sr("debug"),logLevel:Sr("level"),cleanThreshold:1e4,add:function(e,t,n,r){let i,a=1;return e instanceof dr?i=e:e&&e.prototype instanceof dr?i=new e:de(e)?i=new dr(null,e):(a=0,i=new dr(e,t)),this.rank(i),a&&(r=n,n=t),n&&this.connect(i,i.parameters(n,r)),this.touch(i),i},connect:function(e,t){const n=e.rank,r=t.length;for(let i=0;i<r;++i)if(n<t[i].rank)return void this.rerank(e)},rank:function(e){e.rank=++this._rank},rerank:function(e){const t=[e];let n,r,i;for(;t.length;)if(this.rank(n=t.pop()),r=n._targets)for(i=r.length;--i>=0;)t.push(n=r[i]),n===e&&C("Cycle detected in dataflow graph.")},pulse:function(e,t,n){this.touch(e,n||Er);const r=new xr(this,this._clock+(this._pulse?0:1)),i=e.pulse&&e.pulse.source||[];return r.target=e,this._input[e.id]=t.pulse(r,i),this},touch:function(e,t){const n=t||Er;return this._pulse?this._enqueue(e):this._touched.add(e),n.skip&&e.skip(!0),this},update:function(e,t,n){const r=n||Er;return(e.set(t)||r.force)&&this.touch(e,r),this},changeset:or,ingest:function(e,t,n){return t=this.parse(t,n),this.pulse(e,this.changeset().insert(t))},parse:function(e,t){const n=this.locale();return Hn(e,t,n.timeParse,n.utcParse)},preload:async function(e,t,n){const r=this,i=r._pending||function(e){let t;const n=new Promise((e=>t=e));return n.requests=0,n.done=()=>{0==--n.requests&&(e._pending=null,t(e))},e._pending=n}(r);i.requests+=1;const a=await r.request(t,n);return r.pulse(e,r.changeset().remove(z).insert(a.data||[])),i.done(),a},request:async function(e,t){const n=this;let r,i=0;try{r=await n.loader().load(e,{context:"dataflow",response:Wn(t&&t.type)});try{r=n.parse(r,t)}catch(t){i=-2,n.warn("Data ingestion failed",e,t)}}catch(t){i=-1,n.warn("Loading failed",e,t)}return{data:r,status:i}},events:function(e,t,n,r){const i=this,a=mr(n,r),o=function(e){e.dataflow=i;try{a.receive(e)}catch(e){i.error(e)}finally{i.run()}};let s;s="string"==typeof e&&"undefined"!=typeof document?document.querySelectorAll(e):le(e);const u=s.length;for(let e=0;e<u;++e)s[e].addEventListener(t,o);return a},on:function(e,t,n,r,i){return(e instanceof dr?vr:yr)(this,e,t,n,r,i),this},evaluate:async function(e,t,n){const r=this,i=[];if(r._pulse)return Dr(r);if(r._pending&&await r._pending,t&&await Yn(r,t),!r._touched.length)return r.debug("Dataflow invoked, but nothing to do."),r;const a=++r._clock;r._pulse=new xr(r,a,e),r._touched.forEach((e=>r._enqueue(e,!0))),r._touched=Vn(S);let o,s,u,l=0;try{for(;r._heap.size()>0;)o=r._heap.pop(),o.rank===o.qrank?(s=o.run(r._getPulse(o,e)),s.then?s=await s:s.async&&(i.push(s.async),s=br),s!==br&&o._targets&&o._targets.forEach((e=>r._enqueue(e))),++l):r._enqueue(o,!0)}catch(e){r._heap.clear(),u=e}if(r._input={},r._pulse=null,r.debug(`Pulse ${a}: ${l} operators`),u&&(r._postrun=[],r.error(u)),r._postrun.length){const e=r._postrun.sort(((e,t)=>t.priority-e.priority));r._postrun=[];for(let t=0;t<e.length;++t)await Yn(r,e[t].callback)}return n&&await Yn(r,n),i.length&&Promise.all(i).then((e=>r.runAsync(null,(()=>{e.forEach((e=>{try{e(r)}catch(e){r.error(e)}}))})))),r},run:function(e,t,n){return this._pulse?Dr(this):(this.evaluate(e,t,n),this)},runAsync:async function(e,t,n){for(;this._running;)await this._running;const r=()=>this._running=null;return(this._running=this.evaluate(e,t,n)).then(r,r),this._running},runAfter:function(e,t,n){if(this._pulse||t)this._postrun.push({priority:n||0,callback:e});else try{e(this)}catch(e){this.error(e)}},_enqueue:function(e,t){const n=e.stamp<this._clock;n&&(e.stamp=this._clock),(n||t)&&(e.qrank=e.rank,this._heap.push(e))},_getPulse:function(e,t){const n=e.source,r=this._clock;return n&&T(n)?new wr(this,r,n.map((e=>e.pulse)),t):this._input[e.id]||function(e,t){if(t&&t.stamp===e.stamp)return t;e=e.fork(),t&&t!==br&&(e.source=t.source);return e}(this._pulse,n&&n.pulse)}},Ce(Br,dr,{run(e){if(e.stamp<this.stamp)return e.StopPropagation;let t;return this.skip()?this.skip(!1):t=this.evaluate(e),t=t||e,t.then?t=t.then((e=>this.pulse=e)):t!==e.StopPropagation&&(this.pulse=t),t},evaluate(e){const t=this.marshall(e.stamp),n=this.transform(t,e);return t.clear(),n},transform(){}});const Or={};function Rr(e){const t=zr(e);return t&&t.Definition||null}function zr(e){return e=e&&e.toLowerCase(),Ae(Or,e)?Or[e]:null}function*$r(e,t){if(null==t)for(let t of e)null!=t&&""!==t&&(t=+t)>=t&&(yield t);else{let n=-1;for(let r of e)r=t(r,++n,e),null!=r&&""!==r&&(r=+r)>=r&&(yield r)}}function qr(e,t,n){const i=Float64Array.from($r(e,n));return i.sort(r.ascending),t.map((e=>r.quantileSorted(i,e)))}function Lr(e,t){return qr(e,[.25,.5,.75],t)}function Tr(e,t){const n=e.length,i=r.deviation(e,t),a=Lr(e,t),o=(a[2]-a[0])/1.34;return 1.06*(Math.min(i,o)||i||Math.abs(a[0])||1)*Math.pow(n,-.2)}function Nr(e){const t=e.maxbins||20,n=e.base||10,r=Math.log(n),i=e.divide||[5,2];let a,o,s,u,l,c,d=e.extent[0],f=e.extent[1];const h=e.span||f-d||Math.abs(d)||1;if(e.step)a=e.step;else if(e.steps){for(u=h/t,l=0,c=e.steps.length;l<c&&e.steps[l]<u;++l);a=e.steps[Math.max(0,l-1)]}else{for(o=Math.ceil(Math.log(t)/r),s=e.minstep||0,a=Math.max(s,Math.pow(n,Math.round(Math.log(h)/r)-o));Math.ceil(h/a)>t;)a*=n;for(l=0,c=i.length;l<c;++l)u=a/i[l],u>=s&&h/u<=t&&(a=u)}u=Math.log(a);const p=u>=0?0:1+~~(-u/r),m=Math.pow(n,-p-1);return(e.nice||void 0===e.nice)&&(u=Math.floor(d/a+m)*a,d=d<u?u-a:u,f=Math.ceil(f/a)*a),{start:d,stop:f===d?d+a:f,step:a}}function Pr(t,n,i,a){if(!t.length)return[void 0,void 0];const o=Float64Array.from($r(t,a)),s=o.length,u=n;let l,c,d,f;for(d=0,f=Array(u);d<u;++d){for(l=0,c=0;c<s;++c)l+=o[~~(e.random()*s)];f[d]=l/s}return f.sort(r.ascending),[r.quantile(f,i/2),r.quantile(f,1-i/2)]}function Ur(e,t,n,r){r=r||(e=>e);const i=e.length,a=new Float64Array(i);let o,s=0,u=1,l=r(e[0]),c=l,d=l+t;for(;u<i;++u){if(o=r(e[u]),o>=d){for(c=(l+c)/2;s<u;++s)a[s]=c;d=o+t,l=o}c=o}for(c=(l+c)/2;s<u;++s)a[s]=c;return n?function(e,t){const n=e.length;let r,i,a=0,o=1;for(;e[a]===e[o];)++o;for(;o<n;){for(r=o+1;e[o]===e[r];)++r;if(e[o]-e[o-1]<t){for(i=o+(a+r-o-o>>1);i<o;)e[i++]=e[o];for(;i>o;)e[i--]=e[a]}a=o,o=r}return e}(a,t+t/4):a}e.random=Math.random;const jr=Math.sqrt(2*Math.PI),Ir=Math.SQRT2;let Wr=NaN;function Hr(t,n){t=t||0,n=null==n?1:n;let r,i,a=0,o=0;if(Wr==Wr)a=Wr,Wr=NaN;else{do{a=2*e.random()-1,o=2*e.random()-1,r=a*a+o*o}while(0===r||r>1);i=Math.sqrt(-2*Math.log(r)/r),a*=i,Wr=o*i}return t+a*n}function Gr(e,t,n){const r=(e-(t||0))/(n=null==n?1:n);return Math.exp(-.5*r*r)/(n*jr)}function Vr(e,t,n){const r=(e-(t=t||0))/(n=null==n?1:n),i=Math.abs(r);let a;if(i>37)a=0;else{const e=Math.exp(-i*i/2);let t;i<7.07106781186547?(t=.0352624965998911*i+.700383064443688,t=t*i+6.37396220353165,t=t*i+33.912866078383,t=t*i+112.079291497871,t=t*i+221.213596169931,t=t*i+220.206867912376,a=e*t,t=.0883883476483184*i+1.75566716318264,t=t*i+16.064177579207,t=t*i+86.7807322029461,t=t*i+296.564248779674,t=t*i+637.333633378831,t=t*i+793.826512519948,t=t*i+440.413735824752,a/=t):(t=i+.65,t=i+4/t,t=i+3/t,t=i+2/t,t=i+1/t,a=e/t/2.506628274631)}return r>0?1-a:a}function Yr(e,t,n){return e<0||e>1?NaN:(t||0)+(null==n?1:n)*Ir*function(e){let t,n=-Math.log((1-e)*(1+e));n<6.25?(n-=3.125,t=-364441206401782e-35,t=t*n-16850591381820166e-35,t=128584807152564e-32+t*n,t=11157877678025181e-33+t*n,t=t*n-1333171662854621e-31,t=20972767875968562e-33+t*n,t=6637638134358324e-30+t*n,t=t*n-4054566272975207e-29,t=t*n-8151934197605472e-29,t=26335093153082323e-28+t*n,t=t*n-12975133253453532e-27,t=t*n-5415412054294628e-26,t=1.0512122733215323e-9+t*n,t=t*n-4.112633980346984e-9,t=t*n-2.9070369957882005e-8,t=4.2347877827932404e-7+t*n,t=t*n-13654692000834679e-22,t=t*n-13882523362786469e-21,t=.00018673420803405714+t*n,t=t*n-.000740702534166267,t=t*n-.006033670871430149,t=.24015818242558962+t*n,t=1.6536545626831027+t*n):n<16?(n=Math.sqrt(n)-3.25,t=2.2137376921775787e-9,t=9.075656193888539e-8+t*n,t=t*n-2.7517406297064545e-7,t=1.8239629214389228e-8+t*n,t=15027403968909828e-22+t*n,t=t*n-4013867526981546e-21,t=29234449089955446e-22+t*n,t=12475304481671779e-21+t*n,t=t*n-47318229009055734e-21,t=6828485145957318e-20+t*n,t=24031110387097894e-21+t*n,t=t*n-.0003550375203628475,t=.0009532893797373805+t*n,t=t*n-.0016882755560235047,t=.002491442096107851+t*n,t=t*n-.003751208507569241,t=.005370914553590064+t*n,t=1.0052589676941592+t*n,t=3.0838856104922208+t*n):Number.isFinite(n)?(n=Math.sqrt(n)-5,t=-27109920616438573e-27,t=t*n-2.555641816996525e-10,t=1.5076572693500548e-9+t*n,t=t*n-3.789465440126737e-9,t=7.61570120807834e-9+t*n,t=t*n-1.496002662714924e-8,t=2.914795345090108e-8+t*n,t=t*n-6.771199775845234e-8,t=2.2900482228026655e-7+t*n,t=t*n-9.9298272942317e-7,t=4526062597223154e-21+t*n,t=t*n-1968177810553167e-20,t=7599527703001776e-20+t*n,t=t*n-.00021503011930044477,t=t*n-.00013871931833623122,t=1.0103004648645344+t*n,t=4.849906401408584+t*n):t=1/0;return t*e}(2*e-1)}function Xr(e,t){let n,r;const i={mean(e){return arguments.length?(n=e||0,i):n},stdev(e){return arguments.length?(r=null==e?1:e,i):r},sample:()=>Hr(n,r),pdf:e=>Gr(e,n,r),cdf:e=>Vr(e,n,r),icdf:e=>Yr(e,n,r)};return i.mean(e).stdev(t)}function Jr(t,n){const r=Xr();let i=0;const a={data(e){return arguments.length?(t=e,i=e?e.length:0,a.bandwidth(n)):t},bandwidth(e){return arguments.length?(!(n=e)&&t&&(n=Tr(t)),a):n},sample:()=>t[~~(e.random()*i)]+n*r.sample(),pdf(e){let a=0,o=0;for(;o<i;++o)a+=r.pdf((e-t[o])/n);return a/n/i},cdf(e){let a=0,o=0;for(;o<i;++o)a+=r.cdf((e-t[o])/n);return a/i},icdf(){throw Error("KDE icdf not supported.")}};return a.data(t)}function Qr(e,t){return e=e||0,t=null==t?1:t,Math.exp(e+Hr()*t)}function Kr(e,t,n){if(e<=0)return 0;t=t||0,n=null==n?1:n;const r=(Math.log(e)-t)/n;return Math.exp(-.5*r*r)/(n*jr*e)}function Zr(e,t,n){return Vr(Math.log(e),t,n)}function ei(e,t,n){return Math.exp(Yr(e,t,n))}function ti(e,t){let n,r;const i={mean(e){return arguments.length?(n=e||0,i):n},stdev(e){return arguments.length?(r=null==e?1:e,i):r},sample:()=>Qr(n,r),pdf:e=>Kr(e,n,r),cdf:e=>Zr(e,n,r),icdf:e=>ei(e,n,r)};return i.mean(e).stdev(t)}function ni(t,n){let r,i=0;const a={weights(e){return arguments.length?(r=function(e){const t=[];let n,r=0;for(n=0;n<i;++n)r+=t[n]=null==e[n]?1:+e[n];for(n=0;n<i;++n)t[n]/=r;return t}(n=e||[]),a):n},distributions(e){return arguments.length?(e?(i=e.length,t=e):(i=0,t=[]),a.weights(n)):t},sample(){const n=e.random();let a=t[i-1],o=r[0],s=0;for(;s<i-1;o+=r[++s])if(n<o){a=t[s];break}return a.sample()},pdf(e){let n=0,a=0;for(;a<i;++a)n+=r[a]*t[a].pdf(e);return n},cdf(e){let n=0,a=0;for(;a<i;++a)n+=r[a]*t[a].cdf(e);return n},icdf(){throw Error("Mixture icdf not supported.")}};return a.distributions(t).weights(n)}function ri(t,n){return null==n&&(n=null==t?1:t,t=0),t+(n-t)*e.random()}function ii(e,t,n){return null==n&&(n=null==t?1:t,t=0),e>=t&&e<=n?1/(n-t):0}function ai(e,t,n){return null==n&&(n=null==t?1:t,t=0),e<t?0:e>n?1:(e-t)/(n-t)}function oi(e,t,n){return null==n&&(n=null==t?1:t,t=0),e>=0&&e<=1?t+e*(n-t):NaN}function si(e,t){let n,r;const i={min(e){return arguments.length?(n=e||0,i):n},max(e){return arguments.length?(r=null==e?1:e,i):r},sample:()=>ri(n,r),pdf:e=>ii(e,n,r),cdf:e=>ai(e,n,r),icdf:e=>oi(e,n,r)};return null==t&&(t=null==e?1:e,e=0),i.min(e).max(t)}function ui(e,t,n,r){const i=r-e*e,a=Math.abs(i)<1e-24?0:(n-e*t)/i;return[t-a*e,a]}function li(e,t,n,r){e=e.filter((e=>{let r=t(e),i=n(e);return null!=r&&(r=+r)>=r&&null!=i&&(i=+i)>=i})),r&&e.sort(((e,n)=>t(e)-t(n)));const i=e.length,a=new Float64Array(i),o=new Float64Array(i);let s,u,l,c=0,d=0,f=0;for(l of e)a[c]=s=+t(l),o[c]=u=+n(l),++c,d+=(s-d)/c,f+=(u-f)/c;for(c=0;c<i;++c)a[c]-=d,o[c]-=f;return[a,o,d,f]}function ci(e,t,n,r){let i,a,o=-1;for(const s of e)i=t(s),a=n(s),null!=i&&(i=+i)>=i&&null!=a&&(a=+a)>=a&&r(i,a,++o)}function di(e,t,n,r,i){let a=0,o=0;return ci(e,t,n,((e,t)=>{const n=t-i(e),s=t-r;a+=n*n,o+=s*s})),1-a/o}function fi(e,t,n){let r=0,i=0,a=0,o=0,s=0;ci(e,t,n,((e,t)=>{++s,r+=(e-r)/s,i+=(t-i)/s,a+=(e*t-a)/s,o+=(e*e-o)/s}));const u=ui(r,i,a,o),l=e=>u[0]+u[1]*e;return{coef:u,predict:l,rSquared:di(e,t,n,i,l)}}function hi(e,t,n){let r=0,i=0,a=0,o=0,s=0;ci(e,t,n,((e,t)=>{++s,e=Math.log(e),r+=(e-r)/s,i+=(t-i)/s,a+=(e*t-a)/s,o+=(e*e-o)/s}));const u=ui(r,i,a,o),l=e=>u[0]+u[1]*Math.log(e);return{coef:u,predict:l,rSquared:di(e,t,n,i,l)}}function pi(e,t,n){const[r,i,a,o]=li(e,t,n);let s,u,l,c=0,d=0,f=0,h=0,p=0;ci(e,t,n,((e,t)=>{s=r[p++],u=Math.log(t),l=s*t,c+=(t*u-c)/p,d+=(l-d)/p,f+=(l*u-f)/p,h+=(s*l-h)/p}));const[m,g]=ui(d/o,c/o,f/o,h/o),y=e=>Math.exp(m+g*(e-a));return{coef:[Math.exp(m-g*a),g],predict:y,rSquared:di(e,t,n,o,y)}}function mi(e,t,n){let r=0,i=0,a=0,o=0,s=0,u=0;ci(e,t,n,((e,t)=>{const n=Math.log(e),l=Math.log(t);++u,r+=(n-r)/u,i+=(l-i)/u,a+=(n*l-a)/u,o+=(n*n-o)/u,s+=(t-s)/u}));const l=ui(r,i,a,o),c=e=>l[0]*Math.pow(e,l[1]);return l[0]=Math.exp(l[0]),{coef:l,predict:c,rSquared:di(e,t,n,s,c)}}function gi(e,t,n){const[r,i,a,o]=li(e,t,n),s=r.length;let u,l,c,d,f=0,h=0,p=0,m=0,g=0;for(u=0;u<s;)l=r[u],c=i[u++],d=l*l,f+=(d-f)/u,h+=(d*l-h)/u,p+=(d*d-p)/u,m+=(l*c-m)/u,g+=(d*c-g)/u;const y=p-f*f,v=f*y-h*h,b=(g*f-m*h)/v,x=(m*y-g*h)/v,_=-b*f,k=e=>b*(e-=a)*e+x*e+_+o;return{coef:[_-x*a+b*a*a+o,x-2*b*a,b],predict:k,rSquared:di(e,t,n,o,k)}}function yi(e,t,n,r){if(1===r)return fi(e,t,n);if(2===r)return gi(e,t,n);const[i,a,o,s]=li(e,t,n),u=i.length,l=[],c=[],d=r+1;let f,h,p,m,g;for(f=0;f<d;++f){for(p=0,m=0;p<u;++p)m+=Math.pow(i[p],f)*a[p];for(l.push(m),g=new Float64Array(d),h=0;h<d;++h){for(p=0,m=0;p<u;++p)m+=Math.pow(i[p],f+h);g[h]=m}c.push(g)}c.push(l);const y=function(e){const t=e.length-1,n=[];let r,i,a,o,s;for(r=0;r<t;++r){for(o=r,i=r+1;i<t;++i)Math.abs(e[r][i])>Math.abs(e[r][o])&&(o=i);for(a=r;a<t+1;++a)s=e[a][r],e[a][r]=e[a][o],e[a][o]=s;for(i=r+1;i<t;++i)for(a=t;a>=r;a--)e[a][i]-=e[a][r]*e[r][i]/e[r][r]}for(i=t-1;i>=0;--i){for(s=0,a=i+1;a<t;++a)s+=e[a][i]*n[a];n[i]=(e[t][i]-s)/e[i][i]}return n}(c),v=e=>{e-=o;let t=s+y[0]+y[1]*e+y[2]*e*e;for(f=3;f<d;++f)t+=y[f]*Math.pow(e,f);return t};return{coef:vi(d,y,-o,s),predict:v,rSquared:di(e,t,n,s,v)}}function vi(e,t,n,r){const i=Array(e);let a,o,s,u;for(a=0;a<e;++a)i[a]=0;for(a=e-1;a>=0;--a)for(s=t[a],u=1,i[a]+=s,o=1;o<=a;++o)u*=(a+1-o)/o,i[a-o]+=s*Math.pow(n,o)*u;return i[0]+=r,i}function bi(e,t,n,i){const[a,o,s,u]=li(e,t,n,!0),l=a.length,c=Math.max(2,~~(i*l)),d=new Float64Array(l),f=new Float64Array(l),h=new Float64Array(l).fill(1);for(let e=-1;++e<=2;){const t=[0,c-1];for(let e=0;e<l;++e){const n=a[e],r=t[0],i=t[1],s=n-a[r]>a[i]-n?r:i;let u=0,l=0,c=0,p=0,m=0;const g=1/Math.abs(a[s]-n||1);for(let e=r;e<=i;++e){const t=a[e],r=o[e],i=xi(Math.abs(n-t)*g)*h[e],s=t*i;u+=i,l+=s,c+=r*i,p+=r*s,m+=t*s}const[y,v]=ui(l/u,c/u,p/u,m/u);d[e]=y+v*n,f[e]=Math.abs(o[e]-d[e]),_i(a,e+1,t)}if(2===e)break;const n=r.median(f);if(Math.abs(n)<1e-12)break;for(let e,t,r=0;r<l;++r)e=f[r]/(6*n),h[r]=e>=1?1e-12:(t=1-e*e)*t}return function(e,t,n,r){const i=e.length,a=[];let o,s=0,u=0,l=[];for(;s<i;++s)o=e[s]+n,l[0]===o?l[1]+=(t[s]-l[1])/++u:(u=0,l[1]+=r,l=[o,t[s]],a.push(l));return l[1]+=r,a}(a,d,s,u)}function xi(e){return(e=1-e*e*e)*e*e}function _i(e,t,n){const r=e[t];let i=n[0],a=n[1]+1;if(!(a>=e.length))for(;t>i&&e[a]-r<=r-e[i];)n[0]=++i,n[1]=a,++a}const ki=.5*Math.PI/180;function Ai(e,t,n,r){n=n||25,r=Math.max(n,r||200);const i=t=>[t,e(t)],a=t[0],o=t[1],s=o-a,u=s/r,l=[i(a)],c=[];if(n===r){for(let e=1;e<r;++e)l.push(i(a+e/n*s));return l.push(i(o)),l}c.push(i(o));for(let e=n;--e>0;)c.push(i(a+e/n*s));let d=l[0],f=c[c.length-1];const h=1/s,p=function(e,t){let n=e,r=e;const i=t.length;for(let e=0;e<i;++e){const i=t[e][1];i<n&&(n=i),i>r&&(r=i)}return 1/(r-n)}(d[1],c);for(;f;){const e=i((d[0]+f[0])/2);e[0]-d[0]>=u&&wi(d,e,f,h,p)>ki?c.push(e):(d=f,l.push(f),c.pop()),f=c[c.length-1]}return l}function wi(e,t,n,r,i){const a=Math.atan2(i*(n[1]-e[1]),r*(n[0]-e[0])),o=Math.atan2(i*(t[1]-e[1]),r*(t[0]-e[0]));return Math.abs(a-o)}function Di(e){return e&&e.length?1===e.length?e[0]:(t=e,e=>{const n=t.length;let r=1,i=String(t[0](e));for(;r<n;++r)i+="|"+t[r](e);return i}):function(){return""};var t}function Ei(e,t,n){return n||e+(t?"_"+t:"")}const Ci=()=>{},Fi={init:Ci,add:Ci,rem:Ci,idx:0},Mi={values:{init:e=>e.cell.store=!0,value:e=>e.cell.data.values(),idx:-1},count:{value:e=>e.cell.num},__count__:{value:e=>e.missing+e.valid},missing:{value:e=>e.missing},valid:{value:e=>e.valid},sum:{init:e=>e.sum=0,value:e=>e.sum,add:(e,t)=>e.sum+=+t,rem:(e,t)=>e.sum-=t},product:{init:e=>e.product=1,value:e=>e.valid?e.product:void 0,add:(e,t)=>e.product*=t,rem:(e,t)=>e.product/=t},mean:{init:e=>e.mean=0,value:e=>e.valid?e.mean:void 0,add:(e,t)=>(e.mean_d=t-e.mean,e.mean+=e.mean_d/e.valid),rem:(e,t)=>(e.mean_d=t-e.mean,e.mean-=e.valid?e.mean_d/e.valid:e.mean)},average:{value:e=>e.valid?e.mean:void 0,req:["mean"],idx:1},variance:{init:e=>e.dev=0,value:e=>e.valid>1?e.dev/(e.valid-1):void 0,add:(e,t)=>e.dev+=e.mean_d*(t-e.mean),rem:(e,t)=>e.dev-=e.mean_d*(t-e.mean),req:["mean"],idx:1},variancep:{value:e=>e.valid>1?e.dev/e.valid:void 0,req:["variance"],idx:2},stdev:{value:e=>e.valid>1?Math.sqrt(e.dev/(e.valid-1)):void 0,req:["variance"],idx:2},stdevp:{value:e=>e.valid>1?Math.sqrt(e.dev/e.valid):void 0,req:["variance"],idx:2},stderr:{value:e=>e.valid>1?Math.sqrt(e.dev/(e.valid*(e.valid-1))):void 0,req:["variance"],idx:2},distinct:{value:e=>e.cell.data.distinct(e.get),req:["values"],idx:3},ci0:{value:e=>e.cell.data.ci0(e.get),req:["values"],idx:3},ci1:{value:e=>e.cell.data.ci1(e.get),req:["values"],idx:3},median:{value:e=>e.cell.data.q2(e.get),req:["values"],idx:3},q1:{value:e=>e.cell.data.q1(e.get),req:["values"],idx:3},q3:{value:e=>e.cell.data.q3(e.get),req:["values"],idx:3},min:{init:e=>e.min=void 0,value:e=>e.min=Number.isNaN(e.min)?e.cell.data.min(e.get):e.min,add:(e,t)=>{(t<e.min||void 0===e.min)&&(e.min=t)},rem:(e,t)=>{t<=e.min&&(e.min=NaN)},req:["values"],idx:4},max:{init:e=>e.max=void 0,value:e=>e.max=Number.isNaN(e.max)?e.cell.data.max(e.get):e.max,add:(e,t)=>{(t>e.max||void 0===e.max)&&(e.max=t)},rem:(e,t)=>{t>=e.max&&(e.max=NaN)},req:["values"],idx:4},argmin:{init:e=>e.argmin=void 0,value:e=>e.argmin||e.cell.data.argmin(e.get),add:(e,t,n)=>{t<e.min&&(e.argmin=n)},rem:(e,t)=>{t<=e.min&&(e.argmin=void 0)},req:["min","values"],idx:3},argmax:{init:e=>e.argmax=void 0,value:e=>e.argmax||e.cell.data.argmax(e.get),add:(e,t,n)=>{t>e.max&&(e.argmax=n)},rem:(e,t)=>{t>=e.max&&(e.argmax=void 0)},req:["max","values"],idx:3}},Si=Object.keys(Mi);function Bi(e,t){return Mi[e](t)}function Oi(e,t){return e.idx-t.idx}function Ri(){this.valid=0,this.missing=0,this._ops.forEach((e=>e.init(this)))}function zi(e,t){null!=e&&""!==e?e==e&&(++this.valid,this._ops.forEach((n=>n.add(this,e,t)))):++this.missing}function $i(e,t){null!=e&&""!==e?e==e&&(--this.valid,this._ops.forEach((n=>n.rem(this,e,t)))):--this.missing}function qi(e){return this._out.forEach((t=>e[t.out]=t.value(this))),e}function Li(e,t){const n=t||B,r=function(e){const t={};e.forEach((e=>t[e.name]=e));const n=e=>{e.req&&e.req.forEach((e=>{t[e]||n(t[e]=Mi[e]())}))};return e.forEach(n),Object.values(t).sort(Oi)}(e),i=e.slice().sort(Oi);function a(e){this._ops=r,this._out=i,this.cell=e,this.init()}return a.prototype.init=Ri,a.prototype.add=zi,a.prototype.rem=$i,a.prototype.set=qi,a.prototype.get=n,a.fields=e.map((e=>e.out)),a}function Ti(e){this._key=e?M(e):Kn,this.reset()}Si.forEach((e=>{Mi[e]=function(e,t){return n=>be({name:e,out:n||e},Fi,t)}(e,Mi[e])}));const Ni=Ti.prototype;function Pi(e){Br.call(this,null,e),this._adds=[],this._mods=[],this._alen=0,this._mlen=0,this._drop=!0,this._cross=!1,this._dims=[],this._dnames=[],this._measures=[],this._countOnly=!1,this._counts=null,this._prev=null,this._inputs=null,this._outputs=null}Ni.reset=function(){this._add=[],this._rem=[],this._ext=null,this._get=null,this._q=null},Ni.add=function(e){this._add.push(e)},Ni.rem=function(e){this._rem.push(e)},Ni.values=function(){if(this._get=null,0===this._rem.length)return this._add;const e=this._add,t=this._rem,n=this._key,r=e.length,i=t.length,a=Array(r-i),o={};let s,u,l;for(s=0;s<i;++s)o[n(t[s])]=1;for(s=0,u=0;s<r;++s)o[n(l=e[s])]?o[n(l)]=0:a[u++]=l;return this._rem=[],this._add=a},Ni.distinct=function(e){const t=this.values(),n={};let r,i=t.length,a=0;for(;--i>=0;)r=e(t[i])+"",Ae(n,r)||(n[r]=1,++a);return a},Ni.extent=function(e){if(this._get!==e||!this._ext){const t=this.values(),n=_e(t,e);this._ext=[t[n[0]],t[n[1]]],this._get=e}return this._ext},Ni.argmin=function(e){return this.extent(e)[0]||{}},Ni.argmax=function(e){return this.extent(e)[1]||{}},Ni.min=function(e){const t=this.extent(e)[0];return null!=t?e(t):void 0},Ni.max=function(e){const t=this.extent(e)[1];return null!=t?e(t):void 0},Ni.quartile=function(e){return this._get===e&&this._q||(this._q=Lr(this.values(),e),this._get=e),this._q},Ni.q1=function(e){return this.quartile(e)[0]},Ni.q2=function(e){return this.quartile(e)[1]},Ni.q3=function(e){return this.quartile(e)[2]},Ni.ci=function(e){return this._get===e&&this._ci||(this._ci=Pr(this.values(),1e3,.05,e),this._get=e),this._ci},Ni.ci0=function(e){return this.ci(e)[0]},Ni.ci1=function(e){return this.ci(e)[1]},Pi.Definition={type:"Aggregate",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:Si},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"drop",type:"boolean",default:!0},{name:"cross",type:"boolean",default:!1},{name:"key",type:"field"}]},Ce(Pi,Br,{transform(e,t){const n=this,r=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=e.modified();return n.stamp=r.stamp,n.value&&(i||t.modified(n._inputs,!0))?(n._prev=n.value,n.value=i?n.init(e):{},t.visit(t.SOURCE,(e=>n.add(e)))):(n.value=n.value||n.init(e),t.visit(t.REM,(e=>n.rem(e))),t.visit(t.ADD,(e=>n.add(e)))),r.modifies(n._outputs),n._drop=!1!==e.drop,e.cross&&n._dims.length>1&&(n._drop=!1,n.cross()),t.clean()&&n._drop&&r.clean(!0).runAfter((()=>this.clean())),n.changes(r)},cross(){const e=this,t=e.value,n=e._dnames,r=n.map((()=>({}))),i=n.length;function a(e){let t,a,o,s;for(t in e)for(o=e[t].tuple,a=0;a<i;++a)r[a][s=o[n[a]]]=s}a(e._prev),a(t),function a(o,s,u){const l=n[u],c=r[u++];for(const n in c){const r=o?o+"|"+n:n;s[l]=c[n],u<i?a(r,s,u):t[r]||e.cell(r,s)}}("",{},0)},init(e){const t=this._inputs=[],n=this._outputs=[],r={};function i(e){const n=le(A(e)),i=n.length;let a,o=0;for(;o<i;++o)r[a=n[o]]||(r[a]=1,t.push(a))}this._dims=le(e.groupby),this._dnames=this._dims.map((e=>{const t=k(e);return i(e),n.push(t),t})),this.cellkey=e.key?e.key:Di(this._dims),this._countOnly=!0,this._counts=[],this._measures=[];const a=e.fields||[null],o=e.ops||["count"],s=e.as||[],u=a.length,l={};let c,d,f,h,p,m;for(u!==o.length&&C("Unmatched number of fields and aggregate ops."),m=0;m<u;++m)c=a[m],d=o[m],null==c&&"count"!==d&&C("Null aggregate field specified."),h=k(c),p=Ei(d,h,s[m]),n.push(p),"count"!==d?(f=l[h],f||(i(c),f=l[h]=[],f.field=c,this._measures.push(f)),"count"!==d&&(this._countOnly=!1),f.push(Bi(d,p))):this._counts.push(p);return this._measures=this._measures.map((e=>Li(e,e.field))),{}},cellkey:Di(),cell(e,t){let n=this.value[e];return n?0===n.num&&this._drop&&n.stamp<this.stamp?(n.stamp=this.stamp,this._adds[this._alen++]=n):n.stamp<this.stamp&&(n.stamp=this.stamp,this._mods[this._mlen++]=n):(n=this.value[e]=this.newcell(e,t),this._adds[this._alen++]=n),n},newcell(e,t){const n={key:e,num:0,agg:null,tuple:this.newtuple(t,this._prev&&this._prev[e]),stamp:this.stamp,store:!1};if(!this._countOnly){const e=this._measures,t=e.length;n.agg=Array(t);for(let r=0;r<t;++r)n.agg[r]=new e[r](n)}return n.store&&(n.data=new Ti),n},newtuple(e,t){const n=this._dnames,r=this._dims,i=r.length,a={};for(let t=0;t<i;++t)a[n[t]]=r[t](e);return t?rr(t.tuple,a):er(a)},clean(){const e=this.value;for(const t in e)0===e[t].num&&delete e[t]},add(e){const t=this.cellkey(e),n=this.cell(t,e);if(n.num+=1,this._countOnly)return;n.store&&n.data.add(e);const r=n.agg;for(let t=0,n=r.length;t<n;++t)r[t].add(r[t].get(e),e)},rem(e){const t=this.cellkey(e),n=this.cell(t,e);if(n.num-=1,this._countOnly)return;n.store&&n.data.rem(e);const r=n.agg;for(let t=0,n=r.length;t<n;++t)r[t].rem(r[t].get(e),e)},celltuple(e){const t=e.tuple,n=this._counts;e.store&&e.data.values();for(let r=0,i=n.length;r<i;++r)t[n[r]]=e.num;if(!this._countOnly){const n=e.agg;for(let e=0,r=n.length;e<r;++e)n[e].set(t)}return t},changes(e){const t=this._adds,n=this._mods,r=this._prev,i=this._drop,a=e.add,o=e.rem,s=e.mod;let u,l,c,d;if(r)for(l in r)u=r[l],i&&!u.num||o.push(u.tuple);for(c=0,d=this._alen;c<d;++c)a.push(this.celltuple(t[c])),t[c]=null;for(c=0,d=this._mlen;c<d;++c)u=n[c],(0===u.num&&i?o:s).push(this.celltuple(u)),n[c]=null;return this._alen=this._mlen=0,this._prev=null,e}});function Ui(e){Br.call(this,null,e)}function ji(e,t,n){const r=e;let i=t||[],a=n||[],o={},s=0;return{add:e=>a.push(e),remove:e=>o[r(e)]=++s,size:()=>i.length,data:(e,t)=>(s&&(i=i.filter((e=>!o[r(e)])),o={},s=0),t&&e&&i.sort(e),a.length&&(i=e?Te(e,i,a.sort(e)):i.concat(a),a=[]),i)}}function Ii(e){Br.call(this,[],e)}function Wi(e){dr.call(this,null,Hi,e)}function Hi(e){return this.value&&!e.modified()?this.value:fe(e.fields,e.orders)}function Gi(e){Br.call(this,null,e)}function Vi(e){Br.call(this,null,e)}Ui.Definition={type:"Bin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"anchor",type:"number"},{name:"maxbins",type:"number",default:20},{name:"base",type:"number",default:10},{name:"divide",type:"number",array:!0,default:[5,2]},{name:"extent",type:"number",array:!0,length:2,required:!0},{name:"span",type:"number"},{name:"step",type:"number"},{name:"steps",type:"number",array:!0},{name:"minstep",type:"number",default:0},{name:"nice",type:"boolean",default:!0},{name:"name",type:"string"},{name:"as",type:"string",array:!0,length:2,default:["bin0","bin1"]}]},Ce(Ui,Br,{transform(e,t){const n=!1!==e.interval,r=this._bins(e),i=r.start,a=r.step,o=e.as||["bin0","bin1"],s=o[0],u=o[1];let l;return l=e.modified()?(t=t.reflow(!0)).SOURCE:t.modified(A(e.field))?t.ADD_MOD:t.ADD,t.visit(l,n?e=>{const t=r(e);e[s]=t,e[u]=null==t?null:i+a*(1+(t-i)/a)}:e=>e[s]=r(e)),t.modifies(n?o:s)},_bins(e){if(this.value&&!e.modified())return this.value;const t=e.field,n=Nr(e),r=n.step;let i,a,o=n.start,s=o+Math.ceil((n.stop-o)/r)*r;null!=(i=e.anchor)&&(a=i-(o+r*Math.floor((i-o)/r)),o+=a,s+=a);const u=function(e){let n=H(t(e));return null==n?null:n<o?-1/0:n>s?1/0:(n=Math.max(o,Math.min(n,s-r)),o+r*Math.floor(1e-14+(n-o)/r))};return u.start=o,u.stop=n.stop,u.step=r,this.value=_(u,A(t),e.name||"bin_"+k(t))}}),Ii.Definition={type:"Collect",metadata:{source:!0},params:[{name:"sort",type:"compare"}]},Ce(Ii,Br,{transform(e,t){const n=t.fork(t.ALL),r=ji(Kn,this.value,n.materialize(n.ADD).add),i=e.sort,a=t.changed()||i&&(e.modified("sort")||t.modified(i.fields));return n.visit(n.REM,r.remove),this.modified(a),this.value=n.source=r.data(ir(i),a),t.source&&t.source.root&&(this.value.root=t.source.root),n}}),Ce(Wi,dr),Gi.Definition={type:"CountPattern",metadata:{generates:!0,changes:!0},params:[{name:"field",type:"field",required:!0},{name:"case",type:"enum",values:["upper","lower","mixed"],default:"mixed"},{name:"pattern",type:"string",default:'[\\w"]+'},{name:"stopwords",type:"string",default:""},{name:"as",type:"string",array:!0,length:2,default:["text","count"]}]},Ce(Gi,Br,{transform(e,t){const n=t=>n=>{for(var r,i=function(e,t,n){switch(t){case"upper":e=e.toUpperCase();break;case"lower":e=e.toLowerCase()}return e.match(n)}(s(n),e.case,a)||[],u=0,l=i.length;u<l;++u)o.test(r=i[u])||t(r)},r=this._parameterCheck(e,t),i=this._counts,a=this._match,o=this._stop,s=e.field,u=e.as||["text","count"],l=n((e=>i[e]=1+(i[e]||0))),c=n((e=>i[e]-=1));return r?t.visit(t.SOURCE,l):(t.visit(t.ADD,l),t.visit(t.REM,c)),this._finish(t,u)},_parameterCheck(e,t){let n=!1;return!e.modified("stopwords")&&this._stop||(this._stop=new RegExp("^"+(e.stopwords||"")+"$","i"),n=!0),!e.modified("pattern")&&this._match||(this._match=new RegExp(e.pattern||"[\\w']+","g"),n=!0),(e.modified("field")||t.modified(e.field.fields))&&(n=!0),n&&(this._counts={}),n},_finish(e,t){const n=this._counts,r=this._tuples||(this._tuples={}),i=t[0],a=t[1],o=e.fork(e.NO_SOURCE|e.NO_FIELDS);let s,u,l;for(s in n)u=r[s],l=n[s]||0,!u&&l?(r[s]=u=er({}),u[i]=s,u[a]=l,o.add.push(u)):0===l?(u&&o.rem.push(u),n[s]=null,r[s]=null):u[a]!==l&&(u[a]=l,o.mod.push(u));return o.modifies(t)}}),Vi.Definition={type:"Cross",metadata:{generates:!0},params:[{name:"filter",type:"expr"},{name:"as",type:"string",array:!0,length:2,default:["a","b"]}]},Ce(Vi,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE),r=e.as||["a","b"],i=r[0],a=r[1],o=!this.value||t.changed(t.ADD_REM)||e.modified("as")||e.modified("filter");let s=this.value;return o?(s&&(n.rem=s),s=t.materialize(t.SOURCE).source,n.add=this.value=function(e,t,n,r){for(var i,a,o=[],s={},u=e.length,l=0;l<u;++l)for(s[t]=a=e[l],i=0;i<u;++i)s[n]=e[i],r(s)&&(o.push(er(s)),(s={})[t]=a);return o}(s,i,a,e.filter||z)):n.mod=s,n.source=this.value,n.modifies(r)}});const Yi={kde:Jr,mixture:ni,normal:Xr,lognormal:ti,uniform:si},Xi="function";function Ji(e,t){const n=e.function;Ae(Yi,n)||C("Unknown distribution function: "+n);const r=Yi[n]();for(const n in e)"field"===n?r.data((e.from||t()).map(e[n])):"distributions"===n?r[n](e[n].map((e=>Ji(e,t)))):typeof r[n]===Xi&&r[n](e[n]);return r}function Qi(e){Br.call(this,null,e)}const Ki=[{key:{function:"normal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"lognormal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"uniform"},params:[{name:"min",type:"number",default:0},{name:"max",type:"number",default:1}]},{key:{function:"kde"},params:[{name:"field",type:"field",required:!0},{name:"from",type:"data"},{name:"bandwidth",type:"number",default:0}]}],Zi={key:{function:"mixture"},params:[{name:"distributions",type:"param",array:!0,params:Ki},{name:"weights",type:"number",array:!0}]};function ea(e,t){return e?e.map(((e,n)=>t[n]||k(e))):null}function ta(e,t,n){const r=[],i=e=>e(u);let a,o,s,u,l,c;if(null==t)r.push(e.map(n));else for(a={},o=0,s=e.length;o<s;++o)u=e[o],l=t.map(i),c=a[l],c||(a[l]=c=[],c.dims=l,r.push(c)),c.push(n(u));return r}Qi.Definition={type:"Density",metadata:{generates:!0},params:[{name:"extent",type:"number",array:!0,length:2},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"method",type:"string",default:"pdf",values:["pdf","cdf"]},{name:"distribution",type:"param",params:Ki.concat(Zi)},{name:"as",type:"string",array:!0,default:["value","density"]}]},Ce(Qi,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE|t.NO_FIELDS);if(!this.value||t.changed()||e.modified()){const r=Ji(e.distribution,function(e){return()=>e.materialize(e.SOURCE).source}(t)),i=e.steps||e.minsteps||25,a=e.steps||e.maxsteps||200;let o=e.method||"pdf";"pdf"!==o&&"cdf"!==o&&C("Invalid density method: "+o),e.extent||r.data||C("Missing density extent parameter."),o=r[o];const s=e.as||["value","density"],u=Ai(o,e.extent||xe(r.data()),i,a).map((e=>{const t={};return t[s[0]]=e[0],t[s[1]]=e[1],er(t)}));this.value&&(n.rem=this.value),this.value=n.add=n.source=u}return n}});function na(e){Br.call(this,null,e)}na.Definition={type:"DotBin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"step",type:"number"},{name:"smooth",type:"boolean",default:!1},{name:"as",type:"string",default:"bin"}]};function ra(e){dr.call(this,null,ia,e),this.modified(!0)}function ia(e){const t=e.expr;return this.value&&!e.modified("expr")?this.value:_((n=>t(n,e)),A(t),k(t))}function aa(e){Br.call(this,[void 0,void 0],e)}function oa(e,t){dr.call(this,e),this.parent=t,this.count=0}function sa(e){Br.call(this,{},e),this._keys=De();const t=this._targets=[];t.active=0,t.forEach=e=>{for(let n=0,r=t.active;n<r;++n)e(t[n],n,t)}}function ua(e){dr.call(this,null,la,e)}function la(e){return this.value&&!e.modified()?this.value:T(e.name)?le(e.name).map((e=>M(e))):M(e.name,e.as)}function ca(e){Br.call(this,De(),e)}function da(e){Br.call(this,[],e)}function fa(e){Br.call(this,[],e)}function ha(e){Br.call(this,null,e)}function pa(e){Br.call(this,[],e)}Ce(na,Br,{transform(e,t){if(this.value&&!e.modified()&&!t.changed())return t;const n=t.materialize(t.SOURCE).source,r=ta(t.source,e.groupby,B),i=e.smooth||!1,a=e.field,o=e.step||((e,t)=>Ue(xe(e,t))/30)(n,a),s=ir(((e,t)=>a(e)-a(t))),u=e.as||"bin",l=r.length;let c,d=1/0,f=-1/0,h=0;for(;h<l;++h){const e=r[h].sort(s);c=-1;for(const t of Ur(e,o,i,a))t<d&&(d=t),t>f&&(f=t),e[++c][u]=t}return this.value={start:d,stop:f,step:o},t.reflow(!0).modifies(u)}}),Ce(ra,dr),aa.Definition={type:"Extent",metadata:{},params:[{name:"field",type:"field",required:!0}]},Ce(aa,Br,{transform(e,t){const n=this.value,r=e.field,i=t.changed()||t.modified(r.fields)||e.modified("field");let a=n[0],o=n[1];if((i||null==a)&&(a=1/0,o=-1/0),t.visit(i?t.SOURCE:t.ADD,(e=>{const t=H(r(e));null!=t&&(t<a&&(a=t),t>o&&(o=t))})),!Number.isFinite(a)||!Number.isFinite(o)){let e=k(r);e&&(e=` for field "${e}"`),a=o=void 0}this.value=[a,o]}}),Ce(oa,dr,{connect(e){return this.detachSubflow=e.detachSubflow,this.targets().add(e),e.source=this},add(e){this.count+=1,this.value.add.push(e)},rem(e){this.count-=1,this.value.rem.push(e)},mod(e){this.value.mod.push(e)},init(e){this.value.init(e,e.NO_SOURCE)},evaluate(){return this.value}}),Ce(sa,Br,{activate(e){this._targets[this._targets.active++]=e},subflow(e,t,n,r){const i=this.value;let a,o,s=Ae(i,e)&&i[e];return s?s.value.stamp<n.stamp&&(s.init(n),this.activate(s)):(o=r||(o=this._group[e])&&o.tuple,a=n.dataflow,s=new oa(n.fork(n.NO_SOURCE),this),a.add(s).connect(t(a,e,o)),i[e]=s,this.activate(s)),s},clean(){const e=this.value;let t=0;for(const n in e)if(0===e[n].count){const r=e[n].detachSubflow;r&&r(),delete e[n],++t}if(t){const e=this._targets.filter((e=>e&&e.count>0));this.initTargets(e)}},initTargets(e){const t=this._targets,n=t.length,r=e?e.length:0;let i=0;for(;i<r;++i)t[i]=e[i];for(;i<n&&null!=t[i];++i)t[i]=null;t.active=r},transform(e,t){const n=t.dataflow,r=e.key,i=e.subflow,a=this._keys,o=e.modified("key"),s=e=>this.subflow(e,i,t);return this._group=e.group||{},this.initTargets(),t.visit(t.REM,(e=>{const t=Kn(e),n=a.get(t);void 0!==n&&(a.delete(t),s(n).rem(e))})),t.visit(t.ADD,(e=>{const t=r(e);a.set(Kn(e),t),s(t).add(e)})),o||t.modified(r.fields)?t.visit(t.MOD,(e=>{const t=Kn(e),n=a.get(t),i=r(e);n===i?s(i).mod(e):(a.set(t,i),s(n).rem(e),s(i).add(e))})):t.changed(t.MOD)&&t.visit(t.MOD,(e=>{s(a.get(Kn(e))).mod(e)})),o&&t.visit(t.REFLOW,(e=>{const t=Kn(e),n=a.get(t),i=r(e);n!==i&&(a.set(t,i),s(n).rem(e),s(i).add(e))})),t.clean()?n.runAfter((()=>{this.clean(),a.clean()})):a.empty>n.cleanThreshold&&n.runAfter(a.clean),t}}),Ce(ua,dr),ca.Definition={type:"Filter",metadata:{changes:!0},params:[{name:"expr",type:"expr",required:!0}]},Ce(ca,Br,{transform(e,t){const n=t.dataflow,r=this.value,i=t.fork(),a=i.add,o=i.rem,s=i.mod,u=e.expr;let l=!0;function c(t){const n=Kn(t),i=u(t,e),c=r.get(n);i&&c?(r.delete(n),a.push(t)):i||c?l&&i&&!c&&s.push(t):(r.set(n,1),o.push(t))}return t.visit(t.REM,(e=>{const t=Kn(e);r.has(t)?r.delete(t):o.push(e)})),t.visit(t.ADD,(t=>{u(t,e)?a.push(t):r.set(Kn(t),1)})),t.visit(t.MOD,c),e.modified()&&(l=!1,t.visit(t.REFLOW,c)),r.empty>n.cleanThreshold&&n.runAfter(r.clean),i}}),da.Definition={type:"Flatten",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"index",type:"string"},{name:"as",type:"string",array:!0}]},Ce(da,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE),r=e.fields,i=ea(r,e.as||[]),a=e.index||null,o=i.length;return n.rem=this.value,t.visit(t.SOURCE,(e=>{const t=r.map((t=>t(e))),s=t.reduce(((e,t)=>Math.max(e,t.length)),0);let u,l,c,d=0;for(;d<s;++d){for(l=tr(e),u=0;u<o;++u)l[i[u]]=null==(c=t[u][d])?null:c;a&&(l[a]=d),n.add.push(l)}})),this.value=n.source=n.add,a&&n.modifies(a),n.modifies(i)}}),fa.Definition={type:"Fold",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0,length:2,default:["key","value"]}]},Ce(fa,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE),r=e.fields,i=r.map(k),a=e.as||["key","value"],o=a[0],s=a[1],u=r.length;return n.rem=this.value,t.visit(t.SOURCE,(e=>{for(let t,a=0;a<u;++a)t=tr(e),t[o]=i[a],t[s]=r[a](e),n.add.push(t)})),this.value=n.source=n.add,n.modifies(a)}}),ha.Definition={type:"Formula",metadata:{modifies:!0},params:[{name:"expr",type:"expr",required:!0},{name:"as",type:"string",required:!0},{name:"initonly",type:"boolean"}]},Ce(ha,Br,{transform(e,t){const n=e.expr,r=e.as,i=e.modified(),a=e.initonly?t.ADD:i?t.SOURCE:t.modified(n.fields)||t.modified(r)?t.ADD_MOD:t.ADD;return i&&(t=t.materialize().reflow(!0)),e.initonly||t.modifies(r),t.visit(a,(t=>t[r]=n(t,e)))}}),Ce(pa,Br,{transform(e,t){const n=t.fork(t.ALL),r=e.generator;let i,a,o,s=this.value,u=e.size-s.length;if(u>0){for(i=[];--u>=0;)i.push(o=er(r(e))),s.push(o);n.add=n.add.length?n.materialize(n.ADD).add.concat(i):i}else a=s.slice(0,-u),n.rem=n.rem.length?n.materialize(n.REM).rem.concat(a):a,s=s.slice(-u);return n.source=this.value=s,n}});const ma={value:"value",median:r.median,mean:r.mean,min:r.min,max:r.max},ga=[];function ya(e){Br.call(this,[],e)}function va(e){Pi.call(this,e)}function ba(e){Br.call(this,null,e)}function xa(e){dr.call(this,null,_a,e)}function _a(e){return this.value&&!e.modified()?this.value:$e(e.fields,e.flat)}function ka(e){Br.call(this,[],e),this._pending=null}function Aa(e,t,n){n.forEach(er);const r=t.fork(t.NO_FIELDS&t.NO_SOURCE);return r.rem=e.value,e.value=r.source=r.add=n,e._pending=null,r.rem.length&&r.clean(!0),r}function wa(e){Br.call(this,{},e)}function Da(e){dr.call(this,null,Ea,e)}function Ea(e){if(this.value&&!e.modified())return this.value;const t=e.extents,n=t.length;let r,i,a=1/0,o=-1/0;for(r=0;r<n;++r)i=t[r],i[0]<a&&(a=i[0]),i[1]>o&&(o=i[1]);return[a,o]}function Ca(e){dr.call(this,null,Fa,e)}function Fa(e){return this.value&&!e.modified()?this.value:e.values.reduce(((e,t)=>e.concat(t)),[])}function Ma(e){Br.call(this,null,e)}function Sa(e){Pi.call(this,e)}function Ba(e){sa.call(this,e)}function Oa(e){Br.call(this,null,e)}function Ra(e){Br.call(this,null,e)}function za(e){Br.call(this,null,e)}ya.Definition={type:"Impute",metadata:{changes:!0},params:[{name:"field",type:"field",required:!0},{name:"key",type:"field",required:!0},{name:"keyvals",array:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"enum",default:"value",values:["value","mean","median","max","min"]},{name:"value",default:0}]},Ce(ya,Br,{transform(e,t){var n,r,i,a,o,s,u,l,c,d,f=t.fork(t.ALL),h=function(e){var t,n=e.method||ma.value;if(null!=ma[n])return n===ma.value?(t=void 0!==e.value?e.value:0,()=>t):ma[n];C("Unrecognized imputation method: "+n)}(e),p=function(e){const t=e.field;return e=>e?t(e):NaN}(e),m=k(e.field),g=k(e.key),y=(e.groupby||[]).map(k),v=function(e,t,n,r){var i,a,o,s,u,l,c,d,f=e=>e(d),h=[],p=r?r.slice():[],m={},g={};for(p.forEach(((e,t)=>m[e]=t+1)),s=0,c=e.length;s<c;++s)l=n(d=e[s]),u=m[l]||(m[l]=p.push(l)),(o=g[a=(i=t?t.map(f):ga)+""])||(o=g[a]=[],h.push(o),o.values=i),o[u-1]=d;return h.domain=p,h}(t.source,e.groupby,e.key,e.keyvals),b=[],x=this.value,_=v.domain.length;for(o=0,l=v.length;o<l;++o)for(i=(n=v[o]).values,r=NaN,u=0;u<_;++u)if(null==n[u]){for(a=v.domain[u],d={_impute:!0},s=0,c=i.length;s<c;++s)d[y[s]]=i[s];d[g]=a,d[m]=Number.isNaN(r)?r=h(n,p):r,b.push(er(d))}return b.length&&(f.add=f.materialize(f.ADD).add.concat(b)),x.length&&(f.rem=f.materialize(f.REM).rem.concat(x)),this.value=b,f}}),va.Definition={type:"JoinAggregate",metadata:{modifies:!0},params:[{name:"groupby",type:"field",array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"ops",type:"enum",array:!0,values:Si},{name:"as",type:"string",null:!0,array:!0},{name:"key",type:"field"}]},Ce(va,Pi,{transform(e,t){const n=this,r=e.modified();let i;return n.value&&(r||t.modified(n._inputs,!0))?(i=n.value=r?n.init(e):{},t.visit(t.SOURCE,(e=>n.add(e)))):(i=n.value=n.value||this.init(e),t.visit(t.REM,(e=>n.rem(e))),t.visit(t.ADD,(e=>n.add(e)))),n.changes(),t.visit(t.SOURCE,(e=>{be(e,i[n.cellkey(e)].tuple)})),t.reflow(r).modifies(this._outputs)},changes(){const e=this._adds,t=this._mods;let n,r;for(n=0,r=this._alen;n<r;++n)this.celltuple(e[n]),e[n]=null;for(n=0,r=this._mlen;n<r;++n)this.celltuple(t[n]),t[n]=null;this._alen=this._mlen=0}}),ba.Definition={type:"KDE",metadata:{generates:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"cumulative",type:"boolean",default:!1},{name:"counts",type:"boolean",default:!1},{name:"bandwidth",type:"number",default:0},{name:"extent",type:"number",array:!0,length:2},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"as",type:"string",array:!0,default:["value","density"]}]},Ce(ba,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE|t.NO_FIELDS);if(!this.value||t.changed()||e.modified()){const r=t.materialize(t.SOURCE).source,i=ta(r,e.groupby,e.field),a=(e.groupby||[]).map(k),o=e.bandwidth,s=e.cumulative?"cdf":"pdf",u=e.as||["value","density"],l=[];let c=e.extent,d=e.steps||e.minsteps||25,f=e.steps||e.maxsteps||200;"pdf"!==s&&"cdf"!==s&&C("Invalid density method: "+s),"shared"===e.resolve&&(c||(c=xe(r,e.field)),d=f=e.steps||f),i.forEach((t=>{const n=Jr(t,o)[s],r=e.counts?t.length:1;Ai(n,c||xe(t),d,f).forEach((e=>{const n={};for(let e=0;e<a.length;++e)n[a[e]]=t.dims[e];n[u[0]]=e[0],n[u[1]]=e[1]*r,l.push(er(n))}))})),this.value&&(n.rem=this.value),this.value=n.add=n.source=l}return n}}),Ce(xa,dr),Ce(ka,Br,{transform(e,t){const n=t.dataflow;if(this._pending)return Aa(this,t,this._pending);if(function(e){return e.modified("async")&&!(e.modified("values")||e.modified("url")||e.modified("format"))}(e))return t.StopPropagation;if(e.values)return Aa(this,t,n.parse(e.values,e.format));if(e.async){const t=n.request(e.url,e.format).then((e=>(this._pending=le(e.data),e=>e.touch(this))));return{async:t}}return n.request(e.url,e.format).then((e=>Aa(this,t,le(e.data))))}}),wa.Definition={type:"Lookup",metadata:{modifies:!0},params:[{name:"index",type:"index",params:[{name:"from",type:"data",required:!0},{name:"key",type:"field",required:!0}]},{name:"values",type:"field",array:!0},{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0},{name:"default",default:null}]},Ce(wa,Br,{transform(e,t){const n=e.fields,r=e.index,i=e.values,a=null==e.default?null:e.default,o=e.modified(),s=n.length;let u,l,c,d=o?t.SOURCE:t.ADD,f=t,h=e.as;return i?(l=i.length,s>1&&!h&&C('Multi-field lookup requires explicit "as" parameter.'),h&&h.length!==s*l&&C('The "as" parameter has too few output field names.'),h=h||i.map(k),u=function(e){for(var t,o,u=0,c=0;u<s;++u)if(null==(o=r.get(n[u](e))))for(t=0;t<l;++t,++c)e[h[c]]=a;else for(t=0;t<l;++t,++c)e[h[c]]=i[t](o)}):(h||C("Missing output field names."),u=function(e){for(var t,i=0;i<s;++i)t=r.get(n[i](e)),e[h[i]]=null==t?a:t}),o?f=t.reflow(!0):(c=n.some((e=>t.modified(e.fields))),d|=c?t.MOD:0),t.visit(d,u),f.modifies(h)}}),Ce(Da,dr),Ce(Ca,dr),Ce(Ma,Br,{transform(e,t){return this.modified(e.modified()),this.value=e,t.fork(t.NO_SOURCE|t.NO_FIELDS)}}),Sa.Definition={type:"Pivot",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"value",type:"field",required:!0},{name:"op",type:"enum",values:Si,default:"sum"},{name:"limit",type:"number",default:0},{name:"key",type:"field"}]},Ce(Sa,Pi,{_transform:Pi.prototype.transform,transform(e,t){return this._transform(function(e,t){const n=e.field,r=e.value,i=("count"===e.op?"__count__":e.op)||"sum",a=A(n).concat(A(r)),o=function(e,t,n){const r={},i=[];return n.visit(n.SOURCE,(t=>{const n=e(t);r[n]||(r[n]=1,i.push(n))})),i.sort(he),t?i.slice(0,t):i}(n,e.limit||0,t);t.changed()&&e.set("__pivot__",null,null,!0);return{key:e.key,groupby:e.groupby,ops:o.map((()=>i)),fields:o.map((e=>function(e,t,n,r){return _((r=>t(r)===e?n(r):NaN),r,e+"")}(e,n,r,a))),as:o.map((e=>e+"")),modified:e.modified.bind(e)}}(e,t),t)}}),Ce(Ba,sa,{transform(e,t){const n=e.subflow,r=e.field,i=e=>this.subflow(Kn(e),n,t,e);return(e.modified("field")||r&&t.modified(A(r)))&&C("PreFacet does not support field modification."),this.initTargets(),r?(t.visit(t.MOD,(e=>{const t=i(e);r(e).forEach((e=>t.mod(e)))})),t.visit(t.ADD,(e=>{const t=i(e);r(e).forEach((e=>t.add(er(e))))})),t.visit(t.REM,(e=>{const t=i(e);r(e).forEach((e=>t.rem(e)))}))):(t.visit(t.MOD,(e=>i(e).mod(e))),t.visit(t.ADD,(e=>i(e).add(e))),t.visit(t.REM,(e=>i(e).rem(e)))),t.clean()&&t.runAfter((()=>this.clean())),t}}),Oa.Definition={type:"Project",metadata:{generates:!0,changes:!0},params:[{name:"fields",type:"field",array:!0},{name:"as",type:"string",null:!0,array:!0}]},Ce(Oa,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE),r=e.fields,i=ea(e.fields,e.as||[]),a=r?(e,t)=>function(e,t,n,r){for(let i=0,a=n.length;i<a;++i)t[r[i]]=n[i](e);return t}(e,t,r,i):nr;let o;return this.value?o=this.value:(t=t.addAll(),o=this.value={}),t.visit(t.REM,(e=>{const t=Kn(e);n.rem.push(o[t]),o[t]=null})),t.visit(t.ADD,(e=>{const t=a(e,er({}));o[Kn(e)]=t,n.add.push(t)})),t.visit(t.MOD,(e=>{n.mod.push(a(e,o[Kn(e)]))})),n}}),Ce(Ra,Br,{transform(e,t){return this.value=e.value,e.modified("value")?t.fork(t.NO_SOURCE|t.NO_FIELDS):t.StopPropagation}}),za.Definition={type:"Quantile",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"probs",type:"number",array:!0},{name:"step",type:"number",default:.01},{name:"as",type:"string",array:!0,default:["prob","value"]}]};function $a(e){Br.call(this,null,e)}function qa(e){Br.call(this,[],e),this.count=0}function La(e){Br.call(this,null,e)}function Ta(e){Br.call(this,null,e),this.modified(!0)}function Na(e){Br.call(this,null,e)}Ce(za,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=e.as||["prob","value"];if(this.value&&!e.modified()&&!t.changed())return n.source=this.value,n;const a=ta(t.materialize(t.SOURCE).source,e.groupby,e.field),o=(e.groupby||[]).map(k),s=[],u=e.step||.01,l=e.probs||r.range(u/2,1-1e-14,u),c=l.length;return a.forEach((e=>{const t=qr(e,l);for(let n=0;n<c;++n){const r={};for(let t=0;t<o.length;++t)r[o[t]]=e.dims[t];r[i[0]]=l[n],r[i[1]]=t[n],s.push(er(r))}})),this.value&&(n.rem=this.value),this.value=n.add=n.source=s,n}}),Ce($a,Br,{transform(e,t){let n,r;return this.value?r=this.value:(n=t=t.addAll(),r=this.value={}),e.derive&&(n=t.fork(t.NO_SOURCE),t.visit(t.REM,(e=>{const t=Kn(e);n.rem.push(r[t]),r[t]=null})),t.visit(t.ADD,(e=>{const t=tr(e);r[Kn(e)]=t,n.add.push(t)})),t.visit(t.MOD,(e=>{const t=r[Kn(e)];for(const r in e)t[r]=e[r],n.modifies(r);n.mod.push(t)}))),n}}),qa.Definition={type:"Sample",metadata:{},params:[{name:"size",type:"number",default:1e3}]},Ce(qa,Br,{transform(t,n){const r=n.fork(n.NO_SOURCE),i=t.modified("size"),a=t.size,o=this.value.reduce(((e,t)=>(e[Kn(t)]=1,e)),{});let s=this.value,u=this.count,l=0;function c(t){let n,i;s.length<a?s.push(t):(i=~~((u+1)*e.random()),i<s.length&&i>=l&&(n=s[i],o[Kn(n)]&&r.rem.push(n),s[i]=t)),++u}if(n.rem.length&&(n.visit(n.REM,(e=>{const t=Kn(e);o[t]&&(o[t]=-1,r.rem.push(e)),--u})),s=s.filter((e=>-1!==o[Kn(e)]))),(n.rem.length||i)&&s.length<a&&n.source&&(l=u=s.length,n.visit(n.SOURCE,(e=>{o[Kn(e)]||c(e)})),l=-1),i&&s.length>a){const e=s.length-a;for(let t=0;t<e;++t)o[Kn(s[t])]=-1,r.rem.push(s[t]);s=s.slice(e)}return n.mod.length&&n.visit(n.MOD,(e=>{o[Kn(e)]&&r.mod.push(e)})),n.add.length&&n.visit(n.ADD,c),(n.add.length||l<0)&&(r.add=s.filter((e=>!o[Kn(e)]))),this.count=u,this.value=r.source=s,r}}),La.Definition={type:"Sequence",metadata:{generates:!0,changes:!0},params:[{name:"start",type:"number",required:!0},{name:"stop",type:"number",required:!0},{name:"step",type:"number",default:1},{name:"as",type:"string",default:"data"}]},Ce(La,Br,{transform(e,t){if(this.value&&!e.modified())return;const n=t.materialize().fork(t.MOD),i=e.as||"data";return n.rem=this.value?t.rem.concat(this.value):t.rem,this.value=r.range(e.start,e.stop,e.step||1).map((e=>{const t={};return t[i]=e,er(t)})),n.add=t.add.concat(this.value),n}}),Ce(Ta,Br,{transform(e,t){return this.value=t.source,t.changed()?t.fork(t.NO_SOURCE|t.NO_FIELDS):t.StopPropagation}});const Pa=["unit0","unit1"];function Ua(e){Br.call(this,De(),e)}function ja(e){Br.call(this,null,e)}Na.Definition={type:"TimeUnit",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"units",type:"enum",values:st,array:!0},{name:"step",type:"number",default:1},{name:"maxbins",type:"number",default:40},{name:"extent",type:"date",array:!0},{name:"timezone",type:"enum",default:"local",values:["local","utc"]},{name:"as",type:"string",array:!0,length:2,default:Pa}]},Ce(Na,Br,{transform(e,t){const n=e.field,r=!1!==e.interval,i="utc"===e.timezone,a=this._floor(e,t),o=(i?Lt:qt)(a.unit).offset,s=e.as||Pa,u=s[0],l=s[1],c=a.step;let d=a.start||1/0,f=a.stop||-1/0,h=t.ADD;return(e.modified()||t.modified(A(n)))&&(h=(t=t.reflow(!0)).SOURCE,d=1/0,f=-1/0),t.visit(h,(e=>{const t=n(e);let i,s;null==t?(e[u]=null,r&&(e[l]=null)):(e[u]=i=s=a(t),r&&(e[l]=s=o(i,c)),i<d&&(d=i),s>f&&(f=s))})),a.start=d,a.stop=f,t.modifies(r?s:u)},_floor(e,t){const n="utc"===e.timezone,{units:r,step:i}=e.units?{units:e.units,step:e.step||1}:an({extent:e.extent||xe(t.materialize(t.SOURCE).source,e.field),maxbins:e.maxbins}),a=lt(r),o=this.value||{},s=(n?Rt:St)(a,i);return s.unit=W(a),s.units=a,s.step=i,s.start=o.start,s.stop=o.stop,this.value=s}}),Ce(Ua,Br,{transform(e,t){const n=t.dataflow,r=e.field,i=this.value,a=e=>i.set(r(e),e);let o=!0;return e.modified("field")||t.modified(r.fields)?(i.clear(),t.visit(t.SOURCE,a)):t.changed()?(t.visit(t.REM,(e=>i.delete(r(e)))),t.visit(t.ADD,a)):o=!1,this.modified(o),i.empty>n.cleanThreshold&&n.runAfter(i.clean),t.fork()}}),Ce(ja,Br,{transform(e,t){(!this.value||e.modified("field")||e.modified("sort")||t.changed()||e.sort&&t.modified(e.sort.fields))&&(this.value=(e.sort?t.source.slice().sort(ir(e.sort)):t.source).map(e.field))}});const Ia={row_number:function(){return{next:e=>e.index+1}},rank:function(){let e;return{init:()=>e=1,next:t=>{const n=t.index,r=t.data;return n&&t.compare(r[n-1],r[n])?e=n+1:e}}},dense_rank:function(){let e;return{init:()=>e=1,next:t=>{const n=t.index,r=t.data;return n&&t.compare(r[n-1],r[n])?++e:e}}},percent_rank:function(){const e=Ia.rank(),t=e.next;return{init:e.init,next:e=>(t(e)-1)/(e.data.length-1)}},cume_dist:function(){let e;return{init:()=>e=0,next:t=>{const n=t.data,r=t.compare;let i=t.index;if(e<i){for(;i+1<n.length&&!r(n[i],n[i+1]);)++i;e=i}return(1+e)/n.length}}},ntile:function(e,t){(t=+t)>0||C("ntile num must be greater than zero.");const n=Ia.cume_dist(),r=n.next;return{init:n.init,next:e=>Math.ceil(t*r(e))}},lag:function(e,t){return t=+t||1,{next:n=>{const r=n.index-t;return r>=0?e(n.data[r]):null}}},lead:function(e,t){return t=+t||1,{next:n=>{const r=n.index+t,i=n.data;return r<i.length?e(i[r]):null}}},first_value:function(e){return{next:t=>e(t.data[t.i0])}},last_value:function(e){return{next:t=>e(t.data[t.i1-1])}},nth_value:function(e,t){return(t=+t)>0||C("nth_value nth must be greater than zero."),{next:n=>{const r=n.i0+(t-1);return r<n.i1?e(n.data[r]):null}}},prev_value:function(e){let t;return{init:()=>t=null,next:n=>{const r=e(n.data[n.index]);return null!=r?t=r:t}}},next_value:function(e){let t,n;return{init:()=>(t=null,n=-1),next:r=>{const i=r.data;return r.index<=n?t:(n=function(e,t,n){for(let r=t.length;n<r;++n){if(null!=e(t[n]))return n}return-1}(e,i,r.index))<0?(n=i.length,t=null):t=e(i[n])}}}};const Wa=Object.keys(Ia);function Ha(e){const t=le(e.ops),n=le(e.fields),r=le(e.params),i=le(e.as),a=this.outputs=[],o=this.windows=[],s={},u={},l=[],c=[];let d=!0;function f(e){le(A(e)).forEach((e=>s[e]=1))}f(e.sort),t.forEach(((e,t)=>{const s=n[t],h=k(s),p=Ei(e,h,i[t]);if(f(s),a.push(p),Ae(Ia,e))o.push(function(e,t,n,r){const i=Ia[e](t,n);return{init:i.init||O,update:function(e,t){t[r]=i.next(e)}}}(e,n[t],r[t],p));else{if(null==s&&"count"!==e&&C("Null aggregate field specified."),"count"===e)return void l.push(p);d=!1;let t=u[h];t||(t=u[h]=[],t.field=s,c.push(t)),t.push(Bi(e,p))}})),(l.length||c.length)&&(this.cell=function(e,t,n){e=e.map((e=>Li(e,e.field)));const r={num:0,agg:null,store:!1,count:t};if(!n)for(var i=e.length,a=r.agg=Array(i),o=0;o<i;++o)a[o]=new e[o](r);if(r.store)var s=r.data=new Ti;return r.add=function(e){if(r.num+=1,!n){s&&s.add(e);for(let t=0;t<i;++t)a[t].add(a[t].get(e),e)}},r.rem=function(e){if(r.num-=1,!n){s&&s.rem(e);for(let t=0;t<i;++t)a[t].rem(a[t].get(e),e)}},r.set=function(e){let i,o;for(s&&s.values(),i=0,o=t.length;i<o;++i)e[t[i]]=r.num;if(!n)for(i=0,o=a.length;i<o;++i)a[i].set(e)},r.init=function(){r.num=0,s&&s.reset();for(let e=0;e<i;++e)a[e].init()},r}(c,l,d)),this.inputs=Object.keys(s)}const Ga=Ha.prototype;function Va(e){Br.call(this,{},e),this._mlen=0,this._mods=[]}function Ya(e,t,n,i){const a=i.sort,o=a&&!i.ignorePeers,s=i.frame||[null,0],u=e.data(n),l=u.length,c=o?r.bisector(a):null,d={i0:0,i1:0,p0:0,p1:0,index:0,data:u,compare:a||ye(-1)};t.init();for(let e=0;e<l;++e)Xa(d,s,e,l),o&&Ja(d,c),t.update(d,u[e])}function Xa(e,t,n,r){e.p0=e.i0,e.p1=e.i1,e.i0=null==t[0]?0:Math.max(0,n-Math.abs(t[0])),e.i1=null==t[1]?r:Math.min(r,n+Math.abs(t[1])+1),e.index=n}function Ja(e,t){const n=e.i0,r=e.i1-1,i=e.compare,a=e.data,o=a.length-1;n>0&&!i(a[n],a[n-1])&&(e.i0=t.left(a,a[n])),r<o&&!i(a[r],a[r+1])&&(e.i1=t.right(a,a[r]))}Ga.init=function(){this.windows.forEach((e=>e.init())),this.cell&&this.cell.init()},Ga.update=function(e,t){const n=this.cell,r=this.windows,i=e.data,a=r&&r.length;let o;if(n){for(o=e.p0;o<e.i0;++o)n.rem(i[o]);for(o=e.p1;o<e.i1;++o)n.add(i[o]);n.set(t)}for(o=0;o<a;++o)r[o].update(e,t)},Va.Definition={type:"Window",metadata:{modifies:!0},params:[{name:"sort",type:"compare"},{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:Wa.concat(Si)},{name:"params",type:"number",null:!0,array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"frame",type:"number",null:!0,array:!0,length:2,default:[null,0]},{name:"ignorePeers",type:"boolean",default:!1}]},Ce(Va,Br,{transform(e,t){this.stamp=t.stamp;const n=e.modified(),r=ir(e.sort),i=Di(e.groupby),a=e=>this.group(i(e));let o=this.state;o&&!n||(o=this.state=new Ha(e)),n||t.modified(o.inputs)?(this.value={},t.visit(t.SOURCE,(e=>a(e).add(e)))):(t.visit(t.REM,(e=>a(e).remove(e))),t.visit(t.ADD,(e=>a(e).add(e))));for(let t=0,n=this._mlen;t<n;++t)Ya(this._mods[t],o,r,e);return this._mlen=0,this._mods=[],t.reflow(n).modifies(o.outputs)},group(e){let t=this.value[e];return t||(t=this.value[e]=ji(Kn),t.stamp=-1),t.stamp<this.stamp&&(t.stamp=this.stamp,this._mods[this._mlen++]=t),t}});var Qa=Object.freeze({__proto__:null,aggregate:Pi,bin:Ui,collect:Ii,compare:Wi,countpattern:Gi,cross:Vi,density:Qi,dotbin:na,expression:ra,extent:aa,facet:sa,field:ua,filter:ca,flatten:da,fold:fa,formula:ha,generate:pa,impute:ya,joinaggregate:va,kde:ba,key:xa,load:ka,lookup:wa,multiextent:Da,multivalues:Ca,params:Ma,pivot:Sa,prefacet:Ba,project:Oa,proxy:Ra,quantile:za,relay:$a,sample:qa,sequence:La,sieve:Ta,subflow:oa,timeunit:Na,tupleindex:Ua,values:ja,window:Va});function Ka(e,t){if("undefined"!=typeof document&&document.createElement){const n=document.createElement("canvas");if(n&&n.getContext)return n.width=e,n.height=t,n}return null}const Za=()=>"undefined"!=typeof Image?Image:null;function eo(e,t,n){const r=e-t+2*n;return e?r>0?r:1:0}const to="linear",no="log",ro="pow",io="sqrt",ao="symlog",oo="time",so="utc",uo="sequential",lo="quantile",co="quantize",fo="threshold",ho="ordinal",po="point",mo="band",go="bin-ordinal",yo="continuous",vo="discrete",bo="discretizing",xo="interpolating",_o="temporal";function ko(){const e=l.scaleOrdinal().unknown(void 0),t=e.domain,n=e.range;let i,a,o=[0,1],s=!1,u=0,c=0,d=.5;function f(){const e=t().length,l=o[1]<o[0],f=o[1-l],h=eo(e,u,c);let p=o[l-0];i=(f-p)/(h||1),s&&(i=Math.floor(i)),p+=(f-p-i*(e-u))*d,a=i*(1-u),s&&(p=Math.round(p),a=Math.round(a));const m=r.range(e).map((e=>p+i*e));return n(l?m.reverse():m)}return delete e.unknown,e.domain=function(e){return arguments.length?(t(e),f()):t()},e.range=function(e){return arguments.length?(o=[+e[0],+e[1]],f()):o.slice()},e.rangeRound=function(e){return o=[+e[0],+e[1]],s=!0,f()},e.bandwidth=function(){return a},e.step=function(){return i},e.round=function(e){return arguments.length?(s=!!e,f()):s},e.padding=function(e){return arguments.length?(c=Math.max(0,Math.min(1,e)),u=c,f()):u},e.paddingInner=function(e){return arguments.length?(u=Math.max(0,Math.min(1,e)),f()):u},e.paddingOuter=function(e){return arguments.length?(c=Math.max(0,Math.min(1,e)),f()):c},e.align=function(e){return arguments.length?(d=Math.max(0,Math.min(1,e)),f()):d},e.invertRange=function(e){if(null==e[0]||null==e[1])return;const i=o[1]<o[0],s=i?n().reverse():n(),u=s.length-1;let l,c,d,f=+e[0],h=+e[1];return f!=f||h!=h||(h<f&&(d=f,f=h,h=d),h<s[0]||f>o[1-i])?void 0:(l=Math.max(0,r.bisectRight(s,f)-1),c=f===h?l:r.bisectRight(s,h)-1,f-s[l]>a+1e-10&&++l,i&&(d=l,l=u-c,c=u-d),l>c?void 0:t().slice(l,c+1))},e.invert=function(t){const n=e.invertRange([t,t]);return n?n[0]:n},e.copy=function(){return ko().domain(t()).range(o).round(s).paddingInner(u).paddingOuter(c).align(d)},f()}function Ao(e){const t=e.copy;return e.padding=e.paddingOuter,delete e.paddingInner,e.copy=function(){return Ao(t())},e}var wo=Array.prototype.map;function Do(e){return wo.call(e,H)}const Eo=Array.prototype.slice;const Co={};function Fo(e,t,n){const r=function(){const n=t();return n.invertRange||(n.invertRange=n.invert?function(e){return function(t){let n,r=t[0],i=t[1];return i<r&&(n=r,r=i,i=n),[e.invert(r),e.invert(i)]}}(n):n.invertExtent?function(e){return function(t){const n=e.range();let r,i,a,o,s=t[0],u=t[1],l=-1;for(u<s&&(i=s,s=u,u=i),a=0,o=n.length;a<o;++a)n[a]>=s&&n[a]<=u&&(l<0&&(l=a),r=a);if(!(l<0))return s=e.invertExtent(n[l]),u=e.invertExtent(n[r]),[void 0===s[0]?s[1]:s[0],void 0===u[1]?u[0]:u[1]]}}(n):void 0),n.type=e,n};return r.metadata=Ve(le(n)),r}function Mo(e,t,n){return arguments.length>1?(Co[e]=Fo(e,t,n),this):So(e)?Co[e]:void 0}function So(e){return Ae(Co,e)}function Bo(e,t){const n=Co[e];return n&&n.metadata[t]}function Oo(e){return Bo(e,yo)}function Ro(e){return Bo(e,vo)}function zo(e){return Bo(e,bo)}function $o(e){return Bo(e,no)}function qo(e){return Bo(e,xo)}function Lo(e){return Bo(e,lo)}Mo("identity",v.scaleIdentity),Mo(to,v.scaleLinear,yo),Mo(no,v.scaleLog,[yo,no]),Mo(ro,v.scalePow,yo),Mo(io,v.scaleSqrt,yo),Mo(ao,v.scaleSymlog,yo),Mo(oo,v.scaleTime,[yo,_o]),Mo(so,v.scaleUtc,[yo,_o]),Mo(uo,v.scaleSequential,[yo,xo]),Mo("sequential-linear",v.scaleSequential,[yo,xo]),Mo("sequential-log",v.scaleSequentialLog,[yo,xo,no]),Mo("sequential-pow",v.scaleSequentialPow,[yo,xo]),Mo("sequential-sqrt",v.scaleSequentialSqrt,[yo,xo]),Mo("sequential-symlog",v.scaleSequentialSymlog,[yo,xo]),Mo("diverging-linear",v.scaleDiverging,[yo,xo]),Mo("diverging-log",v.scaleDivergingLog,[yo,xo,no]),Mo("diverging-pow",v.scaleDivergingPow,[yo,xo]),Mo("diverging-sqrt",v.scaleDivergingSqrt,[yo,xo]),Mo("diverging-symlog",v.scaleDivergingSymlog,[yo,xo]),Mo(lo,v.scaleQuantile,[bo,lo]),Mo(co,v.scaleQuantize,bo),Mo(fo,v.scaleThreshold,bo),Mo(go,(function e(){let t=[],n=[];function i(e){return null==e||e!=e?void 0:n[(r.bisect(t,e)-1)%n.length]}return i.domain=function(e){return arguments.length?(t=Do(e),i):t.slice()},i.range=function(e){return arguments.length?(n=Eo.call(e),i):n.slice()},i.tickFormat=function(e,n){return l.tickFormat(t[0],W(t),null==e?10:e,n)},i.copy=function(){return e().domain(i.domain()).range(i.range())},i}),[vo,bo]),Mo(ho,v.scaleOrdinal,vo),Mo(mo,ko,vo),Mo(po,(function(){return Ao(ko().paddingInner(1))}),vo);const To=["clamp","base","constant","exponent"];function No(e,t){const n=t[0],r=W(t)-n;return function(t){return e(n+t*r)}}function Po(e,t,n){return b.piecewise(Io(t||"rgb",n),e)}function Uo(e,t){const n=new Array(t),r=t+1;for(let i=0;i<t;)n[i]=e(++i/r);return n}function jo(e,t,n){const r=n-t;let i,a,o;return r&&Number.isFinite(r)?(i=(a=e.type).indexOf("-"),a=i<0?a:a.slice(i+1),o=Mo(a)().domain([t,n]).range([0,1]),To.forEach((t=>e[t]?o[t](e[t]()):0)),o):ye(.5)}function Io(e,t){const n=b[function(e){return"interpolate"+e.toLowerCase().split("-").map((e=>e[0].toUpperCase()+e.slice(1))).join("")}(e)];return null!=t&&n&&n.gamma?n.gamma(t):n}function Wo(e){const t=e.length/6|0,n=new Array(t);for(let r=0;r<t;)n[r]="#"+e.slice(6*r,6*++r);return n}function Ho(e,t){for(const n in e)Vo(n,t(e[n]))}const Go={};function Vo(e,t){return e=e&&e.toLowerCase(),arguments.length>1?(Go[e]=t,this):Go[e]}Ho({category10:"1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf",category20:"1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",category20b:"393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",category20c:"3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",tableau10:"4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",tableau20:"4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5",accent:"7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666",dark2:"1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666",paired:"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928",pastel1:"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2",pastel2:"b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc",set1:"e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999",set2:"66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3",set3:"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"},Wo),Ho({blues:"cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",greens:"d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",greys:"e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",oranges:"fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",purples:"e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",reds:"fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",blueGreen:"d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",bluePurple:"ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",greenBlue:"d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",orangeRed:"fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",purpleBlue:"dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",purpleBlueGreen:"dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",purpleRed:"dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",redPurple:"fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",yellowGreen:"e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",yellowOrangeBrown:"feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",yellowOrangeRed:"fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",blueOrange:"134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",brownBlueGreen:"704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",purpleGreen:"5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",purpleOrange:"4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",redBlue:"8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",redGrey:"8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",yellowGreenBlue:"eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",redYellowBlue:"a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",redYellowGreen:"a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",pinkYellowGreen:"8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",spectral:"9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",viridis:"440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",magma:"0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",inferno:"0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",plasma:"0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",cividis:"00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",rainbow:"6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",sinebow:"ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",turbo:"23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",browns:"eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",tealBlues:"bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",teals:"bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",warmGreys:"dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",goldGreen:"f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",goldOrange:"f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",goldRed:"f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",lightGreyRed:"efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",lightGreyTeal:"e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",lightMulti:"e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",lightOrange:"f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",lightTealBlue:"e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",darkBlue:"3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",darkGold:"3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",darkGreen:"3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",darkMulti:"3737371f5287197d8c29a86995ce3fffe800ffffff",darkRed:"3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c"},(e=>Po(Wo(e))));const Yo="symbol",Xo=e=>T(e)?e.map((e=>String(e))):String(e),Jo=(e,t)=>e[1]-t[1],Qo=(e,t)=>t[1]-e[1];function Ko(e,t,n){let r;return Oe(t)&&(e.bins&&(t=Math.max(t,e.bins.length)),null!=n&&(t=Math.min(t,Math.floor(Ue(e.domain())/n||1)))),N(t)&&(r=t.step,t=t.interval),ze(t)&&(t=e.type===oo?qt(t):e.type==so?Lt(t):C("Only time and utc scales accept interval strings."),r&&(t=t.every(r))),t}function Zo(e,t,n){let r=e.range(),i=r[0],a=W(r),o=Jo;if(i>a&&(r=a,a=i,i=r,o=Qo),i=Math.floor(i),a=Math.ceil(a),t=t.map((t=>[t,e(t)])).filter((e=>i<=e[1]&&e[1]<=a)).sort(o).map((e=>e[0])),n>0&&t.length>1){const e=[t[0],W(t)];for(;t.length>n&&t.length>=3;)t=t.filter(((e,t)=>!(t%2)));t.length<3&&(t=e)}return t}function es(e,t){return e.bins?Zo(e,e.bins):e.ticks?e.ticks(t):e.domain()}function ts(e,t,n,r,i,a){const o=t.type;let s=Xo;if(o===oo||i===oo)s=e.timeFormat(r);else if(o===so||i===so)s=e.utcFormat(r);else if($o(o)){const i=e.formatFloat(r);if(a||t.bins)s=i;else{const e=ns(t,n,!1);s=t=>e(t)?i(t):""}}else if(t.tickFormat){const i=t.domain();s=e.formatSpan(i[0],i[i.length-1],n,r)}else r&&(s=e.format(r));return s}function ns(e,t,n){const r=es(e,t),i=e.base(),a=Math.log(i),o=Math.max(1,i*t/r.length),s=e=>{let t=e/Math.pow(i,Math.round(Math.log(e)/a));return t*i<i-.5&&(t*=i),t<=o};return n?r.filter(s):s}const rs={[lo]:"quantiles",[co]:"thresholds",[fo]:"domain"},is={[lo]:"quantiles",[co]:"domain"};function as(e,t){return e.bins?function(e){const t=e.slice(0,-1);return t.max=W(e),t}(e.bins):e.type===no?ns(e,t,!0):rs[e.type]?function(e){const t=[-1/0].concat(e);return t.max=1/0,t}(e[rs[e.type]]()):es(e,t)}function os(e,t,n,r,i,a,o){const s=is[t.type]&&a!==oo&&a!==so?function(e,t,n){const r=t[is[t.type]](),i=r.length;let a,o=i>1?r[1]-r[0]:r[0];for(a=1;a<i;++a)o=Math.min(o,r[a]-r[a-1]);return e.formatSpan(0,o,30,n)}(e,t,i):ts(e,t,n,i,a,o);return r===Yo&&(e=>rs[e.type]||e.bins)(t)?ss(s):"discrete"===r?ls(s):cs(s)}const ss=e=>(t,n,r)=>{const i=us(r[n+1],us(r.max,1/0)),a=ds(t,e),o=ds(i,e);return a&&o?a+" – "+o:o?"< "+o:"≥ "+a},us=(e,t)=>null!=e?e:t,ls=e=>(t,n)=>n?e(t):null,cs=e=>t=>e(t),ds=(e,t)=>Number.isFinite(e)?t(e):null;function fs(e,t,n,r){const i=r||t.type;return ze(n)&&function(e){return Bo(e,_o)}(i)&&(n=n.replace(/%a/g,"%A").replace(/%b/g,"%B")),n||i!==oo?n||i!==so?os(e,t,5,null,n,r,!0):e.utcFormat("%A, %d %B %Y, %X UTC"):e.timeFormat("%A, %d %B %Y, %X")}function hs(e,t,n){n=n||{};const r=Math.max(3,n.maxlen||7),i=fs(e,t,n.format,n.formatType);if(zo(t.type)){const e=as(t).slice(1).map(i),n=e.length;return`${n} boundar${1===n?"y":"ies"}: ${e.join(", ")}`}if(Ro(t.type)){const e=t.domain(),n=e.length;return`${n} value${1===n?"":"s"}: ${n>r?e.slice(0,r-2).map(i).join(", ")+", ending with "+e.slice(-1).map(i):e.map(i).join(", ")}`}{const e=t.domain();return`values from ${i(e[0])} to ${i(W(e))}`}}let ps=0;const ms="p_";function gs(e){return e&&e.gradient}function ys(e,t,n){const r=e.gradient;let i=e.id,a="radial"===r?ms:"";return i||(i=e.id="gradient_"+ps++,"radial"===r?(e.x1=vs(e.x1,.5),e.y1=vs(e.y1,.5),e.r1=vs(e.r1,0),e.x2=vs(e.x2,.5),e.y2=vs(e.y2,.5),e.r2=vs(e.r2,.5),a=ms):(e.x1=vs(e.x1,0),e.y1=vs(e.y1,0),e.x2=vs(e.x2,1),e.y2=vs(e.y2,0))),t[i]=e,"url("+(n||"")+"#"+a+i+")"}function vs(e,t){return null!=e?e:t}function bs(e,t){var n,r=[];return n={gradient:"linear",x1:e?e[0]:0,y1:e?e[1]:0,x2:t?t[0]:1,y2:t?t[1]:0,stops:r,stop:function(e,t){return r.push({offset:e,color:t}),n}}}const xs={basis:{curve:s.curveBasis},"basis-closed":{curve:s.curveBasisClosed},"basis-open":{curve:s.curveBasisOpen},bundle:{curve:s.curveBundle,tension:"beta",value:.85},cardinal:{curve:s.curveCardinal,tension:"tension",value:0},"cardinal-open":{curve:s.curveCardinalOpen,tension:"tension",value:0},"cardinal-closed":{curve:s.curveCardinalClosed,tension:"tension",value:0},"catmull-rom":{curve:s.curveCatmullRom,tension:"alpha",value:.5},"catmull-rom-closed":{curve:s.curveCatmullRomClosed,tension:"alpha",value:.5},"catmull-rom-open":{curve:s.curveCatmullRomOpen,tension:"alpha",value:.5},linear:{curve:s.curveLinear},"linear-closed":{curve:s.curveLinearClosed},monotone:{horizontal:s.curveMonotoneY,vertical:s.curveMonotoneX},natural:{curve:s.curveNatural},step:{curve:s.curveStep},"step-after":{curve:s.curveStepAfter},"step-before":{curve:s.curveStepBefore}};function _s(e,t,n){var r=Ae(xs,e)&&xs[e],i=null;return r&&(i=r.curve||r[t||"vertical"],r.tension&&null!=n&&(i=i[r.tension](n))),i}const ks={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},As=[/([MLHVCSQTAZmlhvcsqtaz])/g,/###/,/(\.\d+)(\.\d)/g,/(\d)([-+])/g,/\s|,|###/];function ws(e){const t=[];let n,r,i,a,o,s,u,l,c,d;const f=e.slice().replace(As[0],"###$1").split(As[1]).slice(1);for(u=0,c=f.length;u<c;++u){for(n=f[u],r=n.slice(1).trim().replace(As[2],"$1###$2").replace(As[3],"$1###$2").split(As[4]),o=n.charAt(0),i=[o],l=0,d=r.length;l<d;++l)(a=+r[l])===a&&i.push(a);if(s=ks[o.toLowerCase()],i.length-1>s){const e=i.length;for(l=1,t.push([o].concat(i.slice(l,l+=s))),o="M"===o?"L":"m"===o?"l":o;l<e;l+=s)t.push([o].concat(i.slice(l,l+s)))}else t.push(i)}return t}const Ds=Math.PI/180,Es=Math.PI/2,Cs=2*Math.PI,Fs=Math.sqrt(3)/2;var Ms={},Ss={},Bs=[].join;function Os(e){const t=Bs.call(e);if(Ss[t])return Ss[t];var n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5],u=e[6],l=e[7];const c=l*o,d=-u*s,f=u*o,h=l*s,p=Math.cos(i),m=Math.sin(i),g=Math.cos(a),y=Math.sin(a),v=.5*(a-i),b=Math.sin(.5*v),x=8/3*b*b/Math.sin(v),_=n+p-x*m,k=r+m+x*p,A=n+g,w=r+y,D=A+x*y,E=w-x*g;return Ss[t]=[c*_+d*k,f*_+h*k,c*D+d*E,f*D+h*E,c*A+d*w,f*A+h*w]}const Rs=["l",0,0,0,0,0,0,0];function zs(e,t,n){const r=Rs[0]=e[0];if("a"===r||"A"===r)Rs[1]=t*e[1],Rs[2]=n*e[2],Rs[3]=e[3],Rs[4]=e[4],Rs[5]=e[5],Rs[6]=t*e[6],Rs[7]=n*e[7];else if("h"===r||"H"===r)Rs[1]=t*e[1];else if("v"===r||"V"===r)Rs[1]=n*e[1];else for(var i=1,a=e.length;i<a;++i)Rs[i]=(i%2==1?t:n)*e[i];return Rs}function $s(e,t,n,r,i,a){var o,s,u,l,c,d=null,f=0,h=0,p=0,m=0;null==n&&(n=0),null==r&&(r=0),null==i&&(i=1),null==a&&(a=i),e.beginPath&&e.beginPath();for(var g=0,y=t.length;g<y;++g){switch(o=t[g],1===i&&1===a||(o=zs(o,i,a)),o[0]){case"l":f+=o[1],h+=o[2],e.lineTo(f+n,h+r);break;case"L":f=o[1],h=o[2],e.lineTo(f+n,h+r);break;case"h":f+=o[1],e.lineTo(f+n,h+r);break;case"H":f=o[1],e.lineTo(f+n,h+r);break;case"v":h+=o[1],e.lineTo(f+n,h+r);break;case"V":h=o[1],e.lineTo(f+n,h+r);break;case"m":f+=o[1],h+=o[2],e.moveTo(f+n,h+r);break;case"M":f=o[1],h=o[2],e.moveTo(f+n,h+r);break;case"c":s=f+o[5],u=h+o[6],p=f+o[3],m=h+o[4],e.bezierCurveTo(f+o[1]+n,h+o[2]+r,p+n,m+r,s+n,u+r),f=s,h=u;break;case"C":f=o[5],h=o[6],p=o[3],m=o[4],e.bezierCurveTo(o[1]+n,o[2]+r,p+n,m+r,f+n,h+r);break;case"s":s=f+o[3],u=h+o[4],p=2*f-p,m=2*h-m,e.bezierCurveTo(p+n,m+r,f+o[1]+n,h+o[2]+r,s+n,u+r),p=f+o[1],m=h+o[2],f=s,h=u;break;case"S":s=o[3],u=o[4],p=2*f-p,m=2*h-m,e.bezierCurveTo(p+n,m+r,o[1]+n,o[2]+r,s+n,u+r),f=s,h=u,p=o[1],m=o[2];break;case"q":s=f+o[3],u=h+o[4],p=f+o[1],m=h+o[2],e.quadraticCurveTo(p+n,m+r,s+n,u+r),f=s,h=u;break;case"Q":s=o[3],u=o[4],e.quadraticCurveTo(o[1]+n,o[2]+r,s+n,u+r),f=s,h=u,p=o[1],m=o[2];break;case"t":s=f+o[1],u=h+o[2],null===d[0].match(/[QqTt]/)?(p=f,m=h):"t"===d[0]?(p=2*f-l,m=2*h-c):"q"===d[0]&&(p=2*f-p,m=2*h-m),l=p,c=m,e.quadraticCurveTo(p+n,m+r,s+n,u+r),h=u,p=(f=s)+o[1],m=h+o[2];break;case"T":s=o[1],u=o[2],p=2*f-p,m=2*h-m,e.quadraticCurveTo(p+n,m+r,s+n,u+r),f=s,h=u;break;case"a":qs(e,f+n,h+r,[o[1],o[2],o[3],o[4],o[5],o[6]+f+n,o[7]+h+r]),f+=o[6],h+=o[7];break;case"A":qs(e,f+n,h+r,[o[1],o[2],o[3],o[4],o[5],o[6]+n,o[7]+r]),f=o[6],h=o[7];break;case"z":case"Z":e.closePath()}d=o}}function qs(e,t,n,r){const i=function(e,t,n,r,i,a,o,s,u){const l=Bs.call(arguments);if(Ms[l])return Ms[l];const c=o*Ds,d=Math.sin(c),f=Math.cos(c),h=f*(s-e)*.5+d*(u-t)*.5,p=f*(u-t)*.5-d*(s-e)*.5;let m=h*h/((n=Math.abs(n))*n)+p*p/((r=Math.abs(r))*r);m>1&&(m=Math.sqrt(m),n*=m,r*=m);const g=f/n,y=d/n,v=-d/r,b=f/r,x=g*s+y*u,_=v*s+b*u,k=g*e+y*t,A=v*e+b*t;let w=1/((k-x)*(k-x)+(A-_)*(A-_))-.25;w<0&&(w=0);let D=Math.sqrt(w);a==i&&(D=-D);const E=.5*(x+k)-D*(A-_),C=.5*(_+A)+D*(k-x),F=Math.atan2(_-C,x-E);let M=Math.atan2(A-C,k-E)-F;M<0&&1===a?M+=Cs:M>0&&0===a&&(M-=Cs);const S=Math.ceil(Math.abs(M/(Es+.001))),B=[];for(let e=0;e<S;++e){const t=F+e*M/S,i=F+(e+1)*M/S;B[e]=[E,C,t,i,n,r,d,f]}return Ms[l]=B}(r[5],r[6],r[0],r[1],r[3],r[4],r[2],t,n);for(let t=0;t<i.length;++t){const n=Os(i[t]);e.bezierCurveTo(n[0],n[1],n[2],n[3],n[4],n[5])}}const Ls=.5773502691896257,Ts={circle:{draw:function(e,t){const n=Math.sqrt(t)/2;e.moveTo(n,0),e.arc(0,0,n,0,Cs)}},cross:{draw:function(e,t){var n=Math.sqrt(t)/2,r=n/2.5;e.moveTo(-n,-r),e.lineTo(-n,r),e.lineTo(-r,r),e.lineTo(-r,n),e.lineTo(r,n),e.lineTo(r,r),e.lineTo(n,r),e.lineTo(n,-r),e.lineTo(r,-r),e.lineTo(r,-n),e.lineTo(-r,-n),e.lineTo(-r,-r),e.closePath()}},diamond:{draw:function(e,t){const n=Math.sqrt(t)/2;e.moveTo(-n,0),e.lineTo(0,-n),e.lineTo(n,0),e.lineTo(0,n),e.closePath()}},square:{draw:function(e,t){var n=Math.sqrt(t),r=-n/2;e.rect(r,r,n,n)}},arrow:{draw:function(e,t){var n=Math.sqrt(t)/2,r=n/7,i=n/2.5,a=n/8;e.moveTo(-r,n),e.lineTo(r,n),e.lineTo(r,-a),e.lineTo(i,-a),e.lineTo(0,-n),e.lineTo(-i,-a),e.lineTo(-r,-a),e.closePath()}},wedge:{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n,i=r-n*Ls,a=n/4;e.moveTo(0,-r-i),e.lineTo(-a,r-i),e.lineTo(a,r-i),e.closePath()}},triangle:{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n,i=r-n*Ls;e.moveTo(0,-r-i),e.lineTo(-n,r-i),e.lineTo(n,r-i),e.closePath()}},"triangle-up":{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n;e.moveTo(0,-r),e.lineTo(-n,r),e.lineTo(n,r),e.closePath()}},"triangle-down":{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n;e.moveTo(0,r),e.lineTo(-n,-r),e.lineTo(n,-r),e.closePath()}},"triangle-right":{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n;e.moveTo(r,0),e.lineTo(-r,-n),e.lineTo(-r,n),e.closePath()}},"triangle-left":{draw:function(e,t){var n=Math.sqrt(t)/2,r=Fs*n;e.moveTo(-r,0),e.lineTo(r,-n),e.lineTo(r,n),e.closePath()}},stroke:{draw:function(e,t){const n=Math.sqrt(t)/2;e.moveTo(-n,0),e.lineTo(n,0)}}};function Ns(e){return Ae(Ts,e)?Ts[e]:function(e){if(!Ae(Ps,e)){const t=ws(e);Ps[e]={draw:function(e,n){$s(e,t,0,0,Math.sqrt(n)/2)}}}return Ps[e]}(e)}var Ps={};const Us=.448084975506;function js(e){return e.x}function Is(e){return e.y}function Ws(e){return e.width}function Hs(e){return e.height}function Gs(e){return"function"==typeof e?e:()=>+e}function Vs(e,t,n){return Math.max(t,Math.min(e,n))}function Ys(){var e=js,t=Is,n=Ws,r=Hs,i=Gs(0),a=i,o=i,s=i,l=null;function c(c,d,f){var h,p=null!=d?d:+e.call(this,c),m=null!=f?f:+t.call(this,c),g=+n.call(this,c),y=+r.call(this,c),v=Math.min(g,y)/2,b=Vs(+i.call(this,c),0,v),x=Vs(+a.call(this,c),0,v),_=Vs(+o.call(this,c),0,v),k=Vs(+s.call(this,c),0,v);if(l||(l=h=u.path()),b<=0&&x<=0&&_<=0&&k<=0)l.rect(p,m,g,y);else{var A=p+g,w=m+y;l.moveTo(p+b,m),l.lineTo(A-x,m),l.bezierCurveTo(A-Us*x,m,A,m+Us*x,A,m+x),l.lineTo(A,w-k),l.bezierCurveTo(A,w-Us*k,A-Us*k,w,A-k,w),l.lineTo(p+_,w),l.bezierCurveTo(p+Us*_,w,p,w-Us*_,p,w-_),l.lineTo(p,m+b),l.bezierCurveTo(p,m+Us*b,p+Us*b,m,p+b,m),l.closePath()}if(h)return l=null,h+""||null}return c.x=function(t){return arguments.length?(e=Gs(t),c):e},c.y=function(e){return arguments.length?(t=Gs(e),c):t},c.width=function(e){return arguments.length?(n=Gs(e),c):n},c.height=function(e){return arguments.length?(r=Gs(e),c):r},c.cornerRadius=function(e,t,n,r){return arguments.length?(i=Gs(e),a=null!=t?Gs(t):i,s=null!=n?Gs(n):i,o=null!=r?Gs(r):a,c):i},c.context=function(e){return arguments.length?(l=null==e?null:e,c):l},c}function Xs(){var e,t,n,r,i,a,o,s,l=null;function c(e,t,n){const r=n/2;if(i){var u=o-t,c=e-a;if(u||c){var d=Math.sqrt(u*u+c*c),f=(u/=d)*s,h=(c/=d)*s,p=Math.atan2(c,u);l.moveTo(a-f,o-h),l.lineTo(e-u*r,t-c*r),l.arc(e,t,r,p-Math.PI,p),l.lineTo(a+f,o+h),l.arc(a,o,s,p,p+Math.PI)}else l.arc(e,t,r,0,Cs);l.closePath()}else i=1;a=e,o=t,s=r}function d(a){var o,s,d,f=a.length,h=!1;for(null==l&&(l=d=u.path()),o=0;o<=f;++o)!(o<f&&r(s=a[o],o,a))===h&&(h=!h)&&(i=0),h&&c(+e(s,o,a),+t(s,o,a),+n(s,o,a));if(d)return l=null,d+""||null}return d.x=function(t){return arguments.length?(e=t,d):e},d.y=function(e){return arguments.length?(t=e,d):t},d.size=function(e){return arguments.length?(n=e,d):n},d.defined=function(e){return arguments.length?(r=e,d):r},d.context=function(e){return arguments.length?(l=null==e?null:e,d):l},d}function Js(e,t){return null!=e?e:t}const Qs=e=>e.x||0,Ks=e=>e.y||0,Zs=e=>!(!1===e.defined),eu=s.arc().startAngle((e=>e.startAngle||0)).endAngle((e=>e.endAngle||0)).padAngle((e=>e.padAngle||0)).innerRadius((e=>e.innerRadius||0)).outerRadius((e=>e.outerRadius||0)).cornerRadius((e=>e.cornerRadius||0)),tu=s.area().x(Qs).y1(Ks).y0((e=>(e.y||0)+(e.height||0))).defined(Zs),nu=s.area().y(Ks).x1(Qs).x0((e=>(e.x||0)+(e.width||0))).defined(Zs),ru=s.line().x(Qs).y(Ks).defined(Zs),iu=Ys().x(Qs).y(Ks).width((e=>e.width||0)).height((e=>e.height||0)).cornerRadius((e=>Js(e.cornerRadiusTopLeft,e.cornerRadius)||0),(e=>Js(e.cornerRadiusTopRight,e.cornerRadius)||0),(e=>Js(e.cornerRadiusBottomRight,e.cornerRadius)||0),(e=>Js(e.cornerRadiusBottomLeft,e.cornerRadius)||0)),au=s.symbol().type((e=>Ns(e.shape||"circle"))).size((e=>Js(e.size,64))),ou=Xs().x(Qs).y(Ks).defined(Zs).size((e=>e.size||1));function su(e){return e.cornerRadius||e.cornerRadiusTopLeft||e.cornerRadiusTopRight||e.cornerRadiusBottomRight||e.cornerRadiusBottomLeft}function uu(e,t,n,r){return iu.context(e)(t,n,r)}var lu=1;function cu(){lu=1}function du(e,t,n){var r=t.clip,i=e._defs,a=t.clip_id||(t.clip_id="clip"+lu++),o=i.clipping[a]||(i.clipping[a]={id:a});return de(r)?o.path=r(null):su(n)?o.path=uu(null,n,0,0):(o.width=n.width||0,o.height=n.height||0),"url(#"+a+")"}function fu(e){this.clear(),e&&this.union(e)}function hu(e){this.mark=e,this.bounds=this.bounds||new fu}function pu(e){hu.call(this,e),this.items=this.items||[]}function mu(e){this._pending=0,this._loader=e||Gn()}function gu(e){e._pending+=1}function yu(e){e._pending-=1}function vu(e,t,n){if(t.stroke&&0!==t.opacity&&0!==t.strokeOpacity){const r=null!=t.strokeWidth?+t.strokeWidth:1;e.expand(r+(n?function(e,t){return e.strokeJoin&&"miter"!==e.strokeJoin?0:t}(t,r):0))}return e}fu.prototype={clone(){return new fu(this)},clear(){return this.x1=+Number.MAX_VALUE,this.y1=+Number.MAX_VALUE,this.x2=-Number.MAX_VALUE,this.y2=-Number.MAX_VALUE,this},empty(){return this.x1===+Number.MAX_VALUE&&this.y1===+Number.MAX_VALUE&&this.x2===-Number.MAX_VALUE&&this.y2===-Number.MAX_VALUE},equals(e){return this.x1===e.x1&&this.y1===e.y1&&this.x2===e.x2&&this.y2===e.y2},set(e,t,n,r){return n<e?(this.x2=e,this.x1=n):(this.x1=e,this.x2=n),r<t?(this.y2=t,this.y1=r):(this.y1=t,this.y2=r),this},add(e,t){return e<this.x1&&(this.x1=e),t<this.y1&&(this.y1=t),e>this.x2&&(this.x2=e),t>this.y2&&(this.y2=t),this},expand(e){return this.x1-=e,this.y1-=e,this.x2+=e,this.y2+=e,this},round(){return this.x1=Math.floor(this.x1),this.y1=Math.floor(this.y1),this.x2=Math.ceil(this.x2),this.y2=Math.ceil(this.y2),this},scale(e){return this.x1*=e,this.y1*=e,this.x2*=e,this.y2*=e,this},translate(e,t){return this.x1+=e,this.x2+=e,this.y1+=t,this.y2+=t,this},rotate(e,t,n){const r=this.rotatedPoints(e,t,n);return this.clear().add(r[0],r[1]).add(r[2],r[3]).add(r[4],r[5]).add(r[6],r[7])},rotatedPoints(e,t,n){var{x1:r,y1:i,x2:a,y2:o}=this,s=Math.cos(e),u=Math.sin(e),l=t-t*s+n*u,c=n-t*u-n*s;return[s*r-u*i+l,u*r+s*i+c,s*r-u*o+l,u*r+s*o+c,s*a-u*i+l,u*a+s*i+c,s*a-u*o+l,u*a+s*o+c]},union(e){return e.x1<this.x1&&(this.x1=e.x1),e.y1<this.y1&&(this.y1=e.y1),e.x2>this.x2&&(this.x2=e.x2),e.y2>this.y2&&(this.y2=e.y2),this},intersect(e){return e.x1>this.x1&&(this.x1=e.x1),e.y1>this.y1&&(this.y1=e.y1),e.x2<this.x2&&(this.x2=e.x2),e.y2<this.y2&&(this.y2=e.y2),this},encloses(e){return e&&this.x1<=e.x1&&this.x2>=e.x2&&this.y1<=e.y1&&this.y2>=e.y2},alignsWith(e){return e&&(this.x1==e.x1||this.x2==e.x2||this.y1==e.y1||this.y2==e.y2)},intersects(e){return e&&!(this.x2<e.x1||this.x1>e.x2||this.y2<e.y1||this.y1>e.y2)},contains(e,t){return!(e<this.x1||e>this.x2||t<this.y1||t>this.y2)},width(){return this.x2-this.x1},height(){return this.y2-this.y1}},Ce(pu,hu),mu.prototype={pending(){return this._pending},sanitizeURL(e){const t=this;return gu(t),t._loader.sanitize(e,{context:"href"}).then((e=>(yu(t),e))).catch((()=>(yu(t),null)))},loadImage(e){const t=this,n=Za();return gu(t),t._loader.sanitize(e,{context:"image"}).then((e=>{const r=e.href;if(!r||!n)throw{url:r};const i=new n,a=Ae(e,"crossOrigin")?e.crossOrigin:"anonymous";return null!=a&&(i.crossOrigin=a),i.onload=()=>yu(t),i.onerror=()=>yu(t),i.src=r,i})).catch((e=>(yu(t),{complete:!1,width:0,height:0,src:e&&e.url||""})))},ready(){const e=this;return new Promise((t=>{!function n(r){e.pending()?setTimeout((()=>{n(!0)}),10):t(r)}(!1)}))}};const bu=Cs-1e-8;let xu,_u,ku,Au,wu,Du,Eu,Cu;const Fu=(e,t)=>xu.add(e,t),Mu=(e,t)=>Fu(_u=e,ku=t),Su=e=>Fu(e,xu.y1),Bu=e=>Fu(xu.x1,e),Ou=(e,t)=>wu*e+Eu*t,Ru=(e,t)=>Du*e+Cu*t,zu=(e,t)=>Fu(Ou(e,t),Ru(e,t)),$u=(e,t)=>Mu(Ou(e,t),Ru(e,t));function qu(e,t){return xu=e,t?(Au=t*Ds,wu=Cu=Math.cos(Au),Du=Math.sin(Au),Eu=-Du):(wu=Cu=1,Au=Du=Eu=0),Lu}const Lu={beginPath(){},closePath(){},moveTo:$u,lineTo:$u,rect(e,t,n,r){Au?(zu(e+n,t),zu(e+n,t+r),zu(e,t+r),$u(e,t)):(Fu(e+n,t+r),Mu(e,t))},quadraticCurveTo(e,t,n,r){const i=Ou(e,t),a=Ru(e,t),o=Ou(n,r),s=Ru(n,r);Tu(_u,i,o,Su),Tu(ku,a,s,Bu),Mu(o,s)},bezierCurveTo(e,t,n,r,i,a){const o=Ou(e,t),s=Ru(e,t),u=Ou(n,r),l=Ru(n,r),c=Ou(i,a),d=Ru(i,a);Nu(_u,o,u,c,Su),Nu(ku,s,l,d,Bu),Mu(c,d)},arc(e,t,n,r,i,a){if(r+=Au,i+=Au,_u=n*Math.cos(i)+e,ku=n*Math.sin(i)+t,Math.abs(i-r)>bu)Fu(e-n,t-n),Fu(e+n,t+n);else{const o=r=>Fu(n*Math.cos(r)+e,n*Math.sin(r)+t);let s,u;if(o(r),o(i),i!==r)if((r%=Cs)<0&&(r+=Cs),(i%=Cs)<0&&(i+=Cs),i<r&&(a=!a,s=r,r=i,i=s),a)for(i-=Cs,s=r-r%Es,u=0;u<4&&s>i;++u,s-=Es)o(s);else for(s=r-r%Es+Es,u=0;u<4&&s<i;++u,s+=Es)o(s)}}};function Tu(e,t,n,r){const i=(e-t)/(e+n-2*t);0<i&&i<1&&r(e+(t-e)*i)}function Nu(e,t,n,r,i){const a=r-e+3*t-3*n,o=e+n-2*t,s=e-t;let u,l=0,c=0;Math.abs(a)>1e-14?(u=o*o+s*a,u>=0&&(u=Math.sqrt(u),l=(-o+u)/a,c=(-o-u)/a)):l=.5*s/o,0<l&&l<1&&i(Pu(l,e,t,n,r)),0<c&&c<1&&i(Pu(c,e,t,n,r))}function Pu(e,t,n,r,i){const a=1-e,o=a*a,s=e*e;return o*a*t+3*o*e*n+3*a*s*r+s*e*i}var Uu=(Uu=Ka(1,1))?Uu.getContext("2d"):null;const ju=new fu;function Iu(e){return function(t,n){if(!Uu)return!0;e(Uu,t),ju.clear().union(t.bounds).intersect(n).round();const{x1:r,y1:i,x2:a,y2:o}=ju;for(let e=i;e<=o;++e)for(let t=r;t<=a;++t)if(Uu.isPointInPath(t,e))return!0;return!1}}function Wu(e,t){return t.contains(e.x||0,e.y||0)}function Hu(e,t){const n=e.x||0,r=e.y||0,i=e.width||0,a=e.height||0;return t.intersects(ju.set(n,r,n+i,r+a))}function Gu(e,t){const n=e.x||0,r=e.y||0;return Vu(t,n,r,null!=e.x2?e.x2:n,null!=e.y2?e.y2:r)}function Vu(e,t,n,r,i){const{x1:a,y1:o,x2:s,y2:u}=e,l=r-t,c=i-n;let d,f,h,p,m=0,g=1;for(p=0;p<4;++p){if(0===p&&(d=-l,f=-(a-t)),1===p&&(d=l,f=s-t),2===p&&(d=-c,f=-(o-n)),3===p&&(d=c,f=u-n),Math.abs(d)<1e-10&&f<0)return!1;if(h=f/d,d<0){if(h>g)return!1;h>m&&(m=h)}else if(d>0){if(h<m)return!1;h<g&&(g=h)}}return!0}function Yu(e,t){e.globalCompositeOperation=t.blend||"source-over"}function Xu(e,t){return null==e?t:e}function Ju(e,t){const n=t.length;for(let r=0;r<n;++r)e.addColorStop(t[r].offset,t[r].color);return e}function Qu(e,t,n){return gs(n)?function(e,t,n){const r=n.width(),i=n.height();let a;if("radial"===t.gradient)a=e.createRadialGradient(n.x1+Xu(t.x1,.5)*r,n.y1+Xu(t.y1,.5)*i,Math.max(r,i)*Xu(t.r1,0),n.x1+Xu(t.x2,.5)*r,n.y1+Xu(t.y2,.5)*i,Math.max(r,i)*Xu(t.r2,.5));else{const o=Xu(t.x1,0),s=Xu(t.y1,0),u=Xu(t.x2,1),l=Xu(t.y2,0);if(o!==u&&s!==l&&r!==i){const n=Ka(Math.ceil(r),Math.ceil(i)),a=n.getContext("2d");return a.scale(r,i),a.fillStyle=Ju(a.createLinearGradient(o,s,u,l),t.stops),a.fillRect(0,0,r,i),e.createPattern(n,"no-repeat")}a=e.createLinearGradient(n.x1+o*r,n.y1+s*i,n.x1+u*r,n.y1+l*i)}return Ju(a,t.stops)}(e,n,t.bounds):n}function Ku(e,t,n){return(n*=null==t.fillOpacity?1:t.fillOpacity)>0&&(e.globalAlpha=n,e.fillStyle=Qu(e,t,t.fill),!0)}var Zu=[];function el(e,t,n){var r=null!=(r=t.strokeWidth)?r:1;return!(r<=0)&&((n*=null==t.strokeOpacity?1:t.strokeOpacity)>0&&(e.globalAlpha=n,e.strokeStyle=Qu(e,t,t.stroke),e.lineWidth=r,e.lineCap=t.strokeCap||"butt",e.lineJoin=t.strokeJoin||"miter",e.miterLimit=t.strokeMiterLimit||10,e.setLineDash&&(e.setLineDash(t.strokeDash||Zu),e.lineDashOffset=t.strokeDashOffset||0),!0))}function tl(e,t){return e.zindex-t.zindex||e.index-t.index}function nl(e){if(!e.zdirty)return e.zitems;var t,n,r,i=e.items,a=[];for(n=0,r=i.length;n<r;++n)(t=i[n]).index=n,t.zindex&&a.push(t);return e.zdirty=!1,e.zitems=a.sort(tl)}function rl(e,t){var n,r,i=e.items;if(!i||!i.length)return;const a=nl(e);if(a&&a.length){for(n=0,r=i.length;n<r;++n)i[n].zindex||t(i[n]);i=a}for(n=0,r=i.length;n<r;++n)t(i[n])}function il(e,t){var n,r,i=e.items;if(!i||!i.length)return null;const a=nl(e);for(a&&a.length&&(i=a),r=i.length;--r>=0;)if(n=t(i[r]))return n;if(i===a)for(r=(i=e.items).length;--r>=0;)if(!i[r].zindex&&(n=t(i[r])))return n;return null}function al(e){return function(t,n,r){rl(n,(n=>{r&&!r.intersects(n.bounds)||sl(e,t,n,n)}))}}function ol(e){return function(t,n,r){!n.items.length||r&&!r.intersects(n.bounds)||sl(e,t,n.items[0],n.items)}}function sl(e,t,n,r){var i=null==n.opacity?1:n.opacity;0!==i&&(e(t,r)||(Yu(t,n),n.fill&&Ku(t,n,i)&&t.fill(),n.stroke&&el(t,n,i)&&t.stroke()))}function ul(e){return e=e||z,function(t,n,r,i,a,o){return r*=t.pixelRatio,i*=t.pixelRatio,il(n,(n=>{const s=n.bounds;if((!s||s.contains(a,o))&&s)return e(t,n,r,i,a,o)?n:void 0}))}}function ll(e,t){return function(n,r,i,a){var o,s,u=Array.isArray(r)?r[0]:r,l=null==t?u.fill:t,c=u.stroke&&n.isPointInStroke;return c&&(o=u.strokeWidth,s=u.strokeCap,n.lineWidth=null!=o?o:1,n.lineCap=null!=s?s:"butt"),!e(n,r)&&(l&&n.isPointInPath(i,a)||c&&n.isPointInStroke(i,a))}}function cl(e){return ul(ll(e))}function dl(e,t){return"translate("+e+","+t+")"}function fl(e){return"rotate("+e+")"}function hl(e){return dl(e.x||0,e.y||0)}function pl(e,t,n){function r(e,n){var r=n.x||0,i=n.y||0,a=n.angle||0;e.translate(r,i),a&&e.rotate(a*=Ds),e.beginPath(),t(e,n),a&&e.rotate(-a),e.translate(-r,-i)}return{type:e,tag:"path",nested:!1,attr:function(e,n){e("transform",function(e){return dl(e.x||0,e.y||0)+(e.angle?" "+fl(e.angle):"")}(n)),e("d",t(null,n))},bound:function(e,n){return t(qu(e,n.angle),n),vu(e,n).translate(n.x||0,n.y||0)},draw:al(r),pick:cl(r),isect:n||Iu(r)}}var ml=pl("arc",(function(e,t){return eu.context(e)(t)}));function gl(e,t,n){function r(e,n){e.beginPath(),t(e,n)}const i=ll(r);return{type:e,tag:"path",nested:!0,attr:function(e,n){var r=n.mark.items;r.length&&e("d",t(null,r))},bound:function(e,n){var r=n.items;return 0===r.length?e:(t(qu(e),r),vu(e,r[0]))},draw:ol(r),pick:function(e,t,n,r,a,o){var s=t.items,u=t.bounds;return!s||!s.length||u&&!u.contains(a,o)?null:(n*=e.pixelRatio,r*=e.pixelRatio,i(e,s,n,r)?s[0]:null)},isect:Wu,tip:n}}var yl=gl("area",(function(e,t){const n=t[0],r=n.interpolate||"linear";return("horizontal"===n.orient?nu:tu).curve(_s(r,n.orient,n.tension)).context(e)(t)}),(function(e,t){for(var n,r,i="horizontal"===e[0].orient?t[1]:t[0],a="horizontal"===e[0].orient?"y":"x",o=e.length,s=1/0;--o>=0;)!1!==e[o].defined&&(r=Math.abs(e[o][a]-i))<s&&(s=r,n=e[o]);return n}));function vl(e,t){e.beginPath(),su(t)?uu(e,t,0,0):e.rect(0,0,t.width||0,t.height||0),e.clip()}function bl(e){const t=Xu(e.strokeWidth,1);return null!=e.strokeOffset?e.strokeOffset:e.stroke&&t>.5&&t<1.5?.5-Math.abs(t-1):0}function xl(e,t){const n=bl(t);e("d",uu(null,t,n,n))}function _l(e,t,n,r){const i=bl(t);e.beginPath(),uu(e,t,(n||0)+i,(r||0)+i)}const kl=ll(_l),Al=ll(_l,!1),wl=ll(_l,!0);var Dl={type:"group",tag:"g",nested:!1,attr:function(e,t){e("transform",hl(t))},bound:function(e,t){if(!t.clip&&t.items){const n=t.items,r=n.length;for(let t=0;t<r;++t)e.union(n[t].bounds)}return(t.clip||t.width||t.height)&&!t.noBound&&e.add(0,0).add(t.width||0,t.height||0),vu(e,t),e.translate(t.x||0,t.y||0)},draw:function(e,t,n){rl(t,(t=>{const r=t.x||0,i=t.y||0,a=t.strokeForeground,o=null==t.opacity?1:t.opacity;(t.stroke||t.fill)&&o&&(_l(e,t,r,i),Yu(e,t),t.fill&&Ku(e,t,o)&&e.fill(),t.stroke&&!a&&el(e,t,o)&&e.stroke()),e.save(),e.translate(r,i),t.clip&&vl(e,t),n&&n.translate(-r,-i),rl(t,(t=>{this.draw(e,t,n)})),n&&n.translate(r,i),e.restore(),a&&t.stroke&&o&&(_l(e,t,r,i),Yu(e,t),el(e,t,o)&&e.stroke())}))},pick:function(e,t,n,r,i,a){if(t.bounds&&!t.bounds.contains(i,a)||!t.items)return null;const o=n*e.pixelRatio,s=r*e.pixelRatio;return il(t,(u=>{let l,c,d;const f=u.bounds;if(f&&!f.contains(i,a))return;c=u.x||0,d=u.y||0;const h=c+(u.width||0),p=d+(u.height||0),m=u.clip;if(m&&(i<c||i>h||a<d||a>p))return;if(e.save(),e.translate(c,d),c=i-c,d=a-d,m&&su(u)&&!wl(e,u,o,s))return e.restore(),null;const g=u.strokeForeground,y=!1!==t.interactive;return y&&g&&u.stroke&&Al(e,u,o,s)?(e.restore(),u):(l=il(u,(e=>function(e,t,n){return(!1!==e.interactive||"group"===e.marktype)&&e.bounds&&e.bounds.contains(t,n)}(e,c,d)?this.pick(e,n,r,c,d):null)),!l&&y&&(u.fill||!g&&u.stroke)&&kl(e,u,o,s)&&(l=u),e.restore(),l||null)}))},isect:Hu,content:function(e,t,n){e("clip-path",t.clip?du(n,t,t):null)},background:function(e,t){e("class","background"),e("aria-hidden",!0),xl(e,t)},foreground:function(e,t){e("class","foreground"),e("aria-hidden",!0),t.strokeForeground?xl(e,t):e("d","")}},El={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1"};function Cl(e,t){var n=e.image;return(!n||e.url&&e.url!==n.url)&&(n={complete:!1,width:0,height:0},t.loadImage(e.url).then((t=>{e.image=t,e.image.url=e.url}))),n}function Fl(e,t){return null!=e.width?e.width:t&&t.width?!1!==e.aspect&&e.height?e.height*t.width/t.height:t.width:0}function Ml(e,t){return null!=e.height?e.height:t&&t.height?!1!==e.aspect&&e.width?e.width*t.height/t.width:t.height:0}function Sl(e,t){return"center"===e?t/2:"right"===e?t:0}function Bl(e,t){return"middle"===e?t/2:"bottom"===e?t:0}var Ol={type:"image",tag:"image",nested:!1,attr:function(e,t,n){const r=Cl(t,n),i=Fl(t,r),a=Ml(t,r),o=(t.x||0)-Sl(t.align,i),s=(t.y||0)-Bl(t.baseline,a);e("href",!r.src&&r.toDataURL?r.toDataURL():r.src||"",El["xmlns:xlink"],"xlink:href"),e("transform",dl(o,s)),e("width",i),e("height",a),e("preserveAspectRatio",!1===t.aspect?"none":"xMidYMid")},bound:function(e,t){const n=t.image,r=Fl(t,n),i=Ml(t,n),a=(t.x||0)-Sl(t.align,r),o=(t.y||0)-Bl(t.baseline,i);return e.set(a,o,a+r,o+i)},draw:function(e,t,n){rl(t,(t=>{if(n&&!n.intersects(t.bounds))return;const r=Cl(t,this);let i=Fl(t,r),a=Ml(t,r);if(0===i||0===a)return;let o,s,u,l,c=(t.x||0)-Sl(t.align,i),d=(t.y||0)-Bl(t.baseline,a);!1!==t.aspect&&(s=r.width/r.height,u=t.width/t.height,s==s&&u==u&&s!==u&&(u<s?(l=i/s,d+=(a-l)/2,a=l):(l=a*s,c+=(i-l)/2,i=l))),(r.complete||r.toDataURL)&&(Yu(e,t),e.globalAlpha=null!=(o=t.opacity)?o:1,e.imageSmoothingEnabled=!1!==t.smooth,e.drawImage(r,c,d,i,a))}))},pick:ul(),isect:z,get:Cl,xOffset:Sl,yOffset:Bl},Rl=gl("line",(function(e,t){const n=t[0],r=n.interpolate||"linear";return ru.curve(_s(r,n.orient,n.tension)).context(e)(t)}),(function(e,t){for(var n,r,i=Math.pow(e[0].strokeWidth||1,2),a=e.length;--a>=0;)if(!1!==e[a].defined&&(n=e[a].x-t[0])*n+(r=e[a].y-t[1])*r<i)return e[a];return null}));function zl(e,t){var n=t.path;if(null==n)return!0;var r=t.x||0,i=t.y||0,a=t.scaleX||1,o=t.scaleY||1,s=(t.angle||0)*Ds,u=t.pathCache;u&&u.path===n||((t.pathCache=u=ws(n)).path=n),s&&e.rotate&&e.translate?(e.translate(r,i),e.rotate(s),$s(e,u,0,0,a,o),e.rotate(-s),e.translate(-r,-i)):$s(e,u,r,i,a,o)}var $l={type:"path",tag:"path",nested:!1,attr:function(e,t){var n=t.scaleX||1,r=t.scaleY||1;1===n&&1===r||e("vector-effect","non-scaling-stroke"),e("transform",function(e){return dl(e.x||0,e.y||0)+(e.angle?" "+fl(e.angle):"")+(e.scaleX||e.scaleY?" "+function(e,t){return"scale("+e+","+t+")"}(e.scaleX||1,e.scaleY||1):"")}(t)),e("d",t.path)},bound:function(e,t){return zl(qu(e,t.angle),t)?e.set(0,0,0,0):vu(e,t,!0)},draw:al(zl),pick:cl(zl),isect:Iu(zl)};function ql(e,t){e.beginPath(),uu(e,t)}var Ll={type:"rect",tag:"path",nested:!1,attr:function(e,t){e("d",uu(null,t))},bound:function(e,t){var n,r;return vu(e.set(n=t.x||0,r=t.y||0,n+t.width||0,r+t.height||0),t)},draw:al(ql),pick:cl(ql),isect:Hu};function Tl(e,t,n){var r,i,a,o;return!(!t.stroke||!el(e,t,n))&&(r=t.x||0,i=t.y||0,a=null!=t.x2?t.x2:r,o=null!=t.y2?t.y2:i,e.beginPath(),e.moveTo(r,i),e.lineTo(a,o),!0)}var Nl={type:"rule",tag:"line",nested:!1,attr:function(e,t){e("transform",hl(t)),e("x2",null!=t.x2?t.x2-(t.x||0):0),e("y2",null!=t.y2?t.y2-(t.y||0):0)},bound:function(e,t){var n,r;return vu(e.set(n=t.x||0,r=t.y||0,null!=t.x2?t.x2:n,null!=t.y2?t.y2:r),t)},draw:function(e,t,n){rl(t,(t=>{if(!n||n.intersects(t.bounds)){var r=null==t.opacity?1:t.opacity;r&&Tl(e,t,r)&&(Yu(e,t),e.stroke())}}))},pick:ul((function(e,t,n,r){return!!e.isPointInStroke&&(Tl(e,t,1)&&e.isPointInStroke(n,r))})),isect:Gu},Pl=pl("shape",(function(e,t){return(t.mark.shape||t.shape).context(e)(t)})),Ul=pl("symbol",(function(e,t){return au.context(e)(t)}),Wu);const jl=Le();var Il={height:Xl,measureWidth:Vl,estimateWidth:Hl,width:Hl,canvas:Wl};function Wl(e){Il.width=e&&Uu?Vl:Hl}function Hl(e,t){return Gl(Zl(e,t),Xl(e))}function Gl(e,t){return~~(.8*e.length*t)}function Vl(e,t){return Xl(e)<=0||!(t=Zl(e,t))?0:Yl(t,tc(e))}function Yl(e,t){const n=`(${t}) ${e}`;let r=jl.get(n);return void 0===r&&(Uu.font=t,r=Uu.measureText(e).width,jl.set(n,r)),r}function Xl(e){return null!=e.fontSize?+e.fontSize||0:11}function Jl(e){return null!=e.lineHeight?e.lineHeight:Xl(e)+2}function Ql(e){return t=e.lineBreak&&e.text&&!T(e.text)?e.text.split(e.lineBreak):e.text,T(t)?t.length>1?t:t[0]:t;var t}function Kl(e){const t=Ql(e);return(T(t)?t.length-1:0)*Jl(e)}function Zl(e,t){const n=null==t?"":(t+"").trim();return e.limit>0&&n.length?function(e,t){var n=+e.limit,r=function(e){if(Il.width===Vl){const t=tc(e);return e=>Yl(e,t)}{const t=Xl(e);return e=>Gl(e,t)}}(e);if(r(t)<n)return t;var i,a=e.ellipsis||"…",o="rtl"===e.dir,s=0,u=t.length;if(n-=r(a),o){for(;s<u;)i=s+u>>>1,r(t.slice(i))>n?s=i+1:u=i;return a+t.slice(s)}for(;s<u;)i=1+(s+u>>>1),r(t.slice(0,i))<n?s=i:u=i-1;return t.slice(0,s)+a}(e,n):n}function ec(e,t){var n=e.font;return(t&&n?String(n).replace(/"/g,"'"):n)||"sans-serif"}function tc(e,t){return(e.fontStyle?e.fontStyle+" ":"")+(e.fontVariant?e.fontVariant+" ":"")+(e.fontWeight?e.fontWeight+" ":"")+Xl(e)+"px "+ec(e,t)}function nc(e){var t=e.baseline,n=Xl(e);return Math.round("top"===t?.79*n:"middle"===t?.3*n:"bottom"===t?-.21*n:"line-top"===t?.29*n+.5*Jl(e):"line-bottom"===t?.29*n-.5*Jl(e):0)}Wl(!0);const rc={left:"start",center:"middle",right:"end"},ic=new fu;function ac(e){var t,n=e.x||0,r=e.y||0,i=e.radius||0;return i&&(t=(e.theta||0)-Es,n+=i*Math.cos(t),r+=i*Math.sin(t)),ic.x1=n,ic.y1=r,ic}function oc(e,t,n){var r,i=Il.height(t),a=t.align,o=ac(t),s=o.x1,u=o.y1,l=t.dx||0,c=(t.dy||0)+nc(t)-Math.round(.8*i),d=Ql(t);if(T(d)?(i+=Jl(t)*(d.length-1),r=d.reduce(((e,n)=>Math.max(e,Il.width(t,n))),0)):r=Il.width(t,d),"center"===a?l-=r/2:"right"===a&&(l-=r),e.set(l+=s,c+=u,l+r,c+i),t.angle&&!n)e.rotate(t.angle*Ds,s,u);else if(2===n)return e.rotatedPoints(t.angle*Ds,s,u);return e}var sc={type:"text",tag:"text",nested:!1,attr:function(e,t){var n,r=t.dx||0,i=(t.dy||0)+nc(t),a=ac(t),o=a.x1,s=a.y1,u=t.angle||0;e("text-anchor",rc[t.align]||"start"),u?(n=dl(o,s)+" "+fl(u),(r||i)&&(n+=" "+dl(r,i))):n=dl(o+r,s+i),e("transform",n)},bound:oc,draw:function(e,t,n){rl(t,(t=>{var r,i,a,o,s,u,l,c=null==t.opacity?1:t.opacity;if(!(n&&!n.intersects(t.bounds)||0===c||t.fontSize<=0||null==t.text||0===t.text.length)){if(e.font=tc(t),e.textAlign=t.align||"left",i=(r=ac(t)).x1,a=r.y1,t.angle&&(e.save(),e.translate(i,a),e.rotate(t.angle*Ds),i=a=0),i+=t.dx||0,a+=(t.dy||0)+nc(t),u=Ql(t),Yu(e,t),T(u))for(s=Jl(t),o=0;o<u.length;++o)l=Zl(t,u[o]),t.fill&&Ku(e,t,c)&&e.fillText(l,i,a),t.stroke&&el(e,t,c)&&e.strokeText(l,i,a),a+=s;else l=Zl(t,u),t.fill&&Ku(e,t,c)&&e.fillText(l,i,a),t.stroke&&el(e,t,c)&&e.strokeText(l,i,a);t.angle&&e.restore()}}))},pick:ul((function(e,t,n,r,i,a){if(t.fontSize<=0)return!1;if(!t.angle)return!0;var o=ac(t),s=o.x1,u=o.y1,l=oc(ic,t,1),c=-t.angle*Ds,d=Math.cos(c),f=Math.sin(c),h=d*i-f*a+(s-d*s+f*u),p=f*i+d*a+(u-f*s-d*u);return l.contains(h,p)})),isect:function(e,t){const n=oc(ic,e,2);return Vu(t,n[0],n[1],n[2],n[3])||Vu(t,n[0],n[1],n[4],n[5])||Vu(t,n[4],n[5],n[6],n[7])||Vu(t,n[2],n[3],n[6],n[7])}},uc=gl("trail",(function(e,t){return ou.context(e)(t)}),(function(e,t){for(var n,r,i=e.length;--i>=0;)if(!1!==e[i].defined&&(n=e[i].x-t[0])*n+(r=e[i].y-t[1])*r<(n=e[i].size||1)*n)return e[i];return null})),lc={arc:ml,area:yl,group:Dl,image:Ol,line:Rl,path:$l,rect:Ll,rule:Nl,shape:Pl,symbol:Ul,text:sc,trail:uc};function cc(e,t,n){var r=lc[e.mark.marktype],i=t||r.bound;return r.nested&&(e=e.mark),i(e.bounds||(e.bounds=new fu),e,n)}var dc={mark:null};function fc(e,t,n){var r,i,a,o,s=lc[e.marktype],u=s.bound,l=e.items,c=l&&l.length;if(s.nested)return c?a=l[0]:(dc.mark=e,a=dc),o=cc(a,u,n),t=t&&t.union(o)||o;if(t=t||e.bounds&&e.bounds.clear()||new fu,c)for(r=0,i=l.length;r<i;++r)t.union(cc(l[r],u,n));return e.bounds=t}const hc=["marktype","name","role","interactive","clip","items","zindex","x","y","width","height","align","baseline","fill","fillOpacity","opacity","blend","stroke","strokeOpacity","strokeWidth","strokeCap","strokeDash","strokeDashOffset","strokeForeground","strokeOffset","startAngle","endAngle","innerRadius","outerRadius","cornerRadius","padAngle","cornerRadiusTopLeft","cornerRadiusTopRight","cornerRadiusBottomLeft","cornerRadiusBottomRight","interpolate","tension","orient","defined","url","aspect","smooth","path","scaleX","scaleY","x2","y2","size","shape","text","angle","theta","radius","dir","dx","dy","ellipsis","limit","lineBreak","lineHeight","font","fontSize","fontWeight","fontStyle","fontVariant","description","aria","ariaRole","ariaRoleDescription"];function pc(e,t){return JSON.stringify(e,hc,t)}function mc(e){return gc("string"==typeof e?JSON.parse(e):e)}function gc(e){var t,n,r,i=e.marktype,a=e.items;if(a)for(n=0,r=a.length;n<r;++n)t=i?"mark":"group",a[n][t]=e,a[n].zindex&&(a[n][t].zdirty=!0),"group"===(i||t)&&gc(a[n]);return i&&fc(e),e}function yc(e){arguments.length?this.root=mc(e):(this.root=vc({marktype:"group",name:"root",role:"frame"}),this.root.items=[new pu(this.root)])}function vc(e,t){const n={bounds:new fu,clip:!!e.clip,group:t,interactive:!1!==e.interactive,items:[],marktype:e.marktype,name:e.name||void 0,role:e.role||void 0,zindex:e.zindex||0};return null!=e.aria&&(n.aria=e.aria),e.description&&(n.description=e.description),n}function bc(e,t,n){return!e&&"undefined"!=typeof document&&document.createElement&&(e=document),e?n?e.createElementNS(n,t):e.createElement(t):null}function xc(e,t){t=t.toLowerCase();for(var n=e.childNodes,r=0,i=n.length;r<i;++r)if(n[r].tagName.toLowerCase()===t)return n[r]}function _c(e,t,n,r){var i,a=e.childNodes[t];return a&&a.tagName.toLowerCase()===n.toLowerCase()||(i=a||null,a=bc(e.ownerDocument,n,r),e.insertBefore(a,i)),a}function kc(e,t){for(var n=e.childNodes,r=n.length;r>t;)e.removeChild(n[--r]);return e}function Ac(e){return"mark-"+e.marktype+(e.role?" role-"+e.role:"")+(e.name?" "+e.name:"")}function wc(e,t){const n=t.getBoundingClientRect();return[e.clientX-n.left-(t.clientLeft||0),e.clientY-n.top-(t.clientTop||0)]}function Dc(e,t){this._active=null,this._handlers={},this._loader=e||Gn(),this._tooltip=t||Ec}function Ec(e,t,n,r){e.element().setAttribute("title",r||"")}function Cc(e){this._el=null,this._bgcolor=null,this._loader=new mu(e)}yc.prototype={toJSON(e){return pc(this.root,e||0)},mark(e,t,n){const r=vc(e,t=t||this.root.items[0]);return t.items[n]=r,r.zindex&&(r.group.zdirty=!0),r}},Dc.prototype={initialize(e,t,n){return this._el=e,this._obj=n||null,this.origin(t)},element(){return this._el},canvas(){return this._el&&this._el.firstChild},origin(e){return arguments.length?(this._origin=e||[0,0],this):this._origin.slice()},scene(e){return arguments.length?(this._scene=e,this):this._scene},on(){},off(){},_handlerIndex(e,t,n){for(let r=e?e.length:0;--r>=0;)if(e[r].type===t&&(!n||e[r].handler===n))return r;return-1},handlers(e){const t=this._handlers,n=[];if(e)n.push(...t[this.eventName(e)]);else for(const e in t)n.push(...t[e]);return n},eventName(e){const t=e.indexOf(".");return t<0?e:e.slice(0,t)},handleHref(e,t,n){this._loader.sanitize(n,{context:"href"}).then((t=>{const n=new MouseEvent(e.type,e),r=bc(null,"a");for(const e in t)r.setAttribute(e,t[e]);r.dispatchEvent(n)})).catch((()=>{}))},handleTooltip(e,t,n){if(t&&null!=t.tooltip){t=function(e,t,n,r){var i,a,o=e&&e.mark;if(o&&(i=lc[o.marktype]).tip){for((a=wc(t,n))[0]-=r[0],a[1]-=r[1];e=e.mark.group;)a[0]-=e.x||0,a[1]-=e.y||0;e=i.tip(o.items,a)}return e}(t,e,this.canvas(),this._origin);const r=n&&t&&t.tooltip||null;this._tooltip.call(this._obj,this,e,t,r)}},getItemBoundingClientRect(e){const t=this.canvas();if(!t)return;const n=t.getBoundingClientRect(),r=this._origin,i=e.bounds,a=i.width(),o=i.height();let s=i.x1+r[0]+n.left,u=i.y1+r[1]+n.top;for(;e.mark&&(e=e.mark.group);)s+=e.x||0,u+=e.y||0;return{x:s,y:u,width:a,height:o,left:s,top:u,right:s+a,bottom:u+o}}},Cc.prototype={initialize(e,t,n,r,i){return this._el=e,this.resize(t,n,r,i)},element(){return this._el},canvas(){return this._el&&this._el.firstChild},background(e){return 0===arguments.length?this._bgcolor:(this._bgcolor=e,this)},resize(e,t,n,r){return this._width=e,this._height=t,this._origin=n||[0,0],this._scale=r||1,this},dirty(){},render(e){const t=this;return t._call=function(){t._render(e)},t._call(),t._call=null,t},_render(){},renderAsync(e){const t=this.render(e);return this._ready?this._ready.then((()=>t)):Promise.resolve(t)},_load(e,t){var n=this,r=n._loader[e](t);if(!n._ready){const e=n._call;n._ready=n._loader.ready().then((t=>{t&&e(),n._ready=null}))}return r},sanitizeURL(e){return this._load("sanitizeURL",e)},loadImage(e){return this._load("loadImage",e)}};const Fc="dragenter",Mc="dragleave",Sc="dragover",Bc="mousedown",Oc="mousemove",Rc="mouseout",zc="mouseover",$c="click",qc="mousewheel",Lc="touchstart",Tc="touchmove",Nc="touchend",Pc=Oc,Uc=Rc,jc=$c;function Ic(e,t){Dc.call(this,e,t),this._down=null,this._touch=null,this._first=!0,this._events={}}function Wc(e,t){(e=>e===Lc||e===Tc||e===Nc?[Lc,Tc,Nc]:[e])(t).forEach((t=>function(e,t){const n=e.canvas();n&&!e._events[t]&&(e._events[t]=1,n.addEventListener(t,e[t]?n=>e[t](n):n=>e.fire(t,n)))}(e,t)))}function Hc(e,t,n){return function(r){const i=this._active,a=this.pickEvent(r);a===i||(i&&i.exit||this.fire(n,r),this._active=a,this.fire(t,r)),this.fire(e,r)}}function Gc(e){return function(t){this.fire(e,t),this._active=null}}Ce(Ic,Dc,{initialize(e,t,n){return this._canvas=e&&xc(e,"canvas"),[$c,Bc,Oc,Rc,Mc].forEach((e=>Wc(this,e))),Dc.prototype.initialize.call(this,e,t,n)},canvas(){return this._canvas},context(){return this._canvas.getContext("2d")},events:["keydown","keypress","keyup",Fc,Mc,Sc,Bc,"mouseup",Oc,Rc,zc,$c,"dblclick","wheel",qc,Lc,Tc,Nc],DOMMouseScroll(e){this.fire(qc,e)},mousemove:Hc(Oc,zc,Rc),dragover:Hc(Sc,Fc,Mc),mouseout:Gc(Rc),dragleave:Gc(Mc),mousedown(e){this._down=this._active,this.fire(Bc,e)},click(e){this._down===this._active&&(this.fire($c,e),this._down=null)},touchstart(e){this._touch=this.pickEvent(e.changedTouches[0]),this._first&&(this._active=this._touch,this._first=!1),this.fire(Lc,e,!0)},touchmove(e){this.fire(Tc,e,!0)},touchend(e){this.fire(Nc,e,!0),this._touch=null},fire(e,t,n){const r=n?this._touch:this._active,i=this._handlers[e];if(t.vegaType=e,e===jc&&r&&r.href?this.handleHref(t,r,r.href):e!==Pc&&e!==Uc||this.handleTooltip(t,r,e!==Uc),i)for(let e=0,n=i.length;e<n;++e)i[e].handler.call(this._obj,t,r)},on(e,t){const n=this.eventName(e),r=this._handlers;return this._handlerIndex(r[n],e,t)<0&&(Wc(this,e),(r[n]||(r[n]=[])).push({type:e,handler:t})),this},off(e,t){const n=this.eventName(e),r=this._handlers[n],i=this._handlerIndex(r,e,t);return i>=0&&r.splice(i,1),this},pickEvent(e){const t=wc(e,this._canvas),n=this._origin;return this.pick(this._scene,t[0],t[1],t[0]-n[0],t[1]-n[1])},pick(e,t,n,r,i){const a=this.context();return lc[e.marktype].pick.call(this,a,e,t,n,r,i)}});var Vc="undefined"!=typeof window&&window.devicePixelRatio||1;function Yc(e){Cc.call(this,e),this._options={},this._redraw=!1,this._dirty=new fu,this._tempb=new fu}const Xc=Cc.prototype;function Jc(e,t){Dc.call(this,e,t);const n=this;n._hrefHandler=Qc(n,((e,t)=>{t&&t.href&&n.handleHref(e,t,t.href)})),n._tooltipHandler=Qc(n,((e,t)=>{n.handleTooltip(e,t,e.type!==Uc)}))}Ce(Yc,Cc,{initialize(e,t,n,r,i,a){return this._options=a||{},this._canvas=this._options.externalContext?null:Ka(1,1,this._options.type),e&&this._canvas&&(kc(e,0).appendChild(this._canvas),this._canvas.setAttribute("class","marks")),Xc.initialize.call(this,e,t,n,r,i)},resize(e,t,n,r){if(Xc.resize.call(this,e,t,n,r),this._canvas)!function(e,t,n,r,i,a){const o="undefined"!=typeof HTMLElement&&e instanceof HTMLElement&&null!=e.parentNode,s=e.getContext("2d"),u=o?Vc:i;e.width=t*u,e.height=n*u;for(const e in a)s[e]=a[e];o&&1!==u&&(e.style.width=t+"px",e.style.height=n+"px"),s.pixelRatio=u,s.setTransform(u,0,0,u,u*r[0],u*r[1])}(this._canvas,this._width,this._height,this._origin,this._scale,this._options.context);else{const e=this._options.externalContext;e||C("CanvasRenderer is missing a valid canvas or context"),e.scale(this._scale,this._scale),e.translate(this._origin[0],this._origin[1])}return this._redraw=!0,this},canvas(){return this._canvas},context(){return this._options.externalContext||(this._canvas?this._canvas.getContext("2d"):null)},dirty(e){const t=this._tempb.clear().union(e.bounds);let n=e.mark.group;for(;n;)t.translate(n.x||0,n.y||0),n=n.mark.group;this._dirty.union(t)},_render(e){const t=this.context(),n=this._origin,r=this._width,i=this._height,a=this._dirty,o=((e,t,n)=>(new fu).set(0,0,t,n).translate(-e[0],-e[1]))(n,r,i);t.save();const s=this._redraw||a.empty()?(this._redraw=!1,o.expand(1)):function(e,t,n){return t.expand(1).round(),e.pixelRatio%1&&t.scale(e.pixelRatio).round().scale(1/e.pixelRatio),t.translate(-n[0]%1,-n[1]%1),e.beginPath(),e.rect(t.x1,t.y1,t.width(),t.height()),e.clip(),t}(t,o.intersect(a),n);return this.clear(-n[0],-n[1],r,i),this.draw(t,e,s),t.restore(),a.clear(),this},draw(e,t,n){const r=lc[t.marktype];t.clip&&function(e,t){var n=t.clip;e.save(),de(n)?(e.beginPath(),n(e),e.clip()):vl(e,t.group)}(e,t),r.draw.call(this,e,t,n),t.clip&&e.restore()},clear(e,t,n,r){const i=this._options,a=this.context();"pdf"===i.type||i.externalContext||a.clearRect(e,t,n,r),null!=this._bgcolor&&(a.fillStyle=this._bgcolor,a.fillRect(e,t,n,r))}});const Qc=(e,t)=>n=>{let r=n.target.__data__;r=Array.isArray(r)?r[0]:r,n.vegaType=n.type,t.call(e._obj,n,r)};Ce(Jc,Dc,{initialize(e,t,n){let r=this._svg;return r&&(r.removeEventListener(jc,this._hrefHandler),r.removeEventListener(Pc,this._tooltipHandler),r.removeEventListener(Uc,this._tooltipHandler)),this._svg=r=e&&xc(e,"svg"),r&&(r.addEventListener(jc,this._hrefHandler),r.addEventListener(Pc,this._tooltipHandler),r.addEventListener(Uc,this._tooltipHandler)),Dc.prototype.initialize.call(this,e,t,n)},canvas(){return this._svg},on(e,t){const n=this.eventName(e),r=this._handlers;if(this._handlerIndex(r[n],e,t)<0){const i={type:e,handler:t,listener:Qc(this,t)};(r[n]||(r[n]=[])).push(i),this._svg&&this._svg.addEventListener(n,i.listener)}return this},off(e,t){const n=this.eventName(e),r=this._handlers[n],i=this._handlerIndex(r,e,t);return i>=0&&(this._svg&&this._svg.removeEventListener(n,r[i].listener),r.splice(i,1)),this}});const Kc="aria-hidden",Zc="aria-label",ed="role",td="aria-roledescription",nd="graphics-object",rd="graphics-symbol",id=(e,t,n)=>({[ed]:e,[td]:t,[Zc]:n||void 0}),ad=Ve(["axis-domain","axis-grid","axis-label","axis-tick","axis-title","legend-band","legend-entry","legend-gradient","legend-label","legend-title","legend-symbol","title"]),od={axis:{desc:"axis",caption:function(e){const t=e.datum,n=e.orient,r=t.title?dd(e):null,i=e.context,a=i.scales[t.scale].value,o=i.dataflow.locale(),s=a.type;return("left"===n||"right"===n?"Y":"X")+"-axis"+(r?` titled '${r}'`:"")+` for a ${Ro(s)?"discrete":s} scale`+` with ${hs(o,a,e)}`}},legend:{desc:"legend",caption:function(e){const t=e.datum,n=t.title?dd(e):null,r=`${t.type||""} legend`.trim(),i=t.scales,a=Object.keys(i),o=e.context,s=o.scales[i[a[0]]].value,u=o.dataflow.locale();return l=r,(l.length?l[0].toUpperCase()+l.slice(1):l)+(n?` titled '${n}'`:"")+` for ${function(e){return(e=e.map((e=>e+("fill"===e||"stroke"===e?" color":"")))).length<2?e[0]:e.slice(0,-1).join(", ")+" and "+W(e)}(a)}`+` with ${hs(u,s,e)}`;var l}},"title-text":{desc:"title",caption:e=>`Title text '${cd(e)}'`},"title-subtitle":{desc:"subtitle",caption:e=>`Subtitle text '${cd(e)}'`}},sd={ariaRole:ed,ariaRoleDescription:td,description:Zc};function ud(e,t){const n=!1===t.aria;if(e(Kc,n||void 0),n||null==t.description)for(const t in sd)e(sd[t],void 0);else{const n=t.mark.marktype;e(Zc,t.description),e(ed,t.ariaRole||("group"===n?nd:rd)),e(td,t.ariaRoleDescription||`${n} mark`)}}function ld(e){return!1===e.aria?{[Kc]:!0}:ad[e.role]?null:od[e.role]?function(e,t){try{const n=e.items[0],r=t.caption||(()=>"");return id(t.role||rd,t.desc,n.description||r(n))}catch(e){return null}}(e,od[e.role]):function(e){const t=e.marktype,n="group"===t||"text"===t||e.items.some((e=>null!=e.description&&!1!==e.aria));return id(n?nd:rd,`${t} mark container`,e.description)}(e)}function cd(e){return le(e.text).join(" ")}function dd(e){try{return le(W(e.items).items[0].text).join(" ")}catch(e){return null}}const fd=e=>(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function hd(){let e="",t="",n="";const r=[],i=()=>t=n="",a=(e,n)=>{var r;return null!=n&&(t+=` ${e}="${r=n,fd(r).replace(/"/g,"&quot;").replace(/\t/g,"&#x9;").replace(/\n/g,"&#xA;").replace(/\r/g,"&#xD;")}"`),o},o={open(s,...u){(a=>{t&&(e+=`${t}>${n}`,i()),r.push(a)})(s),t="<"+s;for(const e of u)for(const t in e)a(t,e[t]);return o},close(){const a=r.pop();return e+=t?t+(n?`>${n}</${a}>`:"/>"):`</${a}>`,i(),o},attr:a,text:e=>(n+=fd(e),o),toString:()=>e};return o}const pd=e=>md(hd(),e)+"";function md(e,t){if(e.open(t.tagName),t.hasAttributes()){const n=t.attributes,r=n.length;for(let t=0;t<r;++t)e.attr(n[t].name,n[t].value)}if(t.hasChildNodes()){const n=t.childNodes;for(const t of n)3===t.nodeType?e.text(t.nodeValue):md(e,t)}return e.close()}const gd={fill:"fill",fillOpacity:"fill-opacity",stroke:"stroke",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",strokeCap:"stroke-linecap",strokeJoin:"stroke-linejoin",strokeDash:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeMiterLimit:"stroke-miterlimit",opacity:"opacity",blend:"mix-blend-mode"},yd={fill:"none","stroke-miterlimit":10},vd="http://www.w3.org/2000/xmlns/",bd=El.xmlns;function xd(e){Cc.call(this,e),this._dirtyID=0,this._dirty=[],this._svg=null,this._root=null,this._defs=null}const _d=Cc.prototype;function kd(e,t){for(;e&&e.dirty!==t;e=e.mark.group){if(e.dirty=t,!e.mark||e.mark.dirty===t)return;e.mark.dirty=t}}function Ad(e,t,n){let r,i,a;if("radial"===t.gradient){let r=_c(e,n++,"pattern",bd);Bd(r,{id:ms+t.id,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),r=_c(r,0,"rect",bd),Bd(r,{width:1,height:1,fill:`url(${Rd()}#${t.id})`}),Bd(e=_c(e,n++,"radialGradient",bd),{id:t.id,fx:t.x1,fy:t.y1,fr:t.r1,cx:t.x2,cy:t.y2,r:t.r2})}else Bd(e=_c(e,n++,"linearGradient",bd),{id:t.id,x1:t.x1,x2:t.x2,y1:t.y1,y2:t.y2});for(r=0,i=t.stops.length;r<i;++r)a=_c(e,r,"stop",bd),a.setAttribute("offset",t.stops[r].offset),a.setAttribute("stop-color",t.stops[r].color);return kc(e,r),n}function wd(e,t,n){let r;return(e=_c(e,n,"clipPath",bd)).setAttribute("id",t.id),t.path?(r=_c(e,0,"path",bd),r.setAttribute("d",t.path)):(r=_c(e,0,"rect",bd),Bd(r,{x:0,y:0,width:t.width,height:t.height})),kc(e,1),n+1}function Dd(e,t,n,r,i){let a,o=e._svg;if(!o&&(a=t.ownerDocument,o=bc(a,r,bd),e._svg=o,e.mark&&(o.__data__=e,o.__values__={fill:"default"},"g"===r))){const t=bc(a,"path",bd);o.appendChild(t),t.__data__=e;const n=bc(a,"g",bd);o.appendChild(n),n.__data__=e;const r=bc(a,"path",bd);o.appendChild(r),r.__data__=e,r.__values__={fill:"default"}}return(o.ownerSVGElement!==i||function(e,t){return e.parentNode&&e.parentNode.childNodes.length>1&&e.previousSibling!=t}(o,n))&&t.insertBefore(o,n?n.nextSibling:t.firstChild),o}Ce(xd,Cc,{initialize(e,t,n,r,i){return this._defs={},this._clearDefs(),e&&(this._svg=_c(e,0,"svg",bd),this._svg.setAttributeNS(vd,"xmlns",bd),this._svg.setAttributeNS(vd,"xmlns:xlink",El["xmlns:xlink"]),this._svg.setAttribute("version",El.version),this._svg.setAttribute("class","marks"),kc(e,1),this._root=_c(this._svg,0,"g",bd),Bd(this._root,yd),kc(this._svg,1)),this.background(this._bgcolor),_d.initialize.call(this,e,t,n,r,i)},background(e){return arguments.length&&this._svg&&this._svg.style.setProperty("background-color",e),_d.background.apply(this,arguments)},resize(e,t,n,r){return _d.resize.call(this,e,t,n,r),this._svg&&(Bd(this._svg,{width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}),this._root.setAttribute("transform",`translate(${this._origin})`)),this._dirty=[],this},canvas(){return this._svg},svg(){const e=this._svg,t=this._bgcolor;if(!e)return null;let n;t&&(e.removeAttribute("style"),n=_c(e,0,"rect",bd),Bd(n,{width:this._width,height:this._height,fill:t}));const r=pd(e);return t&&(e.removeChild(n),this._svg.style.setProperty("background-color",t)),r},_render(e){return this._dirtyCheck()&&(this._dirtyAll&&this._clearDefs(),this.mark(this._root,e),kc(this._root,1)),this.defs(),this._dirty=[],++this._dirtyID,this},dirty(e){e.dirty!==this._dirtyID&&(e.dirty=this._dirtyID,this._dirty.push(e))},isDirty(e){return this._dirtyAll||!e._svg||e.dirty===this._dirtyID},_dirtyCheck(){this._dirtyAll=!0;const e=this._dirty;if(!e.length||!this._dirtyID)return!0;const t=++this._dirtyID;let n,r,i,a,o,s,u;for(o=0,s=e.length;o<s;++o)n=e[o],r=n.mark,r.marktype!==i&&(i=r.marktype,a=lc[i]),r.zdirty&&r.dirty!==t&&(this._dirtyAll=!1,kd(n,t),r.items.forEach((e=>{e.dirty=t}))),r.zdirty||(n.exit?(a.nested&&r.items.length?(u=r.items[0],u._svg&&this._update(a,u._svg,u)):n._svg&&(u=n._svg.parentNode,u&&u.removeChild(n._svg)),n._svg=null):(n=a.nested?r.items[0]:n,n._update!==t&&(n._svg&&n._svg.ownerSVGElement?this._update(a,n._svg,n):(this._dirtyAll=!1,kd(n,t)),n._update=t)));return!this._dirtyAll},mark(e,t,n){if(!this.isDirty(t))return t._svg;const r=this._svg,i=lc[t.marktype],a=!1===t.interactive?"none":null,o="g"===i.tag;let s=null,u=0;const l=Dd(t,e,n,"g",r);l.setAttribute("class",Ac(t));const c=ld(t);for(const e in c)Od(l,e,c[e]);o||Od(l,"pointer-events",a),Od(l,"clip-path",t.clip?du(this,t,t.group):null);const d=e=>{const t=this.isDirty(e),n=Dd(e,l,s,i.tag,r);t&&(this._update(i,n,e),o&&function(e,t,n){t=t.lastChild.previousSibling;let r,i=0;rl(n,(n=>{r=e.mark(t,n,r),++i})),kc(t,1+i)}(this,n,e)),s=n,++u};return i.nested?t.items.length&&d(t.items[0]):rl(t,d),kc(l,u),l},_update(e,t,n){Ed=t,Cd=t.__values__,ud(Md,n),e.attr(Md,n,this);const r=Fd[e.type];r&&r.call(this,e,t,n),Ed&&this.style(Ed,n)},style(e,t){if(null!=t)for(const n in gd){let r="font"===n?ec(t):t[n];if(r===Cd[n])continue;const i=gd[n];null==r?e.removeAttribute(i):(gs(r)&&(r=ys(r,this._defs.gradient,Rd())),e.setAttribute(i,r+"")),Cd[n]=r}},defs(){const e=this._svg,t=this._defs;let n=t.el,r=0;for(const i in t.gradient)n||(t.el=n=_c(e,1,"defs",bd)),r=Ad(n,t.gradient[i],r);for(const i in t.clipping)n||(t.el=n=_c(e,1,"defs",bd)),r=wd(n,t.clipping[i],r);n&&(0===r?(e.removeChild(n),t.el=null):kc(n,r))},_clearDefs(){const e=this._defs;e.gradient={},e.clipping={}}});let Ed=null,Cd=null;const Fd={group(e,t,n){const r=Ed=t.childNodes[2];Cd=r.__values__,e.foreground(Md,n,this),Cd=t.__values__,Ed=t.childNodes[1],e.content(Md,n,this);const i=Ed=t.childNodes[0];e.background(Md,n,this);const a=!1===n.mark.interactive?"none":null;if(a!==Cd.events&&(Od(r,"pointer-events",a),Od(i,"pointer-events",a),Cd.events=a),n.strokeForeground&&n.stroke){const e=n.fill;Od(r,"display",null),this.style(i,n),Od(i,"stroke",null),e&&(n.fill=null),Cd=r.__values__,this.style(r,n),e&&(n.fill=e),Ed=null}else Od(r,"display","none")},image(e,t,n){!1===n.smooth?(Sd(t,"image-rendering","optimizeSpeed"),Sd(t,"image-rendering","pixelated")):Sd(t,"image-rendering",null)},text(e,t,n){const r=Ql(n);let i,a,o,s;T(r)?(a=r.map((e=>Zl(n,e))),i=a.join("\n"),i!==Cd.text&&(kc(t,0),o=t.ownerDocument,s=Jl(n),a.forEach(((e,r)=>{const i=bc(o,"tspan",bd);i.__data__=n,i.textContent=e,r&&(i.setAttribute("x",0),i.setAttribute("dy",s)),t.appendChild(i)})),Cd.text=i)):(a=Zl(n,r),a!==Cd.text&&(t.textContent=a,Cd.text=a)),Od(t,"font-family",ec(n)),Od(t,"font-size",Xl(n)+"px"),Od(t,"font-style",n.fontStyle),Od(t,"font-variant",n.fontVariant),Od(t,"font-weight",n.fontWeight)}};function Md(e,t,n){t!==Cd[e]&&(n?function(e,t,n,r){null!=n?e.setAttributeNS(r,t,n):e.removeAttributeNS(r,t)}(Ed,e,t,n):Od(Ed,e,t),Cd[e]=t)}function Sd(e,t,n){n!==Cd[t]&&(null==n?e.style.removeProperty(t):e.style.setProperty(t,n+""),Cd[t]=n)}function Bd(e,t){for(const n in t)Od(e,n,t[n])}function Od(e,t,n){null!=n?e.setAttribute(t,n):e.removeAttribute(t)}function Rd(){let e;return"undefined"==typeof window?"":(e=window.location).hash?e.href.slice(0,-e.hash.length):e.href}function zd(e){Cc.call(this,e),this._text=null,this._defs={gradient:{},clipping:{}}}Ce(zd,Cc,{svg(){return this._text},_render(e){const t=hd();t.open("svg",be({},El,{class:"marks",width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}));const n=this._bgcolor;return n&&"transparent"!==n&&"none"!==n&&t.open("rect",{width:this._width,height:this._height,fill:n}).close(),t.open("g",yd,{transform:"translate("+this._origin+")"}),this.mark(t,e),t.close(),this.defs(t),this._text=t.close()+"",this},mark(e,t){const n=lc[t.marktype],r=n.tag,i=[ud,n.attr];e.open("g",{class:Ac(t),"clip-path":t.clip?du(this,t,t.group):null},ld(t),{"pointer-events":"g"!==r&&!1===t.interactive?"none":null});const a=a=>{const o=this.href(a);if(o&&e.open("a",o),e.open(r,this.attr(t,a,i,"g"!==r?r:null)),"text"===r){const t=Ql(a);if(T(t)){const n={x:0,dy:Jl(a)};for(let r=0;r<t.length;++r)e.open("tspan",r?n:null).text(Zl(a,t[r])).close()}else e.text(Zl(a,t))}else if("g"===r){const r=a.strokeForeground,i=a.fill,o=a.stroke;r&&o&&(a.stroke=null),e.open("path",this.attr(t,a,n.background,"bgrect")).close(),e.open("g",this.attr(t,a,n.content)),rl(a,(t=>this.mark(e,t))),e.close(),r&&o?(i&&(a.fill=null),a.stroke=o,e.open("path",this.attr(t,a,n.foreground,"bgrect")).close(),i&&(a.fill=i)):e.open("path",this.attr(t,a,n.foreground,"bgfore")).close()}e.close(),o&&e.close()};return n.nested?t.items&&t.items.length&&a(t.items[0]):rl(t,a),e.close()},href(e){const t=e.href;let n;if(t){if(n=this._hrefs&&this._hrefs[t])return n;this.sanitizeURL(t).then((e=>{e["xlink:href"]=e.href,e.href=null,(this._hrefs||(this._hrefs={}))[t]=e}))}return null},attr(e,t,n,r){const i={},a=(e,t,n,r)=>{i[r||e]=t};return Array.isArray(n)?n.forEach((e=>e(a,t,this))):n(a,t,this),r&&function(e,t,n,r,i){if(null==t)return e;"bgrect"===r&&!1===n.interactive&&(e["pointer-events"]="none");if("bgfore"===r&&(!1===n.interactive&&(e["pointer-events"]="none"),e.display="none",null!==t.fill))return e;"image"===r&&!1===t.smooth&&(e.style="image-rendering: optimizeSpeed; image-rendering: pixelated;");"text"===r&&(e["font-family"]=ec(t),e["font-size"]=Xl(t)+"px",e["font-style"]=t.fontStyle,e["font-variant"]=t.fontVariant,e["font-weight"]=t.fontWeight);for(const n in gd){let r=t[n];const a=gd[n];("transparent"!==r||"fill"!==a&&"stroke"!==a)&&null!=r&&(gs(r)&&(r=ys(r,i.gradient,"")),e[a]=r)}}(i,t,e,r,this._defs),i},defs(e){const t=this._defs.gradient,n=this._defs.clipping;if(0!==Object.keys(t).length+Object.keys(n).length){e.open("defs");for(const n in t){const r=t[n],i=r.stops;"radial"===r.gradient?(e.open("pattern",{id:ms+n,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),e.open("rect",{width:"1",height:"1",fill:"url(#"+n+")"}).close(),e.close(),e.open("radialGradient",{id:n,fx:r.x1,fy:r.y1,fr:r.r1,cx:r.x2,cy:r.y2,r:r.r2})):e.open("linearGradient",{id:n,x1:r.x1,x2:r.x2,y1:r.y1,y2:r.y2});for(let t=0;t<i.length;++t)e.open("stop",{offset:i[t].offset,"stop-color":i[t].color}).close();e.close()}for(const t in n){const r=n[t];e.open("clipPath",{id:t}),r.path?e.open("path",{d:r.path}).close():e.open("rect",{x:0,y:0,width:r.width,height:r.height}).close(),e.close()}e.close()}}});const $d="canvas",qd="none",Ld={Canvas:$d,PNG:"png",SVG:"svg",None:qd},Td={};function Nd(e,t){return e=String(e||"").toLowerCase(),arguments.length>1?(Td[e]=t,this):Td[e]}function Pd(e,t,n){const r=[],i=(new fu).union(t),a=e.marktype;return a?Ud(e,i,n,r):"group"===a?jd(e,i,n,r):C("Intersect scene must be mark node or group item.")}function Ud(e,t,n,r){if(function(e,t,n){return e.bounds&&t.intersects(e.bounds)&&("group"===e.marktype||!1!==e.interactive&&(!n||n(e)))}(e,t,n)){const i=e.items,a=e.marktype,o=i.length;let s=0;if("group"===a)for(;s<o;++s)jd(i[s],t,n,r);else for(const e=lc[a].isect;s<o;++s){const n=i[s];Id(n,t,e)&&r.push(n)}}return r}function jd(e,t,n,r){n&&n(e.mark)&&Id(e,t,lc.group.isect)&&r.push(e);const i=e.items,a=i&&i.length;if(a){const o=e.x||0,s=e.y||0;t.translate(-o,-s);for(let e=0;e<a;++e)Ud(i[e],t,n,r);t.translate(o,s)}return r}function Id(e,t,n){const r=e.bounds;return t.encloses(r)||t.intersects(r)&&n(e,t)}Td.canvas=Td.png={renderer:Yc,headless:Yc,handler:Ic},Td.svg={renderer:xd,headless:zd,handler:Jc},Td.none={};const Wd=new fu;function Hd(e){const t=e.clip;if(de(t))t(qu(Wd.clear()));else{if(!t)return;Wd.set(0,0,e.group.width,e.group.height)}e.bounds.intersect(Wd)}function Gd(e,t,n){return e===t||("path"===n?Vd(e,t):e instanceof Date&&t instanceof Date?+e==+t:Oe(e)&&Oe(t)?Math.abs(e-t)<=1e-9:e&&t&&(N(e)||N(t))?function(e,t){var n,r,i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(i.sort(),a.sort(),r=i.length-1;r>=0;r--)if(i[r]!=a[r])return!1;for(r=i.length-1;r>=0;r--)if(!Gd(e[n=i[r]],t[n],n))return!1;return typeof e==typeof t}(e,t):e==t)}function Vd(e,t){return Gd(ws(e),ws(t))}const Yd="top",Xd="left",Jd="right",Qd="bottom",Kd="start",Zd="middle",ef="end",tf="group",nf="axis",rf="title",af="frame",of="scope",sf="legend",uf="row-header",lf="row-footer",cf="row-title",df="column-header",ff="column-footer",hf="column-title",pf="padding",mf="fit",gf="fit-x",yf="fit-y",vf="none",bf="all",xf="each",_f="flush",kf="column",Af="row";function wf(e){Br.call(this,null,e)}function Df(e,t,n){return t(e.bounds.clear(),e,n)}Ce(wf,Br,{transform(e,t){const n=t.dataflow,r=e.mark,i=r.marktype,a=lc[i],o=a.bound;let s,u=r.bounds;if(a.nested)r.items.length&&n.dirty(r.items[0]),u=Df(r,o),r.items.forEach((e=>{e.bounds.clear().union(u)}));else if(i===tf||e.modified())switch(t.visit(t.MOD,(e=>n.dirty(e))),u.clear(),r.items.forEach((e=>u.union(Df(e,o)))),r.role){case nf:case sf:case rf:t.reflow()}else s=t.changed(t.REM),t.visit(t.ADD,(e=>{u.union(Df(e,o))})),t.visit(t.MOD,(e=>{s=s||u.alignsWith(e.bounds),n.dirty(e),u.union(Df(e,o))})),s&&(u.clear(),r.items.forEach((e=>u.union(e.bounds))));return Hd(r),t.modifies("bounds")}});const Ef=":vega_identifier:";function Cf(e){Br.call(this,0,e)}function Ff(e){Br.call(this,null,e)}function Mf(e){Br.call(this,null,e)}Cf.Definition={type:"Identifier",metadata:{modifies:!0},params:[{name:"as",type:"string",required:!0}]},Ce(Cf,Br,{transform(e,t){const n=(i=t.dataflow)._signals[Ef]||(i._signals[Ef]=i.add(0)),r=e.as;var i;let a=n.value;return t.visit(t.ADD,(e=>e[r]=e[r]||++a)),n.set(this.value=a),t}}),Ce(Ff,Br,{transform(e,t){let n=this.value;n||(n=t.dataflow.scenegraph().mark(e.markdef,function(e){const t=e.groups,n=e.parent;return t&&1===t.size?t.get(Object.keys(t.object)[0]):t&&n?t.lookup(n):null}(e),e.index),n.group.context=e.context,e.context.group||(e.context.group=n.group),n.source=this.source,n.clip=e.clip,n.interactive=e.interactive,this.value=n);const r=n.marktype===tf?pu:hu;return t.visit(t.ADD,(e=>r.call(e,n))),(e.modified("clip")||e.modified("interactive"))&&(n.clip=e.clip,n.interactive=!!e.interactive,n.zdirty=!0,t.reflow()),n.items=t.source,t}});const Sf={parity:e=>e.filter(((e,t)=>t%2?e.opacity=0:1)),greedy:(e,t)=>{let n;return e.filter(((e,r)=>r&&Bf(n.bounds,e.bounds,t)?e.opacity=0:(n=e,1)))}},Bf=(e,t,n)=>n>Math.max(t.x1-e.x2,e.x1-t.x2,t.y1-e.y2,e.y1-t.y2),Of=(e,t)=>{for(var n,r=1,i=e.length,a=e[0].bounds;r<i;a=n,++r)if(Bf(a,n=e[r].bounds,t))return!0},Rf=e=>{const t=e.bounds;return t.width()>1&&t.height()>1},zf=e=>(e.forEach((e=>e.opacity=1)),e),$f=(e,t)=>e.reflow(t.modified()).modifies("opacity");function qf(e){Br.call(this,null,e)}Ce(Mf,Br,{transform(e,t){const n=Sf[e.method]||Sf.parity,r=e.separation||0;let i,a,o=t.materialize(t.SOURCE).source;if(!o||!o.length)return;if(!e.method)return e.modified("method")&&(zf(o),t=$f(t,e)),t;if(o=o.filter(Rf),!o.length)return;if(e.sort&&(o=o.slice().sort(e.sort)),i=zf(o),t=$f(t,e),i.length>=3&&Of(i,r)){do{i=n(i,r)}while(i.length>=3&&Of(i,r));i.length<3&&!W(o).opacity&&(i.length>1&&(W(i).opacity=0),W(o).opacity=1)}e.boundScale&&e.boundTolerance>=0&&(a=((e,t,n)=>{var r=e.range(),i=new fu;return t===Yd||t===Qd?i.set(r[0],-1/0,r[1],1/0):i.set(-1/0,r[0],1/0,r[1]),i.expand(n||1),e=>i.encloses(e.bounds)})(e.boundScale,e.boundOrient,+e.boundTolerance),o.forEach((e=>{a(e)||(e.opacity=0)})));const s=i[0].mark.bounds.clear();return o.forEach((e=>{e.opacity&&s.union(e.bounds)})),t}}),Ce(qf,Br,{transform(e,t){const n=t.dataflow;if(t.visit(t.ALL,(e=>n.dirty(e))),t.fields&&t.fields.zindex){const e=t.source&&t.source[0];e&&(e.mark.zdirty=!0)}}});const Lf=new fu;function Tf(e,t,n){return e[t]===n?0:(e[t]=n,1)}function Nf(e){var t=e.items[0].orient;return t===Xd||t===Jd}function Pf(e,t,n,r){var i,a,o=t.items[0],s=o.datum,u=null!=o.translate?o.translate:.5,l=o.orient,c=function(e){let t=+e.grid;return[e.ticks?t++:-1,e.labels?t++:-1,t+ +e.domain]}(s),d=o.range,f=o.offset,h=o.position,p=o.minExtent,m=o.maxExtent,g=s.title&&o.items[c[2]].items[0],y=o.titlePadding,v=o.bounds,b=g&&Kl(g),x=0,_=0;switch(Lf.clear().union(v),v.clear(),(i=c[0])>-1&&v.union(o.items[i].bounds),(i=c[1])>-1&&v.union(o.items[i].bounds),l){case Yd:x=h||0,_=-f,a=Math.max(p,Math.min(m,-v.y1)),v.add(0,-a).add(d,0),g&&Uf(e,g,a,y,b,0,-1,v);break;case Xd:x=-f,_=h||0,a=Math.max(p,Math.min(m,-v.x1)),v.add(-a,0).add(0,d),g&&Uf(e,g,a,y,b,1,-1,v);break;case Jd:x=n+f,_=h||0,a=Math.max(p,Math.min(m,v.x2)),v.add(0,0).add(a,d),g&&Uf(e,g,a,y,b,1,1,v);break;case Qd:x=h||0,_=r+f,a=Math.max(p,Math.min(m,v.y2)),v.add(0,0).add(d,a),g&&Uf(e,g,a,y,0,0,1,v);break;default:x=o.x,_=o.y}return vu(v.translate(x,_),o),Tf(o,"x",x+u)|Tf(o,"y",_+u)&&(o.bounds=Lf,e.dirty(o),o.bounds=v,e.dirty(o)),o.mark.bounds.clear().union(v)}function Uf(e,t,n,r,i,a,o,s){const u=t.bounds;if(t.auto){const s=o*(n+i+r);let l=0,c=0;e.dirty(t),a?l=(t.x||0)-(t.x=s):c=(t.y||0)-(t.y=s),t.mark.bounds.clear().union(u.translate(-l,-c)),e.dirty(t)}s.union(u)}const jf=(e,t)=>Math.floor(Math.min(e,t)),If=(e,t)=>Math.ceil(Math.max(e,t));function Wf(e){return(new fu).set(0,0,e.width||0,e.height||0)}function Hf(e){const t=e.bounds.clone();return t.empty()?t.set(0,0,0,0):t.translate(-(e.x||0),-(e.y||0))}function Gf(e,t,n){const r=N(e)?e[t]:e;return null!=r?r:void 0!==n?n:0}function Vf(e){return e<0?Math.ceil(-e):0}function Yf(e,t,n){var r,i,a,o,s,u,l,c,d,f,h,p=!n.nodirty,m=n.bounds===_f?Wf:Hf,g=Lf.set(0,0,0,0),y=Gf(n.align,kf),v=Gf(n.align,Af),b=Gf(n.padding,kf),x=Gf(n.padding,Af),_=n.columns||t.length,k=_<=0?1:Math.ceil(t.length/_),A=t.length,w=Array(A),D=Array(_),E=0,C=Array(A),F=Array(k),M=0,S=Array(A),B=Array(A),O=Array(A);for(i=0;i<_;++i)D[i]=0;for(i=0;i<k;++i)F[i]=0;for(i=0;i<A;++i)u=t[i],s=O[i]=m(u),u.x=u.x||0,S[i]=0,u.y=u.y||0,B[i]=0,a=i%_,o=~~(i/_),E=Math.max(E,l=Math.ceil(s.x2)),M=Math.max(M,c=Math.ceil(s.y2)),D[a]=Math.max(D[a],l),F[o]=Math.max(F[o],c),w[i]=b+Vf(s.x1),C[i]=x+Vf(s.y1),p&&e.dirty(t[i]);for(i=0;i<A;++i)i%_==0&&(w[i]=0),i<_&&(C[i]=0);if(y===xf)for(a=1;a<_;++a){for(h=0,i=a;i<A;i+=_)h<w[i]&&(h=w[i]);for(i=a;i<A;i+=_)w[i]=h+D[a-1]}else if(y===bf){for(h=0,i=0;i<A;++i)i%_&&h<w[i]&&(h=w[i]);for(i=0;i<A;++i)i%_&&(w[i]=h+E)}else for(y=!1,a=1;a<_;++a)for(i=a;i<A;i+=_)w[i]+=D[a-1];if(v===xf)for(o=1;o<k;++o){for(h=0,r=(i=o*_)+_;i<r;++i)h<C[i]&&(h=C[i]);for(i=o*_;i<r;++i)C[i]=h+F[o-1]}else if(v===bf){for(h=0,i=_;i<A;++i)h<C[i]&&(h=C[i]);for(i=_;i<A;++i)C[i]=h+M}else for(v=!1,o=1;o<k;++o)for(r=(i=o*_)+_;i<r;++i)C[i]+=F[o-1];for(d=0,i=0;i<A;++i)d=w[i]+(i%_?d:0),S[i]+=d-t[i].x;for(a=0;a<_;++a)for(f=0,i=a;i<A;i+=_)f+=C[i],B[i]+=f-t[i].y;if(y&&Gf(n.center,kf)&&k>1)for(i=0;i<A;++i)(d=(s=y===bf?E:D[i%_])-O[i].x2-t[i].x-S[i])>0&&(S[i]+=d/2);if(v&&Gf(n.center,Af)&&1!==_)for(i=0;i<A;++i)(f=(s=v===bf?M:F[~~(i/_)])-O[i].y2-t[i].y-B[i])>0&&(B[i]+=f/2);for(i=0;i<A;++i)g.union(O[i].translate(S[i],B[i]));switch(d=Gf(n.anchor,"x"),f=Gf(n.anchor,"y"),Gf(n.anchor,kf)){case ef:d-=g.width();break;case Zd:d-=g.width()/2}switch(Gf(n.anchor,Af)){case ef:f-=g.height();break;case Zd:f-=g.height()/2}for(d=Math.round(d),f=Math.round(f),g.clear(),i=0;i<A;++i)t[i].mark.bounds.clear();for(i=0;i<A;++i)(u=t[i]).x+=S[i]+=d,u.y+=B[i]+=f,g.union(u.mark.bounds.union(u.bounds.translate(S[i],B[i]))),p&&e.dirty(u);return g}function Xf(e,t,n){var r,i,a,o,s,u,l,c=function(e){var t,n,r=e.items,i=r.length,a=0;const o={marks:[],rowheaders:[],rowfooters:[],colheaders:[],colfooters:[],rowtitle:null,coltitle:null};for(;a<i;++a)if(n=(t=r[a]).items,t.marktype===tf)switch(t.role){case nf:case sf:case rf:break;case uf:o.rowheaders.push(...n);break;case lf:o.rowfooters.push(...n);break;case df:o.colheaders.push(...n);break;case ff:o.colfooters.push(...n);break;case cf:o.rowtitle=n[0];break;case hf:o.coltitle=n[0];break;default:o.marks.push(...n)}return o}(t),d=c.marks,f=n.bounds===_f?Jf:Qf,h=n.offset,p=n.columns||d.length,m=p<=0?1:Math.ceil(d.length/p),g=m*p;const y=Yf(e,d,n);y.empty()&&y.set(0,0,0,0),c.rowheaders&&(u=Gf(n.headerBand,Af,null),r=Kf(e,c.rowheaders,d,p,m,-Gf(h,"rowHeader"),jf,0,f,"x1",0,p,1,u)),c.colheaders&&(u=Gf(n.headerBand,kf,null),i=Kf(e,c.colheaders,d,p,p,-Gf(h,"columnHeader"),jf,1,f,"y1",0,1,p,u)),c.rowfooters&&(u=Gf(n.footerBand,Af,null),a=Kf(e,c.rowfooters,d,p,m,Gf(h,"rowFooter"),If,0,f,"x2",p-1,p,1,u)),c.colfooters&&(u=Gf(n.footerBand,kf,null),o=Kf(e,c.colfooters,d,p,p,Gf(h,"columnFooter"),If,1,f,"y2",g-p,1,p,u)),c.rowtitle&&(s=Gf(n.titleAnchor,Af),l=Gf(h,"rowTitle"),l=s===ef?a+l:r-l,u=Gf(n.titleBand,Af,.5),Zf(e,c.rowtitle,l,0,y,u)),c.coltitle&&(s=Gf(n.titleAnchor,kf),l=Gf(h,"columnTitle"),l=s===ef?o+l:i-l,u=Gf(n.titleBand,kf,.5),Zf(e,c.coltitle,l,1,y,u))}function Jf(e,t){return"x1"===t?e.x||0:"y1"===t?e.y||0:"x2"===t?(e.x||0)+(e.width||0):"y2"===t?(e.y||0)+(e.height||0):void 0}function Qf(e,t){return e.bounds[t]}function Kf(e,t,n,r,i,a,o,s,u,l,c,d,f,h){var p,m,g,y,v,b,x,_,k,A=n.length,w=0,D=0;if(!A)return w;for(p=c;p<A;p+=d)n[p]&&(w=o(w,u(n[p],l)));if(!t.length)return w;for(t.length>i&&(e.warn("Grid headers exceed limit: "+i),t=t.slice(0,i)),w+=a,m=0,y=t.length;m<y;++m)e.dirty(t[m]),t[m].mark.bounds.clear();for(p=c,m=0,y=t.length;m<y;++m,p+=d){for(v=(b=t[m]).mark.bounds,g=p;g>=0&&null==(x=n[g]);g-=f);s?(_=null==h?x.x:Math.round(x.bounds.x1+h*x.bounds.width()),k=w):(_=w,k=null==h?x.y:Math.round(x.bounds.y1+h*x.bounds.height())),v.union(b.bounds.translate(_-(b.x||0),k-(b.y||0))),b.x=_,b.y=k,e.dirty(b),D=o(D,v[l])}return D}function Zf(e,t,n,r,i,a){if(t){e.dirty(t);var o=n,s=n;r?o=Math.round(i.x1+a*i.width()):s=Math.round(i.y1+a*i.height()),t.bounds.translate(o-(t.x||0),s-(t.y||0)),t.mark.bounds.clear().union(t.bounds),t.x=o,t.y=s,e.dirty(t)}}function eh(e,t,n,r,i,a,o){const s=function(e,t){const n=e[t]||{};return(t,r)=>null!=n[t]?n[t]:null!=e[t]?e[t]:r}(n,t),u=function(e,t){let n=-1/0;return e.forEach((e=>{null!=e.offset&&(n=Math.max(n,e.offset))})),n>-1/0?n:t}(e,s("offset",0)),l=s("anchor",Kd),c=l===ef?1:l===Zd?.5:0,d={align:xf,bounds:s("bounds",_f),columns:"vertical"===s("direction")?1:e.length,padding:s("margin",8),center:s("center"),nodirty:!0};switch(t){case Xd:d.anchor={x:Math.floor(r.x1)-u,column:ef,y:c*(o||r.height()+2*r.y1),row:l};break;case Jd:d.anchor={x:Math.ceil(r.x2)+u,y:c*(o||r.height()+2*r.y1),row:l};break;case Yd:d.anchor={y:Math.floor(i.y1)-u,row:ef,x:c*(a||i.width()+2*i.x1),column:l};break;case Qd:d.anchor={y:Math.ceil(i.y2)+u,x:c*(a||i.width()+2*i.x1),column:l};break;case"top-left":d.anchor={x:u,y:u};break;case"top-right":d.anchor={x:a-u,y:u,column:ef};break;case"bottom-left":d.anchor={x:u,y:o-u,row:ef};break;case"bottom-right":d.anchor={x:a-u,y:o-u,column:ef,row:ef}}return d}function th(e,t){var n,r,i=t.items[0],a=i.datum,o=i.orient,s=i.bounds,u=i.x,l=i.y;return i._bounds?i._bounds.clear().union(s):i._bounds=s.clone(),s.clear(),function(e,t,n){var r=t.padding,i=r-n.x,a=r-n.y;if(t.datum.title){var o=t.items[1].items[0],s=o.anchor,u=t.titlePadding||0,l=r-o.x,c=r-o.y;switch(o.orient){case Xd:i+=Math.ceil(o.bounds.width())+u;break;case Jd:case Qd:break;default:a+=o.bounds.height()+u}switch((i||a)&&rh(e,n,i,a),o.orient){case Xd:c+=nh(t,n,o,s,1,1);break;case Jd:l+=nh(t,n,o,ef,0,0)+u,c+=nh(t,n,o,s,1,1);break;case Qd:l+=nh(t,n,o,s,0,0),c+=nh(t,n,o,ef,-1,0,1)+u;break;default:l+=nh(t,n,o,s,0,0)}(l||c)&&rh(e,o,l,c),(l=Math.round(o.bounds.x1-r))<0&&(rh(e,n,-l,0),rh(e,o,-l,0))}else(i||a)&&rh(e,n,i,a)}(e,i,i.items[0].items[0]),s=function(e,t){return e.items.forEach((e=>t.union(e.bounds))),t.x1=e.padding,t.y1=e.padding,t}(i,s),n=2*i.padding,r=2*i.padding,s.empty()||(n=Math.ceil(s.width()+n),r=Math.ceil(s.height()+r)),"symbol"===a.type&&function(e){const t=e.reduce(((e,t)=>(e[t.column]=Math.max(t.bounds.x2-t.x,e[t.column]||0),e)),{});e.forEach((e=>{e.width=t[e.column],e.height=e.bounds.y2-e.y}))}(i.items[0].items[0].items[0].items),o!==vf&&(i.x=u=0,i.y=l=0),i.width=n,i.height=r,vu(s.set(u,l,u+n,l+r),i),i.mark.bounds.clear().union(s),i}function nh(e,t,n,r,i,a,o){const s="symbol"!==e.datum.type,u=n.datum.vgrad,l=(!s||!a&&u||o?t:t.items[0]).bounds[i?"y2":"x2"]-e.padding,c=u&&a?l:0,d=u&&a?0:l,f=i<=0?0:Kl(n);return Math.round(r===Kd?c:r===ef?d-f:.5*(l-f))}function rh(e,t,n,r){t.x+=n,t.y+=r,t.bounds.translate(n,r),t.mark.bounds.translate(n,r),e.dirty(t)}function ih(e){Br.call(this,null,e)}Ce(ih,Br,{transform(e,t){const n=t.dataflow;return e.mark.items.forEach((t=>{e.layout&&Xf(n,t,e.layout),function(e,t,n){var r,i,a,o,s,u=t.items,l=Math.max(0,t.width||0),c=Math.max(0,t.height||0),d=(new fu).set(0,0,l,c),f=d.clone(),h=d.clone(),p=[];for(o=0,s=u.length;o<s;++o)switch((i=u[o]).role){case nf:(Nf(i)?f:h).union(Pf(e,i,l,c));break;case rf:r=i;break;case sf:p.push(th(e,i));break;case af:case of:case uf:case lf:case cf:case df:case ff:case hf:f.union(i.bounds),h.union(i.bounds);break;default:d.union(i.bounds)}if(p.length){const t={};p.forEach((e=>{(a=e.orient||Jd)!==vf&&(t[a]||(t[a]=[])).push(e)}));for(const r in t){const i=t[r];Yf(e,i,eh(i,r,n.legends,f,h,l,c))}p.forEach((t=>{const r=t.bounds;if(r.equals(t._bounds)||(t.bounds=t._bounds,e.dirty(t),t.bounds=r,e.dirty(t)),n.autosize&&n.autosize.type===mf)switch(t.orient){case Xd:case Jd:d.add(r.x1,0).add(r.x2,0);break;case Yd:case Qd:d.add(0,r.y1).add(0,r.y2)}else d.union(r)}))}d.union(f).union(h),r&&d.union(function(e,t,n,r,i){var a,o=t.items[0],s=o.frame,u=o.orient,l=o.anchor,c=o.offset,d=o.padding,f=o.items[0].items[0],h=o.items[1]&&o.items[1].items[0],p=u===Xd||u===Jd?r:n,m=0,g=0,y=0,v=0,b=0;if(s!==tf?u===Xd?(m=i.y2,p=i.y1):u===Jd?(m=i.y1,p=i.y2):(m=i.x1,p=i.x2):u===Xd&&(m=r,p=0),a=l===Kd?m:l===ef?p:(m+p)/2,h&&h.text){switch(u){case Yd:case Qd:b=f.bounds.height()+d;break;case Xd:v=f.bounds.width()+d;break;case Jd:v=-f.bounds.width()-d}Lf.clear().union(h.bounds),Lf.translate(v-(h.x||0),b-(h.y||0)),Tf(h,"x",v)|Tf(h,"y",b)&&(e.dirty(h),h.bounds.clear().union(Lf),h.mark.bounds.clear().union(Lf),e.dirty(h)),Lf.clear().union(h.bounds)}else Lf.clear();switch(Lf.union(f.bounds),u){case Yd:g=a,y=i.y1-Lf.height()-c;break;case Xd:g=i.x1-Lf.width()-c,y=a;break;case Jd:g=i.x2+Lf.width()+c,y=a;break;case Qd:g=a,y=i.y2+c;break;default:g=o.x,y=o.y}return Tf(o,"x",g)|Tf(o,"y",y)&&(Lf.translate(g,y),e.dirty(o),o.bounds.clear().union(Lf),t.bounds.clear().union(Lf),e.dirty(o)),o.bounds}(e,r,l,c,d));t.clip&&d.set(0,0,t.width||0,t.height||0);!function(e,t,n,r){const i=r.autosize||{},a=i.type;if(e._autosize<1||!a)return;let o=e._width,s=e._height,u=Math.max(0,t.width||0),l=Math.max(0,Math.ceil(-n.x1)),c=Math.max(0,t.height||0),d=Math.max(0,Math.ceil(-n.y1));const f=Math.max(0,Math.ceil(n.x2-u)),h=Math.max(0,Math.ceil(n.y2-c));if(i.contains===pf){const t=e.padding();o-=t.left+t.right,s-=t.top+t.bottom}a===vf?(l=0,d=0,u=o,c=s):a===mf?(u=Math.max(0,o-l-f),c=Math.max(0,s-d-h)):a===gf?(u=Math.max(0,o-l-f),s=c+d+h):a===yf?(o=u+l+f,c=Math.max(0,s-d-h)):"pad"===a&&(o=u+l+f,s=c+d+h);e._resizeView(o,s,u,c,[l,d],i.resize)}(e,t,d,n)}(n,t,e)})),function(e){return e&&"legend-entry"!==e.mark.role}(e.mark.group)?t.reflow():t}});var ah=Object.freeze({__proto__:null,bound:wf,identifier:Cf,mark:Ff,overlap:Mf,render:qf,viewlayout:ih});function oh(e){Br.call(this,null,e)}function sh(e){Br.call(this,null,e)}function uh(){return er({})}function lh(e){Br.call(this,null,e)}function ch(e){Br.call(this,[],e)}Ce(oh,Br,{transform(e,t){if(this.value&&!e.modified())return t.StopPropagation;var n=t.dataflow.locale(),r=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=this.value,a=e.scale,o=Ko(a,null==e.count?e.values?e.values.length:10:e.count,e.minstep),s=e.format||ts(n,a,o,e.formatSpecifier,e.formatType,!!e.values),u=e.values?Zo(a,e.values,o):es(a,o);return i&&(r.rem=i),i=u.map(((e,t)=>er({index:t/(u.length-1||1),value:e,label:s(e)}))),e.extra&&i.length&&i.push(er({index:-1,extra:{value:i[0].value},label:""})),r.source=i,r.add=i,this.value=i,r}}),Ce(sh,Br,{transform(e,t){var n=t.dataflow,r=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=e.item||uh,a=e.key||Kn,o=this.value;return T(r.encode)&&(r.encode=null),o&&(e.modified("key")||t.modified(a))&&C("DataJoin does not support modified key function or fields."),o||(t=t.addAll(),this.value=o=function(e){const t=De().test((e=>e.exit));return t.lookup=n=>t.get(e(n)),t}(a)),t.visit(t.ADD,(e=>{const t=a(e);let n=o.get(t);n?n.exit?(o.empty--,r.add.push(n)):r.mod.push(n):(n=i(e),o.set(t,n),r.add.push(n)),n.datum=e,n.exit=!1})),t.visit(t.MOD,(e=>{const t=a(e),n=o.get(t);n&&(n.datum=e,r.mod.push(n))})),t.visit(t.REM,(e=>{const t=a(e),n=o.get(t);e!==n.datum||n.exit||(r.rem.push(n),n.exit=!0,++o.empty)})),t.changed(t.ADD_MOD)&&r.modifies("datum"),(t.clean()||e.clean&&o.empty>n.cleanThreshold)&&n.runAfter(o.clean),r}}),Ce(lh,Br,{transform(e,t){var n=t.fork(t.ADD_REM),r=e.mod||!1,i=e.encoders,a=t.encode;if(T(a)){if(!n.changed()&&!a.every((e=>i[e])))return t.StopPropagation;a=a[0],n.encode=null}var o="enter"===a,s=i.update||$,u=i.enter||$,l=i.exit||$,c=(a&&!o?i[a]:s)||$;if(t.changed(t.ADD)&&(t.visit(t.ADD,(t=>{u(t,e),s(t,e)})),n.modifies(u.output),n.modifies(s.output),c!==$&&c!==s&&(t.visit(t.ADD,(t=>{c(t,e)})),n.modifies(c.output))),t.changed(t.REM)&&l!==$&&(t.visit(t.REM,(t=>{l(t,e)})),n.modifies(l.output)),o||c!==$){const i=t.MOD|(e.modified()?t.REFLOW:0);o?(t.visit(i,(t=>{const i=u(t,e)||r;(c(t,e)||i)&&n.mod.push(t)})),n.mod.length&&n.modifies(u.output)):t.visit(i,(t=>{(c(t,e)||r)&&n.mod.push(t)})),n.mod.length&&n.modifies(c.output)}return n.changed()?n:t.StopPropagation}}),Ce(ch,Br,{transform(e,t){if(null!=this.value&&!e.modified())return t.StopPropagation;var n,r,i,a,o,s=t.dataflow.locale(),u=t.fork(t.NO_SOURCE|t.NO_FIELDS),l=this.value,c=e.type||Yo,d=e.scale,f=+e.limit,h=Ko(d,null==e.count?5:e.count,e.minstep),p=!!e.values||c===Yo,m=e.format||os(s,d,h,c,e.formatSpecifier,e.formatType,p),g=e.values||as(d,h);return l&&(u.rem=l),c===Yo?(f&&g.length>f?(t.dataflow.warn("Symbol legend count exceeds limit, filtering items."),l=g.slice(0,f-1),o=!0):l=g,de(i=e.size)?(e.values||0!==d(l[0])||(l=l.slice(1)),a=l.reduce(((t,n)=>Math.max(t,i(n,e))),0)):i=ye(a=i||8),l=l.map(((t,n)=>er({index:n,label:m(t,n,l),value:t,offset:a,size:i(t,e)}))),o&&(o=g[l.length],l.push(er({index:l.length,label:`…${g.length-l.length} entries`,value:o,offset:a,size:i(o,e)})))):"gradient"===c?(n=d.domain(),r=jo(d,n[0],W(n)),g.length<3&&!e.values&&n[0]!==W(n)&&(g=[n[0],W(n)]),l=g.map(((e,t)=>er({index:t,label:m(e,t,g),value:e,perc:r(e)})))):(i=g.length-1,r=function(e){const t=e.domain(),n=t.length-1;let r=+t[0],i=+W(t),a=i-r;if(e.type===fo){const e=n?a/n:.1;r-=e,i+=e,a=i-r}return e=>(e-r)/a}(d),l=g.map(((e,t)=>er({index:t,label:m(e,t,g),value:e,perc:t?r(e):0,perc2:t===i?1:r(g[t+1])})))),u.source=l,u.add=l,this.value=l,u}});const dh=e=>e.source.x,fh=e=>e.source.y,hh=e=>e.target.x,ph=e=>e.target.y;function mh(e){Br.call(this,{},e)}mh.Definition={type:"LinkPath",metadata:{modifies:!0},params:[{name:"sourceX",type:"field",default:"source.x"},{name:"sourceY",type:"field",default:"source.y"},{name:"targetX",type:"field",default:"target.x"},{name:"targetY",type:"field",default:"target.y"},{name:"orient",type:"enum",default:"vertical",values:["horizontal","vertical","radial"]},{name:"shape",type:"enum",default:"line",values:["line","arc","curve","diagonal","orthogonal"]},{name:"require",type:"signal"},{name:"as",type:"string",default:"path"}]},Ce(mh,Br,{transform(e,t){var n=e.sourceX||dh,r=e.sourceY||fh,i=e.targetX||hh,a=e.targetY||ph,o=e.as||"path",s=e.orient||"vertical",u=e.shape||"line",l=bh.get(u+"-"+s)||bh.get(u);return l||C("LinkPath unsupported type: "+e.shape+(e.orient?"-"+e.orient:"")),t.visit(t.SOURCE,(e=>{e[o]=l(n(e),r(e),i(e),a(e))})),t.reflow(e.modified()).modifies(o)}});const gh=(e,t,n,r)=>"M"+e+","+t+"L"+n+","+r,yh=(e,t,n,r)=>{var i=n-e,a=r-t,o=Math.sqrt(i*i+a*a)/2;return"M"+e+","+t+"A"+o+","+o+" "+180*Math.atan2(a,i)/Math.PI+" 0 1 "+n+","+r},vh=(e,t,n,r)=>{const i=n-e,a=r-t,o=.2*(i+a),s=.2*(a-i);return"M"+e+","+t+"C"+(e+o)+","+(t+s)+" "+(n+s)+","+(r-o)+" "+n+","+r},bh=De({line:gh,"line-radial":(e,t,n,r)=>gh(t*Math.cos(e),t*Math.sin(e),r*Math.cos(n),r*Math.sin(n)),arc:yh,"arc-radial":(e,t,n,r)=>yh(t*Math.cos(e),t*Math.sin(e),r*Math.cos(n),r*Math.sin(n)),curve:vh,"curve-radial":(e,t,n,r)=>vh(t*Math.cos(e),t*Math.sin(e),r*Math.cos(n),r*Math.sin(n)),"orthogonal-horizontal":(e,t,n,r)=>"M"+e+","+t+"V"+r+"H"+n,"orthogonal-vertical":(e,t,n,r)=>"M"+e+","+t+"H"+n+"V"+r,"orthogonal-radial":(e,t,n,r)=>{const i=Math.cos(e),a=Math.sin(e),o=Math.cos(n),s=Math.sin(n);return"M"+t*i+","+t*a+"A"+t+","+t+" 0 0,"+((Math.abs(n-e)>Math.PI?n<=e:n>e)?1:0)+" "+t*o+","+t*s+"L"+r*o+","+r*s},"diagonal-horizontal":(e,t,n,r)=>{const i=(e+n)/2;return"M"+e+","+t+"C"+i+","+t+" "+i+","+r+" "+n+","+r},"diagonal-vertical":(e,t,n,r)=>{const i=(t+r)/2;return"M"+e+","+t+"C"+e+","+i+" "+n+","+i+" "+n+","+r},"diagonal-radial":(e,t,n,r)=>{const i=Math.cos(e),a=Math.sin(e),o=Math.cos(n),s=Math.sin(n),u=(t+r)/2;return"M"+t*i+","+t*a+"C"+u*i+","+u*a+" "+u*o+","+u*s+" "+r*o+","+r*s}});function xh(e){Br.call(this,null,e)}xh.Definition={type:"Pie",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"startAngle",type:"number",default:0},{name:"endAngle",type:"number",default:6.283185307179586},{name:"sort",type:"boolean",default:!1},{name:"as",type:"string",array:!0,length:2,default:["startAngle","endAngle"]}]},Ce(xh,Br,{transform(e,t){var n,i,a,o=e.as||["startAngle","endAngle"],s=o[0],u=o[1],l=e.field||R,c=e.startAngle||0,d=null!=e.endAngle?e.endAngle:2*Math.PI,f=t.source,h=f.map(l),p=h.length,m=c,g=(d-c)/r.sum(h),y=r.range(p);for(e.sort&&y.sort(((e,t)=>h[e]-h[t])),n=0;n<p;++n)a=h[y[n]],(i=f[y[n]])[s]=m,i[u]=m+=a*g;return this.value=h,t.reflow(e.modified()).modifies(o)}});function _h(e){return Oo(e)&&e!==uo}const kh=Ve(["set","modified","clear","type","scheme","schemeExtent","schemeCount","domain","domainMin","domainMid","domainMax","domainRaw","domainImplicit","nice","zero","bins","range","rangeStep","round","reverse","interpolate","interpolateGamma"]);function Ah(e){Br.call(this,null,e),this.modified(!0)}function wh(e,t,n){$o(e)&&(Math.abs(t.reduce(((e,t)=>e+(t<0?-1:t>0?1:0)),0))!==t.length);return t}function Dh(e,t,n){return de(e)&&(t||n)?No(e,Eh(t||[0,1],n)):e}function Eh(e,t){return t?e.slice().reverse():e}function Ch(e){Br.call(this,null,e)}Ce(Ah,Br,{transform(e,t){var n=t.dataflow,i=this.value,a=function(e){var t,n=e.type,r="";if(n===uo)return"sequential-linear";(function(e){const t=e.type;return Oo(t)&&t!==oo&&t!==so&&(e.scheme||e.range&&e.range.length&&e.range.every(ze))})(e)&&(r=2===(t=e.rawDomain?e.rawDomain.length:e.domain?e.domain.length+ +(null!=e.domainMid):0)?"sequential-":3===t?"diverging-":"");return(r+n||to).toLowerCase()}(e);for(a in i&&a===i.type||(this.value=i=Mo(a)()),e)if(!kh[a]){if("padding"===a&&_h(i.type))continue;de(i[a])?i[a](e[a]):n.warn("Unsupported scale property: "+a)}return function(e,t,n){var r=e.type,i=t.round||!1,a=t.range;if(null!=t.rangeStep)a=function(e,t,n){e!==mo&&e!==po&&C("Only band and point scales support rangeStep.");var r=(null!=t.paddingOuter?t.paddingOuter:t.padding)||0,i=e===po?1:(null!=t.paddingInner?t.paddingInner:t.padding)||0;return[0,t.rangeStep*eo(n,i,r)]}(r,t,n);else if(t.scheme&&(a=function(e,t,n){var r,i=t.schemeExtent;T(t.scheme)?r=Po(t.scheme,t.interpolate,t.interpolateGamma):(r=Vo(t.scheme.toLowerCase()))||C(`Unrecognized scheme name: ${t.scheme}`);return n=e===fo?n+1:e===go?n-1:e===lo||e===co?+t.schemeCount||5:n,qo(e)?Dh(r,i,t.reverse):de(r)?Uo(Dh(r,i),n):e===ho?r:r.slice(0,n)}(r,t,n),de(a))){if(e.interpolator)return e.interpolator(a);C(`Scale type ${r} does not support interpolating color schemes.`)}if(a&&qo(r))return e.interpolator(Po(Eh(a,t.reverse),t.interpolate,t.interpolateGamma));a&&t.interpolate&&e.interpolate?e.interpolate(Io(t.interpolate,t.interpolateGamma)):de(e.round)?e.round(i):de(e.rangeRound)&&e.interpolate(i?c.interpolateRound:c.interpolate);a&&e.range(Eh(a,t.reverse))}(i,e,function(e,t,n){let i=t.bins;if(i&&!T(i)){const t=e.domain(),n=t[0],a=W(t),o=i.step;let s=null==i.start?n:i.start,u=null==i.stop?a:i.stop;o||C("Scale bins parameter missing step property."),s<n&&(s=o*Math.ceil(n/o)),u>a&&(u=o*Math.floor(a/o)),i=r.range(s,u+o/2,o)}i?e.bins=i:e.bins&&delete e.bins;e.type===go&&(i?t.domain||t.domainRaw||(e.domain(i),n=i.length):e.bins=e.domain());return n}(i,e,function(e,t,n){const r=function(e,t,n){return t?(e.domain(wh(e.type,t,n)),t.length):-1}(e,t.domainRaw,n);if(r>-1)return r;var i,a,o=t.domain,s=e.type,u=t.zero||void 0===t.zero&&function(e){const t=e.type;return!e.bins&&(t===to||t===ro||t===io)}(e);if(!o)return 0;_h(s)&&t.padding&&o[0]!==W(o)&&(o=function(e,t,n,r,i,a){var o=Math.abs(W(n)-n[0]),s=o/(o-2*r),u=e===no?ie(t,null,s):e===io?ae(t,null,s,.5):e===ro?ae(t,null,s,i||1):e===ao?oe(t,null,s,a||1):re(t,null,s);return(t=t.slice())[0]=u[0],t[t.length-1]=u[1],t}(s,o,t.range,t.padding,t.exponent,t.constant));if((u||null!=t.domainMin||null!=t.domainMax||null!=t.domainMid)&&(i=(o=o.slice()).length-1||1,u&&(o[0]>0&&(o[0]=0),o[i]<0&&(o[i]=0)),null!=t.domainMin&&(o[0]=t.domainMin),null!=t.domainMax&&(o[i]=t.domainMax),null!=t.domainMid)){const e=(a=t.domainMid)>o[i]?i+1:a<o[0]?0:i;e!==i&&n.warn("Scale domainMid exceeds domain min or max.",a),o.splice(e,0,a)}e.domain(wh(s,o,n)),s===ho&&e.unknown(t.domainImplicit?l.scaleImplicit:void 0);t.nice&&e.nice&&e.nice(!0!==t.nice&&Ko(e,t.nice)||null);return o.length}(i,e,n))),t.fork(t.NO_SOURCE|t.NO_FIELDS)}}),Ce(Ch,Br,{transform(e,t){const n=e.modified("sort")||t.changed(t.ADD)||t.modified(e.sort.fields)||t.modified("datum");return n&&t.source.sort(ir(e.sort)),this.modified(n),t}});const Fh="zero",Mh="center",Sh="normalize",Bh=["y0","y1"];function Oh(e){Br.call(this,null,e)}function Rh(e,t,n,r,i){for(var a,o=(t-e.sum)/2,s=e.length,u=0;u<s;++u)(a=e[u])[r]=o,a[i]=o+=Math.abs(n(a))}function zh(e,t,n,r,i){for(var a,o=1/e.sum,s=0,u=e.length,l=0,c=0;l<u;++l)(a=e[l])[r]=s,a[i]=s=o*(c+=Math.abs(n(a)))}function $h(e,t,n,r,i){for(var a,o,s=0,u=0,l=e.length,c=0;c<l;++c)(a=+n(o=e[c]))<0?(o[r]=u,o[i]=u+=a):(o[r]=s,o[i]=s+=a)}Oh.Definition={type:"Stack",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"groupby",type:"field",array:!0},{name:"sort",type:"compare"},{name:"offset",type:"enum",default:Fh,values:[Fh,Mh,Sh]},{name:"as",type:"string",array:!0,length:2,default:Bh}]},Ce(Oh,Br,{transform(e,t){var n,r,i,a,o=e.as||Bh,s=o[0],u=o[1],l=ir(e.sort),c=e.field||R,d=e.offset===Mh?Rh:e.offset===Sh?zh:$h;for(n=function(e,t,n,r){var i,a,o,s,u,l,c,d,f,h=[],p=e=>e(u);if(null==t)h.push(e.slice());else for(i={},a=0,o=e.length;a<o;++a)u=e[a],(c=i[l=t.map(p)])||(i[l]=c=[],h.push(c)),c.push(u);for(l=0,f=0,s=h.length;l<s;++l){for(a=0,d=0,o=(c=h[l]).length;a<o;++a)d+=Math.abs(r(c[a]));c.sum=d,d>f&&(f=d),n&&c.sort(n)}return h.max=f,h}(t.source,e.groupby,l,c),r=0,i=n.length,a=n.max;r<i;++r)d(n[r],a,c,s,u);return t.reflow(e.modified()).modifies(o)}});var qh=Object.freeze({__proto__:null,axisticks:oh,datajoin:sh,encode:lh,legendentries:ch,linkpath:mh,pie:xh,scale:Ah,sortitems:Ch,stack:Oh}),Lh=Math.abs,Th=Math.cos,Nh=Math.sin,Ph=Math.PI,Uh=Ph/2,jh=function(e){return e>0?Math.sqrt(e):0}(2);function Ih(e){return e>1?Uh:e<-1?-Uh:Math.asin(e)}function Wh(e,t){var n,r=e*Nh(t),i=30;do{t-=n=(t+Nh(t)-r)/(1+Th(t))}while(Lh(n)>1e-6&&--i>0);return t/2}var Hh=function(e,t,n){function r(r,i){return[e*r*Th(i=Wh(n,i)),t*Nh(i)]}return r.invert=function(r,i){return i=Ih(i/t),[r/(e*Th(i)),Ih((2*i+Nh(2*i))/n)]},r}(jh/Uh,jh,Ph);const Gh=d.geoPath(),Vh=["clipAngle","clipExtent","scale","translate","center","rotate","parallels","precision","reflectX","reflectY","coefficient","distance","fraction","lobes","parallel","radius","ratio","spacing","tilt"];function Yh(e,t){return function n(){const r=t();return r.type=e,r.path=d.geoPath().projection(r),r.copy=r.copy||function(){const e=n();return Vh.forEach((t=>{r[t]&&e[t](r[t]())})),e.path.pointRadius(r.path.pointRadius()),e},r}}function Xh(e,t){if(!e||"string"!=typeof e)throw new Error("Projection type must be a name string.");return e=e.toLowerCase(),arguments.length>1?(Qh[e]=Yh(e,t),this):Qh[e]||null}function Jh(e){return e&&e.path||Gh}const Qh={albers:d.geoAlbers,albersusa:d.geoAlbersUsa,azimuthalequalarea:d.geoAzimuthalEqualArea,azimuthalequidistant:d.geoAzimuthalEquidistant,conicconformal:d.geoConicConformal,conicequalarea:d.geoConicEqualArea,conicequidistant:d.geoConicEquidistant,equalEarth:d.geoEqualEarth,equirectangular:d.geoEquirectangular,gnomonic:d.geoGnomonic,identity:d.geoIdentity,mercator:d.geoMercator,mollweide:function(){return d.geoProjection(Hh).scale(169.529)},naturalEarth1:d.geoNaturalEarth1,orthographic:d.geoOrthographic,stereographic:d.geoStereographic,transversemercator:d.geoTransverseMercator};for(const e in Qh)Xh(e,Qh[e]);function Kh(){}const Zh=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function ep(){var e=1,t=1,n=o;function r(e,t){return t.map((t=>i(e,t)))}function i(r,i){var o=[],s=[];return function(n,r,i){var o,s,u,l,c,d,f=new Array,h=new Array;o=s=-1,l=n[0]>=r,Zh[l<<1].forEach(p);for(;++o<e-1;)u=l,l=n[o+1]>=r,Zh[u|l<<1].forEach(p);Zh[l<<0].forEach(p);for(;++s<t-1;){for(o=-1,l=n[s*e+e]>=r,c=n[s*e]>=r,Zh[l<<1|c<<2].forEach(p);++o<e-1;)u=l,l=n[s*e+e+o+1]>=r,d=c,c=n[s*e+o+1]>=r,Zh[u|l<<1|c<<2|d<<3].forEach(p);Zh[l|c<<3].forEach(p)}o=-1,c=n[s*e]>=r,Zh[c<<2].forEach(p);for(;++o<e-1;)d=c,c=n[s*e+o+1]>=r,Zh[c<<2|d<<3].forEach(p);function p(e){var t,n,r=[e[0][0]+o,e[0][1]+s],u=[e[1][0]+o,e[1][1]+s],l=a(r),c=a(u);(t=h[l])?(n=f[c])?(delete h[t.end],delete f[n.start],t===n?(t.ring.push(u),i(t.ring)):f[t.start]=h[n.end]={start:t.start,end:n.end,ring:t.ring.concat(n.ring)}):(delete h[t.end],t.ring.push(u),h[t.end=c]=t):(t=f[c])?(n=h[l])?(delete f[t.start],delete h[n.end],t===n?(t.ring.push(u),i(t.ring)):f[n.start]=h[t.end]={start:n.start,end:t.end,ring:n.ring.concat(t.ring)}):(delete f[t.start],t.ring.unshift(r),f[t.start=l]=t):f[l]=h[c]={start:l,end:c,ring:[r,u]}}Zh[c<<3].forEach(p)}(r,i,(e=>{n(e,r,i),function(e){var t=0,n=e.length,r=e[n-1][1]*e[0][0]-e[n-1][0]*e[0][1];for(;++t<n;)r+=e[t-1][1]*e[t][0]-e[t-1][0]*e[t][1];return r}(e)>0?o.push([e]):s.push(e)})),s.forEach((e=>{for(var t,n=0,r=o.length;n<r;++n)if(-1!==tp((t=o[n])[0],e))return void t.push(e)})),{type:"MultiPolygon",value:i,coordinates:o}}function a(t){return 2*t[0]+t[1]*(e+1)*4}function o(n,r,i){n.forEach((n=>{var a,o=n[0],s=n[1],u=0|o,l=0|s,c=r[l*e+u];o>0&&o<e&&u===o&&(a=r[l*e+u-1],n[0]=o+(i-a)/(c-a)-.5),s>0&&s<t&&l===s&&(a=r[(l-1)*e+u],n[1]=s+(i-a)/(c-a)-.5)}))}return r.contour=i,r.size=function(n){if(!arguments.length)return[e,t];var i=Math.floor(n[0]),a=Math.floor(n[1]);return i>=0&&a>=0||C("invalid size"),e=i,t=a,r},r.smooth=function(e){return arguments.length?(n=e?o:Kh,r):n===o},r}function tp(e,t){for(var n,r=-1,i=t.length;++r<i;)if(n=np(e,t[r]))return n;return 0}function np(e,t){for(var n=t[0],r=t[1],i=-1,a=0,o=e.length,s=o-1;a<o;s=a++){var u=e[a],l=u[0],c=u[1],d=e[s],f=d[0],h=d[1];if(rp(u,d,t))return 0;c>r!=h>r&&n<(f-l)*(r-c)/(h-c)+l&&(i=-i)}return i}function rp(e,t,n){var r,i,a,o;return function(e,t,n){return(t[0]-e[0])*(n[1]-e[1])==(n[0]-e[0])*(t[1]-e[1])}(e,t,n)&&(i=e[r=+(e[0]===t[0])],a=n[r],o=t[r],i<=a&&a<=o||o<=a&&a<=i)}function ip(e,t,n){return function(i){var a=xe(i),o=n?Math.min(a[0],0):a[0],s=a[1],u=s-o,l=t?r.tickStep(o,s,e):u/(e+1);return r.range(o+l,s,l)}}function ap(e){Br.call(this,null,e)}function op(e,t,n,r,i){const a=e.x1||0,o=e.y1||0,s=t*n<0;function u(e){e.forEach(l)}function l(e){s&&e.reverse(),e.forEach(c)}function c(e){e[0]=(e[0]-a)*t+r,e[1]=(e[1]-o)*n+i}return function(e){return e.coordinates.forEach(u),e}}function sp(e,t,n){const r=e>=0?e:Tr(t,n);return Math.round((Math.sqrt(4*r*r+1)-1)/2)}function up(e){return de(e)?e:ye(+e)}function lp(){var e=e=>e[0],t=e=>e[1],n=R,i=[-1,-1],a=960,o=500,s=2;function u(u,l){const c=sp(i[0],u,e)>>s,d=sp(i[1],u,t)>>s,f=c?c+2:0,h=d?d+2:0,p=2*f+(a>>s),m=2*h+(o>>s),g=new Float32Array(p*m),y=new Float32Array(p*m);let v=g;u.forEach((r=>{const i=f+(+e(r)>>s),a=h+(+t(r)>>s);i>=0&&i<p&&a>=0&&a<m&&(g[i+a*p]+=+n(r))})),c>0&&d>0?(cp(p,m,g,y,c),dp(p,m,y,g,d),cp(p,m,g,y,c),dp(p,m,y,g,d),cp(p,m,g,y,c),dp(p,m,y,g,d)):c>0?(cp(p,m,g,y,c),cp(p,m,y,g,c),cp(p,m,g,y,c),v=y):d>0&&(dp(p,m,g,y,d),dp(p,m,y,g,d),dp(p,m,g,y,d),v=y);const b=l?Math.pow(2,-2*s):1/r.sum(v);for(let e=0,t=p*m;e<t;++e)v[e]*=b;return{values:v,scale:1<<s,width:p,height:m,x1:f,y1:h,x2:f+(a>>s),y2:h+(o>>s)}}return u.x=function(t){return arguments.length?(e=up(t),u):e},u.y=function(e){return arguments.length?(t=up(e),u):t},u.weight=function(e){return arguments.length?(n=up(e),u):n},u.size=function(e){if(!arguments.length)return[a,o];var t=+e[0],n=+e[1];return t>=0&&n>=0||C("invalid size"),a=t,o=n,u},u.cellSize=function(e){return arguments.length?((e=+e)>=1||C("invalid cell size"),s=Math.floor(Math.log(e)/Math.LN2),u):1<<s},u.bandwidth=function(e){return arguments.length?(1===(e=le(e)).length&&(e=[+e[0],+e[0]]),2!==e.length&&C("invalid bandwidth"),i=e,u):i},u}function cp(e,t,n,r,i){const a=1+(i<<1);for(let o=0;o<t;++o)for(let t=0,s=0;t<e+i;++t)t<e&&(s+=n[t+o*e]),t>=i&&(t>=a&&(s-=n[t-a+o*e]),r[t-i+o*e]=s/Math.min(t+1,e-1+a-t,a))}function dp(e,t,n,r,i){const a=1+(i<<1);for(let o=0;o<e;++o)for(let s=0,u=0;s<t+i;++s)s<t&&(u+=n[o+s*e]),s>=i&&(s>=a&&(u-=n[o+(s-a)*e]),r[o+(s-i)*e]=u/Math.min(s+1,t-1+a-s,a))}function fp(e){Br.call(this,null,e)}ap.Definition={type:"Isocontour",metadata:{generates:!0},params:[{name:"field",type:"field"},{name:"thresholds",type:"number",array:!0},{name:"levels",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"zero",type:"boolean",default:!0},{name:"smooth",type:"boolean",default:!0},{name:"scale",type:"number",expr:!0},{name:"translate",type:"number",array:!0,expr:!0},{name:"as",type:"string",null:!0,default:"contour"}]},Ce(ap,Br,{transform(e,t){if(this.value&&!t.changed()&&!e.modified())return t.StopPropagation;var n=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=t.materialize(t.SOURCE).source,a=e.field||B,o=ep().smooth(!1!==e.smooth),s=e.thresholds||function(e,t,n){const i=ip(n.levels||10,n.nice,!1!==n.zero);return"shared"!==n.resolve?i:i(e.map((e=>r.max(t(e).values))))}(i,a,e),u=null===e.as?null:e.as||"contour",l=[];return i.forEach((t=>{const n=a(t),r=o.size([n.width,n.height])(n.values,T(s)?s:s(n.values));!function(e,t,n,r){let i=r.scale||t.scale,a=r.translate||t.translate;de(i)&&(i=i(n,r));de(a)&&(a=a(n,r));if((1===i||null==i)&&!a)return;const o=(Oe(i)?i:i[0])||1,s=(Oe(i)?i:i[1])||1,u=a&&a[0]||0,l=a&&a[1]||0;e.forEach(op(t,o,s,u,l))}(r,n,t,e),r.forEach((e=>{l.push(nr(t,er(null!=u?{[u]:e}:e)))}))})),this.value&&(n.rem=this.value),this.value=n.source=n.add=l,n}}),fp.Definition={type:"KDE2D",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"weight",type:"field"},{name:"groupby",type:"field",array:!0},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number",array:!0,length:2},{name:"counts",type:"boolean",default:!1},{name:"as",type:"string",default:"grid"}]};const hp=["x","y","weight","size","cellSize","bandwidth"];function pp(e,t){return hp.forEach((n=>null!=t[n]?e[n](t[n]):0)),e}function mp(e){Br.call(this,null,e)}Ce(fp,Br,{transform(e,t){if(this.value&&!t.changed()&&!e.modified())return t.StopPropagation;var n,r=t.fork(t.NO_SOURCE|t.NO_FIELDS),i=function(e,t){var n,r,i,a,o,s,u=[],l=e=>e(a);if(null==t)u.push(e);else for(n={},r=0,i=e.length;r<i;++r)a=e[r],(s=n[o=t.map(l)])||(n[o]=s=[],s.dims=o,u.push(s)),s.push(a);return u}(t.materialize(t.SOURCE).source,e.groupby),a=(e.groupby||[]).map(k),o=pp(lp(),e),s=e.as||"grid";return n=i.map((t=>er(function(e,t){for(let n=0;n<a.length;++n)e[a[n]]=t[n];return e}({[s]:o(t,e.counts)},t.dims)))),this.value&&(r.rem=this.value),this.value=r.source=r.add=n,r}}),mp.Definition={type:"Contour",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"values",type:"number",array:!0},{name:"x",type:"field"},{name:"y",type:"field"},{name:"weight",type:"field"},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number"},{name:"count",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"thresholds",type:"number",array:!0},{name:"smooth",type:"boolean",default:!0}]},Ce(mp,Br,{transform(e,t){if(this.value&&!t.changed()&&!e.modified())return t.StopPropagation;var n,r,i=t.fork(t.NO_SOURCE|t.NO_FIELDS),a=ep().smooth(!1!==e.smooth),o=e.values,s=e.thresholds||ip(e.count||10,e.nice,!!o),u=e.size;return o||(o=t.materialize(t.SOURCE).source,r=op(n=pp(lp(),e)(o,!0),n.scale||1,n.scale||1,0,0),u=[n.width,n.height],o=n.values),s=T(s)?s:s(o),o=a.size(u)(o,s),r&&o.forEach(r),this.value&&(i.rem=this.value),this.value=i.source=i.add=(o||[]).map(er),i}});const gp="Feature",yp="FeatureCollection";function vp(e){Br.call(this,null,e)}function bp(e){Br.call(this,null,e)}function xp(e){Br.call(this,null,e)}function _p(e){Br.call(this,null,e)}function kp(e){Br.call(this,[],e),this.generator=d.geoGraticule()}function Ap(e){Br.call(this,null,e)}function wp(e){if(!de(e))return!1;const t=Ve(A(e));return t.$x||t.$y||t.$value||t.$max}function Dp(e){Br.call(this,null,e),this.modified(!0)}function Ep(e,t,n){de(e[t])&&e[t](n)}vp.Definition={type:"GeoJSON",metadata:{},params:[{name:"fields",type:"field",array:!0,length:2},{name:"geojson",type:"field"}]},Ce(vp,Br,{transform(e,t){var n,r=this._features,i=this._points,a=e.fields,o=a&&a[0],s=a&&a[1],u=e.geojson||!a&&B,l=t.ADD;n=e.modified()||t.changed(t.REM)||t.modified(A(u))||o&&t.modified(A(o))||s&&t.modified(A(s)),this.value&&!n||(l=t.SOURCE,this._features=r=[],this._points=i=[]),u&&t.visit(l,(e=>r.push(u(e)))),o&&s&&(t.visit(l,(e=>{var t=o(e),n=s(e);null!=t&&null!=n&&(t=+t)===t&&(n=+n)===n&&i.push([t,n])})),r=r.concat({type:gp,geometry:{type:"MultiPoint",coordinates:i}})),this.value={type:yp,features:r}}}),bp.Definition={type:"GeoPath",metadata:{modifies:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"path"}]},Ce(bp,Br,{transform(e,t){var n=t.fork(t.ALL),r=this.value,i=e.field||B,a=e.as||"path",o=n.SOURCE;!r||e.modified()?(this.value=r=Jh(e.projection),n.materialize().reflow()):o=i===B||t.modified(i.fields)?n.ADD_MOD:n.ADD;const s=function(e,t){const n=e.pointRadius();e.context(null),null!=t&&e.pointRadius(t);return n}(r,e.pointRadius);return n.visit(o,(e=>e[a]=r(i(e)))),r.pointRadius(s),n.modifies(a)}}),xp.Definition={type:"GeoPoint",metadata:{modifies:!0},params:[{name:"projection",type:"projection",required:!0},{name:"fields",type:"field",array:!0,required:!0,length:2},{name:"as",type:"string",array:!0,length:2,default:["x","y"]}]},Ce(xp,Br,{transform(e,t){var n,r=e.projection,i=e.fields[0],a=e.fields[1],o=e.as||["x","y"],s=o[0],u=o[1];function l(e){const t=r([i(e),a(e)]);t?(e[s]=t[0],e[u]=t[1]):(e[s]=void 0,e[u]=void 0)}return e.modified()?t=t.materialize().reflow(!0).visit(t.SOURCE,l):(n=t.modified(i.fields)||t.modified(a.fields),t.visit(n?t.ADD_MOD:t.ADD,l)),t.modifies(o)}}),_p.Definition={type:"GeoShape",metadata:{modifies:!0,nomod:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field",default:"datum"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"shape"}]},Ce(_p,Br,{transform(e,t){var n=t.fork(t.ALL),r=this.value,i=e.as||"shape",a=n.ADD;return r&&!e.modified()||(this.value=r=function(e,t,n){const r=null==n?n=>e(t(n)):r=>{var i=e.pointRadius(),a=e.pointRadius(n)(t(r));return e.pointRadius(i),a};return r.context=t=>(e.context(t),r),r}(Jh(e.projection),e.field||M("datum"),e.pointRadius),n.materialize().reflow(),a=n.SOURCE),n.visit(a,(e=>e[i]=r)),n.modifies(i)}}),kp.Definition={type:"Graticule",metadata:{changes:!0,generates:!0},params:[{name:"extent",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMajor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMinor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"step",type:"number",array:!0,length:2},{name:"stepMajor",type:"number",array:!0,length:2,default:[90,360]},{name:"stepMinor",type:"number",array:!0,length:2,default:[10,10]},{name:"precision",type:"number",default:2.5}]},Ce(kp,Br,{transform(e,t){var n,r=this.value,i=this.generator;if(!r.length||e.modified())for(const t in e)de(i[t])&&i[t](e[t]);return n=i(),r.length?t.mod.push(rr(r[0],n)):t.add.push(er(n)),r[0]=n,t}}),Ap.Definition={type:"heatmap",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"color",type:"string",expr:!0},{name:"opacity",type:"number",expr:!0},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"as",type:"string",default:"image"}]},Ce(Ap,Br,{transform(e,t){if(!t.changed()&&!e.modified())return t.StopPropagation;var n=t.materialize(t.SOURCE).source,i="shared"===e.resolve,a=e.field||B,o=function(e,t){let n;de(e)?(n=n=>e(n,t),n.dep=wp(e)):e?n=ye(e):(n=e=>e.$value/e.$max||0,n.dep=!0);return n}(e.opacity,e),s=function(e,t){let n;de(e)?(n=n=>f.rgb(e(n,t)),n.dep=wp(e)):n=ye(f.rgb(e||"#888"));return n}(e.color,e),u=e.as||"image",l={$x:0,$y:0,$value:0,$max:i?r.max(n.map((e=>r.max(a(e).values)))):0};return n.forEach((e=>{const t=a(e),n=be({},e,l);i||(n.$max=r.max(t.values||[])),e[u]=function(e,t,n,r){const i=e.width,a=e.height,o=e.x1||0,s=e.y1||0,u=e.x2||i,l=e.y2||a,c=e.values,d=c?e=>c[e]:O,f=Ka(u-o,l-s),h=f.getContext("2d"),p=h.getImageData(0,0,u-o,l-s),m=p.data;for(let e=s,a=0;e<l;++e){t.$y=e-s;for(let s=o,l=e*i;s<u;++s,a+=4){t.$x=s-o,t.$value=d(s+l);const e=n(t);m[a+0]=e.r,m[a+1]=e.g,m[a+2]=e.b,m[a+3]=~~(255*r(t))}}return h.putImageData(p,0,0),f}(t,n,s.dep?s:ye(s(n)),o.dep?o:ye(o(n)))})),t.reflow(!0).modifies(u)}}),Ce(Dp,Br,{transform(e,t){let n=this.value;return!n||e.modified("type")?(this.value=n=function(e){const t=Xh((e||"mercator").toLowerCase());t||C("Unrecognized projection type: "+e);return t()}(e.type),Vh.forEach((t=>{null!=e[t]&&Ep(n,t,e[t])}))):Vh.forEach((t=>{e.modified(t)&&Ep(n,t,e[t])})),null!=e.pointRadius&&n.path.pointRadius(e.pointRadius),e.fit&&function(e,t){const n=function(e){return 1===(e=le(e)).length?e[0]:{type:yp,features:e.reduce(((e,t)=>e.concat(function(e){return e.type===yp?e.features:le(e).filter((e=>null!=e)).map((e=>e.type===gp?e:{type:gp,geometry:e}))}(t))),[])}}(t.fit);t.extent?e.fitExtent(t.extent,n):t.size&&e.fitSize(t.size,n)}(n,e),t.fork(t.NO_SOURCE|t.NO_FIELDS)}});var Cp=Object.freeze({__proto__:null,contour:mp,geojson:vp,geopath:bp,geopoint:xp,geoshape:_p,graticule:kp,heatmap:Ap,isocontour:ap,kde2d:fp,projection:Dp});const Fp={center:h.forceCenter,collide:h.forceCollide,nbody:h.forceManyBody,link:h.forceLink,x:h.forceX,y:h.forceY},Mp="forces",Sp=["alpha","alphaMin","alphaTarget","velocityDecay","forces"],Bp=["static","iterations"],Op=["x","y","vx","vy"];function Rp(e){Br.call(this,null,e)}function zp(e,t,n,r){var i,a,o,s,u=le(t.forces);for(i=0,a=Sp.length;i<a;++i)(o=Sp[i])!==Mp&&t.modified(o)&&e[o](t[o]);for(i=0,a=u.length;i<a;++i)s=Mp+i,(o=n||t.modified(Mp,i)?qp(u[i]):r&&$p(u[i],r)?e.force(s):null)&&e.force(s,o);for(a=e.numForces||0;i<a;++i)e.force(Mp+i,null);return e.numForces=u.length,e}function $p(e,t){var n,r;for(n in e)if(de(r=e[n])&&t.modified(A(r)))return 1;return 0}function qp(e){var t,n;for(n in Ae(Fp,e.force)||C("Unrecognized force: "+e.force),t=Fp[e.force](),e)de(t[n])&&Lp(t[n],e[n],e);return t}function Lp(e,t,n){e(de(t)?e=>t(e,n):t)}Rp.Definition={type:"Force",metadata:{modifies:!0},params:[{name:"static",type:"boolean",default:!1},{name:"restart",type:"boolean",default:!1},{name:"iterations",type:"number",default:300},{name:"alpha",type:"number",default:1},{name:"alphaMin",type:"number",default:.001},{name:"alphaTarget",type:"number",default:0},{name:"velocityDecay",type:"number",default:.4},{name:"forces",type:"param",array:!0,params:[{key:{force:"center"},params:[{name:"x",type:"number",default:0},{name:"y",type:"number",default:0}]},{key:{force:"collide"},params:[{name:"radius",type:"number",expr:!0},{name:"strength",type:"number",default:.7},{name:"iterations",type:"number",default:1}]},{key:{force:"nbody"},params:[{name:"strength",type:"number",default:-30},{name:"theta",type:"number",default:.9},{name:"distanceMin",type:"number",default:1},{name:"distanceMax",type:"number"}]},{key:{force:"link"},params:[{name:"links",type:"data"},{name:"id",type:"field"},{name:"distance",type:"number",default:30,expr:!0},{name:"strength",type:"number",expr:!0},{name:"iterations",type:"number",default:1}]},{key:{force:"x"},params:[{name:"strength",type:"number",default:.1},{name:"x",type:"field"}]},{key:{force:"y"},params:[{name:"strength",type:"number",default:.1},{name:"y",type:"field"}]}]},{name:"as",type:"string",array:!0,modify:!1,default:Op}]},Ce(Rp,Br,{transform(e,t){var n,r,i=this.value,a=t.changed(t.ADD_REM),o=e.modified(Sp),s=e.iterations||300;if(i?(a&&(t.modifies("index"),i.nodes(t.source)),(o||t.changed(t.MOD))&&zp(i,e,0,t)):(this.value=i=function(e,t){const n=h.forceSimulation(e),r=n.stop,i=n.restart;let a=!1;return n.stopped=()=>a,n.restart=()=>(a=!1,i()),n.stop=()=>(a=!0,r()),zp(n,t,!0).on("end",(()=>a=!0))}(t.source,e),i.on("tick",(n=t.dataflow,r=this,()=>n.touch(r).run())),e.static||(a=!0,i.tick()),t.modifies("index")),o||a||e.modified(Bp)||t.changed()&&e.restart)if(i.alpha(Math.max(i.alpha(),e.alpha||1)).alphaDecay(1-Math.pow(i.alphaMin(),1/s)),e.static)for(i.stop();--s>=0;)i.tick();else if(i.stopped()&&i.restart(),!a)return t.StopPropagation;return this.finish(e,t)},finish(e,t){const n=t.dataflow;for(let e,t=this._argops,s=0,u=t.length;s<u;++s)if(e=t[s],e.name===Mp&&"link"===e.op._argval.force)for(var r,i=e.op._argops,a=0,o=i.length;a<o;++a)if("links"===i[a].name&&(r=i[a].op.source)){n.pulse(r,n.changeset().reflow());break}return t.reflow(e.modified()).modifies(Op)}});var Tp=Object.freeze({__proto__:null,force:Rp});function Np(e,t,n){const r={};return e.each((e=>{const i=e.data;n(i)&&(r[t(i)]=e)})),e.lookup=r,e}function Pp(e){Br.call(this,null,e)}Pp.Definition={type:"Nest",metadata:{treesource:!0,changes:!0},params:[{name:"keys",type:"field",array:!0},{name:"generate",type:"boolean"}]};const Up=e=>e.values;function jp(){const e=[],t={entries:e=>r(n(e,0),0),key:n=>(e.push(n),t)};function n(t,r){if(r>=e.length)return t;const i=t.length,a=e[r++],o={},s={};let u,l,c,d=-1;for(;++d<i;)u=a(l=t[d])+"",(c=o[u])?c.push(l):o[u]=[l];for(u in o)s[u]=n(o[u],r);return s}function r(t,n){if(++n>e.length)return t;const i=[];for(const e in t)i.push({key:e,values:r(t[e],n)});return i}return t}function Ip(e){Br.call(this,null,e)}Ce(Pp,Br,{transform(e,t){t.source||C("Nest transform requires an upstream data source.");var n=e.generate,r=e.modified(),i=t.clone(),a=this.value;return(!a||r||t.changed())&&(a&&a.each((e=>{e.children&&Qn(e.data)&&i.rem.push(e.data)})),this.value=a=p.hierarchy({values:le(e.keys).reduce(((e,t)=>(e.key(t),e)),jp()).entries(i.source)},Up),n&&a.each((e=>{e.children&&(e=er(e.data),i.add.push(e),i.source.push(e))})),Np(a,Kn,Kn)),i.source.root=a,i}});const Wp=(e,t)=>e.parent===t.parent?1:2;Ce(Ip,Br,{transform(e,t){t.source&&t.source.root||C(this.constructor.name+" transform requires a backing tree data source.");const n=this.layout(e.method),r=this.fields,i=t.source.root,a=e.as||r;e.field?i.sum(e.field):i.count(),e.sort&&i.sort(ir(e.sort,(e=>e.data))),function(e,t,n){for(let r,i=0,a=t.length;i<a;++i)r=t[i],r in n&&e[r](n[r])}(n,this.params,e),n.separation&&n.separation(!1!==e.separation?Wp:R);try{this.value=n(i)}catch(e){C(e)}return i.each((e=>function(e,t,n){const r=e.data,i=t.length-1;for(let a=0;a<i;++a)r[n[a]]=e[t[a]];r[n[i]]=e.children?e.children.length:0}(e,r,a))),t.reflow(e.modified()).modifies(a).modifies("leaf")}});const Hp=["x","y","r","depth","children"];function Gp(e){Ip.call(this,e)}Gp.Definition={type:"Pack",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"radius",type:"field",default:null},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:Hp.length,default:Hp}]},Ce(Gp,Ip,{layout:p.pack,params:["radius","size","padding"],fields:Hp});const Vp=["x0","y0","x1","y1","depth","children"];function Yp(e){Ip.call(this,e)}function Xp(e){Br.call(this,null,e)}Yp.Definition={type:"Partition",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:Vp.length,default:Vp}]},Ce(Yp,Ip,{layout:p.partition,params:["size","round","padding"],fields:Vp}),Xp.Definition={type:"Stratify",metadata:{treesource:!0},params:[{name:"key",type:"field",required:!0},{name:"parentKey",type:"field",required:!0}]},Ce(Xp,Br,{transform(e,t){t.source||C("Stratify transform requires an upstream data source.");let n=this.value;const r=e.modified(),i=t.fork(t.ALL).materialize(t.SOURCE),a=!n||r||t.changed(t.ADD_REM)||t.modified(e.key.fields)||t.modified(e.parentKey.fields);return i.source=i.source.slice(),a&&(n=i.source.length?Np(p.stratify().id(e.key).parentId(e.parentKey)(i.source),e.key,z):Np(p.stratify()([{}]),e.key,e.key)),i.source.root=this.value=n,i}});const Jp={tidy:p.tree,cluster:p.cluster},Qp=["x","y","depth","children"];function Kp(e){Ip.call(this,e)}function Zp(e){Br.call(this,[],e)}Kp.Definition={type:"Tree",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"tidy",values:["tidy","cluster"]},{name:"size",type:"number",array:!0,length:2},{name:"nodeSize",type:"number",array:!0,length:2},{name:"separation",type:"boolean",default:!0},{name:"as",type:"string",array:!0,length:Qp.length,default:Qp}]},Ce(Kp,Ip,{layout(e){const t=e||"tidy";if(Ae(Jp,t))return Jp[t]();C("Unrecognized Tree layout method: "+t)},params:["size","nodeSize"],fields:Qp}),Zp.Definition={type:"TreeLinks",metadata:{tree:!0,generates:!0,changes:!0},params:[]},Ce(Zp,Br,{transform(e,t){const n=this.value,r=t.source&&t.source.root,i=t.fork(t.NO_SOURCE),a={};return r||C("TreeLinks transform requires a tree data source."),t.changed(t.ADD_REM)?(i.rem=n,t.visit(t.SOURCE,(e=>a[Kn(e)]=1)),r.each((e=>{const t=e.data,n=e.parent&&e.parent.data;n&&a[Kn(t)]&&a[Kn(n)]&&i.add.push(er({source:n,target:t}))})),this.value=i.add):t.changed(t.MOD)&&(t.visit(t.MOD,(e=>a[Kn(e)]=1)),n.forEach((e=>{(a[Kn(e.source)]||a[Kn(e.target)])&&i.mod.push(e)}))),i}});const em={binary:p.treemapBinary,dice:p.treemapDice,slice:p.treemapSlice,slicedice:p.treemapSliceDice,squarify:p.treemapSquarify,resquarify:p.treemapResquarify},tm=["x0","y0","x1","y1","depth","children"];function nm(e){Ip.call(this,e)}nm.Definition={type:"Treemap",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"squarify",values:["squarify","resquarify","binary","dice","slice","slicedice"]},{name:"padding",type:"number",default:0},{name:"paddingInner",type:"number",default:0},{name:"paddingOuter",type:"number",default:0},{name:"paddingTop",type:"number",default:0},{name:"paddingRight",type:"number",default:0},{name:"paddingBottom",type:"number",default:0},{name:"paddingLeft",type:"number",default:0},{name:"ratio",type:"number",default:1.618033988749895},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:tm.length,default:tm}]},Ce(nm,Ip,{layout(){const e=p.treemap();return e.ratio=t=>{const n=e.tile();n.ratio&&e.tile(n.ratio(t))},e.method=t=>{Ae(em,t)?e.tile(em[t]):C("Unrecognized Treemap layout method: "+t)},e},params:["method","ratio","size","round","padding","paddingInner","paddingOuter","paddingTop","paddingRight","paddingBottom","paddingLeft"],fields:tm});var rm=Object.freeze({__proto__:null,nest:Pp,pack:Gp,partition:Yp,stratify:Xp,tree:Kp,treelinks:Zp,treemap:nm});function im(e,t,n,r){const i=e.width,a=e.height,o=n||r,s=Ka(i,a).getContext("2d");t.forEach((e=>am(s,e,o)));const u=new Uint32Array(s.getImageData(0,0,i,a).data.buffer),l=e.bitmap(),c=o&&e.bitmap();let d,f,h,p,m;for(f=0;f<a;++f)for(d=0;d<i;++d)m=4278190080&u[f*i+d],m&&(h=e(d),p=e(f),r||l.set(h,p),o&&268435456^m&&c.set(h,p));return[l,c]}function am(e,t,n){if(!t.length)return;const r=t[0].mark.marktype;"group"===r?t.forEach((t=>{t.items.forEach((t=>am(e,t.items,n)))})):lc[r].draw(e,{items:n?t.map(om):t})}function om(e){const t=nr(e,{});return t.stroke&&(t.strokeOpacity=1),t.fill&&(t.fillOpacity=.0625,t.stroke="#000",t.strokeOpacity=1,t.strokeWidth=2),t}const sm=31,um=new Uint32Array(33),lm=new Uint32Array(33);lm[0]=0,um[0]=~lm[0];for(let e=1;e<=32;++e)lm[e]=lm[e-1]<<1|1,um[e]=~lm[e];function cm(e,t,n){const r=Math.max(1,Math.sqrt(e*t/1e6)),i=~~((e+2*n+r)/r),a=~~((t+2*n+r)/r),o=e=>~~((e+n)/r);return o.invert=e=>e*r-n,o.bitmap=()=>function(e,t){const n=new Uint32Array(~~((e*t+32)/32));function r(e,t){n[e]|=t}function i(e,t){n[e]&=t}return{array:n,get:(t,r)=>{const i=r*e+t;return n[i>>>5]&1<<(i&sm)},set:(t,n)=>{const i=n*e+t;r(i>>>5,1<<(i&sm))},clear:(t,n)=>{const r=n*e+t;i(r>>>5,~(1<<(r&sm)))},getRange:(t,r,i,a)=>{let o,s,u,l,c=a;for(;c>=r;--c)if(o=c*e+t,s=c*e+i,u=o>>>5,l=s>>>5,u===l){if(n[u]&um[o&sm]&lm[1+(s&sm)])return!0}else{if(n[u]&um[o&sm])return!0;if(n[l]&lm[1+(s&sm)])return!0;for(let e=u+1;e<l;++e)if(n[e])return!0}return!1},setRange:(t,n,i,a)=>{let o,s,u,l,c;for(;n<=a;++n)if(o=n*e+t,s=n*e+i,u=o>>>5,l=s>>>5,u===l)r(u,um[o&sm]&lm[1+(s&sm)]);else for(r(u,um[o&sm]),r(l,lm[1+(s&sm)]),c=u+1;c<l;++c)r(c,4294967295)},clearRange:(t,n,r,a)=>{let o,s,u,l,c;for(;n<=a;++n)if(o=n*e+t,s=n*e+r,u=o>>>5,l=s>>>5,u===l)i(u,lm[o&sm]|um[1+(s&sm)]);else for(i(u,lm[o&sm]),i(l,um[1+(s&sm)]),c=u+1;c<l;++c)i(c,0)},outOfBounds:(n,r,i,a)=>n<0||r<0||a>=t||i>=e}}(i,a),o.ratio=r,o.padding=n,o.width=e,o.height=t,o}function dm(e,t,n,r,i,a){let o=n/2;return e-o<0||e+o>i||t-(o=r/2)<0||t+o>a}function fm(){return!1}function hm(e,t,n,r,i,a,o,s){const u=i*a/(2*r),l=e(t-u),c=e(t+u),d=e(n-(a/=2)),f=e(n+a);return o.outOfBounds(l,d,c,f)||o.getRange(l,d,c,f)||s&&s.getRange(l,d,c,f)}function pm(e,t,n,r,i,a,o,s){const u=i*a/(2*r);let l=e(t-u),c=e(t+u),d=e(n-(a/=2)),f=e(n+a);return l=l>0?l:0,d=d>0?d:0,c=c<e.width?c:e.width-1,f=f<e.height?f:e.height-1,o.getRange(l,d,c,f)||s&&s.getRange(l,d,c,f)}function mm(e){return e?[pm,fm]:[hm,dm]}const gm=[-1,-1,1,1],ym=[-1,1,-1,1];const vm=["right","center","left"],bm=["bottom","middle","top"];function xm(e,t,n,r,i,a,o,s,u,l,c,d){return!(i.outOfBounds(e,n,t,r)||(d&&a?a.getRange(e,n,t,r)||!function(e,t,n,r,i){return i[0]<=e&&n<=i[2]&&i[3]<=t&&r<=i[5]}(o,u,s,l,c):i.getRange(e,n,t,r)))}const _m={"top-left":0,top:1,"top-right":2,left:4,middle:5,right:6,"bottom-left":8,bottom:9,"bottom-right":10},km={naive:function(e,t,n,r){const i=e.width,a=e.height;return function(e){const t=e.datum.datum.items[r].items,n=t.length,o=e.datum.fontSize,s=Il.width(e.datum,e.datum.text);let u,l,c,d,f,h,p,m=0;for(let r=0;r<n;++r)u=t[r].x,c=t[r].y,l=void 0===t[r].x2?u:t[r].x2,d=void 0===t[r].y2?c:t[r].y2,f=(u+l)/2,h=(c+d)/2,p=Math.abs(l-u+d-c),p>=m&&(m=p,e.x=f,e.y=h);return f=s/2,h=o/2,u=e.x-f,l=e.x+f,c=e.y-h,d=e.y+h,e.align="center",u<0&&l<=i?e.align="left":0<=u&&i<l&&(e.align="right"),e.baseline="middle",c<0&&d<=a?e.baseline="top":0<=c&&a<d&&(e.baseline="bottom"),!0}},"reduced-search":function(e,t,n,r,i){const a=e.width,o=e.height,[s,u]=mm(i),l=t[0],c=t[1];function d(t,n,r,i,d){const f=e.invert(t),h=e.invert(n);let p,m=r,g=o;if(!u(f,h,i,d,a,o)&&!s(e,f,h,d,i,m,l,c)&&!s(e,f,h,d,i,d,l,null)){for(;g-m>=1;)p=(m+g)/2,s(e,f,h,d,i,p,l,c)?g=p:m=p;if(m>r)return[f,h,m,!0]}}return function(t){const i=t.datum.datum.items[r].items,c=i.length,f=t.datum.fontSize,h=Il.width(t.datum,t.datum.text);let p,m,g,y,v,b,x,_,k,A,w,D,E,C,F,M,S,B=n?f:0,O=!1,R=!1,z=0;for(let r=0;r<c;++r){for(p=i[r].x,g=i[r].y,m=void 0===i[r].x2?p:i[r].x2,y=void 0===i[r].y2?g:i[r].y2,p>m&&(S=p,p=m,m=S),g>y&&(S=g,g=y,y=S),k=e(p),w=e(m),A=~~((k+w)/2),D=e(g),C=e(y),E=~~((D+C)/2),x=A;x>=k;--x)for(_=E;_>=D;--_)M=d(x,_,B,h,f),M&&([t.x,t.y,B,O]=M);for(x=A;x<=w;++x)for(_=E;_<=C;++_)M=d(x,_,B,h,f),M&&([t.x,t.y,B,O]=M);O||n||(F=Math.abs(m-p+y-g),v=(p+m)/2,b=(g+y)/2,F>=z&&!u(v,b,h,f,a,o)&&!s(e,v,b,f,h,f,l,null)&&(z=F,t.x=v,t.y=b,R=!0))}return!(!O&&!R)&&(v=h/2,b=f/2,l.setRange(e(t.x-v),e(t.y-b),e(t.x+v),e(t.y+b)),t.align="center",t.baseline="middle",!0)}},floodfill:function(e,t,n,r,i){const a=e.width,o=e.height,[s,u]=mm(i),l=t[0],c=t[1],d=e.bitmap();return function(t){const i=t.datum.datum.items[r].items,f=i.length,h=t.datum.fontSize,p=Il.width(t.datum,t.datum.text),m=[];let g,y,v,b,x,_,k,A,w,D,E,C,F=n?h:0,M=!1,S=!1,B=0;for(let r=0;r<f;++r){for(g=i[r].x,v=i[r].y,y=void 0===i[r].x2?g:i[r].x2,b=void 0===i[r].y2?v:i[r].y2,m.push([e((g+y)/2),e((v+b)/2)]);m.length;)if([k,A]=m.pop(),!(l.get(k,A)||c.get(k,A)||d.get(k,A))){d.set(k,A);for(let e=0;e<4;++e)x=k+gm[e],_=A+ym[e],d.outOfBounds(x,_,x,_)||m.push([x,_]);if(x=e.invert(k),_=e.invert(A),w=F,D=o,!u(x,_,p,h,a,o)&&!s(e,x,_,h,p,w,l,c)&&!s(e,x,_,h,p,h,l,null)){for(;D-w>=1;)E=(w+D)/2,s(e,x,_,h,p,E,l,c)?D=E:w=E;w>F&&(t.x=x,t.y=_,F=w,M=!0)}}M||n||(C=Math.abs(y-g+b-v),x=(g+y)/2,_=(v+b)/2,C>=B&&!u(x,_,p,h,a,o)&&!s(e,x,_,h,p,h,l,null)&&(B=C,t.x=x,t.y=_,S=!0))}return!(!M&&!S)&&(x=p/2,_=h/2,l.setRange(e(t.x-x),e(t.y-_),e(t.x+x),e(t.y+_)),t.align="center",t.baseline="middle",!0)}}};function Am(e,t,n,r,i,a,o,s,u,l,c){if(!e.length)return e;const d=Math.max(r.length,i.length),f=function(e,t){const n=new Float64Array(t),r=e.length;for(let t=0;t<r;++t)n[t]=e[t]||0;for(let e=r;e<t;++e)n[e]=n[r-1];return n}(r,d),h=function(e,t){const n=new Int8Array(t),r=e.length;for(let t=0;t<r;++t)n[t]|=_m[e[t]];for(let e=r;e<t;++e)n[e]=n[r-1];return n}(i,d),p=(_=e[0].datum)&&_.mark&&_.mark.marktype,m="group"===p&&e[0].datum.items[u].marktype,g="area"===m,y=function(e,t,n,r){const i=e=>[e.x,e.x,e.x,e.y,e.y,e.y];return e?"line"===e||"area"===e?e=>i(e.datum):"line"===t?e=>{const t=e.datum.items[r].items;return i(t.length?t["start"===n?0:t.length-1]:{x:NaN,y:NaN})}:e=>{const t=e.datum.bounds;return[t.x1,(t.x1+t.x2)/2,t.x2,t.y1,(t.y1+t.y2)/2,t.y2]}:i}(p,m,s,u),v=null===l||l===1/0,b=cm(t[0],t[1],v?0:l),x=g&&"naive"===c;var _;const k=e.map((e=>({datum:e,opacity:0,x:void 0,y:void 0,align:void 0,baseline:void 0,boundary:y(e)})));let A;if(!x){n&&k.sort(((e,t)=>n(e.datum,t.datum)));let t=!1;for(let e=0;e<h.length&&!t;++e)t=5===h[e]||f[e]<0;p&&(o||g)&&(a=[e.map((e=>e.datum))].concat(a)),A=a.length?im(b,a,t,g):function(e,t){const n=e.bitmap();return(t||[]).forEach((t=>n.set(e(t.boundary[0]),e(t.boundary[3])))),[n,void 0]}(b,o&&k)}const w=g?km[c](b,A,o,u,v):function(e,t,n,r,i){const a=e.width,o=e.height,s=t[0],u=t[1],l=r.length;return function(t){const c=t.boundary,d=t.datum.fontSize;if(!i&&(c[2]<0||c[5]<0||c[0]>a||c[3]>o))return!1;let f,h,p,m,g,y,v,b,x,_,k,A,w,D,E,C=0;for(let a=0;a<l;++a){if(f=(3&n[a])-1,h=(n[a]>>>2&3)-1,p=0===f&&0===h||r[a]<0,m=f&&h?Math.SQRT1_2:1,g=r[a]<0?-1:1,y=c[1+f]+r[a]*f*m,k=c[4+h]+g*d*h/2+r[a]*h*m,b=k-d/2,x=k+d/2,A=e(y),D=e(b),E=e(x),i&&(A=A<0?0:A,D=D<0?0:D,E=E>=e.height?e.height-1:E),!C){if(!xm(A,A,D,E,s,u,y,y,b,x,c,p))continue;C=Il.width(t.datum,t.datum.text)}if(_=y+g*C*f/2,y=_-C/2,v=_+C/2,A=e(y),w=e(v),i&&(A=A<0?0:A,w=w>=e.width?e.width-1:w),xm(A,w,D,E,s,u,y,v,b,x,c,p))return t.x=f?f*g<0?v:y:_,t.y=h?h*g<0?x:b:k,t.align=vm[f*g+1],t.baseline=bm[h*g+1],s.setRange(A,D,w,E),!0}return!1}}(b,A,h,f,v);return k.forEach((e=>e.opacity=+w(e))),k}const wm=["x","y","opacity","align","baseline"],Dm=["top-left","left","bottom-left","top","bottom","top-right","right","bottom-right"];function Em(e){Br.call(this,null,e)}Em.Definition={type:"Label",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"sort",type:"compare"},{name:"anchor",type:"string",array:!0,default:Dm},{name:"offset",type:"number",array:!0,default:[1]},{name:"padding",type:"number",default:0,null:!0},{name:"lineAnchor",type:"string",values:["start","end"],default:"end"},{name:"markIndex",type:"number",default:0},{name:"avoidBaseMark",type:"boolean",default:!0},{name:"avoidMarks",type:"data",array:!0},{name:"method",type:"string",default:"naive"},{name:"as",type:"string",array:!0,length:wm.length,default:wm}]},Ce(Em,Br,{transform(e,t){const n=e.modified();if(!(n||t.changed(t.ADD_REM)||function(n){const r=e[n];return de(r)&&t.modified(r.fields)}("sort")))return;e.size&&2===e.size.length||C("Size parameter should be specified as a [width, height] array.");const r=e.as||wm;return Am(t.materialize(t.SOURCE).source||[],e.size,e.sort,le(null==e.offset?1:e.offset),le(e.anchor||Dm),e.avoidMarks||[],!1!==e.avoidBaseMark,e.lineAnchor||"end",e.markIndex||0,void 0===e.padding?0:e.padding,e.method||"naive").forEach((e=>{const t=e.datum;t[r[0]]=e.x,t[r[1]]=e.y,t[r[2]]=e.opacity,t[r[3]]=e.align,t[r[4]]=e.baseline})),t.reflow(n).modifies(r)}});var Cm=Object.freeze({__proto__:null,label:Em});function Fm(e,t){var n,r,i,a,o,s,u=[],l=function(e){return e(a)};if(null==t)u.push(e);else for(n={},r=0,i=e.length;r<i;++r)a=e[r],(s=n[o=t.map(l)])||(n[o]=s=[],s.dims=o,u.push(s)),s.push(a);return u}function Mm(e){Br.call(this,null,e)}Mm.Definition={type:"Loess",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"bandwidth",type:"number",default:.3},{name:"as",type:"string",array:!0}]},Ce(Mm,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE|t.NO_FIELDS);if(!this.value||t.changed()||e.modified()){const r=Fm(t.materialize(t.SOURCE).source,e.groupby),i=(e.groupby||[]).map(k),a=i.length,o=e.as||[k(e.x),k(e.y)],s=[];r.forEach((t=>{bi(t,e.x,e.y,e.bandwidth||.3).forEach((e=>{const n={};for(let e=0;e<a;++e)n[i[e]]=t.dims[e];n[o[0]]=e[0],n[o[1]]=e[1],s.push(er(n))}))})),this.value&&(n.rem=this.value),this.value=n.add=n.source=s}return n}});const Sm={linear:fi,log:hi,exp:pi,pow:mi,quad:gi,poly:yi};function Bm(e){Br.call(this,null,e)}Bm.Definition={type:"Regression",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"string",default:"linear",values:Object.keys(Sm)},{name:"order",type:"number",default:3},{name:"extent",type:"number",array:!0,length:2},{name:"params",type:"boolean",default:!1},{name:"as",type:"string",array:!0}]},Ce(Bm,Br,{transform(e,t){const n=t.fork(t.NO_SOURCE|t.NO_FIELDS);if(!this.value||t.changed()||e.modified()){const r=Fm(t.materialize(t.SOURCE).source,e.groupby),i=(e.groupby||[]).map(k),a=e.method||"linear",o=e.order||3,s=((e,t)=>"poly"===e?t:"quad"===e?2:1)(a,o),u=e.as||[k(e.x),k(e.y)],l=Sm[a],c=[];let d=e.extent;Ae(Sm,a)||C("Invalid regression method: "+a),null!=d&&"log"===a&&d[0]<=0&&(t.dataflow.warn("Ignoring extent with values <= 0 for log regression."),d=null),r.forEach((n=>{if(n.length<=s)return void t.dataflow.warn("Skipping regression with more parameters than data points.");const r=l(n,e.x,e.y,o);if(e.params)return void c.push(er({keys:n.dims,coef:r.coef,rSquared:r.rSquared}));const f=d||xe(n,e.x),h=e=>{const t={};for(let e=0;e<i.length;++e)t[i[e]]=n.dims[e];t[u[0]]=e[0],t[u[1]]=e[1],c.push(er(t))};"linear"===a?f.forEach((e=>h([e,r.predict(e)]))):Ai(r.predict,f,25,200).forEach(h)})),this.value&&(n.rem=this.value),this.value=n.add=n.source=c}return n}});var Om=Object.freeze({__proto__:null,loess:Mm,regression:Bm});function Rm(e){Br.call(this,null,e)}Rm.Definition={type:"Voronoi",metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],content:{type:"number",array:!0,length:2}},{name:"as",type:"string",default:"path"}]};const zm=[-1e5,-1e5,1e5,1e5];function $m(e){const t=e[0][0],n=e[0][1];let r=e.length-1;for(;e[r][0]===t&&e[r][1]===n;--r);return"M"+e.slice(0,r+1).join("L")+"Z"}Ce(Rm,Br,{transform(e,t){const n=e.as||"path",r=t.source;if(!r||!r.length)return t;let i=e.size;i=i?[0,0,i[0],i[1]]:(i=e.extent)?[i[0][0],i[0][1],i[1][0],i[1][1]]:zm;const a=this.value=m.Delaunay.from(r,e.x,e.y).voronoi(i);for(let e=0,t=r.length;e<t;++e){const t=a.cellPolygon(e);r[e][n]=t?$m(t):null}return t.reflow(e.modified()).modifies(n)}});var qm=Object.freeze({__proto__:null,voronoi:Rm}),Lm=Math.PI/180,Tm=2048;function Nm(){var e,t,n,r,i,a,o,s=[256,256],u=Wm,l=[],c=Math.random,d={};function f(e,t,n){for(var r,i,a,o=t.x,l=t.y,d=Math.sqrt(s[0]*s[0]+s[1]*s[1]),f=u(s),h=c()<.5?1:-1,p=-h;(r=f(p+=h))&&(i=~~r[0],a=~~r[1],!(Math.min(Math.abs(i),Math.abs(a))>=d));)if(t.x=o+i,t.y=l+a,!(t.x+t.x0<0||t.y+t.y0<0||t.x+t.x1>s[0]||t.y+t.y1>s[1])&&(!n||!Um(t,e,s[0]))&&(!n||Im(t,n))){for(var m,g=t.sprite,y=t.width>>5,v=s[0]>>5,b=t.x-(y<<4),x=127&b,_=32-x,k=t.y1-t.y0,A=(t.y+t.y0)*v+(b>>5),w=0;w<k;w++){m=0;for(var D=0;D<=y;D++)e[A+D]|=m<<_|(D<y?(m=g[w*y+D])>>>x:0);A+=v}return t.sprite=null,!0}return!1}return d.layout=function(){for(var u=function(e){e.width=e.height=1;var t=Math.sqrt(e.getContext("2d").getImageData(0,0,1,1).data.length>>2);e.width=2048/t,e.height=Tm/t;var n=e.getContext("2d");return n.fillStyle=n.strokeStyle="red",n.textAlign="center",{context:n,ratio:t}}(Ka()),d=function(e){var t=[],n=-1;for(;++n<e;)t[n]=0;return t}((s[0]>>5)*s[1]),h=null,p=l.length,m=-1,g=[],y=l.map((s=>({text:e(s),font:t(s),style:r(s),weight:i(s),rotate:a(s),size:~~(n(s)+1e-14),padding:o(s),xoff:0,yoff:0,x1:0,y1:0,x0:0,y0:0,hasText:!1,sprite:null,datum:s}))).sort(((e,t)=>t.size-e.size));++m<p;){var v=y[m];v.x=s[0]*(c()+.5)>>1,v.y=s[1]*(c()+.5)>>1,Pm(u,v,y,m),v.hasText&&f(d,v,h)&&(g.push(v),h?jm(h,v):h=[{x:v.x+v.x0,y:v.y+v.y0},{x:v.x+v.x1,y:v.y+v.y1}],v.x-=s[0]>>1,v.y-=s[1]>>1)}return g},d.words=function(e){return arguments.length?(l=e,d):l},d.size=function(e){return arguments.length?(s=[+e[0],+e[1]],d):s},d.font=function(e){return arguments.length?(t=Hm(e),d):t},d.fontStyle=function(e){return arguments.length?(r=Hm(e),d):r},d.fontWeight=function(e){return arguments.length?(i=Hm(e),d):i},d.rotate=function(e){return arguments.length?(a=Hm(e),d):a},d.text=function(t){return arguments.length?(e=Hm(t),d):e},d.spiral=function(e){return arguments.length?(u=Gm[e]||e,d):u},d.fontSize=function(e){return arguments.length?(n=Hm(e),d):n},d.padding=function(e){return arguments.length?(o=Hm(e),d):o},d.random=function(e){return arguments.length?(c=e,d):c},d}function Pm(e,t,n,r){if(!t.sprite){var i=e.context,a=e.ratio;i.clearRect(0,0,2048/a,Tm/a);var o,s,u,l,c,d=0,f=0,h=0,p=n.length;for(--r;++r<p;){if(t=n[r],i.save(),i.font=t.style+" "+t.weight+" "+~~((t.size+1)/a)+"px "+t.font,o=i.measureText(t.text+"m").width*a,u=t.size<<1,t.rotate){var m=Math.sin(t.rotate*Lm),g=Math.cos(t.rotate*Lm),y=o*g,v=o*m,b=u*g,x=u*m;o=Math.max(Math.abs(y+x),Math.abs(y-x))+31>>5<<5,u=~~Math.max(Math.abs(v+b),Math.abs(v-b))}else o=o+31>>5<<5;if(u>h&&(h=u),d+o>=2048&&(d=0,f+=h,h=0),f+u>=Tm)break;i.translate((d+(o>>1))/a,(f+(u>>1))/a),t.rotate&&i.rotate(t.rotate*Lm),i.fillText(t.text,0,0),t.padding&&(i.lineWidth=2*t.padding,i.strokeText(t.text,0,0)),i.restore(),t.width=o,t.height=u,t.xoff=d,t.yoff=f,t.x1=o>>1,t.y1=u>>1,t.x0=-t.x1,t.y0=-t.y1,t.hasText=!0,d+=o}for(var _=i.getImageData(0,0,2048/a,Tm/a).data,k=[];--r>=0;)if((t=n[r]).hasText){for(s=(o=t.width)>>5,u=t.y1-t.y0,l=0;l<u*s;l++)k[l]=0;if(null==(d=t.xoff))return;f=t.yoff;var A=0,w=-1;for(c=0;c<u;c++){for(l=0;l<o;l++){var D=s*c+(l>>5),E=_[2048*(f+c)+(d+l)<<2]?1<<31-l%32:0;k[D]|=E,A|=E}A?w=c:(t.y0++,u--,c--,f++)}t.y1=t.y0+w,t.sprite=k.slice(0,(t.y1-t.y0)*s)}}}function Um(e,t,n){n>>=5;for(var r,i=e.sprite,a=e.width>>5,o=e.x-(a<<4),s=127&o,u=32-s,l=e.y1-e.y0,c=(e.y+e.y0)*n+(o>>5),d=0;d<l;d++){r=0;for(var f=0;f<=a;f++)if((r<<u|(f<a?(r=i[d*a+f])>>>s:0))&t[c+f])return!0;c+=n}return!1}function jm(e,t){var n=e[0],r=e[1];t.x+t.x0<n.x&&(n.x=t.x+t.x0),t.y+t.y0<n.y&&(n.y=t.y+t.y0),t.x+t.x1>r.x&&(r.x=t.x+t.x1),t.y+t.y1>r.y&&(r.y=t.y+t.y1)}function Im(e,t){return e.x+e.x1>t[0].x&&e.x+e.x0<t[1].x&&e.y+e.y1>t[0].y&&e.y+e.y0<t[1].y}function Wm(e){var t=e[0]/e[1];return function(e){return[t*(e*=.1)*Math.cos(e),e*Math.sin(e)]}}function Hm(e){return"function"==typeof e?e:function(){return e}}var Gm={archimedean:Wm,rectangular:function(e){var t=4*e[0]/e[1],n=0,r=0;return function(e){var i=e<0?-1:1;switch(Math.sqrt(1+4*i*e)-i&3){case 0:n+=t;break;case 1:r+=4;break;case 2:n-=t;break;default:r-=4}return[n,r]}}};const Vm=["x","y","font","fontSize","fontStyle","fontWeight","angle"],Ym=["text","font","rotate","fontSize","fontStyle","fontWeight"];function Xm(e){Br.call(this,Nm(),e)}Xm.Definition={type:"Wordcloud",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2},{name:"font",type:"string",expr:!0,default:"sans-serif"},{name:"fontStyle",type:"string",expr:!0,default:"normal"},{name:"fontWeight",type:"string",expr:!0,default:"normal"},{name:"fontSize",type:"number",expr:!0,default:14},{name:"fontSizeRange",type:"number",array:"nullable",default:[10,50]},{name:"rotate",type:"number",expr:!0,default:0},{name:"text",type:"field"},{name:"spiral",type:"string",values:["archimedean","rectangular"]},{name:"padding",type:"number",expr:!0},{name:"as",type:"string",array:!0,length:7,default:Vm}]},Ce(Xm,Br,{transform(t,n){!t.size||t.size[0]&&t.size[1]||C("Wordcloud size dimensions must be non-zero.");const r=t.modified();if(!(r||n.changed(n.ADD_REM)||Ym.some((function(e){const r=t[e];return de(r)&&n.modified(r.fields)}))))return;const i=n.materialize(n.SOURCE).source,a=this.value,o=t.as||Vm;let s,u=t.fontSize||14;if(de(u)?s=t.fontSizeRange:u=ye(u),s){const e=u,t=Mo("sqrt")().domain(xe(i,e)).range(s);u=n=>t(e(n))}i.forEach((e=>{e[o[0]]=NaN,e[o[1]]=NaN,e[o[3]]=0}));const l=a.words(i).text(t.text).size(t.size||[500,500]).padding(t.padding||1).spiral(t.spiral||"archimedean").rotate(t.rotate||0).font(t.font||"sans-serif").fontStyle(t.fontStyle||"normal").fontWeight(t.fontWeight||"normal").fontSize(u).random(e.random).layout(),c=a.size(),d=c[0]>>1,f=c[1]>>1,h=l.length;for(let e,t,n=0;n<h;++n)e=l[n],t=e.datum,t[o[0]]=e.x+d,t[o[1]]=e.y+f,t[o[2]]=e.font,t[o[3]]=e.size,t[o[4]]=e.style,t[o[5]]=e.weight,t[o[6]]=e.rotate;return n.reflow(r).modifies(o)}});var Jm=Object.freeze({__proto__:null,wordcloud:Xm});const Qm=e=>new Uint8Array(e),Km=e=>new Uint16Array(e),Zm=e=>new Uint32Array(e);function eg(e,t,n){const r=(t<257?Qm:t<65537?Km:Zm)(e);return n&&r.set(n),r}function tg(e,t,n){const r=1<<t;return{one:r,zero:~r,range:n.slice(),bisect:e.bisect,index:e.index,size:e.size,onAdd(e,t){const n=this,i=n.bisect(n.range,e.value),a=e.index,o=i[0],s=i[1],u=a.length;let l;for(l=0;l<o;++l)t[a[l]]|=r;for(l=s;l<u;++l)t[a[l]]|=r;return n}}}function ng(){let e=Zm(0),t=[],n=0;return{insert:function(i,a,o){if(!a.length)return[];const s=n,u=a.length,l=Zm(u);let c,d,f,h=Array(u);for(f=0;f<u;++f)h[f]=i(a[f]),l[f]=f;if(h=function(e,t){return e.sort.call(t,((t,n)=>{const r=e[t],i=e[n];return r<i?-1:r>i?1:0})),r.permute(e,t)}(h,l),s)c=t,d=e,t=Array(s+u),e=Zm(s+u),function(e,t,n,r,i,a,o,s,u){let l,c=0,d=0;for(l=0;c<r&&d<o;++l)t[c]<i[d]?(s[l]=t[c],u[l]=n[c++]):(s[l]=i[d],u[l]=a[d++]+e);for(;c<r;++c,++l)s[l]=t[c],u[l]=n[c];for(;d<o;++d,++l)s[l]=i[d],u[l]=a[d]+e}(o,c,d,s,h,l,u,t,e);else{if(o>0)for(f=0;f<u;++f)l[f]+=o;t=h,e=l}return n=s+u,{index:l,value:h}},remove:function(r,i){const a=n;let o,s,u;for(s=0;!i[e[s]]&&s<a;++s);for(u=s;s<a;++s)i[o=e[s]]||(e[u]=o,t[u]=t[s],++u);n=a-r},bisect:function(e,i){let a;return i?a=i.length:(i=t,a=n),[r.bisectLeft(i,e[0],0,a),r.bisectRight(i,e[1],0,a)]},reindex:function(t){for(let r=0,i=n;r<i;++r)e[r]=t[e[r]]},index:()=>e,size:()=>n}}function rg(e){Br.call(this,function(){let e=8,t=[],n=Zm(0),r=eg(0,e),i=eg(0,e);return{data:()=>t,seen:()=>n=function(e,t,n){return e.length>=t?e:((n=n||new e.constructor(t)).set(e),n)}(n,t.length),add(e){for(let n,r=0,i=t.length,a=e.length;r<a;++r)n=e[r],n._index=i++,t.push(n)},remove(e,n){const a=t.length,o=Array(a-e),s=t;let u,l,c;for(l=0;!n[l]&&l<a;++l)o[l]=t[l],s[l]=l;for(c=l;l<a;++l)u=t[l],n[l]?s[l]=-1:(s[l]=c,r[c]=r[l],i[c]=i[l],o[c]=u,u._index=c++),r[l]=0;return t=o,s},size:()=>t.length,curr:()=>r,prev:()=>i,reset:e=>i[e]=r[e],all:()=>e<257?255:e<65537?65535:4294967295,set(e,t){r[e]|=t},clear(e,t){r[e]&=~t},resize(t,n){(t>r.length||n>e)&&(e=Math.max(n,e),r=eg(t,e,r),i=eg(t,e))}}}(),e),this._indices=null,this._dims=null}function ig(e){Br.call(this,null,e)}rg.Definition={type:"CrossFilter",metadata:{},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"query",type:"array",array:!0,required:!0,content:{type:"number",array:!0,length:2}}]},Ce(rg,Br,{transform(e,t){return this._dims?e.modified("fields")||e.fields.some((e=>t.modified(e.fields)))?this.reinit(e,t):this.eval(e,t):this.init(e,t)},init(e,t){const n=e.fields,r=e.query,i=this._indices={},a=this._dims=[],o=r.length;let s,u,l=0;for(;l<o;++l)s=n[l].fname,u=i[s]||(i[s]=ng()),a.push(tg(u,l,r[l]));return this.eval(e,t)},reinit(e,t){const n=t.materialize().fork(),r=e.fields,i=e.query,a=this._indices,o=this._dims,s=this.value,u=s.curr(),l=s.prev(),c=s.all(),d=n.rem=n.add,f=n.mod,h=i.length,p={};let m,g,y,v,b,x,_,k,A;if(l.set(u),t.rem.length&&(b=this.remove(e,t,n)),t.add.length&&s.add(t.add),t.mod.length)for(x={},v=t.mod,_=0,k=v.length;_<k;++_)x[v[_]._index]=1;for(_=0;_<h;++_)A=r[_],(!o[_]||e.modified("fields",_)||t.modified(A.fields))&&(y=A.fname,(m=p[y])||(a[y]=g=ng(),p[y]=m=g.insert(A,t.source,0)),o[_]=tg(g,_,i[_]).onAdd(m,u));for(_=0,k=s.data().length;_<k;++_)b[_]||(l[_]!==u[_]?d.push(_):x[_]&&u[_]!==c&&f.push(_));return s.mask=(1<<h)-1,n},eval(e,t){const n=t.materialize().fork(),r=this._dims.length;let i=0;return t.rem.length&&(this.remove(e,t,n),i|=(1<<r)-1),e.modified("query")&&!e.modified("fields")&&(i|=this.update(e,t,n)),t.add.length&&(this.insert(e,t,n),i|=(1<<r)-1),t.mod.length&&(this.modify(t,n),i|=(1<<r)-1),this.value.mask=i,n},insert(e,t,n){const r=t.add,i=this.value,a=this._dims,o=this._indices,s=e.fields,u={},l=n.add,c=i.size()+r.length,d=a.length;let f,h,p,m=i.size();i.resize(c,d),i.add(r);const g=i.curr(),y=i.prev(),v=i.all();for(f=0;f<d;++f)h=s[f].fname,p=u[h]||(u[h]=o[h].insert(s[f],r,m)),a[f].onAdd(p,g);for(;m<c;++m)y[m]=v,g[m]!==v&&l.push(m)},modify(e,t){const n=t.mod,r=this.value,i=r.curr(),a=r.all(),o=e.mod;let s,u,l;for(s=0,u=o.length;s<u;++s)l=o[s]._index,i[l]!==a&&n.push(l)},remove(e,t,n){const r=this._indices,i=this.value,a=i.curr(),o=i.prev(),s=i.all(),u={},l=n.rem,c=t.rem;let d,f,h,p;for(d=0,f=c.length;d<f;++d)h=c[d]._index,u[h]=1,o[h]=p=a[h],a[h]=s,p!==s&&l.push(h);for(h in r)r[h].remove(f,u);return this.reindex(t,f,u),u},reindex(e,t,n){const r=this._indices,i=this.value;e.runAfter((()=>{const e=i.remove(t,n);for(const t in r)r[t].reindex(e)}))},update(e,t,n){const r=this._dims,i=e.query,a=t.stamp,o=r.length;let s,u,l=0;for(n.filters=0,u=0;u<o;++u)e.modified("query",u)&&(s=u,++l);if(1===l)l=r[s].one,this.incrementOne(r[s],i[s],n.add,n.rem);else for(u=0,l=0;u<o;++u)e.modified("query",u)&&(l|=r[u].one,this.incrementAll(r[u],i[u],a,n.add),n.rem=n.add);return l},incrementAll(e,t,n,r){const i=this.value,a=i.seen(),o=i.curr(),s=i.prev(),u=e.index(),l=e.bisect(e.range),c=e.bisect(t),d=c[0],f=c[1],h=l[0],p=l[1],m=e.one;let g,y,v;if(d<h)for(g=d,y=Math.min(h,f);g<y;++g)v=u[g],a[v]!==n&&(s[v]=o[v],a[v]=n,r.push(v)),o[v]^=m;else if(d>h)for(g=h,y=Math.min(d,p);g<y;++g)v=u[g],a[v]!==n&&(s[v]=o[v],a[v]=n,r.push(v)),o[v]^=m;if(f>p)for(g=Math.max(d,p),y=f;g<y;++g)v=u[g],a[v]!==n&&(s[v]=o[v],a[v]=n,r.push(v)),o[v]^=m;else if(f<p)for(g=Math.max(h,f),y=p;g<y;++g)v=u[g],a[v]!==n&&(s[v]=o[v],a[v]=n,r.push(v)),o[v]^=m;e.range=t.slice()},incrementOne(e,t,n,r){const i=this.value.curr(),a=e.index(),o=e.bisect(e.range),s=e.bisect(t),u=s[0],l=s[1],c=o[0],d=o[1],f=e.one;let h,p,m;if(u<c)for(h=u,p=Math.min(c,l);h<p;++h)m=a[h],i[m]^=f,n.push(m);else if(u>c)for(h=c,p=Math.min(u,d);h<p;++h)m=a[h],i[m]^=f,r.push(m);if(l>d)for(h=Math.max(u,d),p=l;h<p;++h)m=a[h],i[m]^=f,n.push(m);else if(l<d)for(h=Math.max(c,l),p=d;h<p;++h)m=a[h],i[m]^=f,r.push(m);e.range=t.slice()}}),ig.Definition={type:"ResolveFilter",metadata:{},params:[{name:"ignore",type:"number",required:!0,description:"A bit mask indicating which filters to ignore."},{name:"filter",type:"object",required:!0,description:"Per-tuple filter bitmaps from a CrossFilter transform."}]},Ce(ig,Br,{transform(e,t){const n=~(e.ignore||0),r=e.filter,i=r.mask;if(0==(i&n))return t.StopPropagation;const a=t.fork(t.ALL),o=r.data(),s=r.curr(),u=r.prev(),l=e=>s[e]&n?null:o[e];return a.filter(a.MOD,l),i&i-1?(a.filter(a.ADD,(e=>{const t=s[e]&n;return!t&&t^u[e]&n?o[e]:null})),a.filter(a.REM,(e=>{const t=s[e]&n;return t&&!(t^t^u[e]&n)?o[e]:null}))):(a.filter(a.ADD,l),a.filter(a.REM,(e=>(s[e]&n)===i?o[e]:null))),a.filter(a.SOURCE,(e=>l(e._index)))}});var ag=Object.freeze({__proto__:null,crossfilter:rg,resolvefilter:ig});const og="Literal",sg="Property",ug="ArrayExpression",lg="BinaryExpression",cg="CallExpression",dg="ConditionalExpression",fg="LogicalExpression",hg="MemberExpression",pg="ObjectExpression",mg="UnaryExpression";function gg(e){this.type=e}var yg,vg,bg,xg,_g;gg.prototype.visit=function(e){let t,n,r;if(e(this))return 1;for(t=function(e){switch(e.type){case ug:return e.elements;case lg:case fg:return[e.left,e.right];case cg:return[e.callee].concat(e.arguments);case dg:return[e.test,e.consequent,e.alternate];case hg:return[e.object,e.property];case pg:return e.properties;case sg:return[e.key,e.value];case mg:return[e.argument];default:return[]}}(this),n=0,r=t.length;n<r;++n)if(t[n].visit(e))return 1};(yg={})[1]="Boolean",yg[2]="<end>",yg[3]="Identifier",yg[4]="Keyword",yg[5]="Null",yg[6]="Numeric",yg[7]="Punctuator",yg[8]="String",yg[9]="RegularExpression";var kg="Identifier",Ag="Unexpected token %0",wg="Invalid regular expression",Dg="Invalid regular expression: missing /",Eg="Octal literals are not allowed in strict mode.",Cg="ILLEGAL",Fg="Disabled.",Mg=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),Sg=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");function Bg(e,t){if(!e)throw new Error("ASSERT: "+t)}function Og(e){return e>=48&&e<=57}function Rg(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function zg(e){return"01234567".indexOf(e)>=0}function $g(e){return 32===e||9===e||11===e||12===e||160===e||e>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)>=0}function qg(e){return 10===e||13===e||8232===e||8233===e}function Lg(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||92===e||e>=128&&Mg.test(String.fromCharCode(e))}function Tg(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||92===e||e>=128&&Sg.test(String.fromCharCode(e))}const Ng={if:1,in:1,do:1,var:1,for:1,new:1,try:1,let:1,this:1,else:1,case:1,void:1,with:1,enum:1,while:1,break:1,catch:1,throw:1,const:1,yield:1,class:1,super:1,return:1,typeof:1,delete:1,switch:1,export:1,import:1,public:1,static:1,default:1,finally:1,extends:1,package:1,private:1,function:1,continue:1,debugger:1,interface:1,protected:1,instanceof:1,implements:1};function Pg(){for(;bg<xg;){const e=vg.charCodeAt(bg);if(!$g(e)&&!qg(e))break;++bg}}function Ug(e){var t,n,r,i=0;for(n="u"===e?4:2,t=0;t<n;++t)bg<xg&&Rg(vg[bg])?(r=vg[bg++],i=16*i+"0123456789abcdef".indexOf(r.toLowerCase())):ry({},Ag,Cg);return String.fromCharCode(i)}function jg(){var e,t,n,r;for(t=0,"}"===(e=vg[bg])&&ry({},Ag,Cg);bg<xg&&Rg(e=vg[bg++]);)t=16*t+"0123456789abcdef".indexOf(e.toLowerCase());return(t>1114111||"}"!==e)&&ry({},Ag,Cg),t<=65535?String.fromCharCode(t):(n=55296+(t-65536>>10),r=56320+(t-65536&1023),String.fromCharCode(n,r))}function Ig(){var e,t;for(e=vg.charCodeAt(bg++),t=String.fromCharCode(e),92===e&&(117!==vg.charCodeAt(bg)&&ry({},Ag,Cg),++bg,(e=Ug("u"))&&"\\"!==e&&Lg(e.charCodeAt(0))||ry({},Ag,Cg),t=e);bg<xg&&Tg(e=vg.charCodeAt(bg));)++bg,t+=String.fromCharCode(e),92===e&&(t=t.substr(0,t.length-1),117!==vg.charCodeAt(bg)&&ry({},Ag,Cg),++bg,(e=Ug("u"))&&"\\"!==e&&Tg(e.charCodeAt(0))||ry({},Ag,Cg),t+=e);return t}function Wg(){var e,t;return e=bg,t=92===vg.charCodeAt(bg)?Ig():function(){var e,t;for(e=bg++;bg<xg;){if(92===(t=vg.charCodeAt(bg)))return bg=e,Ig();if(!Tg(t))break;++bg}return vg.slice(e,bg)}(),{type:1===t.length?3:Ng.hasOwnProperty(t)?4:"null"===t?5:"true"===t||"false"===t?1:3,value:t,start:e,end:bg}}function Hg(){var e,t,n,r,i=bg,a=vg.charCodeAt(bg),o=vg[bg];switch(a){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++bg,{type:7,value:String.fromCharCode(a),start:i,end:bg};default:if(61===(e=vg.charCodeAt(bg+1)))switch(a){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return bg+=2,{type:7,value:String.fromCharCode(a)+String.fromCharCode(e),start:i,end:bg};case 33:case 61:return bg+=2,61===vg.charCodeAt(bg)&&++bg,{type:7,value:vg.slice(i,bg),start:i,end:bg}}}return">>>="===(r=vg.substr(bg,4))?{type:7,value:r,start:i,end:bg+=4}:">>>"===(n=r.substr(0,3))||"<<="===n||">>="===n?{type:7,value:n,start:i,end:bg+=3}:o===(t=n.substr(0,2))[1]&&"+-<>&|".indexOf(o)>=0||"=>"===t?{type:7,value:t,start:i,end:bg+=2}:("//"===t&&ry({},Ag,Cg),"<>=!+-*%&|^/".indexOf(o)>=0?{type:7,value:o,start:i,end:++bg}:void ry({},Ag,Cg))}function Gg(){var e,t,n;if(Bg(Og((n=vg[bg]).charCodeAt(0))||"."===n,"Numeric literal must start with a decimal digit or a decimal point"),t=bg,e="","."!==n){if(e=vg[bg++],n=vg[bg],"0"===e){if("x"===n||"X"===n)return++bg,function(e){let t="";for(;bg<xg&&Rg(vg[bg]);)t+=vg[bg++];return 0===t.length&&ry({},Ag,Cg),Lg(vg.charCodeAt(bg))&&ry({},Ag,Cg),{type:6,value:parseInt("0x"+t,16),start:e,end:bg}}(t);if(zg(n))return function(e){let t="0"+vg[bg++];for(;bg<xg&&zg(vg[bg]);)t+=vg[bg++];return(Lg(vg.charCodeAt(bg))||Og(vg.charCodeAt(bg)))&&ry({},Ag,Cg),{type:6,value:parseInt(t,8),octal:!0,start:e,end:bg}}(t);n&&Og(n.charCodeAt(0))&&ry({},Ag,Cg)}for(;Og(vg.charCodeAt(bg));)e+=vg[bg++];n=vg[bg]}if("."===n){for(e+=vg[bg++];Og(vg.charCodeAt(bg));)e+=vg[bg++];n=vg[bg]}if("e"===n||"E"===n)if(e+=vg[bg++],"+"!==(n=vg[bg])&&"-"!==n||(e+=vg[bg++]),Og(vg.charCodeAt(bg)))for(;Og(vg.charCodeAt(bg));)e+=vg[bg++];else ry({},Ag,Cg);return Lg(vg.charCodeAt(bg))&&ry({},Ag,Cg),{type:6,value:parseFloat(e),start:t,end:bg}}function Vg(){var e,t,n,r;return _g=null,Pg(),e=bg,t=function(){var e,t,n,r;for(Bg("/"===(e=vg[bg]),"Regular expression literal must start with a slash"),t=vg[bg++],n=!1,r=!1;bg<xg;)if(t+=e=vg[bg++],"\\"===e)qg((e=vg[bg++]).charCodeAt(0))&&ry({},Dg),t+=e;else if(qg(e.charCodeAt(0)))ry({},Dg);else if(n)"]"===e&&(n=!1);else{if("/"===e){r=!0;break}"["===e&&(n=!0)}return r||ry({},Dg),{value:t.substr(1,t.length-2),literal:t}}(),n=function(){var e,t,n;for(t="",n="";bg<xg&&Tg((e=vg[bg]).charCodeAt(0));)++bg,"\\"===e&&bg<xg?ry({},Ag,Cg):(n+=e,t+=e);return n.search(/[^gimuy]/g)>=0&&ry({},wg,n),{value:n,literal:t}}(),r=function(e,t){let n=e;t.indexOf("u")>=0&&(n=n.replace(/\\u\{([0-9a-fA-F]+)\}/g,((e,t)=>{if(parseInt(t,16)<=1114111)return"x";ry({},wg)})).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"));try{new RegExp(n)}catch(e){ry({},wg)}try{return new RegExp(e,t)}catch(e){return null}}(t.value,n.value),{literal:t.literal+n.literal,value:r,regex:{pattern:t.value,flags:n.value},start:e,end:bg}}function Yg(){if(Pg(),bg>=xg)return{type:2,start:bg,end:bg};const e=vg.charCodeAt(bg);return Lg(e)?Wg():40===e||41===e||59===e?Hg():39===e||34===e?function(){var e,t,n,r,i="",a=!1;for(Bg("'"===(e=vg[bg])||'"'===e,"String literal must starts with a quote"),t=bg,++bg;bg<xg;){if((n=vg[bg++])===e){e="";break}if("\\"===n)if((n=vg[bg++])&&qg(n.charCodeAt(0)))"\r"===n&&"\n"===vg[bg]&&++bg;else switch(n){case"u":case"x":"{"===vg[bg]?(++bg,i+=jg()):i+=Ug(n);break;case"n":i+="\n";break;case"r":i+="\r";break;case"t":i+="\t";break;case"b":i+="\b";break;case"f":i+="\f";break;case"v":i+="\v";break;default:zg(n)?(0!==(r="01234567".indexOf(n))&&(a=!0),bg<xg&&zg(vg[bg])&&(a=!0,r=8*r+"01234567".indexOf(vg[bg++]),"0123".indexOf(n)>=0&&bg<xg&&zg(vg[bg])&&(r=8*r+"01234567".indexOf(vg[bg++]))),i+=String.fromCharCode(r)):i+=n}else{if(qg(n.charCodeAt(0)))break;i+=n}}return""!==e&&ry({},Ag,Cg),{type:8,value:i,octal:a,start:t,end:bg}}():46===e?Og(vg.charCodeAt(bg+1))?Gg():Hg():Og(e)?Gg():Hg()}function Xg(){const e=_g;return bg=e.end,_g=Yg(),bg=e.end,e}function Jg(){const e=bg;_g=Yg(),bg=e}function Qg(e,t,n){const r=new gg("||"===e||"&&"===e?"LogicalExpression":"BinaryExpression");return r.operator=e,r.left=t,r.right=n,r}function Kg(e,t){const n=new gg("CallExpression");return n.callee=e,n.arguments=t,n}function Zg(e){const t=new gg(kg);return t.name=e,t}function ey(e){const t=new gg("Literal");return t.value=e.value,t.raw=vg.slice(e.start,e.end),e.regex&&("//"===t.raw&&(t.raw="/(?:)/"),t.regex=e.regex),t}function ty(e,t,n){const r=new gg("MemberExpression");return r.computed="["===e,r.object=t,r.property=n,r.computed||(n.member=!0),r}function ny(e,t,n){const r=new gg("Property");return r.key=t,r.value=n,r.kind=e,r}function ry(e,t){var n,r=Array.prototype.slice.call(arguments,2),i=t.replace(/%(\d)/g,((e,t)=>(Bg(t<r.length,"Message reference must be in range"),r[t])));throw(n=new Error(i)).index=bg,n.description=i,n}function iy(e){2===e.type&&ry(e,"Unexpected end of input"),6===e.type&&ry(e,"Unexpected number"),8===e.type&&ry(e,"Unexpected string"),3===e.type&&ry(e,"Unexpected identifier"),4===e.type&&ry(e,"Unexpected reserved word"),ry(e,Ag,e.value)}function ay(e){const t=Xg();7===t.type&&t.value===e||iy(t)}function oy(e){return 7===_g.type&&_g.value===e}function sy(e){return 4===_g.type&&_g.value===e}function uy(){const e=[];for(bg=_g.start,ay("[");!oy("]");)oy(",")?(Xg(),e.push(null)):(e.push(xy()),oy("]")||ay(","));return Xg(),function(e){const t=new gg("ArrayExpression");return t.elements=e,t}(e)}function ly(){bg=_g.start;const e=Xg();return 8===e.type||6===e.type?(e.octal&&ry(e,Eg),ey(e)):Zg(e.value)}function cy(){var e,t,n;return bg=_g.start,3===(e=_g).type?(n=ly(),ay(":"),ny("init",n,xy())):2!==e.type&&7!==e.type?(t=ly(),ay(":"),ny("init",t,xy())):void iy(e)}function dy(){var e,t,n=[],r={},i=String;for(bg=_g.start,ay("{");!oy("}");)t="$"+((e=cy()).key.type===kg?e.key.name:i(e.key.value)),Object.prototype.hasOwnProperty.call(r,t)?ry({},"Duplicate data property in object literal not allowed in strict mode"):r[t]=!0,n.push(e),oy("}")||ay(",");return ay("}"),function(e){const t=new gg("ObjectExpression");return t.properties=e,t}(n)}const fy={if:1};function hy(){var e,t,n;if(oy("("))return function(){ay("(");const e=_y();return ay(")"),e}();if(oy("["))return uy();if(oy("{"))return dy();if(e=_g.type,bg=_g.start,3===e||fy[_g.value])n=Zg(Xg().value);else if(8===e||6===e)_g.octal&&ry(_g,Eg),n=ey(Xg());else{if(4===e)throw new Error(Fg);1===e?((t=Xg()).value="true"===t.value,n=ey(t)):5===e?((t=Xg()).value=null,n=ey(t)):oy("/")||oy("/=")?(n=ey(Vg()),Jg()):iy(Xg())}return n}function py(){const e=[];if(ay("("),!oy(")"))for(;bg<xg&&(e.push(xy()),!oy(")"));)ay(",");return ay(")"),e}function my(){return ay("."),function(){bg=_g.start;const e=Xg();return function(e){return 3===e.type||4===e.type||1===e.type||5===e.type}(e)||iy(e),Zg(e.value)}()}function gy(){ay("[");const e=_y();return ay("]"),e}function yy(){const e=function(){var e;for(e=hy();;)if(oy("."))e=ty(".",e,my());else if(oy("("))e=Kg(e,py());else{if(!oy("["))break;e=ty("[",e,gy())}return e}();if(7===_g.type&&(oy("++")||oy("--")))throw new Error(Fg);return e}function vy(){var e,t;if(7!==_g.type&&4!==_g.type)t=yy();else{if(oy("++")||oy("--"))throw new Error(Fg);if(oy("+")||oy("-")||oy("~")||oy("!"))e=Xg(),t=vy(),t=function(e,t){const n=new gg("UnaryExpression");return n.operator=e,n.argument=t,n.prefix=!0,n}(e.value,t);else{if(sy("delete")||sy("void")||sy("typeof"))throw new Error(Fg);t=yy()}}return t}function by(e){let t=0;if(7!==e.type&&4!==e.type)return 0;switch(e.value){case"||":t=1;break;case"&&":t=2;break;case"|":t=3;break;case"^":t=4;break;case"&":t=5;break;case"==":case"!=":case"===":case"!==":t=6;break;case"<":case">":case"<=":case">=":case"instanceof":case"in":t=7;break;case"<<":case">>":case">>>":t=8;break;case"+":case"-":t=9;break;case"*":case"/":case"%":t=11}return t}function xy(){var e,t;return e=function(){var e,t,n,r,i,a,o,s,u,l;if(e=_g,u=vy(),0===(i=by(r=_g)))return u;for(r.prec=i,Xg(),t=[e,_g],a=[u,r,o=vy()];(i=by(_g))>0;){for(;a.length>2&&i<=a[a.length-2].prec;)o=a.pop(),s=a.pop().value,u=a.pop(),t.pop(),n=Qg(s,u,o),a.push(n);(r=Xg()).prec=i,a.push(r),t.push(_g),n=vy(),a.push(n)}for(n=a[l=a.length-1],t.pop();l>1;)t.pop(),n=Qg(a[l-1].value,a[l-2],n),l-=2;return n}(),oy("?")&&(Xg(),t=xy(),ay(":"),e=function(e,t,n){const r=new gg("ConditionalExpression");return r.test=e,r.consequent=t,r.alternate=n,r}(e,t,xy())),e}function _y(){const e=xy();if(oy(","))throw new Error(Fg);return e}function ky(e){bg=0,xg=(vg=e).length,_g=null,Jg();const t=_y();if(2!==_g.type)throw new Error("Unexpect token after expression.");return t}var Ay={NaN:"NaN",E:"Math.E",LN2:"Math.LN2",LN10:"Math.LN10",LOG2E:"Math.LOG2E",LOG10E:"Math.LOG10E",PI:"Math.PI",SQRT1_2:"Math.SQRT1_2",SQRT2:"Math.SQRT2",MIN_VALUE:"Number.MIN_VALUE",MAX_VALUE:"Number.MAX_VALUE"};function wy(e){function t(t,n,r){return i=>function(t,n,r,i){let a=e(n[0]);return r&&(a=r+"("+a+")",0===r.lastIndexOf("new ",0)&&(a="("+a+")")),a+"."+t+(i<0?"":0===i?"()":"("+n.slice(1).map(e).join(",")+")")}(t,i,n,r)}const n="new Date",r="String",i="RegExp";return{isNaN:"Number.isNaN",isFinite:"Number.isFinite",abs:"Math.abs",acos:"Math.acos",asin:"Math.asin",atan:"Math.atan",atan2:"Math.atan2",ceil:"Math.ceil",cos:"Math.cos",exp:"Math.exp",floor:"Math.floor",log:"Math.log",max:"Math.max",min:"Math.min",pow:"Math.pow",random:"Math.random",round:"Math.round",sin:"Math.sin",sqrt:"Math.sqrt",tan:"Math.tan",clamp:function(t){t.length<3&&C("Missing arguments to clamp function."),t.length>3&&C("Too many arguments to clamp function.");const n=t.map(e);return"Math.max("+n[1]+", Math.min("+n[2]+","+n[0]+"))"},now:"Date.now",utc:"Date.UTC",datetime:n,date:t("getDate",n,0),day:t("getDay",n,0),year:t("getFullYear",n,0),month:t("getMonth",n,0),hours:t("getHours",n,0),minutes:t("getMinutes",n,0),seconds:t("getSeconds",n,0),milliseconds:t("getMilliseconds",n,0),time:t("getTime",n,0),timezoneoffset:t("getTimezoneOffset",n,0),utcdate:t("getUTCDate",n,0),utcday:t("getUTCDay",n,0),utcyear:t("getUTCFullYear",n,0),utcmonth:t("getUTCMonth",n,0),utchours:t("getUTCHours",n,0),utcminutes:t("getUTCMinutes",n,0),utcseconds:t("getUTCSeconds",n,0),utcmilliseconds:t("getUTCMilliseconds",n,0),length:t("length",null,-1),parseFloat:"parseFloat",parseInt:"parseInt",upper:t("toUpperCase",r,0),lower:t("toLowerCase",r,0),substring:t("substring",r),split:t("split",r),trim:t("trim",r,0),regexp:i,test:t("test",i),if:function(t){t.length<3&&C("Missing arguments to if function."),t.length>3&&C("Too many arguments to if function.");const n=t.map(e);return"("+n[0]+"?"+n[1]+":"+n[2]+")"}}}function Dy(e){const t=(e=e||{}).allowed?Ve(e.allowed):{},n=e.forbidden?Ve(e.forbidden):{},r=e.constants||Ay,i=(e.functions||wy)(d),a=e.globalvar,o=e.fieldvar,s=de(a)?a:e=>`${a}["${e}"]`;let u={},l={},c=0;function d(e){if(ze(e))return e;const t=f[e.type];return null==t&&C("Unsupported type: "+e.type),t(e)}const f={Literal:e=>e.raw,Identifier:e=>{const i=e.name;return c>0?i:Ae(n,i)?C("Illegal identifier: "+i):Ae(r,i)?r[i]:Ae(t,i)?i:(u[i]=1,s(i))},MemberExpression:e=>{const t=!e.computed,n=d(e.object);t&&(c+=1);const r=d(e.property);return n===o&&(l[function(e){const t=e&&e.length-1;return t&&('"'===e[0]&&'"'===e[t]||"'"===e[0]&&"'"===e[t])?e.slice(1,-1):e}(r)]=1),t&&(c-=1),n+(t?"."+r:"["+r+"]")},CallExpression:e=>{"Identifier"!==e.callee.type&&C("Illegal callee type: "+e.callee.type);const t=e.callee.name,n=e.arguments,r=Ae(i,t)&&i[t];return r||C("Unrecognized function: "+t),de(r)?r(n):r+"("+n.map(d).join(",")+")"},ArrayExpression:e=>"["+e.elements.map(d).join(",")+"]",BinaryExpression:e=>"("+d(e.left)+" "+e.operator+" "+d(e.right)+")",UnaryExpression:e=>"("+e.operator+d(e.argument)+")",ConditionalExpression:e=>"("+d(e.test)+"?"+d(e.consequent)+":"+d(e.alternate)+")",LogicalExpression:e=>"("+d(e.left)+e.operator+d(e.right)+")",ObjectExpression:e=>"{"+e.properties.map(d).join(",")+"}",Property:e=>{c+=1;const t=d(e.key);return c-=1,t+":"+d(e.value)}};function h(e){const t={code:d(e),globals:Object.keys(u),fields:Object.keys(l)};return u={},l={},t}return h.functions=i,h.constants=r,h}const Ey="intersect",Cy="union",Fy="index:unit";function My(e,t){for(var n,r,i=t.fields,a=t.values,o=i.length,s=0;s<o;++s)if((r=i[s]).getter=M.getter||M(r.field),Se(n=r.getter(e))&&(n=H(n)),Se(a[s])&&(a[s]=H(a[s])),Se(a[s][0])&&(a[s]=a[s].map(H)),"E"===r.type){if(T(a[s])?a[s].indexOf(n)<0:n!==a[s])return!1}else if("R"===r.type){if(!Fe(n,a[s]))return!1}else if("R-RE"===r.type){if(!Fe(n,a[s],!0,!1))return!1}else if("R-E"===r.type){if(!Fe(n,a[s],!1,!1))return!1}else if("R-LE"===r.type&&!Fe(n,a[s],!1,!0))return!1;return!0}const Sy=M("_vgsid_"),By=function(e){let t=e,n=e;function r(e,t,r,i){for(null==r&&(r=0),null==i&&(i=e.length);r<i;){const a=r+i>>>1;n(e[a],t)<0?r=a+1:i=a}return r}return 1===e.length&&(t=(t,n)=>e(t)-n,n=function(e){return(t,n)=>function(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}(e(t),n)}(e)),{left:r,center:function(e,n,i,a){null==i&&(i=0),null==a&&(a=e.length);const o=r(e,n,i,a-1);return o>i&&t(e[o-1],n)>-t(e[o],n)?o-1:o},right:function(e,t,r,i){for(null==r&&(r=0),null==i&&(i=e.length);r<i;){const a=r+i>>>1;n(e[a],t)>0?i=a:r=a+1}return r}}}(Sy),Oy=By.left,Ry=By.right;var zy={E_union:function(e,t){if(!e.length)return t;for(var n=0,r=t.length;n<r;++n)e.indexOf(t[n])<0&&e.push(t[n]);return e},E_intersect:function(e,t){return e.length?e.filter((e=>t.indexOf(e)>=0)):t},R_union:function(e,t){var n=H(t[0]),r=H(t[1]);return n>r&&(n=t[1],r=t[0]),e.length?(e[0]>n&&(e[0]=n),e[1]<r&&(e[1]=r),e):[n,r]},R_intersect:function(e,t){var n=H(t[0]),r=H(t[1]);return n>r&&(n=t[1],r=t[0]),e.length?r<e[0]||e[1]<n?[]:(e[0]<n&&(e[0]=n),e[1]>r&&(e[1]=r),e):[n,r]}};function $y(e,t,n,r){t[0].type!==og&&C("First argument to selection functions must be a string literal.");const i=t[0].value,a="unit",o="@unit",s=":"+i;(t.length>=2&&W(t).value)!==Ey||Ae(r,o)||(r["@unit"]=n.getData(i).indataRef(n,a)),Ae(r,s)||(r[s]=n.getData(i).tuplesRef())}function qy(e){const t=this.context.data[e];return t?t.values.value:[]}const Ly=e=>function(t,n){return this.context.dataflow.locale()[e](n)(t)},Ty=Ly("format"),Ny=Ly("timeFormat"),Py=Ly("utcFormat"),Uy=Ly("timeParse"),jy=Ly("utcParse"),Iy=new Date(2e3,0,1);function Wy(e,t,n){return Number.isInteger(e)&&Number.isInteger(t)?(Iy.setYear(2e3),Iy.setMonth(e),Iy.setDate(t),Ny.call(this,Iy,n)):""}function Hy(e,t,n,r){t[0].type!==og&&C("First argument to data functions must be a string literal.");const i=t[0].value,a=":"+i;if(!Ae(a,r))try{r[a]=n.getData(i).tuplesRef()}catch(e){}}function Gy(e,t,n,r){if(t[0].type===og)Vy(n,r,t[0].value);else for(e in n.scales)Vy(n,r,e)}function Vy(e,t,n){const r="%"+n;if(!Ae(t,r))try{t[r]=e.scaleRef(n)}catch(e){}}function Yy(e,t){let n;return de(e)?e:ze(e)?(n=t.scales[e])&&n.value:void 0}function Xy(e,t,n){t.__bandwidth=e=>e&&e.bandwidth?e.bandwidth():0,n._bandwidth=Gy,n._range=Gy,n._scale=Gy;const r=t=>"_["+(t.type===og?je("%"+t.value):je("%")+"+"+e(t))+"]";return{_bandwidth:e=>`this.__bandwidth(${r(e[0])})`,_range:e=>`${r(e[0])}.range()`,_scale:t=>`${r(t[0])}(${e(t[1])})`}}function Jy(e,t){return function(n,r,i){if(n){const t=Yy(n,(i||this).context);return t&&t.path[e](r)}return t(r)}}const Qy=Jy("area",d.geoArea),Ky=Jy("bounds",d.geoBounds),Zy=Jy("centroid",d.geoCentroid);function ev(e,t,n){try{e[t].apply(e,["EXPRESSION"].concat([].slice.call(n)))}catch(t){e.warn(t)}return n[n.length-1]}function tv(e){const t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}function nv(e){const t=f.rgb(e);return.2126*tv(t.r)+.7152*tv(t.g)+.0722*tv(t.b)}function rv(e,t){return e===t||e!=e&&t!=t||(T(e)?!(!T(t)||e.length!==t.length)&&function(e,t){for(let n=0,r=e.length;n<r;++n)if(!rv(e[n],t[n]))return!1;return!0}(e,t):!(!N(e)||!N(t))&&iv(e,t))}function iv(e,t){for(const n in e)if(!rv(e[n],t[n]))return!1;return!0}function av(e){return t=>iv(e,t)}const ov={};function sv(e){return T(e)||ArrayBuffer.isView(e)?e:null}function uv(e){return sv(e)||(ze(e)?e:null)}const lv=e=>e.data;function cv(e,t){const n=qy.call(t,e);return n.root&&n.root.lookup||{}}const dv=()=>"undefined"!=typeof window&&window||null;const fv={random:()=>e.random(),cumulativeNormal:Vr,cumulativeLogNormal:Zr,cumulativeUniform:ai,densityNormal:Gr,densityLogNormal:Kr,densityUniform:ii,quantileNormal:Yr,quantileLogNormal:ei,quantileUniform:oi,sampleNormal:Hr,sampleLogNormal:Qr,sampleUniform:ri,isArray:T,isBoolean:Me,isDate:Se,isDefined:e=>void 0!==e,isNumber:Oe,isObject:N,isRegExp:Re,isString:ze,isTuple:Qn,isValid:e=>null!=e&&e==e,toBoolean:Ie,toDate:He,toNumber:H,toString:Ge,indexof:function(e,...t){return uv(e).indexOf(...t)},join:function(e,...t){return sv(e).join(...t)},lastindexof:function(e,...t){return uv(e).lastIndexOf(...t)},replace:function(e,t,n){return de(n)&&C("Function argument passed to replace."),String(e).replace(t,n)},reverse:function(e){return sv(e).slice().reverse()},slice:function(e,...t){return uv(e).slice(...t)},flush:Ee,lerp:qe,merge:function(){const e=[].slice.call(arguments);return e.unshift({}),be(...e)},pad:Pe,peek:W,pluck:function(e,t){const n=ov[t]||(ov[t]=M(t));return T(e)?e.map(n):n(e)},span:Ue,inrange:Fe,truncate:Ye,rgb:f.rgb,lab:f.lab,hcl:f.hcl,hsl:f.hsl,luminance:nv,contrast:function(e,t){const n=nv(e),r=nv(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)},sequence:r.range,format:Ty,utcFormat:Py,utcParse:jy,utcOffset:Pt,utcSequence:It,timeFormat:Ny,timeParse:Uy,timeOffset:Nt,timeSequence:jt,timeUnitSpecifier:dt,monthFormat:function(e){return Wy.call(this,e,1,"%B")},monthAbbrevFormat:function(e){return Wy.call(this,e,1,"%b")},dayFormat:function(e){return Wy.call(this,0,2+e,"%A")},dayAbbrevFormat:function(e){return Wy.call(this,0,2+e,"%a")},quarter:se,utcquarter:ue,week:mt,utcweek:_t,dayofyear:pt,utcdayofyear:xt,warn:function(){return ev(this.context.dataflow,"warn",arguments)},info:function(){return ev(this.context.dataflow,"info",arguments)},debug:function(){return ev(this.context.dataflow,"debug",arguments)},extent:xe,inScope:function(e){const t=this.context.group;let n=!1;if(t)for(;e;){if(e===t){n=!0;break}e=e.mark.group}return n},intersect:function(e,t,n){if(!e)return[];const[r,i]=e,a=(new fu).set(r[0],r[1],i[0],i[1]);return Pd(n||this.context.dataflow.scenegraph().root,a,function(e){let t=null;if(e){const n=le(e.marktype),r=le(e.markname);t=e=>(!n.length||n.some((t=>e.marktype===t)))&&(!r.length||r.some((t=>e.name===t)))}return t}(t))},clampRange:ce,pinchDistance:function(e){const t=e.touches,n=t[0].clientX-t[1].clientX,r=t[0].clientY-t[1].clientY;return Math.sqrt(n*n+r*r)},pinchAngle:function(e){const t=e.touches;return Math.atan2(t[0].clientY-t[1].clientY,t[0].clientX-t[1].clientX)},screen:function(){const e=dv();return e?e.screen:{}},containerSize:function(){const e=this.context.dataflow,t=e.container&&e.container();return t?[t.clientWidth,t.clientHeight]:[void 0,void 0]},windowSize:function(){const e=dv();return e?[e.innerWidth,e.innerHeight]:[void 0,void 0]},bandspace:function(e,t,n){return eo(e||0,t||0,n||0)},setdata:function(e,t){const n=this.context.dataflow,r=this.context.data[e].input;return n.pulse(r,n.changeset().remove(z).insert(t)),1},pathShape:function(e){let t=null;return function(n){return n?$s(n,t=t||ws(e)):e}},panLinear:K,panLog:Z,panPow:ee,panSymlog:te,zoomLinear:re,zoomLog:ie,zoomPow:ae,zoomSymlog:oe,encode:function(e,t,n){if(e){const n=this.context.dataflow,r=e.mark.source;n.pulse(r,n.changeset().encode(e,t))}return void 0!==n?n:e},modify:function(e,t,n,r,i,a){const o=this.context.dataflow,s=this.context.data[e],u=s.input,l=o.stamp();let c,d,f=s.changes;if(!1===o._trigger||!(u.value.length||t||r))return 0;if((!f||f.stamp<l)&&(s.changes=f=o.changeset(),f.stamp=l,o.runAfter((()=>{s.modified=!0,o.pulse(u,f).run()}),!0,1)),n&&(c=!0===n?z:T(n)||Qn(n)?n:av(n),f.remove(c)),t&&f.insert(t),r&&(c=av(r),u.value.some(c)?f.remove(c):f.insert(r)),i)for(d in a)f.modify(i,d,a[d]);return 1}},hv=["view","item","group","xy","x","y"],pv="this.",mv={},gv={forbidden:["_"],allowed:["datum","event","item"],fieldvar:"datum",globalvar:e=>`_[${je("$"+e)}]`,functions:function(e){const t=wy(e);hv.forEach((e=>t[e]="event.vega."+e));for(const e in fv)t[e]=pv+e;return be(t,Xy(e,fv,mv)),t},constants:Ay,visitors:mv},yv=Dy(gv);function vv(e,t,n){return 1===arguments.length?fv[e]:(fv[e]=t,n&&(mv[e]=n),yv&&(yv.functions[e]=pv+e),this)}function bv(e,t){const n={};let r;try{r=ky(e=ze(e)?e:je(e)+"")}catch(t){C("Expression parse error: "+e)}r.visit((e=>{if(e.type!==cg)return;const r=e.callee.name,i=gv.visitors[r];i&&i(r,e.arguments,t,n)}));const i=yv(r);return i.globals.forEach((e=>{const r="$"+e;!Ae(n,r)&&t.getSignal(e)&&(n[r]=t.signalRef(e))})),{$expr:be({code:i.code},t.options.ast?{ast:r}:null),$fields:i.fields,$params:n}}vv("bandwidth",(function(e,t){const n=Yy(e,(t||this).context);return n&&n.bandwidth?n.bandwidth():0}),Gy),vv("copy",(function(e,t){const n=Yy(e,(t||this).context);return n?n.copy():void 0}),Gy),vv("domain",(function(e,t){const n=Yy(e,(t||this).context);return n?n.domain():[]}),Gy),vv("range",(function(e,t){const n=Yy(e,(t||this).context);return n&&n.range?n.range():[]}),Gy),vv("invert",(function(e,t,n){const r=Yy(e,(n||this).context);return r?T(t)?(r.invertRange||r.invert)(t):(r.invert||r.invertExtent)(t):void 0}),Gy),vv("scale",(function(e,t,n){const r=Yy(e,(n||this).context);return r?r(t):void 0}),Gy),vv("gradient",(function(e,t,n,r,i){e=Yy(e,(i||this).context);const a=bs(t,n);let o=e.domain(),s=o[0],u=W(o),l=B;return u-s?l=jo(e,s,u):e=(e.interpolator?Mo("sequential")().interpolator(e.interpolator()):Mo("linear")().interpolate(e.interpolate()).range(e.range())).domain([s=0,u=1]),e.ticks&&(o=e.ticks(+r||15),s!==o[0]&&o.unshift(s),u!==W(o)&&o.push(u)),o.forEach((t=>a.stop(l(t),e(t)))),a}),Gy),vv("geoArea",Qy,Gy),vv("geoBounds",Ky,Gy),vv("geoCentroid",Zy,Gy),vv("geoShape",(function(e,t,n){const r=Yy(e,(n||this).context);return function(e){return r?r.path.context(e)(t):""}}),Gy),vv("indata",(function(e,t,n){const r=this.context.data[e]["index:"+t],i=r?r.value.get(n):void 0;return i?i.count:i}),(function(e,t,n,r){t[0].type!==og&&C("First argument to indata must be a string literal."),t[1].type!==og&&C("Second argument to indata must be a string literal.");const i=t[0].value,a=t[1].value,o="@"+a;Ae(o,r)||(r[o]=n.getData(i).indataRef(n,a))})),vv("data",qy,Hy),vv("treePath",(function(e,t,n){const r=cv(e,this),i=r[t],a=r[n];return i&&a?i.path(a).map(lv):void 0}),Hy),vv("treeAncestors",(function(e,t){const n=cv(e,this)[t];return n?n.ancestors().map(lv):void 0}),Hy),vv("vlSelectionTest",(function(e,t,n){for(var r,i,a,o,s,u=this.context.data[e],l=u?u.values.value:[],c=u?u[Fy]&&u[Fy].value:void 0,d=n===Ey,f=l.length,h=0;h<f;++h)if(r=l[h],c&&d){if(-1===(a=(i=i||{})[o=r.unit]||0))continue;if(s=My(t,r),i[o]=s?-1:++a,s&&1===c.size)return!0;if(!s&&a===c.get(o).count)return!1}else if(d^(s=My(t,r)))return s;return f&&d}),$y),vv("vlSelectionIdTest",(function(e,t,n){const r=this.context.data[e],i=r?r.values.value:[],a=r?r[Fy]&&r[Fy].value:void 0,o=n===Ey,s=Sy(t),u=Oy(i,s);if(u===i.length)return!1;if(Sy(i[u])!==s)return!1;if(a&&o){if(1===a.size)return!0;if(Ry(i,s)-u<a.size)return!1}return!0}),$y),vv("vlSelectionResolve",(function(e,t,n,r){for(var i,a,o,s,u,l,c,d,f,h,p,m=this.context.data[e],g=m?m.values.value:[],y={},v={},b={},x=g.length,_=0;_<x;++_){for(s=(i=g[_]).unit,a=i.fields,o=i.values,h=0,p=a.length;h<p;++h)u=a[h],c=(l=y[u.field]||(y[u.field]={}))[s]||(l[s]=[]),b[u.field]=d=u.type.charAt(0),f=zy[d+"_union"],l[s]=f(c,le(o[h]));n&&(c=v[s]||(v[s]=[])).push(le(o).reduce(((e,t,n)=>(e[a[n].field]=t,e)),{}))}if(t=t||Cy,Object.keys(y).forEach((e=>{y[e]=Object.keys(y[e]).map((t=>y[e][t])).reduce(((n,r)=>void 0===n?r:zy[b[e]+"_"+t](n,r)))})),g=Object.keys(v),n&&g.length){y[r?"vlPoint":"vlMulti"]=t===Cy?{or:g.reduce(((e,t)=>(e.push(...v[t]),e)),[])}:{and:g.map((e=>({or:v[e]})))}}return y}),$y),vv("vlSelectionTuples",(function(e,t){return e.map((e=>be({values:t.fields.map((t=>(t.getter||(t.getter=M(t.field)))(e.datum)))},t)))}));const xv=Ve(["rule"]),_v=Ve(["group","image","rect"]);function kv(e){return(e+"").toLowerCase()}function Av(e,t,n){n.endsWith(";")||(n="return("+n+");");const r=Function(...t.concat(n));return e&&e.functions?r.bind(e.functions):r}var wv={operator:(e,t)=>Av(e,["_"],t.code),parameter:(e,t)=>Av(e,["datum","_"],t.code),event:(e,t)=>Av(e,["event"],t.code),handler:(e,t)=>Av(e,["_","event"],`var datum=event.item&&event.item.datum;return ${t.code};`),encode:(e,t)=>{const{marktype:n,channels:r}=t;let i="var o=item,datum=o.datum,m=0,$;";for(const e in r){const t="o["+je(e)+"]";i+=`$=${r[e].code};if(${t}!==$)${t}=$,m=1;`}return i+=function(e,t){let n="";return xv[t]||(e.x2&&(e.x?(_v[t]&&(n+="if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"),n+="o.width=o.x2-o.x;"):n+="o.x=o.x2-(o.width||0);"),e.xc&&(n+="o.x=o.xc-(o.width||0)/2;"),e.y2&&(e.y?(_v[t]&&(n+="if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"),n+="o.height=o.y2-o.y;"):n+="o.y=o.y2-(o.height||0);"),e.yc&&(n+="o.y=o.yc-(o.height||0)/2;")),n}(r,n),i+="return m;",Av(e,["item","_"],i)},codegen:{get(e){const t=`[${e.map(je).join("][")}]`,n=Function("_",`return _${t};`);return n.path=t,n},comparator(e,t){let n;const r=Function("a","b","var u, v; return "+e.map(((e,r)=>{const i=t[r];let a,o;return e.path?(a=`a${e.path}`,o=`b${e.path}`):((n=n||{})["f"+r]=e,a=`this.f${r}(a)`,o=`this.f${r}(b)`),function(e,t,n,r){return`((u = ${e}) < (v = ${t}) || u == null) && v != null ? ${n}\n  : (u > v || v == null) && u != null ? ${r}\n  : ((v = v instanceof Date ? +v : v), (u = u instanceof Date ? +u : u)) !== u && v === v ? ${n}\n  : v !== v && u === u ? ${r} : `}(a,o,-i,i)})).join("")+"0;");return n?r.bind(n):r}}};function Dv(e,t,n){if(!e||!N(e))return e;for(let r,i=0,a=Ev.length;i<a;++i)if(r=Ev[i],Ae(e,r.key))return r.parse(e,t,n);return e}var Ev=[{key:"$ref",parse:function(e,t){return t.get(e.$ref)||C("Operator not defined: "+e.$ref)}},{key:"$key",parse:function(e,t){const n="k:"+e.$key+"_"+!!e.$flat;return t.fn[n]||(t.fn[n]=$e(e.$key,e.$flat,t.expr.codegen))}},{key:"$expr",parse:function(e,t,n){e.$params&&t.parseParameters(e.$params,n);const r="e:"+e.$expr.code;return t.fn[r]||(t.fn[r]=_(t.parameterExpression(e.$expr),e.$fields))}},{key:"$field",parse:function(e,t){if(!e.$field)return null;const n="f:"+e.$field+"_"+e.$name;return t.fn[n]||(t.fn[n]=M(e.$field,e.$name,t.expr.codegen))}},{key:"$encode",parse:function(e,t){const n=e.$encode,r={};for(const e in n){const i=n[e];r[e]=_(t.encodeExpression(i.$expr),i.$fields),r[e].output=i.$output}return r}},{key:"$compare",parse:function(e,t){const n="c:"+e.$compare+"_"+e.$order,r=le(e.$compare).map((e=>e&&e.$tupleid?Kn:e));return t.fn[n]||(t.fn[n]=fe(r,e.$order,t.expr.codegen))}},{key:"$context",parse:function(e,t){return t}},{key:"$subflow",parse:function(e,t){const n=e.$subflow;return function(e,r,i){const a=t.fork().parse(n),o=a.get(n.operators[0].id),s=a.signals.parent;return s&&s.set(i),o.detachSubflow=()=>t.detach(a),o}}},{key:"$tupleid",parse:function(){return Kn}}];const Cv={skip:!0};function Fv(e,t,n,r){return new Mv(e,t,n,r)}function Mv(e,t,n,r){this.dataflow=e,this.transforms=t,this.events=e.events.bind(e),this.expr=r||wv,this.signals={},this.scales={},this.nodes={},this.data={},this.fn={},n&&(this.functions=Object.create(n),this.functions.context=this)}function Sv(e){this.dataflow=e.dataflow,this.transforms=e.transforms,this.events=e.events,this.expr=e.expr,this.signals=Object.create(e.signals),this.scales=Object.create(e.scales),this.nodes=Object.create(e.nodes),this.data=Object.create(e.data),this.fn=Object.create(e.fn),e.functions&&(this.functions=Object.create(e.functions),this.functions.context=this)}function Bv(e,t){e&&(null==t?e.removeAttribute("aria-label"):e.setAttribute("aria-label",t))}Mv.prototype=Sv.prototype={fork(){const e=new Sv(this);return(this.subcontext||(this.subcontext=[])).push(e),e},detach(e){this.subcontext=this.subcontext.filter((t=>t!==e));const t=Object.keys(e.nodes);for(const n of t)e.nodes[n]._targets=null;for(const n of t)e.nodes[n].detach();e.nodes=null},get(e){return this.nodes[e]},set(e,t){return this.nodes[e]=t},add(e,t){const n=this,r=n.dataflow,i=e.value;if(n.set(e.id,t),function(e){return"collect"===kv(e)}(e.type)&&i&&(i.$ingest?r.ingest(t,i.$ingest,i.$format):i.$request?r.preload(t,i.$request,i.$format):r.pulse(t,r.changeset().insert(i))),e.root&&(n.root=t),e.parent){let i=n.get(e.parent.$ref);i?(r.connect(i,[t]),t.targets().add(i)):(n.unresolved=n.unresolved||[]).push((()=>{i=n.get(e.parent.$ref),r.connect(i,[t]),t.targets().add(i)}))}if(e.signal&&(n.signals[e.signal]=t),e.scale&&(n.scales[e.scale]=t),e.data)for(const r in e.data){const i=n.data[r]||(n.data[r]={});e.data[r].forEach((e=>i[e]=t))}},resolve(){return(this.unresolved||[]).forEach((e=>e())),delete this.unresolved,this},operator(e,t){this.add(e,this.dataflow.add(e.value,t))},transform(e,t){this.add(e,this.dataflow.add(this.transforms[kv(t)]))},stream(e,t){this.set(e.id,t)},update(e,t,n,r,i){this.dataflow.on(t,n,r,i,e.options)},operatorExpression(e){return this.expr.operator(this,e)},parameterExpression(e){return this.expr.parameter(this,e)},eventExpression(e){return this.expr.event(this,e)},handlerExpression(e){return this.expr.handler(this,e)},encodeExpression(e){return this.expr.encode(this,e)},parse:function(e){const t=this,n=e.operators||[];return e.background&&(t.background=e.background),e.eventConfig&&(t.eventConfig=e.eventConfig),e.locale&&(t.locale=e.locale),n.forEach((e=>t.parseOperator(e))),n.forEach((e=>t.parseOperatorParameters(e))),(e.streams||[]).forEach((e=>t.parseStream(e))),(e.updates||[]).forEach((e=>t.parseUpdate(e))),t.resolve()},parseOperator:function(e){const t=this;!function(e){return"operator"===kv(e)}(e.type)&&e.type?t.transform(e,e.type):t.operator(e,e.update?t.operatorExpression(e.update):null)},parseOperatorParameters:function(e){const t=this;if(e.params){const n=t.get(e.id);n||C("Invalid operator id: "+e.id),t.dataflow.connect(n,n.parameters(t.parseParameters(e.params),e.react,e.initonly))}},parseParameters:function(e,t){t=t||{};const n=this;for(const r in e){const i=e[r];t[r]=T(i)?i.map((e=>Dv(e,n,t))):Dv(i,n,t)}return t},parseStream:function(e){var t,n=this,r=null!=e.filter?n.eventExpression(e.filter):void 0,i=null!=e.stream?n.get(e.stream):void 0;e.source?i=n.events(e.source,e.type,r):e.merge&&(i=(t=e.merge.map((e=>n.get(e))))[0].merge.apply(t[0],t.slice(1))),e.between&&(t=e.between.map((e=>n.get(e))),i=i.between(t[0],t[1])),e.filter&&(i=i.filter(r)),null!=e.throttle&&(i=i.throttle(+e.throttle)),null!=e.debounce&&(i=i.debounce(+e.debounce)),null==i&&C("Invalid stream definition: "+JSON.stringify(e)),e.consume&&i.consume(!0),n.stream(e,i)},parseUpdate:function(e){var t,n=this,r=N(r=e.source)?r.$ref:r,i=n.get(r),a=e.update,o=void 0;i||C("Source not defined: "+e.source),t=e.target&&e.target.$expr?n.eventExpression(e.target.$expr):n.get(e.target),a&&a.$expr&&(a.$params&&(o=n.parseParameters(a.$params)),a=n.handlerExpression(a.$expr)),n.update(e,i,t,a,o)},getState:function(e){var t=this,n={};if(e.signals){var r=n.signals={};Object.keys(t.signals).forEach((n=>{const i=t.signals[n];e.signals(n,i)&&(r[n]=i.value)}))}if(e.data){var i=n.data={};Object.keys(t.data).forEach((n=>{const r=t.data[n];e.data(n,r)&&(i[n]=r.input.value)}))}return t.subcontext&&!1!==e.recurse&&(n.subcontext=t.subcontext.map((t=>t.getState(e)))),n},setState:function(e){var t=this,n=t.dataflow,r=e.data,i=e.signals;Object.keys(i||{}).forEach((e=>{n.update(t.signals[e],i[e],Cv)})),Object.keys(r||{}).forEach((e=>{n.pulse(t.data[e].input,n.changeset().remove(z).insert(r[e]))})),(e.subcontext||[]).forEach(((e,n)=>{const r=t.subcontext[n];r&&r.setState(e)}))}};const Ov="default";function Rv(e,t){const n=e.globalCursor()?"undefined"!=typeof document&&document.body:e.container();if(n)return null==t?n.style.removeProperty("cursor"):n.style.cursor=t}function zv(e,t){var n=e._runtime.data;return Ae(n,t)||C("Unrecognized data set: "+t),n[t]}function $v(e,t){ar(t)||C("Second argument to changes must be a changeset.");const n=zv(this,e);return n.modified=!0,this.pulse(n.input,t)}function qv(e){var t=e.padding();return Math.max(0,e._viewWidth+t.left+t.right)}function Lv(e){var t=e.padding();return Math.max(0,e._viewHeight+t.top+t.bottom)}function Tv(e){var t=e.padding(),n=e._origin;return[t.left+n[0],t.top+n[1]]}function Nv(e,t,n){var r,i,a=e._renderer,o=a&&a.canvas();return o&&(i=Tv(e),(r=wc(t.changedTouches?t.changedTouches[0]:t,o))[0]-=i[0],r[1]-=i[1]),t.dataflow=e,t.item=n,t.vega=function(e,t,n){const r=t?"group"===t.mark.marktype?t:t.mark.group:null;function i(e){var n,i=r;if(e)for(n=t;n;n=n.mark.group)if(n.mark.name===e){i=n;break}return i&&i.mark&&i.mark.interactive?i:{}}function a(e){if(!e)return n;ze(e)&&(e=i(e));const t=n.slice();for(;e;)t[0]-=e.x||0,t[1]-=e.y||0,e=e.mark&&e.mark.group;return t}return{view:ye(e),item:ye(t||{}),group:i,xy:a,x:e=>a(e)[0],y:e=>a(e)[1]}}(e,n,r),t}const Pv="view",Uv={trap:!1};function jv(e,t,n,r){e._eventListeners.push({type:n,sources:le(t),handler:r})}function Iv(e,t,n){const r=e._eventConfig&&e._eventConfig[t];return!(!1===r||N(r)&&!r[n])||(e.warn(`Blocked ${t} ${n} event listener.`),!1)}function Wv(e){return e.item}function Hv(e){return e.item.mark.source}function Gv(e){return function(t,n){return n.vega.view().changeset().encode(n.item,e)}}function Vv(e,t,n){const r=document.createElement(e);for(const e in t)r.setAttribute(e,t[e]);return null!=n&&(r.textContent=n),r}function Yv(e,t,n,r){const i=n.event||"input",a=()=>e.update(t.value);r.signal(n.signal,t.value),t.addEventListener(i,a),jv(r,t,i,a),e.set=e=>{t.value=e,t.dispatchEvent(function(e){return"undefined"!=typeof Event?new Event(e):{type:e}}(i))}}function Xv(e,t,n,r){const i=r.signal(n.signal),a=Vv("div",{class:"vega-bind"}),o="radio"===n.input?a:a.appendChild(Vv("label"));o.appendChild(Vv("span",{class:"vega-bind-name"},n.name||n.signal)),t.appendChild(a);let s=Jv;switch(n.input){case"checkbox":s=Qv;break;case"select":s=Kv;break;case"radio":s=Zv;break;case"range":s=eb}s(e,o,n,i)}function Jv(e,t,n,r){const i=Vv("input");for(const e in n)"signal"!==e&&"element"!==e&&i.setAttribute("input"===e?"type":e,n[e]);i.setAttribute("name",n.signal),i.value=r,t.appendChild(i),i.addEventListener("input",(()=>e.update(i.value))),e.elements=[i],e.set=e=>i.value=e}function Qv(e,t,n,r){const i={type:"checkbox",name:n.signal};r&&(i.checked=!0);const a=Vv("input",i);t.appendChild(a),a.addEventListener("change",(()=>e.update(a.checked))),e.elements=[a],e.set=e=>a.checked=!!e||null}function Kv(e,t,n,r){const i=Vv("select",{name:n.signal}),a=n.labels||[];n.options.forEach(((e,t)=>{const n={value:e};tb(e,r)&&(n.selected=!0),i.appendChild(Vv("option",n,(a[t]||e)+""))})),t.appendChild(i),i.addEventListener("change",(()=>{e.update(n.options[i.selectedIndex])})),e.elements=[i],e.set=e=>{for(let t=0,r=n.options.length;t<r;++t)if(tb(n.options[t],e))return void(i.selectedIndex=t)}}function Zv(e,t,n,r){const i=Vv("span",{class:"vega-bind-radio"}),a=n.labels||[];t.appendChild(i),e.elements=n.options.map(((t,o)=>{const s={type:"radio",name:n.signal,value:t};tb(t,r)&&(s.checked=!0);const u=Vv("input",s);u.addEventListener("change",(()=>e.update(t)));const l=Vv("label",{},(a[o]||t)+"");return l.prepend(u),i.appendChild(l),u})),e.set=t=>{const n=e.elements,r=n.length;for(let e=0;e<r;++e)tb(n[e].value,t)&&(n[e].checked=!0)}}function eb(e,t,n,i){i=void 0!==i?i:(+n.max+ +n.min)/2;const a=null!=n.max?n.max:Math.max(100,+i)||100,o=n.min||Math.min(0,a,+i)||0,s=n.step||r.tickStep(o,a,100),u=Vv("input",{type:"range",name:n.signal,min:o,max:a,step:s});u.value=i;const l=Vv("span",{},+i);t.appendChild(u),t.appendChild(l);const c=()=>{l.textContent=u.value,e.update(+u.value)};u.addEventListener("input",c),u.addEventListener("change",c),e.elements=[u],e.set=e=>{u.value=e,l.textContent=e}}function tb(e,t){return e===t||e+""==t+""}function nb(e,t,n,r,i,a){return(t=t||new r(e.loader())).initialize(n,qv(e),Lv(e),Tv(e),i,a).background(e.background())}function rb(e,t){return t?function(){try{t.apply(this,arguments)}catch(t){e.error(t)}}:null}function ib(e,t,n){if("string"==typeof t){if("undefined"==typeof document)return e.error("DOM document instance not found."),null;if(!(t=document.querySelector(t)))return e.error("Signal bind element not found: "+t),null}if(t&&n)try{t.innerHTML=""}catch(n){t=null,e.error(n)}return t}const ab=e=>+e||0;function ob(e){return N(e)?{top:ab(e.top),bottom:ab(e.bottom),left:ab(e.left),right:ab(e.right)}:(e=>({top:e,bottom:e,left:e,right:e}))(ab(e))}async function sb(e,t,n,r){const i=Nd(t),a=i&&i.headless;return a||C("Unrecognized renderer type: "+t),await e.runAsync(),nb(e,null,null,a,n,r).renderAsync(e._scenegraph.root)}var ub="width",lb="height",cb="padding",db={skip:!0};function fb(e,t){var n=e.autosize(),r=e.padding();return t-(n&&n.contains===cb?r.left+r.right:0)}function hb(e,t){var n=e.autosize(),r=e.padding();return t-(n&&n.contains===cb?r.top+r.bottom:0)}function pb(e,t){return t.modified&&T(t.input.value)&&e.indexOf("_:vega:_")}function mb(e,t){return!("parent"===e||t instanceof Or.proxy)}function gb(e,t,n,r){const i=e.element();i&&i.setAttribute("title",function(e){return null==e?"":T(e)?yb(e):N(e)&&!Se(e)?(t=e,Object.keys(t).map((e=>{const n=t[e];return e+": "+(T(n)?yb(n):vb(n))})).join("\n")):e+"";var t}(r))}function yb(e){return"["+e.map(vb).join(", ")+"]"}function vb(e){return T(e)?"[…]":N(e)&&!Se(e)?"{…}":e}function bb(e,t){const n=this;if(t=t||{},Mr.call(n),t.loader&&n.loader(t.loader),t.logger&&n.logger(t.logger),null!=t.logLevel&&n.logLevel(t.logLevel),t.locale||e.locale){const r=be({},e.locale,t.locale);n.locale(bn(r.number,r.time))}n._el=null,n._elBind=null,n._renderType=t.renderer||Ld.Canvas,n._scenegraph=new yc;const r=n._scenegraph.root;n._renderer=null,n._tooltip=t.tooltip||gb,n._redraw=!0,n._handler=(new Ic).scene(r),n._globalCursor=!1,n._preventDefault=!1,n._timers=[],n._eventListeners=[],n._resizeListeners=[],n._eventConfig=function(e){const t=be({defaults:{}},e),n=(e,t)=>{t.forEach((t=>{T(e[t])&&(e[t]=Ve(e[t]))}))};return n(t.defaults,["prevent","allow"]),n(t,["view","window","selector"]),t}(e.eventConfig),n.globalCursor(n._eventConfig.globalCursor);const i=function(e,t,n){return Fv(e,Or,fv,n).parse(t)}(n,e,t.expr);n._runtime=i,n._signals=i.signals,n._bind=(e.bindings||[]).map((e=>({state:null,param:be({},e)}))),i.root&&i.root.set(r),r.source=i.data.root.input,n.pulse(i.data.root.input,n.changeset().insert(r.items)),n._width=n.width(),n._height=n.height(),n._viewWidth=fb(n,n._width),n._viewHeight=hb(n,n._height),n._origin=[0,0],n._resize=0,n._autosize=1,function(e){var t=e._signals,n=t.width,r=t.height,i=t.padding;function a(){e._autosize=e._resize=1}e._resizeWidth=e.add(null,(t=>{e._width=t.size,e._viewWidth=fb(e,t.size),a()}),{size:n}),e._resizeHeight=e.add(null,(t=>{e._height=t.size,e._viewHeight=hb(e,t.size),a()}),{size:r});const o=e.add(null,a,{pad:i});e._resizeWidth.rank=n.rank+1,e._resizeHeight.rank=r.rank+1,o.rank=i.rank+1}(n),function(e){e.add(null,(t=>(e._background=t.bg,e._resize=1,t.bg)),{bg:e._signals.background})}(n),function(e){const t=e._signals.cursor||(e._signals.cursor=e.add({user:Ov,item:null}));e.on(e.events("view","mousemove"),t,((e,n)=>{const r=t.value,i=r?ze(r)?r:r.user:Ov,a=n.item&&n.item.cursor||null;return r&&i===r.user&&a==r.item?r:{user:i,item:a}})),e.add(null,(function(t){let n=t.cursor,r=this.value;return ze(n)||(r=n.item,n=n.user),Rv(e,n&&n!==Ov?n:r||n),r}),{cursor:t})}(n),n.description(e.description),t.hover&&n.hover(),t.container&&n.initialize(t.container,t.bind)}function xb(e,t){return Ae(e._signals,t)?e._signals[t]:C("Unrecognized signal name: "+je(t))}function _b(e,t){const n=(e._targets||[]).filter((e=>e._update&&e._update.handler===t));return n.length?n[0]:null}function kb(e,t,n,r){let i=_b(n,r);return i||(i=rb(e,(()=>r(t,n.value))),i.handler=r,e.on(n,null,i)),e}function Ab(e,t,n){const r=_b(t,n);return r&&t._targets.remove(r),e}Ce(bb,Mr,{async evaluate(e,t,n){if(await Mr.prototype.evaluate.call(this,e,t),this._redraw||this._resize)try{this._renderer&&(this._resize&&(this._resize=0,function(e){var t=Tv(e),n=qv(e),r=Lv(e);e._renderer.background(e.background()),e._renderer.resize(n,r,t),e._handler.origin(t),e._resizeListeners.forEach((t=>{try{t(n,r)}catch(t){e.error(t)}}))}(this)),await this._renderer.renderAsync(this._scenegraph.root)),this._redraw=!1}catch(e){this.error(e)}return n&&Yn(this,n),this},dirty(e){this._redraw=!0,this._renderer&&this._renderer.dirty(e)},description(e){if(arguments.length){const t=null!=e?e+"":null;return t!==this._desc&&Bv(this._el,this._desc=t),this}return this._desc},container(){return this._el},scenegraph(){return this._scenegraph},origin(){return this._origin.slice()},signal(e,t,n){const r=xb(this,e);return 1===arguments.length?r.value:this.update(r,t,n)},width(e){return arguments.length?this.signal("width",e):this.signal("width")},height(e){return arguments.length?this.signal("height",e):this.signal("height")},padding(e){return arguments.length?this.signal("padding",ob(e)):ob(this.signal("padding"))},autosize(e){return arguments.length?this.signal("autosize",e):this.signal("autosize")},background(e){return arguments.length?this.signal("background",e):this.signal("background")},renderer(e){return arguments.length?(Nd(e)||C("Unrecognized renderer type: "+e),e!==this._renderType&&(this._renderType=e,this._resetRenderer()),this):this._renderType},tooltip(e){return arguments.length?(e!==this._tooltip&&(this._tooltip=e,this._resetRenderer()),this):this._tooltip},loader(e){return arguments.length?(e!==this._loader&&(Mr.prototype.loader.call(this,e),this._resetRenderer()),this):this._loader},resize(){return this._autosize=1,this.touch(xb(this,"autosize"))},_resetRenderer(){this._renderer&&(this._renderer=null,this.initialize(this._el,this._elBind))},_resizeView:function(e,t,n,r,i,a){this.runAfter((o=>{let s=0;o._autosize=0,o.width()!==n&&(s=1,o.signal(ub,n,db),o._resizeWidth.skip(!0)),o.height()!==r&&(s=1,o.signal(lb,r,db),o._resizeHeight.skip(!0)),o._viewWidth!==e&&(o._resize=1,o._viewWidth=e),o._viewHeight!==t&&(o._resize=1,o._viewHeight=t),o._origin[0]===i[0]&&o._origin[1]===i[1]||(o._resize=1,o._origin=i),s&&o.run("enter"),a&&o.runAfter((e=>e.resize()))}),!1,1)},addEventListener(e,t,n){let r=t;return n&&!1===n.trap||(r=rb(this,t),r.raw=t),this._handler.on(e,r),this},removeEventListener(e,t){for(var n,r,i=this._handler.handlers(e),a=i.length;--a>=0;)if(r=i[a].type,n=i[a].handler,e===r&&(t===n||t===n.raw)){this._handler.off(r,n);break}return this},addResizeListener(e){const t=this._resizeListeners;return t.indexOf(e)<0&&t.push(e),this},removeResizeListener(e){var t=this._resizeListeners,n=t.indexOf(e);return n>=0&&t.splice(n,1),this},addSignalListener(e,t){return kb(this,e,xb(this,e),t)},removeSignalListener(e,t){return Ab(this,xb(this,e),t)},addDataListener(e,t){return kb(this,e,zv(this,e).values,t)},removeDataListener(e,t){return Ab(this,zv(this,e).values,t)},globalCursor(e){if(arguments.length){if(this._globalCursor!==!!e){const t=Rv(this,null);this._globalCursor=!!e,t&&Rv(this,t)}return this}return this._globalCursor},preventDefault(e){return arguments.length?(this._preventDefault=e,this):this._preventDefault},timer:function(e,t){this._timers.push(g.interval((function(t){e({timestamp:Date.now(),elapsed:t})}),t))},events:function(e,t,n){var r,i=this,a=new pr(n),o=function(n,r){i.runAsync(null,(()=>{e===Pv&&function(e,t){var n=e._eventConfig.defaults,r=n.prevent,i=n.allow;return!1!==r&&!0!==i&&(!0===r||!1===i||(r?r[t]:i?!i[t]:e.preventDefault()))}(i,t)&&n.preventDefault(),a.receive(Nv(i,n,r))}))};if("timer"===e)Iv(i,"timer",t)&&i.timer(o,t);else if(e===Pv)Iv(i,"view",t)&&i.addEventListener(t,o,Uv);else if("window"===e?Iv(i,"window",t)&&"undefined"!=typeof window&&(r=[window]):"undefined"!=typeof document&&Iv(i,"selector",t)&&(r=document.querySelectorAll(e)),r){for(var s=0,u=r.length;s<u;++s)r[s].addEventListener(t,o);jv(i,r,t,o)}else i.warn("Can not resolve event source: "+e);return a},finalize:function(){var e,t,n,r=this._tooltip,i=this._timers,a=this._eventListeners;for(e=i.length;--e>=0;)i[e].stop();for(e=a.length;--e>=0;)for(t=(n=a[e]).sources.length;--t>=0;)n.sources[t].removeEventListener(n.type,n.handler);return r&&r.call(this,this._handler,null,null,null),this},hover:function(e,t){return t=[t||"update",(e=[e||"hover"])[0]],this.on(this.events("view","mouseover",Wv),Hv,Gv(e)),this.on(this.events("view","mouseout",Wv),Hv,Gv(t)),this},data:function(e,t){return arguments.length<2?zv(this,e).values.value:$v.call(this,e,or().remove(z).insert(t))},change:$v,insert:function(e,t){return $v.call(this,e,or().insert(t))},remove:function(e,t){return $v.call(this,e,or().remove(t))},scale:function(e){var t=this._runtime.scales;return Ae(t,e)||C("Unrecognized scale or projection: "+e),t[e].value},initialize:function(e,t){const n=this,r=n._renderType,i=n._eventConfig.bind,a=Nd(r);e=n._el=e?ib(n,e,!0):null,function(e){const t=e.container();t&&(t.setAttribute("role","graphics-document"),t.setAttribute("aria-roleDescription","visualization"),Bv(t,e.description()))}(n),a||n.error("Unrecognized renderer type: "+r);const o=a.handler||Ic,s=e?a.renderer:a.headless;return n._renderer=s?nb(n,n._renderer,e,s):null,n._handler=function(e,t,n,r){const i=new r(e.loader(),rb(e,e.tooltip())).scene(e.scenegraph().root).initialize(n,Tv(e),e);return t&&t.handlers().forEach((e=>{i.on(e.type,e.handler)})),i}(n,n._handler,e,o),n._redraw=!0,e&&"none"!==i&&(t=t?n._elBind=ib(n,t,!0):e.appendChild(Vv("form",{class:"vega-bindings"})),n._bind.forEach((e=>{e.param.element&&"container"!==i&&(e.element=ib(n,e.param.element,!!e.param.input))})),n._bind.forEach((e=>{!function(e,t,n){if(!t)return;const r=n.param;let i=n.state;i||(i=n.state={elements:null,active:!1,set:null,update:t=>{t!=e.signal(r.signal)&&e.runAsync(null,(()=>{i.source=!0,e.signal(r.signal,t)}))}},r.debounce&&(i.update=ve(r.debounce,i.update))),(null==r.input&&r.element?Yv:Xv)(i,t,r,e),i.active||(e.on(e._signals[r.signal],null,(()=>{i.source?i.source=!1:i.set(e.signal(r.signal))})),i.active=!0)}(n,e.element||t,e)}))),n},toImageURL:async function(e,t){e!==Ld.Canvas&&e!==Ld.SVG&&e!==Ld.PNG&&C("Unrecognized image type: "+e);const n=await sb(this,e,t);return e===Ld.SVG?function(e,t){const n=new Blob([e],{type:t});return window.URL.createObjectURL(n)}(n.svg(),"image/svg+xml"):n.canvas().toDataURL("image/png")},toCanvas:async function(e,t){return(await sb(this,Ld.Canvas,e,t)).canvas()},toSVG:async function(e){return(await sb(this,Ld.SVG,e)).svg()},getState:function(e){return this._runtime.getState(e||{data:pb,signals:mb,recurse:!0})},setState:function(e){return this.runAsync(null,(t=>{t._trigger=!1,t._runtime.setState(e)}),(e=>{e._trigger=!0})),this}});const wb="[",Db="]",Eb=/[[\]{}]/,Cb={"*":1,arc:1,area:1,group:1,image:1,line:1,path:1,rect:1,rule:1,shape:1,symbol:1,text:1,trail:1};let Fb,Mb;function Sb(e,t,n){return Fb=t||"view",Mb=n||Cb,Ob(e.trim()).map(Rb)}function Bb(e,t,n,r,i){const a=e.length;let o,s=0;for(;t<a;++t){if(o=e[t],!s&&o===n)return t;i&&i.indexOf(o)>=0?--s:r&&r.indexOf(o)>=0&&++s}return t}function Ob(e){const t=[],n=e.length;let r=0,i=0;for(;i<n;)i=Bb(e,i,",","[{","]}"),t.push(e.substring(r,i).trim()),r=++i;if(0===t.length)throw"Empty event selector: "+e;return t}function Rb(e){return"["===e[0]?function(e){const t=e.length;let n,r=1;if(r=Bb(e,r,Db,wb,Db),r===t)throw"Empty between selector: "+e;if(n=Ob(e.substring(1,r)),2!==n.length)throw"Between selector must have two elements: "+e;if(">"!==(e=e.slice(r+1).trim())[0])throw"Expected '>' after between selector: "+e;n=n.map(Rb);const i=Rb(e.slice(1).trim());if(i.between)return{between:n,stream:i};i.between=n;return i}(e):function(e){const t={source:Fb},n=[];let r,i,a=[0,0],o=0,s=0,u=e.length,l=0;if("}"===e[u-1]){if(l=e.lastIndexOf("{"),!(l>=0))throw"Unmatched right brace: "+e;try{a=function(e){const t=e.split(",");if(!e.length||t.length>2)throw e;return t.map((t=>{const n=+t;if(n!=n)throw e;return n}))}(e.substring(l+1,u-1))}catch(t){throw"Invalid throttle specification: "+e}u=(e=e.slice(0,l).trim()).length,l=0}if(!u)throw e;"@"===e[0]&&(o=++l);r=Bb(e,l,":"),r<u&&(n.push(e.substring(s,r).trim()),s=l=++r);if(l=Bb(e,l,wb),l===u)n.push(e.substring(s,u).trim());else if(n.push(e.substring(s,l).trim()),i=[],s=++l,s===u)throw"Unmatched left bracket: "+e;for(;l<u;){if(l=Bb(e,l,Db),l===u)throw"Unmatched left bracket: "+e;if(i.push(e.substring(s,l).trim()),l<u-1&&e[++l]!==wb)throw"Expected left bracket: "+e;s=++l}if(!(u=n.length)||Eb.test(n[u-1]))throw"Invalid event selector: "+e;u>1?(t.type=n[1],o?t.markname=n[0].slice(1):!function(e){return Mb[e]}(n[0])?t.source=n[0]:t.marktype=n[0]):t.type=n[0];"!"===t.type.slice(-1)&&(t.consume=!0,t.type=t.type.slice(0,-1));null!=i&&(t.filter=i);a[0]&&(t.throttle=a[0]);a[1]&&(t.debounce=a[1]);return t}(e)}function zb(e){return N(e)?e:{type:e||"pad"}}const $b=e=>+e||0;function qb(e){return N(e)?e.signal?e:{top:$b(e.top),bottom:$b(e.bottom),left:$b(e.left),right:$b(e.right)}:{top:t=$b(e),bottom:t,left:t,right:t};var t}const Lb=e=>N(e)&&!T(e)?be({},e):{value:e};function Tb(e,t,n,r){if(null!=n){return N(n)&&!T(n)||T(n)&&n.length&&N(n[0])?e.update[t]=n:e[r||"enter"][t]={value:n},1}return 0}function Nb(e,t,n){for(const n in t)Tb(e,n,t[n]);for(const t in n)Tb(e,t,n[t],"update")}function Pb(e,t,n){for(const r in t)n&&Ae(n,r)||(e[r]=be(e[r]||{},t[r]));return e}function Ub(e,t){return t&&(t.enter&&t.enter[e]||t.update&&t.update[e])}const jb="mark",Ib="frame",Wb="scope",Hb="legend-label",Gb="title-text",Vb="title-subtitle";function Yb(e,t,n){e[t]=n&&n.signal?{signal:n.signal}:{value:n}}const Xb=e=>ze(e)?je(e):e.signal?`(${e.signal})`:Zb(e);function Jb(e){if(null!=e.gradient)return function(e){const t=[e.start,e.stop,e.count].map((e=>null==e?null:je(e)));for(;t.length&&null==W(t);)t.pop();return t.unshift(Xb(e.gradient)),`gradient(${t.join(",")})`}(e);let t=e.signal?`(${e.signal})`:e.color?function(e){return e.c?Qb("hcl",e.h,e.c,e.l):e.h||e.s?Qb("hsl",e.h,e.s,e.l):e.l||e.a?Qb("lab",e.l,e.a,e.b):e.r||e.g||e.b?Qb("rgb",e.r,e.g,e.b):null}(e.color):null!=e.field?Zb(e.field):void 0!==e.value?je(e.value):void 0;return null!=e.scale&&(t=function(e,t){const n=Xb(e.scale);null!=e.range?t=`lerp(_range(${n}), ${+e.range})`:(void 0!==t&&(t=`_scale(${n}, ${t})`),e.band&&(t=(t?t+"+":"")+`_bandwidth(${n})`+(1==+e.band?"":"*"+Kb(e.band)),e.extra&&(t=`(datum.extra ? _scale(${n}, datum.extra.value) : ${t})`)),null==t&&(t="0"));return t}(e,t)),void 0===t&&(t=null),null!=e.exponent&&(t=`pow(${t},${Kb(e.exponent)})`),null!=e.mult&&(t+=`*${Kb(e.mult)}`),null!=e.offset&&(t+=`+${Kb(e.offset)}`),e.round&&(t=`round(${t})`),t}const Qb=(e,t,n,r)=>`(${e}(${[t,n,r].map(Jb).join(",")})+'')`;function Kb(e){return N(e)?"("+Jb(e)+")":e}function Zb(e){return ex(N(e)?e:{datum:e})}function ex(e){let t,n,r;if(e.signal)t="datum",r=e.signal;else if(e.group||e.parent){for(n=Math.max(1,e.level||1),t="item";n-- >0;)t+=".mark.group";e.parent?(r=e.parent,t+=".datum"):r=e.group}else e.datum?(t="datum",r=e.datum):C("Invalid field reference: "+je(e));return e.signal||(r=ze(r)?F(r).map(je).join("]["):ex(r)),t+"["+r+"]"}function tx(e,t,n,r,i,a){const o={};(a=a||{}).encoders={$encode:o},e=function(e,t,n,r,i){const a={},o={};let s,u,l,c;for(u in u="lineBreak","text"!==t||null==i[u]||Ub(u,e)||Yb(a,u,i[u]),("legend"==n||String(n).startsWith("axis"))&&(n=null),c=n===Ib?i.group:n===jb?be({},i.mark,i[t]):null,c)l=Ub(u,e)||("fill"===u||"stroke"===u)&&(Ub("fill",e)||Ub("stroke",e)),l||Yb(a,u,c[u]);for(u in le(r).forEach((t=>{const n=i.style&&i.style[t];for(const t in n)Ub(t,e)||Yb(a,t,n[t])})),e=be({},e),a)c=a[u],c.signal?(s=s||{})[u]=c:o[u]=c;return e.enter=be(o,e.enter),s&&(e.update=be(s,e.update)),e}(e,t,n,r,i.config);for(const n in e)o[n]=nx(e[n],t,a,i);return a}function nx(e,t,n,r){const i={},a={};for(const t in e)null!=e[t]&&(i[t]=rx((o=e[t],T(o)?function(e){let t="";return e.forEach((e=>{const n=Jb(e);t+=e.test?`(${e.test})?${n}:`:n})),":"===W(t)&&(t+="null"),t}(o):Jb(o)),r,n,a));var o;return{$expr:{marktype:t,channels:i},$fields:Object.keys(a),$output:Object.keys(e)}}function rx(e,t,n,r){const i=bv(e,t);return i.$fields.forEach((e=>r[e]=1)),be(n,i.$params),i.$expr}const ix=["value","update","init","react","bind"];function ax(e,t){C(e+' for "outer" push: '+je(t))}function ox(e,t){const n=e.name;if("outer"===e.push)t.signals[n]||ax("No prior signal definition",n),ix.forEach((t=>{void 0!==e[t]&&ax("Invalid property ",t)}));else{const r=t.addSignal(n,e.value);!1===e.react&&(r.react=!1),e.bind&&t.addBinding(n,e.bind)}}function sx(e,t,n,r){this.id=-1,this.type=e,this.value=t,this.params=n,r&&(this.parent=r)}function ux(e,t,n,r){return new sx(e,t,n,r)}function lx(e,t){return ux("operator",e,t)}function cx(e){const t={$ref:e.id};return e.id<0&&(e.refs=e.refs||[]).push(t),t}function dx(e,t){return t?{$field:e,$name:t}:{$field:e}}const fx=dx("key");function hx(e,t){return{$compare:e,$order:t}}function px(e,t){return(e&&e.signal?"$"+e.signal:e||"")+(e&&t?"_":"")+(t&&t.signal?"$"+t.signal:t||"")}const mx="scope",gx="view";function yx(e){return e&&e.signal}function vx(e){if(yx(e))return!0;if(N(e))for(const t in e)if(vx(e[t]))return!0;return!1}function bx(e,t){return null!=e?e:t}function xx(e){return e&&e.signal||e}const _x="timer";function kx(e,t){return(e.merge?Ax:e.stream?wx:e.type?Dx:C("Invalid stream specification: "+je(e)))(e,t)}function Ax(e,t){const n=Ex({merge:e.merge.map((e=>kx(e,t)))},e,t);return t.addStream(n).id}function wx(e,t){const n=Ex({stream:kx(e.stream,t)},e,t);return t.addStream(n).id}function Dx(e,t){let n;e.type===_x?(n=t.event(_x,e.throttle),e={between:e.between,filter:e.filter}):n=t.event(function(e){return e===mx?gx:e||gx}(e.source),e.type);const r=Ex({stream:n},e,t);return 1===Object.keys(r).length?n:t.addStream(r).id}function Ex(e,t,n){let r=t.between;return r&&(2!==r.length&&C('Stream "between" parameter must have 2 entries: '+je(t)),e.between=[kx(r[0],n),kx(r[1],n)]),r=t.filter?[].concat(t.filter):[],(t.marktype||t.markname||t.markrole)&&r.push(function(e,t,n){const r="event.item";return r+(e&&"*"!==e?"&&"+r+".mark.marktype==='"+e+"'":"")+(n?"&&"+r+".mark.role==='"+n+"'":"")+(t?"&&"+r+".mark.name==='"+t+"'":"")}(t.marktype,t.markname,t.markrole)),t.source===mx&&r.push("inScope(event.item)"),r.length&&(e.filter=bv("("+r.join(")&&(")+")",n).$expr),null!=(r=t.throttle)&&(e.throttle=+r),null!=(r=t.debounce)&&(e.debounce=+r),t.consume&&(e.consume=!0),e}const Cx={code:"_.$value",ast:{type:"Identifier",value:"value"}};function Fx(e,t,n){const r=e.encode,i={target:n};let a=e.events,o=e.update,s=[];a||C("Signal update missing events specification."),ze(a)&&(a=Sb(a,t.isSubscope()?mx:gx)),a=le(a).filter((e=>e.signal||e.scale?(s.push(e),0):1)),s.length>1&&(s=[Mx(s)]),a.length&&s.push(a.length>1?{merge:a}:a[0]),null!=r&&(o&&C("Signal encode and update are mutually exclusive."),o="encode(item(),"+je(r)+")"),i.update=ze(o)?bv(o,t):null!=o.expr?bv(o.expr,t):null!=o.value?o.value:null!=o.signal?{$expr:Cx,$params:{$value:t.signalRef(o.signal)}}:C("Invalid signal update specification."),e.force&&(i.options={force:!0}),s.forEach((e=>t.addUpdate(be(function(e,t){return{source:e.signal?t.signalRef(e.signal):e.scale?t.scaleRef(e.scale):kx(e,t)}}(e,t),i))))}function Mx(e){return{signal:"["+e.map((e=>e.scale?'scale("'+e.scale+'")':e.signal))+"]"}}const Sx=e=>(t,n,r)=>ux(e,n,t||void 0,r),Bx=Sx("aggregate"),Ox=Sx("axisticks"),Rx=Sx("bound"),zx=Sx("collect"),$x=Sx("compare"),qx=Sx("datajoin"),Lx=Sx("encode"),Tx=Sx("expression"),Nx=Sx("facet"),Px=Sx("field"),Ux=Sx("key"),jx=Sx("legendentries"),Ix=Sx("load"),Wx=Sx("mark"),Hx=Sx("multiextent"),Gx=Sx("multivalues"),Vx=Sx("overlap"),Yx=Sx("params"),Xx=Sx("prefacet"),Jx=Sx("projection"),Qx=Sx("proxy"),Kx=Sx("relay"),Zx=Sx("render"),e_=Sx("scale"),t_=Sx("sieve"),n_=Sx("sortitems"),r_=Sx("viewlayout"),i_=Sx("values");let a_=0;const o_={min:"min",max:"max",count:"sum"};function s_(e,t){const n=t.getScale(e.name).params;let r;var i;for(r in n.domain=d_(e.domain,e,t),null!=e.range&&(n.range=b_(e,t,n)),null!=e.interpolate&&function(e,t){t.interpolate=u_(e.type||e),null!=e.gamma&&(t.interpolateGamma=u_(e.gamma))}(e.interpolate,n),null!=e.nice&&(n.nice=N(i=e.nice)?{interval:u_(i.interval),step:u_(i.step)}:u_(i)),null!=e.bins&&(n.bins=function(e,t){return e.signal||T(e)?l_(e,t):t.objectProperty(e)}(e.bins,t)),e)Ae(n,r)||"name"===r||(n[r]=u_(e[r],t))}function u_(e,t){return N(e)?e.signal?t.signalRef(e.signal):C("Unsupported object: "+je(e)):e}function l_(e,t){return e.signal?t.signalRef(e.signal):e.map((e=>u_(e,t)))}function c_(e){C("Can not find data set: "+je(e))}function d_(e,t,n){if(e)return e.signal?n.signalRef(e.signal):(T(e)?f_:e.fields?p_:h_)(e,t,n);null==t.domainMin&&null==t.domainMax||C("No scale domain defined for domainMin/domainMax to override.")}function f_(e,t,n){return e.map((e=>u_(e,n)))}function h_(e,t,n){const r=n.getData(e.data);return r||c_(e.data),Ro(t.type)?r.valuesRef(n,e.field,g_(e.sort,!1)):Lo(t.type)?r.domainRef(n,e.field):r.extentRef(n,e.field)}function p_(e,t,n){const r=e.data,i=e.fields.reduce(((e,t)=>(t=ze(t)?{data:r,field:t}:T(t)||t.signal?function(e,t){const n="_:vega:_"+a_++,r=zx({});if(T(e))r.value={$ingest:e};else if(e.signal){const i="setdata("+je(n)+","+e.signal+")";r.params.input=t.signalRef(i)}return t.addDataPipeline(n,[r,t_({})]),{data:n,field:"data"}}(t,n):t,e.push(t),e)),[]);return(Ro(t.type)?m_:Lo(t.type)?y_:v_)(e,n,i)}function m_(e,t,n){const r=g_(e.sort,!0);let i,a;const o=n.map((e=>{const n=t.getData(e.data);return n||c_(e.data),n.countsRef(t,e.field,r)})),s={groupby:fx,pulse:o};r&&(i=r.op||"count",a=r.field?px(i,r.field):"count",s.ops=[o_[i]],s.fields=[t.fieldRef(a)],s.as=[a]),i=t.add(Bx(s));const u=t.add(zx({pulse:cx(i)}));return a=t.add(i_({field:fx,sort:t.sortRef(r),pulse:cx(u)})),cx(a)}function g_(e,t){return e&&(e.field||e.op?e.field||"count"===e.op?t&&e.field&&e.op&&!o_[e.op]&&C("Multiple domain scales can not be sorted using "+e.op):C("No field provided for sort aggregate op: "+e.op):N(e)?e.field="key":e={field:"key"}),e}function y_(e,t,n){const r=n.map((e=>{const n=t.getData(e.data);return n||c_(e.data),n.domainRef(t,e.field)}));return cx(t.add(Gx({values:r})))}function v_(e,t,n){const r=n.map((e=>{const n=t.getData(e.data);return n||c_(e.data),n.extentRef(t,e.field)}));return cx(t.add(Hx({extents:r})))}function b_(e,t,n){const r=t.config.range;let i=e.range;if(i.signal)return t.signalRef(i.signal);if(ze(i)){if(r&&Ae(r,i))return b_(e=be({},e,{range:r[i]}),t,n);"width"===i?i=[0,{signal:"width"}]:"height"===i?i=Ro(e.type)?[0,{signal:"height"}]:[{signal:"height"},0]:C("Unrecognized scale range value: "+je(i))}else{if(i.scheme)return n.scheme=T(i.scheme)?l_(i.scheme,t):u_(i.scheme,t),i.extent&&(n.schemeExtent=l_(i.extent,t)),void(i.count&&(n.schemeCount=u_(i.count,t)));if(i.step)return void(n.rangeStep=u_(i.step,t));if(Ro(e.type)&&!T(i))return d_(i,e,t);T(i)||C("Unsupported range type: "+je(i))}return i.map((e=>(T(e)?l_:u_)(e,t)))}function x_(e,t,n){return T(e)?e.map((e=>x_(e,t,n))):N(e)?e.signal?n.signalRef(e.signal):"fit"===t?e:C("Unsupported parameter object: "+je(e)):e}const __="top",k_="left",A_="right",w_="bottom",D_="center",E_="index",C_="label",F_="perc",M_="value",S_="guide-label",B_="guide-title",O_="group-title",R_="group-subtitle",z_="symbol",$_="gradient",q_="discrete",L_="size",T_=[L_,"shape","fill","stroke","strokeWidth","strokeDash","opacity"],N_={name:1,style:1,interactive:1},P_={value:0},U_={value:1},j_="group",I_="rect",W_="rule",H_="text";function G_(e){return e.type=j_,e.interactive=e.interactive||!1,e}function V_(e,t){const n=(n,r)=>bx(e[n],bx(t[n],r));return n.isVertical=n=>"vertical"===bx(e.direction,t.direction||(n?t.symbolDirection:t.gradientDirection)),n.gradientLength=()=>bx(e.gradientLength,t.gradientLength||t.gradientWidth),n.gradientThickness=()=>bx(e.gradientThickness,t.gradientThickness||t.gradientHeight),n.entryColumns=()=>bx(e.columns,bx(t.columns,+n.isVertical(!0))),n}function Y_(e,t){const n=t&&(t.update&&t.update[e]||t.enter&&t.enter[e]);return n&&n.signal?n:n?n.value:null}function X_(e,t,n){return`item.anchor === 'start' ? ${e} : item.anchor === 'end' ? ${t} : ${n}`}const J_=X_(je(k_),je(A_),je(D_));function Q_(e,t){return t?e?N(e)?Object.assign({},e,{offset:Q_(e.offset,t)}):{value:e,offset:t}:t:e}function K_(e,t){return t?(e.name=t.name,e.style=t.style||e.style,e.interactive=!!t.interactive,e.encode=Pb(e.encode,t,N_)):e.interactive=!1,e}function Z_(e,t,n,r){const i=V_(e,n),a=i.isVertical(),o=i.gradientThickness(),s=i.gradientLength();let u,l,c,d,f;a?(l=[0,1],c=[0,0],d=o,f=s):(l=[0,0],c=[1,0],d=s,f=o);const h={enter:u={opacity:P_,x:P_,y:P_,width:Lb(d),height:Lb(f)},update:be({},u,{opacity:U_,fill:{gradient:t,start:l,stop:c}}),exit:{opacity:P_}};return Nb(h,{stroke:i("gradientStrokeColor"),strokeWidth:i("gradientStrokeWidth")},{opacity:i("gradientOpacity")}),K_({type:I_,role:"legend-gradient",encode:h},r)}function ek(e,t,n,r,i){const a=V_(e,n),o=a.isVertical(),s=a.gradientThickness(),u=a.gradientLength();let l,c,d,f,h="";o?(l="y",d="y2",c="x",f="width",h="1-"):(l="x",d="x2",c="y",f="height");const p={opacity:P_,fill:{scale:t,field:M_}};p[l]={signal:h+"datum."+F_,mult:u},p[c]=P_,p[d]={signal:h+"datum.perc2",mult:u},p[f]=Lb(s);const m={enter:p,update:be({},p,{opacity:U_}),exit:{opacity:P_}};return Nb(m,{stroke:a("gradientStrokeColor"),strokeWidth:a("gradientStrokeWidth")},{opacity:a("gradientOpacity")}),K_({type:I_,role:"legend-band",key:M_,from:i,encode:m},r)}function tk(e,t,n,r){const i=V_(e,t),a=i.isVertical(),o=Lb(i.gradientThickness()),s=i.gradientLength();let u,l,c,d,f=i("labelOverlap"),h="";const p={enter:u={opacity:P_},update:l={opacity:U_,text:{field:C_}},exit:{opacity:P_}};return Nb(p,{fill:i("labelColor"),fillOpacity:i("labelOpacity"),font:i("labelFont"),fontSize:i("labelFontSize"),fontStyle:i("labelFontStyle"),fontWeight:i("labelFontWeight"),limit:bx(e.labelLimit,t.gradientLabelLimit)}),a?(u.align={value:"left"},u.baseline=l.baseline={signal:'datum.perc<=0?"bottom":datum.perc>=1?"top":"middle"'},c="y",d="x",h="1-"):(u.align=l.align={signal:'datum.perc<=0?"left":datum.perc>=1?"right":"center"'},u.baseline={value:"top"},c="x",d="y"),u[c]=l[c]={signal:h+"datum."+F_,mult:s},u[d]=l[d]=o,o.offset=bx(e.labelOffset,t.gradientLabelOffset)||0,f=f?{separation:i("labelSeparation"),method:f,order:"datum.index"}:void 0,K_({type:H_,role:Hb,style:S_,key:M_,from:r,encode:p,overlap:f},n)}function nk(e,t,n,r,i){const a=V_(e,t),o=n.entries,s=!(!o||!o.interactive),u=o?o.name:void 0,l=a("clipHeight"),c=a("symbolOffset"),d={data:"value"},f=`(${i}) ? datum.offset : datum.size`,h=l?Lb(l):{field:L_},p="datum.index",m=`max(1, ${i})`;let g,y,v,b,x;h.mult=.5,g={enter:y={opacity:P_,x:{signal:f,mult:.5,offset:c},y:h},update:v={opacity:U_,x:y.x,y:y.y},exit:{opacity:P_}};let _=null,k=null;e.fill||(_=t.symbolBaseFillColor,k=t.symbolBaseStrokeColor),Nb(g,{fill:a("symbolFillColor",_),shape:a("symbolType"),size:a("symbolSize"),stroke:a("symbolStrokeColor",k),strokeDash:a("symbolDash"),strokeDashOffset:a("symbolDashOffset"),strokeWidth:a("symbolStrokeWidth")},{opacity:a("symbolOpacity")}),T_.forEach((t=>{e[t]&&(v[t]=y[t]={scale:e[t],field:M_})}));const A=K_({type:"symbol",role:"legend-symbol",key:M_,from:d,clip:!!l||void 0,encode:g},n.symbols),w=Lb(c);w.offset=a("labelOffset"),g={enter:y={opacity:P_,x:{signal:f,offset:w},y:h},update:v={opacity:U_,text:{field:C_},x:y.x,y:y.y},exit:{opacity:P_}},Nb(g,{align:a("labelAlign"),baseline:a("labelBaseline"),fill:a("labelColor"),fillOpacity:a("labelOpacity"),font:a("labelFont"),fontSize:a("labelFontSize"),fontStyle:a("labelFontStyle"),fontWeight:a("labelFontWeight"),limit:a("labelLimit")});const D=K_({type:H_,role:Hb,style:S_,key:M_,from:d,encode:g},n.labels);return g={enter:{noBound:{value:!l},width:P_,height:l?Lb(l):P_,opacity:P_},exit:{opacity:P_},update:v={opacity:U_,row:{signal:null},column:{signal:null}}},a.isVertical(!0)?(b=`ceil(item.mark.items.length / ${m})`,v.row.signal=`${p}%${b}`,v.column.signal=`floor(${p} / ${b})`,x={field:["row",p]}):(v.row.signal=`floor(${p} / ${m})`,v.column.signal=`${p} % ${m}`,x={field:p}),v.column.signal=`(${i})?${v.column.signal}:${p}`,G_({role:Wb,from:r={facet:{data:r,name:"value",groupby:E_}},encode:Pb(g,o,N_),marks:[A,D],name:u,interactive:s,sort:x})}const rk='item.orient === "left"',ik='item.orient === "right"',ak=`(${rk} || ${ik})`,ok=`datum.vgrad && ${ak}`,sk=X_('"top"','"bottom"','"middle"'),uk=`datum.vgrad && ${ik} ? (${X_('"right"','"left"','"center"')}) : (${ak} && !(datum.vgrad && ${rk})) ? "left" : ${J_}`,lk=`item._anchor || (${ak} ? "middle" : "start")`,ck=`${ok} ? (${rk} ? -90 : 90) : 0`,dk=`${ak} ? (datum.vgrad ? (${ik} ? "bottom" : "top") : ${sk}) : "top"`;function fk(e,t){let n;return N(e)&&(e.signal?n=e.signal:e.path?n="pathShape("+hk(e.path)+")":e.sphere&&(n="geoShape("+hk(e.sphere)+', {type: "Sphere"})')),n?t.signalRef(n):!!e}function hk(e){return N(e)&&e.signal?e.signal:je(e)}function pk(e){const t=e.role||"";return t.indexOf("axis")&&t.indexOf("legend")&&t.indexOf("title")?e.type===j_?Wb:t||jb:t}function mk(e){return{marktype:e.type,name:e.name||void 0,role:e.role||pk(e),zindex:+e.zindex||void 0,aria:e.aria,description:e.description}}function gk(e,t){return e&&e.signal?t.signalRef(e.signal):!1!==e}function yk(e,t){const n=Rr(e.type);n||C("Unrecognized transform type: "+je(e.type));const r=ux(n.type.toLowerCase(),null,vk(n,e,t));return e.signal&&t.addSignal(e.signal,t.proxy(r)),r.metadata=n.metadata||{},r}function vk(e,t,n){const r={},i=e.params.length;for(let a=0;a<i;++a){const i=e.params[a];r[i.name]=bk(i,t,n)}return r}function bk(e,t,n){const r=e.type,i=t[e.name];return"index"===r?function(e,t,n){ze(t.from)||C('Lookup "from" parameter must be a string literal.');return n.getData(t.from).lookupRef(n,t.key)}(0,t,n):void 0!==i?"param"===r?function(e,t,n){const r=t[e.name];return e.array?(T(r)||C("Expected an array of sub-parameters. Instead: "+je(r)),r.map((t=>_k(e,t,n)))):_k(e,r,n)}(e,t,n):"projection"===r?n.projectionRef(t[e.name]):e.array&&!yx(i)?i.map((t=>xk(e,t,n))):xk(e,i,n):void(e.required&&C("Missing required "+je(t.type)+" parameter: "+je(e.name)))}function xk(e,t,n){const r=e.type;if(yx(t))return Dk(r)?C("Expression references can not be signals."):Ek(r)?n.fieldRef(t):Ck(r)?n.compareRef(t):n.signalRef(t.signal);{const i=e.expr||Ek(r);return i&&kk(t)?n.exprRef(t.expr,t.as):i&&Ak(t)?dx(t.field,t.as):Dk(r)?bv(t,n):wk(r)?cx(n.getData(t).values):Ek(r)?dx(t):Ck(r)?n.compareRef(t):t}}function _k(e,t,n){const r=e.params.length;let i;for(let n=0;n<r;++n){i=e.params[n];for(const e in i.key)if(i.key[e]!==t[e]){i=null;break}if(i)break}i||C("Unsupported parameter: "+je(t));const a=be(vk(i,t,n),i.key);return cx(n.add(Yx(a)))}const kk=e=>e&&e.expr,Ak=e=>e&&e.field,wk=e=>"data"===e,Dk=e=>"expr"===e,Ek=e=>"field"===e,Ck=e=>"compare"===e;function Fk(e,t){return e.$ref?e:e.data&&e.data.$ref?e.data:cx(t.getData(e.data).output)}function Mk(e,t,n,r,i){this.scope=e,this.input=t,this.output=n,this.values=r,this.aggregate=i,this.index={}}function Sk(e){return ze(e)?e:null}function Bk(e,t,n){const r=px(n.op,n.field);let i;if(t.ops){for(let e=0,n=t.as.length;e<n;++e)if(t.as[e]===r)return}else t.ops=["count"],t.fields=[null],t.as=["count"];n.op&&(t.ops.push((i=n.op.signal)?e.signalRef(i):n.op),t.fields.push(e.fieldRef(n.field)),t.as.push(r))}function Ok(e,t,n,r,i,a,o){const s=t[n]||(t[n]={}),u=function(e){return N(e)?("descending"===e.order?"-":"+")+px(e.op,e.field):""}(a);let l,c,d=Sk(i);if(null!=d&&(e=t.scope,d+=u?"|"+u:"",l=s[d]),!l){const n=a?{field:fx,pulse:t.countsRef(e,i,a)}:{field:e.fieldRef(i),pulse:cx(t.output)};u&&(n.sort=e.sortRef(a)),c=e.add(ux(r,void 0,n)),o&&(t.index[i]=c),l=cx(c),null!=d&&(s[d]=l)}return l}function Rk(e,t,n){const r=e.remove,i=e.insert,a=e.toggle,o=e.modify,s=e.values,u=t.add(lx()),l=bv("if("+e.trigger+',modify("'+n+'",'+[i,r,a,o,s].map((e=>null==e?"null":e)).join(",")+"),0)",t);u.update=l.$expr,u.params=l.$params}function zk(e,t){const n=pk(e),r=e.type===j_,i=e.from&&e.from.facet,a=e.overlap;let o,s,u,l,c,d,f,h=e.layout||n===Wb||n===Ib;const p=n===jb||h||i,m=function(e,t,n){let r,i,a,o,s;return e?(r=e.facet)&&(t||C("Only group marks can be faceted."),null!=r.field?o=s=Fk(r,n):(e.data?s=cx(n.getData(e.data).aggregate):(a=yk(be({type:"aggregate",groupby:le(r.groupby)},r.aggregate),n),a.params.key=n.keyRef(r.groupby),a.params.pulse=Fk(r,n),o=s=cx(n.add(a))),i=n.keyRef(r.groupby,!0))):o=cx(n.add(zx(null,[{}]))),o||(o=Fk(e,n)),{key:i,pulse:o,parent:s}}(e.from,r,t);s=t.add(qx({key:m.key||(e.key?dx(e.key):void 0),pulse:m.pulse,clean:!r}));const g=cx(s);s=u=t.add(zx({pulse:g})),s=t.add(Wx({markdef:mk(e),interactive:gk(e.interactive,t),clip:fk(e.clip,t),context:{$context:!0},groups:t.lookup(),parent:t.signals.parent?t.signalRef("parent"):null,index:t.markpath(),pulse:cx(s)}));const y=cx(s);s=l=t.add(Lx(tx(e.encode,e.type,n,e.style,t,{mod:!1,pulse:y}))),s.params.parent=t.encode(),e.transform&&e.transform.forEach((e=>{const n=yk(e,t),r=n.metadata;(r.generates||r.changes)&&C("Mark transforms should not generate new data."),r.nomod||(l.params.mod=!0),n.params.pulse=cx(s),t.add(s=n)})),e.sort&&(s=t.add(n_({sort:t.compareRef(e.sort),pulse:cx(s)})));const v=cx(s);(i||h)&&(h=t.add(r_({layout:t.objectProperty(e.layout),legends:t.legends,mark:y,pulse:v})),d=cx(h));const b=t.add(Rx({mark:y,pulse:d||v}));f=cx(b),r&&(p&&(o=t.operators,o.pop(),h&&o.pop()),t.pushState(v,d||f,g),i?function(e,t,n){const r=e.from.facet,i=r.name,a=Fk(r,t);let o;r.name||C("Facet must have a name: "+je(r)),r.data||C("Facet must reference a data set: "+je(r)),r.field?o=t.add(Xx({field:t.fieldRef(r.field),pulse:a})):r.groupby?o=t.add(Nx({key:t.keyRef(r.groupby),group:cx(t.proxy(n.parent)),pulse:a})):C("Facet must specify groupby or field: "+je(r));const s=t.fork(),u=s.add(zx()),l=s.add(t_({pulse:cx(u)}));s.addData(i,new Mk(s,u,u,l)),s.addSignal("parent",null),o.params.subflow={$subflow:s.parse(e).toRuntime()}}(e,t,m):p?function(e,t,n){const r=t.add(Xx({pulse:n.pulse})),i=t.fork();i.add(t_()),i.addSignal("parent",null),r.params.subflow={$subflow:i.parse(e).toRuntime()}}(e,t,m):t.parse(e),t.popState(),p&&(h&&o.push(h),o.push(b))),a&&(f=function(e,t,n){const r=e.method,i=e.bound,a=e.separation,o={separation:yx(a)?n.signalRef(a.signal):a,method:yx(r)?n.signalRef(r.signal):r,pulse:t};e.order&&(o.sort=n.compareRef({field:e.order}));if(i){const e=i.tolerance;o.boundTolerance=yx(e)?n.signalRef(e.signal):+e,o.boundScale=n.scaleRef(i.scale),o.boundOrient=i.orient}return cx(n.add(Vx(o)))}(a,f,t));const x=t.add(Zx({pulse:f})),_=t.add(t_({pulse:cx(x)},void 0,t.parent()));null!=e.name&&(c=e.name,t.addData(c,new Mk(t,u,x,_)),e.on&&e.on.forEach((e=>{(e.insert||e.remove||e.toggle)&&C("Marks only support modify triggers."),Rk(e,t,c)})))}function $k(e,t){const n=t.config.legend,r=e.encode||{},i=V_(e,n),a=r.legend||{},o=a.name||void 0,s=a.interactive,u=a.style,l={};let c,d,f,h=0;T_.forEach((t=>e[t]?(l[t]=e[t],h=h||e[t]):0)),h||C("Missing valid scale for legend.");const p=function(e,t){let n=e.type||z_;e.type||1!==function(e){return T_.reduce(((t,n)=>t+(e[n]?1:0)),0)}(e)||!e.fill&&!e.stroke||(n=Oo(t)?$_:zo(t)?q_:z_);return n!==$_?n:zo(t)?q_:$_}(e,t.scaleType(h)),m={title:null!=e.title,scales:l,type:p,vgrad:"symbol"!==p&&i.isVertical()},g=cx(t.add(zx(null,[m]))),y=cx(t.add(jx(d={type:p,scale:t.scaleRef(h),count:t.objectProperty(i("tickCount")),limit:t.property(i("symbolLimit")),values:t.objectProperty(e.values),minstep:t.property(e.tickMinStep),formatType:t.property(e.formatType),formatSpecifier:t.property(e.format)})));return p===$_?(f=[Z_(e,h,n,r.gradient),tk(e,n,r.labels,y)],d.count=d.count||t.signalRef(`max(2,2*floor((${xx(i.gradientLength())})/100))`)):p===q_?f=[ek(e,h,n,r.gradient,y),tk(e,n,r.labels,y)]:(c=function(e,t){const n=V_(e,t);return{align:n("gridAlign"),columns:n.entryColumns(),center:{row:!0,column:!1},padding:{row:n("rowPadding"),column:n("columnPadding")}}}(e,n),f=[nk(e,n,r,y,xx(c.columns))],d.size=function(e,t,n){const r=xx(Lk("size",e,n)),i=xx(Lk("strokeWidth",e,n)),a=xx(function(e,t,n){return Y_("fontSize",e)||function(e,t,n){const r=t.config.style[n];return r&&r[e]}("fontSize",t,n)}(n[1].encode,t,S_));return bv(`max(ceil(sqrt(${r})+${i}),${a})`,t)}(e,t,f[0].marks)),f=[G_({role:"legend-entry",from:g,encode:{enter:{x:{value:0},y:{value:0}}},marks:f,layout:c,interactive:s})],m.title&&f.push(function(e,t,n,r){const i=V_(e,t),a={enter:{opacity:P_},update:{opacity:U_,x:{field:{group:"padding"}},y:{field:{group:"padding"}}},exit:{opacity:P_}};return Nb(a,{orient:i("titleOrient"),_anchor:i("titleAnchor"),anchor:{signal:lk},angle:{signal:ck},align:{signal:uk},baseline:{signal:dk},text:e.title,fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),baseline:i("titleBaseline")}),K_({type:H_,role:"legend-title",style:B_,from:r,encode:a},n)}(e,n,r.title,g)),zk(G_({role:"legend",from:g,encode:Pb(qk(i,e,n),a,N_),marks:f,aria:i("aria"),description:i("description"),zindex:i("zindex"),name:o,interactive:s,style:u}),t)}function qk(e,t,n){const r={enter:{},update:{}};return Nb(r,{orient:e("orient"),offset:e("offset"),padding:e("padding"),titlePadding:e("titlePadding"),cornerRadius:e("cornerRadius"),fill:e("fillColor"),stroke:e("strokeColor"),strokeWidth:n.strokeWidth,strokeDash:n.strokeDash,x:e("legendX"),y:e("legendY"),format:t.format,formatType:t.formatType}),r}function Lk(e,t,n){return t[e]?`scale("${t[e]}",datum)`:Y_(e,n[0].encode)}Mk.fromEntries=function(e,t){const n=t.length,r=t[n-1],i=t[n-2];let a=t[0],o=null,s=1;for(a&&"load"===a.type&&(a=t[1]),e.add(t[0]);s<n;++s)t[s].params.pulse=cx(t[s-1]),e.add(t[s]),"aggregate"===t[s].type&&(o=t[s]);return new Mk(e,a,i,r,o)},Mk.prototype={countsRef(e,t,n){const r=this,i=r.counts||(r.counts={}),a=Sk(t);let o,s,u;return null!=a&&(e=r.scope,o=i[a]),o?n&&n.field&&Bk(e,o.agg.params,n):(u={groupby:e.fieldRef(t,"key"),pulse:cx(r.output)},n&&n.field&&Bk(e,u,n),s=e.add(Bx(u)),o=e.add(zx({pulse:cx(s)})),o={agg:s,ref:cx(o)},null!=a&&(i[a]=o)),o.ref},tuplesRef(){return cx(this.values)},extentRef(e,t){return Ok(e,this,"extent","extent",t,!1)},domainRef(e,t){return Ok(e,this,"domain","values",t,!1)},valuesRef(e,t,n){return Ok(e,this,"vals","values",t,n||!0)},lookupRef(e,t){return Ok(e,this,"lookup","tupleindex",t,!1)},indataRef(e,t){return Ok(e,this,"indata","tupleindex",t,!0,!0)}};function Tk(e,t){const n=V_(e=ze(e)?{text:e}:e,t.config.title),r=e.encode||{},i=r.group||{},a=i.name||void 0,o=i.interactive,s=i.style,u=[],l=cx(t.add(zx(null,[{}])));return u.push(function(e,t,n,r){const i={value:0},a=e.text,o={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return Nb(o,{text:a,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:t("dx"),dy:t("dy"),fill:t("color"),font:t("font"),fontSize:t("fontSize"),fontStyle:t("fontStyle"),fontWeight:t("fontWeight"),lineHeight:t("lineHeight")},{align:t("align"),angle:t("angle"),baseline:t("baseline")}),K_({type:H_,role:Gb,style:O_,from:r,encode:o},n)}(e,n,function(e){const t=e.encode;return t&&t.title||be({name:e.name,interactive:e.interactive,style:e.style},t)}(e),l)),e.subtitle&&u.push(function(e,t,n,r){const i={value:0},a=e.subtitle,o={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return Nb(o,{text:a,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:t("dx"),dy:t("dy"),fill:t("subtitleColor"),font:t("subtitleFont"),fontSize:t("subtitleFontSize"),fontStyle:t("subtitleFontStyle"),fontWeight:t("subtitleFontWeight"),lineHeight:t("subtitleLineHeight")},{align:t("align"),angle:t("angle"),baseline:t("baseline")}),K_({type:H_,role:Vb,style:R_,from:r,encode:o},n)}(e,n,r.subtitle,l)),zk(G_({role:"title",from:l,encode:Nk(n,i),marks:u,aria:n("aria"),description:n("description"),zindex:n("zindex"),name:a,interactive:o,style:s}),t)}function Nk(e,t){const n={enter:{},update:{}};return Nb(n,{orient:e("orient"),anchor:e("anchor"),align:{signal:J_},angle:{signal:'item.orient==="left"?-90:item.orient==="right"?90:0'},limit:e("limit"),frame:e("frame"),offset:e("offset")||0,padding:e("subtitlePadding")}),Pb(n,t,N_)}function Pk(e,t){const n=[];e.transform&&e.transform.forEach((e=>{n.push(yk(e,t))})),e.on&&e.on.forEach((n=>{Rk(n,t,e.name)})),t.addDataPipeline(e.name,function(e,t,n){const r=[];let i,a,o,s,u,l=null,c=!1,d=!1;e.values?yx(e.values)||vx(e.format)?(r.push(jk(t,e)),r.push(l=Uk())):r.push(l=Uk({$ingest:e.values,$format:e.format})):e.url?vx(e.url)||vx(e.format)?(r.push(jk(t,e)),r.push(l=Uk())):r.push(l=Uk({$request:e.url,$format:e.format})):e.source&&(l=i=le(e.source).map((e=>cx(t.getData(e).output))),r.push(null));for(a=0,o=n.length;a<o;++a)s=n[a],u=s.metadata,l||u.source||r.push(l=Uk()),r.push(s),u.generates&&(d=!0),u.modifies&&!d&&(c=!0),u.source?l=s:u.changes&&(l=null);i&&(o=i.length-1,r[0]=Kx({derive:c,pulse:o?i:i[0]}),(c||o)&&r.splice(1,0,Uk()));l||r.push(Uk());return r.push(t_({})),r}(e,t,n))}function Uk(e){const t=zx({},e);return t.metadata={source:!0},t}function jk(e,t){return Ix({url:t.url?e.property(t.url):void 0,async:t.async?e.property(t.async):void 0,values:t.values?e.property(t.values):void 0,format:e.objectProperty(t.format)})}const Ik=e=>e===w_||e===__,Wk=(e,t,n)=>yx(e)?Jk(e.signal,t,n):e===k_||e===__?t:n,Hk=(e,t,n)=>yx(e)?Yk(e.signal,t,n):Ik(e)?t:n,Gk=(e,t,n)=>yx(e)?Xk(e.signal,t,n):Ik(e)?n:t,Vk=(e,t,n)=>yx(e)?Qk(e.signal,t,n):e===__?{value:t}:{value:n},Yk=(e,t,n)=>Zk(`${e} === 'top' || ${e} === 'bottom'`,t,n),Xk=(e,t,n)=>Zk(`${e} !== 'top' && ${e} !== 'bottom'`,t,n),Jk=(e,t,n)=>tA(`${e} === 'left' || ${e} === 'top'`,t,n),Qk=(e,t,n)=>tA(`${e} === 'top'`,t,n),Kk=(e,t,n)=>tA(`${e} === 'right'`,t,n),Zk=(e,t,n)=>(t=null!=t?Lb(t):t,n=null!=n?Lb(n):n,eA(t)&&eA(n)?{signal:`${e} ? (${t=t?t.signal||je(t.value):null}) : (${n=n?n.signal||je(n.value):null})`}:[be({test:e},t)].concat(n||[])),eA=e=>null==e||1===Object.keys(e).length,tA=(e,t,n)=>({signal:`${e} ? (${rA(t)}) : (${rA(n)})`}),nA=(e,t,n,r,i)=>({signal:(null!=r?`${e} === 'left' ? (${rA(r)}) : `:"")+(null!=n?`${e} === 'bottom' ? (${rA(n)}) : `:"")+(null!=i?`${e} === 'right' ? (${rA(i)}) : `:"")+(null!=t?`${e} === 'top' ? (${rA(t)}) : `:"")+"(null)"}),rA=e=>yx(e)?e.signal:null==e?null:je(e),iA=(e,t)=>{const n=e.signal;return n&&n.endsWith("(null)")?{signal:n.slice(0,-6)+t.signal}:e};function aA(e,t,n,r){let i;if(t&&Ae(t,e))return t[e];if(Ae(n,e))return n[e];if(e.startsWith("title")){switch(e){case"titleColor":i="fill";break;case"titleFont":case"titleFontSize":case"titleFontWeight":i=e[5].toLowerCase()+e.slice(6)}return r["guide-title"][i]}if(e.startsWith("label")){switch(e){case"labelColor":i="fill";break;case"labelFont":case"labelFontSize":i=e[5].toLowerCase()+e.slice(6)}return r["guide-label"][i]}return null}function oA(e){const t={};for(const n of e)if(n)for(const e in n)t[e]=1;return Object.keys(t)}function sA(e,t){return{scale:e.scale,range:t}}function uA(e,t,n,r,i){const a=V_(e,t),o=e.orient,s=e.gridScale,u=Wk(o,1,-1),l=function(e,t){if(1===t);else if(N(e)){let n=e=be({},e);for(;null!=n.mult;){if(!N(n.mult))return n.mult=yx(t)?{signal:`(${n.mult}) * (${t.signal})`}:n.mult*t,e;n=n.mult=be({},n.mult)}n.mult=t}else e=yx(t)?{signal:`(${t.signal}) * (${e||0})`}:t*(e||0);return e}(e.offset,u);let c,d,f;const h={enter:c={opacity:P_},update:f={opacity:U_},exit:d={opacity:P_}};Nb(h,{stroke:a("gridColor"),strokeCap:a("gridCap"),strokeDash:a("gridDash"),strokeDashOffset:a("gridDashOffset"),strokeOpacity:a("gridOpacity"),strokeWidth:a("gridWidth")});const p={scale:e.scale,field:M_,band:i.band,extra:i.extra,offset:i.offset,round:a("tickRound")},m=Hk(o,{signal:"height"},{signal:"width"}),g=s?{scale:s,range:0,mult:u,offset:l}:{value:0,offset:l},y=s?{scale:s,range:1,mult:u,offset:l}:be(m,{mult:u,offset:l});return c.x=f.x=Hk(o,p,g),c.y=f.y=Gk(o,p,g),c.x2=f.x2=Gk(o,y),c.y2=f.y2=Hk(o,y),d.x=Hk(o,p),d.y=Gk(o,p),K_({type:W_,role:"axis-grid",key:M_,from:r,encode:h},n)}function lA(e,t,n,r,i){return{signal:'flush(range("'+e+'"), scale("'+e+'", datum.value), '+t+","+n+","+r+","+i+")"}}function cA(e,t,n,r,i,a){const o=V_(e,t),s=e.orient,u=e.scale,l=Wk(s,-1,1),c=xx(o("labelFlush")),d=xx(o("labelFlushOffset")),f=o("labelAlign"),h=o("labelBaseline");let p,m=0===c||!!c;const g=Lb(i);g.mult=l,g.offset=Lb(o("labelPadding")||0),g.offset.mult=l;const y={scale:u,field:M_,band:.5,offset:Q_(a.offset,o("labelOffset"))},v=Hk(s,m?lA(u,c,'"left"','"right"','"center"'):{value:"center"},((e,t,n)=>yx(e)?Kk(e.signal,t,n):e===A_?{value:t}:{value:n})(s,"left","right")),b=Hk(s,Vk(s,"bottom","top"),m?lA(u,c,'"top"','"bottom"','"middle"'):{value:"middle"}),x=lA(u,c,`-(${d})`,d,0);m=m&&d;const _={opacity:P_,x:Hk(s,y,g),y:Gk(s,y,g)},k={enter:_,update:p={opacity:U_,text:{field:C_},x:_.x,y:_.y,align:v,baseline:b},exit:{opacity:P_,x:_.x,y:_.y}};Nb(k,{dx:!f&&m?Hk(s,x):null,dy:!h&&m?Gk(s,x):null}),Nb(k,{angle:o("labelAngle"),fill:o("labelColor"),fillOpacity:o("labelOpacity"),font:o("labelFont"),fontSize:o("labelFontSize"),fontWeight:o("labelFontWeight"),fontStyle:o("labelFontStyle"),limit:o("labelLimit"),lineHeight:o("labelLineHeight")},{align:f,baseline:h});const A=o("labelBound");let w=o("labelOverlap");return w=w||A?{separation:o("labelSeparation"),method:w,order:"datum.index",bound:A?{scale:u,orient:s,tolerance:A}:null}:void 0,p.align!==v&&(p.align=iA(p.align,v)),p.baseline!==b&&(p.baseline=iA(p.baseline,b)),K_({type:H_,role:"axis-label",style:S_,key:M_,from:r,encode:k,overlap:w},n)}function dA(e,t,n,r){const i=V_(e,t),a=e.orient,o=Wk(a,-1,1);let s,u;const l={enter:s={opacity:P_,anchor:Lb(i("titleAnchor",null)),align:{signal:J_}},update:u=be({},s,{opacity:U_,text:Lb(e.title)}),exit:{opacity:P_}},c={signal:`lerp(range("${e.scale}"), ${X_(0,1,.5)})`};return u.x=Hk(a,c),u.y=Gk(a,c),s.angle=Hk(a,P_,((e,t)=>0===t?0:yx(e)?{signal:`(${e.signal}) * ${t}`}:{value:e*t})(o,90)),s.baseline=Hk(a,Vk(a,w_,__),{value:w_}),u.angle=s.angle,u.baseline=s.baseline,Nb(l,{fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),angle:i("titleAngle"),baseline:i("titleBaseline")}),function(e,t,n,r){const i=(e,t)=>null!=e?(n.update[t]=iA(Lb(e),n.update[t]),!1):!Ub(t,r),a=i(e("titleX"),"x"),o=i(e("titleY"),"y");n.enter.auto=o===a?Lb(o):Hk(t,Lb(o),Lb(a))}(i,a,l,n),l.update.align=iA(l.update.align,s.align),l.update.angle=iA(l.update.angle,s.angle),l.update.baseline=iA(l.update.baseline,s.baseline),K_({type:H_,role:"axis-title",style:B_,from:r,encode:l},n)}function fA(e,t){const n=function(e,t){var n,r,i,a=t.config,o=a.style,s=a.axis,u="band"===t.scaleType(e.scale)&&a.axisBand,l=e.orient;if(yx(l)){const e=oA([a.axisX,a.axisY]),t=oA([a.axisTop,a.axisBottom,a.axisLeft,a.axisRight]);for(i of(n={},e))n[i]=Hk(l,aA(i,a.axisX,s,o),aA(i,a.axisY,s,o));for(i of(r={},t))r[i]=nA(l.signal,aA(i,a.axisTop,s,o),aA(i,a.axisBottom,s,o),aA(i,a.axisLeft,s,o),aA(i,a.axisRight,s,o))}else n=l===__||l===w_?a.axisX:a.axisY,r=a["axis"+l[0].toUpperCase()+l.slice(1)];return n||r||u?be({},s,n,r,u):s}(e,t),r=e.encode||{},i=r.axis||{},a=i.name||void 0,o=i.interactive,s=i.style,u=V_(e,n),l=function(e){const t=e("tickBand");let n,r,i=e("tickOffset");return t?t.signal?(n={signal:`(${t.signal}) === 'extent' ? 1 : 0.5`},r={signal:`(${t.signal}) === 'extent'`},N(i)||(i={signal:`(${t.signal}) === 'extent' ? 0 : ${i}`})):"extent"===t?(n=1,r=!0,i=0):(n=.5,r=!1):(n=e("bandPosition"),r=e("tickExtra")),{extra:r,band:n,offset:i}}(u),c={scale:e.scale,ticks:!!u("ticks"),labels:!!u("labels"),grid:!!u("grid"),domain:!!u("domain"),title:null!=e.title},d=cx(t.add(zx({},[c]))),f=cx(t.add(Ox({scale:t.scaleRef(e.scale),extra:t.property(l.extra),count:t.objectProperty(e.tickCount),values:t.objectProperty(e.values),minstep:t.property(e.tickMinStep),formatType:t.property(e.formatType),formatSpecifier:t.property(e.format)}))),h=[];let p;return c.grid&&h.push(uA(e,n,r.grid,f,l)),c.ticks&&(p=u("tickSize"),h.push(function(e,t,n,r,i,a){const o=V_(e,t),s=e.orient,u=Wk(s,-1,1);let l,c,d;const f={enter:l={opacity:P_},update:d={opacity:U_},exit:c={opacity:P_}};Nb(f,{stroke:o("tickColor"),strokeCap:o("tickCap"),strokeDash:o("tickDash"),strokeDashOffset:o("tickDashOffset"),strokeOpacity:o("tickOpacity"),strokeWidth:o("tickWidth")});const h=Lb(i);h.mult=u;const p={scale:e.scale,field:M_,band:a.band,extra:a.extra,offset:a.offset,round:o("tickRound")};return d.y=l.y=Hk(s,P_,p),d.y2=l.y2=Hk(s,h),c.x=Hk(s,p),d.x=l.x=Gk(s,P_,p),d.x2=l.x2=Gk(s,h),c.y=Gk(s,p),K_({type:W_,role:"axis-tick",key:M_,from:r,encode:f},n)}(e,n,r.ticks,f,p,l))),c.labels&&(p=c.ticks?p:0,h.push(cA(e,n,r.labels,f,p,l))),c.domain&&h.push(function(e,t,n,r){const i=V_(e,t),a=e.orient;let o,s;const u={enter:o={opacity:P_},update:s={opacity:U_},exit:{opacity:P_}};Nb(u,{stroke:i("domainColor"),strokeCap:i("domainCap"),strokeDash:i("domainDash"),strokeDashOffset:i("domainDashOffset"),strokeWidth:i("domainWidth"),strokeOpacity:i("domainOpacity")});const l=sA(e,0),c=sA(e,1);return o.x=s.x=Hk(a,l,P_),o.x2=s.x2=Hk(a,c),o.y=s.y=Gk(a,l,P_),o.y2=s.y2=Gk(a,c),K_({type:W_,role:"axis-domain",from:r,encode:u},n)}(e,n,r.domain,d)),c.title&&h.push(dA(e,n,r.title,d)),zk(G_({role:"axis",from:d,encode:Pb(hA(u,e),i,N_),marks:h,aria:u("aria"),description:u("description"),zindex:u("zindex"),name:a,interactive:o,style:s}),t)}function hA(e,t){const n={enter:{},update:{}};return Nb(n,{orient:e("orient"),offset:e("offset")||0,position:bx(t.position,0),titlePadding:e("titlePadding"),minExtent:e("minExtent"),maxExtent:e("maxExtent"),range:{signal:`abs(span(range("${t.scale}")))`},translate:e("translate"),format:t.format,formatType:t.formatType}),n}function pA(e,t,n){const r=le(e.signals),i=le(e.scales);return n||r.forEach((e=>ox(e,t))),le(e.projections).forEach((e=>function(e,t){const n=t.config.projection||{},r={};for(const n in e)"name"!==n&&(r[n]=x_(e[n],n,t));for(const e in n)null==r[e]&&(r[e]=x_(n[e],e,t));t.addProjection(e.name,r)}(e,t))),i.forEach((e=>function(e,t){const n=e.type||"linear";So(n)||C("Unrecognized scale type: "+je(n)),t.addScale(e.name,{type:n,domain:void 0})}(e,t))),le(e.data).forEach((e=>Pk(e,t))),i.forEach((e=>s_(e,t))),(n||r).forEach((e=>function(e,t){const n=t.getSignal(e.name);let r=e.update;e.init&&(r?C("Signals can not include both init and update expressions."):(r=e.init,n.initonly=!0)),r&&(r=bv(r,t),n.update=r.$expr,n.params=r.$params),e.on&&e.on.forEach((e=>Fx(e,t,n.id)))}(e,t))),le(e.axes).forEach((e=>fA(e,t))),le(e.marks).forEach((e=>zk(e,t))),le(e.legends).forEach((e=>$k(e,t))),e.title&&Tk(e.title,t),t.parseLambdas(),t}function mA(e,t){const n=t.config,r=cx(t.root=t.add(lx())),i=function(e,t){const n=n=>bx(e[n],t[n]),r=[gA("background",n("background")),gA("autosize",zb(n("autosize"))),gA("padding",qb(n("padding"))),gA("width",n("width")||0),gA("height",n("height")||0)],i=r.reduce(((e,t)=>(e[t.name]=t,e)),{}),a={};return le(e.signals).forEach((e=>{Ae(i,e.name)?e=be(i[e.name],e):r.push(e),a[e.name]=e})),le(t.signals).forEach((e=>{Ae(a,e.name)||Ae(i,e.name)||r.push(e)})),r}(e,n);i.forEach((e=>ox(e,t))),t.description=e.description||n.description,t.eventConfig=n.events,t.legends=t.objectProperty(n.legend&&n.legend.layout),t.locale=n.locale;const a=t.add(zx()),o=t.add(Lx(tx((e=>Pb({enter:{x:{value:0},y:{value:0}},update:{width:{signal:"width"},height:{signal:"height"}}},e))(e.encode),j_,Ib,e.style,t,{pulse:cx(a)}))),s=t.add(r_({layout:t.objectProperty(e.layout),legends:t.legends,autosize:t.signalRef("autosize"),mark:r,pulse:cx(o)}));t.operators.pop(),t.pushState(cx(o),cx(s),null),pA(e,t,i),t.operators.push(s);let u=t.add(Rx({mark:r,pulse:cx(s)}));return u=t.add(Zx({pulse:cx(u)})),u=t.add(t_({pulse:cx(u)})),t.addData("root",new Mk(t,a,a,u)),t}function gA(e,t){return t&&t.signal?{name:e,update:t.signal}:{name:e,value:t}}function yA(e,t){this.config=e||{},this.options=t||{},this.bindings=[],this.field={},this.signals={},this.lambdas={},this.scales={},this.events={},this.data={},this.streams=[],this.updates=[],this.operators=[],this.eventConfig=null,this.locale=null,this._id=0,this._subid=0,this._nextsub=[0],this._parent=[],this._encode=[],this._lookup=[],this._markpath=[]}function vA(e){this.config=e.config,this.options=e.options,this.legends=e.legends,this.field=Object.create(e.field),this.signals=Object.create(e.signals),this.lambdas=Object.create(e.lambdas),this.scales=Object.create(e.scales),this.events=Object.create(e.events),this.data=Object.create(e.data),this.streams=[],this.updates=[],this.operators=[],this._id=0,this._subid=++e._nextsub[0],this._nextsub=e._nextsub,this._parent=e._parent.slice(),this._encode=e._encode.slice(),this._lookup=e._lookup.slice(),this._markpath=e._markpath}function bA(e){return(T(e)?xA:_A)(e)}function xA(e){const t=e.length;let n="[";for(let r=0;r<t;++r){const t=e[r];n+=(r>0?",":"")+(N(t)?t.signal||bA(t):je(t))}return n+"]"}function _A(e){let t,n,r="{",i=0;for(t in e)n=e[t],r+=(++i>1?",":"")+je(t)+":"+(N(n)?n.signal||bA(n):je(n));return r+"}"}yA.prototype=vA.prototype={parse(e){return pA(e,this)},fork(){return new vA(this)},isSubscope(){return this._subid>0},toRuntime(){return this.finish(),{description:this.description,operators:this.operators,streams:this.streams,updates:this.updates,bindings:this.bindings,eventConfig:this.eventConfig,locale:this.locale}},id(){return(this._subid?this._subid+":":0)+this._id++},add(e){return this.operators.push(e),e.id=this.id(),e.refs&&(e.refs.forEach((t=>{t.$ref=e.id})),e.refs=null),e},proxy(e){const t=e instanceof sx?cx(e):e;return this.add(Qx({value:t}))},addStream(e){return this.streams.push(e),e.id=this.id(),e},addUpdate(e){return this.updates.push(e),e},finish(){let e,t;for(e in this.root&&(this.root.root=!0),this.signals)this.signals[e].signal=e;for(e in this.scales)this.scales[e].scale=e;function n(e,t,n){let r,i;e&&(r=e.data||(e.data={}),i=r[t]||(r[t]=[]),i.push(n))}for(e in this.data){t=this.data[e],n(t.input,e,"input"),n(t.output,e,"output"),n(t.values,e,"values");for(const r in t.index)n(t.index[r],e,"index:"+r)}return this},pushState(e,t,n){this._encode.push(cx(this.add(t_({pulse:e})))),this._parent.push(t),this._lookup.push(n?cx(this.proxy(n)):null),this._markpath.push(-1)},popState(){this._encode.pop(),this._parent.pop(),this._lookup.pop(),this._markpath.pop()},parent(){return W(this._parent)},encode(){return W(this._encode)},lookup(){return W(this._lookup)},markpath(){const e=this._markpath;return++e[e.length-1]},fieldRef(e,t){if(ze(e))return dx(e,t);e.signal||C("Unsupported field reference: "+je(e));const n=e.signal;let r=this.field[n];if(!r){const e={name:this.signalRef(n)};t&&(e.as=t),this.field[n]=r=cx(this.add(Px(e)))}return r},compareRef(e){let t=!1;const n=e=>yx(e)?(t=!0,this.signalRef(e.signal)):function(e){return e&&e.expr}(e)?(t=!0,this.exprRef(e.expr)):e,r=le(e.field).map(n),i=le(e.order).map(n);return t?cx(this.add($x({fields:r,orders:i}))):hx(r,i)},keyRef(e,t){let n=!1;const r=this.signals;return e=le(e).map((e=>yx(e)?(n=!0,cx(r[e.signal])):e)),n?cx(this.add(Ux({fields:e,flat:t}))):function(e,t){const n={$key:e};return t&&(n.$flat=!0),n}(e,t)},sortRef(e){if(!e)return e;const t=px(e.op,e.field),n=e.order||"ascending";return n.signal?cx(this.add($x({fields:t,orders:this.signalRef(n.signal)}))):hx(t,n)},event(e,t){const n=e+":"+t;if(!this.events[n]){const r=this.id();this.streams.push({id:r,source:e,type:t}),this.events[n]=r}return this.events[n]},hasOwnSignal(e){return Ae(this.signals,e)},addSignal(e,t){this.hasOwnSignal(e)&&C("Duplicate signal name: "+je(e));const n=t instanceof sx?t:this.add(lx(t));return this.signals[e]=n},getSignal(e){return this.signals[e]||C("Unrecognized signal name: "+je(e)),this.signals[e]},signalRef(e){return this.signals[e]?cx(this.signals[e]):(Ae(this.lambdas,e)||(this.lambdas[e]=this.add(lx(null))),cx(this.lambdas[e]))},parseLambdas(){const e=Object.keys(this.lambdas);for(let t=0,n=e.length;t<n;++t){const n=e[t],r=bv(n,this),i=this.lambdas[n];i.params=r.$params,i.update=r.$expr}},property(e){return e&&e.signal?this.signalRef(e.signal):e},objectProperty(e){return e&&N(e)?this.signalRef(e.signal||bA(e)):e},exprRef(e,t){const n={expr:bv(e,this)};return t&&(n.expr.$name=t),cx(this.add(Tx(n)))},addBinding(e,t){this.bindings||C("Nested signals do not support binding: "+je(e)),this.bindings.push(be({signal:e},t))},addScaleProj(e,t){Ae(this.scales,e)&&C("Duplicate scale or projection name: "+je(e)),this.scales[e]=this.add(t)},addScale(e,t){this.addScaleProj(e,e_(t))},addProjection(e,t){this.addScaleProj(e,Jx(t))},getScale(e){return this.scales[e]||C("Unrecognized scale name: "+je(e)),this.scales[e]},scaleRef(e){return cx(this.getScale(e))},scaleType(e){return this.getScale(e).params.type},projectionRef(e){return this.scaleRef(e)},projectionType(e){return this.scaleType(e)},addData(e,t){return Ae(this.data,e)&&C("Duplicate data set name: "+je(e)),this.data[e]=t},getData(e){return this.data[e]||C("Undefined data set name: "+je(e)),this.data[e]},addDataPipeline(e,t){return Ae(this.data,e)&&C("Duplicate data set name: "+je(e)),this.addData(e,Mk.fromEntries(this,t))}},be(Or,Qa,ah,qh,Cp,Tp,Cm,rm,Om,qm,Jm,ag);const kA=x;e.Bounds=fu,e.CanvasHandler=Ic,e.CanvasRenderer=Yc,e.DATE=et,e.DAY=tt,e.DAYOFYEAR=nt,e.Dataflow=Mr,e.Debug=4,e.Error=1,e.EventStream=pr,e.Gradient=bs,e.GroupItem=pu,e.HOURS=rt,e.Handler=Dc,e.Info=3,e.Item=hu,e.MILLISECONDS=ot,e.MINUTES=it,e.MONTH=Ke,e.Marks=lc,e.MultiPulse=wr,e.None=0,e.Operator=dr,e.Parameters=ur,e.Pulse=xr,e.QUARTER=Qe,e.RenderType=Ld,e.Renderer=Cc,e.ResourceLoader=mu,e.SECONDS=at,e.SVGHandler=Jc,e.SVGRenderer=xd,e.SVGStringRenderer=zd,e.Scenegraph=yc,e.TIME_UNITS=st,e.Transform=Br,e.View=bb,e.WEEK=Ze,e.Warn=2,e.YEAR=Je,e.accessor=_,e.accessorFields=A,e.accessorName=k,e.array=le,e.ascending=he,e.bandwidthNRD=Tr,e.bin=Nr,e.bootstrapCI=Pr,e.boundClip=Hd,e.boundContext=qu,e.boundItem=cc,e.boundMark=fc,e.boundStroke=vu,e.changeset=or,e.clampRange=ce,e.codegenExpression=Dy,e.compare=fe,e.constant=ye,e.cumulativeLogNormal=Zr,e.cumulativeNormal=Vr,e.cumulativeUniform=ai,e.dayofyear=pt,e.debounce=ve,e.defaultLocale=xn,e.definition=Rr,e.densityLogNormal=Kr,e.densityNormal=Gr,e.densityUniform=ii,e.domChild=_c,e.domClear=kc,e.domCreate=bc,e.domFind=xc,e.dotbin=Ur,e.error=C,e.expressionFunction=vv,e.extend=be,e.extent=xe,e.extentIndex=_e,e.falsy=$,e.fastmap=De,e.field=M,e.flush=Ee,e.font=tc,e.fontFamily=ec,e.fontSize=Xl,e.format=jn,e.formatLocale=fn,e.formats=In,e.hasOwnProperty=Ae,e.id=S,e.identity=B,e.inferType=$n,e.inferTypes=qn,e.ingest=er,e.inherits=Ce,e.inrange=Fe,e.interpolate=Io,e.interpolateColors=Po,e.interpolateRange=No,e.intersect=Pd,e.intersectBoxLine=Vu,e.intersectPath=Iu,e.intersectPoint=Wu,e.intersectRule=Gu,e.isArray=T,e.isBoolean=Me,e.isDate=Se,e.isFunction=de,e.isIterable=Be,e.isNumber=Oe,e.isObject=N,e.isRegExp=Re,e.isString=ze,e.isTuple=Qn,e.key=$e,e.lerp=qe,e.lineHeight=Jl,e.loader=Gn,e.locale=bn,e.logger=L,e.lruCache=Le,e.markup=hd,e.merge=Te,e.mergeConfig=U,e.multiLineOffset=Kl,e.one=R,e.pad=Pe,e.panLinear=K,e.panLog=Z,e.panPow=ee,e.panSymlog=te,e.parse=function(e,t,n){return N(e)||C("Input Vega specification must be an object."),mA(e,new yA(t=U(function(){const e="sans-serif",t="#4c78a8",n="#000",r="#888",i="#ddd";return{description:"Vega visualization",padding:0,autosize:"pad",background:null,events:{defaults:{allow:["wheel"]}},group:null,mark:null,arc:{fill:t},area:{fill:t},image:null,line:{stroke:t,strokeWidth:2},path:{stroke:t},rect:{fill:t},rule:{stroke:n},shape:{stroke:t},symbol:{fill:t,size:64},text:{fill:n,font:e,fontSize:11},trail:{fill:t,size:2},style:{"guide-label":{fill:n,font:e,fontSize:10},"guide-title":{fill:n,font:e,fontSize:11,fontWeight:"bold"},"group-title":{fill:n,font:e,fontSize:13,fontWeight:"bold"},"group-subtitle":{fill:n,font:e,fontSize:12},point:{size:30,strokeWidth:2,shape:"circle"},circle:{size:30,strokeWidth:2},square:{size:30,strokeWidth:2,shape:"square"},cell:{fill:"transparent",stroke:i}},title:{orient:"top",anchor:"middle",offset:4,subtitlePadding:3},axis:{minExtent:0,maxExtent:200,bandPosition:.5,domain:!0,domainWidth:1,domainColor:r,grid:!1,gridWidth:1,gridColor:i,labels:!0,labelAngle:0,labelLimit:180,labelOffset:0,labelPadding:2,ticks:!0,tickColor:r,tickOffset:0,tickRound:!0,tickSize:5,tickWidth:1,titlePadding:4},axisBand:{tickOffset:-.5},projection:{type:"mercator"},legend:{orient:"right",padding:0,gridAlign:"each",columnPadding:10,rowPadding:2,symbolDirection:"vertical",gradientDirection:"vertical",gradientLength:200,gradientThickness:16,gradientStrokeColor:i,gradientStrokeWidth:0,gradientLabelOffset:2,labelAlign:"left",labelBaseline:"middle",labelLimit:160,labelOffset:4,labelOverlap:!0,symbolLimit:30,symbolType:"circle",symbolSize:100,symbolOffset:0,symbolStrokeWidth:1.5,symbolBaseFillColor:"transparent",symbolBaseStrokeColor:r,titleLimit:180,titleOrient:"top",titlePadding:5,layout:{offset:18,direction:"horizontal",left:{direction:"vertical"},right:{direction:"vertical"}}},range:{category:{scheme:"tableau10"},ordinal:{scheme:"blues"},heatmap:{scheme:"yellowgreenblue"},ramp:{scheme:"blues"},diverging:{scheme:"blueorange",extent:[1,0]},symbol:["circle","square","triangle-up","cross","diamond","triangle-right","triangle-down","triangle-left"]}}}(),t,e.config),n)).toRuntime()},e.parseExpression=ky,e.parseSelector=Sb,e.pathCurves=_s,e.pathEqual=Vd,e.pathParse=ws,e.pathRectangle=Ys,e.pathRender=$s,e.pathSymbols=Ns,e.pathTrail=Xs,e.peek=W,e.point=wc,e.projection=Xh,e.quantileLogNormal=ei,e.quantileNormal=Yr,e.quantileUniform=oi,e.quantiles=qr,e.quantizeInterpolator=Uo,e.quarter=se,e.quartiles=Lr,e.randomInteger=function(t,n){let r,i,a;null==n&&(n=t,t=0);const o={min(e){return arguments.length?(r=e||0,a=i-r,o):r},max(e){return arguments.length?(i=e||0,a=i-r,o):i},sample:()=>r+Math.floor(a*e.random()),pdf:e=>e===Math.floor(e)&&e>=r&&e<i?1/a:0,cdf(e){const t=Math.floor(e);return t<r?0:t>=i?1:(t-r+1)/a},icdf:e=>e>=0&&e<=1?r-1+Math.floor(e*a):NaN};return o.min(t).max(n)},e.randomKDE=Jr,e.randomLCG=function(e){return function(){return(e=(1103515245*e+12345)%2147483647)/2147483647}},e.randomLogNormal=ti,e.randomMixture=ni,e.randomNormal=Xr,e.randomUniform=si,e.read=Hn,e.regressionExp=pi,e.regressionLinear=fi,e.regressionLoess=bi,e.regressionLog=hi,e.regressionPoly=yi,e.regressionPow=mi,e.regressionQuad=gi,e.renderModule=Nd,e.repeat=Ne,e.resetDefaultLocale=function(){return cn(),mn(),xn()},e.resetSVGClipId=cu,e.resetSVGDefIds=function(){cu(),ps=0},e.responseType=Wn,e.runtimeContext=Fv,e.sampleCurve=Ai,e.sampleLogNormal=Qr,e.sampleNormal=Hr,e.sampleUniform=ri,e.scale=Mo,e.sceneEqual=Gd,e.sceneFromJSON=mc,e.scenePickVisit=il,e.sceneToJSON=pc,e.sceneVisit=rl,e.sceneZOrder=nl,e.scheme=Vo,e.serializeXML=pd,e.setRandom=function(t){e.random=t},e.span=Ue,e.splitAccessPath=F,e.stringValue=je,e.textMetrics=Il,e.timeBin=an,e.timeFloor=St,e.timeFormatLocale=yn,e.timeInterval=qt,e.timeOffset=Nt,e.timeSequence=jt,e.timeUnitSpecifier=dt,e.timeUnits=lt,e.toBoolean=Ie,e.toDate=He,e.toNumber=H,e.toSet=Ve,e.toString=Ge,e.transform=zr,e.transforms=Or,e.truncate=Ye,e.truthy=z,e.tupleid=Kn,e.typeParsers=On,e.utcFloor=Rt,e.utcInterval=Lt,e.utcOffset=Pt,e.utcSequence=It,e.utcdayofyear=xt,e.utcquarter=ue,e.utcweek=_t,e.version=kA,e.visitArray=Xe,e.week=mt,e.writeConfig=j,e.zero=O,e.zoomLinear=re,e.zoomLog=ie,e.zoomPow=ae,e.zoomSymlog=oe,Object.defineProperty(e,"__esModule",{value:!0})}));

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega'), require('vega-lite')) :
    typeof define === 'function' && define.amd ? define(['vega', 'vega-lite'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vegaEmbed = factory(global.vega, global.vegaLite));
})(this, (function (vegaImport, vegaLiteImport) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var vegaImport__namespace = /*#__PURE__*/_interopNamespace(vegaImport);
    var vegaLiteImport__namespace = /*#__PURE__*/_interopNamespace(vegaLiteImport);

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017 Joachim Wester
     * MIT license
     */
    var __extends = undefined && undefined.__extends || function () {
      var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };

        return extendStatics(d, b);
      };

      return function (d, b) {
        extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwnProperty(obj, key) {
      return _hasOwnProperty.call(obj, key);
    }
    function _objectKeys(obj) {
      if (Array.isArray(obj)) {
        var keys = new Array(obj.length);

        for (var k = 0; k < keys.length; k++) {
          keys[k] = "" + k;
        }

        return keys;
      }

      if (Object.keys) {
        return Object.keys(obj);
      }

      var keys = [];

      for (var i in obj) {
        if (hasOwnProperty(obj, i)) {
          keys.push(i);
        }
      }

      return keys;
    }
    /**
    * Deeply clone the object.
    * https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
    * @param  {any} obj value to clone
    * @return {any} cloned obj
    */

    function _deepClone(obj) {
      switch (typeof obj) {
        case "object":
          return JSON.parse(JSON.stringify(obj));
        //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5

        case "undefined":
          return null;
        //this is how JSON.stringify behaves for array items

        default:
          return obj;
        //no need to clone primitives
      }
    } //3x faster than cached /^\d+$/.test(str)

    function isInteger(str) {
      var i = 0;
      var len = str.length;
      var charCode;

      while (i < len) {
        charCode = str.charCodeAt(i);

        if (charCode >= 48 && charCode <= 57) {
          i++;
          continue;
        }

        return false;
      }

      return true;
    }
    /**
    * Escapes a json pointer path
    * @param path The raw pointer
    * @return the Escaped path
    */

    function escapePathComponent(path) {
      if (path.indexOf('/') === -1 && path.indexOf('~') === -1) return path;
      return path.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    /**
     * Unescapes a json pointer path
     * @param path The escaped pointer
     * @return The unescaped path
     */

    function unescapePathComponent(path) {
      return path.replace(/~1/g, '/').replace(/~0/g, '~');
    }
    /**
    * Recursively checks whether an object has any undefined values inside.
    */

    function hasUndefined(obj) {
      if (obj === undefined) {
        return true;
      }

      if (obj) {
        if (Array.isArray(obj)) {
          for (var i = 0, len = obj.length; i < len; i++) {
            if (hasUndefined(obj[i])) {
              return true;
            }
          }
        } else if (typeof obj === "object") {
          var objKeys = _objectKeys(obj);

          var objKeysLength = objKeys.length;

          for (var i = 0; i < objKeysLength; i++) {
            if (hasUndefined(obj[objKeys[i]])) {
              return true;
            }
          }
        }
      }

      return false;
    }

    function patchErrorMessageFormatter(message, args) {
      var messageParts = [message];

      for (var key in args) {
        var value = typeof args[key] === 'object' ? JSON.stringify(args[key], null, 2) : args[key]; // pretty print

        if (typeof value !== 'undefined') {
          messageParts.push(key + ": " + value);
        }
      }

      return messageParts.join('\n');
    }

    var PatchError =
    /** @class */
    function (_super) {
      __extends(PatchError, _super);

      function PatchError(message, name, index, operation, tree) {
        var _newTarget = this.constructor;

        var _this = _super.call(this, patchErrorMessageFormatter(message, {
          name: name,
          index: index,
          operation: operation,
          tree: tree
        })) || this;

        _this.name = name;
        _this.index = index;
        _this.operation = operation;
        _this.tree = tree;
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain, see https://stackoverflow.com/a/48342359

        _this.message = patchErrorMessageFormatter(message, {
          name: name,
          index: index,
          operation: operation,
          tree: tree
        });
        return _this;
      }

      return PatchError;
    }(Error);

    var JsonPatchError = PatchError;
    var deepClone = _deepClone;
    /* We use a Javascript hash to store each
     function. Each hash entry (property) uses
     the operation identifiers specified in rfc6902.
     In this way, we can map each patch operation
     to its dedicated function in efficient way.
     */

    /* The operations applicable to an object */

    var objOps = {
      add: function (obj, key, document) {
        obj[key] = this.value;
        return {
          newDocument: document
        };
      },
      remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return {
          newDocument: document,
          removed: removed
        };
      },
      replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return {
          newDocument: document,
          removed: removed
        };
      },
      move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        var removed = getValueByPointer(document, this.path);

        if (removed) {
          removed = _deepClone(removed);
        }

        var originalValue = applyOperation(document, {
          op: "remove",
          path: this.from
        }).removed;
        applyOperation(document, {
          op: "add",
          path: this.path,
          value: originalValue
        });
        return {
          newDocument: document,
          removed: removed
        };
      },
      copy: function (obj, key, document) {
        var valueToCopy = getValueByPointer(document, this.from); // enforce copy by value so further operations don't affect source (see issue #177)

        applyOperation(document, {
          op: "add",
          path: this.path,
          value: _deepClone(valueToCopy)
        });
        return {
          newDocument: document
        };
      },
      test: function (obj, key, document) {
        return {
          newDocument: document,
          test: _areEquals(obj[key], this.value)
        };
      },
      _get: function (obj, key, document) {
        this.value = obj[key];
        return {
          newDocument: document
        };
      }
    };
    /* The operations applicable to an array. Many are the same as for the object */

    var arrOps = {
      add: function (arr, i, document) {
        if (isInteger(i)) {
          arr.splice(i, 0, this.value);
        } else {
          // array props
          arr[i] = this.value;
        } // this may be needed when using '-' in an array


        return {
          newDocument: document,
          index: i
        };
      },
      remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return {
          newDocument: document,
          removed: removedList[0]
        };
      },
      replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return {
          newDocument: document,
          removed: removed
        };
      },
      move: objOps.move,
      copy: objOps.copy,
      test: objOps.test,
      _get: objOps._get
    };
    /**
     * Retrieves a value from a JSON document by a JSON pointer.
     * Returns the value.
     *
     * @param document The document to get the value from
     * @param pointer an escaped JSON pointer
     * @return The retrieved value
     */

    function getValueByPointer(document, pointer) {
      if (pointer == '') {
        return document;
      }

      var getOriginalDestination = {
        op: "_get",
        path: pointer
      };
      applyOperation(document, getOriginalDestination);
      return getOriginalDestination.value;
    }
    /**
     * Apply a single JSON Patch Operation on a JSON document.
     * Returns the {newDocument, result} of the operation.
     * It modifies the `document` and `operation` objects - it gets the values by reference.
     * If you would like to avoid touching your values, clone them:
     * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
     *
     * @param document The document to patch
     * @param operation The operation to apply
     * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
     * @param mutateDocument Whether to mutate the original document or clone it before applying
     * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
     * @return `{newDocument, result}` after the operation
     */

    function applyOperation(document, operation, validateOperation, mutateDocument, banPrototypeModifications, index) {
      if (validateOperation === void 0) {
        validateOperation = false;
      }

      if (mutateDocument === void 0) {
        mutateDocument = true;
      }

      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }

      if (index === void 0) {
        index = 0;
      }

      if (validateOperation) {
        if (typeof validateOperation == 'function') {
          validateOperation(operation, 0, document, operation.path);
        } else {
          validator(operation, 0);
        }
      }
      /* ROOT OPERATIONS */


      if (operation.path === "") {
        var returnValue = {
          newDocument: document
        };

        if (operation.op === 'add') {
          returnValue.newDocument = operation.value;
          return returnValue;
        } else if (operation.op === 'replace') {
          returnValue.newDocument = operation.value;
          returnValue.removed = document; //document we removed

          return returnValue;
        } else if (operation.op === 'move' || operation.op === 'copy') {
          // it's a move or copy to root
          returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field

          if (operation.op === 'move') {
            // report removed item
            returnValue.removed = document;
          }

          return returnValue;
        } else if (operation.op === 'test') {
          returnValue.test = _areEquals(document, operation.value);

          if (returnValue.test === false) {
            throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
          }

          returnValue.newDocument = document;
          return returnValue;
        } else if (operation.op === 'remove') {
          // a remove on root
          returnValue.removed = document;
          returnValue.newDocument = null;
          return returnValue;
        } else if (operation.op === '_get') {
          operation.value = document;
          return returnValue;
        } else {
          /* bad operation */
          if (validateOperation) {
            throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
          } else {
            return returnValue;
          }
        }
      }
      /* END ROOT OPERATIONS */
      else {
        if (!mutateDocument) {
          document = _deepClone(document);
        }

        var path = operation.path || "";
        var keys = path.split('/');
        var obj = document;
        var t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift

        var len = keys.length;
        var existingPathFragment = undefined;
        var key = void 0;
        var validateFunction = void 0;

        if (typeof validateOperation == 'function') {
          validateFunction = validateOperation;
        } else {
          validateFunction = validator;
        }

        while (true) {
          key = keys[t];

          if (key && key.indexOf('~') != -1) {
            key = unescapePathComponent(key);
          }

          if (banPrototypeModifications && key == '__proto__') {
            throw new TypeError('JSON-Patch: modifying `__proto__` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README');
          }

          if (validateOperation) {
            if (existingPathFragment === undefined) {
              if (obj[key] === undefined) {
                existingPathFragment = keys.slice(0, t).join('/');
              } else if (t == len - 1) {
                existingPathFragment = operation.path;
              }

              if (existingPathFragment !== undefined) {
                validateFunction(operation, 0, document, existingPathFragment);
              }
            }
          }

          t++;

          if (Array.isArray(obj)) {
            if (key === '-') {
              key = obj.length;
            } else {
              if (validateOperation && !isInteger(key)) {
                throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
              } // only parse key when it's an integer for `arr.prop` to work
              else if (isInteger(key)) {
                key = ~~key;
              }
            }

            if (t >= len) {
              if (validateOperation && operation.op === "add" && key > obj.length) {
                throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
              }

              var returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch

              if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
              }

              return returnValue;
            }
          } else {
            if (t >= len) {
              var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch

              if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
              }

              return returnValue;
            }
          }

          obj = obj[key]; // If we have more keys in the path, but the next value isn't a non-null object,
          // throw an OPERATION_PATH_UNRESOLVABLE error instead of iterating again.

          if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
            throw new JsonPatchError('Cannot perform operation at the desired path', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
          }
        }
      }
    }
    /**
     * Apply a full JSON Patch array on a JSON document.
     * Returns the {newDocument, result} of the patch.
     * It modifies the `document` object and `patch` - it gets the values by reference.
     * If you would like to avoid touching your values, clone them:
     * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
     *
     * @param document The document to patch
     * @param patch The patch to apply
     * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
     * @param mutateDocument Whether to mutate the original document or clone it before applying
     * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
     * @return An array of `{newDocument, result}` after the patch
     */

    function applyPatch(document, patch, validateOperation, mutateDocument, banPrototypeModifications) {
      if (mutateDocument === void 0) {
        mutateDocument = true;
      }

      if (banPrototypeModifications === void 0) {
        banPrototypeModifications = true;
      }

      if (validateOperation) {
        if (!Array.isArray(patch)) {
          throw new JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
      }

      if (!mutateDocument) {
        document = _deepClone(document);
      }

      var results = new Array(patch.length);

      for (var i = 0, length_1 = patch.length; i < length_1; i++) {
        // we don't need to pass mutateDocument argument because if it was true, we already deep cloned the object, we'll just pass `true`
        results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
        document = results[i].newDocument; // in case root was replaced
      }

      results.newDocument = document;
      return results;
    }
    /**
     * Apply a single JSON Patch Operation on a JSON document.
     * Returns the updated document.
     * Suitable as a reducer.
     *
     * @param document The document to patch
     * @param operation The operation to apply
     * @return The updated document
     */

    function applyReducer(document, operation, index) {
      var operationResult = applyOperation(document, operation);

      if (operationResult.test === false) {
        // failed test
        throw new JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', index, operation, document);
      }

      return operationResult.newDocument;
    }
    /**
     * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
     * @param {object} operation - operation object (patch)
     * @param {number} index - index of operation in the sequence
     * @param {object} [document] - object where the operation is supposed to be applied
     * @param {string} [existingPathFragment] - comes along with `document`
     */

    function validator(operation, index, document, existingPathFragment) {
      if (typeof operation !== 'object' || operation === null || Array.isArray(operation)) {
        throw new JsonPatchError('Operation is not an object', 'OPERATION_NOT_AN_OBJECT', index, operation, document);
      } else if (!objOps[operation.op]) {
        throw new JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
      } else if (typeof operation.path !== 'string') {
        throw new JsonPatchError('Operation `path` property is not a string', 'OPERATION_PATH_INVALID', index, operation, document);
      } else if (operation.path.indexOf('/') !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new JsonPatchError('Operation `path` property must start with "/"', 'OPERATION_PATH_INVALID', index, operation, document);
      } else if ((operation.op === 'move' || operation.op === 'copy') && typeof operation.from !== 'string') {
        throw new JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)', 'OPERATION_FROM_REQUIRED', index, operation, document);
      } else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && operation.value === undefined) {
        throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_REQUIRED', index, operation, document);
      } else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && hasUndefined(operation.value)) {
        throw new JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED', index, operation, document);
      } else if (document) {
        if (operation.op == "add") {
          var pathLen = operation.path.split("/").length;
          var existingPathLen = existingPathFragment.split("/").length;

          if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
            throw new JsonPatchError('Cannot perform an `add` operation at the desired path', 'OPERATION_PATH_CANNOT_ADD', index, operation, document);
          }
        } else if (operation.op === 'replace' || operation.op === 'remove' || operation.op === '_get') {
          if (operation.path !== existingPathFragment) {
            throw new JsonPatchError('Cannot perform the operation at a path that does not exist', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
          }
        } else if (operation.op === 'move' || operation.op === 'copy') {
          var existingValue = {
            op: "_get",
            path: operation.from,
            value: undefined
          };
          var error = validate([existingValue], document);

          if (error && error.name === 'OPERATION_PATH_UNRESOLVABLE') {
            throw new JsonPatchError('Cannot perform the operation from a path that does not exist', 'OPERATION_FROM_UNRESOLVABLE', index, operation, document);
          }
        }
      }
    }
    /**
     * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
     * If error is encountered, returns a JsonPatchError object
     * @param sequence
     * @param document
     * @returns {JsonPatchError|undefined}
     */

    function validate(sequence, document, externalValidator) {
      try {
        if (!Array.isArray(sequence)) {
          throw new JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }

        if (document) {
          //clone document and sequence so that we can safely try applying operations
          applyPatch(_deepClone(document), _deepClone(sequence), externalValidator || true);
        } else {
          externalValidator = externalValidator || validator;

          for (var i = 0; i < sequence.length; i++) {
            externalValidator(sequence[i], i, document, undefined);
          }
        }
      } catch (e) {
        if (e instanceof JsonPatchError) {
          return e;
        } else {
          throw e;
        }
      }
    } // based on https://github.com/epoberezkin/fast-deep-equal
    // MIT License
    // Copyright (c) 2017 Evgeny Poberezkin
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    // The above copyright notice and this permission notice shall be included in all
    // copies or substantial portions of the Software.
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    // SOFTWARE.

    function _areEquals(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == 'object' && typeof b == 'object') {
        var arrA = Array.isArray(a),
            arrB = Array.isArray(b),
            i,
            length,
            key;

        if (arrA && arrB) {
          length = a.length;
          if (length != b.length) return false;

          for (i = length; i-- !== 0;) if (!_areEquals(a[i], b[i])) return false;

          return true;
        }

        if (arrA != arrB) return false;
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0;) if (!b.hasOwnProperty(keys[i])) return false;

        for (i = length; i-- !== 0;) {
          key = keys[i];
          if (!_areEquals(a[key], b[key])) return false;
        }

        return true;
      }

      return a !== a && b !== b;
    }

    var core = /*#__PURE__*/Object.freeze({
        __proto__: null,
        JsonPatchError: JsonPatchError,
        deepClone: deepClone,
        getValueByPointer: getValueByPointer,
        applyOperation: applyOperation,
        applyPatch: applyPatch,
        applyReducer: applyReducer,
        validator: validator,
        validate: validate,
        _areEquals: _areEquals
    });

    /*!
     * https://github.com/Starcounter-Jack/JSON-Patch
     * (c) 2017 Joachim Wester
     * MIT license
     */
    var beforeDict = new WeakMap();

    var Mirror =
    /** @class */
    function () {
      function Mirror(obj) {
        this.observers = new Map();
        this.obj = obj;
      }

      return Mirror;
    }();

    var ObserverInfo =
    /** @class */
    function () {
      function ObserverInfo(callback, observer) {
        this.callback = callback;
        this.observer = observer;
      }

      return ObserverInfo;
    }();

    function getMirror(obj) {
      return beforeDict.get(obj);
    }

    function getObserverFromMirror(mirror, callback) {
      return mirror.observers.get(callback);
    }

    function removeObserverFromMirror(mirror, observer) {
      mirror.observers.delete(observer.callback);
    }
    /**
     * Detach an observer from an object
     */


    function unobserve(root, observer) {
      observer.unobserve();
    }
    /**
     * Observes changes made to an object, which can then be retrieved using generate
     */

    function observe(obj, callback) {
      var patches = [];
      var observer;
      var mirror = getMirror(obj);

      if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.set(obj, mirror);
      } else {
        var observerInfo = getObserverFromMirror(mirror, callback);
        observer = observerInfo && observerInfo.observer;
      }

      if (observer) {
        return observer;
      }

      observer = {};
      mirror.value = _deepClone(obj);

      if (callback) {
        observer.callback = callback;
        observer.next = null;

        var dirtyCheck = function () {
          generate(observer);
        };

        var fastCheck = function () {
          clearTimeout(observer.next);
          observer.next = setTimeout(dirtyCheck);
        };

        if (typeof window !== 'undefined') {
          //not Node
          window.addEventListener('mouseup', fastCheck);
          window.addEventListener('keyup', fastCheck);
          window.addEventListener('mousedown', fastCheck);
          window.addEventListener('keydown', fastCheck);
          window.addEventListener('change', fastCheck);
        }
      }

      observer.patches = patches;
      observer.object = obj;

      observer.unobserve = function () {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);

        if (typeof window !== 'undefined') {
          window.removeEventListener('mouseup', fastCheck);
          window.removeEventListener('keyup', fastCheck);
          window.removeEventListener('mousedown', fastCheck);
          window.removeEventListener('keydown', fastCheck);
          window.removeEventListener('change', fastCheck);
        }
      };

      mirror.observers.set(callback, new ObserverInfo(callback, observer));
      return observer;
    }
    /**
     * Generate an array of patches from an observer
     */

    function generate(observer, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }

      var mirror = beforeDict.get(observer.object);

      _generate(mirror.value, observer.object, observer.patches, "", invertible);

      if (observer.patches.length) {
        applyPatch(mirror.value, observer.patches);
      }

      var temp = observer.patches;

      if (temp.length > 0) {
        observer.patches = [];

        if (observer.callback) {
          observer.callback(temp);
        }
      }

      return temp;
    } // Dirty check if obj is different from mirror, generate patches and update mirror

    function _generate(mirror, obj, patches, path, invertible) {
      if (obj === mirror) {
        return;
      }

      if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
      }

      var newKeys = _objectKeys(obj);

      var oldKeys = _objectKeys(mirror);
      var deleted = false; //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"

      for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];

        if (hasOwnProperty(obj, key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
          var newVal = obj[key];

          if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null && Array.isArray(oldVal) === Array.isArray(newVal)) {
            _generate(oldVal, newVal, patches, path + "/" + escapePathComponent(key), invertible);
          } else {
            if (oldVal !== newVal) {

              if (invertible) {
                patches.push({
                  op: "test",
                  path: path + "/" + escapePathComponent(key),
                  value: _deepClone(oldVal)
                });
              }

              patches.push({
                op: "replace",
                path: path + "/" + escapePathComponent(key),
                value: _deepClone(newVal)
              });
            }
          }
        } else if (Array.isArray(mirror) === Array.isArray(obj)) {
          if (invertible) {
            patches.push({
              op: "test",
              path: path + "/" + escapePathComponent(key),
              value: _deepClone(oldVal)
            });
          }

          patches.push({
            op: "remove",
            path: path + "/" + escapePathComponent(key)
          });
          deleted = true; // property has been deleted
        } else {
          if (invertible) {
            patches.push({
              op: "test",
              path: path,
              value: mirror
            });
          }

          patches.push({
            op: "replace",
            path: path,
            value: obj
          });
        }
      }

      if (!deleted && newKeys.length == oldKeys.length) {
        return;
      }

      for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];

        if (!hasOwnProperty(mirror, key) && obj[key] !== undefined) {
          patches.push({
            op: "add",
            path: path + "/" + escapePathComponent(key),
            value: _deepClone(obj[key])
          });
        }
      }
    }
    /**
     * Create an array of patches from the differences in two objects
     */


    function compare$7(tree1, tree2, invertible) {
      if (invertible === void 0) {
        invertible = false;
      }

      var patches = [];

      _generate(tree1, tree2, patches, '', invertible);

      return patches;
    }

    var duplex = /*#__PURE__*/Object.freeze({
        __proto__: null,
        unobserve: unobserve,
        observe: observe,
        generate: generate,
        compare: compare$7
    });

    Object.assign({}, core, duplex, {
      JsonPatchError: PatchError,
      deepClone: _deepClone,
      escapePathComponent,
      unescapePathComponent
    });

    // working on the output of `JSON.stringify` we know that only valid strings
    // are present (unless the user supplied a weird `options.indent` but in
    // that case we don’t care since the output would be invalid anyway).


    var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

    var jsonStringifyPrettyCompact = function stringify(passedObj, options) {
      var indent, maxLength, replacer;
      options = options || {};
      indent = JSON.stringify([1], undefined, options.indent === undefined ? 2 : options.indent).slice(2, -3);
      maxLength = indent === "" ? Infinity : options.maxLength === undefined ? 80 : options.maxLength;
      replacer = options.replacer;
      return function _stringify(obj, currentIndent, reserved) {
        // prettier-ignore
        var end, index, items, key, keyPart, keys, length, nextIndent, prettified, start, string, value;

        if (obj && typeof obj.toJSON === "function") {
          obj = obj.toJSON();
        }

        string = JSON.stringify(obj, replacer);

        if (string === undefined) {
          return string;
        }

        length = maxLength - currentIndent.length - reserved;

        if (string.length <= length) {
          prettified = string.replace(stringOrChar, function (match, stringLiteral) {
            return stringLiteral || match + " ";
          });

          if (prettified.length <= length) {
            return prettified;
          }
        }

        if (replacer != null) {
          obj = JSON.parse(string);
          replacer = undefined;
        }

        if (typeof obj === "object" && obj !== null) {
          nextIndent = currentIndent + indent;
          items = [];
          index = 0;

          if (Array.isArray(obj)) {
            start = "[";
            end = "]";
            length = obj.length;

            for (; index < length; index++) {
              items.push(_stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) || "null");
            }
          } else {
            start = "{";
            end = "}";
            keys = Object.keys(obj);
            length = keys.length;

            for (; index < length; index++) {
              key = keys[index];
              keyPart = JSON.stringify(key) + ": ";
              value = _stringify(obj[key], nextIndent, keyPart.length + (index === length - 1 ? 0 : 1));

              if (value !== undefined) {
                items.push(keyPart + value);
              }
            }
          }

          if (items.length > 0) {
            return [start, indent + items.join(",\n" + nextIndent), end].join("\n" + currentIndent);
          }
        }

        return string;
      }(passedObj, "", 0);
    };

    var yallist = Yallist$1;
    Yallist$1.Node = Node;
    Yallist$1.create = Yallist$1;

    function Yallist$1(list) {
      var self = this;

      if (!(self instanceof Yallist$1)) {
        self = new Yallist$1();
      }

      self.tail = null;
      self.head = null;
      self.length = 0;

      if (list && typeof list.forEach === 'function') {
        list.forEach(function (item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }

      return self;
    }

    Yallist$1.prototype.removeNode = function (node) {
      if (node.list !== this) {
        throw new Error('removing node which does not belong to this list');
      }

      var next = node.next;
      var prev = node.prev;

      if (next) {
        next.prev = prev;
      }

      if (prev) {
        prev.next = next;
      }

      if (node === this.head) {
        this.head = next;
      }

      if (node === this.tail) {
        this.tail = prev;
      }

      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };

    Yallist$1.prototype.unshiftNode = function (node) {
      if (node === this.head) {
        return;
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var head = this.head;
      node.list = this;
      node.next = head;

      if (head) {
        head.prev = node;
      }

      this.head = node;

      if (!this.tail) {
        this.tail = node;
      }

      this.length++;
    };

    Yallist$1.prototype.pushNode = function (node) {
      if (node === this.tail) {
        return;
      }

      if (node.list) {
        node.list.removeNode(node);
      }

      var tail = this.tail;
      node.list = this;
      node.prev = tail;

      if (tail) {
        tail.next = node;
      }

      this.tail = node;

      if (!this.head) {
        this.head = node;
      }

      this.length++;
    };

    Yallist$1.prototype.push = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }

      return this.length;
    };

    Yallist$1.prototype.unshift = function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }

      return this.length;
    };

    Yallist$1.prototype.pop = function () {
      if (!this.tail) {
        return undefined;
      }

      var res = this.tail.value;
      this.tail = this.tail.prev;

      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }

      this.length--;
      return res;
    };

    Yallist$1.prototype.shift = function () {
      if (!this.head) {
        return undefined;
      }

      var res = this.head.value;
      this.head = this.head.next;

      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }

      this.length--;
      return res;
    };

    Yallist$1.prototype.forEach = function (fn, thisp) {
      thisp = thisp || this;

      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };

    Yallist$1.prototype.forEachReverse = function (fn, thisp) {
      thisp = thisp || this;

      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };

    Yallist$1.prototype.get = function (n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.next;
      }

      if (i === n && walker !== null) {
        return walker.value;
      }
    };

    Yallist$1.prototype.getReverse = function (n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        // abort out of the list early if we hit a cycle
        walker = walker.prev;
      }

      if (i === n && walker !== null) {
        return walker.value;
      }
    };

    Yallist$1.prototype.map = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();

      for (var walker = this.head; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }

      return res;
    };

    Yallist$1.prototype.mapReverse = function (fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist$1();

      for (var walker = this.tail; walker !== null;) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }

      return res;
    };

    Yallist$1.prototype.reduce = function (fn, initial) {
      var acc;
      var walker = this.head;

      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value');
      }

      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }

      return acc;
    };

    Yallist$1.prototype.reduceReverse = function (fn, initial) {
      var acc;
      var walker = this.tail;

      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError('Reduce of empty list with no initial value');
      }

      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }

      return acc;
    };

    Yallist$1.prototype.toArray = function () {
      var arr = new Array(this.length);

      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }

      return arr;
    };

    Yallist$1.prototype.toArrayReverse = function () {
      var arr = new Array(this.length);

      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }

      return arr;
    };

    Yallist$1.prototype.slice = function (from, to) {
      to = to || this.length;

      if (to < 0) {
        to += this.length;
      }

      from = from || 0;

      if (from < 0) {
        from += this.length;
      }

      var ret = new Yallist$1();

      if (to < from || to < 0) {
        return ret;
      }

      if (from < 0) {
        from = 0;
      }

      if (to > this.length) {
        to = this.length;
      }

      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }

      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }

      return ret;
    };

    Yallist$1.prototype.sliceReverse = function (from, to) {
      to = to || this.length;

      if (to < 0) {
        to += this.length;
      }

      from = from || 0;

      if (from < 0) {
        from += this.length;
      }

      var ret = new Yallist$1();

      if (to < from || to < 0) {
        return ret;
      }

      if (from < 0) {
        from = 0;
      }

      if (to > this.length) {
        to = this.length;
      }

      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }

      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }

      return ret;
    };

    Yallist$1.prototype.splice = function (start, deleteCount) {
      if (start > this.length) {
        start = this.length - 1;
      }

      if (start < 0) {
        start = this.length + start;
      }

      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }

      var ret = [];

      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }

      if (walker === null) {
        walker = this.tail;
      }

      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }

      for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
        walker = insert(this, walker, i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2]);
      }

      return ret;
    };

    Yallist$1.prototype.reverse = function () {
      var head = this.head;
      var tail = this.tail;

      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }

      this.head = tail;
      this.tail = head;
      return this;
    };

    function insert(self, node, value) {
      var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);

      if (inserted.next === null) {
        self.tail = inserted;
      }

      if (inserted.prev === null) {
        self.head = inserted;
      }

      self.length++;
      return inserted;
    }

    function push(self, item) {
      self.tail = new Node(item, self.tail, null, self);

      if (!self.head) {
        self.head = self.tail;
      }

      self.length++;
    }

    function unshift(self, item) {
      self.head = new Node(item, null, self.head, self);

      if (!self.tail) {
        self.tail = self.head;
      }

      self.length++;
    }

    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }

      this.list = list;
      this.value = value;

      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }

      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }

    try {
      // add if support for Symbol.iterator is present
      require('./iterator.js')(Yallist$1);
    } catch (er) {}

    const Yallist = yallist;
    const MAX = Symbol('max');
    const LENGTH = Symbol('length');
    const LENGTH_CALCULATOR = Symbol('lengthCalculator');
    const ALLOW_STALE = Symbol('allowStale');
    const MAX_AGE = Symbol('maxAge');
    const DISPOSE = Symbol('dispose');
    const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
    const LRU_LIST = Symbol('lruList');
    const CACHE = Symbol('cache');
    const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

    const naiveLength = () => 1; // lruList is a yallist where the head is the youngest
    // item, and the tail is the oldest.  the list contains the Hit
    // objects as the entries.
    // Each Hit object has a reference to its Yallist.Node.  This
    // never changes.
    //
    // cache is a Map (or PseudoMap) that matches the keys to
    // the Yallist.Node object.


    class LRUCache {
      constructor(options) {
        if (typeof options === 'number') options = {
          max: options
        };
        if (!options) options = {};
        if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

        this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      } // resize the cache when the max changes.


      set max(mL) {
        if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
        this[MAX] = mL || Infinity;
        trim(this);
      }

      get max() {
        return this[MAX];
      }

      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }

      get allowStale() {
        return this[ALLOW_STALE];
      }

      set maxAge(mA) {
        if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
        this[MAX_AGE] = mA;
        trim(this);
      }

      get maxAge() {
        return this[MAX_AGE];
      } // resize the cache when the lengthCalculator changes.


      set lengthCalculator(lC) {
        if (typeof lC !== 'function') lC = naiveLength;

        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach(hit => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }

        trim(this);
      }

      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }

      get length() {
        return this[LENGTH];
      }

      get itemCount() {
        return this[LRU_LIST].length;
      }

      rforEach(fn, thisp) {
        thisp = thisp || this;

        for (let walker = this[LRU_LIST].tail; walker !== null;) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }

      forEach(fn, thisp) {
        thisp = thisp || this;

        for (let walker = this[LRU_LIST].head; walker !== null;) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }

      keys() {
        return this[LRU_LIST].toArray().map(k => k.key);
      }

      values() {
        return this[LRU_LIST].toArray().map(k => k.value);
      }

      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
        }

        this[CACHE] = new Map(); // hash of items by key

        this[LRU_LIST] = new Yallist(); // list of items in order of use recency

        this[LENGTH] = 0; // length of items in the list
      }

      dump() {
        return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter(h => h);
      }

      dumpLru() {
        return this[LRU_LIST];
      }

      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);

        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }

          const node = this[CACHE].get(key);
          const item = node.value; // dispose of the old one before overwriting
          // split out into 2 ifs for better coverage tracking

          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
          }

          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }

        const hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

        if (hit.length > this[MAX]) {
          if (this[DISPOSE]) this[DISPOSE](key, value);
          return false;
        }

        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }

      has(key) {
        if (!this[CACHE].has(key)) return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }

      get(key) {
        return get(this, key, true);
      }

      peek(key) {
        return get(this, key, false);
      }

      pop() {
        const node = this[LRU_LIST].tail;
        if (!node) return null;
        del(this, node);
        return node.value;
      }

      del(key) {
        del(this, this[CACHE].get(key));
      }

      load(arr) {
        // reset the cache
        this.reset();
        const now = Date.now(); // A previous serialized cache has the most recent items first

        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0) // the item was created without expiration in a non aged cache
            this.set(hit.k, hit.v);else {
            const maxAge = expiresAt - now; // dont add already expired items

            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }

      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }

    }

    const get = (self, key, doUse) => {
      const node = self[CACHE].get(key);

      if (node) {
        const hit = node.value;

        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE]) return undefined;
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }

        return hit.value;
      }
    };

    const isStale = (self, hit) => {
      if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
    };

    const trim = self => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
          // We know that we're about to delete this one, and also
          // what the next least recently used key will be, so just
          // go ahead and set it now.
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };

    const del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };

    class Entry {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }

    }

    const forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;

      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE]) hit = undefined;
      }

      if (hit) fn.call(thisp, hit.value, hit.key, self);
    };

    var lruCache = LRUCache;

    // obj with keys in a consistent order.

    const opts = ['includePrerelease', 'loose', 'rtl'];

    const parseOptions$3 = options => !options ? {} : typeof options !== 'object' ? {
      loose: true
    } : opts.filter(k => options[k]).reduce((options, k) => {
      options[k] = true;
      return options;
    }, {});

    var parseOptions_1 = parseOptions$3;

    var re$3 = {exports: {}};

    // Not necessarily the package version of this code.

    const SEMVER_SPEC_VERSION = '2.0.0';
    const MAX_LENGTH$1 = 256;
    const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */
    9007199254740991; // Max safe segment length for coercion.

    const MAX_SAFE_COMPONENT_LENGTH = 16;
    var constants = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH: MAX_LENGTH$1,
      MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
      MAX_SAFE_COMPONENT_LENGTH
    };

    const debug$3 = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return console.error('SEMVER', ...args);
    } : () => {};
    var debug_1 = debug$3;

    (function (module, exports) {
      const {
        MAX_SAFE_COMPONENT_LENGTH
      } = constants;
      const debug = debug_1;
      exports = module.exports = {}; // The actual regexps go on exports.re

      const re = exports.re = [];
      const src = exports.src = [];
      const t = exports.t = {};
      let R = 0;

      const createToken = (name, value, isGlobal) => {
        const index = R++;
        debug(index, value);
        t[name] = index;
        src[index] = value;
        re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
      }; // The following Regular Expressions can be used for tokenizing,
      // validating, and parsing SemVer version strings.
      // ## Numeric Identifier
      // A single `0`, or a non-zero digit followed by zero or more digits.


      createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
      createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+'); // ## Non-numeric Identifier
      // Zero or more digits, followed by a letter or hyphen, and then zero or
      // more letters, digits, or hyphens.

      createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*'); // ## Main Version
      // Three dot-separated numeric identifiers.

      createToken('MAINVERSION', "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")"));
      createToken('MAINVERSIONLOOSE', "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")")); // ## Pre-release Version Identifier
      // A numeric identifier, or a non-numeric identifier.

      createToken('PRERELEASEIDENTIFIER', "(?:".concat(src[t.NUMERICIDENTIFIER], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
      createToken('PRERELEASEIDENTIFIERLOOSE', "(?:".concat(src[t.NUMERICIDENTIFIERLOOSE], "|").concat(src[t.NONNUMERICIDENTIFIER], ")")); // ## Pre-release Version
      // Hyphen, followed by one or more dot-separated pre-release version
      // identifiers.

      createToken('PRERELEASE', "(?:-(".concat(src[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIER], ")*))"));
      createToken('PRERELEASELOOSE', "(?:-?(".concat(src[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIERLOOSE], ")*))")); // ## Build Metadata Identifier
      // Any combination of digits, letters, or hyphens.

      createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+'); // ## Build Metadata
      // Plus sign, followed by one or more period-separated build metadata
      // identifiers.

      createToken('BUILD', "(?:\\+(".concat(src[t.BUILDIDENTIFIER], "(?:\\.").concat(src[t.BUILDIDENTIFIER], ")*))")); // ## Full Version String
      // A main version, followed optionally by a pre-release version and
      // build metadata.
      // Note that the only major, minor, patch, and pre-release sections of
      // the version string are capturing groups.  The build metadata is not a
      // capturing group, because it should not ever be used in version
      // comparison.

      createToken('FULLPLAIN', "v?".concat(src[t.MAINVERSION]).concat(src[t.PRERELEASE], "?").concat(src[t.BUILD], "?"));
      createToken('FULL', "^".concat(src[t.FULLPLAIN], "$")); // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
      // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
      // common in the npm registry.

      createToken('LOOSEPLAIN', "[v=\\s]*".concat(src[t.MAINVERSIONLOOSE]).concat(src[t.PRERELEASELOOSE], "?").concat(src[t.BUILD], "?"));
      createToken('LOOSE', "^".concat(src[t.LOOSEPLAIN], "$"));
      createToken('GTLT', '((?:<|>)?=?)'); // Something like "2.*" or "1.2.x".
      // Note that "x.x" is a valid xRange identifer, meaning "any version"
      // Only the first item is strictly required.

      createToken('XRANGEIDENTIFIERLOOSE', "".concat(src[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
      createToken('XRANGEIDENTIFIER', "".concat(src[t.NUMERICIDENTIFIER], "|x|X|\\*"));
      createToken('XRANGEPLAIN', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:".concat(src[t.PRERELEASE], ")?").concat(src[t.BUILD], "?") + ")?)?");
      createToken('XRANGEPLAINLOOSE', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:".concat(src[t.PRERELEASELOOSE], ")?").concat(src[t.BUILD], "?") + ")?)?");
      createToken('XRANGE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAIN], "$"));
      createToken('XRANGELOOSE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAINLOOSE], "$")); // Coercion.
      // Extract anything that could conceivably be a part of a valid semver

      createToken('COERCE', "".concat('(^|[^\\d])' + '(\\d{1,').concat(MAX_SAFE_COMPONENT_LENGTH, "})") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:$|[^\\d])");
      createToken('COERCERTL', src[t.COERCE], true); // Tilde ranges.
      // Meaning is "reasonably at or greater than"

      createToken('LONETILDE', '(?:~>?)');
      createToken('TILDETRIM', "(\\s*)".concat(src[t.LONETILDE], "\\s+"), true);
      exports.tildeTrimReplace = '$1~';
      createToken('TILDE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAIN], "$"));
      createToken('TILDELOOSE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAINLOOSE], "$")); // Caret ranges.
      // Meaning is "at least and backwards compatible with"

      createToken('LONECARET', '(?:\\^)');
      createToken('CARETTRIM', "(\\s*)".concat(src[t.LONECARET], "\\s+"), true);
      exports.caretTrimReplace = '$1^';
      createToken('CARET', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAIN], "$"));
      createToken('CARETLOOSE', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAINLOOSE], "$")); // A simple gt/lt/eq thing, or just "" to indicate "any version"

      createToken('COMPARATORLOOSE', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], ")$|^$"));
      createToken('COMPARATOR', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.FULLPLAIN], ")$|^$")); // An expression to strip any whitespace between the gtlt and the thing
      // it modifies, so that `> 1.2.3` ==> `>1.2.3`

      createToken('COMPARATORTRIM', "(\\s*)".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], "|").concat(src[t.XRANGEPLAIN], ")"), true);
      exports.comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
      // Note that these all use the loose form, because they'll be
      // checked against either the strict or loose comparator form
      // later.

      createToken('HYPHENRANGE', "^\\s*(".concat(src[t.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAIN], ")") + "\\s*$");
      createToken('HYPHENRANGELOOSE', "^\\s*(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s*$"); // Star ranges basically just allow anything at all.

      createToken('STAR', '(<|>)?=?\\s*\\*'); // >=0.0.0 is like a star

      createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
      createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
    })(re$3, re$3.exports);

    const numeric = /^[0-9]+$/;

    const compareIdentifiers$1 = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);

      if (anum && bnum) {
        a = +a;
        b = +b;
      }

      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };

    const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

    var identifiers = {
      compareIdentifiers: compareIdentifiers$1,
      rcompareIdentifiers
    };

    const debug$2 = debug_1;
    const {
      MAX_LENGTH,
      MAX_SAFE_INTEGER
    } = constants;
    const {
      re: re$2,
      t: t$2
    } = re$3.exports;
    const parseOptions$2 = parseOptions_1;
    const {
      compareIdentifiers
    } = identifiers;

    class SemVer$3 {
      constructor(version, options) {
        options = parseOptions$2(options);

        if (version instanceof SemVer$3) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== 'string') {
          throw new TypeError("Invalid Version: ".concat(version));
        }

        if (version.length > MAX_LENGTH) {
          throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
        }

        debug$2('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose; // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.

        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);

        if (!m) {
          throw new TypeError("Invalid Version: ".concat(version));
        }

        this.raw = version; // these are actually numbers

        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];

        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError('Invalid major version');
        }

        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError('Invalid minor version');
        }

        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError('Invalid patch version');
        } // numberify any prerelease numeric ids


        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split('.').map(id => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;

              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }

            return id;
          });
        }

        this.build = m[5] ? m[5].split('.') : [];
        this.format();
      }

      format() {
        this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);

        if (this.prerelease.length) {
          this.version += "-".concat(this.prerelease.join('.'));
        }

        return this.version;
      }

      toString() {
        return this.version;
      }

      compare(other) {
        debug$2('SemVer.compare', this.version, this.options, other);

        if (!(other instanceof SemVer$3)) {
          if (typeof other === 'string' && other === this.version) {
            return 0;
          }

          other = new SemVer$3(other, this.options);
        }

        if (other.version === this.version) {
          return 0;
        }

        return this.compareMain(other) || this.comparePre(other);
      }

      compareMain(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        }

        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }

      comparePre(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        } // NOT having a prerelease is > having one


        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }

        let i = 0;

        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug$2('prerelease compare', i, a, b);

          if (a === undefined && b === undefined) {
            return 0;
          } else if (b === undefined) {
            return 1;
          } else if (a === undefined) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }

      compareBuild(other) {
        if (!(other instanceof SemVer$3)) {
          other = new SemVer$3(other, this.options);
        }

        let i = 0;

        do {
          const a = this.build[i];
          const b = other.build[i];
          debug$2('prerelease compare', i, a, b);

          if (a === undefined && b === undefined) {
            return 0;
          } else if (b === undefined) {
            return 1;
          } else if (a === undefined) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      } // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.


      inc(release, identifier) {
        switch (release) {
          case 'premajor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc('pre', identifier);
            break;

          case 'preminor':
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc('pre', identifier);
            break;

          case 'prepatch':
            // If this is already a prerelease, it will bump to the next version
            // drop any prereleases that might already exist, since they are not
            // relevant at this point.
            this.prerelease.length = 0;
            this.inc('patch', identifier);
            this.inc('pre', identifier);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.

          case 'prerelease':
            if (this.prerelease.length === 0) {
              this.inc('patch', identifier);
            }

            this.inc('pre', identifier);
            break;

          case 'major':
            // If this is a pre-major version, bump up to the same major version.
            // Otherwise increment major.
            // 1.0.0-5 bumps to 1.0.0
            // 1.1.0 bumps to 2.0.0
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }

            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;

          case 'minor':
            // If this is a pre-minor version, bump up to the same minor version.
            // Otherwise increment minor.
            // 1.2.0-5 bumps to 1.2.0
            // 1.2.1 bumps to 1.3.0
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }

            this.patch = 0;
            this.prerelease = [];
            break;

          case 'patch':
            // If this is not a pre-release version, it will increment the patch.
            // If it is a pre-release it will bump up to the same patch version.
            // 1.2.0-5 patches to 1.2.0
            // 1.2.0 patches to 1.2.1
            if (this.prerelease.length === 0) {
              this.patch++;
            }

            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.

          case 'pre':
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;

              while (--i >= 0) {
                if (typeof this.prerelease[i] === 'number') {
                  this.prerelease[i]++;
                  i = -2;
                }
              }

              if (i === -1) {
                // didn't increment anything
                this.prerelease.push(0);
              }
            }

            if (identifier) {
              // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
              // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
              if (this.prerelease[0] === identifier) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }

            break;

          default:
            throw new Error("invalid increment argument: ".concat(release));
        }

        this.format();
        this.raw = this.version;
        return this;
      }

    }

    var semver = SemVer$3;

    const SemVer$2 = semver;

    const compare$6 = (a, b, loose) => new SemVer$2(a, loose).compare(new SemVer$2(b, loose));

    var compare_1 = compare$6;

    const compare$5 = compare_1;

    const eq$1 = (a, b, loose) => compare$5(a, b, loose) === 0;

    var eq_1 = eq$1;

    const compare$4 = compare_1;

    const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;

    var neq_1 = neq$1;

    const compare$3 = compare_1;

    const gt$1 = (a, b, loose) => compare$3(a, b, loose) > 0;

    var gt_1 = gt$1;

    const compare$2 = compare_1;

    const gte$1 = (a, b, loose) => compare$2(a, b, loose) >= 0;

    var gte_1 = gte$1;

    const compare$1 = compare_1;

    const lt$1 = (a, b, loose) => compare$1(a, b, loose) < 0;

    var lt_1 = lt$1;

    const compare = compare_1;

    const lte$1 = (a, b, loose) => compare(a, b, loose) <= 0;

    var lte_1 = lte$1;

    const eq = eq_1;
    const neq = neq_1;
    const gt = gt_1;
    const gte = gte_1;
    const lt = lt_1;
    const lte = lte_1;

    const cmp$1 = (a, op, b, loose) => {
      switch (op) {
        case '===':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          return a === b;

        case '!==':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          return a !== b;

        case '':
        case '=':
        case '==':
          return eq(a, b, loose);

        case '!=':
          return neq(a, b, loose);

        case '>':
          return gt(a, b, loose);

        case '>=':
          return gte(a, b, loose);

        case '<':
          return lt(a, b, loose);

        case '<=':
          return lte(a, b, loose);

        default:
          throw new TypeError("Invalid operator: ".concat(op));
      }
    };

    var cmp_1 = cmp$1;

    const ANY = Symbol('SemVer ANY'); // hoisted class for cyclic dependency

    class Comparator$1 {
      static get ANY() {
        return ANY;
      }

      constructor(comp, options) {
        options = parseOptions$1(options);

        if (comp instanceof Comparator$1) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }

        debug$1('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);

        if (this.semver === ANY) {
          this.value = '';
        } else {
          this.value = this.operator + this.semver.version;
        }

        debug$1('comp', this);
      }

      parse(comp) {
        const r = this.options.loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
        const m = comp.match(r);

        if (!m) {
          throw new TypeError("Invalid comparator: ".concat(comp));
        }

        this.operator = m[1] !== undefined ? m[1] : '';

        if (this.operator === '=') {
          this.operator = '';
        } // if it literally is just '>' or '' then allow anything.


        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer$1(m[2], this.options.loose);
        }
      }

      toString() {
        return this.value;
      }

      test(version) {
        debug$1('Comparator.test', version, this.options.loose);

        if (this.semver === ANY || version === ANY) {
          return true;
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer$1(version, this.options);
          } catch (er) {
            return false;
          }
        }

        return cmp(version, this.operator, this.semver, this.options);
      }

      intersects(comp, options) {
        if (!(comp instanceof Comparator$1)) {
          throw new TypeError('a Comparator is required');
        }

        if (!options || typeof options !== 'object') {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }

        if (this.operator === '') {
          if (this.value === '') {
            return true;
          }

          return new Range$2(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
          if (comp.value === '') {
            return true;
          }

          return new Range$2(this.value, options).test(comp.semver);
        }

        const sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
        const sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
        const oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
        const oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }

    }

    var comparator = Comparator$1;
    const parseOptions$1 = parseOptions_1;
    const {
      re: re$1,
      t: t$1
    } = re$3.exports;
    const cmp = cmp_1;
    const debug$1 = debug_1;
    const SemVer$1 = semver;
    const Range$2 = range;

    class Range$1 {
      constructor(range, options) {
        options = parseOptions(options);

        if (range instanceof Range$1) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range$1(range.raw, options);
          }
        }

        if (range instanceof Comparator) {
          // just put it in the set and return
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this;
        }

        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

        this.raw = range;
        this.set = range.split(/\s*\|\|\s*/) // map the range to a 2d array of comparators
        .map(range => this.parseRange(range.trim())) // throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter(c => c.length);

        if (!this.set.length) {
          throw new TypeError("Invalid SemVer Range: ".concat(range));
        } // if we have any that are not the null set, throw out null sets.


        if (this.set.length > 1) {
          // keep the first one, in case they're all null sets
          const first = this.set[0];
          this.set = this.set.filter(c => !isNullSet(c[0]));
          if (this.set.length === 0) this.set = [first];else if (this.set.length > 1) {
            // if we have any that are *, then the range is just *
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }

        this.format();
      }

      format() {
        this.range = this.set.map(comps => {
          return comps.join(' ').trim();
        }).join('||').trim();
        return this.range;
      }

      toString() {
        return this.range;
      }

      parseRange(range) {
        range = range.trim(); // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.

        const memoOpts = Object.keys(this.options).join(',');
        const memoKey = "parseRange:".concat(memoOpts, ":").concat(range);
        const cached = cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose; // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug('comparator trim', range, re[t.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

        range = range.replace(re[t.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

        range = range.replace(re[t.CARETTRIM], caretTrimReplace); // normalize spaces

        range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
        // ready to be split into comparators.

        const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/) // >=0.0.0 is equivalent to *
        .map(comp => replaceGTE0(comp, this.options)) // in loose mode, throw out any that are not valid comparators
        .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true).map(comp => new Comparator(comp, this.options)); // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once

        rangeList.length;
        const rangeMap = new Map();

        for (const comp of rangeList) {
          if (isNullSet(comp)) return [comp];
          rangeMap.set(comp.value, comp);
        }

        if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete('');
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }

      intersects(range, options) {
        if (!(range instanceof Range$1)) {
          throw new TypeError('a Range is required');
        }

        return this.set.some(thisComparators => {
          return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
              return rangeComparators.every(rangeComparator => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      } // if ANY of the sets match ALL of its comparators, then pass


      test(version) {
        if (!version) {
          return false;
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }

        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }

        return false;
      }

    }

    var range = Range$1;
    const LRU = lruCache;
    const cache = new LRU({
      max: 1000
    });
    const parseOptions = parseOptions_1;
    const Comparator = comparator;
    const debug = debug_1;
    const SemVer = semver;
    const {
      re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = re$3.exports;

    const isNullSet = c => c.value === '<0.0.0-0';

    const isAny = c => c.value === ''; // take a set of comparators and determine whether there
    // exists a version which can satisfy it


    const isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();

      while (result && remainingComparators.length) {
        result = remainingComparators.every(otherComparator => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }

      return result;
    }; // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.


    const parseComparator = (comp, options) => {
      debug('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug('caret', comp);
      comp = replaceTildes(comp, options);
      debug('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug('xrange', comp);
      comp = replaceStars(comp, options);
      debug('stars', comp);
      return comp;
    };

    const isX = id => !id || id.toLowerCase() === 'x' || id === '*'; // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0


    const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map(comp => {
      return replaceTilde(comp, options);
    }).join(' ');

    const replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug('tilde', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0-0
          ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
        } else if (pr) {
          debug('replaceTilde pr', pr);
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0-0
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }

        debug('tilde return', ret);
        return ret;
      });
    }; // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
    // ^1.2.3 --> >=1.2.3 <2.0.0-0
    // ^1.2.0 --> >=1.2.0 <2.0.0-0


    const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map(comp => {
      return replaceCaret(comp, options);
    }).join(' ');

    const replaceCaret = (comp, options) => {
      debug('caret', comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? '-0' : '';
      return comp.replace(r, (_, M, m, p, pr) => {
        debug('caret', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
        } else if (isX(p)) {
          if (M === '0') {
            ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
          } else {
            ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
          }
        } else if (pr) {
          debug('replaceCaret pr', pr);

          if (M === '0') {
            if (m === '0') {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
            } else {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
          } else {
            ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
          }
        } else {
          debug('no pr');

          if (M === '0') {
            if (m === '0') {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
            } else {
              ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
            }
          } else {
            ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
          }
        }

        debug('caret return', ret);
        return ret;
      });
    };

    const replaceXRanges = (comp, options) => {
      debug('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(comp => {
        return replaceXRange(comp, options);
      }).join(' ');
    };

    const replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;

        if (gtlt === '=' && anyX) {
          gtlt = '';
        } // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value


        pr = options.includePrerelease ? '-0' : '';

        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0-0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // we know patch is an x, because we have any x at all.
          // replace X with 0
          if (xm) {
            m = 0;
          }

          p = 0;

          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            gtlt = '>=';

            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<';

            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }

          if (gtlt === '<') pr = '-0';
          ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
        } else if (xm) {
          ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
        } else if (xp) {
          ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }

        debug('xRange return', ret);
        return ret;
      });
    }; // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.


    const replaceStars = (comp, options) => {
      debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

      return comp.trim().replace(re[t.STAR], '');
    };

    const replaceGTE0 = (comp, options) => {
      debug('replaceGTE0', comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
    }; // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0-0


    const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
      } else if (isX(fp)) {
        from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
      } else if (fpr) {
        from = ">=".concat(from);
      } else {
        from = ">=".concat(from).concat(incPr ? '-0' : '');
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = "<".concat(+tM + 1, ".0.0-0");
      } else if (isX(tp)) {
        to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
      } else if (tpr) {
        to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
      } else if (incPr) {
        to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
      } else {
        to = "<=".concat(to);
      }

      return "".concat(from, " ").concat(to).trim();
    };

    const testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }

      if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);

          if (set[i].semver === Comparator.ANY) {
            continue;
          }

          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;

            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        } // Version has a -pre, but it's not one of the ones we like.


        return false;
      }

      return true;
    };

    const Range = range;

    const satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }

      return range.test(version);
    };

    var satisfies_1 = satisfies;

    function adjustSpatial(item, encode, swap) {
      let t;

      if (encode.x2) {
        if (encode.x) {
          if (swap && item.x > item.x2) {
            t = item.x;
            item.x = item.x2;
            item.x2 = t;
          }

          item.width = item.x2 - item.x;
        } else {
          item.x = item.x2 - (item.width || 0);
        }
      }

      if (encode.xc) {
        item.x = item.xc - (item.width || 0) / 2;
      }

      if (encode.y2) {
        if (encode.y) {
          if (swap && item.y > item.y2) {
            t = item.y;
            item.y = item.y2;
            item.y2 = t;
          }

          item.height = item.y2 - item.y;
        } else {
          item.y = item.y2 - (item.height || 0);
        }
      }

      if (encode.yc) {
        item.y = item.yc - (item.height || 0) / 2;
      }
    }

    var Constants = {
      NaN: NaN,
      E: Math.E,
      LN2: Math.LN2,
      LN10: Math.LN10,
      LOG2E: Math.LOG2E,
      LOG10E: Math.LOG10E,
      PI: Math.PI,
      SQRT1_2: Math.SQRT1_2,
      SQRT2: Math.SQRT2,
      MIN_VALUE: Number.MIN_VALUE,
      MAX_VALUE: Number.MAX_VALUE
    };
    var Ops = {
      '*': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b,
      '>': (a, b) => a > b,
      '<': (a, b) => a < b,
      '<=': (a, b) => a <= b,
      '>=': (a, b) => a >= b,
      '==': (a, b) => a == b,
      '!=': (a, b) => a != b,
      '===': (a, b) => a === b,
      '!==': (a, b) => a !== b,
      '&': (a, b) => a & b,
      '|': (a, b) => a | b,
      '^': (a, b) => a ^ b,
      '<<': (a, b) => a << b,
      '>>': (a, b) => a >> b,
      '>>>': (a, b) => a >>> b
    };
    var Unary = {
      '+': a => +a,
      '-': a => -a,
      '~': a => ~a,
      '!': a => !a
    };
    const slice = Array.prototype.slice;

    const apply = (m, args, cast) => {
      const obj = cast ? cast(args[0]) : args[0];
      return obj[m].apply(obj, slice.call(args, 1));
    };

    const datetime = (y, m, d, H, M, S, ms) => new Date(y, m || 0, d != null ? d : 1, H || 0, M || 0, S || 0, ms || 0);

    var Functions = {
      // math functions
      isNaN: Number.isNaN,
      isFinite: Number.isFinite,
      abs: Math.abs,
      acos: Math.acos,
      asin: Math.asin,
      atan: Math.atan,
      atan2: Math.atan2,
      ceil: Math.ceil,
      cos: Math.cos,
      exp: Math.exp,
      floor: Math.floor,
      log: Math.log,
      max: Math.max,
      min: Math.min,
      pow: Math.pow,
      random: Math.random,
      round: Math.round,
      sin: Math.sin,
      sqrt: Math.sqrt,
      tan: Math.tan,
      clamp: (a, b, c) => Math.max(b, Math.min(c, a)),
      // date functions
      now: Date.now,
      utc: Date.UTC,
      datetime: datetime,
      date: d => new Date(d).getDate(),
      day: d => new Date(d).getDay(),
      year: d => new Date(d).getFullYear(),
      month: d => new Date(d).getMonth(),
      hours: d => new Date(d).getHours(),
      minutes: d => new Date(d).getMinutes(),
      seconds: d => new Date(d).getSeconds(),
      milliseconds: d => new Date(d).getMilliseconds(),
      time: d => new Date(d).getTime(),
      timezoneoffset: d => new Date(d).getTimezoneOffset(),
      utcdate: d => new Date(d).getUTCDate(),
      utcday: d => new Date(d).getUTCDay(),
      utcyear: d => new Date(d).getUTCFullYear(),
      utcmonth: d => new Date(d).getUTCMonth(),
      utchours: d => new Date(d).getUTCHours(),
      utcminutes: d => new Date(d).getUTCMinutes(),
      utcseconds: d => new Date(d).getUTCSeconds(),
      utcmilliseconds: d => new Date(d).getUTCMilliseconds(),
      // sequence functions
      length: x => x.length,
      join: function () {
        return apply('join', arguments);
      },
      indexof: function () {
        return apply('indexOf', arguments);
      },
      lastindexof: function () {
        return apply('lastIndexOf', arguments);
      },
      slice: function () {
        return apply('slice', arguments);
      },
      reverse: x => x.slice().reverse(),
      // string functions
      parseFloat: parseFloat,
      parseInt: parseInt,
      upper: x => String(x).toUpperCase(),
      lower: x => String(x).toLowerCase(),
      substring: function () {
        return apply('substring', arguments, String);
      },
      split: function () {
        return apply('split', arguments, String);
      },
      replace: function () {
        return apply('replace', arguments, String);
      },
      trim: x => String(x).trim(),
      // regexp functions
      regexp: RegExp,
      test: (r, t) => RegExp(r).test(t)
    };
    const EventFunctions = ['view', 'item', 'group', 'xy', 'x', 'y'];
    const Visitors = {
      Literal: ($, n) => n.value,
      Identifier: ($, n) => {
        const id = n.name;
        return $.memberDepth > 0 ? id : id === 'datum' ? $.datum : id === 'event' ? $.event : id === 'item' ? $.item : Constants[id] || $.params['$' + id];
      },
      MemberExpression: ($, n) => {
        const d = !n.computed,
              o = $(n.object);
        if (d) $.memberDepth += 1;
        const p = $(n.property);
        if (d) $.memberDepth -= 1;
        return o[p];
      },
      CallExpression: ($, n) => {
        const args = n.arguments;
        let name = n.callee.name; // handle special internal functions used by encoders
        // re-route to corresponding standard function

        if (name.startsWith('_')) {
          name = name.slice(1);
        } // special case "if" due to conditional evaluation of branches


        return name === 'if' ? $(args[0]) ? $(args[1]) : $(args[2]) : ($.fn[name] || Functions[name]).apply($.fn, args.map($));
      },
      ArrayExpression: ($, n) => n.elements.map($),
      BinaryExpression: ($, n) => Ops[n.operator]($(n.left), $(n.right)),
      UnaryExpression: ($, n) => Unary[n.operator]($(n.argument)),
      ConditionalExpression: ($, n) => $(n.test) ? $(n.consequent) : $(n.alternate),
      LogicalExpression: ($, n) => n.operator === '&&' ? $(n.left) && $(n.right) : $(n.left) || $(n.right),
      ObjectExpression: ($, n) => n.properties.reduce((o, p) => {
        $.memberDepth += 1;
        const k = $(p.key);
        $.memberDepth -= 1;
        o[k] = $(p.value);
        return o;
      }, {})
    };

    function interpret(ast, fn, params, datum, event, item) {
      const $ = n => Visitors[n.type]($, n);

      $.memberDepth = 0;
      $.fn = Object.create(fn);
      $.params = params;
      $.datum = datum;
      $.event = event;
      $.item = item; // route event functions to annotated vega event context

      EventFunctions.forEach(f => $.fn[f] = function () {
        return event.vega[f](...arguments);
      });
      return $(ast);
    }

    var expression = {
      /**
       * Parse an expression used to update an operator value.
       */
      operator(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return _ => interpret(ast, fn, _);
      },

      /**
       * Parse an expression provided as an operator parameter value.
       */
      parameter(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return (datum, _) => interpret(ast, fn, _, datum);
      },

      /**
       * Parse an expression applied to an event stream.
       */
      event(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return event => interpret(ast, fn, undefined, undefined, event);
      },

      /**
       * Parse an expression used to handle an event-driven operator update.
       */
      handler(ctx, expr) {
        const ast = expr.ast,
              fn = ctx.functions;
        return (_, event) => {
          const datum = event.item && event.item.datum;
          return interpret(ast, fn, _, datum, event);
        };
      },

      /**
       * Parse an expression that performs visual encoding.
       */
      encode(ctx, encode) {
        const {
          marktype,
          channels
        } = encode,
              fn = ctx.functions,
              swap = marktype === 'group' || marktype === 'image' || marktype === 'rect';
        return (item, _) => {
          const datum = item.datum;
          let m = 0,
              v;

          for (const name in channels) {
            v = interpret(channels[name].ast, fn, _, datum, undefined, item);

            if (item[name] !== v) {
              item[name] = v;
              m = 1;
            }
          }

          if (marktype !== 'rule') {
            adjustSpatial(item, channels, swap);
          }

          return m;
        };
      }

    };

    function e(e) {
      const [n, r] = /schema\/([\w-]+)\/([\w\.\-]+)\.json$/g.exec(e).slice(1, 3);
      return {
        library: n,
        version: r
      };
    }

    var name$1 = "vega-themes";
    var version$2 = "2.10.0";
    var description$1 = "Themes for stylized Vega and Vega-Lite visualizations.";
    var keywords$1 = ["vega", "vega-lite", "themes", "style"];
    var license$1 = "BSD-3-Clause";
    var author$1 = {
      name: "UW Interactive Data Lab",
      url: "https://idl.cs.washington.edu"
    };
    var contributors$1 = [{
      name: "Emily Gu",
      url: "https://github.com/emilygu"
    }, {
      name: "Arvind Satyanarayan",
      url: "http://arvindsatya.com"
    }, {
      name: "Jeffrey Heer",
      url: "https://idl.cs.washington.edu"
    }, {
      name: "Dominik Moritz",
      url: "https://www.domoritz.de"
    }];
    var main$1 = "build/vega-themes.js";
    var module$1 = "build/vega-themes.module.js";
    var unpkg$1 = "build/vega-themes.min.js";
    var jsdelivr$1 = "build/vega-themes.min.js";
    var types$1 = "build/vega-themes.module.d.ts";
    var repository$1 = {
      type: "git",
      url: "https://github.com/vega/vega-themes.git"
    };
    var files$1 = ["src", "build"];
    var scripts$1 = {
      prebuild: "yarn clean",
      build: "rollup -c",
      clean: "rimraf build && rimraf examples/build",
      "copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
      "copy:build": "rsync -r build/* examples/build",
      "deploy:gh": "yarn build && mkdir -p examples/build && rsync -r build/* examples/build && gh-pages -d examples",
      prepublishOnly: "yarn clean && yarn build",
      preversion: "yarn lint",
      serve: "browser-sync start -s -f build examples --serveStatic examples",
      start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
      prepare: "beemo create-config",
      eslintbase: "beemo eslint .",
      format: "yarn eslintbase --fix",
      lint: "yarn eslintbase"
    };
    var devDependencies$1 = {
      "@rollup/plugin-json": "^4.1.0",
      "@rollup/plugin-node-resolve": "^11.2.0",
      "@wessberg/rollup-plugin-ts": "^1.3.8",
      "browser-sync": "^2.26.14",
      concurrently: "^6.0.0",
      "gh-pages": "^3.1.0",
      rollup: "^2.39.1",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-terser": "^7.0.2",
      typescript: "^4.2.2",
      vega: "^5.19.1",
      "vega-lite": "^5.0.0",
      "vega-lite-dev-config": "^0.16.1"
    };
    var peerDependencies$1 = {
      vega: "*",
      "vega-lite": "*"
    };
    var pkg$1 = {
      name: name$1,
      version: version$2,
      description: description$1,
      keywords: keywords$1,
      license: license$1,
      author: author$1,
      contributors: contributors$1,
      main: main$1,
      module: module$1,
      unpkg: unpkg$1,
      jsdelivr: jsdelivr$1,
      types: types$1,
      repository: repository$1,
      files: files$1,
      scripts: scripts$1,
      devDependencies: devDependencies$1,
      peerDependencies: peerDependencies$1
    };
    const lightColor = '#fff';
    const medColor = '#888';
    const darkTheme = {
      background: '#333',
      title: {
        color: lightColor,
        subtitleColor: lightColor
      },
      style: {
        'guide-label': {
          fill: lightColor
        },
        'guide-title': {
          fill: lightColor
        }
      },
      axis: {
        domainColor: lightColor,
        gridColor: medColor,
        tickColor: lightColor
      }
    };
    const markColor = '#4572a7';
    const excelTheme = {
      background: '#fff',
      arc: {
        fill: markColor
      },
      area: {
        fill: markColor
      },
      line: {
        stroke: markColor,
        strokeWidth: 2
      },
      path: {
        stroke: markColor
      },
      rect: {
        fill: markColor
      },
      shape: {
        stroke: markColor
      },
      symbol: {
        fill: markColor,
        strokeWidth: 1.5,
        size: 50
      },
      axis: {
        bandPosition: 0.5,
        grid: true,
        gridColor: '#000000',
        gridOpacity: 1,
        gridWidth: 0.5,
        labelPadding: 10,
        tickSize: 5,
        tickWidth: 0.5
      },
      axisBand: {
        grid: false,
        tickExtra: true
      },
      legend: {
        labelBaseline: 'middle',
        labelFontSize: 11,
        symbolSize: 50,
        symbolType: 'square'
      },
      range: {
        category: ['#4572a7', '#aa4643', '#8aa453', '#71598e', '#4598ae', '#d98445', '#94aace', '#d09393', '#b9cc98', '#a99cbc']
      }
    };
    const markColor$1 = '#30a2da';
    const axisColor = '#cbcbcb';
    const guideLabelColor = '#999';
    const guideTitleColor = '#333';
    const backgroundColor = '#f0f0f0';
    const blackTitle = '#333';
    const fiveThirtyEightTheme = {
      arc: {
        fill: markColor$1
      },
      area: {
        fill: markColor$1
      },
      axis: {
        domainColor: axisColor,
        grid: true,
        gridColor: axisColor,
        gridWidth: 1,
        labelColor: guideLabelColor,
        labelFontSize: 10,
        titleColor: guideTitleColor,
        tickColor: axisColor,
        tickSize: 10,
        titleFontSize: 14,
        titlePadding: 10,
        labelPadding: 4
      },
      axisBand: {
        grid: false
      },
      background: backgroundColor,
      group: {
        fill: backgroundColor
      },
      legend: {
        labelColor: blackTitle,
        labelFontSize: 11,
        padding: 1,
        symbolSize: 30,
        symbolType: 'square',
        titleColor: blackTitle,
        titleFontSize: 14,
        titlePadding: 10
      },
      line: {
        stroke: markColor$1,
        strokeWidth: 2
      },
      path: {
        stroke: markColor$1,
        strokeWidth: 0.5
      },
      rect: {
        fill: markColor$1
      },
      range: {
        category: ['#30a2da', '#fc4f30', '#e5ae38', '#6d904f', '#8b8b8b', '#b96db8', '#ff9e27', '#56cc60', '#52d2ca', '#52689e', '#545454', '#9fe4f8'],
        diverging: ['#cc0020', '#e77866', '#f6e7e1', '#d6e8ed', '#91bfd9', '#1d78b5'],
        heatmap: ['#d6e8ed', '#cee0e5', '#91bfd9', '#549cc6', '#1d78b5']
      },
      point: {
        filled: true,
        shape: 'circle'
      },
      shape: {
        stroke: markColor$1
      },
      bar: {
        binSpacing: 2,
        fill: markColor$1,
        stroke: null
      },
      title: {
        anchor: 'start',
        fontSize: 24,
        fontWeight: 600,
        offset: 20
      }
    };
    const markColor$2 = '#000';
    const ggplot2Theme = {
      group: {
        fill: '#e5e5e5'
      },
      arc: {
        fill: markColor$2
      },
      area: {
        fill: markColor$2
      },
      line: {
        stroke: markColor$2
      },
      path: {
        stroke: markColor$2
      },
      rect: {
        fill: markColor$2
      },
      shape: {
        stroke: markColor$2
      },
      symbol: {
        fill: markColor$2,
        size: 40
      },
      axis: {
        domain: false,
        grid: true,
        gridColor: '#FFFFFF',
        gridOpacity: 1,
        labelColor: '#7F7F7F',
        labelPadding: 4,
        tickColor: '#7F7F7F',
        tickSize: 5.67,
        titleFontSize: 16,
        titleFontWeight: 'normal'
      },
      legend: {
        labelBaseline: 'middle',
        labelFontSize: 11,
        symbolSize: 40
      },
      range: {
        category: ['#000000', '#7F7F7F', '#1A1A1A', '#999999', '#333333', '#B0B0B0', '#4D4D4D', '#C9C9C9', '#666666', '#DCDCDC']
      }
    };
    const headlineFontSize = 22;
    const headlineFontWeight = 'normal';
    const labelFont = 'Benton Gothic, sans-serif';
    const labelFontSize = 11.5;
    const labelFontWeight = 'normal';
    const markColor$3 = '#82c6df'; // const markHighlight = '#006d8f';
    // const markDemocrat = '#5789b8';
    // const markRepublican = '#d94f54';

    const titleFont = 'Benton Gothic Bold, sans-serif';
    const titleFontWeight = 'normal';
    const titleFontSize = 13;
    const colorSchemes = {
      'category-6': ['#ec8431', '#829eb1', '#c89d29', '#3580b1', '#adc839', '#ab7fb4'],
      'fire-7': ['#fbf2c7', '#f9e39c', '#f8d36e', '#f4bb6a', '#e68a4f', '#d15a40', '#ab4232'],
      'fireandice-6': ['#e68a4f', '#f4bb6a', '#f9e39c', '#dadfe2', '#a6b7c6', '#849eae'],
      'ice-7': ['#edefee', '#dadfe2', '#c4ccd2', '#a6b7c6', '#849eae', '#607785', '#47525d']
    };
    const latimesTheme = {
      background: '#ffffff',
      title: {
        anchor: 'start',
        color: '#000000',
        font: titleFont,
        fontSize: headlineFontSize,
        fontWeight: headlineFontWeight
      },
      arc: {
        fill: markColor$3
      },
      area: {
        fill: markColor$3
      },
      line: {
        stroke: markColor$3,
        strokeWidth: 2
      },
      path: {
        stroke: markColor$3
      },
      rect: {
        fill: markColor$3
      },
      shape: {
        stroke: markColor$3
      },
      symbol: {
        fill: markColor$3,
        size: 30
      },
      axis: {
        labelFont,
        labelFontSize,
        labelFontWeight,
        titleFont,
        titleFontSize,
        titleFontWeight
      },
      axisX: {
        labelAngle: 0,
        labelPadding: 4,
        tickSize: 3
      },
      axisY: {
        labelBaseline: 'middle',
        maxExtent: 45,
        minExtent: 45,
        tickSize: 2,
        titleAlign: 'left',
        titleAngle: 0,
        titleX: -45,
        titleY: -11
      },
      legend: {
        labelFont,
        labelFontSize,
        symbolType: 'square',
        titleFont,
        titleFontSize,
        titleFontWeight
      },
      range: {
        category: colorSchemes['category-6'],
        diverging: colorSchemes['fireandice-6'],
        heatmap: colorSchemes['fire-7'],
        ordinal: colorSchemes['fire-7'],
        ramp: colorSchemes['fire-7']
      }
    };
    const markColor$4 = '#ab5787';
    const axisColor$1 = '#979797';
    const quartzTheme = {
      background: '#f9f9f9',
      arc: {
        fill: markColor$4
      },
      area: {
        fill: markColor$4
      },
      line: {
        stroke: markColor$4
      },
      path: {
        stroke: markColor$4
      },
      rect: {
        fill: markColor$4
      },
      shape: {
        stroke: markColor$4
      },
      symbol: {
        fill: markColor$4,
        size: 30
      },
      axis: {
        domainColor: axisColor$1,
        domainWidth: 0.5,
        gridWidth: 0.2,
        labelColor: axisColor$1,
        tickColor: axisColor$1,
        tickWidth: 0.2,
        titleColor: axisColor$1
      },
      axisBand: {
        grid: false
      },
      axisX: {
        grid: true,
        tickSize: 10
      },
      axisY: {
        domain: false,
        grid: true,
        tickSize: 0
      },
      legend: {
        labelFontSize: 11,
        padding: 1,
        symbolSize: 30,
        symbolType: 'square'
      },
      range: {
        category: ['#ab5787', '#51b2e5', '#703c5c', '#168dd9', '#d190b6', '#00609f', '#d365ba', '#154866', '#666666', '#c4c4c4']
      }
    };
    const markColor$5 = '#3e5c69';
    const voxTheme = {
      background: '#fff',
      arc: {
        fill: markColor$5
      },
      area: {
        fill: markColor$5
      },
      line: {
        stroke: markColor$5
      },
      path: {
        stroke: markColor$5
      },
      rect: {
        fill: markColor$5
      },
      shape: {
        stroke: markColor$5
      },
      symbol: {
        fill: markColor$5
      },
      axis: {
        domainWidth: 0.5,
        grid: true,
        labelPadding: 2,
        tickSize: 5,
        tickWidth: 0.5,
        titleFontWeight: 'normal'
      },
      axisBand: {
        grid: false
      },
      axisX: {
        gridWidth: 0.2
      },
      axisY: {
        gridDash: [3],
        gridWidth: 0.4
      },
      legend: {
        labelFontSize: 11,
        padding: 1,
        symbolType: 'square'
      },
      range: {
        category: ['#3e5c69', '#6793a6', '#182429', '#0570b0', '#3690c0', '#74a9cf', '#a6bddb', '#e2ddf2']
      }
    };
    const markColor$6 = '#1696d2';
    const axisColor$2 = '#000000';
    const backgroundColor$1 = '#FFFFFF';
    const font = 'Lato';
    const labelFont$1 = 'Lato';
    const sourceFont = 'Lato';
    const gridColor = '#DEDDDD';
    const titleFontSize$1 = 18;
    const colorSchemes$1 = {
      'main-colors': ['#1696d2', '#d2d2d2', '#000000', '#fdbf11', '#ec008b', '#55b748', '#5c5859', '#db2b27'],
      'shades-blue': ['#CFE8F3', '#A2D4EC', '#73BFE2', '#46ABDB', '#1696D2', '#12719E', '#0A4C6A', '#062635'],
      'shades-gray': ['#F5F5F5', '#ECECEC', '#E3E3E3', '#DCDBDB', '#D2D2D2', '#9D9D9D', '#696969', '#353535'],
      'shades-yellow': ['#FFF2CF', '#FCE39E', '#FDD870', '#FCCB41', '#FDBF11', '#E88E2D', '#CA5800', '#843215'],
      'shades-magenta': ['#F5CBDF', '#EB99C2', '#E46AA7', '#E54096', '#EC008B', '#AF1F6B', '#761548', '#351123'],
      'shades-green': ['#DCEDD9', '#BCDEB4', '#98CF90', '#78C26D', '#55B748', '#408941', '#2C5C2D', '#1A2E19'],
      'shades-black': ['#D5D5D4', '#ADABAC', '#848081', '#5C5859', '#332D2F', '#262223', '#1A1717', '#0E0C0D'],
      'shades-red': ['#F8D5D4', '#F1AAA9', '#E9807D', '#E25552', '#DB2B27', '#A4201D', '#6E1614', '#370B0A'],
      'one-group': ['#1696d2', '#000000'],
      'two-groups-cat-1': ['#1696d2', '#000000'],
      'two-groups-cat-2': ['#1696d2', '#fdbf11'],
      'two-groups-cat-3': ['#1696d2', '#db2b27'],
      'two-groups-seq': ['#a2d4ec', '#1696d2'],
      'three-groups-cat': ['#1696d2', '#fdbf11', '#000000'],
      'three-groups-seq': ['#a2d4ec', '#1696d2', '#0a4c6a'],
      'four-groups-cat-1': ['#000000', '#d2d2d2', '#fdbf11', '#1696d2'],
      'four-groups-cat-2': ['#1696d2', '#ec0008b', '#fdbf11', '#5c5859'],
      'four-groups-seq': ['#cfe8f3', '#73bf42', '#1696d2', '#0a4c6a'],
      'five-groups-cat-1': ['#1696d2', '#fdbf11', '#d2d2d2', '#ec008b', '#000000'],
      'five-groups-cat-2': ['#1696d2', '#0a4c6a', '#d2d2d2', '#fdbf11', '#332d2f'],
      'five-groups-seq': ['#cfe8f3', '#73bf42', '#1696d2', '#0a4c6a', '#000000'],
      'six-groups-cat-1': ['#1696d2', '#ec008b', '#fdbf11', '#000000', '#d2d2d2', '#55b748'],
      'six-groups-cat-2': ['#1696d2', '#d2d2d2', '#ec008b', '#fdbf11', '#332d2f', '#0a4c6a'],
      'six-groups-seq': ['#cfe8f3', '#a2d4ec', '#73bfe2', '#46abdb', '#1696d2', '#12719e'],
      'diverging-colors': ['#ca5800', '#fdbf11', '#fdd870', '#fff2cf', '#cfe8f3', '#73bfe2', '#1696d2', '#0a4c6a']
    };
    const urbanInstituteTheme = {
      background: backgroundColor$1,
      title: {
        anchor: 'start',
        fontSize: titleFontSize$1,
        font: font
      },
      axisX: {
        domain: true,
        domainColor: axisColor$2,
        domainWidth: 1,
        grid: false,
        labelFontSize: 12,
        labelFont: labelFont$1,
        labelAngle: 0,
        tickColor: axisColor$2,
        tickSize: 5,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font
      },
      axisY: {
        domain: false,
        domainWidth: 1,
        grid: true,
        gridColor: gridColor,
        gridWidth: 1,
        labelFontSize: 12,
        labelFont: labelFont$1,
        labelPadding: 8,
        ticks: false,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font,
        titleAngle: 0,
        titleY: -10,
        titleX: 18
      },
      legend: {
        labelFontSize: 12,
        labelFont: labelFont$1,
        symbolSize: 100,
        titleFontSize: 12,
        titlePadding: 10,
        titleFont: font,
        orient: 'right',
        offset: 10
      },
      view: {
        stroke: 'transparent'
      },
      range: {
        category: colorSchemes$1['six-groups-cat-1'],
        diverging: colorSchemes$1['diverging-colors'],
        heatmap: colorSchemes$1['diverging-colors'],
        ordinal: colorSchemes$1['six-groups-seq'],
        ramp: colorSchemes$1['shades-blue']
      },
      area: {
        fill: markColor$6
      },
      rect: {
        fill: markColor$6
      },
      line: {
        color: markColor$6,
        stroke: markColor$6,
        strokeWidth: 5
      },
      trail: {
        color: markColor$6,
        stroke: markColor$6,
        strokeWidth: 0,
        size: 1
      },
      path: {
        stroke: markColor$6,
        strokeWidth: 0.5
      },
      point: {
        filled: true
      },
      text: {
        font: sourceFont,
        color: markColor$6,
        fontSize: 11,
        align: 'center',
        fontWeight: 400,
        size: 11
      },
      style: {
        bar: {
          fill: markColor$6,
          stroke: null
        }
      },
      arc: {
        fill: markColor$6
      },
      shape: {
        stroke: markColor$6
      },
      symbol: {
        fill: markColor$6,
        size: 30
      }
    };
    /**
     * Copyright 2020 Google LLC.
     *
     * Use of this source code is governed by a BSD-style
     * license that can be found in the LICENSE file or at
     * https://developers.google.com/open-source/licenses/bsd
     */

    const markColor$7 = '#3366CC';
    const gridColor$1 = '#ccc';
    const defaultFont = 'Arial, sans-serif';
    const googlechartsTheme = {
      arc: {
        fill: markColor$7
      },
      area: {
        fill: markColor$7
      },
      path: {
        stroke: markColor$7
      },
      rect: {
        fill: markColor$7
      },
      shape: {
        stroke: markColor$7
      },
      symbol: {
        stroke: markColor$7
      },
      circle: {
        fill: markColor$7
      },
      background: '#fff',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      style: {
        'guide-label': {
          font: defaultFont,
          fontSize: 12
        },
        'guide-title': {
          font: defaultFont,
          fontSize: 12
        },
        'group-title': {
          font: defaultFont,
          fontSize: 12
        }
      },
      title: {
        font: defaultFont,
        fontSize: 14,
        fontWeight: 'bold',
        dy: -3,
        anchor: 'start'
      },
      axis: {
        gridColor: gridColor$1,
        tickColor: gridColor$1,
        domain: false,
        grid: true
      },
      range: {
        category: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC', '#00ACC1', '#FF7043', '#9E9D24', '#5C6BC0', '#F06292', '#00796B', '#C2185B'],
        heatmap: ['#c6dafc', '#5e97f6', '#2a56c6']
      }
    };
    const version$1$1 = pkg$1.version;

    var themes = /*#__PURE__*/Object.freeze({
        __proto__: null,
        dark: darkTheme,
        excel: excelTheme,
        fivethirtyeight: fiveThirtyEightTheme,
        ggplot2: ggplot2Theme,
        googlecharts: googlechartsTheme,
        latimes: latimesTheme,
        quartz: quartzTheme,
        urbaninstitute: urbanInstituteTheme,
        version: version$1$1,
        vox: voxTheme
    });

    function accessor(fn, fields, name) {
      fn.fields = fields || [];
      fn.fname = name;
      return fn;
    }

    function getter(path) {
      return path.length === 1 ? get1(path[0]) : getN(path);
    }

    const get1 = field => function (obj) {
      return obj[field];
    };

    const getN = path => {
      const len = path.length;
      return function (obj) {
        for (let i = 0; i < len; ++i) {
          obj = obj[path[i]];
        }

        return obj;
      };
    };

    function error(message) {
      throw Error(message);
    }

    function splitAccessPath(p) {
      const path = [],
            n = p.length;
      let q = null,
          b = 0,
          s = '',
          i,
          j,
          c;
      p = p + '';

      function push() {
        path.push(s + p.substring(i, j));
        s = '';
        i = j + 1;
      }

      for (i = j = 0; j < n; ++j) {
        c = p[j];

        if (c === '\\') {
          s += p.substring(i, j);
          s += p.substring(++j, ++j);
          i = j;
        } else if (c === q) {
          push();
          q = null;
          b = -1;
        } else if (q) {
          continue;
        } else if (i === b && c === '"') {
          i = j + 1;
          q = c;
        } else if (i === b && c === "'") {
          i = j + 1;
          q = c;
        } else if (c === '.' && !b) {
          if (j > i) {
            push();
          } else {
            i = j + 1;
          }
        } else if (c === '[') {
          if (j > i) push();
          b = i = j + 1;
        } else if (c === ']') {
          if (!b) error('Access path missing open bracket: ' + p);
          if (b > 0) push();
          b = 0;
          i = j + 1;
        }
      }

      if (b) error('Access path missing closing bracket: ' + p);
      if (q) error('Access path missing closing quote: ' + p);

      if (j > i) {
        j++;
        push();
      }

      return path;
    }

    function field(field, name, opt) {
      const path = splitAccessPath(field);
      field = path.length === 1 ? path[0] : field;
      return accessor((opt && opt.get || getter)(path), [field], name || field);
    }

    field('id');
    accessor(_ => _, [], 'identity');
    accessor(() => 0, [], 'zero');
    accessor(() => 1, [], 'one');
    accessor(() => true, [], 'true');
    accessor(() => false, [], 'false');

    var isArray = Array.isArray;

    function isObject(_) {
      return _ === Object(_);
    }

    function isString(_) {
      return typeof _ === 'string';
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    /**
     * Format the value to be shown in the tooltip.
     *
     * @param value The value to show in the tooltip.
     * @param valueToHtml Function to convert a single cell value to an HTML string
     */


    function formatValue(value, valueToHtml, maxDepth) {
      if (isArray(value)) {
        return "[".concat(value.map(v => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', '), "]");
      }
      //cc
      const exclude_con = ["value","O_Value","Row_Value","None","Xstr","Count", "Ystr", "Cstr", "SortX_Value","Stroke_Value", "X_Value","Y_Value","Color_Value","Opacity_Value","Size_Value","Row_Valueu","Col_Value"];


      if (isObject(value)) {
        let content = '';

        const _a = value,
              {
          title,
          image
        } = _a,
              rest = __rest(_a, ["title", "image"]);

        if (title) {
          content += "<h2>".concat(valueToHtml(title), "</h2>");
        }

        if (image) {
          content += "<img src=\"".concat(valueToHtml(image), "\">");
        }

        const keys = Object.keys(rest);

        if (keys.length > 0) {
          content += '<table>';

          for (const key of keys) {
            let val = rest[key]; // ignore undefined properties
            if (exclude_con.includes(key)) {continue} //cc
            if (val === undefined) {
              continue;
            }

            if (isObject(val)) {
              val = stringify(val, maxDepth);
            }

            content += "<tr><td class=\"key\">".concat(valueToHtml(key), ":</td><td class=\"value\">").concat(valueToHtml(val), "</td></tr>");
          }

          content += "</table>";
        }

        return content || '{}'; // show empty object if there are no properties
      }

      return valueToHtml(value);
    }

    function replacer(maxDepth) {
      const stack = [];
      return function (key, value) {
        if (typeof value !== 'object' || value === null) {
          return value;
        }

        const pos = stack.indexOf(this) + 1;
        stack.length = pos;

        if (stack.length > maxDepth) {
          return '[Object]';
        }

        if (stack.indexOf(value) >= 0) {
          return '[Circular]';
        }

        stack.push(value);
        return value;
      };
    }
    /**
     * Stringify any JS object to valid JSON
     */


    function stringify(obj, maxDepth) {
      return JSON.stringify(obj, replacer(maxDepth));
    } // generated with build-style.sh


    var defaultStyle = "#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: small;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black; }\n  #vg-tooltip-element.visible {\n    visibility: visible; }\n  #vg-tooltip-element h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: small; }\n  #vg-tooltip-element img {\n    max-width: 200px;\n    max-height: 200px; }\n  #vg-tooltip-element table {\n    border-spacing: 0; }\n    #vg-tooltip-element table tr {\n      border: none; }\n      #vg-tooltip-element table tr td {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-top: 2px;\n        padding-bottom: 2px; }\n        #vg-tooltip-element table tr td.key {\n          color: #808080;\n          max-width: 150px;\n          text-align: right;\n          padding-right: 4px; }\n        #vg-tooltip-element table tr td.value {\n          display: block;\n          max-width: 300px;\n          max-height: 7em;\n          text-align: left; }\n  #vg-tooltip-element.dark-theme {\n    background-color: rgba(32, 32, 32, 0.9);\n    border: 1px solid #f5f5f5;\n    color: white; }\n    #vg-tooltip-element.dark-theme td.key {\n      color: #bfbfbf; }\n";
    const EL_ID = 'vg-tooltip-element';
    const DEFAULT_OPTIONS = {
      /**
       * X offset.
       */
      offsetX: 10,

      /**
       * Y offset.
       */
      offsetY: 10,

      /**
       * ID of the tooltip element.
       */
      id: EL_ID,

      /**
       * ID of the tooltip CSS style.
       */
      styleId: 'vega-tooltip-style',

      /**
       * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
       *
       * There are two predefined themes: "light" (default) and "dark".
       */
      theme: 'light',

      /**
       * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
       */
      disableDefaultStyle: false,

      /**
       * HTML sanitizer function that removes dangerous HTML to prevent XSS.
       *
       * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
       */
      sanitize: escapeHTML,

      /**
       * The maximum recursion depth when printing objects in the tooltip.
       */
      maxDepth: 2,

      /**
       * A function to customize the rendered HTML of the tooltip.
       * @param value A value string, or object of value strings keyed by field
       * @param sanitize The `sanitize` function from `options.sanitize`
       * @returns {string} The returned string will become the `innerHTML` of the tooltip element
       */
      formatTooltip: formatValue
    };
    /**
     * Escape special HTML characters.
     *
     * @param value A value to convert to string and HTML-escape.
     */

    function escapeHTML(value) {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    }

    function createDefaultStyle(id) {
      // Just in case this id comes from a user, ensure these is no security issues
      if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
        throw new Error('Invalid HTML ID');
      }

      return defaultStyle.toString().replace(EL_ID, id);
    }
    /**
     * Position the tooltip
     *
     * @param event The mouse event.
     * @param tooltipBox
     * @param offsetX Horizontal offset.
     * @param offsetY Vertical offset.
     */


    function calculatePosition(event, tooltipBox, offsetX, offsetY) {
      let x = event.clientX + offsetX;

      if (x + tooltipBox.width > window.innerWidth) {
        x = +event.clientX - offsetX - tooltipBox.width;
      }

      let y = event.clientY + offsetY;

      if (y + tooltipBox.height > window.innerHeight) {
        y = +event.clientY - offsetY - tooltipBox.height;
      }

      return {
        x,
        y
      };
    }
    /**
     * The tooltip handler class.
     */


    class Handler {
      /**
       * Create the tooltip handler and initialize the element and style.
       *
       * @param options Tooltip Options
       */
      constructor(options) {
        this.options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        const elementId = this.options.id;
        this.el = null; // bind this to call

        this.call = this.tooltipHandler.bind(this); // prepend a default stylesheet for tooltips to the head

        if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
          const style = document.createElement('style');
          style.setAttribute('id', this.options.styleId);
          style.innerHTML = createDefaultStyle(elementId);
          const head = document.head;

          if (head.childNodes.length > 0) {
            head.insertBefore(style, head.childNodes[0]);
          } else {
            head.appendChild(style);
          }
        }
      }
      /**
       * The tooltip handler function.
       */


      tooltipHandler(handler, event, item, value) {
        // console.log(handler, event, item, value);
        var _a; // append a div element that we use as a tooltip unless it already exists


        this.el = document.getElementById(this.options.id);

        if (!this.el) {
          this.el = document.createElement('div');
          this.el.setAttribute('id', this.options.id);
          this.el.classList.add('vg-tooltip');
          document.body.appendChild(this.el);
        }

        const tooltipContainer = (_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.body;
        tooltipContainer.appendChild(this.el); // hide tooltip for null, undefined, or empty string values

        if (value == null || value === '') {
          this.el.classList.remove('visible', "".concat(this.options.theme, "-theme"));
          return;
        } // set the tooltip content


        this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth); // make the tooltip visible

        this.el.classList.add('visible', "".concat(this.options.theme, "-theme"));
        const {
          x,
          y
        } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
        this.el.setAttribute('style', "top: ".concat(y, "px; left: ").concat(x, "px"));
      }

    }

    /**
     * Open editor url in a new window, and pass a message.
     */
    function post (window, url, data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const editor = window.open(url);
      const wait = 10000;
      const step = 250;
      const {
        origin
      } = new URL(url); // eslint-disable-next-line no-bitwise

      let count = ~~(wait / step);

      function listen(evt) {
        if (evt.source === editor) {
          count = 0;
          window.removeEventListener('message', listen, false);
        }
      }

      window.addEventListener('message', listen, false); // send message
      // periodically resend until ack received or timeout

      function send() {
        if (count <= 0) {
          return;
        }

        editor.postMessage(data, origin);
        setTimeout(send, step);
        count -= 1;
      }

      setTimeout(send, step);
    }

    // generated with build-style.sh
    var embedStyle = ".vega-embed {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n}\n.vega-embed.has-actions {\n  padding-right: 38px;\n}\n.vega-embed details:not([open]) > :not(summary) {\n  display: none !important;\n}\n.vega-embed summary {\n  list-style: none;\n  position: absolute;\n  top: 5px;\n  right: 24px;\n  padding: 6px;\n  z-index: 1000;\n  background: white;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n  color: #1b1e23;\n  border: 1px solid #aaa;\n  border-radius: 999px;\n  opacity: 0.2;\n  transition: opacity 0.4s ease-in;\n  outline: none;\n  cursor: pointer;\n  line-height: 0px;\n}\n.vega-embed summary::-webkit-details-marker {\n  display: none;\n}\n.vega-embed summary:active {\n  box-shadow: #aaa 0px 0px 0px 1px inset;\n}\n.vega-embed summary svg {\n  width: 20px;\n  height: 20px;\n}\n.vega-embed details[open] summary {\n  opacity: 0.7;\n}\n.vega-embed:hover summary, .vega-embed:focus summary {\n  opacity: 1 !important;\n  transition: opacity 0.2s ease;\n}\n.vega-embed .vega-actions {\n  position: absolute;\n  z-index: 1001;\n  top: 35px;\n  right: -9px;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 8px;\n  padding-top: 8px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n  border: 1px solid #d9d9d9;\n  background: white;\n  animation-duration: 0.15s;\n  animation-name: scale-in;\n  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);\n  text-align: left;\n}\n.vega-embed .vega-actions a {\n  padding: 4px 8px;\n  font-family: sans-serif;\n  font-size: small;\n  font-weight: 600;\n  white-space: nowrap;\n  color: #434a56;\n  text-decoration: none;\n}\n.vega-embed .vega-actions a:hover {\n  background-color: #f7f7f9;\n  color: black;\n}\n.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n}\n.vega-embed .vega-actions::before {\n  left: auto;\n  right: 14px;\n  top: -16px;\n  border: 8px solid #0000;\n  border-bottom-color: #d9d9d9;\n}\n.vega-embed .vega-actions::after {\n  left: auto;\n  right: 15px;\n  top: -14px;\n  border: 7px solid #0000;\n  border-bottom-color: #fff;\n}\n.vega-embed .chart-wrapper.fit-x {\n  width: 100%;\n}\n.vega-embed .chart-wrapper.fit-y {\n  height: 100%;\n}\n\n.vega-embed-wrapper {\n  max-width: 100%;\n  overflow: auto;\n  padding-right: 14px;\n}\n\n@keyframes scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n";

    if (!String.prototype.startsWith) {
      // eslint-disable-next-line no-extend-native,func-names
      String.prototype.startsWith = function (search, pos) {
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      };
    }

    function isURL(s) {
      return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//');
    }
    function mergeDeep(dest) {
      for (var _len = arguments.length, src = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        src[_key - 1] = arguments[_key];
      }

      for (const s of src) {
        deepMerge_(dest, s);
      }

      return dest;
    }

    function deepMerge_(dest, src) {
      for (const property of Object.keys(src)) {
        vegaImport.writeConfig(dest, property, src[property], true);
      }
    }

    var name = "vega-embed";
    var version$1 = "6.20.2";
    var description = "Publish Vega visualizations as embedded web components.";
    var keywords = ["vega", "data", "visualization", "component", "embed"];
    var repository = {
      type: "git",
      url: "http://github.com/vega/vega-embed.git"
    };
    var author = {
      name: "UW Interactive Data Lab",
      url: "http://idl.cs.washington.edu"
    };
    var contributors = [{
      name: "Dominik Moritz",
      url: "https://www.domoritz.de"
    }];
    var bugs = {
      url: "https://github.com/vega/vega-embed/issues"
    };
    var homepage = "https://github.com/vega/vega-embed#readme";
    var license = "BSD-3-Clause";
    var main = "build/vega-embed.js";
    var module = "build/vega-embed.module.js";
    var unpkg = "build/vega-embed.min.js";
    var jsdelivr = "build/vega-embed.min.js";
    var types = "build/vega-embed.module.d.ts";
    var files = ["src", "build", "build-es5"];
    var devDependencies = {
      "@auto-it/conventional-commits": "^10.32.2",
      "@auto-it/first-time-contributor": "^10.32.2",
      "@rollup/plugin-commonjs": "21.0.1",
      "@rollup/plugin-json": "^4.1.0",
      "@rollup/plugin-node-resolve": "^13.0.6",
      "@types/semver": "^7.3.9",
      "rollup-plugin-ts": "^1.4.7",
      auto: "^10.32.2",
      "browser-sync": "^2.27.7",
      concurrently: "^6.4.0",
      "del-cli": "^4.0.1",
      "jest-canvas-mock": "^2.3.1",
      sass: "^1.43.4",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-terser": "^7.0.2",
      rollup: "2.60.0",
      typescript: "^4.4.4",
      "vega-lite-dev-config": "^0.20.0",
      "vega-lite": "^5.0.0",
      vega: "^5.21.0"
    };
    var peerDependencies = {
      vega: "^5.20.2",
      "vega-lite": "*"
    };
    var dependencies = {
      "fast-json-patch": "^3.1.0",
      "json-stringify-pretty-compact": "^3.0.0",
      semver: "^7.3.5",
      tslib: "^2.3.1",
      "vega-interpreter": "^1.0.4",
      "vega-schema-url-parser": "^2.2.0",
      "vega-themes": "^2.10.0",
      "vega-tooltip": "^0.27.0"
    };
    var scripts = {
      prebuild: "yarn clean && yarn build:style",
      build: "rollup -c",
      "build:style": "./build-style.sh",
      clean: "del-cli build build-es5 src/style.ts",
      prepublishOnly: "yarn clean && yarn build",
      preversion: "yarn lint && yarn test",
      serve: "browser-sync start --directory -s -f build *.html",
      start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
      pretest: "yarn build:style",
      test: "beemo jest --stdio stream",
      "test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
      prepare: "beemo create-config",
      prettierbase: "beemo prettier '*.{css,scss,html}'",
      eslintbase: "beemo eslint .",
      format: "yarn eslintbase --fix && yarn prettierbase --write",
      lint: "yarn eslintbase && yarn prettierbase --check",
      release: "auto shipit"
    };
    var pkg = {
      name: name,
      version: version$1,
      description: description,
      keywords: keywords,
      repository: repository,
      author: author,
      contributors: contributors,
      bugs: bugs,
      homepage: homepage,
      license: license,
      main: main,
      module: module,
      unpkg: unpkg,
      jsdelivr: jsdelivr,
      types: types,
      files: files,
      devDependencies: devDependencies,
      peerDependencies: peerDependencies,
      dependencies: dependencies,
      scripts: scripts
    };

    var _w$vl;
    const version = pkg.version;
    const vega = vegaImport__namespace;
    let vegaLite = vegaLiteImport__namespace; // For backwards compatibility with Vega-Lite before v4.

    const w = typeof window !== 'undefined' ? window : undefined;

    if (vegaLite === undefined && w !== null && w !== void 0 && (_w$vl = w.vl) !== null && _w$vl !== void 0 && _w$vl.compile) {
      vegaLite = w.vl;
    }

    const DEFAULT_ACTIONS = {
      export: {
        svg: true,
        png: true
      },
      source: true,
      compiled: true,
      editor: true
    };
    const I18N = {
      CLICK_TO_VIEW_ACTIONS: 'Click To Export Pics/Data', //cc
      COMPILED_ACTION: 'View Compiled Vega',
      EDITOR_ACTION: 'Open in Vega Editor',
      PNG_ACTION: 'Save as PNG',
      CSV_ACTION: 'Export as CSV',//cc
      SOURCE_ACTION: 'View Source',
      SVG_ACTION: 'Save as SVG'
    };
    const NAMES = {
      vega: 'Vega',
      'vega-lite': 'Vega-Lite'
    };
    const VERSION = {
      vega: vega.version,
      'vega-lite': vegaLite ? vegaLite.version : 'not available'
    };
    const PREPROCESSOR = {
      vega: vgSpec => vgSpec,
      'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, {
        config: config
      }).spec
    };
    const SVG_CIRCLES = "\n<svg viewBox=\"0 0 16 16\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle r=\"2\" cy=\"8\" cx=\"2\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"8\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"14\"></circle>\n</svg>";
    const CHART_WRAPPER_CLASS = 'chart-wrapper';

    function isTooltipHandler(h) {
      return typeof h === 'function';
    }

    function viewSource(source, sourceHeader, sourceFooter, mode) {
      const header = "<html><head>".concat(sourceHeader, "</head><body><pre><code class=\"json\">");
      const footer = "</code></pre>".concat(sourceFooter, "</body></html>"); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      const win = window.open('');
      win.document.write(header + source + footer);
      win.document.title = "".concat(NAMES[mode], " JSON Source");
    }
    /**
     * Try to guess the type of spec.
     *
     * @param spec Vega or Vega-Lite spec.
     */


    function guessMode(spec, providedMode) {
      // Decide mode
      if (spec.$schema) {
        const parsed = e(spec.$schema);

        if (providedMode && providedMode !== parsed.library) {
          var _NAMES$providedMode;

          console.warn("The given visualization spec is written in ".concat(NAMES[parsed.library], ", but mode argument sets ").concat((_NAMES$providedMode = NAMES[providedMode]) !== null && _NAMES$providedMode !== void 0 ? _NAMES$providedMode : providedMode, "."));
        }

        const mode = parsed.library;

        if (!satisfies_1(VERSION[mode], "^".concat(parsed.version.slice(1)))) {
          console.warn("The input spec uses ".concat(NAMES[mode], " ").concat(parsed.version, ", but the current version of ").concat(NAMES[mode], " is v").concat(VERSION[mode], "."));
        }

        return mode;
      } // try to guess from the provided spec


      if ('mark' in spec || 'encoding' in spec || 'layer' in spec || 'hconcat' in spec || 'vconcat' in spec || 'facet' in spec || 'repeat' in spec) {
        return 'vega-lite';
      }

      if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
        return 'vega';
      }

      return providedMode !== null && providedMode !== void 0 ? providedMode : 'vega';
    }

    function isLoader(o) {
      return !!(o && 'load' in o);
    }

    function createLoader(opts) {
      return isLoader(opts) ? opts : vega.loader(opts);
    }

    function embedOptionsFromUsermeta(parsedSpec) {
      var _ref;

      return (_ref = parsedSpec.usermeta && parsedSpec.usermeta.embedOptions) !== null && _ref !== void 0 ? _ref : {};
    }
    /**
     * Embed a Vega visualization component in a web page. This function returns a promise.
     *
     * @param el        DOM element in which to place component (DOM node or CSS selector).
     * @param spec      String : A URL string from which to load the Vega specification.
     *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
     * @param opts       A JavaScript object containing options for embedding.
     */


    async function embed(el, spec) {
      var _parsedOpts$config, _usermetaOpts$config;

      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let parsedSpec;
      let loader;

      if (vegaImport.isString(spec)) {
        loader = createLoader(opts.loader);
        parsedSpec = JSON.parse(await loader.load(spec));
      } else {
        parsedSpec = spec;
      }

      const usermetaLoader = embedOptionsFromUsermeta(parsedSpec).loader; // either create the loader for the first time or create a new loader if the spec has new loader options

      if (!loader || usermetaLoader) {
        var _opts$loader;

        loader = createLoader((_opts$loader = opts.loader) !== null && _opts$loader !== void 0 ? _opts$loader : usermetaLoader);
      }

      const usermetaOpts = await loadOpts(embedOptionsFromUsermeta(parsedSpec), loader);
      const parsedOpts = await loadOpts(opts, loader);
      const mergedOpts = { ...mergeDeep(parsedOpts, usermetaOpts),
        config: vegaImport.mergeConfig((_parsedOpts$config = parsedOpts.config) !== null && _parsedOpts$config !== void 0 ? _parsedOpts$config : {}, (_usermetaOpts$config = usermetaOpts.config) !== null && _usermetaOpts$config !== void 0 ? _usermetaOpts$config : {})
      };
      return await _embed(el, parsedSpec, mergedOpts, loader);
    }

    async function loadOpts(opt, loader) {
      var _opt$config;

      const config = vegaImport.isString(opt.config) ? JSON.parse(await loader.load(opt.config)) : (_opt$config = opt.config) !== null && _opt$config !== void 0 ? _opt$config : {};
      const patch = vegaImport.isString(opt.patch) ? JSON.parse(await loader.load(opt.patch)) : opt.patch;
      return { ...opt,
        ...(patch ? {
          patch
        } : {}),
        ...(config ? {
          config
        } : {})
      };
    }

    function getRoot(el) {
      var _document$head;

      const possibleRoot = el.getRootNode ? el.getRootNode() : document;
      return possibleRoot instanceof ShadowRoot ? {
        root: possibleRoot,
        rootContainer: possibleRoot
      } : {
        root: document,
        rootContainer: (_document$head = document.head) !== null && _document$head !== void 0 ? _document$head : document.body
      };
    }

    async function _embed(el, spec) {
      var _opts$config, _opts$actions, _opts$renderer, _opts$logLevel, _opts$downloadFileNam, _ref2, _vega$expressionInter;

      let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      let loader = arguments.length > 3 ? arguments[3] : undefined;
      const config = opts.theme ? vegaImport.mergeConfig(themes[opts.theme], (_opts$config = opts.config) !== null && _opts$config !== void 0 ? _opts$config : {}) : opts.config;
      const actions = vegaImport.isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, (_opts$actions = opts.actions) !== null && _opts$actions !== void 0 ? _opts$actions : {});
      const i18n = { ...I18N,
        ...opts.i18n
      };
      const renderer = (_opts$renderer = opts.renderer) !== null && _opts$renderer !== void 0 ? _opts$renderer : 'canvas';
      const logLevel = (_opts$logLevel = opts.logLevel) !== null && _opts$logLevel !== void 0 ? _opts$logLevel : vega.Warn;
      const downloadFileName = (_opts$downloadFileNam = opts.downloadFileName) !== null && _opts$downloadFileNam !== void 0 ? _opts$downloadFileNam : 'visualization';
      const element = typeof el === 'string' ? document.querySelector(el) : el;

      if (!element) {
        throw new Error("".concat(el, " does not exist"));
      }

      if (opts.defaultStyle !== false) {
        // Add a default stylesheet to the head of the document.
        const ID = 'vega-embed-style';
        const {
          root,
          rootContainer
        } = getRoot(element);

        if (!root.getElementById(ID)) {
          const style = document.createElement('style');
          style.id = ID;
          style.innerText = opts.defaultStyle === undefined || opts.defaultStyle === true ? (embedStyle ).toString() : opts.defaultStyle;
          rootContainer.appendChild(style);
        }
      }

      const mode = guessMode(spec, opts.mode);
      let vgSpec = PREPROCESSOR[mode](spec, config);

      if (mode === 'vega-lite') {
        if (vgSpec.$schema) {
          const parsed = e(vgSpec.$schema);

          if (!satisfies_1(VERSION.vega, "^".concat(parsed.version.slice(1)))) {
            console.warn("The compiled spec uses Vega ".concat(parsed.version, ", but current version is v").concat(VERSION.vega, "."));
          }
        }
      }

      element.classList.add('vega-embed');

      if (actions) {
        element.classList.add('has-actions');
      }

      element.innerHTML = ''; // clear container

      let container = element;

      if (actions) {
        const chartWrapper = document.createElement('div');
        chartWrapper.classList.add(CHART_WRAPPER_CLASS);
        element.appendChild(chartWrapper);
        container = chartWrapper;
      }

      const patch = opts.patch;

      if (patch) {
        vgSpec = patch instanceof Function ? patch(vgSpec) : applyPatch(vgSpec, patch, true, false).newDocument;
      } // Set locale. Note that this is a global setting.


      if (opts.formatLocale) {
        vega.formatLocale(opts.formatLocale);
      }

      if (opts.timeFormatLocale) {
        vega.timeFormatLocale(opts.timeFormatLocale);
      }

      const {
        ast
      } = opts; // Do not apply the config to Vega when we have already applied it to Vega-Lite.
      // This call may throw an Error if parsing fails.

      const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, {
        ast
      });
      const view = new (opts.viewClass || vega.View)(runtime, {
        loader,
        logLevel,
        renderer,
        ...(ast ? {
          expr: (_ref2 = (_vega$expressionInter = vega.expressionInterpreter) !== null && _vega$expressionInter !== void 0 ? _vega$expressionInter : opts.expr) !== null && _ref2 !== void 0 ? _ref2 : expression
        } : {})
      });
      view.addSignalListener('autosize', (_, autosize) => {
        const {
          type
        } = autosize;

        if (type == 'fit-x') {
          container.classList.add('fit-x');
          container.classList.remove('fit-y');
        } else if (type == 'fit-y') {
          container.classList.remove('fit-x');
          container.classList.add('fit-y');
        } else if (type == 'fit') {
          container.classList.add('fit-x', 'fit-y');
        } else {
          container.classList.remove('fit-x', 'fit-y');
        }
      });

      if (opts.tooltip !== false) {
        const handler = isTooltipHandler(opts.tooltip) ? opts.tooltip : // user provided boolean true or tooltip options
        new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
        view.tooltip(handler);
      }

      let {
        hover
      } = opts;

      if (hover === undefined) {
        hover = mode === 'vega';
      }

      if (hover) {
        const {
          hoverSet,
          updateSet
        } = typeof hover === 'boolean' ? {} : hover;
        view.hover(hoverSet, updateSet);
      }

      if (opts) {
        if (opts.width != null) {
          view.width(opts.width);
        }

        if (opts.height != null) {
          view.height(opts.height);
        }

        if (opts.padding != null) {
          view.padding(opts.padding);
        }
      }

      await view.initialize(container, opts.bind).runAsync();
      let documentClickHandler;

      if (actions !== false) {
        let wrapper = element;

        if (opts.defaultStyle !== false) {
          const details = document.createElement('details');
          details.title = i18n.CLICK_TO_VIEW_ACTIONS;
          element.append(details);
          wrapper = details;
          const summary = document.createElement('summary');
          summary.setAttribute("aria-label", "Export Picture/Data");  
          summary.setAttribute("data-crossextip-position", "left");
          summary.setAttribute("style", "position:absolute;font-size: small;");
          summary.setAttribute("role", "tooltip");    
          summary.innerHTML = SVG_CIRCLES;
          details.append(summary);

          documentClickHandler = ev => {
            if (!details.contains(ev.target)) {
              details.removeAttribute('open');
            }
          };

          document.addEventListener('click', documentClickHandler);
        }

        const ctrl = document.createElement('div');
        wrapper.append(ctrl);
        ctrl.classList.add('vega-actions'); // add 'Export' action
        if (actions === true || actions.csv == true) {
          const exportCSVLink = document.createElement('a');
          exportCSVLink.text = i18n.CSV_ACTION;
          exportCSVLink.href = '#';
          exportCSVLink.addEventListener('mousedown', async function (e) {
            var ds=await view.data('mydata');
            json2csv('crossex.csv',ds)
          });          
          ctrl.append(exportCSVLink);
        }   
        if (actions === true || actions.export !== false) {
          for (const ext of ['svg', 'png']) {
            if (actions === true || actions.export === true || actions.export[ext]) {
              const i18nExportAction = i18n["".concat(ext.toUpperCase(), "_ACTION")];
              const exportLink = document.createElement('a');
              exportLink.text = i18nExportAction;
              exportLink.href = '#';
              exportLink.target = '_blank';
              exportLink.download = "".concat(downloadFileName, ".").concat(ext); // add link on mousedown so that it's correct when the click happens

              exportLink.addEventListener('mousedown', async function (e) {
                e.preventDefault();
                const url = await view.toImageURL(ext, opts.scaleFactor);
                this.href = url;
              });
              ctrl.append(exportLink);
            }
          }
        } // add 'View Source' action


        if (actions === true || actions.source !== false) {
          const viewSourceLink = document.createElement('a');
          viewSourceLink.text = i18n.SOURCE_ACTION;
          viewSourceLink.href = '#';
          viewSourceLink.addEventListener('click', function (e) {
            var _opts$sourceHeader, _opts$sourceFooter;

            viewSource(jsonStringifyPrettyCompact(spec), (_opts$sourceHeader = opts.sourceHeader) !== null && _opts$sourceHeader !== void 0 ? _opts$sourceHeader : '', (_opts$sourceFooter = opts.sourceFooter) !== null && _opts$sourceFooter !== void 0 ? _opts$sourceFooter : '', mode);
            e.preventDefault();
          });
          ctrl.append(viewSourceLink);
        } // add 'View Compiled' action


        if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
          const compileLink = document.createElement('a');
          compileLink.text = i18n.COMPILED_ACTION;
          compileLink.href = '#';
          compileLink.addEventListener('click', function (e) {
            var _opts$sourceHeader2, _opts$sourceFooter2;

            viewSource(jsonStringifyPrettyCompact(vgSpec), (_opts$sourceHeader2 = opts.sourceHeader) !== null && _opts$sourceHeader2 !== void 0 ? _opts$sourceHeader2 : '', (_opts$sourceFooter2 = opts.sourceFooter) !== null && _opts$sourceFooter2 !== void 0 ? _opts$sourceFooter2 : '', 'vega');
            e.preventDefault();
          });
          ctrl.append(compileLink);
        } // add 'Open in Vega Editor' action


        if (actions === true || actions.editor !== false) {
          var _opts$editorUrl;

          const editorUrl = (_opts$editorUrl = opts.editorUrl) !== null && _opts$editorUrl !== void 0 ? _opts$editorUrl : 'https://vega.github.io/editor/';
          const editorLink = document.createElement('a');
          editorLink.text = i18n.EDITOR_ACTION;
          editorLink.href = '#';
          editorLink.addEventListener('click', function (e) {
            post(window, editorUrl, {
              config: config,
              mode,
              renderer,
              spec: jsonStringifyPrettyCompact(spec)
            });
            e.preventDefault();
          });
          ctrl.append(editorLink);
        }
      }

      function finalize() {
        if (documentClickHandler) {
          document.removeEventListener('click', documentClickHandler);
        }

        view.finalize();
      }

      return {
        view,
        spec,
        vgSpec,
        finalize
      };
    }

    /**
     * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
     * The element has a value property with the view. By default all actions except for the editor action are disabled.
     *
     * The main use case is in [Observable](https://observablehq.com/).
     */

    async function container (spec) {
      var _opt$actions;

      let opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const wrapper = document.createElement('div');
      wrapper.classList.add('vega-embed-wrapper');
      const div = document.createElement('div');
      wrapper.appendChild(div);
      const actions = opt.actions === true || opt.actions === false ? opt.actions : {
        export: true,
        source: false,
        compiled: true,
        editor: true,
        ...((_opt$actions = opt.actions) !== null && _opt$actions !== void 0 ? _opt$actions : {})
      };
      const result = await embed(div, spec, {
        actions,
        ...(opt !== null && opt !== void 0 ? opt : {})
      });
      wrapper.value = result.view;
      return wrapper;
    }

    /**
     * Returns true if the object is an HTML element.
     */

    function isElement(obj) {
      return obj instanceof HTMLElement;
    }

    const wrapper = function () {
      if (arguments.length > 1 && (vegaImport.isString(arguments.length <= 0 ? undefined : arguments[0]) && !isURL(arguments.length <= 0 ? undefined : arguments[0]) || isElement(arguments.length <= 0 ? undefined : arguments[0]) || arguments.length === 3)) {
        return embed(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
      }

      return container(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    };

    wrapper.vegaLite = vegaLite;
    wrapper.vl = vegaLite; // backwards compatibility

    wrapper.container = container;
    wrapper.embed = embed;
    wrapper.vega = vega;
    wrapper.default = embed;
    wrapper.version = version;

    return wrapper;

}));


function util() {}

var FNAME = '__util__';

util.namedfunc = function(name, f) { return (f[FNAME] = name, f); };

util.name = function(f) { return f==null ? null : f[FNAME]; };

util.identity = function(x) { return x; };

util.true = util.namedfunc('true', function() { return true; });

util.false = util.namedfunc('false', function() { return false; });

util.duplicate = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

util.equal = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

util.extend = function(obj) {
  for (var x, name, i=1, len=arguments.length; i<len; ++i) {
    x = arguments[i];
    for (name in x) { obj[name] = x[name]; }
  }
  return obj;
};

util.length = function(x) {
  return x != null && x.length != null ? x.length : null;
};

util.keys = function(x) {
  var keys = [], k;
  for (k in x) keys.push(k);
  return keys;
};

util.vals = function(x) {
  var vals = [], k;
  for (k in x) vals.push(x[k]);
  return vals;
};

util.toMap = function(list, f) {
  return (f = util.$(f)) ?
    list.reduce(function(obj, x) { return (obj[f(x)] = 1, obj); }, {}) :
    list.reduce(function(obj, x) { return (obj[x] = 1, obj); }, {});
};

util.keystr = function(values) {
  // use to ensure consistent key generation across modules
  var n = values.length;
  if (!n) return '';
  for (var s=String(values[0]), i=1; i<n; ++i) {
    s += '|' + String(values[i]);
  }
  return s;
};

// type checking functions

var toString = Object.prototype.toString;

util.isObject = function(obj) {
  return obj === Object(obj);
};

util.isFunction = function(obj) {
  return toString.call(obj) === '[object Function]';
};

util.isString = function(obj) {
  return typeof value === 'string' || toString.call(obj) === '[object String]';
};

util.isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

util.isNumber = function(obj) {
  return typeof obj === 'number' || toString.call(obj) === '[object Number]';
};

util.isBoolean = function(obj) {
  return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
};

util.isDate = function(obj) {
  return toString.call(obj) === '[object Date]';
};

util.isValid = function(obj) {
  return obj != null && obj === obj;
};

util.isBuffer = (typeof Buffer === 'function' && Buffer.isBuffer) || util.false;

// type coercion functions

util.number = function(s) {
  return s == null || s === '' ? null : +s;
};

util.boolean = function(s) {
  return s == null || s === '' ? null : s==='false' ? false : !!s;
};

// parse a date with optional d3.time-format format
util.date = function(s, format) {
  var d = format ? format : Date;
  return s == null || s === '' ? null : d.parse(s);
};

util.array = function(x) {
  return x != null ? (util.isArray(x) ? x : [x]) : [];
};

util.str = function(x) {
  return util.isArray(x) ? '[' + x.map(util.str) + ']'
    : util.isObject(x) || util.isString(x) ?
      // Output valid JSON and JS source strings.
      // See http://timelessrepo.com/json-isnt-a-javascript-subset
      JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
    : x;
};

// data access functions

var field_re = /\[(.*?)\]|[^.\[]+/g;

util.field = function(f) {
  return String(f).match(field_re).map(function(d) {
    return d[0] !== '[' ? d :
      d[1] !== "'" && d[1] !== '"' ? d.slice(1, -1) :
      d.slice(2, -2).replace(/\\(["'])/g, '$1');
  });
};

util.accessor = function(f) {
  /* jshint evil: true */
  return f==null || util.isFunction(f) ? f :
    util.namedfunc(f, Function('x', 'return x[' + util.field(f).map(util.str).join('][') + '];'));
};

// short-cut for accessor
util.$ = util.accessor;

util.mutator = function(f) {
  var s;
  return util.isString(f) && (s=util.field(f)).length > 1 ?
    function(x, v) {
      for (var i=0; i<s.length-1; ++i) x = x[s[i]];
      x[s[i]] = v;
    } :
    function(x, v) { x[f] = v; };
};


util.$func = function(name, op) {
  return function(f) {
    f = util.$(f) || util.identity;
    var n = name + (util.name(f) ? '_'+util.name(f) : '');
    return util.namedfunc(n, function(d) { return op(f(d)); });
  };
};

util.$valid  = util.$func('valid', util.isValid);
util.$length = util.$func('length', util.length);

util.$in = function(f, values) {
  f = util.$(f);
  var map = util.isArray(values) ? util.toMap(values) : values;
  return function(d) { return !!map[f(d)]; };
};

// comparison / sorting functions

util.comparator = function(sort) {
  var sign = [];
  if (sort === undefined) sort = [];
  sort = util.array(sort).map(function(f) {
    var s = 1;
    if      (f[0] === '-') { s = -1; f = f.slice(1); }
    else if (f[0] === '+') { s = +1; f = f.slice(1); }
    sign.push(s);
    return util.accessor(f);
  });
  return function(a, b) {
    var i, n, f, c;
    for (i=0, n=sort.length; i<n; ++i) {
      f = sort[i];
      c = util.cmp(f(a), f(b));
      if (c) return c * sign[i];
    }
    return 0;
  };
};

util.cmp = function(a, b) {
  return (a < b || a == null) && b != null ? -1 :
    (a > b || b == null) && a != null ? 1 :
    ((b = b instanceof Date ? +b : b),
     (a = a instanceof Date ? +a : a)) !== a && b === b ? -1 :
    b !== b && a === a ? 1 : 0;
};

util.numcmp = function(a, b) { return a - b; };

util.stablesort = function(array, sortBy, keyFn) {
  var indices = array.reduce(function(idx, v, i) {
    return (idx[keyFn(v)] = i, idx);
  }, {});

  array.sort(function(a, b) {
    var sa = sortBy(a),
        sb = sortBy(b);
    return sa < sb ? -1 : sa > sb ? 1
         : (indices[keyFn(a)] - indices[keyFn(b)]);
  });

  return array;
};

// permutes an array using a Knuth shuffle
util.permute = function(a) {
  var m = a.length,
      swap,
      i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    swap = a[m];
    a[m] = a[i];
    a[i] = swap;
  }
};

// string functions

util.pad = function(s, length, pos, padchar) {
  padchar = padchar || " ";
  var d = length - s.length;
  if (d <= 0) return s;
  switch (pos) {
    case 'left':
      return strrep(d, padchar) + s;
    case 'middle':
    case 'center':
      return strrep(Math.floor(d/2), padchar) +
         s + strrep(Math.ceil(d/2), padchar);
    default:
      return s + strrep(d, padchar);
  }
};

function strrep(n, str) {
  var s = "", i;
  for (i=0; i<n; ++i) s += str;
  return s;
}

util.truncate = function(s, length, pos, word, ellipsis) {
  var len = s.length;
  if (len <= length) return s;
  ellipsis = ellipsis !== undefined ? String(ellipsis) : '\u2026';
  var l = Math.max(0, length - ellipsis.length);

  switch (pos) {
    case 'left':
      return ellipsis + (word ? truncateOnWord(s,l,1) : s.slice(len-l));
    case 'middle':
    case 'center':
      var l1 = Math.ceil(l/2), l2 = Math.floor(l/2);
      return (word ? truncateOnWord(s,l1) : s.slice(0,l1)) +
        ellipsis + (word ? truncateOnWord(s,l2,1) : s.slice(len-l2));
    default:
      return (word ? truncateOnWord(s,l) : s.slice(0,l)) + ellipsis;
  }
};

function truncateOnWord(s, len, rev) {
  var cnt = 0, tok = s.split(truncate_word_re);
  if (rev) {
    s = (tok = tok.reverse())
      .filter(function(w) { cnt += w.length; return cnt <= len; })
      .reverse();
  } else {
    s = tok.filter(function(w) { cnt += w.length; return cnt <= len; });
  }
  return s.length ? s.join('').trim() : tok[0].slice(0, len);
}

var truncate_word_re = /([\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF])/;

var TYPES = '__types__';

var PARSERS = {
  boolean: util.boolean,
  integer: util.number,
  number:  util.number,
  date:    util.date,
  string:  function(x) { return x == null || x === '' ? null : x + ''; }
};

var TESTS = {
  boolean: function(x) { return x==='true' || x==='false' || util.isBoolean(x); },
  integer: function(x) { return TESTS.number(x) && (x=+x) === ~~x; },
  number: function(x) { return !isNaN(+x) && !util.isDate(x); },
  date: function(x) { return !isNaN(Date.parse(x)); }
};

function annotation(data, types) {
  if (!types) return data && data[TYPES] || null;
  data[TYPES] = types;
}

function fieldNames(datum) {
  return util.keys(datum);
}

function bracket(fieldName) {
  return '[' + fieldName + ']';
}

function type(values, f) {
  values = util.array(values);
  f = util.$(f);
  var v, i, n;

  // if data array has type annotations, use them
  if (values[TYPES]) {
    v = f(values[TYPES]);
    if (util.isString(v)) return v;
  }

  for (i=0, n=values.length; !util.isValid(v) && i<n; ++i) {
    v = f ? f(values[i]) : values[i];
  }

  return util.isDate(v) ? 'date' :
    util.isNumber(v)    ? 'number' :
    util.isBoolean(v)   ? 'boolean' :
    util.isString(v)    ? 'string' : null;
}

function typeAll(data, fields) {
  if (!data.length) return;
  var get = fields ? util.identity : (fields = fieldNames(data[0]), bracket);
  return fields.reduce(function(types, f) {
    return (types[f] = type(data, get(f)), types);
  }, {});
}

function infer(values, f, ignore) {
  values = util.array(values);
  f = util.$(f);
  var i, j, v;

  // types to test for, in precedence order
  var types = ['boolean', 'integer', 'number', 'date'];

  for (i=0; i<values.length; ++i) {
    // get next value to test
    v = f ? f(values[i]) : values[i];
    // test value against remaining types
    for (j=0; j<types.length; ++j) {
      if ((!ignore || !ignore.test(v)) && util.isValid(v) && !TESTS[types[j]](v)) {
        types.splice(j, 1);
        j -= 1;
      }
    }
    // if no types left, return 'string'
    if (types.length === 0) return 'string';
  }

  return types[0];
}

function inferAll(data, fields, ignore) {
  var get = fields ? util.identity : (fields = fieldNames(data[0]), bracket);
  return fields.reduce(function(types, f) {
    types[f] = infer(data, get(f), ignore);
    return types;
  }, {});
}

type.annotation = annotation;
type.all = typeAll;
type.infer = infer;
type.inferAll = inferAll;
type.parsers = PARSERS;



function gen() {}


gen.repeat = function(val, n) {
  var a = Array(n), i;
  for (i=0; i<n; ++i) a[i] = val;
  return a;
};

gen.zeros = function(n) {
  return gen.repeat(0, n);
};

gen.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error('Infinite range');
  var range = [], i = -1, j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};

gen.random = {};

gen.random.uniform = function(min, max) {
  if (max === undefined) {
    max = min === undefined ? 1 : min;
    min = 0;
  }
  var d = max - min;
  var f = function() {
    return min + d * Math.random();
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x >= min && x <= max) ? 1/d : 0;
  };
  f.cdf = function(x) {
    return x < min ? 0 : x > max ? 1 : (x - min) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? min + p*d : NaN;
  };
  return f;
};

gen.random.integer = function(a, b) {
  if (b === undefined) {
    b = a;
    a = 0;
  }
  var d = b - a;
  var f = function() {
    return a + Math.floor(d * Math.random());
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    return (x === Math.floor(x) && x >= a && x < b) ? 1/d : 0;
  };
  f.cdf = function(x) {
    var v = Math.floor(x);
    return v < a ? 0 : v >= b ? 1 : (v - a + 1) / d;
  };
  f.icdf = function(p) {
    return (p >= 0 && p <= 1) ? a - 1 + Math.floor(p*d) : NaN;
  };
  return f;
};

gen.random.normal = function(mean, stdev) {
  mean = mean || 0;
  stdev = stdev || 1;
  var next;
  var f = function() {
    var x = 0, y = 0, rds, c;
    if (next !== undefined) {
      x = next;
      next = undefined;
      return x;
    }
    do {
      x = Math.random()*2-1;
      y = Math.random()*2-1;
      rds = x*x + y*y;
    } while (rds === 0 || rds > 1);
    c = Math.sqrt(-2*Math.log(rds)/rds); // Box-Muller transform
    next = mean + y*c*stdev;
    return mean + x*c*stdev;
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  f.pdf = function(x) {
    var exp = Math.exp(Math.pow(x-mean, 2) / (-2 * Math.pow(stdev, 2)));
    return (1 / (stdev * Math.sqrt(2*Math.PI))) * exp;
  };
  f.cdf = function(x) {
    // Approximation from West (2009)
    // Better Approximations to Cumulative Normal Functions
    var cd,
        z = (x - mean) / stdev,
        Z = Math.abs(z);
    if (Z > 37) {
      cd = 0;
    } else {
      var sum, exp = Math.exp(-Z*Z/2);
      if (Z < 7.07106781186547) {
        sum = 3.52624965998911e-02 * Z + 0.700383064443688;
        sum = sum * Z + 6.37396220353165;
        sum = sum * Z + 33.912866078383;
        sum = sum * Z + 112.079291497871;
        sum = sum * Z + 221.213596169931;
        sum = sum * Z + 220.206867912376;
        cd = exp * sum;
        sum = 8.83883476483184e-02 * Z + 1.75566716318264;
        sum = sum * Z + 16.064177579207;
        sum = sum * Z + 86.7807322029461;
        sum = sum * Z + 296.564248779674;
        sum = sum * Z + 637.333633378831;
        sum = sum * Z + 793.826512519948;
        sum = sum * Z + 440.413735824752;
        cd = cd / sum;
      } else {
        sum = Z + 0.65;
        sum = Z + 4 / sum;
        sum = Z + 3 / sum;
        sum = Z + 2 / sum;
        sum = Z + 1 / sum;
        cd = exp / sum / 2.506628274631;
      }
    }
    return z > 0 ? 1 - cd : cd;
  };
  f.icdf = function(p) {
    // Approximation of Probit function using inverse error function.
    if (p <= 0 || p >= 1) return NaN;
    var x = 2*p - 1,
        v = (8 * (Math.PI - 3)) / (3 * Math.PI * (4-Math.PI)),
        a = (2 / (Math.PI*v)) + (Math.log(1 - Math.pow(x,2)) / 2),
        b = Math.log(1 - (x*x)) / v,
        s = (x > 0 ? 1 : -1) * Math.sqrt(Math.sqrt((a*a) - b) - a);
    return mean + stdev * Math.SQRT2 * s;
  };
  return f;
};

gen.random.bootstrap = function(domain, smooth) {
  // Generates a bootstrap sample from a set of observations.
  // Smooth bootstrapping adds random zero-centered noise to the samples.
  var val = domain.filter(util.isValid),
      len = val.length,
      err = smooth ? gen.random.normal(0, smooth) : null;
  var f = function() {
    return val[~~(Math.random()*len)] + (err ? err() : 0);
  };
  f.samples = function(n) {
    return gen.zeros(n).map(f);
  };
  return f;
};

function stats() {}


// Collect unique values.
// Output: an array of unique values, in first-observed order
stats.unique = function(values, f, results) {
  f = util.$(f);
  results = results || [];
  var u = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    results.push(v);
  }
  return results;
};

// Return the length of the input array.
stats.count = function(values) {
  return values && values.length || 0;
};

// Count the number of non-null, non-undefined, non-NaN values.
stats.count.valid = function(values, f) {
  f = util.$(f);
  var v, i, n, valid = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) valid += 1;
  }
  return valid;
};

// Count the number of null or undefined values.
stats.count.missing = function(values, f) {
  f = util.$(f);
  var v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v == null) count += 1;
  }
  return count;
};

// Count the number of distinct values.
// Null, undefined and NaN are each considered distinct values.
stats.count.distinct = function(values, f) {
  f = util.$(f);
  var u = {}, v, i, n, count = 0;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (v in u) continue;
    u[v] = 1;
    count += 1;
  }
  return count;
};

// Construct a map from distinct values to occurrence counts.
stats.count.map = function(values, f) {
  f = util.$(f);
  var map = {}, v, i, n;
  for (i=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    map[v] = (v in map) ? map[v] + 1 : 1;
  }
  return map;
};

// Compute the median of an array of numbers.
stats.median = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  return stats.quantile(values, 0.5);
};

// Computes the quartile boundaries of an array of numbers.
stats.quartile = function(values, f) {
  if (f) values = values.map(util.$(f));
  values = values.filter(util.isValid).sort(util.cmp);
  var q = stats.quantile;
  return [q(values, 0.25), q(values, 0.50), q(values, 0.75)];
};

// Compute the quantile of a sorted array of numbers.
// Adapted from the D3.js implementation.
stats.quantile = function(values, f, p) {
  if (p === undefined) { p = f; f = util.identity; }
  f = util.$(f);
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = +f(values[h - 1]),
      e = H - h;
  return e ? v + e * (f(values[h]) - v) : v;
};

// Compute the sum of an array of numbers.
stats.sum = function(values, f) {
  f = util.$(f);
  for (var sum=0, i=0, n=values.length, v; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) sum += v;
  }
  return sum;
};

// Compute the mean (average) of an array of numbers.
stats.mean = function(values, f) {
  f = util.$(f);
  var mean = 0, delta, i, n, c, v;
  for (i=0, c=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
    }
  }
  return mean;
};

// Compute the geometric mean of an array of numbers.
stats.mean.geometric = function(values, f) {
  f = util.$(f);
  var mean = 1, c, n, v, i;
  for (i=0, c=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v <= 0) {
        throw Error("Geometric mean only defined for positive values.");
      }
      mean *= v;
      ++c;
    }
  }
  mean = c > 0 ? Math.pow(mean, 1/c) : 0;
  return mean;
};

// Compute the harmonic mean of an array of numbers.
stats.mean.harmonic = function(values, f) {
  f = util.$(f);
  var mean = 0, c, n, v, i;
  for (i=0, c=0, n=values.length; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      mean += 1/v;
      ++c;
    }
  }
  return c / mean;
};

// Compute the sample variance of an array of numbers.
stats.variance = function(values, f) {
  f = util.$(f);
  if (!util.isArray(values) || values.length < 2) return 0;
  var mean = 0, M2 = 0, delta, i, c, v;
  for (i=0, c=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      delta = v - mean;
      mean = mean + delta / (++c);
      M2 = M2 + delta * (v - mean);
    }
  }
  M2 = M2 / (c - 1);
  return M2;
};

// Compute the sample standard deviation of an array of numbers.
stats.stdev = function(values, f) {
  return Math.sqrt(stats.variance(values, f));
};

// Compute the Pearson mode skewness ((median-mean)/stdev) of an array of numbers.
stats.modeskew = function(values, f) {
  var avg = stats.mean(values, f),
      med = stats.median(values, f),
      std = stats.stdev(values, f);
  return std === 0 ? 0 : (avg - med) / std;
};

// Find the minimum value in an array.
stats.min = function(values, f) {
  return stats.extent(values, f)[0];
};

// Find the maximum value in an array.
stats.max = function(values, f) {
  return stats.extent(values, f)[1];
};

// Find the minimum and maximum of an array of values.
stats.extent = function(values, f) {
  f = util.$(f);
  var a, b, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) a = v;
      if (v > b) b = v;
    }
  }
  return [a, b];
};

// Find the integer indices of the minimum and maximum values.
stats.extent.index = function(values, f) {
  f = util.$(f);
  var x = -1, y = -1, a, b, v, i, n = values.length;
  for (i=0; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) { a = b = v; x = y = i; break; }
  }
  for (; i<n; ++i) {
    v = f ? f(values[i]) : values[i];
    if (util.isValid(v)) {
      if (v < a) { a = v; x = i; }
      if (v > b) { b = v; y = i; }
    }
  }
  return [x, y];
};

// Compute the dot product of two arrays of numbers.
stats.dot = function(values, a, b) {
  var sum = 0, i, v;
  if (!b) {
    if (values.length !== a.length) {
      throw Error('Array lengths must match.');
    }
    for (i=0; i<values.length; ++i) {
      v = values[i] * a[i];
      if (v === v) sum += v;
    }
  } else {
    a = util.$(a);
    b = util.$(b);
    for (i=0; i<values.length; ++i) {
      v = a(values[i]) * b(values[i]);
      if (v === v) sum += v;
    }
  }
  return sum;
};

// Compute the vector distance between two arrays of numbers.
// Default is Euclidean (exp=2) distance, configurable via exp argument.
stats.dist = function(values, a, b, exp) {
  var f = util.isFunction(b) || util.isString(b),
      X = values,
      Y = f ? values : a,
      e = f ? exp : b,
      L2 = e === 2 || e == null,
      n = values.length, s = 0, d, i;
  if (f) {
    a = util.$(a);
    b = util.$(b);
  }
  for (i=0; i<n; ++i) {
    d = f ? (a(X[i])-b(Y[i])) : (X[i]-Y[i]);
    s += L2 ? d*d : Math.pow(Math.abs(d), e);
  }
  return L2 ? Math.sqrt(s) : Math.pow(s, 1/e);
};

// Compute the Cohen's d effect size between two arrays of numbers.
stats.cohensd = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      x1 = stats.mean(X),
      x2 = stats.mean(Y),
      n1 = stats.count.valid(X),
      n2 = stats.count.valid(Y);

  if ((n1+n2-2) <= 0) {
    // if both arrays are size 1, or one is empty, there's no effect size
    return 0;
  }
  // pool standard deviation
  var s1 = stats.variance(X),
      s2 = stats.variance(Y),
      s = Math.sqrt((((n1-1)*s1) + ((n2-1)*s2)) / (n1+n2-2));
  // if there is no variance, there's no effect size
  return s===0 ? 0 : (x1 - x2) / s;
};

// Computes the covariance between two arrays of numbers
stats.covariance = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n = X.length,
      xm = stats.mean(X),
      ym = stats.mean(Y),
      sum = 0, c = 0, i, x, y, vx, vy;

  if (n !== Y.length) {
    throw Error('Input lengths must match.');
  }

  for (i=0; i<n; ++i) {
    x = X[i]; vx = util.isValid(x);
    y = Y[i]; vy = util.isValid(y);
    if (vx && vy) {
      sum += (x-xm) * (y-ym);
      ++c;
    } else if (vx || vy) {
      throw Error('Valid values must align.');
    }
  }
  return sum / (c-1);
};

// Compute ascending rank scores for an array of values.
// Ties are assigned their collective mean rank.
stats.rank = function(values, f) {
  f = util.$(f) || util.identity;
  var a = values.map(function(v, i) {
      return {idx: i, val: f(v)};
    })
    .sort(util.comparator('val'));

  var n = values.length,
      r = Array(n),
      tie = -1, p = {}, i, v, mu;

  for (i=0; i<n; ++i) {
    v = a[i].val;
    if (tie < 0 && p === v) {
      tie = i - 1;
    } else if (tie > -1 && p !== v) {
      mu = 1 + (i-1 + tie) / 2;
      for (; tie<i; ++tie) r[a[tie].idx] = mu;
      tie = -1;
    }
    r[a[i].idx] = i + 1;
    p = v;
  }

  if (tie > -1) {
    mu = 1 + (n-1 + tie) / 2;
    for (; tie<n; ++tie) r[a[tie].idx] = mu;
  }

  return r;
};

// Compute the sample Pearson product-moment correlation of two arrays of numbers.
stats.cor = function(values, a, b) {
  var fn = b;
  b = fn ? values.map(util.$(b)) : a;
  a = fn ? values.map(util.$(a)) : values;

  var dot = stats.dot(a, b),
      mua = stats.mean(a),
      mub = stats.mean(b),
      sda = stats.stdev(a),
      sdb = stats.stdev(b),
      n = values.length;

  return (dot - n*mua*mub) / ((n-1) * sda * sdb);
};

// Compute the Spearman rank correlation of two arrays of values.
stats.cor.rank = function(values, a, b) {
  var ra = b ? stats.rank(values, a) : stats.rank(values),
      rb = b ? stats.rank(values, b) : stats.rank(a),
      n = values.length, i, s, d;

  for (i=0, s=0; i<n; ++i) {
    d = ra[i] - rb[i];
    s += d * d;
  }

  return 1 - 6*s / (n * (n*n-1));
};

// Compute the distance correlation of two arrays of numbers.
// http://en.wikipedia.org/wiki/Distance_correlation
stats.cor.dist = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a;

  var A = stats.dist.mat(X),
      B = stats.dist.mat(Y),
      n = A.length,
      i, aa, bb, ab;

  for (i=0, aa=0, bb=0, ab=0; i<n; ++i) {
    aa += A[i]*A[i];
    bb += B[i]*B[i];
    ab += A[i]*B[i];
  }

  return Math.sqrt(ab / Math.sqrt(aa*bb));
};

// Simple linear regression.
// Returns a "fit" object with slope (m), intercept (b),
// r value (R), and sum-squared residual error (rss).
stats.linearRegression = function(values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n = X.length,
      xy = stats.covariance(X, Y), // will throw err if valid vals don't align
      sx = stats.stdev(X),
      sy = stats.stdev(Y),
      slope = xy / (sx*sx),
      icept = stats.mean(Y) - slope * stats.mean(X),
      fit = {slope: slope, intercept: icept, R: xy / (sx*sy), rss: 0},
      res, i;

  for (i=0; i<n; ++i) {
    if (util.isValid(X[i]) && util.isValid(Y[i])) {
      res = (slope*X[i] + icept) - Y[i];
      fit.rss += res * res;
    }
  }

  return fit;
};

// Namespace for bootstrap
stats.bootstrap = {};

// Construct a bootstrapped confidence interval at a given percentile level
// Arguments are an array, an optional n (defaults to 1000),
//  an optional alpha (defaults to 0.05), and an optional smoothing parameter
stats.bootstrap.ci = function(values, a, b, c, d) {
  var X, N, alpha, smooth, bs, means, i;
  if (util.isFunction(a) || util.isString(a)) {
    X = values.map(util.$(a));
    N = b;
    alpha = c;
    smooth = d;
  } else {
    X = values;
    N = a;
    alpha = b;
    smooth = c;
  }
  N = N ? +N : 1000;
  alpha = alpha || 0.05;

  bs = gen.random.bootstrap(X, smooth);
  for (i=0, means = Array(N); i<N; ++i) {
    means[i] = stats.mean(bs.samples(X.length));
  }
  means.sort(util.numcmp);
  return [
    stats.quantile(means, alpha/2),
    stats.quantile(means, 1-(alpha/2))
  ];
};

// Namespace for z-tests
stats.z = {};

// Construct a z-confidence interval at a given significance level
// Arguments are an array and an optional alpha (defaults to 0.05).
stats.z.ci = function(values, a, b) {
  var X = values, alpha = a;
  if (util.isFunction(a) || util.isString(a)) {
    X = values.map(util.$(a));
    alpha = b;
  }
  alpha = alpha || 0.05;

  var z = alpha===0.05 ? 1.96 : gen.random.normal(0, 1).icdf(1-(alpha/2)),
      mu = stats.mean(X),
      SE = stats.stdev(X) / Math.sqrt(stats.count.valid(X));
  return [mu - (z*SE), mu + (z*SE)];
};

// Perform a z-test of means. Returns the p-value.
// If a single array is provided, performs a one-sample location test.
// If two arrays or a table and two accessors are provided, performs
// a two-sample location test. A paired test is performed if specified
// by the options hash.
// The options hash format is: {paired: boolean, nullh: number}.
// http://en.wikipedia.org/wiki/Z-test
// http://en.wikipedia.org/wiki/Paired_difference_test
stats.z.test = function(values, a, b, opt) {
  if (util.isFunction(b) || util.isString(b)) { // table and accessors
    return (opt && opt.paired ? ztestP : ztest2)(opt, values, a, b);
  } else if (util.isArray(a)) { // two arrays
    return (b && b.paired ? ztestP : ztest2)(b, values, a);
  } else if (util.isFunction(a) || util.isString(a)) {
    return ztest1(b, values, a); // table and accessor
  } else {
    return ztest1(a, values); // one array
  }
};

// Perform a z-test of means. Returns the p-value.
// Assuming we have a list of values, and a null hypothesis. If no null
// hypothesis, assume our null hypothesis is mu=0.
function ztest1(opt, X, f) {
  var nullH = opt && opt.nullh || 0,
      gaussian = gen.random.normal(0, 1),
      mu = stats.mean(X,f),
      SE = stats.stdev(X,f) / Math.sqrt(stats.count.valid(X,f));

  if (SE===0) {
    // Test not well defined when standard error is 0.
    return (mu - nullH) === 0 ? 1 : 0;
  }
  // Two-sided, so twice the one-sided cdf.
  var z = (mu - nullH) / SE;
  return 2 * gaussian.cdf(-Math.abs(z));
}

// Perform a two sample paired z-test of means. Returns the p-value.
function ztestP(opt, values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n1 = stats.count(X),
      n2 = stats.count(Y),
      diffs = Array(), i;

  if (n1 !== n2) {
    throw Error('Array lengths must match.');
  }
  for (i=0; i<n1; ++i) {
    // Only valid differences should contribute to the test statistic
    if (util.isValid(X[i]) && util.isValid(Y[i])) {
      diffs.push(X[i] - Y[i]);
    }
  }
  return stats.z.test(diffs, opt && opt.nullh || 0);
}

// Perform a two sample z-test of means. Returns the p-value.
function ztest2(opt, values, a, b) {
  var X = b ? values.map(util.$(a)) : values,
      Y = b ? values.map(util.$(b)) : a,
      n1 = stats.count.valid(X),
      n2 = stats.count.valid(Y),
      gaussian = gen.random.normal(0, 1),
      meanDiff = stats.mean(X) - stats.mean(Y) - (opt && opt.nullh || 0),
      SE = Math.sqrt(stats.variance(X)/n1 + stats.variance(Y)/n2);

  if (SE===0) {
    // Not well defined when pooled standard error is 0.
    return meanDiff===0 ? 1 : 0;
  }
  // Two-tailed, so twice the one-sided cdf.
  var z = meanDiff / SE;
  return 2 * gaussian.cdf(-Math.abs(z));
}

// Construct a mean-centered distance matrix for an array of numbers.
stats.dist.mat = function(X) {
  var n = X.length,
      m = n*n,
      A = Array(m),
      R = gen.zeros(n),
      M = 0, v, i, j;

  for (i=0; i<n; ++i) {
    A[i*n+i] = 0;
    for (j=i+1; j<n; ++j) {
      A[i*n+j] = (v = Math.abs(X[i] - X[j]));
      A[j*n+i] = v;
      R[i] += v;
      R[j] += v;
    }
  }

  for (i=0; i<n; ++i) {
    M += R[i];
    R[i] /= n;
  }
  M /= m;

  for (i=0; i<n; ++i) {
    for (j=i; j<n; ++j) {
      A[i*n+j] += M - R[i] - R[j];
      A[j*n+i] = A[i*n+j];
    }
  }

  return A;
};

// Compute the Shannon entropy (log base 2) of an array of counts.
stats.entropy = function(counts, f) {
  f = util.$(f);
  var i, p, s = 0, H = 0, n = counts.length;
  for (i=0; i<n; ++i) {
    s += (f ? f(counts[i]) : counts[i]);
  }
  if (s === 0) return 0;
  for (i=0; i<n; ++i) {
    p = (f ? f(counts[i]) : counts[i]) / s;
    if (p) H += p * Math.log(p);
  }
  return -H / Math.LN2;
};

// Compute the mutual information between two discrete variables.
// Returns an array of the form [MI, MI_distance]
// MI_distance is defined as 1 - I(a,b) / H(a,b).
// http://en.wikipedia.org/wiki/Mutual_information
stats.mutual = function(values, a, b, counts) {
  var x = counts ? values.map(util.$(a)) : values,
      y = counts ? values.map(util.$(b)) : a,
      z = counts ? values.map(util.$(counts)) : b;

  var px = {},
      py = {},
      n = z.length,
      s = 0, I = 0, H = 0, p, t, i;

  for (i=0; i<n; ++i) {
    px[x[i]] = 0;
    py[y[i]] = 0;
  }

  for (i=0; i<n; ++i) {
    px[x[i]] += z[i];
    py[y[i]] += z[i];
    s += z[i];
  }

  t = 1 / (s * Math.LN2);
  for (i=0; i<n; ++i) {
    if (z[i] === 0) continue;
    p = (s * z[i]) / (px[x[i]] * py[y[i]]);
    I += z[i] * t * Math.log(p);
    H += z[i] * t * Math.log(z[i]/s);
  }

  return [I, 1 + I/H];
};

// Compute the mutual information between two discrete variables.
stats.mutual.info = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[0];
};

// Compute the mutual information distance between two discrete variables.
// MI_distance is defined as 1 - I(a,b) / H(a,b).
stats.mutual.dist = function(values, a, b, counts) {
  return stats.mutual(values, a, b, counts)[1];
};

// Compute a profile of summary statistics for a variable.
stats.profile = function(values, f) {
  var mean = 0,
      valid = 0,
      missing = 0,
      distinct = 0,
      min = null,
      max = null,
      M2 = 0,
      vals = [],
      u = {}, delta, sd, i, v, x;

  // compute summary stats
  for (i=0; i<values.length; ++i) {
    v = f ? f(values[i]) : values[i];

    // update unique values
    u[v] = (v in u) ? u[v] + 1 : (distinct += 1, 1);

    if (v == null) {
      ++missing;
    } else if (util.isValid(v)) {
      // update stats
      x = (typeof v === 'string') ? v.length : v;
      if (min===null || x < min) min = x;
      if (max===null || x > max) max = x;
      delta = x - mean;
      mean = mean + delta / (++valid);
      M2 = M2 + delta * (x - mean);
      vals.push(x);
    }
  }
  M2 = M2 / (valid - 1);
  sd = Math.sqrt(M2);

  // sort values for median and iqr
  vals.sort(util.cmp);

  return {
    type:     type(values, f),
    unique:   u,
    count:    values.length,
    valid:    valid,
    missing:  missing,
    distinct: distinct,
    min:      min,
    max:      max,
    mean:     mean,
    stdev:    sd,
    median:   (v = stats.quantile(vals, 0.5)),
    q1:       stats.quantile(vals, 0.25),
    q3:       stats.quantile(vals, 0.75),
    modeskew: sd === 0 ? 0 : (mean - v) / sd
  };
};

// Compute profiles for all variables in a data set.
stats.summary = function(data, fields) {
  fields = fields || util.keys(data[0]);
  var s = fields.map(function(f) {
    var p = stats.profile(data, util.$(f));
    return (p.field = f, p);
  });
  return (s.__summary__ = true, s);
};
/*! itgz compression */
var itgz=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return itgz}):"undefined"!=typeof module&&null!=module&&(module.exports=itgz);
var itg_decomp=function(text){return itgz.decompressFromEncodedURIComponent(text)}  


var add_css=true;
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("N4KABBYEQIYK4BcD2BnAlgLwKZQFzQDskCcAacSKABxgBNa0CBzPMAFnMmgCct1tWCbnCydKAdzS0EAC1YA2AAyKxEKDKxomMhKzbLV0AMbEAZltaguamNyOWo5gDZPWUAMTLFUAL6GbvDAOzq74HgDMkVEARgCsvv7QTow4+MBQKEJIANap0O5RMfF+FFzUMLIOmdw5eRGF4XEJpZQoMjBUeenVtW4FDU0l1tAoAJ4AttFIoWDpIX0NjfGkI5h5+kPWsAAeaCiWLWW0SOMwjKymME4oooeUTNxSAMLTSNx9tLGfn1CJaghoBBOLAvJxvBaRX53NROGDRLBOADyADcsNxYVQ3DRHghRlDhjC4QjQeCwv1wviCVAHlIAOpSSr4ACMfySRKcADFiAgAMprKpaAhXNwAQV2KC5BF5-M2wygsPhTgACnQGMw9KyoACjNkSe8yYsmprtdk+QJ8LEAHTyADsxsBwMl0vNswyguFYTFewAKg6sAB9J3NAnQAFArBO2mabS6MJTJy0NFQO6yyhh4EHEOOblmrpuphCmZQX3hwPc4NUkxg-X5KKUuWmblRrQ6NzxxPvTUoODRdMg141jw24fJ4apmFYJhYAi0TNUhUIgBCMBuyRIbnGUloGc1C85Of5aXzhbcABlJ9PaGWpRW5VW4OMCPsj+gCx7oOepzP-aD9uPKCY3AkNwABKdBoHAz5gLEmo0PQjAsBampIKYpg3LGrqvieYQALSfpe-oABLRq2-5qGMkzTLmrBMsoKYtKmx5XFBADadxWFSQrjHUAAa-pevsmrIlcIhuKYyRUJ03D+sCzCyP64zjPWWzRIws5pNClCMFQiBuKuWBGLorJqAiWDcTeZJ8QJOFGEYBBKcZ0BIFQALEKxmllCgnRGGgfDKVmeywjO-lUqpLgydOTDyYpIVymFTj+omLkyApDkeZQ4loJJaIRXJKUxY5ahTLQowKSuKD+iwhUjFg2yxVsoxYLY9VlAAcsQZDpWoPIPi1lAvHAN7pQAuppPgpokHFylxdQAJr8eK9VQMJTiiXGaDhbJUX5WlWaqcFGkhmo2m6WE+mGX1UCmeZGEePN1m2fZl3Oa5T6sGxR2tN5vmCV10CBTAwXVVA8W5dtqV9UVG0JUl0W7Z90CZdl0lbXDkPQMVpWnCgFVVX9GS1ejUCNc1wPteuwM9fDn1QANQ2faNIbjWOk2aVAM1uLm-qLniQkiXU5OdXtalzgFBA6bd51GelV3AjdfRczzNl2dTVIvWgbnvfjXkGT9RMA0D+Og6jO1E6DsOm8DSNSWDaPA5jZU45VRM3HVwMk52+OC6OR2MwSzPWP+U1bBzYQcjARhYAgP7TBVPNLSta3QN7mr7epswyydkumRdjmy2Z063e44eR9Hv7c6MytPXn6ua-gH0Ixk31+cDBuzvb0OJVgyUQ1bEk2ybvdG0gJWO7jLuE+7TWewjycdT7IZ+2OE3sWzofQCXUf+iBSDiHHvNs4nAvz6nIuHUdUBZ3pOfSzT12F30m-Rzve8V1XqtyrXb319rze-bPl8UBBXbkbTuFsh4AOtjlQeBVh6j2xuPYGrsiYeyJt7EaY0V7DGDmUdetMBwVwTvzNwKc2Zp1FlSK+Z0b6XXvhZfIeo36PQ-lsL+7kAE6x8i3fGbczadxgSwuKYDu523xlAlGkVREAIdgg52SDJ741QWTeeGCmZYOsDgygeDEQ0B8riQhfNVrHwpmQs+GcaZUJqsCXOMs6FFx0RHQEpUlbMOei5DW38wAsSgN7Jegd1FcE0WoPBPI3gID4vHQxScfEn1MQdcxF9LEE2sbfC+diFZhIiZXVxNd3F1y8TE9cfiuABxKazLMISsi5AMYfYhYRSHC3iUErS4tTpWIMqkrM6SyQ8iqQGFxKs3GvXYY3ThetW5AMBiA6R-DJGW1AeFcBsDIH92gXMiBjcZHlTkdrBRAClFexUQzTBLN2LsxgNxTmfSfwVEnG8cZ0Aj4kPnkHNeFy6g8naJ0IhRi3A+TsDuOJ6dmnHVadnFJtC5YPx6V8rA78hkeJGTTf5RhAUcIAI5wFsELRuRgag4yJgwC5xBpmNyEGgQGTBgQ4TgJiYG5LKXUuOOIAgRMGXMGpY8GMbLHiMrhcCUwnSL49FyETWwNRxBE3EFgWgU4eUUo5TgVR-sAmQGaecy5YcNoIByoiRAgYaiCMeXUueJjGnAszmC6+EK87dPyBybVur9UckNfC3JwytYcL-vrSZhsZmLJEfMlZWUB7rOWZskeWNtl4w4XsxuByAHoOOWo052C3maugFTGpWYnn1NieaihcoklS0hQXehHgs0DOrjLNhnrNmzLyhsmm5tA1NovuI22QaI3wOjSg6eaCjm+xOYHSaGq6gAFFthUDCT+HkAA1X4xrfn4CECIIOY63APA6ClPsi7lomqgLeNV6a6gCRLMCa8Qqyi5rAEyAATKfJp+d5ZkjPX6S9br-pWrCDq7YuhSmQFeRU95bgADijwrxgQYJBH5ScWRAocHajw4GpDb3ApBT9l9v2hlqv+1VEB1V4IACIVAqKMTo-oeKwdPYgJAS1yHnzFhLa1HTS0vvyCRhAZGKM8TdTWvJnjvEilo3u1qD40RoCMMKFYtNblMHuVJ1wMnOM4GKYB-DCTpogbCJx7jAZZrUdFCJx9FqLHYeSax21ULy3uF07iCjs0+M01rfXKAwnkCifE48RTe6nhyYU9J6AKmoBqYgABsL5TOLaaC6R+zAY9SGc9MZhDjHKHmZLVZstRc7PkfiwOJzF8XMFPc3RmTYnuLecC7JnV8nKtKZizqkLw6ymr2AxmqAy5uBUDBNHRLYBLjXFuAWo8SSjAaB1FMN20AkPuE691pACB4XhbAEBqL7WACqBA0CNm4OMf0s1TxoCNfu5d-XmJDdCmY9Io3xvZEm3umbm3ttvD2wdo7S2NOEei1AFDV4eS6IQn11dF2hFPpuwZO7SApvPuhfkX7-p-uOOYB91NGiT1uCsuKfiiq+s4QAJwqBS5pqkM3Md7Gx1SuFOTLXMbCNwSlOKsyblZfgHCTIAAchOaanDqsyTnedMjdz0LEZrgHItafa-dLHIocdRLyFzy7TTbHWaLlL8nMvKcFaY20qA9PmCM6pMz1gbP+cyx5zRU3NNBeYnwGwEXKaR2tbW3UAAsoDLFCUEty4uOdkzDhwcTahw9lXfQ3cEA9zHasKPHdpra67xgkfwTe7CPRq7MObMu4T3qTDSTf14dR4E9HYQ3fbETzPKkN7D1+6PDNkvZec-mbz74T7RfoDzXW8jf0h3juV9T0+mb7fO-d4b7TnDf7m8F+PXHtw81Ty7xyt3vrVeifpAH13+f0lh85K-aPrUuGJ8x7R9PsIfEO820X8n6AffgXp6Lqfof73t9Yd3035bq2Je8XX9KzfR2l-X8QyHpZF-gvo-oMjJrnvvm-uLiHN9gAFKAg6rSRQYQT-wV4mowQr6359DwEICIFobQYoAj466v4t7H7QBzoaxrj+gOJ6IHw5omqKCWhMgYHDbE5ygzYUHTAJ40FOJa5pa7565yp5xG74AK5M4wC863oC46o25gCMGKD24qqT4Eat4-YQbUEA64h9bwasEgrTaAFw7qE8G4h8FFrmaCEG5ygiFyHCESE0TSFC6iFMGi4RZO4f5uBPBSgI7RzGF0FoGnaMEcAr7K5ZZ9CeHRy9IaGOImHU5mYCEM6XTWFiGG52HMgOGyHyGKHLzKFsFaLfYvBShIBwDSS+F9aBHV65FlAzYFHIDFFRG0GmFbBJIWGJHnCiG2GSE6HCoyGsCZEuErbQG4LfYkZtD1FOJlGWgsGK6mZpIGEeAjEpS+GNFlDNEJHCFtE2Fm6pFSEyzW69GWgKH9Hv4wHtaLhQ7zY+GaF+Fyg3rlHBF3xzGzbnE9ZjExFgE0464tHrEs6bHc7bFdFZh7FOGHEO4tax7O5XI1DVL0jSByCX6MHyAVF6FYE9LXIwmyDLEtLxH66tE-HJFWHbHs7pH7GKBMhHGDF5Hta+g6h0xXqUA3pTGg434zbUm6hFFShEG3QkE5FfZUnvpBiX5MhBG6Eon5DnoBhOicluDcmH6F5kFQD4TfgCm1Kna0RImikeCKlXiSlP4QHj5QFuEnF1BamR6oE3EmqImYEzYmm-hSk-qQGkEQmejihOjUSCn4mUAMaugzYCSulrB2lj756ylT5OkxajHEQth0lqA3oAkqRp4zYLFEQkSLa6mN4Ok8mqEACSUoaIEcAIqI-ofWA2Nw6pAekO0OM22ZiBeZaABZ0eYJR+oZUAiZyBMG8JSJIR7G8xK4KUrZhBsRiS5haxZuGxHpZQ5uzIY5rQPRzI5JhpQx7WiZ6JcJKpScjBd6jJcZSuDxoRZIS5DIMgmJoK2JQhI5eJHRrAm5coQJchBxZJoJYu85lJdQOBeBRZvumBZZ92MmM2r5OU9Zj54J7hYQIEk4vAOMHihZl+xZIOW5N+X5QeP5jxoFDwfA6AxA-oAFrhQFRpZ4jA2Q75g2pZ5mY2EO35+hu5+Qh2BA2QWFAxT5wS321F2QDqCIpK5pp2y+IpepRkFFXZ7gzFrFCYdFxxC5xp+F62IEp4f+xFL+++SFlFmpElUlIlFJjF7WzF3oZwSmq5dQ-+I2aZ4+Cl-Fml2lqlDFhA32eqQIvk3AFUhFJZn5JFt25FGp7g1lyQaIFU5lOFYlYGEG9ll+wOslOupFgeFZjxv2-ZgyBpvlz5bgCxfAUFulPuRFTlu+YV5ZweiltmPZSVPlGiG6xeHQlG80fmvWMmN6wOol8VYQSoSAjACAgVKVK6wgsFZQXp12zlZFiFfFsOHg9VjV3lrisVjZwF0AZxU6LxQObVIVt0mVrlM2k1FxmFI1jp41UAvSFQzV9Bp2MFc1fyLlvVblW1TVq1MV61uFYQNRRRdlyVu1Sc+16VoVR1EVOVN1xRw1F1PJRVxg0w-oGgdAOUjYUo-AZAS6cGbANV6lruEh-og1N47pU5IMV2nZ-V7gdeCNKZ7xcRnxw53Oo5F5+Ad6BguxM5t6c5cVMNbgmeBA8NDViNLVYAJNHZO5-FtN9NjVR5O+eNOJ3xvRRNt6pNVu5NjB95ShwZKh8py4OoDw7JV4XuTNHgHIKt+l3pjxMt2Qctg0Ct+WqZcl+pl1flYQ2ZqKcAiY1BBATg1xWwle0A6plZBAZtFtiIVt2SYBPNXJ6ZktlRll7WPI08Y22a-h0SYy3CuhHx4KlmaNNmAdtgQdVaRqagRWDcVu3qEywCfCm0YaSdnpwiPc4aNMHaAiZskaY8Oysabsii-ayi64yq2RPtvJHygdKUc6xCl+bmiYnlatq+jxcddgrd-MAZe+htGZ8pDqTgeBmZpgS+OEPdblE9U9pgw9MpDZcpTZzgeBRuHdbOXgXg89M2m9OUzOK93ta9IZG1R90k5uHdtEe93gDtjxV9ZU2wp9o9jdqhi9OUPM-obdvyHdDS0xhaTR6WNCmW-FX90kP9f9Ig3NUAKdCyCUJdHcAaBdudagxdOdpdPaTsMa8aNdhyddyaEt59UtTZkD-E8Er00mStgDTJwDKxoDNqMdRcFDIoVDHiVwcDCDXqus4djcvCKDMMrahd7aqyEijaoje0ZdsieDVucaNMCajcSaQ6D52FY1V15BlBCeM1IgB1YQC1x1HB2jdNBV69G1c+TAfEDl7VedYO3V4V2VJlSAVj51T0o15jmjCpLj80Nj+jxgr1Tj6Nlj80ZjF9XjKowIuBlh9JB6buTApwPdkdLGNibN6NkTUcOq3DAmSKF8OE+TAdmKhcFKTg+Tc9wM3oxRUwRMTwtZUgewRMFBEGDTwM8TiTwMSosIKA7T+M2ZpgaIRARMYEjAUwkqHTXTPTACi4RiZpF8fIJAozQzMqszWYiIFhKzVI0zIgaz+Njci4EqBAWzWA4GWA04RMSoxR3WxzvAZzHT+Fs0CIYI4gJztz+MFzXWwIOzfN+MoFtARzSztAJzNtWYvzDzLgu8-zwMoLjzu8LzrKwMtAtgd2-9+MiL3AWt0w7FF8aL2QvAWLWYyQMYqFoweLRMhLOg4wcAk9aALs3kQgNDHCKQizwMZT5VdydWZTRMUmNWbwowJNXL-m3AowtEbKcIwI8AIr9KYrTUcA-LwMEckcjNACNAguTgTIRMKrOqTgd6GrZwpLCLSLOr9d-iP1ISMgu8-o4pgkENeQ1ValftdQoFqIdleW1YujtjUM9jGVgTxl6NTrXlrrbwYTZDG1-rLrlGfjz181PrfVNmYbNwlGwbvtv1UA8b+mkb3FDjWVvrcbWAzrCbjma1pr3206Q1e6VVbV0NDrbgabCO-I0FH5mb3rPVb1-FtbuYSbTdbgvh91IdeQsZHVqNaTNmPbcDqx3zBN55WxnRxJwJWRJrH98pL8SZQN0ky52hwtQDqW7ByFFrxEq7-oy5Y7Q5E7F8SRgtJNU55E5N87JSRttV0A4pSZkZfW+grNsxOVT7EZMYx7J5MT45hN07rAl7s70ElNGjxtH4F43437rYl+luW7vtJkjxJpsH2N1auNt0XxZ5AtQHxNm7gJN74HnjkHUAmNLxaHr7BHcFDDlAtecNnTC2z7P7A52uWHuzTOGxsQV70AE5YA4QXgoH3HxHaqKbjHCAX7yZ5bDBVbKbZOFUlHgpG577XSjx8nzHOgv7vNp5k7uHfxkhIHZNjhYHaj9FVN1bdVLxKo8E6o8HKnJOjx4n8NqoCEWn7Hp7nHU7+negPHGQ5N4tDdpDybeC5HTH678H1Hg725H77NDHLxR7rH-B2n-7lA1h3HgtAnkXWwN5wnpnsneCy7inTNzByNnVblhXyZb9QZQXXbxVpeT8Gz0ZJqhnIp9H9XEcUc0V1cnt0pZ9gFEHD7UAhEewyAW6e2GbiHXVzbjjObRcw3mQLj9Oe2nbqh83o3S33MjAFUbpTNLNVpjxa3i3Fym3T4db2AVXB+NXqhnBVB4XTNjBRJ9xMX6NN3CeCXONg5f7uJenZ7-xoHYtInIbXjh3Y3aGrkExyn+3OVIPG3YErkF3Hj4TpHa3CO3LeBcPGsS0tKiLjWYQ22AAFDD8d6QET3thj0gKQIoAAJQLz9ckeDeggPh013dZjY+3JuAE-4+SCwk4QVcHvLlU8AD0VYFUJgg0CAAAfKF9HMuaQNL4eweaQFzwebz3u01B2Ar7CULyL-6GL1KDT59mJ-FweXumz7j9AIz4+JrxiU59Z2qEwAAFQ6v5ffanDcBMAJ4yAYBY9UA491A8748qDK88+W-M8HkO8696+LZ88a8C+C93oG9j1NlOdFes++-s94+mD48Sqi-smS8sgVeRk4S28ufMCkAB-y9ofF9Wel9MCkAk1U+J+N0psSoA28VQBm91Ap-JkADUJfNnLALv7WwIX4V4wkvK0QF6GgL7monfHPWfAAhG0Ba5kBHLkFeFulQDICgAAGQ79L-mviD+iTaVT05b+7-7-L9H9e8n+b-b978H8Ws0gb9n-3+X+H8A0jen-boP9X-+goBo8cod-UgDjxgD48AA5PeEfAoBwBVPS0CbAd531KeTfK7vKWn7cpZ+6fc3pfCz5-9ao82XgNwFIDc9ZAiApgqQAJ459deefCXiyCoFR8HehfGMD30k6Rke+qHXvuJ1YHMD1OaHOXnFyY5ocWB76IQRwLYFcCRBvfXgb3xH4ERx+FKSfgGHQE6BG+tPdRoEhTa9IoSWAcLja2A5D9eIbwfFpQDn5hBQBEAviHFlgHwC5kEvRQAAH5zB4AywbllgEsRFAw0S0HFgAC83g8AeHnGDgD7BMFXAMDlCFtU1BZnAbtTTCCzQjBPvP3m4CcHzQrBcAk2HYMcGkYIBKQ1wVT3cGeCfBfggIUEJCFhDgckQgwR4XiGYDEhZgrIeAMYSpCbBeUDIU4MaG5D8hXg3LL4P8EPgSh52cISIEGFKpi27WS4BtFN5YC6gJsfHk4J17HBTgjAWAVTyl5w0GuR6AjCmyrBvBc+4vSYbUKSBzJZh9Q7YXdQWFnACAywjYa6DwSR88++wjPocLyjHCuMEA+YScAuFXD10eCegfcJkymCnh20F4WAPAFUDzhSw1QZUIMbJAdQMqSBn1nDwuBkIPxVOgSD0ImRUQoNNwAAAEr6WpBULgFRSSZsgKwXEY6m4D4i4Qd6QkTCIIrAwARUAYAEfHwA48HwloI+D4CJg7ZI4ggNqulGWwQA1MUIkYB-3wHVgkwNQx4VAEf5H9V+sIl-tugv4yjj+UOb-uf1-4f8b+qou-kqL-7P81Rb-ZUTIC-538NRK-QAdJDv4VD7WKbP-rf1f6NdoADIniEYLAB78wAC-OIdwFoBuid+YAfHmrhQAejvBYAcAYLHAG+iwAgY4MaGNpIRj3R0YhfiGPAFUxYBkYhfuMNcD3sYhmaD-i8HkGAweRDbNKk2xeotsgmsdPMUgALFO0qc31Rdk2T-5ajS8OohIVKK9E+j3R+PeTjGLDEdR4xfonsUmNjF58BxYAIccmNTFU90xLo70emMzGRiAxC0PYL2PDGRjExyYuMeuOXFBjhxKYvoSgLp5I9Buf-OUevwNGOiO+UwjHK6K7HRjfBoYtcQAB8nxUYncWAAfENDRxYAF8W+IEgfjJxB4iAO6IzHaVFxE4x8f2MjEQSvx4vMcTBKnHWizkeCa3NaxOxJwBOwo5aJQX9AkCVyafA4VAFe5h9YSDvJzsuTACC8wAMwpwdsG5aJQPhEIw8eoOPE5jsJ-1ODmzAZHETreMgMiRR2TKUTqJRwpwaMHongjLhqg7MRZ2gAo8eQFosHhrB1aSjsBnPDcZBJIBjj1JsEqUFpPfF7ipxJPL-vJIqDo8KgGsUgEyGYlRD6ebEpsSaNf5tjsB+PT0UYIf6zjOxfouSQpPJ53okxigRcdpLXEJj9Jm478SFP-EGSDx0438fjyXGRTkxwUv0dpK3ERTxQvYqcTOKMHWSsJp4hSVaJUl1AF+HkyMd5NMk5RfJSYpkOmI7GBTQpGkrAHpISkji4J245qfuMCE5SbRKEj-vqNbGFSbxc4hMbeL9HxT0pe4pKX+PGlhTWpaUlcVFM6nziwJ7ot3FQFKo3JeshvPBNECmR4TpOp2NnN8O+zgVpgqIfadEjUjdxLwD8I6XyXDDeh5KeglPLdLqB39-+D4f0OPzQm3EsJxozIAaIBpScBplnQQcmQd6E9jJPk8yUgAT5ITsEto-Ka-0Bkz8nR14kGdHCr5-To4b05Qf+lHR4I6JxRc6XkERFOAXpbgMSUTMqompSZ5MswQiC4zEz3oKgOQsNDpnQBCx5rTsE9K8QsyPB7MqABgCQAnAmZzIAWQwEyDqtqZARcWSN2Uk8zFAWE7YAsKcl1ACe9+c-EdiTHgDwBO-PiHPm-xd4tZfg8AaQBYjIBys8IbgN2OAI-5xgVPUgBbIfBWybZZ+EAvbOGhmy+IPOZnP6ACH5DSA3siQr7P9lMhhoPfTIuDKDnbAQ5D4FiGHJwjRzY54wfIVT2GhdSLKKbUYCrOBn-Qs+g+TWeMG1m6zZ8G+I2UXJNlmynZkwNEEuINnuyHZ1cl2QXIbmeyWI80H2Qnn9keDSAHc4OV3LjlhyI5BxWIODL7kxyB5KchOePOTmpz05cMwqngmZTwseZtMloJ7JaBQBQBdaWyTJKgDjAxJ0wJnpeKPi5N4Z-TCoMUTqBh00JcWP5BUGuEaCL5CAK+Rz19TtxQwuWe+XjPShzAmoL83gG2AbTgwCon875GEACGPzROz81+etFQZ2wwFdQSBWRGgX-zYFiMcRp2l7iIK3AyCxyH-MvmAK4wMjXtDJjvkQLeoKCzYTAqIU1Roc5C4wA-KoWugaFdQJRDgooVKRmFBCgBdfPTocLGFP8z6DwvQWAJM6ZCr+QYyYX4LHAaC2hSjWzqSMHIAi9mJQpkWsKgF8Cy2CorwW-zZFhCuoJgyUV7oGFqirheorkV1AtkuDExZIsIBqK9FGi6hPQrsVQBuWUC6hZYopk10dFDi4Rfot4V6R+FWoVxe4u4UBLRFgjFRWEosUGLNFSDLBhIvAX2LzFjirxXAuEZoNbFySsxR4pYXpKMFIaNZMYqSVIK-FR0ERfIusWIJfFqS-xU4roXZK6gMStJXErCDsKQlOS3RfUoKVNw+Gt80JdItaWBK8e78ppd-LyWVKrFwChBZ0rKV1KKlESqpfnVmWmLuliyhpY4EwXINalkypZVYpIU2LSluC8pSGCmXXwXFOSlpT0raXQAOlay05WiP2VBL+l4yqRUIo2W9KolcyiZeEs2XGxEluyv5b0pbRZLjlnCvZZsqMUgLlFPyiFcCtuUgxDlNSuFSkshW9LkE4KwReisRX3LXF6ys5c8rOjBLTF1yz5Yiu+WkqhlNykZRjBmXaLUVuShFbSoUWZLVl+Kx5efN6XQr2VXSzlYVX+XIq5EQK2JSysxXRLqV5KllXir5ULLCVmym+W8uxXMrIlYyrFW4slXyqQV9K7BYyoJVPL-lKyhlQ8rlUGruV2ywFXqv5VPyQVQqqqCKuGWiLxVjKslVqtxU+KrVpqrlYisVXqrXVZqilWqolUfK3VLKgFSUodU0rRFoK3lfMpxUsqeVxqjlV6oFW2qcGKKk1fGqdWTxg1Wa+RTKrjUqr5Fvq3NUWrVlBqXVmqgNWGp1WgLPVea6ZVot1WZqy1YkC1RGvrWtriF6a4VZ2tFXZrLlzSqtd6ulUeqW1-a4tSSsGUhrq1qq8RaWonWNqElHa8dY6uWVNq61q6qNfIsTXNrk1DatsHaqVVMrF1Fy49f6pHWiKC1JylNTap9VTqrlw61NYGvnWVqZ1l69dcuphXHr9VH6pdV3DBWRqpVoi3dZuv3VdqMYR69Vb+ufViqc1b6g9e0rHXgbT1xK15X6qfV3qWVlK6dYhrpWKLv10G61agsRUxqk1sqvDVsqKUSNCNQG0NdGqg10bZ1xa+DVSvfWwar1yGijRBr6VcIBlj69jVhrnVTJz1mGkjTWoI2xqb1lGsjXuu42obClneHZX2rXUHKe19qlTduuvmsbcNPG69fCs0hCjup32KsH7PeQnz+YZ87LunUzhqqZY4awjfZqNVtoGw7axzc2ig27EFGVIJRoCRs0WI7NzaWtbnVZUAapEYjajVgqkYqRPN8jKuoowIZp10Ntm8RU5sk1dphYG6kLaBpC3VKK6wqbzXKF81UhfVKWkTXnAc3hbMtbKjLVSBy2XQ8tcjErYVoaiJbhU-mxJIFoviVbatQiLLZdHq0VbYtBW+LRfGK3XkOtAULrdVqi25bnN0WsoINvs3DbASLWsoONus3JaAtqWoLelpc1xl+tecJbR5vU2XRMVMsDbZ5Em2UJptl2PbQtrzqHaZYx27rStua2jaswl2r6Fts607butwWhrfNuy1uaqtoUN7deTW2UAvt5Ea7UWlu19av1oOhHWFt61bAXt0jU7QLkh1qBodIwWHU0Xh0HbEdqOwdk9qLog6SdnpcHdl2x13K2tfmn7VNr+0zbkGaWmrftsW0U6OdVOzHV5o+0+b6dJW-HSsUJ2k7id3OqGGToi1KbEly23nXFsuioJDN0klNmKLeA5QoBb0LsLdR5FhAD5muy8fSyfA7YlI9cdIKYqvoPYp0g4PAVNXV3vAfARmzOXghcHfJtdxRXXbx0PmrRoBS0I3SgBN07ynlFu8kVbqoCDhWR4wS0Kwt8HydJl+MC3S9ipZBB5WUEH5cDHwGDgcsPGHoSViCGR6uhnQXANnoDBUZ+RyupPhtRyFu62YKAHXf7293Hy-deuAPS9iD3wyQ9k9CUdNmt1JDL5UemPd4MDHx6AEie3bMnrFRp675Ge3vTpliy5Z9sue2jPnv72F6sAxe+fQ5kiF3tF4KuvBO0Jr2Al69G4Rvb7uNAt7A9P8fxZ3sQJh6I9q+wfYwnjjcKE9rik3RPtT3Skv5M+8PQlU32BtuAS+5ACvpflR64sG+rjHFjLzb71Mu+yvV4xMA1iixulViBvKzD+7L9Xic3W-tD0-lZ9uYi1vmNsAKoeRjuvfa72zmkZm9gMVvbtnb2FUx9lLWEHuhXDPIKYPe3-WED7GaS9lN+7vVdHwPSjPkhB6scQcLE4AX9o+t-UnuYOf7rqfw-GJns5gfSeYPQ8MfYKZC4AC9laUYL4MUAvjtDKh3Q34MUBBDFAoQpAJbNrmR6WIOh9ORkKbnWH+9thow+nNwDeB+R+C1-Tkvf2yH8YrBk-L-XbqKHBDJeyjEAaQAgG458nYaBAb0zhG-B5WCTIpiCGOHrZNhmI1TziNQGeIPQtlrVkkxXBUjSALQQhBeHRGdxbhsI7kb8EqZijKmcoynMyNaHnDMRmAyxPM5lBGDH+-w2nvmgwMUuVRUI--sX1+C89mQ0A+3MqPZGF9s0NQ15kKNOBijVh9I84cDFVGRjcxvwfkYCxLH7ByAUo8wEaNTGBIGxyA7MZ6F1H9jSABozYfWNZG7jlR9ozZLRHeHDFuBkI5wegDyc1D-Y2KTbPamTSYJqUwcfVI6lpiQJLkvYH-SkDHHMjP418RkcqO+CKG09BE2ACROnGAJYYkUBGN-GYnxQw0bE6TLxOInWjlR7E61BgCtRSTGJ8k1ibUOC9cTUkz6JIbJQ4Gu95eO+IIbGkrjPxz418feJmm6T0TQp0MZlNilBSoJkJhftCauCwnHjpxmKWScmPrGUT5I-0GifxNrGKTah3E+icVOEniTVLJYwaZ1MMnEj1J2k4ab2BEnGTzJ6yUF13ldGOTt+n-YOCfjbxd4+8ACQ1NpP49PTL8H0xNOlN+iF+UJlADCdoDHHAz3piuOnLNOTHYzr8HmMNHVOcnNTpgRM3HOTP7w7TiR-U9qaTMddn4cZ1M8aZcDWnnDuZ+M5SatPZmU5NZ8s-aauGeHf5bxsSB8YARKGw4JZ00hXF9PcHGp6JgM32fLg8xVxoZj0RGajMxmxzsceM8qbpPFnS4-Z1M+maXoNmWInp8c6MHzM4mqzK5reLuf3MkmtzO5hc82ctM0nzz8564LWZbMsmjobJmmHwa5NpJBDT+0YIOYFP+ivzk5zSemJnPynozNhr8wmaLNxzwLG5nKFqZVNQWCEV5g81ufAsVnTTkFlOahbUP1mMLLELC4kaZOtnWTXhqQz4a7ONwezmaNYAOf5NQTYpisb8yGcAsym5TyQUC84YYsQX4LKczizBekhwXlzcczi5ScLPcXbD1FpC2edwvCXsLN56SxJb3OUnCLT5pmDIu6OyGOZae0JNwHCRBH-6HB+-ZMe0u6XUzvB6Q+Po0uwAtLLdPS6JDwNfGt5HFmy6ZfCXqWU9mlyErUFsvg0BDDlmw1oK8suW1L5lpg+5astVCEoAxu-X3qPNlxLze5syz4ZkNhWAjFvAhFFfsuGWEL1YeM4lcMXJWWDaexEN5eit1DJjPbIK3orcuFWa2FrDKwZZis5m+zQZ3Ky+YvjVW5DVF7ACVfdPz98eewB1Fth1T480jxxzi430dmWHnZThoywpfTn8DS8WNR07AYJBoG+2Vm5099r42igu6vkH1JnTCDeg3gU4F1vC0Qazb9iA7O7ezpihOE7QYiLnbddvTs4rrcUI9fgHCA2h0uuySQvvKuCDGod-afDooHuuJp54eaM1I3FpL2F8YfEKK3deBj9GGC5A-GMZbhsHo6Gcza5PDdNQA21AoIEqxDbxtpWcrONwpMTagDFWybmNkFnVYxv5pG4XMHG3fTbPCLf4ryz0LtYpu8JDrx1gNmdf9Ti6nr4QPHJMSEYo6IYzIG0JaGFKNx6tfOS0tInev8dOcPHciITDCD9NTgaKfBs1GBug3lG4N3GzU3uFpFYbhN29NLdls0wkbp2EW2LdRuZILb5NomAFeqTU2GbNMAmx7chte30r9N32xfCpsB2Kby7H2xTaZsmoWbxF9s7w22uc2EQe1jOiJt5vu9+bWdIW6bvYCMFwg4tpZFnY5x9xItJdZkHjivJg7TtH1jcmrcaWa2zI-1vtHreZrKADbNMb2ETZNt7CzbACdG6qUe4AJbbScfQJaFzuO2dLvd6JDTapBu2Aw4dk25FZDvz23gztqe3KGDucVV7WwMO4vcpjUXmbdEGO2zbjt6wE73dZO-EmLB83TrGdi6ynjzsiMs7XFOW49cfvYMo0Niu+z9bcCN2awl7VuxfHbvG3gY0N7u43Ant6VEbzt1207bnuUxsbO9-GN7YQcAJGEsD-GOvcnue2L429je1g6zCR3VSB958yRdGTepT7SdnhGMtTsnWbgAt+tPdqzvhB5Alof+zNvzs0RRbo94NDLuMWl2uH3ad++PA+t24a7BMX61rYbtTwm7f92usYgpsgOdiPdi20yE4eQOcbTDlh5TBgfIPGb8D3B4HazBIP9H8j-28Y6JgYO5HQzOm2Y93vdX97igVmxUvZvx3oA7DRO9zaoePsr7tDm+yXf46qPzr7D-DtaCLs8Pv1pd0R41tYBMPvrldDcJI+rrSOW7sjtgyY67uKOwHFtkmiE-xiD28g9t-hzTDRsr28H09vR5g4MdUgjHFTkx6TZ0c0wLHqTqx0fzQcAICHcGIh6pdjukOObrjrm-tZTteO07198W34-CDs5LQeOe+1kqluWh+7z94u1gz5yvWYtld-jvIEh5xO672tim6gn1spOO7wD02xk5pjgOaI0t+ZzbYtvjPJnWj8eyU8qdygZ7Dz2py86XvSRWnjcRp4c5+bWOanrtve1Hc6f+wSHSWlx53XccDOL7R14Zz49GdLP-HloB9IE4fscOcn3D0NLw9vRl37YyttgLaHLsQ7frOzn+8B2SeENLHRz9Jys7KBnPS76LxuHk+iei3kXbT7RzY9RvlPKXiD-6p879t1OOXACb50A9+ctP6nczQF4Q4ceH2nHx9vyOQ48cHWhnND15oLdvv8c2AKNtV0E+etauFnYTtGHw9xdrPwgbAL6-Il+ukv9nFLpp1S-oQ0vKAdL3Vw67UBMvhHerop+y-+dwPtBbzo5wvcFdQ3TH3r9B369Fdhu2nkrjp9K+IfdOwXJ9vp5C-PvpxL7sL1V-Q8zt6BWXGbiW09eyfZvydizrFyo8id4vq7Fr7+1I9-vkuwb64H5yg+OcuvvjWT9cmo5NRsAC3czL19y7adcvbXPLgNyG4bcCuh3XziN43BwejuinUb-tsC5yKbWYdvTiF2fcodKvU3Kruh7tszcfWLn0zw15bY9fS7MX4T564rYEfl1EI-HTLhW8-v7IgbzdkGwc5FcNvqXwMJ10yGltNuoAbr-jru7Hu6W+XWN314B8Me8vxXoHkdz27HcgeqQk7qD9O7sdAuY3XTo+z0-BduOV3ACHm8q-TvwusXn1uZ3u9NizPCnR74pSe45yluTXNoLLkS8reJPq3j7m1-W6DevvzbzN6W6R6zA-uCPlzrt-c5g9PO+3LH-l+O-5fL3BPWwYVy7ahZ-P4PErxD1K8cdnLnHCb5dxQ6w+eP13uH86347YBMhD3bD1F7M7PeFuDXxH56524x2CPnYVd2jzTvEf12dbCWpJ0x9rfyfQPbHpRxx4ZdXOcb+nwz9Pe7f9ve3wH8D1U7A+BvxPHz8L2vbE-YO5PIXxmzO5ohzufaC7vHUu4w8aeBGWnmFxu98cIubnpn-7f1uJoGerPdWl+xw6-dROPrqtm97xwSd3vXPrDqkIA5k88uvPmTnG3egq9tu7bEzkr-g+C8iegPXlyT2UGqceeIvkHpLw0-i+02xXUXhT7PaQ-KfXjcrtPdl8VeDPtPIz3T0V81fDfrrubrO318C+uai3FHvHHx+s8Xu9A+gUR8gj13NfdbjHtr3KA6+b2pvjbt91k4M9fuePx3u5wB9i9bBnnk3-qJF6ncXxUH4PsoNJ5++UA4P831b8o7S9OnWJm29D-0+TduB8vOntV2M+YcnfkdOrj94R4evXf93HOQl6s5s+XvPr9nzyBrcRhOfdn97mR8x+fesf7X-3nz3d6pA8fSfoPp1519C8TeEf0PwdzN7lDw+VvqzRb7B8S9jf8HKXycsh5Bdxv2tWXvH6u72+E+DvxPorxM8+9E6zvHD0J8e9p84u4EjP6JyI8a+yKSXVbsl258Nt1vefft7r6c+UdTPcn1zs32L+V9Cewviv2b6H62AK-YfSvqH2oFR9q-p7GvoWlr-nfY+rtevpNwb+hfeP03W79Vx24dvavjPzdzR9T-M+S3sX5vjqni+47Pe2ff15z2Nq581vPfcv6P39-Y-NdGCNfygD+6L-0+ygxT+P5mmE-e+4fMPjv797m9J+4vo-1Nqr4n-q-FP0bjb50a2tqedvULlN0b7heHf8Pmr626V5usF2Jnx-rMPLeesX+K7Dvj6+EE2ejJG-Ej5v59tb8e+27RtiX3z4whfv335-gbwwkj-EPwX9IfaX3xsp-NHwg8JPcAOgAkfUpzlBE-Zf2T9V-WdzT90vDP0395XRN0w9cvNdz398-E-0L8yfC3x1cLvIfwyhqvUuxv83rNZw7cWfVoEb9XfBj3d8+-NQG+8EAzv198L4J13IDAA9YBIDh-Ub2QCw-KXwj95fSALn9O-WfxECpPKPzKAkA7-wQ81vJTxlcVPLbx2ts-TTzXdFwPYBMAKbHrSr9ePIjyr8OcEe2t9yPWnxtAaAhnwe9hHBgPVtHPZgJa8PvJ9yUDJ-bgKzB--cwMD91HP9zZcBPWAM2px-dwIg95AmXxgDxAuQIX9FA5H26gU-aO1jdUPeN2wD1PXbwvtdAgASQADAgHR3dy-EvxmddXNgMU0bfCz0o9jXO-3WcHA2uya9X-AXVa83AuILStPAqkG8Dig792udpbdoJH8ggsAKiCZ-cIIgCZA0IKpB4Ax5y3sl-EYKecEgzHyPEN-Rd1x8tAvAL29Mg-QMK98PK0AD8Cg23yRcLAmjVp92cLYPPdZGaJwa8v7bZze8XPVwJ58pgrgP59u-VUhZd+A6J02CQA3oJCCmg-BFl8oA2b0iDY-UYMGDoAWIM4Dh-GYPQCsfIHgZ1Fg3AO20VgvQOyD1gk9xudKvcn1L8zAr9yv86fCoLsD-HWJyf9iXS4Jb8Ggm4M+CFHP-2UcJnIHyD9dg-93F9PgvoP+CJA74KkCZ-P4On9KAMYNDtJg+kLBD1-aIRx8t-fX20C4QrIJyCGHU4Kp9tgsoOlsUQtHSoDnrKj0qDxnaoLEd4nOoKK13-doI4Dxg37xaC5Qd9xlDng+r0lDGbYQNuDh-D4JBCZfQEK+C2Qn4Pn8gg4EJ1DKAdpzQC+QjL141BQpYNhCMg+ELFDt3fjitAuPU7wp8JnI4LM9Sg0wPZx2gurxVsVQl73Z9nA971YDGgq0IgC9QrYG8Dwwi+B48gwt4P6CXQy0OdChgm0Jj92QtQE5DmnG0NdDUvcELmD+QzP2hCcvH0JTdVghELw8T3Ye0EDHtU-wtxfPMj32Cyg9nGDDaApUNiA8QhXVe91Q1rWJD3Pe0LuDf-AXyjshvI0Ozt+wkb0CCCw7qCLDXnBfzLD5wxHxtCnQiO15C1AzbzQ8vQmEN+0RQtYI7D93YewoDJdXsNmdswy-3lCOcGMOVsH-eMOf8OfK1wfctQr-1JCu-bzyjtpbV8OF8LbB8PzDGQiHx3D57UsODdywuAKPDuQtMK6sVAtfzPD5gzLybD0g1sL9DEQ-dwI8II1EMKCzA7sIwZ3wm0FlDa-E1xK5nfF-059Zw9vwPDofDMNpcKQ9cMgi-A251pDqw+CP9dEI4YM+DKw2T2W9YI0ENQDaw90MwCFgy8ObDrw30NFCiIiz2giUXciLDC9g9V3KD7fHEJFsJwkbTVDmI64LnCWQ9iPuDQIvuz4iB7KCMYJHwzNDND6QwSIHdhIu0PMiKw1CIkjkIzalPCkg2VwvDUg7f3x8dMQIHQZ8NAMPtsHI0LQp9mHdoMxCbQIX1HD9I8t3ODEwwkLf8WIz-y99zQiyMXCHguDDijVwqKJgifIhkJ8jpvNiKGD3I2QMPCYgtCOLCMIjHzrCOjBsKwDtvIUOWCL7IjDCjVIowMNCNIg4Mu85Qmn2lCko2wJOCPrAnAb8CQ6cPW1NQ1MMaj8EDiMdcuIqkN4jaIl0Kcj0I4IPD9JI60L3CkIqqJQj6o7yOOjfI6SM19ZIyEKF0s-K8KZ09vHqKahwo0LTGdRbaKNk0nrSn3GjOdUaKjCfonnSVDr3NKJd8Mo+oNMjWIjyOaDLInrzAiTQvzxNQSo-iNACXI4dzciYvLcJOjHQhqJPDLo1P2uikOdqM0D7om7TXcnoi5D6inrYe1IjSAtEK0iK-SMK+j2cGwLoilQ6aOd8kwq4JTCSQnaLJClw6yJpiygAf0YJBYraM3D9o7cL2iKoyQNqiIgjGIlisYzGMX8zoqGIujMIt0Owi2o+SKCjOolsISpeou8Is8NHFmJ7DLfKW20i-HFRw+ivwh-2iiEw0GLmjAbLKIAcgI3mJAjYY1UnaCRfGW1Kjzo8qPOjKo1WP3DVYsSPDdQAvyJQ8AolII6jvQpSJTdyYl6MMDhbJ4MGiLPC7wxD3wvHEojINOgIYiQYzmKJCIY7KOliVotQF4DAfYqJTiAgsHyVj-YoOJljco6qPlifI0OIARjwgFzxjEgyOPUDAomOJJi4dMmINiD-JEImcAYp8LNjm7C2IRcS3bEMmjcQmaOMj-w7nzMjZY9MJhi-fXr1EcePUeN9jVYuuNXiSbdGJtDW4idxxiO49WJkjNYj0MVUFXHf31jnoymKzsi-TaPHjQw4v31dGYs-0VD9I8cIXiLgx2Jx0FonmKWi+YgqP7YJnaKIH870GkOri6QnaP3jG4w+MOiRInaJPiaYduNscL4q6Kvi5I3CIUj8I++IpjDY-qO4iyInYJHCRoyvyZjavG2J-CnAsGI1DnYrMG1C0ndeJ4D-fHwNsjeI7OM2ptopaIQTgI5kIPjbQ5uPOi0EhLxVjhEmsOwT-InuOjjiYxSIejuooeJN98PUWzHiIoieJUdho36KoSz-E2KKg8XeQEMjVtWaJMjuYleMQTlothK8COE9aMRj1E3eKkTUYoNyESrE4OOETxEpb2rCI47X2SDdfPCLvjQoh+OIThbZhw+igdC3Cnji3dnBfic4pULzitndKIAS6dJhPa9XYkBPdiN45cOKjwkpxKsSBEt2LcTBEmqKsSvElX0kSCk3xPT8boibTujFE0mMeiVEnNz08HuEwKZifYhmMsCygu3yVsTXdmPziGEmcKLiXYnKOAjS45t2ZsAA3wPbc2k5GPeCpYgOIbiSk0RJDivInxM7jZg1qOviyHHAIaSB4ppJCTh44iJ4TPos-3fiIw7pKjDTkr8KQEQYpiKXi2-YuKWSJkqAG8DIE65x4Seg2uJcTRPZBNKTRI9ZPDjNklqJeMcIz0J1jY4pRPjjmkgvz09NXWr0iT6XeKMzibkugKe8OYoZPmi0kr7wyTWE-KKsi4MUWy9ioIhFPyTnIxZPrjikopIBTUEoFN6DqkjANqSBQyFP7iCdQeKOTVEpEJjCkU29GYdRYqiL+imY62JNdBOe5L-C3fa10sTxkmxNaDlHflOKjugvhIjtfkyf2pTMklBKWjykxALPjME5qIJj0RPBNZT9k9lMOSiE45KNjRbU5N5SzAjRKo09Ejh2-i54-FzoTF4yVIAjFo-FJhtCU8BPhicw65ytTyU+BNVSwg-5NWTPE+lNrjGUiEMJjtYvuJNSRdDlPNSuU+8IrjU40wIFSSgq5KZi4kpFRNcO3O2KYCsUp2JGTmEvFM7tZU-UP99VwgLy-dvkhWN2ixAhtMDjhEjxLKTI0htOkT8YnBOZTGw-BKCSgsWFKICxnaWwiSyvXV0zT7Uz+POdJ02MLvQ8cc1xBjHkj-1GSS4ytMzCuIydJ49R0oNP4SQ0yPzDTj4jtLKjo0+sJ2T6kghOCTk0lpKK9rU8dMp9J0zEIJxZ43tGEcTE97TEgJUlgKlTIY1tKyT2Enzy3TPk3dJVTKUv9PVTanWlK1Tj0v2NPTtk3BIhT40y9MHTOUm9Kxci-ChLF0J4i71zSn0mhNzj30ujynDzEn9OeT6415PLiYExlygjoEzDLFia4ztP3SmQo+IX9tUiYMqSeQkFINTVPY1OQyOsQiNCTGHQNPTSvoroOiSKPdnDRSxw11P-iSMh9ztSWEitIJSPYuDDEyZku22EzYEgSLAz3E5ZJpTw09tNOiNkrBO7TZE88PkTb4kKImoBMi1Kr9h7RFPvT6YjF2zSz-O1NjC2AYGKSSm-OTMvYFM8tLtdlM7JIFia0sWhAzXbJjOkCWMoILYyFA3VNRs4MsFK1ijUpDIHT+MlSMEyXg9pILtwI8TNt8nU19I1dCMhz0-SC4zKMY8-MsZLdiKM5Rxyz1MjCWij60sqIiyBgw9NYyYMveISy2rKEP7SrMtLNvDbMqmNzSzktF2iir-FrmOCCs-QCKzWfMxOXSKstdMCyAMqO3eia03NMay-Y5rIOiggttMBSjM4FJMyu4vxKjiAknrJz8CI9LIGzGHTVzHTnw511yyhwz8LWd50mTOSSfM5QHmyXk9dM4ipknRP79rna7LCyfXJtOliIM95yPS9shlK4ye02NOSyFEvjLbD-QwvwM8DEzRLfieEvDJfSP7X9xezvMubM9SlM71JUzfUnhIH9kcwHM5cdMwRKiylYmLJR84syNyhyzM8FJvi9k+HJsyU0y1KyzznC5IHCdIyTMxyhHQMOmzGA+hJSTiYd-w+zyMr7NWifPD5PUdJ09bL3jNsksNazos9rKkTOs0FxOzeM1LIRzH4nzlITaYzSL9S3woVILs8cOjMMSTXM4K8zSs8GPd9Jcv9Oqyfsu1OFjDcoQPFimsynKKTqchtNpyE-enOS9Gc7uPMztclLN6y9cjLI+s8kkTILtRfLpMHCow-DMqC70dnGFzHAkrOLTAE1z0dzdM53Kjt48rhMRiY8rTJRjvcjVN9yW49XKqTg8o7LkSw8uHN1z2ctDO5T3c02Ip9RbDOLNyOHFHLzSlQr6z-jagt7MUBc8mVMWzbE5m07zFUtvO6hlU8LPLzdw7bKOi1kiHKjTa8mpJhzEMxvIjzm8uFKK8rQHlPvSFUhPL5yRUhJPTyagh2OHzR8qrOlyy4+VJsjqM9RwPzycyX3dsl80HP9coMim39ygQwPOUD9U6HMNSt8yzLOy3ASPMuy9AAz0tzUc0v3Tj7sjNLPycQtgAxTBksXL2d5M-HICzCcoLKTh4CurPWBoC1-N0cF8hCNVyac6vM4yDsrZMSzz0wJJ3yLsjnJIS7027I-cEC4VIFzbPKoMHyr8vHOASvU0B1wL+2ElO4TiCop2VykEj-O-zzHSgvgTNcnX26ydchgv6ymCqmLTSpQqMKozLkxPK+i8cIbLxcFCHgrtzGE8rKwKuvO-MmTlwrQv9T-PdQtNDPcjbNIKhI8gr9zZC-hPkL-ExQvDywCsIAgLVCxh2Yde84bNmcu8h1L5wgi5W1TyL81UNky+C6VNvzx8uVJ897Eu20CKxC8b3fylYltN0zNUn-LcLcY6gtBSus26PoKfC6zMYKW81NJnzYCzSPYLzc-Qv6Toi+2OMLhkh3LMKX3CwreSKQmtIM8vkufKBzMi5tL0yNU6QuBhf85WOMzACpnKSyQC1nKbyKivfI2Cecoz3IjmHXDMzikCueMiAmi38JaLsU0wv4KCcwQqWzVSNYuKirQBrP6KKc4HKWTP8gd1GLQ3VfM7SPC47K8Lt8sor6z2wyAttw7Cgvw7zfswVLCLnrNzLxc7k23KzzUkg4viLMk-PMeCAStvCgjfi-jwYyvcm4qpTK8sRPyLz4qYpDzmc3ZLSDUsggM3dh0-fMfy-itEMLyP4lzMdTOCpn0MLGIr9JcC2iw4uwLjiifILzqijoOfyyS5ErgS90pwtciXCqvKeKT09fKZTN8lnIJLesokv1yfik3JDC0Q0W17yn0kEvRSdi2bPdTfM9op-8cCk4qJTOkovNOwAvO1MVznEgUrRihSzEpFLYMsUpjTgCyUuCiPimUqjyr3ZYoVLyIx9Mzj8srHKYccch5M1L3s7Up99Oi99yAz1HcIDdKnnK4rfyTMnIoxKV87GI4y5C20rPSEMh0t1i44gnzz9iSlnSK9iUrnL5wDSqkp0Lzc70sFyRbHHL2KS05kuhKBCk5z1LfU3vJ498y+ZJ+TzS1xPjKI060o6yUy+DN7SiY0AuFDc-NNxzLTvN6M5Lgig93WLu80uykyf49Uszz0CiXKDKPAkMpqzrC7jwDTOS00oKSJCr4M7LDMxMsmL7HbjI0DByrqN39sy2UvYArQNzJtSnM4sp0iF02kqgKFy4jLiLf0vPLXKfssMvbdby9Ivwc9y7IpWTwco8v2ycSuvNDy3i88r1jqHIn0qKjYi4oLKD3UbK9KXyndz9LGS5MOBsb8mEu-K4YuXMRikK1ssYz2yv5KkKDM3bLArIcwotPLe494qHLLykcuvKi-O8sczIyyhOnTS7TYsmzUo8EqXKc8lcs898K6yMIqjS6BJNLoykgrRLwMg8qoqlYjBPizey2grTL8Sx0sYqsy5ipdLqY5CqZBmHO1Ixy9IrYpo8eC-0u-TMClkvMLEiqtOZt9KkLJ5KNwlEscKZKuMstKEyhSv-z0fE8qAKeM7wo0q4K43wQqSEobJtSlSuootwIi-pMrKIS8XMErLKjousqN0yfKLKEYu2wGjS8hZJcqqctyq7LqKtfNoqfKs8rmLpSq8pdKNHEKqPz4SqdOpK+cR7LHC3y17I-KyMp3JErCoqqu9i1sqSvEKyKtVLkq6U7so1zlK4orqTSi-ypw9AqxYs7DoEhzNYKp8k-MtjekibKxynvIwpiqMCrUviqdStkqSLls9qpoyqqncopSsqn3JyrDyjyqTL3Coaq1zoK4qqdLSq74o1cJym1PSrHyy2MOD0K-jnGzJwxqoDKR8oSoi9YS1TI3KeIxGJB8SK1EsGKQcvqugyBqmvIKrpiugtOyxq-b339-CrNwcr3SqwM5Kn0ucudSTKzFIEqoSz8rHzdS9ks9jOSqBIxqoyhwqVyeq0NIorQK86uPL1vQqvoqYKzMoCrUaoKrCT8gnNzfiDK98OjCPq5UNMqsKrmJwr-qiQMBrfU13M+Teaz1xpqzS46orzTq+SobTFKhnPhrcSmYvTKoUxpOHKCvMqqtAZqrRLCr5q6eItyPq+gNWrCamsuJqEi0mp2q4SpsuudjagCrKc6ag9IZq2s2GqoKIKjfPtK1KjMuhTCExONyDf3ThL5q0Q-wNeqLa5PP0jwgBqt4Lfq3CrrLyQwX2nyYC3hMVrdyz2uYzVa-qryrniq6oUKSipGovLQ6liqILY8sl0jrtCp8sir6qm2uvzJahcMdqbKnvzrqbC9t2rqMqtsuVrF8rIuXzcqpmvArvKhGtUqL01LITjryjRyzrJy7RNQqZy7FzLKuCkWoJqW6zauDLEq77N2qxKjCWYcs6w6uDS86yLILqYaoutFKtayCrxKp63rJnqyq4-I0KOk9HMFrZ0r8Pr8GSqsuzyia5qq-Kd6mXKsKScuWoVyuqjItjLsq72rVzfa5MuvqA63yoYqK6q9LDrxQ40PnrQq4Gqu8gSjnHfrGi5uqarV0z7IAb785KtzTt4ruscq+S0DIHqyCqBooKYGy6rgbxSwOrvqPih+oeqbnWdPvL5SrBq4qV64WqUBRa7+shK7av+pJrtqjuusjZa9RwfKFapytpqaG5wrobXChhoKL-a5hoQb2akOuQbZ6l-Jrq+ccKvw4Gipuq-q1q5cq3rVy4hssK+7c4vlreS7TMUbBS5RuFLL6m0qYa7SzRturka9hrRq5Sk2rfjQivhpJoeK5as8z8Qt1PMqNq2sqOL6ysmrgxKQnooOqwGwCtPqWs5xqtLXGnsvcbUy-srjTEG2CpQzr0yauIigi56qqrMQtPOFrUCrzLMqmSiWosbhKqxq6Lki4qN7zj6-kscaLS9Jvcr1azypX9smvsolKg6vWoOTlE1DOKbLUp6vYrAmmqtPcrap3zQLN66JtZLYmp2via9q+XO3Lkmj2s6aOy8+ryLVG7EvHrtaxGqUK2GodNzL8PM4v0aD3LOoqa6qhOswrhG2Kt-rCGqXKaaDQihpBrUizBoh9tm0QMhrbi6GoObMmwaoGaVK3JthytG-WphTxmkkvQy5k5+vOTPS5epJpVSyoI8zoq22vqblmqyvbqkqqwt-KjSxFvsL5GpWsBb0S-ZpkLDmvVOOab6nWuGa2UxNLNSUGyKISabmiiMMb+GoyoKzmfIRrMa4q3FoSr8W3eusjgGmRqSac6o6opbZKqlrGKsS2lpZqJ6yFtmKpS85rhbLmzsJztdKiBK5aVHXGsmzE6-BpTrW63UNarfU-evWBtW8GucqZW1yu6aR63pouq1GulvgaiqtVu8aLmscqK8Iy-xopLym6iPRacQ57P5bsWiyqFatq1Zska2qlIowlfW92oBaIGk6odazqp1uZrVA5VqGbWGz1o1bvW9DIjKKq1gt1bza4tz0KrasEvCb3yk1oaaAa81r7DLWvQALaE2uCNSatsoetyLqW0Frhr1Gjxvdb1KpBvKKVC7msYcbsrRNqznMkso4djG-SJojC00XOHzJ0xTJWb06uGKJb6s5totDW2lXJTa1anyI1qg88FuGqWUvyoHbPixHL08-WwoL24J29VxJp56vF1naN65dMXb-MvFokaCW07Gvan8nuo3bCwrdskL22h4qFcFWpSsPbrqsurObkavwuHbonNTKRaaIV+uXqOce9tFTF0mprFrC493xfbKsvCo+b5U6fKVSpWk+t2byKwDsorC60epoqe2nJqzbRq09ug6JmkhLYrbsr9vrqFq1esvcC041siblAbDoWyRWwBs-at4zoJ4a-mojo6a7WyBrI7GatNrHqlWk5snq6OgprPbZ68dqjrjcxDuwbLanlqxz50x-2+rk6njsUA+OohoE6SGoBunzQG8TuobJO5Nuk6fartr9rXWjRr7bg6mFvALd8+FqRCWy+DsLKUW7BuZjha3+KfbfqkzveazO6xvWa12-Jx87SWqhvnySO3qrlbHixztgbqOwZpYalOjmsHavi3xpVspm1gpeq2Oi2twb+8pOtqbsKh9zC6WqvDp88yG6kL6LrOhLts6Vandoo7ZOqjuc7e2tmq8b6Ozzs1biIiZ0LbsM0RyfSOO5lyxaF201ryiIu5pp79ioobt-bJYxLvpr7O6BtS7GG9LohbaO8uuU6GOrzsG6qqhepRSkOl62FqP3OdsXKpumtqlq6282IIKJQutP+aW2lbq9q1u+ho26XW+TvpbTmk9r27+uvNs7Cm2jlv86+GlRwea8atDsrah859um6142ruWya04Hr7rSK17vzq2ui+so78qrbqPa+0yDr66Fig7qNj2W3zr5SOK3RLB7bvYWtiTLu2ItC64e6GIR7Ti8nr+yJWp7qa6BipNta73ulRs+6jm77rdaeuj1oJ6h2xjqpirQFgpG6vm3htmaVHeOudTBGkLqM7qu-+tm7eA61sNKh7CXqW6x-f9v3Lku4DppbQOnHvA6Rq3buy6VOsqti7yS8iLg7Y60tpQ6lQr6qMi6e5XoZ7rEpnqBqRChxLsbKGhxpa7B6oYo7b5Wo3s1qTe0urN78e-7sJ6ButSOgThu-4qXqtOiHt4qoegzueb1q3jvd7QEn1JGzVs35o9yyW3OrR6z6jHpBase4urA6I+49vyaLe-btj6jAzTPU793bJxO6tO+Xt5aBk9Doz73-FXvEao2j9rwLe-SuK2aOe64oD7aGnnpcaK+q+vD7PCiDr+66+gHuR09PaBMPyi26Xs4rZerOKtqQbWnph76em7rbr320VvWas6ymsI6i+6Vq57A+kHKA7oPPnsVaM2hTpVbdaplq0g8ve6ry7ivXSrb6we9nCDa54kNtMaw2y9j76Hak-sE7VMhbtH6r+4jon6lGqfoyaZ+txrn7Xihftr7tG8aq5qxexh049kK7JyT7Ke0rpna0+l3oP63eo-rNbPevIEIHM6nXsbSEBpxqQGemvdr6aUAqvvn7I+xfqwGUawgIb7hbPRtJ62CktokySBrYqNaQB67ojbt6tXpqzbGy-vi7Oe4SOBbO2lAaya0B+vJurhe5TudKHq2tJ1bsat+uFrbYpXrqaqu7Pv-S4m4nMSb2euAYk6b+yfqD77+hb1D6D2zQagqMB6FtGamKw2o4brm4QaK7ect6pT6fSxJOh7DO8wbAHLB6Wu5z6u9RwCG4u-3scHEB5wfI7Mejrux6uumjsy7ze3gb0Hv+u3pt6dggWqQ6qenTvLLP6xZth6qBmbsgHzOuEukbEYoofsay8kvrSaWBx1rYHnW-nuf6fuxTryH3Ozmv4HAe+8NbcOWv-tl6bQA1p9KFm7voFbGPcAdw65Bjj3srOqsfpjKVBg3of71BsFo8Hb6rLvyGv+mDrlLSm9iqIHZmkmmnati6MP37ccw-pkHLGlYasKG204YYHCk7nrSGZO7ofTasIzNtyGo+i3oKGThwMIL728tENeDRBg4JmHyy+kvFSe+1zyWG06-mLgxIRzXvycrQdYfsGbOlIeYGvhhzt2Hu27IYy7PGnQaBHjh3AYNzJejvL1a8ccQcmyxU-iukH7a5YfqHIu-tmi6qR94aArhiyDPSHy+zIcr79hhluzbT24EcpHjQ5jrHajBsoY76fSu9DIHTEq7pqHHhxpueHya8VsRid4m1oUamBrps6HU2n4bk6+hwXoszeu3QYpGieuzIM9R2t+LuaNiq2rCb0+hYaw6Yhu7t1dz+xEpZ7Z8jYekq9RvZrL61BwUdn7iR7boBGeBoYewGRhlfrzLf+gNtlHhauEfmHQBrPtqH4e9UaBrY2mLu5G9e4Cv0zvh86P3aAC0Mdx6By80fJGtK-QbJSOW0oaBK+vcbttxGRiIYRHFht0ZoGokh7ttxqxlHohrcR-UfxH1uwkac6BelzqF7+2i0crHv+4tsCGqarfsnaInEwf07yByIcq7ohtMcZ6Mx4QtnGhY6kMuLfR7qvaG22gcY+6hxtLpLHTemvu8HTUg2vgqJR9gHjaQesEcBLKe0IcqHJulUZZHkRsBLRd4h9twfGex21r7GAxg0d3bCx9gemCS6rgcvHyx3gZ8aQRjRylG34i4fnHsXR3p-inml0eBskRmJpXbRK3JNE7C+pQfH6gJ0juPHee08c27zx6vrx6IxnwcrqyqndJrHvRrNJQmVHekeWqzXO4ZbHXR9cY97Nx+tuny9x7Eea6SJpLsDGQ+x-uN6qJqCZonMByMebIvWmMfw8Se5vulCZRgLtfG16gtKkGPxsRogGB+0-q3HNRwb0lbhJ5QeQTVBiSYomvuk0dHGzRskdgnFJi3wvajuspuQmnyhsf8d3xh4c-GcJlEa3HXh9gCRK-etof9HSJu-v5Ggxo0c66Rx7rvsnxxi3rgm7xxOoK7pR9yYWq5R8sou6dJnyb0nWRgyagGAp2xsa6zJ4ia2HxJlLusnehv4Zf6duwEccnc2pSa1anxmopb7QsqEbTiVQ2MJFtFRj9KrbKB1Udrb2x4JyzGDcrEaInNhiye2HXBySbD7pJ9Ae4G5JuiZ0aGJ3SpLz7eiTJCbyy6poiGKu8WosHeJnPqJyEO5ia5LmhnMcPHt2kCfa7oprIdimch0kYSmGpopqtHk433sxq1J0Hu360J51L4rmxzCYOnBp27uGmD3Tkamj3p6mtKnJpj-MsnKp4MdQH5prQa8GYJ+SaSnXpp+PGGZxmZtYntOvpKVCdpgzr2nMOrCbbH+JkIrWGLpsKbEnrpjIdumhRxGc8HFpq8eZaxml6YEGMZ1KYp8gh03I0mqm3qaIyKBqIdTGgZ4-oKmGhoGt-HiW2AYmm-R0SdW6yJ6fvhmNBhmYOHBh5acKbWW9Vwf9XJ+9OIqb2t6sAHeWpMd2mMOsrJ4mRZ6gbJnb0PWe-a7baaspm5Zt7oVnkBpWb2GVZkUcOHUZpyawzWkiGaNyrA2kc8nPrJcaVH+poWeM7SZtkbm7PY+ysUHkh8qZpmBRumZDH7pkkdc6Rm68dha2Z0YaNj8BjlrsqOpjNOuGjZjCZTGI5w6asG1m-tgLn0R2Ds37CJ+OammKpw3tmn3B92d+6lpzOfomOGrhvYrJh1icqaKhteuMTuO8Oewnl2-yb7DvejTIdmE552dYGwJnoaf6ap-odf7GWhNI-6k0zWfHKE+umPUnKezya46zB1ceFnfJiee-HCy4yYwkq4pIdCnHZ9HsTmopxed+GNY-4cem3O9WYUnGp5ydvTOZveeVLBaxuv0jOJnKYGmz5t9rFn2RvsJdqEh6WcbmYZ6aaDsQOuadTmwx9+YzmWZrOe3nb0uMdrHKeraa0nyu02ftySZiudiHZnJodSLZ5pucfmrJ12aJHUF0sbybmZzeZZbVOgifBHjc7GafKfp3loHzj5-abXGLZuocgXo59ZtGm8gySv3HwGueYimCx1WKLGvKxhYvHZJlheOgtPNGfZnonakejr4x3maHmmffGvhGAZoRfAXhWqOc+aJF9Z2oWEF5uZ2H6F4cdsm4phvLUX-oDRe9nTYlydtG959KYRcSaTKa4KVqgReJnAZsxcjbcJ9ZsCmAvISZlmDxqmflm5FgkYcWzx5Reomyxn7ELhhZeYtF70ZvQGYdL22n2R6NplvqZAAlzjqqHkx4fMAicOr8dz7mQIpdSqh7fJZsX222GZbmqp5edfnap8MbAxMl0rA+L6+nOar9oihesPquWu9AE4Pq2ICMWmR5dOqX+OixYfzPRnG2iL2mnEdkXbilwaQW3B4sdSWZJ9JdAw+l7Jdy6QRtgGD8OW7seKW04tUgMXHvIhe4nSMt5pq6rZoUg2b23c5YAndR++dL7aFuGeTmEZvZYWnoJjJcKJ+lqDuX6f5rFxGWbUzEfGXC7W5YtAZl-6bLn5l0zsWXmbWFc7HoIURzWWRJjZapStluP1bndlpxYen3Ww5dBXjl89oRczXP+fIiAcwubzdmCKZYJnlxh5Y9SyF90deWol6WxKnYlmRZoX55roefnjRledNGXF6AApXkAMFZF6Tlu8fxdTpheojLfFrF3rGra4LuMWUVyOdEX33ZVZrT1puRv5WUmy6YA6hVw0ZFWYp0lbTmheqVayXlCuVdyXbcK0DOHWCsGv1m-F0patqbck2fZXl4sJdkH0VqOzdXbZrXpSrWhzKviWnZxJcHHklyicBWkZpmclWjl+1epX0MoqI5a8wxlfO8VHKZed7Q5wWZPmV0stJqW-Ji+etn651nvbd01z5fJbvljobNXQJhRfAmIfF4oTXgV21ZlXo+nJa0XbcCMvQb70iMoAXUW8ubxnkC1lfzWVxwRaeSnl1XsDXVSQdaR6K1n0ahnZZ-FfAzCVgEJ2WlFq1bQXyV5NYGWIVn2ZpWa51SdMDnVuFYIXL3WIHCHnRrVc5WQZ5gjDXNy-zxPXDV+BdaXEFolY6WpJ+NcZn21-dfBWY+oZapiRY3SojL+529qFIrakedAXw51FfC651uDHA37KqzpXW4lutaPHo1k8djWbJsVbsmJVkFelWqVlit7nWC5pazXgOPSqmWNV2Zd+r4N55cQ3q5t5aNLUNo1Z2bI1h+YbWbpi1bumd1phahak1ylZTWWKm2eKGyg5DYo3yvIBYV77lkxenXi1hZZ1XlHCTdrmnV06dxXzJ2xd+X2lnDeqmul1ebqm09DteI3tK6ZOEHg14rtVWmQXhaxzYgNPNHnC1+jdnWlN5mws3u6o0rM3b5iNYw2rprjdpmeN+md-XVZ1IOM3hN7Sv-KLl-ecuGbl0dd+nS5qpe1WIl-tjc3n1v8o4Xl1tjcTa11nIo3WHQ79ZQW+NlRYOWAN2VdTXOwgJ2EGhBq5ar8+vTSavX7N4JbNnHlhTbRWXNqOyq3Gl9YAq2vN-uo42flvzaTmAtlOcK20l5hcE2iNsLf0Hd58iL1XJN5mhi2lqwXP09ZNu9eEX0xxjZohZt1TfYBxp99aD62l+xf+XlZoLY9m1PULYPWgNpqfvCb5sTbPWWp6qpQm70Prw+r5AJ0bZW5NotfSSS18+bqXy1yWaHsbt8Nd62fN01aw3yJ3Tc6XL4t+b3WhNi7e7XgNp+MSHbtr6IZX3V1VZHXFtwJe9XCZ4hZMKLE-1aeGNt5kFR2Q1gQPu2NNsqcFWwdxWaO23Zk7Y7mwgc7cA34dq7bUiPl09a+i3aubae3i52zckHqhujcS3J55kC53tts5b9mG5u+ey2QKpJdp2GFkbf2WxtwjbtW4dh1Z7XsV+7YXrNXe0dRb4V2LYKzpl7yaM6nN-vqS2aIbXdXDuOcnee7N2k1f167Fmafy225+nYGGQtkra7W1dhHeFwdZ11dOmxs5lYRXsV+LbmWhdste5Wa00XZ63UevrfrXqdl2bl3HFvDecXtBpndK2WKg1aICKfEncs2T3Prxs2lt8db6mfq43dD3ft8PaxWFVmJb22oaz9c3XiV7daT2yVm1fd2l+y7chXOwsZYzX0tlicg3L1y8mNnb1hLfvWXliLbF3O9mteL6Y9zDc2XIpuhYT2UlhXaBXVF8bZV3mdz3dZ27M6BNI2tE-8eq2mVvvYtAmxnHd9X5Nr7cU2zd+peY2h7LfZaX9t2vby2Idn9cX2215feV3O11vZZ329+8PI3KtvRaCaA9-Xds2K2wfZD3h9onfLWrFhVbsHMtl7qn3fNuPYXmm1peaf3G961fsnU9j3bK37w7Pcz20Qi3e52qNwPf08cc0A7W2Nx8A9eXll9txwOQp7zel38x2XaG2AV5-b-XX9jA4-319r-bUiY65HYLsVV3PYAPMdq9Zg2BdkvbAO2t1Uh5Xu97OrQ2BVrTYG2n5pA5fmod7pdJH2D3gcGWN9qmMW7ItnXbrGFtk7QxbFezVaH2yDviYoP8DsXZ0OJ96-voORi2fb+WmD47ZYPgtozZb2NDw9c8WEXaFd1ml1nvb8cntzyfHCk6k-c+3cU77YgWL98taoPTsVZZt2-2u3bzH7D+ReETFF-puFGGdlfff2PDtvaPX0MvOd-29DoJqe3c1kI4+2Td-SaiPH1mI6HsCjqPd7G7DvkZSOrEtI44GMj13bcPYdtfawO4+6Q6137tsbIx3DD5AqRXj98o9L3jp4nfu3KaqRdkPjVuA9B2Z95o8+DWjiCc4Gl94ra6O098LZ92tEmg6q9h1urf72Vt0w4J21Riw9OmB-SPbfWpdqnaWPGDpQ9FX9N8VZT33D+Sc0OuD4Zab7eD853GXJlwPaUAyj1bbOOhpl5enmk4WIG+Ogd6PZB37d7TcO2nDunZcPTtt3a2PMDkjd2Os96Q7GzWO17TWdr1k44IaWthDYkPIaaQ4H85qmw-gHYTpI6aOHj1I+bWpI9Y5f3NjibdV2ejuzM82fj5kHH299871xP7vOeNiBC9gWfuGjO1OtLWy93k8629ALk+hOGju44JWHDnTfn2415E8yO39kzam26VwpYl3KA3Xfz3Alsu1DalmkE+BmXllTdJ30avler2gW+-eiD699I-bmOj3pbROODjk6pjgAiYb8OHtyDfYnBc2ID+mQD6trMOjpoQu5yaj9YC9OqThwcaOwc+k5aPGTl0NbXWD1k9X3tjqsbA2otx7b+qiD-ncqWiTs-da2qjiMqvmoz2-Zr2Hd7ZcdO2j507Xml3dQ-ePPD8eL092d7k-LWINgI9zPADgM-zPkV007ynalyY47Oa0ts-lPAJuM6-zlThE8ePLV1A93Xm9t05yPP9vI6mq9T1+LRDLTnPbanDZn0uNPYNwtYlOft4c+s31zhEv881+is7tOqzr9cf2Ct+c-43VWxs8-mPj1c+u2dTsoM07ijg-eghRj97bLmjzyI+F2+UmtKhPaD4HcnP7i6c8d27z53fVOXTxnbeOXz5s80S9PTNeEGtz4IY9XD5t7YnWiZprfDazT0WZLOzzs6aNL0L+o4nPFT9degvqzp3ZJWHzoraV3nzrud8KUL16JpWwLj6bPW4VmEcCX+F0Q-DnAL8xdJP+2KJa4vIZmA9t2FjuE4UO59xE-l3GL0bYE3NTybby6rd7xfIi0Rvk+A4SjwPeCOHNqde7OiLy2YoPtLmU8P31N+I+W6ZL2k-jOY11U9w3nj-DdeOlzps9yOvD-No-PTAiMq+nHtkQZ7OjT4PZDOTLkRZIuwZ+8bgXbj+Q4QPhV2c942lLxXZUuWLzBY86PLls5pXRN3A5m3tx-U-0PD5vNaL3J1kJaibQr9bdEvNt3K9dcoIrK-AuYTyC+Hdcth0-ouG95y+T3kZ1S-ZPryjS90rzLrC9VWQ52-xxDhTo3aEuJj8M5F2qr88-QJ7Iq88pabzuvZaunTl3frPwXFK9YXlIlc88vOwzV232KfPtbhXDTq9eAPlx-C5IXCLwc8lOTzg64r3drua9laFrh-ccu9NlQ4M2elxC7cvkL9K9QvMrzXZhXsT+UL68fz2IFwuir0I+Evwl4C8fXKF0Nd23orj9cevmr2C4Yu2rpvfQOkL1i5y6PTxHe8uUdgY8BuDDvE4xaGtkw8LPwj8-ahvNXf7bJ2bT+G7v3EbuqJrO1j9o9WuztjG9Su2L7644v0M6cY52C7S5e3O04gU6GuhT0G9FPwb8a4bLzdq-fWBebm47oPqLnLdovbz568h2ZE1Q5h22T7o5E3MTvA6fWDj-K-mbgr8U8lvrB6W5gW0t6A9tP5r+E5gvVblA9Ru0DgjfWv1FnQPYuk4rOyt2ClsoP4OW+wa+SihTo-f-OBzmddN2obwKa9v7r+1ttu6L5G9avXrl446uXbtxbduubj27yXFVm1OjOdL8ryOPbcLvp9WPtiG4DWKrqY4tujSjPbquFTmK-uOHLhS8T3Hbhc-RvPrzG8t79BzS9p9z17neFuA7g3YH3g7sm62Al2oC7D2u7sXar26bys5juVb+u4X3ErjY+Yv2bja-OytrjK68vEJzc6mvfTrs93OltsW+KzXesa-EPwrxddmOpLhI9sveR+y+w37b+88bvHzyUuTuxFG8M4O3ztSNqvuLznfGWe7iaL7vRrw89Nuq5miCiWP7yS+tuHr6e8Wu475a-gvWb1E61uMzvLo8y-r+9P2OZenM93vAluYcLuALwB+jbkty46giGl8c6+WGr1xKavGbpa9rOVrwzddOEH9E5dKrdl1a0SKLwW5q270aTYN2aN-s8Hu2oV9pEuqj1h-c2ITu4hjP1lxW5l267+K8C3YH2h4+v6H9051v+11gojK8Fy4eMvhjuLZNPeHygGHuBHqG9UeI9n04p3oZhG8genr2e7VP57lk8XuW7jm6xv09lB992-L29ue39L-e5myImo+9DPK5-B+luIrhVbhuFbmu6VPljnaNWOW1yCYXvkrpe9duX77G+931+nfa3v-dzh44njb7x7KvyD0u9vRfLox7jnJ768-Mekb2+7gvrH1M9seFH5c9fvtr-d2FOfTheo63+r3PfCAyly8hEPaNk2+Pvw70i5-d6no+usvdexI6vupzsJ6WiInpk5Zu5HrI61OkH0fb5vpb6cv0P-T-i4yeAH7p7D2qbox7PvwH6O7kvHD6R+G3yn1w7of0zhh-0HHE-OYBvUW-48Cur1v84nWJbjZ6lPyTqCMuexHvFYkeGDqR4ZPkDu+4TuXLpO9ieU7+J8cfpt2n2zu2HplbSeltjp4iGdH9gP4fIbzZ-1u5QAfyR2SH2tbIfovMZ65C-nsp-vumLmJ7sfl7tK9Xufr9DJWyrnpZ+KOVn+rf-ujL4u8J2cnvSumO3nqy+kX5jmk5GeoL3F6rCnjgF-avE1zq+1vtKrbYWepjml8uGf71mJGO1nxl7wfB+gh+pvG2jl7mP2N7l7uLGr5W6gfSnlG8Fe0b52+Bfn7za5qe17k9yt2knin19uhbo68vJuH4M66efH8hetnLd4fp1GsXr5+SOEzlY6TP4gqJ5sfiXqp-cvyX7m87CWhlYs7veLq2oEuCzkK8uvjzia9deK9iN6C9OXjV+xe1Uih45DkFgl4Nenb1y+Devr0N-TvbcNIq72vz6V7afD9hl5KvAy555PPteivfLePnzTbMf9nlU8senL-N6bujXkl7ifTXhJ9txrDiV-LXK3x7bce7ny8hOvHnou8VfDJ4B4pqoIkd-luILr17pOfnxM-xf9X9W7eu1D41+w827pB8rvP7-m+uf9DvO+ghCr0U7Ou8dnFqyfzDll81cYbsnYnvgn9t9ivzVw5+YPjnlE86Oi31u9fPantSJbfR3wQ6hfs1vi846Hnoq9vfWi+94TeR7svaiXQP1d-qv136+-B29X+O93fE74V6fvD3oD-Nf7wlcPzm-joI+x2B7+N9DvKjqG7LPZTqK-ff6b4p8ofoH6h9kf3rmZ7UvTlxifM38b4dbpe8l+V7reNHmj-ymqjrZ5Te1X8+5svNXg7btuu3l69w-AX-D4PetPIj4peLX4KdPeTpoo+lfPJwRsMuRPpl-OOWX6U+Ee8ga9dMmZPoZ8vutX8h51eLH79+cPf3jU4I-1P92-Dq7cJx+Se1H-y5-POJ7R+o-iThjZZfDHivcxXW3ynZCeaLvl-EjlD5T6Ff-1-t5BfB3nW-BfPz1F7nHXHu14tB9zwS-WfnXrldQ+LP73aCe13mL6Vu4vsOLnPCX5S6fO1P1O5LevPyk7A+0H7L4CP70aDf9uD74vbHn53wqelvxL6z92epOjt5nPfnhL9MyNbxc4A-7Ho95BHAzzO98Px31x+rfoIbB8df+vht6TfH1+j4tBoEt94q+P32u5vvFPtW+m+93zW7OfFH7SqttdKlLYNv-93naW3H20m9ymxPoc92-HvtF6gj7vj18n25P+09Y-sPmB9c+ELrj66vGHyJ3+uXHgI44eplvs62-C18eaQ-G3re76ecVwZ8YGgfhm5zet1sH7q+krhr5S+TXle7NfNP7A63ulV89+e+Y3wk4++Qv5zZIuX3x7y3uTH1dYw-Rnn1-Ce-XpqLrPpnkV8QfFvklvbPKfPT4nfMH4Q9reCL0xcQ-9HsPbqOLLjXZ2fCnm2-G+FP5z6RPwfuB--ebv6p6HfIr5h6xOh1-Q6l+hPoL7AX5f5F7L3IX0r97WsvyXaY+p7jX9jvQf9j51-Bf9z6a+KfsN7qfe6tr-4+zfxH5l-zruX8++rr777ZeVlgP7Q-q7k79Ceef8Z75+1YqZ84+hf856QfePtr7hWXvrHf5nev4q9l-T5635LuJPmtOz+4-qi8q-JHs761-FLon+ieSfub9JfOb5r9Qar33W9t7yP6jaBPmR0v+Zeqj8E8s-7ZgH9sOuf3l6T+8Xqb8Oy8P5L5b+B38n8N-aVju59u4V83-zuGfq34j-E3qW5F2K-6T9G+7O135nv6-hu57eH7-Eu9-QXxh-j64x7hfh+N-jb9D+730JYH-TPof5lvLyO-7H-qTzN+gDHPiU9zvg7cL-kS9m-vr8Q3r79S3jeVlvr7sbXjVsuvkQdY3jg9+-jv80flH8QHof81fhA8T-rq9gAf89Evoa9C3hADi3lACWvrACtEj-sc7szQEfvpc4Xsj8jLqj8Ffi89IDlS8ovqY9mPrgCnPpN8BXoQCC3kC9SfoR9PPh38UChQCsTp2cPVjC8sdlv9tvkV8H1pq5h-mz8jvuh8a-t886-jwDavqAD6vo-dGvjf8HqlbsN7lpdSLjicoPt-8X-vB83-mgDmAej9FAZZdVfs78inlwCgAWf857o39A3uADsjpADl-mbVf9n59INqYD87j19PHmHMUfgN9xZmJdXnv54fAZRdSHhP9tXtV824in8u0rP8VPvP8SAYB9hAQGEFVntc9bqt94fnn9OOrcMDzowCwgVAspjvt92AE-UYgZ69VAd69N3r69t3jh9LvnP82DroC0vqZtHfpwsIXp0Dnxuo9cvpUCggSLllRoz8iziScJPj0Dprh5sJgTIcbPjj9--r8FAASD98AXm8+Ab29iAZ4DSAYb8rPt7dTAie90Hq49gbkGcqPtv8mfmHcw9nsCtgH09tPmA9sAXs9P3o2sNAQlc3ARU8g3ukD5vhp8-fmzsxARCM4VoJ9h3jIDQgTt89-sm8rDlgCHAer97gdxsXAVY9ngSc95Hm8DW-g49GHn1dI3tKFv7k-9YgMYdOnrICH3mGdgQQFcrThaAUQWm91Xlls4gQ58EgafFGgYT8tAcT8dAYICPPmncvPtzMdPpNd4Afvsraguk7hnB99iubNcQb48lXou8pDuV8VAQn9YvlP9+XpoDVgZf8Gzm0Cl-hicdgV-du7hiCKljw8RgeTdizuHdQLiN9bgWN9IQf5toQd29pQWAD6QQv9UvvKC7vg08bUuF80dgIcAgewA3vl5ldJlYCbftddIge24lfpi9AfvMCmQtm9PIgT8PfrCC-3qc8NgRkCmQSIDX1tldafFQCIPpRtgbqqCGASJ8mAa6DdvjGD7fpUDpDhz90Nj6DpAn6DFYmx9mbgL90-tf92gfoMDPFa89bhICrNofMYPje9cdhYDw-qcDaPii9bAUFNSLlmC5DmKCqvhKD4vrwDmgakDWgQyCfflsCF1l3s-AZ18-gdBAEwccCcQe-9QTmZd3QbEdRwewDOfrUCN3uoCt3jP8aCjKC1rnKCyXmQCRATddzNuMtRPoKdJstMtuQfWDeQaQs5AS8ty7kPYjwdUDvQeSCcXj2Cavk8DaQU39TQQiDF-vuDl-ipMxftcdmnm1NJwb-EjPsX8hji6Cy-j09IDgBCvQeP81wZh8adssCd3v2CkvoOCzQWT8-wd1dZrl3spXv5d7QfX5LfrOCoIYP8eniq9LLsoD4-pwD9QYNtDQUp80IUQCBAZhChAeGCsge88wPsSD9gfD9QIfl9sQYCDbwQuCAnhxCq-rEDEIdz96gbz9qQYGDPwe4DvwaGD3gZkDC-OK9AIUH9-9v0D8XACCSgUCCzbpNcKIZFcqIdX8uwbX8sPihCmgSkD0IWmcFIYiCFvneMrPqv9dgT6cxsrc8hDva9zAdeDLAU2DxPnR8fTlcCwQcd8aIad9TIfRCLvhZCmIap8hwXoDj3j58sTg-8PVpe8PMgX9ggX18BIfyCXXq8tIDhi8q7kZDAoYn9JIcn9pIYWCaHsWC9wW38DwQGFxwl39owT399LiTd+IdpDBIWZ9LdkBDsoWJDjIWoDgoY8CZHp78SoZFDSwUg92vlhlrXsYCCbglCigUul1QUPckXtBDR7r09SUv5DRQblDxQflDp-n2CwofwCIoSxDGQe38sgdqNhBllCnvtK8CgQoAg7rO8y5smCZoS899IeLt7AQFCXfrRDFDl1CjnkGC3PqVCkQfoMWQWQlxNiNDddlIDOOnoVLwaEcLoWRCw9phdUtkaVPoWJ1SQbAdcfix98fkzdInsycXgR4DZniCMn7O2d0YcBCLPJjCzwVjkcYUVdnQV5CvvsCD8Yb98ybNA503mSDxIZP8VoZKCPwcaDtAVf83obZDHVhmDDAd0CJfr3svVlpCkwaUCxFgQ9IzhndboYtD7oUFDkISFCQAQzC6QUzC+oRaD9AaI9OIT9C6xnpcp3ois+-oTDRgaF9BHnNCVlgrDRITUD2oXUCNwQ0CtwUUUTQTLCtocOD0vg99aftFtjoQd9hPhBDgYR-9KbouDYblHc9QWLD49mZCaQVLCvwRbCfweaDsIdpVRbDkDVin-totv0CRruBCw-iX9SIS7DzgV-987uz9sfh8Nb+l7DEDk9Cf3i9CIfrTBjRE+B6WHSh1WtnMtDjjcHIaJkUnpnF7YYGFHYbHCwjlNCIjtYDdvmp1lfpXsPYcf8HofJcJYQQDGIRtDgVk8B84dUAOgNPUPFsR8LPD4dZqn7tUUsLUC7omCIIRUdvIWHs2AYSDsVu3DPhp3CDnlnCXPjnDdfh4RB4YXCR4d-M37sMtY-lGCekmpDvpgI11YYLsdIUA96XPpCrPgM9KYTDCcwayFFgfDCqHkVCOPqSMB4VtwD4ffVR4ZT937tMCF6mOceZv-0n-onVBgRnlD7o5s+YW0EjHm01U4TyN7Pq+DaYb2CpQb3C1gR1df4QXCz+IfCS4Z8cnrEt8KwR6VbYTjNL3sHMuJuMdb4X496XKz8Dvu2DkEbmMeXvEC3wYkDCoYjC0-j-D94fgiAEUfDgPnZlIvmB8eDljCM0pAi+ISgDSDmlCuVqIjwYe7Df-rGcXwVm934f6CEYZM8iwTwi-4Xwji4dgs01lVChwhfDWJolFhakcC8LleDqys1tNYcz8obiu90wVAc14enC8ocbCpIabC6KvZNcEUPCi4Tm1CEcfDiEafDUQZoV8IU+VKEcgC54XXCF4cTDdIbq4H4QEiSQbMC04U4MN4Z29u4SsCsETuC1PJ4j-4boj09oYM4fhbUAvjetTrhYif6vjs5weacKDrI17EbTdwQTgDkkRN9NwWtDtwebCl3FkidET4i9EVp8rQfelQ4bSNIEbWDC-qEdIkZH98Qb0isVo-DHEUkiM4XFct4dr8d4YL82kcPD+Eb4jBEVTFKSmL85EYdCcZv0D16u98xDo1DP-gwiMwTUi7oY4D6kZr9ZkQ39ZIcjDJSosjvEae1NFl7sLQOWCCBhr1qASo4-obB0koUMCQgUZdhkbv9okdk5BYc8imEc-DpLrDCnAUsDUkahD1odgjhXnciCEZ0j7wqQisapzC3qj+c+WsUCRPv8j0AfiDPQfIj1gAU9akXcDpkV+9Lkef8-YXJD8SgijlkUijx4Rl9NCnFD0dut8psjHDX-n6tykcRdbEUnCr3pMjUhuci3fj7CZIZSibkdSjeEUsickTscw4VjUmUTd4g5heCsUfPD4EeuVIDlxCoYQkiUEfJ9BUdCjzIc0jGYa0jxUfcjlOo8jS4f3tvgWQi8gX4tSSLv1r4fsiZEQ+sJLpcCLbD1dFEeI9qYWwj0Ee+DuofMj0-jSjJUfLDukSx1RupnFKER48fkQWs-kcqjN4m69jHswjhnqgiVEZSD0EkkCUznCCLeIajEUd1d2YWpNxwdPEzuoHtMUXsi4NlGi4Ykci7Nnyi8RgKjT-uSjXAdci00XnDtERKiOkY49jfnvNLUaW0g5pt9ikUMiS0WK19VtMCOwVy9X4XLEk0RIk3EazUPERmjaURicGUR0lgkQtUAviKdBkTQiDkdyjroYDtWoQbClod2DPURwjx0dDshen6jm0dpVoEq2jbek5DBaut9fSsRC4EbQjBQSR58+kgiwURfcIUVWi8ATqjfYekiWkeC4j0Q8jAEZ8DOTuaisauyDzcleil0clCxTsWi70Qu9ZnFEs5bvBC--soiAAaOjvEk0izYfqif0VOj-UUg9iHoEivousixEUzFL3sAMi0bejV0YnCKgcg8RQdRDRYc4jOoY0jMEbCiMkakFf0caj-0dACrdjosyEab9KejsjKPmdDTjpyjTLiy9ogcr9OMRWj+xm+juAQxj6YV+iMMZkisMcej9BtWsREZXCyhhiiw0TAiUoZGjoMYN8Xwv2iiUaciIQaSiHgTJjvUXWjgwddRFMX+iBEWPDhlrOjzcrSMEoUUiBMdIihMWFcobhFdAzhJjgJpCiP4QWCuEZoj3WqxjEpuxjw6i6jhBnKdwEeo9O0bXD2UfW9yMWXsosd80RHgtCaMWciTMVCCa0TCCLMRqcQsc9M6UXZll4WL98kejsg5vxiwbnO9dMeECrfBXtisQhilEe6iKQewiqQfuiZvpOjG0UajQsbZigEXZkSvnhjssuQinyleiBkRBieQZYiLrvHD5wSy9NkWTCq1gOi40XZ8tUdWizMc9DcsbnD8sV7MesQBjiERJVXkSeCAvg68ZwYV97UVbMZXpWtYjntjXUZ88msWgiXEQVC2sVd9D0dZi2MdtjoATpUrnu2iJMpQjr3oX9xsaUiEPlNiKkWZ8l3v55QNtdi23tuiTIeLDssUaC5MdLCDUZ1jM0Yw9JPqT1snLmjmUY6N3IRNjSru5jyrlEd0cZbtUcU+CEIYbD1wfRiTYWhj3EQRtNsZ-MTUUQin4od81pkrD-+qGieYRBCTPtNiqjipjW4UziIcdF8ycUhDvYR+jhUfDj-YYji8EU2ibMSsi7Mf4jDBhjjc9ooANITO9Ksbg9qsWUDdXGWirbrqCO4ZliDQbDiGIUxjv0QpikcdOiQ4aRdQEdmcnyhiisQWqCnXqdjKkaDj23Nb0GsW6jBcRJD7satDGMXqiEcZhjTcdhiePkBjMvgrjbfJOCKyjeiFXurj+YSdMjkSv8fMeFM9cXRCDcaFCfceLi-cZLiusQViWKrytDBmiiCkdT12cXXDOccDiqjhM5gUQ6DGPkZi6kYnjHoatjs4etjd4VZj-cUpj1Lg5ja6lWCBDofMKseLcqsYljhzq31LdtRicobRjloZ7i6YeZiRUfWjaca3d6cX4icbtKjMvl9jbfNXCFRnFiGwQliHcSDjKMVUD9Yc+DbsYmiWscmjOERojioVoiM8cjj9ASpCz4Rmk1MXWMFCOqtscQDjJsUTCRkdEjtEl5ir8Zui98e7iaYWPiMEbJijcfJiWMS9jusTLjesVTEF8TfiQMZRsg5pIjwkfFjTwdYizgWXt6sQSi9AKxsj-uvCa8V3Dk8ZLCxcVSiJcV4iL8dFC28bBi9WkLUC0fQDu0b3jN8Z-8UPtbtn0bJ9h0U3EUMRUlHsS0D0ltPj5vrPjVkZ7dwccINWvrGDZykF1bUZk88cdk8qjoIT0wVbsMCTrisCXRiYcXXjt4Q3iFkSASs8Tsdy4dllaRvaCjWhHjjPr2joBhF80scPiMsQoThcbgSe4YATfcSbjz8WbiA0ZASK4aVibvDoSCXIqi64c7CucVDcW4dIT+CSTjEMfvjkMYfix0VTiJ0TTi1CVtiwCTti+CX0duGtAT8OCyiu0a5jJoXw9G4SmD8QfBi0CXYD48dTM-MWojP4YFjT8cFjwiXTiwsR39I7t6cnCXlkqmmviPIY2CkCc2Cy9t4TMiRrttccSjPYWYTM4UoS5kSoTfUcUSZ8aUT2IbpVHURT07YVji2UevjIIS-iAUXfDsXE7iWNtkSEltgTN4V0SrkZPjLMemjm8dLjCsf4ig8ZoUO8QcEfsaITUoeITH3qXidYegQbRgsSo1ksSUkRYS0kVYS08TYSiCXYSkHiJDr8RXC88aW1IEa4TSMQ1DaCV4TfIey9hYeljjMR0SZkSsSKUfgTRUYQTskS3jTlnBCBsSdMeMdv0w8aYNfibzCo8e+5+sSljZbjqC2ibriwSWSiISbWi1iXli+idwSBieq4rPmejbfCeCr0XATjsX8STiXiC38V5iycvziOASPid0X-ivUWtjSSRtjySTZCeCbLin4k09ESQ+i5tio4dkbbixjudCDCVuNy8d59DMSLDTCaPiKca4iQiQeiOsbYSA8XZD3XgISWcX0CbUeMTaiXHCpibijWSecTYjvqS-CY1if8R6ieSXujNSe1iwiZsTXsZET3sXziZxp8TvsSYNC8QgSPCSXiASYqSvSbaS3cVDiOoYoTKcd7j0MdYTgCW6TQCdsTPbj-9IsUNiFqpQjEiarjUAeaSm4ekS3YSP8GCdDDwUcwSSbHmDKbLm8YUaniCCenjnibqTWYd59SCWT0l8T0kr0WYjYPiUiRGjeD-iRRijHkPi2oRGSjYeqSHsc6SnsdqTayXCT5Vt1sSsbfigmkrjjSY1t3CfKS0XMJDY0YwTbPq+ibiQ0joyQASqydCSaybCStiThCYoXvMQ8Z1Nq4bsj6oRiS+8bt89oSvCrdn2St0VyToceYTiSTlj+SY3iNiTqSJyfWSm3gaTkSTjNPkR9ZAzoDCPtoGSuUUvDpgVcdK8SqTQSWqSoyRqSYydTjtBlwShSZSS-HFZ8HCebkp4cOsdCQySkiScD6iYvCUCYQ8Y-inC1yXMCkMQsDWCTqlj8cmcA3nuSniQeT3SUmShYczi4ic9Yw8VQTzEUDClyTycSKfNjgSSYTYKdyShyV7idybGTHifGSvyYeSdjiii0QZKTFqpo9eWlxT2yTxTMSfIMjCcqSQSdXjCSaZjtyRPioSVPjBSb+CVpvoD5ntOTTyTVt64bK9nUqdCsyRrCNQWMDPMfmT7XpmDFsRuTdKVljXyXDiHidWTGKe0iZKfoNP8ayC7stztFAOeTwMeGii-ouT1KT9lIDsFSbgfiT5CXBSXyfpS+SYZT1iQ2jpKcxSMTlxihovOiLajsjhwNQi5SbFSrCuujoKdpSSUZ5T9cd5TDcbuSjKQmT1CQGjs0Rmk4VofMVcT3jSqdeTRkTGjBKf2SnyZGTUqQhTxKUhScEcZSg4aZT1LpjMwPmAitkU+V+kd8itMdFSAybxSigjGiHyd-iByeTj4KcOTEKayYK9A2INqFLA4RORZP4CiJzdFygTrH8haRKdTOTCYoXGJTgbqcSI7qbfoyDPAZSOCdTaAJAxlJGzBiAO9BLqVoBrqdCIXqd9TcDKGBHqRmAQafKJ4RO9SjqV4wEANvJ3dHYAG9EjS2YBgY29FfpFlG+ZSrNABXJN6Id+CEx-QG6JBLFHo8nAAAebwQOCUoQRCVyyumfgyUWaUQeSQmkuMPiAk0gvTgOSmnU0gYTlCR84403qxhAWUwzgeoRfUyBimyUMRHwcWk2GChjWUA1AnAeeRjUuUD80z4yDgIWlOCUWnkiO9Di08ASS0lYDS0jUzsMBgDUMJwAK00InoGemnvmLpCCGAngUMaBj8wbWThiCgRZ8fWkZmO2lGIYaAS8bwSjWZ+jM4Kng78F2l4EN2kiAYaCU072kamHnCNyWagwUSOkiAZawZdRlS4YB+AyYcwBsUGfA9WVYBvgIsAzySeR5WNwCJ0xGiIwXyAJgDHDp0piBFgJOQ50umk5KfOnt8FOnF0+QxzeGTBYQd8C0wF+jJyXOlhAGul7oOukpuGsJN090BFgHkBt0yumHU1ARNkU4QVQCSRLQOvQe6OoCI0qgzn6GgyYGVEQd6UJTTAG1AjAMJDBAIukpufcI+AKul1AGABMAVChMAdngyYbWhUAaIB4gVzD7hNmSj0+sK1cEYDXIKenI0z3RagNGnoGC-SY0rxBVWNekuASzCb0nSzb01OlhAf2L704Kw5KI+kn0s+nQAC+lX096AUU4hBsyCBnvGe6mZWN+SzmbQxcuGngCiMABO6czhbCBcwv02vTH6H9Af0qkAY0ugxY0wlSmKKBm8AU+mNYc+k1AWlDwMm+mQBZBm-0q5Tr0gBkZALelHgHukRWEqzgMzhn5WCywpWNPRI0hqxlWOORfiWXzgCYaCXcawD4M-kIt8OMzEMo-Sz06UjkMpWlf0qhk-06-SuKOhmTgGBnUgZhmX06+kFIVHwcMgxlcM-+m5wQBkYQOYA702qxnRYRk2M0RmhWGqxlWMKyM0mwzgCODzyMxRlcAZRm7yFNhvSM8QXECzQzMd6BhyRenG6b+kr0hgwW03GkZAD-hniGVAXiB-jCGI-hEGXlC1iIJmQAEJnY+MJlIyRAxiGfJly4ViCxM9Gm6MrOwsQbAxkWNBlSMggw5M0Qx5M0gxFM5lK2iD-g1iaOCyCGcBRMkQBVMtaw6MpekJMkRmdmJpm+WG3SiiO3SECLJlViJAwSGe+mtRR+mmM7dAqiO3RNUajDDMuJm0GOpkTMzWzg06Zl6QD-j2iRUQLMkQxLMgpmCicgztYHGQYASbCRMnZkxMkZlbAShkHM9xmTMt0zNM1JkWsZsSZM-fjZMmODXM3BmdM4LjfYN6TP8QZnYBeORvMroy1M+gwaCfmm-MvUTqEHUSXM1pmgslZmJZNZnhMi0QvM+uDVMz+ljMvRmJMj0LK07sw8mPKTlSS0Sv8F8T2Sf6R38P2lAsxZnlMnkTl6OAzw00jh0SCoAMSRYSjlciCkM0MDaM95mIss3SMqIxkMMnyxwMixneIM5xsycFlrMsSR8s9RklaYVnv0hek1M0ll1MhpmH04+n0MkxmyshBlMuRVl3MuoDCAOmiAQXgA6UB6iws4lkUM8Vn6M7GnJM9BkgUMChoUSCg78GlnRMOlnboG5l4M+iDBMwwAZARTCws53TfYUvAmALwhggJgD-8MNl+6VxSxspaDMM+JDBUNmDYAGoCpURygVISTC2sWahswXgD5sPMDN0osC1sKjAoKLeSMSH4jdAAeluAZWQiyStktECVmlstwDeAPwCYQOtnoyXiS+AJVmqEKNncgeNlDJRlRrgQXRlAVNnpwdNlZgTNl0YfABPULMBFsgNgCgTOk1sPNgBsCNiVsqekvgLtnQABtm3qHgAJEFtk7sqADtslYC1sldnds9dhw0sekbUUqDRs6OAACYdmLsl1jLs7CB402tgGYStmmKUdmkwQtny0XkR6MNmBbsztkXsu5QqyStkzs7NkesA9k4keuAsyc9lvsnAT48O0TaiB0SkAbviRkZAS9s81kUyagQxslxhDs6cK64Ndkvs7dmgc6UQfsqBQjslxgps-9mtUQDlZgYDkIclunZyRtmagSDlzsxthUgZtm8yM9ll0vqwoclsRocjDkxgLDnXsh+mqEZ+iPsojmmKIwSMABljccw9mYQUigZoZjlFgDJjRMXwCbs6tm0cNQDbyPXSUGRmRHaZxlkcxDky051CGoPJS8MoBn0crACA8CFljCDUzScrAC-U82k5KOTkngTUA8c7oAqcktnHsjTmNYNxlUgJjkywfTle6UVkNgEzkgcszkG0jhjEAYUDMKazkYQYHD2ctZmnCQjkBgdxTGgVxQechTlygJjmOWRmQGMAcCT0nTlN0vhlgAYKiF0kBmlk0RJNspTk+cjQCqc-jl1Uf6yac-ek4c4rk5WZzl4cqMgqKTFCAwAEACATUBbYT3RTsxTmwc5TlNcvznkcgLkSGGTBR8MlxNskjk3AV9kt02tgJYbTkCspFlplY9kc0PUDFyHfh14A7kmya4wrGfHj7cgcBZGJ4DD0umjdyBRmK07Lh7crPADgQ7nHc17mnc0azvc6sDXc27l+yQeQPcg6lcsm9leMVvjOcxNk5KHaR+oCblyoahlPKVtnoybgSkQGRQI8v-JH8NDgO8X4R7CMFmagArlhc3XBqMsrnVc+unQASRlJcgDlYARHhdM24T-UcHnZcyHnlaQtlKc+pktctHkrsWPgm8DtlqctwB7SR3S48nTlHgfHnvCbbnJ0qLmFcsKx16GzmVcytidc1YDdWOnno01xTToMZhswfAQdQehCyhAnk60CnkjcvNk68jNlogWdlnYEsTcclbkzcxDntsGUD887blw8+GSo8zah-c+7l7Ke3lD0zuR3cgHk98fHiu8-uTu8qeTDQHCDe8ieS+81OQO8TIgBs+FmUAHjnks0Tj28jmhY0Z3nHsgngMWB2n9iBayc0KUBy8BPBLWcPmy8jVTRwdLkK8tzl1AXLm2s4LkC8lhRi8snlC8ohk6c+rmTcxrkFwNbnqctrmBcqnkOc6+TXIAvkJs+nnF870Tyc0vn5c8vlOMmrmIM-Szi8vSDP02vlechrmhs6blN8twDgCdAALMXeDgCLTlBswpkhst3jZAKzTqoUxQX0paCNUXMiGQWsj5shjlNkPsAXiJaDTgEwCJgXTmoyA4TAFXGTz8w6ySCF9jMKNQCSEbnmved3ie8b3jv86AB7SUzkt0vCQ4QN3ge8Omhe8J3h5KHHTP86ADtszln9DLUB+gO-kj0RxnawRPmL8YFm5MkgyiAAnhvSPsCkAfAV+gHvihiMABX00MSkAHWRU8HvjqyHcQp8zSSByHcSUC2AQ0C-OR0CxIyp8iMTIgFACWgUMQ98QMTMCh2RfiJZmwCZ4yJc7sC9gZAXbsErQYClyRYCtpk4Cp2mjmVcy7megXDmd0RNmUYBqC8WkE8L8zaCygV6gGVBgAHmD4AcAQ98L8yUC8DCKiMAD-YZIAIAYwWjAUwU98C8z3mCcw98eMR8CzQUOyG2l3mfeD6CiMRWCrfg2C7rCAgBwVOClwX7wQQWsC5QVbwFqw8wfwVgAQIUyAYIV2CsIWeC5qxlmUYBRC3QWIWLQUcChgURiSACGCn0QmCvgUWCqgVCC0QUExLeQWMr-mPsV-ncoRLmcyUkC8cLcAZgVLmK8nJT78zUCH8+nDH8s6S2ckbnfYHkBPAEUDegb0DjoECBLQUwCWcwXlUGMID4s2llUcrfkbWBDJ78sxn6wHMh9C-Min86DlVEJ2gjwLoB-QNQAAiQ1JlAJ-nSCxljkc3GQ4QJHmLYaQRF8MQTcoY4U0dOUCf81nl-WH-kQCv-nVQMoCAC6LnAClXhgC3-lQC--nraWAXFgBoWkQF4W4MmNJ6c+YXOs2eDpAPBBX0DJl-w8Qx7oGeko0rRlUGMEUw5Ujit8dEUVMl4VCszRl04Qnki8kkWhgJ1nR8pK5F875kSiKkVDGByw+svAh38BlmaiByT+spkUrYKkWhYAzYZeUjimaIkXIGWeCeQDVnC8i4TowBFk6snbl0iihmusnkUmQQQysioAT0sp8SMs7GSOSHkWwi1awwiv6AR868hhs1YU4RHlm9cjLnSitMBJslIC-ssUWR8ujnS8s-l2iwWSG8qDm-CyPlm8iEXls6AVbAArn28vdk+i8dnM8uoUnshIAAi9TnG8WEjYcu0V4is4WDcO9mDsx9m+si0Xui-4DWikgC2iu0XQADjnG8nNlZirXlpsgtlZingCeioAVFgBfiUcvEV6cofkfC1jn7shdnM8nkUhirGQAyJ-lVimPn+cgSRv8vkUwi90VxitiQJirwhJivAixslMVUi6jlNaABA5i+dn5iidn684sXEc4tkQiisVm8-bCBiygB+i49l1i9cVqAKPlNij4UtinGRScdsWbCe3kic6EXFi-kUb5QUXxi80XOc1zn5i79k2iy2mNwacVcc50VziwYXji59mrcssVuAFcXFstcXtiqtk288MUUycDmpimDmw8rAwfC09lgSs6CIyDZltiq8XilG8UDi80Wji+8WWi3cWli+CXvs1cWfsyCUTi7CU8AB0Xjc50Wbi8jnbi4CVvik3kfi4MWwSsMUhi4cVqipCXHilCU76BGCGirYArCuUVJZAkX-M9XiMihcVEiWQgzi50XrCooiZ4uWyzC10D48sERT88cXX8w4V38giSPCfsVbAC4V4SqADniwTRiiqAD-CkMUx8HKBXsyCXgi-hmV8hekjABNnki2UQJsk8WUAd4X284yVrsFXjFAHUVUi4CXOc1AxESiQjhs4sWQtQEg2Su5R3ihSSF8gKVqAZ-gmSKGm7s0KUQlRjnl88iUBSpAXhgaUjICsyVpgYkQKOEMWskaGwOS-4B+gbvCAgL0Vq8N-kZSgqXhgZcCrgFICHqXAgiycqWhgP0Ay4MbAtC-eRtC4mzoGJqWEsH4huKQuDCSiKVOQVCDoQH7gRS7MC7YB+RhAAAB+joinFl0kkINdi6QBwtv5lwsfFUgvxFjcFOFSoooZ++BWlA0ozpiHIJ4C-CJp3rLSZiEq34Sgs0FvxgYFAguxAhcEtAoAkqFcdICluopjFW0sGaACD3AUEA0lakvN430vasO0vWlzovt5R0p8Y-oBOl5olpZBonsEBPAL0R8FoEe9FIAJugqAjRnZE-MEoF00tgEiMpewyMthlaMooFywlwAOsmeMxYpelYotJl0OVH0xIi+lb0pMEaMkBloyD6QpRF2lA0o+FIMqYA80HBldkshld-A0M7hmJlWYvJlCMEFlpnBjFDUvgYjwH6oAqD65H0vZAUEBS5EUoclf0vIgwUuJgcUuTFmEu75W0tMZUgGildQAHZQ4s1le0pAlUoq-FRst3QP6HSlWspNA2Uo+FuUvuE+Usal4YCKljjI+FTAmR5Vsr9AVUsTsOUSmAdUvCinUvDAzUq5kG4HalJErKAKEDQgUcBGlyUr7AIoG6lfyD6lL4udFGADml0coXFykuWl9MqVpa0qVlWwE2le0qVpAMtzlgJFkFx0tVFfrPOlPgtXMcQuMMQ5lNkN0uxQUoHulpGEel-MtelBcpWse0odlhIEVA1Mo7lJwrplxcveZRcppl15GPZZctOl3Mtf40Mudpq+jhld9AMASMoQAKMqPg6MpgEDsiXlK8rxlpsgJlRMtHlncoLlwsoFFZKCplqkv0l+cv7l17G0ETMqzloyHHloMs5lQ7OTFPMs0MHhkvlYWH3lR8sC4z0rFl9yEllWAEFQYcsoAn0op5HksvFvYpeFGksIZCUEbAC2H6lEktcU3QvHFMwpFkcwqK5f1HvMU9OAlGcqOFo0ovlo0sMlHwvIknPLFlWkpDFDwsaFYsqclx7IL0ZPPB5XXItFDsuJgZ8qtwx7Nb4OgEx5cZij41fCY4dvAQgPfDYAffB6wdwrblJDAFlnkt8l2wH8lAUtzlobIbsYQH1lD7MNlLMqilKssHFSishl4UtGlwHKSlC4pTlM4DZ8C0rq02Mtug00qAVBUppIxzhylWUvtlYsvNljspSSWYAjlw0r-FuEAoV7sqNlOCpYV7Vhzl+8qvED-P3l-wBHl78taAsgrZlfEAulvgorgV0sakjAoEgpAFulTcoelggtEVs8G7lWwHlMBYAcAleEVYb1M-lNMvSV8oFll3ippg+Cv7lsABxwriubcAkApwGYHSVXRmCVISv2lLdPCV-oBnlW8qMQ8MsE4m8txlRiDXlmMp6Vc8u3llAsb4hMtX5gSu26C4syVNbPQkFrO7Fl8q-lqEpPlOoD7l5StOFfnGvlVxGXFljD4gvMvbZiys4lCst-lEsvLQvsuQA-svnAxSts5OooylsivoVsUvvZMkAI5WiuSlqivkVIUseVLEukgLyoXFOiqLFLMv0ViYHmldipsV6TmsVliux5IKtSlFstSlv8qGlUcqqVUAETkO4g04eku7MS0twVBcpSlMUqHlA8oCVIStQFJSv0l9vIJ4Oyv9AkSpUF8VhiVpsnk4CSsblCAGblXGFblEyvqVlAGmV2SoPQuSqTAByoXYXcoalPcoRAqyo7l-ivUlEyoqVT1MRV6nA1wdSv5Vw8vHwzMtGl9vLJVj8q+VUMphlQys6VC8u6VJio6VejHAEGMo3lOqt6VejFDEu8vGVIStZVNgHjlR4ErwXKAvF-cp5V70uWV2-KJVP0sxVl8o2VtQBvluKqe55HOVV5cqhlr8tSVQsvyVHcp5VTCr-lpyoWw5yvMVbIF7loCoVlPYtFlkCvHFIXCpYAICSFM0oVFXQo2FREpQVWdj+ljgBLMrqsG4lwFXMEXPzF+PNRFV4BFFHUqpAxrNcwqPhkwlUQ4lYirSVREq8VCqqpAZSoXFhCrPFkYsqATCuoV5HL8Z03kCZTdJVlpmnB5TCtqFHwr8ZATIUZE6veVBPK5lMqq1lZCqIVXYsoVWsvmAiKs1o2tG-Am3LFlIqDzAleHcAtkHsATCpPV67ERVzzivZYCoFlREu8l70G4lWYD8lPkvHFYXNpF0T3lIqqorVQMo1ZZaq3g-6v0lHzL4lSIsZUlujdZIoghlz8sckPKtbV14peB8pGtZCIESgWrKNlWIrfpQGujgIGtH0NIpplerIZF3MhOZ8hm9EO4uD0rrN+ZKFHAo6FDpoFGtNF7JhyU9DNo1HiFjVZQAbViIv7lPqs8gsgonp1AnF45NLvoJNJo1nrIwopAHKF4YielJMv3lr6vzF3EFkAI8DcAP7KTlyUuxAFyDll-yuFVv1jOcsqpgFsQh6sfitSs3iDgA5bCawYaq2liGqWVjGo2olrM-4mQFjVsyt2ZVsppFRGqOZUzMZpmooNE0Yp-lTYq1lPwkGgvXNuoovAfkYstPkrzLsVBGo7lPqsg1Z1KxVjNI+od1BVVZ0pkAO-BeA5GoKVlmpuVfmqNlAWqtZ3IGC1vXMc14WqJZcmtfMUWoLlMWspZ5SoS1BWs+oYMoDVpogX46WtnAmWr2lVmsOVYorK1PEqRYJop-V2atekuav8132CxkR3D2wBUi1lokrdFO6tkl6QHklgWqxkDGpaQ1ZH6FuwuPVxopfVYss7Vt8rKAPapZlJ6u9Vsyt6IrKoMlJvERVxCqjFJ2tnV9vNPZfiuHViHNu1Hqo3V9vMPFSMjbFbWoGlTCt4ltvJkVfiskltKHY1g3FG1gOrUAU2tNlNWoxVJardVUOovgz2uPZr2rYlZUomVagD7VnYrC4nPJZVn8r011kv+sfWuLFPGqB1XIq34Y4qaVKihU1IOq2Ae4tJ1p4vh1ROpSgbYux1dvOPZ8AtJ13WoXFn4sdFewpZlo3LW1yOtJ5Q-L518IvQV6gBG4Z4hWF6GqM5guuJ5tAFYgxMAfodynVYHWrJlmOsvlbOsbg76vA1WYoJ1ysuXViipJ1TSuNlGxHEl78u1lk7K01JuutlVittloKpvAlqsoAkatugZyvqlfOtN1usrcACOuJ1Pyoh1N-PdVBuuf4MOoAQe2tJ18DC2VXao9VJKsX4jWtf4e-Cio5KvhwvhCw5Uus61pOsdVz5j51duosVLqs45dEpN1ICuz1NwBZVjOp21wqBVlHupSgXuuFVwHON1Hqv914OoJVlurBV1uohVHJHVYGeqcgJytugUsop1XRlPl+eq51o0vsV2KrrVEks9lK4G9l-vFDlReoqlwICDlrUs3A9AEcV+YucVCKt+IButjl1quMAicu71wCvZAccsFAbgDtV0spUVEGDd1Cirili+udF22u11O+vjVYepZlQeoN1IQG9VSet9VB0sj1k8rg126Eskieup11mqxVtAHu1LdMOlUeq-1KgGp4AbIWVUurb1kUogwAeo2lg8pf1ydFD1xeoXFEepckIBq34MeoCoceqMIVxB-1v+oPlKeqgNU+syl0KpQN8BvxVBBqCV8qvINQMtkFXmqa1GBpkApAB0M1KvsE4AncA4AkJlgAGLgMAAoQMwU6GFJWIG3kVUG1PW1TI2Uhcqg0iq36XCGz1WioO-XCqtA3KiVVXACDg3DgG0A7y-3SJKhABVCqg0fy0Q1QG9PUkGopW36znUq6-uVq6mmBfqiZXX6lNhYyKPiT0jDUG6rDWGKPsx4almVgan7WXy6-UumSHnnAEg2LaMXm6al-UCGHVD0IEMUBi6A1aIPXl96gI2pcCQj7QL6UfC0ngncbbgygYg1S6tzWF0jzUqizkVMs+DVxGnw1WiyBkGs4xmMMkI2ca7xD7QeXUo0AgBSyWrklWJXXtyppVNGzNr46l3V4ILGRi63rUS6lPQu6lw3u6kbgOG3o3b6-4AVa0nVFGtMU5KM8SjG1hDwq26CQcuI0wGqSWsMgpDVGkLBLGhxnAMknkiJIRmbGxwBi8xbmGG1nXmGjuWWG37josPHVa6l3X-a6SXCq-NUOAfHldGrjA6gcXXbyNvVYYFbU7C+cUG6q-VS66Q2+64PXXa0vV06lMXS6imSPagg3EwHVgKG-bUgm-I0bMivWP6sXnCsYNUky-Y1OSlWV66unngm9aAEASE2-6qADbAGE3Kc3XXn6nywCMvE2t6-Y0nqjlWcUeUyRwSfiiQKI1Xy2oA3q2g13y8jk5C70QsGtEiK8cA0v6lk3ZGpEDIGkMW9+JbUSS4WTUsWQiTG0JXkc4ACQCUcQtGUAyWgKPiUC-aBcGwZWTGcATVG+RmUC9cimAFgXgCHCBmCrU0yM-aBMgPU3gCA02Yy-cTRAHCAX0rg2mqnvijqpCLyMzkSCm-Y27qrjW-62U0NKhzVka4wSEm+5VuKAhA9crLnCGjBhi8-cLCGoU2BS8pUhmrvn-WIrWbGwI0j8mM16GkQ0EG1o1pK9PWnGguU5mwg1Zi1o2Kyq2WIKobW5a77CqqsbC2AI-Ui0UYAxS3qUuARzWAqtnxNuMWBfGk-k-GxVUba+uDnGo4AIi+pkdGqs02WUAT+gKDX9GjVl-qpw3168Y1NK2U2xatBkhG3xmr6fuhB0AYy+CNc2D0X5DHGlo0sq-s10cSHWwmuUAP63tVna7SUXawdXY65hWIqsvXIybdVPaqTiIqlQ1va48Ufao5VayjXVeG643h6tRXkmh8WV68vnV64-VSAbs1YqhvXhGpvVskSFV+Kh3XKagBV1m0DW963MX96-SVvKxs3Ym5RXCqv40Eq2vUcm3bUIG4M2My0U0hGpQ3HS2PWkAePV4GgU2-6sQ28qh1VY6vxV56lC0FK2VUxakM3qKp5VxsrCXXmqvXvirFV4W3RUeGm3Uuy+3l2ymC0equC1hALvXXmk0BQQYC2jS9C16y8k0U6q6BHm-C2wM2A3Hmig2iqoi2bK6Ii1C0i2lyh+UUWqi0GW-A1EGyy3vyui0na5i0wUVi2EavxUhmvXUay+KWNwPi056o2WCW83VmykS0Qi8S226681SWyDR+y1S1KW3DmfKsNkAW8C3IWhS3JSnC0m6vC22G081Yqg7UkWqQ1oG5VWmW3A3mWmi3U6ui3J6w+WMWj1V2W87AOW6LVOWrE0qW3i1AW-i1eWrS2c62S1+WxFUBWtFVL6jvW1SmNXXm8K3tKf82qWuS3Taj1UJWmvUNW5K2EW6nVyGrADP6jK1hKrK3YGyi05W2ggWWppUFWos1dy4q3lK0q2DYd80BSg81qAb7XOst6WOWj1UoSBSSlsLwhb8-q2uKCiDxgVS29CmsgDCxq1+K1s3zS7vYAIMHUoW680PGtBVBABCWQy943Xm4a1rK8a0EqyQjfqvaULmnVABmj8Cs03tjBmqq2PK1y0X65KWUmqBYZG301yKjC3VW3E1QLVa2CiYw1yszI0hGqG23QImmzGzyB-mxG3PKqK3k2jKBi8plzo26nU+c5dWcWni042si7MmvnV7W4VCwoCEWfIDoDzc-o2HgDS1pmnY190-40hmsGgWiow0u6mQC8AGejaWq4WIc5ihgAewRgAZiiSUU8Aum5wyCUHelEmEgWmUDaB96tE1Cy4w1P60U0fCntgSm9qxSmgEAymudX96a22X+aGCa6iKXm6PgC3QBfhY0QKg8yLUAt6bQ1O2-rUD6j21VCcjU0mydVhmsNm68ULUhG1G27GqKyM2iY2kWiO3dcqO33s2m1Rm9M1HRXc0hK7m2EcbQSu237VSGkm0YMkCwoy8qI08cO3Lqk9XUCVO1uW0aVx2-2KJ2+c1Han9D+2+lUQGgaV52krTEWgy2F29o3F2kO2jKTBmrm7Bl78Z5zxC-IWNSDO08yALgrWwo2t2uQh42vBnGG69XnmkMV3qjHUWqovXqAasRJgRW3CoYW3pAGMgk0D43em4+0HoeTDF01a02WgpVgAIvW2G0xQ3W6YCzGz41H874116k3UvWiLoLi761yShEUEweOgpQMc2W6D41A2glUpW7TX92gaV+mtMBD2mG2uMGe0U2sk1U27i1YWvQ0HGkflnOWM2pm0k1Y2yK2SOdm1nOZe3BskI2E2zM2wOoJXQ27xjsyuG0YOji0YS6m3-WaK1SGuO0M2zM1xmvB1sKPq2i8kflMuEh0b80i28229W82oU1ugF0DAAZpVFgTGgM0RC09m6u3UWadX7GuW0AKuA1K2lukq2tW0a2qSja2yYy62tij629W34ULShG2lC0m25NXF2221ZQCEWR6QO1F0F234AX-XCGi+2cUK+2zgAR0QAGk19IVgCbCW1UyoOx3dEfS20EOk1wYMR1r2qMVVKpkACOqI27251hqOw+0SOxe33oRWRemhx2ugSvBuOzu3rWqy0LKrMVZaj81u2ss05qqSWOamnmFEOog1moBnHq3ECNmyODNmsWV-2ubUAOuzX3swrUXqfMXf29ohay+62rasC3py9S1DygE3xO07UROi80DquQBXaiEV3mhnV+KuHXkcl82I6xoU7W9E1ay59Xfmu0UxamnnVgcM11a1TULi2Tl98zzl+KyQ0m66vnlO6SA4akY072uO0Zmh1XXm7zmz8xvnnalvkSGE7U-i83nrc1cWbc5Z3FmsWXWGiq0nWkzS7O8c1uGmc2pWwDWguyXUeqzw0+myrU3GxUXB62rXnOiqDJaqeXcii1Wya8q1wuwF3tYRMBPgcYjXmgY3Fc850gu8tVgus2VzmgF1r6hF2-Gz8y7OlF1MG8x3HyjZ3wunJTZARMB3oIM0CWsxmrG8G0wOoy1cmrPj8aqPhCa5QAk0xLUVQAwVumygVSapl1A8lo2r24W18ut22bq9HWXahe328hZ3E697Ws64w3vCzzVhsiASYW-6xS01fTgOHBkE2+J3sEFUWGu8ASs2qK2mulU15OaTW+a4PVQ82gCo68jksQd114SFYA+ug8gKMj40OGiEW80-M3tarF0Q2vxVlO2ohnCcl37ajVl4u9ABaEWS2Uu7F3UuxplumF3VIumN0Muj-Vsi7UXb2mw2su8tRIAVp1UyF3Vx2-3XGGk6ROAR60himt1nSD43AgVEDXAaJyF6mw2Lmn5mkatxYj2lU1lhHBmYuizXtasWUHW5V1B29qyuKI7BH04fXtoWbXj8+mT4urQgnaj61CW0aXgOrFWQO5KWAGosAEmk3XXa5nUBOv4Xr2iW2yCiV3E0v0RMG9DnjO5a0LK4w1kKk92Cu-HhnukmmXurV3065Mg3uu50u65yB92g+2sKx91nuiTXAuhPV5Wwt3B6lcB0sEJ15AGCg32ja3CqmF1jupEXFu93X-yU4B3GrFVx2gvRVul3UNuj51FgXD2HugCADgK11bARmk5C5F3nusACvu211Jmi9DcsR11siAvT9uoQ05Ohi2q6iN38u6F1K8ioD4ScpUruny0syxp3zuv6gUegG1+K9d1Gyzd2oGvpDsmje18m9V39G3u3BOxFXhEbwivEPEAfG6VbSmmx2O2j420mv90l65dW0ezLkx2wk03O7O2seod1fu6F2puiG2MqKcA-uyoC8OnY0F6Mt0O6Qd1FW8N0FOou0eG8s0lOsWXRu26i68doA6WFM2rOmp3NKR5gtm1OVdOo2VCe+bX5aij3p2phU9Oj+1PWzxUDOmmVDOgz0o69e2qumXgkKvxX7u64WgmmZ2Pml9jPmlLX3m+1XZOz7Xra3HXQOmzUXwLZ07CNO3Au9O2yW9MVjslmUnOj1VnOnN1XOsVVx2tz2oync23uvxUPOgARz8551RMVvn3O3CVGSr53Ee1PUIav52Dm463lKwL11ES53uGgDVkixGCQuvo02e2UXrOnz316ml0Eq7N2Fa1F2f6rfhyu+i1eew+VsWqN3fYRN0Eupy0Si4F07euN0D62z2ce9N2oMzN2Iuul0Uem735u9F3WWh+3IesIDsulzlcu+q0rGuVku2bu1jyl0CIerXX5entlRG5iVVenV0Kul3X6um13-WI13kmhj1R6c12Ee-TUi2ujhE+4EAQCe13MOsn2WgZ133epDULi-12jOkMXeu3aSK8MgU8+2EiBu4w3Bu65UYu9j1hq5704u5pT0uwb3h6hN3TgJN3AsDw1-ewp3B66rWXekH0DesH2sSu73tukJWP2yd116Nz2v2yt2wG1e3jAYWSMgdL0G65t2Cqy8hhuru0-Ou0Xc2z4VZ62F0D28pWmKGgBOevxX8ep0VYqzp2r6+41zu-r2FasT1DWzL0QOkG0m68J2W+uT2+uUyWKeoJ3jEFT3AerZV6e7x02qg9Dnq2yCU+iGnTAO206e0Ay5+g43NmnL0laFO2te5M1uesL3BmmhWr6Eb1PIGW3B6822-u7SWJa9T1ZO8RXje473xMslkduvflYARz1wkdm2ue3Z2d+2eCFm-Q0O+7z3u+gfV+egHUBeoF3cAG1nQyQVnEqiL0Jy+p1aygP3tmurTB+5p2Ba1DWuAFL1bCh6286zDW9mrxDO+r9XO+iT35iqT2NwT12Icy80TO683FexDnTO48XXmuZ2Ict93Ve6rifaraVfa3rWNe-iVMai1lUsGd3ykFjViatf0iSiSB9OgFUxeyBaQIff3C6o-0jGk7V3+vBVR+j1Wf8iW0I2xMXoOglX28iunB8jwSs+v-XOi4k0ke5B34OogP12-MWkBx3kA8ygNwi5KWGW+G0s2nh0PuxDlkB-7kpyDwQO8Uf0AKuFm6OtkT6BUwD5CNgOvCjgMkmoo2Y27h0EO4EAsO6P3Hs-gOhyYaDCB+v3ZBKQNDyEQNSBigNN+g3W9C6dCwgX6WL2+UDPi4v1aegv1l+seXkcu11+CHvhmmlOSKmgBXyMuFmUCmWyGm6gXgCbYDuClwNGq5wzuBw03DQAOTgCHwNGmpXjcAO9DOB1wMsQUEQ8gAbl4sK01RBvwNU8c1Xz2xP29AewOv6lukF6XICjAFADSBuI2KBv5CR2qv0PyYwMkBmT15e+3nO8e32Jq8X0be+D2uKJvDXmlCSQGEbiSYLNXOi332oWrDyn+3p2f2uL1oB361-UZf1oasP3e6lSV5B7L3U+wlV5B3jWPu06iSuiMSxB+IPBB7U3cAZINYoVIOeySINsAXwPuCiADjALYPjS5eV+MyQOeB2JlHBk4OFC6IAXB04BXBkIM3B8IM9ye4O2m3Q3ZB5v0HgRJ0xkFJ0u6vlBQe47WWu5YNymxDnM4ZDm4+yrhqkAPgwQZzn0+-800qlgOCBrQMGBsQOYhjwTIqt3kCB1OTx8HvgaBuOQeCFSyQ+m41WO+23282x0fGn93Ke9J3I2WICweyA1WeiKUlmpNXK6if0IC4YB9s+kULCis1pYTs2PW1d17yHkDegEUBPAAADS46CIw0wvGDm6CRkETJ6wf4E1Ao7vq+txqJgXQbX4l-OBgH1rit+wp913ioWDUCvvdiqvh1lXDuFyKpqVVfCeFrYAkV44u3d8Ti+FANB+F44qf9gIp54wIu+FoIqIl7-pbpIisFlpMv-5wnrHdUCp+EFrFrVJEt4Z+3pXVpXMpF+ztc1nboZpuRpX4LxvPErYnE5FMtwSQov+okYafVn3swVZXPHFCHqyNJfq7dnmrSZaYYyZGYas1sYtTVVZqrDV4F292XA1Z89Khdj4uV9LrIzdyYYcsoEgmEpZrNlF3vit1tKz4ttNKgAxn0F6qqTMGpiDpWAA9pXtKmsNcmtkPtMYAftIDp39HHD-MBDpC4fO5PtIkIMdNEA0dMdkbVBddbPqSZ3YZI1FYdTDa-GrDDoiW1sitJU3DNSY8bql5w-JJ53iCbVix2bVR0TvpzQeLNECpZdC4u2kjABIAV4HSZTYZ+9wqCnNjYZl9HYZO9bvoRgD4cMZpRulZjmsqNWXuCNwqv3CsqtkuUAfYyJVks1v8qoAsuu7AsKnNwzvp7psuuhsMmH9izvuM1GQA+kowGcZNEb7cJZtuVRTo75a-DQjPLqR9umq-DbPKisFEbF5pEf9ATEdTpx6oq5b4fTg3iBEjYkeLpnsnb1HYAQZiYAAEl4EBw1jJZl9EdkjO9P-4XGCqdIwEYjOkcvAGxq1ly+oWNrouy1Kvt89SVjEZjmtSsSXIyZ8DK21ghmKck9rrlExjZEjWWVNbIm0jbFH9AxkYfVTvoAjYorDD32Bw1GTPAj-LKlF+YZjDkUebDMot79urMlZKEaNZPEYQZLaszDbRuzDg3H2goEd0jN4abDRYdQN0EYKjsEYkliYdoZKUcYZmlsR9CDIVZmUZFlSjKQQl-tDD9YfawkUaRNfIaSA1gaIlvXsrVADtyjEUZgj8UbR0O9JIjhkb8jq-H0jDEb2wckavAxkaV1wEqp1Mio+FBPFPEMEZ1EV7tBkmHPANissYlR8vON7MBiNVvuTlropF9ZMr7FbUemUBADyjnUYG1bYEZ5vyoF12ioGjIEaGjpUZGjotpTcmEeSlkvLQFRsucg8Tn50v9uEjYSEcjivudFRgn3tpPL4AirHt4JtqPlS0YYlN2qYlmPqvZh0bgg9vGzIwEEusREvedg1vzFmMYQg1lGhjfRGaNDMGBgaocAj+YvDD1-CElezsrACAdiNxYfn96Hsv88odslcYalF2Coj9yUof9coB-9LdN0l1tpGdsftdlavH54hXqNls6sw9VkvKDtksYVVCpKl6PPpjvEhwg7kr-DFjvzFX5oQj8oqNF1dpgjd0ZpgPVrpUN0YijxAcrViUoE9I+rINQ+sc1EFtEtx7NatIsb7AzsuVjqKpdjo+uqlPsujVzut8tgco31vUq2F0XoMVwKq1l2AaQtZBpi1-MbJQjSpIDsgsulU9tNkrBqTj7BtpIMAh4NfBqzMAhqMMpwZ3l7gD4F2hsZVMAFPDnIbY9nnrq9pkY6t0loQtjmuYt8suelHIfbVKaqAjQLpgVFvvgVoGtZjUYfi9ADslF5wB5jhoe0txoa1l7oYjFarqvN66qfN2kvcVbVppgjoekZUejoVKdsVjWss4DqVrYV-zIQAnCtfg3Cv749vAEVQioWwIiqADgUYuj44p1j6PvjN+scbNg0bAjFsedFJsb84pUaNj2LCtjfvr0VyAaMV2cub1jsfI5zsaYVg+t3QcKsjlf8cQ5VoaxwlHCYVEccplUcb8VMcdfMccbUDj7oiF0SqTjcSvFAdKt4ASSpblMgbt1sAA31LjuiQXKvc9LIae9WXqSt8CdwDqVqU9yfu0lBPGytqGBA9A7rITfKqy9zFujj1CaNlIIclVKKulVgtoJV7Ksz9nFEP14-pDVrIdddLMuCtSKlCtYsvrjfIk1jXWuCjSHtbj7UZgjlTrkdxRsG1-nvHFeobqtMktQVt8qLVpcBh1wntqNt0eGjkEYAQeCAPkZ4hw13EdqjbDO+CMmCsZZ8ebj-TqHjRiYQTEgHqDaOoK9CnqNlC8dJ5IQbHVi6px1tTtp59krFlfoaLA86rk846vCTFrIhla6qNlgsfHjGMi-9O6rSdIYv3VE7OgMV6oz9DIc4o2fsvV1Tu0Esno+FserEThVqzDdAdhZh0apjZ3uSltwmNECYDKglxsc1qXq7NowfzFeic8tj4tcUvAGfDiqo39BjCi9DTo5jXujsTxaugTvMck9XCZRtaTqvj47tH08DsK5ccgAAOjNHRIzvStk-mYQxKTJ0THsAqTK1BjjFsnfIwmA9k5XaXdTehSZLr735czaIk3Xa6PaFr2bXvTZNUFaLbfbyrbSdrbA9Y7EVTSHCXYUnlk4G99nWsnWLAqZR7VLFpxO6IJ7XkK65a-bJbZ3zKg8jbIEGLym7WB6Hk5YHDQBrGLDUCnyk74nyOZvaAk+Uq+WCR75Y0-SX4w-HBPcJGJo20mAo937SU+SmkU1SnGA-Y6R+RcmwI3pHdAHB6sVZibl1XfGwTZg6djcQ7rzX2qVZYKmcTSDBBnNVRHfWXGZNeAryY6ow09cDyJOV1HTGTomOze-bukydGvGIuBEQDxBx0DyA5Q4YmmncLq3pE8zlQ8sKQA6d7gCttJUORsyNE4Dh6UN3HW4MMG0vSKGDQ3MH1pSPGFxaaHfo+aGi+JaHZ43hBoOFeBKOPaGFxUEnPheAKXQxRrRY3IBEVSAKvQy6GfQ+OKYkwT4oRQAH5XVmGQwy3GaY99hLUwthHDe2G9vdiKyGVYnHWfBHlk6WGoNb8y+w8f72I4OGLw45qyPaOGZw5uGjEJOHZ5dOHXaZ2ng6Z7Sw6RmZfaf7TqzB2nvLNuGh01vR9w8eG9GEeHgcKXGak8qn3EyFGro4eotmRVA8w+OKiXZBoN02VHQNRVGqNd26-mUfxzmefwfNSumVEwWn2sHZqAAFYIETuMAIErVeIB1nlR6tO1p45mM0v8jSQC9PiJriVIIAelXG6+N7yO4R7CIiU6QNoBuAIohA+pfUoiHLUsytdlYiRFU0SE4Q18gVlfCMWUMiFDOvCRU2Fh9DNkhpVNchwjOrWZqMNe071oSveT7QY-hTIfXUIKhnnQ8iiXPR5KX483lm4aoqOLJrB2GaxVUVchuNax+iWTc9wR8c-tUTxiZ21hy6OqJ7RO0oDLmfSExhRhg51qgPLn6S-GOIqjbnLevGMz8qb1POi80vOrTm9RmsX48otNnUMnnmeubyBhg0WUxm1O6xsANsSdhX0xqMN9JvMV0ZyTNsxvf2mpsxMKS7bnAS-51NJiTMH6uMxAIPXkSRmMOGZktNHepX3Vp1oPgWocOeKwQxxJ7yLyM3wRFx7eQceqyNtB6ul-oJOl+Kth1cZhM1bi-0Ct8FWRypojONxy8UdquZP3+hZMAINJNuAYWNMKwhU-SaJPbGlNzLx5dVg8qJNay6NMs6krOPqi+NSKoDPWZ7LiU2hgOop+4An6iVMJ4d120Z5jPvxwYPGKy4NuAMxVQqxs3AJj2VOyo7DFSlTOlSh80syvcBuxzbMqxyWMkpgfVex8fWdWv2PCWwOVO0YOV66SfWmR+Y0QitnCMCCWMc82Eg98YoBLZrAB76rJVjJ4OMgq3+P+Wvy1MKgP3fx0j3lZ47NwJj1XeJ9AxIJ8PX3y2h3sGrg1Vy2IWZC6lW9yJgVJZ3BNNB7rNsJ4VUcJqhOUG6F0w53LN+q0GUI53ABThtkTzyhGWuB0b16qg1VYyy4O6q0QD4ygjMVxiRMz+4S0rK4Z3rKtK2t+kMVE0+wTmGVvUreoANiyvC36hxuDSJmS1ay+RMiASyM+ZpgNDZ-DloOtlOjZnWXjZumiTZ1+MJS0CWepk+W2xlbMAx+7OIqx7MuS3iRvZz2NrZzcBgJ9blbZjxUXZ4EBey0dlnZi5U-x6C2QWsS2A5sWXA5rbVg5mOW+KyHOVZmOVE5xQ1w5+aDtKxON1y5gVYJu6UPSsZV4J0NXkJ3HNXKjk2+pi3Uh5jePkctmXh5nWTk5ntOU5-mBdK6nPbBgvN9K-VXryhnMvBpnMrAHeWs52r3s5yRO+WrnNl+40OTWw7XAygXNC5tfkN5vjOvKhq0S55zDVxw4SAKuRMp53jNd+353bplqPwZ0aV4IBn0jZnCVLixFUAS9dmESjiPKanqNayjnV65qw1MZzDUJxjIUpmWuXhiF8RPYE3T7YbvCkAOsVX5-LMWsBYSLpqgNbAWiWOZ5KVR8+DmrR3ARnMh1Pn8LaMZJnaM4MtiMz55pPfYTi1I2vCOL5pdnL5ysV2KpNk0csWXb562P6SvqNmhlBOH5-eDUq0-NbYc-NvYcYBX5hYQ35grMnAB-PsB6dlnRz61b55nnv5tA2Cci8S-51FVic9kOlZ8cWNJ2f3AF9rDBe2s2OazIANmyL1b+o2VdJ4UOIF0izOZxzWNOrL32JlvPyS-zMwicAteMJgwAgN6Q4avoNoWtKNOJxo1FZ023hxv3MLiqHNbAMeM1Z8Z0BOkv0zAHJNr8A9W60N1gna-APxxkdUhJqfzjqsVWJmyJMN2XlPSx5lN1+7U0Lq7fUUpldXS2xlPCq6rPdsqBMaF2pNUgS+ORZi-0CpibM0Z7XONwJ+Pz52QtHAWq39J0aU+5pi0p5gfMqF0C09J47PN58gvh+zxME603W0B+-m6Wia285+kMLmtA2MJq8DMJmQNLp+vPlxloOSWofMyJmNUpZhXPyOxs0JFsK1jZqIua5mIvUphcXeWj+Oc5132ZFgBAeWl-NN593M25osAAJ681pFgovepoouUJ4PW6FkWhJ+rQgQhlYNv6-Hix6-fhE0ha1MJ6i3EF+VPWWrHMrOlou+QctDS5kq0ZFsq3NFtN2KGpXN9Mph0L5rYBPxqjNa5oYv5ikYuzZ18yxW-RPaK5IvTFsYs2yz3P-Zk7VLF2YOZy1YujWl3UbFwJ1eq9K1Qm6ovYGlmm0O44u1F04v1Fta1s5potJ58pVS52uPXmra0F6nvNdakd2WZkFPZR18yupn31Mx3VOVm9rDIgExi35o-j9SPxUCF8-3lKsQsEqiQuLB-HnyFrQBIyJQuv224SCsUqCfRlQuOJgpAKsy4s9Z2X2vh4VPSR9ZPk+xo1YB7Qv36oPOjSuiQlFnXW3x6IvfgWIsgxzjMZWf43uu-Yi3saz0G6-QthANkv-UXnl3u6eMhi2rOKl3vMSG9b16+4c3tYVFBNQK1mme5w0SiqUv7pnv37M0ANXpwk1q+ia2M02UwoAE5PHGcAR5OeRkssniR4lqf252+5PeG30t1AN736IGUv4aiLO+m4m2uKfMsQx6P0yEJI2auqsu5+o4AjcR4DRARABsanYto6QaDH8-6kw+2-m4OxwCyStxTisQMuaJuL302nLNSGjn2W+0FKUlp4tJ24u3XWtMMz2jVMsMpH1PIFH3toSvny+971SGsyMJy37MhG+iPbAGo00Byf1ZRlV0os49Ppl5e3Hlkgurp4PWSlnlhCsd6SKQWwDSlytPcZmMPcsdlgvl0tMW6zsORu2cslG6BnlGqQ20AGoCyEHfMYesaORl-MVMuHsswV2Q1wVzM0c2xIv6ShCsYO1CtSG9CtQmzCuEm7CsTW3CvB6n6NSGyqI9l8W2IV252-61ctOK4iNQV50Xb0WQ3ooKWSyG7iBEoOAMm69FAUgHss30WQ2LczisBlpB1P0xMDIgfit+cDsAMxj1VLMlzMeqriuIV6SsYO2StSG83Av6yithF-rNGyuiuIVhivCV5isKoYSvsVrSt2EHss8Vpit8VnsuZAQSvCVsytogMSvlK8fiSV8pWEVqE3EV2Q2kVjB3kV6nVXl5l2dFi3XRZ2l1+WEIPaVwGDyMmMSkyDMuTKmB1Jhy8OxZt4OjiIkwS8W9DVJpROi+vFOVWsjNWZ1guS+nnkHkLuCLu0qCmlruM5KcnXVuygtCZ49mOlhKC885SvVi0CVmpiYNbyDcsFluWNx2mgPMh5KtSVmktFu1X2GMwIASl77A8SN3DosV+08lxANB+tzP488suYB4w0wJnUsE5ia3em2kvUxxCsl2sIA8SSMQta1au5C7QX8Vw0tS+55MmeocuZ5xDlFx7B0cO3B3u26h3pl6WTRIdwBPAG6t1lhgxrJhfgXV321aGju0eOle0hG6wv0OlWV4SbKsK+qbNmesXkHl0KtOqwJPyB2Q0hmn6vjVvKsN2wGtGsUQ37G0wPTAdSWWBoUAAKBLn7G8h16Gyh04Yah1k23B3bViK2DssAtbV9m2N+k6vOOnws9F5z0puJ5BvVyqusIZA3zVkKN74c6vslzEXHsniSlETh1EJ+XB01-Y3BWnmvu6+5BCyKUAJcnO0XFzFM5lzqvMa6OjB6oas5FrFV4IWlA2wNADooFGDG+yZN58z8uPlt3hfloIBgO7UvCqpEv2O0v1pV7jUs126DLUF4jpiFrWiyBhC3V7muRmnGuW154hMcdath2p2s+F4z3R2-avDlrO1zeHB0U1pat40q2tMcO2t+2mgwB2vmshG+rNAuMR0bqmMhiO-UuIqsqu4SA8hCSZ3j81xmvOOz2vB1jrCu1iqie1+3mh1y4h92wOsUOxe2KyJSv7Gv5Mym8GvHshU3gYKSVcGvxngOK02ggFut2FuRmHBl+Cd1zwvxJw4Mu4GVAKoJ00JB8AQBVy4SHB200l4Uesl5twM84K03T1pYRzsueuJB5nCL1oQUMV2euM5vxlb1w4M52XwOUC9ivb1qvO718IBWmg+u2mwADDwCfWcZSEHLK8iAL6yPZD6+AJAAD3At9deD2pu4ggVcODz9dtNcYm8jbgaj4VptsrmptXrOtNsAVADSDd6F8DHpvhrZDvsA5Ge41udbWTeNaLrrxa4t-1bRLx7OhDBeh5wIAhCDx9fDkNo3BkZ9fkZOEF3rlpvTkZxauLWNfQb3AeUDyFboN5HNwbq+nwbZDeIbkxFIbhDfPr-vMobqZZobE+YorGNZJNTNajLGDrzraDczNBNd6tqDqwbtftsLKpr0r5daxrlNextDtqUbFIDpr4tdYTtpalrAPoP1stZMD7qZ1T4Fd8zYQGVrOUFVr1ld-tmtY-LtWFyrD4F1rE1azdhtY3dupYgrptbEbiEYtr4BQLr57rDMttcurdQGurDtdOrKDeodJdYCbYACCb9DaeTy9nDNQZcQrJmbtCKjaoNZ1c9tUTfDrL1ewT2afx9UhvtL0AHkAd1Y-5iDe0lqdbwkGdZKbTkGzrFDoibLta2ZdDpmt5HKibpRDSbBBsFrohGjrljvz9-yep9DgcQ5Cpp4gfdZkZbdcODHdcAbiQdCTlAt7rkzf8ZA9coFQ9ZYrH9aTLE9Y3rizYkIKzb8ZC9anrQgtpoWzf8rSwl2bR9ctNK9Z3rhDaob+pr-rm9fPrZzdPrPDafr4QBfrN9bubd9e1ND9cebL9ffrrzc-rMjO-rk9e8DTzf-rSpuuDMVcoFoDdwAY9dAbv9ZgbsAjgbBBrEdmNfSb9TbPAoMpJrajbkb0Nf21ODcYAKMvYbDzc4bo8iTLRDYobFzYEbwNdkDVLsQrDDsYb6Lft5rDZVN+Le1NRDZ74JDeJbvDdJbzLaobdeZWt1dbIdojZzr0jedrqLdoddLYwbxNfxrUjsasUemUb5NYrrNLeGzPlmpDq+j0r2jdoteZslryDelrFrKMbBKvlrzJc2932CeYVjbVrMkBqlZtrsboZdIjzjZmDl3rcb8yZmrzfqWTQdbWTUTZtr1Ql9toTaeA1TeAzZstdb-jfdr8PucNFfu+VadqSbGDpSboiXabGNrzrC-CybwTelI7dtybCVaYLBTby9N6HkA8dddLSTqTrZTZDFFTfTrVEkzrIRrpDdCe8besfAt-rcabdLePZrTa2V0baZtlde6bUJtrrBpfyDRYCGbIzbcDYzaldSxjmb0zfmb4gC7biQYXVizeHrgVZ+bqzfHbALaoFGze2ABza-rmzeOb4An2bk7e2bRzcEFJzYXbMjL3rVzaBbNze3bbgaIbe7eebh7cSDHzf3r1zcoF3zf6w4Df+baQf3bUrrgkczeAbhwYhbULcgb0DdgbFLcRbZTfLbKyY8NqDbRbkrYxbRNfeLTDeJVODYkIeLcYABDa5b5DbZbHDc5bO7e5bgjc9LTNribSgcVbNbZYb0HbwbsHf4b-vMQ7BLeQ7R7dQ7FLczL7lZ0bhJenLWrYMbdOF1bJuv1bZjevT0wjLk1jY1ro1b7jVracbz5ZcbiLvtb01bKLANa8bLrcibAbZAkQTc9bN1e9bjtaFbvjd8KEnb9EsTfk7Thd2rPtfRbkbYIjcrdUbsbfjbz1aTbN0j5babc59HwuKbubYhFBbdhIVTbEdpbe2LZtapbEjarbK1Bw7iHLrbZdZ076TabbxnZbblIbbbuxZbpnbbmbPbdkZw7dkZ3litNszbizEXcHr07bPb49bi7y7Znra7f8rS7c3bK7eXrt7fObX9Y3bs7fAEW9ZS78Hcvbj7fy7tzay79zeZbvDZPb19fi7F7eq7QgpvbY9fvbv9ZK7ADdBbcEjfbn7chb4Dehb3gdhbVPHhbtFoxrNFZvL0jYU7CDt8YIHYVbyufkb5RY8LbIk0rDbYmNoHYNlhDo0bC3db1PncJNZKaQbjncHtuNeA7mHcJrM3axbKBahDeHbYbBHbJbRHa4b7LfIbhHZ5bmrZLLqnYwbp3YDTuHe2AMHYIAcHZQ7CHdu7SHYe7aHfOLJxvVblnqJL+jfO9MteGTJurwQKQYBAwIEmw-DD1bJjcELoxZGrBarMT9jd5YOtb47trZN1U1ZwDjreRNonYrredbdbknY9blga9bPrf6b20vE7jTcDbYraM9KKb2rmnejNFnr0N3NfG70on07lgZybRnaoN9Na6MfndbLAXY7bzgjC7IXYmbrpu7rMzZX5czdHbK7bi7hXb+biXfS7yXfK7bzb+baXby7q7c17vzfnruXdtNBXf17xLcub1pqvbpXfi7x7Yt7JXZebpvb8ZdXdt7Xzfi7zXcBbL9ba70VY674La67H7a6wX7bhbP7f2NJgAAABkBAQ+2iA+yKCGPrLZ3am3Q35O2T3-G652W6e53gnUt2W7T9ItuxNbk6+U2cJJU2i29U2E0xCKA+FZ3ZAPHwM65ZJdo8N3du88WnOwd3RW1N3xW+B22eyPzFu552Omyt2NFTuB2bZpXm29t2BW3U2E+0B2G+0d3ZG2B2Vcx8WzSzsbZW5z3Tq532hU3HbVW0pXqO1OXG83R3Iezq3oexlW4wJA2rU8YbmO0IXBPZa37y442nyw+W8e8sW4S-8bja2uWSe7p3XW7v23axT2w7dJ2wm4K2xu2T3H+9HBGe433me+p2IzfJ2tOwnb2+zG2Hq3NhpqAm227ZHXXq1n3VfSL3ae2L23AEF3W6zF3e22F2B21F2Qg4r2lmyPWVe-PW1e7r3Nm3gO16zr2l65cJiB+PWje5vXTmw73ru-V2j62V2x6zb3L60IL7e2PWneywPr2672Ayw+2PeyC2ve7pJOu-73uu9l2ZGb13Ig-13Bu-lbg+28BgIFH3hExhJY+637-2zQyH+x8ww65APb0Fz3M+4L2MTXm2PhaX3khQX2xHYU32JOVXC28zRC+0i2Omyi2wgFI2xu9N23ixP2IO+o6iwHWLpA+n29ffP2pU-bz3BxQG++xNaduw53a+-t3SbYd2Xuww3x+7N2nWyPz-mxR2wq9FrvB93z2bXEO1W-laNW+SGfS9q3DG1v3DW4uQ8qDtRjG0KHeSwKXj+9rWL+7CXATSbqb+1mBo04YPwZPZEcIPuRYSPHwLXWQ6Ru+I3QhyK3Ju6P2PlVEO3u1P2U3Ow7Z+xTXHBwv2Ry1FYAh0627+8i2h+9Q7EqBVAf+70PQzf-3w26w72ewHWQBxh25h7dAFh9E3mtdUJPa0APgjBEP4m6G2q-eWBYzbAPnDcCn3+4tW1k3CnqVei3K8Pz36YCMPB+x-2Hh9cg3I+GIme42aa7cZ6W+2La+3FcPdB6Ra6g5z7660Snvh8fn+xILncAMSnKgJ6bY7dDB288ezEyFzXlHdm37eYmQoEzIOgIJH30MNWX0Rz2R8CCgRC+6YP6h80PJ4z03tPQCndPSv2CS7R29ux76GS7eXvsPenkxYiw2gEj2mOyj2Sh-j3BO4T3hO9n282+DWNc9RmTS78WPVXHaHK4SarS04QbS0927S4SnEOYYPC+4EXoAO6XQe78HH9ZrW70w+mHdMYaWC-ObSy9MaJgLdb9jTYnigxaPY4AuWD+2j2Tdb3H0A6GWKh7Obiy-H2P++ZZRRWN3AQLmQPUPgAaPCB3wKNynhq+UXug-oP7ebzSQO9yJpFUK3sa4to3gG-SqwGxYXB-mK-R-TgAx9pLqTU7WgxQQQIRd+myRzBg3q2eGIe0K3EYEmO9ZSTWygL9ZtgI2AjAG2Rcx9ORsE9tAIRZt3yxwkOHk02OMGJWOKZNWOodBTJ6x42OOx1fK5kG2OU20yPszaCPszfsaCe+42ie4Sa6x6W6YMCnW8++Hx7IjT2cdEOPVK+v3yx9z37Bx2P5+xK3ux+zbhh0K3OHRRnfzZEPVu5P2aU3w7tO+WOSx4I7AB862OxwmO4HdQ7Cx+K7DhyOPEkxUHVh77W+SxsPUmx2OLx3SWnR8BPREpK26k-+OEm2163h+eOna0L2ZBRI6mx6qXOYCl5oJ3+OzoIo6E2U7WwJ5Nbo+9SLoB8m2CJ20ABbXzbRHSB3W2-SOi-QRO7O9YPSe2snCx+zXyOT8msJ502l7UhPpxzqOwe2cbsy7uOuPVD3AJzTAbE9O3qKGmPQUMUOwx2MGuOy6OT+zj3z+7iLJq0KO+Yx42AY3H2vO4n3q25oOonXP2dBzOOUR6bXOJwQm82UyaBE753em3XXqWw3WJe8F3UB6F3+2-YWe6-L3ouwMYrTTgOJ27QOv6wQPp60QPvJ9r3520l3Mu012qB1u2KB7u3ne8b3GB+A3mB5b22B+A2OB5b3Gu3e2eBy12+B8+32u4IOfe8IO-e1A2YW9+3kR1Iac+-m21x9Z3jB-sbTByX2yp2X270BX3aIG0OpDQnXmuIi2Oh4hHbBxN2mm2iWm+84OgRym44h54OsU2MOpU3HbUh8v3eJxLXMh12Psh-aQjKLmWJ+eZJMgL0HBq-yOZJ0f25J7VWsew+XrW7j3lJ643Ci9f31J4B2aDbA6P817zIDOsGwAAQBnA6P7xeKcGwAK-Xng1r38Bz-W+uw8GIAFfWnpwb3Eg+IPLez8Ghu7Hb-g6eq46-saeE0Umk4PjggQ8VPIx6VWapzIBBeGwArBxCLaszXX4B6dP7ecgOQg1L3pgOgPnJ3L2h2wr2Fm0r3lmxQO1m0l3-J013SB3s2Qp3e2wp-l2aB0wPze5wOrexFOqu1FPWB7V3EaXmxPm7aaUp6IOXpzO3Le573tTa+2cp1A2RBxV2xB5+2Cp4H2ip1CaGJ0RP7ItE6Mh-4XBJ6yPinQv75p2EAPKLZRlCwuKHRwCWkC96Xth1CaQuKMAdZ15QupyQGQywpPCy3BHEo21OK282m2OzkBNZ4AO+y1tPT+za3Xyybqig2nSLSy+O2KLLqVyyB36IyHPPa4mBLgOmqE1e8PPR4tWfK4SaVzdqaUy7FWQxEznLQOxXSO7TmsABnOrJE7xxA1Hoj4BnPwgFuZkyzF3Kacaqc5wxWcIOnPM55XPc51TwoBTxOqOxNPVdcaP2q892W29dbbRwPyJrXghoM55RpIEgBogHrOWZQbOvTZrWXcObPEAIPP7KGI65xw62RRzNbEnbHyGOLI7Nx7uyYZ+RzDBzZ2QO4xO453uPJG+EORx0ePm+1hPyIPN2yaQ+PzxxxOTx0kPVc6HnFG2yIzx9I2nx-jajh9knLA+YBeANEBvMARQCJzRPtJYCnPawrOa+94buexbO7qHbWlZxxPvO0K2PKzmn0h63OLDR6XEq5OOgo4onis5en2p+Y2MFeOaO4zY2tEwqHNU-mLnR5tO0M9zGyswdPhRzIajZaYOX-SLHNR10VrQ5knAk4X7GPXLG1O6vG3CwZ6Phewrt41jyOSPvH+FYIqJBKWAI040XiM6EWbAH1nQA3cqJRz8WH55pb1c9eOu+7IXDdT8QWO3KAYS+Dnls5bKjZXuB+E8bhn0jLn2QE7mapcQpZE6YvFQF9mepaInR84qA9szPGUVVXx+WBGrjc9pKIE+Tg8R1oXqFzFaIc8DaFx8dP-o84aD85SrXBbCOGBbSqMc0yq8EzvahE+DPIvcHHb7cyPkpXjnA80EvRpWDPyFXwmccPgmElyZPREykv0F+fGAY60Wnda7mtgLLm7OZguuJfqKsF22rCmSroNQz0LVpwrWU2IRAAAFr6pw1PGpzUBkLhUNISx5kF1lUNswE0fgpe1NCcx1MhegEC2cDsz8hkhdmYaScK1r1NX950Uxx9QCulnkUHii0NZprxcKcSri2hnlO0N6gPF92wCxpr3jxp0wfJp85cgi4tsLijNMv88RdvmqRdLKvNMLV-SWTLyJlhl0ZCthmUsR1h2dgL0ThnluMuZie8Pr59zUwZtd0jhgMzjpicPoJinONmOFdbhwdOLhl2QrhggBrhsdN9pidOh0tFe1yPcPbAA8OIy87AHhs4sHR5RM4L1jvrp75dbp4qPBZkZc-L8rXvpiKspMpsTDLqZfnphqOeV0KM3pwLWcjqFf6S59NeB4sOHpltPQaqAAsT7lffyxeCkZ4ED9Z3lfKW2ltESp8UZiwhe7isiWH96aDHRrRfZisgsTFj0VL57SXeirzM1i-0UQS78XIxg91c8tGOc8sTP5p50XARgYtSjxgOMqK0t6Z6qvbL-HkqstjPxhjjM7G-Cu-LqXnj57BcAIN-MlV2blbq0iD2rj5fWJyFlmM6TNlV-w0sx9zmHOxTNhrhb2uypb2WF9TP18x53Ncs8U6ZoLmMZ6qtmJkLNXOt5NHRMzMT+izMdJmvuKrvzN0x1dj2ZpksGrqY0iFvNX6jikWULpSWqTgi2ZLxuBMLlGejx1Uct03d0PLprMxWCXkqytrMN2IdXux-dgvZwdVuJzQv7OgPPB5k6erOsJfI5o-Oo5wMTaC+wSBiMZUsetfuQx1otd6yNPax2RdAr31utABReDFpReu6wgM3j9Rd-Kx0ewJvRewq1bPAgJxdGSu3NzxnxWVSsfXO5n9CAxj7Oz6wcDz67cDqL9fX76n7OCrhcW7Z9bNzFlxns8kyVSxnbO76ypWB+tJdmL4DcWLkK1dW6xcIgWxc7lhDf5ihecUM9ddG1o6erJzdfB6tA2aC-QUxLmAAnr1WfCqgpeWBkhMTjmVenr3DemGzhMDrqZXYbkMWBiWpUWTwnP0b0JdPzwuf201OOVz+PMCTjjeEJywNFLxPOSLpUtSJ89ekl4jetu86MKp-8Pod0FODcUzSwK8jf0ljWd2VxbR2NihcDxqhcrF7Ze6FovvnawwtMKphezxkWPRp2hWcLleNKOteNwGvhdbxneO7CIRc18AfiHxsRcXoCReAB2pfSLjmTXr4IeXju9coO7Dti5votGl51f3xx9dvrw2c96g3P6Lh3NYAX9cfC0PhY+hxcIgYrfMBlhdI6-2OO5-Dc5RZABWbqjeXZlqWQb27NG50BMPZjzeAJrqVwbzfW7lgxd4b72Nz0sDe6b0jd04Gfgey-7MtWr3Pb+r+O+5vxe1bqoc0L5bfBLkosfCslVk5pHOlmXdfoJnWQx5nBOxL1Be5m1JeIblPOCbpeeVtqTc2F5W2w2rbf552Teaq++iV556fZz-pWGq-mdvblnNA968sAIbJcfCqVV5L9TeVxwC2lr9ZWgL7SWbbrvP70wpUDWlvM852hP2d-nN3b6Hci5nHMgW9OBtr1hDlL32OVLsoDVL+XPpVxXMpbk7vSji+BfF40tZbj4saLtaeAl-LdfrpbeVb49mlbhP2DbxxfIbiEXdbj7PmLhrejbpbcQbkOUL69Rfblk3Nc779efZwOPcb8rdOAHncjbprdygQxeBx+xdTb2YsA5qEve5+be+Lhzfwe6jfzjy7d+t67fIJ27euMCPNoFtBNR5-bcsbrIx7ypKur90Nf8b233w72jexxw3ew5rPObb3POIr7OdF57VWfb1eXl5gZVz1r7cVCuJdiq-7dVb6XBA73Rsc5kEtg7weUh6vnOsyqHe4AYXOw75C0XbiwMVFuhMhi1pXwj4XMhFk8v1q-vPAl-SXSJipd1xsfMKJ7HNoL+3fGbtiQcFqp3bp0ZOb6vgvpjtpcGtizcdr5BWza7ZeCl2RUGZxld0r7nWu8dNWiljZniltLdyl7xDEVgSNIMlddxbtS2LbirNCbi+D0L1zcNOz+fF1swt5Jo9UdZ9hduB0JOYi3zftZnhdALrAcD1o-etZ5JMSb5KVDrqNd5Nk7eab50XhF1LO-R+9cur6ndPx413U7qYu5bygA6Lh3d6b-IsY72nc+KvItY71Zerbx+MIljJf67-bWI7x5d5yfYvzWsy1LW3aPA72LelLrTc3FzvW1xwnc-muE0k7tRfcRlRcZbyUdU79Rf-Fv7PjFkveTF0Et-7zPUQlp2Ozbo2UAHjxPa77l3ZF1PM1Dp+lbF9eM3boA1Z8A4utK7Evqez90abzA+vL2vel7nHdWLtneO7li0x70btdFpVf9DsndZgCneZb6IdxFhq26rnvXgH2g-uW+g-UHpg--xlg9IB0ONpyijd9rovdcHjPdQH36MIH9bfolqQAouslWiHuovHbv9MSHrA+jSsve47ivemG+y2SHkjPMFjudeV4QvELt2csygYOL+9rAHyLkv8F9vd6HjKA97+43FqyQsAOkUuKFksyjz0ScmaV0c+zgBCVGpCvmakpfSHjhCSR9CeuYAvSms2ZNL7lbfDOsSTMp9-cUH7wvZZgOcm6hUe3kJUd8bghWjr9JNlb2Z3Yj2GccSB-dCNvo9Gz9BVM1zZ0maAcsadwl02z8odFHslC-ljH0grwQzxlxMsoD9yfzyOi3Hl9JWzH3F31VvWv9WtY+xr9Wd5lk4+Ip2svPm2ssfGiWTkoJsuvQNtuOAdssvHrsuST1I+GJ-ssBlhY--G2Uejlg3XjlxNNyEFWd6NtWdpZziM6gV+0lH8OcxDlz3XH4w0i7-rfmbrFX0R0YA1GslMILrM38T07cEH4VV3l7Ws7TpSfflzDVLHhxtMrmOXnH5Q-eVgCuGsoCsG6kCuAxlZd3jhMA7j50Vyjk3Vcnj1U8n+ytAnglV8n4VVCnrFUino2VinlmUSn0aVSn5KVOVwk0uV4PVuVtuffu6is3r-SXqVia2aVsoMT12m1QAPSvangyv-GoyuEmuIdlBh+u6nyyvL+3U8SV3U-yVg3V2nglWKV3V3Ahjk-qn5NeEmrU--GnU9lB-U9enw0+Em408TW008S2rmdCVs09czq09lB2yu6nuU8TWhU8G6pU8oL5Ud2ejY9+VnyfLNokzDiEKt26j9M5GtM8yM19tgAOKvtjpM-lH-9OrO6fMsj2fMja5Mi-VpxDaHpzMb5tVeqW8Ne59sY+9smq2lrsasnHitfVHu5SNBu3e+wakt1rxLfIa8ANuAbFBhZwk+9V9kv9VukTcl5I9ar-SUDLhd1-Vt0fxWmw+lK53dopmYemjrofLV9kvuiL8xPD-Y1nqmTuhV7H3E2tZMrVo88-j7qd-9uCdVBkSeQd8jlFxl+fJn82uxtp6t89wzu26rm3ghrh0oeyMh1n-RAjTlE3jr0lNg1rgONm3GQgX3KvqH-1cpuMlM1Bi3Voz3gOBduyc7H-mDt1nGdOT2XuDtsLvYD5XsBT-AcZn9XsUzu9tUzxZs0z-mdr1umcm9xmc8zg9uszpi+UChKe0Xxfmhn1i9v17gevTyIOtd-gcizsFsQN3Kc9d6WdvT2Wcp6-ftbCswPI1yvCo14ojo1gn2OzgbNgp+vvWMKu30B0ndKLtFMj8smvSDzI0+F7-cUmsXm01-88qn5QeGXvOvfn+3mc1tP0L2gye525E9D5kyfOsbUBi123dlnio+0n52c5D58+kcWxMvyVCB3Wxc-vr0hdlDyk8kn049alho9672hfE9mYAqD4FfOd62vP9j+RU9ojCZXu6uQ2lK9P95Tt3n6C87Vx88vJ-y9y2SCfXz3UfLdvTtJ9zQcArryAwD50-B6phep1nQBCSe9DF+5o+rjsY+7ziy-0hpK+bCbScud3SfY+uBf5Ng3WAQOQdEjoifhATT1oz9bv1ilmVg2om37nhB0aX5O1EHzBsDDzk1Qh3Ft4NiQg-do9u8N1lv-dkjuA9i8+FG9a9aX4g80mnFsEAPFv7XjhvHXolsA967uPdry+7WvV0D9k2fRl4ftrXjK3PrpwcNng6st0gPj4d77uEdtnAnXyrv3d168-bzytE7kgMA3oG-75j7tfdg6+JBveuQ356+nX2G8Xnrm1eHxBdKHhG8xywZOMdlktWKL-t5HwcjLLjvco2iK-Y9qK-8dyofkpng9Rm3c9eDz-vqD7-tpX8OvU9y88rXjrBf96Jsqd+89nD6TMADqE3HDsb0GX0AfUOuNtC37Ju-n8Y-Du2W0jH7ec4SVq8VTl3WdXts8JQTW+WD2kOaTlu2DXiAez2ka+OX9+X010M0Ej0CBTXhQf5OWa9WT148YzzC9YzhyfS9rusOTzAf91+LOxdkmckXteu+TvZsUXji87N9Xs0XyWeG9mdvG9hmexTpmeW94+ssX4runtigdJTkrt8zyO+B3vi9CzwS8Fn4S-vtsS-+9mWcDdvEsfGpa+dzn6-qXq2fR+pG-Hj9YexD6dvnXwy-OW9RujTxu+Xlz68qXpLcSS36-V3q8dXXza8IXs7st0vdkeDgGcY2lu-KrqVsKKhYTSBy8sE3lVPg9-71Qnvy8hXmm8pHjahw9jaBYARHtU39mMbT7+TEn3jukn-WuA2zc8XwVm-Cmru-JX+nsrUd1sv9jK9ZX-m8tt3K-c3-K8e1-68Pn84clXhctS30SDN2jm9gDmq8GdkicC9sa8Eq5q8a3+wVa3oE1bztUdQPnq-B6iHf9X10Am3jQdm3hy8yccy-B6ia+Ej-Mf236JyO3uke09j4WYz7U3Yzvtsy9r2+uT8-e+3sdv+3prtB3uduu9qi8Zd8gcB3ygfR36gfW9+O8ldxO8cPuKd29zmeCV7i8Z356dZ3wWcCXzKcCDnQ1CD8Wd5TgPsl3lC94B6++3rnu9V3hcuT3tQ86Xsq+t9ikAAPoadI3sC96PnjdDngn1fXmcsv3jR+aX1Q-aX28fsp6fvqsAx-gLrR8vr7uli83vv43zy8+HozcEnqLPCT1S14IJNd00bkcaAPe+Ch7VOo9hg9o6em8n3owuUbrc8r7idddXvW-bxwPiTEJoekj5citD4v3l3768TWo+eIOmx-1sxh29T1J3ml4hDOP82uuP669EOoRnYPhK+qPhAfCtufQ8jxYe3nj++i3oq-f31nvlPnY2Jn9jfTTqx+7Dgof7DkW8A1-2t2hYp9dc4q+Zcy4fILs41m21EdfJ49nsTl3WmD3EesL8a+yDvB-kjxFUtkKa8fGyB9jHh3jUj1-0Uhp2+tl0h+u38h-u33C9UP3Y-4zwi9EzzyfsPxh9kXwgfzt0mesPvXuhTrh-hTgR+8Pl+v8Ppgdsz5mfsXzO+cXkR-J33me8XyR8ZT3SQvt-O++9wu-5TiS9KPvicxbmjuTHi49z+yzeBPjkeGj9DVtPte+RPgUdel6Y8dVg3VEnyk8gO8kT+O1e0Un7Ht2z5leAr0c8bO1lcSrvYc78KVdePyaeLPrLP6j-leGjowvjLkIeXHvSA9znqvxHm0eUQVt3SX9e9Ln2xsH395TLHrjDjm+l-uO4w0Ie5a9dzmyM+jwk0Zj1f1QQIMchGkMecF5mMZWiMchu2mlemyseun4m9-B8tMYK1Mfoto19ZjkMU5j+Tv04fB-Zj0x++PrIdjd2Mf1s9Fu1j7cd0toQBjjxFUln+BsfD5Ju9j9pTotixnEwcN9TdyN95QccdPjtIeYvlW8Cd2K+wH+K-bd8N8pPtvih8yYiF9pccNjh19+PgW9kqv4e2PwG9bX50WAn4Aexzrzs1P8YcVP35BTDxp9qnx19r6tZN7D78edP6lsht8W9rDyW-lX1t+xvg+f13-p9HRX-ti3nZ0IThFvXD+OMrzvblrzxqiF9-T2JLxNugPwK0hG45+pPst9aNmk3CO7SX8275BiOwBchi4Bdblo2+y3kZ9tPqCjT3uAJXEQsjaDrB+C9xkc+P6vePe9Hd-liV8Md3IfVn+I-iT81sLnxV9hX5t+xPr2e7TxmQxXjg8Fvhw9+Hx99YptB8VUDB+GXi2-Kn6YcmFywMMmne-dv7V9oXhRuDNm5+jNu5+UPz2+PPgi+Ezuh-Ez3AccPsmfkXr58sfn58R38R+cP9Zv0znh-cXkF+xTsF-xT4R-czmF8NduF+8D4FvSPoS-e9kS-yP1F+KPqQeDP4VU630qfdXmB8G6499t8RB8qj0zs3oO9Bl3pp85X6x+XXht+D3nR8OP-qeN3qp+JDjt-GPnY06n+e-ePrF+Af5e-+PuenyUF71+lhQweq8eeCvlV+CKI+9n96K9n3-N9Cdwt-p513dG7wQ-nT7ajkqiMTXTswW3TqUD3TuABfTqdvZ3-rv3TlAAZfvxm-Tkrv-TqacCloGdET2iAfG-7c3oSGcfGtT8GDqB8Iz3J-Iz9fcXP4h8KBl2-DN+yd0fj2-amjAc0Pn28OT15-cDj59+T9j+UzoKfh3t5+0z-598fiKdAv6KfW94T9CP1O9cX8T9cD0mdpT93vSfxF9ZT2R9izsBscX36eSD0u-Ini223ESYgtVwc9xbpr3qppBXb9r9DDS683+fvr3Gzssd3fsjjTzmyiWzxFNMvuJ-avmk-9vle-SW4WTZAaI9mej2c8dkL9Unj1V+zgzWdHiZ-snhBnwnqE1hzpBn7GyOfwASegxzqS+6v6MsJz-HtRV25+7Hos9pz+ud1zjVUiABuf5z0n8lz3Cxlz3Y8Vz8n9VzpkA1z6n9ZzoucMVxudw1pBd7mlz9sh681ivoD8b9yV9yv6V-F8mee2Uf0DDz8J9LLsl+gH5V8Y9-HlTzyBdzzlSfhfmjdJP7Fsbv8jkyO7d+-tyzsIPzT+Ljpp-d34POmf04fmfuu9BvsXk6nwacuPox-JDvs-7ydu9rviCfGTr+doAH+d-zwvu3v+a+F95B9id26DK-19+V187-6T799TjhZ-vXqQ+GbqP96ikI88h+pd1Lwm9NLj6lELhZeg-rxigYECCZkIjB9LtmBPf1zMK-gB1QsgKjWpkc-fq4AotLnhChX1C0lM1DCJHiiyqTtPPOi-1OoGwNM-sYNMuLw5dhpj2OXr05eIqlNOXL4CXXLoEW3L70P3L-MWIHyEXPL+ZXA94+XvLny+NwWmP+gIfdlpt+keZ6KOirllepnmZlP8dFl3h6Vd-6htcMK1f-EqgsNcx90-2ziMsSsnf+nMvf-1-g-8xrxf-5Hvld00AVePpxuDCr19MHp7f9Hpr9NEv39NQi2P-GDUm132rJzUItS3-Nl8WeVv-QWkpVyf-Tocl-3jXVDB-lx3TTVkyT1WPD0d8dU5fetMwVz2jGACQANP4B-9FRHBXXy8uuWYYck8VS1RtbxAuYBDnRSNoY28QFSM4Y3UjRZUKV2j-d+cOEErPZ-9mvUhZUvA8qzdXR6NtYw31XCF2dUzXZyVVxQrZD1cTZX-tc1N1CGMzII1S6T+jCnkkYwEzKgs-Eyx9eACqV0dXSFl4L1dXZTNjVwIleNNTFHdXT9V9M2L-WQDGqwmHdugtjVs5ZQDoJUEzMZ1to0aFDQCK21tEXCdkzWBjcc8wgGV5KMM1eRIADXlJAI2IGqsFQ2QAiwCR+RrCWwC8gBrTLddVgwUsfQVoQxBPCAQmAF4AsNlYBDLfe-EEgPAEJICMuVSAkWJYgAdkDICsgOc5HIDJnDyAhGNblQ+FAoDkgJNdRudcgISrZwDx3VcA+Xko7QrLdVNvAI7VKdB1eQwgOJIkiy7PMwCQgKM5dm1wgNzXOwCgCzb-GIDurB+HVPl4gP59WQBEgKqA4EBigPSAmYCZAESAnQCFgJqAkeQHZGmAmcA8JDmA7ICNgJxcAoC1gMakA4C8gPJXJtNsWxYbXFtKgP2Ast9DgOWA1YDbgNyA8lcm41XXLgDf1TcA5G1GVDaApSUOgL8AroCAgJmVfHl9RDkAsICUvAiAuRdogL2LZPl0E22Aj10DyD2AooCNgKWAnYCEQMyA44DFgLyA8vhrgIeAzID5gJOAu4CYICOAp4CSgLevcQ0xzwGbEG8cQNRA2EhEQJSA04DSAGJApEDCQJeAxVM5-x5DWtdXfVajXBdfC0BoJSMiJQczQ2d7PQFDWD9Av1jDKKM7N17XNX8L723PSgA790cA+3N+j1M7FGMZ1UnXbxlL90bNWdcUk0WvBddVYyPYXFMDNwDfZrccVW2XJvBEVQJ4QMQ91yYFKgUltXFlHA94LUAVPv99JRf3CI9RkBVlJgBjgJIPWgBT9VgZfEDHNRy3D7M0pQZ3FmV3XXqoJN0Wyx6Pbnd6twOUOQ9CtwF3G7Mhd0c1FE8Qczy3GfVJdy31D7Mmd3I5N2UAN2nZTXcMvWlAj9dUP3PlWUDoc2i-R+c9ixY3K0D4lSt3BPNo9xxfLIsZiHV-OA8Rkz4PCEUGExQPRa0nEDE5DA9-3yf3ZKUSSxHzXTdNNTlzeP8lGUpXFwCtnXwXOBV1VxUUW79wrzFA-uNWUEHjZD9l9xbAx-0BjwMLETNGFzVvPgMu-xq3HUDaJw4XAYCva2cLbUDRpX4PS4DEOX4XYLcBNVC3XhVa+Ai3YRUs0yZdFgCnQL+3BLcogMiLRs1CgKHvT4t0t1ekT0C-nRmzMWVQwNQAQEAIwOEAiw8gVSsPG2NP12p3QxdsN0hnaXdZdxdzQI8SNyV3Sbd5DycALMC9wOq3H9g3FxATFxVPFzF3AsDVwMUtGA9Al3XA6T02wPNAoQ9OwJOLXK0WE2xfE5dCt25zUsDtpXLA4G8iwG23NcxIl1iVaJd6VWLjOG8Qa2dAlTcclS31Ypc3P1GldJcqIMi-DjcRNwB3XJcnqXyXcSCD0DU3esDDQIbAwfN7QMsXIjdsIJHAmpc+wOIYby8KMzr-K8ANEzkzNkcFwILVXvcMj2L1MxMQQJWPDahusDkwU30tZRKPGfcJikEjefdC932tcI8Af24A+5l1CEsgmAt8XwmTMUCDR19ZEWMXQMF-VK13QKAg451jD3E9c+8ND0ogyP0NfxoglEs+cwFdPYsaizEPUD1eWxzfYyDtIMbAn0DqQD9AoK1tNyHA+4sgj0MPEfUDD22tfE9cXzf3ZdVfwMs-ZRdvQISg5G8jD1AlCA8ScFSg2w8mwOqHDiDNi2ygyotcoNi-fKDPD0j-P98tIOkg7A9+qHL3MksHixSLf3NGoIpLWP8OQK13NZc4r2LAgBA1923AqwsIRSLjLyCuFz83D1Up-yLjT8MfCy1Am-dUk13AoWN7939fXE9SoKClVKsWIGd9AX8a32sjTftSrwwYTWtXIJqwWA1fk3+-TQC6T1EZA18mO2rILMdOqSxVc19g1yVfJgNrX0RVaMcK3XtfYz9AZ2dfFYdXXwRrGGDEUEzffY0fXz2fbSVCxyj7aJ0Lr1YdBN9d2QXLMN9lx2l-df0WxzFje3kY30qvPc9Jb2pg5hVq+zuUVN9wRyZg0E9PXxegxqMAPxYgj68UoMLAtcD5IPKVSt8Vx3Zfd4DylW6PKCDCr03QSqCURy7ff+9ZoK7tAm1i3xIfRWDmJhUPTdBEoPh-IYcKrxU-LFV-hRQfDJs3ABYnfulyOTJgokcyBHZwbK8rzzlveHBEcB8gOZdP73+HT4Cvjy+jDCdpIls-SrUfCyltHrlocEbtcECGnwgfaeNLYO57G2C330lXIl8+yEdg52CvYOvkH2CFy1jbN2CAcE9gyd8wQIDg8e9G20ltH2DRI3cfPOCL4g7vFr87AxIfdr9JewcnWaAnTT8ZFOcDBVxnSDxIuz6-GRkB226-GRlFe1zAMLtXQndNY78XdVwfW29fXxDFe2D8x0NvZQcQxR+TK285qxx-Ap81k3Gfcosx30Sbf6C1y0mfKNsC4MsfZWCZnx6fGv1c4PnfTYdufyzLXn8SoLYA5dN+wJaguNd2sEBoLUVUMFCgmbUxQKbEf+QXY2sgrJdPwIiLQg8fwKNg8pVf9zC-ciDOD2GglD9nbycPUXt44I7A1w8cDUYgtA8RIIe9UWCxwNMgsqD3QNVg64t-5Rqgza1VoLBLXIsaDyagpe9X92-A16QUEPKVJ+MPQJ6g3fM+oPqg-SUEn3J3dKCRoMyg5GDaIOafM6dpoNxLX99XP3gQy+DFoKjVWMDk8zqgtaC11w2goyC5oLMfMiDdoMXnKWClQOZgtQDWd2lgk6ChILOg4-c51zf9ORDcm0tAG6CQzTugowt5QL-zJZ1Lv3hvQbMPoK+ggKD3P1IAksVQPzpvMUCgYLAoUC0kPzEQuSD9oPzFEqdLS0GcJWDg2zagohCET2+jU2CIT0ugsUd5RxcQ-WDWoO-gshDSF0sA6W8PzzoXY90d4Ll5AMAm3zq0dFMUvGUfcpVW-zcQ72CmgI6gyLky4O8Q5qCPDTI-Obt5TUo-bts64IbgkIMm4IaEFuC2QjbggmcHn2wvcZt7n1ofByde4LmbfuC2ZEHgnB8dnxHgkmCQxXhwcmCTvyngy20P3w7PCt1Xx3yfVX1F4IKvZeCv73HfNeDnbQ3g7JCfEKGfaJCVh1mffeDjYIisECdj4MtvBe9hYPZAmvcJjwaXZP8E-0OQwNlU-3bXKI90PRTYbAVxDB1DfP8a-36XTWs3pDKZdpl7oPiNcv91Qzfg6m9Zf1ZPNiQ+pDvDDPQm-w2XFJDmGw-9XZcZ-x-YENMjl2DVYCVo0zNzGRDnRRH-HnhYUIw3Z0Up-wDDRP9c01ig8GCOALagn+DoD1IPQhCQkJp3b5CVICmQMMCIIM7LSMDxxWTAoiU2D0b-CWC5QDWLCL8HEPztcaDs92YQhiCcSyYg0x83wNYggBBBwLAAgncjQLMgkM12oK+AkhDcUKQLECDxxTAg8MCKUNcQ2aVLD1i9fMVEIIlVMABkIPHFPcBUIL0g87NnRUV3PrddcCwg5VD2QFwglulSIOsPelD-wLsPLWUkSzbzFZ9H3RYQrlDw1XwPXVDzt2tQ0aCOZEUgiPd1cDyXHCNON1tVWf8EELgQhfd-Dx4Q-SVBUN2Q0h1sUPlXQu1gAIqgwlCjAIEA5-chAMCQiAtSOX0AwCUJAJMA3oD0AwUFDEVqazcAcfh6jXJ5GwDhgMiA1QDyORAFJFDLtXqAuvc95FIQvgC9AMW9QCU1832dVxRjAKejbNDyF2uZfNCHS1sAeWRi0M51CEC4OQjXZ-1noMP-a8tY0JDgqO0PAM73LEBd4B8Av4DYcG6AjcVTAJzQ7tD2bQAAUjAANuhnkPjTZaMsAJVAi4Dh7yLAOEDdgLxAkkD7gJpA2YD0QIvQ0oDfINVTIAC10xwndJCL0BaA+6MvAPnQ9oDp0H+A4DhAQMeNPuNc0IqZTdDt0PZZF5CaYH3QjH1D0NGApgNbr3x4G4DmQNyAxkDcQPrQ+kCWQIRjV4DH0J5AqdDXV099T9DfgO-QpdC-0J+tCoN10Md-LdCd0JwFPdDGxRVdKDD8EJgwq4C7r3gw1DDEMKZA5jDSQPQwtkDEEOAzaBUVkI69FNc6gAG5KUB62FTVHVckYN3FDTNfOWRnItcFuWOcU+0iMOkArtDQMNLgnY1yMKUw6tdyzwAQb6CmvUZUIZMwAJXPP6hQWXs3OxD1lw4gok19Bz1gmCBsJ19Azt8djULQkWNavwswpdVgkIc-Gms+0JFjcVN3EKFTPWD2cDc3bEduoKlTbzDAEzmvZVs6JzFlYeD5B20lHpDDnyIjfpDvk0GQvnksky8bR5Nun3FvcsAe0OgAVTDd0PHQxpdjkN43I5DF73ywkHlfDS73eUg50BFAbP8RQFagb0BTwHHQUDBx0FagXP8TUyL-YXU-+F6ZCKBR+FGXRaVpQOb-C+B3hQazRRBFZ2DDJhdnS3xgBFDl12OQytktMM3yKv9r4LqAFsVw9DzYXyAVeUmLF78sUMQAxzlOTAyZFACNWQPkf5cSw2wA49NbdAIEblUa0KeUZf8DdExFDVk1dEIEWu0m9DrDHkCWxQuwmKNsYOuwjXQj5DP0SADr-xglfAD1SzX0HoRihEAAwvdJ0LTDW7CPsPpXF7C5mTewn3QtdE+w5elcz3LDAn82REKESAQKgFX5bLDKO1lXRQwAUOd3Ik0iJ244YCVZ1QZIKGd8xWGwtyUILxpgMbDDyG44MRMgwzlXOMc1sJf-JJNT0ymQKm9+AIYzJTNiq20lEAVqcISwjtCpAKkjT9I4lBkwKQsj+Auw9TCKY3xgKbCzIJmwtvdoPyFA-TCRdX+kMXCVV113Hu8Tpw+FbQ1Eg1YUQJkHJQqVVrcFpyAZd8C6UIAQwPVTMOBNK-dmcIGZVidEOQL0DRR510RVcnD9JUpwnCAaPB3Air1tJQyA1vh3XXXlHCABOAnHRGMn1UAzAGkU2AQAItCGRBY3IZDflVWwq+D1sJ2rKH9flxjDatV48NZfL7CZjz+1EKwejA9VeyMqMEBtRHCU5CLjVhRAeTwQlaMfsI5pB2lcTEDtUsMu6XSwt5JrcJbpUzQ8Q2QUfJ03oNUvHKM3oyDbK3ACw2Tw9qwwYOu-d9DTY1UtWUdVLS7pRFUG8J95AQMjC2aFGsAxTSMLG8gii3t5fHgx8KD5fEME5CXw2eRSQ0F4EVhXC251Y6Ngj2LwwKDIjzCAKVkz6T8VGH9TYwfoPxUSj3WNGTALTRMjGUdIK1cwdY1VyxD1WXVFuWfw+iM38IL3B9CI0NCPKZUP4LowoGUVZT4gN7sn12XVeaAQCOpQ4cC5fzL5XXMxMNBzC1CCWFdQ4BD5gxBoZ0BgZ1OwG0B8l0Ugqr87cCkg9hDeUPatXSDCNxFkZ1D5YKtwFWVwCL-AjjUAIJLpCAiPFxTAm-UFDw3vfnVYCJg-MA9Vdw+sBbcTcKNQgTd8c2og0hdSvwIfQMcsCNVQziccIFwI3sD5oM4Qs9ciCPlAPA9A0PYA4ndo0LVPWRUXdBCQ4rCmz269U6Ms2UtfFmUo+Rnwm1d7eW5w9tlr-RrFIfDhcIAwmGBcRVIIhACtAMlwdQi0-26jZs94C1wlZgjdcA0zY9lBM09wi1hvcNgEX3D-B2Ag0tdhvT+EYJNhdTvjf3C+RSIlKXCKQPeZUm9zENQDMUDwiPqPbgiTMPoQ2ocqgCAImzCU3HWNKwt5Ax8LYAiHfzjtW-DJnRfACgisiIqDCS1ILwyIsAihU36w+-C3f0rwQXAEQHMnF6DClXNYOJ0LJQaIg9Bv5x3vL38OuWEQ0sdwJw0IkD9nz17LRcD-qHXPdFUECIGg2-QW835TRs0CiLW7OO1TNRO1WOtVSBKIvd9iaEsw+BgPF2bFY8UTtWanWI4TtXPtSwMmiKcAFojjiOWfRPczvyhoL-CcsO8PPZDMMIGTcKDxxQL-UUDmsNqrM8RQcLegYCV7FULVM0DtJU1w8ARtcMF9bZcp8INw45dpCLSQc+8esOSfQC8FY29wuvDYkwf0LxR7cO0lR3CDoM3AsIAQBVdw3zD3cJDFbwjLcJl1Pwi-cJ5QqEiS5UzpViBkRW+wUPCHhGwECPDecP6jSl8ACM+XNuNu8I0ZbGCk8JZfYicoAM-gvF8PGUzw8pVs8OHwvPCWIALwyxQi8IWgrADS8LNdcvC0cLYtBOkMswLpR38c8PjgtfCR6RFgoVCYiNI4cIigs2xg0zRuSLqvZek+SJJvaY15y26tVQt5SzvwoCcs7TAzD71KAKi5afd7hAUjcWUlIxqPWGM1I3VADSMON3GjWaMdIymjdvg38KCtDxcXRSzZO4jCsP2QjTCr13pwmPDyCOXVRYjP9xoIgzU6CM63JVCZIMr3NgidcykAtwjqEPx3JAj7EPJTVAjqICEIsAAfMPiXbAiTUHEIpkNJCMjIrUinFVkPdosibwZw4lUyiJAIp+MEyOF3egjpd0MgwIjsyLgI-Q8OCP44LgjjMMAPIVU9oMLIwQjNiLAATAjyyNEIxe0qyLwIhQjH83DlaqDISKkIiXDUDU4Ag-CmyA7I+2M20MTQ1-MrV3I5OCUQxWMIyPCevTMIoI090AMzdvD-cKPQtgs5oAcIs5DpLU3zI2U9ALcIyb1PCJUAQkjyDx9wgThQSIkNS8iR+R4rUIjaqySI+9Df8Pk1YxDYyIndAJ8IoI+IoBQzYy1fHaDmUO7Vd1CP+WqIhYjyiJPwIwsPMKwogLDBnBZAQaVUyLVQvScivUwox8iXMIqIw99LoLyIkM1KCLW7OoigJy6IzigziIuIjos-Uz3tafDjCyInA41Pf2JEbvN8CJ-wiMjcsJT-ArDxwNOQucCRQIQMGZdpwLRPRfcUiNKLCRCGoCmdbv9R+FRVHvhzO2BgJhdIUODDZ3DB-wwANNMAEGjTAyjO7VwZStl+mRl1PiVgCm9NZZC94L4ww-DNLXAgTLMOED6QBLA79TOnA4cCaQX4eQUlmUoFEpNNDSVvIr9yQPWZBgBC4G9AY0QdQBIAAlA6IJckFrVWWSuZUDDK+zE5YGAt0DCoqUBzwAzfWKivKNoABKisWSSokDgq+3xgJDdrc3bAxfh4qJ8otllnkPr4REgiqJllRUAA6HU1D48haARYD38OkAjA3e1HgBFrLjBe53rI2QjloIT0VXDD7UfdL3kP+CtYffgKqN8o0DChBT1ABwUyhVyFNjcsoyQFabdmaGBgPcA0R0fdHKi8qJBZJKiWQDqo-XNPmFaLRrcxBTABWyjvawlvHSCloICPYGBn0xz3Nas1bU+gsABRCB9FO2MPKLQNYFkrWBJpcMxjzyTjGFMYmyMEXts3gDAASaV5qJysHmBFqJCok9V3KJ9TNA0KqKfdXIVqVSEFAKjKBVeHHQ0XXWDDOccMgB7nMcihgzlwoiVvEwT3Pq8tpStgwWl4aLBo-iCITH+oh+9E6walTicq6zZDTyUJwIvgWSC7CMB9NEBKRGiAKMM3iJLAtIiam0svFM8HqzJo5exVDF+o4d90rzO-L6wHZTpoxZVFo3RQ8SiOCVZNeQ1eDy8sQEdgYBDQ-SDP-0s0ZcVHhyTjVW0r-SeouQgXqL+Il4Uzpw+ov0AgxDDMc6dfXBFouuUhBRnsYGi+BThTCGj5-yho4j03qLCVK2jArApopGiL1UCog980aP5lDGim-2ftIA8oFW5o03DeaMJosttiaO57cMwdaNto+2hsPzs9XD9HiIeI0IsTDQUPWNC8RDDTBUAuaLuQ8cUCaP9-AWi5b09o6pAbaNldTQde-CZDWmjRr04w4Sj8SwaLOFFsuEKTMsMcoFfjV6iYaNkFM2jwwAtosABzOWjgF1ATgH8FSBg-zFpEMAAjrHHoyGksAEyDZ2ikNUmtaGi4xTOnfui5aXODPbdUaJ3lHojf52JEYKj5-1uoj4Vl6MHo1ei65T1ox6jnqKDoi1CsaLlfHGjY8OI1LUg86LxogujZQMmtCpMmKIXFIujwqzzrA+jDUBPPBWRQ-2JorL086zUgEWkb4FepNEBtaV1pUmls52uTYVUzv2YIUXMY6Ilo6si+f173EZDTyzWTNhg4uULAH+ifz39o621BnUAY4WkcMw1pTkxwGOwvPWlGf2gY7iCF+UagFwAnmCyDJsiINRCw0vM7LCsw1uienwHPMWCzQwBDC0hbiPXIzysM6NDop9DsjUQIDmiowz3o+3kv6JOAalUT6KJMM+iiJXDonS1lKOcwdD8OX0-ojUxZaUPo7Bizv2ro-+j4PXBTQhiQRGIYxAhSGKMQJn0j4EoYo2VYGN6PLjCnlEQYmWjGaLrIhxVUKNhI0vcVGOZrPOtu6PlXHfhJGKPo34dK6L-o5Oio7HsYvhi8sLeXdWiSCLNpeJDTazYYjLlVA2zlAJdXBz6sTxi+ABJpDBijaU4YJwBh6PJEUejiREnoyejj6WBAGeibQL+gYMNXaLdYd2iUE1i5dJj4uScAVHNwBHXoygVN6L-nHei56PCwu28pyKhoYGAiY3VAEsiZrxuorWjEVTSY8lCsGN1oh6jZGMNo8+jFKM8gbGiiVRTYbOjR+Hvor5Dab2h1YeMY-QFgnNsMpSjo+ztaSxJojeAqmOGYq4AtGKCY2miAGP0Y9WkQGLBpTkwtaRrzCBjK5wsYlmUrGPgYwJiAiBYcJBjOGIDTbhjTsHkATpiUGPZvdY90GP2Y42kjmM4oVGi8GNOY6h0gGKIYi5ifqRMYkQAzGP5ge5jj0OoYx5g6GNfAmuimGMe3FhifCyk5Gm1gmNrI-hiWaNZIjbCRGJzouEAxGIGY7SUhmKBY0Zj9aLkY14j86J0LJ+j36LQY6h0qWIyY4Fi1yACYkxDTf1ugSFjDGOhYzWlYWNiVSBjzGMB1EP84GKlI5ms7GJ5FWWjHGI7oqBVC6LcYiDUPGLGo82jvGMBY9lik4ztrMijnmNCdGViHGPro4MNwmKUgbkMJKO5ZRwjL4FOAHThGYz6bEUMFKJHI-td+CI74dEAjQ0rwUARycytYrABBeCoAZgAAAG4dpBuAb5iKBDnQfVMQIHEARQBJQ1AweTARQBjYyrCeQHWwGQBx0HWwJgBY2KeATMhY2JFAdbBRhVmgWNiiMCQATpdEQDxwUYAM2KeAHiBFwEzIWkAeIBdwWNiUAB5AWNiasKYAQiAeQHCAHiBEolzYmQBsgCcAcdAAAEU50Gz-bYBAzlpAFUAmACMAPtjvQEIgUwAnm06XRQAUAFoAaIBxAFmgY+kJhQuQdnAngEIgJ4BaQEUAW9Nu2N6QG0BZoB74cIA0AFPATMgOQCYATMgs-zgAU8A4QElDJwACAE6XZEBaQFgIKgAXcGTYvHAmQGiAbtjZoElDDkBtgBgAWaA50GyADAAjAGRAJwBZoE6XQFhFwAQAe9Nb01Awb0B0UFpAUYAngHHQcQAMABgASUMXcFMAJ4BBeFGADABwgCIwUwAH2NvTcQA4AB4gcYAeIGRAOABEQFMAWgB2cGF4N7MmQHEAcdBOlxdwEjAMAHGAJ4A8OMRATpcjABFAeSRTABujYTBFwEUAUDBWoFiAHqImABdwDkBFwGRAcdBZoDvQRcAZAE6XdFB1sGRATpc70E6XbgBD2OQ4xcAmAA7cQiBWoHEAUwBMyB4gIjBu2IQ4nvgRQB4gT7N1sAs4pwA2ADnQRQAqAEIgcQBTwBtAEoxJQ2vWDABsgDvQMYUMAHRQeQAjAA4eSTjQMDk4z9ijAE6XbIBM8GiAcYUlQG9ADnBRgBdwaIAz2IwAMSQoeUF4b0AqAHCAZEAqAFPARQBogElDABVv2O9Y8YBJQ33Y8dBuAHkAcdA70CYANziq2JdwJ4BvQFMAECAlQFoAdithZBHyO9AtaCoAfdiiMATAREBJQyMAWkAMAFvTAgBuACIwOdjITm2AJtiWKFiAHiAEABtAF3BuAFAwaIAbQCwARcBWoDYAaIBQMAqAWAg8cFagO9AYABAgbIBJQ27YyUNTABFADkAsAHWwPSptgHCAbti0QB5AF3BBeAwAHvhPsxkAIwBbvCHrSUNYCHHQMUBFABdwPHAXcETqZEA+WG4gSUNFwGiAaIAlQARnHiAeIBJoWaAqABFARQBOlxgADnBYCCcAEUAEAG7YnqI2AG2AOAAeQDvQUDASuMzIUYBFwCVANgAOQGyALW1vQG7YpwAZAB5AFABwgBJ4ighBeB74IjA8UHZwDzjvWMRALAB5AHGAFABUOImARcBYgG2AHkAmAA5AKgBMyCQAJUAEmFiAYVhogEUAA4xYkhgAWIAOQEF4SUMUQCIwU8AZAFPAVqBu2NiAFAAeIFoAREBFAG7Y1qBtgEzIH1jRhXCAECBFOMeAc2hTwFGAcQAOQCMATMgCuNGAUDBCICIwYcA0ACeAcQBCICZAcYAZAG7Y7IBxAFagUDAiMBAgcIBcOLvQKUBowmnoLAAMAHagVqBBeBgAW9NFABFANEAZAEzIPHAHpHCAUYBRuKz-TMh0UFPAOdAXcCYAWtj1sG44xcAOHl2AWkBf5xAgJwAeIG4AZEBb022AG0AUABtARcBBeDnQZEAlQEiAW9N1ONagJgAngCoAcdBSSFGANgAXcCQAdnBZoFGAHNjtgFagDkBQMHRQRcAXcHGAO9B0UBAgRcAmQFAwJAAYAEzIECBRgDgAbIB5AB2kW9MbQHEAW9NFwFvTU8A2ADxwU8AXcE6XFABYCEzIWgBFADQAQXhogBAgIwAbQFPAQXgu+LGAUwAiMHRQHvhlOKx487j0UCwAe7jnohzYuAAXcHZwNAAmOJBAWIAmAHRQW9MjAE+AcdAK2KIwQiAt+Gq4mzjaACMAeQB1sHHQWlAngB54tgAYABdwHiBPrDpGQXh1sDQAHaR0UFiAZEAkAB4gbIBEQBHYnkAbQHWwEWx5AGyAUYB8uOyASYB0UEEE-Lj2ZU+zHvhCIG7YuAA8cCIwariQIGRAEUBzwBFAQiAMAHZwJUBuAHEAZniYABtAWkAuBJ5AGXie+HEAWIBTwE3YmABaQEXAPHBQMBQAF3AMAG7Y+qhxYCIwdbBYgHEAJ4BuAG9AewSCAEIgREAmQD74mQBKsJoFPnjaAHGAHkAOQFvTW9MsAEUAWAgMADgAWLiMAALY6IBtgA0E8QAn2PWwG0BVoEzIcQAaBRFAZEAZABdwIwAmQFMAbzjFAE8E08BV2Ml4ggAOQHGAIjAK2NagNAA2ACW4p4AbQBFsO7AEABdwWaB1sB1QRQB1sA5AWgAqAFogawTmCDxwHvg8cFMADABMyGRAUDAMAEc47IBOgFh9RQAMAEmEpgA70DQAdbBWoAQAWkBOl2EMSUM70G7YxcBzuJtAMuxxACVAREADOLm4ojBYCElDdFAjACIwNgBCIFvTdniYAGQ4sgT0UA7Y3IAQIFAwREAyeNMAJtjtuPCQOwBzuJFAHvhMyHnYl3BsgFiAIwBRgHHQDkA50DxwGAAeQG1YKRVYgEOE+ITlhM6XTMhu2JoFWkBQMGyATpc9hNPAVEBxAH0EwiA4ABq42IA50FagOdBx0EIgbIBu2IwAUwBy+P+wYoNYuJFADAA8cHEAdnBkQAQAEUBJ+PkAZEAdEFgIWIAA6E7Y29MEmEaAcIBsgBSE2gAHOKVAF3BkQDBE2IAEAEIgLjAx+LvQOdBEQEzIdbBIzERAQXgwOOyAPYBbvCr4pUAZAAIAb0AqTHHCO9AnAB5AJkA0OI5AcIBMBPA42IBGBNOAcIBtgG1YJwBu2NPAJgAKhOEwGQBf5x5AWIAMAAQAHnjfuIzY+NjNRJAgDzingFmgTMhMyG8EQOjtKPltXiidAAQAYiNcAEF4QXhAQCYAS0BIICMAS0AZUBWI4GBo0xAFUkj3YFUoovhyxPxgQ4ih+j0o9NtEYmJw18xgsOPZSAR8UFdgaiQmBPpwIVgwABzEvMSABELE2gA4AHlI-GAGxzsoFoUTJ3OtN6k1aNO-ZGxDP2qFdojoY3SACHdOJyidcyj1+VuZMLAgAA"));
var crossex_html=itgz.decompressFromEncodedURIComponent("DwEwlgbgBAxgNgQwM5ILwCIY3QPgFBSFSiSyIqoDkWA+gOYBOCADgBaVRgga2MusBaLADsAtrgJEpJaPGRpMMGswTCApnHSdui5ao1CYY3FKmTTpmWXk8lAFwQAjLV1s0Hjw8aj4LfosCOAK52dgD2wlAIDGAIAoiOGhgAwkFI4aJgAF5qUAAqrGBIUADiTGxaIAgOQgxhKGoAHnZgzALM9WAtERgxdKx2WnVwahjhYXAtzFpyFLoecGDCANbFCDAtEGouOiBqAGYIQZMA8sxqwl7ivv63hMBgonRQ6QCeIxhhKjBdrwBcAEYtAB3Lh2VgYABMAAYJHcLMAAPTBUIRHBQczw+4o8KRaKxeJOJLoZKsVR0XIFXIANXxThGxTK-DUIC0UCqNRgdQazVa7U63WEvTA-UGUGGo3Q40mrRm5AUtAWS1WOxSZIYdiQ7npyqQVzhWL8DyeLwYMAwHIQf0eCApiOYwjoAG5HMg1AA2AAsABowNSAEInABKwOhAGkSnQwgBBWPRgByAGUAKqsACiybocbTcej-ujyWjAEVc9GAJoAGTg1NzyQAGv6AJIAdTrAFk40g8nGK2ngTnRMxgWW4yVliU4MnmwAJINlvLJ4HusuQgCcdgrogAYstHJCAFJwCvCAYwUuxgAKABFV56YCUtwArBCQ6nQxslQ8ALUhcCCF8TCsICCAB2AAOMAPzgZYAP3Ot42TaFgTyBsry-ZtWGYRNp2YV4v2peN3TyOAg0fNRRDsR8TmbIswAvLJPToC9pzod01BKAFgUcZs3zLRN-U9bjGiCGAsmYT1YNYL8SlXMAvzyZgRLEuwvzrINWArV5GwpK9xMcBtoQQLJoTAItmyDCAy1ETNmzTAEi0bNN4wgGBrLoJNPUhCtmzbRp4yvOh3KyZYgjbPIy2hNsrzbLzC1eKK0wAVgrLJo09FK0yyCtu0aE5H2jSE8uTABmRtCzoMrowqws6LAaMwNcoNRBOOB9zTIMwAEoSlNw6Sy1XRtRFYaEQGnaN3U01dipAYqYCCEAsjbIJHGK-dhAyxKTjyZYICixtdsfRs7Ea0QK3gxLHGEdS1GSAERPi2r6pOk5liDOAYEheNXgQAyEGbVcgkbad92WL9HzYKzVwBEArxMxtOsE5thNEvS62jAahpGsaJteAGYFeRKpJkuTE0Sx892hLYH2BDLQuSCCgYGRwSkSrIThPY67PjWCwlGkMTjAMCIEupay3MyzrKCFd1wrYrWFYGB6caCt8uF5tKfhrqkZ6rIQDTalIRhkyEFnaEYCvMIIArSFWc3Hc90PTdnMcRNbzLNHdsTT0aeKhC1AbI8AUPD6odc+MSLrL84EuotDoR7qUeBBAZOhFb4zCFb0cG4bRvGyb7sJ6TZK-UnyZhFySlYCAQBkrJk9XGmsjTOmGenJmWbZ0RSJ5vngQFoWYGnalXkcZJEpc0QYAgaS22npHo54+bp1ntsveVrSKQ4vvli+9Ct1T1bkz3VckFg-0i5J-0i3rg-08zug20fZu20LMI8mbJ8-sS2+wjDRNtPYpxF6u8P7Qi-MmdSNdkwDUOsCR+aY7BRToIgvIIBkxhVYlFMs7pH5lkQVeGAOCrzRkgm3Y6ul4yqXUtJfeZYIGsCgTAxscCn74OQWFNBGCiHYNwfgwhUUSGM3IcweMe4gzMC-MIOAaZ3ZvQAo2eKV5GzK27OlPIaZirUivGmT0eUCp5UbF5bsxU9HAk1oJBs8Y8gKX3JdeM0IxZk3AdI2CFjoxBD+tBPKyw+5XlYHAfyRZXjZSLCwtsdh-LJgBG2V4AIwBWUbGouAogyzBTAQQrI8ZIRlmBPGZIACt4LmhO6IMMlHwgGbACaOV19xBlhvE8WVlkzuiLs+Gi7p7xVxrquOuMk+6Pg+m2ayjQrKO2bF+VgqSiwRNEGmaE8YwAAkmXkGJ3ktysEfjErJaZ4oLk9F+SCm9OJFKIqtCRv4pZIzTHueMAJuLUnmmmFxiZ9xuKCNJLxh1EphUWPOOAR4P6g1YYEgEfEllbWTFlZsCiwZtmhFtQoGDipfnyXQTp1da7123s7GSrx36rlBnkEyq9tLou6b0huL04BXiLACf0I9IRfmYMzaBjZXrV2SP6acYs-yNiUcCfc-86AzxaaIVcI9QGwWZR-YQJcG6OEno9MCgDkKIXdImCcutcVqDyIxZiIMwbMDyKpNMABqPljQ8IlGwczZYaLipBi3CAYQRZlzNnsX9AGsEBmiGpAwko1Jlia11vrQ2ulmXCHsY4x8zi0yuP0u4zxywDHfOIvE4iAKdxgwQSCsFrAIVQphY+OFCKwBIpRaSh1TqXXuhAJCfxjhHzEvyvFRMSETjJGhH5eyuULa5MfGEV4CykLxiyGEOBqKYBVuda6kOohRogAVr68+r55r1LMhZJpdBkyVwxT0rFfLlEqyqmGOykyLnkoQMkZYYAUp6uBkC5gSAED8RDQbGGEMHXMshJ6AakaGG+qDZ1N9YbmARqjc2JxyZnmvITR45snyfEnD8QEmlwS8ihM2REq8USYlxISUklJaSvwZKyTkvJlbHUztrfW6OTay0ttXu2zt3aiy9vHfGAdQ6wAjrHROyj1bZ1rnndORdrkAw-geUbUyjS3I7q6Zivph7lb5ToKepZK4-yXuvaQ+xQZI7wtEOnRxsqaIDUFrehiTFkjir6u6ZMr5GgXjqmBWWp4uYvUwlOiyRhljmqvI0JOKc04Z2KuNUpq5ymVOqUGf0Crw7eZcsINs-nLV2aLNuYQzmnpd2aqIRozALzbl3AeOAJwu6WV-Mm4Q-pQs+frS5PtUV-QpPypFV40J5mPjgBpPIjZfYlAQchv1MSu1RXWUMosiUsmLjFsmVzq1H3Pt1dZ2z1r3QZa3FllzstasrXq1Xc2zBrmfTuYvPWW4pavi1eK0SeqbNWuwaU6kWQyxnMHuIvcnp-PAgnk1FqbVSL3dvOzU8HE4A1zNXy4EiI1DTn9OeuwEPOXR1EEWP98N6KJRAmGRKcBcxphANCaRRZqRBjCMVOwjLir-QgUGbsj5IR2C3AAR2bO6J9QZTWQhIVuW07pISiETGELIwIwj+jLBZRELPgQtYvGmMIoNExgSLCUZg-yixqEfLdBg+4vz7gqkEVgYZkwMCLA5RKjZoT7iCHQK8j5qSkjoMsMMj4gxIETGGIsr0WeJmWMsBwjYGCQkcIiR8iUkAVhOItaaxUgjFX2M2UC+wgzCEbCyE48ExXCH2MIT0YErXJi3L6uweQLxGXNzhv8zBDHeVjHLfYIFWDJjrIlLc0YQK0WSBeNQwU9gAlyssSEXIvxIDCLzNQ8YRJICyK8NQF5mGsGKswWMgM6BdFYPGZY-oQKvGjI2fc0JiwnDLEWOg+wThtgzGmNs+5GiIjAtSCCrw0zCGTKIaMWRGiDZWiUEA81ERhAWc6wSg1BqRTVHxlgz93QGBqIP9zcCgWd-QLwExHAwgcNERGxEhADHBrdXhtw0wFdPRip344AWc2wgZEQ6B-RIQ2wwJbp5ZpFXh8DhAUAgx3RFgg0ywEBGxGwtwsgLwggKxR8qlkxJ9mxmAIBPQgxpwThPRow8hgRpwkB9xkgwhTVXgkBqQ6xGgixEBGhkxTVHAwBIQIA0w6xHAKx8lVwwxGwKxgQkB-QIBoxpwwgMswhIRXhkwwAtxpwwI4BExmBEoixTVkxEQAQvxHANQYBoQSgwhEQywwJWASg49ow0wIBUowArwLwYBGhq4-UIBSoz8LxmxHAWdEQShb9GgrwIA6AtxXhkgyxERzY1o1AYB-QrxPRkgQJEQgx5DcJgQwI0wnDowvxgR3I8dXgSh8CshpFExqQuhHxpxhAEA8gxoLx3RVxoRRBpCq4FEshWBI13RERGgODhA25BsSgggGBoR9htcwAWdPRXgiw6xt0gxioHcEBip1hEw6x9h3Q6xPRaQ0xkhb84B8kARPQ-jpw6xWAPEFDWIzJhBkhkgYAKxF0kBoQJhx4kBpxIQShGhlhEpAYQBgQvwwJS86x8SARI4sinCyYARmwwAlxoRpxkw7AvdoQiwe8rw6xgQrw2TcoThQw8h4x4xpxQpz8zxGwZcrx4xEQJpgQLwkBmB9wtwwwywMjGx8p-RYjEoTxxjV5ERio2w6AixExioTSUk7AyT1E2w2wThHALwARtiywvw1AgwwwvxYj0pjc8kIB054xqQ2wGAgxoNqRHAsxVwLw2wywwBGg0w2cEAtxSjvjoxgRXhmBGg4AbCYAVSWdEpqQQBq5td-Q2xpC6A8hkg6BTVAJEw6All3RowtxJcTY7A1AvxhSshHxKIkATikAmAvwWtUS8gjIn5Eo6wIAwJgRvcghExHB0wYBkALx9gsk4AkYaSiwwi2xqRp55cghIQQJwBERpxIsLwGAgNFdHArx3QA899qRGgQBex9hoQDy6wtEOTHxxVEQIA59b1PRhBtc0wkA2wWcFCKw2xmxZVlhEQtxkx1piowxTUTg8wgjok1BXhpw4BEpoxqRpwwwwwEA1B7Tlgm9Xhcpay6BIQ64YAsyHQwpPC1A1AaYuQIBWAMNHAYAMwB8GAvxlhdC9DyzmFkgzVGJXMeCmJHw6wrw8gIBOIkCwxz46xAIAR1hoQsgRLT0GAdVERgREoQBx9EoARIQAQWdqUWcy9oxlhDItwkBXgmxWAwJ4x9wh13QShqzkgySYRXg6AWcC94w2xER8cgw6BGg2x3oaxHx-RmA7AQAYADc4BGgViWyQDZdEpgQWdTIzDGh0qQBowYAwxdVowkBQr-RAZ0SMIrEwA8h9gsg8gVDYx9x-RTViokAYBTVmxxpgRgQTTPdWg0ogxGxQkhqEBkQgw6CA8dVOrowEB3h-QEArwrwgg8gggThkxGwkAkrhARosg6BgQQIzw6B-4EAI8GBQUARpxdUvwGBH4qSTxlgqoLw4B-R1ZkgzIYI8hasKxkx0I6BCxEpmStcgw28RRfYww7BGw6w8hyJEowwng1BIRkh9xkxEw0wvwQAkAyw2wshqR3QwJTVoRqQXzYxHw6UwgyR9gwwYBlhpwzdmwEBrKtx3RWA6whpkwfq3ogh9wwJPRGgWdTURh4x1poxXzXgwAwAFS2wWa6AiM8yX4iwGBqQ0wWAvh9wWd1a4BQl9hGhkgwxMrRBRBlh1aGAXruw0YkAAQCFtcedix9g6B3lGxoxXhN9PQfEtxCD5x-Q7V-Q2oQJHAQAWcwhmT4wUzowAQ6BtcEBowWhRBhBzhmwuxgR38ywSq7B9wwBTU7BXg6xoRmAT5RAF9EQGwARlgiUXIIBEpIR1p9gwIQJgRPQshipXgrwnKJlXhEREwGA6BmAShSwnktxtpEwggMsUSDRDRiBkQQhcR0Rx6MRZ7iAcQIgogYg4gEhiRSRyRchoxGgigoBzyvg1ANQwA1AkA2RLRah6gkAmgph+QkAugwAeh0A+gBghgJhJRpQpg5QbB5gdQVhT7tAMBt6ihtRHBFg-79Qbh577hHhngBzzR0BLRrRRBbQ1B7RHQXQ3QvRfQAxgxQwIwoxcwkxUwMwsxYwcw4x8xCwSxcxKxqxawGwWx2xOxuxYxex+xoxBxhw4wtwwJRBJwZw5wFwlxpYNxisHYjwOYzxzxrxbx7xP5Xx3xPw4Afw-wAIgJQIGYJwYIXl4JEJkJUJ0JMJsJeoCIiISIyIKIqIaI6IrNmJWIVV7kHF+JEZkYxIJIXkiZi4FIeoVI1ININ41BdILFdSjITIN0JYbI7IHInIJ5MwPIvIfI-IAogoQowoIoooYorCnaEpkpUp0om4soco9FCpHwSpKpqoqpKolVnpWp2p45tYUZHsMYc5sZJpY85oFoloVo1oNotodo9oDojoTozp4wLorpWAbo7p8Y2xqncsXo3oPovofoQn-pAYH1DVJkxVoZ6lzEE43GE1mmsY85cYC5PGSYyYKYqYtxG5n56ZSF25WZQdOYARuYXleZZw+5BZhZktLlN1JYRG3MFYlZj01YNZ6nXHmAQNpMTYgwzYLYrYbYsoxHSsnZhZXZPR3ZoxPZvZZY-YA4Kwg53o1wAQw4I4o4Y444tYIXlhUljZTZzZLZdsSXRBgRlpVp1pIRSJrZqQkB0IqlLogwsom5Qpld7m7BmZHmas6sXIGtzY6XYWGWEXbZkXHYjM0WG4b4QtM5sWaYAmt5gE8JQFumj41xT4Xlz5iYS4r5NXfZQsqp4E6Zow34P42lv4Qs-4CkgEd5DX95wFIEShWVYF4E2EUFOE8hCErFmlsb2ECEiFBEyEjtKE-GaEHF6FGFtTmFg2kFQ30Fw33RI2cFdq+E42xXE2xEJEpEZE1I4B5FFEj1VFsoNEtENEioAQ8pyzspowTF8ozF45LFrFVS7EHFIMY1oM40Xk3kk08oix5lFp5liJlhvIHN4xKjsN9wUk21dErwuXmwyxPR4xoVGh5J4xRB5JDE4zPXVVikIsot+Wak6kTIxY-nmlWk-pZ1d1L0+lTE2wSgDkooixCmixCpbJEEBknHoR93bJCm+xIKdkSNlhkVPqpIhUVUTk8gzkVHLkEybkzspMnlx3YM0Z3ktHysYoxZUlPaAVqQiNwl-IgxlgZm4l5Jkxko8gdxqIvxmpoUXnBt2ttIRVOPxVuJ94pVhPZVXYuJFUgY9sHUZXDtdIrw9w8jqaARp4A2YE0xSEZODtGtVSZ34wixXJVxkH55YJrlioz8gxIQtxmU6p4pkhvDstlVCk1UNU4Abs58Vt9VH1jU6wocAtHt3RbV7UqMa0xYPVVnvVxN-VA1g09Z31w0h3o1Y140iOp3RAyPd3XtPqqOaPsN6PGO5IFxWP2PxkuPGweO5kYkBNqM60G16NH5sm20+4WNbk2NR0wgXm8gRcO1eNx0X4aua050F0l0JNV1pNwmt15M90KUzElEVMT0z1NN5pMUdM70mJ1nwZn1X14vQNJkv0vs-14wANYvgNduP1wNh2oMYNJ2ENk1Hx9O52rFoIl3PpV3-J12+IIPkMd292D3lFj3T2+tslDlvNBMaN6vm0mvmMu02u-Ix0uuevO1ck+MBuQvwfhvRNRuV0pN11ZNMxpvP2G5lNj01MluL1Vub0gY9MDNytjNINTN0d4YIJ1uLwHs7MHMHynO3Nnn4xPNmBEtfMfs-tmpXoiWlnfpIudtFtDVEwgwZFhfAnUZ-RfH1InOLw5Zhx3VeK6wz90JEptGXLtT8bHw5yQB8xYx-Qwwgxak0w4Ko7qRHxTU6CHD9w0jmA6wwDk6LwwKTg2dDjTU6xVw0aSxSTE9ASQIQJ9w67-Rur7DkSThBtdC0oix9haVWBRB9xgQ1Acx9gwonJgQDiQKswt9px4p9kwAYBWAqIYBEx4xVw6wggwwwAWIKxHB4LH4gxXhgRrV9hqQgYnysiwx9hEwPQiwDyGBxSwwRa4AARkxow9wKxHIGBMCGBmBkgsgggwIzZFYEBCCsh-RVwixpwKjEwQIWcQI6xpwvx3QSCyxEpmA2cnq20ghPRVcajHxPw7a1Aokm1VxqQ5oJQP-B2ioh0IQAZWayrqjAD-Q1A2xBAPsFeArFr8F4R8GGEcAnBVweQOwKajtxgBHwDAVgNpH+gBVoQW4dKs8WKg0E5y04NMCUFNQlVHwFYRMF+ACpuUSgiILkllmWD7gf2X4NnqfgsjyRRAiUM8Jn2jB59EwZYacFuAvBlhCg+4R8BAGBC-FHa1NHxG2GBAAg0wIEfYIWCcqdQrwd9fYKIAthHkLCrwRCpmWEDFQ4AYQS3MkDsCvEqIdgTyqTj2CNg8gxjEuCUC74mDTU-oLiswBOD8QWcX4MGH-mUq8wKiesK3HLSQDxgySKSBIckDfDUgAKVvNQBACjr5UYAHYWPmoGWAgBCwWAOwMsGuYNFhAjQMMBYWjAo0kAaYZgCBHjBIA8wgWcYhWH9DuhbQI4fKg2SToRJuSgUaKKIBEpkwLOaUT0GGGBAhUa2F+WMCcET6mo0oW4C0hbGjBXgKwQQZYPmn9B1g7A0YU1IWDDBjoPBhtExEGHRrQg00RYT0GmCvAMBDa+aFIcmiLA4Y7AaYbJDXT37dh9gMAakGGDhT8FXg9ZDSmAH+QgQ+sIFf0CAABCJhx+jQVcPuBiKiAYScAJADbwsoXgIAYYZupbjlJFYggV4cOhjTAjJg5kF4OwFIIYDowpBlYBACcGH6eE0weQMMCBAQT2ZowP-EAMmieTLA1A0YMCtCH9B29PQLOfAodDAj9AEAxaW8GgQRrxg3sF4dfKbwYANEbYy8MyIiE9CsB3QQQaMHQQBCIgFq-oDiACHQLMAAQrwKYZqHdBWjow+AtgOvxpIwABYBwdkgCAYChD2wAdacDADIHzY3CtiJANfEqE54fgrwECKeUSheEKwPwX9o2F0GJR1CYQECP6DNGhQW6+4bBNpSDBMB6B-oREO6SQAwxNIIRMCM2BKA0o0wPiU1BeB6JphqiOA4QFeFNSIhIQzYZIHPl0qsADcdAMCAwA5xgQEAXJZJAxGTAi4TSnoKKq2NECI0g0yZMAIuDgCIhjO0w5sKIBAiehEwrYh-Md0WrAh6YTvREAWPUh5A4k7df0PsAqIAg7A7oM2KamEDRhzIWQbJFNnb7UgMK6COgCMBJbJh9gLOOlFMQVKNB3ECOJAL8MNFbgwAyQRwJ6H2CrgOyZMMCNODsAj9iogsZVEdHFrRgTgPNIsJuMaAwBHAq4LcNSGECxUYKYEezAwDgCuFHwdUakCvydphBkwKhMcJoVYBsxtRFg4EIBUhA5UA0cAK6POWSBAkwgMAYEFuAgDuhpw8Yf0GADgnCAQIcADatvgQzm84AbYL8ACBRKrhkoDAMMF6AvB+dYaJiZIKIBWpgwwIiYfmheCWHgkSMGgSECskSj+hqQwBUEJxiQB+1PQ04QkiMlRpbgQIlYMCFeETDeTEQBNRMM2E6r7Bkw8YF0VZBpiNgMaC-QnImGSCz8rwpkUKSBCKCBZFBQYCsEgFYCQgKQcJTsu6A-y1j9w1ITvO6ESRhA1AzYQ+luE0h1g3eShZgLuAgBd9RRqnVgGEChKaI2i29YqG9jAInASq8YBACwDHjRU1AR0BUiBXnCsA5hulLILw1zzRgs+EAR8IiFDLJA6kd9L8AGX2CFYnKkIK8JCCmzjxEQYQRoMwKCCmp9wF4eMNqIA4gUWcQYA4IlETBylXgYQZVMRKLZlCdE1lOgCUBeIS0U8kIUmElEcBmoH8TdAEKIX3DNgrwLOZICVSLIdE1APBGAEMXIIN0gg7oAQkWCQAvREo0QNjFeH3imp9geQIMAdLcJNk7ARYVUrGObB2C-qj4JAO6HFpWcxI7oGMPsGnAlAYcZsU3OzA0JmwhR0eLIEWCDBkSXpYEMCHHQeLQQ6AJwBABzn9BOpccAIbQjOTCAlAkAyYHWpCDTBgQckQhPsGWDoBVg+ZX4GAN+OemQhr+IEaEOCCyAlUnIkIHvsFOKgyCP8WQL8DoIbIQBIM+wK2XmEIT7ULKupV4BeGoaW9akLHNMBeV7F0BUAGASBoaCRCL1hA+crEIECnpL06QhIRIHADVCb1CAbYaIKsERAXgg65E4oPvXOBH0T6Z9aoHEC5CX1r6fIDoHfUFDChRQr9D4FKHHwyhpghAWYAqHsC-0VQADdAA3IvJaglQ4DEQNcExDz1jQsDM0BaF7lIMUGaDZ0K6CvpYM-QgYEMOGEjAxg4wRDdMJmDjAEJcwOtcsBQxwGPgtwjgOMJDTHak5ycdAEALSHb6NB345OU1MLCZxfgEAi4LcFPGnBYlGw1IRMH+GBCiAvSM4SsTS0aCNA6wjYd0HrlIlgx-QZpW4qZE-C6jysYEZYBuJ2JlgkaogSPLViDSkjMqNLSGY2BPZphxkSAQbI6kWAs4f5sWMMGEADBHVXy905IJCFYnFRucwgakOEGpDJhasORYQAxBAiWkTg+wNoswGaKrhtFwgLYKKO0QH4W5K4FAYiDbDz5ioeNLIYODQEbiggWQOwDbNOidjVw+wd8o0F5YlB0FViTKGBDdgrtioIESEELD-jswMpaYVwu6BwS+wsgyYEACmDgAm58kbvfUflWWBphncmfLaI2AfHeTMoW4VcMIDrDFQ-IpqCsINOTirQ3qaYMMGoDkhlpaxcAT0BAEnDMAE8ysOSBsPwjFRgQDMsXNSMILj8SgjgFdkgG6yuQtwW5eML0P2CFEQIrYxMNEDrAMALw1IEQbnlWXThe8aYBRLgh4jKMi8wsU1GBH2DSJ1cIBZ1F+FNQs4twyQRoGoGemAFNocZWHIiH2DzRGgnoUvCzjQXJA1AFYBSYOjhnLL3Q9AsMNOACyrglhUxZYFkBqWJg20zAYfl2AVjTgEA-oPoneFNQwBEQUSfcHkGEBgAggEAMIO6E06lNqyJwECCknwJgwTgQQRMppJTHThPQVSOwKtHiSzJfUiYP0NGEWBBggg+wLcaIEZIe93QffXUWBDlgFUFa7ksdBjQQCThkgj4d6XDgVhPpVwnGGeKwBZzcxWAnoBgFeHHDXwiweQC6HWDCCG11ZFYJ1AHUcE8D9wrAC8BcPIJhBkgEAASIiGyjTgHiSYFnDADApZhui00JgY2HBJnUdCFSqsCjC3AH4r8guQyI+FDXQR+xSxEUEgDDCpA34hYKzg+ROAVgj2L0z0vuAgBVl5w9MQFQ3x5pCEwAjgYEPeDKpZA6wVkTjMIGSj7hXJ-+ALFkCUEATHAdgSPtf0XE5g6ip7Q2BWGb4DlkgpqT0TASBJqE6wrOBAIOHMmvBlg0ZeiKxCZy8U+RvUmsPki3BnBTUJ7Tjo4EOFIACEf8hWvki35WwsgLONiHAGYC1ZzcagMMI0D-l-Vo6OghRfGAAlfERI40lObYt8I5hEwMAC8MIFUr7B6I+eUPI5TrByR1AgRefDcQQBzh+J61IsFykaG94t+f8a3pynz4gQSoxEz0PEP9DGrxZ9+PWMuNNTLBEIitSwjiIcKIg0wHOAiCzjnjOo7AjQfGkhrWmx40EzYACVrnGSilkypqp8sGFygJLmA7k1cA8JjKoJHADUJmkiIgB1gIxW4GIEgEFzAh+JJQfYKamnC5ITIwgUtXAAJggBmAYsdZEtUSjuxsKagQMMYOUYdUTgjYC8MKJhJhA75aMKPISNNX41laclYqPBo0IWCwABvLcAUOpBbhdCCRCAG2m4HRhEwTOA6onkfiN1kgxUXutSGhhQ1X+dYXHHKU8pNqZJCqmQnYE6V5BjiZOOgFu3rC44bFEAETSAVgHNhICzYnKmBB-nNhIQuOf-AdNpAO57pPkfmaCn3y4aKwqmjofpsKKrhLYW4WjZaPmhZB9gZYBgDmDiKC4wgJEwdOrRZxhgTFagT3GguBAgBRAYclcbVi0RDQ2KiUDYXQBApVqrEYYeZYkwfg3kPCW4AzsmDhWugGAFYzcI4C0mOoKI1IZgGFNzqYq8gj4MCEGDoVPwqoVs3+PGR6XNha+N47KGxrDCThY+04VsRXTM0gQvwENX8CoGbBh5vszpfMB0LgkgR2Y9VakCuE4y3Rx4zBKPAdsGyXUqcqYuAD+g1DhLTU48F8N5IWrlhFcmCuyMkDOoIDN1zABgC+KtwLkwIgWi7QJrjzwpE1iIX1O1EbBBgtizJDsSBESiJQ1ZYQscIzpgCT4SgkNBAMqUZKNAnwweZYMIERBWj-QnuMElpIYAgAFw6SngpBCWDmEqoOqIkluDCDHA3FpvREDeVXBJ4WWGMx2VDRUJBhnUbYBHP2L5wMALO+7NCLCTRLUFtJwIMWYlGM5xFoQkIaILcjOCQhio7YlFcVGTAVgYSwgO-CRj7XCBNOpAroU+JZzt7CZUSYZCNqPiPgywHO1cFbDCq2EVAT4McSzmhCqc6p55BANAuNKERMhzKECJjNdyegi6j4J4m2Avzuguwn0Ofa8GIU29mA4AEoq7LDAVggwJsRZOK2pDGkplwgPIKuERBIAwIJQY-UEDrDwaJwRYMyubCRiQgAJhxb0iAC9ytRXgIABgJHiyBtoNwiYQiZJM6FPhYx6dLsDvguCPFkwLOayBaJgP7BBirAIMPvlfiOAywTpSsPuEKyJRnctEMPZrp2n-CnUKc6EIFunBsbFxPEbxSBE2mLRkKBe0hvvn2ABQYA6iJzLJMe1qBioDHaCAwGTBhhBp8YVsbVVNRBA31L6oIH5MCYnAbxjgCMjO1UIlAneJQf6DGuAqiA7ipqhFXYDDnQggwKQ4XD9R8GiBm5wgYQK8H3AlA7Ap7Z9GoGYBFgnKvJaEKwHbws5ewjQRsImA5KijMwilGmI0EfCBYOCSAYqBABOBFhdac4IeACFXAIBrYDIv9YkbVlw4OG14TaRACLBth4cLxGgkeQgDwSi6hovviMiQAGaw58eSuPxJ52Ph34CGBnQFF0T7hB0eUZ9C6IqVmVYccALGvDmBA1hclclOuKIEu2P4aB4rDQ9ODCzuchaaBdvIrh3JgATgP-bXNGDDDFQplywdA4UU2Jc5K4d4PKuBIbE5a46LOBVIiEIgIS48cxqWg8SGpKymwTVRsBnzAj4llowgjIvfh-KNAGADAEoHmWQBddlgtohSPXRgDJgYAYQXwvuDsCYHmAD8YYqctp18wfS2kMo0CupreEUlLORWpsTmhkRxFJgkCADCuk+DQYiUaDIKhsN+8LqyIMKiodeDzL6hg8HUaIGbCJhgQzYZYNpUpyehEocRYlcMToB7gwg9ZUNf-0KLWUwAr0VKMIDCC+Re6r2F5rCy3C6RWxIAFw0gFECH9MhVJMCIiAX6FghV3YaMvsBvHvlpoVJLIChK-BdE4NdYACYBF5YXh6I+NVcM2USjhFcaIgqWMRFHWQhNiN6zjCuFcnWnWArwOwDpMfE4RVl3it7EIUCbZ8plG+uEcCHyoLG1AVy4QGBAmRXLmKjYf0PmCaoaGXKYEMIDxDDAAgPQq4d6L7HREs47ANvRwjqMC1ckeMN2wqlQwrA5bkgLqT0LEQtpKT1NGvLJLSmqB1gvyD8QWMmFSAMBQInXV4BcL6zoR3Qnq6kj8pXFBgOdsdSFoGheMWiQIiYR8O6EgyQhx8KRsAAksriGnjOmUZMAtSvHVBmwKkSiGoGuamp28o0IlGLiKO4xGNSAWCUUZOCyrlla4A7VttCh6GPGg8dMmEE8SCoYAHOu6MVtXISQ+11ICRVZUJHhAIAcpBAGflYD+gFwvsD0o6kSglJowHQysOkFYInAYANcE4LHxajMAeIdYOsLLA+1Hc0RX4ZaNhWpDNhVl-4Vg1nxEGmoywABnqs0XR3+hQSohxKMkE7oGTfZ7+ejsdlnPEIywdM5vAsV1638W1F4fcCAHsqMo1ZIAQ8G2CklWnDIa1ckqagOC6p5kV8XguaXIVlgHDih44kmGWCP959euCsAgBxwu1mwEAcCf2KyDNgYyailQk2dzAphqQwYXHI0V4J5zd58IQueXOLlYhGrdwMuaiEiDL0CQa9GuSSDJCOhcgCe8iXvTqCdyWg3cwgOfX7k8gb6w8++o-WfpigJQYwaeZ-WsBzBFQS8-+q4HQAjXNQIDMBqsAgbtWC5MDU0PA0QY2g7QDoc+Zgx9DXzcGd8gho-JTDPz5DSiXMA0U-lxh58noeMrmBNHm8Fw5DCsCUDZ4nFeLqczlI+ETBbh9wiyvMMQtIYVRqGLcuMIWCbKxgw9cYM4PIaqncNioqJY4NbNzDsRud0UlgRhgFG1hYw7eQarGAqtkNYwqc8nHmFTlpEKG0-d3BzYJwUNEwOW0hsza5tVRYwpUh6hb2zAUNsh54HaaWCltWU+6sYMCoWGLBA3cwoFdYazY1txhTSuYGlEDDuL0MmwrYDsHmDLD45YwzYfcEWARveFFCFDGKfw1nDzhFwy4NcKI3tgotJGctuxmxC3iOM+IVLHqO43dUXx5IikFGKr38YAIgm+kEJsZGgFRNHIzkVyHEy9jQhj0dEKMBUwahzNamHUEO40z6iHNc4OMKaDNA6aLQ2WPTJuJtG2i7QlEgzY6LlhGZjNrot0e6DMyVFhAKmed56GL0WbfRJeAMIGAanBibMoY0mbSH3fKbz3yoZUYu2JEMhlce4HzfuN81Fj48rsMsL9Jx01KrwcWWkQ4XVH7vz2Asq9zji9HFR-QpMD4Ve16ifgLZxEB905Bwf14OI1I36b7MkDPsX3fsg9hZp9BHsrMvUudyqAtgntYR5eZYQ4Y+F+xK9gmMdpUcwA0FcAvwet5sIArJzi4YA4yNQLzWTAPlio04G3cVDrAgQIACiFwe6C9xloyhXcGHbrWNwMBWDJxBHHQGwfdTowikKVbrIvBL8ywj4fYITEfD7gzq0IDCP-HeC6G-wVQlIswMT1gRkaAIRsO5tNQIB-E-8dOsQ6jApg7AlcJ9CqV1i27oFbh0COy0z7zphzIB9AwCCyAgRHwQR+-PsBMTir8HRKgQhWH8Fpj9wJ-RENLhZwezISjlJ8SkLn2P8YKCAVcG5QQD7g4ZkIU1CUAQCnoiwTkPICzn3Ael2xXsoLpbBOAXhEFFYfYFuBDAhaeCw8aEIHQBD6UrwNcL8AmMoNhg81F-JJ6uDbB8j+CdATMpEXDplKGAe4ZCorQ32vBTUzALcD+2VnAgIw0ieiZBVeEBopoiUHxVUe8lZ0-p6CLXBV0Kd+xqVsqIA3WAMo3U3DZkNsBEFXJ0BbbsYmRLRD4hhA8o1K88m+FrQcGSgvR6EB072oi4QApqTAapDyB-PEbcAc9RWHcnVPqxJwOgKuAJQh4yIdYTRf3xfwqTFgIecOCUEdARhsiHqUioZPJy-zEQeQDtEMkRtbhS8fkih3uyyBjofBfOMCHkCvAnAFSzAZpLX3TJRR1U1IKsG0dmQRBwQ3e+SY-jABek69JQCsBeALxtQEHjQCOnEebAMAbOqYPgn8RbJwB8jWpkF7jFQZbgdwIEQJl+Fkkd5xpGJuhYnh8GOBLRCe0FN3xGSRGwj3TA17Yg4NtggwLOCWQ+LVnDEgg3sugmWFeTQIn8XpGSuI6WBzrVwDO1qIWTQF-CWaokHte0XdCJQDcti3mIuhvSJRpwj4NnnYGhBPx88kwdsWZpyrp4TchQZutGBKCFUWcGyVJaBWTnNhsDQ8AocmfmWwiQAjgRwBAFNQukXjNpMsMsEfBZAUinoK8Gn1mi0Fsr2Dnwyzl1hbgvwiIehY0CvEBRkI0EowKwDZEAh1U+sNjSBIQRhBRDq4MCBXvbI6uqIrBVZc3LLLt9kwQQb+HkCz7bntox3fidGGGg2qsnvok+Bzt9mrgKw8YRsHAvVxoq+1SYmIulEbBgQww+JL8v8uWAao4lYEE4BnAgjCAnyECNTL-JpjugPxCAAVEexEexhGhB-LtPlGYqBa0HGcGALU6gq+6rtDL47KasfOegmyAIdyvmHgD7hcJwgXHMIDKB84TKESYeHlEQEagXsFwG8kwLBXaRJktiCQr7hZyuFKhCDoMEGEcBBn-QjQRGo4HihqAYwpqK8GWFhF6EggO9NIwKMGmekP8ChHIFUcwqvI4KZYNMI+HzQF5NqYEERKyI7EqwwIIFkUKU7AiWobyjyq8FguWBbukA-WbsLrvsItqsWh5Ysi8eIVhHvs65tsCoDcO4l9htuJw81VJX34b+q1MdfFOwhwUIDARLIeakP4QBIQXtZMC2MTB55tqeQZBqVDP68SgBMkgEFWFeCegPwfNAd6krAjfw1CS6hgGBF2pxKfIPA1OCheWAlWRQU401PXRAAnA2jF+4EHAFvIAg3pt6OBNbhYGl1DhCr0qMoaUu+xBiD2waW5WnAFlwB8KePKwBuK25RAEixuhDhRp8K-ikIOsLaLgCuYd1mA19cpN-mkRI8nTs6psRgJ5R-B0NO3olAXAQE22yQE4LbeKrQhA+mbxoKwGhQdEIkAI-YNsKJSvByxKziPHQDej+hdD1cDKVZwVcOl7+zAGQiUF9H-wLMFwZz3ws9Drl4weUzlmGEFT3DNpmiCVd8gDkZxBbYEdMsVTHMQGtwJQd0CzgigKC8k0hIPontzxZBK6esZsGBEi-tQz9dxAVMahAgJj1cu+5gpCTMh51HA78ALPXXoKmp3Q+8ZBDCCvDs5mkCfZhImCHfKzRAxKJAKaiVppElSVdF5KiSOWegcccS+DzfmIpNL4wHJUAsZf3DZO0w6ygmJ+owpK1g+a0IkfGGYB20H+4iUTHQAbAMB+1kiY1PnlfDWcQY+eOqVX39ANV2K0IDCroMFhyLhAndGlQmLbDMRHH9BIIPJO4g3iSz0INtHBDUCd4LVa3jgwCD5nJBySpkP2hGOYB8y0EZK3bOanNNCweqAE5DO1osJqmEd6jxoJuvU9hUC9MAOMlOhagnB4whFAELXSKH6xgDn-EoKIATF5JlZIEOcA3JiIrwQYgzVyIdMk6ErKSEEfAbwK7SPBiCY8FdQbxd0gBswgL8FfxezAWSfIcKL8Es0QIZgGshepYQGZp-oXjWKhFqYsCNoggedA7UqtM2GFFgQNgAT5HwVAU45BqMAErFxZXXllwEDAmFZI7AacE2JDOWSSHotwRlCMgGpNVxMQOSXXmKsFkZuheMP4LJxrJzZUogf5qKD-XCMo6IIGOAEyQdH9wl8CAG3xHpE2hAgCSf2DsBEoUQD859weCQLIiFQqjrAGZcsCSd6hNTDTx7FX-UnI2wUkwaEYRbvjdcOheMDmQgwFCgrAIaEeD9UHqGo32AQARoHn8WXHNxVIxUeSSlhpLB6lLoq1Z4h+VIxLIGo8rED2VsUkjLJw5wXCREDDAGAR8Ap8FCcXH-AHkUIESpiSB5SOAvQMEW+R4PNvU2JXdRwQrA7dU1EWdyVFyhbkEbEbVYBVwT-UNMoPZuAYAWvaF26I1AGwjKdHACnQWM2-C8Guo31LQNdoTSJIn2B0yYwnFwhkTJE0UUxBFR+VBnFlzgkFSXXRkgwIAEHIlRIF5k0VscUdEjMEJWJDoBRDIAQwMuIYIP2A1+DH2WV8jBzQYNjSBgBypEQa4nclu3O90cA2pAv0rcSkZFTBhYsLwzUJmAU1FEBa6VcAv5fnR-FYNxIcsTDAMfMjmWA+7JhWMkd1KaQt0pKL2HiF0vdRDqh3QKihWpSdRPWxMMwORV1RGwcN2VMHfOAHu0mzEoHr5poBYRRJbyDiCGkzSZaCyAGpTGSCAnwLbS21scPIBxxEkQoSOgqNZOG+gIjU1DLQzRKSGpBgQI1SIVLaGywX5EoOZDCoH9H1QnAPEQLFOD-lWOD-93dacECJ2SMMFcVGgKozDIQAR2X9B9SBIXCkYISfgDRkgIlyEljJKCnDYiydGnolmqa-mc06UI3FEAIAX-TYxGJYFSmVlQ22ybRjhUgTbAKwI6nG9EwRQg2wm6DFVZFEiP+3qpzyRoBAhBHJiAQAicdfj4sV8aEBzx4wSclOJpwCsDLAYAEd1eRzdXanYJFfayk9AEbRKh8sqCYEXtFTIR8lkp9gRsHmgaJbcDRJV4EAFdoUlCsGpFBiHQwL8Z8MWiDoLwW9zcoQIOgBK1pwGMgjE2KQqCADdEQIiuc-3Shz3x-vRGyzsdPInB70kARKBIxmwQAzrC0wKw1JUtBMHWkkl+YQwT0ERPI1q8W+F6GTB8oBqSrIpVJChTpg5Az2+xbyIMDHVTSRE1JMkLE2iYUtlU1Dt5zUDoDUBN8IIB8JUncwjgAlhcKSr5tEfI1-g2Hf0AM5e8EADn01Ad4JAIqaNEJblvXMIB8VmiNlBh1eCHYlDAOdECAYAOhb6U+hXQqR2QRICO22WAYAa+EnJ0oNQESBpkHsWP58SOwFKJRANQDJhJIjcQ1J+gS7SaF4yNElT8SgE4GKgrzXXhPYLwW4VeAh1WsLoBNxKPGhAjlFyDDl5iYqG3558VgAVIFfLICoIIAMpRc8NkGwjAh5fZuGnD8qTlBBJVCGCGaQAOONC7YNdIsEf9HZFPFNRWAFqiCBxkRvhXBrJN-n5MSndQmRoU3PICJphwU1EbptxCYFiA6wZYCpIZoLYWPpbBYPgnAWaDwkHx3QK8BNEUVBX3N4WcPNWUotwGgg316OFKRcJXgDYAcM1CRoAy4XcNMERAiwRdE9V2iVQEgJpwZIEf4UCfbUwgDFJfEWUinaXDsBSYP51PCvaNSFkhCXMqEelWqJlDgAendzTfgTdIIC2IWcPSXBsbOTRGKpHiQwQ8JkSLGjIjiVCEWWAAsfaTHgrwTQiGUARfJCCMZ3FiHzxHaZUihhIxJwl2hUkUiB1oOkJACCB+SH30RMwAJumGh8pFpRAg0jEbQvITgZ3iWQew6yzgBeKGEndA38F0joAkoK3nU8PwNEj8QLdAw29NmqCAF3xHZZsBpxJBL8C91zye8DyBmIhzEFRhANLSAC7AIAjUAmtC8GU0CsbmkujF2F10QoC6HhWnAsgYPn9AENc0KOc8wWwhABLNRWBQoKTQ7U65EgPGlugyIL8GKhFPMIAvBcIDRAM4Vif7kbAooZ6RgB4wEfh6xlItRS6V34G2HhQuDG3Q9iIlebBgoo5NYgrBWSDxAxCuVRsBRUIANPAzgNYjumnBSnU3wfEySS2GpNSgrIF9RZKIPGQZ1HLh2TCLwInHQ1WAakG50ppE4m+QAQMMCthbySECNoIACundDowBgGUkg6aCBAB4NQd0twwwfin+N0qNsBLAcZTVSo1QQqGIgAF8PMBq9lcfHES1FadgVU47JNBQskKuIKLJBuaUJFCEQAYSxZij+N13l4EAfCED5fJccHmhg+P6iIg2wMmChp3QX7FmokAZsDEwgwaIPM9rJRwCvgFBQrC919gdvjS0T6b6mvA7IBM2OhdglqIMo4VOvWSB04s1GjBEoOwGWpWAN93KCXIMrQM0TgF1TwoqyK8FElqYtDzokwwe423FwjBHk94DDUFH3BI8cCWs1x8ajzcpQpYAzJdFIKnzLA5gmZw2JmzT3gOp9qfCW+I0IFnH6AtydTVXA8iUEhKA3FSEC2UPVX3Rkl58GIyvAOBVBSqkZpaMHGpzTX2SyAQYaUMKjaKYmycAVIMZ0xIaoqAmgkuVJIwvBWAAEBcJrJRPSVonif3TFkx1IIACoMWTCmKgayKGGnAkxO1Rro5FH0P3BqXYq1ppRdAykyEEIAhJCo6kTRKvBAmeC3cl0dCoK1NmpeHGogcBAxWkkEJTePUpfPJWSc8zUGB3bpOqQsHJgVkY4MNEkAJ4jkUJafgncRIPbmRgBYE0R1TxQyQoEhBmSTBQJ0w4qAiLBsEFAMdwWcRSCXB5JCsCAgrzbgkcdWAaonDNC-dvHKQaqCAGTAjPSCgTJ4wXQlKZqaBAGngOqbRXX5iofPEyRQYVMDz0BZZMGYAsiECF3IXqOABGgB0J1SrB3QLQQQB4iMqS2A0cGrE7RnwKDXxIIcYPkhAEDXXBKAAJW3W2J6NCHCjBhwd8A1BAmXYU89aJBgHNYWBaQjDjDiVP1EAeyHZQdR-QQ7XAhWAPaM5Y4qIELCBhCQCGTA7bJGnUBVKX7C6UHAugRSVEwQ4DCATaIIBC0AwD6FWIFUNvTLB-wegjLA4sXCiJQDgVcHkNYwKqxqtrLMsHqsTAeEDOt-AZqy6sS5JqyLlCASuT6tAGEABAAoAKCUmBD6YoCvBe5SoF7kL6OayHkBQB+iFAn6EUBfpxQN+jWsJgDa3nk3ATeWXk9rK1PbIYgR0COtdQU6ygYAgC6zgYj5BwBPlbrdBgvkPQR6xwZb5fBgflYwJ+RIZX5R2jjAfrHoVjB-rQG1zB4IOXnfBR4jpMIRU5c3XXInkCyUQgnjZVKzAr4dP1jBzbS3hZsyGbIXn4KGSqy5i-5WoV1tYwTMAVxO03WwLSUpFfHVsB0uMGbBlU2sE5s50+W11soXdW2IRcwEsAt5qyMW3IY4wVOSvAwwLMCbMD0nW1jAvrXMHnc+eJUVzA+Q+G3c4F0tH2bJFxQPX75lgKXzjBqQD9VS1hoWyGiQ6eNFkLhLWUmDcRzwALF0RJGcHEhwjkHC2Sw2IepCfYImILgQyg7UViBh7GLeBrgkAAaB6wEITlEU5VoFSRwxgk0STMQL9WwnKhvOWXlgc4MkWA6Rcsde35gvmGaBmhjwUSE3BbMEn1yhtoXJidoUoBRDOgDURZByBIML+2QQRYQ6EoyF7R6k25jsVSE4xXIPkJrg4AYWE6hAuMWCrUQAXXnMxGwKjMqZF7IzNj0OIeDLbBa0CcFPZ6MGFjhZGWRFjtgSsVVmdhXYK+1OhhWF+Aghe7c+2MywIVTKszCsZTJix-UNTMbReaNni2I-oa+13Vvoc7AftPUf8AgcfM2WGgc0aeCB9QVMicGFgZM6jPZ51sZMFegIbKMAWwsMziCDtdUQqgoJhAGiEvS-QW3nt5owddVjpNQRkhgBpY702rgf0dcGogb9QdGpAQFNjwVgywa5kf5SVGPwWJi0XXxu1IiAsjDkOlPXFFiSfT-URAsgbRFQDzCH1FSRVgEoAstR0ScDvcqhY7DKM-OFERqM-cLAGDVIQc4HrQ-aYQG8VCAowhCV+TSlSCFKkZInlJwvREBABylH5UhAYyY0g7JtFKvl-hm8G3BfBqHHJNxV0gcvAQMPCRylY09I-TQ6ht0d0E7QNwGcAjI1HTOhmVOlUyij5IPMqlYA1MIIDK10PRKAvBdUVcBsMAQXPEvEfeKqQMVk4Q6EzxflEAlt9upQ8hKB0NYVMfNwYQ0Iwwt-F7CpyrEb2AVRccP2juR-8G2C-A6APbQgAbiFpEFD1E9qmP0qIIhUnAWcEI0e112Q-D5h3Sb5PGdVTJU2GU7AZMEy1u9MoSzEzIJWn2B4JRKB1RviS0X4tCQlSLMpXyRfQtdRARYOS1woyRBv4VIhIW2FP-E4C08l-Yc3nBqZIAPnxkKd0HP4EDOFFXBWUiZm2VjSKqCyiPSA-BGgjPazVEApIxKBndIIV2SyBhAcVUwFEwGrxsJYsIGT+EywdWmUp5eBDFeBUkRMngV6OJS1oIDJZ2hjRkgM2QoIj8AkmxN8jVICiRIxJU0sTNFKeI0MdRX7NwpZ8UmRvQ8lCCgE1hBKWB3A4Igd0gCOY8SB-ItfEFRttfDDajUdQyNMBnZKIEw0fAdLSdUf8iSdfmcl0qT0AbknaW9EcoxCGEN9V1+JGj4Vq4f5TDBeaPFV1IIaCZA7cGaYzhuCnDWJT4IpNE2Ic0vwSaLJz6FQ7RXBrXPIGG8TNGwyyBi8aRDrATgPsEKB3hacgUlk4BHEwEFE81md0B-AygQBGgJJTDwaBACmMtHxM-R3xRAYJNKYdJVGg7pu8AEDsp7aJckb1NQOzTqBOc5bWqdfDUIBzBjgTOk7dwlBPObUEBF6X3AEAexC5DvYCQhX4NBMKj35EdD2VgonNPaSkgNhakxKBK+ZzADxuXaSRMN1Q0RKDQsRRp08gl1baiyBLaAnUMRlSZgDocBky7I5NPRYqBzxzpZgE3AJmHEXERkgBDB-kWgKRAtENImvP2BhidOi1FY4a+DNw4YtQjnAuUTfV30sgNgLhkXRFAmSA7iMKC-AqLI6lyFR8UvFJ0h6ZxwGAx0MVFDi1oDDF+DanPMjl55vFmNAptiCAhXA8iX2FotZTJAHoCOsKoFQQ0VNkhZxGwVy08hNFBBD6LQwml2YAeaPIArAYXa2DCk5FFKRojP-dEQ2iuHS7ITyOIcojckTgRKGBo34RcIPcTgRpyDNoQRdSA5fvWFmnBHAbfFIduie40yQV8fNDbA0YZYG4sMdNsKiS8lYSDoc24+p0Whz8EwTGLAqUiVy1PVOwAlx8kYILaJHcbXA2pGwN5NKRhLPsjiQUoU1DLxxEbrxwEOCRpyG8kAS7XiRwvXoI4EnHHhlhY8+GAGUQjNdRIN4DlCsH3BBoB8B+p+JCsCBN3JQKBWzncGiSPDMI0MOUkhxYcRKBPQXugKp4pAFUqIY0EJRiNlFECBfBqOaXL-w7cQLxxFijPJAvBkQKaEvj9cHUQxV1acRQDJHtQcCpJyc7fmkgmofSn00zqQCiFoDiZuifRA9aYQMlnwa3DTB8ZfbSvBHcLj1pjdUWpQ350CugCkQTNJDUT8e6NtAoJpyU1H8FqiOqDbR3IOFUFD60bKxRFUZbizoAU6TBwxd8qM4ArBOuaEECdHAbqS08s3CgkWK6UEMr1ERhRMAMo1wBog0BR+aCR7NJcBSVHIqhNsGDEM2fYUaAkIfCQWT0jAnXWhvcdAyxFWo6nPlhZqYQCnRLoDFxAgOkW0GdJucN9XXwZmf4RJZpyCSUC8gTdf2f8jikUHmw3qWcQ+FohTiQVQh1ZgVn52oEFVKZYkRBBN1YVX4lShpQ2Qh+hxkbARLoT6BwmbBGZBcKahudYUQxoAONsBJN8stQBOBLqGryZQyqcilUJsA03G9xBqcaVopv+A2g-wHnEq0rErDMKWNR4pA3h-YNUc9HwgmpNuEEgqCQkL9d2tZDCwIUkf0B70WSy7XdBZzQZykklZRMFeADAxIxupSiXwycx9kLEmpVkybK2qoOcaSi9IwIdIz-wxAaoCX4dkFR3R0BxJmipJ2qIIGf9IpTKGSBVibmD1pt6QgJgA+SQgWSBAgp8CVIrRGiLAAadE3AUsaE7AsrJ+KPFUjMIKwkjJdrmbYTXAtYzXFqdjgD-DDV3oNYgUkKofPEuTciDMGYqIAOwF6l8HSSXdJN9aUKrAUgyCrUBgCOcjcLG8+jmiAgwBLE2kjCtQB1DFBFZM9xOUW0DQEbeBzjKNQw8smo9CaT6k30wAVgA4r1IX2XP42xQcHg9NSZgTKVLUT3JMoW6AwiGy06aGHpEwwAbWahliSZ3IoHEFn3NisgXMXso6ABACxlZibSnDsLVIz0UJ0C7rCNR1cS3H+MgwWi33AXmBai3Abc5As9wzjBlQX4qNesFqKpLakGKhWSX9mpBXUBqUFRNEXRDrhBHZMAAgMpCCnm8H3MlJYF1+G9S-BSIDPjuT3QAMmbAuIJ0mFFtoIhLAAgwUonclJwW-mOJizQqDNUk3ZMAApd1VAMOSlFf0DsiyYhfBiokIaAVY1qrJ8mhAckwIN0gwjeMDL8FiiAGGRkGIMARE7IseBRFgyBF3fJ-vZ9DAgvAvgILoDDG-WQkVEzJ0hpGcLkKKUGhERXThufPT3cgfKfAlNR3Qt3HzxTUL8GEdEQVmFXAywF-G1qs7NGCaoggCcGIotcIoDikU6QxHEVkEE2kC1tKcOWuQ1a88kRt7RKsDrAEAdWXWQpHMZxa06EpCx0sm4T9IAkZnZkTtUM1YsHBp9TX8pV1nqc2C7dqVMGCb4IlRKFrIJFLoRglZxalz74m9TSVopWoYtEthMacVhyDIKstDL8p8YcBdFIsUQzEIq4cMDGTIsBcLsASJQEjUyePdvH2BfLSzSHI7xF4lYl4kYAhqofVSEEbArTMYpQo0+E4BGCrwMAyfh1Ua3gLLeNRp2eqRwSsAaE0UNHWwSJCOuA1Je8TKSHgXZMgXCNyVNhzdJ6Ah7m+q8pbSU3Bh8EfjGjJwD-SfRnJS5XGduIX2Xl5sILMBSJ5YFnAXCmfOgAgAWcC8ADRVlHcCd5xFMtSOhyJKyikM5BeG2fA7ANbzgdViaMADU8cdZS3At3SnPYjWAZIGnAUpZujTB9wKzXyjxatI1qwAqdIkdIr6VcC9ggOBIQzAsgGIA0Jx9IPyZ8RHTVVR0FSDQ1HVoYMSD2j9NYIHGQBeZUh6IUAp4Dyhy9FgVIa+4BAEXEeabqU1UkoTfRyS4kcJBIhTUB6TbBccC-kEIeyASDJVPwees4swYR4GhQnvUQxeZ-QUXGBBK7YqDUBJcSGnTBOE2U0WB9KOInXEDhLEWhVhzKlQAbZBecIxd-lQBOkoRNBmWioC-PnEAT9ZMKUFqmzPywBA3DVZX2BhoVYhtVwlLOn5k59K-lmkeaPtEttvwmEtZhUnZmj8VpITRU6Va6TSG5gXjMyFQUgpBDhRQjlHHGxNfKURGCDMTP3QnqyocRWITFZT3H8166UdyRrlQ3L1Hx040KIHEICKcTsgiUCyUYlTKEBVuRagjCFNiSTDwS4cDKbskv5+IPfBkxGwWvjHQLwdcFfAjwCWgQBjKK6GBAc1QyFY05wQLC6BxwabDDAQAF-1gI1iOsBvFKyI4GEAFyMXH+gvs-BWeaxUOGySdKBbxTPEGAYuIBALOJDzvpRYh8TyKskc4gRwYARg3ahNwDalKc2+QosMgNqEShKl2zVPjoNFYakDGIOIKAM3iHQZXAgMCyks3lc0wNw2MkTNEAkUgVcc-F3wctZ5SX580QaWVJ-8KJK+yjKLlTjRoxZiCd80+foCPcVIH6mhUGARsHmxhXHGgdA3nIlyTBgoBRPR0ggRQTWlhIREDWoqcXWlwJVwVgEi9QqPHB6wCdZNDNgMTZ3iLARquB3dRMW34UKiP9ayglIywDVNWUI8OFVYBDQqgl4seNC6mMJ5Sd6RIwc3ZVCdVmYFAXU8DlD4hOr3wFsFDCb8QdDgVmRd0EfA9XSEAqJKWqcF1w3jb2r6JmoYQ17D1hdKAFl1HGUmerSRFJsrp-3cKj8huiVZw9A4ceGydZwoL8gshefcmFJhO0IiikgTYpzGWiUJBgBekfqFnG9rYBXDU1oCyli3G8RFMqRslPEoATyl+UgVC5xUFGqMFYw9Yc1hb1xfChFMQYUgL+kHhXyBIJSdPFUocmKXiivAyscInUcsRDPmahgxSFAcNls8pVjKIK8pSakdQ-YEvE3sHqljhSISGCKVtsskzCAmqHZGKgv-DyxKQWlRiTfcwAHMGJJqTJYgtgnVbIAUIQNZeAtdz1eZnjACytRU1BgQfExqVT2P6DKpPQPyws4btII3-w38crEzo7GmgTyRug6MHbNHlPIGlDtiNDzUAIiJPE09pwVTllNM5MaBalEtHVxABpY24lES7AC8Ag5gQTXRglAsBcrW8qwXsyuKywZpW1IwXcUvFVycMAEOA8SGAxfg2eRTxexY6Vmh0QggcajDlA2sVA2wxcTZOvhfRYCldxNzADw7M8gZugoJpwEozyAjqTGgzc6wI1CiSDEuwEWonW4ei1wXybSlaBp2vklrI2Rd8DVkyVAulOgSiAZBZxj0ssD9RtwV9XN1ziHiFgFbdEFVEkPPK0XhMXqWc09B3Vb8WQgesP3SX9vpEEljpcSdOJ2IeCMlyWoBSJ3wY4TwDRCtCdyCfyXjPsvnj0bkwJqgx91KIITqIBYImgZEG+N+FDjP89X2WA6pE+n80DyREEFQaBBYUmAUS6GnH0iwB6pWomiAKjhwAGsc2d4b0KGQsZWCXUTfUFyU1FiCRhd2mXhx6viFBCuIQXEIkc4mIMiqdXEKBOr8kXDUhArxK4r68FkDFn+hgYcnN5hmIAIl8ajwEs2UkX8KSUyBYtD5JFxmC2Yj7IPVCGyuLQaw8kC6Ek9yA6QVOg6nBJbIh8HdAdaV4A30LqbrlY1z8oKn3YYUB8X3B9VANiqgCsNHBNIYJfCw7AXjWJ1ANh+APDIFkSAllrRHBexB29HAA1xNVACCkFHMj+REAhp5+fU2UNmBEKHEkC8ZUgBUu6PI3DpBbIkVDC78A5Ozp2Y1cHABMod53TpsDYIAbhUO0QDoFIPUiLLUNKXo2RU2cfBR0y5KXQUYShqhsQ3dBwQxyDBlSYkxbBmyLsBPBuvGiIfEFhJokOhYJRBQypbY7MjrA0RMoSoIqHacAONqrTRUoDSjPiEVKq+QYi-CDDQWBUj2INHERrt0MEWDzKQgCk6b9gXsEMhmIcLrhEj8dVEcAzIVb32BhXEsurj5SLukRT2wMGA1A+GaBUro6wREGbwYyXWTDA2AOSXT85ci6Dw8pwbdGdp4wM3CKxx6lkH8Lf4IsCtMQIIIDRDX1Zajgl9wDbCWITzKcGhA58Zh1Q6HwLkNNjUO7Il8hdqainDlEwWQRbIQIZsGCF+AiOmOhJcAsNGD-xeWNybxdGaAwoHAGABc82wRwGriNokF1bViSn8C5iZBQmBZcL+eqKC4JoVcG7wHZUQBIjBcbNt0E-LBfGvIlBT0i0kvtIP0FrG9QwitlRgn-IKxM8C8ntxta9EnWgCrJZDyJbEdOFk7HSTeLgAfFCpQ-A7kXfF+Df0XfF0U7mosAZEBtZCBIIZCJmmaJhiYqABorwJSQyksyW5BCh++YswIGeCdslAZX+ZqRa8CYIQimkpU2ol18jZAz1hhMmNaB21xIGd02JJENaLeqOkdVAGTayQWu5IVeNqX3A+0IG3TlzQrOUCgc5Bqz3lJ6fVJ1SjQI1J6tV6IkH6sN6IaygA1CWwXDTngAADIoAM4HWBfgMawPou5f+nZBHU2ayvpeQNoAWtR5D1PHlvUyeQ-pZQTawXlI0v+lVASQCYEFSlgOgD6GTrbeTHooGfeUusE0q0ButUGO6wwZL5dNJvk8Ge+UIZ3rPNMvSC02MCLTybJyLLS4wCtNhZHaTAzvANsf+TehbIZJCKQW03MDbT0nQW2yV50g9OVox00dKFtrkd4fnSx0rmIfku0vMFjBp0pzQvTu0hdKXTMbFdNTksledI3SSwLdMPTARgsCzAswc9NXTj009NFtER7YdLAb0wp2VSH0rcCfTrbF9Kgk1FeYjZQv02MB-TVNX2oAyHSNVhdgQM4uDAyE0CDP+Unme8CqRYMwBDMzEMx9nx5UM8zPQzW4ErPu0zZPDM3wLzDom6YSM291V8KMyYXKYaM8GDl4ZEejIQyToZjM+YhYNjOKgOMpFm4zAvPpn4zgkLICEyOpUGFEzmpb+HdhJM5LGkylR4zI24UsxTPSzxRkLI0y7MLTOrhdM+GH0zZM7zJMyuChjL8ywYeVlsylWJFm9snM9VlczaYDzJzs57Z0cgcwx8GByI+GILNUysssLJsxXMm+xiz77feHiyvM2TKgdH0VLKUy+GD0ZzGDM1bEC58s0pF7tisgO1KyeIBxHKyVkCeuqzmyC8CTd5eerJ4gngNHAhweIWsKCo-aYqD-MXYLyCyR9RZkgIasFb6hRLGgPPXCMCEWiAblg8i6l7BRi7YSwBw6PnhYsmUN3lJUbI-LJJDuwmsHqqMweJFeB+JQKBzANo3JWuph-OOipV2YIxX+hWxRfWklioQdBvwaSW2PcVioRwpMR9gL8KMUBcCCizpFgcimVjG801Bt03jIqQ3c5SGamWz88QeBBh5o8WWyJSBK+Hq8VyFZzKVwzSkKoLktDvFEwCExkhHAEAA2pm7KcpUm61ezCABhcO6XPrtzJcfyILwvwOgguBUJNwIcCKuUQHbpxUK4u8gkNR0ANh3yQ2DbAXjEzQAhtawnDbgXxbURilzU2TuvUAQfk3P51ke6rvcTNRZR0a8+G2w+ExZfI2OIPvXjQBatxB8Hnc3FDox2RRIayFbVe6J8UPIEAH9K909wMsEs03oCcnTrc8Nif9oXjAEC3AHUYhz5w0aQKiYE1XV5NSVXQQILZEKEznWmgtYrcT4JVwFmDzULgQLFuEq6bPhFpUtDOFPIjRGmk-SVgaZG4ILyHZTyBb0POjVF3VPuG0U2iVAOco4RAemhBLSNLQMrPCPieSxPQD+GCBdUcsU2S1+qTSfhpRHhm0R2yb5PZjreLZPRIZocOnq9fKJK3IViJIcD4ow5T0EuTejV0C8gLRY4jglQ9ePDNadGw5JUcpg1JGYBoQHQT9EH4f90eDEoIabIkUUPaOtgU8azW0C6wAnSWQN+WcB7CIKqrWUjj9JuhXF3OZmEplySL8FidtlD6FkJLYHM2NoN9D6CmUHGtsAANnYiYOSAQAAehmk2wYsiZ9BQ1QmuNPoKijoQ1CB5DR0FiU2LKUoJErVKK-4SmB40wjY1VpBtSsYoRE76IMHnJTPMBFazM8OeNKYsIb2OaBuIMBB09PoCwnIVz8aeC-B06p1HjxrmxsJZro+77FXB3fPIAXcx8PEgF8GEQ2FlQdQlMOAo+1SsC1VXdYEEtRQBstGcwwwW5FERmwJdQfI0lFktdAQIR8WhAd4cfhhJkiLjwMSBxcfCJwzQbfAv04KZlRZxloB2bBdn9d8lMpp2zPmWBsEzdVXHiHJ5C9BGgf0H7EzRc2BABqYqGVNQ+iZVD0iGDHsXS8cRZ9DXA9XXojNrpQn5vTrc+omhjl1NSSNsUTgSk0RAfIWaQlzPhDs3ygYzNQU9ApVZqB5oyYPrNNROlaFR-IXyYVzJgGpKxFCCwgIGGaQQYRQonBPeX2BJ928DSzLA3Cy6DrAx8GQUbBm5fKFT5GSXDUvx53LSrKhfhV3HAhZIXiRN14wEAA+K4AOuhnM9Xd0HzAm4GvAg5xWKcAvBHAVAvCQsAYwQxM0wWJ3nrm8RsBFwdJmlGMrPRQmRCVzA5ecpFeVaFRcjqXdKFi1GDAVAn8lEVy1j47wBamE1XaYZt+9ViWBa5Dz-XfTeogudzgORjK6cAG0iI41U0lVFASCCj-8T2OppEyHtSThkgLXs8R09eIoxlMhLCnpxtENAbVM4HLZT7HniG4QUtIKA-kASnI-2j+mi+0UXdCd4fI34oEhUEI5JAXNTBX4tCYjqrTJBIYm2oRhajwv4-JF-orAmKUgPR00Jf2F4tlovXysJW1TXXwpP8HtSLB-Hcml7wyweUmSBDPDEN+cV+a6XCApKTzQh9VwdqnAR0wPIBWhjwCoOIUVyVJCOKLCIwjwD8opVtZgvcEoE8J4wH-jbAF-DmSVaCga1WulxaaQWPywiUz1NVSjeMGQkgqYQDLAPCBCVfxoxM0FxoNUMOTiaxSokaos59T0Hq8aWMtWlFyIfYDHVsDC2VCDnjd3TSIf8ncG0Fm+T6GfRTVB5Q94jCwViLBG0V4nDY8A61QP5WAAJdkEcKfGXCN8HZMtiAEkroVUBPKEqjlKroMGFuhY4CoNPIZwIXAzVbCZqE2kadDwjoU0cZbxGQxnG2W8l0wdcJRVmUbKS3cV8JnGCdwiKYXTILydiN8zS1Nt22z1YRoET1tJMMAtgyYcXQYBkIALA+hlvdmot0G4POKANCov+1EhVBP1z4D8qPaMYTPE-aBIhfJRQXU90oQPm+kRcIPFQV7Oh0GKsXyJMUGIV8IXC49OIyCiGRznV4GDxEtCsRfn4Wj7T3YoKH9MWA2RXll18ysYypWcd1VQEhIQoRnGepTp6FX8LsZAWnHRPLC2iGU0jbfF+dewaqlIaowYaFQEWPUwhyS48FdnrRcKR3iMIIAeZBPIkAUIxSd9ZXKACJoUZimckwADp0a8qJNvU4l9pQJwrAXiSnLOSVIB+gllVGlymjsycfByNVAYRdP4oA8QghIhEKHnDGc4bHjAqgWfPkXKR0nNimTV-cMBCdaH-OOgn95ow8AarH4DiGIlYyg90Uo2oBvmydQUU5QUFU9bUTxw-pjXSNb9wT7LiVhDL4jgR6oJIlage6shsJd+AwLrRVHFliBeJfKPfmXEtyI+FAHBsQlcCJXLZqCeJvFSpUOrr4ABt8sa8loWqsB4mbsn5avPcD8t6XeqiooKwKQ26owAF5A0opJV3R5xBOwpRuhayI6U6VGndGcKxQgOuFMIGAKlSOUQiHWXzAFVaQX3gLJAlsbB-Nd0BOA6gC8DtRWgXCAKwUBzXQ-FuaTyeZw+wSUSyEDNTKDTBCBR8F9hkgSaLbBbwCbydQOEtMD+FMFcikxJniXXUhYQYBBwPBCcBdUS02Sc01ohWsxBCvgUkOSBZxXoLEOBo2Ud3WqdNJBgCP488Lh2vQR41oE3xcSO9QRwDk9DWrEwpdL3qd48BHEhQlZXvG2pQavdJdMVyb2QXAdJGWgdjclQintB4FScHCmcfUfzhF81G8neQ3SKY2Ut3TVKGWA9FZmU35mSebAtofDDCggNaUV10ogRqjfm1MRWBmWEB-BRwCoKa8hFS0cqhPfhUJOsJpTBFPceXn0pvvYuJX56p+NYNC6DMlw2oCuwGG5UCEq+DGgg-DWNIhNvXyzW95Xaf1RkAQBmSc9AsPFbJJQCdWgRxuG0UlN9KChVFChMBYyxzaFkNIxso+PPFdR8VgSJQEhAtTvGKMHiE2ADR8Zih1GZeeqcm9rZBT2a6IFXbJDwN1Nd0IeEuAaeSydfUE0iGyH+BQnv7DJaECjALdRcRa0r4dNZ1Q0oP0PmgbMKxBGgkRQGVvEHOWIGGJ7jJgHqFtJEQUf5HCxBV8lOuEOk0pMncCXSsk6HcF31w8PPUSJQwSmF-MKoMvg107hBmmfA6AdSl2otY-73xgnibGdZSbtNDw7w7Ned3CTMCZymfQl3Z3leIwqdgSHMvanPOSdHnWUz7Gb8WCjxQZXcanQ1bdBBwLo8lZinQMw9VPipSYpERsiM2JgX0U6EBWfmVDqiVcBoFXCO-ANwZ2ZDAkJXhfEloguhAykSgSrGhMI2dQh-kb5DJSxPVwr9AiFjIAtdPWoITFVDtWI-LdLxwszNbggQ4VCRED6ylgXhi3A9qZzFeFXMYXFuJ7i0Tuys+9OCJwFaiGfB7jEaWlAeU8SFCTgd8cJcGVIm6OyTbBqYojBX55iKcU3iZlG7ULJZBAsrtUYwrAleIthUFEtj-EIIVp1h4DKkhqo8FWEbwH9NPDkoSjCsH3YxVNPgVQ24CVzZJ5JOFLoRE-H3dcgU6b2d56EiBcP2AvwByEyR4FVcFOknMZU2wQ8Z4yUbBd8HOmDz-iZUmwofo6D1BUCUb3AKAJmMo0Rrk0KoX3BYVC2BQtq4uhwLT+aEkOJI9fajnU3jIXugHF9gRPSf23KCc15hfyacjChUOmql8kijCEVVFMIP+DsHL+xwDrpVPUldCle4okzAbIa9xETBiVKyDR109ZiE4iRZfqm2UAwewiKEQIdAkZC4Afi1rCUc2aSaBK4Cc3xwh6OgESgbBO3kFwkidZHPwicHy2pAnI7SH+RZ4B6ox8rRegixIigJigoikayPB7pEjE4GuY3FRI0MQXoPzD7sqoS2GkJciHOLkEpDCghnJahTfTX86uBaCQBfdfUSdbapeyHgVoQXhgEhtjF9HoJjcXss4kmBIijY5IQO+hNiOxFpWb8ZSWoXHhPZ2sQlJbfV3FpA9Ioy3TAFYCCpYWjcJSUOKAwEPArAb0ArrdxmlZKHoFqUK-DARSl30SnhFZFBrHjLxSGTHw1MsMkcB0qdcGViB6Ck2EN6dFvDY80Uao3P20iamTfUViO8F68SwLZS-AKwAWT8kAOKGkM8OoJoVeAE6eqZOBGUP-fPx9ob6GskPwAdhTw7jQyKOppEA7QL98kOtDHVrUAYC3zllcJUAT2+c1pOJzJDYhCBtKUs1Y1yyaXSHExShVXnJs5glepMbeaglcJcCOCMfMbyQvhRoLYHfBPS6CEVRDIeIPrF0EK-LWpohDyV4G0JHTeDVqwF-HRB5Yh6OylxkENf0ZYsNsNgHaNzeGZTdcUVnihYWxRYUjId0DL8A0ojgBcugVg8TIpEdc3VcmOEy-OsAYhSpfKA21akH5tkgghXFXpj6ydZB5wdGoQm6IUwkao5wxUaDpHgICIICqygwF5mpNrcKuhZw+aVLQ4r3gWZF-VqgPssPx+wI5QUgQIVThJDEZMsksODcULyLAWaNsECDtTUgR3hhBKD2lEYQyAhSb-fUOJtg-RQ+eWyUDtkShlwIFH2d0zCaxC-xmgZSywpzJHWcCIb+YfiIhP0yDHg02Nj0UYTlCT5yNFKB0vAthncGtnUTfZGqLOoRcG8g0iuVZEE2IViFBpTwkiURFtxaU1Q5ZFjIV9RwQCBLBTVtdoBSENOKfYKW-jhIM8LzyMiJqA-UssRoH+FbhZb1+FlceyafEfYkqS18+ZbmiJRJK9SEO1XgNajFKCgdvjjIAaOFMFScRKX1IlEKVyBvFXlGtkRBNxFj3KctEOgF3JtNPxDAb-ND5PBhIQSgOIhHCoIASJBqX5z7J9oiRVSV7qq+C6Ej+RcUYPfse-A4NkcTZK3wXjY-KvBIjTGnKXASfbQb5GgbA2SANcvu3NNLSSlVs61HZ3wohOOQjXPz3nGwYnBtaypQ0Jt0IP2PFmwPFG9Jt1YkvFoqc2SbaIH3C1rncRFPglyJERHWeqBm8Cc3H5+3UcmbJG0E0lUo3lKvkuhLE9cLgoLRDsx+9N9LWaEJXwMABPZk0EzWpF3YZ0hWBmoP+3pRlxOxuTl+xASMNhHefyBa1BIZqAv1S6W6Hic9YNAQkgSIL-xigaYXlVZloEcOB4VVcAhu5VW2gvRUJYya6d7Ba0FFX4DTY-CSMpz8TrApAX5kRGd4biDqW2JOkwF2q6PoYQn+FAZEIy6I0B-NX2ga6icEC0zD1T13wvs0ChKBAXI8hzJw6VAXZr148iGdQ9YSACfQtBXggQgHtMIEhdqQd1RWz8cJygDRSgzcFT9MBB0H7B9qhunagu9IdyydKAr8JSQ6HANiwVxxdMHphcNCPE8hvq3chmpNvc4nqjASRiCWEKItPifEqVdVXGoCKDbXU8XI9U1ZpzM+cDyJ6BGEFHD8FCtx49a+IhOYL38RAQgtJRUCtCW6ZOhTMhScAhVrQEhT0HqpmYRnBOpL+w+mTBE+U3uK0wILmjqgfvDNwtEAA7SHq8KSJgMRSqCRPTzweIdSDjybOWBA1TMMqQhPN3YX8CrIXqWEXw4f+aCR3og-P0XARREnRBcoqtdSBnMJXZuS7Zfnb5WIl08ZBHRpDT7ARdnsQrMCzcka-FLn0-FL2rDIRhH+SeAHAD-R2kIEr5LMORVK6WYFOxeXw+aFfMlyZTokddWbBreMNTpJQIbfAHoLwZum0IaaC1UYhd2HPjSgO1QIg-AWBJJ2IRHAY5rKBVKc4mWBJhftxPZ0jBQSBIcyPvmqEA50PCYhIiHwpH4qwJgQApEoUMnC9Gar0Ft09ehh1AYGxBGh9KQSWDU2kFqBDVKMGABzjLIg-HqlHVuLZBTfhEyLmPNVclNnaaAM8hvKpp0cCMDCBjVbRGMIUoOSC1rNwfaMQUREW9w2NToM6lU10QozxSNk72cyvQwIUdWZkOqDH0RBfVdYBXOIIBQQCw+xMlOgtowPYD8ockSO-Q0SkHwy4BqHQAlqoSQpylVJbyAehz4BIhPJii-oaCS6EetJlOFT3QvzuPETwUfG3N1gc-vXUMfIYh8KxUb6gGQrCNjmb4gF+PDwpw8W2xadWNfwXvH6XEAHYJWUz0EoD7eobLzxUSHswQM9PcmC0dzUSkV6DAOz6nUQtBRxx0mONv83PIF-ZQ2xg2OViAF8igFnxtVzluoCjWHydxAvA1wPxXTWU6Ffl9qBRDnGWoo6MMkDa3pSyBZwEEeWPqgwgcpD0kH+PSj0byCcUnmgKxOvmCh0Fa6ikNgRHUUBdHCpIWLAfSgJUU8XULLBkgqybSUEPSy3RByQPm6F0TB82LR4hF9jxRo+Rlo5oTfV12CnAOSMsf72c8Rq2c2i6nVZgikExe72B7pA6Q0+OAC9FRPT9SoWGAsh1EmmEtE5JBgxAGYoF8XNIcaa00CoDje-L+0hFqWDt3Ia8U6MgbcBLaDpD5h-hQOwlpOi3dLcJVuFSZXNEhKg9cPhSSIbLB6TZQTdKlSUQp0FCC0kzCUo3VRLxbCghpzcF8iXivsvGccLwCeMGJt+TMkg0EvcJTpmU2MHYI0hZ7tAQYA46eDWVi6CcnB43j6b11TxsSoYj5lNhEoHR1iSA91IEtCPOipoc3JmkroULGvSK2mXTCJtgYoKxHapm4fKkEO1HAlHCNChG4kh1rVUpZAh7SJchWz1KBYXXFcNATQ7IBNcVlT4LCcOUCc2w00nmQ4KACO7AuSUbbNVYxB1CDoO1ZJBsp0-HQzhEQCHmjhUigAOWqdh5gJocguAfiDyk5IZGk7JpsYqDNR1gLcCWFknGvREcuwMAFqRWoBqqUU9+aPp9NDgO3Rx8Sjf8Rdd6CCJWEBphRClMpIsc-LrAYiZ-U11ioMcytE0wURxOICYSAHOI7hamPNQUhLCHedlKfMH6xNE0iQjAZcFfCOlucVgFwvU9KYjmDpBZS01V+RDtC34XmOwB0hgISfnleXYRMjMoR+Qx3UoWfWTr8mlTIFIv088vGcFRIzM2rJJTcvTzcNmUBX3zfeeqCnNjoVJdW3E+eOUnFQnWNcA8sDYNIFPYyoMsAWgDLvInpinCOwmKkWtQ7f8Er8Z24DJuICc2hBcM-8jbrBpGqLtyGuuDW1Kx0FjhM1q4YVONRuuPgUJVqhUiEFCL+VGTM0m0dDVUVsgYvDugjqc-BUh0Bf-qbAdj17DtL8SIWFo83sIcybQTqZFRL1rcdiKuh8UnD0pVSV5J6IlNaK4g0Qs5jOGNIBSKKgsl98kMDsAmfXPAIRhIaSjNwOK65sOgdZ8pF8Nk5C2nyM-aG3Lsjw3YpGlEe9DbDDu-7KrIzdzSXPqGRWWJS3wU89YvNnhf9V6nEE2MWyh0RDkjd2kGq4GiX2R1cNWvwgbDcUp41LE1JCElRETiDtpJnW7yaklyZAhbF29PJC4NoEQqg6hBNtWJjyCqbHESSdoXCgRw5g0+B3JUSwxScIp4nEVo77ez1SosI8dR19kNiErTBUviwopLNGDtLU64y6Cy2gg8yAhJTx9VLIhvBsElnGwL4hHhki8+BF1119tqLcK74TOySo3ebDT0gDp9ZbUrDI0jcpaMxbIYRx1kMVJlFlQytVtQJ0Jzc1tYldBGCnrBddV6aNxzW-yMJFJRaWN-QgaWcTAIRVZuG1qjMPKFaBFwB4RdFQKCKoSF0vIIgS2FYK-SREije1SHJvpKGFhbeaOBRCg48P1Ugo+IMqSqAMwJlzwFtwZvFFIcG68Ba8bYQ4RFN6NT0nFPzDJOFANAqJ1ms1JlEozJhuYa8CcA5IC8GmFIxMkl-LPQ-ATCAw4k-ilh2a4pD0UG4RxeSgdCEuGSAOCGQ49ijFJnGg6yHf3XqptapnzWkDyAhJjzQSZuUSQZac+AM9s54Q0VwmXMc1pKzgfUY9VEDfEnT82eFZwBA8gZaIfB9qjEwwx01wq+lDK3Iuhw9T4OKiCkCEpJ30QUDwkLVwhaTjGhAUlbxUqR7qsFw-rsTUTDAgiar2r8kMjSa8FSNEd4VCELoCA1J0VKx+DQQY0aCCtMbcrimUI-KS6F0EvbisAVI4AYpY-EtsC2UZminH4+blNxDLAXKEk-UdqdeOhFWPzpwTXGOacBDUlMpPVd3TJJB3DZEkjfidvApkvsg8jI2-RB50fM+w6xb7GqNLEWMh8E6sBR81KmgQWT01vSjuaesJAHqINLX1Rt4lJRhMGgHqVPDoRvquhHVpqcwViZJhnFgFGJYE17G4ECFD7tAYqLSSQA5yta8hogDk+c-ld4Ka1UTAvAndXnw+ygv0RFikUPQ5Ma6a6XhNlFL6Mg9D50sFVTPSdVM1SZ6QgDSGEQFIenpD-ywAyGTU7Idrk8hteXXxWCKAFKHy8c1JGGe5TkG5BGh+a1dSlrT1JWsfUqeT9TuhnoaBpHawDDG-5LADeQ7WaNIxpYgBxpQ+QIMY+TzDM+RLDNNLYMVYYvWbNIJgTYYvyWMB7pOMA+qVdIcMKaCheIGx-4PixkiVhgQ2IRbY+K+CY2f0Bw2BGxI2ToQG4WMBo2S8DZpLGxxgXGzzCakxxgQmz02YmxzQaRBUjWMCZ8D-RckDBqegefBZQIQFIiNjYuyCqwvKHYYe4G+7okZZQi2UTBPIeMBBgVPhQxJ1iKUMAANEUojZSf+RBbY-Jk4ZRAUOL2qM9X1AIueqBXiVhpnQNvTgXWiSiSBJS+QKMA2EBETrhcdD9BP6DheIaBGFRpy4aa5CKyIaDiIZgSEQSQSo+BHTlYPhRJ0PsB-mQaAJIRhKNACQg8YMsjqkXwwsec0bC4bdj9uHwRF5UECokFkDLZSSJ3QXjo2KCnwC+IPj-EBgDfYLXqRmaQYK4EIC3kaghtxTDDjUKnx+8RohsASoj0CeygbaPiCqQemC-CTfg-gUujY4UYLRibsg6eNBQ5kEsoReeGz0aMBDpKQ6p+SX4IqEO-BUWR8jpeMeDM9RVZ-qa5QdObdjoDddhQuD2KUmVgDMwFEQP8RGT2UYcRfEK3hEjLQLYOD5qxkM2qj4KFyg5dQAhAPYDpAJwDIFbHxsbQxwmUOYIxyNairlbqSGnH5rRuOJCw4R8ie8ZiCMqcCSghd0LdhEiSxOGoxekc-qrgHMx28WF7OEfUZr8ZfB5VYczxkBcBdweDzCuaviZydLyHJQDD80AELgADqi-kaRCX8b+LWBUoIWcQGSaSVASUtEVRtxQDwo0JnwSOD1RdCUITUgBwwwwAkja1e3CvROwBYydfxhAe-hobDUCKlE2AeiChz2KQKgsgB8CQsW8CgKeaB5Ibvju0GMD-QWoRWcEjYrUInB60ddhKmCACXUIDip4FMT3GJqLMlV3TB8ZnqBOPwj2IeAAs0WrTQqMZLRSVeCQLYQgviLvgaQaWIWEfZBBAKIrd0UFQ6iMWiegCIAFnKiCjESxKVkIegckTASLFJ7whKYlQ6WEqyxOdAh-2NfofaZNQHEAEhZieKTWQJVocmT9KghP3A+ICrgoId0x64HdAzdb6DisU1RVGDsS7gC0gnVGuhsUeqBXoZugdzdRDbUHVyIUegTe1DVDp4Y-Kn4YhDpOQ0ysiV8AAwOGyu-ZJz8mHpRuObERJUTtzzRMOJRWHpAGRGNDyuB6TokMyhI4eO4+EMMCO4OqBv5R4i4SW5DnSdyL4KLMowGSBaYCXcg58OFBSGYeiK0WwQvMWcpUSamTQWd6DoFIISs0K8Sghdyiz8Dki+nXKYFYAsKcSIpzKhWKjmZHCwCyIAQSxERzfwYkxaxc0ZvwbGiZQMfDfnYcwwhMERfAblRiodP5kOTUCVwY+j2IO1SReQDzWvAzSWwFHKW0ayDQiICBy8DSxEuHwraaPs4w4LvQPcdOJeTTsg26FEqmqC1wxoC4BkqX8gA0W2KoMGmq94IdzmSZfBVkBCT1ONuArnPXBB0MISHgZgAmUX9gs1IaabQREBgAZSjLKWCRcxba5R4TlgS1G6jGWLKAPFaFTRSDpBGtEBp6uPWAA-Njov4DEzSPCZDfiOBRSELcLbgMcD4pe14OBQDoFkEzRzFdPQmITjgNuGIqzLZ8BoeeI7mGM6pqGIQiTKLZQ2GXDQxQXDxCiejT3GIwiJgNah18ZMiaOfNDHCVTxUWCAh2QDQDJwSODNgYUSUGGbohkHsy+UV1xh6UoKsrBKTDeYZABEUvD-SOwDAGKrSPAGAzykX8gDiVsCChCB4PCbJARkBYqAbHiCeUCjItCF2BeJT37waI3Cc8cVzT+LgAlUHGgrZBcCDuaXA7gPnA8aYjo+CcC6oyWWD3SPmTCoaWIKkLNw5uW54xScVAQiBsSf+VyyX4BHS06eqYJiEIxaOS2gVgaySOUBFTT+XVA-RMAg5AK5R5xS4Hk0eSAfCfsRSRZuht+LYAAGJwDn7YiTeuSYTVxTNwRTOCScsY+bZWO3BS0M2oZYdWjpURxxfgTiqQYM-R-wR8B+6cIjBEUpZW8QLpqxBmGlOGACW4NHQLGURx55Q4B3uN4z8mJMD2KbKZONGRBTgUEBeBbKwHLO3ii-LyAT+HtTNUMoC73cCCHASzTOOWYjkwG3BdCNWhfhLQj0VcpYoUcUh0OJWSjEKCiOgGzifgSCCOQTriO0QoB1QFrALGaSj+CcdCk4YMjCANfgyCBWBrePKCf8SKQbidxAgQUILSDSmjq0XXzrhfLBaSRvKHQcWT0uXiw9qTpQmxLfi6EUWICad7q0WJpSTzXAKbgScjmpFPYkTIpQGwWFro6Z1DGQVaixnalzGGfWDS5Sgru0HjRKtaCQ1gFbJzIVnAgAbgg-gEuBZAKIgl6RyiBaFqhRUcAjFSBajL8c0jNEDARS0WHCT4VUS6if3T4GFcRlge-CsuHshowHCB0OGHCtZK4rPGA9TSDShAkSBJzRiQSJD6QvxGKMIAhgDoThKKgoMcOyRtQLvSpgEPC7kPLo55QhoByFqDqIMrAaRRHQb8IVQr4FSR-+ZzwkoAm640OdRfhDRBb8YAw6eEqwJOVghKkZAjUcPQyVHb2R2qSgz+gDYym1JebLASYC8qJCxAmZpDRYSeDnLI9xZVXigJ6XlRYyesgECK3gyQbWTHgMpzd6ZxrP6DsRX4HjBLAPIz3FaiDOad8heELpTnAtvRuEQ8jS6E3RHFQaBegX6Rl5W-hPiCJDwCNuAxFEGBKIWKivJPPhlKbCi-sJUGOFU9Drma8D-eUugmGdgSsNZMAm+AH5h4FPYF0BFQxqdHQ6CJ-briM5qEqfiS0gX4JhUDYzFURRrIQUQCtUcNwKiBDixIHqgmGKORDUQQ5swSRCtgWyKJ4N6B6SbGg3+FmA4UbJyTgJoBRzOwQZSTSSxwD9QQ1UgTuSGKQsLXCCoIYnBQkdT4xoEKD35AnT04bkg7HdcwriVMzDGUQD5sQu40kdyTdSdDR9idOrQWXGDFWTaBjqLcEPiWVJ4I7nwJOa5T7Hd0K3g1iSm+aMSXUIIgBoC87UmShz7dECAz4Ygh2USmgPgHNoseQ0SFiSKRL9bQRlAPBL2gTJyQSL3QlAb2QjCNYgyUSNDjLGaTmBG-AzuINAyIMfDd6dxDM0O9S-lbUwSA-kwAgXMToEP4jCwNAaOFVJDbmbCDVqI+B+4RojCuF0TVkQKC-yEqBI1fsQhKJ1BDgc0yFXGuifffKhcuLQIrUMgTY+JIjPELVTWyIRbCAGEAtgL3AKuPRSEhPmSTCRcQOAO2wLUCOiMhHpA4qLYgcCLiAHrLlS90Y9xqeVeBIEBAwPtUYpKg90LL7O8TKmIabQQWcCcQH0xBIMGAmKCSCFOL5EpQF5TFkdcD3FXzLUHIyALVSQhXoCQFDZUiTCESgyJ+fJCZ0UwhHQPtS8OCAzaaQ4CL9I8ZhCDARBca5BnGKRCBtDWKH4bvLH6FOQIIfvhPwXmBvGDoCF+TKAgELwwiKCQhGoaoTKKNQDmkdJqLhYlZ7AOsJBWcJTn4JugK+Ldx-QV8DwWLIRY0d4BoKfwSnsZQyghe-I+tcwJvGPkLqeMAjZSeiYnmd0zD8JwgN0RIwBLSviBOQairkPzh5UbmiDOO6BtosaJz6IegC0D7QUEZoBCwURxZ0aAgi4RRogDQaQKFBDSSEEWTCoWRTwwGwjinVTw27UYr4ybyTOzNeFw2QxAtiNviPmCZzSPMAgF6d+DjgZvg7tZkRHwKwwtqdmh+wjGSW2RkQqOEMhSEY8RazJUzFLPialCe9LxcQd4+Cf1DNIN7CHgWRD44flCNcFBBHQMKBU+MKDjQLBCFsGkHEIEtixgcOi5gOCCOoARg0satjlYVTgfIAyIlgOtg0wdRDoYPsDNsfpD6IYtBVCVKCEY-p4mUMLCY2HNzKyYaBAcdcD3IeaB5gZgTwQc4CAYD8Bj2SuBYwOxqb2VSAOgP6BSpAFjEZD6BbecBAcGOGxH4OMB1lfWCDvEHTTwK6DjSDqT44ANAtIX8CnQRkYLUQwTwYyqzEONVJ1WRsBJDWeh6paeiz0U-5IgcAAQAA1L3AT7KQASzHEAczErybazALUkzkSASb6gQAE-0JzF8uASaTDXVL2YgNIeY5zHtkciQDDdODqANzFvASeTgAFUiIAf4BQAXv7U0XABmYmzGmYvzHygIAGcULzHBYleQb0DUB6gCYYvAWCaSgKLHm+WLFWmdQA+YpqzMAdzFYAAQDkQCoA4AUfjRAKvhIgZgC2Y3zGkAPayNYs0CsAGgD0oCBhJYizGn-aQD2YzrH4ybrE0AM4CCgPLFGAHeRQAuzEdYnQBdYqvg0AWkB-gNQD9Y6zEWYueiGYzbH7-Q0BDYgIBVY-zE1YurGsAXABAMPshMgNgBIAFrFtYo0AjYnQB1gGgAXYjbHmYu7EIgB7EYAMsDPYnejTY4wA4AAbHvYywCfY9AAZGdYB8iEAATYmKhupP7GzYqAFWATrGUBXrGvAV7E2Y7bHj0QHFQAg7H3AEHF84Z3R2AGgDk4BwjI41HGDYveS449YAaxGgAFDLUB9YiYYA43bHY4+bHQAPawFDQVIk4+nGY40wBM4hHGLY7IBqADnEzYxLG7Y9HEFyEHGJgQaTAganGWwOkAzldbGc4kXGi4tqzk4hbEYAMHGHWUnFA4+eg84kHFlALgBQ4qbHhYwrEWgIoAlYv4BlY7YBa4o0BHYtLGKAWrGDgM7E4APXEgAW7FM44bGq41eQsAGgCdqanHVAGgCa4t3EBAXXExASHGBECoaOgAPFzYwPE44j3HO4wnGNhClSw44XFvYnnGK4iwA64j3ELEJqLCAA3Ew4o3HvAIrGm4mLHm4iICW46PHEAG3Hf0E7EO43AC1Ye-BZ4sBiu4ubG84jAB149XBhAAnGR4+HEg4hvFLAf3EK4lPHN4kHGsqJHDH0TAz94oXEM4wfHd4j3F2pEqQn0CfH-YrnFzYkzFD4j3HzUNfi2COwCa4ogCp46fEY48XFLkUICH0XPERAJPEFYgvEm46LGzUEvHlYq3EIgSvFbWGAD24+rGwaaoBhpW7Er4qPFr4lnE6ANQjkSRPTj4nfFf47VI-4leQ-SRgAn0O+gRARfHXALnHl4lvHoAFuRLADXED4tHFK4wzEg4oNTpAPuxMAUQCwE5PHoE0Ak7Y-fFi4j3HYEgnGTYvPH5YiLGF46-H-AC3FOgCrEY4x-ELyF-GO4igm4EzdSf4rHFgEvaycEvgD4Ez-TdALvExpRAkCEvAm9YsAE0AIVQ5AYAmr4kglEEkAlQMUzFp424ApY0gDHYxeQZYlzFZYvawvYmgnG4hBhF4m-FQARgnME24DAAVgm2Adgm4ACephpdYCbAX4BN4zAke4+wmH0RwmQAAXHAEnnHWEu3GnY87G-YlwkH4j3HC4DUBPYunGT4zHEZ43-EYAZ3FJ4qfFo4mIkryAspZlAgmJErbEH-FXGxE9ACpEp7GiEsgk5En6RbATAwC4usAFE0uQg44ok2pAXFlgeQkqEveR+E6vH1YsFSZATUCf45Il7WeCgmdQVL4EysCPAHfGdEnQDfY15KdyGgCtEiolNWEHHfYgsrZ8BgDjEgYloEsnGuEnIlPY0Ykn4iYlLE+-HM4leRPY2YkbExYlREtPFM41QmkE9rGyAW3GOYwLHeYleQHWc-G0Eq-Fm4swml4pgnbEqwnVY5-EBEnAB3E4ImFEleR9WA6yyE+XFHEs4lTEj3EXY+qZI4AXEHWeolmAbIkryC7GAk-nE+E+El7WJ7EXY57GOgEYCDE1EnDEn7HAMLjrfiYElL4tQlwklYkrySEkjAGgAwkrYlDEjAB9WGgCLANomTEjqwg4xxYUgNDzjE7IY0AJkggAcEAskywlskziIXASHE0kkEnJY3EkYAeqbU0NQj6nbfGGEy-HGE+gl-AeLHLAQgmZEuknoAcoY-ALOiC47wAPEpUlm4i3HqkvbG740uSM4yomaEy4naE64l6EnQBrycYZC4i-GRYkwmlYl4lapDAkdWJomfEmvENYskDnADuj84jomSk9ADp0Y-HzE2EnKEqMnRk7XEhkjIx1APkR6kuAkWk8kmdYykyK4AXG8k-km0kkMlhksNLx48ABpASMkxkmMmakufE9Yg5Tf-AUnnEleS94nPFZkwQA5k1Mk6Acsk8ksECNk8UnLEkIk5E1smf6QskJE5fEr4zUkNyRoA0AZAnkSasn3Yj3EzMHPHjk+Umdk9ECakiXEsAYkniAZ0l0Eo0ml4k0lmk5skYAaomlEmQnIkrYmekwUnkEooCUE6HFn4-PEuk5UnmEjInbEzUlgqFYCn41gjXkjcnF41UmvEhAnek2wk4AJ8nLAPeitydon2gRcl8EnQD-k+QkIEtknKgKCQaAEADFkqMlQUj3H-kiBAVgScmsk5CnKgUchgidCmWAFMnj0M6ynEpQlkkjCkXEqvE2kzLFigENJgiMNIjDN8mPE4vHPE9QBfkxokfE38mhpQ+gjDYMm7k-aw0Uk-Ej46kl1AUQAIU2Mk8UjinzEm+7gAQUDqqXCnu4nIniUmgAJiWSmHYtilfEu1IOAfICZkE+i-Ey0k9k3uRZ0c4De4kSk7k7skrydSnVALSk0AOonHkssn6Uyyls4hgDGUu4C+E1Sm+km+5ZCOXEu4kCmakhSn0oFbHqqGMFOUk8k1kvawj9a1LzEzICXAJsmmU0Kl8UiKmUFHEk8UierwAeaAC49mAOaRKkEUkskkUywn4U08lkUp-EgMW0lUUv-FDDIob0Uw0mMUu8kuUrQm-khylcU7ykhk8vAjAY-GQUkMnzUamiMAWm6Q4hykoknin7kq+jS4woZBU5Qk1U60m-k7UnOEkCnZU0SkxUnQBzkqHEVDLOjKUmPE5EuPGTU5anRUv4l7WNvFb4xak6klHHHkmNKakusn7U34ArUnYl7WDamvAdImA4zUn-48IDXEM6mbUhcnBUqck5EzcwE4jIzPUw6mvU2yklSH6l9UlgmuU+rHuU1QDO6LymtY4cmqADxBwAIamCpC6mIEkcnw0xylbU3SkryGcko0kak5UtqxEUrsn5Uj4lFUyikgA6IC3-e4lGE4rFVU90lvEn8lfEp6gd4m7GNUninI0+mkE4hsmI0kHEs0vamVk0UBA07anzUvamP-cAAR4o6mzUguS0030kHKRsI2pHSlgkj6kTASgIAGLoBUknmkDADmke4ykkC41Wnzkkkmgk0ikryVmma0mgDa09Wk5E7gi-Ytsl8kjsm60iUk8Uw2nK0rWktKceT3kzUnoki2km00WnK4-qnjoY2n4yPYDzE9mme03GmsU2qlfEvHEaxRmlQ0kMlE432lVktGly0jGmUFakmU4zUAB4sankU38nskkUmR0t4lCkjkmQ4j2kLkx8nCkzkk047GlZEpqx5UmslaEomm6Ekqlq4ygLIMVUQVUymmmE6qkh08alfEoegG0aICvAWWn60zrGS4mQmN03ukXUhQkdWUkl+AM6zL46empY8in0AcoA9YwLGKNdQAMAAYa8ARek0AZelLAQ+iQA-Wk107emr0gYYQAY+hS4hoZNACqktDN1J-AKIDALBWntkV4l3U3VJ5Uu6l3UvABAAA");
crossex_html.replace("itgversion","1.20221231");
var ccPanel,ccPanelProxy;
ccPanelProxy={};
ccPanel={};
var Index = function Index(items, name) {
	var index = -1;
	for (var i = 0; i < items.length; ++i) {
		if (items[i].name == name) {
			index = i;
			break;
		}
	}
	return index;
};

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var json2csv = function json2csv(filename,json) {
    var fields = [];
	var filtered = ["Y_Value", "Col_Value", "X_Value", "Row_Value", "Count","None","O_Value","Color_Value","Cstr","Xstr","Ystr","Size_Value"];
    for (var j=0;j<json.length;j++) {
        Object.keys(json[j]).forEach(function(key){
            if(fields.indexOf(key) == -1 && !(filtered.includes(key))) 
            {
                fields.push(key);
            }
        });
    }	
    var replacer = function(key, value) { return value === null ? '' : value } 
    var csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
	var csvData = new Blob([csv], { type: 'text/csv' }); 
	var a = document.createElement('a')
	var csvUrl = URL.createObjectURL(csvData);
	a.href =  csvUrl;    
    a.download = filename;
    document.body.appendChild(a);
    a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);	
}

function getContentWidth (elementNode) {
	var styles = window.getComputedStyle(elementNode, null);
	var w=elementNode.clientWidth
	- parseFloat(styles.paddingLeft)
	- parseFloat(styles.paddingRight);
	w=w-28;
	if (w<0) {w=0;}
	return w
}
function setWidth_smart(element,widthNode) {
	if (!widthNode) {
		widthNode=document.getElementById(element);
	}
	var buf=document.getElementById("cc_tabscontent" + element).offsetWidth+document.getElementById("defaultOpen"+element).offsetWidth;
	width=getContentWidth(widthNode)-buf;	
	if (width<40){width=40;}
	return width;
}

function ccOpenCity(evt, cityName,element) {
	var max_width=0;
	var cc_tabcontent=new Array(6);
	var tablinks=new Array(6);
	tablinks[0]=document.getElementById('defaultOpen'+element);
	tablinks[1]=document.getElementById('Charts_tablinks'+element);
	tablinks[2]=document.getElementById('Axis_tablinks'+element);
	tablinks[3]=document.getElementById('Marks_tablinks'+element);
	tablinks[4]=document.getElementById('Fonts_tablinks'+element);
	tablinks[5]=document.getElementById('Filtering_tablinks'+element);
	tablinks[6]=document.getElementById('Coloring_tablinks'+element);
	tablinks[7]=document.getElementById('Margins_tablinks'+element);	
	cc_tabcontent[0]=document.getElementById('None'+element);
	cc_tabcontent[1]=document.getElementById('Charts'+element);
	cc_tabcontent[2]=document.getElementById('Axis'+element);
	cc_tabcontent[3]=document.getElementById('Marks'+element);
	cc_tabcontent[4]=document.getElementById('Fonts'+element);
	cc_tabcontent[5]=document.getElementById('Filtering'+element);
	cc_tabcontent[6]=document.getElementById('Coloring'+element);
	cc_tabcontent[7]=document.getElementById('Margins'+element);
	for (var i = 0; i < cc_tabcontent.length; i++) {
		cc_tabcontent[i].style.display = "none";
	}
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	ccPanelProxy[element][element]=document.getElementById(cityName).offsetWidth;
	//if(cityName=='None'+element) {
	//	document.getElementById("cc_tab" + element).style.opacity="0.5"
	//} else {
	//	document.getElementById("cc_tab" + element).style.opacity="1"
	//}
	evt.currentTarget.className += " active";
}

function initAndListen(listener, id, result) {
	if (result.view.signal(listener) == true) {
		document.getElementById(id).style.display = "block";
	} else {
		document.getElementById(id).style.display = "none";
	}
	result.view.addSignalListener(listener, function(name, value) {
		if (value) {
			document.getElementById(id).style.display = "block";
		} else {
			document.getElementById(id).style.display = "none";
		}
	});
}
var getKeys = function (arr) {
	var key, keys = [];
	for (i = 0; i < arr.length; i++) {
		for (key in arr[i]) {
			if (arr[i].hasOwnProperty(key)) {
				keys[key]=1;
			}
		}
	}
	return Object.keys(keys);
};

var corrmatrix =  function (df,cols) {
	if (!cols) {
		cols=Object.keys(df[0])
	}
	var colTypes={};
	var corr=[];
	cols.forEach(function(col) {  
		var isNum=true;
		df.forEach(function(row) {
			if (!isNumeric(row[col]) && row[col] != null && row[col] != "NA") {
				isNum=false;
			}
		});
		if (isNum) {
			colTypes[col]="num";
		} else {
			colTypes[col]="cat";
		}
	});
	var ca=0;
	cols.forEach(function(col1) {  
		if (!corr[col1]) {
			corr[col1]={};
		}
		cols.forEach(function(col2) { 
			var pair=[];
			for(i=0;i<df.length;++i) {
				var v1=df[i][col1];
				var v2=df[i][col2];
				if(colTypes[col1]=="num") {
					v1=Number(v1);
				}
				if(colTypes[col2]=="num") {
					v2=Number(v2);
				}				
				if((df[i][col1]!='NA' && df[i][col1]!='')  && (df[i][col2]!='NA' && df[i][col2]!='')) {
					pair.push({col1:v1,col2:v2})
				}
			}
			if(colTypes[col1]=="cat" && colTypes[col2]=="num") {
			corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			} else if (colTypes[col2]=="cat" && colTypes[col1]=="num") {
			corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			} else {
				corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			}
			++ca;
		});		
	});
	return corr;
};

var icc=function icc(df,col1,col2) {
	var distinct = [...new Set(df.map(x => x[col1]))]; 
	var catCount=distinct.length;
	var c=0;
	var varianceSum=0;
	var icc=0;
	if(catCount<20 && catCount>1) {		
		while (catCount--) {
			var len = df.length;
			var td=[];
			while (len--) {
				if(df[len][col1]==distinct[catCount]) {
					td.push({'c':df[len][col2]});
				}
			}
			varianceSum=varianceSum+stats.variance(td,'c');
			c++;
		}
		var varComp=varianceSum/c;
		var avar=stats.variance(df,col2);
		var icc=varComp/avar;	
		icc=Math.min(1,Math.max(1-icc,0));
	}
	return icc;
}

var crossex = function crossex(element, data, options,widthid) {
	//legacy
	var ElementWidth=0;
	data=JSON.parse(JSON.stringify(data).replace(/\"null\"/gi,"\"\"").replace(/\"NA\"/gi,"\"\"").replace(/\"unknown\"/gi,"\"\""));
	var cur_name=element;
	var widthNode=document.getElementById(cur_name);	
	ElementWidth=0;
	var d=0;
	while (ElementWidth==0 && d <8) {
		d=d+1;
		widthNode=widthNode.parentElement;
		ElementWidth=getContentWidth(widthNode);
	}
	if(widthid) {
		widthNode=document.getElementById(widthid);	
		ElementWidth=getContentWidth(widthNode);
	}
	var loc_crossex_html =  crossex_html;
	var local_vgspec = JSON.stringify(crossex_spec);
	var element_node = document.getElementById(element);
	var mymax = 150;
	var loc_crossex_htmlRes = loc_crossex_html.replace(/\-ccnm/g, element);
	element_node.innerHTML = loc_crossex_htmlRes;
	ccPanel={};
	ccPanelProxy[element]={};
	var res = local_vgspec.replace(/\-ccnm/g, element);
	var spec = JSON.parse(res);
	var hide_panel=false;
	var editable=false;
	var exportable=true;
	var new_signalsString = JSON.stringify(options);
	var col_names=[];
	var sum_cols=[];
	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		for (i=0;i<repSignalsJson.length;++i) {
			if (typeof repSignalsJson[i]['hide_panel'] !== 'undefined') {
				hide_panel=true;
				document.querySelector('#cc_panel'+element).style.display = "none";	
				document.querySelector('#cc_tab'+element).style.display = "none";
				document.querySelector('#cc_tabscontent'+element).style.display = "none";
				continue; 
			}
			if (typeof repSignalsJson[i]['Links_Editable'] !== 'undefined') {					
				document.getElementById('#Links_Options' + element).style.display = "block";
				continue; 
			}			
			if (typeof repSignalsJson[i]['editable'] !== 'undefined') {
				if (repSignalsJson[i]['editable']==1) {
					editable=true;
				} else {
					editable=false;
				}
				continue; 
			}
			if (typeof repSignalsJson[i]['exportable'] !== 'undefined') {
				if (repSignalsJson[i]['exportable']==1) {
					exportable=true;
				} else {
					exportable=false;
				}
				continue; 
			}
			var index = Index(spec.signals, repSignalsJson[i].name);			
			
			let na_values = ["na", "NA", "null","NULL","Null","unknown","Unknown","N/A","n/a","#N/A"];
			if (index>=0){
				spec.signals[index].value = repSignalsJson[i].value;
				if (repSignalsJson[i].bind != null) {
					if (repSignalsJson[i].bind.element != null) {
						spec.signals[index].bind.element = repSignalsJson[i].bind.element;
					}
					if (repSignalsJson[i].bind.options != null) {
						var headers = repSignalsJson[i].bind.options;
						var finalheaders = [];				
						headers.forEach(function(element) {
							var distinct = [...new Set(data.map(x => x[element]))];
							var ln = distinct.length;
							var isNum=true;
							for (k=0;k<data.length;++k) {
								var v=data[k][element];
								if (na_values.includes(v)) {
									delete data[k][element];
								} 
								if (data[k][element]!=null && data[k][element]!="") {
									if (!isNumeric(data[k][element])) {
										isNum=false;
									}
								}						
							}								
							if (isNum) {
								sum_cols.push({"feature":element,"type":"num"})
							} else {
								sum_cols.push({"feature":element,"type":"cat"})
							}
							col_names.push(element);
							if (ln > 0) {							
								if (repSignalsJson[i].name == "Facet_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_Out_From" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_By_Value" && isNum) {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "Facet_Rows_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Facet_Cols_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_Additional" && ln < mymax) {
									finalheaders.push(element);						
								} else if (repSignalsJson[i].name == "Sum_By" && isNum) {
									finalheaders.push(element);								
								} else if (repSignalsJson[i].name == "Size_By" ) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "X_Axis") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Search_By") {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "SortX_By") {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "Y_Axis") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Stroke_By") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Color_By") {
									finalheaders.push(element);
								}
							}
						});
						if (!finalheaders.includes.None) {
							finalheaders.push("None");
						}
						if (!finalheaders.includes.Sum && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Sum");
						}
						if (!finalheaders.includes.Count && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Count");
						}						
						
						spec.signals[index].bind.options = JSON.parse(JSON.stringify(finalheaders));
					}
				}
				if (repSignalsJson[i].value != null) {
					spec.signals[index].value = repSignalsJson[i].value;
				}
			} else {
				var dataIndex = Index(spec.data, repSignalsJson[i].name);
				if (dataIndex>=0){
					if ('values' in repSignalsJson[i]) {spec.data[dataIndex]['values'] = JSON.stringify(repSignalsJson[i].values);}
					spec.data[dataIndex]['transform']=JSON.parse("[]");
				}
			}
		}
	}
	spec.data[Index(spec.data, "mycolumns")].values = JSON.parse(JSON.stringify(sum_cols));
	if (data != null) {
		spec.data[Index(spec.data, "mydata")].values = JSON.parse(JSON.stringify(data));
	}
	spec.data[Index(spec.data, "col_names")].values = col_names;
	//spec.data[Index(spec.data, "covariance")].values=corrmatrix(spec.data[Index(spec.data, "mydata")].values,col_names);
	if (add_css) {
		var css = itgz.decompressFromEncodedURIComponent("PQKgBAsghglgdmQyATJat6Oa2sJgCgA6AY2LAG98BIAWygCcBzeALjAAYwoBXAFwHsA3NQAO-AM4xeMfnDb0ApgBso0gG4LhVDfWnEoSgLQGYjOWAEitIqABNb8Rm3YiAHhzcf3L11oDuMLa8ABYsAIzs7ACkWsEKpsG8LDTwhsSyvApwvFoAZhmGkgBeCmxhCjRaSvAKhnEJSeyEAJwVWg7iIioAnmwARkr8xADWglTU6YP0bADEYcRhuQBMUMIAvkSkAPqM9FAiwRTUfVAju-zccLZsvHtwnQxZOdR0TKwcXHxCLwzMcIYDIbDQq8BhJLxaV5-AGDEaGLLXCE-N7-eDVOC1cSg3TONzCMAEsB9fj0WwKeiGSyGegNal2GDccRsAAsePwhKJJLJFOJvAENGptL2DkZLLZHKhqTRNXhV1xvnZhMl-0s8vxSt+qV5-LV4yoASCoTorjSGSesXijESyVS6Wy5uoHS6UF6YFySgUvnGGxIxB2ewOWztoJq9CO+sCITKkRiioJ9St4Ii0S0JzO9AucrAfmCUk0ojsDjgTiW4sJxNJ5IB-D5-AFNMTdJFTLArIVHIr3Mp-BEgsbwoZLbb6oJnar2rrbFL7nE-GqtjAMwAHCuR5zKxTVRxCABWTyz+eLgCCJ7XY4pDetYGnYAPgUXK6X63w+BEvvhNAORw5+WyhRgJRsCa4h0EoShruitQJleYSEEsiiVNQBpRs0w5xm6BS5FAKRKK6ABq5K2FAcBQAANGAR40gY5HiMR4iFOSMC5Guv68IYfiWlexJKLYa6TCSszzIsKxnqcwznJctimlMsykHJxAQQofJVg8xCOM4a6ZK4bEmGYbDEE85JrsqMJAiCYJsAAbGWBImYCcIIs4bToSZ0oYuZOJIhKmqonAkGyoiPjPr6QYZLAGJhpQVBiJI0iyPIyiqDAGjtDAnQ9PpZrZOIYAAIQwJ+JKgtkWg6HoBjGNUekWD2qb8MBAHqeuXbEgqVBOhlwZPOI-iRqEYDJrGPrbMG4XkiwUC5JkkUTFl4IAOTzal6Uupl9rZVoxAegw-Q1sEwWvMMOVRchoSDRaDQTV8wXbKCfTfuWYkSVc0kCYu8mkGeXJVh6U3OLu+5zveMwnkeX0btWtY0P9e4zkDC4g6e6Hnt2Igw4Dh6I2D6GnWUS42WA0HgvAcQ0s8VA9qcUi9GE4NdlSv1sQOoqtgTKMTgKjNNoOYrthqKIaehRSGPAZKuGUN1+ndLDBPwOjhpTam8DTwj4MNUtQH04hddkD0ErjYApP8OvPB2T0ZpJswKNbNt01WW5NLDt7w8eSNUCjjPo3DmOg3bPI1vyhhc8zQ5su733+1DU4Y8DvtCyLVyelOz59HwAhwCFd3okdAB8BWMOGBthGh0WFo4fZXiXtx0VIMjmE07A7j11CK9TLBNAA7Du6zjKntYZ7dmvZ0yss6HnNAFydfVTkF1DV-ctfxdujfNxTNhKyrasvpnmtEmnsh62AHWrUSsKjMj5uZlJ-HTBYdwPIoJXIxHkOB8H9Is2hHYvwzChTdzn82YRzYHAWQ+YOREzYAAZlnhyC4vBIIgLAXxbg9BZy3zEPAaaeQCjFFKGAYCoFwI42nteWBhJ56xTrv9Fea4bD2CarPWgPl5QDU8GEdhbINh93ToQU46gFA7wGPAXO+dD4mU9qzNqRdYZaFbsrcIksth3T3v3GWctyQK3Xm3WmF90xX1erfGYtst5CNUbw-hyUFCHzTOJC2L0b5W2tmuIuMY6Fl2LGqZ+ENJGOxjgjZogSvrAWCHYfgfg2CGD8e4DhMTPA+EXIE5oa5haiyTteZ8mwNZ9BNofd0-BVBsEZu4hhnjrxs0vpJQxTjwH8z+KwhJjSCapMTuLMA3d0KgGalWS84IZgABFBnO0PLEwQuACAcgNkbU061eB5QKmIXQxFTaEgNiuAmXSPZ-yTP4xcUB9ljLwKY7YNgMRKHDPQosjAK7giYVM20c1jI+SDtsyJMCCaXPLr0rxHIWlixYFAp5AsvJ1KlH5GUjkQW2WeW5TE2JbkE0gWAEmjEVkEmPq6WFpkRhrjKjAfQRhdLmEsJkrphhyUUspVS6lNLaV0vpQywwipiAZnEOIT00gRCKggPwbkcByJVUSBxBoYBiBssMLIXCNU5ycvEIqAAUoyOZYRhj3SNkxGACgFzEQXIwIoMARAiC1YqAAAjwEIJIwAAHFZbiGCKa9ewwoCMGsSyiQ7LtIGvwIyn1vq-X+sVLBMAAAhKA7KwAAGVlYejlQSJYhAwD9JgIoYgcUEA8ocLkTVaDFRQITQABQkIvdNvKNXkjlf6ytVbK1HJfGS6tDbaWKgANphAALohrDdYqN3QY3esbQOqltbm0MBgFAIOmtlBtubRmD0AA-AAvAAIgEDKg1S6O1RRisWhKKgBHqg2ASFto7x0qD6FOmdc4FCLpXfwNdIgN0sBYOe-IihSLHqohO89Shp2zuvcu1dShOWPomlNTRUVKGvuhnfOie6FBQNsAACnYORFDHAACUWh2IKD6MMKQAIxJYQMoYNQaUYB9BgNUBRhNAhkjgKmQjpxaikckBRqjrpcz2CyL1MCaRQnFnwZBkkiE15U2o+waw-AsFVgUBobKSCMRaEoTurgYEwBqAYIh8lbq2UcoNZSe+xbDC2FQUlWQ5FCBhCXOIdD6nNPadZR6zlBma5pvhGGxw5EFBdoThKvgtmNP0C02kRzenezKbc2SHoqGbOSaoUvTWB4+D5nDg1fVZT2b1S0H89JEQlP3ygxKhs7wSWKkPWAD9Y6v0Xr-TewDwG21PpfSSaxUVbHPSkng6M0RPgCHmYVJZT8qAmzYEupdB7FSVdPZOn9l750AbvUB9djXQPTXDO1+xiImAnEQ2EDu5E9sHf22AFomHjgvxDrzTac43ozFyPdh713ZlsFULcRDJ7qtKDO1QVi-5AJ2aCw591YXDC-bwQduCCFvu-eFYmNggXgs6ac-pmHnFeDkVAfQUC32tJsSE1j+H9mQvA89eFjlLn7hQYx2A77nyym7gqANZy+pcyZEKOvfBoC-ABjqmlpqJtqx83K1Nz7v6r11cWw19ROgmt-xa++gkI7P1npq+Lhb97H2j3Gqt8DLdtHUd0dFKT9oKSye6i966ZXJtHpt2Aetg7B3UGbUsDthb4slszdm2NYAHe+6Obbub-7b0a+nURUExPdOk8MNutNAAfBbD6VvNcUOtypWZUFKEQ0usPUAWAFWdQoYA4g1CMAANSuBoOBYgoS0FKQXXwXIhglykSiFAgAwsXxgUQljsAr0oe4rf+nd6WIkXgIhW9HmAMAPwM-CB+DzSSRgwAe+RCLyX4f3f2CnUH8PqB1lXAb570THfSwlhhGnBvqBABRVvbebAhE31msCJ-4KMBON3pch3N9f57z-yILRu9mhD92B8caAX8MxQRMgP9oglggDT9N9bAX8IB41LIdxm8G4Ywe829DAwg81LIwgdxSIMCYDG4mhmgoF0DCBIgSCoFmRCBLJLIlgiCqDMD2A28lglx6DGDmDqDN8lg812AoFCDz8WClhv9OCGCUMRDIgxCsDi44IlxhD40ZDN9OCdxUIeDWCUC0DNCSCAAtYfYAVvG-dvNfLva-JdWzUBakBQI1VQC6OHMAffXqQ0PGMOOyAOScdpMsYXRXWrdXJbRPZtHPCPZHXsGPOuePW9RPJ9SaNbKKDwqOAaUZK3APfw4PQIjdYI1QcdJHEHCI2QKIywEDZPVrOeArYTG4e+ODBDLTHcaIVDVDb7DmbrWMKgSReo2MAkXwsAQPCXEPbI8PPIqPAouAIonsTXDRaYZ9OXFPCDCognGDe4GopDQwTo8iNYtwJoibNItXDIhrQY3I0LEYotOPBPEDOI3XKgUAqo2DVQeDVY9YjgbY87JI86agDolMVIirPwvY+rZbQ40I-I04uuc4xrLXaYy4maa4hY6DShFYuohon3WGF47o63O3cAX3R3KgZ3SzDtAAFR7DAAABltlFQsTB1-dej0j-igiQjhjnNRiE8XkpoLiwNoSbiljxAESCViAtNBowBS8Bp990NGiMM6o3i3FviW0aTJcAT6TjjGSQTZBmTGZJiZcdcOTYTbjlj7jajeT+SYxBThS3BRTkStjxTpTbd7cKSq0nd40XcwBCSRAwAAAlBock20htKkvogIg4hUknJU93Zk3pNk+I8ouiKDHU7kvUpDA0nrIUnAkUsU9gZozw6Dd4tE3Y+bfY+UnIoEk44M6Im5dU7XKE8MTk+E2MxDeMqIY0pM00jYlEy0rMn4tsm0r0v1e0wgKBDtYNdMz0zsmtCZakv4uUuk-Mhk-TUYqIjmEo2Yso92NPREDPLPHPPPOgF1Mw8vSvQQavBgdlXgevXgRvZvW-TvTfPvAfKBIfU-UfcfKBSfafWfefQgRfZfagsw4A7fG83fffYA4-X80-c-NwS-Ewu-VQYIR-SjJQcAt-KAD-P-JC-bTfMgwA4A0A8Amse4xCpcEgqzTfSydC+AnvRAoCpYZA+gnQ4gzfbA3A+ggg3QzfeoloCgpinvWgrgpgmirAjgri9i9gfgqgoQ0iaQwS8QrgqQ5Q8SuQugjgpQ0Q1Q3cDQniwSqiyg3gnvAw0-Iw6-W-L8iwqw-gGwuw8mJFZwpCUhKzdw55LcWRZEaEFojgHYts303MicoYxU6c5UsY5dOclbcshI2ynsMoFI1smUscgYgMyPIM4tWc9M+c19Rcys6o6stYpEnAnwF48OJI81b4do15dpL464kKgaKU8K34nM2krI6KsI6PHy+KqGUs6Y0ois7UrkhE9KqIFMs7Cq0cqq8cmqycry8IhqvyhKgK9ktqyMyojqtKp4zKi01MpTUq94gqv6IqrosAHoty6q0PYawM7yos-y6XMsqa+YmaxYqszIWorqnqly9Ejsocxlbs5kPs9MkkskgkZ64ciKgaqKg6mKo64tcaqGFk3gMMq4lKu4m6uMgwPkzKhMk01wM0xa1wbKrcTM7a9E3awa-azyw60a469M8G5q2I86iMynWa66h4ms+Gw0pGsIZM54ls7G23RUJ6n6ulbsncd6qGN0j076rm31H02UgGgmoGomkGpdDmEsya8MmEy6uE1K2GumpQPkpGhslGjYiIJanHVa8qtm1ysWzI-Go4wm+q4msG0M8EqY8mhW6G3U1W2s+spmxslm5aq09szE4Wl6nElAjtUkqaQc32+lUWyK02wEqcqWtNZdNUpPBchXfqoPPaqOkay26W+O+2q4pyvKqoQqvO6gb5Mq4q-yJFcoETOy4qx2mM1W3W9G5EpEz2vq3G8W82yWjO2OpdLOmYpK1PfRS2MAVc7PHIjcgvbcvvPcmvQ84808lvdvC8nvK88QF-e8ifKfGfPwOfBfJgD81fRe2QrfPqF-ECg-Ei9gQC28-g-8+AvS9ve-KCnvJ-WC8i7bBCjg5ClvX-FClfAA2AjC2ErCyAhQD-QwZofCpccQ4iw+siq+yi1AjS1guivAxi1Sli8gxBmgughg7ilgkg9giQ7g1SoSwQhSlQ3-QhqSxS2ShQshmS9gNQlSvBvg9SgS7SpYXS8Cgyq-SwsAawxQUyhwmCfGaRUhCy9omUSBCuyEZ5Yu+y5hFEV+LwiTL21uyO2q4EosnuwKhy1IYusIMKo2v6lOvGtOi2pk7u7ZMm3u+XYx-o9RwGuqixrOiE7OrUpW6MhEtDO61mnojmn20O7m-2wgDuDtd0xMEOwJmlcO-6hxiWpxny5dG22XJKpOtR-0xxzR6W5JzU9bdMi3AQfOjataqutomuzq+upspu3qoxyqkxtugs2KrunJ1qtrZctgYe9c-PLczvHcqvaeuvBvJveejvdfJeyva8q+tex8jel8nepfFfdgL88+n8q+0+gCtHF-PfUC2+8Ch+6C5-V++CxCn+9gT+1Cv+uAw+zC1+7CqAjg8Bwip5-+8+2B4feB6i5hrAnAlBwgtBsgti1SzinBgSgh-i4hgQkSsSw+qzSS0S6Sw+tveQ+S+F6hhh5S5kAS7QzBzfdhzh-Si8wyvh4ygR7zMytHNw0R1wpwmyxRpylRhR6EDonwnGk2jJ+JrJ5phoSG6EiRQqgxll7M+puJ9uhJos5J1xmxt9Oxv0vMjlws7J7l22jUnRxWqmq6lW2mvCi0nx5u2pjEn3KJptHE3syNACBQSJo1ylGJ4V9l0VkHPBZdECAwJQHlwuVnTEDnNgeAWuAwFwqMMAbVoXVliOu1xp-TR1pdGgLVBkGgN1k6D19nJjb1uAX14hCMalgg8hHatluV+1qPSNlQJgBQeNpCRN1SfBH16QP1yy6lpYSybNl8AkFgDMGscMIHDuiLOuYzUzNNGGVeDtuqrt2QdzSQMpbzdlXzeBLDcN3sMHc1soZnQdkHVHS6TkHiEcDYfALpYYpAbAfdg9w9lAcZIgDQRgcdCoc9BcNpgerMShGwR+Z4DYBwNQQgM98dCjK4cMZUMoTwfKAbYqcmOnJwLwNhdwf9xZQD-1-qAUiDoqZZKoSRiliu-rSDhDx0NKZ0TFcFdyd0T0VD+DobXHSqUwcwRmAjwbcmed-7QhF1ijqDreF9t9hQc9gEUWW8ZQBQVNPJXBBdghQoIhej9Dn0d9tjl6AcfgZFOAEQPgcMaj0oWjtTODyjzJGYEvbse9eED0aN3WKKFjcjSjNuGjLjejAsUpEDzuRnZThjiR9yJFMgqzhZQjoDnytgLNVwLVITobHLNpZMBl37LCHCV0Wie4BiGkZiageToCRT85az9D8OCGS7MAKBMOVqQoUJWwcJaOdwG8NsMAN+5DFM1DSzZo5c6pfL+CxDJYHcQg68Gr8iar2rsgncNMjcX972YGWwYgLrrr67GSU+MSZ8GYUNW92wLYNvG7NBV4MfQYXgLYe8HOI+ZKMARblXc5Rb+AGT3gZtZWI1BdXHTdWtqMBtrhfAJj0Tz9hcFbsANbwuaed4rd87ljj99j1bmba7zbvgHb7oPbldDlDdQ+A2etv9pzlT9CKL-j51pT0HmzsuilgaKg5yCBeHgVtqYD1hQxgkfJQpfLhoIFepUD2JUDoKb0fANT65WkrTioJ4CwIeaxW4Cwa9luHQfJCJYzujLz8mYjqY1ntgZQaoEQSQHKOLobYD1GL2Tn6wDxa5elgGcDmH4Tl8J71jy76727jb6Tr73bhQJJ4iF1AHqKezkHgD+L7DXDfDfYOwu4AyBTaxEX8mH94nyXo7-qE7+Xk3p+Z95KZjlX17m797xb5Xl7r9t779D7zX7b7XhdO4F1RrfIYgRkBWPgRBYljEZ3jYT7yPn7nXmPhQFbM3vDNibkwIHpS4EiAYWoauEYO76lt353qgJFPL+3zaVBdBNgTBE3evtLu1MJNnon-vzwGYeomrncNvLv9pxcYfxQsf5v87RLj+FsffLv4BUDu8BGag6g9P-ATP77vb3P-Pjic3ov+ce2YIbgGge6NreqdL3vhpeJQfjfyIZftr1fl2GYR-zgWfhvlHhJL-g2Jfr-ijCS5OxABE-IfrAX6RX4wg9fBPmgjegd81sX-Avhb0NTeZrenOMBPXxMhbhDAKXd3mh095ndveF3P3uryk5bdd+OfPXnnxYDx9RQLAZAcfxL4Xgy+dPFzNXxvZ2Ir4swKfqPy35B8xOC4UPsoHD4UCo++-J9IYBoD8BhYufdgcMBr4Bs6+X-RvsbwIHkxYBbfMAAgM0SgDRuPAxuNP2f5dgkuAAhXkNnPCsI1+i4D-vwOIHPdBBavAPuQK17Z9o+1A-PtINkHUDKQZ-C-nkxCS39ie9-dwO-0f7GDxor-TGLYJUE-81BznaDlZHiFg8EuJghfmwBAHmDyYG2bgZPwgFQCYBrfeAcbkQFZDnwAg1XsIPW4uCs+e-DwZIJoD0Qq+CgqeLX1-5lDqAqg-AQkImBFCMEJQ3QR0KXL6CuSD7GnoAJfiOJRhjwXWF-ymH3sZhcyWfl71fYkCrgOcNbjnAeAIBKAP4XjjRxi7O89hf4QLpRmC50QwuTEI4YSDxQEoSO1USwNcIJCjFd0SUDQE8MNgsJgh3gEIR8KmFD8audg1YQ4Mu4bCZsWw05CwGyDBA+MlGJDFAlsxRQIehw2fscLYinDcIbAELvRHZThd6+twiqEShuBEkv+Lw-LolH3S6NzABBX4QkhvBzDJuswBth3FsBLh7oywogcCN94h9-eYfDXmILcESCGBjQ0HDBSDjhIc6YA3gTPyGGWCohwMGIbKIuzpCBo9IpUYEMy599OEcSUIcPxq4yiPeT7TkT72D5CDeRIg-ka4LqECZPB9EZ+oYG4CoDoSOQwekP0MF8CJhL-BJNYLCEb8IhF4FUafWX4aisuYHMMUTzdEj8DR6g8ofYO5FmiyBO-cQfUOFFNC-Bl-KkeLzDETCQxbPJpD8NCGKjDRdUL0bsl9Gb9Yha7euvX3-7JCbOQAlUZkOLHHApR+Q6AXML6Ht8BhYYDkRUNIHOCkxgo+oXQKZCpjRRvGQYBxGdFSj3R0YnoSsJNGOCqhogq0VQJtG0Chg9AqQXaLFGOijU04kYZGKMEcjjRawhMQOIj6UDl0N8A3p0Ph55V-R7EUhO0ObEicQRosRwMdAw4rRsO-keyAoI5GLjLuhgEiNGwrLk4iRN3bZPX1XaOFMcoEevrNH64Aidw9fdHqBy-4YoU2f4s+Fv1PHviv27KD0NxyiiMDjAqAhgMRBt6Gwsg3AaoFiHr5SCZB5Eq3lRPwQ6c6JaUJYUMKJQixMgjQ-SIZB7FDCyJugIwBHCaiDBmABKevsR0gkGRO+egrgVUimEDAxI9feRK6CaBLgYBjIxcPYAXBf9HeL4mMZF32H4IURQw--iZJ6HtRMOGUU+ECDQmudyRe6KxLJPvhjC-wFbJBNzn2CyTycPPScXzzAgGohej4ouHWPi5rImxpk1ISpGjT4JrBnorsFMO2y7YNCA0TKWEFQi2Yv+QU0MZxg56ASzx3MSTpnzk7mSgIAnOjr2LjGminBfImoVeKXTV4uOqqeqLeOGHKSHEekqtmOli5DDy6NklIZoLehkgsIdE7ic2KoCW80BbE-SHEBGCtQYJgwHHr0mDF-YmomWboSkMd5E9SR0vFNmm39HHTq2g018du3AD4k6eOUPdkewemPTj2taLpPmmShtsnpn0h6Se0IAiA1AvAAAKowBaeFfPJhDEmAqBBe+CCGfsHZRaAKYLPYKez24zUBrigUxGaGP55hS0oqsLdr9P+lAyKAFWDNgGwe5EA-pgM4GVnGsSLcQg3mM0Qz1pmHAr+fODLC-FahS9zO-0KBAhCUwQSqo5gBSdghchfCVGPoCmQRF0DEkuJRMmRDEGxr4zeAR4VwGlAm7ZAxo9ACzBLIMBfiOQ6E2RNMiB7kJbIqQJFD3lO6KzXSCIckOWkPiMgVInHVNLb2CgUzCZ1M67rwGJC2BugHs+gLTKZ5oztI9wwWUJK36Kz+kGYEQJqJ2HoQsJUnHCUCDoQuTFAbklKCLOBR4CXZ-0iOT2Gjlt5UEj7Q+HJIFlFJtkqsDkHHKxT-ik57uV4ZSO-isyQOO0rObwBzlRzwkcAPCAYG4BlEOQxc0jqXKmgty250cgAJJ2g8ka08EL0hbkAAJEkABGlkMTqgh8SuTh1qDVzTEFM5WarLCihgbuwM3YYSHolF9EplIbPs7PQhjTb40gtOeLP+k7zxAaskMBFAPm3hTkiso8HyBmgcgyJxHPBMYFsAAArJVK0RcTlsvWxLPyVYHQj2yKQRErjuCFASKZ0IZEuBQxGIlILkEqCrwQ6NxEYLEFl83+cMESCV48FDszBUQsJDbjyF8Cx2VgpQV4zXZh80VHpJmBQIOFYyLdvgGpmKybpoMo+VjyqmBsRAaKCwPzIHlQSh53iVKXOEhnspMoYEWGfmA2C8KKZ-Cj0BYDiB2A74Wi8iGov+kaL6eXsn2QzxCA2Iyu-whQJZCvy2Kr8fsdrsMmBht5+kLilxSxGEX4wxF+s07jwrp58K6eJ2CmRNyUDEl3u5AfudVCFlGRVF-i9RYEr4XYVQl4SyJeYBnlbsDFvAIxRYBMW6LeATPDkP8JvLFL+kJSK5BkIqSjdyuMwAAGJ1KHFYYn0W4tcWlL0IBIwlCXJqgwK+5Ei6qDPK3jkzDFSSrWf9KtR3BbAhJUEOcnIAYQ-wsOLiHOF4jY1BlvALuUoGOjiKg58koSWMhzB5gk21ErnDznvm8BXS4SAAPIbgRlvAEJZcu5CHxr5LAHQfQBcRWV7K3kRRsyz5jop7JJ8KuWfC4UrKjwjAXYM9wECRRPhdLfJt4XcCCAmFD8lWU-L3kRRrlay3WeWBX5E9rBuwF0KJEPF2KylTUd5UqFSBGyCY0yM2bPFgX4KEFTs1PrUm+qH9C+tCghXSuQUMqfcuC9BbSoYUcrDAJC3gGQu5X0KqF31EUcKsoX0qW5j85+RrLfmCLtBR0kRe4AsocgT5IIXtJXwvlSqr5nY2+SoqBWIrZV+86oIrPzQqADIssHiLrl-lMr8MDY5sBUu+WKquZyXdhMSrFXMSHVPMGFX7AAQtgPV3SW+ETyIh2pPOMwfZKsAGWfyjVyKzRCvO2Gfzv5h8P+eTgAV2AQFWIMBXoh6mIhalUCGpQWsBQyLIhWKt-pAIrX2L0I6Em8IGr2Vs4fJRy-YGuDIneqWYgapicLDbUBqgE8-R1b6ujXqKqIxYTRQqseXPK+Iek0Fd0EySKz55NIIoEvLmQryZla8yCICsVmSzeAS6ome0uDnEirAyyxWTUsozTQtUX824ORmSxEywciU71lMvxRHqKZJ6oDOSH7KuAFVPnbrK8upYwJjZQaxxdir2Azqc1HWapY9mrUuTEsc4ZLJpF6UhyTcs659aerfX1RCYzIGZftNkQKzkNr6+gO+u0FEz9pCSPOjhv+kvrpoBG27jMtglXh4JfrMjbwAo2ob3Ag4vbvNDanLT6o80TdJCuhD6MgofG1IJInrobrcNlGtDWxp17zRccPG2WaQn4KCaTlzG-DWhpICZg5kMyqYTipnWzK2I8yrBVjgY18sNqmc+FTcqWnDBjVEUBVaksHliKIexcAmPWs9bJsoFPOdCAVL8CGBgubqMCD+tJmG1oUJoM2fUV7X0xVquyQVLwGnV+qnKZaw8NFti2Dr-pbeSzdZs0QiBMNXw7DeZqtmJxFA9ASiN5iJlxz2VcKl8EAA"),
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		add_css=false;
	}
	let myview;
	drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable);
};
function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable) {
	if (myview) {
		myview.finalize();
	 }

	if (spec.signals[Index(spec.signals, 'Interactive_')]['value']==true) {
		spec.signals[Index(spec.signals, 'xcur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}];
		spec.signals[Index(spec.signals, 'ycur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}];
		spec.signals[Index(spec.signals, 'delta')]['on']=[{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update":  "down ? [x()-down[0], y()-down[1]] : [0,0]"}];
		spec.signals[Index(spec.signals, 'anchor')]['on']=[{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}];
		spec.signals[Index(spec.signals, 'zoom')]['on']=[{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}];
		spec.signals[Index(spec.signals, 'dist1')]['on']=[{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}];
		spec.signals[Index(spec.signals, 'dist2')]['on']=[{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}];
		spec.signals[Index(spec.signals, 'xdom')]['on']=[{"events": {"signal": "delta"},"update": "[xcur[0] - span(xcur) * delta[0] / Plot_Width, xcur[1] - span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}];
		spec.signals[Index(spec.signals, 'ydom')]['on']=[{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}];
		spec.signals[Index(spec.signals, 'down')]['on']=[{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}];
	}
	var defaultOpen = document.getElementById('defaultOpen'+element);
	defaultOpen.addEventListener('click',function(event) {ccOpenCity(event, 'None'+element,element)});
	var Charts_tablinks = document.getElementById('Charts_tablinks'+element);
	Charts_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Charts'+element,element)});
	var Axis_tablinks = document.getElementById('Axis_tablinks'+element);
	Axis_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Axis'+element,element)});
	var Marks_tablinks = document.getElementById('Marks_tablinks'+element);
	Marks_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Marks'+element,element)});
	var Fonts_tablinks = document.getElementById('Fonts_tablinks'+element);
	Fonts_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Fonts'+element,element)});
	var Coloring_tablinks = document.getElementById('Coloring_tablinks'+element);
	Coloring_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Coloring'+element,element)});
	var Filtering_tablinks = document.getElementById('Filtering_tablinks'+element);
	Filtering_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Filtering'+element,element)});
	var Margins_tablinks = document.getElementById('Margins_tablinks'+element);
	Margins_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Margins'+element,element)});

	vegaEmbed('#view_crossex' + element, spec, {
		renderer: 'canvas',
		width: setWidth_smart(element,widthNode),
		tooltip: true,
		warn: false,
		actions: {
			export: exportable,
			csv:exportable,
			source: false,
			editor: true,
			editorURL: "https://itg.usc.edu/editor",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		myview = result.view;
		window.addEventListener('resize', function(event) {
			result.view.width(setWidth_smart(element,widthNode)).run();
		});
		//initialize instance
		var save_icon=document.querySelector("#view_crossex"+ element+" > details > summary");
		save_icon.innerHTML="<div id='Exporting'>"+itgz.decompressFromEncodedURIComponent("DwZwbg5gBAhgTgSxgWgBYICYYKYDsC8ARAC5wCu2hUAZgPYDGZIMARgDbZHUxsiVQYYxFAAc42aggAeXGCCqDhyBPVoFCkjsgy0A7rja0YGKvTZyQRcBGUGEubMmTcaKTY537Dx18l3IARgAmKjhaDiIEAFsIKikotlxLQlRiYhEALgB6LN08gDpdAGZ82jgILKCABhqs6yowBGxdACFaGUIqqC6igA4AFigAVmDCAD5gESFUGgQ2NiJGOHFcYgBhcLKFIgBZIKDBgKKANgA1KoAJA7WAqvyAdm6n24eng7B+4-76LqP8oqgL0eBygIIOqCKJ3ofwBXQOgTuwP6yAOpwCx0uB169ECJSC3RRyJevUJhIAXlF7sd8v0hqCAgF-sc2MgAJzU-r41lDB446nHOn8gKBe7-VlQIWE-JVQZVFnsmlBNk8+5re4lTlQSGioLi3p3IaDIrVKCs-r5Xr442XdFVMDIfU-B0Wwai9GBY6A44eiFBei9F3PT1uz3or1gfWoAX5ALYgLmoK9N6Mw468UM-JBYGik5knZFe6PW5DAAyWdZMag9xx5qGyFrCPy3vuIuQ9yuQ2OYGCvVQPft1ICTupRRR+TrwRpbY9+VZZPGwCyU2IqAmdUgYyAA")+"</div>";
		if (!hide_panel) {
			ccPanelProxy[element] = new Proxy(ccPanel, {
				set: function (target, key, value) {
					target[key] = value;
					result.view.width(setWidth_smart(element,widthNode)).run();
					return true;
				}
			});	
			initAndListen('show_scatter_graph', 'Scatter_Options' + element, result,element);
			initAndListen('show_hist_graph', 'Hist_Options' + element, result,element);
			initAndListen('show_hzbox_graphs', 'Violin_Options' + element, result,element);
			initAndListen('show_grid_graphs', 'Grid_Options' + element, result,element);
			initAndListen('show_stacked_graphs', 'Stacked_Options' + element, result,element);
			initAndListen('show_box_graphs', 'Violin_Options' + element, result,element);
			var checkbox = document.querySelector('#Interactive_'+element + '> div > label > input[type=checkbox]');
			var DownloadCSVNode=document.querySelector("#view_crossex"+element+" > details > div > a:nth-child(1)");
			DownloadCSVNode.addEventListener('click', function(e) {  
				var ds=result.view.data('mydata');
				json2csv('crossex.'+element+'.csv',ds)
			}, false);
			var cross_checkbox=document.querySelector("#Show_Covariance"+element + "> div > label > input[type=checkbox]");
			cross_checkbox.addEventListener('change', (event) => {
				var all=document.querySelector('#'+element);
				all.style.opacity="0.1"
				if (event.currentTarget.checked) {					
					result.view.change('covariance', vega.changeset().insert(corrmatrix(spec.data[Index(spec.data, "mydata")].values,spec.data[Index(spec.data, "col_names")].values)).remove(function () {return true}));					
				}
				all.style.opacity="1"
			});
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","SortX_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","LogY_","Jitter_" ,"Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point","Min_Point","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Include_Only","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Manual_Color","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Plot_Padding","Title_Height","X_Axis_Height","Row_Header_Width","Row_Height","Max_Facets","Legend_Height","Legend_Cols"];			
				for (i = 0; i < new_signals_ar.length; i++) {
					spec.signals[Index(spec.signals, new_signals_ar[i])]['value']=result.view.signal(new_signals_ar[i])
				}
				result.finalize();
				delete result.view;
				delete result.spec;
				delete result.vgSpec;
				delete result.finalize;
				if (event.currentTarget.checked) {
					spec.signals[Index(spec.signals, 'xcur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}];
					spec.signals[Index(spec.signals, 'ycur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}];
					spec.signals[Index(spec.signals, 'Interactive_')]['value']=true;
					spec.signals[Index(spec.signals, 'delta')]['on']=[{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update":  "down ? [x()-down[0], y()-down[1]] : [0,0]"}];
					spec.signals[Index(spec.signals, 'anchor')]['on']=[{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}];
					spec.signals[Index(spec.signals, 'zoom')]['on']=[{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}];
					spec.signals[Index(spec.signals, 'dist1')]['on']=[{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}];
					spec.signals[Index(spec.signals, 'dist2')]['on']=[{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}];
					spec.signals[Index(spec.signals, 'xdom')]['on']=[{"events": {"signal": "delta"},"update": "[xcur[0] + span(xcur) * delta[0] / Plot_Width, xcur[1] + span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}];
					spec.signals[Index(spec.signals, 'ydom')]['on']=[{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}];
					spec.signals[Index(spec.signals, 'down')]['on']=[{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}];
					myview = result.view;
					drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable);
				} else {
					delete spec.signals[Index(spec.signals, 'xcur')]['on'];
					spec.signals[Index(spec.signals, 'Interactive_')]['value']=false;
					delete spec.signals[Index(spec.signals, 'ycur')]['on'];
					delete spec.signals[Index(spec.signals, 'delta')]['on'];
					delete spec.signals[Index(spec.signals, 'anchor')]['on'];
					delete spec.signals[Index(spec.signals, 'zoom')]['on'];
					delete spec.signals[Index(spec.signals, 'dist1')]['on'];
					delete spec.signals[Index(spec.signals, 'dist2')]['on'];
					delete spec.signals[Index(spec.signals, 'xdom')]['on'];
					delete spec.signals[Index(spec.signals, 'ydom')]['on'];
					delete spec.signals[Index(spec.signals, 'down')]['on'];
					myview = result.view;
					drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable);
				}
				return;
			});	
		}	
			
	}).catch(console.error);
}
