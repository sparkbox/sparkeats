module.exports = {
  sync: true,
  friendlyName: 'Get average number of stars',

  description:
    'Return an average rating from all the review ratings of a place.',

  inputs: {
    reviews: {
      type: 'ref',
      description: 'The reviews of a single place.',
    },
    placeId: {
      type: 'ref',
      description: 'A single place.',
    },
  },

  fn: ({ reviews, placeId }, exits) => {
    const placeRatings = reviews
      .filter(review => review.placeId === placeId)
      .map(item => item.rating || item.numberOfStars);

    const avgRating = Math.round(
      placeRatings.reduce((total, currentRating) => total + currentRating, 0) /
      placeRatings.length
    );

    const result = sails.helpers.getNumberOfStars(avgRating);

    return exits.success(result);
  },
};
