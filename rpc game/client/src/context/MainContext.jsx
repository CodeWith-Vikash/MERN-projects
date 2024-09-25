import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const MainContext = createContext(null)

export const ContextProvider=({children})=>{
    const baseurl='http://localhost:3000'
    const [token, settoken] = useState(null)
    const [userdata, setuserdata] = useState(null)
    const [game, setgame] = useState(null)
    const [winner, setwinner] = useState(null)

    const getToken=()=>{
      const jsontoken=Cookies.get('token')
      if(jsontoken){
        settoken(jsontoken)
      }else{
        settoken(null)
      }
    }
    const getUserdata=()=>{
        const data =Cookies.get('userdata')
        if(data){
            const jsondata= JSON.parse(data)
            setuserdata(jsondata)
        }else{
            setuserdata(null)
        }
    }

    const findgame=()=>{
      axios.get(`${baseurl}/api/game/${userdata._id}`).then((result)=>{
        console.log(result)
         setgame(result.data.game)
      }).catch((err)=>{
         toast.error(err.response?err.response.data.message:'something went wrong')
      })
    }
    
     useEffect(()=>{
      getToken()
      getUserdata()
     },[])

     useEffect(()=>{
      if(userdata){
        findgame()
      }
     },[userdata])
     
    return <MainContext.Provider value={{baseurl,token,userdata,getToken,getUserdata,game,setgame,winner,setwinner}}>
        {children}
    </MainContext.Provider>
}