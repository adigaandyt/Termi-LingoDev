import { useEffect, useState ,useLayoutEffect } from "react";
import { useSelector } from "react-redux"
import {GrStatusGood} from 'react-icons/gr'
import {Howl, Howler} from "howler";
import {ImSad2} from 'react-icons/im'
import transme_correct_sound from '../../../mp3/transme_correct_sound.wav'
import transme_incorrect_sound from '../../../mp3/transme_incorrcet_sound.wav'

function getRandomWrongAnswer(object){
    const randomIndex = Math.floor(Math.random() * object.length);
    return randomIndex;
}
function getRandomCorrectAnswer(){
    const randomIndex = Math.floor(Math.random() *4);
    return randomIndex;
}
function getRelevanteLang(object,language){
    // console.log(language)
    switch(language){
        case 'English':{
            return object.english;
        }
        case 'العربية':{
            return object.arabic;
        }
        case 'עברית':{
            return object.hebrew;
        }
        default:{
            break;
        }
    }
}

function Question({languages,onNextQuestion,questionNumber,onNewQuestResult}){
    const {concept_names}=useSelector(state=>state.games)
    const {names}=useSelector(state=>state.concept)
    const [randomPosition,setRandomPosition]=useState()
    const [correctBtnColor, setCorrectBtnColor] = useState();
    const [inCorrectBtnColor, setInCorrectBtnColor] = useState();
    const [isDesabled, setIsDesabled] = useState(false);
    const [audio, setAudio] = useState(null);
    const playSound = (src) => {
        setAudio(new Howl({ src }));
    };
    const [randoms,setRandoms]=useState({
        rand1:0,
        rand2:0,
        rand3:0,
        rand4:0,
    })
    const {rand1,rand2,rand3,rand4}=randoms
    const {questLanguage,answersLanguage}=languages


    useEffect(()=>{
        const x=getRelevanteLang(concept_names[questionNumber].conceptName,languages.answersLanguage)
        console.log(x)
        setRandomPosition(getRandomCorrectAnswer())
        setRandoms(()=>{
            return({
                rand1:getRandomWrongAnswer(names),
                rand2:getRandomWrongAnswer(names),
                rand3:getRandomWrongAnswer(names),
                rand4:getRandomWrongAnswer(names),
            })
        })
  
    },[questionNumber])
    useLayoutEffect(() => {
        if (audio) {
        audio.play();
        }
    }, [audio]);

    const onClick=(e)=>{
        const isCorrect=e.target.name==randomPosition
        
        setCorrectBtnColor("green")
        setInCorrectBtnColor("red")
        setIsDesabled(true)


        const date=new Date();
        let answer;
        
        switch(e.target.name){
            case '0':{
                isCorrect ? answer=getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage) :answer=getRelevanteLang(names[rand1].conceptName,answersLanguage);
                break;
            }
            case '1':{
                isCorrect ? answer=getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage) :answer=getRelevanteLang(names[rand2].conceptName,answersLanguage);
                break;
            }
            case '2':{
                isCorrect ? answer=getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage) :answer=getRelevanteLang(names[rand3].conceptName,answersLanguage);
                break;
            }
            case '3':{
                isCorrect ? answer=getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage) :answer=getRelevanteLang(names[rand4].conceptName,answersLanguage);
                break;
            }
        }
        const questionResult={
            questionNumber:questionNumber+1,
            question:getRelevanteLang(concept_names[questionNumber].conceptName,questLanguage),
            answer:answer,
            isCorrect:isCorrect,
            currentTime:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        }
        onNewQuestResult(questionResult)
        if(isCorrect){
            playSound(transme_correct_sound);
        }else{
            // playSound(Wrong);
            playSound(transme_incorrect_sound);

        }
        setTimeout(() => {
            setIsDesabled(false)
            setCorrectBtnColor()
            setInCorrectBtnColor()
            onNextQuestion(isCorrect)
          },1000); 
          




        // onNextQuestion(isCorrect)

    }
    return(<>
        
        <div className="text-center">
        <div class="cloud-bar" id="cloud-q">
        <div class="cloud top"><h1 className="mt-4" style={{"zIndex":"1"}}>{getRelevanteLang(concept_names[questionNumber].conceptName,questLanguage)}</h1>
        </div>
        </div>

        <div className="row w-90" id="answer-buttons">
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5" id="answer-button"> 
            <button disabled={isDesabled} style={{ backgroundColor: randomPosition === 0 && correctBtnColor   }} id='game2-button'  onClick={onClick} name={0}>{randomPosition==0?(getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage)):getRelevanteLang(names[rand1].conceptName,answersLanguage)}  </button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5" id="answer-button">
            <button disabled={isDesabled} style={{ backgroundColor: randomPosition === 1 && correctBtnColor  }} id='game2-button'  onClick={onClick} name={1}>{randomPosition==1?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand2].conceptName,answersLanguage)}</button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5" id="answer-button">
            <button disabled={isDesabled} style={{ backgroundColor: randomPosition === 2 && correctBtnColor  }} id='game2-button'  onClick={onClick} name={2}>{randomPosition==2?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand3].conceptName,answersLanguage)}</button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5" id="answer-button">
            <button disabled={isDesabled} style={{ backgroundColor: randomPosition === 3 && correctBtnColor  }} id='game2-button'  onClick={onClick} name={3}>{randomPosition==3?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand4].conceptName,answersLanguage)}</button>
        </div>
        </div>
        </div>
    </>)
}
export default Question