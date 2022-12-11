import Header  from '../components/Header'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getConcept,getConceptsNames,resetConcept} from '../features/concepts/conceptSlice'
import {GiArchiveResearch} from 'react-icons/gi'
import { useTranslation } from 'react-i18next'
import Definitions from '../components/Definitions'
import "../styles/home.css"



function Home(){
    const {t}=useTranslation()

    const [textSearch,setTextSearch]=useState('')
    const [conceptSearch,setConceptSearch]=useState('')
    const [languageChoosed,setLanguageChoosed]=useState({
        english:true,
        hebrew:false,
        arabic:false,
    })

    const {english,hebrew,arabic}=languageChoosed

    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const {concepts,names,concept}=useSelector(state=>state.concept)


    useEffect(()=>{
        dispatch(getConceptsNames())
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
          dispatch(getConcept({textSearch:conceptSearch}))  
        }
        
      
    }
    return (
    
            <div className='mt-2 py-5 container text-center bg-waring '>
                <div id='t1'>
                    <label className='d-inline '>
                        <h4 className='text-secondary '>
                        <GiArchiveResearch className='text-primary' style={{"fontSize":"250%"}}/>{t("search_for_a_concept_to_show_its_definition")}</h4>
                    </label>
                </div>

                <div className='btn-group home-search px-5' >
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
                    <input id="searchinput" list="brow" className='home-search mt-4' placeholder='translate your concept' onChange={(e)=>{setConceptSearch(e.target.value)}}/>
                    <datalist className='bg-warning' id="brow">
                            {(names && conceptSearch.length >= 3 )&&
                                             names.map((name)=>
                                             {
                                               return(<>
                                                        <option  value={name.conceptName.arabic}/>
                                                        <option value={name.conceptName.english}/>
                                                        <option value={name.conceptName.hebrew}/>
                                                    </>)})}
                    </datalist> 


                    {(conceptSearch.length < 4)&&<p className='text-danger'>Type four or more letters</p>}
                    
                    <button onClick={onSearchClick}  className='btn btn-dark  mx-1 my-2'>{t("search")}</button>
                    <button onClick={()=>dispatch(resetConcept())}  className='btn btn-secondary  mx-1 my-2'>{t("reset")}</button>
                    <Definitions languageChoosed={languageChoosed} concept={concept}/>
                </div>
                

               {user&&<h3 className='text-success'>You are connected with {user.email}</h3>}
            </div>
        
    )
}
export default Home