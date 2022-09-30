/*! itgz compression */
var itgz=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return itgz}):"undefined"!=typeof module&&null!=module&&(module.exports=itgz);
var itg_decomp=function(text){return itgz.decompressFromEncodedURIComponent(text)}  

document.getElementById("crossex_app").innerHTML= "<style type='text/css'>"+itg_decomp("PQKgBAsghglgdmQyATJat6Oa2sJgCgBiAYwCcB7AZ0uPNNIFMAbKAFwbAG98BIAWyikA5vABcYAAxgoAV1bkA3LwAOVGKxjk44xiw0A3Bkp6HSG4lCYBaSzCHaw85cYDuMACasAFuICMEiQBSYy8GOy9WPwDglSh3d3ghcQllAA9JNIz0lNTjADMtVitKGAAvBj8AJjT8wqs8qD4YJgBPcQAiAHllBgQAZSg4SnaAGjAANQZSd0GoMYBBUhhLMcpBymKpmDzjWiY6cUJfYl88yqglAF98fFAwYmIwACE5eQRsD8+v1FwCG6gAHQPAD6ACNXloxuDWG8gcQwRC4GMEvo4QiYVouLxQXR3FMrKQ4jAZJRxAAWGq8ApwIolcpRSk8alFFxhIQRcQ4pjuYygqDEADWQgoMjg7kOAGEAOzS6W7cj7UiHABiquMyjiCTgSTA1XS-kyerABtyvHYqSKrEJQwKpD44hkyh6pAslCMvGIMlIlAOYFU8HYpCu+GhsJBoa0oi85FMyJgqPDiKjMamWJ4fMFwvIovFYEIAA4AMwSfMANkquy9PqVfvIAamwZRaIjCH5Bg43HT-KFIrFhyLJfL8sVKrVHqrvv9NIb+GuLebiOkxHbaYzPezfbzA7LFY9Ct9hFVysr3sndenQdnt3AABUoKCmAxKEhvq+3z88DcAYw6ffH6vuyzHNxGIFpBnVNQNEjMBdDYeN3Wub8nzKVNOzcTwfGNHIQjZDksMZNcgM3B8ZHdHhVBKKCHHvH0mDkMilnZSJJF5cgMXtFjx1PGs3QJZDymDIA")+"</style>"+"<div class='cc cc-page' id='crossex'>"+itg_decomp("DwCwjABAxgNghgZwQXgERSqgfFATgeyQFMAPCAETgBc4IBJAOwAcBXK4AenCwChgAzfLgC2vCOIjAqpGriK0AlgBM0wgJ4YFzNqggIqamETQB3ZVRAAuMAAYbAUgDcIIgoDmIKpYBMdpiUdBBioAWgQFAC8iSxISMOE4GBhHbE5pEll5MQlgJQUANz0DIzQ8hCZ4NUstGC0iEP4jEmweCTbJPMLlNDdcOCYQAH0AIzYqfAZdWEQUdCgRsYmIOCgqAqJscj6TCABxPoHOTuz2joKIbtQlIn44FhgqQaVqOCn4JDQMBapxyawAGXwcCUFCIwnwFBeRwKJ0kHGOfA4ghEvGAw1wqM60HesxWUBBACsEK8LipUABBYb4HRFQzGVBmJQWSwQWwORwJXBuLQsmzLNj4FriXLnS4ITlUCr4R7KXRYaH5VHwmE8PjgbEzT6YHAEYhkSg0ejadhcMCY0VkmjDBBCyT3WHAWryxRkoQKIiTCAgOT8NAAYitCBCYGwAHkAEp0ACiADlOHB5Rwna0cgBCEIhR0KZ1en3+wMhbzYQHAiAxog7A2IIgmhOcJ0QDPZTj2lMirqWuDW4O2trtjUfVAEEy6fR0tBMYF5BhuSwAVn8HLgXJ5C4CvdOZ0K00HUAmNDquAaMBYstJaHFy8lMGlg1liYRpwVWE37TbysVbfTmaxlwLRd4FM+yxHdZi0VhQl6akmA3J9yjgBgBzA40QiglgmBCdIqGwAAFRBpAgABhABlAA1DgABUyM4eCGFhJ8sOXeRz1QcC2CrN5NVQZFhBCPdggIGBdGXBQ4BCeBhiIGA0AAdQUCwIEYuQSTHEpuP3MJImiCBYniRJkmwOElKyIDNzRRZELFFhhmEeSnheTjB2GKhEOchgQiYXAFE5NRdAMJh6QQazbOwrB9n6EBOFGH4Jno9pzJiyyySCmy7OucFHNmNyIDcjyvJ8vy1ACi9gvkzYwXwKKLMAp8PxfVV32OJtEWOCQgA")+"</div>";
var crossex_editor=false;
//Copyright (c) 2015-2018, University of Washington Interactive Data Lab vega.5.20
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).vega={})}(this,(function(t){"use strict";var e="5.20.2";function n(t,e,n){return t.fields=e||[],t.fname=n,t}function r(t){return null==t?null:t.fname}function i(t){return null==t?null:t.fields}function o(t){return 1===t.length?a(t[0]):u(t)}const a=t=>function(e){return e[t]},u=t=>{const e=t.length;return function(n){for(let r=0;r<e;++r)n=n[t[r]];return n}};function s(t){throw Error(t)}function l(t){const e=[],n=t.length;let r,i,o,a=null,u=0,l="";function c(){e.push(l+t.substring(r,i)),l="",r=i+1}for(t+="",r=i=0;i<n;++i)if(o=t[i],"\\"===o)l+=t.substring(r,i),l+=t.substring(++i,++i),r=i;else if(o===a)c(),a=null,u=-1;else{if(a)continue;r===u&&'"'===o||r===u&&"'"===o?(r=i+1,a=o):"."!==o||u?"["===o?(i>r&&c(),u=r=i+1):"]"===o&&(u||s("Access path missing open bracket: "+t),u>0&&c(),u=0,r=i+1):i>r?c():r=i+1}return u&&s("Access path missing closing bracket: "+t),a&&s("Access path missing closing quote: "+t),i>r&&(i++,c()),e}function c(t,e,r){const i=l(t);return t=1===i.length?i[0]:t,n((r&&r.get||o)(i),[t],e||t)}const f=c("id"),h=n((t=>t),[],"identity"),d=n((()=>0),[],"zero"),p=n((()=>1),[],"one"),g=n((()=>!0),[],"true"),m=n((()=>!1),[],"false");function y(t,e,n){const r=[e].concat([].slice.call(n));console[t].apply(console,r)}function v(t,e){let n=t||0;return{level(t){return arguments.length?(n=+t,this):n},error(){return n>=1&&y(e||"error","ERROR",arguments),this},warn(){return n>=2&&y(e||"warn","WARN",arguments),this},info(){return n>=3&&y(e||"log","INFO",arguments),this},debug(){return n>=4&&y(e||"log","DEBUG",arguments),this}}}var _=Array.isArray;function x(t){return t===Object(t)}const b=t=>"__proto__"!==t;function w(...t){return t.reduce(((t,e)=>{for(const n in e)if("signals"===n)t.signals=A(t.signals,e.signals);else{const r="legend"===n?{layout:1}:"style"===n||null;k(t,n,e[n],r)}return t}),{})}function k(t,e,n,r){if(!b(e))return;let i,o;if(x(n)&&!_(n))for(i in o=x(t[e])?t[e]:t[e]={},n)r&&(!0===r||r[i])?k(o,i,n[i]):b(i)&&(o[i]=n[i]);else t[e]=n}function A(t,e){if(null==t)return e;const n={},r=[];function i(t){n[t.name]||(n[t.name]=1,r.push(t))}return e.forEach(i),t.forEach(i),r}function M(t){return t[t.length-1]}function E(t){return null==t||""===t?null:+t}const D=t=>e=>t*Math.exp(e),C=t=>e=>Math.log(t*e),F=t=>e=>Math.sign(e)*Math.log1p(Math.abs(e/t)),S=t=>e=>Math.sign(e)*Math.expm1(Math.abs(e))*t,B=t=>e=>e<0?-Math.pow(-e,t):Math.pow(e,t);function T(t,e,n,r){const i=n(t[0]),o=n(M(t)),a=(o-i)*e;return[r(i-a),r(o-a)]}function z(t,e){return T(t,e,E,h)}function N(t,e){var n=Math.sign(t[0]);return T(t,e,C(n),D(n))}function O(t,e,n){return T(t,e,B(n),B(1/n))}function R(t,e,n){return T(t,e,F(n),S(n))}function $(t,e,n,r,i){const o=r(t[0]),a=r(M(t)),u=null!=e?r(e):(o+a)/2;return[i(u+(o-u)*n),i(u+(a-u)*n)]}function q(t,e,n){return $(t,e,n,E,h)}function L(t,e,n){const r=Math.sign(t[0]);return $(t,e,n,C(r),D(r))}function U(t,e,n,r){return $(t,e,n,B(r),B(1/r))}function P(t,e,n,r){return $(t,e,n,F(r),S(r))}function j(t){return 1+~~(new Date(t).getMonth()/3)}function I(t){return 1+~~(new Date(t).getUTCMonth()/3)}function W(t){return null!=t?_(t)?t:[t]:[]}function H(t,e,n){let r,i=t[0],o=t[1];return o<i&&(r=o,o=i,i=r),r=o-i,r>=n-e?[e,n]:[i=Math.min(Math.max(i,e),n-r),i+r]}function Y(t){return"function"==typeof t}function V(t,e,r){r=r||{},e=W(e)||[];const o=[],a=[],u={},s=r.comparator||X;return W(t).forEach(((t,n)=>{null!=t&&(o.push("descending"===e[n]?-1:1),a.push(t=Y(t)?t:c(t,null,r)),(i(t)||[]).forEach((t=>u[t]=1)))})),0===a.length?null:n(s(a,o),Object.keys(u))}const G=(t,e)=>(t<e||null==t)&&null!=e?-1:(t>e||null==e)&&null!=t?1:(e=e instanceof Date?+e:e,(t=t instanceof Date?+t:t)!==t&&e==e?-1:e!=e&&t==t?1:0),X=(t,e)=>1===t.length?J(t[0],e[0]):Z(t,e,t.length),J=(t,e)=>function(n,r){return G(t(n),t(r))*e},Z=(t,e,n)=>(e.push(0),function(r,i){let o,a=0,u=-1;for(;0===a&&++u<n;)o=t[u],a=G(o(r),o(i));return a*e[u]});function Q(t){return Y(t)?t:()=>t}function K(t,e){let n;return r=>{n&&clearTimeout(n),n=setTimeout((()=>(e(r),n=null)),t)}}function tt(t){for(let e,n,r=1,i=arguments.length;r<i;++r)for(n in e=arguments[r],e)t[n]=e[n];return t}function et(t,e){let n,r,i,o,a=0;if(t&&(n=t.length))if(null==e){for(r=t[a];a<n&&(null==r||r!=r);r=t[++a]);for(i=o=r;a<n;++a)r=t[a],null!=r&&(r<i&&(i=r),r>o&&(o=r))}else{for(r=e(t[a]);a<n&&(null==r||r!=r);r=e(t[++a]));for(i=o=r;a<n;++a)r=e(t[a]),null!=r&&(r<i&&(i=r),r>o&&(o=r))}return[i,o]}function nt(t,e){const n=t.length;let r,i,o,a,u,s=-1;if(null==e){for(;++s<n;)if(i=t[s],null!=i&&i>=i){r=o=i;break}if(s===n)return[-1,-1];for(a=u=s;++s<n;)i=t[s],null!=i&&(r>i&&(r=i,a=s),o<i&&(o=i,u=s))}else{for(;++s<n;)if(i=e(t[s],s,t),null!=i&&i>=i){r=o=i;break}if(s===n)return[-1,-1];for(a=u=s;++s<n;)i=e(t[s],s,t),null!=i&&(r>i&&(r=i,a=s),o<i&&(o=i,u=s))}return[a,u]}const rt=Object.prototype.hasOwnProperty;function it(t,e){return rt.call(t,e)}const ot={};function at(t){let e,n={};function r(t){return it(n,t)&&n[t]!==ot}const i={size:0,empty:0,object:n,has:r,get:t=>r(t)?n[t]:void 0,set(t,e){return r(t)||(++i.size,n[t]===ot&&--i.empty),n[t]=e,this},delete(t){return r(t)&&(--i.size,++i.empty,n[t]=ot),this},clear(){i.size=i.empty=0,i.object=n={}},test(t){return arguments.length?(e=t,i):e},clean(){const t={};let r=0;for(const i in n){const o=n[i];o===ot||e&&e(o)||(t[i]=o,++r)}i.size=r,i.empty=0,i.object=n=t}};return t&&Object.keys(t).forEach((e=>{i.set(e,t[e])})),i}function ut(t,e,n,r,i,o){if(!n&&0!==n)return o;const a=+n;let u,s=t[0],l=M(t);l<s&&(u=s,s=l,l=u),u=Math.abs(e-s);const c=Math.abs(l-e);return u<c&&u<=a?r:c<=a?i:o}function st(t,e,n){const r=t.prototype=Object.create(e.prototype);return Object.defineProperty(r,"constructor",{value:t,writable:!0,enumerable:!0,configurable:!0}),tt(r,n)}function lt(t,e,n,r){let i,o=e[0],a=e[e.length-1];return o>a&&(i=o,o=a,a=i),r=void 0===r||r,((n=void 0===n||n)?o<=t:o<t)&&(r?t<=a:t<a)}function ct(t){return"boolean"==typeof t}function ft(t){return"[object Date]"===Object.prototype.toString.call(t)}function ht(t){return t&&Y(t[Symbol.iterator])}function dt(t){return"number"==typeof t}function pt(t){return"[object RegExp]"===Object.prototype.toString.call(t)}function gt(t){return"string"==typeof t}function mt(t,e,r){t&&(t=e?W(t).map((t=>t.replace(/\\(.)/g,"$1"))):W(t));const i=t&&t.length,a=r&&r.get||o,u=t=>a(e?[t]:l(t));let s;if(i)if(1===i){const e=u(t[0]);s=function(t){return""+e(t)}}else{const e=t.map(u);s=function(t){let n=""+e[0](t),r=0;for(;++r<i;)n+="|"+e[r](t);return n}}else s=function(){return""};return n(s,t,"key")}function yt(t,e){const n=t[0],r=M(t),i=+e;return i?1===i?r:n+i*(r-n):n}function vt(t){let e,n,r;t=+t||1e4;const i=()=>{e={},n={},r=0},o=(i,o)=>(++r>t&&(n=e,e={},r=1),e[i]=o);return i(),{clear:i,has:t=>it(e,t)||it(n,t),get:t=>it(e,t)?e[t]:it(n,t)?o(t,n[t]):void 0,set:(t,n)=>it(e,t)?e[t]=n:o(t,n)}}function _t(t,e,n,r){const i=e.length,o=n.length;if(!o)return e;if(!i)return n;const a=r||new e.constructor(i+o);let u=0,s=0,l=0;for(;u<i&&s<o;++l)a[l]=t(e[u],n[s])>0?n[s++]:e[u++];for(;u<i;++u,++l)a[l]=e[u];for(;s<o;++s,++l)a[l]=n[s];return a}function xt(t,e){let n="";for(;--e>=0;)n+=t;return n}function bt(t,e,n,r){const i=n||" ",o=t+"",a=e-o.length;return a<=0?o:"left"===r?xt(i,a)+o:"center"===r?xt(i,~~(a/2))+o+xt(i,Math.ceil(a/2)):o+xt(i,a)}function wt(t){return t&&M(t)-t[0]||0}function kt(t){return _(t)?"["+t.map(kt)+"]":x(t)||gt(t)?JSON.stringify(t).replace("\u2028","\\u2028").replace("\u2029","\\u2029"):t}function At(t){return null==t||""===t?null:!(!t||"false"===t||"0"===t)&&!!t}const Mt=t=>dt(t)||ft(t)?t:Date.parse(t);function Et(t,e){return e=e||Mt,null==t||""===t?null:e(t)}function Dt(t){return null==t||""===t?null:t+""}function Ct(t){const e={},n=t.length;for(let r=0;r<n;++r)e[t[r]]=!0;return e}function Ft(t,e,n,r){const i=null!=r?r:"…",o=t+"",a=o.length,u=Math.max(0,e-i.length);return a<=e?o:"left"===n?i+o.slice(a-u):"center"===n?o.slice(0,Math.ceil(u/2))+i+o.slice(a-~~(u/2)):o.slice(0,u)+i}function St(t,e,n){if(t)if(e){const r=t.length;for(let i=0;i<r;++i){const r=e(t[i]);r&&n(r,i,t)}}else t.forEach(n)}var Bt={},Tt={};function zt(t){return new Function("d","return {"+t.map((function(t,e){return JSON.stringify(t)+": d["+e+'] || ""'})).join(",")+"}")}function Nt(t){var e=Object.create(null),n=[];return t.forEach((function(t){for(var r in t)r in e||n.push(e[r]=r)})),n}function Ot(t,e){var n=t+"",r=n.length;return r<e?new Array(e-r+1).join(0)+n:n}function Rt(t){var e=t.getUTCHours(),n=t.getUTCMinutes(),r=t.getUTCSeconds(),i=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":function(t){return t<0?"-"+Ot(-t,6):t>9999?"+"+Ot(t,6):Ot(t,4)}(t.getUTCFullYear())+"-"+Ot(t.getUTCMonth()+1,2)+"-"+Ot(t.getUTCDate(),2)+(i?"T"+Ot(e,2)+":"+Ot(n,2)+":"+Ot(r,2)+"."+Ot(i,3)+"Z":r?"T"+Ot(e,2)+":"+Ot(n,2)+":"+Ot(r,2)+"Z":n||e?"T"+Ot(e,2)+":"+Ot(n,2)+"Z":"")}function $t(t){var e=new RegExp('["'+t+"\n\r]"),n=t.charCodeAt(0);function r(t,e){var r,i=[],o=t.length,a=0,u=0,s=o<=0,l=!1;function c(){if(s)return Tt;if(l)return l=!1,Bt;var e,r,i=a;if(34===t.charCodeAt(i)){for(;a++<o&&34!==t.charCodeAt(a)||34===t.charCodeAt(++a););return(e=a)>=o?s=!0:10===(r=t.charCodeAt(a++))?l=!0:13===r&&(l=!0,10===t.charCodeAt(a)&&++a),t.slice(i+1,e-1).replace(/""/g,'"')}for(;a<o;){if(10===(r=t.charCodeAt(e=a++)))l=!0;else if(13===r)l=!0,10===t.charCodeAt(a)&&++a;else if(r!==n)continue;return t.slice(i,e)}return s=!0,t.slice(i,o)}for(10===t.charCodeAt(o-1)&&--o,13===t.charCodeAt(o-1)&&--o;(r=c())!==Tt;){for(var f=[];r!==Bt&&r!==Tt;)f.push(r),r=c();e&&null==(f=e(f,u++))||i.push(f)}return i}function i(e,n){return e.map((function(e){return n.map((function(t){return a(e[t])})).join(t)}))}function o(e){return e.map(a).join(t)}function a(t){return null==t?"":t instanceof Date?Rt(t):e.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,e){var n,i,o=r(t,(function(t,r){if(n)return n(t,r-1);i=t,n=e?function(t,e){var n=zt(t);return function(r,i){return e(n(r),i,t)}}(t,e):zt(t)}));return o.columns=i||[],o},parseRows:r,format:function(e,n){return null==n&&(n=Nt(e)),[n.map(a).join(t)].concat(i(e,n)).join("\n")},formatBody:function(t,e){return null==e&&(e=Nt(t)),i(t,e).join("\n")},formatRows:function(t){return t.map(o).join("\n")},formatRow:o,formatValue:a}}function qt(t){return t}function Lt(t,e){return"string"==typeof e&&(e=t.objects[e]),"GeometryCollection"===e.type?{type:"FeatureCollection",features:e.geometries.map((function(e){return Ut(t,e)}))}:Ut(t,e)}function Ut(t,e){var n=e.id,r=e.bbox,i=null==e.properties?{}:e.properties,o=Pt(t,e);return null==n&&null==r?{type:"Feature",properties:i,geometry:o}:null==r?{type:"Feature",id:n,properties:i,geometry:o}:{type:"Feature",id:n,bbox:r,properties:i,geometry:o}}function Pt(t,e){var n=function(t){if(null==t)return qt;var e,n,r=t.scale[0],i=t.scale[1],o=t.translate[0],a=t.translate[1];return function(t,u){u||(e=n=0);var s=2,l=t.length,c=new Array(l);for(c[0]=(e+=t[0])*r+o,c[1]=(n+=t[1])*i+a;s<l;)c[s]=t[s],++s;return c}}(t.transform),r=t.arcs;function i(t,e){e.length&&e.pop();for(var i=r[t<0?~t:t],o=0,a=i.length;o<a;++o)e.push(n(i[o],o));t<0&&function(t,e){for(var n,r=t.length,i=r-e;i<--r;)n=t[i],t[i++]=t[r],t[r]=n}(e,a)}function o(t){return n(t)}function a(t){for(var e=[],n=0,r=t.length;n<r;++n)i(t[n],e);return e.length<2&&e.push(e[0]),e}function u(t){for(var e=a(t);e.length<4;)e.push(e[0]);return e}function s(t){return t.map(u)}return function t(e){var n,r=e.type;switch(r){case"GeometryCollection":return{type:r,geometries:e.geometries.map(t)};case"Point":n=o(e.coordinates);break;case"MultiPoint":n=e.coordinates.map(o);break;case"LineString":n=a(e.arcs);break;case"MultiLineString":n=e.arcs.map(a);break;case"Polygon":n=s(e.arcs);break;case"MultiPolygon":n=e.arcs.map(s);break;default:return null}return{type:r,coordinates:n}}(e)}function jt(t,e){var n={},r={},i={},o=[],a=-1;function u(t,e){for(var r in t){var i=t[r];delete e[i.start],delete i.start,delete i.end,i.forEach((function(t){n[t<0?~t:t]=1})),o.push(i)}}return e.forEach((function(n,r){var i,o=t.arcs[n<0?~n:n];o.length<3&&!o[1][0]&&!o[1][1]&&(i=e[++a],e[a]=n,e[r]=i)})),e.forEach((function(e){var n,o,a=function(e){var n,r=t.arcs[e<0?~e:e],i=r[0];t.transform?(n=[0,0],r.forEach((function(t){n[0]+=t[0],n[1]+=t[1]}))):n=r[r.length-1];return e<0?[n,i]:[i,n]}(e),u=a[0],s=a[1];if(n=i[u])if(delete i[n.end],n.push(e),n.end=s,o=r[s]){delete r[o.start];var l=o===n?n:n.concat(o);r[l.start=n.start]=i[l.end=o.end]=l}else r[n.start]=i[n.end]=n;else if(n=r[s])if(delete r[n.start],n.unshift(e),n.start=u,o=i[u]){delete i[o.end];var c=o===n?n:o.concat(n);r[c.start=o.start]=i[c.end=n.end]=c}else r[n.start]=i[n.end]=n;else r[(n=[e]).start=u]=i[n.end=s]=n})),u(i,r),u(r,i),e.forEach((function(t){n[t<0?~t:t]||o.push([t])})),o}function It(t){return Pt(t,Wt.apply(this,arguments))}function Wt(t,e,n){var r,i,o;if(arguments.length>1)r=Ht(t,e,n);else for(i=0,r=new Array(o=t.arcs.length);i<o;++i)r[i]=i;return{type:"MultiLineString",arcs:jt(t,r)}}function Ht(t,e,n){var r,i=[],o=[];function a(t){var e=t<0?~t:t;(o[e]||(o[e]=[])).push({i:t,g:r})}function u(t){t.forEach(a)}function s(t){t.forEach(u)}return function t(e){switch(r=e,e.type){case"GeometryCollection":e.geometries.forEach(t);break;case"LineString":u(e.arcs);break;case"MultiLineString":case"Polygon":s(e.arcs);break;case"MultiPolygon":!function(t){t.forEach(s)}(e.arcs)}}(e),o.forEach(null==n?function(t){i.push(t[0].i)}:function(t){n(t[0].g,t[t.length-1].g)&&i.push(t[0].i)}),i}function Yt(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function Vt(t){let e=t,n=t;function r(t,e,r,i){for(null==r&&(r=0),null==i&&(i=t.length);r<i;){const o=r+i>>>1;n(t[o],e)<0?r=o+1:i=o}return r}return 1===t.length&&(e=(e,n)=>t(e)-n,n=function(t){return(e,n)=>Yt(t(e),n)}(t)),{left:r,center:function(t,n,i,o){null==i&&(i=0),null==o&&(o=t.length);const a=r(t,n,i,o-1);return a>i&&e(t[a-1],n)>-e(t[a],n)?a-1:a},right:function(t,e,r,i){for(null==r&&(r=0),null==i&&(i=t.length);r<i;){const o=r+i>>>1;n(t[o],e)>0?i=o:r=o+1}return r}}}function Gt(t){return null===t?NaN:+t}const Xt=Vt(Yt),Jt=Xt.right,Zt=Xt.left;Vt(Gt).center;class Qt{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let n=0;for(let r=0;r<this._n&&r<32;r++){const i=e[r],o=t+i,a=Math.abs(t)<Math.abs(i)?t-(o-i):i-(o-t);a&&(e[n++]=a),t=o}return e[n]=t,this._n=n+1,this}valueOf(){const t=this._partials;let e,n,r,i=this._n,o=0;if(i>0){for(o=t[--i];i>0&&(e=o,n=t[--i],o=e+n,r=n-(o-e),!r););i>0&&(r<0&&t[i-1]<0||r>0&&t[i-1]>0)&&(n=2*r,e=o+n,n==e-o&&(o=e))}return o}}var Kt=Math.sqrt(50),te=Math.sqrt(10),ee=Math.sqrt(2);function ne(t,e,n){var r,i,o,a,u=-1;if(n=+n,(t=+t)===(e=+e)&&n>0)return[t];if((r=e<t)&&(i=t,t=e,e=i),0===(a=re(t,e,n))||!isFinite(a))return[];if(a>0){let n=Math.round(t/a),r=Math.round(e/a);for(n*a<t&&++n,r*a>e&&--r,o=new Array(i=r-n+1);++u<i;)o[u]=(n+u)*a}else{a=-a;let n=Math.round(t*a),r=Math.round(e*a);for(n/a<t&&++n,r/a>e&&--r,o=new Array(i=r-n+1);++u<i;)o[u]=(n+u)/a}return r&&o.reverse(),o}function re(t,e,n){var r=(e-t)/Math.max(0,n),i=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,i);return i>=0?(o>=Kt?10:o>=te?5:o>=ee?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=Kt?10:o>=te?5:o>=ee?2:1)}function ie(t,e,n){var r=Math.abs(e-t)/Math.max(0,n),i=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/i;return o>=Kt?i*=10:o>=te?i*=5:o>=ee&&(i*=2),e<t?-i:i}function oe(t,e){let n;if(void 0===e)for(const e of t)null!=e&&(n<e||void 0===n&&e>=e)&&(n=e);else{let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&(n<i||void 0===n&&i>=i)&&(n=i)}return n}function ae(t,e){let n;if(void 0===e)for(const e of t)null!=e&&(n>e||void 0===n&&e>=e)&&(n=e);else{let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&(n>i||void 0===n&&i>=i)&&(n=i)}return n}function ue(t,e,n=0,r=t.length-1,i=Yt){for(;r>n;){if(r-n>600){const o=r-n+1,a=e-n+1,u=Math.log(o),s=.5*Math.exp(2*u/3),l=.5*Math.sqrt(u*s*(o-s)/o)*(a-o/2<0?-1:1);ue(t,e,Math.max(n,Math.floor(e-a*s/o+l)),Math.min(r,Math.floor(e+(o-a)*s/o+l)),i)}const o=t[e];let a=n,u=r;for(se(t,n,e),i(t[r],o)>0&&se(t,n,r);a<u;){for(se(t,a,u),++a,--u;i(t[a],o)<0;)++a;for(;i(t[u],o)>0;)--u}0===i(t[n],o)?se(t,n,u):(++u,se(t,u,r)),u<=e&&(n=u+1),e<=u&&(r=u-1)}return t}function se(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function le(t,e,n){if(r=(t=Float64Array.from(function*(t,e){if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(yield e);else{let n=-1;for(let r of t)null!=(r=e(r,++n,t))&&(r=+r)>=r&&(yield r)}}(t,n))).length){if((e=+e)<=0||r<2)return ae(t);if(e>=1)return oe(t);var r,i=(r-1)*e,o=Math.floor(i),a=oe(ue(t,o).subarray(0,o+1));return a+(ae(t.subarray(o+1))-a)*(i-o)}}function ce(t,e,n=Gt){if(r=t.length){if((e=+e)<=0||r<2)return+n(t[0],0,t);if(e>=1)return+n(t[r-1],r-1,t);var r,i=(r-1)*e,o=Math.floor(i),a=+n(t[o],o,t);return a+(+n(t[o+1],o+1,t)-a)*(i-o)}}function fe(t,e){return le(t,.5,e)}function he(t){return Array.from(function*(t){for(const e of t)yield*e}(t))}function de(t,e,n){t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n;for(var r=-1,i=0|Math.max(0,Math.ceil((e-t)/n)),o=new Array(i);++r<i;)o[r]=t+r*n;return o}function pe(t,e){let n=0;if(void 0===e)for(let e of t)(e=+e)&&(n+=e);else{let r=-1;for(let i of t)(i=+e(i,++r,t))&&(n+=i)}return n}function ge(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}function me(t){return(t=ge(Math.abs(t)))?t[1]:NaN}var ye,ve=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function _e(t){if(!(e=ve.exec(t)))throw new Error("invalid format: "+t);var e;return new xe({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}function xe(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function be(t,e){var n=ge(t,e);if(!n)return t+"";var r=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}_e.prototype=xe.prototype,xe.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var we={"%":(t,e)=>(100*t).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>be(100*t,e),r:be,s:function(t,e){var n=ge(t,e);if(!n)return t+"";var r=n[0],i=n[1],o=i-(ye=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+ge(t,Math.max(0,e+o-1))[0]},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function ke(t){return t}var Ae,Me,Ee,De=Array.prototype.map,Ce=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Fe(t){var e,n,r=void 0===t.grouping||void 0===t.thousands?ke:(e=De.call(t.grouping,Number),n=t.thousands+"",function(t,r){for(var i=t.length,o=[],a=0,u=e[0],s=0;i>0&&u>0&&(s+u+1>r&&(u=Math.max(1,r-s)),o.push(t.substring(i-=u,i+u)),!((s+=u+1)>r));)u=e[a=(a+1)%e.length];return o.reverse().join(n)}),i=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",a=void 0===t.decimal?".":t.decimal+"",u=void 0===t.numerals?ke:function(t){return function(e){return e.replace(/[0-9]/g,(function(e){return t[+e]}))}}(De.call(t.numerals,String)),s=void 0===t.percent?"%":t.percent+"",l=void 0===t.minus?"−":t.minus+"",c=void 0===t.nan?"NaN":t.nan+"";function f(t){var e=(t=_e(t)).fill,n=t.align,f=t.sign,h=t.symbol,d=t.zero,p=t.width,g=t.comma,m=t.precision,y=t.trim,v=t.type;"n"===v?(g=!0,v="g"):we[v]||(void 0===m&&(m=12),y=!0,v="g"),(d||"0"===e&&"="===n)&&(d=!0,e="0",n="=");var _="$"===h?i:"#"===h&&/[boxX]/.test(v)?"0"+v.toLowerCase():"",x="$"===h?o:/[%p]/.test(v)?s:"",b=we[v],w=/[defgprs%]/.test(v);function k(t){var i,o,s,h=_,k=x;if("c"===v)k=b(t)+k,t="";else{var A=(t=+t)<0||1/t<0;if(t=isNaN(t)?c:b(Math.abs(t),m),y&&(t=function(t){t:for(var e,n=t.length,r=1,i=-1;r<n;++r)switch(t[r]){case".":i=e=r;break;case"0":0===i&&(i=r),e=r;break;default:if(!+t[r])break t;i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(e+1):t}(t)),A&&0==+t&&"+"!==f&&(A=!1),h=(A?"("===f?f:l:"-"===f||"("===f?"":f)+h,k=("s"===v?Ce[8+ye/3]:"")+k+(A&&"("===f?")":""),w)for(i=-1,o=t.length;++i<o;)if(48>(s=t.charCodeAt(i))||s>57){k=(46===s?a+t.slice(i+1):t.slice(i))+k,t=t.slice(0,i);break}}g&&!d&&(t=r(t,1/0));var M=h.length+t.length+k.length,E=M<p?new Array(p-M+1).join(e):"";switch(g&&d&&(t=r(E+t,E.length?p-k.length:1/0),E=""),n){case"<":t=h+t+k+E;break;case"=":t=h+E+t+k;break;case"^":t=E.slice(0,M=E.length>>1)+h+t+k+E.slice(M);break;default:t=E+h+t+k}return u(t)}return m=void 0===m?6:/[gprs]/.test(v)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),k.toString=function(){return t+""},k}return{format:f,formatPrefix:function(t,e){var n=f(((t=_e(t)).type="f",t)),r=3*Math.max(-8,Math.min(8,Math.floor(me(e)/3))),i=Math.pow(10,-r),o=Ce[8+r/3];return function(t){return n(i*t)+o}}}}function Se(t){return Math.max(0,-me(Math.abs(t)))}function Be(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(me(e)/3)))-me(Math.abs(t)))}function Te(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,me(e)-me(t))+1}!function(t){Ae=Fe(t),Me=Ae.format,Ee=Ae.formatPrefix}({thousands:",",grouping:[3],currency:["$",""]});var ze=new Date,Ne=new Date;function Oe(t,e,n,r){function i(e){return t(e=0===arguments.length?new Date:new Date(+e)),e}return i.floor=function(e){return t(e=new Date(+e)),e},i.ceil=function(n){return t(n=new Date(n-1)),e(n,1),t(n),n},i.round=function(t){var e=i(t),n=i.ceil(t);return t-e<n-t?e:n},i.offset=function(t,n){return e(t=new Date(+t),null==n?1:Math.floor(n)),t},i.range=function(n,r,o){var a,u=[];if(n=i.ceil(n),o=null==o?1:Math.floor(o),!(n<r&&o>0))return u;do{u.push(a=new Date(+n)),e(n,o),t(n)}while(a<n&&n<r);return u},i.filter=function(n){return Oe((function(e){if(e>=e)for(;t(e),!n(e);)e.setTime(e-1)}),(function(t,r){if(t>=t)if(r<0)for(;++r<=0;)for(;e(t,-1),!n(t););else for(;--r>=0;)for(;e(t,1),!n(t););}))},n&&(i.count=function(e,r){return ze.setTime(+e),Ne.setTime(+r),t(ze),t(Ne),Math.floor(n(ze,Ne))},i.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?function(e){return r(e)%t==0}:function(e){return i.count(0,e)%t==0}):i:null}),i}var Re=Oe((function(){}),(function(t,e){t.setTime(+t+e)}),(function(t,e){return e-t}));Re.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?Oe((function(e){e.setTime(Math.floor(e/t)*t)}),(function(e,n){e.setTime(+e+n*t)}),(function(e,n){return(n-e)/t})):Re:null};var $e=1e3,qe=6e4,Le=36e5,Ue=864e5,Pe=6048e5,je=Oe((function(t){t.setTime(t-t.getMilliseconds())}),(function(t,e){t.setTime(+t+e*$e)}),(function(t,e){return(e-t)/$e}),(function(t){return t.getUTCSeconds()})),Ie=Oe((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*$e)}),(function(t,e){t.setTime(+t+e*qe)}),(function(t,e){return(e-t)/qe}),(function(t){return t.getMinutes()})),We=Oe((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*$e-t.getMinutes()*qe)}),(function(t,e){t.setTime(+t+e*Le)}),(function(t,e){return(e-t)/Le}),(function(t){return t.getHours()})),He=Oe((t=>t.setHours(0,0,0,0)),((t,e)=>t.setDate(t.getDate()+e)),((t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*qe)/Ue),(t=>t.getDate()-1));function Ye(t){return Oe((function(e){e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)}),(function(t,e){t.setDate(t.getDate()+7*e)}),(function(t,e){return(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*qe)/Pe}))}var Ve=Ye(0),Ge=Ye(1);Ye(2),Ye(3);var Xe=Ye(4);Ye(5),Ye(6);var Je=Oe((function(t){t.setDate(1),t.setHours(0,0,0,0)}),(function(t,e){t.setMonth(t.getMonth()+e)}),(function(t,e){return e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())}),(function(t){return t.getMonth()})),Ze=Oe((function(t){t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,e){t.setFullYear(t.getFullYear()+e)}),(function(t,e){return e.getFullYear()-t.getFullYear()}),(function(t){return t.getFullYear()}));Ze.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Oe((function(e){e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)}),(function(e,n){e.setFullYear(e.getFullYear()+n*t)})):null};var Qe=Oe((function(t){t.setUTCSeconds(0,0)}),(function(t,e){t.setTime(+t+e*qe)}),(function(t,e){return(e-t)/qe}),(function(t){return t.getUTCMinutes()})),Ke=Oe((function(t){t.setUTCMinutes(0,0,0)}),(function(t,e){t.setTime(+t+e*Le)}),(function(t,e){return(e-t)/Le}),(function(t){return t.getUTCHours()})),tn=Oe((function(t){t.setUTCHours(0,0,0,0)}),(function(t,e){t.setUTCDate(t.getUTCDate()+e)}),(function(t,e){return(e-t)/Ue}),(function(t){return t.getUTCDate()-1}));function en(t){return Oe((function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)}),(function(t,e){t.setUTCDate(t.getUTCDate()+7*e)}),(function(t,e){return(e-t)/Pe}))}var nn=en(0),rn=en(1);en(2),en(3);var on=en(4);en(5),en(6);var an=Oe((function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)}),(function(t,e){t.setUTCMonth(t.getUTCMonth()+e)}),(function(t,e){return e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())}),(function(t){return t.getUTCMonth()})),un=Oe((function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e)}),(function(t,e){return e.getUTCFullYear()-t.getUTCFullYear()}),(function(t){return t.getUTCFullYear()}));un.every=function(t){return isFinite(t=Math.floor(t))&&t>0?Oe((function(e){e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)}),(function(e,n){e.setUTCFullYear(e.getUTCFullYear()+n*t)})):null};const sn="year",ln="quarter",cn="month",fn="week",hn="date",dn="day",pn="dayofyear",gn="hours",mn="minutes",yn="seconds",vn="milliseconds",_n=[sn,ln,cn,fn,hn,dn,pn,gn,mn,yn,vn],xn=_n.reduce(((t,e,n)=>(t[e]=1+n,t)),{});function bn(t){const e=W(t).slice(),n={};e.length||s("Missing time unit."),e.forEach((t=>{it(xn,t)?n[t]=1:s(`Invalid time unit: ${t}.`)}));return(n.week||n.day?1:0)+(n.quarter||n.month||n.date?1:0)+(n.dayofyear?1:0)>1&&s(`Incompatible time units: ${t}`),e.sort(((t,e)=>xn[t]-xn[e])),e}const wn={[sn]:"%Y ",[ln]:"Q%q ",[cn]:"%b ",[hn]:"%d ",[fn]:"W%U ",[dn]:"%a ",[pn]:"%j ",[gn]:"%H:00",[mn]:"00:%M",[yn]:":%S",[vn]:".%L","year-month":"%Y-%m ","year-month-date":"%Y-%m-%d ","hours-minutes":"%H:%M"};function kn(t,e){const n=tt({},wn,e),r=bn(t),i=r.length;let o,a,u="",s=0;for(s=0;s<i;)for(o=r.length;o>s;--o)if(a=r.slice(s,o).join("-"),null!=n[a]){u+=n[a],s=o;break}return u.trim()}const An=new Date;function Mn(t){return An.setFullYear(t),An.setMonth(0),An.setDate(1),An.setHours(0,0,0,0),An}function En(t){return Cn(new Date(t))}function Dn(t){return Fn(new Date(t))}function Cn(t){return He.count(Mn(t.getFullYear())-1,t)}function Fn(t){return Ve.count(Mn(t.getFullYear())-1,t)}function Sn(t){return Mn(t).getDay()}function Bn(t,e,n,r,i,o,a){if(0<=t&&t<100){const u=new Date(-1,e,n,r,i,o,a);return u.setFullYear(t),u}return new Date(t,e,n,r,i,o,a)}function Tn(t){return Nn(new Date(t))}function zn(t){return On(new Date(t))}function Nn(t){const e=Date.UTC(t.getUTCFullYear(),0,1);return tn.count(e-1,t)}function On(t){const e=Date.UTC(t.getUTCFullYear(),0,1);return nn.count(e-1,t)}function Rn(t){return An.setTime(Date.UTC(t,0,1)),An.getUTCDay()}function $n(t,e,n,r,i,o,a){if(0<=t&&t<100){const t=new Date(Date.UTC(-1,e,n,r,i,o,a));return t.setUTCFullYear(n.y),t}return new Date(Date.UTC(t,e,n,r,i,o,a))}function qn(t,e,n,r,i){const o=e||1,a=M(t),u=(t,e,i)=>function(t,e,n,r){const i=n<=1?t:r?(e,i)=>r+n*Math.floor((t(e,i)-r)/n):(e,r)=>n*Math.floor(t(e,r)/n);return e?(t,n)=>e(i(t,n),n):i}(n[i=i||t],r[i],t===a&&o,e),s=new Date,l=Ct(t),c=l.year?u(sn):Q(2012),f=l.month?u(cn):l.quarter?u(ln):d,h=l.week&&l.day?u(dn,1,fn+dn):l.week?u(fn,1):l.day?u(dn,1):l.date?u(hn,1):l.dayofyear?u(pn,1):p,g=l.hours?u(gn):d,m=l.minutes?u(mn):d,y=l.seconds?u(yn):d,v=l.milliseconds?u(vn):d;return function(t){s.setTime(+t);const e=c(s);return i(e,f(s),h(s,e),g(s),m(s),y(s),v(s))}}function Ln(t,e,n){return e+7*t-(n+6)%7}const Un={[sn]:t=>t.getFullYear(),[ln]:t=>Math.floor(t.getMonth()/3),[cn]:t=>t.getMonth(),[hn]:t=>t.getDate(),[gn]:t=>t.getHours(),[mn]:t=>t.getMinutes(),[yn]:t=>t.getSeconds(),[vn]:t=>t.getMilliseconds(),[pn]:t=>Cn(t),[fn]:t=>Fn(t),[fn+dn]:(t,e)=>Ln(Fn(t),t.getDay(),Sn(e)),[dn]:(t,e)=>Ln(1,t.getDay(),Sn(e))},Pn={[ln]:t=>3*t,[fn]:(t,e)=>Ln(t,0,Sn(e))};function jn(t,e){return qn(t,e||1,Un,Pn,Bn)}const In={[sn]:t=>t.getUTCFullYear(),[ln]:t=>Math.floor(t.getUTCMonth()/3),[cn]:t=>t.getUTCMonth(),[hn]:t=>t.getUTCDate(),[gn]:t=>t.getUTCHours(),[mn]:t=>t.getUTCMinutes(),[yn]:t=>t.getUTCSeconds(),[vn]:t=>t.getUTCMilliseconds(),[pn]:t=>Nn(t),[fn]:t=>On(t),[dn]:(t,e)=>Ln(1,t.getUTCDay(),Rn(e)),[fn+dn]:(t,e)=>Ln(On(t),t.getUTCDay(),Rn(e))},Wn={[ln]:t=>3*t,[fn]:(t,e)=>Ln(t,0,Rn(e))};function Hn(t,e){return qn(t,e||1,In,Wn,$n)}const Yn={[sn]:Ze,[ln]:Je.every(3),[cn]:Je,[fn]:Ve,[hn]:He,[dn]:He,[pn]:He,[gn]:We,[mn]:Ie,[yn]:je,[vn]:Re},Vn={[sn]:un,[ln]:an.every(3),[cn]:an,[fn]:nn,[hn]:tn,[dn]:tn,[pn]:tn,[gn]:Ke,[mn]:Qe,[yn]:je,[vn]:Re};function Gn(t){return Yn[t]}function Xn(t){return Vn[t]}function Jn(t,e,n){return t?t.offset(e,n):void 0}function Zn(t,e,n){return Jn(Gn(t),e,n)}function Qn(t,e,n){return Jn(Xn(t),e,n)}function Kn(t,e,n,r){return t?t.range(e,n,r):void 0}function tr(t,e,n,r){return Kn(Gn(t),e,n,r)}function er(t,e,n,r){return Kn(Xn(t),e,n,r)}const nr=1e3,rr=6e4,ir=36e5,or=864e5,ar=2592e6,ur=31536e6,sr=[sn,cn,hn,gn,mn,yn,vn],lr=sr.slice(0,-1),cr=lr.slice(0,-1),fr=cr.slice(0,-1),hr=fr.slice(0,-1),dr=[sn,cn],pr=[sn],gr=[[lr,1,nr],[lr,5,5e3],[lr,15,15e3],[lr,30,3e4],[cr,1,rr],[cr,5,3e5],[cr,15,9e5],[cr,30,18e5],[fr,1,ir],[fr,3,108e5],[fr,6,216e5],[fr,12,432e5],[hr,1,or],[[sn,fn],1,6048e5],[dr,1,ar],[dr,3,7776e6],[pr,1,ur]];function mr(t){const e=t.extent,n=t.maxbins||40,r=Math.abs(wt(e))/n;let i,o,a=Vt((t=>t[2])).right(gr,r);return a===gr.length?(i=pr,o=ie(e[0]/ur,e[1]/ur,n)):a?(a=gr[r/gr[a-1][2]<gr[a][2]/r?a-1:a],i=a[0],o=a[1]):(i=sr,o=Math.max(ie(e[0],e[1],n),1)),{units:i,step:o}}function yr(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function vr(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function _r(t,e,n){return{y:t,m:e,d:n,H:0,M:0,S:0,L:0}}function xr(t){var e=t.dateTime,n=t.date,r=t.time,i=t.periods,o=t.days,a=t.shortDays,u=t.months,s=t.shortMonths,l=Tr(i),c=zr(i),f=Tr(o),h=zr(o),d=Tr(a),p=zr(a),g=Tr(u),m=zr(u),y=Tr(s),v=zr(s),_={a:function(t){return a[t.getDay()]},A:function(t){return o[t.getDay()]},b:function(t){return s[t.getMonth()]},B:function(t){return u[t.getMonth()]},c:null,d:ti,e:ti,f:oi,g:mi,G:vi,H:ei,I:ni,j:ri,L:ii,m:ai,M:ui,p:function(t){return i[+(t.getHours()>=12)]},q:function(t){return 1+~~(t.getMonth()/3)},Q:Pi,s:ji,S:si,u:li,U:ci,V:hi,w:di,W:pi,x:null,X:null,y:gi,Y:yi,Z:_i,"%":Ui},x={a:function(t){return a[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},b:function(t){return s[t.getUTCMonth()]},B:function(t){return u[t.getUTCMonth()]},c:null,d:xi,e:xi,f:Mi,g:Ri,G:qi,H:bi,I:wi,j:ki,L:Ai,m:Ei,M:Di,p:function(t){return i[+(t.getUTCHours()>=12)]},q:function(t){return 1+~~(t.getUTCMonth()/3)},Q:Pi,s:ji,S:Ci,u:Fi,U:Si,V:Ti,w:zi,W:Ni,x:null,X:null,y:Oi,Y:$i,Z:Li,"%":Ui},b={a:function(t,e,n){var r=d.exec(e.slice(n));return r?(t.w=p.get(r[0].toLowerCase()),n+r[0].length):-1},A:function(t,e,n){var r=f.exec(e.slice(n));return r?(t.w=h.get(r[0].toLowerCase()),n+r[0].length):-1},b:function(t,e,n){var r=y.exec(e.slice(n));return r?(t.m=v.get(r[0].toLowerCase()),n+r[0].length):-1},B:function(t,e,n){var r=g.exec(e.slice(n));return r?(t.m=m.get(r[0].toLowerCase()),n+r[0].length):-1},c:function(t,n,r){return A(t,e,n,r)},d:Wr,e:Wr,f:Jr,g:Ur,G:Lr,H:Yr,I:Yr,j:Hr,L:Xr,m:Ir,M:Vr,p:function(t,e,n){var r=l.exec(e.slice(n));return r?(t.p=c.get(r[0].toLowerCase()),n+r[0].length):-1},q:jr,Q:Qr,s:Kr,S:Gr,u:Or,U:Rr,V:$r,w:Nr,W:qr,x:function(t,e,r){return A(t,n,e,r)},X:function(t,e,n){return A(t,r,e,n)},y:Ur,Y:Lr,Z:Pr,"%":Zr};function w(t,e){return function(n){var r,i,o,a=[],u=-1,s=0,l=t.length;for(n instanceof Date||(n=new Date(+n));++u<l;)37===t.charCodeAt(u)&&(a.push(t.slice(s,u)),null!=(i=Er[r=t.charAt(++u)])?r=t.charAt(++u):i="e"===r?" ":"0",(o=e[r])&&(r=o(n,i)),a.push(r),s=u+1);return a.push(t.slice(s,u)),a.join("")}}function k(t,e){return function(n){var r,i,o=_r(1900,void 0,1);if(A(o,t,n+="",0)!=n.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(e&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(i=(r=vr(_r(o.y,0,1))).getUTCDay(),r=i>4||0===i?rn.ceil(r):rn(r),r=tn.offset(r,7*(o.V-1)),o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(i=(r=yr(_r(o.y,0,1))).getDay(),r=i>4||0===i?Ge.ceil(r):Ge(r),r=He.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),o.d=r.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),i="Z"in o?vr(_r(o.y,0,1)).getUTCDay():yr(_r(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,vr(o)):yr(o)}}function A(t,e,n,r){for(var i,o,a=0,u=e.length,s=n.length;a<u;){if(r>=s)return-1;if(37===(i=e.charCodeAt(a++))){if(i=e.charAt(a++),!(o=b[i in Er?e.charAt(a++):i])||(r=o(t,n,r))<0)return-1}else if(i!=n.charCodeAt(r++))return-1}return r}return _.x=w(n,_),_.X=w(r,_),_.c=w(e,_),x.x=w(n,x),x.X=w(r,x),x.c=w(e,x),{format:function(t){var e=w(t+="",_);return e.toString=function(){return t},e},parse:function(t){var e=k(t+="",!1);return e.toString=function(){return t},e},utcFormat:function(t){var e=w(t+="",x);return e.toString=function(){return t},e},utcParse:function(t){var e=k(t+="",!0);return e.toString=function(){return t},e}}}var br,wr,kr,Ar,Mr,Er={"-":"",_:" ",0:"0"},Dr=/^\s*\d+/,Cr=/^%/,Fr=/[\\^$*+?|[\]().{}]/g;function Sr(t,e,n){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<n?new Array(n-o+1).join(e)+i:i)}function Br(t){return t.replace(Fr,"\\$&")}function Tr(t){return new RegExp("^(?:"+t.map(Br).join("|")+")","i")}function zr(t){return new Map(t.map(((t,e)=>[t.toLowerCase(),e])))}function Nr(t,e,n){var r=Dr.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function Or(t,e,n){var r=Dr.exec(e.slice(n,n+1));return r?(t.u=+r[0],n+r[0].length):-1}function Rr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.U=+r[0],n+r[0].length):-1}function $r(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.V=+r[0],n+r[0].length):-1}function qr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.W=+r[0],n+r[0].length):-1}function Lr(t,e,n){var r=Dr.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function Ur(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function Pr(t,e,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function jr(t,e,n){var r=Dr.exec(e.slice(n,n+1));return r?(t.q=3*r[0]-3,n+r[0].length):-1}function Ir(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function Wr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function Hr(t,e,n){var r=Dr.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function Yr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function Vr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function Gr(t,e,n){var r=Dr.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function Xr(t,e,n){var r=Dr.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function Jr(t,e,n){var r=Dr.exec(e.slice(n,n+6));return r?(t.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function Zr(t,e,n){var r=Cr.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function Qr(t,e,n){var r=Dr.exec(e.slice(n));return r?(t.Q=+r[0],n+r[0].length):-1}function Kr(t,e,n){var r=Dr.exec(e.slice(n));return r?(t.s=+r[0],n+r[0].length):-1}function ti(t,e){return Sr(t.getDate(),e,2)}function ei(t,e){return Sr(t.getHours(),e,2)}function ni(t,e){return Sr(t.getHours()%12||12,e,2)}function ri(t,e){return Sr(1+He.count(Ze(t),t),e,3)}function ii(t,e){return Sr(t.getMilliseconds(),e,3)}function oi(t,e){return ii(t,e)+"000"}function ai(t,e){return Sr(t.getMonth()+1,e,2)}function ui(t,e){return Sr(t.getMinutes(),e,2)}function si(t,e){return Sr(t.getSeconds(),e,2)}function li(t){var e=t.getDay();return 0===e?7:e}function ci(t,e){return Sr(Ve.count(Ze(t)-1,t),e,2)}function fi(t){var e=t.getDay();return e>=4||0===e?Xe(t):Xe.ceil(t)}function hi(t,e){return t=fi(t),Sr(Xe.count(Ze(t),t)+(4===Ze(t).getDay()),e,2)}function di(t){return t.getDay()}function pi(t,e){return Sr(Ge.count(Ze(t)-1,t),e,2)}function gi(t,e){return Sr(t.getFullYear()%100,e,2)}function mi(t,e){return Sr((t=fi(t)).getFullYear()%100,e,2)}function yi(t,e){return Sr(t.getFullYear()%1e4,e,4)}function vi(t,e){var n=t.getDay();return Sr((t=n>=4||0===n?Xe(t):Xe.ceil(t)).getFullYear()%1e4,e,4)}function _i(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+Sr(e/60|0,"0",2)+Sr(e%60,"0",2)}function xi(t,e){return Sr(t.getUTCDate(),e,2)}function bi(t,e){return Sr(t.getUTCHours(),e,2)}function wi(t,e){return Sr(t.getUTCHours()%12||12,e,2)}function ki(t,e){return Sr(1+tn.count(un(t),t),e,3)}function Ai(t,e){return Sr(t.getUTCMilliseconds(),e,3)}function Mi(t,e){return Ai(t,e)+"000"}function Ei(t,e){return Sr(t.getUTCMonth()+1,e,2)}function Di(t,e){return Sr(t.getUTCMinutes(),e,2)}function Ci(t,e){return Sr(t.getUTCSeconds(),e,2)}function Fi(t){var e=t.getUTCDay();return 0===e?7:e}function Si(t,e){return Sr(nn.count(un(t)-1,t),e,2)}function Bi(t){var e=t.getUTCDay();return e>=4||0===e?on(t):on.ceil(t)}function Ti(t,e){return t=Bi(t),Sr(on.count(un(t),t)+(4===un(t).getUTCDay()),e,2)}function zi(t){return t.getUTCDay()}function Ni(t,e){return Sr(rn.count(un(t)-1,t),e,2)}function Oi(t,e){return Sr(t.getUTCFullYear()%100,e,2)}function Ri(t,e){return Sr((t=Bi(t)).getUTCFullYear()%100,e,2)}function $i(t,e){return Sr(t.getUTCFullYear()%1e4,e,4)}function qi(t,e){var n=t.getUTCDay();return Sr((t=n>=4||0===n?on(t):on.ceil(t)).getUTCFullYear()%1e4,e,4)}function Li(){return"+0000"}function Ui(){return"%"}function Pi(t){return+t}function ji(t){return Math.floor(+t/1e3)}function Ii(t){const e={};return n=>e[n]||(e[n]=t(n))}function Wi(t){const e=Ii(t.format),n=t.formatPrefix;return{format:e,formatPrefix:n,formatFloat(t){const n=_e(t||",");if(null==n.precision){switch(n.precision=12,n.type){case"%":n.precision-=2;break;case"e":n.precision-=1}return r=e(n),i=e(".1f")(1)[1],t=>{const e=r(t),n=e.indexOf(i);if(n<0)return e;let o=function(t,e){let n,r=t.lastIndexOf("e");if(r>0)return r;for(r=t.length;--r>e;)if(n=t.charCodeAt(r),n>=48&&n<=57)return r+1}(e,n);const a=o<e.length?e.slice(o):"";for(;--o>n;)if("0"!==e[o]){++o;break}return e.slice(0,o)+a}}return e(n);var r,i},formatSpan(t,r,i,o){o=_e(null==o?",f":o);const a=ie(t,r,i),u=Math.max(Math.abs(t),Math.abs(r));let s;if(null==o.precision)switch(o.type){case"s":return isNaN(s=Be(a,u))||(o.precision=s),n(o,u);case"":case"e":case"g":case"p":case"r":isNaN(s=Te(a,u))||(o.precision=s-("e"===o.type));break;case"f":case"%":isNaN(s=Se(a))||(o.precision=s-2*("%"===o.type))}return e(o)}}}let Hi,Yi;function Vi(){return Hi=Wi({format:Me,formatPrefix:Ee})}function Gi(t){return Wi(Fe(t))}function Xi(t){return arguments.length?Hi=Gi(t):Hi}function Ji(t,e,n){x(n=n||{})||s(`Invalid time multi-format specifier: ${n}`);const r=e(yn),i=e(mn),o=e(gn),a=e(hn),u=e(fn),l=e(cn),c=e(ln),f=e(sn),h=t(n.milliseconds||".%L"),d=t(n.seconds||":%S"),p=t(n.minutes||"%I:%M"),g=t(n.hours||"%I %p"),m=t(n.date||n.day||"%a %d"),y=t(n.week||"%b %d"),v=t(n.month||"%B"),_=t(n.quarter||"%B"),b=t(n.year||"%Y");return t=>(r(t)<t?h:i(t)<t?d:o(t)<t?p:a(t)<t?g:l(t)<t?u(t)<t?m:y:f(t)<t?c(t)<t?v:_:b)(t)}function Zi(t){const e=Ii(t.format),n=Ii(t.utcFormat);return{timeFormat:t=>gt(t)?e(t):Ji(e,Gn,t),utcFormat:t=>gt(t)?n(t):Ji(n,Xn,t),timeParse:Ii(t.parse),utcParse:Ii(t.utcParse)}}function Qi(){return Yi=Zi({format:wr,parse:kr,utcFormat:Ar,utcParse:Mr})}function Ki(t){return Zi(xr(t))}function to(t){return arguments.length?Yi=Ki(t):Yi}!function(t){br=xr(t),wr=br.format,kr=br.parse,Ar=br.utcFormat,Mr=br.utcParse}({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),Vi(),Qi();const eo=(t,e)=>tt({},t,e);function no(t,e){const n=t?Gi(t):Xi(),r=e?Ki(e):to();return eo(n,r)}function ro(t,e){const n=arguments.length;return n&&2!==n&&s("defaultLocale expects either zero or two arguments."),n?eo(Xi(t),to(e)):eo(Xi(),to())}const io=/^([A-Za-z]+:)?\/\//,oo=/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|file|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,ao=/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,uo="file://";async function so(t,e){const n=await this.sanitize(t,e),r=n.href;return n.localFile?this.file(r):this.http(r,e)}async function lo(t,e){e=tt({},this.options,e);const n=this.fileAccess,r={href:null};let i,o,a;const u=oo.test(t.replace(ao,""));null!=t&&"string"==typeof t&&u||s("Sanitize failure, invalid URI: "+kt(t));const l=io.test(t);return(a=e.baseURL)&&!l&&(t.startsWith("/")||"/"===a[a.length-1]||(t="/"+t),t=a+t),o=(i=t.startsWith(uo))||"file"===e.mode||"http"!==e.mode&&!l&&n,i?t=t.slice(uo.length):t.startsWith("//")&&("file"===e.defaultProtocol?(t=t.slice(2),o=!0):t=(e.defaultProtocol||"http")+":"+t),Object.defineProperty(r,"localFile",{value:!!o}),r.href=t,e.target&&(r.target=e.target+""),e.rel&&(r.rel=e.rel+""),"image"===e.context&&e.crossOrigin&&(r.crossOrigin=e.crossOrigin+""),r}function co(t){return t?e=>new Promise(((n,r)=>{t.readFile(e,((t,e)=>{t?r(t):n(e)}))})):fo}async function fo(){s("No file system access.")}function ho(t){return t?async function(e,n){const r=tt({},this.options.http,n),i=n&&n.response,o=await t(e,r);return o.ok?Y(o[i])?o[i]():o.text():s(o.status+""+o.statusText)}:po}async function po(){s("No HTTP fetch method available.")}const go=t=>!(Number.isNaN(+t)||t instanceof Date),mo={boolean:At,integer:E,number:E,date:Et,string:Dt,unknown:h},yo=[t=>"true"===t||"false"===t||!0===t||!1===t,t=>go(t)&&Number.isInteger(+t),go,t=>!Number.isNaN(Date.parse(t))],vo=["boolean","integer","number","date"];function _o(t,e){if(!t||!t.length)return"unknown";const n=t.length,r=yo.length,i=yo.map(((t,e)=>e+1));for(let a,u,s=0,l=0;s<n;++s)for(u=e?t[s][e]:t[s],a=0;a<r;++a)if(i[a]&&(null!=(o=u)&&o==o)&&!yo[a](u)&&(i[a]=0,++l,l===yo.length))return"string";var o;return vo[i.reduce(((t,e)=>0===t?e:t),0)-1]}function xo(t,e){return e.reduce(((e,n)=>(e[n]=_o(t,n),e)),{})}function bo(t){const e=function(e,n){const r={delimiter:t};return wo(e,n?tt(n,r):r)};return e.responseType="text",e}function wo(t,e){return e.header&&(t=e.header.map(kt).join(e.delimiter)+"\n"+t),$t(e.delimiter).parse(t+"")}function ko(t,e){const n=e&&e.property?c(e.property):h;return!x(t)||(r=t,"function"==typeof Buffer&&Y(Buffer.isBuffer)&&Buffer.isBuffer(r))?n(JSON.parse(t)):function(t,e){!_(t)&&ht(t)&&(t=[...t]);return e&&e.copy?JSON.parse(JSON.stringify(t)):t}(n(t),e);var r}wo.responseType="text",ko.responseType="json";const Ao={interior:(t,e)=>t!==e,exterior:(t,e)=>t===e};function Mo(t,e){let n,r,i,o;return t=ko(t,e),e&&e.feature?(n=Lt,i=e.feature):e&&e.mesh?(n=It,i=e.mesh,o=Ao[e.filter]):s("Missing TopoJSON feature or mesh parameter."),r=(r=t.objects[i])?n(t,r,o):s("Invalid TopoJSON object: "+i),r&&r.features||[r]}Mo.responseType="json";const Eo={dsv:wo,csv:bo(","),tsv:bo("\t"),json:ko,topojson:Mo};function Do(t,e){return arguments.length>1?(Eo[t]=e,this):it(Eo,t)?Eo[t]:null}function Co(t){const e=Do(t);return e&&e.responseType||"text"}function Fo(t,e,n,r){const i=Do((e=e||{}).type||"json");return i||s("Unknown data format type: "+e.type),t=i(t,e),e.parse&&function(t,e,n,r){if(!t.length)return;const i=to();n=n||i.timeParse,r=r||i.utcParse;let o,a,u,s,l,c,f=t.columns||Object.keys(t[0]);"auto"===e&&(e=xo(t,f));f=Object.keys(e);const h=f.map((t=>{const i=e[t];let o,a;if(i&&(i.startsWith("date:")||i.startsWith("utc:"))){o=i.split(/:(.+)?/,2),a=o[1],("'"===a[0]&&"'"===a[a.length-1]||'"'===a[0]&&'"'===a[a.length-1])&&(a=a.slice(1,-1));return("utc"===o[0]?r:n)(a)}if(!mo[i])throw Error("Illegal format pattern: "+t+":"+i);return mo[i]}));for(u=0,l=t.length,c=f.length;u<l;++u)for(o=t[u],s=0;s<c;++s)a=f[s],o[a]=h[s](o[a])}(t,e.parse,n,r),it(t,"columns")&&delete t.columns,t}const So=function(t,e){return n=>({options:n||{},sanitize:lo,load:so,fileAccess:!!e,file:co(e),http:ho(t)})}("undefined"!=typeof fetch&&fetch,null);function Bo(t){const e=t||h,n=[],r={};return n.add=t=>{const i=e(t);return r[i]||(r[i]=1,n.push(t)),n},n.remove=t=>{const i=e(t);if(r[i]){r[i]=0;const e=n.indexOf(t);e>=0&&n.splice(e,1)}return n},n}async function To(t,e){try{await e(t)}catch(e){t.error(e)}}const zo=Symbol("vega_id");let No=1;function Oo(t){return!(!t||!Ro(t))}function Ro(t){return t[zo]}function $o(t,e){return t[zo]=e,t}function qo(t){const e=t===Object(t)?t:{data:t};return Ro(e)?e:$o(e,No++)}function Lo(t){return Uo(t,qo({}))}function Uo(t,e){for(const n in t)e[n]=t[n];return e}function Po(t,e){return $o(e,Ro(t))}function jo(t,e){return t?e?(n,r)=>t(n,r)||Ro(e(n))-Ro(e(r)):(e,n)=>t(e,n)||Ro(e)-Ro(n):null}function Io(t){return t&&t.constructor===Wo}function Wo(){const t=[],e=[],n=[],r=[],i=[];let o=null,a=!1;return{constructor:Wo,insert(e){const n=W(e),r=n.length;for(let e=0;e<r;++e)t.push(n[e]);return this},remove(t){const n=Y(t)?r:e,i=W(t),o=i.length;for(let t=0;t<o;++t)n.push(i[t]);return this},modify(t,e,r){const o={field:e,value:Q(r)};return Y(t)?(o.filter=t,i.push(o)):(o.tuple=t,n.push(o)),this},encode(t,e){return Y(t)?i.push({filter:t,field:e}):n.push({tuple:t,field:e}),this},clean(t){return o=t,this},reflow(){return a=!0,this},pulse(u,s){const l={},c={};let f,h,d,p,g,m;for(f=0,h=s.length;f<h;++f)l[Ro(s[f])]=1;for(f=0,h=e.length;f<h;++f)g=e[f],l[Ro(g)]=-1;for(f=0,h=r.length;f<h;++f)p=r[f],s.forEach((t=>{p(t)&&(l[Ro(t)]=-1)}));for(f=0,h=t.length;f<h;++f)g=t[f],m=Ro(g),l[m]?l[m]=1:u.add.push(qo(t[f]));for(f=0,h=s.length;f<h;++f)g=s[f],l[Ro(g)]<0&&u.rem.push(g);function y(t,e,n){n?t[e]=n(t):u.encode=e,a||(c[Ro(t)]=t)}for(f=0,h=n.length;f<h;++f)d=n[f],g=d.tuple,p=d.field,m=l[Ro(g)],m>0&&(y(g,p,d.value),u.modifies(p));for(f=0,h=i.length;f<h;++f)d=i[f],p=d.filter,s.forEach((t=>{p(t)&&l[Ro(t)]>0&&y(t,d.field,d.value)})),u.modifies(d.field);if(a)u.mod=e.length||r.length?s.filter((t=>l[Ro(t)]>0)):s.slice();else for(m in c)u.mod.push(c[m]);return(o||null==o&&(e.length||r.length))&&u.clean(!0),u}}}const Ho="_:mod:_";function Yo(){Object.defineProperty(this,Ho,{writable:!0,value:{}})}Yo.prototype={set(t,e,n,r){const i=this,o=i[t],a=i[Ho];return null!=e&&e>=0?(o[e]!==n||r)&&(o[e]=n,a[e+":"+t]=-1,a[t]=-1):(o!==n||r)&&(i[t]=n,a[t]=_(n)?1+n.length:-1),i},modified(t,e){const n=this[Ho];if(!arguments.length){for(const t in n)if(n[t])return!0;return!1}if(_(t)){for(let e=0;e<t.length;++e)if(n[t[e]])return!0;return!1}return null!=e&&e>=0?e+1<n[t]||!!n[e+":"+t]:!!n[t]},clear(){return this[Ho]={},this}};let Vo=0;const Go=new Yo;function Xo(t,e,n,r){this.id=++Vo,this.value=t,this.stamp=-1,this.rank=-1,this.qrank=-1,this.flags=0,e&&(this._update=e),n&&this.parameters(n,r)}function Jo(t){return function(e){const n=this.flags;return 0===arguments.length?!!(n&t):(this.flags=e?n|t:n&~t,this)}}Xo.prototype={targets(){return this._targets||(this._targets=Bo(f))},set(t){return this.value!==t?(this.value=t,1):0},skip:Jo(1),modified:Jo(2),parameters(t,e,n){e=!1!==e;const r=this._argval=this._argval||new Yo,i=this._argops=this._argops||[],o=[];let a,u,l,c;const f=(t,n,a)=>{a instanceof Xo?(a!==this&&(e&&a.targets().add(this),o.push(a)),i.push({op:a,name:t,index:n})):r.set(t,n,a)};for(a in t)if(u=t[a],"pulse"===a)W(u).forEach((t=>{t instanceof Xo?t!==this&&(t.targets().add(this),o.push(t)):s("Pulse parameters must be operator instances.")})),this.source=u;else if(_(u))for(r.set(a,-1,Array(l=u.length)),c=0;c<l;++c)f(a,c,u[c]);else f(a,-1,u);return this.marshall().clear(),n&&(i.initonly=!0),o},marshall(t){const e=this._argval||Go,n=this._argops;let r,i,o,a;if(n){const u=n.length;for(i=0;i<u;++i)r=n[i],o=r.op,a=o.modified()&&o.stamp===t,e.set(r.name,r.index,o.value,a);if(n.initonly){for(i=0;i<u;++i)r=n[i],r.op.targets().remove(this);this._argops=null,this._update=null}}return e},detach(){const t=this._argops;let e,n,r,i;if(t)for(e=0,n=t.length;e<n;++e)r=t[e],i=r.op,i._targets&&i._targets.remove(this);this.pulse=null,this.source=null},evaluate(t){const e=this._update;if(e){const n=this.marshall(t.stamp),r=e.call(this,n,t);if(n.clear(),r!==this.value)this.value=r;else if(!this.modified())return t.StopPropagation}},run(t){if(t.stamp<this.stamp)return t.StopPropagation;let e;return this.skip()?(this.skip(!1),e=0):e=this.evaluate(t),this.pulse=e||t}};let Zo=0;function Qo(t,e,n){this.id=++Zo,this.value=null,n&&(this.receive=n),t&&(this._filter=t),e&&(this._apply=e)}function Ko(t,e,n){return new Qo(t,e,n)}Qo.prototype={_filter:g,_apply:h,targets(){return this._targets||(this._targets=Bo(f))},consume(t){return arguments.length?(this._consume=!!t,this):!!this._consume},receive(t){if(this._filter(t)){const e=this.value=this._apply(t),n=this._targets,r=n?n.length:0;for(let t=0;t<r;++t)n[t].receive(e);this._consume&&(t.preventDefault(),t.stopPropagation())}},filter(t){const e=Ko(t);return this.targets().add(e),e},apply(t){const e=Ko(null,t);return this.targets().add(e),e},merge(){const t=Ko();this.targets().add(t);for(let e=0,n=arguments.length;e<n;++e)arguments[e].targets().add(t);return t},throttle(t){let e=-1;return this.filter((()=>{const n=Date.now();return n-e>t?(e=n,1):0}))},debounce(t){const e=Ko();return this.targets().add(Ko(null,null,K(t,(t=>{const n=t.dataflow;e.receive(t),n&&n.run&&n.run()})))),e},between(t,e){let n=!1;return t.targets().add(Ko(null,null,(()=>n=!0))),e.targets().add(Ko(null,null,(()=>n=!1))),this.filter((()=>n))},detach(){this._filter=g,this._targets=null}};const ta={skip:!0};function ea(t,e,n,r,i,o){const a=tt({},o,ta);let u,s;Y(n)||(n=Q(n)),void 0===r?u=e=>t.touch(n(e)):Y(r)?(s=new Xo(null,r,i,!1),u=e=>{s.evaluate(e);const r=n(e),i=s.value;Io(i)?t.pulse(r,i,o):t.update(r,i,a)}):u=e=>t.update(n(e),r,a),e.apply(u)}function na(t,e,n,r,i,o){if(void 0===r)e.targets().add(n);else{const a=o||{},u=new Xo(null,function(t,e){return e=Y(e)?e:Q(e),t?function(n,r){const i=e(n,r);return t.skip()||(t.skip(i!==this.value).value=i),i}:e}(n,r),i,!1);u.modified(a.force),u.rank=e.rank,e.targets().add(u),n&&(u.skip(!0),u.value=n.value,u.targets().add(n),t.connect(n,[u]))}}const ra={};function ia(t,e,n){this.dataflow=t,this.stamp=null==e?-1:e,this.add=[],this.rem=[],this.mod=[],this.fields=null,this.encode=n||null}function oa(t,e){const n=[];return St(t,e,(t=>n.push(t))),n}function aa(t,e){const n={};return t.visit(e,(t=>{n[Ro(t)]=1})),t=>n[Ro(t)]?null:t}function ua(t,e){return t?(n,r)=>t(n,r)&&e(n,r):e}function sa(t,e,n,r){const i=this,o=n.length;let a=0;this.dataflow=t,this.stamp=e,this.fields=null,this.encode=r||null,this.pulses=n;for(let t=0;t<o;++t){const r=n[t];if(r.stamp===e){if(r.fields){const t=i.fields||(i.fields={});for(const e in r.fields)t[e]=1}r.changed(i.ADD)&&(a|=i.ADD),r.changed(i.REM)&&(a|=i.REM),r.changed(i.MOD)&&(a|=i.MOD)}}this.changes=a}function la(t){return t.error("Dataflow already running. Use runAsync() to chain invocations."),t}ia.prototype={StopPropagation:ra,ADD:1,REM:2,MOD:4,ADD_REM:3,ADD_MOD:5,ALL:7,REFLOW:8,SOURCE:16,NO_SOURCE:32,NO_FIELDS:64,fork(t){return new ia(this.dataflow).init(this,t)},clone(){const t=this.fork(7);return t.add=t.add.slice(),t.rem=t.rem.slice(),t.mod=t.mod.slice(),t.source&&(t.source=t.source.slice()),t.materialize(23)},addAll(){let t=this;return!t.source||t.add===t.rem||!t.rem.length&&t.source.length===t.add.length||(t=new ia(this.dataflow).init(this),t.add=t.source,t.rem=[]),t},init(t,e){const n=this;return n.stamp=t.stamp,n.encode=t.encode,!t.fields||64&e||(n.fields=t.fields),1&e?(n.addF=t.addF,n.add=t.add):(n.addF=null,n.add=[]),2&e?(n.remF=t.remF,n.rem=t.rem):(n.remF=null,n.rem=[]),4&e?(n.modF=t.modF,n.mod=t.mod):(n.modF=null,n.mod=[]),32&e?(n.srcF=null,n.source=null):(n.srcF=t.srcF,n.source=t.source,t.cleans&&(n.cleans=t.cleans)),n},runAfter(t){this.dataflow.runAfter(t)},changed(t){const e=t||7;return 1&e&&this.add.length||2&e&&this.rem.length||4&e&&this.mod.length},reflow(t){if(t)return this.fork(7).reflow();const e=this.add.length,n=this.source&&this.source.length;return n&&n!==e&&(this.mod=this.source,e&&this.filter(4,aa(this,1))),this},clean(t){return arguments.length?(this.cleans=!!t,this):this.cleans},modifies(t){const e=this.fields||(this.fields={});return _(t)?t.forEach((t=>e[t]=!0)):e[t]=!0,this},modified(t,e){const n=this.fields;return!(!e&&!this.mod.length||!n)&&(arguments.length?_(t)?t.some((t=>n[t])):n[t]:!!n)},filter(t,e){const n=this;return 1&t&&(n.addF=ua(n.addF,e)),2&t&&(n.remF=ua(n.remF,e)),4&t&&(n.modF=ua(n.modF,e)),16&t&&(n.srcF=ua(n.srcF,e)),n},materialize(t){const e=this;return 1&(t=t||7)&&e.addF&&(e.add=oa(e.add,e.addF),e.addF=null),2&t&&e.remF&&(e.rem=oa(e.rem,e.remF),e.remF=null),4&t&&e.modF&&(e.mod=oa(e.mod,e.modF),e.modF=null),16&t&&e.srcF&&(e.source=e.source.filter(e.srcF),e.srcF=null),e},visit(t,e){const n=this,r=e;if(16&t)return St(n.source,n.srcF,r),n;1&t&&St(n.add,n.addF,r),2&t&&St(n.rem,n.remF,r),4&t&&St(n.mod,n.modF,r);const i=n.source;if(8&t&&i){const t=n.add.length+n.mod.length;t===i.length||St(i,t?aa(n,5):n.srcF,r)}return n}},st(sa,ia,{fork(t){const e=new ia(this.dataflow).init(this,t&this.NO_FIELDS);return void 0!==t&&(t&e.ADD&&this.visit(e.ADD,(t=>e.add.push(t))),t&e.REM&&this.visit(e.REM,(t=>e.rem.push(t))),t&e.MOD&&this.visit(e.MOD,(t=>e.mod.push(t)))),e},changed(t){return this.changes&t},modified(t){const e=this,n=e.fields;return n&&e.changes&e.MOD?_(t)?t.some((t=>n[t])):n[t]:0},filter(){s("MultiPulse does not support filtering.")},materialize(){s("MultiPulse does not support materialization.")},visit(t,e){const n=this,r=n.pulses,i=r.length;let o=0;if(t&n.SOURCE)for(;o<i;++o)r[o].visit(t,e);else for(;o<i;++o)r[o].stamp===n.stamp&&r[o].visit(t,e);return n}});const ca={skip:!1,force:!1};function fa(t){let e=[];return{clear:()=>e=[],size:()=>e.length,peek:()=>e[0],push:n=>(e.push(n),ha(e,0,e.length-1,t)),pop:()=>{const n=e.pop();let r;return e.length?(r=e[0],e[0]=n,function(t,e,n){const r=e,i=t.length,o=t[e];let a,u=1+(e<<1);for(;u<i;)a=u+1,a<i&&n(t[u],t[a])>=0&&(u=a),t[e]=t[u],u=1+((e=u)<<1);t[e]=o,ha(t,r,e,n)}(e,0,t)):r=n,r}}}function ha(t,e,n,r){let i,o;const a=t[n];for(;n>e&&(o=n-1>>1,i=t[o],r(a,i)<0);)t[n]=i,n=o;return t[n]=a}function da(){this.logger(v()),this.logLevel(1),this._clock=0,this._rank=0,this._locale=ro();try{this._loader=So()}catch(t){}this._touched=Bo(f),this._input={},this._pulse=null,this._heap=fa(((t,e)=>t.qrank-e.qrank)),this._postrun=[]}function pa(t){return function(){return this._log[t].apply(this,arguments)}}function ga(t,e){Xo.call(this,t,null,e)}da.prototype={stamp(){return this._clock},loader(t){return arguments.length?(this._loader=t,this):this._loader},locale(t){return arguments.length?(this._locale=t,this):this._locale},logger(t){return arguments.length?(this._log=t,this):this._log},error:pa("error"),warn:pa("warn"),info:pa("info"),debug:pa("debug"),logLevel:pa("level"),cleanThreshold:1e4,add:function(t,e,n,r){let i,o=1;return t instanceof Xo?i=t:t&&t.prototype instanceof Xo?i=new t:Y(t)?i=new Xo(null,t):(o=0,i=new Xo(t,e)),this.rank(i),o&&(r=n,n=e),n&&this.connect(i,i.parameters(n,r)),this.touch(i),i},connect:function(t,e){const n=t.rank,r=e.length;for(let i=0;i<r;++i)if(n<e[i].rank)return void this.rerank(t)},rank:function(t){t.rank=++this._rank},rerank:function(t){const e=[t];let n,r,i;for(;e.length;)if(this.rank(n=e.pop()),r=n._targets)for(i=r.length;--i>=0;)e.push(n=r[i]),n===t&&s("Cycle detected in dataflow graph.")},pulse:function(t,e,n){this.touch(t,n||ca);const r=new ia(this,this._clock+(this._pulse?0:1)),i=t.pulse&&t.pulse.source||[];return r.target=t,this._input[t.id]=e.pulse(r,i),this},touch:function(t,e){const n=e||ca;return this._pulse?this._enqueue(t):this._touched.add(t),n.skip&&t.skip(!0),this},update:function(t,e,n){const r=n||ca;return(t.set(e)||r.force)&&this.touch(t,r),this},changeset:Wo,ingest:function(t,e,n){return e=this.parse(e,n),this.pulse(t,this.changeset().insert(e))},parse:function(t,e){const n=this.locale();return Fo(t,e,n.timeParse,n.utcParse)},preload:async function(t,e,n){const r=this,i=r._pending||function(t){let e;const n=new Promise((t=>e=t));return n.requests=0,n.done=()=>{0==--n.requests&&(t._pending=null,e(t))},t._pending=n}(r);i.requests+=1;const o=await r.request(e,n);return r.pulse(t,r.changeset().remove(g).insert(o.data||[])),i.done(),o},request:async function(t,e){const n=this;let r,i=0;try{r=await n.loader().load(t,{context:"dataflow",response:Co(e&&e.type)});try{r=n.parse(r,e)}catch(e){i=-2,n.warn("Data ingestion failed",t,e)}}catch(e){i=-1,n.warn("Loading failed",t,e)}return{data:r,status:i}},events:function(t,e,n,r){const i=this,o=Ko(n,r),a=function(t){t.dataflow=i;try{o.receive(t)}catch(t){i.error(t)}finally{i.run()}};let u;u="string"==typeof t&&"undefined"!=typeof document?document.querySelectorAll(t):W(t);const s=u.length;for(let t=0;t<s;++t)u[t].addEventListener(e,a);return o},on:function(t,e,n,r,i){return(t instanceof Xo?na:ea)(this,t,e,n,r,i),this},evaluate:async function(t,e,n){const r=this,i=[];if(r._pulse)return la(r);if(r._pending&&await r._pending,e&&await To(r,e),!r._touched.length)return r.debug("Dataflow invoked, but nothing to do."),r;const o=++r._clock;r._pulse=new ia(r,o,t),r._touched.forEach((t=>r._enqueue(t,!0))),r._touched=Bo(f);let a,u,s,l=0;try{for(;r._heap.size()>0;)a=r._heap.pop(),a.rank===a.qrank?(u=a.run(r._getPulse(a,t)),u.then?u=await u:u.async&&(i.push(u.async),u=ra),u!==ra&&a._targets&&a._targets.forEach((t=>r._enqueue(t))),++l):r._enqueue(a,!0)}catch(t){r._heap.clear(),s=t}if(r._input={},r._pulse=null,r.debug(`Pulse ${o}: ${l} operators`),s&&(r._postrun=[],r.error(s)),r._postrun.length){const t=r._postrun.sort(((t,e)=>e.priority-t.priority));r._postrun=[];for(let e=0;e<t.length;++e)await To(r,t[e].callback)}return n&&await To(r,n),i.length&&Promise.all(i).then((t=>r.runAsync(null,(()=>{t.forEach((t=>{try{t(r)}catch(t){r.error(t)}}))})))),r},run:function(t,e,n){return this._pulse?la(this):(this.evaluate(t,e,n),this)},runAsync:async function(t,e,n){for(;this._running;)await this._running;const r=()=>this._running=null;return(this._running=this.evaluate(t,e,n)).then(r,r),this._running},runAfter:function(t,e,n){if(this._pulse||e)this._postrun.push({priority:n||0,callback:t});else try{t(this)}catch(t){this.error(t)}},_enqueue:function(t,e){const n=t.stamp<this._clock;n&&(t.stamp=this._clock),(n||e)&&(t.qrank=t.rank,this._heap.push(t))},_getPulse:function(t,e){const n=t.source,r=this._clock;return n&&_(n)?new sa(this,r,n.map((t=>t.pulse)),e):this._input[t.id]||function(t,e){if(e&&e.stamp===t.stamp)return e;t=t.fork(),e&&e!==ra&&(t.source=e.source);return t}(this._pulse,n&&n.pulse)}},st(ga,Xo,{run(t){if(t.stamp<this.stamp)return t.StopPropagation;let e;return this.skip()?this.skip(!1):e=this.evaluate(t),e=e||t,e.then?e=e.then((t=>this.pulse=t)):e!==t.StopPropagation&&(this.pulse=e),e},evaluate(t){const e=this.marshall(t.stamp),n=this.transform(e,t);return e.clear(),n},transform(){}});const ma={};function ya(t){const e=va(t);return e&&e.Definition||null}function va(t){return t=t&&t.toLowerCase(),it(ma,t)?ma[t]:null}function*_a(t,e){if(null==e)for(let e of t)null!=e&&""!==e&&(e=+e)>=e&&(yield e);else{let n=-1;for(let r of t)r=e(r,++n,t),null!=r&&""!==r&&(r=+r)>=r&&(yield r)}}function xa(t,e,n){const r=Float64Array.from(_a(t,n));return r.sort(Yt),e.map((t=>ce(r,t)))}function ba(t,e){return xa(t,[.25,.5,.75],e)}function wa(t,e){const n=t.length,r=function(t,e){const n=function(t,e){let n,r=0,i=0,o=0;if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(n=e-i,i+=n/++r,o+=n*(e-i));else{let a=-1;for(let u of t)null!=(u=e(u,++a,t))&&(u=+u)>=u&&(n=u-i,i+=n/++r,o+=n*(u-i))}if(r>1)return o/(r-1)}(t,e);return n?Math.sqrt(n):n}(t,e),i=ba(t,e),o=(i[2]-i[0])/1.34;return 1.06*(Math.min(r,o)||r||Math.abs(i[0])||1)*Math.pow(n,-.2)}function ka(t){const e=t.maxbins||20,n=t.base||10,r=Math.log(n),i=t.divide||[5,2];let o,a,u,s,l,c,f=t.extent[0],h=t.extent[1];const d=t.span||h-f||Math.abs(f)||1;if(t.step)o=t.step;else if(t.steps){for(s=d/e,l=0,c=t.steps.length;l<c&&t.steps[l]<s;++l);o=t.steps[Math.max(0,l-1)]}else{for(a=Math.ceil(Math.log(e)/r),u=t.minstep||0,o=Math.max(u,Math.pow(n,Math.round(Math.log(d)/r)-a));Math.ceil(d/o)>e;)o*=n;for(l=0,c=i.length;l<c;++l)s=o/i[l],s>=u&&d/s<=e&&(o=s)}s=Math.log(o);const p=s>=0?0:1+~~(-s/r),g=Math.pow(n,-p-1);return(t.nice||void 0===t.nice)&&(s=Math.floor(f/o+g)*o,f=f<s?s-o:s,h=Math.ceil(h/o)*o),{start:f,stop:h===f?f+o:h,step:o}}function Aa(e,n,r,i){if(!e.length)return[void 0,void 0];const o=Float64Array.from(_a(e,i)),a=o.length,u=n;let s,l,c,f;for(c=0,f=Array(u);c<u;++c){for(s=0,l=0;l<a;++l)s+=o[~~(t.random()*a)];f[c]=s/a}return f.sort(Yt),[le(f,r/2),le(f,1-r/2)]}function Ma(t,e,n,r){r=r||(t=>t);const i=t.length,o=new Float64Array(i);let a,u=0,s=1,l=r(t[0]),c=l,f=l+e;for(;s<i;++s){if(a=r(t[s]),a>=f){for(c=(l+c)/2;u<s;++u)o[u]=c;f=a+e,l=a}c=a}for(c=(l+c)/2;u<s;++u)o[u]=c;return n?function(t,e){const n=t.length;let r,i,o=0,a=1;for(;t[o]===t[a];)++a;for(;a<n;){for(r=a+1;t[a]===t[r];)++r;if(t[a]-t[a-1]<e){for(i=a+(o+r-a-a>>1);i<a;)t[i++]=t[a];for(;i>a;)t[i--]=t[o]}o=a,a=r}return t}(o,e+e/4):o}t.random=Math.random;const Ea=Math.sqrt(2*Math.PI),Da=Math.SQRT2;let Ca=NaN;function Fa(e,n){e=e||0,n=null==n?1:n;let r,i,o=0,a=0;if(Ca==Ca)o=Ca,Ca=NaN;else{do{o=2*t.random()-1,a=2*t.random()-1,r=o*o+a*a}while(0===r||r>1);i=Math.sqrt(-2*Math.log(r)/r),o*=i,Ca=a*i}return e+o*n}function Sa(t,e,n){const r=(t-(e||0))/(n=null==n?1:n);return Math.exp(-.5*r*r)/(n*Ea)}function Ba(t,e,n){const r=(t-(e=e||0))/(n=null==n?1:n),i=Math.abs(r);let o;if(i>37)o=0;else{const t=Math.exp(-i*i/2);let e;i<7.07106781186547?(e=.0352624965998911*i+.700383064443688,e=e*i+6.37396220353165,e=e*i+33.912866078383,e=e*i+112.079291497871,e=e*i+221.213596169931,e=e*i+220.206867912376,o=t*e,e=.0883883476483184*i+1.75566716318264,e=e*i+16.064177579207,e=e*i+86.7807322029461,e=e*i+296.564248779674,e=e*i+637.333633378831,e=e*i+793.826512519948,e=e*i+440.413735824752,o/=e):(e=i+.65,e=i+4/e,e=i+3/e,e=i+2/e,e=i+1/e,o=t/e/2.506628274631)}return r>0?1-o:o}function Ta(t,e,n){return t<0||t>1?NaN:(e||0)+(null==n?1:n)*Da*function(t){let e,n=-Math.log((1-t)*(1+t));n<6.25?(n-=3.125,e=-364441206401782e-35,e=e*n-16850591381820166e-35,e=128584807152564e-32+e*n,e=11157877678025181e-33+e*n,e=e*n-1333171662854621e-31,e=20972767875968562e-33+e*n,e=6637638134358324e-30+e*n,e=e*n-4054566272975207e-29,e=e*n-8151934197605472e-29,e=26335093153082323e-28+e*n,e=e*n-12975133253453532e-27,e=e*n-5415412054294628e-26,e=1.0512122733215323e-9+e*n,e=e*n-4.112633980346984e-9,e=e*n-2.9070369957882005e-8,e=4.2347877827932404e-7+e*n,e=e*n-13654692000834679e-22,e=e*n-13882523362786469e-21,e=.00018673420803405714+e*n,e=e*n-.000740702534166267,e=e*n-.006033670871430149,e=.24015818242558962+e*n,e=1.6536545626831027+e*n):n<16?(n=Math.sqrt(n)-3.25,e=2.2137376921775787e-9,e=9.075656193888539e-8+e*n,e=e*n-2.7517406297064545e-7,e=1.8239629214389228e-8+e*n,e=15027403968909828e-22+e*n,e=e*n-4013867526981546e-21,e=29234449089955446e-22+e*n,e=12475304481671779e-21+e*n,e=e*n-47318229009055734e-21,e=6828485145957318e-20+e*n,e=24031110387097894e-21+e*n,e=e*n-.0003550375203628475,e=.0009532893797373805+e*n,e=e*n-.0016882755560235047,e=.002491442096107851+e*n,e=e*n-.003751208507569241,e=.005370914553590064+e*n,e=1.0052589676941592+e*n,e=3.0838856104922208+e*n):Number.isFinite(n)?(n=Math.sqrt(n)-5,e=-27109920616438573e-27,e=e*n-2.555641816996525e-10,e=1.5076572693500548e-9+e*n,e=e*n-3.789465440126737e-9,e=7.61570120807834e-9+e*n,e=e*n-1.496002662714924e-8,e=2.914795345090108e-8+e*n,e=e*n-6.771199775845234e-8,e=2.2900482228026655e-7+e*n,e=e*n-9.9298272942317e-7,e=4526062597223154e-21+e*n,e=e*n-1968177810553167e-20,e=7599527703001776e-20+e*n,e=e*n-.00021503011930044477,e=e*n-.00013871931833623122,e=1.0103004648645344+e*n,e=4.849906401408584+e*n):e=1/0;return e*t}(2*t-1)}function za(t,e){let n,r;const i={mean(t){return arguments.length?(n=t||0,i):n},stdev(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>Fa(n,r),pdf:t=>Sa(t,n,r),cdf:t=>Ba(t,n,r),icdf:t=>Ta(t,n,r)};return i.mean(t).stdev(e)}function Na(e,n){const r=za();let i=0;const o={data(t){return arguments.length?(e=t,i=t?t.length:0,o.bandwidth(n)):e},bandwidth(t){return arguments.length?(!(n=t)&&e&&(n=wa(e)),o):n},sample:()=>e[~~(t.random()*i)]+n*r.sample(),pdf(t){let o=0,a=0;for(;a<i;++a)o+=r.pdf((t-e[a])/n);return o/n/i},cdf(t){let o=0,a=0;for(;a<i;++a)o+=r.cdf((t-e[a])/n);return o/i},icdf(){throw Error("KDE icdf not supported.")}};return o.data(e)}function Oa(t,e){return t=t||0,e=null==e?1:e,Math.exp(t+Fa()*e)}function Ra(t,e,n){if(t<=0)return 0;e=e||0,n=null==n?1:n;const r=(Math.log(t)-e)/n;return Math.exp(-.5*r*r)/(n*Ea*t)}function $a(t,e,n){return Ba(Math.log(t),e,n)}function qa(t,e,n){return Math.exp(Ta(t,e,n))}function La(t,e){let n,r;const i={mean(t){return arguments.length?(n=t||0,i):n},stdev(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>Oa(n,r),pdf:t=>Ra(t,n,r),cdf:t=>$a(t,n,r),icdf:t=>qa(t,n,r)};return i.mean(t).stdev(e)}function Ua(e,n){let r,i=0;const o={weights(t){return arguments.length?(r=function(t){const e=[];let n,r=0;for(n=0;n<i;++n)r+=e[n]=null==t[n]?1:+t[n];for(n=0;n<i;++n)e[n]/=r;return e}(n=t||[]),o):n},distributions(t){return arguments.length?(t?(i=t.length,e=t):(i=0,e=[]),o.weights(n)):e},sample(){const n=t.random();let o=e[i-1],a=r[0],u=0;for(;u<i-1;a+=r[++u])if(n<a){o=e[u];break}return o.sample()},pdf(t){let n=0,o=0;for(;o<i;++o)n+=r[o]*e[o].pdf(t);return n},cdf(t){let n=0,o=0;for(;o<i;++o)n+=r[o]*e[o].cdf(t);return n},icdf(){throw Error("Mixture icdf not supported.")}};return o.distributions(e).weights(n)}function Pa(e,n){return null==n&&(n=null==e?1:e,e=0),e+(n-e)*t.random()}function ja(t,e,n){return null==n&&(n=null==e?1:e,e=0),t>=e&&t<=n?1/(n-e):0}function Ia(t,e,n){return null==n&&(n=null==e?1:e,e=0),t<e?0:t>n?1:(t-e)/(n-e)}function Wa(t,e,n){return null==n&&(n=null==e?1:e,e=0),t>=0&&t<=1?e+t*(n-e):NaN}function Ha(t,e){let n,r;const i={min(t){return arguments.length?(n=t||0,i):n},max(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>Pa(n,r),pdf:t=>ja(t,n,r),cdf:t=>Ia(t,n,r),icdf:t=>Wa(t,n,r)};return null==e&&(e=null==t?1:t,t=0),i.min(t).max(e)}function Ya(t,e,n,r){const i=r-t*t,o=Math.abs(i)<1e-24?0:(n-t*e)/i;return[e-o*t,o]}function Va(t,e,n,r){t=t.filter((t=>{let r=e(t),i=n(t);return null!=r&&(r=+r)>=r&&null!=i&&(i=+i)>=i})),r&&t.sort(((t,n)=>e(t)-e(n)));const i=t.length,o=new Float64Array(i),a=new Float64Array(i);let u,s,l,c=0,f=0,h=0;for(l of t)o[c]=u=+e(l),a[c]=s=+n(l),++c,f+=(u-f)/c,h+=(s-h)/c;for(c=0;c<i;++c)o[c]-=f,a[c]-=h;return[o,a,f,h]}function Ga(t,e,n,r){let i,o,a=-1;for(const u of t)i=e(u),o=n(u),null!=i&&(i=+i)>=i&&null!=o&&(o=+o)>=o&&r(i,o,++a)}function Xa(t,e,n,r,i){let o=0,a=0;return Ga(t,e,n,((t,e)=>{const n=e-i(t),u=e-r;o+=n*n,a+=u*u})),1-o/a}function Ja(t,e,n){let r=0,i=0,o=0,a=0,u=0;Ga(t,e,n,((t,e)=>{++u,r+=(t-r)/u,i+=(e-i)/u,o+=(t*e-o)/u,a+=(t*t-a)/u}));const s=Ya(r,i,o,a),l=t=>s[0]+s[1]*t;return{coef:s,predict:l,rSquared:Xa(t,e,n,i,l)}}function Za(t,e,n){let r=0,i=0,o=0,a=0,u=0;Ga(t,e,n,((t,e)=>{++u,t=Math.log(t),r+=(t-r)/u,i+=(e-i)/u,o+=(t*e-o)/u,a+=(t*t-a)/u}));const s=Ya(r,i,o,a),l=t=>s[0]+s[1]*Math.log(t);return{coef:s,predict:l,rSquared:Xa(t,e,n,i,l)}}function Qa(t,e,n){const[r,i,o,a]=Va(t,e,n);let u,s,l,c=0,f=0,h=0,d=0,p=0;Ga(t,e,n,((t,e)=>{u=r[p++],s=Math.log(e),l=u*e,c+=(e*s-c)/p,f+=(l-f)/p,h+=(l*s-h)/p,d+=(u*l-d)/p}));const[g,m]=Ya(f/a,c/a,h/a,d/a),y=t=>Math.exp(g+m*(t-o));return{coef:[Math.exp(g-m*o),m],predict:y,rSquared:Xa(t,e,n,a,y)}}function Ka(t,e,n){let r=0,i=0,o=0,a=0,u=0,s=0;Ga(t,e,n,((t,e)=>{const n=Math.log(t),l=Math.log(e);++s,r+=(n-r)/s,i+=(l-i)/s,o+=(n*l-o)/s,a+=(n*n-a)/s,u+=(e-u)/s}));const l=Ya(r,i,o,a),c=t=>l[0]*Math.pow(t,l[1]);return l[0]=Math.exp(l[0]),{coef:l,predict:c,rSquared:Xa(t,e,n,u,c)}}function tu(t,e,n){const[r,i,o,a]=Va(t,e,n),u=r.length;let s,l,c,f,h=0,d=0,p=0,g=0,m=0;for(s=0;s<u;)l=r[s],c=i[s++],f=l*l,h+=(f-h)/s,d+=(f*l-d)/s,p+=(f*f-p)/s,g+=(l*c-g)/s,m+=(f*c-m)/s;const y=p-h*h,v=h*y-d*d,_=(m*h-g*d)/v,x=(g*y-m*d)/v,b=-_*h,w=t=>_*(t-=o)*t+x*t+b+a;return{coef:[b-x*o+_*o*o+a,x-2*_*o,_],predict:w,rSquared:Xa(t,e,n,a,w)}}function eu(t,e,n,r){if(1===r)return Ja(t,e,n);if(2===r)return tu(t,e,n);const[i,o,a,u]=Va(t,e,n),s=i.length,l=[],c=[],f=r+1;let h,d,p,g,m;for(h=0;h<f;++h){for(p=0,g=0;p<s;++p)g+=Math.pow(i[p],h)*o[p];for(l.push(g),m=new Float64Array(f),d=0;d<f;++d){for(p=0,g=0;p<s;++p)g+=Math.pow(i[p],h+d);m[d]=g}c.push(m)}c.push(l);const y=function(t){const e=t.length-1,n=[];let r,i,o,a,u;for(r=0;r<e;++r){for(a=r,i=r+1;i<e;++i)Math.abs(t[r][i])>Math.abs(t[r][a])&&(a=i);for(o=r;o<e+1;++o)u=t[o][r],t[o][r]=t[o][a],t[o][a]=u;for(i=r+1;i<e;++i)for(o=e;o>=r;o--)t[o][i]-=t[o][r]*t[r][i]/t[r][r]}for(i=e-1;i>=0;--i){for(u=0,o=i+1;o<e;++o)u+=t[o][i]*n[o];n[i]=(t[e][i]-u)/t[i][i]}return n}(c),v=t=>{t-=a;let e=u+y[0]+y[1]*t+y[2]*t*t;for(h=3;h<f;++h)e+=y[h]*Math.pow(t,h);return e};return{coef:nu(f,y,-a,u),predict:v,rSquared:Xa(t,e,n,u,v)}}function nu(t,e,n,r){const i=Array(t);let o,a,u,s;for(o=0;o<t;++o)i[o]=0;for(o=t-1;o>=0;--o)for(u=e[o],s=1,i[o]+=u,a=1;a<=o;++a)s*=(o+1-a)/a,i[o-a]+=u*Math.pow(n,a)*s;return i[0]+=r,i}function ru(t,e,n,r){const[i,o,a,u]=Va(t,e,n,!0),s=i.length,l=Math.max(2,~~(r*s)),c=new Float64Array(s),f=new Float64Array(s),h=new Float64Array(s).fill(1);for(let t=-1;++t<=2;){const e=[0,l-1];for(let t=0;t<s;++t){const n=i[t],r=e[0],a=e[1],u=n-i[r]>i[a]-n?r:a;let s=0,l=0,d=0,p=0,g=0;const m=1/Math.abs(i[u]-n||1);for(let t=r;t<=a;++t){const e=i[t],r=o[t],a=iu(Math.abs(n-e)*m)*h[t],u=e*a;s+=a,l+=u,d+=r*a,p+=r*u,g+=e*u}const[y,v]=Ya(l/s,d/s,p/s,g/s);c[t]=y+v*n,f[t]=Math.abs(o[t]-c[t]),ou(i,t+1,e)}if(2===t)break;const n=fe(f);if(Math.abs(n)<1e-12)break;for(let t,e,r=0;r<s;++r)t=f[r]/(6*n),h[r]=t>=1?1e-12:(e=1-t*t)*e}return function(t,e,n,r){const i=t.length,o=[];let a,u=0,s=0,l=[];for(;u<i;++u)a=t[u]+n,l[0]===a?l[1]+=(e[u]-l[1])/++s:(s=0,l[1]+=r,l=[a,e[u]],o.push(l));return l[1]+=r,o}(i,c,a,u)}function iu(t){return(t=1-t*t*t)*t*t}function ou(t,e,n){const r=t[e];let i=n[0],o=n[1]+1;if(!(o>=t.length))for(;e>i&&t[o]-r<=r-t[i];)n[0]=++i,n[1]=o,++o}const au=.1*Math.PI/180;function uu(t,e,n,r){n=n||25,r=Math.max(n,r||200);const i=e=>[e,t(e)],o=e[0],a=e[1],u=a-o,s=u/r,l=[i(o)],c=[];if(n===r){for(let t=1;t<r;++t)l.push(i(o+t/n*u));return l.push(i(a)),l}c.push(i(a));for(let t=n;--t>0;)c.push(i(o+t/n*u));let f=l[0],h=c[c.length-1];for(;h;){const t=i((f[0]+h[0])/2);t[0]-f[0]>=s&&su(f,t,h)>au?c.push(t):(f=h,l.push(h),c.pop()),h=c[c.length-1]}return l}function su(t,e,n){const r=Math.atan2(n[1]-t[1],n[0]-t[0]),i=Math.atan2(e[1]-t[1],e[0]-t[0]);return Math.abs(r-i)}function lu(t){return t&&t.length?1===t.length?t[0]:(e=t,t=>{const n=e.length;let r=1,i=String(e[0](t));for(;r<n;++r)i+="|"+e[r](t);return i}):function(){return""};var e}function cu(t,e,n){return n||t+(e?"_"+e:"")}const fu=()=>{},hu={init:fu,add:fu,rem:fu,idx:0},du={values:{init:t=>t.cell.store=!0,value:t=>t.cell.data.values(),idx:-1},count:{value:t=>t.cell.num},__count__:{value:t=>t.missing+t.valid},missing:{value:t=>t.missing},valid:{value:t=>t.valid},sum:{init:t=>t.sum=0,value:t=>t.sum,add:(t,e)=>t.sum+=+e,rem:(t,e)=>t.sum-=e},product:{init:t=>t.product=1,value:t=>t.valid?t.product:void 0,add:(t,e)=>t.product*=e,rem:(t,e)=>t.product/=e},mean:{init:t=>t.mean=0,value:t=>t.valid?t.mean:void 0,add:(t,e)=>(t.mean_d=e-t.mean,t.mean+=t.mean_d/t.valid),rem:(t,e)=>(t.mean_d=e-t.mean,t.mean-=t.valid?t.mean_d/t.valid:t.mean)},average:{value:t=>t.valid?t.mean:void 0,req:["mean"],idx:1},variance:{init:t=>t.dev=0,value:t=>t.valid>1?t.dev/(t.valid-1):void 0,add:(t,e)=>t.dev+=t.mean_d*(e-t.mean),rem:(t,e)=>t.dev-=t.mean_d*(e-t.mean),req:["mean"],idx:1},variancep:{value:t=>t.valid>1?t.dev/t.valid:void 0,req:["variance"],idx:2},stdev:{value:t=>t.valid>1?Math.sqrt(t.dev/(t.valid-1)):void 0,req:["variance"],idx:2},stdevp:{value:t=>t.valid>1?Math.sqrt(t.dev/t.valid):void 0,req:["variance"],idx:2},stderr:{value:t=>t.valid>1?Math.sqrt(t.dev/(t.valid*(t.valid-1))):void 0,req:["variance"],idx:2},distinct:{value:t=>t.cell.data.distinct(t.get),req:["values"],idx:3},ci0:{value:t=>t.cell.data.ci0(t.get),req:["values"],idx:3},ci1:{value:t=>t.cell.data.ci1(t.get),req:["values"],idx:3},median:{value:t=>t.cell.data.q2(t.get),req:["values"],idx:3},q1:{value:t=>t.cell.data.q1(t.get),req:["values"],idx:3},q3:{value:t=>t.cell.data.q3(t.get),req:["values"],idx:3},min:{init:t=>t.min=void 0,value:t=>t.min=Number.isNaN(t.min)?t.cell.data.min(t.get):t.min,add:(t,e)=>{(e<t.min||void 0===t.min)&&(t.min=e)},rem:(t,e)=>{e<=t.min&&(t.min=NaN)},req:["values"],idx:4},max:{init:t=>t.max=void 0,value:t=>t.max=Number.isNaN(t.max)?t.cell.data.max(t.get):t.max,add:(t,e)=>{(e>t.max||void 0===t.max)&&(t.max=e)},rem:(t,e)=>{e>=t.max&&(t.max=NaN)},req:["values"],idx:4},argmin:{init:t=>t.argmin=void 0,value:t=>t.argmin||t.cell.data.argmin(t.get),add:(t,e,n)=>{e<t.min&&(t.argmin=n)},rem:(t,e)=>{e<=t.min&&(t.argmin=void 0)},req:["min","values"],idx:3},argmax:{init:t=>t.argmax=void 0,value:t=>t.argmax||t.cell.data.argmax(t.get),add:(t,e,n)=>{e>t.max&&(t.argmax=n)},rem:(t,e)=>{e>=t.max&&(t.argmax=void 0)},req:["max","values"],idx:3}},pu=Object.keys(du);function gu(t,e){return du[t](e)}function mu(t,e){return t.idx-e.idx}function yu(){this.valid=0,this.missing=0,this._ops.forEach((t=>t.init(this)))}function vu(t,e){null!=t&&""!==t?t==t&&(++this.valid,this._ops.forEach((n=>n.add(this,t,e)))):++this.missing}function _u(t,e){null!=t&&""!==t?t==t&&(--this.valid,this._ops.forEach((n=>n.rem(this,t,e)))):--this.missing}function xu(t){return this._out.forEach((e=>t[e.out]=e.value(this))),t}function bu(t,e){const n=e||h,r=function(t){const e={};t.forEach((t=>e[t.name]=t));const n=t=>{t.req&&t.req.forEach((t=>{e[t]||n(e[t]=du[t]())}))};return t.forEach(n),Object.values(e).sort(mu)}(t),i=t.slice().sort(mu);function o(t){this._ops=r,this._out=i,this.cell=t,this.init()}return o.prototype.init=yu,o.prototype.add=vu,o.prototype.rem=_u,o.prototype.set=xu,o.prototype.get=n,o.fields=t.map((t=>t.out)),o}function wu(t){this._key=t?c(t):Ro,this.reset()}pu.forEach((t=>{du[t]=function(t,e){return n=>tt({name:t,out:n||t},hu,e)}(t,du[t])}));const ku=wu.prototype;function Au(t){ga.call(this,null,t),this._adds=[],this._mods=[],this._alen=0,this._mlen=0,this._drop=!0,this._cross=!1,this._dims=[],this._dnames=[],this._measures=[],this._countOnly=!1,this._counts=null,this._prev=null,this._inputs=null,this._outputs=null}ku.reset=function(){this._add=[],this._rem=[],this._ext=null,this._get=null,this._q=null},ku.add=function(t){this._add.push(t)},ku.rem=function(t){this._rem.push(t)},ku.values=function(){if(this._get=null,0===this._rem.length)return this._add;const t=this._add,e=this._rem,n=this._key,r=t.length,i=e.length,o=Array(r-i),a={};let u,s,l;for(u=0;u<i;++u)a[n(e[u])]=1;for(u=0,s=0;u<r;++u)a[n(l=t[u])]?a[n(l)]=0:o[s++]=l;return this._rem=[],this._add=o},ku.distinct=function(t){const e=this.values(),n={};let r,i=e.length,o=0;for(;--i>=0;)r=t(e[i])+"",it(n,r)||(n[r]=1,++o);return o},ku.extent=function(t){if(this._get!==t||!this._ext){const e=this.values(),n=nt(e,t);this._ext=[e[n[0]],e[n[1]]],this._get=t}return this._ext},ku.argmin=function(t){return this.extent(t)[0]||{}},ku.argmax=function(t){return this.extent(t)[1]||{}},ku.min=function(t){const e=this.extent(t)[0];return null!=e?t(e):void 0},ku.max=function(t){const e=this.extent(t)[1];return null!=e?t(e):void 0},ku.quartile=function(t){return this._get===t&&this._q||(this._q=ba(this.values(),t),this._get=t),this._q},ku.q1=function(t){return this.quartile(t)[0]},ku.q2=function(t){return this.quartile(t)[1]},ku.q3=function(t){return this.quartile(t)[2]},ku.ci=function(t){return this._get===t&&this._ci||(this._ci=Aa(this.values(),1e3,.05,t),this._get=t),this._ci},ku.ci0=function(t){return this.ci(t)[0]},ku.ci1=function(t){return this.ci(t)[1]},Au.Definition={type:"Aggregate",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:pu},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"drop",type:"boolean",default:!0},{name:"cross",type:"boolean",default:!1},{name:"key",type:"field"}]},st(Au,ga,{transform(t,e){const n=this,r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.modified();return n.stamp=r.stamp,n.value&&(i||e.modified(n._inputs,!0))?(n._prev=n.value,n.value=i?n.init(t):{},e.visit(e.SOURCE,(t=>n.add(t)))):(n.value=n.value||n.init(t),e.visit(e.REM,(t=>n.rem(t))),e.visit(e.ADD,(t=>n.add(t)))),r.modifies(n._outputs),n._drop=!1!==t.drop,t.cross&&n._dims.length>1&&(n._drop=!1,n.cross()),e.clean()&&n._drop&&r.clean(!0).runAfter((()=>this.clean())),n.changes(r)},cross(){const t=this,e=t.value,n=t._dnames,r=n.map((()=>({}))),i=n.length;function o(t){let e,o,a,u;for(e in t)for(a=t[e].tuple,o=0;o<i;++o)r[o][u=a[n[o]]]=u}o(t._prev),o(e),function o(a,u,s){const l=n[s],c=r[s++];for(const n in c){const r=a?a+"|"+n:n;u[l]=c[n],s<i?o(r,u,s):e[r]||t.cell(r,u)}}("",{},0)},init(t){const e=this._inputs=[],n=this._outputs=[],o={};function a(t){const n=W(i(t)),r=n.length;let a,u=0;for(;u<r;++u)o[a=n[u]]||(o[a]=1,e.push(a))}this._dims=W(t.groupby),this._dnames=this._dims.map((t=>{const e=r(t);return a(t),n.push(e),e})),this.cellkey=t.key?t.key:lu(this._dims),this._countOnly=!0,this._counts=[],this._measures=[];const u=t.fields||[null],l=t.ops||["count"],c=t.as||[],f=u.length,h={};let d,p,g,m,y,v;for(f!==l.length&&s("Unmatched number of fields and aggregate ops."),v=0;v<f;++v)d=u[v],p=l[v],null==d&&"count"!==p&&s("Null aggregate field specified."),m=r(d),y=cu(p,m,c[v]),n.push(y),"count"!==p?(g=h[m],g||(a(d),g=h[m]=[],g.field=d,this._measures.push(g)),"count"!==p&&(this._countOnly=!1),g.push(gu(p,y))):this._counts.push(y);return this._measures=this._measures.map((t=>bu(t,t.field))),{}},cellkey:lu(),cell(t,e){let n=this.value[t];return n?0===n.num&&this._drop&&n.stamp<this.stamp?(n.stamp=this.stamp,this._adds[this._alen++]=n):n.stamp<this.stamp&&(n.stamp=this.stamp,this._mods[this._mlen++]=n):(n=this.value[t]=this.newcell(t,e),this._adds[this._alen++]=n),n},newcell(t,e){const n={key:t,num:0,agg:null,tuple:this.newtuple(e,this._prev&&this._prev[t]),stamp:this.stamp,store:!1};if(!this._countOnly){const t=this._measures,e=t.length;n.agg=Array(e);for(let r=0;r<e;++r)n.agg[r]=new t[r](n)}return n.store&&(n.data=new wu),n},newtuple(t,e){const n=this._dnames,r=this._dims,i=r.length,o={};for(let e=0;e<i;++e)o[n[e]]=r[e](t);return e?Po(e.tuple,o):qo(o)},clean(){const t=this.value;for(const e in t)0===t[e].num&&delete t[e]},add(t){const e=this.cellkey(t),n=this.cell(e,t);if(n.num+=1,this._countOnly)return;n.store&&n.data.add(t);const r=n.agg;for(let e=0,n=r.length;e<n;++e)r[e].add(r[e].get(t),t)},rem(t){const e=this.cellkey(t),n=this.cell(e,t);if(n.num-=1,this._countOnly)return;n.store&&n.data.rem(t);const r=n.agg;for(let e=0,n=r.length;e<n;++e)r[e].rem(r[e].get(t),t)},celltuple(t){const e=t.tuple,n=this._counts;t.store&&t.data.values();for(let r=0,i=n.length;r<i;++r)e[n[r]]=t.num;if(!this._countOnly){const n=t.agg;for(let t=0,r=n.length;t<r;++t)n[t].set(e)}return e},changes(t){const e=this._adds,n=this._mods,r=this._prev,i=this._drop,o=t.add,a=t.rem,u=t.mod;let s,l,c,f;if(r)for(l in r)s=r[l],i&&!s.num||a.push(s.tuple);for(c=0,f=this._alen;c<f;++c)o.push(this.celltuple(e[c])),e[c]=null;for(c=0,f=this._mlen;c<f;++c)s=n[c],(0===s.num&&i?a:u).push(this.celltuple(s)),n[c]=null;return this._alen=this._mlen=0,this._prev=null,t}});function Mu(t){ga.call(this,null,t)}function Eu(t,e,n){const r=t;let i=e||[],o=n||[],a={},u=0;return{add:t=>o.push(t),remove:t=>a[r(t)]=++u,size:()=>i.length,data:(t,e)=>(u&&(i=i.filter((t=>!a[r(t)])),a={},u=0),e&&t&&i.sort(t),o.length&&(i=t?_t(t,i,o.sort(t)):i.concat(o),o=[]),i)}}function Du(t){ga.call(this,[],t)}function Cu(t){Xo.call(this,null,Fu,t)}function Fu(t){return this.value&&!t.modified()?this.value:V(t.fields,t.orders)}function Su(t){ga.call(this,null,t)}function Bu(t){ga.call(this,null,t)}Mu.Definition={type:"Bin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"anchor",type:"number"},{name:"maxbins",type:"number",default:20},{name:"base",type:"number",default:10},{name:"divide",type:"number",array:!0,default:[5,2]},{name:"extent",type:"number",array:!0,length:2,required:!0},{name:"span",type:"number"},{name:"step",type:"number"},{name:"steps",type:"number",array:!0},{name:"minstep",type:"number",default:0},{name:"nice",type:"boolean",default:!0},{name:"name",type:"string"},{name:"as",type:"string",array:!0,length:2,default:["bin0","bin1"]}]},st(Mu,ga,{transform(t,e){const n=!1!==t.interval,r=this._bins(t),o=r.start,a=r.step,u=t.as||["bin0","bin1"],s=u[0],l=u[1];let c;return c=t.modified()?(e=e.reflow(!0)).SOURCE:e.modified(i(t.field))?e.ADD_MOD:e.ADD,e.visit(c,n?t=>{const e=r(t);t[s]=e,t[l]=null==e?null:o+a*(1+(e-o)/a)}:t=>t[s]=r(t)),e.modifies(n?u:s)},_bins(t){if(this.value&&!t.modified())return this.value;const e=t.field,o=ka(t),a=o.step;let u,s,l=o.start,c=l+Math.ceil((o.stop-l)/a)*a;null!=(u=t.anchor)&&(s=u-(l+a*Math.floor((u-l)/a)),l+=s,c+=s);const f=function(t){let n=E(e(t));return null==n?null:n<l?-1/0:n>c?1/0:(n=Math.max(l,Math.min(n,c-a)),l+a*Math.floor(1e-14+(n-l)/a))};return f.start=l,f.stop=o.stop,f.step=a,this.value=n(f,i(e),t.name||"bin_"+r(e))}}),Du.Definition={type:"Collect",metadata:{source:!0},params:[{name:"sort",type:"compare"}]},st(Du,ga,{transform(t,e){const n=e.fork(e.ALL),r=Eu(Ro,this.value,n.materialize(n.ADD).add),i=t.sort,o=e.changed()||i&&(t.modified("sort")||e.modified(i.fields));return n.visit(n.REM,r.remove),this.modified(o),this.value=n.source=r.data(jo(i),o),e.source&&e.source.root&&(this.value.root=e.source.root),n}}),st(Cu,Xo),Su.Definition={type:"CountPattern",metadata:{generates:!0,changes:!0},params:[{name:"field",type:"field",required:!0},{name:"case",type:"enum",values:["upper","lower","mixed"],default:"mixed"},{name:"pattern",type:"string",default:'[\\w"]+'},{name:"stopwords",type:"string",default:""},{name:"as",type:"string",array:!0,length:2,default:["text","count"]}]},st(Su,ga,{transform(t,e){const n=e=>n=>{for(var r,i=function(t,e,n){switch(e){case"upper":t=t.toUpperCase();break;case"lower":t=t.toLowerCase()}return t.match(n)}(u(n),t.case,o)||[],s=0,l=i.length;s<l;++s)a.test(r=i[s])||e(r)},r=this._parameterCheck(t,e),i=this._counts,o=this._match,a=this._stop,u=t.field,s=t.as||["text","count"],l=n((t=>i[t]=1+(i[t]||0))),c=n((t=>i[t]-=1));return r?e.visit(e.SOURCE,l):(e.visit(e.ADD,l),e.visit(e.REM,c)),this._finish(e,s)},_parameterCheck(t,e){let n=!1;return!t.modified("stopwords")&&this._stop||(this._stop=new RegExp("^"+(t.stopwords||"")+"$","i"),n=!0),!t.modified("pattern")&&this._match||(this._match=new RegExp(t.pattern||"[\\w']+","g"),n=!0),(t.modified("field")||e.modified(t.field.fields))&&(n=!0),n&&(this._counts={}),n},_finish(t,e){const n=this._counts,r=this._tuples||(this._tuples={}),i=e[0],o=e[1],a=t.fork(t.NO_SOURCE|t.NO_FIELDS);let u,s,l;for(u in n)s=r[u],l=n[u]||0,!s&&l?(r[u]=s=qo({}),s[i]=u,s[o]=l,a.add.push(s)):0===l?(s&&a.rem.push(s),n[u]=null,r[u]=null):s[o]!==l&&(s[o]=l,a.mod.push(s));return a.modifies(e)}}),Bu.Definition={type:"Cross",metadata:{generates:!0},params:[{name:"filter",type:"expr"},{name:"as",type:"string",array:!0,length:2,default:["a","b"]}]},st(Bu,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.as||["a","b"],i=r[0],o=r[1],a=!this.value||e.changed(e.ADD_REM)||t.modified("as")||t.modified("filter");let u=this.value;return a?(u&&(n.rem=u),u=e.materialize(e.SOURCE).source,n.add=this.value=function(t,e,n,r){for(var i,o,a=[],u={},s=t.length,l=0;l<s;++l)for(u[e]=o=t[l],i=0;i<s;++i)u[n]=t[i],r(u)&&(a.push(qo(u)),(u={})[e]=o);return a}(u,i,o,t.filter||g)):n.mod=u,n.source=this.value,n.modifies(r)}});const Tu={kde:Na,mixture:Ua,normal:za,lognormal:La,uniform:Ha},zu="function";function Nu(t,e){const n=t.function;it(Tu,n)||s("Unknown distribution function: "+n);const r=Tu[n]();for(const n in t)"field"===n?r.data((t.from||e()).map(t[n])):"distributions"===n?r[n](t[n].map((t=>Nu(t,e)))):typeof r[n]===zu&&r[n](t[n]);return r}function Ou(t){ga.call(this,null,t)}const Ru=[{key:{function:"normal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"lognormal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"uniform"},params:[{name:"min",type:"number",default:0},{name:"max",type:"number",default:1}]},{key:{function:"kde"},params:[{name:"field",type:"field",required:!0},{name:"from",type:"data"},{name:"bandwidth",type:"number",default:0}]}],$u={key:{function:"mixture"},params:[{name:"distributions",type:"param",array:!0,params:Ru},{name:"weights",type:"number",array:!0}]};function qu(t,e){return t?t.map(((t,n)=>e[n]||r(t))):null}function Lu(t,e,n){const r=[],i=t=>t(s);let o,a,u,s,l,c;if(null==e)r.push(t.map(n));else for(o={},a=0,u=t.length;a<u;++a)s=t[a],l=e.map(i),c=o[l],c||(o[l]=c=[],c.dims=l,r.push(c)),c.push(n(s));return r}Ou.Definition={type:"Density",metadata:{generates:!0},params:[{name:"extent",type:"number",array:!0,length:2},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"method",type:"string",default:"pdf",values:["pdf","cdf"]},{name:"distribution",type:"param",params:Ru.concat($u)},{name:"as",type:"string",array:!0,default:["value","density"]}]},st(Ou,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const r=Nu(t.distribution,function(t){return()=>t.materialize(t.SOURCE).source}(e)),i=t.steps||t.minsteps||25,o=t.steps||t.maxsteps||200;let a=t.method||"pdf";"pdf"!==a&&"cdf"!==a&&s("Invalid density method: "+a),t.extent||r.data||s("Missing density extent parameter."),a=r[a];const u=t.as||["value","density"],l=uu(a,t.extent||et(r.data()),i,o).map((t=>{const e={};return e[u[0]]=t[0],e[u[1]]=t[1],qo(e)}));this.value&&(n.rem=this.value),this.value=n.add=n.source=l}return n}});function Uu(t){ga.call(this,null,t)}Uu.Definition={type:"DotBin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"step",type:"number"},{name:"smooth",type:"boolean",default:!1},{name:"as",type:"string",default:"bin"}]};function Pu(t){Xo.call(this,null,ju,t),this.modified(!0)}function ju(t){const e=t.expr;return this.value&&!t.modified("expr")?this.value:n((n=>e(n,t)),i(e),r(e))}function Iu(t){ga.call(this,[void 0,void 0],t)}function Wu(t,e){Xo.call(this,t),this.parent=e,this.count=0}function Hu(t){ga.call(this,{},t),this._keys=at();const e=this._targets=[];e.active=0,e.forEach=t=>{for(let n=0,r=e.active;n<r;++n)t(e[n],n,e)}}function Yu(t){Xo.call(this,null,Vu,t)}function Vu(t){return this.value&&!t.modified()?this.value:_(t.name)?W(t.name).map((t=>c(t))):c(t.name,t.as)}function Gu(t){ga.call(this,at(),t)}function Xu(t){ga.call(this,[],t)}function Ju(t){ga.call(this,[],t)}function Zu(t){ga.call(this,null,t)}function Qu(t){ga.call(this,[],t)}st(Uu,ga,{transform(t,e){if(this.value&&!t.modified()&&!e.changed())return e;const n=e.materialize(e.SOURCE).source,r=Lu(e.source,t.groupby,h),i=t.smooth||!1,o=t.field,a=t.step||((t,e)=>wt(et(t,e))/30)(n,o),u=jo(((t,e)=>o(t)-o(e))),s=t.as||"bin",l=r.length;let c,f=1/0,d=-1/0,p=0;for(;p<l;++p){const t=r[p].sort(u);c=-1;for(const e of Ma(t,a,i,o))e<f&&(f=e),e>d&&(d=e),t[++c][s]=e}return this.value={start:f,stop:d,step:a},e.reflow(!0).modifies(s)}}),st(Pu,Xo),Iu.Definition={type:"Extent",metadata:{},params:[{name:"field",type:"field",required:!0}]},st(Iu,ga,{transform(t,e){const n=this.value,i=t.field,o=e.changed()||e.modified(i.fields)||t.modified("field");let a=n[0],u=n[1];if((o||null==a)&&(a=1/0,u=-1/0),e.visit(o?e.SOURCE:e.ADD,(t=>{const e=E(i(t));null!=e&&(e<a&&(a=e),e>u&&(u=e))})),!Number.isFinite(a)||!Number.isFinite(u)){let t=r(i);t&&(t=` for field "${t}"`),a=u=void 0}this.value=[a,u]}}),st(Wu,Xo,{connect(t){return this.detachSubflow=t.detachSubflow,this.targets().add(t),t.source=this},add(t){this.count+=1,this.value.add.push(t)},rem(t){this.count-=1,this.value.rem.push(t)},mod(t){this.value.mod.push(t)},init(t){this.value.init(t,t.NO_SOURCE)},evaluate(){return this.value}}),st(Hu,ga,{activate(t){this._targets[this._targets.active++]=t},subflow(t,e,n,r){const i=this.value;let o,a,u=it(i,t)&&i[t];return u?u.value.stamp<n.stamp&&(u.init(n),this.activate(u)):(a=r||(a=this._group[t])&&a.tuple,o=n.dataflow,u=new Wu(n.fork(n.NO_SOURCE),this),o.add(u).connect(e(o,t,a)),i[t]=u,this.activate(u)),u},clean(){const t=this.value;let e=0;for(const n in t)if(0===t[n].count){const r=t[n].detachSubflow;r&&r(),delete t[n],++e}if(e){const t=this._targets.filter((t=>t&&t.count>0));this.initTargets(t)}},initTargets(t){const e=this._targets,n=e.length,r=t?t.length:0;let i=0;for(;i<r;++i)e[i]=t[i];for(;i<n&&null!=e[i];++i)e[i]=null;e.active=r},transform(t,e){const n=e.dataflow,r=t.key,i=t.subflow,o=this._keys,a=t.modified("key"),u=t=>this.subflow(t,i,e);return this._group=t.group||{},this.initTargets(),e.visit(e.REM,(t=>{const e=Ro(t),n=o.get(e);void 0!==n&&(o.delete(e),u(n).rem(t))})),e.visit(e.ADD,(t=>{const e=r(t);o.set(Ro(t),e),u(e).add(t)})),a||e.modified(r.fields)?e.visit(e.MOD,(t=>{const e=Ro(t),n=o.get(e),i=r(t);n===i?u(i).mod(t):(o.set(e,i),u(n).rem(t),u(i).add(t))})):e.changed(e.MOD)&&e.visit(e.MOD,(t=>{u(o.get(Ro(t))).mod(t)})),a&&e.visit(e.REFLOW,(t=>{const e=Ro(t),n=o.get(e),i=r(t);n!==i&&(o.set(e,i),u(n).rem(t),u(i).add(t))})),e.clean()?n.runAfter((()=>{this.clean(),o.clean()})):o.empty>n.cleanThreshold&&n.runAfter(o.clean),e}}),st(Yu,Xo),Gu.Definition={type:"Filter",metadata:{changes:!0},params:[{name:"expr",type:"expr",required:!0}]},st(Gu,ga,{transform(t,e){const n=e.dataflow,r=this.value,i=e.fork(),o=i.add,a=i.rem,u=i.mod,s=t.expr;let l=!0;function c(e){const n=Ro(e),i=s(e,t),c=r.get(n);i&&c?(r.delete(n),o.push(e)):i||c?l&&i&&!c&&u.push(e):(r.set(n,1),a.push(e))}return e.visit(e.REM,(t=>{const e=Ro(t);r.has(e)?r.delete(e):a.push(t)})),e.visit(e.ADD,(e=>{s(e,t)?o.push(e):r.set(Ro(e),1)})),e.visit(e.MOD,c),t.modified()&&(l=!1,e.visit(e.REFLOW,c)),r.empty>n.cleanThreshold&&n.runAfter(r.clean),i}}),Xu.Definition={type:"Flatten",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"index",type:"string"},{name:"as",type:"string",array:!0}]},st(Xu,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.fields,i=qu(r,t.as||[]),o=t.index||null,a=i.length;return n.rem=this.value,e.visit(e.SOURCE,(t=>{const e=r.map((e=>e(t))),u=e.reduce(((t,e)=>Math.max(t,e.length)),0);let s,l,c,f=0;for(;f<u;++f){for(l=Lo(t),s=0;s<a;++s)l[i[s]]=null==(c=e[s][f])?null:c;o&&(l[o]=f),n.add.push(l)}})),this.value=n.source=n.add,o&&n.modifies(o),n.modifies(i)}}),Ju.Definition={type:"Fold",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0,length:2,default:["key","value"]}]},st(Ju,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE),i=t.fields,o=i.map(r),a=t.as||["key","value"],u=a[0],s=a[1],l=i.length;return n.rem=this.value,e.visit(e.SOURCE,(t=>{for(let e,r=0;r<l;++r)e=Lo(t),e[u]=o[r],e[s]=i[r](t),n.add.push(e)})),this.value=n.source=n.add,n.modifies(a)}}),Zu.Definition={type:"Formula",metadata:{modifies:!0},params:[{name:"expr",type:"expr",required:!0},{name:"as",type:"string",required:!0},{name:"initonly",type:"boolean"}]},st(Zu,ga,{transform(t,e){const n=t.expr,r=t.as,i=t.modified(),o=t.initonly?e.ADD:i?e.SOURCE:e.modified(n.fields)||e.modified(r)?e.ADD_MOD:e.ADD;return i&&(e=e.materialize().reflow(!0)),t.initonly||e.modifies(r),e.visit(o,(e=>e[r]=n(e,t)))}}),st(Qu,ga,{transform(t,e){const n=e.fork(e.ALL),r=t.generator;let i,o,a,u=this.value,s=t.size-u.length;if(s>0){for(i=[];--s>=0;)i.push(a=qo(r(t))),u.push(a);n.add=n.add.length?n.materialize(n.ADD).add.concat(i):i}else o=u.slice(0,-s),n.rem=n.rem.length?n.materialize(n.REM).rem.concat(o):o,u=u.slice(-s);return n.source=this.value=u,n}});const Ku={value:"value",median:fe,mean:function(t,e){let n=0,r=0;if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(++n,r+=e);else{let i=-1;for(let o of t)null!=(o=e(o,++i,t))&&(o=+o)>=o&&(++n,r+=o)}if(n)return r/n},min:ae,max:oe},ts=[];function es(t){ga.call(this,[],t)}function ns(t){Au.call(this,t)}function rs(t){ga.call(this,null,t)}function is(t){Xo.call(this,null,os,t)}function os(t){return this.value&&!t.modified()?this.value:mt(t.fields,t.flat)}function as(t){ga.call(this,[],t),this._pending=null}function us(t,e,n){n.forEach(qo);const r=e.fork(e.NO_FIELDS&e.NO_SOURCE);return r.rem=t.value,t.value=r.source=r.add=n,t._pending=null,r.rem.length&&r.clean(!0),r}function ss(t){ga.call(this,{},t)}function ls(t){Xo.call(this,null,cs,t)}function cs(t){if(this.value&&!t.modified())return this.value;const e=t.extents,n=e.length;let r,i,o=1/0,a=-1/0;for(r=0;r<n;++r)i=e[r],i[0]<o&&(o=i[0]),i[1]>a&&(a=i[1]);return[o,a]}function fs(t){Xo.call(this,null,hs,t)}function hs(t){return this.value&&!t.modified()?this.value:t.values.reduce(((t,e)=>t.concat(e)),[])}function ds(t){ga.call(this,null,t)}function ps(t){Au.call(this,t)}function gs(t){Hu.call(this,t)}function ms(t){ga.call(this,null,t)}function ys(t){ga.call(this,null,t)}function vs(t){ga.call(this,null,t)}es.Definition={type:"Impute",metadata:{changes:!0},params:[{name:"field",type:"field",required:!0},{name:"key",type:"field",required:!0},{name:"keyvals",array:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"enum",default:"value",values:["value","mean","median","max","min"]},{name:"value",default:0}]},st(es,ga,{transform(t,e){var n,i,o,a,u,l,c,f,h,d,p=e.fork(e.ALL),g=function(t){var e,n=t.method||Ku.value;if(null!=Ku[n])return n===Ku.value?(e=void 0!==t.value?t.value:0,()=>e):Ku[n];s("Unrecognized imputation method: "+n)}(t),m=function(t){const e=t.field;return t=>t?e(t):NaN}(t),y=r(t.field),v=r(t.key),_=(t.groupby||[]).map(r),x=function(t,e,n,r){var i,o,a,u,s,l,c,f,h=t=>t(f),d=[],p=r?r.slice():[],g={},m={};for(p.forEach(((t,e)=>g[t]=e+1)),u=0,c=t.length;u<c;++u)l=n(f=t[u]),s=g[l]||(g[l]=p.push(l)),(a=m[o=(i=e?e.map(h):ts)+""])||(a=m[o]=[],d.push(a),a.values=i),a[s-1]=f;return d.domain=p,d}(e.source,t.groupby,t.key,t.keyvals),b=[],w=this.value,k=x.domain.length;for(u=0,f=x.length;u<f;++u)for(o=(n=x[u]).values,i=NaN,c=0;c<k;++c)if(null==n[c]){for(a=x.domain[c],d={_impute:!0},l=0,h=o.length;l<h;++l)d[_[l]]=o[l];d[v]=a,d[y]=Number.isNaN(i)?i=g(n,m):i,b.push(qo(d))}return b.length&&(p.add=p.materialize(p.ADD).add.concat(b)),w.length&&(p.rem=p.materialize(p.REM).rem.concat(w)),this.value=b,p}}),ns.Definition={type:"JoinAggregate",metadata:{modifies:!0},params:[{name:"groupby",type:"field",array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"ops",type:"enum",array:!0,values:pu},{name:"as",type:"string",null:!0,array:!0},{name:"key",type:"field"}]},st(ns,Au,{transform(t,e){const n=this,r=t.modified();let i;return n.value&&(r||e.modified(n._inputs,!0))?(i=n.value=r?n.init(t):{},e.visit(e.SOURCE,(t=>n.add(t)))):(i=n.value=n.value||this.init(t),e.visit(e.REM,(t=>n.rem(t))),e.visit(e.ADD,(t=>n.add(t)))),n.changes(),e.visit(e.SOURCE,(t=>{tt(t,i[n.cellkey(t)].tuple)})),e.reflow(r).modifies(this._outputs)},changes(){const t=this._adds,e=this._mods;let n,r;for(n=0,r=this._alen;n<r;++n)this.celltuple(t[n]),t[n]=null;for(n=0,r=this._mlen;n<r;++n)this.celltuple(e[n]),e[n]=null;this._alen=this._mlen=0}}),rs.Definition={type:"KDE",metadata:{generates:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"cumulative",type:"boolean",default:!1},{name:"counts",type:"boolean",default:!1},{name:"bandwidth",type:"number",default:0},{name:"extent",type:"number",array:!0,length:2},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"as",type:"string",array:!0,default:["value","density"]}]},st(rs,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=e.materialize(e.SOURCE).source,o=Lu(i,t.groupby,t.field),a=(t.groupby||[]).map(r),u=t.bandwidth,l=t.cumulative?"cdf":"pdf",c=t.as||["value","density"],f=[];let h=t.extent,d=t.steps||t.minsteps||25,p=t.steps||t.maxsteps||200;"pdf"!==l&&"cdf"!==l&&s("Invalid density method: "+l),"shared"===t.resolve&&(h||(h=et(i,t.field)),d=p=t.steps||p),o.forEach((e=>{const n=Na(e,u)[l],r=t.counts?e.length:1;uu(n,h||et(e),d,p).forEach((t=>{const n={};for(let t=0;t<a.length;++t)n[a[t]]=e.dims[t];n[c[0]]=t[0],n[c[1]]=t[1]*r,f.push(qo(n))}))})),this.value&&(n.rem=this.value),this.value=n.add=n.source=f}return n}}),st(is,Xo),st(as,ga,{transform(t,e){const n=e.dataflow;if(this._pending)return us(this,e,this._pending);if(function(t){return t.modified("async")&&!(t.modified("values")||t.modified("url")||t.modified("format"))}(t))return e.StopPropagation;if(t.values)return us(this,e,n.parse(t.values,t.format));if(t.async){return{async:n.request(t.url,t.format).then((t=>(this._pending=W(t.data),t=>t.touch(this))))}}return n.request(t.url,t.format).then((t=>us(this,e,W(t.data))))}}),ss.Definition={type:"Lookup",metadata:{modifies:!0},params:[{name:"index",type:"index",params:[{name:"from",type:"data",required:!0},{name:"key",type:"field",required:!0}]},{name:"values",type:"field",array:!0},{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0},{name:"default",default:null}]},st(ss,ga,{transform(t,e){const n=t.fields,i=t.index,o=t.values,a=null==t.default?null:t.default,u=t.modified(),l=n.length;let c,f,h,d=u?e.SOURCE:e.ADD,p=e,g=t.as;return o?(f=o.length,l>1&&!g&&s('Multi-field lookup requires explicit "as" parameter.'),g&&g.length!==l*f&&s('The "as" parameter has too few output field names.'),g=g||o.map(r),c=function(t){for(var e,r,u=0,s=0;u<l;++u)if(null==(r=i.get(n[u](t))))for(e=0;e<f;++e,++s)t[g[s]]=a;else for(e=0;e<f;++e,++s)t[g[s]]=o[e](r)}):(g||s("Missing output field names."),c=function(t){for(var e,r=0;r<l;++r)e=i.get(n[r](t)),t[g[r]]=null==e?a:e}),u?p=e.reflow(!0):(h=n.some((t=>e.modified(t.fields))),d|=h?e.MOD:0),e.visit(d,c),p.modifies(g)}}),st(ls,Xo),st(fs,Xo),st(ds,ga,{transform(t,e){return this.modified(t.modified()),this.value=t,e.fork(e.NO_SOURCE|e.NO_FIELDS)}}),ps.Definition={type:"Pivot",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"value",type:"field",required:!0},{name:"op",type:"enum",values:pu,default:"sum"},{name:"limit",type:"number",default:0},{name:"key",type:"field"}]},st(ps,Au,{_transform:Au.prototype.transform,transform(t,e){return this._transform(function(t,e){const r=t.field,o=t.value,a=("count"===t.op?"__count__":t.op)||"sum",u=i(r).concat(i(o)),s=function(t,e,n){const r={},i=[];return n.visit(n.SOURCE,(e=>{const n=t(e);r[n]||(r[n]=1,i.push(n))})),i.sort(G),e?i.slice(0,e):i}(r,t.limit||0,e);e.changed()&&t.set("__pivot__",null,null,!0);return{key:t.key,groupby:t.groupby,ops:s.map((()=>a)),fields:s.map((t=>function(t,e,r,i){return n((n=>e(n)===t?r(n):NaN),i,t+"")}(t,r,o,u))),as:s.map((t=>t+"")),modified:t.modified.bind(t)}}(t,e),e)}}),st(gs,Hu,{transform(t,e){const n=t.subflow,r=t.field,o=t=>this.subflow(Ro(t),n,e,t);return(t.modified("field")||r&&e.modified(i(r)))&&s("PreFacet does not support field modification."),this.initTargets(),r?(e.visit(e.MOD,(t=>{const e=o(t);r(t).forEach((t=>e.mod(t)))})),e.visit(e.ADD,(t=>{const e=o(t);r(t).forEach((t=>e.add(qo(t))))})),e.visit(e.REM,(t=>{const e=o(t);r(t).forEach((t=>e.rem(t)))}))):(e.visit(e.MOD,(t=>o(t).mod(t))),e.visit(e.ADD,(t=>o(t).add(t))),e.visit(e.REM,(t=>o(t).rem(t)))),e.clean()&&e.runAfter((()=>this.clean())),e}}),ms.Definition={type:"Project",metadata:{generates:!0,changes:!0},params:[{name:"fields",type:"field",array:!0},{name:"as",type:"string",null:!0,array:!0}]},st(ms,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.fields,i=qu(t.fields,t.as||[]),o=r?(t,e)=>function(t,e,n,r){for(let i=0,o=n.length;i<o;++i)e[r[i]]=n[i](t);return e}(t,e,r,i):Uo;let a;return this.value?a=this.value:(e=e.addAll(),a=this.value={}),e.visit(e.REM,(t=>{const e=Ro(t);n.rem.push(a[e]),a[e]=null})),e.visit(e.ADD,(t=>{const e=o(t,qo({}));a[Ro(t)]=e,n.add.push(e)})),e.visit(e.MOD,(t=>{n.mod.push(o(t,a[Ro(t)]))})),n}}),st(ys,ga,{transform(t,e){return this.value=t.value,t.modified("value")?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation}}),vs.Definition={type:"Quantile",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"probs",type:"number",array:!0},{name:"step",type:"number",default:.01},{name:"as",type:"string",array:!0,default:["prob","value"]}]};function _s(t){ga.call(this,null,t)}function xs(t){ga.call(this,[],t),this.count=0}function bs(t){ga.call(this,null,t)}function ws(t){ga.call(this,null,t),this.modified(!0)}function ks(t){ga.call(this,null,t)}st(vs,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.as||["prob","value"];if(this.value&&!t.modified()&&!e.changed())return n.source=this.value,n;const o=Lu(e.materialize(e.SOURCE).source,t.groupby,t.field),a=(t.groupby||[]).map(r),u=[],s=t.step||.01,l=t.probs||de(s/2,1-1e-14,s),c=l.length;return o.forEach((t=>{const e=xa(t,l);for(let n=0;n<c;++n){const r={};for(let e=0;e<a.length;++e)r[a[e]]=t.dims[e];r[i[0]]=l[n],r[i[1]]=e[n],u.push(qo(r))}})),this.value&&(n.rem=this.value),this.value=n.add=n.source=u,n}}),st(_s,ga,{transform(t,e){let n,r;return this.value?r=this.value:(n=e=e.addAll(),r=this.value={}),t.derive&&(n=e.fork(e.NO_SOURCE),e.visit(e.REM,(t=>{const e=Ro(t);n.rem.push(r[e]),r[e]=null})),e.visit(e.ADD,(t=>{const e=Lo(t);r[Ro(t)]=e,n.add.push(e)})),e.visit(e.MOD,(t=>{const e=r[Ro(t)];for(const r in t)e[r]=t[r],n.modifies(r);n.mod.push(e)}))),n}}),xs.Definition={type:"Sample",metadata:{},params:[{name:"size",type:"number",default:1e3}]},st(xs,ga,{transform(e,n){const r=n.fork(n.NO_SOURCE),i=e.modified("size"),o=e.size,a=this.value.reduce(((t,e)=>(t[Ro(e)]=1,t)),{});let u=this.value,s=this.count,l=0;function c(e){let n,i;u.length<o?u.push(e):(i=~~((s+1)*t.random()),i<u.length&&i>=l&&(n=u[i],a[Ro(n)]&&r.rem.push(n),u[i]=e)),++s}if(n.rem.length&&(n.visit(n.REM,(t=>{const e=Ro(t);a[e]&&(a[e]=-1,r.rem.push(t)),--s})),u=u.filter((t=>-1!==a[Ro(t)]))),(n.rem.length||i)&&u.length<o&&n.source&&(l=s=u.length,n.visit(n.SOURCE,(t=>{a[Ro(t)]||c(t)})),l=-1),i&&u.length>o){const t=u.length-o;for(let e=0;e<t;++e)a[Ro(u[e])]=-1,r.rem.push(u[e]);u=u.slice(t)}return n.mod.length&&n.visit(n.MOD,(t=>{a[Ro(t)]&&r.mod.push(t)})),n.add.length&&n.visit(n.ADD,c),(n.add.length||l<0)&&(r.add=u.filter((t=>!a[Ro(t)]))),this.count=s,this.value=r.source=u,r}}),bs.Definition={type:"Sequence",metadata:{generates:!0,changes:!0},params:[{name:"start",type:"number",required:!0},{name:"stop",type:"number",required:!0},{name:"step",type:"number",default:1},{name:"as",type:"string",default:"data"}]},st(bs,ga,{transform(t,e){if(this.value&&!t.modified())return;const n=e.materialize().fork(e.MOD),r=t.as||"data";return n.rem=this.value?e.rem.concat(this.value):e.rem,this.value=de(t.start,t.stop,t.step||1).map((t=>{const e={};return e[r]=t,qo(e)})),n.add=e.add.concat(this.value),n}}),st(ws,ga,{transform(t,e){return this.value=e.source,e.changed()?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation}});const As=["unit0","unit1"];function Ms(t){ga.call(this,at(),t)}function Es(t){ga.call(this,null,t)}ks.Definition={type:"TimeUnit",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"units",type:"enum",values:_n,array:!0},{name:"step",type:"number",default:1},{name:"maxbins",type:"number",default:40},{name:"extent",type:"date",array:!0},{name:"timezone",type:"enum",default:"local",values:["local","utc"]},{name:"as",type:"string",array:!0,length:2,default:As}]},st(ks,ga,{transform(t,e){const n=t.field,r=!1!==t.interval,o="utc"===t.timezone,a=this._floor(t,e),u=(o?Xn:Gn)(a.unit).offset,s=t.as||As,l=s[0],c=s[1],f=a.step;let h=a.start||1/0,d=a.stop||-1/0,p=e.ADD;return(t.modified()||e.modified(i(n)))&&(p=(e=e.reflow(!0)).SOURCE,h=1/0,d=-1/0),e.visit(p,(t=>{const e=n(t);let i,o;null==e?(t[l]=null,r&&(t[c]=null)):(t[l]=i=o=a(e),r&&(t[c]=o=u(i,f)),i<h&&(h=i),o>d&&(d=o))})),a.start=h,a.stop=d,e.modifies(r?s:l)},_floor(t,e){const n="utc"===t.timezone,{units:r,step:i}=t.units?{units:t.units,step:t.step||1}:mr({extent:t.extent||et(e.materialize(e.SOURCE).source,t.field),maxbins:t.maxbins}),o=bn(r),a=this.value||{},u=(n?Hn:jn)(o,i);return u.unit=M(o),u.units=o,u.step=i,u.start=a.start,u.stop=a.stop,this.value=u}}),st(Ms,ga,{transform(t,e){const n=e.dataflow,r=t.field,i=this.value,o=t=>i.set(r(t),t);let a=!0;return t.modified("field")||e.modified(r.fields)?(i.clear(),e.visit(e.SOURCE,o)):e.changed()?(e.visit(e.REM,(t=>i.delete(r(t)))),e.visit(e.ADD,o)):a=!1,this.modified(a),i.empty>n.cleanThreshold&&n.runAfter(i.clean),e.fork()}}),st(Es,ga,{transform(t,e){(!this.value||t.modified("field")||t.modified("sort")||e.changed()||t.sort&&e.modified(t.sort.fields))&&(this.value=(t.sort?e.source.slice().sort(jo(t.sort)):e.source).map(t.field))}});const Ds={row_number:function(){return{next:t=>t.index+1}},rank:function(){let t;return{init:()=>t=1,next:e=>{const n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?t=n+1:t}}},dense_rank:function(){let t;return{init:()=>t=1,next:e=>{const n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?++t:t}}},percent_rank:function(){const t=Ds.rank(),e=t.next;return{init:t.init,next:t=>(e(t)-1)/(t.data.length-1)}},cume_dist:function(){let t;return{init:()=>t=0,next:e=>{const n=e.data,r=e.compare;let i=e.index;if(t<i){for(;i+1<n.length&&!r(n[i],n[i+1]);)++i;t=i}return(1+t)/n.length}}},ntile:function(t,e){(e=+e)>0||s("ntile num must be greater than zero.");const n=Ds.cume_dist(),r=n.next;return{init:n.init,next:t=>Math.ceil(e*r(t))}},lag:function(t,e){return e=+e||1,{next:n=>{const r=n.index-e;return r>=0?t(n.data[r]):null}}},lead:function(t,e){return e=+e||1,{next:n=>{const r=n.index+e,i=n.data;return r<i.length?t(i[r]):null}}},first_value:function(t){return{next:e=>t(e.data[e.i0])}},last_value:function(t){return{next:e=>t(e.data[e.i1-1])}},nth_value:function(t,e){return(e=+e)>0||s("nth_value nth must be greater than zero."),{next:n=>{const r=n.i0+(e-1);return r<n.i1?t(n.data[r]):null}}},prev_value:function(t){let e;return{init:()=>e=null,next:n=>{const r=t(n.data[n.index]);return null!=r?e=r:e}}},next_value:function(t){let e,n;return{init:()=>(e=null,n=-1),next:r=>{const i=r.data;return r.index<=n?e:(n=function(t,e,n){for(let r=e.length;n<r;++n){if(null!=t(e[n]))return n}return-1}(t,i,r.index))<0?(n=i.length,e=null):e=t(i[n])}}}};const Cs=Object.keys(Ds);function Fs(t){const e=W(t.ops),n=W(t.fields),o=W(t.params),a=W(t.as),u=this.outputs=[],l=this.windows=[],c={},f={},h=[],p=[];let g=!0;function m(t){W(i(t)).forEach((t=>c[t]=1))}m(t.sort),e.forEach(((t,e)=>{const i=n[e],c=r(i),y=cu(t,c,a[e]);if(m(i),u.push(y),it(Ds,t))l.push(function(t,e,n,r){const i=Ds[t](e,n);return{init:i.init||d,update:function(t,e){e[r]=i.next(t)}}}(t,n[e],o[e],y));else{if(null==i&&"count"!==t&&s("Null aggregate field specified."),"count"===t)return void h.push(y);g=!1;let e=f[c];e||(e=f[c]=[],e.field=i,p.push(e)),e.push(gu(t,y))}})),(h.length||p.length)&&(this.cell=function(t,e,n){t=t.map((t=>bu(t,t.field)));const r={num:0,agg:null,store:!1,count:e};if(!n)for(var i=t.length,o=r.agg=Array(i),a=0;a<i;++a)o[a]=new t[a](r);if(r.store)var u=r.data=new wu;return r.add=function(t){if(r.num+=1,!n){u&&u.add(t);for(let e=0;e<i;++e)o[e].add(o[e].get(t),t)}},r.rem=function(t){if(r.num-=1,!n){u&&u.rem(t);for(let e=0;e<i;++e)o[e].rem(o[e].get(t),t)}},r.set=function(t){let i,a;for(u&&u.values(),i=0,a=e.length;i<a;++i)t[e[i]]=r.num;if(!n)for(i=0,a=o.length;i<a;++i)o[i].set(t)},r.init=function(){r.num=0,u&&u.reset();for(let t=0;t<i;++t)o[t].init()},r}(p,h,g)),this.inputs=Object.keys(c)}const Ss=Fs.prototype;function Bs(t){ga.call(this,{},t),this._mlen=0,this._mods=[]}function Ts(t,e,n,r){const i=r.sort,o=i&&!r.ignorePeers,a=r.frame||[null,0],u=t.data(n),s=u.length,l=o?Vt(i):null,c={i0:0,i1:0,p0:0,p1:0,index:0,data:u,compare:i||Q(-1)};e.init();for(let t=0;t<s;++t)zs(c,a,t,s),o&&Ns(c,l),e.update(c,u[t])}function zs(t,e,n,r){t.p0=t.i0,t.p1=t.i1,t.i0=null==e[0]?0:Math.max(0,n-Math.abs(e[0])),t.i1=null==e[1]?r:Math.min(r,n+Math.abs(e[1])+1),t.index=n}function Ns(t,e){const n=t.i0,r=t.i1-1,i=t.compare,o=t.data,a=o.length-1;n>0&&!i(o[n],o[n-1])&&(t.i0=e.left(o,o[n])),r<a&&!i(o[r],o[r+1])&&(t.i1=e.right(o,o[r]))}Ss.init=function(){this.windows.forEach((t=>t.init())),this.cell&&this.cell.init()},Ss.update=function(t,e){const n=this.cell,r=this.windows,i=t.data,o=r&&r.length;let a;if(n){for(a=t.p0;a<t.i0;++a)n.rem(i[a]);for(a=t.p1;a<t.i1;++a)n.add(i[a]);n.set(e)}for(a=0;a<o;++a)r[a].update(t,e)},Bs.Definition={type:"Window",metadata:{modifies:!0},params:[{name:"sort",type:"compare"},{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:Cs.concat(pu)},{name:"params",type:"number",null:!0,array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"frame",type:"number",null:!0,array:!0,length:2,default:[null,0]},{name:"ignorePeers",type:"boolean",default:!1}]},st(Bs,ga,{transform(t,e){this.stamp=e.stamp;const n=t.modified(),r=jo(t.sort),i=lu(t.groupby),o=t=>this.group(i(t));let a=this.state;a&&!n||(a=this.state=new Fs(t)),n||e.modified(a.inputs)?(this.value={},e.visit(e.SOURCE,(t=>o(t).add(t)))):(e.visit(e.REM,(t=>o(t).remove(t))),e.visit(e.ADD,(t=>o(t).add(t))));for(let e=0,n=this._mlen;e<n;++e)Ts(this._mods[e],a,r,t);return this._mlen=0,this._mods=[],e.reflow(n).modifies(a.outputs)},group(t){let e=this.value[t];return e||(e=this.value[t]=Eu(Ro),e.stamp=-1),e.stamp<this.stamp&&(e.stamp=this.stamp,this._mods[this._mlen++]=e),e}});var Os=Object.freeze({__proto__:null,aggregate:Au,bin:Mu,collect:Du,compare:Cu,countpattern:Su,cross:Bu,density:Ou,dotbin:Uu,expression:Pu,extent:Iu,facet:Hu,field:Yu,filter:Gu,flatten:Xu,fold:Ju,formula:Zu,generate:Qu,impute:es,joinaggregate:ns,kde:rs,key:is,load:as,lookup:ss,multiextent:ls,multivalues:fs,params:ds,pivot:ps,prefacet:gs,project:ms,proxy:ys,quantile:vs,relay:_s,sample:xs,sequence:bs,sieve:ws,subflow:Wu,timeunit:ks,tupleindex:Ms,values:Es,window:Bs});const Rs=Math.PI,$s=2*Rs,qs=1e-6,Ls=$s-qs;function Us(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Ps(){return new Us}function js(t){return function(){return t}}Us.prototype=Ps.prototype={constructor:Us,moveTo:function(t,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,e){this._+="L"+(this._x1=+t)+","+(this._y1=+e)},quadraticCurveTo:function(t,e,n,r){this._+="Q"+ +t+","+ +e+","+(this._x1=+n)+","+(this._y1=+r)},bezierCurveTo:function(t,e,n,r,i,o){this._+="C"+ +t+","+ +e+","+ +n+","+ +r+","+(this._x1=+i)+","+(this._y1=+o)},arcTo:function(t,e,n,r,i){t=+t,e=+e,n=+n,r=+r,i=+i;var o=this._x1,a=this._y1,u=n-t,s=r-e,l=o-t,c=a-e,f=l*l+c*c;if(i<0)throw new Error("negative radius: "+i);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=e);else if(f>qs)if(Math.abs(c*u-s*l)>qs&&i){var h=n-o,d=r-a,p=u*u+s*s,g=h*h+d*d,m=Math.sqrt(p),y=Math.sqrt(f),v=i*Math.tan((Rs-Math.acos((p+f-g)/(2*m*y)))/2),_=v/y,x=v/m;Math.abs(_-1)>qs&&(this._+="L"+(t+_*l)+","+(e+_*c)),this._+="A"+i+","+i+",0,0,"+ +(c*h>l*d)+","+(this._x1=t+x*u)+","+(this._y1=e+x*s)}else this._+="L"+(this._x1=t)+","+(this._y1=e);else;},arc:function(t,e,n,r,i,o){t=+t,e=+e,o=!!o;var a=(n=+n)*Math.cos(r),u=n*Math.sin(r),s=t+a,l=e+u,c=1^o,f=o?r-i:i-r;if(n<0)throw new Error("negative radius: "+n);null===this._x1?this._+="M"+s+","+l:(Math.abs(this._x1-s)>qs||Math.abs(this._y1-l)>qs)&&(this._+="L"+s+","+l),n&&(f<0&&(f=f%$s+$s),f>Ls?this._+="A"+n+","+n+",0,1,"+c+","+(t-a)+","+(e-u)+"A"+n+","+n+",0,1,"+c+","+(this._x1=s)+","+(this._y1=l):f>qs&&(this._+="A"+n+","+n+",0,"+ +(f>=Rs)+","+c+","+(this._x1=t+n*Math.cos(i))+","+(this._y1=e+n*Math.sin(i))))},rect:function(t,e,n,r){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+e)+"h"+ +n+"v"+ +r+"h"+-n+"Z"},toString:function(){return this._}};var Is=Math.abs,Ws=Math.atan2,Hs=Math.cos,Ys=Math.max,Vs=Math.min,Gs=Math.sin,Xs=Math.sqrt,Js=1e-12,Zs=Math.PI,Qs=Zs/2,Ks=2*Zs;function tl(t){return t>1?0:t<-1?Zs:Math.acos(t)}function el(t){return t>=1?Qs:t<=-1?-Qs:Math.asin(t)}function nl(t){return t.innerRadius}function rl(t){return t.outerRadius}function il(t){return t.startAngle}function ol(t){return t.endAngle}function al(t){return t&&t.padAngle}function ul(t,e,n,r,i,o,a,u){var s=n-t,l=r-e,c=a-i,f=u-o,h=f*s-c*l;if(!(h*h<Js))return[t+(h=(c*(e-o)-f*(t-i))/h)*s,e+h*l]}function sl(t,e,n,r,i,o,a){var u=t-n,s=e-r,l=(a?o:-o)/Xs(u*u+s*s),c=l*s,f=-l*u,h=t+c,d=e+f,p=n+c,g=r+f,m=(h+p)/2,y=(d+g)/2,v=p-h,_=g-d,x=v*v+_*_,b=i-o,w=h*g-p*d,k=(_<0?-1:1)*Xs(Ys(0,b*b*x-w*w)),A=(w*_-v*k)/x,M=(-w*v-_*k)/x,E=(w*_+v*k)/x,D=(-w*v+_*k)/x,C=A-m,F=M-y,S=E-m,B=D-y;return C*C+F*F>S*S+B*B&&(A=E,M=D),{cx:A,cy:M,x01:-c,y01:-f,x11:A*(i/b-1),y11:M*(i/b-1)}}function ll(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function cl(t){this._context=t}function fl(t){return new cl(t)}function hl(t){return t[0]}function dl(t){return t[1]}function pl(t,e){var n=js(!0),r=null,i=fl,o=null;function a(a){var u,s,l,c=(a=ll(a)).length,f=!1;for(null==r&&(o=i(l=Ps())),u=0;u<=c;++u)!(u<c&&n(s=a[u],u,a))===f&&((f=!f)?o.lineStart():o.lineEnd()),f&&o.point(+t(s,u,a),+e(s,u,a));if(l)return o=null,l+""||null}return t="function"==typeof t?t:void 0===t?hl:js(t),e="function"==typeof e?e:void 0===e?dl:js(e),a.x=function(e){return arguments.length?(t="function"==typeof e?e:js(+e),a):t},a.y=function(t){return arguments.length?(e="function"==typeof t?t:js(+t),a):e},a.defined=function(t){return arguments.length?(n="function"==typeof t?t:js(!!t),a):n},a.curve=function(t){return arguments.length?(i=t,null!=r&&(o=i(r)),a):i},a.context=function(t){return arguments.length?(null==t?r=o=null:o=i(r=t),a):r},a}function gl(t,e,n){var r=null,i=js(!0),o=null,a=fl,u=null;function s(s){var l,c,f,h,d,p=(s=ll(s)).length,g=!1,m=new Array(p),y=new Array(p);for(null==o&&(u=a(d=Ps())),l=0;l<=p;++l){if(!(l<p&&i(h=s[l],l,s))===g)if(g=!g)c=l,u.areaStart(),u.lineStart();else{for(u.lineEnd(),u.lineStart(),f=l-1;f>=c;--f)u.point(m[f],y[f]);u.lineEnd(),u.areaEnd()}g&&(m[l]=+t(h,l,s),y[l]=+e(h,l,s),u.point(r?+r(h,l,s):m[l],n?+n(h,l,s):y[l]))}if(d)return u=null,d+""||null}function l(){return pl().defined(i).curve(a).context(o)}return t="function"==typeof t?t:void 0===t?hl:js(+t),e="function"==typeof e?e:js(void 0===e?0:+e),n="function"==typeof n?n:void 0===n?dl:js(+n),s.x=function(e){return arguments.length?(t="function"==typeof e?e:js(+e),r=null,s):t},s.x0=function(e){return arguments.length?(t="function"==typeof e?e:js(+e),s):t},s.x1=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:js(+t),s):r},s.y=function(t){return arguments.length?(e="function"==typeof t?t:js(+t),n=null,s):e},s.y0=function(t){return arguments.length?(e="function"==typeof t?t:js(+t),s):e},s.y1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:js(+t),s):n},s.lineX0=s.lineY0=function(){return l().x(t).y(e)},s.lineY1=function(){return l().x(t).y(n)},s.lineX1=function(){return l().x(r).y(e)},s.defined=function(t){return arguments.length?(i="function"==typeof t?t:js(!!t),s):i},s.curve=function(t){return arguments.length?(a=t,null!=o&&(u=a(o)),s):a},s.context=function(t){return arguments.length?(null==t?o=u=null:u=a(o=t),s):o},s}cl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e)}}};var ml={draw:function(t,e){var n=Math.sqrt(e/Zs);t.moveTo(n,0),t.arc(0,0,n,0,Ks)}};function yl(){}function vl(t,e,n){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+n)/6)}function _l(t){this._context=t}function xl(t){this._context=t}function bl(t){this._context=t}function wl(t,e){this._basis=new _l(t),this._beta=e}_l.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:vl(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:vl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},xl.prototype={areaStart:yl,areaEnd:yl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x2=t,this._y2=e;break;case 1:this._point=2,this._x3=t,this._y3=e;break;case 2:this._point=3,this._x4=t,this._y4=e,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+e)/6);break;default:vl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},bl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var n=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+e)/6;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:this._point=4;default:vl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},wl.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,e=this._y,n=t.length-1;if(n>0)for(var r,i=t[0],o=e[0],a=t[n]-i,u=e[n]-o,s=-1;++s<=n;)r=s/n,this._basis.point(this._beta*t[s]+(1-this._beta)*(i+r*a),this._beta*e[s]+(1-this._beta)*(o+r*u));this._x=this._y=null,this._basis.lineEnd()},point:function(t,e){this._x.push(+t),this._y.push(+e)}};var kl=function t(e){function n(t){return 1===e?new _l(t):new wl(t,e)}return n.beta=function(e){return t(+e)},n}(.85);function Al(t,e,n){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-n),t._x2,t._y2)}function Ml(t,e){this._context=t,this._k=(1-e)/6}Ml.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Al(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:Al(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var El=function t(e){function n(t){return new Ml(t,e)}return n.tension=function(e){return t(+e)},n}(0);function Dl(t,e){this._context=t,this._k=(1-e)/6}Dl.prototype={areaStart:yl,areaEnd:yl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:Al(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var Cl=function t(e){function n(t){return new Dl(t,e)}return n.tension=function(e){return t(+e)},n}(0);function Fl(t,e){this._context=t,this._k=(1-e)/6}Fl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Al(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var Sl=function t(e){function n(t){return new Fl(t,e)}return n.tension=function(e){return t(+e)},n}(0);function Bl(t,e,n){var r=t._x1,i=t._y1,o=t._x2,a=t._y2;if(t._l01_a>Js){var u=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,s=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*u-t._x0*t._l12_2a+t._x2*t._l01_2a)/s,i=(i*u-t._y0*t._l12_2a+t._y2*t._l01_2a)/s}if(t._l23_a>Js){var l=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*l+t._x1*t._l23_2a-e*t._l12_2a)/c,a=(a*l+t._y1*t._l23_2a-n*t._l12_2a)/c}t._context.bezierCurveTo(r,i,o,a,t._x2,t._y2)}function Tl(t,e){this._context=t,this._alpha=e}Tl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3;default:Bl(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var zl=function t(e){function n(t){return e?new Tl(t,e):new Ml(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function Nl(t,e){this._context=t,this._alpha=e}Nl.prototype={areaStart:yl,areaEnd:yl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:Bl(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var Ol=function t(e){function n(t){return e?new Nl(t,e):new Dl(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function Rl(t,e){this._context=t,this._alpha=e}Rl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Bl(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var $l=function t(e){function n(t){return e?new Rl(t,e):new Fl(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function ql(t){this._context=t}function Ll(t){return t<0?-1:1}function Ul(t,e,n){var r=t._x1-t._x0,i=e-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),a=(n-t._y1)/(i||r<0&&-0),u=(o*i+a*r)/(r+i);return(Ll(o)+Ll(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(u))||0}function Pl(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}function jl(t,e,n){var r=t._x0,i=t._y0,o=t._x1,a=t._y1,u=(o-r)/3;t._context.bezierCurveTo(r+u,i+u*e,o-u,a-u*n,o,a)}function Il(t){this._context=t}function Wl(t){this._context=new Hl(t)}function Hl(t){this._context=t}function Yl(t){this._context=t}function Vl(t){var e,n,r=t.length-1,i=new Array(r),o=new Array(r),a=new Array(r);for(i[0]=0,o[0]=2,a[0]=t[0]+2*t[1],e=1;e<r-1;++e)i[e]=1,o[e]=4,a[e]=4*t[e]+2*t[e+1];for(i[r-1]=2,o[r-1]=7,a[r-1]=8*t[r-1]+t[r],e=1;e<r;++e)n=i[e]/o[e-1],o[e]-=n,a[e]-=n*a[e-1];for(i[r-1]=a[r-1]/o[r-1],e=r-2;e>=0;--e)i[e]=(a[e]-i[e+1])/o[e];for(o[r-1]=(t[r]+i[r-1])/2,e=0;e<r-1;++e)o[e]=2*t[e+1]-i[e+1];return[i,o]}function Gl(t,e){this._context=t,this._t=e}function Xl(t,e){if("undefined"!=typeof document&&document.createElement){const n=document.createElement("canvas");if(n&&n.getContext)return n.width=t,n.height=e,n}return null}ql.prototype={areaStart:yl,areaEnd:yl,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,e){t=+t,e=+e,this._point?this._context.lineTo(t,e):(this._point=1,this._context.moveTo(t,e))}},Il.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:jl(this,this._t0,Pl(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var n=NaN;if(e=+e,(t=+t)!==this._x1||e!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,jl(this,Pl(this,n=Ul(this,t,e)),n);break;default:jl(this,this._t0,n=Ul(this,t,e))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=n}}},(Wl.prototype=Object.create(Il.prototype)).point=function(t,e){Il.prototype.point.call(this,e,t)},Hl.prototype={moveTo:function(t,e){this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},lineTo:function(t,e){this._context.lineTo(e,t)},bezierCurveTo:function(t,e,n,r,i,o){this._context.bezierCurveTo(e,t,r,n,o,i)}},Yl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,e=this._y,n=t.length;if(n)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),2===n)this._context.lineTo(t[1],e[1]);else for(var r=Vl(t),i=Vl(e),o=0,a=1;a<n;++o,++a)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[a],e[a]);(this._line||0!==this._line&&1===n)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,e){this._x.push(+t),this._y.push(+e)}},Gl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{var n=this._x*(1-this._t)+t*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,e)}}this._x=t,this._y=e}};const Jl=()=>"undefined"!=typeof Image?Image:null;function Zl(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}function Ql(t,e){switch(arguments.length){case 0:break;case 1:"function"==typeof t?this.interpolator(t):this.range(t);break;default:this.domain(t),"function"==typeof e?this.interpolator(e):this.range(e)}return this}const Kl=Symbol("implicit");function tc(){var t=new Map,e=[],n=[],r=Kl;function i(i){var o=i+"",a=t.get(o);if(!a){if(r!==Kl)return r;t.set(o,a=e.push(i))}return n[(a-1)%n.length]}return i.domain=function(n){if(!arguments.length)return e.slice();e=[],t=new Map;for(const r of n){const n=r+"";t.has(n)||t.set(n,e.push(r))}return i},i.range=function(t){return arguments.length?(n=Array.from(t),i):n.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return tc(e,n).unknown(r)},Zl.apply(i,arguments),i}function ec(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function nc(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function rc(){}var ic=.7,oc=1/ic,ac="\\s*([+-]?\\d+)\\s*",uc="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",sc="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",lc=/^#([0-9a-f]{3,8})$/,cc=new RegExp("^rgb\\("+[ac,ac,ac]+"\\)$"),fc=new RegExp("^rgb\\("+[sc,sc,sc]+"\\)$"),hc=new RegExp("^rgba\\("+[ac,ac,ac,uc]+"\\)$"),dc=new RegExp("^rgba\\("+[sc,sc,sc,uc]+"\\)$"),pc=new RegExp("^hsl\\("+[uc,sc,sc]+"\\)$"),gc=new RegExp("^hsla\\("+[uc,sc,sc,uc]+"\\)$"),mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function yc(){return this.rgb().formatHex()}function vc(){return this.rgb().formatRgb()}function _c(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=lc.exec(t))?(n=e[1].length,e=parseInt(e[1],16),6===n?xc(e):3===n?new Ac(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===n?bc(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===n?bc(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=cc.exec(t))?new Ac(e[1],e[2],e[3],1):(e=fc.exec(t))?new Ac(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=hc.exec(t))?bc(e[1],e[2],e[3],e[4]):(e=dc.exec(t))?bc(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=pc.exec(t))?Cc(e[1],e[2]/100,e[3]/100,1):(e=gc.exec(t))?Cc(e[1],e[2]/100,e[3]/100,e[4]):mc.hasOwnProperty(t)?xc(mc[t]):"transparent"===t?new Ac(NaN,NaN,NaN,0):null}function xc(t){return new Ac(t>>16&255,t>>8&255,255&t,1)}function bc(t,e,n,r){return r<=0&&(t=e=n=NaN),new Ac(t,e,n,r)}function wc(t){return t instanceof rc||(t=_c(t)),t?new Ac((t=t.rgb()).r,t.g,t.b,t.opacity):new Ac}function kc(t,e,n,r){return 1===arguments.length?wc(t):new Ac(t,e,n,null==r?1:r)}function Ac(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}function Mc(){return"#"+Dc(this.r)+Dc(this.g)+Dc(this.b)}function Ec(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function Dc(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function Cc(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Bc(t,e,n,r)}function Fc(t){if(t instanceof Bc)return new Bc(t.h,t.s,t.l,t.opacity);if(t instanceof rc||(t=_c(t)),!t)return new Bc;if(t instanceof Bc)return t;var e=(t=t.rgb()).r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),o=Math.max(e,n,r),a=NaN,u=o-i,s=(o+i)/2;return u?(a=e===o?(n-r)/u+6*(n<r):n===o?(r-e)/u+2:(e-n)/u+4,u/=s<.5?o+i:2-o-i,a*=60):u=s>0&&s<1?0:a,new Bc(a,u,s,t.opacity)}function Sc(t,e,n,r){return 1===arguments.length?Fc(t):new Bc(t,e,n,null==r?1:r)}function Bc(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function Tc(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}ec(rc,_c,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:yc,formatHex:yc,formatHsl:function(){return Fc(this).formatHsl()},formatRgb:vc,toString:vc}),ec(Ac,kc,nc(rc,{brighter:function(t){return t=null==t?oc:Math.pow(oc,t),new Ac(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?ic:Math.pow(ic,t),new Ac(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Mc,formatHex:Mc,formatRgb:Ec,toString:Ec})),ec(Bc,Sc,nc(rc,{brighter:function(t){return t=null==t?oc:Math.pow(oc,t),new Bc(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?ic:Math.pow(ic,t),new Bc(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new Ac(Tc(t>=240?t-240:t+120,i,r),Tc(t,i,r),Tc(t<120?t+240:t-120,i,r),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}));const zc=Math.PI/180,Nc=180/Math.PI,Oc=.96422,Rc=.82521,$c=4/29,qc=6/29,Lc=3*qc*qc;function Uc(t){if(t instanceof jc)return new jc(t.l,t.a,t.b,t.opacity);if(t instanceof Xc)return Jc(t);t instanceof Ac||(t=wc(t));var e,n,r=Yc(t.r),i=Yc(t.g),o=Yc(t.b),a=Ic((.2225045*r+.7168786*i+.0606169*o)/1);return r===i&&i===o?e=n=a:(e=Ic((.4360747*r+.3850649*i+.1430804*o)/Oc),n=Ic((.0139322*r+.0971045*i+.7141733*o)/Rc)),new jc(116*a-16,500*(e-a),200*(a-n),t.opacity)}function Pc(t,e,n,r){return 1===arguments.length?Uc(t):new jc(t,e,n,null==r?1:r)}function jc(t,e,n,r){this.l=+t,this.a=+e,this.b=+n,this.opacity=+r}function Ic(t){return t>.008856451679035631?Math.pow(t,1/3):t/Lc+$c}function Wc(t){return t>qc?t*t*t:Lc*(t-$c)}function Hc(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Yc(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Vc(t){if(t instanceof Xc)return new Xc(t.h,t.c,t.l,t.opacity);if(t instanceof jc||(t=Uc(t)),0===t.a&&0===t.b)return new Xc(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*Nc;return new Xc(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function Gc(t,e,n,r){return 1===arguments.length?Vc(t):new Xc(t,e,n,null==r?1:r)}function Xc(t,e,n,r){this.h=+t,this.c=+e,this.l=+n,this.opacity=+r}function Jc(t){if(isNaN(t.h))return new jc(t.l,0,0,t.opacity);var e=t.h*zc;return new jc(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}ec(jc,Pc,nc(rc,{brighter:function(t){return new jc(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new jc(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return new Ac(Hc(3.1338561*(e=Oc*Wc(e))-1.6168667*(t=1*Wc(t))-.4906146*(n=Rc*Wc(n))),Hc(-.9787684*e+1.9161415*t+.033454*n),Hc(.0719453*e-.2289914*t+1.4052427*n),this.opacity)}})),ec(Xc,Gc,nc(rc,{brighter:function(t){return new Xc(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new Xc(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return Jc(this).rgb()}}));var Zc=-.14861,Qc=1.78277,Kc=-.29227,tf=-.90649,ef=1.97294,nf=ef*tf,rf=ef*Qc,of=Qc*Kc-tf*Zc;function af(t){if(t instanceof sf)return new sf(t.h,t.s,t.l,t.opacity);t instanceof Ac||(t=wc(t));var e=t.r/255,n=t.g/255,r=t.b/255,i=(of*r+nf*e-rf*n)/(of+nf-rf),o=r-i,a=(ef*(n-i)-Kc*o)/tf,u=Math.sqrt(a*a+o*o)/(ef*i*(1-i)),s=u?Math.atan2(a,o)*Nc-120:NaN;return new sf(s<0?s+360:s,u,i,t.opacity)}function uf(t,e,n,r){return 1===arguments.length?af(t):new sf(t,e,n,null==r?1:r)}function sf(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function lf(t,e,n,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*e+(4-6*o+3*a)*n+(1+3*t+3*o-3*a)*r+a*i)/6}function cf(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,u=r<e-1?t[r+2]:2*o-i;return lf((n-r/e)*e,a,i,o,u)}}function ff(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),i=t[(r+e-1)%e],o=t[r%e],a=t[(r+1)%e],u=t[(r+2)%e];return lf((n-r/e)*e,i,o,a,u)}}ec(sf,uf,nc(rc,{brighter:function(t){return t=null==t?oc:Math.pow(oc,t),new sf(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?ic:Math.pow(ic,t),new sf(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*zc,e=+this.l,n=isNaN(this.s)?0:this.s*e*(1-e),r=Math.cos(t),i=Math.sin(t);return new Ac(255*(e+n*(Zc*r+Qc*i)),255*(e+n*(Kc*r+tf*i)),255*(e+n*(ef*r)),this.opacity)}}));var hf=t=>()=>t;function df(t,e){return function(n){return t+n*e}}function pf(t,e){var n=e-t;return n?df(t,n>180||n<-180?n-360*Math.round(n/360):n):hf(isNaN(t)?e:t)}function gf(t){return 1==(t=+t)?mf:function(e,n){return n-e?function(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}(e,n,t):hf(isNaN(e)?n:e)}}function mf(t,e){var n=e-t;return n?df(t,n):hf(isNaN(t)?e:t)}var yf=function t(e){var n=gf(e);function r(t,e){var r=n((t=kc(t)).r,(e=kc(e)).r),i=n(t.g,e.g),o=n(t.b,e.b),a=mf(t.opacity,e.opacity);return function(e){return t.r=r(e),t.g=i(e),t.b=o(e),t.opacity=a(e),t+""}}return r.gamma=t,r}(1);function vf(t){return function(e){var n,r,i=e.length,o=new Array(i),a=new Array(i),u=new Array(i);for(n=0;n<i;++n)r=kc(e[n]),o[n]=r.r||0,a[n]=r.g||0,u[n]=r.b||0;return o=t(o),a=t(a),u=t(u),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=u(t),r+""}}}var _f=vf(cf),xf=vf(ff);function bf(t,e){e||(e=[]);var n,r=t?Math.min(e.length,t.length):0,i=e.slice();return function(o){for(n=0;n<r;++n)i[n]=t[n]*(1-o)+e[n]*o;return i}}function wf(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function kf(t,e){var n,r=e?e.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(n=0;n<i;++n)o[n]=Sf(t[n],e[n]);for(;n<r;++n)a[n]=e[n];return function(t){for(n=0;n<i;++n)a[n]=o[n](t);return a}}function Af(t,e){var n=new Date;return t=+t,e=+e,function(r){return n.setTime(t*(1-r)+e*r),n}}function Mf(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Ef(t,e){var n,r={},i={};for(n in null!==t&&"object"==typeof t||(t={}),null!==e&&"object"==typeof e||(e={}),e)n in t?r[n]=Sf(t[n],e[n]):i[n]=e[n];return function(t){for(n in r)i[n]=r[n](t);return i}}var Df=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Cf=new RegExp(Df.source,"g");function Ff(t,e){var n,r,i,o=Df.lastIndex=Cf.lastIndex=0,a=-1,u=[],s=[];for(t+="",e+="";(n=Df.exec(t))&&(r=Cf.exec(e));)(i=r.index)>o&&(i=e.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(n=n[0])===(r=r[0])?u[a]?u[a]+=r:u[++a]=r:(u[++a]=null,s.push({i:a,x:Mf(n,r)})),o=Cf.lastIndex;return o<e.length&&(i=e.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?s[0]?function(t){return function(e){return t(e)+""}}(s[0].x):function(t){return function(){return t}}(e):(e=s.length,function(t){for(var n,r=0;r<e;++r)u[(n=s[r]).i]=n.x(t);return u.join("")})}function Sf(t,e){var n,r=typeof e;return null==e||"boolean"===r?hf(e):("number"===r?Mf:"string"===r?(n=_c(e))?(e=n,yf):Ff:e instanceof _c?yf:e instanceof Date?Af:wf(e)?bf:Array.isArray(e)?kf:"function"!=typeof e.valueOf&&"function"!=typeof e.toString||isNaN(e)?Ef:Mf)(t,e)}function Bf(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var Tf,zf=180/Math.PI,Nf={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Of(t,e,n,r,i,o){var a,u,s;return(a=Math.sqrt(t*t+e*e))&&(t/=a,e/=a),(s=t*n+e*r)&&(n-=t*s,r-=e*s),(u=Math.sqrt(n*n+r*r))&&(n/=u,r/=u,s/=u),t*r<e*n&&(t=-t,e=-e,s=-s,a=-a),{translateX:i,translateY:o,rotate:Math.atan2(e,t)*zf,skewX:Math.atan(s)*zf,scaleX:a,scaleY:u}}function Rf(t,e,n,r){function i(t){return t.length?t.pop()+" ":""}return function(o,a){var u=[],s=[];return o=t(o),a=t(a),function(t,r,i,o,a,u){if(t!==i||r!==o){var s=a.push("translate(",null,e,null,n);u.push({i:s-4,x:Mf(t,i)},{i:s-2,x:Mf(r,o)})}else(i||o)&&a.push("translate("+i+e+o+n)}(o.translateX,o.translateY,a.translateX,a.translateY,u,s),function(t,e,n,o){t!==e?(t-e>180?e+=360:e-t>180&&(t+=360),o.push({i:n.push(i(n)+"rotate(",null,r)-2,x:Mf(t,e)})):e&&n.push(i(n)+"rotate("+e+r)}(o.rotate,a.rotate,u,s),function(t,e,n,o){t!==e?o.push({i:n.push(i(n)+"skewX(",null,r)-2,x:Mf(t,e)}):e&&n.push(i(n)+"skewX("+e+r)}(o.skewX,a.skewX,u,s),function(t,e,n,r,o,a){if(t!==n||e!==r){var u=o.push(i(o)+"scale(",null,",",null,")");a.push({i:u-4,x:Mf(t,n)},{i:u-2,x:Mf(e,r)})}else 1===n&&1===r||o.push(i(o)+"scale("+n+","+r+")")}(o.scaleX,o.scaleY,a.scaleX,a.scaleY,u,s),o=a=null,function(t){for(var e,n=-1,r=s.length;++n<r;)u[(e=s[n]).i]=e.x(t);return u.join("")}}}var $f=Rf((function(t){const e=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?Nf:Of(e.a,e.b,e.c,e.d,e.e,e.f)}),"px, ","px)","deg)"),qf=Rf((function(t){return null==t?Nf:(Tf||(Tf=document.createElementNS("http://www.w3.org/2000/svg","g")),Tf.setAttribute("transform",t),(t=Tf.transform.baseVal.consolidate())?Of((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):Nf)}),", ",")",")");function Lf(t){return((t=Math.exp(t))+1/t)/2}var Uf=function t(e,n,r){function i(t,i){var o,a,u=t[0],s=t[1],l=t[2],c=i[0],f=i[1],h=i[2],d=c-u,p=f-s,g=d*d+p*p;if(g<1e-12)a=Math.log(h/l)/e,o=function(t){return[u+t*d,s+t*p,l*Math.exp(e*t*a)]};else{var m=Math.sqrt(g),y=(h*h-l*l+r*g)/(2*l*n*m),v=(h*h-l*l-r*g)/(2*h*n*m),_=Math.log(Math.sqrt(y*y+1)-y),x=Math.log(Math.sqrt(v*v+1)-v);a=(x-_)/e,o=function(t){var r=t*a,i=Lf(_),o=l/(n*m)*(i*function(t){return((t=Math.exp(2*t))-1)/(t+1)}(e*r+_)-function(t){return((t=Math.exp(t))-1/t)/2}(_));return[u+o*d,s+o*p,l*i/Lf(e*r+_)]}}return o.duration=1e3*a*e/Math.SQRT2,o}return i.rho=function(e){var n=Math.max(.001,+e),r=n*n;return t(n,r,r*r)},i}(Math.SQRT2,2,4);function Pf(t){return function(e,n){var r=t((e=Sc(e)).h,(n=Sc(n)).h),i=mf(e.s,n.s),o=mf(e.l,n.l),a=mf(e.opacity,n.opacity);return function(t){return e.h=r(t),e.s=i(t),e.l=o(t),e.opacity=a(t),e+""}}}var jf=Pf(pf),If=Pf(mf);function Wf(t){return function(e,n){var r=t((e=Gc(e)).h,(n=Gc(n)).h),i=mf(e.c,n.c),o=mf(e.l,n.l),a=mf(e.opacity,n.opacity);return function(t){return e.h=r(t),e.c=i(t),e.l=o(t),e.opacity=a(t),e+""}}}var Hf=Wf(pf),Yf=Wf(mf);function Vf(t){return function e(n){function r(e,r){var i=t((e=uf(e)).h,(r=uf(r)).h),o=mf(e.s,r.s),a=mf(e.l,r.l),u=mf(e.opacity,r.opacity);return function(t){return e.h=i(t),e.s=o(t),e.l=a(Math.pow(t,n)),e.opacity=u(t),e+""}}return n=+n,r.gamma=e,r}(1)}var Gf=Vf(pf),Xf=Vf(mf);function Jf(t,e){void 0===e&&(e=t,t=Sf);for(var n=0,r=e.length-1,i=e[0],o=new Array(r<0?0:r);n<r;)o[n]=t(i,i=e[++n]);return function(t){var e=Math.max(0,Math.min(r-1,Math.floor(t*=r)));return o[e](t-e)}}var Zf=Object.freeze({__proto__:null,interpolate:Sf,interpolateArray:function(t,e){return(wf(e)?bf:kf)(t,e)},interpolateBasis:cf,interpolateBasisClosed:ff,interpolateDate:Af,interpolateDiscrete:function(t){var e=t.length;return function(n){return t[Math.max(0,Math.min(e-1,Math.floor(n*e)))]}},interpolateHue:function(t,e){var n=pf(+t,+e);return function(t){var e=n(t);return e-360*Math.floor(e/360)}},interpolateNumber:Mf,interpolateNumberArray:bf,interpolateObject:Ef,interpolateRound:Bf,interpolateString:Ff,interpolateTransformCss:$f,interpolateTransformSvg:qf,interpolateZoom:Uf,interpolateRgb:yf,interpolateRgbBasis:_f,interpolateRgbBasisClosed:xf,interpolateHsl:jf,interpolateHslLong:If,interpolateLab:function(t,e){var n=mf((t=Pc(t)).l,(e=Pc(e)).l),r=mf(t.a,e.a),i=mf(t.b,e.b),o=mf(t.opacity,e.opacity);return function(e){return t.l=n(e),t.a=r(e),t.b=i(e),t.opacity=o(e),t+""}},interpolateHcl:Hf,interpolateHclLong:Yf,interpolateCubehelix:Gf,interpolateCubehelixLong:Xf,piecewise:Jf,quantize:function(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t(r/(e-1));return n}});function Qf(t){return+t}var Kf=[0,1];function th(t){return t}function eh(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:function(t){return function(){return t}}(isNaN(e)?NaN:.5)}function nh(t,e,n){var r=t[0],i=t[1],o=e[0],a=e[1];return i<r?(r=eh(i,r),o=n(a,o)):(r=eh(r,i),o=n(o,a)),function(t){return o(r(t))}}function rh(t,e,n){var r=Math.min(t.length,e.length)-1,i=new Array(r),o=new Array(r),a=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++a<r;)i[a]=eh(t[a],t[a+1]),o[a]=n(e[a],e[a+1]);return function(e){var n=Jt(t,e,1,r)-1;return o[n](i[n](e))}}function ih(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function oh(){var t,e,n,r,i,o,a=Kf,u=Kf,s=Sf,l=th;function c(){var t=Math.min(a.length,u.length);return l!==th&&(l=function(t,e){var n;return t>e&&(n=t,t=e,e=n),function(n){return Math.max(t,Math.min(e,n))}}(a[0],a[t-1])),r=t>2?rh:nh,i=o=null,f}function f(e){return null==e||isNaN(e=+e)?n:(i||(i=r(a.map(t),u,s)))(t(l(e)))}return f.invert=function(n){return l(e((o||(o=r(u,a.map(t),Mf)))(n)))},f.domain=function(t){return arguments.length?(a=Array.from(t,Qf),c()):a.slice()},f.range=function(t){return arguments.length?(u=Array.from(t),c()):u.slice()},f.rangeRound=function(t){return u=Array.from(t),s=Bf,c()},f.clamp=function(t){return arguments.length?(l=!!t||th,c()):l!==th},f.interpolate=function(t){return arguments.length?(s=t,c()):s},f.unknown=function(t){return arguments.length?(n=t,f):n},function(n,r){return t=n,e=r,c()}}function ah(){return oh()(th,th)}function uh(t,e,n,r){var i,o=ie(t,e,n);switch((r=_e(null==r?",f":r)).type){case"s":var a=Math.max(Math.abs(t),Math.abs(e));return null!=r.precision||isNaN(i=Be(o,a))||(r.precision=i),Ee(r,a);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=Te(o,Math.max(Math.abs(t),Math.abs(e))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=Se(o))||(r.precision=i-2*("%"===r.type))}return Me(r)}function sh(t){var e=t.domain;return t.ticks=function(t){var n=e();return ne(n[0],n[n.length-1],null==t?10:t)},t.tickFormat=function(t,n){var r=e();return uh(r[0],r[r.length-1],null==t?10:t,n)},t.nice=function(n){null==n&&(n=10);var r,i,o=e(),a=0,u=o.length-1,s=o[a],l=o[u],c=10;for(l<s&&(i=s,s=l,l=i,i=a,a=u,u=i);c-- >0;){if((i=re(s,l,n))===r)return o[a]=s,o[u]=l,e(o);if(i>0)s=Math.floor(s/i)*i,l=Math.ceil(l/i)*i;else{if(!(i<0))break;s=Math.ceil(s*i)/i,l=Math.floor(l*i)/i}r=i}return t},t}function lh(t,e){var n,r=0,i=(t=t.slice()).length-1,o=t[r],a=t[i];return a<o&&(n=r,r=i,i=n,n=o,o=a,a=n),t[r]=e.floor(o),t[i]=e.ceil(a),t}function ch(t){return Math.log(t)}function fh(t){return Math.exp(t)}function hh(t){return-Math.log(-t)}function dh(t){return-Math.exp(-t)}function ph(t){return isFinite(t)?+("1e"+t):t<0?0:t}function gh(t){return function(e){return-t(-e)}}function mh(t){var e,n,r=t(ch,fh),i=r.domain,o=10;function a(){return e=function(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),function(e){return Math.log(e)/t})}(o),n=function(t){return 10===t?ph:t===Math.E?Math.exp:function(e){return Math.pow(t,e)}}(o),i()[0]<0?(e=gh(e),n=gh(n),t(hh,dh)):t(ch,fh),r}return r.base=function(t){return arguments.length?(o=+t,a()):o},r.domain=function(t){return arguments.length?(i(t),a()):i()},r.ticks=function(t){var r,a=i(),u=a[0],s=a[a.length-1];(r=s<u)&&(h=u,u=s,s=h);var l,c,f,h=e(u),d=e(s),p=null==t?10:+t,g=[];if(!(o%1)&&d-h<p){if(h=Math.floor(h),d=Math.ceil(d),u>0){for(;h<=d;++h)for(c=1,l=n(h);c<o;++c)if(!((f=l*c)<u)){if(f>s)break;g.push(f)}}else for(;h<=d;++h)for(c=o-1,l=n(h);c>=1;--c)if(!((f=l*c)<u)){if(f>s)break;g.push(f)}2*g.length<p&&(g=ne(u,s,p))}else g=ne(h,d,Math.min(d-h,p)).map(n);return r?g.reverse():g},r.tickFormat=function(t,i){if(null==i&&(i=10===o?".0e":","),"function"!=typeof i&&(i=Me(i)),t===1/0)return i;null==t&&(t=10);var a=Math.max(1,o*t/r.ticks().length);return function(t){var r=t/n(Math.round(e(t)));return r*o<o-.5&&(r*=o),r<=a?i(t):""}},r.nice=function(){return i(lh(i(),{floor:function(t){return n(Math.floor(e(t)))},ceil:function(t){return n(Math.ceil(e(t)))}}))},r}function yh(t){return function(e){return Math.sign(e)*Math.log1p(Math.abs(e/t))}}function vh(t){return function(e){return Math.sign(e)*Math.expm1(Math.abs(e))*t}}function _h(t){var e=1,n=t(yh(e),vh(e));return n.constant=function(n){return arguments.length?t(yh(e=+n),vh(e)):e},sh(n)}function xh(t){return function(e){return e<0?-Math.pow(-e,t):Math.pow(e,t)}}function bh(t){return t<0?-Math.sqrt(-t):Math.sqrt(t)}function wh(t){return t<0?-t*t:t*t}function kh(t){var e=t(th,th),n=1;function r(){return 1===n?t(th,th):.5===n?t(bh,wh):t(xh(n),xh(1/n))}return e.exponent=function(t){return arguments.length?(n=+t,r()):n},sh(e)}function Ah(){var t=kh(oh());return t.copy=function(){return ih(t,Ah()).exponent(t.exponent())},Zl.apply(t,arguments),t}var Mh=1e3,Eh=6e4,Dh=36e5,Ch=864e5,Fh=2592e6,Sh=31536e6;function Bh(t){return new Date(t)}function Th(t){return t instanceof Date?+t:+new Date(+t)}function zh(t,e,n,r,i,o,a,u,s){var l=ah(),c=l.invert,f=l.domain,h=s(".%L"),d=s(":%S"),p=s("%I:%M"),g=s("%I %p"),m=s("%a %d"),y=s("%b %d"),v=s("%B"),_=s("%Y"),x=[[a,1,Mh],[a,5,5e3],[a,15,15e3],[a,30,3e4],[o,1,Eh],[o,5,3e5],[o,15,9e5],[o,30,18e5],[i,1,Dh],[i,3,108e5],[i,6,216e5],[i,12,432e5],[r,1,Ch],[r,2,1728e5],[n,1,6048e5],[e,1,Fh],[e,3,7776e6],[t,1,Sh]];function b(u){return(a(u)<u?h:o(u)<u?d:i(u)<u?p:r(u)<u?g:e(u)<u?n(u)<u?m:y:t(u)<u?v:_)(u)}function w(e,n,r){if(null==e&&(e=10),"number"==typeof e){var i,o=Math.abs(r-n)/e,a=Vt((function(t){return t[2]})).right(x,o);return a===x.length?(i=ie(n/Sh,r/Sh,e),e=t):a?(i=(a=x[o/x[a-1][2]<x[a][2]/o?a-1:a])[1],e=a[0]):(i=Math.max(ie(n,r,e),1),e=u),e.every(i)}return e}return l.invert=function(t){return new Date(c(t))},l.domain=function(t){return arguments.length?f(Array.from(t,Th)):f().map(Bh)},l.ticks=function(t){var e,n=f(),r=n[0],i=n[n.length-1],o=i<r;return o&&(e=r,r=i,i=e),e=(e=w(t,r,i))?e.range(r,i+1):[],o?e.reverse():e},l.tickFormat=function(t,e){return null==e?b:s(e)},l.nice=function(t){var e=f();return(t=w(t,e[0],e[e.length-1]))?f(lh(e,t)):l},l.copy=function(){return ih(l,zh(t,e,n,r,i,o,a,u,s))},l}function Nh(){var t,e,n,r,i,o=0,a=1,u=th,s=!1;function l(e){return null==e||isNaN(e=+e)?i:u(0===n?.5:(e=(r(e)-t)*n,s?Math.max(0,Math.min(1,e)):e))}function c(t){return function(e){var n,r;return arguments.length?([n,r]=e,u=t(n,r),l):[u(0),u(1)]}}return l.domain=function(i){return arguments.length?([o,a]=i,t=r(o=+o),e=r(a=+a),n=t===e?0:1/(e-t),l):[o,a]},l.clamp=function(t){return arguments.length?(s=!!t,l):s},l.interpolator=function(t){return arguments.length?(u=t,l):u},l.range=c(Sf),l.rangeRound=c(Bf),l.unknown=function(t){return arguments.length?(i=t,l):i},function(i){return r=i,t=i(o),e=i(a),n=t===e?0:1/(e-t),l}}function Oh(t,e){return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())}function Rh(){var t=sh(Nh()(th));return t.copy=function(){return Oh(t,Rh())},Ql.apply(t,arguments)}function $h(){var t=kh(Nh());return t.copy=function(){return Oh(t,$h()).exponent(t.exponent())},Ql.apply(t,arguments)}function qh(){var t,e,n,r,i,o,a,u=0,s=.5,l=1,c=1,f=th,h=!1;function d(t){return isNaN(t=+t)?a:(t=.5+((t=+o(t))-e)*(c*t<c*e?r:i),f(h?Math.max(0,Math.min(1,t)):t))}function p(t){return function(e){var n,r,i;return arguments.length?([n,r,i]=e,f=Jf(t,[n,r,i]),d):[f(0),f(.5),f(1)]}}return d.domain=function(a){return arguments.length?([u,s,l]=a,t=o(u=+u),e=o(s=+s),n=o(l=+l),r=t===e?0:.5/(e-t),i=e===n?0:.5/(n-e),c=e<t?-1:1,d):[u,s,l]},d.clamp=function(t){return arguments.length?(h=!!t,d):h},d.interpolator=function(t){return arguments.length?(f=t,d):f},d.range=p(Sf),d.rangeRound=p(Bf),d.unknown=function(t){return arguments.length?(a=t,d):a},function(a){return o=a,t=a(u),e=a(s),n=a(l),r=t===e?0:.5/(e-t),i=e===n?0:.5/(n-e),c=e<t?-1:1,d}}function Lh(){var t=kh(qh());return t.copy=function(){return Oh(t,Lh()).exponent(t.exponent())},Ql.apply(t,arguments)}function Uh(t,e,n){const r=t-e+2*n;return t?r>0?r:1:0}const Ph="linear",jh="log",Ih="pow",Wh="sqrt",Hh="symlog",Yh="time",Vh="utc",Gh="sequential",Xh="quantile",Jh="quantize",Zh="threshold",Qh="ordinal",Kh="point",td="band",ed="bin-ordinal",nd="continuous",rd="discrete",id="discretizing",od="interpolating",ad="temporal";function ud(){const t=tc().unknown(void 0),e=t.domain,n=t.range;let r,i,o=[0,1],a=!1,u=0,s=0,l=.5;function c(){const t=e().length,c=o[1]<o[0],f=o[1-c],h=Uh(t,u,s);let d=o[c-0];r=(f-d)/(h||1),a&&(r=Math.floor(r)),d+=(f-d-r*(t-u))*l,i=r*(1-u),a&&(d=Math.round(d),i=Math.round(i));const p=de(t).map((t=>d+r*t));return n(c?p.reverse():p)}return delete t.unknown,t.domain=function(t){return arguments.length?(e(t),c()):e()},t.range=function(t){return arguments.length?(o=[+t[0],+t[1]],c()):o.slice()},t.rangeRound=function(t){return o=[+t[0],+t[1]],a=!0,c()},t.bandwidth=function(){return i},t.step=function(){return r},t.round=function(t){return arguments.length?(a=!!t,c()):a},t.padding=function(t){return arguments.length?(s=Math.max(0,Math.min(1,t)),u=s,c()):u},t.paddingInner=function(t){return arguments.length?(u=Math.max(0,Math.min(1,t)),c()):u},t.paddingOuter=function(t){return arguments.length?(s=Math.max(0,Math.min(1,t)),c()):s},t.align=function(t){return arguments.length?(l=Math.max(0,Math.min(1,t)),c()):l},t.invertRange=function(t){if(null==t[0]||null==t[1])return;const r=o[1]<o[0],a=r?n().reverse():n(),u=a.length-1;let s,l,c,f=+t[0],h=+t[1];return f!=f||h!=h||(h<f&&(c=f,f=h,h=c),h<a[0]||f>o[1-r])?void 0:(s=Math.max(0,Jt(a,f)-1),l=f===h?s:Jt(a,h)-1,f-a[s]>i+1e-10&&++s,r&&(c=s,s=u-l,l=u-c),s>l?void 0:e().slice(s,l+1))},t.invert=function(e){const n=t.invertRange([e,e]);return n?n[0]:n},t.copy=function(){return ud().domain(e()).range(o).round(a).paddingInner(u).paddingOuter(s).align(l)},c()}function sd(t){const e=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,t.copy=function(){return sd(e())},t}var ld=Array.prototype.map;function cd(t){return ld.call(t,E)}const fd=Array.prototype.slice;const hd={};function dd(t,e,n){const r=function(){const n=e();return n.invertRange||(n.invertRange=n.invert?function(t){return function(e){let n,r=e[0],i=e[1];return i<r&&(n=r,r=i,i=n),[t.invert(r),t.invert(i)]}}(n):n.invertExtent?function(t){return function(e){const n=t.range();let r,i,o,a,u=e[0],s=e[1],l=-1;for(s<u&&(i=u,u=s,s=i),o=0,a=n.length;o<a;++o)n[o]>=u&&n[o]<=s&&(l<0&&(l=o),r=o);if(!(l<0))return u=t.invertExtent(n[l]),s=t.invertExtent(n[r]),[void 0===u[0]?u[1]:u[0],void 0===s[1]?s[0]:s[1]]}}(n):void 0),n.type=t,n};return r.metadata=Ct(W(n)),r}function pd(t,e,n){return arguments.length>1?(hd[t]=dd(t,e,n),this):gd(t)?hd[t]:void 0}function gd(t){return it(hd,t)}function md(t,e){const n=hd[t];return n&&n.metadata[e]}function yd(t){return md(t,nd)}function vd(t){return md(t,rd)}function _d(t){return md(t,id)}function xd(t){return md(t,jh)}function bd(t){return md(t,od)}function wd(t){return md(t,Xh)}pd("identity",(function t(e){var n;function r(t){return null==t||isNaN(t=+t)?n:t}return r.invert=r,r.domain=r.range=function(t){return arguments.length?(e=Array.from(t,Qf),r):e.slice()},r.unknown=function(t){return arguments.length?(n=t,r):n},r.copy=function(){return t(e).unknown(n)},e=arguments.length?Array.from(e,Qf):[0,1],sh(r)})),pd(Ph,(function t(){var e=ah();return e.copy=function(){return ih(e,t())},Zl.apply(e,arguments),sh(e)}),nd),pd(jh,(function t(){var e=mh(oh()).domain([1,10]);return e.copy=function(){return ih(e,t()).base(e.base())},Zl.apply(e,arguments),e}),[nd,jh]),pd(Ih,Ah,nd),pd(Wh,(function(){return Ah.apply(null,arguments).exponent(.5)}),nd),pd(Hh,(function t(){var e=_h(oh());return e.copy=function(){return ih(e,t()).constant(e.constant())},Zl.apply(e,arguments)}),nd),pd(Yh,(function(){return Zl.apply(zh(Ze,Je,Ve,He,We,Ie,je,Re,wr).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}),[nd,ad]),pd(Vh,(function(){return Zl.apply(zh(un,an,nn,tn,Ke,Qe,je,Re,Ar).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)}),[nd,ad]),pd(Gh,Rh,[nd,od]),pd("sequential-linear",Rh,[nd,od]),pd("sequential-log",(function t(){var e=mh(Nh()).domain([1,10]);return e.copy=function(){return Oh(e,t()).base(e.base())},Ql.apply(e,arguments)}),[nd,od,jh]),pd("sequential-pow",$h,[nd,od]),pd("sequential-sqrt",(function(){return $h.apply(null,arguments).exponent(.5)}),[nd,od]),pd("sequential-symlog",(function t(){var e=_h(Nh());return e.copy=function(){return Oh(e,t()).constant(e.constant())},Ql.apply(e,arguments)}),[nd,od]),pd("diverging-linear",(function t(){var e=sh(qh()(th));return e.copy=function(){return Oh(e,t())},Ql.apply(e,arguments)}),[nd,od]),pd("diverging-log",(function t(){var e=mh(qh()).domain([.1,1,10]);return e.copy=function(){return Oh(e,t()).base(e.base())},Ql.apply(e,arguments)}),[nd,od,jh]),pd("diverging-pow",Lh,[nd,od]),pd("diverging-sqrt",(function(){return Lh.apply(null,arguments).exponent(.5)}),[nd,od]),pd("diverging-symlog",(function t(){var e=_h(qh());return e.copy=function(){return Oh(e,t()).constant(e.constant())},Ql.apply(e,arguments)}),[nd,od]),pd(Xh,(function t(){var e,n=[],r=[],i=[];function o(){var t=0,e=Math.max(1,r.length);for(i=new Array(e-1);++t<e;)i[t-1]=ce(n,t/e);return a}function a(t){return null==t||isNaN(t=+t)?e:r[Jt(i,t)]}return a.invertExtent=function(t){var e=r.indexOf(t);return e<0?[NaN,NaN]:[e>0?i[e-1]:n[0],e<i.length?i[e]:n[n.length-1]]},a.domain=function(t){if(!arguments.length)return n.slice();n=[];for(let e of t)null==e||isNaN(e=+e)||n.push(e);return n.sort(Yt),o()},a.range=function(t){return arguments.length?(r=Array.from(t),o()):r.slice()},a.unknown=function(t){return arguments.length?(e=t,a):e},a.quantiles=function(){return i.slice()},a.copy=function(){return t().domain(n).range(r).unknown(e)},Zl.apply(a,arguments)}),[id,Xh]),pd(Jh,(function t(){var e,n=0,r=1,i=1,o=[.5],a=[0,1];function u(t){return null!=t&&t<=t?a[Jt(o,t,0,i)]:e}function s(){var t=-1;for(o=new Array(i);++t<i;)o[t]=((t+1)*r-(t-i)*n)/(i+1);return u}return u.domain=function(t){return arguments.length?([n,r]=t,n=+n,r=+r,s()):[n,r]},u.range=function(t){return arguments.length?(i=(a=Array.from(t)).length-1,s()):a.slice()},u.invertExtent=function(t){var e=a.indexOf(t);return e<0?[NaN,NaN]:e<1?[n,o[0]]:e>=i?[o[i-1],r]:[o[e-1],o[e]]},u.unknown=function(t){return arguments.length?(e=t,u):u},u.thresholds=function(){return o.slice()},u.copy=function(){return t().domain([n,r]).range(a).unknown(e)},Zl.apply(sh(u),arguments)}),id),pd(Zh,(function t(){var e,n=[.5],r=[0,1],i=1;function o(t){return null!=t&&t<=t?r[Jt(n,t,0,i)]:e}return o.domain=function(t){return arguments.length?(n=Array.from(t),i=Math.min(n.length,r.length-1),o):n.slice()},o.range=function(t){return arguments.length?(r=Array.from(t),i=Math.min(n.length,r.length-1),o):r.slice()},o.invertExtent=function(t){var e=r.indexOf(t);return[n[e-1],n[e]]},o.unknown=function(t){return arguments.length?(e=t,o):e},o.copy=function(){return t().domain(n).range(r).unknown(e)},Zl.apply(o,arguments)}),id),pd(ed,(function t(){let e=[],n=[];function r(t){return null==t||t!=t?void 0:n[(Jt(e,t)-1)%n.length]}return r.domain=function(t){return arguments.length?(e=cd(t),r):e.slice()},r.range=function(t){return arguments.length?(n=fd.call(t),r):n.slice()},r.tickFormat=function(t,n){return uh(e[0],M(e),null==t?10:t,n)},r.copy=function(){return t().domain(r.domain()).range(r.range())},r}),[rd,id]),pd(Qh,tc,rd),pd(td,ud,rd),pd(Kh,(function(){return sd(ud().paddingInner(1))}),rd);const kd=["clamp","base","constant","exponent"];function Ad(t,e){const n=e[0],r=M(e)-n;return function(e){return t(n+e*r)}}function Md(t,e,n){return Jf(Cd(e||"rgb",n),t)}function Ed(t,e){const n=new Array(e),r=e+1;for(let i=0;i<e;)n[i]=t(++i/r);return n}function Dd(t,e,n){const r=n-e;let i,o,a;return r&&Number.isFinite(r)?(i=(o=t.type).indexOf("-"),o=i<0?o:o.slice(i+1),a=pd(o)().domain([e,n]).range([0,1]),kd.forEach((e=>t[e]?a[e](t[e]()):0)),a):Q(.5)}function Cd(t,e){const n=Zf[function(t){return"interpolate"+t.toLowerCase().split("-").map((t=>t[0].toUpperCase()+t.slice(1))).join("")}(t)];return null!=e&&n&&n.gamma?n.gamma(e):n}function Fd(t){const e=t.length/6|0,n=new Array(e);for(let r=0;r<e;)n[r]="#"+t.slice(6*r,6*++r);return n}function Sd(t,e){for(const n in t)Td(n,e(t[n]))}const Bd={};function Td(t,e){return t=t&&t.toLowerCase(),arguments.length>1?(Bd[t]=e,this):Bd[t]}Sd({category10:"1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf",category20:"1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",category20b:"393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",category20c:"3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",tableau10:"4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",tableau20:"4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5",accent:"7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666",dark2:"1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666",paired:"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928",pastel1:"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2",pastel2:"b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc",set1:"e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999",set2:"66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3",set3:"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"},Fd),Sd({blues:"cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",greens:"d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",greys:"e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",oranges:"fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",purples:"e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",reds:"fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",blueGreen:"d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",bluePurple:"ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",greenBlue:"d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",orangeRed:"fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",purpleBlue:"dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",purpleBlueGreen:"dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",purpleRed:"dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",redPurple:"fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",yellowGreen:"e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",yellowOrangeBrown:"feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",yellowOrangeRed:"fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",blueOrange:"134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",brownBlueGreen:"704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",purpleGreen:"5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",purpleOrange:"4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",redBlue:"8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",redGrey:"8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",yellowGreenBlue:"eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",redYellowBlue:"a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",redYellowGreen:"a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",pinkYellowGreen:"8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",spectral:"9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",viridis:"440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",magma:"0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",inferno:"0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",plasma:"0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",cividis:"00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",rainbow:"6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",sinebow:"ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",turbo:"23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",browns:"eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",tealBlues:"bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",teals:"bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",warmGreys:"dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",goldGreen:"f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",goldOrange:"f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",goldRed:"f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",lightGreyRed:"efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",lightGreyTeal:"e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",lightMulti:"e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",lightOrange:"f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",lightTealBlue:"e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",darkBlue:"3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",darkGold:"3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",darkGreen:"3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",darkMulti:"3737371f5287197d8c29a86995ce3fffe800ffffff",darkRed:"3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c"},(t=>Md(Fd(t))));const zd="symbol",Nd=t=>_(t)?t.map((t=>String(t))):String(t),Od=(t,e)=>t[1]-e[1],Rd=(t,e)=>e[1]-t[1];function $d(t,e,n){let r;return dt(e)&&(t.bins&&(e=Math.max(e,t.bins.length)),null!=n&&(e=Math.min(e,Math.floor(wt(t.domain())/n||1)))),x(e)&&(r=e.step,e=e.interval),gt(e)&&(e=t.type===Yh?Gn(e):t.type==Vh?Xn(e):s("Only time and utc scales accept interval strings."),r&&(e=e.every(r))),e}function qd(t,e,n){let r=t.range(),i=r[0],o=M(r),a=Od;if(i>o&&(r=o,o=i,i=r,a=Rd),i=Math.floor(i),o=Math.ceil(o),e=e.map((e=>[e,t(e)])).filter((t=>i<=t[1]&&t[1]<=o)).sort(a).map((t=>t[0])),n>0&&e.length>1){const t=[e[0],M(e)];for(;e.length>n&&e.length>=3;)e=e.filter(((t,e)=>!(e%2)));e.length<3&&(e=t)}return e}function Ld(t,e){return t.bins?qd(t,t.bins):t.ticks?t.ticks(e):t.domain()}function Ud(t,e,n,r,i,o){const a=e.type;let u=Nd;if(a===Yh||i===Yh)u=t.timeFormat(r);else if(a===Vh||i===Vh)u=t.utcFormat(r);else if(xd(a)){const i=t.formatFloat(r);if(o||e.bins)u=i;else{const t=Pd(e,n,!1);u=e=>t(e)?i(e):""}}else if(e.tickFormat){const i=e.domain();u=t.formatSpan(i[0],i[i.length-1],n,r)}else r&&(u=t.format(r));return u}function Pd(t,e,n){const r=Ld(t,e),i=t.base(),o=Math.log(i),a=Math.max(1,i*e/r.length),u=t=>{let e=t/Math.pow(i,Math.round(Math.log(t)/o));return e*i<i-.5&&(e*=i),e<=a};return n?r.filter(u):u}const jd={[Xh]:"quantiles",[Jh]:"thresholds",[Zh]:"domain"},Id={[Xh]:"quantiles",[Jh]:"domain"};function Wd(t,e){return t.bins?function(t){const e=t.slice(0,-1);return e.max=M(t),e}(t.bins):t.type===jh?Pd(t,e,!0):jd[t.type]?function(t){const e=[-1/0].concat(t);return e.max=1/0,e}(t[jd[t.type]]()):Ld(t,e)}function Hd(t,e,n,r,i,o,a){const u=Id[e.type]&&o!==Yh&&o!==Vh?function(t,e,n){const r=e[Id[e.type]](),i=r.length;let o,a=i>1?r[1]-r[0]:r[0];for(o=1;o<i;++o)a=Math.min(a,r[o]-r[o-1]);return t.formatSpan(0,a,30,n)}(t,e,i):Ud(t,e,n,i,o,a);return r===zd&&(t=>jd[t.type]||t.bins)(e)?Yd(u):"discrete"===r?Gd(u):Xd(u)}const Yd=t=>(e,n,r)=>{const i=Vd(r[n+1],Vd(r.max,1/0)),o=Jd(e,t),a=Jd(i,t);return o&&a?o+" – "+a:a?"< "+a:"≥ "+o},Vd=(t,e)=>null!=t?t:e,Gd=t=>(e,n)=>n?t(e):null,Xd=t=>e=>t(e),Jd=(t,e)=>Number.isFinite(t)?e(t):null;function Zd(t,e,n,r){const i=r||e.type;return gt(n)&&function(t){return md(t,ad)}(i)&&(n=n.replace(/%a/g,"%A").replace(/%b/g,"%B")),n||i!==Yh?n||i!==Vh?Hd(t,e,5,null,n,r,!0):t.utcFormat("%A, %d %B %Y, %X UTC"):t.timeFormat("%A, %d %B %Y, %X")}function Qd(t,e,n){n=n||{};const r=Math.max(3,n.maxlen||7),i=Zd(t,e,n.format,n.formatType);if(_d(e.type)){const t=Wd(e).slice(1).map(i),n=t.length;return`${n} boundar${1===n?"y":"ies"}: ${t.join(", ")}`}if(vd(e.type)){const t=e.domain(),n=t.length;return`${n} value${1===n?"":"s"}: ${n>r?t.slice(0,r-2).map(i).join(", ")+", ending with "+t.slice(-1).map(i):t.map(i).join(", ")}`}{const t=e.domain();return`values from ${i(t[0])} to ${i(M(t))}`}}let Kd=0;const tp="p_";function ep(t){return t&&t.gradient}function np(t,e,n){const r=t.gradient;let i=t.id,o="radial"===r?tp:"";return i||(i=t.id="gradient_"+Kd++,"radial"===r?(t.x1=rp(t.x1,.5),t.y1=rp(t.y1,.5),t.r1=rp(t.r1,0),t.x2=rp(t.x2,.5),t.y2=rp(t.y2,.5),t.r2=rp(t.r2,.5),o=tp):(t.x1=rp(t.x1,0),t.y1=rp(t.y1,0),t.x2=rp(t.x2,1),t.y2=rp(t.y2,0))),e[i]=t,"url("+(n||"")+"#"+o+i+")"}function rp(t,e){return null!=t?t:e}function ip(t,e){var n,r=[];return n={gradient:"linear",x1:t?t[0]:0,y1:t?t[1]:0,x2:e?e[0]:1,y2:e?e[1]:0,stops:r,stop:function(t,e){return r.push({offset:t,color:e}),n}}}const op={basis:{curve:function(t){return new _l(t)}},"basis-closed":{curve:function(t){return new xl(t)}},"basis-open":{curve:function(t){return new bl(t)}},bundle:{curve:kl,tension:"beta",value:.85},cardinal:{curve:El,tension:"tension",value:0},"cardinal-open":{curve:Sl,tension:"tension",value:0},"cardinal-closed":{curve:Cl,tension:"tension",value:0},"catmull-rom":{curve:zl,tension:"alpha",value:.5},"catmull-rom-closed":{curve:Ol,tension:"alpha",value:.5},"catmull-rom-open":{curve:$l,tension:"alpha",value:.5},linear:{curve:fl},"linear-closed":{curve:function(t){return new ql(t)}},monotone:{horizontal:function(t){return new Wl(t)},vertical:function(t){return new Il(t)}},natural:{curve:function(t){return new Yl(t)}},step:{curve:function(t){return new Gl(t,.5)}},"step-after":{curve:function(t){return new Gl(t,1)}},"step-before":{curve:function(t){return new Gl(t,0)}}};function ap(t,e,n){var r=it(op,t)&&op[t],i=null;return r&&(i=r.curve||r[e||"vertical"],r.tension&&null!=n&&(i=i[r.tension](n))),i}const up={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},sp=[/([MLHVCSQTAZmlhvcsqtaz])/g,/###/,/(\.\d+)(\.\d)/g,/(\d)([-+])/g,/\s|,|###/];function lp(t){const e=[];let n,r,i,o,a,u,s,l,c,f;const h=t.slice().replace(sp[0],"###$1").split(sp[1]).slice(1);for(s=0,c=h.length;s<c;++s){for(n=h[s],r=n.slice(1).trim().replace(sp[2],"$1###$2").replace(sp[3],"$1###$2").split(sp[4]),a=n.charAt(0),i=[a],l=0,f=r.length;l<f;++l)(o=+r[l])===o&&i.push(o);if(u=up[a.toLowerCase()],i.length-1>u){const t=i.length;for(l=1,e.push([a].concat(i.slice(l,l+=u))),a="M"===a?"L":"m"===a?"l":a;l<t;l+=u)e.push([a].concat(i.slice(l,l+u)))}else e.push(i)}return e}const cp=Math.PI/180,fp=Math.PI/2,hp=2*Math.PI,dp=Math.sqrt(3)/2;var pp={},gp={},mp=[].join;function yp(t){const e=mp.call(t);if(gp[e])return gp[e];var n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],u=t[5],s=t[6],l=t[7];const c=l*a,f=-s*u,h=s*a,d=l*u,p=Math.cos(i),g=Math.sin(i),m=Math.cos(o),y=Math.sin(o),v=.5*(o-i),_=Math.sin(.5*v),x=8/3*_*_/Math.sin(v),b=n+p-x*g,w=r+g+x*p,k=n+m,A=r+y,M=k+x*y,E=A-x*m;return gp[e]=[c*b+f*w,h*b+d*w,c*M+f*E,h*M+d*E,c*k+f*A,h*k+d*A]}const vp=["l",0,0,0,0,0,0,0];function _p(t,e,n){const r=vp[0]=t[0];if("a"===r||"A"===r)vp[1]=e*t[1],vp[2]=n*t[2],vp[3]=t[3],vp[4]=t[4],vp[5]=t[5],vp[6]=e*t[6],vp[7]=n*t[7];else if("h"===r||"H"===r)vp[1]=e*t[1];else if("v"===r||"V"===r)vp[1]=n*t[1];else for(var i=1,o=t.length;i<o;++i)vp[i]=(i%2==1?e:n)*t[i];return vp}function xp(t,e,n,r,i,o){var a,u,s,l,c,f=null,h=0,d=0,p=0,g=0;null==n&&(n=0),null==r&&(r=0),null==i&&(i=1),null==o&&(o=i),t.beginPath&&t.beginPath();for(var m=0,y=e.length;m<y;++m){switch(a=e[m],1===i&&1===o||(a=_p(a,i,o)),a[0]){case"l":h+=a[1],d+=a[2],t.lineTo(h+n,d+r);break;case"L":h=a[1],d=a[2],t.lineTo(h+n,d+r);break;case"h":h+=a[1],t.lineTo(h+n,d+r);break;case"H":h=a[1],t.lineTo(h+n,d+r);break;case"v":d+=a[1],t.lineTo(h+n,d+r);break;case"V":d=a[1],t.lineTo(h+n,d+r);break;case"m":h+=a[1],d+=a[2],t.moveTo(h+n,d+r);break;case"M":h=a[1],d=a[2],t.moveTo(h+n,d+r);break;case"c":u=h+a[5],s=d+a[6],p=h+a[3],g=d+a[4],t.bezierCurveTo(h+a[1]+n,d+a[2]+r,p+n,g+r,u+n,s+r),h=u,d=s;break;case"C":h=a[5],d=a[6],p=a[3],g=a[4],t.bezierCurveTo(a[1]+n,a[2]+r,p+n,g+r,h+n,d+r);break;case"s":u=h+a[3],s=d+a[4],p=2*h-p,g=2*d-g,t.bezierCurveTo(p+n,g+r,h+a[1]+n,d+a[2]+r,u+n,s+r),p=h+a[1],g=d+a[2],h=u,d=s;break;case"S":u=a[3],s=a[4],p=2*h-p,g=2*d-g,t.bezierCurveTo(p+n,g+r,a[1]+n,a[2]+r,u+n,s+r),h=u,d=s,p=a[1],g=a[2];break;case"q":u=h+a[3],s=d+a[4],p=h+a[1],g=d+a[2],t.quadraticCurveTo(p+n,g+r,u+n,s+r),h=u,d=s;break;case"Q":u=a[3],s=a[4],t.quadraticCurveTo(a[1]+n,a[2]+r,u+n,s+r),h=u,d=s,p=a[1],g=a[2];break;case"t":u=h+a[1],s=d+a[2],null===f[0].match(/[QqTt]/)?(p=h,g=d):"t"===f[0]?(p=2*h-l,g=2*d-c):"q"===f[0]&&(p=2*h-p,g=2*d-g),l=p,c=g,t.quadraticCurveTo(p+n,g+r,u+n,s+r),d=s,p=(h=u)+a[1],g=d+a[2];break;case"T":u=a[1],s=a[2],p=2*h-p,g=2*d-g,t.quadraticCurveTo(p+n,g+r,u+n,s+r),h=u,d=s;break;case"a":bp(t,h+n,d+r,[a[1],a[2],a[3],a[4],a[5],a[6]+h+n,a[7]+d+r]),h+=a[6],d+=a[7];break;case"A":bp(t,h+n,d+r,[a[1],a[2],a[3],a[4],a[5],a[6]+n,a[7]+r]),h=a[6],d=a[7];break;case"z":case"Z":t.closePath()}f=a}}function bp(t,e,n,r){const i=function(t,e,n,r,i,o,a,u,s){const l=mp.call(arguments);if(pp[l])return pp[l];const c=a*cp,f=Math.sin(c),h=Math.cos(c),d=h*(u-t)*.5+f*(s-e)*.5,p=h*(s-e)*.5-f*(u-t)*.5;let g=d*d/((n=Math.abs(n))*n)+p*p/((r=Math.abs(r))*r);g>1&&(g=Math.sqrt(g),n*=g,r*=g);const m=h/n,y=f/n,v=-f/r,_=h/r,x=m*u+y*s,b=v*u+_*s,w=m*t+y*e,k=v*t+_*e;let A=1/((w-x)*(w-x)+(k-b)*(k-b))-.25;A<0&&(A=0);let M=Math.sqrt(A);o==i&&(M=-M);const E=.5*(x+w)-M*(k-b),D=.5*(b+k)+M*(w-x),C=Math.atan2(b-D,x-E);let F=Math.atan2(k-D,w-E)-C;F<0&&1===o?F+=hp:F>0&&0===o&&(F-=hp);const S=Math.ceil(Math.abs(F/(fp+.001))),B=[];for(let t=0;t<S;++t){const e=C+t*F/S,i=C+(t+1)*F/S;B[t]=[E,D,e,i,n,r,f,h]}return pp[l]=B}(r[5],r[6],r[0],r[1],r[3],r[4],r[2],e,n);for(let e=0;e<i.length;++e){const n=yp(i[e]);t.bezierCurveTo(n[0],n[1],n[2],n[3],n[4],n[5])}}const wp=.5773502691896257,kp={circle:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(n,0),t.arc(0,0,n,0,hp)}},cross:{draw:function(t,e){var n=Math.sqrt(e)/2,r=n/2.5;t.moveTo(-n,-r),t.lineTo(-n,r),t.lineTo(-r,r),t.lineTo(-r,n),t.lineTo(r,n),t.lineTo(r,r),t.lineTo(n,r),t.lineTo(n,-r),t.lineTo(r,-r),t.lineTo(r,-n),t.lineTo(-r,-n),t.lineTo(-r,-r),t.closePath()}},diamond:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(-n,0),t.lineTo(0,-n),t.lineTo(n,0),t.lineTo(0,n),t.closePath()}},square:{draw:function(t,e){var n=Math.sqrt(e),r=-n/2;t.rect(r,r,n,n)}},arrow:{draw:function(t,e){var n=Math.sqrt(e)/2,r=n/7,i=n/2.5,o=n/8;t.moveTo(-r,n),t.lineTo(r,n),t.lineTo(r,-o),t.lineTo(i,-o),t.lineTo(0,-n),t.lineTo(-i,-o),t.lineTo(-r,-o),t.closePath()}},wedge:{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n,i=r-n*wp,o=n/4;t.moveTo(0,-r-i),t.lineTo(-o,r-i),t.lineTo(o,r-i),t.closePath()}},triangle:{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n,i=r-n*wp;t.moveTo(0,-r-i),t.lineTo(-n,r-i),t.lineTo(n,r-i),t.closePath()}},"triangle-up":{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n;t.moveTo(0,-r),t.lineTo(-n,r),t.lineTo(n,r),t.closePath()}},"triangle-down":{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n;t.moveTo(0,r),t.lineTo(-n,-r),t.lineTo(n,-r),t.closePath()}},"triangle-right":{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n;t.moveTo(r,0),t.lineTo(-r,-n),t.lineTo(-r,n),t.closePath()}},"triangle-left":{draw:function(t,e){var n=Math.sqrt(e)/2,r=dp*n;t.moveTo(-r,0),t.lineTo(r,-n),t.lineTo(r,n),t.closePath()}},stroke:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(-n,0),t.lineTo(n,0)}}};function Ap(t){return it(kp,t)?kp[t]:function(t){if(!it(Mp,t)){const e=lp(t);Mp[t]={draw:function(t,n){xp(t,e,0,0,Math.sqrt(n)/2)}}}return Mp[t]}(t)}var Mp={};const Ep=.448084975506;function Dp(t){return t.x}function Cp(t){return t.y}function Fp(t){return t.width}function Sp(t){return t.height}function Bp(t){return"function"==typeof t?t:()=>+t}function Tp(t,e,n){return Math.max(e,Math.min(t,n))}function zp(){var t=Dp,e=Cp,n=Fp,r=Sp,i=Bp(0),o=i,a=i,u=i,s=null;function l(l,c,f){var h,d=null!=c?c:+t.call(this,l),p=null!=f?f:+e.call(this,l),g=+n.call(this,l),m=+r.call(this,l),y=Math.min(g,m)/2,v=Tp(+i.call(this,l),0,y),_=Tp(+o.call(this,l),0,y),x=Tp(+a.call(this,l),0,y),b=Tp(+u.call(this,l),0,y);if(s||(s=h=Ps()),v<=0&&_<=0&&x<=0&&b<=0)s.rect(d,p,g,m);else{var w=d+g,k=p+m;s.moveTo(d+v,p),s.lineTo(w-_,p),s.bezierCurveTo(w-Ep*_,p,w,p+Ep*_,w,p+_),s.lineTo(w,k-b),s.bezierCurveTo(w,k-Ep*b,w-Ep*b,k,w-b,k),s.lineTo(d+x,k),s.bezierCurveTo(d+Ep*x,k,d,k-Ep*x,d,k-x),s.lineTo(d,p+v),s.bezierCurveTo(d,p+Ep*v,d+Ep*v,p,d+v,p),s.closePath()}if(h)return s=null,h+""||null}return l.x=function(e){return arguments.length?(t=Bp(e),l):t},l.y=function(t){return arguments.length?(e=Bp(t),l):e},l.width=function(t){return arguments.length?(n=Bp(t),l):n},l.height=function(t){return arguments.length?(r=Bp(t),l):r},l.cornerRadius=function(t,e,n,r){return arguments.length?(i=Bp(t),o=null!=e?Bp(e):i,u=null!=n?Bp(n):i,a=null!=r?Bp(r):o,l):i},l.context=function(t){return arguments.length?(s=null==t?null:t,l):s},l}function Np(){var t,e,n,r,i,o,a,u,s=null;function l(t,e,n){const r=n/2;if(i){var l=a-e,c=t-o;if(l||c){var f=Math.sqrt(l*l+c*c),h=(l/=f)*u,d=(c/=f)*u,p=Math.atan2(c,l);s.moveTo(o-h,a-d),s.lineTo(t-l*r,e-c*r),s.arc(t,e,r,p-Math.PI,p),s.lineTo(o+h,a+d),s.arc(o,a,u,p,p+Math.PI)}else s.arc(t,e,r,0,hp);s.closePath()}else i=1;o=t,a=e,u=r}function c(o){var a,u,c,f=o.length,h=!1;for(null==s&&(s=c=Ps()),a=0;a<=f;++a)!(a<f&&r(u=o[a],a,o))===h&&(h=!h)&&(i=0),h&&l(+t(u,a,o),+e(u,a,o),+n(u,a,o));if(c)return s=null,c+""||null}return c.x=function(e){return arguments.length?(t=e,c):t},c.y=function(t){return arguments.length?(e=t,c):e},c.size=function(t){return arguments.length?(n=t,c):n},c.defined=function(t){return arguments.length?(r=t,c):r},c.context=function(t){return arguments.length?(s=null==t?null:t,c):s},c}function Op(t,e){return null!=t?t:e}const Rp=t=>t.x||0,$p=t=>t.y||0,qp=t=>!(!1===t.defined),Lp=function(){var t=nl,e=rl,n=js(0),r=null,i=il,o=ol,a=al,u=null;function s(){var s,l,c=+t.apply(this,arguments),f=+e.apply(this,arguments),h=i.apply(this,arguments)-Qs,d=o.apply(this,arguments)-Qs,p=Is(d-h),g=d>h;if(u||(u=s=Ps()),f<c&&(l=f,f=c,c=l),f>Js)if(p>Ks-Js)u.moveTo(f*Hs(h),f*Gs(h)),u.arc(0,0,f,h,d,!g),c>Js&&(u.moveTo(c*Hs(d),c*Gs(d)),u.arc(0,0,c,d,h,g));else{var m,y,v=h,_=d,x=h,b=d,w=p,k=p,A=a.apply(this,arguments)/2,M=A>Js&&(r?+r.apply(this,arguments):Xs(c*c+f*f)),E=Vs(Is(f-c)/2,+n.apply(this,arguments)),D=E,C=E;if(M>Js){var F=el(M/c*Gs(A)),S=el(M/f*Gs(A));(w-=2*F)>Js?(x+=F*=g?1:-1,b-=F):(w=0,x=b=(h+d)/2),(k-=2*S)>Js?(v+=S*=g?1:-1,_-=S):(k=0,v=_=(h+d)/2)}var B=f*Hs(v),T=f*Gs(v),z=c*Hs(b),N=c*Gs(b);if(E>Js){var O,R=f*Hs(_),$=f*Gs(_),q=c*Hs(x),L=c*Gs(x);if(p<Zs&&(O=ul(B,T,q,L,R,$,z,N))){var U=B-O[0],P=T-O[1],j=R-O[0],I=$-O[1],W=1/Gs(tl((U*j+P*I)/(Xs(U*U+P*P)*Xs(j*j+I*I)))/2),H=Xs(O[0]*O[0]+O[1]*O[1]);D=Vs(E,(c-H)/(W-1)),C=Vs(E,(f-H)/(W+1))}}k>Js?C>Js?(m=sl(q,L,B,T,f,C,g),y=sl(R,$,z,N,f,C,g),u.moveTo(m.cx+m.x01,m.cy+m.y01),C<E?u.arc(m.cx,m.cy,C,Ws(m.y01,m.x01),Ws(y.y01,y.x01),!g):(u.arc(m.cx,m.cy,C,Ws(m.y01,m.x01),Ws(m.y11,m.x11),!g),u.arc(0,0,f,Ws(m.cy+m.y11,m.cx+m.x11),Ws(y.cy+y.y11,y.cx+y.x11),!g),u.arc(y.cx,y.cy,C,Ws(y.y11,y.x11),Ws(y.y01,y.x01),!g))):(u.moveTo(B,T),u.arc(0,0,f,v,_,!g)):u.moveTo(B,T),c>Js&&w>Js?D>Js?(m=sl(z,N,R,$,c,-D,g),y=sl(B,T,q,L,c,-D,g),u.lineTo(m.cx+m.x01,m.cy+m.y01),D<E?u.arc(m.cx,m.cy,D,Ws(m.y01,m.x01),Ws(y.y01,y.x01),!g):(u.arc(m.cx,m.cy,D,Ws(m.y01,m.x01),Ws(m.y11,m.x11),!g),u.arc(0,0,c,Ws(m.cy+m.y11,m.cx+m.x11),Ws(y.cy+y.y11,y.cx+y.x11),g),u.arc(y.cx,y.cy,D,Ws(y.y11,y.x11),Ws(y.y01,y.x01),!g))):u.arc(0,0,c,b,x,g):u.lineTo(z,N)}else u.moveTo(0,0);if(u.closePath(),s)return u=null,s+""||null}return s.centroid=function(){var n=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-Zs/2;return[Hs(r)*n,Gs(r)*n]},s.innerRadius=function(e){return arguments.length?(t="function"==typeof e?e:js(+e),s):t},s.outerRadius=function(t){return arguments.length?(e="function"==typeof t?t:js(+t),s):e},s.cornerRadius=function(t){return arguments.length?(n="function"==typeof t?t:js(+t),s):n},s.padRadius=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:js(+t),s):r},s.startAngle=function(t){return arguments.length?(i="function"==typeof t?t:js(+t),s):i},s.endAngle=function(t){return arguments.length?(o="function"==typeof t?t:js(+t),s):o},s.padAngle=function(t){return arguments.length?(a="function"==typeof t?t:js(+t),s):a},s.context=function(t){return arguments.length?(u=null==t?null:t,s):u},s}().startAngle((t=>t.startAngle||0)).endAngle((t=>t.endAngle||0)).padAngle((t=>t.padAngle||0)).innerRadius((t=>t.innerRadius||0)).outerRadius((t=>t.outerRadius||0)).cornerRadius((t=>t.cornerRadius||0)),Up=gl().x(Rp).y1($p).y0((t=>(t.y||0)+(t.height||0))).defined(qp),Pp=gl().y($p).x1(Rp).x0((t=>(t.x||0)+(t.width||0))).defined(qp),jp=pl().x(Rp).y($p).defined(qp),Ip=zp().x(Rp).y($p).width((t=>t.width||0)).height((t=>t.height||0)).cornerRadius((t=>Op(t.cornerRadiusTopLeft,t.cornerRadius)||0),(t=>Op(t.cornerRadiusTopRight,t.cornerRadius)||0),(t=>Op(t.cornerRadiusBottomRight,t.cornerRadius)||0),(t=>Op(t.cornerRadiusBottomLeft,t.cornerRadius)||0)),Wp=function(t,e){var n=null;function r(){var r;if(n||(n=r=Ps()),t.apply(this,arguments).draw(n,+e.apply(this,arguments)),r)return n=null,r+""||null}return t="function"==typeof t?t:js(t||ml),e="function"==typeof e?e:js(void 0===e?64:+e),r.type=function(e){return arguments.length?(t="function"==typeof e?e:js(e),r):t},r.size=function(t){return arguments.length?(e="function"==typeof t?t:js(+t),r):e},r.context=function(t){return arguments.length?(n=null==t?null:t,r):n},r}().type((t=>Ap(t.shape||"circle"))).size((t=>Op(t.size,64))),Hp=Np().x(Rp).y($p).defined(qp).size((t=>t.size||1));function Yp(t){return t.cornerRadius||t.cornerRadiusTopLeft||t.cornerRadiusTopRight||t.cornerRadiusBottomRight||t.cornerRadiusBottomLeft}function Vp(t,e,n,r){return Ip.context(t)(e,n,r)}var Gp=1;function Xp(){Gp=1}function Jp(t,e,n){var r=e.clip,i=t._defs,o=e.clip_id||(e.clip_id="clip"+Gp++),a=i.clipping[o]||(i.clipping[o]={id:o});return Y(r)?a.path=r(null):Yp(n)?a.path=Vp(null,n,0,0):(a.width=n.width||0,a.height=n.height||0),"url(#"+o+")"}function Zp(t){this.clear(),t&&this.union(t)}function Qp(t){this.mark=t,this.bounds=this.bounds||new Zp}function Kp(t){Qp.call(this,t),this.items=this.items||[]}function tg(t){this._pending=0,this._loader=t||So()}function eg(t){t._pending+=1}function ng(t){t._pending-=1}function rg(t,e,n){if(e.stroke&&0!==e.opacity&&0!==e.strokeOpacity){const r=null!=e.strokeWidth?+e.strokeWidth:1;t.expand(r+(n?function(t,e){return t.strokeJoin&&"miter"!==t.strokeJoin?0:e}(e,r):0))}return t}Zp.prototype={clone(){return new Zp(this)},clear(){return this.x1=+Number.MAX_VALUE,this.y1=+Number.MAX_VALUE,this.x2=-Number.MAX_VALUE,this.y2=-Number.MAX_VALUE,this},empty(){return this.x1===+Number.MAX_VALUE&&this.y1===+Number.MAX_VALUE&&this.x2===-Number.MAX_VALUE&&this.y2===-Number.MAX_VALUE},equals(t){return this.x1===t.x1&&this.y1===t.y1&&this.x2===t.x2&&this.y2===t.y2},set(t,e,n,r){return n<t?(this.x2=t,this.x1=n):(this.x1=t,this.x2=n),r<e?(this.y2=e,this.y1=r):(this.y1=e,this.y2=r),this},add(t,e){return t<this.x1&&(this.x1=t),e<this.y1&&(this.y1=e),t>this.x2&&(this.x2=t),e>this.y2&&(this.y2=e),this},expand(t){return this.x1-=t,this.y1-=t,this.x2+=t,this.y2+=t,this},round(){return this.x1=Math.floor(this.x1),this.y1=Math.floor(this.y1),this.x2=Math.ceil(this.x2),this.y2=Math.ceil(this.y2),this},scale(t){return this.x1*=t,this.y1*=t,this.x2*=t,this.y2*=t,this},translate(t,e){return this.x1+=t,this.x2+=t,this.y1+=e,this.y2+=e,this},rotate(t,e,n){const r=this.rotatedPoints(t,e,n);return this.clear().add(r[0],r[1]).add(r[2],r[3]).add(r[4],r[5]).add(r[6],r[7])},rotatedPoints(t,e,n){var{x1:r,y1:i,x2:o,y2:a}=this,u=Math.cos(t),s=Math.sin(t),l=e-e*u+n*s,c=n-e*s-n*u;return[u*r-s*i+l,s*r+u*i+c,u*r-s*a+l,s*r+u*a+c,u*o-s*i+l,s*o+u*i+c,u*o-s*a+l,s*o+u*a+c]},union(t){return t.x1<this.x1&&(this.x1=t.x1),t.y1<this.y1&&(this.y1=t.y1),t.x2>this.x2&&(this.x2=t.x2),t.y2>this.y2&&(this.y2=t.y2),this},intersect(t){return t.x1>this.x1&&(this.x1=t.x1),t.y1>this.y1&&(this.y1=t.y1),t.x2<this.x2&&(this.x2=t.x2),t.y2<this.y2&&(this.y2=t.y2),this},encloses(t){return t&&this.x1<=t.x1&&this.x2>=t.x2&&this.y1<=t.y1&&this.y2>=t.y2},alignsWith(t){return t&&(this.x1==t.x1||this.x2==t.x2||this.y1==t.y1||this.y2==t.y2)},intersects(t){return t&&!(this.x2<t.x1||this.x1>t.x2||this.y2<t.y1||this.y1>t.y2)},contains(t,e){return!(t<this.x1||t>this.x2||e<this.y1||e>this.y2)},width(){return this.x2-this.x1},height(){return this.y2-this.y1}},st(Kp,Qp),tg.prototype={pending(){return this._pending},sanitizeURL(t){const e=this;return eg(e),e._loader.sanitize(t,{context:"href"}).then((t=>(ng(e),t))).catch((()=>(ng(e),null)))},loadImage(t){const e=this,n=Jl();return eg(e),e._loader.sanitize(t,{context:"image"}).then((t=>{const r=t.href;if(!r||!n)throw{url:r};const i=new n,o=it(t,"crossOrigin")?t.crossOrigin:"anonymous";return null!=o&&(i.crossOrigin=o),i.onload=()=>ng(e),i.onerror=()=>ng(e),i.src=r,i})).catch((t=>(ng(e),{complete:!1,width:0,height:0,src:t&&t.url||""})))},ready(){const t=this;return new Promise((e=>{!function n(r){t.pending()?setTimeout((()=>{n(!0)}),10):e(r)}(!1)}))}};const ig=hp-1e-8;let og,ag,ug,sg,lg,cg,fg,hg;const dg=(t,e)=>og.add(t,e),pg=(t,e)=>dg(ag=t,ug=e),gg=t=>dg(t,og.y1),mg=t=>dg(og.x1,t),yg=(t,e)=>lg*t+fg*e,vg=(t,e)=>cg*t+hg*e,_g=(t,e)=>dg(yg(t,e),vg(t,e)),xg=(t,e)=>pg(yg(t,e),vg(t,e));function bg(t,e){return og=t,e?(sg=e*cp,lg=hg=Math.cos(sg),cg=Math.sin(sg),fg=-cg):(lg=hg=1,sg=cg=fg=0),wg}const wg={beginPath(){},closePath(){},moveTo:xg,lineTo:xg,rect(t,e,n,r){sg?(_g(t+n,e),_g(t+n,e+r),_g(t,e+r),xg(t,e)):(dg(t+n,e+r),pg(t,e))},quadraticCurveTo(t,e,n,r){const i=yg(t,e),o=vg(t,e),a=yg(n,r),u=vg(n,r);kg(ag,i,a,gg),kg(ug,o,u,mg),pg(a,u)},bezierCurveTo(t,e,n,r,i,o){const a=yg(t,e),u=vg(t,e),s=yg(n,r),l=vg(n,r),c=yg(i,o),f=vg(i,o);Ag(ag,a,s,c,gg),Ag(ug,u,l,f,mg),pg(c,f)},arc(t,e,n,r,i,o){if(r+=sg,i+=sg,ag=n*Math.cos(i)+t,ug=n*Math.sin(i)+e,Math.abs(i-r)>ig)dg(t-n,e-n),dg(t+n,e+n);else{const a=r=>dg(n*Math.cos(r)+t,n*Math.sin(r)+e);let u,s;if(a(r),a(i),i!==r)if((r%=hp)<0&&(r+=hp),(i%=hp)<0&&(i+=hp),i<r&&(o=!o,u=r,r=i,i=u),o)for(i-=hp,u=r-r%fp,s=0;s<4&&u>i;++s,u-=fp)a(u);else for(u=r-r%fp+fp,s=0;s<4&&u<i;++s,u+=fp)a(u)}}};function kg(t,e,n,r){const i=(t-e)/(t+n-2*e);0<i&&i<1&&r(t+(e-t)*i)}function Ag(t,e,n,r,i){const o=r-t+3*e-3*n,a=t+n-2*e,u=t-e;let s,l=0,c=0;Math.abs(o)>1e-14?(s=a*a+u*o,s>=0&&(s=Math.sqrt(s),l=(-a+s)/o,c=(-a-s)/o)):l=.5*u/a,0<l&&l<1&&i(Mg(l,t,e,n,r)),0<c&&c<1&&i(Mg(c,t,e,n,r))}function Mg(t,e,n,r,i){const o=1-t,a=o*o,u=t*t;return a*o*e+3*a*t*n+3*o*u*r+u*t*i}var Eg=(Eg=Xl(1,1))?Eg.getContext("2d"):null;const Dg=new Zp;function Cg(t){return function(e,n){if(!Eg)return!0;t(Eg,e),Dg.clear().union(e.bounds).intersect(n).round();const{x1:r,y1:i,x2:o,y2:a}=Dg;for(let t=i;t<=a;++t)for(let e=r;e<=o;++e)if(Eg.isPointInPath(e,t))return!0;return!1}}function Fg(t,e){return e.contains(t.x||0,t.y||0)}function Sg(t,e){const n=t.x||0,r=t.y||0,i=t.width||0,o=t.height||0;return e.intersects(Dg.set(n,r,n+i,r+o))}function Bg(t,e){const n=t.x||0,r=t.y||0;return Tg(e,n,r,null!=t.x2?t.x2:n,null!=t.y2?t.y2:r)}function Tg(t,e,n,r,i){const{x1:o,y1:a,x2:u,y2:s}=t,l=r-e,c=i-n;let f,h,d,p,g=0,m=1;for(p=0;p<4;++p){if(0===p&&(f=-l,h=-(o-e)),1===p&&(f=l,h=u-e),2===p&&(f=-c,h=-(a-n)),3===p&&(f=c,h=s-n),Math.abs(f)<1e-10&&h<0)return!1;if(d=h/f,f<0){if(d>m)return!1;d>g&&(g=d)}else if(f>0){if(d<g)return!1;d<m&&(m=d)}}return!0}function zg(t,e){t.globalCompositeOperation=e.blend||"source-over"}function Ng(t,e){return null==t?e:t}function Og(t,e){const n=e.length;for(let r=0;r<n;++r)t.addColorStop(e[r].offset,e[r].color);return t}function Rg(t,e,n){return ep(n)?function(t,e,n){const r=n.width(),i=n.height();let o;if("radial"===e.gradient)o=t.createRadialGradient(n.x1+Ng(e.x1,.5)*r,n.y1+Ng(e.y1,.5)*i,Math.max(r,i)*Ng(e.r1,0),n.x1+Ng(e.x2,.5)*r,n.y1+Ng(e.y2,.5)*i,Math.max(r,i)*Ng(e.r2,.5));else{const a=Ng(e.x1,0),u=Ng(e.y1,0),s=Ng(e.x2,1),l=Ng(e.y2,0);if(a!==s&&u!==l&&r!==i){const n=Xl(Math.ceil(r),Math.ceil(i)),o=n.getContext("2d");return o.scale(r,i),o.fillStyle=Og(o.createLinearGradient(a,u,s,l),e.stops),o.fillRect(0,0,r,i),t.createPattern(n,"no-repeat")}o=t.createLinearGradient(n.x1+a*r,n.y1+u*i,n.x1+s*r,n.y1+l*i)}return Og(o,e.stops)}(t,n,e.bounds):n}function $g(t,e,n){return(n*=null==e.fillOpacity?1:e.fillOpacity)>0&&(t.globalAlpha=n,t.fillStyle=Rg(t,e,e.fill),!0)}var qg=[];function Lg(t,e,n){var r=null!=(r=e.strokeWidth)?r:1;return!(r<=0)&&((n*=null==e.strokeOpacity?1:e.strokeOpacity)>0&&(t.globalAlpha=n,t.strokeStyle=Rg(t,e,e.stroke),t.lineWidth=r,t.lineCap=e.strokeCap||"butt",t.lineJoin=e.strokeJoin||"miter",t.miterLimit=e.strokeMiterLimit||10,t.setLineDash&&(t.setLineDash(e.strokeDash||qg),t.lineDashOffset=e.strokeDashOffset||0),!0))}function Ug(t,e){return t.zindex-e.zindex||t.index-e.index}function Pg(t){if(!t.zdirty)return t.zitems;var e,n,r,i=t.items,o=[];for(n=0,r=i.length;n<r;++n)(e=i[n]).index=n,e.zindex&&o.push(e);return t.zdirty=!1,t.zitems=o.sort(Ug)}function jg(t,e){var n,r,i=t.items;if(!i||!i.length)return;const o=Pg(t);if(o&&o.length){for(n=0,r=i.length;n<r;++n)i[n].zindex||e(i[n]);i=o}for(n=0,r=i.length;n<r;++n)e(i[n])}function Ig(t,e){var n,r,i=t.items;if(!i||!i.length)return null;const o=Pg(t);for(o&&o.length&&(i=o),r=i.length;--r>=0;)if(n=e(i[r]))return n;if(i===o)for(r=(i=t.items).length;--r>=0;)if(!i[r].zindex&&(n=e(i[r])))return n;return null}function Wg(t){return function(e,n,r){jg(n,(n=>{r&&!r.intersects(n.bounds)||Yg(t,e,n,n)}))}}function Hg(t){return function(e,n,r){!n.items.length||r&&!r.intersects(n.bounds)||Yg(t,e,n.items[0],n.items)}}function Yg(t,e,n,r){var i=null==n.opacity?1:n.opacity;0!==i&&(t(e,r)||(zg(e,n),n.fill&&$g(e,n,i)&&e.fill(),n.stroke&&Lg(e,n,i)&&e.stroke()))}function Vg(t){return t=t||g,function(e,n,r,i,o,a){return r*=e.pixelRatio,i*=e.pixelRatio,Ig(n,(n=>{const u=n.bounds;if((!u||u.contains(o,a))&&u)return t(e,n,r,i,o,a)?n:void 0}))}}function Gg(t,e){return function(n,r,i,o){var a,u,s=Array.isArray(r)?r[0]:r,l=null==e?s.fill:e,c=s.stroke&&n.isPointInStroke;return c&&(a=s.strokeWidth,u=s.strokeCap,n.lineWidth=null!=a?a:1,n.lineCap=null!=u?u:"butt"),!t(n,r)&&(l&&n.isPointInPath(i,o)||c&&n.isPointInStroke(i,o))}}function Xg(t){return Vg(Gg(t))}function Jg(t,e){return"translate("+t+","+e+")"}function Zg(t){return"rotate("+t+")"}function Qg(t){return Jg(t.x||0,t.y||0)}function Kg(t,e,n){function r(t,n){var r=n.x||0,i=n.y||0,o=n.angle||0;t.translate(r,i),o&&t.rotate(o*=cp),t.beginPath(),e(t,n),o&&t.rotate(-o),t.translate(-r,-i)}return{type:t,tag:"path",nested:!1,attr:function(t,n){t("transform",function(t){return Jg(t.x||0,t.y||0)+(t.angle?" "+Zg(t.angle):"")}(n)),t("d",e(null,n))},bound:function(t,n){return e(bg(t,n.angle),n),rg(t,n).translate(n.x||0,n.y||0)},draw:Wg(r),pick:Xg(r),isect:n||Cg(r)}}var tm=Kg("arc",(function(t,e){return Lp.context(t)(e)}));function em(t,e,n){function r(t,n){t.beginPath(),e(t,n)}const i=Gg(r);return{type:t,tag:"path",nested:!0,attr:function(t,n){var r=n.mark.items;r.length&&t("d",e(null,r))},bound:function(t,n){var r=n.items;return 0===r.length?t:(e(bg(t),r),rg(t,r[0]))},draw:Hg(r),pick:function(t,e,n,r,o,a){var u=e.items,s=e.bounds;return!u||!u.length||s&&!s.contains(o,a)?null:(n*=t.pixelRatio,r*=t.pixelRatio,i(t,u,n,r)?u[0]:null)},isect:Fg,tip:n}}var nm=em("area",(function(t,e){const n=e[0],r=n.interpolate||"linear";return("horizontal"===n.orient?Pp:Up).curve(ap(r,n.orient,n.tension)).context(t)(e)}),(function(t,e){for(var n,r,i="horizontal"===t[0].orient?e[1]:e[0],o="horizontal"===t[0].orient?"y":"x",a=t.length,u=1/0;--a>=0;)!1!==t[a].defined&&(r=Math.abs(t[a][o]-i))<u&&(u=r,n=t[a]);return n}));function rm(t,e){t.beginPath(),Yp(e)?Vp(t,e,0,0):t.rect(0,0,e.width||0,e.height||0),t.clip()}function im(t){const e=Ng(t.strokeWidth,1);return null!=t.strokeOffset?t.strokeOffset:t.stroke&&e>.5&&e<1.5?.5-Math.abs(e-1):0}function om(t,e){const n=im(e);t("d",Vp(null,e,n,n))}function am(t,e,n,r){const i=im(e);t.beginPath(),Vp(t,e,(n||0)+i,(r||0)+i)}const um=Gg(am),sm=Gg(am,!1),lm=Gg(am,!0);var cm={type:"group",tag:"g",nested:!1,attr:function(t,e){t("transform",Qg(e))},bound:function(t,e){if(!e.clip&&e.items){const n=e.items,r=n.length;for(let e=0;e<r;++e)t.union(n[e].bounds)}return(e.clip||e.width||e.height)&&!e.noBound&&t.add(0,0).add(e.width||0,e.height||0),rg(t,e),t.translate(e.x||0,e.y||0)},draw:function(t,e,n){jg(e,(e=>{const r=e.x||0,i=e.y||0,o=e.strokeForeground,a=null==e.opacity?1:e.opacity;(e.stroke||e.fill)&&a&&(am(t,e,r,i),zg(t,e),e.fill&&$g(t,e,a)&&t.fill(),e.stroke&&!o&&Lg(t,e,a)&&t.stroke()),t.save(),t.translate(r,i),e.clip&&rm(t,e),n&&n.translate(-r,-i),jg(e,(e=>{this.draw(t,e,n)})),n&&n.translate(r,i),t.restore(),o&&e.stroke&&a&&(am(t,e,r,i),zg(t,e),Lg(t,e,a)&&t.stroke())}))},pick:function(t,e,n,r,i,o){if(e.bounds&&!e.bounds.contains(i,o)||!e.items)return null;const a=n*t.pixelRatio,u=r*t.pixelRatio;return Ig(e,(s=>{let l,c,f;const h=s.bounds;if(h&&!h.contains(i,o))return;c=s.x||0,f=s.y||0;const d=c+(s.width||0),p=f+(s.height||0),g=s.clip;if(g&&(i<c||i>d||o<f||o>p))return;if(t.save(),t.translate(c,f),c=i-c,f=o-f,g&&Yp(s)&&!lm(t,s,a,u))return t.restore(),null;const m=s.strokeForeground,y=!1!==e.interactive;return y&&m&&s.stroke&&sm(t,s,a,u)?(t.restore(),s):(l=Ig(s,(t=>function(t,e,n){return(!1!==t.interactive||"group"===t.marktype)&&t.bounds&&t.bounds.contains(e,n)}(t,c,f)?this.pick(t,n,r,c,f):null)),!l&&y&&(s.fill||!m&&s.stroke)&&um(t,s,a,u)&&(l=s),t.restore(),l||null)}))},isect:Sg,content:function(t,e,n){t("clip-path",e.clip?Jp(n,e,e):null)},background:function(t,e){t("class","background"),t("aria-hidden",!0),om(t,e)},foreground:function(t,e){t("class","foreground"),t("aria-hidden",!0),e.strokeForeground?om(t,e):t("d","")}},fm={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1"};function hm(t,e){var n=t.image;return(!n||t.url&&t.url!==n.url)&&(n={complete:!1,width:0,height:0},e.loadImage(t.url).then((e=>{t.image=e,t.image.url=t.url}))),n}function dm(t,e){return null!=t.width?t.width:e&&e.width?!1!==t.aspect&&t.height?t.height*e.width/e.height:e.width:0}function pm(t,e){return null!=t.height?t.height:e&&e.height?!1!==t.aspect&&t.width?t.width*e.height/e.width:e.height:0}function gm(t,e){return"center"===t?e/2:"right"===t?e:0}function mm(t,e){return"middle"===t?e/2:"bottom"===t?e:0}var ym={type:"image",tag:"image",nested:!1,attr:function(t,e,n){const r=hm(e,n),i=dm(e,r),o=pm(e,r),a=(e.x||0)-gm(e.align,i),u=(e.y||0)-mm(e.baseline,o);t("href",!r.src&&r.toDataURL?r.toDataURL():r.src||"",fm["xmlns:xlink"],"xlink:href"),t("transform",Jg(a,u)),t("width",i),t("height",o),t("preserveAspectRatio",!1===e.aspect?"none":"xMidYMid")},bound:function(t,e){const n=e.image,r=dm(e,n),i=pm(e,n),o=(e.x||0)-gm(e.align,r),a=(e.y||0)-mm(e.baseline,i);return t.set(o,a,o+r,a+i)},draw:function(t,e,n){jg(e,(e=>{if(n&&!n.intersects(e.bounds))return;const r=hm(e,this);let i=dm(e,r),o=pm(e,r);if(0===i||0===o)return;let a,u,s,l,c=(e.x||0)-gm(e.align,i),f=(e.y||0)-mm(e.baseline,o);!1!==e.aspect&&(u=r.width/r.height,s=e.width/e.height,u==u&&s==s&&u!==s&&(s<u?(l=i/u,f+=(o-l)/2,o=l):(l=o*u,c+=(i-l)/2,i=l))),(r.complete||r.toDataURL)&&(zg(t,e),t.globalAlpha=null!=(a=e.opacity)?a:1,t.imageSmoothingEnabled=!1!==e.smooth,t.drawImage(r,c,f,i,o))}))},pick:Vg(),isect:g,get:hm,xOffset:gm,yOffset:mm},vm=em("line",(function(t,e){const n=e[0],r=n.interpolate||"linear";return jp.curve(ap(r,n.orient,n.tension)).context(t)(e)}),(function(t,e){for(var n,r,i=Math.pow(t[0].strokeWidth||1,2),o=t.length;--o>=0;)if(!1!==t[o].defined&&(n=t[o].x-e[0])*n+(r=t[o].y-e[1])*r<i)return t[o];return null}));function _m(t,e){var n=e.path;if(null==n)return!0;var r=e.x||0,i=e.y||0,o=e.scaleX||1,a=e.scaleY||1,u=(e.angle||0)*cp,s=e.pathCache;s&&s.path===n||((e.pathCache=s=lp(n)).path=n),u&&t.rotate&&t.translate?(t.translate(r,i),t.rotate(u),xp(t,s,0,0,o,a),t.rotate(-u),t.translate(-r,-i)):xp(t,s,r,i,o,a)}var xm={type:"path",tag:"path",nested:!1,attr:function(t,e){var n=e.scaleX||1,r=e.scaleY||1;1===n&&1===r||t("vector-effect","non-scaling-stroke"),t("transform",function(t){return Jg(t.x||0,t.y||0)+(t.angle?" "+Zg(t.angle):"")+(t.scaleX||t.scaleY?" "+(e=t.scaleX||1,n=t.scaleY||1,"scale("+e+","+n+")"):"");var e,n}(e)),t("d",e.path)},bound:function(t,e){return _m(bg(t,e.angle),e)?t.set(0,0,0,0):rg(t,e,!0)},draw:Wg(_m),pick:Xg(_m),isect:Cg(_m)};function bm(t,e){t.beginPath(),Vp(t,e)}var wm={type:"rect",tag:"path",nested:!1,attr:function(t,e){t("d",Vp(null,e))},bound:function(t,e){var n,r;return rg(t.set(n=e.x||0,r=e.y||0,n+e.width||0,r+e.height||0),e)},draw:Wg(bm),pick:Xg(bm),isect:Sg};function km(t,e,n){var r,i,o,a;return!(!e.stroke||!Lg(t,e,n))&&(r=e.x||0,i=e.y||0,o=null!=e.x2?e.x2:r,a=null!=e.y2?e.y2:i,t.beginPath(),t.moveTo(r,i),t.lineTo(o,a),!0)}var Am={type:"rule",tag:"line",nested:!1,attr:function(t,e){t("transform",Qg(e)),t("x2",null!=e.x2?e.x2-(e.x||0):0),t("y2",null!=e.y2?e.y2-(e.y||0):0)},bound:function(t,e){var n,r;return rg(t.set(n=e.x||0,r=e.y||0,null!=e.x2?e.x2:n,null!=e.y2?e.y2:r),e)},draw:function(t,e,n){jg(e,(e=>{if(!n||n.intersects(e.bounds)){var r=null==e.opacity?1:e.opacity;r&&km(t,e,r)&&(zg(t,e),t.stroke())}}))},pick:Vg((function(t,e,n,r){return!!t.isPointInStroke&&(km(t,e,1)&&t.isPointInStroke(n,r))})),isect:Bg},Mm=Kg("shape",(function(t,e){return(e.mark.shape||e.shape).context(t)(e)})),Em=Kg("symbol",(function(t,e){return Wp.context(t)(e)}),Fg);const Dm=vt();var Cm={height:Nm,measureWidth:Tm,estimateWidth:Sm,width:Sm,canvas:Fm};function Fm(t){Cm.width=t&&Eg?Tm:Sm}function Sm(t,e){return Bm(qm(t,e),Nm(t))}function Bm(t,e){return~~(.8*t.length*e)}function Tm(t,e){return Nm(t)<=0||!(e=qm(t,e))?0:zm(e,Um(t))}function zm(t,e){const n=`(${e}) ${t}`;let r=Dm.get(n);return void 0===r&&(Eg.font=e,r=Eg.measureText(t).width,Dm.set(n,r)),r}function Nm(t){return null!=t.fontSize?+t.fontSize||0:11}function Om(t){return null!=t.lineHeight?t.lineHeight:Nm(t)+2}function Rm(t){return e=t.lineBreak&&t.text&&!_(t.text)?t.text.split(t.lineBreak):t.text,_(e)?e.length>1?e:e[0]:e;var e}function $m(t){const e=Rm(t);return(_(e)?e.length-1:0)*Om(t)}function qm(t,e){const n=null==e?"":(e+"").trim();return t.limit>0&&n.length?function(t,e){var n=+t.limit,r=function(t){if(Cm.width===Tm){const e=Um(t);return t=>zm(t,e)}{const e=Nm(t);return t=>Bm(t,e)}}(t);if(r(e)<n)return e;var i,o=t.ellipsis||"…",a="rtl"===t.dir,u=0,s=e.length;if(n-=r(o),a){for(;u<s;)i=u+s>>>1,r(e.slice(i))>n?u=i+1:s=i;return o+e.slice(u)}for(;u<s;)i=1+(u+s>>>1),r(e.slice(0,i))<n?u=i:s=i-1;return e.slice(0,u)+o}(t,n):n}function Lm(t,e){var n=t.font;return(e&&n?String(n).replace(/"/g,"'"):n)||"sans-serif"}function Um(t,e){return(t.fontStyle?t.fontStyle+" ":"")+(t.fontVariant?t.fontVariant+" ":"")+(t.fontWeight?t.fontWeight+" ":"")+Nm(t)+"px "+Lm(t,e)}function Pm(t){var e=t.baseline,n=Nm(t);return Math.round("top"===e?.79*n:"middle"===e?.3*n:"bottom"===e?-.21*n:"line-top"===e?.29*n+.5*Om(t):"line-bottom"===e?.29*n-.5*Om(t):0)}Fm(!0);const jm={left:"start",center:"middle",right:"end"},Im=new Zp;function Wm(t){var e,n=t.x||0,r=t.y||0,i=t.radius||0;return i&&(e=(t.theta||0)-fp,n+=i*Math.cos(e),r+=i*Math.sin(e)),Im.x1=n,Im.y1=r,Im}function Hm(t,e,n){var r,i=Cm.height(e),o=e.align,a=Wm(e),u=a.x1,s=a.y1,l=e.dx||0,c=(e.dy||0)+Pm(e)-Math.round(.8*i),f=Rm(e);if(_(f)?(i+=Om(e)*(f.length-1),r=f.reduce(((t,n)=>Math.max(t,Cm.width(e,n))),0)):r=Cm.width(e,f),"center"===o?l-=r/2:"right"===o&&(l-=r),t.set(l+=u,c+=s,l+r,c+i),e.angle&&!n)t.rotate(e.angle*cp,u,s);else if(2===n)return t.rotatedPoints(e.angle*cp,u,s);return t}var Ym={arc:tm,area:nm,group:cm,image:ym,line:vm,path:xm,rect:wm,rule:Am,shape:Mm,symbol:Em,text:{type:"text",tag:"text",nested:!1,attr:function(t,e){var n,r=e.dx||0,i=(e.dy||0)+Pm(e),o=Wm(e),a=o.x1,u=o.y1,s=e.angle||0;t("text-anchor",jm[e.align]||"start"),s?(n=Jg(a,u)+" "+Zg(s),(r||i)&&(n+=" "+Jg(r,i))):n=Jg(a+r,u+i),t("transform",n)},bound:Hm,draw:function(t,e,n){jg(e,(e=>{var r,i,o,a,u,s,l,c=null==e.opacity?1:e.opacity;if(!(n&&!n.intersects(e.bounds)||0===c||e.fontSize<=0||null==e.text||0===e.text.length)){if(t.font=Um(e),t.textAlign=e.align||"left",i=(r=Wm(e)).x1,o=r.y1,e.angle&&(t.save(),t.translate(i,o),t.rotate(e.angle*cp),i=o=0),i+=e.dx||0,o+=(e.dy||0)+Pm(e),s=Rm(e),zg(t,e),_(s))for(u=Om(e),a=0;a<s.length;++a)l=qm(e,s[a]),e.fill&&$g(t,e,c)&&t.fillText(l,i,o),e.stroke&&Lg(t,e,c)&&t.strokeText(l,i,o),o+=u;else l=qm(e,s),e.fill&&$g(t,e,c)&&t.fillText(l,i,o),e.stroke&&Lg(t,e,c)&&t.strokeText(l,i,o);e.angle&&t.restore()}}))},pick:Vg((function(t,e,n,r,i,o){if(e.fontSize<=0)return!1;if(!e.angle)return!0;var a=Wm(e),u=a.x1,s=a.y1,l=Hm(Im,e,1),c=-e.angle*cp,f=Math.cos(c),h=Math.sin(c),d=f*i-h*o+(u-f*u+h*s),p=h*i+f*o+(s-h*u-f*s);return l.contains(d,p)})),isect:function(t,e){const n=Hm(Im,t,2);return Tg(e,n[0],n[1],n[2],n[3])||Tg(e,n[0],n[1],n[4],n[5])||Tg(e,n[4],n[5],n[6],n[7])||Tg(e,n[2],n[3],n[6],n[7])}},trail:em("trail",(function(t,e){return Hp.context(t)(e)}),(function(t,e){for(var n,r,i=t.length;--i>=0;)if(!1!==t[i].defined&&(n=t[i].x-e[0])*n+(r=t[i].y-e[1])*r<(n=t[i].size||1)*n)return t[i];return null}))};function Vm(t,e,n){var r=Ym[t.mark.marktype],i=e||r.bound;return r.nested&&(t=t.mark),i(t.bounds||(t.bounds=new Zp),t,n)}var Gm={mark:null};function Xm(t,e,n){var r,i,o,a,u=Ym[t.marktype],s=u.bound,l=t.items,c=l&&l.length;if(u.nested)return c?o=l[0]:(Gm.mark=t,o=Gm),a=Vm(o,s,n),e=e&&e.union(a)||a;if(e=e||t.bounds&&t.bounds.clear()||new Zp,c)for(r=0,i=l.length;r<i;++r)e.union(Vm(l[r],s,n));return t.bounds=e}const Jm=["marktype","name","role","interactive","clip","items","zindex","x","y","width","height","align","baseline","fill","fillOpacity","opacity","blend","stroke","strokeOpacity","strokeWidth","strokeCap","strokeDash","strokeDashOffset","strokeForeground","strokeOffset","startAngle","endAngle","innerRadius","outerRadius","cornerRadius","padAngle","cornerRadiusTopLeft","cornerRadiusTopRight","cornerRadiusBottomLeft","cornerRadiusBottomRight","interpolate","tension","orient","defined","url","aspect","smooth","path","scaleX","scaleY","x2","y2","size","shape","text","angle","theta","radius","dir","dx","dy","ellipsis","limit","lineBreak","lineHeight","font","fontSize","fontWeight","fontStyle","fontVariant","description","aria","ariaRole","ariaRoleDescription"];function Zm(t,e){return JSON.stringify(t,Jm,e)}function Qm(t){return Km("string"==typeof t?JSON.parse(t):t)}function Km(t){var e,n,r,i=t.marktype,o=t.items;if(o)for(n=0,r=o.length;n<r;++n)e=i?"mark":"group",o[n][e]=t,o[n].zindex&&(o[n][e].zdirty=!0),"group"===(i||e)&&Km(o[n]);return i&&Xm(t),t}function ty(t){arguments.length?this.root=Qm(t):(this.root=ey({marktype:"group",name:"root",role:"frame"}),this.root.items=[new Kp(this.root)])}function ey(t,e){const n={bounds:new Zp,clip:!!t.clip,group:e,interactive:!1!==t.interactive,items:[],marktype:t.marktype,name:t.name||void 0,role:t.role||void 0,zindex:t.zindex||0};return null!=t.aria&&(n.aria=t.aria),t.description&&(n.description=t.description),n}function ny(t,e,n){return!t&&"undefined"!=typeof document&&document.createElement&&(t=document),t?n?t.createElementNS(n,e):t.createElement(e):null}function ry(t,e){e=e.toLowerCase();for(var n=t.childNodes,r=0,i=n.length;r<i;++r)if(n[r].tagName.toLowerCase()===e)return n[r]}function iy(t,e,n,r){var i,o=t.childNodes[e];return o&&o.tagName.toLowerCase()===n.toLowerCase()||(i=o||null,o=ny(t.ownerDocument,n,r),t.insertBefore(o,i)),o}function oy(t,e){for(var n=t.childNodes,r=n.length;r>e;)t.removeChild(n[--r]);return t}function ay(t){return"mark-"+t.marktype+(t.role?" role-"+t.role:"")+(t.name?" "+t.name:"")}function uy(t,e){const n=e.getBoundingClientRect();return[t.clientX-n.left-(e.clientLeft||0),t.clientY-n.top-(e.clientTop||0)]}function sy(t,e){this._active=null,this._handlers={},this._loader=t||So(),this._tooltip=e||ly}function ly(t,e,n,r){t.element().setAttribute("title",r||"")}function cy(t){this._el=null,this._bgcolor=null,this._loader=new tg(t)}ty.prototype={toJSON(t){return Zm(this.root,t||0)},mark(t,e,n){const r=ey(t,e=e||this.root.items[0]);return e.items[n]=r,r.zindex&&(r.group.zdirty=!0),r}},sy.prototype={initialize(t,e,n){return this._el=t,this._obj=n||null,this.origin(e)},element(){return this._el},canvas(){return this._el&&this._el.firstChild},origin(t){return arguments.length?(this._origin=t||[0,0],this):this._origin.slice()},scene(t){return arguments.length?(this._scene=t,this):this._scene},on(){},off(){},_handlerIndex(t,e,n){for(let r=t?t.length:0;--r>=0;)if(t[r].type===e&&(!n||t[r].handler===n))return r;return-1},handlers(t){const e=this._handlers,n=[];if(t)n.push(...e[this.eventName(t)]);else for(const t in e)n.push(...e[t]);return n},eventName(t){const e=t.indexOf(".");return e<0?t:t.slice(0,e)},handleHref(t,e,n){this._loader.sanitize(n,{context:"href"}).then((e=>{const n=new MouseEvent(t.type,t),r=ny(null,"a");for(const t in e)r.setAttribute(t,e[t]);r.dispatchEvent(n)})).catch((()=>{}))},handleTooltip(t,e,n){if(e&&null!=e.tooltip){e=function(t,e,n,r){var i,o,a=t&&t.mark;if(a&&(i=Ym[a.marktype]).tip){for((o=uy(e,n))[0]-=r[0],o[1]-=r[1];t=t.mark.group;)o[0]-=t.x||0,o[1]-=t.y||0;t=i.tip(a.items,o)}return t}(e,t,this.canvas(),this._origin);const r=n&&e&&e.tooltip||null;this._tooltip.call(this._obj,this,t,e,r)}},getItemBoundingClientRect(t){const e=this.canvas();if(!e)return;const n=e.getBoundingClientRect(),r=this._origin,i=t.bounds,o=i.width(),a=i.height();let u=i.x1+r[0]+n.left,s=i.y1+r[1]+n.top;for(;t.mark&&(t=t.mark.group);)u+=t.x||0,s+=t.y||0;return{x:u,y:s,width:o,height:a,left:u,top:s,right:u+o,bottom:s+a}}},cy.prototype={initialize(t,e,n,r,i){return this._el=t,this.resize(e,n,r,i)},element(){return this._el},canvas(){return this._el&&this._el.firstChild},background(t){return 0===arguments.length?this._bgcolor:(this._bgcolor=t,this)},resize(t,e,n,r){return this._width=t,this._height=e,this._origin=n||[0,0],this._scale=r||1,this},dirty(){},render(t){const e=this;return e._call=function(){e._render(t)},e._call(),e._call=null,e},_render(){},renderAsync(t){const e=this.render(t);return this._ready?this._ready.then((()=>e)):Promise.resolve(e)},_load(t,e){var n=this,r=n._loader[t](e);if(!n._ready){const t=n._call;n._ready=n._loader.ready().then((e=>{e&&t(),n._ready=null}))}return r},sanitizeURL(t){return this._load("sanitizeURL",t)},loadImage(t){return this._load("loadImage",t)}};const fy="dragenter",hy="dragleave",dy="dragover",py="mousedown",gy="mousemove",my="mouseout",yy="mouseover",vy="click",_y="mousewheel",xy="touchstart",by="touchmove",wy="touchend",ky=gy,Ay=my,My=vy;function Ey(t,e){sy.call(this,t,e),this._down=null,this._touch=null,this._first=!0,this._events={}}function Dy(t,e){(t=>t===xy||t===by||t===wy?[xy,by,wy]:[t])(e).forEach((e=>function(t,e){const n=t.canvas();n&&!t._events[e]&&(t._events[e]=1,n.addEventListener(e,t[e]?n=>t[e](n):n=>t.fire(e,n)))}(t,e)))}function Cy(t,e,n){return function(r){const i=this._active,o=this.pickEvent(r);o===i||(i&&i.exit||this.fire(n,r),this._active=o,this.fire(e,r)),this.fire(t,r)}}function Fy(t){return function(e){this.fire(t,e),this._active=null}}st(Ey,sy,{initialize(t,e,n){return this._canvas=t&&ry(t,"canvas"),[vy,py,gy,my,hy].forEach((t=>Dy(this,t))),sy.prototype.initialize.call(this,t,e,n)},canvas(){return this._canvas},context(){return this._canvas.getContext("2d")},events:["keydown","keypress","keyup",fy,hy,dy,py,"mouseup",gy,my,yy,vy,"dblclick","wheel",_y,xy,by,wy],DOMMouseScroll(t){this.fire(_y,t)},mousemove:Cy(gy,yy,my),dragover:Cy(dy,fy,hy),mouseout:Fy(my),dragleave:Fy(hy),mousedown(t){this._down=this._active,this.fire(py,t)},click(t){this._down===this._active&&(this.fire(vy,t),this._down=null)},touchstart(t){this._touch=this.pickEvent(t.changedTouches[0]),this._first&&(this._active=this._touch,this._first=!1),this.fire(xy,t,!0)},touchmove(t){this.fire(by,t,!0)},touchend(t){this.fire(wy,t,!0),this._touch=null},fire(t,e,n){const r=n?this._touch:this._active,i=this._handlers[t];if(e.vegaType=t,t===My&&r&&r.href?this.handleHref(e,r,r.href):t!==ky&&t!==Ay||this.handleTooltip(e,r,t!==Ay),i)for(let t=0,n=i.length;t<n;++t)i[t].handler.call(this._obj,e,r)},on(t,e){const n=this.eventName(t),r=this._handlers;return this._handlerIndex(r[n],t,e)<0&&(Dy(this,t),(r[n]||(r[n]=[])).push({type:t,handler:e})),this},off(t,e){const n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e);return i>=0&&r.splice(i,1),this},pickEvent(t){const e=uy(t,this._canvas),n=this._origin;return this.pick(this._scene,e[0],e[1],e[0]-n[0],e[1]-n[1])},pick(t,e,n,r,i){const o=this.context();return Ym[t.marktype].pick.call(this,o,t,e,n,r,i)}});var Sy="undefined"!=typeof window&&window.devicePixelRatio||1;function By(t){cy.call(this,t),this._options={},this._redraw=!1,this._dirty=new Zp,this._tempb=new Zp}const Ty=cy.prototype;function zy(t,e){sy.call(this,t,e);const n=this;n._hrefHandler=Ny(n,((t,e)=>{e&&e.href&&n.handleHref(t,e,e.href)})),n._tooltipHandler=Ny(n,((t,e)=>{n.handleTooltip(t,e,t.type!==Ay)}))}st(By,cy,{initialize(t,e,n,r,i,o){return this._options=o||{},this._canvas=this._options.externalContext?null:Xl(1,1,this._options.type),t&&this._canvas&&(oy(t,0).appendChild(this._canvas),this._canvas.setAttribute("class","marks")),Ty.initialize.call(this,t,e,n,r,i)},resize(t,e,n,r){if(Ty.resize.call(this,t,e,n,r),this._canvas)!function(t,e,n,r,i,o){const a="undefined"!=typeof HTMLElement&&t instanceof HTMLElement&&null!=t.parentNode,u=t.getContext("2d"),s=a?Sy:i;t.width=e*s,t.height=n*s;for(const t in o)u[t]=o[t];a&&1!==s&&(t.style.width=e+"px",t.style.height=n+"px"),u.pixelRatio=s,u.setTransform(s,0,0,s,s*r[0],s*r[1])}(this._canvas,this._width,this._height,this._origin,this._scale,this._options.context);else{const t=this._options.externalContext;t||s("CanvasRenderer is missing a valid canvas or context"),t.scale(this._scale,this._scale),t.translate(this._origin[0],this._origin[1])}return this._redraw=!0,this},canvas(){return this._canvas},context(){return this._options.externalContext||(this._canvas?this._canvas.getContext("2d"):null)},dirty(t){const e=this._tempb.clear().union(t.bounds);let n=t.mark.group;for(;n;)e.translate(n.x||0,n.y||0),n=n.mark.group;this._dirty.union(e)},_render(t){const e=this.context(),n=this._origin,r=this._width,i=this._height,o=this._dirty,a=((t,e,n)=>(new Zp).set(0,0,e,n).translate(-t[0],-t[1]))(n,r,i);e.save();const u=this._redraw||o.empty()?(this._redraw=!1,a.expand(1)):function(t,e,n){return e.expand(1).round(),t.pixelRatio%1&&e.scale(t.pixelRatio).round().scale(1/t.pixelRatio),e.translate(-n[0]%1,-n[1]%1),t.beginPath(),t.rect(e.x1,e.y1,e.width(),e.height()),t.clip(),e}(e,a.intersect(o),n);return this.clear(-n[0],-n[1],r,i),this.draw(e,t,u),e.restore(),o.clear(),this},draw(t,e,n){const r=Ym[e.marktype];e.clip&&function(t,e){var n=e.clip;t.save(),Y(n)?(t.beginPath(),n(t),t.clip()):rm(t,e.group)}(t,e),r.draw.call(this,t,e,n),e.clip&&t.restore()},clear(t,e,n,r){const i=this._options,o=this.context();"pdf"===i.type||i.externalContext||o.clearRect(t,e,n,r),null!=this._bgcolor&&(o.fillStyle=this._bgcolor,o.fillRect(t,e,n,r))}});const Ny=(t,e)=>n=>{let r=n.target.__data__;r=Array.isArray(r)?r[0]:r,n.vegaType=n.type,e.call(t._obj,n,r)};st(zy,sy,{initialize(t,e,n){let r=this._svg;return r&&(r.removeEventListener(My,this._hrefHandler),r.removeEventListener(ky,this._tooltipHandler),r.removeEventListener(Ay,this._tooltipHandler)),this._svg=r=t&&ry(t,"svg"),r&&(r.addEventListener(My,this._hrefHandler),r.addEventListener(ky,this._tooltipHandler),r.addEventListener(Ay,this._tooltipHandler)),sy.prototype.initialize.call(this,t,e,n)},canvas(){return this._svg},on(t,e){const n=this.eventName(t),r=this._handlers;if(this._handlerIndex(r[n],t,e)<0){const i={type:t,handler:e,listener:Ny(this,e)};(r[n]||(r[n]=[])).push(i),this._svg&&this._svg.addEventListener(n,i.listener)}return this},off(t,e){const n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e);return i>=0&&(this._svg&&this._svg.removeEventListener(n,r[i].listener),r.splice(i,1)),this}});const Oy="aria-hidden",Ry="aria-label",$y="role",qy="aria-roledescription",Ly="graphics-object",Uy="graphics-symbol",Py=(t,e,n)=>({[$y]:t,[qy]:e,[Ry]:n||void 0}),jy=Ct(["axis-domain","axis-grid","axis-label","axis-tick","axis-title","legend-band","legend-entry","legend-gradient","legend-label","legend-title","legend-symbol","title"]),Iy={axis:{desc:"axis",caption:function(t){const e=t.datum,n=t.orient,r=e.title?Gy(t):null,i=t.context,o=i.scales[e.scale].value,a=i.dataflow.locale(),u=o.type;return("left"===n||"right"===n?"Y":"X")+"-axis"+(r?` titled '${r}'`:"")+` for a ${vd(u)?"discrete":u} scale`+` with ${Qd(a,o,t)}`}},legend:{desc:"legend",caption:function(t){const e=t.datum,n=e.title?Gy(t):null,r=`${e.type||""} legend`.trim(),i=e.scales,o=Object.keys(i),a=t.context,u=a.scales[i[o[0]]].value,s=a.dataflow.locale();return l=r,(l.length?l[0].toUpperCase()+l.slice(1):l)+(n?` titled '${n}'`:"")+` for ${function(t){return(t=t.map((t=>t+("fill"===t||"stroke"===t?" color":"")))).length<2?t[0]:t.slice(0,-1).join(", ")+" and "+M(t)}(o)}`+` with ${Qd(s,u,t)}`;var l}},"title-text":{desc:"title",caption:t=>`Title text '${Vy(t)}'`},"title-subtitle":{desc:"subtitle",caption:t=>`Subtitle text '${Vy(t)}'`}},Wy={ariaRole:$y,ariaRoleDescription:qy,description:Ry};function Hy(t,e){const n=!1===e.aria;if(t(Oy,n||void 0),n||null==e.description)for(const e in Wy)t(Wy[e],void 0);else{const n=e.mark.marktype;t(Ry,e.description),t($y,e.ariaRole||("group"===n?Ly:Uy)),t(qy,e.ariaRoleDescription||`${n} mark`)}}function Yy(t){return!1===t.aria?{[Oy]:!0}:jy[t.role]?null:Iy[t.role]?function(t,e){try{const n=t.items[0],r=e.caption||(()=>"");return Py(e.role||Uy,e.desc,n.description||r(n))}catch(t){return null}}(t,Iy[t.role]):function(t){const e=t.marktype,n="group"===e||"text"===e||t.items.some((t=>null!=t.description&&!1!==t.aria));return Py(n?Ly:Uy,`${e} mark container`,t.description)}(t)}function Vy(t){return W(t.text).join(" ")}function Gy(t){try{return W(M(t.items).items[0].text).join(" ")}catch(t){return null}}const Xy=t=>(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Jy(){let t="",e="",n="";const r=[],i=()=>e=n="",o=(t,n)=>{var r;return null!=n&&(e+=` ${t}="${r=n,Xy(r).replace(/"/g,"&quot;").replace(/\t/g,"&#x9;").replace(/\n/g,"&#xA;").replace(/\r/g,"&#xD;")}"`),a},a={open(u,...s){(o=>{e&&(t+=`${e}>${n}`,i()),r.push(o)})(u),e="<"+u;for(const t of s)for(const e in t)o(e,t[e]);return a},close(){const o=r.pop();return t+=e?e+(n?`>${n}</${o}>`:"/>"):`</${o}>`,i(),a},attr:o,text:t=>(n+=Xy(t),a),toString:()=>t};return a}const Zy=t=>Qy(Jy(),t)+"";function Qy(t,e){if(t.open(e.tagName),e.hasAttributes()){const n=e.attributes,r=n.length;for(let e=0;e<r;++e)t.attr(n[e].name,n[e].value)}if(e.hasChildNodes()){const n=e.childNodes,r=n.length;for(let e=0;e<r;e++){const r=n[e];3===r.nodeType?t.text(r.nodeValue):Qy(t,r)}}return t.close()}const Ky={fill:"fill",fillOpacity:"fill-opacity",stroke:"stroke",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",strokeCap:"stroke-linecap",strokeJoin:"stroke-linejoin",strokeDash:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeMiterLimit:"stroke-miterlimit",opacity:"opacity",blend:"mix-blend-mode"},tv={fill:"none","stroke-miterlimit":10},ev="http://www.w3.org/2000/xmlns/",nv=fm.xmlns;function rv(t){cy.call(this,t),this._dirtyID=0,this._dirty=[],this._svg=null,this._root=null,this._defs=null}const iv=cy.prototype;function ov(t,e){for(;t&&t.dirty!==e;t=t.mark.group){if(t.dirty=e,!t.mark||t.mark.dirty===e)return;t.mark.dirty=e}}function av(t,e,n){let r,i,o;if("radial"===e.gradient){let r=iy(t,n++,"pattern",nv);pv(r,{id:tp+e.id,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),r=iy(r,0,"rect",nv),pv(r,{width:1,height:1,fill:`url(${mv()}#${e.id})`}),pv(t=iy(t,n++,"radialGradient",nv),{id:e.id,fx:e.x1,fy:e.y1,fr:e.r1,cx:e.x2,cy:e.y2,r:e.r2})}else pv(t=iy(t,n++,"linearGradient",nv),{id:e.id,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2});for(r=0,i=e.stops.length;r<i;++r)o=iy(t,r,"stop",nv),o.setAttribute("offset",e.stops[r].offset),o.setAttribute("stop-color",e.stops[r].color);return oy(t,r),n}function uv(t,e,n){let r;return(t=iy(t,n,"clipPath",nv)).setAttribute("id",e.id),e.path?(r=iy(t,0,"path",nv),r.setAttribute("d",e.path)):(r=iy(t,0,"rect",nv),pv(r,{x:0,y:0,width:e.width,height:e.height})),oy(t,1),n+1}function sv(t,e,n,r,i){let o,a=t._svg;if(!a&&(o=e.ownerDocument,a=ny(o,r,nv),t._svg=a,t.mark&&(a.__data__=t,a.__values__={fill:"default"},"g"===r))){const e=ny(o,"path",nv);a.appendChild(e),e.__data__=t;const n=ny(o,"g",nv);a.appendChild(n),n.__data__=t;const r=ny(o,"path",nv);a.appendChild(r),r.__data__=t,r.__values__={fill:"default"}}return(a.ownerSVGElement!==i||function(t,e){return t.parentNode&&t.parentNode.childNodes.length>1&&t.previousSibling!=e}(a,n))&&e.insertBefore(a,n?n.nextSibling:e.firstChild),a}st(rv,cy,{initialize(t,e,n,r,i){return this._defs={},this._clearDefs(),t&&(this._svg=iy(t,0,"svg",nv),this._svg.setAttributeNS(ev,"xmlns",nv),this._svg.setAttributeNS(ev,"xmlns:xlink",fm["xmlns:xlink"]),this._svg.setAttribute("version",fm.version),this._svg.setAttribute("class","marks"),oy(t,1),this._root=iy(this._svg,0,"g",nv),pv(this._root,tv),oy(this._svg,1)),this.background(this._bgcolor),iv.initialize.call(this,t,e,n,r,i)},background(t){return arguments.length&&this._svg&&this._svg.style.setProperty("background-color",t),iv.background.apply(this,arguments)},resize(t,e,n,r){return iv.resize.call(this,t,e,n,r),this._svg&&(pv(this._svg,{width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}),this._root.setAttribute("transform",`translate(${this._origin})`)),this._dirty=[],this},canvas(){return this._svg},svg(){const t=this._svg,e=this._bgcolor;if(!t)return null;let n;e&&(t.removeAttribute("style"),n=iy(t,0,"rect",nv),pv(n,{width:this._width,height:this._height,fill:e}));const r=Zy(t);return e&&(t.removeChild(n),this._svg.style.setProperty("background-color",e)),r},_render(t){return this._dirtyCheck()&&(this._dirtyAll&&this._clearDefs(),this.mark(this._root,t),oy(this._root,1)),this.defs(),this._dirty=[],++this._dirtyID,this},dirty(t){t.dirty!==this._dirtyID&&(t.dirty=this._dirtyID,this._dirty.push(t))},isDirty(t){return this._dirtyAll||!t._svg||t.dirty===this._dirtyID},_dirtyCheck(){this._dirtyAll=!0;const t=this._dirty;if(!t.length||!this._dirtyID)return!0;const e=++this._dirtyID;let n,r,i,o,a,u,s;for(a=0,u=t.length;a<u;++a)n=t[a],r=n.mark,r.marktype!==i&&(i=r.marktype,o=Ym[i]),r.zdirty&&r.dirty!==e&&(this._dirtyAll=!1,ov(n,e),r.items.forEach((t=>{t.dirty=e}))),r.zdirty||(n.exit?(o.nested&&r.items.length?(s=r.items[0],s._svg&&this._update(o,s._svg,s)):n._svg&&(s=n._svg.parentNode,s&&s.removeChild(n._svg)),n._svg=null):(n=o.nested?r.items[0]:n,n._update!==e&&(n._svg&&n._svg.ownerSVGElement?this._update(o,n._svg,n):(this._dirtyAll=!1,ov(n,e)),n._update=e)));return!this._dirtyAll},mark(t,e,n){if(!this.isDirty(e))return e._svg;const r=this._svg,i=Ym[e.marktype],o=!1===e.interactive?"none":null,a="g"===i.tag;let u=null,s=0;const l=sv(e,t,n,"g",r);l.setAttribute("class",ay(e));const c=Yy(e);for(const t in c)gv(l,t,c[t]);a||gv(l,"pointer-events",o),gv(l,"clip-path",e.clip?Jp(this,e,e.group):null);const f=t=>{const e=this.isDirty(t),n=sv(t,l,u,i.tag,r);e&&(this._update(i,n,t),a&&function(t,e,n){e=e.lastChild.previousSibling;let r,i=0;jg(n,(n=>{r=t.mark(e,n,r),++i})),oy(e,1+i)}(this,n,t)),u=n,++s};return i.nested?e.items.length&&f(e.items[0]):jg(e,f),oy(l,s),l},_update(t,e,n){lv=e,cv=e.__values__,Hy(hv,n),t.attr(hv,n,this);const r=fv[t.type];r&&r.call(this,t,e,n),lv&&this.style(lv,n)},style(t,e){if(null!=e)for(const n in Ky){let r="font"===n?Lm(e):e[n];if(r===cv[n])continue;const i=Ky[n];null==r?t.removeAttribute(i):(ep(r)&&(r=np(r,this._defs.gradient,mv())),t.setAttribute(i,r+"")),cv[n]=r}},defs(){const t=this._svg,e=this._defs;let n=e.el,r=0;for(const i in e.gradient)n||(e.el=n=iy(t,1,"defs",nv)),r=av(n,e.gradient[i],r);for(const i in e.clipping)n||(e.el=n=iy(t,1,"defs",nv)),r=uv(n,e.clipping[i],r);n&&(0===r?(t.removeChild(n),e.el=null):oy(n,r))},_clearDefs(){const t=this._defs;t.gradient={},t.clipping={}}});let lv=null,cv=null;const fv={group(t,e,n){const r=lv=e.childNodes[2];cv=r.__values__,t.foreground(hv,n,this),cv=e.__values__,lv=e.childNodes[1],t.content(hv,n,this);const i=lv=e.childNodes[0];t.background(hv,n,this);const o=!1===n.mark.interactive?"none":null;if(o!==cv.events&&(gv(r,"pointer-events",o),gv(i,"pointer-events",o),cv.events=o),n.strokeForeground&&n.stroke){const t=n.fill;gv(r,"display",null),this.style(i,n),gv(i,"stroke",null),t&&(n.fill=null),cv=r.__values__,this.style(r,n),t&&(n.fill=t),lv=null}else gv(r,"display","none")},image(t,e,n){!1===n.smooth?(dv(e,"image-rendering","optimizeSpeed"),dv(e,"image-rendering","pixelated")):dv(e,"image-rendering",null)},text(t,e,n){const r=Rm(n);let i,o,a,u;_(r)?(o=r.map((t=>qm(n,t))),i=o.join("\n"),i!==cv.text&&(oy(e,0),a=e.ownerDocument,u=Om(n),o.forEach(((t,r)=>{const i=ny(a,"tspan",nv);i.__data__=n,i.textContent=t,r&&(i.setAttribute("x",0),i.setAttribute("dy",u)),e.appendChild(i)})),cv.text=i)):(o=qm(n,r),o!==cv.text&&(e.textContent=o,cv.text=o)),gv(e,"font-family",Lm(n)),gv(e,"font-size",Nm(n)+"px"),gv(e,"font-style",n.fontStyle),gv(e,"font-variant",n.fontVariant),gv(e,"font-weight",n.fontWeight)}};function hv(t,e,n){e!==cv[t]&&(n?function(t,e,n,r){null!=n?t.setAttributeNS(r,e,n):t.removeAttributeNS(r,e)}(lv,t,e,n):gv(lv,t,e),cv[t]=e)}function dv(t,e,n){n!==cv[e]&&(null==n?t.style.removeProperty(e):t.style.setProperty(e,n+""),cv[e]=n)}function pv(t,e){for(const n in e)gv(t,n,e[n])}function gv(t,e,n){null!=n?t.setAttribute(e,n):t.removeAttribute(e)}function mv(){let t;return"undefined"==typeof window?"":(t=window.location).hash?t.href.slice(0,-t.hash.length):t.href}function yv(t){cy.call(this,t),this._text=null,this._defs={gradient:{},clipping:{}}}st(yv,cy,{svg(){return this._text},_render(t){const e=Jy();e.open("svg",tt({},fm,{class:"marks",width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}));const n=this._bgcolor;return n&&"transparent"!==n&&"none"!==n&&e.open("rect",{width:this._width,height:this._height,fill:n}).close(),e.open("g",tv,{transform:"translate("+this._origin+")"}),this.mark(e,t),e.close(),this.defs(e),this._text=e.close()+"",this},mark(t,e){const n=Ym[e.marktype],r=n.tag,i=[Hy,n.attr];t.open("g",{class:ay(e),"clip-path":e.clip?Jp(this,e,e.group):null},Yy(e),{"pointer-events":"g"!==r&&!1===e.interactive?"none":null});const o=o=>{const a=this.href(o);if(a&&t.open("a",a),t.open(r,this.attr(e,o,i,"g"!==r?r:null)),"text"===r){const e=Rm(o);if(_(e)){const n={x:0,dy:Om(o)};for(let r=0;r<e.length;++r)t.open("tspan",r?n:null).text(qm(o,e[r])).close()}else t.text(qm(o,e))}else if("g"===r){const r=o.strokeForeground,i=o.fill,a=o.stroke;r&&a&&(o.stroke=null),t.open("path",this.attr(e,o,n.background,"bgrect")).close(),t.open("g",this.attr(e,o,n.content)),jg(o,(e=>this.mark(t,e))),t.close(),r&&a?(i&&(o.fill=null),o.stroke=a,t.open("path",this.attr(e,o,n.foreground,"bgrect")).close(),i&&(o.fill=i)):t.open("path",this.attr(e,o,n.foreground,"bgfore")).close()}t.close(),a&&t.close()};return n.nested?e.items&&e.items.length&&o(e.items[0]):jg(e,o),t.close()},href(t){const e=t.href;let n;if(e){if(n=this._hrefs&&this._hrefs[e])return n;this.sanitizeURL(e).then((t=>{t["xlink:href"]=t.href,t.href=null,(this._hrefs||(this._hrefs={}))[e]=t}))}return null},attr(t,e,n,r){const i={},o=(t,e,n,r)=>{i[r||t]=e};return Array.isArray(n)?n.forEach((t=>t(o,e,this))):n(o,e,this),r&&function(t,e,n,r,i){if(null==e)return t;"bgrect"===r&&!1===n.interactive&&(t["pointer-events"]="none");if("bgfore"===r&&(!1===n.interactive&&(t["pointer-events"]="none"),t.display="none",null!==e.fill))return t;"image"===r&&!1===e.smooth&&(t.style="image-rendering: optimizeSpeed; image-rendering: pixelated;");"text"===r&&(t["font-family"]=Lm(e),t["font-size"]=Nm(e)+"px",t["font-style"]=e.fontStyle,t["font-variant"]=e.fontVariant,t["font-weight"]=e.fontWeight);for(const n in Ky){let r=e[n];const o=Ky[n];("transparent"!==r||"fill"!==o&&"stroke"!==o)&&null!=r&&(ep(r)&&(r=np(r,i.gradient,"")),t[o]=r)}}(i,e,t,r,this._defs),i},defs(t){const e=this._defs.gradient,n=this._defs.clipping;if(0!==Object.keys(e).length+Object.keys(n).length){t.open("defs");for(const n in e){const r=e[n],i=r.stops;"radial"===r.gradient?(t.open("pattern",{id:tp+n,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),t.open("rect",{width:"1",height:"1",fill:"url(#"+n+")"}).close(),t.close(),t.open("radialGradient",{id:n,fx:r.x1,fy:r.y1,fr:r.r1,cx:r.x2,cy:r.y2,r:r.r2})):t.open("linearGradient",{id:n,x1:r.x1,x2:r.x2,y1:r.y1,y2:r.y2});for(let e=0;e<i.length;++e)t.open("stop",{offset:i[e].offset,"stop-color":i[e].color}).close();t.close()}for(const e in n){const r=n[e];t.open("clipPath",{id:e}),r.path?t.open("path",{d:r.path}).close():t.open("rect",{x:0,y:0,width:r.width,height:r.height}).close(),t.close()}t.close()}}});const vv="canvas",_v="none",xv={Canvas:vv,PNG:"png",SVG:"svg",None:_v},bv={};function wv(t,e){return t=String(t||"").toLowerCase(),arguments.length>1?(bv[t]=e,this):bv[t]}function kv(t,e,n){const r=[],i=(new Zp).union(e),o=t.marktype;return o?Av(t,i,n,r):"group"===o?Mv(t,i,n,r):s("Intersect scene must be mark node or group item.")}function Av(t,e,n,r){if(function(t,e,n){return t.bounds&&e.intersects(t.bounds)&&("group"===t.marktype||!1!==t.interactive&&(!n||n(t)))}(t,e,n)){const i=t.items,o=t.marktype,a=i.length;let u=0;if("group"===o)for(;u<a;++u)Mv(i[u],e,n,r);else for(const t=Ym[o].isect;u<a;++u){const n=i[u];Ev(n,e,t)&&r.push(n)}}return r}function Mv(t,e,n,r){n&&n(t.mark)&&Ev(t,e,Ym.group.isect)&&r.push(t);const i=t.items,o=i&&i.length;if(o){const a=t.x||0,u=t.y||0;e.translate(-a,-u);for(let t=0;t<o;++t)Av(i[t],e,n,r);e.translate(a,u)}return r}function Ev(t,e,n){const r=t.bounds;return e.encloses(r)||e.intersects(r)&&n(t,e)}bv.canvas=bv.png={renderer:By,headless:By,handler:Ey},bv.svg={renderer:rv,headless:yv,handler:zy},bv.none={};const Dv=new Zp;function Cv(t){const e=t.clip;if(Y(e))e(bg(Dv.clear()));else{if(!e)return;Dv.set(0,0,t.group.width,t.group.height)}t.bounds.intersect(Dv)}function Fv(t,e,n){return t===e||("path"===n?Sv(t,e):t instanceof Date&&e instanceof Date?+t==+e:dt(t)&&dt(e)?Math.abs(t-e)<=1e-9:t&&e&&(x(t)||x(e))?function(t,e){var n,r,i=Object.keys(t),o=Object.keys(e);if(i.length!==o.length)return!1;for(i.sort(),o.sort(),r=i.length-1;r>=0;r--)if(i[r]!=o[r])return!1;for(r=i.length-1;r>=0;r--)if(!Fv(t[n=i[r]],e[n],n))return!1;return typeof t==typeof e}(t,e):t==e)}function Sv(t,e){return Fv(lp(t),lp(e))}const Bv="top",Tv="left",zv="right",Nv="bottom",Ov="start",Rv="middle",$v="end",qv="group",Lv="axis",Uv="title",Pv="frame",jv="scope",Iv="legend",Wv="row-header",Hv="row-footer",Yv="row-title",Vv="column-header",Gv="column-footer",Xv="column-title",Jv="padding",Zv="fit",Qv="fit-x",Kv="fit-y",t_="none",e_="all",n_="each",r_="flush",i_="column",o_="row";function a_(t){ga.call(this,null,t)}function u_(t,e,n){return e(t.bounds.clear(),t,n)}st(a_,ga,{transform(t,e){const n=e.dataflow,r=t.mark,i=r.marktype,o=Ym[i],a=o.bound;let u,s=r.bounds;if(o.nested)r.items.length&&n.dirty(r.items[0]),s=u_(r,a),r.items.forEach((t=>{t.bounds.clear().union(s)}));else if(i===qv||t.modified())switch(e.visit(e.MOD,(t=>n.dirty(t))),s.clear(),r.items.forEach((t=>s.union(u_(t,a)))),r.role){case Lv:case Iv:case Uv:e.reflow()}else u=e.changed(e.REM),e.visit(e.ADD,(t=>{s.union(u_(t,a))})),e.visit(e.MOD,(t=>{u=u||s.alignsWith(t.bounds),n.dirty(t),s.union(u_(t,a))})),u&&(s.clear(),r.items.forEach((t=>s.union(t.bounds))));return Cv(r),e.modifies("bounds")}});const s_=":vega_identifier:";function l_(t){ga.call(this,0,t)}function c_(t){ga.call(this,null,t)}function f_(t){ga.call(this,null,t)}l_.Definition={type:"Identifier",metadata:{modifies:!0},params:[{name:"as",type:"string",required:!0}]},st(l_,ga,{transform(t,e){const n=(i=e.dataflow)._signals[s_]||(i._signals[s_]=i.add(0)),r=t.as;var i;let o=n.value;return e.visit(e.ADD,(t=>t[r]=t[r]||++o)),n.set(this.value=o),e}}),st(c_,ga,{transform(t,e){let n=this.value;n||(n=e.dataflow.scenegraph().mark(t.markdef,function(t){const e=t.groups,n=t.parent;return e&&1===e.size?e.get(Object.keys(e.object)[0]):e&&n?e.lookup(n):null}(t),t.index),n.group.context=t.context,t.context.group||(t.context.group=n.group),n.source=this.source,n.clip=t.clip,n.interactive=t.interactive,this.value=n);const r=n.marktype===qv?Kp:Qp;return e.visit(e.ADD,(t=>r.call(t,n))),(t.modified("clip")||t.modified("interactive"))&&(n.clip=t.clip,n.interactive=!!t.interactive,n.zdirty=!0,e.reflow()),n.items=e.source,e}});const h_={parity:t=>t.filter(((t,e)=>e%2?t.opacity=0:1)),greedy:(t,e)=>{let n;return t.filter(((t,r)=>r&&d_(n.bounds,t.bounds,e)?t.opacity=0:(n=t,1)))}},d_=(t,e,n)=>n>Math.max(e.x1-t.x2,t.x1-e.x2,e.y1-t.y2,t.y1-e.y2),p_=(t,e)=>{for(var n,r=1,i=t.length,o=t[0].bounds;r<i;o=n,++r)if(d_(o,n=t[r].bounds,e))return!0},g_=t=>{const e=t.bounds;return e.width()>1&&e.height()>1},m_=t=>(t.forEach((t=>t.opacity=1)),t),y_=(t,e)=>t.reflow(e.modified()).modifies("opacity");function v_(t){ga.call(this,null,t)}st(f_,ga,{transform(t,e){const n=h_[t.method]||h_.parity,r=t.separation||0;let i,o,a=e.materialize(e.SOURCE).source;if(!a||!a.length)return;if(!t.method)return t.modified("method")&&(m_(a),e=y_(e,t)),e;if(a=a.filter(g_),!a.length)return;if(t.sort&&(a=a.slice().sort(t.sort)),i=m_(a),e=y_(e,t),i.length>=3&&p_(i,r)){do{i=n(i,r)}while(i.length>=3&&p_(i,r));i.length<3&&!M(a).opacity&&(i.length>1&&(M(i).opacity=0),M(a).opacity=1)}t.boundScale&&t.boundTolerance>=0&&(o=((t,e,n)=>{var r=t.range(),i=new Zp;return e===Bv||e===Nv?i.set(r[0],-1/0,r[1],1/0):i.set(-1/0,r[0],1/0,r[1]),i.expand(n||1),t=>i.encloses(t.bounds)})(t.boundScale,t.boundOrient,+t.boundTolerance),a.forEach((t=>{o(t)||(t.opacity=0)})));const u=i[0].mark.bounds.clear();return a.forEach((t=>{t.opacity&&u.union(t.bounds)})),e}}),st(v_,ga,{transform(t,e){const n=e.dataflow;if(e.visit(e.ALL,(t=>n.dirty(t))),e.fields&&e.fields.zindex){const t=e.source&&e.source[0];t&&(t.mark.zdirty=!0)}}});const __=new Zp;function x_(t,e,n){return t[e]===n?0:(t[e]=n,1)}function b_(t){var e=t.items[0].orient;return e===Tv||e===zv}function w_(t,e,n,r){var i,o,a=e.items[0],u=a.datum,s=null!=a.translate?a.translate:.5,l=a.orient,c=function(t){let e=+t.grid;return[t.ticks?e++:-1,t.labels?e++:-1,e+ +t.domain]}(u),f=a.range,h=a.offset,d=a.position,p=a.minExtent,g=a.maxExtent,m=u.title&&a.items[c[2]].items[0],y=a.titlePadding,v=a.bounds,_=m&&$m(m),x=0,b=0;switch(__.clear().union(v),v.clear(),(i=c[0])>-1&&v.union(a.items[i].bounds),(i=c[1])>-1&&v.union(a.items[i].bounds),l){case Bv:x=d||0,b=-h,o=Math.max(p,Math.min(g,-v.y1)),v.add(0,-o).add(f,0),m&&k_(t,m,o,y,_,0,-1,v);break;case Tv:x=-h,b=d||0,o=Math.max(p,Math.min(g,-v.x1)),v.add(-o,0).add(0,f),m&&k_(t,m,o,y,_,1,-1,v);break;case zv:x=n+h,b=d||0,o=Math.max(p,Math.min(g,v.x2)),v.add(0,0).add(o,f),m&&k_(t,m,o,y,_,1,1,v);break;case Nv:x=d||0,b=r+h,o=Math.max(p,Math.min(g,v.y2)),v.add(0,0).add(f,o),m&&k_(t,m,o,y,0,0,1,v);break;default:x=a.x,b=a.y}return rg(v.translate(x,b),a),x_(a,"x",x+s)|x_(a,"y",b+s)&&(a.bounds=__,t.dirty(a),a.bounds=v,t.dirty(a)),a.mark.bounds.clear().union(v)}function k_(t,e,n,r,i,o,a,u){const s=e.bounds;if(e.auto){const u=a*(n+i+r);let l=0,c=0;t.dirty(e),o?l=(e.x||0)-(e.x=u):c=(e.y||0)-(e.y=u),e.mark.bounds.clear().union(s.translate(-l,-c)),t.dirty(e)}u.union(s)}const A_=(t,e)=>Math.floor(Math.min(t,e)),M_=(t,e)=>Math.ceil(Math.max(t,e));function E_(t){return(new Zp).set(0,0,t.width||0,t.height||0)}function D_(t){const e=t.bounds.clone();return e.empty()?e.set(0,0,0,0):e.translate(-(t.x||0),-(t.y||0))}function C_(t,e,n){const r=x(t)?t[e]:t;return null!=r?r:void 0!==n?n:0}function F_(t){return t<0?Math.ceil(-t):0}function S_(t,e,n){var r,i,o,a,u,s,l,c,f,h,d,p=!n.nodirty,g=n.bounds===r_?E_:D_,m=__.set(0,0,0,0),y=C_(n.align,i_),v=C_(n.align,o_),_=C_(n.padding,i_),x=C_(n.padding,o_),b=n.columns||e.length,w=b<=0?1:Math.ceil(e.length/b),k=e.length,A=Array(k),M=Array(b),E=0,D=Array(k),C=Array(w),F=0,S=Array(k),B=Array(k),T=Array(k);for(i=0;i<b;++i)M[i]=0;for(i=0;i<w;++i)C[i]=0;for(i=0;i<k;++i)s=e[i],u=T[i]=g(s),s.x=s.x||0,S[i]=0,s.y=s.y||0,B[i]=0,o=i%b,a=~~(i/b),E=Math.max(E,l=Math.ceil(u.x2)),F=Math.max(F,c=Math.ceil(u.y2)),M[o]=Math.max(M[o],l),C[a]=Math.max(C[a],c),A[i]=_+F_(u.x1),D[i]=x+F_(u.y1),p&&t.dirty(e[i]);for(i=0;i<k;++i)i%b==0&&(A[i]=0),i<b&&(D[i]=0);if(y===n_)for(o=1;o<b;++o){for(d=0,i=o;i<k;i+=b)d<A[i]&&(d=A[i]);for(i=o;i<k;i+=b)A[i]=d+M[o-1]}else if(y===e_){for(d=0,i=0;i<k;++i)i%b&&d<A[i]&&(d=A[i]);for(i=0;i<k;++i)i%b&&(A[i]=d+E)}else for(y=!1,o=1;o<b;++o)for(i=o;i<k;i+=b)A[i]+=M[o-1];if(v===n_)for(a=1;a<w;++a){for(d=0,r=(i=a*b)+b;i<r;++i)d<D[i]&&(d=D[i]);for(i=a*b;i<r;++i)D[i]=d+C[a-1]}else if(v===e_){for(d=0,i=b;i<k;++i)d<D[i]&&(d=D[i]);for(i=b;i<k;++i)D[i]=d+F}else for(v=!1,a=1;a<w;++a)for(r=(i=a*b)+b;i<r;++i)D[i]+=C[a-1];for(f=0,i=0;i<k;++i)f=A[i]+(i%b?f:0),S[i]+=f-e[i].x;for(o=0;o<b;++o)for(h=0,i=o;i<k;i+=b)h+=D[i],B[i]+=h-e[i].y;if(y&&C_(n.center,i_)&&w>1)for(i=0;i<k;++i)(f=(u=y===e_?E:M[i%b])-T[i].x2-e[i].x-S[i])>0&&(S[i]+=f/2);if(v&&C_(n.center,o_)&&1!==b)for(i=0;i<k;++i)(h=(u=v===e_?F:C[~~(i/b)])-T[i].y2-e[i].y-B[i])>0&&(B[i]+=h/2);for(i=0;i<k;++i)m.union(T[i].translate(S[i],B[i]));switch(f=C_(n.anchor,"x"),h=C_(n.anchor,"y"),C_(n.anchor,i_)){case $v:f-=m.width();break;case Rv:f-=m.width()/2}switch(C_(n.anchor,o_)){case $v:h-=m.height();break;case Rv:h-=m.height()/2}for(f=Math.round(f),h=Math.round(h),m.clear(),i=0;i<k;++i)e[i].mark.bounds.clear();for(i=0;i<k;++i)(s=e[i]).x+=S[i]+=f,s.y+=B[i]+=h,m.union(s.mark.bounds.union(s.bounds.translate(S[i],B[i]))),p&&t.dirty(s);return m}function B_(t,e,n){var r,i,o,a,u,s,l,c=function(t){var e,n,r=t.items,i=r.length,o=0;const a={marks:[],rowheaders:[],rowfooters:[],colheaders:[],colfooters:[],rowtitle:null,coltitle:null};for(;o<i;++o)if(n=(e=r[o]).items,e.marktype===qv)switch(e.role){case Lv:case Iv:case Uv:break;case Wv:a.rowheaders.push(...n);break;case Hv:a.rowfooters.push(...n);break;case Vv:a.colheaders.push(...n);break;case Gv:a.colfooters.push(...n);break;case Yv:a.rowtitle=n[0];break;case Xv:a.coltitle=n[0];break;default:a.marks.push(...n)}return a}(e),f=c.marks,h=n.bounds===r_?T_:z_,d=n.offset,p=n.columns||f.length,g=p<=0?1:Math.ceil(f.length/p),m=g*p;const y=S_(t,f,n);y.empty()&&y.set(0,0,0,0),c.rowheaders&&(s=C_(n.headerBand,o_,null),r=N_(t,c.rowheaders,f,p,g,-C_(d,"rowHeader"),A_,0,h,"x1",0,p,1,s)),c.colheaders&&(s=C_(n.headerBand,i_,null),i=N_(t,c.colheaders,f,p,p,-C_(d,"columnHeader"),A_,1,h,"y1",0,1,p,s)),c.rowfooters&&(s=C_(n.footerBand,o_,null),o=N_(t,c.rowfooters,f,p,g,C_(d,"rowFooter"),M_,0,h,"x2",p-1,p,1,s)),c.colfooters&&(s=C_(n.footerBand,i_,null),a=N_(t,c.colfooters,f,p,p,C_(d,"columnFooter"),M_,1,h,"y2",m-p,1,p,s)),c.rowtitle&&(u=C_(n.titleAnchor,o_),l=C_(d,"rowTitle"),l=u===$v?o+l:r-l,s=C_(n.titleBand,o_,.5),O_(t,c.rowtitle,l,0,y,s)),c.coltitle&&(u=C_(n.titleAnchor,i_),l=C_(d,"columnTitle"),l=u===$v?a+l:i-l,s=C_(n.titleBand,i_,.5),O_(t,c.coltitle,l,1,y,s))}function T_(t,e){return"x1"===e?t.x||0:"y1"===e?t.y||0:"x2"===e?(t.x||0)+(t.width||0):"y2"===e?(t.y||0)+(t.height||0):void 0}function z_(t,e){return t.bounds[e]}function N_(t,e,n,r,i,o,a,u,s,l,c,f,h,d){var p,g,m,y,v,_,x,b,w,k=n.length,A=0,M=0;if(!k)return A;for(p=c;p<k;p+=f)n[p]&&(A=a(A,s(n[p],l)));if(!e.length)return A;for(e.length>i&&(t.warn("Grid headers exceed limit: "+i),e=e.slice(0,i)),A+=o,g=0,y=e.length;g<y;++g)t.dirty(e[g]),e[g].mark.bounds.clear();for(p=c,g=0,y=e.length;g<y;++g,p+=f){for(v=(_=e[g]).mark.bounds,m=p;m>=0&&null==(x=n[m]);m-=h);u?(b=null==d?x.x:Math.round(x.bounds.x1+d*x.bounds.width()),w=A):(b=A,w=null==d?x.y:Math.round(x.bounds.y1+d*x.bounds.height())),v.union(_.bounds.translate(b-(_.x||0),w-(_.y||0))),_.x=b,_.y=w,t.dirty(_),M=a(M,v[l])}return M}function O_(t,e,n,r,i,o){if(e){t.dirty(e);var a=n,u=n;r?a=Math.round(i.x1+o*i.width()):u=Math.round(i.y1+o*i.height()),e.bounds.translate(a-(e.x||0),u-(e.y||0)),e.mark.bounds.clear().union(e.bounds),e.x=a,e.y=u,t.dirty(e)}}function R_(t,e,n,r,i,o,a){const u=function(t,e){const n=t[e]||{};return(e,r)=>null!=n[e]?n[e]:null!=t[e]?t[e]:r}(n,e),s=function(t,e){let n=-1/0;return t.forEach((t=>{null!=t.offset&&(n=Math.max(n,t.offset))})),n>-1/0?n:e}(t,u("offset",0)),l=u("anchor",Ov),c=l===$v?1:l===Rv?.5:0,f={align:n_,bounds:u("bounds",r_),columns:"vertical"===u("direction")?1:t.length,padding:u("margin",8),center:u("center"),nodirty:!0};switch(e){case Tv:f.anchor={x:Math.floor(r.x1)-s,column:$v,y:c*(a||r.height()+2*r.y1),row:l};break;case zv:f.anchor={x:Math.ceil(r.x2)+s,y:c*(a||r.height()+2*r.y1),row:l};break;case Bv:f.anchor={y:Math.floor(i.y1)-s,row:$v,x:c*(o||i.width()+2*i.x1),column:l};break;case Nv:f.anchor={y:Math.ceil(i.y2)+s,x:c*(o||i.width()+2*i.x1),column:l};break;case"top-left":f.anchor={x:s,y:s};break;case"top-right":f.anchor={x:o-s,y:s,column:$v};break;case"bottom-left":f.anchor={x:s,y:a-s,row:$v};break;case"bottom-right":f.anchor={x:o-s,y:a-s,column:$v,row:$v}}return f}function $_(t,e){var n,r,i=e.items[0],o=i.datum,a=i.orient,u=i.bounds,s=i.x,l=i.y;return i._bounds?i._bounds.clear().union(u):i._bounds=u.clone(),u.clear(),function(t,e,n){var r=e.padding,i=r-n.x,o=r-n.y;if(e.datum.title){var a=e.items[1].items[0],u=a.anchor,s=e.titlePadding||0,l=r-a.x,c=r-a.y;switch(a.orient){case Tv:i+=Math.ceil(a.bounds.width())+s;break;case zv:case Nv:break;default:o+=a.bounds.height()+s}switch((i||o)&&L_(t,n,i,o),a.orient){case Tv:c+=q_(e,n,a,u,1,1);break;case zv:l+=q_(e,n,a,$v,0,0)+s,c+=q_(e,n,a,u,1,1);break;case Nv:l+=q_(e,n,a,u,0,0),c+=q_(e,n,a,$v,-1,0,1)+s;break;default:l+=q_(e,n,a,u,0,0)}(l||c)&&L_(t,a,l,c),(l=Math.round(a.bounds.x1-r))<0&&(L_(t,n,-l,0),L_(t,a,-l,0))}else(i||o)&&L_(t,n,i,o)}(t,i,i.items[0].items[0]),u=function(t,e){return t.items.forEach((t=>e.union(t.bounds))),e.x1=t.padding,e.y1=t.padding,e}(i,u),n=2*i.padding,r=2*i.padding,u.empty()||(n=Math.ceil(u.width()+n),r=Math.ceil(u.height()+r)),"symbol"===o.type&&function(t){const e=t.reduce(((t,e)=>(t[e.column]=Math.max(e.bounds.x2-e.x,t[e.column]||0),t)),{});t.forEach((t=>{t.width=e[t.column],t.height=t.bounds.y2-t.y}))}(i.items[0].items[0].items[0].items),a!==t_&&(i.x=s=0,i.y=l=0),i.width=n,i.height=r,rg(u.set(s,l,s+n,l+r),i),i.mark.bounds.clear().union(u),i}function q_(t,e,n,r,i,o,a){const u="symbol"!==t.datum.type,s=n.datum.vgrad,l=(!u||!o&&s||a?e:e.items[0]).bounds[i?"y2":"x2"]-t.padding,c=s&&o?l:0,f=s&&o?0:l,h=i<=0?0:$m(n);return Math.round(r===Ov?c:r===$v?f-h:.5*(l-h))}function L_(t,e,n,r){e.x+=n,e.y+=r,e.bounds.translate(n,r),e.mark.bounds.translate(n,r),t.dirty(e)}function U_(t){ga.call(this,null,t)}st(U_,ga,{transform(t,e){const n=e.dataflow;return t.mark.items.forEach((e=>{t.layout&&B_(n,e,t.layout),function(t,e,n){var r,i,o,a,u,s=e.items,l=Math.max(0,e.width||0),c=Math.max(0,e.height||0),f=(new Zp).set(0,0,l,c),h=f.clone(),d=f.clone(),p=[];for(a=0,u=s.length;a<u;++a)switch((i=s[a]).role){case Lv:(b_(i)?h:d).union(w_(t,i,l,c));break;case Uv:r=i;break;case Iv:p.push($_(t,i));break;case Pv:case jv:case Wv:case Hv:case Yv:case Vv:case Gv:case Xv:h.union(i.bounds),d.union(i.bounds);break;default:f.union(i.bounds)}if(p.length){const e={};p.forEach((t=>{(o=t.orient||zv)!==t_&&(e[o]||(e[o]=[])).push(t)}));for(const r in e){const i=e[r];S_(t,i,R_(i,r,n.legends,h,d,l,c))}p.forEach((e=>{const r=e.bounds;if(r.equals(e._bounds)||(e.bounds=e._bounds,t.dirty(e),e.bounds=r,t.dirty(e)),n.autosize&&n.autosize.type===Zv)switch(e.orient){case Tv:case zv:f.add(r.x1,0).add(r.x2,0);break;case Bv:case Nv:f.add(0,r.y1).add(0,r.y2)}else f.union(r)}))}f.union(h).union(d),r&&f.union(function(t,e,n,r,i){var o,a=e.items[0],u=a.frame,s=a.orient,l=a.anchor,c=a.offset,f=a.padding,h=a.items[0].items[0],d=a.items[1]&&a.items[1].items[0],p=s===Tv||s===zv?r:n,g=0,m=0,y=0,v=0,_=0;if(u!==qv?s===Tv?(g=i.y2,p=i.y1):s===zv?(g=i.y1,p=i.y2):(g=i.x1,p=i.x2):s===Tv&&(g=r,p=0),o=l===Ov?g:l===$v?p:(g+p)/2,d&&d.text){switch(s){case Bv:case Nv:_=h.bounds.height()+f;break;case Tv:v=h.bounds.width()+f;break;case zv:v=-h.bounds.width()-f}__.clear().union(d.bounds),__.translate(v-(d.x||0),_-(d.y||0)),x_(d,"x",v)|x_(d,"y",_)&&(t.dirty(d),d.bounds.clear().union(__),d.mark.bounds.clear().union(__),t.dirty(d)),__.clear().union(d.bounds)}else __.clear();switch(__.union(h.bounds),s){case Bv:m=o,y=i.y1-__.height()-c;break;case Tv:m=i.x1-__.width()-c,y=o;break;case zv:m=i.x2+__.width()+c,y=o;break;case Nv:m=o,y=i.y2+c;break;default:m=a.x,y=a.y}return x_(a,"x",m)|x_(a,"y",y)&&(__.translate(m,y),t.dirty(a),a.bounds.clear().union(__),e.bounds.clear().union(__),t.dirty(a)),a.bounds}(t,r,l,c,f));e.clip&&f.set(0,0,e.width||0,e.height||0);!function(t,e,n,r){const i=r.autosize||{},o=i.type;if(t._autosize<1||!o)return;let a=t._width,u=t._height,s=Math.max(0,e.width||0),l=Math.max(0,Math.ceil(-n.x1)),c=Math.max(0,e.height||0),f=Math.max(0,Math.ceil(-n.y1));const h=Math.max(0,Math.ceil(n.x2-s)),d=Math.max(0,Math.ceil(n.y2-c));if(i.contains===Jv){const e=t.padding();a-=e.left+e.right,u-=e.top+e.bottom}o===t_?(l=0,f=0,s=a,c=u):o===Zv?(s=Math.max(0,a-l-h),c=Math.max(0,u-f-d)):o===Qv?(s=Math.max(0,a-l-h),u=c+f+d):o===Kv?(a=s+l+h,c=Math.max(0,u-f-d)):"pad"===o&&(a=s+l+h,u=c+f+d);t._resizeView(a,u,s,c,[l,f],i.resize)}(t,e,f,n)}(n,e,t)})),function(t){return t&&"legend-entry"!==t.mark.role}(t.mark.group)?e.reflow():e}});var P_=Object.freeze({__proto__:null,bound:a_,identifier:l_,mark:c_,overlap:f_,render:v_,viewlayout:U_});function j_(t){ga.call(this,null,t)}function I_(t){ga.call(this,null,t)}function W_(){return qo({})}function H_(t){ga.call(this,null,t)}function Y_(t){ga.call(this,[],t)}st(j_,ga,{transform(t,e){if(this.value&&!t.modified())return e.StopPropagation;var n=e.dataflow.locale(),r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=this.value,o=t.scale,a=$d(o,null==t.count?t.values?t.values.length:10:t.count,t.minstep),u=t.format||Ud(n,o,a,t.formatSpecifier,t.formatType,!!t.values),s=t.values?qd(o,t.values,a):Ld(o,a);return i&&(r.rem=i),i=s.map(((t,e)=>qo({index:e/(s.length-1||1),value:t,label:u(t)}))),t.extra&&i.length&&i.push(qo({index:-1,extra:{value:i[0].value},label:""})),r.source=i,r.add=i,this.value=i,r}}),st(I_,ga,{transform(t,e){var n=e.dataflow,r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.item||W_,o=t.key||Ro,a=this.value;return _(r.encode)&&(r.encode=null),a&&(t.modified("key")||e.modified(o))&&s("DataJoin does not support modified key function or fields."),a||(e=e.addAll(),this.value=a=function(t){const e=at().test((t=>t.exit));return e.lookup=n=>e.get(t(n)),e}(o)),e.visit(e.ADD,(t=>{const e=o(t);let n=a.get(e);n?n.exit?(a.empty--,r.add.push(n)):r.mod.push(n):(n=i(t),a.set(e,n),r.add.push(n)),n.datum=t,n.exit=!1})),e.visit(e.MOD,(t=>{const e=o(t),n=a.get(e);n&&(n.datum=t,r.mod.push(n))})),e.visit(e.REM,(t=>{const e=o(t),n=a.get(e);t!==n.datum||n.exit||(r.rem.push(n),n.exit=!0,++a.empty)})),e.changed(e.ADD_MOD)&&r.modifies("datum"),(e.clean()||t.clean&&a.empty>n.cleanThreshold)&&n.runAfter(a.clean),r}}),st(H_,ga,{transform(t,e){var n=e.fork(e.ADD_REM),r=t.mod||!1,i=t.encoders,o=e.encode;if(_(o)){if(!n.changed()&&!o.every((t=>i[t])))return e.StopPropagation;o=o[0],n.encode=null}var a="enter"===o,u=i.update||m,s=i.enter||m,l=i.exit||m,c=(o&&!a?i[o]:u)||m;if(e.changed(e.ADD)&&(e.visit(e.ADD,(e=>{s(e,t),u(e,t)})),n.modifies(s.output),n.modifies(u.output),c!==m&&c!==u&&(e.visit(e.ADD,(e=>{c(e,t)})),n.modifies(c.output))),e.changed(e.REM)&&l!==m&&(e.visit(e.REM,(e=>{l(e,t)})),n.modifies(l.output)),a||c!==m){const i=e.MOD|(t.modified()?e.REFLOW:0);a?(e.visit(i,(e=>{const i=s(e,t)||r;(c(e,t)||i)&&n.mod.push(e)})),n.mod.length&&n.modifies(s.output)):e.visit(i,(e=>{(c(e,t)||r)&&n.mod.push(e)})),n.mod.length&&n.modifies(c.output)}return n.changed()?n:e.StopPropagation}}),st(Y_,ga,{transform(t,e){if(null!=this.value&&!t.modified())return e.StopPropagation;var n,r,i,o,a,u=e.dataflow.locale(),s=e.fork(e.NO_SOURCE|e.NO_FIELDS),l=this.value,c=t.type||zd,f=t.scale,h=+t.limit,d=$d(f,null==t.count?5:t.count,t.minstep),p=!!t.values||c===zd,g=t.format||Hd(u,f,d,c,t.formatSpecifier,t.formatType,p),m=t.values||Wd(f,d);return l&&(s.rem=l),c===zd?(h&&m.length>h?(e.dataflow.warn("Symbol legend count exceeds limit, filtering items."),l=m.slice(0,h-1),a=!0):l=m,Y(i=t.size)?(t.values||0!==f(l[0])||(l=l.slice(1)),o=l.reduce(((e,n)=>Math.max(e,i(n,t))),0)):i=Q(o=i||8),l=l.map(((e,n)=>qo({index:n,label:g(e,n,l),value:e,offset:o,size:i(e,t)}))),a&&(a=m[l.length],l.push(qo({index:l.length,label:`…${m.length-l.length} entries`,value:a,offset:o,size:i(a,t)})))):"gradient"===c?(n=f.domain(),r=Dd(f,n[0],M(n)),m.length<3&&!t.values&&n[0]!==M(n)&&(m=[n[0],M(n)]),l=m.map(((t,e)=>qo({index:e,label:g(t,e,m),value:t,perc:r(t)})))):(i=m.length-1,r=function(t){const e=t.domain(),n=e.length-1;let r=+e[0],i=+M(e),o=i-r;if(t.type===Zh){const t=n?o/n:.1;r-=t,i+=t,o=i-r}return t=>(t-r)/o}(f),l=m.map(((t,e)=>qo({index:e,label:g(t,e,m),value:t,perc:e?r(t):0,perc2:e===i?1:r(m[e+1])})))),s.source=l,s.add=l,this.value=l,s}});const V_=t=>t.source.x,G_=t=>t.source.y,X_=t=>t.target.x,J_=t=>t.target.y;function Z_(t){ga.call(this,{},t)}Z_.Definition={type:"LinkPath",metadata:{modifies:!0},params:[{name:"sourceX",type:"field",default:"source.x"},{name:"sourceY",type:"field",default:"source.y"},{name:"targetX",type:"field",default:"target.x"},{name:"targetY",type:"field",default:"target.y"},{name:"orient",type:"enum",default:"vertical",values:["horizontal","vertical","radial"]},{name:"shape",type:"enum",default:"line",values:["line","arc","curve","diagonal","orthogonal"]},{name:"require",type:"signal"},{name:"as",type:"string",default:"path"}]},st(Z_,ga,{transform(t,e){var n=t.sourceX||V_,r=t.sourceY||G_,i=t.targetX||X_,o=t.targetY||J_,a=t.as||"path",u=t.orient||"vertical",l=t.shape||"line",c=ex.get(l+"-"+u)||ex.get(l);return c||s("LinkPath unsupported type: "+t.shape+(t.orient?"-"+t.orient:"")),e.visit(e.SOURCE,(t=>{t[a]=c(n(t),r(t),i(t),o(t))})),e.reflow(t.modified()).modifies(a)}});const Q_=(t,e,n,r)=>"M"+t+","+e+"L"+n+","+r,K_=(t,e,n,r)=>{var i=n-t,o=r-e,a=Math.sqrt(i*i+o*o)/2;return"M"+t+","+e+"A"+a+","+a+" "+180*Math.atan2(o,i)/Math.PI+" 0 1 "+n+","+r},tx=(t,e,n,r)=>{const i=n-t,o=r-e,a=.2*(i+o),u=.2*(o-i);return"M"+t+","+e+"C"+(t+a)+","+(e+u)+" "+(n+u)+","+(r-a)+" "+n+","+r},ex=at({line:Q_,"line-radial":(t,e,n,r)=>Q_(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),arc:K_,"arc-radial":(t,e,n,r)=>K_(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),curve:tx,"curve-radial":(t,e,n,r)=>tx(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),"orthogonal-horizontal":(t,e,n,r)=>"M"+t+","+e+"V"+r+"H"+n,"orthogonal-vertical":(t,e,n,r)=>"M"+t+","+e+"H"+n+"V"+r,"orthogonal-radial":(t,e,n,r)=>{const i=Math.cos(t),o=Math.sin(t),a=Math.cos(n),u=Math.sin(n);return"M"+e*i+","+e*o+"A"+e+","+e+" 0 0,"+((Math.abs(n-t)>Math.PI?n<=t:n>t)?1:0)+" "+e*a+","+e*u+"L"+r*a+","+r*u},"diagonal-horizontal":(t,e,n,r)=>{const i=(t+n)/2;return"M"+t+","+e+"C"+i+","+e+" "+i+","+r+" "+n+","+r},"diagonal-vertical":(t,e,n,r)=>{const i=(e+r)/2;return"M"+t+","+e+"C"+t+","+i+" "+n+","+i+" "+n+","+r},"diagonal-radial":(t,e,n,r)=>{const i=Math.cos(t),o=Math.sin(t),a=Math.cos(n),u=Math.sin(n),s=(e+r)/2;return"M"+e*i+","+e*o+"C"+s*i+","+s*o+" "+s*a+","+s*u+" "+r*a+","+r*u}});function nx(t){ga.call(this,null,t)}nx.Definition={type:"Pie",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"startAngle",type:"number",default:0},{name:"endAngle",type:"number",default:6.283185307179586},{name:"sort",type:"boolean",default:!1},{name:"as",type:"string",array:!0,length:2,default:["startAngle","endAngle"]}]},st(nx,ga,{transform(t,e){var n,r,i,o=t.as||["startAngle","endAngle"],a=o[0],u=o[1],s=t.field||p,l=t.startAngle||0,c=null!=t.endAngle?t.endAngle:2*Math.PI,f=e.source,h=f.map(s),d=h.length,g=l,m=(c-l)/pe(h),y=de(d);for(t.sort&&y.sort(((t,e)=>h[t]-h[e])),n=0;n<d;++n)i=h[y[n]],(r=f[y[n]])[a]=g,r[u]=g+=i*m;return this.value=h,e.reflow(t.modified()).modifies(o)}});function rx(t){return yd(t)&&t!==Gh}const ix=Ct(["set","modified","clear","type","scheme","schemeExtent","schemeCount","domain","domainMin","domainMid","domainMax","domainRaw","domainImplicit","nice","zero","bins","range","rangeStep","round","reverse","interpolate","interpolateGamma"]);function ox(t){ga.call(this,null,t),this.modified(!0)}function ax(t,e,n){xd(t)&&(Math.abs(e.reduce(((t,e)=>t+(e<0?-1:e>0?1:0)),0))!==e.length);return e}function ux(t,e,n){return Y(t)&&(e||n)?Ad(t,sx(e||[0,1],n)):t}function sx(t,e){return e?t.slice().reverse():t}function lx(t){ga.call(this,null,t)}st(ox,ga,{transform(t,e){var n=e.dataflow,r=this.value,i=function(t){var e,n=t.type,r="";if(n===Gh)return"sequential-linear";(function(t){const e=t.type;return yd(e)&&e!==Yh&&e!==Vh&&(t.scheme||t.range&&t.range.length&&t.range.every(gt))})(t)&&(r=2===(e=t.rawDomain?t.rawDomain.length:t.domain?t.domain.length+ +(null!=t.domainMid):0)?"sequential-":3===e?"diverging-":"");return(r+n||Ph).toLowerCase()}(t);for(i in r&&i===r.type||(this.value=r=pd(i)()),t)if(!ix[i]){if("padding"===i&&rx(r.type))continue;Y(r[i])?r[i](t[i]):n.warn("Unsupported scale property: "+i)}return function(t,e,n){var r=t.type,i=e.round||!1,o=e.range;if(null!=e.rangeStep)o=function(t,e,n){t!==td&&t!==Kh&&s("Only band and point scales support rangeStep.");var r=(null!=e.paddingOuter?e.paddingOuter:e.padding)||0,i=t===Kh?1:(null!=e.paddingInner?e.paddingInner:e.padding)||0;return[0,e.rangeStep*Uh(n,i,r)]}(r,e,n);else if(e.scheme&&(o=function(t,e,n){var r,i=e.schemeExtent;_(e.scheme)?r=Md(e.scheme,e.interpolate,e.interpolateGamma):(r=Td(e.scheme.toLowerCase()))||s(`Unrecognized scheme name: ${e.scheme}`);return n=t===Zh?n+1:t===ed?n-1:t===Xh||t===Jh?+e.schemeCount||5:n,bd(t)?ux(r,i,e.reverse):Y(r)?Ed(ux(r,i),n):t===Qh?r:r.slice(0,n)}(r,e,n),Y(o))){if(t.interpolator)return t.interpolator(o);s(`Scale type ${r} does not support interpolating color schemes.`)}if(o&&bd(r))return t.interpolator(Md(sx(o,e.reverse),e.interpolate,e.interpolateGamma));o&&e.interpolate&&t.interpolate?t.interpolate(Cd(e.interpolate,e.interpolateGamma)):Y(t.round)?t.round(i):Y(t.rangeRound)&&t.interpolate(i?Bf:Sf);o&&t.range(sx(o,e.reverse))}(r,t,function(t,e,n){let r=e.bins;if(r&&!_(r)){const e=t.domain(),n=e[0],i=M(e),o=r.step;let a=null==r.start?n:r.start,u=null==r.stop?i:r.stop;o||s("Scale bins parameter missing step property."),a<n&&(a=o*Math.ceil(n/o)),u>i&&(u=o*Math.floor(i/o)),r=de(a,u+o/2,o)}r?t.bins=r:t.bins&&delete t.bins;t.type===ed&&(r?e.domain||e.domainRaw||(t.domain(r),n=r.length):t.bins=t.domain());return n}(r,t,function(t,e,n){const r=function(t,e,n){return e?(t.domain(ax(t.type,e,n)),e.length):-1}(t,e.domainRaw,n);if(r>-1)return r;var i,o,a=e.domain,u=t.type,s=e.zero||void 0===e.zero&&function(t){const e=t.type;return!t.bins&&(e===Ph||e===Ih||e===Wh)}(t);if(!a)return 0;rx(u)&&e.padding&&a[0]!==M(a)&&(a=function(t,e,n,r,i,o){var a=Math.abs(M(n)-n[0]),u=a/(a-2*r),s=t===jh?L(e,null,u):t===Wh?U(e,null,u,.5):t===Ih?U(e,null,u,i||1):t===Hh?P(e,null,u,o||1):q(e,null,u);return(e=e.slice())[0]=s[0],e[e.length-1]=s[1],e}(u,a,e.range,e.padding,e.exponent,e.constant));if((s||null!=e.domainMin||null!=e.domainMax||null!=e.domainMid)&&(i=(a=a.slice()).length-1||1,s&&(a[0]>0&&(a[0]=0),a[i]<0&&(a[i]=0)),null!=e.domainMin&&(a[0]=e.domainMin),null!=e.domainMax&&(a[i]=e.domainMax),null!=e.domainMid)){const t=(o=e.domainMid)>a[i]?i+1:o<a[0]?0:i;t!==i&&n.warn("Scale domainMid exceeds domain min or max.",o),a.splice(t,0,o)}t.domain(ax(u,a,n)),u===Qh&&t.unknown(e.domainImplicit?Kl:void 0);e.nice&&t.nice&&t.nice(!0!==e.nice&&$d(t,e.nice)||null);return a.length}(r,t,n))),e.fork(e.NO_SOURCE|e.NO_FIELDS)}}),st(lx,ga,{transform(t,e){const n=t.modified("sort")||e.changed(e.ADD)||e.modified(t.sort.fields)||e.modified("datum");return n&&e.source.sort(jo(t.sort)),this.modified(n),e}});const cx="zero",fx="center",hx="normalize",dx=["y0","y1"];function px(t){ga.call(this,null,t)}function gx(t,e,n,r,i){for(var o,a=(e-t.sum)/2,u=t.length,s=0;s<u;++s)(o=t[s])[r]=a,o[i]=a+=Math.abs(n(o))}function mx(t,e,n,r,i){for(var o,a=1/t.sum,u=0,s=t.length,l=0,c=0;l<s;++l)(o=t[l])[r]=u,o[i]=u=a*(c+=Math.abs(n(o)))}function yx(t,e,n,r,i){for(var o,a,u=0,s=0,l=t.length,c=0;c<l;++c)(o=+n(a=t[c]))<0?(a[r]=s,a[i]=s+=o):(a[r]=u,a[i]=u+=o)}px.Definition={type:"Stack",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"groupby",type:"field",array:!0},{name:"sort",type:"compare"},{name:"offset",type:"enum",default:cx,values:[cx,fx,hx]},{name:"as",type:"string",array:!0,length:2,default:dx}]},st(px,ga,{transform(t,e){var n,r,i,o,a=t.as||dx,u=a[0],s=a[1],l=jo(t.sort),c=t.field||p,f=t.offset===fx?gx:t.offset===hx?mx:yx;for(n=function(t,e,n,r){var i,o,a,u,s,l,c,f,h,d=[],p=t=>t(s);if(null==e)d.push(t.slice());else for(i={},o=0,a=t.length;o<a;++o)s=t[o],(c=i[l=e.map(p)])||(i[l]=c=[],d.push(c)),c.push(s);for(l=0,h=0,u=d.length;l<u;++l){for(o=0,f=0,a=(c=d[l]).length;o<a;++o)f+=Math.abs(r(c[o]));c.sum=f,f>h&&(h=f),n&&c.sort(n)}return d.max=h,d}(e.source,t.groupby,l,c),r=0,i=n.length,o=n.max;r<i;++r)f(n[r],o,c,u,s);return e.reflow(t.modified()).modifies(a)}});var vx=Object.freeze({__proto__:null,axisticks:j_,datajoin:I_,encode:H_,legendentries:Y_,linkpath:Z_,pie:nx,scale:ox,sortitems:lx,stack:px}),_x=1e-6,xx=1e-12,bx=Math.PI,wx=bx/2,kx=bx/4,Ax=2*bx,Mx=180/bx,Ex=bx/180,Dx=Math.abs,Cx=Math.atan,Fx=Math.atan2,Sx=Math.cos,Bx=Math.ceil,Tx=Math.exp,zx=Math.hypot,Nx=Math.log,Ox=Math.pow,Rx=Math.sin,$x=Math.sign||function(t){return t>0?1:t<0?-1:0},qx=Math.sqrt,Lx=Math.tan;function Ux(t){return t>1?0:t<-1?bx:Math.acos(t)}function Px(t){return t>1?wx:t<-1?-wx:Math.asin(t)}function jx(){}function Ix(t,e){t&&Hx.hasOwnProperty(t.type)&&Hx[t.type](t,e)}var Wx={Feature:function(t,e){Ix(t.geometry,e)},FeatureCollection:function(t,e){for(var n=t.features,r=-1,i=n.length;++r<i;)Ix(n[r].geometry,e)}},Hx={Sphere:function(t,e){e.sphere()},Point:function(t,e){t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)t=n[r],e.point(t[0],t[1],t[2])},LineString:function(t,e){Yx(t.coordinates,e,0)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)Yx(n[r],e,0)},Polygon:function(t,e){Vx(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)Vx(n[r],e)},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,i=n.length;++r<i;)Ix(n[r],e)}};function Yx(t,e,n){var r,i=-1,o=t.length-n;for(e.lineStart();++i<o;)r=t[i],e.point(r[0],r[1],r[2]);e.lineEnd()}function Vx(t,e){var n=-1,r=t.length;for(e.polygonStart();++n<r;)Yx(t[n],e,1);e.polygonEnd()}function Gx(t,e){t&&Wx.hasOwnProperty(t.type)?Wx[t.type](t,e):Ix(t,e)}var Xx,Jx,Zx,Qx,Kx,tb,eb,nb,rb,ib,ob,ab,ub,sb,lb,cb,fb=new Qt,hb=new Qt,db={point:jx,lineStart:jx,lineEnd:jx,polygonStart:function(){fb=new Qt,db.lineStart=pb,db.lineEnd=gb},polygonEnd:function(){var t=+fb;hb.add(t<0?Ax+t:t),this.lineStart=this.lineEnd=this.point=jx},sphere:function(){hb.add(Ax)}};function pb(){db.point=mb}function gb(){yb(Xx,Jx)}function mb(t,e){db.point=yb,Xx=t,Jx=e,Zx=t*=Ex,Qx=Sx(e=(e*=Ex)/2+kx),Kx=Rx(e)}function yb(t,e){var n=(t*=Ex)-Zx,r=n>=0?1:-1,i=r*n,o=Sx(e=(e*=Ex)/2+kx),a=Rx(e),u=Kx*a,s=Qx*o+u*Sx(i),l=u*r*Rx(i);fb.add(Fx(l,s)),Zx=t,Qx=o,Kx=a}function vb(t){return[Fx(t[1],t[0]),Px(t[2])]}function _b(t){var e=t[0],n=t[1],r=Sx(n);return[r*Sx(e),r*Rx(e),Rx(n)]}function xb(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function bb(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function wb(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function kb(t,e){return[t[0]*e,t[1]*e,t[2]*e]}function Ab(t){var e=qx(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e}var Mb,Eb,Db,Cb,Fb,Sb,Bb,Tb,zb,Nb,Ob,Rb,$b,qb,Lb,Ub,Pb={point:jb,lineStart:Wb,lineEnd:Hb,polygonStart:function(){Pb.point=Yb,Pb.lineStart=Vb,Pb.lineEnd=Gb,sb=new Qt,db.polygonStart()},polygonEnd:function(){db.polygonEnd(),Pb.point=jb,Pb.lineStart=Wb,Pb.lineEnd=Hb,fb<0?(tb=-(nb=180),eb=-(rb=90)):sb>_x?rb=90:sb<-1e-6&&(eb=-90),cb[0]=tb,cb[1]=nb},sphere:function(){tb=-(nb=180),eb=-(rb=90)}};function jb(t,e){lb.push(cb=[tb=t,nb=t]),e<eb&&(eb=e),e>rb&&(rb=e)}function Ib(t,e){var n=_b([t*Ex,e*Ex]);if(ub){var r=bb(ub,n),i=bb([r[1],-r[0],0],r);Ab(i),i=vb(i);var o,a=t-ib,u=a>0?1:-1,s=i[0]*Mx*u,l=Dx(a)>180;l^(u*ib<s&&s<u*t)?(o=i[1]*Mx)>rb&&(rb=o):l^(u*ib<(s=(s+360)%360-180)&&s<u*t)?(o=-i[1]*Mx)<eb&&(eb=o):(e<eb&&(eb=e),e>rb&&(rb=e)),l?t<ib?Xb(tb,t)>Xb(tb,nb)&&(nb=t):Xb(t,nb)>Xb(tb,nb)&&(tb=t):nb>=tb?(t<tb&&(tb=t),t>nb&&(nb=t)):t>ib?Xb(tb,t)>Xb(tb,nb)&&(nb=t):Xb(t,nb)>Xb(tb,nb)&&(tb=t)}else lb.push(cb=[tb=t,nb=t]);e<eb&&(eb=e),e>rb&&(rb=e),ub=n,ib=t}function Wb(){Pb.point=Ib}function Hb(){cb[0]=tb,cb[1]=nb,Pb.point=jb,ub=null}function Yb(t,e){if(ub){var n=t-ib;sb.add(Dx(n)>180?n+(n>0?360:-360):n)}else ob=t,ab=e;db.point(t,e),Ib(t,e)}function Vb(){db.lineStart()}function Gb(){Yb(ob,ab),db.lineEnd(),Dx(sb)>_x&&(tb=-(nb=180)),cb[0]=tb,cb[1]=nb,ub=null}function Xb(t,e){return(e-=t)<0?e+360:e}function Jb(t,e){return t[0]-e[0]}function Zb(t,e){return t[0]<=t[1]?t[0]<=e&&e<=t[1]:e<t[0]||t[1]<e}var Qb={sphere:jx,point:Kb,lineStart:ew,lineEnd:iw,polygonStart:function(){Qb.lineStart=ow,Qb.lineEnd=aw},polygonEnd:function(){Qb.lineStart=ew,Qb.lineEnd=iw}};function Kb(t,e){t*=Ex;var n=Sx(e*=Ex);tw(n*Sx(t),n*Rx(t),Rx(e))}function tw(t,e,n){++Mb,Db+=(t-Db)/Mb,Cb+=(e-Cb)/Mb,Fb+=(n-Fb)/Mb}function ew(){Qb.point=nw}function nw(t,e){t*=Ex;var n=Sx(e*=Ex);qb=n*Sx(t),Lb=n*Rx(t),Ub=Rx(e),Qb.point=rw,tw(qb,Lb,Ub)}function rw(t,e){t*=Ex;var n=Sx(e*=Ex),r=n*Sx(t),i=n*Rx(t),o=Rx(e),a=Fx(qx((a=Lb*o-Ub*i)*a+(a=Ub*r-qb*o)*a+(a=qb*i-Lb*r)*a),qb*r+Lb*i+Ub*o);Eb+=a,Sb+=a*(qb+(qb=r)),Bb+=a*(Lb+(Lb=i)),Tb+=a*(Ub+(Ub=o)),tw(qb,Lb,Ub)}function iw(){Qb.point=Kb}function ow(){Qb.point=uw}function aw(){sw(Rb,$b),Qb.point=Kb}function uw(t,e){Rb=t,$b=e,t*=Ex,e*=Ex,Qb.point=sw;var n=Sx(e);qb=n*Sx(t),Lb=n*Rx(t),Ub=Rx(e),tw(qb,Lb,Ub)}function sw(t,e){t*=Ex;var n=Sx(e*=Ex),r=n*Sx(t),i=n*Rx(t),o=Rx(e),a=Lb*o-Ub*i,u=Ub*r-qb*o,s=qb*i-Lb*r,l=zx(a,u,s),c=Px(l),f=l&&-c/l;zb.add(f*a),Nb.add(f*u),Ob.add(f*s),Eb+=c,Sb+=c*(qb+(qb=r)),Bb+=c*(Lb+(Lb=i)),Tb+=c*(Ub+(Ub=o)),tw(qb,Lb,Ub)}function lw(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1])}return t.invert&&e.invert&&(n.invert=function(n,r){return(n=e.invert(n,r))&&t.invert(n[0],n[1])}),n}function cw(t,e){return[Dx(t)>bx?t+Math.round(-t/Ax)*Ax:t,e]}function fw(t,e,n){return(t%=Ax)?e||n?lw(dw(t),pw(e,n)):dw(t):e||n?pw(e,n):cw}function hw(t){return function(e,n){return[(e+=t)>bx?e-Ax:e<-bx?e+Ax:e,n]}}function dw(t){var e=hw(t);return e.invert=hw(-t),e}function pw(t,e){var n=Sx(t),r=Rx(t),i=Sx(e),o=Rx(e);function a(t,e){var a=Sx(e),u=Sx(t)*a,s=Rx(t)*a,l=Rx(e),c=l*n+u*r;return[Fx(s*i-c*o,u*n-l*r),Px(c*i+s*o)]}return a.invert=function(t,e){var a=Sx(e),u=Sx(t)*a,s=Rx(t)*a,l=Rx(e),c=l*i-s*o;return[Fx(s*i+l*o,u*n+c*r),Px(c*n-u*r)]},a}function gw(t,e){(e=_b(e))[0]-=t,Ab(e);var n=Ux(-e[1]);return((-e[2]<0?-n:n)+Ax-_x)%Ax}function mw(){var t,e=[];return{point:function(e,n,r){t.push([e,n,r])},lineStart:function(){e.push(t=[])},lineEnd:jx,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e;return e=[],t=null,n}}}function yw(t,e){return Dx(t[0]-e[0])<_x&&Dx(t[1]-e[1])<_x}function vw(t,e,n,r){this.x=t,this.z=e,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function _w(t,e,n,r,i){var o,a,u=[],s=[];if(t.forEach((function(t){if(!((e=t.length-1)<=0)){var e,n,r=t[0],a=t[e];if(yw(r,a)){if(!r[2]&&!a[2]){for(i.lineStart(),o=0;o<e;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a[0]+=2e-6}u.push(n=new vw(r,t,null,!0)),s.push(n.o=new vw(r,null,n,!1)),u.push(n=new vw(a,t,null,!1)),s.push(n.o=new vw(a,null,n,!0))}})),u.length){for(s.sort(e),xw(u),xw(s),o=0,a=s.length;o<a;++o)s[o].e=n=!n;for(var l,c,f=u[0];;){for(var h=f,d=!0;h.v;)if((h=h.n)===f)return;l=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(d)for(o=0,a=l.length;o<a;++o)i.point((c=l[o])[0],c[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(d)for(l=h.p.z,o=l.length-1;o>=0;--o)i.point((c=l[o])[0],c[1]);else r(h.x,h.p.x,-1,i);h=h.p}l=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function xw(t){if(e=t.length){for(var e,n,r=0,i=t[0];++r<e;)i.n=n=t[r],n.p=i,i=n;i.n=n=t[0],n.p=i}}function bw(t){return Dx(t[0])<=bx?t[0]:$x(t[0])*((Dx(t[0])+bx)%Ax-bx)}function ww(t,e,n,r){return function(i){var o,a,u,s=e(i),l=mw(),c=e(l),f=!1,h={point:d,lineStart:g,lineEnd:m,polygonStart:function(){h.point=y,h.lineStart=v,h.lineEnd=_,a=[],o=[]},polygonEnd:function(){h.point=d,h.lineStart=g,h.lineEnd=m,a=he(a);var t=function(t,e){var n=bw(e),r=e[1],i=Rx(r),o=[Rx(n),-Sx(n),0],a=0,u=0,s=new Qt;1===i?r=wx+_x:-1===i&&(r=-wx-_x);for(var l=0,c=t.length;l<c;++l)if(h=(f=t[l]).length)for(var f,h,d=f[h-1],p=bw(d),g=d[1]/2+kx,m=Rx(g),y=Sx(g),v=0;v<h;++v,p=x,m=w,y=k,d=_){var _=f[v],x=bw(_),b=_[1]/2+kx,w=Rx(b),k=Sx(b),A=x-p,M=A>=0?1:-1,E=M*A,D=E>bx,C=m*w;if(s.add(Fx(C*M*Rx(E),y*k+C*Sx(E))),a+=D?A+M*Ax:A,D^p>=n^x>=n){var F=bb(_b(d),_b(_));Ab(F);var S=bb(o,F);Ab(S);var B=(D^A>=0?-1:1)*Px(S[2]);(r>B||r===B&&(F[0]||F[1]))&&(u+=D^A>=0?1:-1)}}return(a<-1e-6||a<_x&&s<-1e-12)^1&u}(o,r);a.length?(f||(i.polygonStart(),f=!0),_w(a,Aw,t,n,i)):t&&(f||(i.polygonStart(),f=!0),i.lineStart(),n(null,null,1,i),i.lineEnd()),f&&(i.polygonEnd(),f=!1),a=o=null},sphere:function(){i.polygonStart(),i.lineStart(),n(null,null,1,i),i.lineEnd(),i.polygonEnd()}};function d(e,n){t(e,n)&&i.point(e,n)}function p(t,e){s.point(t,e)}function g(){h.point=p,s.lineStart()}function m(){h.point=d,s.lineEnd()}function y(t,e){u.push([t,e]),c.point(t,e)}function v(){c.lineStart(),u=[]}function _(){y(u[0][0],u[0][1]),c.lineEnd();var t,e,n,r,s=c.clean(),h=l.result(),d=h.length;if(u.pop(),o.push(u),u=null,d)if(1&s){if((e=(n=h[0]).length-1)>0){for(f||(i.polygonStart(),f=!0),i.lineStart(),t=0;t<e;++t)i.point((r=n[t])[0],r[1]);i.lineEnd()}}else d>1&&2&s&&h.push(h.pop().concat(h.shift())),a.push(h.filter(kw))}return h}}function kw(t){return t.length>1}function Aw(t,e){return((t=t.x)[0]<0?t[1]-wx-_x:wx-t[1])-((e=e.x)[0]<0?e[1]-wx-_x:wx-e[1])}cw.invert=cw;var Mw=ww((function(){return!0}),(function(t){var e,n=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),e=1},point:function(o,a){var u=o>0?bx:-bx,s=Dx(o-n);Dx(s-bx)<_x?(t.point(n,r=(r+a)/2>0?wx:-wx),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),t.point(o,r),e=0):i!==u&&s>=bx&&(Dx(n-i)<_x&&(n-=i*_x),Dx(o-u)<_x&&(o-=u*_x),r=function(t,e,n,r){var i,o,a=Rx(t-n);return Dx(a)>_x?Cx((Rx(e)*(o=Sx(r))*Rx(n)-Rx(r)*(i=Sx(e))*Rx(t))/(i*o*a)):(e+r)/2}(n,r,o,a),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(u,r),e=0),t.point(n=o,r=a),i=u},lineEnd:function(){t.lineEnd(),n=r=NaN},clean:function(){return 2-e}}}),(function(t,e,n,r){var i;if(null==t)i=n*wx,r.point(-bx,i),r.point(0,i),r.point(bx,i),r.point(bx,0),r.point(bx,-i),r.point(0,-i),r.point(-bx,-i),r.point(-bx,0),r.point(-bx,i);else if(Dx(t[0]-e[0])>_x){var o=t[0]<e[0]?bx:-bx;i=n*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(e[0],e[1])}),[-bx,-wx]);function Ew(t){var e=Sx(t),n=6*Ex,r=e>0,i=Dx(e)>_x;function o(t,n){return Sx(t)*Sx(n)>e}function a(t,n,r){var i=[1,0,0],o=bb(_b(t),_b(n)),a=xb(o,o),u=o[0],s=a-u*u;if(!s)return!r&&t;var l=e*a/s,c=-e*u/s,f=bb(i,o),h=kb(i,l);wb(h,kb(o,c));var d=f,p=xb(h,d),g=xb(d,d),m=p*p-g*(xb(h,h)-1);if(!(m<0)){var y=qx(m),v=kb(d,(-p-y)/g);if(wb(v,h),v=vb(v),!r)return v;var _,x=t[0],b=n[0],w=t[1],k=n[1];b<x&&(_=x,x=b,b=_);var A=b-x,M=Dx(A-bx)<_x;if(!M&&k<w&&(_=w,w=k,k=_),M||A<_x?M?w+k>0^v[1]<(Dx(v[0]-x)<_x?w:k):w<=v[1]&&v[1]<=k:A>bx^(x<=v[0]&&v[0]<=b)){var E=kb(d,(-p+y)/g);return wb(E,h),[v,vb(E)]}}}function u(e,n){var i=r?t:bx-t,o=0;return e<-i?o|=1:e>i&&(o|=2),n<-i?o|=4:n>i&&(o|=8),o}return ww(o,(function(t){var e,n,s,l,c;return{lineStart:function(){l=s=!1,c=1},point:function(f,h){var d,p=[f,h],g=o(f,h),m=r?g?0:u(f,h):g?u(f+(f<0?bx:-bx),h):0;if(!e&&(l=s=g)&&t.lineStart(),g!==s&&(!(d=a(e,p))||yw(e,d)||yw(p,d))&&(p[2]=1),g!==s)c=0,g?(t.lineStart(),d=a(p,e),t.point(d[0],d[1])):(d=a(e,p),t.point(d[0],d[1],2),t.lineEnd()),e=d;else if(i&&e&&r^g){var y;m&n||!(y=a(p,e,!0))||(c=0,r?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1],3)))}!g||e&&yw(e,p)||t.point(p[0],p[1]),e=p,s=g,n=m},lineEnd:function(){s&&t.lineEnd(),e=null},clean:function(){return c|(l&&s)<<1}}}),(function(e,r,i,o){!function(t,e,n,r,i,o){if(n){var a=Sx(e),u=Rx(e),s=r*n;null==i?(i=e+r*Ax,o=e-s/2):(i=gw(a,i),o=gw(a,o),(r>0?i<o:i>o)&&(i+=r*Ax));for(var l,c=i;r>0?c>o:c<o;c-=s)l=vb([a,-u*Sx(c),-u*Rx(c)]),t.point(l[0],l[1])}}(o,t,n,i,e,r)}),r?[0,-t]:[-bx,t-bx])}var Dw=1e9,Cw=-Dw;function Fw(t,e,n,r){function i(i,o){return t<=i&&i<=n&&e<=o&&o<=r}function o(i,o,u,l){var c=0,f=0;if(null==i||(c=a(i,u))!==(f=a(o,u))||s(i,o)<0^u>0)do{l.point(0===c||3===c?t:n,c>1?r:e)}while((c=(c+u+4)%4)!==f);else l.point(o[0],o[1])}function a(r,i){return Dx(r[0]-t)<_x?i>0?0:3:Dx(r[0]-n)<_x?i>0?2:1:Dx(r[1]-e)<_x?i>0?1:0:i>0?3:2}function u(t,e){return s(t.x,e.x)}function s(t,e){var n=a(t,1),r=a(e,1);return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0]}return function(a){var s,l,c,f,h,d,p,g,m,y,v,_=a,x=mw(),b={point:w,lineStart:function(){b.point=k,l&&l.push(c=[]);y=!0,m=!1,p=g=NaN},lineEnd:function(){s&&(k(f,h),d&&m&&x.rejoin(),s.push(x.result()));b.point=w,m&&_.lineEnd()},polygonStart:function(){_=x,s=[],l=[],v=!0},polygonEnd:function(){var e=function(){for(var e=0,n=0,i=l.length;n<i;++n)for(var o,a,u=l[n],s=1,c=u.length,f=u[0],h=f[0],d=f[1];s<c;++s)o=h,a=d,h=(f=u[s])[0],d=f[1],a<=r?d>r&&(h-o)*(r-a)>(d-a)*(t-o)&&++e:d<=r&&(h-o)*(r-a)<(d-a)*(t-o)&&--e;return e}(),n=v&&e,i=(s=he(s)).length;(n||i)&&(a.polygonStart(),n&&(a.lineStart(),o(null,null,1,a),a.lineEnd()),i&&_w(s,u,e,o,a),a.polygonEnd());_=a,s=l=c=null}};function w(t,e){i(t,e)&&_.point(t,e)}function k(o,a){var u=i(o,a);if(l&&c.push([o,a]),y)f=o,h=a,d=u,y=!1,u&&(_.lineStart(),_.point(o,a));else if(u&&m)_.point(o,a);else{var s=[p=Math.max(Cw,Math.min(Dw,p)),g=Math.max(Cw,Math.min(Dw,g))],x=[o=Math.max(Cw,Math.min(Dw,o)),a=Math.max(Cw,Math.min(Dw,a))];!function(t,e,n,r,i,o){var a,u=t[0],s=t[1],l=0,c=1,f=e[0]-u,h=e[1]-s;if(a=n-u,f||!(a>0)){if(a/=f,f<0){if(a<l)return;a<c&&(c=a)}else if(f>0){if(a>c)return;a>l&&(l=a)}if(a=i-u,f||!(a<0)){if(a/=f,f<0){if(a>c)return;a>l&&(l=a)}else if(f>0){if(a<l)return;a<c&&(c=a)}if(a=r-s,h||!(a>0)){if(a/=h,h<0){if(a<l)return;a<c&&(c=a)}else if(h>0){if(a>c)return;a>l&&(l=a)}if(a=o-s,h||!(a<0)){if(a/=h,h<0){if(a>c)return;a>l&&(l=a)}else if(h>0){if(a<l)return;a<c&&(c=a)}return l>0&&(t[0]=u+l*f,t[1]=s+l*h),c<1&&(e[0]=u+c*f,e[1]=s+c*h),!0}}}}}(s,x,t,e,n,r)?u&&(_.lineStart(),_.point(o,a),v=!1):(m||(_.lineStart(),_.point(s[0],s[1])),_.point(x[0],x[1]),u||_.lineEnd(),v=!1)}p=o,g=a,m=u}return b}}function Sw(t,e,n){var r=de(t,e-_x,n).concat(e);return function(t){return r.map((function(e){return[t,e]}))}}function Bw(t,e,n){var r=de(t,e-_x,n).concat(e);return function(t){return r.map((function(e){return[e,t]}))}}var Tw,zw,Nw,Ow,Rw=t=>t,$w=new Qt,qw=new Qt,Lw={point:jx,lineStart:jx,lineEnd:jx,polygonStart:function(){Lw.lineStart=Uw,Lw.lineEnd=Iw},polygonEnd:function(){Lw.lineStart=Lw.lineEnd=Lw.point=jx,$w.add(Dx(qw)),qw=new Qt},result:function(){var t=$w/2;return $w=new Qt,t}};function Uw(){Lw.point=Pw}function Pw(t,e){Lw.point=jw,Tw=Nw=t,zw=Ow=e}function jw(t,e){qw.add(Ow*t-Nw*e),Nw=t,Ow=e}function Iw(){jw(Tw,zw)}var Ww=1/0,Hw=Ww,Yw=-Ww,Vw=Yw,Gw={point:function(t,e){t<Ww&&(Ww=t);t>Yw&&(Yw=t);e<Hw&&(Hw=e);e>Vw&&(Vw=e)},lineStart:jx,lineEnd:jx,polygonStart:jx,polygonEnd:jx,result:function(){var t=[[Ww,Hw],[Yw,Vw]];return Yw=Vw=-(Hw=Ww=1/0),t}};var Xw,Jw,Zw,Qw,Kw=0,tk=0,ek=0,nk=0,rk=0,ik=0,ok=0,ak=0,uk=0,sk={point:lk,lineStart:ck,lineEnd:dk,polygonStart:function(){sk.lineStart=pk,sk.lineEnd=gk},polygonEnd:function(){sk.point=lk,sk.lineStart=ck,sk.lineEnd=dk},result:function(){var t=uk?[ok/uk,ak/uk]:ik?[nk/ik,rk/ik]:ek?[Kw/ek,tk/ek]:[NaN,NaN];return Kw=tk=ek=nk=rk=ik=ok=ak=uk=0,t}};function lk(t,e){Kw+=t,tk+=e,++ek}function ck(){sk.point=fk}function fk(t,e){sk.point=hk,lk(Zw=t,Qw=e)}function hk(t,e){var n=t-Zw,r=e-Qw,i=qx(n*n+r*r);nk+=i*(Zw+t)/2,rk+=i*(Qw+e)/2,ik+=i,lk(Zw=t,Qw=e)}function dk(){sk.point=lk}function pk(){sk.point=mk}function gk(){yk(Xw,Jw)}function mk(t,e){sk.point=yk,lk(Xw=Zw=t,Jw=Qw=e)}function yk(t,e){var n=t-Zw,r=e-Qw,i=qx(n*n+r*r);nk+=i*(Zw+t)/2,rk+=i*(Qw+e)/2,ik+=i,ok+=(i=Qw*t-Zw*e)*(Zw+t),ak+=i*(Qw+e),uk+=3*i,lk(Zw=t,Qw=e)}function vk(t){this._context=t}vk.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,e){switch(this._point){case 0:this._context.moveTo(t,e),this._point=1;break;case 1:this._context.lineTo(t,e);break;default:this._context.moveTo(t+this._radius,e),this._context.arc(t,e,this._radius,0,Ax)}},result:jx};var _k,xk,bk,wk,kk,Ak=new Qt,Mk={point:jx,lineStart:function(){Mk.point=Ek},lineEnd:function(){_k&&Dk(xk,bk),Mk.point=jx},polygonStart:function(){_k=!0},polygonEnd:function(){_k=null},result:function(){var t=+Ak;return Ak=new Qt,t}};function Ek(t,e){Mk.point=Dk,xk=wk=t,bk=kk=e}function Dk(t,e){wk-=t,kk-=e,Ak.add(qx(wk*wk+kk*kk)),wk=t,kk=e}function Ck(){this._string=[]}function Fk(t){return"m0,"+t+"a"+t+","+t+" 0 1,1 0,"+-2*t+"a"+t+","+t+" 0 1,1 0,"+2*t+"z"}function Sk(t,e){var n,r,i=4.5;function o(t){return t&&("function"==typeof i&&r.pointRadius(+i.apply(this,arguments)),Gx(t,n(r))),r.result()}return o.area=function(t){return Gx(t,n(Lw)),Lw.result()},o.measure=function(t){return Gx(t,n(Mk)),Mk.result()},o.bounds=function(t){return Gx(t,n(Gw)),Gw.result()},o.centroid=function(t){return Gx(t,n(sk)),sk.result()},o.projection=function(e){return arguments.length?(n=null==e?(t=null,Rw):(t=e).stream,o):t},o.context=function(t){return arguments.length?(r=null==t?(e=null,new Ck):new vk(e=t),"function"!=typeof i&&r.pointRadius(i),o):e},o.pointRadius=function(t){return arguments.length?(i="function"==typeof t?t:(r.pointRadius(+t),+t),o):i},o.projection(t).context(e)}function Bk(t){return function(e){var n=new Tk;for(var r in t)n[r]=t[r];return n.stream=e,n}}function Tk(){}function zk(t,e,n){var r=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),null!=r&&t.clipExtent(null),Gx(n,t.stream(Gw)),e(Gw.result()),null!=r&&t.clipExtent(r),t}function Nk(t,e,n){return zk(t,(function(n){var r=e[1][0]-e[0][0],i=e[1][1]-e[0][1],o=Math.min(r/(n[1][0]-n[0][0]),i/(n[1][1]-n[0][1])),a=+e[0][0]+(r-o*(n[1][0]+n[0][0]))/2,u=+e[0][1]+(i-o*(n[1][1]+n[0][1]))/2;t.scale(150*o).translate([a,u])}),n)}function Ok(t,e,n){return Nk(t,[[0,0],e],n)}function Rk(t,e,n){return zk(t,(function(n){var r=+e,i=r/(n[1][0]-n[0][0]),o=(r-i*(n[1][0]+n[0][0]))/2,a=-i*n[0][1];t.scale(150*i).translate([o,a])}),n)}function $k(t,e,n){return zk(t,(function(n){var r=+e,i=r/(n[1][1]-n[0][1]),o=-i*n[0][0],a=(r-i*(n[1][1]+n[0][1]))/2;t.scale(150*i).translate([o,a])}),n)}Ck.prototype={_radius:4.5,_circle:Fk(4.5),pointRadius:function(t){return(t=+t)!==this._radius&&(this._radius=t,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(t,e){switch(this._point){case 0:this._string.push("M",t,",",e),this._point=1;break;case 1:this._string.push("L",t,",",e);break;default:null==this._circle&&(this._circle=Fk(this._radius)),this._string.push("M",t,",",e,this._circle)}},result:function(){if(this._string.length){var t=this._string.join("");return this._string=[],t}return null}},Tk.prototype={constructor:Tk,point:function(t,e){this.stream.point(t,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var qk=Sx(30*Ex);function Lk(t,e){return+e?function(t,e){function n(r,i,o,a,u,s,l,c,f,h,d,p,g,m){var y=l-r,v=c-i,_=y*y+v*v;if(_>4*e&&g--){var x=a+h,b=u+d,w=s+p,k=qx(x*x+b*b+w*w),A=Px(w/=k),M=Dx(Dx(w)-1)<_x||Dx(o-f)<_x?(o+f)/2:Fx(b,x),E=t(M,A),D=E[0],C=E[1],F=D-r,S=C-i,B=v*F-y*S;(B*B/_>e||Dx((y*F+v*S)/_-.5)>.3||a*h+u*d+s*p<qk)&&(n(r,i,o,a,u,s,D,C,M,x/=k,b/=k,w,g,m),m.point(D,C),n(D,C,M,x,b,w,l,c,f,h,d,p,g,m))}}return function(e){var r,i,o,a,u,s,l,c,f,h,d,p,g={point:m,lineStart:y,lineEnd:_,polygonStart:function(){e.polygonStart(),g.lineStart=x},polygonEnd:function(){e.polygonEnd(),g.lineStart=y}};function m(n,r){n=t(n,r),e.point(n[0],n[1])}function y(){c=NaN,g.point=v,e.lineStart()}function v(r,i){var o=_b([r,i]),a=t(r,i);n(c,f,l,h,d,p,c=a[0],f=a[1],l=r,h=o[0],d=o[1],p=o[2],16,e),e.point(c,f)}function _(){g.point=m,e.lineEnd()}function x(){y(),g.point=b,g.lineEnd=w}function b(t,e){v(r=t,e),i=c,o=f,a=h,u=d,s=p,g.point=v}function w(){n(c,f,l,h,d,p,i,o,r,a,u,s,16,e),g.lineEnd=_,_()}return g}}(t,e):function(t){return Bk({point:function(e,n){e=t(e,n),this.stream.point(e[0],e[1])}})}(t)}var Uk=Bk({point:function(t,e){this.stream.point(t*Ex,e*Ex)}});function Pk(t,e,n,r,i,o){if(!o)return function(t,e,n,r,i){function o(o,a){return[e+t*(o*=r),n-t*(a*=i)]}return o.invert=function(o,a){return[(o-e)/t*r,(n-a)/t*i]},o}(t,e,n,r,i);var a=Sx(o),u=Rx(o),s=a*t,l=u*t,c=a/t,f=u/t,h=(u*n-a*e)/t,d=(u*e+a*n)/t;function p(t,o){return[s*(t*=r)-l*(o*=i)+e,n-l*t-s*o]}return p.invert=function(t,e){return[r*(c*t-f*e+h),i*(d-f*t-c*e)]},p}function jk(t){return Ik((function(){return t}))()}function Ik(t){var e,n,r,i,o,a,u,s,l,c,f=150,h=480,d=250,p=0,g=0,m=0,y=0,v=0,_=0,x=1,b=1,w=null,k=Mw,A=null,M=Rw,E=.5;function D(t){return s(t[0]*Ex,t[1]*Ex)}function C(t){return(t=s.invert(t[0],t[1]))&&[t[0]*Mx,t[1]*Mx]}function F(){var t=Pk(f,0,0,x,b,_).apply(null,e(p,g)),r=Pk(f,h-t[0],d-t[1],x,b,_);return n=fw(m,y,v),u=lw(e,r),s=lw(n,u),a=Lk(u,E),S()}function S(){return l=c=null,D}return D.stream=function(t){return l&&c===t?l:l=Uk(function(t){return Bk({point:function(e,n){var r=t(e,n);return this.stream.point(r[0],r[1])}})}(n)(k(a(M(c=t)))))},D.preclip=function(t){return arguments.length?(k=t,w=void 0,S()):k},D.postclip=function(t){return arguments.length?(M=t,A=r=i=o=null,S()):M},D.clipAngle=function(t){return arguments.length?(k=+t?Ew(w=t*Ex):(w=null,Mw),S()):w*Mx},D.clipExtent=function(t){return arguments.length?(M=null==t?(A=r=i=o=null,Rw):Fw(A=+t[0][0],r=+t[0][1],i=+t[1][0],o=+t[1][1]),S()):null==A?null:[[A,r],[i,o]]},D.scale=function(t){return arguments.length?(f=+t,F()):f},D.translate=function(t){return arguments.length?(h=+t[0],d=+t[1],F()):[h,d]},D.center=function(t){return arguments.length?(p=t[0]%360*Ex,g=t[1]%360*Ex,F()):[p*Mx,g*Mx]},D.rotate=function(t){return arguments.length?(m=t[0]%360*Ex,y=t[1]%360*Ex,v=t.length>2?t[2]%360*Ex:0,F()):[m*Mx,y*Mx,v*Mx]},D.angle=function(t){return arguments.length?(_=t%360*Ex,F()):_*Mx},D.reflectX=function(t){return arguments.length?(x=t?-1:1,F()):x<0},D.reflectY=function(t){return arguments.length?(b=t?-1:1,F()):b<0},D.precision=function(t){return arguments.length?(a=Lk(u,E=t*t),S()):qx(E)},D.fitExtent=function(t,e){return Nk(D,t,e)},D.fitSize=function(t,e){return Ok(D,t,e)},D.fitWidth=function(t,e){return Rk(D,t,e)},D.fitHeight=function(t,e){return $k(D,t,e)},function(){return e=t.apply(this,arguments),D.invert=e.invert&&C,F()}}function Wk(t){var e=0,n=bx/3,r=Ik(t),i=r(e,n);return i.parallels=function(t){return arguments.length?r(e=t[0]*Ex,n=t[1]*Ex):[e*Mx,n*Mx]},i}function Hk(t,e){var n=Rx(t),r=(n+Rx(e))/2;if(Dx(r)<_x)return function(t){var e=Sx(t);function n(t,n){return[t*e,Rx(n)/e]}return n.invert=function(t,n){return[t/e,Px(n*e)]},n}(t);var i=1+n*(2*r-n),o=qx(i)/r;function a(t,e){var n=qx(i-2*r*Rx(e))/r;return[n*Rx(t*=r),o-n*Sx(t)]}return a.invert=function(t,e){var n=o-e,a=Fx(t,Dx(n))*$x(n);return n*r<0&&(a-=bx*$x(t)*$x(n)),[a/r,Px((i-(t*t+n*n)*r*r)/(2*r))]},a}function Yk(){return Wk(Hk).scale(155.424).center([0,33.6442])}function Vk(){return Yk().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function Gk(t){return function(e,n){var r=Sx(e),i=Sx(n),o=t(r*i);return o===1/0?[2,0]:[o*i*Rx(e),o*Rx(n)]}}function Xk(t){return function(e,n){var r=qx(e*e+n*n),i=t(r),o=Rx(i),a=Sx(i);return[Fx(e*o,r*a),Px(r&&n*o/r)]}}var Jk=Gk((function(t){return qx(2/(1+t))}));Jk.invert=Xk((function(t){return 2*Px(t/2)}));var Zk=Gk((function(t){return(t=Ux(t))&&t/Rx(t)}));function Qk(t,e){return[t,Nx(Lx((wx+e)/2))]}function Kk(t){var e,n,r,i=jk(t),o=i.center,a=i.scale,u=i.translate,s=i.clipExtent,l=null;function c(){var o=bx*a(),u=i(function(t){function e(e){return(e=t(e[0]*Ex,e[1]*Ex))[0]*=Mx,e[1]*=Mx,e}return t=fw(t[0]*Ex,t[1]*Ex,t.length>2?t[2]*Ex:0),e.invert=function(e){return(e=t.invert(e[0]*Ex,e[1]*Ex))[0]*=Mx,e[1]*=Mx,e},e}(i.rotate()).invert([0,0]));return s(null==l?[[u[0]-o,u[1]-o],[u[0]+o,u[1]+o]]:t===Qk?[[Math.max(u[0]-o,l),e],[Math.min(u[0]+o,n),r]]:[[l,Math.max(u[1]-o,e)],[n,Math.min(u[1]+o,r)]])}return i.scale=function(t){return arguments.length?(a(t),c()):a()},i.translate=function(t){return arguments.length?(u(t),c()):u()},i.center=function(t){return arguments.length?(o(t),c()):o()},i.clipExtent=function(t){return arguments.length?(null==t?l=e=n=r=null:(l=+t[0][0],e=+t[0][1],n=+t[1][0],r=+t[1][1]),c()):null==l?null:[[l,e],[n,r]]},c()}function tA(t){return Lx((wx+t)/2)}function eA(t,e){var n=Sx(t),r=t===e?Rx(t):Nx(n/Sx(e))/Nx(tA(e)/tA(t)),i=n*Ox(tA(t),r)/r;if(!r)return Qk;function o(t,e){i>0?e<-wx+_x&&(e=-wx+_x):e>wx-_x&&(e=wx-_x);var n=i/Ox(tA(e),r);return[n*Rx(r*t),i-n*Sx(r*t)]}return o.invert=function(t,e){var n=i-e,o=$x(r)*qx(t*t+n*n),a=Fx(t,Dx(n))*$x(n);return n*r<0&&(a-=bx*$x(t)*$x(n)),[a/r,2*Cx(Ox(i/o,1/r))-wx]},o}function nA(t,e){return[t,e]}function rA(t,e){var n=Sx(t),r=t===e?Rx(t):(n-Sx(e))/(e-t),i=n/r+t;if(Dx(r)<_x)return nA;function o(t,e){var n=i-e,o=r*t;return[n*Rx(o),i-n*Sx(o)]}return o.invert=function(t,e){var n=i-e,o=Fx(t,Dx(n))*$x(n);return n*r<0&&(o-=bx*$x(t)*$x(n)),[o/r,i-$x(r)*qx(t*t+n*n)]},o}Zk.invert=Xk((function(t){return t})),Qk.invert=function(t,e){return[t,2*Cx(Tx(e))-wx]},nA.invert=nA;var iA=1.340264,oA=-.081106,aA=893e-6,uA=.003796,sA=qx(3)/2;function lA(t,e){var n=Px(sA*Rx(e)),r=n*n,i=r*r*r;return[t*Sx(n)/(sA*(iA+3*oA*r+i*(7*aA+9*uA*r))),n*(iA+oA*r+i*(aA+uA*r))]}function cA(t,e){var n=Sx(e),r=Sx(t)*n;return[n*Rx(t)/r,Rx(e)/r]}function fA(t,e){var n=e*e,r=n*n;return[t*(.8707-.131979*n+r*(r*(.003971*n-.001529*r)-.013791)),e*(1.007226+n*(.015085+r*(.028874*n-.044475-.005916*r)))]}function hA(t,e){return[Sx(e)*Rx(t),Rx(e)]}function dA(t,e){var n=Sx(e),r=1+Sx(t)*n;return[n*Rx(t)/r,Rx(e)/r]}function pA(t,e){return[Nx(Lx((wx+e)/2)),-t]}lA.invert=function(t,e){for(var n,r=e,i=r*r,o=i*i*i,a=0;a<12&&(o=(i=(r-=n=(r*(iA+oA*i+o*(aA+uA*i))-e)/(iA+3*oA*i+o*(7*aA+9*uA*i)))*r)*i*i,!(Dx(n)<xx));++a);return[sA*t*(iA+3*oA*i+o*(7*aA+9*uA*i))/Sx(r),Px(Rx(r)/sA)]},cA.invert=Xk(Cx),fA.invert=function(t,e){var n,r=e,i=25;do{var o=r*r,a=o*o;r-=n=(r*(1.007226+o*(.015085+a*(.028874*o-.044475-.005916*a)))-e)/(1.007226+o*(.045255+a*(.259866*o-.311325-.005916*11*a)))}while(Dx(n)>_x&&--i>0);return[t/(.8707+(o=r*r)*(o*(o*o*o*(.003971-.001529*o)-.013791)-.131979)),r]},hA.invert=Xk(Px),dA.invert=Xk((function(t){return 2*Cx(t)})),pA.invert=function(t,e){return[-e,2*Cx(Tx(t))-wx]};var gA=Math.abs,mA=Math.cos,yA=Math.sin,vA=Math.PI,_A=vA/2,xA=function(t){return t>0?Math.sqrt(t):0}(2);function bA(t){return t>1?_A:t<-1?-_A:Math.asin(t)}function wA(t,e){var n,r=t*yA(e),i=30;do{e-=n=(e+yA(e)-r)/(1+mA(e))}while(gA(n)>1e-6&&--i>0);return e/2}var kA=function(t,e,n){function r(r,i){return[t*r*mA(i=wA(n,i)),e*yA(i)]}return r.invert=function(r,i){return i=bA(i/e),[r/(t*mA(i)),bA((2*i+yA(2*i))/n)]},r}(xA/_A,xA,vA);const AA=Sk(),MA=["clipAngle","clipExtent","scale","translate","center","rotate","parallels","precision","reflectX","reflectY","coefficient","distance","fraction","lobes","parallel","radius","ratio","spacing","tilt"];function EA(t,e){return function n(){const r=e();return r.type=t,r.path=Sk().projection(r),r.copy=r.copy||function(){const t=n();return MA.forEach((e=>{r[e]&&t[e](r[e]())})),t.path.pointRadius(r.path.pointRadius()),t},r}}function DA(t,e){if(!t||"string"!=typeof t)throw new Error("Projection type must be a name string.");return t=t.toLowerCase(),arguments.length>1?(FA[t]=EA(t,e),this):FA[t]||null}function CA(t){return t&&t.path||AA}const FA={albers:Vk,albersusa:function(){var t,e,n,r,i,o,a=Vk(),u=Yk().rotate([154,0]).center([-2,58.5]).parallels([55,65]),s=Yk().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(t,e){o=[t,e]}};function c(t){var e=t[0],a=t[1];return o=null,n.point(e,a),o||(r.point(e,a),o)||(i.point(e,a),o)}function f(){return t=e=null,c}return c.invert=function(t){var e=a.scale(),n=a.translate(),r=(t[0]-n[0])/e,i=(t[1]-n[1])/e;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?u:i>=.166&&i<.234&&r>=-.214&&r<-.115?s:a).invert(t)},c.stream=function(n){return t&&e===n?t:(r=[a.stream(e=n),u.stream(n),s.stream(n)],i=r.length,t={point:function(t,e){for(var n=-1;++n<i;)r[n].point(t,e)},sphere:function(){for(var t=-1;++t<i;)r[t].sphere()},lineStart:function(){for(var t=-1;++t<i;)r[t].lineStart()},lineEnd:function(){for(var t=-1;++t<i;)r[t].lineEnd()},polygonStart:function(){for(var t=-1;++t<i;)r[t].polygonStart()},polygonEnd:function(){for(var t=-1;++t<i;)r[t].polygonEnd()}});var r,i},c.precision=function(t){return arguments.length?(a.precision(t),u.precision(t),s.precision(t),f()):a.precision()},c.scale=function(t){return arguments.length?(a.scale(t),u.scale(.35*t),s.scale(t),c.translate(a.translate())):a.scale()},c.translate=function(t){if(!arguments.length)return a.translate();var e=a.scale(),o=+t[0],c=+t[1];return n=a.translate(t).clipExtent([[o-.455*e,c-.238*e],[o+.455*e,c+.238*e]]).stream(l),r=u.translate([o-.307*e,c+.201*e]).clipExtent([[o-.425*e+_x,c+.12*e+_x],[o-.214*e-_x,c+.234*e-_x]]).stream(l),i=s.translate([o-.205*e,c+.212*e]).clipExtent([[o-.214*e+_x,c+.166*e+_x],[o-.115*e-_x,c+.234*e-_x]]).stream(l),f()},c.fitExtent=function(t,e){return Nk(c,t,e)},c.fitSize=function(t,e){return Ok(c,t,e)},c.fitWidth=function(t,e){return Rk(c,t,e)},c.fitHeight=function(t,e){return $k(c,t,e)},c.scale(1070)},azimuthalequalarea:function(){return jk(Jk).scale(124.75).clipAngle(179.999)},azimuthalequidistant:function(){return jk(Zk).scale(79.4188).clipAngle(179.999)},conicconformal:function(){return Wk(eA).scale(109.5).parallels([30,30])},conicequalarea:Yk,conicequidistant:function(){return Wk(rA).scale(131.154).center([0,13.9389])},equalEarth:function(){return jk(lA).scale(177.158)},equirectangular:function(){return jk(nA).scale(152.63)},gnomonic:function(){return jk(cA).scale(144.049).clipAngle(60)},identity:function(){var t,e,n,r,i,o,a,u=1,s=0,l=0,c=1,f=1,h=0,d=null,p=1,g=1,m=Bk({point:function(t,e){var n=_([t,e]);this.stream.point(n[0],n[1])}}),y=Rw;function v(){return p=u*c,g=u*f,o=a=null,_}function _(n){var r=n[0]*p,i=n[1]*g;if(h){var o=i*t-r*e;r=r*t+i*e,i=o}return[r+s,i+l]}return _.invert=function(n){var r=n[0]-s,i=n[1]-l;if(h){var o=i*t+r*e;r=r*t-i*e,i=o}return[r/p,i/g]},_.stream=function(t){return o&&a===t?o:o=m(y(a=t))},_.postclip=function(t){return arguments.length?(y=t,d=n=r=i=null,v()):y},_.clipExtent=function(t){return arguments.length?(y=null==t?(d=n=r=i=null,Rw):Fw(d=+t[0][0],n=+t[0][1],r=+t[1][0],i=+t[1][1]),v()):null==d?null:[[d,n],[r,i]]},_.scale=function(t){return arguments.length?(u=+t,v()):u},_.translate=function(t){return arguments.length?(s=+t[0],l=+t[1],v()):[s,l]},_.angle=function(n){return arguments.length?(e=Rx(h=n%360*Ex),t=Sx(h),v()):h*Mx},_.reflectX=function(t){return arguments.length?(c=t?-1:1,v()):c<0},_.reflectY=function(t){return arguments.length?(f=t?-1:1,v()):f<0},_.fitExtent=function(t,e){return Nk(_,t,e)},_.fitSize=function(t,e){return Ok(_,t,e)},_.fitWidth=function(t,e){return Rk(_,t,e)},_.fitHeight=function(t,e){return $k(_,t,e)},_},mercator:function(){return Kk(Qk).scale(961/Ax)},mollweide:function(){return jk(kA).scale(169.529)},naturalEarth1:function(){return jk(fA).scale(175.295)},orthographic:function(){return jk(hA).scale(249.5).clipAngle(90.000001)},stereographic:function(){return jk(dA).scale(250).clipAngle(142)},transversemercator:function(){var t=Kk(pA),e=t.center,n=t.rotate;return t.center=function(t){return arguments.length?e([-t[1],t[0]]):[(t=e())[1],-t[0]]},t.rotate=function(t){return arguments.length?n([t[0],t[1],t.length>2?t[2]+90:90]):[(t=n())[0],t[1],t[2]-90]},n([0,0,90]).scale(159.155)}};for(const t in FA)DA(t,FA[t]);function SA(){}const BA=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function TA(){var t=1,e=1,n=a;function r(t,e){return e.map((e=>i(t,e)))}function i(r,i){var a=[],u=[];return function(n,r,i){var a,u,s,l,c,f,h=new Array,d=new Array;a=u=-1,l=n[0]>=r,BA[l<<1].forEach(p);for(;++a<t-1;)s=l,l=n[a+1]>=r,BA[s|l<<1].forEach(p);BA[l<<0].forEach(p);for(;++u<e-1;){for(a=-1,l=n[u*t+t]>=r,c=n[u*t]>=r,BA[l<<1|c<<2].forEach(p);++a<t-1;)s=l,l=n[u*t+t+a+1]>=r,f=c,c=n[u*t+a+1]>=r,BA[s|l<<1|c<<2|f<<3].forEach(p);BA[l|c<<3].forEach(p)}a=-1,c=n[u*t]>=r,BA[c<<2].forEach(p);for(;++a<t-1;)f=c,c=n[u*t+a+1]>=r,BA[c<<2|f<<3].forEach(p);function p(t){var e,n,r=[t[0][0]+a,t[0][1]+u],s=[t[1][0]+a,t[1][1]+u],l=o(r),c=o(s);(e=d[l])?(n=h[c])?(delete d[e.end],delete h[n.start],e===n?(e.ring.push(s),i(e.ring)):h[e.start]=d[n.end]={start:e.start,end:n.end,ring:e.ring.concat(n.ring)}):(delete d[e.end],e.ring.push(s),d[e.end=c]=e):(e=h[c])?(n=d[l])?(delete h[e.start],delete d[n.end],e===n?(e.ring.push(s),i(e.ring)):h[n.start]=d[e.end]={start:n.start,end:e.end,ring:n.ring.concat(e.ring)}):(delete h[e.start],e.ring.unshift(r),h[e.start=l]=e):h[l]=d[c]={start:l,end:c,ring:[r,s]}}BA[c<<3].forEach(p)}(r,i,(t=>{n(t,r,i),function(t){var e=0,n=t.length,r=t[n-1][1]*t[0][0]-t[n-1][0]*t[0][1];for(;++e<n;)r+=t[e-1][1]*t[e][0]-t[e-1][0]*t[e][1];return r}(t)>0?a.push([t]):u.push(t)})),u.forEach((t=>{for(var e,n=0,r=a.length;n<r;++n)if(-1!==zA((e=a[n])[0],t))return void e.push(t)})),{type:"MultiPolygon",value:i,coordinates:a}}function o(e){return 2*e[0]+e[1]*(t+1)*4}function a(n,r,i){n.forEach((n=>{var o,a=n[0],u=n[1],s=0|a,l=0|u,c=r[l*t+s];a>0&&a<t&&s===a&&(o=r[l*t+s-1],n[0]=a+(i-o)/(c-o)-.5),u>0&&u<e&&l===u&&(o=r[(l-1)*t+s],n[1]=u+(i-o)/(c-o)-.5)}))}return r.contour=i,r.size=function(n){if(!arguments.length)return[t,e];var i=Math.floor(n[0]),o=Math.floor(n[1]);return i>=0&&o>=0||s("invalid size"),t=i,e=o,r},r.smooth=function(t){return arguments.length?(n=t?a:SA,r):n===a},r}function zA(t,e){for(var n,r=-1,i=e.length;++r<i;)if(n=NA(t,e[r]))return n;return 0}function NA(t,e){for(var n=e[0],r=e[1],i=-1,o=0,a=t.length,u=a-1;o<a;u=o++){var s=t[o],l=s[0],c=s[1],f=t[u],h=f[0],d=f[1];if(OA(s,f,e))return 0;c>r!=d>r&&n<(h-l)*(r-c)/(d-c)+l&&(i=-i)}return i}function OA(t,e,n){var r,i,o,a;return function(t,e,n){return(e[0]-t[0])*(n[1]-t[1])==(n[0]-t[0])*(e[1]-t[1])}(t,e,n)&&(i=t[r=+(t[0]===e[0])],o=n[r],a=e[r],i<=o&&o<=a||a<=o&&o<=i)}function RA(t,e,n){return function(r){var i=et(r),o=n?Math.min(i[0],0):i[0],a=i[1],u=a-o,s=e?ie(o,a,t):u/(t+1);return de(o+s,a,s)}}function $A(t){ga.call(this,null,t)}function qA(t,e,n,r,i){const o=t.x1||0,a=t.y1||0,u=e*n<0;function s(t){t.forEach(l)}function l(t){u&&t.reverse(),t.forEach(c)}function c(t){t[0]=(t[0]-o)*e+r,t[1]=(t[1]-a)*n+i}return function(t){return t.coordinates.forEach(s),t}}function LA(t,e,n){const r=t>=0?t:wa(e,n);return Math.round((Math.sqrt(4*r*r+1)-1)/2)}function UA(t){return Y(t)?t:Q(+t)}function PA(){var t=t=>t[0],e=t=>t[1],n=p,r=[-1,-1],i=960,o=500,a=2;function u(u,s){const l=LA(r[0],u,t)>>a,c=LA(r[1],u,e)>>a,f=l?l+2:0,h=c?c+2:0,d=2*f+(i>>a),p=2*h+(o>>a),g=new Float32Array(d*p),m=new Float32Array(d*p);let y=g;u.forEach((r=>{const i=f+(+t(r)>>a),o=h+(+e(r)>>a);i>=0&&i<d&&o>=0&&o<p&&(g[i+o*d]+=+n(r))})),l>0&&c>0?(jA(d,p,g,m,l),IA(d,p,m,g,c),jA(d,p,g,m,l),IA(d,p,m,g,c),jA(d,p,g,m,l),IA(d,p,m,g,c)):l>0?(jA(d,p,g,m,l),jA(d,p,m,g,l),jA(d,p,g,m,l),y=m):c>0&&(IA(d,p,g,m,c),IA(d,p,m,g,c),IA(d,p,g,m,c),y=m);const v=s?Math.pow(2,-2*a):1/pe(y);for(let t=0,e=d*p;t<e;++t)y[t]*=v;return{values:y,scale:1<<a,width:d,height:p,x1:f,y1:h,x2:f+(i>>a),y2:h+(o>>a)}}return u.x=function(e){return arguments.length?(t=UA(e),u):t},u.y=function(t){return arguments.length?(e=UA(t),u):e},u.weight=function(t){return arguments.length?(n=UA(t),u):n},u.size=function(t){if(!arguments.length)return[i,o];var e=+t[0],n=+t[1];return e>=0&&n>=0||s("invalid size"),i=e,o=n,u},u.cellSize=function(t){return arguments.length?((t=+t)>=1||s("invalid cell size"),a=Math.floor(Math.log(t)/Math.LN2),u):1<<a},u.bandwidth=function(t){return arguments.length?(1===(t=W(t)).length&&(t=[+t[0],+t[0]]),2!==t.length&&s("invalid bandwidth"),r=t,u):r},u}function jA(t,e,n,r,i){const o=1+(i<<1);for(let a=0;a<e;++a)for(let e=0,u=0;e<t+i;++e)e<t&&(u+=n[e+a*t]),e>=i&&(e>=o&&(u-=n[e-o+a*t]),r[e-i+a*t]=u/Math.min(e+1,t-1+o-e,o))}function IA(t,e,n,r,i){const o=1+(i<<1);for(let a=0;a<t;++a)for(let u=0,s=0;u<e+i;++u)u<e&&(s+=n[a+u*t]),u>=i&&(u>=o&&(s-=n[a+(u-o)*t]),r[a+(u-i)*t]=s/Math.min(u+1,e-1+o-u,o))}function WA(t){ga.call(this,null,t)}$A.Definition={type:"Isocontour",metadata:{generates:!0},params:[{name:"field",type:"field"},{name:"thresholds",type:"number",array:!0},{name:"levels",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"zero",type:"boolean",default:!0},{name:"smooth",type:"boolean",default:!0},{name:"scale",type:"number",expr:!0},{name:"translate",type:"number",array:!0,expr:!0},{name:"as",type:"string",null:!0,default:"contour"}]},st($A,ga,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var n=e.fork(e.NO_SOURCE|e.NO_FIELDS),r=e.materialize(e.SOURCE).source,i=t.field||h,o=TA().smooth(!1!==t.smooth),a=t.thresholds||function(t,e,n){const r=RA(n.levels||10,n.nice,!1!==n.zero);return"shared"!==n.resolve?r:r(t.map((t=>oe(e(t).values))))}(r,i,t),u=null===t.as?null:t.as||"contour",s=[];return r.forEach((e=>{const n=i(e),r=o.size([n.width,n.height])(n.values,_(a)?a:a(n.values));!function(t,e,n,r){let i=r.scale||e.scale,o=r.translate||e.translate;Y(i)&&(i=i(n,r));Y(o)&&(o=o(n,r));if((1===i||null==i)&&!o)return;const a=(dt(i)?i:i[0])||1,u=(dt(i)?i:i[1])||1,s=o&&o[0]||0,l=o&&o[1]||0;t.forEach(qA(e,a,u,s,l))}(r,n,e,t),r.forEach((t=>{s.push(Uo(e,qo(null!=u?{[u]:t}:t)))}))})),this.value&&(n.rem=this.value),this.value=n.source=n.add=s,n}}),WA.Definition={type:"KDE2D",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"weight",type:"field"},{name:"groupby",type:"field",array:!0},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number",array:!0,length:2},{name:"counts",type:"boolean",default:!1},{name:"as",type:"string",default:"grid"}]};const HA=["x","y","weight","size","cellSize","bandwidth"];function YA(t,e){return HA.forEach((n=>null!=e[n]?t[n](e[n]):0)),t}function VA(t){ga.call(this,null,t)}st(WA,ga,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var n,i=e.fork(e.NO_SOURCE|e.NO_FIELDS),o=function(t,e){var n,r,i,o,a,u,s=[],l=t=>t(o);if(null==e)s.push(t);else for(n={},r=0,i=t.length;r<i;++r)o=t[r],(u=n[a=e.map(l)])||(n[a]=u=[],u.dims=a,s.push(u)),u.push(o);return s}(e.materialize(e.SOURCE).source,t.groupby),a=(t.groupby||[]).map(r),u=YA(PA(),t),s=t.as||"grid";return n=o.map((e=>qo(function(t,e){for(let n=0;n<a.length;++n)t[a[n]]=e[n];return t}({[s]:u(e,t.counts)},e.dims)))),this.value&&(i.rem=this.value),this.value=i.source=i.add=n,i}}),VA.Definition={type:"Contour",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"values",type:"number",array:!0},{name:"x",type:"field"},{name:"y",type:"field"},{name:"weight",type:"field"},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number"},{name:"count",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"thresholds",type:"number",array:!0},{name:"smooth",type:"boolean",default:!0}]},st(VA,ga,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var n,r,i=e.fork(e.NO_SOURCE|e.NO_FIELDS),o=TA().smooth(!1!==t.smooth),a=t.values,u=t.thresholds||RA(t.count||10,t.nice,!!a),s=t.size;return a||(a=e.materialize(e.SOURCE).source,r=qA(n=YA(PA(),t)(a,!0),n.scale||1,n.scale||1,0,0),s=[n.width,n.height],a=n.values),u=_(u)?u:u(a),a=o.size(s)(a,u),r&&a.forEach(r),this.value&&(i.rem=this.value),this.value=i.source=i.add=(a||[]).map(qo),i}});const GA="Feature",XA="FeatureCollection";function JA(t){ga.call(this,null,t)}function ZA(t){ga.call(this,null,t)}function QA(t){ga.call(this,null,t)}function KA(t){ga.call(this,null,t)}function tM(t){ga.call(this,[],t),this.generator=function(){var t,e,n,r,i,o,a,u,s,l,c,f,h=10,d=h,p=90,g=360,m=2.5;function y(){return{type:"MultiLineString",coordinates:v()}}function v(){return de(Bx(r/p)*p,n,p).map(c).concat(de(Bx(u/g)*g,a,g).map(f)).concat(de(Bx(e/h)*h,t,h).filter((function(t){return Dx(t%p)>_x})).map(s)).concat(de(Bx(o/d)*d,i,d).filter((function(t){return Dx(t%g)>_x})).map(l))}return y.lines=function(){return v().map((function(t){return{type:"LineString",coordinates:t}}))},y.outline=function(){return{type:"Polygon",coordinates:[c(r).concat(f(a).slice(1),c(n).reverse().slice(1),f(u).reverse().slice(1))]}},y.extent=function(t){return arguments.length?y.extentMajor(t).extentMinor(t):y.extentMinor()},y.extentMajor=function(t){return arguments.length?(r=+t[0][0],n=+t[1][0],u=+t[0][1],a=+t[1][1],r>n&&(t=r,r=n,n=t),u>a&&(t=u,u=a,a=t),y.precision(m)):[[r,u],[n,a]]},y.extentMinor=function(n){return arguments.length?(e=+n[0][0],t=+n[1][0],o=+n[0][1],i=+n[1][1],e>t&&(n=e,e=t,t=n),o>i&&(n=o,o=i,i=n),y.precision(m)):[[e,o],[t,i]]},y.step=function(t){return arguments.length?y.stepMajor(t).stepMinor(t):y.stepMinor()},y.stepMajor=function(t){return arguments.length?(p=+t[0],g=+t[1],y):[p,g]},y.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],y):[h,d]},y.precision=function(h){return arguments.length?(m=+h,s=Sw(o,i,90),l=Bw(e,t,m),c=Sw(u,a,90),f=Bw(r,n,m),y):m},y.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])}()}function eM(t){ga.call(this,null,t)}function nM(t){if(!Y(t))return!1;const e=Ct(i(t));return e.$x||e.$y||e.$value||e.$max}function rM(t){ga.call(this,null,t),this.modified(!0)}function iM(t,e,n){Y(t[e])&&t[e](n)}JA.Definition={type:"GeoJSON",metadata:{},params:[{name:"fields",type:"field",array:!0,length:2},{name:"geojson",type:"field"}]},st(JA,ga,{transform(t,e){var n,r=this._features,o=this._points,a=t.fields,u=a&&a[0],s=a&&a[1],l=t.geojson||!a&&h,c=e.ADD;n=t.modified()||e.changed(e.REM)||e.modified(i(l))||u&&e.modified(i(u))||s&&e.modified(i(s)),this.value&&!n||(c=e.SOURCE,this._features=r=[],this._points=o=[]),l&&e.visit(c,(t=>r.push(l(t)))),u&&s&&(e.visit(c,(t=>{var e=u(t),n=s(t);null!=e&&null!=n&&(e=+e)===e&&(n=+n)===n&&o.push([e,n])})),r=r.concat({type:GA,geometry:{type:"MultiPoint",coordinates:o}})),this.value={type:XA,features:r}}}),ZA.Definition={type:"GeoPath",metadata:{modifies:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"path"}]},st(ZA,ga,{transform(t,e){var n=e.fork(e.ALL),r=this.value,i=t.field||h,o=t.as||"path",a=n.SOURCE;!r||t.modified()?(this.value=r=CA(t.projection),n.materialize().reflow()):a=i===h||e.modified(i.fields)?n.ADD_MOD:n.ADD;const u=function(t,e){const n=t.pointRadius();t.context(null),null!=e&&t.pointRadius(e);return n}(r,t.pointRadius);return n.visit(a,(t=>t[o]=r(i(t)))),r.pointRadius(u),n.modifies(o)}}),QA.Definition={type:"GeoPoint",metadata:{modifies:!0},params:[{name:"projection",type:"projection",required:!0},{name:"fields",type:"field",array:!0,required:!0,length:2},{name:"as",type:"string",array:!0,length:2,default:["x","y"]}]},st(QA,ga,{transform(t,e){var n,r=t.projection,i=t.fields[0],o=t.fields[1],a=t.as||["x","y"],u=a[0],s=a[1];function l(t){const e=r([i(t),o(t)]);e?(t[u]=e[0],t[s]=e[1]):(t[u]=void 0,t[s]=void 0)}return t.modified()?e=e.materialize().reflow(!0).visit(e.SOURCE,l):(n=e.modified(i.fields)||e.modified(o.fields),e.visit(n?e.ADD_MOD:e.ADD,l)),e.modifies(a)}}),KA.Definition={type:"GeoShape",metadata:{modifies:!0,nomod:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field",default:"datum"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"shape"}]},st(KA,ga,{transform(t,e){var n=e.fork(e.ALL),r=this.value,i=t.as||"shape",o=n.ADD;return r&&!t.modified()||(this.value=r=function(t,e,n){const r=null==n?n=>t(e(n)):r=>{var i=t.pointRadius(),o=t.pointRadius(n)(e(r));return t.pointRadius(i),o};return r.context=e=>(t.context(e),r),r}(CA(t.projection),t.field||c("datum"),t.pointRadius),n.materialize().reflow(),o=n.SOURCE),n.visit(o,(t=>t[i]=r)),n.modifies(i)}}),tM.Definition={type:"Graticule",metadata:{changes:!0,generates:!0},params:[{name:"extent",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMajor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMinor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"step",type:"number",array:!0,length:2},{name:"stepMajor",type:"number",array:!0,length:2,default:[90,360]},{name:"stepMinor",type:"number",array:!0,length:2,default:[10,10]},{name:"precision",type:"number",default:2.5}]},st(tM,ga,{transform(t,e){var n,r=this.value,i=this.generator;if(!r.length||t.modified())for(const e in t)Y(i[e])&&i[e](t[e]);return n=i(),r.length?e.mod.push(Po(r[0],n)):e.add.push(qo(n)),r[0]=n,e}}),eM.Definition={type:"heatmap",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"color",type:"string",expr:!0},{name:"opacity",type:"number",expr:!0},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"as",type:"string",default:"image"}]},st(eM,ga,{transform(t,e){if(!e.changed()&&!t.modified())return e.StopPropagation;var n=e.materialize(e.SOURCE).source,r="shared"===t.resolve,i=t.field||h,o=function(t,e){let n;Y(t)?(n=n=>t(n,e),n.dep=nM(t)):t?n=Q(t):(n=t=>t.$value/t.$max||0,n.dep=!0);return n}(t.opacity,t),a=function(t,e){let n;Y(t)?(n=n=>kc(t(n,e)),n.dep=nM(t)):n=Q(kc(t||"#888"));return n}(t.color,t),u=t.as||"image",s={$x:0,$y:0,$value:0,$max:r?oe(n.map((t=>oe(i(t).values)))):0};return n.forEach((t=>{const e=i(t),n=tt({},t,s);r||(n.$max=oe(e.values||[])),t[u]=function(t,e,n,r){const i=t.width,o=t.height,a=t.x1||0,u=t.y1||0,s=t.x2||i,l=t.y2||o,c=t.values,f=c?t=>c[t]:d,h=Xl(s-a,l-u),p=h.getContext("2d"),g=p.getImageData(0,0,s-a,l-u),m=g.data;for(let t=u,o=0;t<l;++t){e.$y=t-u;for(let u=a,l=t*i;u<s;++u,o+=4){e.$x=u-a,e.$value=f(u+l);const t=n(e);m[o+0]=t.r,m[o+1]=t.g,m[o+2]=t.b,m[o+3]=~~(255*r(e))}}return p.putImageData(g,0,0),h}(e,n,a.dep?a:Q(a(n)),o.dep?o:Q(o(n)))})),e.reflow(!0).modifies(u)}}),st(rM,ga,{transform(t,e){let n=this.value;return!n||t.modified("type")?(this.value=n=function(t){const e=DA((t||"mercator").toLowerCase());e||s("Unrecognized projection type: "+t);return e()}(t.type),MA.forEach((e=>{null!=t[e]&&iM(n,e,t[e])}))):MA.forEach((e=>{t.modified(e)&&iM(n,e,t[e])})),null!=t.pointRadius&&n.path.pointRadius(t.pointRadius),t.fit&&function(t,e){const n=function(t){return 1===(t=W(t)).length?t[0]:{type:XA,features:t.reduce(((t,e)=>t.concat(function(t){return t.type===XA?t.features:W(t).filter((t=>null!=t)).map((t=>t.type===GA?t:{type:GA,geometry:t}))}(e))),[])}}(e.fit);e.extent?t.fitExtent(e.extent,n):e.size&&t.fitSize(e.size,n)}(n,t),e.fork(e.NO_SOURCE|e.NO_FIELDS)}});var oM=Object.freeze({__proto__:null,contour:VA,geojson:JA,geopath:ZA,geopoint:QA,geoshape:KA,graticule:tM,heatmap:eM,isocontour:$A,kde2d:WA,projection:rM});function aM(t,e,n,r){if(isNaN(e)||isNaN(n))return t;var i,o,a,u,s,l,c,f,h,d=t._root,p={data:r},g=t._x0,m=t._y0,y=t._x1,v=t._y1;if(!d)return t._root=p,t;for(;d.length;)if((l=e>=(o=(g+y)/2))?g=o:y=o,(c=n>=(a=(m+v)/2))?m=a:v=a,i=d,!(d=d[f=c<<1|l]))return i[f]=p,t;if(u=+t._x.call(null,d.data),s=+t._y.call(null,d.data),e===u&&n===s)return p.next=d,i?i[f]=p:t._root=p,t;do{i=i?i[f]=new Array(4):t._root=new Array(4),(l=e>=(o=(g+y)/2))?g=o:y=o,(c=n>=(a=(m+v)/2))?m=a:v=a}while((f=c<<1|l)==(h=(s>=a)<<1|u>=o));return i[h]=d,i[f]=p,t}function uM(t,e,n,r,i){this.node=t,this.x0=e,this.y0=n,this.x1=r,this.y1=i}function sM(t){return t[0]}function lM(t){return t[1]}function cM(t,e,n){var r=new fM(null==e?sM:e,null==n?lM:n,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function fM(t,e,n,r,i,o){this._x=t,this._y=e,this._x0=n,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function hM(t){for(var e={data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}var dM=cM.prototype=fM.prototype;function pM(t){return function(){return t}}function gM(t){return 1e-6*(t()-.5)}function mM(t){return t.x+t.vx}function yM(t){return t.y+t.vy}function vM(t){return t.index}function _M(t,e){var n=t.get(e);if(!n)throw new Error("node not found: "+e);return n}dM.copy=function(){var t,e,n=new fM(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return n;if(!r.length)return n._root=hM(r),n;for(t=[{source:r,target:n._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(e=r.source[i])&&(e.length?t.push({source:e,target:r.target[i]=new Array(4)}):r.target[i]=hM(e));return n},dM.add=function(t){const e=+this._x.call(null,t),n=+this._y.call(null,t);return aM(this.cover(e,n),e,n,t)},dM.addAll=function(t){var e,n,r,i,o=t.length,a=new Array(o),u=new Array(o),s=1/0,l=1/0,c=-1/0,f=-1/0;for(n=0;n<o;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(i=+this._y.call(null,e))||(a[n]=r,u[n]=i,r<s&&(s=r),r>c&&(c=r),i<l&&(l=i),i>f&&(f=i));if(s>c||l>f)return this;for(this.cover(s,l).cover(c,f),n=0;n<o;++n)aM(this,a[n],u[n],t[n]);return this},dM.cover=function(t,e){if(isNaN(t=+t)||isNaN(e=+e))return this;var n=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(n))i=(n=Math.floor(t))+1,o=(r=Math.floor(e))+1;else{for(var a,u,s=i-n||1,l=this._root;n>t||t>=i||r>e||e>=o;)switch(u=(e<r)<<1|t<n,(a=new Array(4))[u]=l,l=a,s*=2,u){case 0:i=n+s,o=r+s;break;case 1:n=i-s,o=r+s;break;case 2:i=n+s,r=o-s;break;case 3:n=i-s,r=o-s}this._root&&this._root.length&&(this._root=l)}return this._x0=n,this._y0=r,this._x1=i,this._y1=o,this},dM.data=function(){var t=[];return this.visit((function(e){if(!e.length)do{t.push(e.data)}while(e=e.next)})),t},dM.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},dM.find=function(t,e,n){var r,i,o,a,u,s,l,c=this._x0,f=this._y0,h=this._x1,d=this._y1,p=[],g=this._root;for(g&&p.push(new uM(g,c,f,h,d)),null==n?n=1/0:(c=t-n,f=e-n,h=t+n,d=e+n,n*=n);s=p.pop();)if(!(!(g=s.node)||(i=s.x0)>h||(o=s.y0)>d||(a=s.x1)<c||(u=s.y1)<f))if(g.length){var m=(i+a)/2,y=(o+u)/2;p.push(new uM(g[3],m,y,a,u),new uM(g[2],i,y,m,u),new uM(g[1],m,o,a,y),new uM(g[0],i,o,m,y)),(l=(e>=y)<<1|t>=m)&&(s=p[p.length-1],p[p.length-1]=p[p.length-1-l],p[p.length-1-l]=s)}else{var v=t-+this._x.call(null,g.data),_=e-+this._y.call(null,g.data),x=v*v+_*_;if(x<n){var b=Math.sqrt(n=x);c=t-b,f=e-b,h=t+b,d=e+b,r=g.data}}return r},dM.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var e,n,r,i,o,a,u,s,l,c,f,h,d=this._root,p=this._x0,g=this._y0,m=this._x1,y=this._y1;if(!d)return this;if(d.length)for(;;){if((l=o>=(u=(p+m)/2))?p=u:m=u,(c=a>=(s=(g+y)/2))?g=s:y=s,e=d,!(d=d[f=c<<1|l]))return this;if(!d.length)break;(e[f+1&3]||e[f+2&3]||e[f+3&3])&&(n=e,h=f)}for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,r?(i?r.next=i:delete r.next,this):e?(i?e[f]=i:delete e[f],(d=e[0]||e[1]||e[2]||e[3])&&d===(e[3]||e[2]||e[1]||e[0])&&!d.length&&(n?n[h]=d:this._root=d),this):(this._root=i,this)},dM.removeAll=function(t){for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this},dM.root=function(){return this._root},dM.size=function(){var t=0;return this.visit((function(e){if(!e.length)do{++t}while(e=e.next)})),t},dM.visit=function(t){var e,n,r,i,o,a,u=[],s=this._root;for(s&&u.push(new uM(s,this._x0,this._y0,this._x1,this._y1));e=u.pop();)if(!t(s=e.node,r=e.x0,i=e.y0,o=e.x1,a=e.y1)&&s.length){var l=(r+o)/2,c=(i+a)/2;(n=s[3])&&u.push(new uM(n,l,c,o,a)),(n=s[2])&&u.push(new uM(n,r,c,l,a)),(n=s[1])&&u.push(new uM(n,l,i,o,c)),(n=s[0])&&u.push(new uM(n,r,i,l,c))}return this},dM.visitAfter=function(t){var e,n=[],r=[];for(this._root&&n.push(new uM(this._root,this._x0,this._y0,this._x1,this._y1));e=n.pop();){var i=e.node;if(i.length){var o,a=e.x0,u=e.y0,s=e.x1,l=e.y1,c=(a+s)/2,f=(u+l)/2;(o=i[0])&&n.push(new uM(o,a,u,c,f)),(o=i[1])&&n.push(new uM(o,c,u,s,f)),(o=i[2])&&n.push(new uM(o,a,f,c,l)),(o=i[3])&&n.push(new uM(o,c,f,s,l))}r.push(e)}for(;e=r.pop();)t(e.node,e.x0,e.y0,e.x1,e.y1);return this},dM.x=function(t){return arguments.length?(this._x=t,this):this._x},dM.y=function(t){return arguments.length?(this._y=t,this):this._y};var xM={value:()=>{}};function bM(){for(var t,e=0,n=arguments.length,r={};e<n;++e){if(!(t=arguments[e]+"")||t in r||/[\s.]/.test(t))throw new Error("illegal type: "+t);r[t]=[]}return new wM(r)}function wM(t){this._=t}function kM(t,e){return t.trim().split(/^|\s+/).map((function(t){var n="",r=t.indexOf(".");if(r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:n}}))}function AM(t,e){for(var n,r=0,i=t.length;r<i;++r)if((n=t[r]).name===e)return n.value}function MM(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){t[r]=xM,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=n&&t.push({name:e,value:n}),t}wM.prototype=bM.prototype={constructor:wM,on:function(t,e){var n,r=this._,i=kM(t+"",r),o=-1,a=i.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++o<a;)if(n=(t=i[o]).type)r[n]=MM(r[n],t.name,e);else if(null==e)for(n in r)r[n]=MM(r[n],t.name,null);return this}for(;++o<a;)if((n=(t=i[o]).type)&&(n=AM(r[n],t.name)))return n},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new wM(t)},call:function(t,e){if((n=arguments.length-2)>0)for(var n,r,i=new Array(n),o=0;o<n;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,n=(r=this._[t]).length;o<n;++o)r[o].value.apply(e,i)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(e,n)}};var EM,DM,CM=0,FM=0,SM=0,BM=0,TM=0,zM=0,NM="object"==typeof performance&&performance.now?performance:Date,OM="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function RM(){return TM||(OM($M),TM=NM.now()+zM)}function $M(){TM=0}function qM(){this._call=this._time=this._next=null}function LM(t,e,n){var r=new qM;return r.restart(t,e,n),r}function UM(){TM=(BM=NM.now())+zM,CM=FM=0;try{!function(){RM(),++CM;for(var t,e=EM;e;)(t=TM-e._time)>=0&&e._call.call(null,t),e=e._next;--CM}()}finally{CM=0,function(){var t,e,n=EM,r=1/0;for(;n;)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:EM=e);DM=t,jM(r)}(),TM=0}}function PM(){var t=NM.now(),e=t-BM;e>1e3&&(zM-=e,BM=t)}function jM(t){CM||(FM&&(FM=clearTimeout(FM)),t-TM>24?(t<1/0&&(FM=setTimeout(UM,t-NM.now()-zM)),SM&&(SM=clearInterval(SM))):(SM||(BM=NM.now(),SM=setInterval(PM,1e3)),CM=1,OM(UM)))}qM.prototype=LM.prototype={constructor:qM,restart:function(t,e,n){if("function"!=typeof t)throw new TypeError("callback is not a function");n=(null==n?RM():+n)+(null==e?0:+e),this._next||DM===this||(DM?DM._next=this:EM=this,DM=this),this._call=t,this._time=n,jM()},stop:function(){this._call&&(this._call=null,this._time=1/0,jM())}};const IM=4294967296;function WM(t){return t.x}function HM(t){return t.y}var YM=Math.PI*(3-Math.sqrt(5));function VM(t){var e,n=1,r=.001,i=1-Math.pow(r,1/300),o=0,a=.6,u=new Map,s=LM(f),l=bM("tick","end"),c=function(){let t=1;return()=>(t=(1664525*t+1013904223)%IM)/IM}();function f(){h(),l.call("tick",e),n<r&&(s.stop(),l.call("end",e))}function h(r){var s,l,c=t.length;void 0===r&&(r=1);for(var f=0;f<r;++f)for(n+=(o-n)*i,u.forEach((function(t){t(n)})),s=0;s<c;++s)null==(l=t[s]).fx?l.x+=l.vx*=a:(l.x=l.fx,l.vx=0),null==l.fy?l.y+=l.vy*=a:(l.y=l.fy,l.vy=0);return e}function d(){for(var e,n=0,r=t.length;n<r;++n){if((e=t[n]).index=n,null!=e.fx&&(e.x=e.fx),null!=e.fy&&(e.y=e.fy),isNaN(e.x)||isNaN(e.y)){var i=10*Math.sqrt(.5+n),o=n*YM;e.x=i*Math.cos(o),e.y=i*Math.sin(o)}(isNaN(e.vx)||isNaN(e.vy))&&(e.vx=e.vy=0)}}function p(e){return e.initialize&&e.initialize(t,c),e}return null==t&&(t=[]),d(),e={tick:h,restart:function(){return s.restart(f),e},stop:function(){return s.stop(),e},nodes:function(n){return arguments.length?(t=n,d(),u.forEach(p),e):t},alpha:function(t){return arguments.length?(n=+t,e):n},alphaMin:function(t){return arguments.length?(r=+t,e):r},alphaDecay:function(t){return arguments.length?(i=+t,e):+i},alphaTarget:function(t){return arguments.length?(o=+t,e):o},velocityDecay:function(t){return arguments.length?(a=1-t,e):1-a},randomSource:function(t){return arguments.length?(c=t,u.forEach(p),e):c},force:function(t,n){return arguments.length>1?(null==n?u.delete(t):u.set(t,p(n)),e):u.get(t)},find:function(e,n,r){var i,o,a,u,s,l=0,c=t.length;for(null==r?r=1/0:r*=r,l=0;l<c;++l)(a=(i=e-(u=t[l]).x)*i+(o=n-u.y)*o)<r&&(s=u,r=a);return s},on:function(t,n){return arguments.length>1?(l.on(t,n),e):l.on(t)}}}const GM={center:function(t,e){var n,r=1;function i(){var i,o,a=n.length,u=0,s=0;for(i=0;i<a;++i)u+=(o=n[i]).x,s+=o.y;for(u=(u/a-t)*r,s=(s/a-e)*r,i=0;i<a;++i)(o=n[i]).x-=u,o.y-=s}return null==t&&(t=0),null==e&&(e=0),i.initialize=function(t){n=t},i.x=function(e){return arguments.length?(t=+e,i):t},i.y=function(t){return arguments.length?(e=+t,i):e},i.strength=function(t){return arguments.length?(r=+t,i):r},i},collide:function(t){var e,n,r,i=1,o=1;function a(){for(var t,a,s,l,c,f,h,d=e.length,p=0;p<o;++p)for(a=cM(e,mM,yM).visitAfter(u),t=0;t<d;++t)s=e[t],f=n[s.index],h=f*f,l=s.x+s.vx,c=s.y+s.vy,a.visit(g);function g(t,e,n,o,a){var u=t.data,d=t.r,p=f+d;if(!u)return e>l+p||o<l-p||n>c+p||a<c-p;if(u.index>s.index){var g=l-u.x-u.vx,m=c-u.y-u.vy,y=g*g+m*m;y<p*p&&(0===g&&(y+=(g=gM(r))*g),0===m&&(y+=(m=gM(r))*m),y=(p-(y=Math.sqrt(y)))/y*i,s.vx+=(g*=y)*(p=(d*=d)/(h+d)),s.vy+=(m*=y)*p,u.vx-=g*(p=1-p),u.vy-=m*p)}}}function u(t){if(t.data)return t.r=n[t.data.index];for(var e=t.r=0;e<4;++e)t[e]&&t[e].r>t.r&&(t.r=t[e].r)}function s(){if(e){var r,i,o=e.length;for(n=new Array(o),r=0;r<o;++r)i=e[r],n[i.index]=+t(i,r,e)}}return"function"!=typeof t&&(t=pM(null==t?1:+t)),a.initialize=function(t,n){e=t,r=n,s()},a.iterations=function(t){return arguments.length?(o=+t,a):o},a.strength=function(t){return arguments.length?(i=+t,a):i},a.radius=function(e){return arguments.length?(t="function"==typeof e?e:pM(+e),s(),a):t},a},nbody:function(){var t,e,n,r,i,o=pM(-30),a=1,u=1/0,s=.81;function l(n){var i,o=t.length,a=cM(t,WM,HM).visitAfter(f);for(r=n,i=0;i<o;++i)e=t[i],a.visit(h)}function c(){if(t){var e,n,r=t.length;for(i=new Array(r),e=0;e<r;++e)n=t[e],i[n.index]=+o(n,e,t)}}function f(t){var e,n,r,o,a,u=0,s=0;if(t.length){for(r=o=a=0;a<4;++a)(e=t[a])&&(n=Math.abs(e.value))&&(u+=e.value,s+=n,r+=n*e.x,o+=n*e.y);t.x=r/s,t.y=o/s}else{(e=t).x=e.data.x,e.y=e.data.y;do{u+=i[e.data.index]}while(e=e.next)}t.value=u}function h(t,o,l,c){if(!t.value)return!0;var f=t.x-e.x,h=t.y-e.y,d=c-o,p=f*f+h*h;if(d*d/s<p)return p<u&&(0===f&&(p+=(f=gM(n))*f),0===h&&(p+=(h=gM(n))*h),p<a&&(p=Math.sqrt(a*p)),e.vx+=f*t.value*r/p,e.vy+=h*t.value*r/p),!0;if(!(t.length||p>=u)){(t.data!==e||t.next)&&(0===f&&(p+=(f=gM(n))*f),0===h&&(p+=(h=gM(n))*h),p<a&&(p=Math.sqrt(a*p)));do{t.data!==e&&(d=i[t.data.index]*r/p,e.vx+=f*d,e.vy+=h*d)}while(t=t.next)}}return l.initialize=function(e,r){t=e,n=r,c()},l.strength=function(t){return arguments.length?(o="function"==typeof t?t:pM(+t),c(),l):o},l.distanceMin=function(t){return arguments.length?(a=t*t,l):Math.sqrt(a)},l.distanceMax=function(t){return arguments.length?(u=t*t,l):Math.sqrt(u)},l.theta=function(t){return arguments.length?(s=t*t,l):Math.sqrt(s)},l},link:function(t){var e,n,r,i,o,a,u=vM,s=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},l=pM(30),c=1;function f(r){for(var i=0,u=t.length;i<c;++i)for(var s,l,f,h,d,p,g,m=0;m<u;++m)l=(s=t[m]).source,h=(f=s.target).x+f.vx-l.x-l.vx||gM(a),d=f.y+f.vy-l.y-l.vy||gM(a),h*=p=((p=Math.sqrt(h*h+d*d))-n[m])/p*r*e[m],d*=p,f.vx-=h*(g=o[m]),f.vy-=d*g,l.vx+=h*(g=1-g),l.vy+=d*g}function h(){if(r){var a,s,l=r.length,c=t.length,f=new Map(r.map(((t,e)=>[u(t,e,r),t])));for(a=0,i=new Array(l);a<c;++a)(s=t[a]).index=a,"object"!=typeof s.source&&(s.source=_M(f,s.source)),"object"!=typeof s.target&&(s.target=_M(f,s.target)),i[s.source.index]=(i[s.source.index]||0)+1,i[s.target.index]=(i[s.target.index]||0)+1;for(a=0,o=new Array(c);a<c;++a)s=t[a],o[a]=i[s.source.index]/(i[s.source.index]+i[s.target.index]);e=new Array(c),d(),n=new Array(c),p()}}function d(){if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+s(t[n],n,t)}function p(){if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+l(t[e],e,t)}return null==t&&(t=[]),f.initialize=function(t,e){r=t,a=e,h()},f.links=function(e){return arguments.length?(t=e,h(),f):t},f.id=function(t){return arguments.length?(u=t,f):u},f.iterations=function(t){return arguments.length?(c=+t,f):c},f.strength=function(t){return arguments.length?(s="function"==typeof t?t:pM(+t),d(),f):s},f.distance=function(t){return arguments.length?(l="function"==typeof t?t:pM(+t),p(),f):l},f},x:function(t){var e,n,r,i=pM(.1);function o(t){for(var i,o=0,a=e.length;o<a;++o)(i=e[o]).vx+=(r[o]-i.x)*n[o]*t}function a(){if(e){var o,a=e.length;for(n=new Array(a),r=new Array(a),o=0;o<a;++o)n[o]=isNaN(r[o]=+t(e[o],o,e))?0:+i(e[o],o,e)}}return"function"!=typeof t&&(t=pM(null==t?0:+t)),o.initialize=function(t){e=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:pM(+t),a(),o):i},o.x=function(e){return arguments.length?(t="function"==typeof e?e:pM(+e),a(),o):t},o},y:function(t){var e,n,r,i=pM(.1);function o(t){for(var i,o=0,a=e.length;o<a;++o)(i=e[o]).vy+=(r[o]-i.y)*n[o]*t}function a(){if(e){var o,a=e.length;for(n=new Array(a),r=new Array(a),o=0;o<a;++o)n[o]=isNaN(r[o]=+t(e[o],o,e))?0:+i(e[o],o,e)}}return"function"!=typeof t&&(t=pM(null==t?0:+t)),o.initialize=function(t){e=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:pM(+t),a(),o):i},o.y=function(e){return arguments.length?(t="function"==typeof e?e:pM(+e),a(),o):t},o}},XM="forces",JM=["alpha","alphaMin","alphaTarget","velocityDecay","forces"],ZM=["static","iterations"],QM=["x","y","vx","vy"];function KM(t){ga.call(this,null,t)}function tE(t,e,n,r){var i,o,a,u,s=W(e.forces);for(i=0,o=JM.length;i<o;++i)(a=JM[i])!==XM&&e.modified(a)&&t[a](e[a]);for(i=0,o=s.length;i<o;++i)u=XM+i,(a=n||e.modified(XM,i)?nE(s[i]):r&&eE(s[i],r)?t.force(u):null)&&t.force(u,a);for(o=t.numForces||0;i<o;++i)t.force(XM+i,null);return t.numForces=s.length,t}function eE(t,e){var n,r;for(n in t)if(Y(r=t[n])&&e.modified(i(r)))return 1;return 0}function nE(t){var e,n;for(n in it(GM,t.force)||s("Unrecognized force: "+t.force),e=GM[t.force](),t)Y(e[n])&&rE(e[n],t[n],t);return e}function rE(t,e,n){t(Y(e)?t=>e(t,n):e)}KM.Definition={type:"Force",metadata:{modifies:!0},params:[{name:"static",type:"boolean",default:!1},{name:"restart",type:"boolean",default:!1},{name:"iterations",type:"number",default:300},{name:"alpha",type:"number",default:1},{name:"alphaMin",type:"number",default:.001},{name:"alphaTarget",type:"number",default:0},{name:"velocityDecay",type:"number",default:.4},{name:"forces",type:"param",array:!0,params:[{key:{force:"center"},params:[{name:"x",type:"number",default:0},{name:"y",type:"number",default:0}]},{key:{force:"collide"},params:[{name:"radius",type:"number",expr:!0},{name:"strength",type:"number",default:.7},{name:"iterations",type:"number",default:1}]},{key:{force:"nbody"},params:[{name:"strength",type:"number",default:-30},{name:"theta",type:"number",default:.9},{name:"distanceMin",type:"number",default:1},{name:"distanceMax",type:"number"}]},{key:{force:"link"},params:[{name:"links",type:"data"},{name:"id",type:"field"},{name:"distance",type:"number",default:30,expr:!0},{name:"strength",type:"number",expr:!0},{name:"iterations",type:"number",default:1}]},{key:{force:"x"},params:[{name:"strength",type:"number",default:.1},{name:"x",type:"field"}]},{key:{force:"y"},params:[{name:"strength",type:"number",default:.1},{name:"y",type:"field"}]}]},{name:"as",type:"string",array:!0,modify:!1,default:QM}]},st(KM,ga,{transform(t,e){var n,r,i=this.value,o=e.changed(e.ADD_REM),a=t.modified(JM),u=t.iterations||300;if(i?(o&&(e.modifies("index"),i.nodes(e.source)),(a||e.changed(e.MOD))&&tE(i,t,0,e)):(this.value=i=function(t,e){const n=VM(t),r=n.stop,i=n.restart;let o=!1;return n.stopped=()=>o,n.restart=()=>(o=!1,i()),n.stop=()=>(o=!0,r()),tE(n,e,!0).on("end",(()=>o=!0))}(e.source,t),i.on("tick",(n=e.dataflow,r=this,()=>n.touch(r).run())),t.static||(o=!0,i.tick()),e.modifies("index")),a||o||t.modified(ZM)||e.changed()&&t.restart)if(i.alpha(Math.max(i.alpha(),t.alpha||1)).alphaDecay(1-Math.pow(i.alphaMin(),1/u)),t.static)for(i.stop();--u>=0;)i.tick();else if(i.stopped()&&i.restart(),!o)return e.StopPropagation;return this.finish(t,e)},finish(t,e){const n=e.dataflow;for(let t,e=this._argops,u=0,s=e.length;u<s;++u)if(t=e[u],t.name===XM&&"link"===t.op._argval.force)for(var r,i=t.op._argops,o=0,a=i.length;o<a;++o)if("links"===i[o].name&&(r=i[o].op.source)){n.pulse(r,n.changeset().reflow());break}return e.reflow(t.modified()).modifies(QM)}});var iE=Object.freeze({__proto__:null,force:KM});function oE(t,e){return t.parent===e.parent?1:2}function aE(t,e){return t+e.x}function uE(t,e){return Math.max(t,e.y)}function sE(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function lE(t,e){t instanceof Map?(t=[void 0,t],void 0===e&&(e=fE)):void 0===e&&(e=cE);for(var n,r,i,o,a,u=new pE(t),s=[u];n=s.pop();)if((i=e(n.data))&&(a=(i=Array.from(i)).length))for(n.children=i,o=a-1;o>=0;--o)s.push(r=i[o]=new pE(i[o])),r.parent=n,r.depth=n.depth+1;return u.eachBefore(dE)}function cE(t){return t.children}function fE(t){return Array.isArray(t)?t[1]:null}function hE(t){void 0!==t.data.value&&(t.value=t.data.value),t.data=t.data.data}function dE(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function pE(t){this.data=t,this.depth=this.height=0,this.parent=null}function gE(t){for(var e,n,r=0,i=(t=function(t){for(var e,n,r=t.length;r;)n=Math.random()*r--|0,e=t[r],t[r]=t[n],t[n]=e;return t}(Array.from(t))).length,o=[];r<i;)e=t[r],n&&vE(n,e)?++r:(n=xE(o=mE(o,e)),r=0);return n}function mE(t,e){var n,r;if(_E(e,t))return[e];for(n=0;n<t.length;++n)if(yE(e,t[n])&&_E(bE(t[n],e),t))return[t[n],e];for(n=0;n<t.length-1;++n)for(r=n+1;r<t.length;++r)if(yE(bE(t[n],t[r]),e)&&yE(bE(t[n],e),t[r])&&yE(bE(t[r],e),t[n])&&_E(wE(t[n],t[r],e),t))return[t[n],t[r],e];throw new Error}function yE(t,e){var n=t.r-e.r,r=e.x-t.x,i=e.y-t.y;return n<0||n*n<r*r+i*i}function vE(t,e){var n=t.r-e.r+1e-9*Math.max(t.r,e.r,1),r=e.x-t.x,i=e.y-t.y;return n>0&&n*n>r*r+i*i}function _E(t,e){for(var n=0;n<e.length;++n)if(!vE(t,e[n]))return!1;return!0}function xE(t){switch(t.length){case 1:return function(t){return{x:t.x,y:t.y,r:t.r}}(t[0]);case 2:return bE(t[0],t[1]);case 3:return wE(t[0],t[1],t[2])}}function bE(t,e){var n=t.x,r=t.y,i=t.r,o=e.x,a=e.y,u=e.r,s=o-n,l=a-r,c=u-i,f=Math.sqrt(s*s+l*l);return{x:(n+o+s/f*c)/2,y:(r+a+l/f*c)/2,r:(f+i+u)/2}}function wE(t,e,n){var r=t.x,i=t.y,o=t.r,a=e.x,u=e.y,s=e.r,l=n.x,c=n.y,f=n.r,h=r-a,d=r-l,p=i-u,g=i-c,m=s-o,y=f-o,v=r*r+i*i-o*o,_=v-a*a-u*u+s*s,x=v-l*l-c*c+f*f,b=d*p-h*g,w=(p*x-g*_)/(2*b)-r,k=(g*m-p*y)/b,A=(d*_-h*x)/(2*b)-i,M=(h*y-d*m)/b,E=k*k+M*M-1,D=2*(o+w*k+A*M),C=w*w+A*A-o*o,F=-(E?(D+Math.sqrt(D*D-4*E*C))/(2*E):C/D);return{x:r+w+k*F,y:i+A+M*F,r:F}}function kE(t,e,n){var r,i,o,a,u=t.x-e.x,s=t.y-e.y,l=u*u+s*s;l?(i=e.r+n.r,i*=i,a=t.r+n.r,i>(a*=a)?(r=(l+a-i)/(2*l),o=Math.sqrt(Math.max(0,a/l-r*r)),n.x=t.x-r*u-o*s,n.y=t.y-r*s+o*u):(r=(l+i-a)/(2*l),o=Math.sqrt(Math.max(0,i/l-r*r)),n.x=e.x+r*u-o*s,n.y=e.y+r*s+o*u)):(n.x=e.x+n.r,n.y=e.y)}function AE(t,e){var n=t.r+e.r-1e-6,r=e.x-t.x,i=e.y-t.y;return n>0&&n*n>r*r+i*i}function ME(t){var e=t._,n=t.next._,r=e.r+n.r,i=(e.x*n.r+n.x*e.r)/r,o=(e.y*n.r+n.y*e.r)/r;return i*i+o*o}function EE(t){this._=t,this.next=null,this.previous=null}function DE(t){if(!(i=(t=function(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}(t)).length))return 0;var e,n,r,i,o,a,u,s,l,c,f;if((e=t[0]).x=0,e.y=0,!(i>1))return e.r;if(n=t[1],e.x=-n.r,n.x=e.r,n.y=0,!(i>2))return e.r+n.r;kE(n,e,r=t[2]),e=new EE(e),n=new EE(n),r=new EE(r),e.next=r.previous=n,n.next=e.previous=r,r.next=n.previous=e;t:for(u=3;u<i;++u){kE(e._,n._,r=t[u]),r=new EE(r),s=n.next,l=e.previous,c=n._.r,f=e._.r;do{if(c<=f){if(AE(s._,r._)){n=s,e.next=n,n.previous=e,--u;continue t}c+=s._.r,s=s.next}else{if(AE(l._,r._)){(e=l).next=n,n.previous=e,--u;continue t}f+=l._.r,l=l.previous}}while(s!==l.next);for(r.previous=e,r.next=n,e.next=n.previous=n=r,o=ME(e);(r=r.next)!==n;)(a=ME(r))<o&&(e=r,o=a);n=e.next}for(e=[n._],r=n;(r=r.next)!==n;)e.push(r._);for(r=gE(e),u=0;u<i;++u)(e=t[u]).x-=r.x,e.y-=r.y;return r.r}function CE(t){return null==t?null:FE(t)}function FE(t){if("function"!=typeof t)throw new Error;return t}function SE(){return 0}function BE(t){return function(){return t}}function TE(t){return Math.sqrt(t.value)}function zE(t){return function(e){e.children||(e.r=Math.max(0,+t(e)||0))}}function NE(t,e){return function(n){if(r=n.children){var r,i,o,a=r.length,u=t(n)*e||0;if(u)for(i=0;i<a;++i)r[i].r+=u;if(o=DE(r),u)for(i=0;i<a;++i)r[i].r-=u;n.r=o+u}}}function OE(t){return function(e){var n=e.parent;e.r*=t,n&&(e.x=n.x+t*e.x,e.y=n.y+t*e.y)}}function RE(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function $E(t,e,n,r,i){for(var o,a=t.children,u=-1,s=a.length,l=t.value&&(r-e)/t.value;++u<s;)(o=a[u]).y0=n,o.y1=i,o.x0=e,o.x1=e+=o.value*l}pE.prototype=lE.prototype={constructor:pE,count:function(){return this.eachAfter(sE)},each:function(t,e){let n=-1;for(const r of this)t.call(e,r,++n,this);return this},eachAfter:function(t,e){for(var n,r,i,o=this,a=[o],u=[],s=-1;o=a.pop();)if(u.push(o),n=o.children)for(r=0,i=n.length;r<i;++r)a.push(n[r]);for(;o=u.pop();)t.call(e,o,++s,this);return this},eachBefore:function(t,e){for(var n,r,i=this,o=[i],a=-1;i=o.pop();)if(t.call(e,i,++a,this),n=i.children)for(r=n.length-1;r>=0;--r)o.push(n[r]);return this},find:function(t,e){let n=-1;for(const r of this)if(t.call(e,r,++n,this))return r},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){return Array.from(this)},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return lE(this).eachBefore(hE)},[Symbol.iterator]:function*(){var t,e,n,r,i=this,o=[i];do{for(t=o.reverse(),o=[];i=t.pop();)if(yield i,e=i.children)for(n=0,r=e.length;n<r;++n)o.push(e[n])}while(o.length)}};var qE={depth:-1},LE={};function UE(t){return t.id}function PE(t){return t.parentId}function jE(){var t=UE,e=PE;function n(n){var r,i,o,a,u,s,l,c=Array.from(n),f=c.length,h=new Map;for(i=0;i<f;++i)r=c[i],u=c[i]=new pE(r),null!=(s=t(r,i,n))&&(s+="")&&(l=u.id=s,h.set(l,h.has(l)?LE:u)),null!=(s=e(r,i,n))&&(s+="")&&(u.parent=s);for(i=0;i<f;++i)if(s=(u=c[i]).parent){if(!(a=h.get(s)))throw new Error("missing: "+s);if(a===LE)throw new Error("ambiguous: "+s);a.children?a.children.push(u):a.children=[u],u.parent=a}else{if(o)throw new Error("multiple roots");o=u}if(!o)throw new Error("no root");if(o.parent=qE,o.eachBefore((function(t){t.depth=t.parent.depth+1,--f})).eachBefore(dE),o.parent=null,f>0)throw new Error("cycle");return o}return n.id=function(e){return arguments.length?(t=FE(e),n):t},n.parentId=function(t){return arguments.length?(e=FE(t),n):e},n}function IE(t,e){return t.parent===e.parent?1:2}function WE(t){var e=t.children;return e?e[0]:t.t}function HE(t){var e=t.children;return e?e[e.length-1]:t.t}function YE(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,t.c+=r,e.z+=n,e.m+=n}function VE(t,e,n){return t.a.parent===e.parent?t.a:n}function GE(t,e){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}function XE(t,e,n,r,i){for(var o,a=t.children,u=-1,s=a.length,l=t.value&&(i-n)/t.value;++u<s;)(o=a[u]).x0=e,o.x1=r,o.y0=n,o.y1=n+=o.value*l}GE.prototype=Object.create(pE.prototype);var JE=(1+Math.sqrt(5))/2;function ZE(t,e,n,r,i,o){for(var a,u,s,l,c,f,h,d,p,g,m,y=[],v=e.children,_=0,x=0,b=v.length,w=e.value;_<b;){s=i-n,l=o-r;do{c=v[x++].value}while(!c&&x<b);for(f=h=c,m=c*c*(g=Math.max(l/s,s/l)/(w*t)),p=Math.max(h/m,m/f);x<b;++x){if(c+=u=v[x].value,u<f&&(f=u),u>h&&(h=u),m=c*c*g,(d=Math.max(h/m,m/f))>p){c-=u;break}p=d}y.push(a={value:c,dice:s<l,children:v.slice(_,x)}),a.dice?$E(a,n,r,i,w?r+=l*c/w:o):XE(a,n,r,w?n+=s*c/w:i,o),w-=c,_=x}return y}var QE=function t(e){function n(t,n,r,i,o){ZE(e,t,n,r,i,o)}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(JE);var KE=function t(e){function n(t,n,r,i,o){if((a=t._squarify)&&a.ratio===e)for(var a,u,s,l,c,f=-1,h=a.length,d=t.value;++f<h;){for(s=(u=a[f]).children,l=u.value=0,c=s.length;l<c;++l)u.value+=s[l].value;u.dice?$E(u,n,r,i,d?r+=(o-r)*u.value/d:o):XE(u,n,r,d?n+=(i-n)*u.value/d:i,o),d-=u.value}else t._squarify=a=ZE(e,t,n,r,i,o),a.ratio=e}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(JE);function tD(t,e,n){const r={};return t.each((t=>{const i=t.data;n(i)&&(r[e(i)]=t)})),t.lookup=r,t}function eD(t){ga.call(this,null,t)}eD.Definition={type:"Nest",metadata:{treesource:!0,changes:!0},params:[{name:"keys",type:"field",array:!0},{name:"generate",type:"boolean"}]};const nD=t=>t.values;function rD(){const t=[],e={entries:t=>r(n(t,0),0),key:n=>(t.push(n),e)};function n(e,r){if(r>=t.length)return e;const i=e.length,o=t[r++],a={},u={};let s,l,c,f=-1;for(;++f<i;)s=o(l=e[f])+"",(c=a[s])?c.push(l):a[s]=[l];for(s in a)u[s]=n(a[s],r);return u}function r(e,n){if(++n>t.length)return e;const i=[];for(const t in e)i.push({key:t,values:r(e[t],n)});return i}return e}function iD(t){ga.call(this,null,t)}st(eD,ga,{transform(t,e){e.source||s("Nest transform requires an upstream data source.");var n=t.generate,r=t.modified(),i=e.clone(),o=this.value;return(!o||r||e.changed())&&(o&&o.each((t=>{t.children&&Oo(t.data)&&i.rem.push(t.data)})),this.value=o=lE({values:W(t.keys).reduce(((t,e)=>(t.key(e),t)),rD()).entries(i.source)},nD),n&&o.each((t=>{t.children&&(t=qo(t.data),i.add.push(t),i.source.push(t))})),tD(o,Ro,Ro)),i.source.root=o,i}});const oD=(t,e)=>t.parent===e.parent?1:2;st(iD,ga,{transform(t,e){e.source&&e.source.root||s(this.constructor.name+" transform requires a backing tree data source.");const n=this.layout(t.method),r=this.fields,i=e.source.root,o=t.as||r;t.field?i.sum(t.field):i.count(),t.sort&&i.sort(jo(t.sort,(t=>t.data))),function(t,e,n){for(let r,i=0,o=e.length;i<o;++i)r=e[i],r in n&&t[r](n[r])}(n,this.params,t),n.separation&&n.separation(!1!==t.separation?oD:p);try{this.value=n(i)}catch(t){s(t)}return i.each((t=>function(t,e,n){const r=t.data,i=e.length-1;for(let o=0;o<i;++o)r[n[o]]=t[e[o]];r[n[i]]=t.children?t.children.length:0}(t,r,o))),e.reflow(t.modified()).modifies(o).modifies("leaf")}});const aD=["x","y","r","depth","children"];function uD(t){iD.call(this,t)}uD.Definition={type:"Pack",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"radius",type:"field",default:null},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:aD.length,default:aD}]},st(uD,iD,{layout:function(){var t=null,e=1,n=1,r=SE;function i(i){return i.x=e/2,i.y=n/2,t?i.eachBefore(zE(t)).eachAfter(NE(r,.5)).eachBefore(OE(1)):i.eachBefore(zE(TE)).eachAfter(NE(SE,1)).eachAfter(NE(r,i.r/Math.min(e,n))).eachBefore(OE(Math.min(e,n)/(2*i.r))),i}return i.radius=function(e){return arguments.length?(t=CE(e),i):t},i.size=function(t){return arguments.length?(e=+t[0],n=+t[1],i):[e,n]},i.padding=function(t){return arguments.length?(r="function"==typeof t?t:BE(+t),i):r},i},params:["radius","size","padding"],fields:aD});const sD=["x0","y0","x1","y1","depth","children"];function lD(t){iD.call(this,t)}function cD(t){ga.call(this,null,t)}lD.Definition={type:"Partition",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:sD.length,default:sD}]},st(lD,iD,{layout:function(){var t=1,e=1,n=0,r=!1;function i(i){var o=i.height+1;return i.x0=i.y0=n,i.x1=t,i.y1=e/o,i.eachBefore(function(t,e){return function(r){r.children&&$E(r,r.x0,t*(r.depth+1)/e,r.x1,t*(r.depth+2)/e);var i=r.x0,o=r.y0,a=r.x1-n,u=r.y1-n;a<i&&(i=a=(i+a)/2),u<o&&(o=u=(o+u)/2),r.x0=i,r.y0=o,r.x1=a,r.y1=u}}(e,o)),r&&i.eachBefore(RE),i}return i.round=function(t){return arguments.length?(r=!!t,i):r},i.size=function(n){return arguments.length?(t=+n[0],e=+n[1],i):[t,e]},i.padding=function(t){return arguments.length?(n=+t,i):n},i},params:["size","round","padding"],fields:sD}),cD.Definition={type:"Stratify",metadata:{treesource:!0},params:[{name:"key",type:"field",required:!0},{name:"parentKey",type:"field",required:!0}]},st(cD,ga,{transform(t,e){e.source||s("Stratify transform requires an upstream data source.");let n=this.value;const r=t.modified(),i=e.fork(e.ALL).materialize(e.SOURCE),o=!n||r||e.changed(e.ADD_REM)||e.modified(t.key.fields)||e.modified(t.parentKey.fields);return i.source=i.source.slice(),o&&(n=i.source.length?tD(jE().id(t.key).parentId(t.parentKey)(i.source),t.key,g):tD(jE()([{}]),t.key,t.key)),i.source.root=this.value=n,i}});const fD={tidy:function(){var t=IE,e=1,n=1,r=null;function i(i){var s=function(t){for(var e,n,r,i,o,a=new GE(t,0),u=[a];e=u.pop();)if(r=e._.children)for(e.children=new Array(o=r.length),i=o-1;i>=0;--i)u.push(n=e.children[i]=new GE(r[i],i)),n.parent=e;return(a.parent=new GE(null,0)).children=[a],a}(i);if(s.eachAfter(o),s.parent.m=-s.z,s.eachBefore(a),r)i.eachBefore(u);else{var l=i,c=i,f=i;i.eachBefore((function(t){t.x<l.x&&(l=t),t.x>c.x&&(c=t),t.depth>f.depth&&(f=t)}));var h=l===c?1:t(l,c)/2,d=h-l.x,p=e/(c.x+h+d),g=n/(f.depth||1);i.eachBefore((function(t){t.x=(t.x+d)*p,t.y=t.depth*g}))}return i}function o(e){var n=e.children,r=e.parent.children,i=e.i?r[e.i-1]:null;if(n){!function(t){for(var e,n=0,r=0,i=t.children,o=i.length;--o>=0;)(e=i[o]).z+=n,e.m+=n,n+=e.s+(r+=e.c)}(e);var o=(n[0].z+n[n.length-1].z)/2;i?(e.z=i.z+t(e._,i._),e.m=e.z-o):e.z=o}else i&&(e.z=i.z+t(e._,i._));e.parent.A=function(e,n,r){if(n){for(var i,o=e,a=e,u=n,s=o.parent.children[0],l=o.m,c=a.m,f=u.m,h=s.m;u=HE(u),o=WE(o),u&&o;)s=WE(s),(a=HE(a)).a=e,(i=u.z+f-o.z-l+t(u._,o._))>0&&(YE(VE(u,e,r),e,i),l+=i,c+=i),f+=u.m,l+=o.m,h+=s.m,c+=a.m;u&&!HE(a)&&(a.t=u,a.m+=f-c),o&&!WE(s)&&(s.t=o,s.m+=l-h,r=e)}return r}(e,i,e.parent.A||r[0])}function a(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function u(t){t.x*=e,t.y=t.depth*n}return i.separation=function(e){return arguments.length?(t=e,i):t},i.size=function(t){return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]},i.nodeSize=function(t){return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i},cluster:function(){var t=oE,e=1,n=1,r=!1;function i(i){var o,a=0;i.eachAfter((function(e){var n=e.children;n?(e.x=function(t){return t.reduce(aE,0)/t.length}(n),e.y=function(t){return 1+t.reduce(uE,0)}(n)):(e.x=o?a+=t(e,o):0,e.y=0,o=e)}));var u=function(t){for(var e;e=t.children;)t=e[0];return t}(i),s=function(t){for(var e;e=t.children;)t=e[e.length-1];return t}(i),l=u.x-t(u,s)/2,c=s.x+t(s,u)/2;return i.eachAfter(r?function(t){t.x=(t.x-i.x)*e,t.y=(i.y-t.y)*n}:function(t){t.x=(t.x-l)/(c-l)*e,t.y=(1-(i.y?t.y/i.y:1))*n})}return i.separation=function(e){return arguments.length?(t=e,i):t},i.size=function(t){return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]},i.nodeSize=function(t){return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i}},hD=["x","y","depth","children"];function dD(t){iD.call(this,t)}function pD(t){ga.call(this,[],t)}dD.Definition={type:"Tree",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"tidy",values:["tidy","cluster"]},{name:"size",type:"number",array:!0,length:2},{name:"nodeSize",type:"number",array:!0,length:2},{name:"separation",type:"boolean",default:!0},{name:"as",type:"string",array:!0,length:hD.length,default:hD}]},st(dD,iD,{layout(t){const e=t||"tidy";if(it(fD,e))return fD[e]();s("Unrecognized Tree layout method: "+e)},params:["size","nodeSize"],fields:hD}),pD.Definition={type:"TreeLinks",metadata:{tree:!0,generates:!0,changes:!0},params:[]},st(pD,ga,{transform(t,e){const n=this.value,r=e.source&&e.source.root,i=e.fork(e.NO_SOURCE),o={};return r||s("TreeLinks transform requires a tree data source."),e.changed(e.ADD_REM)?(i.rem=n,e.visit(e.SOURCE,(t=>o[Ro(t)]=1)),r.each((t=>{const e=t.data,n=t.parent&&t.parent.data;n&&o[Ro(e)]&&o[Ro(n)]&&i.add.push(qo({source:n,target:e}))})),this.value=i.add):e.changed(e.MOD)&&(e.visit(e.MOD,(t=>o[Ro(t)]=1)),n.forEach((t=>{(o[Ro(t.source)]||o[Ro(t.target)])&&i.mod.push(t)}))),i}});const gD={binary:function(t,e,n,r,i){var o,a,u=t.children,s=u.length,l=new Array(s+1);for(l[0]=a=o=0;o<s;++o)l[o+1]=a+=u[o].value;!function t(e,n,r,i,o,a,s){if(e>=n-1){var c=u[e];return c.x0=i,c.y0=o,c.x1=a,void(c.y1=s)}var f=l[e],h=r/2+f,d=e+1,p=n-1;for(;d<p;){var g=d+p>>>1;l[g]<h?d=g+1:p=g}h-l[d-1]<l[d]-h&&e+1<d&&--d;var m=l[d]-f,y=r-m;if(a-i>s-o){var v=r?(i*y+a*m)/r:a;t(e,d,m,i,o,v,s),t(d,n,y,v,o,a,s)}else{var _=r?(o*y+s*m)/r:s;t(e,d,m,i,o,a,_),t(d,n,y,i,_,a,s)}}(0,s,t.value,e,n,r,i)},dice:$E,slice:XE,slicedice:function(t,e,n,r,i){(1&t.depth?XE:$E)(t,e,n,r,i)},squarify:QE,resquarify:KE},mD=["x0","y0","x1","y1","depth","children"];function yD(t){iD.call(this,t)}yD.Definition={type:"Treemap",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"squarify",values:["squarify","resquarify","binary","dice","slice","slicedice"]},{name:"padding",type:"number",default:0},{name:"paddingInner",type:"number",default:0},{name:"paddingOuter",type:"number",default:0},{name:"paddingTop",type:"number",default:0},{name:"paddingRight",type:"number",default:0},{name:"paddingBottom",type:"number",default:0},{name:"paddingLeft",type:"number",default:0},{name:"ratio",type:"number",default:1.618033988749895},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:mD.length,default:mD}]},st(yD,iD,{layout(){const t=function(){var t=QE,e=!1,n=1,r=1,i=[0],o=SE,a=SE,u=SE,s=SE,l=SE;function c(t){return t.x0=t.y0=0,t.x1=n,t.y1=r,t.eachBefore(f),i=[0],e&&t.eachBefore(RE),t}function f(e){var n=i[e.depth],r=e.x0+n,c=e.y0+n,f=e.x1-n,h=e.y1-n;f<r&&(r=f=(r+f)/2),h<c&&(c=h=(c+h)/2),e.x0=r,e.y0=c,e.x1=f,e.y1=h,e.children&&(n=i[e.depth+1]=o(e)/2,r+=l(e)-n,c+=a(e)-n,(f-=u(e)-n)<r&&(r=f=(r+f)/2),(h-=s(e)-n)<c&&(c=h=(c+h)/2),t(e,r,c,f,h))}return c.round=function(t){return arguments.length?(e=!!t,c):e},c.size=function(t){return arguments.length?(n=+t[0],r=+t[1],c):[n,r]},c.tile=function(e){return arguments.length?(t=FE(e),c):t},c.padding=function(t){return arguments.length?c.paddingInner(t).paddingOuter(t):c.paddingInner()},c.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:BE(+t),c):o},c.paddingOuter=function(t){return arguments.length?c.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):c.paddingTop()},c.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:BE(+t),c):a},c.paddingRight=function(t){return arguments.length?(u="function"==typeof t?t:BE(+t),c):u},c.paddingBottom=function(t){return arguments.length?(s="function"==typeof t?t:BE(+t),c):s},c.paddingLeft=function(t){return arguments.length?(l="function"==typeof t?t:BE(+t),c):l},c}();return t.ratio=e=>{const n=t.tile();n.ratio&&t.tile(n.ratio(e))},t.method=e=>{it(gD,e)?t.tile(gD[e]):s("Unrecognized Treemap layout method: "+e)},t},params:["method","ratio","size","round","padding","paddingInner","paddingOuter","paddingTop","paddingRight","paddingBottom","paddingLeft"],fields:mD});var vD=Object.freeze({__proto__:null,nest:eD,pack:uD,partition:lD,stratify:cD,tree:dD,treelinks:pD,treemap:yD});function _D(t,e,n,r){const i=t.width,o=t.height,a=n||r,u=Xl(i,o).getContext("2d");e.forEach((t=>xD(u,t,a)));const s=new Uint32Array(u.getImageData(0,0,i,o).data.buffer),l=t.bitmap(),c=a&&t.bitmap();let f,h,d,p,g;for(h=0;h<o;++h)for(f=0;f<i;++f)g=4278190080&s[h*i+f],g&&(d=t(f),p=t(h),r||l.set(d,p),a&&268435456^g&&c.set(d,p));return[l,c]}function xD(t,e,n){if(!e.length)return;const r=e[0].mark.marktype;"group"===r?e.forEach((e=>{e.items.forEach((e=>xD(t,e.items,n)))})):Ym[r].draw(t,{items:n?e.map(bD):e})}function bD(t){const e=Uo(t,{});return e.stroke&&(e.strokeOpacity=1),e.fill&&(e.fillOpacity=.0625,e.stroke="#000",e.strokeOpacity=1,e.strokeWidth=2),e}const wD=31,kD=new Uint32Array(33),AD=new Uint32Array(33);AD[0]=0,kD[0]=~AD[0];for(let t=1;t<=32;++t)AD[t]=AD[t-1]<<1|1,kD[t]=~AD[t];function MD(t,e,n){const r=Math.max(1,Math.sqrt(t*e/1e6)),i=~~((t+2*n+r)/r),o=~~((e+2*n+r)/r),a=t=>~~((t+n)/r);return a.invert=t=>t*r-n,a.bitmap=()=>function(t,e){const n=new Uint32Array(~~((t*e+32)/32));function r(t,e){n[t]|=e}function i(t,e){n[t]&=e}return{array:n,get:(e,r)=>{const i=r*t+e;return n[i>>>5]&1<<(i&wD)},set:(e,n)=>{const i=n*t+e;r(i>>>5,1<<(i&wD))},clear:(e,n)=>{const r=n*t+e;i(r>>>5,~(1<<(r&wD)))},getRange:(e,r,i,o)=>{let a,u,s,l,c=o;for(;c>=r;--c)if(a=c*t+e,u=c*t+i,s=a>>>5,l=u>>>5,s===l){if(n[s]&kD[a&wD]&AD[1+(u&wD)])return!0}else{if(n[s]&kD[a&wD])return!0;if(n[l]&AD[1+(u&wD)])return!0;for(let t=s+1;t<l;++t)if(n[t])return!0}return!1},setRange:(e,n,i,o)=>{let a,u,s,l,c;for(;n<=o;++n)if(a=n*t+e,u=n*t+i,s=a>>>5,l=u>>>5,s===l)r(s,kD[a&wD]&AD[1+(u&wD)]);else for(r(s,kD[a&wD]),r(l,AD[1+(u&wD)]),c=s+1;c<l;++c)r(c,4294967295)},clearRange:(e,n,r,o)=>{let a,u,s,l,c;for(;n<=o;++n)if(a=n*t+e,u=n*t+r,s=a>>>5,l=u>>>5,s===l)i(s,AD[a&wD]|kD[1+(u&wD)]);else for(i(s,AD[a&wD]),i(l,kD[1+(u&wD)]),c=s+1;c<l;++c)i(c,0)},outOfBounds:(n,r,i,o)=>n<0||r<0||o>=e||i>=t}}(i,o),a.ratio=r,a.padding=n,a.width=t,a.height=e,a}function ED(t,e,n,r,i,o){let a=n/2;return t-a<0||t+a>i||e-(a=r/2)<0||e+a>o}function DD(t,e,n,r,i,o,a,u){const s=i*o/(2*r),l=t(e-s),c=t(e+s),f=t(n-(o/=2)),h=t(n+o);return a.outOfBounds(l,f,c,h)||a.getRange(l,f,c,h)||u&&u.getRange(l,f,c,h)}const CD=[-1,-1,1,1],FD=[-1,1,-1,1];const SD=["right","center","left"],BD=["bottom","middle","top"];function TD(t,e,n,r,i,o,a,u,s,l,c,f){return!(i.outOfBounds(t,n,e,r)||(f&&o?o.getRange(t,n,e,r)||!function(t,e,n,r,i){return i[0]<=t&&n<=i[2]&&i[3]<=e&&r<=i[5]}(a,s,u,l,c):i.getRange(t,n,e,r)))}const zD={"top-left":0,top:1,"top-right":2,left:4,middle:5,right:6,"bottom-left":8,bottom:9,"bottom-right":10},ND={naive:function(t,e,n,r){const i=t.width,o=t.height;return function(t){const e=t.datum.datum.items[r].items,n=e.length,a=t.datum.fontSize,u=Cm.width(t.datum,t.datum.text);let s,l,c,f,h,d,p,g=0;for(let r=0;r<n;++r)s=e[r].x,c=e[r].y,l=void 0===e[r].x2?s:e[r].x2,f=void 0===e[r].y2?c:e[r].y2,h=(s+l)/2,d=(c+f)/2,p=Math.abs(l-s+f-c),p>=g&&(g=p,t.x=h,t.y=d);return h=u/2,d=a/2,s=t.x-h,l=t.x+h,c=t.y-d,f=t.y+d,t.align="center",s<0&&l<=i?t.align="left":0<=s&&i<l&&(t.align="right"),t.baseline="middle",c<0&&f<=o?t.baseline="top":0<=c&&o<f&&(t.baseline="bottom"),!0}},"reduced-search":function(t,e,n,r){const i=t.width,o=t.height,a=e[0],u=e[1];function s(e,n,r,s,l){const c=t.invert(e),f=t.invert(n);let h,d=r,p=o;if(!ED(c,f,s,l,i,o)&&!DD(t,c,f,l,s,d,a,u)&&!DD(t,c,f,l,s,l,a,null)){for(;p-d>=1;)h=(d+p)/2,DD(t,c,f,l,s,h,a,u)?p=h:d=h;if(d>r)return[c,f,d,!0]}}return function(e){const u=e.datum.datum.items[r].items,l=u.length,c=e.datum.fontSize,f=Cm.width(e.datum,e.datum.text);let h,d,p,g,m,y,v,_,x,b,w,k,A,M,E,D,C,F=n?c:0,S=!1,B=!1,T=0;for(let r=0;r<l;++r){for(h=u[r].x,p=u[r].y,d=void 0===u[r].x2?h:u[r].x2,g=void 0===u[r].y2?p:u[r].y2,h>d&&(C=h,h=d,d=C),p>g&&(C=p,p=g,g=C),x=t(h),w=t(d),b=~~((x+w)/2),k=t(p),M=t(g),A=~~((k+M)/2),v=b;v>=x;--v)for(_=A;_>=k;--_)D=s(v,_,F,f,c),D&&([e.x,e.y,F,S]=D);for(v=b;v<=w;++v)for(_=A;_<=M;++_)D=s(v,_,F,f,c),D&&([e.x,e.y,F,S]=D);S||n||(E=Math.abs(d-h+g-p),m=(h+d)/2,y=(p+g)/2,E>=T&&!ED(m,y,f,c,i,o)&&!DD(t,m,y,c,f,c,a,null)&&(T=E,e.x=m,e.y=y,B=!0))}return!(!S&&!B)&&(m=f/2,y=c/2,a.setRange(t(e.x-m),t(e.y-y),t(e.x+m),t(e.y+y)),e.align="center",e.baseline="middle",!0)}},floodfill:function(t,e,n,r){const i=t.width,o=t.height,a=e[0],u=e[1],s=t.bitmap();return function(e){const l=e.datum.datum.items[r].items,c=l.length,f=e.datum.fontSize,h=Cm.width(e.datum,e.datum.text),d=[];let p,g,m,y,v,_,x,b,w,k,A,M,E=n?f:0,D=!1,C=!1,F=0;for(let r=0;r<c;++r){for(p=l[r].x,m=l[r].y,g=void 0===l[r].x2?p:l[r].x2,y=void 0===l[r].y2?m:l[r].y2,d.push([t((p+g)/2),t((m+y)/2)]);d.length;)if([x,b]=d.pop(),!(a.get(x,b)||u.get(x,b)||s.get(x,b))){s.set(x,b);for(let t=0;t<4;++t)v=x+CD[t],_=b+FD[t],s.outOfBounds(v,_,v,_)||d.push([v,_]);if(v=t.invert(x),_=t.invert(b),w=E,k=o,!ED(v,_,h,f,i,o)&&!DD(t,v,_,f,h,w,a,u)&&!DD(t,v,_,f,h,f,a,null)){for(;k-w>=1;)A=(w+k)/2,DD(t,v,_,f,h,A,a,u)?k=A:w=A;w>E&&(e.x=v,e.y=_,E=w,D=!0)}}D||n||(M=Math.abs(g-p+y-m),v=(p+g)/2,_=(m+y)/2,M>=F&&!ED(v,_,h,f,i,o)&&!DD(t,v,_,f,h,f,a,null)&&(F=M,e.x=v,e.y=_,C=!0))}return!(!D&&!C)&&(v=h/2,_=f/2,a.setRange(t(e.x-v),t(e.y-_),t(e.x+v),t(e.y+_)),e.align="center",e.baseline="middle",!0)}}};function OD(t,e,n,r,i,o,a,u,s,l,c){if(!t.length)return t;const f=Math.max(r.length,i.length),h=function(t,e){const n=new Float64Array(e),r=t.length;for(let e=0;e<r;++e)n[e]=t[e]||0;for(let t=r;t<e;++t)n[t]=n[r-1];return n}(r,f),d=function(t,e){const n=new Int8Array(e),r=t.length;for(let e=0;e<r;++e)n[e]|=zD[t[e]];for(let t=r;t<e;++t)n[t]=n[r-1];return n}(i,f),p=(x=t[0].datum)&&x.mark&&x.mark.marktype,g="group"===p&&t[0].datum.items[s].marktype,m="area"===g,y=function(t,e,n,r){const i=t=>[t.x,t.x,t.x,t.y,t.y,t.y];return t?"line"===t||"area"===t?t=>i(t.datum):"line"===e?t=>{const e=t.datum.items[r].items;return i(e.length?e["start"===n?0:e.length-1]:{x:NaN,y:NaN})}:t=>{const e=t.datum.bounds;return[e.x1,(e.x1+e.x2)/2,e.x2,e.y1,(e.y1+e.y2)/2,e.y2]}:i}(p,g,u,s),v=MD(e[0],e[1],l),_=m&&"naive"===c;var x;const b=t.map((t=>({datum:t,opacity:0,x:void 0,y:void 0,align:void 0,baseline:void 0,boundary:y(t)})));let w;if(!_){n&&b.sort(((t,e)=>n(t.datum,e.datum)));let e=!1;for(let t=0;t<d.length&&!e;++t)e=5===d[t]||h[t]<0;p&&(a||m)&&(o=[t.map((t=>t.datum))].concat(o)),w=o.length?_D(v,o,e,m):function(t,e){const n=t.bitmap();return(e||[]).forEach((e=>n.set(t(e.boundary[0]),t(e.boundary[3])))),[n,void 0]}(v,a&&b)}const k=m?ND[c](v,w,a,s):function(t,e,n,r){const i=t.width,o=t.height,a=e[0],u=e[1],s=r.length;return function(e){const l=e.boundary,c=e.datum.fontSize;if(l[2]<0||l[5]<0||l[0]>i||l[3]>o)return!1;let f,h,d,p,g,m,y,v,_,x,b,w,k,A,M,E=0;for(let i=0;i<s;++i){if(f=(3&n[i])-1,h=(n[i]>>>2&3)-1,d=0===f&&0===h||r[i]<0,p=f&&h?Math.SQRT1_2:1,g=r[i]<0?-1:1,m=l[1+f]+r[i]*f*p,b=l[4+h]+g*c*h/2+r[i]*h*p,v=b-c/2,_=b+c/2,w=t(m),A=t(v),M=t(_),!E){if(!TD(w,w,A,M,a,u,m,m,v,_,l,d))continue;E=Cm.width(e.datum,e.datum.text)}if(x=m+g*E*f/2,m=x-E/2,y=x+E/2,w=t(m),k=t(y),TD(w,k,A,M,a,u,m,y,v,_,l,d))return e.x=f?f*g<0?y:m:x,e.y=h?h*g<0?_:v:b,e.align=SD[f*g+1],e.baseline=BD[h*g+1],a.setRange(w,A,k,M),!0}return!1}}(v,w,d,h);return b.forEach((t=>t.opacity=+k(t))),b}const RD=["x","y","opacity","align","baseline"],$D=["top-left","left","bottom-left","top","bottom","top-right","right","bottom-right"];function qD(t){ga.call(this,null,t)}qD.Definition={type:"Label",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"sort",type:"compare"},{name:"anchor",type:"string",array:!0,default:$D},{name:"offset",type:"number",array:!0,default:[1]},{name:"padding",type:"number",default:0},{name:"lineAnchor",type:"string",values:["start","end"],default:"end"},{name:"markIndex",type:"number",default:0},{name:"avoidBaseMark",type:"boolean",default:!0},{name:"avoidMarks",type:"data",array:!0},{name:"method",type:"string",default:"naive"},{name:"as",type:"string",array:!0,length:RD.length,default:RD}]},st(qD,ga,{transform(t,e){const n=t.modified();if(!(n||e.changed(e.ADD_REM)||function(n){const r=t[n];return Y(r)&&e.modified(r.fields)}("sort")))return;t.size&&2===t.size.length||s("Size parameter should be specified as a [width, height] array.");const r=t.as||RD;return OD(e.materialize(e.SOURCE).source||[],t.size,t.sort,W(null==t.offset?1:t.offset),W(t.anchor||$D),t.avoidMarks||[],!1!==t.avoidBaseMark,t.lineAnchor||"end",t.markIndex||0,t.padding||0,t.method||"naive").forEach((t=>{const e=t.datum;e[r[0]]=t.x,e[r[1]]=t.y,e[r[2]]=t.opacity,e[r[3]]=t.align,e[r[4]]=t.baseline})),e.reflow(n).modifies(r)}});var LD=Object.freeze({__proto__:null,label:qD});function UD(t,e){var n,r,i,o,a,u,s=[],l=function(t){return t(o)};if(null==e)s.push(t);else for(n={},r=0,i=t.length;r<i;++r)o=t[r],(u=n[a=e.map(l)])||(n[a]=u=[],u.dims=a,s.push(u)),u.push(o);return s}function PD(t){ga.call(this,null,t)}PD.Definition={type:"Loess",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"bandwidth",type:"number",default:.3},{name:"as",type:"string",array:!0}]},st(PD,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=UD(e.materialize(e.SOURCE).source,t.groupby),o=(t.groupby||[]).map(r),a=o.length,u=t.as||[r(t.x),r(t.y)],s=[];i.forEach((e=>{ru(e,t.x,t.y,t.bandwidth||.3).forEach((t=>{const n={};for(let t=0;t<a;++t)n[o[t]]=e.dims[t];n[u[0]]=t[0],n[u[1]]=t[1],s.push(qo(n))}))})),this.value&&(n.rem=this.value),this.value=n.add=n.source=s}return n}});const jD={linear:Ja,log:Za,exp:Qa,pow:Ka,quad:tu,poly:eu};function ID(t){ga.call(this,null,t)}ID.Definition={type:"Regression",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"string",default:"linear",values:Object.keys(jD)},{name:"order",type:"number",default:3},{name:"extent",type:"number",array:!0,length:2},{name:"params",type:"boolean",default:!1},{name:"as",type:"string",array:!0}]},st(ID,ga,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=UD(e.materialize(e.SOURCE).source,t.groupby),o=(t.groupby||[]).map(r),a=t.method||"linear",u=t.order||3,l=((t,e)=>"poly"===t?e:"quad"===t?2:1)(a,u),c=t.as||[r(t.x),r(t.y)],f=jD[a],h=[];let d=t.extent;it(jD,a)||s("Invalid regression method: "+a),null!=d&&"log"===a&&d[0]<=0&&(e.dataflow.warn("Ignoring extent with values <= 0 for log regression."),d=null),i.forEach((n=>{if(n.length<=l)return void e.dataflow.warn("Skipping regression with more parameters than data points.");const r=f(n,t.x,t.y,u);if(t.params)return void h.push(qo({keys:n.dims,coef:r.coef,rSquared:r.rSquared}));const i=d||et(n,t.x),s=t=>{const e={};for(let t=0;t<o.length;++t)e[o[t]]=n.dims[t];e[c[0]]=t[0],e[c[1]]=t[1],h.push(qo(e))};"linear"===a?i.forEach((t=>s([t,r.predict(t)]))):uu(r.predict,i,25,200).forEach(s)})),this.value&&(n.rem=this.value),this.value=n.add=n.source=h}return n}});var WD=Object.freeze({__proto__:null,loess:PD,regression:ID});const HD=Math.pow(2,-52),YD=new Uint32Array(512);class VD{static from(t,e=eC,n=nC){const r=t.length,i=new Float64Array(2*r);for(let o=0;o<r;o++){const r=t[o];i[2*o]=e(r),i[2*o+1]=n(r)}return new VD(i)}constructor(t){const e=t.length>>1;if(e>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;const n=Math.max(2*e-5,0);this._triangles=new Uint32Array(3*n),this._halfedges=new Int32Array(3*n),this._hashSize=Math.ceil(Math.sqrt(e)),this._hullPrev=new Uint32Array(e),this._hullNext=new Uint32Array(e),this._hullTri=new Uint32Array(e),this._hullHash=new Int32Array(this._hashSize).fill(-1),this._ids=new Uint32Array(e),this._dists=new Float64Array(e),this.update()}update(){const{coords:t,_hullPrev:e,_hullNext:n,_hullTri:r,_hullHash:i}=this,o=t.length>>1;let a=1/0,u=1/0,s=-1/0,l=-1/0;for(let e=0;e<o;e++){const n=t[2*e],r=t[2*e+1];n<a&&(a=n),r<u&&(u=r),n>s&&(s=n),r>l&&(l=r),this._ids[e]=e}const c=(a+s)/2,f=(u+l)/2;let h,d,p,g=1/0;for(let e=0;e<o;e++){const n=GD(c,f,t[2*e],t[2*e+1]);n<g&&(h=e,g=n)}const m=t[2*h],y=t[2*h+1];g=1/0;for(let e=0;e<o;e++){if(e===h)continue;const n=GD(m,y,t[2*e],t[2*e+1]);n<g&&n>0&&(d=e,g=n)}let v=t[2*d],_=t[2*d+1],x=1/0;for(let e=0;e<o;e++){if(e===h||e===d)continue;const n=QD(m,y,v,_,t[2*e],t[2*e+1]);n<x&&(p=e,x=n)}let b=t[2*p],w=t[2*p+1];if(x===1/0){for(let e=0;e<o;e++)this._dists[e]=t[2*e]-t[0]||t[2*e+1]-t[1];KD(this._ids,this._dists,0,o-1);const e=new Uint32Array(o);let n=0;for(let t=0,r=-1/0;t<o;t++){const i=this._ids[t];this._dists[i]>r&&(e[n++]=i,r=this._dists[i])}return this.hull=e.subarray(0,n),this.triangles=new Uint32Array(0),void(this.halfedges=new Uint32Array(0))}if(JD(m,y,v,_,b,w)){const t=d,e=v,n=_;d=p,v=b,_=w,p=t,b=e,w=n}const k=function(t,e,n,r,i,o){const a=n-t,u=r-e,s=i-t,l=o-e,c=a*a+u*u,f=s*s+l*l,h=.5/(a*l-u*s);return{x:t+(l*c-u*f)*h,y:e+(a*f-s*c)*h}}(m,y,v,_,b,w);this._cx=k.x,this._cy=k.y;for(let e=0;e<o;e++)this._dists[e]=GD(t[2*e],t[2*e+1],k.x,k.y);KD(this._ids,this._dists,0,o-1),this._hullStart=h;let A=3;n[h]=e[p]=d,n[d]=e[h]=p,n[p]=e[d]=h,r[h]=0,r[d]=1,r[p]=2,i.fill(-1),i[this._hashKey(m,y)]=h,i[this._hashKey(v,_)]=d,i[this._hashKey(b,w)]=p,this.trianglesLen=0,this._addTriangle(h,d,p,-1,-1,-1);for(let o,a,u=0;u<this._ids.length;u++){const s=this._ids[u],l=t[2*s],c=t[2*s+1];if(u>0&&Math.abs(l-o)<=HD&&Math.abs(c-a)<=HD)continue;if(o=l,a=c,s===h||s===d||s===p)continue;let f=0;for(let t=0,e=this._hashKey(l,c);t<this._hashSize&&(f=i[(e+t)%this._hashSize],-1===f||f===n[f]);t++);f=e[f];let g,m=f;for(;g=n[m],!JD(l,c,t[2*m],t[2*m+1],t[2*g],t[2*g+1]);)if(m=g,m===f){m=-1;break}if(-1===m)continue;let y=this._addTriangle(m,s,n[m],-1,-1,r[m]);r[s]=this._legalize(y+2),r[m]=y,A++;let v=n[m];for(;g=n[v],JD(l,c,t[2*v],t[2*v+1],t[2*g],t[2*g+1]);)y=this._addTriangle(v,s,g,r[s],-1,r[v]),r[s]=this._legalize(y+2),n[v]=v,A--,v=g;if(m===f)for(;g=e[m],JD(l,c,t[2*g],t[2*g+1],t[2*m],t[2*m+1]);)y=this._addTriangle(g,s,m,-1,r[m],r[g]),this._legalize(y+2),r[g]=y,n[m]=m,A--,m=g;this._hullStart=e[s]=m,n[m]=e[v]=s,n[s]=v,i[this._hashKey(l,c)]=s,i[this._hashKey(t[2*m],t[2*m+1])]=m}this.hull=new Uint32Array(A);for(let t=0,e=this._hullStart;t<A;t++)this.hull[t]=e,e=n[e];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,e){return Math.floor(function(t,e){const n=t/(Math.abs(t)+Math.abs(e));return(e>0?3-n:1+n)/4}(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:e,_halfedges:n,coords:r}=this;let i=0,o=0;for(;;){const a=n[t],u=t-t%3;if(o=u+(t+2)%3,-1===a){if(0===i)break;t=YD[--i];continue}const s=a-a%3,l=u+(t+1)%3,c=s+(a+2)%3,f=e[o],h=e[t],d=e[l],p=e[c];if(ZD(r[2*f],r[2*f+1],r[2*h],r[2*h+1],r[2*d],r[2*d+1],r[2*p],r[2*p+1])){e[t]=p,e[a]=f;const r=n[c];if(-1===r){let e=this._hullStart;do{if(this._hullTri[e]===c){this._hullTri[e]=t;break}e=this._hullPrev[e]}while(e!==this._hullStart)}this._link(t,r),this._link(a,n[o]),this._link(o,c);const u=s+(a+1)%3;i<YD.length&&(YD[i++]=u)}else{if(0===i)break;t=YD[--i]}}return o}_link(t,e){this._halfedges[t]=e,-1!==e&&(this._halfedges[e]=t)}_addTriangle(t,e,n,r,i,o){const a=this.trianglesLen;return this._triangles[a]=t,this._triangles[a+1]=e,this._triangles[a+2]=n,this._link(a,r),this._link(a+1,i),this._link(a+2,o),this.trianglesLen+=3,a}}function GD(t,e,n,r){const i=t-n,o=e-r;return i*i+o*o}function XD(t,e,n,r,i,o){const a=(r-e)*(i-t),u=(n-t)*(o-e);return Math.abs(a-u)>=33306690738754716e-32*Math.abs(a+u)?a-u:0}function JD(t,e,n,r,i,o){return(XD(i,o,t,e,n,r)||XD(t,e,n,r,i,o)||XD(n,r,i,o,t,e))<0}function ZD(t,e,n,r,i,o,a,u){const s=t-a,l=e-u,c=n-a,f=r-u,h=i-a,d=o-u,p=c*c+f*f,g=h*h+d*d;return s*(f*g-p*d)-l*(c*g-p*h)+(s*s+l*l)*(c*d-f*h)<0}function QD(t,e,n,r,i,o){const a=n-t,u=r-e,s=i-t,l=o-e,c=a*a+u*u,f=s*s+l*l,h=.5/(a*l-u*s),d=(l*c-u*f)*h,p=(a*f-s*c)*h;return d*d+p*p}function KD(t,e,n,r){if(r-n<=20)for(let i=n+1;i<=r;i++){const r=t[i],o=e[r];let a=i-1;for(;a>=n&&e[t[a]]>o;)t[a+1]=t[a--];t[a+1]=r}else{let i=n+1,o=r;tC(t,n+r>>1,i),e[t[n]]>e[t[r]]&&tC(t,n,r),e[t[i]]>e[t[r]]&&tC(t,i,r),e[t[n]]>e[t[i]]&&tC(t,n,i);const a=t[i],u=e[a];for(;;){do{i++}while(e[t[i]]<u);do{o--}while(e[t[o]]>u);if(o<i)break;tC(t,i,o)}t[n+1]=t[o],t[o]=a,r-i+1>=o-n?(KD(t,e,i,r),KD(t,e,n,o-1)):(KD(t,e,n,o-1),KD(t,e,i,r))}}function tC(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function eC(t){return t[0]}function nC(t){return t[1]}const rC=1e-6;class iC{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,e){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,e){this._+=`L${this._x1=+t},${this._y1=+e}`}arc(t,e,n){const r=(t=+t)+(n=+n),i=e=+e;if(n<0)throw new Error("negative radius");null===this._x1?this._+=`M${r},${i}`:(Math.abs(this._x1-r)>rC||Math.abs(this._y1-i)>rC)&&(this._+="L"+r+","+i),n&&(this._+=`A${n},${n},0,1,1,${t-n},${e}A${n},${n},0,1,1,${this._x1=r},${this._y1=i}`)}rect(t,e,n,r){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${+n}v${+r}h${-n}Z`}value(){return this._||null}}class oC{constructor(){this._=[]}moveTo(t,e){this._.push([t,e])}closePath(){this._.push(this._[0].slice())}lineTo(t,e){this._.push([t,e])}value(){return this._.length?this._:null}}class aC{constructor(t,[e,n,r,i]=[0,0,960,500]){if(!((r=+r)>=(e=+e)&&(i=+i)>=(n=+n)))throw new Error("invalid bounds");this.delaunay=t,this._circumcenters=new Float64Array(2*t.points.length),this.vectors=new Float64Array(2*t.points.length),this.xmax=r,this.xmin=e,this.ymax=i,this.ymin=n,this._init()}update(){return this.delaunay.update(),this._init(),this}_init(){const{delaunay:{points:t,hull:e,triangles:n},vectors:r}=this,i=this.circumcenters=this._circumcenters.subarray(0,n.length/3*2);for(let e,r,o=0,a=0,u=n.length;o<u;o+=3,a+=2){const u=2*n[o],s=2*n[o+1],l=2*n[o+2],c=t[u],f=t[u+1],h=t[s],d=t[s+1],p=t[l],g=t[l+1],m=h-c,y=d-f,v=p-c,_=g-f,x=m*m+y*y,b=v*v+_*_,w=2*(m*_-y*v);if(w)if(Math.abs(w)<1e-8)e=(c+p)/2,r=(f+g)/2;else{const t=1/w;e=c+(_*x-y*b)*t,r=f+(m*b-v*x)*t}else e=(c+p)/2-1e8*_,r=(f+g)/2+1e8*v;i[a]=e,i[a+1]=r}let o,a,u,s=e[e.length-1],l=4*s,c=t[2*s],f=t[2*s+1];r.fill(0);for(let n=0;n<e.length;++n)s=e[n],o=l,a=c,u=f,l=4*s,c=t[2*s],f=t[2*s+1],r[o+2]=r[l]=u-f,r[o+3]=r[l+1]=c-a}render(t){const e=null==t?t=new iC:void 0,{delaunay:{halfedges:n,inedges:r,hull:i},circumcenters:o,vectors:a}=this;if(i.length<=1)return null;for(let e=0,r=n.length;e<r;++e){const r=n[e];if(r<e)continue;const i=2*Math.floor(e/3),a=2*Math.floor(r/3),u=o[i],s=o[i+1],l=o[a],c=o[a+1];this._renderSegment(u,s,l,c,t)}let u,s=i[i.length-1];for(let e=0;e<i.length;++e){u=s,s=i[e];const n=2*Math.floor(r[s]/3),l=o[n],c=o[n+1],f=4*u,h=this._project(l,c,a[f+2],a[f+3]);h&&this._renderSegment(l,c,h[0],h[1],t)}return e&&e.value()}renderBounds(t){const e=null==t?t=new iC:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),e&&e.value()}renderCell(t,e){const n=null==e?e=new iC:void 0,r=this._clip(t);if(null===r||!r.length)return;e.moveTo(r[0],r[1]);let i=r.length;for(;r[0]===r[i-2]&&r[1]===r[i-1]&&i>1;)i-=2;for(let t=2;t<i;t+=2)r[t]===r[t-2]&&r[t+1]===r[t-1]||e.lineTo(r[t],r[t+1]);return e.closePath(),n&&n.value()}*cellPolygons(){const{delaunay:{points:t}}=this;for(let e=0,n=t.length/2;e<n;++e){const t=this.cellPolygon(e);t&&(t.index=e,yield t)}}cellPolygon(t){const e=new oC;return this.renderCell(t,e),e.value()}_renderSegment(t,e,n,r,i){let o;const a=this._regioncode(t,e),u=this._regioncode(n,r);0===a&&0===u?(i.moveTo(t,e),i.lineTo(n,r)):(o=this._clipSegment(t,e,n,r,a,u))&&(i.moveTo(o[0],o[1]),i.lineTo(o[2],o[3]))}contains(t,e,n){return(e=+e)==e&&(n=+n)==n&&this.delaunay._step(t,e,n)===t}*neighbors(t){const e=this._clip(t);if(e)for(const n of this.delaunay.neighbors(t)){const t=this._clip(n);if(t)t:for(let r=0,i=e.length;r<i;r+=2)for(let o=0,a=t.length;o<a;o+=2)if(e[r]==t[o]&&e[r+1]==t[o+1]&&e[(r+2)%i]==t[(o+a-2)%a]&&e[(r+3)%i]==t[(o+a-1)%a]){yield n;break t}}}_cell(t){const{circumcenters:e,delaunay:{inedges:n,halfedges:r,triangles:i}}=this,o=n[t];if(-1===o)return null;const a=[];let u=o;do{const n=Math.floor(u/3);if(a.push(e[2*n],e[2*n+1]),u=u%3==2?u-2:u+1,i[u]!==t)break;u=r[u]}while(u!==o&&-1!==u);return a}_clip(t){if(0===t&&1===this.delaunay.hull.length)return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];const e=this._cell(t);if(null===e)return null;const{vectors:n}=this,r=4*t;return n[r]||n[r+1]?this._clipInfinite(t,e,n[r],n[r+1],n[r+2],n[r+3]):this._clipFinite(t,e)}_clipFinite(t,e){const n=e.length;let r,i,o,a,u,s=null,l=e[n-2],c=e[n-1],f=this._regioncode(l,c);for(let h=0;h<n;h+=2)if(r=l,i=c,l=e[h],c=e[h+1],o=f,f=this._regioncode(l,c),0===o&&0===f)a=u,u=0,s?s.push(l,c):s=[l,c];else{let e,n,h,d,p;if(0===o){if(null===(e=this._clipSegment(r,i,l,c,o,f)))continue;[n,h,d,p]=e}else{if(null===(e=this._clipSegment(l,c,r,i,f,o)))continue;[d,p,n,h]=e,a=u,u=this._edgecode(n,h),a&&u&&this._edge(t,a,u,s,s.length),s?s.push(n,h):s=[n,h]}a=u,u=this._edgecode(d,p),a&&u&&this._edge(t,a,u,s,s.length),s?s.push(d,p):s=[d,p]}if(s)a=u,u=this._edgecode(s[0],s[1]),a&&u&&this._edge(t,a,u,s,s.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return s}_clipSegment(t,e,n,r,i,o){for(;;){if(0===i&&0===o)return[t,e,n,r];if(i&o)return null;let a,u,s=i||o;8&s?(a=t+(n-t)*(this.ymax-e)/(r-e),u=this.ymax):4&s?(a=t+(n-t)*(this.ymin-e)/(r-e),u=this.ymin):2&s?(u=e+(r-e)*(this.xmax-t)/(n-t),a=this.xmax):(u=e+(r-e)*(this.xmin-t)/(n-t),a=this.xmin),i?(t=a,e=u,i=this._regioncode(t,e)):(n=a,r=u,o=this._regioncode(n,r))}}_clipInfinite(t,e,n,r,i,o){let a,u=Array.from(e);if((a=this._project(u[0],u[1],n,r))&&u.unshift(a[0],a[1]),(a=this._project(u[u.length-2],u[u.length-1],i,o))&&u.push(a[0],a[1]),u=this._clipFinite(t,u))for(let e,n=0,r=u.length,i=this._edgecode(u[r-2],u[r-1]);n<r;n+=2)e=i,i=this._edgecode(u[n],u[n+1]),e&&i&&(n=this._edge(t,e,i,u,n),r=u.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(u=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return u}_edge(t,e,n,r,i){for(;e!==n;){let n,o;switch(e){case 5:e=4;continue;case 4:e=6,n=this.xmax,o=this.ymin;break;case 6:e=2;continue;case 2:e=10,n=this.xmax,o=this.ymax;break;case 10:e=8;continue;case 8:e=9,n=this.xmin,o=this.ymax;break;case 9:e=1;continue;case 1:e=5,n=this.xmin,o=this.ymin}r[i]===n&&r[i+1]===o||!this.contains(t,n,o)||(r.splice(i,0,n,o),i+=2)}if(r.length>4)for(let t=0;t<r.length;t+=2){const e=(t+2)%r.length,n=(t+4)%r.length;(r[t]===r[e]&&r[e]===r[n]||r[t+1]===r[e+1]&&r[e+1]===r[n+1])&&(r.splice(e,2),t-=2)}return i}_project(t,e,n,r){let i,o,a,u=1/0;if(r<0){if(e<=this.ymin)return null;(i=(this.ymin-e)/r)<u&&(a=this.ymin,o=t+(u=i)*n)}else if(r>0){if(e>=this.ymax)return null;(i=(this.ymax-e)/r)<u&&(a=this.ymax,o=t+(u=i)*n)}if(n>0){if(t>=this.xmax)return null;(i=(this.xmax-t)/n)<u&&(o=this.xmax,a=e+(u=i)*r)}else if(n<0){if(t<=this.xmin)return null;(i=(this.xmin-t)/n)<u&&(o=this.xmin,a=e+(u=i)*r)}return[o,a]}_edgecode(t,e){return(t===this.xmin?1:t===this.xmax?2:0)|(e===this.ymin?4:e===this.ymax?8:0)}_regioncode(t,e){return(t<this.xmin?1:t>this.xmax?2:0)|(e<this.ymin?4:e>this.ymax?8:0)}}const uC=2*Math.PI,sC=Math.pow;function lC(t){return t[0]}function cC(t){return t[1]}function fC(t,e,n){return[t+Math.sin(t+e)*n,e+Math.cos(t-e)*n]}class hC{static from(t,e=lC,n=cC,r){return new hC("length"in t?function(t,e,n,r){const i=t.length,o=new Float64Array(2*i);for(let a=0;a<i;++a){const i=t[a];o[2*a]=e.call(r,i,a,t),o[2*a+1]=n.call(r,i,a,t)}return o}(t,e,n,r):Float64Array.from(function*(t,e,n,r){let i=0;for(const o of t)yield e.call(r,o,i,t),yield n.call(r,o,i,t),++i}(t,e,n,r)))}constructor(t){this._delaunator=new VD(t),this.inedges=new Int32Array(t.length/2),this._hullIndex=new Int32Array(t.length/2),this.points=this._delaunator.coords,this._init()}update(){return this._delaunator.update(),this._init(),this}_init(){const t=this._delaunator,e=this.points;if(t.hull&&t.hull.length>2&&function(t){const{triangles:e,coords:n}=t;for(let t=0;t<e.length;t+=3){const r=2*e[t],i=2*e[t+1],o=2*e[t+2];if((n[o]-n[r])*(n[i+1]-n[r+1])-(n[i]-n[r])*(n[o+1]-n[r+1])>1e-10)return!1}return!0}(t)){this.collinear=Int32Array.from({length:e.length/2},((t,e)=>e)).sort(((t,n)=>e[2*t]-e[2*n]||e[2*t+1]-e[2*n+1]));const t=this.collinear[0],n=this.collinear[this.collinear.length-1],r=[e[2*t],e[2*t+1],e[2*n],e[2*n+1]],i=1e-8*Math.hypot(r[3]-r[1],r[2]-r[0]);for(let t=0,n=e.length/2;t<n;++t){const n=fC(e[2*t],e[2*t+1],i);e[2*t]=n[0],e[2*t+1]=n[1]}this._delaunator=new VD(e)}else delete this.collinear;const n=this.halfedges=this._delaunator.halfedges,r=this.hull=this._delaunator.hull,i=this.triangles=this._delaunator.triangles,o=this.inedges.fill(-1),a=this._hullIndex.fill(-1);for(let t=0,e=n.length;t<e;++t){const e=i[t%3==2?t-2:t+1];-1!==n[t]&&-1!==o[e]||(o[e]=t)}for(let t=0,e=r.length;t<e;++t)a[r[t]]=t;r.length<=2&&r.length>0&&(this.triangles=new Int32Array(3).fill(-1),this.halfedges=new Int32Array(3).fill(-1),this.triangles[0]=r[0],this.triangles[1]=r[1],this.triangles[2]=r[1],o[r[0]]=1,2===r.length&&(o[r[1]]=0))}voronoi(t){return new aC(this,t)}*neighbors(t){const{inedges:e,hull:n,_hullIndex:r,halfedges:i,triangles:o,collinear:a}=this;if(a){const e=a.indexOf(t);return e>0&&(yield a[e-1]),void(e<a.length-1&&(yield a[e+1]))}const u=e[t];if(-1===u)return;let s=u,l=-1;do{if(yield l=o[s],s=s%3==2?s-2:s+1,o[s]!==t)return;if(s=i[s],-1===s){const e=n[(r[t]+1)%n.length];return void(e!==l&&(yield e))}}while(s!==u)}find(t,e,n=0){if((t=+t)!=t||(e=+e)!=e)return-1;const r=n;let i;for(;(i=this._step(n,t,e))>=0&&i!==n&&i!==r;)n=i;return i}_step(t,e,n){const{inedges:r,hull:i,_hullIndex:o,halfedges:a,triangles:u,points:s}=this;if(-1===r[t]||!s.length)return(t+1)%(s.length>>1);let l=t,c=sC(e-s[2*t],2)+sC(n-s[2*t+1],2);const f=r[t];let h=f;do{let r=u[h];const f=sC(e-s[2*r],2)+sC(n-s[2*r+1],2);if(f<c&&(c=f,l=r),h=h%3==2?h-2:h+1,u[h]!==t)break;if(h=a[h],-1===h){if(h=i[(o[t]+1)%i.length],h!==r&&sC(e-s[2*h],2)+sC(n-s[2*h+1],2)<c)return h;break}}while(h!==f);return l}render(t){const e=null==t?t=new iC:void 0,{points:n,halfedges:r,triangles:i}=this;for(let e=0,o=r.length;e<o;++e){const o=r[e];if(o<e)continue;const a=2*i[e],u=2*i[o];t.moveTo(n[a],n[a+1]),t.lineTo(n[u],n[u+1])}return this.renderHull(t),e&&e.value()}renderPoints(t,e=2){const n=null==t?t=new iC:void 0,{points:r}=this;for(let n=0,i=r.length;n<i;n+=2){const i=r[n],o=r[n+1];t.moveTo(i+e,o),t.arc(i,o,e,0,uC)}return n&&n.value()}renderHull(t){const e=null==t?t=new iC:void 0,{hull:n,points:r}=this,i=2*n[0],o=n.length;t.moveTo(r[i],r[i+1]);for(let e=1;e<o;++e){const i=2*n[e];t.lineTo(r[i],r[i+1])}return t.closePath(),e&&e.value()}hullPolygon(){const t=new oC;return this.renderHull(t),t.value()}renderTriangle(t,e){const n=null==e?e=new iC:void 0,{points:r,triangles:i}=this,o=2*i[t*=3],a=2*i[t+1],u=2*i[t+2];return e.moveTo(r[o],r[o+1]),e.lineTo(r[a],r[a+1]),e.lineTo(r[u],r[u+1]),e.closePath(),n&&n.value()}*trianglePolygons(){const{triangles:t}=this;for(let e=0,n=t.length/3;e<n;++e)yield this.trianglePolygon(e)}trianglePolygon(t){const e=new oC;return this.renderTriangle(t,e),e.value()}}function dC(t){ga.call(this,null,t)}dC.Definition={type:"Voronoi",metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],content:{type:"number",array:!0,length:2}},{name:"as",type:"string",default:"path"}]};const pC=[-1e5,-1e5,1e5,1e5];function gC(t){const e=t[0][0],n=t[0][1];let r=t.length-1;for(;t[r][0]===e&&t[r][1]===n;--r);return"M"+t.slice(0,r+1).join("L")+"Z"}st(dC,ga,{transform(t,e){const n=t.as||"path",r=e.source;if(!r||!r.length)return e;let i=t.size;i=i?[0,0,i[0],i[1]]:(i=t.extent)?[i[0][0],i[0][1],i[1][0],i[1][1]]:pC;const o=this.value=hC.from(r,t.x,t.y).voronoi(i);for(let t=0,e=r.length;t<e;++t){const e=o.cellPolygon(t);r[t][n]=e?gC(e):null}return e.reflow(t.modified()).modifies(n)}});var mC=Object.freeze({__proto__:null,voronoi:dC}),yC=Math.PI/180,vC=2048;function _C(){var t,e,n,r,i,o,a,u=[256,256],s=AC,l=[],c=Math.random,f={};function h(t,e,n){for(var r,i,o,a=e.x,l=e.y,f=Math.sqrt(u[0]*u[0]+u[1]*u[1]),h=s(u),d=c()<.5?1:-1,p=-d;(r=h(p+=d))&&(i=~~r[0],o=~~r[1],!(Math.min(Math.abs(i),Math.abs(o))>=f));)if(e.x=a+i,e.y=l+o,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>u[0]||e.y+e.y1>u[1])&&(!n||!bC(e,t,u[0]))&&(!n||kC(e,n))){for(var g,m=e.sprite,y=e.width>>5,v=u[0]>>5,_=e.x-(y<<4),x=127&_,b=32-x,w=e.y1-e.y0,k=(e.y+e.y0)*v+(_>>5),A=0;A<w;A++){g=0;for(var M=0;M<=y;M++)t[k+M]|=g<<b|(M<y?(g=m[A*y+M])>>>x:0);k+=v}return e.sprite=null,!0}return!1}return f.layout=function(){for(var s=function(t){t.width=t.height=1;var e=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2);t.width=2048/e,t.height=vC/e;var n=t.getContext("2d");return n.fillStyle=n.strokeStyle="red",n.textAlign="center",{context:n,ratio:e}}(Xl()),f=function(t){var e=[],n=-1;for(;++n<t;)e[n]=0;return e}((u[0]>>5)*u[1]),d=null,p=l.length,g=-1,m=[],y=l.map((u=>({text:t(u),font:e(u),style:r(u),weight:i(u),rotate:o(u),size:~~(n(u)+1e-14),padding:a(u),xoff:0,yoff:0,x1:0,y1:0,x0:0,y0:0,hasText:!1,sprite:null,datum:u}))).sort(((t,e)=>e.size-t.size));++g<p;){var v=y[g];v.x=u[0]*(c()+.5)>>1,v.y=u[1]*(c()+.5)>>1,xC(s,v,y,g),v.hasText&&h(f,v,d)&&(m.push(v),d?wC(d,v):d=[{x:v.x+v.x0,y:v.y+v.y0},{x:v.x+v.x1,y:v.y+v.y1}],v.x-=u[0]>>1,v.y-=u[1]>>1)}return m},f.words=function(t){return arguments.length?(l=t,f):l},f.size=function(t){return arguments.length?(u=[+t[0],+t[1]],f):u},f.font=function(t){return arguments.length?(e=MC(t),f):e},f.fontStyle=function(t){return arguments.length?(r=MC(t),f):r},f.fontWeight=function(t){return arguments.length?(i=MC(t),f):i},f.rotate=function(t){return arguments.length?(o=MC(t),f):o},f.text=function(e){return arguments.length?(t=MC(e),f):t},f.spiral=function(t){return arguments.length?(s=EC[t]||t,f):s},f.fontSize=function(t){return arguments.length?(n=MC(t),f):n},f.padding=function(t){return arguments.length?(a=MC(t),f):a},f.random=function(t){return arguments.length?(c=t,f):c},f}function xC(t,e,n,r){if(!e.sprite){var i=t.context,o=t.ratio;i.clearRect(0,0,2048/o,vC/o);var a,u,s,l,c,f=0,h=0,d=0,p=n.length;for(--r;++r<p;){if(e=n[r],i.save(),i.font=e.style+" "+e.weight+" "+~~((e.size+1)/o)+"px "+e.font,a=i.measureText(e.text+"m").width*o,s=e.size<<1,e.rotate){var g=Math.sin(e.rotate*yC),m=Math.cos(e.rotate*yC),y=a*m,v=a*g,_=s*m,x=s*g;a=Math.max(Math.abs(y+x),Math.abs(y-x))+31>>5<<5,s=~~Math.max(Math.abs(v+_),Math.abs(v-_))}else a=a+31>>5<<5;if(s>d&&(d=s),f+a>=2048&&(f=0,h+=d,d=0),h+s>=vC)break;i.translate((f+(a>>1))/o,(h+(s>>1))/o),e.rotate&&i.rotate(e.rotate*yC),i.fillText(e.text,0,0),e.padding&&(i.lineWidth=2*e.padding,i.strokeText(e.text,0,0)),i.restore(),e.width=a,e.height=s,e.xoff=f,e.yoff=h,e.x1=a>>1,e.y1=s>>1,e.x0=-e.x1,e.y0=-e.y1,e.hasText=!0,f+=a}for(var b=i.getImageData(0,0,2048/o,vC/o).data,w=[];--r>=0;)if((e=n[r]).hasText){for(u=(a=e.width)>>5,s=e.y1-e.y0,l=0;l<s*u;l++)w[l]=0;if(null==(f=e.xoff))return;h=e.yoff;var k=0,A=-1;for(c=0;c<s;c++){for(l=0;l<a;l++){var M=u*c+(l>>5),E=b[2048*(h+c)+(f+l)<<2]?1<<31-l%32:0;w[M]|=E,k|=E}k?A=c:(e.y0++,s--,c--,h++)}e.y1=e.y0+A,e.sprite=w.slice(0,(e.y1-e.y0)*u)}}}function bC(t,e,n){n>>=5;for(var r,i=t.sprite,o=t.width>>5,a=t.x-(o<<4),u=127&a,s=32-u,l=t.y1-t.y0,c=(t.y+t.y0)*n+(a>>5),f=0;f<l;f++){r=0;for(var h=0;h<=o;h++)if((r<<s|(h<o?(r=i[f*o+h])>>>u:0))&e[c+h])return!0;c+=n}return!1}function wC(t,e){var n=t[0],r=t[1];e.x+e.x0<n.x&&(n.x=e.x+e.x0),e.y+e.y0<n.y&&(n.y=e.y+e.y0),e.x+e.x1>r.x&&(r.x=e.x+e.x1),e.y+e.y1>r.y&&(r.y=e.y+e.y1)}function kC(t,e){return t.x+t.x1>e[0].x&&t.x+t.x0<e[1].x&&t.y+t.y1>e[0].y&&t.y+t.y0<e[1].y}function AC(t){var e=t[0]/t[1];return function(t){return[e*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function MC(t){return"function"==typeof t?t:function(){return t}}var EC={archimedean:AC,rectangular:function(t){var e=4*t[0]/t[1],n=0,r=0;return function(t){var i=t<0?-1:1;switch(Math.sqrt(1+4*i*t)-i&3){case 0:n+=e;break;case 1:r+=4;break;case 2:n-=e;break;default:r-=4}return[n,r]}}};const DC=["x","y","font","fontSize","fontStyle","fontWeight","angle"],CC=["text","font","rotate","fontSize","fontStyle","fontWeight"];function FC(t){ga.call(this,_C(),t)}FC.Definition={type:"Wordcloud",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2},{name:"font",type:"string",expr:!0,default:"sans-serif"},{name:"fontStyle",type:"string",expr:!0,default:"normal"},{name:"fontWeight",type:"string",expr:!0,default:"normal"},{name:"fontSize",type:"number",expr:!0,default:14},{name:"fontSizeRange",type:"number",array:"nullable",default:[10,50]},{name:"rotate",type:"number",expr:!0,default:0},{name:"text",type:"field"},{name:"spiral",type:"string",values:["archimedean","rectangular"]},{name:"padding",type:"number",expr:!0},{name:"as",type:"string",array:!0,length:7,default:DC}]},st(FC,ga,{transform(e,n){!e.size||e.size[0]&&e.size[1]||s("Wordcloud size dimensions must be non-zero.");const r=e.modified();if(!(r||n.changed(n.ADD_REM)||CC.some((function(t){const r=e[t];return Y(r)&&n.modified(r.fields)}))))return;const i=n.materialize(n.SOURCE).source,o=this.value,a=e.as||DC;let u,l=e.fontSize||14;if(Y(l)?u=e.fontSizeRange:l=Q(l),u){const t=l,e=pd("sqrt")().domain(et(i,t)).range(u);l=n=>e(t(n))}i.forEach((t=>{t[a[0]]=NaN,t[a[1]]=NaN,t[a[3]]=0}));const c=o.words(i).text(e.text).size(e.size||[500,500]).padding(e.padding||1).spiral(e.spiral||"archimedean").rotate(e.rotate||0).font(e.font||"sans-serif").fontStyle(e.fontStyle||"normal").fontWeight(e.fontWeight||"normal").fontSize(l).random(t.random).layout(),f=o.size(),h=f[0]>>1,d=f[1]>>1,p=c.length;for(let t,e,n=0;n<p;++n)t=c[n],e=t.datum,e[a[0]]=t.x+h,e[a[1]]=t.y+d,e[a[2]]=t.font,e[a[3]]=t.size,e[a[4]]=t.style,e[a[5]]=t.weight,e[a[6]]=t.rotate;return n.reflow(r).modifies(a)}});var SC=Object.freeze({__proto__:null,wordcloud:FC});const BC=t=>new Uint8Array(t),TC=t=>new Uint16Array(t),zC=t=>new Uint32Array(t);function NC(t,e,n){const r=(e<257?BC:e<65537?TC:zC)(t);return n&&r.set(n),r}function OC(t,e,n){const r=1<<e;return{one:r,zero:~r,range:n.slice(),bisect:t.bisect,index:t.index,size:t.size,onAdd(t,e){const n=this,i=n.bisect(n.range,t.value),o=t.index,a=i[0],u=i[1],s=o.length;let l;for(l=0;l<a;++l)e[o[l]]|=r;for(l=u;l<s;++l)e[o[l]]|=r;return n}}}function RC(){let t=zC(0),e=[],n=0;return{insert:function(r,i,o){if(!i.length)return[];const a=n,u=i.length,s=zC(u);let l,c,f,h=Array(u);for(f=0;f<u;++f)h[f]=r(i[f]),s[f]=f;if(h=function(t,e){return t.sort.call(e,((e,n)=>{const r=t[e],i=t[n];return r<i?-1:r>i?1:0})),function(t,e){return Array.from(e,(e=>t[e]))}(t,e)}(h,s),a)l=e,c=t,e=Array(a+u),t=zC(a+u),function(t,e,n,r,i,o,a,u,s){let l,c=0,f=0;for(l=0;c<r&&f<a;++l)e[c]<i[f]?(u[l]=e[c],s[l]=n[c++]):(u[l]=i[f],s[l]=o[f++]+t);for(;c<r;++c,++l)u[l]=e[c],s[l]=n[c];for(;f<a;++f,++l)u[l]=i[f],s[l]=o[f]+t}(o,l,c,a,h,s,u,e,t);else{if(o>0)for(f=0;f<u;++f)s[f]+=o;e=h,t=s}return n=a+u,{index:s,value:h}},remove:function(r,i){const o=n;let a,u,s;for(u=0;!i[t[u]]&&u<o;++u);for(s=u;u<o;++u)i[a=t[u]]||(t[s]=a,e[s]=e[u],++s);n=o-r},bisect:function(t,r){let i;return r?i=r.length:(r=e,i=n),[Zt(r,t[0],0,i),Jt(r,t[1],0,i)]},reindex:function(e){for(let r=0,i=n;r<i;++r)t[r]=e[t[r]]},index:()=>t,size:()=>n}}function $C(t){ga.call(this,function(){let t=8,e=[],n=zC(0),r=NC(0,t),i=NC(0,t);return{data:()=>e,seen:()=>n=function(t,e,n){return t.length>=e?t:((n=n||new t.constructor(e)).set(t),n)}(n,e.length),add(t){for(let n,r=0,i=e.length,o=t.length;r<o;++r)n=t[r],n._index=i++,e.push(n)},remove(t,n){const o=e.length,a=Array(o-t),u=e;let s,l,c;for(l=0;!n[l]&&l<o;++l)a[l]=e[l],u[l]=l;for(c=l;l<o;++l)s=e[l],n[l]?u[l]=-1:(u[l]=c,r[c]=r[l],i[c]=i[l],a[c]=s,s._index=c++),r[l]=0;return e=a,u},size:()=>e.length,curr:()=>r,prev:()=>i,reset:t=>i[t]=r[t],all:()=>t<257?255:t<65537?65535:4294967295,set(t,e){r[t]|=e},clear(t,e){r[t]&=~e},resize(e,n){(e>r.length||n>t)&&(t=Math.max(n,t),r=NC(e,t,r),i=NC(e,t))}}}(),t),this._indices=null,this._dims=null}function qC(t){ga.call(this,null,t)}$C.Definition={type:"CrossFilter",metadata:{},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"query",type:"array",array:!0,required:!0,content:{type:"number",array:!0,length:2}}]},st($C,ga,{transform(t,e){return this._dims?t.modified("fields")||t.fields.some((t=>e.modified(t.fields)))?this.reinit(t,e):this.eval(t,e):this.init(t,e)},init(t,e){const n=t.fields,r=t.query,i=this._indices={},o=this._dims=[],a=r.length;let u,s,l=0;for(;l<a;++l)u=n[l].fname,s=i[u]||(i[u]=RC()),o.push(OC(s,l,r[l]));return this.eval(t,e)},reinit(t,e){const n=e.materialize().fork(),r=t.fields,i=t.query,o=this._indices,a=this._dims,u=this.value,s=u.curr(),l=u.prev(),c=u.all(),f=n.rem=n.add,h=n.mod,d=i.length,p={};let g,m,y,v,_,x,b,w,k;if(l.set(s),e.rem.length&&(_=this.remove(t,e,n)),e.add.length&&u.add(e.add),e.mod.length)for(x={},v=e.mod,b=0,w=v.length;b<w;++b)x[v[b]._index]=1;for(b=0;b<d;++b)k=r[b],(!a[b]||t.modified("fields",b)||e.modified(k.fields))&&(y=k.fname,(g=p[y])||(o[y]=m=RC(),p[y]=g=m.insert(k,e.source,0)),a[b]=OC(m,b,i[b]).onAdd(g,s));for(b=0,w=u.data().length;b<w;++b)_[b]||(l[b]!==s[b]?f.push(b):x[b]&&s[b]!==c&&h.push(b));return u.mask=(1<<d)-1,n},eval(t,e){const n=e.materialize().fork(),r=this._dims.length;let i=0;return e.rem.length&&(this.remove(t,e,n),i|=(1<<r)-1),t.modified("query")&&!t.modified("fields")&&(i|=this.update(t,e,n)),e.add.length&&(this.insert(t,e,n),i|=(1<<r)-1),e.mod.length&&(this.modify(e,n),i|=(1<<r)-1),this.value.mask=i,n},insert(t,e,n){const r=e.add,i=this.value,o=this._dims,a=this._indices,u=t.fields,s={},l=n.add,c=i.size()+r.length,f=o.length;let h,d,p,g=i.size();i.resize(c,f),i.add(r);const m=i.curr(),y=i.prev(),v=i.all();for(h=0;h<f;++h)d=u[h].fname,p=s[d]||(s[d]=a[d].insert(u[h],r,g)),o[h].onAdd(p,m);for(;g<c;++g)y[g]=v,m[g]!==v&&l.push(g)},modify(t,e){const n=e.mod,r=this.value,i=r.curr(),o=r.all(),a=t.mod;let u,s,l;for(u=0,s=a.length;u<s;++u)l=a[u]._index,i[l]!==o&&n.push(l)},remove(t,e,n){const r=this._indices,i=this.value,o=i.curr(),a=i.prev(),u=i.all(),s={},l=n.rem,c=e.rem;let f,h,d,p;for(f=0,h=c.length;f<h;++f)d=c[f]._index,s[d]=1,a[d]=p=o[d],o[d]=u,p!==u&&l.push(d);for(d in r)r[d].remove(h,s);return this.reindex(e,h,s),s},reindex(t,e,n){const r=this._indices,i=this.value;t.runAfter((()=>{const t=i.remove(e,n);for(const e in r)r[e].reindex(t)}))},update(t,e,n){const r=this._dims,i=t.query,o=e.stamp,a=r.length;let u,s,l=0;for(n.filters=0,s=0;s<a;++s)t.modified("query",s)&&(u=s,++l);if(1===l)l=r[u].one,this.incrementOne(r[u],i[u],n.add,n.rem);else for(s=0,l=0;s<a;++s)t.modified("query",s)&&(l|=r[s].one,this.incrementAll(r[s],i[s],o,n.add),n.rem=n.add);return l},incrementAll(t,e,n,r){const i=this.value,o=i.seen(),a=i.curr(),u=i.prev(),s=t.index(),l=t.bisect(t.range),c=t.bisect(e),f=c[0],h=c[1],d=l[0],p=l[1],g=t.one;let m,y,v;if(f<d)for(m=f,y=Math.min(d,h);m<y;++m)v=s[m],o[v]!==n&&(u[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;else if(f>d)for(m=d,y=Math.min(f,p);m<y;++m)v=s[m],o[v]!==n&&(u[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;if(h>p)for(m=Math.max(f,p),y=h;m<y;++m)v=s[m],o[v]!==n&&(u[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;else if(h<p)for(m=Math.max(d,h),y=p;m<y;++m)v=s[m],o[v]!==n&&(u[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;t.range=e.slice()},incrementOne(t,e,n,r){const i=this.value.curr(),o=t.index(),a=t.bisect(t.range),u=t.bisect(e),s=u[0],l=u[1],c=a[0],f=a[1],h=t.one;let d,p,g;if(s<c)for(d=s,p=Math.min(c,l);d<p;++d)g=o[d],i[g]^=h,n.push(g);else if(s>c)for(d=c,p=Math.min(s,f);d<p;++d)g=o[d],i[g]^=h,r.push(g);if(l>f)for(d=Math.max(s,f),p=l;d<p;++d)g=o[d],i[g]^=h,n.push(g);else if(l<f)for(d=Math.max(c,l),p=f;d<p;++d)g=o[d],i[g]^=h,r.push(g);t.range=e.slice()}}),qC.Definition={type:"ResolveFilter",metadata:{},params:[{name:"ignore",type:"number",required:!0,description:"A bit mask indicating which filters to ignore."},{name:"filter",type:"object",required:!0,description:"Per-tuple filter bitmaps from a CrossFilter transform."}]},st(qC,ga,{transform(t,e){const n=~(t.ignore||0),r=t.filter,i=r.mask;if(0==(i&n))return e.StopPropagation;const o=e.fork(e.ALL),a=r.data(),u=r.curr(),s=r.prev(),l=t=>u[t]&n?null:a[t];return o.filter(o.MOD,l),i&i-1?(o.filter(o.ADD,(t=>{const e=u[t]&n;return!e&&e^s[t]&n?a[t]:null})),o.filter(o.REM,(t=>{const e=u[t]&n;return e&&!(e^e^s[t]&n)?a[t]:null}))):(o.filter(o.ADD,l),o.filter(o.REM,(t=>(u[t]&n)===i?a[t]:null))),o.filter(o.SOURCE,(t=>l(t._index)))}});var LC=Object.freeze({__proto__:null,crossfilter:$C,resolvefilter:qC});const UC="RawCode",PC="Literal",jC="Property",IC="Identifier",WC="ArrayExpression",HC="BinaryExpression",YC="CallExpression",VC="ConditionalExpression",GC="LogicalExpression",XC="MemberExpression",JC="ObjectExpression",ZC="UnaryExpression";function QC(t){this.type=t}var KC,tF,eF,nF,rF;QC.prototype.visit=function(t){let e,n,r;if(t(this))return 1;for(e=function(t){switch(t.type){case WC:return t.elements;case HC:case GC:return[t.left,t.right];case YC:return[t.callee].concat(t.arguments);case VC:return[t.test,t.consequent,t.alternate];case XC:return[t.object,t.property];case JC:return t.properties;case jC:return[t.key,t.value];case ZC:return[t.argument];case IC:case PC:case UC:default:return[]}}(this),n=0,r=e.length;n<r;++n)if(e[n].visit(t))return 1};(KC={})[1]="Boolean",KC[2]="<end>",KC[3]="Identifier",KC[4]="Keyword",KC[5]="Null",KC[6]="Numeric",KC[7]="Punctuator",KC[8]="String",KC[9]="RegularExpression";var iF="Identifier",oF="Unexpected token %0",aF="Invalid regular expression",uF="Invalid regular expression: missing /",sF="Octal literals are not allowed in strict mode.",lF="ILLEGAL",cF="Disabled.",fF=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),hF=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");function dF(t,e){if(!t)throw new Error("ASSERT: "+e)}function pF(t){return t>=48&&t<=57}function gF(t){return"0123456789abcdefABCDEF".indexOf(t)>=0}function mF(t){return"01234567".indexOf(t)>=0}function yF(t){return 32===t||9===t||11===t||12===t||160===t||t>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(t)>=0}function vF(t){return 10===t||13===t||8232===t||8233===t}function _F(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||92===t||t>=128&&fF.test(String.fromCharCode(t))}function xF(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||92===t||t>=128&&hF.test(String.fromCharCode(t))}const bF={if:1,in:1,do:1,var:1,for:1,new:1,try:1,let:1,this:1,else:1,case:1,void:1,with:1,enum:1,while:1,break:1,catch:1,throw:1,const:1,yield:1,class:1,super:1,return:1,typeof:1,delete:1,switch:1,export:1,import:1,public:1,static:1,default:1,finally:1,extends:1,package:1,private:1,function:1,continue:1,debugger:1,interface:1,protected:1,instanceof:1,implements:1};function wF(){for(;eF<nF;){const t=tF.charCodeAt(eF);if(!yF(t)&&!vF(t))break;++eF}}function kF(t){var e,n,r,i=0;for(n="u"===t?4:2,e=0;e<n;++e)eF<nF&&gF(tF[eF])?(r=tF[eF++],i=16*i+"0123456789abcdef".indexOf(r.toLowerCase())):LF({},oF,lF);return String.fromCharCode(i)}function AF(){var t,e,n,r;for(e=0,"}"===(t=tF[eF])&&LF({},oF,lF);eF<nF&&gF(t=tF[eF++]);)e=16*e+"0123456789abcdef".indexOf(t.toLowerCase());return(e>1114111||"}"!==t)&&LF({},oF,lF),e<=65535?String.fromCharCode(e):(n=55296+(e-65536>>10),r=56320+(e-65536&1023),String.fromCharCode(n,r))}function MF(){var t,e;for(t=tF.charCodeAt(eF++),e=String.fromCharCode(t),92===t&&(117!==tF.charCodeAt(eF)&&LF({},oF,lF),++eF,(t=kF("u"))&&"\\"!==t&&_F(t.charCodeAt(0))||LF({},oF,lF),e=t);eF<nF&&xF(t=tF.charCodeAt(eF));)++eF,e+=String.fromCharCode(t),92===t&&(e=e.substr(0,e.length-1),117!==tF.charCodeAt(eF)&&LF({},oF,lF),++eF,(t=kF("u"))&&"\\"!==t&&xF(t.charCodeAt(0))||LF({},oF,lF),e+=t);return e}function EF(){var t,e;return t=eF,{type:1===(e=92===tF.charCodeAt(eF)?MF():function(){var t,e;for(t=eF++;eF<nF;){if(92===(e=tF.charCodeAt(eF)))return eF=t,MF();if(!xF(e))break;++eF}return tF.slice(t,eF)}()).length?3:bF.hasOwnProperty(e)?4:"null"===e?5:"true"===e||"false"===e?1:3,value:e,start:t,end:eF}}function DF(){var t,e,n,r,i=eF,o=tF.charCodeAt(eF),a=tF[eF];switch(o){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++eF,{type:7,value:String.fromCharCode(o),start:i,end:eF};default:if(61===(t=tF.charCodeAt(eF+1)))switch(o){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return eF+=2,{type:7,value:String.fromCharCode(o)+String.fromCharCode(t),start:i,end:eF};case 33:case 61:return eF+=2,61===tF.charCodeAt(eF)&&++eF,{type:7,value:tF.slice(i,eF),start:i,end:eF}}}return">>>="===(r=tF.substr(eF,4))?{type:7,value:r,start:i,end:eF+=4}:">>>"===(n=r.substr(0,3))||"<<="===n||">>="===n?{type:7,value:n,start:i,end:eF+=3}:a===(e=n.substr(0,2))[1]&&"+-<>&|".indexOf(a)>=0||"=>"===e?{type:7,value:e,start:i,end:eF+=2}:("//"===e&&LF({},oF,lF),"<>=!+-*%&|^/".indexOf(a)>=0?{type:7,value:a,start:i,end:++eF}:void LF({},oF,lF))}function CF(){var t,e,n;if(dF(pF((n=tF[eF]).charCodeAt(0))||"."===n,"Numeric literal must start with a decimal digit or a decimal point"),e=eF,t="","."!==n){if(t=tF[eF++],n=tF[eF],"0"===t){if("x"===n||"X"===n)return++eF,function(t){let e="";for(;eF<nF&&gF(tF[eF]);)e+=tF[eF++];return 0===e.length&&LF({},oF,lF),_F(tF.charCodeAt(eF))&&LF({},oF,lF),{type:6,value:parseInt("0x"+e,16),start:t,end:eF}}(e);if(mF(n))return function(t){let e="0"+tF[eF++];for(;eF<nF&&mF(tF[eF]);)e+=tF[eF++];return(_F(tF.charCodeAt(eF))||pF(tF.charCodeAt(eF)))&&LF({},oF,lF),{type:6,value:parseInt(e,8),octal:!0,start:t,end:eF}}(e);n&&pF(n.charCodeAt(0))&&LF({},oF,lF)}for(;pF(tF.charCodeAt(eF));)t+=tF[eF++];n=tF[eF]}if("."===n){for(t+=tF[eF++];pF(tF.charCodeAt(eF));)t+=tF[eF++];n=tF[eF]}if("e"===n||"E"===n)if(t+=tF[eF++],"+"!==(n=tF[eF])&&"-"!==n||(t+=tF[eF++]),pF(tF.charCodeAt(eF)))for(;pF(tF.charCodeAt(eF));)t+=tF[eF++];else LF({},oF,lF);return _F(tF.charCodeAt(eF))&&LF({},oF,lF),{type:6,value:parseFloat(t),start:e,end:eF}}function FF(){var t,e,n,r;return rF=null,wF(),t=eF,e=function(){var t,e,n,r;for(dF("/"===(t=tF[eF]),"Regular expression literal must start with a slash"),e=tF[eF++],n=!1,r=!1;eF<nF;)if(e+=t=tF[eF++],"\\"===t)vF((t=tF[eF++]).charCodeAt(0))&&LF({},uF),e+=t;else if(vF(t.charCodeAt(0)))LF({},uF);else if(n)"]"===t&&(n=!1);else{if("/"===t){r=!0;break}"["===t&&(n=!0)}return r||LF({},uF),{value:e.substr(1,e.length-2),literal:e}}(),n=function(){var t,e,n;for(e="",n="";eF<nF&&xF((t=tF[eF]).charCodeAt(0));)++eF,"\\"===t&&eF<nF?LF({},oF,lF):(n+=t,e+=t);return n.search(/[^gimuy]/g)>=0&&LF({},aF,n),{value:n,literal:e}}(),r=function(t,e){let n=t;e.indexOf("u")>=0&&(n=n.replace(/\\u\{([0-9a-fA-F]+)\}/g,((t,e)=>{if(parseInt(e,16)<=1114111)return"x";LF({},aF)})).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"));try{new RegExp(n)}catch(t){LF({},aF)}try{return new RegExp(t,e)}catch(t){return null}}(e.value,n.value),{literal:e.literal+n.literal,value:r,regex:{pattern:e.value,flags:n.value},start:t,end:eF}}function SF(){if(wF(),eF>=nF)return{type:2,start:eF,end:eF};const t=tF.charCodeAt(eF);return _F(t)?EF():40===t||41===t||59===t?DF():39===t||34===t?function(){var t,e,n,r,i="",o=!1;for(dF("'"===(t=tF[eF])||'"'===t,"String literal must starts with a quote"),e=eF,++eF;eF<nF;){if((n=tF[eF++])===t){t="";break}if("\\"===n)if((n=tF[eF++])&&vF(n.charCodeAt(0)))"\r"===n&&"\n"===tF[eF]&&++eF;else switch(n){case"u":case"x":"{"===tF[eF]?(++eF,i+=AF()):i+=kF(n);break;case"n":i+="\n";break;case"r":i+="\r";break;case"t":i+="\t";break;case"b":i+="\b";break;case"f":i+="\f";break;case"v":i+="\v";break;default:mF(n)?(0!==(r="01234567".indexOf(n))&&(o=!0),eF<nF&&mF(tF[eF])&&(o=!0,r=8*r+"01234567".indexOf(tF[eF++]),"0123".indexOf(n)>=0&&eF<nF&&mF(tF[eF])&&(r=8*r+"01234567".indexOf(tF[eF++]))),i+=String.fromCharCode(r)):i+=n}else{if(vF(n.charCodeAt(0)))break;i+=n}}return""!==t&&LF({},oF,lF),{type:8,value:i,octal:o,start:e,end:eF}}():46===t?pF(tF.charCodeAt(eF+1))?CF():DF():pF(t)?CF():DF()}function BF(){const t=rF;return eF=t.end,rF=SF(),eF=t.end,t}function TF(){const t=eF;rF=SF(),eF=t}function zF(t,e,n){const r=new QC("||"===t||"&&"===t?"LogicalExpression":"BinaryExpression");return r.operator=t,r.left=e,r.right=n,r}function NF(t,e){const n=new QC("CallExpression");return n.callee=t,n.arguments=e,n}function OF(t){const e=new QC(iF);return e.name=t,e}function RF(t){const e=new QC("Literal");return e.value=t.value,e.raw=tF.slice(t.start,t.end),t.regex&&("//"===e.raw&&(e.raw="/(?:)/"),e.regex=t.regex),e}function $F(t,e,n){const r=new QC("MemberExpression");return r.computed="["===t,r.object=e,r.property=n,r.computed||(n.member=!0),r}function qF(t,e,n){const r=new QC("Property");return r.key=e,r.value=n,r.kind=t,r}function LF(t,e){var n,r=Array.prototype.slice.call(arguments,2),i=e.replace(/%(\d)/g,((t,e)=>(dF(e<r.length,"Message reference must be in range"),r[e])));throw(n=new Error(i)).index=eF,n.description=i,n}function UF(t){2===t.type&&LF(t,"Unexpected end of input"),6===t.type&&LF(t,"Unexpected number"),8===t.type&&LF(t,"Unexpected string"),3===t.type&&LF(t,"Unexpected identifier"),4===t.type&&LF(t,"Unexpected reserved word"),LF(t,oF,t.value)}function PF(t){const e=BF();7===e.type&&e.value===t||UF(e)}function jF(t){return 7===rF.type&&rF.value===t}function IF(t){return 4===rF.type&&rF.value===t}function WF(){const t=[];for(eF=rF.start,PF("[");!jF("]");)jF(",")?(BF(),t.push(null)):(t.push(nS()),jF("]")||PF(","));return BF(),function(t){const e=new QC("ArrayExpression");return e.elements=t,e}(t)}function HF(){eF=rF.start;const t=BF();return 8===t.type||6===t.type?(t.octal&&LF(t,sF),RF(t)):OF(t.value)}function YF(){var t,e,n;return eF=rF.start,3===(t=rF).type?(n=HF(),PF(":"),qF("init",n,nS())):2!==t.type&&7!==t.type?(e=HF(),PF(":"),qF("init",e,nS())):void UF(t)}function VF(){var t,e,n=[],r={},i=String;for(eF=rF.start,PF("{");!jF("}");)e="$"+((t=YF()).key.type===iF?t.key.name:i(t.key.value)),Object.prototype.hasOwnProperty.call(r,e)?LF({},"Duplicate data property in object literal not allowed in strict mode"):r[e]=!0,n.push(t),jF("}")||PF(",");return PF("}"),function(t){const e=new QC("ObjectExpression");return e.properties=t,e}(n)}const GF={if:1};function XF(){var t,e,n;if(jF("("))return function(){PF("(");const t=rS();return PF(")"),t}();if(jF("["))return WF();if(jF("{"))return VF();if(t=rF.type,eF=rF.start,3===t||GF[rF.value])n=OF(BF().value);else if(8===t||6===t)rF.octal&&LF(rF,sF),n=RF(BF());else{if(4===t)throw new Error(cF);1===t?((e=BF()).value="true"===e.value,n=RF(e)):5===t?((e=BF()).value=null,n=RF(e)):jF("/")||jF("/=")?(n=RF(FF()),TF()):UF(BF())}return n}function JF(){const t=[];if(PF("("),!jF(")"))for(;eF<nF&&(t.push(nS()),!jF(")"));)PF(",");return PF(")"),t}function ZF(){return PF("."),function(){eF=rF.start;const t=BF();return function(t){return 3===t.type||4===t.type||1===t.type||5===t.type}(t)||UF(t),OF(t.value)}()}function QF(){PF("[");const t=rS();return PF("]"),t}function KF(){const t=function(){var t;for(t=XF();;)if(jF("."))t=$F(".",t,ZF());else if(jF("("))t=NF(t,JF());else{if(!jF("["))break;t=$F("[",t,QF())}return t}();if(7===rF.type&&(jF("++")||jF("--")))throw new Error(cF);return t}function tS(){var t,e;if(7!==rF.type&&4!==rF.type)e=KF();else{if(jF("++")||jF("--"))throw new Error(cF);if(jF("+")||jF("-")||jF("~")||jF("!"))t=BF(),e=tS(),e=function(t,e){const n=new QC("UnaryExpression");return n.operator=t,n.argument=e,n.prefix=!0,n}(t.value,e);else{if(IF("delete")||IF("void")||IF("typeof"))throw new Error(cF);e=KF()}}return e}function eS(t){let e=0;if(7!==t.type&&4!==t.type)return 0;switch(t.value){case"||":e=1;break;case"&&":e=2;break;case"|":e=3;break;case"^":e=4;break;case"&":e=5;break;case"==":case"!=":case"===":case"!==":e=6;break;case"<":case">":case"<=":case">=":case"instanceof":case"in":e=7;break;case"<<":case">>":case">>>":e=8;break;case"+":case"-":e=9;break;case"*":case"/":case"%":e=11}return e}function nS(){var t,e;return t=function(){var t,e,n,r,i,o,a,u,s,l;if(t=rF,s=tS(),0===(i=eS(r=rF)))return s;for(r.prec=i,BF(),e=[t,rF],o=[s,r,a=tS()];(i=eS(rF))>0;){for(;o.length>2&&i<=o[o.length-2].prec;)a=o.pop(),u=o.pop().value,s=o.pop(),e.pop(),n=zF(u,s,a),o.push(n);(r=BF()).prec=i,o.push(r),e.push(rF),n=tS(),o.push(n)}for(n=o[l=o.length-1],e.pop();l>1;)e.pop(),n=zF(o[l-1].value,o[l-2],n),l-=2;return n}(),jF("?")&&(BF(),e=nS(),PF(":"),t=function(t,e,n){const r=new QC("ConditionalExpression");return r.test=t,r.consequent=e,r.alternate=n,r}(t,e,nS())),t}function rS(){const t=nS();if(jF(","))throw new Error(cF);return t}function iS(t){eF=0,nF=(tF=t).length,rF=null,TF();const e=rS();if(2!==rF.type)throw new Error("Unexpect token after expression.");return e}var oS={NaN:"NaN",E:"Math.E",LN2:"Math.LN2",LN10:"Math.LN10",LOG2E:"Math.LOG2E",LOG10E:"Math.LOG10E",PI:"Math.PI",SQRT1_2:"Math.SQRT1_2",SQRT2:"Math.SQRT2",MIN_VALUE:"Number.MIN_VALUE",MAX_VALUE:"Number.MAX_VALUE"};function aS(t){function e(e,n,r){return i=>function(e,n,r,i){let o=t(n[0]);return r&&(o=r+"("+o+")",0===r.lastIndexOf("new ",0)&&(o="("+o+")")),o+"."+e+(i<0?"":0===i?"()":"("+n.slice(1).map(t).join(",")+")")}(e,i,n,r)}const n="new Date",r="String",i="RegExp";return{isNaN:"Number.isNaN",isFinite:"Number.isFinite",abs:"Math.abs",acos:"Math.acos",asin:"Math.asin",atan:"Math.atan",atan2:"Math.atan2",ceil:"Math.ceil",cos:"Math.cos",exp:"Math.exp",floor:"Math.floor",log:"Math.log",max:"Math.max",min:"Math.min",pow:"Math.pow",random:"Math.random",round:"Math.round",sin:"Math.sin",sqrt:"Math.sqrt",tan:"Math.tan",clamp:function(e){e.length<3&&s("Missing arguments to clamp function."),e.length>3&&s("Too many arguments to clamp function.");const n=e.map(t);return"Math.max("+n[1]+", Math.min("+n[2]+","+n[0]+"))"},now:"Date.now",utc:"Date.UTC",datetime:n,date:e("getDate",n,0),day:e("getDay",n,0),year:e("getFullYear",n,0),month:e("getMonth",n,0),hours:e("getHours",n,0),minutes:e("getMinutes",n,0),seconds:e("getSeconds",n,0),milliseconds:e("getMilliseconds",n,0),time:e("getTime",n,0),timezoneoffset:e("getTimezoneOffset",n,0),utcdate:e("getUTCDate",n,0),utcday:e("getUTCDay",n,0),utcyear:e("getUTCFullYear",n,0),utcmonth:e("getUTCMonth",n,0),utchours:e("getUTCHours",n,0),utcminutes:e("getUTCMinutes",n,0),utcseconds:e("getUTCSeconds",n,0),utcmilliseconds:e("getUTCMilliseconds",n,0),length:e("length",null,-1),parseFloat:"parseFloat",parseInt:"parseInt",upper:e("toUpperCase",r,0),lower:e("toLowerCase",r,0),substring:e("substring",r),split:e("split",r),trim:e("trim",r,0),regexp:i,test:e("test",i),if:function(e){e.length<3&&s("Missing arguments to if function."),e.length>3&&s("Too many arguments to if function.");const n=e.map(t);return"("+n[0]+"?"+n[1]+":"+n[2]+")"}}}function uS(t){const e=(t=t||{}).allowed?Ct(t.allowed):{},n=t.forbidden?Ct(t.forbidden):{},r=t.constants||oS,i=(t.functions||aS)(h),o=t.globalvar,a=t.fieldvar,u=Y(o)?o:t=>`${o}["${t}"]`;let l={},c={},f=0;function h(t){if(gt(t))return t;const e=d[t.type];return null==e&&s("Unsupported type: "+t.type),e(t)}const d={Literal:t=>t.raw,Identifier:t=>{const i=t.name;return f>0?i:it(n,i)?s("Illegal identifier: "+i):it(r,i)?r[i]:it(e,i)?i:(l[i]=1,u(i))},MemberExpression:t=>{const e=!t.computed,n=h(t.object);e&&(f+=1);const r=h(t.property);return n===a&&(c[function(t){const e=t&&t.length-1;return e&&('"'===t[0]&&'"'===t[e]||"'"===t[0]&&"'"===t[e])?t.slice(1,-1):t}(r)]=1),e&&(f-=1),n+(e?"."+r:"["+r+"]")},CallExpression:t=>{"Identifier"!==t.callee.type&&s("Illegal callee type: "+t.callee.type);const e=t.callee.name,n=t.arguments,r=it(i,e)&&i[e];return r||s("Unrecognized function: "+e),Y(r)?r(n):r+"("+n.map(h).join(",")+")"},ArrayExpression:t=>"["+t.elements.map(h).join(",")+"]",BinaryExpression:t=>"("+h(t.left)+" "+t.operator+" "+h(t.right)+")",UnaryExpression:t=>"("+t.operator+h(t.argument)+")",ConditionalExpression:t=>"("+h(t.test)+"?"+h(t.consequent)+":"+h(t.alternate)+")",LogicalExpression:t=>"("+h(t.left)+t.operator+h(t.right)+")",ObjectExpression:t=>"{"+t.properties.map(h).join(",")+"}",Property:t=>{f+=1;const e=h(t.key);return f-=1,e+":"+h(t.value)}};function p(t){const e={code:h(t),globals:Object.keys(l),fields:Object.keys(c)};return l={},c={},e}return p.functions=i,p.constants=r,p}const sS="intersect",lS="union",cS="index:unit";function fS(t,e){for(var n,r,i=e.fields,o=e.values,a=i.length,u=0;u<a;++u)if((r=i[u]).getter=c.getter||c(r.field),ft(n=r.getter(t))&&(n=E(n)),ft(o[u])&&(o[u]=E(o[u])),ft(o[u][0])&&(o[u]=o[u].map(E)),"E"===r.type){if(_(o[u])?o[u].indexOf(n)<0:n!==o[u])return!1}else if("R"===r.type){if(!lt(n,o[u]))return!1}else if("R-RE"===r.type){if(!lt(n,o[u],!0,!1))return!1}else if("R-E"===r.type){if(!lt(n,o[u],!1,!1))return!1}else if("R-LE"===r.type&&!lt(n,o[u],!1,!0))return!1;return!0}const hS=c("_vgsid_"),dS=function(t){let e=t,n=t;function r(t,e,r,i){for(null==r&&(r=0),null==i&&(i=t.length);r<i;){const o=r+i>>>1;n(t[o],e)<0?r=o+1:i=o}return r}return 1===t.length&&(e=(e,n)=>t(e)-n,n=function(t){return(e,n)=>function(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}(t(e),n)}(t)),{left:r,center:function(t,n,i,o){null==i&&(i=0),null==o&&(o=t.length);const a=r(t,n,i,o-1);return a>i&&e(t[a-1],n)>-e(t[a],n)?a-1:a},right:function(t,e,r,i){for(null==r&&(r=0),null==i&&(i=t.length);r<i;){const o=r+i>>>1;n(t[o],e)>0?i=o:r=o+1}return r}}}(hS),pS=dS.left,gS=dS.right;var mS={E_union:function(t,e){if(!t.length)return e;for(var n=0,r=e.length;n<r;++n)t.indexOf(e[n])<0&&t.push(e[n]);return t},E_intersect:function(t,e){return t.length?t.filter((t=>e.indexOf(t)>=0)):e},R_union:function(t,e){var n=E(e[0]),r=E(e[1]);return n>r&&(n=e[1],r=e[0]),t.length?(t[0]>n&&(t[0]=n),t[1]<r&&(t[1]=r),t):[n,r]},R_intersect:function(t,e){var n=E(e[0]),r=E(e[1]);return n>r&&(n=e[1],r=e[0]),t.length?r<t[0]||t[1]<n?[]:(t[0]<n&&(t[0]=n),t[1]>r&&(t[1]=r),t):[n,r]}};function yS(t,e,n,r){e[0].type!==PC&&s("First argument to selection functions must be a string literal.");const i=e[0].value,o="unit",a="@unit",u=":"+i;(e.length>=2&&M(e).value)!==sS||it(r,a)||(r["@unit"]=n.getData(i).indataRef(n,o)),it(r,u)||(r[u]=n.getData(i).tuplesRef())}function vS(t){const e=this.context.data[t];return e?e.values.value:[]}const _S=t=>function(e,n){return this.context.dataflow.locale()[t](n)(e)},xS=_S("format"),bS=_S("timeFormat"),wS=_S("utcFormat"),kS=_S("timeParse"),AS=_S("utcParse"),MS=new Date(2e3,0,1);function ES(t,e,n){return Number.isInteger(t)&&Number.isInteger(e)?(MS.setYear(2e3),MS.setMonth(t),MS.setDate(e),bS.call(this,MS,n)):""}function DS(t,e,n,r){e[0].type!==PC&&s("First argument to data functions must be a string literal.");const i=e[0].value,o=":"+i;if(!it(o,r))try{r[o]=n.getData(i).tuplesRef()}catch(t){}}function CS(t,e,n,r){if(e[0].type===PC)FS(n,r,e[0].value);else for(t in n.scales)FS(n,r,t)}function FS(t,e,n){const r="%"+n;if(!it(e,r))try{e[r]=t.scaleRef(n)}catch(t){}}function SS(t,e){let n;return Y(t)?t:gt(t)?(n=e.scales[t])&&n.value:void 0}function BS(t,e,n){e.__bandwidth=t=>t&&t.bandwidth?t.bandwidth():0,n._bandwidth=CS,n._range=CS,n._scale=CS;const r=e=>"_["+(e.type===PC?kt("%"+e.value):kt("%")+"+"+t(e))+"]";return{_bandwidth:t=>`this.__bandwidth(${r(t[0])})`,_range:t=>`${r(t[0])}.range()`,_scale:e=>`${r(e[0])}(${t(e[1])})`}}function TS(t,e){return function(n,r,i){if(n){const e=SS(n,(i||this).context);return e&&e.path[t](r)}return e(r)}}const zS=TS("area",(function(t){return hb=new Qt,Gx(t,db),2*hb})),NS=TS("bounds",(function(t){var e,n,r,i,o,a,u;if(rb=nb=-(tb=eb=1/0),lb=[],Gx(t,Pb),n=lb.length){for(lb.sort(Jb),e=1,o=[r=lb[0]];e<n;++e)Zb(r,(i=lb[e])[0])||Zb(r,i[1])?(Xb(r[0],i[1])>Xb(r[0],r[1])&&(r[1]=i[1]),Xb(i[0],r[1])>Xb(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(a=-1/0,e=0,r=o[n=o.length-1];e<=n;r=i,++e)i=o[e],(u=Xb(r[1],i[0]))>a&&(a=u,tb=i[0],nb=r[1])}return lb=cb=null,tb===1/0||eb===1/0?[[NaN,NaN],[NaN,NaN]]:[[tb,eb],[nb,rb]]})),OS=TS("centroid",(function(t){Mb=Eb=Db=Cb=Fb=Sb=Bb=Tb=0,zb=new Qt,Nb=new Qt,Ob=new Qt,Gx(t,Qb);var e=+zb,n=+Nb,r=+Ob,i=zx(e,n,r);return i<xx&&(e=Sb,n=Bb,r=Tb,Eb<_x&&(e=Db,n=Cb,r=Fb),(i=zx(e,n,r))<xx)?[NaN,NaN]:[Fx(n,e)*Mx,Px(r/i)*Mx]}));function RS(t,e,n){try{t[e].apply(t,["EXPRESSION"].concat([].slice.call(n)))}catch(e){t.warn(e)}return n[n.length-1]}function $S(t){const e=t/255;return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}function qS(t){const e=kc(t);return.2126*$S(e.r)+.7152*$S(e.g)+.0722*$S(e.b)}function LS(t,e){return t===e||t!=t&&e!=e||(_(t)?!(!_(e)||t.length!==e.length)&&function(t,e){for(let n=0,r=t.length;n<r;++n)if(!LS(t[n],e[n]))return!1;return!0}(t,e):!(!x(t)||!x(e))&&US(t,e))}function US(t,e){for(const n in t)if(!LS(t[n],e[n]))return!1;return!0}function PS(t){return e=>US(t,e)}const jS={};function IS(t){return _(t)||ArrayBuffer.isView(t)?t:null}function WS(t){return IS(t)||(gt(t)?t:null)}const HS=t=>t.data;function YS(t,e){const n=vS.call(e,t);return n.root&&n.root.lookup||{}}const VS=()=>"undefined"!=typeof window&&window||null;const GS={random:()=>t.random(),cumulativeNormal:Ba,cumulativeLogNormal:$a,cumulativeUniform:Ia,densityNormal:Sa,densityLogNormal:Ra,densityUniform:ja,quantileNormal:Ta,quantileLogNormal:qa,quantileUniform:Wa,sampleNormal:Fa,sampleLogNormal:Oa,sampleUniform:Pa,isArray:_,isBoolean:ct,isDate:ft,isDefined:t=>void 0!==t,isNumber:dt,isObject:x,isRegExp:pt,isString:gt,isTuple:Oo,isValid:t=>null!=t&&t==t,toBoolean:At,toDate:Et,toNumber:E,toString:Dt,indexof:function(t,...e){return WS(t).indexOf(...e)},join:function(t,...e){return IS(t).join(...e)},lastindexof:function(t,...e){return WS(t).lastIndexOf(...e)},replace:function(t,e,n){return Y(n)&&s("Function argument passed to replace."),String(t).replace(e,n)},reverse:function(t){return IS(t).slice().reverse()},slice:function(t,...e){return WS(t).slice(...e)},flush:ut,lerp:yt,merge:function(){const t=[].slice.call(arguments);return t.unshift({}),tt(...t)},pad:bt,peek:M,pluck:function(t,e){const n=jS[e]||(jS[e]=c(e));return _(t)?t.map(n):n(t)},span:wt,inrange:lt,truncate:Ft,rgb:kc,lab:Pc,hcl:Gc,hsl:Sc,luminance:qS,contrast:function(t,e){const n=qS(t),r=qS(e);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)},sequence:de,format:xS,utcFormat:wS,utcParse:AS,utcOffset:Qn,utcSequence:er,timeFormat:bS,timeParse:kS,timeOffset:Zn,timeSequence:tr,timeUnitSpecifier:kn,monthFormat:function(t){return ES.call(this,t,1,"%B")},monthAbbrevFormat:function(t){return ES.call(this,t,1,"%b")},dayFormat:function(t){return ES.call(this,0,2+t,"%A")},dayAbbrevFormat:function(t){return ES.call(this,0,2+t,"%a")},quarter:j,utcquarter:I,week:Dn,utcweek:zn,dayofyear:En,utcdayofyear:Tn,warn:function(){return RS(this.context.dataflow,"warn",arguments)},info:function(){return RS(this.context.dataflow,"info",arguments)},debug:function(){return RS(this.context.dataflow,"debug",arguments)},extent:et,inScope:function(t){const e=this.context.group;let n=!1;if(e)for(;t;){if(t===e){n=!0;break}t=t.mark.group}return n},intersect:function(t,e,n){if(!t)return[];const[r,i]=t,o=(new Zp).set(r[0],r[1],i[0],i[1]);return kv(n||this.context.dataflow.scenegraph().root,o,function(t){let e=null;if(t){const n=W(t.marktype),r=W(t.markname);e=t=>(!n.length||n.some((e=>t.marktype===e)))&&(!r.length||r.some((e=>t.name===e)))}return e}(e))},clampRange:H,pinchDistance:function(t){const e=t.touches,n=e[0].clientX-e[1].clientX,r=e[0].clientY-e[1].clientY;return Math.sqrt(n*n+r*r)},pinchAngle:function(t){const e=t.touches;return Math.atan2(e[0].clientY-e[1].clientY,e[0].clientX-e[1].clientX)},screen:function(){const t=VS();return t?t.screen:{}},containerSize:function(){const t=this.context.dataflow,e=t.container&&t.container();return e?[e.clientWidth,e.clientHeight]:[void 0,void 0]},windowSize:function(){const t=VS();return t?[t.innerWidth,t.innerHeight]:[void 0,void 0]},bandspace:function(t,e,n){return Uh(t||0,e||0,n||0)},setdata:function(t,e){const n=this.context.dataflow,r=this.context.data[t].input;return n.pulse(r,n.changeset().remove(g).insert(e)),1},pathShape:function(t){let e=null;return function(n){return n?xp(n,e=e||lp(t)):t}},panLinear:z,panLog:N,panPow:O,panSymlog:R,zoomLinear:q,zoomLog:L,zoomPow:U,zoomSymlog:P,encode:function(t,e,n){if(t){const n=this.context.dataflow,r=t.mark.source;n.pulse(r,n.changeset().encode(t,e))}return void 0!==n?n:t},modify:function(t,e,n,r,i,o){const a=this.context.dataflow,u=this.context.data[t],s=u.input,l=a.stamp();let c,f,h=u.changes;if(!1===a._trigger||!(s.value.length||e||r))return 0;if((!h||h.stamp<l)&&(u.changes=h=a.changeset(),h.stamp=l,a.runAfter((()=>{u.modified=!0,a.pulse(s,h).run()}),!0,1)),n&&(c=!0===n?g:_(n)||Oo(n)?n:PS(n),h.remove(c)),e&&h.insert(e),r&&(c=PS(r),s.value.some(c)?h.remove(c):h.insert(r)),i)for(f in o)h.modify(i,f,o[f]);return 1}},XS=["view","item","group","xy","x","y"],JS="this.",ZS={},QS={forbidden:["_"],allowed:["datum","event","item"],fieldvar:"datum",globalvar:t=>`_[${kt("$"+t)}]`,functions:function(t){const e=aS(t);XS.forEach((t=>e[t]="event.vega."+t));for(const t in GS)e[t]=JS+t;return tt(e,BS(t,GS,ZS)),e},constants:oS,visitors:ZS},KS=uS(QS);function tB(t,e,n){return 1===arguments.length?GS[t]:(GS[t]=e,n&&(ZS[t]=n),KS&&(KS.functions[t]=JS+t),this)}function eB(t,e){const n={};let r;try{r=iS(t=gt(t)?t:kt(t)+"")}catch(e){s("Expression parse error: "+t)}r.visit((t=>{if(t.type!==YC)return;const r=t.callee.name,i=QS.visitors[r];i&&i(r,t.arguments,e,n)}));const i=KS(r);return i.globals.forEach((t=>{const r="$"+t;!it(n,r)&&e.getSignal(t)&&(n[r]=e.signalRef(t))})),{$expr:tt({code:i.code},e.options.ast?{ast:r}:null),$fields:i.fields,$params:n}}tB("bandwidth",(function(t,e){const n=SS(t,(e||this).context);return n&&n.bandwidth?n.bandwidth():0}),CS),tB("copy",(function(t,e){const n=SS(t,(e||this).context);return n?n.copy():void 0}),CS),tB("domain",(function(t,e){const n=SS(t,(e||this).context);return n?n.domain():[]}),CS),tB("range",(function(t,e){const n=SS(t,(e||this).context);return n&&n.range?n.range():[]}),CS),tB("invert",(function(t,e,n){const r=SS(t,(n||this).context);return r?_(e)?(r.invertRange||r.invert)(e):(r.invert||r.invertExtent)(e):void 0}),CS),tB("scale",(function(t,e,n){const r=SS(t,(n||this).context);return r?r(e):void 0}),CS),tB("gradient",(function(t,e,n,r,i){t=SS(t,(i||this).context);const o=ip(e,n);let a=t.domain(),u=a[0],s=M(a),l=h;return s-u?l=Dd(t,u,s):t=(t.interpolator?pd("sequential")().interpolator(t.interpolator()):pd("linear")().interpolate(t.interpolate()).range(t.range())).domain([u=0,s=1]),t.ticks&&(a=t.ticks(+r||15),u!==a[0]&&a.unshift(u),s!==M(a)&&a.push(s)),a.forEach((e=>o.stop(l(e),t(e)))),o}),CS),tB("geoArea",zS,CS),tB("geoBounds",NS,CS),tB("geoCentroid",OS,CS),tB("geoShape",(function(t,e,n){const r=SS(t,(n||this).context);return function(t){return r?r.path.context(t)(e):""}}),CS),tB("indata",(function(t,e,n){const r=this.context.data[t]["index:"+e],i=r?r.value.get(n):void 0;return i?i.count:i}),(function(t,e,n,r){e[0].type!==PC&&s("First argument to indata must be a string literal."),e[1].type!==PC&&s("Second argument to indata must be a string literal.");const i=e[0].value,o=e[1].value,a="@"+o;it(a,r)||(r[a]=n.getData(i).indataRef(n,o))})),tB("data",vS,DS),tB("treePath",(function(t,e,n){const r=YS(t,this),i=r[e],o=r[n];return i&&o?i.path(o).map(HS):void 0}),DS),tB("treeAncestors",(function(t,e){const n=YS(t,this)[e];return n?n.ancestors().map(HS):void 0}),DS),tB("vlSelectionTest",(function(t,e,n){for(var r,i,o,a,u,s=this.context.data[t],l=s?s.values.value:[],c=s?s[cS]&&s[cS].value:void 0,f=n===sS,h=l.length,d=0;d<h;++d)if(r=l[d],c&&f){if(-1===(o=(i=i||{})[a=r.unit]||0))continue;if(u=fS(e,r),i[a]=u?-1:++o,u&&1===c.size)return!0;if(!u&&o===c.get(a).count)return!1}else if(f^(u=fS(e,r)))return u;return h&&f}),yS),tB("vlSelectionIdTest",(function(t,e,n){const r=this.context.data[t],i=r?r.values.value:[],o=r?r[cS]&&r[cS].value:void 0,a=n===sS,u=hS(e),s=pS(i,u);if(s===i.length)return!1;if(hS(i[s])!==u)return!1;if(o&&a){if(1===o.size)return!0;if(gS(i,u)-s<o.size)return!1}return!0}),yS),tB("vlSelectionResolve",(function(t,e,n,r){for(var i,o,a,u,s,l,c,f,h,d,p,g=this.context.data[t],m=g?g.values.value:[],y={},v={},_={},x=m.length,b=0;b<x;++b){for(u=(i=m[b]).unit,o=i.fields,a=i.values,d=0,p=o.length;d<p;++d)s=o[d],c=(l=y[s.field]||(y[s.field]={}))[u]||(l[u]=[]),_[s.field]=f=s.type.charAt(0),h=mS[f+"_union"],l[u]=h(c,W(a[d]));n&&(c=v[u]||(v[u]=[])).push(W(a).reduce(((t,e,n)=>(t[o[n].field]=e,t)),{}))}if(e=e||lS,Object.keys(y).forEach((t=>{y[t]=Object.keys(y[t]).map((e=>y[t][e])).reduce(((n,r)=>void 0===n?r:mS[_[t]+"_"+e](n,r)))})),m=Object.keys(v),n&&m.length){y[r?"vlPoint":"vlMulti"]=e===lS?{or:m.reduce(((t,e)=>(t.push(...v[e]),t)),[])}:{and:m.map((t=>({or:v[t]})))}}return y}),yS),tB("vlSelectionTuples",(function(t,e){return t.map((t=>tt({values:e.fields.map((e=>(e.getter||(e.getter=c(e.field)))(t.datum)))},e)))}));const nB=Ct(["rule"]),rB=Ct(["group","image","rect"]);function iB(t){return(t+"").toLowerCase()}function oB(t,e,n){";"!==n[n.length-1]&&(n="return("+n+");");const r=Function(...e.concat(n));return t&&t.functions?r.bind(t.functions):r}var aB={operator:(t,e)=>oB(t,["_"],e.code),parameter:(t,e)=>oB(t,["datum","_"],e.code),event:(t,e)=>oB(t,["event"],e.code),handler:(t,e)=>oB(t,["_","event"],`var datum=event.item&&event.item.datum;return ${e.code};`),encode:(t,e)=>{const{marktype:n,channels:r}=e;let i="var o=item,datum=o.datum,m=0,$;";for(const t in r){const e="o["+kt(t)+"]";i+=`$=${r[t].code};if(${e}!==$)${e}=$,m=1;`}return i+=function(t,e){let n="";return nB[e]||(t.x2&&(t.x?(rB[e]&&(n+="if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"),n+="o.width=o.x2-o.x;"):n+="o.x=o.x2-(o.width||0);"),t.xc&&(n+="o.x=o.xc-(o.width||0)/2;"),t.y2&&(t.y?(rB[e]&&(n+="if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"),n+="o.height=o.y2-o.y;"):n+="o.y=o.y2-(o.height||0);"),t.yc&&(n+="o.y=o.yc-(o.height||0)/2;")),n}(r,n),i+="return m;",oB(t,["item","_"],i)},codegen:{get(t){const e=`[${t.map(kt).join("][")}]`,n=Function("_",`return _${e};`);return n.path=e,n},comparator(t,e){let n;const r=Function("a","b","var u, v; return "+t.map(((t,r)=>{const i=e[r];let o,a;return t.path?(o=`a${t.path}`,a=`b${t.path}`):((n=n||{})["f"+r]=t,o=`this.f${r}(a)`,a=`this.f${r}(b)`),function(t,e,n,r){return`((u = ${t}) < (v = ${e}) || u == null) && v != null ? ${n}\n  : (u > v || v == null) && u != null ? ${r}\n  : ((v = v instanceof Date ? +v : v), (u = u instanceof Date ? +u : u)) !== u && v === v ? ${n}\n  : v !== v && u === u ? ${r} : `}(o,a,-i,i)})).join("")+"0;");return n?r.bind(n):r}}};function uB(t,e,n){if(!t||!x(t))return t;for(let r,i=0,o=sB.length;i<o;++i)if(r=sB[i],it(t,r.key))return r.parse(t,e,n);return t}var sB=[{key:"$ref",parse:function(t,e){return e.get(t.$ref)||s("Operator not defined: "+t.$ref)}},{key:"$key",parse:function(t,e){const n="k:"+t.$key+"_"+!!t.$flat;return e.fn[n]||(e.fn[n]=mt(t.$key,t.$flat,e.expr.codegen))}},{key:"$expr",parse:function(t,e,r){t.$params&&e.parseParameters(t.$params,r);const i="e:"+t.$expr.code+"_"+t.$name;return e.fn[i]||(e.fn[i]=n(e.parameterExpression(t.$expr),t.$fields,t.$name))}},{key:"$field",parse:function(t,e){if(!t.$field)return null;const n="f:"+t.$field+"_"+t.$name;return e.fn[n]||(e.fn[n]=c(t.$field,t.$name,e.expr.codegen))}},{key:"$encode",parse:function(t,e){const r=t.$encode,i={};for(const t in r){const o=r[t];i[t]=n(e.encodeExpression(o.$expr),o.$fields),i[t].output=o.$output}return i}},{key:"$compare",parse:function(t,e){const n="c:"+t.$compare+"_"+t.$order,r=W(t.$compare).map((t=>t&&t.$tupleid?Ro:t));return e.fn[n]||(e.fn[n]=V(r,t.$order,e.expr.codegen))}},{key:"$context",parse:function(t,e){return e}},{key:"$subflow",parse:function(t,e){const n=t.$subflow;return function(t,r,i){const o=e.fork().parse(n),a=o.get(n.operators[0].id),u=o.signals.parent;return u&&u.set(i),a.detachSubflow=()=>e.detach(o),a}}},{key:"$tupleid",parse:function(){return Ro}}];const lB={skip:!0};function cB(t,e,n,r){return new fB(t,e,n,r)}function fB(t,e,n,r){this.dataflow=t,this.transforms=e,this.events=t.events.bind(t),this.expr=r||aB,this.signals={},this.scales={},this.nodes={},this.data={},this.fn={},n&&(this.functions=Object.create(n),this.functions.context=this)}function hB(t){this.dataflow=t.dataflow,this.transforms=t.transforms,this.events=t.events,this.expr=t.expr,this.signals=Object.create(t.signals),this.scales=Object.create(t.scales),this.nodes=Object.create(t.nodes),this.data=Object.create(t.data),this.fn=Object.create(t.fn),t.functions&&(this.functions=Object.create(t.functions),this.functions.context=this)}function dB(t,e){t&&(null==e?t.removeAttribute("aria-label"):t.setAttribute("aria-label",e))}fB.prototype=hB.prototype={fork(){const t=new hB(this);return(this.subcontext||(this.subcontext=[])).push(t),t},detach(t){this.subcontext=this.subcontext.filter((e=>e!==t));const e=Object.keys(t.nodes);for(const n of e)t.nodes[n]._targets=null;for(const n of e)t.nodes[n].detach();t.nodes=null},get(t){return this.nodes[t]},set(t,e){return this.nodes[t]=e},add(t,e){const n=this,r=n.dataflow,i=t.value;if(n.set(t.id,e),function(t){return"collect"===iB(t)}(t.type)&&i&&(i.$ingest?r.ingest(e,i.$ingest,i.$format):i.$request?r.preload(e,i.$request,i.$format):r.pulse(e,r.changeset().insert(i))),t.root&&(n.root=e),t.parent){let i=n.get(t.parent.$ref);i?(r.connect(i,[e]),e.targets().add(i)):(n.unresolved=n.unresolved||[]).push((()=>{i=n.get(t.parent.$ref),r.connect(i,[e]),e.targets().add(i)}))}if(t.signal&&(n.signals[t.signal]=e),t.scale&&(n.scales[t.scale]=e),t.data)for(const r in t.data){const i=n.data[r]||(n.data[r]={});t.data[r].forEach((t=>i[t]=e))}},resolve(){return(this.unresolved||[]).forEach((t=>t())),delete this.unresolved,this},operator(t,e){this.add(t,this.dataflow.add(t.value,e))},transform(t,e){this.add(t,this.dataflow.add(this.transforms[iB(e)]))},stream(t,e){this.set(t.id,e)},update(t,e,n,r,i){this.dataflow.on(e,n,r,i,t.options)},operatorExpression(t){return this.expr.operator(this,t)},parameterExpression(t){return this.expr.parameter(this,t)},eventExpression(t){return this.expr.event(this,t)},handlerExpression(t){return this.expr.handler(this,t)},encodeExpression(t){return this.expr.encode(this,t)},parse:function(t){const e=this,n=t.operators||[];return t.background&&(e.background=t.background),t.eventConfig&&(e.eventConfig=t.eventConfig),t.locale&&(e.locale=t.locale),n.forEach((t=>e.parseOperator(t))),n.forEach((t=>e.parseOperatorParameters(t))),(t.streams||[]).forEach((t=>e.parseStream(t))),(t.updates||[]).forEach((t=>e.parseUpdate(t))),e.resolve()},parseOperator:function(t){const e=this;!function(t){return"operator"===iB(t)}(t.type)&&t.type?e.transform(t,t.type):e.operator(t,t.update?e.operatorExpression(t.update):null)},parseOperatorParameters:function(t){const e=this;if(t.params){const n=e.get(t.id);n||s("Invalid operator id: "+t.id),e.dataflow.connect(n,n.parameters(e.parseParameters(t.params),t.react,t.initonly))}},parseParameters:function(t,e){e=e||{};const n=this;for(const r in t){const i=t[r];e[r]=_(i)?i.map((t=>uB(t,n,e))):uB(i,n,e)}return e},parseStream:function(t){var e,n=this,r=null!=t.filter?n.eventExpression(t.filter):void 0,i=null!=t.stream?n.get(t.stream):void 0;t.source?i=n.events(t.source,t.type,r):t.merge&&(i=(e=t.merge.map((t=>n.get(t))))[0].merge.apply(e[0],e.slice(1))),t.between&&(e=t.between.map((t=>n.get(t))),i=i.between(e[0],e[1])),t.filter&&(i=i.filter(r)),null!=t.throttle&&(i=i.throttle(+t.throttle)),null!=t.debounce&&(i=i.debounce(+t.debounce)),null==i&&s("Invalid stream definition: "+JSON.stringify(t)),t.consume&&i.consume(!0),n.stream(t,i)},parseUpdate:function(t){var e,n=this,r=x(r=t.source)?r.$ref:r,i=n.get(r),o=t.update,a=void 0;i||s("Source not defined: "+t.source),e=t.target&&t.target.$expr?n.eventExpression(t.target.$expr):n.get(t.target),o&&o.$expr&&(o.$params&&(a=n.parseParameters(o.$params)),o=n.handlerExpression(o.$expr)),n.update(t,i,e,o,a)},getState:function(t){var e=this,n={};if(t.signals){var r=n.signals={};Object.keys(e.signals).forEach((n=>{const i=e.signals[n];t.signals(n,i)&&(r[n]=i.value)}))}if(t.data){var i=n.data={};Object.keys(e.data).forEach((n=>{const r=e.data[n];t.data(n,r)&&(i[n]=r.input.value)}))}return e.subcontext&&!1!==t.recurse&&(n.subcontext=e.subcontext.map((e=>e.getState(t)))),n},setState:function(t){var e=this,n=e.dataflow,r=t.data,i=t.signals;Object.keys(i||{}).forEach((t=>{n.update(e.signals[t],i[t],lB)})),Object.keys(r||{}).forEach((t=>{n.pulse(e.data[t].input,n.changeset().remove(g).insert(r[t]))})),(t.subcontext||[]).forEach(((t,n)=>{const r=e.subcontext[n];r&&r.setState(t)}))}};const pB="default";function gB(t,e){const n=t.globalCursor()?"undefined"!=typeof document&&document.body:t.container();if(n)return null==e?n.style.removeProperty("cursor"):n.style.cursor=e}function mB(t,e){var n=t._runtime.data;return it(n,e)||s("Unrecognized data set: "+e),n[e]}function yB(t,e){Io(e)||s("Second argument to changes must be a changeset.");const n=mB(this,t);return n.modified=!0,this.pulse(n.input,e)}function vB(t){var e=t.padding();return Math.max(0,t._viewWidth+e.left+e.right)}function _B(t){var e=t.padding();return Math.max(0,t._viewHeight+e.top+e.bottom)}function xB(t){var e=t.padding(),n=t._origin;return[e.left+n[0],e.top+n[1]]}function bB(t,e,n){var r,i,o=t._renderer,a=o&&o.canvas();return a&&(i=xB(t),(r=uy(e.changedTouches?e.changedTouches[0]:e,a))[0]-=i[0],r[1]-=i[1]),e.dataflow=t,e.item=n,e.vega=function(t,e,n){const r=e?"group"===e.mark.marktype?e:e.mark.group:null;function i(t){var n,i=r;if(t)for(n=e;n;n=n.mark.group)if(n.mark.name===t){i=n;break}return i&&i.mark&&i.mark.interactive?i:{}}function o(t){if(!t)return n;gt(t)&&(t=i(t));const e=n.slice();for(;t;)e[0]-=t.x||0,e[1]-=t.y||0,t=t.mark&&t.mark.group;return e}return{view:Q(t),item:Q(e||{}),group:i,xy:o,x:t=>o(t)[0],y:t=>o(t)[1]}}(t,n,r),e}const wB="view",kB={trap:!1};function AB(t,e,n,r){t._eventListeners.push({type:n,sources:W(e),handler:r})}function MB(t,e,n){const r=t._eventConfig&&t._eventConfig[e];return!(!1===r||x(r)&&!r[n])||(t.warn(`Blocked ${e} ${n} event listener.`),!1)}function EB(t){return t.item}function DB(t){return t.item.mark.source}function CB(t){return function(e,n){return n.vega.view().changeset().encode(n.item,t)}}function FB(t,e,n){const r=document.createElement(t);for(const t in e)r.setAttribute(t,e[t]);return null!=n&&(r.textContent=n),r}function SB(t,e,n,r){const i=n.event||"input",o=()=>t.update(e.value);r.signal(n.signal,e.value),e.addEventListener(i,o),AB(r,e,i,o),t.set=t=>{e.value=t,e.dispatchEvent(function(t){return"undefined"!=typeof Event?new Event(t):{type:t}}(i))}}function BB(t,e,n,r){const i=r.signal(n.signal),o=FB("div",{class:"vega-bind"}),a="radio"===n.input?o:o.appendChild(FB("label"));a.appendChild(FB("span",{class:"vega-bind-name"},n.name||n.signal)),e.appendChild(o);let u=TB;switch(n.input){case"checkbox":u=zB;break;case"select":u=NB;break;case"radio":u=OB;break;case"range":u=RB}u(t,a,n,i)}function TB(t,e,n,r){const i=FB("input");for(const t in n)"signal"!==t&&"element"!==t&&i.setAttribute("input"===t?"type":t,n[t]);i.setAttribute("name",n.signal),i.value=r,e.appendChild(i),i.addEventListener("input",(()=>t.update(i.value))),t.elements=[i],t.set=t=>i.value=t}function zB(t,e,n,r){const i={type:"checkbox",name:n.signal};r&&(i.checked=!0);const o=FB("input",i);e.appendChild(o),o.addEventListener("change",(()=>t.update(o.checked))),t.elements=[o],t.set=t=>o.checked=!!t||null}function NB(t,e,n,r){const i=FB("select",{name:n.signal}),o=n.labels||[];n.options.forEach(((t,e)=>{const n={value:t};$B(t,r)&&(n.selected=!0),i.appendChild(FB("option",n,(o[e]||t)+""))})),e.appendChild(i),i.addEventListener("change",(()=>{t.update(n.options[i.selectedIndex])})),t.elements=[i],t.set=t=>{for(let e=0,r=n.options.length;e<r;++e)if($B(n.options[e],t))return void(i.selectedIndex=e)}}function OB(t,e,n,r){const i=FB("span",{class:"vega-bind-radio"}),o=n.labels||[];e.appendChild(i),t.elements=n.options.map(((e,a)=>{const u={type:"radio",name:n.signal,value:e};$B(e,r)&&(u.checked=!0);const s=FB("input",u);s.addEventListener("change",(()=>t.update(e)));const l=FB("label",{},(o[a]||e)+"");return l.prepend(s),i.appendChild(l),s})),t.set=e=>{const n=t.elements,r=n.length;for(let t=0;t<r;++t)$B(n[t].value,e)&&(n[t].checked=!0)}}function RB(t,e,n,r){r=void 0!==r?r:(+n.max+ +n.min)/2;const i=null!=n.max?n.max:Math.max(100,+r)||100,o=n.min||Math.min(0,i,+r)||0,a=n.step||ie(o,i,100),u=FB("input",{type:"range",name:n.signal,min:o,max:i,step:a});u.value=r;const s=FB("span",{},+r);e.appendChild(u),e.appendChild(s);const l=()=>{s.textContent=u.value,t.update(+u.value)};u.addEventListener("input",l),u.addEventListener("change",l),t.elements=[u],t.set=t=>{u.value=t,s.textContent=t}}function $B(t,e){return t===e||t+""==e+""}function qB(t,e,n,r,i,o){return(e=e||new r(t.loader())).initialize(n,vB(t),_B(t),xB(t),i,o).background(t.background())}function LB(t,e){return e?function(){try{e.apply(this,arguments)}catch(e){t.error(e)}}:null}function UB(t,e,n){if("string"==typeof e){if("undefined"==typeof document)return t.error("DOM document instance not found."),null;if(!(e=document.querySelector(e)))return t.error("Signal bind element not found: "+e),null}if(e&&n)try{e.innerHTML=""}catch(n){e=null,t.error(n)}return e}const PB=t=>+t||0;function jB(t){return x(t)?{top:PB(t.top),bottom:PB(t.bottom),left:PB(t.left),right:PB(t.right)}:(t=>({top:t,bottom:t,left:t,right:t}))(PB(t))}async function IB(t,e,n,r){const i=wv(e),o=i&&i.headless;return o||s("Unrecognized renderer type: "+e),await t.runAsync(),qB(t,null,null,o,n,r).renderAsync(t._scenegraph.root)}var WB="width",HB="height",YB="padding",VB={skip:!0};function GB(t,e){var n=t.autosize(),r=t.padding();return e-(n&&n.contains===YB?r.left+r.right:0)}function XB(t,e){var n=t.autosize(),r=t.padding();return e-(n&&n.contains===YB?r.top+r.bottom:0)}function JB(t,e){return e.modified&&_(e.input.value)&&t.indexOf("_:vega:_")}function ZB(t,e){return!("parent"===t||e instanceof ma.proxy)}function QB(t,e,n,r){const i=t.element();i&&i.setAttribute("title",function(t){return null==t?"":_(t)?KB(t):x(t)&&!ft(t)?(e=t,Object.keys(e).map((t=>{const n=e[t];return t+": "+(_(n)?KB(n):tT(n))})).join("\n")):t+"";var e}(r))}function KB(t){return"["+t.map(tT).join(", ")+"]"}function tT(t){return _(t)?"[…]":x(t)&&!ft(t)?"{…}":t}function eT(t,e){const n=this;if(e=e||{},da.call(n),e.loader&&n.loader(e.loader),e.logger&&n.logger(e.logger),null!=e.logLevel&&n.logLevel(e.logLevel),e.locale||t.locale){const r=tt({},t.locale,e.locale);n.locale(no(r.number,r.time))}n._el=null,n._elBind=null,n._renderType=e.renderer||xv.Canvas,n._scenegraph=new ty;const r=n._scenegraph.root;n._renderer=null,n._tooltip=e.tooltip||QB,n._redraw=!0,n._handler=(new Ey).scene(r),n._globalCursor=!1,n._preventDefault=!1,n._timers=[],n._eventListeners=[],n._resizeListeners=[],n._eventConfig=function(t){const e=tt({defaults:{}},t),n=(t,e)=>{e.forEach((e=>{_(t[e])&&(t[e]=Ct(t[e]))}))};return n(e.defaults,["prevent","allow"]),n(e,["view","window","selector"]),e}(t.eventConfig),n.globalCursor(n._eventConfig.globalCursor);const i=function(t,e,n){return cB(t,ma,GS,n).parse(e)}(n,t,e.expr);n._runtime=i,n._signals=i.signals,n._bind=(t.bindings||[]).map((t=>({state:null,param:tt({},t)}))),i.root&&i.root.set(r),r.source=i.data.root.input,n.pulse(i.data.root.input,n.changeset().insert(r.items)),n._width=n.width(),n._height=n.height(),n._viewWidth=GB(n,n._width),n._viewHeight=XB(n,n._height),n._origin=[0,0],n._resize=0,n._autosize=1,function(t){var e=t._signals,n=e.width,r=e.height,i=e.padding;function o(){t._autosize=t._resize=1}t._resizeWidth=t.add(null,(e=>{t._width=e.size,t._viewWidth=GB(t,e.size),o()}),{size:n}),t._resizeHeight=t.add(null,(e=>{t._height=e.size,t._viewHeight=XB(t,e.size),o()}),{size:r});const a=t.add(null,o,{pad:i});t._resizeWidth.rank=n.rank+1,t._resizeHeight.rank=r.rank+1,a.rank=i.rank+1}(n),function(t){t.add(null,(e=>(t._background=e.bg,t._resize=1,e.bg)),{bg:t._signals.background})}(n),function(t){const e=t._signals.cursor||(t._signals.cursor=t.add({user:pB,item:null}));t.on(t.events("view","mousemove"),e,((t,n)=>{const r=e.value,i=r?gt(r)?r:r.user:pB,o=n.item&&n.item.cursor||null;return r&&i===r.user&&o==r.item?r:{user:i,item:o}})),t.add(null,(function(e){let n=e.cursor,r=this.value;return gt(n)||(r=n.item,n=n.user),gB(t,n&&n!==pB?n:r||n),r}),{cursor:e})}(n),n.description(t.description),e.hover&&n.hover(),e.container&&n.initialize(e.container,e.bind)}function nT(t,e){return it(t._signals,e)?t._signals[e]:s("Unrecognized signal name: "+kt(e))}function rT(t,e){const n=(t._targets||[]).filter((t=>t._update&&t._update.handler===e));return n.length?n[0]:null}function iT(t,e,n,r){let i=rT(n,r);return i||(i=LB(t,(()=>r(e,n.value))),i.handler=r,t.on(n,null,i)),t}function oT(t,e,n){const r=rT(e,n);return r&&e._targets.remove(r),t}st(eT,da,{async evaluate(t,e,n){if(await da.prototype.evaluate.call(this,t,e),this._redraw||this._resize)try{this._renderer&&(this._resize&&(this._resize=0,function(t){var e=xB(t),n=vB(t),r=_B(t);t._renderer.background(t.background()),t._renderer.resize(n,r,e),t._handler.origin(e),t._resizeListeners.forEach((e=>{try{e(n,r)}catch(e){t.error(e)}}))}(this)),await this._renderer.renderAsync(this._scenegraph.root)),this._redraw=!1}catch(t){this.error(t)}return n&&To(this,n),this},dirty(t){this._redraw=!0,this._renderer&&this._renderer.dirty(t)},description(t){if(arguments.length){const e=null!=t?t+"":null;return e!==this._desc&&dB(this._el,this._desc=e),this}return this._desc},container(){return this._el},scenegraph(){return this._scenegraph},origin(){return this._origin.slice()},signal(t,e,n){const r=nT(this,t);return 1===arguments.length?r.value:this.update(r,e,n)},width(t){return arguments.length?this.signal("width",t):this.signal("width")},height(t){return arguments.length?this.signal("height",t):this.signal("height")},padding(t){return arguments.length?this.signal("padding",jB(t)):jB(this.signal("padding"))},autosize(t){return arguments.length?this.signal("autosize",t):this.signal("autosize")},background(t){return arguments.length?this.signal("background",t):this.signal("background")},renderer(t){return arguments.length?(wv(t)||s("Unrecognized renderer type: "+t),t!==this._renderType&&(this._renderType=t,this._resetRenderer()),this):this._renderType},tooltip(t){return arguments.length?(t!==this._tooltip&&(this._tooltip=t,this._resetRenderer()),this):this._tooltip},loader(t){return arguments.length?(t!==this._loader&&(da.prototype.loader.call(this,t),this._resetRenderer()),this):this._loader},resize(){return this._autosize=1,this.touch(nT(this,"autosize"))},_resetRenderer(){this._renderer&&(this._renderer=null,this.initialize(this._el,this._elBind))},_resizeView:function(t,e,n,r,i,o){this.runAfter((a=>{let u=0;a._autosize=0,a.width()!==n&&(u=1,a.signal(WB,n,VB),a._resizeWidth.skip(!0)),a.height()!==r&&(u=1,a.signal(HB,r,VB),a._resizeHeight.skip(!0)),a._viewWidth!==t&&(a._resize=1,a._viewWidth=t),a._viewHeight!==e&&(a._resize=1,a._viewHeight=e),a._origin[0]===i[0]&&a._origin[1]===i[1]||(a._resize=1,a._origin=i),u&&a.run("enter"),o&&a.runAfter((t=>t.resize()))}),!1,1)},addEventListener(t,e,n){let r=e;return n&&!1===n.trap||(r=LB(this,e),r.raw=e),this._handler.on(t,r),this},removeEventListener(t,e){for(var n,r,i=this._handler.handlers(t),o=i.length;--o>=0;)if(r=i[o].type,n=i[o].handler,t===r&&(e===n||e===n.raw)){this._handler.off(r,n);break}return this},addResizeListener(t){const e=this._resizeListeners;return e.indexOf(t)<0&&e.push(t),this},removeResizeListener(t){var e=this._resizeListeners,n=e.indexOf(t);return n>=0&&e.splice(n,1),this},addSignalListener(t,e){return iT(this,t,nT(this,t),e)},removeSignalListener(t,e){return oT(this,nT(this,t),e)},addDataListener(t,e){return iT(this,t,mB(this,t).values,e)},removeDataListener(t,e){return oT(this,mB(this,t).values,e)},globalCursor(t){if(arguments.length){if(this._globalCursor!==!!t){const e=gB(this,null);this._globalCursor=!!t,e&&gB(this,e)}return this}return this._globalCursor},preventDefault(t){return arguments.length?(this._preventDefault=t,this):this._preventDefault},timer:function(t,e){this._timers.push(function(t,e,n){var r=new qM,i=e;return null==e?(r.restart(t,e,n),r):(r._restart=r.restart,r.restart=function(t,e,n){e=+e,n=null==n?RM():+n,r._restart((function o(a){a+=i,r._restart(o,i+=e,n),t(a)}),e,n)},r.restart(t,e,n),r)}((function(e){t({timestamp:Date.now(),elapsed:e})}),e))},events:function(t,e,n){var r,i=this,o=new Qo(n),a=function(n,r){i.runAsync(null,(()=>{t===wB&&function(t,e){var n=t._eventConfig.defaults,r=n.prevent,i=n.allow;return!1!==r&&!0!==i&&(!0===r||!1===i||(r?r[e]:i?!i[e]:t.preventDefault()))}(i,e)&&n.preventDefault(),o.receive(bB(i,n,r))}))};if("timer"===t)MB(i,"timer",e)&&i.timer(a,e);else if(t===wB)MB(i,"view",e)&&i.addEventListener(e,a,kB);else if("window"===t?MB(i,"window",e)&&"undefined"!=typeof window&&(r=[window]):"undefined"!=typeof document&&MB(i,"selector",e)&&(r=document.querySelectorAll(t)),r){for(var u=0,s=r.length;u<s;++u)r[u].addEventListener(e,a);AB(i,r,e,a)}else i.warn("Can not resolve event source: "+t);return o},finalize:function(){var t,e,n,r=this._tooltip,i=this._timers,o=this._eventListeners;for(t=i.length;--t>=0;)i[t].stop();for(t=o.length;--t>=0;)for(e=(n=o[t]).sources.length;--e>=0;)n.sources[e].removeEventListener(n.type,n.handler);return r&&r.call(this,this._handler,null,null,null),this},hover:function(t,e){return e=[e||"update",(t=[t||"hover"])[0]],this.on(this.events("view","mouseover",EB),DB,CB(t)),this.on(this.events("view","mouseout",EB),DB,CB(e)),this},data:function(t,e){return arguments.length<2?mB(this,t).values.value:yB.call(this,t,Wo().remove(g).insert(e))},change:yB,insert:function(t,e){return yB.call(this,t,Wo().insert(e))},remove:function(t,e){return yB.call(this,t,Wo().remove(e))},scale:function(t){var e=this._runtime.scales;return it(e,t)||s("Unrecognized scale or projection: "+t),e[t].value},initialize:function(t,e){const n=this,r=n._renderType,i=n._eventConfig.bind,o=wv(r);t=n._el=t?UB(n,t,!0):null,function(t){const e=t.container();e&&(e.setAttribute("role","graphics-document"),e.setAttribute("aria-roleDescription","visualization"),dB(e,t.description()))}(n),o||n.error("Unrecognized renderer type: "+r);const a=o.handler||Ey,u=t?o.renderer:o.headless;return n._renderer=u?qB(n,n._renderer,t,u):null,n._handler=function(t,e,n,r){const i=new r(t.loader(),LB(t,t.tooltip())).scene(t.scenegraph().root).initialize(n,xB(t),t);return e&&e.handlers().forEach((t=>{i.on(t.type,t.handler)})),i}(n,n._handler,t,a),n._redraw=!0,t&&"none"!==i&&(e=e?n._elBind=UB(n,e,!0):t.appendChild(FB("form",{class:"vega-bindings"})),n._bind.forEach((t=>{t.param.element&&"container"!==i&&(t.element=UB(n,t.param.element,!!t.param.input))})),n._bind.forEach((t=>{!function(t,e,n){if(!e)return;const r=n.param;let i=n.state;i||(i=n.state={elements:null,active:!1,set:null,update:e=>{e!=t.signal(r.signal)&&t.runAsync(null,(()=>{i.source=!0,t.signal(r.signal,e)}))}},r.debounce&&(i.update=K(r.debounce,i.update))),(null==r.input&&r.element?SB:BB)(i,e,r,t),i.active||(t.on(t._signals[r.signal],null,(()=>{i.source?i.source=!1:i.set(t.signal(r.signal))})),i.active=!0)}(n,t.element||e,t)}))),n},toImageURL:async function(t,e){t!==xv.Canvas&&t!==xv.SVG&&t!==xv.PNG&&s("Unrecognized image type: "+t);const n=await IB(this,t,e);return t===xv.SVG?function(t,e){const n=new Blob([t],{type:e});return window.URL.createObjectURL(n)}(n.svg(),"image/svg+xml"):n.canvas().toDataURL("image/png")},toCanvas:async function(t,e){return(await IB(this,xv.Canvas,t,e)).canvas()},toSVG:async function(t){return(await IB(this,xv.SVG,t)).svg()},getState:function(t){return this._runtime.getState(t||{data:JB,signals:ZB,recurse:!0})},setState:function(t){return this.runAsync(null,(e=>{e._trigger=!1,e._runtime.setState(t)}),(t=>{t._trigger=!0})),this}});const aT="[",uT="]",sT=/[[\]{}]/,lT={"*":1,arc:1,area:1,group:1,image:1,line:1,path:1,rect:1,rule:1,shape:1,symbol:1,text:1,trail:1};let cT,fT;function hT(t,e,n){return cT=e||"view",fT=n||lT,pT(t.trim()).map(gT)}function dT(t,e,n,r,i){const o=t.length;let a,u=0;for(;e<o;++e){if(a=t[e],!u&&a===n)return e;i&&i.indexOf(a)>=0?--u:r&&r.indexOf(a)>=0&&++u}return e}function pT(t){const e=[],n=t.length;let r=0,i=0;for(;i<n;)i=dT(t,i,",","[{","]}"),e.push(t.substring(r,i).trim()),r=++i;if(0===e.length)throw"Empty event selector: "+t;return e}function gT(t){return"["===t[0]?function(t){const e=t.length;let n,r=1;if(r=dT(t,r,uT,aT,uT),r===e)throw"Empty between selector: "+t;if(n=pT(t.substring(1,r)),2!==n.length)throw"Between selector must have two elements: "+t;if(">"!==(t=t.slice(r+1).trim())[0])throw"Expected '>' after between selector: "+t;n=n.map(gT);const i=gT(t.slice(1).trim());if(i.between)return{between:n,stream:i};i.between=n;return i}(t):function(t){const e={source:cT},n=[];let r,i,o=[0,0],a=0,u=0,s=t.length,l=0;if("}"===t[s-1]){if(l=t.lastIndexOf("{"),!(l>=0))throw"Unmatched right brace: "+t;try{o=function(t){const e=t.split(",");if(!t.length||e.length>2)throw t;return e.map((e=>{const n=+e;if(n!=n)throw t;return n}))}(t.substring(l+1,s-1))}catch(e){throw"Invalid throttle specification: "+t}s=(t=t.slice(0,l).trim()).length,l=0}if(!s)throw t;"@"===t[0]&&(a=++l);r=dT(t,l,":"),r<s&&(n.push(t.substring(u,r).trim()),u=l=++r);if(l=dT(t,l,aT),l===s)n.push(t.substring(u,s).trim());else if(n.push(t.substring(u,l).trim()),i=[],u=++l,u===s)throw"Unmatched left bracket: "+t;for(;l<s;){if(l=dT(t,l,uT),l===s)throw"Unmatched left bracket: "+t;if(i.push(t.substring(u,l).trim()),l<s-1&&t[++l]!==aT)throw"Expected left bracket: "+t;u=++l}if(!(s=n.length)||sT.test(n[s-1]))throw"Invalid event selector: "+t;s>1?(e.type=n[1],a?e.markname=n[0].slice(1):!function(t){return fT[t]}(n[0])?e.source=n[0]:e.marktype=n[0]):e.type=n[0];"!"===e.type.slice(-1)&&(e.consume=!0,e.type=e.type.slice(0,-1));null!=i&&(e.filter=i);o[0]&&(e.throttle=o[0]);o[1]&&(e.debounce=o[1]);return e}(t)}function mT(t){return x(t)?t:{type:t||"pad"}}const yT=t=>+t||0;function vT(t){return x(t)?t.signal?t:{top:yT(t.top),bottom:yT(t.bottom),left:yT(t.left),right:yT(t.right)}:{top:e=yT(t),bottom:e,left:e,right:e};var e}const _T=t=>x(t)&&!_(t)?tt({},t):{value:t};function xT(t,e,n,r){if(null!=n){return x(n)&&!_(n)||_(n)&&n.length&&x(n[0])?t.update[e]=n:t[r||"enter"][e]={value:n},1}return 0}function bT(t,e,n){for(const n in e)xT(t,n,e[n]);for(const e in n)xT(t,e,n[e],"update")}function wT(t,e,n){for(const r in e)n&&it(n,r)||(t[r]=tt(t[r]||{},e[r]));return t}function kT(t,e){return e&&(e.enter&&e.enter[t]||e.update&&e.update[t])}const AT="mark",MT="frame",ET="scope",DT="legend-label",CT="title-text",FT="title-subtitle";function ST(t,e,n){t[e]=n&&n.signal?{signal:n.signal}:{value:n}}const BT=t=>gt(t)?kt(t):t.signal?`(${t.signal})`:OT(t);function TT(t){if(null!=t.gradient)return function(t){const e=[t.start,t.stop,t.count].map((t=>null==t?null:kt(t)));for(;e.length&&null==M(e);)e.pop();return e.unshift(BT(t.gradient)),`gradient(${e.join(",")})`}(t);let e=t.signal?`(${t.signal})`:t.color?function(t){return t.c?zT("hcl",t.h,t.c,t.l):t.h||t.s?zT("hsl",t.h,t.s,t.l):t.l||t.a?zT("lab",t.l,t.a,t.b):t.r||t.g||t.b?zT("rgb",t.r,t.g,t.b):null}(t.color):null!=t.field?OT(t.field):void 0!==t.value?kt(t.value):void 0;return null!=t.scale&&(e=function(t,e){const n=BT(t.scale);null!=t.range?e=`lerp(_range(${n}), ${+t.range})`:(void 0!==e&&(e=`_scale(${n}, ${e})`),t.band&&(e=(e?e+"+":"")+`_bandwidth(${n})`+(1==+t.band?"":"*"+NT(t.band)),t.extra&&(e=`(datum.extra ? _scale(${n}, datum.extra.value) : ${e})`)),null==e&&(e="0"));return e}(t,e)),void 0===e&&(e=null),null!=t.exponent&&(e=`pow(${e},${NT(t.exponent)})`),null!=t.mult&&(e+=`*${NT(t.mult)}`),null!=t.offset&&(e+=`+${NT(t.offset)}`),t.round&&(e=`round(${e})`),e}const zT=(t,e,n,r)=>`(${t}(${[e,n,r].map(TT).join(",")})+'')`;function NT(t){return x(t)?"("+TT(t)+")":t}function OT(t){return RT(x(t)?t:{datum:t})}function RT(t){let e,n,r;if(t.signal)e="datum",r=t.signal;else if(t.group||t.parent){for(n=Math.max(1,t.level||1),e="item";n-- >0;)e+=".mark.group";t.parent?(r=t.parent,e+=".datum"):r=t.group}else t.datum?(e="datum",r=t.datum):s("Invalid field reference: "+kt(t));return t.signal||(r=gt(r)?l(r).map(kt).join("]["):RT(r)),e+"["+r+"]"}function $T(t,e,n,r,i,o){const a={};(o=o||{}).encoders={$encode:a},t=function(t,e,n,r,i){const o={},a={};let u,s,l,c;for(s in s="lineBreak","text"!==e||null==i[s]||kT(s,t)||ST(o,s,i[s]),("legend"==n||String(n).startsWith("axis"))&&(n=null),c=n===MT?i.group:n===AT?tt({},i.mark,i[e]):null,c)l=kT(s,t)||("fill"===s||"stroke"===s)&&(kT("fill",t)||kT("stroke",t)),l||ST(o,s,c[s]);for(s in W(r).forEach((e=>{const n=i.style&&i.style[e];for(const e in n)kT(e,t)||ST(o,e,n[e])})),t=tt({},t),o)c=o[s],c.signal?(u=u||{})[s]=c:a[s]=c;return t.enter=tt(a,t.enter),u&&(t.update=tt(u,t.update)),t}(t,e,n,r,i.config);for(const n in t)a[n]=qT(t[n],e,o,i);return o}function qT(t,e,n,r){const i={},o={};for(const e in t)null!=t[e]&&(i[e]=LT((a=t[e],_(a)?function(t){let e="";return t.forEach((t=>{const n=TT(t);e+=t.test?`(${t.test})?${n}:`:n})),":"===M(e)&&(e+="null"),e}(a):TT(a)),r,n,o));var a;return{$expr:{marktype:e,channels:i},$fields:Object.keys(o),$output:Object.keys(t)}}function LT(t,e,n,r){const i=eB(t,e);return i.$fields.forEach((t=>r[t]=1)),tt(n,i.$params),i.$expr}const UT=["value","update","init","react","bind"];function PT(t,e){s(t+' for "outer" push: '+kt(e))}function jT(t,e){const n=t.name;if("outer"===t.push)e.signals[n]||PT("No prior signal definition",n),UT.forEach((e=>{void 0!==t[e]&&PT("Invalid property ",e)}));else{const r=e.addSignal(n,t.value);!1===t.react&&(r.react=!1),t.bind&&e.addBinding(n,t.bind)}}function IT(t,e,n,r){this.id=-1,this.type=t,this.value=e,this.params=n,r&&(this.parent=r)}function WT(t,e,n,r){return new IT(t,e,n,r)}function HT(t,e){return WT("operator",t,e)}function YT(t){const e={$ref:t.id};return t.id<0&&(t.refs=t.refs||[]).push(e),e}function VT(t,e){return e?{$field:t,$name:e}:{$field:t}}const GT=VT("key");function XT(t,e){return{$compare:t,$order:e}}function JT(t,e){return(t&&t.signal?"$"+t.signal:t||"")+(t&&e?"_":"")+(e&&e.signal?"$"+e.signal:e||"")}const ZT="scope",QT="view";function KT(t){return t&&t.signal}function tz(t){if(KT(t))return!0;if(x(t))for(const e in t)if(tz(t[e]))return!0;return!1}function ez(t,e){return null!=t?t:e}function nz(t){return t&&t.signal||t}const rz="timer";function iz(t,e){return(t.merge?oz:t.stream?az:t.type?uz:s("Invalid stream specification: "+kt(t)))(t,e)}function oz(t,e){const n=sz({merge:t.merge.map((t=>iz(t,e)))},t,e);return e.addStream(n).id}function az(t,e){const n=sz({stream:iz(t.stream,e)},t,e);return e.addStream(n).id}function uz(t,e){let n;t.type===rz?(n=e.event(rz,t.throttle),t={between:t.between,filter:t.filter}):n=e.event(function(t){return t===ZT?QT:t||QT}(t.source),t.type);const r=sz({stream:n},t,e);return 1===Object.keys(r).length?n:e.addStream(r).id}function sz(t,e,n){let r=e.between;return r&&(2!==r.length&&s('Stream "between" parameter must have 2 entries: '+kt(e)),t.between=[iz(r[0],n),iz(r[1],n)]),r=e.filter?[].concat(e.filter):[],(e.marktype||e.markname||e.markrole)&&r.push(function(t,e,n){const r="event.item";return r+(t&&"*"!==t?"&&"+r+".mark.marktype==='"+t+"'":"")+(n?"&&"+r+".mark.role==='"+n+"'":"")+(e?"&&"+r+".mark.name==='"+e+"'":"")}(e.marktype,e.markname,e.markrole)),e.source===ZT&&r.push("inScope(event.item)"),r.length&&(t.filter=eB("("+r.join(")&&(")+")",n).$expr),null!=(r=e.throttle)&&(t.throttle=+r),null!=(r=e.debounce)&&(t.debounce=+r),e.consume&&(t.consume=!0),t}const lz={code:"_.$value",ast:{type:"Identifier",value:"value"}};function cz(t,e,n){const r=t.encode,i={target:n};let o=t.events,a=t.update,u=[];o||s("Signal update missing events specification."),gt(o)&&(o=hT(o,e.isSubscope()?ZT:QT)),o=W(o).filter((t=>t.signal||t.scale?(u.push(t),0):1)),u.length>1&&(u=[fz(u)]),o.length&&u.push(o.length>1?{merge:o}:o[0]),null!=r&&(a&&s("Signal encode and update are mutually exclusive."),a="encode(item(),"+kt(r)+")"),i.update=gt(a)?eB(a,e):null!=a.expr?eB(a.expr,e):null!=a.value?a.value:null!=a.signal?{$expr:lz,$params:{$value:e.signalRef(a.signal)}}:s("Invalid signal update specification."),t.force&&(i.options={force:!0}),u.forEach((t=>e.addUpdate(tt(function(t,e){return{source:t.signal?e.signalRef(t.signal):t.scale?e.scaleRef(t.scale):iz(t,e)}}(t,e),i))))}function fz(t){return{signal:"["+t.map((t=>t.scale?'scale("'+t.scale+'")':t.signal))+"]"}}const hz=t=>(e,n,r)=>WT(t,n,e||void 0,r),dz=hz("aggregate"),pz=hz("axisticks"),gz=hz("bound"),mz=hz("collect"),yz=hz("compare"),vz=hz("datajoin"),_z=hz("encode"),xz=hz("expression"),bz=hz("facet"),wz=hz("field"),kz=hz("key"),Az=hz("legendentries"),Mz=hz("load"),Ez=hz("mark"),Dz=hz("multiextent"),Cz=hz("multivalues"),Fz=hz("overlap"),Sz=hz("params"),Bz=hz("prefacet"),Tz=hz("projection"),zz=hz("proxy"),Nz=hz("relay"),Oz=hz("render"),Rz=hz("scale"),$z=hz("sieve"),qz=hz("sortitems"),Lz=hz("viewlayout"),Uz=hz("values");let Pz=0;const jz={min:"min",max:"max",count:"sum"};function Iz(t,e){const n=e.getScale(t.name).params;let r;for(r in n.domain=Vz(t.domain,t,e),null!=t.range&&(n.range=eN(t,e,n)),null!=t.interpolate&&function(t,e){e.interpolate=Wz(t.type||t),null!=t.gamma&&(e.interpolateGamma=Wz(t.gamma))}(t.interpolate,n),null!=t.nice&&(n.nice=function(t){return x(t)?{interval:Wz(t.interval),step:Wz(t.step)}:Wz(t)}(t.nice)),null!=t.bins&&(n.bins=function(t,e){return t.signal||_(t)?Hz(t,e):e.objectProperty(t)}(t.bins,e)),t)it(n,r)||"name"===r||(n[r]=Wz(t[r],e))}function Wz(t,e){return x(t)?t.signal?e.signalRef(t.signal):s("Unsupported object: "+kt(t)):t}function Hz(t,e){return t.signal?e.signalRef(t.signal):t.map((t=>Wz(t,e)))}function Yz(t){s("Can not find data set: "+kt(t))}function Vz(t,e,n){if(t)return t.signal?n.signalRef(t.signal):(_(t)?Gz:t.fields?Jz:Xz)(t,e,n);null==e.domainMin&&null==e.domainMax||s("No scale domain defined for domainMin/domainMax to override.")}function Gz(t,e,n){return t.map((t=>Wz(t,n)))}function Xz(t,e,n){const r=n.getData(t.data);return r||Yz(t.data),vd(e.type)?r.valuesRef(n,t.field,Qz(t.sort,!1)):wd(e.type)?r.domainRef(n,t.field):r.extentRef(n,t.field)}function Jz(t,e,n){const r=t.data,i=t.fields.reduce(((t,e)=>(e=gt(e)?{data:r,field:e}:_(e)||e.signal?function(t,e){const n="_:vega:_"+Pz++,r=mz({});if(_(t))r.value={$ingest:t};else if(t.signal){const i="setdata("+kt(n)+","+t.signal+")";r.params.input=e.signalRef(i)}return e.addDataPipeline(n,[r,$z({})]),{data:n,field:"data"}}(e,n):e,t.push(e),t)),[]);return(vd(e.type)?Zz:wd(e.type)?Kz:tN)(t,n,i)}function Zz(t,e,n){const r=Qz(t.sort,!0);let i,o;const a=n.map((t=>{const n=e.getData(t.data);return n||Yz(t.data),n.countsRef(e,t.field,r)})),u={groupby:GT,pulse:a};r&&(i=r.op||"count",o=r.field?JT(i,r.field):"count",u.ops=[jz[i]],u.fields=[e.fieldRef(o)],u.as=[o]),i=e.add(dz(u));const s=e.add(mz({pulse:YT(i)}));return o=e.add(Uz({field:GT,sort:e.sortRef(r),pulse:YT(s)})),YT(o)}function Qz(t,e){return t&&(t.field||t.op?t.field||"count"===t.op?e&&t.field&&t.op&&!jz[t.op]&&s("Multiple domain scales can not be sorted using "+t.op):s("No field provided for sort aggregate op: "+t.op):x(t)?t.field="key":t={field:"key"}),t}function Kz(t,e,n){const r=n.map((t=>{const n=e.getData(t.data);return n||Yz(t.data),n.domainRef(e,t.field)}));return YT(e.add(Cz({values:r})))}function tN(t,e,n){const r=n.map((t=>{const n=e.getData(t.data);return n||Yz(t.data),n.extentRef(e,t.field)}));return YT(e.add(Dz({extents:r})))}function eN(t,e,n){const r=e.config.range;let i=t.range;if(i.signal)return e.signalRef(i.signal);if(gt(i)){if(r&&it(r,i))return eN(t=tt({},t,{range:r[i]}),e,n);"width"===i?i=[0,{signal:"width"}]:"height"===i?i=vd(t.type)?[0,{signal:"height"}]:[{signal:"height"},0]:s("Unrecognized scale range value: "+kt(i))}else{if(i.scheme)return n.scheme=_(i.scheme)?Hz(i.scheme,e):Wz(i.scheme,e),i.extent&&(n.schemeExtent=Hz(i.extent,e)),void(i.count&&(n.schemeCount=Wz(i.count,e)));if(i.step)return void(n.rangeStep=Wz(i.step,e));if(vd(t.type)&&!_(i))return Vz(i,t,e);_(i)||s("Unsupported range type: "+kt(i))}return i.map((t=>(_(t)?Hz:Wz)(t,e)))}function nN(t,e,n){return _(t)?t.map((t=>nN(t,e,n))):x(t)?t.signal?n.signalRef(t.signal):"fit"===e?t:s("Unsupported parameter object: "+kt(t)):t}const rN="top",iN="left",oN="right",aN="bottom",uN="center",sN="index",lN="label",cN="perc",fN="value",hN="guide-label",dN="guide-title",pN="group-title",gN="group-subtitle",mN="symbol",yN="gradient",vN="discrete",_N="size",xN=[_N,"shape","fill","stroke","strokeWidth","strokeDash","opacity"],bN={name:1,style:1,interactive:1},wN={value:0},kN={value:1},AN="group",MN="rect",EN="rule",DN="text";function CN(t){return t.type=AN,t.interactive=t.interactive||!1,t}function FN(t,e){const n=(n,r)=>ez(t[n],ez(e[n],r));return n.isVertical=n=>"vertical"===ez(t.direction,e.direction||(n?e.symbolDirection:e.gradientDirection)),n.gradientLength=()=>ez(t.gradientLength,e.gradientLength||e.gradientWidth),n.gradientThickness=()=>ez(t.gradientThickness,e.gradientThickness||e.gradientHeight),n.entryColumns=()=>ez(t.columns,ez(e.columns,+n.isVertical(!0))),n}function SN(t,e){const n=e&&(e.update&&e.update[t]||e.enter&&e.enter[t]);return n&&n.signal?n:n?n.value:null}function BN(t,e,n){return`item.anchor === 'start' ? ${t} : item.anchor === 'end' ? ${e} : ${n}`}const TN=BN(kt(iN),kt(oN),kt(uN));function zN(t,e){return e?t?x(t)?Object.assign({},t,{offset:zN(t.offset,e)}):{value:t,offset:e}:e:t}function NN(t,e){return e?(t.name=e.name,t.style=e.style||t.style,t.interactive=!!e.interactive,t.encode=wT(t.encode,e,bN)):t.interactive=!1,t}function ON(t,e,n,r){const i=FN(t,n),o=i.isVertical(),a=i.gradientThickness(),u=i.gradientLength();let s,l,c,f,h;o?(l=[0,1],c=[0,0],f=a,h=u):(l=[0,0],c=[1,0],f=u,h=a);const d={enter:s={opacity:wN,x:wN,y:wN,width:_T(f),height:_T(h)},update:tt({},s,{opacity:kN,fill:{gradient:e,start:l,stop:c}}),exit:{opacity:wN}};return bT(d,{stroke:i("gradientStrokeColor"),strokeWidth:i("gradientStrokeWidth")},{opacity:i("gradientOpacity")}),NN({type:MN,role:"legend-gradient",encode:d},r)}function RN(t,e,n,r,i){const o=FN(t,n),a=o.isVertical(),u=o.gradientThickness(),s=o.gradientLength();let l,c,f,h,d="";a?(l="y",f="y2",c="x",h="width",d="1-"):(l="x",f="x2",c="y",h="height");const p={opacity:wN,fill:{scale:e,field:fN}};p[l]={signal:d+"datum."+cN,mult:s},p[c]=wN,p[f]={signal:d+"datum.perc2",mult:s},p[h]=_T(u);const g={enter:p,update:tt({},p,{opacity:kN}),exit:{opacity:wN}};return bT(g,{stroke:o("gradientStrokeColor"),strokeWidth:o("gradientStrokeWidth")},{opacity:o("gradientOpacity")}),NN({type:MN,role:"legend-band",key:fN,from:i,encode:g},r)}function $N(t,e,n,r){const i=FN(t,e),o=i.isVertical(),a=_T(i.gradientThickness()),u=i.gradientLength();let s,l,c,f,h=i("labelOverlap"),d="";const p={enter:s={opacity:wN},update:l={opacity:kN,text:{field:lN}},exit:{opacity:wN}};return bT(p,{fill:i("labelColor"),fillOpacity:i("labelOpacity"),font:i("labelFont"),fontSize:i("labelFontSize"),fontStyle:i("labelFontStyle"),fontWeight:i("labelFontWeight"),limit:ez(t.labelLimit,e.gradientLabelLimit)}),o?(s.align={value:"left"},s.baseline=l.baseline={signal:'datum.perc<=0?"bottom":datum.perc>=1?"top":"middle"'},c="y",f="x",d="1-"):(s.align=l.align={signal:'datum.perc<=0?"left":datum.perc>=1?"right":"center"'},s.baseline={value:"top"},c="x",f="y"),s[c]=l[c]={signal:d+"datum."+cN,mult:u},s[f]=l[f]=a,a.offset=ez(t.labelOffset,e.gradientLabelOffset)||0,h=h?{separation:i("labelSeparation"),method:h,order:"datum.index"}:void 0,NN({type:DN,role:DT,style:hN,key:fN,from:r,encode:p,overlap:h},n)}function qN(t,e,n,r,i){const o=FN(t,e),a=n.entries,u=!(!a||!a.interactive),s=a?a.name:void 0,l=o("clipHeight"),c=o("symbolOffset"),f={data:"value"},h=`(${i}) ? datum.offset : datum.size`,d=l?_T(l):{field:_N},p="datum.index",g=`max(1, ${i})`;let m,y,v,_,x;d.mult=.5,m={enter:y={opacity:wN,x:{signal:h,mult:.5,offset:c},y:d},update:v={opacity:kN,x:y.x,y:y.y},exit:{opacity:wN}};let b=null,w=null;t.fill||(b=e.symbolBaseFillColor,w=e.symbolBaseStrokeColor),bT(m,{fill:o("symbolFillColor",b),shape:o("symbolType"),size:o("symbolSize"),stroke:o("symbolStrokeColor",w),strokeDash:o("symbolDash"),strokeDashOffset:o("symbolDashOffset"),strokeWidth:o("symbolStrokeWidth")},{opacity:o("symbolOpacity")}),xN.forEach((e=>{t[e]&&(v[e]=y[e]={scale:t[e],field:fN})}));const k=NN({type:"symbol",role:"legend-symbol",key:fN,from:f,clip:!!l||void 0,encode:m},n.symbols),A=_T(c);A.offset=o("labelOffset"),m={enter:y={opacity:wN,x:{signal:h,offset:A},y:d},update:v={opacity:kN,text:{field:lN},x:y.x,y:y.y},exit:{opacity:wN}},bT(m,{align:o("labelAlign"),baseline:o("labelBaseline"),fill:o("labelColor"),fillOpacity:o("labelOpacity"),font:o("labelFont"),fontSize:o("labelFontSize"),fontStyle:o("labelFontStyle"),fontWeight:o("labelFontWeight"),limit:o("labelLimit")});const M=NN({type:DN,role:DT,style:hN,key:fN,from:f,encode:m},n.labels);return m={enter:{noBound:{value:!l},width:wN,height:l?_T(l):wN,opacity:wN},exit:{opacity:wN},update:v={opacity:kN,row:{signal:null},column:{signal:null}}},o.isVertical(!0)?(_=`ceil(item.mark.items.length / ${g})`,v.row.signal=`${p}%${_}`,v.column.signal=`floor(${p} / ${_})`,x={field:["row",p]}):(v.row.signal=`floor(${p} / ${g})`,v.column.signal=`${p} % ${g}`,x={field:p}),v.column.signal=`(${i})?${v.column.signal}:${p}`,CN({role:ET,from:r={facet:{data:r,name:"value",groupby:sN}},encode:wT(m,a,bN),marks:[k,M],name:s,interactive:u,sort:x})}const LN='item.orient === "left"',UN='item.orient === "right"',PN=`(${LN} || ${UN})`,jN=`datum.vgrad && ${PN}`,IN=BN('"top"','"bottom"','"middle"'),WN=`datum.vgrad && ${UN} ? (${BN('"right"','"left"','"center"')}) : (${PN} && !(datum.vgrad && ${LN})) ? "left" : ${TN}`,HN=`item._anchor || (${PN} ? "middle" : "start")`,YN=`${jN} ? (${LN} ? -90 : 90) : 0`,VN=`${PN} ? (datum.vgrad ? (${UN} ? "bottom" : "top") : ${IN}) : "top"`;function GN(t,e){let n;return x(t)&&(t.signal?n=t.signal:t.path?n="pathShape("+XN(t.path)+")":t.sphere&&(n="geoShape("+XN(t.sphere)+', {type: "Sphere"})')),n?e.signalRef(n):!!t}function XN(t){return x(t)&&t.signal?t.signal:kt(t)}function JN(t){const e=t.role||"";return e.indexOf("axis")&&e.indexOf("legend")&&e.indexOf("title")?t.type===AN?ET:e||AT:e}function ZN(t){return{marktype:t.type,name:t.name||void 0,role:t.role||JN(t),zindex:+t.zindex||void 0,aria:t.aria,description:t.description}}function QN(t,e){return t&&t.signal?e.signalRef(t.signal):!1!==t}function KN(t,e){const n=ya(t.type);n||s("Unrecognized transform type: "+kt(t.type));const r=WT(n.type.toLowerCase(),null,tO(n,t,e));return t.signal&&e.addSignal(t.signal,e.proxy(r)),r.metadata=n.metadata||{},r}function tO(t,e,n){const r={},i=t.params.length;for(let o=0;o<i;++o){const i=t.params[o];r[i.name]=eO(i,e,n)}return r}function eO(t,e,n){const r=t.type,i=e[t.name];return"index"===r?function(t,e,n){gt(e.from)||s('Lookup "from" parameter must be a string literal.');return n.getData(e.from).lookupRef(n,e.key)}(0,e,n):void 0!==i?"param"===r?function(t,e,n){const r=e[t.name];return t.array?(_(r)||s("Expected an array of sub-parameters. Instead: "+kt(r)),r.map((e=>rO(t,e,n)))):rO(t,r,n)}(t,e,n):"projection"===r?n.projectionRef(e[t.name]):t.array&&!KT(i)?i.map((e=>nO(t,e,n))):nO(t,i,n):void(t.required&&s("Missing required "+kt(e.type)+" parameter: "+kt(t.name)))}function nO(t,e,n){const r=t.type;if(KT(e))return uO(r)?s("Expression references can not be signals."):sO(r)?n.fieldRef(e):lO(r)?n.compareRef(e):n.signalRef(e.signal);{const i=t.expr||sO(r);return i&&iO(e)?n.exprRef(e.expr,e.as):i&&oO(e)?VT(e.field,e.as):uO(r)?eB(e,n):aO(r)?YT(n.getData(e).values):sO(r)?VT(e):lO(r)?n.compareRef(e):e}}function rO(t,e,n){const r=t.params.length;let i;for(let n=0;n<r;++n){i=t.params[n];for(const t in i.key)if(i.key[t]!==e[t]){i=null;break}if(i)break}i||s("Unsupported parameter: "+kt(e));const o=tt(tO(i,e,n),i.key);return YT(n.add(Sz(o)))}const iO=t=>t&&t.expr,oO=t=>t&&t.field,aO=t=>"data"===t,uO=t=>"expr"===t,sO=t=>"field"===t,lO=t=>"compare"===t;function cO(t,e){return t.$ref?t:t.data&&t.data.$ref?t.data:YT(e.getData(t.data).output)}function fO(t,e,n,r,i){this.scope=t,this.input=e,this.output=n,this.values=r,this.aggregate=i,this.index={}}function hO(t){return gt(t)?t:null}function dO(t,e,n){const r=JT(n.op,n.field);let i;if(e.ops){for(let t=0,n=e.as.length;t<n;++t)if(e.as[t]===r)return}else e.ops=["count"],e.fields=[null],e.as=["count"];n.op&&(e.ops.push((i=n.op.signal)?t.signalRef(i):n.op),e.fields.push(t.fieldRef(n.field)),e.as.push(r))}function pO(t,e,n,r,i,o,a){const u=e[n]||(e[n]={}),s=function(t){return x(t)?("descending"===t.order?"-":"+")+JT(t.op,t.field):""}(o);let l,c,f=hO(i);if(null!=f&&(t=e.scope,f+=s?"|"+s:"",l=u[f]),!l){const n=o?{field:GT,pulse:e.countsRef(t,i,o)}:{field:t.fieldRef(i),pulse:YT(e.output)};s&&(n.sort=t.sortRef(o)),c=t.add(WT(r,void 0,n)),a&&(e.index[i]=c),l=YT(c),null!=f&&(u[f]=l)}return l}function gO(t,e,n){const r=t.remove,i=t.insert,o=t.toggle,a=t.modify,u=t.values,s=e.add(HT()),l=eB("if("+t.trigger+',modify("'+n+'",'+[i,r,o,a,u].map((t=>null==t?"null":t)).join(",")+"),0)",e);s.update=l.$expr,s.params=l.$params}function mO(t,e){const n=JN(t),r=t.type===AN,i=t.from&&t.from.facet,o=t.overlap;let a,u,l,c,f,h,d,p=t.layout||n===ET||n===MT;const g=n===AT||p||i,m=function(t,e,n){let r,i,o,a,u;return t?(r=t.facet)&&(e||s("Only group marks can be faceted."),null!=r.field?a=u=cO(r,n):(t.data?u=YT(n.getData(t.data).aggregate):(o=KN(tt({type:"aggregate",groupby:W(r.groupby)},r.aggregate),n),o.params.key=n.keyRef(r.groupby),o.params.pulse=cO(r,n),a=u=YT(n.add(o))),i=n.keyRef(r.groupby,!0))):a=YT(n.add(mz(null,[{}]))),a||(a=cO(t,n)),{key:i,pulse:a,parent:u}}(t.from,r,e);u=e.add(vz({key:m.key||(t.key?VT(t.key):void 0),pulse:m.pulse,clean:!r}));const y=YT(u);u=l=e.add(mz({pulse:y})),u=e.add(Ez({markdef:ZN(t),interactive:QN(t.interactive,e),clip:GN(t.clip,e),context:{$context:!0},groups:e.lookup(),parent:e.signals.parent?e.signalRef("parent"):null,index:e.markpath(),pulse:YT(u)}));const v=YT(u);u=c=e.add(_z($T(t.encode,t.type,n,t.style,e,{mod:!1,pulse:v}))),u.params.parent=e.encode(),t.transform&&t.transform.forEach((t=>{const n=KN(t,e),r=n.metadata;(r.generates||r.changes)&&s("Mark transforms should not generate new data."),r.nomod||(c.params.mod=!0),n.params.pulse=YT(u),e.add(u=n)})),t.sort&&(u=e.add(qz({sort:e.compareRef(t.sort),pulse:YT(u)})));const _=YT(u);(i||p)&&(p=e.add(Lz({layout:e.objectProperty(t.layout),legends:e.legends,mark:v,pulse:_})),h=YT(p));const x=e.add(gz({mark:v,pulse:h||_}));d=YT(x),r&&(g&&(a=e.operators,a.pop(),p&&a.pop()),e.pushState(_,h||d,y),i?function(t,e,n){const r=t.from.facet,i=r.name,o=cO(r,e);let a;r.name||s("Facet must have a name: "+kt(r)),r.data||s("Facet must reference a data set: "+kt(r)),r.field?a=e.add(Bz({field:e.fieldRef(r.field),pulse:o})):r.groupby?a=e.add(bz({key:e.keyRef(r.groupby),group:YT(e.proxy(n.parent)),pulse:o})):s("Facet must specify groupby or field: "+kt(r));const u=e.fork(),l=u.add(mz()),c=u.add($z({pulse:YT(l)}));u.addData(i,new fO(u,l,l,c)),u.addSignal("parent",null),a.params.subflow={$subflow:u.parse(t).toRuntime()}}(t,e,m):g?function(t,e,n){const r=e.add(Bz({pulse:n.pulse})),i=e.fork();i.add($z()),i.addSignal("parent",null),r.params.subflow={$subflow:i.parse(t).toRuntime()}}(t,e,m):e.parse(t),e.popState(),g&&(p&&a.push(p),a.push(x))),o&&(d=function(t,e,n){const r=t.method,i=t.bound,o=t.separation,a={separation:KT(o)?n.signalRef(o.signal):o,method:KT(r)?n.signalRef(r.signal):r,pulse:e};t.order&&(a.sort=n.compareRef({field:t.order}));if(i){const t=i.tolerance;a.boundTolerance=KT(t)?n.signalRef(t.signal):+t,a.boundScale=n.scaleRef(i.scale),a.boundOrient=i.orient}return YT(n.add(Fz(a)))}(o,d,e));const b=e.add(Oz({pulse:d})),w=e.add($z({pulse:YT(b)},void 0,e.parent()));null!=t.name&&(f=t.name,e.addData(f,new fO(e,l,b,w)),t.on&&t.on.forEach((t=>{(t.insert||t.remove||t.toggle)&&s("Marks only support modify triggers."),gO(t,e,f)})))}function yO(t,e){const n=e.config.legend,r=t.encode||{},i=FN(t,n),o=r.legend||{},a=o.name||void 0,u=o.interactive,l=o.style,c={};let f,h,d,p=0;xN.forEach((e=>t[e]?(c[e]=t[e],p=p||t[e]):0)),p||s("Missing valid scale for legend.");const g=function(t,e){let n=t.type||mN;t.type||1!==function(t){return xN.reduce(((e,n)=>e+(t[n]?1:0)),0)}(t)||!t.fill&&!t.stroke||(n=yd(e)?yN:_d(e)?vN:mN);return n!==yN?n:_d(e)?vN:yN}(t,e.scaleType(p)),m={title:null!=t.title,scales:c,type:g,vgrad:"symbol"!==g&&i.isVertical()},y=YT(e.add(mz(null,[m]))),v=YT(e.add(Az(h={type:g,scale:e.scaleRef(p),count:e.objectProperty(i("tickCount")),limit:e.property(i("symbolLimit")),values:e.objectProperty(t.values),minstep:e.property(t.tickMinStep),formatType:e.property(t.formatType),formatSpecifier:e.property(t.format)})));return g===yN?(d=[ON(t,p,n,r.gradient),$N(t,n,r.labels,v)],h.count=h.count||e.signalRef(`max(2,2*floor((${nz(i.gradientLength())})/100))`)):g===vN?d=[RN(t,p,n,r.gradient,v),$N(t,n,r.labels,v)]:(f=function(t,e){const n=FN(t,e);return{align:n("gridAlign"),columns:n.entryColumns(),center:{row:!0,column:!1},padding:{row:n("rowPadding"),column:n("columnPadding")}}}(t,n),d=[qN(t,n,r,v,nz(f.columns))],h.size=function(t,e,n){const r=nz(_O("size",t,n)),i=nz(_O("strokeWidth",t,n)),o=nz(function(t,e,n){return SN("fontSize",t)||function(t,e,n){const r=e.config.style[n];return r&&r[t]}("fontSize",e,n)}(n[1].encode,e,hN));return eB(`max(ceil(sqrt(${r})+${i}),${o})`,e)}(t,e,d[0].marks)),d=[CN({role:"legend-entry",from:y,encode:{enter:{x:{value:0},y:{value:0}}},marks:d,layout:f,interactive:u})],m.title&&d.push(function(t,e,n,r){const i=FN(t,e),o={enter:{opacity:wN},update:{opacity:kN,x:{field:{group:"padding"}},y:{field:{group:"padding"}}},exit:{opacity:wN}};return bT(o,{orient:i("titleOrient"),_anchor:i("titleAnchor"),anchor:{signal:HN},angle:{signal:YN},align:{signal:WN},baseline:{signal:VN},text:t.title,fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),baseline:i("titleBaseline")}),NN({type:DN,role:"legend-title",style:dN,from:r,encode:o},n)}(t,n,r.title,y)),mO(CN({role:"legend",from:y,encode:wT(vO(i,t,n),o,bN),marks:d,aria:i("aria"),description:i("description"),zindex:i("zindex"),name:a,interactive:u,style:l}),e)}function vO(t,e,n){const r={enter:{},update:{}};return bT(r,{orient:t("orient"),offset:t("offset"),padding:t("padding"),titlePadding:t("titlePadding"),cornerRadius:t("cornerRadius"),fill:t("fillColor"),stroke:t("strokeColor"),strokeWidth:n.strokeWidth,strokeDash:n.strokeDash,x:t("legendX"),y:t("legendY"),format:e.format,formatType:e.formatType}),r}function _O(t,e,n){return e[t]?`scale("${e[t]}",datum)`:SN(t,n[0].encode)}fO.fromEntries=function(t,e){const n=e.length,r=e[n-1],i=e[n-2];let o=e[0],a=null,u=1;for(o&&"load"===o.type&&(o=e[1]),t.add(e[0]);u<n;++u)e[u].params.pulse=YT(e[u-1]),t.add(e[u]),"aggregate"===e[u].type&&(a=e[u]);return new fO(t,o,i,r,a)},fO.prototype={countsRef(t,e,n){const r=this,i=r.counts||(r.counts={}),o=hO(e);let a,u,s;return null!=o&&(t=r.scope,a=i[o]),a?n&&n.field&&dO(t,a.agg.params,n):(s={groupby:t.fieldRef(e,"key"),pulse:YT(r.output)},n&&n.field&&dO(t,s,n),u=t.add(dz(s)),a=t.add(mz({pulse:YT(u)})),a={agg:u,ref:YT(a)},null!=o&&(i[o]=a)),a.ref},tuplesRef(){return YT(this.values)},extentRef(t,e){return pO(t,this,"extent","extent",e,!1)},domainRef(t,e){return pO(t,this,"domain","values",e,!1)},valuesRef(t,e,n){return pO(t,this,"vals","values",e,n||!0)},lookupRef(t,e){return pO(t,this,"lookup","tupleindex",e,!1)},indataRef(t,e){return pO(t,this,"indata","tupleindex",e,!0,!0)}};function xO(t,e){const n=FN(t=gt(t)?{text:t}:t,e.config.title),r=t.encode||{},i=r.group||{},o=i.name||void 0,a=i.interactive,u=i.style,s=[],l=YT(e.add(mz(null,[{}])));return s.push(function(t,e,n,r){const i={value:0},o=t.text,a={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return bT(a,{text:o,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:e("dx"),dy:e("dy"),fill:e("color"),font:e("font"),fontSize:e("fontSize"),fontStyle:e("fontStyle"),fontWeight:e("fontWeight"),lineHeight:e("lineHeight")},{align:e("align"),angle:e("angle"),baseline:e("baseline")}),NN({type:DN,role:CT,style:pN,from:r,encode:a},n)}(t,n,function(t){const e=t.encode;return e&&e.title||tt({name:t.name,interactive:t.interactive,style:t.style},e)}(t),l)),t.subtitle&&s.push(function(t,e,n,r){const i={value:0},o=t.subtitle,a={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return bT(a,{text:o,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:e("dx"),dy:e("dy"),fill:e("subtitleColor"),font:e("subtitleFont"),fontSize:e("subtitleFontSize"),fontStyle:e("subtitleFontStyle"),fontWeight:e("subtitleFontWeight"),lineHeight:e("subtitleLineHeight")},{align:e("align"),angle:e("angle"),baseline:e("baseline")}),NN({type:DN,role:FT,style:gN,from:r,encode:a},n)}(t,n,r.subtitle,l)),mO(CN({role:"title",from:l,encode:bO(n,i),marks:s,aria:n("aria"),description:n("description"),zindex:n("zindex"),name:o,interactive:a,style:u}),e)}function bO(t,e){const n={enter:{},update:{}};return bT(n,{orient:t("orient"),anchor:t("anchor"),align:{signal:TN},angle:{signal:'item.orient==="left"?-90:item.orient==="right"?90:0'},limit:t("limit"),frame:t("frame"),offset:t("offset")||0,padding:t("subtitlePadding")}),wT(n,e,bN)}function wO(t,e){const n=[];t.transform&&t.transform.forEach((t=>{n.push(KN(t,e))})),t.on&&t.on.forEach((n=>{gO(n,e,t.name)})),e.addDataPipeline(t.name,function(t,e,n){const r=[];let i,o,a,u,s,l=null,c=!1,f=!1;t.values?KT(t.values)||tz(t.format)?(r.push(AO(e,t)),r.push(l=kO())):r.push(l=kO({$ingest:t.values,$format:t.format})):t.url?tz(t.url)||tz(t.format)?(r.push(AO(e,t)),r.push(l=kO())):r.push(l=kO({$request:t.url,$format:t.format})):t.source&&(l=i=W(t.source).map((t=>YT(e.getData(t).output))),r.push(null));for(o=0,a=n.length;o<a;++o)u=n[o],s=u.metadata,l||s.source||r.push(l=kO()),r.push(u),s.generates&&(f=!0),s.modifies&&!f&&(c=!0),s.source?l=u:s.changes&&(l=null);i&&(a=i.length-1,r[0]=Nz({derive:c,pulse:a?i:i[0]}),(c||a)&&r.splice(1,0,kO()));l||r.push(kO());return r.push($z({})),r}(t,e,n))}function kO(t){const e=mz({},t);return e.metadata={source:!0},e}function AO(t,e){return Mz({url:e.url?t.property(e.url):void 0,async:e.async?t.property(e.async):void 0,values:e.values?t.property(e.values):void 0,format:t.objectProperty(e.format)})}const MO=t=>t===aN||t===rN,EO=(t,e,n)=>KT(t)?TO(t.signal,e,n):t===iN||t===rN?e:n,DO=(t,e,n)=>KT(t)?SO(t.signal,e,n):MO(t)?e:n,CO=(t,e,n)=>KT(t)?BO(t.signal,e,n):MO(t)?n:e,FO=(t,e,n)=>KT(t)?zO(t.signal,e,n):t===rN?{value:e}:{value:n},SO=(t,e,n)=>OO(`${t} === 'top' || ${t} === 'bottom'`,e,n),BO=(t,e,n)=>OO(`${t} !== 'top' && ${t} !== 'bottom'`,e,n),TO=(t,e,n)=>$O(`${t} === 'left' || ${t} === 'top'`,e,n),zO=(t,e,n)=>$O(`${t} === 'top'`,e,n),NO=(t,e,n)=>$O(`${t} === 'right'`,e,n),OO=(t,e,n)=>(e=null!=e?_T(e):e,n=null!=n?_T(n):n,RO(e)&&RO(n)?{signal:`${t} ? (${e=e?e.signal||kt(e.value):null}) : (${n=n?n.signal||kt(n.value):null})`}:[tt({test:t},e)].concat(n||[])),RO=t=>null==t||1===Object.keys(t).length,$O=(t,e,n)=>({signal:`${t} ? (${LO(e)}) : (${LO(n)})`}),qO=(t,e,n,r,i)=>({signal:(null!=r?`${t} === 'left' ? (${LO(r)}) : `:"")+(null!=n?`${t} === 'bottom' ? (${LO(n)}) : `:"")+(null!=i?`${t} === 'right' ? (${LO(i)}) : `:"")+(null!=e?`${t} === 'top' ? (${LO(e)}) : `:"")+"(null)"}),LO=t=>KT(t)?t.signal:null==t?null:kt(t),UO=(t,e)=>{const n=t.signal;return n&&n.endsWith("(null)")?{signal:n.slice(0,-6)+e.signal}:t};function PO(t,e,n,r){let i;if(e&&it(e,t))return e[t];if(it(n,t))return n[t];if(t.startsWith("title")){switch(t){case"titleColor":i="fill";break;case"titleFont":case"titleFontSize":case"titleFontWeight":i=t[5].toLowerCase()+t.slice(6)}return r["guide-title"][i]}if(t.startsWith("label")){switch(t){case"labelColor":i="fill";break;case"labelFont":case"labelFontSize":i=t[5].toLowerCase()+t.slice(6)}return r["guide-label"][i]}return null}function jO(t){const e={};for(const n of t)if(n)for(const t in n)e[t]=1;return Object.keys(e)}function IO(t,e){return{scale:t.scale,range:e}}function WO(t,e,n,r,i){const o=FN(t,e),a=t.orient,u=t.gridScale,s=EO(a,1,-1),l=function(t,e){if(1===e);else if(x(t)){let n=t=tt({},t);for(;null!=n.mult;){if(!x(n.mult))return n.mult=KT(e)?{signal:`(${n.mult}) * (${e.signal})`}:n.mult*e,t;n=n.mult=tt({},n.mult)}n.mult=e}else t=KT(e)?{signal:`(${e.signal}) * (${t||0})`}:e*(t||0);return t}(t.offset,s);let c,f,h;const d={enter:c={opacity:wN},update:h={opacity:kN},exit:f={opacity:wN}};bT(d,{stroke:o("gridColor"),strokeCap:o("gridCap"),strokeDash:o("gridDash"),strokeDashOffset:o("gridDashOffset"),strokeOpacity:o("gridOpacity"),strokeWidth:o("gridWidth")});const p={scale:t.scale,field:fN,band:i.band,extra:i.extra,offset:i.offset,round:o("tickRound")},g=DO(a,{signal:"height"},{signal:"width"}),m=u?{scale:u,range:0,mult:s,offset:l}:{value:0,offset:l},y=u?{scale:u,range:1,mult:s,offset:l}:tt(g,{mult:s,offset:l});return c.x=h.x=DO(a,p,m),c.y=h.y=CO(a,p,m),c.x2=h.x2=CO(a,y),c.y2=h.y2=DO(a,y),f.x=DO(a,p),f.y=CO(a,p),NN({type:EN,role:"axis-grid",key:fN,from:r,encode:d},n)}function HO(t,e,n,r,i){return{signal:'flush(range("'+t+'"), scale("'+t+'", datum.value), '+e+","+n+","+r+","+i+")"}}function YO(t,e,n,r,i,o){const a=FN(t,e),u=t.orient,s=t.scale,l=EO(u,-1,1),c=nz(a("labelFlush")),f=nz(a("labelFlushOffset")),h=a("labelAlign"),d=a("labelBaseline");let p,g=0===c||!!c;const m=_T(i);m.mult=l,m.offset=_T(a("labelPadding")||0),m.offset.mult=l;const y={scale:s,field:fN,band:.5,offset:zN(o.offset,a("labelOffset"))},v=DO(u,g?HO(s,c,'"left"','"right"','"center"'):{value:"center"},((t,e,n)=>KT(t)?NO(t.signal,e,n):t===oN?{value:e}:{value:n})(u,"left","right")),_=DO(u,FO(u,"bottom","top"),g?HO(s,c,'"top"','"bottom"','"middle"'):{value:"middle"}),x=HO(s,c,`-(${f})`,f,0);g=g&&f;const b={opacity:wN,x:DO(u,y,m),y:CO(u,y,m)},w={enter:b,update:p={opacity:kN,text:{field:lN},x:b.x,y:b.y,align:v,baseline:_},exit:{opacity:wN,x:b.x,y:b.y}};bT(w,{dx:!h&&g?DO(u,x):null,dy:!d&&g?CO(u,x):null}),bT(w,{angle:a("labelAngle"),fill:a("labelColor"),fillOpacity:a("labelOpacity"),font:a("labelFont"),fontSize:a("labelFontSize"),fontWeight:a("labelFontWeight"),fontStyle:a("labelFontStyle"),limit:a("labelLimit"),lineHeight:a("labelLineHeight")},{align:h,baseline:d});const k=a("labelBound");let A=a("labelOverlap");return A=A||k?{separation:a("labelSeparation"),method:A,order:"datum.index",bound:k?{scale:s,orient:u,tolerance:k}:null}:void 0,p.align!==v&&(p.align=UO(p.align,v)),p.baseline!==_&&(p.baseline=UO(p.baseline,_)),NN({type:DN,role:"axis-label",style:hN,key:fN,from:r,encode:w,overlap:A},n)}function VO(t,e,n,r){const i=FN(t,e),o=t.orient,a=EO(o,-1,1);let u,s;const l={enter:u={opacity:wN,anchor:_T(i("titleAnchor",null)),align:{signal:TN}},update:s=tt({},u,{opacity:kN,text:_T(t.title)}),exit:{opacity:wN}},c={signal:`lerp(range("${t.scale}"), ${BN(0,1,.5)})`};return s.x=DO(o,c),s.y=CO(o,c),u.angle=DO(o,wN,((t,e)=>0===e?0:KT(t)?{signal:`(${t.signal}) * ${e}`}:{value:t*e})(a,90)),u.baseline=DO(o,FO(o,aN,rN),{value:aN}),s.angle=u.angle,s.baseline=u.baseline,bT(l,{fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),angle:i("titleAngle"),baseline:i("titleBaseline")}),function(t,e,n,r){const i=(t,e)=>null!=t?(n.update[e]=UO(_T(t),n.update[e]),!1):!kT(e,r),o=i(t("titleX"),"x"),a=i(t("titleY"),"y");n.enter.auto=a===o?_T(a):DO(e,_T(a),_T(o))}(i,o,l,n),l.update.align=UO(l.update.align,u.align),l.update.angle=UO(l.update.angle,u.angle),l.update.baseline=UO(l.update.baseline,u.baseline),NN({type:DN,role:"axis-title",style:dN,from:r,encode:l},n)}function GO(t,e){const n=function(t,e){var n,r,i,o=e.config,a=o.style,u=o.axis,s="band"===e.scaleType(t.scale)&&o.axisBand,l=t.orient;if(KT(l)){const t=jO([o.axisX,o.axisY]),e=jO([o.axisTop,o.axisBottom,o.axisLeft,o.axisRight]);for(i of(n={},t))n[i]=DO(l,PO(i,o.axisX,u,a),PO(i,o.axisY,u,a));for(i of(r={},e))r[i]=qO(l.signal,PO(i,o.axisTop,u,a),PO(i,o.axisBottom,u,a),PO(i,o.axisLeft,u,a),PO(i,o.axisRight,u,a))}else n=l===rN||l===aN?o.axisX:o.axisY,r=o["axis"+l[0].toUpperCase()+l.slice(1)];return n||r||s?tt({},u,n,r,s):u}(t,e),r=t.encode||{},i=r.axis||{},o=i.name||void 0,a=i.interactive,u=i.style,s=FN(t,n),l=function(t){const e=t("tickBand");let n,r,i=t("tickOffset");return e?e.signal?(n={signal:`(${e.signal}) === 'extent' ? 1 : 0.5`},r={signal:`(${e.signal}) === 'extent'`},x(i)||(i={signal:`(${e.signal}) === 'extent' ? 0 : ${i}`})):"extent"===e?(n=1,r=!0,i=0):(n=.5,r=!1):(n=t("bandPosition"),r=t("tickExtra")),{extra:r,band:n,offset:i}}(s),c={scale:t.scale,ticks:!!s("ticks"),labels:!!s("labels"),grid:!!s("grid"),domain:!!s("domain"),title:null!=t.title},f=YT(e.add(mz({},[c]))),h=YT(e.add(pz({scale:e.scaleRef(t.scale),extra:e.property(l.extra),count:e.objectProperty(t.tickCount),values:e.objectProperty(t.values),minstep:e.property(t.tickMinStep),formatType:e.property(t.formatType),formatSpecifier:e.property(t.format)}))),d=[];let p;return c.grid&&d.push(WO(t,n,r.grid,h,l)),c.ticks&&(p=s("tickSize"),d.push(function(t,e,n,r,i,o){const a=FN(t,e),u=t.orient,s=EO(u,-1,1);let l,c,f;const h={enter:l={opacity:wN},update:f={opacity:kN},exit:c={opacity:wN}};bT(h,{stroke:a("tickColor"),strokeCap:a("tickCap"),strokeDash:a("tickDash"),strokeDashOffset:a("tickDashOffset"),strokeOpacity:a("tickOpacity"),strokeWidth:a("tickWidth")});const d=_T(i);d.mult=s;const p={scale:t.scale,field:fN,band:o.band,extra:o.extra,offset:o.offset,round:a("tickRound")};return f.y=l.y=DO(u,wN,p),f.y2=l.y2=DO(u,d),c.x=DO(u,p),f.x=l.x=CO(u,wN,p),f.x2=l.x2=CO(u,d),c.y=CO(u,p),NN({type:EN,role:"axis-tick",key:fN,from:r,encode:h},n)}(t,n,r.ticks,h,p,l))),c.labels&&(p=c.ticks?p:0,d.push(YO(t,n,r.labels,h,p,l))),c.domain&&d.push(function(t,e,n,r){const i=FN(t,e),o=t.orient;let a,u;const s={enter:a={opacity:wN},update:u={opacity:kN},exit:{opacity:wN}};bT(s,{stroke:i("domainColor"),strokeCap:i("domainCap"),strokeDash:i("domainDash"),strokeDashOffset:i("domainDashOffset"),strokeWidth:i("domainWidth"),strokeOpacity:i("domainOpacity")});const l=IO(t,0),c=IO(t,1);return a.x=u.x=DO(o,l,wN),a.x2=u.x2=DO(o,c),a.y=u.y=CO(o,l,wN),a.y2=u.y2=CO(o,c),NN({type:EN,role:"axis-domain",from:r,encode:s},n)}(t,n,r.domain,f)),c.title&&d.push(VO(t,n,r.title,f)),mO(CN({role:"axis",from:f,encode:wT(XO(s,t),i,bN),marks:d,aria:s("aria"),description:s("description"),zindex:s("zindex"),name:o,interactive:a,style:u}),e)}function XO(t,e){const n={enter:{},update:{}};return bT(n,{orient:t("orient"),offset:t("offset")||0,position:ez(e.position,0),titlePadding:t("titlePadding"),minExtent:t("minExtent"),maxExtent:t("maxExtent"),range:{signal:`abs(span(range("${e.scale}")))`},translate:t("translate"),format:e.format,formatType:e.formatType}),n}function JO(t,e,n){const r=W(t.signals),i=W(t.scales);return n||r.forEach((t=>jT(t,e))),W(t.projections).forEach((t=>function(t,e){const n=e.config.projection||{},r={};for(const n in t)"name"!==n&&(r[n]=nN(t[n],n,e));for(const t in n)null==r[t]&&(r[t]=nN(n[t],t,e));e.addProjection(t.name,r)}(t,e))),i.forEach((t=>function(t,e){const n=t.type||"linear";gd(n)||s("Unrecognized scale type: "+kt(n)),e.addScale(t.name,{type:n,domain:void 0})}(t,e))),W(t.data).forEach((t=>wO(t,e))),i.forEach((t=>Iz(t,e))),(n||r).forEach((t=>function(t,e){const n=e.getSignal(t.name);let r=t.update;t.init&&(r?s("Signals can not include both init and update expressions."):(r=t.init,n.initonly=!0)),r&&(r=eB(r,e),n.update=r.$expr,n.params=r.$params),t.on&&t.on.forEach((t=>cz(t,e,n.id)))}(t,e))),W(t.axes).forEach((t=>GO(t,e))),W(t.marks).forEach((t=>mO(t,e))),W(t.legends).forEach((t=>yO(t,e))),t.title&&xO(t.title,e),e.parseLambdas(),e}function ZO(t,e){const n=e.config,r=YT(e.root=e.add(HT())),i=function(t,e){const n=n=>ez(t[n],e[n]),r=[QO("background",n("background")),QO("autosize",mT(n("autosize"))),QO("padding",vT(n("padding"))),QO("width",n("width")||0),QO("height",n("height")||0)],i=r.reduce(((t,e)=>(t[e.name]=e,t)),{}),o={};return W(t.signals).forEach((t=>{it(i,t.name)?t=tt(i[t.name],t):r.push(t),o[t.name]=t})),W(e.signals).forEach((t=>{it(o,t.name)||it(i,t.name)||r.push(t)})),r}(t,n);i.forEach((t=>jT(t,e))),e.description=t.description||n.description,e.eventConfig=n.events,e.legends=e.objectProperty(n.legend&&n.legend.layout),e.locale=n.locale;const o=e.add(mz()),a=e.add(_z($T((t=>wT({enter:{x:{value:0},y:{value:0}},update:{width:{signal:"width"},height:{signal:"height"}}},t))(t.encode),AN,MT,t.style,e,{pulse:YT(o)}))),u=e.add(Lz({layout:e.objectProperty(t.layout),legends:e.legends,autosize:e.signalRef("autosize"),mark:r,pulse:YT(a)}));e.operators.pop(),e.pushState(YT(a),YT(u),null),JO(t,e,i),e.operators.push(u);let s=e.add(gz({mark:r,pulse:YT(u)}));return s=e.add(Oz({pulse:YT(s)})),s=e.add($z({pulse:YT(s)})),e.addData("root",new fO(e,o,o,s)),e}function QO(t,e){return e&&e.signal?{name:t,update:e.signal}:{name:t,value:e}}function KO(t,e){this.config=t||{},this.options=e||{},this.bindings=[],this.field={},this.signals={},this.lambdas={},this.scales={},this.events={},this.data={},this.streams=[],this.updates=[],this.operators=[],this.eventConfig=null,this.locale=null,this._id=0,this._subid=0,this._nextsub=[0],this._parent=[],this._encode=[],this._lookup=[],this._markpath=[]}function tR(t){this.config=t.config,this.options=t.options,this.legends=t.legends,this.field=Object.create(t.field),this.signals=Object.create(t.signals),this.lambdas=Object.create(t.lambdas),this.scales=Object.create(t.scales),this.events=Object.create(t.events),this.data=Object.create(t.data),this.streams=[],this.updates=[],this.operators=[],this._id=0,this._subid=++t._nextsub[0],this._nextsub=t._nextsub,this._parent=t._parent.slice(),this._encode=t._encode.slice(),this._lookup=t._lookup.slice(),this._markpath=t._markpath}function eR(t){return(_(t)?nR:rR)(t)}function nR(t){const e=t.length;let n="[";for(let r=0;r<e;++r){const e=t[r];n+=(r>0?",":"")+(x(e)?e.signal||eR(e):kt(e))}return n+"]"}function rR(t){let e,n,r="{",i=0;for(e in t)n=t[e],r+=(++i>1?",":"")+kt(e)+":"+(x(n)?n.signal||eR(n):kt(n));return r+"}"}KO.prototype=tR.prototype={parse(t){return JO(t,this)},fork(){return new tR(this)},isSubscope(){return this._subid>0},toRuntime(){return this.finish(),{description:this.description,operators:this.operators,streams:this.streams,updates:this.updates,bindings:this.bindings,eventConfig:this.eventConfig,locale:this.locale}},id(){return(this._subid?this._subid+":":0)+this._id++},add(t){return this.operators.push(t),t.id=this.id(),t.refs&&(t.refs.forEach((e=>{e.$ref=t.id})),t.refs=null),t},proxy(t){const e=t instanceof IT?YT(t):t;return this.add(zz({value:e}))},addStream(t){return this.streams.push(t),t.id=this.id(),t},addUpdate(t){return this.updates.push(t),t},finish(){let t,e;for(t in this.root&&(this.root.root=!0),this.signals)this.signals[t].signal=t;for(t in this.scales)this.scales[t].scale=t;function n(t,e,n){let r,i;t&&(r=t.data||(t.data={}),i=r[e]||(r[e]=[]),i.push(n))}for(t in this.data){e=this.data[t],n(e.input,t,"input"),n(e.output,t,"output"),n(e.values,t,"values");for(const r in e.index)n(e.index[r],t,"index:"+r)}return this},pushState(t,e,n){this._encode.push(YT(this.add($z({pulse:t})))),this._parent.push(e),this._lookup.push(n?YT(this.proxy(n)):null),this._markpath.push(-1)},popState(){this._encode.pop(),this._parent.pop(),this._lookup.pop(),this._markpath.pop()},parent(){return M(this._parent)},encode(){return M(this._encode)},lookup(){return M(this._lookup)},markpath(){const t=this._markpath;return++t[t.length-1]},fieldRef(t,e){if(gt(t))return VT(t,e);t.signal||s("Unsupported field reference: "+kt(t));const n=t.signal;let r=this.field[n];if(!r){const t={name:this.signalRef(n)};e&&(t.as=e),this.field[n]=r=YT(this.add(wz(t)))}return r},compareRef(t){let e=!1;const n=t=>KT(t)?(e=!0,this.signalRef(t.signal)):function(t){return t&&t.expr}(t)?(e=!0,this.exprRef(t.expr)):t,r=W(t.field).map(n),i=W(t.order).map(n);return e?YT(this.add(yz({fields:r,orders:i}))):XT(r,i)},keyRef(t,e){let n=!1;const r=this.signals;return t=W(t).map((t=>KT(t)?(n=!0,YT(r[t.signal])):t)),n?YT(this.add(kz({fields:t,flat:e}))):function(t,e){const n={$key:t};return e&&(n.$flat=!0),n}(t,e)},sortRef(t){if(!t)return t;const e=JT(t.op,t.field),n=t.order||"ascending";return n.signal?YT(this.add(yz({fields:e,orders:this.signalRef(n.signal)}))):XT(e,n)},event(t,e){const n=t+":"+e;if(!this.events[n]){const r=this.id();this.streams.push({id:r,source:t,type:e}),this.events[n]=r}return this.events[n]},hasOwnSignal(t){return it(this.signals,t)},addSignal(t,e){this.hasOwnSignal(t)&&s("Duplicate signal name: "+kt(t));const n=e instanceof IT?e:this.add(HT(e));return this.signals[t]=n},getSignal(t){return this.signals[t]||s("Unrecognized signal name: "+kt(t)),this.signals[t]},signalRef(t){return this.signals[t]?YT(this.signals[t]):(it(this.lambdas,t)||(this.lambdas[t]=this.add(HT(null))),YT(this.lambdas[t]))},parseLambdas(){const t=Object.keys(this.lambdas);for(let e=0,n=t.length;e<n;++e){const n=t[e],r=eB(n,this),i=this.lambdas[n];i.params=r.$params,i.update=r.$expr}},property(t){return t&&t.signal?this.signalRef(t.signal):t},objectProperty(t){return t&&x(t)?this.signalRef(t.signal||eR(t)):t},exprRef(t,e){const n={expr:eB(t,this)};return e&&(n.expr.$name=e),YT(this.add(xz(n)))},addBinding(t,e){this.bindings||s("Nested signals do not support binding: "+kt(t)),this.bindings.push(tt({signal:t},e))},addScaleProj(t,e){it(this.scales,t)&&s("Duplicate scale or projection name: "+kt(t)),this.scales[t]=this.add(e)},addScale(t,e){this.addScaleProj(t,Rz(e))},addProjection(t,e){this.addScaleProj(t,Tz(e))},getScale(t){return this.scales[t]||s("Unrecognized scale name: "+kt(t)),this.scales[t]},scaleRef(t){return YT(this.getScale(t))},scaleType(t){return this.getScale(t).params.type},projectionRef(t){return this.scaleRef(t)},projectionType(t){return this.scaleType(t)},addData(t,e){return it(this.data,t)&&s("Duplicate data set name: "+kt(t)),this.data[t]=e},getData(t){return this.data[t]||s("Undefined data set name: "+kt(t)),this.data[t]},addDataPipeline(t,e){return it(this.data,t)&&s("Duplicate data set name: "+kt(t)),this.addData(t,fO.fromEntries(this,e))}},tt(ma,Os,P_,vx,oM,iE,LD,vD,WD,mC,SC,LC);const iR=e;t.Bounds=Zp,t.CanvasHandler=Ey,t.CanvasRenderer=By,t.DATE=hn,t.DAY=dn,t.DAYOFYEAR=pn,t.Dataflow=da,t.Debug=4,t.Error=1,t.EventStream=Qo,t.Gradient=ip,t.GroupItem=Kp,t.HOURS=gn,t.Handler=sy,t.Info=3,t.Item=Qp,t.MILLISECONDS=vn,t.MINUTES=mn,t.MONTH=cn,t.Marks=Ym,t.MultiPulse=sa,t.None=0,t.Operator=Xo,t.Parameters=Yo,t.Pulse=ia,t.QUARTER=ln,t.RenderType=xv,t.Renderer=cy,t.ResourceLoader=tg,t.SECONDS=yn,t.SVGHandler=zy,t.SVGRenderer=rv,t.SVGStringRenderer=yv,t.Scenegraph=ty,t.TIME_UNITS=_n,t.Transform=ga,t.View=eT,t.WEEK=fn,t.Warn=2,t.YEAR=sn,t.accessor=n,t.accessorFields=i,t.accessorName=r,t.array=W,t.ascending=G,t.bandwidthNRD=wa,t.bin=ka,t.bootstrapCI=Aa,t.boundClip=Cv,t.boundContext=bg,t.boundItem=Vm,t.boundMark=Xm,t.boundStroke=rg,t.changeset=Wo,t.clampRange=H,t.codegenExpression=uS,t.compare=V,t.constant=Q,t.cumulativeLogNormal=$a,t.cumulativeNormal=Ba,t.cumulativeUniform=Ia,t.dayofyear=En,t.debounce=K,t.defaultLocale=ro,t.definition=ya,t.densityLogNormal=Ra,t.densityNormal=Sa,t.densityUniform=ja,t.domChild=iy,t.domClear=oy,t.domCreate=ny,t.domFind=ry,t.dotbin=Ma,t.error=s,t.expressionFunction=tB,t.extend=tt,t.extent=et,t.extentIndex=nt,t.falsy=m,t.fastmap=at,t.field=c,t.flush=ut,t.font=Um,t.fontFamily=Lm,t.fontSize=Nm,t.format=Eo,t.formatLocale=Xi,t.formats=Do,t.hasOwnProperty=it,t.id=f,t.identity=h,t.inferType=_o,t.inferTypes=xo,t.ingest=qo,t.inherits=st,t.inrange=lt,t.interpolate=Cd,t.interpolateColors=Md,t.interpolateRange=Ad,t.intersect=kv,t.intersectBoxLine=Tg,t.intersectPath=Cg,t.intersectPoint=Fg,t.intersectRule=Bg,t.isArray=_,t.isBoolean=ct,t.isDate=ft,t.isFunction=Y,t.isIterable=ht,t.isNumber=dt,t.isObject=x,t.isRegExp=pt,t.isString=gt,t.isTuple=Oo,t.key=mt,t.lerp=yt,t.lineHeight=Om,t.loader=So,t.locale=no,t.logger=v,t.lruCache=vt,t.markup=Jy,t.merge=_t,t.mergeConfig=w,t.multiLineOffset=$m,t.one=p,t.pad=bt,t.panLinear=z,t.panLog=N,t.panPow=O,t.panSymlog=R,t.parse=function(t,e,n){return x(t)||s("Input Vega specification must be an object."),ZO(t,new KO(e=w(function(){const t="sans-serif",e="#4c78a8",n="#000",r="#888",i="#ddd";return{description:"Vega visualization",padding:0,autosize:"pad",background:null,events:{defaults:{allow:["wheel"]}},group:null,mark:null,arc:{fill:e},area:{fill:e},image:null,line:{stroke:e,strokeWidth:2},path:{stroke:e},rect:{fill:e},rule:{stroke:n},shape:{stroke:e},symbol:{fill:e,size:64},text:{fill:n,font:t,fontSize:11},trail:{fill:e,size:2},style:{"guide-label":{fill:n,font:t,fontSize:10},"guide-title":{fill:n,font:t,fontSize:11,fontWeight:"bold"},"group-title":{fill:n,font:t,fontSize:13,fontWeight:"bold"},"group-subtitle":{fill:n,font:t,fontSize:12},point:{size:30,strokeWidth:2,shape:"circle"},circle:{size:30,strokeWidth:2},square:{size:30,strokeWidth:2,shape:"square"},cell:{fill:"transparent",stroke:i}},title:{orient:"top",anchor:"middle",offset:4,subtitlePadding:3},axis:{minExtent:0,maxExtent:200,bandPosition:.5,domain:!0,domainWidth:1,domainColor:r,grid:!1,gridWidth:1,gridColor:i,labels:!0,labelAngle:0,labelLimit:180,labelOffset:0,labelPadding:2,ticks:!0,tickColor:r,tickOffset:0,tickRound:!0,tickSize:5,tickWidth:1,titlePadding:4},axisBand:{tickOffset:-.5},projection:{type:"mercator"},legend:{orient:"right",padding:0,gridAlign:"each",columnPadding:10,rowPadding:2,symbolDirection:"vertical",gradientDirection:"vertical",gradientLength:200,gradientThickness:16,gradientStrokeColor:i,gradientStrokeWidth:0,gradientLabelOffset:2,labelAlign:"left",labelBaseline:"middle",labelLimit:160,labelOffset:4,labelOverlap:!0,symbolLimit:30,symbolType:"circle",symbolSize:100,symbolOffset:0,symbolStrokeWidth:1.5,symbolBaseFillColor:"transparent",symbolBaseStrokeColor:r,titleLimit:180,titleOrient:"top",titlePadding:5,layout:{offset:18,direction:"horizontal",left:{direction:"vertical"},right:{direction:"vertical"}}},range:{category:{scheme:"tableau10"},ordinal:{scheme:"blues"},heatmap:{scheme:"yellowgreenblue"},ramp:{scheme:"blues"},diverging:{scheme:"blueorange",extent:[1,0]},symbol:["circle","square","triangle-up","cross","diamond","triangle-right","triangle-down","triangle-left"]}}}(),e,t.config),n)).toRuntime()},t.parseExpression=iS,t.parseSelector=hT,t.pathCurves=ap,t.pathEqual=Sv,t.pathParse=lp,t.pathRectangle=zp,t.pathRender=xp,t.pathSymbols=Ap,t.pathTrail=Np,t.peek=M,t.point=uy,t.projection=DA,t.quantileLogNormal=qa,t.quantileNormal=Ta,t.quantileUniform=Wa,t.quantiles=xa,t.quantizeInterpolator=Ed,t.quarter=j,t.quartiles=ba,t.randomInteger=function(e,n){let r,i,o;null==n&&(n=e,e=0);const a={min(t){return arguments.length?(r=t||0,o=i-r,a):r},max(t){return arguments.length?(i=t||0,o=i-r,a):i},sample:()=>r+Math.floor(o*t.random()),pdf:t=>t===Math.floor(t)&&t>=r&&t<i?1/o:0,cdf(t){const e=Math.floor(t);return e<r?0:e>=i?1:(e-r+1)/o},icdf:t=>t>=0&&t<=1?r-1+Math.floor(t*o):NaN};return a.min(e).max(n)},t.randomKDE=Na,t.randomLCG=function(t){return function(){return(t=(1103515245*t+12345)%2147483647)/2147483647}},t.randomLogNormal=La,t.randomMixture=Ua,t.randomNormal=za,t.randomUniform=Ha,t.read=Fo,t.regressionExp=Qa,t.regressionLinear=Ja,t.regressionLoess=ru,t.regressionLog=Za,t.regressionPoly=eu,t.regressionPow=Ka,t.regressionQuad=tu,t.renderModule=wv,t.repeat=xt,t.resetDefaultLocale=function(){return Vi(),Qi(),ro()},t.resetSVGClipId=Xp,t.resetSVGDefIds=function(){Xp(),Kd=0},t.responseType=Co,t.runtimeContext=cB,t.sampleCurve=uu,t.sampleLogNormal=Oa,t.sampleNormal=Fa,t.sampleUniform=Pa,t.scale=pd,t.sceneEqual=Fv,t.sceneFromJSON=Qm,t.scenePickVisit=Ig,t.sceneToJSON=Zm,t.sceneVisit=jg,t.sceneZOrder=Pg,t.scheme=Td,t.serializeXML=Zy,t.setRandom=function(e){t.random=e},t.span=wt,t.splitAccessPath=l,t.stringValue=kt,t.textMetrics=Cm,t.timeBin=mr,t.timeFloor=jn,t.timeFormatLocale=to,t.timeInterval=Gn,t.timeOffset=Zn,t.timeSequence=tr,t.timeUnitSpecifier=kn,t.timeUnits=bn,t.toBoolean=At,t.toDate=Et,t.toNumber=E,t.toSet=Ct,t.toString=Dt,t.transform=va,t.transforms=ma,t.truncate=Ft,t.truthy=g,t.tupleid=Ro,t.typeParsers=mo,t.utcFloor=Hn,t.utcInterval=Xn,t.utcOffset=Qn,t.utcSequence=er,t.utcdayofyear=Tn,t.utcquarter=I,t.utcweek=zn,t.version=iR,t.visitArray=St,t.week=Dn,t.writeConfig=k,t.zero=d,t.zoomLinear=q,t.zoomLog=L,t.zoomPow=U,t.zoomSymlog=P,Object.defineProperty(t,"__esModule",{value:!0})}));
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


    function compare$b(tree1, tree2, invertible) {
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
        compare: compare$b
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

    var re$5 = {exports: {}};

    // Not necessarily the package version of this code.

    const SEMVER_SPEC_VERSION = '2.0.0';
    const MAX_LENGTH$2 = 256;
    const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */
    9007199254740991; // Max safe segment length for coercion.

    const MAX_SAFE_COMPONENT_LENGTH = 16;
    var constants = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH: MAX_LENGTH$2,
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

      createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
      createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`); // ## Pre-release Version Identifier
      // A numeric identifier, or a non-numeric identifier.

      createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
      createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`); // ## Pre-release Version
      // Hyphen, followed by one or more dot-separated pre-release version
      // identifiers.

      createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
      createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`); // ## Build Metadata Identifier
      // Any combination of digits, letters, or hyphens.

      createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+'); // ## Build Metadata
      // Plus sign, followed by one or more period-separated build metadata
      // identifiers.

      createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`); // ## Full Version String
      // A main version, followed optionally by a pre-release version and
      // build metadata.
      // Note that the only major, minor, patch, and pre-release sections of
      // the version string are capturing groups.  The build metadata is not a
      // capturing group, because it should not ever be used in version
      // comparison.

      createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
      createToken('FULL', `^${src[t.FULLPLAIN]}$`); // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
      // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
      // common in the npm registry.

      createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
      createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
      createToken('GTLT', '((?:<|>)?=?)'); // Something like "2.*" or "1.2.x".
      // Note that "x.x" is a valid xRange identifer, meaning "any version"
      // Only the first item is strictly required.

      createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
      createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
      createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
      createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`); // Coercion.
      // Extract anything that could conceivably be a part of a valid semver

      createToken('COERCE', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
      createToken('COERCERTL', src[t.COERCE], true); // Tilde ranges.
      // Meaning is "reasonably at or greater than"

      createToken('LONETILDE', '(?:~>?)');
      createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = '$1~';
      createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
      createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`); // Caret ranges.
      // Meaning is "at least and backwards compatible with"

      createToken('LONECARET', '(?:\\^)');
      createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = '$1^';
      createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
      createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`); // A simple gt/lt/eq thing, or just "" to indicate "any version"

      createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
      createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`); // An expression to strip any whitespace between the gtlt and the thing
      // it modifies, so that `> 1.2.3` ==> `>1.2.3`

      createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
      // Note that these all use the loose form, because they'll be
      // checked against either the strict or loose comparator form
      // later.

      createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
      createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`); // Star ranges basically just allow anything at all.

      createToken('STAR', '(<|>)?=?\\s*\\*'); // >=0.0.0 is like a star

      createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
      createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
    })(re$5, re$5.exports);

    // obj with keys in a consistent order.

    const opts = ['includePrerelease', 'loose', 'rtl'];

    const parseOptions$4 = options => !options ? {} : typeof options !== 'object' ? {
      loose: true
    } : opts.filter(k => options[k]).reduce((options, k) => {
      options[k] = true;
      return options;
    }, {});

    var parseOptions_1 = parseOptions$4;

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
      MAX_LENGTH: MAX_LENGTH$1,
      MAX_SAFE_INTEGER
    } = constants;
    const {
      re: re$4,
      t: t$4
    } = re$5.exports;
    const parseOptions$3 = parseOptions_1;
    const {
      compareIdentifiers
    } = identifiers;

    class SemVer$e {
      constructor(version, options) {
        options = parseOptions$3(options);

        if (version instanceof SemVer$e) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== 'string') {
          throw new TypeError(`Invalid Version: ${version}`);
        }

        if (version.length > MAX_LENGTH$1) {
          throw new TypeError(`version is longer than ${MAX_LENGTH$1} characters`);
        }

        debug$2('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose; // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.

        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re$4[t$4.LOOSE] : re$4[t$4.FULL]);

        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
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
        this.version = `${this.major}.${this.minor}.${this.patch}`;

        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join('.')}`;
        }

        return this.version;
      }

      toString() {
        return this.version;
      }

      compare(other) {
        debug$2('SemVer.compare', this.version, this.options, other);

        if (!(other instanceof SemVer$e)) {
          if (typeof other === 'string' && other === this.version) {
            return 0;
          }

          other = new SemVer$e(other, this.options);
        }

        if (other.version === this.version) {
          return 0;
        }

        return this.compareMain(other) || this.comparePre(other);
      }

      compareMain(other) {
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
        }

        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }

      comparePre(other) {
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
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
        if (!(other instanceof SemVer$e)) {
          other = new SemVer$e(other, this.options);
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
            throw new Error(`invalid increment argument: ${release}`);
        }

        this.format();
        this.raw = this.version;
        return this;
      }

    }

    var semver$1 = SemVer$e;

    const {
      MAX_LENGTH
    } = constants;
    const {
      re: re$3,
      t: t$3
    } = re$5.exports;
    const SemVer$d = semver$1;
    const parseOptions$2 = parseOptions_1;

    const parse$5 = (version, options) => {
      options = parseOptions$2(options);

      if (version instanceof SemVer$d) {
        return version;
      }

      if (typeof version !== 'string') {
        return null;
      }

      if (version.length > MAX_LENGTH) {
        return null;
      }

      const r = options.loose ? re$3[t$3.LOOSE] : re$3[t$3.FULL];

      if (!r.test(version)) {
        return null;
      }

      try {
        return new SemVer$d(version, options);
      } catch (er) {
        return null;
      }
    };

    var parse_1 = parse$5;

    const parse$4 = parse_1;

    const valid$1 = (version, options) => {
      const v = parse$4(version, options);
      return v ? v.version : null;
    };

    var valid_1 = valid$1;

    const parse$3 = parse_1;

    const clean = (version, options) => {
      const s = parse$3(version.trim().replace(/^[=v]+/, ''), options);
      return s ? s.version : null;
    };

    var clean_1 = clean;

    const SemVer$c = semver$1;

    const inc = (version, release, options, identifier) => {
      if (typeof options === 'string') {
        identifier = options;
        options = undefined;
      }

      try {
        return new SemVer$c(version, options).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    };

    var inc_1 = inc;

    const SemVer$b = semver$1;

    const compare$a = (a, b, loose) => new SemVer$b(a, loose).compare(new SemVer$b(b, loose));

    var compare_1 = compare$a;

    const compare$9 = compare_1;

    const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;

    var eq_1 = eq$2;

    const parse$2 = parse_1;
    const eq$1 = eq_1;

    const diff = (version1, version2) => {
      if (eq$1(version1, version2)) {
        return null;
      } else {
        const v1 = parse$2(version1);
        const v2 = parse$2(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? 'pre' : '';
        const defaultResult = hasPre ? 'prerelease' : '';

        for (const key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }

        return defaultResult; // may be undefined
      }
    };

    var diff_1 = diff;

    const SemVer$a = semver$1;

    const major = (a, loose) => new SemVer$a(a, loose).major;

    var major_1 = major;

    const SemVer$9 = semver$1;

    const minor = (a, loose) => new SemVer$9(a, loose).minor;

    var minor_1 = minor;

    const SemVer$8 = semver$1;

    const patch = (a, loose) => new SemVer$8(a, loose).patch;

    var patch_1 = patch;

    const parse$1 = parse_1;

    const prerelease = (version, options) => {
      const parsed = parse$1(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };

    var prerelease_1 = prerelease;

    const compare$8 = compare_1;

    const rcompare = (a, b, loose) => compare$8(b, a, loose);

    var rcompare_1 = rcompare;

    const compare$7 = compare_1;

    const compareLoose = (a, b) => compare$7(a, b, true);

    var compareLoose_1 = compareLoose;

    const SemVer$7 = semver$1;

    const compareBuild$2 = (a, b, loose) => {
      const versionA = new SemVer$7(a, loose);
      const versionB = new SemVer$7(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };

    var compareBuild_1 = compareBuild$2;

    const compareBuild$1 = compareBuild_1;

    const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));

    var sort_1 = sort;

    const compareBuild = compareBuild_1;

    const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));

    var rsort_1 = rsort;

    const compare$6 = compare_1;

    const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;

    var gt_1 = gt$3;

    const compare$5 = compare_1;

    const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;

    var lt_1 = lt$2;

    const compare$4 = compare_1;

    const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;

    var neq_1 = neq$1;

    const compare$3 = compare_1;

    const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;

    var gte_1 = gte$2;

    const compare$2 = compare_1;

    const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;

    var lte_1 = lte$2;

    const eq = eq_1;
    const neq = neq_1;
    const gt$2 = gt_1;
    const gte$1 = gte_1;
    const lt$1 = lt_1;
    const lte$1 = lte_1;

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
          return gt$2(a, b, loose);

        case '>=':
          return gte$1(a, b, loose);

        case '<':
          return lt$1(a, b, loose);

        case '<=':
          return lte$1(a, b, loose);

        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };

    var cmp_1 = cmp$1;

    const SemVer$6 = semver$1;
    const parse = parse_1;
    const {
      re: re$2,
      t: t$2
    } = re$5.exports;

    const coerce = (version, options) => {
      if (version instanceof SemVer$6) {
        return version;
      }

      if (typeof version === 'number') {
        version = String(version);
      }

      if (typeof version !== 'string') {
        return null;
      }

      options = options || {};
      let match = null;

      if (!options.rtl) {
        match = version.match(re$2[t$2.COERCE]);
      } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        let next;

        while ((next = re$2[t$2.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }

          re$2[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        } // leave it in a clean state


        re$2[t$2.COERCERTL].lastIndex = -1;
      }

      if (match === null) return null;
      return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options);
    };

    var coerce_1 = coerce;

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

    class Range$a {
      constructor(range, options) {
        options = parseOptions$1(options);

        if (range instanceof Range$a) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range$a(range.raw, options);
          }
        }

        if (range instanceof Comparator$3) {
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
          throw new TypeError(`Invalid SemVer Range: ${range}`);
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
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose; // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

        const hr = loose ? re$1[t$1.HYPHENRANGELOOSE] : re$1[t$1.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug$1('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

        range = range.replace(re$1[t$1.COMPARATORTRIM], comparatorTrimReplace);
        debug$1('comparator trim', range, re$1[t$1.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

        range = range.replace(re$1[t$1.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

        range = range.replace(re$1[t$1.CARETTRIM], caretTrimReplace); // normalize spaces

        range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
        // ready to be split into comparators.

        const compRe = loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
        const rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/) // >=0.0.0 is equivalent to *
        .map(comp => replaceGTE0(comp, this.options)) // in loose mode, throw out any that are not valid comparators
        .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true).map(comp => new Comparator$3(comp, this.options)); // if any comparators are the null set, then replace with JUST null set
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
        if (!(range instanceof Range$a)) {
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
            version = new SemVer$5(version, this.options);
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

    var range = Range$a;
    const LRU = lruCache;
    const cache = new LRU({
      max: 1000
    });
    const parseOptions$1 = parseOptions_1;
    const Comparator$3 = comparator;
    const debug$1 = debug_1;
    const SemVer$5 = semver$1;
    const {
      re: re$1,
      t: t$1,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = re$5.exports;

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
      debug$1('comp', comp, options);
      comp = replaceCarets(comp, options);
      debug$1('caret', comp);
      comp = replaceTildes(comp, options);
      debug$1('tildes', comp);
      comp = replaceXRanges(comp, options);
      debug$1('xrange', comp);
      comp = replaceStars(comp, options);
      debug$1('stars', comp);
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
      const r = options.loose ? re$1[t$1.TILDELOOSE] : re$1[t$1.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug$1('tilde', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          // ~1.2 == >=1.2.0 <1.3.0-0
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug$1('replaceTilde pr', pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          // ~1.2.3 == >=1.2.3 <1.3.0-0
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }

        debug$1('tilde return', ret);
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
      debug$1('caret', comp, options);
      const r = options.loose ? re$1[t$1.CARETLOOSE] : re$1[t$1.CARET];
      const z = options.includePrerelease ? '-0' : '';
      return comp.replace(r, (_, M, m, p, pr) => {
        debug$1('caret', comp, _, M, m, p, pr);
        let ret;

        if (isX(M)) {
          ret = '';
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === '0') {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug$1('replaceCaret pr', pr);

          if (M === '0') {
            if (m === '0') {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug$1('no pr');

          if (M === '0') {
            if (m === '0') {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }

        debug$1('caret return', ret);
        return ret;
      });
    };

    const replaceXRanges = (comp, options) => {
      debug$1('replaceXRanges', comp, options);
      return comp.split(/\s+/).map(comp => {
        return replaceXRange(comp, options);
      }).join(' ');
    };

    const replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re$1[t$1.XRANGELOOSE] : re$1[t$1.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug$1('xRange', comp, ret, gtlt, M, m, p, pr);
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
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }

        debug$1('xRange return', ret);
        return ret;
      });
    }; // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.


    const replaceStars = (comp, options) => {
      debug$1('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

      return comp.trim().replace(re$1[t$1.STAR], '');
    };

    const replaceGTE0 = (comp, options) => {
      debug$1('replaceGTE0', comp, options);
      return comp.trim().replace(re$1[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], '');
    }; // This function is passed to string.replace(re[t.HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0-0


    const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = '';
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? '-0' : ''}`;
      }

      if (isX(tM)) {
        to = '';
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }

      return `${from} ${to}`.trim();
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
          debug$1(set[i].semver);

          if (set[i].semver === Comparator$3.ANY) {
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

    const ANY$2 = Symbol('SemVer ANY'); // hoisted class for cyclic dependency

    class Comparator$2 {
      static get ANY() {
        return ANY$2;
      }

      constructor(comp, options) {
        options = parseOptions(options);

        if (comp instanceof Comparator$2) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }

        debug('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);

        if (this.semver === ANY$2) {
          this.value = '';
        } else {
          this.value = this.operator + this.semver.version;
        }

        debug('comp', this);
      }

      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);

        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }

        this.operator = m[1] !== undefined ? m[1] : '';

        if (this.operator === '=') {
          this.operator = '';
        } // if it literally is just '>' or '' then allow anything.


        if (!m[2]) {
          this.semver = ANY$2;
        } else {
          this.semver = new SemVer$4(m[2], this.options.loose);
        }
      }

      toString() {
        return this.value;
      }

      test(version) {
        debug('Comparator.test', version, this.options.loose);

        if (this.semver === ANY$2 || version === ANY$2) {
          return true;
        }

        if (typeof version === 'string') {
          try {
            version = new SemVer$4(version, this.options);
          } catch (er) {
            return false;
          }
        }

        return cmp(version, this.operator, this.semver, this.options);
      }

      intersects(comp, options) {
        if (!(comp instanceof Comparator$2)) {
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

          return new Range$9(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
          if (comp.value === '') {
            return true;
          }

          return new Range$9(this.value, options).test(comp.semver);
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

    var comparator = Comparator$2;
    const parseOptions = parseOptions_1;
    const {
      re,
      t
    } = re$5.exports;
    const cmp = cmp_1;
    const debug = debug_1;
    const SemVer$4 = semver$1;
    const Range$9 = range;

    const Range$8 = range;

    const satisfies$3 = (version, range, options) => {
      try {
        range = new Range$8(range, options);
      } catch (er) {
        return false;
      }

      return range.test(version);
    };

    var satisfies_1 = satisfies$3;

    const Range$7 = range; // Mostly just for testing and legacy API reasons

    const toComparators = (range, options) => new Range$7(range, options).set.map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

    var toComparators_1 = toComparators;

    const SemVer$3 = semver$1;
    const Range$6 = range;

    const maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;

      try {
        rangeObj = new Range$6(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(v => {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!max || maxSV.compare(v) === -1) {
            // compare(max, v, true)
            max = v;
            maxSV = new SemVer$3(max, options);
          }
        }
      });
      return max;
    };

    var maxSatisfying_1 = maxSatisfying;

    const SemVer$2 = semver$1;
    const Range$5 = range;

    const minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;

      try {
        rangeObj = new Range$5(range, options);
      } catch (er) {
        return null;
      }

      versions.forEach(v => {
        if (rangeObj.test(v)) {
          // satisfies(v, range, options)
          if (!min || minSV.compare(v) === 1) {
            // compare(min, v, true)
            min = v;
            minSV = new SemVer$2(min, options);
          }
        }
      });
      return min;
    };

    var minSatisfying_1 = minSatisfying;

    const SemVer$1 = semver$1;
    const Range$4 = range;
    const gt$1 = gt_1;

    const minVersion = (range, loose) => {
      range = new Range$4(range, loose);
      let minver = new SemVer$1('0.0.0');

      if (range.test(minver)) {
        return minver;
      }

      minver = new SemVer$1('0.0.0-0');

      if (range.test(minver)) {
        return minver;
      }

      minver = null;

      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach(comparator => {
          // Clone to avoid manipulating the comparator's semver object.
          const compver = new SemVer$1(comparator.semver.version);

          switch (comparator.operator) {
            case '>':
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }

              compver.raw = compver.format();

            /* fallthrough */

            case '':
            case '>=':
              if (!setMin || gt$1(compver, setMin)) {
                setMin = compver;
              }

              break;

            case '<':
            case '<=':
              /* Ignore maximum versions */
              break;

            /* istanbul ignore next */

            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt$1(minver, setMin))) minver = setMin;
      }

      if (minver && range.test(minver)) {
        return minver;
      }

      return null;
    };

    var minVersion_1 = minVersion;

    const Range$3 = range;

    const validRange = (range, options) => {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range$3(range, options).range || '*';
      } catch (er) {
        return null;
      }
    };

    var valid = validRange;

    const SemVer = semver$1;
    const Comparator$1 = comparator;
    const {
      ANY: ANY$1
    } = Comparator$1;
    const Range$2 = range;
    const satisfies$2 = satisfies_1;
    const gt = gt_1;
    const lt = lt_1;
    const lte = lte_1;
    const gte = gte_1;

    const outside$2 = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range$2(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;

      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break;

        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break;

        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      } // If it satisfies the range it is not outside


      if (satisfies$2(version, range, options)) {
        return false;
      } // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.


      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach(comparator => {
          if (comparator.semver === ANY$1) {
            comparator = new Comparator$1('>=0.0.0');
          }

          high = high || comparator;
          low = low || comparator;

          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        }); // If the edge version comparator has a operator then our version
        // isn't outside it

        if (high.operator === comp || high.operator === ecomp) {
          return false;
        } // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range


        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }

      return true;
    };

    var outside_1 = outside$2;

    const outside$1 = outside_1;

    const gtr = (version, range, options) => outside$1(version, range, '>', options);

    var gtr_1 = gtr;

    const outside = outside_1; // Determine if version is less than all the versions possible in the range

    const ltr = (version, range, options) => outside(version, range, '<', options);

    var ltr_1 = ltr;

    const Range$1 = range;

    const intersects = (r1, r2, options) => {
      r1 = new Range$1(r1, options);
      r2 = new Range$1(r2, options);
      return r1.intersects(r2);
    };

    var intersects_1 = intersects;

    // that includes the same versions that the original range does
    // If the original range is shorter than the simplified one, return that.

    const satisfies$1 = satisfies_1;
    const compare$1 = compare_1;

    var simplify = (versions, range, options) => {
      const set = [];
      let min = null;
      let prev = null;
      const v = versions.sort((a, b) => compare$1(a, b, options));

      for (const version of v) {
        const included = satisfies$1(version, range, options);

        if (included) {
          prev = version;
          if (!min) min = version;
        } else {
          if (prev) {
            set.push([min, prev]);
          }

          prev = null;
          min = null;
        }
      }

      if (min) set.push([min, null]);
      const ranges = [];

      for (const [min, max] of set) {
        if (min === max) ranges.push(min);else if (!max && min === v[0]) ranges.push('*');else if (!max) ranges.push(`>=${min}`);else if (min === v[0]) ranges.push(`<=${max}`);else ranges.push(`${min} - ${max}`);
      }

      const simplified = ranges.join(' || ');
      const original = typeof range.raw === 'string' ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };

    const Range = range;
    const Comparator = comparator;
    const {
      ANY
    } = Comparator;
    const satisfies = satisfies_1;
    const compare = compare_1; // Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
    // - Every simple range `r1, r2, ...` is a null set, OR
    // - Every simple range `r1, r2, ...` which is not a null set is a subset of
    //   some `R1, R2, ...`
    //
    // Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
    // - If c is only the ANY comparator
    //   - If C is only the ANY comparator, return true
    //   - Else if in prerelease mode, return false
    //   - else replace c with `[>=0.0.0]`
    // - If C is only the ANY comparator
    //   - if in prerelease mode, return true
    //   - else replace C with `[>=0.0.0]`
    // - Let EQ be the set of = comparators in c
    // - If EQ is more than one, return true (null set)
    // - Let GT be the highest > or >= comparator in c
    // - Let LT be the lowest < or <= comparator in c
    // - If GT and LT, and GT.semver > LT.semver, return true (null set)
    // - If any C is a = range, and GT or LT are set, return false
    // - If EQ
    //   - If GT, and EQ does not satisfy GT, return true (null set)
    //   - If LT, and EQ does not satisfy LT, return true (null set)
    //   - If EQ satisfies every C, return true
    //   - Else return false
    // - If GT
    //   - If GT.semver is lower than any > or >= comp in C, return false
    //   - If GT is >=, and GT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the GT.semver tuple, return false
    // - If LT
    //   - If LT.semver is greater than any < or <= comp in C, return false
    //   - If LT is <=, and LT.semver does not satisfy every C, return false
    //   - If GT.semver has a prerelease, and not in prerelease mode
    //     - If no C has a prerelease and the LT.semver tuple, return false
    // - Else return true

    const subset = function (sub, dom) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (sub === dom) return true;
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;

      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) continue OUTER;
        } // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.


        if (sawNonNull) return false;
      }

      return true;
    };

    const simpleSubset = (sub, dom, options) => {
      if (sub === dom) return true;

      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) return true;else if (options.includePrerelease) sub = [new Comparator('>=0.0.0-0')];else sub = [new Comparator('>=0.0.0')];
      }

      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) return true;else dom = [new Comparator('>=0.0.0')];
      }

      const eqSet = new Set();
      let gt, lt;

      for (const c of sub) {
        if (c.operator === '>' || c.operator === '>=') gt = higherGT(gt, c, options);else if (c.operator === '<' || c.operator === '<=') lt = lowerLT(lt, c, options);else eqSet.add(c.semver);
      }

      if (eqSet.size > 1) return null;
      let gtltComp;

      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) return null;else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) return null;
      } // will iterate one or zero times


      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) return null;
        if (lt && !satisfies(eq, String(lt), options)) return null;

        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) return false;
        }

        return true;
      }

      let higher, lower;
      let hasDomLT, hasDomGT; // if the subset has a prerelease, we need a comparator in the superset
      // with the same tuple and a prerelease, or it's not a subset

      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false; // exception: <1.2.3-0 is the same as <1.2.3

      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }

      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
        hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';

        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }

          if (c.operator === '>' || c.operator === '>=') {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) return false;
          } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) return false;
        }

        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }

          if (c.operator === '<' || c.operator === '<=') {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) return false;
          } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) return false;
        }

        if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
      } // if there was a < or >, and nothing in the dom, then must be false
      // UNLESS it was limited by another range in the other direction.
      // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0


      if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
      if (lt && hasDomGT && !gt && gtltComp !== 0) return false; // we needed a prerelease range in a specific tuple, but didn't get one
      // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
      // because it includes prereleases in the 1.2.3 tuple

      if (needDomGTPre || needDomLTPre) return false;
      return true;
    }; // >=1.2.3 is lower than >1.2.3


    const higherGT = (a, b, options) => {
      if (!a) return b;
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
    }; // <=1.2.3 is higher than <1.2.3


    const lowerLT = (a, b, options) => {
      if (!a) return b;
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
    };

    var subset_1 = subset;

    const internalRe = re$5.exports;
    var semver = {
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      SemVer: semver$1,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers,
      parse: parse_1,
      valid: valid_1,
      clean: clean_1,
      inc: inc_1,
      diff: diff_1,
      major: major_1,
      minor: minor_1,
      patch: patch_1,
      prerelease: prerelease_1,
      compare: compare_1,
      rcompare: rcompare_1,
      compareLoose: compareLoose_1,
      compareBuild: compareBuild_1,
      sort: sort_1,
      rsort: rsort_1,
      gt: gt_1,
      lt: lt_1,
      eq: eq_1,
      neq: neq_1,
      gte: gte_1,
      lte: lte_1,
      cmp: cmp_1,
      coerce: coerce_1,
      Comparator: comparator,
      Range: range,
      satisfies: satisfies_1,
      toComparators: toComparators_1,
      maxSatisfying: maxSatisfying_1,
      minSatisfying: minSatisfying_1,
      minVersion: minVersion_1,
      validRange: valid,
      outside: outside_1,
      gtr: gtr_1,
      ltr: ltr_1,
      intersects: intersects_1,
      simplifyRange: simplify,
      subset: subset_1
    };

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
        return `[${value.map(v => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
      }
      const exclude_con = ["value","O_Value","Row_Value","None","Xstr","Count", "Ystr", "Cstr", "X_Value","Y_Value","Color_Value","Opacity_Value","Size_Value","Row_Valueu","Col_Value"];


      if (isObject(value)) {
        let content = '';

        const _a = value,
              {
          title,
          image
        } = _a,
              rest = __rest(_a, ["title", "image"]);

        if (title) {
          content += `<h2>${valueToHtml(title)}</h2>`;
        }

        if (image) {
          content += `<img src="${valueToHtml(image)}">`;
        }

        const keys = Object.keys(rest);

        if (keys.length > 0) {
          content += '<table>';

          for (const key of keys) {
            let val = rest[key]; // ignore undefined properties
            console.log('k',key,'v',val);
            if (exclude_con.includes(key)) {continue}

            if (val === undefined) {
              continue;
            }

            if (isObject(val)) {
              val = stringify(val, maxDepth);
            }

            content += `<tr><td class="key">${valueToHtml(key)}:</td><td class="value">${valueToHtml(val)}</td></tr>`;
          }

          content += `</table>`;
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


    var defaultStyle = `#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black; }
  #vg-tooltip-element.visible {
    visibility: visible; }
  #vg-tooltip-element h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 13px; }
  #vg-tooltip-element img {
    max-width: 200px;
    max-height: 200px; }
  #vg-tooltip-element table {
    border-spacing: 0; }
    #vg-tooltip-element table tr {
      border: none; }
      #vg-tooltip-element table tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 2px;
        padding-bottom: 2px; }
        #vg-tooltip-element table tr td.key {
          color: #808080;
          max-width: 150px;
          text-align: right;
          padding-right: 4px; }
        #vg-tooltip-element table tr td.value {
          display: block;
          max-width: 300px;
          max-height: 7em;
          text-align: left; }
  #vg-tooltip-element.dark-theme {
    background-color: rgba(32, 32, 32, 0.9);
    border: 1px solid #f5f5f5;
    color: white; }
    #vg-tooltip-element.dark-theme td.key {
      color: #bfbfbf; }
`;
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

        if (value == null || value === '' || value == 'Adelie' ) {
          this.el.classList.remove('visible', `${this.options.theme}-theme`);
          return;
        } // set the tooltip content


        this.el.innerHTML = this.options.formatTooltip(value, this.options.sanitize, this.options.maxDepth); // make the tooltip visible

        this.el.classList.add('visible', `${this.options.theme}-theme`);
        const {
          x,
          y
        } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
        this.el.setAttribute('style', `top: ${y}px; left: ${x}px`);
      }

    }

    /**
     * Open editor url in a new window, and pass a message.
     */
    function post (window, url, data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const editor = window.open(url);
      const wait = 10_000;
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
    var embedStyle = `$ /home/runner/work/vega-embed/vega-embed/node_modules/.bin/sass vega-embed.scss
.vega-embed {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  
}
.vega-embed.has-actions {
  padding: 0px;
}
.vega-embed details:not([open]) > :not(summary) {
  display: none !important;
}
.vega-embed summary {
  list-style: none;
  position: absolute !important;
  top: 16px;
  right: 24px;
  padding: 3px;
  z-index: 1000;
  background: white;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  color: #ddd;
  border: 0.2px solid #DDD;
  border-radius: 3px;
  opacity: 0.4;
  transition: opacity 0.4s ease-in;
  outline: none;
  cursor: pointer;
  line-height: 0px;
}
.vega-embed summary:hover {
  opacity:0.7;
}
.vega-embed summary::-webkit-details-marker {
  display: none;
}
.vega-embed summary:active {
  box-shadow: #aaa 0px 0px 0px 1px inset;
}
.vega-embed summary svg {
  width: 16px;
  height: 16px;
}
.vega-embed details[open] summary {
  opacity: 0.7;
}
.vega-embed:focus summary {
  opacity: 1 !important;
  transition: opacity 0.2s ease;
}

.vega-embed .vega-actions {
  position: absolute;
  z-index: 1001;
  top: 20px;
  right: 3px;
  display: flex;
  flex-direction: column;
  padding-bottom: 3px;
  padding-top: 3px;
  border-radius: 4px;
  box-shadow:box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  border: 1px solid #d9d9d9;
  background: white;
  animation-duration: 0.15s;
  animation-name: scale-in;
  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
  text-align: left;
}
.vega-embed .vega-actions a {
  padding: 2px 4px;
  font-family: sans-serif;
  font-size: 12px;
  line-height: 1;
  font-weight: 600;
  white-space: nowrap;
  color: #434a56;
  text-decoration: none;
}
.vega-embed .vega-actions a:hover {
  background-color: #f7f7f9;
  color: black;
}
.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
  content: "";
  display: inline-block;
  position: absolute;
}
.vega-embed .vega-actions::before {
  left: auto;
  right: 14px;
  top: -16px;
  border: 8px solid #0000;
  border-bottom-color: #d9d9d9;
}
.vega-embed .vega-actions::after {
  left: auto;
  right: 15px;
  top: -14px;
  border: 7px solid #0000;
  border-bottom-color: #fff;
}
.vega-embed .chart-wrapper.fit-x {
  width: 100%;
}
.vega-embed .chart-wrapper.fit-y {
  height: 100%;
}

.vega-embed-wrapper {
  max-width: 100%;
  overflow: auto;
  padding-right: 14px;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

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
    var version$1 = "6.20.1--canary.785.79639c9.0";
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
      "@wessberg/rollup-plugin-ts": "^1.3.14",
      auto: "^10.32.2",
      "browser-sync": "^2.27.7",
      concurrently: "^6.3.0",
      "del-cli": "^4.0.1",
      "jest-canvas-mock": "^2.3.1",
      sass: "^1.43.4",
      "rollup-plugin-bundle-size": "^1.0.3",
      "rollup-plugin-terser": "^7.0.2",
      rollup: "2.59.0",
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
      CLICK_TO_VIEW_ACTIONS: 'Click To Export Pics/Data',
      COMPILED_ACTION: 'View Compiled Vega',
      EDITOR_ACTION: 'Open in Vega Editor',
      PNG_ACTION: 'Save as PNG',
      CSV_ACTION: 'Export as CSV',
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
    const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
    const CHART_WRAPPER_CLASS = 'chart-wrapper';

    function isTooltipHandler(h) {
      return typeof h === 'function';
    }

    function viewSource(source, sourceHeader, sourceFooter, mode) {
      const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
      const footer = `</code></pre>${sourceFooter}</body></html>`; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      const win = window.open('');
      win.document.write(header + source + footer);
      win.document.title = `${NAMES[mode]} JSON Source`;
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

          console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${(_NAMES$providedMode = NAMES[providedMode]) !== null && _NAMES$providedMode !== void 0 ? _NAMES$providedMode : providedMode}.`);
        }

        const mode = parsed.library;

        if (!semver.satisfies(VERSION[mode], `^${parsed.version.slice(1)}`)) {
          console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
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
        throw new Error(`${el} does not exist`);
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

          if (!semver.satisfies(VERSION.vega, `^${parsed.version.slice(1)}`)) {
            console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
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
          summary.setAttribute("role", "tooltip");    
          //summary.innerHTML = SVG_CIRCLES;

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
              const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
              const exportLink = document.createElement('a');
              exportLink.text = i18nExportAction;
              exportLink.href = '#';
              exportLink.target = '_blank';
              exportLink.download = `${downloadFileName}.${ext}`; // add link on mousedown so that it's correct when the click happens

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
/*! itgz compression */
var itgz=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return itgz}):"undefined"!=typeof module&&null!=module&&(module.exports=itgz);
var itg_decomp=function(text){return itgz.decompressFromEncodedURIComponent(text)}  


var add_css=true;
var crossex_spec = JSON.parse(itg_decomp("N4KABGBECGCuAuB7AzgSwF4FNIC4oDtF9sAacKAB2gBNrV8BzXMAFjIkgCdM0tn5OsTOygB3VNXgALZgDYADPJGQpmVAynw5i5QGMiAM3XNQEDtE66TkIwBtbzSAGJF8yAF8R57tGt2HeM4AzCGhAEYArB5eULb02HjAkMgCiADWCVBOoeFRnuQcVNLWKZzpmcE5QZHRBVDIUtAUmUml5Y7ZVTX5ZvUAngC2YYgBYEn+HVXVUST1GJks8j1mMAAeqMgmdRzUiAPQ9MwG0LbIwttQDJwSAMIjiJwd1BHPz5AxHPCo8LaYd7YPSYhd4XSC2aBhTC2ADyADdMJxwRRHFRrvA+iDehxwZDbP9AYFOkFMVjIFcJAB1CTFPAARg+YFBOKhADEiPAAMrzErqfAnRwAQXWyDZ+E53OWvTBEKhAAUaHRGMw2KCvro0vjHoSpjUGZA1WkuXw8BEAHSyADseq+P0wovFxrGyV5-MCQo2ABVvr8APr22pYqA2372ilqDRaQLDWzUBGQOqSoPelqggzso0tZ0MPmjSBe21+9kB0n6AFarKhElStNisPqTSOaOxx565CwMLBv73cvOC19+O9RNgzAMTD4ahbQPS3EAIWgZzixEcAwk1F+VZWzNs9ozPOzrqgABkR2PqIWxcWpaXYAN8JtElmc45j6Pxz7-ptExx9JxiJwAEo0KgsD3mAER6lQtD0EwJp6ogBgGGckZOmg+65gAtC+p4+gAEuGDZfv0QwjLudKKAm5DLI+JygQA2nUpiknyAwVAAGj67qbHqsInEIjgbOC44bhwYT0BOiQXBw9AUAgjgLpguhaAyHBQpgLEXoS7Gcehui6PgAzCSsiAUF8RB0ZAAByRDYAAuhc7gJjEjFSsxFQAJoccKhmQDxth8YEyDNLoqA8N5olCRJgZSfgMnIckqmKYZKm-OpcVOB52m6fpSVQMZpl3swtGWdZkB2YGDmDk5oKuY4GY+jOGLcbxFRWUuerheJYySVA0myQFCVKd1kCqalHR1Q1Ol6QZym5SZqBmYVxVLmVWIVWYibOSsNWBCy0C6Jg8DviMyD1Y1oK+f5UCtaQoIdZOUWQL1cXyYlM3DSlY5pbt+2HR+p2Tdlb15fNBV4EV12lfZjkMdV0AsY430HT6-6IKIJ0Nd5F0tSV7VifdU5PXJA05e9amfR0iOHSjaP-Vl01DcDC1g0ttlQ5VMNTttUCaqdmPNY4EO4xFXVRT1MV9fUxNvSN5OEjzE10yTjOg2A4MlStg7Q70m0cFzkDQlQwXorzTV+djbW3XjkUPYT-W-K9Q0yxpWQG3t3x9LTU1K3NTOqyzkPlVrZg6wQcMVByjTNHzZuOMFljrkLnUh9FsVE-bg2i6To2EhHTSYAD9OZ8rdHdd+qDxzdoscMgACOsAWJXVeQLoZTIFxpdQHQcNEBOM2fNc0CML86GwMifdBgPQ-57soj4Dl-eoIPDDD9cEbzxPi9T+hvwGBnTdtBk68wJwZSiEfoiYNQo5HwIm-L9g3Ua+tQcQCHkB6yyqC2PACI+tCCB+jKIXUkWMBY40tsLZOYtU52wUnvKcTsvpfx-pwP+ACWRAILt7fK5kIZPwgGtAhVVOZh1qjeE251+aBEFhApOQ1baS3TiTRBY1yEKy9kDH2Ks1bLTZutYhTFSGBAAKKrAoA8X6HIABq0dLoCCEI5QMDF35CMuJwJoUgfSdneFAUBgRLwi0EfDN0wp8y+n9KbS6tIABMid8akhYYSTiZjMDnngFgt6DCuBL0blOFcc88BKCGvsVYzBrEqkzikTAyI6R8KIRzIxFQADi1wzyAToCBWRmR6S0PsVKRxWQUkSGRkBECHj6HiziuoxgvjST+OYEEzOITmC0h0ENKJMSwC0jiWADasNjFQAACLQHgCMvozQfSsSyY4AAqvgNIhBZ5hStoYgmlS05wOYR9Z2zhhmjPRBM1i5Si5cPMnMhZqM56zEsjeBEqBdD8muTcEZI4Hj3MeUMl5AdVov1WVtVRkA9ljImW5aZgRzmLKubk62ayYGMM2dLbZaUgUHNcW5Y5D1i6LQhZcnRNyWLXAeQ4J5LyGBvKJXivZrNA7s21v0ioKLxmuM1GCqAOKll2JhaSLxL14EOKRR0RlEzNQYqnFi5m7KrlXVuYSj5kBnk-zJbK4lnyf7fM1rS4O9LHBzk4BQAEh1WXHFOOcKcd0HxeN0KodUwxQnXIKc4XV+rEDuMVoQ3pAiXIArmagNMnABg+jcoeVAwCpR6LAMas4nKnSWutWkW1eKHVOB9X6gNQaQ1YPdZ4XoCSvUDMgEUs8HJDbQVZfI01pJzUxvWYEK1Cl42IDtVAJNhafTFrdowTNiilF0pIfmrSwoOJT1ZehAAnI0ytKyoFZ1llkAdGwh331FdymtUBqnXzevUvA6FaQAA4J1+OgKEuk+63odOVBEHpfS+3uU8gugUw7LGZAPSsKt06k0ZUHQ+pditPGru8TUkmW6wA7tPcEo9LSwORJ-p0lgl6aX8Nzf8-NABZQe9dbBHTLEamiFapRvsev+utNrG2JoFYSND+AMNYYeF2zVr9tWBBQ-QGjLZKEx30dGpISbmP4FYx46BEt9SYFWFoLNswsRId1gCtDqxWOssgMsyBM6dlOFk-x39gm4o-1Ex4X5b89YeRmRQZoqDg2hpWOGxTXGVNpSMyZ3+5mBOEbhcJ3T4mpOh3zR5Q8qNHMhoU0ppOtmOg+b82ZjNmmXNCZ02J-TjGoDsWM6Zn05nAs2aTUlhzEWBjOa8bFvT9G-nSf7al8LqWAtPscEF6wmWysXxy3l-9BXxM9q1TexwAApb4KCSkZPblOcN4FoXFZWEm7r8BevpOAsgZdUovHrtqVKYDL7lsQbwNY1bKxz2BNNNYq9nrkMVCkfNRcf8S3olZfIU0QQuOO3I1kE7IwWOuyNn0ObKwFs+KA4cQJm71tdLPTBhpppukIaIW1hjHXAitte+7K7ppd13czi21J523bog+ynITi2fsBLAFtjgzS6RA+iSDsHPyisGYBTcMUbbDpw8u1V3bETJ2QPu2TVTtPDocgZxd97v6Kmudx5u37BP-vHsB+04Hu35Dwcp4h3tiTHB3DFIgWAqDGdnUG1QgnppWf4anRz7OWRVdIA1+jt7WOtOOBF8EsXhOoDE6l9Bsnsv5casV+15XgRhkNEt-D5nevhtmqNyjh7uz5yaK19b6LVTvui-x47yAzucmu86dduXB3PMqPzTORtzq+cY+1yA3X13ZDI4ekm-PYiDUB8x4LzOX3AOJ4aRLlppOM+miz+Dj1Oe9ZenVHcWAF4g8h7Z3Q8PnO0qD41OrsUsfm8bvt0n9vJpk87a6dnpXeaKguLcay2kBvX1h6rxHpw+-7SL--XbppDu19gHCZ3lp2-ve7+fCeN8Fj2NWK25AN9xus6zgWEX+7I1+wuCeK+be4GkuT+0ubuW+ve16PuR4n+Z4H4rKFeI2765+IB6Bx04BOOkBd++OaeD0zum2z+sSSBh2JWFQnEO43IQerSleCC5+DB6Y8whB8eLeUBf2MBYSx+Uom+FOnu8SO+R2jgfumieE9YfKHA4aZBhu7OU+Juke-ushEY3BtuxB5B9+AhZEVBeuohz8VOCWkAAAkmKAiHtF8PCD6DhiajZrGvWgmvauflYSgrYagPYXRl7lDigYClHn1jNldqwfytPoKsEdNmUo3jbDfroX4voU0gDiwfAZ0iYQQvFtDp8v7lSJIDIEHtdtYuPsoZPmfpEYSNIT6PkdINoYELfnoavgYWBEYZnpkb0tkYERNr1o4VGtgXHrHHGm4c2ufj0b-H4eIW-pIYEP+CONwG3CDA4UHpGnhifspi4SRk2iFoSHMVcDwGgEQD6JMX3hIXQY4P-D8CFJwCdGWoIGsSJFOoMbWsMaRu4ZUS7AgHEAiCdCccge-jDqkrcUHuWs4URq8dsajhILNm6l0QCbkaoMCT-pkKsWCa5sRg2pCeftITwMcbCVTrnhUGhhQJMh5AqssborruWv8TMVALKIgPQPAEiTrhxmAKCQMZsZiWRh8c4PSYyb8fif4aNoSTqgXnXncUIGiUJhiSMTsVkDXoXniV7B5mcV5uHPssyaXqyaiRyeCa4W8aMTyU4LziMgKcqXCbSfKuyOrjccsciUcLhlKXFDKQaXKc4GbjaWadlCqcHCKbWiMD6KoDQL-DWEyUwZSayUfjSecUxkej6HyXTruEHpQdgYAapupgmTzlwXEbCkQbwSQdASkbAW0uni-jQf3jJixpmW2kwfaYYamaoUAWplWQyYmdmRwkLnmcvgWfwUWWEiWQ9CIa-gEfCZYfgLoH5LGH-PgLYCXmGrrpAFABlh4eOZOa4tCDOQLhwjboEC1haTGVAJ-N-L-BYQYApuhDVg+Emkeb1qeU1q5nuWYTkTYMgr-PUkHpADuq4K4JeU6EmnYL1v4veTFiJnFk+YEQBW+RBh+a0t+W4MuUaZBagiEsBdpqBYVkKdTvmjeb-A1D6FIvzB+TQqHiofEa5rylskaThagnhQRWbLHuKn7HgsOcKR-K+aggKFBPlI8nWVdOAiReUbmc9FLGmUgseRxVxSDCcAxacoVB3MkEFCFANk3AJIPL3PJaJPYD6LGCZJogMBZlOAYHENlj6L8IwNID6PpUfMMNQB7PsG3D6EwOPPFHavJX0JgBYEfBDI-CxVhcdqdixhKQ8VAARpybKUmk9mdn8bQWqc+IgAwOxH0cFf-k8WFa6Umr5glUqd6fubFYEJlR5ElU6UMfqViUaZlexNFRWfmvKL8JNkthGZdPKj4RIBsL+dOjyiJY2aprVQdD-DJTgnJVXFAOhKNRyJgHXJ9IvLYKNRec5R6BrsMEfDcC1XQMpZnCdqkm1c5WhgwPsEfLKOCMgPtc5VYQYAiIQEfIBPQMMGfM5YdfOCdfJTOGbOtQ9OojdajEfFyMQLdVdZfG9VONCItoDaSC9UIMDYkQ9DOKfPgODZgCkpgGOAdRrvqgjdwMjfdfQGkG5FCACKIIjZjfJbKKjb8JDfmU3HMdQPDf9dQIjXOQ9FTbjfYKjDTc5UzXjajITVCsNZ+aNQqq8sqrNUfA8oqg8H0JtiLaSuLa0jfBCL8HALLc5aMmEArbAJLc5XtPtKPvJVQFErYLSEfHrT-LYNYkbQcNwOpbzdQBYGkGbT5eWaqX6VAHMfCDccyt2EFcVS8aVdyWoU4K7T8R7WWFVU7XrIHe7ZMkVbqeiRCX7U2RHWcJMqHdMQeZAInWitHQJdYGlWVf7RnYGina-M7ZAOIvyXiuGtSU5CXRHKjD6C4lxI1ZkFXdVRUAXUmbxTqdnRanqVsfHapu3e2TleBaOVrnaSyZdNdqUesYJREf7WPfUWulDctskeQakW0d3h7qYZheYdTLhB5c2DUdSIUbxbBeEfkufnvXhMGagrUVIIvQBt2U0YWWvcWRvjLmBL5eYfvpoQ2EHosOfWNufj-fhK6h2U3gkRTUkc0X2RtgOVOJvlvVkSPZaXgfvXIaylBhPnkkA+VWgeg1oTmSuhAVA3UqvYem-UYUg50Sg2nRmXXr-fIU3cqPAzPTg8lEafQy6gQ5oA-Y0dA-2Q-nuqw8IR-SUb5SXYdS6iAxg9cuGksDFSXfOidIw6yhaNPY8aRWwUacozw2A4DJ2TwU-QI72a-f2e-QgdQz6SOZaVI4dPKFBEqEHkjg2RUf7XY-GQqNBHw8vSsCtg-gA+kWWQrlMTY3Q3GR43fZgyIyFafto-7Vw4dHfT46QyvfjhEMnqnvuhY50uI47anXlS7XXao8wTEylVo3PQncU6Ayk8Y2Q6QZk6kZtjky0vIF-c+bJiGuQpTKDT5Lrs04Axwwk0el0wGj07Uw1UTmLkoXUgDhk1Q+04EThBsEgFcHDOPVqXIvcd7VAC6XnU2csykPFeogGkXaxQCoc6syc-VPQCdB3RPZkCmd3aNkMwcys8c+szOLczWVgBM3ji-RQ+Y0YR0dY+c-mpFSxlE0UYjoM4af7RC3xsk0Q-NpA3U2kwC7M5LjM6IwgddiC7lSXZcx8wGoBKZAjiUbC26U4ES2sySyMvNH863qY4CyTkE7tvi7Q4U5AJc22qLVNvS4gN5KPDbWqoEL6gABQ0vXMkBSvrOkvzQkDyAACUA4O9z5-wN4iLx9QrFAIrFQEr4r4gBR6EV9B9v8d9SrAA9KWCdPoCPvAAAHyJNH0FEkDOt30kCGvH0mvVM30uvSBWs2s+h2tigqv6aSN15QtQDCtfKBAau3j+v30eMOOKgMAABUZt0ZXL+wnADALGUg6AOrery4R64rSgXrxr8bWrBRabQbIb7iprfrFrlr1iYbnLEb3DJToIMborPUBg4rp8tr8+jr9Iprch6EybXjjAJAIS4rzrjDE7deKb0EJAm2SrbbmFJdp8gZSk0bursbdJDDoDAA1JO440wFmyXb8K+GeDxAPKra4qoLI92-u7249P2wAIQNB10pB7QZBnhrMUBSDIAABkIHX7Ugddtqjl6iQHoH4H37oggZ6A0HgHwHYHEHdd5IAHsH6HCHkHSHUgKzMHGiGHiHPoyAfLv8aHJAIr0A4rAA5NeLeMgAx0q6aGZQwNIGm2fcq6q6E2CxUE+2vHqD2-q-2+RyJs6twJwCQEa9x7SKDiQBK4O8G8Ow6-SKp-W2m2OxGMezI3p2g4w6ewagZ5oMe7o4w26xE0e3Ifp8mHo8e0Zye3Y2Z-ABZ3eioye9e9hHe4vA+4GaA+u-x6cb6XrLzmUBkFG306ydYhtEow8L3Hu8W2K-22JCMvRwxwMH0HRwx7MAx6xKUHl2yfcUqyQKCasSq5e4Zol0Wwe+++K5+hsAALzNcMfXR5egkSvpejKMfZe5f5duRFezDlplcVe4bBcEt6x3CcBW2khif8T9vyx9CtftfWSdfbPdfjgZd9c5cZfFcMc3DDcldCBjfbOVcbsCdJB6zHBfx4oLeBCcfSDit0eMdBu7D7D0BsdKtOsjMDDdN7QHSfjV16ylgPBDv2v3evsVBPdSAvc7dMfdgnQfcHD4DfcGLXcAp1vDtQ8pexBjhcdw+veI+nDaV7Co-o-xd6xac4-XIPf4-mVE8I+qco9ffBfVdY9xDqiXzUWspUb2BwT470SixQIqTwhiigSQAAACSFeBOIOAE59yaQswMv7FcvEI1iCvXPaQR89PkAwAWMeAIrN4poWM7gR8fq+0-A9x3U7qEAT8HP+aknteDwcYon0PjgmHSHv73POHGi8HXvPoqHuHAf5HBbwf-vZHBHMHxSaHof0fRHKQJHQHUfP7VHqCaHIXjvFQ5HEfcHdXb7rEiXYAYHYAH7bkxfpfTXyAZfzXYAa3xADHJfIHZft3DgU3AKYfKHjayfwHBf7klfLfyjtf9fHXzfZfRfs34-H7bf4-1fI-DfmADHWfijes5HPv-7vfvTevk-1Ac-nnYArXo-630-s-pfw-H7dfi-y-4ba-MGjdMXl0QQCjrdjgsIp2Po8nJ9U4evCLibabkTY+mAEtZgBYe8PXrgx1WCi0yen3NHpN3bZ6x3+AZP+i+zx6QA-+d9AAbZwjDADQBBPZ7sTz6DQDWecAy7qFzCZcseWHIdPiUlMhm13eaAiVvP0v7H9G+MrYjtQJGT8tTIJAWkGQOz5yQE+xHTPgwPq7ity+iXDDrv3H5UCaB8rRANYkv7yB9+nES-tfyVZgAAAPpoLACNdPOq3MfqXw-a79+Bq-TvtH0o5cDqOuHfvp72kGl9ZBVg1BPIMUHNdaQ0-CvlPyr4H8WB1-Ffq-wCjR9sOW-WwYEHsEt9PBe-bwZxAX6GCW+M-A4LYHH7ElSS74EZA4Vv4AowgalL-hXV1w7oqeAKBYiMHhB5DWShGHSqeHJiFD80LiD0OhTkYLkMeJdNDhR3IR3sH+8jAQYEET6HRWhwnFAT-w96BAPGjDNNpKw4FyCBWrbfwdrBLqWD6qGfXDoF1kbJd6uowmpr0N74rC14NQioFAI1xlDLo-PWwHsMcBEDDhjQ1kicLOGBBYw38XwFcMui0QlABOGyLcKgCDwrUgIJ4ZkBeGzB5A7wkHgCnQCIA9gRw7JB8MgBrV4AhtX4Q0ihEwj6BzDQJN0KgCrAPuoQvtuKyywpZzMaghjiB3Yi+YGsFWAYASJIC0QkAFkG8JCE4A4j6s-mAYGN0QA0ihgCIBkcliZFKsbIlI9iCEn8Q+gqMAwF4byP5FHpBRwo2iLSBsjHtM8EQcYeKNWCSibw0omyOhCVEqiRRgInkaYICFQAcu4I0QW+yYE+guROWAkSBzCykj8RbXPLlSNZG0iOR1o7keV0dHsj6R9mPESGh5GUiPIAoljFKMBEkB-REowMaqJlFyjN64w0McqPDEiiZR6EWMVqNFG6jZhYXAFDPClSP9MgNw8gLyPIDQiMuQ1ApiXX67FjrQ1SZAKmhLGBgkgqKRwKmlgDgg8U84MBG1GbRiIewfgwiBQKlANjAgTYlsZrUl7D4davNKTj2A5BsIVubXDrgAH5aQOAY3gMFNDTiA0DUVrvIG0Eri1xM41bvIAY7zj5AOAakU6PpErjaI6406DZB+7yB5xZ4j0eANVHXiGot4nAIbVt4zRReQYJlI2IeD-dhx8lNsWEPwqEV5Kk4qQhl1RSTJVukqI8ZeOUY2QcAQqVxKxAMEyp3ktgI8Y+LpHPiRRSEpVihOglMpYJbXAWkqiwk4TEAEXaCPhNoiETiJ+yUiehLa5UpqJVKeiYxMQmecbIIXIrKqX7F-jBxAE5sY8OAmS8PIdFPiM5Ugm+4SJIKOCfMkhQISRkqo6vshNQmBoMJBKKiQ+PdF4TLxGkoiVpLcircKJ5KE4NRNomMB6JxkpicCjRSrd2J+kziUZN4lET3JnEPiV+LMAdxJMIvfUMJKgBIVE0XYxwMowMHrdtBugi-lfziFl9xBGwOihIC4keStBOgnid5Na7UUfQp5DKWACynCgbIh-OcQKCb4xSipGwEqatxOEVTMpakgibxNKntdoAFkeqYVMakMTmpBgy1uVPZ7figpUcQcexTCkUAew8-I-tfwKl6CYhvghKR+ySnIAUp1AOyelMqldSNJOU9inlIMAFSvJxUlqRZHKn7TNpPUtrnVNOnwB1J501qe1Kuk3TvJR0vqZT0GkDiQpo0+1OFJ2iA8qYqMdGH0FKmsCl+M0ymMjH+mnRYhJ-IwUtJWn0SwZ1MAGbeIekiiEZEMt8dtPEq7SUZtENGTTDfFHSTpG066ajN+ngz8ZfQGqRdObHYScZeMpGUdLakdTLx9Mm8c9P6lVc3pwUl8uJTGk9gwZf0BqEDOmkxTxWAs46JDPmnQz4hsMk4KlJZlkzBZlMjQcTNVHizSeGM5rrlPymqzSZP0LDAzIMFEyGpJM3GYrIlkEzapNM5mV1PVmGy5xTMumebI1mUz2Zr07qPWO5mhSvp40lXN2EhlTSx+os5blDMb7T9ZZcQVaZeOW7IzdZtEGOZjNvJ7S45McwmTbNNmpyrZ9gdOaqMzkOz7pKc-2ZbLnEvSBpHsoaRUG9mdjfZgQcaIDMDkn9RZdc0OSDJhkftkpcsqOV1LrmxyTZL4+YDeMTknlk5fckUT3LTk4zx5Wc2mXHKnn5yc5Y8gecXPa6lzOZ5c96TYFEnDjPho4gMtJNIDVyewCs-WUrL4m9inQG8ocY8J3l+yywYEmOD7KPldSY5BiOYZfK3nXyYAkvaEPfJkmHzHAl4sem+Nfm+l35-qMSa2Ml57195fMgBbbLJmIybxICvsSsDAWATxJvNECVADqgwLZJ307ERsE-j4BvgmAcVrhI5GXie567N0WyMMndyl5ys6znJmrIZgyBAkgpkJOGkhSP5R8LBZACG4CAj4ck1VI5O0nkTpayqBjtoPbkih6AJCshQZIoVdSGOUk5qAx1vFsKhSgk1BV7J4UjiIppQIRfgqCLMTDk5kiRVROkWEK5FP8BRbQqUWmyCuv8pfhov4laKOFOirhZvPAVATMFo4wxXgprkiKYJmocxWLUkVWLZFxC2xeQovHKKeY+89RfAKih28wABYh5iXGGo-jq4ilUKG6HuEhR14UkZAIJE6h5gHgo4d2jzWGqxMtKsPSygZDwBBBR0SnfybUsww6ULKVlE9KaCtBtKbAxlFLPUu6VdJd02LB6DZTsrzgToMEMAEEHUaO5hCImEtgnH6XuVPKcDeQBaA7jnyUFwhXJZL04pQhCl48YpaUscAegKlQdapbzU0qYZhljSuZS0o0YTKv4HS6JF0seW0gLQ+uU5SFMGW-wHlkGLAjUpCqIBbKllaZY5WYBBBsmfylyo2LUgnBJmpIdZeWGabbLhquyl5qSECgKQlKgoApSivmwlK1KFyq5VUqKXtLTK+AvSo8sWA3Z4Vdy7Sh8rpWQZ4VRlVACZSBV0hR0Lys1OCqmUOVZlQQEoosu2zLLBxSK1ZaCsgBorzGmKquNiuyX1ADlhK45cSs+ykrhY5S3NtcqpUpU6ltKhpQLAFAGrmVnStldQjNUcqAVqCHlVdBtX9LJlkK4VaaoNVnBJclkJ1bKvlWbLFVosZVf0rxXBQ8lUAI5d8QNWqUdVlyvVZSqZVvKaVjPE1U0tkC9KE1WlS1Smq6QtLbs-SzldyuNUjLaQo6PNbKpdX2UZlMKuDOKuriSqQp0qzVRwD9WP5FAAalJePBVUKV8VYayABGpOX9Lo1ZS2NZUrOA3Km4zKh1c0sZXOrE1WakZZtnNC2quVQyotV8vHRMrBVrqqtamvmbBr61KeZFQapbUYqdlna4NWqvyUaqo12q4dRSrHXmrE1U63dKaFHQZr3lulbNd8phb5q7VSawnl+rGWbqIVla6Famopb7qvV51fYDKpqVyqPK6KttWeo7hdqQ1BKq9ZGvhVDryVcah9e+v-WfKYVLS2xLOszWsqv1LSkFXBoLWrrk1xavlcBqFU7rWAloflbioPUwam1BohDQquQ1ZKL1Paw5USpvXnLAgI6-VfhqnUsBWl5audeRuLUvrxlhlP9Q6pLVlq4NFaqFSKpYDqN4Vnq91fCpPVIasV562VWht7X9quNj0W9ThtHVE1ZNRqujfSpI0OaP1hGuBntmXWFqnNLSDdc6q3WgbZlLAMVXpoPXHTj1PG-1XxqriobL14a4TVhps1ib719mjTU+rXUwqflLjVzSys-XFqflSm0kDRsBUZaT0VG25QFq00wrn+tayWF6vC2GbItrarZdFpF4CbQ1Qm69YltE1QBxN8a0jfctK1zKst+G+dV8p+XqbeaxW+1UNuEaMbt1YG4bTEwQZhafVcGozS1pM0ob2t6G+LV1sHVJbetKW8dZnEnVDaWAinQrYbjI15bxtS639SupK0+aT0LmjTZVrdVNKBmkGxFZxoi0bLmt7a8qKZrg3mbOtmGg7T1t1V2aTtryxzQBpGWwr7tOWsbWEkU6vaptKm2baOiu2vp3tzG2FctvY1erftjW-7aeq238azNcWvtQloh1krktuG1LbcvS3Pa5l0m8rROrk23bUdMm6jZjtZ0lrstb2kDVVrwAsBFgtWhFYEBJ1rKmt5OpVcDt5qg71V4O2VdhoZ3Q7H1cO9zXMrTUc7TtXOnXd+qF0Y7HtM2gXbujY34Y8di2+ZYTqWVQbG1f2xDZtoV3baqdgmlXQOrV2HaodEmgbQRqtVzKX1fS5HfJvXVebaN8O9dVbtx0i6PtbOvdWZoPXQaj1pOl3YDtWiK7941OyzSJvp1HbGdMO0PNrqD3BbTQsex4jdp12LrQ9fOs3YHoo116Kt8e5jTWsl36bpdae2XWTuM1u7KdIO3PbTp92Q6+teGgPVJt+UB6UdPSoQg9Gm2N6FNc+gVa3tt2irK9dWn7d3t9Vy6+9ga7PZEiH37aR9Bev3f1py0OqWA+u2HW5qD3WJFOG+gZQ3tU2jpl9laG3UFq+3J7id2+9bbvtd3773dg+z3Rhu91wb1dUAL5pR0QBWaztrO+ZT+rD3c6elk2puAvtU0Wg391u1fdpvt0SrHdMunfb3oAMdqgDSuo-arvAO+6oD+gWAyzuj2Zb010+8PZBiYOyr0Ds2rBi3qY226FAHejjb-t5obbM97C7RfspAN7bKDvNCA5ABoMwGtdg2+A2aDfXMHkDOazzQ9u80MGT0Kh8tR-phVwrvtUqwg3-uIMiH3FYh7bBQbAPSHqDGwWgwocX2PLEd6OzndXqD17pedpurQ0bst3zbAtRGpPSDoEOwahD-+8wwJzrE7aLNw+qg5DrkN0HS92axHSbrcO36v1Py1w5nA4MW7JdmmhPQTv4M-7QjTcYQ61qiixaJDNO4-XEdP0JHHDU6s0KgYN3uHANr6yPU9u0OjLm9E6-Q00sMPf6t9JRzOGUYp0xbojYOmwypTsPQHEjihrowyuv0l70jCmpHfXp8MeHd0zRiZX0bmURAgjSukI1ZtGP97xjHujrV7qs0yH6jkm87VPVG0sG6QPy3Q+saj2+Gejp23Y6KrwN1qCDgh0o+EfKNRHzju26o1IemPxH7D8h24-AeeMPG1DnhpY0Vv51dHvlWRnYzgZhW0gDj+8FPU7vT28axjbWkEzEZqO2HITsxho3cYr3wnfD7RzQ28c2N5GvjfKooysuOOAmiTFRiY5cfz06rBkPgAyjfqcNEaaTqho3Wmo+Pz6UTRui0Kkc+OYnPtOJyJHiZMNhGzDQJrEJUYuOgGrjvugUx5SFPLGRTTSzI7Sc2NeG0DMpjw3Kf8Oi6nlPxzfV3uGMPQTjgBgfeQaqN57utp+g03DCpPwHnl5pjI4gdeOdHfD8pjEzwZFU1bQtfxl01ODdOkGPTOer07EfJO+nBTAZhY9dhePM7WjqxvM1aef2cGsDce6M0RsdNS6nc-xkY5ydOPEngDOpyQ1Mabz6mszMJro0EDTVlmq9Kx8bR0fN2omGN-mxU3MvX1xmhjHJjU1yeBNNnQT3punfyY7MT6ht069E8aZn2P5Ltg5k0zmqRPYGKzYu7E2yedPTmM9mpywzkrTNkmITmZw09mZ10pHgzC6yXTkeHPMmxzzS5U4OSOPO7CTDZ7kyScmN6nIdfpo05OiSMjLy9G5yC-2dYOP73zvhz80eb2M-mVt8Z88wBfdNnH5zpJ8E22bAsrmL9a5n5QeZPwFn11M69g9acA046RIXx2M0YYbVqmATM5wC3Oc9PNmwTrZm2O2YfOdmnzLSyM5ucePqH6L-yksxbt7NgqxzV+9C0TvZP-mots5rUzyd1N8myl4Fx80Hu7NimkDvh3c6pt3SwXDzC2kVSecnPGHazrp+szhcbNcWFz6Zu88uYEurnWdDKkS3Bdy10mZLT+jYxRsf35H8d46U8zWYTOoq7LyZ3C45fwu8WCY-F-04Jd0vkW+zPli04hdosKbUrsl1C0EDPrMWbA+JnvRedUtXnVVN5gi3xaItuWSLHl6TRJcNXwXeVbBsM0OaN2jocr-+XY+LqrOd7wrWFlSxxbUvAXeTPp1y0lfctdmpTolhE2mqLPZGsrXyvw6ObyuuArLLFmy4maitA6yDqZ7i4uZP0TWIL12+Y0JbWP5nmroy0M94cZMUaUL5l5UHwY2uHqIrUoJM7tZTOH7Kr8V7lIlZOsUWzrZenc+KY8MLXpTUl1EyZbtMFHgtj+-q69cGsA7LzHi8QwdecuEX7zk1uq9Nf0tpbKLrB8G8pshuymib7+sc9YlHS6bCrDWkq9heisOX9rTl285jeOs6XkjXVi1WJe-Vk3qwS13zQ9YCNNKa1L11PW9ZWAfWs9e176+jZZvVWsbANtK5fusTUX8bV1+-RoZosk2wbjV4K4tou0KWHdSlgk0NfstAW8LIFzSzqihNzG9z06zm4bptOtXbr4ZzY5za+MZMwrRV1i3WeIO7oUbeyqwz9dAt1Gbb7N6C3ixfPLX6TWtgKwpq8tmWhbrAJi4MbPPKXmt-tsq6jaDuy2qrCVikw4eSvJGgrjtkM7zZWBIWwbgt+00EBFuFWxbSN5ppneGvlXu1ud36ySoLvQmprOu4LVHd8142Xb7Vu-VWb1tBa5cXtn27Zb9sB2cVaN5m3nb+td3bbk+kuwTZ6WNXK7gGma+TdQuU2+rqpra5FZntZ3A7159uyHZ1U3Ge7wNqfQZYtNdWt79G3W18YtAH3ijjdxQM3bNucWmbcVy+2Uuvs42hL-dp44PeLNx3lr7tr8-sa9sN307Td2e9qYXsd2tVy98O-SvLygPrrCdiu-zd5XbGV9eVgY8EY-sIOv7SD9Sy2YAfW3KTRdhHWmrXtXXaQeuoy5wZfsU3LdcD4q0QZd3f2Gb5t2K5bfGuAOw79D5w2RewclrLTi17WxRr8tj3Mtht-A8bbpubL+Hn1mK3-eEdLnRHdDm+8XedtpH0rX6+a2w4t1BWvjll+uzw9MN8PKHo1jSyI9oeF2DH0FxToQ+8tbmNbm9-BzmssdyWJdL1qe9tZPst3s759lBzQ8CBAO1bdtyR6DYyPmOobATvK89ZschPj79j0+3PZztROrbMTsR24-pUg377bR0y3g7kf0aKnDFuSxPeCdH33r-+jR1La+uDlrD0TyA0U+AcpW77cTrc9+t8dVPlrCj3Y9Yi4ei3bH6p7J+E7PsVWL7BTrp-o56fZqLtF14xwM9wccAn766mp7lcetNLWTDT8W82uacOOLbY13Ry4+7srOEdZoJhyY+LVpq9n-lu6-RtScHPxzyj341OfIfyAWnohiJ-M-yfOPCnyzuJ5ftKf9PubLSoZ5A8gxbP9nSdi7e-dUe8PzGALiw0C7bsgurnGu-3bc+cPKGpHrDhk67fusw38d9TjJ404ltnOcnyD-+4s7P3j7CXyoRToi6auPOqLflnZ75s5eKOxddd1OwNb+eYvIjI1i5047xeF7Nd4j6reA5aPMPy72zvxyWursFH0nIr727S9OdhOf7kroR5c6Ot3qi9GD0UzvdOvcvWDvLtV35r0NfnQrxzz+-8-OdGvpXJr2zQS4hdrnKNUjs02S+HsUboHeV2B5M8ydNP9XAj3+zLdxeev8X5+n1x5bNACvS7hZ5Jx1ctflnPnBtye7q+41RvNHjN2N0y9BeyvvXl1u2-c-9eKuIb8L3lRq-x1v3uHEbul4W9adaOS3Oj+N+W8TeVvlbN1jZ9zZfWZXhnvmj58i5C2FXW3ermZwa9bvK6PXtRmNcdvNdi7czJLwd7I-rc5qOHeV5t+G-zfwb23gLuZzi9LcyuWXTO4x1OoDdlP6NfToe3ub3SjPHXqLtOybYztuvtHxr5d6a7lfFOYVzzzd3C7efLWs3tT0N986dObWTnBbud9G8Nc-ul3GZld2a-ldi6VbuttN1RdA-kv3nlL-W+tendHuNt4r8gYI+Q-UPmXY+690q7tvs6a3LzvlzocI8iqv9pD355+8QcMuqHPFzp1e+L3eWB3Kr6lQM4Sex2wPvmkNzm4Pcke4Px7hD0W8o9dvf3qH-9xW5vdrnJTUjl9Zy5Y-dG2PBh997B5dfkeg1jj6j2W8E9ru9jMj4UwM5aW2ux3BDoz5h5M+I2xX371Tyh5ctaXiLSb3G546tfiet3dbqT7yr3efOQg0H6szq4U9kfvP7T4O8y+0sYfWAHj7B4uuC+VOd3Ja191B7zcJf6Xsz3J5E4vc9vAUAX-t9p9VuVvHPtb4m3l-tfC7iHHnmd-B4xdJeEGHT1L9V60-wGzHiT1Y4-bVe7pRP3VmBx5-gfceKHvHyz-x76+1XAvT5l9Tl7SsNfmPY3ib4K6eWxeEbHXxT11-m9SurPl7tL4B-6Mx3oXCJvTxm6rtufdd03qZ2xaU8dvi3yXhZ9Z4u9sumlZoCD2J+Hf3fs1m2F57t6CBhuaXxXk91i7PeLuzvlXn7yt9vvYf1711vD0G9fMTv7TLAFO5x4-dqOv3J391wj7-dSF+v9HqTTW4x-PuVrDrvK0E6h9mfuvuK3r994p-Cmp1fr4b9HZp-GWZPyL4V-j9FezfXXxPqj4t-Z-Leavg3zWzd9lN1eIHEXwz6tei94-DjmFrz+L58+k-1P5P6XwN5zNhfZrdJibwZ82wCuer6v3E2Q9F-meD9n3uN2T99wc-jTz6+zyb4fvA-6Njb23XJ+1czfCfPH0r4y+7fO+hkrv4T9SfW+A-bvjX5Ey5-3OPfcf+3v83b5Z-z2Kv4fqrwb8p9rmggHvrx9zbTV8-Zttp1X0nf3stvSPJX+d9i-h+S-zvkfq15foL9g+cPCF737s+T8FXtXh3xL9r8d9Z+9fYL1x7972M1uzfdrsH6-Yg0B+Xvvtl3aOgz95Ph-fn65yvfO2o-1bb5vx5thj+TfULOmuf8L88+i-l-g-nryl+s+xOZfuNgH1y4GejfE-e6A-+D62Xw3D70Ppfyv-K9h+R-SzmP7I+yRiNo8+gjIG7PuLXtwY5uU7n341+xBhf4h+fHodbZ+t-ob5PmcJmAE9Kz-s15v+YzqOgn+Gvlx5B+igIgF1+cPmz6XuaAXn6BmRjvR6bO13k+7GWBXtF6Q+cAd-7mMZAYh4LulAZV7UBnPmuYvqDtmj7fqW3i-6joO3q-ap+mvuf6-+wLmv6s2ejkAF3+q3nL71eYlk8xtWkAb74iqTrvJ4uuXAcp4xuQ-v-7r+o-jc7ABCOopr+uXfpBhReSdvlbU28-v37-6hge94qeJgWp5mBgARYEqBZem35SOU-uIEP+u3jppOBp-i4EIBcgee6mBigRv62eiOtv7WudIIw62BvKpb5fmJlp-4yBJAfIBuBp7mV7yBsQfLZX23TpYH0qZoMIE7+ivtu7K+JavYE4+WrhEHwBP-pf6s+1-lQFlBfgckYtKIQR35gOD-gZ5qaj3t8bV+HAZsr5BsPoUExBXgXEHmBm-h5Yq27fiIFBmEAS-ohBPVtYjhBRAQT7ouEwdEEN+KAQAGyGXQegG6W3Pve6PKtemkG7uIwXoHOBLQZwEHBvAagGnBNAQsYq2fQSIFreNwSWoC+OPh-7OufzpMESuPAR0GVetHkJ4t+gges70B3NoMFjeGQXvb3Bp-oH57BzWiCEUexgVf5fel7pCEJBE2ll73GawVjqSBX5n2DZBaLnY5PBbQZn7FB+dqfr4h6XhD50BDnvCG-B43iMEQ+YwQYHPB4Idn5Mhl3hl6F+IXsO6wh4Xvh7LWZIXlYTm+gcCF8huIRCGruzIcB5YBXSHe5aBxlhsFfm1jg8HjBGIQqFO+xwYKHj+CBl8HKuxvgn7NeSIawHtejwfsG0hq-vSFL2jIcqFChDKssHMOCIS-4Wg-wbDbSBxAeiHNMmIRZ6nejfkqHoe7oYpwKO-QddajuO7qD4jBu6NsE2+VIdM40hSAQt5HB3gTZ7MhZoJ6HJBXSMS4khFun6FUuAYdZb6hwYYaEKBJQRp59uZwas5YOaoSWq-BEgcn7Ee7AbyGOhf-rMF1hXrg2HvBqgam4iBEnpqFY6DQQUZbBlIZWHdhmYWGHZhcwb26su5Qey7x+ooXH4H+QwSOb0+Obtb4qmtvrkEhhDvjiFGhOYSaGrhhztT5thk4eWE8h8oT2FFBfYQyFoeAHuP7i6IoYDaFhe6DcH36OgSwx2hVYaQE1hzoZ3auhkYaaEjuk-m2H-hTSrKF6hc4eQHTBhwRjb9hCbiuHdB0FgX5JBm3m2HahoboBGIR3AfX4vBxwUj6YRzhmmojhzDlBElhw5ngFTe94bIGPhMwb55LhOftjaXhw2uuFfhDAfGF1B7YRX44+OmjOEi+R4SBHPhLoWzbMh1gS2FjhTAZwb4R0XnDaHuQEXkESRbEWhER+ufgIEeWULuoEImPyvxGShAtncGERD4fOEk+4Ydn7kRjYXc7ihnviGbGRmPuuq3htut8qiR8XkRFGBSHjr7WRZEc35fhl+sUREhn4aq6J+HHtAEOBVNp5GRBrQZZES+i4VpEcRittSq3um7s5G0+2PrDbPecURmFIRofpJFgR0kUKHTq5od+GYBkniZGueQkQnpw2RXt5HuB2Ie0GKhNkYFFK21JgWGhepfgLqlqIwYz4IRFkQVHIBqES+H+eOkW77UmVQRVFqBSvtVEq+u4Q4EiRQIcxEJRfkUlFjR+vpxEURMKlh5SO1bnRERmIwdS6DRq0cNFZho0VJHjR20XZGYOrIY5H5aMESMEWghAamG7B1IQ6FrRngZpGbRLvhNFR+sJjUFshc1paF824gTP5fmnYaiEL+09vFHnRC4ZdHFR10alFcuXPrp73RVoXUF0+rXtF6yAFYWJFBhwESxEoRctr9HaRN0UOHnBs0XCFx+OAQJGwRrALAHNBakceHS230br45htkZTEc2DkUX5x+znnl67oLAUtEphB4YGEfRBocTGkRnMe1FpR2njW76edrtlH46QvjsGmeQ0cREUB-IQFH-R0IYDHUR34bJFVRLkb5oMR+7vjFn+4kVLHaxMsbrFBR8sXJFhRkloLFKRDgf77QxeUZ9HwxVkRtFXRW0SjFwGCxg-roxmUQ6qbYbkePbmRZ0ZrHIR1OkkifQYIsy78Bk0R5Yl+UjgEGHRd+rSARxF6LlH2hyNtbHcW8cWriCsN-m8G6RXRrF5c2IMVuF7+z-I94RA7sWrGWxhMSQY+RYIUXEJxpcZ0HguO0WLoh6Ujg1a-haRItHCRFsWiESx8ut7ES+xcUgDdxfAeXEpxlcXkaxh2JtTEShJsRtg-htUcxqNxUcbkERGWIb5HsxBaF3FJxi8QDELG8kUO4Im0mqHFDa9+srGLaEQANHMxLrofGhhVkbPGJxZcb3G3RT1jxEbe3NgX73xrOn+HJ+bAR7H5xU8THGFRMOGfG-xygf-Fi6ZoDGEiBjHpnEg+2ccn4kOzcRPHphptrAl8e38fPGvBf8dzHQWOni2FNGw8dKGfOEQJFFvRBMZPF76RCQt4kJ58eQkVxvdgX5v+q8QX4Cxyvpth0JgvnnFqRH8SeEtRoJhwmIJvgcgksaoMbxHc2qCcPFPxsyhEC6hb8X84SJbMaeG9qMiT3FIJFCXdE7e-CRjFgxCYUfjJ+eMUxEHxGkVAAGJC8VwlLxvdqYkiBacZgkLqLDg3GQJzcZ7EFxX0XomS8jiWQlGJ3CWXoHRlwS0gF+3oZYnCxjQePEwxoTqVaBJUifokIJhiXInGJyoC+poJzDhgnGxe5vfpmx9CRM5yhovjoltOQSY4AhJxwcnGXxvdim6DxvMRYlCJI8TjGTuYie-H2Jp8SXGcJYSS4ll6uavtHmJuXm0mux9phEBlJXYdok9JtSTmH1JesR8HpxgCc7FtJDMbm6qR3SYXHSJGSU4kDJDSUMnrxD0V8r5hv4ffqPesgPuG-mh4a3GVJnbifHzJ7EYsn2xqcccl8xRunfG-heQTgldJsyTsnpJfSbIkLBCxgPHUJTsa87zR1iNCkNx3IStF2JAKcEl7JoSVknhJ2ahkzvJG4Z8lAxTXm0k2hSdnvENR-yakl0hNScil1JF8UsmNJEKdXHYpoCV0aPxDcVDF4JSSVk7027cSRFVGTyclEvJHUW8kPOAzl8meJVwbSAlJoibYl3JcyeSkLJlKa8kLGaanwkiBTScKmo6aicwAZMFsf4kwJHKVrGdxQKZkkgpvdirZuJzDthGqJTKX8kVJUqfqn7JqKYMmrOHiVEl0gZoD1EMp2Jg3G9+WiVamIpZKTakophqWXpCpTqV0jSatcRFHeJO8fraepzcbTaSpPqfAl+pFKc4mHJqzqAHBp7qSqlbxaqSaA2J8KXGkkpTob6lzx-SXakpp0Fi+pdR3NqGnDxGyU0EspWqawk6pscVynSpzybKl8py8SMlhpCYZoFRRkyb4lMJLcSwltxTUcfHVJCacWnAptnjpo4pHyR4Y0JmaY-gwpkaeolMxfidAmNpo6R3G7JiaTKnJpVKWXoq2BsYKmYpYyVCk-JK6cqBNxg6fgmve7KVumcpeqZOkGp06S6nNJ9KTXpbKTKYkkNpI6QUFwJDia2k8p7aXLGs6EQBcHy+Npr+H1xl6XgAKAmqRul-pUwQBm9Jz6bakBpqzrC7NJisRFG9pvRmOYaJP6Yhn2+uiWklIpu6W2n7pcqb3a5Jm7t2lCJeGQqaoWL8fvGtxJGVUlkZRaT-Evp6XuXrTRAzjEnDxYqTj5HOTPlr4FpvYROncZ6GdOnSaeSTNH0ZUKa2GwZYEGumDpv6exkPJ46YBkUZwGVRkdpvdvJkCZLSWembxravik4+cKWJnp+8aTploZ-qdOlgp6af97fJFmQnoRAVmTMk2ZEmU+FSZpCUmkHJB6as6fBKybElCJ-zncFEZakZpkfe2mahnSZDmbxkQZBkRKbnJ2aWBDXpYse9EEJRPj5msRdmQlkBZpaUFnQWC6emmCZi6eAkqZuPpam5BMWR4FxZ3KWTEnB+maBkLGyWTfFG6H6VnFlh+tgsp5pw6fVnNRpKX5klpGGSMoYpAqcomMBc0WZnQpEMcxkDpWWcwk5ZwftPF+RTWX7HzB06QX78ZwCTNm1BSmRMl1RKIfWnEZ1qfZlFZ42RUGrJj-vtlBBliRsmMJy2V5HiZ62Y8lAZzWbyltZOupNkjJD2QxnpZLGUSneZ72Y1mfZW2T4HXZyoNJomp34bwlCZHqbVlsZF2YVl7pgWdRkRJp6UAkImyqYUlhxGaaPHuZ1yRhZphd6eo6o5-mejnFZmOQ6kmZOOdiliBj2TglRZzPrZnxZVOZRkY5BmWXq0R6aUPGVZjGVGb0JJOYpbZZ5Obllg5nGaNlTpvGW+kthcmTWnJ+r8WdnRZlOWNm2eGKThHKJaWRakg5dWermy57oakEK5j7rNlFJ3ysn6nZN6aymRub3v+nEJEOUjHxBcuSMmCJUKULlEO9CSdFepBuezmbZzudtm8ZBfsen3Zrmcn6i5RtrOFvZbCWGEB5aDqHatZqMedqRJkGV+rdZIPp7m723uaxmDZhuTxnuhGcfzm3Z5vhFnVZqsTbkaZ+eTJnpeGKUZnTZimXNlwERObvFLZNyWTmL+x3nlkN+8eWcqJ53OT9lY5iqaamKJ4UQmFl5LefrbPZ7edHmg5seV-FO5CeaUFJ5gcb3aqhxeQDke5OcSaCR5KjuLmd5FOf7mL5fecvkD5yecm6jJDOR4YF+m+XNlWJ5ecjl55R+bplfZIGefmVx1aeClhZUKflYNxuaeUl+53eXHHH5PUDMZn5q+Vjmh5t8djlrJSmSIk4+mWTPnqxc+U2koZveaAXoOSWaPmx+EptgWQpc2TBmT56iYgWk5++bDFd5UuSNkFZnOXpngF9BmvkwFd2dAXu5d+fEl1R-+dq6xpT+UAUtpL+ZDktZdBVBb0qqwemnr544WAmU2DcbgnqZ52c-mXZ1OdDli6ICc0lM5DGRskkFYucgWAFlBYWky5BeeP4Yp5UQM4Z5C6tYjCZ7mW3mkFK2RLlrZ8+TPEgF1mpgXuhPykYU65lWRGlEFV6azkx5qBY7l8FgeVDnTpPZiMl0xW+XrkDZq2XN48FT6Wjlc5NOTzmrOFaSEXnJ2+WBDRpMhWrlyFsRbQXxFg+XTlTZ0BThmWJx2bvHT5Vha9koFD6bqk7p8hXEWKFCifXm45w8b1lBaGhVHlaFKOVkU0Fr+Svn0FvOfTk4FHhqEUEFDMVMm55kRWL7RFNRdkU9FghUDappt2bSkeG0mqoXnp8BewWP5ExUNljp0udQUa5tefpGdZQxbOmtJHuQzF8G+uZ0VTFgKbUU5F9RXBiMFSxV+oh55qdVn9Z1mdoV2FG2Q4XXGb+RAWrOZyS2HBFgueYW7xomV5mfFvhewk-FYBbkXv5riTSmrxQaeIVupC2Tm6yAr0S9m3pB+ZLHXF5GbcWzFcJf8UTZKtgUVdZAxfgVFJFySpkvxCGSzHV5iWc4Vm5NMdinDFFuWiXIuL0Z5HYl5BV7FfFH2f4VL5SgUSV9F6KSvFKpB2RvFUlbBbvGeZvua3GsxHGVQUc5+xe6Gw5KyUUVtJHJQgXeF0cVCVx5MJU4UGF12FAUK+jeVSVuZu8XWkZFjUQ7nQlgpSfnCl9xQInNJLBRbmWl+ttaVYltuW25wx-JeDkOlGBf3kilQheqmZepuasV35Hpeom75PzmQXJJ+Uf6W7FKpUbnvhRkYPHDx2pXVHJh3JT6WzuiZfqUL5gZY4XBl9RQwmIlo4dBmjFlhZoVDpExYqVaZyZegUllp+SGXzF0FumXUJw8dGXKg4JVAn0lXRaqUGFSwdeGC5PZSaAq5NpRrGFl9hcWW-FvRaGUoJixUiUl5e-jYjJ+7xadFWxeJVxndF-Bd9nwlRyWSXHFrqTXrN5HSZMkcF8pcOkNlsWU2WGlpZbJnLl6CZfmwFrBSzkSpN5QyVXZmuSaUjJ3+U3ktF6qWUW1lv6beUNZ95XOWwl9xU54jJmpUplAVYugQGxRiGeBXDZuhXsWplXEVfqSlJyS0gFJKJWeVZlbejmVbJ05VUXNpMRXuUBFAhW2V7mLALRmm5bpWHHyAoJZ6WYlSBRUXblOhZJmYV+hVxEaJFZcw4m5+OQ-EcVXuQSlqZL2WBXflChY5nPlzDiYUip6xSRW6l3FUmXKlzZfOVzFe5vsa4Vc6Uk5jlf+eMU2FRMTuV6FNeUyWVpuOauXhp6WSwAxRZFXqUUVaBQ+WtlMFUJXfhSlWEjjOPiSZU4l1YYOVYVfcawCEhLYS8XuFiFaFXiVtZVwX1lslXUVBFeBU8VPOEKeb6E5F5RYX+VvJbiU8VvmXxWWV74YpyuF0BQBUW56hZsWmV6kUFX8VIVR5nMlwMeSXwVd+SpXPxnthEVVVaFTsWaVblU6U7ZJxUom3x4edVmNxuZTJU1VhVdhVGxaecWry5olWAkXpnhSaDtVABQqUJVdxb+UKVXlYwXpVUVZ7afl8VRNWMl74cJb-Z5ya1XqJfZeukDl5lQVXHV2FcoXgpkZRblsVQWleWq5tpchl+FBJfuV-FopRNnBxQJQNVj5QiYQWZVredlUJlfJTOXfFUFUaXYVYhSlnLFaVWuUlF+tvMpjVqFetWElZZXNUzVXymyVhxYNX2nuZ0ydeWHVt1SmW1V8iR+HHl6ea+WUlBOWjVBapFTTZraFNXlX5ZVNZNUhVDFclWrxiNeblhxy6UtVgAFxR1UBVZlZzU95vVS7lWVoWcPEyl+tshVOV6lTDUClP1TRUHlxJY8reqjhluZ61NwYbUqZxtZwXs1nVdjW-VC5e2X0qVEc0nmlBOfZVk1H1eRV2lBpXDWPlteddiNF5JWVXC1xFc-Gbl5NRbVHVP5XLmPFK5c1XslDcSBXtFXFWtWh1clVgVw5T-ijXhpr1eqmTl0lVjXs5NwERx3gAgE0BLeFMWimUJW1aF635kAQHUiqK1VuX5p0tdTp51tzIXVjwTfnbEJFE2eKUWh3lbypRVzSpDVsphCerVxZTdQXWwcxdQHH-VjyoJXD534cRpthGdbuqXFw6fcl3lypaPWlARdVL4l19qaVkNVeFT0p+1nBuOV7GMVXHU8lUNQEkN1VRhvUt1E9ZrkhZLYadWLpJaszWZaZ9XvnWFktUhmghj6aCa3149dvWT1i5awCAl6aWmmEVYNifXfmB1VVWr1EFevX51m9a3WI+ssYeV052uXH7PVGBtA1SVnFRfWD1V9RpUYV8qEg131QDZrnhl6aUkUv1VNs9F0l2yZTUANW9W3U71ZabbXoxldS-r2VmiS7XepTDWQ2ANrDcA021YZcDWDFFGvpWnFZmYLrPRA9Xbn3pbtVZHMNKDW1Ht1eRWXV7ZhkXgXbhi9cHqVV39fA3oVvFaQ3N1Qjag3qN6DQDUM1KVVcHXYDtVjpK1IqhSES1OVdqkuVfHio331vGSVVmlHIell26sDYY09JXjRQ2151lXSanlI9qkWLADDcSnX13FqE3CNr6VI2DVCvlE0UuKmRD6ix+DXmWdeQ9R40LeSTRY1sNJWdPXEh6aR1mHZc2fIAxNPuddWMNCTf-WCNLDSU0iNulfY1EheEVyHyNvpYo1fVRTS02qNOsaU205E2aaVO2UdcZapFgTarX11xDSY3FNajaM0d1ttfvUGVI3k9FZNFed6W-pRjd1UkNSzSM3tNl+vPUthNDfNXDm9lVnWcVezSE1DN3je6Eq2PtU7YONFujM1eluTXc251DzWE3uhfOfjUtInZZc0dWMzTc3lF3zQI1mNrTcs0nN52kXmAtKQRSVDByYY95V+czSvX3N0LcM22xKzRo3lNFJbY0D2zFVjp6NhRq42X17jUo0S+Rzbi1wtbyb41O2XDVjoBNsZTB7x1mLT83YtjzcOWBB3TdVm8NU5fw1NNvarS3sRXMaXUEtdNasYktC1QzG12BjW41RFIraOK-NyTVgXStEepVmj2XxtIXZ1mRVC1j1MLcc1JVLzSGZTNE4XI1BNSrZMUqtKuGq1tND9fzVo+WedI1FJcuBAlxNlRdS1+RYrclEStu9SYmbuhNYpEjBsdZ-UctWxVi1GtOLeK1oNOtZnUR1LrX+XatMTWy1xeVeVy0xtPLdhWklm7kfUW6b9XBFqVVxXa1xsDrbC2UN6MRa0LVejSi7L1UbVm3INObbzW9B6MSG29RATZ80QtshYa3NtfzWmXl1xfjo12uF1ZWbWtlLcq0LN+VaY3ZtA7dhXXxLJRaZvNVzUmElt3BWW3cwFbSa3hNoUQW1upGyXq23NvbZu2zt-beq3G5qTVfmmOyLdP5otbRRG0ENCjYfl9t5DRe0GFj1ZU1Xtb5e632VtdcHXf12xdumit27XS3TpKdTC62VzOVk1XVQrZCWFNYYX63NZAbew0AJETU7Y91C0eDW8G67Y22vt5jZW1e137UwUdWadc1591NZXHWZt+Hca1gd4dZq1AtbYRR2Ktk7ba3TtXNUh38FKHWU3qpG7o7HMtvUX3WsaGLRzXsdDfpx00V3HWM0EtEzW0aYd4ccrletatQh3KNoHXG2WNCbevieVFdVs2i1CrRO2ENgVTR2xt-rfG1T1vZYEG3t4adXXKg6bQd451xnS23yJglQx2H1HIUW1zKeDT203Vp7RJ1Cl-seB3OtXoeI2M1WOtA3CdHxQnWOd87bzXTVSNTe2ytw5mO1wRH9XGUdFX5U21vtjrQcXrNWKWDbfJMzbB36tn1b-XVFIHdy0xdNNS5mOxK7R1Zkt3bbWVPtfTdDUqdNLWp2mdGneZ1adjLZI37tn6XW31NcHVF2+d7Xch1mdIDeXqud6oSF0otHnTF4Gdz7blVidjdaN1cd43aI0mgI5ec0jtwQf1FKdw3ct031q3ZJ3rd9FWA2ItXSKS4gtOtmG24dIddF3vt2FcMlP1xHaXkDd+3Rl0Pd2XUKEYp6HW0Y1tDKfIA2d-Rr035lLXT60nxfnY6UBd4dVo2kdiXR1ZONMKgwmY1PnYd2JNx3f51-ReLVY3T1inBB0ImIhZA0g+8gH3VFdx7Wj3D1yZVD1BlJUe+F21QNZh17oyXbrp3d39V1XAdqrRV2PdvNdV3gNbYV21s9NrRz1-15XXO089znXjkXd0jgD2fpHnRLoNt93SN3c933e+Gft0vXF1C1D8UD39RLHYZ1S16Pc00q9hHe6FVNjVRabYNpLc9E5N3nSV1HxnPfa3G9O7T90ptlTUrkCtoPfk1LdVPYg1O9dHS71JtNEQzXbh0DS42Rdn3YGoO0arIES8oPPJ9KggRAIVD1iq8JUqxw2vHH28y1yKsz3wafUrwZ9KCB4AO8Zgk7wDQ+fQiD0CCfULzJ96gKn21o6fdQC88WffFQ59dfXn0N9o0u4BF9+ovqB0c3kMgA2kVvNLp7coyN5CF1d4DWJgw68l7KfS-8oEASCs3CBwFUPoCXydSJMqaCqKZsAAA8zXPeKrEp4vcTIKF8tP2Z9s-VADGCkghVTL9LfLuLsQ+8tv279uGPv18Q58j+IVyjYvH0Tixiu3LbcEArH3t94lAdxYwxXCzI7SlxIAh7At4m4q-1r-ZfIf9TcMIqQA3-cTx-91FNYiADairMAgDWMpxR0A3FLYCQDX4lP1eKoFOTDXIRgFCBlKG-X-LUQuYMmLxih-Z7LEDomKQMfSFAxFLOKeKKhBPgoEgGJ8YwogwNv9gQCQOj4rAzGC3yDwBwPXIXAweDyokKnGJ8DN4AIMbywg7uwvkbA7XIDyuCnMBoQtUHINaiGFL0Bd9YdFjxI8MAqjx99A-RUDwAvfZWKDw1YgBK1iWpoIO7MIwEwhSDEiH4AhQYg3Gz+yMCu4Av9zgzAAMA+xAwBfI1yFcDq4FAGEAYgzMAkr8w7whcBGDpYqDwSyJAhYMa4g-UGA2DqoFWIT9qsEQMVA0AMEPcAoQ2qjhDZQKPDRDi0P8AcDQIgUOxwrgwij1AHgw+DkD3g9zB7y-MP4NcyXilfKQKcCiP2PyAw6qKHcnQ2bDqKBg2YBJDFAluwQyaQ62CWDjgNYMViOQ3YN5DwvBUaBDRQyENhDaiJENVDzMNArxDAQxvKlgbg80OcAyEOMBeDZSkcMxw3Q-UMiSPip-J8KNg6f1FijincNCAEw6krTDgnA0N+QLHFkiZKngZ4g2ab0Am0QjHfm9B8uEI-oZnoyyokO2D4-Q4NgwjA5XIz9w0MYrO80nHGCd9HfPmitCG-IXi9MWMHRAyiyI-YP+oSfYENVyWI0ErJAFgqMi+8IQviMIC5gnXR+cg8IdA+c44KSPNQ5I+kqkgY-VSOPKtEOiPv9J-fSM9gOI2WAIg4-KsSF9BIxUCtCtqCSPAjhUBSOrDKI9SNojtI5iMIDufD3xx8So+yOEjywuHxikLqPyOvUmo0KP9iuQ6iOqwEoyNJSjhownzd8cmCaNsj0faOStC2HDaNCAgo5SPrDLox9Juj2I0EJo43o38N+UjgESPp8Go2DBajU4CKPrDjw+GMF9Qw4EJp8Tgr3zaCYfMII2Cvw8qOOAUAukLzDoIP30ZDVg9kOpjjo7qPOjWw8UMjguw2SAVDUQzEN+wt-ccOxj5hEQIVj5PIcALDNY0sN1jwow2NijYY0EM7DZQ3sOVDXY0VBUDtkD6PIMaSsoCWCvwCXAgA3fXJj6AdOACAMAFHESgNUgQ4ePeQFQ8LDskU4FgBlADpE4TVQ9yM3TbMoINwBu0ZwHuDcDLtJgDvjaEiArQiQ4-jitALoLmAYi4IoRCP0fwsBM6DgQG4DZo0E1+OQAgAgUSmjvo5aRIUx4zZaBDiXPQA8UU4LjgPglHKoADICEzIO9U9VB4AQTaQ1yhSgvfUP3jjhlDcOfjMg7lJgDGCOBNnoLQydyYAizKOQYTm45gAV9qY9zI4TT4HqAETKEHWgkTNA44DkTaqA8NTg1EziofDvgPRMrD2RkxOETIEwjA7SOA98BSUDgOfLJAXE+Wi8TlpGDyoIAk8GwjIo-SJOzcuE8SiggSk0kB0TLg2WDI8gE5wMmT2zKINlKcQ-cPiT32IRNSTmYNIO5gck9gD+DpY-6R3yVk-uNMMgQ3XDcjtZJzBPj1vJKSvjQU5JPEToU9pMjCyKhRPZozcDjxwMEE2+NB0zE7mAF0LKFROeTk-YFJhTjgLxisYloupiagBIvpL2K9Is1OagREjcB6D8YqKICDjU0xgsY7U3aIgcbU92AdTsSnOxxkvUzgD9TvA0KIRiZ8okPRTa6LmMumgQ9kJCQgU4Bj1TmwyNOHs0jA5yqMAQ8dPp01THIRpsNPJDy-DeoM5MqTtuHMOeTZA5pOdwFYhcPIQ1JBtPFTmGAJO2TXirtNzcUoBJPijMk7MS+sh9FEzwTkM2IDasnfY9N1TToK5P-THk7AJ4obQ2UpvDxk5cPpTmAKCxxjAUAPKAz1oNzLiId1KCBSc1kM7DomXAPPidQ140xBpTeAMzNSgt44Kx4AXdKSDlT7tJVOOAg9HwC1TmM4dN1i8M5AAcgA0woPaiZ8oNKXTUs8tNSikYuKyKzYYjLNqi6EGrPyDK07LNKsabPKKTD9vPtPXwYs04OXTzUywoSg8s3lPYidcmoIdcTCvGStkWZFgBusLZIyQ-MmAFVzrTZoxUDQCFk5hPbTG8qJN4TpIE9PYzAw5-Joz73J5NlTWU60AhTAs-lN1U8k1mj5iygDmxpAIIzMMbyEQ6PDeQjJDYSKQPhM+MZTz5J2AhCeoGOD6AsYOwxrCvbK-0DCVwxLNuch-RwCS4pE7mA5sebHxgFs7cwjMoTWkzBODzdRD3P5s6ABmwDzcqsnNQAcE7bz2Q1oMmD1zbmFcPyUl0xKytCnYCQBbzyYMez18YANEP18JAAxxscx7BKzKMDs+twkAyjCfNnzpoqoJzi1803ywgyAKaD18x7NXx3zmir-XJA7YNog0TuKrbMNcdsqdBXzYcqXysyDUOAtL8swBKzLcMC3lyjDco3vwNQeAAxzHsy3CfMpI-vGADFocQPABgAaCx-OgLQssexN8LfBgtQLfQGVwSspC30CILJ82AA4LQHHgv6o3wEQt9A6C8ez0L38+fP9s1C4wtN8LC1IBsLBC5wvcL1C3wvwLRcgwtPzbAk3xmAmoJfASLH81gunzyShynQiXY13MXKZ06AyH9MAOOSQcPYCuC0A64GZOfA3MvnMmdhGF4QlzpQmzMvjz5ByA3AAoB6AegwiP+DeQBgEAjWAaMwmNOC-41nM5zBzYEM2LR8EXPqIDi2XPBU+SOOTgqKYLKr08KqhwDNz9c5EjALzc+hBucGop5x6MmEPgyqMbSqV2kgncxLPjzfc4WzYqUoLkLDziE1-zoQlS8hxTzNSxLazzeYPosYMqSr3hNpz02bOBSN3OxSXwPoM3VfCB8sZOjju5L31tLqS1yzbsYy+ORca1cIsMNEr05jN-K-cGsNOjGw6CpzOwk70NwDey2NiRjuY4sL5jmgoWNJ8mfCUvb0oKvggxx+y1yylgoywXXjLVKistTLbkxjPmDmyxPDbLjY7st7Lcy5woYjmfbcv5Ipy97w0CaHAWNCC1yzYIQrNDHssPLvS1iD2jg5CeOhLSpU3B6we4+yBBzyy8KPcyi4Dxp-LYM4zMEz5K1tCsz3E9SscAnM-eP9Exy2DM-jFU-UsyDBdFMhtLikyjO6LgQGBMGQPK7zNZTEM5dNwTswPysnTSTIjOorCuiyuMgoKnMsl0HsPFOYT5y2TO3LZ4-ECeUfy5ACMr3M46Rarl40zPOLey1wBsr-Mxyu5gH7AXSgowqwBOizKEMAuGiQq3qvgzSK1KsqARYxog7CBENSterGwt0u3LcqwUFPLKq2px04Cwr1iHjhKx8u-iXiueN6rBqxGhGrxywzMj4pq+XPmrfMx+PWrnvHasDztE3ysSzrq0WsrAHqwqterWwv0IGLwq8XSXTQa7sIhrbSrMtaresKqsErAk0JPmrG8qSu6rWqyms8zsqiatUrxq5at5rzqyPOIDhaw6tPTl02WsOr4M16sSrU64hPRr1gr6vpLq46V7hrHa5Gs8j8VISs9rI6xOu5T067atnrgaOWtWLia-FTxrGa1eNmrsqvOsurmIg6tDraazmuirK69EBrrMgxutLCW63Wuhrdy1FAYrh6JwDZzjg2vWBE27EGTNgD64rwxI7MzUparecx2MPrvi+CIPgaMyzxxzeqzXOJLGSw9ApLSK2ksGL+ayMLYC-q+RujzMgFRtFMSHNfQwziM-SsGing+oOfTgw-UAnjL09CtHq9aysDlLl042ysbxrHkBIrPS48srAR6GGpArSq3RvJAfG4ECdrUazQKarCqxwDYcnAuuACrB63Gvsbjq+YNOL2awqv6gy87uTLzRmwaBjiLc5dOz4dmzevCjyYOZjfAHS7py0bWm0mC2gc4AuDxAjYC6hIAqUamPJgD6N8KmLq4HB6hbtoAKBxA2YLHCfQbvEpvwQiEAdAYs6a6mg2TgQAAB+oNLKroAYkPWq1aCCAkt1zgC+msALhQbzRkb3m6mPoUFW3VsSzErB+xL9IHOvwwruHMpwCLCCujKzi1-CGKecJAKiCfQpoHRxlcGi1ANab0m8cszbNSkJtSgW4KBAgrpG8MLVbcGgViNb3mxLOtb8VB5DtbFgp1saI84hKy7iWMBpzfkJAFlvwA+EqbzNQJ83ltscV2wBIjIt21jD5cJ8+uw4Ap81NsKrc26Cr-bu603AGgy23RtSgtW3VuiMkXJgBa4JG+ZuXTu2wwD7bHW3mNoci4jgBuAYOyEx1bgO5H3ebC27lDXAQBDvBMMsqktsEzUmwGtKbgM6psGbgG6ZRHrmm1pvtjEgLpv7CdO3xtGbSk6huVblmz5vRbLm0PglT-67mCObOPATsWbtoG5v2bwC55tiYNm8mB+bxykuBRgQW0aJKbnYOFsmLy4FFtErUoKltIQGW72thb8W-jjNwSW2xjbbhW+ODFbRm0Rvlb62zFt6bju6tt48K25nCbbLu0rrALErG1so75yzRx0LvWxTJRSbAl-MjbYoGNsZcE22xy-bLK7jtKqWOwTvYgMoKcBw7cGhDuQ7nwA1te7+8MAt+7h26ju4cJ2-2xnbzUBdvrW1229v3bDHI9tlcVe2XtmwH299zfbN-Fntgb+O0nvsbnwEryg77e5ACZ7We8kCpAGQLDtbbzO5dMF7Zy71ho7S4pjvt7a45DsJ7aKwDtGbbyMTuYAu8PGuLbqe6BCmTf2y2ur7bSsqspDmGGmAuoyW5VvWLmG3qvYbjyi5PFiMUz8uHADq-btJLLKwPtrb7u-RsdLyE8UAS76S4xuQAlnHWtGbIm8Au7iuMzTtuTcaxLs6LWOxLPwb8ALdMQy9bIuzcMy7IwDHsLACZynTBYMUud7B+7Nt6rcm9is1K3+8ptHq+m2qtM75mzpsqbBohzt5jtBx-vc7z6x-vW7sYJLglbRWi9txQeW9vuoKSvE5tAHYu-dMK7toEsPWbKWwhCG7QB3kucQejM5vxLtc+-vbbVW9-vg7X+1jv9iOe5oeDkPu5+yX93W2LLOyAMqHuwLt8xHvwAUe6Mgx7P89Nvd7pIHLIJbD4FZja0BfcvspKXewgfk74+8kvaHC+58LDoQB7ozfo64MnvCjehzodALF65f0l71e2bAV7OgA3uNSd203u17rHPXt8HiR5KTHzLez9sxHpS+msuHQEzmK24wa+3teHYa8Du976ezVtf7w+9Dtj7Iu57zxHc+5RNJ7dGxLvr7OyMMCTY6u9tt+H3E5Tuer1OwweQA+KweOM7nO0pv0HVB4wc0HGm7MfbbbB2ZscHRW9wcK7Qu5DyiHwh+LsSHzu5LsC7+u7Ifpb8hyAfdLdu2VtqHzOxocxHn+27tFHQYNEdBH1cIYfisxh0HsnyFsv1uOzVhw3CR7429-Nx7xB88cwApu9YDuHFu0bPTbPh5DvTgUIH3tD7g+widLwzu16thHw6JEe6HumP4cf7k+-FTsQB29PubrQHAkeN7QgMkeV7OR5SfCAmR09upHa-e9v18BR23sL7OJ7JuQnbhwuSrwBEDEfVHUwbzQg79R03ConTWwfAw7-OKKdma+e0Sc+gJJwJsB7xex0fPHgp2IRwn+O2vtE7fR2rshbpIMMf778e4fvzbfyifsyYzYl8AiL+Ww9AYbkQ1ht+L+J9WC-SMp+hNkyDE6weP7mYwiAjLiy1bxGbNiwcN+wXwxMs1DMCqBsr7MmypA3Hrp48cHsFB3UutH1G9wywzYBx0uXiyC84oTDUgxMcvLgM3AfpnyiiGfZnvGwscMzAmxEdGbgB0mfSrShxLsTAPJ+UJOAwiC2fKHFdm8otHSQPIyg4Eu5KdQnC5E4C6QVgL2cj7mAFEyNnk9BXpeHCew6sCTdEBBtNwpB4VALnmcK5MKb5B0ptr8NAh6fpr1Y5YCVy7p+pN3Hk4zBssr043SPujpJ0BtAcsJ-cujHVa5ucmDJ8FCDaUR5-DurLIUoeeDDGuyecDLZ5-qMRjDIzNwTgkR+ecGjxinsQLEhxHxhtn5VsKfcyJQ1Bcgwgh1OCBni488f6HCDB8cWTEPGKCb9rSCv2QXBxEsQkA6ix1wOHRB1nsrnH+yxDSA4Ko4D9rlu0PuogcMHvvsH2216o9jD8g8ddj-CpIMPHWCkVCwAFdOqianWmxGcUVxjQ9DU8I+IGQrMKF03TBjP5wCtTjAF1mPvDVy30LFjElzUdwXcG7Jc-g3AI5PbbZI3aM2bv5-kOQ7YF4Bc9gRF4sRHEip+qsz7xY3Rs6XQpwc2ZwMl3xjxTnpNZOk7cGqZfJj1F8KcWX658cuYXCa2CtZjDxwgMekGuCdCOX9O2hwgcwF6CeJ73m25fFHHl9JdFCBl9aTxXB6wpc5iSl+oehXWOxFdqXl+0PuxX+V7aSJXR2ynwfsqV10cZXUmyGt6rIS6ec4rHu9fv2nRm3rC9CxLL3xFXyG0ytxL1Go6eozXp1wCyXvQrBdiw9i3YSxLRm3OfLn1x6oeunWh08f97kp52flHqIk4ccAiZ4GuRsbGzxcdLEqw8fgH065df971Z9Ws+rQHH6tgUOO90dGbnV3+fhXDx3acFzh11yyDXCl1eDGUY139fDQMZ06cZ7gR28cqAlGzWferCK8BtXHzx0dfasQB3-syA6p9jtanDx6tefXWmxFejkNa8sIsH-e32s6rTF0EeQTXV1nsPXCN09fbrf1+LPirt53VvBXzO6Oumb419tvEKmQzztD7zk8jcrAaM70Ib8IS6+ffnbx+2cUD5kH0DwUBoobSZX822qcxHbN7KpLneNw+eS3lB0cdTHh0CTf83KM8OsL7LO1mtc3dx-se7HcN2IcXgnJ-rs6ncUP0fBbgNw9DzHRx0Te+r+twidv7m13BrYcPtwEfbXkt6SDGQxeP7cEnHx4HxJXuHGByFoJ0CQCw4-OIqwUXHJ4LcanQR5jdNp5myKeGrD41rfDHqxGqeM3ue5EgTH7t09ee3TW0pNG3-e37ec3Rdz3s7HzsF6vW37iIbS23RkPbcMXm+-5fqHdRznfMr0N1VvHHeuxtuK784MrsVAZi2uAj3wp2FvGLBIE7i67zt2KhnHyEDweyqmu9ye7MMJ-XexAqe3Fu8gFRyJyC3Jt2ztljTBycdwa3txDfprwxwTeu78Z6ndFaHZ9Kc33EpxHf+7zlxoi8CSd2ldL7u94pPXXiEy1uf3ZJ1ICKsv9xnfpXQd+3dSgtd8XeQ3gd0HdGQr9wg+7nH94XvKnpHCByx3PoPHdo4WuL-dP3ad28dQPmd+beSHb9+mvinWt57v333u9OsSsml73z4cV573wkAr4n8frc84gxxOADHN9uAAxcBgA8EBgucPIJ8Q8d7pD0-ewPQt3ysSPcZ43MSP1cKOdh36D4w+fsoD9efgPvD32AWgSCyKPWHse0o-IryD2Q9Y3WezI+Inae5zfK37e6rdwaa5xhcn3A1ysz1syPG+fG3e55kM2AX5xgqD3ZV8g-0PxK8DPDj8j5HOgSuCvI8qDHS4KvzXsqjzcokX68g+HqqwOFDLbEs7Kwbi3zLuBmPul-+ewDNl4IJ10ZdxjcAPaD8Dvcy2wyUNhD8j2heLQ4UHLflMcIh0N3y4Z9I+C3it0hFfXWty48pAot7bTuPEt9DdePQnK4-Dsgz34+U3aYzstP3QT6CtyQzIzrxlPHAAbvnHUAIyvLP8452P1P9AG4D2P22-334zrQx9NWkrT10ObPag+0PFTkPO0+S3nT94d2PoNx9eWXC+0E-hLN+yfd37-i9Nci3iz2LczLu93YvFzS12Ota319+U9DCSD0HczzwU2WclPhm75PnCt18g8GiZtFQ8Enpd49eaIFd5TfhP8t3-eOH8jyJsTHutwi+XPZSg09xPcGqsBovkk2WekvZM4i9Rg9AG3cXPfZxOeFDXPJgCq0z-Wy+jn453DcyLs3Iqw0mfHDI-VgL96HdAH12BaBUvwp2CLfwXKqo8g6wC8ACI89rPw+7i9bCfPhQ-D0ycjDDT+oonzxRAYBnzDHOhAYL+ryKIMc4ULSBGvDHCa9PbDHNOJhA6EDYv8PrJ8ewZn-k98PvCBL39sXPDZy88ovELxts8AcUKlebPwhLmf+ycUzZNRvUt1c8+vD8CG9ZXVl8Y-VwMb7FMnjhVwm-bOJz8m-+vYl8g-3PWKoLdmPUD6W8mPLK4rdCbFBz9cmd8T53w0CVqBYA93+8OiBHH+0PYBFXnB-WoSWayItelzoLxPtYra10ptrn+zw4jg3CDwo+3H228dcSz6N3K8cbQB-C8M3Dx-dcSzUd4jfNrS+29dKb6t8G-43ONxMdqbetyeMnrld4bdJPTW-A983WdxbdN3rc0+-y7Dx70dxQJO8vdJg6oKBDV3zO67fs7Sx-m4TiM7-fcm3yr1teP3yT7teoPcz9tgR3bW7g-4PxSIQ98ctz1I-p3Ap6Df53uGPCd1bFV9AdyqBm7Gvdr378Zti4-73QepII7wie2bwu83evvK75AAfvXd1vug32d6mu53Q+4B-n3wH5felbG1+i+oXNH8J8P3ijzB+jnnZ-I8bz-bEh9AkeDwnfF4RD6Y-lvtjxY84fu+2Nf4f3m4R8kvJHzMcgfTcFXe3v22-e-sX5t43cy706y3fMfrH6rsDH+p5nC8ftO-x+CT5H5x9UfH++C-gf8D2880PQ+7B9Svob1hfqPnx-Kc4PCnyh9ngaH8neEHmHyndVHmn7iB-veH--flXp7-S8X3M9+HM3v3Hwifmf6x73dWfHS7Z+cnLH53cOfTt6Dcufix12uXvHn33dcfA917dgf4J358n3AXwidBfb2JB8GHYX4jvEnyH0p9vYKnzA9qfWH0l8PHuHyagtX4l+9cDP1N4pv97W53mNl0dOFnMef3MsgCDA0YOR9RL3hI4t0rDx329YsoN6Nd13Dx18+4b01-TsAvMV21+U3XX8zuS4YVzTfyPP8CkBxUWVN+8l3WX2qukfKxyi-kv7AzArSPZT4nP-f9X2npMviWBwO5P64yffoXgTx9-hv334lRsvZ7wZ9HjZH4G8nPy40W9H7gT9rcVA578etYz+P-D8dPgLw0B5wHS7nBRwlj7wDzvxt3i+Szmg+BIwfEx8z9xr5b4C8h3vX0Adj0K7-2IKvXwJ0herK4iL-tnPbxrcEfwmF99z9mZMCQoi-y3eDWH0v3pdZ3aPz4Ozcv35itlngc3G-tvCJ2z+Fv4P7M8yfWbxINxTRYHj9cbpzxINg-qn3c80--L6jdw3bd+p-7vPv+Jf3nZ5xru9Xv14+f5oPlxbitv+Mytedv-s3jRFX131Ncj9DRHldq4BV6LTzX+q5sdG7autYTRLIL5d-bbPnwgfPfsqou+Nrp1yhPlfOixLPrvoB5u+w3Xqzu-03da3N8Bv4x8ipkH3T0Pun74PDm9h-FN01shz9k2JMPHAt5TcxztVz6DHA+sjudNbZv74P8w2Hw8cSTiczlO-7BU2nOg3ua+euIT1U57SY3gp1O+0TXp29-LfXfyYMp-qCFP9IwM-++dfLPj9P8ePpVypdLfAf7Q-H90V2C-GKcV3VeaPw197+s3OnxPeK30zEY4DQATOBxuH52KmF-0n+vjw8+AT1eeJ9wKeH-2huNVwv+CV1-+Ny3TuRdzeeG8jSAsYGsQoM2NudTzl+unxk+2F1MG9bHwuyghb43-zjuyCyd+GA3UEhPyVurvxPuzPxf+unyXe5f3-2EP23eDV00Q262p+J93KWhoxPGjHAZeJ42AGaRy4up3E1+q7xC+JywZGAk0Y4ZP27WUgLX6y4zi+8e0BeIM1L+wC1ogugOPoswEMBBRDlmJ9zceHS3LQLN0oukOyreoFweOKQzQB4t0meEp0gBsYDvAgeG+u8APb2OAPf+VV0puqAPNwP-0weX9xvOhdyceb-y8UGwEQAff31++bwd+ft0BexQlsAR3y9WyQNKElj1+A8IGsecynCBQR2su6l2lG-EGWknclu2ybx9mdjxb+NbwW+UGw7+wK2+u3MhDQRQxy+1YEmuD+0T+ncFAB8OHK+F32O+-e0L+T3yhulNyAeMg2RelNyr+zN0sex1yfuzWyW4tVxOgK-QwBXW3RuY3ywBJ93uuMwNk+4rFoBV-TAASwO-ujfwEBoDFWBHJ35+cH02BHxx2BpFwn+sX2YBXTw-284CCgLc3DQqxArei-1Ju3gPe+kQKE4HlHgA+wEbes-xOeu4kSBJ93SB2-xkGYILkB-0wXu8HyKBqXG2B8wN2B+wKA4JAGUBJPBt+vfxGQ6gJN4u4nKB4j0lubwMqB6X3TepNwpmIyG-4Q+16BD7w-28f3aBqkxcGTgPu+-QMe+xt2L+BJ3d+Q8ydAihCZ+Unzg+Es25w9OHrwGIEsec8UVeMSH5WHw0UGPIOh2fX2jehv1jemIJN+zOzn+ZzxjgE30S+Gny8Bz-xIBwK3CWmABDuxQHemDvy1etV2sBKKyqBxy1reVO3UOQfwBBvNEcBQQODYjQEuGub2p20f0S2PbyM2p3yz+E1xw2Cf3pBM128uiIPim6fwO+MS1o+3nxZB22zZBvND0B062Xelfw6WNfyRud13r+fAKL2u735Ovv1b+BzzHeOoNg2Tb1D+SPF7+E-xDBHHxJW5N3I+o-2Nu4-0ZBj-0BBDvz7+6Rz4g7wKH2y-2U2q-zRu6-0im5Xy3+HmyvWNUwtBKKy52x-wy+wAKLB0AKv+h0Bv+BJ0gBU4OcBcAO1Bx7xJBg9z8B-f36BX-0RB9VwzBYQMm+VF0ABmtzP++aHcBYAIZoBz0gBffxgBD-yGedH0+BK4Kmea4LiB7wx2B24Kweu4NOBEQNXBXijwBgk0IBNdw7GQZx4QtkBp+3IHzB-5zL+KZzOuxP0umhwOeuZoIVWh-2petWGxGYgMgE2X2xBq4hkB3syhB8B2SeogORUKgOy+aA0wGaR00BdwKjO5qxMBNIDhuBgJyERgMPmdENMBUIIsBNjz3BtgIPBr-yPB-s0RBM4N3ObgK6B4AI+BS4JP+nEIfBhy3BWn-yAuW4ORBMgDyBCAO+BxQJiBpoMBebPxBBWt2OoYImoh1IKGObKxyB1DHi+7EOzB1QKU2zzxEh3Vw22ZIMNBDxypBFn3M23oOZYs-zaB-SwZBQQImezHwGBrIKGBnjw5B1EK7OuuFpA0oPKAe10um3-yFBUIPZeXIIHOQ5yhBooPF+hZxJkUIKDesIKI+OFxLB0ALLBFwOnWJoIv+zYJTepDxUhkr0F+cN1ChsO0JBmoKEhOozFGGFz1BBoMKIsP0lBq4liBlbyHBd5xzBokI-2DbyKuKQ2fO4IHygRVxSAfQC7esfy9Bmf1ZY221pBzkMDBanB6hoYJz+h32Wubfy3G471WOx-0Qh0ZyE+s7xjBTcDjBiEwTBoNwmBWSyxecEPK+W7xgh-AOOhLUNNOJkMW+YEKku8Fy8UggAE+cG3mIxF0T6532Bu+fyH29kJdwQ+wmh4-x6hC4PK+HkP72W0NlUnc02B+nzc+T4PeO0601Eg00BE5EPIe6axpesoO2wkMOh+T0IYeiEzhhGsxlEiMMkuH+1wh0LyI+qgIa+ZTwlmOMN1moojTYJoM32aoi9eaR1oMBgCGmfPyR+tL2ShWPzc+V70pul00physxsgNMMZhMBmZhkYlphzMIRhrMK1uUS3EQvUMzAVmEYuMULF+SrzE+mS2nWDHBW4lr1pOyiiZh6ijVEJ831wpryVY5C1WA5C2PYVr1ogiPE32usODEDHANhZr09YnAGsQbXDNhWsMcUnAA5ASU0to9rzthRsLY47JzWB6kJUeKsP6+iE13EGQD6ANp26+1v0smioPxheTzM0PkIY2cN0zY--wMhhL3vBA-25kBWFBud-HpYKQHuQkcPNWYYLz+fQN+hTkP+hRl0BhoN2BhKJy8hpN1eOxMI+OJpCZIeDyb4jsOdh5sIY47sM9hl8G9hLAENh5CwgAAwA7hrsJGGOsJsgesNth-cLNeEADCAI8P9Qr2wzO48NFE+sOnh9hzjh7l0y2nBEdAfkMjIL-C1u6JzlhZeEseB0Nhh+SwXYmbEBesUOVhcNyl+ljwF+8OA5eIOAiAZUKMhNgJrebV0tBraw7gcqxLG7bE6heoGLhw70+ho5A5AHoAFANwAAA0sIhBkD4ty4dNciRos91RhBNTIR7J5KAAj5KLnD1QFXMIJFGCxTnXCm4BsD4dlksamLktLjloRnOBgxblg6sRgd3MLAL3NkOM5tIADtCZBo0tmlgWxWlnqtT4YhM25oDs5ttipnIWZD1trMMkOH6ciVpMt9zvxtn9lCEJxsJCCgW7wNLkyM-2CMsYxq2szTu2sTBphgxEQ+sRngCNpEQ+tpnoCt5ES2BFET+xFnioiQ+KhMcnHutO+OYizwLxDcVJADlhjeCNtneDyDpVcTEXCCz+m3w2zvW9HwXbtjFHQsdpLRRmoIwtTtrbJgkR7B95DZAHWM1xZphhN-EEqwQOFgNesCEizYDZBt+vEidpCEgzuJKRKuOVxSuEW863h4jYFDmNveHYjWRtaC7jtzIzhgihqdlxNrhlxsioCGc8UGGdCKC08GATHAEhu-DhqBJc21ums9YOFBiAGeAN+CMsHEcIRIAaMj7EfWCPdm4jzIQctChi2NShjl92xvsNkfk1ssIc7dHfqghIngic2kdxcETi0jXLmvsKAOZA2wAZA1ob5NzIE5tLkV-JFoOcifQH0AmJlaCxjjaCvFBvwirsQDuxpIMWnj8irpkhxwzkZs2fg8inkWwMVrg0iQfszAQUc8jrkIlw4wMzBYwJRxTwKWg6htttBLn-MA0KCiYwBRxRkJH96gOQgsUWeBTwKVA19qvdHAIytP4eaCifhucBkQCgpwSMspkWYNQnnxC7-oyjxkagpQrtOMqnq2M5xqsiFxtUMxhnxB3hH0j1EbSj80EMiGURUjKxiyjJEQFApUTMjbTpyjmxrOMJll8iioJsjhUd-Dekc5RcbsuCEGjH0KkTi9gnjDxKwXqtqwems0ZhKiRkfKiXEewYbhmciCUTcMcUW29OBo6iKBj6BiUW5cl1qKtPVrMDxWOvwKkXHwSAE2tNAJA8A1hLN55paC9Vgk8IwbzQU1kadrEcIjBkfQBhkYZt0NtzIQZg+tzUeatLUSmjJUcojpkbajqNCc9NkdSs8Zj9MbeGCd01susI0X+sTrpBCK-lO9S6FOwGAFYQ-wOTh3VmesQblqtIIKmxLiPCi9cD3gWAVXA2boepagRwCk0UUJinmax1wU3ALvtpDjUfGMPnplt4ER0DyzvojX9ngiA7tB9mdqdDgFiGi33gu8Pfl6sxNuawoIczsq-mz8oDhMdt2Pmc0zkAdT0bfRvWJJsekUDtzAKsB5Nq8jR3mWdGUUajnPqkgz7sy98AKmi-0Q9A1jmbcPdnzth7kVd6PpbdGPiV8Jdp2Bpdh5trprsJDjpgAldqStAto58YMSbtD7rWgd7kptvoevcxsFuiOoXzsKrqDDgdg3CeYR8dqFhYc8uJw8GMTw87NqxxBHsI89pKI8ZxCfMnAB-NrDrYdoAFoCAdgKdLoYmixUJV98eOx8lNoadK0cacv4dSj5kc8sAyOftkARvdbQQ6c-QXSC9EUyi54JuiNoSts53j7dmEceiuAQ2ieAUps90WfDFDudN70bfC0jtej5QQDM+NgWcxPogdinsgc7pgvgz2KmxsDrgd4AG3NujpSiFMXBoj3kIitfmjCyzlai00WZ8AMdz9DUUD9zNuBiRoTbstjhrsmPnscEMehipDpIdSUWltrPohMFDoOgbMUpsa4Y+9KHuU9DMcHDs9nicFAX6j6Fgxib5kNt+MeNsN4e3cITvhjIoeUIPDniMRMcSC73qJ8KsVRjoMM0c+QVsDhvgQ9E7mK9esTjsnDlY9kTgichsQ9BD4R0ssTjn02saUd+zuUI+Ti9c34XJj04czt7PmCocMUZsZMQohX0aLARUcfsNEU7wKkRH8lQbesVRsujzVjZCivmgY2gUit7-ms8KDrmjgMfmiWRuyjnyNlwN+FODPkQBDFxqc8-kS0ja3tQjCNmRiGjlC901iwjwptwDSnkptaEcMNrXvsjfXpwMs3rAcjNtwiZBhmdiznxIczmWdb0c5iqzmmCIIYdBiseNC3lJtimqM2dWzvWdCoY-DOsZOcAoVH8ZQU-DCQNFCRztDsBXrvDJzi-CgsVdDdznmDVYE2jUEYeDzNqDwiONijOrkZsgEUd8F0ZnAXsRBjbTghc6kQc93QQRjPQUps-odNcgcYs8QcRLtSsR-tFsRK9ZfnqjSAbQ8dftxtVRAAAdDFGPIm4bO4qmR18E4QFSDYAWQNqT0SZ3HQoigbu4lViAvcNAnCOSE+Akn4AjDEHIqPy4U-B36FvSt6g3B+GXYHnF64C0Dlfa+ES-cE6XTNV5dTD16dwwPExgI16snMrjMLDsboLDBYZnLCEl4517tgN14djD16nzBmGOKZN7qKc3itg7r6JwhnHPofXCV-dmE54uLEFo6LGs-E55F4olFCQTvFNbImE7XIfEsjUDF2oh37j451H4zKfEcXEoATHKLGMvSFFw-Pwag3Uv6b4vNEjIznYhUAvS-TXbHCY87HgbLVEjoheaBgPsYLIpdF9XUEDK4haHPkGcDQgViDCIDkBwIzTGTQ1UZWjJkjBLG6E243Jwl0PPiaIO7GloZWjqY5yiv42NHTvfTH9KLaEw3DBhv3av6kIrpZaEchG8MShFrwGHFardHFd6XNgTzJhFI4xwBsI+hETzThFarAnGi7LAlZg4dFIRQRFXYsVEVANUYGoNyF6rXRHTLBVH1jYSG+opAEKIrxGIDHxF1vQP7iQ1THefQJECLSJHOKMJGl7CJFYyNJFCAGJFxIxRT0iBJH0AJJEpI3ChRI5qAZI9QldTcVgJIo9C5I4QD5I0bhFIk06Jo807iowAknQbRHcEyAEcE60YLgvVaGI1S5CEzxGXnJDgQEz8CXY0-6FgioCCAPjAAAKx6w-gICuAozMu6GyVR3hNKRUAHGIqCCsR0DwuxOqJAmdQL0uJdGx4kPD1WMkAaAjgHVwUhN5oifVuhue2Gg4vCAJQBzAExPFjmsAndk0YLW2w4EZ44Aky49RIp4miz2WCez6RP8J1REuKERdhPYJLGBBmI+LUxwMzJUZqLkeiWOmu5Y2nBb0w+xbP1LRH2MOeFaLOx3RPdWoq1eE9aJlWjaLURrBPNWesBsWhKx9ASAkXABiLsmioDDmp61-G-YN-G8mG9RB02ymZMDX+qcx7BUxKdWWmNV2LvBbhuMxVBnSOf6N+PSJ8lGlxNKMOJU6MI4M6KQ2H0NVxnikexz+JXRf+Lw26y3MGc61HBMuI-21PAhkJSjSm4KLv+rhN+JfBOB2cyPqBpIMkJURIL+xiiJxddESUNkFa4zWOLEHEM7+dH25k0T1BubPwJ+oNwXWPoG3YmIlExt+Kvx9+NhxSBPM2i2NQJa8DRuNG0PRzO0XeXQnxxnGyueDmKOO5OME2tmN-W05wIJJRw-RWRP1Rf3yOOpMKM+cD1ixkWJGJalDGJrBxRmsJMMofB0cAAhyyxVmxyxaWKl2IaHc2D6NQxXm2Z2W4GQxbpOY2M6MTY6f07AmGIC2VX0GOFD1+AWuwXuKeCXuuWLkOcNx3QOnGhmZ6IKIx7DyA6GIPurh23uOf1wxJXwyxc+HEORGNGh4uBKxcOON25WMoxBCPUONGM8ecpyR2PoB4e-D2+OSMEQUm4nkWsC3D2gJxsOLWNThxb32xQxy0+wcMqxob1XmqMIlmS-XrJOAHCRzJ3L2sFBSOo8NXE72wZO2RwXhN2zpOzey6JF+L2x2Nzo+TX3LJbuyaOQUNGxNZI8gx4g-EnRw3JYmNJA8Dy8+pRIkxw4CkxfZJS+FOzahzJIxeZZzJ+gP0NJKwFq+5TCD4ZpIXxuXydWVpJc25WOgxMZK+xEs3jJj6MTYKZIDJrmxdJ+WM5W7pOlJZWN+AQZJV2R2Oq+aWJzJVtyY+Eu2Ix612I2rmPuOIMIrJdxyrJO1yPJdZMbJf0hD2rZKQWeXAZJdh1b2rWOmxW5Ka2d9weOluKiONWLeeCOzHJp8wnJihKnJSRxnJNJ2XJuR3pOde2e24lNXJ+R3XJr1yqOTJON2v72Veg5NaAvIOC+Xq0R2x5JPEbd33+B7xixEgG7R220Oxd5PuxBp37JIx0FJ6K24JAxK-RsuIBQBpKehFq1uJQB0vW9xPtWNmwrBxAAHW22w5upcMSx0xPfuYX3oxdFO0EKaAAkgaHMwJAFdWMVJ5JddA+4QmIJhN4wRAXM2a+GuPwmWxMlWfqKNGXoxD4waKlJkDxeRGJLYJ5wmx+5pOrRXaLcps6y8pd6ycoSm38pQFOLWnxIQOWwNCp1-HCpxClTQUVJDQMVI+4cVN5JewCSp8cJWAn63y+H+3Bm2xJyp0fH8JBVM7YxwLFe0OKjRWq1BJL5NKpgQCdBLqKj+g0Jj++uO228BJARHUNgJBuPexpvxdOA5ORJNMBxJ-pwcBAKEAkXwFaEU4MLhsqjVREOLae55LfRiBMIpm0NIpiOJMx1OP9J5XySh+1yyALZ2EQzH38Ae127OnOKuufXwlm3r0FRLin1+UeJimvPym+-exnxgXwgORZxpJaihJxg+LJxW0zyhfWIROlmN2hUpPghaRO0Bh721JE6ILBIOkPxfGFGJ-5P-RrO05hGMJaBsjydW15PNW+FOm+llJ5pL1IGxTVNtOTX0FpV9xLJ1HyMpVWJWAXFOGxB5M0pZALC+42NQ+k2OGp3RPVBilPRpQ+1Mpjt3BESlKCJEp3Zp6m0-JInzZpJpKZpf5ISx-WOlpAVIH+YtNM+zOxM+41OK+eZOfeDm1wpoNz5pzIJFJRAIGx-n1+pEpw0pRUPg+MMOAe-bFwe4HCX60XyFBJwLYhGoK1p5UJ1pt5K-eyXyRO2nxJpQAMC+xtMPWOP2tphlOoAgGNiYltLfALNJduwtNsh5GJUp-dwypxnzy+LX3tp2FPgxbtOQpTW29p1V0lpH+w6+Wtzlpg5GDpbONDp2g3Dp4rEjp0dJG+7sDjpCdKnpH1OCxJlJTp3d3I+M3zOA-JOBJ221WpWdJZJXigiW70JvhItOfIZxJYw27BNGoNwOpdtPGhp1NZ+51NqxaM3up6gGWET1KfBORIkUHsABx5q1epGqO7Jz5NcBRzydAeLyKgN-VqGQMM7p1D0Dp5mygEqMMzeFtN-JpdPzpo+Id+yxOSemaN2w+kJmxJ93IJgQDOJn-HPRlNzJpZEwppr8NQZ-e0ce+QOcenPA8o3l3jebAIvBz9PcJiAJJJGcIUhroxKJKAK-6PuL9xGZ2XGSSjA4f-A3hJD0MhH4JIZPTxABHgONgr9I3u9DII+H325kJ4M8BIb2H20SHSeMEPv4cgNomKzGuAYQAQAyFxlp2RhHwJczKJUAB-B0MKK0k12bgCtAoZ5lLpxDv05Jxj3-wjEOohbTBDeCPzTe7UMYZ9QEWeRjO02YOMWgoCEuRi+MVJAkLPB0N1WezpEIxcjPRRqwEaeKMKre9wKrWJSOzGUAB4ZCP2iZm8LBJlN1B4NDPORObBfpRJNv+sqN2YNDLEZriIEJKPzkZG8m5RyyI8ZncDKAnSD3p5q2xmOpP721jNTeUACaZqbz4uuyLaZrTLkZXTOB+PTOSefTOheAzK1uQzOhuIzMpuCDLaZWOM5psqhwUnP0mZ8-zVBIb18ZcGmMgDTKH275BsZNcDhENjJYgXcBkR-exrgxIATeKT0qZ34Fp4OzPIZpzLcZsYFhAVzOH2zYFnRWty5GSyztBxt2aQxzPeZOzOgoXzNCQEj2WZfijppTWw2ZzTMgAWzLuZuzM3gdzMOZ4LO+ZILPrY4LMuZxzJSANzLuZyLIRAjzOhud7FeZ-ewmZcjKmZdzNmZByPmZqoJbBSzIt+JTOB+CRIueCAwzOELMHg6ihH4Jwl4ZKTPCucTPeGS8OHYDLIdYYAFleSTM-pxkNnx7f0BZimOCJFBOPoLKhEZHsDLp90JNRPlIxZflKypcN0wZuQiRmJ9yemaMxkZojK+mO+MmOKcPjpGVyeeIBLCxqTONuZTJ8Aj9L1gf-DQwUG0fpp9NqZ2RlXRAYM1Z2TJH6lj3NxJFIRx0NyDexrNtxzTJeOivwSZAVD4w4-GAuIbNkWiCyuZkDK7eCoNjxafzzeQ9JkG-GM2Rxj3FeTg0++cUB4Z8IjlgNwBuAKjLTZ9uMQGmbNV++oCrEGvycZUwwue4MJBZRHy-4ErNPBFVOhebPwiZzLJGpyMIHx1bImOtbOdZDbK1uTbPtojjIue0sJGA8ZxBpKiGuk6iEMmFz3WRIb0HpuhwDZkACX6kbNLO+pPKp0rOVBJz1AQKbITekPxXZUMKNBVz1AQ5bONm8jxTx07JRe9YgLZRbIlmf-FKh27JBpSwD+ZFz0OxQuKE4byFBEYoH5A5bIR+Fb2wBiAK1xDsClhc0PDBh1PHBFQFHgKWFQANcHtUj9MNxa6NFogtClZN4CyZVcJPu7rNrhnrNxe9OPKJsTPTZopB+JV-XiEkb2LZTgBzZubNTZ4WMrJ87IVIdeDDZev3jZKNLcmMeN9AcbIze9UPN+zTPI5oCgLZH7Go53DAhESw1LZHZMppBrPkespP8h+8OB+W725BlbKsAQB2VZQAhAEl8JPZqDx9ZG9LaZuHJicgBI2Y1bOAWvHKLwvXy3ZxjxfZCIkfZH3yVh2eJ0506zVe-wE1e8SkRp9r2pgtnM+GuNPGGvIgY4KGEvgm8ALxc5IthdLLR4bnKdesmG85MlOUUISHtegXK+43Mx85WXC+4AXIm2WzOC5+wBXJyigS5bnPsahsJPmhzMS5i8JS5QQHte6XKdegAGHgbLnJcxxRos2ED5cm7AZchjiAAHuASufRIsuOQzvYUEBquXZsnOWPDOWW5ysWXq9oud1y3OXthDYR3iB2fI8iBMKy1OaUyC2Yuz6OSTDV2bAyYPsAt-ELdsQkLRxcueopj2A-pxhBmcsueqItuXa9XFIZzmmbOyIsbuyOaUuyKlvQAluUegVuY4ptuetyK9JtzVuTtyUuXtz5KQSDTOXIyJaGNySqZSzJuXtttOW0yZuQD9DPpjDw7llC0jtCyDuam8juVGzSftl8zuZdNdxBDyOOX8yMPvqyZsZLdPwWJCQidrjobnazK6dzcAUOBzf4JBz5WcqDHWbHAMmUhyLAC6zfAG6zgGczte6RpNrcapycOQWy9OQRyy+ERzR2SRyc2XmyKOWRSqOVpzaOX+DgfilCY2cxzKGX6y2OQszSWam9OOcXQNOWf12efxzdyIJzuADbd3ucD90GVABZAHzz0RLJylWR-wv+LgIlOXIzT2V9yXGT9zBefhz4ebpytObDtIeTOz72UezEfqUzzORAzYjohNrOSMB2uZjj7OW5zHOcuIcaQCi8aSfMPOXsz6ubSzPOfSy4uWHyj0JHzQufHzY+e5zIuRGhouf4hwufFy7XlFyQuTdy9uca8quU68suTnykuQ1ztuQXyWuUVyE+WVzrBj+NKuZXyJtnVyS+TlzHFCxAY+frCG+SfM2uUHzHFPWx7Xt1ycAJ3C+ufrDrEINyW2SyzCYRby1qVby4oFNzWOQxziPkDy86abSJ9gtyLubuJluVty8ubKINuWXzt+ehBduUkp1aV-SKWR2y3yXDzpuWvz8AJdzVgNdyRhrdzd+Vvz1FAfznuUfzx+XwyF9v8zSjLS8WeZbzknoryF2X9z4eTnSGdsvyQeWo9Q4eDziQI7zz2fPzAeadzL+WDy1+kjy5eSjyXfgl9taT4C-2Q9CceZTc8ea9iETnrB8aMTyoOaZQAtipDyebWhKefpRqeShywXvTzRSaAzAQczyjOQr84oOzzp+FzyrMDzyyOduz5+QAKOBaXxI3nALo4ScSWOVLydWexy5eXeyABTxytOSry1foFAhOS7yv+ZnAxOayRZAJxzxSQ2A08TDS5GeAy5OUbyFOY-g9eSx8VOUZz+BWzz5BYgLEJuzyHeRxy72V0JNef-z3edoyQ4TINvedhIe+SMMpmQ5zUYL7yLYcTiw+dHy0eM3zSuSMM-OZny4+asBq+REKk+d-Mw+anzO4Rnzk+QlywhWXz8+Q69C+fFy8uekKn+WlzshSfNiuXkLlFOVz6+dVym+Wnzc+REKmuf1zO+aMMNXt4LrXn3yuuRYAKAD1zqhda9h+bbDR+WxwhuSi8tBaNzsOX-zoXgAK5+RIL4BdMcwBdMzzVpdNZ2Bvz6AHfzrXqlyd0Pdy9+c-zD+ftyHBRYKJhSAK12cQjp1vMK0jv4glhRbCVhY-zHuS-y8+W-yU2WgLxvm9ysAUHdMeaaz-2RYzwDEByS4faycrvmhiBaggSeTBzKBfkzwlIhyaBZwAaeVCC0OQtimBXTiWBYdy2BXhzFSJwLauFmzTcLzz5eQoCPdlYL8OcLzgBY5imOa4hxBX6zJBTLziaQMKZBdxzleSiKS2XYMy2c4LoXtrzIALrytBQYLDeQGRjeYpzTBebzhhdPz-+ViLFSLbzp1nYLpTjALifk4KlmRc8s8R7zhCKq9kFgELMzrSST5oHzqSSHzXOcEKI+SULW+SEKohe5z4+RqK4hTELk+bxhYhda8UhQkKGOGkKqhaXzNhRXzqucXzLRS3z7+dvybRVXy9Rda8yhQUL6hZULkhbUKO+a1zOWU0KLYS0KT5gPyh+W0LvYb0KlWP0LTHlOyp+aSSiRWMKgBdNyQBR+TwBbMLsacgLPxNsLDuSILz+Xuy4BemKTeGCzbheKKRuT-ydhfGLfubWTcRSdyphT2zG4YcLS2AsL8AKcLzRXtzVhQqJ1hU9zrhVsLpBeWKz+TWKL3ivyDhYhMjhWv0ThZsL2xQ9ybufvzNha9yMBUHdkmZGc04f-cMeYIyvwdjyAOdDc9YJ7CvgL8BbUKFBAXvgLa6ewZARc3BqBchymQSgCGBRbjoReuzYRVDz4RZpzsRUYIuBQOdSOXrynlnR8+RTRyhBciKcxdGzs3rGzJeUSL-iTsiF-lmKHxbILKRcWyDHsoK6RbQ9XBRiLPeR4LZRQGL5RaHyGOEqLg+Vmc3OeHyvOa6LfOVqLDRbqL7ReEKTRfEKNFokLQhaRKGuaaLKJa2LjRWcLMhQVychYxLzRU6KshfULihTRKMzu6LnRY3y2JW3z-Ob6KnXt3yOWRq9WhXqgOhVaLlFN0KBuX0L3+fb1jbvoAAAAa-gFSUIgGIjpPcNBBALQVci0AlrikFkCC6wX5iwUX284UUQSp3liilF6qCh6Asir1bycgogm80wUMi2diOS6QAtsE3m8CMV4xi7kVxioyWViwqhJi3MUErFMUzCvxllKIsWWS89kL8pykTLNn5gslQVTsssXZiiQUJiqsXBSgcWgCusW9sk54oC4blwiyYWDihOD1Q6FkqC1HnT0whnyQ9cW24XAXG3QZFtCzgm2sj4XAIs+llwpEnTXeDlKoEEUXi4sR0832k9028Xmbb1msCgQWNS7hhIiujnEc98Xoi6Hn+s9gXjSw6A4izKXcQwCUS8t4WWMpN4kixSXOMzgFQSxaUUkUdmwS9Xk7YhcUSixCVHciWaeCuUW+CgPn+CtCVBC9zlaigiWNciPnESmIUvSsLmGipIXp82Llmii0Wdw1Ln8SzLm5CniWPc4GUMcbiWF42vkVcj0UVCwSU+i22H1CsSXawzrnBisMWD83rlhi-rkRiqMUwPC54-gP8BaSnvEwqPSXmCuEVjSvVDikFEV6Ch8XWSkt4ycjpbuS0RYcirQUMi5mXOSwYWxiw2kTc+dnjCokVFS7KX7C0HmITV1Ysw6KXQQvYUn40tYfcIaZJS0sXcyk1m8y2fmJi-8Ww8pfk5Sr1knPPzk7SpSX5A2KUX8+qE6y8qXoCtHlsUrAWuMi1abitJkAoHEiakPAUtSlXH48snkdSuDkFMvqWAvSEVNbRnl2SpmVGCmthlsCvToQaoh30FthryD7mKykVkD-QKX-cuRmCysKVncjkkcDEUVB3HdnqyhAX1Qgn7yyuRkjS1KUVi+dl2yjnnCC3YV4imOFASjaXrshPHbSlOWS3OaWPihEi4kSaUi85J6gS-i4lygCX4iwq7FimyV4-ewDBQ4BbVEW9nyPXBm5gaoi044H6EyzSWlIRRkDy6IjTylyX-U4BbMytNghy7BmjCi6U2MhHmNSRSVfszWlJ0i2U1SwIDb00hn5oCInnLG2gNAA8Un3I8Wey68UgMjDnG3eyWbyxmnQM4-FDiupklotuVtMpBnB4CR5syxeXTrZmWmCkeWyTfBkVSzAWs-U8WhEn0Bnyzw6AvdemGS0YXbfXb4jASplliCOEoKtPaDsx2Vv44H6wcgMFdS8Wh0CylkSMg+VGS3RSSI+jkkKdRCDUPABv2ejkLEXFFrE48VB0+lgG8r1ZWA9EXbOB4D7QNZmIKiQWW8VaWRycKUf7ahUCsFWBerVl6scsGbzyoA7JEkIiZIF3lIw6qVS87hV5MyY5LsqUBeqVYBpgXQCZIeNlQ7WlQdLL36qKvWWpy6RUV2HhWk-TRXtLVTa6K-RUWK5R7q8wnjGK4TmVSkt7dyhmVRPO+UM8oaVNbHRUxAzJCGCtkXH0A2YV6D8US2exV8KlRWqK+uWACjKWOK5dnpy2sXCyzaWUDZOWmKrhVAudSFSy9+VpKxwAE-CxVKKitnz83OWqKuaVzsuKDyKlfrFy0xVJK6PFly9aU2K+IFbSklmkiiWVQ8xJXEitpXNK+pUxTTuUhgopWsc2yXe7HeEWKnVmEsmSTjKoj48-QGascrJX7kw+Bp46kXq-ZQXTcyODgg3MAM-SKb0cyUVuCrGGE47eXzK+jn6S3-l7SgtnyKzgbALYX5ZK4uj0y1N6LiqmkPC+4VvHR5Xt3XwE4C62X1Su6khC4NAWwQDlDvJ2UECxyGuyghXni2gWXigIE+K7dESfYH6nK0aXfivjk0y2aXO8+CVay63HGcwIByyfaA8vHZVmckYBxQ-ZXIS3MDXStCW3SxUX3S5UU4StUX4SsGWait6VmioLmfSiiURc6iXJCv6X0SgGXRcoGWcS20WgywGUcSliVFCtiV8S3lVOvL0Xp8xGWFChoVigOUVBihjghirGVSSnGVj8v+WMy4JWYYdkUmC-+Wcgr1ZuS-2UeS6xBeS1pDhyyTlpg8NBxcXyUGSmJXKy775BStWVlUjWWpKj+UO-HWU1yt45pyx1UZynVnGyu4XPKs2W9kr4GHyl466YQF65wr4D5w3QDPU0RU4KhAmm-U8WEKsEVtCUEXgi-qXfU2EE+y+rY8UzeVNwjUitwsAD4AZ2Emg+1iDwsAA1c+eEySzUXt8noUDwxRaFcitUOiroXYykSXrwtVVhPbeFHwveFaC5bFp4sdASc5J72SiWbMyy1gsAUwV0E0BXzUlMGUsjeWWcr3moShGmYYBUWYSylXYSpdV4S+lmfSoiWMqkiXJCllUTbI0WfSjlVF87Pl0q+-nMS6VV2igVXlCl0Wnqt0Uwy69UCSzdXVq6VUoy3vloyhVUYy0MXKqkfmqqgqVwqvkHdnEXGmy9xWBqhhlD7DBFCM-NCXEb4g3EZqWAq3BVj-dEnmKuRl6wFDB9AaDXXEe2XEw6hnAi2hmlM0hVBq8hV3rdIDB-ARUmMxNU9SiFU5M427hwgpVfykFn1M7xnxDejnoonxn0c2MDHAS05Pk3sV5yojVRXCknA-GlnKKThklSWJG6COk6mgQ5lXCk3hYwSTV8CDNgt4mTXNQSTVBAHGQqKHCXb9CTVbM9CASUlTXSa+cnKarZn6zftmoCslnAax54n3BBU2q4NXJATBVoKvWDFEmDU+gRABhAaNX7U2NUgcr1mnitDUYan4gOELQVeyj1k7onTk7wiWYZkF2ZezCJUdzdhVDqg1Usy7VX0cs9m8a2JXpS+1V1KvpV1fFJVzcgHkFi1cSFKzJUGKpCVK6XJWpi4cWHKjQEZK1RXFK49kCKrDns4jEbcAMICEoHXgLKvZVFa9wW5gKX7HK+fnwq0xUXs+dm+a20gKCqei3K+rUmcqXmPKvHYDC8BX7ggNXyYhSl+-aymGDfYk8y3FaaIyf6aQgTU9XLelPYk8Wgq7TFpDPTHpqj7FikhkV7QizFU44BY4E1unIw+KE4g7Vli8pzGqkpTaY0srW5gJA4oHGmBoHbzHQQXzGucBglaAQLFLalJlrAT9HfcszQvy5mnZa3mjfkuKVFXJLEFklLE+g2e4gU7RAnY-e4hHEDBQBD-ZbgNCnsEvU5FXLcDpks3bbYwnWp7b0lw3a7XoQSWg9HMlEXHc+G1-Av7QqoQ5lkzil+KzEXZq9SF0Ysw6nQBrEAnE6UCY4-kUQzBRb3TFWZkzw6sU0DU46yym7k4LVD7HtWU6-JbhHPFWU3DbHLK0nVQPfSnmyj-a60gnXo6x8msQzck1KXom9Iu-HorAlgQaldDwahAmEsAABaH+K-xP+L1A+CqXRW609GyCL1AVmsDs4BONGywigJTjHQRx1OkMHmralKh2O1MKpZ+mcCIRIspkG2SzIRDOvHYeBIbAmpPNWRBJrMJBKqWZBIAVDS29Y7CMnmpvPNW46rE0AOspp-COcoxDKVla2vsJPxK4JWqx4JWQ2o1Wy0qhY3OMRiRNEJiQl8REhP41pPJRwMhLFkchP3kChPhkA+oMJsSKyRWMkSRySKUJqSP0J6SMyRGhJMJ2SLMJBSLyRE3BX12ENFxputnpupMtIBJMcJbyyWWOiJcJDhLw1va3iJ-iNMRhHE9GrI0CJles8uuV3CJkRJ71lmBiJQVw8J5+vJJPhOMUlyp3WU2tXp+8DspPIrg0eKwv5XeoYupqIaplK0818T1pWtTP1WqVOMp7NyqpcNy5W6f1fW061ieEuxrRkwOypANNhmVoLq2BxNFZQGNflmsvmeUYEmJWq2zRL62muA43mJGy0WJlPw6ZfEJ-pCaLFx36yeJ-wjhuB6NSJ9wKGJT+NHgJxIPp+zLhJRRKH+1xLg0fYIfRA4L3+mxKeJK-xeJXYLeJlEw+JJm39BgWxr17hOl5PSr4RfRJBJRrKINwBohJgXBvo0JOVhQFPeeCJLqZUCpRJL+2FJ4epvFD8t5oICuTONOMZ1MpOz1owPT+l6KBBD2pvRRNPT+aev+R+9CbYiM031n1Ogx6BLoe1O251+smbJXDzD2nnEQW84mr4re3xB1NPM2plK-eKerVutNPKJFByI+4UFINa7NPu6MJNpzlIR1vd1R10hyqNvwAp1J6KQpsFN8249ywxu5GMguGNi2890i25ixWRm9w6x5uyzJ+uqhA9RolmUFNTO0mIx1LfSLJD5KhAeOuwxmFJmNtgGJ1iW0GNxZIGlYZMj1jhrl1X4s51wz1iNTZL62jC0Yp0AHSNECrROoutHZ3WMeAmuoNpcGg4pQWthV-ewV1Xq2r4i6ErO4J2iNXOqQFSmrNgyRrpOzFIjx8uouNVmA11kuuB1yirtuIUB2QqdImNBuqspRuq317BsUxOROUxm2uf1D2IEN2LIrsCatSGBGy1WgWvm47Op-2kpLMxqOO22Lhrh+1mPcNYDLu1q4iVJq0rxxL2rDubmMI4HmNQOw7HQO9jBbRf2tM4JeqB1CJoiNoWPspr5J1uoBoLpRdJ-JUOpX5FH3xwcBqHuaOqdJdRvgpHSyrYgNKGNtgBGNvMIT1aGMVNGGJaNwZKDA7RrTJXRp12PRqKuwTI6WhWIXQ48pQpmAGWNBGNWNixrmNbRqxNU4CJ1W9y4Az7FdpIhxwpmWMR1XB2R18A2Z1Pe1Z1Dxs2N2v12NtGOnW8RwEp1FPJk5hzopd82G2HZMF1LFMTp2uvM29xvQ52xujlkZurJ0ZvlO45MnJPxqpOolKUAVr1yhD2yyO0lMrVJZuEAclKF1EJsXOmOsxOSuuxOYJoyN170+JalLMFmlNHJhZt0plE0iOFm2rpg2MaOPXwHp-ZqyoJ5L0pK9OF1X5IGx4tPExUJodueuthN6dMN1VaJGFxWqh+WWulN35KKNUpoqNlpOdlkGOqNjpNqNmAE1NwC1VN4xsWN15qsxRWOpN5GOaN-m3Qp+oCNNupojJ3Runu5prp1cZOu1TRvDJHpquNZOtnA+pvfNSAFdNFlNxA9prXQXpss+LdNK+ntP9NtuzWNDhsvNqlJ9lw5LcFU5vYgCR3apjs1PmyZoF142wBNc2o1pmdMzNMurZ1Tho6h5FKxpcR0LNsZqEpdZupOs5M6FlZsXJNZsbVlZtLxjZuSpIWJbNFMLbNa2I7NW5tWOJaxSWvZpDpO23iOg5v8Gw5s4+susbmiyqlOfZr4pA5tPJUUxnp85s8ZttKXNwd1vJetKc+m4EspbBsvxVKKRNjZWfIm1Mj+det1x29z2pRcJD1Fhst1e2vv2ixKvp32Omue+teWv7EP1-VzuplpzvpvqwfpAZy8ZsQ0RpeKChx4RpiZzaB8ValKU2Z2pRx6f2Bp3ArBpaVtZxqeLG17LAl2QRoXVOEpxxjmMZN22yL1DuOtexOOKtypICNAB0u18YLAV4JrMVUoCFN4OoZpUDKPNKyO-JEgOlNztIbp6a3bp1FrhNhlqNJttLlNDtJdp5qwJNrNNnoTRLotu537pOVq9WErBVpMXzVpbir-1PZIktOuvnpW+39+QBp3NoprzF4psh1VtP3NFdOBVs91HNI1q5pahputDdyQtuZKc2eFMLJJGPWhGFoA+-tNotOZp1xI2MVpXxuHpkdMG+inwmxyn3Q+FFssty4o2JKW2Mta5sWNqX1m+J-Lv17VqOtoUuB5XVuNJRx0PNZ1ucphXxYVD1oRt-VpzR9dPxtP70etvpqQtL1qR1DkPTW01vLpttJUt4ZvZBf1pDpbAI+Oo9PlOMdNuB-LNm2c5qbNKz1htx2PXNOQILuTVqlxBhratMrMxNI1w+hoeqMN+aGy4x9KU2N8pOpmmIQOIOIupRuJCtj1N+kbmqr1-s3dlRaOo+ayMWgBPzsBBlIn2EKL-pDUPX6gDIIpDu30OSVoxp7CoJpWNtNJMDLyVib3SVzBqH2P8qnoa+I8NuqtMxuxPMxqYLQJrIswwjBKht2+poNHQLOVFWNB4ZjLjxXJJw1CHNP1t4OKZrzzZZIhJkUvuIsgDXJrxkA2ahVFu3N4JOPBATPTtA-wI1q2s3pFQGdZj9I6QM8unWjdqhBMInUZmjP0ZsIIMAujL6hgQEMZ5MPj+pjPIZydpmBSxPo10NyohScIcZ84pLtvrKx5Czz-Yj9NepbGs+eQIICZj9ItNDpuYZaJxlujT0+5bypVutxqjlz5Ao1yat6lRttnBd-1PthTP4Jzer8l-PO21iyJVRj9OoA1TLjVDYJjA0SvTWuLOhuP9vGZ49v-tPtsAdczK1uf9uNuYDpxZADvAdUDsgdQDuNu+LPJhkypEVUoCkFQRxGVs0C-t5q2BZ0LzBZ5MJ1l5MOhZeDthZ0L3hZeDsRZmwJhlRjPuZ6LKodzzP2g0FvTWnzOSeTDuhezSCEBB8MwdsqmwdWt1wdMwPwdMwMIdfDuIdWt1IdfDvIdknxRZ5MLRZJ8FodbQqodCDpmBSDvkd1cruegJqsu2dqE19Kq85JUhYETLPeVGjqpJqMoklYAG5ZvLMPtulqFJi0LB1kjNA5jgGbmdbPdgZBoshiawgN-e0mpuBqXlH-AIgX-JlN3zzXR3bL+JJz0+5Wuvm+10PHRfkoquZrI8o5H0tZQbJ9A1rKWeDxxVt-exd1dwgrtkKqa2dNvhxP1uYFowHjt9NMo5GbLidv4rvkLZL8EFz24F74vJZyGpn5jgD-4y0qt+pcrEFwEvm50634x+WvxlszziVH7CvZVmGOl1QnYd0NwmBpd1AYDjuNg2+LZ+stxwh7bOJhIzrkIYzqlZ0Oo-tZSk+5ksMHuM6vrFc6ps5ZKv95FKtEAcosel66rZVkqoZV9EqZVt6t85e6qolgkqPVWfLYlPKqFV7EvudgqulVUMui5oqsedEqs6FhEufVyMv9F4ktlVkkvaFmMu+dH6u-VNaoUlfP1XFuPJz+MsJHZVmD5A47M-ZgL1e+lv1tV+VHlOaCqI+pLwTl9vwPZ4Es6dkst3NxUvilG7K6GgzspuvWtTlcSqvZl0xvZ0p1TZYuofZrAK1uz7NHZbtDVAn7J5tlFqqlc9szhnyorlAJBTwEcOukCEH2+rltPNvoPv2k0NPtmTKo1rrOrhwZsJN81ppBdWvydmw2Mlz4sI5yIuI5gyD1debMHpcSsEFNAL-FcctEFxvzQVrcud+hLupdUEusFMErV5AzpZd0NwpNPkC8dhCxAENiBwhMWsummDM0AnMrOBwX3Vd4s01d-IuRVvAPuVFmpEdDwCJlsitytcyhFBGzoBt5WsUGazuGBkcuyuhTvR+scuGeZRtzpTjoOeV-Jv5LYof5awvyF+mqYlNwujFaLtF5eboLdq-MOF6-OOFV3PyFd3I7F5btnFAls2tUbuhuKMPvtO+qzdGLp++mP2JdQsqWd3XwW5jYuOFiwonFFwunFGwtf5PYoJBEP0adqNvKNyDuJVJbFWAS3Jndi7snFnYordDEqXdM9tm1IGt5ts9v8l-Lo3Fgrt31i0r1tEDGt10BppBCavBVSaoydTOvWNUIpVdmWzVdXTspliIpfFOru55M0pXd6LsgMB0oadZrqadFrrxdfkxUdNrtrl3TqdQ1ModdNIrglzrpwZ9VsQmfro9dCWqR+Prs8dyAlw9Bespd5MttdiKsNQ4bq6dkbqougL0nlAEDjdYut0lV8KTdexqs586rs5i6owlWEuc5Kot9eNKo3VFztel2ju3VH0qE9X0sZVP0tBddEuPV9zvPV9QsvV3KpedXEpFV96rhl4qoRlvzr9FjQoBd8AH75n6qVV7QpVVkLuXdwgIzdD9rDefMsxdI7rXd+budVGk1dVIQvH5jLoX5PVpKlPqqc9STJRdKUpqdvIqs9w7tXdQHzRt0wqxdwC0FW4soQ9Hqtc9hsolm4XoRhfLIhtTBMcOkOx3GYGqzurwvFdj7rlt61KgAO4q-g3L0bQV8pSdL7tw1crrfdHsoe+n7u9lRJqZ5eTr-dFHo55TVyA93Ar1dsCMZdqP2t5AHpNddHMC9DSuadN7qm0Bb3g9pnuJ+drpt5VIv6dGvIw9xt1ddOHoDd+Hr9lRHvm9rLrI9iHtDdKHpBptMsQ9NHtsBdHpjdU8v6wJMqaUiboJVN8OShMou2dhVqXVPHpGGhzuel4nq3VZzp3V6fKudKfOOd0ntudmXJPVgMvk9fKuedD6uFVL0o+d0qq+dtZpNFUqr+dOnqMdgLvRlUkpBdYPothcktxlzLMseqLtP5owsrFGP1691B2C99buGleUugF1bqJdtnrJeCUuJAXnuEBPntrlHXpVlAXqg9JPtxdYTzylmYsi9+suxdMXoSlJiteV3LshtUuoOtvawy9OcIBQwhtfOl8vvd8RCy9Xwu2cJXrTt77uZ2WTvwR37sL1i3sjtyB0DlEQGDlwRFDlMwlR95nuyVAvNp9WPvp9QXr3NpWvn0n8utdI3upd7Pr3Z9UM2RFPtyl94up9YHqCIYvqLlprtrd0HtjhsHvEGYEsWZrPus1UzwLZhcqbllrqG9PSps9q0oGVRYBm1u3tXtfcsPJ06xuVgLwZFY8ufN-e3o9xMqAO1RGJllj1m97rpXlWvrXlpN1Y9UZq2dPvJ2dXHtVFy6v2dD0pc5-Hqel6ooe9pzsC5z3uk9r3oPV4ns+9DEpelDzovV-KqU9APshlqnpuZQ-tB9jap+dwkqRl2ntlVaEvlViqtBdSPt-VJ7ujtApu2tktoF9O2qsNhAoBQsCt-gF8sRImXuBerUql93G3pBwbtqx6TNw1dHEn+wy2blrgKvthtpcBFUNFGevoV5F+pEJhcpA4P+o6ePPuN17JKgVslz391xsNZ4TutV-PvS97yLs1YarupGCuIgWCuvlErsutLsuldMcyf9t-vEol8Bih1dtLttdv-ElCvkeYitoVPLLetOa3DeLqJrpfLzYVlgIP6WgsEVnDtwDrPysVAI2EVZ3KIDIMCbtiEykVEgvUQh3qAOXPr-VM7NKVzAYFWZ3O0VUSvh5AgCMV-AY2tfPo9VwgfUVgTOSevFz6AEgem5UgcZ4riuKVJspeVaDtvlVXrDNUooNEEgY1VO7DCVqZKJeJgfADhGvU5mPpzdXP1HdjPtq18DMq1ggZilNvu9VY9r8GaKsw5TvtgFaUuD9UeEbl3Xvv9OSq995csTl4foBJ7SoD9zvpAlUQb99UyvblUfsaVBIpj9yPJLFcctAhcN3C1nsxyefL25x8bpWVSgpOlwCqw9Mgxw9YSvJ9bLw2V9P1qDWgra1l0q3lCULbVZvNW9MUoAFhcquVSfv5w-mscFx8L9VK-oW16ZoABF7prtR1IFdMTp+VezL+VMwqBeufxP9krqm0Mvu6lZ9vldtPMVdBgd8VSvtlUVLrW9DXoUFW3qi9O3tZuBUIxVo7OxV3LwCmiANL9+ZvL9Xgqu93HpXVvHupVjftpV3opb9+6rb9CPqy4Hfqk9PwZk9dzt79v3qL5A-tBd5fLFVE2zedoLuB9nos09U-pfV-zuh9enqBd0kon9YLqM9P6pM9+UIW9pgf9drMsBe+fqW9BIbQZJmItVuvv7dd0IN92bqxddbqcDeCu1lTnuqdiHo8D67vjxVz19VqjsS9ZbzGDyNqv2Ximzht1KLBeRKSdSAdJtrQP21VAtK9VPPK9Crsq9H1q-dOTsrJeZrL9MgwlYzcLoBBaqLVQsJLVii1gADarIlk-vDFtaogAyAANDDXLkl9QqMeVvtxeHaqO9XSH7Vxt2eNINL7VJ8II9gCvddI6qhBQRvO1bvNO9FnJy17Hsu9nHteDN3sqt9fpcUAnve9AIce9rfrE9u6oNFknujD6IcBDX3rk9Q-sU94IeU91XOhDPwdhD8MqfVCIch9s-t09+nrh9X6sxDELsjFO8sDdslsA1BDNX9MdsvdbyPhJpGq4h-EDvA6WxPpYodBuFerIV3ytQw6Gq+ImGvsDD-vUV19sb1Z+sztcQf-5JKzBEaQDbDLcvI1r7vBFFz1o1gQDGZv0PtRTGq6RFz1Y1zGvkeHGrgA38G41NofkDpTP8RUT0MdjikLtJjrr4umqk1Wmvk11iEU1BmrNgKmrU1Ims01aR1k12mofDQQH01uULk1xmuc9v-u5DI6NAD0G0pDtWI3kO33gDFrIBQjmuuIzmtc1cGuP9QKvFD8+m81Q4auIfmohFSrszgmaqAWoWotmETAi1+QZG57oew97ruW9wPzR9nSoCD-nqN9AsrpD6NsiDjnr2ZuspRVrIZJd7IbKUnIZ7lTPvODVmCMAjWua1pgsaDOavY9KSEiGaIcND6mqXVjrwm2iSnh96IZE1BfOR9rQf-VQboRVA2uHDeEZRFI2v6DrJGZdNktj9wwYse5josj82vPdVlp5DApIee5uv-hQesCISSH-AFhEGQTupfxPYdTAp4v9GQJGAJYAbe+MAxcjD7vQjCGu+Fj2Nj4liNkk9PKdt5q2j1EAtj1mBPwONTCp1SesB16-qbgQRrz1WeqDtl00oJGepaWJHvW0yFtSjlRyS9fSz7DNlrg2ddCcJdesgB+GwYNlWw-13erb15HGCEqiKbD2RNP2-ltGQgVoajV9txNzUanDd9qbGVLMv1MfD94+fF-1Mm34NSf0f1iwgfWgV1VgKY1Gjr-vyNYBqYZW2qvu3+qf1GQjFtaiIgAhhvtBHI0hJLTuiJtozf1cROnDzYc39bUYCRDIw-Ylyrit1+NX2C+xOj+tqXRxSFfpEiO8eziOf9xJNujSqwMdT0bEJ4aImjIhI6j0Y0sR4hJbDLAbqlLBpbm1trqgbGsJ2iGwRRPAG1oqbFKgGpJsjTypsp680ANfIcCIDADkw-5J2mlBpKOW9wqaZAdcpKBqvW3K1UNYuC+JaiB+j2rK8D7SPLRBM0eJps1VgU1LwNsqxW1JMb9GizqM+LlPZWDMY8pTCI3kmaOZjZRwCWaOECdVjL+RqxJ5jchr5jXBp2JdZ1v1yJrX4pMxzerlH5DFQEpmD6xpmxADpm8sb8dAYOCEysaueSjt5jfwmFNSUdzA6oYYUjC0W5k9sY4ZMcJWbHDCVHrS9jDHB9jAkz9juZgiAZXEDjwcckB+szDj6tLhjDbsQmkcfJj0cbCVfKmsJ+Mb4N12Jz4BsdjxSgc1xXilNjhGzEQtM2Qgezh2AJa0Vj7MZ42Eyo5+1werRPqI39qsOHp9s0TNnsbsZcPCDjyceRUocc3oJAEjjYsd+APcblwZXDbj44C-43sa7jg8Zjjr6nAg-cd9j08b5Uc4vitn4oQ+jbuv5Scfnjqcdnj7ce9jA8aX4C8fDj6cbsj8q2Gon0fv1TvBzjAu0CGhcfxNxcYtjpcatjN3zXRtsY5jJzwdjGsadjjcY61i3FVm7sdbjF3I3jIcenjAcZ3jQcb3jQ8fDjM7AAToCajj3cYPjfcZgT4CYPjS8fnNBRqLdgCZTjYcYQTY8ePou8c3jscaPjrUMqjhMd5oXuszd8y2nRphr1W86KWDkV2ltt+xsNNMEO1EmFBU+JsStYpNddPBol2DIrGBk-OOexoL8NhNIrOKupe+KGN9JoRok2sgZnOHhIoxH2LoefqOr4DWK-mk2yE2FXxXNbH0yj0Nq1J1jogDBvyOODAD3joOPNp+icnjKyMqNGxuyxzlJBm9JDABWjODw6GOdNGFNDJtpu-Nppt-NYFLXuaZJAtoTI2ND5p3+jRqptAZpptU1qVdkRrHNOweoxKocYtw9OONSiaaxKZq7J4Ee7dnZoLpWFpq9uKkWt5Voa4q1tjpU2JGDTVtbZhO3UTj3AXp6prYu6xNsjRCdsJWcYBGG2ov26JroTR8t21UrutjB2rxNtNvYTRJuMx+Uf3RqVrqt4dtbNVJqnVNJqAOkB0ETAEtKtF6OZNl0w+1nmPcQP2qwOOB3+15UfwJjYccj3UecOeRusD-PIX5sCdxtmNpVGhia52J5uQDp2jUoNif0m+jNpjdkNet9pP52KyKJ1mOr7V6pscT3ViFtixrgtnpuPu95uVNoR21NvDBp1HictNgFrNxoSe7p2ZseNgX0yTHSxWtUX3Hp6IEge4lq0T9tNDNEKaZtlWwYtE7pCpPOrKd-x3iTpFuj2rWKLu7WIzJYuoGNEuvyTKSc9JNFsMDMtKMWUxsGTX6GxOxKbV1RQdBNlKcqTVKfTWuuveT1KbhNFluITF2OFjesYBQwQjuxFxK39i4ZaT6BI1tFRMrjhaMBjxBsoAssLUhn1pNtUVqr91A1itTVodWZCYKdpMbRw4qdqprYYYd2Jpw2XxKmhwAfT+rVpsd2dLLOBibx9YGJJtmwYVDNtNmtaKY95aluk+WQeVpcKdBto33BtugbPda-q5Tn1uMTKo1MT5HyyNpSf5pw1sdpj72utaX15d43O-RJicdTZtMLpExwdTzqt8dlAflDDtva+X1sGlESYThLNoHpStMBtfqdVpYNq7d6yeDTnKYzNB2MFtCxqH2S9MwjBNozp1keHB6FoLTiochTR6J6TDVtJNzHyCN-GIQdGWv+mkyYROWSf4xLSNJxNVuETzH04TjVq7TGyb1J8m1uReqZFjzjuvd5H1SdyqdJQNH0zxOAePtFT16GzAcPFXhGID6RTcd5AdYNtCYTh1AaAOnCpUhVioYDp6fYMIgbcmrAcHZV6Y4DWgYuevAdCIciv2jufuZD54bwVX6Y0VlbLLGagZk+GgZcVMga-ZoHsgzigbQVKgbgzccoQzvkIlmAgaGDrVyST4GxYThBp9prqbmtSoZe+VgYv9FnrOTwsGuTubvtTkaYHtFvoJdBIKeF03oxpVgdhBfttWS8OyzTRydHtTBtYzpwOhdlN0TO1Gf192v0V+kAEuVbL2AW8iq0lPHERwznuIzQRxrdfnsjAiA1bQ7aGCgAeuN9ckEvjG7oleDvyUd4Gf4VDGaOOsysNjYfpMztcdl5bGfYzrysJDsNwkzK8YxT0mdkzFaZkGCmenlSmd3QKmeaZ6mYsz2cawA6acs9mmY-Y2mZLQemcbZb8bszMQbONgfs8e3P0MzjyJsz9sfizznuQeFLtNZtwYop7HtYgcosLtJ8zcgHr2rxrwZuAN0pJFfgtr9jwer9wYZeDS6ozAcoqQd7eJR9e3t-AB3uAzcNx8zh3vvhKnK9WNyvQdPMjq96Prtx87NqVDgY7lqQZHtOcoSDrgZxDY2eCzfXtt+44gZDVcp6V5kYIz9acFTPLoQh+1rujSqZhu6QjFTzoIrlNgEdOFqbD4vwIDJoUYeBWyfjten3tTAmaIZzqfzT6KbfpRaehuREacVCtNZtPqcrT0JBBt1aYDTtaaXFW1tXToaalpmacYzYWchNG+3vJraYFp8aarpUEfSpR9pqjEOthzOae-J2afHdDjzezpGd7TftIZtnX3ST8tNH25wIBzaoYjpVabWtNadAj-qssjiWcyNzaecT7FORzk1oTTaOdFtkOe1RPaY+zhEfJzxJu4NfSdBuo6ZTN46YX5eZwpx51yAOs6YjD1VpCJtVtBuy6cnVe7z5zn1LlBS0LBgm6YlttqbwDDRERjKAdaTgQH1Qh6aMpQDK2DjApLT2UZdtiDIL09GZ5hWaaYzgmZcDlvoEZQzvtz0Lx4zG+j4zz2bhzaBiEz-voDh0N2mBU2ZCzriHs9z91szoWY9zLOaa2iUeWzJM1Cz0eeMzGWbjzwmYTz6hzyz0SZQlhWbQlxWZUUZWeUURecqzlfuiDNWaqzmqcjDHHsazGEuazaEtazfrzTdykv29DHr4DcN1bQuftrDbOLFW1yt6DhfTODo2d89GPomzHvojzK2e99TPo2z0QZUzQWbCD02bEFdvxnzrSrnzW2cW1O2fsjayaFTf2wVWNhIJjy2uSTD+MXRTSe39lpCkQAoHcjAoAsgHoEPAwiCSQwiAsgnkd-xqAdu+0fGeZPIzQIwPGpmJZPijmcHKWcpLco9ocdDU4FddKrOcoDIpVZZuvYUY6LRzwUcD1kqdeZLBPGDz5CQoYyMnDf0cnuw-UVTiqLkRoMZlG0fCk4co2uNusZi0IiLU4gIwKg7gyGjVBZ-zIMd6jzHGoLzQ1oLmrE-AehtA+1udlpt4o0VaeIyYDqyr+Q2FALhCPKDuYEaWGTDyjOGYKjz6MjRu2dKWJPzWZ80c2mfhLUoetspje02NWirK9W4hbgmTaIjmvhurjl1MoLbBdL1oqLLtDJpBmahdljVMY4NmsYFjwCx0LQ+aoNJayvR2rPH+mGCYL7Bd59ljswUD2bPjeieVzKhb5GD62-JLy0sLD61OxtdNzT6VL1W1iZQAlyZgY5q03tj+D9ze91xAFOpt69NtNu9huJzt9xpT2wYozU2jtDuguELW8NrA5qoXITYCpe9KYxOLofHQgpzxjyKd2Du1s0T1SfFxJVvCLeq2-J27E6LWqziLtiauTeq0iLXRYutUReSLqXVutYuAsNCvrmxRmK4pm8jFApEHjdrSGHNoZDrAEpKKDVRYaLr0eUVaiaAIUFrSuc21HRW6fDW7lvltq0s1YplC0+3BMct5u2ct2f0l9tCbBuXBchehRddMF10CNG+I6Lqhe6DkArX6cvpL+nhrELMhfT+UnIGDOqYYTkobcmJhbRJcdudj5hdqTN9pYL6ivQLCqZgxJ6fITj9vwD6CnI+fCimQ1cOvDqomONPkl5DWSgILGONNArEAdm5UlkD9vB2LJCfNWNqd0TCDAmO7EBKN35I8gJRuSLpAdmLT7utoJydJtzxbIz5qyzNfacFz1GmKL8bozxLKeEt4aHQgcGBuNFjsEt8OZ2QBxfpLhg1spQrM2jBPNKwJRusLGhYVZnBvKutaNAuEs0DjYRdULPcbTjB-2OT3ZqWJeKHcLgMPVLUw2FTmOdENZ+alTSuluL3b2MuLlseLpybNTb+bXR27E8LTCLCmdEEx4+aG3YNUDp4zROONThcYd+ueZLp+a2e-UO9Lw0OVtPkZ1LgRfF971tyLBRf7TUybpTRHx6LPxeJTzQfu1F9vM2ftoDtIyfjdpRY-2UBZBLJ0NELjYFATpZb5GVpZfRmueXjQtyQ1fLuzL-G0rt54Lv+qJeHLx52BjBuZeF56eeGj9L4UoKE9lhJZFE0ZbDgJJc9zkeMhjmjpN4bkGpLy-GLtPZaIzYTvgLY4PA1d2fc1-pfbTSmIQDxXqhLk6dDL5X3DLGbsjLDJpjLDcxNjCSb6lKt0gj76cxLO6foTqHIIj4n3FLdZaZdXMqJV2ucCLr8tzLMeve1ddBjLNjJrLjjI3zSNrROfhaWzzubLOnJfxzJ1rLObJewrB2P-NpAbJ25lofTFpMAppFY6TLxaRzcJrrlP2bQMkpbF10pfGVzoblLCpfmVnitiDxt2jTe1vM1tHrYBxMZnD0L0MwgealtFBoNLwP0rWD4sumgcY7L1ACyOBswiVXqxkrUHEtLB8dpL3abkZ+hasZDpemuvJM-LvFf4Z2ecYDxsf-LAKvCj79sHLT+0fpCvoj1RgY-N-odpNAmNMFVbIB5uON6Ls6pkGLy3grILMQrZIpG5RgZh5Q5fcrgYcQmK5fhgxzN8rRPrNVAyakjicfbLKlc7Lala0jyTwZF5pYDIlha7L6le3z65eSzWpe2TxleZ2hmGsQIlbPT7BJsLyT0krTvJwNrAukr8VaCLclcyr2cuB+WlaueC5bP9bZbfAMyzMzSWdsdYQmKraeZTLtjPErFVYbjUleAWvCeghwCzSrmGAyralaaryTxarZSnxL7VbEraJd3lHGfl1aFdHzi+bYg-Vfwr0OYlNbkD2rntqLghFYuebaYlFTX1P9q50JzcKtvJapairglZ2rBSuOrZvozTEptYgr1aMzRkDOr8jwurH3wmtRNrH+t1eSe3FdaL+GdCdWt2qj5mZtl4qLNJSJbM0kAPLEVZfA1GJa-jZJMrkeinn5eJbO5W5ZFEXldXLXEb4FaUooVOJZY1kklxrS5dogYVcwAa5aQrZmqDTPbspuJxZTTsNcnuAz25hNmu4AXyrMrCwYwjgb1PFoxIBLxtxsrWxsLLoNYA1ZeCnO9HMhpktZMjm9AWV6VoXIUSChAuKqi1hpocroye3lCypcryQYikX1ZsV8NOkBhtZ4zHREerAPKDhRQZVrtgDVrCyslOguM29CyoPxuFYNr1yB4zo6AWVp0NZLrtdPxdGdfUCyte1rlcwrrtemVuWvX6JtcdzoOHYrGQem1BldGDW+YcjO+bejIafvxQJOTraKxPz5BtTLeoDlxbbzqTzDKFL+Zag+4tdsVcN2yWGUePYTIucorroyj08ybLxrDz1NBN5oOUaoJmeuk2qSggmvIzkr1N1f6Qb2hBM2YyholbUQQEFIG681HOLKCAOLW2AuPGKHO+j0ddsqtNV-6JHrYoA9ARHHVAxADbgMKc-Y09ZYIPkvkoazDoAn0GPAmgcnr29cS4q7B0Ae9d5oXpN+TgrzPrwr2sQFeCvrTcC3A41BYuvdvaSq53LgcCDsTKgDfZ7IAkNy5qAIJlpvgsidlOYX1Vm0fAbo4HGAuE201AnCzUWsi1ONMcRHN5NoqcVj37lA3x3rYaPQRyYGBoxScNNyIEIGsGxGzU+YiDzlB5TLaczgK0a0pobPnEkuLAAgSGnmxFJVeYX1roSHAboK-UWky3AYxGghCDXfO7AYABy2iDdKdfQGQbfS0lOE9eQilwMkE3DdkWvDZnrukDnraHpOl1odK8hdY+ztmvgD82PeFF5b1WVGJktfebo2-WrigcjdEbvDZqVzXv8hBO1ArSKy9RrpczgopfOLkoxQQ6vDCAD62Sd5qwMbewfye3HIRB5jbopfDbAAr4vlr6jBsbqKv2zDabrTkZxf6Y9cKDPMl6wRqLCTqGibhUDeTANfBb4rE3QQQCCEW1FF0ENwG14YAEuURTeb6vwCVY9FOTuAiMkbntHxOdWNAG2Tb2ADWIY4k3r09J81Ej3L2a1ajeYJNDYlmWTcOg7E2HhdFLAA9DdogJUiYbAiIJNWjejAOjdOj+aFl4aBA8bWZa8bfirUtDtaALmRvaDrLIAFfTfAGgzfKdqvyMjxjYQOAAp64mXBQG7FHQG4wxIhwlNkBs2OhpKDIvJcwm7OYTbsbZaLKVrPPnZuUj0meAwYxCguKDZbPY2jtpObP-TObpfX-6KCEub3w2ubdZpDxrVOAW6sLxo+NH9hUOfcRFZbfD1AyI+-Ewa+Xh0QhzoFC14aFkALABnODjYegTjdmb3ercby0df1cNx2bAzYYxwzYYb4zb1Wnjdsr6BJ8bWzYLZtLaAQvzcMj0taObX4vnZpzcY45zYAG+XCAG0LfRb2ELubUtexMFttiZzzaA1H8Kib5D2SbWq28bmzd1BAAvYb9dHSbIHC5bjTbopw2r5bnAO5BdjeoRadb6WlDf1pdfl7rdWoSbv8Fx+uDdRTBytdj-bG1bnDcybuk0koRABOAuTfYo+TcKbxTcuUwQzKbFTbj2VTfHrNTekbIVK9buAwMmTTZabSC3abTWqV4XTZQbmfsY9INKJbzlF7RpaDTxzHvkoPTcumXze9bOYHpbIzbGbBOGnmkzbgj0zdFOJdHmbN7EWbejbVbKzftrZIesbZaPZbmrc5bsbYSLJwB5bqvyODyZfq2grZBbwrbBbqA0hbsC1X6MLa2R9zblb-5wVbOLbLR7ALTxhLdUT7zd8bnzb7bPzcNbE3vnrN2sOzvawLZQrYY4IrZQQxEPr44rdnbkrdhbWKcQmCLfsASLeYB4TbRbuUKVzLjYdb2LbNbyrYJhvJcnRczbV4aBBxAVLaujNLd3b8baGbFbcYbVbYdWLLcQebxf12GrZBj2zcg7PrdsAg7fvZxrdZrJ7bHbyA0nb7FCvbH6qubt7dyh97aa2C7cbTIMeXbv7b2zQO1Vb98qQ7KDx0j5yvnZ7rd1bJbbjbGHaw70nOMbjtbo73heibFFT2LupxwxMBZdLzkaiB+wDRYuzFltfNw0bK82e+A+0RA6e1HZdHAnJMncwAlrAoAjAAAA3NkIzgIS3lOFIgP8f+BRAPIBIEUkgyUAKBbOzfmOQDMgpAMIgZkAwA7OzcALCHZ2BQDMg3Fm5A7O4MhEALbroQKOg+gJ52bgKxAZwBYQKQKxAUMHZ3kAByA7O-fmGADhAOQEEBWIHKY-O1IA0gLYBhEAABFKRDuR1YAMJCkDygBgC6AfLsegHCAGAFrm26+QDIAagBhAUQBuQYIaeLOGC7oG4A4QG4AUgeQBhEnLu84C0BuQY9hBAVACHgCwgsgVtFuR2ACHgCECQI2wD4AW3WwgCkCdYCgAoYFzvY6MIA5dtyCQIlkCrAaABuQKRBpAdAC6AWEC2ANyC26umgzgeAAREsIlJID0A1wCkB9AG4DCIUQDoAaACQIlDAGAG4CWsPoDoAIICDIAwALdsImiAWACsQAYCsQWECwAaEAGAagC7oa1gpk2kCiAYRC26lDDDIdAADAG4C-d6EC263QACgagQGAYDECgWAAzgeQBJICyARAAUwMAFDAsgGcCwgYRBHVmcBSAW3U1wGZCwgW3XWIW3WcAIbtPdmcAMAYLQ4QCyCiAAwAWEViCDIHLv3d49gCgViB2mmZDi92wAsAKRDyACgA4QUQCHgC0A0SSBEaJdAB20dxboAGuCyAXQDhISntJII6sbd3QC26tIDMYMIAeLWUAegPdB9AFDBhAVtHoAIgS7TS1gegCgBBAWEAUAQ8DyAMICQIzfZbdnTsDASBEDd4RCcAWQDCIaxAMAVXvRdlDA3AD0AGAf8CygagCHMsET-OaxBpABgAUAAbuDIGMDQgSBG6ACkDoAMIn4ATgCDIervgZVYDJdtIAsgCICsQeAAWgFDCcAJJBhAC0AYYiyAsAMIBJIEZCdYUdAWQaxDQAf8BpASBE5dyBEGAAUAsgTAAzIFhyrAIIA5dhEAcgFDCWsdADHsO01SAXQCjoXdAecyBGdYYRBCgeQAoYUdAoYCHywgCWgsQSBEzgMIBhAWUAjq1iCfV+QBuQCgACgeQC266AB7oTrBLG+AA5dgUwsAVYCwADkDWIJJBB9iwh9AGcCygFgAsgNICHgfTg5d2wBSADkDIAIIDADk7CWsY9iDIFuC7odXs6d6ECYAWQADAZAAvdwYAzgCICrADkAMAFkAUACwiIAWUB7UCIB9AWkBhAeQBIADkAmWaAARAFkCWsSBFwgQZCHgKQCHgCyA5diIDIAViDUAaEDyAHLsWQVYAWEXTtuLIID-gBnvXAWADUAQ8B9AUQAsgXQAWEP3t9AJJA4QQZB9gVAA3AUQA4QWkADAKQA5dtICiACyBJIQZD-gIIA-d6xBigZMKnkTADoAKyAWQS1jQAMInyAAUAIgKQAWEUdD1CIIB9AEvtuRiwg1wQ8BSIFDAMAOLszILHszgcJDrACkBNa-8C2AViCcAWEBhE1YAWgZAAWgGcCWsKRCwgWUAhAMIls9iyAMAG4AUAYRC1NPoAsAFDCIAXdBuQPoC+d1YAWQFkBJIGuAzgFDADAaxA1wf8AzgWkBJIRADQACwj-gPoCwANICyAbIRhEi0CiAMIkzgMImHgByqHgFDC265ACdYCwjUAeQCoAS1hhAf8C6AC0CHgS1g5Dnb4GAQZA1wY9hM9z-tj9muCYAOfuGmXzuwAFDC7oVACI9v4ARABgA1wMIm6AZ4DCISLuDIHCBAcSPvS96gC6AWQAzIYRCjwG4DYDlgDQAFDCsQeZQSBS1gzIVADZCGuARAWECIAViBpAaECldjkAWgGZDNKWQBpAPoC+9tIBDAGuBEj33tI7O03HsHCA5d2ACjoQZCR9-8CwgAUDHgAUA4QdAC7oWUCcAUQBID6AAWgCkDYjjkDUD49iiACICHgLrvQACkAzgUdBJIZAAoYdAA5d+kgxQQZAzICICiAG4CcAD0AKj-AA4QaEC0gAodSAG-PnzXAfUAAYAcgFkBhEsImYAeQCdYdACwAa3voAQLthAVYCcj0QBLdmZAWgPyAWEUQDnzAUCwgKQAoYXQC0gAwB20eQBajw8Btdigf4AFkADAQZCRdiyCoAFgBN9m4AWgZpTxoeAAoYNyAzIH+DyAGZAsgagAUAVpAyj7EyjoY9ijoAwDoACwiwgJJDoABXtpAZoA-g+QDoAKscMAaxCoAGZAWQeAAUgW3W10SBHWIHLszgMfsWgPlSiAWUDQgfnt19wZCdYSBE1wXQCDIFgA4QMIloD6ABPd8Ec1wTLsZAf8BJIaECgDgwDJdrvvwAVIe6AMfsCgY9gWEBrsoYNIARAXQB9AYRAsgKRCjoaAAcgU2gfoiIBDjh0ctj23UWEHLvnzCkBJINIC26-seHgeECiAAUc4QWABR9iIBSICyBSIYRA4QNIA5d9AAGASIfFoCOHW9gUDoAUdCiAXdCwgeAACgaoeyAWEAGwTrARAcahZdsIl7UaoBBANICuj6gDy92UAoYWEAXjiIDwAHCCjICofWIKRDQgCwgzIZaTQgS1indtIAbADfsxD2UBSAfAAegX3H7GaxC2ADkC0gV7ssgIIBfDs7sRAJEf7AIICrAU2i2AHLuHgBgCRjgntSAJrUcgCIDoAeADYD3fuedhzvcT-8Dq9m4BuQCwgWEZrjht6uvcAM8jLKzQDwAU5E4AS1iWsb4AMAU0AgQXQCmgS+DCXARFBGxpbP8aeZZJ7JZRTgRFgl2LgNllG5B2nSVJTjWtigjpZMcVuCeqUATIj9RBgisAD+TwKeUcEKfUAWAB7l5yh6Km4gwg0dnrfOBXyUfSVMuvbDt1t6CQcN2jWARqeO1jusUQOkvuAIAA"));
var crossex_html=itg_decomp("DwEwlgbgBAxgNgQwM5ILwCIY3QPgFBSFSiSyIqoDkWA+gOYBOCADgBaVRgga2MusBaLADsAtrgJEpJaPGRpMMGswTCApnHSdui5ao1CYY3FKmTTpmWXk8lAFwQAjLV1s0Hjw8aj4LfosCOAK52dgD2wlAIDGAIAoiOGhgAwkFI4aJgAF5qUAAqrGBIUADiTGxaIAgOQgxhKGoAHnZgzALM9WAtERgxdKx2WnVwahjhYXAtzFpyFLoecGDCANbFCDAtEGouOiBqAGYIQZMA8sxqwl7iUBHwYDDLtmcXyV0AngAUalvCdgA0UEoADkImorpQ-pRwQBKCT+eEBMCiOhQdJvEYYMIqGDvABcAEYtAB3Lh2VgYABMAAY4QjLAB6YKhCI4KDmOmEQIhcKRaKxeJOJLoZKsVR0XIFXIANT5ThGxTK-DUIC0UCqNRgdQazVa7U63WEvTA-UGUGGo3Q40mrRm5AUtAWS1WOxSooYdiQ7jlTqQV1Vt0WDye52Erzsn2+F3+gJF0Q94MhMNpHIswCRKKQDBgGHVCFxSIQ4vpzGEdAA3I5kGoAGwAFj+YClACETgAlIlUgDSJToYQAggO+0CAMoAVVYAFFR3RBxPB32m33kn2AIrzvsATQAMnApfPkgANJsASQA6geALKDpB5QdbidEueiZhEjeDkrLEpwUengASrY3PJRyJasNwpABOOwt1EAAxZZHApAApOAt2EAYYHXAcAAUABFwNrGAShggArBAKSlKljxKZCAC0KTgIIsOHLcICCAB2AAOMAqLgZYmMQg8gVHKkiTyI8cJo09WGYYdf2YN4aKlIFqzyOBW2ItRRDsYiTlPFcwCwrJazoLDfzoas1BKfEiUcU8KI3Ycm1rWzGiCGAsmYWt+NYGiSnAsAaLyZg3I8uwaIPVtWC3N5j3FHDPMcI8qQQLIqTAFdT1bCAN1EadTwnfEV2PCcgQgGBcroEdawpLdTwvRogRwuhKqyZYggvPINypC8cIvGrlzeHqJwAVi3LI+1rMaJyyLdb0aE5iL7CkFtHABmY9lzoDa+y25cDLAPsOPK1tRBOOBEInVswCclyQvk3yN3A49RFYKkQF-Ptq2i8DVpAVaYCCEAsgvIJHFWxDhCm4aTjyZYIB6494eI487GO0Qt0E4bHGESK1GSfE3MG-bDrRk5llbOAYApIE3gQJKEFPcCgmPX9EOWGjiLYHLwPxEAcLS49ruc09XPchKDz7J6Xrej6vreJmYDeYafL8gLh2G4iEKpLYiKJKb2uSLiWYGRwSmGrITjQ1GCqBfiwne9sTjADiIGxkGN0y7LcqCMDIK3VbWFYGBDcaLdFtd09tcFm6RburIQAnKUKT5tKEH-KkYBwsIIC3ClzeguCEOQ6DSscYd8I3CX4eHWs9dWoS1CPFD8WQqmefKoE1IPGi4GxldkaF26xaJBA-KpMGQTByXnte97Pu+wnld8-yaPVzXqTKkpWAgEA-KyUfwL1rIJwNo3fxNs2LdEdS7YdoknZdmBfylN5HGSYaytEGAIF8i8f5F3udlAa-j-heGuocYriisvfZYNNJIwXHuDUcCFwJIH4k2ZeasmwrgPogyeq0doXmIifC8y4wh5FPCRBmw08FhE7MOWKllrJkzgZQqkNFRyRV3qOJ6yMiREInHYHqdAhF5BAKODq5keobmrEQjcQicIwFkThPs3Fz6o3ikCcKkVfIII3Jw1g3DeHHn4cQhRIiOriMkcomRciFFKJ6qo42GjmBAgQq2ZgNFhBwAnJXCmTFjyDRwseUOt5Jp5AnKtKUOEJy1gWktBax4aq3lWvEok0dnJHiBHkIKiFsZAipB7DWHCfH8UyX2IIDNeILWWPfHCrA4CNRXG8WaK5TEXjsI1Uc+ILxvHxGAHKx5wlwFEBuVq7DFFZCBBSDcRIgTJEYdAoCVJqytj8sREAp58S9xxohVs-MBmexyqOasy9SJ6WrIRbeu9wL7z8vfYiVMLy5UaDlYup4aKsDGSuTpogJxUiBGAfEXy8i9NqjBVgRDenTInINICtYaLcSgdZZZKlwaePoj7EWE4EJAnxLZKUgMJylOHIhcpQRfLVORsNDqixAJwBQpQ9mZimn4gcsCmGo4ZqnkCRzC8VIYaFEkatGiCy6BXJ3nvA+MDS5+TeBQ8C7M8hpTAbFCVNy7mHzJnAHCK58RNlfhSGizBTY8OPOTHeyQmy-g9gxY8wSiSIQYXQX+pzRDgVfmw-iJrKHCFXofRwX9iYcSYaJYS1ZhxfnjnKtQeRjKmTZhzZgeRwoTgANT2saApEoMjTbLHFatVsMEQDCBXKBU8BSGZM34o80QUpDElClMsaO8dE7J3iia4QBSinERKROMpiUKlVOWIkmlqkBmqUZXBDmgjWXstYJy7lvLiL8sFWAYVoq1WFuLaW6sIAKQNMcMRFVi1BrDhEicZIVIGqFXmlnOZxEwhvEBSJIEWQwj8LFTAbdJay1t1EO9EAQc60YPIoDA5GUsrHLoKOLekrbnSvtSEsOO1OwFS+ZijVCBkjLDAGNeNrNmXMCQAgRyrak58y5oWk1FJaxPS7YYutzbrrkfbcwTt3bTzFNHCSslg7KmnipbUk49TGm6paXkNpULOk4W6b0-pgzhmjPGTRSZ0zZnzK3UW39e6D292Peu09YCL1XpvSuO9H6gSPufWAV977P1aZ3X+iCAHfxAfKs2OihKU7pSORVWD1ypX3KQ6HRadA0PArAgxLDOG1EFNbN3AVogQRFL9XpJ6zs8NGRMskD1D1qyjnIo0LCB0OL+3QjbMm0lv1ZSMMsDNOFGgjzHhPMIU9VnrM2ds7GrYmyBs7jVsqwgLwNazfllcsFhAlZJtfU6ohGjMCwrBeCSE4AnGvtleiI7hBNja4WsqB6yr3p6k2UZi1upvCpAC4icAop5GPPXEogiRP1t6denqELnkrmGtM4CHtRxlfBkRkjcact5ZzdWCbMEpulf9rtsGtXDuZ2YDi6m+KgEJxgj7ci0aPXuXjbl7NMi1lSiyBudFT8PEIVrA1okn8TpnQuupAn+FLboSsnAXe6b7VEnpGoX8TYMN2E51a3uogVz0cFoZYabFOzDTgPOCcIAqQ+JXFKVsYRVp2CNatRmnDWy3mIhSOwMEACOp5qzEdbGmikqiYKFmrBSUQw4whZCJGEJsG4sr0lN0SU7WEJxhHZsODiK4SjMAZSuNQxF8YMEQjRRCW0gisE7KOBgK4irDWPFSRCQQ6A4WIlKEUdBlidmIq2JAw5OwrnJqb4cyxlgOGPAwCkjh6TEWGkgLcJxga-VWkEVa+xTzsX2K2YQx5lQnEEu64Q+xhC1g4tm0cME612DyFhFKGfZMMWYEk2qA4A77DYqwUcB5howT7GxfSyQsJqFansfE81lgUk1DRJAYR7ZqCBG5JAWQ3hqCwhMVYFWmYAHGZjoC6FYCBGWCbDYjeD7GPEQipFXBOA3BXDoH2BOAvCnAnAvEQkaHpA4ilC4jeAnGEFHFED7CyEaCezBhKBAEBnpGEFNwPBKDUClDTWImWHQOrAYF0koIzwKFNybCwiHEcDCFk3pGPESCYMcBzzeFggnED1rFWgoTgFNwvBZnpDoCbApAvA4nxkDh8TeAUOEBQFbGrEWGbQ3AQGPGPBgiyCwiCC3Df22VHC-1PGYAgFrFbF-BOFrD7DyCJF-CQEQmSDCDTTeCQClAPEaBXEQEaFHDTUcDAApAgAnAPEcC3AWXAk7GPC3CJCQCbAgD7F-DCAmzCApDeFHDABgl-A4jgGHGYGGhXDTVHHpHxBokcHdBgCpBKDCHpA3A4lYBKH7z7AnAgHGjABwiwhgEaB3nrQgHWnQKwlPEcFN3pBKDwMaBwggDoBgjeGSA3HpEzghjUBgCbBwlrGSDYnpFbACPkiJA4gnGKL7BoiJEqnlzeBKAUKyB8WHClC6GIl-GEAQDyA+iwmrHAipFEB8O3kCSyFYC7WrHpEaEsOEHPiexKCCAYCpH2BjzAFN1rDeBXAPBg1bFWkLwQFWnWGHAPH2GrAPFrBlAnGSDwLgAWXxFrHpN-APFYEqUCPMgylDGSBgC3CAyQCpAmA-iQF-ApBKEaGWGGmZhACJBog4jXwPHlPxG7mmOKI1nxFPDABAipF-FHDsGrypBXFvxwgPCJBwjNPmhOA7DyCBCBF-HagwIwmPF9xwiBHpC+iJCwiQGYEQhgk7A3EmOPEWibD6OGjQg+LAXpFWgvDoBXGHFWhTNGTsDVIiQvAvBOEcCwnxBhI3BojUFbE7Boj6MmhT3mQgBBCBClAvAYFbB4ylEcBnHAiwgvA3DAEaAnHNwQBgjWJpL7CJDeGYEaDgFyJgBDNN2GilBAB3hjybAvB8LoDyGSDoDTWYmHDoGBWrD7Bgi9zTjsDUBomdKyGIm0iQFRMzAQBolO1FLyBSmIWGgPAgA4iJBryCGHEcEnBgGQCwn2GmTgBFh1JXHaIvClB-gDyCApDYnAHpF-HAmIiwgYGYyD0cBwmrEb3gKlEaBAHvH2CpAQoPGiQtOIg9XpAgH-zw1rGEBjwnCQAvFN0CK3AvFPD9WWHpBglHEhlWk7DTROAXGaJ6TUDeF-DgGGj7ClF-E7E7AQDUHzOWGPzeHml3LoApH3hgCnJLA6iqLUDUD1k1AgFYEk0cBgCnEfwYBomWDiPiPXJMWSHTWMjK1sJMmIgPBwjyAgGsmEM7AwQPGYnxHWCpCyFcrQwYFjXpCJGGhAA-2GnxApHxFNx1VN3Xz7GWGShgiQDeBPFYA4iBEQmfWrBKG3OSDVOpDeDoFN0XyBAvHpAV1bDoEaAvEpj3GIibGYDsBABgETzgEaFBJPNYL92GiJFN3SnSMaAmpAD7BgE7DjT7CQDaqbGZnFKkmyTADyH2CyDyFCIHEQibDTVWiQBgDTVPE+iJCJBTKr1aAmlbGPDaWeoQEZFbH0Mb1jSur7AQHRCbAQBwhwiCDyCCBOFHGPCQGGuEDeiyDoCJDYgwjoAYQQE7wYDZXxF-DjRogYCIS1LQmWB2iwjgCbEjmSAyj4jyF2y3FHEkjoGXGGmNOj1bHP2NHrk7DsGPAPDyE0mGk7GRDUApGSEQlHGHAnBohACQA3AvCyClGrA4jTSpClFIoHGIn1TCFFH2E7AeF-HT1PAQBypgmrFYAPBelHFpopiCEQg4lrEaFNzTRGCBEhj7DIreDADAADIvBNroGUznNIRXAYClAnBYCxEQlN3DrgDaX2EaGSE7CmtEFEGWHDoYFJtvAliQHxEURj1t1XH2DoApWPD7DeCgNrFqRgiUMAibHzSbAujYkcBAFNzCGNKBBHL7HxDoBjwQD7BaFEGEHOFPBvCJAoI3FWrsEQjADTXDAPCpGYFQVEEAPpCPHxGWGVTKggGGgpEhn2A4jYiJFrCyFWjeBwmKs+TeHpGHAYDoGYBKHXGJRglhmHCCAm2SGSGTBTGAEZG5BZBTCIHZA5C5GZF5BiDiASCFFjFLFyD7EaCKCgAwqxDUHdDADUCQFVFzFqHqCQCaCmD1CQC6DAB6HQD6AGCGAmAtCtCmFtBsHmG9BWBQe0AwCgaKC9EcEWFob9EIADHuEeEUGeFDHeC+B+GjEoEYd9BEFEAhChDEcoFhF8B-ssHTFRCzBzGqDzALCLBLHLErEwbrAbGbDbA7G7F7HnBHHHCnBnAHDnEHEXGXDXHnG3F3H3CPDPEvGvFvAHHvEfD7GfFfEHBgg4lEG-D-AAiAhAl9igmWyLhQitgwkwlwnwkIioXIkomojgDogYiYhYnYiNi-D4lJUEmElEnEkkmklknuiUhUjUg0i0h0j0gMmy1MnMlDQJUKUcmFlFg8i8lJRVhXiCjujCgiiikgTUHikyVjJSjSkgy9jygKiKhKk-mnCqhqjqgaiahajag6i6h6j6myKLqGlGnGkmmPhmjmniWWmIjWm2l2h2m2mDVJnOkukHljjFiJyllnllm+j7wBiBhBjBghihhhjhgRiRhRjRgxiBCxhxlYDxgJkVgvFudmzJgpiphpjpjGcZmZkIyTS+XdV5gOQySHg6cHVeZlnnnlkXm6bVg1i1h1hgiPhIUNjUQvnNjZ2tnxFtlJXtn-HvmdldmGyxSg29jCfKyDhDhQwjijkefaeYFYx8zTlbAzizhzjzhmgidWxLldnLlrErj7Grlrn9gbibi3BbkpggnxA7i7h7j7gHhjileWDGVTnTkzmzjhzNdECJFBnBkhgpHUlzilCQEkm6xxhmmPnahD0ZbsFNmZZ2z20R23kzgdfladaVfzlVeLmSw1cPlwVaynl1b1iGegRYQUjYV+eQQgjQVJQwVVlXmwSzfrj20IWIQNj7HIUoXORoVa3oUWWYVgSLYQQ4S4RKDNT4QEXMVESsTyCUWyRORlosUUWUScXUWRy0QGd0UKQMSMWjJMRHeETHYkQnerCndkThvsXnfDaXfcU8W8V8QijgACSCWQzCVmkiWiUiRWnxAWnXNmj7FSUWnSUHiyRyVDPyUKS417R437VJXJWHQWhXABWBgBVUmWFqkKyBC2Jk0QlGXPTiRwh9dPA3FrCBB5UaECiBFEECiST7K7bDRWTWTQq6x2VbD2QOQ9gFZOTOQZj-Tgyw3uTSQvBKERR6hXGOZXGWnyiEUeRaapAI-ymOYfC4thVU2WBFSpp8mdVDVRTyHRTSaxQHNxXR282JQg74wlgpRyfWz6g9jGUrsZSlGUw6UalbGWDhf6UClHFGjyDgl0holOh5TZaewu1ildW849VsgQW9VC79XLhsiDRZnh32ypjjfihwgQnmIeHxB-kHd4QnDUTi9jaO1DNg6BBXHKnAlEAZmnP4hxVWnQNbApBghNQOkGmSBqOmxDSWXDUjTgFx3-1BwTSIxTQPG50ayJ2rDzQLW013Q9krXRZrQ8wbSbRbQTgow7WA57T7QHRM+g9EAs7w7Jypps7s5k0c+c4CiAnc884+R8+PD8-+V6Ucx033UPQMyIV2fPXvlMzxXMzfTCDZbyFd0vTsw-VIXu93X-UA2A08zAx80megwC3g01XSWCVC1Q3Qyi0BilVi3wxMkxc5hIzIyW7Yy+Wo2p3oyBEYwW5YwJ8ow4xA+414yg8ExHWIkK-g+yV4mQ+pjQ8agw4cik5E1w-w8I5CRI7I-uxmSRRqyc10ye5PVe5M2vU+4anfV+-+6vTmXs2B-G6l7B7cwh9A28wgz82nDh+48PhCxQ3C1R8wwx9wxZni0S3WxSy4zSwl0Fi4ix6wkJ3y0K0Ita-K1ZaBCq2YEGzq1p3p1OnJhNZRfphm9hyByTWHFbF8TD+GfFibH6cila6wgDlfArTsoPHQMkmGlydKujIVuIj-JAEXAHCbE7EY6T-4q7qlGIjTX0MKMQnGOYAPHYOHqwnYpOHNyRLTQPHAnFrXFVKHyZLYjYkQl3qbBuoKNDBOCeziImhXH2D1VYFEEQiJDUDnH2A6hKiJERNYpnGgN-EGgRXuFYB0hgGHCBHAgPCCE7DADMi3EcAEqIVbDeCJBzX2ClBZjEVpinYfYMOBrArgEKDAd0p2BdpwB8Qo4PsAhC3DFQGAUhBgMwGSBZAggHEDOMHAQBKEsgTYcCCuF-CbFhwbEU3GxAPC-gaI1YVQhuGGjMBzcxNc9EEFrBh5dixEaiHnTUDdJj04EKUADBKD0FL0OkfRCADWw5U40YARmGoBhIIB9gbwUEjgSwjEROwjgE4OBDyB2A00+eMAMRAYCsBYojMRqlSBggTUSSq0XQn+V-ATgSgaaVasRC3DDgaIjVcqiUHpBWkpsywRCHxxoie80CWUQKKIGGgYRt+fYA-sOA3C-gYIWEDcIUEQjEQIARIOkoXQeC1ILwRIfEBODYj7BlwxVa6DhFwb7BRAWcJCpkTeBCVJywgVaHADCBZ5kgdgMkjpDsBVU1cewY8HkFKarwSg3-UoWmibDWVmAJwRyKbhogcx6CIVe2JsQTjZ4-aSAIEGqVGSLDkgFEKUIxVr7fAu6C1GAFeHn5qBlgIAZcFgDsDLBaWhxYQI0E7CZE+wotJABOGYBsQgQSABcE1g+Jbgmw1YQsG+AWoHkh6nSa0s1F6iiBXKGsarhNFrCdgiQrVW9pgQHAnBl+aaCaDBAzJZw+wOELcEEGWALomwB4OwH2DTTLhOw76ToYnVSStgJaVIcdCuFrATgcIDAROgulWEjoVwsmOwBOBmTb18Bt4fYDAClCdh+UDhN4PuUipgAGUbEe7KxSbAgB8Qw4CAY0HAiIReiogXknACQCMdMqWECAJ2CPpZ4-SS2IIDhHbqS0OIo4f5FhDsDRCGAksaIduAQAnAQBVRCcHkE7BsRBEBWPsLwJAAjpiUywNQH2HYpUgmwE4GCLWFNwKFkYHEfoAgBXT4RxCgtIEOTiwgQEK+DAQ4nnBAQZR6QtYVgNWCCB9h9C+IekIDSbBWR8QEhZgPiDeBQiPQ1YasX2AMFsAMBOpGAE7AODml8QDAMYZeAbq-gYA5ggHOUTyRIAcElw2fDiDeBsRUKw0aoluBxD8djweQ4aBETCBsQmw5Y9qMfUQgyIYqrYJgA4KbD0hyySAPmNFFaIcRTwJQXVBOFqRposItxCcDsV0HCAcIaaekBSFPDJB-8cVVgInjoAcQGAluDiAgCtIjIjIo4V3CmVrDdU3xogIWs2mHJgBgIcAekKV2hGnhRAbEWsMODfGEEyeQNIkIbBb70hDxkUPIP0jPpNh9gmxfEHYGrAZw00wgPsJlCyAzJvsH-KUJJQkR0ARgZrUcPsFNz6pviAZRoBUkFxIBeRRYmCGAGSCOBaw+wcCBeQ1gcRfwdgUAatGdghoUY7tPsCcBtorgsJjQGAI4HAgwQpQvwb0YQQKwMA4AZRYiAdClCoCi6YQUcKEQ-BRFWAFsHMZUKJBMUKQs1RtHABxj-lkgzJMIDACJAwQIA1YX8ECCbBgB5JwgNiHAEhowFBMVfOABeBoj4gX64EUaAwE7B1gsIg3PmqkmSCiBQaHMDiMOHtpYQkRHJVTBoApCgphoTYKUCwRJBWYkAddWsL+EVKvIxaMENiNuA4g4Rhw3U+kIrWHCngrq+wUcECFbE5Q9Yx4SWogKVzDhkgcAnCOlFGlsQigTWJIa2C3BIBWAFIcUPyUvLVhKCd4xCFKCvzVghkYQNQKeAQYwRooB4DvsEWYDwQIA3-MMel1YBhBuSUSc4lA1Wjk52CJwVakCAQAsB34PVNQCjADKsVAIrAOEXFSyD+M58fYHfhAGIj0hWyyQfZLgxogNl9gi2YqhSBwgUhvsH8ekGEEaAuCggaaRCFhCBA5ihOrFU3K2AODDRhwfpN4GEBDQmTj2Zw2JDlToAlBSSHtUfBSHVgjRHA6aQgofXxBuFEIp4HCKbmSCrUlylxNQLYRgDPENC+9IINWEcIrgkAZMYaNEHMw4QEEaafYHkFbAEzyiR5OwCuFDJzjTw9Q+msRCQDVh3atXDyNWH7D7BfwJQXnBnDTyWxIiGcIMT3iyArhWw5klmRxA4h91CSvEOgCcAQCW4mwxaOXPiBiI-kwgJQJAKOBjoUgJwHEWZM4QfAbg6AO4P2TRBgA8TmZFIGgWxCpBkgsgq1EqBSF-7DTVosQyglkBoi5CDyEALjPsCrkLglECNTKrGTeBYRbGNfPZG5wnCYU-xdAVABgFkY-0P6TIHkPvPfpHyIgUQYBgKESBwBXQYoXIFAAvDRBVg9ILCE3V+DFA4G5wRBsg1QYqN0G2obBh0FwYGgjQJoEhhiEtAf5rQ0wQgLMHtD2AaGzoehugEfmYVPQjoNhmI39DCA7gQYHhiGDDARhBGAISgKgtWAJhJGRgcRjIz-pyM0wyIRRtmHQC5h8wZXdRqWArBVgdGjYFsO2C7A9h+wg4ExpOGnCDhFE84GOpuCsa6DiIMERwIOC5rgc1cGuOgCABlAf9GgFCDXGmldjG4aICAYCDBG-i-gpSx4KUMOAYhEhRAVZP8FeLtaNBGgB4Y8NWHjxmSOYTYNMniXSjUQ8x62DiMsEwmwkNwwtUQF3l2zNpTRU1O1pLOPCkcJwHyJAE9iLSLBTcsi3rJ2DCDNhkaZFemckApCuTVoNuYQFKHCBShRwu2WYsICMhsRMyJwfYOcWYAnFwINS4QFsDDExJECr8sCKoPpAXgACq0eWhAAQDPh1BmEoIFkDsA1z0YX48CPsAoqNB-WJQCxdkmmgcQK4qHVaGxApAux6ElsDaRODKLVhZE9cLIKOBABjg4AqeBZB3wLELVlgE4EvNvxhjHhGJ3U6aDBHAjCADwq0BqGmi3CAzR44McmhOE7BqAAo66O8XAFrAQBvwzAQfKHACgYjFIq0IkA7PdzWilCEAkoI4FQ5IAbs5UGCFBSBC-D9gSxNiG+OHDRADwDALCFKFCFz5yVv4O-BOECRyI7IqTZfK7DTQcR9gPiCPKwRLQ0Q00puGCMkEaBqBmZTBaGH2T5z0h9ggMRoLWDXym5zFyQNQFuASlPo5ZpK6sA4M7C-hGs4EJEd8WWBZA-lw4c9MwBAE3gg4v4BAE2HuIEQ00MAekN0kQh5BhAYAIIBADCDVhsu5zbcicDYijIFCHME4EEEHKZTVxv4WsNsjsDgwBkfyOtMOEbB9hFgrYIIPsGwmiBDSXfasP-zzEcQA4i1AOu1PfSS0EA34ZIMRHZn84g4xGcCFZl-isBTctsVgLWAYA4RPwOCFcHkCxgHgwgiddOVuGLQN0mhvgxCKwCwgUiNCYQZIBACcj0hZov4QkiOFNwwB2KM4G4r9GcHHgOS6NWIl8p3BiwYIiBbAk7mSjER11vEACcCWNBIBOwqQchMuFq6EUTgW4YjizMrKIQIAW5QCIbGVWP8bazhMAI4CJCER1qWQA8DlCszCBRoiEVqQwUaxZBkhgkxwHYGn40CkJc4fYmR2ThbgX+mYZIGmi7G8FmS4RA8GbmGUYDRAbwZYN2UMjmRjcdlP0b9L3ALIYIZwNNKR286OBCRSARRPIoDoLJsBOcLIKbgshwBmAu2DPGoE7CNB5F9NburkMKVAhBJ1JNyODJXl9K6ic4YcDACwjCAwq+wQyAvjbxFUDwAUdQE0QAK4kEAAEfyRDRXDWpHhd+bAfQjr5WpD+bENaCZNrALCmwra8OQQQTgoS00ywYSIHSyI6jCi9ICcJbiUim5-4JaOwI0AVoma0ZfecRKeEEnR4PkrpYcu2uIpth5oRy5gO1PAgMieyYiRwEdCNpKiIAB4ScTBBiBIAncRIfySUH2BppfwcyNKMIHfVwAlYIAZgB7AhTA1holcGSmoBbAlDUml1E4MeCwjBjeSYQfhRLG7yGj21CtYOv5VWiGbIilQsAMXxggHCpQMEOIoMQgDnofBfYYcMbkRpD4iEB9ZIKtBvpSheY3NNgQeDlx+kqqIGmKUWt8J2BoVeQFEurjoDYdDwcuXpRADS2sE5Bp4Lgi+NmocRZFp4CkHLgYIEyZQheemXVH9lsoEC9mrcOVo+GNali4EbOKGIzpvBAYWQfYBuAYBzh+iTuMIKZKfTh1TcnYVpWoCrzmKiQIAUQGPNQm7ZokL0cysNAxF0BWKP67JJ2EJXLM6APUEOXVyK6jgDVlYBgJeOgiOAspRaLSFKGYBjSZ61qvIMRA4ith-FxCHaFXLoT9k4Vp4O-rRNmgRbOw34efr+DfHr0OtbEGiJzXogqBTw7eGnMWUXAfD5JbES2AdSlBgQrM+MD+CYW7xM6nsWNbXGuLgC0Z3QmytNB-DIjdTAam4IPFYoKjJB0aig6jQwFYnZ4AKHEZbVzqS394BUx6+kHWkujHhWw0JY0p+LYjDRhoac8YR+GD0wAv8JQLmggGDKGlGgJEFvMsGED0hqxTYKvOySykMAQAQES5bYW4hLAMiO0WNEqRghhBjgEyivvSFwrgRh8brDWY3O5qhFWwJaC8ILgAn24GA1XAjhJD5JikdC2UokGHOGild+iVICkNEDxRnAKQq0D8WatWijgtwvJYQPgVUwIbhA2XMwV8OYmm4IDhs7pC8jR3IJiIG4KPeBBzjtU8iKgEiOBNNxUh0ud0jCggB0XJllI3wE1GxE1ll5awi9YiMSQvCYFqwN4amPgbeAuLGOzAcAKsVbmdgtwrYNOECgjZShkyOK4QHkHAj0gkAHEEoCwaCAHhDNX4FcOlUzgiwKQgkpEtWRADV5zobwEAAwC7xZBz0UEYcEZMimfCSIc48ejeFgIXAiSo4U3LlErG6H9gTxVgK2AQJkJHAG4IstuEQiLZhoJefSOvqr04z+RxaFeVSGW2-gItSEuyLMrYiYzgYIlR-eYwQL7AmoMACJMVlinC61Aq0JzrxAYCjhOwgMoEG+L2ppoggEmsTUED6nDMTgtExwB2Vg5hESgLfEoIzD3UsVRA+JdtUarsBjyqQrYVYS7lpq9DRAL84QMIDeCIQSgdgMjiRjUDMAVwxVW0lSFYAX5Tc94RoMeGHAWkwx04IKnrEaDEQmslhJAKtAgAnAVwsdACM-HxDgQEAucB0QpqONpz+cXjXCJjIgArgLwAuUkroSQoQAFJi9Isf-1eRIAmtY8gfFvH8lx7iIFCQTEHqahxJEIT6BaCRlbFfL0qfOOANLQFxEg9w9y-yvvFEDc6iCtgiNpUd-AEIuuTtcQhfiDwwUwAJwXgTHj7CdhVoOK5YBYaWJQlrcW8AiPNQkmPi7tfdU3IGnpDKRFJ-efE17UJLPUk5J4Y6seC34cR5SoMEIZMQIK0VGgDABgCUDnLIBfuywOsUFD3owBRwMAMIHUUQh2ArDzAZXS8XZX+6HYNZWKO8ZVUPAaiZy03IHShIAwNIGS0oWxCZhUzeh7MYaDxidS9GB+mNRkO1VKNvBCV9wp+LmNECnhhwRIU8MsBipa5aww0foq6peJ0AEIYQfcuuoEFLEcqYAcmONGEBhB6oN9MnGy3lYwR4ob4kAKMaQCiAiB3wLUhxHpCIDlwKa28N2X2C0SKKv0LUlkFUk0RriBmg8IJOYj+ssIhkBWuBGPLDQOictUIT7FUjoaKQUJPjVZjAitSezrAN4HYBylMS5I5K2ZeTmcLDNd+OKyg3KKJALVCTagHlcIA4ifIeVJlY8E2EXDHVKjpVDiGEDsidh8QNYcCJTHrjqjTcdgRjkUVzHLarStmPnUtRsZbg7tyQUtLWD6IZ0kplW7PtMj1TVADw1FZXc7FHCpAGA7EH7m8ApH3ZJI1YaddqTlWoTWwUe3utKybSinKxbEYcMRGrBcYKQH+U42ACOVbwmzpXaaKOEBrUTqgp4MKNpDUC0s00F+d6MqndzPH5YwWpAHJOeMnB81pKiCEztDHtR6jXTJ+OOTCBVInUMAKPQTFe2gUvICGqUJkuyqGjwgEAP0ggHQKsAmwQEeuBWSLTDRVkfYD4duHSBmETgMAXeCcHn5nRmAdkA8AeH9hS7SeaomiKDBkpShTw5KxiGEZ36hC00G4RQ7dROKW6mwbJNI8NGSAX0Cpvcigo5xRx4WVEG4O2SfkBIF86BYGrCIhBAAFUjUackAMhAvBRTuzyUcGuqTTQHA40AKbBHYXTIeKNwgxooyiRHDLAmBBB+PFuAQCy4S6p4CABJIAlZBTwPZcpaEWAvzgxwUoNsHLiOJ2E95tChEIfK-rCBWQdIIG-CAAY8hCAsoK+WA1FAQMoAh+34LAzqBfyWgP8wgGg01AYMsGuoIBXgwIZENTQ5oMYFAoobWA5gDoRBXQ1cDoAUbHoZhqw3IVYKOGOCwMNwywC8NCFAjKMCQsZuiMqFEjJMCfLkbEAFGmYJhSwrUZqBiwHCrRjWHrA8L9G-CoxkIrHAiKCjwSecIcSkWDgACtYfsvOFLFV8gIljLcCUE96ok4rq8q1MRGHAwREIxKhcC4vMZbRbGr8wcMuCPIDh19g4M4AUaum+NVoopY4NXPnCWRY9001wZJgDH7gBwF+J6gOE+sWMBwq8jXAuFXnjErGMAivFncVxWNhwd28xqnZzs7QBwp0wmtX1nBWNthmEHGeuBrvZVb6A4disuFXAm35wbFdEena7uDhUy84XVCzHxKOMTw54K8AuA3AK4Bwp4RCCuCds1EgiVjGaYE3-CARgIoECCOE0LhqtomDdhphZGgTNMHINrO6J00nWYJAowUMWBn0GaMIRmiUMZqlBkEzNiopUcqAsxrhUgUMBkXsFcyOgIt7mV0M+88wejEs54csH6H9C+bAwPWfzY+NDFhjwxgkwLVGLNjBYQtcY+MQmHC2TFhArmAD0mJH2Ra0wY+TMFmImk5jYseYPmWKAQ8uaMPNoG0UBx5GSiXdb4XLB+Ly3dhG9scfsajN50jJgI9WMUQkQdEIeMPGs7D7zmTA9QMxvMREdh9WmISA4PEQjtFJEaL6FIIoNGGnK8GubMOcIdOYh0i2phkO0W1af+9tEBxUOZISfDcISOIh05U+ozO+8mOYCZCuANEAe6eCUXq4PcMAD5GoFtqjhCKq0X8L3tWgHg2IEAQJK0OrDV510Zw6+Hrtjop4GAYR1EoLjoB+PvpfYYKDmtzlYRkBG4YiPsGVjEREI6NKkFJAYTog6jDEK4aMRcFH6OIItfEMeEm1poEADSBhOPTCe9gxwdgLeMRhDLxw+9Oi8Y+xE9bb8AMKF1QxYfxBZA2IxEZYwQX2CpJM1QTl1Y4S3ADD1xiEUgfSB9ym4O5XJIqsxNWH4GmBvFBAOBHKoIBEIcsikGmhKAIA0MK4EqHkFNyIQKyH4ruaN2zgnAsIRircPsBgjtg1tthF+FSEbr4gEqOEXeDREXFeHOwD6yga8-AgXg-RDhOgJOS6Lt0PlDABCCJUDqUG3gaaZgDBD47JyiQ3YHxPZK4qsjG0P0YaHMu+PdTwwfMiRNHmu4guG4vqv1MoYPCJVca4xjKBeAiCgU6A89ucb4n0gOQwgC0X1RhQoh7pIjJQOE1SGxfw1XcIANNFoPCh5BDXztuAJxq3DtS4XN4k4HQHAiKpW8GkA8FUoAGkEUpiwVvJ3BKClhuwMxStGpUKka45F9IPIJemeTO2YIa+PqdE-w5ZB30vQ+3BxDyA4QTgAZZgCcjv7jkVdAJHcOCb+QRAyQMB+KUQTABVl-9JQLcFhEXwXRnHjQDuvsdPAMB6u44ewvSRPJwAHj1Z81-LDlswQ4IbEYZjRFimX5wZlp-xUPl6GOAqxh+tlD-1eRbH1jvzId3kkiMXhWwpuCOYxLTkvEgg3c-QhuDJQ8JiCVZXylU6WAEbwIQe86IuXUF8iTa7kODRcWrDDRE8fS+2EBlwzDRfw6FRoVSGIQL5JgH4jrbNQnyp5CgR9PsCUCWqm5IU5ytisvNPA2Hn4Bwk84StlEgBHAjgCAGmhLKimcyG4ZYMRCyCjFawOEDfv9D0I3W-Hsx03PHBgg0R6QASxoNRKaiiQZJRgVgG6PxARpE4EW0SYIjCBpHwIHET-eeT7c6QzC5Kl+WuQ-6jgggNCPIDvxouwwye-kvsK9D7W-O+xqCKPb3PAhbggQx4fRRHgtUIblxvRSaMeA4idh5S1FRVcsEjQHKOIJwNrFxGEDEVOE4WORXrGrCcSEAjqYjuU4HCPDCB16RaCZWW2eO2sMABF9xTn087k3KOdtUJdrBHl8QFVRcPAEQh6ThAcuYQGUHtypVOkL8BaEoPdCk4LguFZwRqtihfI8knhOvKbjKKXDnHrYVsI4GXNNhGgQtRwINDUD9g00OEDcLKPiJBBoG5xgMYDMrKUFAiOQb41JTJT8UNwE4YiAukXxQ0OIriV0Z+LDgcRVLxoCFxxCzS4VhVOEaxcsG49IAHst4OvQUTA06tEKy5UUy4vWM04KLF4FQOMdlL4i88wxk6u6oIK0CwaGG+abJH4qaHGiQyjNEQIgAUgq6o4V8cOHnww08gZXdaOQN8nCCYp+IHcG8FrBUQ7ahH85RxBoThESNDADiHDQOV1RfB48Uy8sFevGhoJaaPeiABODgnODRIOAHhXxBsy8M-CHPK4JXqEim360Eo8VfrhPEhdgM8qr+AXISCBUA+VgLiTzyiBMlB9TnKLXiX0kKQB4OsXADKx0atB4m5KXIvUhd4cX6NKErwQWgDCeaIY4aEBE4LvtkgJweeytSpDD9v3jQVgDykuKdIBR+wbEcqjeAXj2XneOgBTCbB1Gd4G02rk24LIMDmAvhEoH2IYSZYLgK3+JbWHApAg9p3rTsE6npGYyokWamlAPLazF2OI45Fauhc0MwQSg1YU3F1ESHzIfCI-I-XPiyAb0E4p4DiFd8ujsH8SjqFNGxEXER46DJhLkhlFnqOAKEjWPegYTTTVgEEIiakDhAtwnIl+JiYcMR+TmiAVUSANNEHXGJBlN6pKUUiytrCy4DlDn3AipRBVAgLSbBFq4hD+cThKVSsaTZJSDqj8IYRooEGYA86RgQ8Q3MOgCPAGARDS8QU0BfHIg6uNmAXw7pGADitDqCyipBJKPIWdh8lYQAvo-VRcQvBTIFZwMIggeKVshaJV8ypBz0ASDUAr8LtXZ9IjfED9lkgdUnSg66ScWYA-ZcRA9U4cDNA7MXYW6kEkRMSHUyJyzI3S6dGgYZQ692qR-RgA+yb9DOgTgIECUp8QHeiOFE4FQy4ESgUQEXF5kZOTYgAIR+V6JjHNHVNxNIcck+FsqCkGIg8IHnRQgVCVCDLRaJcsiNswgGiDII4LAOWIpZKGiG602IZgFyhfpYQGNpGYeLVWggaVcCToggADCg0ftDOGDEiQNgCX5iINQW84nqMACvFw5Avj9xDDJWFNI7AX8ChJiuWKUfoYII1BSgHpDt1SQLSAvhetAUI+lFNKEX5x3Jy5NYkYEdKSQw2Mu6IIGOAByJ9AbxgCCABgJGZFOjYgFSRuDsBhoUQEG5EIBSQXJnFJagPAHZTcFed7hcLHHwBlOQ0-ILwN0weEZRH-g3cPhIEH+RWwUSi3BOaV+AXVCaX432AQARoAYD03OwCpAQyd1HikfYHK0JoV6H9RJI5VKcSyAYvbJA7k+lY41+dLcUonpBOwBgGIhI-QIg9xGIQlFCAhqZUiFUjgOsDFEaUBz3AMoSMfSaEtwfvTTQWXT1VKpX5J2zR1WAcCCkMmzazxPgGAVHztcbiNQFyJIXRwC91CTdAKwgcaCTW6DS6FMmGJ9gcchSIPcZ5CmQqlVcSNU5VEl3Td5JAMjr0-IDiHxBfgdyDZYqlGXDfQtzRST6Q6ANI2EFLDGyBOD9gdAU99SVB4yG1AjZMgYBZqekBxJ2pHD3k9HAN6UACoPVZFNUOYXrGmNwiZgDTRRAHenAhKBA1yIIwjTyAvFOwT3ws5lgAh2CVipOjShlO9byhrgFhD7wiQDoasG0pQad3SP0bTKcHyU40Y8EvcSzRfzgBBdYCxKAH+X6AREX6PCisggZNMlBgsgB6U1kggEiFDFQxGXDyBZcIZEOEUYHzVHhaYTYzTR10csR8gpQIkBbVnFTOl6tEBYaH+R2qQQznUvwSpCaxxQxVX7h9AifV-Amic0k7BxlRoG+M2yEAEbkmweMkWFxpPiCgFG0ZIFDcgpYqW4oJ2Jcglp7JE6hoFRtfVGTxRACADkNzMRyVVUcVVsPntj0YkTMELwLcGRoKfYcCCJIcQ+itVXRIYleADqDCkaA2IEpxMgEAZXAwF4rUAipBZ8IEE-I0SX8C3ANwGAFI8yUDvThoLCJvxypawJ2yGpZrbQmFEGxdKCIo-KfYGPBAYGyVggxSMBBABS6M5S3BrRJ4lqNAA3-Ddom6LCDk9yqNiDoA3tX8B7JJxcymWhjHOJCaJZXfTxid4CA32dsf7Xr2VxYDJAGGhVMU8CUMEIicG6N3VbIQ11opZARSND9BUXuM4fV-jJhRwRaAektyHNWEoR6YeUG8acPClbAMNVMiNM3TYyxTpglGlTTQQxDNA6A1AKAiCBaiD5wyI4AJEXGlkAmJAeM6ETJybAiuO-BAB8DNQE1DWCbWg9DX5XdzCA5lE4nNQ9dOwlhIOwKPTYgGAD4W5lqYdcNqcRELggXtlgGABwRPySaDUBEgH5F-ESBeUjsA1iUQDUANYaqMwkIyfoG50nhfsjFI3-EoBOBVobiwL5SOLCFpE3gFDXgi6ALCW7wqQFlTKgx5AElWgcBAAlYAAyRvyyBtCCAA+VVvSFFyIOIBvxPhaIhaitRWSMIj4gTkITn7Rv2ZgHTwlAxuVHw00VgFOoggD5Cf4wIaqXYEEzcFwiIRaN9zyBlaV8DTQD6HCQmBYgA8GWAtSP6CxEkGOoVH4vwE2kqIn8asBwhSxM1Ub8q+U3AfUQqGCF0JKDRzhWlSiN4A2BBjcIkaBtuUvAnB6QFcCAxp1C4lUAuCX8GSAmBUQkZ1pIRpWAJiVUFx9w7AdWENdxIqugih-IENw2hGZM6mNQ4AfF0m1yEVvSCBoSU3DylLberiiQVqIkiKFKiUMGloIo11QlFlgRrHxl34HCCiIUVAUQWRljWjzMgF8QumDIeYKcWKJ4YMZHUgY6S5CQAgge0l38jTMAEPpXofaTBU2Ic4zR1MKE4Fb5gUPCJ6s4AOyl5JqwcghLI6AEaFr4OvKiDFJ6kTvUaMZzE6ggA4CRuVPBdcKIRohp9DCkIg8gVKMKwnUYQAu1jHOwGYI1AEHSwhStBbGtppYpDjXchKeeliVfwLIFH4mwIzUnDRXBcDyIQAbrWDhRKT02Z0fuRIHlp8YDSBohVoJrzCAsIeSEiQiuUEiF5jwHqGZkYAIEFAFbsVqPKUYVChDzgBUaI170t4rZQBxeKKeXBItwU0kqQvQmNWPAzVCAHHw2sLuPPpfwCFzH9GJNUmzgfTcEKyA60PymbwyuLp1ydXwrCGVxLNVgClBY9KGVRIaUfEE7Ac4PCgpAk6CAHXpNwvsAYBkpJul4gQAQzSI8s8TsAcoFTCagvA1wHWWrUfNc0JtiIAQAgXBYfEPAVxjtQOg8F0uOqXMUKpa7hOjRQa2jaQxhEABSs044gQ3ck+R8g4ImSLUMBhR+emhUgLwDWG5pqwOnD+okAU8HcxWwG4Im9qpRwGwREhRbGn19gD-gu1kGGmlwgCoQ81Rh+QtGMSoDVf-WSBP49ND7BhoOwBBpWAdT0hCyoD7Sa0TgMdXkotyHCFClY49zzslOwAUxwkNjZXm75GjNlEQgu8CSV60P8GL3KpRpFQ0jdgoaPw3AGQ+l0hIQLbvkRoEaAyRpIJIU3H6AoKSrXAh5iNkhKAJlCkBpUp1OfRikACXYxwhPBMxSukYZPsA+oOzXuSyA2YWsOBi9KUOycAwoSl0lI4Y7ghkkY1Y4ywhWAfEFKJqpI-SDpiSBfTDkMNIIEaotWKSlWgdyHmF-BlxAdW3p8lPcMQg43F611p09RKm+AhIQJNap9kLpJwhhmAy3alLdKEOrNnpAXF0hdBRpWilFJbhIio9vJOWW900exzPorqZcE1hQUUUKLEkAYknyUPaBwgqQrPb2RgA7EipzHxWyQoApBjSKxSd0L47ghXAZEVwKLxTcYKBAh4pLcBYhuLGwhWdWAHYg3MgAi-A2RdqCAFHBhvLigHIgQOInOYHgBAB-hLqGpQwFVoBfCmR2YccHv0A5UcGYBpiNiFgpSaOADehH0EdR3BqwbIQQABiM6S2BxcHbCvRSIHTXlJOcUfgpBDDOPBKBBJPvRhJAtTnF7BXwSiHdBhmXES29bJBgArZXBHwgvikSN-1EAbyOlULQmwZnU4hWAAWO9Z+qE0LCAXCZiFHAF7YWnUAwqOnBhVFg+wTOVhwQ4DCAU6IIDW1mwKmDBJA0cAw3BGIAwg3A+sOSmVQDgcCAKMBwb61+serDcABsTACG3FsQbQBjFs6QaG3PkL5fkFAYb5dAD7AQAEAGRsxRc8isMoAHCBUZKgP+VxsAFAm31B8GQ0EIZjQYhjNBSGcmwmBKbOBTcAMFJBXptpJSYAQYlgOgGZsfQdhhuAObLhmDAXgfhkjBfgAW1nSr00sAoVRbSG3-pJbJRmYUVGVhULA5bDRk4VtGZWz0Y+FQxkEUBwYRTMYxFQukHA9bH4QHBDbY23nBBIRPkohyEzFKURV5DvXApiUCqWEhhTFtJnBsED-wHBJ7GvjTsLGbYQQErGL6xzj5FW4X7sBwacEDwaM-u2QyVpUAk7tmMwcFPAW0-cGztBMxu37tbXTuxUR5wNcGr5tyCu0sZBwVeRwhOwGcGAtlMvuwHAdbecAY9A+ZMXnACwx2y65hM932PIkJJfQAFlgav0HApQKTXO1XofKB6RHeDViXgq2dWHKRMIRrDiRomDnC5xkUWy2GwLIZjiN5RuYLJPsw2FmEaZoEXeCQAnoW7CEgrUZLnBgUpWTBOTQpdJE4M8iTaD64E+Bx0Cy3YS5FmxOHR2B5Y-oP6FQh3IaCDyxQ-eaFhh9mIujGhAkDGETQgUHIC4wdHERDdhkYbLKYciaHHhRxwoKzHKgCw3eDgBXYa6BG4PYH9RAAC+DLGPAcswx2WzCHJhCCyLwPdC-AyOAzDlYFWZ1mVYC4FbDTZS4cuBkd0YENlIQuIfB0kdmHfIXGztsxbFGyGOBtAmyj0W2k95oSBmFkd6NWmAxwlHKtEYhrHW7MOh-YOx3FpBIWtDGyvwV2D6zcsr3ghxRwcmCttewQHBizrIE+zjQlqTQmEA9IHTMbA9kEMR0s+wSjV7oPQQ0hgBa4mcx3haMSCF0heDJ9ClBVFdLyDgNwWliYF3VW-0BIV0Pvz50uiBcjHkoVePHLjQ-KQ3pAsgGJDcCMiWtDGRVgEoE6s30b8Hk8rhFHHeNBuFUV+N68LAFXUKQc4APQ66YQFmUgg5IjWUEzb1WGEtkEYn9ILvekBABPlOVQpAeyZMgvIalZALoQT8XPDIg4nX5PtV0gDfEMNKiIqnC0BoxrSugYMasCvQoIP8A7JOnSejxVoVNKhn4rPdalYBwsIIA+0PPYaCwg40cCF6N8QOfCok++K6UaVR4ZGCnx5VVgjn9vpRChKBLNEtKEtOYYcMkxuA0nFzzskWuEDQ5cOunxQGCPOBog6ABnQgBcSU5GLCOki6hYMdIZxW-BTcVY2F0MOJAgdhyyHVKpcyzYs1RU7AUcGu0YDM4W3EMoIOn2AFJYaFjQaSKsQStgwtqPSoyKIgyndRAZkNO1LorxFoE2oxYWxEtAk4G69mAlC0AhrZYxwAIRKasAoFDDflHAg00qFlpVkyHaBXAgQCskQI3oYb161RAGqOGhaPbiFbksgYQEzUtBYcFh9ciXrCFk+RDcHDoQqJPkEw3gMZEHIDFRzmKs9CAqWLpe0ZIDLlNCZAgVIbTB41SBukKcWLMpkqpRoTKjXMQdy5KP-FNlcMB5U4oktEIR9g4IByMI8rArOM8haKbvzVU57OY0hpOnVsgnBYObSFaNiIWq2w0lApUgwFmpCalrBH5IujwwiqdwjtD51DAWFp4lHeEVVOwW2gdVYyTmk+RMPA2lK45Q4Y32V7CHLTHihtGiGpjM8gJWZ0wIWdzyASfNrV6MsgFfB8QDwE4AfBCgdkW-IEpUeEFwtBRpIrYR9QgMSoEARoBOV28WwUYoWrJiXYNYCUQBOTzmHKTFpz6G-HxB8qfOiAogDD0AG06gGvNJ04XOY1CA5wY4EnosPTZWALQNRQRZlEIBAAKQcw2uE8JUBTIXap8BY3Q7k+KEbTxkfIDER9MSge4BKxG8XN2ilWjTsLKTm0LURRdqoEjRhosgTOid0kkYMmYBEnQlJ1zIzLsVWhZ8cmWYBoIKFh1EPEZIEExZFFoG8RKxLqIIL9gF4nHpsxfuBwR08B2PCIAIa1CoM6DLIHSC5ZVsVEJkgfEg6gaIby2RpdhN-DXx3dR+jWcBgd9HdRz4iGEkx9QhFznJE+BnzTi2KGEk4IwIeYnrg-LPMyQAEgy7CqAxEC1TNJTcY8DGtqoKpUEQmS88PjdmAG2jyAtwe11zgxpfJRWk4orQPVEuY3Jx1zgCqyA2I2pE4GGgWachGYjBPE4BRdlzKkGI0ROPX3lZfwRwBgIInG4gFMpkUAgXQLwCWGWAYrK3Qwjrkh5VchEnDBKRdgYDAlKEuSpqjMl7tadTsBPcBZBODziIvBjxIaY8HVS1kFKzvJ+kMaDTR18DxBx9dBSwhRdifJAG50BkC73xDPBVZz8Z5WA-hgAQkFrQ6Ti+JlS3BEIZ6CIhaafyS3BlTdqWahxckvBskRI7yPPDkpYCRAkSgWsBvpFqeaSVUtiXtDWVdjEpTYgyIWzj7z6CfPCO8dRF43mQsIRkB+hpEhPFzErVcOgyUGyYXWfAtSLPJwFfIE6ASpGtdGiYonaREiPpiMJfWhECpUiBzwJwfWUZ0cIIvGy944uNH+VMBaIroBvENrRM0n-a+nPRNCb8jTQBhHYgOhz0SqANViwg9BusVRVWRis6AEeh8dvXBajOAtwH7ipATnRwG+luvdCk0JRS-VA-L8xEEWHBEqCCEOINAMARklYLL3ASlXyK4QvARxTdnxFGgESAMlGUi4yd1IYGvAsMtRdGLzzA4P6hwVRTfLySlLkQsGLIbcCTQgI4WfkTNZvyCKSO9lTDgJUC1S40ABxyaOCQ5EZhTyUDQUNFwTgFLoNVXOY+kIRFb19VOknGhawvwjpgPkHQWXpkGQolPBHZJiJOhY9YMUlohOC8FdNEctQBOAsaWH2NR1qDSjCIfAtPBrwnqcGT0oeBBOkoJlXV6yvFujMaRTR5pYvj45I0DDEUgnpc+GchtCYMIPdIdETGkJRkJsFgMKy7nWrA8LElyikk5YcDeBBgo41xo1iOY2KwEUKUl9VhyG6x2pLcHyirIOIC43oIxAaoGQFYUdp0t1AJI2i1ILqIIBUDJpaaGSAwSW2DjooGIIJgA7SIwWSAjgkiCDJqxOKLAA-dVPEKtYk+Is3IHKB1S3NvKxUkjdaWbEQgge4qPARdjgSgg3VKYcEgSktoBfClS5iKcDKqIAOwF+kgnSKXLIqDWsJ3A3gnyrUAWCP8iuLSCxzmiBWwAbExk1itQD7CkhVlKrwrUQsHUFGOZrneNzw9chi8laKmioMwAVgGqrIoXuQoF3xZ8Ac9IyFwQ+Us0G-NSpj6RIlZyx6XmHtFOwJHVOgQSGlw0pCkVP0nisgPcQKo6ABAC1k-iGKkvsu1YbyCJoim7GTQI8LPAVNWwPy0Qg2WQGhgh988Iqrx2TINUQEfNQ8EJLsrKUFWhTSfjilAy0B6SdQokOJH3gSnUcCYgNpTigZ9FPcNNcEMBPjRoh1ILfnlTqwBslPAbIIsmDFYYYJLABWwNYnalvwOgRRIXzZaA7UX3UcEYp6NNwKFTilJsAWiI4wAl6oRIGQXC0frYiipBfko4Pih1jIEHACRSiABeQyuVsAVEFo9+BVFmyZ1wooDfEjA4htg-IPnpGjXgxUlWkn5y5ojcHMJeUHhVJRBAc-fr0qhaqBQjTRNw8vAXw00GiDKd6Qc2HAgNwUgjnqf7CWGOoggL8BUpo8IoDmkR6JJAyUREFOmW0YqceRxRJ6jCmdsGxHcAPAEAdOQhRanSlzB14k4y1qtj4GzMEl6XZ0QHUr1VcA5oGzByrL0SaTOGw9fVDmGf4tlYaF3JMlL4Vkk4JON3-5gDTKT0pzoFdGzgpaCNj+CfK9dHADv8V8FbE0KNI3cJt4LsHJS0KJiLsBTJJkgmzcvC-H2A5rbrSfJ6JUklckBkFgl2o51CkGPBuzLktEoN+E4DJCcIdQ2IQI0OvhQr4tFFzNq3wbcAeFxUC3R8TPCfeAjI78TaWfgW5cwQ2NPVTJzLIEg5njtq9pbKWggX8UAQpjvwSQ2IxmpblSpdbIXuST5ZIGcFGJA4U3CYjk-OgAgBTcLCEbRyVOCBb4MlD9RRhfgbKmyN4hR21Ig7Adn0ccwSPsCXV5cSlRghuPHPMyjWAZIF-AVpI+gnBEIHrUBiu68412xGqCYkLJMGcCBrgRORYSnAsgGIEiIMDY-2T9ynatXN0AySo3Q1eYDyAFjGtYIA+Rg+YMluJXA5EAWgP9VwQyb74BACQkbab6WrURoKg1+T+kDpDUg00BmQvA5cSgScIbyJyA9VqIIRqisOYJEB5RlfNIzZYmwN3CJBoHVaDUAvcLmknAskvM0WAEqfogwkCRLUV1UULH1Wca4hRiO9dFVIxJ8o0tB2R6pAA+3CMT85MaRbrgLea3xBxjclX2BXoMEj7VNlcMH9l8DagVhkbae9GntdIgMvNgPnY2gWVfIKpWhUd6aKFthRTDKDMUhpJTlFQWVWXBtM6qNxBOCrTefW4aNoDJRCTE5KvEW096Mj1DrWwv7zfxP486MAlOCaCQKhlUCqUck0qVRTxR4QqSHHjXTToVydEqa8ioFHIeAl8xjwO-nfQsISCHIgUID2gQAUqHGCJA71ZKHC0AIJrC6BPwH7E7AQAVQL4JwSA8FolNyI4GEAAKd3EZhbchxTNb3UB21ecrBWZXIkGAUBPxBquZz1wZy4xiSRLpkDEkFwYAII0uhoISGghd3+VEuShIaVyhOkILdfn8Ng4KUHeIrIawO4SSwEPE0MUK180bcJwcY2Kk2tVgmChQ8DAjgI7tUVWQEF0QGWDIGCa5NtzkqGNX7QZxUyGX8N+foGE8woWml1UGAY8ABxS3WWhLBNXUNxHBWoRpMt0ggJITRlXIekHBptcWOjkJwIVgCu82qeXFuwndEdAzhLTVvhXB2axxwrQY23kWBjJDHKg9INwTtPJVO8A1VYBhw7Qjis4tTGhSJ-SdmVUxHgkNBHVTYVQQ68mVSknVrKIM8HPDcCJ9H0VnRasGIgB3CkE2Ic2n8DjxxTO+vuJToFI3wj0RSaADkunH0jNrTRcFo3oDPDqgagbiDlxrB+cR22bZOoaiiyg8-TWHVgr0ZSh8gx44rFZjVJBgBZlaaU3Dvq5BezUjoUK0Kwp9UlM6Rqktk4QT2kC0x1GtwzFOGNbB44P7kbdfwDCQUpUzNmDCC+ZBkXqhVCd3QdUYnYyjsocINbA6IunLUS35ToEcS5RBjMXM+VAK7ys+UnpPsP2AqJcnFup+4dSG5gXlOXPdMwgY6lhRVobQMmtVkMFUcl1PMADnBlSH02BIs4EdWyBAiNTRAQp3TjURYgQFCvKUPQIkAdM-lMjgZh1qWsHmtquPnWWMGCcgnWxJ6Q5tsF5kXEL7AILYVTyBawmEnc81ATomHwuvX8HS48zTeQ+gXpY7T7cQAWuLxIykuwCwgpOIkCr1ZJJrDYhqwdnx3A4LPUo3BQVaMktduyzNQ1wwAQ4DlJdDUhE94mvUnF7pTaWJCCAPqMeRfb3USHHdwuUnBD7EWKMvCotDPSCzyAj6TQl-BXjPIGRopaL9wPBk0a5MGS7AIGlPan6aPFIoYqVoD467SXcjdFKINOQ9V56dGFWJHkU3DUyNwetFghxNDvQxI7IOQT701VUKU29qxA01Jo8LWsEnUeJUSFux59ZgO5lWSXullJP42ElsJI3YGgdJl-JzjQhIkGcJgpKAlhJtzA+RZtHBjqT3wiphhfYidhlaB0Uf5yEc+NsKO-ZYDulkGRbQQp6QJ1FsEERSYAjKeaDAxXBja0GmOJGqfnGcb0LVvlwwpZKpjMI8xCTQAo00O4JBFy6EBC4aHIc0JsgncIyT-jbgn6r7c2odWoWR7NCkGok9S-H0BQtWRmFZgs8+2FMhGiB5pQhXzZKVIIopTIH21NU13HKK-iO8inUrbPUo9rEKN7seTKoS5Am7EaDknmiiIasBjo3gSg0xo-ucLW0LmqAjl5RGJRCEbVB2HaAWxxcFMlkkHLK8FFMHnNQxAFG8cwVDAjWPdCaECkXn0cAh3NtSYJxQNC2IF6QTmgQEGzEoxcE2ocKUXxgyJVUvp7jdumLsjRc8PwJBUt4D18Dc8AGmgtXcehsNggQ+Ei7RAewSs9woj9Uio4TU1XNwHFObP8o8hJJNZrHxTj2fARnVsGDIXTM8GPIbwNCBx84oxiQRFjiZGDkkjFSannjpyA8DVEzhbQlidfwRkx+sqlKILeMHIUcuQCniHSMaNnYNqMshxcEOpgwxRN-OjDGKGlv2B7wZKFMgfuuUWQII0RwAyg2ffYFLcMK2BP9JL6J1MvAOYd0ACYdFDegPB6QE-B7Jc5TsDYA4pD-0HysYfzx-AYMYuiBB08JbC4blQZ4roQVwbszYgggD0PE0QaeSUQhIcYElYsfwKkH-w0nSLqIgcw8eMi6ZieqDhodKceWHA4hE8jYhTwEYQKCO6VGC9wgI8kIElG4hFsz0-oSSgcAYAVbwvBHAWBK5jzXcDXTK6IHONiFlYdN0oFEY0bi+hwIG-AblRAMKKdw4OvIXmtACHCmSFKyLKRl1j-FuqAMkiKuXJCHChbCnxMKAvDnrxSSGEetgUeYjyQQQQbsLJuEuADmUvlKiHxQ4CfULow4COpUNaVwB0SR1RIVQl8IjaE4heJVoRmhwgkpDaSnI8UNqAAEXzVIdsJzyFhjYFnpVHyVhnCKGWrS9iPvyLlBvfmG2YIYKsX0GwxWsPAgvEDmMtrLkCNEJTdyFuutJ0+N6UQh70E23XlJwreWagd5QG17TP6ftL-S-AIdMiAR0kBkFBx08BnFAoAcIjqEYgUsCgAAAMigAzgdYHeA0beBm-k6GNUBXStQTBh1A2gQmxAVt0sBT3SIFchhtAqbeBVvTaGF0GFAJgItOvS2R1myoVsFXBS5tWxAhVfTiFGMC5HMRugB-SpGGhXFtpAADOltgM2W3ltNGLhSgzeFAxgEVjGTW0QydM5DIHBUMyOxWjMMwcGwz5WQuisMCISHAUUKYfKBGRlkcjPnBKMr52LtblITOUzg6TjI4yS7HFC9GhMzjJzjBFWjIXABwPjJG1tMujOEzRM723EzV5G5SEzpMtcFkyVMkMaXAZwGcC0yJMtTI0zy7FMb1H1wfTJBcW04zJghTM2e3MzpJcpQBJzUWzIHB7M8rQfrnMgsnTYy4dzJXhPMwdG8zFVFlkIhtkALLWyis4ZjSgWOKZnCyNsyLLPg0cwXTLkEsqAk4tLiX5jSy5PNvyyzIRS5jyzOYRPl8RCs4LLRhSs7lhdgKs1aCqyVWWrKO8AWRrJaQsgFrI+l2YdrOekaESuG6zhsXrLXHgc7HjBzhsyHOnHXsqbPywZsneHmzBYRbP6ybsvfSsh1szbJGQOYBNj2zk2FVl3tjsjNjOz9YS7L-sGHd8Zsd7spNFmIAmZ7PGyYc97NywzsuR1+zFHBBABzrs-rNsciMcHJGyAmH8cImlssHBG5EctZHwdUco+3Ry7IQpExzQUbhtxzjyLCBfcG+InLshkQcXE5w7IeCOao66VaHksy4GqGmQCxY0mSbrFGmgjLGge-Q2NFEfSEfk38zGnvBOS7ESwB26QPlCtjUDvndU5oxHLDDcIvcCJqpwAZDeB-JZqDnAuY+5RxoSAvuh9VLYZpUZg3xIg2ilVoJ9FwIdSeeMmVVoU4tSR9gHSOaVHcTinDBFgDSlbjSCtNF71xTI6U48-SX6jFyF8J+DZhGY8ORmIzBbBAR8QKdlw+UNzaMLyLTtS-DcxAkw0jfAEAZesF6c8oMlh04LCAHtdz6JAcPyvcQ6MXwaIfQijA58B7EWDruWjVQlLsBRpM1SwJOAopk4C8FFM2tJiDnqlcc+FYkcxGaSnTBu3jXxAEzCgQhQja+Tza1iVeZoP457DkTDkHjFEk194tZ1uwkiIBjwmVITWFHchcocDRvpmJRCgQB7M6fQQgNwbrQpgPyKBrnxup+ulFN8QGCELQwne3HFomqZwQ7c1U85UrAjgt0UiTo9X6B7jsJewnAgzYB9QuAmsWkU3pd+F2nO02sVCmLFlgNI3TluCS0Sfk6VPIDwxZ6dMUnV74GpXOI3AkqjlF76KkEzILtZaqqJhp4bFrBKEYIDjQLxLlOkGctYhBjE-GGJHPIdUzOLr5uU8Uj+h26BHzqpjrDxRMkXweyjHlawKVLhNKwGqErEUSeSTX0B8TdvmahU9pxpCxkZgCpBchfsWV0DPZUOGgxZ8yVFQBY3OFHxetHoIPAndYFEwF-wPCO8qftVqJYND6VCS65TYS2XVIaIB51pUqYPwmzhbzZOkoMqYHFWOaLwRQ1XiqQ5IBAB76GGQvBlyZP2LCwiHk2phtKfRHCJCUC3UBJx4j5Wkk3tTEvoRtYOLXWNW1GUHnKuShUVwZWwf8jG92ECnKnwGE85hkhd45oFsh2EXr2phMiDxQwIf4GiCgbi0AfD1bkI8uoAGaccCA388gRj3fw5SQv0MRk4P1D7C3wligQ1twGtTH0iQLNC8H10ErE7A8UNxFPASNQiguUKyysDYgmJKkFgQIBXkhGJsvQZMAkP8ZXCzAYCTg34pQ1U3FBgX5y1xEMKKNKj47t+ZYB8ThlLSbCdiUOsEaAmwACXLFM4EAFjipZNNHuIQ0AaMCNfxD7x1ESMCCAHc7iTetrD7WqBqQHlaGeUq1qovpROAvTekDqhYZbvM5FILRaF3N0hWsBzVToG2g1hGctNGhVdVWilIpS3DWAelskM4LCAWYE5DZhRir8G7564UPwvxKrDcCuLsYA8HfxYhY8BflFodfkNJ7NLAgY9ZqjaF5Ey8TiH8hfJVvSBAQAG0rgBd6XCwHdqwRcGPhd8KTgjYfwLCEcBIijpCwAShS0wnAHnIRpPxjwV3AOndUNaq7FDZNZQmD1Fy0XjVdVNaLjdJofbSCNHUSgOCQxrefgIhAaVLVLo2WvXzBJElnMIkC6DcmlG4uuRFDWrVOlvkHJO4GCnKUcxG3IHx11e5WnyJqbDHn6qkC-WBKNZb4GkoDcGJGiHyzRxxpVhJkkhpFCrLikIEjElaProg59AbDFNw2BAeMHKRYXNCLSE13CxUBaInS7cMqIWeIYaEERi9KBPqUsGtwYyjCDLddSUbg4rVmP79sicDSr0FKKgjg0VwI5w1o78DcH9JkgIby9CDXVAWplwgbymm1LfcCAuoOEScDyAwYVCChCXFECjGQ1SzImSJ-AwGNHbzYavBKAqiKAokRGAj2VHaCgXtWpl3aGIXUL2iMb3bU3jIEBUlmqYQA3BKiRSTIIZxLMDlpI0MeUBauy0se8t8DWsAR87WD9RjFNIfYAw0bDCuTOCRTCfXGIHCuCByEX+amBIx21IVS741ixTpXAj0MkgnZ-A3tUIFWAYFbiFZKfWQ2MgncCtiBHkr4VUAqqVaiHKcYDmHxh+4KENQo-wZ3CvU8iU6Exk-dSon8VxcFn1eRKXGuW6lJwTiLNUTUbaW49QCY3DOcOiKEXHJMKTKI4g2fI1iIq5cyOEaAj9bKU7As4DWEz0GAUSEawqYFnyrrO9Q+AATlDYGNeB3INIQPd8ghagFikkrZMRg1IXqSSEOvSaGH5uZV3GbwzFE7pLAXrUimXEniUAmdxsvbKK4pnkKVzeAW8Y7UvEPFoNql18ObinszFgN0X9Y+-NbDWr2XOjVUAuSNqCNwSaS2d1Vni7WQdoP0KawzoUVc4xgIDXe8B2oMm3sFeg1BVLzSJfk-vFQ4D0OSmb5kiCAABQUKJADWN3nfOXmhGiHlBMpmpMAGxckfDiEdwA4a8hOcl1UkhzzxUsKHwYI5CZtKpb7dXCCcW1ZmBEyHKRvCUI1IISltxKXB21swtoVPz9ENkL53MpT1BvHYRT2xQL7pKAxmOQhiaohCsgTJQCsE8gqC6Ef4-nNlHZVEhM-RzF5cIOe+jV2xCBtyDlFI2pJ+EQ6GGJzoehsyaQ3AoLe6LVF5bMhSSOqnwEUJKCmQQvBp7BLWmiMa1OhiSWZW+UVanBGca5rAgpeEfrIhMF6oBOHwQh5rJNwOptKLcGyMbqMAFJRIqKKTH1bcVrueU8YXciJloVFF2znFsUIH3g0iBgB9UWVVohzlFwItRiEEECqWTbjwRbVm66gLCHzRWgeSAWxIhqvU4lraX6ZNwHwKMSGUmtaaAnAjBYiHrhkgamIvB8ISn2LRMkicD5ErFDSklISSOvWlY2YZxyQglcIjWO0zSDs30gKcoRGwRRkAKFNxyYH0JZpzUCfThdMpBgGIF58XJxwwyE1oCgJZSATUFxBUyzRvExpD7yRcB8QXC5Qk5O-BhoPaxTNHMQKbuSAgcpH2iXj7lJSmLADFb8GhnffMgLlFH1XCgpQyybExKsJzcaGWB6lZ2SwFjSAHAzpZjSSk0M9Udd20h2azARrNQ2B2WEABhRwDyKCCo1V6crhfAVCIrsEFTFEq8JPgSodfUBNQFmZpDaHD-DSN0hpUe5mFjVAk7BA+hj-LuPUgufOa3Z9G3GgNVl8QB2WW8msQtbVI2CcOkFw6m10jH9ciwNHagtBFq3g7AUc41yp8vQtbd8VgbZSchltK-BeNCSNOEbRi56J3BYm+r8jvq4hX+euIm3GZHsNKtTcIZEuAKBV+c60FMlZzGBQIhMHCpKkF7BO9JCTB1sELcCjwwkA8MBhcsbJDeglRQWTolmuWIBeIBTJgHuFspUISYFTioxV6kfuFuiiofnCSQush6OCDoMO8e-SGIOwbWDkstoC-m+i6RA2lIg6ACKjhoe4g30VhiSfObTS+ddz0vwBtBjwuSpCEqhIxmPVvjJJ2qDwWQtb6hArecVXPM2EncCPinlQ63D6ks0+9Zx3noHlEygsN19dfmjSZpdpq2Nupwv1G7FBOAVbCdicCFsEyifAkTxYOETE8JWReUn0gvhRKmGhXrWJJK2+wxgSf5CpKZIjxuDJSF7IltC-R0JWlSLrBJ5rD71ssOtGwiU5QiekEZylgfxhgh4aErFZEysF3DxJjSzrput4DByN0E9iX-DwShaPVCFU5SVSUccFcECGDJD6OqQvBY45TFQEASaCW4S8VPnUXI4hFCoHU7w6QjJIsRNlGniGkYYX90X4Sah9ru8MOCPxBDcfH8pXjLcAI4M1DfkDRz4KtzNJ4pe1P0Qn-P-fKgR6f+ab7BiJiP2AaIIqCmQDFF4bh1ViKIXDyaEpxTgJp6N-IZJgyGSj1ibPdVUVQa8AoChZ3jEOpHQrhRCH1Us4Uy1gTEnZDPtoww5Un79bOTbdSgb6QCX2Aj9Y8Bm6-IOoWXJQ-fhGZnnRLNRCJNlRuOLorVMAX0i9BxwF3o2vCtdGl8E5008afaipGHBXVHKAt0L9UyGyiQ5B6lpVmwAoiOE2ICQmTC4ABK3gjw82GSaAt4TCwVxH6OgGGhahEMSdxhiCFAwJlcWaylAVo2KAZQ-4Y2s99qxAwilIigYyiijQ6rvGvojjE4FpYJlI4ySQyYerAIcdobOB8I5iP+PiFsjTQh-JbhKg3YDHuIGCQA59AsVPbbpQqAMUqQfxicgaTUjAMIU8Ris8lnBZSg84KQXBjHjPxMFSbArvdijc5y4kndMhQYF0SpIBo5q0nAg4bytU7k8JKVVLmwVvC3BcMVHvLxQVUaAcEdUbAnYQoCvsW-hE5cJooSqJSWXfwJstskcAJqSCFbj76T0xSNA9U-HS9xUH40sPxia2Qk1QSAiDx81wGlRogtwAOT6khObmiG8roJ4TeAB6ZmZOAjUfw4wJEYWmGqkqIQDlHx+TYaORofEJnUACFkfdAw0c0AYDkLSVTZSMSP+LdtRJypSEhCAYqN83C11yXPWAkuyotX-J8F4tZ9NGOHQjKI5CByKEtcKY-lFos4WAnUz9CNNRbI7Ie7DyFIA2er0hEKN4BiIhzQzV2xGA2JD9ZH6fKl1kjNYCdCtIcNgAhMq+PFQ3c012ylU7wxZ0kicLDGiEiojgGbp0UW8WEvKc-3UCmJFwAg8CMhTpRaCp09ke1v8hhhe1UTj9yCFFtx5m5whuI3w9mstx3UfztfhOCIIBxzWwNlh9Mc8TelNw7ac7Wqr0QP5Hk1qgJiqQJHwFlSCg2IdLjDDFZNcmuPE8M7xXATaC8COCazMwVgQQhazxjE7QrgnBaD-c+Lzh+xUxbFzUjt0SllOIV3xH10iHJGoJmgEq2kpypA+aaJaBEARUgbMrjEM0OtzsSSSQiHV2LE8htfCzgS8W9g6Te5OGPRpXcXCi6iY1RkChJQScJtHxhiNxDzw409Y5dFUocTVkRDBaxQ7t4YIKGPPI-YaR0TXICSKQLJiE6Ck0psRoH5FaRFn15EQ8Z6eYk94k6W78-Za2mVQeqyKGZ03gcGi7KCgD-j7JGae1KLSdRavzMkhKcqFolxVW9npAsJVLyhdokOgFgpatepE8bFtTVM5gKQKINUhTioIEGInqA1zvJBYzJXOUja7BC+FiBJCWaO6cAgkiMRcLlOgJRTdQpwgtjKWgvAdSeSUehYiGw2SBp8ghw7NMyb1SO7OnFfy0hvOZzW0KtXQ4a-A5675UiIYMY-xIlTweVGrJypKIimpQNcJKThziRT23b6PVJXsI5iRUQPnqgE-EwsIBAj1fJjyI9BTIwqCVWQDsYKZM4j+KSsUgtdfKgz3nnCciDABSOEdDa1rRSuGLIVgU6FeADUFCUObl5ACSKjk4ZvkagwdZyFOhODFenxgnnBOHUEvINSG0C+oPWHjVXZHhE7hYlMPGSbY1Cjsf1QiXsntn7wPdDNUCg8eIMlkqDAiuxxQDxdcRW+XEg+kYSLFJNcCeqmBcJ+RQWVWNriaIcfVEYfBq-BltC47a84CW3LYoSgE1yQoZydujUEq6zhM0gS0BOEgBiMbITsIhIIXTCAbXKUEnVxchXGKpG0cEOgg3-LQRLBHwJWv3pLoaA2I9fnKIJ0jRkRJ0HZrFCCUnBDYezU7xqoO2tgpfqLnwxJEYpkmMgkRKKI35mJH1UrUPqRSip0OvNaIrNTaDbMAh5iBwWpByIhxUg9cvO-mCTyiigiUFNLKMQ8qIVu2X8UMoNXEcU90RYVrADqU2CNxUaPQYQZRwZfi37XtDiCtoDoXXy-dKxQwNigEfDUmSCnU7QiP158OyEihAC+rj4RO06LO8JWLSuHogtyUmllFDOXgRkloGY-37EOEMpNiRSqH7UihcLKtxflv2A11lUTJCfBEQJaY850EP530JnB0KUOoDT8DBZVvq2yEEVkVkQBwEkMcZSxO1SLjtNSpkXBL8Qb9rWxv0jdk0npEo1TwOvg3U9SdiBgJ76LCCPoYiGma7VjIPDj34JoKDSaIqIVwVecVERwDVaygMKgxJlgSEQI9SOC40SFmSGcn-5rhEBbbwTILogeLQBHcGcFGKYaFbILvEurrA+9ZfuScWGR8UFoHy1kn01MZQGiM03jBgGa41yY-1up0NGKxMVyEQchzjO1e5Q72mgGApILtaCXG7AwgVtRiQUiMaAChZ66CEFijFVxDk9KTdGHRpytT0OG9TjNB7wtsMDiHQ1nZS6k996QedXWA1LriESFGsf8XDSicvYHqpZkGB8s1VkWYy4A4nJgj2oww4qlDI8Ke+j34io4AruiGYGSS+E4dZNJLTNw57pIk0IN-Bot1gHQco1PfZ4geL3UGmkeRsiDzhf4wlgfHkoO8ee3RdwtAYRcmk3EAAsI002sCiDwIEAFZz58UUlgtDDfr01henDNEtF8Q1zqpoIkbIRWcDprrfksMKRgJKNZYDznMhC-IoFT8+1S1bqBYNwigqQsICCAWUY9kelQEH6gMUtwQaLujbIX2tmWyhTcQREbjDoMIA2Q8pRgXipFmjQndJAYS8Xv5WoCxRxpsjYUVzETXU4uWFVwB8qWUmvUtCmw-ILcmylhjzCriRZka1rtdhwA9l2eJRQ05GbKUVmOeEJNDDk1xBUibAN8VvdmrwsAekdRMJohbvtrhr6RumPPjgR-VaSP-daH5gsoDpL1gqxOKUCNPBvqFYl0yWWh7MmqRk2MKFdZIEtDohA5R9rJzlKFzwkdpulMXGBVI8hWh6bjyzxR2ktLrcxSNaHjx4lYYl6sGZc1Fb0fVYJG-QxILKXSI3jCNCokZKTmgzxSKFhNtyi504o4IgQUOwTM1STIWrwxuvFXMw+QqKAUf1BBgD7pDNVuP0INcPraQZd3MfHjLniP2UxESgS3WVJBPMwWiJZ6bWkeCjaDelMtf9EndTdvIvOD6hskC6hPgFqYY86dFUDY0OFcSbXV7UoCtiHzIgKcXIioERDCXs0ktC8iS0I2dfkyJx5E5wwjUyAFH4ojI28CtJxdjtTnFC0Juig0RkXKg-9ajOUVYIbaA1SKAB5OF3EXnmoqC4BHIPaQCgRaS8h+xVodNHWAYIJETedf9cpxvAwAPZHOhia4pXwEAB2c0OB+9X31eMBJNdwMItlYQGhEhKNKjQptCg8F6IRDKvVWh0LasQnAKnVEiVhIADEjpFY4jNFWEZILVxCpFwB7C6SzJbsF9xQCImRtxWAfK7P1viBkJiESratX9FL0bATZY7AOKFYgoBZd7LhBydKlAERnCKlT9BuoGeLNjUzgyQKi5p1C3NN6tUg3z+vcYxNRG-Yj6b7uKSeN1USNHCUD4-SD1GbYIISayTg0gMjg2gNwIGGOv5iROOKJ8iY6TB1jdgYWwI37hslshMLJ4P8hVDyhsBk4Yw-NJ6DNecvfQ3ONrR3gS0lND+5-BZ1WuF1IYsMoFVZDrWPRLNMpWyAV8AmGRoMCMKA0EXBk8D1OycI8vlIXYOL3JxkLY9FRpTVV-RzxMonGADTfPb1QrW0X4yUjpsSSJDwW2sZMgdJuqCqWUL2wOwGT858RRFcgfKdPGqq9W5GAPmNkOY2XkM6B4zrp98haMvcVkGMVgNIcSB9eAccr93TIkB55HdZirBxXv10Cv+DkMyaCIXMw8qWJCFTOPAYe3gbJBFAjxJ6xSF6NuyuLSmSxkIKTcRrIPOhpc5fJ6SAoRCV8QgN5kaIx4QlqK6GG2O4--MWoZcJ5Lhg5KQXAZC0EGCkjKmlYohoSdRQrqqfp1by07wunXuUhI3tDVTtLUS182aOLtH7lXpOrXiDnJAk0fEbVpiPCB8TTceIoWE-GK738E13PvxhoeI7-k26eqnT96NKyBunzl5ytsnOMir5LHygynHOStVjUP1A+1wNJ3Uwst21yTyFeKQ8Dr1PZ5PC3bDow0SjFa4ujGZo4JdgjTUT4OeuSwFoVoGAgGRVsTYpvqxYQ+9miJHaDhuDJUWeNB1J8m5keYANttp9FNqH7wF1LigcgzpKoCnBU3fQVggT8V0nibcIVHzzhCRVM0C1KySc46MR4NQyapm2XrWxVXjDWFthcIJwACgsIaESnE1SByu3CDBMIAvjSBH2CrqVkepUPgXl0aFiJV4ZIEsI5jreOaVjcfzsicF9A6jnrk-NGQQpAk--LZIX5IZB9oMEQb3wWUjIPFTd0LQsrOBjxqdSMN5SD-0952XfEDyBWYoiCVrLTSTBj2Sb2sKg9F6XzzQR+qIaUCTXnBJFSPgw8PCdorMKkDOVZlLZCNrLXaxptM3MDiFTrb6vqUuMZbotMiR2RMYSxhNDd3XGqiEcRF7ReIbs33zrKEInqpsYPIV-utwAMjgAyVziWhwK5VudBc-Tl+SwkJsGbseTjxhF0a6jVOoVfwFHg1WroIIyGlRp1BPo1SER5IUNVE6SBfgLZLbkEKBVt+xMq4hLARE7lsJMfNFqJUoAEldwK75JqrYJGUjHt4qIa1bsEgADiJVZ51IxwkpEklnoITQx8Pog7avohw6HnlFOkaQyXCwA3iHYkycD4JHFLb0WGN5ZIpEJxPtDhQ9IIKlFLo24BKL2phwNsE6NAAQmKoAFFRCsg19JGZt6NTIDTCUodYlZ5TFuuA20pWQO0l2lwbIQAYRqmAoRsfJTAZYAz5PCM4bGOlb5EjZUFBAQzCDiNYGMhFwAKWBf5BqAKRvjZqRhulibDulSbPulIFIelmRiyMT0rTYORo4ClgOgpabPelOGHgpubCKNwwHzZ30oCAogWYRpRsLZZRnKNOQAqNlGA4AQMuwpVRpBldGBqM1bHBkhwDqNRFAOBFMoOA51BJkvGD9AzvCbZ6CPFYzRO4wrbKy8ffNghvbE2AHbE7YXbJ8JE8AOAPbNhA4Mj7ZBwP7Z4RD6ZBwMHZE7KHYAYD4haxgOBt+JIYrSNE1awAAQZoMsClRB1sW5J9YxVPqNK8JOlxSKSoy7G5hiUECBWwOvwbYs2wgqGABDiGsRtpAooQduoV1cCEhonLfUy+nWhnXIdBqJBU0MYOAZIrrZJQpEcp6oL2BciAqJOIh+hCQgzALvC9A1iii57NDihE5C9APEC4JlIFEI3fEbp1sPEoh6A+B5LM9BBkEklGgJ4RbMGuRwyHMZUvNeMXcDhwCPL0I0CiSBRSMqAxctVECYI11elJH5C-CPwGSAwAacPP0tzAMNA8CEA8KDoQMElJgPqNH4B+EcQ2AFsQHBAVQqdA5BwoIbBeRFgI6ICvQZcOSEZxNeRevOYoZyBhVLvI7ZAtOwhLlCrU+pPqFQiPgRvLERQPvO-AK+iusFNLypsXDhwYhhhxbXFvEvTKwBTYCqJGBIrICqCBJqSLXxSxt0E-HNa1eyJvU38La4PcuoAQgHsB0gE4Bwij74OtiM5UqAyEZ5ODQJKt9Jjzva1b3P0g+cERRu+KZBg1BJJzQpuFcIqZIHnL8YqyDoNwILeYQxIm8SiMeN0BCAREaihZ+yEBBr4A55S3DfxN5B94hUkxh7aEaFwAJdQ6KD4gqBDokZguCFquILJMpGoIc2mmoMEkZ5RaMn5qnFOovhGMIpQIMY+YAqQ56gXh1YnYAtZBwEwgAwJMtu6BRymnBOxNE4BlE1RlQERBpWPhA1FIDB5kD-xy6P2BGYLcJauCcAaQoDAuwH7tizBAAsaCJwx8KuIBTCjFyymPpR+BX0TnPUQCkPAATaP9pdVOSlppGAhYli4RWJN-wooLXFMiAigggH8Ur6OqpcxG7RawBEAiLjpA3iFMlNyI-QLSFoJRSsr41lK6parK9YHnBIRXgNIMpdKepESIyRtxPNJcoKO1IzDZlzQvXhakNdxREBOZ48LBhBerTAI2O2pvjJ+J4IBmR1atvRzKIdBsMEfQeFhEgYaH24hKA4I76pGgJ8OoU0CCogvnE2ZXRORAmYA7ZP-m84EzHCpNnNqJhqFh5GYhfFtrLcghor2hG3AzJxSOlRhcEg9aiJ2Ai8AdArCkSQ9JHihyZJtEHFHBVdDLEstBLBQ9+PyhsjE-RA6HUI2WN+hatM+4DFJWp3IPVwp8OMYCZDQRNpLRIBRM8JQVAtggIp5JQXK2E+qBtlbLAHJhBFXFynDQgXTD3FrxuQgZaNNB38L5cULHaExRFiBY1O6hsAZE4PQFvAkGAUgB1Fd4jPPe8mtNnBw8pnRcoNKIWIInxKrKG4HirVoBLrzhoDMzxP4n9NLyL3oIyu2op3L2gLgB6o6KIzR54nLZ86nfhiPOVIQCFuRFJEi5z4Gpd48E3RxhMhBmAKlR+OOXUxZtDB6QGAAQqKSo5JDnE9bt3hvWN3VcaC1YZoCaVdVNNJLkKu13GgO4E4CH8quqQRLTHM9PkDxJ9FN4QeIrBAPwAGln3osFXOguQ2tEKUL9KkhvOIh4ASvKtSIO55ETh0ZNauUZnCNioaVL0Z7NH1A-PEGJAtAKZkiMOBwaPfxhyD04F0MSI2vN5ZOCAVANAKPBu4KeBgxF4ZBei2RYLHVR13OvpwQh2sFpCT4XkI0Q18PzI7ACoYftEiBdDP6Q6KIBJzwMWEongyIZkB2QRSiFs7IFVQssi8Iy4Nslf-oZpk8D7xK3DQEuAKtRZaOLkgIER4fcHBB7cHFp0ur0JIrqrJ-YPTI-ZC6ha4gGR0KI8FHXjNIPUBKJHxFoExrFgQjdP7pmZouJVjL05M6FuBqpEVQjVDQE40HrF2CDkAeVAAkvQRrRAoByIAJDVEj6OgEfgK+QJ+kasmYFJxiRCqJZFPKkZ5EWhACDdZ88F7RN6hNhw6BNQVnDRAaqlxh2DPQhiIPPoOiC0QoCrXw3uh3Eh4RC4YAFngLdISYKnEgVDgPJ5xTAmYRwAMp8Zqc1fED+ASQNsEbrEasQxJP8aoJQE4NCdQygAY9OIIcButGs4-iJrBc8F8Iw6DpFoiEVUirqJR3SIk4k5G8RuKKWB6uNRBuIMVAfuIXRCgAdBTsISYfKAMIP0GrhmyMIB0BLEIg4Oz4FoFwJJpJhIKkGxAzggMMtaOHQ+-JxF5sFlJSCsjBw5Em44rHBpoVGPFsBHERy4kloben5YQVLIs-AtBBPyFOk0DpVMXlEnAA2pboS0KlAwaPBc43C0ZE4H3lciuXQ4tKO0ZJHuBxcv8gzcNU9HyEahd-N0RX9EVRltKdRuqBwRjpIDQUBOmQTiJoIvaHzgv8GmI8xAvoHDKhINwAQQM3DeQJYHJBEnLzgKcnqURTExoBhlohTJM84ZxMVFkDEAFmlGEB2wB8JNlHkUnOHVILoNAZxwK3hYKMj0ECik0B5GdAIkGtguosbpMBCmpQCClJ9Ait5VUMXc5aARodIpEhsBCoZevK9ZnnGYQgyCIRbOPUZqTt3IB1F4YmwJSYN6motlgJMB41MZZlTCcgtkCMhkAhLhLdKoMAimEB41FrJ9yIYJa+H5Bs5KhBIXDAYzmiIZPxNgRbMEsB7jMaVdIKNoKKNUQYVB6DwDOUREKLnpW9GqVnoHWBeZFgU6BMxJOkAoJz4ACU2YMEg+qGqkD+B8oZKPxxjwacU0MBRZcIAb4V6K0YPBBU1RwKP4Q-u3g0DvPQjVHupLdLkJ0jhhJNWs6p-JDKB9Qu1RKTCtQRmqJBRAGdRL3ImIlOH0hbqK0Yp5M9RhjhbAvEOeB5okPgKYHlIZaLIEzYLJQ-nN+AmgHAt6hBtJMpP3ApNN7UzBO1IZpKp15IGIgVcNyRtvr2g2oMYUndAbhrSHqcKLKhIzzCiZRAAewSHjqR2pN9JLNP+IoGjpZ5YC9ZoYBhprIYxI60vUic-M85eVIadNwn5DXJGP4ZxFjRmiI2grLj6YYnCr02IL-gVCPlQtaERB4Oql4ixEeJJpOIMchGUB-EsWAfnFJJp9CUBu5CCJwSL5Qu0JKsYZBMFcCLR5m0L4h38DAYKkMbQBNA5UazJsCEzPiA9xBIR6SK7BohqcUxkDRZZIL+pkEPXgjiKW5WxNuRmoHIo1oKHUAJGspi0C+AOzCTdt6L78FqFKBMRCDQGwsNAffMMQSSDWpq5Ky9hANSAzwNXgm3PUpgwn7JIREhIHAAvZAaB3Rkwrcg7VNCRPBDZBjNjGob6CJ52vGAhhCIYYTOpyVjwZuFVDvRISzGLNeIP+BrILOZmkBzBWlF5AQXDGixoGKplyJBBjStmtajilBhal4RsMJsDWcmZIXCF4Yn-AshJ6GkQUYAhoCnJoZatIcAxBuZNxhJoJRuDih2TN4gX2l3EkCPQUWDCvJBEAAJiEPbBxTB0AgAtNBWCNMZUlJ4Rk0NcISlGoB0yFC1mImWs9gAhFlrJsoMCIfRG-Nx4GYORADLEMppaOiBzFAMIyOCUZzQsYV72hMFxTAWEOvOwRtpC1NWLBOYQBMUR96EcZgVvcATnE9RQKINx5qNbQSXATBJMRTF8DI-QHaFLpNCM0AXYBU5wwDwRXcCM1PBoDIRikZovCCHIXUHkpBYLkRJzm1479pyV9ZN1J35uYiHbEkhXxO-whLNS45nuwRH9BQhPwC-x5Os6JkEN0YwNObQEERrJp7I6J2nC2RvCCRI95sWYyVsNNThEZkluKJ9ehA2gTkOThkIH4gFcA6gXuKIgUYB1Bo-B1BPoNIgj2L2CVEKewBwO3R5wAJAi0EEw7WDex1sOlxKUENE1wPew9YBEgJMA+AX2A8gEkCugrhONAWscK9UqAQhvbI8Fk5K9AROJBACUIDAFwC4JBIOcAmMFRAKHFvAZYIc1uHOFASwAzBq0kKxUslTBufBwhIjA7ZkCIOAiKonBRPjBBSoF4gKSJXBkIJB45aGkx0YC2NAaEUIisV9YwnO2l-rMeAIRnQpzASyBLAR-RwABAAB0pyAbcpABvscQBPscgoabOEs3TL8AowOwxj0tQwQcQW4owG-R-AFYBIccDjQceeRfgByMQQOoB2GGiAIFOAAQyIgA3gLiAoAIICHgLgAPsX9j3sYDjEcQgorKDDjUccgpYwO6AhbN4AscRaAccRP58cVABuzOoA4cYOlmAGED0AF0ApRppAKgDgARGJsRygNu0P6MwB-sfDjAcfTYDwDQARGH6AcAKTivsZYDpALLidABuAFcdAxGceIBlcb9jVcb2kNcRgB7cCPo7ADQANcIUQaAAaglcSrjpcbCNjcQzZ1gF3EaAOiNPQDbisFPrjPsfbjUwI7j0RkWlrcW8BbcQbjjAb-QjcaQB6bCmocgIHjg8d7i2QOHjoAJHiHAEzZY8WTicgT2k6FI7iygFwAaAGcADQLritAMzicwEUA2cbiBOcdsAfcVDZecZDiBcQIAhcawBcANniQAJLjK8TLiI8ToBH5MwAaANBpXcdUAaAKnjDcenirAPTYm8TQAmiASNv0p7i7cWri-ADPjfce3iMAKPipDOAA0gAPjW8QEAQ8f4A58QDiF8egBASCjFhALnjeqJukC8aiAkpiziS8Xjiy8aCBucQfJq8XaAMALXj68bgBdsAQR98awwW8dvj1cbvjX8RHgekf3ip8SHiv8QEBHce-ilgAAT+Rl7i08UPjHceGphcEgwrDBATjAFATB8TkDh8ToBF0idJkGEgS9cXbj08TkDgCZyBHcQDR0BHUI7AGviw8S9jvcdvj0CRgB9NNUA50kfj88Zjjz8cXjccX9Rr8Vzj18amB78VQwn8c+AG8TgB6CaEAEGC3j8CeITCCTvjE8ToBwiL8Aj9IgSKCeISOQJITaCegAeZIwBkGLgwIgDgSScZvj48TATd8a-IlgCnjACXHif6DQSgCQnjkFCup0gEwST8SwT0QBfj2Cfjjy8WWBb8e-ReCXMB+CcLibCeEA+AKIBP8fgTVCb4SCHEwBRADoSUCdwTLAI7iQif4SLcdUB8GGviVCTESigH4SwidbjogWPjsgGCBTCX9i5RhYSzCXIwaCY7jLjOsA-RCAA7CREAC8VETv8dIS6CVEEY8bkSvsfoSD5HoSlCaYB3sW0T4QOTjSAJTjmGMjjYccgpFcWzYi8cwpL8RwSOcaCA3CVETgAJ4SFAN4TBCY-I-RFABuGnOl1gJsA1AIETM8bvjViQgx1iZAA1ABES8CS0SPCXziFibgARGFsSD5FniYgJLQKCcUTd8ShU4KkcS2iQ8S6iegAnifLikiVYT6bDzItgFYZDiQeBvidsT3iX8SEGJgwaABuBFCQQTe0nMTH8Rh868QITcABqpMgB6AxCW8TkFAJRNukWlwiduAkQPcSfiZriaAGqkv5DQAUScCTribvitcShVd+AwAySfiSmiTMTHcfLiSSQgx6SaIAKSe-RmSWSSP0GyTySYyTKCeYT-6JYTB0hTiH8VDiBibTjz0gW5T8aMTWcVfjJieoBpiTQS4SfziESc-icAILYriVyTd8WOlGbFHiciZATp8YSSGGDrjmZsLhDiYzZoSR0STSROkdcfqTsiYoSMSXLjtcUww6ujxJDScgS8Cc6SiSSIwFcaWARgNaSzALaTzSSMAaAFaTGST6SMAGOkaAIsBUSZyT-6I7iXluKB3PGSSkRjQAjSCAAyQAmTRSY8TsohcAKiRGSjSSKTKSe8TmZg8BwiIedyCSMTWCWMTnCbiAiccsBdCWYSoyegB8RjiBwwI0T+RmfjHCWwTS8eXjmyXkSLAJ0TqCYmTeieKSkcTTjTQPTYyFLKTayfKSJia4T3CfDjVSecShCaKBzgOfRsieiTbSePQRCXSSgye0SjyceT08a2S9yYwTl8V6pqiccSTybeSbSSCTkFJgTWADQAmVAECcycDZQCfgxWGBmTSQIIBIybaSnyT+SsyX+TiyaOSHyfTZAKZeTV8QKT2ia2TH5I0AaAEYTfgFkScgO+SobI7i4WIfikKebiDSQSTwKToBhwBuTPSdcA5SeMSXCTfjIiYKSdSaCTIwACSUKcRTByc0S7ySYDxbJDYRyUOThyWOTZABOSqcZKTpyToAL0nOlr0g4TscWRSCcUuSZiauT1SUiTNSZ+lJRjuT8KSbi5KbniQgOGS6gBySYKUoTWyYJS2SZOlwAAaBK1GhS28e8SdKXSTFxEZTYRlJTBcTJTF0g4B8gJORkGNqSuKY+SVGOGBzgN3jDyZxTFKegBbKdUAHKZCS8KaWSXKcnj-Kf7iGAJ5SUwCqSzidJThcZOkhlDgplQE5TcySZTlKQagaADKAGIAxTKKRnigqfTZOBpek6SZkBLgP+TvKflTGCWVxGgIFTqKcgpuGvABAYIcTLYENoqqcoTmKV5TgbCWT0KeOSqGJOSwcVKSZCRKNhKTWTeyXWTS8YqS1AMqTYSdFTrKcLiwqdekkqR+TDCZWou4ueRoSa2SwSXRSwqRFS7yVFSa8TFTBCe2T3gGITWqUKTvKdhSj8QSNwwBZT58e8TR8QdTLqSVTcqToBf8WQTzqR2Sg8ZpTWKbaSwCYfi7qe9TQKdATHqRgBfqS8SwKYDTORnIScSK9T3gM1TkqXTjkKZcYoafdT-qc0TWyYBTfqU6TJqbtTpqYIS4qaoAR9M3jiwEyTd8Y-J0CpWpXcRKMrqdETiabkVyaRiNKabUTkFJhTaaUWktqVvjPqexTUCZ1TuKd1TeKVOTIgdEAnAXOThqQuT2cRJSdqeKS1ycTQekUgB5qVzTGaTTSpaebjMydmSHqdVSZyQrSXqa+STQBjTTqS9SN8FOlBqcjTQ8SdS78VNTEST4T9ZHsArDLLTjKXTiJgFEFFDF0AwyVrSBgPTSQCbvjQyYcSXadWSjaa2TFaZ7SXyWCptaarTnKfTYbCDrigKSrTfabaT-aU7SvaUHTiGJETWyfLi-Sd7TWafeSwaZbjA6chE2ScrSQKV6SuicoTxaXwS9qbgBTcV3EZaYTS1qR+hA6W+SQ6bDT1adAxyiuETy6fGBIycXSvCaXScAMmSCyZXSpca2Se6amS06fXSFqe8TB6RUS3cenSM6VDYOqdIBXibbS+iXwA2ADQBkcSM11AAwAORrwBxcSvSC3GvSEGErieidzTqbEoBV6UsAEGByMIAEgwiQCvTvAZVShqRAoaRpukCcU4BeTiEBxqYxT-scaSN8dQTp8XgAgAA");
crossex_html.replace("itgversion","1.20211108");
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

var crossex = function crossex(element, data, options,widthid) {
	//legacy
	var ElementWidth=0;
	data=JSON.parse(JSON.stringify(data).replace(/\"null\"/gi,"\"\""));
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
	var mycols=[];	
	var hide_panel=false;
	var editable=true;
	var exportable=true;
	var new_signalsString = JSON.stringify(options);
	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		for (i=0;i<repSignalsJson.length;++i) {
			if (typeof repSignalsJson[i]['hide_panel'] !== 'undefined') {
				hide_panel=true;
				document.querySelector('#cc_panel'+element).style.display = "none";	
				document.querySelector('#cc_tab'+element).style.display = "none";
				document.querySelector('#cc_tabscontent'+element).style.display = "none";
				//document.querySelector('#cc_graph_container'+element).style.border = "none";	
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

			//if (!repSignalsJson[i].hasOwnProperty(name)){console.log(repSignalsJson[i].name)}
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
						if (ln > 0) {							
							if (repSignalsJson[i].name == "Facet_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Filter_Out_From" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Facet_Rows_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Facet_Cols_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Filter_Additional" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Sum_By" ) {
								finalheaders.push(element);								
							} else if (repSignalsJson[i].name == "Size_By" ) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "X_Axis") {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Y_Axis") {
								finalheaders.push(element);
								if(ln<10000){mycols.push(element)};
							} else if (repSignalsJson[i].name == "Color_By") {
								finalheaders.push(element);
							}
						}
					});
					if (!finalheaders.includes.None) {
						finalheaders.push("None");
					}
					spec.signals[index].bind.options = JSON.parse(JSON.stringify(finalheaders));
				}
			}
			if (repSignalsJson[i].value != null) {
				spec.signals[index].value = repSignalsJson[i].value;
			}
		}
	}
	spec.data[Index(spec.data, "columns")].values = JSON.parse(JSON.stringify(mycols));
	if (data != null) {
		spec.data[Index(spec.data, "mydata")].values = JSON.parse(JSON.stringify(data));
	}
	if (add_css) {
		var css = itg_decomp("PQKgBAsghglgdmQyATJat6Oa2sJgCgA6AY2LAG98BIAWygCcBzeALjAAYwoBXAFwHsA3NQAO-AM4xeMfnDb0ApgBso0gG4LhVDfWnEoSgLQGYjOWAEitIqABNb8Rm3YiAHhzcf3L11oDuMLa8ABYsAIzs7ACkWsEKpsG84ZEx1ABmsryGkgBeCmxhAExuWkrwCoZxCUlFJdQO4iIqAJ5sAEZK-MQA1oJU1MT8nfRsAMRhxGFphVDCAL5EpAD6jPRQIsEU1G1QPav83HC2bLxrcI0MCnC8WnRMrBxcfELUd8xwhh1d3dm8DEleW4Md6fTo9QxXY6A17A+CGeBlOAVcR-XTOOpgTFgNr8ei2BT0QyWQz0aokuwwbjiNgAFgxWJxeIJn34vAENBJZLWDiptPpmLecIR5QhR3RvnwWLAgo+lnFwilMpZbP4NHl-SoASCoQi0Vi8UYiWSevqMEaLTYaSUCl8-QWJGIKzWGyWg2usCR9C2msCIQKKQVWKqhoButSVB2e3oBzFYD8wSkmlEdgccCcxQlUsZ+MJOJVHNJIfJPOpYDpmYZuJzRP4Ik5Re5lNL5cDmOzzLz7LYGbA4iGgTAowAHCPW9iq8y5RxCABWTx9sq2QcAQVXY-bhMLRrAPYXA+Ho-wC3wIkIUkYEJoGy2Uoy12yMDy-v5YERFWD29qEp92pYAE4fDHO8sjSKAaBgJRWjAAA1AlbCgOAoAAGjAZdSQMFDxAQ8RsgJGA0iAzJDD8A1txxJRbDHQZhjGCYphmdddm6fZDlsQxqNxMZSG44gx2tNlmQuYhHGcMdeBtLITDMNhiCucT6DHJUvnBFF-jYAA2F8lLBH5IWcBQaEU2EPmFJFfjU6FFWM+E4DfUUoUAo9FkdN0-nKL1KCoMRJGkWR5GUVQYA0LQGiaKAoNcuTxDAABCGAr1xP5ri0HQ9AMYwymkixay0HFXAfHIRPHJlc34b9QotSLrnEfxfVCMAw3mZzXUyD0CRYKA0nk70qoBAByPqQrNMKIsyKKtGIa0GHaVlgiawg7m6aLPK1P1GuoD8kh4AR5uWP42hvBkmJYo52KGTjBx40h1wnQlrS65xZ3nfsl1GVdlxukrlS7ac53cPdXvez7qyndgnv+l6VzXSUsVW+qwiHF9NrYeA4lJG5qFrXYpFaMJgcnWtDHurJG15MsXw3b7VSJhQuuLJs+QrAVjNEmHMRyGz8VcApdsdfbxF6w7MThthwI+XrGKjGMoVGBQ5fl-HCVB8He0ht7oYjW6aYe37nsXKGPrZ4rq07anifpsmW22LXTbVHc9f3IGjY5+Aue7Jq2j4AQ4AdJZ9sRJaAD54sYb0RYaq2vJTRx623SPTmwqQZHMMH2BnGrMZsYTeFaMGAHYZ3mfpPZVH29qgDp4CWlhgn4HRg5oUOVrq7tHKoBPziTvzpzTjOqCx7Pcaa5r9uxL3ZCFsAKvC9odMl5jo1Ys6aIsM4LkUZKjcp23tZJilLYprXiXN0nm0Pkq2DgWQkylZGwAAZkcqUDl4N9L+vqjuHoPsRjAMR4HkmOcOhQn5Yg7j5ZOj1e5jhsPYIqbcZTigap4MIKC6gLBLt7Qgux1AKF9v7Ku4gG5NyNkqYmjNaq-gan9LQA8cbhF5n7CuY9S41zrgSb0dCc4MK3sdRep0OK-1lnLRho9MGyGwcQXBk9IwL2lsvC6wib6wxbg1AMRtYGpicJZSsX1yG6whvrUYf4TE3XyuIYIdh+B+DYIYMGf1kHuFQd4TwxjTHO05jad2TkR4V0FpQW8nRVBsGJjA6OaZuwUz4fIwRYwFakJZl4JJPgdHs08dzMAhcjagGNsyLcAJRgABFimq31s4wQuACBSnDmLM61w5KxXimIXQCEMbVNUSOF8OTKb6OcaU-cUBBkVLwE5X2NgkRKG9JomO+T5TUBqXCCWCT7gfH0YYR+L5plpljgCUBaTXZePvkZFZcyrIrJsnZPSqTpTWVMsiVEuykakQBKjPCbSsTTygnc0E3wxypRgPoIwUlzCWGHjkwwELIVQuhTC2FcL4UIsRYYGGxBoziHEBJGAIgYYQH4DmOAKFMqJBItUMAxB0WGFkJBbKQxpAiHEDDAAUlSXgDVugHTFvhGACglwISXIwQqIgRA8phgAAW2rXL0ABxWuFixVZ26FARgCgyVooxa4Ol+AkXap1bqvVMMwiEDAAAISgBisAABlHO1oGWYkKEawpMBFBSOTpAPFXKCS2ofkagAChILuCBcUODSNy7+Wq9URsjXqkZ+B8DgqjQmuFMMADaYQAC6JqzUqqtc0G14bE0FqhTG5NDAYBQCJhXZQabk3RmtAAPwALwACIBC0qxU2jNnlvIBv8ioXBgYFiYhTaW8tKg2hVprUMBQjaW38DbSIDtLAWDjoyIoJCw70IVvHUoattbp3NtbUoOli6OpdQ4Z5cBq67bgL7Qoe+tgAAU7AULPo4AASi0MRBQbRuhSE+ExUCslDBqDNDANoEF6FgATPYK4uUAO7AqCByQ4GyjcKg4EfEcBapKCMMQSxaZ8ir2wle2hWdIPsGsPwABzIFAaGqu-JEWhwE9q4DhsAagGAPohaiiQ6q6VEjXgGwwtgv6BVkChQgCNxBvvY5x7jarMV1mY75D4CgzWOBQmpjFNlKV8Bkxx+gXH2IKY1VigTicVPCYCs0F90nKMQO7hXBcfAkya3MY+Iq28ypaBdkcLxaimNryvZSwsDxQUw0HWADdZat0Tr3TOw9x601LpXbiFVnlZEnTYrkQjYYngCEaQlFpm8qC9TYE2ptA6YbRdHZWndk760HrnUe9tyXT3dQy9E1i8hGA7AfWEPOKEBtDcG2AQgf4P3Wy+qfChAxzpCLSItpbE0xrXDYKoU4D6R2xaUJNqgwECqEYM0Znj6LFOGAOzlob983B7YOySkMbBjvyd4+d+7zyUJX3oHQXbTGJLmfOFep7cnjOvdM0p-7l7cQ0E+9fPbWztGzgMg1Ay-gEziWyFnQjV8-DOlymVAqRVeosgrJFmrO3d1ToS81pLbCdApdpml9dmIS2brHXFqnTX52LtrvT9r57M7YzQ3jUQVH6mElo1FdbzwqtDrl1FzE8bC2FuoMmwoGa-UOcDe6kNnqYbK4NyM+XDX92zu59W+CfxQdnfB4YbtKmAA+TWF1tdS4ob0mX+FQi-koB9TbLdQBYPFJVChgDiDUIwAA1K4GgShBB4YYBi3gDa+BpEMEOJCUR74AGFw+MCiCAmPShzhZ8KQXwoiReAiCz8uYAwA-AN8IH4e+hBcSMGACAyIYeI-l4L+wOGpfy-300q4XvIDNqD8KIUL8vf74AFEs-Z5sCEPvIacOT8KEwHYBehzDb73vkBB-IjjYL3+Mf7AoffY39GP44kd-REKGfqfffbAb4gPa9SM4M+pxSCA7PhgwgW91IwgZwkIf8H804wY-x75v9CBIgID74aRCB1J1JCgwC4Df92Bs9CghxkDUD0D4C+9CgW92B75QCigMDCh99cCUDn0KDIgqC-8wgkCcDyD7UGC+9cCZw-waQCDMCP8v8+CICAAtcvYALPBfHPbvfPefJtGTK+EkBQYVVQfUaoDSOoH8P0BqRGb8JSVkH6GhCLarFneLLnFrF3ZNAPa3PjMze3ZOJ3WdF3JdTqDrGEc5W2AocpIw43Uws3cwjtSw1QctU7GwusOw2QBwywE9N3dLagS-a9NeW9e9LjGcaIF9F9PbDwtRE0KgfRVI1ITEMnEwznPwpLQIq3EI87cIuASI2sHndhEYZdRnd3C9ILaHE4RI1QO9R9QwfIlCXotwDI2XBXMAE3anc3co4Ikzfjao2opw-nDyOIto77Do7CJInovojgIY62fMf0HIvIk0Qo4w0Y3wxLVrSY6wqo-1FTZ3eovnFwgXduZYhItYro5I3otIsAAY1wbYo4+XJXA3BNVXe1dNMAAAFVrDAAABlaZeB9dASC0jcTiSiziLCrDKjbdqjndd4T0HjFinjiN2iiNzh1iH1AViAuM8tI8GoR8310j318ddjsiCiwAijkTGtSjzj0TpjbDrjk5sTiY7j2oFjvR4jViSS3jH1yTKSUgwBqSwhaT+i-pfjWTjiYYASESI1gTCB1dwTISAAlaoeEzUqNJEsYswso7ksHGYvk2QbE-JXEs9fEsU4k8QUk6U6IOUr4hU27ek9gTI-Q1UPYlktk80zktEoIy4zE20uAe06oIUxovE0U548Ut0yUskgwCkz06kgAxUr45Uhk7wkY9U8AE0qNbU++DNY1QMmgY0ss6NKpdk03VEgIq0m3G0rXBw22aI5o2IiMLrWMH3P3APIPOgZVaQ6PWPePSxb+BQZPVPdPTPHPPPPvIvEve+MvKfSvave+WvevRvZvVvJgDveA6Q8-AfDcofEfc-CfS8qfGfZ-efRfZfYIVfCCJQa-XrKAHfI-X8wbPvKA0-c-eI6-VkLon8ocCAhGPvdSIC5-EBV-O8wod-ZAwQ8Avvf-QA5AkAoQvvVI8bGA3CkBRAvAtA9Cv-HA0ioi9gYguAsgpCegmi6gvAug9gpipglgocNgygzg2cHg6igQ2AwgkBUQqfcQp8qQlc2Q+Q-gRQ5QjGKgO+EfShLQhGDQpUKcQw2gayLIijIslNU4mnLkyMjEjsgNLsmsx01w7S85KcMILwv4kYsMlsi3EynksImMiy-MHs1dPsl0m9dMj4qIfoiIQYwszWJk7aF4XI2EtgfIpjWsYM4YgylEoyiMio9yu3Ty5tbs5LXnYUmI5MwklY100koKv0ybRylKjklyi40y3kzsnKyytrJM1o4ql4iU8Sd4zYgAnwbY9uRK5k0oWKzJQ41Unw1KiYts0IrKrXJq7yvKho5wp0oqwHIkgKrqjYz419f05K-40s+s-VKgNXQgGkKsms6E2Eusw67VM0wyqaty60hqgNea9kHElqlatqtakqja7ojMpQCk3q7Mmk3070vq8Kuy9RKq4omqtK1sx69s56m4ptHeQUxa+4z6pY9q1M90zMmU4Gn01wOkrYws6GkYjUm6hFbUmcc6-MMAQ0kMa6ymhFO6ya-w1yjKp6jyualGmsnZKyx4-yzoza-6rMqIL03M0G3qsK3auIwa9aMm5yuGjmqYrm2al63m-Mfm9G4U1qrG76jqtMkWj08WnMwm4mnayq8a4sxXA65mxFbU9SDNGErqJm+22FVm2Gh6zmxG7mjWtGhnXy5nJs8Y9muqzKrEptAOkUjLGs6XHaagfRKKrQWZIaxOkUO+MIVHOWkQOKnIoW14kW0Kn4-M7aq20M+6sO6aq4nm6OwqzrKWbrMAIc-3II0ckPCcovacxPOclPXgNPDPRfFcwvWPdczcivNkHcvchvPwJvFvNvE8rvYexg-vOqDfB8le288e4fNwWfSQpfVQV8kBNfD8pCrfb8nAv8zPQ-f8zvE-R-YC540C2-BQHfQwACagz+h++C9gRC8elCz-ISzAzCoAnC8iyAgioBhApAlAsijAiA7Amg-A8B2i0g7ijgw-JB1inijinUrihitilerg-ilB1CqBvvUSwocS-es86SsABQxQeS1Qx7bQjQ8OZS9OsyZGLOwyNwkEVOrSvQpkvSxWyuy0hGmayO6OvWmy-htQhqBy626q5s5W8OtWqR2EhMwOpnZR0O8Rn2yRmM5tAO-KxMzGgkg2nG9M19cq0mpR-ar492qm46+1PODNBmxIN2pxotRspW721W329W5Gh013Xs4OvxquiRmujWkJ5a6yrI5OxOka9aAa3O0a8MAuzqv66Wku2x2W0Rtm-RgJwxnm2Jpo3yj3Ac73egX3Vuv4du8cvPScuPBPWc+c-uxcoenvEe4vcQDfbcmvOvGeueo89vTvdgM8n+i88ejevvLeq83ex8-el8t89fM+r8n82+9gK+gC++p-FekCs+sCu-HAj+kBWC85uClev+8vABtC+BjCgA0B0A8B-C6A8h4imB5Bh5iipBuB4Smikg+ixilehGFighnBrA5gvB9B9i9gYh3g0hwB6iyh6hxfWhufOQ+h2SxhtTBSzOnQlS+qDh2RuEXSoEc5PI+kCuwp4ygx6J4J+Mj66yshZJxRmlr2yJ+l6M0pplunAqsJ3Ri0ul4phl-kptWJ0xuJwWlM0q9MyCsKvJ8u44im7xyFVXSsy1R8BQLxtVwwT2lR-xqM-jHLZtcQH7JQAW-E+MRMTHBDFGOAJOAwIltgBV0nY4iJop41szU1ptGgHlSkGgK1sOdHZELHB1p1uPeZVREA0BDlw1rl0V23X1lQJgBQYNlaUNu12SCN6QZ16NqhQodSON2NTEFgaMVkb0F7QJ5TZOYTUTFTR6dOT9b1pTQTSzLTIqLTCoOEF+Ft+qusS7bV58b8atma97eR8iSiNmY8HJDEpAbARdpd5dlASpIgDQRgctAycdJcBuuRJu8BGwDeDGBYBwNQQgDd8tcDI4b0RBRxQrZpJKBShHJBPpOKIrJ9l15kh9xKVpIac0GebEHSH94rBS8SDVDKUwcwYmEDz99IIiHLEd2Dv9pyM9i9hQTdz4V2XsZQBQKRSeIdp8NRTwd9x9lD+0S9rD06RsfgMAeAEQPgb0Qj3LFJUj39zeBYUYCPGsedCEa0f164b0JDMDCDNDaDTDawcJbRfOZHNj0D0oDO55R6P8WTppdj59mMy0GAVwHlZDkrXzN2bIvS-bIiUCcCSCNgLCc4XCUkAieD+8RDsAVwcxC1vThSymGbB+DQvKbISxWwaxSJdwHscsMAc+p9P0l9STTIqphRX+MLwoGcUAncRLlCBLpLqAmcAMi+e9gGQcWwYgfL-LlbFeDoJiYeNDyj69pcQOV8OrMAGr+jvgZNHOYVA9CSDtSedh1jtT+To2ZjpDuTuDzj7j1EvjgyBpf2FVU4CwXdzGHQK0AL9DGDBAQblD9uf7BohbmxMAZQMoelM0NzyTuBbZZWBxVbkrBHKmO2exEjnrob2NCrjDq97Dmr9nSZBruABj3gZr5oVriVhCZVDrzyO+brj9tbr9H9P9dYZQs4HN7FpEQ7vhh4FJTgc7hSrr27sHjj-AR7zDqr+r2r7dAn3H57m917urj7r7n71rs4ZVZLDIYgKkThPgN+eHlVNHpqRr77lrhQBtWnhQNrCH39LIN0wIPJQ4RCDoCoBOHoMOVRYtzHsjkrO+ELjngYL+H+Ngf+cXRHtzXzqxbbvpI31xVIxLmcbPXXz3aWMYU3rii3tXzWabfeUsEfS326JBXL0YeA+AxHhYLn6n3n-nwXkiSHkXxcScYIbgGgA6WO8xPzxblHzwFJL3731Hu7tbjcD3tWVPtPrH-FpT4j9wB39hxX9T-HJ3ksOK0v3r-sxu2MUYGcR-QpOfMIXXxn7+C6bX7qB3oXqHoVNTWH7Ha+XXjSwa9Zav+7knqj6rwn5QAn-3nnvngHgXlgBn3kFgXvsPsXzcCXiua0czWXvdrLG3tOO333nHoKdDvHl72f97ujz7prxfoPpdQwGgfgDmfng-7oOXqhBXov9P5XgX1V4ACFK7fTXn-DFzd8QBcGOvjLFt7m83eFfBmGAFd4O9M+SST3jn3P5T98e5PInpT0f6-dA+y-QXm-w-7L8iQkfaPh7gJwWIDeSCRPu4BT7e9EBOYLPkYiwEO9M6oPJXuj3l4T8M+WsTzmd2gHbAqmNvJvi3zb4a9O+kAjhGr1PaX9KuN-N7vPwf7c8iBS-AjKQJwgy9v+zcX-jwLL4bQgBAgkrGANkHUYvQaA8Qa6SPYNI0BWsWJHYMuCCcHezgw9q4NZQKCL+57ZQUcEDhvdA4FwBAAEixD9dC+iPW8KZzAgQQoIVnHCBils5RCsQ-yQFJByyiWAUhmIaor2kCgaBshNyE5MkiT6lD-+efKiPNht6JdsBSgp7tP0CF1Zgh4yFgNcGCDsQEwFEB9PfBkyeQIhxdQoQdjM5xDLO2EGzvhF15pD0owKE4JCQd65DQuAUftEj3MAgEyhSSHsO4KqGDhi2ecWwEOAOg+CcBKginvfyp5P8SBL-GgDhBPpExrEjxK3k3Qb6n8EBjg7LikkwGp9WBeSZ3gUE2GiC9edA-zobzQROITeacRLvb1EGKC-B9Q3AbfzUHnDNBz-DftcIuzvlDA3AfvviUeH194BUIioVNjYEYDs+Xwt4dWE85fg3ecfegfe2N5MDTekI2obCOv5k8ERBAjQTT0uGojdBVAmPisJrBpM32AInzkCIT7rDk+nAkUe7xJEcCyRAI7gWYL4G-8lR5fCkb8MySqixBsAiQX+Gb6t93BMg3+F33kHQjfBV-UnjP1UEciA+Wgunqvy6Dr9X+NwjEZ0BIg4jbBzwr-K8LNHHC2R1os4YQK5HaCHRjPakDyPRE4ZMR2IypjqMHD4jz+5o-wVaNOEL9NBTaQREDxMHyMoq3wwkOHCMG9cKOcI12I4GWimgAOXyWyCKGUjf8fBFo6foYEQj+tRS-2GYa+FhK68J2LDL7D9l15zYV4DfGofMKk5IIHenyB1nZFrGJi-RS4DFNaHw6eRN+xgfvgwAQhw8BO3AMoCiF16v93+K4mHuuMIybjtx3ggEcCnhDiRrhMkOSKaMJFUBlxugIwLdCKidBmAgKXXuB0kiZRzAskHXjYNgGxdZ4TEXXlwighgwhwbfbYaMHsBLgHed7QsXBxM4Odh2kQ4vvL0QlrcJxQHb4LrwWGKA+0QUdngCM8HHts2Q-XHOsE-Ebd5ubotgLtyxSSBoo5I5kOHGFH3jw4XFLUY72rAohc0hGXLixMJDOCt8-Wfig1HElhAeCMmB3ptzolLdMM5-BsVV3pi0cueTHBDqhIGFHC6hrIlMfgMDGcjeeGYuID0DyhZja++7ARNsPgCRtdeio8obwImhGi2A+IUCFuLPH3joeA-I8TJFMnsoyoXYoJACHyTUjCcESXJKVEcnGDSWqw7iS+3v52ShJubMtJMh8E5IwSe-BQNFAXYrs8p+U1djGhyQ+ogolbAqeVLylrtCAIgNQLwAACqMACwFlI0koSiOLnAwFG1KzQSc+ao5kNRBUD0pCM-U9YBii0BZgZRfST3viAUCFAFA6kLQP3FomLdxOsGagOtwg5yTFuDE-bhnB8TVTapDUigFFk0LwwAwUoMABEPak4Zepv8SaWrGmmzT5poyGqfVMamTcCeIQNTDP2m41cQgk8ZwaMBpB-hTeeceeFliAmDgFAKnWSHZ3GlfQAZD0uafjncyFQIpXmb8AlLBj3xFAvDdad+Kg43jxcN0q7oF36SvREZT0s5O8FZj2gXpsEXQFCTNCspyAcYGNjOBiCql9pvAZcK4DNDZ5Wo7kCTHTIMDli4ZxIu6UYigCFA2gEwSmUdDjGjBpgaQGcKBDCTHdtENCWpMAj2TSg4Qd8EBOgiIAvT9SkIAkJ6kniXcqWTMZukkNwgLiAQV8RjM9IOlvTmpv0nELYGaAfT6Av02bjxPag5d7pcsR6Udy0SPRsZ2dPGRkN-G3jrBZormYUmjAiBgRoQo2NhO+S1iYEmnRYYROChGxlxVIQSLhykQMZlEmIPcRzELmEh5xeHB2R-HzndBEgseTEbbJrkly2eY4Z0S3KLn2zS5xyamV5wlC0zapic2sCnOzxfxj2k8L8dHJCSwlFYBQB2K9ClkyziAcstsEII1FWwpQ6c6sWZEzkaJs5BE-IWXNZmFti6ZicKdonRlgyvcYwZbM7N4Cjzk51iOANBAMDcBYiUoBKT2EMLRDWpuWDMGJDbE-i55XUeaC9OfkpyAAkm6AI7BT5A1QSoYOJXmyyIFtUgABK4hHwjMncWUEni7ypxc8R+TzL5kCzPQr4RqWEJyGjiwAkEzwBwylCnjfg-EokEQL7lGwLBv8N-nnOHnczeZ4gfme6HciULew4yLmcuDZCLEpQy4meTlmMC2AAAViyiSq8IFZaQe+GkHUiqyt4E0peZdCHC2AaQd6NWWHPtjuA-5sMLNkJAol4585IfYXiyCQFkxLF5csgU4vVGV9NR1sjzhqNcU2ye5tcjhTIocV-oq5dsoJR3PznuLwlbcuuU7JkWNzeAzc2JcXPiWnyu5qS3uVEuPBxpwA2eC1BaiqnnhPg48D4CIFKnMyYY2Eq0DaEDC1L8oDgZ1I2zJRDAo+WGGGBEPNYdSCQgYC8YmGvFkpY5gYBKeTHcB5x6QvirxYwtaWDiNy8ywpIGFxEywH5G87Lo7OUSij4+23MGCF3zgOI+kN3dwKJM4CnKwAwAB+NECtpZLIlGywMAXNblpLgl2UbgHhmMAupu4dAR1gx0ImyBh4Z4XgBeHETlLKloYpnmEK2W0iUeKsPpGFx2p+kouL6CUZ4BbwOIwughNRBnh3DDZfoVtF+Kzz0rHgAVQKspXblBWmMZEtA7ZQ6yTzTg9lhAAuKCIMShdesT6R4JwAuWPwogVtTEPivKCswjiQAA"),
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		add_css=false;
	}
	drawGraph(element,spec,widthNode,hide_panel,editable,exportable);
};
function drawGraph(element,spec,widthNode,hide_panel,editable,exportable) {
	if (spec.signals[Index(spec.signals, 'Interactive_')]['value']==true) {
		spec.signals[Index(spec.signals, 'xcur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}];
		spec.signals[Index(spec.signals, 'ycur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}];
		spec.signals[Index(spec.signals, 'delta')]['on']=[{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update":  "down ? [x()-down[0], y()-down[1]] : [0,0]"}];
		spec.signals[Index(spec.signals, 'anchor')]['on']=[{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}];
		spec.signals[Index(spec.signals, 'zoom')]['on']=[{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}];
		spec.signals[Index(spec.signals, 'dist1')]['on']=[{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}];
		spec.signals[Index(spec.signals, 'dist2')]['on']=[{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}];
		spec.signals[Index(spec.signals, 'xdom')]['on']=[{"events": {"signal": "delta"},"update": "[xcur[0] + span(xcur) * delta[0] / Plot_Width, xcur[1] + span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}];
		spec.signals[Index(spec.signals, 'ydom')]['on']=[{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}];
		spec.signals[Index(spec.signals, 'down')]['on']=[{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}];
	}
	vegaEmbed('#view_crossex' + element, spec, {
		renderer: 'canvas',
		width: setWidth_smart(element,widthNode),
		tooltip: true,
		warn: false,
		actions: {
			export: true,
			csv:true,
			source: false,
			editor: editable,
			editorURL: "https://itg.usc.edu/editor",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		window.addEventListener('resize', function(event) {
			result.view.width(setWidth_smart(element,widthNode)).run();
		});
		//initialize instance

		var save_icon=document.querySelector("#view_crossex"+ element+" > details > summary");
		save_icon.innerHTML="<div id='Exporting'>"+itg_decomp("DwZwbg5gBGCmBOICWB7AdgXgEQEYB0OWUSAJtgDICGAnggPqFQAeAtgDZojYAWALrwAcAXAHoRAd0l5xAZjwp4EEQCYADOpHgIRVhxBCmbJGgDWPfsLGTx0uQqU4AnM5GHjJndlUCmRal58sACgASBgkWHEAIRQmLyhVKEcANiTkohBeajZYbFg0SgAjHIBaQsoAYxMIeBQAVzQSITRIhLaUtIBuHXYhEAFK3KwBeFgQBDgsAD4g0CycqCyBId5YJl4RCpAQadC8TNUAb0zak1ghAGJ1a9VOk5QzkpYkVfgjZ94hHFuAX1DQkL7Xg4Q4AMyQbDYzXQsDuvFO5yuN1u90e4lIvG4QhkcIRJSMLQqlGEtQaJFxD1g+OMsAAVihjEJCrA4GwKY8Pgh3i8hMp2VSSJQQNxKPB4DQhABWTp-QGZZTHeGUy7IlFKtEYrE41FUzlvJAfL6-PaZGSKhEq5H8krokiYoQAFmteu5n2+MpNvAdYIhULQMP5lpu1tt9qdOqeLy5Bp57tlQMlPsh0JagaRwYjoax4fVVIJsCJJPqjWdUf1hrjnuSYPQvBKoMozzY1CEAHIAILwJCUNglKJsSomVseuW8ADsNbQdeQAC9zjgABw+EdAheHHL8BAlfqVYwQL4e4CaeawGbAUYVXjMbBjxx4B1+bAOhdECoD7bYA5ELNPghEbiwEgEB8NgOByOkIhnhAMwhMAAgoM2EDoFA8HGLwXBYAuyQADQOvgkpJPgjjYZKcgEVh2HJMkeALlAIRYJBoRwZQmJQGQWAALILg6eCSthMgOhUJSqDR2GqCU+FiXgMgSbxUkLgAamOygVKoUljthOCaQQ2HKNpOCqaJan4GOwnSdpjhmQubBjnglk4LZjiGTJIk4SJMn4Hp4n4Au5AUQJeDJACADCC6SngGkBXpYU6QJ2HcXJAl+TxfECTODFniI0GzPmUBvkKGGZIwTA4E+PHKH4pVYJK1FjjoyjYMkPHpFA1ANVgyg8Y4GWzNlsEDKx7Ecckd5aU4FQmWJ-HaTI00yGAyS2QZxkRbJs0yetAASC5CZN4kedJJQbQpygqd5EUzUd-FHZtI0EFAw2jZpY7bUJyhGSUfHvcon0kQCC1Lapumid9JFg5K3DJPgBnvQuU2SiUoMI5KJ3KMFY48WNd56WORHPZRT0OeQd1jWO6WMUe2XngWV5xFgDqOY+WBjrZkqvu+hW8BVUA-h1EX-oBwG8NgC7ST11OXte1XUTITO4+zBWflz36atgsMC0BIG4F14sXrToE8S+rVq9RD6LOKnCggoLDYCwLFdkwAAUElQLJp0Ok1Y5UjgqSeZ1nve6kLsyCJTiOMoUC43gyhODgACUCsflgpoq3a3BeLxGtC6BouyxTetSzgJlMzIjD5UnKc86rWDUWzUAAZrwvVfzFOwJCSACOMeUc0r3MVHTDOBa+-hYDId6y1A8B0-gLXwCP+APq37ed7AeV05KPF1XlI+l2Lk90+BRBz9gch52ebdGCv3eK8nytr41fc70bU+gTRR-zy35-L135ec33A-hSNhUEeg8t4v1wEPSeH82ZL0vj-Hut9-7YElLZM2wCny1SPnTd6E9j580IBTPqzFBrYA4k4bCY5qJOTUqHKSWkRJeWjlJZQ3BwoyEMvQ5hZl6HRzMsoMAR1pKqW4SIhhfC+HcE+kI7hYk+F0LkQwpSVD0oAkYv1Fi3Br4Vy9EQIa5DKF2SBrQ4xTCGHMNYUI4xXCTE-QYQI0+wjQ6iN4WIhhki2EAiEsYhRBAfHKCUXZcmmUqZEIGpooayg7zERimOIxOkbHMPMZKDhU1XHxJcdHexljnE4HEWklhn0vHxJ8bksxiiYlBKYmErRnMzYRKifFcKsSaHpJ4Yw9prCUktNseknp-DBHsPEk44ZGS+nuM8TIoZpjfFlOjgpCp4sspfzgavX+StVCvgHmgkeyQGFYNfrPD+i8oIwWIeE0hoscIxLiTwtpiS3FdS6dY3pfCsmDJyXk0Z20aJFPoSUvx8ymkqJCCENRZyalKzqRcwKjSIo3Lofc6ZLDHlWLSW015AzHEzOxX0vh3yFwTO8bM0pSLAURUqZTE5VSNFsVIU4OS1yWm3MRR0zeTy0XPP6Q4qZJKSW4rcSUNlkz-mzP8TEgElT1GsTWbfKFnF6V8UZQihJoruBstRRk9FdjMU8ucfy6OkjN6EuKcSgFCyKZLNmAXbBqCS6YyIPCSgltra23tkgJ2Ls3b+wZoHKAfsPY+okkHHAUBJRsLHDIMcUAsL3gdHGhOELb4T15iJOuDds64FzrrGmUtOp7yfpAmVldea1yzlrJp2bJZ0yavzY2Nc5DdUTfKVOmI1a1vTVrU64tQk0qGpcyijl4UqqRRYwZ8TnlasyTqj5+S8Wix2sK01oqFKLUCcEEFYLqlFp0bSzi-bV3UOVb0llo72Was5W8rFvLPl9Pxcav5S7SUHopZa4APaSF7phQY5pR67mqvVeOjl+TL26pGfq5Q+LfmyMfe0gJZN12gtOVuhBmQ5VcS-bVIdx7-1wo1T0ydXLskjL5Teu9IKoNTMYXy5hcGX1U2QzfTIdchoRt0vhAGBAgbvQdIjHSPEeOb1wvecg4ViLh2jpW-WzM5BmxAVmptvANlVzTr+RgHam5gSHhTVY6xzZOpAFbeANssB23hO6x2IbEiJBDT5VQHQcDhTswueOidOapEyFGzIL4pgAFEAAaAAFAA8gAJQACpHh07wTKWgZhAA")+"</div>";
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
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","LogY_","Jitter_" ,"Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point_Size","Min_Point_Size","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Include_Only","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Manual_Color","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Plot_Padding","Title_Height","Xaxis_Height","RowHead_Width","Row_Height","Maximum_Facets","Legend_Height","Legend_Cols"];			
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
					drawGraph(element,spec,widthNode,hide_panel,editable,exportable);
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
					drawGraph(element,spec,widthNode,hide_panel,editable,exportable);
				}
				return;
			});	
			//introJs().setOptions({
			//	steps: [{
			//	  title: 'Welcome',
			//	  intro: 'Hello World! 👋'
			//	},
			//	{
			//	  element: document.querySelector("#Layer1"),
			//	  intro: 'This step focuses on an image'
//				},
//				{
//				  title: 'Farewell!',
//				  element: document.querySelector("#Charts_tablinkssmartplot_id"),
//				  intro: 'And this is our final step!'
////				}]
	//		  }).start();
		}	
			
	}).catch(console.error);
}

function initDrag(e) {
	startX = e.clientX;
	startY = e.clientY;
	startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
	startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
	document.documentElement.addEventListener('mousemove', doDrag, false);
	document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
	p.style.width = (startWidth + e.clientX - startX) + 'px';
	p.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
	document.documentElement.removeEventListener('mousemove', doDrag, false);
	document.documentElement.removeEventListener('mouseup', stopDrag, false);
	var elmnt = document.getElementById(myid);
	myresult.view.width(setWidth_smart(myid)).signal('chart_height_min', elmnt.offsetHeight - 200).run();
}

function draggable(myid) {
	p = document.getElementById(myid);
	p.addEventListener('click', function init() {
		p.removeEventListener('click', init, false);
		p.className = p.className + ' resizable';
		var resizer = document.createElement('div');
		resizer.className = 'resizer';
		p.appendChild(resizer);
		resizer.addEventListener('mousedown', initDrag, false);
	}, false);
}

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
	headers.forEach(function(element) {
		var distinct = [...new Set(struct.map(x => x[element]))];
		var ln = distinct.length;
		if (typeof(struct[0][element]) === 'string') {
			if (ln < max_cat && ln > my_low_cat ) {
				my_low_cat = ln;
				max_cat_name = element;

			}		
			if (ln < max_cat && ln < my_high_cat ) {
				my_low_cat = ln;
				min_cat_name = element;
			}					
			if (ln >= 1 & ln <= min_cat & alt_cat_name == "None" & min_cat_name != "None") {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 & ln <= min_cat) {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 & ln <= alt_cat) {
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
	return [x_axis_name, y_axis_name, split_to_panels1_by_name, split_to_panels1_by_name, color_by_name];
}
document.getElementById("default_data").onclick = function fun() {
	document.getElementById("myccinput").innerHTML = itg_decomp("M4BwpgxglmwDRWAGwIYDsAmcBGUlIH0kw0BzAFwAsCBbGnPQjMEK2+gMyShHACciJCtTo4A9hgCetFMGAFScYGAAecSWBR8AsACgAgs25g4AFTF9SYPsrRwAzAE4AdAEY4rgBzOA7B8-u9j4ArAAMcDQoxHAATKGhPnqGYMZmFlY2JA4uwR4+zgAs-gBsDp7xcBxgkdFxCUlGMGmW1rZwBaHO9v4ejrn2MWGV1VEmdYkGjSbmLZl2AHL6cIvLSysr4w0pTTMZbfbFvr1dvd32BUNVNWPxE8mpu61ZTidxzqWujuEHQ9ext1sHuknnZ7N5HHlnJ5-IFioNhn9NpNttNgXNss4YscPn12sUQhFRv96sigbN9gU3P4qZ8zgUCRsAaSdmi2gUsW8sZ9wuyhoySfcWeTnvloa58u4vKV7PYKvy7lNmnsRVDId0vN8fHKlkjBajhXYCq4afkPp4sQMKlcibrFY90WD3rFjVzHIFyuFEUy9UqQQ5KaUYsbJY5oQUOp6bd67aznocPqL-P0teFrbVoyjfQ7vH5Pr1+hdUyN0wKYwb2jFnLk3rnHH5C5GSwrM-aKYVqUUvEUZfC0zdSy3Y4bA8bcp8iuyKl6B6kAEKICBiExBVVeE7i7sRhFRmdNefARfL-K5nP+b7FKc75tzhdLhzBZwQz6Y-wQsFW4v96972-L7xc7xJU8fo+kbL9AR-A870dMV8gA74PUJJsIJMfdD3vddwX8Px3yLadv1Q392k6M0nS8M5gl+K8ULgNC7w6KtISfTwcLqbdkOZQioKPR9qQTC1XEuT9iQI2iiIYscsI1bIqI4n0ABE+E0egXjHQ5cx8aEBiE-CaMU5SHDg6lJU07JLzkxV9JQFSckhMVPC02U8Oozi4Cs+gGOY3iuzMsCRL0pTrIcQ5O1rfptPY8DXPcjEOWDXpSiNWSooUwKVO8aE4l6b5QKQlLLLSisXzXSTvko5yLMzGKVxxTDAicyL-OiwqXjFFwgInYpkqa1KDIORivH8ASdJc3qgoY+z20+EDzPyqqWtIyTpVcD9dOagzwxpFxa0Src1rGlTc0OZj+niCq5tSaqXFItqeQvPzbXmjb4rzLwLV5PKeoKvr8kk7yfAhGI61yeUAr6hNvK+f0Rsqy7CvZV4XV6dwkoejMb24jEIZPaUwnO4lPBouiTAYoDvIc9oGunQnXOJ+8mOy6H8bqGmfTp9ljmrCoOm6lmiaI84BsA7DYi+Zn4lZxV2eNTtvBxQIU0+vnaYFp9fpKe8Yf7SXM3ZkjqTas5EOp-nMf6tSyICWJgPF0IdYx9CauOENuxCNG7dNx2HyO8n+kE237cg9CjURrbcnDWaCc96DTTyJNgtWndA644OXv-XosR593k7Es2QshDrra1qOVcxkOzQzmTs+j5cHwt11wuL5W2fEl72v8MMVur1zW2eB8n3jRnZSbiWaN7w1jTaqbQ3aQsldHnuhwcewBqfKGDkTksc-HjET2nnLI+bstlVBa7IVdXGR49xfywuVcpLrdp-fn6+fR3+w68hMd18VvsS7fpeCNJrf3DoMbuADb6dAHquN0hlN7azHkvFcropqeG7GLF+28kGHC5IcICOFyqNSPoOW+lYQxh2IofBeECT7+jIkZLwb42J-2IWSWhCM1ZkUcIlRWJsb60P6nveyOFEIsOocfP0H8trT26JOcB30gornVImT49Ur45xiiHbobx1SOG7IQvhB1grrlstyMoVDX4KJUsdPir57zwP-lYsoJjiqeDfLlQxTjHReVugnAOYNFHex6HEC0hCxGWKeuNNOVI4jhypknAJKlQo0mAv6BxrCmhXUtik3avNxGROscVfI6oWLL3SfkuGG1OiTUBnbSmFiNEtWFmuHEmpykRMqeNToJTV6JQ-vIgpy8aR4LyJlDB4TGkbRXgBVemcu6YJrvTcUkMLQ+F7MJOojhFlGn+P8WRazcjTi2aXR2x4PBmjOAkXI4TjktzNomLKZjeTu1uVLAW+QvI4m0Y4dZRzFkvD3sxfReTQivN1gLOW59ehvjdkQ+IYKHbQXTo89eGC-knKRSaGEDhxTXI2fC7Z0zei9HrD4Ak6K7mO2aYcb+WlzR4opW8suD5AzdORniCxCKg7QW2pCWsZxmH4tBdsysKDv71hiOSncXKU48qdDWdlTh2kytzsHSse9dGJSuS-FV79IXig7qLZViDyxKP+KvGFUqSy6qQUEg1jDl5XxtbfaJZo3wRUZSQgROCoVeBws-G5JqBFnOfG1LSeMdVBr9AxLkGlpRz0Dfw6NMtqRcwtCxQ50qo0OgfFyfuGth622dew-Wr1HAQgjC87N+wMqQnlg4SVDKs1JvRCHP6ui4mcurc8ThIZAihCdd2w0lIgLOh5GdSNLaa0DQ+UPCKiaaHRpXuQ10BCu3rUUYcYBpx7FFsSYZIWFrZ5Wv7Cq6qzTY5+v9L85tRiQ4mVXgfKtG6VIsq-oq3FcLhUvuIi+N47g2JOBPcSM9LUfaSQLMan9AKGa0grCC0DVSilbTpFBu9paGGlPOMBzZ+6Bg0k-l4LSA690-oYhpIeBzJ1GLNa4LdlcnKkZo15E8-QurPuY64rhPIwHUa8YPNcstNwEgXfxuy+YmZfsQ4olRzTHBnFhZ6zp1iC4iyCGhpxbbU3-BRhO9FABxEg5AxBiFVfREZrgiVBhRhG8JExDNoGM6ZumQw6OvFlHAYIvCXIOac2Zkmp5XAjrHbPK+9mjMmf8558Igk-2DS8xY8LjnIvs0vZSasglPN7R8xF5z4kaUeBXhlnkYShVJb8+zB8nYAzOhRqIsrehfMpfy0cWL2i8zBDYmtJreWy4r3VCvIocQK1bjs413LUWCj0di0NzLwRn7dYm3rbyK8-BBk6mF8byXevB2gQBujnmDE5e25Nwjq3nQbdtuV5rZdvDVflZZzzNsX7XZ2-RB8YoatBh4+017k2XDqiCUGPwwRnuLZO+zLkRWQuoy-X99mLg81-qDHAYo8SOI9cmz6oLjFhvtHq+Dir4lAsPgAzELEwR+kva20TzGYRiqUna9CBL7t4fiVJx4dLzpch4yuzTm7wcCs44y7I0bDXdCY-ZocQHqogw85I9TiXS3xKVifMu7n0Xfv87eyTCzHO5eefmYTgX9Euc4-a4leZoMlcQ-EiojLPP2OK8l8ThniM7pa5t7T9CrmHzaKypREFbOy7FI8H72I5PPO8eNzroqn2-2gvaL-cXLvmU0i53EEHCuxte5NyYYIZ8DUxA8xeIP2v-vp9lwHgNQqaap+Dnd85rwA-Za3uXyHZFztBlkblCZ7fxKUmSe1iEnWQV1+V2XTsK9WVhip333PseCgk6OHEZnVO+H1-ouqwrK+6lOHUf3suhfAzwhZwshfp31xd5WvU-xF+EdkQyzwsfh+fedDHPm8nFOjtt-v+JafO+gMBqBQ4yter+72A0K8QBP2d+m++e7+YevE5OPOreCCf+k+K2iM3Q827S4+tuaeSOmUc26OaBcBeIZElIcUPIz28+ZBS+A0wW5O4QlODS4BJMHOOOs2PIYuG+E+b+BGEe8urB6BguDB7YwO7QoBvB+BwcH+4hAeCu0h3u9EK8YoUB-ws+uBbB7QhG1YChwhdBRKwuGhoWsBfBd49OnY4e5ORQge3cdB4elmsudSciX6eByhuubugMKOLB9h5h7BrW6h62s8WhIhFhjOiBa29g7gwQTuSheeOhq4lBzoFaye8Ri+LgYo9GxezB3mv+dB2Og+F2eIfIOoC8dBpiPq5OI+xsCSYRJM0OOOHIWU9IoRZB9OuYeh2BP+pB-hSerWT+SeB+9R5BVh8qPhemdRdB6csWJ+MRRuUxfRU2YhRBIOgq6RWOU0gxrRZhMh9E+qgYHmoOBhSx6sTR-wFa90bh2h82wyze4Q90fhexARUOsumW9IwxDhxU+c5O2BHiixzxkhleGWmccITa1qNxlYchcxWWCG2h9IU0X2rgmcVGia7RMWn+MQth6+zadBlIaubxKJg6Ix9OsEzezOVxBmSxg2nO4hg0U2UG7Rxo6oyRQYa+66dBZxs2mcGaUmkJWKORh2cJIxCJH+zoYYveQqxy7Roqqm5OzOqBIG8JhGGeyJQxpGFRA0IyNhnmcRuJSxZulIa2QW+OxJ6Jq4QOMQpQnWHJSxLgYxRBiUPymaEJIpNiOOJ+PJImUp8JjenBeyeIN6rpTJdxehPO0e+pgJ9BYpQYFaNBPpJJ+aReMQFJtpUZDCn8BuIB3pVJUZ7cmW8ph2aZHh-RA2bxPC8I-I0pSx022pc2EauZJZIcuYRpMOaRkZJZlOWxbxI+DZHZCRBQ-WnOJhFwOZ-Zi+zS+uie5Uz65pchcU1pE6aJdpFpSBQMnm-xwZ1JA0uazosiTuy5gJtxFs2iRxfZW5UZhRMSwBQQ4Jp6NxHBhxzBYO45k2ZuQOwBvJVZvpq4VRkejxk6nJxU1+E4zpfJIx6wawUFqwSpbpSRiM4c8ZjZCRlhkREeFOimr5lWbuRBFO6xWF4kLge2e5WW66AAwpQFAGgMAOQHwCgCAG5PDELrOp8KEp7hRVRTRXRQxTFK5qYtwr5IrhxdRbRfRYxQZLcbosVPJsFGXroMJVxWJZolVtSCeOGkGVFApaJTxYVJ1q1pkSSoZPCGtFpdxeJeNLucsmGlXHDnoKZUpUxSkkUlpLxjnvZTpRJcydSKuoZHJe5eZR5KRGvOHDXiZZRSJWZbxV5c+GvFpHkZpeFYpR5eNAJiojJbhLZfJYldpQFYbrviYq7DhkyP5ZohpJhMmOxdlZFbpTMgBqELpn5VVQ5RtEmRKEPF5neU1CVbpQgc+Kyg1aznZU1clfQPTtojFo-DKIlkNZxTlbxWSfZArJVbNdVRtPnC0kPAmuLt1RtIjt5RJhHINVlStc1eNJWEPtihvHzsdRFadR5N4GOGcbAucNNTdUlblYOd8ZbGtlIS5DtUFPTrVJ2OlbURxP9YFa1ixbiFNddeDVHsSp8PWAtn9cNblfTn9ENhUC9XfnDSAavMSOYt3LjetWlUtTjajbxZWJlOELEjoS-m9XNfDFAk3maKxKEXDcEKydUjprfufrjVCU3ieDhHPmAQzatQDWTNTbIgsb-rjbyhtdNH4nzRTfDGcdNuWoJfPrjZet4B2mUMMRzRyJ0MadQcIcTd5AJj8rEO2bLSrRJY0URf8OHOeWgXLZzCFvvkTXbSlchpJDhAeaLRzczc+CGJfF7SdSNYkY9QlLutcWLXddFv9JDNKPiJ1bhvHZHaSdpnECjHPOikHSaJDN8Dwc2m7X1c6JnCQbBRzaOKpWphGa6XLauKHp8FpKneBbjdStPO6hpdXd7aNSmnmDnTZfnf3YkWVbomcFcYmgXbWLvrIooaXWPQjI9ZhMLcSYbVxm1DhHnUvRHR9ZZZbYEK5QmU3VJbUgvcKQXTMtTemuRcvW+s+MDfor3enTXZDLjqENKJufeRnR9bWULG+AHaPfvcpZDRJj8KRhzR9scNTfWJMY3cvY0cLCEmklA8vYXjMelWSi6b-QXW1DDjLXg2PfTjMrWHFWOdakAA");
};

document.getElementById("graph_button").onclick = function clicks() {
	toggle("myccinput");
	string = document.getElementById("myccinput").value;
	var n = string.search(/\t/);
	var struct;
	if (n > 0) {
		struct = d3.tsvParse(string, d3.autoType);
	} else {
		struct = d3.csvParse(string, d3.autoType);
	}
	var headers = struct.columns;
	var axis = optimize_axis(headers, struct);
	var init_val=headers[1];
	if (headers.length<4) {init_val="None"} 
	crossex("smartplot_id", struct, [
		{"editable":true},
		{"exportable":true},		

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
		"value":  axis[4],
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
	}],"About");
};



