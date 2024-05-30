import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { getGroups } from "api/groups";
import { Group } from "interfaces/groups";
import { useNavigate } from "react-router-dom";
import { HandySvg } from "handy-svg";
import iconSrc from "assets/icon/plus.svg";
import { nanoid } from "@reduxjs/toolkit";
import { addLot } from "api/lots";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Redux } from "store";

function CreateLot() {
  const [name, setName] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [inputRows, setInputRows] = useState<
    { id: number; inputs: string[] }[]
  >([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedGroupId, setSelectedGroupId] = useState<number>(2);
  const [comment, setComment] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { email } = useSelector(Redux.Selectors.AuthSelectors.getState);

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

  const handleAddRow = () => {
    setInputRows([
      ...inputRows,
      {
        id: Date.now(),
        inputs: [
          "Наименование",
          "Стоимость",
          "Количество",
          "Единица измерения",
        ],
      },
    ]);
  };

  const handleInputChange = (
    rowId: number,
    inputIndex: number,
    value: string
  ) => {
    setInputRows(
      inputRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              inputs: row.inputs.map((input, index) =>
                index === inputIndex ? value : input
              ),
            }
          : row
      )
    );
  };

  const handleRemoveRow = (rowId: number) => {
    setInputRows(inputRows.filter((row) => row.id !== rowId));
  };

  const handleSubmit = async () => {
    try {
      const response = await addLot({
        canOwnWay: true,
        closeDate: endDate,
        groupEtsId: selectedGroupId,
        lotCreatorId: 1,
        lotFiles: [
          {
            lotId: 1,
            path: "1/1",
          },
        ],
        name,
        openDate: startDate,
        positions: inputRows.map((row) => ({
          count: Number(row.inputs[2]),
          itemName: row.inputs[0],
          priceForOne: Number(row.inputs[1]),
          unitName: row.inputs[3],
        })),
        rules: {
          comment,
          paymentMethodId: 1,
          shippingMethodId: 1,
        },
        statusId: 1,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/lots");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Profile">
      <Header />
      <div
        className="content-contacts"
        style={{ paddingInline: 200, fontFamily: "Montserrat", marginTop: 20 }}
      >
        <text style={{ fontSize: 46, fontWeight: 700, color: "#2B2A29" }}>
          Создание лота
        </text>
      </div>
      <div className="Content" style={{ fontFamily: "Montserrat" }}>
        <List sx={{ width: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Наименование"
            style={{ marginBottom: 30, marginRight: 30, width: 400 }}
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            type="date"
            helperText={"Дата открытия"}
            style={{ marginBottom: 30, marginRight: 30 }}
            size="small"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            type="date"
            helperText={"Дата завершения"}
            style={{ marginBottom: 30, marginRight: 30 }}
            size="small"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <FormControl size="small" style={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label" size="small">
              Группа лота
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Группа лота"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                  value="pickup"
                  control={<Radio />}
                  label="Самовывоз"
                />
                <FormControlLabel
                  value="supplier"
                  control={<Radio />}
                  label="Поставщиком"
                />
                <FormControlLabel
                  value="transport-company"
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
                  value="prepayment"
                  control={<Radio />}
                  label="Предоплата"
                />
                <FormControlLabel
                  value="on-delivery"
                  control={<Radio />}
                  label="По факту поставки"
                />
                <FormControlLabel
                  value="deferred-payment"
                  control={<Radio />}
                  label="Отсрочка платежа"
                />
              </RadioGroup>
            </div>
          </div>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Разрешить предлагать свои способы оплаты и доставки"
          />
          {inputRows.map((row, rowIndex) => (
            <div key={row.id} className="input-row" style={{ paddingTop: 20 }}>
              <label>Позиция {rowIndex + 1}</label>
              <br />
              <br />
              {row.inputs.map((input, inputIndex) => (
                <TextField
                  key={inputIndex}
                  id={`input-${rowIndex}-${inputIndex}`}
                  onChange={(e) =>
                    handleInputChange(row.id, inputIndex, e.target.value)
                  }
                  label={input}
                  style={{ marginBottom: 30, marginRight: 30 }}
                  size="small"
                />
              ))}
              <Button
                variant="contained"
                onClick={() => handleRemoveRow(row.id)}
                style={{ marginBottom: 30, marginRight: 30, backgroundColor:"#f56464" }}
              >
                Удалить
              </Button>
            </div>
          ))}

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              marginTop: 10,
            }}
          >
            <button className="add-row-button" onClick={handleAddRow}>
              <HandySvg
                src={iconSrc}
                className="plus-icon"
                height={24}
                width={24}
              />
            </button>
            <span className="add-row-label">Добавить позицию</span>
          </div>
        </List>
        <Button variant="contained" onClick={handleSubmit}>
          Создать
        </Button>
      </div>
    </div>
  );
}

export default CreateLot;
