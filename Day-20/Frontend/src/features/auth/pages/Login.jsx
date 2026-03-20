import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  async function SubmitHandler(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/login',{
      username,
      password
    },{
      withCredentials:true
    })
    .then(res=>{
      console.log(res.data)
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