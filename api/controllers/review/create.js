const SkipperMySQLAdapter = require('../../../skipper-mysql/SkipperMySQLAdapter');

module.exports = async function create(req, res) {
  const placeId = req.param('id');
  const { reviewerName, reviewText, reviewImageAlt } = req.body;
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

      return res.redirect(`/places/${placeId}`);
    }
  );
};
