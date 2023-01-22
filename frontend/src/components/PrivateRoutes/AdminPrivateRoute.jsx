import { Navigate,Outlet } from "react-router-dom"
import {useAdminStatus} from '../../hooks/useAdminStatus'
import ErrorPage404 from "../../pages/ErrorPage404"
import Spinner from "../Spinner"


const AdminPrivateRoute=()=>{
    const {IsAdmin,checkingStatus}=useAdminStatus()
    if(checkingStatus){
        return <Spinner/>
    }
    return IsAdmin ? <Outlet/> : <ErrorPage404/> 
}
export default AdminPrivateRoute