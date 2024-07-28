import { useState } from 'react'
import { Route, Routes ,Navigate} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dice from './pages/Dice';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import Signup from  './pages/Signup'
import NotFoundPage from './pages/NotFoundPage'
import { useStore } from './zustand/store';
import Transfer from './pages/Transfer';
function App() {
  const {authUser} = useStore();

  
 

  return (
    <>
      {authUser && <Navbar />}
      <Routes>
         <Route path='/' element={authUser ?  <Home/> :<Navigate to={"/login"}/> } />
         <Route path='/game/dice' element={authUser ?<Dice/>:<Navigate to={"/login"}/>} />
          <Route path='/login' element={authUser ?  <Home/> :<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/transfer' element={<Transfer/>} />
          <Route path="/transactions" element={<Transactions />} />

          <Route path='*' element={<NotFoundPage />} />

       </Routes>
      {authUser && <Footer />}
      
      

    </>
  )
}

export default App
