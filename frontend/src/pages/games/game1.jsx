import { useRef,useEffect } from "react";
import AnimationTitle from "../../components/Animation/AnimationTitle";
import Spinner2 from "../../components/Spinners/Spinner2";
import { getConcepts4GuessTerm } from "../../features/Games/gamesSlice";
import { useDispatch , useSelector } from "react-redux";
import './games.css'
function GuessTheTerm(){
    const dispatch=useDispatch()
    const {isGamesLoading}= useSelector(state=>state.games)
    const componentRef = useRef(null);
   useEffect(()=>{
    componentRef.current.requestFullscreen();
    dispatch(getConcepts4GuessTerm())

   },[])
   const onExit=()=>{

   }
   
    return (
        <div ref={componentRef} id='game1-body' className='mt-150  text-center'>
      {/* component content goes here */}
        <div onClick={onExit} className="text-end mx-3 text-light"><h1>X</h1></div>
        <AnimationTitle/>
        {/* <Spinner2/> */}
    </div>
    );
}
export default GuessTheTerm