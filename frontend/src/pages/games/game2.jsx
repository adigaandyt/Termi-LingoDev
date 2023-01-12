import '../../styles/games/game2.css'
import { useRef,useEffect, useState,useLayoutEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getConceptNames4TransMeGame,setTransMeGameResult} from '../../features/Games/gamesSlice'
import Home from '../../components/games/transMe/Home';
import Settings from '../../components/games/transMe/Settings';
import Question from '../../components/games/transMe/Question';
import {toast} from 'react-toastify'
import { useTranslation } from 'react-i18next';
import TransMeSpinner from '../../components/Spinners/TransMeSpinner';

function TransMe({path}){
    const dispatch =useDispatch();
    const {t}=useTranslation();
    const {user}=useSelector(state=>state.auth);
    const {concept_names,isGamesLoading}=useSelector(state=>state.games);
    const [questionNumber,setQuestionNumber]=useState(0);
    const [startGameTime,setStartGameTime]=useState()
    const [categoryId,setCategoryId]=useState(null)//used just in the getCategoryId function !
    const [categoryChanged,setCategoryChanged]=useState(false);
  const [gameResultList,setGameResultList]=useState([]);
    const [languages,setLanguages]=useState({
        questLanguage:user.language,
        answersLanguage:null,
    })
    const [isStart,setIsStart]=useState(false)
    const [isEnd,setIsEnd]=useState(false)
    const [score,setScore]=useState(0)
    useEffect(()=>{
        dispatch(getConceptNames4TransMeGame())
        // console.log("use",user.categoryId)
        // dispatch(getConceptNames4TransMeGameByCategoryId(CategoryId))

    },[])
    useLayoutEffect(()=>{
        if(gameResultList.length>0){
          //call the function (useEffect) yahia
        //   if (audio) {
        //     audio.play();
        //   }
        //   playSound(Win);
          onEndGame();
        }
       },[isEnd])
    const getCategoryId=(categoryId)=>{
        setCategoryId(categoryId)
       }
    const  onNewQuestResult=(questresult)=>{
        setGameResultList([
         ...gameResultList, questresult
     ])
    //  console.log(gameResultList)
    }

const onStart=()=>{
    if(languages.answersLanguage){
    if(concept_names.length>=10){
        const date=new Date()
        setStartGameTime(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        setGameResultList([])
        setScore(0)
        setIsEnd(false)
        setIsStart(true)
        if(!categoryChanged){
        dispatch(getConceptNames4TransMeGame())
        }
        
    }else{
        toast(t('not_enough_concepts_toast'))
    }        
    }else{
        toast("choose language to play")
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
const onEndGame=()=>{
    const date=new Date()
    const game={
          gameResultList:gameResultList,
          score:score,
          date:`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`,
          startGame:startGameTime,
          questionLanguage:languages.questLanguage,
          answerLanguage:languages.answersLanguage,
          categoryId:categoryId?categoryId:user.categoryId
          }
    // console.log(game)
    dispatch(setTransMeGameResult(game))
}

    return(<>
    
        <div  id="game2">
        {isGamesLoading?<TransMeSpinner/>:<>
        {isStart&&<div><h4 className="text-light text-start">Question Number: {questionNumber+1}</h4></div>}
        {!isStart&&isEnd&&<div><h4 className="text-light text-start">Score: {score}</h4></div>}
        {path=='home'&&<>

            {!isStart?
            <Home onStart={onStart} answersLanguage={languages.answersLanguage} questLanguage={languages.questLanguage} setLanguages={setLanguages}/>:
            <Question  languages={languages} onNextQuestion={onNextQuestion} questionNumber={questionNumber} onNewQuestResult={onNewQuestResult}/>}
        </>}
        {path=='settings'&&<>
            <Settings  setCategoryChanged={setCategoryChanged} languages={languages}  setLanguages={setLanguages} getCategoryId={getCategoryId}/>
        </>}

        </>}

        
        </div>
    </>)
}
export default TransMe