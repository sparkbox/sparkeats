module.exports = {
  sync: true,
  friendlyName: 'Format welcome message',

  description: 'Return a personalized greeting based on the provided name.',

  inputs: {
    rating: {
      type: 'ref',
      description: 'The name of the person to greet.',
    },
  },

  fn: ({ rating }, exits) => {
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
    return exits.success(result);
  },
};
