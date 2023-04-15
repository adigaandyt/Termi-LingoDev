import axios from 'axios'

const API_URL='/api/favorites'

//get single fav by  search text
const getFav =async (data)=>{
    const response=await axios.post(API_URL+`/get/${data.categoryId}`,data)
    return response.data
}


//get all favorites 
const getFavorites =async ()=>{
    const response=await axios.get(API_URL+'/remove')
    return response.data
}

//create new fav by user
const createNewFavByUser =async (data,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+"/add",data,config)
    return response.data
}


const favService={
    getFav,
    getFavorites,
    createNewFavByUser
}

export default favService