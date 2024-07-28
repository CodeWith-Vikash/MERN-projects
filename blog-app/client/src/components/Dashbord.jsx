import React, { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../context/MainContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { FaRegImage } from "react-icons/fa6";
import DashSke from "./Skeletons/DashSke";

const Dashbord = () => {
  const { isdark, userdata, postdata, getPost,ispostloading } = useContext(mainContext);
  const [deletingid, setdeletingid] = useState(null);
  const [editingid, seteditingid] = useState(null);
  const [saving, setsaving] = useState(false)
  const [imageSrc, setImageSrc] = useState("");
  const [iserror, setiserror] = useState(false);
  console.log(postdata);

  const deletePost = (id) => {
    setdeletingid(id);
    axios
      .delete(`http://localhost:3000/${id}`)
      .then((data) => {
        console.log(data);
        getPost();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setdeletingid(null);
      });
  };

  const titleref = useRef();
  const descref = useRef();
  const formref= useRef()

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

  const editBlog = (post) => {
    seteditingid(post._id);
    titleref.current.value=post.title,
    descref.current.value=post.text,
    setImageSrc(post.image)
    formref.current.style.display='flex'
    window.scrollTo(0,0)
  };

  const saveEdit = (e) => {
    e.preventDefault()
    setsaving(true)
    axios.patch(`http://localhost:3000/${editingid}`, {
      title:titleref.current.value,
      text:descref.current.value,
      image:imageSrc
    }).then((data)=>{
      console.log(data);
      formref.current.style.display='none'
      getPost()
    }).catch((err)=>{
       console.log(err);
       setiserror(true)
    }).finally(()=>{
      setsaving(false)
    })
  };

  useEffect(()=>{
    getPost()
  },[])
  return (
    <div
      className={`min-h-screen ${
        isdark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <main className="min-h-screen">
        <section className="edit hidden absolute top-0 bg-black h-full w-full  items-center justify-center"
        ref={formref}
        >
          <form
            className="flex flex-col gap-4 w-[300px] md:w-[400px] bg-gray-600 p-4 rounded-lg"
            onSubmit={saveEdit}
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
                save
              </button>
            </section>
          </form>
        </section>

        <section
          className={`flex justify-center flex-wrap items-center gap-4 p-5 ${
            isdark ? "bg-gray-800" : "bg-gray-300"
          }`}
        >
          <img
            src={userdata?.avatar}
            className="h-[200px] w-[200px] object-cover rounded-full"
          />
          <div className="flex flex-col items-center w-[300px]">
            <b className="text-lg">@{userdata?.username}</b>
            <p className="text-sm font-semibold leading-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              dolorem at, esse labore quidem ab error quibusdam molestias omnis
              officiis similique a ducimus magnam ea voluptates nesciunt sit,
              repellat aliquam!
            </p>
          </div>
        </section>
        <h3 className="font-bold text-2xl text-center my-10">My Blogs</h3>
        {ispostloading?
         <DashSke/>
        :<section className="flex justify-center flex-wrap gap-6 p-4 pb-10">
          {postdata
            ?.filter((post) => post.autherInfo[0].auther == userdata.username)
            .map((post) => {
              return (
                <div
                  className="blog w-[250px] flex flex-col gap-2 rounded-lg p-4 h-fit"
                  key={post._id}
                >
                  <div
                    className={` h-[150px] w-full bg-cover flex flex-col justify-center gap-2 p-4 font-semibold`}
                    style={{ backgroundImage: `url(${post.image})` }}
                  >
                    <button
                      className="bg-yellow-600 px-2 py-1 rounded"
                      onClick={() => editBlog(post)}
                    >
                      Edit blog
                    </button>
                    {deletingid == post._id ? (
                      <button className="bg-red-600 px-2 py-1 rounded">
                        deleting...
                      </button>
                    ) : (
                      <button
                        className="bg-red-600 px-2 py-1 rounded"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete blog
                      </button>
                    )}
                  </div>
                  <h3 className="text-sm leading-5">{post.title}</h3>
                </div>
              );
            })}
        </section>}
      </main>
      <Footer />
    </div>
  );
};

export default Dashbord;
