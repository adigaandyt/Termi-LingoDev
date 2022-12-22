import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {getCategories} from '../features/categories/categorySlice'
import {getConcept,getConceptsNames,resetConcept} from '../features/concepts/conceptSlice'
import {useTranslation} from 'react-i18next'
import {getCategoryName} from '../hooks/ExportsFunctions'
import '../styles/SearchForm.css'




 

 function SearchForm(){
    const {t}=useTranslation()
    const dispatch =useDispatch();
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
        //   setIsStart(false)
        } 
    }
    const OnSelectedCategory=(e)=>{
        setCategoryId(e.target.value)
    }
    const onReset=()=>{
        dispatch(resetConcept())
        setConceptSearch('')

    }

    return(<>
       
        <form onSubmit={onSearchClick}>
        <div className='row ' id='formsearch'>
            <div className='' id='formSearch-item'>
                <div class="input-group">
                    <div id="search-autocomplete " class="form-outline">
                        <input
                        value={conceptSearch}
                        type="search" 
                        id="form1" 
                        list='brow' 
                        class="form-control border border-secondary "
                        autoComplete='on'
                        onChange={(e)=>{setConceptSearch(e.target.value)}}
                        />
                        <label class="form-label" htmlfor="form1">Search</label>
                    </div>
                    <button type="button" className="btn btn-warning" onClick={onSearchClick}>
                        <i class="fas fa-search"></i>
                    </button>
                    <button onClick={onReset} type='button' className='btn btn-secondary'>{t('reset')}</button>

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
        
                {(conceptSearch.length < 4)&&<p className='text-danger '>{t('type_four_or_more_letters')}</p>}
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