import UserCard from "./UserCard"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { getTop5Users } from "../features/auth/authSlice"

function UserList({color,users}){
    const dispatch=useDispatch()
    const {top5,top5ForTransMe }=useSelector(state=>state.auth)
    useEffect(()=>{
        // dispatch(getTop5Users())
        // console.log(users)
    },[])
    return(<>
        <div className="">
            {users&&users.map((user,index)=>{
               return(
                <div className='  '>
               <UserCard  user={user} key={index} index={index} color={color}/>
               </div>
               )
            })}
        </div>
    </>)
}
export default UserList