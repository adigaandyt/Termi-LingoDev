import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

export const useVerifyStatus=()=>{
    const [verified,setVerified]=useState(false)
    const [checkingStatus,setCheckingStatus]=useState(true)
    
    const {user_token}=useSelector(state=>state.auth)

    useEffect(()=>{
        console.log("hii")
        if(user_token){
            setVerified(true) 
        }
        else{
            setVerified(false)
        }
        setCheckingStatus(false)
    })
    return {verified,checkingStatus}
}