module.exports = {
  friendlyName: 'Format welcome message',

  description: 'Return a personalized greeting based on the provided name.',

  inputs: {
    ratings: {
      type: {},
      description: 'The name of the person to greet.',
    },
    currentPlace: {
      type: {},
      description: 'The name of the person to greet.',
    },
  },

  fn: async function (inputs, exit) {
    let stars = inputs.ratings.filter(rating => rating.placeId === inputs.currentPlace.id);
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
  }
};