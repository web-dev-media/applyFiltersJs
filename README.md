# applyfilters a JavaScript hook module

> a simple lightweight javascript module to implement hooks in your project.

Implemnt promise callback hooks in your projects.
## Install

Using npm:

```sh
npm install --save-dev applyfilters
```

## Usage
Define a dofilter

```js
applyFilters.doFilter( 'myFilterPoint', {} ).then((filteredResult) => {});
```

use a filter
```js
applyFilters.addFilter('moreThenOneFilter', 'filterTwo', (resolve, filteredResult) => {
	resolve(filteredResult);
}, 1);
```

## Example

```js
let sayHello = () => {
	let helloStr = '';

	/*
	 * @param {string} filterName
	 * @param filterObj
	 * @param args
	 */
	applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
		alert(helloStr);
	});
};
```
filter the helloStr from other place like a new file

```js
/* 
 * @param {string} filterName
 * @param {string} hookName
 * @param {function} callback
 * @param {number} priority
 */
applyFilters.addFilter('beforeSayHello', 'addMyName', (resolve, helloStr) => {
	helloStr = 'Rene';
	resolve(helloStr);
}, 1);

sayHello();
```