import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie'

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [token, settoken] = useState(null)
  const [userdata, setuserdata] = useState(null)
  const [avatarloading, setavatarloading] = useState(false)
  const [allproducts, setallproducts] = useState([])
  const baseurl = "http://localhost:3000";
  // function to upload blob on cloudinary
  const uploadBlob = async (blobUrl) => {
    try {
      // Fetch the blob data
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", blob, "image.png"); // Append blob with a filename

      // Upload the file to your backend server
      const uploadResponse = await fetch(`${baseurl}/api/upload`, {
        // Update with your backend URL
        method: "POST",
        body: formData,
      });

      const result = await uploadResponse.json();
      console.log(result);
      return result.url;
      // result.url will contain the URL of the uploaded image on Cloudinary
    } catch (error) {
      console.error("Error uploading blob to server:", error);
    }
  };

  // function to upload image on cloudinary
  const uploadFile = async (file, setFileUrl) => {
    setavatarloading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${baseurl}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      if(setFileUrl){
        setFileUrl(response.data.url)
      } 
      setavatarloading(false);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload unsuccessful");
      setavatarloading(false);
    }
  };

  // function to get all products
  const getProducts=()=>{
    axios.get(`${baseurl}/api/products`).then((result)=>{
      console.log(result)
      setallproducts(result.data.products)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }

  // function to get localstorage
   const getlocalUser = ()=>{
     let data =localStorage.getItem('techstuffuser')
     if(data){
       console.log(data)
       data=JSON.parse(data)
       setuserdata(data)
     }else{
       setuserdata(null)
     }
   }
  //  function to getToken
  const getAuthToken = ()=>{
    const getToken= Cookies.get('token')
    if(getToken){
      settoken(getToken)
    }else{
      settoken(null)
    }
  }


  useEffect(()=>{
    getAuthToken()
    getlocalUser()
    getProducts()
  },[])
  return (
    <MainContext.Provider value={{ uploadBlob, uploadFile,baseurl,token,settoken,userdata,setuserdata,getlocalUser,getAuthToken,avatarloading,allproducts,getProducts}}>
      {children}
    </MainContext.Provider>
  );
};
