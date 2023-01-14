import { useTranslation } from 'react-i18next'
import {useEffect, useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {getCategoryName} from '../hooks/ExportsFunctions'
import {createNewConceptByUser} from '../features/concepts/conceptSlice'
// conceptName:{
//     english:null,
//     hebrew:null,
//     arabic:null
// },
// longDefinition:{
//     english:null,
//     hebrew:null,
//     arabic:null
// },
// shortDefinition:{
//     english:null,
//     hebrew:null,
//     arabic:null
// },
function NewConcept(){
    const {t}=useTranslation();
    const dispatch=useDispatch()
    const {categories}=useSelector(state=>state.category)
    const [categoryId,setCategoryId]=useState(null)
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
        readMore
    }=formData

    

    const handleTextChange = (e) =>{
        setFormData((preventState)=>{
            return({
                ...preventState,
                [e.target.name]:e.target.value
            })
        })
    }


    const onSubmitClick=()=>{
        console.log("Clickeddd")
        dispatch(createNewConceptByUser(formData))
    }

    return(<>
    <div className="mt-150 text-center "> 
    <div dir='ltr' className="container-fluid">
        <ul  class="btn-group nav-pills col-12 shadow-none"  id="pills-tab" role="tablist">

            <li class="nav-item " role="presentation">
            <button class="nav-link active" id="pills-english-tab" data-bs-toggle="pill" data-bs-target="#pills-english" type="button" role="tab" aria-controls="pills-english" aria-selected="true">{t('english')}</button>
            </li>

            <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-hebrew-tab" data-bs-toggle="pill" data-bs-target="#pills-hebrew" type="button" role="tab" aria-controls="pills-hebrew" aria-selected="false">{t('hebrew')}</button>
            </li>

            <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-arabic-tab" data-bs-toggle="pill" data-bs-target="#pills-arabic" type="button" role="tab" aria-controls="pills-arabic" aria-selected="false">{t('arabic')}</button>
            </li>
        </ul>
        <br />

        </div>

        <div  class="tab-content  text-center  container"  id="newconcept-inputs-page"> 
            <div class="tab-pane fade show active " id="pills-english" role="tabpanel" aria-labelledby="pills-english-tab">
            <div class="form-group mb-1 "> 
                    <input value={conceptName_english} name='conceptName_english' type="text" onChange={handleTextChange} class="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_english')}/>
                </div>
                <div class="form-group mb-1 "> 
                    <textarea name='shortDefinition_english' type="text" onChange={handleTextChange} class="form-control " id="floatingShortEnglish"  placeholder={t('short_translation_english')}/>
                </div>
                <div class="form-group mb-1">
                    <textarea name='longDefinition_english'  onChange={handleTextChange} type="text" class="form-control" id="floatingLongEnglish" placeholder={t('long_translation_english')} />
                </div>
            </div>

            <div class="tab-pane fade" id="pills-hebrew" role="tabpanel" aria-labelledby="pills-hebrew-tab">
            <div class="form-group mb-1 "> 
                 <input name='conceptName_hebrew'  onChange={handleTextChange}  type="text"  class="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_hebrew')}/>
                 </div>
            <div class="form-group mb-1 ">
                    <textarea name='shortDefinition_hebrew'  onChange={handleTextChange}  type="text"  class="form-control" id="floatingShortHebrew"  placeholder={t('short_translation_hebrew')}/>
                </div>
                <div class="form-group mb-1">
                    <textarea name='longDefinition_hebrew'  onChange={handleTextChange}  type="text" class="form-control" id="floatingLongHebrew" placeholder={t('long_translation_hebrew')} />
                </div>
            </div>

            <div class="tab-pane fade" id="pills-arabic" role="tabpanel" aria-labelledby="pills-arabic-tab">
            <div class="form-group mb-1 "> 
                <input name='conceptName_arabic'  onChange={handleTextChange}  type="text"  class="form-control " id="floatingShortEnglish"  placeholder={t('concept_name_arabic')}/>
                </div>
            <div class="form-group mb-1 ">
                    <textarea name='shortDefinition_arabic'  onChange={handleTextChange}  type="text"  class="form-control" id="floatingShortArabic"  placeholder={t('short_translation_arabic')}/>
                </div>
                <div class="form-group mb-1">
                    <textarea name='longDefinition_arabic'  onChange={handleTextChange}  type="text" class="form-control" id="floatingLongArabic" placeholder={t('long_translation_arabic')} />
                </div>
            </div>
             <div class="form-group mb-1">
                    <input name='readMore'  onChange={handleTextChange}  type="text" class="form-control" id="floatingLinkArabic" placeholder={t('link')}/>
                </div>
            
            

        </div>

        <div className="form-group mt-2" id="reg-dropdown">
                <select className="select-input  mt-2" name='categoryId' onChange={handleTextChange}>
                                {(categories)&&
                                    categories.map(category=>{
                                            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                                    })
                                }
                                <option value='639e49f8dfabd615c821584f'>{t('other')}</option>
                </select>
            </div>
    <div class="mt-3 col-md-12 ">
             <button type="button" class="btn btn-warning pull-right mr-15"  onClick={onSubmitClick} >Submit</button>
        </div>


    </div>

    </>)
}
export default NewConcept