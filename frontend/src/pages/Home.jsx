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
import CarouselAnimationDefinitions from '../components/CarouselAnimationDefinitions'



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
         <div id="home1" className='row mt-90' > 
        <div id="ho" className='col-12  mt-5 '>
        
          {isLoading&&<Spinner/>}
               
                <div className='text-center mb-4' id='t1'>
                    <label className='d-inline '>
                        <h4 className='text-dark'>
                        <BsTranslate className='text-sagol capitalized' /> {t('home_title')} <span className="text-warning">{t('its_definition')}</span> </h4>
                    </label>
                    
                </div>
              
            
          
                {/* <div className='text-center'>
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
                </div> */}
                {/* <br/> */}
                <SearchForm/>
                {/* {concept&&<CatouselDefinition />} */}
                {concept&&<CarouselAnimationDefinitions/>}
                {concepts&&<div  className='center '>
                <hr className=' mb-3  '/>
                <h3>{t('suggestions_for_you')}:</h3>
                </div>}
                
                <ConceptCardsList languageChoosed={languageChoosed}/>

           
        </div>

        </div>
        </> )
}
export default Home