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
          reviewImage,
          reviewImageAlt,
          numberOfStars,
          placeId,
        }) => {
          if (reviewImage) {
            reviewImage = await ReviewImage.findOne({
              id: reviewImage,
            });

            reviewImage = `data:image/jpeg;base64,${reviewImage.file}`;
          }
          return {
            reviewerName,
            reviewText,
            reviewImage,
            reviewImageAlt,
            placeId,
            numberOfStars: sails.helpers.getNumberOfStars(numberOfStars),
            rating: numberOfStars,
          };
        })
      );
    })
    .then(async reviews => {
      let place = await Place.findOne({
        id,
      });

      let avgNumberOfStars = sails.helpers.getAvgNumberOfStars(
        reviews,
        place.id
      );

      let numberOfReviews = sails.helpers.getNumberOfReviews(reviews, place.id);

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
