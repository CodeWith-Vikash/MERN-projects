import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie'

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [mainloading, setmainloading] = useState(false)
  const [token, settoken] = useState(null)
  const [userdata, setuserdata] = useState(null)
  const [avatarloading, setavatarloading] = useState(false)
  const [allproducts, setallproducts] = useState([])
  const [cart, setcart] = useState([])
  const [outOfStockProducts, setoutOfStockProducts] = useState([])
  const [total, settotal] = useState(0);
  // const baseurl = "http://localhost:3000";
  const baseurl = "https://techstuff-server.onrender.com";
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
    setmainloading(true)
    axios.get(`${baseurl}/api/products`).then((result)=>{
      console.log(result)
      setallproducts(result.data.products)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response?err.response.data.message:'something went wrong')
    }).finally(()=> setmainloading(false))
  }

  // function to get localstorage
   const getlocalUser = ()=>{
     let data=Cookies.get('userdata')
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
    const gotToken= Cookies.get('token')
    console.log(' token :',gotToken)
    if(gotToken){
      settoken(gotToken)
    }else{
      settoken(null)
    }
  }
   // function to get cart
   const getCart = () => {
    axios
      .get(`${baseurl}/api/cart/${userdata._id}`)
      .then((result) => {
        console.log(result);
        setcart(result.data.cart.items);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response ? err.response.data.message : "something went wrong"
        );
      });
  };

   // function to find out of stock products
   const findOutOfStock=()=>{
    let products= cart.filter((item)=>item.product.stock==0)
    setoutOfStockProducts(products)
  }


  // function to update stock
  const updateStock=(id,action,quantity)=>{
    axios.patch(`${baseurl}/api/product/stock/${id}`,{action:action,quantity}).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response?err.response.data.message:'something went wrong')
    })
  }


  useEffect(()=>{
    getAuthToken()
    getlocalUser()
    getProducts()
  },[])

  useEffect(()=>{
    if(cart){
      if(!outOfStockProducts.length){
        findOutOfStock()
      }
    }
  },[cart])
  
  useEffect(()=>{
    if(userdata){
      getCart()
    }
  },[userdata])
  return (
    <MainContext.Provider value={{ uploadBlob, uploadFile,baseurl,token,settoken,userdata,setuserdata,getlocalUser,getAuthToken,avatarloading,allproducts,getProducts,cart,setcart,total,settotal,getCart,updateStock,outOfStockProducts,mainloading}}>
      {children}
    </MainContext.Provider>
  );
};
