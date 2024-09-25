import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiSolidImageAdd } from "react-icons/bi";
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import {MainContext} from '../context/MainContext'

const Signup = () => {
  const [avatarloading, setavatarloading] = useState(false);
  const [submitting, setsubmitting] = useState(false)
  const [fileurl, setfileurl] = useState(null);
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const {baseurl,getToken,getUserdata} = useContext(MainContext)
  const navigate=useNavigate()

  // function to upload image on cloudinary
  const uploadFile = async (file) => {
    setavatarloading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${baseurl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      setfileurl(response.data.url);
      setavatarloading(false);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload unsuccessful");
      setavatarloading(false);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(fileurl){
      setsubmitting(true)
      axios.post(`${baseurl}/api/signup`,{username,password,email,avatar:fileurl}).then((result)=>{
        console.log(result);
        Cookies.set('token',result.data.token,{
          expires:30
        })
        Cookies.set('userdata',JSON.stringify(result.data.user),{
          expires:30
        })
        getToken()
        getUserdata()
        navigate('/')
        setusername('')
        setemail('')
        setpassword('')
        setfileurl(null)
        toast.success(result.data.message)
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response?err.response.data.message:'something went wrong')
      }).finally(()=> setsubmitting(false))
    }else{
      toast.warning('please add an avatar')
    }
  }

  return (
    <div style={{ backgroundImage: 'url(/bg2.jpg)' }} className="h-screen w-full bg-cover bg-center flex justify-center items-center">
      <form className="card2 w-[300px] rounded-lg p-4 text-white flex flex-col gap-2 " onSubmit={handleSubmit}>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="text" placeholder="Username" value={username} onChange={(e)=> setusername(e.target.value)} required/>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="email" placeholder="Email" value={email} onChange={(e)=> setemail(e.target.value)} required/>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="text" placeholder="Password" value={password} onChange={(e)=> setpassword(e.target.value)} required/>
        
        <label htmlFor="img" className="font-semibold cursor-pointer flex items-center gap-2">
          <BiSolidImageAdd size={'2rem'}/>
          Add an avatar
          {avatarloading ? (
            <img src="/loader.gif" className="h-10 rounded-full" alt="loading" />
          ) : (
            fileurl && <img src={fileurl} className="h-10 w-10 object-cover rounded" alt="avatar" />
          )}
        </label>
        <input
          type="file"
          id="img"
          className="hidden"
          onChange={(e) => uploadFile(e.target.files[0])}
        />

        <motion.button
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          type='submit'
          className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2 flex flex-row-reverse items-center gap-1"
        >
          Signup
          {submitting && <img src='/loader.gif' className='h-4 rounded-full'/>}
        </motion.button>

        <div className="flex items-center gap-2 text-sm">
          You already have an account?
          <Link to={'/login'}>
            <motion.button
             type='button'
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
              Login
            </motion.button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
