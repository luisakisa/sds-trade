import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import {
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { getUsers } from "api/users";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState<
    SupplierFullData[] | SupplySpecialistFullData[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о пользователях:",
          error.message
        );
      }
    };

    fetchUsers();
  }, []);

  function getRole(user: SupplierFullData | SupplySpecialistFullData) {
    if ("company" in user) {
      return "Поставщик";
    } else {
      return "Cпециалист по снабжению";
    }
  }

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

        <List
          sx={{ width: "100%"}}
        >
          {users.map((user) => (
            <ListItemButton key={user.id} component="a" href="#simple-list" style={{border: "1px solid #ddd", backgroundColor: "#f7f7f7" }} onClick={() => navigate(`/user/${user.id}`)}>
              <ListItemText primary={user.id} />
              <ListItemText primary={user.email} />
              <ListItemText primary={getRole(user)} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Users;
