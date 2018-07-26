const { places, reviews } = require('../migrate');
const { seedPlaces, seedReviews } = require('../seed');
const dotenv = require('dotenv');

async function bootstrap(done) {
  dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    return done();
  }

  return Promise.all(seedPlaces(places))
    .then(places => {
      return Promise.all(
        places.map(place => {
          const placeReviews = _.filter(
            reviews,
            review => review['place-id'] === place.fd
          );

          return Promise.all(seedReviews(place, placeReviews));
        })
      );
    })
    .then(() => done())
    .catch(done);
}
module.exports.bootstrap = bootstrap;
