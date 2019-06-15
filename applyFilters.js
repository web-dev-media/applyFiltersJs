'use strict';

module.exports = {
    applyFilters: {

        // container for all registered filter
        filter  : [],

        /**
         * Consumer register a function that use a filter/hook 'this.doFilter()'
         * for changing something in the progress
         *
         * @param {string} filterName
         * @param {string} hookName
         * @param {function} callback
         * @param {number} priority
         *
         * @return void
         */
        addFilter: function(filterName, hookName, callback, priority = 0) {
            if ( 'string' !== typeof filterName || '' === filterName ) {
                return false;
            }

            if ( 'string' !== typeof hookName || '' === hookName ) {
                return false;
            }

            if(this.filter[filterName] === undefined ){
                this.filter[filterName] = [];
            }

            if(!priority && typeof priority !== 'number'){
                priority = this.filter[filterName].length;
                if(priority === 0){
                    priority++;
                }
            }

            if( this.filter[filterName][priority] !== undefined ){
                priority++;
            }

            this.filter[filterName][priority] = [];
            this.filter[filterName][priority][hookName] = callback;
        },

        /**
         * Register a filter/hook so that consumer use to register a 'this.addFilter()'
         * function to register a callback function
         *
         * @param {string} filterName
         * @param filterObj
         * @param args
         */
        doFilter: async function(filterName, filterObj, args = null) {
            let self = this;

            if ( 'string' !== typeof filterName || '' === filterName ) {
                return 'filterName is empty';
            }

            let filter = this.filter[ filterName ] !== undefined ? this.filter[ filterName ] : null;

            if ( filter ) {
               let solvedFilter = self.asyncForEach( filter, filterObj, args );

                return Promise.all(solvedFilter).then(values => {
                    return values[values.length-1];
                }, reason => {
                    console.log(reason)
                });
            }else{
                return filterObj;
            }
        },

        /**
         * Run over the registered callbackFunctions
         *
         * @param {function} callbackFunctions
         * @param filterObj
         * @param args
         *
         * @return promise|array
         */
        asyncForEach: function (callbackFunctions, filterObj, args = null) {
            let solvedFilter = [];
            let priorities = Object.keys( callbackFunctions );

            for (let index = 0; index < priorities.length; index++) {
                let priority = priorities[ index ];

                let Keys = Object.keys( callbackFunctions[priority] );

                for ( let i = 0; i < Keys.length; i++ ) {
                    let callbackFunction = Keys[ i ];

                    if ( callbackFunctions[ priority ][ callbackFunction ] !== undefined ) {
                        solvedFilter.push( new Promise( ( resolve, reject ) => {
                                let filter = callbackFunctions[ priority ][ callbackFunction ];
                                filter( resolve, filterObj, args );
                            } )
                        );
                    } else {
                        solvedFilter.push( new Promise( ( resolve, reject ) => {
                                resolve( filterObj, args );
                            } )
                        );
                    }
                }
            }

            return solvedFilter;
        },

        /**
         * returns all registered filter
         *
         * @param {string} filterName
         */
        getFilter: function(filterName = ''){
            if(this.filter[filterName] !== undefined ){
                return this.filter[filterName];
            }else{
                return this.filter;
            }
        },
    }
};