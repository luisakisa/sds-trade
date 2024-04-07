import React from "react";
import Header from "../../components/Header";
import "./styles.css";
import AuthCard from "../../components/AuthCard";

function Auth() {
  return (
    <div
      style={{
        backgroundColor: "#e9e9e9",
        height: "100%",
        width: "100%",
      }}
    >
      <Header />
      <div
        className="Auth"
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AuthCard />
      </div>
    </div>
  );
}

export default Auth;
