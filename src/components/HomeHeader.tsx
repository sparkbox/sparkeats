import { Link } from 'react-router-dom';
import SiteSubtitle from './SiteSubtitle';
import LocationMenu from './LocationMenu';

function HomeHeader() {
  return (
    <div className="home-header">
      <SiteSubtitle />

      <LocationMenu />

      <div className="home-header__button">
        <Link className="button__header-primary" to="/locations/new">
          Add a Location
        </Link>
      </div>
    </div>
  );
}

export default HomeHeader;
