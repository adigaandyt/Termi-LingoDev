import {useTranslation} from 'react-i18next'
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import {BiError} from 'react-icons/bi'
// import '../styles/NoConceptResultModal.css'
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
import { use } from 'i18next'

function ExitModal({toggleModal}){
    const {t}=useTranslation()
    const [modalIsOpen,setModalIsOpen]=useState(true)
    const [centredModal, setCentredModal] = useState(true);

    const toggleShow = () => {
      toggleModal();
      setCentredModal(!centredModal);}


    return(<>
              <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{t('game_exit_title')}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
              {t('exit_game_desc')}
              </p>
            </MDBModalBody>
            <MDBModalFooter>
            <Link to='/games' className='btn btn-success mt-4 mx-1'>{t('leave_game')}</Link>
            <Link onClick={toggleShow} className='btn btn-danger mt-4 mx-1'>{t('cancel')}</Link>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>)
}
export default ExitModal