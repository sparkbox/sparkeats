import { SyntheticEvent, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { reducer } from '../../state';
import { write, usePersistence } from '../../persistence';

export function NewLocationForm() {
  const navigate = useNavigate();
  const db = usePersistence();
  const [{ location }, dispatch] = useReducer(reducer, {
    location: {
      name: '',
      city: '',
      region: '',
      country: '',
      address: '',
      phone: '',
      url: '',
      imageURL: '',
      imageDescription: '',
    },
  });

  const handleChange = (field: HTMLInputElement) => {
    dispatch({
      type: 'update_location',
      data: { [field.name]: field.value },
    });
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const id = uuidv4();

    const newLocation = { ...location, reviews: [], id };

    await write({
      db,
      collection: 'locations',
      id,
      payload: newLocation,
    });

    navigate(`/locations/${newLocation.id}`, {
      replace: true,
      state: { location: newLocation },
    });
  };

  // New Location Form

  return (
    <div className="form__container">
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form__content-wrapper">
          <section className="form__heading">
            <h2 className="form__title">Location Information</h2>
            <span
              className="form__required-key form__required-indicator"
              aria-hidden="true"
            >
              Required Field
            </span>
          </section>

          {/* Name */}

          <div className="form__field form__required-indicator">
            <label className="form__label" htmlFor="name" aria-hidden="true">
              Location Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              value={location.name}
              onChange={(event) => handleChange(event.target)}
              name="name"
              placeholder="Name"
              required
            />
          </div>

          {/* City */}

          <div className="form__field form__required-indicator">
            <label className="form__label" htmlFor="city" aria-hidden="true">
              City
            </label>
            <input
              id="city"
              className="form__input"
              type="text"
              value={location.city}
              onChange={(event) => handleChange(event.target)}
              name="city"
              placeholder="City"
              required
            />
          </div>

          {/* Region */}

          <div className="form__field form__required-indicator">
            <label className="form__label" htmlFor="region" aria-hidden="true">
              Region (State, Province, County etc.)
            </label>
            <input
              id="region"
              className="form__input"
              type="text"
              value={location.region}
              onChange={(event) => handleChange(event.target)}
              name="region"
              placeholder="Region"
              required
            />
          </div>

          {/* Country */}

          <div className="form__field form__required-indicator">
            <label className="form__label" htmlFor="country" aria-hidden="true">
              Country
            </label>
            <input
              id="country"
              className="form__input"
              type="text"
              value={location.country}
              onChange={(event) => handleChange(event.target)}
              name="country"
              placeholder="Country"
              required
            />
          </div>

          {/* Address */}

          <div className="form__field form__required-indicator">
            <label className="form__label" htmlFor="address" aria-hidden="true">
              Address
            </label>
            <input
              id="address"
              className="form__input"
              type="text"
              value={location.address}
              onChange={(event) => handleChange(event.target)}
              name="address"
              placeholder="123 Alphabet Street, City, Region, Country, Zip Code"
              required
            />
          </div>

          {/* Phone */}

          <div className="form__field">
            <label className="form__label" htmlFor="phone" aria-hidden="true">
              Phone number
            </label>
            <input
              id="phone"
              className="form__input"
              type="text"
              value={location.phone}
              onChange={(event) => handleChange(event.target)}
              name="phone"
              placeholder="+1 (555) 555-5555"
            />
          </div>

          {/* Image */}

          {/* <div className="form__field ">
              <p className="form__label">
                Add an image to your review (max 5 MB).
              </p>

              <label
                className="form__label--button"
                htmlFor="locationImage"
                aria-hidden="false"
              >
                Upload Image
              </label>
              <input
                id="locationImage"
                className="form__file-input"
                type="file"
                name="locationImage"
                accept="image/*"
              />
              <span className="button--secondary" aria-hidden="true">
                Upload Image
              </span>

              <div className="form__field form__field--file" aria-live="polite">
                <div className="form__file">
                  <span className="form__file-name"></span>
                  <button
                    type="button"
                    className="form__remove-file"
                    aria-label="Remove image"
                  >
                    &times
                  </button>
                </div>
                <label
                  className="form__label"
                  htmlFor="location-image-alt"
                  aria-hidden="true"
                >
                  <span className="form__label--image-alt form__required-indicator">
                    Image Description
                  </span>
                </label>
                <input
                  id="location-image-alt"
                  className="form__input form__input--image-alt"
                  type="text"
                  name="locationImageAlt"
                />
              </div>
            </div> */}

          {/* URL */}

          <div className="form__field">
            <label className="form__label" htmlFor="url" aria-hidden="true">
              URL
            </label>
            <input
              id="url"
              className="form__input"
              type="text"
              value={location.url}
              onChange={(event) => handleChange(event.target)}
              name="url"
              placeholder="amazing-restaurant.com"
            />
          </div>

          <button className="form__submit button--primary" type="submit">
            Submit location
          </button>
        </div>
      </form>
    </div>
  );
}
