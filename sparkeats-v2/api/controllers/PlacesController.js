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

      return res.view('pages/places/places', {
        places,
      });
    });
  },
  new: (req, res) => {
    return res.view('pages/places/new');
  },
  async create(req, res) {
    const {
      placeName,
      city,
      state,
      address,
      phone,
      placeImage,
      placeImageAlt,
      placeUrl,
      placeWebsiteDisplay,
    } = req.body;

    let place;
    try {
      place = await Place.create({
        placeName,
        city,
        state,
        address,
        phone,
        placeImage,
        placeImageAlt,
        placeUrl,
        placeWebsiteDisplay,
      })
        .intercept('E_UNIQUE', err => err)
        .intercept('UsageError', err => err)
        .fetch();
    } catch (err) {
      return res.serverError(err);
    }

    res.redirect(`/places/${place.id}/review`);
  },
};
