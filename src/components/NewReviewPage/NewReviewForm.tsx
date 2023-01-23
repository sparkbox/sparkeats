import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function NewReviewForm() {
  const navigate = useNavigate();
  const [review, setReview] = useState({});

  const handleChange = (field: HTMLInputElement) => {
    setReview((values) => ({
      ...values,
      [field.name]: field.value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newReview = { ...review, id: uuidv4() };

    // console.log('TODO: Persist new review:', newReview);

    navigate(`/locations/${newReview.id}`, {
      replace: true,
      state: { location: newReview },
    });
  };

  // New Review Form

  return (
    <form
      className="form"
      method="post"
      action="/places/<%= place.id %>/reviews"
      encType="multipart/form-data"
    >
      {/* <input id="placeId" type="hidden" value="<%= place.id %>" name="placeId" /> */}
      <div className="form__content-wrapper">
        <section className="form__heading">
          <h3 className="form__title">Review</h3>
          <span
            className="form__required-key form__required-indicator"
            aria-hidden="true"
          >
            Required Field
          </span>
        </section>

        <div className="form__field form__required-indicator">
          <label
            className="form__label"
            htmlFor="reviewerName"
            aria-hidden="true"
          >
            Your Name
          </label>
          <input
            id="reviewerName"
            className="form__input"
            type="text"
            name="reviewerName"
            placeholder="First Name Last Name"
            required
          />
        </div>

        <fieldset className="form__field">
          <legend className="form__legend form__required-indicator">
            Choose a rating for the restaurant.
          </legend>

          <div className="form__ratings">
            <label className="form__label" htmlFor="rating-1">
              <input
                id="rating-1"
                className="form__input form__input--radio"
                type="radio"
                name="numberOfStars"
                value="1"
              />
              <span className="form__label--rating">1 Star</span>
            </label>
            <label className="form__label" htmlFor="rating-2">
              <input
                id="rating-2"
                className="form__input form__input--radio"
                type="radio"
                name="numberOfStars"
                value="2"
              />
              <span className="form__label--rating">2 Star</span>
            </label>
            <label className="form__label" htmlFor="rating-3">
              <input
                id="rating-3"
                className="form__input form__input--radio"
                type="radio"
                name="numberOfStars"
                value="3"
              />
              <span className="form__label--rating">3 Star</span>
            </label>
            <label className="form__label" htmlFor="rating-4">
              <input
                id="rating-4"
                className="form__input form__input--radio"
                type="radio"
                name="numberOfStars"
                value="4"
              />
              <span className="form__label--rating">4 Star</span>
            </label>
            <label className="form__label" htmlFor="rating-5">
              <input
                id="rating-5"
                className="form__input form__input--radio"
                type="radio"
                name="numberOfStars"
                value="5"
              />
              <span className="form__label--rating">5 Star</span>
            </label>
          </div>
        </fieldset>

        <div className="form__field">
          <label
            className="form__label form__required-indicator"
            htmlFor="reviewText"
            aria-hidden="true"
          >
            How was it?
          </label>
          <textarea
            id="reviewText"
            className="form__text-area"
            name="reviewText"
            rows={5}
            required
          ></textarea>
        </div>

        <div className="form__field ">
          <p className="form__label">Add an image to your review (max 5 MB).</p>

          <label
            className="form__label--button"
            htmlFor="reviewImage"
            aria-hidden="false"
          >
            Upload Image
          </label>
          <input
            id="reviewImage"
            className="form__file-input"
            type="file"
            name="reviewImage"
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
              htmlFor="review-image-alt"
              aria-hidden="true"
            >
              <span className="form__label--image-alt form__required-indicator">
                Image Description
              </span>
            </label>
            <input
              id="review-image-alt"
              className="form__input form__input--image-alt"
              type="text"
              name="reviewImageAlt"
            />
          </div>
        </div>

        <button className="form__submit button--primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
