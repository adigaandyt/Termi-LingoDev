import axios from 'axios'


const API_URL='/api/users'

export const  me= (token)=>{
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    try {
        const response= axios.get(API_URL+'/me',config).then(response=>{
            return(response.data) 
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}