const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setGuessTheTermGame}=require('../Controllers/gamesController')


router.post('/set/game/guesstheterm',protect,setGuessTheTermGame)


module.exports=router