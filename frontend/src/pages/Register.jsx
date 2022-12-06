import { useState,useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import {register ,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import {AiOutlineUserAdd} from 'react-icons/ai'
import { useTranslation } from "react-i18next"

function Register(){
    const {t}=useTranslation()
    const dispatch=useDispatch()
    const {user,isLoading,isSuccess,isError,message}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    useEffect(()=>{
        if(user){
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
        phoneNumber:''
    })

    const {name,email,password,password2,phoneNumber}=formData



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
            <form onSubmit={onSubmit}>
            <div className='col  profile-data   ' >
            <div className='row-sm '>
                    <input
                    type='name'
                    placeholder={t('name')}
                    id='name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    required
                    
                 />
                </div>
                <div className='row-sm mt-1'>
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
                <div className='row-sm '>
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
                <div className='row-sm'>
                    <input
                    type='password'
                    placeholder={t('confirm_password')}
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    required
                    
                 />
                </div>
                <div className='row-sm '>
                    <input
                    type='phoneNumber'
                    placeholder={t('phone')}
                    id='phoneNumber'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={onChange}
                    required
                    
                 />
                </div>
                 <button className='btn btn-dark text-light btn-profile btn-profile-login mt-5' type='submit'>{t('register')}</button>
               
                 



            </div>

        </form>
            </div>
        </>
    )
}
export default Register