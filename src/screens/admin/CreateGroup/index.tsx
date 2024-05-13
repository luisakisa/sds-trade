import React, { useState } from "react";
import Header from "components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { Button, List } from "@mui/material";

function CreateGroup() {
  const [name, setName] = useState<string>("");

  return (
    <div className="Profile">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            id="outlined-basic"
            label="ID"
            style={{ marginBottom: 30, marginRight: 30 }}
          />
          <TextField
            id="outlined-basic"
            label={"Название"}
            style={{ marginBottom: 30, marginRight: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Предприятие"
            style={{ marginBottom: 30, marginRight: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Способ доставки"
            style={{ marginBottom: 30, marginRight: 30 }}
          />
          <TextField
            id="outlined-basic"
            label="Комментарий"
            style={{ marginBottom: 30, marginRight: 30 }}
          />
        </List>
        <Button variant="contained">Создать</Button>
      </div>
    </div>
  );
}

export default CreateGroup;
