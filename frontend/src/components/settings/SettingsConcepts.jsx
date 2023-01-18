import UnAcceptedConceptsList from "./UnAcceptedConceptsList"
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { getUnAcceptedConcepts } from "../../features/concepts/conceptSlice"
function SettingsConcepts(){
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUnAcceptedConcepts())
    },[])
    return<>
        <div className="text-center container mt-3">
            <UnAcceptedConceptsList/>
        </div>
    </>
}
export default SettingsConcepts