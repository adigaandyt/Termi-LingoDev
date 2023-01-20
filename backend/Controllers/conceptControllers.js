const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')
const Category =require('../Models/categoriesModel')
const User=require('../Models/usersModel')
const _ = require('lodash');
const { findById } = require('../Models/conceptsModel');

//add "639d8f0987cdf6706e335db9" to all arrays in the database
    //    concept=await Concept.updateMany(
    //     {},
    //     {$push:{"categories":"639d8f0987cdf6706e335db9"}})

//remove the first elemnt from all arrays
    // concept=await Concept.updateMany(
    //     {},
    //     {$pop:{"categories":-1}})// if change the -1 in 1 it's will to remove the last one 
    


 //@desc testing in postman !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//@route POST /api/concepts/test 
//@access private
const testConcept=asyncHandler( async(req,res)=>{
    


    try {
    //    concept=await Concept.updateMany({}, { $set: { accepted: true } });
    // const user=await User.updateMany({},{added_concepts:0},{new:true})
    // res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
    

})




 //@desc get single concept
//@route GET /api/concepts/get/concept
//@access private
const getConcept=asyncHandler( async(req,res)=>{
    let concept
    const textSearch=req.body.textSearch
    try {
        const category=await Category.findById(req.params.categoryId)
        if(!category){
            res.status(404)
            throw new Error("you have to choose Category")
        }
        else{
            concept=await Concept.findOne({$or:[
            {categories: {$all:[category.id]},"conceptName.arabic":textSearch},
            {categories: {$all:[category.id]},"conceptName.english":textSearch},
            {categories: {$all:[category.id]},"conceptName.hebrew":textSearch}
        ],accepted:true})
        }
         
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
    console.log("searched for concept" + concept)
     res.status(200).json(concept)


   
    
    })



//@desc get concepts names 
//@route GET /api/concepts/get/Names
//@access private
const getConceptsNames=asyncHandler( async(req,res)=>{
    
    let conceptsNames
    try {
        conceptsNames=await Concept.find({accepted:true}).select("conceptName -_id" )
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
    
     res.status(200).json(conceptsNames)
    
    })

//@desc get concepts that user search for 
//@route GET /api/concepts/get/concepts/:textsearch
//@access private
const getConcepts=asyncHandler( async(req,res)=>{

    let concepts
    const textSearch=req.params.textsearch.replaceAll(')',"\\$&").replaceAll('(',"\\$&")
    try {
            concepts=await Concept.find({$or:[
            {"conceptName.arabic":{ $regex:new RegExp(textSearch), "$options" : "iu"}},
            {"conceptName.english":{ $regex:new RegExp(textSearch), "$options" : "iu"}},
            {"conceptName.hebrew":{ $regex:new RegExp(textSearch), "$options" : "iu"}}
        ],accepted:true})
         
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }
    
     res.status(200).json(concepts)
    
    })

//@desc get concept names and shortDefintions for "Guess The Term" game by user id!
//@route GET /get/concepts/games/game1/guesstheterm
//@access private
const getConceptsByUserId=asyncHandler( async(req,res)=>{
    const userId =req.user._id
    let concepts;
    if (userId) {
        try {
            concepts = await User.aggregate([
                {
                    $match: { "_id": userId }
                },
                {
                    $lookup: {
                        localField: "categoryId",
                        foreignField: "categories",
                        from: "concepts",
                        as: "user_concepts",
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "user_concepts.shortDefinition": 1,
                        "user_concepts.conceptName": 1,

                    }
                }
            ])
        } catch (error) {
            res.status(500)
            throw new Error("Some thing is wrong !")
        }
    }
    
     res.status(200).json(concepts[0])
    
    })
//@desc get concepts names and shortDefintions for "Guess The Term" game by category id !
//@route GET /get/concepts/games/game1/guesstheterm/:categoryid
//@access private
const getConceptsBycategoryId=asyncHandler( async(req,res)=>{
    // user details for back office !
    const user=req.user


    const categoryId =req.params.categoryId
    console.log(req.params)
    let concepts;
    if (categoryId) {
        try {
            concepts=await Concept.find({categories:categoryId},{"shortDefinition":1,"conceptName":1,"_id":0})
        } catch (error) {
            res.status(500)
            throw new Error("Some thing is wrong !")
        }
    }
    
     res.status(200).json({user_concepts:concepts})
    
    })


    //@desc get concept names for game2 (transMe)
//@route GET /get/concepts/games/game2/transme
//@access private
const getConceptsNamesByUserId=asyncHandler( async(req,res)=>{
    const userId =req.user._id
    let conceptNames;
    if (userId) {
        try {

            conceptNames = await User.aggregate([
                {
                    $match: { "_id": userId }
                },
                {
                    $lookup: {
                        localField: "categoryId",
                        foreignField: "categories",
                        from: "concepts",
                        as: "concept_names",
                    },
                   
                },
                {
                    $project: {
                        "_id": 0,
                        "concept_names.conceptName": 1,

                    }
                }
            ]).then((concept_names)=>{
            //  const dd=concept_names[0]
             const randomDocuments = _.sampleSize(concept_names[0].concept_names,10);
                res.json(randomDocuments)

            })
        } catch (error) {
            res.status(500)
            throw new Error(error.message)
            // throw new Error("Sorry, something went wrong")
        }
    }
    
    })

    //@desc get concepts names  for "Trans" game by category id !
//@route GET /get/concepts/games/game2/transme/:categoryid
//@access private
const getConceptNamesBycategoryId=asyncHandler( async(req,res)=>{
    // user details for back office !
    const user=req.user


    const categoryId =req.params.categoryid;

    let conceptNames;
    if (categoryId) {
        try {
            conceptNames=await Concept.find({categories:categoryId,accepted:true},{"conceptName":1,"_id":0}).then((concept_names)=>{
                 const randomDocuments = _.sampleSize(concept_names,10);
                    res.json(randomDocuments )
    
                })
     
        } catch (error) {
            res.status(500)
            throw new Error("Some thing went wrong !")
        }
    }
    
    })

   
//@desc  create concept by user
//@route POST /create/concept
//@access private
const creactNewConceptByUser=asyncHandler( async(req,res)=>{

const user=req.user;
const data=req.body;

if(
    (!data.conceptName_hebrew&&!data.conceptName_english&&!data.conceptName_arabic)
    || 
    (!data.shortDefinition_english&&!data.shortDefinition_arabic&&!data.shortDefinition_hebrew)
    ||
    (!data.categoryId)
    ){
        console.log(" missing details")
        res.status(400)
        throw new Error("Missing details")
    }

try {

    const conceptExist_english= await Concept.findOne({categories: {$all:[data.categoryId]},"conceptName.english":data.conceptName_english})
    const conceptExist_arabic= await Concept.findOne({categories: {$all:[data.categoryId]},"conceptName.arabic":data.conceptName_arabic})
    const conceptExist_hebrew= await Concept.findOne({categories: {$all:[data.categoryId]},"conceptName.hebrew":data.conceptName_hebrew})
    if(conceptExist_english||conceptExist_hebrew||conceptExist_arabic){
        res.status(400)
        console.log("One or more of the concept names already exist")
        throw new Error("One or more of the concept names already exist")
    }
const newuser=await User.findByIdAndUpdate(user._id,{added_concepts:user.added_concepts+1})
res.status(200)
const response=await Concept.create({
conceptName:{
    english:data.conceptName_english?data.conceptName_english:"N/A",
    hebrew:data.conceptName_hebrew?data.conceptName_hebrew:"N/A",
    arabic:data.conceptName_arabic?data.conceptName_arabic:"N/A"
},
longDefinition:{
    english:data.longDefinition_english?data.longDefinition_english:"N/A",
    hebrew:data.longDefinition_hebrew?data.longDefinition_hebrew:"N/A",
    arabic:data.longDefinition_arabic?data.longDefinition_arabic:"N/A"
},
shortDefinition:{
    english:data.shortDefinition_english?data.shortDefinition_english:"N/A",
    hebrew:data.shortDefinition_hebrew?data.shortDefinition_hebrew:"N/A",
    arabic:data.shortDefinition_arabic?data.shortDefinition_arabic:"N/A"
},
categories:[data.categoryId,'639e49f8dfabd615c821584f'],
suggestedBy:user.name,
suggestedBy_userId:user._id,
readMore:data.readMore?data.readMore:"N/A",


})
// console.log(response)
res.status(200).json(response)

} catch (error) {

    console.log(error.message)
    res.status(400)
    throw new Error(error.message) 
}
    
})
//@desc get concepts that not accepted yet by admin ,for the admin request ...
//@route GET /get/concepts/not/accepted
//@access private
const getUnAcceptedConcepts=asyncHandler( async(req,res)=>{
    // user details for back office !
    const user=req.user

        try {
            const unAcceptedConcepts=await Concept.find({accepted:false})
            res.json(unAcceptedConcepts)
        } catch (error) {
            console.log(error)
            res.status(500)
            throw new Error("Some thing went wrong !")
        }

    
    })
//@desc update concept by admin in the settings page 
//@route POST /update/concept/by/admin
//@access private
const updateConceptByAdmin=asyncHandler( async(req,res)=>{
    // user details for back office !
    const user=req.user
    const data=req.body

        try {
            const newConcept=await Concept.findByIdAndUpdate({_id:data.conceptId},{
                conceptName:{
                    english:data.conceptName_english?data.conceptName_english:"N/A",
                    hebrew:data.conceptName_hebrew?data.conceptName_hebrew:"N/A",
                    arabic:data.conceptName_arabic?data.conceptName_arabic:"N/A"
                },
                longDefinition:{
                    english:data.longDefinition_english?data.longDefinition_english:"N/A",
                    hebrew:data.longDefinition_hebrew?data.longDefinition_hebrew:"N/A",
                    arabic:data.longDefinition_arabic?data.longDefinition_arabic:"N/A"
                },
                shortDefinition:{
                    english:data.shortDefinition_english?data.shortDefinition_english:"N/A",
                    hebrew:data.shortDefinition_hebrew?data.shortDefinition_hebrew:"N/A",
                    arabic:data.shortDefinition_arabic?data.shortDefinition_arabic:"N/A"
                },
                categories:[data.categoryId,'639e49f8dfabd615c821584f'],
                readMore:data.readMore?data.readMore:"N/A",
                accepted:true
            },{new:true})
            res.json(newConcept)
        } catch (error) {
            res.status(500)
            // throw new Error("Some thing went wrong !")
            throw new Error(error.message)

        }

    
    })
//@desc deleteConceptByAdmin 
//@route DELETE /delete/comcept/by/admin
//@access private
const deleteConceptByAdmin=asyncHandler( async(req,res)=>{
    const conceptId=req.params.conceptId
    try {
        const conceptDeleted=await Concept.findByIdAndDelete({_id:conceptId})
        res.json(conceptDeleted)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }


})





module.exports={
   getConcept,
   testConcept,
   getConceptsNames,
   getConcepts,
   getConceptsByUserId,
   getConceptsBycategoryId,
   getConceptsNamesByUserId,
   getConceptNamesBycategoryId,
   creactNewConceptByUser,
   getUnAcceptedConcepts,
   updateConceptByAdmin,
   deleteConceptByAdmin
}
