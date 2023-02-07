import { Link, Navigate } from 'react-router-dom';

import { NewLocationForm } from './NewLocationForm';
import { useAuth } from '../../auth';

export function NewLocationPage() {
  const auth = useAuth();

  if (!auth.signedIn) {
    return <Navigate replace to="/" />;
  }

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
