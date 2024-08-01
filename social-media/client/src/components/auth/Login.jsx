import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showpass, setshowpass] = useState(false)
  const passref=useRef()
  // function to toggle password
   const togglePass=()=>{
      if(!showpass){
         passref.current.type='password'
      }else{
        passref.current.type='text'
      }
      setshowpass(!showpass)
   }

  return (
    <div className='bg-gray-300 h-screen flex justify-center items-center'>
       <div className='flex flex-col gap-6 bg-white w-[300px] px-4 py-6 rounded-lg items-center shadow'>
         <form className='flex flex-col gap-4'>
         <input type="email" placeholder='Email' className='border-2 border-gray-400 rounded-lg px-2 py-1 text-lg outline-blue-600'/>

         <div className='relative cursor-pointer'>
         <input type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg px-2 py-1 text-lg outline-blue-600' ref={passref}/>
          <div className='absolute top-[50%] right-2 transform translate-y-[-50%]' onClick={togglePass}>
          {!showpass?<FaEyeSlash size='1.3rem'/>:<FaRegEye size='1.3rem'/>}
          </div>
         </div>

         <button type="submit" className='bg-blue-700 text-white text-lg font-semibold rounded-lg py-2'>Login</button>
         </form>
         <Link to='/signup'>
         <button type="button" className='bg-green-600 text-white text-lg font-semibold rounded-lg py-2 px-4 w-fit'>Create new account</button>
         </Link>
       </div>
    </div>
  )
}

export default Login