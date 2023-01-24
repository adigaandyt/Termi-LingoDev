import axios from 'axios'

const API_URL='/api/loging'
///set/searchlanguagechange
//get single concept by  search text
const sendLanguageChange =async (token, data)=>{
    const config ={
    headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL+`/set/applanguagechange`,data,config)
    return response.data
}

const loggingService={
    sendLanguageChange
}

export default loggingService