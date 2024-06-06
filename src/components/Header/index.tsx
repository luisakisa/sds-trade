import React, { useState } from "react";
import "./style.css";
import Button from "../Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redux } from "store";
import UserRoundedIcon from "assets/icon/userRounded.svg";
import { HandySvg } from "handy-svg";
import { Role } from "interfaces/auth";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, email, role } = useSelector(
    Redux.Selectors.AuthSelectors.getState
  );

  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const handleLogout = async () => {
    dispatch(Redux.Actions.Auth.logout());
    navigate("/auth");
  };

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
            {isAuthenticated && role === Role.Admin ? (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass("/about")} to="/about">
                    О компании
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={getNavLinkClass("/manageusers")}
                    to="/manageusers"
                  >
                    Управление
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass("/about")} to="/about">
                    О компании
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass("/contacts")} to="/contacts">
                    Контакты
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass("/feedback")} to="/feedback">
                    Обратная связь
                  </Link>
                </li>
                {isAuthenticated &&
                  (role === Role.SupplierSpecialist ? (
                    <li className="nav-item">
                      <Link className={getNavLinkClass("/lots")} to="/lots">
                        Лоты
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          className={getNavLinkClass("/supplier/lotsgroups")}
                          to="/supplier/lotsgroups"
                        >
                          Лоты
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className={getNavLinkClass("/requests")}
                          to="/requests"
                        >
                          Мои заявки
                        </Link>
                      </li>
                    </>
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
            <ul>
              <div className="user">
                <span style={{ marginRight: 5 }}>{email}</span>
                <HandySvg src={UserRoundedIcon} height={14} width={14} />
                <div className="dropdown-menu">
                  <button onClick={() => navigate("/profile")}>
                    Перейти в профиль
                  </button>
                  <button onClick={handleLogout}>Выйти</button>
                </div>
              </div>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
