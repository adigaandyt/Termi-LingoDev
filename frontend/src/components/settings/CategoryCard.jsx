import {FiEdit2} from 'react-icons/fi'
import {useState} from 'react'
import CategoryCarousel from './CategoryCarousel'
import {FcAcceptDatabase} from 'react-icons/fc'
import {ImCancelCircle} from 'react-icons/im'
import {TfiSave} from 'react-icons/tfi'
import DeleteCategoryModal from './DeleteCategoryModal'
import {useDispatch} from 'react-redux'
import { updateCategoryByAdmin } from '../../features/categories/categorySlice'
import AcceptCategoryModal from './AcceptCategoryModal'
function CategoryCard({category,index}){
    const [isDisabled,setIsDisabled] =useState(true);
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        categoryId:category._id,
        categoryNameEnglish:category.categoryName.english,
        categoryNameArabic:category.categoryName.arabic,
        categoryNameHebrew:category.categoryName.hebrew,
    });
    const onEdit=()=>{
        setIsDisabled(!isDisabled)
    }
    const onSave=()=>{
        dispatch(updateCategoryByAdmin(formData))
        setIsDisabled(true)
    }

    return (<>
    <div class="card text-center " style={{"margin":"auto"}}>
    
    <div class="card-body text-start">
    <div className=" text-center">
        <CategoryCarousel category={category} index={index} isDisabled={isDisabled} formData={formData} setFormData={setFormData}/>
    </div>
    <div className="text-end my-0">
    {/* <button class="btn btn-sm mx-1 text-danger"><RiDeleteBin5Line /></button> */}
    {isDisabled&&<>
    <DeleteCategoryModal categoryId={category._id} index={index}/>
    <button onClick={onEdit}  className='btn btn-sm mx-1 text-end text-green'><FiEdit2/></button>
    {/* <button onClick={onAccept}  className='btn btn-sm mx-1 text-end text-green'><FcAcceptDatabase/></button></> */}
    <AcceptCategoryModal categoryId={category._id}/></>
    }
    {!isDisabled&&<><button onClick={onEdit}  className='btn btn-sm mx-1 text-end text-danger'><ImCancelCircle/></button>
    <button onClick={onSave} className='btn btn-sm mx-1 text-end text-success'><TfiSave/></button></>}
    




    </div>
  </div>
  <div class="card-footer text-muted">
  Suggested By 
  </div>

    </div>
    </>)
}
export default CategoryCard