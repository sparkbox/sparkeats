const { findImageByID } = require('../../../lib/findImage');
const getNumberOfStars = require('../../../lib/getNumberOfStars');
const getNumberOfReviews = require('../../../lib/getNumberOfReviews');
const { getAvgPlaceRating } = require('../../../lib/getAvgPlaceRating');
const ratingToString = require('../../../lib/ratingToString');

module.exports = async function getReviews(req, res) {
  const id = req.param('id');

  Promise.all(
    await Review.find({
      placeId: id,
    })
  )
    .then(reviews =>
      Promise.all(
        reviews.map(
          async ({
            reviewerName,
            reviewText,
            reviewImage: reviewImageName,
            reviewImageAlt,
            numberOfStars,
            placeId,
          }) => {
            const reviewImage = await findImageByID(
              ReviewImage,
              reviewImageName
            );
            const stars = getNumberOfStars(numberOfStars);
            const rating = ratingToString(numberOfStars);

            return {
              reviewerName,
              reviewText,
              reviewImage,
              reviewImageAlt,
              placeId,
              numberOfStars,
              stars,
              rating,
            };
          }
        )
      )
    )
    .then(async reviews => {
      const place = await Place.findOne({
        id,
      });

      const numberOfStars = getAvgPlaceRating(place.id, reviews);
      const starImagesString = getNumberOfStars(numberOfStars);
      const rating = ratingToString(numberOfStars);

      const numberOfReviews = getNumberOfReviews(reviews, place.id);

      let placeImage = '';

      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        });

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      }

      res.view('pages/reviews/reviews', {
        place,
        placeImage,
        numberOfStars,
        stars: starImagesString,
        rating,
        numberOfReviews,
        reviews,
      });
    })
    .catch(res.serverError);
};
