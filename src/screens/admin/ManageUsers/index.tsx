import React from "react";
import Header from "components/Header";
import "./styles.css";
import { Button, ButtonGroup } from "@mui/material";
import iconSrc from "assets/icon/arrowLeftRounded.svg";
import { HandySvg } from "handy-svg";

function ManageUsers() {
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
          }}
        >
          Управление
        </text>
        <br />
        <label>Пользователи</label>
        <ButtonGroup
          size="large"
          orientation="vertical"
          variant="contained"
          aria-label="Basic button group"
        >
          <Button
            variant="text"
            endIcon={
              <div style={{ rotate: "180deg"}}>
                <HandySvg
                  src={iconSrc}
                  className="prev"
                  height={24}
                  width={24}

                />
              </div>
            }
          >
            Редактировать пользователя
          </Button>
          <Button variant="text">Добавить пользователя</Button>
        </ButtonGroup>

        <label>Группы</label>
        <ButtonGroup
          size="large"
          orientation="vertical"
          variant="contained"
          aria-label="Basic button group"
        >
          <Button variant="text">Создать новую группу для лота</Button>
          <Button variant="text">Редактировать группы</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default ManageUsers;
