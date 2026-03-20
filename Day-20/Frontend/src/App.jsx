import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import './style.scss'
const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default App