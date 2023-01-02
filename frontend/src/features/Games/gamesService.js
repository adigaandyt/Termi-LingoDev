import axios from 'axios'


const CONCEPT_API_URL='/api/concepts'

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
const gamesService={
    getConcepts4GuessTerm
}

export default gamesService