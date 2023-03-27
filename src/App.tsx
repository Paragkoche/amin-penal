import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login";
import SideNav from "./components/SideNav";
import Dashboard from "./Page/Dashboard";
import CustomersTable from "./Page/Dashboard/exhibitor";
import CustomersTable2 from "./Page/Dashboard/visitors";
import React from "react";
import { refreshToken } from "./Api";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (token !== "") {
      refreshToken(token).then(async (data) => {
        let json = await data.json();
        setToken(json.token);
        localStorage.setItem("token", json.token);
        console.log(json);
        setLoading((s) => false);
      });
    }
  }, []);
  return loading ? (
    <center
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CircularProgress
        style={{ justifyContent: "center", alignContent: "center" }}
      />
    </center>
  ) : (
    <BrowserRouter>
      {token !== "" && token != undefined ? (
        <>
          <SideNav />
          <Routes>
            <Route
              path="/"
              Component={() => <Dashboard token={token} />}
            ></Route>
            <Route path="/exhibitors" Component={CustomersTable}></Route>
            <Route path="/visitors" Component={CustomersTable2}></Route>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" Component={Login}></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
