const asyncHandler =require('express-async-handler')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const LanguageChange=require('../Models/appLanguageChangeModel')
const Concept=require('../Models/conceptsModel')


//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setAppLanguageChange=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;
    const getLanguageByID=(expr)=>{
    switch (expr) {
      case "hr":
        return 'עברית'
      case "ar":
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
            userEmail:user.email,
            newLanguage:getLanguageByID(data.newLanguage)
      
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }

})
module.exports={
    setAppLanguageChange
}