import { Link, useLocation } from 'react-router-dom';
import { useLocations } from '../../useLocations';
import { NewReviewForm } from './NewReviewForm';
import { ReviewHeader } from './ReviewHeader';
import { Location } from '../../types/sparkeats';

function loadLocation(id: string): Location {
  const locations = useLocations();
  const location = locations[id];

  return location;
}

type LocationState = {
  state: {
    location: Location;
  };
};

export function NewReviewPage() {
  const { state: locationState }: LocationState = useLocation();
  const isNewLocation = locationState?.location;
  const location = isNewLocation
    ? locationState.location
    : loadLocation(window.location.pathname.split('/').pop() as string);

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
