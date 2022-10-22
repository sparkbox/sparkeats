import { LocationCards } from './LocationCards';
import type { Location } from '../../types/sparkeats';

export function HomePage({ locations }: { locations: Location[] }) {
  return (
    <div className="homepage">
      <header>Home Header</header>
      <LocationCards locations={locations} />
    </div>
  );
}
