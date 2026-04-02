import React from 'react'
import { Link, useNavigate } from 'react-router'
import '../style/login.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
const Login = () => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {handleLogin,loading}=useAuth()
    const navigate=useNavigate()

    async function submitHandler(e){
        e.preventDefault()

        await handleLogin({email,password})
        navigate('/')


    }


  return (
    <main className='login-page'>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}
                type="email" name='email' placeholder='Entre email' />
                <input value={password} onChange={(e)=> setPassword(e.target.value)}
                type="password" name='password' placeholder='Enter password' />
                <button className='button' type='submit'>Login</button>
            </form>
            <p>Dont have an Accoutn <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </div>
    </main>
  )
}

export default Login