const getNumberOfStars = require('./getNumberOfStars');
const { filledStar, emptyStar } = require('./getNumberOfStarsData');

module.exports = (reviews, placeId) => {
  const placeRatings = reviews
    .filter(review => review.placeId === placeId)
    .map(item => item.numberOfStars);
  const numberOfStars = Math.round(
    placeRatings.reduce((total, currentRating) => total + currentRating, 0) /
    placeRatings.length
  );

  const stars = getNumberOfStars(numberOfStars, filledStar, emptyStar);

  return { stars, numberOfStars };
}
