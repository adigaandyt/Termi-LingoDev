import axios from 'axios'

const API_URL='/api/concepts'

//get concepts by  search text
const getConcepts =async (textSearch)=>{
    const response=await axios.post(API_URL,textSearch)
    
    return response.data
}



const conceptService={
    getConcepts
    
}

export default conceptService