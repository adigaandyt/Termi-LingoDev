import UserCard from "./UserCard"
import {useSelector} from 'react-redux'
function UsersList(){
    const {usersByAdmin} =useSelector(state=>state.auth)
    return(<>
    <div className="  " style={{"alignItems":"center"}}>
    
    {/* <UserCard/> */}
    {usersByAdmin&&usersByAdmin.map((user)=>
    <>
    <div className='    '>
    <UserCard user={user}/>
    </div>
    </>
    )}
    </div>
    </>)
}
export default UsersList