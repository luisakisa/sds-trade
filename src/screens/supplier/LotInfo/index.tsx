import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from "@mui/material";
import iconSrc from "assets/icon/plus.svg";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { lotMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { List, Position, Requests } from "interfaces/lots";
import { Redux } from "store";
import { HandySvg } from "handy-svg";

interface RequestsState {
  [key: number]: Requests[];
}

function LotRequest() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const lot = useSelector(Redux.Selectors.LotSelectors.getState);
  const [data, setData] = useState(lot);
  const [requests, setRequests] = useState<RequestsState>({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(lotMiddleware(Number(id)) as unknown as UnknownAction);
    setData(lot);
  }, [id]);

  useEffect(() => {
    setData(lot);
  }, [lot]);

  const addRequest = (positionId: number) => {
    setRequests((prev: any) => ({
      ...prev,
      [positionId]: [...(prev[positionId] || []), { amount: "" }],
    }));
  };

  const handleInputChange = (positionId: number, index: number, event: any) => {
    const value = event.target.value;
    setRequests((prev: any) => {
      const newRequests = { ...prev };
      newRequests[positionId][index].amount = value;
      return newRequests;
    });
  };

  const handleSaveRequests = () => {
    console.log("Saving requests", requests);
    // Example API call to save requests
  };

  return (
    <div className="GroupLotDetails">
      <Header />
      <div
        className="content-contacts"
        style={{
          paddingInline: 200,
          fontFamily: "Montserrat",
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <text style={{ fontSize: 40, fontWeight: 700, color: "#2B2A29" }}>
          Лот &quot;{data.lot.name}&quot;
        </text>
        <br />
        <br />
        <br />
      </div>
      <div
        className="Content"
        style={{ fontFamily: "Montserrat", paddingInline: 200 }}
      >
        <Table className="table-lotsInfo" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Название лота</TableCell>
              <TableCell>Дата открытия</TableCell>
              <TableCell>Дата закрытия</TableCell>
              <TableCell>Добавить заявку</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.positions?.map((position) => (
              <React.Fragment key={position.id}>
                <TableRow>
                  <TableCell>{position.itemName}</TableCell>
                  <TableCell>{position.count}</TableCell>
                  <TableCell>{position.unitName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => addRequest(position.id)}>
                      <HandySvg
                        src={iconSrc}
                        className="plus-icon"
                        height={24}
                        width={24}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {requests[position.id]?.map(
                  (request: Requests, index: number) => (
                    <TableRow key={`${position.id}-${index}`}>
                      <TableCell colSpan={3}>
                        <TextField
                          label="Наименование"
                          value={request.count}
                          onChange={(event) =>
                            handleInputChange(position.id, index, event)
                          }
                          fullWidth
                        />
                        <TextField
                          label="Стоимость"
                          value={request.count}
                          onChange={(event) =>
                            handleInputChange(position.id, index, event)
                          }
                          fullWidth
                        />
                        <TextField
                          label="Количество"
                          value={request.count}
                          onChange={(event) =>
                            handleInputChange(position.id, index, event)
                          }
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          onClick={handleSaveRequests}
          style={{ margin: "20px" }}
        >
          Сохранить заявки
        </Button>
      </div>
    </div>
  );
}

export default LotRequest;
