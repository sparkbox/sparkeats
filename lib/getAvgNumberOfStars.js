const getNumberOfStars = require('./getNumberOfStars');

module.exports = (reviews, placeId) => {
  const placeRatings = reviews
    .filter(review => review.placeId === placeId)
    .map(item => item.rating || item.numberOfStars);

  const avgRating = Math.round(
    placeRatings.reduce((total, currentRating) => total + currentRating, 0) /
    placeRatings.length
  );

  const result = getNumberOfStars(avgRating);

  return result;
}
