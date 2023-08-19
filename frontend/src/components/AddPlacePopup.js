import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    link: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(formValues);
  }

  return (
    <PopupWithForm
      name="newcard"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__text form__text_type_title"
        minLength="2"
        maxLength="30"
        id="title-input"
        type="text"
        name="name"
        placeholder="Название"
        required
        value={formValues.name}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })
        }
      />
      <span className="form__input-error title-input-error"></span>
      <input
        className="form__text form__text_type_link"
        id="link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={formValues.link}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
          })
        }
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
