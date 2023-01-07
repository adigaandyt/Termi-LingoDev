const { urlencoded } = require('express')
const mongoose=require('mongoose')

const guessTheTermSchema=mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    required:[true,'YOU MUST TO LOGIN'],
    ref:"User"
   },
   categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true,'include category id'],
    ref:"Category"
   },
   language:{
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
   game_results_list:[{
    type: Object,
    of: {
        questionNumber:{type:Number,max:10,min:1},
        shorDefinition:String,
        isCorrect:Boolean,
        currentTime:String,
    }
  }]

    

})

module.exports=mongoose.model('GuessTheTerm',guessTheTermSchema)