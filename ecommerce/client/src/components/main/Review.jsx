import React, { useContext, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaCheckCircle,FaTrash } from "react-icons/fa";
import { AiFillLike,AiFillDislike } from "react-icons/ai";
import axios from 'axios'
import {toast} from 'react-toastify'
import {MainContext} from '../context/MainContext'

const Review = ({data,getsingleproduct,singledata}) => {
  const {userdata,baseurl} = useContext(MainContext)
  const [deleting, setdeleting] = useState(false)
  // console.log(data,userdata)
  // fuction to delte review
  const deleteReview=(e)=>{
    setdeleting(true)
    axios.patch(`${baseurl}/api/product/review/delete/${singledata._id}`,{reviewId: data._id}).then((result)=>{
      console.log(result)
      getsingleproduct()
      toast.info(result.data.message)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    }).finally(()=> setdeleting(false))
  }

  // function to like a review
  const likeReview=(e)=>{
    axios.patch(`${baseurl}/api/product/review/like/${singledata._id}`,{reviewId: data._id,userId:userdata._id}).then((result)=>{
      console.log(result)
      getsingleproduct()
      toast.info(result.data.message)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }

  // function to dislike a review
  const dislikeReview=(e)=>{
    axios.patch(`${baseurl}/api/product/review/dislike/${singledata._id}`,{reviewId: data._id,userId:userdata._id}).then((result)=>{
      console.log(result)
      getsingleproduct()
      toast.info(result.data.message)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }

  return (
    <div className='max-w-[500px] flex flex-col gap-2 border-b-2 pb-2 border-blue-900'>
        <section className='flex justify-between items-center'>
        <div className='flex bg-green-700 items-center w-fit gap-1 px-2 rounded'>
          <p>{data?.rating}</p>
          <FaStar/>
        </div>
        {userdata?._id == data?.userInfo._id && <div>
        {deleting?
         <img src="/loader.gif" className='rounded-full w-5'/>
         :
         <FaTrash size={'1.5rem'} color='red' onClick={deleteReview} className='cursor-pointer'/>
        }
        </div>}
        </section>
        <p className='leading-5'>{data?.description}</p>
        <div className='flex gap-2 flex-wrap'>
          {data?.images.map((image)=>{
             return <img src={image} className='w-[150px] h-[100px] object-cover'/>
          })}
        </div>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center text-sm gap-1 text-gray-800'>
        <p>{data?.userInfo.username}</p>
        <FaCheckCircle/>
        <p>Certified Buyer, {data?.userInfo.address.city}</p>
        <p>, {new Date(data?.reviewDate).toDateString()}</p>
        </div>
        <div className='flex items-center gap-3'>
            <p className='flex items-center cursor-pointer' onClick={!data.likes.includes(userdata?._id) && likeReview}>
                <AiFillLike size='1rem' style={data.likes.includes(userdata?._id)?{color:'blue'}:null}/>
                {data?.likes.length}
            </p>
            <p className='flex items-center cursor-pointer' onClick={!data.dislikes.includes(userdata?._id) && dislikeReview}>
                <AiFillDislike size='1rem' style={data.dislikes.includes(userdata?._id)?{color:'blue'}:null}/>
                {data?.dislikes.length}
            </p>
        </div>
        </div>
    </div>
  )
}

export default Review