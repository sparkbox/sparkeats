module.exports = (ratings, placeId) => {
  const numberOfReviews = ratings.filter(rating => rating.placeId === placeId).length;
  return numberOfReviews;
};
