import axios from 'axios'

const API_URL='/api/categories'




//get all categories 
const getCategories =async ()=>{
    const response=await axios.get(API_URL+'/get/all') 
    
    return response.data
}
//create new Category by user  
const createNewCategoryByUser =async (data,token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+'/create/category',data,config) 
    
    return response.data
}





const categoryService={
    getCategories,
    createNewCategoryByUser
    
}

export default categoryService