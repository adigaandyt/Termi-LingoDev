const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')
const Category =require('../Models/categoriesModel')
const User=require('../Models/usersModel')
const UpdatedConcept=require('../Models/updatedConceptByUserModel')
const ConceptSearch=require('../Models/conceptSearchModel')
const _ = require('lodash');
const { findById } = require('../Models/conceptsModel');
const { Configuration, OpenAIApi }=require("openai") ;


//add "639d8f0987cdf6706e335db9" to all arrays in the database
    //    concept=await Concept.updateMany(
    //     {},
    //     {$push:{"categories":"639d8f0987cdf6706e335db9"}})

//remove the first elemnt from all arrays
    // concept=await Concept.updateMany(
    //     {},
    //     {$pop:{"categories":-1}})// if change the -1 in 1 it's will to remove the last one 
    


 //@desc get concept by open ai api request 
//@route POST /api/concepts/openai/api/:categoryId
//@access private
const getConceptByOpenAi=asyncHandler( async(req,res)=>{
// pull request and push test


    const {textSearch}=req.body
    const {categoryId}=req.params
    // res.send({x:textSearch,c:categoryId})

    try {
        const category=await Category.findById({_id:categoryId})
        
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY, 
            
        });
        const openai = new OpenAIApi(configuration);

        const conceptName_languages = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Translate this into Arabic, Hebrew and English:\n\n${textSearch}\n\n ,return the result in json format with the names english ,hebrew and arabic `,
            temperature: 1,
            max_tokens: 300,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        console.log( conceptName_languages.data.choices[0].text)
        const conceptNameText = conceptName_languages.data.choices[0].text.trim();
        const parsedConceptNamesResponse = JSON.parse(conceptNameText);
        // res.json(parsedConceptNamesResponse)

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Give me short description of 1 sentence and short description of 30 words max,  about ${textSearch} in ${category.categoryName.english},return the result in json format with the names shortDefinition and longDefinition. `,
            max_tokens: 200,
            temperature:1
        });
        const responseText = response.data.choices[0].text.trim();
        const parsedResponse = JSON.parse(responseText);
        console.log(parsedResponse)
        //   res.json(parsedResponse)

        const shortDefinition_languages = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Translate this into Arabic, Hebrew and English:\n\n${parsedResponse.shortDefinition}\n\n ,return the result with json format with the names english ,hebrew and arabic `,
            temperature: 0.3,
            max_tokens: 300,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        const shortDefintionText = shortDefinition_languages.data.choices[0].text.trim();
        const parsedShortDefintionResponse = JSON.parse(shortDefintionText);
        // res.json(parsedShortDefintionResponse)
        const longDefinition_languages = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Translate this into Arabic, Hebrew and English:\n\n${parsedResponse.longDefinition}\n\n ,return the result with json format with the names english ,hebrew and arabic `,
            temperature: 1,
            max_tokens:1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        console.log(longDefinition_languages.data.choices[0].text)
        const longDefintionText = longDefinition_languages.data.choices[0].text.trim();
        const parsedLongDefintionResponse = JSON.parse(longDefintionText);
        // res.send(parsedLongDefintionResponse )
        res.json({
            conceptName:{
                english:parsedConceptNamesResponse.English||parsedConceptNamesResponse.english,
                hebrew:parsedConceptNamesResponse.Hebrew||parsedConceptNamesResponse.hebrew,
                arabic:parsedConceptNamesResponse.Arabic||parsedConceptNamesResponse.arabic
            },
            shortDefinition: {
                english:parsedShortDefintionResponse.English||parsedShortDefintionResponse.english,
                hebrew:parsedShortDefintionResponse.Hebrew||parsedShortDefintionResponse.hebrew,
                arabic:parsedShortDefintionResponse.Arabic||parsedShortDefintionResponse.arabic
            },
            longDefinition: {
                english:parsedLongDefintionResponse.English||parsedLongDefintionResponse.english,
                hebrew:parsedLongDefintionResponse.Hebrew||parsedLongDefintionResponse.hebrew,
                arabic:parsedLongDefintionResponse.Arabic||parsedLongDefintionResponse.arabic
            }
        })

        
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
    // res.send("longDefinition_hebrew",process.env.OPENAI_API_KEY)


    

})




 //@desc get single concept
//@route GET api/concepts/get/concept/openai/api/:categoryId
//@access private
const getConcept=asyncHandler( async(req,res)=>{
    let concept
    let rating;
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

        // get rating for the specific concept 
        if(concept){
            const collectionLength= await ConceptSearch.find({})
            const conceptSearchById=await ConceptSearch.find({conceptID:concept._id})
            const ratio=conceptSearchById.length/collectionLength.length
            switch(true){
                case ratio>=0.15:{
                    rating=5
                    break;
                }
                case ratio<0.15&&ratio>=0.13:{
                    rating=4.5
                    break;
                }
                case ratio<0.13&&ratio>=0.11:{
                    rating=4
                    break;
                }
                case ratio<0.11&&ratio>=0.09:{
                    rating=3.5
                    break;
                }
                case ratio<0.09&&ratio>=0.07:{
                    rating=3
                    break;
                }
                case ratio<0.07&&ratio>=0.05:{
                    rating=2.5
                    break;
                }
                case ratio<0.05&&ratio>=0.03:{
                    rating=2
                    break;
                }
                case ratio<0.03&&ratio>=0.02:{
                    rating=2
                    break;
                }
                case ratio<0.02&&ratio>=0.01:{
                    rating=1.5
                    break;
                }
                case ratio<0.01&&ratio>0:{
                    rating=1
                    break;
                }
                default:
                    break;

            }
            // res.json({ratio})
        }
        }
         
    } catch (error) {
        res.status(500)
        throw new Error("Some thing is wrong !" )
    }

     res.status(200).json({concept,rating})
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
//@desc update concept by user in the Home/Search page 
//@route POST /update/concept/by/user
//@access private
const updateConceptByUser=asyncHandler( async(req,res)=>{
    // user details for back office !
    const user=req.user
    const data=req.body

        try {
            const currentConcept=await Concept.findById({_id:data.conceptId})
            if(!currentConcept){
                res.status(400)
                throw new Error('Something is Wrong!')
            }
            const newConcept=await UpdatedConcept.create({

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
                readMore:data.readMore?data.readMore:"N/A",
                updatedBy:user.id,
                conceptId:currentConcept.id
            })
            res.json(newConcept)
        } catch (error) {
            res.status(500)
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
   getConceptByOpenAi,
   getConceptsNames,
   getConcepts,
   getConceptsByUserId,
   getConceptsBycategoryId,
   getConceptsNamesByUserId,
   getConceptNamesBycategoryId,
   creactNewConceptByUser,
   getUnAcceptedConcepts,
   updateConceptByAdmin,
   updateConceptByUser,
   deleteConceptByAdmin
}
