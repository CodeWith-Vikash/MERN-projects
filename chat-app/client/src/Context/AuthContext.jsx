import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userdata, setuserdata] = useState(null);
  const [imgloading, setimgloading] = useState(false)
  const [allusers, setallusers] = useState([])
  const [chat, setchat] = useState({})
  const [chatuser, setchatuser] = useState({})

    // function to upload image on cloudinary
    const uploadFile = async (file, setFileUrl) => {
      setimgloading(true);
    
      const formData = new FormData();
      formData.append('file', file);
      
      // Adjust the URL based on the type of file
      const uploadUrl = file.type.startsWith('image/') 
        ? 'https://api.cloudinary.com/v1_1/codewithvikash/image/upload'
        : 'https://api.cloudinary.com/v1_1/codewithvikash/raw/upload';
    
      try {
        const response = await axios.post(uploadUrl, formData, {
          params: { upload_preset: 'chat-app' }
        });
        
        console.log('File uploaded successfully:', response.data);
        setFileUrl(response.data.secure_url);
        setimgloading(false);
        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('File upload unsuccessful');
        setimgloading(false);
      }
    };
    
 
// function to get all users
const getUsers=()=>{
  axios.get('/api/users').then((result)=>{
    console.log(result);
    setallusers(result.data)
  }).catch((err)=>{
    console.log(err);
    toast.error(err.response.data.message)
  })
}

// function to get user chat
const getChat=(id)=>{
  axios.post('/api/chat',{
    userId1:id,
    userId2:userdata._id
  }).then((result)=>{
     console.log(result);
     setchat(result.data)
     let user=result.data.users.find((person)=> person._id!=userdata._id)
     setchatuser(user)
     console.log(user);
  }).catch((err)=>{
     console.log(err)
     toast.error(err.response.data.message)
  })
}

// function to get urse details
   const getuserdetails=()=>{
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
   }
  useEffect(()=>{
    getuserdetails()
    getUsers()
  },[])
  return (
    <UserContext.Provider value={{ userdata,setuserdata,uploadFile,imgloading,getuserdetails,allusers,chat,chatuser,getChat}}>
      {children}
    </UserContext.Provider>
  );
};
