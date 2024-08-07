import React, { useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import {MainContext} from '../../context/MainContext'
import { RiSendPlane2Fill } from "react-icons/ri";

const Comment = ({comment}) => {
    const {commentTimeGap,userdata} =useContext(MainContext)
    const [showreplies, setshowreplies] = useState(false)
    const [showinputbox, setshowinputbox] = useState(!false)
    const [replyval, setreplyval] = useState(comment.username)
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
                <p className='text-sm font-semibold hover:underline cursor-pointer'>reply</p>
                </div>
                
                 <p className='cursor-pointer' onClick={()=>setshowreplies(!showreplies)}>View 1 reply</p>
                 {/* replies section */}
                 {showreplies && <section className="replies flex flex-col gap-2">
                    <div className="reply flex gap-1">
                        <Link to='/'>
                        <img src="https://scontent.fpat1-2.fna.fbcdn.net/v/t39.30808-1/434959969_6754305254670590_7608242339663402294_n.jpg?stp=cp0_dst-jpg_p32x32&_nc_cat=102&ccb=1-7&_nc_sid=50d2ac&_nc_ohc=uLrSJdbgJgoQ7kNvgGvaB6t&_nc_ht=scontent.fpat1-2.fna&oh=00_AYDS0fWTPsgsSAOHaT07gZTYpGH21EK9tADguCKPhsL6uw&oe=66B94A5B" className='h-7 w-7 rounded-full object-cover'/>
                        </Link>
                        <div>
               <div className='bg-blue-200 p-2 rounded w-full'>
                <p className='font-semibold text-sm'>{'rahul dua'}</p>
                <p className='leading-4'>
                 <span className='font-semibold'>Scarlet jhonsson </span>
                {'keep supporting'}
                </p>
               </div>
               <div className='flex gap-2 items-center px-2'>
                <p className='text-sm'>{commentTimeGap(comment.commentDate)}</p>
                <p className='text-sm font-semibold hover:underline cursor-pointer'>reply</p>
                </div>
                 </div>
                    </div>
                    {/* lllllll */}
                 </section>}
               </div>
            </div>
            {/* reply box */}
            {showinputbox && <section className='flex items-center gap-2 bg-gray-800 p-2 rounded'>
                <Link to='/dash'>
                <img src="https://scontent.fpat1-1.fna.fbcdn.net/v/t39.30808-1/376739361_1017472883037422_7495366963365257314_n.jpg?stp=cp0_dst-jpg_p32x32&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=CWZ7KpDdDUQQ7kNvgHU57sJ&_nc_ht=scontent.fpat1-1.fna&oh=00_AYBq3-0d-oV8sJWQwQB_plxBcUN26F5LpCGktBAzfXmEJQ&oe=66B95409" className='h-7 w-7 rounded-full object-cover'/>
                </Link>
                <input type="text" value={replyval}
                 onChange={(e)=> setreplyval(e.target.value)}
                 placeholder={`reply to ${comment.username}`}
                 className='outline-none p-2 rounded-full bg-green-200 text-sm'
                />
                <RiSendPlane2Fill size='1.5rem' color='blue'/>
             </section>}
    </>
  )
}

export default Comment