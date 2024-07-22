import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";


const Addnote = ({islight}) => {
    const [textval, settextval] = useState('')
  return (
    <div className={`w-[300px] bg-emerald-800 rounded-lg p-5 flex flex-col h-[300px] justify-between ${islight?'bg-blue-400':null}`}>
        <textarea cols="30" rows="8" className='bg-transparent border-none outline-none' placeholder='Write your note'
         value={textval}
         onChange={(e)=> settextval(e.target.value)}
        ></textarea>
        <section className='flex justify-between items-center'>
            <FaEdit size='1.5rem' className='cursor-pointer'/>
            <button className={`bg-green-600 py-1 px-4 font-semibold rounded-lg text-lg ${islight?'bg-emerald-500':null}`}>save</button>
        </section>
    </div>
  )
}

export default Addnote