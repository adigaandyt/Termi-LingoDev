import axios from 'axios'

const API_URL='/api/categories'




//get all categories 
const getCategories =async ()=>{
    const response=await axios.get(API_URL+'/get/all') 
    
    return response.data
}





const categoryService={
    getCategories,
    
}

export default categoryService