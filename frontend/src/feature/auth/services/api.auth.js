import axios from 'axios';



const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export async function register ({email,password,username}){
    try{
        const response = await  api.post('/api/user/register',{
            username,email,password
        })
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function login ({email,password}){
    try{
        const response = await  api.post('/api/user/login',{
            email,password
        })
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function logout (){
    try{
        const response = await  api.post('/api/user/logout')
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function getme (){
    try{
        const response = await  api.post('/api/user/getme')
        return response.data
    }catch(err){
        console.log(err)
    }
}