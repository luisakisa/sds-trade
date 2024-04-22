import React, { useState } from "react";
import "./style.css";
import Button from "../Button";
import Switch from "@mui/material/Switch";
import { signUp } from "api/signUp";

const SignUpCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeOfBusiness, setTypeOfBusiness] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [inn, setInn] = useState<string>();
  const [kpp, setKpp] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const [innError, setInnError] = useState<boolean>(false);
  const [kppError, setKppError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorFill, setErrorFill] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkPassword()) {
      setPasswordError(
        "Пароль должен содержать минимум 3 категории символов(большие, прописные буквы, цифры, спец. символы) и быть длиной не менее 8 символов"
      );
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };

  const handleTypeOfBusinessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypeOfBusiness(event.target.value);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleMiddleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMiddleName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(event.target.value);
  };

  const handleInnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInn(value);
    if (!/^\d+$/.test(value)) {
      setInnError(true);
    } else {
      setInnError(false);
    }
  };

  const handleKppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKpp(value);
    if (!/^\d+$/.test(value)) {
      setKppError(true);
    } else {
      setKppError(false);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const checkPassword = (): boolean => {
    const minLength = 8;
    const categories = [
      /[A-Z]/, // Большие буквы
      /[a-z]/, // Прописные буквы
      /\d/, // Цифры
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, // Специальные символы
    ];

    // Проверяем, соответствует ли длина пароля минимальному значению
    if (password.length < minLength) {
      return false;
    }

    // Проверяем, содержит ли пароль минимум 3 категории символов
    const matchedCategories = categories.filter((category) =>
      category.test(password)
    );
    return matchedCategories.length >= 3;
  };
  const [isOn, setIsOn] = useState(false);

  const handleRegister = async () => {
    if (!isOn) {
      if (!email || !password || !typeOfBusiness || !company) {
        setErrorFill("Пожалуйста, заполните все необходимые поля");

        return;
      }
    } else {
      if (
        !region ||
        !inn ||
        !kpp ||
        !firstName ||
        !lastName ||
        !middleName ||
        !typeOfBusiness ||
        !company ||
        !password
      ) {
        setErrorFill("Пожалуйста, заполните все необходимые поля");
        return;
      }
    }

    await signUp({
      firstName,
      lastName,
      middleName,
      typeOfBusiness,
      company,
      email,
      password,
      role: isOn ? "Supplier" : "Supplier Specialist",
      additionalData: {
        phone: phoneNumber,
        address: region,
        nds: checked,
        inn,
        kpp,
        website,
      },
    });
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="sign-up-card">
      <h2>Регистрация</h2>
      <div style={{ marginBottom: 20 }}>
        <label>Специалист по снабжению</label>
        <Switch onChange={toggleSwitch}></Switch>
        <label>Поставщик</label>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <div className="column-group">
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              className="input-sign-up"
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              className="input-sign-up"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <span
                className="error-message"
                style={{ color: "red", fontSize: 10, width: 290 }}
              >
                {passwordError}
              </span>
            )}
          </div>
          <div className="form-group" style={{ maxWidth: 250 }}>
            <label>Вид субъекта предпринимательства</label>
            <input
              className="input-sign-up"
              type="text"
              value={typeOfBusiness}
              onChange={handleTypeOfBusinessChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Компания</label>
            <input
              className="input-sign-up"
              type="text"
              value={company}
              onChange={handleCompanyChange}
              required
            />
          </div>
          {isOn && (
            <>
              <div className="form-group">
                <label>Имя</label>
                <input
                  className="input-sign-up"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Отчество</label>
                <input
                  className="input-sign-up"
                  type="text"
                  value={middleName}
                  onChange={handleMiddleNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Фамилия</label>
                <input
                  className="input-sign-up"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
            </>
          )}
        </div>
        {isOn && (
          <div className="column-group">
            <div className="form-group">
              <label>Номер телефона</label>
              <input
                className="input-sign-up"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Регион/адрес</label>
              <input
                className="input-sign-up"
                type="text"
                value={region}
                onChange={handleRegionChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Сайт</label>
              <input
                className="input-sign-up"
                type="text"
                value={website}
                onChange={handleWebsiteChange}
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              <label style={{ marginLeft: 8 }}>
                Организация является плательщиком НДС
              </label>
            </div>
            <div className="form-group">
              <label>ИНН</label>
              <input
                className="input-sign-up"
                type="text"
                value={inn}
                onChange={handleInnChange}
                required
              />
              {innError && (
                <span
                  className="error-message"
                  style={{ color: "red", fontSize: 10 }}
                >
                  Пожалуйста, введите числовое значение
                </span>
              )}
            </div>
            <div className="form-group">
              <label>КПП</label>
              <input
                className="input-sign-up"
                type="text"
                value={kpp}
                onChange={handleKppChange}
                required
              />
              {kppError && (
                <span
                  className="error-message"
                  style={{ color: "red", fontSize: 10 }}
                >
                  Пожалуйста, введите числовое значение
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {errorFill && (
        <div style={{ color: "red", marginBottom: 10 }}>{errorFill}</div>
      )}
      <Button
        onClick={handleRegister}
        text="Зарегистрироваться"
        style={{ maxWidth: 200, marginTop: 20, marginBottom: 20 }}
      />
    </div>
  );
};

export default SignUpCard;
