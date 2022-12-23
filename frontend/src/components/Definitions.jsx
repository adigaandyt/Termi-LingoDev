import { MDBCollapse, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next"
import {BiShow,BiHide} from 'react-icons/bi'
import React, { useState } from 'react';
import { getConceptName } from '../hooks/ExportsFunctions';
import "../styles/Inputs.css"
function Definitions({concept,languageChoosed}){
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
  
    const toggleLongDefinition = () => setShowShortDefinition(!showShortDefinition);
    const toggleShortDefinition = () => setShowLongDefinition(!showLongDefinition);
  
    const toggleBothDefinitions = () => {
      setShowShortDefinition(!showShortDefinition);
      setShowLongDefinition(!showLongDefinition);
    };
    return(<>
    <div className='text-center'>
        <h3 className="text-dark my-3">{concept&&getConceptName(languageChoosed,concept)}</h3>
        {concept&&
        <div>
            <button onClick={toggleLongDefinition} className='btn btn-primary m-1'>{showShortDefinition?<BiShow style={{"fontSize":"180%"}}/>:<BiHide style={{"fontSize":"180%"}}/>} {t('short_definition')}</button>
            <button onClick={toggleShortDefinition} className='btn btn-primary m-1'>{showLongDefinition?<BiShow style={{"fontSize":"180%"}}/>:<BiHide style={{"fontSize":"180%"}}/>}  {t('long_definition')}</button>
            <button onClick={toggleBothDefinitions} className='btn btn-dark m-1'>{t('show_both_definitions')}</button>
        </div>}
      <MDBRow className='row'>
      <div  className='col-sm-6'>

        <MDBCol>
          <MDBCollapse show={showShortDefinition} className='mt-3'>
          {concept?getDefinition(false):""}
          </MDBCollapse>
        </MDBCol>
        </div>
        <div  className='col-sm-6'>
        <MDBCol>
          <MDBCollapse show={showLongDefinition} className='mt-3'>
          {concept?getDefinition(true):""}
          </MDBCollapse>
        </MDBCol>
        </div>
      </MDBRow>
      {(concept&&showLongDefinition)&& <a className='text-primary mt-5 p-5' target='_blank' href={concept&&concept.readMore}>{t('get_more_informations')}</a>}
      </div>
    </>)
}
export default Definitions