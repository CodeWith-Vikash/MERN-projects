import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'



export const SocketContext=createContext()

export const SocketContextProvider=({children})=>{
    const [socket, setsocket] = useState(null)

    useEffect(()=>{
        const socket=io('https://chat-app-server-production-c721.up.railway.app')
        setsocket(socket)

        return ()=> socket.close()
    },[])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}