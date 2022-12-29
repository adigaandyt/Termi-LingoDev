import { useNavigate , Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getConcept,getConceptsNames,resetConcept} from '../features/concepts/conceptSlice'
import {getCategories} from '../features/categories/categorySlice'
import {BsTranslate} from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import Definitions from '../components/Definitions'
import {getCategoryName} from '../hooks/ExportsFunctions'
import SearchForm from '../components/SearchForm'
import ConceptCard from '../components/ConceptCard'
import "../styles/home.css"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import NoConceptResultModal from '../components/NoConceptResultModal'
import ConceptCardsList from '../components/ConceptCardsList'
import CatouselDefinition from '../components/CaroselDefinition'
import Spinner from '../components/Spinner'



function Home(){
    const {t}=useTranslation()

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
  
    return (<>
         <div className='row mt-90' > 
        <div id="ho" className='col-12 col-sm-11 mt-5 '>
        
          {isLoading&&<Spinner/>}
               
                <div className='text-center mb-4' id='t1'>
                    <label className='d-inline '>
                        <h4 className='text-secondary warp-text '>
                        <BsTranslate className='text-warning capitalized' /> {t('home_title')} <span className="text-warning">{t('its_definition')}</span> </h4>
                    </label>
                    
                </div>
              
            
          
                <div className='text-center'>
                    <div className='d-inline-block text-center' >
                        <button
                        onClick={onChangeLanguage}
                        name="english"
                        className= {english?'button-group btn btn-dark ':' btn btn-outline-secondary '} >English
                        </button>
                        <button
                        onClick={onChangeLanguage}
                        name="arabic" 
                        className={arabic?'button-group btn btn-dark ':' btn btn-outline-secondary '}>العربية
                        </button>
                        <button
                        onClick={onChangeLanguage}
                        name="hebrew"
                        className={hebrew?'button-group btn btn-dark ':' btn btn-outline-secondary '}>עברית
                        </button>
                    </div>
                </div>
                <br/>
                <SearchForm/>
                <CatouselDefinition/>
                {/* <Definitions languageChoosed={languageChoosed} concept={concept}/> */}
                {concepts&&<div className='center'>
                <hr className='my-3  dashed'/>
                <h3>{t('suggestions_for_you')}:</h3>
                </div>}
                
                <ConceptCardsList languageChoosed={languageChoosed}/>

           
        </div>
        <div className='col-2 col-sm-1  '>
            <div className='text-center'>
            <span id="home-flages2" className="fi fi-us mt-3"></span>                
            </div>
            <div className='text-center'>
            <span id="home-flages2" className="fi fi-il my-3"></span>                
            </div>
            <div className='text-center'>
            <span id="home-flages2" className="fi fi-sa"></span>                
            </div>
            </div>
        </div>
        </> )
}
export default Home