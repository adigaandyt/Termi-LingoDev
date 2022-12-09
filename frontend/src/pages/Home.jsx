import Header  from '../components/Header'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import {getConcepts,getConceptsNames} from '../features/concepts/conceptSlice'
import {GiArchiveResearch} from 'react-icons/gi'
import { useTranslation } from 'react-i18next'



function Home(){
    const {t}=useTranslation()

    const [textSearch,setTextSearch]=useState('')
    const [conceptSearch,setConceptSearch]=useState('')

    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const {concepts,names}=useSelector(state=>state.concept)


    useEffect(()=>{
        dispatch(getConceptsNames())
        console.log(names)
    },[])

    const onChange=async (e)=>{
        e.preventDefault()
        setTextSearch(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
        console.log(textSearch) 
        dispatch(getConcepts({textSearch:textSearch}))
    //    const response= await fetch('http://localhost:5000/api/concepts')
    //    console.log(response)
    }
    const onClick=()=>{
       console.log(concepts[0]._id)
    }
    return (
    
            <div className='mt-5 py-5 container text-center bg-waring '>
                <label className='d-inline '>
                    
                    <h4 className='text-secondary text-center'>
                    <GiArchiveResearch className='text-primary' style={{"fontSize":"250%"}}/>   {t("search_for_a_concept_to_show_its_definition")}</h4>
                </label>
               
               <input list="brow" className='input-search mt-4' onChange={(e)=>{setConceptSearch(e.target.value)}}/>
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


               {user&&<h3 className='text-success'>You are connected with {user.email}</h3>}
            </div>
        
    )
}
export default Home