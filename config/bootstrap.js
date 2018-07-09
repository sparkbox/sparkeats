const { places, reviews } = require('../migrate');
const { seedPlaces, seedReviews } = require('../seed');
const dotenv = require('dotenv');

async function bootstrap(done) {
  dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    return done();
  }

  return Promise
    .all(seedPlaces(places))
    .then(places => {
      const seedPromises = places.map(place => {
        const placeReviews = _.filter(reviews, review => {
          return review['place-id'] === place.fd;
        });

        return Promise.all(seedReviews(place, placeReviews));
      });

      return Promise.all(seedPromises);
    })
    .then(() => done())
    .catch(done);
}
module.exports.bootstrap = bootstrap;
