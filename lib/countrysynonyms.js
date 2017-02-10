'use strict';

const data = require('./data/masterData');

function names(code, language = 'en') {

	if (typeof code !== 'string') {
		throw "Provide a valid ISO 3166-1/2/3 code or country name.";
	}

	code = code.trim();

	if (code.length === 2) {
		code = code.toUpperCase();
		// ISO2 code
		let country = data.code.ISO2[code];

		if (typeof country === 'undefined') {
			throw code + " is not a valid 3611-2 code.";
		}

		return country.names[language];

	} else if (code.length === 3) {
		code = code.toUpperCase();
		// ISO1 or ISO3 code
		let iso2code = iso2(code);

		let country = data.code.ISO2[iso2code];

		if (typeof country === 'undefined') {
			throw code + " is not a valid code.";
		}

		return country.names[language];
	} else {
		// countryname 
		let key = Object.keys(data.code.ISO2).find((element) => {
			return data.code.ISO2[element].names[language].includes(code);
		});

		let country = data.code.ISO2[key];

		if (typeof country === 'undefined') {
			throw 'Invalid countryname ' + code + '.';
		} else {
			return country.names[language];
		}
	}
}

exports.names = names;

function iso2(code) {

	if (typeof code !== 'string') {
		throw 'Code must be provided as a string';
	}

	code = code.trim();

	if (code.length === 3) {
		// ISO1 or ISO3 code
		if (/\d/.test(code)) {
			// code contains digits -> probably ISO1
			let foundCode = data.code.ISO1[code];

			if (typeof foundCode === 'undefined') {
				throw "Invalid code format";
			} else {
				return foundCode;
			}
		} else {
			// code contains no digits -> probably ISO3
			let foundCode = data.code.ISO3[code];

			if (typeof foundCode === 'undefined') {
				throw "Invalid code format";
			} else {
				return foundCode;
			}
		}
	} else if (code.length === 2) {
		let country = data.code.ISO2[code];

		if (typeof country === 'undefined') {
			throw "Invalid code format";
		} else {
			return country.ISO2;
		}
	} else {
		throw "Invalid code format";
	}
}

exports.iso2 = iso2;