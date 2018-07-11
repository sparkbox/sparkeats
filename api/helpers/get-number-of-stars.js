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
    const filledStar = `<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star" aria-hidden="true">`;
    const emptyStar = `<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star" aria-hidden="true">`;
    let stars = '';

    for (let i = 0; i < rating; i += 1) {
      stars += filledStar;
    }
    if (5 - rating !== 0) {
      for (let i = 0; i < 5 - rating; i += 1) {
        stars += emptyStar;
      }
    }

    rating = rating > 1 ? `${rating} stars` : `${rating} star`;

    return exits.success({ stars, rating });
  },
};
