// import React from 'React'
import SettingsNavbar from "../components/settings/SettingsNavbar"
import SettingsSideNavbar from "../components/SettingsSideNavbar"
import {useState} from 'react'
import SettingsHome from "../components/settings/SettingsHome"
import SettingsUsers from "../components/settings/SettingsUsers"
import SettingsConcepts from "../components/settings/SettingsConcepts"
import SettingsCategories from "../components/settings/SettingsCategories"

function Settings(){
    const [isActive,setIsActive]=useState({
        isHomeActive:true,
        isUsersActive:false,
        isConceptsActive:false,
        isCategoriesActive:false,
    })
    const {isHomeActive,isUsersActive,isConceptsActive,isCategoriesActive}=isActive
    const  onClick=()=>{
       
    }
    return (<>
    <div dir="ltr">
    <SettingsNavbar isActive={isActive} setIsActive={setIsActive}/>
        {isHomeActive&&(<SettingsHome/>)}
        {isUsersActive&&(<SettingsUsers/>)}
        {isConceptsActive&&(<SettingsConcepts/>)}
        {isCategoriesActive&&(<SettingsCategories/>)}
    </div>

    </>)
}
export default Settings