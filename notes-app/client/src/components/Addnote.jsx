import axios from 'axios'
import React, { useState } from 'react'


const Addnote = ({islight,getdata}) => {
    const [textval, settextval] = useState('')
    const [titleval, settitleval] = useState('')

    // function to add data to database
    const addData=()=>{
      axios.post('/api/notes',{
         note:textval,
         title:titleval
      }).then((result)=>{
        console.log(result);
        getdata()
        settextval("")
        settitleval("")
      }).catch((err)=>{
        console.log(err);
      })
    }
  return (
    <div className={`w-[300px] rounded-lg p-5 flex flex-col h-[350px] justify-between ${islight?'bg-blue-400':'bg-emerald-800'}`}>
        <section className='flex flex-col items-center w-full gap-4'>
        <input type="text" placeholder='enter note title'
         value={titleval}
         onChange={(e)=> settitleval(e.target.value)}
         className={`outline-none border-2  text-sm px-4 py-1 rounded-lg bg-transparent w-full ${islight?'border-black':'border-white'}`}
        />
        <textarea cols="30" rows="8" className='bg-transparent border-none outline-none' placeholder='Write your note here'
         value={textval}
         onChange={(e)=> settextval(e.target.value)}
        ></textarea>
        </section>
        <section className='flex justify-between items-center'>
            <button className={`bg-green-600 py-1 px-4 font-semibold rounded-lg text-lg ${islight?'bg-emerald-500':null}`} onClick={addData}>save</button>
        </section>
    </div>
  )
}

export default Addnote