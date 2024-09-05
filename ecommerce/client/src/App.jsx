import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/main/Home'
import Cart from './components/main/Cart'
import Footer from './components/main/Footer'
import Navbar from './components/main/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/cart' element={<Cart/>}/>
       </Routes>
       <Footer/>
    </BrowserRouter>
  )
}

export default App