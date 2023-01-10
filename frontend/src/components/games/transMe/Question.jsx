import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function getRandomWrongAnswer(object){
    const randomIndex = Math.floor(Math.random() * object.length);
    return randomIndex;
}
function getRandomCorrectAnswer(){
    const randomIndex = Math.floor(Math.random() *4);
    return randomIndex;
}
function getRelevanteLang(object,language){

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

function Question({languages,onNextQuestion,questionNumber}){
    const {concept_names}=useSelector(state=>state.games)
    const {names}=useSelector(state=>state.concept)
    const [randomPosition,setRandomPosition]=useState()
    const [randoms,setRandoms]=useState({
        rand1:0,
        rand2:0,
        rand3:0,
        rand4:0,
    })
    const {rand1,rand2,rand3,rand4}=randoms
    const {questLanguage,answersLanguage}=languages


    useEffect(()=>{
       console.log(questionNumber)
        setRandomPosition(getRandomCorrectAnswer())
        setRandoms(()=>{
            return({
                rand1:getRandomWrongAnswer(names),
                rand2:getRandomWrongAnswer(names),
                rand3:getRandomWrongAnswer(names),
                rand4:getRandomWrongAnswer(names),
            })
        })
  
    },[])
    const onClick=(e)=>{
        const isCorrect=e.target.name==randomPosition
        console.log(isCorrect)
        console.log(randomPosition)
        console.log(e.target.name)





        onNextQuestion(isCorrect)
        setRandoms(()=>{
            return({
                rand1:getRandomWrongAnswer(names),
                rand2:getRandomWrongAnswer(names),
                rand3:getRandomWrongAnswer(names),
                rand4:getRandomWrongAnswer(names),
            })
        })
    }
    return(<>
        
        <div className="text-center">
        <div class="cloud-bar">
        <div class="cloud top"><h1 className="mt-4" style={{"zIndex":"1"}}>{ <h3>{getRelevanteLang(concept_names[questionNumber].conceptName,questLanguage)}</h3>}</h1></div>
        </div>
        
        <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5 ">
            <button id='game2-button'  onClick={onClick} name={0}>{randomPosition==0?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand1].conceptName,answersLanguage)}</button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5 ">
            <button id='game2-button'  onClick={onClick} name={1}>{randomPosition==1?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand2].conceptName,answersLanguage)}</button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5 ">
            <button id='game2-button'  onClick={onClick} name={2}>{randomPosition==2?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand3].conceptName,answersLanguage)}</button>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3 mt-sm-5 ">
            <button id='game2-button'  onClick={onClick} name={3}>{randomPosition==3?getRelevanteLang(concept_names[questionNumber].conceptName,answersLanguage):getRelevanteLang(names[rand4].conceptName,answersLanguage)}</button>
        </div>
        </div>
        </div>
    </>)
}
export default Question