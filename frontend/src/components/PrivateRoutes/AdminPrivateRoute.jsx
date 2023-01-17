import { Navigate,Outlet } from "react-router-dom"
import {useAdminStatus} from '../../hooks/useAdminStatus'

import Spinner from "../Spinner"


const AdminPrivateRoute=()=>{
    const {IsAdmin,checkingStatus}=useAdminStatus()
    console.log(IsAdmin)
    if(checkingStatus){
        return <Spinner/>
    }
    return IsAdmin ? <Outlet/> : <Navigate to='/' /> 
}
export default AdminPrivateRoute