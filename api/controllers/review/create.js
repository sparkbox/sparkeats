const SkipperMySQLAdapter = require('../../../skipper-mysql/SkipperMySQLAdapter');

module.exports = async function create(req, res) {
  const placeId = req.param('id');
  const { reviewerName, reviewText, reviewImageAlt } = req.body;
  const numberOfStars = parseInt(req.body.numberOfStars, 10);

  req.file('reviewImage').upload(
    {
      adapter: SkipperMySQLAdapter,
      model: ReviewImage,
    },
    async (err, files) => {
      if (err) return res.serverError(err);

      let reviewImage = '';

      if (files.length) {
        reviewImage = await ReviewImage.findOne({
          fd: files[0].fd,
        });

        reviewImage = reviewImage.id;
      }

      return Review.create({
        reviewerName,
        reviewText,
        reviewImage,
        reviewImageAlt,
        numberOfStars,
        placeId,
      })
        .then(() => res.redirect(`/places/${placeId}`))
        .catch(res.serverError);
    }
  );
};
