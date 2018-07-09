module.exports = async function places(req, res) {
  try {
    let placeImage;
    let places = await Place.find({}).intercept(err => err);
    let reviews = await Review.find({
      select: ['numberOfStars', 'placeId'],
    }).intercept(err => err);

    let dataForView = places.map(async place => {
      if (place.placeImage) {
        placeImage = await PlaceImage.findOne({
          id: place.placeImage,
        }).intercept(err => err);

        placeImage = `data:image/jpeg;base64,${placeImage.file}`;
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
  } catch (err) {
    return res.serverError(err);
  }
};
