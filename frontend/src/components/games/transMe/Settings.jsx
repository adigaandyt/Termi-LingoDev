import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {getCategoryName} from '../../../hooks/ExportsFunctions'
import {getConceptNames4TransMeGameByCategoryId} from '../../../features/Games/gamesSlice'
import {FiSave} from 'react-icons/fi'
import { useState } from 'react'

import { Link ,useNavigate } from 'react-router-dom'
import {TbArrowBackUp} from 'react-icons/tb'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import '../../../styles/games/game2.css'
function Settings({setCategoryChanged,languages,setLanguages,getCategoryId}){
    const dispatch =useDispatch()
    const navigate= useNavigate()
    const {categories} =useSelector(state=>state.category)
    const [categoryId,setCategoryId]=useState(null)
    const {questLanguage,answersLanguage}=languages
    const onChangeLanguage=(e)=>{
        e.preventDefault()
        setLanguages((prev)=>{
            return({
                ...prev,
                [e.target.name]:e.target.value
            })
        })
    }
    const onCategoryChange=(e)=>{
        setCategoryId(e.target.value)
        setCategoryChanged(true)
    }
    const onSave=()=>{
        if(categoryId){
            getCategoryId(categoryId)
           dispatch(getConceptNames4TransMeGameByCategoryId(categoryId))
            navigate('/games/transme')
        }
        else{
            toast("your language updated , choode category to save (optional)")
        }
    }
    return(<>
        <div dir='ltr' className=" mt-90">
        <div className='text-center'>
        <div class="flip_letters">

                <span style={{"--flip":"1"}}>U</span>
                <span style={{"--flip":"2"}}>p</span>
                <span style={{"--flip":"3"}}>d</span>
                <span style={{"--flip":"4"}}>a</span>
                <span style={{"--flip":"5"}}>t</span>
                <span style={{"--flip":"6"}}>e</span>
                <span style={{"--flip":"7"}}>Y</span>
                <span style={{"--flip":"8"}}>o</span>
                <span style={{"--flip":"9"}}>u</span>
                <span style={{"--flip":"10"}}>r</span>
                <br/>
                <span style={{"--flip":"11","color":" rgba(219,87,5,1)"}}>S</span>
                <span style={{"--flip":"12","color":" rgba(219,87,5,1)"}}>e</span>
                <span style={{"--flip":"13","color":" rgba(219,87,5,1)"}}>t</span>
                <span style={{"--flip":"14","color":" rgba(219,87,5,1)"}}>t</span>
                <span style={{"--flip":"15","color":" rgba(219,87,5,1)"}}>i</span>
                <span style={{"--flip":"16","color":" rgba(219,87,5,1)"}}>n</span>
                <span style={{"--flip":"17","color":" rgba(219,87,5,1)"}}>g</span>
                <span style={{"--flip":"18","color":" rgba(219,87,5,1)"}}>s</span>
                </div>
        </div>
        <div className="w-25 text-end">
            <Link to='/games/transme' id="settings-guesstheterm-button" className="btn" style={{"color":"rgba(219,87,5,1)"}}><TbArrowBackUp className="display-5"/> </Link>
        </div>
        <div dir='ltr' className="mt-5   row">
            <div className="col-5 text-end">
            <select   name="questLanguage" onChange={onChangeLanguage} className="text-end select-game2-lang"  id="floatingSelectGrid"  aria-label="Language">
              <option disabled={(answersLanguage==="English")?true:false}   value="English">English</option> 
              <option disabled={(answersLanguage==="العربية")?true:false}  value="العربية">العربية</option>
              <option disabled={(answersLanguage==="עברית")?true:false}  value="עברית">עברית</option>
          </select>
            </div>
            <div className="col-2 text-center">
            <BsFillArrowRightCircleFill className=' display-6 text-primary' />
            </div>
            <div className="col-5 text-start">
            <select  name='answersLanguage' onChange={onChangeLanguage}  className="text-end select-game2-lang"  id="floatingSelectGrid"  aria-label="Language">
              <option disabled={(questLanguage==="English")?true:false}  value="English">English</option> 
              <option disabled={(questLanguage==="العربية")?true:false} value="العربية">العربية</option>
              <option disabled={(questLanguage==="עברית")?true:false} value="עברית">עברית</option>
          </select>
            </div>
        </div>
        <div className="mt-5 text-center ">
          <select  onChange={onCategoryChange} defaultValue='Category' name='newLanguage' className=" select-game2-cat" id="floatingSelectGrid"  aria-label="Language">
          <option disabled>Category</option> 
          <hr />
          {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
          </select>
        </div>
            <div className='text-center mt-5'> 
            <button onClick={onSave} className='btn'><FiSave className="display-5" style={{"color":"rgb(219,87,5,1)"}}/></button>
            </div>        
        </div>
    </>)
}
export default Settings