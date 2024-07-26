import React, { useContext, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {mainContext} from '../context/MainContext'


const Login = () => {
  const {isdark} = useContext(mainContext)
  const navigate=useNavigate()
  const emailref=useRef()
  const passwordref=useRef()

  const handleSubmit=(e)=>{
     
  }
  return (
    <div className={`h-screen flex items-center justify-center ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
       <form action="/signup" method='post' onSubmit={handleSubmit} className='flex flex-col gap-4 bg-violet-800 p-4 rounded-lg'>
         <input type="text" placeholder='Email' name='email' ref={emailref}
           className='outline-none border-none px-4 py-1 text-lg rounded text-black'
         />
         <input type="text" placeholder='Password' name='Password' ref={passwordref}
           className='outline-none border-none px-4 py-1 text-lg rounded text-black'
         />
         <button type='submit' className='bg-green-600 px-2 py-1 rounded font-semibold'>Login</button>
          <p>you don't have an account? <Link to='/signup' className='text-black font-semibold'>signup</Link></p>
       </form>
    </div>
  )
}

export default Login