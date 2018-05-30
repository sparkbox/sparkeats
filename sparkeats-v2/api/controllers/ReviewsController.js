/**
 * ReviewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  reviews: (req, res) => {
    Reviews.find({}).exec((err, reviews) => {
      if (err) {
        return res.serverError(err);
      }

      return res.view("pages/reviews/reviews", { reviews });
    });
  },
  new: (req, res) => {
    return res.view("pages/reviews/new");
  },
  create: (req, res) => {
    const { reviewerName, reviewText, dateVisited, reviewImageFileName } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);

    Reviews.create({ reviewerName, reviewText, dateVisited, reviewImageFileName, numberOfStars }).exec(
      err => {
        if (err) {
          const { code, name } = err;

          if (code === 'E_UNIQUE') {
            return res.sendStatus(409);
          }

          if (name === 'UsageError') {
            return res.badRequest();
          }

          return res.serverError(err);
        }

        return res.redirect("/reviews");
      }
    );
  }
};
