import React, { useContext, useRef, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import { UserContext } from "../Context/AuthContext";

const Signup = () => {
//   const {uploadFile,imgloading,baseurl}=useContext(UserContext)
  const [isopen, setisopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setimg] = useState(null);
  const passwordref = useRef(null);
  const navigate = useNavigate();
  const baseurl='http://localhost:3000'


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
    const file = formdata.get("file");
      axios.post(`${baseurl}/api/signup`,{
        username,
        email,
        password,
        avatar: "randomimg.jgp"
      }).then((result)=>{
         console.log(result);
         toast.success(result.data.message)
         setLoading(false)
         navigate('/login')
      }).catch((error)=>{
        console.error("Authentication error: ", error);
       toast.error(error.response.data.message)
       setLoading(false)
      })
  };

  return (
    <div className="h-screen bg-zinc-800 flex justify-center items-center">
      <div className="w-[300px] h-fit bg-white text-black rounded-lg p-4 flex flex-col items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-16" />
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <input required type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Username" name="username" />
          <input required type="email" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Email" name="email" />
          <div className="relative">
            <input required type="password" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Password" name="password" ref={passwordref} />
            {isopen ? (
              <RxEyeOpen aria-label="Hide password" className="absolute top-3 right-3 cursor-pointer text-orange-500" size="1.3rem" onClick={toggleye} />
            ) : (
              <RiEyeCloseFill aria-label="Show password" className="absolute top-3 right-3 cursor-pointer text-orange-500" size="1.3rem" onClick={toggleye} />
            )}
          </div>
          <input type="file" id="file" className="hidden" name="file" onChange={(e)=>uploadFile(e.target.files[0],setimg)} />
          <label htmlFor="file" className="text-orange-500 flex items-center gap-2 cursor-pointer">
            <BiSolidImageAdd size="1.7rem" />
            <b>Add an avatar</b>
             {""?
               <img src="/loader.gif" className="h-10"/>
             :<div>
             {img && <img src={img} alt="" className="h-[40px] w-[40px] object-cover rounded-md shadow-md shadow-black" />}
             </div>}
          </label>
          <button type="submit" className="bg-orange-500 text-white font-semibold py-1 px-2 rounded" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p>
            You already have an account? <NavLink to="/login">
              <b className="text-orange-500">Login</b>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;