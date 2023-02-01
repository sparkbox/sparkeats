import type { Location } from '../types/sparkeats';

function getUniqueCities(locations: Location[]): string[] {
  const cities = Array.from(
    new Set(locations.map((location) => location.city))
  );

  return cities;
}

function LocationMenu({
  currentCity,
  locations,
  dispatch,
}: {
  currentCity: string;
  locations: Location[];
  dispatch: React.Dispatch<{
    type: string;
    data: any;
  }>;
}) {
  const handleChange = (field: HTMLSelectElement) => {
    dispatch({
      type: 'select_city',
      data: { [field.name]: field.value },
    });
  };

  const cities = getUniqueCities(locations);

  return (
    <div className="location-select">
      <h2 className="location-select__title">
        <label htmlFor="city">Select a Location</label>
      </h2>
      <select
        className="location-select__menu"
        name="city"
        id="city"
        value={currentCity}
        onChange={(event) => handleChange(event.target)}
      >
        <option className="location-select__option" value="All Cities">
          All Cities
        </option>
        {cities.map((city: string) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocationMenu;
