const SkipperMySQLAdapter = require('../../../skipper-mysql/SkipperMySQLAdapter');

module.exports = async function create(req, res) {
  const {
    placeName,
    city,
    state,
    address,
    phone,
    placeImageAlt,
    placeUrl,
    placeWebsiteDisplay,
  } = req.body;

  req.file('placeImage').upload(
    {
      adapter: SkipperMySQLAdapter,
      model: PlaceImage,
    },
    async (err, files) => {
      if (err) return res.serverError(err);

      let placeImage = '';

      if (files.length) {
        placeImage = await PlaceImage.findOne({
          fd: files[0].fd,
        });

        placeImage = placeImage.id;
      }

      return Place.create({
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
        .fetch()
        .then(place => {
          return res.redirect(`/places/${place.id}/reviews/new`);
        })
        .catch(res.serverError);
    }
  );
};
