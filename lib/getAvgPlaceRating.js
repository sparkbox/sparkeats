const {
  pipe,
  curry,
  divide,
  sum,
  length,
  filter,
  map,
  propEq,
  prop,
  converge,
} = require('ramda');

const getPlaceReviews = curry((placeId, reviews) =>
  pipe(
    filter(propEq('placeId', placeId)),
    map(prop('numberOfStars'))
  )(reviews)
);

const averageRatings = placeRatingsArr =>
  pipe(
    converge(divide, [sum, length]),
    Math.round
  )(placeRatingsArr);

const getAvgPlaceRating = (placeId, reviews) =>
  pipe(
    getPlaceReviews(placeId),
    averageRatings
  )(reviews);

module.exports = {
  getAvgPlaceRating,
  getPlaceReviews,
  averageRatings,
};
