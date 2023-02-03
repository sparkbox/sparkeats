import { useEffect, useReducer } from 'react';
import HomeHeader from '../HomeHeader';
import { LocationCards } from './LocationCards';
import { reducer } from '../../state';
import firebase, { useFirestore } from '../../firebase';

export function HomePage() {
  const [{ city, locations, selectedLocations }, dispatch] = useReducer(
    reducer,
    {
      // currentCity
      city: 'All Cities',
      selectedLocations: [],
      locations: [],
    } as any
  );
  const db = useFirestore();

  useEffect(() => {
    async function setLocations() {
      const locations = await firebase.getDocs(db, 'locations');

      dispatch({
        type: 'set_locations',
        data: locations,
      });
    }

    setLocations();
  }, []);

  return (
    <main className="homepage">
      <HomeHeader
        currentCity={city}
        locations={locations}
        dispatch={dispatch}
      />
      <LocationCards selectedLocations={selectedLocations} />
    </main>
  );
}
