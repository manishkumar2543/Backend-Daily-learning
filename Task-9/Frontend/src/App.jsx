import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './features/app.routes'
import '../src/features/shared/global.scss'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
   <AuthProvider>
     <RouterProvider router={router}/> 
   </AuthProvider>
  )
}

export default App