module.exports = numberOfStars => {
  const rating =
    numberOfStars > 1 ? `${numberOfStars} stars` : `${numberOfStars} star`;
  return rating;
};
