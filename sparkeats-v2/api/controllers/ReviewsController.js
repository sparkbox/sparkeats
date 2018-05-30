/**
 * ReviewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Reviews.find({}).exec((err, reviews) => {
      if (err) {
        return res.send(500, { error: "Database Error" });
      }
      return res.view("pages/homepage", { reviews });
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
          return res.send(500, { error: "Database Error" });
        }

        return res.redirect("/");
      }
    );
  }
};
