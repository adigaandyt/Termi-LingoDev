import { useSelector,useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm';
import ProfileImage from '../../components/ProfileImage';
import {FcSearch} from 'react-icons/fc';
import {IoMdFemale} from 'react-icons/io'
import {IoMdMale} from 'react-icons/io'
import {BsQuestionLg} from 'react-icons/bs'
import {RiCoinsFill} from 'react-icons/ri'
import {BsFillBookmarkStarFill} from 'react-icons/bs'
import {MdBookmarkAdd,MdNotificationAdd} from 'react-icons/md';
import {AiFillCloseCircle} from 'react-icons/ai'
import '../../styles/Profile.css';
import { useState,useEffect } from 'react';
import { getGuessTheTermResults, getTransMeResults, updateUserImage,getGamesRechartData, reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';
import { useTranslation } from 'react-i18next';
import GamesRecharts from '../../components/recharts/GamesRecharts';
// import ConceptsAddedCard from '../../components/conceptsProfile/ConceptsAddedCard';
import ConceptsAddedList from '../../components/conceptsProfile/ConceptsAddedList';
import AddedConceptsRechart from '../../components/recharts/AddedConceptsRechart';

import {getUserConceptsAdded,getConceptsSearchedByUser, getLastConceptsAddedAtLastLogin} from '../../features/conceptsProfile/conceptProfileSlice'
import ConceptsSearchedList from '../../components/conceptsProfile/ConceptsSearchedList';
import {getFavorites} from '../../features/fav/favSlice'
import FavAddedList from '../../components/conceptsProfile/FavAddedList';

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
  const [isEdit,setIsEdit]=useState(true)
  const {conceptsAdded,lastConceptsSearch}=useSelector(state=>state.conceptsProfile)
  const {favs}=useSelector(state=>state.fav)

  useEffect(()=>{
    dispatch(getConceptsSearchedByUser())
    dispatch(getUserConceptsAdded())
    dispatch(getLastConceptsAddedAtLastLogin())
    dispatch(getGuessTheTermResults())
    dispatch(getTransMeResults())
    dispatch(getGamesRechartData())
    dispatch(getFavorites())
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
    <h3 className='mx-2' id="profile-title">{t('my profile')}</h3>
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
        <div id="edit_dv">
          <button id="editbtn" type="button" className="btn btn-info form-group btn-sm" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">{t('edit')}</button>
        </div>
       
             
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
      <button name='showConceptsSearched' type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>{t('last_5_searches')}  <FcSearch className='col-1' style={{"font-size":"22px"}}/></button>
      {showConceptsSearched&&<ConceptsSearchedList concepts={lastConceptsSearch}/>}
      <button name='showLastConceptsAdded' type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>{t('last_added')} <MdNotificationAdd className='text-danger col-1' style={{"font-size":"22px"}}/></button>
      {showLastConceptsAdded&& <p>  last concepts Added</p>}
      <button name='showConceptsFavorite' value={showConcepts.showConceptsFavorite} type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>{t('concepts_favories')} {favs&&favs.length} <BsFillBookmarkStarFill style={{"font-size":"17px"}} className='text-warning'/></button>
      {showConceptsFavorite&&<FavAddedList concepts={favs}/>}
      <button name='showConceptsAdded' value={showConcepts.showConceptsAdded} type="button" class="btn btn-style" onClick={onConceptsButtonsClick}>
      {t('concepts_added')} {conceptsAdded&&conceptsAdded.length} <MdBookmarkAdd className='text-success col-1' style={{"font-size":"22px"}}/>  
      </button>
      {showConceptsAdded&&<ConceptsAddedList concepts={conceptsAdded}/>}  
        
        {/* <h3 className='mt-2 mx-2'>{t('details')}</h3> */}
        {/* <button id="editbtn" disabled={isEdit} onClick={()=>setIsEdit(!isEdit)} className='btn btn-primary btn-sm  mx-2 '>{t('edit')}</button> */}

        {/* <button id="editbtn" type="button" className="btn btn-info form-group btn-sm " data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">{t('edit')}</button> */}
        <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{t('edit')}</h5>
                    <button style={{"background": "none", "border": "none", "font-size" : "30px"}} type="button" class="close" data-dismiss="modal" aria-label="Close">
                      {/* <span aria-hidden="true">&times;</span> */}
                      <AiFillCloseCircle/>
                    </button>
                </div>
                  <div class="modal-body">          
                    <ProfileForm/>
                  </div>
                  {/* <div class="modal-footer">
                    <button id='closeButton' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-warning">{t('submit')}</button>
                  </div> */}
              </div>
          </div>
        </div>           

        {/* <ProfileForm isEdit={isEdit} setIsEdit={setIsEdit} /> */}

      </div>

    </div>
</div>
  </>)
}
export default Profile