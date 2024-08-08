import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from 'axios'

const Reply = ({reply,postId,commentId,username}) => {
  const { commentTimeGap, userdata, getlocalstorage,getPost } = useContext(MainContext);
  const [showreplybox, setshowreplybox] = useState(false);
  const [replyval, setreplyval] = useState('')
  // toggle reply box
  const toggleReplyBox = () => {
    setshowreplybox(!showreplybox);
  };

  // function to reply a reply
  const replyAreply=(e)=>{
    e.preventDefault()
    axios.patch(`http://localhost:3000/post/${postId}/comment/${commentId}/reply`,{
      username:userdata.username,
      avatar: userdata.avatar,
      reply: replyval,
      userId: userdata.userId,
      commentUser: reply.username
  }).then((result)=>{
     console.log(result);
     setreplyval('')
     getPost()
  }).catch((err)=>{
     console.log(err)
  })
  }
  return (
    <div className="reply flex gap-1">
      <Link to="/">
        <img
          src={reply.avatar}
          className="h-7 w-7 rounded-full object-cover"
        />
      </Link>
      <div>
        <div className="bg-blue-200 p-2 rounded w-full">
          <p className="font-semibold text-sm">{reply.username}</p>
          <p className="leading-4">
            <span className="font-semibold pr-2">{reply.commentUser}</span>
            {reply.reply}
          </p>
        </div>
        <div className="flex gap-2 items-center px-2">
          <p className="text-sm">{commentTimeGap(reply.replyDate)}</p>
          <p
            className="text-sm font-semibold hover:underline cursor-pointer"
            onClick={toggleReplyBox}
          >
            reply
          </p>
        </div>
        {/* reply box */}
        {showreplybox && (
          <form className="flex items-center gap-2 bg-emerald-800 p-2 rounded" onSubmit={replyAreply}>
            <Link to="/dash">
              <img
                src={userdata?.avatar}
                className="h-7 w-7 rounded-full object-cover"
              />
            </Link>
            <input
              type="text"
              value={replyval}
              required
              onChange={(e) => setreplyval(e.target.value)}
              placeholder={`reply to ${reply.username}`}
              className="outline-none p-2 rounded-full bg-green-200 text-sm w-[90%]"
            />
            <button type="submit">
            <RiSendPlane2Fill size="1.5rem" color="white" className="cursor-pointer"/>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reply;
