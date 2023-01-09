import { useState } from "react"
import ExitModal from '../ExitModal'
function Home({onStart}){
  const [isModalOpen,setIsModalOpen]=useState(false)
    
    const onExit=()=>{
        setIsModalOpen(!isModalOpen)
       }
       const toggleModal=()=>{
        setIsModalOpen(!isModalOpen)
       }
    return(<>
        {isModalOpen&&<ExitModal toggleModal={toggleModal}/>}

        <div className="text-center ">
        <button className="d-" onClick={onStart}>Start</button>
        <button className="d-">Settings</button>
        <button className="d-" onClick={onExit}>Exit Game</button>
        
        </div>
    </>)
}
export default Home