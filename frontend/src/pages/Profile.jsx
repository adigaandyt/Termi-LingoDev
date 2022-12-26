import { useSelector } from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import {FcAddImage} from 'react-icons/fc'
import '../styles/Profile.css'
import { useState } from 'react'
function Profile(){
  const {profile_image}=useSelector(state=>state.auth.user)
  const [isEdit,setIsEdit]=useState(false)

  return(<>
        
    <h3 className='mt-130 mx-5'>My Profile:</h3>
    <div className="  border-top row" id='profilePage'>
      <div className=" col-sm-4 border-start px-5 border-top ">
        <div className='row '>
        <div className='col-7'>
          <div id='profilePageImage' className=' text-end mt-3' style={{"backgroundImage":`url(${profile_image})`,"fontSize":"190%"}}>
            <label className='text-buttom mt-150 mx-2'><FcAddImage className='light-background'/></label>
          </div>
          <div className='mt-3' >
          <h6 className="d-inline-block">Saleh farres</h6>
        </div>
        <div className='' >
          <h6 className="d-inline-block">salehf@gmail.com</h6>
        </div>
        <div className='' >
          <p className="d-inline-block">Score: </p>
          <h6 className="d-inline-block">0</h6>
        </div>
          {/* <img className='mt-3' src={profile_image&&profile_image}/> */}
          </div>
          <div className='col-sm-5 col-6  text-sm-end '>
          <button disabled={isEdit} onClick={()=>setIsEdit(!isEdit)} className='btn btn-primary btn-sm text-end mt-lg-3 mb-3'>Edit Profile</button>

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