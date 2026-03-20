import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
      const [username, setUsername] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

     async function SubmitHandler(e){
        e.preventDefault()
      axios.post('http://localhost:3000/api/auth/register',{

        username,
        email,
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
     <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={SubmitHandler} >
            <input onChange={(e)=>{setUsername (e.target.value)}}
            type="text" name='username' placeholder='Enter username...' />
            <input onClick={(e)=>{setEmail (e.target.value)}}
            type="email" name='email' placeholder='Enter email...' />
            <input onChange={(e)=> {setPassword (e.target.value)}}
            type="password" name='password' placeholder='Enter password...' />
            <button>Register</button>
        </form>
        <p>Allreday have account <Link className='toggleAuthForm' to='/login'>Login</Link></p>
    </div>
   </main>
  )
}

export default Register