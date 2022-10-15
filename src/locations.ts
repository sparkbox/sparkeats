import legacyPlaces from '../data/place.json';
import legacyReviews from '../data/review.json';
import legacyPlaceImages from '../data/placeImage.json';
import legacyReviewImages from '../data/reviewImage.json';

function transformReview({
  id,
  reviewerName,
  reviewText: text,
  numberOfStars: starRating,
  reviewImage: imageID,
  reviewImageAlt,
  placeId: placeID
}: LegacyReview): Review {
  return {
    id,
    reviewerName,
    text,
    imageURL: getReviewImageURL(imageID),
    imageDescription: reviewImageAlt,
    starRating,
    placeID,
  };
}

function getReviews(placeID: number) {
  return legacyReviews
    .filter((legacyReview) => legacyReview.placeId === placeID)
    .map(transformReview);
}

function getLocationImageURL(imageID: string) {
  return legacyPlaceImages
    .find((legacyPlaceImage) => legacyPlaceImage.id.toString() === imageID)?.fd ?? ''
}

function transformLocations(legacyPlaces: LegacyPlace[]): Locations {
  return legacyPlaces.map(({
    id,
    placeName: name,
    city,
    state: region,
    address,
    phone,
    placeURL: url,
    placeImage: imageID,
    placeImageAlt: imageDescription
  }) => {
    return {
      id,
      name,
      city,
      region,
      country: '', // TODO
      address,
      phone,
      url,
      imageURL: getLocationImageURL(imageID), 
      imageDescription,
      reviews: getReviews(id)
    };
  });
}

function getReviewImageURL(imageID: string) {
  return legacyReviewImages
    .find((legacyReviewImage) => legacyReviewImage.id.toString() === imageID)
    ?.fd ?? '';
}

const locations = transformLocations(legacyPlaces);

export {
  locations,
};
