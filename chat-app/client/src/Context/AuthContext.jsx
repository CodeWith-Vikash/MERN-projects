import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userdata, setuserdata] = useState(null);
  const [imgloading, setimgloading] = useState(false)
  const [allusers, setallusers] = useState([])
  const [chat, setchat] = useState({})
  const [chatuser, setchatuser] = useState(null)
  const baseurl='https://chat-app-server-production-c721.up.railway.app'
   
    // function to upload image on cloudinary
    const uploadFile = async (file, setFileUrl,setmediaType) => {
      setimgloading(true);
    
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await axios.post(`${baseurl}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }
        });
  
        console.log('File uploaded successfully:', response.data);
        setFileUrl(response.data.url);
        setimgloading(false);
        return response.data.url;
      } catch (error) {
        console.error('Error uploading file:', error);
        setmediaType("text")
        toast.error('File upload unsuccessful');
        setimgloading(false);
      }
    };
    
 
// function to get all users
const getUsers=()=>{
  axios.get(`${baseurl}/api/users`).then((result)=>{
    console.log(result);
    setallusers(result.data)
  }).catch((err)=>{
    console.log(err);
    toast.error(err.response.data.message)
  })
}

// function to get user chat
const getChat=(id)=>{
  axios.post(`${baseurl}/api/chat`,{
    userId1:id,
    userId2:userdata._id
  }).then((result)=>{
     console.log(result);
     setchat(result.data)
     let user=result.data.users.find((person)=> person._id!=userdata._id)
     setchatuser(user)
     console.log(user);
     scrollToBottom()
     if(window.innerWidth<768){
      closeSide()
     }
  }).catch((err)=>{
     console.log(err)
     toast.error(err.response.data.message)
  })
}

// function to get urse details
   const getuserdetails=()=>{
    const data=JSON.parse(localStorage.getItem('chatuser'))
    if(data){
      axios.get(`${baseurl}/api/user/${data}`).then((result)=>{
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
   }

   // function to scroll chat view to bottom 
  const chatref=useRef(null)
  const scrollToBottom = () => {
    const div = chatref.current;
    if (div) {
      setTimeout(() => {
        div.scrollTo({
          top: div.scrollHeight,
          behavior: 'smooth',
        });
      }, 500); 
    }
  };
  

  //  functions to toggle sidenav
   const sideref=useRef(null)
  const closeSide=()=>{
     sideref.current.style.transform='translateX(-100%)'
    }
    const openSide=()=>{
    sideref.current.style.transform='translateX(0%)'
  }

  useEffect(()=>{
    scrollToBottom()
  },[chatuser])

  useEffect(()=>{
    getuserdetails()
    getUsers()
  },[])
  return (
    <UserContext.Provider value={{ chatref,userdata,setuserdata,uploadFile,imgloading,getuserdetails,allusers,chat,chatuser,getChat,sideref,openSide,closeSide,setchat,scrollToBottom,baseurl}}>
      {children}
    </UserContext.Provider>
  );
};
