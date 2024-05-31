import React, { useEffect, useState, useMemo } from "react";
import Header from "components/Header";
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
import { deleteLot } from "api/lots";

const columnHelper = createColumnHelper<Position>();

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
  const [selectedRequests, setSelectedRequests] = useState<
    Record<number, number>
  >({});
  const [sum, setSum] = useState(0);

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
        header: () => (
          <>
            <Table style={{ border: "1px solid #ddd" }}>Позиции лота</Table>
            <TableRow
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <TableCell style={{ border: "none", width: "60%" }}>
                Наименование
              </TableCell>
              <TableCell style={{ border: "none", width: "20%" }}>
                Руб/Шт
              </TableCell>
              <TableCell style={{ border: "none", width: "20%" }}>
                Шт.
              </TableCell>
            </TableRow>
          </>
        ),
        cell: (info: any) => {
          const position = info.row.original;
          return (
            <Table style={{ width: "100%" }}>
              <TableRow>
                <TableCell style={{ width: "60%", border: "none" }}>
                  {position.itemName}
                </TableCell>
                <TableCell style={{ width: "20%", border: "none" }}>
                  {position.priceForOne}
                </TableCell>
                <TableCell style={{ width: "20%", border: "none" }}>
                  {position.count}
                </TableCell>
              </TableRow>
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

    setSelectedRequests((prevSelectedRequests) => {
      const newSelectedRequests = { ...prevSelectedRequests };

      if (isChecked) {
        if (!newSelectedRequests[positionId]) {
          newSelectedRequests[positionId] = requestId;
          setSum((prevSum) => prevSum + priceForOne * count);
        }
      } else {
        if (newSelectedRequests[positionId]) {
          delete newSelectedRequests[positionId];
          setSum((prevSum) => prevSum - priceForOne * count);
        }
      }

      return newSelectedRequests;
    });
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
        header: () => (
          <>
            <Table
              style={{
                border: "1px solid #ddd",
                backgroundColor: "#ffffff",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/supplierInfo/${
                    data.requests?.find(
                      (req: Requests) => req.supplier?.name === supplier
                    )?.supplier?.id
                  }`
                )
              }
            >
              {supplier}
            </Table>
            <TableRow>
              {role === Role.SupplierSpecialist && (
                <TableCell style={{ border: "none", width: "10%" }}></TableCell>
              )}
              <TableCell style={{ border: "none", width: "60%" }}>
                Наименование
              </TableCell>
              <TableCell style={{ border: "none", width: "10%" }}>
                Руб/Шт
              </TableCell>
              <TableCell style={{ border: "none", width: "10%" }}>
                Шт.
              </TableCell>
              <TableCell style={{ border: "none", width: "10%" }}>
                Общая стоимость
              </TableCell>
            </TableRow>
          </>
        ),
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
                    <TableCell style={{ border: "none", width: "10%" }}>
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
                  <TableCell style={{ width: "60%", border: "none" }}>
                    {req.itemName}
                  </TableCell>
                  <TableCell style={{ width: "10%", border: "none" }}>
                    {req.priceForOne}
                  </TableCell>
                  <TableCell style={{ width: "10%", border: "none" }}>
                    {req.count}
                  </TableCell>
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
                  style={{ textAlign: "center", border: "none" }}
                >
                  Нет предложений
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

  const handleDelete = async () => {
    await deleteLot(Number(id)).then(() => {
      navigate(-1);
    });
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
            variant="contained"
            style={{ backgroundColor: "#f56464" }}
            onClick={handleDelete}
          >
            Удалить лот
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
