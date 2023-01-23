import {RiDeleteBin5Line} from 'react-icons/ri'
import {useEffect,useState,useLayoutEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {deleteCategoryByAdmin,getUnAcceptedCategories} from '../../features/categories/categorySlice'
import {toast} from 'react-toastify'
import Spinner3 from '../Spinners/Spinner3'

function DeleteCategoryModal({index, categoryId}){
    const dispatch=useDispatch()
    const {isCategoryLoading,isCategorySuccess,isCategoryError}=useSelector(state=>state.category)
    useEffect(()=>{

    },[isCategorySuccess,isCategoryError])
    const onDelete=()=>{
        dispatch(deleteCategoryByAdmin(categoryId))
        dispatch(getUnAcceptedCategories())

        
    }
    return(<>
    {/* {isLoading&&<Spinner3/>} */}
{/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-sm mx-1 text-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${categoryId}`}>
<RiDeleteBin5Line />
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id={`exampleModal${categoryId}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Category</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
        <h5>Are you sure you want  delete this category?</h5>
        <p>In this case you will delete the category , and you can not return it again</p>
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
export default DeleteCategoryModal