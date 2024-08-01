import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainContext";

const Signup = () => {
  const [signing, setsigning] = useState(false);
  const [iserror, setiserror] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { isdark } = useContext(mainContext);
  const navigate = useNavigate();
  const nameref = useRef();
  const emailref = useRef();
  const passwordref = useRef();

  axios.defaults.withCredentials=true;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageSrc) {
      alert("please add an avatar");
    } else {
      setsigning(true);
      axios
        .post("https://blog-app-server69.up.railway.app/signup", {
          username: nameref.current.value,
          email: emailref.current.value,
          password: passwordref.current.value,
          avatar: imageSrc,
        })
        .then((result) => {
          console.log(result);
          setsigning(false);
          setiserror(false);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setsigning(false);
          setiserror(true);
        });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div
      className={`h-screen flex items-center justify-center ${
        isdark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-violet-800 p-4 rounded-lg"
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          ref={nameref}
          required
          className="outline-none border-none px-4 py-1 text-lg rounded text-black"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          ref={emailref}
          className="outline-none border-none px-4 py-1 text-lg rounded text-black"
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          ref={passwordref}
          required
          className="outline-none border-none px-4 py-1 text-lg rounded text-black"
        />
        <label
          htmlFor="file"
          className="flex items-center font-semibold gap-4 cursor-pointer"
        >
          <p>add an Avtar</p>
          <FaRegImage size="1.5rem" />
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected"
              className="w-[50px] h-[50px] object-cover rounded shadow-lg"
            />
          )}
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          id="file"
          className="hidden"
          name="avatar"
        />
        {iserror && <p className="text-red-500">something went wrong</p>}
        <button
          type="submit"
          className="bg-green-600 px-2 py-1 rounded font-semibold"
        >
          {signing ? "signing..." : "Sign up"}
        </button>
        <p>
          you already have an account?{" "}
          <Link to="/login" className="text-black font-semibold">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
