const assert = require('chai').assert,
	lib = require('..');

describe('Names', function() {
	describe('#Germany (en)', function() {
		it('should return an Array containing Germany', function() {
			assert.include(lib.names('DE'), 'Germany');
			assert.include(lib.names('DEU'), 'Germany');
			assert.include(lib.names('276'), 'Germany');
			assert.include(lib.names('Germany'), 'Germany');

		});
	});
	describe('#United Kingdom (en)', function() {
		it('should return an Array containing United Kingdom, UK and Great Britain', function() {
			assert.include(lib.names('GB'), 'United Kingdom');
			assert.include(lib.names('GBR'), 'UK');
			assert.include(lib.names('826'), 'Great Britain');
			assert.include(lib.names('United Kingdom'), 'UK');
		});
	});

	describe('#USA (en)', function() {
		it('should return an Array containing United Kingdom, UK and Great Britain', function() {
			assert.include(lib.names('US'), 'USA');
			assert.include(lib.names('USA'), 'US');
			assert.include(lib.names('840'), 'United States');
			assert.include(lib.names('United States'), 'USA');

		});
	});
})

describe('ISO2 Code check', function() {
	describe('#Germany', function() {
		it('ISO2 Code of Germany should be DE', function() {
			assert.equal(lib.iso2('DE'), 'DE');
			assert.equal(lib.iso2('DEU'), 'DE');
			assert.equal(lib.iso2('276'), 'DE');
		});
	});
	describe('#invalid', function() {
		it('iso2 should throw invalid code errors or that codes must be provided as a string.', function() {
			assert.throws(lib.iso2, /(invalid|must be provided as a string)/);
		});
	});
})