import React, { useContext, useEffect, useState } from 'react'
import { FaCamera } from "react-icons/fa";
import {MainContext} from '../context/MainContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'
import Myorders from './Myorders'

const Profile = () => {
  const {baseurl,userdata,uploadFile}= useContext(MainContext)
  const [saving, setsaving] = useState(false)
  const [editing, setediting] = useState(false)
  const [avatarloading, setavatarloading] = useState(false)
  const [imageurl, setimageurl] = useState(null)
  const [state, setstate] = useState("")
  const [city, setcity] = useState("")
  const [nearby, setnearby] = useState("")
  const [selectedSec, setselectedSec] = useState('orders')

   const handleFileChange=async(file)=>{
    setavatarloading(true)
      if(file){
         if(file.type.startsWith('image/')){
           const url= await uploadFile(file,setimageurl)
           axios.patch(`${baseurl}/api/profile/${userdata._id}`,{avatar:url}).then((result)=>{
            console.log(result)
            Cookies.set('userdata', JSON.stringify(result.data.user), { expires: 1 / 24 });
            toast.info(result.data.message)
           }).catch((err)=>{
              console.log(err)
              toast.error(err.response.data.message?err.response.data.message:'something went wrong')
           }).finally(()=> setavatarloading(false))
         }else{
           toast.warning('please select an image')
         }
      }
   }

  //  function to update address
  const updateAddress=(e)=>{
    e.preventDefault()
    setsaving(true)
    axios.patch(`${baseurl}/api/address/${userdata._id}`,{nearby,city,state}).then((result)=>{
      console.log(result)
      Cookies.set('userdata', JSON.stringify(result.data.user), { expires: 1 / 24 });
      setediting(false)
      toast.info(result.data.message)
     }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.message?err.response.data.message:'something went wrong')
     }).finally(()=> setsaving(false))
  }
   

  useEffect(()=>{
    if(userdata){
      // console.log(userdata)
      setimageurl(userdata.avatar)
      setcity(userdata.address.city)
      setstate(userdata.address.state)
      setnearby(userdata.address.nearby)
    }
  },[userdata])
  return (
    <div className='min-h-screen bg-blue-500 flex flex-col items-center gap-4'>
      <nav className='text-white flex gap-10 pt-10 pb-5 shadow-xl w-full justify-center'>
        <div className='flex flex-col items-center cursor-pointer' onClick={()=> setselectedSec('profile')}>
          <b>Profile</b>
          <div className={`h-1 w-[100px] ${selectedSec=='profile'?'bg-green-500':'bg-blue-500'} rounded-full`}></div>
        </div>
        <div className='flex flex-col items-center cursor-pointer' onClick={()=> setselectedSec('orders')}>
          <b>MY Orders</b>
          <div className={`h-1 w-[100px] ${selectedSec=='orders'?'bg-green-500':'bg-blue-500'} rounded-full`}></div>
        </div>
      </nav>
      {selectedSec=='profile'?<div className='w-[300px] text-black bg-white shad flex flex-col p-2 gap-2 items-center rounded-lg'>
        <section className='relative'>
        <img src={imageurl} className='rounded-full h-[150px] w-[150px] object-cover border-2 border-black object-top'/>
        <input type="file" id="file" className='hidden'
         onChange={(e)=> handleFileChange(e.target.files[0])}
        />
        {avatarloading?
          <div className='bg-black w-fit rounded-full p-2 absolute bottom-0 right-0'>
          <img src="/loader.gif" className='h-10 rounded-full'/>
        </div>
        :<label htmlFor='file' className='bg-gray-500 w-fit rounded-full p-2 absolute bottom-0 right-0 cursor-pointer'>
          <FaCamera size={'2rem'} color='white'/>
        </label>}
        </section>
        <b>{userdata?.username}</b>
        {editing?
         <form className='flex flex-col gap-2 w-full p-2 border-t bg-gray-300' onSubmit={updateAddress}>
          <label htmlFor="city">City</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='City' type="text" value={city} onChange={(e)=> setcity(e.target.value)}/>
          <label htmlFor="nearby">Nearby</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='Nearby' type="text" value={nearby}  onChange={(e)=> setnearby(e.target.value)}/>
          <label htmlFor="state">State</label>
          <input className='text-black rounded-lg px-2 py-1 outline-none' placeholder='State' type="text" value={state} onChange={(e)=> setstate(e.target.value)} />
          <button className="py-1 px-2 bg-violet-600 text-white rounded flex items-center gap-2 justify-center w-fit">
              save
              {saving && <img src="/loader.gif" className="h-5 rounded-full"/>}
              </button>
         </form>
        :<section className='flex gap-2 items-center flex-wrap'>
          <b>Address :</b>
        <address>{nearby}, {city}, {state}</address>
         <button className='py-1 px-2 bg-violet-600 rounded' onClick={()=> setediting(true)}>Edit address</button>
        </section>}
      </div>:
      <Myorders/>
      }
    </div>
  )
}

export default Profile