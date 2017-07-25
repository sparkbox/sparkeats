'use strict';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('getImageLocation', (imageFileName, placeOrReview) => {
    if (!imageFileName) {
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    } else if (placeOrReview === 'place') {
      return `/assets/images/places/${imageFileName}`;
    }
    return `/assets/images/reviews/${imageFileName}`;
  });

  Handlebars.registerHelper('getReviewOrReviews', (reviewCount) => {
    if (reviewCount === 1) {
      return `${reviewCount} Review`;
    }
    return `${reviewCount} Reviews`;
  });

  Handlebars.registerHelper('getReviewPageLink', (placeId) => {
    return `/reviews/${placeId}.html`;
  });

  Handlebars.registerHelper('getNumberOfStars', (numberOfStars) => {
    console.log(`Number of Stars: ${numberOfStars}`);
    if (numberOfStars === 1) {
      return 'one star';
    } else if (numberOfStars === 2) {
      return 'two stars';
    } else {
      return 'no stars';
    }
  });
};
