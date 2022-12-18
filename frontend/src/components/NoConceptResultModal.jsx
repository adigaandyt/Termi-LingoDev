import {useTranslation} from 'react-i18next'
import { useState } from "react"
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import {BiError} from 'react-icons/bi'
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
        height:'280px',
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

    
            <Modal ariaHideApp={false}  isOpen={modalIsOpen} onRequestClose ={closeModal} style={customStyles} contentLabel='add new concept' >
            <button className='btn-close text-end' onClick={closeModal}>X</button>
            <h2 ><BiError className='text-warning' style={{"fontSize":"150%"}}/> {t('concept_not_found')}</h2>
            
            <p>{t('concept_not_found_desc')}</p>
            <Link to='/new/concept' className='btn btn-success mt-4 mx-1'>{t('add_concept')}</Link>
            <Link onClick={()=>{setModalIsOpen(false)}} className='btn btn-danger mt-4 mx-1'>{t('cancel')}</Link>

            


        </Modal>
    </div>
    </>)
}
export default NoConceptResultModal