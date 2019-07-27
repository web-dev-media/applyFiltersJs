/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/applyFilters/applyFilters.js":
/*!***************************************************!*\
  !*** ./node_modules/applyFilters/applyFilters.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
   * register a filter/hook so that consumer use to register a
   * 'this.addFilter()' function to register a callback function
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
   * Run over the registered callbackFunctions
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

/***/ }),

/***/ "./src/filter.js":
/*!***********************!*\
  !*** ./src/filter.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => {
  const applyFilters = __webpack_require__(/*! applyFilters */ "./node_modules/applyFilters/applyFilters.js");

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
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const applyFilters = __webpack_require__(/*! applyFilters */ "./node_modules/applyFilters/applyFilters.js");
__webpack_require__(/*! ./filter */ "./src/filter.js")();

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


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=example.bundle.js.map