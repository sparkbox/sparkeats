module.exports = async function reviews(req, res) {
  const id = req.param('id');

  try {
    let reviews = await Review.find({
      placeId: id,
    }).intercept(err => err);

    let place = await Place.findOne({
      id,
    }).intercept(err => err);

    let avgNumberOfStars = await sails.helpers.getAvgNumberOfStars(
      reviews,
      place
    );

    let numberOfReviews = await sails.helpers.getNumberOfReviews(
      reviews,
      place
    );

    let placeImage = '';

    if (place.placeImage) {
      placeImage = await PlaceImage.findOne({
        id: place.placeImage,
      }).intercept(err => err);

      placeImage = `data:image/jpeg;base64,${placeImage.file}`;
    }

    reviews = reviews.map(async review => {
      let reviewImage = '';

      if (review.reviewImage) {
        reviewImage = await ReviewImage.findOne({
          id: review.reviewImage,
        }).intercept(err => err);

        reviewImage = `data:image/jpeg;base64,${reviewImage.file}`;
      }

      return {
        reviewerName: review.reviewerName,
        reviewText: review.reviewText,
        reviewImage,
        reviewImageAlt: review.reviewImageAlt,
        placeId: review.placeId,
        numberOfStars: await sails.helpers.getNumberOfStars(
          review.numberOfStars
        ),
      };
    });

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
  } catch (err) {
    return res.serverError(err);
  }
};
