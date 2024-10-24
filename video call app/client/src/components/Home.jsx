import React from 'react'
import { FaVideo } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";

const Home = () => {
  return (
    <div className='h-screen w-full bg-orange-200 flex justify-center items-center'>
       <div className="flex gap-10 items-center">
         <div className='flex flex-col items-center font-semibold cursor-pointer'>
            <div className='bg-orange-500 py-2 px-4 w-fit rounded-lg'>
                <FaVideo size={'3rem'} color='white'/>
            </div>
            <p>Create</p>
         </div>
         {/* flsdfj */}
         <div className='flex flex-col items-center font-semibold cursor-pointer'>
            <div className='bg-blue-500 py-2 px-4 w-fit rounded-lg'>
                <MdAddBox size={'3rem'} color='white'/>
            </div>
            <p>Join</p>
         </div>
         {/* flsdfj */}
       </div>
    </div>
  )
}

export default Home