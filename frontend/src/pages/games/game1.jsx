import { useRef,useEffect,useState } from "react";
import AnimationTitle from "../../components/Animation/AnimationTitle";
import Spinner2 from "../../components/Spinners/Spinner2";
import { getConcepts4GuessTerm } from "../../features/Games/gamesSlice";
import { useDispatch , useSelector } from "react-redux";
import ExitGame from '../../components/games/ExitModal'
import './games.css'
function GuessTheTerm(){
    const dispatch=useDispatch()
    const {isGamesLoading}= useSelector(state=>state.games)
   useEffect(()=>{
    dispatch(getConcepts4GuessTerm())

   },[])
   const onExit=()=>{
    
   }
   

    return (
        <div  id='game1-body' className=' text-center'>
      {/* component content goes here */}
      
      {isGamesLoading?(<Spinner2/>):(<>
        <ExitGame/>
        <div onClick={onExit} className="text-end mx-3 text-light"><h1>X</h1></div>
        <AnimationTitle/> 
        
        </>
      )}        
      

    </div>
    );
}
export default GuessTheTerm