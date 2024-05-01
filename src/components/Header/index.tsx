import React from "react";
import "./style.css";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redux } from "store";
import UserRoundedIcon from "assets/icon/userRounded.svg";
import { HandySvg } from "handy-svg";
import { Role } from "interfaces/auth";

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
            {isAuthenticated && role == Role.Admin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    О компании
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manageusers">
                    Управление
                  </Link>
                </li>
              </>
            ) : (
              <>
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
                  <Link className="nav-link" to="/feedback">
                    Обратная связь
                  </Link>
                </li>
                {isAuthenticated && (role == Role.SupplierSpecialist ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/lots">
                      Лоты
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/requests">
                      Заявки
                    </Link>
                  </li>
                ))}
              </>
            )}
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
            <ul className="user" onClick={() => navigate("/profile")}>
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
