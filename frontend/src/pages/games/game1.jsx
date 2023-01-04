import { useRef,useEffect,useState,useContext  } from "react";
import AnimationTitle from "../../components/Animation/AnimationTitle";
import Spinner2 from "../../components/Spinners/Spinner2";
import { getConcepts4GuessTerm } from "../../features/Games/gamesSlice";
import {getConceptsNames} from '../../features/concepts/conceptSlice'

import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExitGame from '../../components/games/ExitModal'
import GamesContext from '../../hooks/gamesContext';
import { GamesProvider } from "../../hooks/gamesContext"; 
import { useRandom } from "../../hooks/customHooks/useRandom";
import {useGame} from '../../hooks/useGame'
import './games.css'
import Qestion from "../../components/games/guessTheTerm/Question";
import GroupButtons from "../../components/games/GroupButtons";


function GuessTheTerm(){
  // const [rand1,createRand1]=useRandom()
  const {term,getquestionList,questionsList} = useContext(GamesContext);
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [isStart,setIsStart]=useState(false)
  const [isEnd,setIsEnd]=useState(false)
  const [score,setScore]=useState(0)
  const [questionNumber,setQuestionNumber]=useState(0);
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const {isGamesLoading,user_concepts}= useSelector(state=>state.games)
    const {names}=useSelector(state=>state.concept)
   useEffect(()=>{
    dispatch(getConcepts4GuessTerm())
    dispatch(getConceptsNames())
   },[]);
   const onExit=()=>{
    setIsModalOpen(!isModalOpen)
   }
   const toggleModal=()=>{
    setIsModalOpen(!isModalOpen)
   }
   const start=()=>{
    console.log("satart")
    if((user_concepts&&names)){
      getquestionList(user_concepts)
      }else{
        navigate('/games')
      }
      setIsStart(true)
   }
   const onNextQestion =(isTrue)=>{
    console.log(isTrue)
    if(questionNumber<9)
    setQuestionNumber(questionNumber+1)
    else{
      setIsStart(false)
      setIsEnd(true)
    }
    if(isTrue){
      setScore(score+1)
    }
   }
    return (
     
   
        <div  id='game1-body' className=' text-center'>

      
      {isGamesLoading?(<Spinner2/>):(<>
        {isModalOpen&&<ExitGame toggleModal={toggleModal}/>}
        <AnimationTitle/> 
        <div>
        {isStart&&<h5 className="text-light text-start mx-2 mt-2">Qusetion Number {questionNumber+1}</h5>} 
        {isEnd&&<h5 className="text-light text-start mx-2 mt-2">Score:{score}</h5>}         
        </div>

        <div className="question text-center">
          {/* {!isStart&&
          <>
          {!isEnd?<button onClick={start}>start</button>:<button>Play Again</button> } 
          <button onClick={onExit}>Exit Game</button>         
          </>} */}
          {!isStart&&<GroupButtons start={start} onExit={onExit} isEnd={isEnd}/> }

         {isStart&& <Qestion onNextQestion={onNextQestion} question={questionsList.length>0&&questionsList[questionNumber]}/>}
 
          
        </div>
        </>)}
    </div>
 
    );
}
export default GuessTheTerm


