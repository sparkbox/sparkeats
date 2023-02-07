import { useEffect, useReducer } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { NewReviewForm } from './NewReviewForm';
import { ReviewHeader } from './ReviewHeader';
import { Location } from '../../types/sparkeats';
import { useFirestore } from '../../firebase';
import { reducer } from '../../state';
import { useAuth } from '../../auth';
import firebase from '../../firebase';

type LocationState = {
  state: {
    location: Location;
  };
};

export function NewReviewPage() {
  const auth = useAuth();

  if (!auth.signedIn) {
    return <Navigate replace to="/" />;
  }

  const [{ location }, dispatch] = useReducer(reducer, {
    location: {},
  });

  const db = useFirestore();
  const { state: locationState }: LocationState = useLocation();

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() as string;
    const isNewLocation = locationState?.location;

    async function setLocation() {
      const location = isNewLocation
        ? locationState.location
        : await firebase.getDoc(db, 'locations', id);

      dispatch({
        type: 'set_location',
        data: location,
      });
    }

    setLocation();
  }, []);

  return (
    <main className="new-page">
      <div className="review-nav">
        <Link className="review-nav__link" to={'/'}>
          <span className="review-nav__svg"></span>
          Back to home
        </Link>
      </div>
      <ReviewHeader location={location} />
      <NewReviewForm location={location} />
    </main>
  );
}
