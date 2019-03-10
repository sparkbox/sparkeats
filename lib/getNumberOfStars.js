module.exports = numberOfStars => {
  const filledStar = `<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true">`;
  const emptyStar = `<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true">`;
  let stars = '';

  for (let i = 0; i < numberOfStars; i += 1) {
    stars += filledStar;
  }
  if (5 - numberOfStars !== 0) {
    for (let i = 0; i < 5 - numberOfStars; i += 1) {
      stars += emptyStar;
    }
  }

  return stars;
};
