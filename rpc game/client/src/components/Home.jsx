import React from "react";
import bg from "/bg3.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
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

        <section className="flex flex-col items-center justify-end gap-2 h-full w-[50%] relative">
          {/* Rock Image Animation */}
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

          {/* Paper Image Animation */}
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
          />

          <Link to="/game/computer">
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
              Play With Computer
            </motion.button>
          </Link>
          <Link to="/game/friend">
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
              Play With Friend
            </motion.button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
