import React from 'react'
import {BrowserRouter , Route , Routes } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Business from './pages/Business'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/business/all-business' element={<Business/>} />
        
      </Routes>
      <Footer/>

    </>
  )
}

export default App