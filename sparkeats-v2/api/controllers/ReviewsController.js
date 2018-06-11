/**
 * ReviewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async new(req, res) {
    const id = req.param('id');
    let place;

    try {
      place = await Place.findOne({ id }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/new', { place });
  },
  async reviews(req, res) {
    let reviews;
    let places;
    try {
      reviews = await Review.find({}).intercept(err => err);
      places = await Place.find({}).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/reviews', {
      reviews,
      places,
    });
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
    } catch (err) {
      return res.serverError(err);
    }

    return res.redirect('/reviews');
  },
};
