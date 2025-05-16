import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layouts = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layouts;
