import axios from 'axios'


const API_URL='/api/concepts'

//get data for the concepts addded rechart
const getDataForConceptsAddedRechart =async (token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    console.log("dsssssssssssssssssssssssssssss")
    const response=await axios.get(API_URL+'/get/users/addedConcept/rating',config)
    
    return response.data
}

const conceptProfileService={
    getDataForConceptsAddedRechart
    
}
export default conceptProfileService