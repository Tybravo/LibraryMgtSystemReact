import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderAdminDashboard from "../layout/HeaderAdminDashboard";
import AddBook from "../components/AddBook";

const RouterAdmin = () => {
  return (
    <div>
      <HeaderAdminDashboard />  
      
      <div className="p-1">
        <Routes>
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </div>
    </div>
  );
};

export default RouterAdmin;
