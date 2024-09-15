import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {MainContext} from '../context/MainContext'
import  {toast} from 'react-toastify'

const Myorders = () => {
    const [myorders, setmyorders] = useState([])
    const {baseurl,userdata} = useContext(MainContext)
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

    useEffect(()=>{
        if(userdata){
            getMyOrders()
        }
    },[userdata])
  return (
    <div>Myorders</div>
  )
}

export default Myorders