import React from 'react'
import '../App.css'
import AdminDashboard from '../components/AdminDashboard'
import AddBook from '../components/AddBook'
import { Routes, Route } from 'react-router-dom'
import HeaderAdminDashboard from '../layout/HeaderAdminDashboard';

const RouterAdmin = () => {
  return (
    <div className="main-content"> {/* Main content area */}
   <Routes>
    <Route path="/" element={
       <HeaderAdminDashboard>
         <AdminDashboard />
       </HeaderAdminDashboard>
     }/>
     <Route path="/addbook" element={
       <HeaderAdminDashboard>
        <div className="mainz">
         <AddBook />
         </div>
       </HeaderAdminDashboard>
     }/>
   </Routes>
   </div>
  )
}

export default RouterAdmin