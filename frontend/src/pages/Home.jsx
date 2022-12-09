import Header  from '../components/Header'
import {useSelector,useDispatch} from 'react-redux'
import { useState } from 'react'
import {getConcepts} from '../features/concepts/conceptSlice'



function Home(){
    const [textSearch,setTextSearch]=useState('')
    const dispatch=useDispatch()
    const {user} =useSelector(state=>state.auth)
    const {concepts}=useSelector(state=>state.concept)
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
        <div>
            <div className='mt-5 py-5 text-center'>
               <h1> home </h1>
               <input onChange={onChange} />
               <button onClick={onClick}>sub</button>
               <div>
                {concepts&&
                    concepts.map((concept)=>{
                        return(
                            <p>{concept.conceptName.hebrew}</p>
                        )
                        
                    })
                }
               </div>
               {user&&<h3 className='text-success'>You are connected with {user.email}</h3>}
            </div>
        </div>
    )
}
export default Home