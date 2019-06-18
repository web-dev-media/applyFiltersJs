# applyfilters a JavaScript hook module

> a simple lightweight javascript module to implement hooks in your project.

Execute functions hooked on a specific filter hook, specifying arguments.

## Install

Using npm:

```sh
npm install --save applyfilters
```

## Usage
Place a dofilter event

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
applyFilters.doFilter( 'beforeSayHello', {} ).then((filteredResult) => {});
```

Add a filter function
```js
/* 
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
 */
applyFilters.addFilter('moreThenOneFilter', (resolve, filteredResult) => {
    resolve(filteredResult);
}, 1);
```

## Example
example/src/index.js
```js
const applyFilters = require('applyFilters').applyFilters;
const filter = require('./filter')();

/** build a simple function **/
const sayHello = () => {
  const helloStr = 'John';
  const span = document.querySelector('h2 span');

  /**
   * Place the doFilter() function this will handle
   * the registred filter functions
   *
   * @param {string} filterName
   * @param filterObj
   * @param args
   *
   * @return promise
   **/
  applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
    span.innerHTML = helloStr;
  });
};

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  sayHello();
});
```
**filter the helloStr from other place like a new file**
> example/src/filter.js
```js
module.exports = () => {
  const applyFilters = require('../../applyFilters').applyFilters;
  
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
  applyFilters.addFilter('beforeSayHello', (resolve, str) => {
    str = str + ' and Rene';
  resolve(str);
  }, 1);
}
```

The finally result in browser
```
applyFilters example - say hello to John and Rene
```