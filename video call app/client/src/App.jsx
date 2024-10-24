import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Room from './components/Room'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/room/:id'  element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App