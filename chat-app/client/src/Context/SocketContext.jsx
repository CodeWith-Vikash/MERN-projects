import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import {UserContext} from './AuthContext'



export const SocketContext=createContext()

export const SocketContextProvider=({children})=>{
    const [socket, setsocket] = useState(null)
    const {baseurl}= useContext(UserContext)

    useEffect(()=>{
        const socketInstance=io(baseurl)
        setsocket(socketInstance)

        socketInstance.on('connect',()=>{
            console.log('user connected to socket')
        })
       
    
    },[])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}