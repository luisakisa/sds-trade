import React from "react";
import Header from "../../components/Header";
import "./styles.css";
import { Redux } from "store";
import { useSelector } from "react-redux";

function CreateLot() {
  const {role } = useSelector(Redux.Selectors.AuthSelectors.getState);
  return (
    <div className="CreateLot">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        <text>{role}</text>
      </div>
    </div>
  );
}

export default CreateLot;
