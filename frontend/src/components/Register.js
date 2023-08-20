import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = ({ isLoggedIn, register }) => {
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__form-fieldset">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="auth__form-input"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          />
        </fieldset>
        <fieldset className="auth__form-fieldset">
          <input
            required
            type="password"
            name="password"
            placeholder="Пароль"
            className="auth__form-input"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
          />
        </fieldset>
        <button className="auth__form-btn">Зарегистрироваться</button>
        <p className="auth__form-text">
          Уже зарегистрированы?{" "}
          <Link className="auth__form-link" to={"/sign-in"}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
