const express=require('express')
const { getConcept ,testConcept, getConceptsNames} = require('../Controllers/conceptControllers')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/get/concept/:categoryId',getConcept)
router.post('/test',testConcept)
router.get('/get/names',getConceptsNames)






module.exports=router
