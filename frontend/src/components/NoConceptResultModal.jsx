import { useState } from "react"
import Modal from 'react-modal'
import '../styles/NoConceptResultModal.css'



const customStyles={
    content:{
        width:'600px',
        height:'200px'
        
    }
}

function NoConceptResultModal(){
    const [modalIsOpen,setModalIsOpen]=useState(true)
    const closeModal=()=>{
        setModalIsOpen(false)
    }
    const onSubmit=(e)=>{
        e.preventDefault()
    }

    return(<>
    <div className="text-center">

    
            <Modal isOpen={modalIsOpen} onRequestClose ={closeModal} style={customStyles} contentLabel='Add Note' >
            <h2>Add Note</h2>
            <button className='btn-close' onClick={closeModal}>X</button>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <textarea 
                    name='noteText' 
                    id='noteText'
                    className='form-control'
                    placeholder='Note Text'
                    value={'test'}
                    ></textarea>
                </div>
                <div className='form-group'>
                    <button className='btn' type='submit'>Submit</button>
                </div>
            </form>

        </Modal>
    </div>
    </>)
}
export default NoConceptResultModal