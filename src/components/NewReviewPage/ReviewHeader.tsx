import { Location } from '../../types/sparkeats';

export function ReviewHeader({ location }: { location: Location }) {
  const backgroundFallback = `${
    import.meta.env['BASE_URL']
  }img/background-fallback.svg`;

  return (
    <div className="review-header">
      <div className="review-header__title">
        <h2 className="review-header__name">{location.name}</h2>
        <p className="review-header__city">
          {location.city}, {location.region}
        </p>
      </div>
      <div className="review-header__backdrop">
        <img
          className="review-header__backdrop-image"
          src={location.imageURL || backgroundFallback}
          alt={location.imageDescription}
        />
      </div>
    </div>
  );
}
