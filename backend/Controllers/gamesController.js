const asyncHandler =require('express-async-handler')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const GuessTheTerm=require('../Models/guessTheTermModel')


//@desc set the result of guess the term game in the DB
//@route POST /api/games/set/game/guesstheterm
//@access private
const setGuessTheTermGame=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;

    try {
        const response=await GuessTheTerm.create({
            userId:user._id,
            categoryId:data.categoryId?data.categoryId:user.categoryId,
            language:data.language,
            score:data.score,
            date:data.date,
            game_results_list:data.gameResultList
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }

})





module.exports={
    setGuessTheTermGame
}