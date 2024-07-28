import React, { useContext } from 'react'
import {mainContext} from '../context/MainContext'
import Navbar from './Navbar'
import Footer from './Footer'

const Dashbord = () => {
  const {isdark,userdata,postdata}= useContext(mainContext)
  console.log(postdata)
  return (
    <div className={`min-h-screen ${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
      <Navbar/>
        <main className='min-h-screen'>
          <section className={`flex justify-center flex-wrap items-center gap-4 p-5 ${isdark?'bg-gray-800':'bg-gray-300'}`}>
            <img src={userdata?.avatar} className='h-[200px] w-[200px] object-cover rounded-full'/>
            <div className='flex flex-col items-center w-[300px]'>
              <b className='text-lg'>@{userdata?.username}</b>
              <p className='text-sm font-semibold leading-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam dolorem at, esse labore quidem ab error quibusdam molestias omnis officiis similique a ducimus magnam ea voluptates nesciunt sit, repellat aliquam!</p>
            </div>
          </section>
           <h3 className='font-bold text-2xl text-center my-10'>My Blogs</h3>
        <section className='flex justify-center flex-wrap gap-4 p-4 pb-10'>
         {
          postdata?.filter((post)=> post.autherInfo[0].auther==userdata.username).map((post)=>{
             return <div className='w-[250px] flex flex-col gap-2 rounded-lg shadow-2xl p-4 h-fit' key={post._id}>
             <div className={` h-[150px] w-full bg-cover flex flex-col justify-center gap-2 p-4 font-semibold`} style={{backgroundImage:`url(${post.image})`}}>
             <button className='bg-yellow-600 px-2 py-1 rounded'>Edit blog</button>
             <button className='bg-red-600 px-2 py-1 rounded'>Delete blog</button>
             </div>
             <h3 className='text-sm leading-5'>{post.title}</h3>
           </div>
          })
         }
        </section>
        </main>
      <Footer/>
    </div>
  )
}

export default Dashbord