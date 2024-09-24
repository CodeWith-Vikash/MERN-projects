import React from "react";
import { Rating, Typography } from "@mui/material";

const Game = () => {
  return (
    <div
      style={{ backgroundImage: `url(/bg.jpg)` }}
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
    >
      <div className="w-[300px] md:w-[600px] h-[400px] flex flex-col md:flex-row">
        <section className="left md:w-[50%] h-full md:rounded-l-lg rounded-t-lg md:rounded-tr-none relative">
          <div className="flex items-center p-2">
            <img src="https://random-person-generator.com/storage/images/profile_photos/v1/256x256/cc19b483-1b66-47a7-bf45-1c83ad80235f.jpg" className="h-10 w-10 rounded-full object-cover"/>
            <Rating
              name="read-only"
              value={2}
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
          <img src="/rock.png" className=" lmove h-[250px] absolute top-[0%] right-0"/>
        </section>
        <section className="right md:w-[50%] h-full md:rounded-r-lg rounded-b-lg md:rounded-b-none">
        <div className="flex items-center p-2 md:justify-end">
            <img src="https://tse3.mm.bing.net/th?id=OIP.YDyoIafIwW1tILED3HgZRQHaHa&pid=Api&P=0&h=220" className="h-10 w-10 rounded-full object-cover"/>
            <Rating
              name="read-only"
              value={2}
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
        </section>
      </div>
    </div>
  );
};

export default Game;
