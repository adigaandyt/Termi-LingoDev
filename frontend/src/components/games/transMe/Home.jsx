import { useState } from "react";
import ExitModal from '../ExitModal';
import { useNavigate } from "react-router-dom";
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
function Home({onStart,answersLanguage,questLanguage,setLanguages}){
  const {t}=useTranslation();
  const [isModalOpen,setIsModalOpen]=useState(false)
    const navigate=useNavigate()
    const onExit=()=>{
        setIsModalOpen(!isModalOpen)
       }
       const toggleModal=()=>{
        setIsModalOpen(!isModalOpen)
       }
       const onChangeLanguage =(e)=>{
            setLanguages((prev)=>{
                return({
                    ...prev,
                    [e.target.name]:e.target.value
                })
            })
       }
    return(<>
        {isModalOpen&&<ExitModal toggleModal={toggleModal}/>}

        <div className="text-center ">
        {/* <h2 className='mt-5' id='game2-title'>TransMe</h2> */}
        <div dir='ltr'  class="flip_letters mt-90">
   <span style={{"--flip":"1"}}>T</span>
   <span style={{"--flip":"2"}}>r</span>
   <span style={{"--flip":"3"}}>a</span>
   <span style={{"--flip":"4"}}>n</span>
   <span style={{"--flip":"5"}}>s</span>
   <span style={{"--flip":"6","color":" rgba(219,87,5,1)"}}>M</span>
   <span style={{"--flip":"7","color":" rgba(219,87,5,1)"}}>e</span>
  </div>
          <div dir='ltr' className="mt-5   row">
            <div className="col-5 text-end">
            <select   name="questLanguage" onChange={onChangeLanguage} className="text-end select-game2-lang"  id="floatingSelectGrid"  aria-label="Language">
              <option disabled={(answersLanguage==="English")?true:false}   value="English">English</option> 
              <option disabled={(answersLanguage==="العربية")?true:false}  value="العربية">العربية</option>
              <option disabled={(answersLanguage==="עברית")?true:false}  value="עברית">עברית</option>
          </select>
            </div>
            <div className="col-2 text-center">
            <BsFillArrowRightCircleFill className=' display-6 text-primary' />
            </div>
            <div className="col-5 text-start">
            <select  name='answersLanguage' onChange={onChangeLanguage}  className="text-end select-game2-lang"  id="floatingSelectGrid"  aria-label="Language">
              <option disabled={(questLanguage==="English")?true:false}  value="English">English</option> 
              <option disabled={(questLanguage==="العربية")?true:false} value="العربية">العربية</option>
              <option disabled={(questLanguage==="עברית")?true:false} value="עברית">עברית</option>
          </select>
            </div>
        </div>
        <div className="html_for_game_buttons">
        <div id="buttons_game_containet">
        <button className="d-" id="game2-home-button"  onClick={onStart}>{t('start')}</button>
        <button className="d-" id="game2-home-button" onClick={()=>navigate('/games/transme/settings')}>{t('settings')}</button>
        <button className="d-" id="game2-home-button" onClick={onExit}>{t('exit-game')}</button>
        </div>
        </div>
        </div>
    </>)
}
export default Home