import * as XLSX from "xlsx";
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
import iconSrc from "assets/icon/arrowLeftRounded.svg";
import { getWidth } from "utils/width";
import { HandySvg } from "handy-svg";
import { updateLot } from "api/lots";
import { updatePositionsById } from "api/positions";

const columnHelper = createColumnHelper<Position>();

function LotInfo() {
  const lotId = useParams<{ id: string }>().id;
  const dispatch = useDispatch();
  const lot = useSelector(Redux.Selectors.LotSelectors.getState);
  const [status, setStatus] = useState("В работе");
  const [data, setData] = useState(lot);
  const { role, id } = useSelector(Redux.Selectors.AuthSelectors.getState);
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
    dispatch(lotMiddleware(Number(lotId)) as unknown as UnknownAction);
    role === Role.Supplier && lot.requests.filter((req: Requests) => req.supplier?.id === id);
    setData(lot);
    setStatus(lot.lot.status);
  }, []);

  useEffect(() => {
    setData(lot);
    setStatus(lot.lot.status);
  }, [lot]);

  useEffect(() => {
    if (status === "Завершен") {
      const initialSelectedRequests: Record<number, number> = {};
      let initialSum = 0;
      lot.positions.forEach((position) => {
        if (position.winner) {
          const winningRequests = lot.requests.filter(
            (request) =>
              request.supplier.id === position.winner &&
              request.positionId === position.id
          );
          winningRequests.forEach((winningRequest) => {
            initialSelectedRequests[winningRequest.positionId] =
              winningRequest.id;
            initialSum += winningRequest.priceForOne * winningRequest.count;
          });
        }
      });
      setSelectedRequests(initialSelectedRequests);
      setSum(initialSum);
    }
  }, [status, lot]);

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

          const filteredRequests =
            status === "Завершен"
              ? matchingRequests.filter(
                  (req) => req.id === selectedRequests[req.positionId]
                )
              : matchingRequests;

          const requestsContent =
            filteredRequests.length > 0 ? (
              filteredRequests.map((req, index) => (
                <TableRow hover key={index}>
                  {role === Role.SupplierSpecialist && (
                    <TableCell style={{ border: "none", width: "10%" }}>
                      {status !== "Завершен" && (
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
                      )}
                      {status === "Завершен" &&
                        req.id === selectedRequests[req.positionId] && (
                          <Checkbox checked={true} disabled />
                        )}
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
                  style={{ textAlign: "center" }}
                >
                  Нет заявок
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
    [data, selectedRequests, status]
  );

  const table = useReactTable({
    data: data.positions,
    columns: firstColumn.concat(columns),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCloseLot = async() => {
    setStatus("Завершен");
    await updateLot(Number(lotId),{
      statusId: 3,
    rules: {
      }
    });
    const entries = Object.entries(selectedRequests); 

    await Promise.all(entries.map(async ([positionId, value]) => {
      await updatePositionsById(Number(positionId), value);
    }));
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Header: "ID Лота", Data: data.lot.id },
      { Header: "Название", Data: data.lot.name },
      { Header: "Создатель", Data: data.lot.lotCreator },
      { Header: "Дата открытия", Data: data.lot.openDate },
      { Header: "Дата закрытия", Data: data.lot.closeDate },
      { Header: "Статус", Data: data.lot.status },
    ]);

    XLSX.utils.sheet_add_json(
      ws,
      [
        {
          Header: "ID",
          Header2: "Наименование",
          Header3: "Цена за шт.",
          Header4: "Количество",
          Header5: "Поставщик",
          Header6: "Общая стоимость",
        },
        ...data.requests.map((req) => ({
          Header: req.positionId,
          Header2: req.itemName,
          Header3: req.priceForOne,
          Header4: req.count,
          Header5: req.supplier?.name,
          Header6: req.priceForOne * req.count,
        })),
      ],
      { skipHeader: true, origin: "A8" }
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lot Info");

    XLSX.writeFile(wb, `Lot_${data.lot.id}.xlsx`);
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
            border: "1px solid #ddd",
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
            <text style={{ color: "#1565c0", fontWeight: "700" }}>
              Выбрано позиций: {Object.keys(selectedRequests).length}
            </text>
            <text style={{ color: "#1565c0", fontWeight: "700" }}>
              Общая сумма: {sum}
            </text>
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
        <div
          style={{
            marginLeft: 200,
            display: "flex",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <Button
            fullWidth={false}
            variant="contained"
            style={{ backgroundColor: "#4CAF50", marginRight: 16 }}
            onClick={handleExport}
          >
            Экспорт в Excel
          </Button>
          {role === Role.SupplierSpecialist && status === "В работе" && (
            <Button
              fullWidth={false}
              disabled={!(Object.keys(selectedRequests).length > 0)}
              variant="contained"
              onClick={handleCloseLot}
            >
              Завершить лот
            </Button>
          )}
        </div>
        <div
          className="Sidebar"
          style={{ border: "1px solid #ddd", width: 200 }}
        >
          <ul>
            <li>
              <a
                href="#"
                onClick={() => navigate("/lots")}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <HandySvg
                  src={iconSrc}
                  className="plus-icon"
                  height={18}
                  width={18}
                />
                <text style={{ marginLeft: 8 }}>Вернуться к лотам</text>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LotInfo;
