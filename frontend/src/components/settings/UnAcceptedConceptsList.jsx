import UnAcceptedConceptCard from "./UnAcceptedConceptCard"
import {useSelector} from 'react-redux'
import {useEffect} from 'react'

function UnAcceptedConceptsList(){
    const {unAcceptedConcepts}=useSelector(state=>state.concept)

    return(<>
    <div className="row w-100 text-center" style={{"margin":"auto"}}>

        {unAcceptedConcepts&&unAcceptedConcepts.map((concept,index)=>{
            return(
                <div className=' col-sm-6 col-md-4 col-lg-3 my-1'>
                <UnAcceptedConceptCard key={index} concept={concept} index={index}/>
                </div>
            )
        })}
   
        

        {/* <div className=' col-sm-6 col-md-4 col-lg-3 my-1'>
        <UnAcceptedConceptCard/>
        </div> */}

    </div>

    </>)
}
export default UnAcceptedConceptsList