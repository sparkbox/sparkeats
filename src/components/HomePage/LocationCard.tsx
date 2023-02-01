import { Link } from 'react-router-dom';
import { getLocationURL } from '../../locations';
import type { Location } from '../../types/sparkeats';
import { LocationStars } from '../StarRatings';

const LocationCardImage = ({ location }: { location: Location }) => {
  return (
    <header className="location-card__header">
      <Link
        to={getLocationURL(location.id)}
        aria-label={`review page for ${location.name}`}
      >
        <img
          className="location-card__image"
          src={location.imageURL}
          alt={location.imageDescription}
        />
      </Link>
    </header>
  );
};

const LocationHeading = ({ location }: { location: Location }) => {
  return (
    <div className="location-card__heading">
      <h3 className="location-card__name">
        <Link
          className="location-card__name-link"
          to={getLocationURL(location.id)}
        >
          {location.name}
        </Link>
      </h3>
      <p className="location-card__city">
        {location.city}, <abbr>{location.region}</abbr>
      </p>
    </div>
  );
};

const LocationAddress = ({ location }: { location: Location }) => {
  return (
    <address className="review-details__address">
      <p>{location.address}</p>
      {location.phone && (
        <p>
          <a className="review-details__phone" href={`tel:${location.phone}`}>
            {location.phone}
          </a>
        </p>
      )}
      {location.url && (
        <p>
          <a className="location-card__url" href={location.url}>
            Visit Site
          </a>
        </p>
      )}
    </address>
  );
};

const LocationLink = ({ location }: { location: Location }) => {
  return (
    <a className="button__primary" href={getLocationURL(location.id)}>
      {location.reviews.length === 1
        ? `${location.reviews.length} Review`
        : `${location.reviews.length} Reviews`}
    </a>
  );
};

export function LocationCard({ location }: { location: Location }) {
  return (
    <li className="location-card__list-item">
      <section className="location-card">
        <LocationCardImage location={location} />
        <LocationHeading location={location} />
        <div className="location-card__info">
          <LocationAddress location={location} />
          {location.reviews.length && (
            <div className="location-card__star-rating" aria-label="">
              <LocationStars reviews={location.reviews} />
            </div>
          )}
        </div>
        <LocationLink location={location} />
      </section>
    </li>
  );
}
