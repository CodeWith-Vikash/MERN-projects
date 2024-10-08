import React, { useEffect } from 'react';
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
import Profile from './components/main/Profile'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/main/CheckoutForm'

const stripePromise = loadStripe('pk_test_51PyueBC7ONiM7sjbMS489viG3MIn4dxSrdfY6IlHLvsd213mjASqUAqgqBqzmUaliF9PO7qP482ApuUaC5aCZcP400mpEeNPDv');

const AppContent = () => {
  const location = useLocation();
  const pathname= location.pathname

  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])
  // Define routes where Navbar and Footer should not be rendered
  const noNavFooterRoutes = ['/signup','/login','/checkout'];

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
        <Route path='/profile' element={<Profile/>} />
        <Route path='/product/:id' element={<SingleProd/>} />             
        <Route path='/checkout' element={<CheckoutForm/>} />             
        <Route path='*' element={<Error />} />
      </Routes>
      
      {/* Conditionally render Footer */}
      {!noNavFooterRoutes.some((item)=>location.pathname.startsWith(item)) && <Footer/>}
    </>
  );
}

const App = () => {
  return (
    <Elements stripe={stripePromise}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
    </Elements>
  );
}

export default App;
