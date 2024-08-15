import React, { useEffect, useState } from 'react'
import Note from './components/Note'
import Addnote from './components/Addnote'
import Navbar from './components/Navbar'
import axios from 'axios'

const App = () => {
  const [islight, setislight] = useState(false)
  const [inputval, setinputval] = useState('')
  const [notes, setnotes] = useState([])

  // function to toggle dark mode
  const togglemode=()=>{
    setislight(!islight)
  }

  // function to fetch notes from database
  const getdata=()=>{
    axios.get('/api/notes').then((data)=>{
      console.log(data);
      setnotes(data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getdata()
  },[])
  return (
    <div className={`min-h-screen flex flex-col items-center gap-10 pb-10 ${islight?'bg-white text-black':'bg-gray-800 text-white'}`}>
      <Navbar islight={islight} togglemode={togglemode}/>
      <input type="text" placeholder='search notes'
        value={inputval}
        onChange={(e)=> setinputval(e.target.value)}
        className={`outline-none border-2  text-lg px-4 py-1 rounded-full text-black w-[95%] ${islight?'border-black':'border-white'}`}
      />

      <main className='w-full flex flex-wrap justify-center gap-6'>
        <Addnote islight={islight} getdata={getdata}/>
        {notes.filter((item)=> item.title.toLowerCase().startsWith(inputval.toLocaleLowerCase())).map((item)=>{
            return <Note islight={islight} data={item} key={item._id} getdata={getdata}/>
        })}
      </main>
    </div>
  )
}

export default App