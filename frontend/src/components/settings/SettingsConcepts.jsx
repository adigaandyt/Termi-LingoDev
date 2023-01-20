import UnAcceptedConceptsList from "./UnAcceptedConceptsList"
import {useEffect,useLayoutEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getUnAcceptedConcepts,reset } from "../../features/concepts/conceptSlice"
import {toast} from 'react-toastify'
import Spinner3 from "../Spinners/Spinner3"
function SettingsConcepts(){
    const {isSuccess,isError,isLoading,message}=useSelector(state=>state.concept)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUnAcceptedConcepts())
    },[])
    useLayoutEffect(()=>{
        if(isSuccess){
            dispatch(reset())
        }
        if(isError){
            toast.error(message)
            dispatch(reset())
        }
    },[isSuccess,isError])

    return<>
        {isLoading&&<Spinner3/>}
        <div className="text-center container mt-3">
            <UnAcceptedConceptsList/>
        </div>
    </>
}
export default SettingsConcepts