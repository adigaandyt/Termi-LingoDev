import UnAcceptedConceptCard from "./UnAcceptedConceptCard"
import {useSelector} from 'react-redux'

function UnAcceptedConceptsList(){
    const {unAcceptedConcepts}=useSelector(state=>state.concept)

    return(<>
    <div className="row">

        {unAcceptedConcepts&&unAcceptedConcepts.map((concept,index)=>{
            return(
                <div className=' col-sm-6 col-md-4 col-lg-3 my-1'>
                <UnAcceptedConceptCard key={index} concept={concept} />
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