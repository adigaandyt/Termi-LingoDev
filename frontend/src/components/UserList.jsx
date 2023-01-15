import UserCard from "./UserCard"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { getTop5Users } from "../features/auth/authSlice"

function UserList(){
    const dispatch=useDispatch()
    const {top5}=useSelector(state=>state.auth)
    useEffect(()=>{
        // dispatch(getTop5Users())
    },[])
    return(<>
        <div className="">
            {top5&&top5.map((user,index)=>{
               return(
                <div className='  '>
               <UserCard  user={user} key={index} index={index}/>
               </div>
               )
            })}
        </div>
    </>)
}
export default UserList