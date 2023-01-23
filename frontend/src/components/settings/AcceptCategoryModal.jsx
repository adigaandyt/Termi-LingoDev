import { acceptCategoryByAdmin, getUnAcceptedCategories } from "../../features/categories/categorySlice"
import {useDispatch} from 'react-redux'
import {FcAcceptDatabase,FcCheckmark} from 'react-icons/fc'


function AcceptCategoryModal({categoryId}){
    const dispatch=useDispatch();
    const onAccept=()=>{
        dispatch(acceptCategoryByAdmin(categoryId));
        dispatch(getUnAcceptedCategories())

    }
    return (<>
<button type="button" className="btn btn-sm mx-1 text-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${categoryId}1`}>
<FcAcceptDatabase/>
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id={`exampleModal${categoryId}1`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Accept Category</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
        <h5>Are you sure you want  accept this category?</h5>
        <p>In this case you will add the category with status "Accepted", this means other users can see it when selecting a category </p>
      </div>
      <div className="modal-footer">
        <button id='closeButton2' type="button" className="btn text-danger" data-bs-dismiss="modal">Close</button>
        <button onClick={onAccept} type="button" className="btn btn-sm text-danger" data-bs-dismiss="modal"><FcCheckmark className="display-5" /></button>
      </div>
    </div>
  </div>
</div>
    </>)
}
export default AcceptCategoryModal