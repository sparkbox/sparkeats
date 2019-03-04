const SkipperMySQLAdapter = require('../../../skipper-mysql/SkipperMySQLAdapter');
const { findImageByFD } = require('../../../lib/findImage');

module.exports = async function create(req, res) {
  const {
    placeName,
    city,
    state,
    address,
    phone,
    placeImageAlt,
    placeURL,
  } = req.body;

  req.file('placeImage').upload(
    {
      adapter: SkipperMySQLAdapter,
      model: PlaceImage,
    },
    async (error, files) => {
      if (error && error.raw.code === 'ER_NET_PACKET_TOO_LARGE') {
        return res.redirect('/places/new?error=image-too-big');
      }

      const placeImage = await findImageByFD(PlaceImage, files);

      return Place.create({
        placeName,
        city,
        state,
        address,
        phone,
        placeImage,
        placeImageAlt,
        placeURL,
      })
        .fetch()
        .then(place => res.redirect(`/places/${place.id}/reviews/new`))
        .catch(res.serverError);
    }
  );
};
