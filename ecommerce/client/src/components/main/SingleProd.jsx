import React, { useContext, useEffect, useRef, useState } from "react";
import BasicRating from "./Rating";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FcAddImage } from "react-icons/fc";
import Review from "./Review";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";
import {useParams} from 'react-router-dom'
import axios from "axios";

const SingleProd = () => {
  const [count, setcount] = useState(0);
  const [avgrating, setavgrating] = useState(3.5)
  const [rating, setrating] = useState(0)
  const [images, setimages] = useState([])
  const [showRatingBox, setshowRatingBox] = useState(false)
  const [review, setreview] = useState("")
  const [adding, setadding] = useState(false)
  const [singledata, setsingledata] = useState(null)
  const [loading, setloading] = useState(false)
  const {uploadFile,baseurl,avatarloading,userdata} = useContext(MainContext)

  const handleFileChange= async (file)=>{
    if(file){
      const url= await uploadFile(file)
      const newimages=[...images,url]
      setimages(newimages)
    }
  }

  const {id} = useParams()
  // function to get single product
  const actualprice= (singledata?.price-((singledata?.price*singledata?.discount)/100)).toFixed(0)
  const getsingleproduct=()=>{
    setloading(true)
    axios.get(`${baseurl}/api/product/${id}`).then((result)=>{
      console.log(result)
      setsingledata(result.data.product)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message ? err.response.data.message:'something went wrong')
    }).finally(()=> setloading(false))
  }
  
  // function to add review
  const addReview=(e)=>{
    e.preventDefault()
    setadding(true)
    axios.patch(`${baseurl}/api/product/review/${singledata._id}`,{
       rating,
       description:review,
       images,
       userInfo:userdata._id
    }).then((result)=>{
      console.log(result)
      setrating(0)
      setreview("")
      setimages([])
      getsingleproduct()
      toast.info(result.data.message)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
    }).finally(()=> setadding(false))
  }

  // function to animate image
  const imageref=useRef(null)
  const animateimage=()=>{
    imageref.current.style.height='300px'
  }
  useEffect(()=>{
    getsingleproduct()
  },[id])

  useEffect(()=>{
    animateimage()
  },[singledata])
  
  return (
    <div className="min-h-screen bg-blue-500 text-white">
      {loading?<b>loading...</b>
      :<section className="md:h-[500px] flex flex-col items-center justify-center py-10 md:flex-row">
        <div className="prod h-[300px] w-[250px] rounded relative md:rounded-r-none flex items-center">
          <img
            src={singledata?.image}
            className="img absolute h-[0] min-w-[300px] object-cover left-[-40px]"
            ref={imageref}
          />
        </div>

        <section className="h-fit w-[250px] rounded rounded-t-none text-white flex flex-col gap-2 p-2 md:h-[300px] md:w-[350px] md:p-4 md:rounded md:rounded-l-none shad">
          <p className="leading-5 max-h-[100px] md:max-h-[300px] font-semibold md:text-lg md:leading-[1.1] overflow-auto">
            {singledata?.name}
          </p>
          <div className="flex items-center gap-2">
            <b>price : </b>
            <p className="text-gray-800 line-through">${singledata?.price}</p>
            <p className="font-semibold">${actualprice}</p>
          </div>

          <div className="flex flex-col leading-3 gap-2 md:flex-row md:items-center">
            <BasicRating type="readonly" rate="3.5" />
            <p>({singledata?.reviews.length} costumer reviews)</p>
          </div>

          <section className="flex flex-col gap-2 md:flex-row">
            <div className="flex">
              <p
                className="border-2  w-[30px] text-center text-lg font-bold cursor-pointer"
                onClick={() => count > 1 && setcount(count - 1)}
              >
                -
              </p>
              <p className="border-2  w-[30px] text-center font-semibold border-x-0">
                {count}
              </p>
              <p
                className="border-2  w-[30px] text-center text-lg font-bold cursor-pointer"
                onClick={() => setcount(count + 1)}
              >
                +
              </p>
            </div>
            <button className="bg-violet-800 py-1 px-2 rounded">
              Add to cart
            </button>
          </section>
        </section>
      </section>}
      {/* rating and reviews */}
      {singledata && <section className="flex flex-col gap-2 px-4 pb-10">
        <h3 className="text-3xl font-semibold">Rating and Reviews</h3>
        <div className="flex items-center gap-2 mt-5">
          <div className="w-[50px] bg-white rounded-full">
            <CircularProgressbar
              value={avgrating}
              maxValue={5}
              text={avgrating}
              styles={buildStyles({
                pathColor:
                  avgrating < 3
                    ? "red"
                    : avgrating < 4
                    ? "orange"
                    : "green",
                textColor: "black",
                textSize: "30",
              })}
            />
          </div>
          <button className="bg-teal-900 py-1 px-2 rounded" onClick={()=> setshowRatingBox(!showRatingBox)}>Rate this product</button>
        </div>
        {/*rating box */}
        {showRatingBox && <form className="bg-white text-black rounded-lg my-2 p-2 flex flex-col gap-2 max-w-[500px]" onSubmit={addReview}>
          <div>
          <p className="text-lg ">Rate this product</p>
          <BasicRating  setrating={setrating} rating={rating}/>
          </div>
          <div>
            <p className="text-lg">Review this product</p>
            <textarea className="border-2 w-full rounded h-[100px] p-2 outline-none text-sm" value={review} onChange={(e)=> setreview(e.target.value)} placeholder="description.."></textarea>
          </div>
          {/* add image */}
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-2">
            {avatarloading?
             <img src="/loader.gif" className="h-10 rounded-full"/>
            :<label htmlFor="image">
            <FcAddImage size='3rem'/>
            </label>}
            <input type="file" id="image"  className="hidden" onChange={(e)=> handleFileChange(e.target.files[0])}/>
            {images.length>0 && <div className="flex gap-2 items-center flex-wrap">
               {images.map((imageurl)=>{
                  return <img src={imageurl} className="h-10 w-10 object-cover rounded shad bg-blue-500"/>
               })}
              </div>}
          </div>
          <button className="py-1 px-2 bg-violet-800 text-white rounded flex items-center gap-2 justify-center">
              submit
              {adding && <img src="/loader.gif" className="h-5 rounded-full"/>}
              </button>
          </div>
        </form>}
        {/* reviews */}
         <div className="flex flex-col gap-4 p-2">
           {singledata?.reviews.map((data)=>{
              return <Review data={data}/>
           })}
         </div>
      </section>}
    </div>
  );
};

export default SingleProd;
