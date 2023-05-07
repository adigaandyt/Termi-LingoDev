import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm';
import ProfileImage from '../../components/ProfileImage';
import {FcAddImage} from 'react-icons/fc';
import {IoMdFemale} from 'react-icons/io'
import {IoMdMale} from 'react-icons/io'
import {BsQuestionLg} from 'react-icons/bs'
import {RiCoinsFill} from 'react-icons/ri'
import '../../styles/Profile.css';
import { useState,useEffect } from 'react';
import { getGuessTheTermResults, getTransMeResults, updateUserImage,getGamesRechartData, reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';
import { useTranslation } from 'react-i18next';
import TestComponent from '../TestComponent';
import GamesRecharts from '../../components/recharts/GamesRecharts';
import ConceptsAddedCard from '../../components/ConceptsAddedCard';
import ConceptsAddedList from '../../components/ConceptsAddedList';
import AddedConceptsRechart from '../../components/recharts/AddedConceptsRechart';
import {getUserConceptsAdded,getConceptsSearchedByUser} from '../../features/conceptsProfile/conceptProfileSlice'

function Profile(){
  // const [showConceptsAdded,setShowConceptsAdded]=useState(false)
  const [showConcepts,setShowConcepts]=useState({
    showConceptsAdded:false,
    showConceptsSearched:false,
    showConceptsFavorite:false,
    showLastConceptsAdded:false,

  })
  const {showConceptsAdded,showConceptsSearched,showConceptsFavorite,showLastConceptsAdded}=showConcepts

  const dispatch=useDispatch();
  const {t}=useTranslation();
  const {name,email,profile_image,status,games_coins,gender,added_concepts} =useSelector(state=>state.auth.user)
  const {isLoading,isImageLoading} =useSelector(state=>state.auth)
  const [isEdit,setIsEdit]=useState(false)
  const {conceptsAdded}=useSelector(state=>state.conceptsProfile)

  useEffect(()=>{
    dispatch(getConceptsSearchedByUser())
    dispatch(getUserConceptsAdded())
    dispatch(getGuessTheTermResults())
    dispatch(getTransMeResults())
    dispatch(getGamesRechartData())
    dispatch(reset())
  },[])
  const onselectImage=(event)=>{
    if(event.target.files[0]){
      const formdata=new FormData()
      formdata.append('profileImage',event.target.files[0])
      dispatch(updateUserImage(formdata))

      }
  }

  const onConceptsButtonsClick=(e)=>{
    setShowConcepts((prevState)=>{
      return({
        ...prevState,
        showConceptsAdded:[e.target.name]!='showConceptsAdded'?false:prevState[e.target.name],
        showConceptsSearched:[e.target.name]!='showConceptsSearched'?false:prevState[e.target.name],
        showConceptsFavorite:[e.target.name]!='showConceptsFavorite'?false:prevState[e.target.name],
        showLastConceptsAdded:[e.target.name]!='showLastConceptsAdded'?false:prevState[e.target.name],

      })
    })
 
    setShowConcepts((prevState)=>{
      return({
        ...prevState,
        [e.target.name]:!prevState[e.target.name]
      })
    })
  }
  return(<> 
  <div dir='ltr'  className='mt-110 text-center' id="ppage" style={{"marginLeft":"auto","marginRight":"auto"}}>
        {isLoading&&<Spinner/>}
    <h3 className='mx-2'>{t('my profile')}</h3>
    <div className="border-top row w-100 " id='profilePage' style={{margin:"auto"}}>
      <div id="profile-image-and-detaile" className=" col-sm-4 border-sm-start  border-top py-2   ">
      <ProfileImage  />  
      

       
        
          <div className='mt-3 mx-3 ' style={{"height":"23px"}}>
          <h6 className="d-inline-block">{name}</h6>
        </div>
        <div className='mx-3' style={{"height":"23px"}}>
          <h6 className="d-inline-block">{email}</h6>
        </div>
        <div className='mx-3 ' style={{"height":"23px"}} >
          <p className="d-inline-block">{t('gender')}: </p>
          <h6 className="d-inline-block"> {gender==='female'?<IoMdFemale style={{color:"#f103c9"}}/>:(gender==='male'?<IoMdMale className='text-success'/>:<BsQuestionLg className='text-warning'/>)}</h6>
        </div>
        <div className='mx-3 ' style={{"height":"23px"}} >
          <p className="d-inline-block">Status: </p>
          <h6 className="d-inline-block"> {status==='student'?(<p> Student</p>):(status==='employee'?<p> Employee</p>:<p> Student & Employee</p>)}</h6>
        </div>

        <div className='mx-3' style={{"height":"23px"}}>
          <p className="d-inline-block">{t('coins')}: </p>
          <h6 className="d-inline-block">{games_coins} <RiCoinsFill className='' style={{color:"#FFD700"}}/></h6>
        </div>
        {/* Shuorook  */}
        {/* <div className='text-start bg-secondary'> concepts</div>
        <div className='bg-success w-50 text-start  mt-5'>
          <p>concept name</p>
          <p>concept  category</p>
          <p>concept date added</p>
          <button>more</button>
        </div> */}
       
             
      <div className='border-bottom border-top mt-2'>
         <h3 className='mt-2 mx-2'>{t('games_graph')}</h3>
         
        <GamesRecharts />
        </div>

      <div className='border-bottom mt-2'>
        <h3 className='mt-2 mx-2'>{t('conceptsAdded_graph')}</h3>
        <AddedConceptsRechart/>
      </div>
     
       

      </div>
      <div className=" col-sm-8 border-sm-start border-top  mt-3 ">
        {/* <div className='row'>

      
      </div> */}
      <button name='showConceptsSearched' type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>last searches <i class="fas fa-caret-down pl-2"></i></button>
      {showConceptsSearched&& <p>concepts searched</p>}
      <button name='showLastConceptsAdded' type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>last searches <i class="fas fa-caret-down pl-2"></i></button>
      {showLastConceptsAdded&& <p>  last concepts Added</p>}
      <button name='showConceptsFavorite' type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>concepts favorite <i class="fas fa-caret-down pl-2"></i></button>
      {showConceptsFavorite&& <p>concepts favories</p>}
      <button name='showConceptsAdded' value={showConcepts.showConceptsAdded} type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>
      concepts added {conceptsAdded&&conceptsAdded.length} <i class="fas fa-caret-down pl-2"></i>
      </button>
      {showConceptsAdded&&<ConceptsAddedList concepts={conceptsAdded}/>}  
        
        <h3 className='mt-2 mx-2'>{t('details')}</h3>
        <button id="editbtn" disabled={isEdit} onClick={()=>setIsEdit(!isEdit)} className='btn btn-primary btn-sm  mx-2 '>{t('edit')}</button>

        <ProfileForm isEdit={isEdit} setIsEdit={setIsEdit} />

      </div>

    </div>
</div>
  </>)
}
export default Profile