var assert = require('chai').assert,
	lib = require('..');

describe('lib.names', function() {
	describe('#Germany 🇩🇪 (en)', function() {
		it('ISO1->Name', function() {
			assert.include(lib.names('276'), 'Germany');
		});

		it('ISO2->Name', function() {
			assert.include(lib.names('DE'), 'Germany');
		});

		it('ISO3->Name', function() {
			assert.include(lib.names('DEU'), 'Germany');
		});

		it('Name->Name', function() {
			assert.include(lib.names('Germany'), 'Germany');
		});
	});
	describe('#United Kingdom (en) 🇬🇧', function() {
		it('ISO1->Name', function() {
			assert.include(lib.names('826'), 'United Kingdom');
		});

		it('ISO2->Name', function() {
			assert.include(lib.names('GB'), 'UK');
		});

		it('ISO3->Name', function() {
			assert.include(lib.names('GBR'), 'Great Britain');
		});

		it('Name->Name', function() {
			assert.include(lib.names('United Kingdom'), 'UK');
		});
	});

	describe('#USA (en) 🇺🇸', function() {
		it('ISO1->Name', function() {
			assert.include(lib.names('840'), 'United States');
		});

		it('ISO2->Name', function() {
			assert.include(lib.names('US'), 'USA');
		});

		it('ISO3->Name', function() {
			assert.include(lib.names('USA'), 'US');
		});

		it('Name->Name', function() {
			assert.include(lib.names('United States'), 'USA');
		});
	});

	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.include(lib.names('Deutschland', 'de'), 'Deutschland');
		});

		it('Unsupported language', function() {
			try {
				lib.names('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim', function() {
			assert.include(lib.names(' 276'), 'Germany');
			assert.include(lib.names('276 '), 'Germany');
			assert.include(lib.names(' 276 '), 'Germany');
		});

		it('Exception Handling', function() {
			assert.throws(lib.names, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/)
		});
	});
})

