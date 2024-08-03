import React, { useContext, useEffect, useRef, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {MainContext} from '../../context/MainContext'

const Post = ({data}) => {
  const navigate=useNavigate()
  const commentref=useRef()
  const [showcomment, setshowcomment] = useState(false)
  const [commenttext, setcommenttext] = useState('')
  const [commenting, setcommenting] = useState(false)
  const {getPost,userdata} = useContext(MainContext)
  const [isliked, setisliked] = useState(false)

  // check if post is liked by the user
  const checkLike = () => {
    if (!data || !userdata) return; 
    const liked = data.likes.some(element => element.userId === userdata._id);
    setisliked(liked);
  }

  useEffect(() => {
    checkLike();
  }, [data, userdata])
   
  // function to toggle comment section
  const toggleComment=()=>{
    setshowcomment(!showcomment)
  }
  // function to add comment
  const addComment=(e)=>{
    e.preventDefault()
    if(userdata){
      setcommenting(true)
     axios.patch(`http://localhost:3000/post/${data?._id}/comment`,{
          username:userdata.username,
          avatar:userdata.avatar,
          userId:userdata._id,
          comment:commenttext
     }).then((data)=>{
      console.log(data);
      setcommenttext('')
      setcommenting(false)
      getPost()
     }).catch((err)=>{
      console.log(err);
      setcommenting(false)
     })
    }else{
      navigate('/login')
    }
  }
  // function to add like
  const addLike=(e)=>{
    if(userdata){
      axios.patch(`http://localhost:3000/post/${data?._id}/like`,{
        username:userdata.username,
        userId:userdata._id
   }).then((result)=>{
      const likes=result.data.data.likes
      console.log(likes);
      getPost()
      checkLike()
   }).catch((err)=>{
    console.log(err);
   })
    }else{
      navigate('/login')
    }
  }

  return (
    <div className='bg-white w-[300px] p-2 rounded md:w-[500px] lg:w-[700px] flex flex-col gap-4'>
      <section className='flex items-center gap-2'>
        <Link to={data?.userInfo?.userId==userdata?._id?`/dash`:`/profile/${data?.userInfo?.userId}`}>
        <img src={data?.userInfo?.avatar} className='h-10 w-10 rounded-full object-cover'/>
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
        <p className='flex items-center gap-1 cursor-pointer' onClick={addLike}><AiFillLike size='1.5rem' className={isliked?'text-blue-700':'text-black'}/> Like</p>
        <p className='flex items-center gap-1 cursor-pointer' onClick={toggleComment}><FaComment color='black' size='1.5rem'/> Comment</p>
      </section>
       <hr />
      {showcomment && <section ref={commentref}>
         <div className='flex flex-col gap-4 max-h-[200px] overflow-auto pb-2'>
            {data?.comments.map((comment)=>{
              return <div className='flex gap-2' key={comment.username}>
              <Link to={comment.userId==userdata?._id?`/dash`:`/profile/${comment.userId}`}>
              <img src={comment.avatar} className='h-10 w-10 rounded-full object-cover'/>
              </Link>
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
           <img src={userdata?.avatar} className='h-10 w-10 rounded-full object-cover'/>
        </Link>
          <form onSubmit={addComment}>
          <textarea rows="3" cols='0' className='bg-blue-100 p-2 outline-none w-full' placeholder='write your comment here...'
          value={commenttext}
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