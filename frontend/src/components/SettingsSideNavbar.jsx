import React, { useState,useRef } from 'react';
import {FaUserAlt} from 'react-icons/fa'
import {AiFillSound} from 'react-icons/ai'
import {FiMenu} from 'react-icons/fi'
import '../styles/Setting.css'
function SettingsSideNavbar(){
    const elementRef=useRef(null);
    const onClick=()=>{
      const element = elementRef.current;
    
      // Toggle the "active" class on the element
      element.classList.toggle("active");
    }
    return (<>
<div ref={elementRef} id="wrapper2" dir='ltr' className="">
      <div id="sidebar-wrapper2">
      <ul id="sidebar_menu2" className="sidebar-nav2">
           <li className="sidebar-brand2"><a onClick={onClick} id="" >Settings<span id="main_icon2" className="sub_icon2 glyphicon2 glyphicon-link2"><FiMenu/></span></a></li>
      </ul>
        <ul className="sidebar-nav2" id="sidebar2">     
          <li><a>User<span className="sub_icon2 glyphicon2 glyphicon-link2 "><FaUserAlt className='d-inline-block '/> </span></a></li>
          <li><a>Sound<span className="sub_icon2 glyphicon2 glyphicon-link2"><AiFillSound/></span></a></li>
        </ul>
      </div>
</div>
    </>)
}
export default SettingsSideNavbar