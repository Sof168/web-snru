import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RepairList from "./RepairList.jsx";
import EquipmentRepairForm1 from "./EquipmentRepairForm1.jsx";
import LoginPage from "./Login.jsx";
import RepairTable from "./RepairTable.jsx";
import ViewEquipmentRepair from "./ViewEquipmentRepair.jsx";
import { BrowserRouter } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);


