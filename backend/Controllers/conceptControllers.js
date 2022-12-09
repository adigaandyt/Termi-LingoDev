const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')



 //@desc testing in postman !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//@route GET /api/concepts
//@access private
const testConcept=asyncHandler( async(req,res)=>{
    
const concept=await Concept.find().select("conceptName -_id" )



// res.send(concept)
 res.status(200).json(concept)

})



 //@desc get concepts for aauto complete
//@route GET /api/concepts
//@access private
const getConcept=asyncHandler( async(req,res)=>{
    
    let concept
    const textSearch=req.body.textSearch
    try {
         concept=await Concept.find({$or:[
            {"conceptName.arabic":{ $regex:new RegExp(textSearch)}},
            {"conceptName.english":{ $regex:new RegExp(textSearch)}},
            {"conceptName.hebrew":{ $regex:new RegExp(textSearch)}}
        ]}).limit(7)
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
