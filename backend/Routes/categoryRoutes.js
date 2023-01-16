const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {testCategories,getAllCategories,createCategoryByUser} =require('../Controllers/categoryControllers')

router.post('/',testCategories)
router.get('/get/all',getAllCategories)
router.post('/create/category',protect,createCategoryByUser)

module.exports=router