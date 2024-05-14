import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import {
  Button,
  List,
  TextField,
} from "@mui/material";
import { deleteUser, getUsers, updateUser } from "api/users";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  const [user, setUser] = useState<
    SupplierFullData | SupplySpecialistFullData
  >();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        usersData.forEach((u: SupplierFullData | SupplySpecialistFullData) => {
          if (id && u.id === parseInt(id)) {
            setUser(u);
          }
        });
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о пользователях:",
          error.message
        );
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    user && setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
       const response = await updateUser(parseInt(id ?? ''), user ?? undefined);

      if (response.ok) {
        console.log("Данные успешно отправлены на сервер");
      } else {
        console.error("Ошибка при отправке данных на сервер");
      }
    } catch (error: any) {
      console.error("Ошибка при отправке данных на сервер:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(parseInt(id ?? ''));

      if (response.ok) {
        console.log("Данные успешно удалены на сервер");
      } else {
        console.error("Ошибка при удалении данных на сервер");
      }
    } catch (error: any) {
      console.error("Ошибка при удалении данных на сервер:", error.message);
    }
  };

  return (
    <div className="ManageUsers" style={{ height: "100%", width: "100%" }}>
      <Header />
      <div
        className="content-contacts"
        style={{
          paddingInline: 200,
          fontFamily: "Montserrat",
          flexDirection: "column",
        }}
      >
        <text
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: "#2B2A29",
            marginBottom: 40,
          }}
        >
          Пользователи
        </text>
        <br />

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            label={user?.id}
            helperText="ID"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleChange}
          />
          <TextField
            label={user?.email}
            helperText="Email"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleChange}

          />
          <TextField
            label={user?.password}
            helperText="Пароль"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleChange}

          />
          {user && "groupEtsId" in user && (
            <TextField
              label={user.groupEtsId}
              helperText="Группа"
              style={{ marginBottom: 30, marginRight: 30 }}
              onChange={handleChange}

            />
          )}
          {user && "typeOfBusiness" in user && (
            <>
              <TextField
                label={user.typeOfBusiness}
                helperText="Тип бизнеса"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}
              />
              {/* variant='filled' */}
              <TextField
                label={user.company}
                helperText="Компания"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.firstName}
                helperText="Имя"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.lastName}
                helperText="Фамилия"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.middleName}
                helperText="Отчество"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.phoneNumber}
                helperText="Телефон"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.regionOrAddress}
                helperText="Регион/адрес"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.site}
                helperText="Сайт"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.inn}
                helperText="ИНН"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
              <TextField
                label={user.kpp}
                helperText="КПП"
                style={{ marginBottom: 30, marginRight: 30 }}
                onChange={handleChange}

              />
            </>
          )}
        </List>
        <Button variant="contained" onClick={handleSubmit}>
            Сохранить
          </Button>
        <Button variant="contained" onClick={handleDelete} style={{ marginTop: 20, backgroundColor: "#f56464" }}>
            Удалить пользователя
          </Button>
      </div>
    </div>
  );
}

export default User;
