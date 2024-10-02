import React, { useState, useEffect, useContext } from "react";
import { Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Move from "./Move";

const Game = () => {
  const navigate = useNavigate();
  const { mode } = useParams();
  const [ismoveselected, setismoveselected] = useState(false);
  const [mymove, setmymove] = useState(null);
  const [computermove, setcomputermove] = useState(null);
  const [opponent, setopponent] = useState(null);
  const {
    baseurl,
    game,
    setgame,
    userdata,
    setwinner,
    winner,
    roomname,
    socket,
    opponentmove,
    setopponentmove,
    waiting,
    setwaiting
  } = useContext(MainContext);
  console.log(game);
  const [opponentScore, setopponentScore] = useState(0);
  const [myscore, setmyscore] = useState(0);
  const [computerscore, setcomputerscore] = useState(0);
  const moves = ["rock", "paper", "scissor"];
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to generate a random move for the computer
  const generateComputerMove = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  };
  // function to check winner
  const checkWinner = () => {
    axios
      .post(`${baseurl}/api/game/winner/${game._id}`,{roomname})
      .then((result) => {
        console.log(result);
        setgame(result.data.game);
        setopponentmove(null)
        setmymove(null)
        if (result.data.game.winner) {
          setwinner(result.data.game.winner);
          setTimeout(() => {
            navigate("/result");
          }, 1000);
        }
        setTimeout(() => {
          setismoveselected(false);
        }, 1000);
      })
      .catch((err) => {
        toast.error(
          err.response ? err.response.data.message : "something went wrong"
        );
      });
  };
  //   function to update score
  const updateScore = (winner) => {
    if(roomname){
      axios
      .patch(`${baseurl}/api/game/score/${game._id}`, { mode, winner,roomname })
      .then((result) => {
        // console.log(result)
        checkWinner();
      })
      .catch((err) => {
        toast.error(
          err.response ? err.response.data.message : "something went wrong"
        );
      });
    }else{
       toast.error('roomname not avilable to update score')
    }
  };

  // Function to determine the winner and update the score
  const [scoreUpdated, setScoreUpdated] = useState(false); // Flag to track if the score has been updated

const determineWinner = (move) => {
  if (!mymove || !move || scoreUpdated) {
    return; // Ensure both moves are set and the score hasn't been updated
  }

  let winnerId;
  if (mymove === move) {
    // Handle draw case
    setTimeout(() => {
      setismoveselected(false);
      setmymove(null);
      setopponentmove(null);
      setScoreUpdated(false); // Reset score update flag for the next round
    }, 1000);
    return "draw"; 
  }

  const playerWins =
    (mymove === "rock" && move === "scissor") ||
    (mymove === "scissor" && move === "paper") ||
    (mymove === "paper" && move === "rock");

  if (playerWins) {
    winnerId = userdata._id; // Player wins
  } else {
    winnerId = mode === 'computer' ? 'computer' : opponent._id; // Opponent or computer wins
  }

  // Update score if not already updated
  updateScore(winnerId);
  setScoreUpdated(true); // Set flag to prevent multiple updates
};

  

  // This useEffect triggers the game logic whenever the player makes a move
  useEffect(() => {
    if (mymove) {
      if (mode === 'computer') {
        const computerMove = generateComputerMove();
        setcomputermove(computerMove);
        determineWinner(computerMove);
      } else if (opponentmove) {
        determineWinner(opponentmove);
      }
    }
    
    // Reset score update flag at the end of the round
    setTimeout(() => setScoreUpdated(false), 1000); // Reset after determining winner
  }, [mymove, opponentmove]);
  

  // handle move selection
  const handleMoveSelection = (move) => {
    if (!ismoveselected) {
      setmymove(null);
      setTimeout(() => {
        setmymove(move);
        if(mode=='friend'){
          if(socket){
            if(roomname){
              if(userdata){
                socket.emit('mymove',{roomname,move,userId:userdata._id})
              }else{
                toast.error('userdata not avilable')
              }
            }else{
              toast.error('roomname not avilable')
            }
          }else{
            toast.error('socket not avilable')
          }
          if(!opponentmove){
            setwaiting(true)
          }
        }
        setismoveselected(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (game) {
      if (mode == "computer") {
        setmyscore(game.player1score);
        setcomputerscore(game.player2score);
      } else {
        setmyscore(
          game.player1._id == userdata._id
            ? game.player1score
            : game.player2score
        );
        setopponentScore(
          game.player1._id != userdata._id
            ? game.player1score
            : game.player2score
        );
        setopponent(
          game.player1._id == userdata._id
            ? game.player2
            : game.player1
        );
      }
    }
  }, [game]);

  return (
    <div
      style={{ backgroundImage: 'url(/bg.jpg)' }}
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
    >
      <div className="w-[300px] md:w-[600px] h-[400px] flex flex-col md:flex-row relative">
        <section className="left md:w-[50%] h-full md:rounded-l-lg rounded-t-lg md:rounded-tr-none relative">
          <div className="flex items-center p-2">
            <img
              src={game?.player1._id==userdata?._id?game?.player1.avatar:game?.player2.avatar}
              className="h-10 w-10 rounded-full object-cover"
            />
            <Rating
              name="read-only"
              value={Number(game?.player1._id==userdata?._id?game?.player1score:game?.player2score)}
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
            {/* <p>{game?.player1._id==userdata?._id?game?.player1score:game?.player2score}</p> */}
          </div>
          {/* move */}
          <motion.img
            initial={
              isWideScreen
                ? { right: "100px", top: "0%", opacity: 0 }
                : { right: "-10px", top: "0%", opacity: 0 }
            }
            animate={
              (ismoveselected && mode=='computer') || ( mode != 'computer' && opponentmove && mymove)
                ? isWideScreen
                  ? { right: "50px", top: "10%", opacity: 1 }
                  : { right: "40px", top: "0%", opacity: 1 }
                : {}
            }
            transition={{
              duration: 0.5,
            }}
            src={`/${mymove ? mymove : "rock"}.png`}
            className="lmove h-[250px] absolute top-[0%] right-[40px] md:top-[10%] md:right-[50px] md:h-[300px]"
          />
        </section>

        {/* computer */}

        {mode == "computer" ? (
          <section className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none relative">
            <div className="flex items-center p-2 md:justify-end">
              <img
                src={"/bot.jfif"}
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
              initial={
                isWideScreen
                  ? { left: "100px", top: "0%", opacity: 0 }
                  : { left: "-10px", top: "0%", opacity: 0 }
              }
              animate={
                ismoveselected 
                  ? isWideScreen
                    ? { left: "50px", top: "10%", opacity: 1 }
                    : { left: "40px", top: "0%", opacity: 1 }
                  : {}
              }
              transition={{
                duration: 0.5,
              }}
              src={`/${computermove ? computermove : "rock"}.png`}
              className="rmove h-[250px] absolute top-[0%] left-[40px] md:top-[10%] md:left-[50px] md:h-[300px]"
            />
          </section>
        ) : (
          //  player2
          <>
            {game?.player2 ? (
              <section className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none relative">
                <div className="flex items-center p-2 md:justify-end">
                  <img
                    src={game?.player1._id!=userdata?._id?game?.player1.avatar:game?.player2.avatar}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <Rating
                    name="read-only"
                    value={Number(game?.player1._id!=userdata?._id ? game?.player1score : game?.player2score)}
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
                  {/* <p>{game?.player1._id!=userdata?._id ? game?.player1score : game?.player2score}</p> */}
                </div>
                {/* move */}
                <motion.img
                  initial={
                    isWideScreen
                      ? { left: "100px", top: "0%", opacity: 0 }
                      : { left: "-10px", top: "0%", opacity: 0 }
                  }
                  animate={
                    mymove && opponentmove
                      ? isWideScreen
                        ? { left: "50px", top: "10%", opacity: 1 }
                        : { left: "40px", top: "0%", opacity: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  src={`/${opponentmove ? opponentmove : "rock"}.png`}
                  className="rmove h-[250px] absolute top-[0%] left-[40px] md:top-[10%] md:left-[50px] md:h-[300px]"
                />
              </section>
            ) : (
              <div className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none text-white flex flex-col items-center justify-center gap-2 p-2 text-center">
                <b>share details with your friend to join</b>
                <p className="text-black">
                  <b className="text-white">RoomName : </b>
                  {roomname}
                </p>
                <p className="text-black">
                  <b className="text-white">GameId : </b>
                  {game?._id}
                </p>
              </div>
            )}
          </>
        )}

        {/* move selector */}
        {mode == "computer" ? (
          <Move
            winner={winner}
            ismoveselected={ismoveselected}
            handleMoveSelection={handleMoveSelection}
            mymove={mymove}
          />
        ) : (
          <>
            {game?.player2 ? (
              <>
                {!waiting?<Move
                  winner={winner}
                  ismoveselected={ismoveselected}
                  handleMoveSelection={handleMoveSelection}
                  mymove={mymove}
                />: <p className="absolute bottom-[40%] right-2 md:bottom-2 md:right-[40%] text-sm">waiting for opponent move</p>}
              </>
            ):"player2 not avilable"}
          </>
        )}
      </div>
    </div>
  );
};

export default Game;