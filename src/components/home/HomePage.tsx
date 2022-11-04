import { LocationCards } from './LocationCards';
import { useLocations } from '../../useLocations';

export function HomePage() {
  const locations = useLocations();

  return (
    <div className="homepage">
      <header>Home Header</header>
      <LocationCards locations={locations} />
    </div>
  );
}
