import React, { useContext, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdEmojiEmotions } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { UserContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ChatBox = ({ openSide }) => {
  const [isEmojiVisible, setisEmojiVisible] = useState(false);
  const [inputval, setinputval] = useState("");
  const [mediaType, setmediaType] = useState("text");
  const [mediaUrl, setmediaUrl] = useState("");
  const [sending, setsending] = useState(false);
  const { userdata, chat, chatuser, uploadFile, getChat } =
    useContext(UserContext);

  // function to handle media input
  async function handleFileInput(file) {
    if (file) {
      const fileType = file.type;

      let type;
      if (fileType.startsWith("image/")) {
        type = "image";
      } else if (fileType.startsWith("video/")) {
        type = "video";
      } else if (fileType.startsWith("application/")) {
        type = "file";
      } else {
        type = "unknown";
      }
      setmediaType(type);
      await uploadFile(file, setmediaUrl);
    }
  }

  // function to send message
  const sendMessage = () => {
    setsending(true);
    axios
      .post(`/api/chat/message/${chat?._id}`, {
        contentType: mediaType,
        content: inputval,
        mediaUrl,
        sender: userdata?._id,
      })
      .then((result) => {
        console.log(result);
        getChat(chatuser._id);
        setsending(false);
        setinputval("");
        setmediaUrl("");
        setmediaType("text");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setsending(false);
      });
  };

  return (
    <div>
      <nav className="h-[9.2vh] bg-zinc-800 flex items-center px-2 gap-4">
        <FaArrowAltCircleRight
          size="2rem"
          onClick={openSide}
          className="md:hidden"
        />
        <div className="flex items-center gap-1">
          <img
            src={chatuser?.avatar ? chatuser.avatar : "/user.jfif"}
            className="h-10 rounded-full w-10 object-cover"
          />
          <span>{chatuser?.username}</span>
        </div>
      </nav>
      {/* chat box */}
      <section className=" h-[80.8vh] bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-4 overflow-auto flex flex-col gap-4">
        {chat?.messages?.map((message) => {
          if (message.sender._id == userdata?._id) {
            return message.contentType == "image" ? (
              <div className="flex gap-2 flex-row-reverse">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <div className="bg-green-500 w-fit p-1 mt-4 rounded-xl text-sm font-semibold rounded-tr-sm h-fit">
                  <img
                    src={message.mediaUrl}
                    className="w-[250px] rounded-lg"
                  />
                  <p className="p-2">{message.content}</p>
                </div>
              </div>
            ) : message.contentType == "video" ? (
              <div className="flex gap-2 flex-row-reverse">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <div className="bg-green-500 w-fit p-1 mt-4 rounded-xl text-sm font-semibold rounded-tr-sm h-fit">
                  <video controls className="w-[250px] rounded-lg h-[200px]">
                    <source src={message.mediaUrl} type="video/mp4" />
                  </video>
                  <p className="p-2">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 flex-row-reverse">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <p className="bg-green-500 w-fit p-2 mt-4 rounded-xl text-sm font-semibold rounded-tr-sm h-fit">
                  {message.content}
                </p>
              </div>
            );
          } else {
            return message.contentType == "image" ? (
              <div className="flex gap-2 ">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <div className="bg-blue-500 w-fit p-1 mt-4 rounded-xl text-sm font-semibold rounded-tl-sm h-fit">
                  <img
                    src={message.mediaUrl}
                    className="w-[250px] rounded-lg"
                  />
                  <p className="p-2">{message.content}</p>
                </div>
              </div>
            ) : message.contentType == "video" ? (
              <div className="flex gap-2">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <div className="bg-blue-500 w-fit p-1 mt-4 rounded-xl text-sm font-semibold rounded-tl-sm h-fit">
                  <video controls className="w-[250px] rounded-lg h-[200px]">
                    <source src={message.mediaUrl} type="video/mp4" />
                  </video>
                  <p className="p-2">{message.content}</p>
                </div>
              </div>
            ) :(
              <div className="flex gap-2 ">
                <img
                  src={message.sender.avatar}
                  className="h-10 rounded-full w-10 object-cover"
                />
                <p className="bg-blue-500 w-fit p-2 mt-4 rounded-xl text-sm font-semibold rounded-tl-sm h-fit">
                  {message.content}
                </p>
              </div>
            );
          }
        })}
      </section>
      <section className="relative">
        {/* emoji picker */}
        {isEmojiVisible && (
          <div className="absolute bottom-[11vh] left-2 z-[0] flex-shrink-0">
            <Picker
              data={data}
              onEmojiSelect={(e) => setinputval((prev) => prev + e.native)}
            />
          </div>
        )}
        <div className="h-[10vh] bg-black flex items-center gap-4 px-2">
          <MdEmojiEmotions
            size="2rem"
            className="cursor-pointer"
            onClick={() => setisEmojiVisible(!isEmojiVisible)}
          />

          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => handleFileInput(e.target.files[0])}
          />
          <label htmlFor="image">
            <BiSolidImageAdd size="2rem" />
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write something..."
              className="px-2 py-1 rounded w-[60vw] text-black outline-none bg-gray-300"
              value={inputval}
              onChange={(e) => setinputval(e.target.value)}
            />
            <button
              className="bg-green-600 py-1 px-2 font-semibold rounded flex items-center gap-1"
              onClick={sendMessage}
            >
              send
              {sending && (
                <img src="/loader.gif" className="h-5 w-5 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
