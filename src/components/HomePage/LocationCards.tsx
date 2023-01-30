import { useEffect, useReducer } from 'react';
import { reducer } from '../../state';
import { LocationCard } from './LocationCard';
import type { Location } from '../../types/sparkeats';
import { readAll, usePersistence } from '../../persistence';

export function LocationCards() {
  const [{ locations }, dispatch] = useReducer(reducer, {
    locations: [],
  } as any);
  const db = usePersistence();

  useEffect(() => {
    async function setLocations() {
      const locations = await readAll({
        db,
        collection: 'locations',
      });

      dispatch({
        type: 'set_locations',
        data: locations,
      });
    }

    setLocations();
  }, []);

  return (
    <section className="homepage__cards">
      <ul className="location-card__list">
        {locations.map((location: Location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </ul>
    </section>
  );
}
