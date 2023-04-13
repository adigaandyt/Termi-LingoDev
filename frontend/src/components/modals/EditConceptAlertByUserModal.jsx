import {FcAcceptDatabase,FcCheckmark} from 'react-icons/fc'
import {ImExit,ImCancelCircle} from 'react-icons/im'
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
import {useTranslation} from 'react-i18next'

function EditConceptAlertByUserModal({alertShow,alertToggleShow}){
    const {t}=useTranslation()

    const onEdit=()=>{

    }
    return(<>
        {/* <!-- Modal --> */}
        <MDBModal  show={alertShow} setShow={alertToggleShow}>
            <MDBModalDialog >
            <MDBModalContent id="edit-modal1" >
                <MDBModalHeader>
                <MDBModalTitle>{t('edit_concept')}   <ImExit/></MDBModalTitle>
                {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
                </MDBModalHeader>
                <MDBModalBody>{t('edit_desc')}</MDBModalBody>

                <MDBModalFooter>
                <button  onClick={onEdit} className='btn   mx-1'><FcCheckmark/></button>
                <button onClick={()=> alertToggleShow(false)} className='btn   mx-1'><ImCancelCircle className='text-danger'/></button>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>)
}
export default EditConceptAlertByUserModal