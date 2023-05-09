import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { useEffect,useState,useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {getConcept,getConceptsNames,resetConcept,getConcepts,setConceptSearchLog, reset, createNewConceptByUser} from '../features/concepts/conceptSlice'
import {useTranslation} from 'react-i18next'
import {getCategoryName} from '../hooks/ExportsFunctions'
import NoConceptResultModal from './modals/NoConceptResultModal'
import '../styles/CircleBar.css'
import { getConceptByOpenAiAPIRequest,resetOpenAi } from '../features/openAi/openAiSlice';
import {toast} from 'react-toastify'



 

 function SearchForm({conceptSearch,setConceptSearch,categoryId,setCategoryId}){ 
    const {t}=useTranslation()
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const [isStart,setIsStart]=useState(true);
    const {concepts,names,concept,isLoading,isSuccess,isError,
        isSingleConceptError,
        isSingleConceptLoading,
        isSingleConceptSuccess,
        singleConceptMessage}=useSelector(state=>state.concept);
    const {categories}=useSelector(state=>state.category);
    const {isOpenAiLoading,openAiMessage,isOpenAiSuccess,isOpenAiError,openAiConcept}=useSelector(state=>state.openAi);


    useEffect(()=>{
        dispatch(getConceptsNames())
    },[]);
    useLayoutEffect(()=>{
        if(isError||isSuccess)
        dispatch(reset());
    },[isSuccess,isError])
    useLayoutEffect(()=>{
        if(concept){
            if(conceptSearch===concept.conceptName.english||conceptSearch===concept.conceptName.arabic||conceptSearch===concept.conceptName.hebrew){

                const backOfficeData={
                    correctSearched:true, 
                    SearchString:conceptSearch,
                    SearchCategoryID:categoryId,
                    conceptID:concept._id
                }
                dispatch(setConceptSearchLog(backOfficeData))
                console.log(backOfficeData)
            }
        }
    },[concept])
    useLayoutEffect(()=>{
        if(isSingleConceptSuccess&&!concept){
            dispatch(getConceptByOpenAiAPIRequest({textSearch:conceptSearch,categoryId:categoryId}))
            // dispatch(getConceptByOpenAiAPIRequest({textSearch:conceptSearch,categoryId:categoryId}))
        }
        dispatch(reset())
    },[isSingleConceptError,isSingleConceptSuccess])
    useLayoutEffect(()=>{
        console.log('error',isOpenAiError ,'success',isOpenAiSuccess)
        if(isOpenAiError||isOpenAiSuccess){
            dispatch(resetOpenAi())
        }
        if(isOpenAiError){
            toast.warning(openAiMessage=='missing_category'?t('missing_category'):openAiMessage)
        }


    },[isOpenAiSuccess,isOpenAiError])
    useLayoutEffect(()=>{

        if(openAiConcept){
            // Todo : add the concept tot the database with status unAccepted
            const data={
                conceptName_english:openAiConcept.conceptName.english,
                conceptName_arabic:openAiConcept.conceptName.arabic,
                conceptName_hebrew:openAiConcept.conceptName.hebrew,
                longDefinition_english:openAiConcept.longDefinition.english,
                longDefinition_arabic:openAiConcept.longDefinition.arabic,
                longDefinition_hebrew:openAiConcept.longDefinition.hebrew,
                shortDefinition_english:openAiConcept.shortDefinition.english,
                shortDefinition_arabic:openAiConcept.shortDefinition.arabic,
                shortDefinition_hebrew:openAiConcept.shortDefinition.hebrew,
                categoryId:openAiConcept.categories[0],
                isOpenAi:true,
                readMore:null
            }
            dispatch(createNewConceptByUser(data))
        }

    },[openAiConcept])
    const onSearchClick=(e)=>{
        e.preventDefault()
        navigate(`/search/${conceptSearch}/${categoryId}`)

        if(conceptSearch.length>2){
          dispatch(getConcept({textSearch:conceptSearch,categoryId:categoryId}))
          dispatch(getConcepts({data:conceptSearch}))
          setIsStart(false)
        } 
    }
    const OnSelectedCategory=(e)=>{
        setCategoryId(e.target.value)
    }
    const onReset=()=>{
        dispatch(resetConcept())
        setConceptSearch('')
        setIsStart(true)

    }

    return(<>
       {(!isStart&&!concept&&!isLoading&&!isSingleConceptLoading&&!isOpenAiLoading&&!openAiConcept)&&<NoConceptResultModal/>}
        <form onSubmit={onSearchClick}>
        <div dir='ltr' className='container ' id='formsearch'>
            <div className='' id='formSearch-item'>
                 <div dir='ltr' className="input-group ">
                    <div id="search-autocomplete " className="form-outline">
                        <input
                        value={conceptSearch}
                        type="search" 
                        id="circlebar"  
                        style={(conceptSearch.length <= 3&&conceptSearch.length >0)?({"border":"2px solid red"}) :({"backgroundColor":"white"}) }
                        list='brow' 
                        className="form-control  "
                        autoComplete='on'
                        onChange={(e)=>{setConceptSearch(e.target.value)}}
                        />
                        <label className="form-label" htmlFor="form1">{t('search_for_concept')}</label>
                    </div>
                    <button  type="button" className="btn  btn-warning" id="searchbtn" onClick={onSearchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    

                    <datalist className='' id="brow">
                        {(names && conceptSearch.length >= 3 )&&
                                    names.map((name)=>
                                    {
                                 return(<>
                                            <option value={name.conceptName.arabic}/>
                                            <option value={name.conceptName.english}/>
                                            <option value={name.conceptName.hebrew}/>
                        </>)})}
                
                    </datalist> 
                </div>
            </div>
            <div   className='mt-2 col-11 ' id='formSearch-item'>
                <select  className="form-select  border-secondary mt-1 mx-1  " aria-label="Default select example" onChange={OnSelectedCategory}>
                    <option value='639e49f8dfabd615c821584f'>{t('all')}</option>
                    {
                        (categories)&&
                        categories.map(category=>{
                            return(category.accepted&&
                    <option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                        })
                    }
                    <option value='639e49f8dfabd615c821584f'>{t('other')}</option>
                </select>
            </div>
        </div>
        </form>
        

    </>)
 }
 export default SearchForm