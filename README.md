[![npm version](https://badge.fury.io/js/applyfilters.svg)](https://badge.fury.io/js/applyfilters)
[![Build Status](https://travis-ci.org/web-dev-media/applyFiltersJs.svg?branch=master)](https://travis-ci.org/web-dev-media/applyFiltersJs)
![npm](https://img.shields.io/npm/dt/applyfilters)
![NPM](https://img.shields.io/npm/l/applyfilters)
![npm bundle size](https://img.shields.io/bundlephobia/min/applyfilters)

# applyfilters a JavaScript hook module
**a simple lightweight javascript module to implement hooks in your project.**

Execute functions hooked on a specific filter hook, specifying arguments like you know it from WordPress in your JavaScript project.

## Install
```sh
npm install --save applyfilters
```

## Usage
#### require
```js
const applyfilters = require("applyfilters");
```

#### add a dofilter event
```js
/*
 * Place the doFilter() function this will handle
 * the registred filter functions
 *
 * @param {string} filterName
 * @param filterObj
 * @param args
 *
 * @return promise
  */
applyfilters.doFilter( 'beforeSayHello', {} ).then((filteredResult) => {});
```

#### a filter function
```js
/* 
 * Register a custom filter before doFilter('beforeSayHello') and change the response.
 * 
 * Attention: the callback function in addFilter() 
 * runs in a Promise so you have to resolve this!
 * 
 * @param {string} filterName
 * @param {function} callback
 * @param {number} priority
 * 
 * @return void 
 */
applyfilters.addFilter('beforeSayHello', (resolve, filteredResult) => {
    resolve(filteredResult);
}, 1);

applyfilters.doFilter( 'beforeSayHello', {} ).then((filteredResult) => {});
```

## RunKit Example
```js
const applyfilters = require("applyfilters");

// Usage see -> a filter function
applyfilters.addFilter('runKit_test', (resolve, filteredResult) => {
    filteredResult.runkit = 1;
    resolve(filteredResult);
}, 1);

// simple object
var runKitObj = {foo: "bar"}

// Usage see -> add a dofilter event
applyfilters.doFilter( 'runKit_test', runKitObj ).then((filteredResult) => {
    console.log(filteredResult);
});
```


## Example
[example/src/index.js](https://github.com/web-dev-media/applyFiltersJs/blob/master/example/src/index.js)

```js
const applyfilters = require('applyFilters');
require('./filter')();

/** build a simple function **/
const sayHello = () => {
  const helloStr = 'John';
  const span = document.querySelector('h2 span');

  /**
   * Place the doFilter() function this will handle
   * the registered filter functions
   *
   * @param {string} filterName
   * @param filterObj
   * @param args
   *
   * @return promise
   **/
  applyfilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
    span.innerHTML = helloStr;
  });
};

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  sayHello();
});
```
**filter the helloStr from other place like a new file**
[example/src/filter.js](https://github.com/web-dev-media/applyFiltersJs/blob/master/example/src/filter.js)
```js
module.exports = () => {
  const applyfilters = require('applyFilters');
  
  /**
   * Register a custom filter on 'beforeSayHello' and change the response.
   *
   * Attention: the callback function in addFilter()
   * runs in a Promise so you have to resolve this!
   *
   * @param {string} filterName
   * @param {function} callback
   * @param {number} priority
   *
   * @return void
   **/
  applyfilters.addFilter('beforeSayHello', (resolve, str) => {
    str = str + ' and Rene';
    resolve(str);
  }, 1);
}
```

The finally result in browser
```
applyfilters example - say hello to Sven and Rene
```

# What is in the inside?
| Name  | Type  | Description |
|---|---|---|
| [filter](https://github.com/web-dev-media/applyFiltersJs/blob/master/src/applyFilters.js#L3) | array | contains all registered filter |
| [addFilter](https://github.com/web-dev-media/applyFiltersJs/blob/master/src/applyFilters.js#L14-L40)  | function  | registers a function that use a filter/hook 'doFilter()' |
| [doFilter](https://github.com/web-dev-media/applyFiltersJs/blob/master/src/applyFilters.js#L50-L80)  | function | register a filter/hook for this can add a filter 'addFilter()' |
| [asyncForEach](https://github.com/web-dev-media/applyFiltersJs/blob/master/src/applyFilters.js#L91-L108) | function | Iterate the registered filter from this.filter |
| [getFilter](https://github.com/web-dev-media/applyFiltersJs/blob/master/src/applyFilters.js#L119-L123)  | function | returns all registered filter |

#### contact
* info@web-dev-media.de
* https://web-dev-media.de
