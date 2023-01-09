import '../../styles/games/game2.css'
import { useRef,useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {getConceptNames4TransMeGame} from '../../features/Games/gamesSlice'
import Home from '../../components/games/transMe/Home';
import Settings from '../../components/games/transMe/Settings';
import Question from '../../components/games/transMe/Question';


function TransMe({path}){
    const dispatch =useDispatch();
    const [questionNumber,setQuestionNumber]=useState(0)
    const [isStart,setIsStart]=useState(false)
    const [isEnd,setIsEnd]=useState(false)
    const [score,setScore]=useState(0)
    useEffect(()=>{
        console.log("saleh")
        dispatch(getConceptNames4TransMeGame())
    },[])
const onStart=()=>{
    setScore(0)
    setIsStart(true)
    dispatch(getConceptNames4TransMeGame())
}
const onNextQuestion=(isTrue)=>{
    if(questionNumber<9){
        setQuestionNumber(questionNumber+1)

    }else{
        setIsStart(false)
        setIsEnd(true)
        setQuestionNumber(0)
    }
    if(isTrue){
        setScore(score+1)
    }

}
    return(<>
        <div  id="game2">
        {isStart&&<div><h4 className="text-light text-start">Question Number: {questionNumber+1}</h4></div>}
        {!isStart&&isEnd&&<div><h4 className="text-light text-start">Score: {score}</h4></div>}
        {!isStart&&<div className='text-center' ><h2 className='mt-5' id='game2-title'>TransMe</h2></div>}
        {path=='home'&&<>

            {!isStart?
            <Home onStart={onStart}/>:
            <Question onNextQuestion={onNextQuestion} questionNumber={questionNumber}/>}
        </>}
        {path=='settings'&&<>
            <Settings/>
        </>}
        
        </div>
    </>)
}
export default TransMe