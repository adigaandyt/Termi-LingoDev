const express=require('express')
const { getConcept } = require('../Controllers/conceptControllers')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")

router.post('/',getConcept)




module.exports=router
