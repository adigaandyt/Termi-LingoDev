import React, { useState, useEffect, useRef } from 'react';
import {MdOutlineAddAPhoto} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux'
import { updateUserImage } from '../features/auth/authSlice';
import {FcAddImage} from 'react-icons/fc';
import {uploadImage} from '../features/auth/authSlice'

import '../styles/ProfileImage.css'



function RegisterImage() {

  const fileInputRef = useRef(null);
  const {isImageLoading,image_url} =useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const onselectImage=(event)=>{
    if(event.target.files[0]){
      const formdata=new FormData()
      formdata.append('profileImage',event.target.files[0]) 
      dispatch(uploadImage(formdata))

      }
      
  }
  const handleButtonClick=(e)=>{ 
    e.preventDefault()
    fileInputRef.current.click();
  }
    return (<>
    

    <div id='comp-img2' className='text-center ' style={{"margin":"auto"}}>
      <div id='image2' style={{"backgroundImage":image_url?`url(${image_url})` :`url(https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png)`,"fontSize":"190%"}} >
      {isImageLoading&&<div className="spinner-border  text-light " id='spinner-grow' role="status">
              {<span className="sr-only">Loading...</span>}
            </div>}
            <label  className=' ' id='img-icon2'>
            <input ref={fileInputRef} id="fileInput"   style={{ "display":"none"}}  onChange={onselectImage} type="file" accept="image/*"/>
            <MdOutlineAddAPhoto type='button' className='text-secondary'  onClick={handleButtonClick} id='img-icon2-bg'/>
            </label> 
      
            {/* <input ref={fileInputRef}   id="fileInput"  onChange={onselectImage} type="file" accept="image/*"/> */}



      </div>
    </div>
    </>)}



export default RegisterImage;