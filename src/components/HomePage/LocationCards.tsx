import { LocationCard } from './LocationCard';
import type { Locations } from '../../types/sparkeats';

export function LocationCards({ locations }: { locations: Locations }) {
  return (
    <section className="homepage__cards">
      <ul className="location-card__list">
        {Object.values(locations).map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </section>
  );
}
