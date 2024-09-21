import React, { useContext, useRef, useState } from "react";
import ProductTable from "./ProductTable";
import { FcAddImage } from "react-icons/fc";
import { MdAddBusiness } from "react-icons/md";
import { toast } from "react-toastify";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import ManageProd from "./ManageProd";
import Orders from './Orders'

const Dashboard = () => {
  const [imageurl, setimageurl] = useState(null);
  const [showform, setshowform] = useState(false);
  const [imgloading, setimgloading] = useState(false);
  const [formloading, setformloading] = useState(false);
  const { uploadBlob, baseurl,getProducts } = useContext(MainContext);
  const [managedata, setmanagedata] = useState(null)
  const [selectedSec, setselectedSec] = useState('products')

  // function to add product
  const formref= useRef(null)
  const handlesubmit = (e) => {
    e.preventDefault();
    const formdata= new FormData(e.target)
    const name= formdata.get('name')
    const price= formdata.get('price')
    const discount= formdata.get('discount')
    const stock= formdata.get('stock')
    const category= formdata.get('category')
    if(imageurl){
      setformloading(true);
      axios.post(`${baseurl}/api/addproduct`,{
        name,price,discount,stock,category,image:imageurl
      }).then((result)=>{
        console.log(result)
        getProducts()
        setimageurl(null)
        formref.current.reset()
        toast.success('product added')
      }).catch((err)=>{
        console.log(err)
        toast.error(res.response.data.message)
      }).finally(()=> setformloading(false))
    }else{
      toast.warning('please add a product image')
    }
  };

  // function to remove background of an image
  const handleFileChange = async (file) => {
    if (file) {
      setimgloading(true);
      const formData = new FormData();
      formData.append("image_file", file);
      formData.append("size", "auto");
      const apiKey = "P8mmKHfQBcz45NbrWG21E1ar";
      fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: formData,
      })
        .then(function (reponse) {
          return reponse.blob();
        })
        .then(async function (blob) {
          const url = URL.createObjectURL(blob);
          const imgurl = await uploadBlob(url);
          setimageurl(imgurl);
          setimgloading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("can,t upload file");
          setimgloading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 text-white px-4 py-10 flex flex-col gap-2">
      <nav className='text-white flex gap-10 pt-10 pb-5 justify-center shadow-xl'>
        <div className='flex flex-col items-center cursor-pointer' onClick={()=> setselectedSec('products')}>
          <b>Products</b>
          <div className={`h-1 w-[100px] ${selectedSec=='products'?'bg-green-500':'bg-blue-500'} rounded-full`}></div>
        </div>
        <div className='flex flex-col items-center cursor-pointer' onClick={()=> setselectedSec('orders')}>
          <b>Orders</b>
          <div className={`h-1 w-[100px] ${selectedSec=='orders'?'bg-green-500':'bg-blue-500'} rounded-full`}></div>
        </div>
      </nav>
       {selectedSec=='products'?<div>
       {managedata?
        <ManageProd data={managedata} setdata={setmanagedata} baseurl={baseurl} getdata={getProducts} uploadBlob={uploadBlob}/>
       :<section>
       <section className="flex flex-col gap-2 items-end mb-5">
        <button
          className="bg-violet-900 py-1 px-2 rounded flex items-center gap-2"
          onClick={() => setshowform(!showform)}
        >
          Add Product
         <MdAddBusiness size='1.5rem'/>
        </button>
        {/* add product form */}
        {showform && (
          <form className="bg-gray-200 rounded-lg max-w-[500px] flex flex-col gap-2 p-2" onSubmit={handlesubmit} ref={formref}>
            <input
              className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
              required
              name="name"
              type="text"
              placeholder="product name"
            />
            <section className="flex flex-wrap gap-4">
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="price"
                type="number"
                min={"1"}
                placeholder="price"
              />
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="discount"
                type="number"
                min={"1"}
                placeholder="discount"
              />
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="stock"
                type="number"
                min={"1"}
                placeholder="stock"
              />
              <select name="category" className="outline-none p-2 rounded-lg text-black border-2 border-blue-500 w-[200px]">
                <option value="camera">Camera</option>
                <option value="phone">Phone</option>
                <option value="laptop">Laptop</option>
                <option value="keyboard">keyboard</option>
                <option value="mouse">Mouse</option>
              </select>
            </section>
              <div>
                <div className="flex items-center gap-2">
                  {imgloading ? (
                    <img src="/loader.gif" className="h-10 rounded-full" />
                  ) : (
                    <label htmlFor="image" className="flex items-center gap-2">
                      <FcAddImage size="3rem" />
                      <p className="text-black font-semibold">
                        add product image
                      </p>
                    </label>
                  )}
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  {imageurl && (
                    <img
                      src={imageurl}
                      className="h-10 w-10 object-cover rounded shad bg-blue-500"
                    />
                  )}
                </div>
              </div>
            <button className="py-1 px-2 bg-blue-500 rounded w-fit flex items-center gap-2">
              submit
              {formloading && <img src="/loader.gif" className="h-5 rounded-full"/>}
            </button>
          </form>
        )}
      </section>
      <ProductTable setdata={setmanagedata}/>
       </section>}
       </div>:
       <Orders/>}
    </div>
  );
};

export default Dashboard;
