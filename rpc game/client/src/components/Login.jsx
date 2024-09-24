import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [loading, setloading] = useState(false)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    setloading(true)
    axios.post('http://localhost:3000/api/login',{email,password}).then((result)=>{
      console.log(result);
      setemail('')
      setpassword('')
    }).catch((err)=>{
      console.log(err)
    }).finally(()=> setloading(false))
  }
  return (
    <div style={{backgroundImage:'url(/bg2.jpg)'}} className='h-screen w-full bg-cover bg-center flex justify-center items-center'>
      <form onSubmit={handleSubmit} className="card2 w-[300px] rounded-lg p-4 text-white flex flex-col gap-2 ">
        <input className='outline-none border-2 py-1 px-2 rounded-lg bg-transparent' type="email" placeholder='Email' value={email} onChange={(e)=> setemail(e.target.value)} required/>
        <input className='outline-none border-2 py-1 px-2 rounded-lg bg-transparent' type="text" placeholder='Password' value={password} onChange={(e)=> setpassword(e.target.value)} required/>
        <motion.button
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2 flex flex-row-reverse gap-2"
            >
              Login
              {loading && <img src='/loader.gif' className='h-4 rounded-full'/>}
            </motion.button>
            <div className='flex items-center gap-2 text-sm'>You don't have an account?
            <Link to={'/signup'}>
            <motion.button
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2"
            >
              Signup
            </motion.button>
            </Link>
            </div>
      </form>
    </div>
  )
}

export default Login