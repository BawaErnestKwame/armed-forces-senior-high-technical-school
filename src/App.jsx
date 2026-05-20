import React from 'react'
import Navbar from './component/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App