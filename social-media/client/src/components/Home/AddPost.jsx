import React, { useState } from 'react'
import { FaFileImage } from "react-icons/fa6";

const AddPost = () => {
  const [imagesrc, setimagesrc] = useState(null)
  console.log(imagesrc);
  return (
    <form className='w-[300px] bg-white p-4 flex flex-col gap-2 rounded shadow'>
      <textarea cols="30" rows="3" placeholder='whats on your mind?'
       className='border-2 border-gray-400 rounded p-2 outline-blue-600 w-full'
      ></textarea>
      <input type="file" id='img' className='hidden' 
        onChange={(e)=> setimagesrc(URL.createObjectURL(e.target.files[0]))}
      />
      <label htmlFor="img"  className='flex flex-col gap-2'>
        {imagesrc && <img src={imagesrc} className='w-full h-[150px] object-cover rounded cursor-pointer'/>}
        <div className='flex justify-between'>
        <div className='flex items-center cursor-pointer gap-2'>
        <FaFileImage size='1.5rem' color='violet'/>
        <b>Add an image</b>
        </div>
        <button type='submit' className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>Post</button>
        </div>
      </label>
    </form>
  )
}

export default AddPost