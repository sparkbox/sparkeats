/**
 * Place.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    placeName: {
      type: 'string',
      required: true,
    },
    city: {
      type: 'string',
      required: true,
      regex: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
    },
    stateAbbr: {
      type: 'string',
      required: true,
      regex: /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/,
    },
    state: {
      type: 'string',
      required: true,
    },
    address: {
      type: 'string',
    },
    phone: {
      type: 'string',
      regex: /^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$/,
    },
    placeImage: {
      type: 'string',
    },
    placeImageAlt: {
      type: 'string',
    },
    placeURL: {
      type: 'string',
      isURL: true,
    },
    placeWebsiteDisplay: {
      type: 'string',
      isURL: true,
    },
    reviews: {
      collection: 'review',
      via: 'placeId',
    },
  },
};
