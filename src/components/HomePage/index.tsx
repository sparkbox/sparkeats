import HomeHeader from '../HomeHeader';
import { LocationCards } from './LocationCards';
import { useLocations } from '../../useLocations';

export function HomePage() {
  const locations = useLocations();

  return (
    <main className="homepage">
      <HomeHeader />
      <LocationCards locations={locations} />
    </main>
  );
}
