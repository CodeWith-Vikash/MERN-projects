import React, { useContext, useRef, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { MdDarkMode,MdLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import { mainContext } from '../context/MainContext';

const Navbar = () => {
  const [isnav, setisnav] = useState(false)
  const sideref=useRef()
  const {isdark,toggleTheme,userdata,getlocalstorage} = useContext(mainContext)
  const navigate=useNavigate()

  const toggleNav=()=>{
    if (isnav) {
      sideref.current.style.transform = 'translateX(-100%)';
    } else {
      sideref.current.style.transform = 'translateX(0)';
    }
    setisnav(!isnav);
  }

  const handleLogout=()=>{
    localStorage.removeItem('loggeduser')
    getlocalstorage()
    navigate('/')
  }
  return (
    <>
      <nav className={`flex items-center justify-between p-5 lg:sticky lg:top-0 ${isdark?'bg-gray-900':'bg-white'}`}>
        <NavLink to='/'>
        <img src="./logo.png" className='w-[150px]'/>
        </NavLink>
        <div className='hidden lg:flex font-semibold items-center gap-4'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auther">Authers</NavLink>
            {userdata && <NavLink to="/dash">
               <button className='bg-violet-800 px-2 py-1 rounded-lg'>Dashbord</button>
            </NavLink>}
            {userdata?<button className='bg-red-600 px-2 py-1 rounded-lg' onClick={handleLogout}>Logout</button>:
            <NavLink to="/login">
               <button className='bg-green-600 px-2 py-1 rounded-lg'>Login</button>
            </NavLink>}
        </div>
            <div className='flex items-center gap-4'>
            {isdark?<MdLightMode size='1.7rem' onClick={toggleTheme} className='cursor-pointer'/>:<MdDarkMode size='1.7rem' onClick={toggleTheme} className='cursor-pointer'/>}
            <GiHamburgerMenu size='1.7rem' className='lg:hidden cursor-pointer' onClick={toggleNav}/>
            </div>
    </nav>
      
      <section className='sidenav font-semibold flex flex-col gap-5 w-full h-[83.5vh] items-center py-7 absolute transform translate-x-[-100%] duration-300' ref={sideref}>
      <NavLink to="/">Home</NavLink>
            <NavLink to="/auther">Authers</NavLink>
            {userdata && <NavLink to="/dash">
               <button className='bg-violet-800 px-2 py-1 rounded-lg'>Dashbord</button>
            </NavLink>}
            {userdata?<button className='bg-red-600 px-2 py-1 rounded-lg' onClick={handleLogout}>Logout</button>:
            <NavLink to="/login">
               <button className='bg-green-600 px-2 py-1 rounded-lg'>Login</button>
            </NavLink>}
      </section>
    </>
  )
}

export default Navbar