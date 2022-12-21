import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Footer.css";
import {CgGames} from 'react-icons/cg';
import {AiOutlineHome, AiOutlineSetting} from 'react-icons/ai';
import {FcAbout} from 'react-icons/fc';
import {TbPlaylistAdd} from 'react-icons/tb';


export default function Footer(){
    const navigate = useNavigate();
    
    return(
        <nav  dir='ltr'  className="footer1">
            <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/')} id="l1"><AiOutlineHome/></label>
            <input type= "radio" name="nav-item" id="m-search"/><label onClick={() => console.log('/games')} id="l2"><CgGames/></label>
            <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => console.log('/add')} id="l3"><TbPlaylistAdd/></label>
            <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/about')} id="l4"><FcAbout/></label>
            <input type= "radio" name="nav-item" id="m-profile"/><label onClick={() => console.log('/setting')} id="l5"><AiOutlineSetting/></label>
            
        </nav>  
    );
}