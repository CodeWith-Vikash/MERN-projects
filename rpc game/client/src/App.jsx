import React from 'react';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Game from './components/Game';                     
import Signup from './components/Signup';                     
import Login from './components/Login';                     
import Navbar from './components/Navbar';                     
import Result from './components/Result';     
import { ContextProvider } from './context/MainContext';                

const AppWrapper = () => {
  const navigate = useNavigate();

  return (
    <ContextProvider navigate={navigate}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/game/:mode' element={<Game/>}/>
      </Routes>
    </ContextProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
