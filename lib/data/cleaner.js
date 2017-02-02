'use strict';

const data = require('./countryData');
const fs = require('fs');
const countries = require('i18n-iso-countries');
const completeData = require('./completeCountryData');
const https = require('https');
const xlsx = require('xlsx');

const supportedLanguages = ["ar", "cs", "de", "es", "et", "fi", "fr", "hu", "it", "nb", "nl", "nn", "pl", "pt", "ru", "sv", "tr", "zh"];

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
		},
		currency: completeData.currency.alpha.code[upperCasedISO3]
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

currenciesWorkbook.then((result) => {

	console.log('// Adding currencies to countries');

	let codes = result.Sheets['Active'],
		i = 5,
		countryCurrencies = {};

	while (typeof codes["A" + i] !== 'undefined') {
		try {
			// console.log(countries.getAlpha2Code(codes["A"+i]));

			let c = cleanedData.find((element) => {
				return element.names["en"][0].toUpperCase() == codes["A" + i].v.toUpperCase()
			})

			if (c.currencies) {
				c.currencies.push({
					currency: codes["B" + i].v,
					alphaCode: codes["C" + i].v,
					numCode: codes["D" + i].v,
					minorUnit: codes["E" + i].v
				})
			} else {
				c.currencies = [{
					currency: codes["B" + i].v,
					alphaCode: codes["C" + i].v,
					numCode: codes["D" + i].v,
					minorUnit: codes["E" + i].v
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

		if(!c.names['en'].includes(codes[code])){
			c.names['en'].push(codes[code]);
		}
	});

}).then((result) => {

	fs.writeFile("cleaned.json", JSON.stringify(cleanedData), function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}).catch((e) => {
	console.log(e);
});