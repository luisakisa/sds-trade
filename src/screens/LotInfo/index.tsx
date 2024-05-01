import React, { useEffect, useState } from "react";
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
import { lotsMiddleware } from "store/middlewares";
import { UnknownAction } from "@reduxjs/toolkit";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Position, Lot } from "interfaces/lots";
import { Role } from "interfaces/auth";

const columnHelper = createColumnHelper<Position>();

const getWidth = () => {
  return window.innerWidth;
};

function LotInfo() {
  const id = useParams<{ id: string }>().id;
  const dispatch = useDispatch();
  const lots: Lot[] = useSelector(Redux.Selectors.LotsSelectors.getState);
  const [status, setStatus] = useState("В работе");
  const [summ, setSumm] = useState(0);
  const [data, setData] = useState(() => [...lots]);
  const [selectedRequests, setSelectedRequests] = useState<
    Record<number, number>
  >({});
  const { role } = useSelector(Redux.Selectors.AuthSelectors.getState);

  const navigate = useNavigate();

  const getUniqueSuppliers = () => {
    const suppliers: Set<string> = new Set();
    lots[0].positions.forEach((position) => {
      {
        position.requests.forEach((request) => {
          suppliers.add(request.supplier);
        });
      }
    });
    return Array.from(suppliers);
  };

  const uniqueSuppliers = getUniqueSuppliers();

  useEffect(() => {
    if (lots !== data) {
      dispatch(lotsMiddleware() as unknown as UnknownAction);
      if (lots.length > 0) {
        const formattedLots = lots.filter((lot) => {
          return lot.id === Number(id);
        });
        setData(formattedLots);
        setStatus(
          formattedLots[0].status === "active" ? "В работе" : "Завершен"
        );
      }
    }
  }, [dispatch]);

  const firstColumn = [
    columnHelper.accessor("id", {
      header: () => "Позиции лота",
      cell: () => {
        const content =
          data[0].positions.length > 0 ? (
            <Table style={{ width: 300 }}>
              <TableHead style={{ paddingLeft: 20 }}>
                <TableRow style={{ height: 50 }}>
                  <TableCell>Наименование</TableCell>
                  <TableCell>руб./шт.</TableCell>
                  <TableCell> шт.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data[0].positions.map((req, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.price}</TableCell>
                    <TableCell>{req.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            "No offers"
          );

        return content;
      },
    }),
  ];
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    positionId: number,
    requestId: number
  ) => {
    const isChecked = event.target.checked;

    const price = data[0].positions
      .map((position) =>
        position.requests.find((request) => request.id === requestId)
      )
      .find((request) => request !== undefined)?.price;

    const quantity = data[0].positions
      .map((position) =>
        position.requests.find((request) => request.id === requestId)
      )
      .find((request) => request !== undefined)?.quantity;

    if (isChecked) {
      if (!selectedRequests[positionId]) {
        price && quantity && setSumm(summ + price * quantity);
        setSelectedRequests({
          ...selectedRequests,
          [positionId]: requestId,
        });
      }
    } else {
      if (selectedRequests[positionId]) {
        const updatedRequests = { ...selectedRequests };
        delete updatedRequests[positionId];
        setSelectedRequests(updatedRequests);
        price && quantity && setSumm(summ - price * quantity);
      }
    }
  };

  const columns: any[] = uniqueSuppliers.map((supplier) => ({
    id: supplier,
    header: () => supplier,
    cell: () => {
      const matchingRequests = data[0].positions.flatMap((position) =>
        position.requests.filter((req) => req.supplier === supplier)
      );

      const requestsContent =
        matchingRequests.length > 0 ? (
          <Table style={{ width: 200 }}>
            <TableHead style={{ paddingLeft: 50 }}>
              <TableRow style={{ height: 50 }}>
                {role === Role.SupplierSpecialist && <TableCell></TableCell>}
                <TableCell>Наименование</TableCell>
                <TableCell>руб./шт.</TableCell>
                <TableCell> шт.</TableCell>
                <TableCell> Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matchingRequests.map((req, index) => (
                <TableRow hover key={index}>
                  {role === Role.SupplierSpecialist && (
                    <Checkbox
                      disabled={
                        !!selectedRequests[
                          lots[0].positions.find((position) =>
                            position.requests.some(
                              (request) => request.id === req.id
                            )
                          )?.id ?? 0
                        ] &&
                        selectedRequests[
                          lots[0].positions.find((position) =>
                            position.requests.some(
                              (request) => request.id === req.id
                            )
                          )?.id ?? 0
                        ] !== req.id
                      }
                      checked={
                        !!selectedRequests[
                          lots[0].positions.find((position) =>
                            position.requests.some(
                              (request) => request.id === req.id
                            )
                          )?.id ?? 0
                        ]
                      }
                      onChange={(event) => {
                        const matchingPosition = lots[0].positions.find(
                          (position) =>
                            position.requests.some(
                              (request) => request.id === req.id
                            )
                        );
                        if (matchingPosition) {
                          handleCheckboxChange(
                            event,
                            matchingPosition.id,
                            req.id
                          );
                        }
                      }}
                    />
                  )}
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.price}</TableCell>
                  <TableCell>{req.quantity}</TableCell>
                  <TableCell>{req.quantity * req.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          "No offers"
        );

      return requestsContent;
    },
  }));

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data,
    columns: firstColumn.concat(columns),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleCloseLot = () => {
    setStatus("Завершен");
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
              width: "100%",
            }}
          >
            <text>Выбрано позиций: {Object.keys(selectedRequests).length}</text>
            <text>Общая сумма: {summ}</text>
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
                      style={{ border: "1px solid #ddd" }}
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
              !(
                Object.keys(selectedRequests).length ===
                data[0].positions.length
              )
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
