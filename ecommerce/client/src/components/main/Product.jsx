import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({data}) => {
  const actualprice= data?.price-((data?.price*data?.discount)/100)
  return (
    <>
      <Link to={`/product/${data?._id}`}>
      <div className='card w-[250px] p-2 rounded-lg h-[300px]'>
        <div className='w-full overflow-hidden'>
        <img src={data?.image} className='h-[200px] w-full object-contain hover:scale-[1.1] transition-[0.3s]'/>
        </div>
        <div className='p-2'>
        <p className='max-h-[50px] overflow-hidden'>{data?.name}</p>
        <b>${actualprice}</b>
        </div>
    </div>
      </Link>
    </>
  )
}

export default Product