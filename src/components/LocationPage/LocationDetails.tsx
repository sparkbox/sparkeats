import { Location } from '../../types/sparkeats';

function LocationAddress({ location }: { location: Location }) {
  return (
    <>
      <address className="review-details__address">
        <p>{location?.address}</p>
      </address>
      {location?.phone && (
        <p>
          <a className="review-details__phone" href={`tel:${location?.phone}`}>
            {location?.phone}
          </a>
        </p>
      )}
      {location?.url && (
        <p>
          <a className="location-card__url" href={`${location?.url}`}>
            Visit Site
          </a>
        </p>
      )}
    </>
  );
}

export function LocationDetails({ location }: { location: Location }) {
  return (
    <section className="review-details">
      <header>
        <h1 className="review-details__title">{location.reviewCountText}</h1>
        <div className="review-details__stars">Average Stars</div>
      </header>
      <LocationAddress location={location} />
    </section>
  );
}
