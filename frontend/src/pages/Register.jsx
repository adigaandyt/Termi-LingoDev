import {React,useContext} from 'react'
import { useState,useEffect } from "react"
import {useNavigate,Link} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import {register ,reset,uploadImage} from '../features/auth/authSlice'
import { getCategories } from '../features/categories/categorySlice'
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import {AiOutlineUserAdd} from 'react-icons/ai'
import {TiArrowBackOutline} from 'react-icons/ti'
import { useTranslation } from "react-i18next"
import {MdLanguage} from 'react-icons/md'
import cookies from 'js-cookie'
import {getCategoryName} from '../hooks/ExportsFunctions'
import axios from 'axios'
import "../styles/Inputs.css"
import '../styles/Images.css'



function Register(){
    const {t,i18n}=useTranslation()
    const dispatch=useDispatch()
    const {user,isLoading,isSuccess,isError,message,image_url,isImageLoading}=useSelector((state)=>state.auth)
    const {categories}=useSelector(state=>state.category)
    const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')


    const navigate=useNavigate()
    const [formData,setFormData,]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:'',
        profile_image:'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
        language:'English',
    })
    useEffect(()=>{
        dispatch(getCategories())
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
        if(image_url){
            setFormData((prevState)=>{
                return({
                    ...prevState,
                    profile_image:image_url
                })
            })
        }
        

        dispatch(reset())
    },[isSuccess,isError,isImageLoading,image_url])


    const {name,email,password,password2,phoneNumber,profile_image}=formData;


    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(register({formData:formData,categoryId:categoryId}))
    }
    const onChange=(e)=>{
        setFormData((prevState)=>{
            return({
                ...prevState,
                [e.target.name]:e.target.value 
            })
        })
       }
 
        const onUploadImage = event => {
            if(event.target.files[0]){
            const formdata=new FormData()
            formdata.append('profileImage',event.target.files[0])
            dispatch(uploadImage(formdata))

            }
                
            }
       if(isLoading){
        return (<Spinner/> )
       }
    return (
        <>
        <div className=' mt-130 mb-5' id="regpage" style={{"textAlign":"center"}} >

        <form className="form1" onSubmit={onSubmit}>

            <div className='form-group mt-2'>
            <img  className='register-image ' src={image_url?image_url:'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png'}></img>
            </div>
            <div className='form-group' >
                <label className='btn btn-sm btn-secondary mt-2  ml-5 ' > 
                {isImageLoading&&(<div class="spinner-grow spinner-grow-sm" role="status">
                <span class="sr-only">Loading...</span>
                </div>)} {t('select_image')}
                <input   style={{"position":"relative" ,"left":"15%","display":"none"}} onChange={onUploadImage}  type="file" accept="image/*"/>
            </label>
            </div>
            <div className="form-group mt-2"> 
                <input className="form-control" type="name" placeholder={t('name')}  name="name" id="name"  value={name} onChange={onChange} required/>
            </div>
            <div className="form-group mt-2"> 
                <input className="form-control" type='email' placeholder={t('email')} id='email' name='email' value={email} onChange={onChange} required/>
            </div>
            <div className="form-group mt-2"> 
                <input className="form-control" type='password' placeholder={t('password')} id='password' name='password' value={password} onChange={onChange} required/>
            </div>
            <div className="form-group mt-2"> 
                <input className="form-control" type='password' placeholder={t('confirm_password')} id='password2' name='password2' value={password2} onChange={onChange} required/>
            </div>
            <div className="form-group mt-2"> 
                <input className="form-control" type='phoneNumber' placeholder={t('phone')} id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={onChange} required/>  
            </div>
            
            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input" name='language' onChange={onChange}>
                    <option value="English">English</option> 
                    <option value="العربية">العربية</option>
                    <option value="עברית">עברית</option>
                </select>
            </div>
            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input  mt-2" name='categoryId' onChange={(e)=>{setCategoryId(e.target.value)}}>
                                {(categories)&&
                                    categories.map(category=>{
                                            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                                    })
                                }
                                <option value='639e49f8dfabd615c821584f'>{t('other')}</option>
                </select>
            </div>

            <button id="rgbtn" className='btn btn-dark mt-3' type='submit'>
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