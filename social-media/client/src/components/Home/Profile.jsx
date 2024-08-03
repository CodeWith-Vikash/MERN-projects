import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { MainContext } from '../../context/MainContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { handleFileChange, allposts, getPost } = useContext(MainContext);
  const [userposts, setuserposts] = useState([]);
  const [profileuser, setprofileuser] = useState(null)

  const {id}=useParams()

   // Function to get user posts
   const findUserPosts = () => {
    if (allposts) {
      const data = allposts.filter((post) => post.userInfo.userId === id);
      setuserposts(data);
      console.log(data);
    }
  };
  // function to find user
  const finduser=()=>{
     axios.get(`http://localhost:3000/user/${id}`).then((result)=>{
       setprofileuser(result.data)
     }).catch((err)=>{
        console.log(err);
     })
  }

  useEffect(() => {
    getPost();
    finduser()
  }, []);

  useEffect(() => {
    findUserPosts();
  }, [allposts]);
  return (
    <div className='min-h-screen bg-slate-200'>
      <section className='bg-pink-100 flex justify-center'>
        <div className='flex flex-col items-center gap-2  md:flex-row p-4 md:gap-4 w-fit'>
        <img src={profileuser?.avatar} className='h-[200px] w-[200px] rounded-full object-cover border-2 border-black'/>
        <div className='flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start'>
        <h3 className='font-bold text-2xl'>{profileuser?.username}</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, nesciunt.</p>
        </div>
        </div>
      </section>
      <hr />
      <section className='flex flex-col gap-6 items-center py-10'>
          {userposts.map((post)=>{
             return <Post data={post} key={post._id}/>
          })}
      </section>
    </div>
  )
}

export default Profile