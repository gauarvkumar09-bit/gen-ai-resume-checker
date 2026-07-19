import { createContext,useState } from "react";



export const Authcontext =createContext()

export const Authprovider  = ({children})=>{

    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)

  

    

    return(
        <Authcontext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </Authcontext.Provider>
    )
}