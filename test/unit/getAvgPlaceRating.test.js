const { expect } = require('chai');
const {
  getPlaceReviews,
  averageRatings,
  getAvgPlaceRating,
} = require('../../lib/getAvgPlaceRating');

describe('Average Place Rating', () => {
  describe('getPlaceReviews', () => {
    it('returns the correct place ratings', () => {
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
      const ratings = getPlaceReviews(placeId, reviews);
      expect(ratings).to.include.ordered.members([4, 2, 4]);
    });
  });

  describe('getAvgPlaceRatingNum', () => {
    it('returns the correct average rating', () => {
      const ratings = [2, 2, 1, 1];
      const average = averageRatings(ratings);
      expect(average).to.equal(2);
    });
  });

  describe('getAvgPlaceRating', () => {
    const reviews = [
      { placeId: 12, numberOfStars: 4 },
      { placeId: 12, numberOfStars: 2 },
      { placeId: 12, numberOfStars: 4 },
      { placeId: 1, numberOfStars: 3 },
    ];
    const placeId = 12;

    it('returns average rating for placeId', () => {
      const avgPlaceRating = getAvgPlaceRating(placeId, reviews);
      expect(avgPlaceRating).to.equal(3);
    });
  });
});
