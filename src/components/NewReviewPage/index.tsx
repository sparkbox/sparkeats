import { useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocations } from '../../locations';
import { NewReviewForm } from './NewReviewForm';
import { ReviewHeader } from './ReviewHeader';
import { Location } from '../../types/sparkeats';
import { usePersistence, read } from '../../persistence';
import { reducer } from '../../state';

type LocationState = {
  state: {
    location: Location;
  };
};

export function NewReviewPage() {
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
