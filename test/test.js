var assert = require('chai').assert,
	lib = require('..');

describe('lib.names', function() {
	describe('#Germany (en)', function() {
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
	describe('#United Kingdom (en)', function() {
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

	describe('#USA (en)', function() {
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
	describe('#Germany', function() {
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
	describe('#Germany', function() {
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

describe('lib.country', function() {
	describe('#Germany', function() {
		it('ISO1->Country', function() {
			assert.equal(lib.country('276').ISO1, '276');
		});

		it('ISO2->Country', function() {
			assert.equal(lib.country('DE').ISO2, 'DE');
		});

		it('ISO3->Country', function() {
			assert.equal(lib.country('DEU').ISO3, 'DEU');
		});

		it('Name->Country', function() {
			assert.equal(lib.country('Germany', 'en').ISO3, 'DEU');
		});
	});
	describe('#Exceptional behaviour', function() {
		it('German name', function() {
			assert.equal(lib.country('Deutschland', 'de').ISO3, 'DEU');
		});

		it('Unsupported language', function() {
			try {
				lib.country('Deutschland', 'asdf');
			} catch (err) {
				assert(/INVALIDLANGUAGE/.test(err));
			}
		});

		it('trim needed', function() {
			assert.equal(lib.country(' 276').ISO1, '276');
			assert.equal(lib.country('276 ').ISO1, '276');
			assert.equal(lib.country(' 276 ').ISO1, '276');
		});

		it('Exception Handling', function() {
			assert.throws(lib.country, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY|INVALIDLANGUAGE/);
		});
	});
});

describe('lib.languages', function() {
	describe('#Germany', function() {
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
	describe('#Germany', function() {
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