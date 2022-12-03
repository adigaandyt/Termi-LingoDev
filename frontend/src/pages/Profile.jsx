import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Profile(){
    const {user}=useSelector(state=>state.auth)
    const {email,name,phoneNumber}=user
    return(<>
        <div className="container mt-5 py-5 text-center">
            <h1>Profile</h1>
            <Link to='/reset' className='btn btn-warning '>Reset Password</Link>
            <form>
                <ul className='mt-4'>
                    <li className='my-1'>
                        <input
                        placeholder={name}
                        disabled={true}
                        />
                    </li>
                    <li className='my-1'>
                        <input
                        placeholder={email}
                        disabled={false}
                        />
                    </li>
                    <li className='my-1'>
                        <input
                        className='text-secondary'
                        placeholder={phoneNumber}
                        disabled={false}
                        />
                    </li>
                </ul>
            </form>
            <ul>
               
            </ul>
        </div>
    </>)    
}
export default Profile