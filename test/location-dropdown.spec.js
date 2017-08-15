'use strict';

const chai = require('chai');
const locationDropdown = require('../source/js/location-dropdown');

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
    describe('when All Places is selected', () => {
      describe('if the card is already hidden', () => {
        const result = locationDropdown.hideOrShowCard('Dayton', 'All Places', true);
        it('returns "show"', () => {
          expect(result).to.equal('show');
        });
      });
      describe('if the card is not currently hidden', () => {
        const result = locationDropdown.hideOrShowCard('Dayton', 'All Places', false);
        it('returns an empty string', () => {
          expect(result).to.be.empty;
        });
      });
    });
  });
  describe('hideOrShowLocation', () => {
    describe('when a location is selected that is not All Places', () => {
      describe('and the location is not already hidden', () => {
        const result = locationDropdown.hideOrShowLocation('Dayton', 'Dayton', false);
        it('returns hide', () => {
          expect(result).to.equal('hide');
        });
      });
      describe('and the location is already hidden', () => {
        const result = locationDropdown.hideOrShowLocation('Columbus', 'Dayton', true);
        it('returns show', () => {
          expect(result).to.equal('show');
        });
      })
    });
    describe('when All Places is selected', () => {
      describe('and the location is not already hidden', () => {
        const result = locationDropdown.hideOrShowLocation('All Places', 'Dayton', false);
        it('returns an empty string', () => {
          expect(result).to.be.empty;
        });
      });
      describe('and the location is already hidden', () => {
        const result = locationDropdown.hideOrShowLocation('All Places', 'Dayton', true);
        it('returns show', () => {
          expect(result).to.equal('show');
        });
      });
    });
  });
});
