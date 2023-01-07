import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

const GamesContext = createContext();

function getRandomObject(arrayLength) {
  // console.log(array)
  const randomIndex = Math.floor(Math.random() * arrayLength);
  return randomIndex;
}
export const GamesProvider = (props) => {
const [term,setValue] =useState("helloworl") 
let questionsList=[];

const {names}=useSelector(state=>state.concept)

const getquestionList=({user_concepts})=>{
  questionsList.length=0;
  for(let i=0 ; i<10 ; i++){
      const user_concept=getRandomObject(user_concepts.length)
      const name1=getRandomObject(names.length)
      const name2=getRandomObject(names.length)
      const name3=getRandomObject(names.length)
      const name4=getRandomObject(names.length)

  const question={
    shortDefinition:{
       english:user_concepts[user_concept].shortDefinition.english,
       hebrew:user_concepts[user_concept].shortDefinition.hebrew,
       arabic:user_concepts[user_concept].shortDefinition.arabic,
    },
    correctAnswer:{
     english:user_concepts[user_concept].conceptName.english,
     hebrew:user_concepts[user_concept].conceptName.hebrew,
     arabic:user_concepts[user_concept].conceptName.arabic,
    },
    wrongAnswer1:{
       english:names[name1].conceptName.english,
       hebrew:names[name1].conceptName.hebrew,
       arabic:names[name1].conceptName.arabic
    },
    wrongAnswer2:{
     english:names[name2].conceptName.english,
     hebrew:names[name2].conceptName.hebrew,
     arabic:names[name2].conceptName.arabic
    },
    wrongAnswer3:{
     english:names[name3].conceptName.english,
     hebrew:names[name3].conceptName.hebrew,
     arabic:names[name3].conceptName.arabic
    },
    wrongAnswer4:{
      english:names[name4].conceptName.english,
      hebrew:names[name4].conceptName.hebrew,
      arabic:names[name4].conceptName.arabic
     }
    

 };
questionsList.push(question)
  }
}



    


  return (
    <GamesContext.Provider value={{term,getquestionList,questionsList}}>    
      {props.children}
    </GamesContext.Provider>
  );
};


export default  GamesContext ;



