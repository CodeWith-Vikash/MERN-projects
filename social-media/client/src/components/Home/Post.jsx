import React from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const Post = () => {
  return (
    <div className='bg-white w-[300px] p-2 rounded md:w-[500px] lg:w-[700px] flex flex-col gap-4'>
      <section className='flex items-center gap-2'>
        <img src="https://scontent.fpat2-3.fna.fbcdn.net/v/t1.6435-1/142836521_253505912798853_5330703735152789451_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=107&ccb=1-7&_nc_sid=616b0e&_nc_ohc=76XpxK5KuY0Q7kNvgGWTtLi&_nc_ht=scontent.fpat2-3.fna&oh=00_AYAEGpJ4eF7KOIkbgS7ZGuS_tYy4dVExkk7idFsaCwjceA&oe=66D26F62" className='h-10 w-10 rounded-full'/>
        <div className='flex flex-col leading-5'>
          <p className='font-semibold'>Robert Downey jr.</p>
          <p className='text-sm'>3 days ago</p>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <p className='leading-5'>Robert downey jr is comming back in to marvel as victor doom. NEW MASK SAME TASK!</p>
        <img src="https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-6/453413380_479049394731346_1529430541061158191_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=7u9fWkedNmMQ7kNvgHYH964&_nc_ht=scontent.fpat2-3.fna&gid=AZ5NgVnF6qopzwe2B-tba1a&oh=00_AYAJpjWesrt1XkJzPf5XG-c4z0cBtGr4IMO2B3AM_5owzw&oe=66B0D796" className='h-[300px] w-full object-cover'/>
      </section>

      <section className='flex justify-between px-2'>
          <p className='flex items-center gap-1'>
            <AiFillLike color='blue' size='1rem'/>
            100k
          </p>

          <p className='flex items-center gap-1'>100 <FaCommentAlt color='gray' size='1rem'/></p>
      </section>
      <hr />

      <section className='flex justify-between px-2'>
        <p className='flex items-center gap-1'><AiFillLike color='black' size='1.5rem'/> Like</p>
        <p className='flex items-center gap-1'><FaComment color='black' size='1.5rem'/> Comment</p>
      </section>
    </div>
  )
}

export default Post