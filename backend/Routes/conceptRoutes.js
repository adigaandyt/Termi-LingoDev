const express=require('express')
const {
     getConcept ,
     getConceptByOpenAi,
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
      updateConceptByUser,
    } = require('../Controllers/conceptControllers')
    const {getConceptsAddedByUser,getUsersAddedConceptRating,getConceptsSearchedByUser}=require('../Controllers/conceptsProfileUserController')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/get/concept/:categoryId',getConcept)
router.post('/get/concept/openai/api/:categoryId',getConceptByOpenAi)
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

//Routes for the profile page about concepts that added / liked(favorite) / last 3 searched
router.get('/get/concepts/added/by/user',protect,getConceptsAddedByUser);
router.get('/get/users/addedConcept/rating',protect,getUsersAddedConceptRating);
router.get('/get/concepts/searched/by/user/',protect,getConceptsSearchedByUser);







module.exports=router
