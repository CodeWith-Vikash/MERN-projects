import React from 'react'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[500px] gap-5 md:flex-row-reverse'>
        <div className='relative'>
        <img src="/hero.png" className='w-[300px]'/>
        <img src="/Astronot.gif" className='absolute top-0'/>
        </div>
        <div className="">
           <div className='relative'>
             <h1 className='text-[3.4rem] font-bold text-white'>TECHSTUFF</h1>
             <img src="/logo.png" className='h-6 absolute top-[-5px]'/>
           </div>
           <p className='font-semibold text-white text-sm'>Tech Essentials for Everyone</p>
           <Link to='/products'>
           <button className='bg-violet-800 py-1 px-2 rounded text-white my-2'>Shop now</button>
           </Link>
        </div>
    </div>
  )
}

export default Hero