import React, { useContext, useState } from 'react'
import { FaFileImage } from "react-icons/fa6";
import axios from 'axios'
import { MainContext } from '../../context/MainContext';

const AddPost = () => {
  const [imagesrc, setimagesrc] = useState(null)
  const [textval, settextval] = useState('')
  const [saving, setsaving] = useState(false)
  const [posterror, setposterror] = useState(false)
  const {handleFileChange,getPost}=useContext(MainContext)
  
  // function to add post
  const handleSubmit=(e)=>{
    e.preventDefault()
    setsaving(true)
    axios.post('http://localhost:3000/posts',{
       userInfo:{
         avatar:'default',
         username:'vikashprodev'
       },
       title:textval,
       image:imagesrc,
       likes:[],
       comments:[]
    }).then((data)=>{
      console.log(data);
      setposterror(false)
      settextval('')
      setimagesrc(null)
      setsaving(false)
      getPost()
    }).catch((err)=>{
      console.log((err));
      setsaving(false)
      setposterror(true)
    })
  }
  return (
    <form className='w-[300px] bg-white p-4 flex flex-col gap-2 rounded shadow' onSubmit={handleSubmit}>
      {posterror && <p className='text-red-500 text-center'>Something went wrong</p>}
      <textarea cols="30" rows="3" placeholder='whats on your mind?'
       className='border-2 border-gray-400 rounded p-2 outline-blue-600 w-full'
       value={textval}
       onChange={(e)=> settextval(e.target.value)}
       required
      ></textarea>
      <input type="file" id='img' className='hidden' 
        onChange={(e)=> handleFileChange(e,setimagesrc)}
      />
      <label htmlFor="img"  className='flex flex-col gap-2'>
        {imagesrc && <img src={imagesrc} className='w-full h-[150px] object-cover rounded cursor-pointer'/>}
        <div className='flex justify-between'>
        <div className='flex items-center cursor-pointer gap-2'>
        <FaFileImage size='1.5rem' color='violet'/>
        <b>Add an image</b>
        </div>
        <button type='submit' className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>{saving?'posting...':'post'}</button>
        </div>
      </label>
    </form>
  )
}

export default AddPost