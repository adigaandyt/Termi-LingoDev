import {Link,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useState,useEffect} from 'react'
import {logout} from '../features/auth/authSlice'
import { useTranslation } from "react-i18next"
import cookies from 'js-cookie'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {MdLanguage} from 'react-icons/md'
import {ImExit,ImUserPlus, ImProfile} from 'react-icons/im'
import {GoSignIn} from 'react-icons/go'
import $ from 'jquery'
// import {AiOutlineUserAdd} from 'react-icons/ai'
import "../styles/Header.css"




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
        i18n.changeLanguage(e.target.name)
        if(cookies.get('i18next')==='en'){
            document.body.dir='ltr';
        }
        else{
            document.body.dir='rtl';

        }
        
       
    }

    return (
        
        <>
      
        
        <div dir='ltr' className="nav1">
            <div className="content">
                <div className="text">
                    <Link to='/' id='titlestyle' className="navbar-brand text-secondary mx-3"> Termi</Link>
                </div>
                <div className="btnb"><span></span></div>
            </div>
            <div className="box">
                <i  className="lan">
                    <div className="dropdown dropleft">
                        <button className="lan" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <MdLanguage />
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" name='en' onClick={onLanguageChange}><span className="fi fi-us"></span> English</a>
                            <a className="dropdown-item" name='hb' onClick={onLanguageChange}><span className="fi fi-il"></span> עברית</a>
                            <a className="dropdown-item" name='ar' onClick={onLanguageChange}><span className="fi fi-sa"></span> العربية</a>
                        </div>
                    </div>
                </i>
                {!user?(
                    <>
                    <i className="log"><button onClick={onLogin} type="button"><GoSignIn/></button></i>
                    <i className="plus"><button onClick={onRegister} type="button"><ImUserPlus/></button></i>
                    </>
                ):(
                    <>
                    <i className="exit"><button onClick={onLogout} type="button"><ImExit/></button></i>
                    <i className="prof "><button onClick={() => navigate('/profile')} type="button"><ImProfile/></button></i>
                    </>
                )}
            </div>
        </div>
        

        
        
        </>
    )
}


export default Header