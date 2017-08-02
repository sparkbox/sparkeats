'use strict';

const YAML = require('yamljs');

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
    const filledStar = '<img class="place-card__star" src="/assets/design/sparkeats_star.svg" alt="review star">';
    const halfStar = '<img class="place-card__star" src="/assets/design/sparkeats_star_half.svg" alt="review star">';
    const emptyStar = '<img class="place-card__star" src="/assets/design/sparkeats_star_empty.svg" alt="review star">';

    let result = '';
    let balanceOfStars = numberOfStars;

    // if there is a half star, subtract it's value from balanceOfStars
    // this will leave balanceOfStars as the number of filled stars
    if ((numberOfStars - 0.5) === Math.floor(numberOfStars)) {
      balanceOfStars -= 0.5;
    }

    if (numberOfStars > 0 && numberOfStars <= 5) {
      for (let count = 0; count < balanceOfStars; count += 1) {
        result += filledStar;
      }

      if ((numberOfStars - 0.5) === Math.floor(numberOfStars)) {
        result += halfStar;
        // because a half star fills the 'space' of a whole star, add 1.0 to the balanceOfStars
        // to determine the number of empty stars to display
        balanceOfStars += 1.0;
      }

      for (let count = 0; count < (5 - balanceOfStars); count += 1) {
        result += emptyStar;
      }
    } else {
      return result;
    }

    return new Handlebars.SafeString(result);
  });

  Handlebars.registerHelper('getReviewImageAlt', (reviewImageFileName, review) => {
    const reviewImageArray = review['review-image-file-name'];
    const reviewImageIndex = reviewImageArray.indexOf(reviewImageFileName);
    return review['review-image-alt'][reviewImageIndex];
  });
};
