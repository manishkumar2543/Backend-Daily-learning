import { useContext } from "react";
import { register,login,getMe,logout } from "../services/auth.api";
import { AuthContext } from "../auth.context";




export const useAuth=()=>{
    const context=useContext(AuthContext);

    const{user,setUser,loading,setLoading}=context;

    const handlerRegister=async({username,email,password})=>{
        try{
            setLoading(true);
            const data=await register({username,email,password});
            setUser(data.user);
        }finally{
            setLoading(false);
        }
    }

    const handlerLogin=async({email,password,username})=>{
        try{
            setLoading(true);
            const data=await login({email,password,username});
            setUser(data.user);
        }finally{
            setLoading(false);
        }
    }
    const handlerGetMe=async()=>{
        try{
            setLoading(true);
            const data=await getMe();
            setUser(data.user);
        }catch(error){
            setUser(null);
        }finally{
            setLoading(false);
        }
    }
    const handlerLogout=async()=>{
        try{
            setLoading(true);
            await logout();
        }finally{
            setUser(null);
            setLoading(false);
        }
    }

    return(
        {handlerRegister,handlerLogin,handlerGetMe,handlerLogout,user,loading}
    )
}   
