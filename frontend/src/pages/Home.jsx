import { useNavigate , Link,useParams } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState,useLayoutEffect } from 'react'
import {getConcept,getConceptsNames,resetConcept} from '../features/concepts/conceptSlice'
import {getCategories,Categoryreset} from '../features/categories/categorySlice'
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
import UserCard from '../components/UserCard'
import Saleh from '../components/Saleh'
import ShareConcepts from '../components/ShareConcepts'



function Home(){
    const {t}=useTranslation()
    const {textSearch,categoryID}=useParams()
    //back office
    const [conceptSearch,setConceptSearch]=useState('');
    const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')

    const [languageChoosed,setLanguageChoosed]=useState({
        english:true,
        hebrew:false,
        arabic:false,
    })

    const {english,hebrew,arabic}=languageChoosed
    const {isCategorySuccess,isCategoryError}=useSelector(state=>state.category)
    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const {concepts,names,concept,isLoading}=useSelector(state=>state.concept)
    const {categories}=useSelector(state=>state.category)
    // const [categoryId,setCategoryId]=useState('639e49f8dfabd615c821584f')


    useEffect(()=>{
        dispatch(getConceptsNames())
        dispatch(getCategories())
    },[])

    useLayoutEffect(()=>{
    if(isCategorySuccess||isCategoryError){
      dispatch(Categoryreset())
    }
    },[isCategorySuccess,isCategoryError])

    useLayoutEffect(()=>{
        //fetch data for sharing , get a textsearch and categoryid params from a url
        if(textSearch&&categoryID){
          dispatch(getConcept({textSearch:textSearch,categoryId:categoryID}))
        }
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
         <div  className=' mt-150' > 
        <div className='  mt-5 '>
          {isLoading&&<Spinner/>}
               
                <div className='text-center ' id='t1'>
                    <label className='d-inline '>
                    <h1 id='home-title-anim'>Termi</h1>
                    </label>
                </div>
              
            
          
                <SearchForm conceptSearch={conceptSearch} setConceptSearch={setConceptSearch} categoryId={categoryId} setCategoryId={setCategoryId}/> 
                {concept&&<>
                <ShareConcepts/>
                <CarouselAnimationDefinitions/>
                 </>}
                {concepts&&<div  className='center '>
                <hr className=' mb-3  '/>
                <h3>{t('suggestions_for_you')}:</h3>
                </div>}
                <ConceptCardsList languageChoosed={languageChoosed} conceptSearch={conceptSearch} categoryId={categoryId}/>
        </div>

        </div>
        </> )
}
export default Home