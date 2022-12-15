import {useTranslation} from 'react-i18next'
import { useState } from "react"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import '../styles/NoConceptResultModal.css'

// width:'600px',
// top:'50%',
// left: '50%',
// right: 'auto',
// buttom:'auto',
// marginRight:'-51%',
// transform: 'translate(-50%,-50%)',
// position: 'relative',

const customStyles={
    content:{
        position: 'absolute',
        height:'250px',
        top: '30%',
        left: '8%',
        right: '8%',
        bottom: '30%',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        marginLeft:'30px',
        marginRight:'30px'

        
    }
}

function NoConceptResultModal(){
    const {t}=useTranslation()
    const [modalIsOpen,setModalIsOpen]=useState(true)
    const closeModal=()=>{
        setModalIsOpen(false)
    }
    const onSubmit=(e)=>{
        e.preventDefault()
    }

    return(<>
    <div className="text-center ">

    
            <Modal  isOpen={modalIsOpen} onRequestClose ={closeModal} style={customStyles} contentLabel='add new concept' >
            <h2>{t('concept_not_found')}</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <p>{t('concept_not_found_desc')}</p>
            <Link className='btn btn-success mt-4 mx-1'>{t('add_concept')}</Link>
            <Link onClick={'close the modal'} className='btn btn-danger mt-4 mx-1'>{t('cancel')}</Link>

            


        </Modal>
    </div>
    </>)
}
export default NoConceptResultModal