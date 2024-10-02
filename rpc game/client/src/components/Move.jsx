import React from 'react'
import {motion} from 'framer-motion'
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const Move = ({winner,ismoveselected,handleMoveSelection,mymove}) => {
  return (
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
  )
}

export default Move