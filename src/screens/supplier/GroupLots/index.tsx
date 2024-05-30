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
import { useParams } from "react-router-dom";
import { getLotsByGroup } from "api/lots";
import { Lot } from "interfaces/lots";
import { useNavigate } from "react-router-dom";

function GroupLots() {
  const { id } = useParams();
  const [lots, setLots] = useState<Lot[]>([]);
  const [filteredLots, setFilteredLots] = useState<Lot[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const lotData = await getLotsByGroup(Number(id));
        setLots(lotData);
        setFilteredLots(lotData);
      } catch (error: any) {
        console.error("Ошибка при получении данных о лотах:", error.message);
      }
    };

    fetchLots();
  }, [id]);

  useEffect(() => {
    const results = lots.filter((lot) =>
      lot.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLots(results);
  }, [searchTerm, lots]);

  return (
    <div className="GroupLotDetails">
      <Header />
      <div className="content-contacts" style={{ paddingInline: 200, fontFamily: "Montserrat", marginTop: 50, display: "flex", flexDirection: "column" }}>
        <text style={{ fontSize: 46, fontWeight: 700, color: "#2B2A29" }}>
          Лоты Группы {id}
        </text>
        <br></br>
        <br></br>
        <br></br>
        <TextField
          id="search-lot"
          label="Поиск по названию лота"
          variant="outlined"
          style={{ marginBottom: 30, width: '100%' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="Content" style={{ fontFamily: "Montserrat", paddingInline: 200 }}>
        <Table className="table-lotsInfo" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>№ Лота</TableCell>
              <TableCell>Название лота</TableCell>
              <TableCell>Дата открытия</TableCell>
              <TableCell>Дата закрытия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLots.map((lot) => (
              <TableRow
                key={lot.id}
                hover
                onClick={() => navigate(`/lot/${lot.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{lot.id}</TableCell>
                <TableCell>{lot.name}</TableCell>
                <TableCell>{lot.openDate}</TableCell>
                <TableCell>{lot.closeDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default GroupLots;
