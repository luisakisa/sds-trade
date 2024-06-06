import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "./styles.css";
import { Redux } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { lotsMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Lot } from "interfaces/lots";
import { getWidth } from "utils/width";

const columnHelper = createColumnHelper<Lot>();

const columns: any = [
  columnHelper.accessor("id", {
    header: () => "№ Лота",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "Название",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("openDate", {
    header: () => "Дата открытия",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("closeDate", {
    header: () => "Дата закрытия",
    cell: (info) => {
      const { row } = info;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{info.renderValue()}</span>
          {row.original.status === "В работе" && (
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // Add your logic to extend the lot here
                console.log(`Extend lot ${row.original.id}`);
              }}
            >
              Продлить лот
            </Button>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor("rules.paymentMethodId", {
    header: () => "Дней до конца",
    cell: (info) => {
      const { row } = info;
      const todayDate = new Date();
      const closeDate = new Date(
        row.original.closeDate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")
      );

      const differenceInTime = closeDate.getTime() - todayDate.getTime();

      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      return differenceInDays < 0 ? 0 : differenceInDays;
    },
  }),
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

function Lots() {
  const dispatch = useDispatch();
  const lots: Lot[] = useSelector(Redux.Selectors.LotsSelectors.getState);
  const [status, setStatus] = useState("В работе");
  const [data, setData] = useState<Lot[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(lotsMiddleware() as unknown as UnknownAction);
  }, [dispatch]);

  useEffect(() => {
    if (lots.length > 0) {
      const formattedLots = lots.map((lot) => ({
        ...lot,
        openDate: formatDate(lot.openDate),
        closeDate: formatDate(lot.closeDate),
      }));
      setData(formattedLots);
    }
  }, [lots]);

  useEffect(() => {
    const filteredLots = lots
      .filter((lot) => status === lot.status)
      .filter((lot) =>
        lot.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const formattedLots = filteredLots.map((lot) => ({
      ...lot,
      openDate: formatDate(lot.openDate),
      closeDate: formatDate(lot.closeDate),
    }));
    setData(formattedLots);
  }, [lots, status, searchTerm]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  return (
    <div
      className="Lot"
      style={{ display: "flex", height: "100%", width: "100%" }}
    >
      <div
        style={{
          flexGrow: 1,
          height: "100%",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Header />
        <div
          style={{
            height: 40,
            marginLeft: 200,
            marginTop: -20,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#f7f7f7",
            border: "2px solid #ddd",
          }}
        >
          <text>Статус лота: {status}</text>
        </div>
        <TextField
          label="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: 202, width: getWidth() - 202 }}
        />
        <Table
          className="table-lotsInfo"
          style={{ marginLeft: 200, width: getWidth() - 200 }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                style={{ border: "1px solid #ddd" }}
              >
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                hover
                key={row.id}
                onClick={() => {
                  navigate(`/lot/${row.original.id}`);
                }}
                style={{ border: "1px solid #ddd" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="Sidebar" style={{ border: "1px solid #ddd" }}>
          <FormControl component="fieldset" style={{ marginLeft: 16 }}>
            <FormLabel component="legend">Статус лота</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="В работе"
                control={<Radio />}
                label="В работе"
              />
              <FormControlLabel
                value="На оформлении"
                control={<Radio />}
                label="На оформлении"
              />
              <FormControlLabel
                value="Завершен"
                control={<Radio />}
                label="Завершенные"
              />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => navigate("/createlot")}
            style={{ marginLeft: 16, marginTop: 16 }}
            variant="outlined"
          >
            Создать лот
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Lots;
