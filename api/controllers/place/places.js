const Promise = require('bluebird');
const { findImageByID } = require('../../../lib/findImage');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const { getAvgPlaceRating } = require('../../../lib/getAvgNumberOfStars');
const ratingToString = require('../../../lib/ratingToString');

module.exports = async function getPlaces(req, res) {
  Promise.props({
    places: await Place.find({}),
    reviews: await Review.find({
      select: ['numberOfStars', 'placeId'],
    }),
  })
    .then(({ places, reviews }) =>
      Promise.all(
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
            const placeImage = await findImageByID(PlaceImage, placeImageID);
            const { starImagesString, numberOfStars } = getAvgPlaceRating(
              reviews,
              id
            );

            const rating = ratingToString(numberOfStars);

            const numberOfReviews = getNumberOfReviews(reviews, id);

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
              stars: starImagesString,
              rating,
              numberOfReviews,
            };
          }
        )
      )
    )
    .then(places => res.view('pages/homepage', { places }))
    .catch(res.serverError);
};
