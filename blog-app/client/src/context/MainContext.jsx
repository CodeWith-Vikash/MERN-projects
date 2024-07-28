import { createContext, useEffect, useState } from 'react'


export const mainContext= createContext(null)

export const ContextProvider=({children})=>{
    const [isdark, setisdark] = useState(!false)
    const [userdata, setuserdata] = useState(null)
    const [postdata, setpostdata] = useState([])

    const toggleTheme=()=>{
        setisdark(!isdark)
    }

    const getlocalstorage=()=>{
        let data=JSON.parse(localStorage.getItem('loggeduser'))
        if(data){
            setuserdata(data)
        }else{
            setuserdata(null)
        }
    }
    useEffect(()=>{
        getlocalstorage()
    },[])
    return <mainContext.Provider value={{isdark,toggleTheme,userdata,setuserdata,getlocalstorage,postdata,setpostdata}}>
        {children}
    </mainContext.Provider>
}