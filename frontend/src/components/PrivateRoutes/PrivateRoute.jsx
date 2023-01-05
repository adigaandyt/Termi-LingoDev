import { Navigate,Outlet } from "react-router-dom"
import { useAuthStatus } from "../../hooks/userAuthStatus"
import Spinner from '../Spinner'


const PrivateRoute=()=>{
    const {loggedIn,checkingStatus}=useAuthStatus() 
    console.log("privateRoute")
    if(checkingStatus){
        return <Spinner/>
    }
    return loggedIn ? <Outlet/> : <Navigate to='/login' /> 
}
export default PrivateRoute