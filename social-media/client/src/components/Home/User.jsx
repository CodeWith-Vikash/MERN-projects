import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import {Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const User = ({user,finduser}) => {
    const [following, setfollowing] = useState(false);
    const [alredayFollowing, setalredayFollowing] = useState(false);
    const [unfollowing, setunfollowing] = useState(false);
    const {userdata} =
    useContext(MainContext);
    console.log(alredayFollowing,'user : ',user);
    

      // function to follow a connection of profile user
  const followConnection = () => {
    setfollowing(true);
    axios
      .patch(`http://localhost:3000/follow/${userdata._id}`, {
        username: user.username,
        userId: user.userId,
        avatar: user.avatar,
        following: user.following,
        followers: user.followers
      })
      .then((result) => {
        console.log(result);
        setfollowing(false);
        finduser();
      })
      .catch((err) => {
        console.log(err);
        toast.error("server error");
        setfollowing(false);
      });
  };

  // function to unfollow a connection of profile user
  const unfollowConnection = () => {
    setunfollowing(true);
    axios
      .patch(`http://localhost:3000/unfollow/${userdata._id}`, {
        userId:user.userId,
      })
      .then((result) => {
        console.log(result);
        setunfollowing(false);
        finduser();
      })
      .catch((err) => {
        console.log(err);
        toast.error("server error");
        setunfollowing(false);
      });
  };

 useEffect(()=>{
    let isfollowing = user?.followers?.some(
        (user) => user.userId == userdata?._id
      );
      console.log('userfollow :',isfollowing)
      setalredayFollowing(isfollowing);
 },[user,userdata])
  return (
    <div className="flex justify-between p-2 items-center">
      <Link to={`/profile/${user.userId}`}>
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt="user"
            className="h-10 w-10 rounded-full object-cover font-semibold"
          />
          <p className="leading-4 max-w-[90px] md:max-w-[150px]">
            {user.username}
          </p>
        </div>
      </Link>
      {alredayFollowing ? (
        <button
          className="outline-none border-none bg-red-500 text-black font-semibold px-2 rounded h-fit py-1 text-sm"
          onClick={() => unfollowConnection()}
        >
          {unfollowing ? "Removing..." : "Unfollow"}
        </button>
      ) : (
        <button
          className="outline-none border-none bg-blue-400 text-black font-semibold px-2 rounded h-fit py-1 text-sm"
          onClick={() => followConnection()}
        >
          {following ? "saving..." : "Follow"}
        </button>
      )}
    </div>
  );
};

export default User;
