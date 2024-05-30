import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "api/groups";
import { Group } from "interfaces/groups";
import { Redux } from "store";

function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroups();
        setGroups(groupData);
        setFilteredGroups(groupData);
      } catch (error: any) {
        console.error("Ошибка при получении данных о группах:", error.message);
      }
    };

    fetchGroups();
  }, [dispatch]);

  useEffect(() => {
    const results = groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(results);
  }, [searchTerm, groups]);

  return (
    <div className="GroupLots">
      <Header />
      <div className="content-contacts" style={{ paddingInline: 200, fontFamily: "Montserrat", marginTop: 50, display: "flex", flexDirection: "column"}}>
        <text style={{ fontSize: 46, fontWeight: 700, color: "#2B2A29" }}>
          Группы Лотов
        </text>
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="search-group"
          label="Поиск по названию группы"
          variant="outlined"
          style={{ marginBottom: 30, width: '100%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="Content" style={{ fontFamily: "Montserrat", paddingInline: 200 }}>
        <Table className="table-groupsInfo" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>№ Группы</TableCell>
              <TableCell>Название группы</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow
                key={group.id}
                hover
                onClick={() => navigate(`/supplier/grouplots/${group.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Groups;
