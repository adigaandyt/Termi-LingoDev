const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setGuessTheTermGame,setTransMeGame}=require('../Controllers/gamesController')


router.post('/set/game/guesstheterm',protect,setGuessTheTermGame)
router.post('/set/game/transme',protect,setTransMeGame)


module.exports=router