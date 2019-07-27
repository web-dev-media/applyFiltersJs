const applyFilters = require('applyFilters');
require('./filter')();

/** build a simple function **/
const sayHello = () => {
  const helloStr = 'Sven';
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
  applyFilters.doFilter('beforeSayHello', helloStr).then((helloStr) => {
    span.innerHTML = helloStr;
  });
};

/* run codeexample on document loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  sayHello();
});
