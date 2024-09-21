import React, { useContext, useRef, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MainContext } from '../context/MainContext';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { toast } from "react-toastify";

const Signup = () => {
  const [isopen, setisopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setimg] = useState(null);
  const passwordref = useRef(null);
  const navigate = useNavigate();
  const { baseurl,settoken,setuserdata,avatarloading,uploadFile} = useContext(MainContext);
//  function to handleavatar
  const handleFileChange=(file)=>{
     if(file){
       if(file.type.startsWith('image/')){
         uploadFile(file,setimg)
       }else{
         toast.error('please select an image')
       }
     }
  }  

  // function to toggle passwrod
  const toggleye = () => {
    setisopen(!isopen);
    const passwordFieldType = passwordref.current.getAttribute('type');
    passwordref.current.setAttribute('type', passwordFieldType === 'password' ? 'text' : 'password');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const username = formdata.get("username");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const city = formdata.get("City");
    const nearby = formdata.get("Nearby");
    const state = formdata.get("State");

    try {
      const result = await axios.post(`${baseurl}/api/signup`, { username, email, password,avatar:img?img:'/user.jfif',city,nearby,state }, {
        withCredentials: true, 
      });
      
      console.log(result.data); 

      // Access the token cookie 
      const token = Cookies.get("token");
      console.log("JWT Token from cookie:", token);

      // Redirect user after successful signup
      if (token) {
        settoken(token)
        setuserdata(result.data.user)
        Cookies.set('userdata', JSON.stringify(result.data.user), { expires: 1});
        Cookies.set('token', JSON.stringify(result.data.token), { expires: 1});
        toast.success(result.data.message)
        navigate('/')
      }
    } catch (err) {
      console.log("Error during signup:", err);
      toast.error(err.response.data.message)
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="w-[300px] h-fit bg-white text-black rounded-lg p-4 flex flex-col items-center gap-4">
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <input required type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Username" name="username" />
          <input required type="email" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Email" name="email" />
          <div className="relative">
            <input required type="password" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Password" name="password" ref={passwordref} />
            {isopen ? (
              <RxEyeOpen aria-label="Hide password" className="absolute top-3 right-3 cursor-pointer text-violet-800" size="1.3rem" onClick={toggleye} />
            ) : (
              <RiEyeCloseFill aria-label="Show password" className="absolute top-3 right-3 cursor-pointer text-violet-800" size="1.3rem" onClick={toggleye} />
            )}
          </div>
          <b>Address :</b>
          <input required type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="City" name="City" />
          <input required type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Nearby" name="Nearby" />
          <input required type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="State" name="State" />
          <input type="file" id="file" className="hidden" name="file"
            onChange={(e)=>handleFileChange(e.target.files[0])}
          />
          <label htmlFor="file" className="flex items-center gap-2 cursor-pointer">
            <BiSolidImageAdd size="1.7rem" className="text-violet-800" />
            <b>Add an avatar</b>
            {avatarloading?
             <img src="/loader.gif" className='h-10 rounded-full'/>
            :<div>
              {img && <img src={img} alt="" className="h-[40px] w-[40px] object-cover rounded-md shadow-md shadow-black" />}
            </div>}
          </label>
          <button type="submit" className="bg-violet-800 text-white font-semibold py-1 px-2 rounded" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p>
            You already have an account? <NavLink to="/login">
              <b className="text-violet-800">Login</b>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
