const { expect } = require('chai');
const {
  getPlaceReviews,
  getAvgPlaceRatingNum,
  getAvgPlaceRating,
} = require('../../lib/getAvgNumberOfStars');

describe('getAvgNumberOfStars', () => {
  describe('getPlaceReviews()', () => {
    it('Returns reviews array', () => {
      const reviews = [
        {
          placeId: 12,
          numberOfStars: 4,
        },
        {
          placeId: 12,
          numberOfStars: 2,
        },
        {
          placeId: 12,
          numberOfStars: 4,
        },
        {
          placeId: 1,
          numberOfStars: 3,
        },
      ];
      const placeId = 12;
      const ratings = getPlaceReviews(reviews, placeId);
      expect(ratings).to.be.an('array');
    });
  });

  describe('getAvgPlaceRatingNum()', () => {
    it('Returns rating average number', () => {
      const ratings = [2, 2, 1, 1];
      const average = getAvgPlaceRatingNum(ratings);
      expect(average).to.equal(2);
    });
  });

  describe('getAvgPlaceRating()', () => {
    const reviews = [
      { placeId: 12, numberOfStars: 4 },
      { placeId: 12, numberOfStars: 2 },
      { placeId: 12, numberOfStars: 4 },
      { placeId: 1, numberOfStars: 3 },
    ];
    const placeId = 12;

    it('Returns object w/ numberOfStars property', () => {
      const avgPlaceRating = getAvgPlaceRating(reviews, placeId);
      expect(avgPlaceRating).to.have.property('numberOfStars');
    });

    it('Returns object w/ starImagesString property', () => {
      const avgPlaceRating = getAvgPlaceRating(reviews, placeId);
      expect(avgPlaceRating).to.have.property('starImagesString');
    });

    it('numberOfStars is a number', () => {
      const avgPlaceRating = getAvgPlaceRating(reviews, placeId);
      expect(avgPlaceRating.numberOfStars).to.be.a('number');
    });

    it('starImagesString is a string', () => {
      const avgPlaceRating = getAvgPlaceRating(reviews, placeId);
      expect(avgPlaceRating.numberOfStars).to.be.a('string');
    });
  });
});
