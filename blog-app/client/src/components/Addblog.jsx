import React, { useContext, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { mainContext } from "../context/MainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addblog = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isloading, setisloading] = useState(false);
  const [iserror, setiserror] = useState(false);
  const { isdark, userdata,getPost } = useContext(mainContext);
  const titleref = useRef();
  const descref = useRef();
  const navigate = useNavigate();

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

  const addPost = (e) => {
    e.preventDefault();
    if (!userdata) {
      navigate("/login");
    }
    if (!imageSrc) {
      alert("please add an image to post");
    } else {
      setisloading(true);
      try {
        axios
          .post("http://localhost:3000/", {
            title: titleref.current.value,
            text: descref.current.value,
            image: imageSrc,
            autherInfo: [
              {
                auther: userdata.username,
                avatar: userdata.avatar,
              },
            ],
          })
          .then((data) => {
            console.log(data);
            getPost();
            titleref.current.value = "";
            descref.current.value = "";
            setImageSrc("");
            setisloading(false);
            setiserror(false);
          });
      } catch (err) {
        console.log(err);
        setisloading(false);
        setiserror(true);
      }
    }
  };
  return (
    <form
      className="flex flex-col gap-4 w-[300px] md:w-[400px] bg-gray-600 p-4 rounded-lg"
      onSubmit={addPost}
    >
      {iserror && <P className="text-red-600">something went wrong</P>}
      <textarea
        name="title"
        cols="30"
        rows="2"
        placeholder="Post Title"
        required
        ref={titleref}
        className="outline-none border-none px-4 text-black rounded py-1"
      ></textarea>
      <textarea
        name="text"
        cols="30"
        rows="4"
        placeholder="Post Description"
        required
        ref={descref}
        className="outline-none border-none px-4 text-black rounded py-1"
      ></textarea>

      <section className="flex flex-wrap justify-between">
        <label
          htmlFor="file"
          className="flex items-center font-semibold gap-4 cursor-pointer"
        >
          <p>Add an Image</p>
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
        <button className="bg-green-600 px-2 py-1 rounded font-semibold">
          {isloading ? "posting..." : "Add post"}
        </button>
      </section>
    </form>
  );
};

export default Addblog;
