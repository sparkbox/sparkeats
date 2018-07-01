/**
 * ReviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async new(req, res) {
    const id = req.param('id');
    let place;
    let placeImage;

    try {
      place = await Place.findOne({ id }).intercept(err => err);

      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        }).intercept(err => err);

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      }
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/new', { place, placeImage });
  },
};
