import { LocationCard } from './LocationCard';
import type { Location } from '../../types/sparkeats';

export function LocationCards({
  selectedLocations,
}: {
  selectedLocations?: Location[];
}) {
  return (
    <section className="homepage__cards">
      <ul className="location-card__list">
        {selectedLocations?.map((location: Location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </section>
  );
}
