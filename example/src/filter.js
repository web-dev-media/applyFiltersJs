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