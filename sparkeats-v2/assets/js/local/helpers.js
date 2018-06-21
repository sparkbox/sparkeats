module.exports = {
  getNumberOfStars: (ratings, currentPlace) => {
    let stars = ratings.filter(rating => rating.placeId === currentPlace.id);
    stars = Math.round(
      stars.map(item => item.numberOfStars).reduce((a, b) => a + b, 0) /
        stars.length
    );
    const filledStar =
      '<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star">';
    const emptyStar =
      '<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star">';
    let result = '';
    for (let i = 0; i < stars; i += 1) {
      result += filledStar;
    }
    if (5 - stars !== 0) {
      for (let i = 0; i < 5 - stars; i += 1) {
        result += emptyStar;
      }
    }
    return result;
  },

  getNumberOfReviews: (ratings, currentPlace) => {
    const n = ratings.filter(rating => rating.placeId === currentPlace.id)
      .length;
    return `${n} ${n === 1 ? 'Review' : 'Reviews'}`;
  },
};

// const getNumberOfStars = (ratings, currentPlace) => {
//   let stars = ratings.filter(rating => rating.placeId === currentPlace.id);
//   stars = Math.round(
//     stars.map(item => item.numberOfStars).reduce((a, b) => a + b, 0) /
//       stars.length
//   );
//   const filledStar =
//     '<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star">';
//   const emptyStar =
//     '<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star">';
//   let result = '';
//   for (let i = 0; i < stars; i += 1) {
//     result += filledStar;
//   }
//   if (5 - stars !== 0) {
//     for (let i = 0; i < 5 - stars; i += 1) {
//       result += emptyStar;
//     }
//   }
//   return result;
// };

// const getNumberOfReviews = (ratings, currentPlace) => {
//   const n = ratings.filter(rating => rating.placeId === currentPlace.id).length;
//   return `${n} ${n === 1 ? 'Review' : 'Reviews'}`;
// };
