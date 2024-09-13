import React, { useContext, useEffect, useState } from 'react'
import CartTable from './CartTable'
import { MainContext } from '../context/MainContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'

const Cart = () => {
  const {baseurl,userdata,setcart,cart} = useContext(MainContext)
  const [grandtotal, setgrandtotal] = useState(0)
  const [total, settotal] = useState(0)
  const [shippingfee, setshippingfee] = useState(100)

  const calculateTotal=()=>{
     const gtotal= cart.reduce((acc,curval)=>{
      const actualprice= (curval.product?.price-((curval.product?.price*curval.product?.discount)/100)).toFixed(0)
      const tPrice = curval.quantity *actualprice;
      return tPrice+acc
    },0)
    setgrandtotal(gtotal)
    settotal(gtotal+shippingfee)
  }

  useEffect(()=>{
    calculateTotal()
  },[cart])
  // function to get cart
  const getCart=()=>{
     axios.get(`${baseurl}/api/cart/${userdata._id}`).then((result)=>{
      console.log(result)
      setcart(result.data.cart.items)
     }).catch((err)=>{
      console.log(err)
      toast.error(err.response? err.response.data.message:'something went wrong')
     })
  }

  useEffect(()=>{
    if(userdata){
      getCart()
    }
  },[userdata])
  return (
    <div className='h-screen bg-blue-500 text-white py-10 px-2 flex flex-col gap-2 items-end'>
      {cart.length< 1 ?
        <div className='flex flex-col items-center w-full pt-10 gap-2'>
          <b className='text-xl'>No items in cart</b>
          <Link to='/'>
          <button className='bg-violet-800 py-1 px-2 rounded text-white'>Go to homepage</button>
          </Link>
        </div>
       :
       <div className='flex flex-col gap-2 items-end'>
        <CartTable cart={cart} setcart={setcart}/>
       <div className='w-[250px] bg-white text-black rounded-lg flex flex-col gap-2 p-2'>
         <p>Grand Total: <b>${grandtotal}</b></p>
         <p>Shipping fee: <b>${shippingfee}</b></p>
         <div className='w-full bg-gray-600 h-[2px]'></div>
         <p>Total Price: <b>${total}</b></p>
         <button className='bg-violet-800 py-1 px-2 rounded text-white'>Pay now</button>
       </div>
       </div>
      }
    </div>
  )
}

export default Cart