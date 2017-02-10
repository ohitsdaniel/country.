const assert = require('chai').assert,
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
		it('trim', function() {
			assert.include(lib.names(' 276'), 'Germany');
			assert.include(lib.names('276 '), 'Germany');
			assert.include(lib.names(' 276 '), 'Germany');
		});

		it('Exception Handling', function() {
			assert.throws(lib.names, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY/)
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
		it('trim needed', function() {
			assert.equal(lib.iso2(' 276'), 'DE');
			assert.equal(lib.iso2('276 '), 'DE');
			assert.equal(lib.iso2(' 276 '), 'DE');
		});
		it('Exception Handling', function() {
			assert.throws(lib.iso2, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY/);
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
		it('trim needed', function() {
			assert.equal(lib.iso3(' 276'), 'DEU');
			assert.equal(lib.iso3('276 '), 'DEU');
			assert.equal(lib.iso3(' 276 '), 'DEU');
		});
		it('Exception Handling', function() {
			assert.throws(lib.iso3, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY/);
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
		it('trim needed', function() {
			assert.equal(lib.country(' 276').ISO1, '276');
			assert.equal(lib.country('276 ').ISO1, '276');
			assert.equal(lib.country(' 276 ').ISO1, '276');
		});
		it('Exception Handling', function() {
			assert.throws(lib.country, /INVALIDCODE|INVALIDFORMAT|INVALIDCOUNTRY/);
		});
	});
});