const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')
const Category =require('../Models/categoriesModel')

//add "639d8f0987cdf6706e335db9" to all arrays in the database
    //    concept=await Concept.updateMany(
    //     {},
    //     {$push:{"categories":"639d8f0987cdf6706e335db9"}})

//remove the first elemnt from all arrays
    // concept=await Concept.updateMany(
    //     {},
    //     {$pop:{"categories":-1}})// if change the -1 in 1 it's will to remove the last one 
    


 //@desc testing in postman !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//@route GET /api/concepts/test 
//@access private
const testConcept=asyncHandler( async(req,res)=>{
    
    let concept

    try {
       concept=await Concept.updateMany(
        {},
        {$push:{"categories":"639e49f8dfabd615c821584f"}})
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
     res.status(200).json(concept)

})



 //@desc get single concept
//@route GET /api/concepts/get/concept
//@access private
const getConcept=asyncHandler( async(req,res)=>{
    
    let concept
    const textSearch=req.body.textSearch.replaceAll(')',"\\$&").replaceAll('(',"\\$&")
    try {
        const category=await Category.findById(req.params.categoryId)
        if(!category){
            res.status(404)
            throw new Error("you have to choose Category")
        }
        else{
            concept=await Concept.findOne({$or:[
            {categories: {$all:[category.id]},"conceptName.arabic":{ $regex:new RegExp(textSearch), "$options" : "iu"}},
            {categories: {$all:[category.id]},"conceptName.english":{ $regex:new RegExp(textSearch), "$options" : "iu"}},
            {categories: {$all:[category.id]},"conceptName.hebrew":{ $regex:new RegExp(textSearch), "$options" : "iu"}}
        ]})
        }
         
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
     res.status(200).json(concept)


   
    
    })



//@desc get concepts names 
//@route GET /api/concepts/get/Names
//@access private
const getConceptsNames=asyncHandler( async(req,res)=>{
    
    let conceptsNames
    try {
        conceptsNames=await Concept.find().select("conceptName -_id" )
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
    
     res.status(200).json(conceptsNames)
    
    })







module.exports={
   getConcept,
   testConcept,
   getConceptsNames
}
