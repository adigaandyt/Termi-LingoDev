import {MdVerifiedUser} from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { verifyUser,reset } from '../../features/auth/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
function Validation(){
    const {t} =useTranslation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isLoading ,isSuccess,isError,message}=useSelector(state=>state.auth)
    useEffect(()=>{
    if(isSuccess){
        console.log("useEfu")
        navigate('/forgotpassword/verified')
    }
    if(isError){
        toast.error(message)
    }
    dispatch(reset())
    },[isError,isSuccess,message,dispatch])
    const [formData,setFormData]=useState({
        email:'',
        favorite_pet:''
    })
    const {email,favorite_pet}=formData
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(verifyUser(formData))
    }
    const onChange=(e)=>{
        setFormData((preventState)=>{
            return({
                ...preventState,
                [e.target.name]:e.target.value
            })
        })
    }
    return (<>
    <form onSubmit={onSubmit}>
    {isLoading&&<Spinner/>}
    <div className="mt-150 text-center">
        <MdVerifiedUser className='text-success display-2'/>
        <h3>Verify your data</h3>
        <div className='container mt-3 text-center '>
        <div className="form-floating  mb-3 ">
            <input  type="email" className="form-control " id="floatingInput" name='email' value={email} placeholder="name@example.com" onChange={onChange}/>
            <label for="floatingInput">{t('email_adress')}</label>
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" id="floatingtext" name='favorite_pet' value={favorite_pet} placeholder={t('favorite_pet')} onChange={onChange}/>
            <label for="floatingPassword">{t('favorite_pet')}</label>
        </div>
        <button type='submit' className='btn btn-outline-dark mt-3'>{t('verify')}</button>
        </div>
    </div>
    </form>
    </>)
}
export default Validation