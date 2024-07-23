import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dice from './pages/Dice';
function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/game/dice' element={<Dice/>} />

         
       </Routes>
      <Footer />
      
      

    </>
  )
}

export default App
