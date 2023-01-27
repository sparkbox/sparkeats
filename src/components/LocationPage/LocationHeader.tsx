import { Location } from '../../types/sparkeats';

export function LocationHeader({ location }: { location: Location }) {
  return (
    <div className="review-header">
      <div className="review-header__title">
        <h2 className="review-header__name">{location.name}</h2>
        <p className="review-header__city">
          {location.city}, {location.region}
        </p>
      </div>
      <div className="review-header__backdrop">
        {location.imageURL && (
          <img
            className="review-header__backdrop-image"
            src={location?.imageURL}
            alt={location?.imageDescription}
          />
        )}
      </div>
    </div>
  );
}
