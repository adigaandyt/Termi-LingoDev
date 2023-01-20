import {RiDeleteBin5Line} from 'react-icons/ri'
import {useEffect,useState,useLayoutEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { deleteConceptByAdmin,getUnAcceptedConcepts,reset } from '../../features/concepts/conceptSlice'
import {toast} from 'react-toastify'
import Spinner3 from '../Spinners/Spinner3'

function DeleteConceptModal({index, conceptId}){
    const dispatch=useDispatch()
    const [isDeleted,setIsDeleted] =useState(false)
    const {isLoading,isSuccess,isError,message}=useSelector(state=>state.concept)
    useEffect(()=>{
        if(isDeleted){
            toast.success("The concept has deleted from the database")
            dispatch(getUnAcceptedConcepts())
            // dispatch(reset())
            // document.getElementById("closeButton2").click();
            setIsDeleted(false)
        }
    },[isDeleted])
    useLayoutEffect(()=>{
        if(isSuccess||isError){
            dispatch(reset())
        }
    },[isSuccess,isError])
    const onDelete=()=>{
        dispatch(deleteConceptByAdmin(conceptId))
        setIsDeleted(true)
    }
    return(<>
    {/* {isLoading&&<Spinner3/>} */}
{/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-sm mx-1 text-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
<RiDeleteBin5Line />
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Concept</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
        <h5>Are you sure you want  delete this concept?</h5>
        <p>In this case you will delete the concept , and you can not retun it again</p>
      </div>
      <div className="modal-footer">
        <button id='closeButton2' type="button" className="btn text-green" data-bs-dismiss="modal">Close</button>
        <button onClick={onDelete} type="button" className="btn text-danger" data-bs-dismiss="modal"><RiDeleteBin5Line /></button>
      </div>
    </div>
  </div>
</div>
    </>)
}   
export default DeleteConceptModal