import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next"
import {FiEdit2} from 'react-icons/fi';
import {BiShow,BiHide, BiLink} from 'react-icons/bi';
import React, { useState } from 'react';
import { getConceptName,categoryById } from '../hooks/ExportsFunctions';
import "../styles/Inputs.css"
import {GrTextAlignCenter} from 'react-icons/gr'
import {RxTextAlignCenter} from 'react-icons/rx'
import {HiOutlineBars2, HiOutlineBars3} from 'react-icons/hi2'
import {MdMoreHoriz} from 'react-icons/md';
import Rating from 'react-rating'
import {AiOutlineStar,AiFillStar} from 'react-icons/ai'
import ShareConcepts from '../components/ShareConcepts'



function Definitions({concept,languageChoosed,alertShow,alertToggleShow}){
    const {categories}=useSelector(state=>state.category)
    const {conceptRating}=useSelector(state=>state.concept)

    const { t }=useTranslation();
    const getDefinition=(isLong)=>{
        let definition="" 
        switch(true){
            case languageChoosed.english :{
                if(isLong){ 
                    definition=concept.longDefinition.english
                }else{
                    definition=concept.shortDefinition.english 
                }
                break;
            }
            case languageChoosed.arabic :{
                if(isLong){
                    definition=concept.longDefinition.arabic
                }else{
                    definition=concept.shortDefinition.arabic 
                }
                break;
            }
            case languageChoosed.hebrew :{
                if(isLong){
                    definition=concept.longDefinition.hebrew
                }else{
                    definition=concept.shortDefinition.hebrew 
                }
                break;
            }

            default:break
        }
        return definition
        
    }

    const [showShortDefinition, setShowShortDefinition] = useState(false);
    const [showLongDefinition, setShowLongDefinition] = useState(false);
  
    const toggleLongDefinition = () =>{
         setShowShortDefinition(!showShortDefinition)
         setShowLongDefinition(false)
        };
    const toggleShortDefinition = () => {
        setShowLongDefinition(!showLongDefinition);
        setShowShortDefinition(false)
    };
    
    const handleClick = () => {
        navigator.share({
          title: getDefinition(false),
          text: 'Check out My App',
          url: '',
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing:', error));
    };
  
 
    return(<>
        
    <div className='text-center' dir='ltr' id="slide">
        <div className='row '>
        <div className='col-1 text-start'>
            {languageChoosed.hebrew&&<img className='mt-2 text-start ' src={require('../flags/israel-xs.gif')}/>}
            {languageChoosed.english&&<img className=' mt-2 ' src={require('../flags/united-states-xs.gif')}/>}
            {languageChoosed.arabic&&<img className='mt-2' src={require('../flags/saudi-arabia-xs.gif')}/>}
        </div>
        <div className='col-11 text-end'>
            <h3 className="text-dark mb-3 mt-2" id="conceptName">{concept&&getConceptName(languageChoosed,concept)}</h3> 
            <div className=''>
                <h5 className=''>{concept&&categoryById(concept.categories[0],languageChoosed,categories)}</h5>
                <div className='row'>

                
                <Rating className='col-10'
                    placeholderRating={conceptRating}
                    readonly={true}
                    emptySymbol={<AiOutlineStar id="AiOutlineStar" className='icon display-4'/>}
                    placeholderSymbol={<AiFillStar id="AiOutlineStar" className='icon text-warning display-4'/>}
                    fullSymbol={<AiFillStar id="AiOutlineStar" className='icon text-warning display-4'/>}
                />
                <button className='' onClick={()=>alertToggleShow(!alertShow)} id="editButtonConcept" ><FiEdit2 className='text-success'/></button>
                </div>
                <ShareConcepts/>

            </div>
        </div>        
        </div>


        {concept&&
        <div>

            <div className="button-container">
                    <div className="button">
                    <div className="button-text">
                    <a  target='_blank' href={concept&&concept.readMore} >
                    <BiLink  className='mx-3 m-1 text-primary' style={{"fontSize":"200%"}}>{t('show_both_definitions')} </BiLink>
                    </a>
                    </div>
                    </div>
                    <div className="button-outline"></div>
            </div>
            <div className="button-container">
                    <div className={showShortDefinition?"button button-clicked":"button"} onClick={toggleLongDefinition}>
                    <div className="button-text" >
                    <HiOutlineBars2  className=' ' style={{"fontSize":"180%"}}/>
                    </div>
                    </div>
                    <div className="button-outline"></div>
            </div>
            <div className="button-container">
                    <div className={showLongDefinition?"button button-clicked":"button"} onClick={toggleShortDefinition}>
                    <div className="button-text" >
                    <HiOutlineBars3 id='icon-clicked'  className='mx-3 m-1' style={{"fontSize":"180%"}}/> 
                    </div>
                    </div>
                    <div className="button-outline"></div>
            </div>



        </div>}
      <MDBRow className='row'>
      <div className=''>

        <MDBCol>
          <MDBCollapse id='MDBCollaps' show={showShortDefinition} className='mt-3 '>
          {concept?getDefinition(false):""}
          
          </MDBCollapse>
        </MDBCol>
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5p5qP4ic47Lxm6QkkVE_BfL_-0Yt7SmFDp0m67s&s */}
        {/* <Rating
            placeholderRating={3.5}
            emptySymbol={<AiOutlineStar id="AiOutlineStar" className='icon display-4'/>}
            placeholderSymbol={<AiFillStar id="AiOutlineStar" className='icon text-danger display-4'/>}
            fullSymbol={<AiFillStar id="AiOutlineStar" className='icon text-warning display-4'/>}
        /> */}

        {/* <table>
                <tr>
                    <td>Rating</td>
                    <td>
                        <div class="rate">
                            <input type="radio" id="star5" name="rate" value="5" />
                            <label for="star5" title="text">5 stars</label>
                            <input type="radio" id="star4" name="rate" value="4" />
                            <label for="star4" title="text">4 stars</label>
                            <input type="radio" id="star3" name="rate" value="3" />
                            <label for="star3" title="text">3 stars</label>
                            <input type="radio" id="star2" name="rate" value="2" />
                            <label for="star2" title="text">2 stars</label>
                            <input type="radio" id="star1" name="rate" value="1" />
                            <label for="star1" title="text">1 star</label>
                        </div>
                    </td>
                    
                </tr>
                
            </table> */}
        </div>
        <div className=''>
            {showLongDefinition&&<MDBCol className='scroll' id="scroll-style">
              <MDBCollapse id='MDBCollaps' show={showLongDefinition} className='mt-3 '>
              {concept?getDefinition(true):""}
              </MDBCollapse>
            </MDBCol>}
        </div>
      </MDBRow>
      {/* {(concept&&showLongDefinition)&& <a className='text-primary mt-5 p-5' target='_blank' href={concept&&concept.readMore}>{t('get_more_informations')}</a>} */}
      </div>
    </>)
}
export default Definitions