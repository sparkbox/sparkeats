import { Link, useLocation } from 'react-router-dom';
import { LocationHeader } from './LocationHeader';
import { LocationDetails } from './LocationDetails';
import { LocationReviews } from './LocationReviews';
import { useLocations } from '../../useLocations';
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

export function LocationPage() {
  const { state: locationState }: LocationState = useLocation();
  const isNewLocation = locationState?.location;
  const location = isNewLocation
    ? locationState.location
    : loadLocation(window.location.pathname.split('/').pop() as string);

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
