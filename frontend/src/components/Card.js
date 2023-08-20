import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ onCardClick, card, onCardLike, onCardDelete, cards }) {
  const user = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  const isOwn = card.owner._id === user._id || false;
  const isLiked = card?.likes && card.likes.some((i) => i._id === user._id) || false;

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <li className="element">
      <img
        className="element__img"
        id="image"
        src={card?.link}
        alt={card?.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card?.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__count-like">{card?.likes?.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__remove-btn"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
