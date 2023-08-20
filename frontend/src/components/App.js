// Modules
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// API

import api from "../utils/api";

// Auth

import auth from "../utils/auth";

// Components

import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";
import ImagePopup from "../components/ImagePopup.js";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          // console.log('data',data)
          setEmail(data.email);
          setCurrentUser(data)
          setIsLoggedIn(true);
          navigate("/");

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([user, cards]) => {
          console.log('user init',user)
          console.log('cards init',cards)
          setCurrentUser(user);
          setCards(cards.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(items) {
    console.log('updated')
    api
      .updateUserInfo(items)
      .then((user) => {
        console.log('updated user', user)
        setCurrentUser(user.data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    console.log('update avata',avatar);
    api
      .updateUserAvatar({ avatar })
      .then((user) => {
        console.log('updated avatar', user)
        setCurrentUser(user.data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(items) {
    console.log('created card')
    api
      .createCard(items)
      .then((newCard) => {
        console.log('created card', newCard)
        setCards([newCard.data, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
  }

  function register(user) {
    auth
      .register(user)
      .then(() => {
        setIsTooltipOpen(true);
        setIsRegister(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsRegister(false);
      });
  }

  function login(user) {
    // console.log('user', user)
    auth
      .login(user)
      .then((data) => {
        // console.log('data', data)
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setEmail("");
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header logOut={logOut} email={email} />
        <Routes>
          <Route
            path="/sign-in"
            element={<Login login={login} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/sign-up"
            element={<Register register={register} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/sign-in" />} />
        </Routes>
        {isLoggedIn && <Footer />}
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
