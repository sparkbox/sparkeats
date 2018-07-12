module.exports = (rating) => {
  const filledStar = `<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star">`;
  const emptyStar = `<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star">`;
  let result = '';

  for (let i = 0; i < rating; i += 1) {
    result += filledStar;
  }
  if (5 - rating !== 0) {
    for (let i = 0; i < 5 - rating; i += 1) {
      result += emptyStar;
    }
  }

  return result;
};
