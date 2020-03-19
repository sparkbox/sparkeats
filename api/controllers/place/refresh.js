const Promise = require('bluebird');
const { findImageByID } = require('../../../lib/findImage');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const getNumberOfStars = require('../../../lib/getNumberOfStars');
const { getAvgPlaceRating } = require('../../../lib/getAvgPlaceRating');
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
            const numberOfStars = getAvgPlaceRating(id, reviews);

            const starImagesString = getNumberOfStars(numberOfStars);

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
    .then(places =>
      res.view('pages/homepage-refresh', {
        places,
        layout: 'layouts/layout-refresh',
      })
    )
    .catch(res.serverError);
};
