import { uniqueCities } from '../locations';

function LocationMenu() {
  return (
    <div className="location-select">
      <h2 className="location-select__title">
        <label htmlFor="location">Select a Location</label>
      </h2>

      <select className="location-select__menu" name="location" id="location">
        <option className="location-select__option" value="all">
          All Cities
        </option>
        {uniqueCities.map((city: string) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocationMenu;
