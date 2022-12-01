import { useState } from 'react'
import {CgPassword} from 'react-icons/cg'
import {useDispatch} from 'react-redux'
import {resetPassword} from '../features/auth/authSlice'
function ResetPassword(){
    const dispatch=useDispatch()
    const [formData,setFormData]=useState({
        password:'',
        password1:'',
        password2:'',
    })
    const {password,password1,password2}=formData
    const onChange=(e)=>{
        setFormData((prevState)=>{
            return ({
                ...prevState,
                [e.target.name]:e.target.value

            })
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(resetPassword(formData))
    }
    return(<>
        <div className=" container text-center mt-5 pt-5 ">
            <label className="text-secondary mb-5" style={{"fontSize":"250%"}}>
             <h1  className='text-warning'>
             Reset 
             <span className='text-secondary'>Password </span>
             <CgPassword className='text-secondary' style={{"fontSize":"150%"}}/>
             </h1>
             </label>

             <form onSubmit={onSubmit}>
             <div className='row-sm mt-3'>
                <input
                name='password'
                type='password'
                placeholder='Current Password'
                id='password'
                value={password}
                onChange={onChange}
                required

                 />
            </div>
            <div className='row-sm mt-3'>
                <input
                name='password1'
                type='password'
                placeholder='New Password'
                id='password1'
                value={password1}
                onChange={onChange}
                required

                 />
            </div>
            <div className='row-sm mt-3'>
                <input
                
                name='password2'
                type='password'
                placeholder='Confirm Password'
                id='password2'
                value={password2}
                onChange={onChange}
                required

                 />
            </div>

            <button className='btn btn-online-secondary mt-3'>Reset</button>
                 
             </form>
            
        </div>
    </>)
}
export default ResetPassword