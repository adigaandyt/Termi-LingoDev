import { useTranslation } from 'react-i18next';
import{ MdFavorite } from 'react-icons/md';
import{ BsTranslate } from 'react-icons/bs';
import { BiTransferAlt } from 'react-icons/bi';
import { SiGoogletranslate } from 'react-icons/si';
import {AiFillFacebook} from'react-icons/ai'
import {BsTwitter} from'react-icons/bs'
import {BsLinkedin} from'react-icons/bs'
import '../styles/About.css'
// warning success danger dark light primary
function About(){
  const {t}=useTranslation();
    return (<>
    
    <div className="about-container bg-darks">
      <div className="about-header">
        <h1 className="about-title">{t('about_app')}</h1>
        <BsTranslate className='text-green' id='app-logo-about'/>
      </div>
      
      <p className="about-description">
      {t('about_phrase1')}
      </p>
          <h2 className="about-features-title">{t('features')}</h2>
      <ul className="about-features-list">
        <li className="about-feature">
         <BsTranslate className='text-info' />
          <span className="about-feature-text">{t('support')} </span>
        </li>
        <li className="about-feature">
          <BiTransferAlt className='text-primary' />
          <span className="about-feature-text">{t('instant')}</span>
        </li>
        <li className="about-feature">
          <MdFavorite className='text-danger' />
          <span className="about-feature-text">{t('ability_to')}</span>
        </li>
      </ul>
      <p className="about-credits">Created by LingoDev team</p>
    </div>
    <div className="container mt-5 py-5 text-center">
        <div className="container">
  
</div>

    </div>
    <div className='text-center' id='procards'>
      <div className="procard">
                <img src= "khaled.jpg" className="Profile-pic" alt="profile" />
                <h4>Andy Thaok</h4>
                <p className="protitle"> Product Owner</p>
                <p>contact : andy@gmail.com</p>
                <a href="https://www.facebook.com/"><i><AiFillFacebook/></i></a>
                <a href="https://twitter.com/"><i><BsTwitter/></i></a>
                <a href="https://il.linkedin.com/"><i><BsLinkedin/></i></a>
                
              </div>
              <div className="procard">
                <img src= "khaled.jpg" className="Profile-pic" alt="profile" />
                <h4>Saleh Fares</h4>
                <p className="protitle"> Scram Master <br></br> BackEnd Developer</p>
                <p>contact : saleh@gmail.com</p>
                <a href="https://www.facebook.com/"><i><AiFillFacebook/></i></a>
                <a href="https://twitter.com/"><i><BsTwitter/></i></a>
                <a href="https://il.linkedin.com/"><i><BsLinkedin/></i></a>
                
              </div>
              <div className="procard">
                <img src= "khaled.jpg" className="Profile-pic" alt="profile" />
                <h4>Yahia Bdarne</h4>
                <p className="protitle"> FrontEnd Developer</p>
                <p>contact : yahia@gmail.com</p>
                <a href="https://www.facebook.com/"><i><AiFillFacebook/></i></a>
                <a href="https://twitter.com/"><i><BsTwitter/></i></a>
                <a href="https://il.linkedin.com/"><i><BsLinkedin/></i></a>
                
              </div>
              <div className="procard">
                <img src= "khaled.jpg" className="Profile-pic" alt="profile" />
                <h4>Nemer Naamneh</h4>
                <p className="protitle"> BackEnd Developer</p>
                <p>contact : nemer@gmail.com</p>
                <a href="https://www.facebook.com/"><i><AiFillFacebook/></i></a>
                <a href="https://twitter.com/"><i><BsTwitter/></i></a>
                <a href="https://il.linkedin.com/"><i><BsLinkedin/></i></a>
                
              </div>
              <div className="procard">
                <img src= "khaled.jpg" className="Profile-pic" alt="profile" />
                <h4>Khaled Alomari</h4>
                <p className="protitle"> QA <br/> Scrip Tester</p>
                <p>contact : khaled@gmail.com</p>
                <a href="https://www.facebook.com/"><i><AiFillFacebook/></i></a>
                <a href="https://twitter.com/"><i><BsTwitter/></i></a>
                <a href="https://il.linkedin.com/"><i><BsLinkedin/></i></a>
                
              </div>

              
      </div>
    
    </>)
}
export default About 

  