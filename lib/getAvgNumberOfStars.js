const getNumberOfStars = require('./getNumberOfStars');

module.exports = (reviews, placeId) => {
  const placeRatings = reviews
    .filter(review => review.placeId === placeId)
    .map(item => item.numberOfStars);
  const numberOfStars = Math.round(
    placeRatings.reduce((total, currentRating) => total + currentRating, 0) /
    placeRatings.length
  );

  const stars = getNumberOfStars(numberOfStars);

  return { stars, numberOfStars };
}
