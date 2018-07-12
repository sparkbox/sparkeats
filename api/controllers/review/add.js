module.exports = async function add(req, res) {
  const id = req.param('id');
  let placeImage = '';

  Place.findOne({ id })
    .then(async place => {
      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        });

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      }

      return res.view('pages/reviews/new', { place, placeImage });
    })
    .catch(res.serverError);
};
