import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const MainContext=createContext(null)

export const ContextProvider=({children})=>{
    const [allposts, setallposts] = useState([])
    const [userdata, setuserdata] = useState(null)
   //  function to get allposts
    const getPost=()=>{
       axios.get('http://localhost:3000/posts').then((result)=>{
          setallposts(result.data)
       }).catch((err)=>{
          console.log(err);
       })
    }

   //  funciton to convert file in to url
    const handleFileChange = (event,setimagesrc) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setimagesrc(e.target.result)
        };
        reader.readAsDataURL(file);
      }
    };
    // get localstorage
    const getlocalstorage=()=>{
      const data= JSON.parse(localStorage.getItem('charloguser'))
      if(data){
        setuserdata(data)
        console.log('userdata: ',data);
      }else{
        setuserdata(null)
      }
    }
    useEffect(()=>{
      getlocalstorage()
    },[])
    return <MainContext.Provider value={{getPost,allposts,handleFileChange,userdata,getlocalstorage}}>
        {children}
    </MainContext.Provider>
}
// old code 