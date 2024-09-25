import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

export const MainContext = createContext(null)

export const ContextProvider=({children})=>{
    const baseurl='http://localhost:3000'
    const [token, settoken] = useState(null)
    const [userdata, setuserdata] = useState(null)
    const [game, setgame] = useState(null)

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
    
     useEffect(()=>{
      getToken()
      getUserdata()
     },[])
     
    return <MainContext.Provider value={{baseurl,token,userdata,getToken,getUserdata,game,setgame}}>
        {children}
    </MainContext.Provider>
}