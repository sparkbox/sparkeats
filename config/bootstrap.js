const { places, reviews } = require('../migrate');
const { databaseRequiresSeeding, seedPlaces, seedReviews } = require('../seed');
const dotenv = require('dotenv');

async function bootstrap(done) {
  dotenv.config();

  if (
    process.env.NODE_ENV !== 'production' &&
    (await databaseRequiresSeeding())
  ) {
    return Promise.all(seedPlaces(places))
      .then(seededPlaces =>
        Promise.all(
          seededPlaces.map(place => {
            const placeReviews = _.filter(
              reviews,
              review => review['place-id'] === place.fd
            );

            return Promise.all(seedReviews(place, placeReviews));
          })
        )
      )
      .then(() => done())
      .catch(done);
  }
  return done();
}
module.exports.bootstrap = bootstrap;
