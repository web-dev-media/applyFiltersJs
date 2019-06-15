
module.exports = {
    applyFilters: {
        filter  : [],

        addFilter: function(filterName, hookName, callback, priority = null) {
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

        getFilter: function(filterName = ''){
            if(this.filter[filterName] !== undefined ){
                return this.filter[filterName];
            }else{
                return this.filter;
            }
        },

        doFilter: async function(filterName, filterObj, arguments = null) {
            let self = this;

            if ( 'string' !== typeof filterName || '' === filterName ) {
                return 'filterName is empty';
            }

            let filter = this.filter[ filterName ] !== undefined ? this.filter[ filterName ] : null;

            if ( filter ) {
               let solvedFilter = self.asyncForEach( filter, filterObj, arguments );

                return Promise.all(solvedFilter).then(values => {
                    return values[values.length-1];
                }, reason => {
                    console.log(reason)
                });
            }else{
                return filterObj;
            }
        },

        asyncForEach: function (callbackFunctions, filterObj, arguments = null) {
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
                                filter( resolve, filterObj, arguments );
                            } )
                        );
                    } else {
                        solvedFilter.push( new Promise( ( resolve, reject ) => {
                                resolve( filterObj, arguments );
                            } )
                        );
                    }
                }
            }

            return solvedFilter;
        }
    }
};