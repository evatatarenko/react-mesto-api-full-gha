import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" onClick={onEditAvatar}>
          <div className="profile__avatar-vector"></div>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{user?.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button popup-link"
          ></button>
          <p className="profile__subtitle">{user?.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
            cards={cards}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
