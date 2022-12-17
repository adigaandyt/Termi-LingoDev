const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {testCategories,getAllCategories} =require('../Controllers/categoryControllers')

router.post('/',testCategories)
router.get('/get/all',getAllCategories)

module.exports=router