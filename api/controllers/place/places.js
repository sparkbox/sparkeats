const Promise = require('bluebird');

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
            placeImage,
            placeImageAlt,
            placeURL,
            placeWebsiteDisplay,
          }) => {
            if (placeImage) {
              placeImage = await PlaceImage.findOne({
                id: placeImage,
              });
              placeImage = `data:image/jpeg;base64,${placeImage.file}`;
            }

            let avgNumberOfStars = sails.helpers.getAvgNumberOfStars(
              reviews,
              id
            );

            let numberOfReviews = sails.helpers.getNumberOfReviews(
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
