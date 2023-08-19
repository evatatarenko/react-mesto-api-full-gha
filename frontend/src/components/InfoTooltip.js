import React from "react";

import greatImage from "../images/great.svg";
import badImage from "../images/bad.svg";

const InfoTooltip = ({ isOpen, onClose, isRegister }) => {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="popup__content popup__content_tooltip">
          <button
            className="popup__close-btn"
            type="button"
            onClick={onClose}
          />
          {isRegister ? (
            <img src={greatImage} alt="" />
          ) : (
            <img src={badImage} alt="" />
          )}
          <h2 className="popup__title popup__title_tooltip">
            {isRegister
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default InfoTooltip;
