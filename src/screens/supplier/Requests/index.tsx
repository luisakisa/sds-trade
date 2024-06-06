import * as XLSX from "xlsx";
import React, { useEffect, useState, useMemo } from "react";
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
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getListForSupplierByEmail } from "api/lots";
import { List, Position, Requests } from "interfaces/lots";

const columnHelper = createColumnHelper<Position>();

const getWidth = () => {
  return window.innerWidth;
};

function LotRequests() {
  const id = useParams<{ id: string }>().id;
  const dispatch = useDispatch();
  const list = useSelector(Redux.Selectors.LotSelectors.getState);
  const [status, setStatus] = useState("В работе");
  const [data, setData] = useState<List>(list);
  const { email } = useSelector(Redux.Selectors.AuthSelectors.getState);
  const [selectedRequests, setSelectedRequests] = useState<
    Record<number, number>
  >({});
  const [sum, setSum] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const listData = await getListForSupplierByEmail(email ?? "", Number(id));
        setData(listData);
        setStatus(listData.list.status);
      } catch (error: any) {
        console.error("Ошибка при получении данных о группах:", error.message);
      }
    };

    fetchList();
  }, [dispatch]);

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
  const getUniqueSuppliers = () => {
    const suppliers: Set<string> = new Set();
    list.requests.forEach((request: Requests) => {
      suppliers.add(request?.supplier?.name);
    });
    return Array.from(suppliers);
  };

  const uniqueSuppliers = getUniqueSuppliers();

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
              {/* {supplier} */}
            </Table>
            <TableRow>
              <TableCell style={{ border: "none", width: "10%" }}></TableCell>
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
                  colSpan={5}
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

  const handleCloseLot = () => {
    setStatus("Завершен");
    dispatch(Redux.Actions.Lots.completeLot(Number(id)));
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
            className="table-listsInfo"
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
        <Button
          variant="contained"
          style={{ backgroundColor: "#4CAF50" }}
          onClick={handleExport}
        >
          Экспорт в Excel
        </Button>
        <div className="Sidebar">
          <ul>
            <li>
              <a href="#" onClick={() => navigate(-1)}>
                Вернуться к лотам
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LotRequests;
