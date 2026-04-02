import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../style/register.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const {handleRegister,loading}=useAuth()
    const navigate=useNavigate()
    async function submitHandler(e){
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate('/')

       
    }
  return (
   <main className='register-page'>
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
            <input value={username} onChange={(e)=> setUsername ( e.target.value)}
            type="text" name='username' placeholder='Enter username' />
            <input value={email} onChange={(e)=> setEmail(e.target.value)}
            type="email" name='email' placeholder='Entre email' />
            <input value={password} onChange={(e)=> setPassword(e.target.value)}
            type="password" name='password' placeholder='Enter password' />
            <button className='button'  type='submit' >Register</button>
        </form>
        <p>Alreday have account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
    </div>
   </main>
  )
}

export default Register