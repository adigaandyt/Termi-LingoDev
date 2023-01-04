import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import "../styles/Footer.css";
import {CgGames} from 'react-icons/cg';
import {AiOutlineHome, AiOutlineSetting} from 'react-icons/ai';
import {FcAbout} from 'react-icons/fc';
import {TbPlaylistAdd} from 'react-icons/tb';
import {VscQuestion} from 'react-icons/vsc';


export default function Footer(){
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <nav  dir='ltr'  className="footer1">
            <div className="d-flex justify-content-between"> 

                <div className='mx-1 flex-item text-center' id={location.pathname==='/new/concept' ? 'input-clicked' : undefined}>
                    <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/new/concept')} id="l3"><TbPlaylistAdd/></label>
                </div>

                <div className=' flex-item' id={location.pathname==='/games' ? 'input-clicked' : undefined}>
                    <input type= "radio" name="nav-item" id="m-search"/><label onClick={() => navigate('/games')} id="l2"><CgGames/></label>
                </div>

                <div className=' flex-item' id={location.pathname==='/' ? 'input-clicked' : undefined}>
                    <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/')} id="l1"><AiOutlineHome/></label>
                </div>

                <div className=' flex-item' id={location.pathname==='/about' ? 'input-clicked': undefined}>
                    <input type= "radio" name="nav-item" id="m-home"/><label onClick={() => navigate('/about')} id="l4"><VscQuestion/></label>
                </div>

                <div className='mx-1 flex-item' id={location.pathname==='/setting' ? 'input-clicked' : undefined}>
                    <input type= "radio" name="nav-item" id="m-profile"/><label onClick={() => navigate('/settings')} id="l5"><AiOutlineSetting/></label>
                </div>

            </div>
      
           
            
        </nav>  
    );
}