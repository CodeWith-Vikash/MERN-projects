import React, { useContext, useEffect, useState } from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import Post from './Post';
import { BsThreeDots } from 'react-icons/bs';
import { FaFileImage } from 'react-icons/fa6';
import { MainContext } from '../../context/MainContext';
import axios from 'axios';

const Dashboard = () => {
  const [profilepic, setprofilepic] = useState("/user.jfif");
  const [showoptions, setshowoptions] = useState(null);
  // states to edit post
  const [editingid, seteditingid] = useState(null);
  const [editimg, seteditimg] = useState(null);
  const [edittext, setedittext] = useState('')
  const [saving, setsaving] = useState(false)
  const [saveerror, setsaveerror] = useState(false)
  // states to delete post
  const [deleting, setdeleting] = useState(false)
  const [deleteimg, setdeleteimg] = useState(null)
  const [deletetext, setdeletetext] = useState('')
  const [deleteerror, setdeleteerror] = useState(false)
  const [deletingid, setdeletingid] = useState(null)
  // ............
  const [profileupdating, setprofileupdating] = useState(false);
  const { handleFileChange, userdata, allposts, getPost,getlocalstorage } = useContext(MainContext);
  const [userposts, setuserposts] = useState([]);

  // Function to get user posts
  const findUserPosts = () => {
    if (userdata && allposts) {
      const data = allposts.filter((post) => post.userInfo.userId === userdata._id);
      setuserposts(data);
      console.log(data);
      setprofilepic(userdata.avatar);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    findUserPosts();
  }, [allposts, userdata]);

  // Toggle options
  const toggleOpt = (id) => {
    if(showoptions){
      setshowoptions(null);
    }else{
      setshowoptions(id);
    }
  };

  // Function to update avatar
  const updateProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newProfilePic = reader.result;
      setprofilepic(newProfilePic);
      axios.patch(`http://localhost:3000/profile/${userdata._id}`, { avatar: newProfilePic })
        .then((result) => {
          console.log(result);
          localStorage.setItem('charloguser',JSON.stringify(result.data.data))
          getlocalstorage()
          setprofileupdating(false);
        })
        .catch((err) => {
          console.log(err);
          setprofileupdating(false);
        });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  // function to edit  a post
  const editPost=(post)=>{
    window.scrollTo(0,0)
    seteditingid(post._id)
    seteditimg(post.image)
    setedittext(post.title)
  }

  // function to save a edited post
  const savePost=(e)=>{
    e.preventDefault()
    setsaving(true)
    axios.patch(`http://localhost:3000/post/edit/${editingid}`,{
      title:edittext,
      image:editimg
    }).then((data)=>{
      console.log(data);
      setsaving(false)
      setsaveerror(false)
      seteditingid(null)
      seteditimg(null)
      setedittext('')
      getPost()
      setshowoptions(false)
    }).catch((err)=>{
      console.log(err);
      setsaveerror(true)
      setsaving(false)
    })
  }
  // function to prepare post to delete
  const setDeleteData=(post)=>{
    window.scrollTo(0,0)
    setdeleteimg(post.image)
    setdeletetext(post.title)
    setdeletingid(post._id)
  }
  // function to delete post
  const deletePost=(e)=>{
    setdeletingid(true)
    e.preventDefault()
    axios.delete(`http://localhost:3000/post/delete/${deletingid}`).then((data)=>{
      console.log(data);
      setdeleting(false)
      setdeletingid(null)
      getPost()
    }).catch((err)=>{
      console.log(err);
      setdeleting(false)
      setdeleteerror(true)
    })
  }

  return (
    <div className='min-h-screen bg-slate-200 relative'>
      <section className='bg-pink-100 flex justify-center'>
        <div className='flex flex-col items-center gap-2 md:flex-row p-4 md:gap-4 w-fit'>
          <div className='relative'>
            <img src={profilepic} className='h-[200px] w-[200px] rounded-full object-cover border-2 border-black' />
            <label htmlFor="img">
              <p className='bg-black w-fit p-2 rounded-full absolute bottom-2 right-2 cursor-pointer'>
                <FaCameraRetro size='2rem' color='white' />
              </p>
            </label>
            <input type="file" id="img" className='hidden' onChange={(e) => updateProfile(e)} />
          </div>
          {profileupdating && <p className='text-yellow-400 text-lg font-semibold'>updating...</p>}
          <div className='flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start'>
            <h3 className='font-bold text-2xl'>{userdata?.username}</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, nesciunt.</p>
          </div>
        </div>
      </section>
      <hr />
      <section className='flex flex-col gap-6 items-center py-10'>
        {userposts.map((post) => (
          <div className='relative' key={post._id}>
            {showoptions==post._id && (
              <div className='bg-gray-800 text-white font-semibold w-fit p-2 rounded-lg rounded-tr-none absolute right-10 top-6'>
                <p className='cursor-pointer' onClick={()=>editPost(post)}>Edit Post</p>
                <p className='cursor-pointer' onClick={()=>setDeleteData(post)}>Delete Post</p>
              </div>
            )}
            <BsThreeDots size='1.5rem' className='absolute right-4 top-2 cursor-pointer' onClick={()=>toggleOpt(post._id)} />
            <Post data={post} />
          </div>
        ))}
      </section>
      {/* Editing box */}
      {editingid && (
        <section className='edit h-screen w-full absolute top-0 flex justify-center pt-20'>
          <form className='w-[300px] bg-gray-800 text-white flex flex-col gap-2 p-2 rounded-lg h-fit' onSubmit={savePost}>
            {saveerror && <p className='text-red-600 text-center'>something went wrong</p>}
            <textarea cols="0" rows="3" className='rounded p-2 outline-none w-full text-black'
            value={edittext}
            onChange={(e)=>setedittext(e.target.value)}
            ></textarea>
            <img src={editimg} className='w-full h-[140px] object-cover' />
            <div className='flex items-center justify-between'>
              <label htmlFor="editimg" className='flex items-center gap-2 cursor-pointer'>
                <FaFileImage size='1.5rem' color='violet' />
                <b>Edit image</b>
              </label>
              <button type="submit" className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>{saving?'saving...':'save'}</button>
            </div>
            <input type="file" className='hidden' id='editimg' onChange={(e) => handleFileChange(e, seteditimg)} />
          </form>
        </section>
      )}
      {/* delete box */}
      {deletingid && (
        <section className='edit h-screen w-full absolute top-0 flex justify-center pt-20'>
          <form className='w-[300px] bg-gray-800 text-white flex flex-col gap-2 p-2 rounded-lg h-fit' onSubmit={deletePost}>
            {deleteerror && <p className='text-red-600 text-center'>something went wrong</p>}
            <textarea cols="0" rows="3" className='rounded p-2 outline-none w-full text-black'
            value={deletetext}
            readOnly
            ></textarea>
            {deleteimg && <img src={deleteimg} className='w-full h-[140px] object-cover' />}
              <button type="submit" className='bg-red-600 text-white font-semibold px-2 py-1 rounded'>{saving?'deletting...':'Delete'}</button>
              <button type='button' className='bg-yellow-400 text-white font-semibold px-2 py-1 rounded' onClick={()=>{
                setdeletingid(null)
                setshowoptions(false)
              }}>Go back</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
// old code 