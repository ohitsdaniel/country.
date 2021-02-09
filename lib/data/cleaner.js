'use strict';

const data = require('./countryData');
const countries = require('i18n-iso-countries');
const completeData = require('./completeCountryData');
const https = require('https');
const fs = require('fs');
const xlsx = require('xlsx');
const cData = require('country-data').countries;
const lData = require('country-data').languages;
const rData = require('country-data').regions;
const curData = require('country-data').currencies;
const names = require('./names');
const _ = require('lodash');

const supportedLanguages = ['ar', 'cs', 'de', 'es', 'et', 'fi', 'fr', 'hu', 'it', 'nb', 'nl', 'nn', 'pl', 'pt', 'ru', 'sv', 'tr', 'zh'];

// requesting an Excel file which contains currencies mapped to countries
const currenciesWorkbook = new Promise((resolve, reject) => {
	https.get('https://www.currency-iso.org/dam/downloads/lists/list_one.xls', (resp) => {

		resp.on('error', function (err) {
			console.log('Error while reading', err);
		});

		const rawData = [];
		resp.on('data', (chunk) => rawData.push(chunk));
		resp.on('end', () => {
			try {
				const buffer = new Buffer.concat(rawData);
				const data = new Uint8Array(buffer);
				const arr = [];
				for (let i = 0; i !== data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				const bstr = arr.join('');

				/* Call XLSX */
				const workbook = xlsx.read(bstr, {
					type: 'binary',
				});

				resolve(workbook);

			} catch (e) {
				console.error(new Error(e));
			}
		});
	}).on('error', (e) => {
		console.error(new Error(e));
		reject(e);
	});
});

const cleanedData = data.reduce((acc, element) => {
	if (element.ISO3 === '') {
		return acc;
	}

	const upperCasedISO3 = element.ISO3.toUpperCase();

	const newElement = {
		ISO1: countries.alpha3ToNumeric(upperCasedISO3),
		ISO2: countries.alpha3ToAlpha2(upperCasedISO3),
		ISO3: upperCasedISO3,
		names: {
			'en': [],
		},
	};

	for (let i = 1; i < 9; i++) {
		const name = element['name' + i];
		if (name) {
			newElement.names['en'].push(name.trim());
		}
	}

	supportedLanguages.forEach((language) => {
		const name = countries.getName(upperCasedISO3, language);
		if (name) {
			newElement.names[language] = [name.trim()];
		} else {
			newElement.names[language] = [];
		}
	});

	acc.push(newElement);

	return acc;
}, []);

Object.keys(completeData.country['alpha-2'].code).forEach((code) => {
	const g = cleanedData.find((country) => {
		return country.ISO2 === code.toUpperCase();
	});

	if (!g) {
		const name = completeData.country['alpha-2'].code[code];

		const iso1 = Object.keys(completeData.country['numeric'].code).find((element) => {
			return completeData.country['numeric'].code[element] === name;
		});

		const iso3 = Object.keys(completeData.country['alpha-3'].code).find((element) => {
			return completeData.country['alpha-3'].code[element] === name;
		}).toUpperCase();

		const missingCountry = {
			ISO1: iso1,
			ISO2: code.toUpperCase(),
			ISO3: iso3,
			names: {
				'en': [name],
			},
		};

		cleanedData.push(missingCountry);
	}
});

currenciesWorkbook.then((result) => {
	const codes = result.Sheets['Active'];
	let i = 5;

	while (codes['A' + i]) {
		try {
			const c = cleanedData.find((element) => {
				return element.names['en'][0].toUpperCase() === codes['A' + i].v.toUpperCase();
			});

			if (c.currencies) {
				c.currencies.push({
					currency: codes['B' + i].v,
					alphaCode: codes['C' + i].v,
					numCode: codes['D' + i].v,
					minorUnit: codes['E' + i].v,
					symbol: curData[codes['C' + i].v].symbol,
				});
			} else {
				c.currencies = [{
					currency: codes['B' + i].v,
					alphaCode: codes['C' + i].v,
					numCode: codes['D' + i].v,
					minorUnit: codes['E' + i].v,
					symbol: curData[codes['C' + i].v].symbol,
				}];
			}

		} catch (e) {
		} finally {
			i += 1;
		}
	}
}).then(() => {
	const codes = completeData.country['alpha-2'].code;

	Object.keys(codes).forEach((code) => {
		const c = cleanedData.find((element) => {
			return code.toUpperCase() === element.ISO2;
		});

		if (!c) return;

		if (!c.names['en'].includes(codes[code])) {
			c.names['en'].push(codes[code]);
		}
	});

}).then(() => {
	cData.all.forEach((country) => {
		const c = cleanedData.find((element) => {
			return country.alpha2 === element.ISO2;
		});

		if (!c) return;

		c.callingCodes = country.countryCallingCodes;
		c.emoji = country.emoji;
		c.ioc = country.ioc;
		c.languages = [];

		country.languages.forEach((language) => {
			c.languages.push(lData[language]);
		});

		country.currencies.forEach((currency) => {
			if (!c.currencies) {

				const dat = curData[currency];

				const newCur = {
					currency: dat.name,
					alphaCode: currency,
					numCode: dat.number,
					minorUnit: dat.decimals,
					symbol: dat.symbol,
				};

				c.currencies = [newCur];
			}

			const foundCurrency = c.currencies.find((cur) => currency === cur.alphaCode);

			if (!foundCurrency) {
				const dat = curData[currency];

				const newCur = {
					currency: dat.name,
					alphaCode: currency,
					numCode: dat.number,
					minorUnit: dat.decimals,
					symbol: dat.symbol,
				};

				c.currencies.push(newCur);
			}
		});

		if (!c.names['en'].includes(country.name)) {
			c.names['en'].push(country.name);
		}
	});

}).then(() => {
	// ISO1, ISO2, ISO3
	const data = {
		code: {
			ISO1: {},
			ISO2: {},
			ISO3: {},
		},
	};

	cleanedData.forEach((element) => {
		data.code.ISO1[element.ISO1] = element.ISO2;
		data.code.ISO2[element.ISO2] = element;
		data.code.ISO3[element.ISO3] = element.ISO2;
	});

	return data;
}).then((data) => {
	data.regions = {};

	Object.keys(rData).forEach((regionName) => {
		data.regions[regionName] = rData[regionName];
	});

	const europeanRegions = Object.keys(data.regions).filter((key) => {
		return /Europe/.test(key);
	}).map(c => rData[c].countries);

	const africanRegions = Object.keys(data.regions).filter((key) => {
		return /Africa/.test(key);
	}).map(c => rData[c].countries);

	const asianRegions = Object.keys(data.regions).filter((key) => {
		return /Asia/.test(key);
	}).map(c => rData[c].countries);

	const americanRegions = Object.keys(data.regions).filter((key) => {
		return /America/.test(key);
	}).map(c => rData[c].countries);

	const otherRegions = Object.keys(data.regions).filter((key) => {
		return !/America/.test(key) && !/Asia/.test(key) && !/Africa/.test(key) && !/Europe/.test(key);
	}).map(c => rData[c].countries);

	const flatUnique = _.flowRight(_.uniq, _.flatten);

	data.regions.europe = {
		name: 'Europe',
		countries: flatUnique(europeanRegions),
	};
	data.regions.asia = {
		name: 'Asia',
		countries: flatUnique(africanRegions),
	};
	data.regions.africa = {
		name: 'Africa',
		countries: flatUnique(asianRegions),
	};
	data.regions.america = {
		name: 'America',
		countries: flatUnique(americanRegions),
	};
	data.regions.other = {
		name: 'Other',
		countries: flatUnique(otherRegions),
	};

	return data;
}).then((data) => {
	Object.keys(names).forEach((code) => {
		const element = data.code.ISO2[code];

		Object.keys(names[code]).forEach((language) => {
			const countryNames = names[code][language];

			countryNames.forEach((name) => {
				const countryName = name.trim();
				if (!element.names[language].includes(countryName)) {
					element.names[language].push(countryName);
				}
			});
		});
	});

	return data;
}).then((result) => {
	fs.writeFileSync('./lib/data/masterData.json', JSON.stringify(result));
}).catch((e) => {
	console.error(new Error(e));
});
