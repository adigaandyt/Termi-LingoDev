import { useState,useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import { useTranslation } from "react-i18next"

import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'

function Login(){
    const {t}=useTranslation();
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
            
            <div className='container mt-5 ' style={{"textAlign":"center"}} >
            <h1 className="my-5">{t('login')}</h1>
            <form onSubmit={onSubmit}>
            <div className='col  profile-data mr-4' >
                <div className='row-sm mt-4'>
                    <label className="text-dark d-none d-lg-inline mx-1" disabled>{t('email')}</label>
                     <input
                        type='email'
                        placeholder={t('email')}
                        id='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    
                    />
                </div>
                <div className='row-sm mt-4'>
                    <label className="text-dark d-none d-lg-inline mx-1" disabled>{t('password')}</label>
                    <input
                    type='password'
                    placeholder={t('password')}
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    
                 />
                </div>
                 <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>{t('login')}</button>
               
                 



            </div>

        </form>
            </div>
        </>
    )
}

export default Login