describe('lib.iso2', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->ISO2', function() {
			assert.equal(lib.iso2('276'), 'DE');
		});

		it('ISO2->ISO2', function() {
			assert.equal(lib.iso2('DE'), 'DE');
		});

		it('ISO3->ISO2', function() {
			assert.equal(lib.iso2('DEU'), 'DE');
		});

		it('Name->ISO2', function() {
			assert.equal(lib.iso2('Germany', 'en'), 'DE');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.iso2('Deutschland', 'de'), 'DE');
		});

		it('Unsupported language', function() {
			try {
				lib.iso2('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.iso2(' 276'), 'DE');
			assert.equal(lib.iso2('276 '), 'DE');
			assert.equal(lib.iso2(' 276 '), 'DE');
		});

		it('Exception Handling', function() {
			assert.throws(lib.iso2, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.iso3', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->ISO3', function() {
			assert.equal(lib.iso3('276'), 'DEU');
		});

		it('ISO2->ISO3', function() {
			assert.equal(lib.iso3('DE'), 'DEU');
		});

		it('ISO3->ISO3', function() {
			assert.equal(lib.iso3('DEU'), 'DEU');
		});

		it('Name->ISO3', function() {
			assert.equal(lib.iso3('Germany', 'en'), 'DEU');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.iso3('Deutschland', 'de'), 'DEU');
		});

		it('Unsupported language', function() {
			try {
				assert.equal(lib.iso3('Deutschland', 'asdf'), 'DEU');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.iso3(' 276'), 'DEU');
			assert.equal(lib.iso3('276 '), 'DEU');
			assert.equal(lib.iso3(' 276 '), 'DEU');
		});

		it('Exception Handling', function() {
			assert.throws(lib.iso3, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.ioc', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->IOC', function() {
			assert.equal(lib.ioc('276'), 'GER');
		});

		it('ISO2->ISO3', function() {
			assert.equal(lib.ioc('DE'), 'GER');
		});

		it('ISO3->ISO3', function() {
			assert.equal(lib.ioc('DEU'), 'GER');
		});

		it('Name->ISO3', function() {
			assert.equal(lib.ioc('Germany', 'en'), 'GER');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.ioc('Deutschland', 'de'), 'GER');
		});

		it('Unsupported language', function() {
			try {
				lib.ioc('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.ioc(' 276'), 'GER');
			assert.equal(lib.ioc('276 '), 'GER');
			assert.equal(lib.ioc(' 276 '), 'GER');
		});

		it('Exception Handling', function() {
			assert.throws(lib.ioc, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.emoji', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->emoji', function() {
			assert.equal(lib.emoji('276'), '🇩🇪');
		});

		it('ISO2->emoji', function() {
			assert.equal(lib.emoji('DE'), '🇩🇪');
		});

		it('ISO3->emoji', function() {
			assert.equal(lib.emoji('DEU'), '🇩🇪');
		});

		it('Name->emoji', function() {
			assert.equal(lib.emoji('Germany', 'en'), '🇩🇪');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.emoji('Deutschland', 'de'), '🇩🇪');
		});

		it('Unsupported language', function() {
			try {
				lib.emoji('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.emoji(' 276'), '🇩🇪');
			assert.equal(lib.emoji('276 '), '🇩🇪');
			assert.equal(lib.emoji(' 276 '), '🇩🇪');
		});

		it('Exception Handling', function() {
			assert.throws(lib.emoji, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.callingCodes', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->callingCodes', function() {
			assert.include(lib.callingCodes('276'), '+49');
		});

		it('ISO2->callingCodes', function() {
			assert.include(lib.callingCodes('DE'), '+49');
		});

		it('ISO3->callingCodes', function() {
			assert.include(lib.callingCodes('DEU'), '+49');
		});

		it('Name->callingCodes', function() {
			assert.include(lib.callingCodes('Germany', 'en'), '+49');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.include(lib.callingCodes('Deutschland', 'de'), '+49');
		});

		it('Unsupported language', function() {
			try {
				lib.callingCodes('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.include(lib.callingCodes(' 276'), '+49');
			assert.include(lib.callingCodes('276 '), '+49');
			assert.include(lib.callingCodes(' 276 '), '+49');
		});

		it('Exception Handling', function() {
			assert.throws(lib.callingCodes, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.data', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->Country', function() {
			assert.equal(lib.data('276').ISO1, '276');
		});

		it('ISO2->Country', function() {
			assert.equal(lib.data('DE').ISO2, 'DE');
		});

		it('ISO3->Country', function() {
			assert.equal(lib.data('DEU').ISO3, 'DEU');
		});

		it('Name->Country', function() {
			assert.equal(lib.data('Germany', 'en').ISO3, 'DEU');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.data('Deutschland', 'de').ISO3, 'DEU');
		});

		it('Unsupported language', function() {
			try {
				lib.data('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.data(' 276').ISO1, '276');
			assert.equal(lib.data('276 ').ISO1, '276');
			assert.equal(lib.data(' 276 ').ISO1, '276');
		});

		it('Exception Handling', function() {
			assert.throws(lib.data, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.languages', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->languages', function() {
			assert.include(lib.languages('276'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});

		it('ISO2->languages', function() {
			assert.include(lib.languages('DE'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});

		it('ISO3->languages', function() {
			assert.include(lib.languages('DEU'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});

		it('Name->languages', function() {
			assert.include(lib.languages('Germany', 'en'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.include(lib.languages('Deutschland', 'de'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});

		it('Unsupported language', function() {
			try {
				lib.languages('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.include(lib.languages(' 276'), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
			assert.include(lib.languages('276 '), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
			assert.include(lib.languages(' 276 '), {
				"alpha2": "de",
				"alpha3": "deu",
				"bibliographic": "ger",
				"name": "German"
			});
		});

		it('Exception Handling', function() {
			assert.throws(lib.languages, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.currencies', function() {
	describe('#Germany 🇩🇪', function() {
		it('ISO1->currencies', function() {
			assert.include(lib.currencies('276'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});

		it('ISO2->currencies', function() {
			assert.include(lib.currencies('DE'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});

		it('ISO3->currencies', function() {
			assert.include(lib.currencies('DEU'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});

		it('Name->currencies', function() {
			assert.include(lib.currencies('Germany', 'en'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.include(lib.currencies('Deutschland', 'de'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});

		it('Unsupported language', function() {
			try {
				lib.currencies('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.include(lib.currencies(' 276'), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
			assert.include(lib.currencies('276 '), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
			assert.include(lib.currencies(' 276 '), {
				"currency": "Euro",
				"alphaCode": "EUR",
				"numCode": "978",
				"minorUnit": "2",
				"symbol": "€"
			});
		});

		it('Exception Handling', function() {
			assert.throws(lib.currencies, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.regionsData', function() {
	it('All regions data', function() {
		assert.isObject(lib.regionsData());
	});
	it('Central Asia (key)', function() {
		assert.isObject(lib.regionsData('centralAsia'));
	});
	it('Southern Asia (name)', function() {
		let region = lib.regionsData('Southern Asia');

		assert.isObject(region);
		assert.equal(region.countries[0].ISO2, 'AF');
	});
});

describe('lib.regions', function() {
	describe('#Identifier->Region', function() {
		it('Central Asia', function() {
			assert.equal(lib.regions('centralAsia').name, 'Central Asia');
		});
		it('Southern Asia', function() {
			assert.isNotNull(lib.regions('southernAsia'));
		});
		it('Southeast Asia', function() {
			assert.equal(lib.regions('southeastAsia').name, 'Southeast Asia');
		});
		it('East Asia', function() {
			assert.isNotNull(lib.regions('eastAsia'));
		});
		it('Western Asia', function() {
			assert.isNotNull(lib.regions('westernAsia'));
		});
		it('Central Africa', function() {
			assert.isNotNull(lib.regions('centralAfrica'));
		});
		it('North Africa', function() {
			assert.isNotNull(lib.regions('northAfrica'));
		});
		it('Southern Africa', function() {
			assert.isNotNull(lib.regions('southernAfrica'));
		});
		it('East Africa', function() {
			assert.isNotNull(lib.regions('southernAfrica'));
		});
		it('West Africa', function() {
			assert.isNotNull(lib.regions('westAfrica'));
		});
		it('Central America', function() {
			assert.isNotNull(lib.regions('centralAmerica'));
		});
		it('Northern America', function() {
			assert.isNotNull(lib.regions('northernAmerica'));
		});
		it('Caribbean', function() {
			assert.isNotNull(lib.regions('caribbean'));
		});
		it('South America', function() {
			assert.isNotNull(lib.regions('southAmerica'));
		});
		it('Antartica', function() {
			assert.isNotNull(lib.regions('antartica'));
		});
		it('Northern Europe', function() {
			assert.isNotNull(lib.regions('northernEurope'));
		});
		it('Southern Europe', function() {
			assert.isNotNull(lib.regions('southernEurope'));
		});
		it('Eastern Europe', function() {
			assert.isNotNull(lib.regions('easternEurope'));
		});
		it('Western Europe', function() {
			assert.isNotNull(lib.regions('westernEurope'));
		});
		it('Australia', function() {
			assert.isNotNull(lib.regions('australia'));
		});
		it('Melanesia', function() {
			assert.isNotNull(lib.regions('melanesia'));
		});
		it('Micronesia', function() {
			assert.isNotNull(lib.regions('micronesia'));
		});
		it('Polynesia', function() {
			assert.isNotNull(lib.regions('polynesia'));
		});
	});
	describe('#Extra functionality', function() {
		it('Name->Region', function() {
			assert.equal(lib.regions('Central Asia').name, 'Central Asia');
		});
		it('All Regions', function() {
			assert.typeOf(lib.regions(), 'object');
		});
		it('Asia', function() {
			assert.typeOf(lib.regions('asia'), 'object');
		});
		it('Europe', function() {
			assert.typeOf(lib.regions('europe'), 'object');
		});
		it('America', function() {
			assert.typeOf(lib.regions('America'), 'object');
		});
		it('Other', function() {
			assert.typeOf(lib.regions('other'), 'object');
		});
	});
});