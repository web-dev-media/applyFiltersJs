const applyFilters = require('../applyFilters').applyFilters;


applyFilters.addFilter('moreThenOneFilter', 'filterOne', (resolve, testObj) => {
	testObj.awesome = 44;
	resolve(testObj);
}, 2);

applyFilters.addFilter('moreThenOneFilter', 'filterTwo', (resolve, testObj) => {
	testObj.unbelivebil = 66;
	resolve(testObj);
}, 1);

applyFilters.addFilter('applyFiltersTest', 'addClassFilterResolved', (resolve, testObj) => {
	testObj.awesome = 33;
	resolve(testObj);
}, 2);

test('Test not used doFilter - emotyDoFilterTest', () => {
	let testObj = 42;

	applyFilters.doFilter( 'emotyDoFilterTest', testObj ).then((testObj) => {
		expect(testObj).toBe(42);
	});
});

test('Test Filter with exiting hookName - addClassFilterResolved', () => {
	let testObj = {
		something: 1,
		somethingElse: 1,
	};

	applyFilters.doFilter( 'applyFiltersTest', testObj ).then((testObj) => {
		expect(testObj.awesome).toBe(33);
	});
});

test('Test Filter with more then one filter', () => {
	let testObj = {
		something: 1,
		somethingElse: 1,
	};

	applyFilters.doFilter( 'moreThenOneFilter', testObj ).then((testObj) => {
		expect(testObj.awesome).toBe(44);
		expect(testObj.unbelivebil).toBe(66);
	});
});

test('Test getFilter all', () => {
	applyFilters.doFilter( 'moreThenOneFilter', {} ).then((testObj) => {});

	let allFilter = applyFilters.getFilter();

	expect(typeof allFilter.applyFiltersTest).toBe('object');
	expect(typeof allFilter.moreThenOneFilter).toBe('object');
});

/*
 + Test getFilter with specific filtername
 */
test('Test getFilter with filterName', () => {
	applyFilters.doFilter( 'moreThenOneFilter', {} ).then((testObj) => {});

	let allFilter = applyFilters.getFilter('moreThenOneFilter');

	expect(allFilter.length).toBe(3);
});

test('Test helloStr', () => {
	let sayHello = () => {
		let helloStr = 'John';

		applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
			expect(helloStr).toBe('Rene');
		});
	};

	applyFilters.addFilter('beforeSayHello', 'addMyName', (resolve, str) => {
		str = 'Rene';
		resolve(str);
	}, 1);

	sayHello();
});