import React, { useState } from 'react'
import { Link } from 'react-router' //  Correct
import { useauth } from '../hooks/useAuth'
import { useNavigate } from 'react-router';
const Register = () => {
  const navigate = useNavigate()
  
 const {registerhandler,loading} = useauth()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [username, setusername] = useState('')



  const submithandler = async (e) =>{
    e.preventDefault()
    
    await registerhandler({email,password,username})
     navigate('/login')
    setemail('')
    setpassword('')
    setusername('')

  }

  if(loading){
    return (<main><h1>load ho rha hai</h1></main>)
  }

  return (
    <div className='w-full h-screen'>
<div className='flex full items-center h-full  justify-center bg-[#111]'>
<form onSubmit={submithandler}>
<div className='flex gap-3 flex-col border border-2 rounded-xl px-7 py-6 bg-[#d5d5d5]   '>
    <label>Username:</label>
<input value={username} onChange={(e)=>setusername(e.target.value)}
placeholder='Enter your Username'
className='bg-gray-400 py-2 px-4 w-full rounded-xl'
type='text' />


  <label>Email:</label>
<input value={email} onChange={(e)=>setemail(e.target.value)}
placeholder='Enter your Email'
className='bg-gray-400 py-2 px-4 w-full rounded-xl'
type='email' />


<label>Pasword:</label>
<input value={password} onChange={(e)=>setpassword(e.target.value)}
placeholder='Enter your Password'
className='bg-gray-400 py-2 px-4 w-full rounded-xl'
type='password' />
</div>
<div className='flex justify-center'>
<button
className='bg-pink-600 px-8 py-2 rounded-xl mt-4'
>Register</button>

</div>
<div className='flex justify-center py-3'>
<p className='text-gray-300'>Login in <Link className='text-red-900'  to='/Login'>here</Link> </p>
</div>
</form>

</div>
    </div>
  )
}

export default Register