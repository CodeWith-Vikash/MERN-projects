import React, { useRef, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping,FaXmark} from "react-icons/fa6";
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [query, setQuery] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const [isnav, setisnav] = useState(false)
    const navref=useRef(null)
    const togglenav=()=>{
        if(isnav){
            navref.current.style.transform='translateX(100%)'
        }else{
            navref.current.style.transform='translateX(0%)'
        }
        setisnav(!isnav)
    }
  return (
    <>
      <nav className='bg-blue-500 px-2 md:px-4 h-[60px] text-white flex justify-between items-center'>
        <Link to="/">
        <img src="/logo.png" className={`h-10 ${isFocus?'hidden md:block':''}`}/>
        </Link>
       
        <section className='flex items-center gap-2 md:gap-4'>
        <div className="relative text-gray-900">
            <input
              type="text"
              placeholder="Search.."
              className={`outline-none border-none px-4 rounded-full w-[30vw] md:w-[250px] h-8 ${
                isFocus && "w-[95vw] md:w-[250px]"
              }`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            //   onKeyDown={(e) => e.key === "Enter" && searchProduct()}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocus(false);
                }, 100);
              }}
            />
            <FaSearch
              size="1rem"
              className="absolute right-2 top-[50%] translate-y-[-50%]"
            //   onClick={searchProduct}
            />
          </div>
            <div className={`option flex items-center gap-4 ${isFocus?'hidden md:flex':''}`}>
            <Link to='/cart'>
            <div className='relative'>
            <FaCartShopping size='1.7rem'/>
             <div className='h-4 min-w-4 w-fit rounded-full bg-violet-800 absolute top-[-4px] right-[-5px] flex justify-center items-center text-sm font-semibold p-1'>2</div>
            </div>
            </Link>
            {isnav?
             <FaXmark size='1.7rem' className='md:hidden cursor-pointer' onClick={togglenav}/>
            :<GiHamburgerMenu size='1.7rem' className='md:hidden cursor-pointer' onClick={togglenav}/>}
            </div>
        <div className='hidden md:flex gap-4 items-center'>
            <Link to={'/login'}>
            <button className='border-2 py-1 px-4 rounded-full font-semibold hover:bg-violet-700'>Login</button>
            </Link>
            <button className='border-2 py-1 px-4 rounded-full font-semibold hover:bg-red-700'>Logout</button>
                <img src="https://tse1.mm.bing.net/th?id=OIP.L9TDz5qgN6cJxSnqK8XDGQHaHa&pid=Api&P=0&h=220" className='h-10 w-10 rounded-full' />
        </div>
        </section>

      </nav>

      <section className='glass flex flex-col gap-4 items-center text-white h-[90vh] w-full absolute pt-10 z-[999]' ref={navref}>
            <div className='flex items-center gap-1'>
                <img src="https://tse1.mm.bing.net/th?id=OIP.L9TDz5qgN6cJxSnqK8XDGQHaHa&pid=Api&P=0&h=220" className='h-10 w-10 rounded-full' />
                <p className='font-semibold'>Vikash kumar</p>
            </div>
            <Link to={'/login'}>
            <button className='border-2 py-1 px-4 rounded-full font-semibold hover:bg-violet-700'>Login</button>
            </Link>
            <button className='border-2 py-1 px-4 rounded-full font-semibold hover:bg-red-700'>Logout</button>
        </section>
    </>
  )
}

export default Navbar