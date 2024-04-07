import React from "react";
import Header from "../../components/Header";
import "./styles.css";
import SignUpCard from "../../components/SignUpCard";

function SignUp() {
  return (
    <div
      style={{
        backgroundColor: "#e9e9e9",
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
        <SignUpCard />
      </div>
    </div>
  );
}

export default SignUp;
