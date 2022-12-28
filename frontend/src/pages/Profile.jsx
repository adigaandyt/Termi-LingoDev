import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'
import {FcAddImage} from 'react-icons/fc'
import '../styles/Profile.css'
import { useState } from 'react'
import { updateUserImage } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useTranslation } from 'react-i18next'
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
        {isLoading&&<Spinner/>}
    <h3 className='mt-130 mx-2'>My Profile:</h3>
    <div className="border-top row " id='profilePage'>
      <div className=" col-sm-4 border-start px-3 border-top   ">
        <div className='row'>
        <div className='col-7 '>
          <div id='profilePageImage' className=' text-end mt-3 ' >
            <div className='image-circle' style={{"backgroundImage":`url(${profile_image})`,"fontSize":"190%"}}>
              <div className=' '>
                  {isImageLoading&&<div class="spinner-border  text-light " id='spinner-grow' role="status">
                    {<span class="sr-only">Loading...</span>}
                  </div>}
              </div>
            </div>
            <div className=' text-end w-75'>
             <label className='text-buttom  mx-2 '>
            <input   style={{"position":"relative" ,"left":"15%","display":"none"}} onChange={onselectImage}  type="file" accept="image/*"/>
            <FcAddImage style={{"fontSize":"40px"}} className='light-background'/></label>               
            </div>            
          </div>
          <div className='mt-3' >
          <h6 className="d-inline-block">{name}</h6>
        </div>
        <div className='' >
          <h6 className="d-inline-block">{email}</h6>
        </div>
        <div className='' >
          <p className="d-inline-block">Score: </p>
          <h6 className="d-inline-block">0</h6>
        </div>
          </div>
          <div className='col-sm-5 col-6  text-sm-end '>
          <div>
          <button id="editbtn" disabled={isEdit} onClick={()=>setIsEdit(!isEdit)} className='btn btn-primary btn-sm text-end mt-lg-3 d-inline-block'>{t('edit')}</button>
          <Link to='/reset' id="editbtn" className='btn btn-dark btn-sm text-end mt-1 mb-3 d-inline-block'>{t('reset_password')}</Link>            
          </div>


          </div>
        </div>

      </div>
      <div className=" col-sm-8 border-start border-top">
        <h3 className='mt-2 mx-2'>Details</h3>
        <ProfileForm isEdit={isEdit} setIsEdit={setIsEdit}/>
      </div>

    </div>

  </>)
}
export default Profile