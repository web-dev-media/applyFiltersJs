const applyFilters = require('../../applyFilters').applyFilters;

let sayHello = () => {
	let helloStr = 'John';

	applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
		console.log({helloStr:helloStr});
	});
};

applyFilters.addFilter('beforeSayHello', 'addMyName', (resolve, str) => {
	str = 'Rene';
	resolve(str);
}, 1);

sayHello();
