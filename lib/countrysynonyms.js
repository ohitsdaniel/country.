'use strict';

const data = require('./data/masterData');

function iso3(code, language = 'en') {
	return country(code, language).ISO3;
}
exports.iso3 = iso3;

function ioc(code, language = 'en') {
	return country(code, language).ioc;
}
exports.ioc = ioc;

function callingCodes(code, language = 'en') {
	return country(code, language).callingCodes;
}
exports.callingCodes = callingCodes;

function names(code, language = 'en') {
	return country(code, language).names[language];
}
exports.names = names;

function languages(code, language = 'en') {
	return country(code, language).languages;
}
exports.languages = languages;

function currencies(code, language = 'en') {
	return country(code, language).currencies;
}
exports.currencies = currencies;

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

exports.data = country;

function regions(region = undefined) {
	if (typeof region === 'undefined' || typeof region !== 'string') {
		return data.regions;
	} else {
		let regionFound = data.regions[region];

		if (typeof regionFound === 'undefined') {
			regionFound = Object.keys(data.regions).find((key) => {
				return data.regions[key].name.toUpperCase() == region.toUpperCase();
			});

			if (typeof regionFound === 'undefined') {
				throw 'INVALIDREGIONNAME: ' + region + '.';
			} else {
				return data.regions[regionFound];
			}
		} else {
			return regionFound;
		}
	}
}

exports.regions = regions;

// helpers 
function findByName(name, language) {
	let key = Object.keys(data.code.ISO2).find((element) => {
		if (typeof data.code.ISO2[element].names[language] === 'undefined') {
			throw 'INVALIDLANGUAGE: ' + language + 'not supported.'
		}

		return data.code.ISO2[element].names[language].includes(name);
	});

	return data.code.ISO2[key];
}