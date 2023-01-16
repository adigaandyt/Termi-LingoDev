const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setLanguageChange}=require('../Controllers/searchLanguageChangeController')


router.post('/set/searchlanguagechange',protect,setLanguageChange)


module.exports=router