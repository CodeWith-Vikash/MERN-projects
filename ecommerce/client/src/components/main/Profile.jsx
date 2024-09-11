import React, { useContext, useState } from 'react'
import { FaCamera } from "react-icons/fa";
import {MainContext} from '../context/MainContext'

const Profile = () => {
  const {baseurl,userdata}= useContext(MainContext)
  const [saving, setsaving] = useState(false)
  const [editing, setediting] = useState(false)
  const [imageurl, setimageurl] = useState(userdata.avatar)
  const [state, setstate] = useState(userdata?.address.length>0?userdata.address.state:"")
  const [city, setcity] = useState(userdata?.address.length>0?userdata.address.city:"")
  const [nearby, setnearby] = useState(userdata?.address.length>0?userdata.address.nearby:"")
  return (
    <div className='h-screen bg-blue-500 flex justify-center items-center'>
      <div className='w-[300px] text-white shad flex flex-col p-2 gap-2 items-center rounded-lg'>
        <section className='relative'>
        <img src={imageurl} className='rounded-full h-[150px] w-[150px] object-cover'/>
        <input type="file" id="file" className='hidden'/>
        <label htmlFor='file' className='bg-black w-fit rounded-full p-2 absolute bottom-0 right-0 cursor-pointer'>
          <FaCamera size={'2rem'}/>
        </label>
        </section>
        <b>{userdata?.username}</b>
        {editing?
         <form className='flex flex-col gap-2 w-full p-2 border-t'>
          <label htmlFor="city">City</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='City' type="text" />
          <label htmlFor="nearby">Nearby</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='Nearby' type="text" />
          <label htmlFor="state">State</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='State' type="text" />
          <button className="py-1 px-2 bg-violet-800 text-white rounded flex items-center gap-2 justify-center w-fit">
              save
              {saving && <img src="/loader.gif" className="h-5 rounded-full"/>}
              </button>
         </form>
        :<section className='flex gap-2 items-center flex-wrap'>
          <b>Address :</b>
        <address>gb road, noida, delhi</address>
         <button className='py-1 px-2 bg-violet-800 rounded' onClick={()=> setediting(true)}>Edit</button>
        </section>}
      </div>
    </div>
  )
}

export default Profile