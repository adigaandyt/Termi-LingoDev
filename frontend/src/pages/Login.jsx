import { useState,useEffect } from "react"
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import { useTranslation } from "react-i18next"

import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'
import {AiOutlineUser} from 'react-icons/ai'
import {TiArrowBackOutline} from 'react-icons/ti'
import "../styles/Inputs.css"

function Login(){
    const {t,i18n}=useTranslation();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData

    useEffect(()=>{
        if(user){
            switch(user.language){
                case 'English':{
                    i18n.changeLanguage('en')
                    document.body.dir='ltr';
                    break;
                }
                case 'עברית':{
                    i18n.changeLanguage('hb')
                    document.body.dir='rtl';
                    break;

                }
                case 'العربية':{
                    i18n.changeLanguage('ar')
                    document.body.dir='rtl';
                    break;

                }
                default:{
                    break;

                }
            }
            navigate('/')
        }
        if(isError){
            toast.error(message)
        }
        dispatch(reset())
    },[isError,isSuccess])
   const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(login(formData))


   }
   const onChange=(e)=>{
    setFormData((prevState)=>{
        return({
            ...prevState,
            [e.target.name]:e.target.value
        })
    })
   }
   if(isLoading){
    return (<Spinner/> )
   }

    return (
        <>
            
            <div className='container mb-5' style={{"textAlign":"center"}} >
                <h1 className="text-secondary my-5"><AiOutlineUser style={{"fontSize":"145%"}}/>{t('login')}</h1>
                <div className='form1 text-start'>
                    <Link to='/register' className='btn btn-outline-dark' ><TiArrowBackOutline style={{"fontSize":"150%"}}/> {t('register')}</Link>
                </div>
                <form className="form1 " onSubmit={onSubmit}>
                    <div className="form-group mt-3"> 
                    <input
                                className="form-control"
                                type='email'
                                placeholder={t('email')}
                                id='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                             />
                    </div>
                    <div className="form-group mt-3"> 
                    <input
                            className="form-control"
                            type='password'
                            placeholder={t('password')}
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            required
                            
                         />
                    </div>
                    {/* <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>{t('login')}</button> */}
                    <button id="rgbtn" className="btn btn-dark mt-3" type='submit'><span></span><span></span><span></span><span></span>{t('login')}</button>
                
                </form>
            </div>
        </>
    )
}

export default Login