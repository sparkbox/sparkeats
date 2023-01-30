import HomeHeader from '../HomeHeader';
import { LocationCards } from './LocationCards';
import { useLocations } from '../../locations';

export function HomePage() {
  const locations = useLocations();

  return (
    <main className="homepage">
      <HomeHeader />
      <LocationCards />
    </main>
  );
}
