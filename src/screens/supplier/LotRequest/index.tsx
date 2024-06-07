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
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import iconSrc from "assets/icon/plus.svg";
import deleteIconSrc from "assets/icon/minus.svg";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { lotMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { Requests } from "interfaces/lots";
import { Redux } from "store";
import { HandySvg } from "handy-svg";
import { addRequests } from "api/requests";

interface RequestsState {
  [key: number]: Requests[];
}

function LotRequest() {
  const lotId = useParams<{ id: string }>().id;
  const dispatch = useDispatch();
  const lot = useSelector(Redux.Selectors.LotSelectors.getState);
  const [data, setData] = useState(lot);
  const [requests, setRequests] = useState<RequestsState>({});
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { id } = useSelector(Redux.Selectors.AuthSelectors.getState);

  useEffect(() => {
    dispatch(lotMiddleware(Number(lotId)) as unknown as UnknownAction);
    setData(lot);
  }, [lotId]);

  useEffect(() => {
    setData(lot);
  }, [lot]);

  const addRequest = (positionId: number) => {
    setRequests((prev: any) => ({
      ...prev,
      [positionId]: [
        ...(prev[positionId] || []),
        { priceForOne: "", count: "", itemName: "", deliveryTime: "" },
      ],
    }));
  };

  const removeRequest = (positionId: number, index: number) => {
    setRequests((prev: any) => {
      const newRequests = { ...prev };
      newRequests[positionId].splice(index, 1);
      if (newRequests[positionId].length === 0) {
        delete newRequests[positionId];
      }
      return newRequests;
    });
  };

  const handleInputChange = (
    positionId: number,
    index: number,
    field: string,
    value: string
  ) => {
    setRequests((prev: any) => {
      const newRequests = { ...prev };
      newRequests[positionId][index][field] = value;
      return newRequests;
    });
  };

  const handleSaveRequests = async () => {
    try {
      for (const positionId in requests) {
        const requestData = {
          data: requests[positionId],
          requestFiles: {
            path: "/path/to/file",
            supplierId: id,
          },
          requestRules: {
            comment,
            paymentMethodId: 1,
            shippingMethodId: 1,
            paymentValue: 1000,
          },
        };
        await addRequests(Number(lotId), Number(positionId), requestData);
      }
      alert("Requests saved successfully!");
      navigate(`/lot/${lotId}`);
    } catch (error) {
      console.error("Error saving requests:", error);
      alert("Failed to save requests.");
    }
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
              <TableCell>Название позиции</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Единица измерения</TableCell>
              <TableCell>Стоимость (без НДС)</TableCell>
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
                  <TableCell>{position.priceForOne}</TableCell>
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
                          value={request.itemName}
                          onChange={(event) =>
                            handleInputChange(
                              position.id,
                              index,
                              "itemName",
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                        <TextField
                          label="Стоимость"
                          value={request.priceForOne}
                          onChange={(event) =>
                            handleInputChange(
                              position.id,
                              index,
                              "priceForOne",
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                        <TextField
                          label="Количество"
                          value={request.count}
                          onChange={(event) =>
                            handleInputChange(
                              position.id,
                              index,
                              "count",
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                        <TextField
                          label="Дней доставки"
                          value={request.deliveryTime}
                          onChange={(event) =>
                            handleInputChange(
                              position.id,
                              index,
                              "deliveryTime",
                              event.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => removeRequest(position.id, index)}
                        >
                          <HandySvg
                            src={deleteIconSrc}
                            className="delete-icon"
                            height={24}
                            width={24}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <br />
        <br />
        <label>Общая информация: </label>
        <br />
        <br />
        <TextareaAutosize
          minRows={3}
          placeholder="Комментарий"
          style={{
            marginBottom: 30,
            marginRight: 30,
            width: "100%",
            fontFamily: "Montserrat",
            fontSize: 16,
            padding: 10,
            boxSizing: "border-box",
          }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="radio-group">
          <div>
            <label>Способ доставки: </label>
            <RadioGroup
              aria-label="delivery-method"
              name="delivery-method"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Самовывоз"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Поставщиком"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Транспортной компанией"
              />
            </RadioGroup>
          </div>
          <div style={{ marginTop: 20 }}>
            <label>Способ оплаты: </label>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Предоплата"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="По факту поставки"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Отсрочка платежа"
              />
            </RadioGroup>
          </div>
        </div>
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
