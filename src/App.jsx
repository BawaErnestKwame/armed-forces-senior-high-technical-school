// src/App.jsx — example usage of Footer + ScrollToTop
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/common/Navbar'
import Footer from './component/common/Footer'
import { ScrollToTop } from './component/common/Footer'
import Home from "./component/Home"
import Contact from "./Pages/Contact/component/Contact"

const App = () => (
  <>
  
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* add more routes here */}
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <Footer/>
    <ScrollToTop/>   {/* fixed position — always on top of everything */}
  </>
  
)

export default App