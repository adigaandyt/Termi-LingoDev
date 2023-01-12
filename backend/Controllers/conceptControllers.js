const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')
const Category =require('../Models/categoriesModel')
const User=require('../Models/usersModel')
const _ = require('lodash');

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
    


    try {
    //    concept=await Concept.updateMany({}, { $set: { accepted: true } });
    const user=await User.find({}).sort({ games_coins: -1 }).where({ games_coins: { $exists: true } }).lean();
    res.status(200).json(user)
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
    console.log("searched for concept" + concept)
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
        ]})
         
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
            conceptNames=await Concept.find({categories:categoryId},{"conceptName":1,"_id":0}).then((concept_names)=>{
                 const randomDocuments = _.sampleSize(concept_names,10);
                    res.json(randomDocuments )
    
                })
     
        } catch (error) {
            res.status(500)
            throw new Error("Some thing went wrong !")
        }
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
   getConceptNamesBycategoryId
}
