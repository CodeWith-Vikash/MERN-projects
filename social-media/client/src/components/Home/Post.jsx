import React, { useContext, useRef, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {MainContext} from '../../context/MainContext'

const Post = ({data}) => {
  const commentref=useRef()
  const [showcomment, setshowcomment] = useState(false)
  const [commenttext, setcommenttext] = useState('')
  const [commenting, setcommenting] = useState(false)
  const {getPost} = useContext(MainContext)
  // function to toggle comment section
  const toggleComment=()=>{
    setshowcomment(!showcomment)
  }
  // function to add comment
  const addComment=(e)=>{
    e.preventDefault()
    setcommenting(true)
     axios.patch(`http://localhost:3000/post/${data?._id}/comment`,{
          username:'summer jain',
          avatar:"default",
          comment:commenttext
     }).then((data)=>{
      console.log(data);
      setcommenting(false)
      setcommenttext('')
      getPost()
     }).catch((err)=>{
      console.log(err);
      setcommenting(false)
     })
  }
  return (
    <div className='bg-white w-[300px] p-2 rounded md:w-[500px] lg:w-[700px] flex flex-col gap-4'>
      <section className='flex items-center gap-2'>
        <Link to={`/profile/${data?.userInfo?.username}`}>
        <img src={data?.userInfo?.avatar} className='h-10 w-10 rounded-full'/>
        </Link>
        <div className='flex flex-col leading-5'>
          <p className='font-semibold'>{data?.userInfo?.username}</p>
          <p className='text-sm'>3 days ago</p>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <p className='leading-5'>{data?.title}</p>
        {data?.image && <img src={data?.image} className='h-[300px] w-full object-cover'/>}
      </section>

      <section className='flex justify-between px-2'>
          <p className='flex items-center gap-1'>
            <AiFillLike color='blue' size='1rem'/>
            {data?.likes.length}
          </p>

          <p className='flex items-center gap-1'>{data?.comments.length} <FaCommentAlt color='gray' size='1rem'/></p>
      </section>
      <hr />

      <section className='flex justify-between px-2'>
        <p className='flex items-center gap-1 cursor-pointer'><AiFillLike color='black' size='1.5rem'/> Like</p>
        <p className='flex items-center gap-1 cursor-pointer' onClick={toggleComment}><FaComment color='black' size='1.5rem'/> Comment</p>
      </section>
       <hr />
      {showcomment && <section ref={commentref}>
         <div className='flex flex-col gap-4 max-h-[200px] overflow-auto pb-2'>
            {data?.comments.map((comment)=>{
              return <div className='flex gap-2' key={comment.username}>
              <img src={comment.avatar} className='h-10 w-10 rounded-full'/>
               <div className='bg-gray-200 p-2 rounded w-full'>
                <p className='font-semibold text-sm'>{comment.username}</p>
                <p className='leading-4'>
                {comment.comment}
                </p>
               </div>
            </div>
            })}
         </div>

         <div className='flex gap-2 bg-gray-700 p-2 rounded-lg'>
         <Link to='/dash'>
           <img src="https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-1/441536166_437807788855507_2768361419187942287_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=TqgV9mSr2DgQ7kNvgEzDVNf&_nc_ht=scontent.fpat2-3.fna&gid=AZ5NgVnF6qopzwe2B-tba1a&oh=00_AYBht9XU0V9AlC1YqMAHvWIe4D1UOR2ApkHSfnMkPB-EGA&oe=66B0E3F2" className='h-10 w-10 rounded-full'/>
        </Link>
          <form onSubmit={addComment}>
          <textarea rows="3" cols='0' className='bg-blue-100 p-2 outline-none w-full' placeholder='write your comment here...'
           onChange={(e)=>setcommenttext(e.target.value)}
           required
          ></textarea>
          <button className='bg-blue-600 text-white py-1 px-2 rounded'>{commenting?'Adding...':'Add Comment'}</button>
          </form>
         </div>
      </section>}
    </div>
  )
}

export default Post