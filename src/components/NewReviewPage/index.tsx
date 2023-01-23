import { Link } from 'react-router-dom';
import { NewReviewForm } from './NewReviewForm';
import { ReviewHeader } from './ReviewHeader';

export function NewReviewPage() {
  return (
    <main className="new-page">
      <div className="review-nav">
        <Link className="review-nav__link" to={'/'}>
          <span className="review-nav__svg"></span>
          Back to home
        </Link>
      </div>
      <ReviewHeader />
      <NewReviewForm />
    </main>
  );
}
