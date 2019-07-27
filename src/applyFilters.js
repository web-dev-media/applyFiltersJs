const applyFilters = {
  // container for all registered filter
  filter: [],

  /**
   * registers a function  that use a filter/hook 'this.doFilter()'
   * this function can modify the code execution or data
   *
   * @param {string} filterName
   * @param {string} callback
   * @param {number} priority
   * @return {void}
   */
  addFilter: function(filterName, callback, priority = 0) {
    try {
      if ('string' !== typeof filterName || '' === filterName) {
        throw 'unexpected usage of addFilter - filterName is undefined';
      }

      if (this.filter[filterName] === undefined) {
        this.filter[filterName] = [];
      }

      if (!priority && typeof priority !== 'number') {
        priority = this.filter[filterName].length;
        if (priority === 0) {
          priority++;
        }
      }

      if (this.filter[filterName][priority] !== undefined) {
        priority++;
      }

      this.filter[filterName][priority] = [];
      this.filter[filterName][priority] = callback;
    } catch (e) {
      console.warn(e);
    }
  },

  /**
   * Place the doFilter() function this will handle
   * the registered filter functions
   *
   * @param {string} filterName
   * @param {Object|string|number|array} filterObj
   * @param {Object|string|number|array} args
   */
  doFilter: async function(filterName, filterObj, args = null) {
    const self = this;

    try {
      if ('string' !== typeof filterName || '' === filterName) {
        throw 'unexpected usage of doFilter - filterName is undefined';
      }

      if ('string' !== typeof filterName || '' === filterName) {
        return 'filterName is empty';
      }

      const filter = this.filter[filterName] !== undefined ?
          this.filter[filterName] :
          null;

      if (filter) {
        const solvedFilter = self.asyncForEach(filter, filterObj, args);

        return Promise.all(solvedFilter).then((values) => {
          return values[values.length - 1];
        }, (reason) => {
          console.log(reason);
        });
      } else {
        return filterObj;
      }
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Iterate the registered filter from this.filter
   *
   * @param {function} callbackFunctions
   * @param {Object|string|number|array} filterObj
   * @param {Object|string|number|array} args
   *
   * @return {promise|array}
   */
  asyncForEach: function(callbackFunctions, filterObj, args = null) {
    const solvedFilter = [];
    const priorities = Object.keys(callbackFunctions);

    for (let index = 0; index < priorities.length; index++) {
      const priority = parseInt(priorities[index]);

      if (callbackFunctions[priority] !== undefined) {
        solvedFilter.push(new Promise((resolve, reject) => {
          const filter = callbackFunctions[priority];
          filter(resolve, filterObj, args);
        }));
      } else {
        solvedFilter.push(new Promise((resolve, reject) => {
          resolve(filterObj, args);
        }));
      }
    }

    return solvedFilter;
  },

  /**
   * returns all registered filter
   *
   * @param {string} filterName
   * @return {array}
   */
  getFilter: function(filterName = '') {
    return this.filter[filterName] !== undefined ?
        this.filter[filterName] :
        this.filter;
  },

};

module.exports = applyFilters;
