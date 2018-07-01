module.exports = {
  friendlyName: 'Get numbe rof reviews',

  description: 'Returns the amount of reviews of a place.',

  inputs: {
    ratings: {
      type: 'ref',
      description: 'The ratings of a place.',
    },
    currentPlace: {
      type: 'ref',
      description: 'A single place.',
    },
  },

  fn: ({ ratings, currentPlace }, exits) => {
    const numberOfReviews = ratings.filter(
      rating => rating.placeId === currentPlace.id
    ).length;
    return exits.success(numberOfReviews);
  },
};
