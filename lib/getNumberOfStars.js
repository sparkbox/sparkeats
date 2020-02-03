const { join, repeat, clamp, subtract, concat, pipe } = require('ramda');
const { filledStar, emptyStar } = require('./starIcons');

const MAX_RATING = 5;
const MIN_RATING = 0;

const getJoinedImageMarkupString = (markupString, rating) =>
  join('', repeat(markupString, rating));

const emptyImage = rating => subtract(MAX_RATING, rating);

const enforceRatingRange = rating => clamp(MIN_RATING, MAX_RATING, rating);

const convertToRating = rating => (isNaN(rating) ? 0 : rating);

const concatImages = (
  filledImageMarkupString,
  emptyImageMarkupString
) => rating =>
    concat(
      getJoinedImageMarkupString(filledImageMarkupString, rating),
      getJoinedImageMarkupString(emptyImageMarkupString, emptyImage(rating))
    );

const getImageMarkupString = (
  userRating = 0,
  filledImageMarkupString = filledStar,
  emptyImageMarkupString = emptyStar
) =>
  pipe(
    convertToRating,
    enforceRatingRange,
    concatImages(filledImageMarkupString, emptyImageMarkupString)
  )(userRating);

module.exports = getImageMarkupString;
