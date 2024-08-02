import React, { useContext, useState } from 'react'
import { FaCameraRetro } from "react-icons/fa";
import Post from './Post'
import { BsThreeDots } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa6";
import {MainContext} from '../../context/MainContext'

const Dashboard = () => {
  const [profilepic, setprofilepic] = useState("/user.jfif")
  const [showoptions, setshowoptions] = useState(false)
  const [editingid, seteditingid] = useState(null)
  const [editimg, seteditimg] = useState(null)
  const {handleFileChange}=useContext(MainContext)

  // toggle options
  const toggleOpt=()=>{
    setshowoptions(!showoptions)
  }
  return (
    <div className='min-h-screen bg-slate-200 relative'>
      <section className='bg-pink-100 flex justify-center'>
        <div className='flex flex-col items-center gap-2  md:flex-row p-4 md:gap-4 w-fit'>
        <div className='relative'>
        <img src={profilepic} className='h-[200px] w-[200px] rounded-full object-cover border-2 border-black'/>
        <label htmlFor="img">
        <p className='bg-black w-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer'>
          <FaCameraRetro size='2rem' color='white'/>
        </p>
        </label>
        <input type="file" id="img" className='hidden'
         onChange={(e)=> handleFileChange(e,setprofilepic)}
        />
        </div>
        <div className='flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start'>
        <h3 className='font-bold text-2xl'>Vikash Pandey</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, nesciunt.</p>
        </div>
        </div>
      </section>
      <hr />
      <section className='flex flex-col gap-6 items-center py-10'>
        <div className='relative'>
           {showoptions && <div className='bg-gray-800 text-white font-semibold w-fit p-2 rounded-lg rounded-tr-none absolute right-10 top-6'>
             <p className='cursor-pointer'>Edit Post</p>
             <p className='cursor-pointer'>Delete Post</p>
           </div>}
           <BsThreeDots size='1.5rem' className='absolute right-4 top-2 cursor-pointer' onClick={toggleOpt}/>
          <Post/>
        </div>
      </section>
      {/* editing box */}
      {editingid && <section className='edit h-screen w-full absolute top-0 flex justify-center pt-20'>
        <form className='w-[300px] bg-gray-800 text-white flex flex-col gap-2 p-2 rounded-lg h-fit'>
           <textarea cols="0" rows="3" className='rounded p-2 outline-none w-full text-black'
           ></textarea>
           <img src={editimg} className='w-full h-[140px] object-cover'/>
           <div className='flex items-center justify-between'>
           <label htmlFor="editimg" className='flex items-center gap-2 cursor-pointer'>
             <FaFileImage size='1.5rem' color='violet'/>
             <b>Edit image</b>
           </label>
           <button type="submit" className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>save</button>
           </div>
           <input type="file" className='hidden' id='editimg'
            onChange={(e)=> handleFileChange(e,seteditimg)}
           />
        </form>
      </section>}
    </div>
  )
}

export default Dashboard