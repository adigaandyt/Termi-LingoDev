import {React} from 'react'
import { useState,useEffect } from "react"
import {useNavigate,Link} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import {register ,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import {AiOutlineUserAdd} from 'react-icons/ai'
import {TiArrowBackOutline} from 'react-icons/ti'
import { useTranslation } from "react-i18next"
import {MdLanguage} from 'react-icons/md'
import cookies from 'js-cookie'
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
        language:'English',
        category:''
    })

    const {name,email,password,password2,phoneNumber,language}=formData;


    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
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
       //on the the user selcted language  for it self
       const onLanguageChange=(e)=>{
        console.log(e.target.value)
        console.log(e.target.name)

        setFormData((prevState)=>{
            return({
                ...prevState,
                language:e.target.value
            })
        })}
        const onCategoryChange=(e)=>{
            console.log(e.target.value)
            console.log(e.target.name)

        }
       if(isLoading){
        return (<Spinner/> )
       }
    return (
        <>
            <div className='container mt-5 mb-5  ' style={{"textAlign":"center"}} >
                <label className="text-secondary mb-25" style={{"fontSize":"250%"}}>
                    <h1>
                    <AiOutlineUserAdd    style={{"fontSize":"145%"}}/>
                    {t('register')}
                    </h1>
                    </label>
            <div className='form1 text-start'>
                    <Link to='/login' className='btn btn-outline-dark' ><TiArrowBackOutline style={{"fontSize":"150%"}}/> {t('login')}</Link>
                </div>
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
            
            <div className="form-group  mt-3">
                <select className="select-input" name='language' onChange={onChange}>
                    <option value="English">English</option>
                    <option value="العربية">العربية</option>
                    <option value="עברית">עברית</option>
                </select>
            </div>
            <div className="form-group  mt-3">
                <select className="select-input" name='category' onChange={onChange}>
                    <option value="Software">{t('software')}</option>
                    <option value="Human Resources">{t('human_resources')}</option>
                    <option value="Football">{t('football')}</option>
                    <option value="Medicine">{t('medicine')}</option>
                </select>
            </div>

            <button id="rgbtn" className='btn btn-dark mt-5' type='submit'>
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