/**
 * ReviewsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async new(req, res) {
    const id = req.param('id');
    let place;

    try {
      place = await Place.findOne({ id }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/new', { place });
  },
  async reviews(req, res) {
    const id = req.param('id');
    let reviews;
    let place;
    try {
      reviews = await Review.find({
        where: { placeId: id },
      }).intercept(err => err);
      place = await Place.findOne({
        where: { id },
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    const getNumberOfStars = (ratings, currentPlace) => {
      let stars = ratings.filter(rating => rating.placeId === currentPlace.id);
      stars = Math.round(
        stars.map(item => item.numberOfStars).reduce((a, b) => a + b, 0) /
          stars.length
      );
      const filledStar =
        '<img class="place-card__star" src="../design/sparkeats_star.svg" alt="review star">';
      const emptyStar =
        '<img class="place-card__star" src="../design/sparkeats_star_empty.svg" alt="review star">';
      let result = '';
      for (let i = 0; i < stars; i += 1) {
        result += filledStar;
      }
      if (5 - stars !== 0) {
        for (let i = 0; i < 5 - stars; i += 1) {
          result += emptyStar;
        }
      }
      return result;
    };

    const getNumberOfReviews = (ratings, currentPlace) => {
      const n = ratings.filter(rating => rating.placeId === currentPlace.id)
        .length;
      return `${n} ${n === 1 ? 'Review' : 'Reviews'}`;
    };

    const dataForView = {
      reviews,
      name: place.placeName,
      placeImage: place.placeImage,
      placeImageAlt: place.placeImageAlt,
      phone: place.phone,
      address: `${place.city}, ${place.state}`,
      numberOfStars: getNumberOfStars(reviews, place),
      numberOfReviews: getNumberOfReviews(reviews, place),
    };

    return res.view('pages/reviews/reviews', { dataForView });
  },
  async create(req, res) {
    const {
      reviewerName,
      reviewText,
      reviewImageFileName,
      reviewImageAlt,
      placeId,
    } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);
    let place;

    try {
      await Review.create({
        reviewerName,
        reviewText,
        reviewImageFileName,
        reviewImageAlt,
        numberOfStars,
        placeId,
      })
        .intercept('E_UNIQUE', err => err)
        .intercept('UsageError', err => err);

      place = await Place.findOne({
        where: { id: placeId },
      }).intercept(err => err);
    } catch (err) {
      return res.serverError(err);
    }

    return res.redirect(`/places/${place.id}`);
  },
};
