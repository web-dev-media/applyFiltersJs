!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}({"./node_modules/applyFilters/applyFilters.js":
/*!***************************************************!*\
  !*** ./node_modules/applyFilters/applyFilters.js ***!
  \***************************************************/
/*! no static exports found */function(e,t){const n={filter:[],addFilter:function(e,t,n=0){try{if("string"!=typeof e||""===e)throw"unexpected usage of addFilter - filterName is undefined";void 0===this.filter[e]&&(this.filter[e]=[]),n||"number"==typeof n||0===(n=this.filter[e].length)&&n++,void 0!==this.filter[e][n]&&n++,this.filter[e][n]=[],this.filter[e][n]=t}catch(e){console.warn(e)}},doFilter:async function(e,t,n=null){const r=this;try{if("string"!=typeof e||""===e)throw"unexpected usage of doFilter - filterName is undefined";if("string"!=typeof e||""===e)return"filterName is empty";const o=void 0!==this.filter[e]?this.filter[e]:null;if(o){const e=r.asyncForEach(o,t,n);return Promise.all(e).then(e=>e[e.length-1],e=>{console.log(e)})}return t}catch(e){console.error(e)}},asyncForEach:function(e,t,n=null){const r=[],o=Object.keys(e);for(let i=0;i<o.length;i++){const l=parseInt(o[i]);void 0!==e[l]?r.push(new Promise((r,o)=>{(0,e[l])(r,t,n)})):r.push(new Promise((e,r)=>{e(t,n)}))}return r},getFilter:function(e=""){return void 0!==this.filter[e]?this.filter[e]:this.filter}};e.exports=n},"./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/*! no static exports found */function(e,t,n){e.exports=()=>{n(/*! applyFilters */"./node_modules/applyFilters/applyFilters.js").addFilter("beforeSayHello",(e,t)=>{e(t+=" and Rene")},1)}},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(e,t,n){const r=n(/*! applyFilters */"./node_modules/applyFilters/applyFilters.js");n(/*! ./filter */"./src/filter.js")();document.addEventListener("DOMContentLoaded",function(e){(()=>{const e=document.querySelector("h2 span");r.doFilter("beforeSayHello","Sven").then(t=>{e.innerHTML=t})})()})},0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */function(e,t,n){e.exports=n(/*! ./src/index.js */"./src/index.js")}});
//# sourceMappingURL=example.bundle.js.map