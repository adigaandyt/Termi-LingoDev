import axios from 'axios'


const API_URL='/api/users'

//register user
const register =async (Data)=>{
    const response=await axios.post(API_URL+`/register/${Data.categoryId}`,Data.formData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login =async (userData)=>{
    const response=await axios.post(API_URL+'/login',userData)
    
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout=()=>localStorage.removeItem('user')

//reset password
const resetPassword =async (formData,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/reset/password',formData ,config)
    
    return response.data
}
const authService={
    register,
    logout,
    login,resetPassword
    
}

export default authService