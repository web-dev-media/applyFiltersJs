# applyfilters a JavaScript hook module

> a simple lightweight javascript module to implement hooks in your project.

Implemnt promise callback hooks in your projects.
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

```js
const applyFilters = require('applyFilters').applyFilters;

let sayHello = () => {
	let helloStr = '';

	applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
		alert(helloStr);
	});
};
```
filter the helloStr from other place like a new file

```js
applyFilters.addFilter('beforeSayHello', 'addMyName', (resolve, helloStr) => {
	helloStr = 'Rene';
	resolve(helloStr);
}, 1);
```

Run the example on DOMContentLoaded
```
document.addEventListener("DOMContentLoaded", function(event) {
	sayHello();
});
```