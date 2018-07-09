const _ = require('@sailshq/lodash');
const fs = require('fs');
const encode = require('./encode');

function seedReviews(place, placeReviews) {
  return _.map(
    placeReviews,
    async ({
      'review-text': reviewText,
      'reviewer-name': reviewerName,
      'number-of-stars': numberOfStars,
      'review-image-file-name': reviewImage,
      'review-image-alt': reviewImageAlt,
    }) => {
      let file;
      reviewImage = reviewImage ? reviewImage[0] : '';

      if (reviewImage) {
        file = await ReviewImage.create({
          file: encode(`./data/images/reviews/${reviewImage}`),
          fd: reviewImage,
        })
          .intercept(err => err)
          .fetch();
      }

      return await Review.create({
        reviewerName,
        reviewText,
        reviewImage: file ? file.id : '',
        reviewImageAlt: reviewImageAlt ? reviewImageAlt[0] : '',
        numberOfStars,
        placeId: place.id,
      }).intercept(err => err);
    }
  );
}

function seedPlaces(places) {
  return _.map(
    places,
    async (
      {
        city,
        state,
        address,
        phone,
        'place-name': placeName,
        'place-image': placeImage,
        'place-image-alt': placeImageAlt,
        'place-url': placeURL,
        'place-website-display': placeWebsiteDisplay,
      },
      placeKey
    ) => {
      let file;

      if (placeImage) {
        file = await PlaceImage.create({
          file: encode(`./data/images/places/${placeImage}`),
          fd: placeImage,
        })
          .intercept(err => err)
          .fetch();
      }

      return await Place.create({
        placeName,
        city,
        state,
        address,
        phone: phone || '',
        placeImage: file ? file.id : '',
        fd: placeKey,
        placeImageAlt: placeImageAlt || '',
        placeURL: placeURL || '',
        placeWebsiteDisplay: placeWebsiteDisplay || '',
      })
        .intercept(err => err)
        .fetch();
    }
  );
}

module.exports = { seedPlaces, seedReviews };
