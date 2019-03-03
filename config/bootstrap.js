const { placeData, reviewData } = require('../migrate');
const { seedPlaces, seedReviews } = require('../seed');
const dotenv = require('dotenv');

async function bootstrap(done) {
  dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    return done();
  }

  const seeded = await Place.count();

  if (seeded) {
    return done();
  }

  return Promise.all(seedPlaces(placeData))
    .then(places =>
      Promise.all(
        places.map(place => {
          const placeReviews = _.filter(
            reviewData,
            review => review['place-id'] === place.fd
          );

          return Promise.all(seedReviews(place, placeReviews));
        })
      )
    )
    .then(() => done())
    .catch(done);
}
module.exports.bootstrap = bootstrap;
