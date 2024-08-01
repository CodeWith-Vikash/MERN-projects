import React, { useRef, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Post = () => {
  const commentref=useRef()
  const [showcomment, setshowcomment] = useState(false)
  // function to toggle comment section
  const toggleComment=()=>{
    setshowcomment(!showcomment)
  }
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
        <p className='flex items-center gap-1 cursor-pointer'><AiFillLike color='black' size='1.5rem'/> Like</p>
        <p className='flex items-center gap-1 cursor-pointer' onClick={toggleComment}><FaComment color='black' size='1.5rem'/> Comment</p>
      </section>
       <hr />
      {showcomment && <section ref={commentref}>
         <div className='flex flex-col gap-4 max-h-[200px] overflow-auto pb-2'>
              <div className='flex gap-2'>
                <img src="https://scontent.fpat2-1.fna.fbcdn.net/v/t39.30808-1/320239150_1551728618659344_8533118537725504809_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=_2X7uylFd1cQ7kNvgFpbFZ5&_nc_ht=scontent.fpat2-1.fna&gid=AZvKhIaMl-NqQRuCdufuCGH&oh=00_AYCbq3vgtqjCLhLHXPynEcGijlVIgBS0zYH-t7TlByv1nA&oe=66B16B2C" className='h-10 w-10 rounded-full'/>
                 <div className='bg-gray-200 p-2 rounded'>
                  <p className='font-semibold text-sm'>samuel collbaugh</p>
                  <p className='leading-4'>
                  Without God nothing in my life seemed possible 4 years ago
                  </p>
                 </div>
              </div>
              {/* ...... */}
         </div>

         <div className='flex gap-2 bg-gray-700 p-2 rounded-lg'>
         <Link to='/dash'>
           <img src="https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-1/441536166_437807788855507_2768361419187942287_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=TqgV9mSr2DgQ7kNvgEzDVNf&_nc_ht=scontent.fpat2-3.fna&gid=AZ5NgVnF6qopzwe2B-tba1a&oh=00_AYBht9XU0V9AlC1YqMAHvWIe4D1UOR2ApkHSfnMkPB-EGA&oe=66B0E3F2" className='h-10 w-10 rounded-full'/>
        </Link>
          <form>
          <textarea rows="3" cols='0' className='bg-blue-100 p-2 outline-none w-full' placeholder='write your comment here...'></textarea>
          <button className='bg-blue-600 text-white py-1 px-2 rounded'>Add comment</button>
          </form>
         </div>
      </section>}
    </div>
  )
}

export default Post