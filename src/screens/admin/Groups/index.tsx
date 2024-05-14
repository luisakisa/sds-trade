import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { Button, List, ListItemButton, ListItemText } from "@mui/material";
import { createGroup, getGroups } from "api/groups";
import { Group } from "interfaces/groups";
import { useNavigate } from "react-router-dom";

function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroups();
        setGroups(groupData);
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о пользователях:",
          error.message
        );
      }
    };

    fetchGroups();
  }, []);

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

        <br />
        <label style={{ fontWeight: 600 }}>Ответственный руководитель:</label>
        <List sx={{ width: "100%" }}>
          {groups.map((group) => (
            <ListItemButton
              key={group.id}
              component="a"
              href="#simple-list"
              style={{ border: "1px solid #ddd", backgroundColor: "#f7f7f7" }}
              onClick={() => navigate(`/changegroup/${group.id}`)}
            >
              <ListItemText primary={group.id} />
              <ListItemText primary={group.name} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Groups;
