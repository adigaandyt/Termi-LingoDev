import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'
import {logout} from '../features/auth/authSlice'
import { useTranslation } from "react-i18next"
import cookies from 'js-cookie'



function Header(){
    const {t,i18n}=useTranslation()
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
   
    useEffect(()=>{
    if(cookies.get('i18next')==='en'){
        document.body.dir='ltr';
    }else{
        document.body.dir='rtl';
    }
    },[])
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
    
    const onLanguageChange=(e)=>{
        e.preventDefault()
        i18n.changeLanguage(e.target.value)
        if(cookies.get('i18next')==='en'){
            document.body.dir='ltr';
        }
        else{
            document.body.dir='rtl';

        }
        
       
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning  ">
            <Link to='/' className=" navbar-brand text-dark mx-3 font-weight-bold"> {t("title")}</Link>
            <button className="navbar-toggler bg-none mx-2 text-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbar-nav'>
                <li className='nav-item mx-1 '>
                    <Link className="nav-link text-secondary " to='/profile' >{t('profile')}</Link>
                </li>
                <li className='nav-item mx-1'>
                    <Link className="nav-link text-secondary" to='/about' >{t('about')}</Link>
                </li>

            </ul>
            <div className='flex-container   mx-3'>
            
            
                <select className='btn btn-outline-secondary'  name='language' id='language' onChange={onLanguageChange}>
                
                    <option value="en">English</option>
                    <option value="hb">עברית</option>
                    <option value="ar">العربيه</option>
                    
                </select>
            
            {!user?<>
                <button onClick={onLogin} type='submit' className='btn btn-outline-secondary mx-1'>{t('login')}</button>
                <button onClick={onRegister}  type='submit' className='btn btn-outline-secondary mx-1'>{t('register')}</button>
           </>:<>
                <button onClick={onLogout}  type='submit' className='btn btn-outline-dark mx-1'>{t('logout')}</button>
           </>
           
            }
                
            </div>
        </div>
        
        </nav>
        

        
        
        </>
    )
}


export default Header