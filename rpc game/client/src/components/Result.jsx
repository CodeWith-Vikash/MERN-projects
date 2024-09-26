import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const Result = () => {
  return (
    <div
      style={{ backgroundImage: "url(/bg4.jpg)" }}
      className="h-screen w-full bg-cover bg-center flex justify-center items-center text-white"
    >
      <div className="card w-[300px] md:w-[500px] h-[300px] rounded-lg flex justify-center items-center relative">
        {/* winner card */}
        <section className='w-[180px] h-[200px] win rounded-lg border-2 border-white flex flex-col items-center justify-center gap-2 relative'>
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
            >
              New game
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
          <img src="/winner.png" className='absolute top-[-40px] w-[200px]'/>
            </section>

        {/* looser card */}

        {/* <section className="w-[180px] h-[200px] loose rounded-lg border-2 border-white flex flex-col items-center justify-center gap-2 relative">
          <Rating
            name="read-only"
            value={2}
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
            className="pb-2 pt-10"
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
          >
            New game
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
        </section> */}

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
