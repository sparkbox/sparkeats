/**
 * Review.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    reviewText: {
      type: 'string',
      required: true,
      columnType: 'text',
    },
    reviewerName: {
      type: 'string',
      required: true,
    },
    numberOfStars: {
      type: 'number',
      isInteger: true,
      min: 1,
      max: 5,
      required: true,
    },
    reviewImageFileName: {
      type: 'string',
    },
    reviewImageAlt: {
      type: 'string',
    },
    placeId: {
      model: 'place',
    },
  },
};
