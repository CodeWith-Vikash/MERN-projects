import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/main/Home';
import Cart from './components/main/Cart';
import Error from './components/main/Error';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AllProducts from './components/main/AllProducts'
import Dashboard from './components/main/Dashboard'
import SingleProd from './components/main/SingleProd'
import Query from './components/main/Qurey'

const AppContent = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should not be rendered
  const noNavFooterRoutes = ['/signup','/login'];

  return (
    <>
      {/* Conditionally render Navbar */}
      {!noNavFooterRoutes.some((item)=>location.pathname.startsWith(item)) && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<AllProducts/>} />
        <Route path='/admin' element={<Dashboard/>} />
        <Route path='/product/:id' element={<SingleProd/>} />        
        <Route path='/search/:query' element={<Query/>} />        
        <Route path='*' element={<Error />} />
      </Routes>
      
      {/* Conditionally render Footer */}
      {!noNavFooterRoutes.some((item)=>location.pathname.startsWith(item)) && <Footer/>}
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
