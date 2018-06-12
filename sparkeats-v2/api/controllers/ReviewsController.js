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

    return res.view('pages/reviews/reviews', {
      reviews,
      place,
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
