function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  btnText,
}) {
  return (
    <section className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <div className="popup__content">
          <form className="form" name={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            <div className="form__info">{children}</div>
            <button className="form__submit-btn" type="submit">
              {btnText || "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
