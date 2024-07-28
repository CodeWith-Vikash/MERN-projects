import React from 'react'

const BlogSke = () => {
    const array = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div className='flex justify-center flex-wrap gap-10 px-5 py-10'>
       {array.map((a,i)=>{
          return <div className='w-[300px] flex flex-col gap-2 p-4 shadow-lg rounded' key={i}>
          <div className='flex items-center gap-2'>
              <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
              <p className='h-5 w-[120px] bg-gray-300 rounded'></p>
          </div>
          <div className='bg-gray-300 w-full h-[170px] rounded'></div>
          <p className='h-5 w-full bg-gray-300 rounded'></p>
          <p className='h-5 w-full bg-gray-300 rounded'></p>
          <p className='h-5 w-[150px] bg-gray-300 rounded'></p>
      </div>
       })}
    </div>
  )
}

export default BlogSke