const { filledStar, emptyStar } = require('./starIcons');
const { join, repeat, clamp, subtract, concat } = require('ramda');

const MAX_RATING = 5;
const MIN_RATING = 0;

const getJoinedEmptyImageMarkupString = (
  emptyImageMarkupString,
  clampedTotalRating
) =>
  join(
    '',
    repeat(emptyImageMarkupString, subtract(MAX_RATING, clampedTotalRating))
  );

const getJoinedFilledImageMarkupString = (
  filledImageMarkupString,
  clampedTotalRating
) => join('', repeat(filledImageMarkupString, clampedTotalRating));

module.exports = (
  userRating = 0,
  filledImageMarkupString = filledStar,
  emptyImageMarkupString = emptyStar
) => {
  let totalRating = userRating;

  if (isNaN(totalRating)) totalRating = 0;

  const clampedTotalRating = clamp(MIN_RATING, MAX_RATING, totalRating);

  return concat(
    getJoinedFilledImageMarkupString(
      filledImageMarkupString,
      clampedTotalRating
    ),
    getJoinedEmptyImageMarkupString(emptyImageMarkupString, clampedTotalRating)
  );
};
