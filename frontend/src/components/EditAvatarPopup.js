import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose }) => {
  const refInput = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }

  useEffect(() => {
    refInput.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="link-avatar"
        className="form__text form__text_type_avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        ref={refInput}
      />
      <span className="link-avatar-error form__input-error"></span>{" "}
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
