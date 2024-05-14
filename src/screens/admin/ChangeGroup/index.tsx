import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { Button, List } from "@mui/material";
import { deleteGroup, getGroups, updateGroup } from "api/groups";
import { Group } from "interfaces/groups";
import { useParams } from "react-router-dom";

function ChangeGroup() {
  const { id } = useParams();

  const [group, setGroup] = useState<
    Group 
  >();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const groupsData = await getGroups();
        groupsData.forEach((u: Group) => {
          if (id && u.id === parseInt(id)) {
            setGroup(u);
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
    await updateGroup({
      id: Number(id),
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

  const handleDeleteGroup = async () => {
    await deleteGroup(Number(id));
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
          helperText={group?.name}
          label={"Название"}
          style={{ marginBottom: 30, marginRight: 30 }}
          onChange={handleNameChange}
        />
        <br />
        <label style={{ fontWeight: 600 }}>Ответственный руководитель:</label>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            id="outlined-basic"
            name="managerPost"
            label={group?.managerPost}
            helperText="Должность"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerPostChange}
          />
          <TextField
            id="outlined-basic"
            name="managerFirstName"
            helperText="Фамилия"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerFirstNameChange}
            label={group?.managerFirstName}
          />
          <TextField
            id="outlined-basic"
            name="managerLastName"
            helperText="Имя"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerLastNameChange}
            label={group?.managerLastName}
          />
          <TextField
            id="outlined-basic"
            name="managerMiddleName"
            helperText="Отчество"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleManagerMiddleNameChange}
            label={group?.managerMiddleName}
          />
        </List>
        <label style={{ fontWeight: 600 }}>
          Подпись в подножии конкурентного листа:
        </label>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <TextField
            id={`position`}
            name={`signer-position`}
            helperText="Должность"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerPostChange}
            label={group?.signer[0].post}
          />
          <TextField
            id={`firstName`}
            name={`signer-firstName`}
            helperText="Фамилия"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerFirstNameChange}
            label={group?.signer[0].firstName}
          />
          <TextField
            id={`lastName`}
            name={`signer-lastName`}
            helperText="Имя"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={
              handleSignerLastNameChange
            }
            label={group?.signer[0].lastName}
          />
          <TextField
            id={`middleName`}
            name={`signer-middleName`}
            helperText="Отчество"
            style={{ marginBottom: 30, marginRight: 30 }}
            onChange={handleSignerMiddleNameChange}
            label={group?.signer[0].middleName}
          />
        </List>
        <Button variant="contained" onClick={handleCreateGroup}>
          Сохранить
        </Button>
        <br />
        <Button variant="contained" onClick={handleDeleteGroup} style={{ marginTop: 20, backgroundColor: "#f56464" }}>
          Удалить группу
        </Button>
      </div>
    </div>
  );
}

export default ChangeGroup;
