import React, { useState } from "react";
import "./style.css";
import Button from "components/Button";
import { authMiddleware } from "store/middlewares";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch, Redux } from "store";

const AuthCard: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await dispatch(authMiddleware({ login, password }));
      if ("error" in response) {
        setError("Неверный логин или пароль");
      } else {
        navigate("/profile");
        dispatch(Redux.Actions.Auth.setEmail(login));
      }
    } catch (e) {
      setError("Неверный логин или пароль");
    }
  };

  const handleForgotPassword = () => {
    // Обработка забытого пароля
  };

  return (
    <div className="auth-card">
      <h2>Авторизация</h2>
      <div>
        <div className="form-group">
          <label htmlFor="login">Логин</label>
          <input
            className="input-auth"
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            className="input-auth"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button
          onClick={handleLogin}
          text="Войти"
          style={{ width: "100%", marginTop: 20 }}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="forgot-password" onClick={handleForgotPassword}>
        <span>Забыли пароль?</span>
      </div>
    </div>
  );
};

export default AuthCard;
