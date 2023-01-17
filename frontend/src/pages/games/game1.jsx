import { useRef,useEffect,useState,useContext ,useLayoutEffect } from "react";
import AnimationTitle from "../../components/Animation/AnimationTitle";
import Spinner2 from "../../components/Spinners/Spinner2";
import { getConcepts4GuessTerm,setGuessTheTermGameResult } from "../../features/Games/gamesSlice";
import {setCoins,reset, getTop5Users} from '../../features/auth/authSlice'
import {getConceptsNames} from '../../features/concepts/conceptSlice'
import {getConcepts4GuessTermByCategoryId} from '../../features/Games/gamesSlice'
import { useDispatch , useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ExitGame from '../../components/games/ExitModal'
import GamesContext from '../../hooks/gamesContext';
import './games.css'
import Qestion from "../../components/games/guessTheTerm/Question";
import GroupButtons from "../../components/games/GroupButtons";
// import Timer from "../../components/games/guessTheTerm/Timer";
import { useTranslation } from "react-i18next";
import {TbArrowBackUp} from 'react-icons/tb'
import { getCategoryName } from "../../hooks/ExportsFunctions";
import {FiSave} from 'react-icons/fi';
import {AiFillSound} from 'react-icons/ai';
import { toast } from "react-toastify";
import {Howl} from "howler";
import Win from './win.wav';
import Timer from '../Timer';
import Coins from "../../components/coins";
import UserList from "../../components/UserList";





function GuessTheTerm({page}){
  // const [rand1,createRand1]=useRandom()
  const {t}=useTranslation()
  const {getquestionList,questionsList} = useContext(GamesContext);
  
  const [isModalOpen,setIsModalOpen]=useState(false)

  const [isStart,setIsStart]=useState(false)
  const [isEnd,setIsEnd]=useState(false)
  const [score,setScore]=useState(0)
  const [questionNumber,setQuestionNumber]=useState(0);
  const [gameResultList,setGameResultList]=useState([])
  // const [gameResult,setGameResult]=useState({
  //   gameResultList:[],
  //   score:0,
  //   date:new Date().getDate(),

  // })
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const {isGamesLoading,user_concepts}= useSelector(state=>state.games)
    const {user} =useSelector(state=>state.auth)
    const {categories} =useSelector(state=>state.category)
    const {names}=useSelector(state=>state.concept)
    const [languageChoosed,setLanguageChoosed]=useState(user.language)
    const [categoryId,setCategoryId]=useState(null);
    const [highScore, setHighScore] = useState();
    const [feedScore, setFeedScore] = useState();
    const [feedColor, setFeedColor] = useState();
    const [audio, setAudio] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    
    const handleStart = () => {
      setIsActive(true);
      setIsPaused(false);
    };
    
    
    const handleReset = () => {
      setIsActive(false);
      setTime(0);
      // console.log(`${time/1000}`)
      // toast.error(`you have finish in ${time/1000}`)
      if((time/1000) > 60){
        console.log(`${time/60000} min`)
        toast(`you have finish in ${(time/60000)} min` )
      }
      else{
        console.log(`${time/1000} sec`)
        toast(`you have finish in ${time/1000} sec`)
      }
    };
    const playSound = (src) => {
        setAudio(new Howl({ src }));
    };
    
   useEffect(()=>{
    dispatch(getConcepts4GuessTerm())
    dispatch(getConceptsNames())
    // dispatch(getTop5Users())
    // start game sound yahia
    
   },[]);
   useLayoutEffect(()=>{
    if(gameResultList.length>0){
      //call the function (useEffect) yahia
      if (audio) {
        audio.play();
      }
      playSound(Win);
      onEndGame();
      handleReset();
    }
   },[isEnd])
   ///// useState for timer /////////////
   useLayoutEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  
   const onExit=()=>{
    setIsModalOpen(!isModalOpen)
   }
   const toggleModal=()=>{
    setIsModalOpen(!isModalOpen)
   }
   const start=()=>{
    if((user_concepts&&user_concepts.user_concepts.length>10&&names)){
      getquestionList(user_concepts)
      setScore(0)
      setIsStart(true)
      setIsEnd(false)
      setGameResultList([])
      handleStart();
      }

      if(user_concepts.user_concepts.length<10){
        toast(t('not_enough_concepts_toast'))

      }


   }
   const  onNewQuestResult=(questresult)=>{
     setGameResultList([
      ...gameResultList, questresult
  ])
   }
   const onNextQestion =(isTrue)=>{
    if(isTrue){
      setScore(score+1)
    }
    if(questionNumber<9)
    setQuestionNumber(questionNumber+1)
    else{
      getquestionList(user_concepts)
      setIsStart(false)
      setIsEnd(true)
      setQuestionNumber(0)
      // setGameResult((prev)=>{
      //   return({
      //     ...prev,
      //     gameResultList:gameResultList,
      //     score:isTrue?(score+1):(score)
      //   })
      // })
      // console.log(gameResultList)

      // send the score
      {isTrue?console.log(score+1):console.log(score)}
      
      
  
    }
    if(isTrue){
      setScore(score+1)
    }
   }

   const onSave=(e)=>{
    e.preventDefault()
    if(categoryId){
      dispatch(getConcepts4GuessTermByCategoryId(categoryId))
      setCategoryId(null)
    }else{
      toast(t('changeing_message'))
    }
    
console.log(categoryId)
   }
   const onEndGame=()=>{
    if(score>6){
      //sound yahia
      setHighScore("true")
      setFeedScore(t('excelant'))
      setFeedColor("text-success")
    }else{
      setHighScore("false")
      setFeedScore(t("good job"))
      setFeedColor("text-warning")
    }
    const date=new Date()
    const game={
          gameResultList:gameResultList,
          score:score,
          date:`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`,
          language:languageChoosed,
          categoryId:categoryId
          }
          dispatch(setGuessTheTermGameResult(game))
          dispatch(setCoins({score:score}))
          dispatch(reset())

   }
    return (
     
        
        <div dir="ltr"  id='game1-body' className=' '>
      
      {isGamesLoading?(<Spinner2/>):(<>
        {isModalOpen&&<ExitGame toggleModal={toggleModal}/>}
        
        {page==='home'&&(<>
          <div>

        {/* {isStart&&<div className="row mt-2">
        
        <div className="col-6">
        <h5 className="text-light  text-start mx-2 ">Qusetion Number{questionNumber+1}</h5>
        </div>
        <div className="col-6">
        <Timer className="col-1 my-2" onNextQestion={onNextQestion}/> 
        </div>
        </div>
        }  */}
        {!isStart&&<div dir='ltr'>
                      <h5 className="text-light text-start mx-2 mt-2">{t('score')}: {score}</h5>
                      <span><h4 className={`text-start mt-2 ${feedColor}`}>{feedScore}</h4></span>
                    </div>}
                
        </div>
        {!isStart&&<AnimationTitle text1='Guess' text2='The' text3='Term'/>} 

        <div className="question text-center">

          {!isStart&&<>
            <GroupButtons start={start} onExit={onExit} isEnd={isEnd}/>
            {isEnd&&<Coins/>}
            
          </> }

         {isStart&&
          <Qestion onNewQuestResult={onNewQuestResult}  questionNumber={questionNumber} languageChoosed={languageChoosed} onNextQestion={onNextQestion} question={questionsList.length>0&&questionsList[questionNumber]}/>
         }
 
          
        </div>

          
</>)}
{page==='top5'&&(<>

<div>

<div className="text-center mt-3">
<h1 className="display-2"><spam className='text-danger'>The</spam> <spam className='text-success'>Top 5</spam> <spam className='text-warning'>Users</spam></h1>
<div className="w-25 text-end ">

<Link to='/games/gesstheterm' id="settings-guesstheterm-button" className="btn text-warning" ><TbArrowBackUp className="display-5"/> </Link>
</div>
</div>
<div className="text-center mt-80 ">


</div>
       
<UserList/>
</div>
<div className="text-center">
</div>

</>)}
{page==='settings'&&(<>
  <AnimationTitle className='mt-5' text1={t('update')} text2={t('your')} text3={t('settings')}/> 

  <div id='guesstheterm-settings' className="text-light  mt-5">
      <div className="w-25  text-end">
        <Link to='/games/gesstheterm' id="settings-guesstheterm-button" className="btn "><TbArrowBackUp className="display-5"/> </Link>
      </div>
      <div  className="text-center">
        <div className="mt-3  ">
          <select onChange={(e=>setLanguageChoosed(e.target.value))}  name='languageChoosed' className="select-language-guesstheterm" defaultValue={languageChoosed} id="floatingSelectGrid"  aria-label="Language">
              <option value="English">English</option> 
              <option value="العربية">العربية</option>
              <option value="עברית">עברית</option>
          </select>
        </div>
        <div className="mt-3  ">
          <select onChange={(e)=>setCategoryId(e.target.value)} defaultValue='Category' name='newLanguage' className="select-language-guesstheterm" id="floatingSelectGrid"  aria-label="Language">
          <option disabled>Category</option> 
          <hr />
          {(categories)&&
            categories.map(category=>{
            return(category.accepted&&<option value={category._id}>{getCategoryName(category.categoryName)}</option>)
            })
        }
          </select>
        </div>
        <div class="form-check form-switch text-center mt-3">

          <label>
          <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
          <h4 className="d-inline-block sound-sittings-guesstheterm ">{t('sound')}    <AiFillSound className="mx-2"/></h4>
          

          </label>
        </div>
        <button onClick={onSave} className="btn mt-3" id="settings-guesstheterm-button"><FiSave className="display-5"/></button>
      </div>

  
  
  </div>


</>)}
        </>)}
    </div>
 
    );
}
export default GuessTheTerm


