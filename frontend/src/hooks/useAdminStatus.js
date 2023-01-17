import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

export const useAdminStatus=()=>{
    const [IsAdmin,setIsAdmin]=useState(false)
    const [checkingStatus,setCheckingStatus]=useState(true)
    
    const {isAdmin}=useSelector(state=>state.auth.user)
    
    useEffect(()=>{
        if(isAdmin){
            setIsAdmin(true) 
        }
        else{
            setIsAdmin(false)
        }
        setCheckingStatus(false)
    })
    return {IsAdmin,checkingStatus}
}