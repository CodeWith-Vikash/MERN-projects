import React, { useContext } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {mainContext} from '../context/MainContext'

const Home = () => {
  const {isdark} =useContext(mainContext)
  return (
    <div className={`min-h-screen ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
      <Navbar/>
       <main className='flex justify-center flex-wrap gap-10 px-5 py-10 min-h-screen'>
         <div className='w-[300px] flex flex-col gap-2 shadow-2xl p-2 rounded-lg'>
            <div className='flex gap-2 items-center'>
              <img src="https://tse3.mm.bing.net/th?id=OIP.8GTGPsTibIdvVTlbvs-vUwHaFj&pid=Api&P=0&h=220" className='h-10 w-10 rounded-full object-cover'/>
              <p>@prodev69</p>
            </div>
            <img src="https://tse3.mm.bing.net/th?id=OIP.8GTGPsTibIdvVTlbvs-vUwHaFj&pid=Api&P=0&h=220" className='w-full h-[200px] object-cover'/>
            <h3 className='leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore earum quae exercitationem dolore culpa nihil? Minus optio aperiam ducimus enim illum minima quas sunt dolorum nesciunt vitae fugit, exercitationem atque!</h3>
            <p className='font-semibold'>blog written on: 23/5/2023</p>
         </div>
       </main>
      <Footer/>
    </div>
  )
}

export default Home