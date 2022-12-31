import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import ProfileImage from '../components/ProfileImage';
import {FcAddImage} from 'react-icons/fc';
import '../styles/Profile.css';
import { useState } from 'react';
import { updateUserImage } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useTranslation } from 'react-i18next';
import TestComponent from './TestComponent';
function Profile(){
  const dispatch=useDispatch();
  const {t}=useTranslation();
  const {name,email,profile_image} =useSelector(state=>state.auth.user)
  const {isLoading,isImageLoading} =useSelector(state=>state.auth)
  const [isEdit,setIsEdit]=useState(false)
  const onselectImage=(event)=>{
    if(event.target.files[0]){
      const formdata=new FormData()
      formdata.append('profileImage',event.target.files[0])
      dispatch(updateUserImage(formdata))

      }
  }
  return(<> 
  <div dir='ltr' className='mt-110' id="ppage">
        {isLoading&&<Spinner/>}
    <h3 className='mx-2'>{t('my profile')}</h3>
    <div className="border-top row " id='profilePage'>
      <div className=" col-sm-4 border-start px-3 border-top py-2  ">
      
       
        <ProfileImage isImageLoadin={isImageLoading} profile_image={profile_image} />
          <div className='mt-3 mx-3' >
          <h6 className="d-inline-block">{name}</h6>
        </div>
        <div className='mx-3' >
          <h6 className="d-inline-block">{email}</h6>
        </div>
        <div className='mx-3' >
          <p className="d-inline-block">Score: </p>
          <h6 className="d-inline-block">0</h6>
        </div>
       

       

      </div>
      <div className=" col-sm-8 border-start border-top">
        <h3 className='mt-2 mx-2'>{t('details')}</h3>
        <button id="editbtn" disabled={isEdit} onClick={()=>setIsEdit(!isEdit)} className='btn btn-primary btn-sm  mx-2 '>{t('edit')}</button>

        <ProfileForm isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>

    </div>
</div>
  </>)
}
export default Profile