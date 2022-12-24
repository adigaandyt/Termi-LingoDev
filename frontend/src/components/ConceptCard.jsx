import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getConcept ,resetConcept } from "../features/concepts/conceptSlice"
import { getConceptName,getCategoryName1 } from "../hooks/ExportsFunctions"

import '../styles/SearchForm.css'

function ConceptCard({concept,languageChoosed}){
    const {t} =useTranslation();
    const {categories}=useSelector(state=>state.category);
    const dispatch=useDispatch();
    const [category,setCategory]=useState('');

    const searchById=(id)=>{
        if(categories){
            const result= categories.find((item) => item._id === id);
            return getCategoryName1(result.categoryName,languageChoosed);
        }
      
       
        
    }
    const onChoose=()=>{
    
    dispatch(getConcept({textSearch:concept.conceptName.english,categoryId:concept.categories[0]}));
    dispatch(resetConcept());
    }
    
    return(<>
        <div id='parent '>
            <div className="card my-2 w-100" id='child'>
                <div className="card-body">
                    <h6 className="card-title">{getConceptName(languageChoosed,concept)}</h6>
                    <p className="card-subtitle mb-2 text-secondary">{searchById(concept.categories[0])}</p>
                    {concept.accepted?
                        <p className="card-subtitle mb-2 text-success">{t('accepted_by_admin')} </p>:
                        <p className="card-subtitle mb-2 text-danger">{t('not_accepted_by_admin_yet')}</p>}
                        <button onClick={onChoose} className="card-link btn btn-sm btn-secondary">{t('choose')}</button>

                </div>
            </div>
          
        </div>
    </>)
}
export default ConceptCard