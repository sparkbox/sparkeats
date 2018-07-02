module.exports = async function reviews(req, res) {
  const id = req.param('id');
  let reviews;
  let place;
  let placeImage;
  let reviewImage;
  let dataForView;
  let avgNumberOfStars;
  let numberOfReviews;

  try {
    reviews = await Review.find({
      placeId: id,
    }).intercept(err => err);

    place = await Place.findOne({
      id,
    }).intercept(err => err);

    avgNumberOfStars = await sails.helpers.getAvgNumberOfStars(reviews, place);

    numberOfReviews = await sails.helpers.getNumberOfReviews(reviews, place);

    if (place.placeImage) {
      placeImage = await PlaceImage.findOne({
        id: place.placeImage,
      }).intercept(err => err);

      placeImage = `data:image/jpeg;base64,${placeImage.file}`;
    }

    reviews = reviews.map(async review => {
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
  } catch (err) {
    return res.serverError(err);
  }

  Promise.all(reviews).then(reviews => {
    dataForView = {
      place,
      placeImage,
      avgNumberOfStars,
      numberOfReviews,
      reviews,
    };

    return res.view('pages/reviews/reviews', { dataForView });
  });
};
