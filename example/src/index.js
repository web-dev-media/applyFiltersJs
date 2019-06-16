const applyFilters = require('applyFilters').applyFilters;

let sayHello = () => {
	let helloStr = 'John';
	let span = document.querySelector('h2 span');

	applyFilters.doFilter( 'beforeSayHello', helloStr ).then((helloStr) => {
		span.innerHTML = helloStr;
	});
};

applyFilters.addFilter('beforeSayHello', 'addMyName', (resolve, str) => {
	str = str + ' and Rene';
	resolve(str);
}, 1);

document.addEventListener("DOMContentLoaded", function(event) {
	sayHello();
});
