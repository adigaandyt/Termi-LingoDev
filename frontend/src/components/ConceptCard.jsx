import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getConcept ,resetConcept, setConceptSearchLog } from "../features/concepts/conceptSlice"
import { getConceptName,getCategoryName1,getConceptNameCookies,getCategoryName } from "../hooks/ExportsFunctions"

import '../styles/SearchForm.css'
import { useNavigate } from "react-router-dom"
import { resetOpenAiConcept } from "../features/openAi/openAiSlice"

function ConceptCard({concept,languageChoosed,conceptSearch,categoryId}){
    const {t} =useTranslation();
    const navigate=useNavigate()
    const {categories}=useSelector(state=>state.category);
    const {user}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
    const [category,setCategory]=useState('');
    // useEffect(()=>{
    //     console.log('card',languageChoosed)
    // },[concept])
    const searchById=(id)=>{
        if(categories){
            const result= categories.find((item) => item._id === id);
            return getCategoryName(result.categoryName);
        }
      
       
        
    }
    const onChoose=()=>{
    const backOfficeData={
     correctSearched:false, 
     SearchString:conceptSearch,
     SearchCategoryID:categoryId,
     conceptID:concept._id
    }
    navigate(`/search/${concept.conceptName.english}/${concept.categories[0]}`)
    dispatch(setConceptSearchLog(backOfficeData))
    dispatch(getConcept({textSearch:concept.conceptName.english,categoryId:concept.categories[0]}));
    dispatch(resetConcept());
    dispatch(resetOpenAiConcept());

    }
    
    return(<>
        <div id='parent'>
            <div className="card my-2 w-100 mx-2" id='child'>
                <div className="card-body ">
                
                    <h6 className="card-title">{getConceptNameCookies(concept)}</h6>
                    {/* <button onClick={()=>console.log(concept)}>ssa</button> */}
                    <p className="card-subtitle  text-secondary">{searchById(concept.categories[0])}</p>
                    {concept.accepted?
                        <p className="card-subtitle  text-success">{t('accepted_by_admin')} </p>:
                        <p className="card-subtitle text-danger">{t('not_accepted_by_admin_yet')}</p>}
                        <button onClick={onChoose} className="card-link btn btn-sm btn-secondary mt-3">{t('choose')}</button>

                </div>
            </div>
          
        </div>

    </>)
}
export default ConceptCard