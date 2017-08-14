'use strict';

const chai = require('chai');
const locationDropdown = require('../source/js/LocationDropdown');

const expect = chai.expect;

describe('LocationDropdown', () => {
  describe('hideOrShowCard', () => {
    describe('when the city matches the location and hasHiddenClass is true', () => {
      const result = locationDropdown.hideOrShowCard('Dayton', 'Dayton', true);
      it('returns "show"', () => {
        expect(result).to.equal('show');
      });
    });
    describe('when the city does not match the location and hasHiddenClass is true', () => {
      const result = locationDropdown.hideOrShowCard('Columbus', 'Dayton', true);
      it('returns an empty string', () => {
        expect(result).to.be.empty;
      });
    });
    describe('when the city matches the location and hasHiddenClass is false', () => {
      const result = locationDropdown.hideOrShowCard('Dayton', 'Dayton', false);
      it('returns an empty string', () => {
        expect(result).to.be.empty;
      });
    });
    describe('when the city does not match the location and hasHiddenClass is false', () => {
      const result = locationDropdown.hideOrShowCard('Dayton', 'Columbus', false);
      it('returns "hide"', () => {
        expect(result).to.equal('hide');
      });
    });
  });
});
