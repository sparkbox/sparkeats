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
      'review-image-file-name': reviewImageNames,
      'review-image-alt': reviewImageAlts,
    }) => {
      let reviewImageName = reviewImageNames
        ? reviewImageNames[0]
        : reviewImageNames;

      let file = encode(reviewImageName, 'reviews');
      let reviewImage = '';

      if (file) {
        reviewImage = await ReviewImage.create({
          file,
          fd: reviewImageName,
        }).fetch();
      }

      return await Review.create({
        reviewerName,
        reviewText,
        reviewImage: reviewImage.id,
        reviewImageAlt: reviewImageAlts ? reviewImageAlts[0] : '',
        numberOfStars,
        placeId: place.id,
      }).fetch();
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
        'place-image': placeImageName,
        'place-image-alt': placeImageAlt,
        'place-url': placeURL,
        'place-website-display': placeWebsiteDisplay,
      },
      placeKey
    ) => {
      let file = encode(placeImageName, 'places');
      let placeImage = '';

      if (file) {
        placeImage = await PlaceImage.create({
          file,
          fd: placeImageName,
        }).fetch();
      }

      return await Place.create({
        placeName,
        city,
        state,
        address,
        phone: phone || '',
        placeImage: placeImage.id,
        fd: placeKey,
        placeImageAlt: placeImageAlt || '',
        placeURL: placeURL || '',
        placeWebsiteDisplay: placeWebsiteDisplay || '',
      }).fetch();
    }
  );
}

module.exports = { seedPlaces, seedReviews };
