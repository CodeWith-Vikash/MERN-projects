import React from 'react'
import Home from './components/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Game from './components/Game'                     
import Signup from './components/Signup'                     
import Login from './components/Login'                     

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/game/:mode' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App