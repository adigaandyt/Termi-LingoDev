const asyncHandler =require('express-async-handler')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const GuessTheTerm=require('../Models/guessTheTermModel')
const TransMe=require('../Models/transMeModel')


// MyModel.find({})
// .sort({ coins: -1 })
// .exec(function(err, docs) { 
//   if (!err){ 
//      console.log(docs);
//   } else {throw err;}
// });




//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setGuessTheTermGame=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;
    try {
        const categoryName=await Category.findById({_id:(data.categoryId?data.categoryId:user.categoryId)},{_id:0,"categoryName.english":1})
        const response=await GuessTheTerm.create({
            userId:user._id,
            userEmail:user.email,
            categoryId:data.categoryId?data.categoryId:user.categoryId,
            categoryName:categoryName.categoryName.english,
            language:data.language,
            score:data.score,
            date:data.date,
            game_results_list:data.gameResultList
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }

})

//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setTransMeGame=asyncHandler( async(req,res)=>{
    const user=req.user;
    const data=req.body;
    
    try {
        const categoryName=await Category.findById({_id:data.categoryId},{_id:0,"categoryName.english":1})
        // const newUser=await User.findByIdAndUpdate({_id:user._id},{games_coins:user.games_coins+data.score})
        const response=await TransMe.create({
            userId:user._id,
            userEmail:user.email,
            categoryId:data.categoryId,
            categoryName:categoryName.categoryName.english,
            questionLanguage:data.questionLanguage,
            answerLanguage:data.answerLanguage,
            score:data.score,
            date:data.date,
            startGame:data.startGame,
            game_results_list:data.gameResultList
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }

})






module.exports={
    setGuessTheTermGame,
    setTransMeGame
}