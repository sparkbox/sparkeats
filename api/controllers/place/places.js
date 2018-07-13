const Promise = require('bluebird');
const { findImageByID } = require('../../../lib/findImage');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const getAvgNumberOfStars = require('../../../lib/getAvgNumberOfStars');

module.exports = async function places(req, res) {
  Promise.props({
    places: await Place.find({}),
    reviews: await Review.find({
      select: ['numberOfStars', 'placeId'],
    }),
  })
    .then(({ places, reviews }) => {
      return Promise.all(
        places.map(
          async ({
            id,
            placeName,
            city,
            state,
            address,
            phone,
            placeImage: placeImageID,
            placeImageAlt,
            placeURL,
            placeWebsiteDisplay,
          }) => {
            let placeImage = await findImageByID(PlaceImage, placeImageID);
            let avgNumberOfStars = getAvgNumberOfStars(
              reviews,
              id
            );

            let numberOfReviews = getNumberOfReviews(
              reviews,
              id
            );

            return {
              id,
              placeName,
              city,
              state,
              address,
              phone,
              placeImage,
              placeImageAlt,
              placeURL,
              placeWebsiteDisplay,
              avgNumberOfStars,
              numberOfReviews,
            };
          }
        )
      );
    })
    .then(places => res.view('pages/homepage', { places }))
    .catch(res.serverError);
};
