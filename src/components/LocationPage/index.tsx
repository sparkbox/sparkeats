import { Link } from 'react-router-dom';
import { LocationHeader } from './LocationHeader';
import { LocationDetails } from './LocationDetails';
import { LocationReviews } from './LocationReviews';
import { useLocations } from '../../useLocations';

export function LocationPage() {
  const id = window.location.pathname.split('/').pop() as string;
  const locations = useLocations();
  const location = locations[id];

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
