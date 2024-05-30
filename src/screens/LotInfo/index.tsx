import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import "./styles.css";
import { Redux } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { lotMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Position, Requests } from "interfaces/lots";
import { Role } from "interfaces/auth";

const columnHelper = createColumnHelper<Position>();

// eslint-disable-next-line prefer-const
let selectedRequests: Record<number, number> = {};
let sum = 0;

const getWidth = () => {
  return window.innerWidth;
};

function LotInfo() {
  const id = useParams<{ id: string }>().id;
  const dispatch = useDispatch();
  const lot = useSelector(Redux.Selectors.LotSelectors.getState);
  const [status, setStatus] = useState("В работе");
  const [data, setData] = useState(lot);
  const { role } = useSelector(Redux.Selectors.AuthSelectors.getState);

  const navigate = useNavigate();

  const getUniqueSuppliers = () => {
    const suppliers: Set<string> = new Set();
    lot.requests.forEach((request) => {
      suppliers.add(request?.supplier?.name);
    });
    return Array.from(suppliers);
  };

  const uniqueSuppliers = getUniqueSuppliers();

  useEffect(() => {
    dispatch(lotMiddleware(Number(id)) as unknown as UnknownAction);
    setData(lot);
    setStatus(lot.lot.status);
  }, []);

  useEffect(() => {
    setData(lot);
    setStatus(lot.lot.status);
  }, [lot]);

  const firstColumn = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "Позиции лота",
        cell: (info: any) => {
          const position = info.row.original;
          return (
            <Table style={{ width: "100%" }}>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: "33%" }}>
                    {position.itemName}
                  </TableCell>
                  <TableCell style={{ width: "33%" }}>
                    {position.priceForOne}
                  </TableCell>
                  <TableCell style={{ width: "33%" }}>
                    {position.count}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        },
      }),
    ],
    [data]
  );

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    positionId: number,
    requestId: number,
    count: number,
    priceForOne: number
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!selectedRequests[positionId]) {
        priceForOne && count && (sum = sum + priceForOne * count);
        selectedRequests[positionId] = requestId;
        console.log(selectedRequests);
      }
    } else {
      if (selectedRequests[positionId]) {
        delete selectedRequests[positionId];
        priceForOne && count && (sum = sum - priceForOne * count);
      }
    }
  };

  const getMinTotalPrices = () => {
    const minPrices: Record<number, number> = {};
    data.positions.forEach((position) => {
      const minPrice = Math.min(
        ...data.requests
          .filter((req) => req.positionId === position.id)
          .map((req) => req.priceForOne * req.count)
      );
      minPrices[position.id] = minPrice;
    });
    return minPrices;
  };

  const minTotalPrices = getMinTotalPrices();

  const columns: any[] = useMemo(
    () =>
      uniqueSuppliers.map((supplier) => ({
        id: supplier,
        header: () => supplier,
        cell: (info: any) => {
          const position = info.row.original;
          const matchingRequests = data.requests?.filter(
            (req: Requests) =>
              req.supplier?.name === supplier && req.positionId === position.id
          );
          const requestsContent =
            matchingRequests.length > 0 ? (
              matchingRequests.map((req, index) => (
                <TableRow hover key={index}>
                  {role === Role.SupplierSpecialist && (
                    <TableCell>
                      <Checkbox
                        disabled={
                          selectedRequests[req.positionId] !== undefined &&
                          req.id !== selectedRequests[req.positionId]
                        }
                        checked={req.id === selectedRequests[req.positionId]}
                        onChange={(event) => {
                          handleCheckboxChange(
                            event,
                            req.positionId,
                            req.id,
                            req.count,
                            req.priceForOne
                          );
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell style={{ width: "25%" }}>{req.itemName}</TableCell>
                  <TableCell style={{ width: "25%" }}>
                    {req.priceForOne}
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>{req.count}</TableCell>
                  <TableCell
                    style={{
                      width: "25%",
                      border:
                        req.priceForOne * req.count ===
                        minTotalPrices[req.positionId]
                          ? "2px solid green"
                          : "1px solid #ddd",
                    }}
                  >
                    {req.priceForOne * req.count}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={role === Role.SupplierSpecialist ? 5 : 4}
                  style={{ textAlign: "center" }}
                >
                  No offers
                </TableCell>
              </TableRow>
            );

          return (
            <Table style={{ width: "100%" }}>
              <TableBody>{requestsContent}</TableBody>
            </Table>
          );
        },
      })),
    [data, selectedRequests]
  );

  const table = useReactTable({
    data: data.positions,
    columns: firstColumn.concat(columns),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCloseLot = () => {
    setStatus("Завершен");
    dispatch(Redux.Actions.Lots.completeLot(Number(id)));
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
            flex: 1,
            minHeight: 40,
            marginLeft: 200,
            marginTop: -20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            border: "1px solid #ddd",
            padding: 20,
            backgroundColor: "#f7f7f7",
          }}
        >
          <text>Статус лота: {status}</text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 10,
              flex: 1,
              width: "90%",
            }}
          >
            <text>Выбрано позиций: {Object.keys(selectedRequests).length}</text>
            <text>Общая сумма: {sum}</text>
          </div>
        </div>
        <div
          style={{
            overflowX: "auto",
            marginLeft: 200,
            width: getWidth() - 200,
          }}
        >
          <Table
            className="table-lotsInfo"
            style={{ border: "1px solid #ddd", width: getWidth() - 200 }}
            padding="normal"
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{ textAlign: "center", border: "1px solid #ddd" }}
                    >
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ border: "1px solid #ddd", textAlign: "center" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {role === Role.SupplierSpecialist && (
          <Button
            disabled={
              !(Object.keys(selectedRequests).length === data.positions?.length)
            }
            variant="contained"
            onClick={handleCloseLot}
          >
            Завершить лот
          </Button>
        )}
        <div className="Sidebar">
          <ul>
            <li>
              <a href="#" onClick={() => navigate("/lots")}>
                Вернуться к лотам
              </a>
            </li>
            <li>
              <Button onClick={() => navigate("/createlot")}>Создать</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LotInfo;
