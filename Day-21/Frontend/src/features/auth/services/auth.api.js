import axios from 'axios';

const api=axios.create({
    baseURL:'http://localhost:3000/api/auth',
   
});



export async function register(username,email,password){
try{
    const respone=await api.post('/register',{
        username,
        email,
        password
    },{withCredentials:true})
    return respone.data
}
 catch(err){
        throw err
    }

}

export async function login(username,password){
    try{
        const respone=await api.post('/login',{
            username,
            password
        },{withCredentials:true})
        return respone.data
    }
    catch(err){
            throw err
        }
}

export async function getMe(){
    try{
        const respone=await api.get('/get-me')
        return respone.data
    }
    catch(err){
            throw err
        }
}




