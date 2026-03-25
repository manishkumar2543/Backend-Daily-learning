import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";



const router=createBrowserRouter([
    {
        path:'/',
        element:<h1>Home</h1>
    },
    {
        path:'/login',
        element:<Login/>

    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/feed',
        element:<Feed/>
    }

])

export default router