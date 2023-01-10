import { useState } from "react"
import ExitModal from '../ExitModal'
import { useNavigate } from "react-router-dom"
function Home({onStart}){
  const [isModalOpen,setIsModalOpen]=useState(false)
    const navigate=useNavigate()
    const onExit=()=>{
        setIsModalOpen(!isModalOpen)
       }
       const toggleModal=()=>{
        setIsModalOpen(!isModalOpen)
       }
    return(<>
        {isModalOpen&&<ExitModal toggleModal={toggleModal}/>}

        <div className="text-center ">
        {/* <h2 className='mt-5' id='game2-title'>TransMe</h2> */}
        <div class="flip_letters mt-90">
   <span style={{"--flip":"1"}}>T</span>
   <span style={{"--flip":"2"}}>r</span>
   <span style={{"--flip":"3"}}>a</span>
   <span style={{"--flip":"4"}}>s</span>
   <span style={{"--flip":"5","color":" rgba(219,87,5,1)"}}>M</span>
   <span style={{"--flip":"6","color":" rgba(219,87,5,1)"}}>e</span>
  </div>
        <div className="html_for_game_buttons">
        <div id="buttons_game_containet">

        
        <button className="d-" id="game2-home-button"  onClick={onStart}>Start</button>
        <button className="d-" id="game2-home-button" onClick={()=>navigate('/games/transme/settings')}>Settings</button>
        <button className="d-" id="game2-home-button" onClick={onExit}>Exit Game</button>
        </div>
        </div>
        </div>
    </>)
}
export default Home