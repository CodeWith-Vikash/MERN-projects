import React, { useState, useEffect, useContext } from "react";
import { Rating } from "@mui/material";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { motion } from "framer-motion";
import axios from 'axios'
import {toast} from 'react-toastify'

const Game = () => {
  const navigate=useNavigate()
  const { mode } = useParams();
  const [ismoveselected, setismoveselected] = useState(false)
  const [mymove,setmymove] = useState(null);
  const [computermove, setcomputermove] = useState(null);
  const { baseurl, game,setgame,userdata,setwinner,winner} = useContext(MainContext);
  const [myscore, setmyscore] = useState(0);
  const [computerscore, setcomputerscore] = useState(0);
  const moves = ["rock", "paper", "scissor"];
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 768);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


  // Function to generate a random move for the computer
  const generateComputerMove = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  };
// function to check winner
const checkWinner=()=>{
    axios.post(`${baseurl}/api/game/winner/${game._id}`).then((result)=>{
      console.log(result)
      setgame(result.data.game)
      if(result.data.game.winner){
        setwinner(result.data.game.winner)
        setTimeout(() => {
          navigate('/result')
        },1000);
      }
      setTimeout(() => {
          setismoveselected(false)
      }, 1000);
    }).catch((err)=>{
      toast.error(err.response?err.response.data.message:'something went wrong')
    })
 }
//   function to update score
   const updateScore=(winner)=>{
      axios.patch(`${baseurl}/api/game/score/${game._id}`,{mode,winner}).then((result)=>{
        // console.log(result)
        checkWinner()
      }).catch((err)=>{
        toast.error(err.response?err.response.data.message:'something went wrong')
      })
   }

  // Function to determine the winner and update the score
  const determineWinner = (mymove, computermove) => {
    if (mymove === computermove) {
        setTimeout(() => {
            setismoveselected(false)
        }, 1000);
      return "draw";
    } else if (
      (mymove === "rock" && computermove === "scissor") ||
      (mymove === "scissor" && computermove === "paper") ||
      (mymove === "paper" && computermove === "rock")
    ) {
      // Player wins
      updateScore(userdata._id)
    } else {
      // Computer wins
      updateScore('computer')
    }
  };

  // This useEffect triggers the game logic whenever the player makes a move
  useEffect(() => {
    if (mymove) {
      const computerMove = generateComputerMove();
      setcomputermove(computerMove);
      determineWinner(mymove, computerMove);
      console.log(ismoveselected)
    }
  }, [mymove]);

  // handle move selection
  const handleMoveSelection = (move) => {
    if (!ismoveselected) {
      setmymove(null);
      setTimeout(() => {
        setmymove(move);
        setismoveselected(true);
      }, 100);
    }
  };

  useEffect(()=>{
    if(game){
      setmyscore(game.player1score)
      setcomputerscore(game.player2score)
    }
  },[game])

  return (
    <div
      style={{ backgroundImage: `url(/bg.jpg)` }}
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
    >
      <div className="w-[300px] md:w-[600px] h-[400px] flex flex-col md:flex-row relative">
        <section className="left md:w-[50%] h-full md:rounded-l-lg rounded-t-lg md:rounded-tr-none relative">
          <div className="flex items-center p-2">
            <img
              src={game?.player1.avatar}
              className="h-10 w-10 rounded-full object-cover"
            />
             <Rating
              name="read-only"
              value={myscore}
              max={3}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "gold",
                },
                "& .MuiRating-iconEmpty": {
                  color: "lightgray",
                },
              }}
            />
          </div>
          {/* move */}
          <motion.img
            initial={isWideScreen?{right:'100px',top:'0%',opacity:0}:{right:'-10px',top:'0%',opacity:0}}
            animate={ismoveselected?isWideScreen?{right:'50px',top:'10%',opacity:1}:{right:'40px',top:'0%',opacity:1}:{}}
            transition={{
                duration:0.5,
            }}
            src={`/${mymove ? mymove : "rock"}.png`}
            className="lmove h-[250px] absolute top-[0%] right-[40px] md:top-[10%] md:right-[50px] md:h-[300px]"
          />
        </section>

        <section className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none relative">
          <div className="flex items-center p-2 md:justify-end">
            <img
              src={mode == "computer" ? "/bot.jfif" : game?.player2?.avatar}
              className="h-10 w-10 rounded-full object-cover"
            />
            <Rating
              name="read-only"
              value={computerscore}
              max={3}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "gold",
                },
                "& .MuiRating-iconEmpty": {
                  color: "lightgray",
                },
              }}
            />
          </div>
          {/* move */}
          <motion.img
            initial={isWideScreen?{left:'100px',top:'0%',opacity:0}:{left:'-10px',top:'0%',opacity:0}}
            animate={ismoveselected?isWideScreen?{left:'50px',top:'10%',opacity:1}:{left:'40px',top:'0%',opacity:1}:{}}
            transition={{
                duration:0.5,
            }}
            src={`/${computermove ? computermove : "rock"}.png`}
            className="rmove h-[250px] absolute top-[0%] left-[40px] md:top-[10%] md:left-[50px] md:h-[300px]"
          />
        </section>

        <section className="flex gap-2 md:justify-center absolute bottom-[38%] right-2 md:bottom-2 md:right-[40%]">
      {!winner && <>
      {!ismoveselected ? (
        <>
            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }} // Animate only when no move is selected
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                }}
            >
                <FaHandRock
                    size={"2.5rem"}
                    className="bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer"
                    onClick={() => handleMoveSelection('rock')}
                />
            </motion.div>

            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }} // Animate only when no move is selected
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                }}
            >
                <FaHandPaper
                    size={"2.5rem"}
                    className="bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer"
                    onClick={() => handleMoveSelection('paper')}
                />
            </motion.div>

            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }} // Animate only when no move is selected
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                }}
            >
                <FaHandScissors
                    size={"2.5rem"}
                    className="bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer"
                    onClick={() => handleMoveSelection('scissor')}
                />
            </motion.div>
        </>
    ) : (
        <>
            {/* Static options after a move is selected */}
            <div>
                <FaHandRock
                    size={"2.5rem"}
                    className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'rock' ? 'border-green-500' : ''}`}
                    
                />
            </div>
            <div>
                <FaHandPaper
                    size={"2.5rem"}
                    className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'paper' ? 'border-green-500' : ''}`}
                    
                />
            </div>
            <div>
                <FaHandScissors
                    size={"2.5rem"}
                    className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'scissor' ? 'border-green-500' : ''}`}
                    
                />
            </div>
        </>
    )}
      </>}
</section>

      </div>
    </div>
  );
};

export default Game;
