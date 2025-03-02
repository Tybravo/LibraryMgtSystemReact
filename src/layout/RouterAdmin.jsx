import React from 'react'
import '../App.css'
import AdminDashboard from '../components/AdminDashboard'
import AddBook from '../components/AddBook'
import { Routes, Route } from 'react-router-dom'
import HeaderAdminDashboard from '../layout/HeaderAdminDashboard';
import '../styles/admindashboard.css'

const RouterAdmin = () => {
  return (
    <div className="page-container">
      <HeaderAdminDashboard />
      <main> {/* Use main to ensure flex behavior */}
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </main>
    </div>
  );
};


export default RouterAdmin