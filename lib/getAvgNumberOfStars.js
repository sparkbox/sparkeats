const getNumOfStarsImg = require('./getNumberOfStars');

const getPlaceReviews = (reviews, placeId) =>
  reviews
    .filter(review => review.placeId === placeId)
    .map(item => item.numberOfStars);

const getAvgPlaceRatingNum = placeRatingsArr =>
  Math.round(
    placeRatingsArr.reduce((total, currentRating) => total + currentRating, 0) /
      placeRatingsArr.length
  );

const getAvgPlaceRating = (reviews, placeId) => {
  const numberOfStars = getAvgPlaceRatingNum(getPlaceReviews(reviews, placeId));

  const starImagesString = getNumOfStarsImg(numberOfStars);

  return { numberOfStars, starImagesString };
};

module.exports = {
  getAvgPlaceRating,
  getPlaceReviews,
  getAvgPlaceRatingNum,
};
