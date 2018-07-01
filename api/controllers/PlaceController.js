const SkipperMySQLAdapter = require('../../skipper-mysql/SkipperMySQLAdapter');

/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: (req, res) => res.view('pages/places/new'),
  async places(req, res) {
    let places;
    let reviews;
    let placeImage;
    let dataForView;

    try {
      places = await Place.find({}).intercept(err => err);
      reviews = await Review.find({
        select: ['numberOfStars', 'placeId'],
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    dataForView = places.map(async place => {
      // get placeImage file if placeImage is an id
      if (/^\d+$/.test(place.placeImage)) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        }).intercept(err => err);
        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      } else {
        placeImage = `../../images/places/${place.placeImage}`;
      }

      return {
        id: place.id,
        name: place.placeName,
        address: `${place.city}, ${place.state}`,
        phone: place.phone,
        placeImage,
        placeImageAlt: place.placeImageAlt,
        placeURL: place.placeURL,
        placeWebsiteDisplay: place.placeWebsiteDisplay,
        avgNumberOfStars: await sails.helpers.getAvgNumberOfStars(
          reviews,
          place
        ),
        numberOfReviews: await sails.helpers.getNumberOfReviews(reviews, place),
      };
    });

    Promise.all(dataForView).then(dataForView => {
      return res.view('pages/homepage', { dataForView });
    });
  },
  async create(req, res) {
    const {
      placeName,
      city,
      state,
      phone,
      address,
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

        return res.redirect(`/places/${place.id}/review`);
      }
    );
  },
};
