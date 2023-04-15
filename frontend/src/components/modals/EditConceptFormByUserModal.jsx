import {FiEdit2} from 'react-icons/fi'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {getCategoryName,getCategoryNameById} from '../../hooks/ExportsFunctions'
import {useDispatch} from 'react-redux'
import {ImCancelCircle} from 'react-icons/im'
import { updateConceptByUser,reset } from '../../features/concepts/conceptSlice'
import {toast} from 'react-toastify'
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
function EditConceptFormByUserModal({concept,index,formShow,toggleFormShow}){
    const {t}=useTranslation()
    const dispatch=useDispatch()
    const {categories} =useSelector(state=>state.category)
    const {isLoading,isSuccess,isError,message} =useSelector(state=>state.concept)
    const [formData,setFormData]=useState({
        conceptId:concept._id,
        conceptName_english:concept.conceptName.english,
        conceptName_arabic:concept.conceptName.arabic,
        conceptName_hebrew:concept.conceptName.hebrew,
        longDefinition_english:concept.longDefinition.english,
        longDefinition_arabic:concept.longDefinition.arabic,
        longDefinition_hebrew:concept.longDefinition.hebrew,
        shortDefinition_english:concept.shortDefinition.english,
        shortDefinition_arabic:concept.shortDefinition.arabic,
        shortDefinition_hebrew:concept.shortDefinition.hebrew,
        readMore:concept.readMore
    })
    const {        
        conceptName_english,
        conceptName_arabic,
        conceptName_hebrew,
        longDefinition_english,
        longDefinition_arabic,
        longDefinition_hebrew,
        shortDefinition_english,
        shortDefinition_arabic,
        shortDefinition_hebrew,
        readMore}=formData
    const [isDisabled,setIsDisabled] =useState(true)
    const [currentSlide, setCurrentSlide] = useState(0);


    const [flag,setFlag]=useState({
        hebrew:false,
        arabic:false,
        english:true
    })
    const {hebrew,arabic,english} =flag

    useEffect(()=>{
        if(isSuccess){
            toast.success("The changes have been saved, and are moving to a test phase")
            toggleFormShow(false)
            dispatch(reset())

        }
        if(isError){
            toast.error(message)
            dispatch(reset())
        }
      },[isSuccess,isError])
      const onChange=(e)=>{
        e.preventDefault()
        setFormData((preventState)=>{
          return ({
            ...preventState,
            [e.target.name]:e.target.value
          })
        })
      }
    const  onSubmit=(e)=>{
      console.log(formData)
      dispatch(updateConceptByUser(formData))
      
      }
    return (<>
<MDBModal show={formShow} setShow={toggleFormShow} tabIndex='-1'>
<MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Concept</MDBModalTitle>
                <div>
                    {hebrew?<img className=' text-start ' src={require('../../flags/israel-xs.gif')}/>:(arabic?(<img className='' src={require('../../flags/saudi-arabia-xs.gif')}/>):(<img className=' ' src={require('../../flags/united-states-xs.gif')}/>))}
                </div>
            </MDBModalHeader>
            <MDBModalBody>
            <form onSubmit={onSubmit}>
        {/* --------------------------carousel----------------------------------- */}

<div id={`carouselExampleControls${index}`} class="carousel slide w-100 " >
<div class="carousel-inner">
<div>
<div className='row w-100'>
      <div className='col-6 text-start' >
<button className=" text-dark btn btn-sm" type="button"  data-bs-target={`#carouselExampleControls${index}`} data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden text-top">Previous</span>
</button>
</div>
<div className='col-6 text-end' >
<button className=" text-dark btn btn-sm" type="button"  data-bs-target={`#carouselExampleControls${index}`} data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
</div>
</div>
  <div class={`carousel-item active`} onAnimationEnd={()=>{setFlag({english:true,hebrew:false,arabic:false})}}>
             <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Concept Name in English:</label>
          <input onChange={onChange} name='conceptName_english' value={conceptName_english} defaultValue={concept.conceptName.english} disabled={!isDisabled}  type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in English:</label>
          <textarea onChange={onChange} name='shortDefinition_english' value={shortDefinition_english} defaultValue={concept.shortDefinition.english}  disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in English:</label>
          <textarea onChange={onChange} name='longDefinition_english' value={longDefinition_english} defaultValue={concept.longDefinition.english} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
  <div class={`carousel-item `} onAnimationEnd={()=>{setFlag({english:false,hebrew:true,arabic:false})}}>
  <div class="mb-1 text-start">

          <label for="recipient-name" class="col-form-label">Concept Name in Hebrew:</label>
          <input onChange={onChange} name='conceptName_hebrew' value={conceptName_hebrew} defaultValue={concept.conceptName.hebrew} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in Hebrew:</label>
          <textarea onChange={onChange} name='shortDefinition_hebrew' value={shortDefinition_hebrew} defaultValue={concept.shortDefinition.hebrew} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in Hebrew:</label>
          <textarea onChange={onChange} name='longDefinition_hebrew' value={longDefinition_hebrew} defaultValue={concept.longDefinition.hebrew} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
  <div class={`carousel-item`} onAnimationEnd={()=>{setFlag({english:false,hebrew:false,arabic:true})}}>
  <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Concept Name in Arabic:</label>
          <input onChange={onChange} name='conceptName_arabic' value={conceptName_arabic} defaultValue={concept.conceptName.arabic} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in Arabic:</label>
          <textarea onChange={onChange} name='shortDefinition_arabic' value={shortDefinition_arabic} defaultValue={concept.shortDefinition.arabic} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in Arabic:</label>
          <textarea onChange={onChange} name='longDefinition_arabic' value={longDefinition_arabic} defaultValue={concept.longDefinition.arabic} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
</div>

</div>
        {/* --------------------------carousel----------------------------------- */}
        <div class="mb-1 text-start">
            <label for="recipient-name" class="col-form-label">URL Link:</label>
            <input onChange={onChange} name='readMore' value={readMore} defaultValue={concept.readMore} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
          </div>
          {/* <div className="text-start">
          <label for="recipient-name" class="col-form-label">Category:</label>
      <select onChange={onChange} name='categoryId' disabled={!isDisabled} className="form-select"   defaultValue={getCategoryNameById(categories,categoryId)} id="floatingSelectGrid"  aria-label="Floating label select example">
        <option >{getCategoryNameById(categories,categoryId)}</option>
        {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
      </select>
    </div> */}
        </form>
            </MDBModalBody>

            <MDBModalFooter>
            <button onClick={()=>toggleFormShow(!formShow)} class="btn btn-outline-danger" ><ImCancelCircle className='text-danger'/></button>
            <button onClick={onSubmit} type="button" class="btn btn-outline-success">Save</button>
           
     
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
</MDBModal>
    </>)
}
export default EditConceptFormByUserModal