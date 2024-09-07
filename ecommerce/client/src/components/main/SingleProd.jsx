import React, { useContext, useState } from "react";
import BasicRating from "./Rating";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FcAddImage } from "react-icons/fc";
import Review from "./Review";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const SingleProd = () => {
  const [count, setcount] = useState(0);
  const [avgrating, setavgrating] = useState(3.5)
  const [rating, setrating] = useState(0)
  const [imageurl, setimageurl] = useState("")
  const [showRatingBox, setshowRatingBox] = useState(false)
  const [review, setreview] = useState("")
  const [imgloading, setimgloading] = useState(false)
  const {uploadBlob} = useContext(MainContext)

  // function to remove background of an image
  const handleFileChange=async (file)=>{
     if(file){
      setimgloading(true)
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');
      const apiKey = '96jMJaQDnhK8G8hc2fdkdbdh';
      fetch('https://api.remove.bg/v1.0/removebg',{
          method:'POST',
          headers: {
          'X-Api-Key': apiKey
       },
       body: formData
      })
      .then(function(reponse){
              return reponse.blob()
      })
      .then(async function(blob){
              const url = URL.createObjectURL(blob);
              const imgurl=await uploadBlob(url)
              setimageurl(imgurl)
              setimgloading(false)
      })
      .catch((err)=>{
        console.log(err)
        toast.error('can,t upload file')
        setimgloading(false)
      });
      
     }
  }
  
  return (
    <div className="min-h-screen bg-blue-500 text-white">
      <section className="md:h-[500px] flex flex-col items-center justify-center py-10 md:flex-row">
        <div className="prod h-[300px] w-[250px] rounded relative md:rounded-r-none">
          <img
            src="/phone1.png"
            className="absolute h-[300px] w-[300px] object-cotain left-[-40px]"
          />
        </div>

        <section className="h-fit w-[250px] rounded rounded-t-none text-white flex flex-col gap-2 p-2 md:h-[300px] md:w-[350px] md:p-4 md:rounded md:rounded-l-none shad">
          <p className="leading-5 max-h-[100px] md:max-h-[300px] font-semibold md:text-lg md:leading-[1.1] overflow-auto">
            Xyron X10 Pro: 6.7" OLED display with 144Hz refresh rate and HDR10+,
            powered by a Snapdragon 8 Gen 3 octa-core processor clocked at 3.2
            GHz, paired with 12 GB LPDDR5 RAM and 256 GB UFS 3.1 storage
            (expandable up to 1TB)
          </p>
          <div className="flex items-center gap-2">
            <b>price : </b>
            <p className="text-gray-800 line-through">$5000</p>
            <p className="font-semibold">$3999</p>
          </div>

          <div className="flex flex-col leading-3 gap-2 md:flex-row md:items-center">
            <BasicRating type="readonly" rate="3.5" />
            <p>(69 costumer reviews)</p>
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
      </section>
      {/* rating and reviews */}
      <section className="flex flex-col gap-2 px-4 pb-10">
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
        {showRatingBox && <form className="bg-white text-black rounded-lg my-2 p-2 flex flex-col gap-2 max-w-[500px]">
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
            {imgloading?
             <img src="/loader.gif" className="h-10 rounded-full"/>
            :<label htmlFor="image">
            <FcAddImage size='3rem'/>
            </label>}
            <input type="file" id="image"  className="hidden" onChange={(e)=> handleFileChange(e.target.files[0])}/>
            {imageurl && <img src={imageurl} className="h-10 w-10 object-cover rounded shad bg-blue-500"/>}
          </div>
          <button className="bg-violet-800 py-1 px-2 rounded text-white">submit</button>
          </div>
        </form>}
        {/* reviews */}
         <div className="flex flex-col gap-4 p-2">
           <Review/>
         </div>
      </section>
    </div>
  );
};

export default SingleProd;
