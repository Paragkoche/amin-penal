import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Page/Login";
import SideNav from "./components/SideNav";
import Dashboard from "./Page/Dashboard";
import CustomersTable from "./Page/Dashboard/exhibitor";
import CustomersTable2 from "./Page/Dashboard/visitors";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
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
