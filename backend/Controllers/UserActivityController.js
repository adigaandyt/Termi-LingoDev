const User=require('../Models/usersModel')
const UserActivity=require('../Models/UserActivityModel')
const { findOne } = require('../Models/usersModel')
const jwt =require('jsonwebtoken')





//@desc set the result of TrasMe game in the DB
//@route POST /api/games/set/game/transme
//@access private
const setUserActivity= async (user,token) =>{
    try {
        await UserActivity.create({
            userId:user._id,
            userEmail:user.email,
            token:token
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}

const updateUserActivity=( async(req,res)=>{

    const token=req.headers.authorization.split(' ')[1]

    // console.log(token);
    try {
        await UserActivity.findOneAndUpdate({token:token},{
            token:token
        })
        return res.status(200).json({})
    } catch (error) {
        // console.log(error)
        // throw new Error(error)
        console.log(token)
        return res.status(500).json({})
    }

})







module.exports={
    setUserActivity,
    updateUserActivity
}