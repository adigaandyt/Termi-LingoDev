import axios from 'axios'

const API_URL='/api/concepts'

//get concepts by  search text
const getConcepts =async (textSearch)=>{
    const response=await axios.post(API_URL,textSearch)
    
    return response.data
}

//get all concepts names 
const getConceptsNames =async ()=>{
    const response=await axios.get(API_URL+'/get/names') 
    
    return response.data
}



const conceptService={
    getConcepts,
    getConceptsNames
    
}

export default conceptService