module.exports = {
  sync: true,
  friendlyName: 'Get numbe rof reviews',

  description: 'Returns the amount of reviews of a place.',

  inputs: {
    ratings: {
      type: 'ref',
      description: 'The ratings of a place.',
    },
    placeId: {
      type: 'ref',
      description: 'A single place.',
    },
  },

  fn: ({ ratings, placeId }, exits) => {
    const numberOfReviews = ratings.filter(rating => rating.placeId === placeId)
      .length;
    return exits.success(numberOfReviews);
  },
};
