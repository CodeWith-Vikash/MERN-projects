import { createContext, useState } from 'react'


export const mainContext= createContext(null)

export const ContextProvider=({children})=>{
    const [isdark, setisdark] = useState(!false)
    const toggleTheme=()=>{
        setisdark(!isdark)
    }
    return <mainContext.Provider value={{isdark,toggleTheme}}>
        {children}
    </mainContext.Provider>
}