import { useTranslation } from 'react-i18next'
import {useEffect, useState,useLayoutEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {getCategoryName} from '../hooks/ExportsFunctions'
import {createNewConceptByUser,reset} from '../features/concepts/conceptSlice'
import {toast} from 'react-toastify' 
import Spinner3 from '../components/Spinners/Spinner3'
import "../styles/newConcept.css"
import { Categoryreset, createNewCategoryByUser } from '../features/categories/categorySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";


function NewConcept(){
    const {t}=useTranslation();
    const dispatch=useDispatch()
    const {categories}=useSelector(state=>state.category)
    const {isLoading,isSuccess,isError,message}=useSelector(state=>state.concept)
    const {isCategoryLoading,isCategorySuccess,isCategoryError,Categorymessage}=useSelector(state=>state.category)
    const [categoryFormData,setCategoryFormData]=useState({
        categoryName_english:null,
        categoryName_hebrew:null,
        categoryName_arabic:null

    })
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
        categoryId:null,
        readMore:null

    })
useEffect(()=>{
if(isError){
   toast.error(message)
   dispatch(reset())

}
if(isSuccess){
    toast.success("The concept added to our database")
   dispatch(reset())

}

},[isError,isSuccess,message])

useLayoutEffect(()=>{
if(isCategoryError){
    toast.error(Categorymessage)
    dispatch(Categoryreset())

}
if(isCategorySuccess){
    toast.success("The category added to our database")
    dispatch(Categoryreset())
}
},[isCategorySuccess,isCategoryError,Categorymessage])

    

    const handleTextChange = (e) =>{
        setFormData((preventState)=>{
            return({
                ...preventState,
                [e.target.name]:e.target.value
            })
        })
    }


    const onSubmitClick=()=>{
        dispatch(createNewConceptByUser(formData))
    }
    const handleCategoryTextChange=(e)=>{
        setCategoryFormData((prev)=>{
            return({
                ...prev,
                [e.target.name]:e.target.value
            })
        })
    }
    const onCategorySubmitClick=(e)=>{
        e.preventDefault()
        console.log(categoryFormData)
        dispatch(createNewCategoryByUser(categoryFormData))
    }


    return(<>
    {isLoading&&<Spinner3/>}
    <div className="mt-150 text-center "> 
    <div dir='ltr' className="container-fluid ">
        <ul  className="btn-group nav-pills shadow-none text-center"  id="pills-tab" role="tablist">

            <li className="nav-item " role="presentation">
            <button className="nav-link active" id="pills-english-tab" data-bs-toggle="pill" data-bs-target="#pills-english" type="button" role="tab" aria-controls="pills-english" aria-selected="true">{t('english')}</button>
            </li>

            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-hebrew-tab" data-bs-toggle="pill" data-bs-target="#pills-hebrew" type="button" role="tab" aria-controls="pills-hebrew" aria-selected="false">{t('hebrew')}</button>
            </li>

            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-arabic-tab" data-bs-toggle="pill" data-bs-target="#pills-arabic" type="button" role="tab" aria-controls="pills-arabic" aria-selected="false">{t('arabic')}</button>
            </li>
        </ul>
        <br />

        </div>

        <div className="tab-content  text-center  container"  id="newconcept-inputs-page"> 
            <div className="tab-pane fade show active " id="pills-english" role="tabpanel" aria-labelledby="pills-english-tab">
            <div className="form-group mb-1 "> 
                    <input  name='conceptName_english' type="text" onChange={handleTextChange} class="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_english')}/>
                </div>
                <div className="form-group mb-1 "> 
                    <textarea name='shortDefinition_english' type="text" onChange={handleTextChange} className="form-control " id="floatingShortEnglish"  placeholder={t('short_translation_english')}/>
                </div>
                <div className="form-group mb-1">
                    <textarea name='longDefinition_english'  onChange={handleTextChange} type="text" className="form-control" id="floatingLongEnglish" placeholder={t('long_translation_english')} />
                </div>
            </div>

            <div className="tab-pane fade" id="pills-hebrew" role="tabpanel" aria-labelledby="pills-hebrew-tab">
            <div className="form-group mb-1 "> 
                 <input name='conceptName_hebrew'  onChange={handleTextChange}  type="text"  className="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_hebrew')}/>
                 </div>
            <div className="form-group mb-1 ">
                    <textarea name='shortDefinition_hebrew'  onChange={handleTextChange}  type="text"  className="form-control" id="floatingShortHebrew"  placeholder={t('short_translation_hebrew')}/>
                </div>
                <div className="form-group mb-1">
                    <textarea name='longDefinition_hebrew'  onChange={handleTextChange}  type="text" className="form-control" id="floatingLongHebrew" placeholder={t('long_translation_hebrew')} />
                </div>
            </div>

            <div className="tab-pane fade" id="pills-arabic" role="tabpanel" aria-labelledby="pills-arabic-tab">
            <div  className="form-group mb-1 "> 
                <input name='conceptName_arabic'  onChange={handleTextChange}  type="text"  className="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_arabic')}/>
                </div>
            <div className="form-group mb-1 ">
                    <textarea name='shortDefinition_arabic'  onChange={handleTextChange}  type="text"  className="form-control" id="floatingShortArabic"  placeholder={t('short_translation_arabic')}/>
                </div>
                <div className="form-group mb-1">
                    <textarea name='longDefinition_arabic'  onChange={handleTextChange}  type="text" className="form-control" id="floatingLongArabic" placeholder={t('long_translation_arabic')} />
                </div>
            </div>
             <div  className="form-group mb-1">
                    <input name='readMore'  onChange={handleTextChange}  type="text" className="form-control" id="floatingLinkArabic" placeholder={t('link')}/>
                </div>
                
                <div dir='ltr' className="container-fluid">
                <button type="button" class="btn btn-warning pull-right mt-3"   onClick={onSubmitClick} >{t('submit')}</button>
            
                <div  className="form-group mt-2 col-5 " id="reg-dropdown">
                
                <select className="form-select border-secondary  mt-1 mx-1  mt-2 " name='categoryId' onChange={handleTextChange}>
                                
                                {(categories)&&
                                    categories.map(category=>{
                                            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                                    })
                                }   
                </select>   

                    
                <button type="button" class="btn btn-info form-group mt-2 " data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">{t('new_category')}</button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{t('new_category')}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={onCategorySubmitClick}>
                        <div class="modal-body">
                         
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">{t('english')}</label>
                                <input name='categoryName_english' type="text" class="form-control" id="recipient-name" onChange={handleCategoryTextChange} required/>
                            </div>
                            <div class="form-group">
                            <label for="recipient-name" class="col-form-label">{t('hebrew')}</label>
                                <input name='categoryName_hebrew' type="text" class="form-control" id="recipient-name" onChange={handleCategoryTextChange} required/>
                            </div>
                            <div class="form-group">
                            <label for="recipient-name" class="col-form-label">{t('arabic')}</label>
                                <input name='categoryName_arabic' type="text" class="form-control" id="recipient-name" onChange={handleCategoryTextChange} required/>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-warning">{t('submit')}</button>
                        </div>
                        </form>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        </div>
    </div>
    </>)
}
export default NewConcept