import React, { useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { MainContext } from "../context/MainContext";
import { Fireworks } from "@fireworks-js/react";

const Result = () => {
  const { userdata, game, createGame, creatingcomputer } = useContext(MainContext);
  const navigate = useNavigate();
  const fireworksRef = useRef(null); // Reference for the Fireworks component

  // Start fireworks when the winner is the current user
  useEffect(() => {
    if (game?.winner === "player1" && fireworksRef.current) {
      fireworksRef.current.start(); // Start fireworks if the user won
    }
  }, [game, userdata]);

  return (
    <div
      style={{ backgroundImage: "url(/bg4.jpg)" }}
      className="h-screen w-full bg-cover bg-center flex justify-center items-center text-white"
    >
      <div className="card w-[300px] md:w-[500px] h-[300px] rounded-lg flex justify-center items-center relative">
        {/* Winner card */}
        {(game?.mode === 'computer' && game?.winner === "player1") ||
        (game?.mode !== 'computer' && game?.winner === 'player1' && userdata?._id === game?.player1?._id) ||
        (game?.mode !== 'computer' && game?.winner === 'player2' && userdata?._id === game?.player2?._id) ? (
          <section className="w-[180px] h-[200px] win rounded-lg border-2 border-white flex flex-col items-center justify-center gap-2 relative">
            <h3>You Won</h3>
            <motion.button
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="btn text-sm h-fit border-2 border-white rounded-lg py-1 px-2 flex items-center gap-1"
              onClick={() => {
                if (userdata) {
                  createGame(game.mode);
                } else {
                  navigate("/login");
                }
              }}
            >
              {creatingcomputer ? "starting..." : "Restart"}
            </motion.button>

            <Link to={`/`}>
              <motion.button
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2"
              >
                Main menu
              </motion.button>
            </Link>

            <img src="/winner.png" className="absolute top-[-40px] w-[200px]" />

            {/* Fireworks */}
            <Fireworks
              ref={fireworksRef}
              options={{
                speed: 3,
                acceleration: 1.05,
                particles: 150,
                opacity: 0.5,
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1, // Ensure fireworks is below other UI elements
                pointerEvents: "none", // Allow clicking through the fireworks
              }}
            />
          </section>
        ) : (
          <section className="w-[180px] h-[200px] loose rounded-lg border-2 border-white flex flex-col items-center justify-center gap-2 relative">
            <Rating
              name="read-only"
              value={
                game?.mode === 'computer'
                  ? game?.player1score
                  : game?.winner === 'player1'
                  ? game?.player2score // If player1 won, show player2's score
                  : game?.player1score // If player2 won, show player1's score
              }
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
              className="pb-4 pt-8 scale-[1.3]"
            />
            <motion.button
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="btn text-sm h-fit border-2 border-white rounded-lg py-1 px-2 flex items-center gap-1"
              onClick={() => {
                if (userdata) {
                  createGame(game.mode);
                } else {
                  navigate("/login");
                }
              }}
            >
              {creatingcomputer ? "starting..." : "Restart"}
            </motion.button>

            <Link to={`/`}>
              <motion.button
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="btn text-sm h-fit w-fit border-2 border-white rounded-lg py-1 px-2"
              >
                Main menu
              </motion.button>
            </Link>
            <img src="/over.png" className="absolute top-[-50px] w-[200px]" />
          </section>
        )}

        <img
          src="/rock.png"
          className="absolute hidden md:block h-[300px] bottom-0 right-2"
        />
        <img
          src="/paper.png"
          className="absolute hidden md:block h-[300px] bottom-0 left-2"
        />
      </div>
    </div>
  );
};

export default Result;
