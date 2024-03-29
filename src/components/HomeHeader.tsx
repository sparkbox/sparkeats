import { Link } from 'react-router-dom';
import SiteSubtitle from './SiteSubtitle';
import LocationMenu from './LocationMenu';
import type { Location } from '../types/sparkeats';
import { useAuth } from '../auth';

function HomeHeader({
  currentCity,
  locations,
  dispatch,
}: {
  currentCity: string;
  locations: Location[];
  dispatch: React.Dispatch<{
    type: string;
    data: any;
  }>;
}) {
  const auth = useAuth();

  return (
    <div className="home-header">
      <SiteSubtitle />

      <LocationMenu
        currentCity={currentCity}
        locations={locations}
        dispatch={dispatch}
      />

      {auth.signedIn && (
        <div className="home-header__button">
          <Link className="button__header-primary" to="/locations/new">
            Add a Location
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomeHeader;
