import React from "react";
import Header from "../../components/Header";
import "./styles.css";
import { Button, TextField } from "@mui/material";
import { Redux } from "store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="Profile">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <text
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#2B2A29",
          }}
        >
          Профиль
        </text>
        <Button
          variant="outlined"
          style={{
            justifySelf: "end",
            color: "#2D4191",
            borderColor: "#2D4191",
            marginTop: 20,
          }}
          onClick={() => {
            dispatch(Redux.Actions.Auth.logout());
            navigate("/auth")
          }}
        >
          Выйти
        </Button>
        <div style={{ marginTop: 40 }}>
          <text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#2B2A29",
            }}
          >
            Редактирование профиля
          </text>
          <div
            style={{
              marginTop: 20,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Пароль"
              style={{ maxWidth: 200 }}
            />
            <Button
              variant="outlined"
              style={{
                justifySelf: "end",
                color: "#2D4191",
                borderColor: "#2D4191",
                marginTop: 20,
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
