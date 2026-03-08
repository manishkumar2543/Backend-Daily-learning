import React, { useEffect } from 'react'
import axios from 'axios'
const Register = () => {
   function handlerRegister(){
        axios.get('http://localhost:3000/api/auth/register')
       .then((res)=>{
        console.log(res.data)
     })
   }
   
   useEffect(()=>{
    handlerRegister()
   },[])

  return (
    <div>Register</div>
  )
}

export default Register