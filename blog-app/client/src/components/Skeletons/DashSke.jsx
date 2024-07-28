import React from 'react'

const DashSke = () => {
    const array = Array.from({ length: 10 }, (_, index) => index + 1);
    return (
      <div className='flex justify-center flex-wrap gap-10 px-5 py-10'>
         {array.map((a,i)=>{
            return <div className='w-[250px] flex flex-col gap-2 p-4 shadow-lg rounded' key={i}>
            <div className='bg-gray-300 w-full h-[170px] rounded flex flex-col items-center justify-center gap-2'>
            <p className='h-7 w-[70%] bg-gray-500 rounded'></p>
            <p className='h-7 w-[70%] bg-gray-500 rounded'></p>
            </div>
            <p className='h-5 w-full bg-gray-300 rounded'></p>
            <p className='h-5 w-full bg-gray-300 rounded'></p>
        </div>
         })}
      </div>
    )
}

export default DashSke