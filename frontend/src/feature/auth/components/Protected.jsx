import React from 'react'
import { useauth } from '../hooks/useAuth'
import { useNavigate,Navigate } from 'react-router';

const Protected =  ( {children}) => {

    const {loading,user} =useauth();
    const navigate = useNavigate()

    if(loading){
        return(<main><h1>load ho rha hai...</h1></main>)
    }

      
    if (!user) {
        return <Navigate to="/login" replace />;
    }


  return children
}

export default Protected