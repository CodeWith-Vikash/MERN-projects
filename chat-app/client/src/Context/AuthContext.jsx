import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase/firebase'

export const UserContext=createContext(null)

export const UserProvider=({children})=>{
    const [currentUser, setcurrentUser] = useState()

    useEffect(()=>{
        const unsub= onAuthStateChanged(auth,(user)=>{
            setcurrentUser(user)
            console.log('currentuser',user)
        })

        return ()=>{
            unsub();
        }
    },[])



    return <UserContext.Provider value={{currentUser}}>
             {children}
    </UserContext.Provider>
}