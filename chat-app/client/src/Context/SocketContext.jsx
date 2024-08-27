import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'



export const SocketContext=createContext()

export const SocketContextProvider=({children})=>{
    const [socket, setsocket] = useState(null)

    useEffect(()=>{
        const socket=io('https://hello-chat-server.vercel.app')
        setsocket(socket)

        return ()=> socket.close()
    },[])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}