import { Navigate,Outlet } from "react-router-dom"
// import { useAuthStatus } from "../../hooks/userAuthStatus"
import { useVerifyStatus } from "../../hooks/useVerifyStatus"

import Spinner from "../Spinner"


const VerifyPrivateRoute=()=>{
    const {verified,checkingStatus}=useVerifyStatus()
    console.log(checkingStatus)
    if(checkingStatus){
        return <Spinner/>
    }
    return verified ? <Outlet/> : <Navigate to='/validation' /> 
}
export default VerifyPrivateRoute