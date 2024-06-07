import React, { useEffect, useState } from "react";
import Header from "components/Header"; 
import "./style.css";
import { getSupplier } from "api/supplier";
import { useParams } from "react-router-dom";
import Profile from "assets/icon/profile.svg";
import { HandySvg } from "handy-svg";

interface Supplier {
  firstName: string;
  lastName: string;
  middleName: string;
  company: string;
  email: string;
  kpp: string;
  inn: string;
  regionOrAddress: string;
  id: number;
}

function SupplierInfo() {
  const id = useParams<{ id: string }>().id;
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const groupData = await getSupplier(Number(id));
        setSupplier(groupData);
      } catch (error: any) {
        console.error(
          "Ошибка при получении данных о пользователе:",
          error.message
        );
      }
    };

    fetchSupplier();
  }, []);

  return (
    <div className="supplier-info-container">
      <Header />
      <div
        className="supplier-info-content"
        style={{
          paddingInline: 200,
          fontFamily: "Montserrat",
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <text style={{ fontSize: 40, fontWeight: 700,          fontFamily: "sans-serif",
 color: "#2B2A29" }}>
          Информация о поставщике
        </text>
        <HandySvg
          src={Profile}
          height={100}
          width={100}
          color="none"
          background="none"
          fill="none"
        />
        <table className="supplier-info-table">
          <tbody>
            <tr>
              <td className="label">Имя:</td>
              <td className="value">{supplier?.firstName}</td>
            </tr>
            <tr>
              <td className="label">Фамилия:</td>
              <td className="value">{supplier?.lastName}</td>
            </tr>
            <tr>
              <td className="label">Отчество:</td>
              <td className="value">{supplier?.middleName}</td>
            </tr>
            <tr>
              <td className="label">Регион/адрес:</td>
              <td className="value">{supplier?.regionOrAddress}</td>
            </tr>
            <tr>
              <td className="label">Компания:</td>
              <td className="value">{supplier?.company}</td>
            </tr>
            <tr>
              <td className="label">Email:</td>
              <td className="value">{supplier?.email}</td>
            </tr>

            <tr>
              <td className="label">ИНН:</td>
              <td className="value">{supplier?.inn}</td>
            </tr>
            <tr>
              <td className="label">КПП:</td>
              <td className="value">{supplier?.kpp}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierInfo;
