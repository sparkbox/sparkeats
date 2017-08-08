'use strict';

const chai = require('chai');
const sortingData = require('../tasks/lib/sorting-data');

const expect = chai.expect;

const data =
  {
    'apple': {
      'place-name': 'Apple',
      city: 'Appleton',
      state: 'AL',
    },
    'cantaloupe': {
      'place-name': 'Cantaloupe',
      city: 'Cantaloupe City',
      state: 'CN',
    },
    'banana': {
      'place-name': 'Banana',
      city: 'Bananatown',
      state: 'BN',
    },
    'pink-lady': {
      'place-name': 'Pink Lady',
      city: 'Appleton',
      state: 'AL',
    },
  };

const dataKeys = Object.keys(data);

describe('sortLocations', () => {
  const result = sortingData.sortLocations(data, dataKeys);
  describe('if given data with multiple places and multiple locations', () => {
    it('returns an array', () => {
      expect(result).to.be.an('array');
    });
    it('does not return an empty array', () => {
      expect(result).to.not.be.empty;
    });
    it('returns an array of locations in alphabetical order', () => {
      expect(result).to.have.ordered.members(['Appleton', 'Bananatown', 'Cantaloupe City']);
    });
  });
});

describe('sortKeysForIndividualLocations', () => {
  const result = sortingData.sortKeysForIndividualLocations('Appleton', data, dataKeys);
  describe('if given data with multiple places and multiple locations', () => {
    it('returns an array', () => {
      expect(result).to.be.an('array');
    });
    it('does not return an empty array', () => {
      expect(result).to.not.be.empty;
    });
    it('returns an array of place names in alphabetical order', () => {
      expect(result).to.have.ordered.members(['apple', 'pink-lady']);
    });
  });
});

describe('sortKeysByLocationAndPlace', () => {
  const result = sortingData.sortKeysByLocationAndPlace(data, dataKeys);
  describe('if given data with multiple places and multiple locations', () => {
    it('returns an array', () => {
      expect(result).to.be.an('array');
    });
    it('does not return an empty array', () => {
      expect(result).to.not.be.empty;
    });
    it('returns an array of place names that are ordered by location, then place name', () => {
      expect(result).to.have.ordered.members(['apple', 'pink-lady', 'banana', 'cantaloupe']);
    });
  });
});
