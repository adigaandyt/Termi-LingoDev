import {React,useContext} from 'react'
import { useState,useEffect,useLayoutEffect } from "react"
import {useNavigate,Link} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import {register ,reset,uploadImage,sendValidationMail} from '../../features/auth/authSlice'
import { getCategories,Categoryreset } from '../../features/categories/categorySlice'
import Spinner from "../../components/Spinner"
import { toast } from "react-toastify"
import {AiOutlineUserAdd} from 'react-icons/ai'
import {TiArrowBackOutline} from 'react-icons/ti'
import { useTranslation } from "react-i18next"
import {MdLanguage} from 'react-icons/md'
import cookies from 'js-cookie'
import {getCategoryName} from '../../hooks/ExportsFunctions'
import axios from 'axios'
import RegisterImage from '../../components/RegisterImage'
import "../../styles/Inputs.css"
import '../../styles/Images.css'
import RegisterStepper from './RegisterStepper'



function Register(){
    const {t,i18n}=useTranslation()
    const {isCategorySuccess,isCategoryError}=useSelector(state=>state.category)

    const dispatch=useDispatch()
    const {
        user,
        isLoading,
        isSuccess,
        isError,
        message,
        image_url,
        isImageLoading,
        isValidationSuccess,
        validationMessage,
        isValidationLoading,
        isValidationError,
        code
        }=useSelector((state)=>state.auth)
    const {categories}=useSelector(state=>state.category)
    const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')
    const [isInvalid,setIsInvalid]=useState(false)
    const [activeStep,setActiveStep]=useState(0)
    const navigate=useNavigate()
    const [formData,setFormData,]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        phoneNumber:'',
        status:'student',
        gender:null,
        profile_image:'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png',
        language:'English',
    })
    const [userCode,setUserCode]=useState()
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


    useLayoutEffect(()=>{
        if(isCategorySuccess||isCategoryError){
          dispatch(Categoryreset())
        }
        },[isCategorySuccess,isCategoryError])
    const {name,email,password,password2,phoneNumber,status,favorite_pet,gender,profile_image}=formData;
    useLayoutEffect(()=>{
        if(isValidationError){
        toast.warning(validationMessage) 
        setIsInvalid(true) 
        dispatch(reset())

        }
        if(isValidationSuccess){
        setActiveStep(1)
        setIsInvalid(false) 
        dispatch(reset())
        }
        },[isValidationError,isValidationSuccess,code])

    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(register({formData:formData,categoryId:categoryId}))
    }
    const onChange=(e)=>{
        if(e.target.name==='email'||e.target.name==='password'||e.target.name==='password2')
        {
            setIsInvalid(false)
        }
        setFormData((prevState)=>{
            return({
                ...prevState,
                [e.target.name]:e.target.value 
            })
        })
       }
       const onCodeChange=(e)=>{
        setUserCode(e.target.value)
        setIsInvalid(false)
       }
       const onStep1Submit=(e)=>{
        e.preventDefault()
        //send email
        dispatch(sendValidationMail({to:formData.email,name:formData.name}))

    }
    const onStep2Submit=(e)=>{
        e.preventDefault()
        // validate the code 
        if(userCode==code){
            setIsInvalid(false)
            setActiveStep(2)
        }else{
            toast.warning("The code is incorrect")
            setIsInvalid(true)
        }
    }
    const onStep3Submit=(e)=>{
        e.preventDefault()

        if(formData.password===formData.password2){
            setIsInvalid(false)
            setActiveStep(3)
        }else{
            setIsInvalid(true)
            if(formData.password.length<6||formData.password.length<6){
                toast.warn("The passwords must contain 6 digits or more");
                return
            }
            toast.warn("The passwords must be the same ")


        }

    }


    return (
        <>
        {isLoading||isValidationLoading&&<Spinner/>}
        <div className=' mt-130 mb-5' id="regpage" style={{"textAlign":"center"}} >
        <RegisterStepper activeStep={activeStep}/>
        <div className="form1">

                {activeStep===0&&(<>
                    <form onSubmit={onStep1Submit}>
                        <div className="form-group mt-2"> 
                            <input className="form-control" type="name" placeholder={t('name')}  name="name" id="name"  value={name} onChange={onChange} required/>
                        </div>
                        <div className="form-group mt-2"> 
                            <input className={isInvalid ?'form-control is-invalid': "form-control" } type='email' placeholder={t('email')} id='email' name='email' value={email} onChange={onChange} required/>
                        </div>
                        <div className='text-end mt-3'>
                            <button type='submit' className='custom-btn btn-r' style={{"marginRight":"20px"}}>{t('submit')}</button>
                        </div>
                    </form>
                </>)}

                {activeStep==1&&(<>
                    {/* validation */}
                    <form onSubmit={onStep2Submit}>
                    <label>
                        <h5>{t('validation_explain')} <span className='text-primary'>{formData.email}</span></h5>
                        <p>{t('validation_explain1')}</p>
                    </label>
                    <div className="form-group mt-2"> 
                        <input className={isInvalid ?'form-control is-invalid': "form-control" } type='code' placeholder={t('code')} id='code' onChange={onCodeChange} value={userCode}   required/>  
                    </div>
                    <div className='text-end mt-3'>
                        <button type='submit'  className='custom-btn btn-r' style={{"marginRight":"20px"}}>{t('submit')}</button>
                    </div>
                    </form>
                </>)}

                {activeStep===2&&(<>
                    <form onSubmit={onStep3Submit}>
                        <div className="form-group mt-2"> 
                            <input className={isInvalid ?'form-control is-invalid': "form-control" }  type='password' placeholder={t('password')} id='password' name='password' value={password} onChange={onChange} required/>
                        </div>
                        <div className="form-group mt-2"> 
                            <input className={isInvalid ?'form-control is-invalid': "form-control" }  type='password' placeholder={t('confirm_password')} id='password2' name='password2' value={password2} onChange={onChange} required/>
                        </div>
                        <div className='text-end mt-3'>
                            <button type='submit'  className='custom-btn btn-r' style={{"marginRight":"20px"}}>{t("next")}</button>
                        </div>
                    </form>
                </>)}

                {activeStep==3&&(<>
                    <form onSubmit={onSubmit}>
                    <div className='text-center'>
                        <RegisterImage/>
                    </div>

            <div className="form-group mt-2"> 
                <input className="form-control" type='phoneNumber' placeholder={t('phone')} id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={onChange} required/>  
            </div>
            {/* <div className="form-group mt-2"> 
                <input className="form-control" type='favorit_pet' placeholder={t('favorite_pet')} id='favorite_pet' name='favorite_pet' value={favorite_pet} onChange={onChange} required/>  
            </div> */}
            
            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input" defaultValue={t('Language')} name='language' onChange={onChange}>
                    <option disabled>{t('Language')}</option>
                    <hr className='text-secondary'/>
                    <option value="English">English</option> 
                    <option value="العربية">العربية</option>
                    <option value="עברית">עברית</option>
                </select>
            </div>

            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input  mt-2" defaultValue={t('category')} name='categoryId' onChange={(e)=>{setCategoryId(e.target.value)}}>
                                <option disabled value={t('category')}>{t('category')}</option>
                                <hr className='my-1'/>
                                {(categories)&&
                                    categories.map(category=>{
                                            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                                    })
                                }
                               
                </select>
            </div>
            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input" name='status' onChange={onChange}>
                    <option value="student">Student</option> 
                    <option value="employee">Employee</option>
                    <option value="both">Student & Employee</option>
                </select>
            </div>
            <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input" defaultValue={t('gender')} name='gender' onChange={onChange}>
                    <option disabled>{t('gender')}</option>
                    <hr className='text-secondary'/>
                    <option value="female">{t('female')}</option> 
                    <option value="male">{t('male')}</option>
                    <option value="other">{t('other')}</option>
                </select>
            </div>

            {/* <button id="rgbtn" className='btn btn-dark mt-3'  type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {t('register')}</button> */}
            <div dir='ltr' className='d-flex justify-content-between mt-3'>
            <button className='custom-btn btn-r' type='button' onClick={()=>setActiveStep(2)} style={{"z-index": "0"}}>{t('back')}</button>
            <button className='custom-btn btn-r'  type='submit' style={{"z-index": "0"}}>{t('register')}</button>

            </div>


            </form>
            </>)}
        </div>
        
        
            </div>
        </>
    )
}
export default Register