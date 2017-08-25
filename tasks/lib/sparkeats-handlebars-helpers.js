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

  Handlebars.registerHelper('getPhoneNumber', (phoneNumber) => {
    let result;
    if (phoneNumber) {
      result = phoneNumber.match(/\d+/g).join([]);
    }
    return result;
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

Handlebars.registerHelper('getReviewImageAlt', (reviewImageFileName, data) => {
  const numberOfReviews = data.numberOfReviews;
  let reviewImageAltTag = data.place['place-name'];

  for (let i = 0; i < numberOfReviews; i += 1) {
    const review = data.reviews[Object.keys(data.reviews)[i]];
    if (review['review-image-alt']) {
      const altTagArray = review['review-image-alt'];
      const numberOfAltTags = altTagArray.length;
      for (let j = 0; j < numberOfAltTags; j += 1) {
        if (reviewImageFileName === review['review-image-file-name'][j]) {
          reviewImageAltTag = review['review-image-alt'][j];
        }
      }
    } else {
      reviewImageAltTag = data.place['place-name'];
    }
  }
  return reviewImageAltTag;
});

  Handlebars.registerHelper('getPlaceImageAlt', (placeImageAlt, placeName) => {
    if (!placeImageAlt) {
      return `${placeName}`;
    }
    return `${placeImageAlt}`;
  });

  Handlebars.registerHelper('getLocationDropdownList', (data) => {
    const locationSet = new Set();
    locationSet.add('All Places');
    let locationListHtml = '';
    for (let i = 0; i < data.length; i += 1) {
      const location = data[i].place.city;
      locationSet.add(location);
    }
    locationSet.forEach((location) => {
      if (location === 'All Places') {
        locationListHtml += `
          <li><button id="${location}" class="location-dropdown__list-button hidden">
            ${location}
          </button></li>`;
      } else {
        locationListHtml += `
          <li><button id="${location}" class="location-dropdown__list-button">
            ${location}
          </button></li>`;
      }
    });
    return new Handlebars.SafeString(locationListHtml);
  });
};
