const { urlencoded } = require('express')
const mongoose=require('mongoose')

const userActivitySchema=mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    // required:[true,'YOU MUST TO LOGIN'],
    ref:"User"
   },
   userEmail:{
    type:String,
    // required:[true,'YOU MUST TO contain email'],
  },
   token:{
    type:String,
    // required:[true,'YOU MUST TO contain the token'],
  }

}, { timestamps: true })

module.exports=mongoose.model('UserActivity',userActivitySchema)