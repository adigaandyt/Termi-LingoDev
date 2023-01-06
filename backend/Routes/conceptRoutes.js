const express=require('express')
const {
     getConcept ,
     testConcept,
      getConceptsNames,
      getConcepts,
      getConceptsByUserId,
      getConceptsBycategoryId
    } = require('../Controllers/conceptControllers')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/get/concept/:categoryId',getConcept)
router.post('/test',testConcept)
router.get('/get/concepts/:textsearch',getConcepts)
router.get('/get/names',getConceptsNames)
router.get('/get/concepts/games/game1/guesstheterm',protect,getConceptsByUserId)
router.get('/get/concepts/games/game1/guesstheterm/:categoryId',protect,getConceptsBycategoryId)






module.exports=router
