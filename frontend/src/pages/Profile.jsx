import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Profile(){
    const {user}=useSelector(state=>state.auth)
    const {email,name,phoneNumber}=user
    return(<>
        <div className="container mt-5 py-5 text-center">
            <h1>Profile</h1>
            <Link to='/reset' className='btn btn-warning '>Reset Password</Link>
            <ul>
                <li>{email}</li>
                <li>{name}</li>
                <li>{phoneNumber}</li>
            </ul>
        </div>
    </>)    
}
export default Profile