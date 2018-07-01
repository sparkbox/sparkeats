module.exports = async function places(req, res) {
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
      avgNumberOfStars: await sails.helpers.getAvgNumberOfStars(reviews, place),
      numberOfReviews: await sails.helpers.getNumberOfReviews(reviews, place),
    };
  });

  Promise.all(dataForView).then(dataForView => {
    return res.view('pages/homepage', { dataForView });
  });
};
