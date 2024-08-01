import React from 'react'
import Post from './Post'

const Profile = () => {
  return (
    <div className='min-h-screen bg-slate-200'>
      <section className='bg-pink-100 flex justify-center'>
        <div className='flex flex-col items-center gap-2  md:flex-row p-4 md:gap-4 w-fit'>
        <img src="" className='h-[200px] w-[200px] rounded-full object-cover border-2 border-black'/>
        <div className='flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start'>
        <h3 className='font-bold text-2xl'>Vikash Pandey</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, nesciunt.</p>
        </div>
        </div>
      </section>
      <hr />
      <section className='flex flex-col gap-6 items-center py-10'>
          <Post/>
      </section>
    </div>
  )
}

export default Profile