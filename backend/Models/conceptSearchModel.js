const { urlencoded } = require('express')
const mongoose=require('mongoose')



const ConceptSearchSchema=mongoose.Schema({
     userID:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User',
     }  ,  
     userEmail:{
        type:String,
        required:[true,'YOU MUST TO contain email']
     },
     correctSearched:{
        type:Boolean,
        required:[true,'YOU MUST TO contain categoryName']
     }, 
     userCategoryID:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'Category',
        required:[true,'YOU MUST TO contain categoryName']
     },
     SearchString:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName']
     },
     SearchCategoryID:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:'Category',
         required:[true,'YOU MUST TO contain categoryName']
     },
     conceptID:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Concept',
         required:[true,'YOU MUST TO contain conceptName']
     }
  
      
  
  }, { timestamps: true })

module.exports=mongoose.model('ConceptSearch',ConceptSearchSchema)
