import { useSelector } from "react-redux"
import ConceptCard from "./ConceptCard"

function ConceptCardsList({languageChoosed}){
    const {concepts}=useSelector(state=>state.concept)


    return(<>
    <div className="row w-100">
    {concepts&&concepts.map((concept)=>{
        return(
            <div className=' col-sm-6 col-md-4 col-lg-3 '>
            <ConceptCard languageChoosed={languageChoosed} concept={concept}/>                
            </div>
        )

    })}
    </div>
    </>)
}
export default ConceptCardsList