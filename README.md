# country.
[![Build Status](https://travis-ci.org/ohitsdaniel/country..svg?branch=master)](https://travis-ci.org/ohitsdaniel/country.)

**country.** provides all kinds of data on countries. It offers the following information:
  * ISO-3611-1/2/3 code
  * International Olympic Committee Code (IOC)
  * Spoken languages
  * Used currencies
  * Calling codes
  * Country Flag as an Emoji
  * Names in the following languages:
  
  Code  | Language
------------- | -------------
ar  | Arabic
cs  | Czech
de  | German
en  | English
et  | Estonian
fi  | Finnish
fr  | French
it  | Italian
nb  | Norwegian Bokmål
nn  | Norwegian Nynorsk
nl  | Dutch
pl  | Polish 
pt  | Portuguese
ru  | Russian
sv  | Swedish
tr  | Turkish
zh  | Chinese

This library also classifies countries into regions. The following regions are supported:

* Asia (Central + Southern + Southeast + East + Western) 
 * Central Asia
 * Southern Asia
 * Southeast Asia
 * East Asia
 * Western Asia

* Africa (Central + North + Southern + East + West) 
 * Central Africa
 * North Africa
 * Southern Africa
 * East Africa
 * West Africa

* Europe (Northern + Southern + Eastern + Western)
 * Northern Europe
 * Southern Europe
 * Eastern Europe
 * Western Europe
* America (Central + Northern + Southern) 
 * Central America
 * Northern America
 * South America
* Other
 * Australia
 * Melanesia
 * Micronesia
 * Polynesia
 * Antartica
 * Caribbean


## Usage

Require country. in your project. 
```js
'use strict';
const country = require('countryinfo');
```

### ISO 3166-1 codes
```js
// ISO 3166-1 numeric identifiers from ...
country.iso1('DE');                 // ... ISO 3166-1 alpha-2
country.iso1('DEU');                // ... ISO 3166-1 alpha-3
country.iso1('Germany');            // ... country name
country.iso1('Deutschland', 'de');  // ... localized country name

// ISO 3166-1 alpha-2 identifiers from ...
country.iso2('276');                // ... ISO 3166-1 numeric
country.iso2('DEU');                // ... ISO 3166-1 alpha-3
country.iso2('Germany');            // ... country name
country.iso2('Deutschland', 'de');  // ... localized country name

// ISO 3166-1 alpha-3 identifiers from ...
country.iso3('276');                // ... ISO 3166-1 numeric
country.iso3('DE');                 // ... ISO 3166-1 alpha-2
country.iso3('Germany');            // ... country name
country.iso3('Deutschland', 'de');  // ... localized country name
```

### IOC
```js
// IOC identifiers from ...
country.ioc('276');                // ... ISO 3166-1 numeric
country.ioc('DE');                 // ... ISO 3166-1 alpha-2
country.ioc('DEU');                // ... ISO 3166-1 alpha-3
country.ioc('Germany');            // ... country name
country.ioc('Deutschland', 'de');  // ... localized country name
```

### Languages
```js
// Spoken languages from ...
country.languages('276');                // ... ISO 3166-1 numberic
country.languages('DE');                 // ... ISO 3166-1 alpha-2
country.languages('DEU');                // ... ISO 3166-1 alpha-3
country.languages('Germany');            // ... country name
country.languages('Deutschland', 'de');  // ... localized country name
```

### Currencies
```js
// Used currencies in country from ...
country.currencies('276');                // ... ISO 3166-1 numberic
country.currencies('DE');                 // ... ISO 3166-1 alpha-2
country.currencies('DEU');                // ... ISO 3166-1 alpha-3
country.currencies('Germany');            // ... country name
country.currencies('Deutschland', 'de');  // ... localized country name
```

### Country data
```js
// Complete data of country from ...
country.data('276');                // ... ISO 3166-1 numberic
country.data('DE');                 // ... ISO 3166-1 alpha-2
country.data('DEU');                // ... ISO 3166-1 alpha-3
country.data('Germany');            // ... country name
country.data('Deutschland', 'de');  // ... localized country name
```

### Regions
```js
// Region data
country.regions();                   // all regions
country.regionsData();               // all regions including data for all countries (ISO 3166-1 codes, IOC,...)
country.regions('europe');           // find region by identifier ...
country.regions('Central Asia');     // ... or by name
country.regionsData('europe');       // complete region data by identifier...
country.regionsData('Central Asia'); // ... or by name
```

## Contribution & Data Sources
If you want to add additional country names to the list, feel free to do so in the `/lib/data/names.json` file. The structure should be clear.

```json5
{
	"DE": {                        // ISO 3166-1 alpha-2 identifier
		"en": ["Germany"],        // array of to be added names in the set locale
		"ar": [" ألمانيا"]
	}
}
```

To import the data into the library, run `make` in the root directory. This recreates the `/lib/data/masterData.json` file.

## Data sources 
* JSON dump of [`countrySynonyms`](https://rdrr.io/rforge/rworldmap/man/countrySynonyms.html)
* [`i18n-iso-countries`](https://www.npmjs.com/package/i18n-iso-countries)
* [Currency Code Services – ISO 4217 Maintenance Agency](https://www.currency-iso.org/dam/downloads/lists/list_one.xls)
* [`country-data`](https://www.npmjs.com/package/country-data)
* [Locale::Codes](http://search.cpan.org/~sbeck/Locale-Codes-3.42/lib/Locale/Codes.pod) (datasources also aknowledged there)

## I don't need a JS library, I just need the data.
Run `make` in the root directory of the project and copy the `/lib/data/masterData.json` file. This file contains all the mentioned data.

## Build / Test / Update
In package json:
- `npm test` - run tests
- `npm run cleaner` - update master data
