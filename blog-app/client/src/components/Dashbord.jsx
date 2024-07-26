import React, { useContext } from 'react'
import {mainContext} from '../context/MainContext'
import Navbar from './Navbar'
import Footer from './Footer'

const Dashbord = () => {
  const {isdark}= useContext(mainContext)
  return (
    <div className={`min-h-screen ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
      <Navbar/>
        <main className='flex justify-center flex-wrap gap-4 p-4 min-h-screen'>
        <div className='w-[250px] flex flex-col gap-2 rounded-lg shadow-2xl p-4 h-fit'>
          <div className='bg-[url(https://tse3.mm.bing.net/th?id=OIP.caK28-NwQV5RX5HJgDhjZwHaHa&pid=Api&P=0&h=220)] h-[150px] w-full bg-cover flex flex-col justify-center gap-2 p-4 font-semibold'>
          <button className='bg-yellow-600 px-2 py-1 rounded'>Edit blog</button>
          <button className='bg-red-600 px-2 py-1 rounded'>Delete blog</button>
          </div>
          <h3 className='text-sm leading-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum ducimus exercitationem expedita non.</h3>
        </div>
        </main>
      <Footer/>
    </div>
  )
}

export default Dashbord