import React, { useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import {MainContext} from '../context/MainContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

const Login = () => {
  const [isopen, setisopen] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordref=useRef(null)
  const navigate=useNavigate()
  const {baseurl,getlocalUser,getAuthToken}=useContext(MainContext)

  const toggleye=()=>{
    setisopen(!isopen)
    if(passwordref.current.getAttribute('type')=='password'){
       passwordref.current.setAttribute('type','text')
      }else{
      passwordref.current.setAttribute('type','password')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const email = e.target[0].value;
    const password = e.target[1].value;
    axios.post(`${baseurl}/api/login`,{email,password},{withCredentials:true}).then((result)=>{
      console.log(result);
      Cookies.set('userdata', JSON.stringify(result.data.user), { expires: 1});
      getlocalUser()
      getAuthToken()
      toast.success(result.data.message)
      navigate('/')
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message?err.response.data.message:'something went wrong')
    }).finally(()=>{
      setLoading(false)
    })
  };
  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="w-[300px] h-fit bg-white text-black rounded-lg p-4 flex flex-col items-center gap-4">
        <p className='text-red-500'>{error && 'something went wrong'}</p>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input type="email" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Email"/>
        <div className="relative">
        <input type="password" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Password" ref={passwordref}/>
        {isopen? <RxEyeOpen  className="absolute top-3 right-3 cursor-pointer text-violet-800"size="1.3rem" onClick={toggleye}/> : <RiEyeCloseFill className="absolute top-3 right-3 cursor-pointer text-violet-800"size="1.3rem" onClick={toggleye}/>}
        </div>
        <button className="bg-violet-800 text-white font-semibold py-1 px-2 rounded">{loading?'Loging...':'Login'}</button>
        <p>you don't have an account ? <NavLink to="/signup">
        <b className='text-violet-800'>signup</b>
          </NavLink></p>
      </form>
      </div>
    </div>
  )
}

export default Login