const { urlencoded } = require('express')
const mongoose=require('mongoose')



const transMeSchema=mongoose.Schema({
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      required:[true,'YOU MUST TO LOGIN'],
      ref:"User"
     },
     userEmail:{
        type:String,
        required:[true,'YOU MUST TO contain email'],
     },
     categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      required:[true,'include category id'],
      ref:"Category"
     },
     categoryName:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName'],
     },
     questionLanguage:{
        type:String,
        required:true,
        enum:['English','עברית', 'العربية' ]
     },
     answerLanguage:{
        type:String,
        required:true,
        enum:['English','עברית', 'العربية' ]
     },
     score:{
      type:Number,
      required:true,
      max:10,
      min:0,
     },
     date:{
      type:String,
      required:true,
     },
     startGame:{
        type:String,
        required:true,
     },
     game_results_list:[{
      type: Object,
      of: {
          questionNumber:{type:Number,max:10,min:1},
          isCorrect:Boolean,
          currentTime:String,
          question:String,
          answer:String,
      }
    }]
  
      
  
  })

module.exports=mongoose.model('TransMe',transMeSchema)
