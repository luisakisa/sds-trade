import React from "react";
import Header from "components/Header";
import Carousel from "components/Carousel";
import "./styles.css";

function Contacts() {
  return (
    <div className="Contacts">
      <Header />
      <div className="content-contacts">
        <h1 className="contacts-title">Контакты</h1>
        <div >
        <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
