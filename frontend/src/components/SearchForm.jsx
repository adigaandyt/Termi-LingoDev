import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getCategories} from '../features/categories/categorySlice'
import {getConcept,getConceptsNames,resetConcept,getConcepts} from '../features/concepts/conceptSlice'
import {useTranslation} from 'react-i18next'
import {getCategoryName} from '../hooks/ExportsFunctions'
import NoConceptResultModal from './NoConceptResultModal'
import '../styles/SearchForm.css'




 

 function SearchForm(){
    const {t}=useTranslation()
    const dispatch =useDispatch();
    const [isStart,setIsStart]=useState(true);
    const {concepts,names,concept,isLoading}=useSelector(state=>state.concept);
    const {categories}=useSelector(state=>state.category);

    const [conceptSearch,setConceptSearch]=useState('');
    const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')

    useEffect(()=>{
        dispatch(getConceptsNames())
    },[]);
    const onSearchClick=(e)=>{
        e.preventDefault()
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
        <div className='row ' id='formsearch'>
            <div className='' id='formSearch-item'>
                <div className="input-group">
                    <div id="search-autocomplete " className="form-outline">
                        <input
                        value={conceptSearch}
                        type="search" 
                        id="form1" 
                        style={(conceptSearch.length <= 3&&conceptSearch.length >0)?({"border":"2px solid red"}) :({"border":"1px solid #6c757d"}) }
                        list='brow' 
                        className="form-control  "
                        autoComplete='on'
                        onChange={(e)=>{setConceptSearch(e.target.value)}}
                        />
                        <label className="form-label" htmlfor="form1">Search</label>
                    </div>
                    <button type="button" className="btn btn-warning" onClick={onSearchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button onClick={onReset} type='button' className='btn btn-secondary'> Reset</button>

                    <datalist className='bg-light w-100' id="brow">
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
            <div className=' mt-2' id='formSearch-item'>
                <select className="form-select border-secondary" aria-label="Default select example" onChange={OnSelectedCategory}>
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