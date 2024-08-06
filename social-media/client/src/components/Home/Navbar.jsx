import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {MainContext} from '../../context/MainContext'

const Navbar = () => {
  const {userdata,getlocalstorage}=useContext(MainContext)
  const navigate=useNavigate()
  const logOut=()=>{
    localStorage.removeItem('charloguser')
    getlocalstorage()
    navigate('/')
  }
  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-white md:sticky md:top-0 z-50'>
      <Link to='/'>
      <img src="/logo.png" className='h-14'/>
      </Link>
      <div className='flex items-center gap-4'>
        {userdata?
          <button className='bg-red-600 text-white font-semibold px-2 py-1 rounded' onClick={logOut}>Logout</button>
        :<Link to='/login'>
          <button className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>Login</button>
        </Link>}
        {userdata && <Link to='/dash'>
           <img src={userdata.avatar} className='h-10 w-10 rounded-full object-cover'/>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar