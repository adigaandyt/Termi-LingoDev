import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react'
import {logout} from '../features/auth/authSlice'
function Header(){
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const [language,setLanguage]=useState('')
    const onLogin=()=>{
        navigate('/login')
    }
    const onRegister=()=>{
        navigate('/register')

    }
    const onLogout=(e)=>{
        e.preventDefault()
        dispatch(logout())
        navigate('/')

    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning  ">
        <Link to='/' className=" navbar-brand text-secondary mx-3"> Termi</Link>
        <button className="navbar-toggler bg-none mx-2 text-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbar-nav'>
                <li className='nav-item mx-1'>
                    <Link className="nav-link text-secondary" to='/profile' >Profile</Link>
                </li>
                <li className='nav-item mx-1'>
                    <Link className="nav-link text-secondary" to='/about' >About</Link>
                </li>

            </ul>
            <div className='flex-container   mx-3'>
            
            
                <select className='btn btn-outline-secondary' name='product' id='product' aria-labelledby="dropdownMenuButton">
                    <option value="English">English</option>
                    <option value="עברית">עברית</option>
                    <option value="العربيه">العربيه</option>
                </select>
            
            {!user?<>
                <button onClick={onLogin} type='submit' className='btn btn-outline-secondary mx-1'>Login</button>
                <button onClick={onRegister}  type='submit' className='btn btn-outline-secondary mx-1'>Rgister</button>
           </>:<>
                <button onClick={onLogout}  type='submit' className='btn btn-outline-dark mx-1'>Logout</button>
           </>
           
            }
                
            </div>
        </div>
        
        </nav>
        

        
        
        </>
    )
}

export default Header