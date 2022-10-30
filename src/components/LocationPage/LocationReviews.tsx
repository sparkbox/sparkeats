import { Link } from 'react-router-dom';
import { Location, Review } from '../../types/sparkeats';

export function LocationReviews({
  location,
  reviews = [],
}: {
  location: Location;
  reviews: Review[];
}) {
  return (
    <div className="review-container">
      <Link
        className="button__full-width"
        to={'/reviews/new'}
        state={{ location }}
      >
        Add a review
      </Link>

      {reviews.map((review: Review) => (
        <article key={review.id} className="review-submission">
          <h3 className="review-submission__reviewer">{review.reviewerName}</h3>
          <div className="review-submission__date">
            {/* Created year/month/day*/}
          </div>
          <div
            className="location-card__star-rating"
            aria-label={`${review.starRating}`}
          >
            Stars
          </div>
          <h4 className="review-submission__title">Comments</h4>
          <p className="review-submission__review">{review.text}</p>
          {review.imageURL && (
            <div className="review-submission__image-container">
              <img
                className="review-submission__image"
                src={review.imageURL}
                alt={review.imageDescription}
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
