// src/App.jsx — example usage of Footer + ScrollToTop
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './component/common/Navbar'
import Footer from './component/common/Footer'
import { ScrollToTop } from './component/common/Footer'
import Home from "./component/Home"
import Contact from "./Pages/Contact/component/Contact"

import AboutUs from './Pages/About/AboutUs';
import Leaders from './Pages/About/Leaders';
import HowToApply from './Pages/Admissions/HowToApply';


const App = () => (
  <div>
  
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* add more routes here */}
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/aboutUs" element ={<AboutUs/>}/>
      <Route path="/leaders" element={<Leaders/>}/>
      <Route path="/howtoApply" element={<HowToApply/>}/>
    </Routes>
    <Footer/>
    <ScrollToTop/>   {/* fixed position — always on top of everything */}
  </div>
  
)

export default App