import React from 'react'
import Home from './components/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Game from './components/Game'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/game/:mode' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App