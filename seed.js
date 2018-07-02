const _ = require('@sailshq/lodash');
const fs = require('fs');
const encode = require('./encode');

async function seedReviews(place, placeReviews, done) {
  _.each(
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

      try {
        if (reviewImage) {
          file = await ReviewImage.create({
            file: encode(`./data/images/reviews/${reviewImage}`),
            fd: reviewImage,
          })
            .intercept(err => err)
            .fetch();
        }

        await Review.create({
          reviewerName,
          reviewText,
          reviewImage: file ? file.id : '',
          reviewImageAlt: reviewImageAlt ? reviewImageAlt[0] : '',
          numberOfStars,
          placeId: place.id,
        }).intercept(err => err);
      } catch (err) {
        done(err);
      }
    }
  );
}

async function seed(places, reviews, done) {
  _.each(
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
      let place;
      let file;

      try {
        if (placeImage) {
          file = await PlaceImage.create({
            file: encode(`./data/images/places/${placeImage}`),
            fd: placeImage,
          })
            .intercept(err => err)
            .fetch();
        }

        place = await Place.create({
          placeName,
          city,
          state,
          address,
          phone: phone || '',
          placeImage: file ? file.id : '',
          placeImageAlt: placeImageAlt || '',
          placeURL: placeURL || '',
          placeWebsiteDisplay: placeWebsiteDisplay || '',
        })
          .intercept(err => err)
          .fetch();
      } catch (err) {
        done(err);
      }

      const placeReviews = _.filter(reviews, review => {
        return review['place-id'] === placeKey;
      });

      await seedReviews(place, placeReviews, done);
    }
  );
}

module.exports = seed;
