const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {setLanguageChange}=require('../Controllers/searchLanguageChangeController')
const {setAppLanguageChange}=require('../Controllers/AppLanguageChangeController')



router.post('/set/applanguagechange',protect,setAppLanguageChange)
router.post('/set/searchlanguagechange',protect,setLanguageChange)


module.exports=router