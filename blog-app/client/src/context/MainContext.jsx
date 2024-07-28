import { createContext, useEffect, useState } from 'react'
import axios from "axios";


export const mainContext= createContext(null)

export const ContextProvider=({children})=>{
    const [isdark, setisdark] = useState(!false)
    const [userdata, setuserdata] = useState(null)
    const [postdata, setpostdata] = useState([])
    const [ispostloading, setispostloading] = useState(false);
    const [iserror, setiserror] = useState(false);

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

    const getPost = () => {
        setispostloading(true);
        axios
          .get("http://localhost:3000/")
          .then((result) => {
            console.log(result);
            setpostdata(result.data);
            setispostloading(false);
            setiserror(false);
          })
          .catch((err) => {
            console.log(err);
            setiserror(true);
            setispostloading(false);
          });
      };
      
    useEffect(()=>{
        getlocalstorage()
    },[])
    return <mainContext.Provider value={{isdark,toggleTheme,userdata,setuserdata,getlocalstorage,postdata,setpostdata,getPost,ispostloading,iserror}}>
        {children}
    </mainContext.Provider>
}