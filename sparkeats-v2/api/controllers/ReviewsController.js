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
    const { visitorName, experience, visitedAt, imageName } = req.body;
    const rating = parseInt(req.body.rating, 10);

    Reviews.create({ visitorName, experience, rating, visitedAt, imageName }).exec(
      err => {
        if (err) {
          res.send(500, { error: "Database Error" });
        }

        res.redirect("/");
      }
    );
  }
};
