import React from 'react'
import './App.css'
import About from './components/about'
import Books from './components/books'
import Contact from './components/contact'
import Home from './components/Home'
import Pricing from './components/pricing'
import Profile from './components/profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Home/>}/>
      <Route path = '/about' element={<About/>}/>
      <Route path = '/books' element={<Books/>}/>
      <Route path = '/profile' element={<Profile/>}/>
      <Route path = '/contact' element={<Contact/>}/>
      <Route path = '/pricing' element={<Pricing/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App
