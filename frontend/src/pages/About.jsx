import { useTranslation } from 'react-i18next';
import{ MdFavorite } from 'react-icons/md';
import{ BsTranslate } from 'react-icons/bs';
import { BiTransferAlt } from 'react-icons/bi';
import { SiGoogletranslate } from 'react-icons/si';
import '../styles/About.css'
// warning success danger dark light primary
function About(){
  const {t}=useTranslation();
    return (<>
    
    <div className="about-container bg-darks">
      <div className="about-header">
        <h1 className="about-title">{t('about_app')}</h1>
        <SiGoogletranslate className='text-green' id='app-logo-about'/>
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
    </>)
}
export default About 

  