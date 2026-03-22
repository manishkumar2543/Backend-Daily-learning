import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";


export const AuthContext= createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    

    const handleLogin=async(username,password)=>{

        setLoading(true)
        try{
            const response=await login(username,password)
            setUser(response.user)
        }
        catch(err){
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleRegister=async(username,email,password)=>{
        // jab tk api nhi aya tk (true) hoga 
        setLoading(true)
        try{
            const response=await register(username,email,password)
            setUser(response.user)
        }
        catch(err){
            throw err
        }
        finally{
            // jab api aa jayega to (false)
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{user,loading,handleRegister,handleLogin}}>
            {children}
        </AuthContext.Provider> 
    )

}