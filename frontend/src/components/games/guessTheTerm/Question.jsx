import { useContext, useEffect, useState } from "react"
import GamesContext from "../../../hooks/gamesContext"
import Timer from "./Timer";
import Button from "../Button";


function getRandomNumber() {
    // console.log(array)
    const randomIndex = Math.floor(Math.random() * 4);
    return randomIndex;
  }
function getRelevantLanguage(object,language){

    switch(language){
        case 'English':{
            return object.english
            break;
        }
        case 'العربية':{
            return object.arabic
            break;
        }
        case 'עברית':{
            return object.hebrew
            break;
        }
        default:{
            break;
        }
    }

}
function Qestion({question,onNextQestion,languageChoosed,questionNumber,onNewQuestResult}){
    // const {gameResultList,setGameResultList}=useContext(GamesContext)
    const [randomPosition,setRandomPosition]=useState(0)
    const [time,setTime]=useState(0)
    const [correctBtnColor, setCorrectBtnColor] = useState();
    const [inCorrectBtnColor, setInCorrectBtnColor] = useState();
    function wait(callback) {
        setTimeout(() => {
          callback('waited one second');
        }, 1000);
    }
    useEffect(()=>{
     const result=getRandomNumber();
     setRandomPosition(result)

    },[question])
    const onClick= async(e)=>{
        setCorrectBtnColor("green")
        setInCorrectBtnColor("red")
        const iscorrect= e.target.name==randomPosition
        const date=new Date();
        const questionResult={
            questionNumber:questionNumber+1,
            shorDefinition:question.shortDefinition.english,
            isCorrect:iscorrect,
            currentTime:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        }
       await onNewQuestResult(questionResult)
        //sound when click yahia 
        // stop one secound
        //red\green
        //iscorrect true\false (correct answer)
        wait(result => {
            setCorrectBtnColor()
            setInCorrectBtnColor()
            console.log(iscorrect)
            onNextQestion(iscorrect)
        }); 
        onNextQestion(iscorrect)
    }
    return(<>
   <div id="answers-buttons" className='row '>
    <div className="row mt-2">
        
        <div className="col-6">
        <h5 className="text-light  text-start mx-2 ">Qusetion Number{questionNumber+1}</h5>
        </div>
        <div className="col-6">
        <Timer className="col-1 my-2"  onNextQestion={onNextQestion}/> 
        </div>
        </div>
    
    <h3 id="shortDefinition-game1">{getRelevantLanguage(question.shortDefinition,languageChoosed)}</h3>

    <button className="big-button my-3" name={0} onClick={onClick} style={{ backgroundColor: randomPosition === 0 ? correctBtnColor : inCorrectBtnColor }}>{randomPosition===0 ?getRelevantLanguage(question.correctAnswer,languageChoosed):getRelevantLanguage(question.wrongAnswer1,languageChoosed)}</button>
    <button className="big-button my-3" name={1} onClick={onClick} style={{ backgroundColor: randomPosition === 1 ? correctBtnColor : inCorrectBtnColor }}>{randomPosition===1 ?getRelevantLanguage(question.correctAnswer,languageChoosed):getRelevantLanguage(question.wrongAnswer2,languageChoosed)}</button>
    <button className="big-button my-3" name={2} onClick={onClick} style={{ backgroundColor: randomPosition === 2 ? correctBtnColor : inCorrectBtnColor }}>{randomPosition===2 ?getRelevantLanguage(question.correctAnswer,languageChoosed):getRelevantLanguage(question.wrongAnswer3,languageChoosed)}</button>
    <button className="big-button my-3" name={3} onClick={onClick} style={{ backgroundColor: randomPosition === 3 ? correctBtnColor : inCorrectBtnColor }}>{randomPosition===3 ?getRelevantLanguage(question.correctAnswer,languageChoosed):getRelevantLanguage(question.wrongAnswer4,languageChoosed)}</button>  

    </div>
    </>)
}
export default Qestion