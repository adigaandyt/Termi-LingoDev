import axios from 'axios'


const CONCEPT_API_URL='/api/concepts'
const GAMES_API_URL='/api/games'

//get concept name and shortdefintion for "Guess the term" game
const getConcepts4GuessTerm =async (token)=>{
   
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(CONCEPT_API_URL+'/get/concepts/games/game1/guesstheterm',config)

    return response.data
}
//get concept name and shortdefintion for "Guess the term" game
const getConcepts4GuessTermByCategoryId =async (data,token)=>{
//    console.log(data)
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(CONCEPT_API_URL+`/get/concepts/games/game1/guesstheterm/${data}`,config)

    return response.data
}

const setGuessTheTermGameResult=async(data,token)=>{
    console.log(data)
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(GAMES_API_URL+'/set/game/guesstheterm',data,config)
}
//get concept names  for "TransMe" game2
const getConceptNames4TransMeGame =async (token)=>{
   
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(CONCEPT_API_URL+'/get/concepts/games/game2/transme',config)

    return response.data
}
//get concept names  for "TransMe" game2 by categoryid
const getConceptNames4TransMeGameByCategoryId =async (categoryId,token)=>{
   
    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(CONCEPT_API_URL+`/get/concepts/games/game2/transme/${categoryId}`,config)

    return response.data
}
const setTransMeGameResult=async(data,token)=>{
    console.log(data)

    const config ={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    await axios.post(GAMES_API_URL+'/set/game/transme',data,config)
}
const gamesService={
    getConcepts4GuessTerm,
    getConcepts4GuessTermByCategoryId,
    setGuessTheTermGameResult,
    getConceptNames4TransMeGame,
    getConceptNames4TransMeGameByCategoryId,
    setTransMeGameResult
}

export default gamesService