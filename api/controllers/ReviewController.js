/**
 * ReviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async new(req, res) {
    const id = req.param('id');
    let place;

    try {
      place = await Place.findOne({
        where: { id },
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    const dataForView = {
      id: place.id,
      name: place.placeName,
      placeImage: place.placeImage,
      placeImageAlt: place.placeImageAlt,
      city: place.city,
      state: place.state,
    };

    return res.view('pages/reviews/new', { dataForView });
  },
  async reviews(req, res) {
    const id = req.param('id');
    let reviews;
    let place;
    try {
      reviews = await Review.find({
        where: { placeId: id },
      }).intercept(err => err);
      place = await Place.findOne({
        where: { id },
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    let { stars, rating } = sails.helpers.getAvgNumberOfStars(
      reviews,
      place.id
    );

    const dataForView = {
      id: place.id,
      name: place.placeName,
      placeImage: place.placeImage,
      placeURL: place.placeURL,
      placeImageAlt: place.placeImageAlt,
      phone: place.phone,
      address: place.address,
      city: place.city,
      state: place.state,
      numberOfStars: stars,
      rating,
      numberOfReviews: sails.helpers.getNumberOfReviews(reviews, place.id),
      reviews: reviews.map(
        ({
          reviewerName,
          reviewText,
          reviewImageFileName,
          reviewImageAlt,
          numberOfStars,
          placeId,
        }) => {
          const { stars, rating } = sails.helpers.getNumberOfStars(numberOfStars);
          return {
            reviewerName,
            reviewText,
            reviewImageFileName,
            reviewImageAlt,
            placeId,
            numberOfStars: stars,
            rating
          };
        }
      ),
    };

    return res.view('pages/reviews/reviews', { place: dataForView });
  },
  async create(req, res) {
    const {
      reviewerName,
      reviewText,
      reviewImageFileName,
      reviewImageAlt,
      placeId,
    } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);
    let place;

    try {
      await Review.create({
        reviewerName,
        reviewText,
        reviewImageFileName,
        reviewImageAlt,
        numberOfStars,
        placeId,
      })
        .intercept('E_UNIQUE', err => err)
        .intercept('UsageError', err => err);

      place = await Place.findOne({
        where: { id: placeId },
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.redirect(`/places/${place.id}`);
  },
};
