function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup image-popup ${card ? "popup_opened" : ""}`}>
      <figure className="image-popup__container">
        <img className="image-popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="image-popup__caption">{card?.name}</figcaption>
        <button
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
