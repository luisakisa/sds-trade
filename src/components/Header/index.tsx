import React from "react";
import "./style.css";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redux } from "store";
import UserRoundedIcon from "assets/icon/userRounded.svg";
import { HandySvg } from "handy-svg";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, email, role } = useSelector(
    Redux.Selectors.AuthSelectors.getState
  );


  return (
    <header>
      <div className="header">
        <a className="nav-logo" href="/">
          <img
            src={require("assets/images/logo.png")}
            alt="logo"
            style={{ width: 100 }}
          />
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
            {  <li className="nav-item">
              <Link className="nav-link" to="/lots">
                Лоты
              </Link>
            </li>}
          </ul>
          {!isAuthenticated ? (
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
          ) : (
            <ul className="user">
              <text style={{ marginRight: 5 }}>{email}</text>
              <HandySvg src={UserRoundedIcon} height={14} width={14} />
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
