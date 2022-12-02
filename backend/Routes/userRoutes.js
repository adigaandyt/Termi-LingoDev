const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe,resetPassword}=require('../Controllers/userControllers')
const {protect}=require("../middleware/authMiddleware")

router.post('/',registrUser)
router.get('/me',protect,getMe) 
router.post('/login',loginUser)
router.post('/reset/password',protect,resetPassword) 



module.exports=router
