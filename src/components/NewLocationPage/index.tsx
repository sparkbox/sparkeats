import { Link, useNavigate } from 'react-router-dom';

import { NewLocationForm } from './NewLocationForm';
import { useAuth } from '../../auth';
import { useEffect } from 'react';

export function NewLocationPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.signedIn) {
      navigate('/');
    }
  });

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
