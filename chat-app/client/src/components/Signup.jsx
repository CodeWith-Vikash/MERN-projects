import React, { useRef, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { RiEyeCloseFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import Upload from "../firebase/uploadAvatar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isopen, setisopen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setimg] = useState(null);
  const passwordref = useRef(null);
  const navigate = useNavigate();

  const toggleye = () => {
    setisopen(!isopen);
    const passwordFieldType = passwordref.current.getAttribute('type');
    passwordref.current.setAttribute('type', passwordFieldType === 'password' ? 'text' : 'password');
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setimg(url);
      // Revoke the object URL to avoid memory leaks
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const username = formdata.get("username");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const file = formdata.get("file");

    if (!username || !email || !password || !file) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await Upload(file);

      await updateProfile(res.user, {
        displayName: username,
        photoURL: imgUrl,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: []
      });

      await setDoc(doc(db, "userChat", res.user.uid), {
        chats: []
      });

      // Reset form and image
      e.target.reset();
      setimg(null);
      navigate('/');
    } catch (error) {
      console.error("Authentication error: ", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-zinc-800 flex justify-center items-center">
      <div className="w-[300px] h-fit bg-white text-black rounded-lg p-4 flex flex-col items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-16" />
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <input type="text" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Username" name="username" />
          <input type="email" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Email" name="email" />
          <div className="relative">
            <input type="password" className="bg-gray-300 p-2 rounded-lg w-[270px] outline-none" placeholder="Password" name="password" ref={passwordref} />
            {isopen ? (
              <RxEyeOpen aria-label="Hide password" className="absolute top-3 right-3 cursor-pointer" size="1.3rem" onClick={toggleye} />
            ) : (
              <RiEyeCloseFill aria-label="Show password" className="absolute top-3 right-3 cursor-pointer" size="1.3rem" onClick={toggleye} />
            )}
          </div>
          <input type="file" id="file" className="hidden" name="file" onChange={handleImageChange} />
          <label htmlFor="file" className="flex items-center gap-2 cursor-pointer">
            <BiSolidImageAdd size="1.7rem" />
            <b>Add an avatar</b>
            {img && <img src={img} alt="" className="h-[40px] w-[40px] object-cover rounded-md shadow-md shadow-black" />}
          </label>
          <button type="submit" className="bg-black text-white font-semibold py-1 px-2 rounded" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p>
            You already have an account? <NavLink to="/login">
              <b>Login</b>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
