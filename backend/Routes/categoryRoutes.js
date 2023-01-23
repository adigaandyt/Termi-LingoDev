const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {testCategories,getAllCategories,createCategoryByUser,getCategoriesForAdmin,updateCategoryByAdmin,deleteCategoryByAdmin,acceptCategoryByAdmin} =require('../Controllers/categoryControllers')

router.post('/',testCategories)
router.get('/get/all',getAllCategories)
router.post('/create/category',protect,createCategoryByUser);
router.get('/get/categories/not/accepted',getCategoriesForAdmin)
router.post('/update/category/by/admin',updateCategoryByAdmin);
router.delete('/delete/category/by/admin/:categoryId',deleteCategoryByAdmin);
router.post('/accept/category/by/admin',acceptCategoryByAdmin)

module.exports=router