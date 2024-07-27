import React, { useContext } from 'react'
import {mainContext} from '../context/MainContext'
import Navbar from './Navbar'
import Footer from './Footer'

const Auther = () => {
  const {isdark}= useContext(mainContext)
  return (
    <div className={`min-h-screen ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
      <Navbar/>
        <main className='min-h-screen flex justify-center flex-wrap gap-10 p-10'>
           <div className='flex flex-col items-center w-fit gap-2 font-semibold text-lg'>
            <img src="https://tse1.mm.bing.net/th?id=OIP.INBtGZKuzBlJo3PJo3ktCwHaFx&pid=Api&P=0&h=220" className='h-[150px] w-[150px] object-cover rounded-full'/>
             <p>@prodev</p>
           </div>
           {/* fslf */}
           <div className='flex flex-col items-center w-fit gap-2 font-semibold text-lg'>
            <img src="https://tse1.mm.bing.net/th?id=OIP.INBtGZKuzBlJo3PJo3ktCwHaFx&pid=Api&P=0&h=220" className='h-[150px] w-[150px] object-cover rounded-full'/>
             <p>@prodev</p>
           </div>
           {/* fslf */}
           <div className='flex flex-col items-center w-fit gap-2 font-semibold text-lg'>
            <img src="https://tse1.mm.bing.net/th?id=OIP.INBtGZKuzBlJo3PJo3ktCwHaFx&pid=Api&P=0&h=220" className='h-[150px] w-[150px] object-cover rounded-full'/>
             <p>@prodev</p>
           </div>
           {/* fslf */}
           <div className='flex flex-col items-center w-fit gap-2 font-semibold text-lg'>
            <img src="https://tse1.mm.bing.net/th?id=OIP.INBtGZKuzBlJo3PJo3ktCwHaFx&pid=Api&P=0&h=220" className='h-[150px] w-[150px] object-cover rounded-full'/>
             <p>@prodev</p>
           </div>
           {/* fslf */}
        </main>
      <Footer/>
    </div>
  )
}

export default Auther