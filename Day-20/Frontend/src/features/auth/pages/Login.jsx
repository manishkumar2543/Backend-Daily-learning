import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'



const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()

  const {handleLogin,loading}=useAuth()
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  async function SubmitHandler(e) {
    e.preventDefault()

    handleLogin(username,password)
    .then(res=>{
      console.log(res)
      navigate('/')
    })

  
  }
  
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={SubmitHandler}>
            <input onChange={(e)=> {setUsername (e.target.value)}}
            type="text" name="username" placeholder='Enter username'/>
            <input onChange={(e)=> {setPassword (e.target.value)}}
            type="password" name='password' placeholder='Enter password' />
            <button>Login</button>
        </form>
        <p>Dont have an account <Link className='toggleAuthForm' to='/register'>Register</Link></p>
    </div>
    </main>
  )
}

export default Login