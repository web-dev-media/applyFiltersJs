const applyFilters = require('../applyFilters');

const spyError = jest.spyOn( console, 'error' );
const spyWarn = jest.spyOn( console, 'warn' );

beforeEach( () => {
  spyError.mockReset();
  spyWarn.mockReset();
} );

applyFilters.addFilter('moreThenOneFilter', (resolve, testObj) => {
  testObj.awesome = 44;
  resolve(testObj);
}, 2);

applyFilters.addFilter('moreThenOneFilter', (resolve, testObj) => {
  testObj.incredible = 1;
  resolve(testObj);
}, 2);

applyFilters.addFilter('moreThenOneFilter', (resolve, testObj) => {
  testObj.unbelievable = 66;
  resolve(testObj);
}, 1);

applyFilters.addFilter('applyFiltersTest', (resolve, testObj) => {
  testObj.awesome = 33;
  resolve(testObj);
}, 2);

test('Test not used doFilter - emotyDoFilterTest', () => {
  const testObj = 42;

  applyFilters.doFilter( 'emotyDoFilterTest', testObj ).then((testObj) => {
    expect(testObj).toBe(42);
  });
});

test('Test Filter with more then one filter', () => {
  const testObj = {
    something: 1,
    somethingElse: 1,
  };

  applyFilters.doFilter( 'moreThenOneFilter', testObj ).then((testObj) => {
    expect(testObj.awesome).toBe(44);
    expect(testObj.unbelievable).toBe(66);
    expect(testObj.incredible).toBe(1);
  });
});

test('Test Filter with same priority', () => {
  const testObj = {
    something: 1,
    somethingElse: 1,
  };

  const toBeObj = [
    'something',
    'somethingElse',
    'unbelievable',
    'awesome',
    'incredible',
  ];

  applyFilters.doFilter( 'moreThenOneFilter', testObj ).then((testObj) => {
    const probs = Object.keys( testObj );

    for ( let index = 0; index < probs.length; index++ ) {
      for ( let i = 0; i < toBeObj.length; i++ ) {
        if (index === i) {
          expect(probs[index]).toBe(toBeObj[i]);
        }
      }
    }
  });
});

test('Test getFilter all', () => {
  applyFilters.doFilter( 'moreThenOneFilter', {} ).then((testObj) => {});

  const allFilter = applyFilters.getFilter();

  expect(typeof allFilter.applyFiltersTest).toBe('object');
  expect(typeof allFilter.moreThenOneFilter).toBe('object');
});

/*
 + Test getFilter with specific filtername
 */
test('Test getFilter with filterName', () => {
  applyFilters.doFilter( 'moreThenOneFilter', {} ).then((testObj) => {});

  const allFilter = applyFilters.getFilter('moreThenOneFilter');

  expect(allFilter.length).toBe(4);
});

test('Test helloStr', () => {
  const sayHello = () => {
    const helloStr = 'John';

    applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
      expect(helloStr).toBe('Rene');
    });
  };

  applyFilters.addFilter('beforeSayHello', (resolve, str) => {
    str = 'Rene';
    resolve(str);
  }, 1);

  sayHello();
});

test('Test addFilter without - filterName - log warn', () => {
  applyFilters.doFilter( 'emptyFilterName', '' ).then((testObj) => {
    expect( spyWarn ).toHaveBeenCalled();
  });

  applyFilters.addFilter('', (resolve, str) => {});
});

test('Test doFilter without - filterName log error', () => {
  applyFilters.doFilter( '', '' ).then((testObj) => {
    expect( spyError ).toHaveBeenCalled();
  });
});
