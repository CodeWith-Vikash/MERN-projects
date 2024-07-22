import React, { useState } from 'react'
import Note from './components/Note'
import Addnote from './components/Addnote'
import Navbar from './components/Navbar'

const App = () => {
  const [islight, setislight] = useState(false)
  const [inputval, setinputval] = useState('')
  const togglemode=()=>{
    setislight(!islight)
  }
  return (
    <div className={`min-h-screen flex flex-col items-center gap-10 pb-10 ${islight?'bg-white text-black':'bg-gray-800 text-white'}`}>
      <Navbar islight={islight} togglemode={togglemode}/>
      <input type="text" placeholder='search notes'
        value={inputval}
        onChange={(e)=> setinputval(e.target.value)}
        className={`outline-none border-2  text-lg px-4 py-1 rounded-full text-black w-[95%] ${islight?'border-black':'border-white'}`}
      />

      <main className='w-full flex flex-wrap justify-center gap-6'>
        <Addnote islight={islight}/>
        <Note islight={islight}/>
      </main>
    </div>
  )
}

export default App