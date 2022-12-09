import { useTranslation } from "react-i18next"
import {GiSightDisabled} from 'react-icons/gi'
import {BiShow,BiHide} from 'react-icons/bi'
import { useState } from "react";
function Definitions(){
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

    return(<>
    <div className=" py-5 ">
        <div className="container">
            <div className="row">
                <div className="col-sm  text-start">
                    <p onClick={onShortchange}> {t("short_definition")} {showShort?<BiShow/>:<BiHide/>}</p>
                    <textarea  className={showShort?"w-100 d-inline":"w-100 d-none"}  disabled/>
                </div>
                <div className="col-sm text-start">
                <p onClick={onLongchange}> {t("long_definition")} {showLong?<BiShow/>:<BiHide/>}</p>
                <textarea className={showLong?"w-100 d-inline":"w-100 d-none"} disabled />

                </div>
            </div>
        </div>
    </div>
    </>)
}
export default Definitions