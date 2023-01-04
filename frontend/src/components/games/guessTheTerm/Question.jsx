import { useContext, useEffect, useState } from "react"
import GamesContext from "../../../hooks/gamesContext"
import Button from "../Button";


function getRandomNumber() {
    // console.log(array)
    const randomIndex = Math.floor(Math.random() * 4);
    return randomIndex;
  }
function Qestion({question,onNextQestion}){
    // const {questionsList}=useContext(GamesContext)
    const [randomPosition,setRandomPosition]=useState(0)
    useEffect(()=>{
     const result=getRandomNumber();
     setRandomPosition(result)

    },[question])
    const onClick=(e)=>{
        const iscorrect= e.target.name==randomPosition

        onNextQestion(iscorrect)
    }
    return(<>
   <div id="answers-buttons" className='row '>
    {/* {console.log(question)}
    {console.log(randomPosition)}  */}
    <h1 id="shortDefinition-game1">{question.shortDefinition.hebrew}</h1>
    <button className="big-button my-3" name={0} onClick={onClick} >{randomPosition===0 ?question.correctAnswer.hebrew:question.wrongAnswer1.hebrew}</button>
    <button className="big-button my-3" name={1} onClick={onClick}>{randomPosition===1 ?question.correctAnswer.hebrew:question.wrongAnswer2.hebrew}</button>
    <button className="big-button my-3" name={2} onClick={onClick}>{randomPosition===2 ?question.correctAnswer.hebrew:question.wrongAnswer3.hebrew}</button>
    <button className="big-button my-3" name={3} onClick={onClick}>{randomPosition===3 ?question.correctAnswer.hebrew:question.wrongAnswer4.hebrew}</button>  

    </div>
    </>)
}
export default Qestion