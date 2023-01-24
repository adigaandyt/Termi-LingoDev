import {useDispatch} from 'react-redux'
import {FcAcceptDatabase,FcCheckmark} from 'react-icons/fc'
import {ImExit,ImCancelCircle} from 'react-icons/im'
import { useNavigate,Link } from "react-router-dom"
import { logout } from "../features/auth/authSlice"
import {useState} from 'react'
import {useTranslation} from 'react-i18next'

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

function LogoutModal({show,toggleShow}){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {t}=useTranslation()
    const onLogout=(e)=>{
        e.preventDefault()
        dispatch(logout())
        toggleShow(!show)
        navigate('/')
    }
    return (<>


{/* <!-- Modal --> */}
<MDBModal  show={show} setShow={toggleShow} tabIndex='-1'>
        <MDBModalDialog >
          <MDBModalContent id="exit-modal1">
            <MDBModalHeader>
              <MDBModalTitle>{t('logout')}   <ImExit/></MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>{t('logout_desc')}</MDBModalBody>

            <MDBModalFooter>
            <button  onClick={onLogout} className='btn   mx-1'><FcCheckmark/></button>
            <button onClick={()=> toggleShow(false)} className='btn   mx-1'><ImCancelCircle className='text-danger'/></button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>)
}
export default LogoutModal