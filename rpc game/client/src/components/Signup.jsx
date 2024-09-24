import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [avatarloading, setavatarloading] = useState(false);
  const [submitting, setsubmitting] = useState(false)
  const [fileurl, setfileurl] = useState('/user.jfif');
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  // function to upload image on cloudinary
  const uploadFile = async (file) => {
    setavatarloading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`http://localhost:3000/api/upload`, formData, {
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
    setsubmitting(true)
    axios.post('http://localhost:3000/api/signup',{username,password,email,avatar:fileurl}).then((result)=>{
      console.log(result);
      setusername('')
      setemail('')
      setpassword('')
    }).catch((err)=>{
      console.log(err)
    }).finally(()=> setsubmitting(false))
  }

  return (
    <div style={{ backgroundImage: 'url(/bg2.jpg)' }} className="h-screen w-full bg-cover bg-center flex justify-center items-center">
      <form className="card2 w-[300px] rounded-lg p-4 text-white flex flex-col gap-2 " onSubmit={handleSubmit}>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="text" placeholder="Username" value={username} onChange={(e)=> setusername(e.target.value)} required/>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="email" placeholder="Email" value={email} onChange={(e)=> setemail(e.target.value)} required/>
        <input className="outline-none border-2 py-1 px-2 rounded-lg bg-transparent" type="text" placeholder="Password" value={password} onChange={(e)=> setpassword(e.target.value)} required/>
        
        <label htmlFor="img" className="font-semibold cursor-pointer">
          Add an avatar
          {avatarloading ? (
            <img src="/loader.gif" className="h-10 rounded-full" alt="loading" />
          ) : (
            fileurl && <img src={fileurl} className="h-10 w-10 object-cover rounded-full" alt="avatar" />
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
