import React from "react";
import Header from "../../components/Header";
import "./styles.css";
import { Redux } from "store";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

function CreateLot() {
  return (
    <div className="Profile">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
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
          <TextField id="outlined-basic" label="Наименовние" />
          <Button
            variant="outlined"
            style={{ justifySelf: "end", color: "#2D4191", borderColor: "#2D4191" }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateLot;
