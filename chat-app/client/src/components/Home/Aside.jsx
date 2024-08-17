import React,{useContext, useRef, useState} from 'react'
import { FaArrowAltCircleLeft,FaSearch,FaCameraRetro} from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../Context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Aside = ({closeSide}) => {
  const [searchval, setsearchval] = useState('')
  const {setuserdata,userdata} = useContext(UserContext)
  const [profilepic, setprofilepic] = useState(userdata?.avatar)
  const [showprofile, setshowprofile] = useState(false)
  const logout=()=>{
    localStorage.removeItem('chatuser')
    setuserdata(null)
    toast.warning('user logged out')
  }

  const profileref=useRef()
  const toggleProfile=()=>{
    if(showprofile){
      profileref.current.style.transform='translateX(-100%)'
    }else{
      profileref.current.style.transform='translateX(0%)'
    }
    setshowprofile(!showprofile)
  }
  return (
    <>
      <div className='flex flex-col gap-4'>
        <nav className='h-[9.2vh] bg-black flex items-center justify-between px-2 w-full'>
          <div className='flex items-center gap-1 cursor-pointer' onClick={toggleProfile}>
            <img src={userdata?.avatar?userdata.avatar:'/user.jfif'} alt="" className='h-10 rounded-full w-10 object-cover border-white border-2 '/>
            <span>{userdata?.username}</span>
          </div>
           <div className='flex items-center gap-2'>
           <button className='bg-red-600 text-white font-semibold py-1 px-2 rounded text-sm' onClick={()=>logout()}>Logout</button>
           <FaArrowAltCircleLeft size="2rem" className='cursor-pointer md:hidden' onClick={closeSide}/>
           </div>
        </nav>
        <section className='relative w-fit my-0 mx-auto'>
            <input type="text" placeholder='Search' className='w-[280px] xl:w-[350px] lg:w-[310px] p-2 outline-none rounded-lg bg-zinc-700'/>
            <FaSearch size="1rem" className='absolute top-[50%] translate-y-[-50%] right-3'/>
        </section>

        <section className='h-[70vh] overflow-auto flex flex-col gap-2'>
            <div className='flex gap-2 p-2 hover:bg-black cursor-pointer'>
                <img src="https://up.yimg.com/ib/th?id=OIP.Bv23QwiO7nTO6tvLBeGLLwHaHa&pid=Api&rs=1&c=1&qlt=95&w=120&h=120" alt="" className='rounded-full h-12'/>
                <div className='w-[230px]'>
                    <p className='font-semibold'>fjldfjslfslfsflf ldfsdlfjsdlfj fldfflfl</p>
                    <span className='text-sm'>fldfjdlsfsklfdkffld fldflsfls fldf</span>
                </div>
            </div>
            {/* fjldfjlfjdlfslf */}
        </section>
    </div>
    {/* profile section */}
    <section className='h-screen w-full absolute top-0 bgblur' ref={profileref}>
      <GrClose size='1.5rem' color='black' className='float-right m-6 cursor-pointer' onClick={toggleProfile}/>
      <div className='flex flex-col gap-2 items-center mt-[100px]'>
      <div className="relative w-fit">
            <img
              src={profilepic}
              className="h-[200px] w-[200px] rounded-full object-cover border-2 border-black"
            />
            <label htmlFor="img">
              <p className="bg-blue-500 w-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer">
                <FaCameraRetro size="2rem" color="white" />
              </p>
            </label>
            <input
              type="file"
              id="img"
              className="hidden"
            />
          </div>
          <p className='text-black font-semibold text-lg text-center'>{userdata?.username}</p>
      </div>
    </section>
    </>
  )
}

export default Aside