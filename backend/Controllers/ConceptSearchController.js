const asyncHandler =require('express-async-handler')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const ConceptSearch=require('../Models/conceptSearchModel')
const Concept=require('../Models/conceptsModel')


//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setConceptSearch=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;
    
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")

    try {
        const response=await ConceptSearch.create({
            // userId:user._id,
            userEmail:user.email,
            userID:user._id,
            conceptID:data.conceptID,
            userCategoryID:user.categoryId,
            SearchCategoryID:data.SearchCategoryID,
            SearchString:data.SearchString,
            correctSearched:data.correctSearched,

            
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})
module.exports={
    setConceptSearch
}