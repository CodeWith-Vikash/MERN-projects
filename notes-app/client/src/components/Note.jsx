import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from 'axios'

const Note = ({islight,data,getdata}) => {
  const [updatedtext, setupdatedtext] = useState('')
  const [isediting, setisediting] = useState(false)
  // function to delte a note
  const delteNote=()=>{
    axios.delete(`/api/notes/${data._id}`).then((result)=>{
      console.log(result);
      getdata()
    }).catch((err)=>{
      console.log(err);
    })
  }

  // function to edit a note
  const updateNote=()=>{
    setisediting(true)
    setupdatedtext(data.note)
  }

  // function to save a edited note
   const saveUpdate=()=>{
    axios.patch(`/api/notes/${data._id}`,{
      note:updatedtext
    }).then((result)=>{
      console.log(result);
      getdata()
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setisediting(false)
      setupdatedtext('')
    })
   }

  //  function to getdatestring
  const getdatestring=()=>{
    const date= new Date(data.dateCreated)
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
   return formattedDate
  }
  return (
    <div className={` note w-[300px] rounded-lg p-5 flex flex-col h-[350px] justify-between ${islight?'bg-orange-300':'bg-yellow-600'}`}>
       <section className='flex flex-col items-center w-full gap-4'>
       <h3 className='font-bold text-xl'>{data.title}</h3>
        {isediting?
          <textarea cols="30" rows="8" className='bg-transparent border-2 outline-none rounded-lg p-2' placeholder='Write your note'
          value={updatedtext}
          onChange={(e)=> setupdatedtext(e.target.value)}
         ></textarea>
        :<p className='leading-5 h-[200px] overflow-auto'>{data.note}</p>}
       </section>
        <section className='flex justify-between'>
            <p>{getdatestring()}</p>
            <div className='flex items-center gap-4'>
            {isediting?
              <button className={`bg-green-600 py-1 px-4 font-semibold rounded-lg text-lg ${islight?'bg-emerald-500':null}`} onClick={saveUpdate}>save</button>
            :<FaEdit size='1.5rem' className='cursor-pointer' onClick={updateNote}/>}
            <FaTrashAlt size='1.5rem' color='red' className='cursor-pointer' onClick={delteNote}/>
            </div>
        </section>
    </div>
  )
}

export default Note