// import {useState} from 'react'
// import {useSelector} from 'react-redux'
// import {useRandom} from './customHooks/useRandom'

// function useQuesion(){

//    const {user_concepts}=useSelector(state=>state.games)
//    const {names}=useSelector(state=>state.concept)

//    const [userConceptRandom,createUserConceptRandom]=useRandom()
//    const [conceptNameRandom1,createConceptNameRandom1]=useRandom()
//    const [conceptNameRandom2,createConceptNameRandom2]=useRandom()
//    const [conceptNameRandom3,createConceptNameRandom3]=useRandom()

//    createUserConceptRandom(user_concepts[0].user_concepts.length)
//    createConceptNameRandom1(names.length)
//    createConceptNameRandom2(names.length)
//    createConceptNameRandom3(names.length)
//    return [userConceptRandom,conceptNameRandom1,conceptNameRandom2,conceptNameRandom3]
// }


// export function useGame(){

//    const {user_concepts}=useSelector(state=>state.games)
//    const {names}=useSelector(state=>state.concept)



//    const [questionsList,setQuestionsList]= useState([])

//    const createGame=()=>{
//       for(let i=0;i<10;i++){
//       let array= useQuesion();
      
//       const question={
//          shortDefinition:{
//             english:user_concepts[0].user_concepts[array[0]].shortDefinition.english,
//             hebrew:user_concepts[0].user_concepts[array[0]].shortDefinition.hebrew,
//             arabic:user_concepts[0].user_concepts[array[0]].shortDefinition.arabic,
//          },
//          correctAnswer:{
//             english:user_concepts[0].user_concepts[array[0]].conceptName.english,
//             hebrew:user_concepts[0].user_concepts[array[0]].conceptName.hebrew,
//             arabic:user_concepts[0].user_concepts[array[0]].conceptName.arabic
//          },
//          wrongAnswer1:{
//             english:names[array[1]].conceptName.english,
//             hebrew:names[array[1]].conceptName.hebrew,
//             arabic:names[array[1]].conceptName.arabic
//          },
//          wrongAnswer2:{
//             english:names[array[2]].conceptName.english,
//             hebrew:names[array[2]].conceptName.hebrew,
//             arabic:names[array[2]].conceptName.arabic
//          },
//          wrongAnswer3:{
//             english:names[array[3]].conceptName.english,
//             hebrew:names[array[3]].conceptName.hebrew,
//             arabic:names[array[3]].conceptName.arabic
//          }
         

//       };
   
//       setArray([...questionsList,question ]);
      
//       }
//    }
//    return [questionsList,createGame]

// }

// // //const {user_concepts}=useSelector(state=>state.games)      console.log(user_concepts[0].user_concepts.length)