import React from 'react'

const Product = () => {
  return (
    <div className='card w-[250px] p-2 rounded-lg'>
        <div className='w-full overflow-hidden'>
        <img src="https://tse3.mm.bing.net/th?id=OIP.mU1fRdYJy7IVnZwF0J_WCAHaEB&pid=Api&P=0&h=220" className='h-[200px] w-full object-cover hover:scale-[1.1] transition-[0.3s]'/>
        </div>
        <div className='p-2'>
        <p>Canon EOS 80D DSLR</p>
        <b>$399</b>
        </div>
    </div>
  )
}

export default Product