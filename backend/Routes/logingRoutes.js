const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setLanguageChange}=require('../Controllers/searchLanguageChangeController')


router.post('/set/search_language_change',protect,setLanguageChange)


module.exports=router