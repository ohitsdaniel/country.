'use strict';

const data = require('./countryData');
const fs = require('fs');
const countries = require('i18n-iso-countries');
const completeData = require('./completeCountryData');
const https = require('https');
const xlsx = require('xlsx');
const cData = require('country-data').countries;
const lData = require('country-data').languages;
const rData = require('country-data').regions;
const curData = require('country-data').currencies

const supportedLanguages = ["ar", "cs", "de", "es", "et", "fi", "fr", "hu", "it", "nb", "nl", "nn", "pl", "pt", "ru", "sv", "tr", "zh"];

// requesting an Excel file which contains currencies mapped to countries
const currenciesWorkbook = new Promise((resolve, reject) => {

	https.get('https://www.currency-iso.org/dam/downloads/lists/list_one.xls', (resp) => {

		resp.on('error', function(err) {
			console.log('Error while reading', err);
		});

		let rawData = [];
		resp.on('data', (chunk) => rawData.push(chunk));
		resp.on('end', () => {
			try {
				var buffer = new Buffer.concat(rawData);
				var data = new Uint8Array(buffer);
				var arr = new Array();
				for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				var bstr = arr.join("");

				/* Call XLSX */
				var workbook = xlsx.read(bstr, {
					type: "binary"
				});

				resolve(workbook);

			} catch (e) {
				console.log(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(e);
		reject(e);
	});
});

let cleanedData = data.reduce((acc, element) => {

	if (element.ISO3 === '') {
		return acc;
	}

	let upperCasedISO3 = element.ISO3.toUpperCase();

	let newElement = {
		ISO1: countries.alpha3ToNumeric(upperCasedISO3),
		ISO2: countries.alpha3ToAlpha2(upperCasedISO3),
		ISO3: upperCasedISO3,
		names: {
			'en': []
		}
	};

	for (let i = 1; i < 9; i++) {
		let name = element['name' + i];

		if (typeof name !== 'undefined') {
			if (name !== '') {
				newElement.names['en'].push(name);
			}
		}
	}

	supportedLanguages.forEach((language) => {
		if (typeof countries.getName(upperCasedISO3, language) !== 'undefined') {
			newElement.names[language] = [countries.getName(upperCasedISO3, language)];
		} else {
			newElement.names[language] = [];
		}
	});

	acc.push(newElement);

	return acc;
}, []);

Object.keys(completeData.country['alpha-2'].code).forEach((code) => {
	let g = cleanedData.find((country) => {
		return country.ISO2 == code.toUpperCase();
	});

	if (typeof g === 'undefined') {
		// numeric.code, genc-numeric, genc-alpha-3, genc-alpha-2

		let name = completeData.country['alpha-2'].code[code];

		console.log(name);

		let iso1 = Object.keys(completeData.country['numeric'].code).find((element) => {
			return completeData.country['numeric'].code[element] == name;
		});

		let iso3 = Object.keys(completeData.country['alpha-3'].code).find((element) => {
			return completeData.country['alpha-3'].code[element] == name;
		}).toUpperCase();

		console.log(iso1);

		let missingCountry = {
			ISO1: iso1,
			ISO2: code.toUpperCase(),
			ISO3: iso3,
			names: {
				'en': [name]
			}
		}

		cleanedData.push(missingCountry);
	}
});

currenciesWorkbook.then((result) => {

	console.log('// Adding currencies to countries');

	let codes = result.Sheets['Active'],
		i = 5,
		countryCurrencies = {};

	while (typeof codes["A" + i] !== 'undefined') {
		try {
			let c = cleanedData.find((element) => {
				return element.names["en"][0].toUpperCase() == codes["A" + i].v.toUpperCase()
			})

			if (c.currencies) {
				c.currencies.push({
					currency: codes["B" + i].v,
					alphaCode: codes["C" + i].v,
					numCode: codes["D" + i].v,
					minorUnit: codes["E" + i].v,
					symbol: curData[codes["C" + i].v].symbol
				})
			} else {
				c.currencies = [{
					currency: codes["B" + i].v,
					alphaCode: codes["C" + i].v,
					numCode: codes["D" + i].v,
					minorUnit: codes["E" + i].v,
					symbol: curData[codes["C" + i].v].symbol
				}];
			}

		} catch (e) {} finally {
			i += 1;
		}
	}
}).then(() => {
	console.log('// adding names from second name file');

	let codes = completeData.country['alpha-2'].code;

	Object.keys(codes).forEach((code) => {
		let c = cleanedData.find((element) => {
			return code.toUpperCase() == element.ISO2;
		})

		if (typeof c === 'undefined') return;

		if (!c.names['en'].includes(codes[code])) {
			c.names['en'].push(codes[code]);
		}
	});

}).then(() => {
	console.log('// gather data from country-data');

	cData.all.forEach((country) => {
		let c = cleanedData.find((element) => {
			return country.alpha2 == element.ISO2;
		})

		if (typeof c === 'undefined') return;

		c.callingCodes = country.countryCallingCodes;
		c.emoji = country.emoji;
		c.ioc = country.ioc;
		c.languages = [];

		country.languages.forEach((language) => {
			c.languages.push(lData[language]);
		});

		country.currencies.forEach((currency) => {
			if (typeof c.currencies === 'undefined') {

				let dat = curData[currency];

				let newCur = {
					currency: dat.name,
					alphaCode: currency,
					numCode: dat.number,
					minorUnit: dat.decimals,
					symbol: dat.symbol
				};

				c.currencies = [newCur];
			};

			let foundCurrency = c.currencies.find((cur) => currency == cur.alphaCode);

			if (typeof foundCurrency === 'undefined') {

				let dat = curData[currency];

				let newCur = {
					currency: dat.name,
					alphaCode: currency,
					numCode: dat.number,
					minorUnit: dat.decimals,
					symbol: dat.symbol
				};

				c.currencies.push(newCur);
			}
		});

		if (!c.names['en'].includes(country.name)) {
			c.names['en'].push(country.name);
		}
	});

}).then(() => {
	console.log('// create dictionaries for faster access');

	// ISO1, ISO2, ISO3
	let data = {
		code: {
			ISO1: {},
			ISO2: {},
			ISO3: {}
		}
	};

	cleanedData.forEach((element) => {
		data.code.ISO1[element.ISO1] = element.ISO2;
		data.code.ISO2[element.ISO2] = element;
		data.code.ISO3[element.ISO3] = element.ISO2;
	});

	return data;
}).then((data) => {
	console.log('// extract region data');

	data.regions = {}

	Object.keys(rData).forEach((regionName) => {
		let region = rData[regionName];

		data.regions[regionName] = region;
	});

	return data;

}).then((result) => {

	fs.writeFile("masterData.json", JSON.stringify(result), function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}).catch((e) => {
	console.log(e);
});