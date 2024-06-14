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
  TextareaAutosize,
} from "@mui/material";
import { getGroups } from "api/groups";
import { Group } from "interfaces/groups";
import { useNavigate } from "react-router-dom";
import { HandySvg } from "handy-svg";
import iconSrc from "assets/icon/plus.svg";
import { addLot } from "api/lots";
import { useSelector } from "react-redux";
import { Redux } from "store";
import * as XLSX from "xlsx";
import { getPaymentMethods } from "api/paymentMethods";
import { getShippingMethods } from "api/shippingMethods";

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
  const { id } = useSelector(Redux.Selectors.AuthSelectors.getState);
  const [canOwnWay, setCanOwnWay] = useState<boolean>(true);
  const [paymentMethods, setPaymentMethods] = useState<
    { id: number; name: string }[]
  >([]);
  const [shippingMethods, setShippingMethods] = useState<
    { id: number; name: string }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const paymentMethodsData = await getPaymentMethods();
        setPaymentMethods(paymentMethodsData);
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о методах оплаты:",
          error.message
        );
      }
    };

    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const shippingMethodsData = await getShippingMethods();
        setShippingMethods(shippingMethodsData);
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о методах доставки:",
          error.message
        );
      }
    };

    fetchShippingMethods();
  }, []);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e?.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const newRows = json.slice(1).map((row: any) => ({
          id: Date.now() + Math.random(),
          inputs: row,
        }));
        setInputRows((prevRows) => [...prevRows, ...newRows]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await addLot({
        canOwnWay,
        closeDate: endDate,
        groupEtsId: selectedGroupId,
        lotCreatorId: id,
        filePath: "1/1",
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
          paymentMethodId:1,
          shippingMethodId: 3,
        },
        statusId: 1,
      });
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
              onChange={(e) => {
                setSelectedGroup(e.target.value);
              }}
            >
              {groups.map((group) => (
                <MenuItem
                  key={group.id}
                  value={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                >
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
                {shippingMethods.map((method: { id: number; name: string }) => (
                  <FormControlLabel
                    key={method.id}
                    value={method.id}
                    control={<Radio />}
                    label={method.name}
                  />
                ))}
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
                {paymentMethods.map((method: { id: number; name: string }) => (
                  <FormControlLabel
                    key={method.id}
                    value={method.id}
                    control={<Radio />}
                    label={method.name}
                  />
                ))}
              </RadioGroup>
            </div>
          </div>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Разрешить предлагать свои способы оплаты и доставки"
            onChange={() => setCanOwnWay(!canOwnWay)}
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
                style={{
                  marginBottom: 30,
                  marginRight: 30,
                  backgroundColor: "#f56464",
                }}
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
          <div style={{ marginTop: 20 }}>
            <input
              accept=".xlsx, .xls"
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Импортировать из Excel
              </Button>
            </label>
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
