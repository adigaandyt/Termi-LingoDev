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
//@desc Create new Category by user
//@route POST /api/categories/create/category
//@access Private
const createCategoryByUser=asyncHandler( async(req,res)=>{
    const user=req.user
    const {categoryName_english,categoryName_hebrew,categoryName_arabic}=req.body
    try {
        const categoryExist_english= await Category.findOne({"categoryName.english":categoryName_english})
        const categoryExist_arabic= await Category.findOne({"categoryName.arabic":categoryName_arabic})
        const categoryExist_hebrew= await Category.findOne({"categoryName.hebrew":categoryName_hebrew})
        if(categoryExist_arabic||categoryExist_english||categoryExist_hebrew){
            res.status(400)
            throw new Error('One or more of the categories names already exist in our database')
        }
        const newCategory= await Category.create({
            categoryName:{
                english:categoryName_english?categoryName_english:'N/A',
                arabic:categoryName_arabic?categoryName_arabic:'N/A',
                hebrew:  categoryName_hebrew?categoryName_hebrew:'N/A'
            },
            suggestBy:user._id,

        })
      

            res.status(200).json(newCategory)
  


    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
    

})


module.exports={
    testCategories,
    getAllCategories,
    createCategoryByUser
 }