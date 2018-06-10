/**
 * PlacesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  places: (req, res) => {
    Place.find({}).exec((err, places) => {
      if (err) {
        return res.serverError(err);
      }

      return res.view("pages/places/places", { places });
    });
  },
  new: (req, res) => {
    return res.view("pages/places/new");
  },
  create: (req, res) => {
    const { placeName, city, state, address, phone, placeImageName, placeImageAlt, placeUrl, placeUrlDisplay } = req.body;

    Place.create({ placeName, city, state, address, phone, placeImageName, placeImageAlt, placeUrl, placeUrlDisplay }).exec(
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

        return res.redirect("/places");
      }
    );
  }
};

