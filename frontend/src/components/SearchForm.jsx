import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { useEffect,useState,useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {getCategories} from '../features/categories/categorySlice'
import {getConcept,getConceptsNames,resetConcept,getConcepts,setConceptSearchLog} from '../features/concepts/conceptSlice'
import {useTranslation} from 'react-i18next'
import {getCategoryName} from '../hooks/ExportsFunctions'
import NoConceptResultModal from './modals/NoConceptResultModal'
import '../styles/CircleBar.css'




 

 function SearchForm({conceptSearch,setConceptSearch,categoryId,setCategoryId}){ 
    const {t}=useTranslation()
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const [isStart,setIsStart]=useState(true);
    const {concepts,names,concept,isLoading}=useSelector(state=>state.concept);
    const {categories}=useSelector(state=>state.category);

    // const [conceptSearch,setConceptSearch]=useState('');
    // const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')

    useEffect(()=>{
        dispatch(getConceptsNames())
    },[]);
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

    const onSearchClick=(e)=>{
        e.preventDefault()
        navigate(`/search/${conceptSearch}/${categoryId}`)

        if(conceptSearch.length>3){

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
       {(!isStart&&!concept&&!isLoading)&&<NoConceptResultModal/>}
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