import React from "react";
import Header from "components/Header";
import "./styles.css";
import { Button, ButtonGroup } from "@mui/material";
import iconSrc from "assets/icon/arrowLeftRounded.svg";
import { HandySvg } from "handy-svg";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();
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
          Управление
        </text>
        <br />
        <label
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#2B2A29",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Пользователи:
        </label>
        <ButtonGroup
          size="large"
          orientation="vertical"
          variant="contained"
          aria-label="Basic button group"
        >
          <Button variant="text" onClick={() => navigate("/users")}>
            Редактировать пользователей
          </Button>
        </ButtonGroup>

        <label
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#2B2A29",
            textAlign: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Группы
        </label>
        <ButtonGroup
          size="large"
          orientation="vertical"
          variant="contained"
          aria-label="Basic button group"
        >
          <Button variant="text" onClick={()=>navigate("/creategroup")}>Создать новую группу для лота</Button>
          <Button variant="text"  onClick={()=>navigate("/groups")}>Редактировать группы</Button>
        </ButtonGroup>
        <label
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#2B2A29",
            textAlign: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          Лоты:
        </label>
        <ButtonGroup
          size="large"
          orientation="vertical"
          variant="contained"
          aria-label="Basic button group"
        >
          <Button variant="text" onClick={()=>navigate("/admin/groupslots")}>Удалить лот</Button>
        </ButtonGroup>
      </div>
    </div>  
  );
}

export default ManageUsers;
