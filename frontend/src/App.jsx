import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AgentLayout from "layouts/agent";
// import AuthLayout from "layouts/auth";
import Login from "views/Login";
import { ToastContainer } from "react-toastify";
import PdoLayout from 'layouts/pdo'
import BaseLogin from "views/Checks/BaseLogin";
import Authentication from "views/Checks/Authentication";
import HomePage from "views/home"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="agent/*" element={<Authentication><AgentLayout /></Authentication>} />
      <Route path="admin/*" element={<Authentication><AdminLayout /></Authentication>} />
      <Route path="pdo/*" element={<Authentication><PdoLayout /></Authentication>} />
      <Route path="/" element={<BaseLogin><Login/></BaseLogin>} />
      <Route path="/home" element={<HomePage />}/>
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;
