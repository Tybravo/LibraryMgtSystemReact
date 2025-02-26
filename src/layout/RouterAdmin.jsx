import React from 'react'
import '../App.css'
import AddBook from '../components/AddBook'
import { Routes, Route } from 'react-router-dom'

const RouterAdmin = () => {
  return (

   <Routes>
   <Route path = '/addbook' element={<AddBook/>}/>
   </Routes>

  )
}

export default RouterAdmin
