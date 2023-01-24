const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {updateUserActivity}=require('../Controllers/UserActivityController')



router.get('/set/useractive',protect,updateUserActivity)


module.exports=router