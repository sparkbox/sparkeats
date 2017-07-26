'use strict';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('getPlaceImageLocation', (imageFileName) => {
    if (!imageFileName) {
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
    return `/assets/images/places/${imageFileName}`;
  });

  Handlebars.registerHelper('getReviewImageLocation', (imageFileName) => {
    if (!imageFileName) {
      return '';
    }
    return `/assets/images/reviews/${imageFileName}`;
  });

  Handlebars.registerHelper('getReviewOrReviews', (reviewCount) => {
    if (reviewCount === 1) {
      return `${reviewCount} Review`;
    }
    return `${reviewCount} Reviews`;
  });
};
