import React, { useState } from "react";
import Header from "components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { Button, List } from "@mui/material";
import { createGroup } from "api/groups";
import { nanoid } from "@reduxjs/toolkit";

function CreateGroup() {
  const [name, setName] = useState<string>("");
  const [managerPost, setManagerPost] = useState<string>("");
  const [managerFirstName, setManagerFirstName] = useState<string>("");
  const [managerLastName, setManagerLastName] = useState<string>("");
  const [managerMiddleName, setManagerMiddleName] = useState<string>("");

  const [signerPost, setSignerPost] = useState<string>("");
  const [signerFirstName, setSignerFirstName] = useState<string>("");
  const [signerLastName, setSignerLastName] = useState<string>("");
  const [signerMiddleName, setSignerMiddleName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleManagerPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManagerPost(e.target.value);
  };

  const handleManagerFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManagerFirstName(e.target.value);
  };

  const handleManagerLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManagerLastName(e.target.value);
  };

  const handleManagerMiddleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManagerMiddleName(e.target.value);
  };

  const handleSignerPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignerPost(e.target.value);
  };

  const handleSignerFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignerFirstName(e.target.value);
  };

  const handleSignerLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignerLastName(e.target.value);
  };

  const handleSignerMiddleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignerMiddleName(e.target.value);
  };

  const handleCreateGroup = async () => {
    console.log({
      name,
      managerPost,
      managerFirstName,
      managerLastName,
      managerMiddleName,
      signer: [
        {
          post: signerPost,
          firstName: signerFirstName,
          lastName: signerLastName,
          middleName: signerMiddleName,
        },
      ],
    })
    await createGroup({
      id: Number(nanoid()),
      name,
      managerPost,
      managerFirstName,
      managerLastName,
      managerMiddleName,
      signer: [
        {
          post: signerPost,
          firstName: signerFirstName,
          lastName: signerLastName,
          middleName: signerMiddleName,
        },
      ],
    });
  };

  return (
    <div className="Profile">
      <Header />
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
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
          Создать новую группу
        </text>
        <br />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          name="name"
          label={"Название"}
          style={{ marginBottom: 30, marginRight: 30 }}
          onChange={handleNameChange}
        />
        <br />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            id="outlined-basic"
            name="managerPost"
            label="Должность"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerPostChange}
          />
          <TextField
            id="outlined-basic"
            name="managerFirstName"
            label="Фамилия"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerFirstNameChange}
          />
          <TextField
            id="outlined-basic"
            name="managerLastName"
            label="Имя"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerLastNameChange}
          />
          <TextField
            id="outlined-basic"
            name="managerMiddleName"
            label="Отчество"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerMiddleNameChange}
          />
        </List>
        <label style={{ fontWeight: 600 }}>
          Подпись в подножии конкурентного листа:
        </label>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            id={`position`}
            name={`signer-position`}
            label="Должность"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerPostChange}
          />
          <TextField
            id={`firstName`}
            name={`signer-firstName`}
            label="Фамилия"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerFirstNameChange}
          />
          <TextField
            id={`lastName`}
            name={`signer-lastName`}
            label="Имя"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={
              handleSignerLastNameChange
            }
          />
          <TextField
            id={`middleName`}
            name={`signer-middleName`}
            label="Отчество"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerMiddleNameChange}
          />
        </List>
        <Button variant="contained" onClick={handleCreateGroup}>
          Создать
        </Button>
      </div>
    </div>
  );
}

export default CreateGroup;
