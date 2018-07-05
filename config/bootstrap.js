const { places, reviews } = require('../migrateYaml');
const getState = require('../lib/getState');

function seedReviews(place, placeReviews) {
  _.each(
    placeReviews,
    async ({
      'review-text': reviewText,
      'reviewer-name': reviewerName,
      'number-of-stars': numberOfStars,
      'review-image-file-name': reviewImageFileName,
      'review-image-alt': reviewImageAlt,
    }) => {
      try {
        await Review.create({
          reviewerName,
          reviewText,
          reviewImageFileName: reviewImageFileName
            ? reviewImageFileName[0]
            : '',
          reviewImageAlt: reviewImageAlt ? reviewImageAlt[0] : '',
          numberOfStars,
          placeId: place.id,
        });
      } catch (err) {
        console.log('*'.repeat(20));
        console.log(err);
        console.log('*'.repeat(20));
      }
    }
  );
}

function seedPlaces(places) {
  _.each(
    places,
    async (
      {
        city,
        state: stateAbbr,
        address,
        phone,
        'place-name': placeName,
        'place-image': placeImage,
        'place-image-alt': placeImageAlt,
        'place-url': placeURL,
        'place-website-display': placeWebsiteDisplay,
      },
      placeId
    ) => {
      let place;

      try {
        place = await Place.create({
          placeName,
          city,
          stateAbbr,
          state: getState(stateAbbr),
          address,
          phone: phone || '',
          placeImage: placeImage || '',
          placeImageAlt: placeImageAlt || '',
          placeURL: placeURL || '',
          placeWebsiteDisplay: placeWebsiteDisplay || '',
        })
          .intercept(err => err)
          .fetch();
      } catch (err) {
        console.log('*'.repeat(20));
        console.log(err);
        console.log('*'.repeat(20));
      }

      const placeReviews = _.filter(reviews, review => {
        return review['place-id'] === placeId;
      });

      seedReviews(place, placeReviews);
    }
  );
}

async function bootstrap(done) {
  require('dotenv').config();

  // Don't seed if already seeded
  if ((await Place.count()) > 0) {
    console.log('Already seeded.');
    return done();
  }

  seedPlaces(places);

  return done();
}

module.exports.bootstrap = bootstrap;
