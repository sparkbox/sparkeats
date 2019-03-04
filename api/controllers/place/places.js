const Promise = require('bluebird');
const { findImageByID } = require('../../../lib/findImage');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const getAvgNumberOfStars = require('../../../lib/getAvgNumberOfStars');
const ratingToString = require('../../../lib/ratingToString');

module.exports = async function places(req, res) {
  Promise.props({
    places: await Place.find({}),
    reviews: await Review.find({
      select: ['numberOfStars', 'placeId'],
    }),
  })
    .then(props =>
      Promise.all(
        props.places.map(
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
            const placeImage = await findImageByID(PlaceImage, placeImageID);
            const { stars, numberOfStars } = getAvgNumberOfStars(
              props.reviews,
              id
            );
            const rating = ratingToString(numberOfStars);
            const numberOfReviews = getNumberOfReviews(props.reviews, id);

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
              numberOfStars,
              stars,
              rating,
              numberOfReviews,
            };
          }
        )
      )
    )
    .then(placesForView =>
      res.view('pages/homepage', { places: placesForView })
    )
    .catch(res.serverError);
};
