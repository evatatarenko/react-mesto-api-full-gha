import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Card from "./Card";
import pen from '../images/pencil-icon.svg'
import plus from '../images/pencil-icon.svg'

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
        <button className="profile__avatar-update" type="button" name="avatar-update" onClick={onEditAvatar}>
          <img src={user?.avatar} alt="Аватар пользователя" className="profile__avatar"/>
        </button>
        <div className="profile__container">
            <h1 className="profile__person">{user?.name}</h1>
            <p className="profile__job">{user?.about}</p>
            <button className="profile__edit" type="button" aria-label="редактировать профиль" onClick={onEditProfile}>
              <img src={pen} alt="иконка карандаш"/>
            </button>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить" onClick={onAddPlace}>
          <img src={plus} alt="иконка плюс"/>
        </button>
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
