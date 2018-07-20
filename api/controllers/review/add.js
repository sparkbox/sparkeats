const { findImageByID } = require('../../../lib/findImage');

module.exports = async function add(req, res) {
  const id = req.param('id');

  Place.findOne({ id })
    .then(async place => {
      const placeImage = await findImageByID(PlaceImage, place.placeImage);
      return res.view('pages/reviews/new', { place, placeImage });
    })
    .catch(res.serverError);
};
