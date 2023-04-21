const express=require('express')
const {
     getConcept ,
     testConcept,
      getConceptsNames,
      getConcepts,
      getConceptsByUserId,
      getConceptsBycategoryId,
      getConceptsNamesByUserId,
      getConceptNamesBycategoryId,
      creactNewConceptByUser,
      getUnAcceptedConcepts,
      updateConceptByAdmin,
      deleteConceptByAdmin,
      updateConceptByUser
    } = require('../Controllers/conceptControllers')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/get/concept/:categoryId',getConcept)
router.post('/test/:categoryId',testConcept)
router.get('/get/concepts/:textsearch',getConcepts)
router.get('/get/names',getConceptsNames)
router.get('/get/concepts/not/accepted',protect,getUnAcceptedConcepts)
router.post('/create/concept',protect,creactNewConceptByUser)
router.get('/get/concepts/games/game1/guesstheterm',protect,getConceptsByUserId)
router.get('/get/concepts/games/game1/guesstheterm/:categoryId',protect,getConceptsBycategoryId)
router.get('/get/concepts/games/game2/transme',protect,getConceptsNamesByUserId)
router.get('/get/concepts/games/game2/transme/:categoryid',protect,getConceptNamesBycategoryId)
router.post('/update/concept/by/admin',protect,updateConceptByAdmin)
router.post('/update/concept/by/user',protect,updateConceptByUser)
router.delete('/delete/comcept/by/admin/:conceptId',deleteConceptByAdmin)







module.exports=router
