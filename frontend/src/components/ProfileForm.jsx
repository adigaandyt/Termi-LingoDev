import { useSelector,useDispatch } from "react-redux"
import { updateUser ,reset } from "../features/auth/authSlice"
import {getCategoryName} from '../hooks/ExportsFunctions'
import { useEffect, useState} from 'react'
import {getCategoryNameById} from '../hooks/ExportsFunctions'
import {toast} from 'react-toastify'
import { useTranslation } from 'react-i18next'
import TestComponent from '../pages/TestComponent'


function ProfileForm({isEdit,setIsEdit}){
  const {t}=useTranslation()
  const dispatch=useDispatch();
    const {categories}=useSelector(state=>state.category)
    const {name,email,phoneNumber,language,categoryId} =useSelector(state=>state.auth.user)
    const {isError,isSuccess,message,user} =useSelector(state=>state.auth)
    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSuccess){
        toast.success("Detailes Updated")
        dispatch(reset())
      }
    },[isError,isSuccess,message,dispatch,user])
    const [formData,setFormData,]=useState({
        newName:name,
        newEmail:email,
        newPhoneNumber:phoneNumber,
        newLanguage:language,
        newCategoryId:categoryId
    });
    const {newEmail,newName,newLanguage,newPhoneNumber}=formData; 

    const onChange=(e)=>{
        e.preventDefault()
        setFormData((prev)=>{
            return({
                ...prev,
                [e.target.name]:e.target.value
            })
        })
    }
    const onSave=(e)=>{
        e.preventDefault()
        dispatch(updateUser(formData))
        setIsEdit(false)

    }
    const onCanceled=()=>{
        setIsEdit(!isEdit)
        setFormData({
        newName:name,
        newEmail:email,
        newPhoneNumber:phoneNumber,
        newLanguage:language,
        newCategoryId:categoryId
        })
    }

  
    return(<>
<form onSubmit={onSave} className='' >
<div  className="row g-2 mt-3 container " style={{"margin":"auto"}}>

  <div className="col-md-6" >
    <div className="form-floating " >
      <input disabled={!isEdit} onChange={onChange} name='newEmail' value={newEmail} type="email" className="form-control" id="floatingInputGrid" placeholder={newEmail} />
      <label htmlFor="floatingInputGrid">{t('email_adress')}</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input disabled={!isEdit} onChange={onChange} name='newName' value={newName} type="text" className="form-control" id="floatingInputGrid" placeholder={newName} />
      <label htmlFor="floatingInputGrid">{t('name')}</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input disabled={!isEdit} onChange={onChange} name='newPhoneNumber' value={newPhoneNumber} type="text" className="form-control" id="floatingInputGrid" placeholder={newPhoneNumber} />
      <label htmlFor="floatingInputGrid">{t('phone')}</label>
    </div>
  </div>
  <div className="col-md">
    <div className="form-floating">
      <select disabled={!isEdit} onChange={onChange} name='newLanguage' className="form-select" id="floatingSelectGrid" defaultValue={newLanguage} aria-label="Language">
        <option value="English">English</option> 
        <option value="العربية">العربية</option>
        <option value="עברית">עברית</option>
      </select>
      <label htmlFor="floatingSelectGrid">{t('language1')}</label>
    </div>
  </div>
  <div className="col-md">
    <div className="form-floating">
      <select disabled={!isEdit} className="form-select" name='newCategoryId' onChange={onChange} defaultValue={getCategoryNameById(categories,categoryId)} id="floatingSelectGrid"  aria-label="Floating label select example">
        <option >{getCategoryNameById(categories,categoryId)}</option>
        {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
      </select>
      <label htmlFor="floatingSelectGrid">{t('context')}</label>
    </div>
  </div>

  <div className="col-12">

  {isEdit&&<><button type="submit" className="mt-5 mx-1 btn btn-primary col-3">{t('save')}</button>
  <button type="button" onClick={onCanceled} className=" mt-2 mx-1 btn btn-secondary col-3">{t('cancel')}</button></>}

  </div>

</div>


</form> 
    </>)
}
export default ProfileForm