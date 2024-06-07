import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../Button";
import Switch from "@mui/material/Switch";
import { signUp } from "api/signUp";
import { Group } from "interfaces/groups";
import { useDispatch, useSelector } from "react-redux";
import { groupsMiddleware } from "store/middlewares";
import { UnknownAction } from "redux";
import { Redux } from "store";
import { Role } from "interfaces/auth";
import { getTypesOfBusiness } from "api/typesOfBusiness";
import { getGroups } from "api/groups";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from "@mui/material";

const SignUpCard: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeOfBusinessId, setTypeOfBusinessId] = useState<number | null>(1);
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

  const [selectedGroups, setSelectedGroups] = useState<number[]>([1,2]);
  
  const groups = useSelector(Redux.Selectors.GroupsSelectors.getState);
  const dispatch = useDispatch();
  const [typesOfBusiness, setTypesOfBusiness] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypesOfBusiness = async () => {
      try {
        const typesData = await getTypesOfBusiness();
        setTypesOfBusiness(typesData);
      } catch (error: any) {
        console.error("Ошибка при получении типов бизнеса:", error.message);
      }
    };

    fetchTypesOfBusiness();
  }, []);

  useEffect(() => {
    dispatch(groupsMiddleware() as unknown as UnknownAction);
  }, [dispatch]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkPassword(event.target.value)) {
      setPasswordError("Пароль должен содержать минимум 3 категории символов(большие, прописные буквы, цифры, спец. символы) и быть длиной не менее 8 символов");
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };

  const checkPassword = (pass: string): boolean => {
    const minLength = 8;
    const categories = [/[A-Z]/, /[a-z]/, /\d/, /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/];
    if (pass.length < minLength) {
      return false;
    }
    const matchedCategories = categories.filter((category) => category.test(pass));
    return matchedCategories.length >= 3;
  };

  const handleRegister = async () => {
    if (!region || !inn || !kpp || !firstName || !lastName || !middleName || typeOfBusinessId === null || !company || !password) {
      setErrorFill("Пожалуйста, заполните все необходимые поля");
      return;
    }
    await signUp({
      firstName,
      lastName,
      middleName,
      typeOfBusinessId,
      company,
      email,
      password,
      role: Role.Supplier,
      phoneNumber,
      regionOrAddress: region,
      nds: checked,
      inn,
      kpp,
      site: website,
      groupEtsId: selectedGroups
    });
  };

  const handleGroupChange = (event:SelectChangeEvent<number[]>) => {
    setSelectedGroups(event.target.value as number[]);
  };

  return (
    <div className="sign-up-card">
      <h2>Регистрация</h2>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <div className="column-group">
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              className="input-sign-up"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <span className="error-message" style={{ color: "red", fontSize: 10, width: 290 }}>{passwordError}</span>
            )}
          </div>
          {/* <div className="form-group" style={{ maxWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="type-of-business-label">Вид субъекта предпринимательства</InputLabel>
              <Select
                labelId="type-of-business-label"
                id="type-of-business"
                value={typeOfBusinessId}
                onChange={(e) => setTypeOfBusinessId(e.target.value as number)}
                input={<OutlinedInput label="Вид субъекта предпринимательства" />}
              >
                {typesOfBusiness.map((type) => (
                  <MenuItem key={type.id} value={type.id}>{type.typeName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div> */}
          <div className="form-group">
            <label>Компания</label>
            <input
              className="input-sign-up"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Имя</label>
            <input
              className="input-sign-up"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Фамилия</label>
            <input
              className="input-sign-up"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input
              className="input-sign-up"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="column-group">
          <div className="form-group">
            <label>Номер телефона</label>
            <input
              className="input-sign-up"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Регион/адрес</label>
            <input
              className="input-sign-up"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Сайт</label>
            <input
              className="input-sign-up"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label style={{ marginLeft: 8 }}>Организация является плательщиком НДС</label>
          </div>
          <div className="form-group">
            <label>ИНН</label>
            <input
              className="input-sign-up"
              type="text"
              value={inn}
              onChange={(e) => {
                const value = e.target.value;
                setInn(value);
                if (!/^\d+$/.test(value)) {
                  setInnError(true);
                } else {
                  setInnError(false);
                }
              }}
              required
            />
            {innError && (
              <span className="error-message" style={{ color: "red", fontSize: 10 }}>Пожалуйста, введите числовое значение</span>
            )}
          </div>
          <div className="form-group">
            <label>КПП</label>
            <input
              className="input-sign-up"
              type="text"
              value={kpp}
              onChange={(e) => {
                const value = e.target.value;
                setKpp(value);
                if (!/^\d+$/.test(value)) {
                  setKppError(true);
                } else {
                  setKppError(false);
                }
              }}
              required
            />
            {kppError && (
              <span className="error-message" style={{ color: "red", fontSize: 10 }}>Пожалуйста, введите числовое значение</span>
            )}
          </div>
          {/* <div className="form-group">
            <FormControl fullWidth>
              <InputLabel id="groups-label">Группы</InputLabel>
              <Select
                labelId="groups-label"
                id="groups"
                multiple
                value={selectedGroups}
                onChange={handleGroupChange}
                input={<OutlinedInput label="Группы" />}
                renderValue={(selected) => selected.map(id => groups.find(g => g.id === id)?.name).join(', ')}
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    <Checkbox checked={selectedGroups.indexOf(group.id) > -1} />
                    <ListItemText primary={group.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div> */}
        </div>
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
