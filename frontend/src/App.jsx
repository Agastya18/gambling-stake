import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dice from './pages/Dice';
import Login from './pages/Login';
import Signup from  './pages/Signup'
function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/game/dice' element={<Dice/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />

         
       </Routes>
      <Footer />
      
      

    </>
  )
}

export default App
