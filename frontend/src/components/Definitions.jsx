import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next"
import {BiShow,BiHide} from 'react-icons/bi'
import React, { useState } from 'react';
import { getConceptName,categoryById } from '../hooks/ExportsFunctions';
import "../styles/Inputs.css"
import {GrTextAlignCenter} from 'react-icons/gr'
import {RxTextAlignCenter} from 'react-icons/rx'
import {MdMoreHoriz} from 'react-icons/md'
function Definitions({concept,languageChoosed}){
    const {categories}=useSelector(state=>state.category)
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
    }
  
 
    return(<>
    <div className='text-center' dir='ltr' id="slide">
        <div className='row '>
        <div className='col-1 text-start'>
            {languageChoosed.hebrew&&<img className='mt-2 text-start ' src={require('../flags/israel-xs.gif')}/>}
            {languageChoosed.english&&<img className=' mt-2 ' src={require('../flags/united-states-xs.gif')}/>}
            {languageChoosed.arabic&&<img className='mt-2' src={require('../flags/saudi-arabia-xs.gif')}/>}
        </div>
        <div className='col-11 text-end'>
            <h3 className="text-dark mb-3 mt-2 ">{concept&&getConceptName(languageChoosed,concept)}</h3> 
            <h5>{concept&&categoryById(concept.categories[0],languageChoosed,categories)}</h5>
        </div>        
        </div>


        {concept&&
        <div>

            <div class="button-container">
                    <div class="button">
                    <div class="button-text">
                    <a  target='_blank' href={concept&&concept.readMore} >
                    <MdMoreHoriz  className='mx-3 m-1 text-primary' style={{"fontSize":"200%"}}>{t('show_both_definitions')} </MdMoreHoriz>
                    </a>
                    </div>
                    </div>
                    <div class="button-outline"></div>
            </div>
            <div class="button-container">
                    <div class={showShortDefinition?"button button-clicked":"button"} onClick={toggleLongDefinition}>
                    <div class="button-text" >
                    <RxTextAlignCenter  className=' ' style={{"fontSize":"180%"}}/>
                    </div>
                    </div>
                    <div class="button-outline"></div>
            </div>
            <div class="button-container">
                    <div class={showLongDefinition?"button button-clicked":"button"} onClick={toggleShortDefinition}>
                    <div class="button-text" >
                    <GrTextAlignCenter id='icon-clicked'  className='mx-3 m-1' style={{"fontSize":"180%"}}/> 
                    </div>
                    </div>
                    <div class="button-outline"></div>
            </div>



        </div>}
      <MDBRow className='row'>
      <div className=''>

        <MDBCol>
          <MDBCollapse id='MDBCollaps' show={showShortDefinition} className='mt-3 '>
          {concept?getDefinition(false):""}
          </MDBCollapse>
        </MDBCol>
        </div>
        <div className=''>
            {showLongDefinition&&<MDBCol class='scroll' id="scroll-style">
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