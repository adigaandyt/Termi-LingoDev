const express=require('express')
const { getConcept ,testConcept, getConceptsNames,getConcepts} = require('../Controllers/conceptControllers')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/get/concept/:categoryId',getConcept)
router.post('/test',testConcept)
router.get('/get/concepts/:textsearch',getConcepts)
router.get('/get/names',getConceptsNames)






module.exports=router
