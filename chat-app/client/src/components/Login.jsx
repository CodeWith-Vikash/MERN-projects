import React, { useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { UserContext } from '../Context/AuthContext';
import {SocketContext} from '../Context/SocketContext'

const Login = () => {
  const {setuserdata,baseurl}=useContext(UserContext)
  const [isopen, setisopen] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordref=useRef(null)
  const navigate=useNavigate()
  const {socket}= useContext(SocketContext)

  const toggleye=()=>{
    setisopen(!isopen)
    if(passwordref.current.getAttribute('type')=='password'){
       passwordref.current.setAttribute('type','text')
      }else{
      passwordref.current.setAttribute('type','password')
    }
  }

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    axios.post(`${baseurl}/api/login`,{email,password}).then((result)=>{
       console.log(result);
       socket?.emit('chatroom',result.data.user)
       setuserdata(result.data.user)
       localStorage.setItem('chatuser',JSON.stringify(result.data.user._id))
       toast.success(result.data.message)
       setLoading(false)
       navigate('/')
    }).catch((err)=>{
      console.log(err);
      toast.error(err.response.data.message)
      setLoading(false)
    })
  };
  return (
    <div className="h-screen bg-zinc-800 flex justify-center items-center">
      <div className="w-[300px] h-fit bg-white text-black rounded-lg p-4 flex flex-col items-center gap-4">
        <img src="/logo.png" alt="" className="w-16" />
        <p className='text-red-500'>{error && 'something went wrong'}</p>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input type="email" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Email"/>
        <div className="relative">
        <input type="password" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Password" ref={passwordref}/>
        {isopen? <RxEyeOpen  className="absolute top-3 right-3 cursor-pointer"size="1.3rem" onClick={toggleye}/> : <RiEyeCloseFill className="absolute top-3 right-3 cursor-pointer"size="1.3rem" onClick={toggleye}/>}
        </div>
        <button className="bg-black text-white font-semibold py-1 px-2 rounded">{loading?'Loging...':'Login'}</button>
        <p>you don't have an account ? <NavLink to="/signup">
        <b>signup</b>
          </NavLink></p>
      </form>
      </div>
    </div>
  )
}

export default Login