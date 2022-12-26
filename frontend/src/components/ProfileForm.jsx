import { useSelector } from "react-redux";
import {getCategoryName} from '../hooks/ExportsFunctions';
import { useState} from 'react';
import {getCategoryNameById} from '../hooks/ExportsFunctions';

function ProfileForm({isEdit,setIsEdit}){
    const {categories}=useSelector(state=>state.category);
    const {name,email,phoneNumber,language,categoryId} =useSelector(state=>state.auth.user);
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
<form onSubmit={onSave}>
<div className="row g-2 mt-3 container">

  <div className="col-md-6">
    <div className="form-floating">
      <input disabled={!isEdit} onChange={onChange} name='newEmail' value={newEmail} type="email" className="form-control" id="floatingInputGrid" placeholder={newEmail} />
      <label for="floatingInputGrid">Email address</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input disabled={!isEdit} onChange={onChange} name='newName' value={newName} type="text" className="form-control" id="floatingInputGrid" placeholder={newName} />
      <label for="floatingInputGrid">Name</label>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-floating">
      <input disabled={!isEdit} onChange={onChange} name='newPhoneNumber' value={newPhoneNumber} type="text" className="form-control" id="floatingInputGrid" placeholder={newPhoneNumber} />
      <label for="floatingInputGrid">phoneNumber</label>
    </div>
  </div>
  <div className="col-md">
    <div className="form-floating">
      <select disabled={!isEdit} onChange={onChange} name='newLanguage' className="form-select" id="floatingSelectGrid" defaultValue={newLanguage} aria-label="Language">
        <option value="English">English</option> 
        <option value="العربية">العربية</option>
        <option value="עברית">עברית</option>
      </select>
      <label for="floatingSelectGrid">Language</label>
    </div>
  </div>
  <div className="col-md">
    <div className="form-floating">
      <select disabled={!isEdit} className="form-select" name='newCategoryId' onChange={onChange} defaultValue={getCategoryNameById(categories,categoryId)} id="floatingSelectGrid"  aria-label="Floating label select example">
        {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
      </select>
      <label for="floatingSelectGrid">Context</label>
    </div>
  </div>

  <div className="col-12">

  {isEdit&&<><button type="submit" className="mt-5 mx-1 btn btn-primary col-3">Save</button>
  <button type="button" onClick={onCanceled} className=" mt-2 mx-1 btn btn-secondary col-3">Cancel</button></>}

  </div>

</div>


</form> 
    </>)
}
export default ProfileForm