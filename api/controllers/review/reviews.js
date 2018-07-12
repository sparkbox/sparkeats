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
            numberOfStars: await sails.helpers.getNumberOfStars(numberOfStars),
          };
        })
      );
    })
    .then(async reviews => {
      let place = await Place.findOne({
        id,
      });

      let avgNumberOfStars = await sails.helpers.getAvgNumberOfStars(
        reviews,
        place
      );

      let numberOfReviews = await sails.helpers.getNumberOfReviews(reviews, place);

      let placeImage = '';

      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        });

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      }

      Promise.all(reviews).then(reviews => {
        let dataForView = {
          place,
          placeImage,
          avgNumberOfStars,
          numberOfReviews,
          reviews,
        };

        return res.view('pages/reviews/reviews', { dataForView });
      });
    })
    .catch(res.serverError);
};
