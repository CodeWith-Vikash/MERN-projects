import React, { useContext, useState } from "react";
import bg from "/bg3.jpg";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [room, setroom] = useState("");
  const [gameid, setgameid] = useState("");
  const [joining, setjoining] = useState(false);
  const {
    baseurl,
    token,
    userdata,
    setgame,
    createGame,
    creatingcomputer,
    creatingfriend,
    socket,
    roomname,
    setwaiting
  } = useContext(MainContext);
  const navigate = useNavigate();

  const joingame = (e) => {
    e.preventDefault();
    if (userdata) {
      if (socket) {
        if(room && gameid){
          setjoining(true);
        axios
          .patch(`${baseurl}/api/game/join/${gameid}`, {
            userId: userdata._id,
            roomname:room,
          })
          .then((result) => {
            console.log(result);
            setgame(result.data.game);
            setwaiting(false)
            socket.emit("joinRoom", {roomname:room});
            navigate('/game/friend')
          })
          .catch((err) => {
            console.log(err);
            toast.error(
              err.response ? err.response.data.message : "something went wrong"
            );
          })
          .finally(() => setjoining(false));
        }else{
          toast.error("roomname and gameid not avilable");
        }
      } else {
        toast.error("socket not avilable");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`h-screen w-full bg-cover bg-center flex justify-center items-center text-white`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="card w-[300px] md:w-[500px] md:h-[300px] rounded-lg py-5 gap-4 flex flex-col md:flex-row items-center">
        <motion.section
          initial={{ y: 5 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="flex flex-col items-center font-bold h-fit w-[50%]"
        >
          <h3 className="font-mono text-7xl">ROCK</h3>
          <h3 className="font-mono text-6xl">PAPER</h3>
          <h3 className="font-sans text-4xl">SCISSOR</h3>
        </motion.section>

        <section className="flex flex-col items-start justify-center gap-2 h-full md:w-[50%]">
          {/* Rock Image Animation
          <motion.img
            initial={{ rotate: 55 }}
            animate={{ rotate: 50 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            src="/rock.png"
            className="hidden md:block h-[200px] rock absolute bottom-8 left-[-5px]"
          />

          Paper Image Animation
          <motion.img
            initial={{ rotate: 185 }}
            animate={{ rotate: 180 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            src="/paper.png"
            className="hidden md:block h-[250px] paper absolute right-0 bottom-[30px]"
          /> */}
          <form
            className="flex flex-col gap-2 items-start bg-black p-2 rounded bg-opacity-[0.5]"
            onSubmit={joingame}
          >
            <input
              type="text"
              placeholder="RoomName"
              required
              value={room}
              onChange={(e) => setroom(e.target.value)}
              className="outline-none bg-transparent border-white border rounded py-1 px-2"
            />
            <input
              type="text"
              placeholder="Game id"
              required
              value={gameid}
              onChange={(e) => setgameid(e.target.value)}
              className="outline-none bg-transparent border-white border rounded py-1 px-2"
            />
            <motion.button
              type="submit"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="btn text-sm h-fit border-2 border-white rounded-lg py-1 px-2 flex items-center gap-1"
            >
              {joining ? "joining..." : "Join a Game"}
            </motion.button>
          </form>
          <motion.button
            type="button"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="btn text-sm h-fit border-2 border-white rounded-lg py-1 px-2 flex items-center gap-1"
            onClick={() =>
              userdata ? createGame("computer") : navigate("/login")
            }
          >
            {creatingcomputer ? "creating..." : "Play With Computer"}
          </motion.button>

          <motion.button
            type="button"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2"
            onClick={() =>
              userdata ? createGame("friend") : navigate("/login")
            }
          >
            {creatingfriend ? "creating..." : "Play With Friend"}
          </motion.button>
        </section>
      </div>
    </div>
  );
};

export default Home;
