import React from 'react';
import { useNavigate } from 'react-router-dom'
import "../styles/Footer.css"

export default function Footer(){
    const navigate = useNavigate();
    
    return(
        <nav className="footer1">
            <input type= "radio" name="nav-item" id="m-search"/><label onClick={() => console.log('/search')} id="l1" htmlFor="m-search"/>
            <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/')} id="l2" htmlFor="m-home"/>
            <input type= "radio" name="nav-item" id="m-profile"/><label onClick={() => navigate('/profile')} id="l3" htmlFor="m-profile"/>
            
        </nav>  
    )
}