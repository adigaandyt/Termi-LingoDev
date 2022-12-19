import React from 'react';

import "../styles/Footer.css"

export default function Footer(){
    const onClick = () => {
        console.log("home")
    }
    const onProfile = () => {
        console.log('/profile')
    }
    return(
        <nav className="footer1">
            <input type= "radio" name="nav-item" id="m-search"/><label onClick={onClick} id="l1" for="m-search"/>
            <input type= "radio" name="nav-item" id="m-home"/><label onClick={onClick} id="l2" for="m-home"/>
            <input type= "radio" name="nav-item" id="m-profile"/><label onClick={onProfile} id="l3" for="m-profile"/>
            
        </nav>  
    )
}