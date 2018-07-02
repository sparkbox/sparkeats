const SkipperMySQLAdapter = require('../../../skipper-mysql/SkipperMySQLAdapter');

module.exports = async function create(req, res) {
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
  let file;

  await req.file('placeImage').upload(
    {
      adapter: SkipperMySQLAdapter,
      model: PlaceImage,
    },
    async (err, files) => {
      if (err) return res.serverError(err);
      file = await PlaceImage.findOne({
        fd: files[0].fd,
      }).intercept(err => err);

      try {
        place = await Place.create({
          placeName,
          city,
          state,
          address,
          phone,
          placeImage: file.id,
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

      return res.redirect(`/places/${place.id}/reviews/new`);
    }
  );
};
