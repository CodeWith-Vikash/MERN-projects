import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { io } from 'socket.io-client';

export const MainContext = createContext(null);

export const ContextProvider = ({ children, navigate }) => {
  // const baseurl = 'http://localhost:3000';
  const baseurl = 'https://rpc-server-production.up.railway.app';
  const [token, settoken] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [game, setgame] = useState(null);
  const [winner, setwinner] = useState(null);
  const [creatingcomputer, setcreatingcomputer] = useState(false);
  const [creatingfriend, setcreatingfriend] = useState(false);
  const [socket, setsocket] = useState(null);
  const [roomname, setroomname] = useState(null);
  const [opponentmove, setopponentmove] = useState(null);
  const [waiting, setwaiting] = useState(false);

  const getToken = () => {
    const jsontoken = Cookies.get('token');
    settoken(jsontoken || null);
  };

  const getUserdata = () => {
    const data = Cookies.get('userdata');
    setuserdata(data ? JSON.parse(data) : null);
  };

  const findgame = () => {
    axios.get(`${baseurl}/api/game/${userdata._id}`)
      .then((result) => {
        setgame(result.data.game);
        if (result.data.game.winner) {
          setwinner(result.data.game.winner);
        }
      })
      .catch((err) => {
        toast.error(err.response ? err.response.data.message : 'Something went wrong');
      });
  };

  const createGame = (mode) => {
    if (mode === 'computer') {
      setcreatingcomputer(true);
    } else {
      setcreatingfriend(true);
    }

    axios.post(`${baseurl}/api/game/create/${mode}`, { userId: userdata._id })
      .then((result) => {
        setgame(result.data.game);
        if (mode !== 'computer') {
          socket.emit('createRoom', userdata);
        }
        setwinner(null);
        navigate(`/game/${result.data.game.mode}`);
      })
      .catch((err) => {
        toast.error(err.response ? err.response.data.message : 'Something went wrong');
      })
      .finally(() => {
        mode === 'computer' ? setcreatingcomputer(false) : setcreatingfriend(false);
      });
  };

  const getroom = () => {
    if(userdata){
      const data = Cookies.get('roomname');
    if (data) {
      if (socket) {
        setroomname(data);
        socket.emit('joinRoom', {username:userdata.username,roomname:data});
      } else {
        toast.error('socket not available to join room');
      }
    } else {
      toast.error('roomname not available in cookies');
    }
    }else{
      toast.error('userdata not available');
    }
  };

  useEffect(() => {
    getroom();
  }, [socket,userdata]);

  useEffect(() => {
    getToken();
    getUserdata();
  }, []);

  // Socket connection
  useEffect(() => {
    const newSocket = io(baseurl);
    setsocket(newSocket);

    // Event listener for new connection
    newSocket.on('connect', () => {
      console.log('user connected', newSocket.id);
    });

    newSocket.on('roomCreated', (data) => {
      console.log('room created', data);
      setroomname(data.roomname);
      Cookies.set('roomname', data.roomname);
    });

    newSocket.on('joinedRoom', (data) => {
      console.log('joined room', data);
      Cookies.set('roomname', data.roomname);
      setroomname(data.roomname);
    });

    newSocket.on('roomFull', (data) => {
      toast.error(data.message); // Show an error message if the room is full
    });
    
    newSocket.on('opponentJoined', (data) => {
      console.log('opponent joined', data);
      setgame(data);
      setwaiting(false);
    });

    newSocket.on('scoreUpdated',(data)=>{
      console.log('scoreupdated',data)
      setgame(data)
    })
    
    newSocket.on('winner', (data) => {
      console.log('winner ', data);
      setgame(data);
      setwinner(data.winner);
      setTimeout(() => {
        navigate('/result');
      }, 1000);
    });

    // Event listener for leaving room
    newSocket.on('leavedRoom', (data) => {
      console.log('user leaved room ', data);
    });

    // Event listener for disconnection
    newSocket.on('looseConnection', ({ message }) => {
      console.log(message);
      socket.emit('leaveRoom', roomname);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(()=>{
    if(socket){
      socket.on('opponentMove', (data) => {
        console.log('opponent move ', data);
         if(userdata){
          if(data.userId != userdata._id){
            console.log('setting opponent move')
            setopponentmove(data.move)
            setwaiting(false);
           }
         }else{
          toast.error('userdata not avilable while checking opponentmove')
        }
      });
    }else{
      toast.error('socket not avilable while checking opponentmove')
    }
  },[userdata,socket])

  useEffect(() => {
    if (userdata) {
      findgame();
    }
  }, [userdata]);

  return (
    <MainContext.Provider value={{
      baseurl, token, userdata, getToken, getUserdata, game, setgame, winner, setwinner,
      createGame, creatingcomputer, creatingfriend, socket, roomname, opponentmove, waiting, setwaiting, setopponentmove
    }}>
      {children}
    </MainContext.Provider>
  );
};
