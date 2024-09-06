import React from 'react'
import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <div className='h-screen bg-black text-white flex items-center flex-col justify-center relative pt-16'>
        <img src="/Astronot.gif" className='h-[300px] absolute top-8'/>
        <div className='leading-10 text-center'>
            <h1 className='text-[5rem] font-bold'>404</h1>
            <p className='my-2'>NO Page Found</p>
        </div>
        <Link to="/">
          <button className='bg-blue-500 py-1 px-2 rounded'>Go to homepage</button>
        </Link>
    </div>
  )
}

export default Error