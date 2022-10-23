import legacyPlaces from '../data/place.json';
import legacyReviews from '../data/review.json';
import legacyPlaceImages from '../data/placeImage.json';
import legacyReviewImages from '../data/reviewImage.json';

function getImageURL(imageID: string, legacyImages: LegacyImage[]) {
  return (
    legacyImages.find((image) => image.id.toString() === imageID)?.fd ?? ''
  );
}

function transformReview({
  id,
  reviewerName,
  reviewText: text,
  numberOfStars: starRating,
  reviewImage: imageID,
  reviewImageAlt,
  placeId: placeID,
}: LegacyReview): Review {
  return {
    id,
    reviewerName,
    text,
    imageURL: getImageURL(imageID, legacyReviewImages),
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

function transformLocations(legacyPlaces: LegacyPlace[]): Locations {
  return legacyPlaces.map(
    ({
      id,
      placeName: name,
      city,
      state: region,
      address,
      phone,
      placeURL: url,
      placeImage: imageID,
      placeImageAlt: imageDescription,
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
        imageURL: getImageURL(imageID, legacyPlaceImages),
        imageDescription,
        reviews: getReviews(id),
      };
    }
  );
}

const locations = transformLocations(legacyPlaces);

export { locations };
