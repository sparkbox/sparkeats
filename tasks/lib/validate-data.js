const Themis = require('themis');
const util = require('util');
const shell = require('shelljs');

// prepare for validation - convert yaml files to json files
shell.exec('yaml2json --pretty --save source/data/');

// require json data files
const placeData = require('../../public/data/places.json');
const reviewData = require('../../public/data/reviews.json');

// create validation custom formats
// places custom formats
Themis.registerFormat('city-format', function (str) {
  return /^[a-zA-Z0-9-\s]*$/.test(str);
});

Themis.registerFormat('state-format', function (str) {
  return /[A-Z]{2}/.test(str);
});

Themis.registerFormat('phone-format', function (str) {
  return /(\([0-9]{3}\)){1}[\s]{1}[0-9]{3}-[0-9]{4}$/.test(str);
});

Themis.registerFormat('place-image-format', function (str) {
  return /(.jpeg$|.jpg$|.png$|.gif$){1}/.test(str);
});

Themis.registerFormat('no-spaces-format', function (str) {
  return /^[^\s]*$/.test(str);
});

Themis.registerFormat('place-url-format', function (str) {
  return /^http/.test(str);
});

Themis.registerFormat('website-display-format', function (str) {
  return /^www/.test(str);
});

// reviews custom formats
Themis.registerFormat('dates-format', function (str) {
  return /(^((((0[13578])|([13578])|(1[02]))[/](([1-9])|([0-2][0-9])|(3[01])))|(((0[469])|([469])|(11))[/](([1-9])|([0-2][0-9])|(30)))|((2|02)[/](([1-9])|([0-2][0-9]))))[/]\d{4}$|^\d{4}$)/.test(str);
});

Themis.registerFormat('pictures-format', function (str) {
  return /(.jpeg$|.jpg$|.png$|.gif$){1}/.test(str);
});

// validation schemas
const schema = [
  {
    id: 'places',
    type: 'array',
    items: {
      title: 'places',
      type: 'object',
      properties: {
        'place-name': {
          type: 'string',
        },
        city: {
          type: 'string',
          format: 'city-format',
        },
        state: {
          type: 'string',
          minLength: 2,
          maxLength: 2,
          format: 'state-format',
        },
        address: {
          type: 'string',
        },
        phone: {
          oneOf: [
            {
              type: 'string',
              format: 'phone-format',
            },
            {
              type: 'null',
            },
          ],
        },
        'place-image': {
          oneOf: [
            {
              type: 'string',
              allOf: [
                {
                  format: 'place-image-format',
                },
                {
                  format: 'no-spaces-format',
                },
              ],
            },
            {
              type: 'null',
            },
          ],
        },
        'place-image-alt': {
          oneOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
        'place-url': {
          oneOf: [
            {
              type: 'string',
              format: 'place-url-format',
            },
            {
              type: 'null',
            },
          ],
        },
        'place-website-display': {
          oneOf: [
            {
              type: 'string',
              format: 'website-display-format',
            },
            {
              type: 'null',
            },
          ],
        },
      },
    },
  },
  {
    id: 'reviews',
    type: 'array',
    items: {
      title: 'reviews',
      type: 'object',
      properties: {
        'place-id': {
          type: 'string',
          format: 'no-spaces-format',
        },
        'review-text': {
          type: 'string',
        },
        'reviewer-name': {
          type: 'string',
        },
        'number-of-stars': {
          multipleOf: 1,
          minimum: 1,
          maximum: 5,
        },
        'dates-visited': {
          oneOf: [
            {
              type: 'array',
              items: {
                type: 'string',
                format: 'dates-format',
              },
            },
            {
              type: 'null',
            },
          ],
        },
        'picture-file-name': {
          oneOf: [
            {
              type: 'array',
              items: {
                type: 'string',
                allOf: [
                  {
                    format: 'place-image-format',
                  },
                  {
                    format: 'no-spaces-format',
                  },
                ],
              },
            },
            {
              type: 'null',
            },
          ],
        },
      },
    },
  },
];

// Generate the validator
const validator = Themis.validator(schema);

// VALIDATE ALL THE DATA!!
function report(dataSet, schemaId) {
  let dataKeys = Object.keys(dataSet).map((key) => {
    return dataSet[key];
  });
  let results = console.log(util.inspect(validator(dataKeys, schemaId),
  { depth: 3, colors: true }));
  let output = validator(dataKeys, schemaId);
  return output.valid; // this returns the results of the report (not the report itself)
}

console.log('Places data: ');
const isPlacesDataValid = report(placeData, 'places'); // assign results of report
module.exports.isPlacesDataValid = isPlacesDataValid; // export results of report

console.log('Reviews data: ');
const isReviewsDataValid = report(reviewData, 'reviews');
module.exports.isReviewsDataValid = isReviewsDataValid;
