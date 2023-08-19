import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  return (
    <div>
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-popup"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="form__text form__text_type_name"
          placeholder="Имя"
          type="text"
          id="profile-name"
          minLength="2"
          maxLength="40"
          name="name"
          required
          onChange={handleChangeName}
          value={name || ''}
        />
        <span className="form__input-error profile-name-error"></span>
        <input
          className="form__text form__text_type_job"
          placeholder="Профессия"
          type="text"
          id="job-input"
          name="job"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeAbout}
          value={description || ''}
        />
        <span className="form__input-error job-input-error"></span>{" "}
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;
