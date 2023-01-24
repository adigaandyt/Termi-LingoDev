const { urlencoded } = require('express')
const mongoose=require('mongoose')



const ConceptSearchSchema=mongoose.Schema({
        
     userEmail:{
        type:String,
        required:[true,'YOU MUST TO contain email']
     },
     correctSearched:{
        type:Boolean,
        required:[true,'YOU MUST TO contain categoryName']
     }, 
     userCategoryID:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName']
     },
     SearchString:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName']
     },
     SearchCategoryID:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName']
     },
     conceptID:{
        type:String,
        required:[true,'YOU MUST TO contain conceptName']
     }
  
      
  
  }, { timestamps: true })

module.exports=mongoose.model('ConceptSearch',ConceptSearchSchema)
