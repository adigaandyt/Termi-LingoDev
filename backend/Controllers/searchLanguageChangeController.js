const asyncHandler =require('express-async-handler')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const LanguageChange=require('../Models/languageChangeModel')
const Concept=require('../Models/conceptsModel')


//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setLanguageChange=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;
    const getLanguageByID=(expr)=>{
    switch (expr) {
      case 0:
        return 'עברית'
      case 1:
        return 'العربية'
      default:
        return 'English'
    }
    }

    //switch end
    
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")
    try {
        const categoryName=await Category.findById({_id:(data.categoryId?data.categoryId:user.categoryId)},{_id:0,"categoryName.english":1})
        const response=await LanguageChange.create({
            // userId:user._id,
            userEmail:user.email,
            conceptID:data.conceptID,
            categoryID:data.categoryID,
            newLanguage:getLanguageByID(data.newLanguage),
            previousLanguage:getLanguageByID(data.previousLanguage),

            // language:data.language,
            // score:data.score,
            // date:data.date,
            // game_results_list:data.gameResultList
            
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }

})
module.exports={
    setLanguageChange
}