import { useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LocationHeader } from './LocationHeader';
import { LocationDetails } from './LocationDetails';
import { LocationReviews } from './LocationReviews';
import { Location } from '../../types/sparkeats';
import { read, usePersistence } from '../../persistence';
import { reducer } from '../../state';

type LocationState = {
  state: {
    location: Location;
  };
};

export function LocationPage() {
  const [{ location }, dispatch] = useReducer(reducer, {
    location: {},
  });
  const db = usePersistence();
  const { state: locationState }: LocationState = useLocation();

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() as string;
    const isNewLocation = locationState?.location;

    async function setLocation() {
      const location = isNewLocation
        ? locationState.location
        : await read({
            db,
            collection: 'locations',
            id,
          });

      dispatch({
        type: 'set_location',
        data: location,
      });
    }

    setLocation();
  }, []);

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
