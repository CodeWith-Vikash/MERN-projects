import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillLike,AiFillDislike } from "react-icons/ai";

const Review = ({data}) => {
  return (
    <div className='max-w-[500px] flex flex-col gap-2 border-b-2 pb-2 border-blue-900'>
        <div className='flex bg-green-700 items-center w-fit gap-1 px-2 rounded'>
          <p>{data?.rating}</p>
          <FaStar/>
        </div>
        <p className='leading-5'>{data?.description}</p>
        <div className='flex gap-2 flex-wrap'>
          {data?.images.map((image)=>{
             return <img src={image} className='w-[150px] h-[100px] object-cover'/>
          })}
        </div>
        <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center text-sm gap-1 text-gray-800'>
        <p>Piyush mishra</p>
        <FaCheckCircle/>
        <p>Certified Buyer, Bhuvaneshwar</p>
        <p>, 25feb 2024</p>
        </div>
        <div className='flex items-center gap-3'>
            <p className='flex items-center'>
                <AiFillLike size='1rem'/>
                {data?.likes.length}
            </p>
            <p className='flex items-center'>
                <AiFillDislike size='1rem'/>
                {data?.dislikes.length}
            </p>
        </div>
        </div>
    </div>
  )
}

export default Review