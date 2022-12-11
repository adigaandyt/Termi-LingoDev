import { useTranslation } from "react-i18next"
import {BiShow,BiHide} from 'react-icons/bi'
import { useState } from "react";
import "../styles/Inputs.css"
function Definitions({concept,languageChoosed}){
    const { t }=useTranslation();
    
    const [showLong,setShowLong]=useState(true)
    const [showShort,setShowShort]=useState(true)
    const [conceptName,setConceptName]=useState('')
    const onLongchange=()=>{
        if (showLong) {
            setShowLong(false)
        } else {
            setShowLong(true)
        }
    }
    const onShortchange=()=>{
        if (showShort) {
            setShowShort(false)
        } else {
            setShowShort(true)
        }
    }
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
    const getConceptName =()=>{
        
        switch(true){
            case languageChoosed.english :{
                return concept.conceptName.english
                break;
            }
            case languageChoosed.arabic :{
                return concept.conceptName.arabic
               
                break;
            }
            case languageChoosed.hebrew :{
                return concept.conceptName.hebrew
               
                break;
            }

            default:break
        }
      
        
    }

    return(<>
    <div className=" py-3 ">
        <div className="container">
            <h3 className="text-dark my-1">{concept&&getConceptName()}</h3>
            <div className="row">
                <div className="col-sm  text-start">
                    <p onClick={onShortchange}> {t("short_definition")} {showShort?<BiShow/>:<BiHide/>}</p>
                    <textarea id="definitionarea" value={concept?getDefinition(false):""}  className={showShort?"w-100 d-inline":"w-100 d-none"}  disabled/>
                </div>
                <div className="col-sm text-start">
                    <p onClick={onLongchange}> {t("long_definition")} {showLong?<BiShow/>:<BiHide/>}</p>
                    <textarea id="definitionarea" value={concept?getDefinition(true):""} className={showLong?"w-100 h-100 d-inline":"w-100 d-none"} disabled />
                </div>
            </div>
        </div>
    </div>
    </>)
}
export default Definitions