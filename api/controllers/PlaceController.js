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

    try {
      places = await Place.find({}).intercept(err => err);
      reviews = await Review.find({
        select: ['numberOfStars', 'placeId'],
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    const dataForView = places.map(place => {
      const {
        id,
        placeName: name,
        city,
        state,
        phone,
        address,
        placeImage,
        placeImageAlt,
        placeURL,
        placeWebsiteDisplay,
      } = place;

      let { stars, rating } = sails.helpers.getAvgNumberOfStars(
        reviews,
        place.id
      );

      return {
        id,
        name,
        city,
        state,
        phone,
        address,
        placeImage,
        placeImageAlt,
        placeURL,
        placeWebsiteDisplay,
        numberOfStars: stars,
        rating,
        numberOfReviews: sails.helpers.getNumberOfReviews(reviews, place.id),
      };
    });

    return res.view('pages/homepage', { dataForView });
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
      placeURL,
      placeWebsiteDisplay,
    } = req.body;

    let place;
    try {
      place = await Place.create({
        placeName,
        city,
        state,
        phone,
        address,
        placeImage,
        placeImageAlt,
        placeURL,
        placeWebsiteDisplay,
      })
        .intercept('E_UNIQUE', err => err)
        .intercept('UsageError', err => err)
        .fetch();
    } catch (err) {
      return res.serverError(err);
    }

    return res.redirect(`/places/${place.id}/review`);
  },
};
