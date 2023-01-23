import { NewReviewForm } from './NewReviewForm';
import { ReviewHeader } from './ReviewHeader';

export function NewReviewPage() {
  return (
    <main className="review-page">
      <ReviewHeader />
      <NewReviewForm />
    </main>
  );
}
