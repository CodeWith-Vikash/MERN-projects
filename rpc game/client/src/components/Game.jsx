import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const Game = () => {
    const { mode } = useParams();
    const [mymove, setmymove] = useState(null);
    const [computermove, setcomputermove] = useState(null);
    const [myscore, setmyscore] = useState(0);
    const [computerscore, setcomputerscore] = useState(0);
    const moves = ['rock', 'paper', 'scissor'];

    // Function to generate a random move for the computer
    const generateComputerMove = () => {
        const randomIndex = Math.floor(Math.random() * 3);
        return moves[randomIndex];
    };

    // Function to determine the winner and update the score
    const determineWinner = (mymove, computermove) => {
        if (mymove === computermove) {
            // It's a draw
            return 'draw';
        } else if (
            (mymove === 'rock' && computermove === 'scissor') ||
            (mymove === 'scissor' && computermove === 'paper') ||
            (mymove === 'paper' && computermove === 'rock')
        ) {
            // Player wins
            setmyscore(myscore + 1);
            return 'win';
        } else {
            // Computer wins
            setcomputerscore(computerscore + 1);
            return 'lose';
        }
    };

    // This useEffect triggers the game logic whenever the player makes a move
    useEffect(() => {
        if (mymove) {
            const computerMove = generateComputerMove();
            setcomputermove(computerMove);
            determineWinner(mymove, computerMove);
        }
    }, [mymove]);

    return (
        <div
            style={{ backgroundImage: `url(/bg.jpg)` }}
            className="h-screen w-full bg-cover bg-center flex justify-center items-center"
        >
            <div className="w-[300px] md:w-[600px] h-[400px] flex flex-col md:flex-row relative">
                <section className="left md:w-[50%] h-full md:rounded-l-lg rounded-t-lg md:rounded-tr-none relative">
                    <div className="flex items-center p-2">
                        <img
                            src="https://random-person-generator.com/storage/images/profile_photos/v1/256x256/cc19b483-1b66-47a7-bf45-1c83ad80235f.jpg"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <Rating
                            name="read-only"
                            value={myscore}
                            max={3}
                            readOnly
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: 'gold',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'lightgray',
                                },
                            }}
                        />
                    </div>
                    {/* move */}
                    <img
                        src={`/${mymove?mymove:'rock'}.png`}
                        className="lmove h-[250px] absolute top-[0%] right-[40px] md:top-[10%] md:left-[50px] md:h-[300px]"
                    />
                </section>

                <section className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none relative">
                    <div className="flex items-center p-2 md:justify-end">
                        <img
                            src="https://tse3.mm.bing.net/th?id=OIP.YDyoIafIwW1tILED3HgZRQHaHa&pid=Api&P=0&h=220"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <Rating
                            name="read-only"
                            value={computerscore}
                            max={3}
                            readOnly
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: 'gold',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'lightgray',
                                },
                            }}
                        />
                    </div>
                    {/* move */}
                    <img
                        src={`/${computermove?computermove:'rock'}.png`}
                        className="rmove h-[250px] absolute top-[0%] left-[40px] md:top-[10%] md:left-[50px] md:h-[300px]"
                    />
                </section>

                <section className="flex gap-2 md:justify-center absolute bottom-[38%] right-2 md:bottom-2 md:right-[40%]">
                    <FaHandRock
                        size={"2.5rem"}
                        className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'rock' ? 'border-green-500' : ''}`}
                        onClick={() => setmymove('rock')}
                    />
                    <FaHandPaper
                        size={"2.5rem"}
                        className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'paper' ? 'border-green-500' : ''}`}
                        onClick={() => setmymove('paper')}
                    />
                    <FaHandScissors
                        size={"2.5rem"}
                        className={`bg-blue-200 rounded-lg p-2 border-2 text-orange-800 cursor-pointer ${mymove === 'scissor' ? 'border-green-500' : ''}`}
                        onClick={() => setmymove('scissor')}
                    />
                </section>
            </div>
        </div>
    );
};

export default Game;
