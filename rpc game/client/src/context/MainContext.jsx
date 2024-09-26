import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

export const MainContext = createContext(null);

export const ContextProvider = ({ children, navigate }) => {
  const baseurl = 'http://localhost:3000';
  const [token, settoken] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [game, setgame] = useState(null);
  const [winner, setwinner] = useState(null);
  const [creatingcomputer, setcreatingcomputer] = useState(false);
  
  const getToken = () => {
    const jsontoken = Cookies.get('token');
    if (jsontoken) {
      settoken(jsontoken);
    } else {
      settoken(null);
    }
  };

  const getUserdata = () => {
    const data = Cookies.get('userdata');
    if (data) {
      const jsondata = JSON.parse(data);
      setuserdata(jsondata);
    } else {
      setuserdata(null);
    }
  };
  
  const findgame = () => {
    axios.get(`${baseurl}/api/game/${userdata._id}`).then((result) => {
      setgame(result.data.game);
      if (result.data.game.winner) {
        setwinner(result.data.game.winner);
      }
    }).catch((err) => {
      toast.error(err.response ? err.response.data.message : 'something went wrong');
    });
  };

  const createGame = (mode) => {
    if (mode === 'computer') {
      setcreatingcomputer(true);
      axios.post(`${baseurl}/api/game/create/${mode}`, { userId: userdata._id })
      .then((result) => {
        setgame(result.data.game);
        setwinner(null);
          navigate('/game/computer'); 
        })
        .catch((err) => {
          toast.error(err.response ? err.response.data.message : 'something went wrong');
        })
        .finally(() => setcreatingcomputer(false));
    }
  };
  
  useEffect(() => {
    getToken();
    getUserdata();
  }, []);

  useEffect(() => {
    if (userdata) {
      findgame();
    }
  }, [userdata]);
  
  return (
    <MainContext.Provider value={{ baseurl, token, userdata, getToken, getUserdata, game, setgame, winner, setwinner, createGame, creatingcomputer }}>
      {children}
    </MainContext.Provider>
  );
};
