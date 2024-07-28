import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { mainContext } from "../context/MainContext";
import Addblog from "./Addblog";
import axios from "axios";
import BlogSke from "./Skeletons/BlogSke";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isdark, userdata, postdata, setpostdata } = useContext(mainContext);
  const [isloading, setisloading] = useState(false);
  const [iserror, setiserror] = useState(false);
  const navigate=useNavigate()

  const getPost = () => {
    setisloading(true);
    axios
      .get("http://localhost:3000/")
      .then((result) => {
        console.log(result);
        setpostdata(result.data);
        setisloading(false);
        setiserror(false);
      })
      .catch((err) => {
        console.log(err);
        setiserror(true);
        setisloading(false);
      });
  };

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString("en-US", options);
    return dateString;
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isdark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <main className="min-h-screen">
        <section className="flex justify-center my-5">
          <Addblog getPost={getPost} />
        </section>
        {isloading ? (
          <BlogSke />
        ) : (
          <section className="flex justify-center flex-wrap gap-10 px-5 py-10">
            {postdata.map((post) => {
              return (
                <div className="blog w-[300px] flex flex-col gap-2  p-2 rounded-lg cursor-pointer" onClick={()=> navigate(`/${post._id}`)} key={post._id}>
                  <div className="flex gap-2 items-center">
                    <img
                      src={post.autherInfo[0].avatar}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p>@{post.autherInfo[0].auther}</p>
                  </div>
                  <img
                    src={post.image}
                    className="w-full h-[200px] object-cover"
                  />
                  <h3 className="leading-5 font-semibold text-lg">
                    {post.title}
                  </h3>
                  <p className="text-sm">blog written on {convertDate(post.dateCreated)}</p>
                </div>
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
