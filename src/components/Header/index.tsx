import React from "react";
import "./style.css";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header">
        <a className="nav-logo" href="/">
          <img src={require('assets/images/logo.png')} alt="logo" style={{ width: 100 }} />
        </a>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                О компании
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                Контакты
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Обратная связь
              </Link>
            </li>
          </ul>
          <ul className="auth">
            <Button
              text="Войти"
              background={false}
              style={{ marginRight: 15 }}
              onClick={() => navigate("/auth")}
            />
            <Button
              text="Зарегистрироваться"
              onClick={() => navigate("/signup")}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
