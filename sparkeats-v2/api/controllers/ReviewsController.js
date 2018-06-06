/**
 * ReviewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: (req, res) => {
    return res.view('pages/reviews/new');
  },
  async reviews(req, res) {
    let reviews;
    let places;
    try {
      reviews = await Reviews.find({}).intercept(err => err);
      places = await Places.find({}).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/reviews', { reviews, places });
  },
  async create(req, res) {
    const {
      reviewerName,
      reviewText,
      reviewImageFileName,
      reviewImageAlt,
    } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);

    try {
      await Reviews.create({
        reviewerName,
        reviewText,
        reviewImageFileName,
        reviewImageAlt,
        numberOfStars,
      })
        .intercept('E_UNIQUE', err => err)
        .intercept('UsageError', err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.redirect('/reviews');
  },
};
