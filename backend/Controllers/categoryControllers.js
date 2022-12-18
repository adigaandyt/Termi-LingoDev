const asyncHandler =require('express-async-handler');
const Category=require('../Models/categoriesModel')



 //@desc testing in postman !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//@route GET /api/categories
//@access private
const testCategories=asyncHandler( async(req,res)=>{
    const response=await Category.create({
        categoryName:{
            english:"Other",
            arabic:"آخر",
            hebrew:"אחר"
        }
    })
    if(response){
        res.status(200).json(response)
    }

})
//@desc get all categories from th DB
//@route GET /api/categories/get/all
//@access private
const getAllCategories=asyncHandler( async(req,res)=>{
    const response=await Category.find()
    if(response){
        res.status(200).json(response)
    }

})



module.exports={
    testCategories,
    getAllCategories
 }