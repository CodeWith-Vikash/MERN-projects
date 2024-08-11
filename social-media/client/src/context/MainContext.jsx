import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const MainContext=createContext(null)

export const ContextProvider=({children})=>{
    const [allposts, setallposts] = useState([])
    const [userdata, setuserdata] = useState(null)
    const [allusers, setallusers] = useState([])
    const [profileuser, setprofileuser] = useState(null);
   //  function to get allposts
    const getPost=()=>{
       axios.get('http://localhost:3000/posts').then((result)=>{
          setallposts(result.data)
       }).catch((err)=>{
          console.log(err);
       })
    }

    // function to convert timestamp to timegap
    function calculateTimeGap(timestamp) {
      const pastDate = new Date(timestamp);
      const currentDate =Date.now();
    
      // Calculate the time difference in milliseconds
      const timeDifference = Math.abs(currentDate - pastDate);
    
      // Calculate years
      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
      
      // Calculate months
      const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      
      // Calculate days
      const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      
      // Calculate hours
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      // Calculate minutes
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      
      // Calculate seconds
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
      if (years >= 1) {
        return `${years} years ago`;
      } else if (months >= 1) {
        return `${months} months ago`;
      } else if (days >= 1) {
        return `${days} days ago`;
      } else if (hours >= 1) {
        return `${hours} hours ago`;
      } else if (minutes >= 1) {
        return `${minutes} minutes ago`;
      } else {
        return `${seconds} seconds ago`;
      }
    }
    // function to calculate comment time gap
    function commentTimeGap(timestamp) {
      const pastDate = new Date(timestamp);
      const currentDate =Date.now();
    
      // Calculate the time difference in milliseconds
      const timeDifference = Math.abs(currentDate - pastDate);
    
      // Calculate years
      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
      
      // Calculate months
      const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      
      // Calculate days
      const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      
      // Calculate hours
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      // Calculate minutes
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      
      // Calculate seconds
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
      if (years >= 1) {
        return `${years} y`;
      } else if (months >= 1) {
        return `${months} m`;
      } else if (days >= 1) {
        return `${days} d`;
      } else if (hours >= 1) {
        return `${hours} h`;
      } else if (minutes >= 1) {
        return `${minutes} m`;
      } else {
        return `${seconds} s`;
      }
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

    const finduser=(id)=>{
      axios.get(`http://localhost:3000/user/${id}`).then((result)=>{
        setuserdata(result.data)
        console.log(result);
      }).catch((err)=>{
         console.log(err);
      })
   }
   // function to find profile user
  const findprofileuser = (id) => {
    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((result) => {
        setprofileuser(result.data);
      })
      .catch((err) => {
        toast.error("server error while getting user posts");
        console.log(err);
      });
  };
    // get localstorage
    const getlocalstorage=()=>{
      const userId=JSON.parse(localStorage.getItem('charloguser'))
      console.log(userId)
      if(userId){
        finduser(userId)
      }else{
        setuserdata(null)
      }
    }
    //function to getallusers
    const getUsers=()=>{
       axios.get('http://localhost:3000/users').then((result)=>{
        console.log(result);
        setallusers(result.data)
       }).catch((err)=>{
          console.log(err)
       })
    }

    useEffect(()=>{
      getlocalstorage()
      getUsers()
    },[])
    return <MainContext.Provider value={{getPost,allposts,handleFileChange,userdata,getlocalstorage,calculateTimeGap,commentTimeGap,allusers,findprofileuser,profileuser}}>
        {children}
    </MainContext.Provider>
}
// old code 