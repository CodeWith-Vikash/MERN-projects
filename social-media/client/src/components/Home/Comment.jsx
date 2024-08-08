import React, { useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import {MainContext} from '../../context/MainContext'
import { RiSendPlane2Fill } from "react-icons/ri";
import Reply from './Reply'
import axios from 'axios'

const Comment = ({comment,postId}) => {
    const {commentTimeGap,userdata,getPost} =useContext(MainContext)
    const [showreplies, setshowreplies] = useState(false)
    const [showinputbox, setshowinputbox] = useState(false)
    const [replyval, setreplyval] = useState('')

    const toggleReplyBox=()=>{
      setshowinputbox(!showinputbox)
    }

   //  function to reply comment
    const replyComment=(e)=>{
       e.preventDefault()
       axios.patch(`http://localhost:3000/post/${postId}/comment/${comment._id}/reply`,{
           username:userdata.username,
           avatar: userdata.avatar,
           reply: replyval,
           userId: userdata.userId,
           commentUser:comment.username
       }).then((result)=>{
          console.log(result);
          setreplyval('')
          getPost()
          setshowreplies(true)
       }).catch((err)=>{
          console.log(err)
       })
    }
  return (
    <>
       <div className='flex gap-2'>
              <Link to={comment.userId==userdata?._id?`/dash`:`/profile/${comment.userId}`}>
              <img src={comment.avatar} className='h-10 w-10 rounded-full object-cover'/>
              </Link>
               <div>
               <div className='bg-gray-200 p-2 rounded w-full'>
                <p className='font-semibold'>{comment.username}</p>
                <p className='leading-4'>
                {comment.comment}
                </p>
               </div>
               <div className='flex gap-2 items-center px-2'>
                <p className='text-sm'>{commentTimeGap(comment.commentDate)}</p>
                <p className='text-sm font-semibold hover:underline cursor-pointer' onClick={toggleReplyBox}>reply</p>
                </div>
                
                 {comment.replies.length>0 && <p className='cursor-pointer' onClick={()=>setshowreplies(!showreplies)}>View {comment.replies.length} replies</p>}
                 {/* replies section */}
                 {showreplies && <section className="replies flex flex-col gap-2">
                    {comment.replies.map((reply,index)=>{
                      return <Reply reply={reply} username={comment.username} postId={postId} commentId={comment._id} key={index}/>
                    })}
                 </section>}
               </div>
            </div>
            {/* reply box */}
            {showinputbox && <form className='flex items-center gap-2 bg-gray-800 p-2 rounded' onSubmit={(e)=>replyComment(e)}>
                <Link to='/dash'>
                <img src="https://scontent.fpat1-1.fna.fbcdn.net/v/t39.30808-1/376739361_1017472883037422_7495366963365257314_n.jpg?stp=cp0_dst-jpg_p32x32&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=CWZ7KpDdDUQQ7kNvgHU57sJ&_nc_ht=scontent.fpat1-1.fna&oh=00_AYBq3-0d-oV8sJWQwQB_plxBcUN26F5LpCGktBAzfXmEJQ&oe=66B95409" className='h-7 w-7 rounded-full object-cover'/>
                </Link>
                <input type="text" value={replyval}
                 required
                 onChange={(e)=> setreplyval(e.target.value)}
                 placeholder={`reply to ${comment.username}`}
                 className='outline-none p-2 rounded-full bg-green-200 text-sm w-[90%]'
                />
                <button type="submit">
                <RiSendPlane2Fill size='1.5rem' color='white' className='cursor-pointer'/>
                </button>
             </form>}
    </>
  )
}

export default Comment