const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setConceptSearch}=require('../Controllers/ConceptSearchController')



router.post('/set/conceptsearch',protect,setConceptSearch)

module.exports=router