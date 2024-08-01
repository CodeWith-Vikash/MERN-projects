import React, { useContext,useEffect,useState} from 'react'
import {mainContext} from '../context/MainContext'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'

const Auther = () => {
  const {isdark}= useContext(mainContext)
  const [authers,setAuthers]=useState([])
  useEffect(()=>{
    axios.get('https://blog-app-server69.up.railway.app/users').then((data)=>{
      console.log(data)
      setAuthers(data.data)
    })
  },[])
  return (
    <div className={`min-h-screen ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
      <Navbar/>
        <main className='min-h-screen flex justify-center flex-wrap gap-10 p-10'>
           {
            authers.map((auther,index)=>{
              return <div className='flex flex-col items-center w-fit gap-2 font-semibold text-lg' key={index}>
            <img src={auther.avatar} className='h-[150px] w-[150px] object-cover rounded-full'/>
             <p>{auther.username}</p>
           </div>
            })
           }
        </main>
      <Footer/>
    </div>
  )
}

export default Auther
