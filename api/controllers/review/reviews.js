const { findImageByID } = require('../../../lib/findImage');
const getNumberOfStars = require('../../../lib/getNumberOfStars');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const getAvgNumberOfStars = require('../../../lib/getAvgNumberOfStars');

module.exports = async function reviews(req, res) {
  const id = req.param('id');

  Promise.all(
    await Review.find({
      placeId: id,
    })
  )
    .then(reviews => {
      return Promise.all(
        reviews.map(async ({
          reviewerName,
          reviewText,
          reviewImage: reviewImageName,
          reviewImageAlt,
          numberOfStars,
          placeId,
        }) => {
          let reviewImage = await findImageByID(ReviewImage, reviewImageName);

          return {
            reviewerName,
            reviewText,
            reviewImage,
            reviewImageAlt,
            placeId,
            numberOfStars: getNumberOfStars(numberOfStars),
            rating: numberOfStars,
          };
        })
      );
    })
    .then(async reviews => {
      let place = await Place.findOne({
        id,
      });

      let avgNumberOfStars = getAvgNumberOfStars(
        reviews,
        place.id
      );

      let numberOfReviews = getNumberOfReviews(reviews, place.id);

      let placeImage = '';

      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        });

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      }
      Promise.all(reviews).then(reviews => {
        return res.view('pages/reviews/reviews', { place, placeImage, avgNumberOfStars, numberOfReviews, reviews });
      });
    })
    .catch(res.serverError);
};
