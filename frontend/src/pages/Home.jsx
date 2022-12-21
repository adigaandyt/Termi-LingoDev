import { useNavigate , Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getConcept,getConceptsNames,resetConcept} from '../features/concepts/conceptSlice'
import {getCategories} from '../features/categories/categorySlice'
import {BsTranslate} from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import Definitions from '../components/Definitions'
import {getCategoryName} from '../hooks/ExportsFunctions'
import "../styles/home.css"
import NoConceptResultModal from '../components/NoConceptResultModal'



function Home(){
    const {t}=useTranslation()
    const navigate=useNavigate()
    const [isStart,setIsStart]=useState(true)
    const [conceptSearch,setConceptSearch]=useState('')
    const [modalIsOpen,setModalIsOpen]=useState(true)
    const CategoryId=useState()

    const [languageChoosed,setLanguageChoosed]=useState({
        english:true,
        hebrew:false,
        arabic:false,
    })

    const {english,hebrew,arabic}=languageChoosed

    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const {concepts,names,concept,isLoading}=useSelector(state=>state.concept)
    const {categories}=useSelector(state=>state.category)
    const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')


    useEffect(()=>{
        dispatch(getConceptsNames())
        dispatch(getCategories())
        
    },[])

    

    const onChangeLanguage=(e)=>{
        setLanguageChoosed((prev)=>{
            return ({
                english:false,
                hebrew:false,
                arabic:false,
                [e.target.name]:true
            })
        })

    }
    const onSearchClick=()=>{
        if(conceptSearch.length>3){
          dispatch(getConcept({textSearch:conceptSearch,categoryId:categoryId}))
          setIsStart(false)
        
        }
        
    }
    const onReset=()=>{
        dispatch(resetConcept())
        setConceptSearch('')

    }
    
    const OnSelectedCategory=(e)=>{
        setCategoryId(e.target.value)
    }
    return (
    
        <div id="ho" className='text-center mx-3'>
          
           
                <div className='' id='t1'>
                    <label className='d-inline '>
                        <h4 className='text-secondary warp-text '>
                        <BsTranslate className='text-warning capitalized' style={{"fontSize":"180%"}}/> {t('home_title')} <span className="text-warning">{t('its_definition')}</span> </h4>
                    </label>
                </div>
               
            
            <div className='' >
            
                <div className='btn-group home-search' id="btns">
                    <div id="lbtn">
                        <button
                        onClick={onChangeLanguage}
                        name="english"
                        className= {english?'button-group btn btn-dark ':'button-group btn btn-outline-secondary '} >English
                        </button>
                    </div>
                    <div id="lbtn">
                        <button
                        onClick={onChangeLanguage}
                        name="arabic" 
                        className={arabic?'button-group btn btn-dark ':'button-group btn btn-outline-secondary '}>العربية
                        </button>
                    </div>
                    <div id="lbtn">
                        <button
                        onClick={onChangeLanguage}
                        name="hebrew"
                        className={hebrew?'button-group btn btn-dark ':'button-group btn btn-outline-secondary '}>עברית
                        </button>
                    </div>
                </div>
                <br/>
                <div id='searchbtn' className='text-center'>
                        <div className='row'>

                            <div className='col-sm-6'>
                            <input value={conceptSearch} id="searchinput" list="brow" className='select-input mt-2' placeholder={t('type_your_concept_here')} onChange={(e)=>{setConceptSearch(e.target.value)}}/>
                            <datalist className='bg-warning' id="brow">
                                    {(names && conceptSearch.length >= 3 )&&
                                             names.map((name)=>
                                             {
                                               return(<>
                                                        <option value={name.conceptName.arabic}/>
                                                        <option value={name.conceptName.english}/>
                                                        <option value={name.conceptName.hebrew}/>
                                                    </>)})}
                            </datalist> 
                            {(conceptSearch.length < 4)&&<p className='text-danger'>{t('type_four_or_more_letters')}</p>}
                            </div>
                            <div className='col-sm-6'>
                            <select className="select-input mt-2 " id="searchinput" name='language' onChange={OnSelectedCategory}>
                                <option value='639e49f8dfabd615c821584f'>{t('all')}</option>

                                {(categories)&&
                                    categories.map(category=>{
                                            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
                                    })
                                }
                                <option value='639e49f8dfabd615c821584f'>{t('other')}</option>
                            </select>
                            </div>
                        </div>
                    
                    
                    <button onClick={onSearchClick}  className='btn btn-success d-inline mx-1 my-2'>
                    {isLoading&& <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span> }
                    <span className=""> {t("search")}</span>
                    </button>
                    <button onClick={()=>{navigate('/new/concept')}} className='btn btn-dark d-inline mx-1 my-2'>{t('add_new_concept')}</button>
                    <button onClick={onReset}  className='btn btn-secondary  mx-1 my-2'>{t("reset")}</button>
                    <Definitions languageChoosed={languageChoosed} concept={concept}/><br/>
                    <br/>
                    <div className="pb-2">
                        {concept&& <a className='text-primary mt-5 p-5' target='_blank' href={concept&&concept.readMore}>{t('get_more_informations')}</a>}
                    </div>
                </div>
                {(!isStart&&!concept&&!isLoading)&&<NoConceptResultModal/>}
                

                

               {user&&<h3 className='text-success'>You are connected with {user.email}</h3>}
           </div>
        </div>
        
    )
}
export default Home