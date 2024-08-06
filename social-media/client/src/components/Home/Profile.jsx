import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { MainContext } from '../../context/MainContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaLessThanEqual } from 'react-icons/fa';

const Profile = () => {
  const { handleFileChange, allposts, getPost,userdata } = useContext(MainContext);
  const [userposts, setuserposts] = useState([]);
  const [profileuser, setprofileuser] = useState(null)
  const [following, setfollowing] = useState(false)
  const [followerror, setfollowerror] = useState(false)
  const [alredayFollowing, setalredayFollowing] = useState(false)
  const [unfollowing, setunfollowing] = useState(false)

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

  // function to follow user
  const follow=()=>{
    setfollowing(true)
    axios.patch(`http://localhost:3000/following/${userdata._id}`,{
      username: profileuser.username,
      userId : profileuser._id,
      avatar: profileuser.avatar
    }).then((result)=>{
       console.log(result);
       setfollowing(false)
       setfollowerror(false)
       finduser()
    }).catch((err)=>{
       console.log(err);
       setfollowerror(true)
       setfollowing(false)
    })
  }

  // function to unfollow user
  const unfollow=()=>{
    setunfollowing(true)
    axios.patch(`http://localhost:3000/unfollow/${userdata._id}`,{
      userId : profileuser._id
    }).then((result)=>{
       console.log(result);
       setunfollowing(false)
       setfollowerror(false)
       finduser()
    }).catch((err)=>{
       console.log(err);
       setfollowerror(true)
       setunfollowing(false)
    })
  }


  useEffect(() => {
    let isfollowing = profileuser?.followers?.some((user)=> user.userId == userdata._id)
    setalredayFollowing(isfollowing)
  }, [profileuser]);

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
        {followerror && <p className='text-red-600 text-lg'>somethign went wrong</p>}
        <div className='flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start'>
        <h3 className='font-bold text-2xl'>{profileuser?.username}</h3>
        {alredayFollowing?<button className='font-semibold bg-red-600 text-white px-4 py-2 rounded' onClick={unfollow}>{unfollowing?'Removing...':'Unfollow'}</button>
        :<button className='font-semibold bg-blue-600 text-white px-4 py-2 rounded' onClick={follow}>{following?'saving...':'Follow'}</button>}
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