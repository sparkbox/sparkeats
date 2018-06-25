const SkipperMySQLAdapter = require('../../skipper-mysql/SkipperMySQLAdapter');

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

      // get placeImage file if placeImage is an id
      if (/^\d+$/.test(place.placeImage)) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        }).intercept(err => err);

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      } else {
        placeImage = `../../images/places/${place.placeImage}`;
      }
    } catch (err) {
      return res.serverError(err);
    }

    return res.view('pages/reviews/new', { place, placeImage });
  },
  async reviews(req, res) {
    const id = req.param('id');
    let reviews;
    let place;
    let placeImage;
    let reviewImage;
    let dataForView;

    try {
      reviews = await Review.find({
        placeId: id,
      }).intercept(err => err);

      place = await Place.findOne({
        id,
      }).intercept(err => err);

      // get placeImage file if placeImage is an id
      if (/^\d+$/.test(place.placeImage)) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        }).intercept(err => err);

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
      } else {
        placeImage = `../../images/places/${place.placeImage}`;
      }

      reviews = reviews.map(async review => {
        // get reviewImage file if reviewImage is an id
        if (/^\d+$/.test(review.reviewImage)) {
          reviewImage = await ReviewImage.findOne({
            id: review.reviewImage,
          }).intercept(err => err);

          reviewImage = `data:image/jpeg;base64,${reviewImage.file}`;
        } else {
          reviewImage = `../../images/reviews/${review.reviewImage}`;
        }

        return {
          reviewerName: review.reviewerName,
          reviewText: review.reviewText,
          reviewImage,
          reviewImageAlt: review.reviewImageAlt,
          placeId: review.placeId,
          numberOfStars: sails.helpers.getNumberOfStars(review.numberOfStars),
        };
      });
    } catch (err) {
      return res.serverError(err);
    }
    Promise.all(reviews).then(reviews => {
      dataForView = {
        place,
        placeImage,
        avgNumberOfStars: sails.helpers.getAvgNumberOfStars(reviews, place),
        numberOfReviews: sails.helpers.getNumberOfReviews(reviews, place),
        reviews,
      };

      return res.view('pages/reviews/reviews', { dataForView });
    });
  },
  async create(req, res) {
    const { reviewerName, reviewText, reviewImageAlt, placeId } = req.body;
    const numberOfStars = parseInt(req.body.numberOfStars, 10);
    let reviewImage;

    await req.file('reviewImage').upload(
      {
        adapter: SkipperMySQLAdapter,
        model: ReviewImage,
      },
      async (err, files) => {
        if (err) return res.serverError(err);
        reviewImage = await ReviewImage.findOne({
          fd: files[0].fd,
        }).intercept(err => err);

        try {
          await Review.create({
            reviewerName,
            reviewText,
            reviewImage: reviewImage.id,
            reviewImageAlt,
            numberOfStars,
            placeId,
          })
            .intercept('E_UNIQUE', err => err)
            .intercept('UsageError', err => err);
        } catch (err) {
          return res.serverError(err);
        }
      }
    );

    return res.redirect(`/places/${placeId}`);
  },
};
