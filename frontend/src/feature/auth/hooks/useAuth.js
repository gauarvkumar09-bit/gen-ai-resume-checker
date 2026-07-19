import { Authcontext } from "../services/auth.contex";
import {login,register,logout,getme} from '../services/api.auth'
import { useContext,useEffect } from "react";
// import {getme} from './/api.auth'

export const useauth =()=>{

      

    const context = useContext(Authcontext)
    // const {login,register,logout,getme} = context
    const { user, setuser, loading, setloading } = context;

   useEffect(() => {
      
        const getandsetuser = async()=>{

            try{
            const data = await getme()
            setuser(data)
            }catch(err){}finally{
            setloading(false)
            }
        }
     getandsetuser()
     
    }, [])

    
    const loginhandler = async ({email,password})=>{
        setloading(true)

        try{
        const data = await login({email,password})
        setuser(data)
       
        }catch(err){
console.log(err)
        }finally{
    setloading(false)
        }
    
    }

    const registerhandler = async ({email,password,username})=>{
        setloading(true)

        try{
        const data = await register({email,password,username})
        setuser(data)
        }catch(err){
console.log(err)
        }finally{
 setloading(false)
        }
       
    }

    const logouthandler = async ()=>{
        setloading(true)
        try{

        const data = await logout()
        setuser(null)
        }catch(err){
console.log(err)
        }finally{
        setloading(false)
        }
    }

return {user,loading,loginhandler,logouthandler,registerhandler}

}

