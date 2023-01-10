import '../../styles/games/game2.css'
import { useRef,useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getConceptNames4TransMeGame,getConceptNames4TransMeGameByCategoryId} from '../../features/Games/gamesSlice'
import Home from '../../components/games/transMe/Home';
import Settings from '../../components/games/transMe/Settings';
import Question from '../../components/games/transMe/Question';
import {toast} from 'react-toastify'
import { useTranslation } from 'react-i18next';

function TransMe({path}){
    const dispatch =useDispatch();
    const {t}=useTranslation();
    const {user}=useSelector(state=>state.auth);
    const {concept_names}=useSelector(state=>state.games);
    const [questionNumber,setQuestionNumber]=useState(0);
    const [categoryChanged,setCategoryChanged]=useState(false);
    const [languages,setLanguages]=useState({
        questLanguage:user.language,
        answersLanguage:(user.language==="English")?"hebrew":"English",
    })
    const [isStart,setIsStart]=useState(false)
    const [isEnd,setIsEnd]=useState(false)
    const [score,setScore]=useState(0)
    useEffect(()=>{
        dispatch(getConceptNames4TransMeGame())
        // console.log("use",user.categoryId)
        // dispatch(getConceptNames4TransMeGameByCategoryId(CategoryId))
    },[])
const onStart=()=>{

    if(concept_names.length>=10){
        setScore(0)
        setIsStart(true)
        if(!categoryChanged){
        dispatch(getConceptNames4TransMeGame())
        }
        
    }else{
        toast(t('not_enough_concepts_toast'))
    }
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
        {path=='home'&&<>

            {!isStart?
            <Home onStart={onStart}/>:
            <Question languages={languages} onNextQuestion={onNextQuestion} questionNumber={questionNumber}/>}
        </>}
        {path=='settings'&&<>
            <Settings  setCategoryChanged={setCategoryChanged} languages={languages}  setLanguages={setLanguages}/>
        </>}
        
        </div>
    </>)
}
export default TransMe