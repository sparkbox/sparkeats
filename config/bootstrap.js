const { places, reviews } = require('../migrate');
const seed = require('../seed');

async function bootstrap(done) {
  require('dotenv').config();

  if (process.env.NODE_ENV === 'production') {
    return done();
  }

  let placesCount;
  let placeImageCount;
  let reviewsCount;
  let reviewImageCount;

  // try {
  // await Place.destroy({});
  // await PlaceImage.destroy({});
  // await Review.destroy({});
  // await ReviewImage.destroy({});
  // if ((await Place.count()) === 0) {
  // seed(places, reviews, done);
  // }
  // } catch (err) {
  // return done(err);
  // }

  seed(places, reviews, done);

  setTimeout(async () => {
    try {
      placesCount = await Place.count();
      placeImageCount = await PlaceImage.count();
      reviewsCount = await Review.count();
      reviewImageCount = await ReviewImage.count();
    } catch (err) {
      return done(err);
    }

    console.log('Seeded:');
    console.log(`- ${placesCount} places`);
    console.log(`- ${placeImageCount} placeImages`);
    console.log(`- ${reviewsCount} reviews`);
    console.log(`- ${reviewImageCount} reviewImages`);
  }, 1500);

  return done();
}

module.exports.bootstrap = bootstrap;
