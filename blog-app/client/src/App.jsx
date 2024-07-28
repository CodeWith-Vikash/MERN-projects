import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import Auther from './components/Auther'
import BlogDetails from './components/BlogDetails'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
       <ScrollToTop/>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/auther' element={<Auther/>}/>
        <Route path='/dash' element={<Dashbord/>}/>
        <Route path='/:id' element={<BlogDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App