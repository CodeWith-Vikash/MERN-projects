import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {MainContext} from '../context/MainContext'
import  {toast} from 'react-toastify'
import {Link} from 'react-router-dom'

const Myorders = () => {
    const [myorders, setmyorders] = useState([])
    const {baseurl,userdata} = useContext(MainContext)
    const [canceling, setcanceling] = useState(false)
    // function to ge my orders
    const getMyOrders=()=>{
        axios.get(`${baseurl}/api/order/${userdata._id}`).then((result)=>{
            console.log(result)
            setmyorders(result.data.orders)
        }).catch((err)=>{
            console.log(err)
            toast.error(err.response?err.response.data.message:'something went wrong')
        })
    }

     // function to cancel order
     const cancelOrder=(id)=>{
        setcanceling(true)
        axios.patch(`${baseurl}/api/order/status/${id}`,{status:'canceled'}).then((result)=>{
            console.log(result)
            getMyOrders()
        }).catch((err)=>{
            console.log(err)
            toast.error(
                err.response
                  ? err.response.data.message
                  : "something went wrong"
              );
        }).finally(()=> setcanceling(false))
    }

    useEffect(()=>{
        if(userdata){
            getMyOrders()
        }
    },[userdata])
  return (
    <div className='flex flex-col gap-2 pb-10 w-full p-2 items-center'>
        {myorders.map((order)=>{
            return <div className='text-black bg-white flex gap-2 flex-col md:flex-row rounded-lg w-full max-w-[1200px]'>
                <section className='p-2 flex flex-col gap-2 md:w-[60%]'>
                    <h3 className='text-lg font-semibold text-center'>Order items</h3>
                    <div className='flex flex-col gap-2 max-h-[200px] overflow-auto'>
                        {order.items.map((item)=>{
                            return <Link to={`/product/${item.product._id}`}>
                                <div className='flex justify-between items-center text-sm p-2 gap-2'>
                                <img src={item.product.image} className='h-10 w-10 object-contain'/>
                                <p className='leading-4 '>{item.product.name}</p>
                                <p className=''>{(item.product.price-(item.product.price*item.product.discount)/100).toFixed(0)} x {item.quantity}</p>
                            </div>
                            </Link>
                        })}
                    </div>
                </section>
                <section className=' p-2 rounded flex flex-col gap-2 items-center'>
                    <h3 className='text-center font-semibold text-lg'>Order details</h3>
                    <div className='flex flex-col gap-2'>
                    <p>UserName : {order.userId.username}</p>
                        <p>Address : {order.userId.address.nearby} ,   {order.userId.address.city} , {order.userId.address.state}</p>
                        <p>Total price : ${order.totalprice}</p>
                        <p>Staus : <span className={order.status=='pending' || order.status=='canceled'?'text-red-500':order.status=='shipped'?'text-yellow-500':'text-green-500'}>{order.status}</span></p>
                        {order.status !='delivered'&& order.status !='canceled' && <button className='bg-red-500 py-1 px-2 rounded text-white flex items-center gap-1 w-fit' onClick={()=> cancelOrder(order._id)}>Cancel Order
                            {canceling && <img src="/loader.gif" className='h-4 rounded-full'/>}
                            </button>}
                    </div>
                </section>
            </div>
        })}
    </div>
  )
}

export default Myorders