import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ logOut, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Вход
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__cabinet">
              <span className="header__link">{email}</span>
              <button
                className="header__link header__link_btn header__link_gray"
                onClick={logOut}
              >
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
