/**
 * PlaceImage.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    file: {
      type: 'ref',
      columnType: 'mediumblob',
      required: true,
    },
    imageId: {
      type: 'string',
      required: true,
    },
    // filename: {
    //   type: 'string',
    //   required: true,
    // },
  },
};
