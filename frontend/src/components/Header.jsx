import {Link,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {logout} from '../features/auth/authSlice';
import { useTranslation } from "react-i18next";
import cookies from 'js-cookie';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {MdLanguage} from 'react-icons/md';
import {ImExit,ImUserPlus, ImProfile} from 'react-icons/im';
import {GoSignIn} from 'react-icons/go';
import {BsTranslate} from 'react-icons/bs'
import {HiSwitchHorizontal} from 'react-icons/hi'
import "../styles/Header.css";
import LogoutModal from './modals/LogoutModal';
import {sendLanguageChange} from '../features/logging/appLanguageChangeSlice'

function switchLanguage(currentLanguage){
    switch(currentLanguage){
        case 'ar':{
            return 'en';
            break;
        }
        case 'en':{
            return 'hb';
            break;
        }
        case 'hb':{
            return 'ar';
            break;
        }
        default:{
            break;
        }
    }
    
}


function Header(){
    // let lan=cookies.get('i18next')
    const {t,i18n}=useTranslation();
    const {user}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [show,toggleShow]=useState(false)
    
    const [active, setActive] = useState(false);
    const optionsClick = () => {
        setActive(!active);
    };
   
    useEffect(()=>{
    if(cookies.get('i18next')==='en'){
        document.body.dir='ltr';
    }else{
        document.body.dir='rtl';
    }
    },[])
    const onLogin=()=>{
        navigate('/login')
        optionsClick()
    }
    const onRegister=()=>{
        navigate('/register')
        optionsClick()

    }
    const onLogout=(e)=>{
        e.preventDefault()
        dispatch(logout())
        navigate('/')

    }
    const onProfile = () => {
        navigate('/profile')
        optionsClick()
    }
      const languagechange=(change)=>{
        const data={
          newLanguage:change
        }
        dispatch(sendLanguageChange(data))
    }
    const onLanguageChange=(e)=>{
       const nextLanguage= switchLanguage(cookies.get('i18next'))
       e.preventDefault()
       languagechange(nextLanguage)
       // from here we need to send that the language changed

       i18n.changeLanguage(nextLanguage)
       console.log(nextLanguage)
       if(cookies.get('i18next')==='en'){
           document.body.dir='ltr';
       }
       else{
           document.body.dir='rtl';

       }
    }
    return (
        
        <>
        
        <LogoutModal show={show} toggleShow={toggleShow}/>
        <div dir='ltr' className="nav1">
        <div className="space"></div>
            <div className="content">
                <div className="text">
                 <div className='d-flex' onClick={onLanguageChange}>
                     <button id='titlestyle'>
                        <BsTranslate className='navbar-brand text-secondary text-light display-2' size="60" />
                     </button>
                    
                    <h3 style={{"marginLeft":"-25px"}} className='mt-3 text-light'><HiSwitchHorizontal className='text-warning mx-2'/>{cookies.get('i18next')==='en'? 'English':(cookies.get('i18next')==='ar'?'العربية':'עברית')}</h3>
                    </div>
                </div>
                <div className={`btnb ${active ? 'active' : ''}`} onClick={optionsClick}><span></span></div>

            </div>
            <div className={`box ${active ? 'open' : ''}`}>
                <i className="lan">
                    <div className="dropdown dropleft">
                        <button className="lan" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <MdLanguage />
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="l-option">
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
                    <i className="exit"><button onClick={()=>toggleShow(!show)} type="button"><ImExit/></button></i>

                    <i className="prof " onClick={onProfile}><img src={user.profile_image}/></i>
                    </>
                )}
            </div>
        </div>
        

        
       
        </>
    )
}


export default Header