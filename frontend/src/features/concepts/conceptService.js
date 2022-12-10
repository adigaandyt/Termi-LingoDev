import axios from 'axios'

const API_URL='/api/concepts'

//get single concept by  search text
const getConcept =async (textSearch)=>{
    const response=await axios.post(API_URL+'/get/concept',textSearch)
    return response.data
}

//get all concepts names 
const getConceptsNames =async ()=>{
    const response=await axios.get(API_URL+'/get/names') 
    
    return response.data
}



const conceptService={
    getConcept,
    getConceptsNames
    
}

export default conceptService