/*! itgz compression */
var itgz=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return itgz}):"undefined"!=typeof module&&null!=module&&(module.exports=itgz);
var itg_decomp=function(text){return itgz.decompressFromEncodedURIComponent(text)}  

document.getElementById("crossex_app").innerHTML= "<style type='text/css'>"+itg_decomp("PQKgBAsghglgdmQyATJat6Oa2sJgCgBiAYwCcB7AZ0oFMAPMAb3wEgBbKUgc3gC4wADGCgBXAC7kA3KwAOVGGJjk4-UjQA2URQDca0lrtKLiUdQFpTMLirASZ+gO4wAJmIAW-AIwCBAUn1uNFZuYl4+-rJQzs7wXPwCMgwJSYmCifoAZspiZpQwAF40XgBM6axZcDkZUGww6gCe-ABEAPIyNAgAylBwlE0ANGAAajSkzj1QgwCCpDCmg5Q9lLmjMBn6xOTq5KT8hJ7EnhnFUNIAvvj4oGDExGAAQuISCNivb++ouAT4MdoAdLcAPoAIyeyiYrGBO2cozMpCiMBElH4ABYyiwKjk8oUwujMWYHEEuCF+FD1M59MCoMQANZcCgiODOPYAYQA7Oz2Rstjs9gAxAX6GRRGJwOJgUoMbypSVgaV0fRieg5MTw3pZUhsfgiGTtUgmWgbESkSi8sByeBK0jnH4wf5A0FiZ68NzkQwQlhU2n08iM5lgQgADgAzAJAwA2Yo234A4ggsFwP7UnQ0D1eukMpl7ENhyPc7a7AMCvk2q7gAAiWigYHgMnEYGc8K4YAAZA2KDIkB9uz3Pnh8Eq6GJODQoIQ2PVbrXxLHAY2oFw3aMPb6xOp4EUJalxpRAs4AzmI1HWKv13AaGZyBkMrRQmAzGiFZDqRnfVmAxk2TQaBkAKw2oA")+"</style>"+"<div class='cc cc-page' id='crossex'>"+itg_decomp("DwCwjABAxgNghgZwQXgERSqgfFATgeyQFMAPCAETgBc4IBJAOwAcBXK4AenCwChgAzfLgC2vCOIjAqpGriK0AlgBM0wgJ4YFzNqghN4UIiHwwlRXGgAKiaRADCAZQBqAGggAVZ26EQAUg4B5ADkIJWpaEHMiCEAUAggfJVw4AHMIOAYlUIImNIh+BRgiXQQqNUK0AHdlKhAALjAABgaAUgBuSIVkkCpagCYmphJWwQYqAFoEBQAvIlqSEgnhOBgYVuxOaRJZeTEJYC1WKghSpiI0fMLdZTQMC6IDnTSMIiYqNAA6KAQANxd3qh+fyoWyBcAARn8AFYIfAMYqlcqoJQKBD6OBqWoMWFFXbiYDI74QEplM5IlFojFaGBaIhjfiFEjYHgSFmSAkQa6oZJJJggAD6YLYVFhulgiBQ6CgAqFsKeVAU3xxAHEeSAKOFOATcaz8QqOSpUDB8HAlHy7qL4EgblLBVRhXCsAAZY2ZABiBSImoV2pZusJnLM-DgLBgVD5YRoFvF1uldpFTpdFCIwnw6poXu+Pr27M58FwySI4eT+CjVslsft2GdJogAFYALJJlMZrN4nMG2DyXB8qD4fAAawURAQpYlGAr8bshTguAgDiIdq0yQQLeZew4Wr4HEEIl4wDBuD37LFZbgGEy0LgVwNAEEwfhHsTEVUlDVahBGi1Wkt81p3w00jYEtdj9fU0AQH8qH0fAw2UXQsFXVcgA")+"</div>";
var crossex_editor=false;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).vega={})}(this,(function(t){"use strict";function e(t,e,n){return t.fields=e||[],t.fname=n,t}function n(t){return null==t?null:t.fname}function r(t){return null==t?null:t.fields}function i(t){return 1===t.length?o(t[0]):a(t)}const o=t=>function(e){return e[t]},a=t=>{const e=t.length;return function(n){for(let r=0;r<e;++r)n=n[t[r]];return n}};function s(t){throw Error(t)}function u(t){const e=[],n=t.length;let r,i,o,a=null,u=0,l="";function c(){e.push(l+t.substring(r,i)),l="",r=i+1}for(t+="",r=i=0;i<n;++i)if(o=t[i],"\\"===o)l+=t.substring(r,i++),r=i;else if(o===a)c(),a=null,u=-1;else{if(a)continue;r===u&&'"'===o||r===u&&"'"===o?(r=i+1,a=o):"."!==o||u?"["===o?(i>r&&c(),u=r=i+1):"]"===o&&(u||s("Access path missing open bracket: "+t),u>0&&c(),u=0,r=i+1):i>r?c():r=i+1}return u&&s("Access path missing closing bracket: "+t),a&&s("Access path missing closing quote: "+t),i>r&&(i++,c()),e}function l(t,n,r){const o=u(t);return t=1===o.length?o[0]:t,e((r&&r.get||i)(o),[t],n||t)}const c=l("id"),f=e((t=>t),[],"identity"),h=e((()=>0),[],"zero"),d=e((()=>1),[],"one"),p=e((()=>!0),[],"true"),g=e((()=>!1),[],"false"),m=new Set([...Object.getOwnPropertyNames(Object.prototype).filter((t=>"function"==typeof Object.prototype[t])),"__proto__"]);function y(t,e,n){const r=[e].concat([].slice.call(n));console[t].apply(console,r)}function v(t,e,n=y){let r=t||0;return{level(t){return arguments.length?(r=+t,this):r},error(){return r>=1&&n(e||"error","ERROR",arguments),this},warn(){return r>=2&&n(e||"warn","WARN",arguments),this},info(){return r>=3&&n(e||"log","INFO",arguments),this},debug(){return r>=4&&n(e||"log","DEBUG",arguments),this}}}var _=Array.isArray;function x(t){return t===Object(t)}const b=t=>"__proto__"!==t;function w(...t){return t.reduce(((t,e)=>{for(const n in e)if("signals"===n)t.signals=M(t.signals,e.signals);else{const r="legend"===n?{layout:1}:"style"===n||null;k(t,n,e[n],r)}return t}),{})}function k(t,e,n,r){if(!b(e))return;let i,o;if(x(n)&&!_(n))for(i in o=x(t[e])?t[e]:t[e]={},n)r&&(!0===r||r[i])?k(o,i,n[i]):b(i)&&(o[i]=n[i]);else t[e]=n}function M(t,e){if(null==t)return e;const n={},r=[];function i(t){n[t.name]||(n[t.name]=1,r.push(t))}return e.forEach(i),t.forEach(i),r}function A(t){return t[t.length-1]}function E(t){return null==t||""===t?null:+t}const D=t=>e=>t*Math.exp(e),C=t=>e=>Math.log(t*e),F=t=>e=>Math.sign(e)*Math.log1p(Math.abs(e/t)),S=t=>e=>Math.sign(e)*Math.expm1(Math.abs(e))*t,$=t=>e=>e<0?-Math.pow(-e,t):Math.pow(e,t);function T(t,e,n,r){const i=n(t[0]),o=n(A(t)),a=(o-i)*e;return[r(i-a),r(o-a)]}function B(t,e){return T(t,e,E,f)}function N(t,e){var n=Math.sign(t[0]);return T(t,e,C(n),D(n))}function z(t,e,n){return T(t,e,$(n),$(1/n))}function O(t,e,n){return T(t,e,F(n),S(n))}function R(t,e,n,r,i){const o=r(t[0]),a=r(A(t)),s=null!=e?r(e):(o+a)/2;return[i(s+(o-s)*n),i(s+(a-s)*n)]}function L(t,e,n){return R(t,e,n,E,f)}function U(t,e,n){const r=Math.sign(t[0]);return R(t,e,n,C(r),D(r))}function q(t,e,n,r){return R(t,e,n,$(r),$(1/r))}function P(t,e,n,r){return R(t,e,n,F(r),S(r))}function j(t){return 1+~~(new Date(t).getMonth()/3)}function I(t){return 1+~~(new Date(t).getUTCMonth()/3)}function W(t){return null!=t?_(t)?t:[t]:[]}function H(t,e,n){let r,i=t[0],o=t[1];return o<i&&(r=o,o=i,i=r),r=o-i,r>=n-e?[e,n]:[i=Math.min(Math.max(i,e),n-r),i+r]}function Y(t){return"function"==typeof t}function G(t,n,i){i=i||{},n=W(n)||[];const o=[],a=[],s={},u=i.comparator||X;return W(t).forEach(((t,e)=>{null!=t&&(o.push("descending"===n[e]?-1:1),a.push(t=Y(t)?t:l(t,null,i)),(r(t)||[]).forEach((t=>s[t]=1)))})),0===a.length?null:e(u(a,o),Object.keys(s))}const V=(t,e)=>(t<e||null==t)&&null!=e?-1:(t>e||null==e)&&null!=t?1:(e=e instanceof Date?+e:e,(t=t instanceof Date?+t:t)!==t&&e==e?-1:e!=e&&t==t?1:0),X=(t,e)=>1===t.length?J(t[0],e[0]):Z(t,e,t.length),J=(t,e)=>function(n,r){return V(t(n),t(r))*e},Z=(t,e,n)=>(e.push(0),function(r,i){let o,a=0,s=-1;for(;0===a&&++s<n;)o=t[s],a=V(o(r),o(i));return a*e[s]});function Q(t){return Y(t)?t:()=>t}function K(t,e){let n;return r=>{n&&clearTimeout(n),n=setTimeout((()=>(e(r),n=null)),t)}}function tt(t){for(let e,n,r=1,i=arguments.length;r<i;++r)for(n in e=arguments[r],e)t[n]=e[n];return t}function et(t,e){let n,r,i,o,a=0;if(t&&(n=t.length))if(null==e){for(r=t[a];a<n&&(null==r||r!=r);r=t[++a]);for(i=o=r;a<n;++a)r=t[a],null!=r&&(r<i&&(i=r),r>o&&(o=r))}else{for(r=e(t[a]);a<n&&(null==r||r!=r);r=e(t[++a]));for(i=o=r;a<n;++a)r=e(t[a]),null!=r&&(r<i&&(i=r),r>o&&(o=r))}return[i,o]}function nt(t,e){const n=t.length;let r,i,o,a,s,u=-1;if(null==e){for(;++u<n;)if(i=t[u],null!=i&&i>=i){r=o=i;break}if(u===n)return[-1,-1];for(a=s=u;++u<n;)i=t[u],null!=i&&(r>i&&(r=i,a=u),o<i&&(o=i,s=u))}else{for(;++u<n;)if(i=e(t[u],u,t),null!=i&&i>=i){r=o=i;break}if(u===n)return[-1,-1];for(a=s=u;++u<n;)i=e(t[u],u,t),null!=i&&(r>i&&(r=i,a=u),o<i&&(o=i,s=u))}return[a,s]}function rt(t,e){return Object.hasOwn(t,e)}const it={};function ot(t){let e,n={};function r(t){return rt(n,t)&&n[t]!==it}const i={size:0,empty:0,object:n,has:r,get:t=>r(t)?n[t]:void 0,set(t,e){return r(t)||(++i.size,n[t]===it&&--i.empty),n[t]=e,this},delete(t){return r(t)&&(--i.size,++i.empty,n[t]=it),this},clear(){i.size=i.empty=0,i.object=n={}},test(t){return arguments.length?(e=t,i):e},clean(){const t={};let r=0;for(const i in n){const o=n[i];o===it||e&&e(o)||(t[i]=o,++r)}i.size=r,i.empty=0,i.object=n=t}};return t&&Object.keys(t).forEach((e=>{i.set(e,t[e])})),i}function at(t,e,n,r,i,o){if(!n&&0!==n)return o;const a=+n;let s,u=t[0],l=A(t);l<u&&(s=u,u=l,l=s),s=Math.abs(e-u);const c=Math.abs(l-e);return s<c&&s<=a?r:c<=a?i:o}function st(t,e,n){const r=t.prototype=Object.create(e.prototype);return Object.defineProperty(r,"constructor",{value:t,writable:!0,enumerable:!0,configurable:!0}),tt(r,n)}function ut(t,e,n,r){let i,o=e[0],a=e[e.length-1];return o>a&&(i=o,o=a,a=i),r=void 0===r||r,((n=void 0===n||n)?o<=t:o<t)&&(r?t<=a:t<a)}function lt(t){return"boolean"==typeof t}function ct(t){return"[object Date]"===Object.prototype.toString.call(t)}function ft(t){return t&&Y(t[Symbol.iterator])}function ht(t){return"number"==typeof t}function dt(t){return"[object RegExp]"===Object.prototype.toString.call(t)}function pt(t){return"string"==typeof t}function gt(t,n,r){t&&(t=n?W(t).map((t=>t.replace(/\\(.)/g,"$1"))):W(t));const o=t&&t.length,a=r&&r.get||i,s=t=>a(n?[t]:u(t));let l;if(o)if(1===o){const e=s(t[0]);l=function(t){return""+e(t)}}else{const e=t.map(s);l=function(t){let n=""+e[0](t),r=0;for(;++r<o;)n+="|"+e[r](t);return n}}else l=function(){return""};return e(l,t,"key")}function mt(t,e){const n=t[0],r=A(t),i=+e;return i?1===i?r:n+i*(r-n):n}function yt(t){let e,n,r;t=+t||1e4;const i=()=>{e={},n={},r=0},o=(i,o)=>(++r>t&&(n=e,e={},r=1),e[i]=o);return i(),{clear:i,has:t=>rt(e,t)||rt(n,t),get:t=>rt(e,t)?e[t]:rt(n,t)?o(t,n[t]):void 0,set:(t,n)=>rt(e,t)?e[t]=n:o(t,n)}}function vt(t,e,n,r){const i=e.length,o=n.length;if(!o)return e;if(!i)return n;const a=r||new e.constructor(i+o);let s=0,u=0,l=0;for(;s<i&&u<o;++l)a[l]=t(e[s],n[u])>0?n[u++]:e[s++];for(;s<i;++s,++l)a[l]=e[s];for(;u<o;++u,++l)a[l]=n[u];return a}function _t(t,e){let n="";for(;--e>=0;)n+=t;return n}function xt(t,e,n,r){const i=n||" ",o=t+"",a=e-o.length;return a<=0?o:"left"===r?_t(i,a)+o:"center"===r?_t(i,~~(a/2))+o+_t(i,Math.ceil(a/2)):o+_t(i,a)}function bt(t){return t&&A(t)-t[0]||0}function wt(t){return _(t)?`[${t.map((t=>null===t?"null":wt(t)))}]`:x(t)||pt(t)?JSON.stringify(t).replaceAll("\u2028","\\u2028").replaceAll("\u2029","\\u2029"):t}function kt(t){return null==t||""===t?null:!(!t||"false"===t||"0"===t)&&!!t}const Mt=t=>ht(t)||ct(t)?t:Date.parse(t);function At(t,e){return e=e||Mt,null==t||""===t?null:e(t)}function Et(t){return null==t||""===t?null:t+""}function Dt(t){const e={},n=t.length;for(let r=0;r<n;++r)e[t[r]]=!0;return e}function Ct(t,e,n,r){const i=null!=r?r:"…",o=t+"",a=o.length,s=Math.max(0,e-i.length);return a<=e?o:"left"===n?i+o.slice(a-s):"center"===n?o.slice(0,Math.ceil(s/2))+i+o.slice(a-~~(s/2)):o.slice(0,s)+i}function Ft(t,e,n){if(t)if(e){const r=t.length;for(let i=0;i<r;++i){const r=e(t[i]);r&&n(r,i,t)}}else t.forEach(n)}var St={},$t={};function Tt(t){return new Function("d","return {"+t.map((function(t,e){return JSON.stringify(t)+": d["+e+'] || ""'})).join(",")+"}")}function Bt(t){var e=Object.create(null),n=[];return t.forEach((function(t){for(var r in t)r in e||n.push(e[r]=r)})),n}function Nt(t,e){var n=t+"",r=n.length;return r<e?new Array(e-r+1).join(0)+n:n}function zt(t){var e,n=t.getUTCHours(),r=t.getUTCMinutes(),i=t.getUTCSeconds(),o=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":((e=t.getUTCFullYear())<0?"-"+Nt(-e,6):e>9999?"+"+Nt(e,6):Nt(e,4))+"-"+Nt(t.getUTCMonth()+1,2)+"-"+Nt(t.getUTCDate(),2)+(o?"T"+Nt(n,2)+":"+Nt(r,2)+":"+Nt(i,2)+"."+Nt(o,3)+"Z":i?"T"+Nt(n,2)+":"+Nt(r,2)+":"+Nt(i,2)+"Z":r||n?"T"+Nt(n,2)+":"+Nt(r,2)+"Z":"")}function Ot(t){var e=new RegExp('["'+t+"\n\r]"),n=t.charCodeAt(0);function r(t,e){var r,i=[],o=t.length,a=0,s=0,u=o<=0,l=!1;function c(){if(u)return $t;if(l)return l=!1,St;var e,r,i=a;if(34===t.charCodeAt(i)){for(;a++<o&&34!==t.charCodeAt(a)||34===t.charCodeAt(++a););return(e=a)>=o?u=!0:10===(r=t.charCodeAt(a++))?l=!0:13===r&&(l=!0,10===t.charCodeAt(a)&&++a),t.slice(i+1,e-1).replace(/""/g,'"')}for(;a<o;){if(10===(r=t.charCodeAt(e=a++)))l=!0;else if(13===r)l=!0,10===t.charCodeAt(a)&&++a;else if(r!==n)continue;return t.slice(i,e)}return u=!0,t.slice(i,o)}for(10===t.charCodeAt(o-1)&&--o,13===t.charCodeAt(o-1)&&--o;(r=c())!==$t;){for(var f=[];r!==St&&r!==$t;)f.push(r),r=c();e&&null==(f=e(f,s++))||i.push(f)}return i}function i(e,n){return e.map((function(e){return n.map((function(t){return a(e[t])})).join(t)}))}function o(e){return e.map(a).join(t)}function a(t){return null==t?"":t instanceof Date?zt(t):e.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,e){var n,i,o=r(t,(function(t,r){if(n)return n(t,r-1);i=t,n=e?function(t,e){var n=Tt(t);return function(r,i){return e(n(r),i,t)}}(t,e):Tt(t)}));return o.columns=i||[],o},parseRows:r,format:function(e,n){return null==n&&(n=Bt(e)),[n.map(a).join(t)].concat(i(e,n)).join("\n")},formatBody:function(t,e){return null==e&&(e=Bt(t)),i(t,e).join("\n")},formatRows:function(t){return t.map(o).join("\n")},formatRow:o,formatValue:a}}function Rt(t){return t}function Lt(t,e){return"string"==typeof e&&(e=t.objects[e]),"GeometryCollection"===e.type?{type:"FeatureCollection",features:e.geometries.map((function(e){return Ut(t,e)}))}:Ut(t,e)}function Ut(t,e){var n=e.id,r=e.bbox,i=null==e.properties?{}:e.properties,o=qt(t,e);return null==n&&null==r?{type:"Feature",properties:i,geometry:o}:null==r?{type:"Feature",id:n,properties:i,geometry:o}:{type:"Feature",id:n,bbox:r,properties:i,geometry:o}}function qt(t,e){var n=function(t){if(null==t)return Rt;var e,n,r=t.scale[0],i=t.scale[1],o=t.translate[0],a=t.translate[1];return function(t,s){s||(e=n=0);var u=2,l=t.length,c=new Array(l);for(c[0]=(e+=t[0])*r+o,c[1]=(n+=t[1])*i+a;u<l;)c[u]=t[u],++u;return c}}(t.transform),r=t.arcs;function i(t,e){e.length&&e.pop();for(var i=r[t<0?~t:t],o=0,a=i.length;o<a;++o)e.push(n(i[o],o));t<0&&function(t,e){for(var n,r=t.length,i=r-e;i<--r;)n=t[i],t[i++]=t[r],t[r]=n}(e,a)}function o(t){return n(t)}function a(t){for(var e=[],n=0,r=t.length;n<r;++n)i(t[n],e);return e.length<2&&e.push(e[0]),e}function s(t){for(var e=a(t);e.length<4;)e.push(e[0]);return e}function u(t){return t.map(s)}return function t(e){var n,r=e.type;switch(r){case"GeometryCollection":return{type:r,geometries:e.geometries.map(t)};case"Point":n=o(e.coordinates);break;case"MultiPoint":n=e.coordinates.map(o);break;case"LineString":n=a(e.arcs);break;case"MultiLineString":n=e.arcs.map(a);break;case"Polygon":n=u(e.arcs);break;case"MultiPolygon":n=e.arcs.map(u);break;default:return null}return{type:r,coordinates:n}}(e)}function Pt(t,e){var n={},r={},i={},o=[],a=-1;function s(t,e){for(var r in t){var i=t[r];delete e[i.start],delete i.start,delete i.end,i.forEach((function(t){n[t<0?~t:t]=1})),o.push(i)}}return e.forEach((function(n,r){var i,o=t.arcs[n<0?~n:n];o.length<3&&!o[1][0]&&!o[1][1]&&(i=e[++a],e[a]=n,e[r]=i)})),e.forEach((function(e){var n,o,a=function(e){var n,r=t.arcs[e<0?~e:e],i=r[0];t.transform?(n=[0,0],r.forEach((function(t){n[0]+=t[0],n[1]+=t[1]}))):n=r[r.length-1];return e<0?[n,i]:[i,n]}(e),s=a[0],u=a[1];if(n=i[s])if(delete i[n.end],n.push(e),n.end=u,o=r[u]){delete r[o.start];var l=o===n?n:n.concat(o);r[l.start=n.start]=i[l.end=o.end]=l}else r[n.start]=i[n.end]=n;else if(n=r[u])if(delete r[n.start],n.unshift(e),n.start=s,o=i[s]){delete i[o.end];var c=o===n?n:o.concat(n);r[c.start=o.start]=i[c.end=n.end]=c}else r[n.start]=i[n.end]=n;else r[(n=[e]).start=s]=i[n.end=u]=n})),s(i,r),s(r,i),e.forEach((function(t){n[t<0?~t:t]||o.push([t])})),o}function jt(t){return qt(t,It.apply(this,arguments))}function It(t,e,n){var r,i,o;if(arguments.length>1)r=function(t,e,n){var r,i=[],o=[];function a(t){var e=t<0?~t:t;(o[e]||(o[e]=[])).push({i:t,g:r})}function s(t){t.forEach(a)}function u(t){t.forEach(s)}function l(t){t.forEach(u)}function c(t){switch(r=t,t.type){case"GeometryCollection":t.geometries.forEach(c);break;case"LineString":s(t.arcs);break;case"MultiLineString":case"Polygon":u(t.arcs);break;case"MultiPolygon":l(t.arcs)}}return c(e),o.forEach(null==n?function(t){i.push(t[0].i)}:function(t){n(t[0].g,t[t.length-1].g)&&i.push(t[0].i)}),i}(0,e,n);else for(i=0,r=new Array(o=t.arcs.length);i<o;++i)r[i]=i;return{type:"MultiLineString",arcs:Pt(t,r)}}function Wt(t,e){return null==t||null==e?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function Ht(t,e){return null==t||null==e?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function Yt(t){let e,n,r;function i(t,r,i=0,o=t.length){if(i<o){if(0!==e(r,r))return o;do{const e=i+o>>>1;n(t[e],r)<0?i=e+1:o=e}while(i<o)}return i}return 2!==t.length?(e=Wt,n=(e,n)=>Wt(t(e),n),r=(e,n)=>t(e)-n):(e=t===Wt||t===Ht?t:Gt,n=t,r=t),{left:i,center:function(t,e,n=0,o=t.length){const a=i(t,e,n,o-1);return a>n&&r(t[a-1],e)>-r(t[a],e)?a-1:a},right:function(t,r,i=0,o=t.length){if(i<o){if(0!==e(r,r))return o;do{const e=i+o>>>1;n(t[e],r)<=0?i=e+1:o=e}while(i<o)}return i}}}function Gt(){return 0}function Vt(t){return null===t?NaN:+t}const Xt=Yt(Wt),Jt=Xt.right,Zt=Xt.left;Yt(Vt).center;class Qt{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let n=0;for(let r=0;r<this._n&&r<32;r++){const i=e[r],o=t+i,a=Math.abs(t)<Math.abs(i)?t-(o-i):i-(o-t);a&&(e[n++]=a),t=o}return e[n]=t,this._n=n+1,this}valueOf(){const t=this._partials;let e,n,r,i=this._n,o=0;if(i>0){for(o=t[--i];i>0&&(e=o,n=t[--i],o=e+n,r=n-(o-e),!r););i>0&&(r<0&&t[i-1]<0||r>0&&t[i-1]>0)&&(n=2*r,e=o+n,n==e-o&&(o=e))}return o}}class Kt extends Map{constructor(t,e=ie){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),null!=t)for(const[e,n]of t)this.set(e,n)}get(t){return super.get(ee(this,t))}has(t){return super.has(ee(this,t))}set(t,e){return super.set(ne(this,t),e)}delete(t){return super.delete(re(this,t))}}class te extends Set{constructor(t,e=ie){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),null!=t)for(const e of t)this.add(e)}has(t){return super.has(ee(this,t))}add(t){return super.add(ne(this,t))}delete(t){return super.delete(re(this,t))}}function ee({_intern:t,_key:e},n){const r=e(n);return t.has(r)?t.get(r):n}function ne({_intern:t,_key:e},n){const r=e(n);return t.has(r)?t.get(r):(t.set(r,n),n)}function re({_intern:t,_key:e},n){const r=e(n);return t.has(r)&&(n=t.get(r),t.delete(r)),n}function ie(t){return null!==t&&"object"==typeof t?t.valueOf():t}function oe(t,e){return(null==t||!(t>=t))-(null==e||!(e>=e))||(t<e?-1:t>e?1:0)}const ae=Math.sqrt(50),se=Math.sqrt(10),ue=Math.sqrt(2);function le(t,e,n){const r=(e-t)/Math.max(0,n),i=Math.floor(Math.log10(r)),o=r/Math.pow(10,i),a=o>=ae?10:o>=se?5:o>=ue?2:1;let s,u,l;return i<0?(l=Math.pow(10,-i)/a,s=Math.round(t*l),u=Math.round(e*l),s/l<t&&++s,u/l>e&&--u,l=-l):(l=Math.pow(10,i)*a,s=Math.round(t/l),u=Math.round(e/l),s*l<t&&++s,u*l>e&&--u),u<s&&.5<=n&&n<2?le(t,e,2*n):[s,u,l]}function ce(t,e,n){if(!((n=+n)>0))return[];if((t=+t)===(e=+e))return[t];const r=e<t,[i,o,a]=r?le(e,t,n):le(t,e,n);if(!(o>=i))return[];const s=o-i+1,u=new Array(s);if(r)if(a<0)for(let t=0;t<s;++t)u[t]=(o-t)/-a;else for(let t=0;t<s;++t)u[t]=(o-t)*a;else if(a<0)for(let t=0;t<s;++t)u[t]=(i+t)/-a;else for(let t=0;t<s;++t)u[t]=(i+t)*a;return u}function fe(t,e,n){return le(t=+t,e=+e,n=+n)[2]}function he(t,e,n){n=+n;const r=(e=+e)<(t=+t),i=r?fe(e,t,n):fe(t,e,n);return(r?-1:1)*(i<0?1/-i:i)}function de(t,e){let n;if(void 0===e)for(const e of t)null!=e&&(n<e||void 0===n&&e>=e)&&(n=e);else{let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&(n<i||void 0===n&&i>=i)&&(n=i)}return n}function pe(t,e){let n;if(void 0===e)for(const e of t)null!=e&&(n>e||void 0===n&&e>=e)&&(n=e);else{let r=-1;for(let i of t)null!=(i=e(i,++r,t))&&(n>i||void 0===n&&i>=i)&&(n=i)}return n}function ge(t,e,n=0,r=1/0,i){if(e=Math.floor(e),n=Math.floor(Math.max(0,n)),r=Math.floor(Math.min(t.length-1,r)),!(n<=e&&e<=r))return t;for(i=void 0===i?oe:function(t=Wt){if(t===Wt)return oe;if("function"!=typeof t)throw new TypeError("compare is not a function");return(e,n)=>{const r=t(e,n);return r||0===r?r:(0===t(n,n))-(0===t(e,e))}}(i);r>n;){if(r-n>600){const o=r-n+1,a=e-n+1,s=Math.log(o),u=.5*Math.exp(2*s/3),l=.5*Math.sqrt(s*u*(o-u)/o)*(a-o/2<0?-1:1);ge(t,e,Math.max(n,Math.floor(e-a*u/o+l)),Math.min(r,Math.floor(e+(o-a)*u/o+l)),i)}const o=t[e];let a=n,s=r;for(me(t,n,e),i(t[r],o)>0&&me(t,n,r);a<s;){for(me(t,a,s),++a,--s;i(t[a],o)<0;)++a;for(;i(t[s],o)>0;)--s}0===i(t[n],o)?me(t,n,s):(++s,me(t,s,r)),s<=e&&(n=s+1),e<=s&&(r=s-1)}return t}function me(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function ye(t,e,n){if(t=Float64Array.from(function*(t,e){if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(yield e);else{let n=-1;for(let r of t)null!=(r=e(r,++n,t))&&(r=+r)>=r&&(yield r)}}(t,n)),(r=t.length)&&!isNaN(e=+e)){if(e<=0||r<2)return pe(t);if(e>=1)return de(t);var r,i=(r-1)*e,o=Math.floor(i),a=de(ge(t,o).subarray(0,o+1));return a+(pe(t.subarray(o+1))-a)*(i-o)}}function ve(t,e,n=Vt){if((r=t.length)&&!isNaN(e=+e)){if(e<=0||r<2)return+n(t[0],0,t);if(e>=1)return+n(t[r-1],r-1,t);var r,i=(r-1)*e,o=Math.floor(i),a=+n(t[o],o,t);return a+(+n(t[o+1],o+1,t)-a)*(i-o)}}function _e(t,e){return ye(t,.5,e)}function xe(t){return Array.from(function*(t){for(const e of t)yield*e}(t))}function be(t,e,n){t=+t,e=+e,n=(i=arguments.length)<2?(e=t,t=0,1):i<3?1:+n;for(var r=-1,i=0|Math.max(0,Math.ceil((e-t)/n)),o=new Array(i);++r<i;)o[r]=t+r*n;return o}function we(t,e){let n=0;for(let e of t)(e=+e)&&(n+=e);return n}function ke(t){return t instanceof te?t:new te(t)}function Me(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,r=t.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+t.slice(n+1)]}function Ae(t){return(t=Me(Math.abs(t)))?t[1]:NaN}var Ee,De=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Ce(t){if(!(e=De.exec(t)))throw new Error("invalid format: "+t);var e;return new Fe({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}function Fe(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}function Se(t,e){var n=Me(t,e);if(!n)return t+"";var r=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}Ce.prototype=Fe.prototype,Fe.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var $e={"%":(t,e)=>(100*t).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Se(100*t,e),r:Se,s:function(t,e){var n=Me(t,e);if(!n)return t+"";var r=n[0],i=n[1],o=i-(Ee=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=r.length;return o===a?r:o>a?r+new Array(o-a+1).join("0"):o>0?r.slice(0,o)+"."+r.slice(o):"0."+new Array(1-o).join("0")+Me(t,Math.max(0,e+o-1))[0]},X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Te(t){return t}var Be,Ne,ze,Oe=Array.prototype.map,Re=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Le(t){var e,n,r=void 0===t.grouping||void 0===t.thousands?Te:(e=Oe.call(t.grouping,Number),n=t.thousands+"",function(t,r){for(var i=t.length,o=[],a=0,s=e[0],u=0;i>0&&s>0&&(u+s+1>r&&(s=Math.max(1,r-u)),o.push(t.substring(i-=s,i+s)),!((u+=s+1)>r));)s=e[a=(a+1)%e.length];return o.reverse().join(n)}),i=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",a=void 0===t.decimal?".":t.decimal+"",s=void 0===t.numerals?Te:function(t){return function(e){return e.replace(/[0-9]/g,(function(e){return t[+e]}))}}(Oe.call(t.numerals,String)),u=void 0===t.percent?"%":t.percent+"",l=void 0===t.minus?"−":t.minus+"",c=void 0===t.nan?"NaN":t.nan+"";function f(t){var e=(t=Ce(t)).fill,n=t.align,f=t.sign,h=t.symbol,d=t.zero,p=t.width,g=t.comma,m=t.precision,y=t.trim,v=t.type;"n"===v?(g=!0,v="g"):$e[v]||(void 0===m&&(m=12),y=!0,v="g"),(d||"0"===e&&"="===n)&&(d=!0,e="0",n="=");var _="$"===h?i:"#"===h&&/[boxX]/.test(v)?"0"+v.toLowerCase():"",x="$"===h?o:/[%p]/.test(v)?u:"",b=$e[v],w=/[defgprs%]/.test(v);function k(t){var i,o,u,h=_,k=x;if("c"===v)k=b(t)+k,t="";else{var M=(t=+t)<0||1/t<0;if(t=isNaN(t)?c:b(Math.abs(t),m),y&&(t=function(t){t:for(var e,n=t.length,r=1,i=-1;r<n;++r)switch(t[r]){case".":i=e=r;break;case"0":0===i&&(i=r),e=r;break;default:if(!+t[r])break t;i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(e+1):t}(t)),M&&0==+t&&"+"!==f&&(M=!1),h=(M?"("===f?f:l:"-"===f||"("===f?"":f)+h,k=("s"===v?Re[8+Ee/3]:"")+k+(M&&"("===f?")":""),w)for(i=-1,o=t.length;++i<o;)if(48>(u=t.charCodeAt(i))||u>57){k=(46===u?a+t.slice(i+1):t.slice(i))+k,t=t.slice(0,i);break}}g&&!d&&(t=r(t,1/0));var A=h.length+t.length+k.length,E=A<p?new Array(p-A+1).join(e):"";switch(g&&d&&(t=r(E+t,E.length?p-k.length:1/0),E=""),n){case"<":t=h+t+k+E;break;case"=":t=h+E+t+k;break;case"^":t=E.slice(0,A=E.length>>1)+h+t+k+E.slice(A);break;default:t=E+h+t+k}return s(t)}return m=void 0===m?6:/[gprs]/.test(v)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),k.toString=function(){return t+""},k}return{format:f,formatPrefix:function(t,e){var n=f(((t=Ce(t)).type="f",t)),r=3*Math.max(-8,Math.min(8,Math.floor(Ae(e)/3))),i=Math.pow(10,-r),o=Re[8+r/3];return function(t){return n(i*t)+o}}}}function Ue(t){return Math.max(0,-Ae(Math.abs(t)))}function qe(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Ae(e)/3)))-Ae(Math.abs(t)))}function Pe(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,Ae(e)-Ae(t))+1}!function(t){Be=Le(t),Ne=Be.format,ze=Be.formatPrefix}({thousands:",",grouping:[3],currency:["$",""]});const je=new Date,Ie=new Date;function We(t,e,n,r){function i(e){return t(e=0===arguments.length?new Date:new Date(+e)),e}return i.floor=e=>(t(e=new Date(+e)),e),i.ceil=n=>(t(n=new Date(n-1)),e(n,1),t(n),n),i.round=t=>{const e=i(t),n=i.ceil(t);return t-e<n-t?e:n},i.offset=(t,n)=>(e(t=new Date(+t),null==n?1:Math.floor(n)),t),i.range=(n,r,o)=>{const a=[];if(n=i.ceil(n),o=null==o?1:Math.floor(o),!(n<r&&o>0))return a;let s;do{a.push(s=new Date(+n)),e(n,o),t(n)}while(s<n&&n<r);return a},i.filter=n=>We((e=>{if(e>=e)for(;t(e),!n(e);)e.setTime(e-1)}),((t,r)=>{if(t>=t)if(r<0)for(;++r<=0;)for(;e(t,-1),!n(t););else for(;--r>=0;)for(;e(t,1),!n(t););})),n&&(i.count=(e,r)=>(je.setTime(+e),Ie.setTime(+r),t(je),t(Ie),Math.floor(n(je,Ie))),i.every=t=>(t=Math.floor(t),isFinite(t)&&t>0?t>1?i.filter(r?e=>r(e)%t==0:e=>i.count(0,e)%t==0):i:null)),i}const He=We((()=>{}),((t,e)=>{t.setTime(+t+e)}),((t,e)=>e-t));He.every=t=>(t=Math.floor(t),isFinite(t)&&t>0?t>1?We((e=>{e.setTime(Math.floor(e/t)*t)}),((e,n)=>{e.setTime(+e+n*t)}),((e,n)=>(n-e)/t)):He:null),He.range;const Ye=1e3,Ge=6e4,Ve=36e5,Xe=864e5,Je=6048e5,Ze=2592e6,Qe=31536e6,Ke=We((t=>{t.setTime(t-t.getMilliseconds())}),((t,e)=>{t.setTime(+t+e*Ye)}),((t,e)=>(e-t)/Ye),(t=>t.getUTCSeconds()));Ke.range;const tn=We((t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Ye)}),((t,e)=>{t.setTime(+t+e*Ge)}),((t,e)=>(e-t)/Ge),(t=>t.getMinutes()));tn.range;const en=We((t=>{t.setUTCSeconds(0,0)}),((t,e)=>{t.setTime(+t+e*Ge)}),((t,e)=>(e-t)/Ge),(t=>t.getUTCMinutes()));en.range;const nn=We((t=>{t.setTime(t-t.getMilliseconds()-t.getSeconds()*Ye-t.getMinutes()*Ge)}),((t,e)=>{t.setTime(+t+e*Ve)}),((t,e)=>(e-t)/Ve),(t=>t.getHours()));nn.range;const rn=We((t=>{t.setUTCMinutes(0,0,0)}),((t,e)=>{t.setTime(+t+e*Ve)}),((t,e)=>(e-t)/Ve),(t=>t.getUTCHours()));rn.range;const on=We((t=>t.setHours(0,0,0,0)),((t,e)=>t.setDate(t.getDate()+e)),((t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Ge)/Xe),(t=>t.getDate()-1));on.range;const an=We((t=>{t.setUTCHours(0,0,0,0)}),((t,e)=>{t.setUTCDate(t.getUTCDate()+e)}),((t,e)=>(e-t)/Xe),(t=>t.getUTCDate()-1));an.range;const sn=We((t=>{t.setUTCHours(0,0,0,0)}),((t,e)=>{t.setUTCDate(t.getUTCDate()+e)}),((t,e)=>(e-t)/Xe),(t=>Math.floor(t/Xe)));function un(t){return We((e=>{e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)}),((t,e)=>{t.setDate(t.getDate()+7*e)}),((t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Ge)/Je))}sn.range;const ln=un(0),cn=un(1),fn=un(2),hn=un(3),dn=un(4),pn=un(5),gn=un(6);function mn(t){return We((e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)}),((t,e)=>{t.setUTCDate(t.getUTCDate()+7*e)}),((t,e)=>(e-t)/Je))}ln.range,cn.range,fn.range,hn.range,dn.range,pn.range,gn.range;const yn=mn(0),vn=mn(1),_n=mn(2),xn=mn(3),bn=mn(4),wn=mn(5),kn=mn(6);yn.range,vn.range,_n.range,xn.range,bn.range,wn.range,kn.range;const Mn=We((t=>{t.setDate(1),t.setHours(0,0,0,0)}),((t,e)=>{t.setMonth(t.getMonth()+e)}),((t,e)=>e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())),(t=>t.getMonth()));Mn.range;const An=We((t=>{t.setUTCDate(1),t.setUTCHours(0,0,0,0)}),((t,e)=>{t.setUTCMonth(t.getUTCMonth()+e)}),((t,e)=>e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())),(t=>t.getUTCMonth()));An.range;const En=We((t=>{t.setMonth(0,1),t.setHours(0,0,0,0)}),((t,e)=>{t.setFullYear(t.getFullYear()+e)}),((t,e)=>e.getFullYear()-t.getFullYear()),(t=>t.getFullYear()));En.every=t=>isFinite(t=Math.floor(t))&&t>0?We((e=>{e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)}),((e,n)=>{e.setFullYear(e.getFullYear()+n*t)})):null,En.range;const Dn=We((t=>{t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),((t,e)=>{t.setUTCFullYear(t.getUTCFullYear()+e)}),((t,e)=>e.getUTCFullYear()-t.getUTCFullYear()),(t=>t.getUTCFullYear()));function Cn(t,e,n,r,i,o){const a=[[Ke,1,Ye],[Ke,5,5e3],[Ke,15,15e3],[Ke,30,3e4],[o,1,Ge],[o,5,3e5],[o,15,9e5],[o,30,18e5],[i,1,Ve],[i,3,108e5],[i,6,216e5],[i,12,432e5],[r,1,Xe],[r,2,1728e5],[n,1,Je],[e,1,Ze],[e,3,7776e6],[t,1,Qe]];function s(e,n,r){const i=Math.abs(n-e)/r,o=Yt((([,,t])=>t)).right(a,i);if(o===a.length)return t.every(he(e/Qe,n/Qe,r));if(0===o)return He.every(Math.max(he(e,n,r),1));const[s,u]=a[i/a[o-1][2]<a[o][2]/i?o-1:o];return s.every(u)}return[function(t,e,n){const r=e<t;r&&([t,e]=[e,t]);const i=n&&"function"==typeof n.range?n:s(t,e,n),o=i?i.range(t,+e+1):[];return r?o.reverse():o},s]}Dn.every=t=>isFinite(t=Math.floor(t))&&t>0?We((e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)}),((e,n)=>{e.setUTCFullYear(e.getUTCFullYear()+n*t)})):null,Dn.range;const[Fn,Sn]=Cn(Dn,An,yn,sn,rn,en),[$n,Tn]=Cn(En,Mn,ln,on,nn,tn),Bn="year",Nn="quarter",zn="month",On="week",Rn="date",Ln="day",Un="dayofyear",qn="hours",Pn="minutes",jn="seconds",In="milliseconds",Wn=[Bn,Nn,zn,On,Rn,Ln,Un,qn,Pn,jn,In],Hn=Wn.reduce(((t,e,n)=>(t[e]=1+n,t)),{});function Yn(t){const e=W(t).slice(),n={};e.length||s("Missing time unit."),e.forEach((t=>{rt(Hn,t)?n[t]=1:s(`Invalid time unit: ${t}.`)}));return(n[On]||n[Ln]?1:0)+(n[Nn]||n[zn]||n[Rn]?1:0)+(n[Un]?1:0)>1&&s(`Incompatible time units: ${t}`),e.sort(((t,e)=>Hn[t]-Hn[e])),e}const Gn={[Bn]:"%Y ",[Nn]:"Q%q ",[zn]:"%b ",[Rn]:"%d ",[On]:"W%U ",[Ln]:"%a ",[Un]:"%j ",[qn]:"%H:00",[Pn]:"00:%M",[jn]:":%S",[In]:".%L",[`${Bn}-${zn}`]:"%Y-%m ",[`${Bn}-${zn}-${Rn}`]:"%Y-%m-%d ",[`${qn}-${Pn}`]:"%H:%M"};function Vn(t,e){const n=tt({},Gn,e),r=Yn(t),i=r.length;let o,a,s="",u=0;for(u=0;u<i;)for(o=r.length;o>u;--o)if(a=r.slice(u,o).join("-"),null!=n[a]){s+=n[a],u=o;break}return s.trim()}const Xn=new Date;function Jn(t){return Xn.setFullYear(t),Xn.setMonth(0),Xn.setDate(1),Xn.setHours(0,0,0,0),Xn}function Zn(t){return Kn(new Date(t))}function Qn(t){return tr(new Date(t))}function Kn(t){return on.count(Jn(t.getFullYear())-1,t)}function tr(t){return ln.count(Jn(t.getFullYear())-1,t)}function er(t){return Jn(t).getDay()}function nr(t,e,n,r,i,o,a){if(0<=t&&t<100){const s=new Date(-1,e,n,r,i,o,a);return s.setFullYear(t),s}return new Date(t,e,n,r,i,o,a)}function rr(t){return or(new Date(t))}function ir(t){return ar(new Date(t))}function or(t){const e=Date.UTC(t.getUTCFullYear(),0,1);return an.count(e-1,t)}function ar(t){const e=Date.UTC(t.getUTCFullYear(),0,1);return yn.count(e-1,t)}function sr(t){return Xn.setTime(Date.UTC(t,0,1)),Xn.getUTCDay()}function ur(t,e,n,r,i,o,a){if(0<=t&&t<100){const t=new Date(Date.UTC(-1,e,n,r,i,o,a));return t.setUTCFullYear(n.y),t}return new Date(Date.UTC(t,e,n,r,i,o,a))}function lr(t,e,n,r,i){const o=e||1,a=A(t),s=(t,e,i)=>function(t,e,n,r){const i=n<=1?t:r?(e,i)=>r+n*Math.floor((t(e,i)-r)/n):(e,r)=>n*Math.floor(t(e,r)/n);return e?(t,n)=>e(i(t,n),n):i}(n[i=i||t],r[i],t===a&&o,e),u=new Date,l=Dt(t),c=l[Bn]?s(Bn):Q(2012),f=l[zn]?s(zn):l[Nn]?s(Nn):h,p=l[On]&&l[Ln]?s(Ln,1,On+Ln):l[On]?s(On,1):l[Ln]?s(Ln,1):l[Rn]?s(Rn,1):l[Un]?s(Un,1):d,g=l[qn]?s(qn):h,m=l[Pn]?s(Pn):h,y=l[jn]?s(jn):h,v=l[In]?s(In):h;return function(t){u.setTime(+t);const e=c(u);return i(e,f(u),p(u,e),g(u),m(u),y(u),v(u))}}function cr(t,e,n){return e+7*t-(n+6)%7}const fr={[Bn]:t=>t.getFullYear(),[Nn]:t=>Math.floor(t.getMonth()/3),[zn]:t=>t.getMonth(),[Rn]:t=>t.getDate(),[qn]:t=>t.getHours(),[Pn]:t=>t.getMinutes(),[jn]:t=>t.getSeconds(),[In]:t=>t.getMilliseconds(),[Un]:t=>Kn(t),[On]:t=>tr(t),[On+Ln]:(t,e)=>cr(tr(t),t.getDay(),er(e)),[Ln]:(t,e)=>cr(1,t.getDay(),er(e))},hr={[Nn]:t=>3*t,[On]:(t,e)=>cr(t,0,er(e))};function dr(t,e){return lr(t,e||1,fr,hr,nr)}const pr={[Bn]:t=>t.getUTCFullYear(),[Nn]:t=>Math.floor(t.getUTCMonth()/3),[zn]:t=>t.getUTCMonth(),[Rn]:t=>t.getUTCDate(),[qn]:t=>t.getUTCHours(),[Pn]:t=>t.getUTCMinutes(),[jn]:t=>t.getUTCSeconds(),[In]:t=>t.getUTCMilliseconds(),[Un]:t=>or(t),[On]:t=>ar(t),[Ln]:(t,e)=>cr(1,t.getUTCDay(),sr(e)),[On+Ln]:(t,e)=>cr(ar(t),t.getUTCDay(),sr(e))},gr={[Nn]:t=>3*t,[On]:(t,e)=>cr(t,0,sr(e))};function mr(t,e){return lr(t,e||1,pr,gr,ur)}const yr={[Bn]:En,[Nn]:Mn.every(3),[zn]:Mn,[On]:ln,[Rn]:on,[Ln]:on,[Un]:on,[qn]:nn,[Pn]:tn,[jn]:Ke,[In]:He},vr={[Bn]:Dn,[Nn]:An.every(3),[zn]:An,[On]:yn,[Rn]:an,[Ln]:an,[Un]:an,[qn]:rn,[Pn]:en,[jn]:Ke,[In]:He};function _r(t){return yr[t]}function xr(t){return vr[t]}function br(t,e,n){return t?t.offset(e,n):void 0}function wr(t,e,n){return br(_r(t),e,n)}function kr(t,e,n){return br(xr(t),e,n)}function Mr(t,e,n,r){return t?t.range(e,n,r):void 0}function Ar(t,e,n,r){return Mr(_r(t),e,n,r)}function Er(t,e,n,r){return Mr(xr(t),e,n,r)}const Dr=1e3,Cr=6e4,Fr=36e5,Sr=864e5,$r=2592e6,Tr=31536e6,Br=[Bn,zn,Rn,qn,Pn,jn,In],Nr=Br.slice(0,-1),zr=Nr.slice(0,-1),Or=zr.slice(0,-1),Rr=Or.slice(0,-1),Lr=[Bn,zn],Ur=[Bn],qr=[[Nr,1,Dr],[Nr,5,5e3],[Nr,15,15e3],[Nr,30,3e4],[zr,1,Cr],[zr,5,3e5],[zr,15,9e5],[zr,30,18e5],[Or,1,Fr],[Or,3,108e5],[Or,6,216e5],[Or,12,432e5],[Rr,1,Sr],[[Bn,On],1,6048e5],[Lr,1,$r],[Lr,3,7776e6],[Ur,1,Tr]];function Pr(t){const e=t.extent,n=t.maxbins||40,r=Math.abs(bt(e))/n;let i,o,a=Yt((t=>t[2])).right(qr,r);return a===qr.length?(i=Ur,o=he(e[0]/Tr,e[1]/Tr,n)):a?(a=qr[r/qr[a-1][2]<qr[a][2]/r?a-1:a],i=a[0],o=a[1]):(i=Br,o=Math.max(he(e[0],e[1],n),1)),{units:i,step:o}}function jr(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Ir(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Wr(t,e,n){return{y:t,m:e,d:n,H:0,M:0,S:0,L:0}}function Hr(t){var e=t.dateTime,n=t.date,r=t.time,i=t.periods,o=t.days,a=t.shortDays,s=t.months,u=t.shortMonths,l=ri(i),c=ii(i),f=ri(o),h=ii(o),d=ri(a),p=ii(a),g=ri(s),m=ii(s),y=ri(u),v=ii(u),_={a:function(t){return a[t.getDay()]},A:function(t){return o[t.getDay()]},b:function(t){return u[t.getMonth()]},B:function(t){return s[t.getMonth()]},c:null,d:Ai,e:Ai,f:Si,g:Pi,G:Ii,H:Ei,I:Di,j:Ci,L:Fi,m:$i,M:Ti,p:function(t){return i[+(t.getHours()>=12)]},q:function(t){return 1+~~(t.getMonth()/3)},Q:ho,s:po,S:Bi,u:Ni,U:zi,V:Ri,w:Li,W:Ui,x:null,X:null,y:qi,Y:ji,Z:Wi,"%":fo},x={a:function(t){return a[t.getUTCDay()]},A:function(t){return o[t.getUTCDay()]},b:function(t){return u[t.getUTCMonth()]},B:function(t){return s[t.getUTCMonth()]},c:null,d:Hi,e:Hi,f:Ji,g:so,G:lo,H:Yi,I:Gi,j:Vi,L:Xi,m:Zi,M:Qi,p:function(t){return i[+(t.getUTCHours()>=12)]},q:function(t){return 1+~~(t.getUTCMonth()/3)},Q:ho,s:po,S:Ki,u:to,U:eo,V:ro,w:io,W:oo,x:null,X:null,y:ao,Y:uo,Z:co,"%":fo},b={a:function(t,e,n){var r=d.exec(e.slice(n));return r?(t.w=p.get(r[0].toLowerCase()),n+r[0].length):-1},A:function(t,e,n){var r=f.exec(e.slice(n));return r?(t.w=h.get(r[0].toLowerCase()),n+r[0].length):-1},b:function(t,e,n){var r=y.exec(e.slice(n));return r?(t.m=v.get(r[0].toLowerCase()),n+r[0].length):-1},B:function(t,e,n){var r=g.exec(e.slice(n));return r?(t.m=m.get(r[0].toLowerCase()),n+r[0].length):-1},c:function(t,n,r){return M(t,e,n,r)},d:gi,e:gi,f:bi,g:fi,G:ci,H:yi,I:yi,j:mi,L:xi,m:pi,M:vi,p:function(t,e,n){var r=l.exec(e.slice(n));return r?(t.p=c.get(r[0].toLowerCase()),n+r[0].length):-1},q:di,Q:ki,s:Mi,S:_i,u:ai,U:si,V:ui,w:oi,W:li,x:function(t,e,r){return M(t,n,e,r)},X:function(t,e,n){return M(t,r,e,n)},y:fi,Y:ci,Z:hi,"%":wi};function w(t,e){return function(n){var r,i,o,a=[],s=-1,u=0,l=t.length;for(n instanceof Date||(n=new Date(+n));++s<l;)37===t.charCodeAt(s)&&(a.push(t.slice(u,s)),null!=(i=Zr[r=t.charAt(++s)])?r=t.charAt(++s):i="e"===r?" ":"0",(o=e[r])&&(r=o(n,i)),a.push(r),u=s+1);return a.push(t.slice(u,s)),a.join("")}}function k(t,e){return function(n){var r,i,o=Wr(1900,void 0,1);if(M(o,t,n+="",0)!=n.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(e&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(i=(r=Ir(Wr(o.y,0,1))).getUTCDay(),r=i>4||0===i?vn.ceil(r):vn(r),r=an.offset(r,7*(o.V-1)),o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(i=(r=jr(Wr(o.y,0,1))).getDay(),r=i>4||0===i?cn.ceil(r):cn(r),r=on.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),o.d=r.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),i="Z"in o?Ir(Wr(o.y,0,1)).getUTCDay():jr(Wr(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(i+5)%7:o.w+7*o.U-(i+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,Ir(o)):jr(o)}}function M(t,e,n,r){for(var i,o,a=0,s=e.length,u=n.length;a<s;){if(r>=u)return-1;if(37===(i=e.charCodeAt(a++))){if(i=e.charAt(a++),!(o=b[i in Zr?e.charAt(a++):i])||(r=o(t,n,r))<0)return-1}else if(i!=n.charCodeAt(r++))return-1}return r}return _.x=w(n,_),_.X=w(r,_),_.c=w(e,_),x.x=w(n,x),x.X=w(r,x),x.c=w(e,x),{format:function(t){var e=w(t+="",_);return e.toString=function(){return t},e},parse:function(t){var e=k(t+="",!1);return e.toString=function(){return t},e},utcFormat:function(t){var e=w(t+="",x);return e.toString=function(){return t},e},utcParse:function(t){var e=k(t+="",!0);return e.toString=function(){return t},e}}}var Yr,Gr,Vr,Xr,Jr,Zr={"-":"",_:" ",0:"0"},Qr=/^\s*\d+/,Kr=/^%/,ti=/[\\^$*+?|[\]().{}]/g;function ei(t,e,n){var r=t<0?"-":"",i=(r?-t:t)+"",o=i.length;return r+(o<n?new Array(n-o+1).join(e)+i:i)}function ni(t){return t.replace(ti,"\\$&")}function ri(t){return new RegExp("^(?:"+t.map(ni).join("|")+")","i")}function ii(t){return new Map(t.map(((t,e)=>[t.toLowerCase(),e])))}function oi(t,e,n){var r=Qr.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function ai(t,e,n){var r=Qr.exec(e.slice(n,n+1));return r?(t.u=+r[0],n+r[0].length):-1}function si(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.U=+r[0],n+r[0].length):-1}function ui(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.V=+r[0],n+r[0].length):-1}function li(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.W=+r[0],n+r[0].length):-1}function ci(t,e,n){var r=Qr.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function fi(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function hi(t,e,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function di(t,e,n){var r=Qr.exec(e.slice(n,n+1));return r?(t.q=3*r[0]-3,n+r[0].length):-1}function pi(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function gi(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function mi(t,e,n){var r=Qr.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function yi(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function vi(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function _i(t,e,n){var r=Qr.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function xi(t,e,n){var r=Qr.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function bi(t,e,n){var r=Qr.exec(e.slice(n,n+6));return r?(t.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function wi(t,e,n){var r=Kr.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function ki(t,e,n){var r=Qr.exec(e.slice(n));return r?(t.Q=+r[0],n+r[0].length):-1}function Mi(t,e,n){var r=Qr.exec(e.slice(n));return r?(t.s=+r[0],n+r[0].length):-1}function Ai(t,e){return ei(t.getDate(),e,2)}function Ei(t,e){return ei(t.getHours(),e,2)}function Di(t,e){return ei(t.getHours()%12||12,e,2)}function Ci(t,e){return ei(1+on.count(En(t),t),e,3)}function Fi(t,e){return ei(t.getMilliseconds(),e,3)}function Si(t,e){return Fi(t,e)+"000"}function $i(t,e){return ei(t.getMonth()+1,e,2)}function Ti(t,e){return ei(t.getMinutes(),e,2)}function Bi(t,e){return ei(t.getSeconds(),e,2)}function Ni(t){var e=t.getDay();return 0===e?7:e}function zi(t,e){return ei(ln.count(En(t)-1,t),e,2)}function Oi(t){var e=t.getDay();return e>=4||0===e?dn(t):dn.ceil(t)}function Ri(t,e){return t=Oi(t),ei(dn.count(En(t),t)+(4===En(t).getDay()),e,2)}function Li(t){return t.getDay()}function Ui(t,e){return ei(cn.count(En(t)-1,t),e,2)}function qi(t,e){return ei(t.getFullYear()%100,e,2)}function Pi(t,e){return ei((t=Oi(t)).getFullYear()%100,e,2)}function ji(t,e){return ei(t.getFullYear()%1e4,e,4)}function Ii(t,e){var n=t.getDay();return ei((t=n>=4||0===n?dn(t):dn.ceil(t)).getFullYear()%1e4,e,4)}function Wi(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+ei(e/60|0,"0",2)+ei(e%60,"0",2)}function Hi(t,e){return ei(t.getUTCDate(),e,2)}function Yi(t,e){return ei(t.getUTCHours(),e,2)}function Gi(t,e){return ei(t.getUTCHours()%12||12,e,2)}function Vi(t,e){return ei(1+an.count(Dn(t),t),e,3)}function Xi(t,e){return ei(t.getUTCMilliseconds(),e,3)}function Ji(t,e){return Xi(t,e)+"000"}function Zi(t,e){return ei(t.getUTCMonth()+1,e,2)}function Qi(t,e){return ei(t.getUTCMinutes(),e,2)}function Ki(t,e){return ei(t.getUTCSeconds(),e,2)}function to(t){var e=t.getUTCDay();return 0===e?7:e}function eo(t,e){return ei(yn.count(Dn(t)-1,t),e,2)}function no(t){var e=t.getUTCDay();return e>=4||0===e?bn(t):bn.ceil(t)}function ro(t,e){return t=no(t),ei(bn.count(Dn(t),t)+(4===Dn(t).getUTCDay()),e,2)}function io(t){return t.getUTCDay()}function oo(t,e){return ei(vn.count(Dn(t)-1,t),e,2)}function ao(t,e){return ei(t.getUTCFullYear()%100,e,2)}function so(t,e){return ei((t=no(t)).getUTCFullYear()%100,e,2)}function uo(t,e){return ei(t.getUTCFullYear()%1e4,e,4)}function lo(t,e){var n=t.getUTCDay();return ei((t=n>=4||0===n?bn(t):bn.ceil(t)).getUTCFullYear()%1e4,e,4)}function co(){return"+0000"}function fo(){return"%"}function ho(t){return+t}function po(t){return Math.floor(+t/1e3)}function go(t){const e={};return n=>e[n]||(e[n]=t(n))}function mo(t){const e=go(t.format),n=t.formatPrefix;return{format:e,formatPrefix:n,formatFloat(t){const n=Ce(t||",");if(null==n.precision){switch(n.precision=12,n.type){case"%":n.precision-=2;break;case"e":n.precision-=1}return r=e(n),i=e(".1f")(1)[1],t=>{const e=r(t),n=e.indexOf(i);if(n<0)return e;let o=function(t,e){let n,r=t.lastIndexOf("e");if(r>0)return r;for(r=t.length;--r>e;)if(n=t.charCodeAt(r),n>=48&&n<=57)return r+1}(e,n);const a=o<e.length?e.slice(o):"";for(;--o>n;)if("0"!==e[o]){++o;break}return e.slice(0,o)+a}}return e(n);var r,i},formatSpan(t,r,i,o){o=Ce(null==o?",f":o);const a=he(t,r,i),s=Math.max(Math.abs(t),Math.abs(r));let u;if(null==o.precision)switch(o.type){case"s":return isNaN(u=qe(a,s))||(o.precision=u),n(o,s);case"":case"e":case"g":case"p":case"r":isNaN(u=Pe(a,s))||(o.precision=u-("e"===o.type));break;case"f":case"%":isNaN(u=Ue(a))||(o.precision=u-2*("%"===o.type))}return e(o)}}}let yo,vo;function _o(){return yo=mo({format:Ne,formatPrefix:ze})}function xo(t){return mo(Le(t))}function bo(t){return arguments.length?yo=xo(t):yo}function wo(t,e,n){x(n=n||{})||s(`Invalid time multi-format specifier: ${n}`);const r=e(jn),i=e(Pn),o=e(qn),a=e(Rn),u=e(On),l=e(zn),c=e(Nn),f=e(Bn),h=t(n[In]||".%L"),d=t(n[jn]||":%S"),p=t(n[Pn]||"%I:%M"),g=t(n[qn]||"%I %p"),m=t(n[Rn]||n[Ln]||"%a %d"),y=t(n[On]||"%b %d"),v=t(n[zn]||"%B"),_=t(n[Nn]||"%B"),b=t(n[Bn]||"%Y");return t=>(r(t)<t?h:i(t)<t?d:o(t)<t?p:a(t)<t?g:l(t)<t?u(t)<t?m:y:f(t)<t?c(t)<t?v:_:b)(t)}function ko(t){const e=go(t.format),n=go(t.utcFormat);return{timeFormat:t=>pt(t)?e(t):wo(e,_r,t),utcFormat:t=>pt(t)?n(t):wo(n,xr,t),timeParse:go(t.parse),utcParse:go(t.utcParse)}}function Mo(){return vo=ko({format:Gr,parse:Vr,utcFormat:Xr,utcParse:Jr})}function Ao(t){return ko(Hr(t))}function Eo(t){return arguments.length?vo=Ao(t):vo}!function(t){Yr=Hr(t),Gr=Yr.format,Vr=Yr.parse,Xr=Yr.utcFormat,Jr=Yr.utcParse}({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),_o(),Mo();const Do=(t,e)=>tt({},t,e);function Co(t,e){const n=t?xo(t):bo(),r=e?Ao(e):Eo();return Do(n,r)}function Fo(t,e){const n=arguments.length;return n&&2!==n&&s("defaultLocale expects either zero or two arguments."),n?Do(bo(t),Eo(e)):Do(bo(),Eo())}const So=/^(data:|([A-Za-z]+:)?\/\/)/,$o=/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|file|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,To=/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,Bo="file://";async function No(t,e){const n=await this.sanitize(t,e),r=n.href;return n.localFile?this.file(r):this.http(r,e?.http)}async function zo(t,e){e=tt({},this.options,e);const n=this.fileAccess,r={href:null};let i,o,a;const u=$o.test(t.replace(To,""));null!=t&&"string"==typeof t&&u||s("Sanitize failure, invalid URI: "+wt(t));const l=So.test(t);return(a=e.baseURL)&&!l&&(t.startsWith("/")||a.endsWith("/")||(t="/"+t),t=a+t),o=(i=t.startsWith(Bo))||"file"===e.mode||"http"!==e.mode&&!l&&n,i?t=t.slice(7):t.startsWith("//")&&("file"===e.defaultProtocol?(t=t.slice(2),o=!0):t=(e.defaultProtocol||"http")+":"+t),Object.defineProperty(r,"localFile",{value:!!o}),r.href=t,e.target&&(r.target=e.target+""),e.rel&&(r.rel=e.rel+""),"image"===e.context&&e.crossOrigin&&(r.crossOrigin=e.crossOrigin+""),r}async function Oo(){s("No file system access.")}async function Ro(t,e){const n=tt({},this.options.http,e),r=e&&e.response,i=await fetch(t,n);return i.ok?Y(i[r])?i[r]():i.text():s(i.status+""+i.statusText)}const Lo=t=>!(Number.isNaN(+t)||t instanceof Date),Uo={boolean:kt,integer:E,number:E,date:At,string:Et,unknown:f},qo=[t=>"true"===t||"false"===t||!0===t||!1===t,t=>Lo(t)&&Number.isInteger(+t),Lo,t=>!Number.isNaN(Date.parse(t))],Po=["boolean","integer","number","date"];function jo(t,e){if(!t||!t.length)return"unknown";const n=t.length,r=qo.length,i=qo.map(((t,e)=>e+1));for(let a,s,u=0,l=0;u<n;++u)for(s=e?t[u][e]:t[u],a=0;a<r;++a)if(i[a]&&(null!=(o=s)&&o==o)&&!qo[a](s)&&(i[a]=0,++l,l===qo.length))return"string";var o;return Po[i.reduce(((t,e)=>0===t?e:t),0)-1]}function Io(t,e){return e.reduce(((e,n)=>(e[n]=jo(t,n),e)),{})}function Wo(t){const e=function(e,n){const r={delimiter:t};return Ho(e,n?tt(n,r):r)};return e.responseType="text",e}function Ho(t,e){return e.header&&(t=e.header.map(wt).join(e.delimiter)+"\n"+t),Ot(e.delimiter).parse(t+"")}function Yo(t,e){const n=e&&e.property?l(e.property):f;return!x(t)||(r=t,"function"==typeof Buffer&&Y(Buffer.isBuffer)&&Buffer.isBuffer(r))?n(JSON.parse(t)):function(t,e){!_(t)&&ft(t)&&(t=[...t]);return e&&e.copy?JSON.parse(JSON.stringify(t)):t}(n(t),e);var r}Ho.responseType="text",Yo.responseType="json";const Go={interior:(t,e)=>t!==e,exterior:(t,e)=>t===e};function Vo(t,e){let n,r,i,o;return t=Yo(t,e),e&&e.feature?(n=Lt,i=e.feature):e&&e.mesh?(n=jt,i=e.mesh,o=Go[e.filter]):s("Missing TopoJSON feature or mesh parameter."),r=(r=t.objects[i])?n(t,r,o):s("Invalid TopoJSON object: "+i),r&&r.features||[r]}Vo.responseType="json";const Xo={dsv:Ho,csv:Wo(","),tsv:Wo("\t"),json:Yo,topojson:Vo};function Jo(t,e){return arguments.length>1?(Xo[t]=e,this):rt(Xo,t)?Xo[t]:null}function Zo(t){const e=Jo(t);return e&&e.responseType||"text"}function Qo(t,e,n,r){const i=Jo((e=e||{}).type||"json");return i||s("Unknown data format type: "+e.type),t=i(t,e),e.parse&&function(t,e,n,r){if(!t.length)return;const i=Eo();n=n||i.timeParse,r=r||i.utcParse;let o,a,s,u,l,c,f=t.columns||Object.keys(t[0]);"auto"===e&&(e=Io(t,f));f=Object.keys(e);const h=f.map((t=>{const i=e[t];let o,a;if(i&&(i.startsWith("date:")||i.startsWith("utc:"))){o=i.split(/:(.+)?/,2),a=o[1],("'"===a[0]&&"'"===a[a.length-1]||'"'===a[0]&&'"'===a[a.length-1])&&(a=a.slice(1,-1));return("utc"===o[0]?r:n)(a)}if(!Uo[i])throw Error("Illegal format pattern: "+t+":"+i);return Uo[i]}));for(s=0,l=t.length,c=f.length;s<l;++s)for(o=t[s],u=0;u<c;++u)a=f[u],o[a]=h[u](o[a])}(t,e.parse,n,r),rt(t,"columns")&&delete t.columns,t}const Ko=t=>({options:t||{},sanitize:zo,load:No,fileAccess:!1,file:Oo,http:Ro});function ta(t){const e=t||f,n=[],r={};return n.add=t=>{const i=e(t);return r[i]||(r[i]=1,n.push(t)),n},n.remove=t=>{const i=e(t);if(r[i]){r[i]=0;const e=n.indexOf(t);e>=0&&n.splice(e,1)}return n},n}async function ea(t,e){try{await e(t)}catch(e){t.error(e)}}const na=Symbol("vega_id");let ra=1;function ia(t){return!(!t||!oa(t))}function oa(t){return t[na]}function aa(t,e){return t[na]=e,t}function sa(t){const e=t===Object(t)?t:{data:t};return oa(e)?e:aa(e,ra++)}function ua(t){return la(t,sa({}))}function la(t,e){for(const n in t)e[n]=t[n];return e}function ca(t,e){return aa(e,oa(t))}function fa(t,e){return t?e?(n,r)=>t(n,r)||oa(e(n))-oa(e(r)):(e,n)=>t(e,n)||oa(e)-oa(n):null}function ha(t){return t&&t.constructor===da}function da(){const t=[],e=[],n=[],r=[],i=[];let o=null,a=!1;return{constructor:da,insert(e){const n=W(e),r=n.length;for(let e=0;e<r;++e)t.push(n[e]);return this},remove(t){const n=Y(t)?r:e,i=W(t),o=i.length;for(let t=0;t<o;++t)n.push(i[t]);return this},modify(t,e,r){const o={field:e,value:Q(r)};return Y(t)?(o.filter=t,i.push(o)):(o.tuple=t,n.push(o)),this},encode(t,e){return Y(t)?i.push({filter:t,field:e}):n.push({tuple:t,field:e}),this},clean(t){return o=t,this},reflow(){return a=!0,this},pulse(s,u){const l={},c={};let f,h,d,p,g,m;for(f=0,h=u.length;f<h;++f)l[oa(u[f])]=1;for(f=0,h=e.length;f<h;++f)g=e[f],l[oa(g)]=-1;for(f=0,h=r.length;f<h;++f)p=r[f],u.forEach((t=>{p(t)&&(l[oa(t)]=-1)}));for(f=0,h=t.length;f<h;++f)g=t[f],m=oa(g),l[m]?l[m]=1:s.add.push(sa(t[f]));for(f=0,h=u.length;f<h;++f)g=u[f],l[oa(g)]<0&&s.rem.push(g);function y(t,e,n){n?t[e]=n(t):s.encode=e,a||(c[oa(t)]=t)}for(f=0,h=n.length;f<h;++f)d=n[f],g=d.tuple,p=d.field,m=l[oa(g)],m>0&&(y(g,p,d.value),s.modifies(p));for(f=0,h=i.length;f<h;++f)d=i[f],p=d.filter,u.forEach((t=>{p(t)&&l[oa(t)]>0&&y(t,d.field,d.value)})),s.modifies(d.field);if(a)s.mod=e.length||r.length?u.filter((t=>l[oa(t)]>0)):u.slice();else for(m in c)s.mod.push(c[m]);return(o||null==o&&(e.length||r.length))&&s.clean(!0),s}}}const pa="_:mod:_";function ga(){Object.defineProperty(this,pa,{writable:!0,value:{}})}ga.prototype={set(t,e,n,r){const i=this,o=i[t],a=i[pa];return null!=e&&e>=0?(o[e]!==n||r)&&(o[e]=n,a[e+":"+t]=-1,a[t]=-1):(o!==n||r)&&(i[t]=n,a[t]=_(n)?1+n.length:-1),i},modified(t,e){const n=this[pa];if(!arguments.length){for(const t in n)if(n[t])return!0;return!1}if(_(t)){for(let e=0;e<t.length;++e)if(n[t[e]])return!0;return!1}return null!=e&&e>=0?e+1<n[t]||!!n[e+":"+t]:!!n[t]},clear(){return this[pa]={},this}};let ma=0;const ya=new ga;function va(t,e,n,r){this.id=++ma,this.value=t,this.stamp=-1,this.rank=-1,this.qrank=-1,this.flags=0,e&&(this._update=e),n&&this.parameters(n,r)}function _a(t){return function(e){const n=this.flags;return 0===arguments.length?!!(n&t):(this.flags=e?n|t:n&~t,this)}}va.prototype={targets(){return this._targets||(this._targets=ta(c))},set(t){return this.value!==t?(this.value=t,1):0},skip:_a(1),modified:_a(2),parameters(t,e,n){e=!1!==e;const r=this._argval=this._argval||new ga,i=this._argops=this._argops||[],o=[];let a,u,l,c;const f=(t,n,a)=>{a instanceof va?(a!==this&&(e&&a.targets().add(this),o.push(a)),i.push({op:a,name:t,index:n})):r.set(t,n,a)};for(a in t)if(u=t[a],"pulse"===a)W(u).forEach((t=>{t instanceof va?t!==this&&(t.targets().add(this),o.push(t)):s("Pulse parameters must be operator instances.")})),this.source=u;else if(_(u))for(r.set(a,-1,Array(l=u.length)),c=0;c<l;++c)f(a,c,u[c]);else f(a,-1,u);return this.marshall().clear(),n&&(i.initonly=!0),o},marshall(t){const e=this._argval||ya,n=this._argops;let r,i,o,a;if(n){const s=n.length;for(i=0;i<s;++i)r=n[i],o=r.op,a=o.modified()&&o.stamp===t,e.set(r.name,r.index,o.value,a);if(n.initonly){for(i=0;i<s;++i)r=n[i],r.op.targets().remove(this);this._argops=null,this._update=null}}return e},detach(){const t=this._argops;let e,n,r,i;if(t)for(e=0,n=t.length;e<n;++e)r=t[e],i=r.op,i._targets&&i._targets.remove(this);this.pulse=null,this.source=null},evaluate(t){const e=this._update;if(e){const n=this.marshall(t.stamp),r=e.call(this,n,t);if(n.clear(),r!==this.value)this.value=r;else if(!this.modified())return t.StopPropagation}},run(t){if(t.stamp<this.stamp)return t.StopPropagation;let e;return this.skip()?(this.skip(!1),e=0):e=this.evaluate(t),this.pulse=e||t}};let xa=0;function ba(t,e,n){this.id=++xa,this.value=null,n&&(this.receive=n),t&&(this._filter=t),e&&(this._apply=e)}function wa(t,e,n){return new ba(t,e,n)}ba.prototype={_filter:p,_apply:f,targets(){return this._targets||(this._targets=ta(c))},consume(t){return arguments.length?(this._consume=!!t,this):!!this._consume},receive(t){if(this._filter(t)){const e=this.value=this._apply(t),n=this._targets,r=n?n.length:0;for(let t=0;t<r;++t)n[t].receive(e);this._consume&&(t.preventDefault(),t.stopPropagation())}},filter(t){const e=wa(t);return this.targets().add(e),e},apply(t){const e=wa(null,t);return this.targets().add(e),e},merge(){const t=wa();this.targets().add(t);for(let e=0,n=arguments.length;e<n;++e)arguments[e].targets().add(t);return t},throttle(t){let e=-1;return this.filter((()=>{const n=Date.now();return n-e>t?(e=n,1):0}))},debounce(t){const e=wa();return this.targets().add(wa(null,null,K(t,(t=>{const n=t.dataflow;e.receive(t),n&&n.run&&n.run()})))),e},between(t,e){let n=!1;return t.targets().add(wa(null,null,(()=>n=!0))),e.targets().add(wa(null,null,(()=>n=!1))),this.filter((()=>n))},detach(){this._filter=p,this._targets=null}};const ka={skip:!0};function Ma(t,e,n,r,i,o){const a=tt({},o,ka);let s,u;Y(n)||(n=Q(n)),void 0===r?s=e=>t.touch(n(e)):Y(r)?(u=new va(null,r,i,!1),s=e=>{u.evaluate(e);const r=n(e),i=u.value;ha(i)?t.pulse(r,i,o):t.update(r,i,a)}):s=e=>t.update(n(e),r,a),e.apply(s)}function Aa(t,e,n,r,i,o){if(void 0===r)e.targets().add(n);else{const a=o||{},s=new va(null,function(t,e){return e=Y(e)?e:Q(e),t?function(n,r){const i=e(n,r);return t.skip()||(t.skip(i!==this.value).value=i),i}:e}(n,r),i,!1);s.modified(a.force),s.rank=e.rank,e.targets().add(s),n&&(s.skip(!0),s.value=n.value,s.targets().add(n),t.connect(n,[s]))}}const Ea={};function Da(t,e,n){this.dataflow=t,this.stamp=null==e?-1:e,this.add=[],this.rem=[],this.mod=[],this.fields=null,this.encode=n||null}function Ca(t,e){const n=[];return Ft(t,e,(t=>n.push(t))),n}function Fa(t,e){const n={};return t.visit(e,(t=>{n[oa(t)]=1})),t=>n[oa(t)]?null:t}function Sa(t,e){return t?(n,r)=>t(n,r)&&e(n,r):e}function $a(t,e,n,r){const i=this;let o=0;this.dataflow=t,this.stamp=e,this.fields=null,this.encode=r||null,this.pulses=n;for(const t of n)if(t.stamp===e){if(t.fields){const e=i.fields||(i.fields={});for(const n in t.fields)e[n]=1}t.changed(i.ADD)&&(o|=i.ADD),t.changed(i.REM)&&(o|=i.REM),t.changed(i.MOD)&&(o|=i.MOD)}this.changes=o}function Ta(t){return t.error("Dataflow already running. Use runAsync() to chain invocations."),t}Da.prototype={StopPropagation:Ea,ADD:1,REM:2,MOD:4,ADD_REM:3,ADD_MOD:5,ALL:7,REFLOW:8,SOURCE:16,NO_SOURCE:32,NO_FIELDS:64,fork(t){return new Da(this.dataflow).init(this,t)},clone(){const t=this.fork(7);return t.add=t.add.slice(),t.rem=t.rem.slice(),t.mod=t.mod.slice(),t.source&&(t.source=t.source.slice()),t.materialize(23)},addAll(){let t=this;return!t.source||t.add===t.rem||!t.rem.length&&t.source.length===t.add.length||(t=new Da(this.dataflow).init(this),t.add=t.source,t.rem=[]),t},init(t,e){const n=this;return n.stamp=t.stamp,n.encode=t.encode,!t.fields||64&e||(n.fields=t.fields),1&e?(n.addF=t.addF,n.add=t.add):(n.addF=null,n.add=[]),2&e?(n.remF=t.remF,n.rem=t.rem):(n.remF=null,n.rem=[]),4&e?(n.modF=t.modF,n.mod=t.mod):(n.modF=null,n.mod=[]),32&e?(n.srcF=null,n.source=null):(n.srcF=t.srcF,n.source=t.source,t.cleans&&(n.cleans=t.cleans)),n},runAfter(t){this.dataflow.runAfter(t)},changed(t){const e=t||7;return 1&e&&this.add.length||2&e&&this.rem.length||4&e&&this.mod.length},reflow(t){if(t)return this.fork(7).reflow();const e=this.add.length,n=this.source&&this.source.length;return n&&n!==e&&(this.mod=this.source,e&&this.filter(4,Fa(this,1))),this},clean(t){return arguments.length?(this.cleans=!!t,this):this.cleans},modifies(t){const e=this.fields||(this.fields={});return _(t)?t.forEach((t=>e[t]=!0)):e[t]=!0,this},modified(t,e){const n=this.fields;return!(!e&&!this.mod.length||!n)&&(arguments.length?_(t)?t.some((t=>n[t])):n[t]:!!n)},filter(t,e){const n=this;return 1&t&&(n.addF=Sa(n.addF,e)),2&t&&(n.remF=Sa(n.remF,e)),4&t&&(n.modF=Sa(n.modF,e)),16&t&&(n.srcF=Sa(n.srcF,e)),n},materialize(t){const e=this;return 1&(t=t||7)&&e.addF&&(e.add=Ca(e.add,e.addF),e.addF=null),2&t&&e.remF&&(e.rem=Ca(e.rem,e.remF),e.remF=null),4&t&&e.modF&&(e.mod=Ca(e.mod,e.modF),e.modF=null),16&t&&e.srcF&&(e.source=e.source.filter(e.srcF),e.srcF=null),e},visit(t,e){const n=this,r=e;if(16&t)return Ft(n.source,n.srcF,r),n;1&t&&Ft(n.add,n.addF,r),2&t&&Ft(n.rem,n.remF,r),4&t&&Ft(n.mod,n.modF,r);const i=n.source;if(8&t&&i){const t=n.add.length+n.mod.length;t===i.length||Ft(i,t?Fa(n,5):n.srcF,r)}return n}},st($a,Da,{fork(t){const e=new Da(this.dataflow).init(this,t&this.NO_FIELDS);return void 0!==t&&(t&e.ADD&&this.visit(e.ADD,(t=>e.add.push(t))),t&e.REM&&this.visit(e.REM,(t=>e.rem.push(t))),t&e.MOD&&this.visit(e.MOD,(t=>e.mod.push(t)))),e},changed(t){return this.changes&t},modified(t){const e=this,n=e.fields;return n&&e.changes&e.MOD?_(t)?t.some((t=>n[t])):n[t]:0},filter(){s("MultiPulse does not support filtering.")},materialize(){s("MultiPulse does not support materialization.")},visit(t,e){const n=this,r=n.pulses,i=r.length;let o=0;if(t&n.SOURCE)for(;o<i;++o)r[o].visit(t,e);else for(;o<i;++o)r[o].stamp===n.stamp&&r[o].visit(t,e);return n}});const Ba={skip:!1,force:!1};function Na(t){let e=[];return{clear:()=>e=[],size:()=>e.length,peek:()=>e[0],push:n=>(e.push(n),za(e,0,e.length-1,t)),pop:()=>{const n=e.pop();let r;return e.length?(r=e[0],e[0]=n,function(t,e,n){const r=e,i=t.length,o=t[e];let a,s=1+(e<<1);for(;s<i;)a=s+1,a<i&&n(t[s],t[a])>=0&&(s=a),t[e]=t[s],s=1+((e=s)<<1);t[e]=o,za(t,r,e,n)}(e,0,t)):r=n,r}}}function za(t,e,n,r){let i,o;const a=t[n];for(;n>e&&(o=n-1>>1,i=t[o],r(a,i)<0);)t[n]=i,n=o;return t[n]=a}function Oa(){this.logger(v()),this.logLevel(1),this._clock=0,this._rank=0,this._locale=Fo();try{this._loader=Ko()}catch(t){}this._touched=ta(c),this._input={},this._pulse=null,this._heap=Na(((t,e)=>t.qrank-e.qrank)),this._postrun=[]}function Ra(t){return function(){return this._log[t].apply(this,arguments)}}function La(t,e){va.call(this,t,null,e)}Oa.prototype={stamp(){return this._clock},loader(t){return arguments.length?(this._loader=t,this):this._loader},locale(t){return arguments.length?(this._locale=t,this):this._locale},logger(t){return arguments.length?(this._log=t,this):this._log},error:Ra("error"),warn:Ra("warn"),info:Ra("info"),debug:Ra("debug"),logLevel:Ra("level"),cleanThreshold:1e4,add:function(t,e,n,r){let i,o=1;return t instanceof va?i=t:t&&t.prototype instanceof va?i=new t:Y(t)?i=new va(null,t):(o=0,i=new va(t,e)),this.rank(i),o&&(r=n,n=e),n&&this.connect(i,i.parameters(n,r)),this.touch(i),i},connect:function(t,e){const n=t.rank,r=e.length;for(let i=0;i<r;++i)if(n<e[i].rank)return void this.rerank(t)},rank:function(t){t.rank=++this._rank},rerank:function(t){const e=[t];let n,r,i;for(;e.length;)if(this.rank(n=e.pop()),r=n._targets)for(i=r.length;--i>=0;)e.push(n=r[i]),n===t&&s("Cycle detected in dataflow graph.")},pulse:function(t,e,n){this.touch(t,n||Ba);const r=new Da(this,this._clock+(this._pulse?0:1)),i=t.pulse&&t.pulse.source||[];return r.target=t,this._input[t.id]=e.pulse(r,i),this},touch:function(t,e){const n=e||Ba;return this._pulse?this._enqueue(t):this._touched.add(t),n.skip&&t.skip(!0),this},update:function(t,e,n){const r=n||Ba;return(t.set(e)||r.force)&&this.touch(t,r),this},changeset:da,ingest:function(t,e,n){return e=this.parse(e,n),this.pulse(t,this.changeset().insert(e))},parse:function(t,e){const n=this.locale();return Qo(t,e,n.timeParse,n.utcParse)},preload:async function(t,e,n){const r=this,i=r._pending||function(t){let e;const n=new Promise((t=>e=t));return n.requests=0,n.done=()=>{0==--n.requests&&(t._pending=null,e(t))},t._pending=n}(r);i.requests+=1;const o=await r.request(e,n);return r.pulse(t,r.changeset().remove(p).insert(o.data||[])),i.done(),o},request:async function(t,e){const n=this;let r,i=0;try{r=await n.loader().load(t,{context:"dataflow",response:Zo(e&&e.type)});try{r=n.parse(r,e)}catch(e){i=-2,n.warn("Data ingestion failed",t,e)}}catch(e){i=-1,n.warn("Loading failed",t,e)}return{data:r,status:i}},events:function(t,e,n,r){const i=this,o=wa(n,r),a=function(t){t.dataflow=i;try{o.receive(t)}catch(t){i.error(t)}finally{i.run()}};let s;s="string"==typeof t&&"undefined"!=typeof document?document.querySelectorAll(t):W(t);const u=s.length;for(let t=0;t<u;++t)s[t].addEventListener(e,a);return o},on:function(t,e,n,r,i){return(t instanceof va?Aa:Ma)(this,t,e,n,r,i),this},evaluate:async function(t,e,n){const r=this,i=[];if(r._pulse)return Ta(r);if(r._pending&&await r._pending,e&&await ea(r,e),!r._touched.length)return r.debug("Dataflow invoked, but nothing to do."),r;const o=++r._clock;r._pulse=new Da(r,o,t),r._touched.forEach((t=>r._enqueue(t,!0))),r._touched=ta(c);let a,s,u,l=0;try{for(;r._heap.size()>0;)a=r._heap.pop(),a.rank===a.qrank?(s=a.run(r._getPulse(a,t)),s.then?s=await s:s.async&&(i.push(s.async),s=Ea),s!==Ea&&a._targets&&a._targets.forEach((t=>r._enqueue(t))),++l):r._enqueue(a,!0)}catch(t){r._heap.clear(),u=t}if(r._input={},r._pulse=null,r.debug(`Pulse ${o}: ${l} operators`),u&&(r._postrun=[],r.error(u)),r._postrun.length){const t=r._postrun.sort(((t,e)=>e.priority-t.priority));r._postrun=[];for(let e=0;e<t.length;++e)await ea(r,t[e].callback)}return n&&await ea(r,n),i.length&&Promise.all(i).then((t=>r.runAsync(null,(()=>{t.forEach((t=>{try{t(r)}catch(t){r.error(t)}}))})))),r},run:function(t,e,n){return this._pulse?Ta(this):(this.evaluate(t,e,n),this)},runAsync:async function(t,e,n){for(;this._running;)await this._running;const r=()=>this._running=null;return(this._running=this.evaluate(t,e,n)).then(r,r),this._running},runAfter:function(t,e,n){if(this._pulse||e)this._postrun.push({priority:n||0,callback:t});else try{t(this)}catch(t){this.error(t)}},_enqueue:function(t,e){const n=t.stamp<this._clock;n&&(t.stamp=this._clock),(n||e)&&(t.qrank=t.rank,this._heap.push(t))},_getPulse:function(t,e){const n=t.source,r=this._clock;return n&&_(n)?new $a(this,r,n.map((t=>t.pulse)),e):this._input[t.id]||function(t,e){if(e&&e.stamp===t.stamp)return e;t=t.fork(),e&&e!==Ea&&(t.source=e.source);return t}(this._pulse,n&&n.pulse)}},st(La,va,{run(t){if(t.stamp<this.stamp)return t.StopPropagation;let e;return this.skip()?this.skip(!1):e=this.evaluate(t),e=e||t,e.then?e=e.then((t=>this.pulse=t)):e!==t.StopPropagation&&(this.pulse=e),e},evaluate(t){const e=this.marshall(t.stamp),n=this.transform(e,t);return e.clear(),n},transform(){}});const Ua={};function qa(t){const e=Pa(t);return e&&e.Definition||null}function Pa(t){return t=t&&t.toLowerCase(),rt(Ua,t)?Ua[t]:null}function*ja(t,e){if(null==e)for(let e of t)null!=e&&""!==e&&(e=+e)>=e&&(yield e);else{let n=-1;for(let r of t)r=e(r,++n,t),null!=r&&""!==r&&(r=+r)>=r&&(yield r)}}function Ia(t,e,n){const r=Float64Array.from(ja(t,n));return r.sort(Wt),e.map((t=>ve(r,t)))}function Wa(t,e){return Ia(t,[.25,.5,.75],e)}function Ha(t,e){const n=t.length,r=function(t,e){const n=function(t,e){let n,r=0,i=0,o=0;if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(n=e-i,i+=n/++r,o+=n*(e-i));else{let a=-1;for(let s of t)null!=(s=e(s,++a,t))&&(s=+s)>=s&&(n=s-i,i+=n/++r,o+=n*(s-i))}if(r>1)return o/(r-1)}(t,e);return n?Math.sqrt(n):n}(t,e),i=Wa(t,e),o=(i[2]-i[0])/1.34;return 1.06*(Math.min(r,o)||r||Math.abs(i[0])||1)*Math.pow(n,-.2)}function Ya(t){const e=t.maxbins||20,n=t.base||10,r=Math.log(n),i=t.divide||[5,2];let o,a,s,u,l,c,f=t.extent[0],h=t.extent[1];const d=t.span||h-f||Math.abs(f)||1;if(t.step)o=t.step;else if(t.steps){for(u=d/e,l=0,c=t.steps.length;l<c&&t.steps[l]<u;++l);o=t.steps[Math.max(0,l-1)]}else{for(a=Math.ceil(Math.log(e)/r),s=t.minstep||0,o=Math.max(s,Math.pow(n,Math.round(Math.log(d)/r)-a));Math.ceil(d/o)>e;)o*=n;for(l=0,c=i.length;l<c;++l)u=o/i[l],u>=s&&d/u<=e&&(o=u)}u=Math.log(o);const p=u>=0?0:1+~~(-u/r),g=Math.pow(n,-p-1);return(t.nice||void 0===t.nice)&&(u=Math.floor(f/o+g)*o,f=f<u?u-o:u,h=Math.ceil(h/o)*o),{start:f,stop:h===f?f+o:h,step:o}}function Ga(e,n,r,i){if(!e.length)return[void 0,void 0];const o=Float64Array.from(ja(e,i)),a=o.length,s=n;let u,l,c,f;for(c=0,f=Array(s);c<s;++c){for(u=0,l=0;l<a;++l)u+=o[~~(t.random()*a)];f[c]=u/a}return f.sort(Wt),[ye(f,r/2),ye(f,1-r/2)]}function Va(t,e,n,r){r=r||(t=>t);const i=t.length,o=new Float64Array(i);let a,s=0,u=1,l=r(t[0]),c=l,f=l+e;for(;u<i;++u){if(a=r(t[u]),a>=f){for(c=(l+c)/2;s<u;++s)o[s]=c;f=a+e,l=a}c=a}for(c=(l+c)/2;s<u;++s)o[s]=c;return n?function(t,e){const n=t.length;let r,i,o=0,a=1;for(;t[o]===t[a];)++a;for(;a<n;){for(r=a+1;t[a]===t[r];)++r;if(t[a]-t[a-1]<e){for(i=a+(o+r-a-a>>1);i<a;)t[i++]=t[a];for(;i>a;)t[i--]=t[o]}o=a,a=r}return t}(o,e+e/4):o}t.random=Math.random;const Xa=Math.sqrt(2*Math.PI),Ja=Math.SQRT2;let Za=NaN;function Qa(e,n){e=e||0,n=null==n?1:n;let r,i,o=0,a=0;if(Za==Za)o=Za,Za=NaN;else{do{o=2*t.random()-1,a=2*t.random()-1,r=o*o+a*a}while(0===r||r>1);i=Math.sqrt(-2*Math.log(r)/r),o*=i,Za=a*i}return e+o*n}function Ka(t,e,n){const r=(t-(e||0))/(n=null==n?1:n);return Math.exp(-.5*r*r)/(n*Xa)}function ts(t,e,n){const r=(t-(e=e||0))/(n=null==n?1:n),i=Math.abs(r);let o;if(i>37)o=0;else{const t=Math.exp(-i*i/2);let e;i<7.07106781186547?(e=.0352624965998911*i+.700383064443688,e=e*i+6.37396220353165,e=e*i+33.912866078383,e=e*i+112.079291497871,e=e*i+221.213596169931,e=e*i+220.206867912376,o=t*e,e=.0883883476483184*i+1.75566716318264,e=e*i+16.064177579207,e=e*i+86.7807322029461,e=e*i+296.564248779674,e=e*i+637.333633378831,e=e*i+793.826512519948,e=e*i+440.413735824752,o/=e):(e=i+.65,e=i+4/e,e=i+3/e,e=i+2/e,e=i+1/e,o=t/e/2.506628274631)}return r>0?1-o:o}function es(t,e,n){return t<0||t>1?NaN:(e||0)+(null==n?1:n)*Ja*function(t){let e,n=-Math.log((1-t)*(1+t));n<6.25?(n-=3.125,e=-364441206401782e-35,e=e*n-16850591381820166e-35,e=128584807152564e-32+e*n,e=11157877678025181e-33+e*n,e=e*n-1333171662854621e-31,e=20972767875968562e-33+e*n,e=6637638134358324e-30+e*n,e=e*n-4054566272975207e-29,e=e*n-8151934197605472e-29,e=26335093153082323e-28+e*n,e=e*n-12975133253453532e-27,e=e*n-5415412054294628e-26,e=1.0512122733215323e-9+e*n,e=e*n-4.112633980346984e-9,e=e*n-2.9070369957882005e-8,e=4.2347877827932404e-7+e*n,e=e*n-13654692000834679e-22,e=e*n-13882523362786469e-21,e=.00018673420803405714+e*n,e=e*n-.000740702534166267,e=e*n-.006033670871430149,e=.24015818242558962+e*n,e=1.6536545626831027+e*n):n<16?(n=Math.sqrt(n)-3.25,e=2.2137376921775787e-9,e=9.075656193888539e-8+e*n,e=e*n-2.7517406297064545e-7,e=1.8239629214389228e-8+e*n,e=15027403968909828e-22+e*n,e=e*n-4013867526981546e-21,e=29234449089955446e-22+e*n,e=12475304481671779e-21+e*n,e=e*n-47318229009055734e-21,e=6828485145957318e-20+e*n,e=24031110387097894e-21+e*n,e=e*n-.0003550375203628475,e=.0009532893797373805+e*n,e=e*n-.0016882755560235047,e=.002491442096107851+e*n,e=e*n-.003751208507569241,e=.005370914553590064+e*n,e=1.0052589676941592+e*n,e=3.0838856104922208+e*n):Number.isFinite(n)?(n=Math.sqrt(n)-5,e=-27109920616438573e-27,e=e*n-2.555641816996525e-10,e=1.5076572693500548e-9+e*n,e=e*n-3.789465440126737e-9,e=7.61570120807834e-9+e*n,e=e*n-1.496002662714924e-8,e=2.914795345090108e-8+e*n,e=e*n-6.771199775845234e-8,e=2.2900482228026655e-7+e*n,e=e*n-9.9298272942317e-7,e=4526062597223154e-21+e*n,e=e*n-1968177810553167e-20,e=7599527703001776e-20+e*n,e=e*n-.00021503011930044477,e=e*n-.00013871931833623122,e=1.0103004648645344+e*n,e=4.849906401408584+e*n):e=1/0;return e*t}(2*t-1)}function ns(t,e){let n,r;const i={mean(t){return arguments.length?(n=t||0,i):n},stdev(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>Qa(n,r),pdf:t=>Ka(t,n,r),cdf:t=>ts(t,n,r),icdf:t=>es(t,n,r)};return i.mean(t).stdev(e)}function rs(e,n){const r=ns();let i=0;const o={data(t){return arguments.length?(e=t,i=t?t.length:0,o.bandwidth(n)):e},bandwidth(t){return arguments.length?(!(n=t)&&e&&(n=Ha(e)),o):n},sample:()=>e[~~(t.random()*i)]+n*r.sample(),pdf(t){let o=0,a=0;for(;a<i;++a)o+=r.pdf((t-e[a])/n);return o/n/i},cdf(t){let o=0,a=0;for(;a<i;++a)o+=r.cdf((t-e[a])/n);return o/i},icdf(){throw Error("KDE icdf not supported.")}};return o.data(e)}function is(t,e){return t=t||0,e=null==e?1:e,Math.exp(t+Qa()*e)}function os(t,e,n){if(t<=0)return 0;e=e||0,n=null==n?1:n;const r=(Math.log(t)-e)/n;return Math.exp(-.5*r*r)/(n*Xa*t)}function as(t,e,n){return ts(Math.log(t),e,n)}function ss(t,e,n){return Math.exp(es(t,e,n))}function us(t,e){let n,r;const i={mean(t){return arguments.length?(n=t||0,i):n},stdev(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>is(n,r),pdf:t=>os(t,n,r),cdf:t=>as(t,n,r),icdf:t=>ss(t,n,r)};return i.mean(t).stdev(e)}function ls(e,n){let r,i=0;const o={weights(t){return arguments.length?(r=function(t){const e=[];let n,r=0;for(n=0;n<i;++n)r+=e[n]=null==t[n]?1:+t[n];for(n=0;n<i;++n)e[n]/=r;return e}(n=t||[]),o):n},distributions(t){return arguments.length?(t?(i=t.length,e=t):(i=0,e=[]),o.weights(n)):e},sample(){const n=t.random();let o=e[i-1],a=r[0],s=0;for(;s<i-1;a+=r[++s])if(n<a){o=e[s];break}return o.sample()},pdf(t){let n=0,o=0;for(;o<i;++o)n+=r[o]*e[o].pdf(t);return n},cdf(t){let n=0,o=0;for(;o<i;++o)n+=r[o]*e[o].cdf(t);return n},icdf(){throw Error("Mixture icdf not supported.")}};return o.distributions(e).weights(n)}function cs(e,n){return null==n&&(n=null==e?1:e,e=0),e+(n-e)*t.random()}function fs(t,e,n){return null==n&&(n=null==e?1:e,e=0),t>=e&&t<=n?1/(n-e):0}function hs(t,e,n){return null==n&&(n=null==e?1:e,e=0),t<e?0:t>n?1:(t-e)/(n-e)}function ds(t,e,n){return null==n&&(n=null==e?1:e,e=0),t>=0&&t<=1?e+t*(n-e):NaN}function ps(t,e){let n,r;const i={min(t){return arguments.length?(n=t||0,i):n},max(t){return arguments.length?(r=null==t?1:t,i):r},sample:()=>cs(n,r),pdf:t=>fs(t,n,r),cdf:t=>hs(t,n,r),icdf:t=>ds(t,n,r)};return null==e&&(e=null==t?1:t,t=0),i.min(t).max(e)}function gs(t,e,n){let r=0,i=0;for(const o of t){const t=n(o);null==e(o)||null==t||isNaN(t)||(r+=(t-r)/++i)}return{coef:[r],predict:()=>r,rSquared:0}}function ms(t,e,n,r){const i=r-t*t,o=Math.abs(i)<1e-24?0:(n-t*e)/i;return[e-o*t,o]}function ys(t,e,n,r){t=t.filter((t=>{let r=e(t),i=n(t);return null!=r&&(r=+r)>=r&&null!=i&&(i=+i)>=i})),r&&t.sort(((t,n)=>e(t)-e(n)));const i=t.length,o=new Float64Array(i),a=new Float64Array(i);let s,u,l,c=0,f=0,h=0;for(l of t)o[c]=s=+e(l),a[c]=u=+n(l),++c,f+=(s-f)/c,h+=(u-h)/c;for(c=0;c<i;++c)o[c]-=f,a[c]-=h;return[o,a,f,h]}function vs(t,e,n,r){let i,o,a=-1;for(const s of t)i=e(s),o=n(s),null!=i&&(i=+i)>=i&&null!=o&&(o=+o)>=o&&r(i,o,++a)}function _s(t,e,n,r,i){let o=0,a=0;return vs(t,e,n,((t,e)=>{const n=e-i(t),s=e-r;o+=n*n,a+=s*s})),1-o/a}function xs(t,e,n){let r=0,i=0,o=0,a=0,s=0;vs(t,e,n,((t,e)=>{++s,r+=(t-r)/s,i+=(e-i)/s,o+=(t*e-o)/s,a+=(t*t-a)/s}));const u=ms(r,i,o,a),l=t=>u[0]+u[1]*t;return{coef:u,predict:l,rSquared:_s(t,e,n,i,l)}}function bs(t,e,n){let r=0,i=0,o=0,a=0,s=0;vs(t,e,n,((t,e)=>{++s,t=Math.log(t),r+=(t-r)/s,i+=(e-i)/s,o+=(t*e-o)/s,a+=(t*t-a)/s}));const u=ms(r,i,o,a),l=t=>u[0]+u[1]*Math.log(t);return{coef:u,predict:l,rSquared:_s(t,e,n,i,l)}}function ws(t,e,n){const[r,i,o,a]=ys(t,e,n);let s,u,l,c=0,f=0,h=0,d=0,p=0;vs(t,e,n,((t,e)=>{s=r[p++],u=Math.log(e),l=s*e,c+=(e*u-c)/p,f+=(l-f)/p,h+=(l*u-h)/p,d+=(s*l-d)/p}));const[g,m]=ms(f/a,c/a,h/a,d/a),y=t=>Math.exp(g+m*(t-o));return{coef:[Math.exp(g-m*o),m],predict:y,rSquared:_s(t,e,n,a,y)}}function ks(t,e,n){let r=0,i=0,o=0,a=0,s=0,u=0;vs(t,e,n,((t,e)=>{const n=Math.log(t),l=Math.log(e);++u,r+=(n-r)/u,i+=(l-i)/u,o+=(n*l-o)/u,a+=(n*n-a)/u,s+=(e-s)/u}));const l=ms(r,i,o,a),c=t=>l[0]*Math.pow(t,l[1]);return l[0]=Math.exp(l[0]),{coef:l,predict:c,rSquared:_s(t,e,n,s,c)}}function Ms(t,e,n){const[r,i,o,a]=ys(t,e,n),s=r.length;let u,l,c,f,h=0,d=0,p=0,g=0,m=0;for(u=0;u<s;)l=r[u],c=i[u++],f=l*l,h+=(f-h)/u,d+=(f*l-d)/u,p+=(f*f-p)/u,g+=(l*c-g)/u,m+=(f*c-m)/u;const y=p-h*h,v=h*y-d*d,_=(m*h-g*d)/v,x=(g*y-m*d)/v,b=-_*h,w=t=>_*(t-=o)*t+x*t+b+a;return{coef:[b-x*o+_*o*o+a,x-2*_*o,_],predict:w,rSquared:_s(t,e,n,a,w)}}function As(t,e,n,r){if(0===r)return gs(t,e,n);if(1===r)return xs(t,e,n);if(2===r)return Ms(t,e,n);const[i,o,a,s]=ys(t,e,n),u=i.length,l=[],c=[],f=r+1;let h,d,p,g,m;for(h=0;h<f;++h){for(p=0,g=0;p<u;++p)g+=Math.pow(i[p],h)*o[p];for(l.push(g),m=new Float64Array(f),d=0;d<f;++d){for(p=0,g=0;p<u;++p)g+=Math.pow(i[p],h+d);m[d]=g}c.push(m)}c.push(l);const y=function(t){const e=t.length-1,n=[];let r,i,o,a,s;for(r=0;r<e;++r){for(a=r,i=r+1;i<e;++i)Math.abs(t[r][i])>Math.abs(t[r][a])&&(a=i);for(o=r;o<e+1;++o)s=t[o][r],t[o][r]=t[o][a],t[o][a]=s;for(i=r+1;i<e;++i)for(o=e;o>=r;o--)t[o][i]-=t[o][r]*t[r][i]/t[r][r]}for(i=e-1;i>=0;--i){for(s=0,o=i+1;o<e;++o)s+=t[o][i]*n[o];n[i]=(t[e][i]-s)/t[i][i]}return n}(c),v=t=>{t-=a;let e=s+y[0]+y[1]*t+y[2]*t*t;for(h=3;h<f;++h)e+=y[h]*Math.pow(t,h);return e};return{coef:Es(f,y,-a,s),predict:v,rSquared:_s(t,e,n,s,v)}}function Es(t,e,n,r){const i=Array(t);let o,a,s,u;for(o=0;o<t;++o)i[o]=0;for(o=t-1;o>=0;--o)for(s=e[o],u=1,i[o]+=s,a=1;a<=o;++a)u*=(o+1-a)/a,i[o-a]+=s*Math.pow(n,a)*u;return i[0]+=r,i}function Ds(t,e,n,r){const[i,o,a,s]=ys(t,e,n,!0),u=i.length,l=Math.max(2,~~(r*u)),c=new Float64Array(u),f=new Float64Array(u),h=new Float64Array(u).fill(1);for(let t=-1;++t<=2;){const e=[0,l-1];for(let t=0;t<u;++t){const n=i[t],r=e[0],a=e[1],s=n-i[r]>i[a]-n?r:a;let u=0,l=0,d=0,p=0,g=0;const m=1/Math.abs(i[s]-n||1);for(let t=r;t<=a;++t){const e=i[t],r=o[t],a=Cs(Math.abs(n-e)*m)*h[t],s=e*a;u+=a,l+=s,d+=r*a,p+=r*s,g+=e*s}const[y,v]=ms(l/u,d/u,p/u,g/u);c[t]=y+v*n,f[t]=Math.abs(o[t]-c[t]),Fs(i,t+1,e)}if(2===t)break;const n=_e(f);if(Math.abs(n)<1e-12)break;for(let t,e,r=0;r<u;++r)t=f[r]/(6*n),h[r]=t>=1?1e-12:(e=1-t*t)*e}return function(t,e,n,r){const i=t.length,o=[];let a,s=0,u=0,l=[];for(;s<i;++s)a=t[s]+n,l[0]===a?l[1]+=(e[s]-l[1])/++u:(u=0,l[1]+=r,l=[a,e[s]],o.push(l));return l[1]+=r,o}(i,c,a,s)}function Cs(t){return(t=1-t*t*t)*t*t}function Fs(t,e,n){const r=t[e];let i=n[0],o=n[1]+1;if(!(o>=t.length))for(;e>i&&t[o]-r<=r-t[i];)n[0]=++i,n[1]=o,++o}const Ss=.5*Math.PI/180;function $s(t,e,n,r){n=n||25,r=Math.max(n,r||200);const i=e=>[e,t(e)],o=e[0],a=e[1],s=a-o,u=s/r,l=[i(o)],c=[];if(n===r){for(let t=1;t<r;++t)l.push(i(o+t/n*s));return l.push(i(a)),l}c.push(i(a));for(let t=n;--t>0;)c.push(i(o+t/n*s));let f=l[0],h=c[c.length-1];const d=1/s,p=function(t,e){let n=t,r=t;const i=e.length;for(let t=0;t<i;++t){const i=e[t][1];i<n&&(n=i),i>r&&(r=i)}return 1/(r-n)}(f[1],c);for(;h;){const t=i((f[0]+h[0])/2);t[0]-f[0]>=u&&Ts(f,t,h,d,p)>Ss?c.push(t):(f=h,l.push(h),c.pop()),h=c[c.length-1]}return l}function Ts(t,e,n,r,i){const o=Math.atan2(i*(n[1]-t[1]),r*(n[0]-t[0])),a=Math.atan2(i*(e[1]-t[1]),r*(e[0]-t[0]));return Math.abs(o-a)}function Bs(t){return t&&t.length?1===t.length?t[0]:(e=t,t=>{const n=e.length;let r=1,i=String(e[0](t));for(;r<n;++r)i+="|"+e[r](t);return i}):function(){return""};var e}function Ns(t,e,n){return n||t+(e?"_"+e:"")}const zs=()=>{},Os={init:zs,add:zs,rem:zs,idx:0},Rs={values:{init:t=>t.cell.store=!0,value:t=>t.cell.data.values(),idx:-1},count:{value:t=>t.cell.num},__count__:{value:t=>t.missing+t.valid},missing:{value:t=>t.missing},valid:{value:t=>t.valid},sum:{init:t=>t.sum=0,value:t=>t.valid?t.sum:void 0,add:(t,e)=>t.sum+=+e,rem:(t,e)=>t.sum-=e},product:{init:t=>t.product=1,value:t=>t.valid?t.product:void 0,add:(t,e)=>t.product*=e,rem:(t,e)=>t.product/=e},mean:{init:t=>t.mean=0,value:t=>t.valid?t.mean:void 0,add:(t,e)=>(t.mean_d=e-t.mean,t.mean+=t.mean_d/t.valid),rem:(t,e)=>(t.mean_d=e-t.mean,t.mean-=t.valid?t.mean_d/t.valid:t.mean)},average:{value:t=>t.valid?t.mean:void 0,req:["mean"],idx:1},variance:{init:t=>t.dev=0,value:t=>t.valid>1?t.dev/(t.valid-1):void 0,add:(t,e)=>t.dev+=t.mean_d*(e-t.mean),rem:(t,e)=>t.dev-=t.mean_d*(e-t.mean),req:["mean"],idx:1},variancep:{value:t=>t.valid>1?t.dev/t.valid:void 0,req:["variance"],idx:2},stdev:{value:t=>t.valid>1?Math.sqrt(t.dev/(t.valid-1)):void 0,req:["variance"],idx:2},stdevp:{value:t=>t.valid>1?Math.sqrt(t.dev/t.valid):void 0,req:["variance"],idx:2},stderr:{value:t=>t.valid>1?Math.sqrt(t.dev/(t.valid*(t.valid-1))):void 0,req:["variance"],idx:2},distinct:{value:t=>t.cell.data.distinct(t.get),req:["values"],idx:3},ci0:{value:t=>t.cell.data.ci0(t.get),req:["values"],idx:3},ci1:{value:t=>t.cell.data.ci1(t.get),req:["values"],idx:3},median:{value:t=>t.cell.data.q2(t.get),req:["values"],idx:3},q1:{value:t=>t.cell.data.q1(t.get),req:["values"],idx:3},q3:{value:t=>t.cell.data.q3(t.get),req:["values"],idx:3},min:{init:t=>t.min=void 0,value:t=>t.min=Number.isNaN(t.min)?t.cell.data.min(t.get):t.min,add:(t,e)=>{(e<t.min||void 0===t.min)&&(t.min=e)},rem:(t,e)=>{e<=t.min&&(t.min=NaN)},req:["values"],idx:4},max:{init:t=>t.max=void 0,value:t=>t.max=Number.isNaN(t.max)?t.cell.data.max(t.get):t.max,add:(t,e)=>{(e>t.max||void 0===t.max)&&(t.max=e)},rem:(t,e)=>{e>=t.max&&(t.max=NaN)},req:["values"],idx:4},argmin:{init:t=>t.argmin=void 0,value:t=>t.argmin||t.cell.data.argmin(t.get),add:(t,e,n)=>{e<t.min&&(t.argmin=n)},rem:(t,e)=>{e<=t.min&&(t.argmin=void 0)},req:["min","values"],idx:3},argmax:{init:t=>t.argmax=void 0,value:t=>t.argmax||t.cell.data.argmax(t.get),add:(t,e,n)=>{e>t.max&&(t.argmax=n)},rem:(t,e)=>{e>=t.max&&(t.argmax=void 0)},req:["max","values"],idx:3},exponential:{init:(t,e)=>{t.exp=0,t.exp_r=e},value:t=>t.valid?t.exp*(1-t.exp_r)/(1-t.exp_r**t.valid):void 0,add:(t,e)=>t.exp=t.exp_r*t.exp+e,rem:(t,e)=>t.exp=(t.exp-e/t.exp_r**(t.valid-1))/t.exp_r},exponentialb:{value:t=>t.valid?t.exp*(1-t.exp_r):void 0,req:["exponential"],idx:1}},Ls=Object.keys(Rs).filter((t=>"__count__"!==t));function Us(t,e,n){return Rs[t](n,e)}function qs(t,e){return t.idx-e.idx}function Ps(){this.valid=0,this.missing=0,this._ops.forEach((t=>null==t.aggregate_param?t.init(this):t.init(this,t.aggregate_param)))}function js(t,e){null!=t&&""!==t?t==t&&(++this.valid,this._ops.forEach((n=>n.add(this,t,e)))):++this.missing}function Is(t,e){null!=t&&""!==t?t==t&&(--this.valid,this._ops.forEach((n=>n.rem(this,t,e)))):--this.missing}function Ws(t){return this._out.forEach((e=>t[e.out]=e.value(this))),t}function Hs(t,e){const n=e||f,r=function(t){const e={};t.forEach((t=>e[t.name]=t));const n=t=>{t.req&&t.req.forEach((t=>{e[t]||n(e[t]=Rs[t]())}))};return t.forEach(n),Object.values(e).sort(qs)}(t),i=t.slice().sort(qs);function o(t){this._ops=r,this._out=i,this.cell=t,this.init()}return o.prototype.init=Ps,o.prototype.add=js,o.prototype.rem=Is,o.prototype.set=Ws,o.prototype.get=n,o.fields=t.map((t=>t.out)),o}function Ys(t){this._key=t?l(t):oa,this.reset()}[...Ls,"__count__"].forEach((t=>{Rs[t]=function(t,e){return(n,r)=>tt({name:t,aggregate_param:r,out:n||t},Os,e)}(t,Rs[t])}));const Gs=Ys.prototype;function Vs(t){La.call(this,null,t),this._adds=[],this._mods=[],this._alen=0,this._mlen=0,this._drop=!0,this._cross=!1,this._dims=[],this._dnames=[],this._measures=[],this._countOnly=!1,this._counts=null,this._prev=null,this._inputs=null,this._outputs=null}Gs.reset=function(){this._add=[],this._rem=[],this._ext=null,this._get=null,this._q=null},Gs.add=function(t){this._add.push(t)},Gs.rem=function(t){this._rem.push(t)},Gs.values=function(){if(this._get=null,0===this._rem.length)return this._add;const t=this._add,e=this._rem,n=this._key,r=t.length,i=e.length,o=Array(r-i),a={};let s,u,l;for(s=0;s<i;++s)a[n(e[s])]=1;for(s=0,u=0;s<r;++s)a[n(l=t[s])]?a[n(l)]=0:o[u++]=l;return this._rem=[],this._add=o},Gs.distinct=function(t){const e=this.values(),n={};let r,i=e.length,o=0;for(;--i>=0;)r=t(e[i])+"",rt(n,r)||(n[r]=1,++o);return o},Gs.extent=function(t){if(this._get!==t||!this._ext){const e=this.values(),n=nt(e,t);this._ext=[e[n[0]],e[n[1]]],this._get=t}return this._ext},Gs.argmin=function(t){return this.extent(t)[0]||{}},Gs.argmax=function(t){return this.extent(t)[1]||{}},Gs.min=function(t){const e=this.extent(t)[0];return null!=e?t(e):void 0},Gs.max=function(t){const e=this.extent(t)[1];return null!=e?t(e):void 0},Gs.quartile=function(t){return this._get===t&&this._q||(this._q=Wa(this.values(),t),this._get=t),this._q},Gs.q1=function(t){return this.quartile(t)[0]},Gs.q2=function(t){return this.quartile(t)[1]},Gs.q3=function(t){return this.quartile(t)[2]},Gs.ci=function(t){return this._get===t&&this._ci||(this._ci=Ga(this.values(),1e3,.05,t),this._get=t),this._ci},Gs.ci0=function(t){return this.ci(t)[0]},Gs.ci1=function(t){return this.ci(t)[1]},Vs.Definition={type:"Aggregate",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:Ls},{name:"aggregate_params",type:"number",null:!0,array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"drop",type:"boolean",default:!0},{name:"cross",type:"boolean",default:!1},{name:"key",type:"field"}]},st(Vs,La,{transform(t,e){const n=this,r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.modified();return n.stamp=r.stamp,n.value&&(i||e.modified(n._inputs,!0))?(n._prev=n.value,n.value=i?n.init(t):Object.create(null),e.visit(e.SOURCE,(t=>n.add(t)))):(n.value=n.value||n.init(t),e.visit(e.REM,(t=>n.rem(t))),e.visit(e.ADD,(t=>n.add(t)))),r.modifies(n._outputs),n._drop=!1!==t.drop,t.cross&&n._dims.length>1&&(n._drop=!1,n.cross()),e.clean()&&n._drop&&r.clean(!0).runAfter((()=>this.clean())),n.changes(r)},cross(){const t=this,e=t.value,n=t._dnames,r=n.map((()=>({}))),i=n.length;function o(t){let e,o,a,s;for(e in t)for(a=t[e].tuple,o=0;o<i;++o)r[o][s=a[n[o]]]=s}o(t._prev),o(e),function o(a,s,u){const l=n[u],c=r[u++];for(const n in c){const r=a?a+"|"+n:n;s[l]=c[n],u<i?o(r,s,u):e[r]||t.cell(r,s)}}("",{},0)},init(t){const e=this._inputs=[],i=this._outputs=[],o={};function a(t){const n=W(r(t)),i=n.length;let a,s=0;for(;s<i;++s)o[a=n[s]]||(o[a]=1,e.push(a))}this._dims=W(t.groupby),this._dnames=this._dims.map((t=>{const e=n(t);return a(t),i.push(e),e})),this.cellkey=t.key?t.key:Bs(this._dims),this._countOnly=!0,this._counts=[],this._measures=[];const u=t.fields||[null],l=t.ops||["count"],c=t.aggregate_params||[null],f=t.as||[],h=u.length,d={};let p,g,m,y,v,_,x;for(h!==l.length&&s("Unmatched number of fields and aggregate ops."),x=0;x<h;++x)p=u[x],g=l[x],m=c[x]||null,null==p&&"count"!==g&&s("Null aggregate field specified."),v=n(p),_=Ns(g,v,f[x]),i.push(_),"count"!==g?(y=d[v],y||(a(p),y=d[v]=[],y.field=p,this._measures.push(y)),"count"!==g&&(this._countOnly=!1),y.push(Us(g,m,_))):this._counts.push(_);return this._measures=this._measures.map((t=>Hs(t,t.field))),Object.create(null)},cellkey:Bs(),cell(t,e){let n=this.value[t];return n?0===n.num&&this._drop&&n.stamp<this.stamp?(n.stamp=this.stamp,this._adds[this._alen++]=n):n.stamp<this.stamp&&(n.stamp=this.stamp,this._mods[this._mlen++]=n):(n=this.value[t]=this.newcell(t,e),this._adds[this._alen++]=n),n},newcell(t,e){const n={key:t,num:0,agg:null,tuple:this.newtuple(e,this._prev&&this._prev[t]),stamp:this.stamp,store:!1};if(!this._countOnly){const t=this._measures,e=t.length;n.agg=Array(e);for(let r=0;r<e;++r)n.agg[r]=new t[r](n)}return n.store&&(n.data=new Ys),n},newtuple(t,e){const n=this._dnames,r=this._dims,i=r.length,o={};for(let e=0;e<i;++e)o[n[e]]=r[e](t);return e?ca(e.tuple,o):sa(o)},clean(){const t=this.value;for(const e in t)0===t[e].num&&delete t[e]},add(t){const e=this.cellkey(t),n=this.cell(e,t);if(n.num+=1,this._countOnly)return;n.store&&n.data.add(t);const r=n.agg;for(let e=0,n=r.length;e<n;++e)r[e].add(r[e].get(t),t)},rem(t){const e=this.cellkey(t),n=this.cell(e,t);if(n.num-=1,this._countOnly)return;n.store&&n.data.rem(t);const r=n.agg;for(let e=0,n=r.length;e<n;++e)r[e].rem(r[e].get(t),t)},celltuple(t){const e=t.tuple,n=this._counts;t.store&&t.data.values();for(let r=0,i=n.length;r<i;++r)e[n[r]]=t.num;if(!this._countOnly){const n=t.agg;for(let t=0,r=n.length;t<r;++t)n[t].set(e)}return e},changes(t){const e=this._adds,n=this._mods,r=this._prev,i=this._drop,o=t.add,a=t.rem,s=t.mod;let u,l,c,f;if(r)for(l in r)u=r[l],i&&!u.num||a.push(u.tuple);for(c=0,f=this._alen;c<f;++c)o.push(this.celltuple(e[c])),e[c]=null;for(c=0,f=this._mlen;c<f;++c)u=n[c],(0===u.num&&i?a:s).push(this.celltuple(u)),n[c]=null;return this._alen=this._mlen=0,this._prev=null,t}});function Xs(t){La.call(this,null,t)}function Js(t,e,n){const r=t;let i=e||[],o=n||[],a={},s=0;return{add:t=>o.push(t),remove:t=>a[r(t)]=++s,size:()=>i.length,data:(t,e)=>(s&&(i=i.filter((t=>!a[r(t)])),a={},s=0),e&&t&&i.sort(t),o.length&&(i=t?vt(t,i,o.sort(t)):i.concat(o),o=[]),i)}}function Zs(t){La.call(this,[],t)}function Qs(t){va.call(this,null,Ks,t)}function Ks(t){return this.value&&!t.modified()?this.value:G(t.fields,t.orders)}function tu(t){La.call(this,null,t)}function eu(t){La.call(this,null,t)}Xs.Definition={type:"Bin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"anchor",type:"number"},{name:"maxbins",type:"number",default:20},{name:"base",type:"number",default:10},{name:"divide",type:"number",array:!0,default:[5,2]},{name:"extent",type:"number",array:!0,length:2,required:!0},{name:"span",type:"number"},{name:"step",type:"number"},{name:"steps",type:"number",array:!0},{name:"minstep",type:"number",default:0},{name:"nice",type:"boolean",default:!0},{name:"name",type:"string"},{name:"as",type:"string",array:!0,length:2,default:["bin0","bin1"]}]},st(Xs,La,{transform(t,e){const n=!1!==t.interval,i=this._bins(t),o=i.start,a=i.step,s=t.as||["bin0","bin1"],u=s[0],l=s[1];let c;return c=t.modified()?(e=e.reflow(!0)).SOURCE:e.modified(r(t.field))?e.ADD_MOD:e.ADD,e.visit(c,n?t=>{const e=i(t);t[u]=e,t[l]=null==e?null:o+a*(1+(e-o)/a)}:t=>t[u]=i(t)),e.modifies(n?s:u)},_bins(t){if(this.value&&!t.modified())return this.value;const i=t.field,o=Ya(t),a=o.step;let s,u,l=o.start,c=l+Math.ceil((o.stop-l)/a)*a;null!=(s=t.anchor)&&(u=s-(l+a*Math.floor((s-l)/a)),l+=u,c+=u);const f=function(t){let e=E(i(t));return null==e?null:e<l?-1/0:e>c?1/0:(e=Math.max(l,Math.min(e,c-a)),l+a*Math.floor(1e-14+(e-l)/a))};return f.start=l,f.stop=o.stop,f.step=a,this.value=e(f,r(i),t.name||"bin_"+n(i))}}),Zs.Definition={type:"Collect",metadata:{source:!0},params:[{name:"sort",type:"compare"}]},st(Zs,La,{transform(t,e){const n=e.fork(e.ALL),r=Js(oa,this.value,n.materialize(n.ADD).add),i=t.sort,o=e.changed()||i&&(t.modified("sort")||e.modified(i.fields));return n.visit(n.REM,r.remove),this.modified(o),this.value=n.source=r.data(fa(i),o),e.source&&e.source.root&&(this.value.root=e.source.root),n}}),st(Qs,va),tu.Definition={type:"CountPattern",metadata:{generates:!0,changes:!0},params:[{name:"field",type:"field",required:!0},{name:"case",type:"enum",values:["upper","lower","mixed"],default:"mixed"},{name:"pattern",type:"string",default:'[\\w"]+'},{name:"stopwords",type:"string",default:""},{name:"as",type:"string",array:!0,length:2,default:["text","count"]}]},st(tu,La,{transform(t,e){const n=e=>n=>{for(var r,i=function(t,e,n){switch(e){case"upper":t=t.toUpperCase();break;case"lower":t=t.toLowerCase()}return t.match(n)}(s(n),t.case,o)||[],u=0,l=i.length;u<l;++u)a.test(r=i[u])||e(r)},r=this._parameterCheck(t,e),i=this._counts,o=this._match,a=this._stop,s=t.field,u=t.as||["text","count"],l=n((t=>i[t]=1+(i[t]||0))),c=n((t=>i[t]-=1));return r?e.visit(e.SOURCE,l):(e.visit(e.ADD,l),e.visit(e.REM,c)),this._finish(e,u)},_parameterCheck(t,e){let n=!1;return!t.modified("stopwords")&&this._stop||(this._stop=new RegExp("^"+(t.stopwords||"")+"$","i"),n=!0),!t.modified("pattern")&&this._match||(this._match=new RegExp(t.pattern||"[\\w']+","g"),n=!0),(t.modified("field")||e.modified(t.field.fields))&&(n=!0),n&&(this._counts={}),n},_finish(t,e){const n=this._counts,r=this._tuples||(this._tuples={}),i=e[0],o=e[1],a=t.fork(t.NO_SOURCE|t.NO_FIELDS);let s,u,l;for(s in n)u=r[s],l=n[s]||0,!u&&l?(r[s]=u=sa({}),u[i]=s,u[o]=l,a.add.push(u)):0===l?(u&&a.rem.push(u),n[s]=null,r[s]=null):u[o]!==l&&(u[o]=l,a.mod.push(u));return a.modifies(e)}}),eu.Definition={type:"Cross",metadata:{generates:!0},params:[{name:"filter",type:"expr"},{name:"as",type:"string",array:!0,length:2,default:["a","b"]}]},st(eu,La,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.as||["a","b"],i=r[0],o=r[1],a=!this.value||e.changed(e.ADD_REM)||t.modified("as")||t.modified("filter");let s=this.value;return a?(s&&(n.rem=s),s=e.materialize(e.SOURCE).source,n.add=this.value=function(t,e,n,r){for(var i,o,a=[],s={},u=t.length,l=0;l<u;++l)for(s[e]=o=t[l],i=0;i<u;++i)s[n]=t[i],r(s)&&(a.push(sa(s)),(s={})[e]=o);return a}(s,i,o,t.filter||p)):n.mod=s,n.source=this.value,n.modifies(r)}});const nu={kde:rs,mixture:ls,normal:ns,lognormal:us,uniform:ps},ru="function";function iu(t,e){const n=t[ru];rt(nu,n)||s("Unknown distribution function: "+n);const r=nu[n]();for(const n in t)"field"===n?r.data((t.from||e()).map(t[n])):"distributions"===n?r[n](t[n].map((t=>iu(t,e)))):typeof r[n]===ru&&r[n](t[n]);return r}function ou(t){La.call(this,null,t)}const au=[{key:{function:"normal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"lognormal"},params:[{name:"mean",type:"number",default:0},{name:"stdev",type:"number",default:1}]},{key:{function:"uniform"},params:[{name:"min",type:"number",default:0},{name:"max",type:"number",default:1}]},{key:{function:"kde"},params:[{name:"field",type:"field",required:!0},{name:"from",type:"data"},{name:"bandwidth",type:"number",default:0}]}],su={key:{function:"mixture"},params:[{name:"distributions",type:"param",array:!0,params:au},{name:"weights",type:"number",array:!0}]};function uu(t,e){return t?t.map(((t,r)=>e[r]||n(t))):null}function lu(t,e,n){const r=[],i=t=>t(u);let o,a,s,u,l,c;if(null==e)r.push(t.map(n));else for(o={},a=0,s=t.length;a<s;++a)u=t[a],l=e.map(i),c=o[l],c||(o[l]=c=[],c.dims=l,r.push(c)),c.push(n(u));return r}ou.Definition={type:"Density",metadata:{generates:!0},params:[{name:"extent",type:"number",array:!0,length:2},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"method",type:"string",default:"pdf",values:["pdf","cdf"]},{name:"distribution",type:"param",params:au.concat(su)},{name:"as",type:"string",array:!0,default:["value","density"]}]},st(ou,La,{transform(t,e){const n=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const r=iu(t.distribution,function(t){return()=>t.materialize(t.SOURCE).source}(e)),i=t.steps||t.minsteps||25,o=t.steps||t.maxsteps||200;let a=t.method||"pdf";"pdf"!==a&&"cdf"!==a&&s("Invalid density method: "+a),t.extent||r.data||s("Missing density extent parameter."),a=r[a];const u=t.as||["value","density"],l=$s(a,t.extent||et(r.data()),i,o).map((t=>{const e={};return e[u[0]]=t[0],e[u[1]]=t[1],sa(e)}));this.value&&(n.rem=this.value),this.value=n.add=n.source=l}return n}});function cu(t){La.call(this,null,t)}cu.Definition={type:"DotBin",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"step",type:"number"},{name:"smooth",type:"boolean",default:!1},{name:"as",type:"string",default:"bin"}]};function fu(t){va.call(this,null,hu,t),this.modified(!0)}function hu(t){const i=t.expr;return this.value&&!t.modified("expr")?this.value:e((e=>i(e,t)),r(i),n(i))}function du(t){La.call(this,[void 0,void 0],t)}function pu(t,e){va.call(this,t),this.parent=e,this.count=0}function gu(t){La.call(this,{},t),this._keys=ot();const e=this._targets=[];e.active=0,e.forEach=t=>{for(let n=0,r=e.active;n<r;++n)t(e[n],n,e)}}function mu(t){va.call(this,null,yu,t)}function yu(t){return this.value&&!t.modified()?this.value:_(t.name)?W(t.name).map((t=>l(t))):l(t.name,t.as)}function vu(t){La.call(this,ot(),t)}function _u(t){La.call(this,[],t)}function xu(t){La.call(this,[],t)}function bu(t){La.call(this,null,t)}function wu(t){La.call(this,[],t)}st(cu,La,{transform(t,e){if(this.value&&!t.modified()&&!e.changed())return e;const n=e.materialize(e.SOURCE).source,r=lu(e.source,t.groupby,f),i=t.smooth||!1,o=t.field,a=t.step||((t,e)=>bt(et(t,e))/30)(n,o),s=fa(((t,e)=>o(t)-o(e))),u=t.as||"bin",l=r.length;let c,h=1/0,d=-1/0,p=0;for(;p<l;++p){const t=r[p].sort(s);c=-1;for(const e of Va(t,a,i,o))e<h&&(h=e),e>d&&(d=e),t[++c][u]=e}return this.value={start:h,stop:d,step:a},e.reflow(!0).modifies(u)}}),st(fu,va),du.Definition={type:"Extent",metadata:{},params:[{name:"field",type:"field",required:!0}]},st(du,La,{transform(t,e){const r=this.value,i=t.field,o=e.changed()||e.modified(i.fields)||t.modified("field");let a=r[0],s=r[1];if((o||null==a)&&(a=1/0,s=-1/0),e.visit(o?e.SOURCE:e.ADD,(t=>{const e=E(i(t));null!=e&&(e<a&&(a=e),e>s&&(s=e))})),!Number.isFinite(a)||!Number.isFinite(s)){let t=n(i);t&&(t=` for field "${t}"`),a=s=void 0}this.value=[a,s]}}),st(pu,va,{connect(t){return this.detachSubflow=t.detachSubflow,this.targets().add(t),t.source=this},add(t){this.count+=1,this.value.add.push(t)},rem(t){this.count-=1,this.value.rem.push(t)},mod(t){this.value.mod.push(t)},init(t){this.value.init(t,t.NO_SOURCE)},evaluate(){return this.value}}),st(gu,La,{activate(t){this._targets[this._targets.active++]=t},subflow(t,e,n,r){const i=this.value;let o,a,s=rt(i,t)&&i[t];return s?s.value.stamp<n.stamp&&(s.init(n),this.activate(s)):(a=r||(a=this._group[t])&&a.tuple,o=n.dataflow,s=new pu(n.fork(n.NO_SOURCE),this),o.add(s).connect(e(o,t,a)),i[t]=s,this.activate(s)),s},clean(){const t=this.value;let e=0;for(const n in t)if(0===t[n].count){const r=t[n].detachSubflow;r&&r(),delete t[n],++e}if(e){const t=this._targets.filter((t=>t&&t.count>0));this.initTargets(t)}},initTargets(t){const e=this._targets,n=e.length,r=t?t.length:0;let i=0;for(;i<r;++i)e[i]=t[i];for(;i<n&&null!=e[i];++i)e[i]=null;e.active=r},transform(t,e){const n=e.dataflow,r=t.key,i=t.subflow,o=this._keys,a=t.modified("key"),s=t=>this.subflow(t,i,e);return this._group=t.group||{},this.initTargets(),e.visit(e.REM,(t=>{const e=oa(t),n=o.get(e);void 0!==n&&(o.delete(e),s(n).rem(t))})),e.visit(e.ADD,(t=>{const e=r(t);o.set(oa(t),e),s(e).add(t)})),a||e.modified(r.fields)?e.visit(e.MOD,(t=>{const e=oa(t),n=o.get(e),i=r(t);n===i?s(i).mod(t):(o.set(e,i),s(n).rem(t),s(i).add(t))})):e.changed(e.MOD)&&e.visit(e.MOD,(t=>{s(o.get(oa(t))).mod(t)})),a&&e.visit(e.REFLOW,(t=>{const e=oa(t),n=o.get(e),i=r(t);n!==i&&(o.set(e,i),s(n).rem(t),s(i).add(t))})),e.clean()?n.runAfter((()=>{this.clean(),o.clean()})):o.empty>n.cleanThreshold&&n.runAfter(o.clean),e}}),st(mu,va),vu.Definition={type:"Filter",metadata:{changes:!0},params:[{name:"expr",type:"expr",required:!0}]},st(vu,La,{transform(t,e){const n=e.dataflow,r=this.value,i=e.fork(),o=i.add,a=i.rem,s=i.mod,u=t.expr;let l=!0;function c(e){const n=oa(e),i=u(e,t),c=r.get(n);i&&c?(r.delete(n),o.push(e)):i||c?l&&i&&!c&&s.push(e):(r.set(n,1),a.push(e))}return e.visit(e.REM,(t=>{const e=oa(t);r.has(e)?r.delete(e):a.push(t)})),e.visit(e.ADD,(e=>{u(e,t)?o.push(e):r.set(oa(e),1)})),e.visit(e.MOD,c),t.modified()&&(l=!1,e.visit(e.REFLOW,c)),r.empty>n.cleanThreshold&&n.runAfter(r.clean),i}}),_u.Definition={type:"Flatten",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"index",type:"string"},{name:"as",type:"string",array:!0}]},st(_u,La,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.fields,i=uu(r,t.as||[]),o=t.index||null,a=i.length;return n.rem=this.value,e.visit(e.SOURCE,(t=>{const e=r.map((e=>e(t))),s=e.reduce(((t,e)=>Math.max(t,e.length)),0);let u,l,c,f=0;for(;f<s;++f){for(l=ua(t),u=0;u<a;++u)l[i[u]]=null==(c=e[u][f])?null:c;o&&(l[o]=f),n.add.push(l)}})),this.value=n.source=n.add,o&&n.modifies(o),n.modifies(i)}}),xu.Definition={type:"Fold",metadata:{generates:!0},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0,length:2,default:["key","value"]}]},st(xu,La,{transform(t,e){const r=e.fork(e.NO_SOURCE),i=t.fields,o=i.map(n),a=t.as||["key","value"],s=a[0],u=a[1],l=i.length;return r.rem=this.value,e.visit(e.SOURCE,(t=>{for(let e,n=0;n<l;++n)e=ua(t),e[s]=o[n],e[u]=i[n](t),r.add.push(e)})),this.value=r.source=r.add,r.modifies(a)}}),bu.Definition={type:"Formula",metadata:{modifies:!0},params:[{name:"expr",type:"expr",required:!0},{name:"as",type:"string",required:!0},{name:"initonly",type:"boolean"}]},st(bu,La,{transform(t,e){const n=t.expr,r=t.as,i=t.modified(),o=t.initonly?e.ADD:i?e.SOURCE:e.modified(n.fields)||e.modified(r)?e.ADD_MOD:e.ADD;return i&&(e=e.materialize().reflow(!0)),t.initonly||e.modifies(r),e.visit(o,(e=>e[r]=n(e,t)))}}),st(wu,La,{transform(t,e){const n=e.fork(e.ALL),r=t.generator;let i,o,a,s=this.value,u=t.size-s.length;if(u>0){for(i=[];--u>=0;)i.push(a=sa(r(t))),s.push(a);n.add=n.add.length?n.materialize(n.ADD).add.concat(i):i}else o=s.slice(0,-u),n.rem=n.rem.length?n.materialize(n.REM).rem.concat(o):o,s=s.slice(-u);return n.source=this.value=s,n}});const ku={value:"value",median:_e,mean:function(t,e){let n=0,r=0;if(void 0===e)for(let e of t)null!=e&&(e=+e)>=e&&(++n,r+=e);else{let i=-1;for(let o of t)null!=(o=e(o,++i,t))&&(o=+o)>=o&&(++n,r+=o)}if(n)return r/n},min:pe,max:de},Mu=[];function Au(t){La.call(this,[],t)}function Eu(t){Vs.call(this,t)}function Du(t){La.call(this,null,t)}function Cu(t){va.call(this,null,Fu,t)}function Fu(t){return this.value&&!t.modified()?this.value:gt(t.fields,t.flat)}function Su(t){La.call(this,[],t),this._pending=null}function $u(t,e,n){n.forEach(sa);const r=e.fork(e.NO_FIELDS&e.NO_SOURCE);return r.rem=t.value,t.value=r.source=r.add=n,t._pending=null,r.rem.length&&r.clean(!0),r}function Tu(t){La.call(this,{},t)}function Bu(t){va.call(this,null,Nu,t)}function Nu(t){if(this.value&&!t.modified())return this.value;const e=t.extents,n=e.length;let r,i,o=1/0,a=-1/0;for(r=0;r<n;++r)i=e[r],i[0]<o&&(o=i[0]),i[1]>a&&(a=i[1]);return[o,a]}function zu(t){va.call(this,null,Ou,t)}function Ou(t){return this.value&&!t.modified()?this.value:t.values.reduce(((t,e)=>t.concat(e)),[])}function Ru(t){La.call(this,null,t)}function Lu(t){Vs.call(this,t)}function Uu(t){gu.call(this,t)}function qu(t){La.call(this,null,t)}function Pu(t){La.call(this,null,t)}function ju(t){La.call(this,null,t)}Au.Definition={type:"Impute",metadata:{changes:!0},params:[{name:"field",type:"field",required:!0},{name:"key",type:"field",required:!0},{name:"keyvals",array:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"enum",default:"value",values:["value","mean","median","max","min"]},{name:"value",default:0}]},st(Au,La,{transform(t,e){var r,i,o,a,u,l,c,f,h,d,p=e.fork(e.ALL),g=function(t){var e,n=t.method||ku.value;if(null!=ku[n])return n===ku.value?(e=void 0!==t.value?t.value:0,()=>e):ku[n];s("Unrecognized imputation method: "+n)}(t),m=function(t){const e=t.field;return t=>t?e(t):NaN}(t),y=n(t.field),v=n(t.key),_=(t.groupby||[]).map(n),x=function(t,e,n,r){var i,o,a,s,u,l,c,f,h=t=>t(f),d=[],p=r?r.slice():[],g={},m={};for(p.forEach(((t,e)=>g[t]=e+1)),s=0,c=t.length;s<c;++s)l=n(f=t[s]),u=g[l]||(g[l]=p.push(l)),(a=m[o=(i=e?e.map(h):Mu)+""])||(a=m[o]=[],d.push(a),a.values=i),a[u-1]=f;return d.domain=p,d}(e.source,t.groupby,t.key,t.keyvals),b=[],w=this.value,k=x.domain.length;for(u=0,f=x.length;u<f;++u)for(o=(r=x[u]).values,i=NaN,c=0;c<k;++c)if(null==r[c]){for(a=x.domain[c],d={_impute:!0},l=0,h=o.length;l<h;++l)d[_[l]]=o[l];d[v]=a,d[y]=Number.isNaN(i)?i=g(r,m):i,b.push(sa(d))}return b.length&&(p.add=p.materialize(p.ADD).add.concat(b)),w.length&&(p.rem=p.materialize(p.REM).rem.concat(w)),this.value=b,p}}),Eu.Definition={type:"JoinAggregate",metadata:{modifies:!0},params:[{name:"groupby",type:"field",array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"ops",type:"enum",array:!0,values:Ls},{name:"as",type:"string",null:!0,array:!0},{name:"key",type:"field"}]},st(Eu,Vs,{transform(t,e){const n=this,r=t.modified();let i;return n.value&&(r||e.modified(n._inputs,!0))?(i=n.value=r?n.init(t):{},e.visit(e.SOURCE,(t=>n.add(t)))):(i=n.value=n.value||this.init(t),e.visit(e.REM,(t=>n.rem(t))),e.visit(e.ADD,(t=>n.add(t)))),n.changes(),e.visit(e.SOURCE,(t=>{tt(t,i[n.cellkey(t)].tuple)})),e.reflow(r).modifies(this._outputs)},changes(){const t=this._adds,e=this._mods;let n,r;for(n=0,r=this._alen;n<r;++n)this.celltuple(t[n]),t[n]=null;for(n=0,r=this._mlen;n<r;++n)this.celltuple(e[n]),e[n]=null;this._alen=this._mlen=0}}),Du.Definition={type:"KDE",metadata:{generates:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"cumulative",type:"boolean",default:!1},{name:"counts",type:"boolean",default:!1},{name:"bandwidth",type:"number",default:0},{name:"extent",type:"number",array:!0,length:2},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"steps",type:"number"},{name:"minsteps",type:"number",default:25},{name:"maxsteps",type:"number",default:200},{name:"as",type:"string",array:!0,default:["value","density"]}]},st(Du,La,{transform(t,e){const r=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=e.materialize(e.SOURCE).source,o=lu(i,t.groupby,t.field),a=(t.groupby||[]).map(n),u=t.bandwidth,l=t.cumulative?"cdf":"pdf",c=t.as||["value","density"],f=[];let h=t.extent,d=t.steps||t.minsteps||25,p=t.steps||t.maxsteps||200;"pdf"!==l&&"cdf"!==l&&s("Invalid density method: "+l),"shared"===t.resolve&&(h||(h=et(i,t.field)),d=p=t.steps||p),o.forEach((e=>{const n=rs(e,u)[l],r=t.counts?e.length:1;$s(n,h||et(e),d,p).forEach((t=>{const n={};for(let t=0;t<a.length;++t)n[a[t]]=e.dims[t];n[c[0]]=t[0],n[c[1]]=t[1]*r,f.push(sa(n))}))})),this.value&&(r.rem=this.value),this.value=r.add=r.source=f}return r}}),st(Cu,va),st(Su,La,{transform(t,e){const n=e.dataflow;if(this._pending)return $u(this,e,this._pending);if(function(t){return t.modified("async")&&!(t.modified("values")||t.modified("url")||t.modified("format"))}(t))return e.StopPropagation;if(t.values)return $u(this,e,n.parse(t.values,t.format));if(t.async){const e=n.request(t.url,t.format).then((t=>(this._pending=W(t.data),t=>t.touch(this))));return{async:e}}return n.request(t.url,t.format).then((t=>$u(this,e,W(t.data))))}}),Tu.Definition={type:"Lookup",metadata:{modifies:!0},params:[{name:"index",type:"index",params:[{name:"from",type:"data",required:!0},{name:"key",type:"field",required:!0}]},{name:"values",type:"field",array:!0},{name:"fields",type:"field",array:!0,required:!0},{name:"as",type:"string",array:!0},{name:"default",default:null}]},st(Tu,La,{transform(t,e){const r=t.fields,i=t.index,o=t.values,a=null==t.default?null:t.default,u=t.modified(),l=r.length;let c,f,h,d=u?e.SOURCE:e.ADD,p=e,g=t.as;return o?(f=o.length,l>1&&!g&&s('Multi-field lookup requires explicit "as" parameter.'),g&&g.length!==l*f&&s('The "as" parameter has too few output field names.'),g=g||o.map(n),c=function(t){for(var e,n,s=0,u=0;s<l;++s)if(null==(n=i.get(r[s](t))))for(e=0;e<f;++e,++u)t[g[u]]=a;else for(e=0;e<f;++e,++u)t[g[u]]=o[e](n)}):(g||s("Missing output field names."),c=function(t){for(var e,n=0;n<l;++n)e=i.get(r[n](t)),t[g[n]]=null==e?a:e}),u?p=e.reflow(!0):(h=r.some((t=>e.modified(t.fields))),d|=h?e.MOD:0),e.visit(d,c),p.modifies(g)}}),st(Bu,va),st(zu,va),st(Ru,La,{transform(t,e){return this.modified(t.modified()),this.value=t,e.fork(e.NO_SOURCE|e.NO_FIELDS)}}),Lu.Definition={type:"Pivot",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"value",type:"field",required:!0},{name:"op",type:"enum",values:Ls,default:"sum"},{name:"limit",type:"number",default:0},{name:"key",type:"field"}]},st(Lu,Vs,{_transform:Vs.prototype.transform,transform(t,n){return this._transform(function(t,n){const i=t.field,o=t.value,a=("count"===t.op?"__count__":t.op)||"sum",s=r(i).concat(r(o)),u=function(t,e,n){const r={},i=[];return n.visit(n.SOURCE,(e=>{const n=t(e);r[n]||(r[n]=1,i.push(n))})),i.sort(V),e?i.slice(0,e):i}(i,t.limit||0,n);n.changed()&&t.set("__pivot__",null,null,!0);return{key:t.key,groupby:t.groupby,ops:u.map((()=>a)),fields:u.map((t=>function(t,n,r,i){return e((e=>n(e)===t?r(e):NaN),i,t+"")}(t,i,o,s))),as:u.map((t=>t+"")),modified:t.modified.bind(t)}}(t,n),n)}}),st(Uu,gu,{transform(t,e){const n=t.subflow,i=t.field,o=t=>this.subflow(oa(t),n,e,t);return(t.modified("field")||i&&e.modified(r(i)))&&s("PreFacet does not support field modification."),this.initTargets(),i?(e.visit(e.MOD,(t=>{const e=o(t);i(t).forEach((t=>e.mod(t)))})),e.visit(e.ADD,(t=>{const e=o(t);i(t).forEach((t=>e.add(sa(t))))})),e.visit(e.REM,(t=>{const e=o(t);i(t).forEach((t=>e.rem(t)))}))):(e.visit(e.MOD,(t=>o(t).mod(t))),e.visit(e.ADD,(t=>o(t).add(t))),e.visit(e.REM,(t=>o(t).rem(t)))),e.clean()&&e.runAfter((()=>this.clean())),e}}),qu.Definition={type:"Project",metadata:{generates:!0,changes:!0},params:[{name:"fields",type:"field",array:!0},{name:"as",type:"string",null:!0,array:!0}]},st(qu,La,{transform(t,e){const n=e.fork(e.NO_SOURCE),r=t.fields,i=uu(t.fields,t.as||[]),o=r?(t,e)=>function(t,e,n,r){for(let i=0,o=n.length;i<o;++i)e[r[i]]=n[i](t);return e}(t,e,r,i):la;let a;return this.value?a=this.value:(e=e.addAll(),a=this.value={}),e.visit(e.REM,(t=>{const e=oa(t);n.rem.push(a[e]),a[e]=null})),e.visit(e.ADD,(t=>{const e=o(t,sa({}));a[oa(t)]=e,n.add.push(e)})),e.visit(e.MOD,(t=>{n.mod.push(o(t,a[oa(t)]))})),n}}),st(Pu,La,{transform(t,e){return this.value=t.value,t.modified("value")?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation}}),ju.Definition={type:"Quantile",metadata:{generates:!0,changes:!0},params:[{name:"groupby",type:"field",array:!0},{name:"field",type:"field",required:!0},{name:"probs",type:"number",array:!0},{name:"step",type:"number",default:.01},{name:"as",type:"string",array:!0,default:["prob","value"]}]};function Iu(t){La.call(this,null,t)}function Wu(t){La.call(this,[],t),this.count=0}function Hu(t){La.call(this,null,t)}function Yu(t){La.call(this,null,t),this.modified(!0)}function Gu(t){La.call(this,null,t)}st(ju,La,{transform(t,e){const r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.as||["prob","value"];if(this.value&&!t.modified()&&!e.changed())return r.source=this.value,r;const o=lu(e.materialize(e.SOURCE).source,t.groupby,t.field),a=(t.groupby||[]).map(n),s=[],u=t.step||.01,l=t.probs||be(u/2,1-1e-14,u),c=l.length;return o.forEach((t=>{const e=Ia(t,l);for(let n=0;n<c;++n){const r={};for(let e=0;e<a.length;++e)r[a[e]]=t.dims[e];r[i[0]]=l[n],r[i[1]]=e[n],s.push(sa(r))}})),this.value&&(r.rem=this.value),this.value=r.add=r.source=s,r}}),st(Iu,La,{transform(t,e){let n,r;return this.value?r=this.value:(n=e=e.addAll(),r=this.value={}),t.derive&&(n=e.fork(e.NO_SOURCE),e.visit(e.REM,(t=>{const e=oa(t);n.rem.push(r[e]),r[e]=null})),e.visit(e.ADD,(t=>{const e=ua(t);r[oa(t)]=e,n.add.push(e)})),e.visit(e.MOD,(t=>{const e=r[oa(t)];for(const r in t)e[r]=t[r],n.modifies(r);n.mod.push(e)}))),n}}),Wu.Definition={type:"Sample",metadata:{},params:[{name:"size",type:"number",default:1e3}]},st(Wu,La,{transform(e,n){const r=n.fork(n.NO_SOURCE),i=e.modified("size"),o=e.size,a=this.value.reduce(((t,e)=>(t[oa(e)]=1,t)),{});let s=this.value,u=this.count,l=0;function c(e){let n,i;s.length<o?s.push(e):(i=~~((u+1)*t.random()),i<s.length&&i>=l&&(n=s[i],a[oa(n)]&&r.rem.push(n),s[i]=e)),++u}if(n.rem.length&&(n.visit(n.REM,(t=>{const e=oa(t);a[e]&&(a[e]=-1,r.rem.push(t)),--u})),s=s.filter((t=>-1!==a[oa(t)]))),(n.rem.length||i)&&s.length<o&&n.source&&(l=u=s.length,n.visit(n.SOURCE,(t=>{a[oa(t)]||c(t)})),l=-1),i&&s.length>o){const t=s.length-o;for(let e=0;e<t;++e)a[oa(s[e])]=-1,r.rem.push(s[e]);s=s.slice(t)}return n.mod.length&&n.visit(n.MOD,(t=>{a[oa(t)]&&r.mod.push(t)})),n.add.length&&n.visit(n.ADD,c),(n.add.length||l<0)&&(r.add=s.filter((t=>!a[oa(t)]))),this.count=u,this.value=r.source=s,r}}),Hu.Definition={type:"Sequence",metadata:{generates:!0,changes:!0},params:[{name:"start",type:"number",required:!0},{name:"stop",type:"number",required:!0},{name:"step",type:"number",default:1},{name:"as",type:"string",default:"data"}]},st(Hu,La,{transform(t,e){if(this.value&&!t.modified())return;const n=e.materialize().fork(e.MOD),r=t.as||"data";return n.rem=this.value?e.rem.concat(this.value):e.rem,this.value=be(t.start,t.stop,t.step||1).map((t=>{const e={};return e[r]=t,sa(e)})),n.add=e.add.concat(this.value),n}}),st(Yu,La,{transform(t,e){return this.value=e.source,e.changed()?e.fork(e.NO_SOURCE|e.NO_FIELDS):e.StopPropagation}});const Vu=["unit0","unit1"];function Xu(t){La.call(this,ot(),t)}function Ju(t){La.call(this,null,t)}Gu.Definition={type:"TimeUnit",metadata:{modifies:!0},params:[{name:"field",type:"field",required:!0},{name:"interval",type:"boolean",default:!0},{name:"units",type:"enum",values:Wn,array:!0},{name:"step",type:"number",default:1},{name:"maxbins",type:"number",default:40},{name:"extent",type:"date",array:!0},{name:"timezone",type:"enum",default:"local",values:["local","utc"]},{name:"as",type:"string",array:!0,length:2,default:Vu}]},st(Gu,La,{transform(t,e){const n=t.field,i=!1!==t.interval,o="utc"===t.timezone,a=this._floor(t,e),s=(o?xr:_r)(a.unit).offset,u=t.as||Vu,l=u[0],c=u[1],f=a.step;let h=a.start||1/0,d=a.stop||-1/0,p=e.ADD;return(t.modified()||e.changed(e.REM)||e.modified(r(n)))&&(p=(e=e.reflow(!0)).SOURCE,h=1/0,d=-1/0),e.visit(p,(t=>{const e=n(t);let r,o;null==e?(t[l]=null,i&&(t[c]=null)):(t[l]=r=o=a(e),i&&(t[c]=o=s(r,f)),r<h&&(h=r),o>d&&(d=o))})),a.start=h,a.stop=d,e.modifies(i?u:l)},_floor(t,e){const n="utc"===t.timezone,{units:r,step:i}=t.units?{units:t.units,step:t.step||1}:Pr({extent:t.extent||et(e.materialize(e.SOURCE).source,t.field),maxbins:t.maxbins}),o=Yn(r),a=this.value||{},s=(n?mr:dr)(o,i);return s.unit=A(o),s.units=o,s.step=i,s.start=a.start,s.stop=a.stop,this.value=s}}),st(Xu,La,{transform(t,e){const n=e.dataflow,r=t.field,i=this.value,o=t=>i.set(r(t),t);let a=!0;return t.modified("field")||e.modified(r.fields)?(i.clear(),e.visit(e.SOURCE,o)):e.changed()?(e.visit(e.REM,(t=>i.delete(r(t)))),e.visit(e.ADD,o)):a=!1,this.modified(a),i.empty>n.cleanThreshold&&n.runAfter(i.clean),e.fork()}}),st(Ju,La,{transform(t,e){(!this.value||t.modified("field")||t.modified("sort")||e.changed()||t.sort&&e.modified(t.sort.fields))&&(this.value=(t.sort?e.source.slice().sort(fa(t.sort)):e.source).map(t.field))}});const Zu={row_number:function(){return{next:t=>t.index+1}},rank:function(){let t;return{init:()=>t=1,next:e=>{const n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?t=n+1:t}}},dense_rank:function(){let t;return{init:()=>t=1,next:e=>{const n=e.index,r=e.data;return n&&e.compare(r[n-1],r[n])?++t:t}}},percent_rank:function(){const t=Zu.rank(),e=t.next;return{init:t.init,next:t=>(e(t)-1)/(t.data.length-1)}},cume_dist:function(){let t;return{init:()=>t=0,next:e=>{const n=e.data,r=e.compare;let i=e.index;if(t<i){for(;i+1<n.length&&!r(n[i],n[i+1]);)++i;t=i}return(1+t)/n.length}}},ntile:function(t,e){(e=+e)>0||s("ntile num must be greater than zero.");const n=Zu.cume_dist(),r=n.next;return{init:n.init,next:t=>Math.ceil(e*r(t))}},lag:function(t,e){return e=+e||1,{next:n=>{const r=n.index-e;return r>=0?t(n.data[r]):null}}},lead:function(t,e){return e=+e||1,{next:n=>{const r=n.index+e,i=n.data;return r<i.length?t(i[r]):null}}},first_value:function(t){return{next:e=>t(e.data[e.i0])}},last_value:function(t){return{next:e=>t(e.data[e.i1-1])}},nth_value:function(t,e){return(e=+e)>0||s("nth_value nth must be greater than zero."),{next:n=>{const r=n.i0+(e-1);return r<n.i1?t(n.data[r]):null}}},prev_value:function(t){let e;return{init:()=>e=null,next:n=>{const r=t(n.data[n.index]);return null!=r?e=r:e}}},next_value:function(t){let e,n;return{init:()=>(e=null,n=-1),next:r=>{const i=r.data;return r.index<=n?e:(n=function(t,e,n){for(let r=e.length;n<r;++n){if(null!=t(e[n]))return n}return-1}(t,i,r.index))<0?(n=i.length,e=null):e=t(i[n])}}}};const Qu=Object.keys(Zu);function Ku(t){const e=W(t.ops),i=W(t.fields),o=W(t.params),a=W(t.aggregate_params),u=W(t.as),l=this.outputs=[],c=this.windows=[],f={},d={},p=[],g=[];let m=!0;function y(t){W(r(t)).forEach((t=>f[t]=1))}y(t.sort),e.forEach(((t,e)=>{const r=i[e],f=o[e],v=a[e]||null,_=n(r),x=Ns(t,_,u[e]);if(y(r),l.push(x),rt(Zu,t))c.push(function(t,e,n,r){const i=Zu[t](e,n);return{init:i.init||h,update:function(t,e){e[r]=i.next(t)}}}(t,r,f,x));else{if(null==r&&"count"!==t&&s("Null aggregate field specified."),"count"===t)return void p.push(x);m=!1;let e=d[_];e||(e=d[_]=[],e.field=r,g.push(e)),e.push(Us(t,v,x))}})),(p.length||g.length)&&(this.cell=function(t,e,n){t=t.map((t=>Hs(t,t.field)));const r={num:0,agg:null,store:!1,count:e};if(!n)for(var i=t.length,o=r.agg=Array(i),a=0;a<i;++a)o[a]=new t[a](r);if(r.store)var s=r.data=new Ys;return r.add=function(t){if(r.num+=1,!n){s&&s.add(t);for(let e=0;e<i;++e)o[e].add(o[e].get(t),t)}},r.rem=function(t){if(r.num-=1,!n){s&&s.rem(t);for(let e=0;e<i;++e)o[e].rem(o[e].get(t),t)}},r.set=function(t){let i,a;for(s&&s.values(),i=0,a=e.length;i<a;++i)t[e[i]]=r.num;if(!n)for(i=0,a=o.length;i<a;++i)o[i].set(t)},r.init=function(){r.num=0,s&&s.reset();for(let t=0;t<i;++t)o[t].init()},r}(g,p,m)),this.inputs=Object.keys(f)}const tl=Ku.prototype;function el(t){La.call(this,{},t),this._mlen=0,this._mods=[]}function nl(t,e,n,r){const i=r.sort,o=i&&!r.ignorePeers,a=r.frame||[null,0],s=t.data(n),u=s.length,l=o?Yt(i):null,c={i0:0,i1:0,p0:0,p1:0,index:0,data:s,compare:i||Q(-1)};e.init();for(let t=0;t<u;++t)rl(c,a,t,u),o&&il(c,l),e.update(c,s[t])}function rl(t,e,n,r){t.p0=t.i0,t.p1=t.i1,t.i0=null==e[0]?0:Math.max(0,n-Math.abs(e[0])),t.i1=null==e[1]?r:Math.min(r,n+Math.abs(e[1])+1),t.index=n}function il(t,e){const n=t.i0,r=t.i1-1,i=t.compare,o=t.data,a=o.length-1;n>0&&!i(o[n],o[n-1])&&(t.i0=e.left(o,o[n])),r<a&&!i(o[r],o[r+1])&&(t.i1=e.right(o,o[r]))}tl.init=function(){this.windows.forEach((t=>t.init())),this.cell&&this.cell.init()},tl.update=function(t,e){const n=this.cell,r=this.windows,i=t.data,o=r&&r.length;let a;if(n){for(a=t.p0;a<t.i0;++a)n.rem(i[a]);for(a=t.p1;a<t.i1;++a)n.add(i[a]);n.set(e)}for(a=0;a<o;++a)r[a].update(t,e)},el.Definition={type:"Window",metadata:{modifies:!0},params:[{name:"sort",type:"compare"},{name:"groupby",type:"field",array:!0},{name:"ops",type:"enum",array:!0,values:Qu.concat(Ls)},{name:"params",type:"number",null:!0,array:!0},{name:"aggregate_params",type:"number",null:!0,array:!0},{name:"fields",type:"field",null:!0,array:!0},{name:"as",type:"string",null:!0,array:!0},{name:"frame",type:"number",null:!0,array:!0,length:2,default:[null,0]},{name:"ignorePeers",type:"boolean",default:!1}]},st(el,La,{transform(t,e){this.stamp=e.stamp;const n=t.modified(),r=fa(t.sort),i=Bs(t.groupby),o=t=>this.group(i(t));let a=this.state;a&&!n||(a=this.state=new Ku(t)),n||e.modified(a.inputs)?(this.value={},e.visit(e.SOURCE,(t=>o(t).add(t)))):(e.visit(e.REM,(t=>o(t).remove(t))),e.visit(e.ADD,(t=>o(t).add(t))));for(let e=0,n=this._mlen;e<n;++e)nl(this._mods[e],a,r,t);return this._mlen=0,this._mods=[],e.reflow(n).modifies(a.outputs)},group(t){let e=this.value[t];return e||(e=this.value[t]=Js(oa),e.stamp=-1),e.stamp<this.stamp&&(e.stamp=this.stamp,this._mods[this._mlen++]=e),e}});var ol=Object.freeze({__proto__:null,aggregate:Vs,bin:Xs,collect:Zs,compare:Qs,countpattern:tu,cross:eu,density:ou,dotbin:cu,expression:fu,extent:du,facet:gu,field:mu,filter:vu,flatten:_u,fold:xu,formula:bu,generate:wu,impute:Au,joinaggregate:Eu,kde:Du,key:Cu,load:Su,lookup:Tu,multiextent:Bu,multivalues:zu,params:Ru,pivot:Lu,prefacet:Uu,project:qu,proxy:Pu,quantile:ju,relay:Iu,sample:Wu,sequence:Hu,sieve:Yu,subflow:pu,timeunit:Gu,tupleindex:Xu,values:Ju,window:el});function al(t){return function(){return t}}const sl=Math.abs,ul=Math.atan2,ll=Math.cos,cl=Math.max,fl=Math.min,hl=Math.sin,dl=Math.sqrt,pl=1e-12,gl=Math.PI,ml=gl/2,yl=2*gl;function vl(t){return t>=1?ml:t<=-1?-ml:Math.asin(t)}const _l=Math.PI,xl=2*_l,bl=1e-6,wl=xl-bl;function kl(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}let Ml=class{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=null==t?kl:function(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return kl;const n=10**e;return function(t){this._+=t[0];for(let e=1,r=t.length;e<r;++e)this._+=Math.round(arguments[e]*n)/n+t[e]}}(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,n,r){this._append`Q${+t},${+e},${this._x1=+n},${this._y1=+r}`}bezierCurveTo(t,e,n,r,i,o){this._append`C${+t},${+e},${+n},${+r},${this._x1=+i},${this._y1=+o}`}arcTo(t,e,n,r,i){if(t=+t,e=+e,n=+n,r=+r,(i=+i)<0)throw new Error(`negative radius: ${i}`);let o=this._x1,a=this._y1,s=n-t,u=r-e,l=o-t,c=a-e,f=l*l+c*c;if(null===this._x1)this._append`M${this._x1=t},${this._y1=e}`;else if(f>bl)if(Math.abs(c*s-u*l)>bl&&i){let h=n-o,d=r-a,p=s*s+u*u,g=h*h+d*d,m=Math.sqrt(p),y=Math.sqrt(f),v=i*Math.tan((_l-Math.acos((p+f-g)/(2*m*y)))/2),_=v/y,x=v/m;Math.abs(_-1)>bl&&this._append`L${t+_*l},${e+_*c}`,this._append`A${i},${i},0,0,${+(c*h>l*d)},${this._x1=t+x*s},${this._y1=e+x*u}`}else this._append`L${this._x1=t},${this._y1=e}`;else;}arc(t,e,n,r,i,o){if(t=+t,e=+e,o=!!o,(n=+n)<0)throw new Error(`negative radius: ${n}`);let a=n*Math.cos(r),s=n*Math.sin(r),u=t+a,l=e+s,c=1^o,f=o?r-i:i-r;null===this._x1?this._append`M${u},${l}`:(Math.abs(this._x1-u)>bl||Math.abs(this._y1-l)>bl)&&this._append`L${u},${l}`,n&&(f<0&&(f=f%xl+xl),f>wl?this._append`A${n},${n},0,1,${c},${t-a},${e-s}A${n},${n},0,1,${c},${this._x1=u},${this._y1=l}`:f>bl&&this._append`A${n},${n},0,${+(f>=_l)},${c},${this._x1=t+n*Math.cos(i)},${this._y1=e+n*Math.sin(i)}`)}rect(t,e,n,r){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${n=+n}v${+r}h${-n}Z`}toString(){return this._}};function Al(){return new Ml}function El(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(null==n)e=null;else{const t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);e=t}return t},()=>new Ml(e)}function Dl(t){return t.innerRadius}function Cl(t){return t.outerRadius}function Fl(t){return t.startAngle}function Sl(t){return t.endAngle}function $l(t){return t&&t.padAngle}function Tl(t,e,n,r,i,o,a){var s=t-n,u=e-r,l=(a?o:-o)/dl(s*s+u*u),c=l*u,f=-l*s,h=t+c,d=e+f,p=n+c,g=r+f,m=(h+p)/2,y=(d+g)/2,v=p-h,_=g-d,x=v*v+_*_,b=i-o,w=h*g-p*d,k=(_<0?-1:1)*dl(cl(0,b*b*x-w*w)),M=(w*_-v*k)/x,A=(-w*v-_*k)/x,E=(w*_+v*k)/x,D=(-w*v+_*k)/x,C=M-m,F=A-y,S=E-m,$=D-y;return C*C+F*F>S*S+$*$&&(M=E,A=D),{cx:M,cy:A,x01:-c,y01:-f,x11:M*(i/b-1),y11:A*(i/b-1)}}function Bl(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function Nl(t){this._context=t}function zl(t){return new Nl(t)}function Ol(t){return t[0]}function Rl(t){return t[1]}function Ll(t,e){var n=al(!0),r=null,i=zl,o=null,a=El(s);function s(s){var u,l,c,f=(s=Bl(s)).length,h=!1;for(null==r&&(o=i(c=a())),u=0;u<=f;++u)!(u<f&&n(l=s[u],u,s))===h&&((h=!h)?o.lineStart():o.lineEnd()),h&&o.point(+t(l,u,s),+e(l,u,s));if(c)return o=null,c+""||null}return t="function"==typeof t?t:void 0===t?Ol:al(t),e="function"==typeof e?e:void 0===e?Rl:al(e),s.x=function(e){return arguments.length?(t="function"==typeof e?e:al(+e),s):t},s.y=function(t){return arguments.length?(e="function"==typeof t?t:al(+t),s):e},s.defined=function(t){return arguments.length?(n="function"==typeof t?t:al(!!t),s):n},s.curve=function(t){return arguments.length?(i=t,null!=r&&(o=i(r)),s):i},s.context=function(t){return arguments.length?(null==t?r=o=null:o=i(r=t),s):r},s}function Ul(t,e,n){var r=null,i=al(!0),o=null,a=zl,s=null,u=El(l);function l(l){var c,f,h,d,p,g=(l=Bl(l)).length,m=!1,y=new Array(g),v=new Array(g);for(null==o&&(s=a(p=u())),c=0;c<=g;++c){if(!(c<g&&i(d=l[c],c,l))===m)if(m=!m)f=c,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),h=c-1;h>=f;--h)s.point(y[h],v[h]);s.lineEnd(),s.areaEnd()}m&&(y[c]=+t(d,c,l),v[c]=+e(d,c,l),s.point(r?+r(d,c,l):y[c],n?+n(d,c,l):v[c]))}if(p)return s=null,p+""||null}function c(){return Ll().defined(i).curve(a).context(o)}return t="function"==typeof t?t:void 0===t?Ol:al(+t),e="function"==typeof e?e:al(void 0===e?0:+e),n="function"==typeof n?n:void 0===n?Rl:al(+n),l.x=function(e){return arguments.length?(t="function"==typeof e?e:al(+e),r=null,l):t},l.x0=function(e){return arguments.length?(t="function"==typeof e?e:al(+e),l):t},l.x1=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:al(+t),l):r},l.y=function(t){return arguments.length?(e="function"==typeof t?t:al(+t),n=null,l):e},l.y0=function(t){return arguments.length?(e="function"==typeof t?t:al(+t),l):e},l.y1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:al(+t),l):n},l.lineX0=l.lineY0=function(){return c().x(t).y(e)},l.lineY1=function(){return c().x(t).y(n)},l.lineX1=function(){return c().x(r).y(e)},l.defined=function(t){return arguments.length?(i="function"==typeof t?t:al(!!t),l):i},l.curve=function(t){return arguments.length?(a=t,null!=o&&(s=a(o)),l):a},l.context=function(t){return arguments.length?(null==t?o=s=null:s=a(o=t),l):o},l}Al.prototype=Ml.prototype,Nl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e)}}};var ql={draw(t,e){const n=dl(e/gl);t.moveTo(n,0),t.arc(0,0,n,0,yl)}};function Pl(){}function jl(t,e,n){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+n)/6)}function Il(t){this._context=t}function Wl(t){this._context=t}function Hl(t){this._context=t}function Yl(t,e){this._basis=new Il(t),this._beta=e}Il.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:jl(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:jl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Wl.prototype={areaStart:Pl,areaEnd:Pl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x2=t,this._y2=e;break;case 1:this._point=2,this._x3=t,this._y3=e;break;case 2:this._point=3,this._x4=t,this._y4=e,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+e)/6);break;default:jl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Hl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var n=(this._x0+4*this._x1+t)/6,r=(this._y0+4*this._y1+e)/6;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:this._point=4;default:jl(this,t,e)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}},Yl.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,e=this._y,n=t.length-1;if(n>0)for(var r,i=t[0],o=e[0],a=t[n]-i,s=e[n]-o,u=-1;++u<=n;)r=u/n,this._basis.point(this._beta*t[u]+(1-this._beta)*(i+r*a),this._beta*e[u]+(1-this._beta)*(o+r*s));this._x=this._y=null,this._basis.lineEnd()},point:function(t,e){this._x.push(+t),this._y.push(+e)}};var Gl=function t(e){function n(t){return 1===e?new Il(t):new Yl(t,e)}return n.beta=function(e){return t(+e)},n}(.85);function Vl(t,e,n){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-n),t._x2,t._y2)}function Xl(t,e){this._context=t,this._k=(1-e)/6}Xl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Vl(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:Vl(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var Jl=function t(e){function n(t){return new Xl(t,e)}return n.tension=function(e){return t(+e)},n}(0);function Zl(t,e){this._context=t,this._k=(1-e)/6}Zl.prototype={areaStart:Pl,areaEnd:Pl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:Vl(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var Ql=function t(e){function n(t){return new Zl(t,e)}return n.tension=function(e){return t(+e)},n}(0);function Kl(t,e){this._context=t,this._k=(1-e)/6}Kl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Vl(this,t,e)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var tc=function t(e){function n(t){return new Kl(t,e)}return n.tension=function(e){return t(+e)},n}(0);function ec(t,e,n){var r=t._x1,i=t._y1,o=t._x2,a=t._y2;if(t._l01_a>pl){var s=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,u=3*t._l01_a*(t._l01_a+t._l12_a);r=(r*s-t._x0*t._l12_2a+t._x2*t._l01_2a)/u,i=(i*s-t._y0*t._l12_2a+t._y2*t._l01_2a)/u}if(t._l23_a>pl){var l=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);o=(o*l+t._x1*t._l23_2a-e*t._l12_2a)/c,a=(a*l+t._y1*t._l23_2a-n*t._l12_2a)/c}t._context.bezierCurveTo(r,i,o,a,t._x2,t._y2)}function nc(t,e){this._context=t,this._alpha=e}nc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3;default:ec(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var rc=function t(e){function n(t){return e?new nc(t,e):new Xl(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function ic(t,e){this._context=t,this._alpha=e}ic.prototype={areaStart:Pl,areaEnd:Pl,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=e;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=e);break;case 2:this._point=3,this._x5=t,this._y5=e;break;default:ec(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var oc=function t(e){function n(t){return e?new ic(t,e):new Zl(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function ac(t,e){this._context=t,this._alpha=e}ac.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var n=this._x2-t,r=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:ec(this,t,e)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};var sc=function t(e){function n(t){return e?new ac(t,e):new Kl(t,0)}return n.alpha=function(e){return t(+e)},n}(.5);function uc(t){this._context=t}function lc(t){return t<0?-1:1}function cc(t,e,n){var r=t._x1-t._x0,i=e-t._x1,o=(t._y1-t._y0)/(r||i<0&&-0),a=(n-t._y1)/(i||r<0&&-0),s=(o*i+a*r)/(r+i);return(lc(o)+lc(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(s))||0}function fc(t,e){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-e)/2:e}function hc(t,e,n){var r=t._x0,i=t._y0,o=t._x1,a=t._y1,s=(o-r)/3;t._context.bezierCurveTo(r+s,i+s*e,o-s,a-s*n,o,a)}function dc(t){this._context=t}function pc(t){this._context=new gc(t)}function gc(t){this._context=t}function mc(t){this._context=t}function yc(t){var e,n,r=t.length-1,i=new Array(r),o=new Array(r),a=new Array(r);for(i[0]=0,o[0]=2,a[0]=t[0]+2*t[1],e=1;e<r-1;++e)i[e]=1,o[e]=4,a[e]=4*t[e]+2*t[e+1];for(i[r-1]=2,o[r-1]=7,a[r-1]=8*t[r-1]+t[r],e=1;e<r;++e)n=i[e]/o[e-1],o[e]-=n,a[e]-=n*a[e-1];for(i[r-1]=a[r-1]/o[r-1],e=r-2;e>=0;--e)i[e]=(a[e]-i[e+1])/o[e];for(o[r-1]=(t[r]+i[r-1])/2,e=0;e<r-1;++e)o[e]=2*t[e+1]-i[e+1];return[i,o]}function vc(t,e){this._context=t,this._t=e}function _c(t,e){if("undefined"!=typeof document&&document.createElement){const n=document.createElement("canvas");if(n&&n.getContext)return n.width=t,n.height=e,n}return null}uc.prototype={areaStart:Pl,areaEnd:Pl,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,e){t=+t,e=+e,this._point?this._context.lineTo(t,e):(this._point=1,this._context.moveTo(t,e))}},dc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:hc(this,this._t0,fc(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){var n=NaN;if(e=+e,(t=+t)!==this._x1||e!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,hc(this,fc(this,n=cc(this,t,e)),n);break;default:hc(this,this._t0,n=cc(this,t,e))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e,this._t0=n}}},(pc.prototype=Object.create(dc.prototype)).point=function(t,e){dc.prototype.point.call(this,e,t)},gc.prototype={moveTo:function(t,e){this._context.moveTo(e,t)},closePath:function(){this._context.closePath()},lineTo:function(t,e){this._context.lineTo(e,t)},bezierCurveTo:function(t,e,n,r,i,o){this._context.bezierCurveTo(e,t,r,n,o,i)}},mc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,e=this._y,n=t.length;if(n)if(this._line?this._context.lineTo(t[0],e[0]):this._context.moveTo(t[0],e[0]),2===n)this._context.lineTo(t[1],e[1]);else for(var r=yc(t),i=yc(e),o=0,a=1;a<n;++o,++a)this._context.bezierCurveTo(r[0][o],i[0][o],r[1][o],i[1][o],t[a],e[a]);(this._line||0!==this._line&&1===n)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,e){this._x.push(+t),this._y.push(+e)}},vc.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,e),this._context.lineTo(t,e);else{var n=this._x*(1-this._t)+t*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,e)}}this._x=t,this._y=e}};const xc=()=>"undefined"!=typeof Image?Image:null;function bc(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}function wc(t,e){switch(arguments.length){case 0:break;case 1:"function"==typeof t?this.interpolator(t):this.range(t);break;default:this.domain(t),"function"==typeof e?this.interpolator(e):this.range(e)}return this}const kc=Symbol("implicit");function Mc(){var t=new Kt,e=[],n=[],r=kc;function i(i){let o=t.get(i);if(void 0===o){if(r!==kc)return r;t.set(i,o=e.push(i)-1)}return n[o%n.length]}return i.domain=function(n){if(!arguments.length)return e.slice();e=[],t=new Kt;for(const r of n)t.has(r)||t.set(r,e.push(r)-1);return i},i.range=function(t){return arguments.length?(n=Array.from(t),i):n.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return Mc(e,n).unknown(r)},bc.apply(i,arguments),i}function Ac(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function Ec(t,e){var n=Object.create(t.prototype);for(var r in e)n[r]=e[r];return n}function Dc(){}var Cc=.7,Fc=1/Cc,Sc="\\s*([+-]?\\d+)\\s*",$c="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Tc="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Bc=/^#([0-9a-f]{3,8})$/,Nc=new RegExp(`^rgb\\(${Sc},${Sc},${Sc}\\)$`),zc=new RegExp(`^rgb\\(${Tc},${Tc},${Tc}\\)$`),Oc=new RegExp(`^rgba\\(${Sc},${Sc},${Sc},${$c}\\)$`),Rc=new RegExp(`^rgba\\(${Tc},${Tc},${Tc},${$c}\\)$`),Lc=new RegExp(`^hsl\\(${$c},${Tc},${Tc}\\)$`),Uc=new RegExp(`^hsla\\(${$c},${Tc},${Tc},${$c}\\)$`),qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Pc(){return this.rgb().formatHex()}function jc(){return this.rgb().formatRgb()}function Ic(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=Bc.exec(t))?(n=e[1].length,e=parseInt(e[1],16),6===n?Wc(e):3===n?new Vc(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===n?Hc(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===n?Hc(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=Nc.exec(t))?new Vc(e[1],e[2],e[3],1):(e=zc.exec(t))?new Vc(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=Oc.exec(t))?Hc(e[1],e[2],e[3],e[4]):(e=Rc.exec(t))?Hc(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Lc.exec(t))?tf(e[1],e[2]/100,e[3]/100,1):(e=Uc.exec(t))?tf(e[1],e[2]/100,e[3]/100,e[4]):qc.hasOwnProperty(t)?Wc(qc[t]):"transparent"===t?new Vc(NaN,NaN,NaN,0):null}function Wc(t){return new Vc(t>>16&255,t>>8&255,255&t,1)}function Hc(t,e,n,r){return r<=0&&(t=e=n=NaN),new Vc(t,e,n,r)}function Yc(t){return t instanceof Dc||(t=Ic(t)),t?new Vc((t=t.rgb()).r,t.g,t.b,t.opacity):new Vc}function Gc(t,e,n,r){return 1===arguments.length?Yc(t):new Vc(t,e,n,null==r?1:r)}function Vc(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r}function Xc(){return`#${Kc(this.r)}${Kc(this.g)}${Kc(this.b)}`}function Jc(){const t=Zc(this.opacity);return`${1===t?"rgb(":"rgba("}${Qc(this.r)}, ${Qc(this.g)}, ${Qc(this.b)}${1===t?")":`, ${t})`}`}function Zc(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function Qc(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Kc(t){return((t=Qc(t))<16?"0":"")+t.toString(16)}function tf(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new rf(t,e,n,r)}function ef(t){if(t instanceof rf)return new rf(t.h,t.s,t.l,t.opacity);if(t instanceof Dc||(t=Ic(t)),!t)return new rf;if(t instanceof rf)return t;var e=(t=t.rgb()).r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),o=Math.max(e,n,r),a=NaN,s=o-i,u=(o+i)/2;return s?(a=e===o?(n-r)/s+6*(n<r):n===o?(r-e)/s+2:(e-n)/s+4,s/=u<.5?o+i:2-o-i,a*=60):s=u>0&&u<1?0:a,new rf(a,s,u,t.opacity)}function nf(t,e,n,r){return 1===arguments.length?ef(t):new rf(t,e,n,null==r?1:r)}function rf(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function of(t){return(t=(t||0)%360)<0?t+360:t}function af(t){return Math.max(0,Math.min(1,t||0))}function sf(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)}Ac(Dc,Ic,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Pc,formatHex:Pc,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return ef(this).formatHsl()},formatRgb:jc,toString:jc}),Ac(Vc,Gc,Ec(Dc,{brighter(t){return t=null==t?Fc:Math.pow(Fc,t),new Vc(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=null==t?Cc:Math.pow(Cc,t),new Vc(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new Vc(Qc(this.r),Qc(this.g),Qc(this.b),Zc(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Xc,formatHex:Xc,formatHex8:function(){return`#${Kc(this.r)}${Kc(this.g)}${Kc(this.b)}${Kc(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Jc,toString:Jc})),Ac(rf,nf,Ec(Dc,{brighter(t){return t=null==t?Fc:Math.pow(Fc,t),new rf(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?Cc:Math.pow(Cc,t),new rf(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*e,i=2*n-r;return new Vc(sf(t>=240?t-240:t+120,i,r),sf(t,i,r),sf(t<120?t+240:t-120,i,r),this.opacity)},clamp(){return new rf(of(this.h),af(this.s),af(this.l),Zc(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=Zc(this.opacity);return`${1===t?"hsl(":"hsla("}${of(this.h)}, ${100*af(this.s)}%, ${100*af(this.l)}%${1===t?")":`, ${t})`}`}}));const uf=Math.PI/180,lf=180/Math.PI,cf=.96422,ff=.82521,hf=4/29,df=6/29,pf=3*df*df,gf=df*df*df;function mf(t){if(t instanceof vf)return new vf(t.l,t.a,t.b,t.opacity);if(t instanceof Mf)return Af(t);t instanceof Vc||(t=Yc(t));var e,n,r=wf(t.r),i=wf(t.g),o=wf(t.b),a=_f((.2225045*r+.7168786*i+.0606169*o)/1);return r===i&&i===o?e=n=a:(e=_f((.4360747*r+.3850649*i+.1430804*o)/cf),n=_f((.0139322*r+.0971045*i+.7141733*o)/ff)),new vf(116*a-16,500*(e-a),200*(a-n),t.opacity)}function yf(t,e,n,r){return 1===arguments.length?mf(t):new vf(t,e,n,null==r?1:r)}function vf(t,e,n,r){this.l=+t,this.a=+e,this.b=+n,this.opacity=+r}function _f(t){return t>gf?Math.pow(t,1/3):t/pf+hf}function xf(t){return t>df?t*t*t:pf*(t-hf)}function bf(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function wf(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function kf(t,e,n,r){return 1===arguments.length?function(t){if(t instanceof Mf)return new Mf(t.h,t.c,t.l,t.opacity);if(t instanceof vf||(t=mf(t)),0===t.a&&0===t.b)return new Mf(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*lf;return new Mf(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}(t):new Mf(t,e,n,null==r?1:r)}function Mf(t,e,n,r){this.h=+t,this.c=+e,this.l=+n,this.opacity=+r}function Af(t){if(isNaN(t.h))return new vf(t.l,0,0,t.opacity);var e=t.h*uf;return new vf(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}Ac(vf,yf,Ec(Dc,{brighter(t){return new vf(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker(t){return new vf(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return new Vc(bf(3.1338561*(e=cf*xf(e))-1.6168667*(t=1*xf(t))-.4906146*(n=ff*xf(n))),bf(-.9787684*e+1.9161415*t+.033454*n),bf(.0719453*e-.2289914*t+1.4052427*n),this.opacity)}})),Ac(Mf,kf,Ec(Dc,{brighter(t){return new Mf(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker(t){return new Mf(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb(){return Af(this).rgb()}}));var Ef=-.14861,Df=1.78277,Cf=-.29227,Ff=-.90649,Sf=1.97294,$f=Sf*Ff,Tf=Sf*Df,Bf=Df*Cf-Ff*Ef;function Nf(t,e,n,r){return 1===arguments.length?function(t){if(t instanceof zf)return new zf(t.h,t.s,t.l,t.opacity);t instanceof Vc||(t=Yc(t));var e=t.r/255,n=t.g/255,r=t.b/255,i=(Bf*r+$f*e-Tf*n)/(Bf+$f-Tf),o=r-i,a=(Sf*(n-i)-Cf*o)/Ff,s=Math.sqrt(a*a+o*o)/(Sf*i*(1-i)),u=s?Math.atan2(a,o)*lf-120:NaN;return new zf(u<0?u+360:u,s,i,t.opacity)}(t):new zf(t,e,n,null==r?1:r)}function zf(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r}function Of(t,e,n,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*e+(4-6*o+3*a)*n+(1+3*t+3*o-3*a)*r+a*i)/6}function Rf(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,s=r<e-1?t[r+2]:2*o-i;return Of((n-r/e)*e,a,i,o,s)}}function Lf(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),i=t[(r+e-1)%e],o=t[r%e],a=t[(r+1)%e],s=t[(r+2)%e];return Of((n-r/e)*e,i,o,a,s)}}Ac(zf,Nf,Ec(Dc,{brighter(t){return t=null==t?Fc:Math.pow(Fc,t),new zf(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=null==t?Cc:Math.pow(Cc,t),new zf(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=isNaN(this.h)?0:(this.h+120)*uf,e=+this.l,n=isNaN(this.s)?0:this.s*e*(1-e),r=Math.cos(t),i=Math.sin(t);return new Vc(255*(e+n*(Ef*r+Df*i)),255*(e+n*(Cf*r+Ff*i)),255*(e+n*(Sf*r)),this.opacity)}}));var Uf=t=>()=>t;function qf(t,e){return function(n){return t+n*e}}function Pf(t,e){var n=e-t;return n?qf(t,n>180||n<-180?n-360*Math.round(n/360):n):Uf(isNaN(t)?e:t)}function jf(t){return 1==(t=+t)?If:function(e,n){return n-e?function(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n)}}(e,n,t):Uf(isNaN(e)?n:e)}}function If(t,e){var n=e-t;return n?qf(t,n):Uf(isNaN(t)?e:t)}var Wf=function t(e){var n=jf(e);function r(t,e){var r=n((t=Gc(t)).r,(e=Gc(e)).r),i=n(t.g,e.g),o=n(t.b,e.b),a=If(t.opacity,e.opacity);return function(e){return t.r=r(e),t.g=i(e),t.b=o(e),t.opacity=a(e),t+""}}return r.gamma=t,r}(1);function Hf(t){return function(e){var n,r,i=e.length,o=new Array(i),a=new Array(i),s=new Array(i);for(n=0;n<i;++n)r=Gc(e[n]),o[n]=r.r||0,a[n]=r.g||0,s[n]=r.b||0;return o=t(o),a=t(a),s=t(s),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=s(t),r+""}}}var Yf=Hf(Rf),Gf=Hf(Lf);function Vf(t,e){e||(e=[]);var n,r=t?Math.min(e.length,t.length):0,i=e.slice();return function(o){for(n=0;n<r;++n)i[n]=t[n]*(1-o)+e[n]*o;return i}}function Xf(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Jf(t,e){var n,r=e?e.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(n=0;n<i;++n)o[n]=rh(t[n],e[n]);for(;n<r;++n)a[n]=e[n];return function(t){for(n=0;n<i;++n)a[n]=o[n](t);return a}}function Zf(t,e){var n=new Date;return t=+t,e=+e,function(r){return n.setTime(t*(1-r)+e*r),n}}function Qf(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Kf(t,e){var n,r={},i={};for(n in null!==t&&"object"==typeof t||(t={}),null!==e&&"object"==typeof e||(e={}),e)n in t?r[n]=rh(t[n],e[n]):i[n]=e[n];return function(t){for(n in r)i[n]=r[n](t);return i}}var th=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,eh=new RegExp(th.source,"g");function nh(t,e){var n,r,i,o=th.lastIndex=eh.lastIndex=0,a=-1,s=[],u=[];for(t+="",e+="";(n=th.exec(t))&&(r=eh.exec(e));)(i=r.index)>o&&(i=e.slice(o,i),s[a]?s[a]+=i:s[++a]=i),(n=n[0])===(r=r[0])?s[a]?s[a]+=r:s[++a]=r:(s[++a]=null,u.push({i:a,x:Qf(n,r)})),o=eh.lastIndex;return o<e.length&&(i=e.slice(o),s[a]?s[a]+=i:s[++a]=i),s.length<2?u[0]?function(t){return function(e){return t(e)+""}}(u[0].x):function(t){return function(){return t}}(e):(e=u.length,function(t){for(var n,r=0;r<e;++r)s[(n=u[r]).i]=n.x(t);return s.join("")})}function rh(t,e){var n,r=typeof e;return null==e||"boolean"===r?Uf(e):("number"===r?Qf:"string"===r?(n=Ic(e))?(e=n,Wf):nh:e instanceof Ic?Wf:e instanceof Date?Zf:Xf(e)?Vf:Array.isArray(e)?Jf:"function"!=typeof e.valueOf&&"function"!=typeof e.toString||isNaN(e)?Kf:Qf)(t,e)}function ih(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var oh,ah=180/Math.PI,sh={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function uh(t,e,n,r,i,o){var a,s,u;return(a=Math.sqrt(t*t+e*e))&&(t/=a,e/=a),(u=t*n+e*r)&&(n-=t*u,r-=e*u),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,u/=s),t*r<e*n&&(t=-t,e=-e,u=-u,a=-a),{translateX:i,translateY:o,rotate:Math.atan2(e,t)*ah,skewX:Math.atan(u)*ah,scaleX:a,scaleY:s}}function lh(t,e,n,r){function i(t){return t.length?t.pop()+" ":""}return function(o,a){var s=[],u=[];return o=t(o),a=t(a),function(t,r,i,o,a,s){if(t!==i||r!==o){var u=a.push("translate(",null,e,null,n);s.push({i:u-4,x:Qf(t,i)},{i:u-2,x:Qf(r,o)})}else(i||o)&&a.push("translate("+i+e+o+n)}(o.translateX,o.translateY,a.translateX,a.translateY,s,u),function(t,e,n,o){t!==e?(t-e>180?e+=360:e-t>180&&(t+=360),o.push({i:n.push(i(n)+"rotate(",null,r)-2,x:Qf(t,e)})):e&&n.push(i(n)+"rotate("+e+r)}(o.rotate,a.rotate,s,u),function(t,e,n,o){t!==e?o.push({i:n.push(i(n)+"skewX(",null,r)-2,x:Qf(t,e)}):e&&n.push(i(n)+"skewX("+e+r)}(o.skewX,a.skewX,s,u),function(t,e,n,r,o,a){if(t!==n||e!==r){var s=o.push(i(o)+"scale(",null,",",null,")");a.push({i:s-4,x:Qf(t,n)},{i:s-2,x:Qf(e,r)})}else 1===n&&1===r||o.push(i(o)+"scale("+n+","+r+")")}(o.scaleX,o.scaleY,a.scaleX,a.scaleY,s,u),o=a=null,function(t){for(var e,n=-1,r=u.length;++n<r;)s[(e=u[n]).i]=e.x(t);return s.join("")}}}var ch=lh((function(t){const e=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?sh:uh(e.a,e.b,e.c,e.d,e.e,e.f)}),"px, ","px)","deg)"),fh=lh((function(t){return null==t?sh:(oh||(oh=document.createElementNS("http://www.w3.org/2000/svg","g")),oh.setAttribute("transform",t),(t=oh.transform.baseVal.consolidate())?uh((t=t.matrix).a,t.b,t.c,t.d,t.e,t.f):sh)}),", ",")",")");function hh(t){return((t=Math.exp(t))+1/t)/2}var dh=function t(e,n,r){function i(t,i){var o,a,s=t[0],u=t[1],l=t[2],c=i[0],f=i[1],h=i[2],d=c-s,p=f-u,g=d*d+p*p;if(g<1e-12)a=Math.log(h/l)/e,o=function(t){return[s+t*d,u+t*p,l*Math.exp(e*t*a)]};else{var m=Math.sqrt(g),y=(h*h-l*l+r*g)/(2*l*n*m),v=(h*h-l*l-r*g)/(2*h*n*m),_=Math.log(Math.sqrt(y*y+1)-y),x=Math.log(Math.sqrt(v*v+1)-v);a=(x-_)/e,o=function(t){var r=t*a,i=hh(_),o=l/(n*m)*(i*function(t){return((t=Math.exp(2*t))-1)/(t+1)}(e*r+_)-function(t){return((t=Math.exp(t))-1/t)/2}(_));return[s+o*d,u+o*p,l*i/hh(e*r+_)]}}return o.duration=1e3*a*e/Math.SQRT2,o}return i.rho=function(e){var n=Math.max(.001,+e),r=n*n;return t(n,r,r*r)},i}(Math.SQRT2,2,4);function ph(t){return function(e,n){var r=t((e=nf(e)).h,(n=nf(n)).h),i=If(e.s,n.s),o=If(e.l,n.l),a=If(e.opacity,n.opacity);return function(t){return e.h=r(t),e.s=i(t),e.l=o(t),e.opacity=a(t),e+""}}}var gh=ph(Pf),mh=ph(If);function yh(t){return function(e,n){var r=t((e=kf(e)).h,(n=kf(n)).h),i=If(e.c,n.c),o=If(e.l,n.l),a=If(e.opacity,n.opacity);return function(t){return e.h=r(t),e.c=i(t),e.l=o(t),e.opacity=a(t),e+""}}}var vh=yh(Pf),_h=yh(If);function xh(t){return function e(n){function r(e,r){var i=t((e=Nf(e)).h,(r=Nf(r)).h),o=If(e.s,r.s),a=If(e.l,r.l),s=If(e.opacity,r.opacity);return function(t){return e.h=i(t),e.s=o(t),e.l=a(Math.pow(t,n)),e.opacity=s(t),e+""}}return n=+n,r.gamma=e,r}(1)}var bh=xh(Pf),wh=xh(If);function kh(t,e){void 0===e&&(e=t,t=rh);for(var n=0,r=e.length-1,i=e[0],o=new Array(r<0?0:r);n<r;)o[n]=t(i,i=e[++n]);return function(t){var e=Math.max(0,Math.min(r-1,Math.floor(t*=r)));return o[e](t-e)}}var Mh=Object.freeze({__proto__:null,interpolate:rh,interpolateArray:function(t,e){return(Xf(e)?Vf:Jf)(t,e)},interpolateBasis:Rf,interpolateBasisClosed:Lf,interpolateCubehelix:bh,interpolateCubehelixLong:wh,interpolateDate:Zf,interpolateDiscrete:function(t){var e=t.length;return function(n){return t[Math.max(0,Math.min(e-1,Math.floor(n*e)))]}},interpolateHcl:vh,interpolateHclLong:_h,interpolateHsl:gh,interpolateHslLong:mh,interpolateHue:function(t,e){var n=Pf(+t,+e);return function(t){var e=n(t);return e-360*Math.floor(e/360)}},interpolateLab:function(t,e){var n=If((t=yf(t)).l,(e=yf(e)).l),r=If(t.a,e.a),i=If(t.b,e.b),o=If(t.opacity,e.opacity);return function(e){return t.l=n(e),t.a=r(e),t.b=i(e),t.opacity=o(e),t+""}},interpolateNumber:Qf,interpolateNumberArray:Vf,interpolateObject:Kf,interpolateRgb:Wf,interpolateRgbBasis:Yf,interpolateRgbBasisClosed:Gf,interpolateRound:ih,interpolateString:nh,interpolateTransformCss:ch,interpolateTransformSvg:fh,interpolateZoom:dh,piecewise:kh,quantize:function(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t(r/(e-1));return n}});function Ah(t){return+t}var Eh=[0,1];function Dh(t){return t}function Ch(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:function(t){return function(){return t}}(isNaN(e)?NaN:.5)}function Fh(t,e,n){var r=t[0],i=t[1],o=e[0],a=e[1];return i<r?(r=Ch(i,r),o=n(a,o)):(r=Ch(r,i),o=n(o,a)),function(t){return o(r(t))}}function Sh(t,e,n){var r=Math.min(t.length,e.length)-1,i=new Array(r),o=new Array(r),a=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++a<r;)i[a]=Ch(t[a],t[a+1]),o[a]=n(e[a],e[a+1]);return function(e){var n=Jt(t,e,1,r)-1;return o[n](i[n](e))}}function $h(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function Th(){var t,e,n,r,i,o,a=Eh,s=Eh,u=rh,l=Dh;function c(){var t=Math.min(a.length,s.length);return l!==Dh&&(l=function(t,e){var n;return t>e&&(n=t,t=e,e=n),function(n){return Math.max(t,Math.min(e,n))}}(a[0],a[t-1])),r=t>2?Sh:Fh,i=o=null,f}function f(e){return null==e||isNaN(e=+e)?n:(i||(i=r(a.map(t),s,u)))(t(l(e)))}return f.invert=function(n){return l(e((o||(o=r(s,a.map(t),Qf)))(n)))},f.domain=function(t){return arguments.length?(a=Array.from(t,Ah),c()):a.slice()},f.range=function(t){return arguments.length?(s=Array.from(t),c()):s.slice()},f.rangeRound=function(t){return s=Array.from(t),u=ih,c()},f.clamp=function(t){return arguments.length?(l=!!t||Dh,c()):l!==Dh},f.interpolate=function(t){return arguments.length?(u=t,c()):u},f.unknown=function(t){return arguments.length?(n=t,f):n},function(n,r){return t=n,e=r,c()}}function Bh(){return Th()(Dh,Dh)}function Nh(t,e,n,r){var i,o=he(t,e,n);switch((r=Ce(null==r?",f":r)).type){case"s":var a=Math.max(Math.abs(t),Math.abs(e));return null!=r.precision||isNaN(i=qe(o,a))||(r.precision=i),ze(r,a);case"":case"e":case"g":case"p":case"r":null!=r.precision||isNaN(i=Pe(o,Math.max(Math.abs(t),Math.abs(e))))||(r.precision=i-("e"===r.type));break;case"f":case"%":null!=r.precision||isNaN(i=Ue(o))||(r.precision=i-2*("%"===r.type))}return Ne(r)}function zh(t){var e=t.domain;return t.ticks=function(t){var n=e();return ce(n[0],n[n.length-1],null==t?10:t)},t.tickFormat=function(t,n){var r=e();return Nh(r[0],r[r.length-1],null==t?10:t,n)},t.nice=function(n){null==n&&(n=10);var r,i,o=e(),a=0,s=o.length-1,u=o[a],l=o[s],c=10;for(l<u&&(i=u,u=l,l=i,i=a,a=s,s=i);c-- >0;){if((i=fe(u,l,n))===r)return o[a]=u,o[s]=l,e(o);if(i>0)u=Math.floor(u/i)*i,l=Math.ceil(l/i)*i;else{if(!(i<0))break;u=Math.ceil(u*i)/i,l=Math.floor(l*i)/i}r=i}return t},t}function Oh(t,e){var n,r=0,i=(t=t.slice()).length-1,o=t[r],a=t[i];return a<o&&(n=r,r=i,i=n,n=o,o=a,a=n),t[r]=e.floor(o),t[i]=e.ceil(a),t}function Rh(t){return Math.log(t)}function Lh(t){return Math.exp(t)}function Uh(t){return-Math.log(-t)}function qh(t){return-Math.exp(-t)}function Ph(t){return isFinite(t)?+("1e"+t):t<0?0:t}function jh(t){return(e,n)=>-t(-e,n)}function Ih(t){const e=t(Rh,Lh),n=e.domain;let r,i,o=10;function a(){return r=function(t){return t===Math.E?Math.log:10===t&&Math.log10||2===t&&Math.log2||(t=Math.log(t),e=>Math.log(e)/t)}(o),i=function(t){return 10===t?Ph:t===Math.E?Math.exp:e=>Math.pow(t,e)}(o),n()[0]<0?(r=jh(r),i=jh(i),t(Uh,qh)):t(Rh,Lh),e}return e.base=function(t){return arguments.length?(o=+t,a()):o},e.domain=function(t){return arguments.length?(n(t),a()):n()},e.ticks=t=>{const e=n();let a=e[0],s=e[e.length-1];const u=s<a;u&&([a,s]=[s,a]);let l,c,f=r(a),h=r(s);const d=null==t?10:+t;let p=[];if(!(o%1)&&h-f<d){if(f=Math.floor(f),h=Math.ceil(h),a>0){for(;f<=h;++f)for(l=1;l<o;++l)if(c=f<0?l/i(-f):l*i(f),!(c<a)){if(c>s)break;p.push(c)}}else for(;f<=h;++f)for(l=o-1;l>=1;--l)if(c=f>0?l/i(-f):l*i(f),!(c<a)){if(c>s)break;p.push(c)}2*p.length<d&&(p=ce(a,s,d))}else p=ce(f,h,Math.min(h-f,d)).map(i);return u?p.reverse():p},e.tickFormat=(t,n)=>{if(null==t&&(t=10),null==n&&(n=10===o?"s":","),"function"!=typeof n&&(o%1||null!=(n=Ce(n)).precision||(n.trim=!0),n=Ne(n)),t===1/0)return n;const a=Math.max(1,o*t/e.ticks().length);return t=>{let e=t/i(Math.round(r(t)));return e*o<o-.5&&(e*=o),e<=a?n(t):""}},e.nice=()=>n(Oh(n(),{floor:t=>i(Math.floor(r(t))),ceil:t=>i(Math.ceil(r(t)))})),e}function Wh(t){return function(e){return Math.sign(e)*Math.log1p(Math.abs(e/t))}}function Hh(t){return function(e){return Math.sign(e)*Math.expm1(Math.abs(e))*t}}function Yh(t){var e=1,n=t(Wh(e),Hh(e));return n.constant=function(n){return arguments.length?t(Wh(e=+n),Hh(e)):e},zh(n)}function Gh(t){return function(e){return e<0?-Math.pow(-e,t):Math.pow(e,t)}}function Vh(t){return t<0?-Math.sqrt(-t):Math.sqrt(t)}function Xh(t){return t<0?-t*t:t*t}function Jh(t){var e=t(Dh,Dh),n=1;return e.exponent=function(e){return arguments.length?1===(n=+e)?t(Dh,Dh):.5===n?t(Vh,Xh):t(Gh(n),Gh(1/n)):n},zh(e)}function Zh(){var t=Jh(Th());return t.copy=function(){return $h(t,Zh()).exponent(t.exponent())},bc.apply(t,arguments),t}function Qh(t){return new Date(t)}function Kh(t){return t instanceof Date?+t:+new Date(+t)}function td(t,e,n,r,i,o,a,s,u,l){var c=Bh(),f=c.invert,h=c.domain,d=l(".%L"),p=l(":%S"),g=l("%I:%M"),m=l("%I %p"),y=l("%a %d"),v=l("%b %d"),_=l("%B"),x=l("%Y");function b(t){return(u(t)<t?d:s(t)<t?p:a(t)<t?g:o(t)<t?m:r(t)<t?i(t)<t?y:v:n(t)<t?_:x)(t)}return c.invert=function(t){return new Date(f(t))},c.domain=function(t){return arguments.length?h(Array.from(t,Kh)):h().map(Qh)},c.ticks=function(e){var n=h();return t(n[0],n[n.length-1],null==e?10:e)},c.tickFormat=function(t,e){return null==e?b:l(e)},c.nice=function(t){var n=h();return t&&"function"==typeof t.range||(t=e(n[0],n[n.length-1],null==t?10:t)),t?h(Oh(n,t)):c},c.copy=function(){return $h(c,td(t,e,n,r,i,o,a,s,u,l))},c}function ed(){var t,e,n,r,i,o=0,a=1,s=Dh,u=!1;function l(e){return null==e||isNaN(e=+e)?i:s(0===n?.5:(e=(r(e)-t)*n,u?Math.max(0,Math.min(1,e)):e))}function c(t){return function(e){var n,r;return arguments.length?([n,r]=e,s=t(n,r),l):[s(0),s(1)]}}return l.domain=function(i){return arguments.length?([o,a]=i,t=r(o=+o),e=r(a=+a),n=t===e?0:1/(e-t),l):[o,a]},l.clamp=function(t){return arguments.length?(u=!!t,l):u},l.interpolator=function(t){return arguments.length?(s=t,l):s},l.range=c(rh),l.rangeRound=c(ih),l.unknown=function(t){return arguments.length?(i=t,l):i},function(i){return r=i,t=i(o),e=i(a),n=t===e?0:1/(e-t),l}}function nd(t,e){return e.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())}function rd(){var t=zh(ed()(Dh));return t.copy=function(){return nd(t,rd())},wc.apply(t,arguments)}function id(){var t=Jh(ed());return t.copy=function(){return nd(t,id()).exponent(t.exponent())},wc.apply(t,arguments)}function od(){var t,e,n,r,i,o,a,s=0,u=.5,l=1,c=1,f=Dh,h=!1;function d(t){return isNaN(t=+t)?a:(t=.5+((t=+o(t))-e)*(c*t<c*e?r:i),f(h?Math.max(0,Math.min(1,t)):t))}function p(t){return function(e){var n,r,i;return arguments.length?([n,r,i]=e,f=kh(t,[n,r,i]),d):[f(0),f(.5),f(1)]}}return d.domain=function(a){return arguments.length?([s,u,l]=a,t=o(s=+s),e=o(u=+u),n=o(l=+l),r=t===e?0:.5/(e-t),i=e===n?0:.5/(n-e),c=e<t?-1:1,d):[s,u,l]},d.clamp=function(t){return arguments.length?(h=!!t,d):h},d.interpolator=function(t){return arguments.length?(f=t,d):f},d.range=p(rh),d.rangeRound=p(ih),d.unknown=function(t){return arguments.length?(a=t,d):a},function(a){return o=a,t=a(s),e=a(u),n=a(l),r=t===e?0:.5/(e-t),i=e===n?0:.5/(n-e),c=e<t?-1:1,d}}function ad(){var t=Jh(od());return t.copy=function(){return nd(t,ad()).exponent(t.exponent())},wc.apply(t,arguments)}function sd(t){for(var e=t.length/6|0,n=new Array(e),r=0;r<e;)n[r]="#"+t.slice(6*r,6*++r);return n}var ud=sd("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),ld=sd("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),cd=sd("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"),fd=sd("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0"),hd=sd("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"),dd=sd("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),pd=sd("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),gd=sd("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),md=sd("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),yd=sd("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");function vd(t,e,n){const r=t-e+2*n;return t?r>0?r:1:0}const _d="linear",xd="log",bd="pow",wd="sqrt",kd="symlog",Md="time",Ad="utc",Ed="sequential",Dd="diverging",Cd="quantile",Fd="quantize",Sd="threshold",$d="ordinal",Td="point",Bd="band",Nd="bin-ordinal",zd="continuous",Od="discrete",Rd="discretizing",Ld="interpolating",Ud="temporal";function qd(){const t=Mc().unknown(void 0),e=t.domain,n=t.range;let r,i,o=[0,1],a=!1,s=0,u=0,l=.5;function c(){const t=e().length,c=o[1]<o[0],f=o[1-c],h=vd(t,s,u);let d=o[c-0];r=(f-d)/(h||1),a&&(r=Math.floor(r)),d+=(f-d-r*(t-s))*l,i=r*(1-s),a&&(d=Math.round(d),i=Math.round(i));const p=be(t).map((t=>d+r*t));return n(c?p.reverse():p)}return delete t.unknown,t.domain=function(t){return arguments.length?(e(t),c()):e()},t.range=function(t){return arguments.length?(o=[+t[0],+t[1]],c()):o.slice()},t.rangeRound=function(t){return o=[+t[0],+t[1]],a=!0,c()},t.bandwidth=function(){return i},t.step=function(){return r},t.round=function(t){return arguments.length?(a=!!t,c()):a},t.padding=function(t){return arguments.length?(u=Math.max(0,Math.min(1,t)),s=u,c()):s},t.paddingInner=function(t){return arguments.length?(s=Math.max(0,Math.min(1,t)),c()):s},t.paddingOuter=function(t){return arguments.length?(u=Math.max(0,Math.min(1,t)),c()):u},t.align=function(t){return arguments.length?(l=Math.max(0,Math.min(1,t)),c()):l},t.invertRange=function(t){if(null==t[0]||null==t[1])return;const r=o[1]<o[0],a=r?n().reverse():n(),s=a.length-1;let u,l,c,f=+t[0],h=+t[1];return f!=f||h!=h||(h<f&&(c=f,f=h,h=c),h<a[0]||f>o[1-r])?void 0:(u=Math.max(0,Jt(a,f)-1),l=f===h?u:Jt(a,h)-1,f-a[u]>i+1e-10&&++u,r&&(c=u,u=s-l,l=s-c),u>l?void 0:e().slice(u,l+1))},t.invert=function(e){const n=t.invertRange([e,e]);return n?n[0]:n},t.copy=function(){return qd().domain(e()).range(o).round(a).paddingInner(s).paddingOuter(u).align(l)},c()}function Pd(t){const e=t.copy;return t.padding=t.paddingOuter,delete t.paddingInner,t.copy=function(){return Pd(e())},t}var jd=Array.prototype.map;const Id=Array.prototype.slice;const Wd=new Map,Hd=Symbol("vega_scale");function Yd(t){return t[Hd]=!0,t}function Gd(t){return t&&!0===t[Hd]}function Vd(t,e,n){return arguments.length>1?(Wd.set(t,function(t,e,n){const r=function(){const n=e();return n.invertRange||(n.invertRange=n.invert?function(t){return function(e){let n,r=e[0],i=e[1];return i<r&&(n=r,r=i,i=n),[t.invert(r),t.invert(i)]}}(n):n.invertExtent?function(t){return function(e){const n=t.range();let r,i,o,a,s=e[0],u=e[1],l=-1;for(u<s&&(i=s,s=u,u=i),o=0,a=n.length;o<a;++o)n[o]>=s&&n[o]<=u&&(l<0&&(l=o),r=o);if(!(l<0))return s=t.invertExtent(n[l]),u=t.invertExtent(n[r]),[void 0===s[0]?s[1]:s[0],void 0===u[1]?u[0]:u[1]]}}(n):void 0),n.type=t,Yd(n)};return r.metadata=Dt(W(n)),r}(t,e,n)),this):Xd(t)?Wd.get(t):void 0}function Xd(t){return Wd.has(t)}function Jd(t,e){const n=Wd.get(t);return n&&n.metadata[e]}function Zd(t){return Jd(t,zd)}function Qd(t){return Jd(t,Od)}function Kd(t){return Jd(t,Rd)}function tp(t){return Jd(t,xd)}function ep(t){return Jd(t,Ld)}function np(t){return Jd(t,Cd)}Vd("identity",(function t(e){var n;function r(t){return null==t||isNaN(t=+t)?n:t}return r.invert=r,r.domain=r.range=function(t){return arguments.length?(e=Array.from(t,Ah),r):e.slice()},r.unknown=function(t){return arguments.length?(n=t,r):n},r.copy=function(){return t(e).unknown(n)},e=arguments.length?Array.from(e,Ah):[0,1],zh(r)})),Vd(_d,(function t(){var e=Bh();return e.copy=function(){return $h(e,t())},bc.apply(e,arguments),zh(e)}),zd),Vd(xd,(function t(){const e=Ih(Th()).domain([1,10]);return e.copy=()=>$h(e,t()).base(e.base()),bc.apply(e,arguments),e}),[zd,xd]),Vd(bd,Zh,zd),Vd(wd,(function(){return Zh.apply(null,arguments).exponent(.5)}),zd),Vd(kd,(function t(){var e=Yh(Th());return e.copy=function(){return $h(e,t()).constant(e.constant())},bc.apply(e,arguments)}),zd),Vd(Md,(function(){return bc.apply(td($n,Tn,En,Mn,ln,on,nn,tn,Ke,Gr).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}),[zd,Ud]),Vd(Ad,(function(){return bc.apply(td(Fn,Sn,Dn,An,yn,an,rn,en,Ke,Xr).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)}),[zd,Ud]),Vd(Ed,rd,[zd,Ld]),Vd(`${Ed}-${_d}`,rd,[zd,Ld]),Vd(`${Ed}-${xd}`,(function t(){var e=Ih(ed()).domain([1,10]);return e.copy=function(){return nd(e,t()).base(e.base())},wc.apply(e,arguments)}),[zd,Ld,xd]),Vd(`${Ed}-${bd}`,id,[zd,Ld]),Vd(`${Ed}-${wd}`,(function(){return id.apply(null,arguments).exponent(.5)}),[zd,Ld]),Vd(`${Ed}-${kd}`,(function t(){var e=Yh(ed());return e.copy=function(){return nd(e,t()).constant(e.constant())},wc.apply(e,arguments)}),[zd,Ld]),Vd(`${Dd}-${_d}`,(function t(){var e=zh(od()(Dh));return e.copy=function(){return nd(e,t())},wc.apply(e,arguments)}),[zd,Ld]),Vd(`${Dd}-${xd}`,(function t(){var e=Ih(od()).domain([.1,1,10]);return e.copy=function(){return nd(e,t()).base(e.base())},wc.apply(e,arguments)}),[zd,Ld,xd]),Vd(`${Dd}-${bd}`,ad,[zd,Ld]),Vd(`${Dd}-${wd}`,(function(){return ad.apply(null,arguments).exponent(.5)}),[zd,Ld]),Vd(`${Dd}-${kd}`,(function t(){var e=Yh(od());return e.copy=function(){return nd(e,t()).constant(e.constant())},wc.apply(e,arguments)}),[zd,Ld]),Vd(Cd,(function t(){var e,n=[],r=[],i=[];function o(){var t=0,e=Math.max(1,r.length);for(i=new Array(e-1);++t<e;)i[t-1]=ve(n,t/e);return a}function a(t){return null==t||isNaN(t=+t)?e:r[Jt(i,t)]}return a.invertExtent=function(t){var e=r.indexOf(t);return e<0?[NaN,NaN]:[e>0?i[e-1]:n[0],e<i.length?i[e]:n[n.length-1]]},a.domain=function(t){if(!arguments.length)return n.slice();n=[];for(let e of t)null==e||isNaN(e=+e)||n.push(e);return n.sort(Wt),o()},a.range=function(t){return arguments.length?(r=Array.from(t),o()):r.slice()},a.unknown=function(t){return arguments.length?(e=t,a):e},a.quantiles=function(){return i.slice()},a.copy=function(){return t().domain(n).range(r).unknown(e)},bc.apply(a,arguments)}),[Rd,Cd]),Vd(Fd,(function t(){var e,n=0,r=1,i=1,o=[.5],a=[0,1];function s(t){return null!=t&&t<=t?a[Jt(o,t,0,i)]:e}function u(){var t=-1;for(o=new Array(i);++t<i;)o[t]=((t+1)*r-(t-i)*n)/(i+1);return s}return s.domain=function(t){return arguments.length?([n,r]=t,n=+n,r=+r,u()):[n,r]},s.range=function(t){return arguments.length?(i=(a=Array.from(t)).length-1,u()):a.slice()},s.invertExtent=function(t){var e=a.indexOf(t);return e<0?[NaN,NaN]:e<1?[n,o[0]]:e>=i?[o[i-1],r]:[o[e-1],o[e]]},s.unknown=function(t){return arguments.length?(e=t,s):s},s.thresholds=function(){return o.slice()},s.copy=function(){return t().domain([n,r]).range(a).unknown(e)},bc.apply(zh(s),arguments)}),Rd),Vd(Sd,(function t(){var e,n=[.5],r=[0,1],i=1;function o(t){return null!=t&&t<=t?r[Jt(n,t,0,i)]:e}return o.domain=function(t){return arguments.length?(n=Array.from(t),i=Math.min(n.length,r.length-1),o):n.slice()},o.range=function(t){return arguments.length?(r=Array.from(t),i=Math.min(n.length,r.length-1),o):r.slice()},o.invertExtent=function(t){var e=r.indexOf(t);return[n[e-1],n[e]]},o.unknown=function(t){return arguments.length?(e=t,o):e},o.copy=function(){return t().domain(n).range(r).unknown(e)},bc.apply(o,arguments)}),Rd),Vd(Nd,(function t(){let e=[],n=[];function r(t){return null==t||t!=t?void 0:n[(Jt(e,t)-1)%n.length]}return r.domain=function(t){return arguments.length?(e=function(t){return jd.call(t,E)}(t),r):e.slice()},r.range=function(t){return arguments.length?(n=Id.call(t),r):n.slice()},r.tickFormat=function(t,n){return Nh(e[0],A(e),null==t?10:t,n)},r.copy=function(){return t().domain(r.domain()).range(r.range())},r}),[Od,Rd]),Vd($d,Mc,Od),Vd(Bd,qd,Od),Vd(Td,(function(){return Pd(qd().paddingInner(1))}),Od);const rp=["clamp","base","constant","exponent"];function ip(t,e){const n=e[0],r=A(e)-n;return function(e){return t(n+e*r)}}function op(t,e,n){return kh(up(e||"rgb",n),t)}function ap(t,e){const n=new Array(e),r=e+1;for(let i=0;i<e;)n[i]=t(++i/r);return n}function sp(t,e,n){const r=n-e;let i,o,a;return r&&Number.isFinite(r)?(i=(o=t.type).indexOf("-"),o=i<0?o:o.slice(i+1),a=Vd(o)().domain([e,n]).range([0,1]),rp.forEach((e=>t[e]?a[e](t[e]()):0)),a):Q(.5)}function up(t,e){const n=Mh[function(t){return"interpolate"+t.toLowerCase().split("-").map((t=>t[0].toUpperCase()+t.slice(1))).join("")}(t)];return null!=e&&n&&n.gamma?n.gamma(e):n}function lp(t){if(_(t))return t;const e=t.length/6|0,n=new Array(e);for(let r=0;r<e;)n[r]="#"+t.slice(6*r,6*++r);return n}function cp(t,e){for(const n in t)hp(n,e(t[n]))}const fp={};function hp(t,e){return t=t&&t.toLowerCase(),arguments.length>1?(fp[t]=e,this):fp[t]}cp({accent:ld,category10:ud,category20:"1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",category20b:"393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",category20c:"3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",dark2:cd,observable10:fd,paired:hd,pastel1:dd,pastel2:pd,set1:gd,set2:md,set3:yd,tableau10:"4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",tableau20:"4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5"},lp),cp({blues:"cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",greens:"d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",greys:"e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",oranges:"fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",purples:"e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",reds:"fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",blueGreen:"d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",bluePurple:"ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",greenBlue:"d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",orangeRed:"fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",purpleBlue:"dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",purpleBlueGreen:"dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",purpleRed:"dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",redPurple:"fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",yellowGreen:"e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",yellowOrangeBrown:"feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",yellowOrangeRed:"fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",blueOrange:"134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",brownBlueGreen:"704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",purpleGreen:"5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",purpleOrange:"4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",redBlue:"8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",redGrey:"8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",yellowGreenBlue:"eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",redYellowBlue:"a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",redYellowGreen:"a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",pinkYellowGreen:"8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",spectral:"9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",viridis:"440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",magma:"0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",inferno:"0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",plasma:"0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",cividis:"00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",rainbow:"6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",sinebow:"ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",turbo:"23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",browns:"eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",tealBlues:"bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",teals:"bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",warmGreys:"dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",goldGreen:"f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",goldOrange:"f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",goldRed:"f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",lightGreyRed:"efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",lightGreyTeal:"e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",lightMulti:"e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",lightOrange:"f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",lightTealBlue:"e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",darkBlue:"3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",darkGold:"3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",darkGreen:"3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",darkMulti:"3737371f5287197d8c29a86995ce3fffe800ffffff",darkRed:"3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c"},(t=>op(lp(t))));const dp="symbol",pp=t=>_(t)?t.map((t=>String(t))):String(t),gp=(t,e)=>t[1]-e[1],mp=(t,e)=>e[1]-t[1];function yp(t,e,n){let r;return ht(e)&&(t.bins&&(e=Math.max(e,t.bins.length)),null!=n&&(e=Math.min(e,Math.floor(bt(t.domain())/n||1)+1))),x(e)&&(r=e.step,e=e.interval),pt(e)&&(e=t.type===Md?_r(e):t.type==Ad?xr(e):s("Only time and utc scales accept interval strings."),r&&(e=e.every(r))),e}function vp(t,e,n){let r=t.range(),i=r[0],o=A(r),a=gp;if(i>o&&(r=o,o=i,i=r,a=mp),i=Math.floor(i),o=Math.ceil(o),e=e.map((e=>[e,t(e)])).filter((t=>i<=t[1]&&t[1]<=o)).sort(a).map((t=>t[0])),n>0&&e.length>1){const t=[e[0],A(e)];for(;e.length>n&&e.length>=3;)e=e.filter(((t,e)=>!(e%2)));e.length<3&&(e=t)}return e}function _p(t,e){return t.bins?vp(t,t.bins,e):t.ticks?t.ticks(e):t.domain()}function xp(t,e,n,r,i,o){const a=e.type;let s=pp;if(a===Md||i===Md)s=t.timeFormat(r);else if(a===Ad||i===Ad)s=t.utcFormat(r);else if(tp(a)){const i=t.formatFloat(r);if(o||e.bins)s=i;else{const t=bp(e,n,!1);s=e=>t(e)?i(e):""}}else if(e.tickFormat){const i=e.domain();s=t.formatSpan(i[0],i[i.length-1],n,r)}else r&&(s=t.format(r));return s}function bp(t,e,n){const r=_p(t,e),i=t.base(),o=Math.log(i),a=Math.max(1,i*e/r.length),s=t=>{let e=t/Math.pow(i,Math.round(Math.log(t)/o));return e*i<i-.5&&(e*=i),e<=a};return n?r.filter(s):s}const wp={[Cd]:"quantiles",[Fd]:"thresholds",[Sd]:"domain"},kp={[Cd]:"quantiles",[Fd]:"domain"};function Mp(t,e){return t.bins?function(t){const e=t.slice(0,-1);return e.max=A(t),e}(t.bins):t.type===xd?bp(t,e,!0):wp[t.type]?function(t){const e=[-1/0].concat(t);return e.max=1/0,e}(t[wp[t.type]]()):_p(t,e)}function Ap(t,e,n,r,i,o,a){const s=kp[e.type]&&o!==Md&&o!==Ad?function(t,e,n){const r=e[kp[e.type]](),i=r.length;let o,a=i>1?r[1]-r[0]:r[0];for(o=1;o<i;++o)a=Math.min(a,r[o]-r[o-1]);return t.formatSpan(0,a,30,n)}(t,e,i):xp(t,e,n,i,o,a);return r===dp&&(t=>wp[t.type]||t.bins)(e)?Ep(s):"discrete"===r?Cp(s):Fp(s)}const Ep=t=>(e,n,r)=>{const i=Dp(r[n+1],Dp(r.max,1/0)),o=Sp(e,t),a=Sp(i,t);return o&&a?o+" – "+a:a?"< "+a:"≥ "+o},Dp=(t,e)=>null!=t?t:e,Cp=t=>(e,n)=>n?t(e):null,Fp=t=>e=>t(e),Sp=(t,e)=>Number.isFinite(t)?e(t):null;function $p(t,e,n,r){const i=r||e.type;return pt(n)&&function(t){return Jd(t,Ud)}(i)&&(n=n.replace(/%a/g,"%A").replace(/%b/g,"%B")),n||i!==Md?n||i!==Ad?Ap(t,e,5,null,n,r,!0):t.utcFormat("%A, %d %B %Y, %X UTC"):t.timeFormat("%A, %d %B %Y, %X")}function Tp(t,e,n){n=n||{};const r=Math.max(3,n.maxlen||7),i=$p(t,e,n.format,n.formatType);if(Kd(e.type)){const t=Mp(e).slice(1).map(i),n=t.length;return`${n} boundar${1===n?"y":"ies"}: ${t.join(", ")}`}if(Qd(e.type)){const t=e.domain(),n=t.length;return`${n} value${1===n?"":"s"}: ${n>r?t.slice(0,r-2).map(i).join(", ")+", ending with "+t.slice(-1).map(i):t.map(i).join(", ")}`}{const t=e.domain();return`values from ${i(t[0])} to ${i(A(t))}`}}let Bp=0;const Np="p_";function zp(t){return t&&t.gradient}function Op(t,e,n){const r=t.gradient;let i=t.id,o="radial"===r?Np:"";return i||(i=t.id="gradient_"+Bp++,"radial"===r?(t.x1=Rp(t.x1,.5),t.y1=Rp(t.y1,.5),t.r1=Rp(t.r1,0),t.x2=Rp(t.x2,.5),t.y2=Rp(t.y2,.5),t.r2=Rp(t.r2,.5),o=Np):(t.x1=Rp(t.x1,0),t.y1=Rp(t.y1,0),t.x2=Rp(t.x2,1),t.y2=Rp(t.y2,0))),e[i]=t,"url("+(n||"")+"#"+o+i+")"}function Rp(t,e){return null!=t?t:e}function Lp(t,e){var n,r=[];return n={gradient:"linear",x1:t?t[0]:0,y1:t?t[1]:0,x2:e?e[0]:1,y2:e?e[1]:0,stops:r,stop:function(t,e){return r.push({offset:t,color:e}),n}}}const Up={basis:{curve:function(t){return new Il(t)}},"basis-closed":{curve:function(t){return new Wl(t)}},"basis-open":{curve:function(t){return new Hl(t)}},bundle:{curve:Gl,tension:"beta",value:.85},cardinal:{curve:Jl,tension:"tension",value:0},"cardinal-open":{curve:tc,tension:"tension",value:0},"cardinal-closed":{curve:Ql,tension:"tension",value:0},"catmull-rom":{curve:rc,tension:"alpha",value:.5},"catmull-rom-closed":{curve:oc,tension:"alpha",value:.5},"catmull-rom-open":{curve:sc,tension:"alpha",value:.5},linear:{curve:zl},"linear-closed":{curve:function(t){return new uc(t)}},monotone:{horizontal:function(t){return new pc(t)},vertical:function(t){return new dc(t)}},natural:{curve:function(t){return new mc(t)}},step:{curve:function(t){return new vc(t,.5)}},"step-after":{curve:function(t){return new vc(t,1)}},"step-before":{curve:function(t){return new vc(t,0)}}};function qp(t,e,n){var r=rt(Up,t)&&Up[t],i=null;return r&&(i=r.curve||r[e||"vertical"],r.tension&&null!=n&&(i=i[r.tension](n))),i}const Pp={m:2,l:2,h:1,v:1,z:0,c:6,s:4,q:4,t:2,a:7},jp=/[mlhvzcsqta]([^mlhvzcsqta]+|$)/gi,Ip=/^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/,Wp=/^((\s+,?\s*)|(,\s*))/,Hp=/^[01]/;function Yp(t){const e=[];return(t.match(jp)||[]).forEach((t=>{let n=t[0];const r=n.toLowerCase(),i=Pp[r],o=function(t,e,n){const r=[];for(let i=0;e&&i<n.length;)for(let o=0;o<e;++o){const e="a"!==t||3!==o&&4!==o?Ip:Hp,a=n.slice(i).match(e);if(null===a)throw Error("Invalid SVG path, incorrect parameter type");i+=a[0].length,r.push(+a[0]);const s=n.slice(i).match(Wp);null!==s&&(i+=s[0].length)}return r}(r,i,t.slice(1).trim()),a=o.length;if(a<i||a&&a%i!=0)throw Error("Invalid SVG path, incorrect parameter count");if(e.push([n,...o.slice(0,i)]),a!==i){"m"===r&&(n="M"===n?"L":"l");for(let t=i;t<a;t+=i)e.push([n,...o.slice(t,t+i)])}})),e}const Gp=Math.PI/180,Vp=Math.PI/2,Xp=2*Math.PI,Jp=Math.sqrt(3)/2;var Zp={},Qp={},Kp=[].join;function tg(t){const e=Kp.call(t);if(Qp[e])return Qp[e];var n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],s=t[5],u=t[6],l=t[7];const c=l*a,f=-u*s,h=u*a,d=l*s,p=Math.cos(i),g=Math.sin(i),m=Math.cos(o),y=Math.sin(o),v=.5*(o-i),_=Math.sin(.5*v),x=8/3*_*_/Math.sin(v),b=n+p-x*g,w=r+g+x*p,k=n+m,M=r+y,A=k+x*y,E=M-x*m;return Qp[e]=[c*b+f*w,h*b+d*w,c*A+f*E,h*A+d*E,c*k+f*M,h*k+d*M]}const eg=["l",0,0,0,0,0,0,0];function ng(t,e,n){const r=eg[0]=t[0];if("a"===r||"A"===r)eg[1]=e*t[1],eg[2]=n*t[2],eg[3]=t[3],eg[4]=t[4],eg[5]=t[5],eg[6]=e*t[6],eg[7]=n*t[7];else if("h"===r||"H"===r)eg[1]=e*t[1];else if("v"===r||"V"===r)eg[1]=n*t[1];else for(var i=1,o=t.length;i<o;++i)eg[i]=(i%2==1?e:n)*t[i];return eg}function rg(t,e,n,r,i,o){var a,s,u,l,c,f=null,h=0,d=0,p=0,g=0,m=0,y=0;null==n&&(n=0),null==r&&(r=0),null==i&&(i=1),null==o&&(o=i),t.beginPath&&t.beginPath();for(var v=0,_=e.length;v<_;++v){switch(a=e[v],1===i&&1===o||(a=ng(a,i,o)),a[0]){case"l":h+=a[1],d+=a[2],t.lineTo(h+n,d+r);break;case"L":h=a[1],d=a[2],t.lineTo(h+n,d+r);break;case"h":h+=a[1],t.lineTo(h+n,d+r);break;case"H":h=a[1],t.lineTo(h+n,d+r);break;case"v":d+=a[1],t.lineTo(h+n,d+r);break;case"V":d=a[1],t.lineTo(h+n,d+r);break;case"m":m=h+=a[1],y=d+=a[2],t.moveTo(h+n,d+r);break;case"M":m=h=a[1],y=d=a[2],t.moveTo(h+n,d+r);break;case"c":s=h+a[5],u=d+a[6],p=h+a[3],g=d+a[4],t.bezierCurveTo(h+a[1]+n,d+a[2]+r,p+n,g+r,s+n,u+r),h=s,d=u;break;case"C":h=a[5],d=a[6],p=a[3],g=a[4],t.bezierCurveTo(a[1]+n,a[2]+r,p+n,g+r,h+n,d+r);break;case"s":s=h+a[3],u=d+a[4],p=2*h-p,g=2*d-g,t.bezierCurveTo(p+n,g+r,h+a[1]+n,d+a[2]+r,s+n,u+r),p=h+a[1],g=d+a[2],h=s,d=u;break;case"S":s=a[3],u=a[4],p=2*h-p,g=2*d-g,t.bezierCurveTo(p+n,g+r,a[1]+n,a[2]+r,s+n,u+r),h=s,d=u,p=a[1],g=a[2];break;case"q":s=h+a[3],u=d+a[4],p=h+a[1],g=d+a[2],t.quadraticCurveTo(p+n,g+r,s+n,u+r),h=s,d=u;break;case"Q":s=a[3],u=a[4],t.quadraticCurveTo(a[1]+n,a[2]+r,s+n,u+r),h=s,d=u,p=a[1],g=a[2];break;case"t":s=h+a[1],u=d+a[2],null===f[0].match(/[QqTt]/)?(p=h,g=d):"t"===f[0]?(p=2*h-l,g=2*d-c):"q"===f[0]&&(p=2*h-p,g=2*d-g),l=p,c=g,t.quadraticCurveTo(p+n,g+r,s+n,u+r),d=u,p=(h=s)+a[1],g=d+a[2];break;case"T":s=a[1],u=a[2],p=2*h-p,g=2*d-g,t.quadraticCurveTo(p+n,g+r,s+n,u+r),h=s,d=u;break;case"a":ig(t,h+n,d+r,[a[1],a[2],a[3],a[4],a[5],a[6]+h+n,a[7]+d+r]),h+=a[6],d+=a[7];break;case"A":ig(t,h+n,d+r,[a[1],a[2],a[3],a[4],a[5],a[6]+n,a[7]+r]),h=a[6],d=a[7];break;case"z":case"Z":h=m,d=y,t.closePath()}f=a}}function ig(t,e,n,r){const i=function(t,e,n,r,i,o,a,s,u){const l=Kp.call(arguments);if(Zp[l])return Zp[l];const c=a*Gp,f=Math.sin(c),h=Math.cos(c),d=h*(s-t)*.5+f*(u-e)*.5,p=h*(u-e)*.5-f*(s-t)*.5;let g=d*d/((n=Math.abs(n))*n)+p*p/((r=Math.abs(r))*r);g>1&&(g=Math.sqrt(g),n*=g,r*=g);const m=h/n,y=f/n,v=-f/r,_=h/r,x=m*s+y*u,b=v*s+_*u,w=m*t+y*e,k=v*t+_*e;let M=1/((w-x)*(w-x)+(k-b)*(k-b))-.25;M<0&&(M=0);let A=Math.sqrt(M);o==i&&(A=-A);const E=.5*(x+w)-A*(k-b),D=.5*(b+k)+A*(w-x),C=Math.atan2(b-D,x-E);let F=Math.atan2(k-D,w-E)-C;F<0&&1===o?F+=Xp:F>0&&0===o&&(F-=Xp);const S=Math.ceil(Math.abs(F/(Vp+.001))),$=[];for(let t=0;t<S;++t){const e=C+t*F/S,i=C+(t+1)*F/S;$[t]=[E,D,e,i,n,r,f,h]}return Zp[l]=$}(r[5],r[6],r[0],r[1],r[3],r[4],r[2],e,n);for(let e=0;e<i.length;++e){const n=tg(i[e]);t.bezierCurveTo(n[0],n[1],n[2],n[3],n[4],n[5])}}const og=.5773502691896257,ag={circle:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(n,0),t.arc(0,0,n,0,Xp)}},cross:{draw:function(t,e){var n=Math.sqrt(e)/2,r=n/2.5;t.moveTo(-n,-r),t.lineTo(-n,r),t.lineTo(-r,r),t.lineTo(-r,n),t.lineTo(r,n),t.lineTo(r,r),t.lineTo(n,r),t.lineTo(n,-r),t.lineTo(r,-r),t.lineTo(r,-n),t.lineTo(-r,-n),t.lineTo(-r,-r),t.closePath()}},diamond:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(-n,0),t.lineTo(0,-n),t.lineTo(n,0),t.lineTo(0,n),t.closePath()}},square:{draw:function(t,e){var n=Math.sqrt(e),r=-n/2;t.rect(r,r,n,n)}},arrow:{draw:function(t,e){var n=Math.sqrt(e)/2,r=n/7,i=n/2.5,o=n/8;t.moveTo(-r,n),t.lineTo(r,n),t.lineTo(r,-o),t.lineTo(i,-o),t.lineTo(0,-n),t.lineTo(-i,-o),t.lineTo(-r,-o),t.closePath()}},wedge:{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n,i=r-n*og,o=n/4;t.moveTo(0,-r-i),t.lineTo(-o,r-i),t.lineTo(o,r-i),t.closePath()}},triangle:{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n,i=r-n*og;t.moveTo(0,-r-i),t.lineTo(-n,r-i),t.lineTo(n,r-i),t.closePath()}},"triangle-up":{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n;t.moveTo(0,-r),t.lineTo(-n,r),t.lineTo(n,r),t.closePath()}},"triangle-down":{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n;t.moveTo(0,r),t.lineTo(-n,-r),t.lineTo(n,-r),t.closePath()}},"triangle-right":{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n;t.moveTo(r,0),t.lineTo(-r,-n),t.lineTo(-r,n),t.closePath()}},"triangle-left":{draw:function(t,e){var n=Math.sqrt(e)/2,r=Jp*n;t.moveTo(-r,0),t.lineTo(r,-n),t.lineTo(r,n),t.closePath()}},stroke:{draw:function(t,e){const n=Math.sqrt(e)/2;t.moveTo(-n,0),t.lineTo(n,0)}}};function sg(t){return rt(ag,t)?ag[t]:function(t){if(!rt(ug,t)){const e=Yp(t);ug[t]={draw:function(t,n){rg(t,e,0,0,Math.sqrt(n)/2)}}}return ug[t]}(t)}var ug={};const lg=.448084975506;function cg(t){return t.x}function fg(t){return t.y}function hg(t){return t.width}function dg(t){return t.height}function pg(t){return"function"==typeof t?t:()=>+t}function gg(t,e,n){return Math.max(e,Math.min(t,n))}function mg(){var t=cg,e=fg,n=hg,r=dg,i=pg(0),o=i,a=i,s=i,u=null;function l(l,c,f){var h,d=null!=c?c:+t.call(this,l),p=null!=f?f:+e.call(this,l),g=+n.call(this,l),m=+r.call(this,l),y=Math.min(g,m)/2,v=gg(+i.call(this,l),0,y),_=gg(+o.call(this,l),0,y),x=gg(+a.call(this,l),0,y),b=gg(+s.call(this,l),0,y);if(u||(u=h=Al()),v<=0&&_<=0&&x<=0&&b<=0)u.rect(d,p,g,m);else{var w=d+g,k=p+m;u.moveTo(d+v,p),u.lineTo(w-_,p),u.bezierCurveTo(w-lg*_,p,w,p+lg*_,w,p+_),u.lineTo(w,k-b),u.bezierCurveTo(w,k-lg*b,w-lg*b,k,w-b,k),u.lineTo(d+x,k),u.bezierCurveTo(d+lg*x,k,d,k-lg*x,d,k-x),u.lineTo(d,p+v),u.bezierCurveTo(d,p+lg*v,d+lg*v,p,d+v,p),u.closePath()}if(h)return u=null,h+""||null}return l.x=function(e){return arguments.length?(t=pg(e),l):t},l.y=function(t){return arguments.length?(e=pg(t),l):e},l.width=function(t){return arguments.length?(n=pg(t),l):n},l.height=function(t){return arguments.length?(r=pg(t),l):r},l.cornerRadius=function(t,e,n,r){return arguments.length?(i=pg(t),o=null!=e?pg(e):i,s=null!=n?pg(n):i,a=null!=r?pg(r):o,l):i},l.context=function(t){return arguments.length?(u=null==t?null:t,l):u},l}function yg(){var t,e,n,r,i,o,a,s,u=null;function l(t,e,n){const r=n/2;if(i){var l=a-e,c=t-o;if(l||c){var f=Math.hypot(l,c),h=(l/=f)*s,d=(c/=f)*s,p=Math.atan2(c,l);u.moveTo(o-h,a-d),u.lineTo(t-l*r,e-c*r),u.arc(t,e,r,p-Math.PI,p),u.lineTo(o+h,a+d),u.arc(o,a,s,p,p+Math.PI)}else u.arc(t,e,r,0,Xp);u.closePath()}else i=1;o=t,a=e,s=r}function c(o){var a,s,c,f=o.length,h=!1;for(null==u&&(u=c=Al()),a=0;a<=f;++a)!(a<f&&r(s=o[a],a,o))===h&&(h=!h)&&(i=0),h&&l(+t(s,a,o),+e(s,a,o),+n(s,a,o));if(c)return u=null,c+""||null}return c.x=function(e){return arguments.length?(t=e,c):t},c.y=function(t){return arguments.length?(e=t,c):e},c.size=function(t){return arguments.length?(n=t,c):n},c.defined=function(t){return arguments.length?(r=t,c):r},c.context=function(t){return arguments.length?(u=null==t?null:t,c):u},c}function vg(t,e){return null!=t?t:e}const _g=t=>t.x||0,xg=t=>t.y||0,bg=t=>!(!1===t.defined),wg=function(){var t=Dl,e=Cl,n=al(0),r=null,i=Fl,o=Sl,a=$l,s=null,u=El(l);function l(){var l,c,f=+t.apply(this,arguments),h=+e.apply(this,arguments),d=i.apply(this,arguments)-ml,p=o.apply(this,arguments)-ml,g=sl(p-d),m=p>d;if(s||(s=l=u()),h<f&&(c=h,h=f,f=c),h>pl)if(g>yl-pl)s.moveTo(h*ll(d),h*hl(d)),s.arc(0,0,h,d,p,!m),f>pl&&(s.moveTo(f*ll(p),f*hl(p)),s.arc(0,0,f,p,d,m));else{var y,v,_=d,x=p,b=d,w=p,k=g,M=g,A=a.apply(this,arguments)/2,E=A>pl&&(r?+r.apply(this,arguments):dl(f*f+h*h)),D=fl(sl(h-f)/2,+n.apply(this,arguments)),C=D,F=D;if(E>pl){var S=vl(E/f*hl(A)),$=vl(E/h*hl(A));(k-=2*S)>pl?(b+=S*=m?1:-1,w-=S):(k=0,b=w=(d+p)/2),(M-=2*$)>pl?(_+=$*=m?1:-1,x-=$):(M=0,_=x=(d+p)/2)}var T=h*ll(_),B=h*hl(_),N=f*ll(w),z=f*hl(w);if(D>pl){var O,R=h*ll(x),L=h*hl(x),U=f*ll(b),q=f*hl(b);if(g<gl)if(O=function(t,e,n,r,i,o,a,s){var u=n-t,l=r-e,c=a-i,f=s-o,h=f*u-c*l;if(!(h*h<pl))return[t+(h=(c*(e-o)-f*(t-i))/h)*u,e+h*l]}(T,B,U,q,R,L,N,z)){var P=T-O[0],j=B-O[1],I=R-O[0],W=L-O[1],H=1/hl(function(t){return t>1?0:t<-1?gl:Math.acos(t)}((P*I+j*W)/(dl(P*P+j*j)*dl(I*I+W*W)))/2),Y=dl(O[0]*O[0]+O[1]*O[1]);C=fl(D,(f-Y)/(H-1)),F=fl(D,(h-Y)/(H+1))}else C=F=0}M>pl?F>pl?(y=Tl(U,q,T,B,h,F,m),v=Tl(R,L,N,z,h,F,m),s.moveTo(y.cx+y.x01,y.cy+y.y01),F<D?s.arc(y.cx,y.cy,F,ul(y.y01,y.x01),ul(v.y01,v.x01),!m):(s.arc(y.cx,y.cy,F,ul(y.y01,y.x01),ul(y.y11,y.x11),!m),s.arc(0,0,h,ul(y.cy+y.y11,y.cx+y.x11),ul(v.cy+v.y11,v.cx+v.x11),!m),s.arc(v.cx,v.cy,F,ul(v.y11,v.x11),ul(v.y01,v.x01),!m))):(s.moveTo(T,B),s.arc(0,0,h,_,x,!m)):s.moveTo(T,B),f>pl&&k>pl?C>pl?(y=Tl(N,z,R,L,f,-C,m),v=Tl(T,B,U,q,f,-C,m),s.lineTo(y.cx+y.x01,y.cy+y.y01),C<D?s.arc(y.cx,y.cy,C,ul(y.y01,y.x01),ul(v.y01,v.x01),!m):(s.arc(y.cx,y.cy,C,ul(y.y01,y.x01),ul(y.y11,y.x11),!m),s.arc(0,0,f,ul(y.cy+y.y11,y.cx+y.x11),ul(v.cy+v.y11,v.cx+v.x11),m),s.arc(v.cx,v.cy,C,ul(v.y11,v.x11),ul(v.y01,v.x01),!m))):s.arc(0,0,f,w,b,m):s.lineTo(N,z)}else s.moveTo(0,0);if(s.closePath(),l)return s=null,l+""||null}return l.centroid=function(){var n=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,r=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-gl/2;return[ll(r)*n,hl(r)*n]},l.innerRadius=function(e){return arguments.length?(t="function"==typeof e?e:al(+e),l):t},l.outerRadius=function(t){return arguments.length?(e="function"==typeof t?t:al(+t),l):e},l.cornerRadius=function(t){return arguments.length?(n="function"==typeof t?t:al(+t),l):n},l.padRadius=function(t){return arguments.length?(r=null==t?null:"function"==typeof t?t:al(+t),l):r},l.startAngle=function(t){return arguments.length?(i="function"==typeof t?t:al(+t),l):i},l.endAngle=function(t){return arguments.length?(o="function"==typeof t?t:al(+t),l):o},l.padAngle=function(t){return arguments.length?(a="function"==typeof t?t:al(+t),l):a},l.context=function(t){return arguments.length?(s=null==t?null:t,l):s},l}().startAngle((t=>t.startAngle||0)).endAngle((t=>t.endAngle||0)).padAngle((t=>t.padAngle||0)).innerRadius((t=>t.innerRadius||0)).outerRadius((t=>t.outerRadius||0)).cornerRadius((t=>t.cornerRadius||0)),kg=Ul().x(_g).y1(xg).y0((t=>(t.y||0)+(t.height||0))).defined(bg),Mg=Ul().y(xg).x1(_g).x0((t=>(t.x||0)+(t.width||0))).defined(bg),Ag=Ll().x(_g).y(xg).defined(bg),Eg=mg().x(_g).y(xg).width((t=>t.width||0)).height((t=>t.height||0)).cornerRadius((t=>vg(t.cornerRadiusTopLeft,t.cornerRadius)||0),(t=>vg(t.cornerRadiusTopRight,t.cornerRadius)||0),(t=>vg(t.cornerRadiusBottomRight,t.cornerRadius)||0),(t=>vg(t.cornerRadiusBottomLeft,t.cornerRadius)||0)),Dg=function(t,e){let n=null,r=El(i);function i(){let i;if(n||(n=i=r()),t.apply(this,arguments).draw(n,+e.apply(this,arguments)),i)return n=null,i+""||null}return t="function"==typeof t?t:al(t||ql),e="function"==typeof e?e:al(void 0===e?64:+e),i.type=function(e){return arguments.length?(t="function"==typeof e?e:al(e),i):t},i.size=function(t){return arguments.length?(e="function"==typeof t?t:al(+t),i):e},i.context=function(t){return arguments.length?(n=null==t?null:t,i):n},i}().type((t=>sg(t.shape||"circle"))).size((t=>vg(t.size,64))),Cg=yg().x(_g).y(xg).defined(bg).size((t=>t.size||1));function Fg(t){return t.cornerRadius||t.cornerRadiusTopLeft||t.cornerRadiusTopRight||t.cornerRadiusBottomRight||t.cornerRadiusBottomLeft}function Sg(t,e,n,r){return Eg.context(t)(e,n,r)}var $g=1;function Tg(t,e,n){var r=e.clip,i=t._defs,o=e.clip_id||(e.clip_id="clip"+$g++),a=i.clipping[o]||(i.clipping[o]={id:o});return Y(r)?a.path=r(null):Fg(n)?a.path=Sg(null,n,0,0):(a.width=n.width||0,a.height=n.height||0),"url(#"+o+")"}function Bg(t){this.clear(),t&&this.union(t)}function Ng(t){this.mark=t,this.bounds=this.bounds||new Bg}function zg(t){Ng.call(this,t),this.items=this.items||[]}Bg.prototype={clone(){return new Bg(this)},clear(){return this.x1=+Number.MAX_VALUE,this.y1=+Number.MAX_VALUE,this.x2=-Number.MAX_VALUE,this.y2=-Number.MAX_VALUE,this},empty(){return this.x1===+Number.MAX_VALUE&&this.y1===+Number.MAX_VALUE&&this.x2===-Number.MAX_VALUE&&this.y2===-Number.MAX_VALUE},equals(t){return this.x1===t.x1&&this.y1===t.y1&&this.x2===t.x2&&this.y2===t.y2},set(t,e,n,r){return n<t?(this.x2=t,this.x1=n):(this.x1=t,this.x2=n),r<e?(this.y2=e,this.y1=r):(this.y1=e,this.y2=r),this},add(t,e){return t<this.x1&&(this.x1=t),e<this.y1&&(this.y1=e),t>this.x2&&(this.x2=t),e>this.y2&&(this.y2=e),this},expand(t){return this.x1-=t,this.y1-=t,this.x2+=t,this.y2+=t,this},round(){return this.x1=Math.floor(this.x1),this.y1=Math.floor(this.y1),this.x2=Math.ceil(this.x2),this.y2=Math.ceil(this.y2),this},scale(t){return this.x1*=t,this.y1*=t,this.x2*=t,this.y2*=t,this},translate(t,e){return this.x1+=t,this.x2+=t,this.y1+=e,this.y2+=e,this},rotate(t,e,n){const r=this.rotatedPoints(t,e,n);return this.clear().add(r[0],r[1]).add(r[2],r[3]).add(r[4],r[5]).add(r[6],r[7])},rotatedPoints(t,e,n){var{x1:r,y1:i,x2:o,y2:a}=this,s=Math.cos(t),u=Math.sin(t),l=e-e*s+n*u,c=n-e*u-n*s;return[s*r-u*i+l,u*r+s*i+c,s*r-u*a+l,u*r+s*a+c,s*o-u*i+l,u*o+s*i+c,s*o-u*a+l,u*o+s*a+c]},union(t){return t.x1<this.x1&&(this.x1=t.x1),t.y1<this.y1&&(this.y1=t.y1),t.x2>this.x2&&(this.x2=t.x2),t.y2>this.y2&&(this.y2=t.y2),this},intersect(t){return t.x1>this.x1&&(this.x1=t.x1),t.y1>this.y1&&(this.y1=t.y1),t.x2<this.x2&&(this.x2=t.x2),t.y2<this.y2&&(this.y2=t.y2),this},encloses(t){return t&&this.x1<=t.x1&&this.x2>=t.x2&&this.y1<=t.y1&&this.y2>=t.y2},alignsWith(t){return t&&(this.x1==t.x1||this.x2==t.x2||this.y1==t.y1||this.y2==t.y2)},intersects(t){return t&&!(this.x2<t.x1||this.x1>t.x2||this.y2<t.y1||this.y1>t.y2)},contains(t,e){return!(t<this.x1||t>this.x2||e<this.y1||e>this.y2)},width(){return this.x2-this.x1},height(){return this.y2-this.y1}},st(zg,Ng);class Og{constructor(t){this._pending=0,this._loader=t||Ko()}pending(){return this._pending}sanitizeURL(t){const e=this;return Rg(e),e._loader.sanitize(t,{context:"href"}).then((t=>(Lg(e),t))).catch((()=>(Lg(e),null)))}loadImage(t){const e=this,n=xc();return Rg(e),e._loader.sanitize(t,{context:"image"}).then((t=>{const r=t.href;if(!r||!n)throw{url:r};const i=new n,o=rt(t,"crossOrigin")?t.crossOrigin:"anonymous";return null!=o&&(i.crossOrigin=o),i.onload=()=>Lg(e),i.onerror=()=>Lg(e),i.src=r,i})).catch((t=>(Lg(e),{complete:!1,width:0,height:0,src:t&&t.url||""})))}ready(){const t=this;return new Promise((e=>{!function n(r){t.pending()?setTimeout((()=>{n(!0)}),10):e(r)}(!1)}))}}function Rg(t){t._pending+=1}function Lg(t){t._pending-=1}function Ug(t,e,n){if(e.stroke&&0!==e.opacity&&0!==e.strokeOpacity){const r=null!=e.strokeWidth?+e.strokeWidth:1;t.expand(r+(n?function(t,e){return t.strokeJoin&&"miter"!==t.strokeJoin?0:e}(e,r):0))}return t}const qg=Xp-1e-8;let Pg,jg,Ig,Wg,Hg,Yg,Gg,Vg;const Xg=(t,e)=>Pg.add(t,e),Jg=(t,e)=>Xg(jg=t,Ig=e),Zg=t=>Xg(t,Pg.y1),Qg=t=>Xg(Pg.x1,t),Kg=(t,e)=>Hg*t+Gg*e,tm=(t,e)=>Yg*t+Vg*e,em=(t,e)=>Xg(Kg(t,e),tm(t,e)),nm=(t,e)=>Jg(Kg(t,e),tm(t,e));function rm(t,e){return Pg=t,e?(Wg=e*Gp,Hg=Vg=Math.cos(Wg),Yg=Math.sin(Wg),Gg=-Yg):(Hg=Vg=1,Wg=Yg=Gg=0),im}const im={beginPath(){},closePath(){},moveTo:nm,lineTo:nm,rect(t,e,n,r){Wg?(em(t+n,e),em(t+n,e+r),em(t,e+r),nm(t,e)):(Xg(t+n,e+r),Jg(t,e))},quadraticCurveTo(t,e,n,r){const i=Kg(t,e),o=tm(t,e),a=Kg(n,r),s=tm(n,r);om(jg,i,a,Zg),om(Ig,o,s,Qg),Jg(a,s)},bezierCurveTo(t,e,n,r,i,o){const a=Kg(t,e),s=tm(t,e),u=Kg(n,r),l=tm(n,r),c=Kg(i,o),f=tm(i,o);am(jg,a,u,c,Zg),am(Ig,s,l,f,Qg),Jg(c,f)},arc(t,e,n,r,i,o){if(r+=Wg,i+=Wg,jg=n*Math.cos(i)+t,Ig=n*Math.sin(i)+e,Math.abs(i-r)>qg)Xg(t-n,e-n),Xg(t+n,e+n);else{const a=r=>Xg(n*Math.cos(r)+t,n*Math.sin(r)+e);let s,u;if(a(r),a(i),i!==r)if((r%=Xp)<0&&(r+=Xp),(i%=Xp)<0&&(i+=Xp),i<r&&(o=!o,s=r,r=i,i=s),o)for(i-=Xp,s=r-r%Vp,u=0;u<4&&s>i;++u,s-=Vp)a(s);else for(s=r-r%Vp+Vp,u=0;u<4&&s<i;++u,s+=Vp)a(s)}}};function om(t,e,n,r){const i=(t-e)/(t+n-2*e);0<i&&i<1&&r(t+(e-t)*i)}function am(t,e,n,r,i){const o=r-t+3*e-3*n,a=t+n-2*e,s=t-e;let u,l=0,c=0;Math.abs(o)>1e-14?(u=a*a+s*o,u>=0&&(u=Math.sqrt(u),l=(-a+u)/o,c=(-a-u)/o)):l=.5*s/a,0<l&&l<1&&i(sm(l,t,e,n,r)),0<c&&c<1&&i(sm(c,t,e,n,r))}function sm(t,e,n,r,i){const o=1-t,a=o*o,s=t*t;return a*o*e+3*a*t*n+3*o*s*r+s*t*i}var um=(um=_c(1,1))?um.getContext("2d"):null;const lm=new Bg;function cm(t){return function(e,n){if(!um)return!0;t(um,e),lm.clear().union(e.bounds).intersect(n).round();const{x1:r,y1:i,x2:o,y2:a}=lm;for(let t=i;t<=a;++t)for(let e=r;e<=o;++e)if(um.isPointInPath(e,t))return!0;return!1}}function fm(t,e){return e.contains(t.x||0,t.y||0)}function hm(t,e){const n=t.x||0,r=t.y||0,i=t.width||0,o=t.height||0;return e.intersects(lm.set(n,r,n+i,r+o))}function dm(t,e){const n=t.x||0,r=t.y||0;return pm(e,n,r,null!=t.x2?t.x2:n,null!=t.y2?t.y2:r)}function pm(t,e,n,r,i){const{x1:o,y1:a,x2:s,y2:u}=t,l=r-e,c=i-n;let f,h,d,p,g=0,m=1;for(p=0;p<4;++p){if(0===p&&(f=-l,h=-(o-e)),1===p&&(f=l,h=s-e),2===p&&(f=-c,h=-(a-n)),3===p&&(f=c,h=u-n),Math.abs(f)<1e-10&&h<0)return!1;if(d=h/f,f<0){if(d>m)return!1;d>g&&(g=d)}else if(f>0){if(d<g)return!1;d<m&&(m=d)}}return!0}function gm(t,e){t.globalCompositeOperation=e.blend||"source-over"}function mm(t,e){return null==t?e:t}function ym(t,e){const n=e.length;for(let r=0;r<n;++r)t.addColorStop(e[r].offset,e[r].color);return t}function vm(t,e,n){return zp(n)?function(t,e,n){const r=n.width(),i=n.height();let o;if("radial"===e.gradient)o=t.createRadialGradient(n.x1+mm(e.x1,.5)*r,n.y1+mm(e.y1,.5)*i,Math.max(r,i)*mm(e.r1,0),n.x1+mm(e.x2,.5)*r,n.y1+mm(e.y2,.5)*i,Math.max(r,i)*mm(e.r2,.5));else{const a=mm(e.x1,0),s=mm(e.y1,0),u=mm(e.x2,1),l=mm(e.y2,0);if(a!==u&&s!==l&&r!==i){const n=_c(Math.ceil(r),Math.ceil(i)),o=n.getContext("2d");return o.scale(r,i),o.fillStyle=ym(o.createLinearGradient(a,s,u,l),e.stops),o.fillRect(0,0,r,i),t.createPattern(n,"no-repeat")}o=t.createLinearGradient(n.x1+a*r,n.y1+s*i,n.x1+u*r,n.y1+l*i)}return ym(o,e.stops)}(t,n,e.bounds):n}function _m(t,e,n){return(n*=null==e.fillOpacity?1:e.fillOpacity)>0&&(t.globalAlpha=n,t.fillStyle=vm(t,e,e.fill),!0)}var xm=[];function bm(t,e,n){var r=null!=(r=e.strokeWidth)?r:1;return!(r<=0)&&((n*=null==e.strokeOpacity?1:e.strokeOpacity)>0&&(t.globalAlpha=n,t.strokeStyle=vm(t,e,e.stroke),t.lineWidth=r,t.lineCap=e.strokeCap||"butt",t.lineJoin=e.strokeJoin||"miter",t.miterLimit=e.strokeMiterLimit||10,t.setLineDash&&(t.setLineDash(e.strokeDash||xm),t.lineDashOffset=e.strokeDashOffset||0),!0))}function wm(t,e){return t.zindex-e.zindex||t.index-e.index}function km(t){if(!t.zdirty)return t.zitems;var e,n,r,i=t.items,o=[];for(n=0,r=i.length;n<r;++n)(e=i[n]).index=n,e.zindex&&o.push(e);return t.zdirty=!1,t.zitems=o.sort(wm)}function Mm(t,e){var n,r,i=t.items;if(!i||!i.length)return;const o=km(t);if(o&&o.length){for(n=0,r=i.length;n<r;++n)i[n].zindex||e(i[n]);i=o}for(n=0,r=i.length;n<r;++n)e(i[n])}function Am(t,e){var n,r,i=t.items;if(!i||!i.length)return null;const o=km(t);for(o&&o.length&&(i=o),r=i.length;--r>=0;)if(n=e(i[r]))return n;if(i===o)for(r=(i=t.items).length;--r>=0;)if(!i[r].zindex&&(n=e(i[r])))return n;return null}function Em(t){return function(e,n,r){Mm(n,(n=>{r&&!r.intersects(n.bounds)||Cm(t,e,n,n)}))}}function Dm(t){return function(e,n,r){!n.items.length||r&&!r.intersects(n.bounds)||Cm(t,e,n.items[0],n.items)}}function Cm(t,e,n,r){var i=null==n.opacity?1:n.opacity;0!==i&&(t(e,r)||(gm(e,n),n.fill&&_m(e,n,i)&&e.fill(),n.stroke&&bm(e,n,i)&&e.stroke()))}function Fm(t){return t=t||p,function(e,n,r,i,o,a){return r*=e.pixelRatio,i*=e.pixelRatio,Am(n,(n=>{const s=n.bounds;if((!s||s.contains(o,a))&&s)return t(e,n,r,i,o,a)?n:void 0}))}}function Sm(t,e){return function(n,r,i,o){var a,s,u=Array.isArray(r)?r[0]:r,l=null==e?u.fill:e,c=u.stroke&&n.isPointInStroke;return c&&(a=u.strokeWidth,s=u.strokeCap,n.lineWidth=null!=a?a:1,n.lineCap=null!=s?s:"butt"),!t(n,r)&&(l&&n.isPointInPath(i,o)||c&&n.isPointInStroke(i,o))}}function $m(t){return Fm(Sm(t))}function Tm(t,e){return"translate("+t+","+e+")"}function Bm(t){return"rotate("+t+")"}function Nm(t){return Tm(t.x||0,t.y||0)}function zm(t,e,n){function r(t,n){var r=n.x||0,i=n.y||0,o=n.angle||0;t.translate(r,i),o&&t.rotate(o*=Gp),t.beginPath(),e(t,n),o&&t.rotate(-o),t.translate(-r,-i)}return{type:t,tag:"path",nested:!1,attr:function(t,n){t("transform",function(t){return Tm(t.x||0,t.y||0)+(t.angle?" "+Bm(t.angle):"")}(n)),t("d",e(null,n))},bound:function(t,n){return e(rm(t,n.angle),n),Ug(t,n).translate(n.x||0,n.y||0)},draw:Em(r),pick:$m(r),isect:n||cm(r)}}var Om=zm("arc",(function(t,e){return wg.context(t)(e)}));function Rm(t,e,n){function r(t,n){t.beginPath(),e(t,n)}const i=Sm(r);return{type:t,tag:"path",nested:!0,attr:function(t,n){var r=n.mark.items;r.length&&t("d",e(null,r))},bound:function(t,n){var r=n.items;return 0===r.length?t:(e(rm(t),r),Ug(t,r[0]))},draw:Dm(r),pick:function(t,e,n,r,o,a){var s=e.items,u=e.bounds;return!s||!s.length||u&&!u.contains(o,a)?null:(n*=t.pixelRatio,r*=t.pixelRatio,i(t,s,n,r)?s[0]:null)},isect:fm,tip:n}}var Lm=Rm("area",(function(t,e){const n=e[0],r=n.interpolate||"linear";return("horizontal"===n.orient?Mg:kg).curve(qp(r,n.orient,n.tension)).context(t)(e)}),(function(t,e){for(var n,r,i="horizontal"===t[0].orient?e[1]:e[0],o="horizontal"===t[0].orient?"y":"x",a=t.length,s=1/0;--a>=0;)!1!==t[a].defined&&(r=Math.abs(t[a][o]-i))<s&&(s=r,n=t[a]);return n}));function Um(t,e){t.beginPath(),Fg(e)?Sg(t,e,0,0):t.rect(0,0,e.width||0,e.height||0),t.clip()}function qm(t){const e=mm(t.strokeWidth,1);return null!=t.strokeOffset?t.strokeOffset:t.stroke&&e>.5&&e<1.5?.5-Math.abs(e-1):0}function Pm(t,e){const n=qm(e);t("d",Sg(null,e,n,n))}function jm(t,e,n,r){const i=qm(e);t.beginPath(),Sg(t,e,(n||0)+i,(r||0)+i)}const Im=Sm(jm),Wm=Sm(jm,!1),Hm=Sm(jm,!0);var Ym={type:"group",tag:"g",nested:!1,attr:function(t,e){t("transform",Nm(e))},bound:function(t,e){if(!e.clip&&e.items){const n=e.items,r=n.length;for(let e=0;e<r;++e)t.union(n[e].bounds)}return(e.clip||e.width||e.height)&&!e.noBound&&t.add(0,0).add(e.width||0,e.height||0),Ug(t,e),t.translate(e.x||0,e.y||0)},draw:function(t,e,n,r){Mm(e,(e=>{const i=e.x||0,o=e.y||0,a=e.strokeForeground,s=null==e.opacity?1:e.opacity;(e.stroke||e.fill)&&s&&(jm(t,e,i,o),gm(t,e),e.fill&&_m(t,e,s)&&t.fill(),e.stroke&&!a&&bm(t,e,s)&&t.stroke()),t.save(),t.translate(i,o),e.clip&&Um(t,e),n&&n.translate(-i,-o),Mm(e,(e=>{("group"===e.marktype||null==r||r.includes(e.marktype))&&this.draw(t,e,n,r)})),n&&n.translate(i,o),t.restore(),a&&e.stroke&&s&&(jm(t,e,i,o),gm(t,e),bm(t,e,s)&&t.stroke())}))},pick:function(t,e,n,r,i,o){if(e.bounds&&!e.bounds.contains(i,o)||!e.items)return null;const a=n*t.pixelRatio,s=r*t.pixelRatio;return Am(e,(u=>{let l,c,f;const h=u.bounds;if(h&&!h.contains(i,o))return;c=u.x||0,f=u.y||0;const d=c+(u.width||0),p=f+(u.height||0),g=u.clip;if(g&&(i<c||i>d||o<f||o>p))return;if(t.save(),t.translate(c,f),c=i-c,f=o-f,g&&Fg(u)&&!Hm(t,u,a,s))return t.restore(),null;const m=u.strokeForeground,y=!1!==e.interactive;return y&&m&&u.stroke&&Wm(t,u,a,s)?(t.restore(),u):(l=Am(u,(t=>function(t,e,n){return(!1!==t.interactive||"group"===t.marktype)&&t.bounds&&t.bounds.contains(e,n)}(t,c,f)?this.pick(t,n,r,c,f):null)),!l&&y&&(u.fill||!m&&u.stroke)&&Im(t,u,a,s)&&(l=u),t.restore(),l||null)}))},isect:hm,content:function(t,e,n){t("clip-path",e.clip?Tg(n,e,e):null)},background:function(t,e){t("class","background"),t("aria-hidden",!0),Pm(t,e)},foreground:function(t,e){t("class","foreground"),t("aria-hidden",!0),e.strokeForeground?Pm(t,e):t("d","")}},Gm={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1"};function Vm(t,e){var n=t.image;return(!n||t.url&&t.url!==n.url)&&(n={complete:!1,width:0,height:0},e.loadImage(t.url).then((e=>{t.image=e,t.image.url=t.url}))),n}function Xm(t,e){return null!=t.width?t.width:e&&e.width?!1!==t.aspect&&t.height?t.height*e.width/e.height:e.width:0}function Jm(t,e){return null!=t.height?t.height:e&&e.height?!1!==t.aspect&&t.width?t.width*e.height/e.width:e.height:0}function Zm(t,e){return"center"===t?e/2:"right"===t?e:0}function Qm(t,e){return"middle"===t?e/2:"bottom"===t?e:0}var Km={type:"image",tag:"image",nested:!1,attr:function(t,e,n){const r=Vm(e,n),i=Xm(e,r),o=Jm(e,r),a=(e.x||0)-Zm(e.align,i),s=(e.y||0)-Qm(e.baseline,o);t("href",!r.src&&r.toDataURL?r.toDataURL():r.src||"",Gm["xmlns:xlink"],"xlink:href"),t("transform",Tm(a,s)),t("width",i),t("height",o),t("preserveAspectRatio",!1===e.aspect?"none":"xMidYMid")},bound:function(t,e){const n=e.image,r=Xm(e,n),i=Jm(e,n),o=(e.x||0)-Zm(e.align,r),a=(e.y||0)-Qm(e.baseline,i);return t.set(o,a,o+r,a+i)},draw:function(t,e,n){Mm(e,(e=>{if(n&&!n.intersects(e.bounds))return;const r=Vm(e,this);let i=Xm(e,r),o=Jm(e,r);if(0===i||0===o)return;let a,s,u,l,c=(e.x||0)-Zm(e.align,i),f=(e.y||0)-Qm(e.baseline,o);!1!==e.aspect&&(s=r.width/r.height,u=e.width/e.height,s==s&&u==u&&s!==u&&(u<s?(l=i/s,f+=(o-l)/2,o=l):(l=o*s,c+=(i-l)/2,i=l))),(r.complete||r.toDataURL)&&(gm(t,e),t.globalAlpha=null!=(a=e.opacity)?a:1,t.imageSmoothingEnabled=!1!==e.smooth,t.drawImage(r,c,f,i,o))}))},pick:Fm(),isect:p,get:Vm,xOffset:Zm,yOffset:Qm},ty=Rm("line",(function(t,e){const n=e[0],r=n.interpolate||"linear";return Ag.curve(qp(r,n.orient,n.tension)).context(t)(e)}),(function(t,e){for(var n,r,i=Math.pow(t[0].strokeWidth||1,2),o=t.length;--o>=0;)if(!1!==t[o].defined&&(n=t[o].x-e[0])*n+(r=t[o].y-e[1])*r<i)return t[o];return null}));function ey(t,e){var n=e.path;if(null==n)return!0;var r=e.x||0,i=e.y||0,o=e.scaleX||1,a=e.scaleY||1,s=(e.angle||0)*Gp,u=e.pathCache;u&&u.path===n||((e.pathCache=u=Yp(n)).path=n),s&&t.rotate&&t.translate?(t.translate(r,i),t.rotate(s),rg(t,u,0,0,o,a),t.rotate(-s),t.translate(-r,-i)):rg(t,u,r,i,o,a)}var ny={type:"path",tag:"path",nested:!1,attr:function(t,e){var n=e.scaleX||1,r=e.scaleY||1;1===n&&1===r||t("vector-effect","non-scaling-stroke"),t("transform",function(t){return Tm(t.x||0,t.y||0)+(t.angle?" "+Bm(t.angle):"")+(t.scaleX||t.scaleY?" "+function(t,e){return"scale("+t+","+e+")"}(t.scaleX||1,t.scaleY||1):"")}(e)),t("d",e.path)},bound:function(t,e){return ey(rm(t,e.angle),e)?t.set(0,0,0,0):Ug(t,e,!0)},draw:Em(ey),pick:$m(ey),isect:cm(ey)};function ry(t,e){t.beginPath(),Sg(t,e)}var iy={type:"rect",tag:"path",nested:!1,attr:function(t,e){t("d",Sg(null,e))},bound:function(t,e){var n,r;return Ug(t.set(n=e.x||0,r=e.y||0,n+e.width||0,r+e.height||0),e)},draw:Em(ry),pick:$m(ry),isect:hm};function oy(t,e,n){var r,i,o,a;return!(!e.stroke||!bm(t,e,n))&&(r=e.x||0,i=e.y||0,o=null!=e.x2?e.x2:r,a=null!=e.y2?e.y2:i,t.beginPath(),t.moveTo(r,i),t.lineTo(o,a),!0)}var ay={type:"rule",tag:"line",nested:!1,attr:function(t,e){t("transform",Nm(e)),t("x2",null!=e.x2?e.x2-(e.x||0):0),t("y2",null!=e.y2?e.y2-(e.y||0):0)},bound:function(t,e){var n,r;return Ug(t.set(n=e.x||0,r=e.y||0,null!=e.x2?e.x2:n,null!=e.y2?e.y2:r),e)},draw:function(t,e,n){Mm(e,(e=>{if(!n||n.intersects(e.bounds)){var r=null==e.opacity?1:e.opacity;r&&oy(t,e,r)&&(gm(t,e),t.stroke())}}))},pick:Fm((function(t,e,n,r){return!!t.isPointInStroke&&(oy(t,e,1)&&t.isPointInStroke(n,r))})),isect:dm},sy=zm("shape",(function(t,e){return(e.mark.shape||e.shape).context(t)(e)})),uy=zm("symbol",(function(t,e){return Dg.context(t)(e)}),fm);const ly=yt();var cy={height:my,measureWidth:py,estimateWidth:hy,width:hy,canvas:fy};function fy(t){cy.width=t&&um?py:hy}function hy(t,e){return dy(xy(t,e),my(t))}function dy(t,e){return~~(.8*t.length*e)}function py(t,e){return my(t)<=0||!(e=xy(t,e))?0:gy(e,wy(t))}function gy(t,e){const n=`(${e}) ${t}`;let r=ly.get(n);return void 0===r&&(um.font=e,r=um.measureText(t).width,ly.set(n,r)),r}function my(t){return null!=t.fontSize?+t.fontSize||0:11}function yy(t){return null!=t.lineHeight?t.lineHeight:my(t)+2}function vy(t){return e=t.lineBreak&&t.text&&!_(t.text)?t.text.split(t.lineBreak):t.text,_(e)?e.length>1?e:e[0]:e;var e}function _y(t){const e=vy(t);return(_(e)?e.length-1:0)*yy(t)}function xy(t,e){const n=null==e?"":(e+"").trim();return t.limit>0&&n.length?function(t,e){var n=+t.limit,r=function(t){if(cy.width===py){const e=wy(t);return t=>gy(t,e)}if(cy.width===hy){const e=my(t);return t=>dy(t,e)}return e=>cy.width(t,e)}(t);if(r(e)<n)return e;var i,o=t.ellipsis||"…",a="rtl"===t.dir,s=0,u=e.length;if(n-=r(o),a){for(;s<u;)i=s+u>>>1,r(e.slice(i))>n?s=i+1:u=i;return o+e.slice(s)}for(;s<u;)i=1+(s+u>>>1),r(e.slice(0,i))<n?s=i:u=i-1;return e.slice(0,s)+o}(t,n):n}function by(t,e){var n=t.font;return(e&&n?String(n).replace(/"/g,"'"):n)||"sans-serif"}function wy(t,e){return(t.fontStyle?t.fontStyle+" ":"")+(t.fontVariant?t.fontVariant+" ":"")+(t.fontWeight?t.fontWeight+" ":"")+my(t)+"px "+by(t,e)}function ky(t){var e=t.baseline,n=my(t);return Math.round("top"===e?.79*n:"middle"===e?.3*n:"bottom"===e?-.21*n:"line-top"===e?.29*n+.5*yy(t):"line-bottom"===e?.29*n-.5*yy(t):0)}fy(!0);const My={left:"start",center:"middle",right:"end"},Ay=new Bg;function Ey(t){var e,n=t.x||0,r=t.y||0,i=t.radius||0;return i&&(e=(t.theta||0)-Vp,n+=i*Math.cos(e),r+=i*Math.sin(e)),Ay.x1=n,Ay.y1=r,Ay}function Dy(t,e,n){var r,i=cy.height(e),o=e.align,a=Ey(e),s=a.x1,u=a.y1,l=e.dx||0,c=(e.dy||0)+ky(e)-Math.round(.8*i),f=vy(e);if(_(f)?(i+=yy(e)*(f.length-1),r=f.reduce(((t,n)=>Math.max(t,cy.width(e,n))),0)):r=cy.width(e,f),"center"===o?l-=r/2:"right"===o&&(l-=r),t.set(l+=s,c+=u,l+r,c+i),e.angle&&!n)t.rotate(e.angle*Gp,s,u);else if(2===n)return t.rotatedPoints(e.angle*Gp,s,u);return t}var Cy={type:"text",tag:"text",nested:!1,attr:function(t,e){var n,r=e.dx||0,i=(e.dy||0)+ky(e),o=Ey(e),a=o.x1,s=o.y1,u=e.angle||0;t("text-anchor",My[e.align]||"start"),u?(n=Tm(a,s)+" "+Bm(u),(r||i)&&(n+=" "+Tm(r,i))):n=Tm(a+r,s+i),t("transform",n)},bound:Dy,draw:function(t,e,n){Mm(e,(e=>{var r,i,o,a,s,u,l,c=null==e.opacity?1:e.opacity;if(!(n&&!n.intersects(e.bounds)||0===c||e.fontSize<=0||null==e.text||0===e.text.length)){if(t.font=wy(e),t.textAlign=e.align||"left",i=(r=Ey(e)).x1,o=r.y1,e.angle&&(t.save(),t.translate(i,o),t.rotate(e.angle*Gp),i=o=0),i+=e.dx||0,o+=(e.dy||0)+ky(e),u=vy(e),gm(t,e),_(u))for(s=yy(e),a=0;a<u.length;++a)l=xy(e,u[a]),e.fill&&_m(t,e,c)&&t.fillText(l,i,o),e.stroke&&bm(t,e,c)&&t.strokeText(l,i,o),o+=s;else l=xy(e,u),e.fill&&_m(t,e,c)&&t.fillText(l,i,o),e.stroke&&bm(t,e,c)&&t.strokeText(l,i,o);e.angle&&t.restore()}}))},pick:Fm((function(t,e,n,r,i,o){if(e.fontSize<=0)return!1;if(!e.angle)return!0;var a=Ey(e),s=a.x1,u=a.y1,l=Dy(Ay,e,1),c=-e.angle*Gp,f=Math.cos(c),h=Math.sin(c),d=f*i-h*o+(s-f*s+h*u),p=h*i+f*o+(u-h*s-f*u);return l.contains(d,p)})),isect:function(t,e){const n=Dy(Ay,t,2);return pm(e,n[0],n[1],n[2],n[3])||pm(e,n[0],n[1],n[4],n[5])||pm(e,n[4],n[5],n[6],n[7])||pm(e,n[2],n[3],n[6],n[7])}},Fy=Rm("trail",(function(t,e){return Cg.context(t)(e)}),(function(t,e){for(var n,r,i=t.length;--i>=0;)if(!1!==t[i].defined&&(n=t[i].x-e[0])*n+(r=t[i].y-e[1])*r<(n=t[i].size||1)*n)return t[i];return null})),Sy={arc:Om,area:Lm,group:Ym,image:Km,line:ty,path:ny,rect:iy,rule:ay,shape:sy,symbol:uy,text:Cy,trail:Fy};function $y(t,e,n){var r=Sy[t.mark.marktype],i=e||r.bound;return r.nested&&(t=t.mark),i(t.bounds||(t.bounds=new Bg),t,n)}var Ty={mark:null};function By(t,e,n){var r,i,o,a,s=Sy[t.marktype],u=s.bound,l=t.items,c=l&&l.length;if(s.nested)return c?o=l[0]:(Ty.mark=t,o=Ty),a=$y(o,u,n),e=e&&e.union(a)||a;if(e=e||t.bounds&&t.bounds.clear()||new Bg,c)for(r=0,i=l.length;r<i;++r)e.union($y(l[r],u,n));return t.bounds=e}const Ny=["marktype","name","role","interactive","clip","items","zindex","x","y","width","height","align","baseline","fill","fillOpacity","opacity","blend","stroke","strokeOpacity","strokeWidth","strokeCap","strokeDash","strokeDashOffset","strokeForeground","strokeOffset","startAngle","endAngle","innerRadius","outerRadius","cornerRadius","padAngle","cornerRadiusTopLeft","cornerRadiusTopRight","cornerRadiusBottomLeft","cornerRadiusBottomRight","interpolate","tension","orient","defined","url","aspect","smooth","path","scaleX","scaleY","x2","y2","size","shape","text","angle","theta","radius","dir","dx","dy","ellipsis","limit","lineBreak","lineHeight","font","fontSize","fontWeight","fontStyle","fontVariant","description","aria","ariaRole","ariaRoleDescription"];function zy(t,e){return JSON.stringify(t,Ny,e)}function Oy(t){return Ry("string"==typeof t?JSON.parse(t):t)}function Ry(t){var e,n,r,i=t.marktype,o=t.items;if(o)for(n=0,r=o.length;n<r;++n)e=i?"mark":"group",o[n][e]=t,o[n].zindex&&(o[n][e].zdirty=!0),"group"===(i||e)&&Ry(o[n]);return i&&By(t),t}class Ly{constructor(t){arguments.length?this.root=Oy(t):(this.root=Uy({marktype:"group",name:"root",role:"frame"}),this.root.items=[new zg(this.root)])}toJSON(t){return zy(this.root,t||0)}mark(t,e,n){const r=Uy(t,e=e||this.root.items[0]);return e.items[n]=r,r.zindex&&(r.group.zdirty=!0),r}}function Uy(t,e){const n={bounds:new Bg,clip:!!t.clip,group:e,interactive:!1!==t.interactive,items:[],marktype:t.marktype,name:t.name||void 0,role:t.role||void 0,zindex:t.zindex||0};return null!=t.aria&&(n.aria=t.aria),t.description&&(n.description=t.description),n}function qy(t,e,n){return!t&&"undefined"!=typeof document&&document.createElement&&(t=document),t?n?t.createElementNS(n,e):t.createElement(e):null}function Py(t,e){e=e.toLowerCase();for(var n=t.childNodes,r=0,i=n.length;r<i;++r)if(n[r].tagName.toLowerCase()===e)return n[r]}function jy(t,e,n,r){var i,o=t.childNodes[e];return o&&o.tagName.toLowerCase()===n.toLowerCase()||(i=o||null,o=qy(t.ownerDocument,n,r),t.insertBefore(o,i)),o}function Iy(t,e){for(var n=t.childNodes,r=n.length;r>e;)t.removeChild(n[--r]);return t}function Wy(t){return"mark-"+t.marktype+(t.role?" role-"+t.role:"")+(t.name?" "+t.name:"")}function Hy(t,e){const n=e.getBoundingClientRect();return[t.clientX-n.left-(e.clientLeft||0),t.clientY-n.top-(e.clientTop||0)]}class Yy{constructor(t,e){this._active=null,this._handlers={},this._loader=t||Ko(),this._tooltip=e||Gy}initialize(t,e,n){return this._el=t,this._obj=n||null,this.origin(e)}element(){return this._el}canvas(){return this._el&&this._el.firstChild}origin(t){return arguments.length?(this._origin=t||[0,0],this):this._origin.slice()}scene(t){return arguments.length?(this._scene=t,this):this._scene}on(){}off(){}_handlerIndex(t,e,n){for(let r=t?t.length:0;--r>=0;)if(t[r].type===e&&(!n||t[r].handler===n))return r;return-1}handlers(t){const e=this._handlers,n=[];if(t)n.push(...e[this.eventName(t)]);else for(const t in e)n.push(...e[t]);return n}eventName(t){const e=t.indexOf(".");return e<0?t:t.slice(0,e)}handleHref(t,e,n){this._loader.sanitize(n,{context:"href"}).then((e=>{const n=new MouseEvent(t.type,t),r=qy(null,"a");for(const t in e)r.setAttribute(t,e[t]);r.dispatchEvent(n)})).catch((()=>{}))}handleTooltip(t,e,n){if(e&&null!=e.tooltip){e=function(t,e,n,r){var i,o,a=t&&t.mark;if(a&&(i=Sy[a.marktype]).tip){for((o=Hy(e,n))[0]-=r[0],o[1]-=r[1];t=t.mark.group;)o[0]-=t.x||0,o[1]-=t.y||0;t=i.tip(a.items,o)}return t}(e,t,this.canvas(),this._origin);const r=n&&e&&e.tooltip||null;this._tooltip.call(this._obj,this,t,e,r)}}getItemBoundingClientRect(t){const e=this.canvas();if(!e)return;const n=e.getBoundingClientRect(),r=this._origin,i=t.bounds,o=i.width(),a=i.height();let s=i.x1+r[0]+n.left,u=i.y1+r[1]+n.top;for(;t.mark&&(t=t.mark.group);)s+=t.x||0,u+=t.y||0;return{x:s,y:u,width:o,height:a,left:s,top:u,right:s+o,bottom:u+a}}}function Gy(t,e,n,r){t.element().setAttribute("title",r||"")}class Vy{constructor(t){this._el=null,this._bgcolor=null,this._loader=new Og(t)}initialize(t,e,n,r,i){return this._el=t,this.resize(e,n,r,i)}element(){return this._el}canvas(){return this._el&&this._el.firstChild}background(t){return 0===arguments.length?this._bgcolor:(this._bgcolor=t,this)}resize(t,e,n,r){return this._width=t,this._height=e,this._origin=n||[0,0],this._scale=r||1,this}dirty(){}render(t,e){const n=this;return n._call=function(){n._render(t,e)},n._call(),n._call=null,n}_render(){}renderAsync(t,e){const n=this.render(t,e);return this._ready?this._ready.then((()=>n)):Promise.resolve(n)}_load(t,e){var n=this,r=n._loader[t](e);if(!n._ready){const t=n._call;n._ready=n._loader.ready().then((e=>{e&&t(),n._ready=null}))}return r}sanitizeURL(t){return this._load("sanitizeURL",t)}loadImage(t){return this._load("loadImage",t)}}const Xy="dragenter",Jy="dragleave",Zy="dragover",Qy="pointerdown",Ky="pointermove",tv="pointerout",ev="pointerover",nv="mousedown",rv="mousemove",iv="mouseout",ov="mouseover",av="click",sv="mousewheel",uv="touchstart",lv="touchmove",cv="touchend",fv=["keydown","keypress","keyup",Xy,Jy,Zy,Qy,"pointerup",Ky,tv,ev,nv,"mouseup",rv,iv,ov,av,"dblclick","wheel",sv,uv,lv,cv],hv=Ky,dv=iv,pv=av;class gv extends Yy{constructor(t,e){super(t,e),this._down=null,this._touch=null,this._first=!0,this._events={},this.events=fv,this.pointermove=_v([Ky,rv],[ev,ov],[tv,iv]),this.dragover=_v([Zy],[Xy],[Jy]),this.pointerout=xv([tv,iv]),this.dragleave=xv([Jy])}initialize(t,e,n){return this._canvas=t&&Py(t,"canvas"),[av,nv,Qy,Ky,tv,Jy].forEach((t=>yv(this,t))),super.initialize(t,e,n)}canvas(){return this._canvas}context(){return this._canvas.getContext("2d")}DOMMouseScroll(t){this.fire(sv,t)}pointerdown(t){this._down=this._active,this.fire(Qy,t)}mousedown(t){this._down=this._active,this.fire(nv,t)}click(t){this._down===this._active&&(this.fire(av,t),this._down=null)}touchstart(t){this._touch=this.pickEvent(t.changedTouches[0]),this._first&&(this._active=this._touch,this._first=!1),this.fire(uv,t,!0)}touchmove(t){this.fire(lv,t,!0)}touchend(t){this.fire(cv,t,!0),this._touch=null}fire(t,e,n){const r=n?this._touch:this._active,i=this._handlers[t];if(e.vegaType=t,t===pv&&r&&r.href?this.handleHref(e,r,r.href):t!==hv&&t!==dv||this.handleTooltip(e,r,t!==dv),i)for(let t=0,n=i.length;t<n;++t)i[t].handler.call(this._obj,e,r)}on(t,e){const n=this.eventName(t),r=this._handlers;return this._handlerIndex(r[n],t,e)<0&&(yv(this,t),(r[n]||(r[n]=[])).push({type:t,handler:e})),this}off(t,e){const n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e);return i>=0&&r.splice(i,1),this}pickEvent(t){const e=Hy(t,this._canvas),n=this._origin;return this.pick(this._scene,e[0],e[1],e[0]-n[0],e[1]-n[1])}pick(t,e,n,r,i){const o=this.context();return Sy[t.marktype].pick.call(this,o,t,e,n,r,i)}}const mv=t=>t===uv||t===lv||t===cv?[uv,lv,cv]:[t];function yv(t,e){mv(e).forEach((e=>function(t,e){const n=t.canvas();n&&!t._events[e]&&(t._events[e]=1,n.addEventListener(e,t[e]?n=>t[e](n):n=>t.fire(e,n)))}(t,e)))}function vv(t,e,n){e.forEach((e=>t.fire(e,n)))}function _v(t,e,n){return function(r){const i=this._active,o=this.pickEvent(r);o===i||(i&&i.exit||vv(this,n,r),this._active=o,vv(this,e,r)),vv(this,t,r)}}function xv(t){return function(e){vv(this,t,e),this._active=null}}function bv(t,e,n,r,i,o){const a="undefined"!=typeof HTMLElement&&t instanceof HTMLElement&&null!=t.parentNode,s=t.getContext("2d"),u=a?"undefined"!=typeof window&&window.devicePixelRatio||1:i;t.width=e*u,t.height=n*u;for(const t in o)s[t]=o[t];return a&&1!==u&&(t.style.width=e+"px",t.style.height=n+"px"),s.pixelRatio=u,s.setTransform(u,0,0,u,u*r[0],u*r[1]),t}class wv extends Vy{constructor(t){super(t),this._options={},this._redraw=!1,this._dirty=new Bg,this._tempb=new Bg}initialize(t,e,n,r,i,o){return this._options=o||{},this._canvas=this._options.externalContext?null:_c(1,1,this._options.type),t&&this._canvas&&(Iy(t,0).appendChild(this._canvas),this._canvas.setAttribute("class","marks")),super.initialize(t,e,n,r,i)}resize(t,e,n,r){if(super.resize(t,e,n,r),this._canvas)bv(this._canvas,this._width,this._height,this._origin,this._scale,this._options.context);else{const t=this._options.externalContext;t||s("CanvasRenderer is missing a valid canvas or context"),t.scale(this._scale,this._scale),t.translate(this._origin[0],this._origin[1])}return this._redraw=!0,this}canvas(){return this._canvas}context(){return this._options.externalContext||(this._canvas?this._canvas.getContext("2d"):null)}dirty(t){const e=this._tempb.clear().union(t.bounds);let n=t.mark.group;for(;n;)e.translate(n.x||0,n.y||0),n=n.mark.group;this._dirty.union(e)}_render(t,e){const n=this.context(),r=this._origin,i=this._width,o=this._height,a=this._dirty,s=kv(r,i,o);n.save();const u=this._redraw||a.empty()?(this._redraw=!1,s.expand(1)):function(t,e,n){e.expand(1).round(),t.pixelRatio%1&&e.scale(t.pixelRatio).round().scale(1/t.pixelRatio);return e.translate(-n[0]%1,-n[1]%1),t.beginPath(),t.rect(e.x1,e.y1,e.width(),e.height()),t.clip(),e}(n,s.intersect(a),r);return this.clear(-r[0],-r[1],i,o),this.draw(n,t,u,e),n.restore(),a.clear(),this}draw(t,e,n,r){if("group"!==e.marktype&&null!=r&&!r.includes(e.marktype))return;const i=Sy[e.marktype];e.clip&&function(t,e){var n=e.clip;t.save(),Y(n)?(t.beginPath(),n(t),t.clip()):Um(t,e.group)}(t,e),i.draw.call(this,t,e,n,r),e.clip&&t.restore()}clear(t,e,n,r){const i=this._options,o=this.context();"pdf"===i.type||i.externalContext||o.clearRect(t,e,n,r),null!=this._bgcolor&&(o.fillStyle=this._bgcolor,o.fillRect(t,e,n,r))}}const kv=(t,e,n)=>(new Bg).set(0,0,e,n).translate(-t[0],-t[1]);class Mv extends Yy{constructor(t,e){super(t,e);const n=this;n._hrefHandler=Av(n,((t,e)=>{e&&e.href&&n.handleHref(t,e,e.href)})),n._tooltipHandler=Av(n,((t,e)=>{n.handleTooltip(t,e,t.type!==dv)}))}initialize(t,e,n){let r=this._svg;return r&&(r.removeEventListener(pv,this._hrefHandler),r.removeEventListener(hv,this._tooltipHandler),r.removeEventListener(dv,this._tooltipHandler)),this._svg=r=t&&Py(t,"svg"),r&&(r.addEventListener(pv,this._hrefHandler),r.addEventListener(hv,this._tooltipHandler),r.addEventListener(dv,this._tooltipHandler)),super.initialize(t,e,n)}canvas(){return this._svg}on(t,e){const n=this.eventName(t),r=this._handlers;if(this._handlerIndex(r[n],t,e)<0){const i={type:t,handler:e,listener:Av(this,e)};(r[n]||(r[n]=[])).push(i),this._svg&&this._svg.addEventListener(n,i.listener)}return this}off(t,e){const n=this.eventName(t),r=this._handlers[n],i=this._handlerIndex(r,t,e);return i>=0&&(this._svg&&this._svg.removeEventListener(n,r[i].listener),r.splice(i,1)),this}}const Av=(t,e)=>n=>{let r=n.target.__data__;r=Array.isArray(r)?r[0]:r,n.vegaType=n.type,e.call(t._obj,n,r)},Ev="aria-hidden",Dv="aria-label",Cv="role",Fv="aria-roledescription",Sv="graphics-object",$v="graphics-symbol",Tv=(t,e,n)=>({[Cv]:t,[Fv]:e,[Dv]:n||void 0}),Bv=Dt(["axis-domain","axis-grid","axis-label","axis-tick","axis-title","legend-band","legend-entry","legend-gradient","legend-label","legend-title","legend-symbol","title"]),Nv={axis:{desc:"axis",caption:function(t){const e=t.datum,n=t.orient,r=e.title?Uv(t):null,i=t.context,o=i.scales[e.scale].value,a=i.dataflow.locale(),s=o.type;return("left"===n||"right"===n?"Y":"X")+"-axis"+(r?` titled '${r}'`:"")+` for a ${Qd(s)?"discrete":s} scale`+` with ${Tp(a,o,t)}`}},legend:{desc:"legend",caption:function(t){const e=t.datum,n=e.title?Uv(t):null,r=`${e.type||""} legend`.trim(),i=e.scales,o=Object.keys(i),a=t.context,s=a.scales[i[o[0]]].value,u=a.dataflow.locale();return l=r,(l.length?l[0].toUpperCase()+l.slice(1):l)+(n?` titled '${n}'`:"")+` for ${function(t){return t=t.map((t=>t+("fill"===t||"stroke"===t?" color":""))),t.length<2?t[0]:t.slice(0,-1).join(", ")+" and "+A(t)}(o)}`+` with ${Tp(u,s,t)}`;var l}},"title-text":{desc:"title",caption:t=>`Title text '${Lv(t)}'`},"title-subtitle":{desc:"subtitle",caption:t=>`Subtitle text '${Lv(t)}'`}},zv={ariaRole:Cv,ariaRoleDescription:Fv,description:Dv};function Ov(t,e){const n=!1===e.aria;if(t(Ev,n||void 0),n||null==e.description)for(const e in zv)t(zv[e],void 0);else{const n=e.mark.marktype;t(Dv,e.description),t(Cv,e.ariaRole||("group"===n?Sv:$v)),t(Fv,e.ariaRoleDescription||`${n} mark`)}}function Rv(t){return!1===t.aria?{[Ev]:!0}:Bv[t.role]?null:Nv[t.role]?function(t,e){try{const n=t.items[0],r=e.caption||(()=>"");return Tv(e.role||$v,e.desc,n.description||r(n))}catch(t){return null}}(t,Nv[t.role]):function(t){const e=t.marktype,n="group"===e||"text"===e||t.items.some((t=>null!=t.description&&!1!==t.aria));return Tv(n?Sv:$v,`${e} mark container`,t.description)}(t)}function Lv(t){return W(t.text).join(" ")}function Uv(t){try{return W(A(t.items).items[0].text).join(" ")}catch(t){return null}}const qv=t=>(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Pv(){let t="",e="",n="";const r=[],i=()=>e=n="",o=(t,n)=>{var r;return null!=n&&(e+=` ${t}="${r=n,qv(r).replace(/"/g,"&quot;").replace(/\t/g,"&#x9;").replace(/\n/g,"&#xA;").replace(/\r/g,"&#xD;")}"`),a},a={open(s,...u){(o=>{e&&(t+=`${e}>${n}`,i()),r.push(o)})(s),e="<"+s;for(const t of u)for(const e in t)o(e,t[e]);return a},close(){const o=r.pop();return t+=e?e+(n?`>${n}</${o}>`:"/>"):`</${o}>`,i(),a},attr:o,text:t=>(n+=qv(t),a),toString:()=>t};return a}const jv=t=>Iv(Pv(),t)+"";function Iv(t,e){if(t.open(e.tagName),e.hasAttributes()){const n=e.attributes,r=n.length;for(let e=0;e<r;++e)t.attr(n[e].name,n[e].value)}if(e.hasChildNodes()){const n=e.childNodes;for(const e of n)3===e.nodeType?t.text(e.nodeValue):Iv(t,e)}return t.close()}const Wv={fill:"fill",fillOpacity:"fill-opacity",stroke:"stroke",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",strokeCap:"stroke-linecap",strokeJoin:"stroke-linejoin",strokeDash:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeMiterLimit:"stroke-miterlimit",opacity:"opacity"},Hv={blend:"mix-blend-mode"},Yv={fill:"none","stroke-miterlimit":10},Gv="http://www.w3.org/2000/xmlns/",Vv=Gm.xmlns;class Xv extends Vy{constructor(t){super(t),this._dirtyID=0,this._dirty=[],this._svg=null,this._root=null,this._defs=null}initialize(t,e,n,r,i){return this._defs={},this._clearDefs(),t&&(this._svg=jy(t,0,"svg",Vv),this._svg.setAttributeNS(Gv,"xmlns",Vv),this._svg.setAttributeNS(Gv,"xmlns:xlink",Gm["xmlns:xlink"]),this._svg.setAttribute("version",Gm.version),this._svg.setAttribute("class","marks"),Iy(t,1),this._root=jy(this._svg,0,"g",Vv),o_(this._root,Yv),Iy(this._svg,1)),this.background(this._bgcolor),super.initialize(t,e,n,r,i)}background(t){return arguments.length&&this._svg&&this._svg.style.setProperty("background-color",t),super.background(...arguments)}resize(t,e,n,r){return super.resize(t,e,n,r),this._svg&&(o_(this._svg,{width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}),this._root.setAttribute("transform",`translate(${this._origin})`)),this._dirty=[],this}canvas(){return this._svg}svg(){const t=this._svg,e=this._bgcolor;if(!t)return null;let n;e&&(t.removeAttribute("style"),n=jy(t,0,"rect",Vv),o_(n,{width:this._width,height:this._height,fill:e}));const r=jv(t);return e&&(t.removeChild(n),this._svg.style.setProperty("background-color",e)),r}_render(t,e){return this._dirtyCheck()&&(this._dirtyAll&&this._clearDefs(),this.mark(this._root,t,void 0,e),Iy(this._root,1)),this.defs(),this._dirty=[],++this._dirtyID,this}dirty(t){t.dirty!==this._dirtyID&&(t.dirty=this._dirtyID,this._dirty.push(t))}isDirty(t){return this._dirtyAll||!t._svg||!t._svg.ownerSVGElement||t.dirty===this._dirtyID}_dirtyCheck(){this._dirtyAll=!0;const t=this._dirty;if(!t.length||!this._dirtyID)return!0;const e=++this._dirtyID;let n,r,i,o,a,s,u;for(a=0,s=t.length;a<s;++a)n=t[a],r=n.mark,r.marktype!==i&&(i=r.marktype,o=Sy[i]),r.zdirty&&r.dirty!==e&&(this._dirtyAll=!1,Jv(n,e),r.items.forEach((t=>{t.dirty=e}))),r.zdirty||(n.exit?(o.nested&&r.items.length?(u=r.items[0],u._svg&&this._update(o,u._svg,u)):n._svg&&(u=n._svg.parentNode,u&&u.removeChild(n._svg)),n._svg=null):(n=o.nested?r.items[0]:n,n._update!==e&&(n._svg&&n._svg.ownerSVGElement?this._update(o,n._svg,n):(this._dirtyAll=!1,Jv(n,e)),n._update=e)));return!this._dirtyAll}mark(t,e,n,r){if(!this.isDirty(e))return e._svg;const i=this._svg,o=e.marktype,a=Sy[o],s=!1===e.interactive?"none":null,u="g"===a.tag,l=Kv(e,t,n,"g",i);if("group"!==o&&null!=r&&!r.includes(o))return Iy(l,0),e._svg;l.setAttribute("class",Wy(e));const c=Rv(e);for(const t in c)a_(l,t,c[t]);u||a_(l,"pointer-events",s),a_(l,"clip-path",e.clip?Tg(this,e,e.group):null);let f=null,h=0;const d=t=>{const e=this.isDirty(t),n=Kv(t,l,f,a.tag,i);e&&(this._update(a,n,t),u&&function(t,e,n,r){e=e.lastChild.previousSibling;let i,o=0;Mm(n,(n=>{i=t.mark(e,n,i,r),++o})),Iy(e,1+o)}(this,n,t,r)),f=n,++h};return a.nested?e.items.length&&d(e.items[0]):Mm(e,d),Iy(l,h),l}_update(t,e,n){t_=e,e_=e.__values__,Ov(r_,n),t.attr(r_,n,this);const r=n_[t.type];r&&r.call(this,t,e,n),t_&&this.style(t_,n)}style(t,e){if(null!=e){for(const n in Wv){let r="font"===n?by(e):e[n];if(r===e_[n])continue;const i=Wv[n];null==r?t.removeAttribute(i):(zp(r)&&(r=Op(r,this._defs.gradient,s_())),t.setAttribute(i,r+"")),e_[n]=r}for(const n in Hv)i_(t,Hv[n],e[n])}}defs(){const t=this._svg,e=this._defs;let n=e.el,r=0;for(const i in e.gradient)n||(e.el=n=jy(t,1,"defs",Vv)),r=Zv(n,e.gradient[i],r);for(const i in e.clipping)n||(e.el=n=jy(t,1,"defs",Vv)),r=Qv(n,e.clipping[i],r);n&&(0===r?(t.removeChild(n),e.el=null):Iy(n,r))}_clearDefs(){const t=this._defs;t.gradient={},t.clipping={}}}function Jv(t,e){for(;t&&t.dirty!==e;t=t.mark.group){if(t.dirty=e,!t.mark||t.mark.dirty===e)return;t.mark.dirty=e}}function Zv(t,e,n){let r,i,o;if("radial"===e.gradient){let r=jy(t,n++,"pattern",Vv);o_(r,{id:Np+e.id,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),r=jy(r,0,"rect",Vv),o_(r,{width:1,height:1,fill:`url(${s_()}#${e.id})`}),o_(t=jy(t,n++,"radialGradient",Vv),{id:e.id,fx:e.x1,fy:e.y1,fr:e.r1,cx:e.x2,cy:e.y2,r:e.r2})}else o_(t=jy(t,n++,"linearGradient",Vv),{id:e.id,x1:e.x1,x2:e.x2,y1:e.y1,y2:e.y2});for(r=0,i=e.stops.length;r<i;++r)o=jy(t,r,"stop",Vv),o.setAttribute("offset",e.stops[r].offset),o.setAttribute("stop-color",e.stops[r].color);return Iy(t,r),n}function Qv(t,e,n){let r;return(t=jy(t,n,"clipPath",Vv)).setAttribute("id",e.id),e.path?(r=jy(t,0,"path",Vv),r.setAttribute("d",e.path)):(r=jy(t,0,"rect",Vv),o_(r,{x:0,y:0,width:e.width,height:e.height})),Iy(t,1),n+1}function Kv(t,e,n,r,i){let o,a=t._svg;if(!a&&(o=e.ownerDocument,a=qy(o,r,Vv),t._svg=a,t.mark&&(a.__data__=t,a.__values__={fill:"default"},"g"===r))){const e=qy(o,"path",Vv);a.appendChild(e),e.__data__=t;const n=qy(o,"g",Vv);a.appendChild(n),n.__data__=t;const r=qy(o,"path",Vv);a.appendChild(r),r.__data__=t,r.__values__={fill:"default"}}return(a.ownerSVGElement!==i||function(t,e){return t.parentNode&&t.parentNode.childNodes.length>1&&t.previousSibling!=e}(a,n))&&e.insertBefore(a,n?n.nextSibling:e.firstChild),a}let t_=null,e_=null;const n_={group(t,e,n){const r=t_=e.childNodes[2];e_=r.__values__,t.foreground(r_,n,this),e_=e.__values__,t_=e.childNodes[1],t.content(r_,n,this);const i=t_=e.childNodes[0];t.background(r_,n,this);const o=!1===n.mark.interactive?"none":null;if(o!==e_.events&&(a_(r,"pointer-events",o),a_(i,"pointer-events",o),e_.events=o),n.strokeForeground&&n.stroke){const t=n.fill;a_(r,"display",null),this.style(i,n),a_(i,"stroke",null),t&&(n.fill=null),e_=r.__values__,this.style(r,n),t&&(n.fill=t),t_=null}else a_(r,"display","none")},image(t,e,n){!1===n.smooth?(i_(e,"image-rendering","optimizeSpeed"),i_(e,"image-rendering","pixelated")):i_(e,"image-rendering",null)},text(t,e,n){const r=vy(n);let i,o,a,s;_(r)?(o=r.map((t=>xy(n,t))),i=o.join("\n"),i!==e_.text&&(Iy(e,0),a=e.ownerDocument,s=yy(n),o.forEach(((t,r)=>{const i=qy(a,"tspan",Vv);i.__data__=n,i.textContent=t,r&&(i.setAttribute("x",0),i.setAttribute("dy",s)),e.appendChild(i)})),e_.text=i)):(o=xy(n,r),o!==e_.text&&(e.textContent=o,e_.text=o)),a_(e,"font-family",by(n)),a_(e,"font-size",my(n)+"px"),a_(e,"font-style",n.fontStyle),a_(e,"font-variant",n.fontVariant),a_(e,"font-weight",n.fontWeight)}};function r_(t,e,n){e!==e_[t]&&(n?function(t,e,n,r){null!=n?t.setAttributeNS(r,e,n):t.removeAttributeNS(r,e)}(t_,t,e,n):a_(t_,t,e),e_[t]=e)}function i_(t,e,n){n!==e_[e]&&(null==n?t.style.removeProperty(e):t.style.setProperty(e,n+""),e_[e]=n)}function o_(t,e){for(const n in e)a_(t,n,e[n])}function a_(t,e,n){null!=n?t.setAttribute(e,n):t.removeAttribute(e)}function s_(){let t;return"undefined"==typeof window?"":(t=window.location).hash?t.href.slice(0,-t.hash.length):t.href}class u_ extends Vy{constructor(t){super(t),this._text=null,this._defs={gradient:{},clipping:{}}}svg(){return this._text}_render(t){const e=Pv();e.open("svg",tt({},Gm,{class:"marks",width:this._width*this._scale,height:this._height*this._scale,viewBox:`0 0 ${this._width} ${this._height}`}));const n=this._bgcolor;return n&&"transparent"!==n&&"none"!==n&&e.open("rect",{width:this._width,height:this._height,fill:n}).close(),e.open("g",Yv,{transform:"translate("+this._origin+")"}),this.mark(e,t),e.close(),this.defs(e),this._text=e.close()+"",this}mark(t,e){const n=Sy[e.marktype],r=n.tag,i=[Ov,n.attr];t.open("g",{class:Wy(e),"clip-path":e.clip?Tg(this,e,e.group):null},Rv(e),{"pointer-events":"g"!==r&&!1===e.interactive?"none":null});const o=o=>{const a=this.href(o);if(a&&t.open("a",a),t.open(r,this.attr(e,o,i,"g"!==r?r:null)),"text"===r){const e=vy(o);if(_(e)){const n={x:0,dy:yy(o)};for(let r=0;r<e.length;++r)t.open("tspan",r?n:null).text(xy(o,e[r])).close()}else t.text(xy(o,e))}else if("g"===r){const r=o.strokeForeground,i=o.fill,a=o.stroke;r&&a&&(o.stroke=null),t.open("path",this.attr(e,o,n.background,"bgrect")).close(),t.open("g",this.attr(e,o,n.content)),Mm(o,(e=>this.mark(t,e))),t.close(),r&&a?(i&&(o.fill=null),o.stroke=a,t.open("path",this.attr(e,o,n.foreground,"bgrect")).close(),i&&(o.fill=i)):t.open("path",this.attr(e,o,n.foreground,"bgfore")).close()}t.close(),a&&t.close()};return n.nested?e.items&&e.items.length&&o(e.items[0]):Mm(e,o),t.close()}href(t){const e=t.href;let n;if(e){if(n=this._hrefs&&this._hrefs[e])return n;this.sanitizeURL(e).then((t=>{t["xlink:href"]=t.href,t.href=null,(this._hrefs||(this._hrefs={}))[e]=t}))}return null}attr(t,e,n,r){const i={},o=(t,e,n,r)=>{i[r||t]=e};return Array.isArray(n)?n.forEach((t=>t(o,e,this))):n(o,e,this),r&&function(t,e,n,r,i){let o;if(null==e)return t;"bgrect"===r&&!1===n.interactive&&(t["pointer-events"]="none");if("bgfore"===r&&(!1===n.interactive&&(t["pointer-events"]="none"),t.display="none",null!==e.fill))return t;"image"===r&&!1===e.smooth&&(o=["image-rendering: optimizeSpeed;","image-rendering: pixelated;"]);"text"===r&&(t["font-family"]=by(e),t["font-size"]=my(e)+"px",t["font-style"]=e.fontStyle,t["font-variant"]=e.fontVariant,t["font-weight"]=e.fontWeight);for(const n in Wv){let r=e[n];const o=Wv[n];("transparent"!==r||"fill"!==o&&"stroke"!==o)&&null!=r&&(zp(r)&&(r=Op(r,i.gradient,"")),t[o]=r)}for(const t in Hv){const n=e[t];null!=n&&(o=o||[],o.push(`${Hv[t]}: ${n};`))}o&&(t.style=o.join(" "))}(i,e,t,r,this._defs),i}defs(t){const e=this._defs.gradient,n=this._defs.clipping;if(0!==Object.keys(e).length+Object.keys(n).length){t.open("defs");for(const n in e){const r=e[n],i=r.stops;"radial"===r.gradient?(t.open("pattern",{id:Np+n,viewBox:"0,0,1,1",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid slice"}),t.open("rect",{width:"1",height:"1",fill:"url(#"+n+")"}).close(),t.close(),t.open("radialGradient",{id:n,fx:r.x1,fy:r.y1,fr:r.r1,cx:r.x2,cy:r.y2,r:r.r2})):t.open("linearGradient",{id:n,x1:r.x1,x2:r.x2,y1:r.y1,y2:r.y2});for(let e=0;e<i.length;++e)t.open("stop",{offset:i[e].offset,"stop-color":i[e].color}).close();t.close()}for(const e in n){const r=n[e];t.open("clipPath",{id:e}),r.path?t.open("path",{d:r.path}).close():t.open("rect",{x:0,y:0,width:r.width,height:r.height}).close(),t.close()}t.close()}}}const l_={svgMarkTypes:["text"],svgOnTop:!0,debug:!1};class c_ extends Vy{constructor(t){super(t),this._svgRenderer=new Xv(t),this._canvasRenderer=new wv(t)}initialize(t,e,n,r,i){this._root_el=jy(t,0,"div");const o=jy(this._root_el,0,"div"),a=jy(this._root_el,1,"div");return this._root_el.style.position="relative",l_.debug||(o.style.height="100%",a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.height="100%",a.style.width="100%"),this._svgEl=l_.svgOnTop?a:o,this._canvasEl=l_.svgOnTop?o:a,this._svgEl.style.pointerEvents="none",this._canvasRenderer.initialize(this._canvasEl,e,n,r,i),this._svgRenderer.initialize(this._svgEl,e,n,r,i),super.initialize(t,e,n,r,i)}dirty(t){return l_.svgMarkTypes.includes(t.mark.marktype)?this._svgRenderer.dirty(t):this._canvasRenderer.dirty(t),this}_render(t,e){const n=(e??["arc","area","image","line","path","rect","rule","shape","symbol","text","trail"]).filter((t=>!l_.svgMarkTypes.includes(t)));this._svgRenderer.render(t,l_.svgMarkTypes),this._canvasRenderer.render(t,n)}resize(t,e,n,r){return super.resize(t,e,n,r),this._svgRenderer.resize(t,e,n,r),this._canvasRenderer.resize(t,e,n,r),this}background(t){return l_.svgOnTop?this._canvasRenderer.background(t):this._svgRenderer.background(t),this}}class f_ extends gv{constructor(t,e){super(t,e)}initialize(t,e,n){const r=jy(jy(t,0,"div"),l_.svgOnTop?0:1,"div");return super.initialize(r,e,n)}}const h_="canvas",d_="hybrid",p_="none",g_={Canvas:h_,PNG:"png",SVG:"svg",Hybrid:d_,None:p_},m_={};function y_(t,e){return t=String(t||"").toLowerCase(),arguments.length>1?(m_[t]=e,this):m_[t]}function v_(t,e,n){const r=[],i=(new Bg).union(e),o=t.marktype;return o?__(t,i,n,r):"group"===o?x_(t,i,n,r):s("Intersect scene must be mark node or group item.")}function __(t,e,n,r){if(function(t,e,n){return t.bounds&&e.intersects(t.bounds)&&("group"===t.marktype||!1!==t.interactive&&(!n||n(t)))}(t,e,n)){const i=t.items,o=t.marktype,a=i.length;let s=0;if("group"===o)for(;s<a;++s)x_(i[s],e,n,r);else for(const t=Sy[o].isect;s<a;++s){const n=i[s];b_(n,e,t)&&r.push(n)}}return r}function x_(t,e,n,r){n&&n(t.mark)&&b_(t,e,Sy.group.isect)&&r.push(t);const i=t.items,o=i&&i.length;if(o){const a=t.x||0,s=t.y||0;e.translate(-a,-s);for(let t=0;t<o;++t)__(i[t],e,n,r);e.translate(a,s)}return r}function b_(t,e,n){const r=t.bounds;return e.encloses(r)||e.intersects(r)&&n(t,e)}m_[h_]=m_.png={renderer:wv,headless:wv,handler:gv},m_.svg={renderer:Xv,headless:u_,handler:Mv},m_[d_]={renderer:c_,headless:c_,handler:f_},m_[p_]={};const w_=new Bg;function k_(t){const e=t.clip;if(Y(e))e(rm(w_.clear()));else{if(!e)return;w_.set(0,0,t.group.width,t.group.height)}t.bounds.intersect(w_)}function M_(t,e,n){return t===e||("path"===n?A_(t,e):t instanceof Date&&e instanceof Date?+t==+e:ht(t)&&ht(e)?Math.abs(t-e)<=1e-9:t&&e&&(x(t)||x(e))?function(t,e){var n,r,i=Object.keys(t),o=Object.keys(e);if(i.length!==o.length)return!1;for(i.sort(),o.sort(),r=i.length-1;r>=0;r--)if(i[r]!=o[r])return!1;for(r=i.length-1;r>=0;r--)if(!M_(t[n=i[r]],e[n],n))return!1;return typeof t==typeof e}(t,e):t==e)}function A_(t,e){return M_(Yp(t),Yp(e))}const E_="top",D_="left",C_="right",F_="bottom",S_="start",$_="middle",T_="end",B_="group",N_="axis",z_="title",O_="frame",R_="scope",L_="legend",U_="row-header",q_="row-footer",P_="row-title",j_="column-header",I_="column-footer",W_="column-title",H_="padding",Y_="fit",G_="fit-x",V_="fit-y",X_="none",J_="all",Z_="each",Q_="flush",K_="column",tx="row";function ex(t){La.call(this,null,t)}function nx(t,e,n){return e(t.bounds.clear(),t,n)}st(ex,La,{transform(t,e){const n=e.dataflow,r=t.mark,i=r.marktype,o=Sy[i],a=o.bound;let s,u=r.bounds;if(o.nested)r.items.length&&n.dirty(r.items[0]),u=nx(r,a),r.items.forEach((t=>{t.bounds.clear().union(u)}));else if(i===B_||t.modified())switch(e.visit(e.MOD,(t=>n.dirty(t))),u.clear(),r.items.forEach((t=>u.union(nx(t,a)))),r.role){case N_:case L_:case z_:e.reflow()}else s=e.changed(e.REM),e.visit(e.ADD,(t=>{u.union(nx(t,a))})),e.visit(e.MOD,(t=>{s=s||u.alignsWith(t.bounds),n.dirty(t),u.union(nx(t,a))})),s&&(u.clear(),r.items.forEach((t=>u.union(t.bounds))));return k_(r),e.modifies("bounds")}});const rx=":vega_identifier:";function ix(t){La.call(this,0,t)}function ox(t){La.call(this,null,t)}function ax(t){La.call(this,null,t)}ix.Definition={type:"Identifier",metadata:{modifies:!0},params:[{name:"as",type:"string",required:!0}]},st(ix,La,{transform(t,e){const n=(i=e.dataflow)._signals[rx]||(i._signals[rx]=i.add(0)),r=t.as;var i;let o=n.value;return e.visit(e.ADD,(t=>t[r]=t[r]||++o)),n.set(this.value=o),e}}),st(ox,La,{transform(t,e){let n=this.value;n||(n=e.dataflow.scenegraph().mark(t.markdef,function(t){const e=t.groups,n=t.parent;return e&&1===e.size?e.get(Object.keys(e.object)[0]):e&&n?e.lookup(n):null}(t),t.index),n.group.context=t.context,t.context.group||(t.context.group=n.group),n.source=this.source,n.clip=t.clip,n.interactive=t.interactive,this.value=n);const r=n.marktype===B_?zg:Ng;return e.visit(e.ADD,(t=>r.call(t,n))),(t.modified("clip")||t.modified("interactive"))&&(n.clip=t.clip,n.interactive=!!t.interactive,n.zdirty=!0,e.reflow()),n.items=e.source,e}});const sx={parity:t=>t.filter(((t,e)=>e%2?t.opacity=0:1)),greedy:(t,e)=>{let n;return t.filter(((t,r)=>r&&ux(n.bounds,t.bounds,e)?t.opacity=0:(n=t,1)))}},ux=(t,e,n)=>n>Math.max(e.x1-t.x2,t.x1-e.x2,e.y1-t.y2,t.y1-e.y2),lx=(t,e)=>{for(var n,r=1,i=t.length,o=t[0].bounds;r<i;o=n,++r)if(ux(o,n=t[r].bounds,e))return!0},cx=t=>{const e=t.bounds;return e.width()>1&&e.height()>1},fx=t=>(t.forEach((t=>t.opacity=1)),t),hx=(t,e)=>t.reflow(e.modified()).modifies("opacity");function dx(t){La.call(this,null,t)}st(ax,La,{transform(t,e){const n=sx[t.method]||sx.parity,r=t.separation||0;let i,o,a=e.materialize(e.SOURCE).source;if(!a||!a.length)return;if(!t.method)return t.modified("method")&&(fx(a),e=hx(e,t)),e;if(a=a.filter(cx),!a.length)return;if(t.sort&&(a=a.slice().sort(t.sort)),i=fx(a),e=hx(e,t),i.length>=3&&lx(i,r)){do{i=n(i,r)}while(i.length>=3&&lx(i,r));i.length<3&&!A(a).opacity&&(i.length>1&&(A(i).opacity=0),A(a).opacity=1)}t.boundScale&&t.boundTolerance>=0&&(o=((t,e,n)=>{var r=t.range(),i=new Bg;return e===E_||e===F_?i.set(r[0],-1/0,r[1],1/0):i.set(-1/0,r[0],1/0,r[1]),i.expand(n||1),t=>i.encloses(t.bounds)})(t.boundScale,t.boundOrient,+t.boundTolerance),a.forEach((t=>{o(t)||(t.opacity=0)})));const s=i[0].mark.bounds.clear();return a.forEach((t=>{t.opacity&&s.union(t.bounds)})),e}}),st(dx,La,{transform(t,e){const n=e.dataflow;if(e.visit(e.ALL,(t=>n.dirty(t))),e.fields&&e.fields.zindex){const t=e.source&&e.source[0];t&&(t.mark.zdirty=!0)}}});const px=new Bg;function gx(t,e,n){return t[e]===n?0:(t[e]=n,1)}function mx(t){var e=t.items[0].orient;return e===D_||e===C_}function yx(t,e,n,r){var i,o,a=e.items[0],s=a.datum,u=null!=a.translate?a.translate:.5,l=a.orient,c=function(t){let e=+t.grid;return[t.ticks?e++:-1,t.labels?e++:-1,e+ +t.domain]}(s),f=a.range,h=a.offset,d=a.position,p=a.minExtent,g=a.maxExtent,m=s.title&&a.items[c[2]].items[0],y=a.titlePadding,v=a.bounds,_=m&&_y(m),x=0,b=0;switch(px.clear().union(v),v.clear(),(i=c[0])>-1&&v.union(a.items[i].bounds),(i=c[1])>-1&&v.union(a.items[i].bounds),l){case E_:x=d||0,b=-h,o=Math.max(p,Math.min(g,-v.y1)),v.add(0,-o).add(f,0),m&&vx(t,m,o,y,_,0,-1,v);break;case D_:x=-h,b=d||0,o=Math.max(p,Math.min(g,-v.x1)),v.add(-o,0).add(0,f),m&&vx(t,m,o,y,_,1,-1,v);break;case C_:x=n+h,b=d||0,o=Math.max(p,Math.min(g,v.x2)),v.add(0,0).add(o,f),m&&vx(t,m,o,y,_,1,1,v);break;case F_:x=d||0,b=r+h,o=Math.max(p,Math.min(g,v.y2)),v.add(0,0).add(f,o),m&&vx(t,m,o,y,0,0,1,v);break;default:x=a.x,b=a.y}return Ug(v.translate(x,b),a),gx(a,"x",x+u)|gx(a,"y",b+u)&&(a.bounds=px,t.dirty(a),a.bounds=v,t.dirty(a)),a.mark.bounds.clear().union(v)}function vx(t,e,n,r,i,o,a,s){const u=e.bounds;if(e.auto){const s=a*(n+i+r);let l=0,c=0;t.dirty(e),o?l=(e.x||0)-(e.x=s):c=(e.y||0)-(e.y=s),e.mark.bounds.clear().union(u.translate(-l,-c)),t.dirty(e)}s.union(u)}const _x=(t,e)=>Math.floor(Math.min(t,e)),xx=(t,e)=>Math.ceil(Math.max(t,e));function bx(t){return(new Bg).set(0,0,t.width||0,t.height||0)}function wx(t){const e=t.bounds.clone();return e.empty()?e.set(0,0,0,0):e.translate(-(t.x||0),-(t.y||0))}function kx(t,e,n){const r=x(t)?t[e]:t;return null!=r?r:void 0!==n?n:0}function Mx(t){return t<0?Math.ceil(-t):0}function Ax(t,e,n){var r,i,o,a,s,u,l,c,f,h,d,p=!n.nodirty,g=n.bounds===Q_?bx:wx,m=px.set(0,0,0,0),y=kx(n.align,K_),v=kx(n.align,tx),_=kx(n.padding,K_),x=kx(n.padding,tx),b=n.columns||e.length,w=b<=0?1:Math.ceil(e.length/b),k=e.length,M=Array(k),A=Array(b),E=0,D=Array(k),C=Array(w),F=0,S=Array(k),$=Array(k),T=Array(k);for(i=0;i<b;++i)A[i]=0;for(i=0;i<w;++i)C[i]=0;for(i=0;i<k;++i)u=e[i],s=T[i]=g(u),u.x=u.x||0,S[i]=0,u.y=u.y||0,$[i]=0,o=i%b,a=~~(i/b),E=Math.max(E,l=Math.ceil(s.x2)),F=Math.max(F,c=Math.ceil(s.y2)),A[o]=Math.max(A[o],l),C[a]=Math.max(C[a],c),M[i]=_+Mx(s.x1),D[i]=x+Mx(s.y1),p&&t.dirty(e[i]);for(i=0;i<k;++i)i%b==0&&(M[i]=0),i<b&&(D[i]=0);if(y===Z_)for(o=1;o<b;++o){for(d=0,i=o;i<k;i+=b)d<M[i]&&(d=M[i]);for(i=o;i<k;i+=b)M[i]=d+A[o-1]}else if(y===J_){for(d=0,i=0;i<k;++i)i%b&&d<M[i]&&(d=M[i]);for(i=0;i<k;++i)i%b&&(M[i]=d+E)}else for(y=!1,o=1;o<b;++o)for(i=o;i<k;i+=b)M[i]+=A[o-1];if(v===Z_)for(a=1;a<w;++a){for(d=0,r=(i=a*b)+b;i<r;++i)d<D[i]&&(d=D[i]);for(i=a*b;i<r;++i)D[i]=d+C[a-1]}else if(v===J_){for(d=0,i=b;i<k;++i)d<D[i]&&(d=D[i]);for(i=b;i<k;++i)D[i]=d+F}else for(v=!1,a=1;a<w;++a)for(r=(i=a*b)+b;i<r;++i)D[i]+=C[a-1];for(f=0,i=0;i<k;++i)f=M[i]+(i%b?f:0),S[i]+=f-e[i].x;for(o=0;o<b;++o)for(h=0,i=o;i<k;i+=b)h+=D[i],$[i]+=h-e[i].y;if(y&&kx(n.center,K_)&&w>1)for(i=0;i<k;++i)(f=(s=y===J_?E:A[i%b])-T[i].x2-e[i].x-S[i])>0&&(S[i]+=f/2);if(v&&kx(n.center,tx)&&1!==b)for(i=0;i<k;++i)(h=(s=v===J_?F:C[~~(i/b)])-T[i].y2-e[i].y-$[i])>0&&($[i]+=h/2);for(i=0;i<k;++i)m.union(T[i].translate(S[i],$[i]));switch(f=kx(n.anchor,"x"),h=kx(n.anchor,"y"),kx(n.anchor,K_)){case T_:f-=m.width();break;case $_:f-=m.width()/2}switch(kx(n.anchor,tx)){case T_:h-=m.height();break;case $_:h-=m.height()/2}for(f=Math.round(f),h=Math.round(h),m.clear(),i=0;i<k;++i)e[i].mark.bounds.clear();for(i=0;i<k;++i)(u=e[i]).x+=S[i]+=f,u.y+=$[i]+=h,m.union(u.mark.bounds.union(u.bounds.translate(S[i],$[i]))),p&&t.dirty(u);return m}function Ex(t,e,n){var r,i,o,a,s,u,l,c=function(t){var e,n,r=t.items,i=r.length,o=0;const a={marks:[],rowheaders:[],rowfooters:[],colheaders:[],colfooters:[],rowtitle:null,coltitle:null};for(;o<i;++o)if(n=(e=r[o]).items,e.marktype===B_)switch(e.role){case N_:case L_:case z_:break;case U_:a.rowheaders.push(...n);break;case q_:a.rowfooters.push(...n);break;case j_:a.colheaders.push(...n);break;case I_:a.colfooters.push(...n);break;case P_:a.rowtitle=n[0];break;case W_:a.coltitle=n[0];break;default:a.marks.push(...n)}return a}(e),f=c.marks,h=n.bounds===Q_?Dx:Cx,d=n.offset,p=n.columns||f.length,g=p<=0?1:Math.ceil(f.length/p),m=g*p;const y=Ax(t,f,n);y.empty()&&y.set(0,0,0,0),c.rowheaders&&(u=kx(n.headerBand,tx,null),r=Fx(t,c.rowheaders,f,p,g,-kx(d,"rowHeader"),_x,0,h,"x1",0,p,1,u)),c.colheaders&&(u=kx(n.headerBand,K_,null),i=Fx(t,c.colheaders,f,p,p,-kx(d,"columnHeader"),_x,1,h,"y1",0,1,p,u)),c.rowfooters&&(u=kx(n.footerBand,tx,null),o=Fx(t,c.rowfooters,f,p,g,kx(d,"rowFooter"),xx,0,h,"x2",p-1,p,1,u)),c.colfooters&&(u=kx(n.footerBand,K_,null),a=Fx(t,c.colfooters,f,p,p,kx(d,"columnFooter"),xx,1,h,"y2",m-p,1,p,u)),c.rowtitle&&(s=kx(n.titleAnchor,tx),l=kx(d,"rowTitle"),l=s===T_?o+l:r-l,u=kx(n.titleBand,tx,.5),Sx(t,c.rowtitle,l,0,y,u)),c.coltitle&&(s=kx(n.titleAnchor,K_),l=kx(d,"columnTitle"),l=s===T_?a+l:i-l,u=kx(n.titleBand,K_,.5),Sx(t,c.coltitle,l,1,y,u))}function Dx(t,e){return"x1"===e?t.x||0:"y1"===e?t.y||0:"x2"===e?(t.x||0)+(t.width||0):"y2"===e?(t.y||0)+(t.height||0):void 0}function Cx(t,e){return t.bounds[e]}function Fx(t,e,n,r,i,o,a,s,u,l,c,f,h,d){var p,g,m,y,v,_,x,b,w,k=n.length,M=0,A=0;if(!k)return M;for(p=c;p<k;p+=f)n[p]&&(M=a(M,u(n[p],l)));if(!e.length)return M;for(e.length>i&&(t.warn("Grid headers exceed limit: "+i),e=e.slice(0,i)),M+=o,g=0,y=e.length;g<y;++g)t.dirty(e[g]),e[g].mark.bounds.clear();for(p=c,g=0,y=e.length;g<y;++g,p+=f){for(v=(_=e[g]).mark.bounds,m=p;m>=0&&null==(x=n[m]);m-=h);s?(b=null==d?x.x:Math.round(x.bounds.x1+d*x.bounds.width()),w=M):(b=M,w=null==d?x.y:Math.round(x.bounds.y1+d*x.bounds.height())),v.union(_.bounds.translate(b-(_.x||0),w-(_.y||0))),_.x=b,_.y=w,t.dirty(_),A=a(A,v[l])}return A}function Sx(t,e,n,r,i,o){if(e){t.dirty(e);var a=n,s=n;r?a=Math.round(i.x1+o*i.width()):s=Math.round(i.y1+o*i.height()),e.bounds.translate(a-(e.x||0),s-(e.y||0)),e.mark.bounds.clear().union(e.bounds),e.x=a,e.y=s,t.dirty(e)}}function $x(t,e,n,r,i,o,a){const s=function(t,e){const n=t[e]||{};return(e,r)=>null!=n[e]?n[e]:null!=t[e]?t[e]:r}(n,e),u=function(t,e){let n=-1/0;return t.forEach((t=>{null!=t.offset&&(n=Math.max(n,t.offset))})),n>-1/0?n:e}(t,s("offset",0)),l=s("anchor",S_),c=l===T_?1:l===$_?.5:0,f={align:Z_,bounds:s("bounds",Q_),columns:"vertical"===s("direction")?1:t.length,padding:s("margin",8),center:s("center"),nodirty:!0};switch(e){case D_:f.anchor={x:Math.floor(r.x1)-u,column:T_,y:c*(a||r.height()+2*r.y1),row:l};break;case C_:f.anchor={x:Math.ceil(r.x2)+u,y:c*(a||r.height()+2*r.y1),row:l};break;case E_:f.anchor={y:Math.floor(i.y1)-u,row:T_,x:c*(o||i.width()+2*i.x1),column:l};break;case F_:f.anchor={y:Math.ceil(i.y2)+u,x:c*(o||i.width()+2*i.x1),column:l};break;case"top-left":f.anchor={x:u,y:u};break;case"top-right":f.anchor={x:o-u,y:u,column:T_};break;case"bottom-left":f.anchor={x:u,y:a-u,row:T_};break;case"bottom-right":f.anchor={x:o-u,y:a-u,column:T_,row:T_}}return f}function Tx(t,e){var n,r,i=e.items[0],o=i.datum,a=i.orient,s=i.bounds,u=i.x,l=i.y;return i._bounds?i._bounds.clear().union(s):i._bounds=s.clone(),s.clear(),function(t,e,n){var r=e.padding,i=r-n.x,o=r-n.y;if(e.datum.title){var a=e.items[1].items[0],s=a.anchor,u=e.titlePadding||0,l=r-a.x,c=r-a.y;switch(a.orient){case D_:i+=Math.ceil(a.bounds.width())+u;break;case C_:case F_:break;default:o+=a.bounds.height()+u}switch((i||o)&&Nx(t,n,i,o),a.orient){case D_:c+=Bx(e,n,a,s,1,1);break;case C_:l+=Bx(e,n,a,T_,0,0)+u,c+=Bx(e,n,a,s,1,1);break;case F_:l+=Bx(e,n,a,s,0,0),c+=Bx(e,n,a,T_,-1,0,1)+u;break;default:l+=Bx(e,n,a,s,0,0)}(l||c)&&Nx(t,a,l,c),(l=Math.round(a.bounds.x1-r))<0&&(Nx(t,n,-l,0),Nx(t,a,-l,0))}else(i||o)&&Nx(t,n,i,o)}(t,i,i.items[0].items[0]),s=function(t,e){return t.items.forEach((t=>e.union(t.bounds))),e.x1=t.padding,e.y1=t.padding,e}(i,s),n=2*i.padding,r=2*i.padding,s.empty()||(n=Math.ceil(s.width()+n),r=Math.ceil(s.height()+r)),"symbol"===o.type&&function(t){const e=t.reduce(((t,e)=>(t[e.column]=Math.max(e.bounds.x2-e.x,t[e.column]||0),t)),{});t.forEach((t=>{t.width=e[t.column],t.height=t.bounds.y2-t.y}))}(i.items[0].items[0].items[0].items),a!==X_&&(i.x=u=0,i.y=l=0),i.width=n,i.height=r,Ug(s.set(u,l,u+n,l+r),i),i.mark.bounds.clear().union(s),i}function Bx(t,e,n,r,i,o,a){const s="symbol"!==t.datum.type,u=n.datum.vgrad,l=(!s||!o&&u||a?e:e.items[0]).bounds[i?"y2":"x2"]-t.padding,c=u&&o?l:0,f=u&&o?0:l,h=i<=0?0:_y(n);return Math.round(r===S_?c:r===T_?f-h:.5*(l-h))}function Nx(t,e,n,r){e.x+=n,e.y+=r,e.bounds.translate(n,r),e.mark.bounds.translate(n,r),t.dirty(e)}function zx(t){La.call(this,null,t)}st(zx,La,{transform(t,e){const n=e.dataflow;return t.mark.items.forEach((e=>{t.layout&&Ex(n,e,t.layout),function(t,e,n){var r,i,o,a,s,u=e.items,l=Math.max(0,e.width||0),c=Math.max(0,e.height||0),f=(new Bg).set(0,0,l,c),h=f.clone(),d=f.clone(),p=[];for(a=0,s=u.length;a<s;++a)switch((i=u[a]).role){case N_:(mx(i)?h:d).union(yx(t,i,l,c));break;case z_:r=i;break;case L_:p.push(Tx(t,i));break;case O_:case R_:case U_:case q_:case P_:case j_:case I_:case W_:h.union(i.bounds),d.union(i.bounds);break;default:f.union(i.bounds)}if(p.length){const e={};p.forEach((t=>{(o=t.orient||C_)!==X_&&(e[o]||(e[o]=[])).push(t)}));for(const r in e){const i=e[r];Ax(t,i,$x(i,r,n.legends,h,d,l,c))}p.forEach((e=>{const r=e.bounds;if(r.equals(e._bounds)||(e.bounds=e._bounds,t.dirty(e),e.bounds=r,t.dirty(e)),!n.autosize||n.autosize.type!==Y_&&n.autosize.type!==G_&&n.autosize.type!==V_)f.union(r);else switch(e.orient){case D_:case C_:f.add(r.x1,0).add(r.x2,0);break;case E_:case F_:f.add(0,r.y1).add(0,r.y2)}}))}f.union(h).union(d),r&&f.union(function(t,e,n,r,i){var o,a=e.items[0],s=a.frame,u=a.orient,l=a.anchor,c=a.offset,f=a.padding,h=a.items[0].items[0],d=a.items[1]&&a.items[1].items[0],p=u===D_||u===C_?r:n,g=0,m=0,y=0,v=0,_=0;if(s!==B_?u===D_?(g=i.y2,p=i.y1):u===C_?(g=i.y1,p=i.y2):(g=i.x1,p=i.x2):u===D_&&(g=r,p=0),o=l===S_?g:l===T_?p:(g+p)/2,d&&d.text){switch(u){case E_:case F_:_=h.bounds.height()+f;break;case D_:v=h.bounds.width()+f;break;case C_:v=-h.bounds.width()-f}px.clear().union(d.bounds),px.translate(v-(d.x||0),_-(d.y||0)),gx(d,"x",v)|gx(d,"y",_)&&(t.dirty(d),d.bounds.clear().union(px),d.mark.bounds.clear().union(px),t.dirty(d)),px.clear().union(d.bounds)}else px.clear();switch(px.union(h.bounds),u){case E_:m=o,y=i.y1-px.height()-c;break;case D_:m=i.x1-px.width()-c,y=o;break;case C_:m=i.x2+px.width()+c,y=o;break;case F_:m=o,y=i.y2+c;break;default:m=a.x,y=a.y}return gx(a,"x",m)|gx(a,"y",y)&&(px.translate(m,y),t.dirty(a),a.bounds.clear().union(px),e.bounds.clear().union(px),t.dirty(a)),a.bounds}(t,r,l,c,f));e.clip&&f.set(0,0,e.width||0,e.height||0);!function(t,e,n,r){const i=r.autosize||{},o=i.type;if(t._autosize<1||!o)return;let a=t._width,s=t._height,u=Math.max(0,e.width||0),l=Math.max(0,Math.ceil(-n.x1)),c=Math.max(0,e.height||0),f=Math.max(0,Math.ceil(-n.y1));const h=Math.max(0,Math.ceil(n.x2-u)),d=Math.max(0,Math.ceil(n.y2-c));if(i.contains===H_){const e=t.padding();a-=e.left+e.right,s-=e.top+e.bottom}o===X_?(l=0,f=0,u=a,c=s):o===Y_?(u=Math.max(0,a-l-h),c=Math.max(0,s-f-d)):o===G_?(u=Math.max(0,a-l-h),s=c+f+d):o===V_?(a=u+l+h,c=Math.max(0,s-f-d)):"pad"===o&&(a=u+l+h,s=c+f+d);t._resizeView(a,s,u,c,[l,f],i.resize)}(t,e,f,n)}(n,e,t)})),function(t){return t&&"legend-entry"!==t.mark.role}(t.mark.group)?e.reflow():e}});var Ox=Object.freeze({__proto__:null,bound:ex,identifier:ix,mark:ox,overlap:ax,render:dx,viewlayout:zx});function Rx(t){La.call(this,null,t)}function Lx(t){La.call(this,null,t)}function Ux(){return sa({})}function qx(t){La.call(this,null,t)}function Px(t){La.call(this,[],t)}st(Rx,La,{transform(t,e){if(this.value&&!t.modified())return e.StopPropagation;var n=e.dataflow.locale(),r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=this.value,o=t.scale,a=yp(o,null==t.count?t.values?t.values.length:10:t.count,t.minstep),s=t.format||xp(n,o,a,t.formatSpecifier,t.formatType,!!t.values),u=t.values?vp(o,t.values,a):_p(o,a);return i&&(r.rem=i),i=u.map(((t,e)=>sa({index:e/(u.length-1||1),value:t,label:s(t)}))),t.extra&&i.length&&i.push(sa({index:-1,extra:{value:i[0].value},label:""})),r.source=i,r.add=i,this.value=i,r}}),st(Lx,La,{transform(t,e){var n=e.dataflow,r=e.fork(e.NO_SOURCE|e.NO_FIELDS),i=t.item||Ux,o=t.key||oa,a=this.value;return _(r.encode)&&(r.encode=null),a&&(t.modified("key")||e.modified(o))&&s("DataJoin does not support modified key function or fields."),a||(e=e.addAll(),this.value=a=function(t){const e=ot().test((t=>t.exit));return e.lookup=n=>e.get(t(n)),e}(o)),e.visit(e.ADD,(t=>{const e=o(t);let n=a.get(e);n?n.exit?(a.empty--,r.add.push(n)):r.mod.push(n):(n=i(t),a.set(e,n),r.add.push(n)),n.datum=t,n.exit=!1})),e.visit(e.MOD,(t=>{const e=o(t),n=a.get(e);n&&(n.datum=t,r.mod.push(n))})),e.visit(e.REM,(t=>{const e=o(t),n=a.get(e);t!==n.datum||n.exit||(r.rem.push(n),n.exit=!0,++a.empty)})),e.changed(e.ADD_MOD)&&r.modifies("datum"),(e.clean()||t.clean&&a.empty>n.cleanThreshold)&&n.runAfter(a.clean),r}}),st(qx,La,{transform(t,e){var n=e.fork(e.ADD_REM),r=t.mod||!1,i=t.encoders,o=e.encode;if(_(o)){if(!n.changed()&&!o.every((t=>i[t])))return e.StopPropagation;o=o[0],n.encode=null}var a="enter"===o,s=i.update||g,u=i.enter||g,l=i.exit||g,c=(o&&!a?i[o]:s)||g;if(e.changed(e.ADD)&&(e.visit(e.ADD,(e=>{u(e,t),s(e,t)})),n.modifies(u.output),n.modifies(s.output),c!==g&&c!==s&&(e.visit(e.ADD,(e=>{c(e,t)})),n.modifies(c.output))),e.changed(e.REM)&&l!==g&&(e.visit(e.REM,(e=>{l(e,t)})),n.modifies(l.output)),a||c!==g){const i=e.MOD|(t.modified()?e.REFLOW:0);a?(e.visit(i,(e=>{const i=u(e,t)||r;(c(e,t)||i)&&n.mod.push(e)})),n.mod.length&&n.modifies(u.output)):e.visit(i,(e=>{(c(e,t)||r)&&n.mod.push(e)})),n.mod.length&&n.modifies(c.output)}return n.changed()?n:e.StopPropagation}}),st(Px,La,{transform(t,e){if(null!=this.value&&!t.modified())return e.StopPropagation;var n,r,i,o,a,s=e.dataflow.locale(),u=e.fork(e.NO_SOURCE|e.NO_FIELDS),l=this.value,c=t.type||dp,f=t.scale,h=+t.limit,d=yp(f,null==t.count?5:t.count,t.minstep),p=!!t.values||c===dp,g=t.format||Ap(s,f,d,c,t.formatSpecifier,t.formatType,p),m=t.values||Mp(f,d);return l&&(u.rem=l),c===dp?(h&&m.length>h?(e.dataflow.warn("Symbol legend count exceeds limit, filtering items."),l=m.slice(0,h-1),a=!0):l=m,Y(i=t.size)?(t.values||0!==f(l[0])||(l=l.slice(1)),o=l.reduce(((e,n)=>Math.max(e,i(n,t))),0)):i=Q(o=i||8),l=l.map(((e,n)=>sa({index:n,label:g(e,n,l),value:e,offset:o,size:i(e,t)}))),a&&(a=m[l.length],l.push(sa({index:l.length,label:`…${m.length-l.length} entries`,value:a,offset:o,size:i(a,t)})))):"gradient"===c?(n=f.domain(),r=sp(f,n[0],A(n)),m.length<3&&!t.values&&n[0]!==A(n)&&(m=[n[0],A(n)]),l=m.map(((t,e)=>sa({index:e,label:g(t,e,m),value:t,perc:r(t)})))):(i=m.length-1,r=function(t){const e=t.domain(),n=e.length-1;let r=+e[0],i=+A(e),o=i-r;if(t.type===Sd){const t=n?o/n:.1;r-=t,i+=t,o=i-r}return t=>(t-r)/o}(f),l=m.map(((t,e)=>sa({index:e,label:g(t,e,m),value:t,perc:e?r(t):0,perc2:e===i?1:r(m[e+1])})))),u.source=l,u.add=l,this.value=l,u}});const jx=t=>t.source.x,Ix=t=>t.source.y,Wx=t=>t.target.x,Hx=t=>t.target.y;function Yx(t){La.call(this,{},t)}Yx.Definition={type:"LinkPath",metadata:{modifies:!0},params:[{name:"sourceX",type:"field",default:"source.x"},{name:"sourceY",type:"field",default:"source.y"},{name:"targetX",type:"field",default:"target.x"},{name:"targetY",type:"field",default:"target.y"},{name:"orient",type:"enum",default:"vertical",values:["horizontal","vertical","radial"]},{name:"shape",type:"enum",default:"line",values:["line","arc","curve","diagonal","orthogonal"]},{name:"require",type:"signal"},{name:"as",type:"string",default:"path"}]},st(Yx,La,{transform(t,e){var n=t.sourceX||jx,r=t.sourceY||Ix,i=t.targetX||Wx,o=t.targetY||Hx,a=t.as||"path",u=t.orient||"vertical",l=t.shape||"line",c=Jx.get(l+"-"+u)||Jx.get(l);return c||s("LinkPath unsupported type: "+t.shape+(t.orient?"-"+t.orient:"")),e.visit(e.SOURCE,(t=>{t[a]=c(n(t),r(t),i(t),o(t))})),e.reflow(t.modified()).modifies(a)}});const Gx=(t,e,n,r)=>"M"+t+","+e+"L"+n+","+r,Vx=(t,e,n,r)=>{var i=n-t,o=r-e,a=Math.hypot(i,o)/2;return"M"+t+","+e+"A"+a+","+a+" "+180*Math.atan2(o,i)/Math.PI+" 0 1 "+n+","+r},Xx=(t,e,n,r)=>{const i=n-t,o=r-e,a=.2*(i+o),s=.2*(o-i);return"M"+t+","+e+"C"+(t+a)+","+(e+s)+" "+(n+s)+","+(r-a)+" "+n+","+r},Jx=ot({line:Gx,"line-radial":(t,e,n,r)=>Gx(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),arc:Vx,"arc-radial":(t,e,n,r)=>Vx(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),curve:Xx,"curve-radial":(t,e,n,r)=>Xx(e*Math.cos(t),e*Math.sin(t),r*Math.cos(n),r*Math.sin(n)),"orthogonal-horizontal":(t,e,n,r)=>"M"+t+","+e+"V"+r+"H"+n,"orthogonal-vertical":(t,e,n,r)=>"M"+t+","+e+"H"+n+"V"+r,"orthogonal-radial":(t,e,n,r)=>{const i=Math.cos(t),o=Math.sin(t),a=Math.cos(n),s=Math.sin(n);return"M"+e*i+","+e*o+"A"+e+","+e+" 0 0,"+((Math.abs(n-t)>Math.PI?n<=t:n>t)?1:0)+" "+e*a+","+e*s+"L"+r*a+","+r*s},"diagonal-horizontal":(t,e,n,r)=>{const i=(t+n)/2;return"M"+t+","+e+"C"+i+","+e+" "+i+","+r+" "+n+","+r},"diagonal-vertical":(t,e,n,r)=>{const i=(e+r)/2;return"M"+t+","+e+"C"+t+","+i+" "+n+","+i+" "+n+","+r},"diagonal-radial":(t,e,n,r)=>{const i=Math.cos(t),o=Math.sin(t),a=Math.cos(n),s=Math.sin(n),u=(e+r)/2;return"M"+e*i+","+e*o+"C"+u*i+","+u*o+" "+u*a+","+u*s+" "+r*a+","+r*s}});function Zx(t){La.call(this,null,t)}Zx.Definition={type:"Pie",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"startAngle",type:"number",default:0},{name:"endAngle",type:"number",default:6.283185307179586},{name:"sort",type:"boolean",default:!1},{name:"as",type:"string",array:!0,length:2,default:["startAngle","endAngle"]}]},st(Zx,La,{transform(t,e){var n,r,i,o=t.as||["startAngle","endAngle"],a=o[0],s=o[1],u=t.field||d,l=t.startAngle||0,c=null!=t.endAngle?t.endAngle:2*Math.PI,f=e.source,h=f.map(u),p=h.length,g=l,m=(c-l)/we(h),y=be(p);for(t.sort&&y.sort(((t,e)=>h[t]-h[e])),n=0;n<p;++n)i=h[y[n]],(r=f[y[n]])[a]=g,r[s]=g+=i*m;return this.value=h,e.reflow(t.modified()).modifies(o)}});function Qx(t){return Zd(t)&&t!==Ed}const Kx=Dt(["set","modified","clear","type","scheme","schemeExtent","schemeCount","domain","domainMin","domainMid","domainMax","domainRaw","domainImplicit","nice","zero","bins","range","rangeStep","round","reverse","interpolate","interpolateGamma"]);function tb(t){La.call(this,null,t),this.modified(!0)}function eb(t,e,n){tp(t)&&(Math.abs(e.reduce(((t,e)=>t+(e<0?-1:e>0?1:0)),0))!==e.length&&n.warn("Log scale domain includes zero: "+wt(e)));return e}function nb(t,e,n){return Y(t)&&(e||n)?ip(t,rb(e||[0,1],n)):t}function rb(t,e){return e?t.slice().reverse():t}function ib(t){La.call(this,null,t)}st(tb,La,{transform(t,e){var n=e.dataflow,r=this.value,i=function(t){var e,n=t.type,r="";if(n===Ed)return Ed+"-"+_d;(function(t){const e=t.type;return Zd(e)&&e!==Md&&e!==Ad&&(t.scheme||t.range&&t.range.length&&t.range.every(pt))})(t)&&(r=2===(e=t.rawDomain?t.rawDomain.length:t.domain?t.domain.length+ +(null!=t.domainMid):0)?Ed+"-":3===e?Dd+"-":"");return(r+n||_d).toLowerCase()}(t);for(i in r&&i===r.type||(this.value=r=Vd(i)()),t)if(!Kx[i]){if("padding"===i&&Qx(r.type))continue;Y(r[i])?r[i](t[i]):n.warn("Unsupported scale property: "+i)}return function(t,e,n){var r=t.type,i=e.round||!1,o=e.range;if(null!=e.rangeStep)o=function(t,e,n){t!==Bd&&t!==Td&&s("Only band and point scales support rangeStep.");var r=(null!=e.paddingOuter?e.paddingOuter:e.padding)||0,i=t===Td?1:(null!=e.paddingInner?e.paddingInner:e.padding)||0;return[0,e.rangeStep*vd(n,i,r)]}(r,e,n);else if(e.scheme&&(o=function(t,e,n){var r,i=e.schemeExtent;_(e.scheme)?r=op(e.scheme,e.interpolate,e.interpolateGamma):(r=hp(e.scheme.toLowerCase()))||s(`Unrecognized scheme name: ${e.scheme}`);return n=t===Sd?n+1:t===Nd?n-1:t===Cd||t===Fd?+e.schemeCount||5:n,ep(t)?nb(r,i,e.reverse):Y(r)?ap(nb(r,i),n):t===$d?r:r.slice(0,n)}(r,e,n),Y(o))){if(t.interpolator)return t.interpolator(o);s(`Scale type ${r} does not support interpolating color schemes.`)}if(o&&ep(r))return t.interpolator(op(rb(o,e.reverse),e.interpolate,e.interpolateGamma));o&&e.interpolate&&t.interpolate?t.interpolate(up(e.interpolate,e.interpolateGamma)):Y(t.round)?t.round(i):Y(t.rangeRound)&&t.interpolate(i?ih:rh);o&&t.range(rb(o,e.reverse))}(r,t,function(t,e,n){let r=e.bins;if(r&&!_(r)){const e=t.domain(),n=e[0],i=A(e),o=r.step;let a=null==r.start?n:r.start,u=null==r.stop?i:r.stop;o||s("Scale bins parameter missing step property."),a<n&&(a=o*Math.ceil(n/o)),u>i&&(u=o*Math.floor(i/o)),r=be(a,u+o/2,o)}r?t.bins=r:t.bins&&delete t.bins;t.type===Nd&&(r?e.domain||e.domainRaw||(t.domain(r),n=r.length):t.bins=t.domain());return n}(r,t,function(t,e,n){const r=function(t,e,n){return e?(t.domain(eb(t.type,e,n)),e.length):-1}(t,e.domainRaw,n);if(r>-1)return r;var i,o,a=e.domain,s=t.type,u=e.zero||void 0===e.zero&&function(t){const e=t.type;return!t.bins&&(e===_d||e===bd||e===wd)}(t);if(!a)return 0;if((u||null!=e.domainMin||null!=e.domainMax||null!=e.domainMid)&&(i=(a=a.slice()).length-1||1,u&&(a[0]>0&&(a[0]=0),a[i]<0&&(a[i]=0)),null!=e.domainMin&&(a[0]=e.domainMin),null!=e.domainMax&&(a[i]=e.domainMax),null!=e.domainMid)){const t=(o=e.domainMid)>a[i]?i+1:o<a[0]?0:i;t!==i&&n.warn("Scale domainMid exceeds domain min or max.",o),a.splice(t,0,o)}Qx(s)&&e.padding&&a[0]!==A(a)&&(a=function(t,e,n,r,i,o){var a=Math.abs(A(n)-n[0]),s=a/(a-2*r),u=t===xd?U(e,null,s):t===wd?q(e,null,s,.5):t===bd?q(e,null,s,i||1):t===kd?P(e,null,s,o||1):L(e,null,s);return e=e.slice(),e[0]=u[0],e[e.length-1]=u[1],e}(s,a,e.range,e.padding,e.exponent,e.constant));t.domain(eb(s,a,n)),s===$d&&t.unknown(e.domainImplicit?kc:void 0);e.nice&&t.nice&&t.nice(!0!==e.nice&&yp(t,e.nice)||null);return a.length}(r,t,n))),e.fork(e.NO_SOURCE|e.NO_FIELDS)}}),st(ib,La,{transform(t,e){const n=t.modified("sort")||e.changed(e.ADD)||e.modified(t.sort.fields)||e.modified("datum");return n&&e.source.sort(fa(t.sort)),this.modified(n),e}});const ob="zero",ab="center",sb="normalize",ub=["y0","y1"];function lb(t){La.call(this,null,t)}function cb(t,e,n,r,i){for(var o,a=(e-t.sum)/2,s=t.length,u=0;u<s;++u)(o=t[u])[r]=a,o[i]=a+=Math.abs(n(o))}function fb(t,e,n,r,i){for(var o,a=1/t.sum,s=0,u=t.length,l=0,c=0;l<u;++l)(o=t[l])[r]=s,o[i]=s=a*(c+=Math.abs(n(o)))}function hb(t,e,n,r,i){for(var o,a,s=0,u=0,l=t.length,c=0;c<l;++c)(o=+n(a=t[c]))<0?(a[r]=u,a[i]=u+=o):(a[r]=s,a[i]=s+=o)}lb.Definition={type:"Stack",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"groupby",type:"field",array:!0},{name:"sort",type:"compare"},{name:"offset",type:"enum",default:ob,values:[ob,ab,sb]},{name:"as",type:"string",array:!0,length:2,default:ub}]},st(lb,La,{transform(t,e){var n,r,i,o,a=t.as||ub,s=a[0],u=a[1],l=fa(t.sort),c=t.field||d,f=t.offset===ab?cb:t.offset===sb?fb:hb;for(n=function(t,e,n,r){var i,o,a,s,u,l,c,f,h,d=[],p=t=>t(u);if(null==e)d.push(t.slice());else for(i={},o=0,a=t.length;o<a;++o)u=t[o],(c=i[l=e.map(p)])||(i[l]=c=[],d.push(c)),c.push(u);for(l=0,h=0,s=d.length;l<s;++l){for(o=0,f=0,a=(c=d[l]).length;o<a;++o)f+=Math.abs(r(c[o]));c.sum=f,f>h&&(h=f),n&&c.sort(n)}return d.max=h,d}(e.source,t.groupby,l,c),r=0,i=n.length,o=n.max;r<i;++r)f(n[r],o,c,s,u);return e.reflow(t.modified()).modifies(a)}});var db=Object.freeze({__proto__:null,axisticks:Rx,datajoin:Lx,encode:qx,legendentries:Px,linkpath:Yx,pie:Zx,scale:tb,sortitems:ib,stack:lb}),pb=1e-6,gb=1e-12,mb=Math.PI,yb=mb/2,vb=mb/4,_b=2*mb,xb=180/mb,bb=mb/180,wb=Math.abs,kb=Math.atan,Mb=Math.atan2,Ab=Math.cos,Eb=Math.ceil,Db=Math.exp,Cb=Math.hypot,Fb=Math.log,Sb=Math.pow,$b=Math.sin,Tb=Math.sign||function(t){return t>0?1:t<0?-1:0},Bb=Math.sqrt,Nb=Math.tan;function zb(t){return t>1?0:t<-1?mb:Math.acos(t)}function Ob(t){return t>1?yb:t<-1?-yb:Math.asin(t)}function Rb(){}function Lb(t,e){t&&qb.hasOwnProperty(t.type)&&qb[t.type](t,e)}var Ub={Feature:function(t,e){Lb(t.geometry,e)},FeatureCollection:function(t,e){for(var n=t.features,r=-1,i=n.length;++r<i;)Lb(n[r].geometry,e)}},qb={Sphere:function(t,e){e.sphere()},Point:function(t,e){t=t.coordinates,e.point(t[0],t[1],t[2])},MultiPoint:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)t=n[r],e.point(t[0],t[1],t[2])},LineString:function(t,e){Pb(t.coordinates,e,0)},MultiLineString:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)Pb(n[r],e,0)},Polygon:function(t,e){jb(t.coordinates,e)},MultiPolygon:function(t,e){for(var n=t.coordinates,r=-1,i=n.length;++r<i;)jb(n[r],e)},GeometryCollection:function(t,e){for(var n=t.geometries,r=-1,i=n.length;++r<i;)Lb(n[r],e)}};function Pb(t,e,n){var r,i=-1,o=t.length-n;for(e.lineStart();++i<o;)r=t[i],e.point(r[0],r[1],r[2]);e.lineEnd()}function jb(t,e){var n=-1,r=t.length;for(e.polygonStart();++n<r;)Pb(t[n],e,1);e.polygonEnd()}function Ib(t,e){t&&Ub.hasOwnProperty(t.type)?Ub[t.type](t,e):Lb(t,e)}var Wb,Hb,Yb,Gb,Vb,Xb,Jb,Zb,Qb,Kb,tw,ew,nw,rw,iw,ow,aw=new Qt,sw=new Qt,uw={point:Rb,lineStart:Rb,lineEnd:Rb,polygonStart:function(){aw=new Qt,uw.lineStart=lw,uw.lineEnd=cw},polygonEnd:function(){var t=+aw;sw.add(t<0?_b+t:t),this.lineStart=this.lineEnd=this.point=Rb},sphere:function(){sw.add(_b)}};function lw(){uw.point=fw}function cw(){hw(Wb,Hb)}function fw(t,e){uw.point=hw,Wb=t,Hb=e,Yb=t*=bb,Gb=Ab(e=(e*=bb)/2+vb),Vb=$b(e)}function hw(t,e){var n=(t*=bb)-Yb,r=n>=0?1:-1,i=r*n,o=Ab(e=(e*=bb)/2+vb),a=$b(e),s=Vb*a,u=Gb*o+s*Ab(i),l=s*r*$b(i);aw.add(Mb(l,u)),Yb=t,Gb=o,Vb=a}function dw(t){return[Mb(t[1],t[0]),Ob(t[2])]}function pw(t){var e=t[0],n=t[1],r=Ab(n);return[r*Ab(e),r*$b(e),$b(n)]}function gw(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function mw(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function yw(t,e){t[0]+=e[0],t[1]+=e[1],t[2]+=e[2]}function vw(t,e){return[t[0]*e,t[1]*e,t[2]*e]}function _w(t){var e=Bb(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=e,t[1]/=e,t[2]/=e}var xw,bw,ww,kw,Mw,Aw,Ew,Dw,Cw,Fw,Sw,$w,Tw,Bw,Nw,zw,Ow={point:Rw,lineStart:Uw,lineEnd:qw,polygonStart:function(){Ow.point=Pw,Ow.lineStart=jw,Ow.lineEnd=Iw,rw=new Qt,uw.polygonStart()},polygonEnd:function(){uw.polygonEnd(),Ow.point=Rw,Ow.lineStart=Uw,Ow.lineEnd=qw,aw<0?(Xb=-(Zb=180),Jb=-(Qb=90)):rw>pb?Qb=90:rw<-1e-6&&(Jb=-90),ow[0]=Xb,ow[1]=Zb},sphere:function(){Xb=-(Zb=180),Jb=-(Qb=90)}};function Rw(t,e){iw.push(ow=[Xb=t,Zb=t]),e<Jb&&(Jb=e),e>Qb&&(Qb=e)}function Lw(t,e){var n=pw([t*bb,e*bb]);if(nw){var r=mw(nw,n),i=mw([r[1],-r[0],0],r);_w(i),i=dw(i);var o,a=t-Kb,s=a>0?1:-1,u=i[0]*xb*s,l=wb(a)>180;l^(s*Kb<u&&u<s*t)?(o=i[1]*xb)>Qb&&(Qb=o):l^(s*Kb<(u=(u+360)%360-180)&&u<s*t)?(o=-i[1]*xb)<Jb&&(Jb=o):(e<Jb&&(Jb=e),e>Qb&&(Qb=e)),l?t<Kb?Ww(Xb,t)>Ww(Xb,Zb)&&(Zb=t):Ww(t,Zb)>Ww(Xb,Zb)&&(Xb=t):Zb>=Xb?(t<Xb&&(Xb=t),t>Zb&&(Zb=t)):t>Kb?Ww(Xb,t)>Ww(Xb,Zb)&&(Zb=t):Ww(t,Zb)>Ww(Xb,Zb)&&(Xb=t)}else iw.push(ow=[Xb=t,Zb=t]);e<Jb&&(Jb=e),e>Qb&&(Qb=e),nw=n,Kb=t}function Uw(){Ow.point=Lw}function qw(){ow[0]=Xb,ow[1]=Zb,Ow.point=Rw,nw=null}function Pw(t,e){if(nw){var n=t-Kb;rw.add(wb(n)>180?n+(n>0?360:-360):n)}else tw=t,ew=e;uw.point(t,e),Lw(t,e)}function jw(){uw.lineStart()}function Iw(){Pw(tw,ew),uw.lineEnd(),wb(rw)>pb&&(Xb=-(Zb=180)),ow[0]=Xb,ow[1]=Zb,nw=null}function Ww(t,e){return(e-=t)<0?e+360:e}function Hw(t,e){return t[0]-e[0]}function Yw(t,e){return t[0]<=t[1]?t[0]<=e&&e<=t[1]:e<t[0]||t[1]<e}var Gw={sphere:Rb,point:Vw,lineStart:Jw,lineEnd:Kw,polygonStart:function(){Gw.lineStart=tk,Gw.lineEnd=ek},polygonEnd:function(){Gw.lineStart=Jw,Gw.lineEnd=Kw}};function Vw(t,e){t*=bb;var n=Ab(e*=bb);Xw(n*Ab(t),n*$b(t),$b(e))}function Xw(t,e,n){++xw,ww+=(t-ww)/xw,kw+=(e-kw)/xw,Mw+=(n-Mw)/xw}function Jw(){Gw.point=Zw}function Zw(t,e){t*=bb;var n=Ab(e*=bb);Bw=n*Ab(t),Nw=n*$b(t),zw=$b(e),Gw.point=Qw,Xw(Bw,Nw,zw)}function Qw(t,e){t*=bb;var n=Ab(e*=bb),r=n*Ab(t),i=n*$b(t),o=$b(e),a=Mb(Bb((a=Nw*o-zw*i)*a+(a=zw*r-Bw*o)*a+(a=Bw*i-Nw*r)*a),Bw*r+Nw*i+zw*o);bw+=a,Aw+=a*(Bw+(Bw=r)),Ew+=a*(Nw+(Nw=i)),Dw+=a*(zw+(zw=o)),Xw(Bw,Nw,zw)}function Kw(){Gw.point=Vw}function tk(){Gw.point=nk}function ek(){rk($w,Tw),Gw.point=Vw}function nk(t,e){$w=t,Tw=e,t*=bb,e*=bb,Gw.point=rk;var n=Ab(e);Bw=n*Ab(t),Nw=n*$b(t),zw=$b(e),Xw(Bw,Nw,zw)}function rk(t,e){t*=bb;var n=Ab(e*=bb),r=n*Ab(t),i=n*$b(t),o=$b(e),a=Nw*o-zw*i,s=zw*r-Bw*o,u=Bw*i-Nw*r,l=Cb(a,s,u),c=Ob(l),f=l&&-c/l;Cw.add(f*a),Fw.add(f*s),Sw.add(f*u),bw+=c,Aw+=c*(Bw+(Bw=r)),Ew+=c*(Nw+(Nw=i)),Dw+=c*(zw+(zw=o)),Xw(Bw,Nw,zw)}function ik(t,e){function n(n,r){return n=t(n,r),e(n[0],n[1])}return t.invert&&e.invert&&(n.invert=function(n,r){return(n=e.invert(n,r))&&t.invert(n[0],n[1])}),n}function ok(t,e){return wb(t)>mb&&(t-=Math.round(t/_b)*_b),[t,e]}function ak(t,e,n){return(t%=_b)?e||n?ik(uk(t),lk(e,n)):uk(t):e||n?lk(e,n):ok}function sk(t){return function(e,n){return wb(e+=t)>mb&&(e-=Math.round(e/_b)*_b),[e,n]}}function uk(t){var e=sk(t);return e.invert=sk(-t),e}function lk(t,e){var n=Ab(t),r=$b(t),i=Ab(e),o=$b(e);function a(t,e){var a=Ab(e),s=Ab(t)*a,u=$b(t)*a,l=$b(e),c=l*n+s*r;return[Mb(u*i-c*o,s*n-l*r),Ob(c*i+u*o)]}return a.invert=function(t,e){var a=Ab(e),s=Ab(t)*a,u=$b(t)*a,l=$b(e),c=l*i-u*o;return[Mb(u*i+l*o,s*n+c*r),Ob(c*n-s*r)]},a}function ck(t,e){(e=pw(e))[0]-=t,_w(e);var n=zb(-e[1]);return((-e[2]<0?-n:n)+_b-pb)%_b}function fk(){var t,e=[];return{point:function(e,n,r){t.push([e,n,r])},lineStart:function(){e.push(t=[])},lineEnd:Rb,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e;return e=[],t=null,n}}}function hk(t,e){return wb(t[0]-e[0])<pb&&wb(t[1]-e[1])<pb}function dk(t,e,n,r){this.x=t,this.z=e,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function pk(t,e,n,r,i){var o,a,s=[],u=[];if(t.forEach((function(t){if(!((e=t.length-1)<=0)){var e,n,r=t[0],a=t[e];if(hk(r,a)){if(!r[2]&&!a[2]){for(i.lineStart(),o=0;o<e;++o)i.point((r=t[o])[0],r[1]);return void i.lineEnd()}a[0]+=2e-6}s.push(n=new dk(r,t,null,!0)),u.push(n.o=new dk(r,null,n,!1)),s.push(n=new dk(a,t,null,!1)),u.push(n.o=new dk(a,null,n,!0))}})),s.length){for(u.sort(e),gk(s),gk(u),o=0,a=u.length;o<a;++o)u[o].e=n=!n;for(var l,c,f=s[0];;){for(var h=f,d=!0;h.v;)if((h=h.n)===f)return;l=h.z,i.lineStart();do{if(h.v=h.o.v=!0,h.e){if(d)for(o=0,a=l.length;o<a;++o)i.point((c=l[o])[0],c[1]);else r(h.x,h.n.x,1,i);h=h.n}else{if(d)for(l=h.p.z,o=l.length-1;o>=0;--o)i.point((c=l[o])[0],c[1]);else r(h.x,h.p.x,-1,i);h=h.p}l=(h=h.o).z,d=!d}while(!h.v);i.lineEnd()}}}function gk(t){if(e=t.length){for(var e,n,r=0,i=t[0];++r<e;)i.n=n=t[r],n.p=i,i=n;i.n=n=t[0],n.p=i}}function mk(t){return wb(t[0])<=mb?t[0]:Tb(t[0])*((wb(t[0])+mb)%_b-mb)}function yk(t,e,n,r){return function(i){var o,a,s,u=e(i),l=fk(),c=e(l),f=!1,h={point:d,lineStart:g,lineEnd:m,polygonStart:function(){h.point=y,h.lineStart=v,h.lineEnd=_,a=[],o=[]},polygonEnd:function(){h.point=d,h.lineStart=g,h.lineEnd=m,a=xe(a);var t=function(t,e){var n=mk(e),r=e[1],i=$b(r),o=[$b(n),-Ab(n),0],a=0,s=0,u=new Qt;1===i?r=yb+pb:-1===i&&(r=-yb-pb);for(var l=0,c=t.length;l<c;++l)if(h=(f=t[l]).length)for(var f,h,d=f[h-1],p=mk(d),g=d[1]/2+vb,m=$b(g),y=Ab(g),v=0;v<h;++v,p=x,m=w,y=k,d=_){var _=f[v],x=mk(_),b=_[1]/2+vb,w=$b(b),k=Ab(b),M=x-p,A=M>=0?1:-1,E=A*M,D=E>mb,C=m*w;if(u.add(Mb(C*A*$b(E),y*k+C*Ab(E))),a+=D?M+A*_b:M,D^p>=n^x>=n){var F=mw(pw(d),pw(_));_w(F);var S=mw(o,F);_w(S);var $=(D^M>=0?-1:1)*Ob(S[2]);(r>$||r===$&&(F[0]||F[1]))&&(s+=D^M>=0?1:-1)}}return(a<-1e-6||a<pb&&u<-1e-12)^1&s}(o,r);a.length?(f||(i.polygonStart(),f=!0),pk(a,_k,t,n,i)):t&&(f||(i.polygonStart(),f=!0),i.lineStart(),n(null,null,1,i),i.lineEnd()),f&&(i.polygonEnd(),f=!1),a=o=null},sphere:function(){i.polygonStart(),i.lineStart(),n(null,null,1,i),i.lineEnd(),i.polygonEnd()}};function d(e,n){t(e,n)&&i.point(e,n)}function p(t,e){u.point(t,e)}function g(){h.point=p,u.lineStart()}function m(){h.point=d,u.lineEnd()}function y(t,e){s.push([t,e]),c.point(t,e)}function v(){c.lineStart(),s=[]}function _(){y(s[0][0],s[0][1]),c.lineEnd();var t,e,n,r,u=c.clean(),h=l.result(),d=h.length;if(s.pop(),o.push(s),s=null,d)if(1&u){if((e=(n=h[0]).length-1)>0){for(f||(i.polygonStart(),f=!0),i.lineStart(),t=0;t<e;++t)i.point((r=n[t])[0],r[1]);i.lineEnd()}}else d>1&&2&u&&h.push(h.pop().concat(h.shift())),a.push(h.filter(vk))}return h}}function vk(t){return t.length>1}function _k(t,e){return((t=t.x)[0]<0?t[1]-yb-pb:yb-t[1])-((e=e.x)[0]<0?e[1]-yb-pb:yb-e[1])}ok.invert=ok;var xk=yk((function(){return!0}),(function(t){var e,n=NaN,r=NaN,i=NaN;return{lineStart:function(){t.lineStart(),e=1},point:function(o,a){var s=o>0?mb:-mb,u=wb(o-n);wb(u-mb)<pb?(t.point(n,r=(r+a)/2>0?yb:-yb),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(s,r),t.point(o,r),e=0):i!==s&&u>=mb&&(wb(n-i)<pb&&(n-=i*pb),wb(o-s)<pb&&(o-=s*pb),r=function(t,e,n,r){var i,o,a=$b(t-n);return wb(a)>pb?kb(($b(e)*(o=Ab(r))*$b(n)-$b(r)*(i=Ab(e))*$b(t))/(i*o*a)):(e+r)/2}(n,r,o,a),t.point(i,r),t.lineEnd(),t.lineStart(),t.point(s,r),e=0),t.point(n=o,r=a),i=s},lineEnd:function(){t.lineEnd(),n=r=NaN},clean:function(){return 2-e}}}),(function(t,e,n,r){var i;if(null==t)i=n*yb,r.point(-mb,i),r.point(0,i),r.point(mb,i),r.point(mb,0),r.point(mb,-i),r.point(0,-i),r.point(-mb,-i),r.point(-mb,0),r.point(-mb,i);else if(wb(t[0]-e[0])>pb){var o=t[0]<e[0]?mb:-mb;i=n*o/2,r.point(-o,i),r.point(0,i),r.point(o,i)}else r.point(e[0],e[1])}),[-mb,-yb]);function bk(t){var e=Ab(t),n=2*bb,r=e>0,i=wb(e)>pb;function o(t,n){return Ab(t)*Ab(n)>e}function a(t,n,r){var i=[1,0,0],o=mw(pw(t),pw(n)),a=gw(o,o),s=o[0],u=a-s*s;if(!u)return!r&&t;var l=e*a/u,c=-e*s/u,f=mw(i,o),h=vw(i,l);yw(h,vw(o,c));var d=f,p=gw(h,d),g=gw(d,d),m=p*p-g*(gw(h,h)-1);if(!(m<0)){var y=Bb(m),v=vw(d,(-p-y)/g);if(yw(v,h),v=dw(v),!r)return v;var _,x=t[0],b=n[0],w=t[1],k=n[1];b<x&&(_=x,x=b,b=_);var M=b-x,A=wb(M-mb)<pb;if(!A&&k<w&&(_=w,w=k,k=_),A||M<pb?A?w+k>0^v[1]<(wb(v[0]-x)<pb?w:k):w<=v[1]&&v[1]<=k:M>mb^(x<=v[0]&&v[0]<=b)){var E=vw(d,(-p+y)/g);return yw(E,h),[v,dw(E)]}}}function s(e,n){var i=r?t:mb-t,o=0;return e<-i?o|=1:e>i&&(o|=2),n<-i?o|=4:n>i&&(o|=8),o}return yk(o,(function(t){var e,n,u,l,c;return{lineStart:function(){l=u=!1,c=1},point:function(f,h){var d,p=[f,h],g=o(f,h),m=r?g?0:s(f,h):g?s(f+(f<0?mb:-mb),h):0;if(!e&&(l=u=g)&&t.lineStart(),g!==u&&(!(d=a(e,p))||hk(e,d)||hk(p,d))&&(p[2]=1),g!==u)c=0,g?(t.lineStart(),d=a(p,e),t.point(d[0],d[1])):(d=a(e,p),t.point(d[0],d[1],2),t.lineEnd()),e=d;else if(i&&e&&r^g){var y;m&n||!(y=a(p,e,!0))||(c=0,r?(t.lineStart(),t.point(y[0][0],y[0][1]),t.point(y[1][0],y[1][1]),t.lineEnd()):(t.point(y[1][0],y[1][1]),t.lineEnd(),t.lineStart(),t.point(y[0][0],y[0][1],3)))}!g||e&&hk(e,p)||t.point(p[0],p[1]),e=p,u=g,n=m},lineEnd:function(){u&&t.lineEnd(),e=null},clean:function(){return c|(l&&u)<<1}}}),(function(e,r,i,o){!function(t,e,n,r,i,o){if(n){var a=Ab(e),s=$b(e),u=r*n;null==i?(i=e+r*_b,o=e-u/2):(i=ck(a,i),o=ck(a,o),(r>0?i<o:i>o)&&(i+=r*_b));for(var l,c=i;r>0?c>o:c<o;c-=u)l=dw([a,-s*Ab(c),-s*$b(c)]),t.point(l[0],l[1])}}(o,t,n,i,e,r)}),r?[0,-t]:[-mb,t-mb])}var wk=1e9,kk=-wk;function Mk(t,e,n,r){function i(i,o){return t<=i&&i<=n&&e<=o&&o<=r}function o(i,o,s,l){var c=0,f=0;if(null==i||(c=a(i,s))!==(f=a(o,s))||u(i,o)<0^s>0)do{l.point(0===c||3===c?t:n,c>1?r:e)}while((c=(c+s+4)%4)!==f);else l.point(o[0],o[1])}function a(r,i){return wb(r[0]-t)<pb?i>0?0:3:wb(r[0]-n)<pb?i>0?2:1:wb(r[1]-e)<pb?i>0?1:0:i>0?3:2}function s(t,e){return u(t.x,e.x)}function u(t,e){var n=a(t,1),r=a(e,1);return n!==r?n-r:0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0]}return function(a){var u,l,c,f,h,d,p,g,m,y,v,_=a,x=fk(),b={point:w,lineStart:function(){b.point=k,l&&l.push(c=[]);y=!0,m=!1,p=g=NaN},lineEnd:function(){u&&(k(f,h),d&&m&&x.rejoin(),u.push(x.result()));b.point=w,m&&_.lineEnd()},polygonStart:function(){_=x,u=[],l=[],v=!0},polygonEnd:function(){var e=function(){for(var e=0,n=0,i=l.length;n<i;++n)for(var o,a,s=l[n],u=1,c=s.length,f=s[0],h=f[0],d=f[1];u<c;++u)o=h,a=d,h=(f=s[u])[0],d=f[1],a<=r?d>r&&(h-o)*(r-a)>(d-a)*(t-o)&&++e:d<=r&&(h-o)*(r-a)<(d-a)*(t-o)&&--e;return e}(),n=v&&e,i=(u=xe(u)).length;(n||i)&&(a.polygonStart(),n&&(a.lineStart(),o(null,null,1,a),a.lineEnd()),i&&pk(u,s,e,o,a),a.polygonEnd());_=a,u=l=c=null}};function w(t,e){i(t,e)&&_.point(t,e)}function k(o,a){var s=i(o,a);if(l&&c.push([o,a]),y)f=o,h=a,d=s,y=!1,s&&(_.lineStart(),_.point(o,a));else if(s&&m)_.point(o,a);else{var u=[p=Math.max(kk,Math.min(wk,p)),g=Math.max(kk,Math.min(wk,g))],x=[o=Math.max(kk,Math.min(wk,o)),a=Math.max(kk,Math.min(wk,a))];!function(t,e,n,r,i,o){var a,s=t[0],u=t[1],l=0,c=1,f=e[0]-s,h=e[1]-u;if(a=n-s,f||!(a>0)){if(a/=f,f<0){if(a<l)return;a<c&&(c=a)}else if(f>0){if(a>c)return;a>l&&(l=a)}if(a=i-s,f||!(a<0)){if(a/=f,f<0){if(a>c)return;a>l&&(l=a)}else if(f>0){if(a<l)return;a<c&&(c=a)}if(a=r-u,h||!(a>0)){if(a/=h,h<0){if(a<l)return;a<c&&(c=a)}else if(h>0){if(a>c)return;a>l&&(l=a)}if(a=o-u,h||!(a<0)){if(a/=h,h<0){if(a>c)return;a>l&&(l=a)}else if(h>0){if(a<l)return;a<c&&(c=a)}return l>0&&(t[0]=s+l*f,t[1]=u+l*h),c<1&&(e[0]=s+c*f,e[1]=u+c*h),!0}}}}}(u,x,t,e,n,r)?s&&(_.lineStart(),_.point(o,a),v=!1):(m||(_.lineStart(),_.point(u[0],u[1])),_.point(x[0],x[1]),s||_.lineEnd(),v=!1)}p=o,g=a,m=s}return b}}function Ak(t,e,n){var r=be(t,e-pb,n).concat(e);return function(t){return r.map((function(e){return[t,e]}))}}function Ek(t,e,n){var r=be(t,e-pb,n).concat(e);return function(t){return r.map((function(e){return[e,t]}))}}var Dk,Ck,Fk,Sk,$k=t=>t,Tk=new Qt,Bk=new Qt,Nk={point:Rb,lineStart:Rb,lineEnd:Rb,polygonStart:function(){Nk.lineStart=zk,Nk.lineEnd=Lk},polygonEnd:function(){Nk.lineStart=Nk.lineEnd=Nk.point=Rb,Tk.add(wb(Bk)),Bk=new Qt},result:function(){var t=Tk/2;return Tk=new Qt,t}};function zk(){Nk.point=Ok}function Ok(t,e){Nk.point=Rk,Dk=Fk=t,Ck=Sk=e}function Rk(t,e){Bk.add(Sk*t-Fk*e),Fk=t,Sk=e}function Lk(){Rk(Dk,Ck)}var Uk=1/0,qk=Uk,Pk=-Uk,jk=Pk,Ik={point:function(t,e){t<Uk&&(Uk=t);t>Pk&&(Pk=t);e<qk&&(qk=e);e>jk&&(jk=e)},lineStart:Rb,lineEnd:Rb,polygonStart:Rb,polygonEnd:Rb,result:function(){var t=[[Uk,qk],[Pk,jk]];return Pk=jk=-(qk=Uk=1/0),t}};var Wk,Hk,Yk,Gk,Vk=0,Xk=0,Jk=0,Zk=0,Qk=0,Kk=0,tM=0,eM=0,nM=0,rM={point:iM,lineStart:oM,lineEnd:uM,polygonStart:function(){rM.lineStart=lM,rM.lineEnd=cM},polygonEnd:function(){rM.point=iM,rM.lineStart=oM,rM.lineEnd=uM},result:function(){var t=nM?[tM/nM,eM/nM]:Kk?[Zk/Kk,Qk/Kk]:Jk?[Vk/Jk,Xk/Jk]:[NaN,NaN];return Vk=Xk=Jk=Zk=Qk=Kk=tM=eM=nM=0,t}};function iM(t,e){Vk+=t,Xk+=e,++Jk}function oM(){rM.point=aM}function aM(t,e){rM.point=sM,iM(Yk=t,Gk=e)}function sM(t,e){var n=t-Yk,r=e-Gk,i=Bb(n*n+r*r);Zk+=i*(Yk+t)/2,Qk+=i*(Gk+e)/2,Kk+=i,iM(Yk=t,Gk=e)}function uM(){rM.point=iM}function lM(){rM.point=fM}function cM(){hM(Wk,Hk)}function fM(t,e){rM.point=hM,iM(Wk=Yk=t,Hk=Gk=e)}function hM(t,e){var n=t-Yk,r=e-Gk,i=Bb(n*n+r*r);Zk+=i*(Yk+t)/2,Qk+=i*(Gk+e)/2,Kk+=i,tM+=(i=Gk*t-Yk*e)*(Yk+t),eM+=i*(Gk+e),nM+=3*i,iM(Yk=t,Gk=e)}function dM(t){this._context=t}dM.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(t,e){switch(this._point){case 0:this._context.moveTo(t,e),this._point=1;break;case 1:this._context.lineTo(t,e);break;default:this._context.moveTo(t+this._radius,e),this._context.arc(t,e,this._radius,0,_b)}},result:Rb};var pM,gM,mM,yM,vM,_M=new Qt,xM={point:Rb,lineStart:function(){xM.point=bM},lineEnd:function(){pM&&wM(gM,mM),xM.point=Rb},polygonStart:function(){pM=!0},polygonEnd:function(){pM=null},result:function(){var t=+_M;return _M=new Qt,t}};function bM(t,e){xM.point=wM,gM=yM=t,mM=vM=e}function wM(t,e){yM-=t,vM-=e,_M.add(Bb(yM*yM+vM*vM)),yM=t,vM=e}let kM,MM,AM,EM;class DM{constructor(t){this._append=null==t?CM:function(t){const e=Math.floor(t);if(!(e>=0))throw new RangeError(`invalid digits: ${t}`);if(e>15)return CM;if(e!==kM){const t=10**e;kM=e,MM=function(e){let n=1;this._+=e[0];for(const r=e.length;n<r;++n)this._+=Math.round(arguments[n]*t)/t+e[n]}}return MM}(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){0===this._line&&(this._+="Z"),this._point=NaN}point(t,e){switch(this._point){case 0:this._append`M${t},${e}`,this._point=1;break;case 1:this._append`L${t},${e}`;break;default:if(this._append`M${t},${e}`,this._radius!==AM||this._append!==MM){const t=this._radius,e=this._;this._="",this._append`m0,${t}a${t},${t} 0 1,1 0,${-2*t}a${t},${t} 0 1,1 0,${2*t}z`,AM=t,MM=this._append,EM=this._,this._=e}this._+=EM}}result(){const t=this._;return this._="",t.length?t:null}}function CM(t){let e=1;this._+=t[0];for(const n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function FM(t,e){let n,r,i=3,o=4.5;function a(t){return t&&("function"==typeof o&&r.pointRadius(+o.apply(this,arguments)),Ib(t,n(r))),r.result()}return a.area=function(t){return Ib(t,n(Nk)),Nk.result()},a.measure=function(t){return Ib(t,n(xM)),xM.result()},a.bounds=function(t){return Ib(t,n(Ik)),Ik.result()},a.centroid=function(t){return Ib(t,n(rM)),rM.result()},a.projection=function(e){return arguments.length?(n=null==e?(t=null,$k):(t=e).stream,a):t},a.context=function(t){return arguments.length?(r=null==t?(e=null,new DM(i)):new dM(e=t),"function"!=typeof o&&r.pointRadius(o),a):e},a.pointRadius=function(t){return arguments.length?(o="function"==typeof t?t:(r.pointRadius(+t),+t),a):o},a.digits=function(t){if(!arguments.length)return i;if(null==t)i=null;else{const e=Math.floor(t);if(!(e>=0))throw new RangeError(`invalid digits: ${t}`);i=e}return null===e&&(r=new DM(i)),a},a.projection(t).digits(i).context(e)}function SM(t){return function(e){var n=new $M;for(var r in t)n[r]=t[r];return n.stream=e,n}}function $M(){}function TM(t,e,n){var r=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),null!=r&&t.clipExtent(null),Ib(n,t.stream(Ik)),e(Ik.result()),null!=r&&t.clipExtent(r),t}function BM(t,e,n){return TM(t,(function(n){var r=e[1][0]-e[0][0],i=e[1][1]-e[0][1],o=Math.min(r/(n[1][0]-n[0][0]),i/(n[1][1]-n[0][1])),a=+e[0][0]+(r-o*(n[1][0]+n[0][0]))/2,s=+e[0][1]+(i-o*(n[1][1]+n[0][1]))/2;t.scale(150*o).translate([a,s])}),n)}function NM(t,e,n){return BM(t,[[0,0],e],n)}function zM(t,e,n){return TM(t,(function(n){var r=+e,i=r/(n[1][0]-n[0][0]),o=(r-i*(n[1][0]+n[0][0]))/2,a=-i*n[0][1];t.scale(150*i).translate([o,a])}),n)}function OM(t,e,n){return TM(t,(function(n){var r=+e,i=r/(n[1][1]-n[0][1]),o=-i*n[0][0],a=(r-i*(n[1][1]+n[0][1]))/2;t.scale(150*i).translate([o,a])}),n)}$M.prototype={constructor:$M,point:function(t,e){this.stream.point(t,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var RM=Ab(30*bb);function LM(t,e){return+e?function(t,e){function n(r,i,o,a,s,u,l,c,f,h,d,p,g,m){var y=l-r,v=c-i,_=y*y+v*v;if(_>4*e&&g--){var x=a+h,b=s+d,w=u+p,k=Bb(x*x+b*b+w*w),M=Ob(w/=k),A=wb(wb(w)-1)<pb||wb(o-f)<pb?(o+f)/2:Mb(b,x),E=t(A,M),D=E[0],C=E[1],F=D-r,S=C-i,$=v*F-y*S;($*$/_>e||wb((y*F+v*S)/_-.5)>.3||a*h+s*d+u*p<RM)&&(n(r,i,o,a,s,u,D,C,A,x/=k,b/=k,w,g,m),m.point(D,C),n(D,C,A,x,b,w,l,c,f,h,d,p,g,m))}}return function(e){var r,i,o,a,s,u,l,c,f,h,d,p,g={point:m,lineStart:y,lineEnd:_,polygonStart:function(){e.polygonStart(),g.lineStart=x},polygonEnd:function(){e.polygonEnd(),g.lineStart=y}};function m(n,r){n=t(n,r),e.point(n[0],n[1])}function y(){c=NaN,g.point=v,e.lineStart()}function v(r,i){var o=pw([r,i]),a=t(r,i);n(c,f,l,h,d,p,c=a[0],f=a[1],l=r,h=o[0],d=o[1],p=o[2],16,e),e.point(c,f)}function _(){g.point=m,e.lineEnd()}function x(){y(),g.point=b,g.lineEnd=w}function b(t,e){v(r=t,e),i=c,o=f,a=h,s=d,u=p,g.point=v}function w(){n(c,f,l,h,d,p,i,o,r,a,s,u,16,e),g.lineEnd=_,_()}return g}}(t,e):function(t){return SM({point:function(e,n){e=t(e,n),this.stream.point(e[0],e[1])}})}(t)}var UM=SM({point:function(t,e){this.stream.point(t*bb,e*bb)}});function qM(t,e,n,r,i,o){if(!o)return function(t,e,n,r,i){function o(o,a){return[e+t*(o*=r),n-t*(a*=i)]}return o.invert=function(o,a){return[(o-e)/t*r,(n-a)/t*i]},o}(t,e,n,r,i);var a=Ab(o),s=$b(o),u=a*t,l=s*t,c=a/t,f=s/t,h=(s*n-a*e)/t,d=(s*e+a*n)/t;function p(t,o){return[u*(t*=r)-l*(o*=i)+e,n-l*t-u*o]}return p.invert=function(t,e){return[r*(c*t-f*e+h),i*(d-f*t-c*e)]},p}function PM(t){return jM((function(){return t}))()}function jM(t){var e,n,r,i,o,a,s,u,l,c,f=150,h=480,d=250,p=0,g=0,m=0,y=0,v=0,_=0,x=1,b=1,w=null,k=xk,M=null,A=$k,E=.5;function D(t){return u(t[0]*bb,t[1]*bb)}function C(t){return(t=u.invert(t[0],t[1]))&&[t[0]*xb,t[1]*xb]}function F(){var t=qM(f,0,0,x,b,_).apply(null,e(p,g)),r=qM(f,h-t[0],d-t[1],x,b,_);return n=ak(m,y,v),s=ik(e,r),u=ik(n,s),a=LM(s,E),S()}function S(){return l=c=null,D}return D.stream=function(t){return l&&c===t?l:l=UM(function(t){return SM({point:function(e,n){var r=t(e,n);return this.stream.point(r[0],r[1])}})}(n)(k(a(A(c=t)))))},D.preclip=function(t){return arguments.length?(k=t,w=void 0,S()):k},D.postclip=function(t){return arguments.length?(A=t,M=r=i=o=null,S()):A},D.clipAngle=function(t){return arguments.length?(k=+t?bk(w=t*bb):(w=null,xk),S()):w*xb},D.clipExtent=function(t){return arguments.length?(A=null==t?(M=r=i=o=null,$k):Mk(M=+t[0][0],r=+t[0][1],i=+t[1][0],o=+t[1][1]),S()):null==M?null:[[M,r],[i,o]]},D.scale=function(t){return arguments.length?(f=+t,F()):f},D.translate=function(t){return arguments.length?(h=+t[0],d=+t[1],F()):[h,d]},D.center=function(t){return arguments.length?(p=t[0]%360*bb,g=t[1]%360*bb,F()):[p*xb,g*xb]},D.rotate=function(t){return arguments.length?(m=t[0]%360*bb,y=t[1]%360*bb,v=t.length>2?t[2]%360*bb:0,F()):[m*xb,y*xb,v*xb]},D.angle=function(t){return arguments.length?(_=t%360*bb,F()):_*xb},D.reflectX=function(t){return arguments.length?(x=t?-1:1,F()):x<0},D.reflectY=function(t){return arguments.length?(b=t?-1:1,F()):b<0},D.precision=function(t){return arguments.length?(a=LM(s,E=t*t),S()):Bb(E)},D.fitExtent=function(t,e){return BM(D,t,e)},D.fitSize=function(t,e){return NM(D,t,e)},D.fitWidth=function(t,e){return zM(D,t,e)},D.fitHeight=function(t,e){return OM(D,t,e)},function(){return e=t.apply(this,arguments),D.invert=e.invert&&C,F()}}function IM(t){var e=0,n=mb/3,r=jM(t),i=r(e,n);return i.parallels=function(t){return arguments.length?r(e=t[0]*bb,n=t[1]*bb):[e*xb,n*xb]},i}function WM(t,e){var n=$b(t),r=(n+$b(e))/2;if(wb(r)<pb)return function(t){var e=Ab(t);function n(t,n){return[t*e,$b(n)/e]}return n.invert=function(t,n){return[t/e,Ob(n*e)]},n}(t);var i=1+n*(2*r-n),o=Bb(i)/r;function a(t,e){var n=Bb(i-2*r*$b(e))/r;return[n*$b(t*=r),o-n*Ab(t)]}return a.invert=function(t,e){var n=o-e,a=Mb(t,wb(n))*Tb(n);return n*r<0&&(a-=mb*Tb(t)*Tb(n)),[a/r,Ob((i-(t*t+n*n)*r*r)/(2*r))]},a}function HM(){return IM(WM).scale(155.424).center([0,33.6442])}function YM(){return HM().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function GM(t){return function(e,n){var r=Ab(e),i=Ab(n),o=t(r*i);return o===1/0?[2,0]:[o*i*$b(e),o*$b(n)]}}function VM(t){return function(e,n){var r=Bb(e*e+n*n),i=t(r),o=$b(i),a=Ab(i);return[Mb(e*o,r*a),Ob(r&&n*o/r)]}}var XM=GM((function(t){return Bb(2/(1+t))}));XM.invert=VM((function(t){return 2*Ob(t/2)}));var JM=GM((function(t){return(t=zb(t))&&t/$b(t)}));function ZM(t,e){return[t,Fb(Nb((yb+e)/2))]}function QM(t){var e,n,r,i=PM(t),o=i.center,a=i.scale,s=i.translate,u=i.clipExtent,l=null;function c(){var o=mb*a(),s=i(function(t){function e(e){return(e=t(e[0]*bb,e[1]*bb))[0]*=xb,e[1]*=xb,e}return t=ak(t[0]*bb,t[1]*bb,t.length>2?t[2]*bb:0),e.invert=function(e){return(e=t.invert(e[0]*bb,e[1]*bb))[0]*=xb,e[1]*=xb,e},e}(i.rotate()).invert([0,0]));return u(null==l?[[s[0]-o,s[1]-o],[s[0]+o,s[1]+o]]:t===ZM?[[Math.max(s[0]-o,l),e],[Math.min(s[0]+o,n),r]]:[[l,Math.max(s[1]-o,e)],[n,Math.min(s[1]+o,r)]])}return i.scale=function(t){return arguments.length?(a(t),c()):a()},i.translate=function(t){return arguments.length?(s(t),c()):s()},i.center=function(t){return arguments.length?(o(t),c()):o()},i.clipExtent=function(t){return arguments.length?(null==t?l=e=n=r=null:(l=+t[0][0],e=+t[0][1],n=+t[1][0],r=+t[1][1]),c()):null==l?null:[[l,e],[n,r]]},c()}function KM(t){return Nb((yb+t)/2)}function tA(t,e){var n=Ab(t),r=t===e?$b(t):Fb(n/Ab(e))/Fb(KM(e)/KM(t)),i=n*Sb(KM(t),r)/r;if(!r)return ZM;function o(t,e){i>0?e<-yb+pb&&(e=-yb+pb):e>yb-pb&&(e=yb-pb);var n=i/Sb(KM(e),r);return[n*$b(r*t),i-n*Ab(r*t)]}return o.invert=function(t,e){var n=i-e,o=Tb(r)*Bb(t*t+n*n),a=Mb(t,wb(n))*Tb(n);return n*r<0&&(a-=mb*Tb(t)*Tb(n)),[a/r,2*kb(Sb(i/o,1/r))-yb]},o}function eA(t,e){return[t,e]}function nA(t,e){var n=Ab(t),r=t===e?$b(t):(n-Ab(e))/(e-t),i=n/r+t;if(wb(r)<pb)return eA;function o(t,e){var n=i-e,o=r*t;return[n*$b(o),i-n*Ab(o)]}return o.invert=function(t,e){var n=i-e,o=Mb(t,wb(n))*Tb(n);return n*r<0&&(o-=mb*Tb(t)*Tb(n)),[o/r,i-Tb(r)*Bb(t*t+n*n)]},o}JM.invert=VM((function(t){return t})),ZM.invert=function(t,e){return[t,2*kb(Db(e))-yb]},eA.invert=eA;var rA=1.340264,iA=-.081106,oA=893e-6,aA=.003796,sA=Bb(3)/2;function uA(t,e){var n=Ob(sA*$b(e)),r=n*n,i=r*r*r;return[t*Ab(n)/(sA*(rA+3*iA*r+i*(7*oA+9*aA*r))),n*(rA+iA*r+i*(oA+aA*r))]}function lA(t,e){var n=Ab(e),r=Ab(t)*n;return[n*$b(t)/r,$b(e)/r]}function cA(t,e){var n=e*e,r=n*n;return[t*(.8707-.131979*n+r*(r*(.003971*n-.001529*r)-.013791)),e*(1.007226+n*(.015085+r*(.028874*n-.044475-.005916*r)))]}function fA(t,e){return[Ab(e)*$b(t),$b(e)]}function hA(t,e){var n=Ab(e),r=1+Ab(t)*n;return[n*$b(t)/r,$b(e)/r]}function dA(t,e){return[Fb(Nb((yb+e)/2)),-t]}uA.invert=function(t,e){for(var n,r=e,i=r*r,o=i*i*i,a=0;a<12&&(o=(i=(r-=n=(r*(rA+iA*i+o*(oA+aA*i))-e)/(rA+3*iA*i+o*(7*oA+9*aA*i)))*r)*i*i,!(wb(n)<gb));++a);return[sA*t*(rA+3*iA*i+o*(7*oA+9*aA*i))/Ab(r),Ob($b(r)/sA)]},lA.invert=VM(kb),cA.invert=function(t,e){var n,r=e,i=25;do{var o=r*r,a=o*o;r-=n=(r*(1.007226+o*(.015085+a*(.028874*o-.044475-.005916*a)))-e)/(1.007226+o*(.045255+a*(.259866*o-.311325-.005916*11*a)))}while(wb(n)>pb&&--i>0);return[t/(.8707+(o=r*r)*(o*(o*o*o*(.003971-.001529*o)-.013791)-.131979)),r]},fA.invert=VM(Ob),hA.invert=VM((function(t){return 2*kb(t)})),dA.invert=function(t,e){return[-e,2*kb(Db(t))-yb]};var pA=Math.abs,gA=Math.cos,mA=Math.sin,yA=Math.PI,vA=yA/2,_A=function(t){return t>0?Math.sqrt(t):0}(2);function xA(t){return t>1?vA:t<-1?-vA:Math.asin(t)}function bA(t,e){var n,r=t*mA(e),i=30;do{e-=n=(e+mA(e)-r)/(1+gA(e))}while(pA(n)>1e-6&&--i>0);return e/2}var wA=function(t,e,n){function r(r,i){return[t*r*gA(i=bA(n,i)),e*mA(i)]}return r.invert=function(r,i){return i=xA(i/e),[r/(t*gA(i)),xA((2*i+mA(2*i))/n)]},r}(_A/vA,_A,yA);const kA=FM(),MA=["clipAngle","clipExtent","scale","translate","center","rotate","parallels","precision","reflectX","reflectY","coefficient","distance","fraction","lobes","parallel","radius","ratio","spacing","tilt"];function AA(t,e){if(!t||"string"!=typeof t)throw new Error("Projection type must be a name string.");return t=t.toLowerCase(),arguments.length>1?(DA[t]=function(t,e){return function n(){const r=e();return r.type=t,r.path=FM().projection(r),r.copy=r.copy||function(){const t=n();return MA.forEach((e=>{r[e]&&t[e](r[e]())})),t.path.pointRadius(r.path.pointRadius()),t},Yd(r)}}(t,e),this):DA[t]||null}function EA(t){return t&&t.path||kA}const DA={albers:YM,albersusa:function(){var t,e,n,r,i,o,a=YM(),s=HM().rotate([154,0]).center([-2,58.5]).parallels([55,65]),u=HM().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(t,e){o=[t,e]}};function c(t){var e=t[0],a=t[1];return o=null,n.point(e,a),o||(r.point(e,a),o)||(i.point(e,a),o)}function f(){return t=e=null,c}return c.invert=function(t){var e=a.scale(),n=a.translate(),r=(t[0]-n[0])/e,i=(t[1]-n[1])/e;return(i>=.12&&i<.234&&r>=-.425&&r<-.214?s:i>=.166&&i<.234&&r>=-.214&&r<-.115?u:a).invert(t)},c.stream=function(n){return t&&e===n?t:(r=[a.stream(e=n),s.stream(n),u.stream(n)],i=r.length,t={point:function(t,e){for(var n=-1;++n<i;)r[n].point(t,e)},sphere:function(){for(var t=-1;++t<i;)r[t].sphere()},lineStart:function(){for(var t=-1;++t<i;)r[t].lineStart()},lineEnd:function(){for(var t=-1;++t<i;)r[t].lineEnd()},polygonStart:function(){for(var t=-1;++t<i;)r[t].polygonStart()},polygonEnd:function(){for(var t=-1;++t<i;)r[t].polygonEnd()}});var r,i},c.precision=function(t){return arguments.length?(a.precision(t),s.precision(t),u.precision(t),f()):a.precision()},c.scale=function(t){return arguments.length?(a.scale(t),s.scale(.35*t),u.scale(t),c.translate(a.translate())):a.scale()},c.translate=function(t){if(!arguments.length)return a.translate();var e=a.scale(),o=+t[0],c=+t[1];return n=a.translate(t).clipExtent([[o-.455*e,c-.238*e],[o+.455*e,c+.238*e]]).stream(l),r=s.translate([o-.307*e,c+.201*e]).clipExtent([[o-.425*e+pb,c+.12*e+pb],[o-.214*e-pb,c+.234*e-pb]]).stream(l),i=u.translate([o-.205*e,c+.212*e]).clipExtent([[o-.214*e+pb,c+.166*e+pb],[o-.115*e-pb,c+.234*e-pb]]).stream(l),f()},c.fitExtent=function(t,e){return BM(c,t,e)},c.fitSize=function(t,e){return NM(c,t,e)},c.fitWidth=function(t,e){return zM(c,t,e)},c.fitHeight=function(t,e){return OM(c,t,e)},c.scale(1070)},azimuthalequalarea:function(){return PM(XM).scale(124.75).clipAngle(179.999)},azimuthalequidistant:function(){return PM(JM).scale(79.4188).clipAngle(179.999)},conicconformal:function(){return IM(tA).scale(109.5).parallels([30,30])},conicequalarea:HM,conicequidistant:function(){return IM(nA).scale(131.154).center([0,13.9389])},equalEarth:function(){return PM(uA).scale(177.158)},equirectangular:function(){return PM(eA).scale(152.63)},gnomonic:function(){return PM(lA).scale(144.049).clipAngle(60)},identity:function(){var t,e,n,r,i,o,a,s=1,u=0,l=0,c=1,f=1,h=0,d=null,p=1,g=1,m=SM({point:function(t,e){var n=_([t,e]);this.stream.point(n[0],n[1])}}),y=$k;function v(){return p=s*c,g=s*f,o=a=null,_}function _(n){var r=n[0]*p,i=n[1]*g;if(h){var o=i*t-r*e;r=r*t+i*e,i=o}return[r+u,i+l]}return _.invert=function(n){var r=n[0]-u,i=n[1]-l;if(h){var o=i*t+r*e;r=r*t-i*e,i=o}return[r/p,i/g]},_.stream=function(t){return o&&a===t?o:o=m(y(a=t))},_.postclip=function(t){return arguments.length?(y=t,d=n=r=i=null,v()):y},_.clipExtent=function(t){return arguments.length?(y=null==t?(d=n=r=i=null,$k):Mk(d=+t[0][0],n=+t[0][1],r=+t[1][0],i=+t[1][1]),v()):null==d?null:[[d,n],[r,i]]},_.scale=function(t){return arguments.length?(s=+t,v()):s},_.translate=function(t){return arguments.length?(u=+t[0],l=+t[1],v()):[u,l]},_.angle=function(n){return arguments.length?(e=$b(h=n%360*bb),t=Ab(h),v()):h*xb},_.reflectX=function(t){return arguments.length?(c=t?-1:1,v()):c<0},_.reflectY=function(t){return arguments.length?(f=t?-1:1,v()):f<0},_.fitExtent=function(t,e){return BM(_,t,e)},_.fitSize=function(t,e){return NM(_,t,e)},_.fitWidth=function(t,e){return zM(_,t,e)},_.fitHeight=function(t,e){return OM(_,t,e)},_},mercator:function(){return QM(ZM).scale(961/_b)},mollweide:function(){return PM(wA).scale(169.529)},naturalEarth1:function(){return PM(cA).scale(175.295)},orthographic:function(){return PM(fA).scale(249.5).clipAngle(90.000001)},stereographic:function(){return PM(hA).scale(250).clipAngle(142)},transversemercator:function(){var t=QM(dA),e=t.center,n=t.rotate;return t.center=function(t){return arguments.length?e([-t[1],t[0]]):[(t=e())[1],-t[0]]},t.rotate=function(t){return arguments.length?n([t[0],t[1],t.length>2?t[2]+90:90]):[(t=n())[0],t[1],t[2]-90]},n([0,0,90]).scale(159.155)}};for(const t in DA)AA(t,DA[t]);function CA(){}const FA=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function SA(){var t=1,e=1,n=a;function r(t,e){return e.map((e=>i(t,e)))}function i(r,i){var a=[],s=[];return function(n,r,i){var a,s,u,l,c,f,h=[],d=[];a=s=-1,l=n[0]>=r,FA[l<<1].forEach(p);for(;++a<t-1;)u=l,l=n[a+1]>=r,FA[u|l<<1].forEach(p);FA[l|0].forEach(p);for(;++s<e-1;){for(a=-1,l=n[s*t+t]>=r,c=n[s*t]>=r,FA[l<<1|c<<2].forEach(p);++a<t-1;)u=l,l=n[s*t+t+a+1]>=r,f=c,c=n[s*t+a+1]>=r,FA[u|l<<1|c<<2|f<<3].forEach(p);FA[l|c<<3].forEach(p)}a=-1,c=n[s*t]>=r,FA[c<<2].forEach(p);for(;++a<t-1;)f=c,c=n[s*t+a+1]>=r,FA[c<<2|f<<3].forEach(p);function p(t){var e,n,r=[t[0][0]+a,t[0][1]+s],u=[t[1][0]+a,t[1][1]+s],l=o(r),c=o(u);(e=d[l])?(n=h[c])?(delete d[e.end],delete h[n.start],e===n?(e.ring.push(u),i(e.ring)):h[e.start]=d[n.end]={start:e.start,end:n.end,ring:e.ring.concat(n.ring)}):(delete d[e.end],e.ring.push(u),d[e.end=c]=e):(e=h[c])?(n=d[l])?(delete h[e.start],delete d[n.end],e===n?(e.ring.push(u),i(e.ring)):h[n.start]=d[e.end]={start:n.start,end:e.end,ring:n.ring.concat(e.ring)}):(delete h[e.start],e.ring.unshift(r),h[e.start=l]=e):h[l]=d[c]={start:l,end:c,ring:[r,u]}}FA[c<<3].forEach(p)}(r,i,(t=>{n(t,r,i),function(t){var e=0,n=t.length,r=t[n-1][1]*t[0][0]-t[n-1][0]*t[0][1];for(;++e<n;)r+=t[e-1][1]*t[e][0]-t[e-1][0]*t[e][1];return r}(t)>0?a.push([t]):s.push(t)})),s.forEach((t=>{for(var e,n=0,r=a.length;n<r;++n)if(-1!==$A((e=a[n])[0],t))return void e.push(t)})),{type:"MultiPolygon",value:i,coordinates:a}}function o(e){return 2*e[0]+e[1]*(t+1)*4}function a(n,r,i){n.forEach((n=>{var o,a=n[0],s=n[1],u=0|a,l=0|s,c=r[l*t+u];a>0&&a<t&&u===a&&(o=r[l*t+u-1],n[0]=a+(i-o)/(c-o)-.5),s>0&&s<e&&l===s&&(o=r[(l-1)*t+u],n[1]=s+(i-o)/(c-o)-.5)}))}return r.contour=i,r.size=function(n){if(!arguments.length)return[t,e];var i=Math.floor(n[0]),o=Math.floor(n[1]);return i>=0&&o>=0||s("invalid size"),t=i,e=o,r},r.smooth=function(t){return arguments.length?(n=t?a:CA,r):n===a},r}function $A(t,e){for(var n,r=-1,i=e.length;++r<i;)if(n=TA(t,e[r]))return n;return 0}function TA(t,e){for(var n=e[0],r=e[1],i=-1,o=0,a=t.length,s=a-1;o<a;s=o++){var u=t[o],l=u[0],c=u[1],f=t[s],h=f[0],d=f[1];if(BA(u,f,e))return 0;c>r!=d>r&&n<(h-l)*(r-c)/(d-c)+l&&(i=-i)}return i}function BA(t,e,n){var r,i,o,a;return function(t,e,n){return(e[0]-t[0])*(n[1]-t[1])==(n[0]-t[0])*(e[1]-t[1])}(t,e,n)&&(i=t[r=+(t[0]===e[0])],o=n[r],a=e[r],i<=o&&o<=a||a<=o&&o<=i)}function NA(t,e,n){return function(r){var i=et(r),o=n?Math.min(i[0],0):i[0],a=i[1],s=a-o,u=e?he(o,a,t):s/(t+1);return be(o+u,a,u)}}function zA(t){La.call(this,null,t)}function OA(t,e,n,r,i){const o=t.x1||0,a=t.y1||0,s=e*n<0;function u(t){t.forEach(l)}function l(t){s&&t.reverse(),t.forEach(c)}function c(t){t[0]=(t[0]-o)*e+r,t[1]=(t[1]-a)*n+i}return function(t){return t.coordinates.forEach(u),t}}function RA(t,e,n){const r=t>=0?t:Ha(e,n);return Math.round((Math.sqrt(4*r*r+1)-1)/2)}function LA(t){return Y(t)?t:Q(+t)}function UA(){var t=t=>t[0],e=t=>t[1],n=d,r=[-1,-1],i=960,o=500,a=2;function u(s,u){const l=RA(r[0],s,t)>>a,c=RA(r[1],s,e)>>a,f=l?l+2:0,h=c?c+2:0,d=2*f+(i>>a),p=2*h+(o>>a),g=new Float32Array(d*p),m=new Float32Array(d*p);let y=g;s.forEach((r=>{const i=f+(+t(r)>>a),o=h+(+e(r)>>a);i>=0&&i<d&&o>=0&&o<p&&(g[i+o*d]+=+n(r))})),l>0&&c>0?(qA(d,p,g,m,l),PA(d,p,m,g,c),qA(d,p,g,m,l),PA(d,p,m,g,c),qA(d,p,g,m,l),PA(d,p,m,g,c)):l>0?(qA(d,p,g,m,l),qA(d,p,m,g,l),qA(d,p,g,m,l),y=m):c>0&&(PA(d,p,g,m,c),PA(d,p,m,g,c),PA(d,p,g,m,c),y=m);const v=u?Math.pow(2,-2*a):1/we(y);for(let t=0,e=d*p;t<e;++t)y[t]*=v;return{values:y,scale:1<<a,width:d,height:p,x1:f,y1:h,x2:f+(i>>a),y2:h+(o>>a)}}return u.x=function(e){return arguments.length?(t=LA(e),u):t},u.y=function(t){return arguments.length?(e=LA(t),u):e},u.weight=function(t){return arguments.length?(n=LA(t),u):n},u.size=function(t){if(!arguments.length)return[i,o];var e=+t[0],n=+t[1];return e>=0&&n>=0||s("invalid size"),i=e,o=n,u},u.cellSize=function(t){return arguments.length?((t=+t)>=1||s("invalid cell size"),a=Math.floor(Math.log(t)/Math.LN2),u):1<<a},u.bandwidth=function(t){return arguments.length?(1===(t=W(t)).length&&(t=[+t[0],+t[0]]),2!==t.length&&s("invalid bandwidth"),r=t,u):r},u}function qA(t,e,n,r,i){const o=1+(i<<1);for(let a=0;a<e;++a)for(let e=0,s=0;e<t+i;++e)e<t&&(s+=n[e+a*t]),e>=i&&(e>=o&&(s-=n[e-o+a*t]),r[e-i+a*t]=s/Math.min(e+1,t-1+o-e,o))}function PA(t,e,n,r,i){const o=1+(i<<1);for(let a=0;a<t;++a)for(let s=0,u=0;s<e+i;++s)s<e&&(u+=n[a+s*t]),s>=i&&(s>=o&&(u-=n[a+(s-o)*t]),r[a+(s-i)*t]=u/Math.min(s+1,e-1+o-s,o))}function jA(t){La.call(this,null,t)}zA.Definition={type:"Isocontour",metadata:{generates:!0},params:[{name:"field",type:"field"},{name:"thresholds",type:"number",array:!0},{name:"levels",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"zero",type:"boolean",default:!0},{name:"smooth",type:"boolean",default:!0},{name:"scale",type:"number",expr:!0},{name:"translate",type:"number",array:!0,expr:!0},{name:"as",type:"string",null:!0,default:"contour"}]},st(zA,La,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var n=e.fork(e.NO_SOURCE|e.NO_FIELDS),r=e.materialize(e.SOURCE).source,i=t.field||f,o=SA().smooth(!1!==t.smooth),a=t.thresholds||function(t,e,n){const r=NA(n.levels||10,n.nice,!1!==n.zero);return"shared"!==n.resolve?r:r(t.map((t=>de(e(t).values))))}(r,i,t),s=null===t.as?null:t.as||"contour",u=[];return r.forEach((e=>{const n=i(e),r=o.size([n.width,n.height])(n.values,_(a)?a:a(n.values));!function(t,e,n,r){let i=r.scale||e.scale,o=r.translate||e.translate;Y(i)&&(i=i(n,r));Y(o)&&(o=o(n,r));if((1===i||null==i)&&!o)return;const a=(ht(i)?i:i[0])||1,s=(ht(i)?i:i[1])||1,u=o&&o[0]||0,l=o&&o[1]||0;t.forEach(OA(e,a,s,u,l))}(r,n,e,t),r.forEach((t=>{u.push(la(e,sa(null!=s?{[s]:t}:t)))}))})),this.value&&(n.rem=this.value),this.value=n.source=n.add=u,n}}),jA.Definition={type:"KDE2D",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"weight",type:"field"},{name:"groupby",type:"field",array:!0},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number",array:!0,length:2},{name:"counts",type:"boolean",default:!1},{name:"as",type:"string",default:"grid"}]};const IA=["x","y","weight","size","cellSize","bandwidth"];function WA(t,e){return IA.forEach((n=>null!=e[n]?t[n](e[n]):0)),t}function HA(t){La.call(this,null,t)}st(jA,La,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var r,i=e.fork(e.NO_SOURCE|e.NO_FIELDS),o=function(t,e){var n,r,i,o,a,s,u=[],l=t=>t(o);if(null==e)u.push(t);else for(n={},r=0,i=t.length;r<i;++r)o=t[r],(s=n[a=e.map(l)])||(n[a]=s=[],s.dims=a,u.push(s)),s.push(o);return u}(e.materialize(e.SOURCE).source,t.groupby),a=(t.groupby||[]).map(n),s=WA(UA(),t),u=t.as||"grid";return r=o.map((e=>sa(function(t,e){for(let n=0;n<a.length;++n)t[a[n]]=e[n];return t}({[u]:s(e,t.counts)},e.dims)))),this.value&&(i.rem=this.value),this.value=i.source=i.add=r,i}}),HA.Definition={type:"Contour",metadata:{generates:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"values",type:"number",array:!0},{name:"x",type:"field"},{name:"y",type:"field"},{name:"weight",type:"field"},{name:"cellSize",type:"number"},{name:"bandwidth",type:"number"},{name:"count",type:"number"},{name:"nice",type:"boolean",default:!1},{name:"thresholds",type:"number",array:!0},{name:"smooth",type:"boolean",default:!0}]},st(HA,La,{transform(t,e){if(this.value&&!e.changed()&&!t.modified())return e.StopPropagation;var n,r,i=e.fork(e.NO_SOURCE|e.NO_FIELDS),o=SA().smooth(!1!==t.smooth),a=t.values,s=t.thresholds||NA(t.count||10,t.nice,!!a),u=t.size;return a||(a=e.materialize(e.SOURCE).source,r=OA(n=WA(UA(),t)(a,!0),n.scale||1,n.scale||1,0,0),u=[n.width,n.height],a=n.values),s=_(s)?s:s(a),a=o.size(u)(a,s),r&&a.forEach(r),this.value&&(i.rem=this.value),this.value=i.source=i.add=(a||[]).map(sa),i}});const YA="Feature",GA="FeatureCollection";function VA(t){La.call(this,null,t)}function XA(t){La.call(this,null,t)}function JA(t){La.call(this,null,t)}function ZA(t){La.call(this,null,t)}function QA(t){La.call(this,[],t),this.generator=function(){var t,e,n,r,i,o,a,s,u,l,c,f,h=10,d=h,p=90,g=360,m=2.5;function y(){return{type:"MultiLineString",coordinates:v()}}function v(){return be(Eb(r/p)*p,n,p).map(c).concat(be(Eb(s/g)*g,a,g).map(f)).concat(be(Eb(e/h)*h,t,h).filter((function(t){return wb(t%p)>pb})).map(u)).concat(be(Eb(o/d)*d,i,d).filter((function(t){return wb(t%g)>pb})).map(l))}return y.lines=function(){return v().map((function(t){return{type:"LineString",coordinates:t}}))},y.outline=function(){return{type:"Polygon",coordinates:[c(r).concat(f(a).slice(1),c(n).reverse().slice(1),f(s).reverse().slice(1))]}},y.extent=function(t){return arguments.length?y.extentMajor(t).extentMinor(t):y.extentMinor()},y.extentMajor=function(t){return arguments.length?(r=+t[0][0],n=+t[1][0],s=+t[0][1],a=+t[1][1],r>n&&(t=r,r=n,n=t),s>a&&(t=s,s=a,a=t),y.precision(m)):[[r,s],[n,a]]},y.extentMinor=function(n){return arguments.length?(e=+n[0][0],t=+n[1][0],o=+n[0][1],i=+n[1][1],e>t&&(n=e,e=t,t=n),o>i&&(n=o,o=i,i=n),y.precision(m)):[[e,o],[t,i]]},y.step=function(t){return arguments.length?y.stepMajor(t).stepMinor(t):y.stepMinor()},y.stepMajor=function(t){return arguments.length?(p=+t[0],g=+t[1],y):[p,g]},y.stepMinor=function(t){return arguments.length?(h=+t[0],d=+t[1],y):[h,d]},y.precision=function(h){return arguments.length?(m=+h,u=Ak(o,i,90),l=Ek(e,t,m),c=Ak(s,a,90),f=Ek(r,n,m),y):m},y.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])}()}function KA(t){La.call(this,null,t)}function tE(t){if(!Y(t))return!1;const e=Dt(r(t));return e.$x||e.$y||e.$value||e.$max}function eE(t){La.call(this,null,t),this.modified(!0)}function nE(t,e,n){Y(t[e])&&t[e](n)}VA.Definition={type:"GeoJSON",metadata:{},params:[{name:"fields",type:"field",array:!0,length:2},{name:"geojson",type:"field"}]},st(VA,La,{transform(t,e){var n,i=this._features,o=this._points,a=t.fields,s=a&&a[0],u=a&&a[1],l=t.geojson||!a&&f,c=e.ADD;n=t.modified()||e.changed(e.REM)||e.modified(r(l))||s&&e.modified(r(s))||u&&e.modified(r(u)),this.value&&!n||(c=e.SOURCE,this._features=i=[],this._points=o=[]),l&&e.visit(c,(t=>i.push(l(t)))),s&&u&&(e.visit(c,(t=>{var e=s(t),n=u(t);null!=e&&null!=n&&(e=+e)===e&&(n=+n)===n&&o.push([e,n])})),i=i.concat({type:YA,geometry:{type:"MultiPoint",coordinates:o}})),this.value={type:GA,features:i}}}),XA.Definition={type:"GeoPath",metadata:{modifies:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"path"}]},st(XA,La,{transform(t,e){var n=e.fork(e.ALL),r=this.value,i=t.field||f,o=t.as||"path",a=n.SOURCE;!r||t.modified()?(this.value=r=EA(t.projection),n.materialize().reflow()):a=i===f||e.modified(i.fields)?n.ADD_MOD:n.ADD;const s=function(t,e){const n=t.pointRadius();t.context(null),null!=e&&t.pointRadius(e);return n}(r,t.pointRadius);return n.visit(a,(t=>t[o]=r(i(t)))),r.pointRadius(s),n.modifies(o)}}),JA.Definition={type:"GeoPoint",metadata:{modifies:!0},params:[{name:"projection",type:"projection",required:!0},{name:"fields",type:"field",array:!0,required:!0,length:2},{name:"as",type:"string",array:!0,length:2,default:["x","y"]}]},st(JA,La,{transform(t,e){var n,r=t.projection,i=t.fields[0],o=t.fields[1],a=t.as||["x","y"],s=a[0],u=a[1];function l(t){const e=r([i(t),o(t)]);e?(t[s]=e[0],t[u]=e[1]):(t[s]=void 0,t[u]=void 0)}return t.modified()?e=e.materialize().reflow(!0).visit(e.SOURCE,l):(n=e.modified(i.fields)||e.modified(o.fields),e.visit(n?e.ADD_MOD:e.ADD,l)),e.modifies(a)}}),ZA.Definition={type:"GeoShape",metadata:{modifies:!0,nomod:!0},params:[{name:"projection",type:"projection"},{name:"field",type:"field",default:"datum"},{name:"pointRadius",type:"number",expr:!0},{name:"as",type:"string",default:"shape"}]},st(ZA,La,{transform(t,e){var n=e.fork(e.ALL),r=this.value,i=t.as||"shape",o=n.ADD;return r&&!t.modified()||(this.value=r=function(t,e,n){const r=null==n?n=>t(e(n)):r=>{var i=t.pointRadius(),o=t.pointRadius(n)(e(r));return t.pointRadius(i),o};return r.context=e=>(t.context(e),r),r}(EA(t.projection),t.field||l("datum"),t.pointRadius),n.materialize().reflow(),o=n.SOURCE),n.visit(o,(t=>t[i]=r)),n.modifies(i)}}),QA.Definition={type:"Graticule",metadata:{changes:!0,generates:!0},params:[{name:"extent",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMajor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"extentMinor",type:"array",array:!0,length:2,content:{type:"number",array:!0,length:2}},{name:"step",type:"number",array:!0,length:2},{name:"stepMajor",type:"number",array:!0,length:2,default:[90,360]},{name:"stepMinor",type:"number",array:!0,length:2,default:[10,10]},{name:"precision",type:"number",default:2.5}]},st(QA,La,{transform(t,e){var n,r=this.value,i=this.generator;if(!r.length||t.modified())for(const e in t)Y(i[e])&&i[e](t[e]);return n=i(),r.length?e.mod.push(ca(r[0],n)):e.add.push(sa(n)),r[0]=n,e}}),KA.Definition={type:"heatmap",metadata:{modifies:!0},params:[{name:"field",type:"field"},{name:"color",type:"string",expr:!0},{name:"opacity",type:"number",expr:!0},{name:"resolve",type:"enum",values:["shared","independent"],default:"independent"},{name:"as",type:"string",default:"image"}]},st(KA,La,{transform(t,e){if(!e.changed()&&!t.modified())return e.StopPropagation;var n=e.materialize(e.SOURCE).source,r="shared"===t.resolve,i=t.field||f,o=function(t,e){let n;Y(t)?(n=n=>t(n,e),n.dep=tE(t)):t?n=Q(t):(n=t=>t.$value/t.$max||0,n.dep=!0);return n}(t.opacity,t),a=function(t,e){let n;Y(t)?(n=n=>Gc(t(n,e)),n.dep=tE(t)):n=Q(Gc(t||"#888"));return n}(t.color,t),s=t.as||"image",u={$x:0,$y:0,$value:0,$max:r?de(n.map((t=>de(i(t).values)))):0};return n.forEach((t=>{const e=i(t),n=tt({},t,u);r||(n.$max=de(e.values||[])),t[s]=function(t,e,n,r){const i=t.width,o=t.height,a=t.x1||0,s=t.y1||0,u=t.x2||i,l=t.y2||o,c=t.values,f=c?t=>c[t]:h,d=_c(u-a,l-s),p=d.getContext("2d"),g=p.getImageData(0,0,u-a,l-s),m=g.data;for(let t=s,o=0;t<l;++t){e.$y=t-s;for(let s=a,l=t*i;s<u;++s,o+=4){e.$x=s-a,e.$value=f(s+l);const t=n(e);m[o+0]=t.r,m[o+1]=t.g,m[o+2]=t.b,m[o+3]=~~(255*r(e))}}return p.putImageData(g,0,0),d}(e,n,a.dep?a:Q(a(n)),o.dep?o:Q(o(n)))})),e.reflow(!0).modifies(s)}}),st(eE,La,{transform(t,e){let n=this.value;return!n||t.modified("type")?(this.value=n=function(t){const e=AA((t||"mercator").toLowerCase());e||s("Unrecognized projection type: "+t);return e()}(t.type),MA.forEach((e=>{null!=t[e]&&nE(n,e,t[e])}))):MA.forEach((e=>{t.modified(e)&&nE(n,e,t[e])})),null!=t.pointRadius&&n.path.pointRadius(t.pointRadius),t.fit&&function(t,e){const n=function(t){return t=W(t),1===t.length?t[0]:{type:GA,features:t.reduce(((t,e)=>t.concat(function(t){return t.type===GA?t.features:W(t).filter((t=>null!=t)).map((t=>t.type===YA?t:{type:YA,geometry:t}))}(e))),[])}}(e.fit);e.extent?t.fitExtent(e.extent,n):e.size&&t.fitSize(e.size,n)}(n,t),e.fork(e.NO_SOURCE|e.NO_FIELDS)}});var rE=Object.freeze({__proto__:null,contour:HA,geojson:VA,geopath:XA,geopoint:JA,geoshape:ZA,graticule:QA,heatmap:KA,isocontour:zA,kde2d:jA,projection:eE});function iE(t,e,n,r){if(isNaN(e)||isNaN(n))return t;var i,o,a,s,u,l,c,f,h,d=t._root,p={data:r},g=t._x0,m=t._y0,y=t._x1,v=t._y1;if(!d)return t._root=p,t;for(;d.length;)if((l=e>=(o=(g+y)/2))?g=o:y=o,(c=n>=(a=(m+v)/2))?m=a:v=a,i=d,!(d=d[f=c<<1|l]))return i[f]=p,t;if(s=+t._x.call(null,d.data),u=+t._y.call(null,d.data),e===s&&n===u)return p.next=d,i?i[f]=p:t._root=p,t;do{i=i?i[f]=new Array(4):t._root=new Array(4),(l=e>=(o=(g+y)/2))?g=o:y=o,(c=n>=(a=(m+v)/2))?m=a:v=a}while((f=c<<1|l)==(h=(u>=a)<<1|s>=o));return i[h]=d,i[f]=p,t}function oE(t,e,n,r,i){this.node=t,this.x0=e,this.y0=n,this.x1=r,this.y1=i}function aE(t){return t[0]}function sE(t){return t[1]}function uE(t,e,n){var r=new lE(null==e?aE:e,null==n?sE:n,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function lE(t,e,n,r,i,o){this._x=t,this._y=e,this._x0=n,this._y0=r,this._x1=i,this._y1=o,this._root=void 0}function cE(t){for(var e={data:t.data},n=e;t=t.next;)n=n.next={data:t.data};return e}var fE=uE.prototype=lE.prototype;function hE(t){return function(){return t}}function dE(t){return 1e-6*(t()-.5)}function pE(t){return t.x+t.vx}function gE(t){return t.y+t.vy}function mE(t){return t.index}function yE(t,e){var n=t.get(e);if(!n)throw new Error("node not found: "+e);return n}fE.copy=function(){var t,e,n=new lE(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return n;if(!r.length)return n._root=cE(r),n;for(t=[{source:r,target:n._root=new Array(4)}];r=t.pop();)for(var i=0;i<4;++i)(e=r.source[i])&&(e.length?t.push({source:e,target:r.target[i]=new Array(4)}):r.target[i]=cE(e));return n},fE.add=function(t){const e=+this._x.call(null,t),n=+this._y.call(null,t);return iE(this.cover(e,n),e,n,t)},fE.addAll=function(t){var e,n,r,i,o=t.length,a=new Array(o),s=new Array(o),u=1/0,l=1/0,c=-1/0,f=-1/0;for(n=0;n<o;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(i=+this._y.call(null,e))||(a[n]=r,s[n]=i,r<u&&(u=r),r>c&&(c=r),i<l&&(l=i),i>f&&(f=i));if(u>c||l>f)return this;for(this.cover(u,l).cover(c,f),n=0;n<o;++n)iE(this,a[n],s[n],t[n]);return this},fE.cover=function(t,e){if(isNaN(t=+t)||isNaN(e=+e))return this;var n=this._x0,r=this._y0,i=this._x1,o=this._y1;if(isNaN(n))i=(n=Math.floor(t))+1,o=(r=Math.floor(e))+1;else{for(var a,s,u=i-n||1,l=this._root;n>t||t>=i||r>e||e>=o;)switch(s=(e<r)<<1|t<n,(a=new Array(4))[s]=l,l=a,u*=2,s){case 0:i=n+u,o=r+u;break;case 1:n=i-u,o=r+u;break;case 2:i=n+u,r=o-u;break;case 3:n=i-u,r=o-u}this._root&&this._root.length&&(this._root=l)}return this._x0=n,this._y0=r,this._x1=i,this._y1=o,this},fE.data=function(){var t=[];return this.visit((function(e){if(!e.length)do{t.push(e.data)}while(e=e.next)})),t},fE.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},fE.find=function(t,e,n){var r,i,o,a,s,u,l,c=this._x0,f=this._y0,h=this._x1,d=this._y1,p=[],g=this._root;for(g&&p.push(new oE(g,c,f,h,d)),null==n?n=1/0:(c=t-n,f=e-n,h=t+n,d=e+n,n*=n);u=p.pop();)if(!(!(g=u.node)||(i=u.x0)>h||(o=u.y0)>d||(a=u.x1)<c||(s=u.y1)<f))if(g.length){var m=(i+a)/2,y=(o+s)/2;p.push(new oE(g[3],m,y,a,s),new oE(g[2],i,y,m,s),new oE(g[1],m,o,a,y),new oE(g[0],i,o,m,y)),(l=(e>=y)<<1|t>=m)&&(u=p[p.length-1],p[p.length-1]=p[p.length-1-l],p[p.length-1-l]=u)}else{var v=t-+this._x.call(null,g.data),_=e-+this._y.call(null,g.data),x=v*v+_*_;if(x<n){var b=Math.sqrt(n=x);c=t-b,f=e-b,h=t+b,d=e+b,r=g.data}}return r},fE.remove=function(t){if(isNaN(o=+this._x.call(null,t))||isNaN(a=+this._y.call(null,t)))return this;var e,n,r,i,o,a,s,u,l,c,f,h,d=this._root,p=this._x0,g=this._y0,m=this._x1,y=this._y1;if(!d)return this;if(d.length)for(;;){if((l=o>=(s=(p+m)/2))?p=s:m=s,(c=a>=(u=(g+y)/2))?g=u:y=u,e=d,!(d=d[f=c<<1|l]))return this;if(!d.length)break;(e[f+1&3]||e[f+2&3]||e[f+3&3])&&(n=e,h=f)}for(;d.data!==t;)if(r=d,!(d=d.next))return this;return(i=d.next)&&delete d.next,r?(i?r.next=i:delete r.next,this):e?(i?e[f]=i:delete e[f],(d=e[0]||e[1]||e[2]||e[3])&&d===(e[3]||e[2]||e[1]||e[0])&&!d.length&&(n?n[h]=d:this._root=d),this):(this._root=i,this)},fE.removeAll=function(t){for(var e=0,n=t.length;e<n;++e)this.remove(t[e]);return this},fE.root=function(){return this._root},fE.size=function(){var t=0;return this.visit((function(e){if(!e.length)do{++t}while(e=e.next)})),t},fE.visit=function(t){var e,n,r,i,o,a,s=[],u=this._root;for(u&&s.push(new oE(u,this._x0,this._y0,this._x1,this._y1));e=s.pop();)if(!t(u=e.node,r=e.x0,i=e.y0,o=e.x1,a=e.y1)&&u.length){var l=(r+o)/2,c=(i+a)/2;(n=u[3])&&s.push(new oE(n,l,c,o,a)),(n=u[2])&&s.push(new oE(n,r,c,l,a)),(n=u[1])&&s.push(new oE(n,l,i,o,c)),(n=u[0])&&s.push(new oE(n,r,i,l,c))}return this},fE.visitAfter=function(t){var e,n=[],r=[];for(this._root&&n.push(new oE(this._root,this._x0,this._y0,this._x1,this._y1));e=n.pop();){var i=e.node;if(i.length){var o,a=e.x0,s=e.y0,u=e.x1,l=e.y1,c=(a+u)/2,f=(s+l)/2;(o=i[0])&&n.push(new oE(o,a,s,c,f)),(o=i[1])&&n.push(new oE(o,c,s,u,f)),(o=i[2])&&n.push(new oE(o,a,f,c,l)),(o=i[3])&&n.push(new oE(o,c,f,u,l))}r.push(e)}for(;e=r.pop();)t(e.node,e.x0,e.y0,e.x1,e.y1);return this},fE.x=function(t){return arguments.length?(this._x=t,this):this._x},fE.y=function(t){return arguments.length?(this._y=t,this):this._y};var vE={value:()=>{}};function _E(){for(var t,e=0,n=arguments.length,r={};e<n;++e){if(!(t=arguments[e]+"")||t in r||/[\s.]/.test(t))throw new Error("illegal type: "+t);r[t]=[]}return new xE(r)}function xE(t){this._=t}function bE(t,e){for(var n,r=0,i=t.length;r<i;++r)if((n=t[r]).name===e)return n.value}function wE(t,e,n){for(var r=0,i=t.length;r<i;++r)if(t[r].name===e){t[r]=vE,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=n&&t.push({name:e,value:n}),t}xE.prototype=_E.prototype={constructor:xE,on:function(t,e){var n,r,i=this._,o=(r=i,(t+"").trim().split(/^|\s+/).map((function(t){var e="",n=t.indexOf(".");if(n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),t&&!r.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}}))),a=-1,s=o.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++a<s;)if(n=(t=o[a]).type)i[n]=wE(i[n],t.name,e);else if(null==e)for(n in i)i[n]=wE(i[n],t.name,null);return this}for(;++a<s;)if((n=(t=o[a]).type)&&(n=bE(i[n],t.name)))return n},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new xE(t)},call:function(t,e){if((n=arguments.length-2)>0)for(var n,r,i=new Array(n),o=0;o<n;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=0,n=(r=this._[t]).length;o<n;++o)r[o].value.apply(e,i)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(e,n)}};var kE,ME,AE=0,EE=0,DE=0,CE=0,FE=0,SE=0,$E="object"==typeof performance&&performance.now?performance:Date,TE="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function BE(){return FE||(TE(NE),FE=$E.now()+SE)}function NE(){FE=0}function zE(){this._call=this._time=this._next=null}function OE(t,e,n){var r=new zE;return r.restart(t,e,n),r}function RE(){FE=(CE=$E.now())+SE,AE=EE=0;try{!function(){BE(),++AE;for(var t,e=kE;e;)(t=FE-e._time)>=0&&e._call.call(void 0,t),e=e._next;--AE}()}finally{AE=0,function(){var t,e,n=kE,r=1/0;for(;n;)n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:kE=e);ME=t,UE(r)}(),FE=0}}function LE(){var t=$E.now(),e=t-CE;e>1e3&&(SE-=e,CE=t)}function UE(t){AE||(EE&&(EE=clearTimeout(EE)),t-FE>24?(t<1/0&&(EE=setTimeout(RE,t-$E.now()-SE)),DE&&(DE=clearInterval(DE))):(DE||(CE=$E.now(),DE=setInterval(LE,1e3)),AE=1,TE(RE)))}zE.prototype=OE.prototype={constructor:zE,restart:function(t,e,n){if("function"!=typeof t)throw new TypeError("callback is not a function");n=(null==n?BE():+n)+(null==e?0:+e),this._next||ME===this||(ME?ME._next=this:kE=this,ME=this),this._call=t,this._time=n,UE()},stop:function(){this._call&&(this._call=null,this._time=1/0,UE())}};const qE=4294967296;function PE(t){return t.x}function jE(t){return t.y}var IE=Math.PI*(3-Math.sqrt(5));function WE(t){var e,n=1,r=.001,i=1-Math.pow(r,1/300),o=0,a=.6,s=new Map,u=OE(f),l=_E("tick","end"),c=function(){let t=1;return()=>(t=(1664525*t+1013904223)%qE)/qE}();function f(){h(),l.call("tick",e),n<r&&(u.stop(),l.call("end",e))}function h(r){var u,l,c=t.length;void 0===r&&(r=1);for(var f=0;f<r;++f)for(n+=(o-n)*i,s.forEach((function(t){t(n)})),u=0;u<c;++u)null==(l=t[u]).fx?l.x+=l.vx*=a:(l.x=l.fx,l.vx=0),null==l.fy?l.y+=l.vy*=a:(l.y=l.fy,l.vy=0);return e}function d(){for(var e,n=0,r=t.length;n<r;++n){if((e=t[n]).index=n,null!=e.fx&&(e.x=e.fx),null!=e.fy&&(e.y=e.fy),isNaN(e.x)||isNaN(e.y)){var i=10*Math.sqrt(.5+n),o=n*IE;e.x=i*Math.cos(o),e.y=i*Math.sin(o)}(isNaN(e.vx)||isNaN(e.vy))&&(e.vx=e.vy=0)}}function p(e){return e.initialize&&e.initialize(t,c),e}return null==t&&(t=[]),d(),e={tick:h,restart:function(){return u.restart(f),e},stop:function(){return u.stop(),e},nodes:function(n){return arguments.length?(t=n,d(),s.forEach(p),e):t},alpha:function(t){return arguments.length?(n=+t,e):n},alphaMin:function(t){return arguments.length?(r=+t,e):r},alphaDecay:function(t){return arguments.length?(i=+t,e):+i},alphaTarget:function(t){return arguments.length?(o=+t,e):o},velocityDecay:function(t){return arguments.length?(a=1-t,e):1-a},randomSource:function(t){return arguments.length?(c=t,s.forEach(p),e):c},force:function(t,n){return arguments.length>1?(null==n?s.delete(t):s.set(t,p(n)),e):s.get(t)},find:function(e,n,r){var i,o,a,s,u,l=0,c=t.length;for(null==r?r=1/0:r*=r,l=0;l<c;++l)(a=(i=e-(s=t[l]).x)*i+(o=n-s.y)*o)<r&&(u=s,r=a);return u},on:function(t,n){return arguments.length>1?(l.on(t,n),e):l.on(t)}}}const HE={center:function(t,e){var n,r=1;function i(){var i,o,a=n.length,s=0,u=0;for(i=0;i<a;++i)s+=(o=n[i]).x,u+=o.y;for(s=(s/a-t)*r,u=(u/a-e)*r,i=0;i<a;++i)(o=n[i]).x-=s,o.y-=u}return null==t&&(t=0),null==e&&(e=0),i.initialize=function(t){n=t},i.x=function(e){return arguments.length?(t=+e,i):t},i.y=function(t){return arguments.length?(e=+t,i):e},i.strength=function(t){return arguments.length?(r=+t,i):r},i},collide:function(t){var e,n,r,i=1,o=1;function a(){for(var t,a,u,l,c,f,h,d=e.length,p=0;p<o;++p)for(a=uE(e,pE,gE).visitAfter(s),t=0;t<d;++t)u=e[t],f=n[u.index],h=f*f,l=u.x+u.vx,c=u.y+u.vy,a.visit(g);function g(t,e,n,o,a){var s=t.data,d=t.r,p=f+d;if(!s)return e>l+p||o<l-p||n>c+p||a<c-p;if(s.index>u.index){var g=l-s.x-s.vx,m=c-s.y-s.vy,y=g*g+m*m;y<p*p&&(0===g&&(y+=(g=dE(r))*g),0===m&&(y+=(m=dE(r))*m),y=(p-(y=Math.sqrt(y)))/y*i,u.vx+=(g*=y)*(p=(d*=d)/(h+d)),u.vy+=(m*=y)*p,s.vx-=g*(p=1-p),s.vy-=m*p)}}}function s(t){if(t.data)return t.r=n[t.data.index];for(var e=t.r=0;e<4;++e)t[e]&&t[e].r>t.r&&(t.r=t[e].r)}function u(){if(e){var r,i,o=e.length;for(n=new Array(o),r=0;r<o;++r)i=e[r],n[i.index]=+t(i,r,e)}}return"function"!=typeof t&&(t=hE(null==t?1:+t)),a.initialize=function(t,n){e=t,r=n,u()},a.iterations=function(t){return arguments.length?(o=+t,a):o},a.strength=function(t){return arguments.length?(i=+t,a):i},a.radius=function(e){return arguments.length?(t="function"==typeof e?e:hE(+e),u(),a):t},a},nbody:function(){var t,e,n,r,i,o=hE(-30),a=1,s=1/0,u=.81;function l(n){var i,o=t.length,a=uE(t,PE,jE).visitAfter(f);for(r=n,i=0;i<o;++i)e=t[i],a.visit(h)}function c(){if(t){var e,n,r=t.length;for(i=new Array(r),e=0;e<r;++e)n=t[e],i[n.index]=+o(n,e,t)}}function f(t){var e,n,r,o,a,s=0,u=0;if(t.length){for(r=o=a=0;a<4;++a)(e=t[a])&&(n=Math.abs(e.value))&&(s+=e.value,u+=n,r+=n*e.x,o+=n*e.y);t.x=r/u,t.y=o/u}else{(e=t).x=e.data.x,e.y=e.data.y;do{s+=i[e.data.index]}while(e=e.next)}t.value=s}function h(t,o,l,c){if(!t.value)return!0;var f=t.x-e.x,h=t.y-e.y,d=c-o,p=f*f+h*h;if(d*d/u<p)return p<s&&(0===f&&(p+=(f=dE(n))*f),0===h&&(p+=(h=dE(n))*h),p<a&&(p=Math.sqrt(a*p)),e.vx+=f*t.value*r/p,e.vy+=h*t.value*r/p),!0;if(!(t.length||p>=s)){(t.data!==e||t.next)&&(0===f&&(p+=(f=dE(n))*f),0===h&&(p+=(h=dE(n))*h),p<a&&(p=Math.sqrt(a*p)));do{t.data!==e&&(d=i[t.data.index]*r/p,e.vx+=f*d,e.vy+=h*d)}while(t=t.next)}}return l.initialize=function(e,r){t=e,n=r,c()},l.strength=function(t){return arguments.length?(o="function"==typeof t?t:hE(+t),c(),l):o},l.distanceMin=function(t){return arguments.length?(a=t*t,l):Math.sqrt(a)},l.distanceMax=function(t){return arguments.length?(s=t*t,l):Math.sqrt(s)},l.theta=function(t){return arguments.length?(u=t*t,l):Math.sqrt(u)},l},link:function(t){var e,n,r,i,o,a,s=mE,u=function(t){return 1/Math.min(i[t.source.index],i[t.target.index])},l=hE(30),c=1;function f(r){for(var i=0,s=t.length;i<c;++i)for(var u,l,f,h,d,p,g,m=0;m<s;++m)l=(u=t[m]).source,h=(f=u.target).x+f.vx-l.x-l.vx||dE(a),d=f.y+f.vy-l.y-l.vy||dE(a),h*=p=((p=Math.sqrt(h*h+d*d))-n[m])/p*r*e[m],d*=p,f.vx-=h*(g=o[m]),f.vy-=d*g,l.vx+=h*(g=1-g),l.vy+=d*g}function h(){if(r){var a,u,l=r.length,c=t.length,f=new Map(r.map(((t,e)=>[s(t,e,r),t])));for(a=0,i=new Array(l);a<c;++a)(u=t[a]).index=a,"object"!=typeof u.source&&(u.source=yE(f,u.source)),"object"!=typeof u.target&&(u.target=yE(f,u.target)),i[u.source.index]=(i[u.source.index]||0)+1,i[u.target.index]=(i[u.target.index]||0)+1;for(a=0,o=new Array(c);a<c;++a)u=t[a],o[a]=i[u.source.index]/(i[u.source.index]+i[u.target.index]);e=new Array(c),d(),n=new Array(c),p()}}function d(){if(r)for(var n=0,i=t.length;n<i;++n)e[n]=+u(t[n],n,t)}function p(){if(r)for(var e=0,i=t.length;e<i;++e)n[e]=+l(t[e],e,t)}return null==t&&(t=[]),f.initialize=function(t,e){r=t,a=e,h()},f.links=function(e){return arguments.length?(t=e,h(),f):t},f.id=function(t){return arguments.length?(s=t,f):s},f.iterations=function(t){return arguments.length?(c=+t,f):c},f.strength=function(t){return arguments.length?(u="function"==typeof t?t:hE(+t),d(),f):u},f.distance=function(t){return arguments.length?(l="function"==typeof t?t:hE(+t),p(),f):l},f},x:function(t){var e,n,r,i=hE(.1);function o(t){for(var i,o=0,a=e.length;o<a;++o)(i=e[o]).vx+=(r[o]-i.x)*n[o]*t}function a(){if(e){var o,a=e.length;for(n=new Array(a),r=new Array(a),o=0;o<a;++o)n[o]=isNaN(r[o]=+t(e[o],o,e))?0:+i(e[o],o,e)}}return"function"!=typeof t&&(t=hE(null==t?0:+t)),o.initialize=function(t){e=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:hE(+t),a(),o):i},o.x=function(e){return arguments.length?(t="function"==typeof e?e:hE(+e),a(),o):t},o},y:function(t){var e,n,r,i=hE(.1);function o(t){for(var i,o=0,a=e.length;o<a;++o)(i=e[o]).vy+=(r[o]-i.y)*n[o]*t}function a(){if(e){var o,a=e.length;for(n=new Array(a),r=new Array(a),o=0;o<a;++o)n[o]=isNaN(r[o]=+t(e[o],o,e))?0:+i(e[o],o,e)}}return"function"!=typeof t&&(t=hE(null==t?0:+t)),o.initialize=function(t){e=t,a()},o.strength=function(t){return arguments.length?(i="function"==typeof t?t:hE(+t),a(),o):i},o.y=function(e){return arguments.length?(t="function"==typeof e?e:hE(+e),a(),o):t},o}},YE="forces",GE=["alpha","alphaMin","alphaTarget","velocityDecay","forces"],VE=["static","iterations"],XE=["x","y","vx","vy"];function JE(t){La.call(this,null,t)}function ZE(t,e,n,r){var i,o,a,s,u=W(e.forces);for(i=0,o=GE.length;i<o;++i)(a=GE[i])!==YE&&e.modified(a)&&t[a](e[a]);for(i=0,o=u.length;i<o;++i)s=YE+i,(a=n||e.modified(YE,i)?KE(u[i]):r&&QE(u[i],r)?t.force(s):null)&&t.force(s,a);for(o=t.numForces||0;i<o;++i)t.force(YE+i,null);return t.numForces=u.length,t}function QE(t,e){var n,i;for(n in t)if(Y(i=t[n])&&e.modified(r(i)))return 1;return 0}function KE(t){var e,n;for(n in rt(HE,t.force)||s("Unrecognized force: "+t.force),e=HE[t.force](),t)Y(e[n])&&tD(e[n],t[n],t);return e}function tD(t,e,n){t(Y(e)?t=>e(t,n):e)}JE.Definition={type:"Force",metadata:{modifies:!0},params:[{name:"static",type:"boolean",default:!1},{name:"restart",type:"boolean",default:!1},{name:"iterations",type:"number",default:300},{name:"alpha",type:"number",default:1},{name:"alphaMin",type:"number",default:.001},{name:"alphaTarget",type:"number",default:0},{name:"velocityDecay",type:"number",default:.4},{name:"forces",type:"param",array:!0,params:[{key:{force:"center"},params:[{name:"x",type:"number",default:0},{name:"y",type:"number",default:0}]},{key:{force:"collide"},params:[{name:"radius",type:"number",expr:!0},{name:"strength",type:"number",default:.7},{name:"iterations",type:"number",default:1}]},{key:{force:"nbody"},params:[{name:"strength",type:"number",default:-30,expr:!0},{name:"theta",type:"number",default:.9},{name:"distanceMin",type:"number",default:1},{name:"distanceMax",type:"number"}]},{key:{force:"link"},params:[{name:"links",type:"data"},{name:"id",type:"field"},{name:"distance",type:"number",default:30,expr:!0},{name:"strength",type:"number",expr:!0},{name:"iterations",type:"number",default:1}]},{key:{force:"x"},params:[{name:"strength",type:"number",default:.1},{name:"x",type:"field"}]},{key:{force:"y"},params:[{name:"strength",type:"number",default:.1},{name:"y",type:"field"}]}]},{name:"as",type:"string",array:!0,modify:!1,default:XE}]},st(JE,La,{transform(t,e){var n,r,i=this.value,o=e.changed(e.ADD_REM),a=t.modified(GE),s=t.iterations||300;if(i?(o&&(e.modifies("index"),i.nodes(e.source)),(a||e.changed(e.MOD))&&ZE(i,t,0,e)):(this.value=i=function(t,e){const n=WE(t),r=n.stop,i=n.restart;let o=!1;return n.stopped=()=>o,n.restart=()=>(o=!1,i()),n.stop=()=>(o=!0,r()),ZE(n,e,!0).on("end",(()=>o=!0))}(e.source,t),i.on("tick",(n=e.dataflow,r=this,()=>n.touch(r).run())),t.static||(o=!0,i.tick()),e.modifies("index")),a||o||t.modified(VE)||e.changed()&&t.restart)if(i.alpha(Math.max(i.alpha(),t.alpha||1)).alphaDecay(1-Math.pow(i.alphaMin(),1/s)),t.static)for(i.stop();--s>=0;)i.tick();else if(i.stopped()&&i.restart(),!o)return e.StopPropagation;return this.finish(t,e)},finish(t,e){const n=e.dataflow;for(let t,e=this._argops,s=0,u=e.length;s<u;++s)if(t=e[s],t.name===YE&&"link"===t.op._argval.force)for(var r,i=t.op._argops,o=0,a=i.length;o<a;++o)if("links"===i[o].name&&(r=i[o].op.source)){n.pulse(r,n.changeset().reflow());break}return e.reflow(t.modified()).modifies(XE)}});var eD=Object.freeze({__proto__:null,force:JE});function nD(t,e){return t.parent===e.parent?1:2}function rD(t,e){return t+e.x}function iD(t,e){return Math.max(t,e.y)}function oD(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function aD(t,e){t instanceof Map?(t=[void 0,t],void 0===e&&(e=uD)):void 0===e&&(e=sD);for(var n,r,i,o,a,s=new fD(t),u=[s];n=u.pop();)if((i=e(n.data))&&(a=(i=Array.from(i)).length))for(n.children=i,o=a-1;o>=0;--o)u.push(r=i[o]=new fD(i[o])),r.parent=n,r.depth=n.depth+1;return s.eachBefore(cD)}function sD(t){return t.children}function uD(t){return Array.isArray(t)?t[1]:null}function lD(t){void 0!==t.data.value&&(t.value=t.data.value),t.data=t.data.data}function cD(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function fD(t){this.data=t,this.depth=this.height=0,this.parent=null}function hD(t){return null==t?null:dD(t)}function dD(t){if("function"!=typeof t)throw new Error;return t}function pD(){return 0}function gD(t){return function(){return t}}fD.prototype=aD.prototype={constructor:fD,count:function(){return this.eachAfter(oD)},each:function(t,e){let n=-1;for(const r of this)t.call(e,r,++n,this);return this},eachAfter:function(t,e){for(var n,r,i,o=this,a=[o],s=[],u=-1;o=a.pop();)if(s.push(o),n=o.children)for(r=0,i=n.length;r<i;++r)a.push(n[r]);for(;o=s.pop();)t.call(e,o,++u,this);return this},eachBefore:function(t,e){for(var n,r,i=this,o=[i],a=-1;i=o.pop();)if(t.call(e,i,++a,this),n=i.children)for(r=n.length-1;r>=0;--r)o.push(n[r]);return this},find:function(t,e){let n=-1;for(const r of this)if(t.call(e,r,++n,this))return r},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){return Array.from(this)},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return aD(this).eachBefore(lD)},[Symbol.iterator]:function*(){var t,e,n,r,i=this,o=[i];do{for(t=o.reverse(),o=[];i=t.pop();)if(yield i,e=i.children)for(n=0,r=e.length;n<r;++n)o.push(e[n])}while(o.length)}};const mD=4294967296;function yD(t,e){var n,r;if(xD(e,t))return[e];for(n=0;n<t.length;++n)if(vD(e,t[n])&&xD(wD(t[n],e),t))return[t[n],e];for(n=0;n<t.length-1;++n)for(r=n+1;r<t.length;++r)if(vD(wD(t[n],t[r]),e)&&vD(wD(t[n],e),t[r])&&vD(wD(t[r],e),t[n])&&xD(kD(t[n],t[r],e),t))return[t[n],t[r],e];throw new Error}function vD(t,e){var n=t.r-e.r,r=e.x-t.x,i=e.y-t.y;return n<0||n*n<r*r+i*i}function _D(t,e){var n=t.r-e.r+1e-9*Math.max(t.r,e.r,1),r=e.x-t.x,i=e.y-t.y;return n>0&&n*n>r*r+i*i}function xD(t,e){for(var n=0;n<e.length;++n)if(!_D(t,e[n]))return!1;return!0}function bD(t){switch(t.length){case 1:return function(t){return{x:t.x,y:t.y,r:t.r}}(t[0]);case 2:return wD(t[0],t[1]);case 3:return kD(t[0],t[1],t[2])}}function wD(t,e){var n=t.x,r=t.y,i=t.r,o=e.x,a=e.y,s=e.r,u=o-n,l=a-r,c=s-i,f=Math.sqrt(u*u+l*l);return{x:(n+o+u/f*c)/2,y:(r+a+l/f*c)/2,r:(f+i+s)/2}}function kD(t,e,n){var r=t.x,i=t.y,o=t.r,a=e.x,s=e.y,u=e.r,l=n.x,c=n.y,f=n.r,h=r-a,d=r-l,p=i-s,g=i-c,m=u-o,y=f-o,v=r*r+i*i-o*o,_=v-a*a-s*s+u*u,x=v-l*l-c*c+f*f,b=d*p-h*g,w=(p*x-g*_)/(2*b)-r,k=(g*m-p*y)/b,M=(d*_-h*x)/(2*b)-i,A=(h*y-d*m)/b,E=k*k+A*A-1,D=2*(o+w*k+M*A),C=w*w+M*M-o*o,F=-(Math.abs(E)>1e-6?(D+Math.sqrt(D*D-4*E*C))/(2*E):C/D);return{x:r+w+k*F,y:i+M+A*F,r:F}}function MD(t,e,n){var r,i,o,a,s=t.x-e.x,u=t.y-e.y,l=s*s+u*u;l?(i=e.r+n.r,i*=i,a=t.r+n.r,i>(a*=a)?(r=(l+a-i)/(2*l),o=Math.sqrt(Math.max(0,a/l-r*r)),n.x=t.x-r*s-o*u,n.y=t.y-r*u+o*s):(r=(l+i-a)/(2*l),o=Math.sqrt(Math.max(0,i/l-r*r)),n.x=e.x+r*s-o*u,n.y=e.y+r*u+o*s)):(n.x=e.x+n.r,n.y=e.y)}function AD(t,e){var n=t.r+e.r-1e-6,r=e.x-t.x,i=e.y-t.y;return n>0&&n*n>r*r+i*i}function ED(t){var e=t._,n=t.next._,r=e.r+n.r,i=(e.x*n.r+n.x*e.r)/r,o=(e.y*n.r+n.y*e.r)/r;return i*i+o*o}function DD(t){this._=t,this.next=null,this.previous=null}function CD(t,e){if(!(o=(t=function(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}(t)).length))return 0;var n,r,i,o,a,s,u,l,c,f,h;if((n=t[0]).x=0,n.y=0,!(o>1))return n.r;if(r=t[1],n.x=-r.r,r.x=n.r,r.y=0,!(o>2))return n.r+r.r;MD(r,n,i=t[2]),n=new DD(n),r=new DD(r),i=new DD(i),n.next=i.previous=r,r.next=n.previous=i,i.next=r.previous=n;t:for(u=3;u<o;++u){MD(n._,r._,i=t[u]),i=new DD(i),l=r.next,c=n.previous,f=r._.r,h=n._.r;do{if(f<=h){if(AD(l._,i._)){r=l,n.next=r,r.previous=n,--u;continue t}f+=l._.r,l=l.next}else{if(AD(c._,i._)){(n=c).next=r,r.previous=n,--u;continue t}h+=c._.r,c=c.previous}}while(l!==c.next);for(i.previous=n,i.next=r,n.next=r.previous=r=i,a=ED(n);(i=i.next)!==r;)(s=ED(i))<a&&(n=i,a=s);r=n.next}for(n=[r._],i=r;(i=i.next)!==r;)n.push(i._);for(i=function(t,e){for(var n,r,i=0,o=(t=function(t,e){let n,r,i=t.length;for(;i;)r=e()*i--|0,n=t[i],t[i]=t[r],t[r]=n;return t}(Array.from(t),e)).length,a=[];i<o;)n=t[i],r&&_D(r,n)?++i:(r=bD(a=yD(a,n)),i=0);return r}(n,e),u=0;u<o;++u)(n=t[u]).x-=i.x,n.y-=i.y;return i.r}function FD(t){return Math.sqrt(t.value)}function SD(t){return function(e){e.children||(e.r=Math.max(0,+t(e)||0))}}function $D(t,e,n){return function(r){if(i=r.children){var i,o,a,s=i.length,u=t(r)*e||0;if(u)for(o=0;o<s;++o)i[o].r+=u;if(a=CD(i,n),u)for(o=0;o<s;++o)i[o].r-=u;r.r=a+u}}}function TD(t){return function(e){var n=e.parent;e.r*=t,n&&(e.x=n.x+t*e.x,e.y=n.y+t*e.y)}}function BD(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function ND(t,e,n,r,i){for(var o,a=t.children,s=-1,u=a.length,l=t.value&&(r-e)/t.value;++s<u;)(o=a[s]).y0=n,o.y1=i,o.x0=e,o.x1=e+=o.value*l}var zD={depth:-1},OD={},RD={};function LD(t){return t.id}function UD(t){return t.parentId}function qD(){var t,e=LD,n=UD;function r(r){var i,o,a,s,u,l,c,f,h=Array.from(r),d=e,p=n,g=new Map;if(null!=t){const e=h.map(((e,n)=>function(t){t=`${t}`;let e=t.length;jD(t,e-1)&&!jD(t,e-2)&&(t=t.slice(0,-1));return"/"===t[0]?t:`/${t}`}(t(e,n,r)))),n=e.map(PD),i=new Set(e).add("");for(const t of n)i.has(t)||(i.add(t),e.push(t),n.push(PD(t)),h.push(RD));d=(t,n)=>e[n],p=(t,e)=>n[e]}for(a=0,i=h.length;a<i;++a)o=h[a],l=h[a]=new fD(o),null!=(c=d(o,a,r))&&(c+="")&&(f=l.id=c,g.set(f,g.has(f)?OD:l)),null!=(c=p(o,a,r))&&(c+="")&&(l.parent=c);for(a=0;a<i;++a)if(c=(l=h[a]).parent){if(!(u=g.get(c)))throw new Error("missing: "+c);if(u===OD)throw new Error("ambiguous: "+c);u.children?u.children.push(l):u.children=[l],l.parent=u}else{if(s)throw new Error("multiple roots");s=l}if(!s)throw new Error("no root");if(null!=t){for(;s.data===RD&&1===s.children.length;)s=s.children[0],--i;for(let t=h.length-1;t>=0&&(l=h[t]).data===RD;--t)l.data=null}if(s.parent=zD,s.eachBefore((function(t){t.depth=t.parent.depth+1,--i})).eachBefore(cD),s.parent=null,i>0)throw new Error("cycle");return s}return r.id=function(t){return arguments.length?(e=hD(t),r):e},r.parentId=function(t){return arguments.length?(n=hD(t),r):n},r.path=function(e){return arguments.length?(t=hD(e),r):t},r}function PD(t){let e=t.length;if(e<2)return"";for(;--e>1&&!jD(t,e););return t.slice(0,e)}function jD(t,e){if("/"===t[e]){let n=0;for(;e>0&&"\\"===t[--e];)++n;if(!(1&n))return!0}return!1}function ID(t,e){return t.parent===e.parent?1:2}function WD(t){var e=t.children;return e?e[0]:t.t}function HD(t){var e=t.children;return e?e[e.length-1]:t.t}function YD(t,e,n){var r=n/(e.i-t.i);e.c-=r,e.s+=n,t.c+=r,e.z+=n,e.m+=n}function GD(t,e,n){return t.a.parent===e.parent?t.a:n}function VD(t,e){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}function XD(t,e,n,r,i){for(var o,a=t.children,s=-1,u=a.length,l=t.value&&(i-n)/t.value;++s<u;)(o=a[s]).x0=e,o.x1=r,o.y0=n,o.y1=n+=o.value*l}VD.prototype=Object.create(fD.prototype);var JD=(1+Math.sqrt(5))/2;function ZD(t,e,n,r,i,o){for(var a,s,u,l,c,f,h,d,p,g,m,y=[],v=e.children,_=0,x=0,b=v.length,w=e.value;_<b;){u=i-n,l=o-r;do{c=v[x++].value}while(!c&&x<b);for(f=h=c,m=c*c*(g=Math.max(l/u,u/l)/(w*t)),p=Math.max(h/m,m/f);x<b;++x){if(c+=s=v[x].value,s<f&&(f=s),s>h&&(h=s),m=c*c*g,(d=Math.max(h/m,m/f))>p){c-=s;break}p=d}y.push(a={value:c,dice:u<l,children:v.slice(_,x)}),a.dice?ND(a,n,r,i,w?r+=l*c/w:o):XD(a,n,r,w?n+=u*c/w:i,o),w-=c,_=x}return y}var QD=function t(e){function n(t,n,r,i,o){ZD(e,t,n,r,i,o)}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(JD);var KD=function t(e){function n(t,n,r,i,o){if((a=t._squarify)&&a.ratio===e)for(var a,s,u,l,c,f=-1,h=a.length,d=t.value;++f<h;){for(u=(s=a[f]).children,l=s.value=0,c=u.length;l<c;++l)s.value+=u[l].value;s.dice?ND(s,n,r,i,d?r+=(o-r)*s.value/d:o):XD(s,n,r,d?n+=(i-n)*s.value/d:i,o),d-=s.value}else t._squarify=a=ZD(e,t,n,r,i,o),a.ratio=e}return n.ratio=function(e){return t((e=+e)>1?e:1)},n}(JD);function tC(t,e,n){const r={};return t.each((t=>{const i=t.data;n(i)&&(r[e(i)]=t)})),t.lookup=r,t}function eC(t){La.call(this,null,t)}eC.Definition={type:"Nest",metadata:{treesource:!0,changes:!0},params:[{name:"keys",type:"field",array:!0},{name:"generate",type:"boolean"}]};const nC=t=>t.values;function rC(){const t=[],e={entries:t=>r(n(t,0),0),key:n=>(t.push(n),e)};function n(e,r){if(r>=t.length)return e;const i=e.length,o=t[r++],a={},s={};let u,l,c,f=-1;for(;++f<i;)u=o(l=e[f])+"",(c=a[u])?c.push(l):a[u]=[l];for(u in a)s[u]=n(a[u],r);return s}function r(e,n){if(++n>t.length)return e;const i=[];for(const t in e)i.push({key:t,values:r(e[t],n)});return i}return e}function iC(t){La.call(this,null,t)}st(eC,La,{transform(t,e){e.source||s("Nest transform requires an upstream data source.");var n=t.generate,r=t.modified(),i=e.clone(),o=this.value;return(!o||r||e.changed())&&(o&&o.each((t=>{t.children&&ia(t.data)&&i.rem.push(t.data)})),this.value=o=aD({values:W(t.keys).reduce(((t,e)=>(t.key(e),t)),rC()).entries(i.source)},nC),n&&o.each((t=>{t.children&&(t=sa(t.data),i.add.push(t),i.source.push(t))})),tC(o,oa,oa)),i.source.root=o,i}});const oC=(t,e)=>t.parent===e.parent?1:2;st(iC,La,{transform(t,e){e.source&&e.source.root||s(this.constructor.name+" transform requires a backing tree data source.");const n=this.layout(t.method),r=this.fields,i=e.source.root,o=t.as||r;t.field?i.sum(t.field):i.count(),t.sort&&i.sort(fa(t.sort,(t=>t.data))),function(t,e,n){for(let r,i=0,o=e.length;i<o;++i)r=e[i],r in n&&t[r](n[r])}(n,this.params,t),n.separation&&n.separation(!1!==t.separation?oC:d);try{this.value=n(i)}catch(t){s(t)}return i.each((t=>function(t,e,n){const r=t.data,i=e.length-1;for(let o=0;o<i;++o)r[n[o]]=t[e[o]];r[n[i]]=t.children?t.children.length:0}(t,r,o))),e.reflow(t.modified()).modifies(o).modifies("leaf")}});const aC=["x","y","r","depth","children"];function sC(t){iC.call(this,t)}sC.Definition={type:"Pack",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"radius",type:"field",default:null},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:aC.length,default:aC}]},st(sC,iC,{layout:function(){var t=null,e=1,n=1,r=pD;function i(i){const o=function(){let t=1;return()=>(t=(1664525*t+1013904223)%mD)/mD}();return i.x=e/2,i.y=n/2,t?i.eachBefore(SD(t)).eachAfter($D(r,.5,o)).eachBefore(TD(1)):i.eachBefore(SD(FD)).eachAfter($D(pD,1,o)).eachAfter($D(r,i.r/Math.min(e,n),o)).eachBefore(TD(Math.min(e,n)/(2*i.r))),i}return i.radius=function(e){return arguments.length?(t=hD(e),i):t},i.size=function(t){return arguments.length?(e=+t[0],n=+t[1],i):[e,n]},i.padding=function(t){return arguments.length?(r="function"==typeof t?t:gD(+t),i):r},i},params:["radius","size","padding"],fields:aC});const uC=["x0","y0","x1","y1","depth","children"];function lC(t){iC.call(this,t)}function cC(t){La.call(this,null,t)}lC.Definition={type:"Partition",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"padding",type:"number",default:0},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:uC.length,default:uC}]},st(lC,iC,{layout:function(){var t=1,e=1,n=0,r=!1;function i(i){var o=i.height+1;return i.x0=i.y0=n,i.x1=t,i.y1=e/o,i.eachBefore(function(t,e){return function(r){r.children&&ND(r,r.x0,t*(r.depth+1)/e,r.x1,t*(r.depth+2)/e);var i=r.x0,o=r.y0,a=r.x1-n,s=r.y1-n;a<i&&(i=a=(i+a)/2),s<o&&(o=s=(o+s)/2),r.x0=i,r.y0=o,r.x1=a,r.y1=s}}(e,o)),r&&i.eachBefore(BD),i}return i.round=function(t){return arguments.length?(r=!!t,i):r},i.size=function(n){return arguments.length?(t=+n[0],e=+n[1],i):[t,e]},i.padding=function(t){return arguments.length?(n=+t,i):n},i},params:["size","round","padding"],fields:uC}),cC.Definition={type:"Stratify",metadata:{treesource:!0},params:[{name:"key",type:"field",required:!0},{name:"parentKey",type:"field",required:!0}]},st(cC,La,{transform(t,e){e.source||s("Stratify transform requires an upstream data source.");let n=this.value;const r=t.modified(),i=e.fork(e.ALL).materialize(e.SOURCE),o=!n||r||e.changed(e.ADD_REM)||e.modified(t.key.fields)||e.modified(t.parentKey.fields);return i.source=i.source.slice(),o&&(n=i.source.length?tC(qD().id(t.key).parentId(t.parentKey)(i.source),t.key,p):tC(qD()([{}]),t.key,t.key)),i.source.root=this.value=n,i}});const fC={tidy:function(){var t=ID,e=1,n=1,r=null;function i(i){var u=function(t){for(var e,n,r,i,o,a=new VD(t,0),s=[a];e=s.pop();)if(r=e._.children)for(e.children=new Array(o=r.length),i=o-1;i>=0;--i)s.push(n=e.children[i]=new VD(r[i],i)),n.parent=e;return(a.parent=new VD(null,0)).children=[a],a}(i);if(u.eachAfter(o),u.parent.m=-u.z,u.eachBefore(a),r)i.eachBefore(s);else{var l=i,c=i,f=i;i.eachBefore((function(t){t.x<l.x&&(l=t),t.x>c.x&&(c=t),t.depth>f.depth&&(f=t)}));var h=l===c?1:t(l,c)/2,d=h-l.x,p=e/(c.x+h+d),g=n/(f.depth||1);i.eachBefore((function(t){t.x=(t.x+d)*p,t.y=t.depth*g}))}return i}function o(e){var n=e.children,r=e.parent.children,i=e.i?r[e.i-1]:null;if(n){!function(t){for(var e,n=0,r=0,i=t.children,o=i.length;--o>=0;)(e=i[o]).z+=n,e.m+=n,n+=e.s+(r+=e.c)}(e);var o=(n[0].z+n[n.length-1].z)/2;i?(e.z=i.z+t(e._,i._),e.m=e.z-o):e.z=o}else i&&(e.z=i.z+t(e._,i._));e.parent.A=function(e,n,r){if(n){for(var i,o=e,a=e,s=n,u=o.parent.children[0],l=o.m,c=a.m,f=s.m,h=u.m;s=HD(s),o=WD(o),s&&o;)u=WD(u),(a=HD(a)).a=e,(i=s.z+f-o.z-l+t(s._,o._))>0&&(YD(GD(s,e,r),e,i),l+=i,c+=i),f+=s.m,l+=o.m,h+=u.m,c+=a.m;s&&!HD(a)&&(a.t=s,a.m+=f-c),o&&!WD(u)&&(u.t=o,u.m+=l-h,r=e)}return r}(e,i,e.parent.A||r[0])}function a(t){t._.x=t.z+t.parent.m,t.m+=t.parent.m}function s(t){t.x*=e,t.y=t.depth*n}return i.separation=function(e){return arguments.length?(t=e,i):t},i.size=function(t){return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]},i.nodeSize=function(t){return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i},cluster:function(){var t=nD,e=1,n=1,r=!1;function i(i){var o,a=0;i.eachAfter((function(e){var n=e.children;n?(e.x=function(t){return t.reduce(rD,0)/t.length}(n),e.y=function(t){return 1+t.reduce(iD,0)}(n)):(e.x=o?a+=t(e,o):0,e.y=0,o=e)}));var s=function(t){for(var e;e=t.children;)t=e[0];return t}(i),u=function(t){for(var e;e=t.children;)t=e[e.length-1];return t}(i),l=s.x-t(s,u)/2,c=u.x+t(u,s)/2;return i.eachAfter(r?function(t){t.x=(t.x-i.x)*e,t.y=(i.y-t.y)*n}:function(t){t.x=(t.x-l)/(c-l)*e,t.y=(1-(i.y?t.y/i.y:1))*n})}return i.separation=function(e){return arguments.length?(t=e,i):t},i.size=function(t){return arguments.length?(r=!1,e=+t[0],n=+t[1],i):r?null:[e,n]},i.nodeSize=function(t){return arguments.length?(r=!0,e=+t[0],n=+t[1],i):r?[e,n]:null},i}},hC=["x","y","depth","children"];function dC(t){iC.call(this,t)}function pC(t){La.call(this,[],t)}dC.Definition={type:"Tree",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"tidy",values:["tidy","cluster"]},{name:"size",type:"number",array:!0,length:2},{name:"nodeSize",type:"number",array:!0,length:2},{name:"separation",type:"boolean",default:!0},{name:"as",type:"string",array:!0,length:hC.length,default:hC}]},st(dC,iC,{layout(t){const e=t||"tidy";if(rt(fC,e))return fC[e]();s("Unrecognized Tree layout method: "+e)},params:["size","nodeSize"],fields:hC}),pC.Definition={type:"TreeLinks",metadata:{tree:!0,generates:!0,changes:!0},params:[]},st(pC,La,{transform(t,e){const n=this.value,r=e.source&&e.source.root,i=e.fork(e.NO_SOURCE),o={};return r||s("TreeLinks transform requires a tree data source."),e.changed(e.ADD_REM)?(i.rem=n,e.visit(e.SOURCE,(t=>o[oa(t)]=1)),r.each((t=>{const e=t.data,n=t.parent&&t.parent.data;n&&o[oa(e)]&&o[oa(n)]&&i.add.push(sa({source:n,target:e}))})),this.value=i.add):e.changed(e.MOD)&&(e.visit(e.MOD,(t=>o[oa(t)]=1)),n.forEach((t=>{(o[oa(t.source)]||o[oa(t.target)])&&i.mod.push(t)}))),i}});const gC={binary:function(t,e,n,r,i){var o,a,s=t.children,u=s.length,l=new Array(u+1);for(l[0]=a=o=0;o<u;++o)l[o+1]=a+=s[o].value;!function t(e,n,r,i,o,a,u){if(e>=n-1){var c=s[e];return c.x0=i,c.y0=o,c.x1=a,void(c.y1=u)}var f=l[e],h=r/2+f,d=e+1,p=n-1;for(;d<p;){var g=d+p>>>1;l[g]<h?d=g+1:p=g}h-l[d-1]<l[d]-h&&e+1<d&&--d;var m=l[d]-f,y=r-m;if(a-i>u-o){var v=r?(i*y+a*m)/r:a;t(e,d,m,i,o,v,u),t(d,n,y,v,o,a,u)}else{var _=r?(o*y+u*m)/r:u;t(e,d,m,i,o,a,_),t(d,n,y,i,_,a,u)}}(0,u,t.value,e,n,r,i)},dice:ND,slice:XD,slicedice:function(t,e,n,r,i){(1&t.depth?XD:ND)(t,e,n,r,i)},squarify:QD,resquarify:KD},mC=["x0","y0","x1","y1","depth","children"];function yC(t){iC.call(this,t)}yC.Definition={type:"Treemap",metadata:{tree:!0,modifies:!0},params:[{name:"field",type:"field"},{name:"sort",type:"compare"},{name:"method",type:"enum",default:"squarify",values:["squarify","resquarify","binary","dice","slice","slicedice"]},{name:"padding",type:"number",default:0},{name:"paddingInner",type:"number",default:0},{name:"paddingOuter",type:"number",default:0},{name:"paddingTop",type:"number",default:0},{name:"paddingRight",type:"number",default:0},{name:"paddingBottom",type:"number",default:0},{name:"paddingLeft",type:"number",default:0},{name:"ratio",type:"number",default:1.618033988749895},{name:"round",type:"boolean",default:!1},{name:"size",type:"number",array:!0,length:2},{name:"as",type:"string",array:!0,length:mC.length,default:mC}]},st(yC,iC,{layout(){const t=function(){var t=QD,e=!1,n=1,r=1,i=[0],o=pD,a=pD,s=pD,u=pD,l=pD;function c(t){return t.x0=t.y0=0,t.x1=n,t.y1=r,t.eachBefore(f),i=[0],e&&t.eachBefore(BD),t}function f(e){var n=i[e.depth],r=e.x0+n,c=e.y0+n,f=e.x1-n,h=e.y1-n;f<r&&(r=f=(r+f)/2),h<c&&(c=h=(c+h)/2),e.x0=r,e.y0=c,e.x1=f,e.y1=h,e.children&&(n=i[e.depth+1]=o(e)/2,r+=l(e)-n,c+=a(e)-n,(f-=s(e)-n)<r&&(r=f=(r+f)/2),(h-=u(e)-n)<c&&(c=h=(c+h)/2),t(e,r,c,f,h))}return c.round=function(t){return arguments.length?(e=!!t,c):e},c.size=function(t){return arguments.length?(n=+t[0],r=+t[1],c):[n,r]},c.tile=function(e){return arguments.length?(t=dD(e),c):t},c.padding=function(t){return arguments.length?c.paddingInner(t).paddingOuter(t):c.paddingInner()},c.paddingInner=function(t){return arguments.length?(o="function"==typeof t?t:gD(+t),c):o},c.paddingOuter=function(t){return arguments.length?c.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):c.paddingTop()},c.paddingTop=function(t){return arguments.length?(a="function"==typeof t?t:gD(+t),c):a},c.paddingRight=function(t){return arguments.length?(s="function"==typeof t?t:gD(+t),c):s},c.paddingBottom=function(t){return arguments.length?(u="function"==typeof t?t:gD(+t),c):u},c.paddingLeft=function(t){return arguments.length?(l="function"==typeof t?t:gD(+t),c):l},c}();return t.ratio=e=>{const n=t.tile();n.ratio&&t.tile(n.ratio(e))},t.method=e=>{rt(gC,e)?t.tile(gC[e]):s("Unrecognized Treemap layout method: "+e)},t},params:["method","ratio","size","round","padding","paddingInner","paddingOuter","paddingTop","paddingRight","paddingBottom","paddingLeft"],fields:mC});var vC=Object.freeze({__proto__:null,nest:eC,pack:sC,partition:lC,stratify:cC,tree:dC,treelinks:pC,treemap:yC});const _C=4278190080;function xC(t,e,n){return new Uint32Array(t.getImageData(0,0,e,n).data.buffer)}function bC(t,e,n){if(!e.length)return;const r=e[0].mark.marktype;"group"===r?e.forEach((e=>{e.items.forEach((e=>bC(t,e.items,n)))})):Sy[r].draw(t,{items:n?e.map(wC):e})}function wC(t){const e=la(t,{});return e.stroke&&0!==e.strokeOpacity||e.fill&&0!==e.fillOpacity?{...e,strokeOpacity:1,stroke:"#000",fillOpacity:0}:e}const kC=31,MC=new Uint32Array(33),AC=new Uint32Array(33);AC[0]=0,MC[0]=~AC[0];for(let t=1;t<=32;++t)AC[t]=AC[t-1]<<1|1,MC[t]=~AC[t];function EC(t,e,n){const r=Math.max(1,Math.sqrt(t*e/1e6)),i=~~((t+2*n+r)/r),o=~~((e+2*n+r)/r),a=t=>~~((t+n)/r);return a.invert=t=>t*r-n,a.bitmap=()=>function(t,e){const n=new Uint32Array(~~((t*e+32)/32));function r(t,e){n[t]|=e}function i(t,e){n[t]&=e}return{array:n,get:(e,r)=>{const i=r*t+e;return n[i>>>5]&1<<(i&kC)},set:(e,n)=>{const i=n*t+e;r(i>>>5,1<<(i&kC))},clear:(e,n)=>{const r=n*t+e;i(r>>>5,~(1<<(r&kC)))},getRange:(e,r,i,o)=>{let a,s,u,l,c=o;for(;c>=r;--c)if(a=c*t+e,s=c*t+i,u=a>>>5,l=s>>>5,u===l){if(n[u]&MC[a&kC]&AC[1+(s&kC)])return!0}else{if(n[u]&MC[a&kC])return!0;if(n[l]&AC[1+(s&kC)])return!0;for(let t=u+1;t<l;++t)if(n[t])return!0}return!1},setRange:(e,n,i,o)=>{let a,s,u,l,c;for(;n<=o;++n)if(a=n*t+e,s=n*t+i,u=a>>>5,l=s>>>5,u===l)r(u,MC[a&kC]&AC[1+(s&kC)]);else for(r(u,MC[a&kC]),r(l,AC[1+(s&kC)]),c=u+1;c<l;++c)r(c,4294967295)},clearRange:(e,n,r,o)=>{let a,s,u,l,c;for(;n<=o;++n)if(a=n*t+e,s=n*t+r,u=a>>>5,l=s>>>5,u===l)i(u,AC[a&kC]|MC[1+(s&kC)]);else for(i(u,AC[a&kC]),i(l,MC[1+(s&kC)]),c=u+1;c<l;++c)i(c,0)},outOfBounds:(n,r,i,o)=>n<0||r<0||o>=e||i>=t}}(i,o),a.ratio=r,a.padding=n,a.width=t,a.height=e,a}function DC(t,e,n,r,i,o){let a=n/2;return t-a<0||t+a>i||e-(a=r/2)<0||e+a>o}function CC(t,e,n,r,i,o,a,s){const u=i*o/(2*r),l=t(e-u),c=t(e+u),f=t(n-(o/=2)),h=t(n+o);return a.outOfBounds(l,f,c,h)||a.getRange(l,f,c,h)||s&&s.getRange(l,f,c,h)}const FC=[-1,-1,1,1],SC=[-1,1,-1,1];const $C=["right","center","left"],TC=["bottom","middle","top"];function BC(t,e,n,r,i,o,a,s,u,l,c,f){return!(i.outOfBounds(t,n,e,r)||(f&&o||i).getRange(t,n,e,r))}const NC={"top-left":0,top:1,"top-right":2,left:4,middle:5,right:6,"bottom-left":8,bottom:9,"bottom-right":10},zC={naive:function(t,e,n,r){const i=t.width,o=t.height;return function(t){const e=t.datum.datum.items[r].items,n=e.length,a=t.datum.fontSize,s=cy.width(t.datum,t.datum.text);let u,l,c,f,h,d,p,g=0;for(let r=0;r<n;++r)u=e[r].x,c=e[r].y,l=void 0===e[r].x2?u:e[r].x2,f=void 0===e[r].y2?c:e[r].y2,h=(u+l)/2,d=(c+f)/2,p=Math.abs(l-u+f-c),p>=g&&(g=p,t.x=h,t.y=d);return h=s/2,d=a/2,u=t.x-h,l=t.x+h,c=t.y-d,f=t.y+d,t.align="center",u<0&&l<=i?t.align="left":0<=u&&i<l&&(t.align="right"),t.baseline="middle",c<0&&f<=o?t.baseline="top":0<=c&&o<f&&(t.baseline="bottom"),!0}},"reduced-search":function(t,e,n,r){const i=t.width,o=t.height,a=e[0],s=e[1];function u(e,n,r,u,l){const c=t.invert(e),f=t.invert(n);let h,d=r,p=o;if(!DC(c,f,u,l,i,o)&&!CC(t,c,f,l,u,d,a,s)&&!CC(t,c,f,l,u,l,a,null)){for(;p-d>=1;)h=(d+p)/2,CC(t,c,f,l,u,h,a,s)?p=h:d=h;if(d>r)return[c,f,d,!0]}}return function(e){const s=e.datum.datum.items[r].items,l=s.length,c=e.datum.fontSize,f=cy.width(e.datum,e.datum.text);let h,d,p,g,m,y,v,_,x,b,w,k,M,A,E,D,C,F=n?c:0,S=!1,$=!1,T=0;for(let r=0;r<l;++r){for(h=s[r].x,p=s[r].y,d=void 0===s[r].x2?h:s[r].x2,g=void 0===s[r].y2?p:s[r].y2,h>d&&(C=h,h=d,d=C),p>g&&(C=p,p=g,g=C),x=t(h),w=t(d),b=~~((x+w)/2),k=t(p),A=t(g),M=~~((k+A)/2),v=b;v>=x;--v)for(_=M;_>=k;--_)D=u(v,_,F,f,c),D&&([e.x,e.y,F,S]=D);for(v=b;v<=w;++v)for(_=M;_<=A;++_)D=u(v,_,F,f,c),D&&([e.x,e.y,F,S]=D);S||n||(E=Math.abs(d-h+g-p),m=(h+d)/2,y=(p+g)/2,E>=T&&!DC(m,y,f,c,i,o)&&!CC(t,m,y,c,f,c,a,null)&&(T=E,e.x=m,e.y=y,$=!0))}return!(!S&&!$)&&(m=f/2,y=c/2,a.setRange(t(e.x-m),t(e.y-y),t(e.x+m),t(e.y+y)),e.align="center",e.baseline="middle",!0)}},floodfill:function(t,e,n,r){const i=t.width,o=t.height,a=e[0],s=e[1],u=t.bitmap();return function(e){const l=e.datum.datum.items[r].items,c=l.length,f=e.datum.fontSize,h=cy.width(e.datum,e.datum.text),d=[];let p,g,m,y,v,_,x,b,w,k,M,A,E=n?f:0,D=!1,C=!1,F=0;for(let r=0;r<c;++r){for(p=l[r].x,m=l[r].y,g=void 0===l[r].x2?p:l[r].x2,y=void 0===l[r].y2?m:l[r].y2,d.push([t((p+g)/2),t((m+y)/2)]);d.length;)if([x,b]=d.pop(),!(a.get(x,b)||s.get(x,b)||u.get(x,b))){u.set(x,b);for(let t=0;t<4;++t)v=x+FC[t],_=b+SC[t],u.outOfBounds(v,_,v,_)||d.push([v,_]);if(v=t.invert(x),_=t.invert(b),w=E,k=o,!DC(v,_,h,f,i,o)&&!CC(t,v,_,f,h,w,a,s)&&!CC(t,v,_,f,h,f,a,null)){for(;k-w>=1;)M=(w+k)/2,CC(t,v,_,f,h,M,a,s)?k=M:w=M;w>E&&(e.x=v,e.y=_,E=w,D=!0)}}D||n||(A=Math.abs(g-p+y-m),v=(p+g)/2,_=(m+y)/2,A>=F&&!DC(v,_,h,f,i,o)&&!CC(t,v,_,f,h,f,a,null)&&(F=A,e.x=v,e.y=_,C=!0))}return!(!D&&!C)&&(v=h/2,_=f/2,a.setRange(t(e.x-v),t(e.y-_),t(e.x+v),t(e.y+_)),e.align="center",e.baseline="middle",!0)}}};function OC(t,e,n,r,i,o,a,s,u,l,c){if(!t.length)return t;const f=Math.max(r.length,i.length),h=function(t,e){const n=new Float64Array(e),r=t.length;for(let e=0;e<r;++e)n[e]=t[e]||0;for(let t=r;t<e;++t)n[t]=n[r-1];return n}(r,f),d=function(t,e){const n=new Int8Array(e),r=t.length;for(let e=0;e<r;++e)n[e]|=NC[t[e]];for(let t=r;t<e;++t)n[t]=n[r-1];return n}(i,f),p=(x=t[0].datum)&&x.mark&&x.mark.marktype,g="group"===p&&t[0].datum.items[u].marktype,m="area"===g,y=function(t,e,n,r){const i=t=>[t.x,t.x,t.x,t.y,t.y,t.y];return t?"line"===t||"area"===t?t=>i(t.datum):"line"===e?t=>{const e=t.datum.items[r].items;return i(e.length?e["start"===n?0:e.length-1]:{x:NaN,y:NaN})}:t=>{const e=t.datum.bounds;return[e.x1,(e.x1+e.x2)/2,e.x2,e.y1,(e.y1+e.y2)/2,e.y2]}:i}(p,g,s,u),v=null===l||l===1/0,_=m&&"naive"===c;var x;let b=-1,w=-1;const k=t.map((t=>{const e=v?cy.width(t,t.text):void 0;return b=Math.max(b,e),w=Math.max(w,t.fontSize),{datum:t,opacity:0,x:void 0,y:void 0,align:void 0,baseline:void 0,boundary:y(t),textWidth:e}}));l=null===l||l===1/0?Math.max(b,w)+Math.max(...r):l;const M=EC(e[0],e[1],l);let A;if(!_){n&&k.sort(((t,e)=>n(t.datum,e.datum)));let e=!1;for(let t=0;t<d.length&&!e;++t)e=5===d[t]||h[t]<0;const r=(p&&a||m)&&t.map((t=>t.datum));A=o.length||r?function(t,e,n,r,i){const o=t.width,a=t.height,s=r||i,u=_c(o,a).getContext("2d"),l=_c(o,a).getContext("2d"),c=s&&_c(o,a).getContext("2d");n.forEach((t=>bC(u,t,!1))),bC(l,e,!1),s&&bC(c,e,!0);const f=xC(u,o,a),h=xC(l,o,a),d=s&&xC(c,o,a),p=t.bitmap(),g=s&&t.bitmap();let m,y,v,_,x,b,w,k;for(y=0;y<a;++y)for(m=0;m<o;++m)x=y*o+m,b=f[x]&_C,k=h[x]&_C,w=s&&d[x]&_C,(b||w||k)&&(v=t(m),_=t(y),i||!b&&!k||p.set(v,_),s&&(b||w)&&g.set(v,_));return[p,g]}(M,r||[],o,e,m):function(t,e){const n=t.bitmap();return(e||[]).forEach((e=>n.set(t(e.boundary[0]),t(e.boundary[3])))),[n,void 0]}(M,a&&k)}const E=m?zC[c](M,A,a,u):function(t,e,n,r){const i=t.width,o=t.height,a=e[0],s=e[1],u=r.length;return function(e){const l=e.boundary,c=e.datum.fontSize;if(l[2]<0||l[5]<0||l[0]>i||l[3]>o)return!1;let f,h,d,p,g,m,y,v,_,x,b,w,k,M,A,E=e.textWidth??0;for(let i=0;i<u;++i){if(f=(3&n[i])-1,h=(n[i]>>>2&3)-1,d=0===f&&0===h||r[i]<0,p=f&&h?Math.SQRT1_2:1,g=r[i]<0?-1:1,m=l[1+f]+r[i]*f*p,b=l[4+h]+g*c*h/2+r[i]*h*p,v=b-c/2,_=b+c/2,w=t(m),M=t(v),A=t(_),!E){if(!BC(w,w,M,A,a,s,0,0,0,0,0,d))continue;E=cy.width(e.datum,e.datum.text)}if(x=m+g*E*f/2,m=x-E/2,y=x+E/2,w=t(m),k=t(y),BC(w,k,M,A,a,s,0,0,0,0,0,d))return e.x=f?f*g<0?y:m:x,e.y=h?h*g<0?_:v:b,e.align=$C[f*g+1],e.baseline=TC[h*g+1],a.setRange(w,M,k,A),!0}return!1}}(M,A,d,h);return k.forEach((t=>t.opacity=+E(t))),k}const RC=["x","y","opacity","align","baseline"],LC=["top-left","left","bottom-left","top","bottom","top-right","right","bottom-right"];function UC(t){La.call(this,null,t)}UC.Definition={type:"Label",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2,required:!0},{name:"sort",type:"compare"},{name:"anchor",type:"string",array:!0,default:LC},{name:"offset",type:"number",array:!0,default:[1]},{name:"padding",type:"number",default:0,null:!0},{name:"lineAnchor",type:"string",values:["start","end"],default:"end"},{name:"markIndex",type:"number",default:0},{name:"avoidBaseMark",type:"boolean",default:!0},{name:"avoidMarks",type:"data",array:!0},{name:"method",type:"string",default:"naive"},{name:"as",type:"string",array:!0,length:RC.length,default:RC}]},st(UC,La,{transform(t,e){const n=t.modified();if(!(n||e.changed(e.ADD_REM)||function(n){const r=t[n];return Y(r)&&e.modified(r.fields)}("sort")))return;t.size&&2===t.size.length||s("Size parameter should be specified as a [width, height] array.");const r=t.as||RC;return OC(e.materialize(e.SOURCE).source||[],t.size,t.sort,W(null==t.offset?1:t.offset),W(t.anchor||LC),t.avoidMarks||[],!1!==t.avoidBaseMark,t.lineAnchor||"end",t.markIndex||0,void 0===t.padding?0:t.padding,t.method||"naive").forEach((t=>{const e=t.datum;e[r[0]]=t.x,e[r[1]]=t.y,e[r[2]]=t.opacity,e[r[3]]=t.align,e[r[4]]=t.baseline})),e.reflow(n).modifies(r)}});var qC=Object.freeze({__proto__:null,label:UC});function PC(t,e){var n,r,i,o,a,s,u=[],l=function(t){return t(o)};if(null==e)u.push(t);else for(n={},r=0,i=t.length;r<i;++r)o=t[r],(s=n[a=e.map(l)])||(n[a]=s=[],s.dims=a,u.push(s)),s.push(o);return u}function jC(t){La.call(this,null,t)}jC.Definition={type:"Loess",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"bandwidth",type:"number",default:.3},{name:"as",type:"string",array:!0}]},st(jC,La,{transform(t,e){const r=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=PC(e.materialize(e.SOURCE).source,t.groupby),o=(t.groupby||[]).map(n),a=o.length,s=t.as||[n(t.x),n(t.y)],u=[];i.forEach((e=>{Ds(e,t.x,t.y,t.bandwidth||.3).forEach((t=>{const n={};for(let t=0;t<a;++t)n[o[t]]=e.dims[t];n[s[0]]=t[0],n[s[1]]=t[1],u.push(sa(n))}))})),this.value&&(r.rem=this.value),this.value=r.add=r.source=u}return r}});const IC={constant:gs,linear:xs,log:bs,exp:ws,pow:ks,quad:Ms,poly:As};function WC(t){La.call(this,null,t)}WC.Definition={type:"Regression",metadata:{generates:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"groupby",type:"field",array:!0},{name:"method",type:"string",default:"linear",values:Object.keys(IC)},{name:"order",type:"number",default:3},{name:"extent",type:"number",array:!0,length:2},{name:"params",type:"boolean",default:!1},{name:"as",type:"string",array:!0}]},st(WC,La,{transform(t,e){const r=e.fork(e.NO_SOURCE|e.NO_FIELDS);if(!this.value||e.changed()||t.modified()){const i=PC(e.materialize(e.SOURCE).source,t.groupby),o=(t.groupby||[]).map(n),a=t.method||"linear",u=null==t.order?3:t.order,l=((t,e)=>"poly"===t?e:"quad"===t?2:1)(a,u),c=t.as||[n(t.x),n(t.y)],f=IC[a],h=[];let d=t.extent;rt(IC,a)||s("Invalid regression method: "+a),null!=d&&"log"===a&&d[0]<=0&&(e.dataflow.warn("Ignoring extent with values <= 0 for log regression."),d=null),i.forEach((n=>{if(n.length<=l)return void e.dataflow.warn("Skipping regression with more parameters than data points.");const r=f(n,t.x,t.y,u);if(t.params)return void h.push(sa({keys:n.dims,coef:r.coef,rSquared:r.rSquared}));const i=d||et(n,t.x),s=t=>{const e={};for(let t=0;t<o.length;++t)e[o[t]]=n.dims[t];e[c[0]]=t[0],e[c[1]]=t[1],h.push(sa(e))};"linear"===a||"constant"===a?i.forEach((t=>s([t,r.predict(t)]))):$s(r.predict,i,25,200).forEach(s)})),this.value&&(r.rem=this.value),this.value=r.add=r.source=h}return r}});var HC=Object.freeze({__proto__:null,loess:jC,regression:WC});const YC=134217729;function GC(t,e,n,r,i){let o,a,s,u,l=e[0],c=r[0],f=0,h=0;c>l==c>-l?(o=l,l=e[++f]):(o=c,c=r[++h]);let d=0;if(f<t&&h<n)for(c>l==c>-l?(a=l+o,s=o-(a-l),l=e[++f]):(a=c+o,s=o-(a-c),c=r[++h]),o=a,0!==s&&(i[d++]=s);f<t&&h<n;)c>l==c>-l?(a=o+l,u=a-o,s=o-(a-u)+(l-u),l=e[++f]):(a=o+c,u=a-o,s=o-(a-u)+(c-u),c=r[++h]),o=a,0!==s&&(i[d++]=s);for(;f<t;)a=o+l,u=a-o,s=o-(a-u)+(l-u),l=e[++f],o=a,0!==s&&(i[d++]=s);for(;h<n;)a=o+c,u=a-o,s=o-(a-u)+(c-u),c=r[++h],o=a,0!==s&&(i[d++]=s);return 0===o&&0!==d||(i[d++]=o),d}function VC(t){return new Float64Array(t)}const XC=VC(4),JC=VC(8),ZC=VC(12),QC=VC(16),KC=VC(4);function tF(t,e,n,r,i,o){const a=(e-o)*(n-i),s=(t-i)*(r-o),u=a-s,l=Math.abs(a+s);return Math.abs(u)>=33306690738754716e-32*l?u:-function(t,e,n,r,i,o,a){let s,u,l,c,f,h,d,p,g,m,y,v,_,x,b,w,k,M;const A=t-i,E=n-i,D=e-o,C=r-o;x=A*C,h=YC*A,d=h-(h-A),p=A-d,h=YC*C,g=h-(h-C),m=C-g,b=p*m-(x-d*g-p*g-d*m),w=D*E,h=YC*D,d=h-(h-D),p=D-d,h=YC*E,g=h-(h-E),m=E-g,k=p*m-(w-d*g-p*g-d*m),y=b-k,f=b-y,XC[0]=b-(y+f)+(f-k),v=x+y,f=v-x,_=x-(v-f)+(y-f),y=_-w,f=_-y,XC[1]=_-(y+f)+(f-w),M=v+y,f=M-v,XC[2]=v-(M-f)+(y-f),XC[3]=M;let F=function(t,e){let n=e[0];for(let r=1;r<t;r++)n+=e[r];return n}(4,XC),S=22204460492503146e-32*a;if(F>=S||-F>=S)return F;if(f=t-A,s=t-(A+f)+(f-i),f=n-E,l=n-(E+f)+(f-i),f=e-D,u=e-(D+f)+(f-o),f=r-C,c=r-(C+f)+(f-o),0===s&&0===u&&0===l&&0===c)return F;if(S=11093356479670487e-47*a+33306690738754706e-32*Math.abs(F),F+=A*c+C*s-(D*l+E*u),F>=S||-F>=S)return F;x=s*C,h=YC*s,d=h-(h-s),p=s-d,h=YC*C,g=h-(h-C),m=C-g,b=p*m-(x-d*g-p*g-d*m),w=u*E,h=YC*u,d=h-(h-u),p=u-d,h=YC*E,g=h-(h-E),m=E-g,k=p*m-(w-d*g-p*g-d*m),y=b-k,f=b-y,KC[0]=b-(y+f)+(f-k),v=x+y,f=v-x,_=x-(v-f)+(y-f),y=_-w,f=_-y,KC[1]=_-(y+f)+(f-w),M=v+y,f=M-v,KC[2]=v-(M-f)+(y-f),KC[3]=M;const $=GC(4,XC,4,KC,JC);x=A*c,h=YC*A,d=h-(h-A),p=A-d,h=YC*c,g=h-(h-c),m=c-g,b=p*m-(x-d*g-p*g-d*m),w=D*l,h=YC*D,d=h-(h-D),p=D-d,h=YC*l,g=h-(h-l),m=l-g,k=p*m-(w-d*g-p*g-d*m),y=b-k,f=b-y,KC[0]=b-(y+f)+(f-k),v=x+y,f=v-x,_=x-(v-f)+(y-f),y=_-w,f=_-y,KC[1]=_-(y+f)+(f-w),M=v+y,f=M-v,KC[2]=v-(M-f)+(y-f),KC[3]=M;const T=GC($,JC,4,KC,ZC);x=s*c,h=YC*s,d=h-(h-s),p=s-d,h=YC*c,g=h-(h-c),m=c-g,b=p*m-(x-d*g-p*g-d*m),w=u*l,h=YC*u,d=h-(h-u),p=u-d,h=YC*l,g=h-(h-l),m=l-g,k=p*m-(w-d*g-p*g-d*m),y=b-k,f=b-y,KC[0]=b-(y+f)+(f-k),v=x+y,f=v-x,_=x-(v-f)+(y-f),y=_-w,f=_-y,KC[1]=_-(y+f)+(f-w),M=v+y,f=M-v,KC[2]=v-(M-f)+(y-f),KC[3]=M;const B=GC(T,ZC,4,KC,QC);return QC[B-1]}(t,e,n,r,i,o,l)}const eF=Math.pow(2,-52),nF=new Uint32Array(512);class rF{static from(t,e=lF,n=cF){const r=t.length,i=new Float64Array(2*r);for(let o=0;o<r;o++){const r=t[o];i[2*o]=e(r),i[2*o+1]=n(r)}return new rF(i)}constructor(t){const e=t.length>>1;if(e>0&&"number"!=typeof t[0])throw new Error("Expected coords to contain numbers.");this.coords=t;const n=Math.max(2*e-5,0);this._triangles=new Uint32Array(3*n),this._halfedges=new Int32Array(3*n),this._hashSize=Math.ceil(Math.sqrt(e)),this._hullPrev=new Uint32Array(e),this._hullNext=new Uint32Array(e),this._hullTri=new Uint32Array(e),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(e),this._dists=new Float64Array(e),this.update()}update(){const{coords:t,_hullPrev:e,_hullNext:n,_hullTri:r,_hullHash:i}=this,o=t.length>>1;let a=1/0,s=1/0,u=-1/0,l=-1/0;for(let e=0;e<o;e++){const n=t[2*e],r=t[2*e+1];n<a&&(a=n),r<s&&(s=r),n>u&&(u=n),r>l&&(l=r),this._ids[e]=e}const c=(a+u)/2,f=(s+l)/2;let h,d,p;for(let e=0,n=1/0;e<o;e++){const r=iF(c,f,t[2*e],t[2*e+1]);r<n&&(h=e,n=r)}const g=t[2*h],m=t[2*h+1];for(let e=0,n=1/0;e<o;e++){if(e===h)continue;const r=iF(g,m,t[2*e],t[2*e+1]);r<n&&r>0&&(d=e,n=r)}let y=t[2*d],v=t[2*d+1],_=1/0;for(let e=0;e<o;e++){if(e===h||e===d)continue;const n=aF(g,m,y,v,t[2*e],t[2*e+1]);n<_&&(p=e,_=n)}let x=t[2*p],b=t[2*p+1];if(_===1/0){for(let e=0;e<o;e++)this._dists[e]=t[2*e]-t[0]||t[2*e+1]-t[1];sF(this._ids,this._dists,0,o-1);const e=new Uint32Array(o);let n=0;for(let t=0,r=-1/0;t<o;t++){const i=this._ids[t],o=this._dists[i];o>r&&(e[n++]=i,r=o)}return this.hull=e.subarray(0,n),this.triangles=new Uint32Array(0),void(this.halfedges=new Uint32Array(0))}if(tF(g,m,y,v,x,b)<0){const t=d,e=y,n=v;d=p,y=x,v=b,p=t,x=e,b=n}const w=function(t,e,n,r,i,o){const a=n-t,s=r-e,u=i-t,l=o-e,c=a*a+s*s,f=u*u+l*l,h=.5/(a*l-s*u),d=t+(l*c-s*f)*h,p=e+(a*f-u*c)*h;return{x:d,y:p}}(g,m,y,v,x,b);this._cx=w.x,this._cy=w.y;for(let e=0;e<o;e++)this._dists[e]=iF(t[2*e],t[2*e+1],w.x,w.y);sF(this._ids,this._dists,0,o-1),this._hullStart=h;let k=3;n[h]=e[p]=d,n[d]=e[h]=p,n[p]=e[d]=h,r[h]=0,r[d]=1,r[p]=2,i.fill(-1),i[this._hashKey(g,m)]=h,i[this._hashKey(y,v)]=d,i[this._hashKey(x,b)]=p,this.trianglesLen=0,this._addTriangle(h,d,p,-1,-1,-1);for(let o,a,s=0;s<this._ids.length;s++){const u=this._ids[s],l=t[2*u],c=t[2*u+1];if(s>0&&Math.abs(l-o)<=eF&&Math.abs(c-a)<=eF)continue;if(o=l,a=c,u===h||u===d||u===p)continue;let f=0;for(let t=0,e=this._hashKey(l,c);t<this._hashSize&&(f=i[(e+t)%this._hashSize],-1===f||f===n[f]);t++);f=e[f];let g,m=f;for(;g=n[m],tF(l,c,t[2*m],t[2*m+1],t[2*g],t[2*g+1])>=0;)if(m=g,m===f){m=-1;break}if(-1===m)continue;let y=this._addTriangle(m,u,n[m],-1,-1,r[m]);r[u]=this._legalize(y+2),r[m]=y,k++;let v=n[m];for(;g=n[v],tF(l,c,t[2*v],t[2*v+1],t[2*g],t[2*g+1])<0;)y=this._addTriangle(v,u,g,r[u],-1,r[v]),r[u]=this._legalize(y+2),n[v]=v,k--,v=g;if(m===f)for(;g=e[m],tF(l,c,t[2*g],t[2*g+1],t[2*m],t[2*m+1])<0;)y=this._addTriangle(g,u,m,-1,r[m],r[g]),this._legalize(y+2),r[g]=y,n[m]=m,k--,m=g;this._hullStart=e[u]=m,n[m]=e[v]=u,n[u]=v,i[this._hashKey(l,c)]=u,i[this._hashKey(t[2*m],t[2*m+1])]=m}this.hull=new Uint32Array(k);for(let t=0,e=this._hullStart;t<k;t++)this.hull[t]=e,e=n[e];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,e){return Math.floor(function(t,e){const n=t/(Math.abs(t)+Math.abs(e));return(e>0?3-n:1+n)/4}(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){const{_triangles:e,_halfedges:n,coords:r}=this;let i=0,o=0;for(;;){const a=n[t],s=t-t%3;if(o=s+(t+2)%3,-1===a){if(0===i)break;t=nF[--i];continue}const u=a-a%3,l=s+(t+1)%3,c=u+(a+2)%3,f=e[o],h=e[t],d=e[l],p=e[c];if(oF(r[2*f],r[2*f+1],r[2*h],r[2*h+1],r[2*d],r[2*d+1],r[2*p],r[2*p+1])){e[t]=p,e[a]=f;const r=n[c];if(-1===r){let e=this._hullStart;do{if(this._hullTri[e]===c){this._hullTri[e]=t;break}e=this._hullPrev[e]}while(e!==this._hullStart)}this._link(t,r),this._link(a,n[o]),this._link(o,c);const s=u+(a+1)%3;i<nF.length&&(nF[i++]=s)}else{if(0===i)break;t=nF[--i]}}return o}_link(t,e){this._halfedges[t]=e,-1!==e&&(this._halfedges[e]=t)}_addTriangle(t,e,n,r,i,o){const a=this.trianglesLen;return this._triangles[a]=t,this._triangles[a+1]=e,this._triangles[a+2]=n,this._link(a,r),this._link(a+1,i),this._link(a+2,o),this.trianglesLen+=3,a}}function iF(t,e,n,r){const i=t-n,o=e-r;return i*i+o*o}function oF(t,e,n,r,i,o,a,s){const u=t-a,l=e-s,c=n-a,f=r-s,h=i-a,d=o-s,p=c*c+f*f,g=h*h+d*d;return u*(f*g-p*d)-l*(c*g-p*h)+(u*u+l*l)*(c*d-f*h)<0}function aF(t,e,n,r,i,o){const a=n-t,s=r-e,u=i-t,l=o-e,c=a*a+s*s,f=u*u+l*l,h=.5/(a*l-s*u),d=(l*c-s*f)*h,p=(a*f-u*c)*h;return d*d+p*p}function sF(t,e,n,r){if(r-n<=20)for(let i=n+1;i<=r;i++){const r=t[i],o=e[r];let a=i-1;for(;a>=n&&e[t[a]]>o;)t[a+1]=t[a--];t[a+1]=r}else{let i=n+1,o=r;uF(t,n+r>>1,i),e[t[n]]>e[t[r]]&&uF(t,n,r),e[t[i]]>e[t[r]]&&uF(t,i,r),e[t[n]]>e[t[i]]&&uF(t,n,i);const a=t[i],s=e[a];for(;;){do{i++}while(e[t[i]]<s);do{o--}while(e[t[o]]>s);if(o<i)break;uF(t,i,o)}t[n+1]=t[o],t[o]=a,r-i+1>=o-n?(sF(t,e,i,r),sF(t,e,n,o-1)):(sF(t,e,n,o-1),sF(t,e,i,r))}}function uF(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function lF(t){return t[0]}function cF(t){return t[1]}const fF=1e-6;class hF{constructor(){this._x0=this._y0=this._x1=this._y1=null,this._=""}moveTo(t,e){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")}lineTo(t,e){this._+=`L${this._x1=+t},${this._y1=+e}`}arc(t,e,n){const r=(t=+t)+(n=+n),i=e=+e;if(n<0)throw new Error("negative radius");null===this._x1?this._+=`M${r},${i}`:(Math.abs(this._x1-r)>fF||Math.abs(this._y1-i)>fF)&&(this._+="L"+r+","+i),n&&(this._+=`A${n},${n},0,1,1,${t-n},${e}A${n},${n},0,1,1,${this._x1=r},${this._y1=i}`)}rect(t,e,n,r){this._+=`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${+n}v${+r}h${-n}Z`}value(){return this._||null}}class dF{constructor(){this._=[]}moveTo(t,e){this._.push([t,e])}closePath(){this._.push(this._[0].slice())}lineTo(t,e){this._.push([t,e])}value(){return this._.length?this._:null}}let pF=class{constructor(t,[e,n,r,i]=[0,0,960,500]){if(!((r=+r)>=(e=+e)&&(i=+i)>=(n=+n)))throw new Error("invalid bounds");this.delaunay=t,this._circumcenters=new Float64Array(2*t.points.length),this.vectors=new Float64Array(2*t.points.length),this.xmax=r,this.xmin=e,this.ymax=i,this.ymin=n,this._init()}update(){return this.delaunay.update(),this._init(),this}_init(){const{delaunay:{points:t,hull:e,triangles:n},vectors:r}=this;let i,o;const a=this.circumcenters=this._circumcenters.subarray(0,n.length/3*2);for(let r,s,u=0,l=0,c=n.length;u<c;u+=3,l+=2){const c=2*n[u],f=2*n[u+1],h=2*n[u+2],d=t[c],p=t[c+1],g=t[f],m=t[f+1],y=t[h],v=t[h+1],_=g-d,x=m-p,b=y-d,w=v-p,k=2*(_*w-x*b);if(Math.abs(k)<1e-9){if(void 0===i){i=o=0;for(const n of e)i+=t[2*n],o+=t[2*n+1];i/=e.length,o/=e.length}const n=1e9*Math.sign((i-d)*w-(o-p)*b);r=(d+y)/2-n*w,s=(p+v)/2+n*b}else{const t=1/k,e=_*_+x*x,n=b*b+w*w;r=d+(w*e-x*n)*t,s=p+(_*n-b*e)*t}a[l]=r,a[l+1]=s}let s,u,l,c=e[e.length-1],f=4*c,h=t[2*c],d=t[2*c+1];r.fill(0);for(let n=0;n<e.length;++n)c=e[n],s=f,u=h,l=d,f=4*c,h=t[2*c],d=t[2*c+1],r[s+2]=r[f]=l-d,r[s+3]=r[f+1]=h-u}render(t){const e=null==t?t=new hF:void 0,{delaunay:{halfedges:n,inedges:r,hull:i},circumcenters:o,vectors:a}=this;if(i.length<=1)return null;for(let e=0,r=n.length;e<r;++e){const r=n[e];if(r<e)continue;const i=2*Math.floor(e/3),a=2*Math.floor(r/3),s=o[i],u=o[i+1],l=o[a],c=o[a+1];this._renderSegment(s,u,l,c,t)}let s,u=i[i.length-1];for(let e=0;e<i.length;++e){s=u,u=i[e];const n=2*Math.floor(r[u]/3),l=o[n],c=o[n+1],f=4*s,h=this._project(l,c,a[f+2],a[f+3]);h&&this._renderSegment(l,c,h[0],h[1],t)}return e&&e.value()}renderBounds(t){const e=null==t?t=new hF:void 0;return t.rect(this.xmin,this.ymin,this.xmax-this.xmin,this.ymax-this.ymin),e&&e.value()}renderCell(t,e){const n=null==e?e=new hF:void 0,r=this._clip(t);if(null===r||!r.length)return;e.moveTo(r[0],r[1]);let i=r.length;for(;r[0]===r[i-2]&&r[1]===r[i-1]&&i>1;)i-=2;for(let t=2;t<i;t+=2)r[t]===r[t-2]&&r[t+1]===r[t-1]||e.lineTo(r[t],r[t+1]);return e.closePath(),n&&n.value()}*cellPolygons(){const{delaunay:{points:t}}=this;for(let e=0,n=t.length/2;e<n;++e){const t=this.cellPolygon(e);t&&(t.index=e,yield t)}}cellPolygon(t){const e=new dF;return this.renderCell(t,e),e.value()}_renderSegment(t,e,n,r,i){let o;const a=this._regioncode(t,e),s=this._regioncode(n,r);0===a&&0===s?(i.moveTo(t,e),i.lineTo(n,r)):(o=this._clipSegment(t,e,n,r,a,s))&&(i.moveTo(o[0],o[1]),i.lineTo(o[2],o[3]))}contains(t,e,n){return(e=+e)==e&&(n=+n)==n&&this.delaunay._step(t,e,n)===t}*neighbors(t){const e=this._clip(t);if(e)for(const n of this.delaunay.neighbors(t)){const t=this._clip(n);if(t)t:for(let r=0,i=e.length;r<i;r+=2)for(let o=0,a=t.length;o<a;o+=2)if(e[r]===t[o]&&e[r+1]===t[o+1]&&e[(r+2)%i]===t[(o+a-2)%a]&&e[(r+3)%i]===t[(o+a-1)%a]){yield n;break t}}}_cell(t){const{circumcenters:e,delaunay:{inedges:n,halfedges:r,triangles:i}}=this,o=n[t];if(-1===o)return null;const a=[];let s=o;do{const n=Math.floor(s/3);if(a.push(e[2*n],e[2*n+1]),s=s%3==2?s-2:s+1,i[s]!==t)break;s=r[s]}while(s!==o&&-1!==s);return a}_clip(t){if(0===t&&1===this.delaunay.hull.length)return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];const e=this._cell(t);if(null===e)return null;const{vectors:n}=this,r=4*t;return this._simplify(n[r]||n[r+1]?this._clipInfinite(t,e,n[r],n[r+1],n[r+2],n[r+3]):this._clipFinite(t,e))}_clipFinite(t,e){const n=e.length;let r,i,o,a,s=null,u=e[n-2],l=e[n-1],c=this._regioncode(u,l),f=0;for(let h=0;h<n;h+=2)if(r=u,i=l,u=e[h],l=e[h+1],o=c,c=this._regioncode(u,l),0===o&&0===c)a=f,f=0,s?s.push(u,l):s=[u,l];else{let e,n,h,d,p;if(0===o){if(null===(e=this._clipSegment(r,i,u,l,o,c)))continue;[n,h,d,p]=e}else{if(null===(e=this._clipSegment(u,l,r,i,c,o)))continue;[d,p,n,h]=e,a=f,f=this._edgecode(n,h),a&&f&&this._edge(t,a,f,s,s.length),s?s.push(n,h):s=[n,h]}a=f,f=this._edgecode(d,p),a&&f&&this._edge(t,a,f,s,s.length),s?s.push(d,p):s=[d,p]}if(s)a=f,f=this._edgecode(s[0],s[1]),a&&f&&this._edge(t,a,f,s,s.length);else if(this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2))return[this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax,this.xmin,this.ymin];return s}_clipSegment(t,e,n,r,i,o){const a=i<o;for(a&&([t,e,n,r,i,o]=[n,r,t,e,o,i]);;){if(0===i&&0===o)return a?[n,r,t,e]:[t,e,n,r];if(i&o)return null;let s,u,l=i||o;8&l?(s=t+(n-t)*(this.ymax-e)/(r-e),u=this.ymax):4&l?(s=t+(n-t)*(this.ymin-e)/(r-e),u=this.ymin):2&l?(u=e+(r-e)*(this.xmax-t)/(n-t),s=this.xmax):(u=e+(r-e)*(this.xmin-t)/(n-t),s=this.xmin),i?(t=s,e=u,i=this._regioncode(t,e)):(n=s,r=u,o=this._regioncode(n,r))}}_clipInfinite(t,e,n,r,i,o){let a,s=Array.from(e);if((a=this._project(s[0],s[1],n,r))&&s.unshift(a[0],a[1]),(a=this._project(s[s.length-2],s[s.length-1],i,o))&&s.push(a[0],a[1]),s=this._clipFinite(t,s))for(let e,n=0,r=s.length,i=this._edgecode(s[r-2],s[r-1]);n<r;n+=2)e=i,i=this._edgecode(s[n],s[n+1]),e&&i&&(n=this._edge(t,e,i,s,n),r=s.length);else this.contains(t,(this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2)&&(s=[this.xmin,this.ymin,this.xmax,this.ymin,this.xmax,this.ymax,this.xmin,this.ymax]);return s}_edge(t,e,n,r,i){for(;e!==n;){let n,o;switch(e){case 5:e=4;continue;case 4:e=6,n=this.xmax,o=this.ymin;break;case 6:e=2;continue;case 2:e=10,n=this.xmax,o=this.ymax;break;case 10:e=8;continue;case 8:e=9,n=this.xmin,o=this.ymax;break;case 9:e=1;continue;case 1:e=5,n=this.xmin,o=this.ymin}r[i]===n&&r[i+1]===o||!this.contains(t,n,o)||(r.splice(i,0,n,o),i+=2)}return i}_project(t,e,n,r){let i,o,a,s=1/0;if(r<0){if(e<=this.ymin)return null;(i=(this.ymin-e)/r)<s&&(a=this.ymin,o=t+(s=i)*n)}else if(r>0){if(e>=this.ymax)return null;(i=(this.ymax-e)/r)<s&&(a=this.ymax,o=t+(s=i)*n)}if(n>0){if(t>=this.xmax)return null;(i=(this.xmax-t)/n)<s&&(o=this.xmax,a=e+(s=i)*r)}else if(n<0){if(t<=this.xmin)return null;(i=(this.xmin-t)/n)<s&&(o=this.xmin,a=e+(s=i)*r)}return[o,a]}_edgecode(t,e){return(t===this.xmin?1:t===this.xmax?2:0)|(e===this.ymin?4:e===this.ymax?8:0)}_regioncode(t,e){return(t<this.xmin?1:t>this.xmax?2:0)|(e<this.ymin?4:e>this.ymax?8:0)}_simplify(t){if(t&&t.length>4){for(let e=0;e<t.length;e+=2){const n=(e+2)%t.length,r=(e+4)%t.length;(t[e]===t[n]&&t[n]===t[r]||t[e+1]===t[n+1]&&t[n+1]===t[r+1])&&(t.splice(n,2),e-=2)}t.length||(t=null)}return t}};const gF=2*Math.PI,mF=Math.pow;function yF(t){return t[0]}function vF(t){return t[1]}function _F(t,e,n){return[t+Math.sin(t+e)*n,e+Math.cos(t-e)*n]}class xF{static from(t,e=yF,n=vF,r){return new xF("length"in t?function(t,e,n,r){const i=t.length,o=new Float64Array(2*i);for(let a=0;a<i;++a){const i=t[a];o[2*a]=e.call(r,i,a,t),o[2*a+1]=n.call(r,i,a,t)}return o}(t,e,n,r):Float64Array.from(function*(t,e,n,r){let i=0;for(const o of t)yield e.call(r,o,i,t),yield n.call(r,o,i,t),++i}(t,e,n,r)))}constructor(t){this._delaunator=new rF(t),this.inedges=new Int32Array(t.length/2),this._hullIndex=new Int32Array(t.length/2),this.points=this._delaunator.coords,this._init()}update(){return this._delaunator.update(),this._init(),this}_init(){const t=this._delaunator,e=this.points;if(t.hull&&t.hull.length>2&&function(t){const{triangles:e,coords:n}=t;for(let t=0;t<e.length;t+=3){const r=2*e[t],i=2*e[t+1],o=2*e[t+2];if((n[o]-n[r])*(n[i+1]-n[r+1])-(n[i]-n[r])*(n[o+1]-n[r+1])>1e-10)return!1}return!0}(t)){this.collinear=Int32Array.from({length:e.length/2},((t,e)=>e)).sort(((t,n)=>e[2*t]-e[2*n]||e[2*t+1]-e[2*n+1]));const t=this.collinear[0],n=this.collinear[this.collinear.length-1],r=[e[2*t],e[2*t+1],e[2*n],e[2*n+1]],i=1e-8*Math.hypot(r[3]-r[1],r[2]-r[0]);for(let t=0,n=e.length/2;t<n;++t){const n=_F(e[2*t],e[2*t+1],i);e[2*t]=n[0],e[2*t+1]=n[1]}this._delaunator=new rF(e)}else delete this.collinear;const n=this.halfedges=this._delaunator.halfedges,r=this.hull=this._delaunator.hull,i=this.triangles=this._delaunator.triangles,o=this.inedges.fill(-1),a=this._hullIndex.fill(-1);for(let t=0,e=n.length;t<e;++t){const e=i[t%3==2?t-2:t+1];-1!==n[t]&&-1!==o[e]||(o[e]=t)}for(let t=0,e=r.length;t<e;++t)a[r[t]]=t;r.length<=2&&r.length>0&&(this.triangles=new Int32Array(3).fill(-1),this.halfedges=new Int32Array(3).fill(-1),this.triangles[0]=r[0],o[r[0]]=1,2===r.length&&(o[r[1]]=0,this.triangles[1]=r[1],this.triangles[2]=r[1]))}voronoi(t){return new pF(this,t)}*neighbors(t){const{inedges:e,hull:n,_hullIndex:r,halfedges:i,triangles:o,collinear:a}=this;if(a){const e=a.indexOf(t);return e>0&&(yield a[e-1]),void(e<a.length-1&&(yield a[e+1]))}const s=e[t];if(-1===s)return;let u=s,l=-1;do{if(yield l=o[u],u=u%3==2?u-2:u+1,o[u]!==t)return;if(u=i[u],-1===u){const e=n[(r[t]+1)%n.length];return void(e!==l&&(yield e))}}while(u!==s)}find(t,e,n=0){if((t=+t)!=t||(e=+e)!=e)return-1;const r=n;let i;for(;(i=this._step(n,t,e))>=0&&i!==n&&i!==r;)n=i;return i}_step(t,e,n){const{inedges:r,hull:i,_hullIndex:o,halfedges:a,triangles:s,points:u}=this;if(-1===r[t]||!u.length)return(t+1)%(u.length>>1);let l=t,c=mF(e-u[2*t],2)+mF(n-u[2*t+1],2);const f=r[t];let h=f;do{let r=s[h];const f=mF(e-u[2*r],2)+mF(n-u[2*r+1],2);if(f<c&&(c=f,l=r),h=h%3==2?h-2:h+1,s[h]!==t)break;if(h=a[h],-1===h){if(h=i[(o[t]+1)%i.length],h!==r&&mF(e-u[2*h],2)+mF(n-u[2*h+1],2)<c)return h;break}}while(h!==f);return l}render(t){const e=null==t?t=new hF:void 0,{points:n,halfedges:r,triangles:i}=this;for(let e=0,o=r.length;e<o;++e){const o=r[e];if(o<e)continue;const a=2*i[e],s=2*i[o];t.moveTo(n[a],n[a+1]),t.lineTo(n[s],n[s+1])}return this.renderHull(t),e&&e.value()}renderPoints(t,e){void 0!==e||t&&"function"==typeof t.moveTo||(e=t,t=null),e=null==e?2:+e;const n=null==t?t=new hF:void 0,{points:r}=this;for(let n=0,i=r.length;n<i;n+=2){const i=r[n],o=r[n+1];t.moveTo(i+e,o),t.arc(i,o,e,0,gF)}return n&&n.value()}renderHull(t){const e=null==t?t=new hF:void 0,{hull:n,points:r}=this,i=2*n[0],o=n.length;t.moveTo(r[i],r[i+1]);for(let e=1;e<o;++e){const i=2*n[e];t.lineTo(r[i],r[i+1])}return t.closePath(),e&&e.value()}hullPolygon(){const t=new dF;return this.renderHull(t),t.value()}renderTriangle(t,e){const n=null==e?e=new hF:void 0,{points:r,triangles:i}=this,o=2*i[t*=3],a=2*i[t+1],s=2*i[t+2];return e.moveTo(r[o],r[o+1]),e.lineTo(r[a],r[a+1]),e.lineTo(r[s],r[s+1]),e.closePath(),n&&n.value()}*trianglePolygons(){const{triangles:t}=this;for(let e=0,n=t.length/3;e<n;++e)yield this.trianglePolygon(e)}trianglePolygon(t){const e=new dF;return this.renderTriangle(t,e),e.value()}}function bF(t){La.call(this,null,t)}bF.Definition={type:"Voronoi",metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],content:{type:"number",array:!0,length:2}},{name:"as",type:"string",default:"path"}]};const wF=[-1e5,-1e5,1e5,1e5];function kF(t){const e=t[0][0],n=t[0][1];let r=t.length-1;for(;t[r][0]===e&&t[r][1]===n;--r);return"M"+t.slice(0,r+1).join("L")+"Z"}st(bF,La,{transform(t,e){const n=t.as||"path",r=e.source;if(!r||!r.length)return e;let i=t.size;i=i?[0,0,i[0],i[1]]:(i=t.extent)?[i[0][0],i[0][1],i[1][0],i[1][1]]:wF;const o=this.value=xF.from(r,t.x,t.y).voronoi(i);for(let t=0,e=r.length;t<e;++t){const e=o.cellPolygon(t);r[t][n]=e&&(2!==(a=e).length||a[0][0]!==a[1][0]||a[0][1]!==a[1][1])?kF(e):null}var a;return e.reflow(t.modified()).modifies(n)}});var MF=Object.freeze({__proto__:null,voronoi:bF}),AF=Math.PI/180,EF=2048;function DF(){var t,e,n,r,i,o,a,s=[256,256],u=TF,l=[],c=Math.random,f={};function h(t,e,n){for(var r,i,o,a=e.x,l=e.y,f=Math.hypot(s[0],s[1]),h=u(s),d=c()<.5?1:-1,p=-d;(r=h(p+=d))&&(i=~~r[0],o=~~r[1],!(Math.min(Math.abs(i),Math.abs(o))>=f));)if(e.x=a+i,e.y=l+o,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>s[0]||e.y+e.y1>s[1])&&(!n||!FF(e,t,s[0]))&&(!n||$F(e,n))){for(var g,m=e.sprite,y=e.width>>5,v=s[0]>>5,_=e.x-(y<<4),x=127&_,b=32-x,w=e.y1-e.y0,k=(e.y+e.y0)*v+(_>>5),M=0;M<w;M++){g=0;for(var A=0;A<=y;A++)t[k+A]|=g<<b|(A<y?(g=m[M*y+A])>>>x:0);k+=v}return e.sprite=null,!0}return!1}return f.layout=function(){for(var u=function(t){t.width=t.height=1;var e=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2);t.width=2048/e,t.height=EF/e;var n=t.getContext("2d");return n.fillStyle=n.strokeStyle="red",n.textAlign="center",{context:n,ratio:e}}(_c()),f=function(t){var e=[],n=-1;for(;++n<t;)e[n]=0;return e}((s[0]>>5)*s[1]),d=null,p=l.length,g=-1,m=[],y=l.map((s=>({text:t(s),font:e(s),style:r(s),weight:i(s),rotate:o(s),size:~~(n(s)+1e-14),padding:a(s),xoff:0,yoff:0,x1:0,y1:0,x0:0,y0:0,hasText:!1,sprite:null,datum:s}))).sort(((t,e)=>e.size-t.size));++g<p;){var v=y[g];v.x=s[0]*(c()+.5)>>1,v.y=s[1]*(c()+.5)>>1,CF(u,v,y,g),v.hasText&&h(f,v,d)&&(m.push(v),d?SF(d,v):d=[{x:v.x+v.x0,y:v.y+v.y0},{x:v.x+v.x1,y:v.y+v.y1}],v.x-=s[0]>>1,v.y-=s[1]>>1)}return m},f.words=function(t){return arguments.length?(l=t,f):l},f.size=function(t){return arguments.length?(s=[+t[0],+t[1]],f):s},f.font=function(t){return arguments.length?(e=BF(t),f):e},f.fontStyle=function(t){return arguments.length?(r=BF(t),f):r},f.fontWeight=function(t){return arguments.length?(i=BF(t),f):i},f.rotate=function(t){return arguments.length?(o=BF(t),f):o},f.text=function(e){return arguments.length?(t=BF(e),f):t},f.spiral=function(t){return arguments.length?(u=NF[t]||t,f):u},f.fontSize=function(t){return arguments.length?(n=BF(t),f):n},f.padding=function(t){return arguments.length?(a=BF(t),f):a},f.random=function(t){return arguments.length?(c=t,f):c},f}function CF(t,e,n,r){if(!e.sprite){var i=t.context,o=t.ratio;i.clearRect(0,0,2048/o,EF/o);var a,s,u,l,c,f=0,h=0,d=0,p=n.length;for(--r;++r<p;){if(e=n[r],i.save(),i.font=e.style+" "+e.weight+" "+~~((e.size+1)/o)+"px "+e.font,a=i.measureText(e.text+"m").width*o,u=e.size<<1,e.rotate){var g=Math.sin(e.rotate*AF),m=Math.cos(e.rotate*AF),y=a*m,v=a*g,_=u*m,x=u*g;a=Math.max(Math.abs(y+x),Math.abs(y-x))+31>>5<<5,u=~~Math.max(Math.abs(v+_),Math.abs(v-_))}else a=a+31>>5<<5;if(u>d&&(d=u),f+a>=2048&&(f=0,h+=d,d=0),h+u>=EF)break;i.translate((f+(a>>1))/o,(h+(u>>1))/o),e.rotate&&i.rotate(e.rotate*AF),i.fillText(e.text,0,0),e.padding&&(i.lineWidth=2*e.padding,i.strokeText(e.text,0,0)),i.restore(),e.width=a,e.height=u,e.xoff=f,e.yoff=h,e.x1=a>>1,e.y1=u>>1,e.x0=-e.x1,e.y0=-e.y1,e.hasText=!0,f+=a}for(var b=i.getImageData(0,0,2048/o,EF/o).data,w=[];--r>=0;)if((e=n[r]).hasText){for(s=(a=e.width)>>5,u=e.y1-e.y0,l=0;l<u*s;l++)w[l]=0;if(null==(f=e.xoff))return;h=e.yoff;var k=0,M=-1;for(c=0;c<u;c++){for(l=0;l<a;l++){var A=s*c+(l>>5),E=b[2048*(h+c)+(f+l)<<2]?1<<31-l%32:0;w[A]|=E,k|=E}k?M=c:(e.y0++,u--,c--,h++)}e.y1=e.y0+M,e.sprite=w.slice(0,(e.y1-e.y0)*s)}}}function FF(t,e,n){n>>=5;for(var r,i=t.sprite,o=t.width>>5,a=t.x-(o<<4),s=127&a,u=32-s,l=t.y1-t.y0,c=(t.y+t.y0)*n+(a>>5),f=0;f<l;f++){r=0;for(var h=0;h<=o;h++)if((r<<u|(h<o?(r=i[f*o+h])>>>s:0))&e[c+h])return!0;c+=n}return!1}function SF(t,e){var n=t[0],r=t[1];e.x+e.x0<n.x&&(n.x=e.x+e.x0),e.y+e.y0<n.y&&(n.y=e.y+e.y0),e.x+e.x1>r.x&&(r.x=e.x+e.x1),e.y+e.y1>r.y&&(r.y=e.y+e.y1)}function $F(t,e){return t.x+t.x1>e[0].x&&t.x+t.x0<e[1].x&&t.y+t.y1>e[0].y&&t.y+t.y0<e[1].y}function TF(t){var e=t[0]/t[1];return function(t){return[e*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function BF(t){return"function"==typeof t?t:function(){return t}}var NF={archimedean:TF,rectangular:function(t){var e=4*t[0]/t[1],n=0,r=0;return function(t){var i=t<0?-1:1;switch(Math.sqrt(1+4*i*t)-i&3){case 0:n+=e;break;case 1:r+=4;break;case 2:n-=e;break;default:r-=4}return[n,r]}}};const zF=["x","y","font","fontSize","fontStyle","fontWeight","angle"],OF=["text","font","rotate","fontSize","fontStyle","fontWeight"];function RF(t){La.call(this,DF(),t)}RF.Definition={type:"Wordcloud",metadata:{modifies:!0},params:[{name:"size",type:"number",array:!0,length:2},{name:"font",type:"string",expr:!0,default:"sans-serif"},{name:"fontStyle",type:"string",expr:!0,default:"normal"},{name:"fontWeight",type:"string",expr:!0,default:"normal"},{name:"fontSize",type:"number",expr:!0,default:14},{name:"fontSizeRange",type:"number",array:"nullable",default:[10,50]},{name:"rotate",type:"number",expr:!0,default:0},{name:"text",type:"field"},{name:"spiral",type:"string",values:["archimedean","rectangular"]},{name:"padding",type:"number",expr:!0},{name:"as",type:"string",array:!0,length:7,default:zF}]},st(RF,La,{transform(e,n){!e.size||e.size[0]&&e.size[1]||s("Wordcloud size dimensions must be non-zero.");const r=e.modified();if(!(r||n.changed(n.ADD_REM)||OF.some((function(t){const r=e[t];return Y(r)&&n.modified(r.fields)}))))return;const i=n.materialize(n.SOURCE).source,o=this.value,a=e.as||zF;let u,l=e.fontSize||14;if(Y(l)?u=e.fontSizeRange:l=Q(l),u){const t=l,e=Vd("sqrt")().domain(et(i,t)).range(u);l=n=>e(t(n))}i.forEach((t=>{t[a[0]]=NaN,t[a[1]]=NaN,t[a[3]]=0}));const c=o.words(i).text(e.text).size(e.size||[500,500]).padding(e.padding||1).spiral(e.spiral||"archimedean").rotate(e.rotate||0).font(e.font||"sans-serif").fontStyle(e.fontStyle||"normal").fontWeight(e.fontWeight||"normal").fontSize(l).random(t.random).layout(),f=o.size(),h=f[0]>>1,d=f[1]>>1,p=c.length;for(let t,e,n=0;n<p;++n)t=c[n],e=t.datum,e[a[0]]=t.x+h,e[a[1]]=t.y+d,e[a[2]]=t.font,e[a[3]]=t.size,e[a[4]]=t.style,e[a[5]]=t.weight,e[a[6]]=t.rotate;return n.reflow(r).modifies(a)}});var LF=Object.freeze({__proto__:null,wordcloud:RF});const UF=t=>new Uint8Array(t),qF=t=>new Uint16Array(t),PF=t=>new Uint32Array(t);function jF(t,e,n){const r=(e<257?UF:e<65537?qF:PF)(t);return n&&r.set(n),r}function IF(t,e,n){const r=1<<e;return{one:r,zero:~r,range:n.slice(),bisect:t.bisect,index:t.index,size:t.size,onAdd(t,e){const n=this,i=n.bisect(n.range,t.value),o=t.index,a=i[0],s=i[1],u=o.length;let l;for(l=0;l<a;++l)e[o[l]]|=r;for(l=s;l<u;++l)e[o[l]]|=r;return n}}}function WF(){let t=PF(0),e=[],n=0;return{insert:function(r,i,o){if(!i.length)return[];const a=n,s=i.length,u=PF(s);let l,c,f,h=Array(s);for(f=0;f<s;++f)h[f]=r(i[f]),u[f]=f;if(h=function(t,e){return t.sort.call(e,((e,n)=>{const r=t[e],i=t[n];return r<i?-1:r>i?1:0})),function(t,e){return Array.from(e,(e=>t[e]))}(t,e)}(h,u),a)l=e,c=t,e=Array(a+s),t=PF(a+s),function(t,e,n,r,i,o,a,s,u){let l,c=0,f=0;for(l=0;c<r&&f<a;++l)e[c]<i[f]?(s[l]=e[c],u[l]=n[c++]):(s[l]=i[f],u[l]=o[f++]+t);for(;c<r;++c,++l)s[l]=e[c],u[l]=n[c];for(;f<a;++f,++l)s[l]=i[f],u[l]=o[f]+t}(o,l,c,a,h,u,s,e,t);else{if(o>0)for(f=0;f<s;++f)u[f]+=o;e=h,t=u}return n=a+s,{index:u,value:h}},remove:function(r,i){const o=n;let a,s,u;for(s=0;!i[t[s]]&&s<o;++s);for(u=s;s<o;++s)i[a=t[s]]||(t[u]=a,e[u]=e[s],++u);n=o-r},bisect:function(t,r){let i;return r?i=r.length:(r=e,i=n),[Zt(r,t[0],0,i),Jt(r,t[1],0,i)]},reindex:function(e){for(let r=0,i=n;r<i;++r)t[r]=e[t[r]]},index:()=>t,size:()=>n}}function HF(t){La.call(this,function(){let t=8,e=[],n=PF(0),r=jF(0,t),i=jF(0,t);return{data:()=>e,seen:()=>n=function(t,e,n){return t.length>=e?t:((n=n||new t.constructor(e)).set(t),n)}(n,e.length),add(t){for(let n,r=0,i=e.length,o=t.length;r<o;++r)n=t[r],n._index=i++,e.push(n)},remove(t,n){const o=e.length,a=Array(o-t),s=e;let u,l,c;for(l=0;!n[l]&&l<o;++l)a[l]=e[l],s[l]=l;for(c=l;l<o;++l)u=e[l],n[l]?s[l]=-1:(s[l]=c,r[c]=r[l],i[c]=i[l],a[c]=u,u._index=c++),r[l]=0;return e=a,s},size:()=>e.length,curr:()=>r,prev:()=>i,reset:t=>i[t]=r[t],all:()=>t<257?255:t<65537?65535:4294967295,set(t,e){r[t]|=e},clear(t,e){r[t]&=~e},resize(e,n){(e>r.length||n>t)&&(t=Math.max(n,t),r=jF(e,t,r),i=jF(e,t))}}}(),t),this._indices=null,this._dims=null}function YF(t){La.call(this,null,t)}HF.Definition={type:"CrossFilter",metadata:{},params:[{name:"fields",type:"field",array:!0,required:!0},{name:"query",type:"array",array:!0,required:!0,content:{type:"number",array:!0,length:2}}]},st(HF,La,{transform(t,e){return this._dims?t.modified("fields")||t.fields.some((t=>e.modified(t.fields)))?this.reinit(t,e):this.eval(t,e):this.init(t,e)},init(t,e){const n=t.fields,r=t.query,i=this._indices={},o=this._dims=[],a=r.length;let s,u,l=0;for(;l<a;++l)s=n[l].fname,u=i[s]||(i[s]=WF()),o.push(IF(u,l,r[l]));return this.eval(t,e)},reinit(t,e){const n=e.materialize().fork(),r=t.fields,i=t.query,o=this._indices,a=this._dims,s=this.value,u=s.curr(),l=s.prev(),c=s.all(),f=n.rem=n.add,h=n.mod,d=i.length,p={};let g,m,y,v,_,x,b,w,k;if(l.set(u),e.rem.length&&(_=this.remove(t,e,n)),e.add.length&&s.add(e.add),e.mod.length)for(x={},v=e.mod,b=0,w=v.length;b<w;++b)x[v[b]._index]=1;for(b=0;b<d;++b)k=r[b],(!a[b]||t.modified("fields",b)||e.modified(k.fields))&&(y=k.fname,(g=p[y])||(o[y]=m=WF(),p[y]=g=m.insert(k,e.source,0)),a[b]=IF(m,b,i[b]).onAdd(g,u));for(b=0,w=s.data().length;b<w;++b)_[b]||(l[b]!==u[b]?f.push(b):x[b]&&u[b]!==c&&h.push(b));return s.mask=(1<<d)-1,n},eval(t,e){const n=e.materialize().fork(),r=this._dims.length;let i=0;return e.rem.length&&(this.remove(t,e,n),i|=(1<<r)-1),t.modified("query")&&!t.modified("fields")&&(i|=this.update(t,e,n)),e.add.length&&(this.insert(t,e,n),i|=(1<<r)-1),e.mod.length&&(this.modify(e,n),i|=(1<<r)-1),this.value.mask=i,n},insert(t,e,n){const r=e.add,i=this.value,o=this._dims,a=this._indices,s=t.fields,u={},l=n.add,c=i.size()+r.length,f=o.length;let h,d,p,g=i.size();i.resize(c,f),i.add(r);const m=i.curr(),y=i.prev(),v=i.all();for(h=0;h<f;++h)d=s[h].fname,p=u[d]||(u[d]=a[d].insert(s[h],r,g)),o[h].onAdd(p,m);for(;g<c;++g)y[g]=v,m[g]!==v&&l.push(g)},modify(t,e){const n=e.mod,r=this.value,i=r.curr(),o=r.all(),a=t.mod;let s,u,l;for(s=0,u=a.length;s<u;++s)l=a[s]._index,i[l]!==o&&n.push(l)},remove(t,e,n){const r=this._indices,i=this.value,o=i.curr(),a=i.prev(),s=i.all(),u={},l=n.rem,c=e.rem;let f,h,d,p;for(f=0,h=c.length;f<h;++f)d=c[f]._index,u[d]=1,a[d]=p=o[d],o[d]=s,p!==s&&l.push(d);for(d in r)r[d].remove(h,u);return this.reindex(e,h,u),u},reindex(t,e,n){const r=this._indices,i=this.value;t.runAfter((()=>{const t=i.remove(e,n);for(const e in r)r[e].reindex(t)}))},update(t,e,n){const r=this._dims,i=t.query,o=e.stamp,a=r.length;let s,u,l=0;for(n.filters=0,u=0;u<a;++u)t.modified("query",u)&&(s=u,++l);if(1===l)l=r[s].one,this.incrementOne(r[s],i[s],n.add,n.rem);else for(u=0,l=0;u<a;++u)t.modified("query",u)&&(l|=r[u].one,this.incrementAll(r[u],i[u],o,n.add),n.rem=n.add);return l},incrementAll(t,e,n,r){const i=this.value,o=i.seen(),a=i.curr(),s=i.prev(),u=t.index(),l=t.bisect(t.range),c=t.bisect(e),f=c[0],h=c[1],d=l[0],p=l[1],g=t.one;let m,y,v;if(f<d)for(m=f,y=Math.min(d,h);m<y;++m)v=u[m],o[v]!==n&&(s[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;else if(f>d)for(m=d,y=Math.min(f,p);m<y;++m)v=u[m],o[v]!==n&&(s[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;if(h>p)for(m=Math.max(f,p),y=h;m<y;++m)v=u[m],o[v]!==n&&(s[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;else if(h<p)for(m=Math.max(d,h),y=p;m<y;++m)v=u[m],o[v]!==n&&(s[v]=a[v],o[v]=n,r.push(v)),a[v]^=g;t.range=e.slice()},incrementOne(t,e,n,r){const i=this.value.curr(),o=t.index(),a=t.bisect(t.range),s=t.bisect(e),u=s[0],l=s[1],c=a[0],f=a[1],h=t.one;let d,p,g;if(u<c)for(d=u,p=Math.min(c,l);d<p;++d)g=o[d],i[g]^=h,n.push(g);else if(u>c)for(d=c,p=Math.min(u,f);d<p;++d)g=o[d],i[g]^=h,r.push(g);if(l>f)for(d=Math.max(u,f),p=l;d<p;++d)g=o[d],i[g]^=h,n.push(g);else if(l<f)for(d=Math.max(c,l),p=f;d<p;++d)g=o[d],i[g]^=h,r.push(g);t.range=e.slice()}}),YF.Definition={type:"ResolveFilter",metadata:{},params:[{name:"ignore",type:"number",required:!0,description:"A bit mask indicating which filters to ignore."},{name:"filter",type:"object",required:!0,description:"Per-tuple filter bitmaps from a CrossFilter transform."}]},st(YF,La,{transform(t,e){const n=~(t.ignore||0),r=t.filter,i=r.mask;if(!(i&n))return e.StopPropagation;const o=e.fork(e.ALL),a=r.data(),s=r.curr(),u=r.prev(),l=t=>s[t]&n?null:a[t];return o.filter(o.MOD,l),i&i-1?(o.filter(o.ADD,(t=>{const e=s[t]&n;return!e&&e^u[t]&n?a[t]:null})),o.filter(o.REM,(t=>{const e=s[t]&n;return e&&!(0^u[t]&n)?a[t]:null}))):(o.filter(o.ADD,l),o.filter(o.REM,(t=>(s[t]&n)===i?a[t]:null))),o.filter(o.SOURCE,(t=>l(t._index)))}});var GF=Object.freeze({__proto__:null,crossfilter:HF,resolvefilter:YF});const VF="Literal",XF="Property",JF="ArrayExpression",ZF="BinaryExpression",QF="CallExpression",KF="ConditionalExpression",tS="LogicalExpression",eS="MemberExpression",nS="ObjectExpression",rS="UnaryExpression";function iS(t){this.type=t}var oS,aS,sS,uS,lS;iS.prototype.visit=function(t){let e,n,r;if(t(this))return 1;for(e=function(t){switch(t.type){case JF:return t.elements;case ZF:case tS:return[t.left,t.right];case QF:return[t.callee].concat(t.arguments);case KF:return[t.test,t.consequent,t.alternate];case eS:return[t.object,t.property];case nS:return t.properties;case XF:return[t.key,t.value];case rS:return[t.argument];default:return[]}}(this),n=0,r=e.length;n<r;++n)if(e[n].visit(t))return 1};(oS={})[1]="Boolean",oS[2]="<end>",oS[3]="Identifier",oS[4]="Keyword",oS[5]="Null",oS[6]="Numeric",oS[7]="Punctuator",oS[8]="String",oS[9]="RegularExpression";var cS="Identifier",fS="Unexpected token %0",hS="Invalid regular expression",dS="Invalid regular expression: missing /",pS="Octal literals are not allowed in strict mode.",gS="ILLEGAL",mS="Disabled.",yS=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),vS=new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");function _S(t,e){if(!t)throw new Error("ASSERT: "+e)}function xS(t){return t>=48&&t<=57}function bS(t){return"0123456789abcdefABCDEF".includes(t)}function wS(t){return"01234567".includes(t)}function kS(t){return 32===t||9===t||11===t||12===t||160===t||t>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].includes(t)}function MS(t){return 10===t||13===t||8232===t||8233===t}function AS(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||92===t||t>=128&&yS.test(String.fromCharCode(t))}function ES(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||92===t||t>=128&&vS.test(String.fromCharCode(t))}const DS={if:1,in:1,do:1,var:1,for:1,new:1,try:1,let:1,this:1,else:1,case:1,void:1,with:1,enum:1,while:1,break:1,catch:1,throw:1,const:1,yield:1,class:1,super:1,return:1,typeof:1,delete:1,switch:1,export:1,import:1,public:1,static:1,default:1,finally:1,extends:1,package:1,private:1,function:1,continue:1,debugger:1,interface:1,protected:1,instanceof:1,implements:1};function CS(){for(;sS<uS;){const t=aS.charCodeAt(sS);if(!kS(t)&&!MS(t))break;++sS}}function FS(t){var e,n,r,i=0;for(n="u"===t?4:2,e=0;e<n;++e)sS<uS&&bS(aS[sS])?(r=aS[sS++],i=16*i+"0123456789abcdef".indexOf(r.toLowerCase())):HS({},fS,gS);return String.fromCharCode(i)}function SS(){var t,e,n,r;for(e=0,"}"===(t=aS[sS])&&HS({},fS,gS);sS<uS&&bS(t=aS[sS++]);)e=16*e+"0123456789abcdef".indexOf(t.toLowerCase());return(e>1114111||"}"!==t)&&HS({},fS,gS),e<=65535?String.fromCharCode(e):(n=55296+(e-65536>>10),r=56320+(e-65536&1023),String.fromCharCode(n,r))}function $S(){var t,e;for(t=aS.charCodeAt(sS++),e=String.fromCharCode(t),92===t&&(117!==aS.charCodeAt(sS)&&HS({},fS,gS),++sS,(t=FS("u"))&&"\\"!==t&&AS(t.charCodeAt(0))||HS({},fS,gS),e=t);sS<uS&&ES(t=aS.charCodeAt(sS));)++sS,e+=String.fromCharCode(t),92===t&&(e=e.substr(0,e.length-1),117!==aS.charCodeAt(sS)&&HS({},fS,gS),++sS,(t=FS("u"))&&"\\"!==t&&ES(t.charCodeAt(0))||HS({},fS,gS),e+=t);return e}function TS(){var t,e;return t=sS,e=92===aS.charCodeAt(sS)?$S():function(){var t,e;for(t=sS++;sS<uS;){if(92===(e=aS.charCodeAt(sS)))return sS=t,$S();if(!ES(e))break;++sS}return aS.slice(t,sS)}(),{type:1===e.length?3:DS.hasOwnProperty(e)?4:"null"===e?5:"true"===e||"false"===e?1:3,value:e,start:t,end:sS}}function BS(){var t,e,n,r,i=sS,o=aS.charCodeAt(sS),a=aS[sS];switch(o){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++sS,{type:7,value:String.fromCharCode(o),start:i,end:sS};default:if(61===(t=aS.charCodeAt(sS+1)))switch(o){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return sS+=2,{type:7,value:String.fromCharCode(o)+String.fromCharCode(t),start:i,end:sS};case 33:case 61:return sS+=2,61===aS.charCodeAt(sS)&&++sS,{type:7,value:aS.slice(i,sS),start:i,end:sS}}}return">>>="===(r=aS.substr(sS,4))?{type:7,value:r,start:i,end:sS+=4}:">>>"===(n=r.substr(0,3))||"<<="===n||">>="===n?{type:7,value:n,start:i,end:sS+=3}:a===(e=n.substr(0,2))[1]&&"+-<>&|".includes(a)||"=>"===e?{type:7,value:e,start:i,end:sS+=2}:("//"===e&&HS({},fS,gS),"<>=!+-*%&|^/".includes(a)?{type:7,value:a,start:i,end:++sS}:void HS({},fS,gS))}function NS(){var t,e,n;if(_S(xS((n=aS[sS]).charCodeAt(0))||"."===n,"Numeric literal must start with a decimal digit or a decimal point"),e=sS,t="","."!==n){if(t=aS[sS++],n=aS[sS],"0"===t){if("x"===n||"X"===n)return++sS,function(t){let e="";for(;sS<uS&&bS(aS[sS]);)e+=aS[sS++];return 0===e.length&&HS({},fS,gS),AS(aS.charCodeAt(sS))&&HS({},fS,gS),{type:6,value:parseInt("0x"+e,16),start:t,end:sS}}(e);if(wS(n))return function(t){let e="0"+aS[sS++];for(;sS<uS&&wS(aS[sS]);)e+=aS[sS++];return(AS(aS.charCodeAt(sS))||xS(aS.charCodeAt(sS)))&&HS({},fS,gS),{type:6,value:parseInt(e,8),octal:!0,start:t,end:sS}}(e);n&&xS(n.charCodeAt(0))&&HS({},fS,gS)}for(;xS(aS.charCodeAt(sS));)t+=aS[sS++];n=aS[sS]}if("."===n){for(t+=aS[sS++];xS(aS.charCodeAt(sS));)t+=aS[sS++];n=aS[sS]}if("e"===n||"E"===n)if(t+=aS[sS++],"+"!==(n=aS[sS])&&"-"!==n||(t+=aS[sS++]),xS(aS.charCodeAt(sS)))for(;xS(aS.charCodeAt(sS));)t+=aS[sS++];else HS({},fS,gS);return AS(aS.charCodeAt(sS))&&HS({},fS,gS),{type:6,value:parseFloat(t),start:e,end:sS}}function zS(){var t,e,n,r;return lS=null,CS(),t=sS,e=function(){var t,e,n,r;for(_S("/"===(t=aS[sS]),"Regular expression literal must start with a slash"),e=aS[sS++],n=!1,r=!1;sS<uS;)if(e+=t=aS[sS++],"\\"===t)MS((t=aS[sS++]).charCodeAt(0))&&HS({},dS),e+=t;else if(MS(t.charCodeAt(0)))HS({},dS);else if(n)"]"===t&&(n=!1);else{if("/"===t){r=!0;break}"["===t&&(n=!0)}return r||HS({},dS),{value:e.substr(1,e.length-2),literal:e}}(),n=function(){var t,e,n;for(e="",n="";sS<uS&&ES((t=aS[sS]).charCodeAt(0));)++sS,"\\"===t&&sS<uS?HS({},fS,gS):(n+=t,e+=t);return n.search(/[^gimuy]/g)>=0&&HS({},hS,n),{value:n,literal:e}}(),r=function(t,e){let n=t;e.includes("u")&&(n=n.replace(/\\u\{([0-9a-fA-F]+)\}/g,((t,e)=>{if(parseInt(e,16)<=1114111)return"x";HS({},hS)})).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"));try{new RegExp(n)}catch(t){HS({},hS)}try{return new RegExp(t,e)}catch(t){return null}}(e.value,n.value),{literal:e.literal+n.literal,value:r,regex:{pattern:e.value,flags:n.value},start:t,end:sS}}function OS(){if(CS(),sS>=uS)return{type:2,start:sS,end:sS};const t=aS.charCodeAt(sS);return AS(t)?TS():40===t||41===t||59===t?BS():39===t||34===t?function(){var t,e,n,r,i="",o=!1;for(_S("'"===(t=aS[sS])||'"'===t,"String literal must starts with a quote"),e=sS,++sS;sS<uS;){if((n=aS[sS++])===t){t="";break}if("\\"===n)if((n=aS[sS++])&&MS(n.charCodeAt(0)))"\r"===n&&"\n"===aS[sS]&&++sS;else switch(n){case"u":case"x":"{"===aS[sS]?(++sS,i+=SS()):i+=FS(n);break;case"n":i+="\n";break;case"r":i+="\r";break;case"t":i+="\t";break;case"b":i+="\b";break;case"f":i+="\f";break;case"v":i+="\v";break;default:wS(n)?(0!==(r="01234567".indexOf(n))&&(o=!0),sS<uS&&wS(aS[sS])&&(o=!0,r=8*r+"01234567".indexOf(aS[sS++]),"0123".includes(n)&&sS<uS&&wS(aS[sS])&&(r=8*r+"01234567".indexOf(aS[sS++]))),i+=String.fromCharCode(r)):i+=n}else{if(MS(n.charCodeAt(0)))break;i+=n}}return""!==t&&HS({},fS,gS),{type:8,value:i,octal:o,start:e,end:sS}}():46===t?xS(aS.charCodeAt(sS+1))?NS():BS():xS(t)?NS():BS()}function RS(){const t=lS;return sS=t.end,lS=OS(),sS=t.end,t}function LS(){const t=sS;lS=OS(),sS=t}function US(t,e,n){const r=new iS("||"===t||"&&"===t?"LogicalExpression":"BinaryExpression");return r.operator=t,r.left=e,r.right=n,r}function qS(t,e){const n=new iS("CallExpression");return n.callee=t,n.arguments=e,n}function PS(t){const e=new iS(cS);return e.name=t,e}function jS(t){const e=new iS("Literal");return e.value=t.value,e.raw=aS.slice(t.start,t.end),t.regex&&("//"===e.raw&&(e.raw="/(?:)/"),e.regex=t.regex),e}function IS(t,e,n){const r=new iS("MemberExpression");return r.computed="["===t,r.object=e,r.property=n,r.computed||(n.member=!0),r}function WS(t,e,n){const r=new iS("Property");return r.key=e,r.value=n,r.kind=t,r}function HS(t,e){var n,r=Array.prototype.slice.call(arguments,2),i=e.replace(/%(\d)/g,((t,e)=>(_S(e<r.length,"Message reference must be in range"),r[e])));throw(n=new Error(i)).index=sS,n.description=i,n}function YS(t){2===t.type&&HS(t,"Unexpected end of input"),6===t.type&&HS(t,"Unexpected number"),8===t.type&&HS(t,"Unexpected string"),3===t.type&&HS(t,"Unexpected identifier"),4===t.type&&HS(t,"Unexpected reserved word"),HS(t,fS,t.value)}function GS(t){const e=RS();7===e.type&&e.value===t||YS(e)}function VS(t){return 7===lS.type&&lS.value===t}function XS(t){return 4===lS.type&&lS.value===t}function JS(){const t=[];for(sS=lS.start,GS("[");!VS("]");)VS(",")?(RS(),t.push(null)):(t.push(u$()),VS("]")||GS(","));return RS(),function(t){const e=new iS("ArrayExpression");return e.elements=t,e}(t)}function ZS(){sS=lS.start;const t=RS();return 8===t.type||6===t.type?(t.octal&&HS(t,pS),jS(t)):PS(t.value)}function QS(){var t,e,n;return sS=lS.start,3===(t=lS).type?(n=ZS(),GS(":"),WS("init",n,u$())):2!==t.type&&7!==t.type?(e=ZS(),GS(":"),WS("init",e,u$())):void YS(t)}function KS(){var t,e,n=[],r={},i=String;for(sS=lS.start,GS("{");!VS("}");)e="$"+((t=QS()).key.type===cS?t.key.name:i(t.key.value)),Object.prototype.hasOwnProperty.call(r,e)?HS({},"Duplicate data property in object literal not allowed in strict mode"):r[e]=!0,n.push(t),VS("}")||GS(",");return GS("}"),function(t){const e=new iS("ObjectExpression");return e.properties=t,e}(n)}const t$={if:1};function e$(){var t,e,n;if(VS("("))return function(){GS("(");const t=l$();return GS(")"),t}();if(VS("["))return JS();if(VS("{"))return KS();if(t=lS.type,sS=lS.start,3===t||t$[lS.value])n=PS(RS().value);else if(8===t||6===t)lS.octal&&HS(lS,pS),n=jS(RS());else{if(4===t)throw new Error(mS);1===t?((e=RS()).value="true"===e.value,n=jS(e)):5===t?((e=RS()).value=null,n=jS(e)):VS("/")||VS("/=")?(n=jS(zS()),LS()):YS(RS())}return n}function n$(){const t=[];if(GS("("),!VS(")"))for(;sS<uS&&(t.push(u$()),!VS(")"));)GS(",");return GS(")"),t}function r$(){return GS("."),function(){sS=lS.start;const t=RS();return function(t){return 3===t.type||4===t.type||1===t.type||5===t.type}(t)||YS(t),PS(t.value)}()}function i$(){GS("[");const t=l$();return GS("]"),t}function o$(){const t=function(){var t;for(t=e$();;)if(VS("."))t=IS(".",t,r$());else if(VS("("))t=qS(t,n$());else{if(!VS("["))break;t=IS("[",t,i$())}return t}();if(7===lS.type&&(VS("++")||VS("--")))throw new Error(mS);return t}function a$(){var t,e;if(7!==lS.type&&4!==lS.type)e=o$();else{if(VS("++")||VS("--"))throw new Error(mS);if(VS("+")||VS("-")||VS("~")||VS("!"))t=RS(),e=a$(),e=function(t,e){const n=new iS("UnaryExpression");return n.operator=t,n.argument=e,n.prefix=!0,n}(t.value,e);else{if(XS("delete")||XS("void")||XS("typeof"))throw new Error(mS);e=o$()}}return e}function s$(t){let e=0;if(7!==t.type&&4!==t.type)return 0;switch(t.value){case"||":e=1;break;case"&&":e=2;break;case"|":e=3;break;case"^":e=4;break;case"&":e=5;break;case"==":case"!=":case"===":case"!==":e=6;break;case"<":case">":case"<=":case">=":case"instanceof":case"in":e=7;break;case"<<":case">>":case">>>":e=8;break;case"+":case"-":e=9;break;case"*":case"/":case"%":e=11}return e}function u$(){var t,e;return t=function(){var t,e,n,r,i,o,a,s,u,l;if(t=lS,u=a$(),0===(i=s$(r=lS)))return u;for(r.prec=i,RS(),e=[t,lS],o=[u,r,a=a$()];(i=s$(lS))>0;){for(;o.length>2&&i<=o[o.length-2].prec;)a=o.pop(),s=o.pop().value,u=o.pop(),e.pop(),n=US(s,u,a),o.push(n);(r=RS()).prec=i,o.push(r),e.push(lS),n=a$(),o.push(n)}for(n=o[l=o.length-1],e.pop();l>1;)e.pop(),n=US(o[l-1].value,o[l-2],n),l-=2;return n}(),VS("?")&&(RS(),e=u$(),GS(":"),t=function(t,e,n){const r=new iS("ConditionalExpression");return r.test=t,r.consequent=e,r.alternate=n,r}(t,e,u$())),t}function l$(){const t=u$();if(VS(","))throw new Error(mS);return t}function c$(t){sS=0,uS=(aS=t).length,lS=null,LS();const e=l$();if(2!==lS.type)throw new Error("Unexpect token after expression.");return e}var f$={NaN:"NaN",E:"Math.E",LN2:"Math.LN2",LN10:"Math.LN10",LOG2E:"Math.LOG2E",LOG10E:"Math.LOG10E",PI:"Math.PI",SQRT1_2:"Math.SQRT1_2",SQRT2:"Math.SQRT2",MIN_VALUE:"Number.MIN_VALUE",MAX_VALUE:"Number.MAX_VALUE"};function h$(t){function e(e,n,r){return i=>function(e,n,r,i){let o=t(n[0]);return r&&(o=r+"("+o+")",0===r.lastIndexOf("new ",0)&&(o="("+o+")")),o+"."+e+(i<0?"":0===i?"()":"("+n.slice(1).map(t).join(",")+")")}(e,i,n,r)}const n="new Date",r="String",i="RegExp";return{isNaN:"Number.isNaN",isFinite:"Number.isFinite",abs:"Math.abs",acos:"Math.acos",asin:"Math.asin",atan:"Math.atan",atan2:"Math.atan2",ceil:"Math.ceil",cos:"Math.cos",exp:"Math.exp",floor:"Math.floor",hypot:"Math.hypot",log:"Math.log",max:"Math.max",min:"Math.min",pow:"Math.pow",random:"Math.random",round:"Math.round",sin:"Math.sin",sqrt:"Math.sqrt",tan:"Math.tan",clamp:function(e){e.length<3&&s("Missing arguments to clamp function."),e.length>3&&s("Too many arguments to clamp function.");const n=e.map(t);return"Math.max("+n[1]+", Math.min("+n[2]+","+n[0]+"))"},now:"Date.now",utc:"Date.UTC",datetime:n,date:e("getDate",n,0),day:e("getDay",n,0),year:e("getFullYear",n,0),month:e("getMonth",n,0),hours:e("getHours",n,0),minutes:e("getMinutes",n,0),seconds:e("getSeconds",n,0),milliseconds:e("getMilliseconds",n,0),time:e("getTime",n,0),timezoneoffset:e("getTimezoneOffset",n,0),utcdate:e("getUTCDate",n,0),utcday:e("getUTCDay",n,0),utcyear:e("getUTCFullYear",n,0),utcmonth:e("getUTCMonth",n,0),utchours:e("getUTCHours",n,0),utcminutes:e("getUTCMinutes",n,0),utcseconds:e("getUTCSeconds",n,0),utcmilliseconds:e("getUTCMilliseconds",n,0),length:e("length",null,-1),parseFloat:"parseFloat",parseInt:"parseInt",upper:e("toUpperCase",r,0),lower:e("toLowerCase",r,0),substring:e("substring",r),split:e("split",r),trim:e("trim",r,0),btoa:"btoa",atob:"atob",regexp:i,test:e("test",i),if:function(e){e.length<3&&s("Missing arguments to if function."),e.length>3&&s("Too many arguments to if function.");const n=e.map(t);return"("+n[0]+"?"+n[1]+":"+n[2]+")"}}}function d$(t){const e=(t=t||{}).allowed?Dt(t.allowed):{},n=t.forbidden?Dt(t.forbidden):{},r=t.constants||f$,i=(t.functions||h$)(h),o=t.globalvar,a=t.fieldvar,u=Y(o)?o:t=>`${o}["${t}"]`;new Set([...Object.getOwnPropertyNames(Object.prototype).filter((t=>"function"==typeof Object.prototype[t])),"__proto__"]);let l={},c={},f=0;function h(t){if(pt(t))return t;const e=d[t.type];return null==e&&s("Unsupported type: "+t.type),e(t)}const d={Literal:t=>t.raw,Identifier:t=>{const i=t.name;return f>0?i:rt(n,i)?s("Illegal identifier: "+i):rt(r,i)?r[i]:rt(e,i)?i:(l[i]=1,u(i))},MemberExpression:t=>{const e=!t.computed,n=h(t.object);e&&(f+=1);const r=h(t.property);return n===a&&(c[function(t){const e=t&&t.length-1;return e&&('"'===t[0]&&'"'===t[e]||"'"===t[0]&&"'"===t[e])?t.slice(1,-1):t}(r)]=1),e&&(f-=1),n+(e?"."+r:"["+r+"]")},CallExpression:t=>{"Identifier"!==t.callee.type&&s("Illegal callee type: "+t.callee.type);const e=t.callee.name,n=t.arguments,r=rt(i,e)&&i[e];return r||s("Unrecognized function: "+e),Y(r)?r(n):r+"("+n.map(h).join(",")+")"},ArrayExpression:t=>"["+t.elements.map(h).join(",")+"]",BinaryExpression:t=>"("+h(t.left)+" "+t.operator+" "+h(t.right)+")",UnaryExpression:t=>"("+t.operator+h(t.argument)+")",ConditionalExpression:t=>"("+h(t.test)+"?"+h(t.consequent)+":"+h(t.alternate)+")",LogicalExpression:t=>"("+h(t.left)+t.operator+h(t.right)+")",ObjectExpression:t=>{for(const e of t.properties){const t=e.key.name;m.has(t)&&s("Illegal property: "+t)}return"{"+t.properties.map(h).join(",")+"}"},Property:t=>{f+=1;const e=h(t.key);return f-=1,e+":"+h(t.value)}};function p(t){const e={code:h(t),globals:Object.keys(l),fields:Object.keys(c)};return l={},c={},e}return p.functions=i,p.constants=r,p}const p$=Symbol("vega_selection_getter");function g$(t){return t.getter&&t.getter[p$]||(t.getter=l(t.field),t.getter[p$]=!0),t.getter}const m$="intersect",y$="union",v$="or",_$="and",x$="_vgsid_",b$=l(x$),w$="index:unit";function k$(t,e){for(var n,r,i=e.fields,o=e.values,a=i.length,s=0;s<a;++s)if(ct(n=g$(r=i[s])(t))&&(n=E(n)),ct(o[s])&&(o[s]=E(o[s])),_(o[s])&&ct(o[s][0])&&(o[s]=o[s].map(E)),"E"===r.type){if(_(o[s])?!o[s].includes(n):n!==o[s])return!1}else if("R"===r.type){if(!ut(n,o[s]))return!1}else if("R-RE"===r.type){if(!ut(n,o[s],!0,!1))return!1}else if("R-E"===r.type){if(!ut(n,o[s],!1,!1))return!1}else if("R-LE"===r.type){if(!ut(n,o[s],!1,!0))return!1}else if("E-LT"===r.type){if(n>=o[s])return!1}else if("E-LTE"===r.type){if(n>o[s])return!1}else if("E-GT"===r.type){if(n<=o[s])return!1}else if("E-GTE"===r.type){if(n<o[s])return!1}else if("E-VALID"===r.type){if(null===n||isNaN(n))return!1}else if("E-ONE"===r.type&&-1===o[s].indexOf(n))return!1;return!0}const M$=Yt(b$),A$=M$.left,E$=M$.right;var D$={[`${x$}_union`]:function(...t){const e=new te;for(const n of t)for(const t of n)e.add(t);return e},[`${x$}_intersect`]:function(t,...e){t=new te(t),e=e.map(ke);t:for(const n of t)for(const r of e)if(!r.has(n)){t.delete(n);continue t}return t},E_union:function(t,e){if(!t.length)return e;for(var n=0,r=e.length;n<r;++n)t.includes(e[n])||t.push(e[n]);return t},E_intersect:function(t,e){return t.length?t.filter((t=>e.includes(t))):e},R_union:function(t,e){var n=E(e[0]),r=E(e[1]);return n>r&&(n=e[1],r=e[0]),t.length?(t[0]>n&&(t[0]=n),t[1]<r&&(t[1]=r),t):[n,r]},R_intersect:function(t,e){var n=E(e[0]),r=E(e[1]);return n>r&&(n=e[1],r=e[0]),t.length?r<t[0]||t[1]<n?[]:(t[0]<n&&(t[0]=n),t[1]>r&&(t[1]=r),t):[n,r]}};function C$(t,e,n,r){e[0].type!==VF&&s("First argument to selection functions must be a string literal.");const i=e[0].value,o="unit",a="@"+o,u=":"+i;(e.length>=2&&A(e).value)!==m$||rt(r,a)||(r[a]=n.getData(i).indataRef(n,o)),rt(r,u)||(r[u]=n.getData(i).tuplesRef())}function F$(t){const e=this.context.data[t];return e?e.values.value:[]}const S$=t=>function(e,n){const r=this.context.dataflow.locale();return null===e?"null":r[t](n)(e)},$$=S$("format"),T$=S$("timeFormat"),B$=S$("utcFormat"),N$=S$("timeParse"),z$=S$("utcParse"),O$=new Date(2e3,0,1);function R$(t,e,n){return Number.isInteger(t)&&Number.isInteger(e)?(O$.setYear(2e3),O$.setMonth(t),O$.setDate(e),T$.call(this,O$,n)):""}function L$(t,e,n,r){e[0].type!==VF&&s("First argument to data functions must be a string literal.");const i=e[0].value,o=":"+i;if(!rt(o,r))try{r[o]=n.getData(i).tuplesRef()}catch(t){}}function U$(t,e,n,r){if(e[0].type===VF)q$(n,r,e[0].value);else for(t in n.scales)q$(n,r,t)}function q$(t,e,n){const r="%"+n;if(!rt(e,r))try{e[r]=t.scaleRef(n)}catch(t){}}function P$(t,e){if(pt(t)){const n=e.scales[t];return n&&Gd(n.value)?n.value:void 0}if(Y(t))return Gd(t)?t:void 0}function j$(t,e,n){e.__bandwidth=t=>t&&t.bandwidth?t.bandwidth():0,n._bandwidth=U$,n._range=U$,n._scale=U$;const r=e=>"_["+(e.type===VF?wt("%"+e.value):wt("%")+"+"+t(e))+"]";return{_bandwidth:t=>`this.__bandwidth(${r(t[0])})`,_range:t=>`${r(t[0])}.range()`,_scale:e=>`${r(e[0])}(${t(e[1])})`}}function I$(t,e){return function(n,r,i){if(n){const e=P$(n,(i||this).context);return e&&e.path[t](r)}return e(r)}}const W$=I$("area",(function(t){return sw=new Qt,Ib(t,uw),2*sw})),H$=I$("bounds",(function(t){var e,n,r,i,o,a,s;if(Qb=Zb=-(Xb=Jb=1/0),iw=[],Ib(t,Ow),n=iw.length){for(iw.sort(Hw),e=1,o=[r=iw[0]];e<n;++e)Yw(r,(i=iw[e])[0])||Yw(r,i[1])?(Ww(r[0],i[1])>Ww(r[0],r[1])&&(r[1]=i[1]),Ww(i[0],r[1])>Ww(r[0],r[1])&&(r[0]=i[0])):o.push(r=i);for(a=-1/0,e=0,r=o[n=o.length-1];e<=n;r=i,++e)i=o[e],(s=Ww(r[1],i[0]))>a&&(a=s,Xb=i[0],Zb=r[1])}return iw=ow=null,Xb===1/0||Jb===1/0?[[NaN,NaN],[NaN,NaN]]:[[Xb,Jb],[Zb,Qb]]})),Y$=I$("centroid",(function(t){xw=bw=ww=kw=Mw=Aw=Ew=Dw=0,Cw=new Qt,Fw=new Qt,Sw=new Qt,Ib(t,Gw);var e=+Cw,n=+Fw,r=+Sw,i=Cb(e,n,r);return i<gb&&(e=Aw,n=Ew,r=Dw,bw<pb&&(e=ww,n=kw,r=Mw),(i=Cb(e,n,r))<gb)?[NaN,NaN]:[Mb(n,e)*xb,Ob(r/i)*xb]}));function G$(t,e,n){try{t[e].apply(t,["EXPRESSION"].concat([].slice.call(n)))}catch(e){t.warn(e)}return n[n.length-1]}function V$(t){const e=t/255;return e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)}function X$(t){const e=Gc(t);return.2126*V$(e.r)+.7152*V$(e.g)+.0722*V$(e.b)}function J$(t,e){return t===e||t!=t&&e!=e||(_(t)?!(!_(e)||t.length!==e.length)&&function(t,e){for(let n=0,r=t.length;n<r;++n)if(!J$(t[n],e[n]))return!1;return!0}(t,e):!(!x(t)||!x(e))&&Z$(t,e))}function Z$(t,e){for(const n in t)if(!J$(t[n],e[n]))return!1;return!0}function Q$(t){return e=>Z$(t,e)}const K$={};function tT(t){return _(t)||ArrayBuffer.isView(t)?t:null}function eT(t){return tT(t)||(pt(t)?t:null)}const nT=t=>t.data;function rT(t,e){const n=F$.call(e,t);return n.root&&n.root.lookup||{}}const iT=()=>"undefined"!=typeof window&&window||null;function oT(t,e,n){if(!t)return[];const[r,i]=t,o=(new Bg).set(r[0],r[1],i[0],i[1]);return v_(n||this.context.dataflow.scenegraph().root,o,function(t){let e=null;if(t){const n=W(t.marktype),r=W(t.markname);e=t=>(!n.length||n.some((e=>t.marktype===e)))&&(!r.length||r.some((e=>t.name===e)))}return e}(e))}const aT={random:()=>t.random(),cumulativeNormal:ts,cumulativeLogNormal:as,cumulativeUniform:hs,densityNormal:Ka,densityLogNormal:os,densityUniform:fs,quantileNormal:es,quantileLogNormal:ss,quantileUniform:ds,sampleNormal:Qa,sampleLogNormal:is,sampleUniform:cs,isArray:_,isBoolean:lt,isDate:ct,isDefined:t=>void 0!==t,isNumber:ht,isObject:x,isRegExp:dt,isString:pt,isTuple:ia,isValid:t=>null!=t&&t==t,toBoolean:kt,toDate:t=>At(t),toNumber:E,toString:Et,indexof:function(t,...e){return eT(t).indexOf(...e)},join:function(t,...e){return tT(t).join(...e)},lastindexof:function(t,...e){return eT(t).lastIndexOf(...e)},replace:function(t,e,n){return Y(n)&&s("Function argument passed to replace."),pt(e)||dt(e)||s("Please pass a string or RegExp argument to replace."),String(t).replace(e,n)},reverse:function(t){return tT(t).slice().reverse()},sort:function(t){return tT(t).slice().sort(V)},slice:function(t,...e){return eT(t).slice(...e)},flush:at,lerp:mt,merge:function(){const t=[].slice.call(arguments);return t.unshift({}),tt(...t)},pad:xt,peek:A,pluck:function(t,e){const n=K$[e]||(K$[e]=l(e));return _(t)?t.map(n):n(t)},span:bt,inrange:ut,truncate:Ct,rgb:Gc,lab:yf,hcl:kf,hsl:nf,luminance:X$,contrast:function(t,e){const n=X$(t),r=X$(e);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)},sequence:be,format:$$,utcFormat:B$,utcParse:z$,utcOffset:kr,utcSequence:Er,timeFormat:T$,timeParse:N$,timeOffset:wr,timeSequence:Ar,timeUnitSpecifier:Vn,monthFormat:function(t){return R$.call(this,t,1,"%B")},monthAbbrevFormat:function(t){return R$.call(this,t,1,"%b")},dayFormat:function(t){return R$.call(this,0,2+t,"%A")},dayAbbrevFormat:function(t){return R$.call(this,0,2+t,"%a")},quarter:j,utcquarter:I,week:Qn,utcweek:ir,dayofyear:Zn,utcdayofyear:rr,warn:function(){return G$(this.context.dataflow,"warn",arguments)},info:function(){return G$(this.context.dataflow,"info",arguments)},debug:function(){return G$(this.context.dataflow,"debug",arguments)},extent:t=>et(t),inScope:function(t){const e=this.context.group;let n=!1;if(e)for(;t;){if(t===e){n=!0;break}t=t.mark.group}return n},intersect:oT,clampRange:H,pinchDistance:function(t){const e=t.touches,n=e[0].clientX-e[1].clientX,r=e[0].clientY-e[1].clientY;return Math.hypot(n,r)},pinchAngle:function(t){const e=t.touches;return Math.atan2(e[0].clientY-e[1].clientY,e[0].clientX-e[1].clientX)},screen:function(){const t=iT();return t?t.screen:{}},containerSize:function(){const t=this.context.dataflow,e=t.container&&t.container();return e?[e.clientWidth,e.clientHeight]:[void 0,void 0]},windowSize:function(){const t=iT();return t?[t.innerWidth,t.innerHeight]:[void 0,void 0]},bandspace:function(t,e,n){return vd(t||0,e||0,n||0)},setdata:function(t,e){const n=this.context.dataflow,r=this.context.data[t].input;return n.pulse(r,n.changeset().remove(p).insert(e)),1},pathShape:function(t){let e=null;return function(n){return n?rg(n,e=e||Yp(t)):t}},panLinear:B,panLog:N,panPow:z,panSymlog:O,zoomLinear:L,zoomLog:U,zoomPow:q,zoomSymlog:P,encode:function(t,e,n){if(t){const n=this.context.dataflow,r=t.mark.source;n.pulse(r,n.changeset().encode(t,e))}return void 0!==n?n:t},modify:function(t,e,n,r,i,o){const a=this.context.dataflow,s=this.context.data[t],u=s.input,l=a.stamp();let c,f,h=s.changes;if(!1===a._trigger||!(u.value.length||e||r))return 0;if((!h||h.stamp<l)&&(s.changes=h=a.changeset(),h.stamp=l,a.runAfter((()=>{s.modified=!0,a.pulse(u,h).run()}),!0,1)),n&&(c=!0===n?p:_(n)||ia(n)?n:Q$(n),h.remove(c)),e&&h.insert(e),r&&(c=Q$(r),u.value.some(c)?h.remove(c):h.insert(r)),i)for(f in o)h.modify(i,f,o[f]);return 1},lassoAppend:function(t,e,n,r=5){const i=(t=W(t))[t.length-1];return void 0===i||Math.hypot(i[0]-e,i[1]-n)>r?[...t,[e,n]]:t},lassoPath:function(t){return W(t).reduce(((e,[n,r],i)=>e+(0==i?`M ${n},${r} `:i===t.length-1?" Z":`L ${n},${r} `)),"")},intersectLasso:function(t,e,n){const{x:r,y:i,mark:o}=n,a=(new Bg).set(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);for(const[t,n]of e)t<a.x1&&(a.x1=t),t>a.x2&&(a.x2=t),n<a.y1&&(a.y1=n),n>a.y2&&(a.y2=n);return a.translate(r,i),oT([[a.x1,a.y1],[a.x2,a.y2]],t,o).filter((t=>function(t,e,n){let r=0;for(let i=0,o=n.length-1;i<n.length;o=i++){const[a,s]=n[o],[u,l]=n[i];l>e!=s>e&&t<(a-u)*(e-l)/(s-l)+u&&r++}return 1&r}(t.x,t.y,e)))}},sT=["view","item","group","xy","x","y"],uT="this.",lT={},cT={forbidden:["_"],allowed:["datum","event","item"],fieldvar:"datum",globalvar:t=>`_[${wt("$"+t)}]`,functions:function(t){const e=h$(t);sT.forEach((t=>e[t]="event.vega."+t));for(const t in aT)e[t]=uT+t;return tt(e,j$(t,aT,lT)),e},constants:f$,visitors:lT},fT=d$(cT);function hT(t,e,n){return 1===arguments.length?aT[t]:(aT[t]=e,n&&(lT[t]=n),fT&&(fT.functions[t]=uT+t),this)}function dT(t,e){const n={};let r;try{r=c$(t=pt(t)?t:wt(t)+"")}catch(e){s("Expression parse error: "+t)}r.visit((t=>{if(t.type!==QF)return;const r=t.callee.name,i=cT.visitors[r];i&&i(r,t.arguments,e,n)}));const i=fT(r);return i.globals.forEach((t=>{const r="$"+t;!rt(n,r)&&e.getSignal(t)&&(n[r]=e.signalRef(t))})),{$expr:tt({code:i.code},e.options.ast?{ast:r}:null),$fields:i.fields,$params:n}}hT("bandwidth",(function(t,e){const n=P$(t,(e||this).context);return n&&n.bandwidth?n.bandwidth():0}),U$),hT("copy",(function(t,e){const n=P$(t,(e||this).context);return n?n.copy():void 0}),U$),hT("domain",(function(t,e){const n=P$(t,(e||this).context);return n?n.domain():[]}),U$),hT("range",(function(t,e){const n=P$(t,(e||this).context);return n&&n.range?n.range():[]}),U$),hT("invert",(function(t,e,n){const r=P$(t,(n||this).context);return r?_(e)?(r.invertRange||r.invert)(e):(r.invert||r.invertExtent)(e):void 0}),U$),hT("scale",(function(t,e,n){const r=P$(t,(n||this).context);return r?r(e):void 0}),U$),hT("gradient",(function(t,e,n,r,i){t=P$(t,(i||this).context);const o=Lp(e,n);let a=t.domain(),s=a[0],u=A(a),l=f;return u-s?l=sp(t,s,u):t=(t.interpolator?Vd("sequential")().interpolator(t.interpolator()):Vd("linear")().interpolate(t.interpolate()).range(t.range())).domain([s=0,u=1]),t.ticks&&(a=t.ticks(+r||15),s!==a[0]&&a.unshift(s),u!==A(a)&&a.push(u)),a.forEach((e=>o.stop(l(e),t(e)))),o}),U$),hT("geoArea",W$,U$),hT("geoBounds",H$,U$),hT("geoCentroid",Y$,U$),hT("geoShape",(function(t,e,n){const r=P$(t,(n||this).context);return function(t){return r?r.path.context(t)(e):""}}),U$),hT("geoScale",(function(t,e){const n=P$(t,(e||this).context);return n&&n.scale()}),U$),hT("indata",(function(t,e,n){const r=this.context.data[t]["index:"+e],i=r?r.value.get(n):void 0;return i?i.count:i}),(function(t,e,n,r){e[0].type!==VF&&s("First argument to indata must be a string literal."),e[1].type!==VF&&s("Second argument to indata must be a string literal.");const i=e[0].value,o=e[1].value,a="@"+o;rt(a,r)||(r[a]=n.getData(i).indataRef(n,o))})),hT("data",F$,L$),hT("treePath",(function(t,e,n){const r=rT(t,this),i=r[e],o=r[n];return i&&o?i.path(o).map(nT):void 0}),L$),hT("treeAncestors",(function(t,e){const n=rT(t,this)[e];return n?n.ancestors().map(nT):void 0}),L$),hT("vlSelectionTest",(function(t,e,n){for(var r,i,o,a,s,u=this.context.data[t],l=u?u.values.value:[],c=u?u[w$]&&u[w$].value:void 0,f=n===m$,h=l.length,d=0;d<h;++d)if(r=l[d],c&&f){if(-1===(o=(i=i||{})[a=r.unit]||0))continue;if(s=k$(e,r),i[a]=s?-1:++o,s&&1===c.size)return!0;if(!s&&o===c.get(a).count)return!1}else if(f^(s=k$(e,r)))return s;return h&&f}),C$),hT("vlSelectionIdTest",(function(t,e,n){const r=this.context.data[t],i=r?r.values.value:[],o=r?r[w$]&&r[w$].value:void 0,a=n===m$,s=b$(e),u=A$(i,s);if(u===i.length)return!1;if(b$(i[u])!==s)return!1;if(o&&a){if(1===o.size)return!0;if(E$(i,s)-u<o.size)return!1}return!0}),C$),hT("vlSelectionResolve",(function(t,e,n,r){for(var i,o,a,s,u,l,c,f,h,d,p,g,m=this.context.data[t],y=m?m.values.value:[],v={},_={},x={},b=y.length,w=0;w<b;++w)if(s=(i=y[w]).unit,o=i.fields,a=i.values,o&&a){for(p=0,g=o.length;p<g;++p)u=o[p],f=(c=v[u.field]||(v[u.field]={}))[s]||(c[s]=[]),x[u.field]=h=u.type.charAt(0),d=D$[`${h}_union`],c[s]=d(f,W(a[p]));n&&(f=_[s]||(_[s]=[])).push(W(a).reduce(((t,e,n)=>(t[o[n].field]=e,t)),{}))}else u=x$,l=b$(i),(f=(c=v[u]||(v[u]={}))[s]||(c[s]=[])).push(l),n&&(f=_[s]||(_[s]=[])).push({[x$]:l});if(e=e||y$,v[x$]?v[x$]=D$[`${x$}_${e}`](...Object.values(v[x$])):Object.keys(v).forEach((t=>{v[t]=Object.keys(v[t]).map((e=>v[t][e])).reduce(((n,r)=>void 0===n?r:D$[`${x[t]}_${e}`](n,r)))})),y=Object.keys(_),n&&y.length){v[r?"vlPoint":"vlMulti"]=e===y$?{[v$]:y.reduce(((t,e)=>(t.push(..._[e]),t)),[])}:{[_$]:y.map((t=>({[v$]:_[t]})))}}return v}),C$),hT("vlSelectionTuples",(function(t,e){return t.map((t=>tt(e.fields?{values:e.fields.map((e=>g$(e)(t.datum)))}:{[x$]:b$(t.datum)},e)))}));const pT=Dt(["rule"]),gT=Dt(["group","image","rect"]);function mT(t){return(t+"").toLowerCase()}function yT(t,e,n){n.endsWith(";")||(n="return("+n+");");const r=Function(...e.concat(n));return t&&t.functions?r.bind(t.functions):r}var vT={operator:(t,e)=>yT(t,["_"],e.code),parameter:(t,e)=>yT(t,["datum","_"],e.code),event:(t,e)=>yT(t,["event"],e.code),handler:(t,e)=>yT(t,["_","event"],`var datum=event.item&&event.item.datum;return ${e.code};`),encode:(t,e)=>{const{marktype:n,channels:r}=e;let i="var o=item,datum=o.datum,m=0,$;";for(const t in r){const e="o["+wt(t)+"]";i+=`$=${r[t].code};if(${e}!==$)${e}=$,m=1;`}return i+=function(t,e){let n="";return pT[e]||(t.x2&&(t.x?(gT[e]&&(n+="if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"),n+="o.width=o.x2-o.x;"):n+="o.x=o.x2-(o.width||0);"),t.xc&&(n+="o.x=o.xc-(o.width||0)/2;"),t.y2&&(t.y?(gT[e]&&(n+="if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"),n+="o.height=o.y2-o.y;"):n+="o.y=o.y2-(o.height||0);"),t.yc&&(n+="o.y=o.yc-(o.height||0)/2;")),n}(r,n),i+="return m;",yT(t,["item","_"],i)},codegen:{get(t){const e=`[${t.map(wt).join("][")}]`,n=Function("_",`return _${e};`);return n.path=e,n},comparator(t,e){let n;const r=Function("a","b","var u, v; return "+t.map(((t,r)=>{const i=e[r];let o,a;return t.path?(o=`a${t.path}`,a=`b${t.path}`):((n=n||{})["f"+r]=t,o=`this.f${r}(a)`,a=`this.f${r}(b)`),function(t,e,n,r){return`((u = ${t}) < (v = ${e}) || u == null) && v != null ? ${n}\n  : (u > v || v == null) && u != null ? ${r}\n  : ((v = v instanceof Date ? +v : v), (u = u instanceof Date ? +u : u)) !== u && v === v ? ${n}\n  : v !== v && u === u ? ${r} : `}(o,a,-i,i)})).join("")+"0;");return n?r.bind(n):r}}};function _T(t,e,n){if(!t||!x(t))return t;for(let r,i=0,o=xT.length;i<o;++i)if(r=xT[i],rt(t,r.key))return r.parse(t,e,n);return t}var xT=[{key:"$ref",parse:function(t,e){return e.get(t.$ref)||s("Operator not defined: "+t.$ref)}},{key:"$key",parse:function(t,e){const n="k:"+t.$key+"_"+!!t.$flat;return e.fn[n]||(e.fn[n]=gt(t.$key,t.$flat,e.expr.codegen))}},{key:"$expr",parse:function(t,n,r){t.$params&&n.parseParameters(t.$params,r);const i="e:"+t.$expr.code;return n.fn[i]||(n.fn[i]=e(n.parameterExpression(t.$expr),t.$fields))}},{key:"$field",parse:function(t,e){if(!t.$field)return null;const n="f:"+t.$field+"_"+t.$name;return e.fn[n]||(e.fn[n]=l(t.$field,t.$name,e.expr.codegen))}},{key:"$encode",parse:function(t,n){const r=t.$encode,i={};for(const t in r){const o=r[t];i[t]=e(n.encodeExpression(o.$expr),o.$fields),i[t].output=o.$output}return i}},{key:"$compare",parse:function(t,e){const n="c:"+t.$compare+"_"+t.$order,r=W(t.$compare).map((t=>t&&t.$tupleid?oa:t));return e.fn[n]||(e.fn[n]=G(r,t.$order,e.expr.codegen))}},{key:"$context",parse:function(t,e){return e}},{key:"$subflow",parse:function(t,e){const n=t.$subflow;return function(t,r,i){const o=e.fork().parse(n),a=o.get(n.operators[0].id),s=o.signals.parent;return s&&s.set(i),a.detachSubflow=()=>e.detach(o),a}}},{key:"$tupleid",parse:function(){return oa}}];const bT={skip:!0};function wT(t,e,n,r){return new kT(t,e,n,r)}function kT(t,e,n,r){this.dataflow=t,this.transforms=e,this.events=t.events.bind(t),this.expr=r||vT,this.signals={},this.scales={},this.nodes={},this.data={},this.fn={},n&&(this.functions=Object.create(n),this.functions.context=this)}function MT(t){this.dataflow=t.dataflow,this.transforms=t.transforms,this.events=t.events,this.expr=t.expr,this.signals=Object.create(t.signals),this.scales=Object.create(t.scales),this.nodes=Object.create(t.nodes),this.data=Object.create(t.data),this.fn=Object.create(t.fn),t.functions&&(this.functions=Object.create(t.functions),this.functions.context=this)}function AT(t,e){t&&(null==e?t.removeAttribute("aria-label"):t.setAttribute("aria-label",e))}kT.prototype=MT.prototype={fork(){const t=new MT(this);return(this.subcontext||(this.subcontext=[])).push(t),t},detach(t){this.subcontext=this.subcontext.filter((e=>e!==t));const e=Object.keys(t.nodes);for(const n of e)t.nodes[n]._targets=null;for(const n of e)t.nodes[n].detach();t.nodes=null},get(t){return this.nodes[t]},set(t,e){return this.nodes[t]=e},add(t,e){const n=this,r=n.dataflow,i=t.value;if(n.set(t.id,e),function(t){return"collect"===mT(t)}(t.type)&&i&&(i.$ingest?r.ingest(e,i.$ingest,i.$format):i.$request?r.preload(e,i.$request,i.$format):r.pulse(e,r.changeset().insert(i))),t.root&&(n.root=e),t.parent){let i=n.get(t.parent.$ref);i?(r.connect(i,[e]),e.targets().add(i)):(n.unresolved=n.unresolved||[]).push((()=>{i=n.get(t.parent.$ref),r.connect(i,[e]),e.targets().add(i)}))}if(t.signal&&(n.signals[t.signal]=e),t.scale&&(n.scales[t.scale]=e),t.data)for(const r in t.data){const i=n.data[r]||(n.data[r]={});t.data[r].forEach((t=>i[t]=e))}},resolve(){return(this.unresolved||[]).forEach((t=>t())),delete this.unresolved,this},operator(t,e){this.add(t,this.dataflow.add(t.value,e))},transform(t,e){this.add(t,this.dataflow.add(this.transforms[mT(e)]))},stream(t,e){this.set(t.id,e)},update(t,e,n,r,i){this.dataflow.on(e,n,r,i,t.options)},operatorExpression(t){return this.expr.operator(this,t)},parameterExpression(t){return this.expr.parameter(this,t)},eventExpression(t){return this.expr.event(this,t)},handlerExpression(t){return this.expr.handler(this,t)},encodeExpression(t){return this.expr.encode(this,t)},parse:function(t){const e=this,n=t.operators||[];return t.background&&(e.background=t.background),t.eventConfig&&(e.eventConfig=t.eventConfig),t.locale&&(e.locale=t.locale),n.forEach((t=>e.parseOperator(t))),n.forEach((t=>e.parseOperatorParameters(t))),(t.streams||[]).forEach((t=>e.parseStream(t))),(t.updates||[]).forEach((t=>e.parseUpdate(t))),e.resolve()},parseOperator:function(t){const e=this;!function(t){return"operator"===mT(t)}(t.type)&&t.type?e.transform(t,t.type):e.operator(t,t.update?e.operatorExpression(t.update):null)},parseOperatorParameters:function(t){const e=this;if(t.params){const n=e.get(t.id);n||s("Invalid operator id: "+t.id),e.dataflow.connect(n,n.parameters(e.parseParameters(t.params),t.react,t.initonly))}},parseParameters:function(t,e){e=e||{};const n=this;for(const r in t){const i=t[r];e[r]=_(i)?i.map((t=>_T(t,n,e))):_T(i,n,e)}return e},parseStream:function(t){var e,n=this,r=null!=t.filter?n.eventExpression(t.filter):void 0,i=null!=t.stream?n.get(t.stream):void 0;t.source?i=n.events(t.source,t.type,r):t.merge&&(i=(e=t.merge.map((t=>n.get(t))))[0].merge.apply(e[0],e.slice(1))),t.between&&(e=t.between.map((t=>n.get(t))),i=i.between(e[0],e[1])),t.filter&&(i=i.filter(r)),null!=t.throttle&&(i=i.throttle(+t.throttle)),null!=t.debounce&&(i=i.debounce(+t.debounce)),null==i&&s("Invalid stream definition: "+JSON.stringify(t)),t.consume&&i.consume(!0),n.stream(t,i)},parseUpdate:function(t){var e,n=this,r=x(r=t.source)?r.$ref:r,i=n.get(r),o=t.update,a=void 0;i||s("Source not defined: "+t.source),e=t.target&&t.target.$expr?n.eventExpression(t.target.$expr):n.get(t.target),o&&o.$expr&&(o.$params&&(a=n.parseParameters(o.$params)),o=n.handlerExpression(o.$expr)),n.update(t,i,e,o,a)},getState:function(t){var e=this,n={};if(t.signals){var r=n.signals={};Object.keys(e.signals).forEach((n=>{const i=e.signals[n];t.signals(n,i)&&(r[n]=i.value)}))}if(t.data){var i=n.data={};Object.keys(e.data).forEach((n=>{const r=e.data[n];t.data(n,r)&&(i[n]=r.input.value)}))}return e.subcontext&&!1!==t.recurse&&(n.subcontext=e.subcontext.map((e=>e.getState(t)))),n},setState:function(t){var e=this,n=e.dataflow,r=t.data,i=t.signals;Object.keys(i||{}).forEach((t=>{n.update(e.signals[t],i[t],bT)})),Object.keys(r||{}).forEach((t=>{n.pulse(e.data[t].input,n.changeset().remove(p).insert(r[t]))})),(t.subcontext||[]).forEach(((t,n)=>{const r=e.subcontext[n];r&&r.setState(t)}))}};const ET="default";function DT(t,e){const n=t.globalCursor()?"undefined"!=typeof document&&document.body:t.container();if(n)return null==e?n.style.removeProperty("cursor"):n.style.cursor=e}function CT(t,e){var n=t._runtime.data;return rt(n,e)||s("Unrecognized data set: "+e),n[e]}function FT(t,e){ha(e)||s("Second argument to changes must be a changeset.");const n=CT(this,t);return n.modified=!0,this.pulse(n.input,e)}function ST(t){var e=t.padding();return Math.max(0,t._viewWidth+e.left+e.right)}function $T(t){var e=t.padding();return Math.max(0,t._viewHeight+e.top+e.bottom)}function TT(t){var e=t.padding(),n=t._origin;return[e.left+n[0],e.top+n[1]]}function BT(t,e,n){var r,i,o=t._renderer,a=o&&o.canvas();return a&&(i=TT(t),(r=Hy(e.changedTouches?e.changedTouches[0]:e,a))[0]-=i[0],r[1]-=i[1]),e.dataflow=t,e.item=n,e.vega=function(t,e,n){const r=e?"group"===e.mark.marktype?e:e.mark.group:null;function i(t){var n,i=r;if(t)for(n=e;n;n=n.mark.group)if(n.mark.name===t){i=n;break}return i&&i.mark&&i.mark.interactive?i:{}}function o(t){if(!t)return n;pt(t)&&(t=i(t));const e=n.slice();for(;t;)e[0]-=t.x||0,e[1]-=t.y||0,t=t.mark&&t.mark.group;return e}return{view:Q(t),item:Q(e||{}),group:i,xy:o,x:t=>o(t)[0],y:t=>o(t)[1]}}(t,n,r),e}const NT="view",zT={trap:!1};function OT(t,e,n,r){t._eventListeners.push({type:n,sources:W(e),handler:r})}function RT(t,e,n){const r=t._eventConfig&&t._eventConfig[e];return!(!1===r||x(r)&&!r[n])||(t.warn(`Blocked ${e} ${n} event listener.`),!1)}function LT(t){return t.item}function UT(t){return t.item.mark.source}function qT(t){return function(e,n){return n.vega.view().changeset().encode(n.item,t)}}function PT(t,e,n){const r=document.createElement(t);for(const t in e)r.setAttribute(t,e[t]);return null!=n&&(r.textContent=n),r}function jT(t,e,n,r){const i=n.event||"input",o=()=>t.update(e.value);r.signal(n.signal,e.value),e.addEventListener(i,o),OT(r,e,i,o),t.set=t=>{e.value=t,e.dispatchEvent(function(t){return"undefined"!=typeof Event?new Event(t):{type:t}}(i))}}function IT(t,e,n,r){const i=r.signal(n.signal),o=PT("div",{class:"vega-bind"}),a="radio"===n.input?o:o.appendChild(PT("label"));a.appendChild(PT("span",{class:"vega-bind-name"},n.name||n.signal)),e.appendChild(o);let s=WT;switch(n.input){case"checkbox":s=HT;break;case"select":s=YT;break;case"radio":s=GT;break;case"range":s=VT}s(t,a,n,i)}function WT(t,e,n,r){const i=PT("input");for(const t in n)"signal"!==t&&"element"!==t&&i.setAttribute("input"===t?"type":t,n[t]);i.setAttribute("name",n.signal),i.value=r,e.appendChild(i),i.addEventListener("input",(()=>t.update(i.value))),t.elements=[i],t.set=t=>i.value=t}function HT(t,e,n,r){const i={type:"checkbox",name:n.signal};r&&(i.checked=!0);const o=PT("input",i);e.appendChild(o),o.addEventListener("change",(()=>t.update(o.checked))),t.elements=[o],t.set=t=>o.checked=!!t||null}function YT(t,e,n,r){const i=PT("select",{name:n.signal}),o=n.labels||[];n.options.forEach(((t,e)=>{const n={value:t};XT(t,r)&&(n.selected=!0),i.appendChild(PT("option",n,(o[e]||t)+""))})),e.appendChild(i),i.addEventListener("change",(()=>{t.update(n.options[i.selectedIndex])})),t.elements=[i],t.set=t=>{for(let e=0,r=n.options.length;e<r;++e)if(XT(n.options[e],t))return void(i.selectedIndex=e)}}function GT(t,e,n,r){const i=PT("span",{class:"vega-bind-radio"}),o=n.labels||[];e.appendChild(i),t.elements=n.options.map(((e,a)=>{const s={type:"radio",name:n.signal,value:e};XT(e,r)&&(s.checked=!0);const u=PT("input",s);u.addEventListener("change",(()=>t.update(e)));const l=PT("label",{},(o[a]||e)+"");return l.prepend(u),i.appendChild(l),u})),t.set=e=>{const n=t.elements,r=n.length;for(let t=0;t<r;++t)XT(n[t].value,e)&&(n[t].checked=!0)}}function VT(t,e,n,r){r=void 0!==r?r:(+n.max+ +n.min)/2;const i=null!=n.max?n.max:Math.max(100,+r)||100,o=n.min||Math.min(0,i,+r)||0,a=n.step||he(o,i,100),s=PT("input",{type:"range",name:n.signal,min:o,max:i,step:a});s.value=r;const u=PT("span",{},+r);e.appendChild(s),e.appendChild(u);const l=()=>{u.textContent=s.value,t.update(+s.value)};s.addEventListener("input",l),s.addEventListener("change",l),t.elements=[s],t.set=t=>{s.value=t,u.textContent=t}}function XT(t,e){return t===e||t+""==e+""}function JT(t,e,n,r,i,o){return(e=e||new r(t.loader())).initialize(n,ST(t),$T(t),TT(t),i,o).background(t.background())}function ZT(t,e){return e?function(){try{e.apply(this,arguments)}catch(e){t.error(e)}}:null}function QT(t,e,n){if("string"==typeof e){if("undefined"==typeof document)return t.error("DOM document instance not found."),null;if(!(e=document.querySelector(e)))return t.error("Signal bind element not found: "+e),null}if(e&&n)try{e.textContent=""}catch(n){e=null,t.error(n)}return e}const KT=t=>+t||0;function tB(t){return x(t)?{top:KT(t.top),bottom:KT(t.bottom),left:KT(t.left),right:KT(t.right)}:(t=>({top:t,bottom:t,left:t,right:t}))(KT(t))}async function eB(t,e,n,r){const i=y_(e),o=i&&i.headless;return o||s("Unrecognized renderer type: "+e),await t.runAsync(),JT(t,null,null,o,n,r).renderAsync(t._scenegraph.root)}var nB="width",rB="height",iB="padding",oB={skip:!0};function aB(t,e){var n=t.autosize(),r=t.padding();return e-(n&&n.contains===iB?r.left+r.right:0)}function sB(t,e){var n=t.autosize(),r=t.padding();return e-(n&&n.contains===iB?r.top+r.bottom:0)}function uB(t,e){return e.modified&&_(e.input.value)&&!t.startsWith("_:vega:_")}function lB(t,e){return!("parent"===t||e instanceof Ua.proxy)}function cB(t,e,n,r){const i=t.element();i&&i.setAttribute("title",function(t){return null==t?"":_(t)?fB(t):x(t)&&!ct(t)?(e=t,Object.keys(e).map((t=>{const n=e[t];return t+": "+(_(n)?fB(n):hB(n))})).join("\n")):t+"";var e}(r))}function fB(t){return"["+t.map(hB).join(", ")+"]"}function hB(t){return _(t)?"[…]":x(t)&&!ct(t)?"{…}":t}function dB(t,e){const n=this;if(e=e||{},Oa.call(n),e.loader&&n.loader(e.loader),e.logger&&n.logger(e.logger),null!=e.logLevel&&n.logLevel(e.logLevel),e.locale||t.locale){const r=tt({},t.locale,e.locale);n.locale(Co(r.number,r.time))}n._el=null,n._elBind=null,n._renderType=e.renderer||g_.Canvas,n._scenegraph=new Ly;const r=n._scenegraph.root;n._renderer=null,n._tooltip=e.tooltip||cB,n._redraw=!0,n._handler=(new gv).scene(r),n._globalCursor=!1,n._preventDefault=!1,n._timers=[],n._eventListeners=[],n._resizeListeners=[],n._eventConfig=function(t){const e=tt({defaults:{}},t),n=(t,e)=>{e.forEach((e=>{_(t[e])&&(t[e]=Dt(t[e]))}))};return n(e.defaults,["prevent","allow"]),n(e,["view","window","selector"]),e}(t.eventConfig),n.globalCursor(n._eventConfig.globalCursor);const i=function(t,e,n){return wT(t,Ua,aT,n).parse(e)}(n,t,e.expr);n._runtime=i,n._signals=i.signals,n._bind=(t.bindings||[]).map((t=>({state:null,param:tt({},t)}))),i.root&&i.root.set(r),r.source=i.data.root.input,n.pulse(i.data.root.input,n.changeset().insert(r.items)),n._width=n.width(),n._height=n.height(),n._viewWidth=aB(n,n._width),n._viewHeight=sB(n,n._height),n._origin=[0,0],n._resize=0,n._autosize=1,function(t){var e=t._signals,n=e[nB],r=e[rB],i=e[iB];function o(){t._autosize=t._resize=1}t._resizeWidth=t.add(null,(e=>{t._width=e.size,t._viewWidth=aB(t,e.size),o()}),{size:n}),t._resizeHeight=t.add(null,(e=>{t._height=e.size,t._viewHeight=sB(t,e.size),o()}),{size:r});const a=t.add(null,o,{pad:i});t._resizeWidth.rank=n.rank+1,t._resizeHeight.rank=r.rank+1,a.rank=i.rank+1}(n),function(t){t.add(null,(e=>(t._background=e.bg,t._resize=1,e.bg)),{bg:t._signals.background})}(n),function(t){const e=t._signals.cursor||(t._signals.cursor=t.add({user:ET,item:null}));t.on(t.events("view","pointermove"),e,((t,n)=>{const r=e.value,i=r?pt(r)?r:r.user:ET,o=n.item&&n.item.cursor||null;return r&&i===r.user&&o==r.item?r:{user:i,item:o}})),t.add(null,(function(e){let n=e.cursor,r=this.value;return pt(n)||(r=n.item,n=n.user),DT(t,n&&n!==ET?n:r||n),r}),{cursor:e})}(n),n.description(t.description),e.hover&&n.hover(),e.container&&n.initialize(e.container,e.bind),e.watchPixelRatio&&n._watchPixelRatio()}function pB(t,e){return rt(t._signals,e)?t._signals[e]:s("Unrecognized signal name: "+wt(e))}function gB(t,e){const n=(t._targets||[]).filter((t=>t._update&&t._update.handler===e));return n.length?n[0]:null}function mB(t,e,n,r){let i=gB(n,r);return i||(i=ZT(t,(()=>r(e,n.value))),i.handler=r,t.on(n,null,i)),t}function yB(t,e,n){const r=gB(e,n);return r&&e._targets.remove(r),t}st(dB,Oa,{async evaluate(t,e,n){if(await Oa.prototype.evaluate.call(this,t,e),this._redraw||this._resize)try{this._renderer&&(this._resize&&(this._resize=0,function(t){var e=TT(t),n=ST(t),r=$T(t);t._renderer.background(t.background()),t._renderer.resize(n,r,e),t._handler.origin(e),t._resizeListeners.forEach((e=>{try{e(n,r)}catch(e){t.error(e)}}))}(this)),await this._renderer.renderAsync(this._scenegraph.root)),this._redraw=!1}catch(t){this.error(t)}return n&&ea(this,n),this},dirty(t){this._redraw=!0,this._renderer&&this._renderer.dirty(t)},description(t){if(arguments.length){const e=null!=t?t+"":null;return e!==this._desc&&AT(this._el,this._desc=e),this}return this._desc},container(){return this._el},scenegraph(){return this._scenegraph},origin(){return this._origin.slice()},signal(t,e,n){const r=pB(this,t);return 1===arguments.length?r.value:this.update(r,e,n)},width(t){return arguments.length?this.signal("width",t):this.signal("width")},height(t){return arguments.length?this.signal("height",t):this.signal("height")},padding(t){return arguments.length?this.signal("padding",tB(t)):tB(this.signal("padding"))},autosize(t){return arguments.length?this.signal("autosize",t):this.signal("autosize")},background(t){return arguments.length?this.signal("background",t):this.signal("background")},renderer(t){return arguments.length?(y_(t)||s("Unrecognized renderer type: "+t),t!==this._renderType&&(this._renderType=t,this._resetRenderer()),this):this._renderType},tooltip(t){return arguments.length?(t!==this._tooltip&&(this._tooltip=t,this._resetRenderer()),this):this._tooltip},loader(t){return arguments.length?(t!==this._loader&&(Oa.prototype.loader.call(this,t),this._resetRenderer()),this):this._loader},resize(){return this._autosize=1,this.touch(pB(this,"autosize"))},_resetRenderer(){this._renderer&&(this._renderer=null,this.initialize(this._el,this._elBind))},_resizeView:function(t,e,n,r,i,o){this.runAfter((a=>{let s=0;a._autosize=0,a.width()!==n&&(s=1,a.signal(nB,n,oB),a._resizeWidth.skip(!0)),a.height()!==r&&(s=1,a.signal(rB,r,oB),a._resizeHeight.skip(!0)),a._viewWidth!==t&&(a._resize=1,a._viewWidth=t),a._viewHeight!==e&&(a._resize=1,a._viewHeight=e),a._origin[0]===i[0]&&a._origin[1]===i[1]||(a._resize=1,a._origin=i),s&&a.run("enter"),o&&a.runAfter((t=>t.resize()))}),!1,1)},addEventListener(t,e,n){let r=e;return n&&!1===n.trap||(r=ZT(this,e),r.raw=e),this._handler.on(t,r),this},removeEventListener(t,e){for(var n,r,i=this._handler.handlers(t),o=i.length;--o>=0;)if(r=i[o].type,n=i[o].handler,t===r&&(e===n||e===n.raw)){this._handler.off(r,n);break}return this},addResizeListener(t){const e=this._resizeListeners;return e.includes(t)||e.push(t),this},removeResizeListener(t){var e=this._resizeListeners,n=e.indexOf(t);return n>=0&&e.splice(n,1),this},addSignalListener(t,e){return mB(this,t,pB(this,t),e)},removeSignalListener(t,e){return yB(this,pB(this,t),e)},addDataListener(t,e){return mB(this,t,CT(this,t).values,e)},removeDataListener(t,e){return yB(this,CT(this,t).values,e)},globalCursor(t){if(arguments.length){if(this._globalCursor!==!!t){const e=DT(this,null);this._globalCursor=!!t,e&&DT(this,e)}return this}return this._globalCursor},preventDefault(t){return arguments.length?(this._preventDefault=t,this):this._preventDefault},timer:function(t,e){this._timers.push(function(t,e,n){var r=new zE,i=e;return null==e?(r.restart(t,e,n),r):(r._restart=r.restart,r.restart=function(t,e,n){e=+e,n=null==n?BE():+n,r._restart((function o(a){a+=i,r._restart(o,i+=e,n),t(a)}),e,n)},r.restart(t,e,n),r)}((function(e){t({timestamp:Date.now(),elapsed:e})}),e))},events:function(t,e,n){var r,i=this,o=new ba(n),a=function(n,r){i.runAsync(null,(()=>{t===NT&&function(t,e){var n=t._eventConfig.defaults,r=n.prevent,i=n.allow;return!1!==r&&!0!==i&&(!0===r||!1===i||(r?r[e]:i?!i[e]:t.preventDefault()))}(i,e)&&n.preventDefault(),o.receive(BT(i,n,r))}))};if("timer"===t)RT(i,"timer",e)&&i.timer(a,e);else if(t===NT)RT(i,"view",e)&&i.addEventListener(e,a,zT);else if("window"===t?RT(i,"window",e)&&"undefined"!=typeof window&&(r=[window]):"undefined"!=typeof document&&RT(i,"selector",e)&&(r=Array.from(document.querySelectorAll(t))),r){for(var s=0,u=r.length;s<u;++s)r[s].addEventListener(e,a);OT(i,r,e,a)}else i.warn("Can not resolve event source: "+t);return o},finalize:function(){var t,e,n,r,i,o=this._tooltip,a=this._timers,s=this._handler.handlers(),u=this._eventListeners;for(t=a.length;--t>=0;)a[t].stop();for(t=u.length;--t>=0;)for(e=(n=u[t]).sources.length;--e>=0;)n.sources[e].removeEventListener(n.type,n.handler);for(o&&o.call(this,this._handler,null,null,null),t=s.length;--t>=0;)i=s[t].type,r=s[t].handler,this._handler.off(i,r);return this},hover:function(t,e){return e=[e||"update",(t=[t||"hover"])[0]],this.on(this.events("view","pointerover",LT),UT,qT(t)),this.on(this.events("view","pointerout",LT),UT,qT(e)),this},data:function(t,e){return arguments.length<2?CT(this,t).values.value:FT.call(this,t,da().remove(p).insert(e))},change:FT,insert:function(t,e){return FT.call(this,t,da().insert(e))},remove:function(t,e){return FT.call(this,t,da().remove(e))},scale:function(t){var e=this._runtime.scales;return rt(e,t)||s("Unrecognized scale or projection: "+t),e[t].value},initialize:function(t,e){const n=this,r=n._renderType,i=n._eventConfig.bind,o=y_(r);t=n._el=t?QT(n,t,!0):null,function(t){const e=t.container();e&&(e.setAttribute("role","graphics-document"),e.setAttribute("aria-roleDescription","visualization"),AT(e,t.description()))}(n),o||n.error("Unrecognized renderer type: "+r);const a=o.handler||gv,s=t?o.renderer:o.headless;return n._renderer=s?JT(n,n._renderer,t,s):null,n._handler=function(t,e,n,r){const i=new r(t.loader(),ZT(t,t.tooltip())).scene(t.scenegraph().root).initialize(n,TT(t),t);return e&&e.handlers().forEach((t=>{i.on(t.type,t.handler)})),i}(n,n._handler,t,a),n._redraw=!0,t&&"none"!==i&&(e=e?n._elBind=QT(n,e,!0):t.appendChild(PT("form",{class:"vega-bindings"})),n._bind.forEach((t=>{t.param.element&&"container"!==i&&(t.element=QT(n,t.param.element,!!t.param.input))})),n._bind.forEach((t=>{!function(t,e,n){if(!e)return;const r=n.param;let i=n.state;i||(i=n.state={elements:null,active:!1,set:null,update:e=>{e!=t.signal(r.signal)&&t.runAsync(null,(()=>{i.source=!0,t.signal(r.signal,e)}))}},r.debounce&&(i.update=K(r.debounce,i.update))),(null==r.input&&r.element?jT:IT)(i,e,r,t),i.active||(t.on(t._signals[r.signal],null,(()=>{i.source?i.source=!1:i.set(t.signal(r.signal))})),i.active=!0)}(n,t.element||e,t)}))),n},toImageURL:async function(t,e){t!==g_.Canvas&&t!==g_.SVG&&t!==g_.PNG&&s("Unrecognized image type: "+t);const n=await eB(this,t,e);return t===g_.SVG?function(t,e){const n=new Blob([t],{type:e});return window.URL.createObjectURL(n)}(n.svg(),"image/svg+xml"):n.canvas().toDataURL("image/png")},toCanvas:async function(t,e){return(await eB(this,g_.Canvas,t,e)).canvas()},toSVG:async function(t){return(await eB(this,g_.SVG,t)).svg()},getState:function(t){return this._runtime.getState(t||{data:uB,signals:lB,recurse:!0})},setState:function(t){return this.runAsync(null,(e=>{e._trigger=!1,e._runtime.setState(t)}),(t=>{t._trigger=!0})),this},_watchPixelRatio:function(){if("canvas"===this.renderer()&&this._renderer._canvas){let t=null;const e=()=>{null!=t&&t();const n=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);n.addEventListener("change",e),t=()=>{n.removeEventListener("change",e)},this._renderer._canvas.getContext("2d").pixelRatio=window.devicePixelRatio||1,this._redraw=!0,this._resize=1,this.resize().runAsync()};e()}}});const vB="[",_B="]",xB=/[[\]{}]/,bB={"*":1,arc:1,area:1,group:1,image:1,line:1,path:1,rect:1,rule:1,shape:1,symbol:1,text:1,trail:1};let wB,kB;function MB(t,e,n){return wB=e||"view",kB=n||bB,EB(t.trim()).map(DB)}function AB(t,e,n,r,i){const o=t.length;let a,s=0;for(;e<o;++e){if(a=t[e],!s&&a===n)return e;i&&i.includes(a)?--s:r&&r.includes(a)&&++s}return e}function EB(t){const e=[],n=t.length;let r=0,i=0;for(;i<n;)i=AB(t,i,",","[{","]}"),e.push(t.substring(r,i).trim()),r=++i;if(0===e.length)throw"Empty event selector: "+t;return e}function DB(t){return"["===t[0]?function(t){const e=t.length;let n,r=1;if(r=AB(t,r,_B,vB,_B),r===e)throw"Empty between selector: "+t;if(n=EB(t.substring(1,r)),2!==n.length)throw"Between selector must have two elements: "+t;if(t=t.slice(r+1).trim(),">"!==t[0])throw"Expected '>' after between selector: "+t;n=n.map(DB);const i=DB(t.slice(1).trim());if(i.between)return{between:n,stream:i};i.between=n;return i}(t):function(t){const e={source:wB},n=[];let r,i,o=[0,0],a=0,s=0,u=t.length,l=0;if("}"===t[u-1]){if(l=t.lastIndexOf("{"),!(l>=0))throw"Unmatched right brace: "+t;try{o=function(t){const e=t.split(",");if(!t.length||e.length>2)throw t;return e.map((e=>{const n=+e;if(n!=n)throw t;return n}))}(t.substring(l+1,u-1))}catch(e){throw"Invalid throttle specification: "+t}u=(t=t.slice(0,l).trim()).length,l=0}if(!u)throw t;"@"===t[0]&&(a=++l);r=AB(t,l,":"),r<u&&(n.push(t.substring(s,r).trim()),s=l=++r);if(l=AB(t,l,vB),l===u)n.push(t.substring(s,u).trim());else if(n.push(t.substring(s,l).trim()),i=[],s=++l,s===u)throw"Unmatched left bracket: "+t;for(;l<u;){if(l=AB(t,l,_B),l===u)throw"Unmatched left bracket: "+t;if(i.push(t.substring(s,l).trim()),l<u-1&&t[++l]!==vB)throw"Expected left bracket: "+t;s=++l}if(!(u=n.length)||xB.test(n[u-1]))throw"Invalid event selector: "+t;u>1?(e.type=n[1],a?e.markname=n[0].slice(1):!function(t){return kB[t]}(n[0])?e.source=n[0]:e.marktype=n[0]):e.type=n[0];"!"===e.type.slice(-1)&&(e.consume=!0,e.type=e.type.slice(0,-1));null!=i&&(e.filter=i);o[0]&&(e.throttle=o[0]);o[1]&&(e.debounce=o[1]);return e}(t)}function CB(t){return x(t)?t:{type:t||"pad"}}const FB=t=>+t||0;function SB(t){return x(t)?t.signal?t:{top:FB(t.top),bottom:FB(t.bottom),left:FB(t.left),right:FB(t.right)}:{top:e=FB(t),bottom:e,left:e,right:e};var e}const $B=t=>x(t)&&!_(t)?tt({},t):{value:t};function TB(t,e,n,r){if(null!=n){return x(n)&&!_(n)||_(n)&&n.length&&x(n[0])?t.update[e]=n:t[r||"enter"][e]={value:n},1}return 0}function BB(t,e,n){for(const n in e)TB(t,n,e[n]);for(const e in n)TB(t,e,n[e],"update")}function NB(t,e,n){for(const r in e)n&&rt(n,r)||(t[r]=tt(t[r]||{},e[r]));return t}function zB(t,e){return e&&(e.enter&&e.enter[t]||e.update&&e.update[t])}const OB="mark",RB="frame",LB="scope",UB="legend-label",qB="title-text",PB="title-subtitle";function jB(t,e,n){t[e]=n&&n.signal?{signal:n.signal}:{value:n}}const IB=t=>pt(t)?wt(t):t.signal?`(${t.signal})`:GB(t);function WB(t){if(null!=t.gradient)return function(t){const e=[t.start,t.stop,t.count].map((t=>null==t?null:wt(t)));for(;e.length&&null==A(e);)e.pop();return e.unshift(IB(t.gradient)),`gradient(${e.join(",")})`}(t);let e=t.signal?`(${t.signal})`:t.color?function(t){return t.c?HB("hcl",t.h,t.c,t.l):t.h||t.s?HB("hsl",t.h,t.s,t.l):t.l||t.a?HB("lab",t.l,t.a,t.b):t.r||t.g||t.b?HB("rgb",t.r,t.g,t.b):null}(t.color):null!=t.field?GB(t.field):void 0!==t.value?wt(t.value):void 0;return null!=t.scale&&(e=function(t,e){const n=IB(t.scale);null!=t.range?e=`lerp(_range(${n}), ${+t.range})`:(void 0!==e&&(e=`_scale(${n}, ${e})`),t.band&&(e=(e?e+"+":"")+`_bandwidth(${n})`+(1==+t.band?"":"*"+YB(t.band)),t.extra&&(e=`(datum.extra ? _scale(${n}, datum.extra.value) : ${e})`)),null==e&&(e="0"));return e}(t,e)),void 0===e&&(e=null),null!=t.exponent&&(e=`pow(${e},${YB(t.exponent)})`),null!=t.mult&&(e+=`*${YB(t.mult)}`),null!=t.offset&&(e+=`+${YB(t.offset)}`),t.round&&(e=`round(${e})`),e}const HB=(t,e,n,r)=>`(${t}(${[e,n,r].map(WB).join(",")})+'')`;function YB(t){return x(t)?"("+WB(t)+")":t}function GB(t){return VB(x(t)?t:{datum:t})}function VB(t){let e,n,r;if(t.signal)e="datum",r=t.signal;else if(t.group||t.parent){for(n=Math.max(1,t.level||1),e="item";n-- >0;)e+=".mark.group";t.parent?(r=t.parent,e+=".datum"):r=t.group}else t.datum?(e="datum",r=t.datum):s("Invalid field reference: "+wt(t));return t.signal||(r=pt(r)?u(r).map(wt).join("]["):VB(r)),e+"["+r+"]"}function XB(t,e,n,r,i,o){const a={};(o=o||{}).encoders={$encode:a},t=function(t,e,n,r,i){const o={},a={};let s,u,l,c;for(u in u="lineBreak","text"!==e||null==i[u]||zB(u,t)||jB(o,u,i[u]),("legend"==n||String(n).startsWith("axis"))&&(n=null),c=n===RB?i.group:n===OB?tt({},i.mark,i[e]):null,c)l=zB(u,t)||("fill"===u||"stroke"===u)&&(zB("fill",t)||zB("stroke",t)),l||jB(o,u,c[u]);for(u in W(r).forEach((e=>{const n=i.style&&i.style[e];for(const e in n)zB(e,t)||jB(o,e,n[e])})),t=tt({},t),o)c=o[u],c.signal?(s=s||{})[u]=c:a[u]=c;return t.enter=tt(a,t.enter),s&&(t.update=tt(s,t.update)),t}(t,e,n,r,i.config);for(const n in t)a[n]=JB(t[n],e,o,i);return o}function JB(t,e,n,r){const i={},o={};for(const e in t)null!=t[e]&&(i[e]=ZB((a=t[e],_(a)?function(t){let e="";return t.forEach((t=>{const n=WB(t);e+=t.test?`(${t.test})?${n}:`:n})),":"===A(e)&&(e+="null"),e}(a):WB(a)),r,n,o));var a;return{$expr:{marktype:e,channels:i},$fields:Object.keys(o),$output:Object.keys(t)}}function ZB(t,e,n,r){const i=dT(t,e);return i.$fields.forEach((t=>r[t]=1)),tt(n,i.$params),i.$expr}const QB=["value","update","init","react","bind"];function KB(t,e){s(t+' for "outer" push: '+wt(e))}function tN(t,e){const n=t.name;if("outer"===t.push)e.signals[n]||KB("No prior signal definition",n),QB.forEach((e=>{void 0!==t[e]&&KB("Invalid property ",e)}));else{const r=e.addSignal(n,t.value);!1===t.react&&(r.react=!1),t.bind&&e.addBinding(n,t.bind)}}function eN(t,e,n,r){this.id=-1,this.type=t,this.value=e,this.params=n,r&&(this.parent=r)}function nN(t,e,n,r){return new eN(t,e,n,r)}function rN(t,e){return nN("operator",t,e)}function iN(t){const e={$ref:t.id};return t.id<0&&(t.refs=t.refs||[]).push(e),e}function oN(t,e){return e?{$field:t,$name:e}:{$field:t}}const aN=oN("key");function sN(t,e){return{$compare:t,$order:e}}function uN(t,e){return(t&&t.signal?"$"+t.signal:t||"")+(t&&e?"_":"")+(e&&e.signal?"$"+e.signal:e||"")}const lN="scope",cN="view";function fN(t){return t&&t.signal}function hN(t){if(fN(t))return!0;if(x(t))for(const e in t)if(hN(t[e]))return!0;return!1}function dN(t,e){return null!=t?t:e}function pN(t){return t&&t.signal||t}const gN="timer";function mN(t,e){return(t.merge?yN:t.stream?vN:t.type?_N:s("Invalid stream specification: "+wt(t)))(t,e)}function yN(t,e){const n=xN({merge:t.merge.map((t=>mN(t,e)))},t,e);return e.addStream(n).id}function vN(t,e){const n=xN({stream:mN(t.stream,e)},t,e);return e.addStream(n).id}function _N(t,e){let n;t.type===gN?(n=e.event(gN,t.throttle),t={between:t.between,filter:t.filter}):n=e.event(function(t){return t===lN?cN:t||cN}(t.source),t.type);const r=xN({stream:n},t,e);return 1===Object.keys(r).length?n:e.addStream(r).id}function xN(t,e,n){let r=e.between;return r&&(2!==r.length&&s('Stream "between" parameter must have 2 entries: '+wt(e)),t.between=[mN(r[0],n),mN(r[1],n)]),r=e.filter?[].concat(e.filter):[],(e.marktype||e.markname||e.markrole)&&r.push(function(t,e,n){const r="event.item";return r+(t&&"*"!==t?"&&"+r+".mark.marktype==='"+t+"'":"")+(n?"&&"+r+".mark.role==='"+n+"'":"")+(e?"&&"+r+".mark.name==='"+e+"'":"")}(e.marktype,e.markname,e.markrole)),e.source===lN&&r.push("inScope(event.item)"),r.length&&(t.filter=dT("("+r.join(")&&(")+")",n).$expr),null!=(r=e.throttle)&&(t.throttle=+r),null!=(r=e.debounce)&&(t.debounce=+r),e.consume&&(t.consume=!0),t}const bN={code:"_.$value",ast:{type:"Identifier",value:"value"}};function wN(t,e,n){const r=t.encode,i={target:n};let o=t.events,a=t.update,u=[];o||s("Signal update missing events specification."),pt(o)&&(o=MB(o,e.isSubscope()?lN:cN)),o=W(o).filter((t=>t.signal||t.scale?(u.push(t),0):1)),u.length>1&&(u=[kN(u)]),o.length&&u.push(o.length>1?{merge:o}:o[0]),null!=r&&(a&&s("Signal encode and update are mutually exclusive."),a="encode(item(),"+wt(r)+")"),i.update=pt(a)?dT(a,e):null!=a.expr?dT(a.expr,e):null!=a.value?a.value:null!=a.signal?{$expr:bN,$params:{$value:e.signalRef(a.signal)}}:s("Invalid signal update specification."),t.force&&(i.options={force:!0}),u.forEach((t=>e.addUpdate(tt(function(t,e){return{source:t.signal?e.signalRef(t.signal):t.scale?e.scaleRef(t.scale):mN(t,e)}}(t,e),i))))}function kN(t){return{signal:"["+t.map((t=>t.scale?'scale("'+t.scale+'")':t.signal))+"]"}}const MN=t=>(e,n,r)=>nN(t,n,e||void 0,r),AN=MN("aggregate"),EN=MN("axisticks"),DN=MN("bound"),CN=MN("collect"),FN=MN("compare"),SN=MN("datajoin"),$N=MN("encode"),TN=MN("expression"),BN=MN("facet"),NN=MN("field"),zN=MN("key"),ON=MN("legendentries"),RN=MN("load"),LN=MN("mark"),UN=MN("multiextent"),qN=MN("multivalues"),PN=MN("overlap"),jN=MN("params"),IN=MN("prefacet"),WN=MN("projection"),HN=MN("proxy"),YN=MN("relay"),GN=MN("render"),VN=MN("scale"),XN=MN("sieve"),JN=MN("sortitems"),ZN=MN("viewlayout"),QN=MN("values");let KN=0;const tz={min:"min",max:"max",count:"sum"};function ez(t,e){const n=e.getScale(t.name).params;let r;for(r in n.domain=oz(t.domain,t,e),null!=t.range&&(n.range=dz(t,e,n)),null!=t.interpolate&&function(t,e){e.interpolate=nz(t.type||t),null!=t.gamma&&(e.interpolateGamma=nz(t.gamma))}(t.interpolate,n),null!=t.nice&&(n.nice=function(t,e){return t.signal?e.signalRef(t.signal):x(t)?{interval:nz(t.interval),step:nz(t.step)}:nz(t)}(t.nice,e)),null!=t.bins&&(n.bins=function(t,e){return t.signal||_(t)?rz(t,e):e.objectProperty(t)}(t.bins,e)),t)rt(n,r)||"name"===r||(n[r]=nz(t[r],e))}function nz(t,e){return x(t)?t.signal?e.signalRef(t.signal):s("Unsupported object: "+wt(t)):t}function rz(t,e){return t.signal?e.signalRef(t.signal):t.map((t=>nz(t,e)))}function iz(t){s("Can not find data set: "+wt(t))}function oz(t,e,n){if(t)return t.signal?n.signalRef(t.signal):(_(t)?az:t.fields?uz:sz)(t,e,n);null==e.domainMin&&null==e.domainMax||s("No scale domain defined for domainMin/domainMax to override.")}function az(t,e,n){return t.map((t=>nz(t,n)))}function sz(t,e,n){const r=n.getData(t.data);return r||iz(t.data),Qd(e.type)?r.valuesRef(n,t.field,cz(t.sort,!1)):np(e.type)?r.domainRef(n,t.field):r.extentRef(n,t.field)}function uz(t,e,n){const r=t.data,i=t.fields.reduce(((t,e)=>(e=pt(e)?{data:r,field:e}:_(e)||e.signal?function(t,e){const n="_:vega:_"+KN++,r=CN({});if(_(t))r.value={$ingest:t};else if(t.signal){const i="setdata("+wt(n)+","+t.signal+")";r.params.input=e.signalRef(i)}return e.addDataPipeline(n,[r,XN({})]),{data:n,field:"data"}}(e,n):e,t.push(e),t)),[]);return(Qd(e.type)?lz:np(e.type)?fz:hz)(t,n,i)}function lz(t,e,n){const r=cz(t.sort,!0);let i,o;const a=n.map((t=>{const n=e.getData(t.data);return n||iz(t.data),n.countsRef(e,t.field,r)})),s={groupby:aN,pulse:a};r&&(i=r.op||"count",o=r.field?uN(i,r.field):"count",s.ops=[tz[i]],s.fields=[e.fieldRef(o)],s.as=[o]),i=e.add(AN(s));const u=e.add(CN({pulse:iN(i)}));return o=e.add(QN({field:aN,sort:e.sortRef(r),pulse:iN(u)})),iN(o)}function cz(t,e){return t&&(t.field||t.op?t.field||"count"===t.op?e&&t.field&&t.op&&!tz[t.op]&&s("Multiple domain scales can not be sorted using "+t.op):s("No field provided for sort aggregate op: "+t.op):x(t)?t.field="key":t={field:"key"}),t}function fz(t,e,n){const r=n.map((t=>{const n=e.getData(t.data);return n||iz(t.data),n.domainRef(e,t.field)}));return iN(e.add(qN({values:r})))}function hz(t,e,n){const r=n.map((t=>{const n=e.getData(t.data);return n||iz(t.data),n.extentRef(e,t.field)}));return iN(e.add(UN({extents:r})))}function dz(t,e,n){const r=e.config.range;let i=t.range;if(i.signal)return e.signalRef(i.signal);if(pt(i)){if(r&&rt(r,i))return dz(t=tt({},t,{range:r[i]}),e,n);"width"===i?i=[0,{signal:"width"}]:"height"===i?i=Qd(t.type)?[0,{signal:"height"}]:[{signal:"height"},0]:s("Unrecognized scale range value: "+wt(i))}else{if(i.scheme)return n.scheme=_(i.scheme)?rz(i.scheme,e):nz(i.scheme,e),i.extent&&(n.schemeExtent=rz(i.extent,e)),void(i.count&&(n.schemeCount=nz(i.count,e)));if(i.step)return void(n.rangeStep=nz(i.step,e));if(Qd(t.type)&&!_(i))return oz(i,t,e);_(i)||s("Unsupported range type: "+wt(i))}return i.map((t=>(_(t)?rz:nz)(t,e)))}function pz(t,e,n){return _(t)?t.map((t=>pz(t,e,n))):x(t)?t.signal?n.signalRef(t.signal):"fit"===e?t:s("Unsupported parameter object: "+wt(t)):t}const gz="top",mz="left",yz="right",vz="bottom",_z="center",xz="index",bz="label",wz="perc",kz="value",Mz="guide-label",Az="guide-title",Ez="group-title",Dz="group-subtitle",Cz="symbol",Fz="gradient",Sz="discrete",$z="size",Tz=[$z,"shape","fill","stroke","strokeWidth","strokeDash","opacity"],Bz={name:1,style:1,interactive:1},Nz={value:0},zz={value:1},Oz="group",Rz="rect",Lz="rule",Uz="text";function qz(t){return t.type=Oz,t.interactive=t.interactive||!1,t}function Pz(t,e){const n=(n,r)=>dN(t[n],dN(e[n],r));return n.isVertical=n=>"vertical"===dN(t.direction,e.direction||(n?e.symbolDirection:e.gradientDirection)),n.gradientLength=()=>dN(t.gradientLength,e.gradientLength||e.gradientWidth),n.gradientThickness=()=>dN(t.gradientThickness,e.gradientThickness||e.gradientHeight),n.entryColumns=()=>dN(t.columns,dN(e.columns,+n.isVertical(!0))),n}function jz(t,e){const n=e&&(e.update&&e.update[t]||e.enter&&e.enter[t]);return n&&n.signal?n:n?n.value:null}function Iz(t,e,n){return`item.anchor === 'start' ? ${t} : item.anchor === 'end' ? ${e} : ${n}`}const Wz=Iz(wt(mz),wt(yz),wt(_z));function Hz(t,e){return e?t?x(t)?Object.assign({},t,{offset:Hz(t.offset,e)}):{value:t,offset:e}:e:t}function Yz(t,e){return e?(t.name=e.name,t.style=e.style||t.style,t.interactive=!!e.interactive,t.encode=NB(t.encode,e,Bz)):t.interactive=!1,t}function Gz(t,e,n,r){const i=Pz(t,n),o=i.isVertical(),a=i.gradientThickness(),s=i.gradientLength();let u,l,c,f,h;o?(l=[0,1],c=[0,0],f=a,h=s):(l=[0,0],c=[1,0],f=s,h=a);const d={enter:u={opacity:Nz,x:Nz,y:Nz,width:$B(f),height:$B(h)},update:tt({},u,{opacity:zz,fill:{gradient:e,start:l,stop:c}}),exit:{opacity:Nz}};return BB(d,{stroke:i("gradientStrokeColor"),strokeWidth:i("gradientStrokeWidth")},{opacity:i("gradientOpacity")}),Yz({type:Rz,role:"legend-gradient",encode:d},r)}function Vz(t,e,n,r,i){const o=Pz(t,n),a=o.isVertical(),s=o.gradientThickness(),u=o.gradientLength();let l,c,f,h,d="";a?(l="y",f="y2",c="x",h="width",d="1-"):(l="x",f="x2",c="y",h="height");const p={opacity:Nz,fill:{scale:e,field:kz}};p[l]={signal:d+"datum."+wz,mult:u},p[c]=Nz,p[f]={signal:d+"datum.perc2",mult:u},p[h]=$B(s);const g={enter:p,update:tt({},p,{opacity:zz}),exit:{opacity:Nz}};return BB(g,{stroke:o("gradientStrokeColor"),strokeWidth:o("gradientStrokeWidth")},{opacity:o("gradientOpacity")}),Yz({type:Rz,role:"legend-band",key:kz,from:i,encode:g},r)}const Xz=`datum.${wz}<=0?"${mz}":datum.${wz}>=1?"${yz}":"${_z}"`,Jz=`datum.${wz}<=0?"${vz}":datum.${wz}>=1?"${gz}":"middle"`;function Zz(t,e,n,r){const i=Pz(t,e),o=i.isVertical(),a=$B(i.gradientThickness()),s=i.gradientLength();let u,l,c,f,h=i("labelOverlap"),d="";const p={enter:u={opacity:Nz},update:l={opacity:zz,text:{field:bz}},exit:{opacity:Nz}};return BB(p,{fill:i("labelColor"),fillOpacity:i("labelOpacity"),font:i("labelFont"),fontSize:i("labelFontSize"),fontStyle:i("labelFontStyle"),fontWeight:i("labelFontWeight"),limit:dN(t.labelLimit,e.gradientLabelLimit)}),o?(u.align={value:"left"},u.baseline=l.baseline={signal:Jz},c="y",f="x",d="1-"):(u.align=l.align={signal:Xz},u.baseline={value:"top"},c="x",f="y"),u[c]=l[c]={signal:d+"datum."+wz,mult:s},u[f]=l[f]=a,a.offset=dN(t.labelOffset,e.gradientLabelOffset)||0,h=h?{separation:i("labelSeparation"),method:h,order:"datum."+xz}:void 0,Yz({type:Uz,role:UB,style:Mz,key:kz,from:r,encode:p,overlap:h},n)}function Qz(t,e,n,r,i){const o=Pz(t,e),a=n.entries,s=!(!a||!a.interactive),u=a?a.name:void 0,l=o("clipHeight"),c=o("symbolOffset"),f={data:"value"},h=`(${i}) ? datum.offset : datum.${$z}`,d=l?$B(l):{field:$z},p=`datum.${xz}`,g=`max(1, ${i})`;let m,y,v,_,x;d.mult=.5,m={enter:y={opacity:Nz,x:{signal:h,mult:.5,offset:c},y:d},update:v={opacity:zz,x:y.x,y:y.y},exit:{opacity:Nz}};let b=null,w=null;t.fill||(b=e.symbolBaseFillColor,w=e.symbolBaseStrokeColor),BB(m,{fill:o("symbolFillColor",b),shape:o("symbolType"),size:o("symbolSize"),stroke:o("symbolStrokeColor",w),strokeDash:o("symbolDash"),strokeDashOffset:o("symbolDashOffset"),strokeWidth:o("symbolStrokeWidth")},{opacity:o("symbolOpacity")}),Tz.forEach((e=>{t[e]&&(v[e]=y[e]={scale:t[e],field:kz})}));const k=Yz({type:"symbol",role:"legend-symbol",key:kz,from:f,clip:!!l||void 0,encode:m},n.symbols),M=$B(c);M.offset=o("labelOffset"),m={enter:y={opacity:Nz,x:{signal:h,offset:M},y:d},update:v={opacity:zz,text:{field:bz},x:y.x,y:y.y},exit:{opacity:Nz}},BB(m,{align:o("labelAlign"),baseline:o("labelBaseline"),fill:o("labelColor"),fillOpacity:o("labelOpacity"),font:o("labelFont"),fontSize:o("labelFontSize"),fontStyle:o("labelFontStyle"),fontWeight:o("labelFontWeight"),limit:o("labelLimit")});const A=Yz({type:Uz,role:UB,style:Mz,key:kz,from:f,encode:m},n.labels);return m={enter:{noBound:{value:!l},width:Nz,height:l?$B(l):Nz,opacity:Nz},exit:{opacity:Nz},update:v={opacity:zz,row:{signal:null},column:{signal:null}}},o.isVertical(!0)?(_=`ceil(item.mark.items.length / ${g})`,v.row.signal=`${p}%${_}`,v.column.signal=`floor(${p} / ${_})`,x={field:["row",p]}):(v.row.signal=`floor(${p} / ${g})`,v.column.signal=`${p} % ${g}`,x={field:p}),v.column.signal=`(${i})?${v.column.signal}:${p}`,qz({role:LB,from:r={facet:{data:r,name:"value",groupby:xz}},encode:NB(m,a,Bz),marks:[k,A],name:u,interactive:s,sort:x})}const Kz='item.orient === "left"',tO='item.orient === "right"',eO=`(${Kz} || ${tO})`,nO=`datum.vgrad && ${eO}`,rO=Iz('"top"','"bottom"','"middle"'),iO=`datum.vgrad && ${tO} ? (${Iz('"right"','"left"','"center"')}) : (${eO} && !(datum.vgrad && ${Kz})) ? "left" : ${Wz}`,oO=`item._anchor || (${eO} ? "middle" : "start")`,aO=`${nO} ? (${Kz} ? -90 : 90) : 0`,sO=`${eO} ? (datum.vgrad ? (${tO} ? "bottom" : "top") : ${rO}) : "top"`;function uO(t,e){let n;return x(t)&&(t.signal?n=t.signal:t.path?n="pathShape("+lO(t.path)+")":t.sphere&&(n="geoShape("+lO(t.sphere)+', {type: "Sphere"})')),n?e.signalRef(n):!!t}function lO(t){return x(t)&&t.signal?t.signal:wt(t)}function cO(t){const e=t.role||"";return e.startsWith("axis")||e.startsWith("legend")||e.startsWith("title")?e:t.type===Oz?LB:e||OB}function fO(t){return{marktype:t.type,name:t.name||void 0,role:t.role||cO(t),zindex:+t.zindex||void 0,aria:t.aria,description:t.description}}function hO(t,e){return t&&t.signal?e.signalRef(t.signal):!1!==t}function dO(t,e){const n=qa(t.type);n||s("Unrecognized transform type: "+wt(t.type));const r=nN(n.type.toLowerCase(),null,pO(n,t,e));return t.signal&&e.addSignal(t.signal,e.proxy(r)),r.metadata=n.metadata||{},r}function pO(t,e,n){const r={},i=t.params.length;for(let o=0;o<i;++o){const i=t.params[o];r[i.name]=gO(i,e,n)}return r}function gO(t,e,n){const r=t.type,i=e[t.name];return"index"===r?function(t,e,n){pt(e.from)||s('Lookup "from" parameter must be a string literal.');return n.getData(e.from).lookupRef(n,e.key)}(0,e,n):void 0!==i?"param"===r?function(t,e,n){const r=e[t.name];return t.array?(_(r)||s("Expected an array of sub-parameters. Instead: "+wt(r)),r.map((e=>yO(t,e,n)))):yO(t,r,n)}(t,e,n):"projection"===r?n.projectionRef(e[t.name]):t.array&&!fN(i)?i.map((e=>mO(t,e,n))):mO(t,i,n):void(t.required&&s("Missing required "+wt(e.type)+" parameter: "+wt(t.name)))}function mO(t,e,n){const r=t.type;if(fN(e))return bO(r)?s("Expression references can not be signals."):wO(r)?n.fieldRef(e):kO(r)?n.compareRef(e):n.signalRef(e.signal);{const i=t.expr||wO(r);return i&&vO(e)?n.exprRef(e.expr,e.as):i&&_O(e)?oN(e.field,e.as):bO(r)?dT(e,n):xO(r)?iN(n.getData(e).values):wO(r)?oN(e):kO(r)?n.compareRef(e):e}}function yO(t,e,n){const r=t.params.length;let i;for(let n=0;n<r;++n){i=t.params[n];for(const t in i.key)if(i.key[t]!==e[t]){i=null;break}if(i)break}i||s("Unsupported parameter: "+wt(e));const o=tt(pO(i,e,n),i.key);return iN(n.add(jN(o)))}const vO=t=>t&&t.expr,_O=t=>t&&t.field,xO=t=>"data"===t,bO=t=>"expr"===t,wO=t=>"field"===t,kO=t=>"compare"===t;function MO(t,e){return t.$ref?t:t.data&&t.data.$ref?t.data:iN(e.getData(t.data).output)}function AO(t,e,n,r,i){this.scope=t,this.input=e,this.output=n,this.values=r,this.aggregate=i,this.index={}}function EO(t){return pt(t)?t:null}function DO(t,e,n){const r=uN(n.op,n.field);let i;if(e.ops){for(let t=0,n=e.as.length;t<n;++t)if(e.as[t]===r)return}else e.ops=["count"],e.fields=[null],e.as=["count"];n.op&&(e.ops.push((i=n.op.signal)?t.signalRef(i):n.op),e.fields.push(t.fieldRef(n.field)),e.as.push(r))}function CO(t,e,n,r,i,o,a){const s=e[n]||(e[n]={}),u=function(t){return x(t)?("descending"===t.order?"-":"+")+uN(t.op,t.field):""}(o);let l,c,f=EO(i);if(null!=f&&(t=e.scope,f+=u?"|"+u:"",l=s[f]),!l){const n=o?{field:aN,pulse:e.countsRef(t,i,o)}:{field:t.fieldRef(i),pulse:iN(e.output)};u&&(n.sort=t.sortRef(o)),c=t.add(nN(r,void 0,n)),a&&(e.index[i]=c),l=iN(c),null!=f&&(s[f]=l)}return l}function FO(t,e,n){const r=t.remove,i=t.insert,o=t.toggle,a=t.modify,s=t.values,u=e.add(rN()),l=dT("if("+t.trigger+',modify("'+n+'",'+[i,r,o,a,s].map((t=>null==t?"null":t)).join(",")+"),0)",e);u.update=l.$expr,u.params=l.$params}function SO(t,e){const n=cO(t),r=t.type===Oz,i=t.from&&t.from.facet,o=t.overlap;let a,u,l,c,f,h,d,p=t.layout||n===LB||n===RB;const g=n===OB||p||i,m=function(t,e,n){let r,i,o,a,u;return t?(r=t.facet)&&(e||s("Only group marks can be faceted."),null!=r.field?a=u=MO(r,n):(t.data?u=iN(n.getData(t.data).aggregate):(o=dO(tt({type:"aggregate",groupby:W(r.groupby)},r.aggregate),n),o.params.key=n.keyRef(r.groupby),o.params.pulse=MO(r,n),a=u=iN(n.add(o))),i=n.keyRef(r.groupby,!0))):a=iN(n.add(CN(null,[{}]))),a||(a=MO(t,n)),{key:i,pulse:a,parent:u}}(t.from,r,e);u=e.add(SN({key:m.key||(t.key?oN(t.key):void 0),pulse:m.pulse,clean:!r}));const y=iN(u);u=l=e.add(CN({pulse:y})),u=e.add(LN({markdef:fO(t),interactive:hO(t.interactive,e),clip:uO(t.clip,e),context:{$context:!0},groups:e.lookup(),parent:e.signals.parent?e.signalRef("parent"):null,index:e.markpath(),pulse:iN(u)}));const v=iN(u);u=c=e.add($N(XB(t.encode,t.type,n,t.style,e,{mod:!1,pulse:v}))),u.params.parent=e.encode(),t.transform&&t.transform.forEach((t=>{const n=dO(t,e),r=n.metadata;(r.generates||r.changes)&&s("Mark transforms should not generate new data."),r.nomod||(c.params.mod=!0),n.params.pulse=iN(u),e.add(u=n)})),t.sort&&(u=e.add(JN({sort:e.compareRef(t.sort),pulse:iN(u)})));const _=iN(u);(i||p)&&(p=e.add(ZN({layout:e.objectProperty(t.layout),legends:e.legends,mark:v,pulse:_})),h=iN(p));const x=e.add(DN({mark:v,pulse:h||_}));d=iN(x),r&&(g&&(a=e.operators,a.pop(),p&&a.pop()),e.pushState(_,h||d,y),i?function(t,e,n){const r=t.from.facet,i=r.name,o=MO(r,e);let a;r.name||s("Facet must have a name: "+wt(r)),r.data||s("Facet must reference a data set: "+wt(r)),r.field?a=e.add(IN({field:e.fieldRef(r.field),pulse:o})):r.groupby?a=e.add(BN({key:e.keyRef(r.groupby),group:iN(e.proxy(n.parent)),pulse:o})):s("Facet must specify groupby or field: "+wt(r));const u=e.fork(),l=u.add(CN()),c=u.add(XN({pulse:iN(l)}));u.addData(i,new AO(u,l,l,c)),u.addSignal("parent",null),a.params.subflow={$subflow:u.parse(t).toRuntime()}}(t,e,m):g?function(t,e,n){const r=e.add(IN({pulse:n.pulse})),i=e.fork();i.add(XN()),i.addSignal("parent",null),r.params.subflow={$subflow:i.parse(t).toRuntime()}}(t,e,m):e.parse(t),e.popState(),g&&(p&&a.push(p),a.push(x))),o&&(d=function(t,e,n){const r=t.method,i=t.bound,o=t.separation,a={separation:fN(o)?n.signalRef(o.signal):o,method:fN(r)?n.signalRef(r.signal):r,pulse:e};t.order&&(a.sort=n.compareRef({field:t.order}));if(i){const t=i.tolerance;a.boundTolerance=fN(t)?n.signalRef(t.signal):+t,a.boundScale=n.scaleRef(i.scale),a.boundOrient=i.orient}return iN(n.add(PN(a)))}(o,d,e));const b=e.add(GN({pulse:d})),w=e.add(XN({pulse:iN(b)},void 0,e.parent()));null!=t.name&&(f=t.name,e.addData(f,new AO(e,l,b,w)),t.on&&t.on.forEach((t=>{(t.insert||t.remove||t.toggle)&&s("Marks only support modify triggers."),FO(t,e,f)})))}function $O(t,e){const n=e.config.legend,r=t.encode||{},i=Pz(t,n),o=r.legend||{},a=o.name||void 0,u=o.interactive,l=o.style,c={};let f,h,d,p=0;Tz.forEach((e=>t[e]?(c[e]=t[e],p=p||t[e]):0)),p||s("Missing valid scale for legend.");const g=function(t,e){let n=t.type||Cz;t.type||1!==function(t){return Tz.reduce(((e,n)=>e+(t[n]?1:0)),0)}(t)||!t.fill&&!t.stroke||(n=Zd(e)?Fz:Kd(e)?Sz:Cz);return n!==Fz?n:Kd(e)?Sz:Fz}(t,e.scaleType(p)),m={title:null!=t.title,scales:c,type:g,vgrad:"symbol"!==g&&i.isVertical()},y=iN(e.add(CN(null,[m]))),v=iN(e.add(ON(h={type:g,scale:e.scaleRef(p),count:e.objectProperty(i("tickCount")),limit:e.property(i("symbolLimit")),values:e.objectProperty(t.values),minstep:e.property(t.tickMinStep),formatType:e.property(t.formatType),formatSpecifier:e.property(t.format)})));return g===Fz?(d=[Gz(t,p,n,r.gradient),Zz(t,n,r.labels,v)],h.count=h.count||e.signalRef(`max(2,2*floor((${pN(i.gradientLength())})/100))`)):g===Sz?d=[Vz(t,p,n,r.gradient,v),Zz(t,n,r.labels,v)]:(f=function(t,e){const n=Pz(t,e);return{align:n("gridAlign"),columns:n.entryColumns(),center:{row:!0,column:!1},padding:{row:n("rowPadding"),column:n("columnPadding")}}}(t,n),d=[Qz(t,n,r,v,pN(f.columns))],h.size=function(t,e,n){const r=pN(BO("size",t,n)),i=pN(BO("strokeWidth",t,n)),o=pN(function(t,e,n){return jz("fontSize",t)||function(t,e,n){const r=e.config.style[n];return r&&r[t]}("fontSize",e,n)}(n[1].encode,e,Mz));return dT(`max(ceil(sqrt(${r})+${i}),${o})`,e)}(t,e,d[0].marks)),d=[qz({role:"legend-entry",from:y,encode:{enter:{x:{value:0},y:{value:0}}},marks:d,layout:f,interactive:u})],m.title&&d.push(function(t,e,n,r){const i=Pz(t,e),o={enter:{opacity:Nz},update:{opacity:zz,x:{field:{group:"padding"}},y:{field:{group:"padding"}}},exit:{opacity:Nz}};return BB(o,{orient:i("titleOrient"),_anchor:i("titleAnchor"),anchor:{signal:oO},angle:{signal:aO},align:{signal:iO},baseline:{signal:sO},text:t.title,fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),baseline:i("titleBaseline")}),Yz({type:Uz,role:"legend-title",style:Az,from:r,encode:o},n)}(t,n,r.title,y)),SO(qz({role:"legend",from:y,encode:NB(TO(i,t,n),o,Bz),marks:d,aria:i("aria"),description:i("description"),zindex:i("zindex"),name:a,interactive:u,style:l}),e)}function TO(t,e,n){const r={enter:{},update:{}};return BB(r,{orient:t("orient"),offset:t("offset"),padding:t("padding"),titlePadding:t("titlePadding"),cornerRadius:t("cornerRadius"),fill:t("fillColor"),stroke:t("strokeColor"),strokeWidth:n.strokeWidth,strokeDash:n.strokeDash,x:t("legendX"),y:t("legendY"),format:e.format,formatType:e.formatType}),r}function BO(t,e,n){return e[t]?`scale("${e[t]}",datum)`:jz(t,n[0].encode)}AO.fromEntries=function(t,e){const n=e.length,r=e[n-1],i=e[n-2];let o=e[0],a=null,s=1;for(o&&"load"===o.type&&(o=e[1]),t.add(e[0]);s<n;++s)e[s].params.pulse=iN(e[s-1]),t.add(e[s]),"aggregate"===e[s].type&&(a=e[s]);return new AO(t,o,i,r,a)},AO.prototype={countsRef(t,e,n){const r=this,i=r.counts||(r.counts={}),o=EO(e);let a,s,u;return null!=o&&(t=r.scope,a=i[o]),a?n&&n.field&&DO(t,a.agg.params,n):(u={groupby:t.fieldRef(e,"key"),pulse:iN(r.output)},n&&n.field&&DO(t,u,n),s=t.add(AN(u)),a=t.add(CN({pulse:iN(s)})),a={agg:s,ref:iN(a)},null!=o&&(i[o]=a)),a.ref},tuplesRef(){return iN(this.values)},extentRef(t,e){return CO(t,this,"extent","extent",e,!1)},domainRef(t,e){return CO(t,this,"domain","values",e,!1)},valuesRef(t,e,n){return CO(t,this,"vals","values",e,n||!0)},lookupRef(t,e){return CO(t,this,"lookup","tupleindex",e,!1)},indataRef(t,e){return CO(t,this,"indata","tupleindex",e,!0,!0)}};const NO=`item.orient==="${mz}"?-90:item.orient==="${yz}"?90:0`;function zO(t,e){const n=Pz(t=pt(t)?{text:t}:t,e.config.title),r=t.encode||{},i=r.group||{},o=i.name||void 0,a=i.interactive,s=i.style,u=[],l=iN(e.add(CN(null,[{}])));return u.push(function(t,e,n,r){const i={value:0},o=t.text,a={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return BB(a,{text:o,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:e("dx"),dy:e("dy"),fill:e("color"),font:e("font"),fontSize:e("fontSize"),fontStyle:e("fontStyle"),fontWeight:e("fontWeight"),lineHeight:e("lineHeight")},{align:e("align"),angle:e("angle"),baseline:e("baseline")}),Yz({type:Uz,role:qB,style:Ez,from:r,encode:a},n)}(t,n,function(t){const e=t.encode;return e&&e.title||tt({name:t.name,interactive:t.interactive,style:t.style},e)}(t),l)),t.subtitle&&u.push(function(t,e,n,r){const i={value:0},o=t.subtitle,a={enter:{opacity:i},update:{opacity:{value:1}},exit:{opacity:i}};return BB(a,{text:o,align:{signal:"item.mark.group.align"},angle:{signal:"item.mark.group.angle"},limit:{signal:"item.mark.group.limit"},baseline:"top",dx:e("dx"),dy:e("dy"),fill:e("subtitleColor"),font:e("subtitleFont"),fontSize:e("subtitleFontSize"),fontStyle:e("subtitleFontStyle"),fontWeight:e("subtitleFontWeight"),lineHeight:e("subtitleLineHeight")},{align:e("align"),angle:e("angle"),baseline:e("baseline")}),Yz({type:Uz,role:PB,style:Dz,from:r,encode:a},n)}(t,n,r.subtitle,l)),SO(qz({role:"title",from:l,encode:OO(n,i),marks:u,aria:n("aria"),description:n("description"),zindex:n("zindex"),name:o,interactive:a,style:s}),e)}function OO(t,e){const n={enter:{},update:{}};return BB(n,{orient:t("orient"),anchor:t("anchor"),align:{signal:Wz},angle:{signal:NO},limit:t("limit"),frame:t("frame"),offset:t("offset")||0,padding:t("subtitlePadding")}),NB(n,e,Bz)}function RO(t,e){const n=[];t.transform&&t.transform.forEach((t=>{n.push(dO(t,e))})),t.on&&t.on.forEach((n=>{FO(n,e,t.name)})),e.addDataPipeline(t.name,function(t,e,n){const r=[];let i,o,a,s,u,l=null,c=!1,f=!1;t.values?fN(t.values)||hN(t.format)?(r.push(UO(e,t)),r.push(l=LO())):r.push(l=LO({$ingest:t.values,$format:t.format})):t.url?hN(t.url)||hN(t.format)?(r.push(UO(e,t)),r.push(l=LO())):r.push(l=LO({$request:t.url,$format:t.format})):t.source&&(l=i=W(t.source).map((t=>iN(e.getData(t).output))),r.push(null));for(o=0,a=n.length;o<a;++o)s=n[o],u=s.metadata,l||u.source||r.push(l=LO()),r.push(s),u.generates&&(f=!0),u.modifies&&!f&&(c=!0),u.source?l=s:u.changes&&(l=null);i&&(a=i.length-1,r[0]=YN({derive:c,pulse:a?i:i[0]}),(c||a)&&r.splice(1,0,LO()));l||r.push(LO());return r.push(XN({})),r}(t,e,n))}function LO(t){const e=CN({},t);return e.metadata={source:!0},e}function UO(t,e){return RN({url:e.url?t.property(e.url):void 0,async:e.async?t.property(e.async):void 0,values:e.values?t.property(e.values):void 0,format:t.objectProperty(e.format)})}const qO=t=>t===vz||t===gz,PO=(t,e,n)=>fN(t)?GO(t.signal,e,n):t===mz||t===gz?e:n,jO=(t,e,n)=>fN(t)?HO(t.signal,e,n):qO(t)?e:n,IO=(t,e,n)=>fN(t)?YO(t.signal,e,n):qO(t)?n:e,WO=(t,e,n)=>fN(t)?VO(t.signal,e,n):t===gz?{value:e}:{value:n},HO=(t,e,n)=>JO(`${t} === '${gz}' || ${t} === '${vz}'`,e,n),YO=(t,e,n)=>JO(`${t} !== '${gz}' && ${t} !== '${vz}'`,e,n),GO=(t,e,n)=>QO(`${t} === '${mz}' || ${t} === '${gz}'`,e,n),VO=(t,e,n)=>QO(`${t} === '${gz}'`,e,n),XO=(t,e,n)=>QO(`${t} === '${yz}'`,e,n),JO=(t,e,n)=>(e=null!=e?$B(e):e,n=null!=n?$B(n):n,ZO(e)&&ZO(n)?{signal:`${t} ? (${e=e?e.signal||wt(e.value):null}) : (${n=n?n.signal||wt(n.value):null})`}:[tt({test:t},e)].concat(n||[])),ZO=t=>null==t||1===Object.keys(t).length,QO=(t,e,n)=>({signal:`${t} ? (${tR(e)}) : (${tR(n)})`}),KO=(t,e,n,r,i)=>({signal:(null!=r?`${t} === '${mz}' ? (${tR(r)}) : `:"")+(null!=n?`${t} === '${vz}' ? (${tR(n)}) : `:"")+(null!=i?`${t} === '${yz}' ? (${tR(i)}) : `:"")+(null!=e?`${t} === '${gz}' ? (${tR(e)}) : `:"")+"(null)"}),tR=t=>fN(t)?t.signal:null==t?null:wt(t),eR=(t,e)=>{const n=t.signal;return n&&n.endsWith("(null)")?{signal:n.slice(0,-6)+e.signal}:t};function nR(t,e,n,r){let i;if(e&&rt(e,t))return e[t];if(rt(n,t))return n[t];if(t.startsWith("title")){switch(t){case"titleColor":i="fill";break;case"titleFont":case"titleFontSize":case"titleFontWeight":i=t[5].toLowerCase()+t.slice(6)}return r[Az][i]}if(t.startsWith("label")){switch(t){case"labelColor":i="fill";break;case"labelFont":case"labelFontSize":i=t[5].toLowerCase()+t.slice(6)}return r[Mz][i]}return null}function rR(t){const e={};for(const n of t)if(n)for(const t in n)e[t]=1;return Object.keys(e)}function iR(t,e){return{scale:t.scale,range:e}}function oR(t,e,n,r,i){const o=Pz(t,e),a=t.orient,s=t.gridScale,u=PO(a,1,-1),l=function(t,e){if(1===e);else if(x(t)){let n=t=tt({},t);for(;null!=n.mult;){if(!x(n.mult))return n.mult=fN(e)?{signal:`(${n.mult}) * (${e.signal})`}:n.mult*e,t;n=n.mult=tt({},n.mult)}n.mult=e}else t=fN(e)?{signal:`(${e.signal}) * (${t||0})`}:e*(t||0);return t}(t.offset,u);let c,f,h;const d={enter:c={opacity:Nz},update:h={opacity:zz},exit:f={opacity:Nz}};BB(d,{stroke:o("gridColor"),strokeCap:o("gridCap"),strokeDash:o("gridDash"),strokeDashOffset:o("gridDashOffset"),strokeOpacity:o("gridOpacity"),strokeWidth:o("gridWidth")});const p={scale:t.scale,field:kz,band:i.band,extra:i.extra,offset:i.offset,round:o("tickRound")},g=jO(a,{signal:"height"},{signal:"width"}),m=s?{scale:s,range:0,mult:u,offset:l}:{value:0,offset:l},y=s?{scale:s,range:1,mult:u,offset:l}:tt(g,{mult:u,offset:l});return c.x=h.x=jO(a,p,m),c.y=h.y=IO(a,p,m),c.x2=h.x2=IO(a,y),c.y2=h.y2=jO(a,y),f.x=jO(a,p),f.y=IO(a,p),Yz({type:Lz,role:"axis-grid",key:kz,from:r,encode:d},n)}function aR(t,e,n,r,i){return{signal:'flush(range("'+t+'"), scale("'+t+'", datum.value), '+e+","+n+","+r+","+i+")"}}function sR(t,e,n,r,i,o){const a=Pz(t,e),s=t.orient,u=t.scale,l=PO(s,-1,1),c=pN(a("labelFlush")),f=pN(a("labelFlushOffset")),h=a("labelAlign"),d=a("labelBaseline");let p,g=0===c||!!c;const m=$B(i);m.mult=l,m.offset=$B(a("labelPadding")||0),m.offset.mult=l;const y={scale:u,field:kz,band:.5,offset:Hz(o.offset,a("labelOffset"))},v=jO(s,g?aR(u,c,'"left"','"right"','"center"'):{value:"center"},((t,e,n)=>fN(t)?XO(t.signal,e,n):t===yz?{value:e}:{value:n})(s,"left","right")),_=jO(s,WO(s,"bottom","top"),g?aR(u,c,'"top"','"bottom"','"middle"'):{value:"middle"}),x=aR(u,c,`-(${f})`,f,0);g=g&&f;const b={opacity:Nz,x:jO(s,y,m),y:IO(s,y,m)},w={enter:b,update:p={opacity:zz,text:{field:bz},x:b.x,y:b.y,align:v,baseline:_},exit:{opacity:Nz,x:b.x,y:b.y}};BB(w,{dx:!h&&g?jO(s,x):null,dy:!d&&g?IO(s,x):null}),BB(w,{angle:a("labelAngle"),fill:a("labelColor"),fillOpacity:a("labelOpacity"),font:a("labelFont"),fontSize:a("labelFontSize"),fontWeight:a("labelFontWeight"),fontStyle:a("labelFontStyle"),limit:a("labelLimit"),lineHeight:a("labelLineHeight")},{align:h,baseline:d});const k=a("labelBound");let M=a("labelOverlap");return M=M||k?{separation:a("labelSeparation"),method:M,order:"datum.index",bound:k?{scale:u,orient:s,tolerance:k}:null}:void 0,p.align!==v&&(p.align=eR(p.align,v)),p.baseline!==_&&(p.baseline=eR(p.baseline,_)),Yz({type:Uz,role:"axis-label",style:Mz,key:kz,from:r,encode:w,overlap:M},n)}function uR(t,e,n,r){const i=Pz(t,e),o=t.orient,a=PO(o,-1,1);let s,u;const l={enter:s={opacity:Nz,anchor:$B(i("titleAnchor",null)),align:{signal:Wz}},update:u=tt({},s,{opacity:zz,text:$B(t.title)}),exit:{opacity:Nz}},c={signal:`lerp(range("${t.scale}"), ${Iz(0,1,.5)})`};return u.x=jO(o,c),u.y=IO(o,c),s.angle=jO(o,Nz,((t,e)=>0===e?0:fN(t)?{signal:`(${t.signal}) * ${e}`}:{value:t*e})(a,90)),s.baseline=jO(o,WO(o,vz,gz),{value:vz}),u.angle=s.angle,u.baseline=s.baseline,BB(l,{fill:i("titleColor"),fillOpacity:i("titleOpacity"),font:i("titleFont"),fontSize:i("titleFontSize"),fontStyle:i("titleFontStyle"),fontWeight:i("titleFontWeight"),limit:i("titleLimit"),lineHeight:i("titleLineHeight")},{align:i("titleAlign"),angle:i("titleAngle"),baseline:i("titleBaseline")}),function(t,e,n,r){const i=(t,e)=>null!=t?(n.update[e]=eR($B(t),n.update[e]),!1):!zB(e,r),o=i(t("titleX"),"x"),a=i(t("titleY"),"y");n.enter.auto=a===o?$B(a):jO(e,$B(a),$B(o))}(i,o,l,n),l.update.align=eR(l.update.align,s.align),l.update.angle=eR(l.update.angle,s.angle),l.update.baseline=eR(l.update.baseline,s.baseline),Yz({type:Uz,role:"axis-title",style:Az,from:r,encode:l},n)}function lR(t,e){const n=function(t,e){var n,r,i,o=e.config,a=o.style,s=o.axis,u="band"===e.scaleType(t.scale)&&o.axisBand,l=t.orient;if(fN(l)){const t=rR([o.axisX,o.axisY]),e=rR([o.axisTop,o.axisBottom,o.axisLeft,o.axisRight]);for(i of(n={},t))n[i]=jO(l,nR(i,o.axisX,s,a),nR(i,o.axisY,s,a));for(i of(r={},e))r[i]=KO(l.signal,nR(i,o.axisTop,s,a),nR(i,o.axisBottom,s,a),nR(i,o.axisLeft,s,a),nR(i,o.axisRight,s,a))}else n=l===gz||l===vz?o.axisX:o.axisY,r=o["axis"+l[0].toUpperCase()+l.slice(1)];return n||r||u?tt({},s,n,r,u):s}(t,e),r=t.encode||{},i=r.axis||{},o=i.name||void 0,a=i.interactive,s=i.style,u=Pz(t,n),l=function(t){const e=t("tickBand");let n,r,i=t("tickOffset");return e?e.signal?(n={signal:`(${e.signal}) === 'extent' ? 1 : 0.5`},r={signal:`(${e.signal}) === 'extent'`},x(i)||(i={signal:`(${e.signal}) === 'extent' ? 0 : ${i}`})):"extent"===e?(n=1,r=!0,i=0):(n=.5,r=!1):(n=t("bandPosition"),r=t("tickExtra")),{extra:r,band:n,offset:i}}(u),c={scale:t.scale,ticks:!!u("ticks"),labels:!!u("labels"),grid:!!u("grid"),domain:!!u("domain"),title:null!=t.title},f=iN(e.add(CN({},[c]))),h=iN(e.add(EN({scale:e.scaleRef(t.scale),extra:e.property(l.extra),count:e.objectProperty(t.tickCount),values:e.objectProperty(t.values),minstep:e.property(t.tickMinStep),formatType:e.property(t.formatType),formatSpecifier:e.property(t.format)}))),d=[];let p;return c.grid&&d.push(oR(t,n,r.grid,h,l)),c.ticks&&(p=u("tickSize"),d.push(function(t,e,n,r,i,o){const a=Pz(t,e),s=t.orient,u=PO(s,-1,1);let l,c,f;const h={enter:l={opacity:Nz},update:f={opacity:zz},exit:c={opacity:Nz}};BB(h,{stroke:a("tickColor"),strokeCap:a("tickCap"),strokeDash:a("tickDash"),strokeDashOffset:a("tickDashOffset"),strokeOpacity:a("tickOpacity"),strokeWidth:a("tickWidth")});const d=$B(i);d.mult=u;const p={scale:t.scale,field:kz,band:o.band,extra:o.extra,offset:o.offset,round:a("tickRound")};return f.y=l.y=jO(s,Nz,p),f.y2=l.y2=jO(s,d),c.x=jO(s,p),f.x=l.x=IO(s,Nz,p),f.x2=l.x2=IO(s,d),c.y=IO(s,p),Yz({type:Lz,role:"axis-tick",key:kz,from:r,encode:h},n)}(t,n,r.ticks,h,p,l))),c.labels&&(p=c.ticks?p:0,d.push(sR(t,n,r.labels,h,p,l))),c.domain&&d.push(function(t,e,n,r){const i=Pz(t,e),o=t.orient;let a,s;const u={enter:a={opacity:Nz},update:s={opacity:zz},exit:{opacity:Nz}};BB(u,{stroke:i("domainColor"),strokeCap:i("domainCap"),strokeDash:i("domainDash"),strokeDashOffset:i("domainDashOffset"),strokeWidth:i("domainWidth"),strokeOpacity:i("domainOpacity")});const l=iR(t,0),c=iR(t,1);return a.x=s.x=jO(o,l,Nz),a.x2=s.x2=jO(o,c),a.y=s.y=IO(o,l,Nz),a.y2=s.y2=IO(o,c),Yz({type:Lz,role:"axis-domain",from:r,encode:u},n)}(t,n,r.domain,f)),c.title&&d.push(uR(t,n,r.title,f)),SO(qz({role:"axis",from:f,encode:NB(cR(u,t),i,Bz),marks:d,aria:u("aria"),description:u("description"),zindex:u("zindex"),name:o,interactive:a,style:s}),e)}function cR(t,e){const n={enter:{},update:{}};return BB(n,{orient:t("orient"),offset:t("offset")||0,position:dN(e.position,0),titlePadding:t("titlePadding"),minExtent:t("minExtent"),maxExtent:t("maxExtent"),range:{signal:`abs(span(range("${e.scale}")))`},translate:t("translate"),format:e.format,formatType:e.formatType}),n}function fR(t,e,n){const r=W(t.signals),i=W(t.scales);return n||r.forEach((t=>tN(t,e))),W(t.projections).forEach((t=>function(t,e){const n=e.config.projection||{},r={};for(const n in t)"name"!==n&&(r[n]=pz(t[n],n,e));for(const t in n)null==r[t]&&(r[t]=pz(n[t],t,e));e.addProjection(t.name,r)}(t,e))),i.forEach((t=>function(t,e){const n=t.type||"linear";Xd(n)||s("Unrecognized scale type: "+wt(n)),e.addScale(t.name,{type:n,domain:void 0})}(t,e))),W(t.data).forEach((t=>RO(t,e))),i.forEach((t=>ez(t,e))),(n||r).forEach((t=>function(t,e){const n=e.getSignal(t.name);let r=t.update;t.init&&(r?s("Signals can not include both init and update expressions."):(r=t.init,n.initonly=!0)),r&&(r=dT(r,e),n.update=r.$expr,n.params=r.$params),t.on&&t.on.forEach((t=>wN(t,e,n.id)))}(t,e))),W(t.axes).forEach((t=>lR(t,e))),W(t.marks).forEach((t=>SO(t,e))),W(t.legends).forEach((t=>$O(t,e))),t.title&&zO(t.title,e),e.parseLambdas(),e}function hR(t,e){const n=e.config,r=iN(e.root=e.add(rN())),i=function(t,e){const n=n=>dN(t[n],e[n]),r=[dR("background",n("background")),dR("autosize",CB(n("autosize"))),dR("padding",SB(n("padding"))),dR("width",n("width")||0),dR("height",n("height")||0)],i=r.reduce(((t,e)=>(t[e.name]=e,t)),{}),o={};return W(t.signals).forEach((t=>{rt(i,t.name)?t=tt(i[t.name],t):r.push(t),o[t.name]=t})),W(e.signals).forEach((t=>{rt(o,t.name)||rt(i,t.name)||r.push(t)})),r}(t,n);i.forEach((t=>tN(t,e))),e.description=t.description||n.description,e.eventConfig=n.events,e.legends=e.objectProperty(n.legend&&n.legend.layout),e.locale=n.locale;const o=e.add(CN()),a=e.add($N(XB((t=>NB({enter:{x:{value:0},y:{value:0}},update:{width:{signal:"width"},height:{signal:"height"}}},t))(t.encode),Oz,RB,t.style,e,{pulse:iN(o)}))),s=e.add(ZN({layout:e.objectProperty(t.layout),legends:e.legends,autosize:e.signalRef("autosize"),mark:r,pulse:iN(a)}));e.operators.pop(),e.pushState(iN(a),iN(s),null),fR(t,e,i),e.operators.push(s);let u=e.add(DN({mark:r,pulse:iN(s)}));return u=e.add(GN({pulse:iN(u)})),u=e.add(XN({pulse:iN(u)})),e.addData("root",new AO(e,o,o,u)),e}function dR(t,e){return e&&e.signal?{name:t,update:e.signal}:{name:t,value:e}}function pR(t,e){this.config=t||{},this.options=e||{},this.bindings=[],this.field={},this.signals={},this.lambdas={},this.scales={},this.events={},this.data={},this.streams=[],this.updates=[],this.operators=[],this.eventConfig=null,this.locale=null,this._id=0,this._subid=0,this._nextsub=[0],this._parent=[],this._encode=[],this._lookup=[],this._markpath=[]}function gR(t){this.config=t.config,this.options=t.options,this.legends=t.legends,this.field=Object.create(t.field),this.signals=Object.create(t.signals),this.lambdas=Object.create(t.lambdas),this.scales=Object.create(t.scales),this.events=Object.create(t.events),this.data=Object.create(t.data),this.streams=[],this.updates=[],this.operators=[],this._id=0,this._subid=++t._nextsub[0],this._nextsub=t._nextsub,this._parent=t._parent.slice(),this._encode=t._encode.slice(),this._lookup=t._lookup.slice(),this._markpath=t._markpath}function mR(t){return(_(t)?yR:vR)(t)}function yR(t){const e=t.length;let n="[";for(let r=0;r<e;++r){const e=t[r];n+=(r>0?",":"")+(x(e)?e.signal||mR(e):wt(e))}return n+"]"}function vR(t){let e,n,r="{",i=0;for(e in t)n=t[e],r+=(++i>1?",":"")+wt(e)+":"+(x(n)?n.signal||mR(n):wt(n));return r+"}"}pR.prototype=gR.prototype={parse(t){return fR(t,this)},fork(){return new gR(this)},isSubscope(){return this._subid>0},toRuntime(){return this.finish(),{description:this.description,operators:this.operators,streams:this.streams,updates:this.updates,bindings:this.bindings,eventConfig:this.eventConfig,locale:this.locale}},id(){return(this._subid?this._subid+":":0)+this._id++},add(t){return this.operators.push(t),t.id=this.id(),t.refs&&(t.refs.forEach((e=>{e.$ref=t.id})),t.refs=null),t},proxy(t){const e=t instanceof eN?iN(t):t;return this.add(HN({value:e}))},addStream(t){return this.streams.push(t),t.id=this.id(),t},addUpdate(t){return this.updates.push(t),t},finish(){let t,e;for(t in this.root&&(this.root.root=!0),this.signals)this.signals[t].signal=t;for(t in this.scales)this.scales[t].scale=t;function n(t,e,n){let r,i;t&&(r=t.data||(t.data={}),i=r[e]||(r[e]=[]),i.push(n))}for(t in this.data){e=this.data[t],n(e.input,t,"input"),n(e.output,t,"output"),n(e.values,t,"values");for(const r in e.index)n(e.index[r],t,"index:"+r)}return this},pushState(t,e,n){this._encode.push(iN(this.add(XN({pulse:t})))),this._parent.push(e),this._lookup.push(n?iN(this.proxy(n)):null),this._markpath.push(-1)},popState(){this._encode.pop(),this._parent.pop(),this._lookup.pop(),this._markpath.pop()},parent(){return A(this._parent)},encode(){return A(this._encode)},lookup(){return A(this._lookup)},markpath(){const t=this._markpath;return++t[t.length-1]},fieldRef(t,e){if(pt(t))return oN(t,e);t.signal||s("Unsupported field reference: "+wt(t));const n=t.signal;let r=this.field[n];if(!r){const t={name:this.signalRef(n)};e&&(t.as=e),this.field[n]=r=iN(this.add(NN(t)))}return r},compareRef(t){let e=!1;const n=t=>fN(t)?(e=!0,this.signalRef(t.signal)):function(t){return t&&t.expr}(t)?(e=!0,this.exprRef(t.expr)):t,r=W(t.field).map(n),i=W(t.order).map(n);return e?iN(this.add(FN({fields:r,orders:i}))):sN(r,i)},keyRef(t,e){let n=!1;const r=this.signals;return t=W(t).map((t=>fN(t)?(n=!0,iN(r[t.signal])):t)),n?iN(this.add(zN({fields:t,flat:e}))):function(t,e){const n={$key:t};return e&&(n.$flat=!0),n}(t,e)},sortRef(t){if(!t)return t;const e=uN(t.op,t.field),n=t.order||"ascending";return n.signal?iN(this.add(FN({fields:e,orders:this.signalRef(n.signal)}))):sN(e,n)},event(t,e){const n=t+":"+e;if(!this.events[n]){const r=this.id();this.streams.push({id:r,source:t,type:e}),this.events[n]=r}return this.events[n]},hasOwnSignal(t){return rt(this.signals,t)},addSignal(t,e){this.hasOwnSignal(t)&&s("Duplicate signal name: "+wt(t));const n=e instanceof eN?e:this.add(rN(e));return this.signals[t]=n},getSignal(t){return this.signals[t]||s("Unrecognized signal name: "+wt(t)),this.signals[t]},signalRef(t){return this.signals[t]?iN(this.signals[t]):(rt(this.lambdas,t)||(this.lambdas[t]=this.add(rN(null))),iN(this.lambdas[t]))},parseLambdas(){const t=Object.keys(this.lambdas);for(let e=0,n=t.length;e<n;++e){const n=t[e],r=dT(n,this),i=this.lambdas[n];i.params=r.$params,i.update=r.$expr}},property(t){return t&&t.signal?this.signalRef(t.signal):t},objectProperty(t){return t&&x(t)?this.signalRef(t.signal||mR(t)):t},exprRef(t,e){const n={expr:dT(t,this)};return e&&(n.expr.$name=e),iN(this.add(TN(n)))},addBinding(t,e){this.bindings||s("Nested signals do not support binding: "+wt(t)),this.bindings.push(tt({signal:t},e))},addScaleProj(t,e){rt(this.scales,t)&&s("Duplicate scale or projection name: "+wt(t)),this.scales[t]=this.add(e)},addScale(t,e){this.addScaleProj(t,VN(e))},addProjection(t,e){this.addScaleProj(t,WN(e))},getScale(t){return this.scales[t]||s("Unrecognized scale name: "+wt(t)),this.scales[t]},scaleRef(t){return iN(this.getScale(t))},scaleType(t){return this.getScale(t).params.type},projectionRef(t){return this.scaleRef(t)},projectionType(t){return this.scaleType(t)},addData(t,e){return rt(this.data,t)&&s("Duplicate data set name: "+wt(t)),this.data[t]=e},getData(t){return this.data[t]||s("Undefined data set name: "+wt(t)),this.data[t]},addDataPipeline(t,e){return rt(this.data,t)&&s("Duplicate data set name: "+wt(t)),this.addData(t,AO.fromEntries(this,e))}},tt(Ua,ol,Ox,db,rE,eD,qC,vC,HC,MF,LF,GF);t.Bounds=Bg,t.CanvasHandler=gv,t.CanvasRenderer=wv,t.DATE=Rn,t.DAY=Ln,t.DAYOFYEAR=Un,t.Dataflow=Oa,t.Debug=4,t.DisallowedObjectProperties=m,t.Error=1,t.EventStream=ba,t.Gradient=Lp,t.GroupItem=zg,t.HOURS=qn,t.Handler=Yy,t.HybridHandler=f_,t.HybridRenderer=c_,t.Info=3,t.Item=Ng,t.MILLISECONDS=In,t.MINUTES=Pn,t.MONTH=zn,t.Marks=Sy,t.MultiPulse=$a,t.None=0,t.Operator=va,t.Parameters=ga,t.Pulse=Da,t.QUARTER=Nn,t.RenderType=g_,t.Renderer=Vy,t.ResourceLoader=Og,t.SECONDS=jn,t.SVGHandler=Mv,t.SVGRenderer=Xv,t.SVGStringRenderer=u_,t.Scenegraph=Ly,t.TIME_UNITS=Wn,t.Transform=La,t.View=dB,t.WEEK=On,t.Warn=2,t.YEAR=Bn,t.accessor=e,t.accessorFields=r,t.accessorName=n,t.array=W,t.ascending=V,t.bandwidthNRD=Ha,t.bin=Ya,t.bootstrapCI=Ga,t.boundClip=k_,t.boundContext=rm,t.boundItem=$y,t.boundMark=By,t.boundStroke=Ug,t.changeset=da,t.clampRange=H,t.codegenExpression=d$,t.compare=G,t.constant=Q,t.cumulativeLogNormal=as,t.cumulativeNormal=ts,t.cumulativeUniform=hs,t.dayofyear=Zn,t.debounce=K,t.defaultLocale=Fo,t.definition=qa,t.densityLogNormal=os,t.densityNormal=Ka,t.densityUniform=fs,t.domChild=jy,t.domClear=Iy,t.domCreate=qy,t.domFind=Py,t.dotbin=Va,t.error=s,t.expressionFunction=hT,t.extend=tt,t.extent=et,t.extentIndex=nt,t.falsy=g,t.fastmap=ot,t.field=l,t.flush=at,t.font=wy,t.fontFamily=by,t.fontSize=my,t.format=Xo,t.formatLocale=bo,t.formats=Jo,t.hasOwnProperty=rt,t.id=c,t.identity=f,t.inferType=jo,t.inferTypes=Io,t.ingest=sa,t.inherits=st,t.inrange=ut,t.interpolate=up,t.interpolateColors=op,t.interpolateRange=ip,t.intersect=v_,t.intersectBoxLine=pm,t.intersectPath=cm,t.intersectPoint=fm,t.intersectRule=dm,t.isArray=_,t.isBoolean=lt,t.isDate=ct,t.isFunction=Y,t.isIterable=ft,t.isNumber=ht,t.isObject=x,t.isRegExp=dt,t.isString=pt,t.isTuple=ia,t.key=gt,t.lerp=mt,t.lineHeight=yy,t.loader=Ko,t.locale=Co,t.logger=v,t.lruCache=yt,t.markup=Pv,t.merge=vt,t.mergeConfig=w,t.multiLineOffset=_y,t.one=d,t.pad=xt,t.panLinear=B,t.panLog=N,t.panPow=z,t.panSymlog=O,t.parse=function(t,e,n){return x(t)||s("Input Vega specification must be an object."),hR(t,new pR(e=w(function(){const t="sans-serif",e="#4c78a8",n="#000",r="#888",i="#ddd";return{description:"Vega visualization",padding:0,autosize:"pad",background:null,events:{defaults:{allow:["wheel"]}},group:null,mark:null,arc:{fill:e},area:{fill:e},image:null,line:{stroke:e,strokeWidth:2},path:{stroke:e},rect:{fill:e},rule:{stroke:n},shape:{stroke:e},symbol:{fill:e,size:64},text:{fill:n,font:t,fontSize:11},trail:{fill:e,size:2},style:{"guide-label":{fill:n,font:t,fontSize:10},"guide-title":{fill:n,font:t,fontSize:11,fontWeight:"bold"},"group-title":{fill:n,font:t,fontSize:13,fontWeight:"bold"},"group-subtitle":{fill:n,font:t,fontSize:12},point:{size:30,strokeWidth:2,shape:"circle"},circle:{size:30,strokeWidth:2},square:{size:30,strokeWidth:2,shape:"square"},cell:{fill:"transparent",stroke:i},view:{fill:"transparent"}},title:{orient:"top",anchor:"middle",offset:4,subtitlePadding:3},axis:{minExtent:0,maxExtent:200,bandPosition:.5,domain:!0,domainWidth:1,domainColor:r,grid:!1,gridWidth:1,gridColor:i,labels:!0,labelAngle:0,labelLimit:180,labelOffset:0,labelPadding:2,ticks:!0,tickColor:r,tickOffset:0,tickRound:!0,tickSize:5,tickWidth:1,titlePadding:4},axisBand:{tickOffset:-.5},projection:{type:"mercator"},legend:{orient:"right",padding:0,gridAlign:"each",columnPadding:10,rowPadding:2,symbolDirection:"vertical",gradientDirection:"vertical",gradientLength:200,gradientThickness:16,gradientStrokeColor:i,gradientStrokeWidth:0,gradientLabelOffset:2,labelAlign:"left",labelBaseline:"middle",labelLimit:160,labelOffset:4,labelOverlap:!0,symbolLimit:30,symbolType:"circle",symbolSize:100,symbolOffset:0,symbolStrokeWidth:1.5,symbolBaseFillColor:"transparent",symbolBaseStrokeColor:r,titleLimit:180,titleOrient:"top",titlePadding:5,layout:{offset:18,direction:"horizontal",left:{direction:"vertical"},right:{direction:"vertical"}}},range:{category:{scheme:"tableau10"},ordinal:{scheme:"blues"},heatmap:{scheme:"yellowgreenblue"},ramp:{scheme:"blues"},diverging:{scheme:"blueorange",extent:[1,0]},symbol:["circle","square","triangle-up","cross","diamond","triangle-right","triangle-down","triangle-left"]}}}(),e,t.config),n)).toRuntime()},t.parseExpression=c$,t.parseSelector=MB,t.path=Al,t.pathCurves=qp,t.pathEqual=A_,t.pathParse=Yp,t.pathRectangle=mg,t.pathRender=rg,t.pathSymbols=sg,t.pathTrail=yg,t.peek=A,t.point=Hy,t.projection=AA,t.quantileLogNormal=ss,t.quantileNormal=es,t.quantileUniform=ds,t.quantiles=Ia,t.quantizeInterpolator=ap,t.quarter=j,t.quartiles=Wa,t.randomInteger=function(e,n){let r,i,o;null==n&&(n=e,e=0);const a={min(t){return arguments.length?(r=t||0,o=i-r,a):r},max(t){return arguments.length?(i=t||0,o=i-r,a):i},sample:()=>r+Math.floor(o*t.random()),pdf:t=>t===Math.floor(t)&&t>=r&&t<i?1/o:0,cdf(t){const e=Math.floor(t);return e<r?0:e>=i?1:(e-r+1)/o},icdf:t=>t>=0&&t<=1?r-1+Math.floor(t*o):NaN};return a.min(e).max(n)},t.randomKDE=rs,t.randomLCG=function(t){return function(){return(t=(1103515245*t+12345)%2147483647)/2147483647}},t.randomLogNormal=us,t.randomMixture=ls,t.randomNormal=ns,t.randomUniform=ps,t.read=Qo,t.regressionConstant=gs,t.regressionExp=ws,t.regressionLinear=xs,t.regressionLoess=Ds,t.regressionLog=bs,t.regressionPoly=As,t.regressionPow=ks,t.regressionQuad=Ms,t.renderModule=y_,t.repeat=_t,t.resetDefaultLocale=function(){return _o(),Mo(),Fo()},t.resetSVGDefIds=function(){$g=1,Bp=0},t.responseType=Zo,t.runtimeContext=wT,t.sampleCurve=$s,t.sampleLogNormal=is,t.sampleNormal=Qa,t.sampleUniform=cs,t.scale=Vd,t.sceneEqual=M_,t.sceneFromJSON=Oy,t.scenePickVisit=Am,t.sceneToJSON=zy,t.sceneVisit=Mm,t.sceneZOrder=km,t.scheme=hp,t.serializeXML=jv,t.setHybridRendererOptions=function(t){l_.svgMarkTypes=t.svgMarkTypes??["text"],l_.svgOnTop=t.svgOnTop??!0,l_.debug=t.debug??!1},t.setRandom=function(e){t.random=e},t.span=bt,t.splitAccessPath=u,t.stringValue=wt,t.textMetrics=cy,t.timeBin=Pr,t.timeFloor=dr,t.timeFormatLocale=Eo,t.timeInterval=_r,t.timeOffset=wr,t.timeSequence=Ar,t.timeUnitSpecifier=Vn,t.timeUnits=Yn,t.toBoolean=kt,t.toDate=At,t.toNumber=E,t.toSet=Dt,t.toString=Et,t.transform=Pa,t.transforms=Ua,t.truncate=Ct,t.truthy=p,t.tupleid=oa,t.typeParsers=Uo,t.utcFloor=mr,t.utcInterval=xr,t.utcOffset=kr,t.utcSequence=Er,t.utcdayofyear=rr,t.utcquarter=I,t.utcweek=ir,t.version="6.2.0",t.visitArray=Ft,t.week=Qn,t.writeConfig=k,t.zero=h,t.zoomLinear=L,t.zoomLog=U,t.zoomPow=q,t.zoomSymlog=P}));

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
  return typeof obj === 'string' || toString.call(obj) === '[object String]';
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
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("N4KABGBECGCuAuB7AzgSwF4FNIC4oDtF9sAacKAB2gBNrV8BzXMAFjIkgCdM0tn5OsTOygB3VNXgALZgGYADPJGQpmVAynxmAJkXKAxkQBm65qAgdonfWfIWoJgDaPmkAMSL5kO2AC+Iy25oW3sOJxc8d1lomIAjAFZve38fSEd6bDxzUMhkAUQAa0yoNxi4xJ8U+0gqaRCcvM5C4qiy2QSkiyqLXKloCmLs6sbm11K2jsqAqGQATwBbWMQIsCGe8LG29sTpjl5ilnkp1OgAD1RkeurqRHnoemYjaEdkYR8OBk4JAGFlxE4xtR4kCgZBdlB4Kh4I5ML9HP9NtEwe8oI5oLFMI4APIAN0wnDRFFcVC+8FmyNCqPRmLhCMi41kFJynwkAHUJHU8ABGcFpamOABiRHgAGUMIMUXt1Phnq4AILnZBC-Ci8WdZK8tEYxwABRodEYzDYKMgkP0BVpAPpWw6vLNBTFfDw8QAdAA2ADsdqhMOVqqdq0lM2lssiCouABUfZgAPp+9Vdb3QzB+1lqDRaSJLRzUfEJ7ocSHJq7rYWOiWUqUMGUrSBR5Nx4UJiAFnqGeFWkoxJnVIzCtPqTSubO5gG85CwWJFmGWsYe+f56ZpTAMTD4agljhazEAIWgr3SxFc8wk1BhPZ628FZbVWSDuRDtYAMiu19RGyrm35ee3YPN8Jcd6VsG1ahlAL6ruuMZwpcKKthwhicMQnAAEo0KgsCAWA8S8lQtD0Ewzq8ogRhGK8maBsBD6gbWAC0EFvjGAAS6ZDnB44LNm5bMFyiiVOQ3TUTWWEANo+GsHAyvMLQABoxuGly8jizxCK4FxouuF4cLE9AbkBlaQPQFAIK4B6YPoWjghwmKYNJn70nJCm0fo+j4PMWk9IgFCQkQolBnsAz6KgPAedU6nQJpVk9DpzgxjCjDSDG8zuVF2moLFubeVISUpf5DjpBQAycHFa4MIlyWhdFiDULMSX7sgMZMKlMyYKclUcLMmBWO1UAAHJEKQeWQCKf49ZAvywJ+QYALpwcc9gSQQ0DSa4ACa8mKh5kDKY4qmRP1R68jpmn6ZShn4MZFG5DZFmVZANl2VdbjrU5LluXdXk+QBzBicBAXmcFilDeFkVDTFjglQl2UVc1kDgzGmXlblf35aghX4pDZXQ8jf1w9VtV3MgDVNUNrxtbDnXdbDB2DSjw2jbDE1TcBs2Ur480WItkBSS05Yxju5JKSpLQ01tx16ZRBlGSZkRmbdUX3TCj1jHzAvOa5ONnZ9qC+T9pOBYDY0gxusPw-FWM5WN8OI9jY1GAVRWY0jVv43VRONWNZNjZTY5DaLM1zRq4kmjzrgCtA+iYPA0HLA1AtbTte0teTJri5uPTS1dcuWfeD1rk94eR9HMH87M6vvQr2u63gv248gBshbDxtW+lEM25bsP22jjvm87puu4TxOe613tdb7dP+yzgeJsHZ2h5EhdRzGKGIKIceCyaictPXAON6nunpxwmemTdOdUXn9klIv0cr2vpfl5rORV99Nf67vQN083putwjmBZR3Q0u7o2Kr3W2-capuyHrDL2FMx5jUnpWVmoR2ZBwWiHZaLRLSlwTsLVwosjoH1OjkY+stT53Qvk9LBas3qP2qM-PydMd5BT3p-ZAGkTZgx-qAgBdNrZ-z7oAh2GNuEwzBgPeqHtoEj1gVTP2A0vwQCQckDmEAubzygFiKgQUyTYKFrtEW8iCEnUlmdEhLUYTy1zkrfOYxNERyhLVahGsPreR1i-MAtcqIIMpEoroKiTE9HUcNf48A5Lxz0UnSA+D97GMWkfC6MtzHmTPgZChKsQlhLLjQlxX0GF1wbh-XGX9OGxREbQnIfD-6iLpkAnupUBG8PEe7EmjDpFDR9vA+RAc2b+LURg1wIp8hFF0ZvXB+1DExIlnEqAZjroWJSWdNJ9JBlNGGU4iu956F60YQUo2bCIocN4Vw+pYCSlt34acmpQiQEnJ4bjJYEDB6SNJm0umHTqZdKnj01BnN0ErUiCs5o0FoDwBXP8Q2ESDFHl6X83mfQBg4P0a4IK1hzxGKmfeWZ2dyHWMvu4EU8LMAPxyW4vJVEUX6DRaTAAjrAKwtNcb6CaETMadBlpEEObjAQqAIoMBhLRWARJYbct5fym4oh8BjRFYwflXwMxSq+KKolMIjALIMiMIoY0rBNFEGNUQmBqCrgVTymV2BunIJhXPfpC90qguKliBAcYmjlO2mMvqEyzppyIWFBJWcyEKyWVfW1GMHXRwFM64lldXHVw8W-ZhhSqLFKORlC5dyqK1OEbc6p9ymlQJeSnN5cCPnQq+Ran5qjYUDL-CMs6W88EeoqYQgJPrLon3mTi2yNjlnVvWeUjgWzX47Pfns9hLdSlZr7dFH+7ds3puuU7S5ObHkSJaXXV5uN3lyJLYg6eLZph9P+VAT4-RsrTgZdUOtkRFyzxyEEhS9YYQfjVRwS9YAuTaHRYfKAgb3D3ujE+yNmLfWuFBacLQu7vw3uqEEgA4l8d8aE6CYURUnHkkyv2K07XitwcGJDL3QphQDibgORFA+B75M80FWsPZAAAIiCkFswBgxhkihlocoECIDFk26Z51W2kPbQG3FT16PwEY8xmSRGDIDtjXTDjSB4F-nxKgfQspGYgrBV8VTLhYaibNaW5R5bm1LRo6J8TsZVpsflJx7jsSgP8aSZY8+wmxhmbJMx1aUmtbRvcZ4gy8muPUyU1ptTQ1vgaYYOC7TY09MKLAL4lslrb3WqgG5pjsZZyQuswpz93qM4kcc8+noP63BpeY5aLzT8fNkv8zZoL0kQs6bCxFqLoW6axfNYZyjvzqMtD3JwCg8Jo5WbwE8F4bxPU8fs4kyA+hVDmiWAW1JLn6T9cG4geAxKIOtgPS0AAqvgVAfZODzBjKtJ8qAXWvrG68XLxn4kOdm-Ngoi2O3K3pAdo7-xTvncu1tije6oOBJS5AT7x3TsyQu1dt1AghB3d47Mub5kXuICW4slbJQwffZY1D-7ZbusVt664XD74RRaIIiNsAsOJuNrs8Rx7SOFuo7e12koJOYxk-sYwPHXXAdUeSzRxyip5Kmsp7RAAnEodDeXrIY-cELi4Iu+VEuyQrWZnBeXnpyCeSVeBaJcgABxS6oncNq3IjcKzyH-I08Rtv7srZEF6wu5Si6y3gY3tOMXOaw09J3iuXfK8qy2mbGvGBa+qDr5g+uLf3lNzxGPVErdEjwCwW3APIP8+gyDgAshFOlENMujKRaN54t3pf3ZmQVp7yPXtCZ92MXP+B88xw7DzvxRnduuGz-QFvCI3dQFs175b9f6Td-wL3zgQf8uPbI1+FBBPjPcxz2cCflPICD4wyV3PpwJ9T4ezN2fdugeSRB+tPbwCYxQ7XxvmX365fPRjOfx2uPVfTauof9PO2HdQHWk+VeGMr9+9194crER8Shf9-9ioX9nE1cq8P98c+cesBdZJH8L9ACi9Ikb8K9MN3sSg5In8AC-tX96cD9WpyMECM8kCs9BdL9IDL9Ltr8QDvdcD5daD9UoCiCYC38QMyC58ktqCWgAApKEO1fDJDBNHoV9LkF0bQHCcvXjErYQ+AUQxDDCZAPfSvGfXgo-TPYHGjAANR1kPBjDsW0Q3lrTdXkBdC5DkMmzp2HxYLcEMOWB71MIcQ0L4xD01zukj3dwVjj25Et1BWTzACsPkDTwoK-yJ0iHZzcLJEpzQzsKH3RzAPcFiPJzJA8PV28P8IeD8NjzOB4iCOt3d2sJ0KoL0MwRVA52jjiPMJyFfSsIN1sM9033v2+GqMGRMIyKyS4JIKulDyNVyN11CP8MKMCPvCT2YDCIiN50oMJ2QNcF+BVEQFgHtR6MpysPiBaOqC9WwJK2WKQDWO6PsUyOIKlir0GPDx6F8NGIKLNzfWKJCJmPKIWIENcHo2QGyjqM2JdB2KnXsJSMcM+O+J6KyMuJyNjzyLuJN3GMeMmOCOmJdHCNeMXyCR3FR3W1qI2P7ysONCSLaNSLcAxNOCxJOLMPBMeyuJ8OhI9zOgCPhMT0RNKJRM-3t2iKgEBWGXZEkBkFxPdCYIcNZ3xSGVjB5OkEpK8LDxpJGLpO1zhINyeKRPkC5FRM70iCjHNCZiK1dWL2wkFKBOFLcE1ItFWJVElPf20LZOPxMxaAfVjHjH7y5HxNaNvxwKNPtIA3ONMTgKtMiPZMWMiAYigkdIwOKF4gNJyBK2DPfD9AtJ4LAz4I72-0gBjJbwkJfTdTdEjOqGjNfCghgnjNIz9LmKiMDKgAUj9G4idLlLSkBKjPv0rJvCwCLIhBLPbwX3VNS33GyhYkHB1KkJzOK3vxBOYlYk229OIV9MTLVJTIAEkVR8QI5IQ8QYxKcbsaddipt+jkVnta9QDHCFy7VlzUBVy29EtkyOS6MeyxC1DNihzZciTRzVDCNJzg8BjISTdaSxiHiIyESSi31ZyrzRzxS+SwykTZCHy78nybzQLWyuBPyDJbjaybi4T-jhhmTQjkTVTrTdCT8aMlDRD1zS9NyATkipyGc9zmc69HDCKMZzy-B+DKjXAowKAGpiLxsoLPCrpGcUc0cGyiTWKGoGL59EC3jmLIgUIVxuAiY3E1z+8NyuLEcqL+Lcz78pLPgeA0AiAYwRKmL8KWgLt8ACgOKy8CS3TlKa9qKDyjSjKCg9LLzyzUz6ACgBRgocxGD5DuDizEyaLbKXK3LMRqAHLOyUy7K9sUInxPLzLsDZlZ8-LsNwrIqQqxK0SQc7KIx7gmsLC9TgCvKdyfKitHzHCMqsqUr5i0qaNQ10h8R2KFKSKlKq9eL9zmCjTqrgpOBhLskgKnKSc6rwKS9OL8qLjKKrLVLhyiS+ryqyz3jIgQSeB5KBqwBFLhqfTRqmdxriqjT5qurnEerZqoBc8KAWN1pwtht+9qd9LbTXAdREB6B4B+qcqk5qdGr1q+KWdsNbr7rdr3p9qJKoASSyTKcXrVqKKZtmrrLWrsNAahtdLurcKKiDKBkxMHrFqnrigVqYqEcmqVKPqnpBkQUfr3I-qkbIhDjVjOq0aGi3VMbXTYqcaxq8axhya1iiakzQqrz2wYxVAaAMY+wVR9gEiWArql8aNt8YwvrPwayUK4ZtyhTsNxbJaJy+iRqpShioTZSfyjQ9B-yQicL-SbTRaWgx8Ja7qpalq-ysabKFae8lb4LqThjpitbuQdamSAKrD9bSyAyDrIA9xzRPgzT3xC90axgBQw6sCFD78-aCgA7Jog6-hJ83zp9SCZyEbxLSaoAFzKVYBcwTD8BHB6iL03VIAoAuKSss7dpc6sR87eiNkCq2zU6Da8LrqAUx45sa1qbcrokrb665lkkmblk27spe0SUY0-MzomEIVgZ9lQZk0IYykx1zkqlJ0wh50F7wECYV1h5NqehN0J5Pkd007Kq7T8RodcraII7ranoIxT74L4CvbDagk3LHBRC5yjA18L6y779n7X6jA772yLyOanKnBRDI8gD9dPBPBL6oanoQGMYdd-7G6H7m6jbXA4Hio48gDeJIGvAv6iT0G6pThEHyDkHEaW6oAf6MYBYYx9DcEgDu66bsbHtsUEqC5g1ipqHaH9EPCZNx6Ghdkm4Z7OUqIzYJ1F7f5l67Y16xGN7IFnlWkd6Ooi0t19ND6m6yHUGbUX6MY5R8Ivo2tO7IkGGtz6z3y21+7WHQ72H5I9G3FngeHqttl8lh1BHR1v4U1JHO5pGoY00DIHlN7mlt7R5ZF97t0fESbyHIBnDjDgbBBSK6zyKzHIgIad73TsNome9prvb-rUzEAGA5JTL4moA9imHwbcbLH6Q-98m4a9qj6uzcmGB1pCnXqynGaKmSgqn1osnH6Qc9QYRlDrjdTIlc8GA7hoHVa-VBMr6xg+mo5QUHHcknGqJaIVmRRMBaV84eVHAVnP6hoIw1ilgxpvhTyJALgxpDD4MznYYRmxnYYdQ0RkBbmhoFyjB8RCAxo0J6AlhdU7mHmnm6Ydx9EMycgxRiBvmPmDVgXqgsQrioWehAWhAYXEKqIdwdV8AEXMA4NMA1wxodQ1jBtMXuAcW7mXLVpMR4RRAsXiWho8WBsYQkXpTYYpLqAMWIXqAsXC6DJmWyXnBV5WWmWDUeWKWqXJVYZqArAXskUxWJXIsPLpXOAChuBhGDJ0gMxNLZglWxpVXNB5hYAX7UBPZAoBADHE8MhwXYYdmzrNMVN7GVmxpVNQVItOBZhdB7WWtnXeIpV0QYQ4BPXhVvWupYBXXYYI5I5za6YqArdHAuQxpI3QVHBtBY37hNX5WChE3OsOzUr6mCVV4Yx7TgWhnihLrHKfapK8ROqMsE7Ym4dQakmoAUmB6Sgy3arK3W94b1H07Inm2K2WNmna3k6eLynpn6Ru3XgWNumUGglR2LM+2e6Jndy2nh2m3MBy2x3PN23SHO3NHKAzaHrq3MARap2V2W2Oc1R6qhq521rWmNrG33Bp3T2WyN3M2Kr6m6iqai69SrDZA8HHC337bkXtdvz7iijdblTZjn2Zqcnb4xzebipQKEjXbGGl273c2WJYOYw4Kk798PzGWNanbgO8BdAUK9hMLwPAGs2UzPS+z5V+9Dgf2PT-1qPNB-3cOvzNaCOwAiOlTnQInt3Uz8z3wmOBy3UE8kOYGxg0yhOWP1a2P8PYSHiuPQOeO6mUzFbYahPKdDgZaSnkO3A1ONsxz+zpPriOBbj4hiOoAGSFBEOJ7SOjgVOrz7mNsqPxzNjD2QcFcGoNOnTIL+2trsNPPDOMxjOZS5OkK4TFO3aQiyPGKS2cmZInPo49R8JDRaP6OAvEuJb9QCIQvHb8j5PtbuPAKHOnLVpMvkuDRV0P2k4XSTHEmJrHCyvYaKucusPNC1aTPLOgOCvCObOGhMLPaIPsmM7IByvsvUulrauyLCTHCxuUuGBcu8P8vwuHi6OlPiuO3j6u8V9Mv4P+8jdtO5bDSFadvYbMOVar2cOZOkLoTzPnawBrOLPcg7PeOp3UPXOnS7u-PoLHDoOpO2vuKEySGhuemxaV9r4C3X1IuxP5anpxaIfiH2aKOrymILgkBj1TtZ2YfLuF2b32n3BUe8g8mNdTsJ2NGglCf0eSf+Z6AGpqylrdB0unpKfifloaeAIH2VcLuwbLSkGQfJ2QcMnx89ulqmimexgheMOOQpBFvZPlv6S4TEj1VMKPbXuQcWeMf8MfJfjfPL2BLHCNfqe0IfJEe1eaNKeOcHWVCQUdYtpBVxXQU1IjAAAKQ3tnkgN307Y3nWEgeQAASmvQF5ozhD-GF+l7t4oAd5aCO2d+d-EF5Noj+66lHCl95L94AHp2wGpDBJp4AAA+fT6OUCkgQv1P6QEgOP6XxP979D0CjPrPmMHPlUAP9zmjXb8P3ke3jTJY5YUPsvmXhL5r8bhgAAKnTbi5G7uE4AYB7ykHQAj6j+PDOGd6UEr4T5D--H75H4b6b82yT9r+l4z+0Bb4n8icy+85NC78d8iBj51Wz7NPz55CT6M6a4M5a8YBIFN2d9L6k9f6S+H5IC6A-eJ-IBj7R1Tc0dSV-FoOf3HIABqP-ll3m6B9yeIOGEJBHfDKRFUsQR9KoH7IL9u+N-F3gAEIviubPIBHCKDvhj0FAKQMgAABkdAkgVIFzaLZGoGuGgfQMYGkDRA3NdAKwOoG0CGBTA3NiyCoHsDBBXA5gTwKkBo82BJ6IQdwJjDIAreGMAQSQAd7QBneAAcl-D-hkAWgv3i6FAQj9sGvvEAcjycq4CaOl-SPgQJmQu9FBrUdbNwE4AkB4+0gEwdYRIC39V49-XPnnx5B39G+D-Efs-wzCwCXO-ZWAZJzgGJdIh4QwLkJxL6ncDOQnCIYxzgExCohcQjIVEMSFwC0BjETATymwGxgrBmgYAcgK3ZBIuSmAEXiHUI6t9ZI-wZVhwCgGuANB2guSO5kwAGCjBJyMAHn1CJgAGBYAToVoO6HpYDBIkeQNNBdA9CwARAgALxLCwAWgpvPMC0FVCtujuFofgOv5QBxh60HoX0NASDDhhowo4TGBOF+8ZhcwhYcsNWHrC-wWwpoT304CtCoA7QyIOMKwQ3D+hUMc4fIBGF0CxhDGbQX8KmG3DZh8w9LIsJWFrCNhrw0-nxyeDpR9hLQUBM73GEN8bgdwegAYL94F9weEcKOLBBRFBJ2w-wPweGxyDfDUQJybEeCJ0EJ0GoeI+4PgEJHbD6mO-B-hiNcBYicRscBGLcA5Fci3hkQIIbv35GRBBRzIoIeyIJGVCJR9bdIOaANSUNx4hjYoE3mcDEQRifDTtrmTxAC1XAAAAXQYxktQOASlCpgKAkAwAFo9hlaPRDaAbRaokyrDHpGQBgAW8PAA7z-Augt4vgO2P8Ejj8A4mQYUShYF8SQcRujg0kh2DzCd9bBBwyAMIJ4HkD1RYgk9JwIzExh+B4gvMYoLn6FjcxCgqQWwLwwCDixlYmQXkDkE0CKxZAlQcVAEHciUyigssRwJlFQAZILQkEYsNWgDjRhzvP3MgHhFrCaYWgwceOMnFaDtSM40YXOOWFrCRomwv3oOKIFoiXAKo4aJWN+DFCIo4Y89mZWx489ce71fHm4BzY8DDxVgE1JHDJ7VCQcJYvgajkbG0DexkAYcR8MHHO9PO846cYOMAmriFxD-JcaCNAlPD1xBgrcf2L-GjDtxWVf8SuKeHATlxG0C4POMXGzisJE4sCbBPMEvtOxlYrMZQM-EFtvRCE6gKhPwlgAERWg4CQAB9mJYAOcYxNwmsT2J9ExiURIgBISdx-46CVOIGiQSwAIk8Cbn3EmSSiJHYq8knkh5uoFAe4nEEYRjDuCwKZ0b0ZL1Aoj92+vJMAOnzAByixM2g04A6xFH4jORyoikSDjUnLAIB343SdL30nqdxyRkkyYyPGGzBLJiomycRLjGRMLeIoVsVrx1iJsUxi-QgbHzQmiTiA4kuKVJJVCJT6JhEl4X7w96yDQpIKa3j5BIBchApw3SJiWNkHtiopdgyAM7yIG-jqAQgmiYOJClhTveiAbQMsOBGjikpLEtiUlK4k9S0pMEjKZuO4mxSBp8U3oWAG4m9SIJk0-qQpHnH8SkJNEoqaD23hkSwp5UmwdFKgBECGpowpqblIxgtS2pSwrkFuNql0T5pYEjCaCOmnSS8JV0waRuPklOVFBogyid+L2m3SRxoIscWNKYliSHpioHCTNMwmPS1xGUrcUJNGFHUTqwKYbHuIACipJEJNBBFD6F92e42IAck0li4ledXGbkaT3DrhNJpvErj7RZqcAXweIF4JTm-bfc0mlCYUBTWpmYh1CAPOKgA1i6gCcmA4DMDHBWJrF92LTQdou3E70g+ZmgAWUcUTq1NNu9Tb4OSz5gIdxe9IRWc4D5hkz5ZKZGSssDxBr5dIf8N8DYhFnmMnMsPMYFJWQB6yueddaTI40HRFJ1wRs52bSMTx9BNWGbcjiRKvKUztSSkvUiDT151tq8ePXTn7If7sy5Zm7HYVAHtI31fKS1dfHuIEFKDq0mAgOUnHs48yRu9Y6OKnPKGQDUx0A9yf2RH6u9spzUm3q1JWlB9t4G08QdzQ+5bTKpMAoznnM-FNy8Be4iyULP7y6jHAe43yX3KWoDy9xuYF+sEH7yGiYSlYbOfYFjHFS+Ox45gVqOq7FAZ5FneeTGL3HoBEAtwBIuPLR4xtcSR8vIJFNF49y8R34mPvgTQKXZlhWgrQXQLkh-52C9BeYI-K0EkARISAXqH+AxCcAAJbBQgvMEyl-yAF+IYBQQQ4JgLpoP8uSKbh1wxgNhdwkgIgrODILUFXIaaLAJmLlyMFpwLBX+BEg4LaIhC4hfMDuF+9potclATRlmDXyKpaYmPmfnvmfylhT8ugRAXflQ4v5P8iBYsCgU8LQF4CxAP-KEVAK2Fz+S7DQp-nrQkFPeVBbMJIAKLMFSikhTgrwXIl4g5ctRUQo0VUKyF+iyhdQtoUvSfa4qUVqPL1aDyus8C8gJAA0FLNY5kAeYL5N756C2MNWZur2C6jwA1i28ARkNB6HIoQUcWeCGQz8UgpAlakIRlKnSxhLgeRmXxesH8WxKswxyHxrOgMihLIgGwiJVFGmRhB0l3AYcNOlTQ5KzoeSggKNCjFFLAEpSloBmhuTZKV6EIRJfkrqXARIlRotJTErKVZhc08jLlJ0tqXE0elDSmpE0pPiKMOlCKZJuEvqVBhilDgGZZED3qjKFl4yiJSiEXmrTkUjknmJnJCiOyJ6wSxNPEoViiM2ld0SpA0gMgtKF0vjXYsMqq4NB10Z0DpHsr3FOCkxxUXQd9HHAU1wxkQdxYCoLbGsAI4OFxaksLBjLIA6DMaE4M7C9Bc2fy-4HmCjE-K7JNBUJcCrWKgrLOHi3aF4rtCh5kAMKs5aEFWWmgEVSK2GCio6ExL5gLoV5gMswArDPOhSlZSEvpXfY9WU8oaPuBAyJLGVpJVFWVljAyQVhWggLFoIAD8AY1lT0JwBSre22K8JripaDHCxVJoa2YSpaDgrPFQKk0FCspXfZYVUSnoDUsRXsNkVEq5lQEtZXsqAl3AFYeOJ5XARaVtq8HIKq1RYQ6VCKcVRQElUMYehZ2WVfKqVUsrYRAwNVeGvSxnZdlWqnOZE0hHBr9VIKo1SStD6QqKVVK2TJWB9X0r7VIa1FcqrZVNKVhVCckMsu9V8rtliKgVWiADWirM1dMJlXNUTXlYE6UazjIqsrWqr1Vs4TVaEH2V1zDlR4-ACeLDKiQHF1SgtZaupVwr5lzSstUNC7WckDxiAadeGLHULy9x7i5xeSoigWqTsVqvpfCqbV+rW1IbQNcY1SSOrIgAMhKV6uLWNr112jNeU+tDWuAiBt4mOHutUZswplWy5pS2qFV0wRVZNPkeWqrSnYBYsq6cQqq5A4BK1640uCsPkCsSMNPaWYLKvkCKr5AOAQRYAqZHOqRImGgWLQrz7yAFVZGqBcqqo34baFOALwPWo-V0xfVkGttZEDkhcNVI8G7tSjSTUyrOF0a5jZ52mgJrRNEmZDcFhtaOBFVjGoBVJvwlsb1V4mhce6yU0qbEAKyAiBRpIXSa-esm8zCxllV6Z9NemYzVQtM3oaWVIkaTe+spAlqb1vG+9WtBoZ0NN1z67snJosz9qkAg6pzeOJk3qrVoCmhrHpoY3iLIFamsLRprM2RbZVVrJ1rFqQCGbGAdmkSOFpS09qgtnC6zXFts3Mb8tjmyjeFtc00rP1aDDdZ2v81VTPOyGwGdxJa2cK+pEk-CbKtgmzSwAzvC4FwwkC5bTNg49TQpGmjLDNRMYN+sAMumKhWtCU-reOLS0zSppPWzhX1pGlDbngI28rclvG1JbJt026xnNs3Gjjr4y8XwVhs4XdSBtu29INQFy1Xbb468WhUdso2vabtNG07d+tm1GB5tl20kcXGFFIa7tbWtiYNuQDDbntzGq7SXBo0XbQR8OkHemVLhTalhM287f+NrVLaJpO2mHXtrh1Oba1H2y4aToToY6-tv9IHb9NVgEaIdy2wnbDty0M7ydKOpzezpp0YxztNW1dUGog0nZ-VXmgFBkh81Ss-Nf6n4VzvF00b+d1q69ULt1Z3rhVgam+heuE2HCudQ9DHQrqvVrq0GnmtXcjVWSxhBNnXayE1uY21C9dnGtzXVsiC3qoNuMGDVADhAS6hNUuitU5oR1g7Zg00fXRXiV1G7hdqu6DYGqwQW6HV0u7XZRrJ1B73NyukXSbsiBYhPdlu79Nbqc1vt5d9u2rdxv5Vh6XdVEN3ZAGg7R6tdTi33Wjre127JlvKwvR5uL18bOS4oDPTHtRUx8LgblQ7KCmd6qa2d7epHWIokXkabdw+gPZlMVq7tiJcxRRJCnnW-L5g3kTlpmSBY-QJ19C7eKfA1ENan4BoxvVyjlSrhUVto7MZqKlR5NlcyKD0Xvu-Uprx1e47OPfrtQXytYh+htdxpP15hkmd+6gJfuFTX7zwf+u0a-qxU9KcVaavjvABPVZrDVx4RhQxi2jmrC1M8pPfVof1V6apLQugZ0xjAjCwRzql0OtAt0AAeJYfRo3Kka4miex3Q4H33nwmtu03A1UzkiEHK1Am4WBQaoMkUaDqkfPQLt9WMHf1qKogbpGZEv6AD7Db+WsK3iyH4d1jUNE6luDmLBDiuw3U7pEOLJmDEhsyVoKkOajtAshrQfIYdGKH-tujOgPo0cBqGG9X+8DZgbtSd6nezvGbZw2FiPzpx3gl3hYdEIeH9E00PPksMH0EMdcfvOgX4aoa1QLd00Cg6Eesam5wFcTEgBuWSNCA59C+IQwirIImzAE7lCWD+I73QJHw3mxRePgKXqGDdgu1wLkbdmPKCjrgLg5LsYSlH+NhDShXQab0tA6jRVdYI0dg0dhijpMNo+7o6OGKujjhyIL0btgDG29WAYY60ZogDJxjFR7pZWGjGKJn9YmbMQjGQMErrALQWA-sbNVLqL1K6jQzUa0NYHvdpkMiTsYok1jJjVEYQzcca2x70xO4547ktLVvHcYW6wyC73cMxHPDTO3oT4Ze3WMAjQgIIyEfi2SLneYR+gBEaiMcMQTgR+I-CfI1hGzg6R4QGkZIDU5MjqVbI02vbBTNGEISL9L2DmMzyzoFe3zSjGqAe7K9eUZk1Tuj1sn4seUTY8+y2Paryl+AYgO+HIkGo9jYmLaAasOOmQHjYpuA4urPVoGj9LxhFdAAYCaUGA3fWGLHQoCxByQFxs6M0a91Mn3dHJxk0yfGiOTWTJp8vbm05MowF1uMLyD4vVQMwuTbiwonlEdPpoCjLps6NqR6gcBbd9pv6N6YMhu66TPQCcKdlmCNHmoQZ0Uh3q9NVHg9mhmYA8bGg6m9Tl6nIEacz0cAWT5pumAyaRRenO4cx3INWljNBVPYVJ2-DSZrMGnXTMZxo1ybDNUQWhv+otTadzDKC3wFONszydF3dm64VZgo0oLEycA+jwwMc0FRjBvg4sC+oaCRDIhRxXAWAJoN8eqVF6VdJe8M4GutlTmxT2ZqvSKDl2zAvDYkmNcQbPNTm8zlWwMdGZjDVmcw85zSAep3kCmndIOsU6KffD+TJT2amUxQLlMnGFT0K5dSOdJMtA1TGprU0NCzP6moLBkQs6WYdMfn+T0BoJMdGFMTmQL-50UQ8AONErnu+F8U3ucLBnH3ITZjA5EFgvcBNTjvbU00EFTZmmz1QPM4ue5OQHU1Fgn2lSMpoAXiLRx+UzkFQOQX0D9BmAOqYYvwW6YiFnM+yaGMhmDMyCMDSqbJPLAKTdcOs6mbCAVmo9uCHkxhe4tYXXxiZoS-AelOkZRL1QcS+ceQvVHbV9FlcHJdxgKX2LPQYM0ZfQv2GuNUxhg38aYMfHHt+22Nd5f0TEmKq0Fw5c4AsakxdLqy-S42c5KJmVLGxky1vpfE0ZcRhF6xRPSAs2WwLYlqizmdotQAXLjFzPZAA8uOWcgqFgQ75Y2PqWfjmluK+bMTyJX3TJgFK5aYhjpX08KSy4zxpb3Dnq9EpqvcxvAn9XhYWgwPZlb3EKi8rgFhA0VYmunHFTEl5U61ZgsyXXLTFhCyxd1NIXIzHAEs41dDMpnyrs2LS-FcpNTnqT-R3q+dZA0ZW-LDu7o6Ht3Ot7xrFFqMtnso1aCXrc1x-Yeq-NHpG55ErEicr9MbcF5p6iCw5ckufXrjzhqvYoL-OUShBgG+8YqhnWvX59plvizk1TmGBgN3inM4NyXPgXz11Fuq9dYZW3GAUO68mwtfBtoqeB066OIUPXAw3KbeyhG7TbKtSXGb7x1FQmOcH4hsbLNh8ceIJt8mibPspyqnMWzQ2KbTZqm-FkFtKmHDGlr9WjaZszBKx3YiQQBplt4391PFp-ezYLnvjExG2PmxrYFsbXEbdN5GwFbtVBXRDdx3NqWI-E1jpbubXG4+PlvezMLxNkbqnNEGO26rmt9sxCFKs0WRb2h-6x8benwYsbjAnG7utlv43Qbn5syzRlTnKDDpP69fUIFhtx3tbW13WztacPJjDbVUjGw3JPSsTSpDYgQREazvm2Q7+d8O0rZ9oWSQUVkjkStessQhbLNqxO-TakuVW3LVEWq6db7FJmmrg1xW0FL46+Th7llgq6tYnvFW7L09923rdcBz2Dr8lo62xbqvVBSDPly61bbBuF2WgggcfIhG4DZVtRld52zTZ1v+WT7qNhu2LdcAaUZK2lcfHQObul3Pxfd9e+QEdO5BtMpykc-Ux3yGBqi8IBgEoMQcoGEVGDraCxeMRBycgG5rjINTPHQYVMRbFIyaG4CrsKw6qUY+XuPY9tWM7EE0ABbdJoBljkQU4NfLYdnRqSSdpYzWFcAcb3rBeuuIw4Ml1A2bT91wKg+FBYPnggzW1YeGUYCPA6EYmtmdBIePAGqND5h68AwxcORHklQx9Krny8gOH2BEx2BEgC8OD5-DnIII5nvCO7HYj5q9tYnpSOzu4fWRxHcia1Q0H0cEu1SgEfmPjHjDogfe0sxOO7LuDjICE2ceaO8ARD64Mtc4eMPGFjj0DSaF0dkOimCFaUk2Ys60rbHtYGPl2P9tFiSAbcjMGYJgdZXXFQTxRxg6UdhPnHETzJ9w52kxPLHZq3B3k3wcpOqc1Ds6NY94zlPXA2TiZWpbyf4hSHy1fRwI+8IlOWr3jnp4Ced5VOd8NY2p6XPqf+9Gne4ghqE5UcIqWh9AE1j0BceTOkch6Mp1I+UcDMYHkSpxRk+wLOKwVSB9az6ZSuPPNnM25Q+GhyeePOrD11J5GPJk5NTniD9-WJYucfCrnH96oLc8mL3P6HprTZ7MxecmW3nEz+8F8+JWT2GzHlesyBFMcUNrGVhqEHY13HiPhgul4ttrM5pU6znjfcJXaERcGhrnHAAl1RCJc3WOwbI5a5biZdjOGjvVwy2hbmcrPinNjjF49aEh2OcXjvPF3uIEvtPYwwTnB02tpQRRIQfAXkIdiJVpObnqzhV6oAecjHsXzztVwy7bB8jeucTm5105seMP72o63J+M4+fH2GHmzk2paC-l0DxaQbzhfprH1QLA3CdMzd8FWMoKSFswrcw0EYfRuOwwb0NwnS-lxbI3QCzNx2FjfxvsF81h+wXYCd8dwBZz3Vy0Gxmz1nHFrv1xs8pejchs8QtiA6+qNTPJK73MuVKL5GZWrHHz3jIK6WvWS7oPVsl3Hr+t7BxXQgM3i0C5pVuuXTa2t58KKdGohHkjzZ-vxT7wcrrNr5t7jIHfsOh3hL5A8k2FE73JXk7363dEPMURmXMc+pvsC1fVviQq8LaE4IGiXwP0NDkZ2a8kiUOtHhT-J0s4vadO6HkT7d+Y8579OfXY7zd1i+bcigi3ibkt2C7-v+vkPqHoxbgud4ofyjCb3D7RAI-qK1jVC2YX7xH4zFGnvIFx425TcBvbau7ZN8MEYcx8Gdl5hKckJ3xK0S+zH+6lFd5NNOeRw9zV0u4GdNrLnIjwdwh+wITvCjJLnoIK9ytjuXXHANF4nkVfkvlXtYVV6He5lPvOxiZ8T9g+XctBpPvLw4ae7+c3uIrxpgyIK41SxgAL6nqAJp-VTafUzun1wAYbNarxkRb1yInA+UBT8CgNWLmLap1NbR7qS5CyKeSofaOnKZ6D6byDXCGBcwGGekbSsLmPWqwzbtt8ktle4wHiSVil3Y6n4z9x8c-Li70p6C4zyX+Xux6TMq+z95+Q59pHl-K+1gPHpbwm287PQYZZ8Onrt-YOqnZ3gNEJ1OWehIDTfowsAtYWAD1NrCSAT8v3rANvn4SuP4Jzzqt4MEbeXe447b9-JnE4hkALoNYfAPwl7fMp4E4DQYKD2Vmpw0YJV6N62dm2g7Odi28IBj5+6XgpcY74OO+13wBYx3h0TH1rVg-prmK2iQLDwBaDYBta1b3BlzFgAyc6QeAGADh+Xe-v68MALAKXE4-a9P22YJlN+9o7EdF5sEyd7AAwQ0fg2KEFj9mDw-YBuP0uDd4O9uHifIPqn6+vBMzi3t9PjH0z5Z-A-14HPiH1TtB-U-Vv9gS0AahF+Xekfa327w95TNOKkLALgr7kPlTq+V5dILrrQHPC8covR1mL4uQ1zxf9ZkLpLz7RFDfA5QEYCMIjJQhbQjAzqDDIK+Luti4P8pBVrDeuvRem4Fvk8tb9Ge2-UkM66qJi9xjZeuTHAXL418Y-NvC5tEQr+QvwlBdmOWQ3XyaZJMleuvbHzZ61+q-te8-0V3GA170vJ-mvVfEv7wLH5cWhrVETX-H6jOMPCvTfhW2veb-Kfz319jQz7XQZinaeYmPO-GajOFX97Eprk3V9XVgDc2o-uW4Gcn972uAN2q9zafstu22-Bu-+4FYNvl-cyTWyBwMzbHiC27dYsqeIK7+E3VLHbiRzacpGOSl-4-tv7kCn9CuRXY7if5Rc2tI3d-av23Mb1FOxtMATU-1EIBBS-19tr-E9Fv9u-NRhRheTeG1JhEHWG3n8cmBR2qIJPcvyuNUQRJzLtcYAhwlgAPXGFA9aaG01ocW2Qv3b9oPOhw1Vy-OfxyB+XI-x88eHPh0YDf-dzwbdAAsrybd3HeAPz8UYPgJr89PXx15JBAwzyZMEsDD2ED3-IJBadsAsKRwC8-PALSACAlfw4ByA5Z1UDiA4Dy4CuAN1xECmvWsGicYPWJ04D3-FgNwC3vGZ3gCmA1Fx4Cj-IANEDXADuQLlXOQAIcDH-VgLe86ndtyP9kAxAL+hvAkQM3tghJQKgc2nFQK39Bnd5TphtA8D0oD-3CV0oCjAwALYDencwPsCDA6wNUDbAjgLz9vAjTycCj-YwNoCU-WAJoEu5XP0CCuAvfyw8VXA5wCDGAtvxkDvXJkzCCFAiIJCc4XTQLTN1A4gCScbTRIPIcLTPQJt8imKiCoCK2GgJMD-1Ppzb9ig6zzk9ygzIMgA7ApYIMD6PXgMAD5gyIF68ig+oJcCi-ZtxLsz-TuVy8vAtoNn8J-LoJBxFA7mzyYtXeFzSDIPJP1OC7HMwPoCLAo4Pf9VHIZ22CUgiPzpg8gm0wKDQXE02WDIAUYKmCDIHYOcDyg-YKgBDgqEOOCkQ7r1MgW7aoKuDnAoIN4sQgssyGgwvdAMH8cmcAR5pRwfoNmwCoPRySCLTU31WIhUd-3d8D5D4L78JTSUQ39lrLYPf90vaPzmCvhYuUFCE-VznZD+AsQNSFPA5wKECLTKvwxDkQ20x4E0OXdz8cZQivxtNW-dUOSsb3JTxsDsHLkMzFsHPYI1CLTUrxNDFQndwxg4KCoHVD8QoLzRD3-M53nUDAs4CQcl7DAInoDQqAEeClHC4JiDWA0QRykQDKACwDeg5R36D0nOT1ICt-F71IwXvY4MLA7RAM3FDXAjUmTD+3O0MTCIQaMChwoQEUIqC7HMIRaC6gk0NNBowPcAPAMgYcA2wkAdpReNowF3DmwDfNxVPAOnZwPLDkwOUFVYRiWbHzhAHGUMgAVzciDC4Ow8HHCVIgAAD84WBIMNkHiCzk7Uo-TL1TC7LOMJOCDIOP21CxLXghXCt3Ztxj4iBfAwgd1pKBzUFyfIuGu0effHW-lxxEgBJB84F0A0EyfBwSv8O7cQUkEWxU8PfCxfAHxl97wlUEfCGMG7yis8Qi0IQDHQrcL5BtQLCAVCegTcK3CbVHcPXC3HUwKPCIA1QXEEFVGPkrUt4AIUgZUjb7BBQ7NIMWFhVvacIMECIk7CIicI0iJW9CRHACflJAvrxlD7QpAOzCkw80BgiwItoWFDdw2zjN0fiPiMaDUIvJnWhjwz8IuCBBVDXY0mIh0O1DWIwkKzCyw8FGFIVUac1xgrwLCEfc-gxELLCq3DZR6C-Q0QmiCzPMsKDDvQ+x0MiAw3AOscYwhkLXDOw9sNYD7QFMOQjCw2sBNIAzE0OWDVw5MDzCKIWCPWDiworwgjBws9ErDMQasKGVlCA+WzDHIzACbDV5Y8DbD8zaTFIgRw+XmcjGwnsORR+wwgJGC5w0cNYD+Q5cLcikw4sCEieI7aVgi7LJCJqi0wsbzQiTwySPEEITH8PB0+fG8Ou9-w+AEAixMVXxAjAg7iKkC8Q9iKpBoIgsOqB4IhCIboAo4aM+DnwUSJjBxIo0K-CT0LCN8NY1XCOwY9AccPgBiIreDIj9BTKT2iDo2iJO9gBBiMC8ZohSKQCwInyLEs7RLiJmjIAaaIQjnuASI2JKohqIaYxI9CPP91otDVRD5I4aNui5IywPVChwr4FUjMAVVEjDLwfkC0ioXIaPL92g4rzkDcA5-whg+wDbAHDYgptSD8WQj31TDb3C93+9XPCGNUCSomPxtM3o3APlCwI9YOkcZAbyLijE-MqMxD2jBSCz8QopkweiOAc0Mgi3vStT1D8giyMXdjQpSMhitQ7UPWCKQ+ABH4+3XPlogEBd-gYBYBFgFgEchBsA05vI64MpibTN0NJCPrQcP0jQwqyNMjIY8yIjCDI4JyMiMYayNUDbI1INYD0AQqMyjcAvaNcBpw+GI4jTSXPkmjOYuOQzCA41mLLDBveMOLA4o4cLXMhI9YIz9uY3WKljBw6mMDj4owOKqi7BeqMLA6o+aPcjXDQ8LyY5INqIp9-da8PQVuo+lAAinwm71kiOgl6L21qwDOO1Fcoi3zriKCO0PuixoqCLZlm416N4iOY6oCVRm4haKaNM-APGN8Zo2UI7DhvQeJ+jC46pg2izo-RDwjPASiLuB9omiP0QjoiiNOit4uHDojLoxiLzj+Y8Mxyjvo9eVcA5UEsK3CwY5iINiwop6L7i6Y2WOc9BIueNHjIgBeLkhpI4GM7ibo+6LDjIYlSLxQlgGKPrCVWRGOA8vA9EL0iLIsMLihngx2JtNrYkMI2CLYqB2QSLTZ2JBDVAt2Odl5wuKJcinXDmPWDPIzMJYiiEhyMG9o49KNjjSEt7wTjhcJOMoSyw1OLjiI4ueP7jqovONNBc4qePziYpNgxjAS4i8Mp9y43bx6i+o6AAGj243vw7DG4kYmzjJCYujDZnDE+NBiu4xmM0jn4geOUSYAUXAvjBE5e25iJ4gz1GjeE2eOUTFQ4RJWj7YgGJoEl4-eMwBV4-CL3ito0iK0FyIk6MIjN4jxO3i1heiOPiBE0+LOhFEkeJUTcqa+N5jQIgBNvju4+0Gej3ol+Mhi34r6I-jjEhpjkg7E84MgDMIoGLkTwIooMATk4jsJASroMBLrDfY8aN7jJg-WLz80Y+RLJCRubPD1ZIQFHx7EDAxkMFRqQ1kLps1gp4CLgCw1ETR1RY0EP79PbO1BH8AIMf1nUrYy+xOtGYl62qSCzK0zvtnAxpPBiQggwPYT1w7hKziywhmKFifHAzj3dSk1gMFjX4xhymsGrXoUD1u4s2KFdX3IBMHCZY1JOuSnNIGztNZre5MZjHkyt0ljWEyGPZjAovwOaCYk7ZLLCNgOOLe9o6WOgLIq2F5I7DnPNONfR3AFyBsAkU3wNFJ4OGFMYdbdM5JYj6k0KPBC0AzfVdDTgd0PjsBXfvw9Dmk16TCkxknSzX9BkpeCZSXjI+zAj6otQNFt3o8AOai8kuAJKSZQzZPri8-DEL4437TEHItqkj-xZTRkg+2cjOUrcO5TXjQ-z5SmtX4A+F240JK4S1UvGNliATEBy0o5KHVLGjVUhFQYtQHNxBWSegRezzjrEoOK2cBLGkXgAyDbBkINjU2Sh0oSAZX2nFBo1oJmjqU1gOkhpAaqAFENAsaI4ASQZaCRjcEjsIeJIATiyjSfQ7zWtN3oiM14TYAW1IvRCk0VMUiRUmBN2DIYoJBftuaNHllSt4Y2L+hNbE02DTv9f-x38VU4aJ5TQA4qJP9Xw-ORv9hUjZKLTdIktJBwy04Jwpps+TlzLCq0xSyZNa06QKITlU7UItSQAr20hiATSmQagck7EKkA6BLVI3Ae0o-3zSmkk2I7DS0yaB6CR0noMrThYatOAhp0h01nTG0ydIxj3o-VPyj20j41XTlo-6M-FGBbdJ1STQ-dKyNOgssOf9BZYqFZTo4DQQ5d1Izq3lSLw9lNyU509UIXT9bA1OXTNU5mVZoP0gVIwihU2+L-S+0soKAyQcXMAAgHESDNlSpTEi2HTjiMDPIsyMu9NdsH0v6CQz67F9NwCV09DMpp10taJoEzUrlJbTbVAoFzBtAT4Q7D7UgRMdT1gmPhdTghXPndTFAQg3fTVvaVyEATvf1MKSw7EVJTSHwAMDpTH0gRKZjxAmRxCSU0hoJsDGHXJOwycQ6UKni74xBC0zLkl6PADEHcyQwSYQBQ1jU8zANL5itMt5I1S07ZzK0FfQs52MNzDWNVvtIrQpN1SOAfVDwEjE+6Ca0Y+SWVB0QM9QXCt29C3XT5SPAxXI9SFeBUKlIsrTMjgNZW8AyT1gwfXVlHAPmCJF6NcrKVl29MzU9ZQYrTNXcjkqePWDf5LEygUWsw-gdFB9brLT50PeJJbTd+JJJei3vCOVz5yRBCNsy7-aQPwzy-CVOAyZZNkQYw6MvSM-9iMtAB0QHWWVO39GM2u0hjn0nNKz030jjLXTP09sS0Tm0l6NtULgRACozWM1QIU9XAUQWOzDA62UcAw-fRLe9dZT7PMSdI96MeZ95TkHD84Q3AJhAaZUbMBzGHcrI4zWZF4Gqyc3BLWd5KZeHOQAzNRkE0Shs67KfTfjdVMgiATUKxJ1iDZTMwAvM++LmyLE-tMHClsimhjAaMiDJ1c4oijOaUFU35zCiEMmUOYyAHR7LAC0MkDPOysMhxJZjcM9UP-Tp4zD0xiiMtcC2zHg8jM-8Hs+nLZzoAc9PoyhbTyz0zZYo7K0z2MgXMwyJIwVJ4yrs+dP4yEVQTMwBhMt7LEy2s7xG1D60-IJKzdMpjLzjFQ5mPUzTQ6nP0y3vCzOFyagm+JBig0+zIiT4s-zOUcXMu2LOd3M4g08yCsltN8yCck-wCygsuFyjzAxcLIyNY8l6Jiz5UOLMJyXeJLOlkKaVLJvN0s4WEyycPXLIKlycyFJeiisyrJKzvsmHM6ygFCrKqy6NJHIRNW8+rJwBGsm6OaycZcPjiy3vDrNzdnefrOkBMpKnGbyx8gfIGzM896JGzg88bI4z-ZSLN3TUY+bPFTCMnKzOzaMpnPWy1-TbNIz98w7M5zPcrXLxyUMlOP5zls-XNWiWonDPkjzU03KbU7sh7LeznsyIFeytMoHI2wZASYK0zfsr7N4SfsngBtl58yCIhzak0rLe9YckDLRzEcuAplkECnAExy4kgPMLTYkhpIMCSQ-bPpT4nAmLN84ooJDzlWeU7E2lIY20RCIKA1gL6S04kdxPS85WSNPjzoY8it9EvMHLrgyUmuHtzz4JcJpjWAlJOxTPo04njzZYxoiayW01rLGyTkovjVDpsnzKXzGHP+NLCXohzOhzNnFQofjgUsUJgLGHdwMblcQ6bPXyAcjsNwKNc53JuyEVQmJeiSCtHkCxhs2kIAKW03ZP0ShCnQtiyMkz+KgADCk9D9yIUqnIESxAQfK8LMkt3JdyRojAuxzAc7goH8FsiIr45fC6oKwTDshJyGDec1gIRCgi0zNNj9CqoOygjC7IqizJcoIvWCtCqIqnjeCzIuBDOCo9KA9nC7IvedVgiIr5cJkvOXIkSQmVJMycgBTyvTXk3BhaLd6GNkGLxcvmI0TA8ltKNi8CzXLGz4E1zNSibIj5xoKXo17IaLSi4hIDijE7wrrAQ45mCCLiiuhGhjQE2sNiiEi1BJaAki7KBSKU4-goiTqgVYtCKpovRMGK6EdJMdSkPOxwPCLs98LoE+qERPSJRChpxeKik0XOyLIi6Iv0zEkukLGCXonRIKcT47ookzHky4tfduivlyWKdA-TIeK7Iw7N2K5osEqdTyE5WOGKiitEqgBykgUVhioMrKM4joS2oqyiKonMKjiEi8KP3BIoo8DBUUo47N8iYQRKJbCTwI3wWLVAmOIogFwx+K7Dz4+tjyjuShGO1Buw6UCvi8BMkpqt4MYMJaAEE64o7DXCwYp7jaZLYrpFnigkppNnAd+PeLhIguO+KT0AqSBKjSgDMaLqAdQttLJM4gUtKaBQAWzIjnYEolyG4yUrNKGhdz27lbSjTJCTBig4uZB4MO4oNKeEoMvJK3ir0sySvioXK-Tfi+DAagSAAErMIbSoMpmzikgkrDKeSgQv0z3CtrKsT4yxUMqdO0r9PzEfcz8RIBqNRnU6iFVLQTcAtBBiMABi4DAASIBH3rLa4+MpzKoQ0MrJL0S5oqdLiysbNFJIyj4oqcXSpMrUFmy+cA9ATvc1R6i1fGMv7KxivMoiL8ympL1LQc8YoQiqi8ZM5C4irfMaK7CvIBGyuihIpZy0GZXJlK--BjIsLz8xottVjoe8p6KKzZNOBL4s0FEvg-SzJIcdZnPMqHLAkeorA8YS0otNxjoKHIJL1gz3nZ46eNUGBL1yh-xxzYK7XO-L+UmALfDH80ksGL-ytQLPshS0TIWTpiwcOOgBimMtlp8AE+XjK+rf4BXsjS0YoHLsi5itkCEIiTPPKHqB406K4MmwM-885S8r4rVAvbKfKCMp0ttVyJd8roQ6Eq6F0cQKj4FIqxKyGIor3cnxAUqZgLqyorP8002Ut1ksEu3LSXQo2lFQyiIrYqe-PdK0zzCk8pNMJM7pOZDGiugv1LWi48pUA0eDoolYVsmfzwrGi2L0t8VyDguVLtS2CrHLZYsQsaLkS-ItRK6KnSo2DyiiErBKNgxNmcqGgCyJRLNS96NirZgEkqNLDKnoEdLEqx5I1LLYoMrtVerVSuQqNK+x2SrHi1KptjzYiPJKqnS2KuOgcq4Cu-KUUlKsvi6LNUUwBsBC63aqnS5z1xTaq7Ysl8PhOssTNi+T0ttK8q-SxNK4yqire8rCD0DUr0YxKqQBlgSEBCJ-yxUOAAWRaSQfNWVXflW9joVsvcTAbCirmtVvPEiMB9vLQVogEfC6pIUtBVquuqtBW6ooitBEaFiBaIHU1bLAk2ARuSzTfRDmsQxSqu-LoUmypNyYynOLyAe+IYw6jpxaSoMg0UtwBYB9AD0ANxoAA3DWqxUgkt2rEI+Gtg1tUjSuGBxYtl0Qc1s2GoYMpXEGoGrcqsmtGq6qtBNM9lHVXLLLaam91Jy8ajuKCLzKgtJDKhag8pMK60zfNsrw46wqILt8+uSgc5sKwGpLbOWYFZryWWVPwTcwX8jii-K0P0Cq4E5RxdCywolydzPQ3GCCRXgKwHboIM3lKFjP-GsuEqOU+9OUrLC9YsvyMitjIBtAxDXXmAVhL2vdyUKxWywKNkuKOCrZY0KrphpCjQubdwivvLjylCzZxRLCip-JbSQUkAvMyN0-wrXzQSwIoUTKUvosPTX4iyOTzlHV4NljrHZYsHDsSl2NxKtSEhMbzNnIkr2KEq4BKOKroNSLeyoSgpy0zzi+R3mK3skOpWKIy-Uv2SDhM0o+jmgU0o6r2PYgSPC-i9Mozs6iLMqKKty-cqbrBwuEvAqD2VeviLZi+qvQS7YkyOLq3ssusxLZYyuvjSaS-2L-LU6+urxKIC2WIpLZRKkvbqn4zupbTu6nh17qdc24riyHiiTLDrhC8esWqjS50ud4Z61Mv+L56nokXr9i5euFqt61gPXqNyY3MQyW0oqsMiD6pyMhjj6+kPmSJAfQP4zb6ofI79b6yQpeiH64phOKIEi+wkA1S6Z3mKS66uvC86Sr+oy9CyiusHrQi4erYahY0UgnqhqqetAai45aNnqMyhxGga4GmzJXqk62EqgT4S+Bolqd6tBOKqIwrTOwaIKkirwa1iyCI2Kr6r3OIaa60OJjqyGluprDwEq3NVLC6+hufraS1+sczv60rN-qEi-+psDeGoBtgq3vA8NsSRGyBsBKZqgytgbJGoxvejEGkilFqZ0ssOsrja-AoMgzasKQoBd2OqAVZ26hFTmBFgZYDezta9gvwaXo9WpHhSiRUkcK0YZhpbSnK0rKc9GU5A1Ia+U+xrcLDS0ooeIommYvWKeAK6GESUavYDmL96pBKarEq2Ks4tBy-Co6rOmxRwyrIYvpsYql61iuVLFkgmu-LQUYmvAglo9ppmBLGrpswdgs5ZrKqb3dPP+zzk8TKGbd6ouphAGG0otiqdm3mv9qUAiKsJRJyp1IJR+gXZtULSiwWhSqtmwoz5h00iKosiX3Kty3LlSqQG4B36V5re87KMAAVUwAJKifAgapzTspAqHMGmh8fCFpcpMqdKAKc1q7cs9tsQNxuebGHN9nRblSzav1YdqnUre8hKAg1GEic4iM8ywWogz-AwAPAAHl8WhIqhrGm52vQqWmhGoYqkasSU2a0ajGqxqcai5pAqCK+ZqugiBJWkepgGtFOXKq4gIqBSwSkVo5aSakTLazHktmsfQdsqqtiqeagZtmahqimqGN2XE-OAbtW+msebA6youVLOq6Gu3rgG0VriVWdDDTSthYAPiqrHk5z2CFDWnpscqKzez3Nanm7IoIrpWilR6iLmsyqtbXG0QrIqFGu1qVaZkInSe1iIv1q7tbdaX06jeWt1BvTpGhVu-KJCzcqmbrynFJCLR6t7wJT5CiRvkbWA5gXLZIy7TO4bxCzNt0A-m5ltbhbmwthezlgHdMmbAm4wsrammo9NfE4mhJrC8lBIemSam1VJuzAMmkPyyatG2WNybNakpuJiymiZPNrrAbKCtr7VKpoJyamrNLqb9MhpsGaJKuNqyT32QquGb0HbppUbIaz8omb9i4VoOalGz+pvberfpvzb+a6ZujbAM49oWbfos9q+bDm9BqvbjmzZrOa724zKPbgGx5KOaLc0DorNzm0yoLbrmh5rbbS2m5ubaIqhvJJbU3Hbl3ZPBcfnvaEigFthjUOxh1BbwWyFuhbKNWFoKMEWhb1KpUWjeqZaXy-eSJbSOm+rYpyW0EUpbODDPU3FwW4ABkh-RDzIz0HRVaGE7iDHZodFLQCTsDFSch0VvhZO1lRetpO5YCU6XQW5IdFfAelrABGWjDtObW215rRTZWLtsI6IqicqM7i6T2R8rnmyNrMI22qQn06vcotokDLOvUizaLWvttUDq2rsyRKsO2CqkIm2mzv0yoa0euM7O29Fqkb-4ioo3zs608rCipapkNlTac44nlqHrZnLJAVa5wFlTSmwKIYLX7XfJ2ysU3AIXaio3AMyaAq7JpuLWGtOOcaDICOuOTsXQzJFyFC2OqIb46qKsTq9mwcJTq9GzZxrKPAwMt7aYu0wt8DYi1lu5SsY6kSpr38rTNtVLPFF1LqbPNrJU8OMpXNgzVszVt4TTWvSplcvOumA89Ziq13rbkUp536Z7XHtv26iA9IL67m3T10RT0C6LqDrDa2lMPK-fJhqdqTa-f0Mg7ga7kgjcu3hMFcj87bKWUgmyCKoKqundpq64surrpgCqmQs0LmO0ovCrI6gQKc62shrtVaBG99MINXSqQH2dTk6XnEbWuxot67Cq7Ht3zce2ctaiBuwwvHJieq7ptMvIKNuBaKevXN9S1uher8aIOiKvmBgc--Nqr22upOC62s-cCNYHOmmlCbu2x7uzbtGs-JhqXaptR5p4AO4AcqDO3q0rVv8hIqAKTu3Is2cdepHv0yBLNtrzyUcyntBE8ekgDOdtBdVu1cQUVPNZVK1UnNkSAmmXrFzkGrnJfyWgWoC0kF8pwtBytMgHv0zVuvXMZzQeknuqboe0rNh664FzpByS2xhy-5pCD9DR8pq1yWP5De1Vrs6HEdjubcOiaOC6IfidHpuzWO7atz67HMlsHEeOkTot1+O1YCE7aW1lTzMxO9Tqk7afBOnU75OsAEU7G+l0BU72+xwE761kgJO06GW2xUz7xys3VQ6DWhiqNax02Cp26GKga2G63e+Vrl7Ham1rZaSy6wswBmeuoGVLYqytXfyouzApG6xauLpjaZ4xLp6TiCkHEVy0u6OGNbkUzLoXdVauKNK6PYp7OXa8uiZKHTCupsGK7VAiroS9Ie4qN3bIImPuqBMe95Ka7CeiQO3awquOsqCcKqzKG7GegyDJ6Ees4PTquuolKzqA2sbv1qv2nIqogpuzqhm61up-ovym1NR2GClukcpW6Jkh7K8qVcqgf+6KzB7JIi9u2XtljDumIuO7a2vwLtd-Wu6LB7eBm7qx66Ak9i9cV+vAc0yXu48pEg3uiPE8riBvVIRUfet7Ih652yGI-7Z5f7u-7Aepgd3zGcgAbEHl08AbazIB5XjN0RqhPs2cy2+AZF7J+wBpZ7Be5fJAzySHPuL7AcizsF60ajFIn6n00vqKbWejjoagq+hNrCto8vjppbBO9Tub72JVvtE6B+-4CH7dug+J77K1fvrhB0hlIdH7dO8fp8H2B7LuBaZ+8gfZr7+psBAr1go-o4yuBhmvMHMq1uD4byezZ0pkvB+Ild7ZB7rpnj5elBpfKd+vft96QuiszqGQMv2uGiBa3VO5yZkX7uIrHlQweD6Jk4HrlyEBygv96cSqmMsGXo6wbOh4e1Hp68ghyCJR7Gu5t3iqCBrPOLbsOzZ0l89cqnoNzLM-HuZiGengZejMBnFtuGXeHHot7qeq0tp6-CwuVeHeh++uxbbuz4u+Hd8jns8Gue6vJJTVWvnr-yJewOWRiee0orF7+6NzuepURy7p6G1+rXP6HPewYaV7-FVXvfK3mp1UDEtexooN6wh5twN7ih2WON7Xm03p+GwAS3ut6WRL1sqHhQB3r6i5Os1pd7pevEd7T8B2LsuHv2hLsIKku2-p3zOAd+2rl8rU2Jf7co7Lvf73YxkkHCg+0ut-6T0qVPpd8R8rpnbKunQbFiiBngriija5QeKwdhwcL2Hgi1zr0LYBuQqcGI+k4aQG7HBOusz0Bs6A+GzhuxwBHUB2oLFGUYw0dUDImvjKsKm1QQEwaacwdOkoTUogC0HNhqusHC9B-GVljtRl6NW75R6VOcV1h6roFCYe-drayDhoWIvbww2MawG7HChUMU7hY4dljTgGqpLaKx6KvcbGHWsZyycFBseljp+wDsarD6mobe9OxojzuER+OodhjcsqjsDFDAScaTdGR6WObGSW1ZpGa+gocY7GK8nBXHHY1WcaMApxicb3H5x5wfei-K+JrRAR6nUrRTaBgEAXGwokIeJb2xzZ0CzOFWAWeqqFFkVhi5rSvK0EXQFgDur1vLQVOACfV8d8TctD8burpoNBR-G-x+6or5OAbQBfG3xkSC0FOAEUH1clWd6t-H-xgnz95romzIjap+ukbsdK1IoFmBkAesaHHyhrVzIzbx5-tsHrhx8ebcCOitrP7QxkEcv7qBo414ItMs2pRo0eFTBnDVA7QYD6W04AbD8thm0yzH3onMffsZUgsa1LbRiAZLGbs-hLaH9wl3gJpUaWX3gnEJ0CamtUJ9CYNRMJmCYAmIAb2qeq9Jz5N3GvxnBVW8sJ+6ogBYgXSaoi-EwG2snIJlRWgn-x3suPH-u5sl16OwqQm3kmhyCOHisR4oGCm3RtrNOGrk4v3oBtnHAfHIIGT-mX4cITkZg6QskceUVpobceINdx-cZ3HEAOcemgM-Qj2ymj+WASym0PWyTM71i+8fL6PItGAiGKWqIeJzAxaloE6G+3jot0W+3vrb6ZO3vq76sh2NRyG1OwaeH6D4gob07fJ0EbcGwuywj+JuhkMc862JvdOJTKcjcvvstkkT0k8WgGwqnI2Ck0ZEmryEUAjA5Qb4AABpRGVow3fJYcc8Jk4uweM1bNzw9N-fYWxRsIbGUaGheJigVS8hoYSfLrcyRSY3DlJ3GD9GLTN71T90-fISM4c-f3NQqcgMsfNKwVKwCq9eBHIPf9oBvcNr8E+evzn5G-XkNwCYpiUJYodfeGa2SLKiXNJiTy+4JoxwBV-zmT8gz-1HdR7LpMJGDskStdrZUrCszFZTHMR7F1p1exrzJRp-zv6X-GZOX8DAm8rJjv-Vmf+D2ZkovxjkMt2tTtxbe4zIsnjQWa2m2Irk1pnt4PmavL+Ktf2ON2crfwVn863AIwrUMtO3VndjTWYv6RZ5yK5ng65gy+Nxax2ctnnZthISygTKE3RMhAMH2wjfdP2Yz1YTBI3+1wjSI2Dn-taE0wA4jOE1HycTU4DxNUjEijxM4Rj3MVmGQhFXJM7rU2K0rMx2kxbTlkrTNuS3snVq3C2K2zLBj800IPkCQcHC1-MDZ4SrlTx7Ui12MW50Ss36JU5yz2sqrWVOtzIYr8sgiea7uLLnu45ZL-To4tijUHKzKhpW5ZI60Z1DqAPOvqs4NRmL9bF5uKMzShY2czlYN551u4HxR7Qo9nOZidozM4owecHDh52WPHmlk75KPnsCqFIrMnzF8xVaI9WedfnxzcgXS6-kveffAFzKeeUjZK9cwWdJAh6J7mdzFPUhiy9e92PM19KmKa1bzUJF-DGyytS-m5zN8COqXQN9tWmhZhGZyKRkouCbmyLTfwhnba5ucVSG0x8u7nJaptSIqB5pSs36lLcDoaStZ+-3YqOZ0gYbn6AXC0xsyFykzX9+FqheP0N+p3MgX6FvufntAwphdZak01hfP68F7WcFq7M1APNGaZ+uZoxMbUZoGDrx6kLBDsEiZMbmRTShdNmns30y-a55582-nJzRWoaB-5t81M7j57zPf8si21tO6vh7Z1tnHjGp38D4AYEc4XT58EOULwFtoIMCTXXWpK6wF4XpcWOJumGwteF3829aPbVd30XlumyKMXElkxdIWRFmpFvbPmpmYhc3IocJCIPTOZVs9CjOBffATzZSI+EuzGAD7N1wAcxWmCF813ldxFvSJCX3Z-tohnZC-vlCXUYgwLwhKuBcmQgkSDMYO63XQGYMhhlgiFDQuzF4nhGuFmJpBwwMkhd2MdFtQNSXcg9JadiJktZeyWO50VwyDxm5ftaWSg9peLS9e84fAXYEmAajrmugZafncA2ZcYBRlhZa8FXFqZZPqI2YfnmXOwRZc2mWYWGAjG4l02sHTfbZPivzyUf3umXgAvaelrPYu6YyXXKlmYeBCZ7Yaj61gmPpUBdC0FL6WWEh2ZtMsZ4Je3ca+VUNdGiVi02JncYQ-tyWzRtBIBSIwwAZtMkZlCOAdyV60Kr5bQuQcDTRu6DVzqyKiVPdaDZnRfuKLG3euMW2xwcJwT6S6pWoSEw8OMIaGE-Rsvq5W-GpErcwy7HzC8UsleVDvRiUdjDkwCKLUdTGqpKoSJShUuSZpS9UYISyuzFaLHSEzhO5T7RnOMTIh6jxqBNufdeHLj6y68KbL-ZVsq0EOykiEu96ygnzoi3AS7ykSnwyYdX6+VqlbphyG5cDhi4o9eu0iWKthaWWs51l2xjgc6Fbrsv8xFa-62QvZNW7yYnkJPm+CrFYyCcVkld6XnR-pZZWLTcGbMzNnGGeDHDVs0LTjhY2NXtqWahd0clfm9iY3Qe1xh3ljFYm7V34VYubkq4NYrWNbcyZ9Vb5rRB-ldd1BVp2uFWLIqVbFW7UiVbQTtF5JZ7MPnCSYMg9BsUobCDG3RtintfK9eXWD03JQVXmS4BJAXdV5tyYTFcQla7XFwmte0a1wl1dBnDs1SfBHpy6qSxwTsHHEuw9vURKXhxEmX0kTZW6RJqmQpwcPCSh6tFLUSIDXEae6wx3AMcbdhwDeVGRC+zo9WBGogXA2IcKHF94ITbxrwxYRjOYpyE13DdUD16gDejLRewxM4bhx8eNFwES3hLQ3OGtFOiS-a7or4T3VrjbI2KNyDfmBoN5xIY2KZpRarXNVmxq4TXV9M2I2c+0jc8XyNw7HBxpN6jfyyT+lpdzLmNpNZMboo81bLD01nEczXFFnWbBXuFrRYNmH+6kPsrqQgGZ+XaV5FaeyQdYZMFcd10xencLTIJHcVyJMDMYWmQq+zkW75yCMnn3e4zY1Xq1x1exXCN8OoYmb1poLgGjM0zYL8314ic+TbkkGweSDW55JHWW-Mdc2cprYG1+Tyx3eqZXJ4nLaohW1h3MbWv1pTbyXShlVc2c4U4gNXxm1xhD8HAogIZchmCjLvonHR-Fc2c-i5gvYXAlrT3UWOlgdJoxCAcfEmgvsCDZ3xd1kPSzADkWVIMWUV4IG+cwt3ze7jTl-Sva2iA0oIGHDh0R14y0KjLclCXR7LZw3BlssNeWGAd5YBXPlyGJmCjHWxsHD3t-5bA5Zt9Svf8pizdb1q0ElbZjA1tvTc22j1i03fr0zMiy22Vg0e1NGCou1c-7Ywu9Yq3b1tVdG2lVxkvTjaE1c3xKHt27f63-jYGctn-1ltLU2xN8nZA2C4qTchwoN88Ng2y4mXyd6Jp4QCkTbkoUfwn+N30oSKMN6UqM3FNtdbw2OGtjYOTnOjTfiItN9SbA3dN7HDZ2ZNmPlo33wWEYCWmNl7e-WLTVjfp3Ut1gLCmJN9tZ42b9Pjf0yBNiTKE20BqKe0bgNyQeV2dN9bco2oN5xJ8nsN3lca2uUF+tU2TdlxoV2aVtteV3WdqjaUBDNliYS2gVg3Y7NzNihrMa012Rr3LY9q5vDHVBiHaW2F3GQVfNcCrWuNGQBjHYtMPNnBrPnn7POef7la1-rVGoU7zY7DBXULYeNwtqndL0N15heiavQ3euh3Yd7HHh3r2gepobvm0VYR3Fi6MNTGOw9Mbm7lVuuvx2vIlDdp3idmhJbSRSj0aOH5JsAd-WSyuncaK1N2qPE2CKz1ZV33d-TY53Qdf725buPHnZmtt4-nd53BdmadCmRdp0rF224xDpga0Roffq4lJ9jfM6Q925vLLiBCPfZ2XeLXc6HZgMwV13fd+Nb92bTI3b32g91Dc42j9jcdMTeNwasSrbd3Nqs6Hdr-eabD9yeu02QDmTa921vMNuFGfRx9ZU2-6pA7onXBkjeZqQGkg4M35N1dZj2YDuA6dNE9vGGT2W06zbndlp8JosHt9yGPtHMWtQa+6GQk9rx1qfckb5bMa7GtxrrdqeLsqT25jQAAdKxbfmtDhFpWFVhAeX60LgXqGgBeoXLS0OMFnMF0PXW0XbdQx5fA-u3FGwde5GNW+fvV7uas1rjWDyrTOZ7GDufbsc8Wzfctn6p9ru19OOyIcdaa+l1riGupqI4CTxOvqZSGBpm-aX7aI4aeINRpwfvGnb9yaZ07ppx3aI3RgT7pzWwok9ur6bzQ+YyNBxVNt59kaq1pH2zdT1tn6x9rUd9bKjkQeFmZou3eLobQHldgPXtlwaKA7B6+uQ80+ylbeHXkpca9yR9lHZaPPYl+YcXAFxfdUDQ9iGZmONluY-MXerSw+yWHrII9UDD2-ZpfKT2t3b031d8kceTe91XY23pV0YdfaFFrg56XUk7dayXbjtrLO3H5-Xee6rhx0dZapD7jROOSDi44sirj0-YH2qx2WNSWYl5Y-cXVWl46FMklwfdKKoTtPZ93RR1ifYOTNuzZUWCQwmx2n4Vl7OLWfUQ6eL3jppyh3AsQGSERkRQW6dLXh3B6cblVbIbCmyhrV6Y+7XHcFZowTbRvg9lIQCbg+mVSr6c-gi98Scn2bR0Q9j86DnwrxWMgyGaSnoZzPyk44Z5dehC2Vn6Lxmy-KXfq70tsPZxmJSDU4JmLt6oFWPFQzvyWDZ-DryPLDtjRalyuTzEmZPDZpmeNnO582Z8DPZxdPxzX0sQzdnE1ko++7rar09cNgTDPUDnNor7RDnYjYI3DnQGZEyjnwzmOf9m45zE0TnEjXE0JMUjAkyJMnl7E9aW9ZmsPttUaBmaFLW5kiyZOHbR07NmxFq5av6PTgtaAdZYY22qdcxbM42n7NoJZWW6Zk9IAArEQjrPP7Mio86YxNmarPnyivZYzuZprTopioFs-wWFN6m2xndypezzOZZmTPqMI2TCAF6hwhAD7O6ET-XEqU4k0T3Y8t2sFMlNBLkdlmlReTZYLvRU85t7L3PK3FF09stxxPx1aBHG7dZzRZrce8VdzeOBT7ZasDdlnswmSh7cDOOWxw-JaLNClh9xs3Oj8YKu28-C9bdOWth5ay2WuvXeUXczz88JOmQ6iYclDwVze5dkXakN+2ApzJPu6OwDGdwC+B0lIEHdwpmOEGZz2C9BDALwxdcqyz1Gn7WKRwY1SPPjuc6KT7ctk+rTlz9z0hXYOdzdhXPN77v2nJJhvdYvrT9fzvgKYrU-GdaU6s9YDS0m7TYQgPZnM-92Llgd2zXT5ZfdPlZvuo9r3x6rZWEY1ypqoOSBwtaz1fyuxYqW00yC-uW7HWqHAFCgr49bOsT4Q4dXSolLb-2q2mU-9HHtnmMJ3IY+tbpg82x493o04ulbMXkUiyPq2Oj70oMg1Tqcsp2vLxjfWqBV90LUv9Q-sdXGkTjRuoBaGzJXHwfz1HaaL0dsk7HDfE72MEmGw5fcVXcSvyO1Wmd65aLCe3TtaNPIE7UH8i8drq-1WD+cY96v5V41bZLTVizdOLWr3kpnUkozksFLZUtfePPXAfXFCFOVuDml5YBPo-j3H1y1abjrVtuKoTcd1a-TDcdtvbPWNRxC8WQadzVcZLZdi8chLnd6scWjGmGMCbLWy8-cvCfVmX1vCrL-qK8OhD7NfBzU9x69IuATwg8w7NnfA0+ucAIOeINtotxMsnEbzxO8T146iP8SD4i6LYOV1yXZBvlN9k-Bul87PsV3zd5t1huSNNqpFH8buPbGvwyzRo3ro4ng7bqU9iaOhPlLv0889Cry9vWbNjs6CR3qKgsQORfzp2JPWxT7jSfWITpNdfWut99a5ANr4a4pXpAHa-CvxSmEAGuzrqAGCi1bmeIrDJrqKKT3LNxhtcjJt+fYoTfTqiHPXg6u66NWQw4m7izSy6G4pulopePaiGy7wyfk7wxDafCrooG4xPYl2WIQPkkqU8huOr16--VYbp+XhuwzwMSRucGDG9cm47tG+OjE75eOxvVvZDZpv0L+m-lWaD43cCueGgA6V2vgym57z-brK7pvObhew4a4V7g+Cg8UVm6s3U9jNarvgVp0PfPRz0WYYVn2n7YkHXL0wMWCytuy8GD1HQcImDar1gP23kLiEa58LwuvSv3ehViSk3fsGTZmcSAdy9zY8RK8-f7olpm7LC3FmUJuuub9lZikdnSiQJ7o4JIW57ODnM8DvYT205aBfQjBoWGNPfu86vB77IMuuCT2UUBCD7mostGWL3U9A33b68OXvrjn7Co317ze54Ft73W9di97uu+mD4L5wOPuLZj+9cNz7vZz8XoD7K44XMT29Pf9QV-c4HaaMHk4VryMlUetW69yGLEnIlqUYRWhTrUdkvPY3ze+jqZhS4agtLxmcgiQttpPUBG5MDMavEd2Rd4Sy5qYbCa2zhSYlOOw8Q8iuZ70K8JSbL-o063-D2sB63A6PrZhPu10I-y3AbQrZq24T3eoljmV7R7eR19ykfMuH5lTMMenDq+M-CGt5R9FDPCtR5upwUzOoDvzlnIHB3O92y+720E46GFuoIVHfFXh9nm8rHX75gIxLy9qfeuutMkJpieZFxm9PXJblTaQeLTfuvej8N0ov32ozUm5NPfAgRvAPYRig8-20Tva7M2G7ipMoa7thXtq20EmDvMawngJ+-ORbkJ73XkniW8JusIdJ+Yu5PXp-93Trp0fNvDGgo9iesd-QcNTbbpJ5-3Q60O-yD8nwA6dTNd8BsYF8DOero2oGm+44PK7nO4qf67mGNTX+D1PaQblH7lOg6gOvm+KvT6-da-OKrtp-5v3LDhpSfBn9k4GeBXaJ-UaL6025GOK+khrMeyAuJ5cLpn6XcZvaDwu6z7i7pg+P2-ivAyWiNn7Xa2fcbvB9pu9n3O+kwWbp+vieTnqXs8fVFyGOIfrt7Ruv61e8HpTHz6x+9cA8LnvHAEnjLTLofQBsZpYetRth84am9-h9TkhH8kcpF3WWqH7WL7SLZmbEq3BYESBa2bPReCrIpf0SdKv4+YC4jxobtz9jsAJBfVA3J-scbAMoclXWn4J8ef5j+44KX9MlE62JaJ1gPkePF5tzwuNJctqF3Se4K7UnMtq+4NX+j1F-vudRxQYdSEiykR9ZX7Nw69yFc3l4rOSywy5IeNqr2adKATcQ2QATDsw6msdmuay7tJeUp9FeVDro89fpckjJ0R+X0RZoXZX9B8hKEVVYc2bFJJZ8VDi3iGqdK6ARoFQBYgBABtSuq9YEmh4vJMciBzc5ZrCBl2mkK6gfXxy9aPerc5qZq4YWfJBzIpnZ4mPU3iSpSaL578qvmAu87Y-aX23UJlyc+qqpWupS46+-Kd50qtOBKKrd+YmwSsV7m2OKuZrDfgGgE0TeP95N4cO6ntrJ5fHWf4FqhozKfj5f6V1JP9e7351kDebs4N4fvFe3azgtz7YBuoAmgEIhefwLoKlXmOw-t7oqoPqipg-SquD6dKEP4BqQ-YKlD8Sq0Pxoow-SirD-0yb5p0pi3Sqj5pcvEqiuaYqV3meeKPcAsBjorqUWiqorpINlCVGnS6lEZAB3zBjorpRNj67e239M1zAcQHj+e5RwFWchjgNUl+Ab2P+j8KI2PqT7oq48YEqXnVAzd6dLqPqito+BPhj5NQBPlj-U+ZPqis4-ZP7j4He8gPj4E-jP-EGE-BwzATE-YKvD+AaCPp0qI+WjUqtI+CSg98S2j3id9rOLP92o+MprDT4ig5rScXyOn969+JGTLqqoBMprXfkC+hham9Hf0T517rSf8zu9UO03mjE0lf4DN4ffdX7OZoHI07XpQep4tB-i7GJux0tej3d9tFflS6e8gigepd8zeX3wud6smxyLvi-fLyCMJePP399Psggbl8F4jCHvFzwkm5UoZeS9pl7pOdSur6y+5JkL+kfktnUtyfjSlYFzet+n9quhJeQcW3TNvqX1qOeWpmo6bjHymsqHfX0qre8pEkV8Zr4ywmrhr1vgb-HweP8uxaA3Ab4Be-eah9ccPY239qIFE3-b6gBg2s9VDa+y+T6qr0rgut3qMv1YdFufW5r4uHh7yGJa-63g77QSIf+r+y-rnhforMWv8t+AbTx5YDl3SqtFJlA3VWUGx-YKoV9tLrvtsl-b8DB75WbwnxBKufpb9w8KM60PsqZrKfhB3p-2nvV5vdWftcuB-vy3w803fHkr9Kr7WyIB+-Oa9YMl4i+tcvZ+pf6K9mqBfp0vIbCaoXp8LwUPeRVASfpX8q-yny29F+oxyvY6s2s0b8nvbCkHEFRHYVAGpQQEckaknlh1yodZNMB97-An3mb9qn9MzJ6LL5n+Y862Vvoy+abf22Q-Tbfv9X-cB+WpQ7e+7SoIo5-xfgGntODOLcR-Sw-tGpe-vgaP9SuPv9lt-aYaJP9GEU-qX7Vajv1w57exmgy08O2fq76l-4-9MTz-zqBX+LoZW7gEbrcq5X+AazXhtvc6R3m1+Abmt-TMc7ZqkH41fmaxUPK-peTyT3fZv2acYOA-k+6fST2+v--aoOxhyX-Zf7Mvl+aa9X57+2vsXKqrCWsvsR+nU-argwmQ1sqms8zd6rhBz-grd533q2+Bv-AbardW9s8A1BNQAapCa0F-PzkXgU1vF-7OAP-ijcXqqbh3ql9Ux8IACXJmBMdcKADbvLR8IARvEwJnADf-l+xvJloIWPvADMboDZ0AcgCXQLIBUAYABh4AwBSd3fGZnxxA71RQBX1UAAPcBEAqAFdvTCZ4Ar6qLiI6rITaL6--Kz7nVIAHvjdgG--GQj-jcGpD-b8q+SSQ7tnY47U-JZph-C55rNKH72vWsA64YiKm4YvIvVbAGwCaQi6KRAGyAOay0QKaxIArO6YHCn5F-FcaRBJn7M7Tkr4AeQFnARQHvjZQGqA8uTaAjQElTbQFcgeN7IvNu6WtQQE1VOf55vDaontGn4SAwwFPBRn6RPc156PQMTafKv4xlDn6SAoq7GAl3YhA1lRhA-n62lNz543XZ7V3Q3645aMZV7U34ineh76ZIJBW-DGA2-bz5ebCb6wVFTwBvR95WAZ97eVT35tZb35WDX37mLf37V-Lf61-EP51HRv65UdGqKHQVrhAoMpx-Rf6J-aODJ-PYSp-YujPfV759A-QGtAwYEFnLjrt9UmoGAw74uHO3pl-Xt4eHDIYpXfZ5EvMX4nHJf60-cP7N-GxBA-JIFVVTv4D3HiCk-RKoWSEt5Opcf6GSYyRT-WoGNFIX5k3TwFIXHP5XQfYESA1f5DAiA6Z-TObjvWGrb-E4FkfOZohHUf7H-CYSP-F6qX-X-7X-ZgHTWDPT3-ALyIg5-5aCV-6MfGgF+fN-4BfX-5gAgAGjYTgHITEAH4g27zgAokGQAvz4EiMkGreOAGUghAGOA8gG4A1AHoAhkGYApQH2Am6osgr6qEA9kHEA5CakA5kEMA27zUA-kG0AvEF2TEUFKZCCSIg1gGredgE4AT-7cAuybaAPgHR-OaqppSj7pAz4GuAXwFLAhp6XPaQHO3CrzxTStQKAuwFzWFQF-EWwGfJbAFaAu0FOA2hQuAqR5GlSIH+A40GfDZtxyA80EWAy0G4KGwHqAzQFMg50EAgy5r4vYBousYQFPHIP6tNcQEGgp+5Gg7n4KPSx4ugBIEb-FoHAgqIFGAoIGFPSraxqdMG6-JioXvfX7bA1b4ZA435rA4jAknUU4UvOMY0YCliFA235xQasIH9Zl61fJgYVAt35VAj35XvKHrzfEKqNAySaGdEX4ObbwHB-Hb7XhA4EKHAVrKHOX6Zgqiq1-Jf4jAxYFb-NP6TA+cERAmv6zAskjbfVcFZgqiZz9KsG0FCv6bAsMGb-YEG1-IgTfAzoGRII4Gt-PX5IdDv46nKVpZkK4G2vFx50VQf6XfJ0o3Ao-7rBe4HSASf4ag8j5uDd4H-HUo65-P4EHA2FJ-A9f4CArcFrgywigg1z77-CEFq-N7z7VGSAwg98ZwgmUHKaREEGPVbwP-NEHWPO5Iv-XEGcicUE4grEG0gjEGEg5ajEgr-4AAuiEUgxiFUgz5LQAuiH0g9iGMgx0HCg1kEaA6iF2grkEfVHkG3ePkG8QjkEkA2AwrsASFUA7EGcQugE8A6UHJSeAA4QlgEQSNgFWACgAcAjiGA2FUE-jNUEGCfgE-gyMEj-cCFd7SCFxg964wQj0Ev3GCGJ9Zfjmg+gCWA5CZIA-XA2goMEOA-iGhgqYFughMF0NAcYxAiO4ozU4DyA1yEhgzyFqA-0EOgrAFOg3QH+NJIElgxL5pAscGpFTIEm-F6Jm-UD7BbVAR0EIoH2-dsFuveS7O-J1iu-ZKA9g-MbT-NjIqvWR5Dgi0wstBcG7AicGI1D257fW8FPfSP69AzcH9A7cFQQuYErg9+alFdcEZ-fyF6tS8E7g2Gh7g4aHTHZYHNHY77Hgnn6FGFz5mQ6YGTQr743gpCG5Ue8H3rW+5uAp0rnAjB7cgd8H1NEf4YQxhyAQqQDAQ06H6ZV4Hk-AKEzAgaFA0H4HdbOCEbEcaE5tbaFZyFCH7vNCFbVUIaQg9YJYQjSETCZEHwg5YCgwoiFfJUQCgw9EGYg9-7CQwGzf-GAH--U4CKQ5GEsQm7wv-AkRIw4AE0g7GFoApwF4wqwFOg7kGqQtkFSQgUFoA0SEUAiSEYwl6pCgnAGqQsUFUwiUE--KUGoApgFRfLSEKgnSF6QviEGQ-mE8A4yF+8UyF6AxKoPQiaGLgnwHxgrf7ZggIGegkwFx6UIFxfAyoXgpaoeg5MGkrZtyVqNT6-Qp8Fk-DwHNQtb56guWEHg+n4OQ16Heg5yGxqHXBuQomGaAwMGxQkMGJQmqGhfKDpawnL4XAsKERQ-AAOwjyHOwkSHBg3yFuwsp6ufFKHZ3MsGB-Gs6Vgvr40YdCaQgGECLYFhClFHKFdPMcLFQrBqdg994VQ937VQ54GR9AcGJVRb4qPZb4mwz75XQdoEdQ76FdQnoFzgjMGIQjaFfAv4FDQ6cHjA9P7ngiuG6gyIDLggv6jAwKFkxBaGl-A4GL9YqBnLQuGBtfqFitLaHAg-74AQQH6JAsEESVdCF0VTCHQgxEF4Q6axQwu-6--EiFVbMiHvVBGEBfEmEkgyiGow+iHow0+HMQ9GGsQ3GFsw6kEcwv-6Ow6+FIA8mGCQhmFWA2mHiQ1bySQz-5Mw9+EKQ6+HSQSUE-jVSHcwqya8w0wz8wpUFMQwyG8AkyEgQ78qIQZCAvkGCqJVV9DC0BCHANe6HRg8sE9whP5zAxyFvQuYHwQtaGPQueHIQpeGoQ78p-goGFveK6E3Q7BGwVI6HBA2QHL8K6Hp8bQCT-AqTbPSeHRTPBExwksqyw2yF+Ay2HAdXMHLQ1wD6w3qHrQzWFc-b2HrAwowyI7Mrt-I2GCI+f5O7MQGiIweE+hJMGKIsD43uQsHkI6WGnfL2Ho-E1oVmYxGPg-mqRw4G7RwzRG5fOOHKlbCw6Q5k7kjdOF1gzOGlAxKrlA3OFpySqEfvAuF9gqZ4yPBoEQvUYbNApuEyw1qFctdqFvqMYFdA7qENw5hEUImJFfAtxH5-UERECQv61w5mgbgxuF9Qp6EZIulhZIhYGzQox6s1Ev6rA0eGngni4Kvd2E7A02FfxNbCw0duE7QkNqytMMFqIjaqrwpaqMOEGGbw8GH4QneE5HciEwwuGGHw3-7HwqiEPwpSG0QwmHb4T+EkgrGHPwtiGf-LiGEwniGf-N+FiQimFCQuZFYA7+GqQv+FMQgBF7I1AGswjZHKQzmGMA2UE8w6STaQgbACw6SHITeBGiw8WHqw5BH-AVBEEYdBGNFV9CyAW6FtZXBHag9KGxg1wCtIgzjtI1DCfQqeF5I93AGw+d6-g86Frwy6HqSTSRMIkxGlFVhF5gi14Yoif6PApBFOlKWFfQ5uFmwnRHyw+yESI4hHNuGZz1jOFGx-XRF71aIGSIlMEbKPEQMo6hF-Q9wEaIrwGiAmyFNMMRGGgqQHawxqEVmEBGSoRlFHHC2Eio1lG1I3qySo7pHJQmxH2IiV6OIgU7cALKHvRIJA7UZf6QRTxFyrEtb9JSb45wl369g3v5e-OqGCFBqFw9W4EAQglG8kcuRbEWiAgUaXhcIl0GHvF6Kko+FHkooMjmw+RFyo3m5Kw947wdB44hImVGBoxMHBQtlHDgvt7ho0sGVzLVojgyyF+PayGctNExTgxJGRIboGzgruHRIlqFXQPVEzQuyHzQ4qBHghVEbA+pFbA9VE-vAhHXkL4gLUNuFh-MeGLGWVHOHYeHauMwaqI04EdVPwapoyEE3fU3RAoRe5bCbNFHGTpEt-PaEG-bP7jgq6A1HY7ylog9YmeapGVo95rtHZVHLwqDpx9AXoXQhwaJmUdEKqEjSODZ7ZfI5qotDMEYyAj4g3kMhGNIoK6fg-pGbOUchtbfhG15H5H4gNBH2ot7zPkP5HEo58ETbNFGbOK6Ej8N1GjXV9HBDAGEPjU77ENcI4tTSI4xDWvoxHBIYpDBI6VqfqYd9bI7VohTqrwdTqZHPIY9TPwB5HIoZFgyg5Rw2tEfAzibYXG-ppfFoA9nC4LisRtHCPI0Y1g3IF1A61G4BUuECxVFFRowUxBPEUwGIrY43uWz6wVI16LTVJGNFXFHAPKl6Oo09F3o3AL9-WIGhXF9G7-F17kYs6AO-Rgaorbs69nG8ZyY3GCdfSNGhvCdqcQdJpVVELZkTEzG0yKqqGorVpZw6SZmo8qEWovTGVnHN7dwozFC6Hh6lVKEBLkRZh4AD0DFfPu4-zaC5eIrPo28bjE01J1LU4AEFZ-TKphiPK4RYwdE9FOLGxWJ7Sxo1gLeYjXC+YxLEkzSIBqw2RERYhCjiEW4EZXSIBTnW8jIYTmrivM9ERYyn69gZLE8OWn7VARNKnAPsD6AZDC-fDCgt-LGDFY5GZQAPLE9oiLGag-lEmterGppDrGxXDZStY9rGVYvJ5dY+PozY7Yr9YkjGw1cMGznUjFVfTCrsYu0a2og45TY-5Er-IDEyYqQDUeP4jRYwEHRTPbF8o-BGFoilFCohbF0-INGKwsVFSIx3AJo5zFEjBLEPY6NHyo8bHLzZy68XVVE8orf5NQhLG1YompVwycFyHX7F-fcYHJIs7ExYoEEJYvhK-tMrEKZAeGfYr7GxWTtHU1T7FcXXSrVo+HHnYwzHA4upHjw4j48YoeHloigYPggbExlBT6ndAMBg4vHHDQUvJOfKlG71H5qApfLFDVQbYzYw4GTo44E01IbFRmG5pH-bYr3NBFCc1YXGFgPpEFY0lpNTeYHlHdqaxDTqbIYgjGoYsLJJHDDEpHMnEBJdI6BiPDHZHfIZEY7LpS4sP6go0cEhvYpGuAMrGNYzJKBHBLHS4qyGQRRX4rYzmrJAlF6pAp87OLJx7O4ke5aopaFOUb-5GUNLHxIFjGMvTKp2YxvYOY+94BI-OHWXcDFzffy4LfHbEdmdJIDogYHPQtpHjoy4Hc4slFUVV3GA4iYrno1R5fg4uh7aSOD9VGtGuvFjqQYr9EDIjeEX-YZHbwwiG7w4iGogg+E8CC3RHw8+HAI8+GsQhiEbI1ZFgA++EbIgmHPw7ZFMQ3ZF0wukEHInZHHIggHLIgwyyQsgHMwy5FL4yVH0ArmH3IyBGPIvmHPI2BH6Ql6rvI9UHAotQrhY-hqHYxySYoolFn496KSY9lGWcDhFHYrhE8I3iCeo9z7vDO16v7N1DaAO-HujMFEiAiFH+oylHtooKGtOGlEtoiVHcfaVGpfdnGPYkNEvRWKpKopFGXvJKHhwsZ4fY-N5NqeKg0Y4CyQgPIACTDxE5AiPEGDHxH2lGPEfvSoFBIhPERowsbJ4wcERI4RFQ3aDGeLTSZplGcT4AF8Z1DXPgRrMACUA5yaCw4AE3IoyHYTGcRgAfAGCE15HQI55EqQ1AGrlbFEhdfyb2ooKb-42WJm7NX6voCXA7-TAnn4+vFX4iGCaSdPgsAP9Fk-fQkoXR154HRPFa5WXGX45tyDIpvHd4iGEEQ4GpjIlEGww0iFd4n5IUQrEF94hZFrIwfFMQ0kGLI0fFBE8fFfVSfFH40mHyQ2AFz4qfEL43kFL485Ez4rQRXIoIkiEn+FqQ0GHygmQm6Qw-FCErgHCw1UGn48TGlFC3GaEhaYxcFTFovfaEzooAmxwqjHWfHVEg4dqi1UYgnh4sb4yrVS6mIs8o54WYCtEymhFvN97morN4uY9XKW4mMHYEzET7yAoDUY4HEdvMqGx46gnVAoLaNFUib-YhzzaVCxaAE3AJ8-WGr0403YQfLv4NIoHHAg3MBPANpLQJPPG+oxcEnvKiqRfT5JxvBFrBGAbTOJNMGyAOKHJ3fRBpgwqRj8acasqLeDvE-rSxvcGEUGN4m0fWiDp3TADvEz4kAk4WA-EqjxPA9bGVFOxF25ZUoGYuAl2tFJqWYzZpBIVYjQgDqgxgRACxAJjGDhGzGQ1KPElQrvD9EhAA1UQYlqEkQ7Fw0cqp43paM4vnFveGfT3UM7FO49V49Ysf5HYrFHXEyWFXYoRECo27H6osxHiIwIF24xUJoYt7HWE4nFgE22I-Y+7G1DTXETwovHIo4EGhdPnFopEwDcAWIBaYEyhm4mv62ErMEwY5qbcdVqZUtFXH19NXG0RDXGSdLXEdgdIZYY7vo4Y3vqG4m-bG4sfqm4oXHm49PEzYsHFDotPS0kjqiStJHGNEMTGDY8bHBkmHGfsGbGrYjC7oEzUle4rNaJo7y7e462yqYgOpeo+lKSpRyQ4xT04CnaS6NQykkuVUqH3nNTz03e6BbYrhrDJB-EGZVC7wPeTHf446EmJZhJOvNKGIzQa61gEWKNfRhAlbYdYxXDqC9k+x7SCBWJKxc0iqxYfjzrbWKPoZTGuAz3FE4iqwd7RbamxeE58YxAkM3Uq7mIkKFRPCfYhYnRxAvWa5HGFq5r1fkBmJKPCS4Nm67gA24clI24zXC8lylSUpcAJUrN3fq7tXMclcxTslGcV1jf3J+Cy3M252OD9ZecLskE3H9ZMk9W4Q3EGZMEmeIvXG7YxSNnyjoiuIKQb25TopDYibYXZWrQTaqJcXbVEvi6ugjsLB3X-b4-BuIoHa8poHZ3AYHS1EZpF-YjQ3A49XPF4EPHMnvfJ+A8HSpJPk4ikt3GC4sU-B4pA3MkaZfE4IuaUZzEg6ZxeI6akBPjhMQAABaFJypONJ15AGmIrJhJ0BGdtmemGq0Eu7005ONbibO1QQf6FOGFQJLyNgJBM6JtZLCR2kilOuKwfReKM9G8pyXWoFJ5i9EAE4YVwxWrK0FC6wQ1OlF1UCR0PWCLXlRmbXkNO3ZI2CHlPlxOsXAphFPBKMfxUpFhWEueMALO+lylmn-hNmqxJKsI5ytxY5x5yE5w+MyEnRE3S2uxApwDOPny70vswTOIZxl8CNxIUwZ0jOCc2RySJnwAKJmjm-hkTO8c2jO8DDTOL1EzOcTAzmNc1uCH50peQygSpMYCLO1IWlmFDSGpLp3SpdaKcR45xdmNs19sdtg+kIO2zJRFPn+Fbm0xZ-mpCE6Sdqg53nOYxN-s01MKpbaXrOUAFtxy1MfsfFKHOaixhAQlywuH9RjRBFzy+6RWIuAD3kCYFReeMIUQekl3hC79x1hRYRg8rDhrJNX16x9jk8uNeMu2lyy7uDaxuW+VNFJP0WjqOZNrmdwTupxTG1e-GIsR33X-O4+xquawUFcW9lAuP-hOWYaINe5CyKWrdy8e67g3kgAWK+wqwJWEVOXJSNP6pqgSCQOplwud30epFniRcMni+W7wT2Sb3nIuCIDcpcF3lcawWUEtF2KWQg3O6HRzBi0IWBpKlzYuQwMSpRNLpqZ4PNOtmwjBsJDemsVJRpClybkYlwMCZey+eP90+mYlJku5BL2WqK25C1ZOCp9QLpgOKwUxp9ygAfixbJPlJfBbCMyuI5K1BpCXiuqVMHJdWwceWwJYKoPxyx2t02uTazTJwZTzJBZQ8pTt3bJWzlAef1y281PgVU44iui3u3ReUMSqelJThiQtNyuq8y3WWr3ueOrwxpIj2ae6pV7uMq3FuR5MeizV2fW0FM1uctyGurlLh+NdJhAJq0NupoC8gu2UbC8135KXJQtWvJVfJmG2KBupQbpwFNrAVoS2uYGIgpGkUvJnGwCxO5XbpD5N4Oxt2fJmIHlKh1zXexZL8uMFOjp7DwZ2sdOVh8dO9WqC28MAN2gA6dN0Jpu3opA-zwp7+wIplM3BpoN3ZugezgppuwopJoNrA44iVwjjyvplswQpIV1TBW8GO815i+JQgD9uKbzopOFO6OUSSsJEdMipy5LYphxSzpj9SOekMQEOm9URpfVPBR-FkLJ+axVmagVLJNSHLJU7lisF5ylRNZNtpkpzfpVEEbJYKWbJAFOqADtIXOY8UTi9NKYuBx2-JKsMd6A5K4KywNK2ntJCpWt11pmgEnWd8GnWM5Pm4c5MXW4VLgZS5IQZK5JgAa5PyuDK3LpD1Mvmtz14xlV0UR1V2hIuUPKiaCRX2p5LHpfyUYcG-DD409Kfphu35AJjMAZP5M-W7DK8eBZSXpRxi7pA9ISivdNRUApTPAkTyHCQFNMZmzkcpi5NWpdtwSiQ9JtWH5LvJVYWXpSACaJ8B0vJr5OE2J1wJ2wjIbq06JXJ1QGtubCS2xe9NfpZFIX+LBKPpwiThu31wXu8SP5838nPpnqP9q65V1SupX2xHGJZJjO0EGZHSEaJTNjucJJXiO0V2inAIaGwgC8SqdzfGfTIdEONywpNuw-pXoJrGlu1-paqPkZITLFuDA1IpT1xBRl6LsZizUXiVNwrutRKsZOOyJuBd3yZRdwYOwvz86MNzaZmzIl2NRMup8zOoaEsHeenkA4pNT1vJu5XJpHDMmJ3NyfaoqJ0Zgt0Ce2jJLpfTxqu+jKZKhjPPJetzauJ4HDutlNrA5jPDpgjKvAtjIp29jLApcjOuZ-uwmu0TNcZcTPsiXYU8ZyUSWupOwyijdLogHa3JmKLKaug9JwpfYXXe6DP5ALjJAwbjMiZjgA3pvYSSZSqyGe49NJmF1xbpmTJPJ9BN3pNql32IdxoZIlQAZCLPWZP8VKZJPnLiXtyqZEDIfpAlNJZs9JfpDt1Kyh9MUxkdzaZ0d0qpnTKEAriTXiQzMOiAzN3ivTMOigSTDhdROg0EzKPpgXCvJFzJ8u5rIPJONP2ZyzLIaqzNFZ6YmKZ5zLlZVWIVZl6z2ZBGyFZ4IUWeJdxEiGzPLutrPVpWZKQZHT1uZ31MqewpE4p882qAGDPOpz50wuA1KgA5D1-mLjRr2qo0W6wpw6J5vw9sRDJKBJqLHCrLwlS-m0Vpw1Ilmb-hz2x4A5egjxB0pJPFWgr1nm9n0HCcW1P6lzOipUZDrJdazdpkLLceDDK5ZZcK4ZvtAoE8KXjoFF0YZ+VTHZrhPBhtqU5+VSIhgw5PtZo5OEZneIXZxW39pq0RmZ3ZKYZbZPdpkQGdpesSzJ0IR8e65MSuhdK3JVV0FuyjX3JUYRqudzK0CPLO4pL9OfZENk6e1dNXCaT1jZ1OwspqgWyeSzL5Z-ESOZZNxOZyu2KeSLy2ZkbPlZUdIxeKDIZEOdPtZBdI+ZKpNwau5OvZvzIfZ0bNIJ9kV-ZiT3+Z0JA-Z5YTZZATJGeNOJnpVt1fZW+ygpJV10SAbIhmQbPJus91he38Qgamz18a1TKxyzFJyuwpQeZfB2pZ77Nxe6L1Q5ajIgJ0pI0ZZdK0ZDzz+ZTzy-ZRqJ-Zbzz-ZHz36eKnOoOKTMJZHLIJ2M7JfZEzwXp5lLo5MzwY5BzNfizHIg5rHNWewiQReEB1weczPs5iDJ7ZCe0Q5K9K4pCDRxe42BTZe1ItMGJLeZxtMFOptNYCwk0BZfHHcUdLzLC5JPG+pbMzG5bJbS7L31YnLybZb2VveIxN4ZAr1YsPqMHCCHSDSkj1eZpNIhZL2Mtx41jTy8pP4pPrN7ZAHNpiO2I2CF+JiKWHNk5OHKcur2JJpKlV22pRCqJDiKgGA7J9hTtMeWSrxbWh7LdZlrxJZdrNYpTnPum7r1nR6bM7eEUBxxNtTX8ixJoJCVw5yU1K6+UxNmpCRQjexh1MOYEzhB3HJy5ZzxbSQSEh+oxKnsq3Km5DDw6EqPwuOwRAaZbrLLe72PGcaPC+ANby+gbbSMAjbze5Lb0y8NQ1KaM3O7eKNWZxwmLay4+QF6OhNg5TjIKpl3NlgU70aKM7zayexI2x0P0XeWX3JGq70pZ29NCmRxLeQO70aKUYLMq4bMzJnXK4SKXMcxyxM-e+cwW5Ab1O5D5XGJK3zsqqpikWAH2D6wHzw55f3A+V2PkWLXPeiwPJeivPJ55baMaK-PMgiwvNliovKHmgvNKK4vOvmkvP0y7bP0yjn02JpRVWhxeLKJFHwmJgHCY+pRTU+NQ2-+gPO0+uvN0+iVX0+sFSVRQ4xXxgPLM+8o0B5on0B5En0Sq9vMaKcn0NhovWx5+mKIsOpR15OpT15NQwN53vKN5jRRN5DvMM+JLQt55vKE+NvJ0hgPPl5bWUV5oeJ6AKvJFqdBMOp0PIP8O50DOMumRh-eKC+xGNopF3IaJWVKCqZl00hjyPOES2LG5uJwr5Wtkh28WI9hpDwuK45Ey+suW3J33T0WgBUK+6oQXpw2KPZf33UkI3O7ZhD2zGQDy6JrlRO5aXPFRvVnx5qUMc53nKo+WexF+swxgAvXx4m-XxcI4+CG+nolEmplMLZ3iOi52YxWGqPycxntKBmlXJtRjHOHBUSPzxc6NcAkvH7hbUKzROBy6BncN1aV-LFJEvzu+8wNyRnsLLR1Ey26dhLscUiWy51WJuJ1-K-ikvx-xHSIB+XSNRJe-wSKBT1JSu9ULkTfNIyz2KesN7lmAsP33Z1KymO57UQFjfMh+qAr+xGyiRJY7xsJdeKImtYAcJnyS3hCIPnZThPbxHhM3Z9AoxBveMORwhP8JBIKvhbAvfGwRLWRoRKiJJIPCJsAOJh3AvchZMIuRERLiJAgpphMRN-hSRJXxsgtSJG+IyJ4CJ3xbkygRioOVBRRNEJiCJNezGPxAZ41M5L0UJ+Ayh1+CpM4ZOxIoxKk20RBTDdarYythC7xZ+c7wBeKfPqe4nJzBcHV6siPIwJqvLuhgZJ6JwBKgA4AoOxzbhl+H0IlhipNvpCZNTJllQSKqv0vGxdHLYZoDMFXrLg5VzJ2Z9RJmpkoiyBdbKO2ASlIg07QLZgLN7AJDJpSTvy7BgSJWJd9UZJDBPCRRgsLml-JAFb-PxxmaKhxj-JzRcOJf5TQsCFvtFbhSEi-5s7y6BtGGGFQrUg69aL7hoIgGFuAuXZ2OL-5liJVpBOK6FTKOaRO0lnhgwrvBAuMo5ZGNiFH4Jzy7g3RRjkk0AnknfQPY1eStXKPpw3Mx8t+Me5VWDAhYwtAFhCJeh7QvDISwsiFCPKoRKZIOhpRRQRH6N-R4UzkAegpEqZpKPplfTgxxOhtJiGNVxvfUSGjpJK5BGOSOsaiGmHpOyGZENU6WR29JBGKmmufOT5FySuxirRsFEpLse91Ik5LfMHZpgPMBpwADh9gOtBMUODhPkPihzgNGFAQrmhaHI8FbrUT6ZoLthfoLpFNIttBRyJDhDIr8hMQoGO9TWNhzIuERBIqLe9gsgJRBxth4UJch-sKihQcP5F9IqUBCUI-x43KhpRIoaq6HJCFFXlthxBnthSoq8hLsNDhGosjp8WwzJ6QvK53fKyF7nhyF9YJrcmSL3Y9L235xQvWApQom5pUIqF8eJqBvuMM5tQv9Z9QvL+jQuWFlcIzRt2lD+zwrGAnQoiFmJPGFzovmBOSPRxr4Kf5BSJuFtoqA2uf0TFJaLsFP-IrRyaIWFuuJOJvuMzF6aJaRiYozakAoXh0AuFFzy1KKzDJ7520D75Vws44pwo7CQgIoF0mMOFrYpIFI7KTW-gtf5PQrWFGCMzarwvjFo4uiFnwt8FbWR+FqED+F-g2UkgIq38wIrVZkQCoFgNhoFkMNbxbhL3hHeM+S8MNYF1yI4F5IMCJ0gt4FI+NmRY+KfhERJEFOyPEFKRMph8+MUFpyOkFyRMyJaRPPFKgu3xh1QeRKUieReRK0FshOKJugozFs7MsFEEK38IiNsFj7XcFT2IExeS0VRlEKZFQ4pZFcEtJFhXLcUyEpgF8g0aKCPw15kEukOkorzFrIvglcnLWZoNNuAXKOAFYYvcarY0IFAFU5RR42nFSfKtFL53Ixi-IDxhQokppJ3dFI3ETh6UD6qqOFThZBL359mPKF-iPJ5wSNIFtUNP5jTPP54qNDFbwusFEOPv5bQogFHQvrhKEu6Fz1yzxZSOTF+4PWFT32GFN03HFiOIeFvQsGh-cMMl0wo7RVOMWhngqrRxYurxkPJwZWuT2B0EKqq88PrgtYpYlSaKI6g3NChvfJ7FgpLz570U7F+woMJEAlClLgotMFuPeB+IpbhRCK8lY4rjF5koBRHwuRJsAsD576PnFRWP+FeACBRYEplx5Asil9hMbx1AubxtAtv+u4oYFkyK8JoNWmRR4vSJJ4rRhG+OHx5IP4FBRMEFN4uEFS+OnxmRKfF8RJfF8gr4+igs-F3Uq-+34ruRv4t3x-4v3xgErgR2goQRYsPbFuIoglfuIBOxEtglPdU+Z5Eqa+RiLQKNEuUldXNIlGEsExyiKOlWUtwloorxFczWglhItOl6EocF56N6sKiOKlm0r4ZZ0oYlRAqgA70p8FrEun57EqwFhEu229ou1R9fO7FxhAYxqgGbZFxCKFGcLLJ5tI7BEktS5fopklO9ODyar3gF0NLK+LYudRfxFdRsFHdRGfWXFOjwIln0peMD0qlFu9QQSL0vmFQmNK5xPLhpV7O+lCEtpWEFwBxvHKS+LbSUlE4uaF9FVaFUYo0ldcLzRZkrW5FkuLR1koqRzx3zFM3RO+yPJWhlfzSlEsoFlUsuyRUwsVlEYu552oqFcswu7R10u+OBnQWqc0xuGzbgdx5guJW3XMQp3ZC+IzdMtlpe1yln6K7F3ajtln6LJldMEbFZIuClEMFEZoGNkxf9Ociq4qClPogqlm4qql24roF3hImRnhObxMyOUFrUsvh7UtvhIRKvFYRN6ldILvFU+IfFg0qkFk0uwBgCPph18PfFLMOUFoCMyJECPUFe+NyJLyOphJ+NAlAMvgZj9JtFVgsypJtMxZ03LoxohBhlIktlikXPEl1p3p5eBMWU-iM3a36gNQFx2GJjmJp5aVNcx4oqN+G3PDeTWj1RdAjOpdYrvuTctfOS7WRlVJMlEG1PUSsUoV4WtI15DPOMxaTTzZzRJowoW0sxcMvzZPEtrBinKRlYksd+3otHlq2WH8TizCl6-TnlqEu36zek8xvlWPIWWP8xVVRkoti2KaPOLCx5hLscUWIZJWozixbvLclSBNGxQrlSxBwIyxiozu5n9NcA5fJxFL0Q1w+UuyxTqVwVbEv7FGVIX6KCvKWpY3kcl2IkBAgBOQfJOIV3JNgJ6UpGxbcwQWZhMmx92Wmx8sPoVUMEYV6wRIVQMs3lG8u2FIoqtRcku2xCkqJml2P-BDCPxlWxFMJ1wNkVFMrLFWiJshMEvgJz0plFJOP1ezgodlWouea9EvZlcaMZlGpNIVOwssRfMp0lFkurhCSM6hMYq0lLCtVl4YtdlsMvJa5SKXRdkt-5CsoZlSstVpQpJOldxyclsvO-5MwvslGrQNlbf17R-DTZJj6ObcnJK2Fh8oWehEyBh3ksXhihLayXsp65zYp7FJ2Kulx0ueaouPoR+KXQ6pRMhKwcsmZjU1gxVpPgxyuMhFdpOhFKGOSG8Iu1xiIrNa2GNEAuGNRFA-XwxtESxFfpMyVLrLuFBaJWFDaPcVtKICOPRDXIzivz57wqnFy2NYqOEoh5CjLK5GQr85Hti4lK-KvllEJDx3Ev8qvEsRlxDJ3l2cNRlZPO7BS3OCA-XMgpgYsFZwYsHC8UvuFAspHFGUvc64srmVIn0yljcrRJvMpWA801yoFeL6qXMrXZXKEqVFEo3FsIIjlLhJqlzeP3hB4qmRPhMRhogqmlicqWRwCI6lOMLTl54qEFmcv6lOcv2R-UoSJRcuRVJcvXxfePLlqgtmlVcvmlNcvyJ0hPrlq0o9lG6HOFa4p9l0UuuFBirBmgUptluSt9lvYrWl9MWtlLuN-xTKqoghx1-lKkopRmirCV2isk5jguPA2EpVlHyo3JtMorpGPyQljHyTeKJNSFFovWVUPKVmQPGS5YswDirooRl37MWGJypH5r8vNRUktoJGMuVekiqq50iq5QIrIolHHhRoHBN063BMKmvBPEJsACkJ1MM3xIsLEJEAGQAAarAm8CNUhChLwVT2WUJBUrfQ4POZl3j0tZDFL1I2hNFVBkAil9g3xRPYuMJAqosFZUodeMLJjVK4tKl2arscEKtwhUKtGRsKv3FT-wRVLAt8JyKpRhA+K4FQ+JTlfAqxVk0s2RE+Kzl0goGlBKtfhRKrkFxcoUFa+KARzaumlt3krlL1RyJmgqWlwEp0FjKo+lJS1NlRkqRIHXJEVaQuBlVHP1VdooC5HcuZpIOFp4a5lNV98tYxpysHlHr16JYtBpJBJNqoj0uRSU8tjxM8sPs53P5l3X1-uhQEC5jlQWJPoqqh4-I7C6xOa55ONDRHPI2lIdB6RjRSU+qYpLF3h2-K5xLgAL9CuJhStYV63ML5mFWL5YMKcJgwlWEUJJhJ4JN+J2gH+JfTKBJ3EhBJThLBJWN2hJEJPw1LH1hJpGto+iJK1VB3IsVoOxeivnKwJf8u3gOJJcRIOHxJdJKJJJJPaJ56rZ5zD0tVKMvku2eDvVdJPYoGatuujqrP59yuOScStYJCStw6XJLgVHYpZV2CsiAlwpilnKvcpEGtbluko0Vj6sqRsqvOlhiMKMevNmVdfNslu0t1FWxI1Vmn1QJXwox+peILxxdH1JfVSNJSitrxbHTkVFpMVx1pO6m0RyhFYWviOLStoiCIpJyHSvdJXSs9JPStyGRuMxFJuINGSqveijytGVrio0QYZIfVMKIim0ZPKVtEoJ+XyvXla0wq11otG5CX22ZayublqbL4uaMWE8ItDc2xrhBwMGBQgc5FowilJNA-cpKFlqo4eUdlTKvvhUGx8oY8BBUYeP6vEpByoflsMBZpGdnC5Nyt169ZPZC1lL2FotP0K9lNkZwXGJZm2GVO3lKM1fNKch0-Da8h2rlCQqpBp-lNO1pfiCpu6vXZx2pvqO2v75IJSipVMyNqTNO7uz9kX8NbIAVzKTbmaKy151Czp5KjINVGGutmasxEEi2qLEjF3q152LipXNBGpSVIW5VZLlmls2-exSytm1+XmpPAnek9sywZu6ripZaS7l6fMe+q812p1fPR176o2Vk2sXl2OtRUa8oJ1eqripJYn8UW1MvSA5zCW8s2p1e6v85RVMQWOVMZ1A-MEpfHLLFfHHekLczGppoEmpP8tcFI9351fORypPpzLBEi3C+3sxx1VYn5mX4lhpGqIGCucwhl+XLiuRcxeifMG8FRsubqVIUAJTih4AYbEq47cSrmXnJF1VWIEuzoUYycVIYA4J2LOr5V22roUlKWxG2Cv1NxlE9IBp52qI5SiQyCXvgzsnFw+OSvPBCs7kwZ92u4CkNKP8NNM6WjayUeNWuCCabKPVRdjR++5MMCvNM21Ugx7YvwUT1Wyx91AF0WZFtPkuEusA1XNUKMOH3VQ8etzpENI3cm-VT1OSpPZWZMZpSCpKk7enZcVCrBlNQA-cOyRRkxAB-cOyyr1QF1cqteuW5iErs8rOLg1bFMppQqzT1yu048MvjkBoPO0EHuq1cBghOx4RBIA2+q0Eu+sjyVHisI4uHiAmUmP1p+sQc++ov1V+tuWoOqD1w4CHeUgB31nuvv1LoEv1sOqz18HJZ1-eqpqHCpHu8TR+YfITH1rOF-c2NOhIuNIZOeGGj1vrUX1-rWhCh9171Y1Q0mk+jB8W+rf1H+r315+p0UR+pwNJ+rz1vQnwN4REyk2BpJk0vFwNZ+pOxl+sINVBt5IO+pINX+sv1ZrPg5EEM8p8Uxv1n+vwN9Bpv1LBr4Nj+sd1PesyF8YkAN+0qH1oBupCX7nH1FECgNCzMdZ0eJn1Uerr1zOLj5oetb1VNMMVJWLG8G+s6in-G4NRBtv1yji-1h+oENeBoP1V+sMNZgJ4Nlhof1DBuoAmkmYN9hu-1V+p6pdyzjplBqcN1BpP1vBroNOEAsNtBof1PVJuCEbK3ldME41JtQrcolypCBtIkuhHJEpU2sPVA2uflcl3HJ5DM0NSW1uVTquU1GA25Vf1KUxjjI4NOQDoZXSzIVQjO9pYwzr15NR3ZAjJBV9jjHZk9P74tEF2uwut1Vy+udWGQVVZUmJikq2kTpaFPIOOuq1gmL2Q5wVIvZz+r9paCQYAJBsYW0nK-ynur22VdMflBjLPJddI7Cq7luoW2TreWFHQo91zbp95N0pgnOgpfJS8Z-dOAWZO3tWoTKZZrcUx5WLI1uX5OEZOt105UACyZNQpA5QLI+NmcWdZBTIK5brJj459PLi-1x9uDGH25YipKNAtxl2TrK+Ns2LA5OMt0NWzig5XHJg5VfI6NEJvuZLnKbuQnOgKLzIZp2DLENkTC5oRZNJ1AwWLZ6aBIZHD1U8o9hb12Rpgpq2uKWZRvT11r3VR62qHAwjL21LtKO17LMz5gYlO5S7OcO9RocRlRu5NIlwnJYjNdSM6yH4UjM1i85NjAwTJ3VCjPPZyjJ0N7zL2mixqk5mHOmNsxsAeh5JWNxTAOQWxtpczb12Ntqw1qVxvuNaxsa5O5SvJeuBvJDLNpZ010TZspXXpiTPfJ2JscA8LJyVe2tog-5IqNq7xFNkACCZxRs-x-7KM5oL1me8kryNgbKheFnNA2SJszKfCK3VaJtcl-LIeu0JuDyPRp5V31zg2BhoQ2GFNjWkDOf20DNsOuVGHpKJvaNoupY2YN3TNcWQ0JlFIt26Byt2Jatd0N9PmVkSGE2hPOq1M-IyZGJvjZjzIZZcaQT1mesr5IZsIWC2rwwLmy6SxlIMCylNpWsXMvVhJ3gNNRsiYg2AiwEZQ0ZrbO1BfVlCVuAU7ZtWvCNFNKiNuuvF1GdknNdC2SNOXU9FMVPc8+8qw2DRomNyqvm2Wpqs1ynk+eeppP5YZvYaYLycaLJM6xcJqWeIDXjNYjUTN4JoPNdWr1VNzLKuR6HVNq+1GNgePqZECqfSAe1Oe9qt51X0rVNL5sUq8xqPQ2pri5b5pYan5vo5Q9VLhY9SKArQ1K+cZvAaNnJKeyytRN26pTNyDL7NxxsgKHnKNp3TzpKuXPbu7xtq61XIfx2xQRp-ouDpLDMiA9+zGRMpX5NsVkFNZCuNOFjxEtiGxLmIBSSuAdOqFPXQKN3spbcUoWRZw5oc5lZqmNVKTiiR5pp1-uIdFu-ODygrlXNjrAjK1yuzeIOqCVTs3-l8fMMgQCtJQPED64+CpaaFD06Jz-SgVLsoTsS+qTVdWMOMiCt11kkxQV5JgkA8fLCgzlpjQe6ObcQiuP5cF0IVsVrscZWPdliyq-lLiqUJbc0H1g4WaxtCr7Rc2N3RgGLitGoPeV9muQV7Cs2aSFg2C+Vp5xhVugVtYHitKyq7N6ZOEVGtNCRhFqU1PxrUKKioSl35VExexrQlL2Rgtr0rMV+itmZ4ioux3CqwV5FTa5JpuXGu9RmNmFuvcDeqZlieqtlvxyeVPQttx7Is2cqVr+RnghSRhmrQt8FK++7OE5wQUH5OMqtMgEhqtNpiveaSBu0lpWoA6B61utsYByt1moGQj1totk1q-xnhT6tYyp2tsopStOmPKxyAEOtT1rstsstetCxh+lVPzFa51vJwV1vVVC+oWM5iuktJ1sIGMNtjA7LmANSBMQNaNvGt3Mva+JZTBVbrMrVyEy3hq0ABqFGujl3wFGR1aPcJNauYF1UvrVDUpseq3nLAoMLj5YNXzVNpjnFzssLVtYH2tRWPk1twtn+W1qPpkvjUlnUWqOk+mvCW4jKxDoiUAYADfY5ore1N0siR5cPnlC-1iRQso6BIsscVYssy1TSJ6FmsqMVcsoclhYpCV6NoStLMqxt3iqNa1Q3lV3F2clLGsBloFtWV9Fsa1LcsWyIOGV6muszZawMRUV5tIZDZ1Eu6TJYKbWrLCD5vKtqjJeyuFqH5anMSNDqs6t4ZtraJFrSSa6r1FlFokAaZVEaZIDs5FZpatJdvRNkJuwtNVhGtWWrgtb2QSebFt2ZPTxE5CVvOeFkRMNd1ujZUFpqsidukm+FuBeimpuZGdt-NsJrItrrJDlKzzztHHMReyJp+t2luLtulv45LnITZtdtYt75v5ZBHNeAnFvatskrTt1DKjNlfku1vRt65w7MDldqN0etYFEtO5pVVy7Kktdtq9prjzktGFIUtQ1sNCN9pBVB7JspIcq71ntu9ZZdq+xbvMm6IOHeku-CaOxQNp1sony+SdqUNmmNKh5LEXyom1iqdeVXO6TKjZcrjb132S88sZpuoDF07NeXKougepyVAtN0x39te17GqtVagwAdOVlgdkcjeyUuost0lDwac3Qx19toFODC2VK8PL55l9sgiQAqR5avOCtZ0BMqLvIbifDpyAiDoEdtiJ1VTup0tGezMK8-Im6XvSviJltoKoduuATAyodk2RUtSeJhN3xq0d+VR0170QGtlE0WtVdq1l7RlttamJyAWap1KBjoWtz5oYlzOO4dGVoiuB9rjpdhuCNbhr5tA3I-tVSuSithuMNvBscNzhuINeBqENHjrpgAtoXF5atrA7ODStx1uqUZNpyVgyKaVBGK0E1Nui1ASSyJ6nVEdD-E+RySrTx2dt01Y3jsVE0lGEDOnLiYAALtkB1CIGooxaOpLoli1tPND-BAdgPIQd5LCQdrXzY13tpQdn0rUCWyu3laRoXNIlvPG9Ds-lGNusgOTNgpe9tZWejsgi1jrqd0xuMdzPzHiZjpBlzKrbaszoc1X+W7tJjp-wa1ogtrtIAxczu3gb1uadBNvN0RNrft+Rq8dz9uDAsNpMVH5V6sGhrFtdlnidcdIpt2GujlqTsb6yEyeJSmQZtzkqZtO4urVscuYFXNsRBPNumgOTpPtQkydlETrNldjmidv6KednkEHFNirHtkIxltN0jR88tpl8oxFVt0yvVtSZIOJ6mJTRktolFqkriRD-MNt9IFjFqGsytZLveEMsqvtjtvllgeKa5LQt2d61p1BFmqxxESq7Ra50Wdrto5dUjqJ5SZo1tpdv7sYFpHNAlOa1UBnLc0dt9kX3hDsf0x9IZqsKcs5qG1jcjJsudktsfHK0piHhHuZJvywqrvm1gDuh1zZ0ZUKr3pNYQWyVTqShmDlO9NB2ppNaV1CpHrjDpGevK5kAF8pb3lJkzRvdduDosdLrqe1C5ODNYro1tTASUZtfI2VEls2d25JVKFdrbtxZ1lWBgU2NKACNNspD+IBgVXex9xhCNHOW1HlKA5XVo+NpFswA5Fv+NYByotFTqLtnTtDdP9pixmdMOediwQtHN2z1CAvmdsbsFuS1s2WSbvf8Kbu2Nxpv917-jeNVZrlKnG20JBgSvADpsfJ8811KNxslEbpuHdmIE9Nj+PkWbDK0ty+qoZNd2-NYhwahxbtLdOSvHtK80nttnJAtkroVNo5pyAJFMLdacTrNIcutZNFIxtMAFbNnytgZTFLnt1cyddIxsXt-ZufpOJt4p0rrfOC20+1eUKLsCzr-OFetwCAmwHdeDsL1spw9cIeo-dDrJgNEeuMG5NmOCzOMwEdH18CzeprJqBqZMHerjpPrrddzJp0tohqjdLNK2d4wXwdwlu1uX9xrJ3urrcx6yn16RovcqHuVpvPysAJzXuswWKHNHrtw9KMHw9TYq-twutI9aFr44nOPZqOVrUC0htH18TTkNOgEn1UDoO2U6m1dCw2ZxAAFIwALQxvvFkb4Qh3zMbYqFMBQjiJaRyLfHYwbpADQa79UIaAnb4bO3ZZ6AjaEafcf-qdaeJ7H0Hjakje+4wDT59v3PIaFPUh7lDZWTWPZ9bIgBp6tPb3YEPY4Fk9XLqQ6ZABDPT2baaXFNTPT4amDX4bXDfwbjDYIb7Pb-qpXQ+sADbc7JDQMFpPeAbZPZAbfPeHr-Pcp7tPWh7YqiF6VPTp7UHdobyFS-qDgk-qVTdF7vDYE6E3awbAjel7UvcIbu9fiayPWLMVgRzVjLtIi6UCqAz2G9TTXEcqk9Wg7ZThg619Sq5sHfaybrJsVOOImq63XLS5Xk79FXZLM2PYUYavdp61afIyBLoZaXAj07FHepiKTat1WbJQy+2Y0DeSXHF1ndDaMLe090PVYAmrZqKLHdM6LTM96mXQnaXze974JpyaLtQc6wfm263vaJiDcC8bWTX8bW3XtMKPRsa5rU0QYfQf9AYQGbK+gJ0tBFp630DTaPEpwAeQGsIcfcYZ1OpgIU+kDYAAE1L4w70h2a6prCcSEDKjLVCm8J1JW8jnwujOwxOho3ZauO2FG4nA+Nezqb20h3gXaxVcugq7hK3-nO2-G29WGn3L+QX0rU2e2va+0IyugkIb2eV1OUfQhygLrVygXqARgJ8CIyGDCIyXqA9a2k79OsO1G2XNhc2EqDoCFk4AZAMVsNK11DQNU4gglFnCm90yF4+e2w+rrx+U4j1NJT13OO732WMyOm8mN5ycawPxEnDs4XFWQShqFdjBQTz24wD7W961ETsMUCxz6pvVr+Y9Tj800AY61XV06rUodpdFT22FwRZe+X0tu4D3fangQQqUamf+DFQuCT1p5qLvx1zabkdySv3I6tuY1+jGAt+7nWy60X0e2BXUZPMy5xqTlScKJETF+i6n+usc3mWX6ad+o2Zt+wv0d+k1SkkrP0865h0DBPv0nU4rkqqdLCyqB1h4TU91j+7K4CXDd1wRKylCW9X7mccL0TYvZKvoc-01km10B+iUjmcOr2lG5x3bFUmSP+473pC8N2u67WnTc8ASruRf30exl0r6p2oCe9S1v+2L01zUr0eU2KquqWJRoekdy5sSv0f+hU2ne2R1Aeksnh+u+Wzai9UlsjymCuZv0L+p-25MtYKZm3n0P2-ODITWAPcAEGzDG5NXNhcWzgKi-1jO-u1ChZ1Wu+twXjkvjG3yzJKVqKgOB0uKJCW7Yqxeoz3RZF-1Xaqvj+YkH2eytS2O0wd5me9-UoTFgQHIY6K0QBQAzbM9lSzR8D50mWogYTD31Q7aQ1AEE3oyvf1XUpT3Z7R0WSWrN4lnZWYp+32nwZZf0Em-07G6IR1NGUy6+fJzRSJPgODZZu3yO8HV+ZH3TR5LwxygXf3E8xfkzGQPqflGh2MOLmhlTdYyby0YoQLHQPlXYUzy5FHVtwZc1L+7v2telJYe8qX1CY0y4OXWS31sRySxBoCqoWi1n0BooMxejR3YpACj32qADO8GINkeUcZkKJoPZZUcaUedPi95KF2kDMCooWjG2L81h0tpYDWo0-AC48m56bmjXnUVcYMzO+gCfeoX0HSleZ4I6YN5pHw7q8lb6repJX1irHnLBsR2VzOX37+kj0UpSN09+p80oEW9maM17FVXLN1PMwc06mgFkzej805G9zlKsms2lZfmj+gHR2PfZgAegQs3qElNXGCt1C0QVPA4O7s3Jm+e3Ocpi1VJWgOcGx5LrQC4MV2uSDXB2W4GcjBn3BvRmPBte2ac+mTcWuOKXu7d3Oq9TFxq3Cl6kX4PNm0vQAh96JaEkEMSO2pkw+5NZt1EQ1SzFL5RepyhIhnRmqOCB1pjL6kp23T2RerjU5K4QNfetRXiBhPjv+ia0RGyulMezCWsYbuLlrI-kmBqNl+2mjDwhjkNpFMe4dhEi5ia5B4i0tn21gGYTWe5L1-+5QMGCVQPMSho1betl2bB48EcPYxbqBxGk4FNAPZBsB3gy4O2zm6fXyXO0Mw+o-1206rmCB1U1jxMVHM4iqq5O-Ko4C3WXsh-L3z6woytVGoNEzJfIWRVUNRhjmW9WPYPlBjdDhhp6XeaIMPu+i53zVP5W8JNFJW4TEBV4jx4PunzqdgblK1Ots3rqA0l+anjmby6uaeGgvmuhy80Sa5j3FB9IPGBlZ12+tOLSldh7+h-x7nBu53M47NLWW2hliBqK6pSnoOZq4PJQ8Qa0PK-xkFOz32gh3+3v2jbWFht1CbqlZ1LfOcPF0YsOOAUsPjhhowmyvw6bhz9i-jBsPgWhrW1uyR2pXMIJq+m0z9ap+V4B1doPGOv1eKJgOfGmOmuq6j2GBqdGUBppQ0Blb36+BgMUPL8O9hkmI4reE2Y4l+3-+xdm9rYgx8BqQO5bLTnNemH2Mmw9wSBoUMsFG13bFY-XGh3mymhtQOnsnMnQhcpzaB3IUQgPQNXu8gPVxO1WKhynXV61fVURp5JWBqXUfyinn7Umuw8+-dXO6N7Jl6WUMuFYvmeBppTeBi52L8tf0C6gIPtTIIMhBjiW+B+y55GPIOFGISMhytoOdGA4M+28f0maiP2CmFIM6XNINcRhkJMO7p2SVWHlZPUR64fVYMlNCv4mq1BoFzFSMaIy0yjPGcWQRTsydgOf7W6xpZ26vOIHvYooNLZYM7HPCxZs2cUW3H5VkNWW6fUzcxaRiV1HBsHbKmxr16WwMNfMy4M7O5EOXG7HbWMl+khc7t24h0hL4hqRWTO2lbEhmBlJwaH3kh8MyUh4VVpqmkMdO28M3hiEMIcqEOQhLAVic7MOpRxEPnSvxmZRyZ4-u55mYh4coPB81V+xVyI4h3llpxQqP6B4qPpoUqMlmpOBkhxx3v0m-TobIEN1Rtq2NRzaPCh3s2N3J+pMhju6Ae50PxcbqOAB2VJ8e04NNelEK1PU21Ni8AO-pbKVShxT1KI1wNyhzJYInEZ0K+pUNJB9KNqhp6kahzIpuuELnUXdS0GhgiNKBoiN+8M0PiRnsOWhla2HKeyOSa-SMTy0iPCex0PjayY2bKy724BuOL+bLJYoR2k08WwkPgSmAoWRSMPt2oyquB48NnQPi1RmUmPLW7SBzWiZb31WW764KmMBuofKJh+mP16+GNbBzl1fKTMMcBq4Mjh3MNJqiQ5xZIsOgoEsPAq4V1dOhPy7qXzq2RzzU1h+rR1hu0Rlh68Pe23qmnu5X3y+1X3TmlMgP9enL4Mz9x3XB33mPJPzrBVPzKnWARugWrywwZhnrBR10u++R73+mXgGnPsWZzRo0Wxt7xeU4yzMRN5w82JYP6u4l2dbPWW8ukb1FsghVZ06BCikWcDexsjbbpbJFm9DF1iSW7xuADFJLlTYXqQwaLhu49B0AfOARgGQTmgYgAsoeOPabROOLCZOMUu6nyZSCMgnuz2N5xqp4vgfhVlx13YVxogRVx-W2pxwAR6AeuPhuuFmPG6vwgNAyV1SSuNFOiiLaAD0o5x2GBXgNZgxpL7kJqsVioAAPE7GlQCa-YUBWeRi3HFZi37Xe27umY-b4eSsT5sb9K4GMeOQ4zqLACfCH-AJnxK+Hb6X0kM2kczTkKGqiBXgPd0g0g8LtxzuORi-1LWlPuPCoaMAwsFzmxM1jyjsynE+K9SL1u7eOr0qiDbUoeNveEeM0tJQY6dcorhuro1kBvQ1Hx6MATiJOPjxi7TlIq+OcAMACThW+NtQ++Me+5zxxxuBMU9D4SMCL+OjotOMZx1by7Q6NV5kyCNwJm+U0BVgqiary3H+hSWrqiW03R4VlffOhPlMuCSTClMXPu2FFkKobblaz6PaRhrXeBJt3neoJCWiAThagakLPh30N8J7n1HR2qLCJ3BNo4myWBTBaYegbcMpmmRMLKsbn-pBSL2hIIJ1eMpx+DYt0gOz0GQJ6p47x9GgzW9YIAaA9GiJxBMItd3B2xkJQCs2QMceTBPJgbBOVxmo7XhW7y1CIhNhrHxNkJ330UJqtitx2e4dxqJM1x1bzpxlyCZxqAVTolhMPxn0MzADhNrazRO727q1xSlF1JRoiVitfDw+J6JOl0RmLfgkFUWJn6HwM6xMDexVnQFOKmqJ9ATqJgwJlJqiB1dfhPC-KJqBRK8F1Jxo70JxdlRk0xMvG1pMRTFGOtW+zm2J-dwDbVJWTJB2ItHdOKpJ0DaAafNiEGIFyOoEFwcKAw1aCTUQDab4AeiMAARgRAA3J4Axk5E7wFJ8hOxxlJNUJzxZHJsNDOoKVnMJ1bw+aw0l2iZ5O++2BNledYKfJlQze1anx+J5BOBJvN3exkpPKJ1ZbOiATgaJt0Uzes2MANIY6ThyJJtJssEjJt4EmhcZMntcFMnJyl3HEorVmJ3+1Ep39p6GM86GGGQwjMswy99LeA2HGqNZyawiUp890ih7qpYUOZPtJqr0kuwRNQS39ozaGlw2GMlOSJidF5JwXGe06lNXQWlPaCelPfqEwxMpuTYIRxhyBZclgUseSN7OwiVqk1G5s4-7085F4L2h362skvlnq-N0BYIsiOdJl+PVm6bm9Jt8D9J9-wgp2D2AuJQzHJ75NQp8FpIJgJMQRwZMTOipMDikZUCh5yLEpj1NfJ24ASpyz6VE+ZOMxWv4Kpgwy76aQzKpxlOzWULIGpjPLdxKMk2EONNsporV8pjWNxRlF6KJtBOqveZ74pzLlGWvRPzosJM3UugQkpr1PCy8lMbqvNMtpk6HtJ5APZXcN3JrJe1rJjmWhx2FyDjIJNpm9BNbOfZNYJw5PUuWxhEAZ4BQ+C5Mo5a5O3J+5PqmGEC4TRJM9s4t2UJ0FPH7UVMzpmsA-JrOMnef5NGkoFObpln13kC2OYIy064wd7Ze+wFE3pmBMc63ZNhwadPWGOlwK2n1P+J0Iiwp0M3PBiegIpnpPIp9ASop413v+YZPDVbFPfBjtN4pnRPVJraVXQPdPvp2dOOAaNPGJt5XSJ+NNlHdcCSGZNNGGFVPpp5lMutGZMLTXNOYZ-NNIkQtOwc60Z1tYZKvoK1Mwh0BOd7OVOvpywz7p54BoZ1gLpK3yUtJrDM0pnDP6GJVNv6AjOg1DNNgMsnLqpp8adQZwDap-GMhWp1LOJBCMWRIdMgdJZOiKhRMT+JRNAZ79QuiWIDs6jfQkxN7xIZtN0cZ71MeIb9OYC6EIBpyynaJqpOsh6pThptjPIZg9PqS9tO7GttNZi+VMCZulN4Z9hghZOQyEZtVPZp0jOcppqPcpnFMFp0LMNRu8OK+zTNlp3I1Bpp0x2Zi6NUy39oTp8JMNpt9MmZ1DOuZyVO542VNNJ6cPUZrtN8XHtMCc6EPMRYSkuhn7pqmQZjBc1MZsJ3jDFlV6IEge9PF0DQTw3eYbp8CgCMAAADc2MleAVqe8E+hApOKEFEA8gAumMGEiwcoBmz2vpFAe2CkAiMj2wDAFmz3wDnIs2blAe2Ad8q0FmztGEQAMlKxA4uFmAG2e+AMkB3Ac5FZAMkGzws2eQAIoFmzevoYATEBFAsgBkgWNV2zUgAKAjgERkAAEV9CF1rTgPEBtAKyA9QAwB9AH9mIwExAjAHgCZKfIBkANQBYgKIBVoOqZnfMtADcN8AmIN8BWQPIAuzt9nBkB6BVoLAJZAKgAnwHOQBQB9tOtbAAnwOiALpo4B8ADJScQKyBBCBQBs8MtnxcFyBYgN9nVoBdMBQKcBoAKtB9CAUB0APoAcQI4BVoDJT2WDuB4AD2cuzjBgIwNShWQLMBvgIjJRAOgBoABdNs8EYBvgOnxZgOgBZALRgjAAzmuzqIBYADJB5gDJAcQLAAsQEYBqAAbhM+DtcuQKIBEZDJTs8PRh0APMBvgHrmsQDJT9AHKBQpEYAhTBxgdwPIAYML1B4gLRhp+NngBQDuAcQIjJVoNoAdwFIAZKdSg9sDiAZKdoAZKZwAic8rmdwAwAWANoAmIL1BRAEYA5yDJBaMN9mFc7AI5QDJAEonthK844AWAPoR5ABQAmIKIAnwB6ADNBdN4gFyB0AGmxHfOgBqUG6B9ANoAWAJHmYMHHnOc-oAZKQUBu8LEAnfDqAIwIbhZgNnhYgB9t0AL5Ja3OnwIwBQBZADiAKAE+B5ALEALprDFuc91n5gBdMCc4jJOAG6BEZNoAGAO3mrs9nhvgBGAjAChAdQNQAWPvvJ5AAbhtADHQKAATnaMDmAsQBdN9AKyB0AF2d8AJwBaMPDn4gOLhTgE9nXKPEAZIPAAPQNnhOADBhYgB6BMADuBeoCwBYgDBgQUIIRxcL1BtANAAUIAUALpt9mLpkYA5QAKBMAHtguQG6BTgLIBvs-iARQNnh0+OgBYBAlEpAPoBxcAbhX-hdNBCIjIFQPIBs8OLhs8LIB4gDiAXWNJALpjuBYgLEAdQMYSZIDJBdAKtAKAHKB5ADJToAIbhBCIyz4AN9nw8ywBTgLAARQNoAYMGfm5yLMAdwDqAWAAKACgFC0IwN9nHAFIARQMgBZAFYXDCOnxYBLRgmUAbhO891msQJgA3QPMBkAKrmFgDuB4gKcARQAwABQBQA5yIgAdQKMx4gNlVYgPIAstN-noAPEABQOnwLpriBaME+ApAE+BeoN9n4gMgAZINQAsQPIBvs71BTgHOQesw75ZAChBE818Ac6E+BZgKIABQPoA5yEfnZgDBgmILRh5wKgBvgKIAmIFyB5gFIBvswUBRAL1AYMLRgUILIBdc9oAVQAbgPQG-RMAOgB+oL1B0+NAAuzvIA5QPiApAHORxcDfRZALMAIC51q5yNSgnwPoRs8AwBbs3thvczuBh8+cBWQIaSUII4AZIJwAcQF2dTgB6BkAB6AdwOnx9CDiAdQNEAuzunneoAwBvgBQBEZCqRZgCPnEAAbhVoLMAds6cBeoAKAYMNSgdwNnh5gNoBqUChAdwFyAYMIgBoAHOQUILMBYAAUA3QNjIuzh6BRAF2cdwF2cnwCwBxcE+Bs8DJTkAIIQ5yNQB5AKgB0+LEAUIJjUnwOnxAS3MAjALRhqULAJk8wYXqC9ShMACwWuoPMAds7ABs8AbhUAE7nYQPEAGANSguzvoAgQIjILs7RgmIDQJb87XnqAPoA3QHthEZIKhvgEEWWANABs8DJBZAB6BxcOLh0+Hthq3tABqUFIXEADJACgFiBQcyKAPQHthZAOLg3QAUBZgIfmCgIsBqUJGXD840wEorAImIN9nYAOLhaMLfmUIDiA5QC+A5QExB0AAbgdQJwBRAJ4XoAB6BWQIGWRQEkXYBKIB4gE+Asc9ABWQDuBxcDBhkANnh0AN9nbqBdBaMHth4gKIBvgJwAIwO2X8AExAsQFyBQS1IBtfRt4Qi9QB5gCKABQF2cuzpgB5AIIR0ALAB58+gADs7EBTgAWXRAEzm9sB6BdoHORRABt45QDiApANnh9AFyAjAGmx5AIOWnwGjn4i-gABQPMBaMBdneoKgAWAGgXvgB6Awyy9h4ANnhVoHthQUPIA9sAKBqABQBeIM2WbCOLhYBOLgjAOgA5yDiAYMOgAm8wUABgObl5AOgBEKwwBtAKgA9sL1B4AKyAZKTmwLptoBvszuBqC66W+yzqAsQIXmkC7RhBCBdNqUPoBaMCwAmIF2dfC9ABlczaXqUB9migChAYMFiAbC0YAns-gXQkNYBqC3KBYBHOQEc9ngCgPEB9ALMBEZAKB9COLhoACKAE2JSl4gJRX1y9hWZKXORvsxt5WQDBgCgDJSyK0+A8QKIByy0xBYAHfn4gPoReoPoREZExACgN9n0AEYA7i2TgyJvPm5QOgBxcKIADcDiB4AHKAES26AcQJohBCPEA1mJ9muzqMx2gLIACgDuXqAI3mdQNngcQLJX4gPAAmIGJhYS9oB9CFiA5yHtgYdFiB0+GLmCgBcA+C48WdQFIB8ABGATDtsRtAJVkuQGrmBQLIB9S+Ln4gJ6W7gLIBTgAmxHAN9mnwAwAHyxxgpAIaSRQPEB0APAAgi8IWNs-NmCqyhBO898BVoHOQ5yEsJf001tAWm1ncqJoB4AGxQcAOnx0+FCAGAC6BMIPoAXQAagxwy76nfd66q+CRGXfTStLY0lN7q-67PfVenf8ToTw3S7HAUZ9WgDGWr94xqmmUCgAyYCZJq3hrhnWGABjq6dXlBBdXqALAAdU1TM2sZ1QDfKCm0UvE0-KhtX7ZPk7cYFGS-8ZdS6vGvGa2jp5yiW76iswptg-fxAtjL4AgAA"));
var crossex_html=itgz.decompressFromEncodedURIComponent("DwEwlgbgBAxgNgQwM5ILwCIY3QPgFBSFSiSyIqoDkWA+gOYBOCADgBaVRgga2MusBaLADsAtrgJEpJaFx4wacAPYIQAUwZCYY9GWRpKy1RpoAjJQA8OSAC4BPOGowB3LjdYAuAIwAGHwFIAblMEGABrRiUAV2EQISVlBg8oZ1YwGzVA8CRmRDsPU2VwwNY1MDpWG28-IIAvATBYtQtkgE52wKVmUPT8nwA6AA5A5iUkdLAlYQ8EUyQEqIzAiSlVohlCOUwFI3UGGhg0uDiRcUJbBydKGy6PACYAViDR8ZtJ6dn5uEXM1xB3ZK+AJZMA5PIFIphQJSUQIBh0RqA5gWQKUHBrNaSDEYjbwfRUGAMMZIZq7DQcOSGFR7GBgBjwNRaMRo4AAenAEHw2Ok7MgXJxvM5WNWGy2tCQCFEuTUNGESjeMEZp10eIo2xoEqljll8rAit0F0cGGyuQQ+TlwjUuDZHP5a1x5DQ6u6lrgujFChdajgTPE6IxwuxDvx6pss3d3FDs19ujt3OkpkWN2EUDhYAQAkQpm9GAAwlFbEpRGBamooAAVNJIKAAcSYbF0IAQYaERJQzTezAELwmUwwDHKlV0RKN6BuCU7Ksd8hoYcKjTC1dCbwgVs4kfUADMEFE4DYAPLMNTCGNx+P2sCiOhQQ1OdBdHr2by6P7uDB3Hwrc88xM2ZPowNz2AX9k1TAcMyzHN0AAZTUOFDl0KAmxbQliQ7MAux7N4+3QAcKhsYcEjvcc9wwqcQ1oOc4AXJAIwwWD4NYWdZmo4RF1PQDv0IYBL2vJB6WNZsEA8S8EDoNRWWYYQ6GCZA1AANgAFgAGjAAA1AAhfcACVnB8ABpGs6CUABBMyTIAOWggBVVgAFFrLocyNKc8yAE1cxMgBFZz9M3CA1NqcyTI0msQA08trLssyABkawABVzVkLFYDSfLM3MNIAK2ggAxAApCyzI0+T8tcugAEl0vi0yMpM+TzJActzMPVz6tEczcoAZlzGBdzswZgpM0R8pi7SfB81lFLUeLahiwbzPymA7NYAAtGBnDMgARJAAFlzIAdi2kyYBACAAEca3SsyAAkQDsuALO0rzN1ELaNMU6z9NgrbhBi+SAGpnPO6y4Dsry1K8xS7EUrry126zWnLNztPLGtBjUwYGGssBWAqxSwDc0QLGYQmwn3XNzrgfcNNEGttOg+SkC8otNzofTWQqQaNK6msvBgAANfcTLucHWRM1alEUirVqifLVvLOya1zOtrOsmLWDoZwYBi+kawB1hTAFpR8oeHwDogMIAZAVkuuEeLNw2+S2PLb0GDrTckAFrwGAFxp8ugxSfAsMA7mYXM7gOkAcoQGtTH3AB1eKE+00QKvktSIHi8sbHO+KwggGtcsPVh9zcmxoJ8CqKtYJPcrcuwlPkm6-bUhhanOmKy5AaybucCw3IsWlWgOrKIDgTSkBrURBlaNTBbs1kbDcuA7nym6GC8sBc0geTRAs-TrOLXa7DCeK7NMbTTB8GswjuCLvrc9bc2YLavFsrbdosxTWi6i+LFqGEEyFVFQAyQJuUwrAogVToAnCAbkkaiFaF5OEAM3IWVYF5La2dWDOH3IpVazh8ryVZHYfc+86DlmYEpAGFcKrMEGGfBuGkQBqWcHYGAdBCE+DuGpJAdwibZUGHQc6URVppFqA8MACd2EgAOkgcsuYbD5RsFlO4FUTIJzcoMOyu0vKiHLHYGwy0wheQYLrNSFgBZHQBvJbS8UYroLUNBXMq0vAWAQNpJACdah2XLGAAWdsbC7UGALJA5CBYSWYDANS5YKrlAOs4BgFgspdQsF4XMWUlB2U3KYiAXgKq1C8K0Wo+V4qsFqPJA651bCtFWrtRACJ9wQC2ltNyAtRBdVCl4G6N0LBhGsudXGblTrWU3PJXKMAvCmEzgLCyohRAC2zvuBgN1FLDTsHZCqrQbpqGcM4Ny-wvDOATgDAGphoJ2XiqtRO8UvIbS8BpVkphNpeSxudXKEBBhbU3LzKIB0E77iyrUDSQ1jh2TUoc+mrAQA1msvJNyXV8pwHadpOAJktoVWcLtLKFVglxOCSC6yOL6oWS2nZeSu1ajWQYLtY6lLjq5m0rUHw1lgr5QFtpXKCcbraTCKi6mogvAQFWjWOAog1A+TsHSiqdgYqKzlfDZwalMV4Kyl5CwQLdpeH0kFNVJltYWA+edYKuZWA+G0mpc1orco+AVswHwCAE5eDgDALq2lDYCzMiS6VYBg67T9bUXauUvLSq2koHwu1yxKFqPuaCSBsXhuxfuZptQ6D7XMqte6kKQC5QsiK4Q2kurtORSZO6XUQB2AeMwUwogbC1DcncXKzhVrQQeBAGAErTCj2cAgIaD1crljCNBKI+jcy5i-FxYgzykxTH9FOognFuTAVnSmNMEFZhQTNQgaSZZKxljUuuwoahqx1n4GoEAiFkIZlQu2CwnZuxjF7MIfsg4CJQBHMRJQE4yJ6DVJRFiNE6LoG3QwGwSBmLzjYkgDiC6RS8RvAJdA16RKwnEpJaSskSRKVUppHSelDLGWClZWyDk2rRWciZTy10zJuRihPU1AsNIVQTgLDNJkFHmRinZZw0UpQHPMrfMV1keXaTcpFZwCK7itBsDFUQuUwimDXnAGKwhKgwCGmZeKW1WiKRgEXLKCBeFVxrMi1adxvjxWgjFCA-zBhgAqmKs+0EOUWWsj4Zw5YmNbVWgnVgzBoI3WYHYVaakLLyXLHAbSWU1B1qyonLes1FJ0HijdOg8k1B82cKYBOakfBuWgh9HLFgogwFqMwRSVn8prRrK0MA9rSvlZsKtTlrAYp2BgWoLaFWjYaUdSysAXkU7wNEI5BOdkvBeQqnZfNnbHJWUUncGKCddoWDJXQOgFlAFRCjW5SNn8lueTDXZB4MUgqKTO3ZOazVNVZRFkC6yXUKqeUqi957JkwDxTACZQYnbU77jgPlOy2kwBFYTiVsrwXRUIIqqIc1IAbr1Xa7-EAXU+ogCDVEUwSK-q+IePuIdEAZVE9xcY0QqcYpzIeKYQtpRcxeFK76r7P2-uiH3GENFMA7gWTsAgJjjqE6tGgTdfKYRVpZTYETVoXgQBbR8A50HiliuNZ6161osP4eI-ksjxnDwat1dbQ8LKSmfCriLs4S7O3cz2YqjdSopgawPFjWp4xE2LJVaUAj3S+4wCDAgDT3aUQ3LDaJtZIP0nZNdVYKwGA1uLAxTu-7hOpv4lg4h+V2o2a7iy-lwgXlPgYDhogDFR4c15OKeU3J-NFzdPtJMkTwOFuupubUExlTXhkVc+l52iyUWBarTgDTryuLFfK8h722rPhscWSUNjky6u4c+AR0juwQuYBVv1-VttxuPwdprKwCAsKSmx1aBb3xVubd25sA7p35Dose693g33HabpqTsKYXM7bO0wBFTWXaIrwdB9csogEd-9dpA548OtxIst2cedfNbVsd8prIlNWgkAqsNJRUDdCsUFJ9p9Z8uoTJ00so7IrcTIlBywE5cpDME4zY8DvpOsYCwg4DKC7VrIPVYVEYKpcVsViDgkto6B8Ue4o10s6U3JKUspy46UYAGUPtbd1NusLIWsPUbV8s2CYU4V1duCcU7I+CBCo0hDywRC2lxDJCtppC6VZCr9C9mALIlNtJmBVphAwYBUrNZUZV49moLtFYuoVU7JFIgV7tcUltmouoAjnBU8lcmMLJywqF8oacLJ8saCspVpQYrkXNIiTIognU4ByYsowg8EtpWBHotpQ15UvIeDdobAyVrIvAT4vBCY04vDxU3JAE7UzDagLIBFnALJcwGDjlIofA7FassoQBnVB9C18ptI5dCYQ9Rt5JMDqCvJ5J9MD8j9agT81UuddpRsB4RoVME5xEWivIqjRA7IfALIwAvBWBxMT5ltcpWAcUT5Oi7JpVIoCEHNoD+j3MIskUHCLMg9wcL5udplgD7owYqsMixEnMgUKoHgo1qJxM4B9iFNxcdCyUvIvACsriCdrI5oE5ZVxddofACc0hhCupVpei6AVjD9at1jas8EmD-das7AKDWgxdyx5dwCYFqS1iNj2c4ASjHl387hVoa0NCKoOdD9Mobpg9vgKpVUA4YFRVdp5ikF38WCqsa1KDhBW1T9a1aRmdBhMsvjBjoIxVM9mS1ByxktUtRdxdmBywWs7IAZ5SLAQsawxCHcIg3UuUQBhAljg8EinUhcqsspO0rVYU1IwhU9M8IVs9usa1hAEjg8jcUjwT0ijZMjsjcjYT4TCZItkSxdeD0TMToJsTIo8SCSsoiSSSwAySKTuT3Vco-SliQA7gijTAspOS7tpVK48Fcxg4LJJtNUk0LIsk7ALiPMtslBsVKSfTmz-TljpNRAEcQAY9RBNJzM1IQDpihttIRtHJrJ98aTj96T5SKp487t2YJtrj-jeTcwwgwAzsbSRcizmAJRCtYy1J4zJd3Ua07gf4KokyYUNzozQcvyfzEzkyki0y0j8pITsygV8j9xCjijSjyxyjHiqitoai6iGj8Z5VmjWjVp2jOi3Jui5ymyWz5I2yOyuy6yezwCPMKZBzhyUKZyxylAJy-VujagZzdpKLfTFyu8Vy7p1zNzeEdz5c9yDy6AjzVjaSNjzzLzCD9IbzG1vh7zHzbcEjtJ+9iT94lAUydSE4vJ1dfcnzagbTcxWh3SxDrJeELBDSYoo9XcvALJ2d-MfSO02IXStoLAJ9Wgp9m98D6ptJhjRiXUadtINJa1e9vLtBdo-K3Tod5J9Fcp7Zvtftyc2diZmB4py8lNkU794ELNyZhANJ8D9yucD9C9+L3pRA3I7tI07A-Axy4A2s4lm8awdCUKrUT5-Utp7jtivIHhOjrIDkE5rJBgXK7SJcJRrSUsbK7K0r5NMqfsXLKrsdqr2yO1usgShycttz7pcpw9Aoj8OErKlrbLUrwrApEV8poleV-zFI-LnAO0cqAcgdotrLdN9wXd9MXVYVnT5TnBWQ1AboNJbybBjhMpB9RAzKgL4lZoHgDp9IHh0VzI7IQAfAwYIZtIlAuobARSupBc2DUYTI1EbBcpzoE55J3ztIAY7gPtcoxJ5I7hRBoIY1nAlANIUYIBWRzpnBaZz4lAxdoJBgvIaxcg4AvI1Asp6cGB5YyoKoohWBD5N4psHgKofB8oog6Atoso1IzU6Awh9IsovFoJ9IvIOdzpoIwgwgwwKoGA7hTBWQsoHgkAu4g0K0uoogupNwE5-lNxtJhAKoL19w5kkFhBNxhBFJBh3TrJcoNybByx4oEBagvIsFQYohmAKolsE4zIo9NwDpWBrIBYHhcoTIDot5cx4o1BAF1B3F2c7hCRVp5hPc1ALJSskBag7AZosVWAupmAzJoEER3ALIwgNIDo7BgF8ofBvIy4vI6BNx9xdoHJdF8oLBWQMZ7NNlhAj4TJagLAerscwoQDWRhBzoBYaw1A1IAY8jl75IGBE4Oos7KxzoNJ4pLJzAcLWQKpsxL7r58o7B5M7I7IpY4YE44BzpdpbdOYNI7gQl6do8wY7BQHhAUBtJ5JqJoy3IEBq5cpah4oogYp26XVrIu6E5mAIBFJtIbp8ETJyxnAbokB8pcwlAAY7AkA1IBYLAvJEALBrJzlQ4IA7IBZTAYpejWh9IKoYpnAkANIIAy0lB9ElA7g7AcZcobpBg4BoJmAHgvIAZrJWQvBVpTAwMYAb4lBWRtFWAaw-aTI7IIAgowBsEYALBD8rUIAntl7k5TBzpWQ-8t6toIA6Bco7Bcw3JWRC98pLQYANItpFJcwDpWRtJ1lgtnAdElGJZnBNsMa7AaxQHagwZoI1J0gsobphAEByxEd4p5IgrRA6GD9ZVahWAkySELAcHhA7ceqawogGAfBNwFawBzpoYvIBY5Ki0jaEAupQhoIBZxkBZFJD07JcxdpkVeivBFJFmW4oE+1DC0qE5hBx0dY1ykAfAEh20kAbo7gax+kHhoEQAW1BhU6BY7mvB+83GlGjcvAE4wBJMfAbprIbBraJp66toBZnAtpgXNV9w9JywLILIbodsV6NMKohatoLJWRtdnB4och8pcp9I3IXGuCQob4Hg1M8nwDbZdo6AvJoIuouptjy4W1FZdpdp9xTB4pfBGrVo1BtJ9JVob4Lt1aeiIAZ8LI1JdoGBtJQY1JTAnJWh4pdo3IwALA7JaaEBuVsc+12FkQ4AZGYAchzoHg1Izpo5Mpdo6HKFcw6AAZrNoI6AriGp65tI88MgblnBagspVEkBkp+IEBVpaZepywM7iCHgBYvlnAbaohoJIE7IYBkAHZOi4BwdPmvITHdpM5Vpz4ohI5wBWQbpWgsp4oGAwKxbTAtp5JHbZ7LEQBuNNwfB82BYVVQWspbLWQIB+6nzFJhAFa7I9oTVywYpdpjnVowhWRcprI-oup9IAZhYNIDHai1A7Abo4AHgTI1Ibp9J9IEA1AOWwhS67BNUHW6A7h1iYBkQpIo0NG1A9kYpCQIBWAMLTBloaiLAGAJ3+GBHrWsVcxnTksZqCGUssoBYtpyx8lnBP79IMCBZrMvBQgfBagAO1KGArTWRnAHgQBv0HgvA7gvAqYtpzo06TIwhHVcokA7BmNWBBgLIQHwtlY6BcwW0Pw7AREE6LJdpWR0VtI6ALAGkYlKal2bAQAYAyo4ALBqn64b7haHhoPBsxGLB5OQATp9JrSON+ONJoEYpRjWBoiwByxNxahyw2GzJ8oNIAYuokAYAAZC75J9lmWraMITI6GqpwiUFnltIQlHarTC6TIzQ4ANIEBWkohywoh9xrIKokApPhAl801nADoNM6BoIKoEBPaGBMSelrTVpaUwO7g1MgEUsgvk9cwhsz5yxKqYprJfNmOTIpFnB5btJK7yhm99IbAKoBZXZRAHh9Irw1A7hcwkDLks0kA3IqU1J5JBgAYfA1Im2zIspHklBWAEBNx9JwgN4hsEByPcp5JWAOky6au0U5ZBhFIjUAZHALI-oTJm27AwAwAcXdp9u6BGrahjWBKzE1I7IWAuh8pzp-vZbnBNwLBcx9IhkFkwh-uGANIE5movUkAvAzCFbmbvI2YxENE7B9PFJ8jcpwHxMNIIgNIgcDpTAQBzolAAWLJuUTIvA6AFa+03hRBhAjwE4FFnAj43IkABD8owBaE7ABYfBmBUDRB4oKpWQmMvAwgOSO0IAHgCuYpNxBhElFJaguo7Ato6PxE7BWRoJ4RmAax+04BB1h1R1RBx1J0uI2QQI504M4Ml0gxre11wJMxN04A8wVvd0oATIQ5qwy2ugNA3gT0r0hJWw0J70MJH1Xh3hX18JCJRwSJJw-0nQAMoNFxgNvfQRINWJ2JlQzwF0eIrxEMYBBIwxUMxIolMMQhsMVJ1ItJdIDIjJaozISN7JHIsbgpQVqMho6MGNzJcwmMWM2NzJONYoeM+NmABMzJcpBhRA4ARNeVxMJqpMZM5MFMiqVMAbNMTJtNdN9MqCjM8tHMzN-irMbM7MHMnMqs5l3NPNvNfN-NAsocwsIsosYs4sEtPsrrUt0tjTstct8tCsSucHCrkqwuZN8DWSHM1laztZOs3WSIn1gzrSVZiY2CbFNhmwfV5sgcAuqtnWybZtsu2fbLtEOwmRjsp2c7Jdmuze8AidwB7E9jez0CPshpVnF9WByj5gBkOOygvk1wr4UcaOEApjkQK44TsBOAuMThxR4pWclOCyNTlpxqB6cjOANEwM+oc5XU3OXnPzmDLC45qkuJBDLmmIREx85WDIlwKXxa4dc6+PXJgS3xG4TcZuZtJbgEqX57cjuZ3OpjdwP5eUT+P3AHgBL7lQ84eFflHhjxx4E89eHLCnjYHp5mAEFHPOmHzx1Vi8peVfhXmRRV5-c0EWvF6gbyKQm8LeNvDFA7yqDu8+8PvAPiHwj408KuflANjzzjQEhm1fmKIGcBY4ccJeaLCXj4S+YoqhaOaOfnAJODr8Lg-6ltXdQdpdqheXPPEKLwl4ncyQ9fmkJryBVgqM+OfNkItxQFf+sBELCwUQLIFpMaBFzBgVqxb40oJ+ZYaFSIIkEBKZBCgvvxoLnD6CnxBkswVtQpF2C4pLQrwTpR6FywBhaQtEXhRUo9CZhGQg5isIKElCNWW1G5DUIcFNCWKbQroUELEpyw-wyKJSjTR8FzCx0MEfIRsJ2EHCThOyC4VS5hoLy8qVzvKjsg+FyUoRLKDUS1ReETIdIg1AYKiIxFmAcRJMokVTKpEISmZLItA1yJeRziQac4pFjCDLYHKFkP-NhXyiNVK4-hLaO0K0SKQLI+JCwArHmQKx86arPop5m+LhUS2kVcYtpEmLTFg8fguYgsSdRLEeSilekmEV2g1hVodZEotdi8g0DxswSMMgAJ8Bqjxs12HjGOxeIkUwg5JSrmtFS5PCBiPxR6uZm+DB4NWSmQ6qCQehwVISoqHIuQiIHB4Wi+PfYmpFe6VEyUfKANPUQVjWRTs5YBTInFWhs58S7lHqi1SVJ-5VStlHLLak1KdidSGQ7LKIFpC24RhO1Wqt1i2hKZPG4QYVKKk4LEEwRw4sYaOM5EiiLI9yJBLCEAJVYL4XUZetpCbQ1pvs0qXMDjENK-9YxZpOABaVspWkXy2gx0gLBBr+UVqXpKklRUXKBkBcIZFzGGQ3LqEoyMZLPLLmYBQUeRyRPkRmS9SCjsxogXMVogbSVdCxxY7CmWMuL1ZIo1Y2sQcQbEVQmxZxE+I2SEqtl2yg+eij6iYr9lWKGqacu5WjSxoByvFfioJQXJ2jlyq5cShgUkqxCZKoeOSseV5JnlMUKla8lcQ0ogFFKD5SyreLfIfkNIMQ7rNcT-JKZAKwFEAKBQAlxkgJIElMmBPTLwUBRiFdVKKKJLREciUo7nLKLJTyiCs-olCiqLcgBiLyWo0QDqIEQfF5y1FWiiRO7IkDyJLFNbMOWonREY0LFBibOQInMSlyrQUSmuXDIcTjqu5ZAbxIUqnlT8ylUIcJNvKaVxJ2lG6LpX0rkIZ8xlXzIjQsrPlrqK1BypYmcquVlo7lTytElGHaArYoND6v9hUFc4ecfOBAYLiiDVTtB0EbSMSLeqrg4BvWKAR6kNLxQo8k1CyF+wFjL1fMDwZzCAy4LTcsocbcKL5DNGDTp2faNSFlABghIFG+UJxswEiRqQOe8UE1PuFprtMAYAsVoHZFWg+RnmgdZZgdAOj5REkGkfZPIxOb7geq-DVzi9AxKsARojXaKJuCjQzZvWrAPaE5Eno3RpU7xQ4PFhgDQQLIrQAWFEH0hgA0sMUUwDOxxTaQ7AzgD0puDUi24G2bjPyLBDSr5sGAyLfSDdzgDvwTISmGKNNgYD-0GA4cWoFEEGAF5Y8CAcBiCmQQ3Qgm0EapAdAFg3RVo8kOGG5GrS014oejZtopClqhMsopmNmGoBqJdk54fUGsGFApjxYYRIAamOR2tLSJWgagHwLCE3B2BqmG9eKFlH0jxwkYNgAGAbTABZQGAeMWBK0C44+Bco8nOwF5C6R3A42N0JWGAjp4xRoIq0LjvJGNmsgJo9sMIPlGdG5somXkfcgrB64aYRoJkKGdBDcg3Rco8UNyGkHyhjxnACzDROEHyK7RnAXgOyAdE3CeQ6OoOHaGAFejhoo4EjOwHOzsBSQuoygbWkokmbxYbALHCGOoAqjlhH+raemKAy2gAwNIy0ZgHGg0jnRVo4uMKPB09xBN7oOtd7kgAsgtpGql83MHljUh9sNI+kNQBAD7QnQYA+0H6WoDCAgBPIWAGwGEGbSRNhAFgfSBIxMjWR40dkZgAdAshIAQoAVPJjFBKhiQ3IZkThMchBarj4oG2T+GbxOypIfIikRSPpGcB8c4ADsYWCZBTT6xXOuURluGgxQxQogYQUuBpAFg2ATIAMTyLqiUCLzRA4YnSFmh8CRZBsikOyFtAYD8LS4t88mNnRsB2QBEivEWc1EdhqR9IRJIhnYCdYocwASJA6HEj2gsIvA0ELyFEAsCtAlo9sluHACQBmiSO8UCAPpHV7a0sWBVKIG-DoAgAkAgwKKD4HijLwN48+cuXRgQD7g-IGjPxPpAOg6F5IbKPWSAHJgPQwgagEyCah8AaQ7IuURSOdFAa4phEK3asrpnMADcLIiKbBb7IGaRNHgN0PRAnCmisB5IUQEyCEi8CsgQu3SLwEoG6xeA7AJC8DPJF6WU1eZ-menALBgA+41Am4EFj7D3lsYyeN0GAKHOmqqM4izMHdFJ0dhgA7AB0Ytg8E0aPswALoiqJ3IeCcMlAB0DSJ0p2wa98oYhdDtpCYBgInk-LJALLnaxGNBgCcGsCUTsj5EAY8UVJnZAsDry6AwgdeayDuAJxcw-dTDqwDKh0AsY9NQYAgAmjiorK1kGNMy0UhZRLOrIUQIN2jLaswAE1OAKyCimkKE4ogA6IpGggAxWQO9DBK0mcDW4DprIJ5B6nLD1FteGkTcEEy8A2B5IBeAGMIE0TMoBEo1QmWpFXbEo6AjgfmGMnOhCkawOLCwJkShrgIpkU7beKYEUibhbZq0I3IMBug2BNwjLX3EaTxT3cqFp3LyNSqHimBWguUNSMIFE6TtBgsShgHABuhKAso32NuOLDsBKBrIbDW+NwwqT4JWAw85wP2zuDKcawakOAIWnja5gVmSgDaJ8mbgWQNIYAXVcIAOhwBouU9aBuFDgC7Q3E46VoKdgYD6QlI8UB8b11CK5gDEYiLKIMGgjnR-lQMOAK4i2jeg7g8MB4BpDUjX1XAY5JACT0Uh9IwgA8S5LlAOh0Zvk8aVJjN2ggJxC6UyiyOMqJgW4KoXi9mdjRcSsytog2b5AdFBABUx42kGKEgFYB3BxIUCG5HvE4XxR8oakGuvJHxhKA1ACcDQLlHawCwTpLDZgIpggAkzslwqVgFLECRSqNMFgYtF1Dvr7gueFkBACwE-xLs1AeKHFntHEysBV6JkTDrUBn6x0TI+Ud6llFZCysmUvc1aBK03D5U6OdwLaHcFGrtpWQlgROVEABhlJv4mCWoEO20iTKHg0ELFoGqNIOrMRACvwuRzoBXQ-YrIEOncDbQnZTAzpHemry8AUN8oCcYjrmC57mtEmcEEBDolgYq8og8kYhl5HCRhAHgcIDVENR8AAxNw5YbSJRtUYNQbAXkTkY+wThKAHgzHLKEgHkj3c9x5WeSKZE3A3QawYNAvDSn+pcMC86S-cLUEzqWphA3GwYIMGZ6jMcidAfcAgHpoaRmy6NLwLwxjZKAawSAayCD1FiDByKpDHjG5DoD0ZAt60WVVxruByyDoPgdwPxroAzY7gZM+dV1ErkdRagq0Duc6wgA0FNwosEKNIUS4kc+sdgO5B30mJVi7I5beFXQFQAYA8+8YK3qun23LpHeYEdMC72zBu8QMHvcSIQF2hwhFwrIGqI0HAxQA-eR4MDGACD6EBr0ofO9A+iwjR9cIb6OPl+h-TMBEIqoZPgoCohAZ1wGAe7eWwgyw7oMsGW3txAQz8Ri+yGISGX3QxSQZIVfBSDXzwz19CMTfSyDZFb5tQzCwUEHiZFQXFRvZWUXKKYHMiddUi+NJQJ4sPSEyLAFBAmgDH9x3BmsCACapMggA3RLmFUNSNBG+DOBRAQrHlN8v5QWArE6ceWE6vFwuQRRm4QbKZkaXkJGEVKpph5HlFe1Kq0ZHxUMn5SyaKo8yOyAcSnjA5co1Ec6Czpir6QlAmkFLs23Y0Rxg1XUJmsIDUg3ALplVeKNoCsoHQmW+4TcGoCvYxMR4dsVcNkvJQVQykRlO4K7NZC7QZoXUKbi-KlDuyqVUQWoDYDq2iApGq+TcK2wsBIBRUcu6IldlniKR0EDjA6HcD9zfR-qLiOyN6vkiUpm81KEADZDgCHxeiJ05pSdDCB2RTaI0AnBVGFXjqrsuUVoMIECRrYAYGsFQA43YZeQ7IT8+rHWX+VwBFI48ayMwADrx56sW0MhmpC6jOAnNPNBgE43BhRA44MopAFlFdTyZM2RUThP5C6gHQ6V0EOEALAYDxQ1IDwGALHRAO7JfEbhCQrljgApFPkpgAGIME3BgxcgN9P0qtABgfJcwFgNQFxsvr441W4NBTSAQsCKRU650WXbmDUAxQc1XFJTf5EBhIB9IN0fyq0CBiFMwgtQbfdBErjMA-ICiGPDdAQAaR0memAGDAFZA1F8o5YYQGACiAQAlA8kOyL7Osh2t9wB0RqqA3Fz7gogmrUtecrWQuobASKBonZA3LQR1IJkaiNpCiCbgaVQqahgLHkgUzGlgwKPDAGtoMBh1fFLxQgDn6ZJv4ENGPO+SDnJE-8rAc6O7lYCKQGAW0MIFdAQBeRyw1OY2Pwqy0xRmyZPGwABo2asB4o2kVaLAyUC5gIAH0VkPKhuijMrI50GACaicgpMK0CciqN2sy58MN99GSHLlAz3r0OajqLKC0ZyJYxKm5QLg-mHIKeQ9xlifcDFE1HcbBW+UCAIonEzW56DWM07qQzAAvJ9M2nWoALCJhjlhAp2U2CwncUAIIA0HaZDYA+lyziV0UcJs5OzwxRcZ-EXMADAYDnRn6KzDhgLBpqShw4ogU+Mq1mjpYRdX7ZJaBrUhUYKoxcZgADG1GiAMDemswmzrMS9EBZxeDuBljgDMBKqWdNQPpAsBs66uTx35GicVWzNSsxaO5Hnu0bRRoIMAeKMIEQ6bgksgwN2rRz9iOFnER4Mto6jEyxqouXkDSEFgOgN0BZ30fSNpCtaKwDoj2B1YpAvm7zkW9zdkA9FZAAwBkPgII5IycUKNWQFKZgGFnOgAE-SNgCwNNx5N4bfaPcBOIqvloHFEW2rZIw2x0iapB9lp86K0EkUqtfhpgX7LtyWgQABY2y3KAOH4RNDY1NYTcADD7gJFGgyxuAFWhADMBg89xLaFEAeDtIN2agLSK9FQN2d9wFUeKBkpbgRpDIXqLuO4uSPTdvu+SLqJya4bDywAS03KF-LUi5R+GtjCAJXEzkmRoIIupLoHRxSq9cwvMLdjLi65RAdm6NLFixwOPNw-D9DGwOfvLAkI1IfHJUf33Rq56IA9pm+nbITh5EwVynQYCzoTh3B0aIAKIJRsPRG12NK2ILZiWASeIYolppBVGZ8atAlAEALJQjzsD8DNwbkBgNFBrDqNRASgR1VxX+7nR9IwgVcFbVl3OBVJ42slZVRVRw5n2DwO-XQD2gbHoi+kENCtgsDppq26jPNJmx4MhAGAXyuTKYDLVco60akV+KIfEPlhW12kRhMQUIKiwlAuMkmKTXRn8r5UAyfSHPx+k3Q6VsvZwJHFWgdcLM3QOpVlFeo8tQUSC3VQdH+qmdIU3OBWl4HbToMu4UFnqjdBziRwNIq8FI9YZAPtojM46kLgzrFoK6JsuYTLo7LBPtx1EU+WjtWeQvWm-axJAY3iq+7aQKo2kIKgCyhUHQHgDwTLfvNvh1LFQMozrggHxZ-MLAVBF2mEGECkJYOVtDZqWty5NRQYe7eJPEmEDiNCCVpGzblGiCXjVEz56tq0CDpNCdNzWrrmw20h+ldoUNLGKzQYA7i1RPmAWDHhih0AMCxySLQ8CimwWeEcIIcoeDuBdRIVQhrqOrBbjCAt6JFU2PVb9S7c+0rprazAB8VeAdit55AhIQMutBi8AnWRt0CoLorzoPgYVG+rLYIAhdtscLM-JrRHQULWl8XlpelSr0mY5YEyw3FKhmjmA4AZOJwn0hjQ88lxa-GpFtimAru5YVoKyG8U1gjoUQJZMIDFReQqYhecHHcEVXtNhWIAa2oDjsAgAGAXtWoJXFkzQQh4zgXKCVCoKPseeCiaeseDGaDJRszASbOdE3BZNWA2kYBJ5FnxuRuWdGR6vFH82mIuA5YduKRrUXNk7kfi6UwMmJW5ZWgJdIjUGgXbDW2oxy-gjAEVhOVcpogUsF1DCANIwg2MfSJBosh0rjOAMKIACYJNRA+kXWfcPypmSmARR7DGsAdJrCC5ujg7UQMM2SN8H60wrJU7LqDWipU4T24QMIDsD5QawNgZyRKDUDMA3kZKAXqwCrqdwgVFUaCKC2yWORYOFuFJAFRwZIAuoEAfcF5FB5iZX8xSBACXjCWUmfAtHI0ojhF5bQiNEALyLtEhoTNEGUcCAHqvF6tKKZA8L2HYHG3+198saxtGOQoLQMNL-BfwvlC4pAoJQ4yjfVTHBooo57P0xE7PvyTrFRAKFjGDHOvxqAuoN0AgpeKu7mAq6YtbNmAH3B6yFaJkfSF1BxthBmbPjBpozX3x6ZVO4CIFWOeZ7nRa0rIcLLbL9on2nuozKqHnOYwWca4M8O5ljh64uNt6XbT9u7GNbIAaJYQAZVQmcB6ZrIMAJQNoxUSs3mA6aOyDDwTWqWvcIrGBD3YYPhAcY1kMnkEYaZ9QYsXut6AdCFxMb6YYuB4KDADgzIbpPSZ5AJ3tt2AQ0SARNnbj3gJxoIJyd21-e3MPBYLih-h3QCUxKAnWLRueD43I5gAOcQUOUKtgN4Np3K40XKN1jpUgB47SAUQBpFtlRmu94sD-GOcM7z4HY-K1thWnea1BjVq0ZJhyYFiKrrMDe+KLNGm6tATIoc0xpNxgNB5IspgYmg0wwNjlG0g6pQE9yMQZIRVMpgGKbcRSkMusjXHG59ZMWbRxOX6rA8IEGDiIsDeyCqBpFBQWcv7IDQYEoFyz6QvACkVoK6mby2LzoNgM0YowaXVmJofqZxOp2owxQxzuYf0kHEq1eA81QZqaZ0QxLNgBYHbdNL7l0MDN-kSgHpRUbiS+Z5I5Rj5gprJXaQDLTPaIVGSgcS2Do0ELKPJBoJ3Bv0ncMAIPv3xOOopV2ayCF15XNgE4zWVRGoGbQAwq6CODkjzQ7ur4ot9enVR3f3DeH-I0mKC1kp2ye2wBMARHDzWyIBwYABlhnLOc3DfwX1Zrb3WR3cU3AWkKG5eqlEijN4BWXKB4HYhMhIK6MtgTBvuFOg1gaYeCYk7lgFgCwXKRF9XEmRsWyxCgZrBOCAd6lK2yNMBtBMIGYZdQYmgwGKusxug2bcwuvatfxqPh8pmAOhKYgzqGpl1ym80hWS8hfWVpEGq0TLSAGRTBoIAcoR1JFwjcAxJl1pc4mlGrgMsXIbkaO5uGrZYP7azAc6G5E+mrQYoCANGljzgTgIsYtQJOAjA0hsNNowUGyGpB0jo0om1cPbfbwFCO9503ILt-aFO1naN0l293julu0tWXVb2okB9sD60QftIfW9CSHD6YQn02EF9MDtj4foiIGABPr+ih0zgUdafeHegAnfgYs+NENHejoL58QkMKGUSPjsr5yQcMtffDA3yIzmQW+ZGcyJimCiRMGdwUGaATFVXOQwoEUKKLFAShJQUoaUPvtlDyiFRiopUcqFVC0xN9PIDUMyE1Bai8PzIT6qfj1D6hgwFoZkTLJClXVJyMKqS01FPxMgxWzIjbsyBRmugE0QoNGCjCFGZleJWPwUdjxpGghjnXIDHpxmZFci3qgEoKHj85Fflb8p9lGcyEAkk9UfPI3kDvsFF2gmpjoKnuT96jagYopsN0YZoxmYysYM0fNTGponyheQCoOMZhs5DXVz9RMi-STI2hX6FVK8m-TTN-wyxZYjqAAyoZDlAHVYrBEAprJCJgHiRRpGggbONkmzTZZso2TbIHB8ChDPsxkV7Czk+qA5WB-n8rJwI1ymCeBvtdHAINaF44RBROTFCTgkE5UpBMgj1HIIZzr5FBaX97Ol+yptTOcagrqZ+K0Fvlriug2ITAm52teRv9AnLw6idT1iPB3uZ-D4MtEHkAhkeewvWJJbgEchMArhd9nS-bfXSAuesezlspOpjqRcHr67IGguVlvjVOMQ4XuGooXqm3wgiN62jvVmB7UrrxoJ6nYLhvXc2am+QGlDTMk71LrKrg0jjSyjdAZgC3K4CrRzIY7Tnfud5owADiagM7tZEsTf2krXUaxBAFlSzz5I1tOsgAvJxsXQe6tBgEreShQ1YEl+oBMwCiBCoCtDiCqE1U3B64so+UTLj4D8yki5+slsxYZC6iJzoggwJAgUkLMAwEARRVLjzzR-GQbINgffO+RyCZ5krQuxO-8hxwjQVyCz7xcza8C1BR4ogZKAptCKuGkfCh4hjFA3mXL149KwWudE63bNaOmiW+RIQLeTsEArQFOQgHyhKa7gAMGsAgDUoH7oi50fKAK0hXdb5I5gLu-FEmQK9coukCNAQzfw+ByeZl2XLClWjHLBk+kLg+dE73tPdoySohnQFHnmNaea+hgEpgXZBHPrdgAGMwFyjOjLUzgQyGDF9VjssE8a3+A8Fr3FJx19gYTcSnlo4T9w8UFvJoZ1L42BYOHWlInaGy7QpgvLugJZ8fbEit4BWJQECk0Nls8sNFR6jWGXs+BWgdLHmpnnaf3jyw7TwqEb2WPDq0-vy-cHQHaB3xOyreYQLUEpmbIC11EV2r3hrBpIQyGwQgyI9hrUCaVnVZBywCmG2JCoXKFTo+kLH3skUtCrS5QEAQYHLAtofcBxZmAeFHRkDUOlHkgymejBntTiKYHcB1YbNQxgwAIViWsawGKHigE6IHCyh+4OnjeQE4BgFyhcAvGFyhFmeuDgAsoWgwxoImW2SnYFMWUx8xcpaumLRP2RhEDp6YUwB6UWrTElJkB4Iu3ztECVaBFxTAR6l2htIS6Cf0RnbJiiAetEJDch4KRGExghWCDnZ9GgL41aANLQHDNZ3ZGJH24ysS4wSZ5IB4DKg89T3DXJHyB4BuhS2JRB8BiCeOj3BIVZS2U5w6Q+DSB1eEyBrB1Oc6AeJR9dTxW0fEQLClUwgIpxDRjFEAFMBTACAABhfAKBxsADkMIGBQHGRSB+QI5LYlLcpqC1HOhM8XKFWhWQMIGJheVfgk8xt4bQFYBolLwCICIUAZFVUdCJQGddWgUJBjwMgXKCoJ-qcdTpVqzXaEJkw8M2HLAyNIOCHQMEWNRMhzUbIzD8FlVAgMt+NVoBigLIGWBYA9GFzGSs01f0U5lBgfSDuYO2Wg2HRrLQYH3BZ8ezFiBquPjgosXkf6ClUEAIhE1EsoTcDMhoFEFGDg7sPZGrNIfWfCmQHgY5iKtULTAO9dkjX50UgGoLwGVhQUeAHyh9wLLXRoybTgKMx+VKVjIQsoJ2TAxAoY8GrYE5FgxgRriOImoY7ac6G9VgFFgO0gr4TcEeQLAQblMBpUNQFMgAYNpGMUBGMxXVYNEZIKUBBWDqCYZSwYpDXZ4Kadjcg7ILKFLgE6GLkGAbCKJShUE8QYARdygTcGn43SatkIMtoRXTCABgpAAqg4YH7AcRssTaAgAC2HxlMBSofO1eoTnXaG6BE7G5g4V9aWO0s5lDbenlkIuJ42sgrICuTDwBYPRhfkXSCJydCCeayHXloIOOji5ywWECewpZaNWNlm4LwHowYYRzCNQKg0fUGAzYDhj+MGAQYDTR+9FbCzkp8AlzCAk4coGxUAYVhxABmkYfByE4AGti8AJ-J8mxRdaJOSl4uFTgKew7bbV2bwsmVSUg0U5G6FNYLZYkn9pWAQZn1p4LQKHHke4S5FYxZtLwwcAZqSE3LAO4fNVZ1osL2mL9MuBpmfogUDeVdhMlB4EigH6LwAph9wSzw4xHNWWUEDa4SZy2gqidRVyQX2HwDsBPlPv09o6ANFA0gvoQ-BcQ9xTgM5YlZZgHoYawBZVS4LKY8FVDHdRSDTYLIM9TuB1jETXbg-DObkUg4SQbVnx+PQaE2gEeUgxBMaweSELddaLKB6I6GB6WiBY6SRGzxHdQYGtDgcRSAU0WA5Qwm1jlU0E7NtmIbCF5TACgn8pWHQYF+MJkHwAEIPwLaDpp4Uf6SxRoIWoHpgixTkiQAAYL7icY8WArhcxeoLZEUg0afvWHRdEA9kP0LIUFlvo3IA63D87IMAyrQSTVdi+5HpOJjfgLIZgDZhq0ewjug6AJjAYBB1EAEcJHSeOl4Qm0UXHjo31Q4HrcTpACNXZO5X3DuAZ2XXi0NjlXaFSwDfGSKiBs1HLH5UjEHwErgOUNQBro0jZpEeovAQLVcR7MW1X5CDoZgEC0e4FQ02oXSDxz9xnALqEVUUKOgB2YcsMIC4tYSDxAxNgeDlk3k1WN1ABx9wA+AQAvAJXh-kIUAm21lp4Y5R6JLUA6DEx7tKxme9bzc6FiwDUEqDI47gLKB0xULFTFhhVMJYn5V+WAmCUBVoOyAqoSoLgBihN2VaGTNGo0bFA1hAPbkFwKULqFaRvISHnp8McbV30gC8DJWcA2Af6Syg3ZesRitDlGFhrB5pYWhpsq0IFhsAboBpnuRcpEdFygRSDOg-UBA0IlBZ5pGtwuJ1eKB0oIw-e1iq0E4UwGrQL2MaALs+0KIF3ANWLigdoh6S2A0gLAXXmnp7mVvBsAHgRZDsh8oPVVNZ04dTgFgnNBnX98jHdmDDoC9LGyjZdoDhygUQAHpWg56AjSAsgzibSGFgYoDrnfxajIBEHtNwEAAsAqo3AJsAfAHICQRs1IPFOggEKXg2Nw5BTR2U3uGiU6089KuzD96aMtFZB9IBgCygwIphl5pepbcj-BJOR5gIMdwJSF0U4SYdE2sGmGsDxQdXFKwBhu-VQxAYaoAqFvNWAVoHdYnHe4JIIGAdMJf8UmNQBkZE-UwAUsz7HwBmhcuAEzZjseZlkGA8NA1FMBJgDSG2IOiT-3OU+DBTWr9cA3VRxZBgeKFqxBgK52MQikK7kkQYFcbR-hV2WnmddjZFm2ywDYzcF5lHNfyEEDMzWW1thkkB4FZABmYdWKCCzUwD-VvIxILsRBDcXBip60DhlRMZ4JRwL8QATA0hRTACrE+VwYw6QEQwgbnQ8g61U+CQ04rMDkDgL5L0MVhvseSHPZwuWS2iAawd9lSjrSbZGYAzHaSLgAsLTaBrBMZCtBTRx0Gtj5gpYelixxKkeUlEQqCLJSyVUacsDRp8Yb+TxRVTWOF5xC7AGDrJOlNaDYQEjdOER5XXdmQeAziATkbhqjMVCyIAqYeNoNh8TaJysbofRhBZ9IMvXSQi4qR2a0NISlkvl40M+EZl41XMGgDE1OtWOZURc1izRfVSzjlkczR5DVpRAAKFZANUNuEYMcbehMs8uyXVBDldoWa11421ZhjSo1eMQyiVtEHeFM4y2CwAOgHEFLFUBBeTKCoQbuGOgsgo2LphuhHEGAGqD4KWKzTRsGOiPI5FIAqEk4X1TmC0VKaQbAsAmoZe1VoWbcVHj9wCEAGx4pHXWANQsYcMPfI+6SYE+ww8FOQOg6AXmBugVWbZWfYaBZ738J9GVfxODrEWejgARfBIgJlmbZL1YYHgEilh4R4c+FDtlDNuV7gIAbXB1o4-SwFaAUke+Dxl2cayDuwP1RRCFR52TnhG1hQ16hrZtIJ4zpZBgVui-VYzPmh8t4oAGEyUXSUYDUB9OKIDABWaNSmjCgYeNEOByUQQNEtyfXWLlpM8CQjUA6AFuESCr2f5WiBLmWvRiYJSNi2rgmmPSAMsDocxF3k9xKyFwCufAQkfoFMGABQQo2C7DUBswY4jhUvIW5kLt6YiVCNw8UqlWJYKgFCxgV1WHWHygC7fcC6gGAEmy8h5keKDEUt7U8y6TqVLuB8AtkDtHG0ymLqEFkZoVgBxZaI2oE5gQLEtmjxdoGRkGBcoHqiiAikk6Eyg1mdhjPh4ULyF8Rv6Yek3gD4ZrRDoDYKziiADibGUbQ21DWSUcFeThiQJfA8sDm4DkAGFV5aVBIHTABYMIHeZUcZhS+1lAR6TFR9udRk1QmHd6BrAhDWiPCgakUBTyhEGT6z5Rd1MtA4QFfBWksAYJM2kXgvINcnKMEmHdDyIboF+DzgS5auWAlWQIeiKg4-QWgrgHgdpy6SCeTlDqwoA57D5jrOUUjgAy-Qs3II8VKICCpAzU7CLgr9REyQAxmHaHUYTmcbh+TFDfRTCB-KCjU-wtobhkf11FXoiN8mgtLHjoNEfFmlwdlJRiJwWiaLBB5liJACiBoWdSMeSwANXnNRz1MoAOgLACqFvNy2fcEOkriRxAeBcwOAC-YW4Z2BqJ5Ik7EflTATcEcwdYQojitvbQYDZUhdGema0E4UmjLlVofKzLZ9MLWzcgIIteBTCBzZ7xsAr6NQG3N4oP0xJh8oV5ntpR2ItD65ReZFlqBHpDSC5MhE2fw49d1ZM1jxhYbhwgZpkBSBkjqotQFWhuo71XihgsakVXFqmdUWrg6ULjRgALIU1Q6owgGAGsglGOAAoJHgYkn80krSTM71pqSdmm1amGKCBYsiGeDWRCkIXTDpZ8KjJ14DPOdSX1hAFtGAteHIONqANySDmdpYQWElgRbE+KBxo-YVgDUhIUJDWSg4SHVGLwa2O4Eh4IAWXiUSTIBgHzUKeHIhABOTYFG1p9IadVQd5OPRE05jaLKFVNkkLdKzgNEJRiU1dGD7AeAgjZVWFR3k2XQMQcJVVJW56M8oj3kQAWVzAzkES6EGkg2e+mWY14kAkelmOCLF2gjcLrgc4X5bhgTgYpbSAtif0n7HjY0oWuXyp8rCBCToSDL2mshtMCbHydjELuPDScOHgyWtcwSzOdJ6uGwDC5WAHYJDiO0NSE+YyEIo23ZFELaBTVv02IG9U3ZUB1pUC7Pik+Yu6YoPMCvacBD7hv0KZBTlvkAm3gC6fCCLchq4tv3qYToUqKS5EuW1TmYfMc6AqBM2IMz2SIAdZlTTiaSAzKMirZuBmhS7LaDTkZdPeBQ1aPANEENe6UXEqQXUq9h6hZgZrAb8Lmf1I1tcwNZCrtykLwDLQ21aIC+5oYUhEi0njKIC4429Ndi6h7WaXBuhTlY2EV5UokAFX8UtGtw3hiaKOC-UJWEFiiA+OKYjuBUjLrGxdh1B11DjiI79UhpE4b2WYAu2Bpmfl4oZDn1C85FUOdIAsEmVZBC6TyGNx4YQeNaUkAaGFSiHuIhkyJf03zVgM4Mh4FDpZWNIDuAAWBXQThVM3JCzoxCe6ONpzoOn0kxs1GKBswhU-BgN9WAYFTScfIquhGIjOCAGsg3IWokBILIfhnpFwgBABFQ7OGPXDguoeOg6IxcWyEGtgtS-TcYDoTOBh44AJfCyQCjejHkg25BABsY71VcARoKqAckMwWTO5mOBHpO4BpslaGsEVVkre2V3ljgYyAOQq4MDC6w2FbUK9UGAQ4STk6GNTPaY+U0QF9ZoDd1A0hoLA6A7i603CLE4D4pQDIZrMayCs8huS0EQ53qceBlj9YKR2ghtwJQGh4ogCNE0gucGplrRNrNyF6kZIojLZ1YkRuL1VdPMczR9W3EDLcgO3XAG-B+3EUBnQ-wOdHIKEwVdEIB10C7SggTIEABAAoAXKF0UMgVmygAtoISEbAF3NsCXcAdVdyB08IIcC3d4+b9FIgIdJPgPdAMaDGAx2CvcA0BGgOgHPdUdXPhoKcQTHVvdcde9wr5CdJ9xJ06+AjEb5iMKnS-dtoDRHMg-3RnRI8xU9ViGg5kAaSrhUs0POkJroWKzTYHoAxHcwIHXTycg0oJyO9RVPYT0Y9X5NlG08BPC+DMgIi4qGChHICBmCK5PKwt3UR6LTziLzIBODwK++GjHSLZPDIuf8VPTT3MgfICTztZCCUIpKLv3fSCchNodjzMhroH92ChWgjymwVgobBLyhLxTItfDinYlT49KZMIGI8t2Yk37NzUGL05Z94dIUsFjhQ3AyJNMfyn8IAaPmGOAeqT4iQAA8DLAtFkBaP2EAVSXzwKxL8H-iyxYUJAHVwOqNzEyhxxJFALUcKWXJTVwiLS1kYXsW0j+9BpJrWNJ1i3YuWIcqaby8FD8X2lUwysOTBuogIzVCHQyBEgTOxZUSnDtJLiUsFu9Jma-F2LcUR4tG9CCF4vtInpOZB-FsE2FDgB-cUHBWpg8DYxAB5pcygqgnix7wYFtvD4o2K8S5yXopahAvGmEkhNz1SFJimvD28q9PoWtxUvb7ypKBSwYHpL7SSPVn5TRdQnxLOyM7kSggqSbzZxsg3nFBITvTQS+8dvH7yRQ3yLErHJO0XErFR-cVEueLlqVKmsgOcBKGMgZqRXO89jkfYutJ1OOBmEBTKbaHUhJiTJXRcTIEEyZ5wMP5hgBcM1DMPwAKGTETgmYLijUhPFLEJjw3IZtALdlDcyPKZqyBOCNJE5AJidwB8RSHlgIAGegdcEAVkFqByUB6PEYfxFokXAawDSFzAtsOfgLMQFb1x7sHxUQCkME5TTNpBEjMOAG4+gmnFNsfo85FnglHdQ23lnUexmxZLQ9kHX0FNbPW44ENCbTRxINT22sg9aIzBx9e1aQ1sB06Gm3UZaOA0xsA4ETlHKB4UAclkweUBVgKRaEb-XP1COT6V-TtOTWCUTnshtirFs4H+BmQvAWOh5UrpPeCdzY4XFEjpNwEmzjgqEO+AOhkYtQ138JcVIAwpWowKEfLoiHIVrR0aEnmmQnzR4FWg6AWoH8hBmeYjwTU02ziOh4sdODn5zoXOydt5Reei9x+WcfMb8TkUQBkRaEayGHN1YABVuUhsL7k3A9VB4CtI5mHpUldwYilKphm2J60UCMTCuWfkWgnUmWIRU5wBYVp4fcF5DXEBZ3ExbNZ7xmgF2KpAd9YGE-0ALSgKA1thCCEVIFYM9JfHry+4UQHMQHgJoIcxOEWoGEBXDJGGggnQmRhiolAX7EhR-ueDkGloGOwBaJNWMXT5RtXJBmrVMeZIhVg9oHWgSCT6GAEED8wGoh2VKK0pE-8ssr+waVs9Ldj7pzNR8jn1R2a0x64g8BTGOSKgk6IPovACrC7ZJEJgwThJiXogR5naQaRFF2rd3VNdXjA+Bs1w4ftXk5FIe7RIEnyWjkoYr4mo3DghuR3UPxaDfSDO4ZDPrA65xEAoO24opaeNjs+9ZE1dMboEphCxebB4HzgjK4kQI4G4csFLD+EGZFqBk6MGCFgeMNIHkVBgVwEUhY4KGiRhccw4UVBsonDgQA4NLbHdoY5PtnsiRVXiOnpRAWXPpEMkS5B1466LwCo46AUrBRURdJAGEAVkCrR1cHUc6CVM-waKF3BaEQoOANWgHGDgyG-PlIQAEibZByFqGbmRbkBOEWVfhOtKdmzMIANUJIpfzWTT1AvsR2hIDNk-22YSkc6MgcVs-RbD+M4uIpCUiYAfOnxZqEdblm0C3BgH+M7YZiuAk5MUoCcV7CXMGgYWdN4CcIJbGlLcgpbfhx54poYfBQRN4PdI4YxMaUy+s-rWoEOUlNcZW-pcwYZijRJYMSHZMy1WwHLBZLEdCyg4cetCLBWgVTLiYMKbeLMtjWAaUbCwM9T3tkH6RtE8Zm8TlwMcE0YLCXwamUfUCxBkZnySYCuXxHAxmVQ8Iq0GERSBHZ2gEvC2hxzKLgtkA-UQFsUK02BDDhUavmECYh1fcHjzTlOJHgKGGbP25CfAX409EvDcaBuhTAKem-sUmUBw6IR6UuF2gvUMIEyMBLHwB6YhE-jnM1PbFVAxw6WfuWZ9uOJ1XHNyjGwFeTYrUBxiRMkcqvoQwAcKlld-WeojOwAYNOnsI8w72RwZs-EsMXTcZNyEtCs4tOVHhp+caChkea-K3dhJEMIF2QYofKFhwi4GrljUYoDB2HUNsXMtNpPVeKDYJZ5ehMmTUNEVgN4AjcMLoM-8ZIlnhS7UPQOgD+ZyVk1NcjXhAVh5CVjrpnkX+E6zVoarHpoweFC2At5kHzLOls9LartR6YHrjOgIDK50YjP-SNW6xFGcxweVzaFFSBw4ISCy2hjaPEL-TrSDWFzAUtXKFBUbFO4B5MbI-Xkrg4GU6rOReY49THN5I5Fi2g8E9slLc6yzTUyM6ATnhh9AAk6EPAYoD5x8B6Vb+OnUTolVjkZpcFyEsrhoV1xw5pMSJm9BYIbeEmcUYHNTDYQFXaGZguCPFG94PMW1Vzy67NPL+gbaZmwcUI0p8ujwzQYQDdQacQAIOhliMSB5YmaAEwRAA0NRX5hTqjaEGAjUb+MW5SwkHDkoZI-RFFg7gE+QqRa0WoGHMB8NuSVN5aayDsB+VbjkV15EgWCChKkBhj5wDiL2Ul4T0BRgThnNeDNThIUDJS8UrUhGC0zklfcBssnQ0Um04T2dhneiaUG2hiti0K9l1kFkDqG38k4b5VDts6x0nDClpZ0TNJbyULC-U7cJXE5hwY8wL6iUKABkaoNIGKBFwMWGtS2dq-T5DzloIOwEthR7WlHpilTJygIRLmTQ21ZS3QznppwOIVkGA67MKDEBmwTmReIRfB1wYAJkeSHeZbOKIHmj9TK7FzAamd3DB5veH6MFhUgZ7D1iqCPFl6U4ADhIOhVoQ+AwTPs-cDn0h0CwBkMMnNQCkqAFamnErb1ZVn4Y1AMy13AOoVo1dRamHNUqh46NvI8YHIeSBsAIARVu0gkfHm35YvrSpHownY+ZrUBr6ONmoR3KvlDhBtIeKiI0awL7Q4Sx4QvKtpMoMSHdkzRY8R7t9E61imRZuSri+tcYP5o9R+NapAhUpQYdBJZE5NfTdIMTAjmwa68+APygZcUJX0hLzNnCqZm-E9nywkIzjNqAHlajjoAEAc6DEawMtQCC80jevOYY9qn-QdJcgbWlQcVWz6XcoQuXKGYqtqq2h-t9DdmVVN++N2pVcH9IFhdFIYQfQz1GWe+WS0crariswXEUdkbC1gp-KTlw4DA1WhosMGW7z5ICVhkQCg6sz8QWFD7G0h6Y4dTn4FZEhEjUaBFI28DrIPtmyCHouvJD0eYAcHbN6EW2NcBTkQaP3AG2HwF7U9Y7rHzsLIQKJHYIAHYlhBtIcxUFTP8OsulYBYDfQTUuI9ALVjMYkXm9smYI1T2Tywc6E641EbZCX0oFd3RnxMIwUM2x2OUBgBglEi2njoAYVaCapWQJ3FaAG4J6T2xKcUjW04xUA9nlpQQKZU5586L3QEJoeas3Q4JtC+Fw6y2BDyyh6MAWHQDhAe4i58G-Xc2+y8XU118RBixVTb8-EY2HGNvIdrgccRmnyyC5C8IoM0NxcHGU70u0rmkm4EAXMBQKUtCmTuAwjNWNyBa5JfwgAxua-De55muskCju6A5HGUS2Z10oYD8AyGTyS2eDJsBHVZZnxLhACixLl8oEAGTNg2QVQmZg1QmGvojOao3UQ5QZn2FhNwLyH3BC4jRtHgKUK2ivVskeYhl0vIVBTowoFKklbVLs6hnWJiWBulAzX8daFDkC7VQ3J8n4KGPVR9ss9TcQ5MVulNUakOfjGh3yftUwNG-HLH41BpQLCcgHGaPClt6EPjguhJ4t9QbCDpL3RWM8UF1TI4DoBtFYA8oQzAPB4ECX2ah6jDGjANcoAYNaBSeNUIFzd1dXjFiUzVgEwNi2H9MqouOZxi5YSQVoEDhPRS+QchagAcC4ZzoIPS4tosTuSyg+LHFi-sqnGXHKw60qM0TADiaJHxZUme6KvAgUKayTkxYvBAQBiVU7mA1MkE7C+te1eokqIosAGEsBdodGgL8SGX1g+gVDUzA0aWkcXEvB8SZcOdd3KWSX2ReBNQBRhOueyHygqOV3W7NYUBZw6h-lTZMJ64EJQClsq5SDk3BAA2g28RwOe0yc0l2byNZpvEIrWzrBgFuWYLWmxOxANNwc1BqZsjYA3sAgtCQlllUNU7iTQV4BZOXqncIPz2569UVE-9z9JXnax3cKByGwZdOdXDEKSLZDRpkEkRFsIDY4WuKskaUHlMhlwzOitpKzVhx+QN2+hIDD26SzI1SMWh+mxUJsDkgMQ24Qjk8UhyKOL8x2M9h0XlYEHDh9YZZQrFnpBsfEnRk+KeKBkxeEFTAe45ogrl0hpjR1ANMxMAKnSB0jMan0gQABaJfpamb2BsBKEHcGEBIEHmkFwQAPZLV1XAJBByh-fLpFNtOVVZG5CdxN4PGAMy4VTNrOiHpihoYAOW2Bw5MaLiNCCZSWEdRouADhvURnF6GltY8NSEIQ+YU6KzgpICWhJtTGoxA4C7DHkzCQ7gG+jp9JaFehnoxzXKEuya4VLqUB8WJ8xVyJ+vDjWQrkPZVSxbEZLoqAJg5rBq5AYBgAqhpqGgK-8pIQ-2gCrIQBFxyHXKIDHg8NErFZBIuYmlB5r4VoDhkYEZTiRJa4cIH3AC8T9kOkvIWNrcg7OTdSWy+oBODGhyOFFjchiC5yxuZCiVIE5hUoc0x6Ru47Fm-gSKW2KNICjB3Fdk4M3ZC6gWdJtmrgoVdli4pVoZRXkhSsgbiCZb+kTCVoYHdAPSY2cPxRGQMUC7GC1YSDFkhhrrHriWwuOSTh6IO5b2AUgIaPKBuEmqIuIlZR4C5BAzHUH5K0Dj6GjLrKbABgG40auc6HQC7ZTxFlpTGtSFgL9QtRBS5kgrEKJswAaAqIRGaGXX9TmUJqAWdVkSlR3Z1HUXABjhNSRVWw4YWSxkNrEe9i-YtoamFMZYSBxTBk2cZmFxJo7HMvX0zkblvX0v1DhM3AeVRFC6jh8aLClwl9Ess4cTYDJWHk04QNzsQygNuB2CwAaKEeZeHSpnDQCjEsCYYLIVkKWCvAYuHZwTW0xu0yk6ph231nJJ1G05FIStB3FnEI3yfMD6chFoRZJGOR6JXokyBGdCDQ8MFUmeJul8w8oiwBuhhUAx021EcH9W7MZg0KIsAhmJHJsA3cnIXbhDOgKhSbmkejCmdG6tyCfkuCGKHvl+mEOgp5twW5gpsBKRKFZDAoJng6Q-CY3KpRxEBXS99yiZbn4Y88ZaC4MFaJMl-SFYdXjgYboLu0MJ40JWRbgHSFXJpybAVpHYHR0eWibZ0ODCHiGoWB1miUq4TLRUMReKvWTgwyc6C2hiWK1HkwO4WKx6ZcsO2WSsmDFNS1DelGuBh4tnNMs1hsEyLHaZWQVxFhq1mJnhuZLMppgIZ4A-MxhZbEV2zUxqRUROzZiovRHZAPKYntnK+sGbnKxn-YuHUhV6fSCxlyCVTP6qWIwaNlNwkVWiqaA4GORTQ9wehFdgfuiOWEUg8LBzz05w7kLUBDpR8iug3+TBkaUATSBABgrYs3lx4aldRAKxkkbLA5oh4QpEtjFWmYLCAogWtt6JPEaRrTkU1e3RzVg8HZDKRo0LLPXZ+PU-XawnjTM0yUv2t9IBVUhnzLL0bFFtMni3c1xD3EdlCAHyg00cLA2g0s+AFzABUouHkgQeOwE+tsuThgqC6lM-TOCQsYVXygg5OFEIISYBGmZZDO6l32goHL30GBEg3JGppKWS7IGD-gOZC+t4oUwC0CkjS+nEglnZBCXgMBwgjfYl5CdngKrrFbVDzoh-jkW4UuDFAyQ1gzxhaavDYQFaBwAK7CP8eedm0TBT8TYbpgXSLUK-UVjFDmXtBDWmjV1SS-JE7l9IUOybAgVPoKlAFfexBs4ouQuko4VDVgDzC6W4VRTRomXFB1VJkaDlC6LAOAGjCkAABU5gLYG6FfsW3T-3p9u7ArDQbDgLJiQAxqDhN+w5aaeC3g+OHGGphNUWxT7Y-ezcG4xHUVLAFgAsEUXqh42IbHbC9dd2WiF94SjVk1r6MtT9ki7Oltl5v+ltP2z7tfHzYAs1JyIgBgokIHZ4silpv05N4AqnUQL0ZgFMbraOUAOhc6INNERrSTcGIRh8FuHpFk8fuhJ9NhouG2R2MzYewRVsNNAvYJtaCCrl64AFDjQsYunmMQUYWayLjNwEjlZsDB1eFRxV2MMDCqHiUwB8yK0o3m1hF08zH61K5PXFwCC-INOj9tcVoDromtUQC+SOaAwc7lK0UXirZ7jQVjLUSLXSLV6eEYRlFgi4oapJhI6ctkNoiO3Tj+hrOq4k8Y4iGfFCiuWLODgBa9DfUcxpkGem3if4Gejj1nAdVDCVLzTzDhh6GXbhiZ+HLqCkRfoSFxfh-JUccplI1Q6YIYMgQoCXNv1dMKrRSGJDTQKwmBMtK1hQuXCIFP6rk3AsKsJoIaZHCReADgC9aQnZNkzCWj0Rqzamk-qk0NbTlYhErbQ2wdtTtzgxDtKguEBjtB3joKh3Rgqu1t0T3g4ZEgFQqgAAAMigBDwR8DsAp3f3k+1vtJCH4Kw+IQqj4cIUQvfRP0Hd0kLE+fdyjBU+Ody2ADZ2ApUK1CnPm0A-QTQovBC+LHRL5hIPQowwDC6vlwxjCt9wp1P3NvksLf3TyFsKTIQDwcLgoJwvGgNEVmz0w0qdnTRRxscVAGI-C4KACKD9fj2n05Pdj2+4YikIrMgnWaIvAVm58BX61aodjBCgzIFIuzMGijuayKt+KjFyLrofIt7mqFJyB8hiiwebKKnIJyHqL0i-UdqLKiwebTnmirB3H9dPDotd0goMyFKr0odgu0yymCUiGKE1S02E7xigqSmLwBNtDmKhoBYv+p1MZYuBo1ijYq6x5ceb1DwdivYv-4DisESOLjkE4rOL9OXQ0SZECG4rDwmIh4uIVWvDEolx-vd4r5hPilUlZxfin3D9xUcVHEBKy8EEoKaRBCErlRagaEoA0xcOEu-UzYdpAEIA8FErgXqShBe9cWsbUtn4sLPUu7iNIIktKrD8MktqtKStUoFL35r4uFLGSqYWAsZhMvDX5K8DkoyEuShwV5LVStEra8RF-Kh1LxSvEv1LpSmyi5KDvRUuO9bUFUpa8GBC0u0EtSnErYXJSg0vRKjSj0liVTSr7wtKgFv-jyxxMYhXhggKR0uKc1bF0t2lNEIsRe4BGUYksRUmOABJ5BfY3HHNTg5mgDRUgJtVRsouZEEGsC7Mwi3h7tKSp6RuMBDpYUsAWng8pUh0UhOllDNVxNLAE5JMRNcYByEJg7AWNQ2xooCtNn1cuPKOZ4NDf6hHhBcOlSetNkrqC4pdET5lC6K9LqCKRQiT2CWsUmpbEqIHALZSk4ImTgaSsYHK9T6CsWALhzL46Fl1FwOEKLWwQQ5NKCTCHYPvzX00nMBLg1ezaujuhbsv5lQUEABuFnLjuvFhPMpnCAHaAdeaMNYqUYJVITp6kI0hdVY6G0JlicJCEzJVWqUrp5NpIb8lbZs8XaCgd+EKzCI7saO3FqAAKWuAWyWC-eQxMvAJR2qR7iB-QLN+EIqEJ6oZUqoUVItQQJIRjgKKGdgdVM0haCcy4JBjlLqUbG1gDeTREjgEABNXyslMNyGTM0USNi7TY6R5dJ4oHU4fdQ0fVmieluOBOQEDL9UfRCA9Y6JQfbDLCtBoyaVZE1aBHcLg2PAAqMRQK5GuG7n7NZ8YtjaV36wYrYhjifBnLZoDfxF-NbKCOGqw8EGPQT0Ho+jhMVB0HwCZYBzQWA0Z6kXYsUhKCRMGtJPlMvP0gME93W+4Wdb5B0JvQQYkC7f2qe105UcWniTCRELNxcgHVCfgnYl4tvOXsQgJbAlsSEXVQYAnzKBxP9CeuvJF9y4logdQO5RZXTRTgz-2SsfV51QpI60kvBDo+4dmIFg08q4jEbeURxG5aBYPLM5ctoNXjJVLxB3HCQI3VaC98oDLnAYZgLO4Dojzof4wLx--ZwFP8bXD5zDM1KXMFzRPTXaDOgEIvBPYZAHbnHPYYRDhm3JW1cpnYy19dgt5h26UFkrgBaF4j+4pWHK3-pB4VAm3r42MxTtQfSyOjyz6RALDAH70cIXMZqlhJNMAXIFehFQDVAl0LW5o1QC-b7EV6laAlI8sDaD5gW5n0hqsNsnwMOEgKEHZTYOjEYi04-uDsBAUOsi+x9IIclsJTkIIz5iNHABjLcRVHwCYJTFPZlMwUKSjXC1PcI03CBsoXJJabnJURFMBqNokcRtW2QjniGRoMIEuzJQCwDlYvubsOGqsYTpULw5EE+iMZ0mI0k3LZbOFS9CnFCUGkxZTNJg-1Kkb2C7Towublm0gzPFLz19waIb9z7tOaNJ5FFUZzuxsnJuUUghUNnFO4jcUMoBhz9QGC7Ym2GgKNwP1aIiNjeFYFlKhB6mUQMmv7HnH1SJYIPGoQacMJE4dReJ7TuwXoP5k8Q16VoMJbnsR2HNoP8urGjU8VCyBAB+60Jeg4njBSFBRfEPOn9Fr8ETBQmdqyoiwBXoT9jsgvfDRrLoKoGNHRWSiMsv+MrrWeGFjeFZeGsNAYLexS0LsdszlsiEYqMxQ3Id6FYck2H8OeCI+rwxqZBt7ZA8Q-rMrmj9LxV0TLKboS8w+TEjUtXD1FIVVMLWWjWfXwr5OAzqXhsiLq3VqdNZ+XXZUYclCWCE4flD+N8nPZSzpFIDBLHYQUbxDFTSeDtbMnslJRKYJBA6dUvlkkUFmv92YbmR4YLISzI0Qy5HRDi4zeKZAL8+kQCJih72AGIddTVBDWmteYmeC9oWOQkDSdmZCysMZ14Zbgbp0EV0baQZ4D+O5lmNG4DA5izc8NdrCO0jHLBscVTFDjSoB2BaJ48iRnORmAOHD+NYSWoGtoawDRgsg9ZbVHVRmAdAcrAsjZjXu4K5cGBMYzFZI27sLII1R45hANyHUZbZR6L2V6QSbjNJxtZXprBckowAkJPoAtpWMEAN-k3Anjdm2q0jYyBxysnGIaoUx25XGW5wJQZIwIMzpc1uZQvITskmZURRXayMQUTBDKQlZLOZ99kEnlA0b0wS8fkhUNE5gUYEVW2ULRxcenGHxQ44th5ROacY1kY2cIjQZb1GY3SMZ+4BuEwNOeUumxoVeAbuPUBgkehF0HfUxhIUDUctmjghS5YzyCSy5PAsBogNxH0hw0I3FXgGATzH8oucVsN-a4rU-Fjd8bF1J3gysRuXMDMYk6DrTxJlSYqhx4dJiCD-cNwyt9snAmhIX0B7cnsJP-EZp8BTlLJhHpOaPELhSx2bYiX87AF2m7MvlKra8ACZtpB9WQ9JEjABolBvQTLqYMsr79T4HdG2ZRxtRCC581wGAqm9NC7hnIg3BHkf0f0qeg-juMQzjFjjIc1DdkMQu4BaQv7WXPV37siLIOlCg84iLZwawpmkMBzAHFXVw6ZS38RT-FMPdVNrCpAo16VGKAmZju5vOaxJgaLSx6QGSAX3MkfBI2gQsi6dUdpwGKLDnZmaBvxyg-USqCQjklEYgP1n2IYwdo7UdgZmjmeYqI4RkUdbpxQ+YB1TOQxg2DiBwsZcP0xIUDWuVZAkmVgAxoO13XfIH8oXUyl106R-X2hMtIonFi+UulVqZm4Yc2swIaelkmZ4hvU0zZkCQFB6oV9-RjW22caGFNtAkKNpQQpbELuVq4FFtwSzZyxmXvglMStAwDTOc9hihVu-ZFyHLx3ME+Q045mmFbF9OQQdYmUc-Wz8ucb+P8V60ecoYANDLZCMZ8tUFD8MK5W1AMQT+iqErN5ISGvzgEQYCRPZokP2S-882x5LQbqaHjGEQX5aMyuwVoLgmbwuj3uN0wqw5skxIgcGJAV0T2C5nDkJ46IVFwWAteGxofjbs2BYPHLeB9LgkNKEap6sc6A5xWgWGu1pB6t3KpgZWZBDjpYEB8hSyMIfThuYkAd6APxy6TYa3ToIL0K2hC1qGlxI85Buji4Z28opCcHYHrUigMkF7kEzZ9PdkkgxdOflOHa4AqJMV9IXMGrYxEJ+EB6dXcJyCgwgePVc1+ZAFmmoEeC1FXZhUrwH0DVEWNrEabHHbFpVY6DeVMA4NZWr4NJfEBRFk2GPwEP1dFLLpOxSS2bQM9uZfxDAA54IHh5sOuMbm3J8YflTyiGUzhSlUtnFgMBx2w6bXQ4DoTTS8AnNFUICpF9ltFvp-uKGhBD9E7CLS5KTL6t1TkYftm5Sf0ijjJtF9l8LYgu9D6GrMa6Tu1GY88eNVzQsfaQT-GvkdAKrkDoOOh8t8YgrHMVq1AZmLAcOBIDD8NyZlkjLq0JhmIQa1eSOlC6sayF3M0oaQ6tJXODRJAIbKaIiXwloQNQFVjxdMH4dQHJgCMc3EGAwLcikSZEnUPnKnlQ54O8BDCAJ+JOkHqH6ePJABtEPSFNxIXSqCRldd8RW25DMOgGQ400GjMmT18aGHXXAC5xFiBq6CGtaDFc-+no4JQCwGTN+6-jmdEd6JQAE6jKgPx38DHNW10Qp2FkmotvOP2GSsWAkXjn09kZmyagXoN-LXVIeou0eXsNlEcdlWZehOBUdkfvRNgrY+lmJIlIsu2Y0roRF1UA-NJOE+zVjjhOrRsZGtVKRcgXaApkuOYgur6sizjIgBNhqOulR3yF5AERtuazjCPQyxoBn4JGvFkGwNeBOQjRItOuLzCd0JAgOk6AMJl7odUQbgxICDW5mNVOB9FEkx8WNXneTdob9Ne5uZMpmxUs4b-WcQzWKuVMbjYMxIAZJmZhUxJuMoom3lVLN-Gg4F2ruATwS6RuDDp8kLuxig1RFw2S7a0O3EYDgWbNS3yYRGyKYvO0TnlY2-x2xngzNwZ6UKQUNRGFo0nKMxzEJt1utQqgZ6AXikrxkfFg3ZAzB4OYM2SG2krBSgHu23ryYEBXyhuDcNAJcfM-HysKO1QBMeYuIosQhOWUA3gxbNwaIHKuU5VZ09xu2U6qjRNhozknUO7fRQYBMeMQ1ghYeGqe7RSFB5SyZ9R+4z0xJ4hdsyJoIRQyJhW1Lq1Sw4U8LRc4oDTSHkYf5A6C6U4E3TMewwk+SEJb92E+kLikSMc31oHgceUyUOaDuPuIV6HGhfU1IMVJgQkSf-C6g-ALhn0gZIy5lBB72P5I3avafXlHt9wZtHL1R7fOnZwrYbnUIJgLOhg8ZCkauVW64GGNnAUvrbZURt2yDHCMmRVPRGw3nslBHcwZ+D6GVQEACWjNR2ub3gqQE5fdhrE7gcYAWqoVMoHrcMWcBXbQyz-5RRYJI82kPRNytBHsgY8blou21aPNUrrNIV2hihHyNyH2lBWNQFOwwEAUnXo7UTXYWUf8TOgPA0snlVk0vgUDWQJ5OGTCE7B0FRD8V1LcuixCqSVoCDYfIE7CzbnYBAD0wYYHyEgMS3YLT6QrUrrjaQQcGBXI2FEEBxFJmrlehv3ecNtUcwOREOhAczblLmcJGZcOF3UJzD0kqBCqoA3kR6YxGFVSQeEXkaVohqjL9PXbV6hStY4eOkF9IN0Zx1ReHM0TmtvVa+GOTfnatm9YIFcNGnoaikJCcMZWXLDiRO5YKMI7TKSODsBeGQJ05NKqaqL8I+EEdCo4DNLk1qtUhtKjYBZ7cKG-1LocffcQyhnJXhYboGelCiUOHcBSahdF2kNqQQ0IN5ddUQKK6a7tk6PnwTYPSmKQMIOY4AynWe4mZpCe0hhSYAoWNvpokEE2HfwH6GIBTh3KXh11oCuc6CNR+zP5ocBTiCk2bBER+el4wtkKhB9PLYWfH4ciSPGDKhzQryH24v4E7BrAQ5Jgh657gv3avi8iG61EAC8TohgNeA-1hQrzlJWFtUZIlV2fk-EQ8LV1ijN5u7UDEHXgcJ8fcZCHRgIzkxWgfYcSdYYT-NpSunU6cNFNpyFVNP41-UzLhjRq2GlLWRnkBpmqYDwEOg7jbCfWlYBX8bOHcTCTGVjBkuTsyCJwqEbSFp4gXcbgeASsbpJMqXGVOGJN7YCwDUUxFVsMdgJaIuBh8k4d8gqQjcNhgwCfAeFo9RoLMhCPJ06w2DrzuzUODhc-KwaCdU52TtH5USDchVZBqVDEKT8VUOgEzgwzQoknjKzEfIlwo5AxEvEGcWxhisP4-1hfhvdUfQf00oEveQRiVc6-ept6R6lhoy8yeigdwYH8ILrxuT5l1UEEPhnZtKYOUARBwxP2ijNTiApAmQ60esSlMsoL5X9xvgMVCI7AkLhjkpdItlQTgWSYVibVuGIZEONns8FYT01guGRaD3dZEw8YLFdDebAy6VZ1MVr6sNmKdOyZlkQ5SDQ4BpxSkWpOnYJbUZ2-6vrVDdIZeEMAHmRyYfhFf12kHljYg2cHeE4XSVWSRW0sYJQFm1WERiIg4lIWtCBRseRREQ4Quw-R1VVZVOAqgiBC3GsN3NRGF7x7dKWlYAU1DJA7lhrNhlVYy17jBoohDLGPYzbVPDhXo-AcSCq2bCQ6UGYANe2TDzr-a0a5x79JxSmByzpYK5Ob95zrFRqzXG85CH70-0uhr-KOENZaeN2V-bys2LD9J7oSAHfI25auDcxVJbJHJg1IarFzL0UOjnjUg4uTD5SkYKSF4wVWlXmBxdrDSLD96fByau9DII+EPhluNZmRVmuUPNSioDZRkBDE1BS1OMiFe1kyI+5HyBF6wjbzl3YgLdGsARfYGCQRRywTxjAQPwHJLV0EgwLvRl7sr6qPgnZFF2EQEYbFm5Pp+UxFMpLELwxABL5dOvWLo7UztRoogDQGsgAZeEBB4lUuWG+xv+wIIlttomBCTDXmWGN3zOYaIDjpcsD1Bptg0JqKxRiC23C0udmY3osxFEGHmMV0xPWW3gQ4XSMWUUiJHL8IQGftY9RNnRgKe1mRD+KoMHVcOgEIs0Xx69k-jYdSjgnIUtg3br8iQnr0BOuVjN4WdK8DDAxoUjUg2x83G6cMmNROWhUDUnvtoj4Av-NqIQTBOEVNWjb5n+Qp6QdHih1eXhnfq0jZLC0Q1AaKBV54OPOhdFOiYUPZkQEOsEQ4emMIGIVr6+ZDrta5FZkNYKZUBTxDxxTmGuRscGOmswVMQOEuNZWS0PfalIZKztsHDYv0KAgVAbgEa1mdkyI0QuLk27sGAY8V7jdIrqKqdMjKXXIJNWfrVSNZ9G8+aA9KtyvW4zKQyFF6yUC+Esp6sQjrkwX4SZBsIw8FFCr1MuS0wBhGqQjk-qtLLZwM6+TLZ31Nk8OlRqNQgSJ-sxa5fygRUn8t0vUBzoOrWyxOuRF3GgQcM6DF4Y6QBAcrvI4hAAVbwil9Rr9Up1G3gS908z-z4CpRMMQ2VNTHbog4UIC8gN9W1EwNqRMQBODjknWH0SiWT7ETAfCIIO8D2BnSKthOFrvV+FsGQAsUh6fRicjLyznmpzTBQ43El8XSZeCzixhyrkVg25A33RXUkKFzLZqou2y1waxdLGw3QQJCOyNMEIkE1QJ4VVV6lpMevWkPOebmWE7UlemjC4+0OVlwQJ-eBHOgdCLWx+wfVKAerQsOYntgZkWEAi+UMZQBDl1cuVbq0UGla-yKRr5byAEaawdtSqYRvyeKRhXEF1D-LaDMuCwthEF7vkgjh9uWgDTO+rDFQLAfeEXTSoeC07tAC2fh0Q3ZbFzuS79CJncqalZkRyF9ecnl8fdwYaz2SnIp7Dlx9yVNItwelLNVlsAUIgQRWGWL-0ad2msZmJ6gB0+PLl+9Bdq6aM6PWmFOKeMJGrRJr7k-Z4Bg7WnQH4C6ix1hHseWE4jBXrmjIO8VDQ0xQ3ULzDLUxGbuyICeVDdg64s6Jtj0QJ+7daKR76CyB6glHFtBblraN3O-0NUUELawQv92QYBmeTkyE6QkAml1SvtEwNDpD60X69oP9B10eYxgkOR4YhedbltjduOXgJcgedLWwC7kx4CIFoiWzhIIToXTIKQ2SAu2-lBmZiyyNNdg6A5Yk2XMuQ4U0SlU8RrTCTOtNr8F6AkYJtelRHq6Wc4mnY7IAnBu4vIELvwRzEH0gp5TjcVAo4nI7GBMUb6U7h4NQQQbTT9vNhZxnt4kUfWnp7uYhpq5K61P7OkUIC5QIGAB+IHgghVO6TEQHDrdEPQiyexDiwbcApWWuBd2OaZ6BGSKd6dzLMZQjglsU55jKQXgs2VXjLOXpQ5IE+JukKRCxuGORbQb9IukW+QBYI-zwcUFA2hM3JOqQyBC0EehMoJmisAH8L+HQpjVxCuQ6uTJApKCmACydyiD9LrC2YRmQgAi5CasKmCmqBXzIcJCKhRTlaUVOfJaWEyrbrAOAZOD-QtoGiqChROxikWcJRuLqwVUTsp-GWlQeULFi2UMgjSYQNzfkAsDOSZ7CHIFlDFITxgAZJRhyMa9S7mVM4bydehUfCVg5YVZx2xOrCRXXzqQaf1KsVNMocmeKA5lINSe0Bg5PmcggKwe6LvJAIycobWRHDH07HIE6I+AVuA4wPapCofWhOsAPbmMfcCDTZjDkbBtCZcYQB3MP3CIhRFDzOLsjpcQQzjWXWjRwQtDX5DODqGDfbSjR9iFAKWimGNJBbUW2AwsHFQGIJUyxWZwA2ABCKx0MwglYcDibwP5pzRXFDobEYhKmEibVRMJJwZX5AMABwKDEP3ZvNNKhJyQbiNAGgg3QBljRhbYjNCbVxq6QayWVf-BY2UrglyDVCUcPwh15PoIwzA-CeqAhC5AXDqhYGZCKQZVRXYW5QlMJMiKBIHjhMOezk8BPTSGbTBWcbnCf4OSgyMFzSbDGAAUZKpABGVGja5AuBbsKGjVxNAjZsUmCuaGACtAJRhZZJxSPDRiblGFQCe0FXZoEBWT0BDxxBsLigVwKdiL7LwDS8Uso5EY1i3ZEOhByNxg6YS7LnQVloXyafjWhXNh6BBMpxcXWAkyPuTwtSIEzIQVhk8IrTRAuVg-pbVD7wcbBNUfLRiGUUg6kZ7LawNPKrOGgbBqTuSTsfvgTxB4A7fQuJD0QYDuKYRC4ZZeIW0fFR30JwwkEIjr7wIFAYQCaiSKcZTqeJVqXyL0IGMYU4x4Li5LQDuxFgYNiw1aXCrIM7h6DUca7PXuJaIccyeKEWSLvVkC+yeTBl0RFiHdbTDphR4BcKdRwEpUBT8yPuDoBP-DiwMYJkyQoKV1RiL5OHgrdxXNikKHZQtoEZrpIP2RKANTISyIPC-tQYjx6U-Bk7U7B8MVtC5gHBhA3STIjwEXQmwe+6kIUzhEdBCJ4afNi3ZKpDrMJ7T4wF7gYEYUIaQQWQ1QcmCmMBPSrHK-QawK6RXEO5hORRKB9+dkG8-IuAqtT9gYUaQ4avSpCJBcXgZwNAhicOdS3Zf3z3YSa7gxaWhXcMcisoCfqB0UrRdQIkYDdZBJ3QQYA8wATp9Ieux+vWArUieRR7yanAk2WSzYtHFA9wZIg5EOUDMVZaCsMEr404TuSMfGKA4sOADq7KVQZUarS3rOPz1MZ8wAqDWRUqUqCq8AoT3hdjIfJBlJy0EBDeyYliEccow5WFtDAoB4h4pBZhV0KzQT9fNj5wRZTb+X5ypJAnZq2VUwOKFlAPAGGjG0Eww9ITVgVTcojycH-TfPELBRAGoxmiPNTiTWHBAIUOgwifbIwif7hPlZlD-MWvwsACWAQIBtCZyKxDtjQoAqAHmxWpBcxVsUyi15EJ4cBGdhZGfE7r4ZJQ0Zc4hC8eejP0aRyK8ZjQ1wUPRTpX9JhIIaDNuQgrtuCqB7aKQBhzadA9uDKEroNWb0FZ3iQQXWY3aMsCI6BECYME2ZvaVQDgAaSDB8FCACFdCAruJ2bruF2ag6d2bg6SHTTgb2bZ8X2aRgEqGNAZHRyFYOY6ADWZAQbQrY6O9xoYfQpYYYnQJzV9zk6MwqkYVOZUYXTzVGdIrDQX+DmhDvigeSKAUYOKCJQZKCpQa6CZQHKAFQIqAhQJDwieFDzb8NDz1QRqDNQMyCtQXDyyhYpwEefqBDFYaCjQcaCTQaaCzQeaDsoZaBrQDaAZQFbJmQJAD8eBtihde4zBQO6APQJ6AvQLdJkEWDhbKGWpVsb7B9zFk7gwfcwXkLHwCdJ8YbkYDo-YXlSfdSnCbWZ8xeqFNSD6VbDGQGRjmKWpIzkHOJOoS0Jw4c1rZ+TxAXwTOhw4ewiJycLBlyF8JcWchCO6dng8YKFyw4ImAUlKSrUMP1C9xIlhKmDEIkLLmjKia+r0wCyquAXqAXoHMp4pBnCHhXPRgRbDYPScZAMAV6hLwDJwwzCBiLAGthzWcLKYUbzgQRG6RRMNgB-4MBDUcICwFYFrDW4R2D8yczBS8VGhFxPZQ+sfkKy6Q1jfxK0LZpT6wD4bDY9IP86s2PlKL7B6rVbcOB7KHJTJIODKGsOlBXwUpBs4LhBE0f2QO4OsrVoVTTUcFFSzMR+Su6NmJTUHvqqsD-Tt0Z-xzlS0CLAdQC2AWYBbVFKArQBXwEcauKzaSLiZNYDS+Pb2AuBeojg0UpKRIVLAGGcBDJIJRLJJR1Re+QexCsEb6tAedaZKQf7KMECG8yYei1jBZzqsSKDk4YdA0BVgDEEWlC4BImBRkDtR7xcAB2cbthgwGWRTZcWJBxHcSBqUtRuyW-pOGcLIywCBQIRDnxlGEvZ7yNSDR2WXD3MIjqG0UdK5wF+BZIJWRTHMDBoNPPA+wLHwF6bjgXoOdLsZR4bHUHoikyXHimQQXDgKPcQrIcLg40MHjyiSiqS6DCi4RaqagOUNKf1NOKPSF8b0qHRgJEeAD7cNcyAwZPKrqcAi9bMhgIrEmRtYXDISMAhDzvUwBNaI8AawAZSsGNiCfKeLASwUpCUIEdCgsJGAxQGgaVhfGwiYAFDV9cLSfZGgIGMIaiFIBpQAaZK6jYdAaLrQYrJIe2j5EHCT4ocJzywI8izlXnDX4ZIzFIKFSKYRli1tRXjPsH7AGddXgObRWBxcGYJzsMBDoBM0jh0cGBuQLBDeQCBhW0TvRqQIXA5QJ7QgGImwOBAOid2Ckwj9btjp5JNwlICVDJEDgKWAXThUwGGhiff5L6QY2jfYHqpjMfEJDkejR0Ab9LUWAJHw-doD+pVcC6Ic2D8yT7jKAdyiJNd1S2adFyuoParbyDpC8qZJDKwVmSgsL+DqrEmCzWCpBx+ehKicFUjrFYLTGyLDIghM2BaZGjIkLcghUoK7DzABp4LOK+K6KLoCKQG6wjwfbL33cDD74L7QJEY2DWhGWBjKaMzAWL66I8UbAsIGzADSWWDQBO2BhmJx5sIW2DHJLyCWZVlY3IJKz0IZIyKBZIjHgFQzdsKRChdCSBPtBugaRJtTD0RRC2yQk524SJ7ywCnj7yZFDMAAjguiL9o+rfHDpg+Dj+QHVT9aBN5dwXCJwdWlD2ROaDt1QGCrqZYjkDC6Cyme6Adgr4abIT9jxQEUiOjPQa0MXWDyYW+DX5LqCfMeXqmsfhAMILqyhEesQ+ITcA5IVRA7oNsiPpGyxtqR2ykMOOCQGGZCeIIgQAhdJS7yUBznIaCCRcDGTasCXylwXVCchFQAP0CbDegWOD94BOAZKQZCzlGViTOERD6BJqBBxC-abqUsI7EPRip0ETQ2AAmz9rS8AU2bFjdsDFqsYPBJ9fSRQCIBVgjsVo65YFjgPFOBQXIEXKXjdsyWVMui8IBgJlRLgBc8L-y5lSKDAoQWgKYVmjmmbHb0wZ8yaaFyjsaQLRcIXDI4sUti2xIv5rqWyj6KIFTTwNbZr0LiyqWfxDHKXOyS+RHjzQaCC0cPgxlRa0iBmO+ilgLAyxuQ2DLcBWAKKLGDmIdXiNxVcA2uWYDPSB1QmBYhQ+ZIILdQXVS4RSuRyMMSCfwKBBXQV+ymsb1gMtf5o0EXiLfQLKDFWUxiGMTXaPyIUYUZVaB2AI0IwAbWitqM+ys+EyrbgAswwOJRxWQAvSqrBDTEiETCuANWKluZPaZKX8FLYYqKXGSzh1gPkwf5bcDJmR2olMY3B60EvZ-cByY8MV5raoYWDIsfHx5yCWDHMaSBcBUzAOYabAfODRBpAb7C0wM+zgcDeQzkCGDSsYQC8ySuQx4ZpBAobWT6mKlSZEA6BGxGGZrcf7gJlWpLEwMtTuVXFBRaDAKpQS4zn6BaoCyfhgZla0xtjTlyH6QLaNROTBRsFgqsgaAxGhJfTfkVZAOuP0gsoCLg5lYzhCGUwy39TNr5WReCbaeJC3yI+jkoEOTnQQ85BsEUjqRCxjjWYKyWcdQZDqbfQSgTFCbaBlgxMfcCn+VVL3sWaSNwZ8wnsDaBkqQeCKGZYi+sL1BBYfHxg0H0qN1SBwwmGGaKER1S++PZRopeqw+REeDShC3A8wb9Iu2LKLcaakRqwW9QzIC6Dmhaz63MDVyKwamA0pV+BiNBwwj0AtSbRVUJckW0GTcL4wOTakQCyAmz8hJOC++TBh4sL+hFiT2yG3HrTGwQZD2WcwLacKLZhAPcDWGPFwYOeFBjEAcSYICYImtL9gtWawzZtJ1j+yR+S1YPLSqYRPzqwNnqI2KFTr0P1CNAFJBt1ROA5mVtiaMceCSZYmjdLT0TOWPFTx5WHBKQITQ2VBWSaIKoircO3Dio0XCYoUTiX6KGRr6DdguiIyhFINSgnObTCTJKXj+2ZVSfdHs4TaDsHu0LTEi8PgzdGB1wdycq6UqavryGWNSHobeICcFFAcYNHqeYTpCnFGwjX1DTRdRf2zTaKqC6ZWNCOEVjACpQOhooStRUoGABZuZKykab0CUMI1DwFYTSgZPRAltedohyYdRrqC7bBYX4S40HZhf0AGajjVqpp5VGBeQRj58DAjSVqb1GiANn71ZT5jDqYDR+wBFRdpdFyr4Gtz44J4xKOVEw27Anhn6QHDSNamAPmHGQXScdSwkNdhUIGxyxIQ2C8OaxCsgL6S90WGBUcNbgGYalQz5elStBOlT2QACqv6E+IOkRVSsgg1I9aM3i1MCDhJkT6AoaYWK6IJoLRkYkTzAdWCZEPbiYnEZo2OaaBKOWU5EgSFh4opYJFIFohBwQLCbGZAj20KJg0BcZR2sDbCs6R7AbtLGCzwZsgT8DxwavRXjxQAZxqQJhRhcMcaBPWjiRqYfB6xGSKX0D8AsYQIy1tckyhBUPK4yEFiZGVmj8EaFwv+NJye+cxoeYSRgQ0NZAG8UJBXwcAif0GmytDBDpGUJRKRXQVRmOH1Y5EXlDHIcWChocXBoWSrDj+WU5nYYgxnQGTBt1IUrfIPdhpoFgAvyFNRs9GYIz4lIiJGWeRL6Ymg4+ZRCbsOnwSMLAx84Lea39G5Be+VTR1xO2AdURrjKIRupE2bBAH6GwCUyYgie4GByjAHyJXYG+j1oWqrASO2qtsDIAMsHXqq0NfbqAcJJRuYAwr0NXi0RAYJOoXhDYuF+TjcBwCy6DeTOSO2zJIVqpCDYWIwObBJwZO+jHqK5aPOcJx+QJRgq8Ueyn-PUD0qGKy8uB8SqcejLV+BnBWEmpASEEdAXcIixwMe9B+4Vnz2AJ+gxoNHoAoSDT5QDA40McLRcICODxIGRhdNTkLEXBDpwQcdSnIQeA5QfOjryAmS-OJvwsou+jDWCgjpGXGSFDPxDIEUOwvINWDMYnTQrwcJQi+GVi0MNlSobSirq7epD-ydorZoKFDvCeFAPUFFCcodFCqoElD4oPFBRoCCJRoeqCiEDESbaCwigiMyC08dlCcoblC8oflBNE8hDTiMVASoKVAyoC3AKoKkTKoclD6oGgTVkEBR6oMIg1EAjgEEPvi2xS1DmoT0QyYI6ggEEKCJyOZBHgNSS1YaBD74UwSySTBYioIKbVMLRCLeWaiqCbsIpER6g5QBejmQaCA1E3ND5oRwhFoEtDooeNTzECzBV6DkohcHaBDEptwEFQVhEFEgrDQ+0CUFf8ALobKGDuBgoFQvMALAJnhQAEdALIOECWzeuzNgUEAKgOdy-aRdz1QyPjPoGPhiFN2ZjgD2Z7uDqEp8LqHAYfEmwgda5BzGDAaFdHQY6COY6FUvgxzJABhMNsaz8KaE4YVLCdER9HhuADTrET7ypcS8jaGRzA5EKrCqsaMKuoSZI-pSISNYSYR1CaYTOmKtDMsKtAfUH-AkoWcglIVSSDiK-A34VwQSgGgiQGFzCe4TwT3E7BYgQhJp4LELCglQhYuUOGROoerIREVwjawNLBgibIJcET+S9ELk6FYUzq5YHcRIIUARYoeUiEEAnBNaZMlgiBIjfqfSZVYeGjsFB3AgsImD78bPDv4HwhiIbrBiIMZTpoTyDhENIzqIasn7gDYQoLf6iXyQMjkKFzDawDcjjaADSuYpfSZIKThfeMpCQ0dQgbYEijy4GIhWMBPDRcKlCq0IkjdJYA7BIFNTJeDCiy5SuCXkR2g84IhRlEJcn+oFNQDwVqhyoCQjBIHNTXYNAoDUOaDqofFBXCQNAJ4GKxAiWXKDaX1BBwGKCYoZLwjEJBhJeTAKQrR8n2SBPAtWHFB9QVcQmwGWq3EPIh7QFjjPkvQhCvR8lh4PyQJ4QkjLkhPCDsNbzBEQPAxLFclVEHNSOoTFA7YG3ZrYeSITkIV7gAUnbJEPaChxHbC7ktcnv4AcgTkXclxoIhQEUvcktWdbCy5euBBoQ8llAG-YOLEvC2cQHwdockj2wJWYW8b8Cqzf8DokugqYk13gYAZpAaAQS57IKAAUvL3hIkKAAGzenyYMPgq1Qh2YR8QHTOzEHTiFMHRSFciD-oGHQDQ7qESU1cBTHL7TOAMwAUZS9y28YADCk68DSU4WiWADAA+AKAAuUgChQAACgvgNwCsADADbMXQClAN9C+UxSAGgewCjgB8C0gJ8ADAJKzWgdDiogqAAWAd8C6AOwC+Uu4BeU-4A+U9ADBUqAABU-CAYAVoC6APXRIkDAAAAYiZYXUHQArIBwAwAFipNgHipGAEGASVIwA8kDSpb4Eyp-lLKAuVPQAZlgKpuiiu0pVKZYFVKqpNVLqpXVKypyVPQA+VJSA3lIwAWVJyplQBSpPVKKp6AH6p5VMqp1VIT0tVISp6AA-AjVK6pDwBapGVPKp2VI6p81PQAzVKgAhVL6pZVMGpbIDspSJIoKWUMEpgoGO0NoD5AS6FFAkYBT4NnHICx4BsAMYBkK3s2+pLql+pAlJxAHIABpKfA4cwNJdUwGBnwloH+pt4GNAoIFNA+QCgArkPCA1oGep5BWDABlMgwUNIyAMNOPcDEHpAggGVAN4FCpd4BNA4ICgAFoCtAvbl5JqwGyh4NK2AxNMOANAEPAa7m5JIcxCplwCRpYIDNAyQHRpYQFBpU6GAAzAAhpMAAEAsWAbAOAFZprADZAzAHupQYGZpkYDlpNAEqoFgBFpNlJVp9EDggJNPVpdgFPAr1KFADNOkAOtPQArsEkUCNIppfNJRpHgCogSoBYAa7kxptoCgAGUJ5AtoDwA2UOepptN9pftOxA2NJ9pXEGxp4NK9mkNJ+phNL9mK3DAwXNJ0A5NN5pyGGRp1NNpppBX9pdvBVm4tLDpktOlprAFwAGfH9YZ6DYASAAVpStPWA5tIFgNAHzpRtKxpKs3NpbkErpPvGrpntNrppABZpq02SUIAHZpzAE5p1lJbpsgFVp9PgNpTdL5AbtJVmQdNt4TNNbpkYFZoioBsANAAJoCjCHpufGNppdO4g5tJnpVGRoABswgwnC2HpJtPz45tP9m+wF3py9PHpi6D7pRNJLAMoBPp3NKqpPtMnp-dPogkGgspHDBfk4EASaSoFvpK9MIAGUIfpRNLDAZ7j3pq9ODpF9K2AdYC4AXdJ7pZNMRpidP5p5oCmAdNPdp6wEzpzJOzpUoFzpOAHAZIABLpSDLXpU9IR0LABoAZxi3pzYBoAQDNwZxAHNpWDJoA+jB6A0kHIZDNIoZH1IwA1DPdY4AALADDPz4Z9PShoDMjA5TFDSwgEgZ7wFjpZwBgZVNIFpKdOAZ0gBQZFEDQZMtI1pWmMmArEBwZDNOYZ6AA1puQHlAZDNPpzdN5JajP4ZrEG0ZX9JrpejPNpJhhhoX2lZsRjKGhK9KYZ5tJ4KN6hPQ1jL9A39LTp54DsZ+DPUZcIE0Zf1J0ZI9J-pY9N0ZotPNp7JmbAnBSEZUwBEZPNNHA4jPgZloC1pglJkZBlKlp6DNwAoTL-AGgBLpbjLRJqjMPp5AWiAVjKAZ2TIDAuTM8ZgmkYAJ6HGAUwGcZLtP8ZHjMfp6AGe0LqggwRTNHppjM8ZjRkLAfAFEANTLvprtLIKgTLepvDIwAnTLnpHNOEZ1tITpsTI8AtNOWAUjOQZEtJSZMtNGZ3OiYAogCyZvJPqZx7hWZ3TPnpJJKUAnDKvc5tJ2ZazPVpfUJoZV9NaZOTK4Z-TOKZIDKAg3DJKZQEFDpqDLxpEdPfQWwCrp0DJtpsDLtpNNIQZczOyhSTOh0SzIwZQFE4Ky4EgAvQBUZB9M8Z4LI0AkLNXAvTNcZQLMWZOdLzpPvBhZwTM8ZXNDAwFdJvpNjPvpwzPQAWDKiZfTJHpf9K2ApjX0ayLPHplLMjA1LIrphzMt45tME0plJJARDOZZglNZZz8g0AHLLcgVzInpGdLRZqTJwALBmLA4GCyZ9LIwAM7D7ksBR6ZdGEvARTOlZ6AFlZk10kURDPFZXLOeZnjPrpl+g+0NAC1ZfjP3p2LIaZ9dNMajXH2ARrOMZQTJZZnjIrp+rJMA1rMJZtrO5Z9rMNZM5CdZSrONZ86F-pT1NdZYNNIAWdLeZ0NI+Z09PICUTPjpMTKTpAtP+ZloEBZwrKzpoLNwAp7mLpkkGAZajIKhp7gcMpYG1ZB2nNp+dP8QMNBlAp7kFZPDNhZDTPzp2bMuZPrICZFbOPcFdPzpldOkgjgGVZxLPrpTbL+Gsqk-pLrP8ZmIGJZRbO1ApbJ9ZKrIKhigEvA6QDzZy6HNpZO3EgsQENZrvBoA-zHSpU7OVpnjNnZx4E7pw7JtZfbPuZprOPc-iHCAHDBiAvjO5pUbMppMbPyAQtNqZnIDrZ+7K2A5swipdgCXpZ7LEZl7JmZCDJvZ9NLvZdrIaZ-iHfItLNuZbTIO0JjPzZQbNeZc4HxpINOPciOkGhojJ+Z0zLjZmQFTpwHMt4wLPkAybNlpK3CPAOvCvpUrOJZPPAyZ+wDLZdzNI5ZHNQ5brIaZ9diJAyShfZvbJNZv7P-pNHJlAy7PcAq7MDZDTMI54TLYZahjJZrjPI5bjJVZDjKYguyDfQ7HPtA5tIMZjQCXZ3lPE5IoHsZyACYgrHNJpO7IY5lHOPcwnL2Z7DL45jzPR0KrPu0FgBoATTNPZ9HIzZ5tIDQgjOM5bbPrZWwEE0Ltx7ZLjKJZNnMjAwXFiAr4BU5pnIo5OrIaZHDBdUBTOPZzTOs597MjAvnJuAAzDJ2q4BsUQXMY5WwFhG+EC3p+TIGY0XPU5fs29AejCvpgHKGZznKfpLAAc50TIvZcDI-Z8TPJZt7J-ZKXMjAbLL5ZMoBzZeXJK5AEGJZozIiZmDEmZ0bMK5szK-ZfrOy56ABYMbECa5kbLfZhXKFpCbL0Z6HO2AmHJ65YQDe0FPGaZ+HPaZDTIm5VzK2ZVLIXA7BW9AJwFU537ME5pTPm5C4DYIMUDk5a7J25LsDR6PoBHZgzLU57jIDp-rN3Z5bLA50AGDZkHPeZChQ4KyhXoZ3zKmZ77KQ5w3NFpo3KwAmHMUKnBRUKs3OC5GAAB5JgHMZNAFjMRYBI5enOJZYPP2AzBXAAa7jCMB3LLpnjPh5NAGOUqPO4gv3LkZGDJ4KYYArAo8hPQWLJi5kYAJ5zYGJ5nLNrZl3K65FPPsAR4BoAArNrZQnKEgDPJlAR9Jh5e7LQ5IrJlpzBRfkH9OwZ6bJVZGPM4WNAEPQ3wFq5-HL7cxLMKp4TOLAJ4DO5XXLl5JgFhAFgGS53nOPcQFHgAIBBlA-1EzM2POIAuPPG5cIFu0FPNJ55XIwAgmiaA+wDAMWoDy5EtI1AYJm1A+NJHACTKAgBUJwA1vL2AN4Gd5agAoZ0gBJAjgDiptnM3ZJgDt50oBoZ3oA2pvdL9pwAC6Aa7igAL8kl5zlLzpClKJACjDZACfPeA8zIO02fKmASfLCM873fAfgFL5uAA-APgGUgpfKz53dJz5AfJxA+fJTAyfOL5XVNL5fgFwAQICr5fgBr5a7lz5y6Eb5hfJT56ADNgZfJwAZsC75PgB75dfOKZ8fNr5BfOb5d4Ar57fJwAH4An5U-OoKM-IH5C-N8pbfI75lfOr57Gjn56s3r59oC35RfLvAI-M-AY-LX5h-N75J-OnQQfI2pffLZAnvO9pAbORJ7-Pk54HNkZIbIJpYbOxJhsze5r7IQ5n3Pa5GbON56LJwAR9KB5wvOJZ6dEcAGTMW5xLOC44QEiAMQE7pnPJp5KrMq5rNg55CQFgKXPOKZqLKTZkAsfZ0LPTZAnIGZXXOM5XdItmhvLUZ1DLIF9gHoF5tI0ZygDGZ3QCfZhAvjAKrKk5gjKYFhtKV5IPPQAAgsy5F3Lu5x7lC5BTNoFXApZ5xLLOcc9PrsMgt6AGvIkFWwE05AgtaZxAtQZmHP55O6EVAQvMVp+nJ3QWRDgACXMSALAs8ZBnPMFBAqEFZPIR00nMwFG3KFZaJMDpn-LNp3-Nxpj3NDZwGF6hzXPe5rXL+ZYAu0FsjMw5qsnlAabKMFxLOsF4QrnpynMsFDTJiF7ApoAonPwgWgrgFyQvToLBRUK3Aqu5XXKWQmQsqhOQpp56dK65bkFiFRnKKFQAs85Lgp+5vPIwZuyGMArNgt5mvL9mOJJtc6QG1AqQsqACQoPZnQplA3QpM5jnPcFHHOPcsQsHZAwpOpQwo657bIeqmfHiFdgst5jTPYFEwpSFUwpmF+QobpmfEGFuQtu59gvQAC9LWFTQpk5K7JKFwdJCFyTMgFG9MlZsAq65hwp2FiwtaFPUIeqkPNCAVGR05ntIuFILMgFG7NiAkQrM567LhSm7LWFYnMeFagoZZQIvnZ29N2FewqDAoHOnZnguh0v-Og5LNPp8HJMEFwAo+5hXK+57vPtAEAtFZSlNxJ7JMJJLQvBF9EDRFhJJoAYbGPQ-1ODZj6QJJnJKSQLAA2FdzLcFN3KeZH-L7Z71JeZP-L4AbAAOA5ATR6loAYAwGF4A9YCYg+NKFFGgFj5EnM8ZtAGAsUlPMptIteZCorMpeyHy5ttPBAkjNsZ6nODZkosaAGgGAwDlIOAdUPV5AQrvAmlOmAqYDmACwCWALIooKtrNsZtjLwAQAA");
crossex_html = crossex_html.replace("itgversion","1.20260225");
var ccPanel,ccPanelProxy;
ccPanelProxy={};
ccPanel={};
var NA_VALUES = new Set(["na", "NA", "null", "NULL", "Null", "unknown", "Unknown", "N/A", "n/a", "#N/A"]);

var SIGNAL_HEADER_FILTERS = {
	"Facet_By":        { maxDistinct: 150 },
	"Filter_Out_From": { maxDistinct: 150 },
	"Filter_By_Value": { numericOnly: true },
	"Facet_Rows_By":   { maxDistinct: 150 },
	"Facet_Cols_By":   { maxDistinct: 150 },
	"Filter_Additional": { maxDistinct: 150 },
	"Sum_By":          { numericOnly: true },
	"Size_By":         {},
	"X_Axis":          {},
	"Search_By":       {},
	"SortX_By":        {},
	"Y_Axis":          {},
	"Stroke_By":       {},
	"Color_By":        {}
};

var INTERACTIVE_SIGNAL_HANDLERS = {
	'xcur':   [{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}],
	'ycur':   [{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}],
	'delta':  [{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update": "down ? [x()-down[0], y()-down[1]] : [0,0]"}],
	'anchor': [{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}],
	'zoom':   [{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}],
	'dist1':  [{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}],
	'dist2':  [{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}],
	'xdom':   [{"events": {"signal": "delta"},"update": "[xcur[0] - span(xcur) * delta[0] / Plot_Width, xcur[1] - span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}],
	'ydom':   [{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}],
	'down':   [{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}]
};

var INTERACTIVE_SIGNAL_NAMES = Object.keys(INTERACTIVE_SIGNAL_HANDLERS);

function setInteractiveSignals(spec, signalMap, enable) {
	INTERACTIVE_SIGNAL_NAMES.forEach(function(name) {
		if (enable) {
			spec.signals[signalMap[name]]['on'] = INTERACTIVE_SIGNAL_HANDLERS[name];
		} else {
			delete spec.signals[signalMap[name]]['on'];
		}
	});
	spec.signals[signalMap['Interactive_']]['value'] = enable;
}

var TAB_CONFIG = [
	{id: 'defaultOpen', panel: 'None'},
	{id: 'Search_tablinks', panel: 'Search'},
	{id: 'Charts_tablinks', panel: 'Charts'},
	{id: 'Axis_tablinks', panel: 'Axis'},
	{id: 'Marks_tablinks', panel: 'Marks'},
	{id: 'Fonts_tablinks', panel: 'Fonts'},
	{id: 'Coloring_tablinks', panel: 'Coloring'},
	{id: 'Filtering_tablinks', panel: 'Filtering'},
	{id: 'Margins_tablinks', panel: 'Margins'},
	{id: 'Summary_tablinks', panel: 'Summary'}
];

var _resizeHandlers = {};
var _cookieDebounceTimers = {};
var _panelObservers = {};
var _panelResizeTimers = {};

// Full datasets and call arguments per element, so the render-sample
// control can re-run crossex without re-parsing. Charts and the
// correlation matrix use the (possibly sampled) render data; the
// Summary tab always uses the full data.
var _fullData = {};
var _crossexOpts = {};
// Type/NA/distinct results per dataset, so re-rendering the same data
// (e.g. changing the render sample) skips the full-table scan
var _typeCache = new WeakMap();
var SAMPLE_AUTO_THRESHOLD = 150000;
var SAMPLE_AUTO_DEFAULT = 100000;
// Vega rebuilds the full per-cell scaffolding on every facet change; beyond
// ~10k rendered rows the transition takes many seconds and beyond ~50k the
// tab dies. Faceted views therefore render at most this many rows.
var FACET_SAMPLE_MAX = 10000;
var _renderCount = {};

function facetsRequested(element, repSignalsJson) {
	var saved = loadSignalsFromCookie('vegaSignals_' + element) || {};
	var vals = [saved['Facet_Rows_By'], saved['Facet_Cols_By']];
	if (repSignalsJson) {
		repSignalsJson.forEach(function(sig) {
			if ((sig.name === 'Facet_Rows_By' || sig.name === 'Facet_Cols_By') &&
				!(sig.name in saved) && sig.value != null) {
				vals.push(sig.value);
			}
		});
	}
	return vals.some(function(v) { return v && v !== 'None'; });
}

function getSampleSetting(element, nrows) {
	var stored = null;
	try { stored = window.localStorage.getItem('crossexSampleN_' + element); } catch (e) {}
	if (stored != null) { return parseInt(stored, 10) || 0; }
	return nrows > SAMPLE_AUTO_THRESHOLD ? SAMPLE_AUTO_DEFAULT : 0;
}

// Uniform sample without replacement (partial Fisher-Yates on indices),
// returned in original row order
function sampleRows(data, n) {
	var len = data.length;
	var idx = new Array(len);
	for (var i = 0; i < len; i++) { idx[i] = i; }
	for (var s = 0; s < n; s++) {
		var j = s + Math.floor(Math.random() * (len - s));
		var tmp = idx[s]; idx[s] = idx[j]; idx[j] = tmp;
	}
	var chosen = idx.slice(0, n).sort(function(a, b) { return a - b; });
	var out = new Array(n);
	for (var o = 0; o < n; o++) { out[o] = data[chosen[o]]; }
	return out;
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

var crossexloader=function crossexloader(element,status) {	
	if(status) {
		document.getElementById("cc_loader"+element).style['z-index'] = 999;
		document.getElementById("cc_loader"+element).style['display'] = 'block';
	} else {
		document.getElementById("cc_loader"+element).style['z-index'] = 0;
		document.getElementById("cc_loader"+element).style['display'] = 'none'

	}
}

// Settings persist in localStorage: cookies cap at ~4KB (the full signal state
// is larger and silently failed to save) and get sent with every HTTP request.
function saveSignalsToCookie(signalsArray, cookieName) {
    const signalState = {};
    signalsArray.forEach(signal => {
        if (signal.value !== undefined) {
            signalState[signal.name] = signal.value;
        }
    });
    saveSignalState(cookieName, signalState);
    return signalState;
}

function saveSignalState(storageName, signalState) {
    try {
        window.localStorage.setItem(storageName, JSON.stringify(signalState));
    } catch (e) { /* storage full or unavailable (private mode) */ }
}

function loadSignalsFromCookie(storageName) {
    try {
        const stored = window.localStorage.getItem(storageName);
        if (stored) {
            return JSON.parse(stored);
        }
        // Migrate state saved by older cookie-based versions
        const name = storageName + "=";
        const cookieArray = decodeURIComponent(document.cookie).split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const c = cookieArray[i].trim();
            if (c.indexOf(name) == 0) {
                const state = JSON.parse(c.substring(name.length));
                saveSignalState(storageName, state);
                return state;
            }
        }
    } catch (e) { /* corrupted state — fall through to defaults */ }
    return null;
}

// Clear all persisted settings (localStorage and legacy cookies)
function clearAllCookies() {
    try {
        Object.keys(window.localStorage).forEach(function(key) {
            if (key.indexOf('vegaSignals_') == 0 || key.indexOf('crossexSampleN_') == 0) {
                window.localStorage.removeItem(key);
            }
        });
    } catch (e) {}
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}


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

// Create index map for O(1) lookups instead of O(n) searches
var createIndexMap = function(items) {
	var map = {};
	for (var i = 0; i < items.length; ++i) {
		if (items[i].name) {
			map[items[i].name] = i;
		}
	}
	return map;
};

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var json2csv = function json2csv(filename,json) {
    var fields = [];
	var excluded = new Set(["Y_Value", "Col_Value", "X_Value", "Row_Value", "Count","None","O_Value","Color_Value","Cstr","Xstr","Ystr","Size_Value"]);
    var seen = new Set();
    for (var j=0;j<json.length;j++) {
        for (var key in json[j]) {
            if (!seen.has(key) && !excluded.has(key)) {
                seen.add(key);
                fields.push(key);
            }
        }
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
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(csvUrl);
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
	var width=getContentWidth(widthNode)-buf;
	if (width<40){width=40;}
	return width;
}

function ccOpenCity(evt, cityName,element) {
	var tablinks = [];
	var cc_tabcontent = [];
	TAB_CONFIG.forEach(function(tab) {
		tablinks.push(document.getElementById(tab.id + element));
		cc_tabcontent.push(document.getElementById(tab.panel + element));
	});
	for (var i = 0; i < cc_tabcontent.length; i++) {
		cc_tabcontent[i].style.display = "none";
	}
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	ccPanelProxy[element][element]=document.getElementById(cityName).offsetWidth;
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

function corrColTypes(df, cols) {
	var colTypes = {};
	cols.forEach(function(col) {
		var isNum = true;
		for (var r = 0; r < df.length; ++r) {
			if (!isNumeric(df[r][col]) && df[r][col] != null && df[r][col] != "NA") {
				isNum = false;
				break;
			}
		}
		colTypes[col] = isNum ? "num" : "cat";
	});
	return colTypes;
}

// Tie-averaged ranks via index sort — same semantics as stats.rank but
// without allocating an {idx, val} object per row
function rankArray(vals) {
	var n = vals.length;
	var order = new Array(n);
	for (var i = 0; i < n; ++i) { order[i] = i; }
	order.sort(function(a, b) {
		var x = vals[a], y = vals[b];
		return x < y ? -1 : x > y ? 1 : a - b;
	});
	var r = new Float64Array(n);
	var tie = -1, p, mu;
	for (var j = 0; j < n; ++j) {
		var v = vals[order[j]];
		if (tie < 0 && p === v) {
			tie = j - 1;
		} else if (tie > -1 && p !== v) {
			mu = 1 + (j - 1 + tie) / 2;
			for (; tie < j; ++tie) { r[order[tie]] = mu; }
			tie = -1;
		}
		r[order[j]] = j + 1;
		p = v;
	}
	if (tie > -1) {
		mu = 1 + (n - 1 + tie) / 2;
		for (; tie < n; ++tie) { r[order[tie]] = mu; }
	}
	return r;
}

// Spearman r^2 for one column pair; aligned arrays avoid per-row object allocation
function corrPairR2(df, col1, col2, isNum1, isNum2) {
	var v1s = [], v2s = [];
	for (var i = 0; i < df.length; ++i) {
		var raw1 = df[i][col1], raw2 = df[i][col2];
		if (raw1 != 'NA' && raw1 != '' && raw2 != 'NA' && raw2 != '') {
			v1s.push(isNum1 ? Number(raw1) : raw1);
			v2s.push(isNum2 ? Number(raw2) : raw2);
		}
	}
	var n = v1s.length;
	var ra = rankArray(v1s), rb = rankArray(v2s);
	var s = 0;
	for (var k = 0; k < n; ++k) {
		var d = ra[k] - rb[k];
		s += d * d;
	}
	var rho = 1 - 6 * s / (n * (n * n - 1));
	return rho * rho;
}

// Rank correlation stabilizes well below this row count (SE ≈ 1/sqrt(n) ≈ 0.007
// at 20k) — one consistent subsample keeps the matrix fast on huge tables.
var CORR_MAX_ROWS = 20000;

// The matrix is symmetric with a constant diagonal (rank corr of a column with
// itself is always 1), so only the upper triangle is computed and then mirrored.
var corrmatrix = function (df, cols) {
	if (!cols) {
		cols = Object.keys(df[0]);
	}
	if (df.length > CORR_MAX_ROWS) {
		df = sampleRows(df, CORR_MAX_ROWS);
	}
	var colTypes = corrColTypes(df, cols);
	var corr = [];
	for (var ci = 0; ci < cols.length; ++ci) {
		var col1 = cols[ci];
		corr.push({"var1": col1, "var2": col1, "% Variance": 1});
		for (var cj = ci + 1; cj < cols.length; ++cj) {
			var col2 = cols[cj];
			var r2 = corrPairR2(df, col1, col2, colTypes[col1] === "num", colTypes[col2] === "num");
			corr.push({"var1": col1, "var2": col2, "% Variance": r2});
			corr.push({"var1": col2, "var2": col1, "% Variance": r2});
		}
	}
	return corr;
};

// Async version - processes column pairs in chunks to avoid UI freeze
var corrmatrixAsync = function (df, cols, callback) {
	if (!cols) {
		cols = Object.keys(df[0]);
	}
	if (df.length > CORR_MAX_ROWS) {
		df = sampleRows(df, CORR_MAX_ROWS);
	}
	var colTypes = corrColTypes(df, cols);
	var corr = [];
	var pairs = [];
	for (var ci = 0; ci < cols.length; ++ci) {
		corr.push({"var1": cols[ci], "var2": cols[ci], "% Variance": 1});
		for (var cj = ci + 1; cj < cols.length; ++cj) {
			pairs.push([cols[ci], cols[cj]]);
		}
	}
	var idx = 0;
	var CHUNK_SIZE = Math.max(1, Math.ceil(pairs.length / 20)); // ~20 frames
	function processChunk() {
		var end = Math.min(idx + CHUNK_SIZE, pairs.length);
		for (; idx < end; idx++) {
			var col1 = pairs[idx][0], col2 = pairs[idx][1];
			var r2 = corrPairR2(df, col1, col2, colTypes[col1] === "num", colTypes[col2] === "num");
			corr.push({"var1": col1, "var2": col2, "% Variance": r2});
			corr.push({"var1": col2, "var2": col1, "% Variance": r2});
		}
		if (idx < pairs.length) {
			requestAnimationFrame(processChunk);
		} else {
			callback(corr);
		}
	}
	requestAnimationFrame(processChunk);
};

function escapeHtml(s) {
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtStat(v) {
	if (v == null || v !== v) { return ''; }
	if (Number.isInteger(v) && Math.abs(v) < 1e15) { return String(v); }
	var a = Math.abs(v);
	if (a >= 1e6 || (a > 0 && a < 0.001)) { return v.toExponential(2); }
	return String(parseFloat(v.toPrecision(4)));
}

// One pass over the data per column: count/missing/distinct for everything,
// Welford mean/sd plus min/max/median for numeric, mode for categorical.
// Numeric distinct comes free from the sorted array; categorical value
// tracking is capped so an ID-like column can't allocate a 300k-key map.
var SUMMARY_MAX_TRACKED = 10000;
function summarizeColumn(data, col, isNum) {
	var n = 0, missing = 0, mean = 0, M2 = 0, min = Infinity, max = -Infinity;
	var counts = isNum ? null : Object.create(null);
	var trackedKeys = 0, sawUntracked = false;
	// typed array + native numeric sort is several times faster than a
	// growing JS array with a comparator on large columns
	var nums = isNum ? new Float64Array(data.length) : null;
	for (var i = 0; i < data.length; ++i) {
		var v = data[i][col];
		if (v == null || v === '' || (typeof v !== 'number' && NA_VALUES.has(v))) { missing++; continue; }
		if (isNum) {
			var x = typeof v === 'number' ? v : Number(v);
			if (x !== x) { missing++; continue; }
			nums[n] = x;
			n++;
			var delta = x - mean;
			mean += delta / n;
			M2 += delta * (x - mean);
			if (x < min) { min = x; }
			if (x > max) { max = x; }
		} else {
			n++;
			if (counts[v] !== undefined) {
				counts[v]++;
			} else if (trackedKeys < SUMMARY_MAX_TRACKED) {
				counts[v] = 1;
				trackedKeys++;
			} else {
				sawUntracked = true;
			}
		}
	}
	var row = {col: col, type: isNum ? 'num' : 'cat', n: n, missing: missing};
	if (isNum) {
		var distinct = 0;
		if (n > 0) {
			nums = nums.subarray(0, n);
			nums.sort();
			distinct = 1;
			for (var d = 1; d < n; ++d) {
				if (nums[d] !== nums[d - 1]) { distinct++; }
			}
			row.min = min;
			row.max = max;
			row.mean = mean;
			row.sd = n > 1 ? Math.sqrt(M2 / (n - 1)) : 0;
			row.median = stats.quantile(nums, 0.5);
		}
		row.distinct = distinct;
	} else {
		row.distinct = sawUntracked ? '≥' + SUMMARY_MAX_TRACKED : trackedKeys;
		var top = null, topCount = -1;
		for (var k in counts) {
			if (counts[k] > topCount) { topCount = counts[k]; top = k; }
		}
		if (top !== null) { row.top = top + ' (' + topCount + (sawUntracked ? '+' : '') + ')'; }
	}
	return row;
}

function summaryTableHtml(rows) {
	var html = '<table class="cc_summary"><thead><tr><th>Column</th><th>Type</th><th>n</th><th>Miss</th><th>Uniq</th><th>Min</th><th>Median</th><th>Mean</th><th>SD</th><th>Max</th><th>Top Value</th></tr></thead><tbody>';
	rows.forEach(function(r) {
		html += '<tr><td>' + escapeHtml(r.col) + '</td><td>' + r.type + '</td><td>' + r.n + '</td><td>' + r.missing + '</td><td>' + r.distinct + '</td>';
		html += '<td>' + fmtStat(r.min) + '</td><td>' + fmtStat(r.median) + '</td><td>' + fmtStat(r.mean) + '</td><td>' + fmtStat(r.sd) + '</td><td>' + fmtStat(r.max) + '</td>';
		html += '<td>' + (r.top != null ? escapeHtml(r.top) : '') + '</td></tr>';
	});
	html += '</tbody></table>';
	return html;
}

// ---- Overview: one distribution card per column ---------------------------
// Numeric columns get a mini histogram with range/mean/missing; categorical
// columns get top-category bars. Clicking a card graphs that column's
// distribution. Shown automatically on first visit (no saved settings).
var _overviewCache = new WeakMap();
var OVERVIEW_BINS = 24;
var OVERVIEW_TOP_CATS = 8;

function overviewColumn(data, col, isNum) {
	var n = 0, missing = 0, mean = 0, min = Infinity, max = -Infinity;
	if (isNum) {
		var nums = new Float64Array(data.length);
		for (var i = 0; i < data.length; ++i) {
			var v = data[i][col];
			if (v == null || v === '' || (typeof v !== 'number' && NA_VALUES.has(v))) { missing++; continue; }
			var x = typeof v === 'number' ? v : Number(v);
			if (x !== x) { missing++; continue; }
			nums[n] = x;
			n++;
			mean += (x - mean) / n;
			if (x < min) { min = x; }
			if (x > max) { max = x; }
		}
		var bins = new Array(OVERVIEW_BINS).fill(0);
		if (n > 0 && max > min) {
			var scale = OVERVIEW_BINS / (max - min);
			for (var b = 0; b < n; ++b) {
				var idx = Math.min(OVERVIEW_BINS - 1, Math.floor((nums[b] - min) * scale));
				bins[idx]++;
			}
		} else if (n > 0) {
			bins[0] = n;
		}
		return {col: col, type: 'num', n: n, missing: missing, min: min, max: max, mean: mean, bins: bins};
	}
	var counts = Object.create(null);
	var trackedKeys = 0, sawUntracked = false;
	for (var j = 0; j < data.length; ++j) {
		var c = data[j][col];
		if (c == null || c === '' || (typeof c !== 'number' && NA_VALUES.has(c))) { missing++; continue; }
		n++;
		if (counts[c] !== undefined) {
			counts[c]++;
		} else if (trackedKeys < SUMMARY_MAX_TRACKED) {
			counts[c] = 1;
			trackedKeys++;
		} else {
			sawUntracked = true;
		}
	}
	var entries = [];
	for (var k in counts) { entries.push([k, counts[k]]); }
	entries.sort(function(a, b2) { return b2[1] - a[1]; });
	return {col: col, type: 'cat', n: n, missing: missing,
		distinct: sawUntracked ? '≥' + SUMMARY_MAX_TRACKED : trackedKeys,
		top: entries.slice(0, OVERVIEW_TOP_CATS),
		otherCount: entries.slice(OVERVIEW_TOP_CATS).reduce(function(s, e) { return s + e[1]; }, 0)};
}

function overviewCardHtml(r, total) {
	var missPct = total ? Math.round(100 * r.missing / total) : 0;
	var head = '<div class="cc_ovname" title="' + escapeHtml(r.col) + '">' + escapeHtml(r.col) +
		'<span class="cc_ovtype">' + (r.type === 'num' ? 'numeric' : 'categorical') + '</span></div>';
	var body = '';
	var meta = '';
	if (r.type === 'num') {
		var peak = Math.max.apply(null, r.bins) || 1;
		body = '<div class="cc_ovhist">' + r.bins.map(function(bcount) {
			return '<div class="cc_ovbin" style="height:' + Math.max(bcount > 0 ? 4 : 0, Math.round(100 * bcount / peak)) + '%"></div>';
		}).join('') + '</div>';
		meta = fmtStat(r.min) + ' – ' + fmtStat(r.max) + ' · mean ' + fmtStat(r.mean);
	} else {
		var catPeak = (r.top[0] && r.top[0][1]) || 1;
		body = '<div class="cc_ovcats">' + r.top.map(function(e) {
			return '<div class="cc_ovcatrow"><span class="cc_ovcatlabel" title="' + escapeHtml(e[0]) + '">' + escapeHtml(e[0]) + '</span>' +
				'<span class="cc_ovcatbar"><span style="width:' + Math.max(2, Math.round(100 * e[1] / catPeak)) + '%"></span></span>' +
				'<span class="cc_ovcatn">' + e[1].toLocaleString() + '</span></div>';
		}).join('') +
		(r.otherCount > 0 ? '<div class="cc_ovcatrow cc_ovother">+ ' + r.otherCount.toLocaleString() + ' rows in other values</div>' : '') +
		'</div>';
		meta = r.distinct + ' distinct';
	}
	meta += ' · n=' + r.n.toLocaleString() + (r.missing ? ' · <span class="cc_ovmiss">' + missPct + '% missing</span>' : '');
	return '<div class="cc_ovcard" data-col="' + escapeHtml(r.col) + '">' + head + body +
		'<div class="cc_ovmeta">' + meta + '</div></div>';
}

function renderOverview(element, data, mycolumns) {
	var container = document.getElementById('cc_overview' + element);
	if (!container) { return; }
	var header = '<div class="cc_ovheader"><b>Column Overview</b>' +
		'<span class="cc_ovhint">click a column to graph its distribution</span>' +
		'<span class="cc_ovclose" id="cc_ovclose' + element + '">✕ close</span></div>';
	if (!data || !data.length || !mycolumns || !mycolumns.length) {
		container.innerHTML = header + '<div class="cc_ovmeta">No data loaded.</div>';
		wireOverviewActions(element);
		return;
	}
	var cached = _overviewCache.get(data);
	if (cached) {
		container.innerHTML = header + cached;
		wireOverviewActions(element);
		return;
	}
	container.innerHTML = header + '<div class="cc_ovmeta">Computing…</div>';
	wireOverviewActions(element);
	var cards = [];
	var idx = 0;
	function processColumn() {
		var def = mycolumns[idx];
		cards.push(overviewCardHtml(overviewColumn(data, def.feature, def.type === 'num'), data.length));
		idx++;
		if (idx < mycolumns.length) {
			requestAnimationFrame(processColumn);
		} else {
			var html = '<div class="cc_ovgrid">' + cards.join('') + '</div>';
			_overviewCache.set(data, html);
			container.innerHTML = header + html;
			wireOverviewActions(element);
		}
	}
	requestAnimationFrame(processColumn);
}

function wireOverviewActions(element) {
	var container = document.getElementById('cc_overview' + element);
	var closer = document.getElementById('cc_ovclose' + element);
	if (closer) {
		closer.onclick = function() { container.style.display = 'none'; };
	}
	container.querySelectorAll('.cc_ovcard').forEach(function(card) {
		card.onclick = function() {
			var col = card.getAttribute('data-col');
			var ySel = document.querySelector('#Y_Axis' + element + ' select');
			var xSel = document.querySelector('#X_Axis' + element + ' select');
			if (xSel && ySel) {
				ySel.value = 'None';
				ySel.dispatchEvent(new Event('change', {bubbles: true}));
				xSel.value = col;
				xSel.dispatchEvent(new Event('change', {bubbles: true}));
			}
			container.style.display = 'none';
		};
	});
}

// Lazily fills the Summary tab; one column per frame so wide data can't freeze the UI
function renderSummary(element, data, mycolumns) {
	var container = document.getElementById('Summary_Table' + element);
	if (!container || container.getAttribute('data-rendered') == '1') { return; }
	container.setAttribute('data-rendered', '1');
	if (!data || !data.length || !mycolumns || !mycolumns.length) {
		container.innerHTML = '<span>No data loaded</span>';
		container.removeAttribute('data-rendered');
		return;
	}
	container.innerHTML = '<span>Computing…</span>';
	var rows = [];
	var idx = 0;
	function processColumn() {
		rows.push(summarizeColumn(data, mycolumns[idx].feature, mycolumns[idx].type == 'num'));
		idx++;
		if (idx < mycolumns.length) {
			requestAnimationFrame(processColumn);
		} else {
			container.innerHTML = summaryTableHtml(rows);
		}
	}
	requestAnimationFrame(processColumn);
}

// Single pass per column: detect types, clean NAs, count distinct.
// Distinct sets are capped just above the largest dropdown threshold (150) —
// high-cardinality columns (IDs) would otherwise hold every value in memory.
// NAs become null rather than `delete`: the Vega spec uses isValid(), which
// treats null and undefined the same, and deleting keys pushes V8 objects
// into slow dictionary mode. Results are cached per dataset; above ~20M cells
// the scan runs one column per frame so the tab never freezes.
function computeColInfo(data, headers, callback) {
	if (!data || !data.length || !headers.length) {
		callback({colInfo: {}, sum_cols: [], col_names: []});
		return;
	}
	var cached = _typeCache.get(data);
	if (cached) {
		callback(cached);
		return;
	}
	var colInfo = {};
	var sum_cols = [];
	var col_names = [];
	var DISTINCT_CAP = 151;
	var nrows = data.length;
	function scanColumn(col) {
		var ci = { isNum: true, distinct: new Set() };
		colInfo[col] = ci;
		var dset = ci.distinct;
		for (var k = 0; k < nrows; ++k) {
			var v = data[k][col];
			if (v == null || v === "") { continue; }
			// numbers can't be NA strings and are trivially numeric —
			// skipping those checks avoids ~2 hash/parse calls per cell
			if (typeof v !== 'number') {
				if (NA_VALUES.has(v)) {
					data[k][col] = null;
					continue;
				}
				if (ci.isNum && !isNumeric(v)) {
					ci.isNum = false;
				}
			}
			if (dset.size < DISTINCT_CAP) {
				dset.add(v);
			}
		}
		sum_cols.push({"feature": col, "type": ci.isNum ? "num" : "cat"});
		col_names.push(col);
	}
	function finish() {
		var typed = {colInfo: colInfo, sum_cols: sum_cols, col_names: col_names};
		_typeCache.set(data, typed);
		callback(typed);
	}
	if (nrows * headers.length <= 20000000) {
		for (var h = 0; h < headers.length; ++h) { scanColumn(headers[h]); }
		finish();
		return;
	}
	var next = 0;
	function chunk() {
		scanColumn(headers[next]);
		next++;
		if (next < headers.length) {
			requestAnimationFrame(chunk);
		} else {
			finish();
		}
	}
	requestAnimationFrame(chunk);
}

var crossex = function crossex(element, data, options,widthid) {
	_crossexOpts[element] = {options: options, widthid: widthid};
	//legacy
	var ElementWidth=0;
	//data=JSON.parse(JSON.stringify(data).replace(/\"null\"/gi,"\"\"").replace(/\"NA\"/gi,"\"\"").replace(/\"unknown\"/gi,"\"\""));
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
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	if (add_css) {
		var css = itgz.decompressFromEncodedURIComponent("PQKgBAsghglgdmQyATJat6Oa2sJgCgA6AY2LAG98BIAWygCcBzeALjAAYwoBXAFwHsA3NQAO-AM4xeMfnDb0ApgBso0gG4LhVEVAAmu+IzbsRADw5mL5k6a0B3GLt4ALFgEZ27AKRbnCmIzOvCw08AC0xLK8CnC8WgBmUWGSAF4KbG4KNFpK8AphfgFBLOyEAJxZWgbiIioAnmwARkr8xADWglTUkS30bADEbsRu8QBMUMIAvkSkAPqM9FAizhTUjVDtC-zccLpsvItwNQwxcdR0TKwcXHz8YACEMDRi9LxQsVqN-PS6CvRhAhEYXoRV4wL0MG44jYABYzJ9vr9-l9eAIaMDQeCDFDYfDqA4nK4wHRTBEoqdfP5AsFieFIrEKdRqrUoA0wPElApbPhpiRiPNFstZvS3nl6KttBIpDI5GBFCp1Jp8Y4XBlPD5qIVqWrvJ8Nm0tjs9mA7M4pErtHoDHAjKM8VQUmF4L9TO5hGAPWAvj8-mEUWiMdSsZDoWA4dzPV7Eb7AYGgsGcWG8ZHvUi-fxUfwaGw7eZxPxcrowP0ABxl92e1Mx-giYyEACslnzheLAEF2xWPVX-iDtWBc2Bm45i2WS1N8PARHwANpwKA0BQAXgARAAVP40ZcAXVWkYJqrAJZsDyeLzeH3wkcSsWSMDSbFJ4joSiUOTyBSpxTAbkI7Eql89LUvzcNx7R0fRDGMSxQIjT0OX4VR5FBTtiQYZhZWPGCrCsToeXwfARD5MIsmWXc4KSVJ0jAR9n1fACPVyOB8iAmkf1GRRsmVQkWDKcMUOvMF4nnGAlDZAA1P5dHeKAABowFbEEoCUOTxHecRkj+GB4n4pI7E-GkviUXQUJ6b4BiGEZxhQ9ZNnobZdjJXoBlIFziBQzlUV9Y5iEgjgUOiUwwSUgJZWIU4-hQi50L9Fp2mSN5XjYAA2ZNPSi8JmlaNpiN2Yx-0jdK4CdOBGPycQEppGxIrQ8J4FKnLjSqvC+WFKJYCY8VKCoZl6jYEVTnEE9nm+c8zl5C42kGrr91cDxdU1fSWB4ARxxat5GjIrt9UNBzTL6YtXNIazo3+Tl4kqhsmwLYd+nbVtjp9ZEMzROtGzza6i1ujt6KjR6ARrV6rpbL77p+maMhLVKPRYth4D8EEzioGsNikBo3AetNYzOsFFmxUM+J+7t00zdFsYTfGodQy4MJQx1nS5DJVrmdbxH62JNpNFUiVCIq2bOFNtrso0BgUUWxYx6taw4S73uBu6ET+7HAdlm75cJk7iYDMncZDXFuSoIn-SzHMgdV77Izp3YGf7cdGj4AQ4DWqBmngSaAD4nkYCVwe-AnLQgm04xpP2DjU6VZDrdh63ELRkZ83gGlKAB2espi6O3M0d5nncYyaWGcfgNHoD2aC96auZzJqqFDo5w4w39o9jnR47R8cZn5davXt2QOZ61kmlijpCcF+zdEcsywBr45FAvFMNaN0mFHO8m9Yl-4saXnGIUTAm58etg4FkJVIxhsAAGYmsjbZeFKg+j5M7h6HzfaxHgaJ6ASCi7yomilLovcK79kvp6KeddI6Nx+uBa0RgcLnBqhhaCiDzAwVtt3R2GxFROxdnAd2nsOaFTCErJM+sfZuDek3FGCc3TNWzhtDODt86Fz+BKOOqNqEC1sqPce+1+jixoR3Z2XdM6EAwTADQHMbIGiFrtAsE9eGixQqQ9UKEoG+WAV2DWRDShvUHB9YsZQDHHUfM4PQ-A7BsDCNopB35LDHn6AYsotNiouhzG3LBfMObwUQmAbGKirS+VzNZEeRpuEiwUT9QqUFrC2JibBD0lsXFgFTmDQBPMyQMnZo8Yarx3hjXbrMHQTElASlUYHXsX4q4+zSXzLQCTrZny0JE2BVBT5w00ojPubI6rvkyu0LQRdpDECUmEYKjBZSAjbqAMAYQZmzLmfMhZiylnLJWassIAFiB2XEOILk0gRAAQgPwJEcA5K5GpHpUEYBiDbLCLIUSk9+AFj2eIACAApKEvBvxtA2jzLSMAFBFneEWRgKQYAiBEACgCAABZaBdxQAHEC7iGcNC5ubQoCMAUFcrZOzApgvwGswlRLiUkoAj+MAAAhKAOywAAGUE6cheR6UYhAwAABEYCKGINIHuhyDDxH+U-ACZ9WUAAUpQ8oQHyv5fwXkkvlQq+VeB8L4CmYq9VyyALTjcDuKlNL6V1EZQSjVJr5nKvwNOBgMAoCEOdsoLc047KcgAH4rgEE8sF24SkSplPIZQqgxHHzANMD0WqrU2pUI0e1jqCwKFdcud1Sg9nbhYCwKNiRFAyTDYpW1UalAOqdXGt1jyk2eq3KmqA51mFdSnhm7Mk9DjiAVAoM+ugAAU7A5Kdo4AASi0GEPSjQ2hSD9PqISYUwhqBgJIRoIk2FgDNPoGIep2jjvyFOmdc6qELscL8OA9gRJKAiCYm0VFa3fE4kjZu872BaFfgyf4CgNCxFDIfJiWhQGSrYH-MAagGBtpmZsiQuK9kAkbXXMIuhH4BtkHJQgbgSziB7b+-9gGcW7LBWBsOkriLUsMHJBQ1L8jhGvshv99AAMRHQ3ioEn6ZSQf9XULtSG70+ojlwRozY+AWi+I+O8vlDb8H1nU1035b3UHPfQdE3wAhXAmQBENYBs3WtzdGwt8bE3JvLWmpe3wsVdUkTtMelEdReBuAIIaZ5claD5mwZcy4KyKeUxGu1+aY0uuLR6kQKalpVs6msYJuU5SMHWG2twSc5LhcixFsA5Q+1rA1jrHe9o9oDHiOljLNnySxG-aiCj4bVNKHi1QASt57woYo2h4DGGgSlcopFwg7EsjFdKxcvs5HKNAe2TVsIrX9JyUPlJpSxWApgkk-WjrVXus0YBLsrDRw60DaPsV0pMCGxZG-P+KgppzTJGblRQ+dhBQIj46Cm0fVstgl445gCznCsFtjRpktWnGFF1TemvTWaPSWpzZGtTj3POlu8+Wgub3fPvxYde7d6NRD8Dfr6J9A1v23Bu6GtHSmPRqtNdj6g05Rg7nFZISVkAjkyqfmANtdy6hgGXOU3gy4wDTrAFCAFXpqcuCxZ3ehsgkMAWx-z5V331OA609OKSbwqPVZm2IInMoVx058x9zNWrhcJue2WsXqgbVdZA5hmXdd5egh85WiHBnnrG3M0IagRC5oamrgDJJ81q6NrrfsRtzbW0AY8GYOSYR6zeC7fFj0TmhcA7V157cmuJc656-ryVhvqSK904oCUhnpHGkfkoNty5xdQBYE8DFChgDiDUIwAA1KYGgr5iAmKfgoXgi4+DxDCCWGSXgz4AGES+MC8KMdglelBHHb2y3vowgi8BEO31swBgB2Dn4QOwIrviMGAH3zwxfS+j97+wGaw-R9uFzFvvvLE9+jFGGfFKpgt9nwAKLt47zoFw2+BUvlP+xELUBe8lii9vn-fe-+eDlC95lBH7sDjZv52RvDRBf5lDeB95JTb4IGjAgFn7b66Bv4QAspJT1it6lCeBwHsAd5hBuAipJRkIyR4Hqh97+7lBny4G-hUHsBnwwiEBJRJSjAUEMEEEd6jAlisHsGcH4Hb7n6-hnz1gyQH4MGjC-58FsGdqSGeDSF94d5uAsG8HiEKHsBKHsB8H1i8SCGMFYE4EGEEEABao+wA7ed+neG+Pet+y4yGh8wICgEKqglIoIEM9oPsl+jS8CmsFu4mtAfhRC5CCmt2oeHm4eQOkeueku02oGcecutORu2mJu1acC1MhCm8GQKCYR6O7mRaURousRMe0ubGcACeQQKaoOfw72yeCgX2YABRT2EeDqJR1GCR5RlR9OIOTCfQ4O6RzuakruDaakHu7aR4Pu0y-uXggeqOGOYALAdkGYEoU2uutG4GOGUGiwX60sECVAaxPWdGsguGkg52YAhGOyxUtyfA-acR6xvWX85WmQl6hxM2fWHhUYRknY0wqq4ApRSA2AQJwJIJKAuABAhAGgjANqWQUaRYBmgWxoU8OgM8eSBgagkJCg0JfozoEoTSWEWSVmF4-s0CUSNi5ghJI01mXEB4tulmVJxJ9UMMLx9JOSxJnSsMJU74HIXIrJo0H6c2oyso2MfJ1JJWTxP8yQtEopF4vx-Qpe-0XmxEnIC47MXUG6MAs6uQ26i6e6d6-i5xycG2lJbJiMTJi00sFQNAMpiMiR7GAqpgrOJp-J1AImOogRpWQkoQokbAqkRwGkII2k1AdW38D4v8L4NpCsaYSWoYZ89ovGyQJiugZiJs5gA44YwWoW3a2ZXa8GxWaeXCqWmZUAbaow9Y4h-Y5ZckZZFZpQZQ9Y+ZJ0GQpsn0ugxAbZbZWWTkXoKgfSeE6J04jgAAeiuFSpwkaLMB3rIvQF6m7GAOiWAHOX9sUnOZODOAnBCouKNjuOXNxElE1NMOiZidibOrsB6Eua5t7BXLbm3EeVCTaqeUWBeXmouYznAFOLwNOBuUuAmrsl6pQAAtxP2D4T9CGeVuGXRFQOaZ8T+H+JxCfBaSBGBAaTAphJTF4jSHTtVNTGSVhMeFVF0NMPKYwIqUDsqVkKcJPDnJzuKLwPCdQH0fBOYjukuggM6WKaNrckXExWwMoLkCIJIINOxcSatv9FLFYhSaeAybaShf4fWhJZGXhPgHeViQ+bic+coK+WuZ+d+fLu8Jiv+QtJ8ceMJYjAOgoEOiOksK4YcGFHfExIpUEThdhJwKZQekBfuZYG5XhNpV+XUJuYcJitpuZZZWCE2o4L6PQDsHOM0PkKHO0FeR5SZVJaae4X2Bmd5VQMQI-M-GwPehDplQmciqYsxVhGVZYP0P7uWfWB3o5QWcLMWFVSWDVXVYltvKGJfq1fvNhEOJ9PgfgYpdML5bpYFQoMFYOsOmFYWDGM4NwDQBtGbsYiVWSfhRVf1Z4F1UiGSb1cWOta5SlS6S0ohcldkodd4V5QdWKUTDGWwDooVYiQMPWMgWyjfm4I5dlU-BPPlcwplSFZNSMuCoRrZQdkfI5QQoCBYnGZJaddSYeWIseWpWeRpSuW+R+X5QFfpWNSwIkNldCCwH9SOuFdGdFdRVhglQieOUFpVVHM1bVd5XDRifeTiUjT4peaue+euf5UuKNcFTQPwI6KNWTW0IlQeJ5dDUSYjKfBlZdcSR9blWAN9eKPdZTcaNTTgS1YVW1XjMlBdTDcSd2NtXov0HtYNcpfDUzY+a+cuVpRzTpVzYuDzammEHzQLZjQCLNfNankJomctS5bErtetZtbUT1UbSbZlafN7uLdJe5aLbrRLVGZFe1bdXHdHQFirY9c9a9e9TlV9XDg+qbSpSec6G7MuW7McAgABeRDeCZtRBBYpVeEkF6SJGyH6epDsoGfXZ6AMjAEMkekKfsDWJ3R6HabKPKAGuIt5QVPAitf7SdfHT9EWZVeWQXebapczboCXa5mXYUiwLEM4MeiJO2mfMhl1GBZKU+D+pPVXYJMJD6YOGpAGVpI5d3b3SMmcuMoPZlSPX6gqIGr4c5WQrPZYAOJlYvfuUnLoCWBtPTfhAjevYYFNEyNOiyF0lyUxDFFlKbXA4+WEHOAuBKJxf3T4pvI5R8X2INs+I5d0NOY9cvV-ShWSZlRyW+fVL0sLTA2bYzWvZbTspyNyqsRNVZYDQwO8HZcSDENwLkOVI5c7fzQDTZaI1RKqZI9Op8plUKU6NEDQKGGFPnb9YIzjDfLco9L5C0MwL3Y5YQ+-X1OFErTLYjPVTIt2c0PqI5awtuqUCWO9TQ8WPoEWJlU0nPaneKdXaGdRFKZffY1UMg71D2Zg1-eUT-ePViplZxYxS0MxXxWCoJUHf8KQinalTSUSM1QU4dUTOVIalRDtZrX9EWUwI0GFvod+E024LxMhplekymSxXuivVw0XSzdbezWjbpcuDXgoO0LxoZQbIiaEm+dKEpI5RHUE4U1lTnftL8EJJI2o1E9QNZUDYo31H4BM0JqQy0N4nTq1adgJvPCcwE9PeSY5atpyfM8UjU1tXM9IAszA1MquNRYNICaCYC0C2CeaiQNRmc0iF7d1SyTtf0PEGfPC-CwnevA7jC0bcwWUCWLoI0MiyvI7nbj7P7vaIE5bosxaUS-rC-cMkQ6EPoJyNEzULE2w1oO8AXrsTUPAN+INKVAwG+QKnAOaOOFCm0AoHUPEIsAuINByxXdQN4BQKMQthevIBmKoAoB2r8IwH2sGtQHSeQAq+ICMZAaq22hfuwBq1q9MNMFMrSnNRcOzoIgC8C068CeCfkuILawwHULMEdksHiVAKSD7HQVXCSB+J8TCJMfrJ08xctFbtM+ncWJlgltCy2QdEdHhOtJyC1O6zQHa1C2mD0CoAJVRAW0sDsp-KE88VXJ6bfWyMuAABLKAaCDJQBgAAByCg3ACgy4ckDbSgTbPdsk8kikyk99-p7dWk44GbCgWbHr9A7OzgckU7M7Obnrk89FJJASlgIFBsNzJMzZKsn0LaR7DSEmgp1jcoyE+IZo0Qe2GwINPrIgk71Fy7ubLg3qsu7G5UPdbQdQH6DugRjjqtfjtSzi1sMO0wS7cw2br7ewAqT8YINeh9i7z7UHs7872NnK5UB9RkBDZ7IUbAviwZukFp+5gRIbpCfe9oUbbAupy6p7gUXFfwPFFxL42T06ky4AAAMmhPkLnvfc8IxF7I686yJxgK61m-OLUAoLMIfIMvprDh+7KM7FxtEH+1LFDTkNkfix+i7kq-q82gABoAYzHFZumO4rpSKjxpbpYlgKAw47vJsHvFgKDsDECmtdlyJJSNB6GeDlthVhOR1+e9Y1t2a9v9tDJtsdtds9uNv14DtyQKTWojut2P1BkbvnEDiBdJvRlJ3nxeHXtlT7Z3wPtMz8iqQCfScihOqs0vmn0SkPgRMvilezDldSetSxDVe8PjOfJ1cVvn20S+EBuAJlh4i-FTJTlKBzUIB9FToKB2BgB9H1AeiicrdifKotQzf-LzddTf0cYqcWgQ1+TW5aeBF07GAIh7tHcOigeib7kWdGbWdpfUeW76kBwwKQzIKBJEc3hN1331uxfNuRedvdtgBhdxdDIJfDsqQP3jtBm8hzCFx+B6CDFn0ZAaeiAMP9i2KHi2K4sLz7u6LAzAcZHRT484-cjw-8iI9vwSiL2jhBc11IX6wEI24Hn5KFzEAtA0qn1nOYWXurOfUvx53vwec8IlgXwljsEM8Be5EhNghtZfiGTGT8KzCFwLDDhdTMM8n6za8DqChsAlfUDQlSxZdUAaPmjaO+kHD1417Ncc8MDrs+zn5VwG0POwvE8Oc5fa3EKveklgCdUfc2ZrN5XC8RRp2WcNVwuVrR929qBDI-CvaDFEx08S9S-h8PcJvpax94Pydy9lZUQH72hkOK8FjK-bYFe3tiOHbHYMXcUZM0e7p0fVxzbPdZMCXscq+FzfkSgYVITUhBcK80gUNKTS+VspY+P2KGKd9qBmjSOa8xP9zsicj6zm9aOhi68xBl-G-7tpVfj1jbtNKdWcADjiaU+q9qCnk9-L+Mzp-p4DAwjEBJwlhQBjjnDhBO+jfs9x+qCINOXoQ63WAse1gWPkMgOBmIJQWvZfiy3fqaMsgOjWxloG34+9vu-nMfvrGgp9hAGFPL-qAOtq7kDwScL7uX12zeR72NfJGHXy6a0d909HMEK31Y7t8Y4tAt+vhwvb99qG3ZfoDCG4EgDVA6wfzCVmv7fh7ud-ZzuEiOqfEyg8ZLWrrCAGxxKBzFagbwN4D8DXy5dCAQvzZDMsjKmA5RLfys7FgH+T-F-soJlbbZAE4bcfpwKTg2CBSDHIhlhWn4Zh4YtPCfg4gZ4MoqIUgYKG5Gn4Lg3gPfermJisGec2C-9aKIdwJhn9C4oQbZK4M4GNAz4owMgkqEmBAA"),
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		add_css=false;
	}
	crossexloader(element,true);
	

	var repSignalsJson = null;
	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		// panel flags don't need column types — apply them before the
		// (possibly async) type scan so hidden panels never flash visible
		for (var f=0;f<repSignalsJson.length;++f) {
			if (typeof repSignalsJson[f]['hide_panel'] !== 'undefined') {
				hide_panel=true;
				document.querySelector('#cc_panel'+element).style.display = "none";
				document.querySelector('#cc_tab'+element).style.display = "none";
				document.querySelector('#cc_tabscontent'+element).style.display = "none";
			} else if (typeof repSignalsJson[f]['Links_Editable'] !== 'undefined') {
				document.getElementById('#Links_Options' + element).style.display = "block";
			} else if (typeof repSignalsJson[f]['editable'] !== 'undefined') {
				editable = repSignalsJson[f]['editable']==1;
			} else if (typeof repSignalsJson[f]['exportable'] !== 'undefined') {
				exportable = repSignalsJson[f]['exportable']==1;
			}
		}
	}
	// union of every dropdown's column list — typed in one pre-pass
	var allHeaders = [];
	var seenHeader = new Set();
	if (repSignalsJson) {
		repSignalsJson.forEach(function(sig) {
			if (sig.name != null && sig.bind && sig.bind.options != null) {
				sig.bind.options.forEach(function(hname) {
					if (!seenHeader.has(hname)) {
						seenHeader.add(hname);
						allHeaders.push(hname);
					}
				});
			}
		});
	}
	computeColInfo(data, allHeaders, function(typed) {
	var colInfo = typed.colInfo;
	sum_cols = typed.sum_cols;
	col_names = typed.col_names;
	if (repSignalsJson != null) {
		for (var i=0;i<repSignalsJson.length;++i) {
			if (repSignalsJson[i].name == null) {
				continue;
			}
			var index = signalMap[repSignalsJson[i].name];

			if (index !== undefined){
				spec.signals[index].value = repSignalsJson[i].value;
				if (repSignalsJson[i].bind != null) {
					if (repSignalsJson[i].bind.element != null) {
						spec.signals[index].bind.element = repSignalsJson[i].bind.element;
					}
					if (repSignalsJson[i].bind.options != null) {
						var headers = repSignalsJson[i].bind.options;
						var finalheaders = [];
						var signalName = repSignalsJson[i].name;
						var signalFilter = SIGNAL_HEADER_FILTERS[signalName];
						headers.forEach(function(hname) {
							var info = colInfo[hname];
							var ln = info ? info.distinct.size : 0;
							var isNum = info ? info.isNum : false;
							if (ln > 0 && signalFilter) {
								if ((!signalFilter.maxDistinct || ln < signalFilter.maxDistinct) &&
									(!signalFilter.numericOnly || isNum)) {
									finalheaders.push(hname);
								}
							}
						});
						if (!finalheaders.includes("None")) {
							finalheaders.push("None");
						}
						if (!finalheaders.includes("Sum") && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Sum");
						}
						if (!finalheaders.includes("Count") && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Count");
						}
						spec.signals[index].bind.options = finalheaders;
					}
				}
				if (repSignalsJson[i].value != null) {
					spec.signals[index].value = repSignalsJson[i].value;
				}
			} else {
				var dataIndex = dataMap[repSignalsJson[i].name];
				if (dataIndex !== undefined){
					if ('values' in repSignalsJson[i]) {spec.data[dataIndex]['values'] = JSON.stringify(repSignalsJson[i].values);}
					spec.data[dataIndex]['transform']=JSON.parse("[]");
				}
			}
		}
	}
	spec.data[dataMap["mycolumns"]].values = sum_cols;
	if (data != null) {
		_fullData[element] = data;
		var renderData = data;
		var sampleN = getSampleSetting(element, data.length);
		var facetCapped = false;
		if (facetsRequested(element, repSignalsJson) && data.length > FACET_SAMPLE_MAX &&
			(sampleN === 0 || sampleN > FACET_SAMPLE_MAX)) {
			sampleN = FACET_SAMPLE_MAX;
			facetCapped = true;
		}
		var noticeEl = document.getElementById('cc_sample_notice' + element);
		if (sampleN > 0 && data.length > sampleN) {
			renderData = sampleRows(data, sampleN);
			if (noticeEl) {
				noticeEl.textContent = 'Rendering ' + sampleN.toLocaleString() + ' of ' + data.length.toLocaleString() +
					' rows (uniform sample' + (facetCapped ? '; faceted views are capped for responsiveness' : '') +
					'). Summary tab uses all rows. Change under Filtering ▸ Render sample.';
				noticeEl.style.display = 'block';
			}
		} else if (noticeEl) {
			noticeEl.style.display = 'none';
		}
		_renderCount[element] = renderData.length;
		spec.data[dataMap["mydata"]].values = renderData;
		var sampleSel = document.getElementById('Render_Sample_Select' + element);
		if (sampleSel) {
			sampleSel.value = String(sampleN);
			sampleSel.onchange = function() {
				try { window.localStorage.setItem('crossexSampleN_' + element, this.value); } catch (e) {}
				var opts = _crossexOpts[element];
				crossexloader(element, true);
				delay(30).then(function() { crossex(element, _fullData[element], opts.options, opts.widthid); });
			};
		}
	}
	spec.data[dataMap["col_names"]].values = col_names;

	let amyview;
	crossexloader(element,true);
	delay().then(() => drawGraph(amyview,element,spec,widthNode,hide_panel,editable,exportable));
	});
};


function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable) {
	if (myview) {
		myview.finalize();
	}
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	if (spec.signals[signalMap['Interactive_']]['value']==true) {
		setInteractiveSignals(spec, signalMap, true);
	}
	// Set up tab listeners
	TAB_CONFIG.forEach(function(tab) {
		var el = document.getElementById(tab.id + element);
		el.addEventListener('click', function(event) { ccOpenCity(event, tab.panel + element, element); });
	});
	// Summary table is computed on first open, not up front; it always
	// summarizes the full dataset even when the chart renders a sample
	document.getElementById('Summary_tablinks' + element).addEventListener('click', function() {
		renderSummary(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
	});
	// Overview toggles a column-distribution overlay over the chart area
	document.getElementById('Overview_btn' + element).addEventListener('click', function() {
		var ov = document.getElementById('cc_overview' + element);
		if (ov.style.display === 'none') {
			renderOverview(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
			ov.style.display = 'block';
		} else {
			ov.style.display = 'none';
		}
	});
	// Facet changes rebuild every cell's scaffolding inside Vega — on large
	// rendered data that freezes or crashes the tab. Intercept the dropdown
	// before Vega sees it and re-render through the sampler instead.
	['Facet_Rows_By', 'Facet_Cols_By'].forEach(function(sigName) {
		var wrap = document.getElementById(sigName + element);
		if (!wrap || wrap.getAttribute('data-facet-guard')) { return; }
		wrap.setAttribute('data-facet-guard', '1');
		wrap.addEventListener('change', function(e) {
			var full = _fullData[element];
			if (!full || full.length <= FACET_SAMPLE_MAX) { return; }
			var newVal = e.target.value;
			var count = _renderCount[element] || 0;
			var otherName = sigName === 'Facet_Rows_By' ? 'Facet_Cols_By' : 'Facet_Rows_By';
			var otherSel = document.querySelector('#' + otherName + element + ' select');
			var otherVal = otherSel ? otherSel.value : 'None';
			var enteringFacet = newVal !== 'None' && count > FACET_SAMPLE_MAX;
			var leavingFacet = newVal === 'None' && otherVal === 'None' && count <= FACET_SAMPLE_MAX;
			if (!enteringFacet && !leavingFacet) { return; }
			e.stopImmediatePropagation();
			e.preventDefault();
			var store = loadSignalsFromCookie('vegaSignals_' + element) || {};
			store[sigName] = newVal;
			saveSignalState('vegaSignals_' + element, store);
			var opts = _crossexOpts[element];
			crossexloader(element, true);
			delay(30).then(function() { crossex(element, full, opts.options, opts.widthid); });
		}, true);
	});
	var cookieName = 'vegaSignals_' + element;
	var savedSignals = loadSignalsFromCookie(cookieName);
	var firstVisit = !savedSignals;
	if (savedSignals) {
		spec.signals.forEach(function(signal) {
			if (signal.name && savedSignals.hasOwnProperty(signal.name)) {
				var saved = savedSignals[signal.name];
				// a dropdown value saved for a previous dataset may name a column
				// that no longer exists — restoring it would draw an empty chart
				if (signal.bind && signal.bind.options && signal.bind.options.indexOf(saved) < 0) {
					return;
				}
				signal.value = saved;
			}
		});
	}

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
			editorURL: "https://vega.github.io/editor/",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		myview = result.view.run();
		// Save initial signal state to cookie if it doesn't exist
		if (!loadSignalsFromCookie(cookieName)) {
			saveSignalsToCookie(spec.signals, cookieName);
		}

		// Add debounced listeners to update cookie when any signal changes
		var pendingCookieState = loadSignalsFromCookie(cookieName) || {};
		spec.signals.forEach(function(signal) {
			if (signal.value !== undefined && signal.name) {
				result.view.addSignalListener(signal.name, function(name, value) {
					pendingCookieState[name] = value;
					clearTimeout(_cookieDebounceTimers[cookieName]);
					_cookieDebounceTimers[cookieName] = setTimeout(function() {
						saveSignalState(cookieName, pendingCookieState);
					}, 250);
				});
			}
		});
		// Remove previous resize handler before adding new one
		if (_resizeHandlers[element]) {
			window.removeEventListener('resize', _resizeHandlers[element]);
		}
		_resizeHandlers[element] = function() {
			result.view.width(setWidth_smart(element,widthNode)).run();
		};
		window.addEventListener('resize', _resizeHandlers[element]);
		// The control panel grows when contextual controls appear (e.g. Sum_By
		// for stacked charts). Shrink the chart to fit instead of letting the
		// widget overflow into a horizontal scrollbar.
		if (window.ResizeObserver) {
			if (_panelObservers[element]) {
				_panelObservers[element].disconnect();
			}
			var lastPanelW = -1;
			_panelObservers[element] = new ResizeObserver(function(entries) {
				var w = entries[0].contentRect.width;
				if (w === lastPanelW) { return; }
				lastPanelW = w;
				clearTimeout(_panelResizeTimers[element]);
				_panelResizeTimers[element] = setTimeout(function() {
					result.view.width(setWidth_smart(element, widthNode)).run();
				}, 120);
			});
			_panelObservers[element].observe(document.getElementById('cc_tabscontent' + element));
		}
		// First visit with no saved settings: open with the column overview
		if (firstVisit && !hide_panel && _fullData[element] && _fullData[element].length) {
			renderOverview(element, _fullData[element], spec.data[dataMap['mycolumns']].values);
			document.getElementById('cc_overview' + element).style.display = 'block';
		}
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
				// export the full dataset, not the (possibly sampled) render data
				var ds=_fullData[element] || result.view.data('mydata');
				json2csv('crossex.'+element+'.csv',ds)
			}, false);
			var cross_checkbox=document.querySelector("#Show_Covariance"+element + "> div > label > input[type=checkbox]");
			cross_checkbox.addEventListener('change', (event) => {
				if (event.currentTarget.checked ) {
					document.getElementById("Violin_Options"+element).style['display']='none';
					crossexloader(element,true);
					corrmatrixAsync(spec.data[dataMap["mydata"]].values, spec.data[dataMap["col_names"]].values, function(corr) {
						result.view.change('covariance', vega.changeset().insert(corr).remove(function () {return true})).runAsync().then(function() { crossexloader(element,false); });
					});
				} else {
					document.getElementById("Violin_Options"+element).style['display']='block';
				}
				myview = result.view;
			});
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Search_By","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","SortX_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","LogY_","Jitter_" ,"Weight_Contour","Tips_","Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point","Min_Point","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Include_Only","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Manual_Color","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Plot_Padding","Title_Height","X_Axis_Height","Row_Header_Width","Row_Height","Max_Facets","Legend_Height","Legend_Cols","ContourCounts","Resolve","Contour_Levels","CellSize_"];
				for (var i = 0; i < new_signals_ar.length; i++) {
					spec.signals[signalMap[new_signals_ar[i]]]['value']=result.view.signal(new_signals_ar[i]);
				}
				result.finalize();
				delete result.view;
				delete result.spec;
				delete result.vgSpec;
				delete result.finalize;
				setInteractiveSignals(spec, signalMap, event.currentTarget.checked);
				myview = result.view;
				delay().then(() => drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable));
				return;
			});
		}
		crossexloader(element,false);
	}).catch(console.error);
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
	var trimmed = string.trim();
	if (trimmed[0] == '[' || trimmed[0] == '{') {
		try {
			var parsed = JSON.parse(trimmed);
			if (!Array.isArray(parsed)) {
				parsed = [parsed];
			}
			// union keys across the first rows in case some are sparse
			var cols = [];
			var seen = new Set();
			var limit = Math.min(parsed.length, 100);
			for (var i = 0; i < limit; i++) {
				for (var k in parsed[i]) {
					if (!seen.has(k)) {
						seen.add(k);
						cols.push(k);
					}
				}
			}
			parsed.columns = cols;
			return parsed;
		} catch (e) { /* not valid JSON — fall through to delimited parsing */ }
	}
	if (string.search(/\t/) > 0) {
		return d3.tsvParse(string, d3.autoType);
	}
	return d3.csvParse(string, d3.autoType);
}

// Large delimited text parses in ~8MB slices with a frame between each, so
// the tab stays responsive and progress can be shown. RFC-4180 quoted fields
// may contain newlines, so anything containing a quote falls back to one
// monolithic parse; JSON always parses in one shot.
var CHUNK_PARSE_BYTES = 8 * 1024 * 1024;
function parseInputDataAsync(string, onProgress, callback) {
	var trimmed = string.trim();
	if (trimmed[0] == '[' || trimmed[0] == '{' ||
		string.length < CHUNK_PARSE_BYTES || string.indexOf('"') !== -1) {
		callback(parseInputData(string));
		return;
	}
	var parseFn = string.search(/\t/) > 0 ? d3.tsvParse : d3.csvParse;
	var headerEnd = string.indexOf('\n');
	var header = string.slice(0, headerEnd);
	var rows = null;
	var pos = headerEnd + 1;
	var totalLen = string.length;
	function parseChunk() {
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
			callback(rows);
		}
	}
	parseChunk();
}

// Files above this size skip the textarea (a preview is shown instead):
// a 50MB string in a DOM textarea costs seconds of layout time and doubles
// the memory held. Editing the textarea discards the loaded file.
var LARGE_FILE_BYTES = 4 * 1024 * 1024;
var _loadedFile = null;

function loadFileIntoInput(file) {
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
	document.getElementById("myccinput").value = itg_decomp("M4BwpgxglmwDRWAGwIYDsAmcBGUlIH0kw0BzAFwAsCBbGnPQjMEK2+gMyShHACciJCtTo4A9hgCetFMGAFScYGAAecSWBR8AsACgAgs25g4AFTF9SYPsrRwADADoAjA8cB2OM4AcrgMzuAKz2cDQoxHAATPb27nqGYMZmFlY2JHB+AJyOgV7ujgAsXt4AbBneMXAcYGER0bHxRjDJlta2cAVOfsVembl+kcFVNeEm9XEGTSbmrWl2AHL6cIvLSysr442JzTOp7X4lHr2O3c6Z3X4FQ9W1YzETCUm7belZJ1FOZWchB0O3Hw1JttpikXnY-N5HJk8o5vMV-CVBsN-psgU9QXMMtlIscvn0OiUgqFRgCHlMWntXgUXMUaWcLgUiRt7lt0bN2gUcdFHDjvh1BiFmYDHjsMft8nDnPlXD4yn4-JUhWTgRSwRkJTDThV1YqlqiRSD2ekCs46fkvt4cQNKjcSfryc9MRDHGVIqbeZl-BUQiiWWjRUbwdTXaaZZk4QVOj67X6DaqnYcvhqfP13DaRnVYw6xa9IZ4zr1+lcQrbM8Ls4H+TkPkczp5i9Gy8q2ZSg4VaUUfEV5UjS3dyyrHRyQ9WzkVOZVfQOkgAhRAQMQmAKw2mndzdqPImPT5pz4ALpf5fN54o-EqT7fN3fzxcZQJQ4687zQiHpqdXkx7g-lHm0mXefo+kbfsPzgL9b2dSV8ifH5vWJJtWWvfcIPvLUHx8TxXxLDMQMQz8bxMToXVpC0LkCP5LzwsCCI6JxcildDvEw+otwQ-18OQw9GOIqUrWca4cNJKjwMIujaWhHwfiA+DcPYuAABE+E0eg3now583cOEBgE98qMU5T1V-HwzS0zILzYuN9JQFTsno5NvC0hVsN0uSrPoIiJMhTzuzM4ChNcpTrIyQ5O3zfEe1yPt-MswKbN-N06UyMoTQoizyTcn84WiXopNS2SYoMzkjMhejtT8cjnMogKDOXPF3h8fwnNY-L0tirEVzOOlvHHEo8ui1qasOUrij4nSqoKoKiMlSFO3C3yZP6lUMoOWlSrlZw33GgbJupMNaySjpNxciaVPzQ5PP6GJKrSpa2reC0OrMglzJa27CtDXoRoyTlcmO7bTtHLy8mhSJMiZPUszeoKVoYiSnsuMabqSDKiu6BKPVcFK-PtFURPapNa1KO9NrLbxhJooj-0YiMmqnMm5Lx8qYThn5i2agF6bjPHOWOXIWM6Pr6k58lGepUqus8UGSf7YXcYp01O0hPF-DTbGYll2caKyGE1rvRGZfJzjaJ4yFJXOcoXo5w3vwOUdE3hKIAOug2Ga181jjDbsgjV+wNaQm37zOxj+n452rddo2TXeBKw1ySNLaF62IPdqVin6c8w8TiPvyjqmPRxAWfb9jibZCmF-yKSInfZrOuflk3eitaS6aTpd7zUozwvKzP1dbjoPs6-8Iw2ouqKHV57wk+2+QVfXw7jce7Cjs32zOCM2ZbuTF4yPxRxZ4LpfnitW3a49V-h+bN4XnNwWyAmPTlCqa97reb46e9pvQsH+8Fl-r8rcqo58j0XhqrZ+vsx5vyKp-EBccBQLVrsfNUHkvCHDNirQ+iDBxv2XB6Ve3UsQJz-kghMRlDj-kwk-KKWCWzIMiIlRKccroIOIdggBwYYRPhfCxahrDaGYiKhJFOB1GREIga-AB6laTTUwnBXh4j-4n0AXtWa3QJyj2qtDfIa5HqNTnjQ5oKNTRoy6L0bsT8r7-WCvVWyOULYaJOtYzyJsXzBB7goqxzpTjYmKC+Zu25i4KTukDYyZszyYL4YYu6gcejRCtFQwSBiTBGK6jSaIcdaYBL0ndUKXUiwRI8VDOKD1-zJQ3lkzRKlDi8m0cUTCTV5GBJRk4T+INfYdEyaTbJNVIRUzxD8MBjTumTVMcZEByVu4sMKcjO6u8ZTkLyFleaQzKkdOKnvAuI8pmBMZnZL+Vp3C9kSTETIfcTQfA+Gow5v1tynOzsnWspEMixEisc+wdy65G2XFlEIfIfo+w+SLN23E8Ro0yEcqcgK5ZfOyGfbyesAV92dPfXoL5vbgKhZrL5kIuS-IvmIzF-sIK9LyA7PwUpXmQrObvD0vR6zuCJFS+5S4SXOCGr0LSlpKW3LOfeV0ozPTPURcy0+MIwoXB4W8wlJdbxFTwSA+skRGU8pFfdGsYV-DLKlWc+hZ9vHJReVM6V8Z9hK1JT4JZBTjXb2XCYveaLlVlmtTgmJqcfAvkmfI51lZc4kV8TvJETLFFqltjU4qmFQ4YsgQAo8xwzZaTcUa6NJ8iI1LyHKNmXrk3IIVqtD4VomI3Kddmp095eST2KHKew+iTklo5J8T6ZxoRRmFcGp0psYTKwyEq7lxaJEptNOLbxGSCV1teEIxK-hq3uO9Sm3asSNq0VHf2kNJVmZ2IilGldAi5mPjpcTVtni0F5vpAerdjjlzixAc2xkRb+zGuWqylOTFvoQpVY431DEQFSWXRevlOtej+ApeeqxqaayuBYlkR197hmnVQYDfJM7YOithr0NR8Cg2gacGGsMDIrXIaIiijC31oMAgfXdehMp27FC0tOkDRTjYaQ3dcpNqzbXwbNlaZhWa2POOPOnX+7zkNvCfDxJ6-zWMXunjNYoG4iQ8akzCM2RYa1CbY-ZRKFx0WYYYzDaUdSdRIdWVHK9HxMbMKZQAcRIOQMQYhqKRwWc4GlURnCY0TfIiY1m0C2fs3jIYbLo4KjgIEMBLlvO+YcznE8zh51uhCJGVTXmbN2ai7eALZbXNwlC2I5LPnUvcxTmLVzuRAhHSqhFgrFN2XOerPF9+SW9CVb8xTe8nYOFukxnIt5eXIvcykfxaOBZAgsXCyllrkdd6nF3pXd5h0Cm9aq45jqbWSshcjWN-LE2c5OAkrvSWsWCSNd0M1tLhEp5pLZSFixFXxtnffqOfbrmerHdO9zGTsXiJum6IEaum2+utY6h1xd6jwGLe27K7IpwYluk8L9wT4P7s81q3zEHkbPNNbu9zHxg2uRujgCUTpsk3vVaMsV6Izbuv-aW9F2s94IORBxIESZ1OIcmGCGTob2Wwu3a20j+nXhyf8RC9xnrmO+f9dHELtRm4Mcnax6T6HK43Slbo6zpH9C9uXdVwt8XAPltUe1+t3LeuaeyuK59tGV2TS6n8iTyOyZUeld6j7RH73OdW4SxnMHpu2ci68KhKI2VyII990j2pg20aM5Cxh3n+uc70MlNSXFzbBli-lxLwHMpyexBF69hXRtAh31JZEYL55Q8Z-j5Duk1IsrB-R28+m9vaedkOFHkIZWxFN4LwnniT3vsdGkis5v5vV61LdNCEbgnu+Z8jp2Xe-KaaqZn1XwiMWYftOZ9PsP3NdVeH7+0rIy+d8U2L1dxnpWeddMr2bwigfasHYSw0xvJ-I5n9R8lbTFSR-s7EoNkG0eIeGiP+ayXwu8IMqcBQWqm8IBVwj2D49WoOw+Pe6Wf+FaF+IW5W1+sB1IWuVuP2WyyBs+OcmWg2WUwuzOXer+Oc08yermCW1cRBq+HQa6n2DOHeRO4csBAun2lcIOsuL+N+fuHOVGQeOuwBKBhENW1IfB9Y0B3+kh78Ae7YjOHeauChxBsqu8ko4BHwNMBSK+t+D29EfMweFmGhzBBQLmn2fM7SiW7ihhwhTgnYgejORQQB2y1Bsq9+2heh-IBhXhUhnOABrglBEhmhd+tYuhbo44AhMBihZW9UMO5KIWLunhQh-OQO8UBYoiDhgRg+HUx6peHeV+LssB1SguKhh2BQaRQojhSOtigWeOk+cE8RERay9EdBqhHQaebRzBHO+YphP2N22BihjIdOrmn+x+GRkuLhX2+Obi4RlhOKyhroCxWyfRRhNRUuyuqcI2ARMxpOLhkxPRBxsBZq5+wWv2VBhxDuOxKeQq4C9R-mA8beQeIQGcSxWxpBvhKuPR0x3BZCKhpeIW-iox7RUBNedWzgBciIvaMGtx34I2o4-6jOoR5SfasB+Q7WX2MJPRb6mJCRvy6BkQ7hLOKqOB6EvxeJt6RmIBHOUE0cVcqRy6sBM2lRfBEY3uPG9JxilRXIPgIWnB9QdyWJUurmBchaW69JlGJeVxIxCJYpJhWWg+qmopCR9COGQe2WWBipYx1GNhEp-xdJYxjRCybhqRgm6pEJFu1IB244jB2qiJqBK2RwjOZQ+xwqsB2Qcx5ByU4Kd6ZG+R2xEkHW0eBQUpPJYxH2MhlyBIBJep7RgQrxdWSIU+Xp0ZKJrmlOap+R5E6EkszJgQ3uVmYx0EyhTug+8mTp3pdIph2WiapZEJEe1Jn+SIQo1plhx6gWEGFBjZFJYxpo+Ydp9BpxJpSZ7JZB2Z12rJYxU2gufhVw1ZTZyxdZaSc2FUGZSZaB2RHpouK5Wx2QkoJJk+YJiZlhu8Jh2RaiaRUZSZg68GaM8ps5EJFRbBrm9YAQ8JQZzp7OPBroVxf2A5NpKJbpkBUpHZwZHaTRQeOInxrGYpvI-e1RAZ0pih6wawmFqwP55RWRVuccjpB5Thq8MOgBX+hJEJpBteRpnpaFEJ2QF2vZP2upP5AAwpQFAGgMAOQHwCgCAEEoVDVvkHDPErrroOxZxdxbxfxRlAFo0QdFkCbuJRxVxTxXxQJUFMmTYp3BcGkS5BJapdJRpe5KtsZMeAmgmf5AZVJepbJXvp1GbJhCxvpSpTZTJW1HAWGvGliMdtZWpe5YJakjUlpPAnLn5UZbJXycZB6E5RXuFbZR5Q9HDHHA3i5ZJf5cZettpXDFpKUVZa5RlSjNPMmObFhD7spelRFW1FpZLAKl7KRqiPFQFZNBpPVABIZuVU1ZlSNn+GZrRHFQVVVYVBWgxGGD8KFt+Y1YNQlQZBziAl9vYOZgNZVTNZpaYtlHWDvEpV1bJYydNBgu4hMDtYlfgmJqzL5dNc1e5DjisWcHHCxVNStVdVWLklqAiGJcdYVKwcAoBt9NtZdZlVYUCRaJLPIWxJ9WtWJufBcK0VVBDe5ANsJYWFtYdXoPDTHo2t-FjFMkdQDbJX-jJpBnERUujZCSAgCPYukaTWXAxOgh1SsujciT8h8HHAqeHKTbtvBiDd2gcYzV0S0n1VYTcaTfQh3MePUtMYzVTD8mohsSTXjR5bCn6ndQfBoqTT9YFmbH4rzQrYVM+jYv0IRfLU9d1bimBQwcLbrZNOdFzY3FEL0cbYZatfQMznvAgdWu-JbSbSjHDNCblGrVbQjUZBrS+r8HkRVU7c9Rzr7WGI-NvhHW5YDQaWFI-Drd7dVZzahmcHKISJNbWgnYVRnR1GutEJjBiQiYzU4DKEjTPMTX2qTb7SGAXMKfnVLYDITMxFaWjYHQUYyd4lpLnVuqTayjTZkB6pZSKd3enbNbmgWKXT5cKqTa6hHqVdyU6ZXftG6fYGouofXT3UVHslqBLUZozZqdIvugjIvfvaQdPIKtpCffvVDscG0jvV3QXUNZDaJj8gWsukvVDbNOYhPa3T3Vpb7bYXKGeWxfvd2TVs+MFLme-c7Q9kxirWHUPSAx-HGh8PWOYXvdPZNJeb1XEn9Q-fg9dSbDpeqA1cA2QyLo9KOTblfbQxzqJmFLlcubckAA");
};

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
};

document.getElementById("graph_button").onclick = function clicks() {
	var btn = document.getElementById("graph_button");
	// rows already parsed (large file re-graph, or generated demo) — reuse them
	if (_loadedFile && _loadedFile.struct) {
		graphStruct(_loadedFile.struct);
		return;
	}
	var string = _loadedFile ? _loadedFile.text : document.getElementById("myccinput").value;
	if (!string || !string.trim()) {
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
				return;
			}
			if (_loadedFile) {
				// keep the parsed rows for re-graphs and let the raw text
				// (hundreds of MB for big files) be garbage collected
				_loadedFile.struct = struct;
				_loadedFile.text = null;
			}
			graphStruct(struct);
		});
	}, 30);
};

function graphStruct(struct) {
	toggle("myccinput");
	var headers = struct.columns;
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





