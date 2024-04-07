import React from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import "./styles.css";

function Contacts() {
  return (
    <div className="Contacts" style={{ backgroundColor:"#e9e9e9", flex: 1, height: "100%", width: "100%" }}>  
      <Header/>
      <div
        className="content-contacts"
        style={{
          paddingInline: 200,
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
          Контакты
        </text>
        <br /></div>
 <Carousel></Carousel>
    </div>
  );
}

export default Contacts;
