import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoggedIn, login }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formValues);
  };

  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
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
        <button className="auth__form-btn">Войти</button>
      </form>
    </div>
  );
};

export default Login;
