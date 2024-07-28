import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mainContext } from '../context/MainContext'
import Navbar from './Navbar'
import Footer from './Footer'

const BlogDetails = () => {
  const [singlepost, setsinglepost] = useState({})
  const [autherInfo, setautherInfo] = useState({})
  const {id} = useParams()
  const {isdark,postdata,getPost} = useContext
  (mainContext)

  
  useEffect(() => {
    const fetchData = async () => {
      await getPost()
    }

    fetchData()
  }, [getPost])

  useEffect(() => {
    if (postdata.length > 0) {
      const data = postdata.filter((post) => post._id === id)
      setsinglepost(data[0])
      setautherInfo(data[0]?.autherInfo[0])
    }
  }, [postdata, id])
  return (
    <div className={`${isdark?'bg-gray-900 text-white':'bg-white text-black'}`}>
        <Navbar/>
        <main className='min-h-screen flex flex-col gap-4 p-4 lg:flex-row lg:justify-center lg:gap-[30px] lg:pt-16 lg:pb-10 py-10'>
            <img src={singlepost?.image} className='w-full h-[300px] object-cover lg:h-[400px] lg:w-[500px] rounded'/>
             <section className='flex flex-col gap-4 lg:w-[500px] lg:py-6'>
             <div className='flex items-center gap-2'>
                <img src={autherInfo?.avatar} className='h-12 w-12 rounded-full object-cover'/>
                <b>@{autherInfo?.auther}</b>
            </div>
            <h3 className='font-bold text-4xl'>{singlepost?.title}</h3>
            <p className='font-semibold leading-6'>{singlepost?.text}</p>
             </section>
        </main>
        <Footer/>
    </div>
  )
}

export default BlogDetails