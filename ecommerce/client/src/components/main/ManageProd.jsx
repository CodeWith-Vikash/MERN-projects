import React, { useState } from 'react'
import { FcAddImage } from "react-icons/fc";
import { TiArrowLeftThick } from "react-icons/ti";
import axios from 'axios'
import { toast } from 'react-toastify';


const ManageProd = ({data,setdata,baseurl,getdata}) => {
    const [imageurl, setimageurl] = useState(data.image)
    const [imgloading, setimgloading] = useState(false)
    const [deleting, setdeleting] = useState(false)
    const [updating, setupdating] = useState(false)
    const [name, setname] = useState(data.name)
    const [price, setprice] = useState(data.price)
    const [stock, setstock] = useState(data.stock)
    const [discount, setdiscount] = useState(data.discount)
    
    const handleFileChange=(file)=>{
        setimageurl(file)
    }
    const handledelte=()=>{
        const confirmDelete=confirm('Do you really want to delte this product')
        if(confirmDelete){
            setdeleting(true)
            axios.delete(`${baseurl}/api/product/delete/${data._id}`).then((result)=>{
                console.log(result)
                getdata()
                setdata(null)
                toast.info(result.data.message)
            }).catch((err)=>{
                toast.error(err.response.data.message?err.response.data.message:'server error')
            }).finally(()=> setdeleting(false))
        }else{
            return;
        }
    }

    const handleUpdate=()=>{
      setupdating(true)
      axios.patch(`${baseurl}/api/product/update/${data._id}`).then((result)=>{
        console.log(result)
        toast.info(result.data.message)
      }).catch((err)=>{
        console.log(err)
        toast.error(err.response.data.message?err.response.data.message:'server error')
      }).finally(()=> setupdating(false))
    }
  return (
    <div className='flex flex-col gap-4 md:gap-0'>
         <button className="bg-violet-900 py-1 px-2 rounded w-fit flex items-center gap-2" onClick={()=> setdata(null)}><TiArrowLeftThick size='1.5rem'/>Go back</button>
         <section className='flex flex-col gap-2 items-center md:flex-row justify-center md:h-[600px]'>
         <div className="prod h-[480px] w-[250px] rounded relative md:rounded-r-none flex items-center">
          <img
            src={data?.image}
            className="img absolute h-[300px] min-w-[300px] object-cover left-[-40px]"
          />
        </div>
        <section className="prodform rounded w-[250px] flex flex-col gap-2 p-2">
            <label htmlFor="name">Name</label>
            <input
              className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
              required
              value={name}
              name="name"
              type="text"
              placeholder="product name"
              onChange={(e)=> setname(e.target.value)}
            />
            <label htmlFor="price">Price</label>
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="price"
                value={price}
                type="number"
                min={"1"}
                placeholder="price"
                onChange={(e)=> setprice(e.target.value)}
              />
              <label htmlFor="discount">Discount</label>
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="discount"
                value={discount}
                onChange={(e)=> setdiscount(e.target.value)}
                type="number"
                min={"1"}
                placeholder="discount"
              />
              <label htmlFor="stock">Stock</label>
              <input
                className="outline-none p-2 rounded-lg text-black border-2 border-blue-500"
                required
                name="stock"
                value={stock}
                onChange={(e)=> setstock(e.target.value)}
                type="number"
                min={"1"}
                placeholder="stock"
              />
              <div>
                <div className="flex items-center gap-2">
                  {imgloading ? (
                    <img src="/loader.gif" className="h-10 rounded-full" />
                  ) : (
                    <label htmlFor="image" className="flex items-center gap-2">
                      <FcAddImage size="3rem" />
                      <p className="text-black font-semibold">
                    change product image
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

            <button className="py-1 px-2 bg-green-500 rounded flex items-center gap-2 justify-center">
              Update Product
              {updating && <img src="/loader.gif" className="h-5 rounded-full" onClick={handleUpdate}/>}
            </button>
            <button className="py-1 px-2 bg-red-500 rounded flex items-center gap-2 justify-center" onClick={handledelte}>
              Delete Product
              {deleting && <img src="/loader.gif" className="h-5 rounded-full"/>}
            </button>
          </section>
         </section>
    </div>
  )
}

export default ManageProd