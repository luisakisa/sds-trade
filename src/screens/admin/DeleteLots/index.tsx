import React, { useEffect } from "react";
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
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { lotsMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { Lot } from "interfaces/lots";

const columnHelper = createColumnHelper<Lot>();
const getWidth = () => {
  return window.innerWidth;
};
const columns: any = [
  columnHelper.accessor("id", {
    header: () => "№ Лота",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("lotCreator", {
    header: () => "Создатель",
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
    cell: (info) => info.renderValue(),
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

function DeleteLots() {
  const nameGroup = useParams<{ name: string }>().name;
  const dispatch = useDispatch();
  const lots: Lot[] = useSelector(Redux.Selectors.LotsSelectors.getState);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([
    "В работе", "На оформлении", "Завершенные",
  ]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState(() => [...lots]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(lotsMiddleware() as unknown as UnknownAction);
    if (lots?.length > 0) {
      const filtered = lots.filter((lot) => {
        return lot.groupEts === nameGroup;
      });
      const formattedLots = filtered.map((lot) => ({
        ...lot,
        openDate: formatDate(lot.openDate),
        closeDate: formatDate(lot.closeDate),
      }));
      setData(formattedLots);
    }
  }, [dispatch]);

  useEffect(() => {
    if (lots !== data) {
      const filtered = lots.filter((lot) => {
        return (
          selectedStatuses.includes(lot.status) &&
          lot.groupEts === nameGroup &&
          lot.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      const formattedLots = filtered.map((lot) => ({
        ...lot,
        openDate: formatDate(lot.openDate),
        closeDate: formatDate(lot.closeDate),
      }));
      setData(formattedLots);
    }
  }, [lots, selectedStatuses, searchTerm]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
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
        <Header></Header>
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
          <text>Статус лота: {selectedStatuses.join(", ")}</text>
        </div>
        <div style={{ marginLeft: 200, marginTop: 20 }}>
          <TextField
            label="Поиск по названию"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: getWidth() - 202 }}
          />
        </div>
        <Table
          className="table-lotsInfo"
          style={{ marginLeft: 200, width: getWidth() - 200, marginTop: 20 }}
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
                  navigate(`/admin/lot/${row.original.id}`);
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
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("В работе")}
                  onChange={() => handleStatusChange("В работе")}
                />
                В работе
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("На оформлении")}
                  onChange={() => handleStatusChange("На оформлении")}
                />
                На оформлении
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes("Завершенные")}
                  onChange={() => handleStatusChange("Завершенные")}
                />
                Завершенные
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DeleteLots;
