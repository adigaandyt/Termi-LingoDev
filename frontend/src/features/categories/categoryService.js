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

//get unaccepted categories 
const getUnAcceptedCategories=async (data,token)=>{

    const response=await axios.get(API_URL+'/get/categories/not/accepted') 
    
    return response.data
}
//update unaccepted category by admin 
const updateCategoryByAdmin=async (data,token)=>{

    const response=await axios.post(API_URL+'/update/category/by/admin',data) 
    
    return response.data
}
//delete unaccepted category by admin 
const deleteCategoryByAdmin=async (data,token)=>{
    const response=await axios.delete(API_URL+`/delete/category/by/admin/${data}`) 
    
    return response.data
}
//accept unaccepted category by admin 
const acceptCategoryByAdmin=async (data,token)=>{

    const response=await axios.post(API_URL+'/accept/category/by/admin',{categoryId:data}) 
    
    return response.data
}



const categoryService={
    getCategories,
    createNewCategoryByUser,
    getUnAcceptedCategories,
    updateCategoryByAdmin,
    deleteCategoryByAdmin,
    acceptCategoryByAdmin
    
}

export default categoryService