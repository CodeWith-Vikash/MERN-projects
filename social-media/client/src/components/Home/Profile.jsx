import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { MainContext } from "../../context/MainContext";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { handleFileChange, allposts, getPost, userdata, getlocalstorage } =
    useContext(MainContext);
  const [userposts, setuserposts] = useState([]);
  const [profileuser, setprofileuser] = useState(null);
  const [following, setfollowing] = useState(false);
  const [followerror, setfollowerror] = useState(false);
  const [alredayFollowing, setalredayFollowing] = useState(false);
  const [unfollowing, setunfollowing] = useState(false);
  const [showFollowers, setshowFollowers] = useState(false);
  const [showFollowing, setshowFollowing] = useState(false);
  const [inputval, setinputval] = useState("");

  const { id } = useParams();
  
   // function to toggle Followers
   const toggleFollwers = () => {
    setshowFollowers(!showFollowers);
    setinputval('')
  };
  // function to toggle Following
  const toggleFollwing = () => {
    setshowFollowing(!showFollowing);
    setinputval('')
  };

  // Function to get user posts
  const findUserPosts = () => {
    if (allposts) {
      const data = allposts.filter((post) => post.userInfo.userId === id);
      setuserposts(data);
      console.log(data);
    }
  };
  // function to find user
  const finduser = () => {
    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((result) => {
        setprofileuser(result.data);
      })
      .catch((err) => {
        toast.error("server error while getting user posts");
        console.log(err);
      });
  };

  // function to follow user
  const follow = () => {
    setfollowing(true);
    axios
      .patch(`http://localhost:3000/follow/${userdata._id}`, {
        username: profileuser?.username,
        userId: profileuser?._id,
        avatar: profileuser?.avatar,
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem(
          "charloguser",
          JSON.stringify(result.data.myUser._id)
        );
        getlocalstorage();
        setfollowing(false);
        setfollowerror(false);
        finduser();
      })
      .catch((err) => {
        console.log(err);
        toast.error("server error");
        setfollowerror(true);
        setfollowing(false);
      });
  };

  // function to unfollow user
  const unfollow = () => {
    setunfollowing(true);
    axios
      .patch(`http://localhost:3000/unfollow/${userdata._id}`, {
        userId: profileuser._id,
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem(
          "charloguser",
          JSON.stringify(result.data.myUser._id)
        );
        getlocalstorage();
        setunfollowing(false);
        setfollowerror(false);
        finduser();
      })
      .catch((err) => {
        console.log(err);
        toast.error("server error");
        setfollowerror(true);
        setunfollowing(false);
      });
  };

  useEffect(() => {
    let isfollowing = profileuser?.followers?.some(
      (user) => user.userId == userdata?._id
    );
    setalredayFollowing(isfollowing);
  }, [profileuser]);

  useEffect(() => {
    getPost();
    finduser();
  }, []);

  useEffect(() => {
    findUserPosts();
  }, [allposts]);
  return (
    <>
      <div className={`min-h-screen bg-slate-200 relative ${
        showFollowers || showFollowing
          ? "h-screen overflow-hidden"
          : null
      }`}>
        <section className="bg-pink-100 flex justify-center">
          <div className="flex flex-col items-center gap-2  md:flex-row p-4 md:gap-4 w-fit">
            <img
              src={profileuser?.avatar}
              className="h-[200px] w-[200px] rounded-full object-cover border-2 border-black"
            />
            {followerror && (
              <p className="text-red-600 text-lg">somethign went wrong</p>
            )}
            <div className="flex flex-col items-center gap-1 w-[300px] leading-4 md:items-start">
              <h3 className="font-bold text-2xl">{profileuser?.username}</h3>
              <div className="flex gap-4 py-4">
              <p onClick={toggleFollwers}>
                <b>{userposts?.length}</b> Posts
              </p>
              <p className="cursor-pointer" onClick={toggleFollwers}>
                <b>{profileuser?.followers.length}</b> Followers
              </p>
              <p className="cursor-pointer" onClick={toggleFollwing}>
                <b>{profileuser?.following.length}</b> Following
              </p>
            </div>
              {alredayFollowing ? (
                <button
                  className="font-semibold bg-red-600 text-white px-4 py-2 rounded"
                  onClick={unfollow}
                >
                  {unfollowing ? "Removing..." : "Unfollow"}
                </button>
              ) : (
                <button
                  className="font-semibold bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={follow}
                >
                  {following ? "saving..." : "Follow"}
                </button>
              )}
            </div>
          </div>
        </section>
        <hr />
        <section className="flex flex-col gap-6 items-center py-10">
          {userposts.map((post) => {
            return <Post data={post} key={post._id} />;
          })}
        </section>
        {/* followers section */}
      {showFollowers && (
        <section className="edit h-screen w-full absolute top-0 pt-10 flex justify-center">
          <div className="bg-gray-800 text-white w-[300px] md:w-[400px] rounded-lg h-fit ">
            <div className="flex items-center p-2 font-semibold text-lg justify-end gap-[88px] border-b-2">
              <p>Followers</p>
              <span className="cursor-pointer pr-2" onClick={toggleFollwers}>
                ✕
              </span>
            </div>

            <div className="relative flex justify-center p-2 ">
              <input
                type="text"
                placeholder="search"
                value={inputval}
                onChange={(e) => setinputval(e.target.value)}
                className="outline-none rounded-full py-1 px-10 w-full text-black"
              />
              <FaSearch className="absolute top-[50%] left-4 translate-y-[-50%] text-black" />
            </div>

            <div className="flex flex-col p-2 h-[300px] overflow-auto">
              {profileuser?.followers
                .filter((user) =>
                  user.username.toUpperCase().startsWith(inputval.toUpperCase())
                )
                .map((user) => {
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
                      <button className="outline-none border-none bg-blue-400 text-black font-semibold px-2 rounded h-fit py-1 text-sm">
                        Follow
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* following section */}
      {showFollowing && (
        <section className="edit h-screen w-full absolute top-0 pt-10 flex justify-center">
          <div className="bg-gray-800 text-white w-[300px] md:w-[400px] rounded-lg h-fit ">
            <div className="flex items-center p-2 font-semibold text-lg justify-end gap-[88px] border-b-2">
              <p>Following</p>
              <span className="cursor-pointer pr-2" onClick={toggleFollwing}>
                ✕
              </span>
            </div>

            <div className="relative flex justify-center p-2 ">
              <input
                type="text"
                placeholder="search"
                value={inputval}
                onChange={(e) => setinputval(e.target.value)}
                className="outline-none rounded-full py-1 px-10 w-full text-black"
              />
              <FaSearch className="absolute top-[50%] left-4 translate-y-[-50%] text-black" />
            </div>

            <div className="flex flex-col p-2 h-[300px] overflow-auto">
              {profileuser?.following.filter((user) =>
                  user.username.toUpperCase().startsWith(inputval.toUpperCase())
                ).map((user) => {
                return (
                  <div className="flex justify-between p-2 items-center">
                    <Link to={`/profile/${user.userId}`}>
                      <div className="flex items-center gap-2">
                        <img
                          src={user.avatar}
                          alt="user"
                          className="h-10 w-10 rounded-full object-cover font-semibold"
                        />
                        <p className="max-w-[90px] md:max-w-[150px] leading-4">{user.username}</p>
                      </div>
                    </Link>
                    <button className="outline-none border-none bg-blue-600 text-white font-semibold px-2 rounded h-fit py-1 text-sm" >
                      Follow
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
};

export default Profile;
