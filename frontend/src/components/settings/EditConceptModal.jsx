import {FiEdit2} from 'react-icons/fi'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {getCategoryName,getCategoryNameById} from '../../hooks/ExportsFunctions'
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
function EditConceptModal({concept,index,basicModal,setBasicModal,toggleShow}){
    const {t}=useTranslation()
    const {categories} =useSelector(state=>state.category)
    const [formData,setFormData]=useState({
        conceptName_english:null,
        conceptName_arabic:null,
        conceptName_hebrew:null,
        longDefinition_english:null,
        longDefinition_arabic:null,
        longDefinition_hebrew:null,
        shortDefinition_english:null,
        shortDefinition_arabic:null,
        shortDefinition_hebrew:null,
        categoryId:concept.categories[0],
        readMore:null
    })
    const {        conceptName_english,
        conceptName_arabic,
        conceptName_hebrew,
        longDefinition_english,
        longDefinition_arabic,
        longDefinition_hebrew,
        shortDefinition_english,
        shortDefinition_arabic,
        shortDefinition_hebrew,
        categoryId,
        readMore}=formData
    const [isDisabled,setIsDisabled] =useState(false)
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevious = () => {
      if (currentSlide === 0) {
        setCurrentSlide(2);
      } else {
        setCurrentSlide(currentSlide - 1);
      }
    }
  
    const handleNext = () => {
      if (currentSlide === 2) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }
    const [flag,setFlag]=useState({
        hebrew:false,
        arabic:false,
        english:true
    })
    const {hebrew,arabic,english} =flag

    useEffect(()=>{
        console.log(index)
      },[])
    return (<>
<MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
<MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Concept</MDBModalTitle>
                <div>
                    {hebrew?<img className=' text-start ' src={require('../../flags/israel-xs.gif')}/>:(arabic?(<img className='' src={require('../../flags/saudi-arabia-xs.gif')}/>):(<img className=' ' src={require('../../flags/united-states-xs.gif')}/>))}
                </div>
            </MDBModalHeader>
            <MDBModalBody>
            <form>
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
          <input defaultValue={concept.conceptName.english} disabled={!isDisabled}  type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in English:</label>
          <textarea defaultValue={concept.shortDefinition.english}  disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in English:</label>
          <textarea defaultValue={concept.longDefinition.english} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
  <div class={`carousel-item `} onAnimationEnd={()=>{setFlag({english:false,hebrew:true,arabic:false})}}>
  <div class="mb-3 text-start">

          <label for="recipient-name" class="col-form-label">Concept Name in Hebrew:</label>
          <input defaultValue={concept.conceptName.hebrew} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in Hebrew:</label>
          <textarea defaultValue={concept.shortDefinition.hebrew} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in Hebrew:</label>
          <textarea defaultValue={concept.longDefinition.hebrew} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
  <div class={`carousel-item`} onAnimationEnd={()=>{setFlag({english:false,hebrew:false,arabic:true})}}>
  <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Concept Name in Arabic:</label>
          <input defaultValue={concept.conceptName.arabic} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Short Definition in Arabic:</label>
          <textarea defaultValue={concept.shortDefinition.arabic} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
        <div class="mb-1 text-start">
          <label for="message-text" class="col-form-label">Long Definition in Arabic:</label>
          <textarea defaultValue={concept.longDefinition.arabic} disabled={!isDisabled} class="form-control" id="message-text"></textarea>
        </div>
  </div>
</div>

</div>
        {/* --------------------------carousel----------------------------------- */}
        <div class="mb-1 text-start">
            <label for="recipient-name" class="col-form-label">URL Link:</label>
            <input defaultValue={concept.readMore} disabled={!isDisabled} type="text" class="form-control" id="recipient-name"/>
          </div>
          <div className="text-start">
          <label for="recipient-name" class="col-form-label">URL Link:</label>
      <select disabled={!isDisabled} className="form-select" name='newCategoryId'  defaultValue={getCategoryNameById(categories,categoryId)} id="floatingSelectGrid"  aria-label="Floating label select example">
        <option >{getCategoryNameById(categories,categoryId)}</option>
        {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
      </select>
    </div>
        </form>
            </MDBModalBody>

            <MDBModalFooter>
                     <button onClick={toggleShow} class="btn btn-secondary" >Close</button>
         {!isDisabled&&(
             <>
             <button  type="button" class="btn btn-secondary" onClick={()=>setIsDisabled(!isDisabled)}><FiEdit2/></button>
             <button type="button" class="btn btn-success">Accept Concept</button>
             </>
         )}
         {isDisabled&&(
             <>
             <button  type="button" class="btn btn-secondary" onClick={()=>setIsDisabled(!isDisabled)}>Cancel</button>
             <button type="button" class="btn btn-warning">Save & Accept</button>
             </>
         )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
</MDBModal>
    </>)
}
export default EditConceptModal

