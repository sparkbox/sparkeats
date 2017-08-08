'use strict';

const chai = require('chai');
const handlebarsjs = require('./handlebars.js');
const mock = require('mock-fs');

const expect = chai.expect;

const fakePlaces = {
  'heathers-honey-cakes':
  {
    'place-name': 'Heathers Honey Cakes',
  },
  'katys-kimchi':
  {
    'place-name': 'Katys Kimchi',
  },
  'cats-cabbage-rolls':
  {
    'place-name': 'Cats Cabbage Rolls',
  },
};

const fakeReviews = {
  'katy-heathers-honey-cakes':
  {
    'place-id': 'heathers-honey-cakes',
    'number-of-stars': 5,
  },
  'heather-katys-kimchi':
  {
    'place-id': 'katys-kimchi',
    'number-of-stars': 2,
  },
  'cat-katys-kimchi':
  {
    'place-id': 'katys-kimchi',
    'number-of-stars': 1,
  },
};

describe('handlebars.js', () => {
  describe('prepareReviewsPageData', () => {
    describe('when correctly formatted data is provided', () => {
      const placeKeys = 'katys-kimchi';
      const result = handlebarsjs.prepareReviewsPageData(placeKeys, fakeReviews);
      it('returns an object', () => {
        expect(result).to.be.an('object');
      });
      it('returns the reviews for the specified key', () => {
        expect(Object.keys(result).length).to.equal(2);
        expect(Object.keys(result)).to.deep.equal(['heather-katys-kimchi', 'cat-katys-kimchi']);
      });
    });
    describe('when no reviews data is provided', () => {
      it('returns an empty object', () => {
        const result = handlebarsjs.prepareReviewsPageData('katys-kimchi', '');
        expect(result).to.be.empty;
      });
    });
    describe('when no place key is provided', () => {
      it('returns an empty object', () => {
        const result = handlebarsjs.prepareReviewsPageData('', fakeReviews);
        expect(result).to.be.empty;
      });
    });
  });

  describe('prepareAverageStars', () => {
    describe('when correctly formatted data is provided', () => {
      const result = handlebarsjs.prepareAverageStars('katys-kimchi', fakeReviews);
      it('returns a string', () => {
        expect(result).to.be.a('string');
      });
      it('returns a number as a string', () => {
        expect(parseFloat(result)).to.be.a('number');
      });
    });
    describe('when no review key is provided', () => {
      it('returns an empty string', () => {
        const result = handlebarsjs.prepareAverageStars('', fakeReviews);
        expect(result).to.be.empty;
      });
    });
    describe('when no reviews data is provided', () => {
      it('returns an empty string', () => {
        const result = handlebarsjs.prepareAverageStars('katys-kimchi', '');
        expect(result).to.be.empty;
      });
    });
  });

  describe('prepareData', () => {
    describe('when correctly formatted data is provided', () => {
      const result = handlebarsjs.prepareData(fakePlaces, fakeReviews);
      it('returns an array', () => {
        expect(result).to.be.an('array');
      });
      it('returns an object with place data', () => {
        const placeData = result[0].place;
        expect(placeData).to.not.be.empty;
      });
      it('returns an object with reviews data', () => {
        const reviewsData = result[0].reviews;
        expect(reviewsData).to.not.be.empty;
      });
      it('returns an object with the correct review count', () => {
        const honeyCakesReviews = result[0].numberOfReviews;
        const kimchiReviews = result[1].numberOfReviews;
        expect(honeyCakesReviews).to.equal(1);
        expect(kimchiReviews).to.equal(2);
      });
    });
    describe('when an empty places data file is provided', () => {
      const result = handlebarsjs.prepareData({}, fakeReviews);
      it('returns an empty array', () => {
        expect(result).to.be.empty;
      });
    });
    describe('when an empty reviews data file is provided', () => {
      const result = handlebarsjs.prepareData(fakePlaces, {});
      it('returns an empty array', () => {
        expect(result).to.be.empty;
      });
    });
    describe('when there is no review data for a place', () => {
      const result = handlebarsjs.prepareData(fakePlaces, fakeReviews);
      it('returns an object without data for that place', () => {
        expect(result.length).to.equal(2);
      });
    });
  });
});
