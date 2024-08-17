import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userdata, setuserdata] = useState(null);
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('chatuser'))
    if(data){
      axios.get(`/api/user/${data}`).then((result)=>{
        console.log(result)
        setuserdata(result.data)
    }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)
        setuserdata(null)
      })
    }else{
        setuserdata(null)
    }
  },[])
  return (
    <UserContext.Provider value={{ userdata,setuserdata }}>
      {children}
    </UserContext.Provider>
  );
};
