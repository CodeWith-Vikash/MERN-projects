import React, { useContext } from 'react'
import Hero from './Hero'
import Product from './Product'
import {MainContext} from '../context/MainContext'

const Home = () => {
  const {allproducts}=useContext(MainContext)
  return (
    <div className='min-h-screen bg-blue-500 text-white'>
      <Hero/>
      <main className='py-10 px-5'>
        <h3 className='text-3xl font-semibold'>Products</h3>
        <div className='flex justify-center gap-5 flex-wrap pt-10'>
          {allproducts.map((item)=>{
            return <Product data={item} key={item._id}/>
          })}
        </div>
      </main>
    </div>
  )
}

export default Home