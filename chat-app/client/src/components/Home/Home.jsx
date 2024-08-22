import React, { useContext, useRef } from 'react'
import Aside from './Aside'
import ChatBox from './ChatBox'
import {UserContext} from '../../Context/AuthContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {userdata,openSide,closeSide,sideref}=useContext(UserContext)
  return (
    <>
      {!userdata?
      <section className='bg-gray-700 h-screen w-full flex flex-col items-center pt-10 gap-2'>
        <img src="logo.png" className='h-[200px]'/>
        <p className='text-white font-semibold text-xl'>Login to start chatting</p>
        <Link to='/login'>
        <button className='bg-green-500 text-white py-1 px-4 text-lg font-semibold rounded-lg'>Login</button>
        </Link>
      </section>
      :<div className='md:flex'>
      <aside className='h-screen w-[300px]   absolute top-0 left-0 md:static bg-zinc-800 text-white transition-all md:translate-x-[0%] translate-x-[-100%] md:w-[500px] z-10' ref={sideref}>
        <Aside closeSide={closeSide}/>
      </aside>
      <main className='h-screen bg-slate-300 text-white md:w-full'>
        <ChatBox openSide={openSide}/>
      </main>
    </div>}
    </>
  )
}

export default Home