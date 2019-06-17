// include applyFilters
const applyFilters = require('applyFilters').applyFilters;

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

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  sayHello();
});
