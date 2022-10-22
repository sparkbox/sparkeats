import { LocationCard } from './LocationCard';
import type { Location } from '../../types/sparkeats';

export function LocationCards({ locations }: { locations: Location[] }) {
  return (
    <section className="homepage__cards">
      <ul className="location-card__list">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </section>
  );
}
