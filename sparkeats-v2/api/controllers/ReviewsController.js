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
        res.send(500, { error: "Database Error" });
      }
      res.view("pages/homepage", { reviews });
    });
  },
  new: (req, res) => {
    res.view("pages/reviews/new");
  },
  create: (req, res) => {
    const { reviewerName, reviewText, dateVisited, reviewImageFileName } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);

    Reviews.create({ reviewerName, reviewText, dateVisited, reviewImageFileName, numberOfStars }).exec(
      err => {
        if (err) {
          res.send(500, { error: "Database Error" });
        }

        res.redirect("/");
      }
    );
  }
};
