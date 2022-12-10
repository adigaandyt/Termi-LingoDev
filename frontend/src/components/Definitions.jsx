import { useTranslation } from "react-i18next"
import {BiShow,BiHide} from 'react-icons/bi'
import { useState } from "react";
function Definitions({concept,languageChoosed}){
    const { t }=useTranslation();
    
    const [showLong,setShowLong]=useState(true)
    const [showShort,setShowShort]=useState(true)
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

    return(<>
    <div className=" py-5 ">
        <div className="container">
            <div className="row">
                <div className="col-sm  text-start">
                    <p onClick={onShortchange}> {t("short_definition")} {showShort?<BiShow/>:<BiHide/>}</p>
                    <textarea value={concept&&getDefinition(false)}  className={showShort?"w-100 d-inline":"w-100 d-none"}  disabled/>
                </div>
                <div className="col-sm text-start">
                <p onClick={onLongchange}> {t("long_definition")} {showLong?<BiShow/>:<BiHide/>}</p>
                <textarea value={concept&&getDefinition(true)} className={showLong?"w-100 d-inline":"w-100 d-none"} disabled />

                </div>
            </div>
        </div>
    </div>
    </>)
}
export default Definitions