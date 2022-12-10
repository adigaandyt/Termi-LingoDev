import { useState,useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import {register ,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import {AiOutlineUserAdd} from 'react-icons/ai'
import { useTranslation } from "react-i18next"
import {MdLanguage} from 'react-icons/md'
import "../styles/Inputs.css"



function Register(){
    const {t,i18n}=useTranslation()
    const dispatch=useDispatch()
    const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
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
    },[isSuccess,isError])
    const [formData,setFormData,]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:'',
        language:'English'
    })

    const {name,email,password,password2,phoneNumber,language}=formData



    const onSubmit=(e)=>{
        e.preventDefault()

        dispatch(register({formData}))
    }
    const onChange=(e)=>{
        setFormData((prevState)=>{
            return({
                ...prevState,
                [e.target.name]:e.target.value 
            })
        })
       }
       const onLanguageChange=(e)=>{
        setFormData((prevState)=>{
            return({
                ...prevState,
                [e.target.name]:e.target.id
            })
        })

       }
       if(isLoading){
        return (<Spinner/> )
       }
    return (
        <>
            <div className='container  mt-5   ' style={{"textAlign":"center"}} >
                <label className="text-secondary mb-25" style={{"fontSize":"250%"}}>
                    <h1>
                    <AiOutlineUserAdd    style={{"fontSize":"145%"}}/>
                    {t('register')}
                    </h1>
                    </label>
            
        <form className="form1" onSubmit={onSubmit}>
            <div className="form-group mt-3"> 
                <input className="form-control" type="name" placeholder={t('name')}  name="name" id="name"  value={name} onChange={onChange} required/>
            </div>
            <div className="form-group mt-3"> 
                <input className="form-control" type='email' placeholder={t('email')} id='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className="form-group mt-3"> 
                <input className="form-control" type='password' placeholder={t('password')} id='password' name='password' value={password} onChange={onChange} required/>
            </div>
            <div className="form-group mt-3"> 
                <input className="form-control" type='password' placeholder={t('confirm_password')} id='password2' name='password2' value={password2} onChange={onChange} required/>
            </div>
            <div className="form-group mt-3"> 
                <input className="form-control" type='phoneNumber' placeholder={t('phone')} id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={onChange} required/>  
            </div>
            <div className="form-group mt-3">
                    <div className="dropdown bg-red">
                        <button className=" dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <input className="form-control" placeholder="language" value={language} disabled />
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item text-secondary" id="English"  name='language' onClick={onLanguageChange}><span class="fi fi-us"></span> English</a>
                            <a className="dropdown-item text-secondary" id="עברית" name='language' onClick={onLanguageChange}><span class="fi fi-il"></span> עברית</a>
                            <a className="dropdown-item text-secondary" id="العربية" name='language' onClick={onLanguageChange}><span class="fi fi-sa"></span> العربية</a>
                        </div>
                    </div>
            </div>
            <button id="rgbtn" className='btn btn-dark' type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {t('register')}</button>
        </form>
        
        
            </div>
        </>
    )
}
export default Register