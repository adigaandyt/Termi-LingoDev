import React, { useState, useEffect, useRef } from 'react';
import {MdOutlineAddAPhoto} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux'
import { updateUserImage } from '../features/auth/authSlice';
import {FcAddImage} from 'react-icons/fc';

import '../styles/ProfileImage.css'



function ProfileImage() {

  const fileInputRef = useRef(null);
  const {isImageLoading} =useSelector(state=>state.auth)
  const {profile_image} =useSelector(state=>state.auth.user)
  const dispatch=useDispatch()
  const onselectImage=(event)=>{
    if(event.target.files[0]){
      const formdata=new FormData()
      formdata.append('profileImage',event.target.files[0]) 
      dispatch(updateUserImage(formdata))

      }
      
  }
  const handleButtonClick=(e)=>{ 
    e.preventDefault()
    console.log("sasasas")
    fileInputRef.current.click();
  }
    return (<>
    

    <div id='comp-img2' className='text-center'>
      <div id='image2'style={{"backgroundImage":`url(${profile_image})`,"fontSize":"190%"}} >
      {isImageLoading&&<div class="spinner-border  text-light " id='spinner-grow' role="status">
              {<span class="sr-only">Loading...</span>}
            </div>}
            <label  className=' ' id='img-icon2'>
            <input ref={fileInputRef} id='input-image2'  style={{ "display":"none"}}  onChange={onselectImage} type="file" accept="image/*"/>
            <MdOutlineAddAPhoto className='text-secondary'  onClick={{handleButtonClick}} id='img-icon2-bg'/>
            </label> 


      </div>
    </div>
    </>)}



export default ProfileImage;