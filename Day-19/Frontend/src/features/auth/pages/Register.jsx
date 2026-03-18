import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   async function submitHandler(e){
       e.preventDefault()

        axios.post('http://localhost:3000/api/auth/register',{
            username,
            email,
            password
        },{
            // cookies me data save krta hai 
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
        })  
    }
  return (
   <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <input onChange={(e)=>{setUsername ( e.target.value)}} 
                type="text" name='username' placeholder='Enter username' />
                <input onChange={(e)=>{setEmail(e.target.value)}}
                type="email" name='email' placeholder='Entre email' />
                <input onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" name='password' placeholder='Enter password' />
                <button>Register</button>
            </form>
            <p>Alreday have account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
        </div>
   </main>
  )
}

export default Register