import React, { useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import TextField from "@mui/material/TextField";

function Profile() {
  const [name, setName] = useState<string>("");

  return (
    <div className="Profile">
      <Header></Header>
      <div
        className="Content"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        <TextField id="outlined-basic" label="Наименовние" />
        <TextField id="outlined-basic" type="date" variant="standard" label={"Дата завершения"} focused/>
        <TextField id="outlined-basic" label="Предприятие" />
        <TextField id="outlined-basic" label="Способ доставки" />
        <TextField id="outlined-basic" label="Комментарий" />
      </div>
    </div>
  );
}

export default Profile;
