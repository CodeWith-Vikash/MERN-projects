import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import Auther from './components/Auther'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/auther' element={<Auther/>}/>
        <Route path='/dash' element={<Dashbord/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App