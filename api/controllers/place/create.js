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

      try {
        let placeImage = '';

        if (files.length) {
          placeImage = await PlaceImage.findOne({
            fd: files[0].fd,
          }).intercept(err => err);

          placeImage = placeImage.id;
        }

        let place = await Place.create({
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

        return res.redirect(`/places/${place.id}/reviews/new`);
      } catch (err) {
        return res.serverError(err);
      }
    }
  );
};
