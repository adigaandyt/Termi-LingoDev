// import { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import {useSelector} from 'react-redux'
// import {Link} from 'react-router-dom'

// function Profile(){
//     const {t}=useTranslation()
//     const {user}=useSelector(state=>state.auth)
//     const {email,name,phoneNumber,language,category}=user

//     return(<>
//         <div className="container mt-5 py-5 text-center">
//             <h1>{t('profile')}</h1>
//             <Link to='/reset' className='btn btn-warning '>{t('reset_password')}</Link>
//             <form>
//                 <ul className='mt-4'>
//                     <li className='my-1'>
//                         <input
//                         placeholder={name}
//                         disabled={true}
//                         />
//                     </li>
//                     <li className='my-1'>
//                         <input
//                         placeholder={email}
//                         disabled={false}
//                         />
//                     </li>
//                     <li className='my-1'>
//                         <input
//                         className='text-secondary'
//                         placeholder={phoneNumber}
//                         disabled={false}
//                         />
//                     </li>
//                 </ul>
//             </form>
//             <ul>
               
//             </ul>
//         </div>
//     </>)    
// }
// export default Profile
//--------------------------------------------------------------------------------------------
import { useTranslation } from 'react-i18next'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import "../styles/Profile.css"
import { useState } from 'react'

function Profile(){
    const {t}=useTranslation()
    const {user}=useSelector(state=>state.auth)
    const {email,name,phoneNumber,language}=user

    const [formData, setFormData]=useState({
        newName: name?name:""

    })
    const {newName}=formData;

    const [isDisabled,setDisabled]=useState(true)
    const EditApply = "Edit"
    const btnedit = document.getElementById('btnedit');
    const floatingNameCon = document.getElementById('floatingName');
    const floatingEmailCon = document.getElementById('floatingEmail'); 
    const floatingPhoneCon = document.getElementById('floatingPhone');
    const floatingLanguageGridCon = document.getElementById('floatingLanguageGrid');
    const floatingCategoryGridCon = document.getElementById('floatingCategoryGrid');
    const onEdit = ()=>{
        if(isDisabled){
            setDisabled(false)
            btnedit.textContent = "Apply";
        }else{
            setDisabled(true)
            btnedit.textContent = "Edit";
            console.log(formData)
        }
    }
    // dont change it
    const onChange = (e)=>{
        setFormData((prevState)=>{
            return ({
                ...prevState,
                [e.target.name]:e.target.value
            })
        })
    }

    return(<>
<div className='row mt-150'>


<div className='mt-150 col-1'>
  <div className="bar text-end"></div>
</div>
    <div className='col-6 mx-2 mt-150'>
        <form className="row g-3">
  <div className="col-md-6">
    <label for="inputEmail4" className="form-label">{t('email')}</label>
    <input type="email" className="form-control" id="inputEmail4"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" id="inputPassword4"/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
</div>
</div>
    </>)    
}

export default Profile