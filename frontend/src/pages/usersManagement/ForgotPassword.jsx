import { useState, useEffect } from "react"
import RestPasswordStepper from "../../components/steppers/RestPasswordStepper"
import {sendValidationMailForResetPassword,reset,resetPassword} from '../../features/auth/authSlice'
import Spinner from "../../components/Spinner"
import { useNavigate } from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import {MdVerifiedUser} from 'react-icons/md'
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
function ForgotPassword(){
    const {t}=useTranslation()
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [activeStep,setActiveStep]=useState(0)
    const [userCode,setUserCode]=useState('')
    const [formData,setFormData]=useState({
        to:'',//email ,i called it like that (to) ,because the function in the controller BE , called "to"
        password1:'',
        password2:''
    })
    const {
        code,
        isValidationSuccess,
        isValidationLoading,
        validationMessage,
        isValidationError,
        isError,
        isSuccess,
        isLoading,
        message
}=useSelector(state=>state.auth)
        useEffect(()=>{
            if(code&&isValidationSuccess){
                setActiveStep(1);
                dispatch(reset())
            }
            if(isValidationError&&validationMessage){ 
                toast.warning(validationMessage)
                dispatch(reset())
            }
            if(isError&&message){
                toast.warning(message)
                dispatch(reset())
            }
            if(isSuccess){
                toast.success("Your password is changed")
                navigate('/login')
                dispatch(reset())
            }
        },[code,isValidationSuccess,isValidationError,isError,isSuccess])
        const onChange=(e)=>{
            e.preventDefault();
            setFormData((prevState)=>{
                return({
                    ...prevState,
                    [e.target.name]:e.target.value
                })
            })
        }
        const onStep1Submit=(e)=>{
            e.preventDefault();
            dispatch(sendValidationMailForResetPassword(formData))
        }
        const onStep2Submit=(e)=>{
            e.preventDefault();
            if(userCode==code){
                setActiveStep(2);
            }else{
                toast.warning("The code is incorrect")
            }
        }
        const onStep3Submit=(e)=>{
            e.preventDefault()
            dispatch(resetPassword(formData))
            
        }

    return (<>
    {isLoading||isValidationLoading&&<Spinner/>}
    <div className="mt-120 ">
        <RestPasswordStepper activeStep={activeStep}/>
        {activeStep===0&&<>
            <form onSubmit={onStep1Submit}>
                <div className="mt-5 text-center">
                    <div className='container mt-3 text-center '>
                    <h6 className="m-3">{t('emailForValidation')}</h6>
                        <div className="form-floating  mb-3 ">
                            <input onChange={onChange}  type="email" className="form-control " id="floatingInput" name='to' placeholder="name@example.com" />
                             <label for="floatingInput">{t('email_adrress')}</label>
                        </div>                       
                         <div className='text-end mt-3'>
                        <button type='submit' className='btn' style={{"marginRight":"20px"}}>{t('next')}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>}
        {activeStep===1&&<>
            <form onSubmit={onStep2Submit}>
                <div className="mt-5 text-center">
                    <div className='container mt-3 text-center '>
                    <h5>{t('validation_explain')} <span className='text-primary'>{formData.to}</span></h5>
                    <p>{t('validation_explain1')}</p>
                        <div className="form-floating  mb-3 ">
                            <input onChange={(e)=>setUserCode(e.target.value)} value={userCode} type="text" className="form-control " id="floatingInput" name='code' placeholder="Your Code" />
                             <label for="floatingInput">{t('code')}</label>
                        </div>
                        <div className='text-end mt-3'>
                        <button type='submit' className='btn' style={{"marginRight":"20px"}}>{t('next')}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>}
        {activeStep===2&&<>
            <form onSubmit={onStep3Submit}>
                <div className="mt-5 text-center">
                    <div className='container mt-3 text-center '>
                        <div className="form-floating  mb-3 ">
                            <input onChange={onChange} value={formData.password1} type="password" className="form-control " id="floatingInput" name='password1' placeholder="New Password" />
                             <label for="floatingInput">{t('new password')}</label>
                        </div>
                        <div className="form-floating  mb-3 ">
                            <input onChange={onChange} value={formData.password2} type="password" className="form-control " id="floatingInput" name='password2' placeholder="Confirm password" />
                             <label for="floatingInput">{t('confirm_password')}</label>
                        </div>
                        <div className='text-end mt-3'>
                        <button type='submit' className='btn' style={{"marginRight":"20px"}}>{t('next')}</button>
                        </div>
                    </div>
                </div>
            </form>
        </>}

    </div>
    </>)
}
export default ForgotPassword