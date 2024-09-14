import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({data,tag}) => {
  const actualprice= (data?.price-((data?.price*data?.discount)/100)).toFixed(0)
  return (
    <>
      <Link to={`/product/${data?._id}`}>
      <div className='card w-[250px] p-2 rounded-lg h-[300px] relative'>
        <div className='w-full overflow-hidden'>
        <img src={data?.image} className='h-[200px] w-full object-contain hover:scale-[1.1] transition-[0.3s]'/>
        </div>
        <div className='p-2'>
        <p className='max-h-[50px] overflow-hidden'>{data?.name}</p>
        <span className='line-through text-black mx-2'>${data?.price}</span>
        <b>${actualprice}</b>
        </div>
        {tag && <span className='bg-black p-1 text-lg absolute top-0 right-0'>{data?.discount}% off</span>}
    </div>
      </Link>
    </>
  )
}

export default Product