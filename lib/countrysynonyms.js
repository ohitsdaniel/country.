'use strict';

const data = require('./data/countryData');

const lib = (() => {


	const codeToCountry = (code) => {
		if (typeof code === 'number') {
			
		} else if (code.length === 2) {

		} else if (code.length === 3) {

		} else {
			throw "Provide a valid ISO 3166-1/2/3 code";
		}
	}

})();


module.exports = lib;