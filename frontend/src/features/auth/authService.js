import axios from 'axios'


const API_URL='/api/users'

export const  me=async (token)=>{
    console.log(token)
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    try {
        const response= await axios.get(API_URL+'/me',config)
        // console.log(response.data)
        if(response.data){
            localStorage.setItem('token',JSON.stringify(response.data.token))
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        console.log(error)
    }
 

    
    // console.log(response)
    // console.log(response.data)
    // return response.data
}

//upload image to s3
const uploadImage =async (formdata)=>{
    console.log(formdata)
    const response=await axios.post(API_URL+'/upload/image',formdata)
    if(response.data){
        localStorage.setItem('image',JSON.stringify(response.data))
    }
    return response.data
}
//upload image to s3 and store it URL in hte database
const updateUserImage =async (formdata,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/update/image',formdata,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//register user
const register =async (Data)=>{
    const response=await axios.post(API_URL+`/register/${Data.categoryId}`,Data.formData)
    if(response.data){
        localStorage.setItem('token',JSON.stringify(response.data.token))
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login =async (userData)=>{
    const response=await axios.post(API_URL+'/login',userData)
    
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
        localStorage.setItem('token',JSON.stringify(response.data.token))
    }
    return response.data
}

//Logout user
const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
}

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
//update user
const updateUser =async (formData,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/update/user',formData ,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//verify user
const verifyUser =async (data,token)=>{

    const response=await axios.post(API_URL+'/verify',data)

    return response.data
}


//update the cuser coins after the game play
const setCoins =async (data,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/set/coins',data ,config)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//get the top5 users by coins count
const getTop5Users =async (data,token)=>{
  
    const response=await axios.get(API_URL+'/get/top5')

    return response.data
}
//get the top5 users by coins count
const getUsersByTextSearch =async (textSearch,token)=>{
  
    const response=await axios.get(API_URL+`/get/users/${textSearch}`)

    return response.data
}
//get the results of guesstheterm game
const getGuessTheTermResults =async (token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL+`/get/results/guesstheterm`,config)

    return response.data
}
//get the results of TransMe game
const getTransMeResults =async (token)=>{

    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL+`/get/results/transMe`,config)

    return response.data
}
//get games rechart data for the graph in profile page
const getGamesRechartData =async (token)=>{

    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL+`/get/both/games/results`,config)

    return response.data
}
const authService={
    me,
    register,
    logout,
    login,
    resetPassword,
    uploadImage,
    updateUser,
    updateUserImage,
    verifyUser,
    setCoins,
    getTop5Users,
    getUsersByTextSearch,
    getGuessTheTermResults,
    getTransMeResults,
    getGamesRechartData
    
}

export default authService