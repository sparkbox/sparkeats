export function ReviewHeader() {
  return (
    <div className="review-header">
      <div className="review-header__title">
        <h2 className="review-header__name">placeName</h2>
        <p className="review-header__city">city, state</p>
      </div>
      <div className="review-header__backdrop">
        conditional image
        <img
          className="review-header__backdrop-image"
          src="placeImage"
          alt="placeImageAlt"
        />
      </div>
    </div>
  );
}
