import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../features/auth/authSlice'
function Header(){
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onLogin=()=>{
        navigate('/login')
    }
    const onRegister=()=>{
        navigate('/register')

    }
    const onLogout=(e)=>{
        e.preventDefault()
        dispatch(logout())

    }

    return (
        <>
        
        <ul className='nav justify-content-end bg-dark  ' style={{"height":"70px"}}>
            {!user?<>
            <li className="nav-item px-2 py-3">
                <button onClick={onLogin} type='submit' className='btn btn-light '>Login</button>
            </li>
            <li className="nav-item px-2 py-3">
                <button onClick={onRegister}  type='submit' className='btn btn-light '>Rgister</button>
            </li>
           </>:<>
           <li className="nav-item px-2 py-3">
                <button onClick={onLogout}  type='submit' className='btn btn-dark '>Logout</button>
            </li>
           </>
           
            }
        </ul>
        
        </>
    )
}

export default Header