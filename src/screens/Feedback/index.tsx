import React, { useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import { Redux } from "store";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleChangeOrganization = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOrganization(event.target.value);
  };

  const handleChangePhone = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPhone(event.target.value);
  };

  const handleChangeMessage = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log({ name, email, organization, phone, message });

    setName("");
    setEmail("");
    setOrganization("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="Feedback">
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
          Обратная связь
        </text>
        <div style={{ marginTop: 40 }}>
          <text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#2B2A29",
            }}
          >
            Задать вопрос руководству компании:
          </text>
          <form
            onSubmit={handleSubmit}
            style={{ flex: 1,padding: 20 }}
          >
            <TextField
              id="outlined-basic"
              label="ФИО"
              style={{ width: 300 }}
              value={name}
              onChange={handleChangeName}
              size={"small"}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Email"
              style={{ width: 300, marginTop: 20 }}
              value={email}
              onChange={handleChangeEmail}
              size={"small"}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Организация"
              style={{ width: 300, marginTop: 20 }}
              value={organization}
              onChange={handleChangeOrganization}
              size={"small"}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Телефон"
              style={{ width: 300, marginTop: 20 }}
              value={phone}
              onChange={handleChangePhone}
              size={"small"}
            />
            <br />
            <TextField
              id="outlined-multiline-static"
              label="Сообщение"
              multiline
              rows={4}
              style={{ width: 300, marginTop: 20 }}
              value={message}
              onChange={handleChangeMessage}
            />
            <br />
            <br />
            <Button variant="contained" type="submit">
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
