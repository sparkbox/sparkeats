import type { Review } from '../types/sparkeats';
import { v4 as uuidv4 } from 'uuid';

const getFullStars = (starCount: number) => {
  return Array.from({ length: starCount }, () => (
    <svg
      className="full-star"
      key={uuidv4()}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
        fill="#F7C952"
      />
    </svg>
  ));
};

const getEmptyStars = (starCount: number) => {
  return Array.from({ length: starCount }, () => (
    <svg
      className="empty-star"
      key={uuidv4()}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.61804L11.7696 7.06434L11.8819 7.40983H12.2451H17.9717L13.3388 10.7758L13.0449 10.9894L13.1572 11.3348L14.9268 16.7812L10.2939 13.4152L10 13.2016L9.70611 13.4152L5.0732 16.7812L6.84282 11.3348L6.95507 10.9894L6.66118 10.7758L2.02828 7.40983H7.75486H8.11813L8.23039 7.06434L10 1.61804Z"
        stroke="#F7C952"
      />
    </svg>
  ));
};

const getStars = (rating: number) => {
  if (rating === 0) {
    return getEmptyStars(5);
  }

  const fullStarCount = rating;
  const emptyStarCount = 5 - rating;
  const fullStars = getFullStars(fullStarCount);
  const emptyStars = getEmptyStars(emptyStarCount);

  return fullStars.concat(emptyStars);
};

const getLocationRating = (reviews: Review[]) => {
  const ratingsTotal = reviews.reduce(
    (total, { starRating }) => total + starRating,
    0
  );
  const averageRating = ratingsTotal / reviews.length;

  return Math.round(averageRating);
};

const getLocationStars = (reviews: Review[]) => {
  return reviews?.length
    ? getStars(getLocationRating(reviews))
    : getEmptyStars(5);
};

export function ReviewStars(rating: number) {
  return <>{getStars(rating)}</>;
}

export function LocationStars({ reviews }: { reviews: Review[] }) {
  return <>{getLocationStars(reviews)}</>;
}
