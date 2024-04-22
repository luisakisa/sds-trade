import React from "react";
import Header from "../../components/Header";
import "./styles.css";

function About() {
  return (
    <div className="About">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        <text
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: "#2B2A29",
          }}
        >
          О компании
        </text>
        <br />
        <text
          style={{
            fontSize: 26,
            color: "#2B2A29",
          }}
        >
          Профиль предприятия ООО ТД «СДС-Трейд»:
        </text>
        <br />
        <div style={{ marginTop: 30, color: "#2B2A29" }}>
          <text>
            Обеспечение поставок материально технических ресурсов для
            предприятий, входящих в
            <a href="http://sds-ugol.ru"> АО ХК «СДС-Уголь»</a>.
          </text>
        </div>
      </div>
    </div>
  );
}

export default About;
