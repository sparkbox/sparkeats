import { Link } from 'react-router-dom';
import { NewLocationForm } from './NewLocationForm';

export function NewLocationPage() {
  return (
    <main className="new-page">
      <div className="review-nav">
        <Link className="review-nav__link" to={'/'}>
          <span className="review-nav__svg"></span>
          Back to home
        </Link>
      </div>
      <NewLocationForm />
    </main>
  );
}
