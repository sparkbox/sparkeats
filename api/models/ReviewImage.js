/**
 * ReviewImage.js
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
    // file descriptor
    fd: {
      type: 'string',
      required: true,
    },
  },
};
