import React from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Navbar = ({islight,togglemode}) => {
  return (
    <nav className='flex w-full justify-between items-center px-10 pt-5'>
      <h1 className='font-bold text-xl'>Notes</h1>
      {islight?<MdDarkMode size='2.5rem' color='black' onClick={togglemode} className='cursor-pointer'/>:<MdLightMode size='2.5rem' onClick={togglemode} className='cursor-pointer'/>}
    </nav>
  )
}

export default Navbar