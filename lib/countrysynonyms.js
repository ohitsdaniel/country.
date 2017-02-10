'use strict';

const data = require('./data/masterData');

function names(code, language = 'en') {

	if (typeof code !== 'string') {
		throw "INVALIDFORMAT: Provide a valid ISO 3166-1/2/3 code or country name as a string.";
	}

	code = code.trim();

	if (code.length === 2) {
		code = code.toUpperCase();
		// ISO2 code
		let country = data.code.ISO2[code];

		if (typeof country === 'undefined') {
			throw "INVALIDCODE: " + code + " is not a valid 3611-2 code.";
		}

		return country.names[language];

	} else if (code.length === 3) {
		code = code.toUpperCase();
		// ISO1 or ISO3 code
		let iso2code = iso2(code);

		let country = data.code.ISO2[iso2code];

		if (typeof country === 'undefined') {
			throw "INVALIDCODE: " + code + " is not a valid code.";
		}

		return country.names[language];
	} else {
		// countryname 
		let country = findByName(code, language);

		if (typeof country === 'undefined') {
			throw 'INVALIDCOUNTRY: ' + code + '.';
		} else {
			return country.names[language];
		}
	}
}

exports.names = names;

function iso2(code, language = 'en') {

	if (typeof code !== 'string') {
		throw 'INVALIDFORMAT: Code must be provided as a string';
	}

	code = code.trim();

	if (code.length === 3) {
		// ISO1 or ISO3 code
		if (/\d/.test(code)) {
			// code contains digits -> probably ISO1
			let foundCode = data.code.ISO1[code];

			if (typeof foundCode === 'undefined') {
				throw 'INVALIDCODE: ' + code + ' is not a valid ISO1 code.';
			} else {
				return foundCode;
			}
		} else {
			// code contains no digits -> probably ISO3
			let foundCode = data.code.ISO3[code];

			if (typeof foundCode === 'undefined') {
				throw 'INVALIDCODE: ' + code + ' is not a valid ISO3 code.';
			} else {
				return foundCode;
			}
		}
	} else if (code.length === 2) {
		let country = data.code.ISO2[code];

		if (typeof country === 'undefined') {
			throw 'INVALIDCODE: ' + code + ' is not a valid ISO2 code.';
		} else {
			return country.ISO2;
		}
	} else {
		// countryname 
		let country = findByName(code, language);

		if (typeof country === 'undefined') {
			throw 'INVALIDCOUNTRY: ' + code + '.';
		} else {
			return country.ISO2;
		}
	}
}
exports.iso2 = iso2;

function iso3(code, language = 'en') {
	return country(code,language).ISO3;
}

exports.iso3 = iso3;

function country(code, language = 'en') {

	if (typeof code !== 'string') {
		throw 'INVALIDFORMAT: Code must be provided as a string';
	}

	code = code.trim();

	if (code.length === 3) {
		code = code.toUpperCase();

		// ISO1 or ISO3 code
		if (/\d/.test(code)) {
			// code contains digits -> probably ISO1
			let foundCode = iso2(code);

			if (typeof foundCode === 'undefined') {
				throw 'INVALIDCODE: ' + code + ' is not a valid ISO1 code.';
			} else {
				return data.code.ISO2[foundCode];
			}
		} else {
			// code contains no digits -> probably ISO3
			let foundCode = data.code.ISO3[code];

			if (typeof foundCode === 'undefined') {
				throw 'INVALIDCODE: ' + code + ' is not a valid ISO3 code.';
			} else {
				return data.code.ISO2[foundCode];
			}
		}
	} else if (code.length === 2) {
		code = code.toUpperCase();

		// ISO2 code
		let country = data.code.ISO2[code];

		if (typeof country === 'undefined') {
			throw 'INVALIDCODE: ' + code + ' is not a valid ISO2 code.';
		} else {
			return country;
		}
	} else {
		// countryname 
		let country = findByName(code, language);

		if (typeof country === 'undefined') {
			throw 'INVALIDCOUNTRY: ' + code + '.';
		} else {
			return country;
		}
	}
}

exports.country = country;

// helpers 
function findByName(name, language) {
	let key = Object.keys(data.code.ISO2).find((element) => {
		return data.code.ISO2[element].names[language].includes(name);
	});

	return data.code.ISO2[key];
}