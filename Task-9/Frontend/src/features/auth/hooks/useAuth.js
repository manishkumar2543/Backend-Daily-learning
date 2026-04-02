import { useContext } from "react";
import { register,login,GetMe,logout } from "../services/auth.api";
import { AuthContext } from "../auth.context";


export const useAuth=()=>{
    const context=useContext(AuthContext);
    const {user,setUser,loading,setLoading}=context


    const handleRegister=async(username,email,password)=>{
        setLoading(true)
        const data=await register(username,email,password);
        setUser(data.user)
        setLoading(false)
    }
    const handleLogin=async(username,email,password)=>{
        setLoading(true)
        const data=await login(username,email,password);
        setUser(data.user)
        setLoading(false)
    }

    const handleGetMe=async()=>{
        setLoading(true)
        const data=await GetMe();
        setUser(null)
        setLoading(false)
    }


    const handleLogout=async()=>{
        setLoading(true)
        const data=await logout();
        setUser(data.user)
        setLoading(false)
    }

    return(
        {
            user,loading,handleLogin,handleRegister,handleGetMe,handleLogout
        }
    )
    

}