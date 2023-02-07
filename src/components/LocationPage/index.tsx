import { useEffect, useReducer } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { LocationHeader } from './LocationHeader';
import { LocationDetails } from './LocationDetails';
import { LocationReviews } from './LocationReviews';
import { Location } from '../../types/sparkeats';
import { reducer } from '../../state';
import firebase, { useFirestore } from '../../firebase';
import { Loading, useLoading } from '../Loading';

type LocationState = {
  state: {
    location: Location;
  };
};

export function LocationPage() {
  const [{ location }, dispatch] = useReducer(reducer, { location: {} });
  const db = useFirestore();
  const { state: locationState }: LocationState = useLocation();
  const [isLoading, setLoading] = useLoading(true);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() as string;
    const isNewLocation = locationState?.location;

    async function setLocation() {
      const location = isNewLocation
        ? locationState.location
        : await firebase.getDoc(db, 'locations', id);

      setLoading(false);

      dispatch({
        type: 'set_location',
        data: location,
      });
    }

    setLocation();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!location) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="review-page">
      <div className="review-nav">
        <Link className="review-nav__link" to={'/'}>
          <span className="review-nav__svg"></span>
          Back to home
        </Link>
      </div>
      <LocationHeader location={location} />
      <LocationReviews location={location} reviews={location.reviews} />
      <LocationDetails location={location} />
    </main>
  );
}
