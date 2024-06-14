import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import {
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
} from "@mui/material";
import { getUsers } from "api/users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redux } from "store";
import { Role } from "interfaces/auth";

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { role } = useSelector(Redux.Selectors.AuthSelectors.getState);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        if (userData) {
          const allUsers = [
            ...userData.supplySpecialists,
            ...userData.suppliers,
            ...userData.staff,
          ];
          role === Role.SecuritySpecialist &&
            allUsers.filter((user) => user.role?.roleName === "Supplier");
          setUsers(allUsers);
        } else {
          console.error("Ошибка: данные о пользователях не получены");
        }
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о пользователях:",
          error.message
        );
      }
    };

    fetchUsers();
  }, []);

  function getRole(user: { role: { roleName: string } }) {
    if (user.role && user.role.roleName) {
      switch (user.role.roleName) {
        case "Supply_specialist":
          return "Специалист по снабжению";
        case "Supplier":
          return "Поставщик";
        case "Admin":
          return "Администратор";
        case "Security_specialist":
          return "Специалист по безопасности";
        default:
          return "Неизвестная роль";
      }
    }
    return "Без роли";
  }

  const filteredUsers = users.filter((user) =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            marginBottom: 10,
          }}
        >
          Пользователи
        </text>
        <br />
        <Box mb={2}>
          <TextField
            fullWidth
            label="Поиск по email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <List sx={{ width: "100%" }}>
          {filteredUsers.map((user) => (
            <ListItemButton
              key={user.id}
              component="a"
              href="#simple-list"
              style={{ border: "1px solid #ddd", backgroundColor: "#f7f7f7" }}
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <ListItemText primary={user.id} style={{ textAlign: "left" }} />
              <ListItemText
                primary={user.email}
                style={{ textAlign: "left" }}
              />
              <ListItemText
                primary={getRole(user)}
                style={{ textAlign: "left" }}
              />
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Users;
