import {useTranslation} from 'react-i18next'
import { useState } from "react"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import {BiError} from 'react-icons/bi'
import '../../styles/NoConceptResultModal.css'
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



function NoConceptResultModal(){
    const {t}=useTranslation()
    const [modalIsOpen,setModalIsOpen]=useState(true)
    const [centredModal, setCentredModal] = useState(true);

    const toggleShow = () => setCentredModal(!centredModal);
    const closeModal=()=>{
        setModalIsOpen(false)
    }
    const onSubmit=(e)=>{
        e.preventDefault()
    }

    return(<>
 
    
      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><BiError className='text-warning' style={{"fontSize":"150%"}}/> {t('concept_not_found')}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
              {t('concept_not_found_desc')}
              </p>
            </MDBModalBody>
            <MDBModalFooter>
            <Link to='/new/concept' className='btn btn-success mt-4 mx-1'>{t('add_concept')}</Link>
            <Link onClick={toggleShow} className='btn btn-danger mt-4 mx-1'>{t('cancel')}</Link>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>)
}
export default NoConceptResultModal