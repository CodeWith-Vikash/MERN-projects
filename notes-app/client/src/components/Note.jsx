import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const Note = ({islight}) => {
  return (
    <div className={`w-[300px] bg-yellow-600 rounded-lg p-5 flex flex-col h-[300px] justify-between ${islight?'bg-orange-300':null}`}>
        <p className='leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis natus adipisci beatae libero id doloremque velit, odio fuga, nisi quibusdam ipsa consectetur. Quam, ad consequatur voluptate sint id vero tempora.</p>
        <section className='flex justify-between'>
            <p>25/4/2024</p>
            <FaTrashAlt size='1.5rem' color='red'/>
        </section>
    </div>
  )
}

export default Note